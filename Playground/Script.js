function Icon_View(View)		// TO DO: В библиотеку
{
	const Element = document.getElementById('Icon_Content');
	Element.children[0].hidden = !View;
	Element.children[1].hidden = View;
}

Icon_View(1);



// Icon="outlined/map"
// Icon="filled/map"
// Icon="round/map"
// Icon="sharp/map"
// Icon="two-tone/map"

// Icon="outlined/settings"
// Icon="filled/settings"
// Icon="round/settings"
// Icon="sharp/settings"
// Icon="two-tone/settings"

// Icon="outlined/shopping_cart"
// Icon="filled/shopping_cart"
// Icon="round/shopping_cart"
// Icon="sharp/shopping_cart"
// Icon="two-tone/shopping_cart"

// Icon="outlined/lock"
// Icon="filled/lock"
// Icon="round/lock"
// Icon="sharp/lock"
// Icon="two-tone/lock"



class Icon
{
	constructor()
	{
		this.Apply();
		this.Draw();
	}



	_Name = 'Map';
	_Style = 'Outlined';
	_Scale = 150;
	_Color = '#95AAA3';



	Element_Code = document.getElementById('Icon_Try_Code');
	Element_Example = document.getElementById('Icon_Try_Example');

	Apply(Property, Value)
	{
		this.Element_Example.style.setProperty(`--${Property}`, Value);
	}

	Draw()
	{
		this.Element_Code.innerHTML = CodeToHTML
		(`
			&lt;Custom-icon
			   Icon="${this.Style_To_Code[this.Style]}/${this.Name_To_Code[this.Name]}"
			   Style="--Scale: ${this.Scale}px; --Color: ${this.Color.toUpperCase()}"&gt;
			&lt;/Custom-icon&gt;
		`);
	}



	Style_To_Code =
	{
		'Outlined': 'outlined',
		'Filled': 'filled',
		'Rounded': 'round',
		'Sharp': 'sharp',
		'Two tone': 'two-tone'
	}

	Name_To_Code =
	{
		'Map': 'map',
		'Settings': 'settings',
		'Shopping cart': 'shopping_cart',
		'Lock': 'lock'
	}



	set Name(Value)
	{
		this._Name = Value;
		this.Element_Example.Icon = `${this.Style_To_Code[this.Style]}/${this.Name_To_Code[this.Name]}`;
		this.Draw();
	}
	get Name()
	{
		return this._Name;
	}

	set Style(Value)
	{
		this._Style = Value;
		this.Element_Example.Icon = `${this.Style_To_Code[this.Style]}/${this.Name_To_Code[this.Name]}`;
		this.Draw();
	}
	get Style()
	{
		return this._Style;
	}

	set Scale(Value)
	{
		this._Scale = Value;
		this.Element_Example.style.setProperty(`--Scale`, Value + 'px');
		this.Draw();
	}
	get Scale()
	{
		return this._Scale;
	}

	set Color(Value)
	{
		this._Color = Value;
		this.Element_Example.style.setProperty(`--Color`, Value);
		this.Draw();
	}
	get Color()
	{
		return this._Color;
	}
}

Icon = new Icon();