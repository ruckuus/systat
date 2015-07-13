var exec = require('child_process').execFile, child, rows, line, big_arr, li, header;

function StatService() {};

StatService.prototype = {
  removeEmptyElements: function(arr) {
    if (!arr) {
      return new Error('Invalid argument');
    }

    if (!Array.isArray(arr)) {
      return new Error('Invalid argument');
    }

    return arr.filter(function(e) {
      return e.trim() != '';
    });
  },

  mapObject: function(keys, elements) {
    if (keys.length != elements.length) {
      return new Error('Invalid argument');
    }

    if (!Array.isArray(keys) || !Array.isArray(elements)) {
      return new Error('Invalid argument');
    }

    var myHash = {};
    for (var i = 0; i < keys.length; i++) {
      myHash[keys[i]] = elements[i];
    }

    return myHash;
  },

  parseHeader: function(lines) {
    header = lines.shift();
    header = header.split(' ');
    header = StatService.prototype.removeEmptyElements(header);

    return header;
  },

  parseOutput: function(textArr) {
    rows = textArr.toString();
    line = rows.split('\n');

    // Get header
    header = StatService.prototype.parseHeader(line);

    // Remove the last element if it's empty
    if (!line[line.length]) {
      line.pop();
    }

    big_arr = [];

    line.forEach(function(item) {
      li = item.split(' ');
      li = StatService.prototype.removeEmptyElements(li);

      big_arr.push(StatService.prototype.mapObject(header, li));
    });

    return big_arr;
  },

  doExec: function(command, cb) {
    child = exec(command['path'], command['args'], command['options'], function(error, stdout, stderr) {
        if (error) {
          error.err = new Error('Invalid arguments.');
          cb(error);
        }

        cb(error, StatService.prototype.parseOutput(stdout));
     });
  }
}

function newStatService() {
  return new StatService();
}

module.exports.exec = function(cb) {
  var srv = newStatService();
  srv.doExec({
    'path' : 'ps',
    'args' : ['-ef'],
    'options' : {}
  }, cb);
}

module.exports.StatService = StatService;
