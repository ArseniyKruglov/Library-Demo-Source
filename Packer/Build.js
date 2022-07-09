const _Path = require('path')
const FS = require('fs');



const Title = 'Библиотека';

const Source = '../Source';
const Output = __dirname + '/../../Library-Demo-Webpage';

const Library = '../../Library';



const Regexps =
{
	'JS': /import '(.*?)'/g,
	'SCSS': /@import '(.*?)'/g
}



function Match(Code, Regexp)
{
	const Includes = [];

	for (let Iter of Code.matchAll(Regexp))
		if (!Includes.includes(Iter[1]))
			Includes.push(Iter[1]);

	return Includes;
}

function ReadFileSync(Path)
{
	return require('fs').readFileSync(Path).toString();
}

function WriteFileSync(Path, Content)
{
	require('fs').writeFileSync(Path, Content);
}

function CopyFileSync(From, To)
{
	require('fs').copyFileSync(From, To);
}

function GlobSync(Pattern)
{
	return require('glob').sync(Pattern).map(Value => _Path.resolve(Pattern, '..', Value));
}

//

function Entry(Path, Regexp, Included = [])
{
	function Read(Path)
	{
		return ReadFileSync(_Path.resolve(__dirname, Path + '.js'));
	}

	const Code_This = Read(Path);
	for (let Include of Match(Code_This, /import '(.*?)'/g))
	{
		const DependencyPath = _Path.join(_Path.dirname(Path), Include);
		if (!Included.includes(DependencyPath))
			Entry(DependencyPath, Regexp, Included);
	};

	Included.push(Path + '.js');
	return Included;
};

function Lazy(Path, Regexp)
{
	function Swap(Befores, Me)
	{
		for (let Before of Befores)
			if (Included.indexOf(Before) > Included.indexOf(Me))
			{
				Included.splice(Included.indexOf(Before), 1);
				Included.splice(Included.indexOf(Me), 0, Before);
				i++;
			}
	}

	function R(Path)
	{
		const Code = ReadFileSync(Path);
		const Includes = Match(Code, Regexp).map(Value => _Path.resolve(Path, ('../' + Value)));

		Swap(Includes, Path);

		for (let Include of Includes)
			R(Include);
	}



	const Included = GlobSync(Path);
	let i;
	for (i = 0; i < Included.length; i++)
		R(Included[i]);
	return Included;
}

//

function GetSelectors(Code)
{
	const Selectors = [];

	for (let Group of Code.matchAll(/<([^ \/>]+).*?>/g))
	{
		const Tag = Group[1];
		if (!Selectors.includes(Tag))
			Selectors.push(Tag);
	};

	return Selectors;
}

//

function SCSS_To_CSS(Code)
{
	return require('node-sass').renderSync({ data: Code }).css.toString();
}

function UnCSS(Code, Selectors)
{
	return new Promise(function  (Resolve)
	{
		require('uncss')
		(
			'<HTML></HTML>',
			{
				raw: Code,
				ignore: Selectors
			},
			(Error, Output) => Resolve(Code)
		)
	});
}

function UglifyCSS(Code)
{
	return Code;
	// return require('uglifycss').processString(Code);
}

function Autoprefix(Code)
{
	require('postcss')([ require('autoprefixer') ]).process(css).then(result => {
		result.warnings().forEach(warn => {
		  console.warn(warn.toString())
		})
		console.log(result.css)
	    })
}

function UglifyJS(Code)
{
	return require('uglify-js').minify(Code).code;
}

function UglifyHTML(Code)
{
	return Code.replace(/\t|\n/g, '').replace(/<!--.*-->/g, '').replace(/> </g, '><');
}



//



function GetIcons(Names, Type = 'outlined')
{
	const Output = {};

	const Promises = [];
	for (let Name of Names)
		Promises.push(new Promise((Resolve) =>
		{
			FS.readFile(`node_modules/@material-design-icons/svg/${Type}/${Name}.svg`, (Error, Data) =>
			{
				Output[Name] = Data.toString().replace(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">`, '').replace('</svg>', '');
				Resolve();
			});
		}));

	return new Promise((Resolve) => Promise.all(Promises).then(() => Resolve(Output)));
}

function GetIconsList(Code)
{
	return Match(Code, /Icon="(.*?)"/g);
}

function Clear()
{
	FS.readdirSync(Output).forEach(File => FS.rmSync(`${Output}/${File}`));
}

function PackCSS()
{
	UnCSS
	(
		SCSS_To_CSS
		(
			Merge
			([
				...Lazy(`${Library}/**/*.scss`, Regexps.SCSS),
				...Lazy('../Source/*.scss', Regexps.SCSS)
			])
			.replace(Regexps.SCSS, '')
		)
		.replace('@charset "UTF-8";', ''),

		[/.*/]
	).then(Code => WriteFileSync(Output + '/Style.css', UglifyCSS(Code)));
}

function PackJS()
{
	const Icons = GetIcons([...GetIconsList(ReadFileSync('../Source/Index.html')),  'check_box_outline_blank', 'check_box', 'more_vert', 'expand_more', 'expand_less']);

	Promise.all([Icons]).then((Values) =>
	{
		WriteFileSync
		(
			Output + '/Script.js',
			UglifyJS
			(
				Merge
				([
					...Lazy(`${Library}/**/*.js`, Regexps.JS),
					...Lazy('../Source/*.js', Regexps.JS)
				])
				.replace(Regexps.JS, '')
				.replace(`{ /* ...Generator puts icons here... */ }`, JSON.stringify(Values[0]))
			)
			.replace(/>( |\n|\t)*?</g, '><')
			.replace(/ +/g, ' ')
			.replace(/\t/g, '')
		);
	})
}

function PackHTML()
{
	FS.writeFile
	(
		Output + '/Index.html',
		UglifyHTML
		(
			`<!DOCTYPE HTML>

			 <HTML Lang="RU">
				<Head>
					<Meta CharSet="UTF-8">

					<Title>${Title}</Title>
					<Link Rel="Icon" Href="Icon.svg">

					<Meta Name="Viewport" Content="width=device-width, initial-scale=1, shrink-to-fit=no">

					<Link Rel="StyleSheet" Href="Style.css?${new Date().getTime()}">
				</Head>

				${ReadFileSync('../Source/Index.html')}

				<Script Src='Script.js?${new Date().getTime()}'></Script>
			 </HTML>`
		),
	() => {});
}

function PackIcon()
{
	// const { exec } = require('child_process');
	// exec(`favicons-generate --input "../Source/Icon.svg" --output "${Output}"`);
}

function Merge(Paths)
{
	return Paths.map(Value => ReadFileSync(Value)).join('\n');
}

//

function Main()
{
	// Clear();
	PackCSS();
	PackJS();
	PackHTML();
	PackIcon();
}

Main();