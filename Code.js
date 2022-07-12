function CodeToHTML(Code)
{
	return Code.replace(/\t/g, '   ').replace(/\n/g, '<BR>')
}