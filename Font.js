class Font
{
	Element = document.getElementById('Font_Code');

	Draw()
	{
		this.Element.innerHTML = CodeToHTML
		(`:root
			{
				--Font-Title: "${this.Title}", ${this.FallbackAssociations[this.Title] ?  `#{$${this.FallbackAssociations[this.Title]}` : ''};
				--Font-Text: "${this.Text}", #{$${this.FallbackAssociations[this.Text]}};
				--Font-UI: "${this.UI}", #{$${this.FallbackAssociations[this.UI]}};
				--Font-Monospace: "${this.Monospace}", #{$${this.FallbackAssociations[this.Monospace]}};
			}
		`);
	}

	Set(Type, Font)
	{
		document.documentElement.style.setProperty(`--Font-${Type}`, Font);
	}



	_Title = 'Google Sans';
	_UI = 'Google Sans';
	_Text = 'Lora';
	_Monospace = 'Roboto Mono';



	Fallbacks =
	{
		'Serif': 'Font-Fallback-Serif',
		'SansSefif': 'Font-Fallback-Sans-serif',
		'Monospace': 'Font-Fallback-Monospace'
	}

	FallbackAssociations =
	{
		'Google Sans': this.Fallbacks.SansSefif,
		'Lora': this.Fallbacks.Serif,
		'Roboto Mono': this.Fallbacks.Monospace
	}



	set Title(Value)
	{
		console.log(Value);
		this._Title = Value;
		this.Set('Title', Value);
		this.Draw();
	}

	get Title()
	{
		return this._Title;
	}

	set UI(Value)
	{
		this._UI = Value;
		this.Set('UI', Value);
		this.Draw();
	}

	get UI()
	{
		return this._UI;
	}

	set Text(Value)
	{
		this._Text = Value;
		this.Set('Text', Value);
		this.Draw();
	}

	get Text()
	{
		return this._Text;
	}

	set Monospace(Value)
	{
		this._Monospace = Value;
		this.Set('Monospace', Value);
		this.Draw();
	}

	get Monospace()
	{
		return this._Monospace;
	}
}


function Font_Set_Title(Font)
{
	document.documentElement.style.setProperty('--Font-Title', Font);
}

function Font_Set_UI(Font)
{
	document.documentElement.style.setProperty('--Font-UI', Font);
}

function Font_Set_Text(Font)
{
	document.documentElement.style.setProperty('--Font-Text', Font);
}

function Font_Set_Monospace(Font)
{
	document.documentElement.style.setProperty('--Font-Monospace', Font);
}