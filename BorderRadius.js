class BorderRadius
{
	ApplyStyle()
	{
		document.documentElement.style.setProperty('--Border-radius', this.Value + 'px');
	}



	Element = document.getElementById('BorderRadius_Code');

	Draw()
	{
		this.Element.innerHTML = CodeToHTML
		(`:root
		{
		   --Border-radius: ${this.Value}px;
		}`);
	}



	_Value = 2.5;

	set Value(Value)
	{
		this._Value = Value;
		this.ApplyStyle();
		this.Draw();

	}
	get Value()
	{
		return this._Value;
	}



	Reset()
	{
		this.Value = 2.5;
	}
}

BorderRadius = new BorderRadius();
BorderRadius.Draw();