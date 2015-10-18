// Requires \\
var express = require('express');

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(express.static(__dirname + '/public'));

// Routes \\
app.get('/', function(req, res){
  res.sendFile('html/index.html', {root : './public'})
});

// Creating Server and Listening for Connections \\
var port = 8081
app.listen(port, function(){
  console.log('Server running on port ' + port);

})