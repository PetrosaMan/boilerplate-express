let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// #1
console.log("Hello World", express.static);

// #2
app.get('/', (req, res) => {
  res.send("Hello Express");
});

// parse urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// #11 parse application/json
app.use(bodyParser.json);

//#4
app.use("/public", express.static( __dirname + "/public"));

// #7
app.use('/',function simpleLogger(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip); 
  next();
});

// #8
app.use('/now', express.static(__dirname + '/now'));

// #3
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// #5
app.get('/json', (req, res) => {
  res.json({"message": "Hello json"});
});

// #6
app.get('/json', (req, res) => {
  if (process.env["MESSAGE_STYLE"] === uppercase) {
      res.json({"message": "HELLO JSON"});        
  } else {
      res.json({"message": "Hello json"});
  }
});

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
app.get('/word/echo', (req, res)=>{     
  res.json({echo: req.params.word});
});

// #10
app.get('/name', function (req, res) {
	const first = req.query.first;
	const last = req.query.last;
        res.json({ "name": first + ' ' + last });
    });

// # 12
app.post('/name', function(req, res){
  // handle the data in the object req.body
  let Name = req.body.first + " " + req.body.last;    
  res.json({ "name": Name });
});


 module.exports = app;
