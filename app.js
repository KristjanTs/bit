var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("mongodb://kristjan:kristjan12345@ds012058.mlab.com:12058/bit", ["users"]);
var bodyParser = require("body-parser");
var less = require('less');
var expressLess = require('express-less');

var app = express();
app.use('/style', expressLess(__dirname + '/public/less'));

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/userlist", function(req, res) {

  db.users.find(function(err, docs){
    res.json(docs);
  });

});

app.post("/userList", function(req, res) {
  db.users.insert(req.body, function (err, doc){
    res.json(doc);
  });
});

app.delete("/userList:id", function(req, res){
  var id = req.params.id;
  db.collection("users").remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  });
});

app.listen(8080);
console.log("Server running on port 8080");
