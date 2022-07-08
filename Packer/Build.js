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



function GetIcons(Names)
{
	const Output = {};

	const Promises = [];
	for (let Name of Names)
		Promises.push(new Promise((Resolve) =>
		{
			FS.readFile(`node_modules/@material-design-icons/svg/outlined/${Name}.svg`, (Error, Data) =>
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

					<Link Rel="shortcut icon" Href="favicon.ico">
					<Link Rel="Icon" Type="image/png" Sizes="16x16" Href="favicon-16x16.png">
					<Link Rel="Icon" Type="image/png" Sizes="32x32" Href="favicon-32x32.png">
					<Link Rel="Icon" Type="image/png" Sizes="48x48" Href="favicon-48x48.png">
					<Meta Name="mobile-web-app-capable" Content="yes">

					<Link Rel="apple-touch-Icon" Sizes="57x57" Href="apple-touch-Icon-57x57.png">
					<Link Rel="apple-touch-Icon" Sizes="60x60" Href="apple-touch-Icon-60x60.png">
					<Link Rel="apple-touch-Icon" Sizes="72x72" Href="apple-touch-Icon-72x72.png">
					<Link Rel="apple-touch-Icon" Sizes="76x76" Href="apple-touch-Icon-76x76.png">
					<Link Rel="apple-touch-Icon" Sizes="114x114" Href="apple-touch-Icon-114x114.png">
					<Link Rel="apple-touch-Icon" Sizes="120x120" Href="apple-touch-Icon-120x120.png">
					<Link Rel="apple-touch-Icon" Sizes="144x144" Href="apple-touch-Icon-144x144.png">
					<Link Rel="apple-touch-Icon" Sizes="152x152" Href="apple-touch-Icon-152x152.png">
					<Link Rel="apple-touch-Icon" Sizes="167x167" Href="apple-touch-Icon-167x167.png">
					<Link Rel="apple-touch-Icon" Sizes="180x180" Href="apple-touch-Icon-180x180.png">
					<Link Rel="apple-touch-Icon" Sizes="1024x1024" Href="apple-touch-Icon-1024x1024.png">
					<Meta Name="apple-mobile-web-app-capable" Content="yes">
					<Link Rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"    Href="apple-touch-startup-image-640x1136.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"    Href="apple-touch-startup-image-750x1334.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"    Href="apple-touch-startup-image-828x1792.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"    Href="apple-touch-startup-image-1125x2436.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"    Href="apple-touch-startup-image-1242x2208.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"    Href="apple-touch-startup-image-1242x2688.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"   Href="apple-touch-startup-image-1536x2048.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"   Href="apple-touch-startup-image-1668x2224.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"   Href="apple-touch-startup-image-1668x2388.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"  Href="apple-touch-startup-image-2048x2732.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"  Href="apple-touch-startup-image-1620x2160.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"   Href="apple-touch-startup-image-1136x640.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"   Href="apple-touch-startup-image-1334x750.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"   Href="apple-touch-startup-image-1792x828.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"   Href="apple-touch-startup-image-2436x1125.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"   Href="apple-touch-startup-image-2208x1242.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"   Href="apple-touch-startup-image-2688x1242.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"  Href="apple-touch-startup-image-2048x1536.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"  Href="apple-touch-startup-image-2224x1668.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"  Href="apple-touch-startup-image-2388x1668.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" Href="apple-touch-startup-image-2732x2048.png">
					<Link Rel="apple-touch-startup-image" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"  Href="apple-touch-startup-image-2160x1620.png">

					<Link Rel="Icon" Type="image/png" Sizes="228x228" Href="coast-228x228.png">

					<!-- <Meta Name="msapplication-TileColor" Content="#fff"> -->
					<Meta Name="msapplication-TileImage" Content="mstile-144x144.png">
					<Meta Name="msapplication-config" Content="browserconfig.xml">

					<Link Rel="yandex-tableau-widget" Href="yandex-browser-manifest.json">

					<!-- <Meta Name="Theme-Color" Content="#FFFFFF"> -->
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