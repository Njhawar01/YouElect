var express = require("express");
var mongoose = require("mongoose");
var app = express();
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/mydb");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = 3000;
 
app.get("/", (req, res) => {
 res.send("Hello World");
});
 


app.use("/", (req, res) => {
 res.sendFile(__dirname + "/home.html");
});

var nameSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    birthday: Date,
    gender: String,
    email: String,
	/*pwd: String,
	rpwd: String,*/
	phone: String,
	Aadhar: String,
	state: String,
	
});
var User = mongoose.model("users", nameSchema);

app.post("/name", (req, res) => {
 var myData = new User(req.body);
 myData.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

app.listen(port, () => {
 console.log("Server listening on port " + port);
});

