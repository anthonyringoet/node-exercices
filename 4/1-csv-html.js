var csv = require('ya-csv');
var options = {
  'separator': ',',
  'columnsFromHeader': true
};

var reader = csv.createCsvFileReader('songs.csv', options);


var data = [];

reader.on('data', function(rec){
  data.push(rec);
}).on('end', function(){
  console.log('all your data \n ----------------\n' + data);
});

// array with objects inside is complete
data.forEach(function(item){
  console.log(item);
});
