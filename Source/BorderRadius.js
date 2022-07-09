function BorderRadius_Set(Radius)
{
	document.documentElement.style.setProperty('--Border', Radius + 'px');
}

function BorderRadius_Reset()
{
	document.getElementById('BorderRadius').value = '2.5';
	BorderRadius_Set(2.5);
}