function Theme_Set_Main(HSL)
{
	document.documentElement.style.setProperty('--Hue', HSL[0]);
	document.documentElement.style.setProperty('--Saturation', HSL[1] + '%');
	document.documentElement.style.setProperty('--Lightness', HSL[2] + '%');

	const Element = document.getElementById('Theme_Code_Main');
	Element.innerHTML = CodeToHTML
	(`
		:root
		{
		   --Hue: ${HSL[0]};
		   --Saturation: ${HSL[1]}%;
		   --Lightness: ${HSL[2]}%;
		}
	`);
}

function Theme_Set_Gray(HSL)
{
	document.documentElement.style.setProperty('--Gray-Hue', HSL[0]);
	document.documentElement.style.setProperty('--Gray-Saturation', HSL[1] + '%');

	const Element = document.getElementById('Theme_Code_Gray');
	Element.innerHTML = CodeToHTML
	(`
		:root
		{
		   --Gray-Hue: ${HSL[0]};
		   --Gray-Saturation: ${HSL[1]}%;
		}
	`);
}

function Theme_Set_Darkness(Darkness)
{
	document.documentElement.style.setProperty('--DarkThemeMultiplier', Darkness + '%');

	const Element = document.getElementById('Theme_Code_Darkness');
	Element.innerHTML = CodeToHTML
	(`
		:root
		{
		   --DarkThemeMultiplier: ${Darkness}%;
		}
	`);
}



function Theme_Reset_Main()
{
	document.getElementById('Theme_Main').value = '#D92626';
	Theme_Set_Main([0, 70, 50])
}

function Theme_Reset_Gray()
{
	document.getElementById('Theme_Gray').value = '#171A1C';
	Theme_Set_Gray([210, 10]);
}

function Theme_Reset_Darkness()
{
	document.getElementById('Theme_Darkness').value = 5;
	Theme_Set_Darkness(5);
}



Theme_Reset_Main();
Theme_Reset_Gray();
Theme_Reset_Darkness();