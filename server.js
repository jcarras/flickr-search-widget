var express = require("express");
var app = express();

app.configure(function(){
    app.use(express.static(__dirname + '/public/'));
});

var server = app.listen(5000);
console.log("*****Server running on port 5000*****");