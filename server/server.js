var express = require('express')
var path = require('path')
var compression = require('compression')
var fs = require("fs")

var app = express()

app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/getDancers.json', function(req, res){
	var dancersString = fs.readFileSync(path.join(__dirname, 'dancers.json'), "utf-8").replace(/(\r\n|\n|\r|\t)/gm,"");
	//console.log(dancersString);
	//console.log(JSON.stringify(dancers));
	res.status(200).send(JSON.stringify({
		success: true,
		message: "Successfully get dancer information",
		dancers: JSON.parse(dancersString)
	}));
})
// send all requests to index.html so browserHistory works
app.get('/*', function (req, res) {
	if(req.url == "/"){
		res.redirect("/dancers");
	}
		console.log("req-url: " + req.url);
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})



var PORT = process.env.PORT || 3000
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
