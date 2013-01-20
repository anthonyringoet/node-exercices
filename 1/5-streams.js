// streams pipe the content as they are read from the fs
// to the response obj, it's a lot faster because
// otherwise it would wait for the full file to be read in memory

var http = require('http');
var path = require('path');
var fs = require('fs');
var mimeTypes = {
  '.js' : 'text/javascript',
  '.html' : 'text/html',
  '.css' : 'text/css'
};
var cache = {};

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
       var headers = {'Content-type': mimeTypes[path. extname(lookup)]};

       if(cache[f]){
          response.writeHead(200, headers);
          response.end(cache[f].content);
          return;
       }

       var s = fs.createReadStream(f).once('open', function(){
        response.writeHead(200, headers);
        // stream.pipe is smart enough
        // to call response.end for us
        this.pipe(response); // this method is bad ass
        // take our object from disk and stream it to the network
        // socket as it is being read
       })
       .once('error', function(e){
        console.log(e);
        response.writeHead(500);
        response.end('Server error!');
       });

       // check data as its being streamed
       // copy into buffer that we made in cache[f].content
       // using fs.stat to get file size for file cache buffer
       fs.stat(f, function(err, stats){
        var bufferOffset = 0;
        cache[f] = {content: new Buffer(stats.size)};
        s.on('data', function(chunk){
          // default buffersize is 64kb
          // for sizes smaller then this
          // only one data event will be triggered
          chunk.copy(cache[f].content, bufferOffset);
          bufferOffset += chunk.length;
        });
       });

      return;
    }
    else{
      response.writeHead(404);
      response.end('404 - Item not found');
    }
  });
}).listen(1337);