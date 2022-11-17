let express = require('express');
let app = express();
require('dotenv').config()

console.log("Hello World");

app.get("/", (req, res) => {
	//	res.send("Hello Express");

	let absPath = __dirname + "/views/index.html";
	console.log(absPath);
	res.sendFile(absPath);
	//res.sendFile(absPath, (error) => {
	//		if (error) {
	//			next(error)
	//		} else {
	//			console.log("enviado:", absPath)
	//		}
	//	})
});

app.get("/json", (req,res) => {
	if(process.env.MESSAGE_STYLE === "uppercase") {
		res.json({"message": "Hello json".toUpperCase()})
	} else {
		res.json({"message": "Hello json"})
	}
});




app.use('/public', express.static(__dirname + "/public"));

module.exports = app;