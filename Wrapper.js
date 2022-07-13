function Wrapper_Set(Type)
{
	const Placeholder =
	{
		'Text': 'Введите текст...',
		'Number': '1337',
		'Password': 'Пароль',
		'Email': 'email@example.com',
		'Tel': '+78005553535'
	};

	const Value =
	{
		'Time': '15:51',
		'Date': '2020-12-02',
		'Datetime-local': '2020-12-02T15:51'
	};

	document.getElementById('Wrapper_Content').innerHTML =
		`<Div Class="InputContainer">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>
		<Div Class="InputContainer Round">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>
		<Div Class="InputContainer Roomy">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>
		<Div Class="InputContainer Roomy Round">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>
		<Div Class="InputContainer Main">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>
		<Div Class="InputContainer Main Round">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>
		<Div Class="InputContainer Main Roomy">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>
		<Div Class="InputContainer Main Roomy Round">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>
		<Div Class="InputContainer Outlined">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>
		<Div Class="InputContainer Outlined Round">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>
		<Div Class="InputContainer Outlined Roomy">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>
		<Div Class="InputContainer Outlined Roomy Round">
			<Input Type="${Type}" Value="${Value[Type] || ''}" Placeholder="${Placeholder[Type] || ''}">
		</Div>`;
}

Wrapper_Set('Text');