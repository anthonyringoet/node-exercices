// in a real world example you wouldn't want every request
// to result in IO on your filesystem

var http = require('http');
var path = require('path');
// filesystem module ah yeah!
var fs = require('fs');

http.createServer(function (request, response){
  var lookup = path.basename(decodeURI(request.url)) || 'index.html',
    f = 'static/' + lookup;

  fs.exists(f, function(exists){
    console.log(exists ? lookup + ' is there' : lookup + ' doesn\'t exist');
  });

  if(!response.finished){
    response.writeHead(404);
    response.end('Finishing this request in case anything goes wrong. \nSee log in console');
  }
}).listen(1337);