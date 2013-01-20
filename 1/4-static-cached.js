// avoid fs IO on every request with simple caching
// see logs from second request

var http = require('http');
var path = require('path');
var fs = require('fs');
var mimeTypes = {
  '.js' : 'text/javascript',
  '.html' : 'text/html',
  '.css' : 'text/css'
};
var cache = {};

function cacheAndDeliver(f, cb){
  if(!cache[f]){
    fs.readFile(f, function(err, data){
      if(!err){
        cache[f] = {content: data};
      }
      cb(err, data);
    });
    return;
  }
  console.log('loading ' + f + ' from cache');
  cb(null, cache[f].content);
}

http.createServer(function (request, response){
  var lookup = path.basename(decodeURI(request.url)) || 'index.html',
    f = 'static/' + lookup;

  if(request.url == '/favicon.ico'){
    // pretty harsh handling
    // dont want the requests in this example
    response.end();
    return;
  }


  fs.exists(f, function(exists){

    if(exists){
      cacheAndDeliver(f, function(err, data){
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
  });
}).listen(1337);