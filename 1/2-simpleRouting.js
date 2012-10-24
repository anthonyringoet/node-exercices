var http = require('http');
// see https://npmjs.org/package/path
var path = require('path');

// define routes
var pages = [
  {route: '', output: 'Home <br> try <a href="/about">about</a>, <a href="/another page">another page</a> or <a href="/foobar">some bogus url</a>'},
  {route: 'about', output: 'A simple routing with Node example'},
  // the function in .output has access to it's parent
  // through the `this` keyword
  {route: 'another page', output: function(){return 'Here\'s ' +this.route;}}
];

http.createServer(function(request, response){
  // request object contains lots of info
  // decodeURI fixes our route with space so it resolves the %20
  var lookup = path.basename(decodeURI(request.url));
  // loop through our pages array
  // check if lookup var matches the current route
  // if all fails give a 404
  pages.forEach(function(page){
    // forEach is ecmascript 5 but fuck yeah safe to use in v8
    if(page.route === lookup){
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(typeof page.output === 'function' ? page.output() : page.output);
    }
  });
  // if nothing matches, respond.end would never be called
  // the client would continue to wait for a response until timeout
  // avoid by checking response.finished and fix if falsy
  if(!response.finished){
    response.writeHead(404);
    response.end('Page not found (or something went wrong)');
  }
}).listen(1337);