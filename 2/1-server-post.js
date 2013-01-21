var http = require('http');
// core querystring module has parse method
// to parse querystring to object
var querystring = require('querystring');
// util.inspect is a handy way of outputting a js object
// to the browser
var util = require('util');
var form = require('fs').readFileSync('form.html');
var maxData = 2 * 1024 * 1024; // 2mb

http.createServer(function(request, response){
  if(request.method == "GET"){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(form);
  }
  if(request.method == "POST"){
    var postData = '';
    request.on('data', function(chunk){
      postData += chunk; // aggregate incoming data in memory
      if(postData > maxData){ // prevent memory overruns
        postData = '';
        this.pause(); // stream.destroy() interferes with the response
        // mechanism, if paused long enough, v8 garb collection will kick in
        reponse.writeHead(413); // request entity too large
        reponse.end('too large!');
      }
    }).on('end', function(){
      if(!postData){
        response.end();
        return; // prevents empty post
      }
      var postDataObject = querystring.parse(postData);

      console.log('User posted:\n' + postData);
      response.end('You posted:\n' + util.inspect(postDataObject));
    });
  }
}).listen(2222);