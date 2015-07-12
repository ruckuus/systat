var expect = require('chai').expect,
    util = require('util'),
    sysstat = require('../index.js');

describe('test removeEmptyElements() ', function() {
  it('should return clean Array', function() {
    var expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var myString = "a b    c d e f g    h ";
    var tmp = myString.split(' ');

    var srv = new sysstat.StatService();
    expect(expected).to.eql(srv.removeEmptyElements(tmp));
  });

  it('should return Error when passed empty argument', function() {
    var myString = '';
    var srv = new sysstat.StatService();
    var expected = new Error('Invalid argument');

    expect(srv.removeEmptyElements(myString)).to.eql(expected);
  });

  it('should return Error when passed non-Array argument', function() {
    var myString = "abcdefg";
    var srv = new sysstat.StatService();
    var expected = new Error('Invalid argument');

    expect(srv.removeEmptyElements(myString)).to.eql(expected);
  });
});

describe('test mapHeaderData()', function() {
  it('should return correctly formatted hash table', function() {
    var expected = {
      'a' : 1,
      'b' : 2,
      'c' : 3
    };

    var header = ['a', 'b', 'c'];
    var vals = [1, 2, 3];
    var srv = new sysstat.StatService();

    expect(expected).to.eql(srv.mapHeaderData(header, vals));
  });

  it('should return Error when passed empty arguments', function() {
    var expected = new Error('Invalid arguments');
    var srv = new sysstat.StatService();

    expect(expected).to.eql(srv.mapHeaderData([], []));
  });

  it('should return Error when passed invalid arguments', function() {
    var expected = new Error('Invalid arguments');
    var srv = new sysstat.StatService();

    expect(expected).to.eql(srv.mapHeaderData([], "hello world"));
  });
});
