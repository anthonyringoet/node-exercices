var csv = require('ya-csv');
var http = require('http');

http.createServer(function(request, response){
  response.write('[');
  // kinda dumb because this file is really small :)
  csv.createCsvFileReader('data.csv')
  .on('data', function(data){
    response.write(JSON.stringify(data));
  }).on('end', function(){
    response.end();
  });
}).listen(8080);