var exec = require('child_process').exec, child, rows, line, big_arr, li, header;

function StatService() {};

StatService.prototype = {
  utilRemoveEmptyElements: function(arr) {
    return arr.filter(function(e) {
      return e.trim() != '';
    });
  },

  utilMapHeaderData: function(keys, elements) {
    if (keys.length != elements.length) {
      console.log("Error");
    }

    var myHash = {};
    for (var i = 0; i < keys.length; i++) {
      myHash[keys[i]] = elements[i];
    }

    return myHash;
  },

  doExec: function(command, cb) {
    child = exec(command, function(error, stdout, stderr) {
        if (error) {
          console.log("Command error!\n");
          cb(error);
        }

        rows = stdout.toString();
        line = rows.split('\n');

        // Get header
        header = line.shift();
        header = header.split(' ');
        header = StatService.prototype.utilRemoveEmptyElements(header);

        // Remove the last element if it's empty
        if (!line[line.length]) {
          line.pop();
        }

        big_arr = [];

        line.forEach(function(item) {
          li = item.split(' ');
          li = StatService.prototype.utilRemoveEmptyElements(li);

          big_arr.push(StatService.prototype.utilMapHeaderData(header, li));

        });

        cb(error, big_arr);
     });
  }
}

function newStatService() {
  return new StatService();
}

module.exports =  function(cb) {
  var srv = newStatService();
  srv.doExec('ps -ef', cb);
}
