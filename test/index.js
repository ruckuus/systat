var expect = require('chai').expect,
    util = require('util'),
    sysstat = require('../index.js');

describe('test removeEmptyElements() ', function() {
  it('should return clean Array', function() {
    var expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var myString = "a b    c d e f g    h ";
    var myString = myString.split(' ');

    var srv = new sysstat.StatService();
    expect(expected).to.eql(srv.removeEmptyElements(myString));
  });
})

