function Theme_Set_Main(Hex)
{
	const HSL = Hex_To_HSL(Hex);

	document.documentElement.style.setProperty('--Hue', HSL[0]);
	document.documentElement.style.setProperty('--Saturation', HSL[1] + '%');
	document.documentElement.style.setProperty('--Lightness', HSL[2] + '%');

	document.getElementById('Theme_Code_Main').innerHTML = `:root <BR>
										  { <BR>
										      --Hue: ${HSL[0]}; <BR>
										      --Saturation: ${HSL[1]}%; <BR>
										      --Lightness: ${HSL[2]}%; <BR>
										  }`;
}

function Theme_Set_Gray(Hex)
{
	const HSL = Hex_To_HSL(Hex);

	document.documentElement.style.setProperty('--Gray-Hue', HSL[0]);
	document.documentElement.style.setProperty('--Gray-Saturation', HSL[1] + '%');

	document.getElementById('Theme_Code_Gray').innerHTML = `:root <BR>
										  { <BR>
										      --Gray-Hue: ${HSL[0]}; <BR>
										      --Gray-Saturation: ${HSL[1]}%; <BR>
										  }`;
}

function Theme_Reset_Main()
{
	document.getElementById('Theme_Main').value = '#D92626';
	Theme_Set_Main('#D92626')
}

function Theme_Reset_Gray()
{
	document.getElementById('Theme_Gray').value = '#171A1C';
	Theme_Set_Gray('#171A1C');
}