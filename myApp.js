let express = require('express');
let app = express();
/*
// #7
app.use('/',function simpleLogger(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip); 
  next();
});
*/

// #1
//console.log("Hello World", express.static);

// #2
//app.get('/', (req, res) => {
//  res.send("Hello Express");
//});

// #4
app.use("/public", express.static( __dirname + "/public"));

// #3
//app.get("/", function(req, res) {
//  res.sendFile(__dirname + //"/views/index.html");
//});

/*
// #5
app.get('/json', (req, res) => {
  res.json({"message": "Hello json"});
});
*/

/*
// #6
app.get('/json', (req, res) => {
  if (process.env["MESSAGE_STYLE"] === uppercase) {
      res.json({"message": "HELLO JSON"});        
  } else {
      res.json({"message": "Hello json"});
  }
});
*/

// #8
/*
app.use('/now', express.static(__dirname + '/now'));

app.get("/now",(req, res, next) => {
    req.time = new Date().toString();
    console.log(req.time);
    next();
  },
  function (req, res) {
    res.json({"time": req.time});
  }
);
*/

// #9 
app.get('/:word/echo', (req, res)=>{     
  res.json({echo: req.params.word});
});






























 module.exports = app;
