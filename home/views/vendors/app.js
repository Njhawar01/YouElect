var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
const http=require('http');
const { parse } = require('querystring');


var express=require('express');
const bodyParser=require('body-parser');
var mongoose=require("mongoose");
var app = express();
var port = 3000;
app.use(bodyParser.json());



app.set('view engine', 'ejs');


app.use(express.static('./'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
/*

app.post("/name", function (req, res) {
    res.send("check 1");
	console.log("dfone");
});
*/
mongoose.connect("mongodb://localhost:27017/mydb" , { useNewUrlParser: true });
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
	console.log(myData);
	
    
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});





app.listen(3000);












