// check couchdb admin interface on local machine
// http://localhost:5984/_utils/

var cradle = require('cradle');
var db = new(cradle.Connection)().database('quotes');
var params = {author: process.argv[2], quote: process.argv[3]};

function errorHandler(err){
  if(err) {
    console.log(err);
    process.exit();
  }
}

function checkAndSave(err){
  errorHandler(err);

  if(params.author && params.quote){
    db.save({ author: params.author, quote: params.quote}, errorHandler);
  }
}

db.exists(function(err, exists){
  errorHandler(err);

  if(!exists) { db.create(checkAndSave); return; }
  checkAndSave();
});

// check results in couch db admin interface
// http://localhost:5984/_utils/database.html?quotes