function FAB_Float(Checked)
{
	const Button = document.getElementById('FAB_Content').children[0];
	Button.classList.toggle('Locked', !Checked);
}