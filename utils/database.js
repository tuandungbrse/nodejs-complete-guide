var mysql = require('mysql2');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node-complete'
});

module.exports = pool.promise();
