function CodeToHTML(Code)
{
	return Code.replace('\n', '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<BR>');
}