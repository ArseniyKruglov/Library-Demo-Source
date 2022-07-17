function Icon_View(View)
{
	const Element = document.getElementById('Icon_Content');
	Element.children[0].hidden = !View;
	Element.children[1].hidden = View;
}

function Icon_Set_Scale(Scale)
{
	const Element = document.getElementById('Icon_Try_Element');
	Element.style.setProperty('--Scale', Scale + 'px');
}

function Icon_Set_Color(HSL)
{
	const Element = document.getElementById('Icon_Try_Element');
	Element.style.setProperty('--Color', `HSL(${HSL[0]}, ${HSL[1]}%, ${HSL[2]}%)`);
}

function Icon_Try_Code()
{
	const Element = document.getElementById('Icon_Try_Code');
	Element.innerHTML = CodeToHTML
	(`
		<Custom-icon
		   Icon="outlined/map"
		   Style="--Scale: 50px">
		</Custom-icon>
	`);
}

Icon_View(1);
Icon_Try_Code();
Icon_Set_Scale(50);
Icon_Set_Color([0, 70, 50]);