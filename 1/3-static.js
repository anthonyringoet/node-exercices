// in a real world example you wouldn't want every request
// to result in IO on your filesystem

var http = require('http');
var path = require('path');
var fs = require('fs');
var mimeTypes = {
  '.js' : 'text/javascript',
  '.html' : 'text/html',
  '.css' : 'text/css'
};

http.createServer(function (request, response){
  var lookup = path.basename(decodeURI(request.url)) || 'index.html',
    f = 'static/' + lookup;

  fs.exists(f, function(exists){
    if(exists){
      fs.readFile(f, function(err, data){
        var headers = {'Content-type': mimeTypes[path. extname(lookup)]};
        response.writeHead(200, headers);
        response.end(data);

        if(err){
          response.writeHead(500);
          response.end('Server error');
          return;
        }

      });
      return;
    }
    else{
      response.writeHead(404);
      response.end('404 - Item not found');
    }
    console.log(exists ? lookup + ' is there' : lookup + ' doesn\'t exist');
  });
}).listen(1337);