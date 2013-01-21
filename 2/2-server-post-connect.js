// connect is contrib piece of middleware (base of express)
// gives syntactic sugar: request.body is automatically parsed obj
// instead of querystring
var connect = require('connect');
var util = require('util');
var form = require('fs').readFileSync('form.html');

connect(connect.limit('64kb'), connect.bodyParser(),
  function(request, response){
  if(request.method == "GET"){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(form);
  }
  if(request.method == "POST"){
    console.log('User posted:\n' + request.body);
    response.end('You posted:\n' + util.inspect(request.body));
  }
}).listen(2222);