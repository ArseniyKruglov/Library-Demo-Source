class BorderRadius
{
	ApplyStyle()
	{
		document.documentElement.style.setProperty('--Border-radius', this.Value + 'px');
	}



	CodeElement = document.getElementById('BorderRadius_Code');
	InputElement = document.getElementById('BorderRadius_Input');

	Draw()
	{
		this.CodeElement.innerHTML = CodeToHTML
		(`
			:root
			{
			   --Border-radius: ${this.Value}px;
			}
		`);
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
		this.InputElement.value = 2.5;
	}
}

BorderRadius = new BorderRadius();
BorderRadius.Reset();