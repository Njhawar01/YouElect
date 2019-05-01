var express = require("express");
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var session=require("express-session");
var url = "mongodb://localhost:27017/mydb";
var app = express();
app.set('view engine', 'ejs');
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/mydb");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = 3000;
var name=[]

 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});

app.use(express.static('./'))

var nameSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    birthday: Date,
    gender: String,
    email: String,
	  pwd: String,
	  rpwd: String,
	  phone: String,
	  Aadhar: String,
	  state: String,
	
});
var election = new mongoose.Schema({
	election_name: String,
	no_candidates: Number,
	candidates: String,
  
});
var contact = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

var fdbck = new mongoose.Schema({
  name: String,
  email : String,
  review: String,
  radio: Number,
  radio1: Number,
  radio2 : Number,
  radio3 : Number,
  rating: Number,
  improve: String
});
var vote;


var User = mongoose.model("users", nameSchema);
var Conduct=mongoose.model("poll", election);
var Contact=mongoose.model("feedback",contact);
var Feedback = mongoose.model("fb",fdbck);

app.post("/name", (req, res) => {
 var myData = new User(req.body);
 myData.save()
 .then(item => {
 res.send("Item saved to database");
 //res.sendFile(path.join(__dirname + '/submit.html'));
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

app.post("/conduct", (req, res) => {
 var myData = new Conduct(req.body);
 myData.save()
 .then(item => {
 //res.send("Item saved to database");
 res.sendFile(path.join(__dirname + '/submit.html'));
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

app.post("/contact", (req, res) => {
 var myData = new Contact(req.body);
 myData.save()
 .then(item => {
 res.send("Item saved to database");
 //res.sendFile(path.join(__dirname + '/submit.html'));
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

app.post("/feedback", (req, res) => {
 var myData = new Feedback(req.body);
 myData.save()
 .then(item => {
 res.send("Item saved to database");
 //res.sendFile(path.join(__dirname + '/submit.html'));
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});
/*app.get("/vote",function(req,res)
    {
    console.log("Vote button Working");
    res.sendFile('voted.html', {root: __dirname });
    });
*/
var election_name;
var election_name;
var no_candidates;
var candid;
var res;
var votes=[];



MongoClient.connect(url, function(err, db) {

    var dbo = db.db("mydb");
    var cursor = dbo.collection('polls').find();
    details=dbo.collection('polls').find().toArray();

    cursor.forEach(function( doc) {

        
		data1=doc;
		election_name=doc.election_name;
		candid=doc.candidates;
		res= candid.split(",");
		no_candidates=doc.no_candidates;

    for(var i=0 ;i<res.length;i++)
    {
      
      votes[i]=1;
    }

    

		//console.log(res);
    /*
    app.get('/elections/:id',function(req,rep)
    {
   rep.render('elections',{data : res,
    name1 : election_name
    
   })
   });
   */
    
   console.log(res);
   var names=res;
   app.post('/vote',function(req,res)
    {
    console.log("Vote button Working");
    res.sendFile('voted.html', {root: __dirname });
    doc=req.body.candid;


    console.log(names);
    for(var i=0;i<=names.length;i++)
    {
      if(names[i]==doc)
      {
        votes[i]++;
      }
    }
    
    console.log(typeof doc);
    console.log(names[1]);
    
    console.log(doc);
    console.log(votes);

    });
   console.log(votes);

   app.get('/elections/:id',function(req,rep)
    {
   rep.render('elections',{data : names,
    name1 : election_name,
    results: names,
    votes: votes,

    
   })
   });

     
		db.close();

    });

    
}); 




/*
app.get('/elections/:id',function(req,rep)
{
	 rep.render('elections',{data : res
    
	 })
})
*/
 /*app.get('/vote',function(req,res)
{
  console.log("Vote button Working");
  res.sendFile('voted.html', {root: __dirname });
}*/



//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

//authenticate input against database
nameSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

