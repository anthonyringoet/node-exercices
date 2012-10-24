var http = require('http');
http.createServer(function(request, response){
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end('Your server is rolling!');
}).listen(1337);
console.log('server is rolling on port 1337');