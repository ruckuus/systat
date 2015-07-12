f = require('../index.js');

var data = function(error, data) {
  console.log(JSON.stringify(data));
}

f(data);
