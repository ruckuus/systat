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

describe('test mapObject()', function() {
  it('should return correctly formatted hash table', function() {
    var expected = {
      'a' : 1,
      'b' : 2,
      'c' : 3
    };

    var header = ['a', 'b', 'c'];
    var vals = [1, 2, 3];
    var srv = new sysstat.StatService();

    expect(expected).to.eql(srv.mapObject(header, vals));
  });

  it('should return Error when passed empty arguments', function() {
    var expected = new Error('Invalid arguments');
    var srv = new sysstat.StatService();

    expect(expected).to.eql(srv.mapObject([], []));
  });

  it('should return Error when passed invalid arguments', function() {
    var expected = new Error('Invalid arguments');
    var srv = new sysstat.StatService();

    expect(expected).to.eql(srv.mapObject([], "hello world"));
  });
});

describe('test parseHeader()', function() {
  it('should return header array', function() {
    var expected = ['ID', 'COL1', 'COL2', 'COL3'];
    var lines = "ID COL1 COL2 COL3\n0 a b c \n1 d e f".split('\n');
    var srv = new sysstat.StatService();

    expect(expected).to.eql(srv.parseHeader(lines));
  });

  it('should return error given empty array', function() {
    var expected = new Error("Invalid argument");
    var lines = [];
    var srv = new sysstat.StatService();

    expect(expected).to.eql(srv.parseHeader(lines));
  });

  it('should return error given non-array arguments', function() {
    var expected = new Error("Invalid argument");
    var lines = "This is not array";
    var srv = new sysstat.StatService();

    expect(expected).to.eql(srv.parseHeader(lines));
  });
});

describe('test parseOutput()', function() {
  it('should return correctly formatted object', function() {
    var lines = "ID COL1 COL2 COL3\n0 a b c \n1 d e f";
    var expected = [{
      'ID' : '0',
      'COL1' : 'a',
      'COL2' : 'b',
      'COL3' : 'c'
    },
    {
      'ID' : '1',
      'COL1' : 'd',
      'COL2' : 'e',
      'COL3' : 'f'
    }];

    var srv = new sysstat.StatService();
    expect(expected).to.eql(srv.parseOutput(lines));
  });

  it('should return error given empty argument', function() {
    var expected = new Error('Invalid argument');
    var srv = new sysstat.StatService();
    expect(expected).to.eql(srv.parseOutput(""));
  });
});
