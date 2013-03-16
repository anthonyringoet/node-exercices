var csv = require('ya-csv');
var options = {
       'separator': '~',
       'quote': '|',
       'escape': '|'
};
var writer = csv.createCsvFileWriter('data.csv', options);

// write to csv on disk
var data = [['pink floyd', 'marble sounds', 'kings of leon'], ['explosions in the sky', 'mogwai', 'godspeed you black emperor', 'codes in the clouds', 'mono']];

data.forEach(function(rec){
  writer.writeRecord(rec);
});


// and now read it back from file
var reader = csv.createCsvFileReader('data.csv', options);
var data = [];

reader.on('data', function(rec){
  data.push(rec);
}).on('end', function(){
  console.log('here is your data back sir: \n\n' + data);
});