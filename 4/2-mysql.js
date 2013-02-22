var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root' // mamp root password!
  // debug: true
});

connection.connect();
connection.query('CREATE DATABASE `node-test', function(err){
  if(err) throw err;
});
connection.end();