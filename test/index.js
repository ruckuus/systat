var should = require('chai').should,
    sysstat = require('../index');

var cb = function(err, data) {
    console.log(JSON.stringify(data));
}

describe('test doIt() command', function() {
  it('should return JS object on success', function() {
    var cmd = 'ps -ef | head -n 2';
    sysstat.doIt(cmd, cb);
  });
})

