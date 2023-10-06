let express = require('express');
let app = express();
let bodyParser = require('body-parser');

require('dotenv').config();

// #1 meet the console
console.log("Hello World");

// #2 start a working express server
//app.get('/', (req, res) => {
  //res.send("Hello Express");
//});

// #7 mount the logger middleware
app.use('/',function simpleLogger(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip); 
next();
});

// #11 mount the body parser middleware
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// #3 serve an html file
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//#4 serve static assets
app.use('/', express.static( __dirname + '/public'));


app.use('/now', express.static(__dirname + '/now'));

// #5 Serve JSON on a Specific Route
//app.get('/json', (req, res) => {
  //res.json({"message": "Hello json"});
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
app.get('/:word/echo', (req, res)=>{ 
  let word = req.params.word;    
  res.json({echo: word});
});

//#10 get query parameter input from the client
//app.get('/name', function (req, res) {	
//    res.json({ "name": req.query.first + " " + req.query.last });
//});

// # 12 get data from post requests
app.post('/name', function(req, res){
  // handle the data in the object req.body  
   res.json({name: req.body.first + " " + req.body.last});
});


 module.exports = app;
