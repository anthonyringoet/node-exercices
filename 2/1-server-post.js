var http = require('http');
// core querystring module has parse method
// to parse querystring to object
var querystring = require('querystring');
var util = require('util');
var form = require('fs').readFileSync('form.html');

http.createServer(function(request, response){
  if(request.method == "GET"){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(form);
  }
  if(request.method == "POST"){
    var postData = '';
    request.on('data', function(chunk){
      postData += chunk;
    }).on('end', function(){
      var postDataObject = querystring.parse(postData);

      console.log('User posted:\n' + postData);
      response.end('You posted:\n' + util.inspect(postDataObject));
    });
  }
}).listen(2222);