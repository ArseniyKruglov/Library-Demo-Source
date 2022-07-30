function Demo_Dialog_FullScreen_Open()
{
	window.Demo_Dialog_FullScreen = new Dialog_FullScreen();
	window.Demo_Dialog_FullScreen.Animated = true;
	window.Demo_Dialog_FullScreen.Element.innerHTML =
	`
		<Div AutoLayout Direction="Horizontal" Width="Fill" Style="Padding: 25px" OnClick="Demo_Dialog_FullScreen_Close()">
			<Custom-round-button Icon="outlined/arrow_back" FocusFirst></Custom-round-button>
		</Div>

		<Div AutoLayout Direction="Vertical" Width="Fill" Height="Fill" AlignX="Center" AlignY="Center" Style="Gap: 50px; Padding: 25px;">
			<H2 Style="Text-align: Center">Полноэкранно!</H2>
		</Div>
	`;
	window.Demo_Dialog_FullScreen.Open();
}

function Demo_Dialog_FullScreen_Close()
{
	window.Demo_Dialog_FullScreen.Close();
	delete window.Demo_Dialog_FullScreen;
}