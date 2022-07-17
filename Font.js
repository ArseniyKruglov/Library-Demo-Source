class Font
{
	ApplyStyle(Type, Font)
	{
		document.documentElement.style.setProperty(`--Font-${Type}`, this.GetStyle(Font));
	}

	GetStyle(Font)
	{
		return `"${Font}"${this.FallbackAssociations[Font] ?  `, ${this.FallbacksStyles[this.FallbackAssociations[Font]]}` : ''}`;
	}



	Element = document.getElementById('Font_Code');

	Draw()
	{
		this.Element.innerHTML = CodeToHTML
		(`
			:root
			{
			   --Font-Title: ${this.GetCode(this.Title)};
			   --Font-Text: ${this.GetCode(this.Text)};
			   --Font-UI: ${this.GetCode(this.UI)};
			   --Font-Monospace: ${this.GetCode(this.Monospace)};
			}
		`);
	}

	GetCode(Font)
	{
		return `"${Font}"${this.FallbackAssociations[Font] ?  `, #{$${this.FallbackCodes[this.FallbackAssociations[Font]]}}` : ''}`;
	}



	_Title = 'Google Sans';
	_UI = 'Google Sans';
	_Text = 'Lora';
	_Monospace = 'Roboto Mono';



	FallbacksStyles =
	{
		'Serif': `'Times New Roman', 'Times', 'Serif'`,
		'SansSerif': `'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'`,
		'Monospace': `'Courier New', 'Courier', 'Monospace'`
	}

	FallbackCodes =
	{
		'Serif': 'Font-Fallback-Serif',
		'SansSerif': 'Font-Fallback-SansSerif',
		'Monospace': 'Font-Fallback-Monospace'
	}

	FallbackAssociations =
	{
		'Google Sans': 'SansSerif',
		'Lora': 'Serif',
		'Roboto Mono': 'Monospace',
		'Bellota': 'SansSerif',
		'Playfair Display': 'Serif',
		'System-UI': 'SansSerif',
		'JetBrains Mono': 'Monospace',
		'Roboto': 'SansSerif'
	}



	set Title(Value)
	{
		this._Title = Value;
		this.ApplyStyle('Title', Value);
		this.Draw();
	}
	get Title()
	{
		return this._Title;
	}

	set UI(Value)
	{
		this._UI = Value;
		this.ApplyStyle('UI', Value);
		this.Draw();
	}
	get UI()
	{
		return this._UI;
	}

	set Text(Value)
	{
		this._Text = Value;
		this.ApplyStyle('Text', Value);
		this.Draw();
	}
	get Text()
	{
		return this._Text;
	}

	set Monospace(Value)
	{
		this._Monospace = Value;
		this.ApplyStyle('Monospace', Value);
		this.Draw();
	}
	get Monospace()
	{
		return this._Monospace;
	}
}

Font = new Font();
Font.Draw();