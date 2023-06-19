import http from "http";
import fs from "fs";

const PORT = 8080;

export function runServer() {
	let jsfile = fs.readFileSync("./src/text-processing.js");
	fs.readFile("./html/index.html", function(err, html){
		if (err) throw err;

		http.createServer(function(request, response) {
			switch (request.url) {
				case "/foo":
					response.writeHead(200, {"Content-Type": "text/javascript"});
					response.write(jsfile);
					response.end();
					break;

				default:
					response.writeHead(200, {"Content-Type": "text/html"});
					response.write(html);
					response.end();
					break;
			}
		}).listen(8080);

	});
}
