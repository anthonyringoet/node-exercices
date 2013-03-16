var csv = require('ya-csv');

var writer = csv.createCsvFileWriter('data.csv');

var data = [['pink floyd', 'marble sounds', 'kings of leon'], ['explosions in the sky', 'mogwai', 'godspeed you black emperor', 'codes in the clouds', 'mono']];

data.forEach(function(rec){
  writer.writeRecord(rec);
});