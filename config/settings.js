var path = require('path');
var orm = require('orm');

var opts = {
  database : "dellstore2",
  protocol : "postgres",
  host : "127.0.0.1",
  user : "postgres",
  password : "",
  query : {
    pool : true,
    debug : true
  }
};

module.exports = opts;