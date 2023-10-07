let express = require('express');
let app = express();
let bodyParser = require('body-parser');

require('dotenv').config();

// #1 meet the console
//console.log("Hello World");

// #2 start a working express server
//app.get('/', (req, res) => {
  //res.send("Hello Express");
//});

//#4 mount serve static assets
app.use('/public', express.static( __dirname + '/public'));

// #7 mount the logger middleware??? Check this
app.use(function simpleLogger(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip); 
next();
});

// #11 mount the body parser middleware
//app.use( bodyParser.json() );  is this required ????????    
app.use(bodyParser.urlencoded({ extended: false }));


// #3 serve an html file
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// not sure where this should be located??
app.use('/now', express.static(__dirname + '/now'));

// #5 Serve JSON on a Specific Route
//app.get('/json', (req, res) => {
//  res.json({"message": "Hello json"});
//});

// #6 Use the .env File
app.get('/json', (req, res) => {
   res.json({"message": process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json"});
});

// # 8  chain middleware to create a time server
app.get("/now",(req, res, next) => {
   req.time = new Date().toString();
    console.log(req.time);
    next();
  },
  function (req, res) {
    res.json({"time": req.time});
  }
);

// #9  get route parameter input from the client
//app.get('/:word/echo', (req, res)=>{      
//  res.json({word: req.params.word});  
//});

//#10 get query parameter input from the client
app.get('/name', function (req, res) {	
    res.json({ name: req.query.first + " " + req.query.last });
});

// # 12 get data from post requests
app.post('/name', function(req, res){
  // handle the data in the object req.body  
   res.json({name: req.body.first + " " + req.body.last});
});


 module.exports = app;
