let express = require('express');
let bodyParser = require('body-parser');
let app = express();
require('dotenv').config();

// #1
//console.log("Hello World");

// #2
//app.get('/', (req, res) => {
//  res.send("Hello Express");
//});

// #11
// parse urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//#4
app.use('/public', express.static( __dirname + '/public'));

// #7
app.use('/',function simpleLogger(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip); 
  next();
});

// #8
app.use('/now', express.static(__dirname + '/now'));

// #11 parse application/json
app.use(bodyParser.json);

// #3
app.get('/', function(req, res) {
 res.sendFile(__dirname + "/views/index.html");
});

// #5 Serve JSON on a Specific Route
app.get('/json', (req, res) => {
  res.json({"message": "Hello json"});
});

// #6 Use the .env File
app.get('/json', (req, res) => {
   res.json({"message": process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json"});
});

// # 8
app.get("/now",(req, res, next) => {
   req.time = new Date().toString();
    console.log(req.time);
    next();
  },
  function (req, res) {
    res.json({"time": req.time});
  }
);

// #9 
app.get('/:word/echo', (req, res)=>{ 
  let word = req.params.word;    
  res.json({echo: word});
});

//#10
app.get('/name', function (req, res) {
	const first = req.query.first;
	const last = req.query.last;
        res.json({ "name": first + " " + last });
});

// # 12
app.post('/name', function(req, res){
  // handle the data in the object req.body
  res.json({ name: req.body.first + " " + req.body.last });
});


 module.exports = app;
