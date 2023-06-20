async function readTextFile(text_file) {
	let file_name = await text_file.files[0].name;
	let text = await text_file.files[0].text();

	// Remove unnecessary characters and whitespace
	text = text.replace(/[^0-9a-zA-Z\u00f6\u00e4\u00d6\u00c4\u00e5\u00c5-–]/gi, " "); // Accepted characters regex
	text = text.trim().replace(/\s{2,}/g, " "); // Remove surplus whitespace with regex
	text = text.toLowerCase();

	// Tokenise text
	let tokens = text.split(" "); // Split on whitespace

	// Create dictionary and count occurences
	let counter = {}; // Word : Count -dictionary
	for (let i = 0; i < tokens.length; i++) { // Loop through all tokens
		const element = tokens[i];
		let token_found_in_counter = false;
		if (Object.keys(counter).length == 0) counter[element] = 1;
		for ([key, value] of Object.entries(counter)) { // Compare to tokens already	 present in the dictionary
			if (element == key) { // increment count if present
				counter[key]++;
				token_found_in_counter = true;
				break;
			}
		}
		if (token_found_in_counter == false) counter[element] = 1; // If no duplicate found, create new entry
	}

	// Sort dictionary
	let counter_sorted = Object.keys(counter).map(function(key) {
		return [key, counter[key]];
	});
	counter_sorted.sort(function(first, second) {
		return second[1] - first[1];
	});

	// Create and write to a database
	const db = new sqlite3.Database("./database/database.db");

	db.serialize(() => {
		db.run("CREATE TABLE ${file_name} (word TEXT, count INT)");

		const stmt = db.prepare("INSERT INTO file_name VALUES (?)");
		for ([key, value] of Object.entries(counter_sorted)) {
			stmt.run(key + value);
		}
		stmt.finalize();
	});
}