
async function readTextFile(text_file) {
	let text = await text_file.files[0].text();

	// remove unnecessary characters
	text = text.replace(/[^0-9a-z]/gi, "");
	let tokens = text.split(" ");	
	console.log(tokens);
}