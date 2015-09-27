var app = require("http");

var server = app.createServer();

server.on("request",function(req,res){

res.writeHead(200,{"contents-Type": "text/plain"});
res.write("はろー");
res.end();


});
server.listen(1337, '127.0.0.1');
console.log("wait...");
