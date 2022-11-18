let express = require('express');
let app = express();
require('dotenv').config()

console.log("Hello World");

const middle = (req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next()
}

app.use(middle)


app.get("/", (req, res) => {
	//	res.send("Hello Express");

	let absPath = __dirname + "/views/index.html";
	//	console.log(absPath);
	res.sendFile(absPath);

	//res.sendFile(absPath, (error) => {
	//		if (error) {
	//			next(error)
	//		} else {
	//			console.log("enviado:", absPath)
	//		}
	//	})

});

app.get("/json", (req, res, next) => {
	if(process.env.MESSAGE_STYLE === "uppercase") {
		res.json({"message": "Hello json".toUpperCase()})
	} else {
		res.json({"message": "Hello json"})
	}
});

app.get('/now', (req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.json({time: req.time})
	}
)


app.get('/:word/echo', (req, res) => {
	const { word } = req.params;
	console.log(word);
	res.json({echo: word});
});



app.use('/public', express.static(__dirname + "/public"));


module.exports = app;
