
async function readTextFile(text_file) {
	let text = await text_file.files[0].text();

	// remove unnecessary characters
	text = text.replace(/[^0-9a-zA-Z\u00f6\u00e4\u00d6\u00c4-]/gi, " ");
	text = text.trim().replace(/\s{2,}/g, ' ');
	text = text.toLowerCase();
	let tokens = text.split(" ");
	console.log(tokens);
}