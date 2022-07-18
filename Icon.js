function Icon_View(View)
{
	const Element = document.getElementById('Icon_Content');
	Element.children[0].hidden = !View;
	Element.children[1].hidden = View;
}

Icon_View(1);



class Icon
{
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
			   Icon="outlined/map"
			   Style="--Scale: ${this.Scale}px; --Color: ${this.Color.toUpperCase()}"&gt;
			&lt;/Custom-icon&gt;
		`);
	}



	set Color(Value)
	{
		this._Color = Value;
		this.Apply('Color', Value);
		this.Draw();
	}
	get Color()
	{
		return this._Color;
	}

	set Scale(Value)
	{
		this._Scale = Value;
		this.Apply('Scale', Value + 'px');
		this.Draw();
	}
	get Scale()
	{
		return this._Scale;
	}
}

Icon = new Icon();
Icon.Apply();
Icon.Draw();