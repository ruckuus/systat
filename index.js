var exec = require('child_process').exec, child, rows, line, big_arr, li, header;

function removeEmptyElements(arr) {
  return arr.filter(function(e) {
    return e.trim() != '';
  });
}

function mapHeaderData(keys, elements) {
  if (keys.length != elements.length) {
    console.log("Error");
  }

  var myHash = {};
  for (var i = 0; i < keys.length; i++) {
    myHash[keys[i]] = elements[i];
  }

  return myHash;
}

function doIt(command, cb) {
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
      header = removeEmptyElements(header);

      // Remove the last element if it's empty
      if (!line[line.length]) {
        line.pop();
      }

      big_arr = [];

      line.forEach(function(item) {
        li = item.split(' ');
        li = removeEmptyElements(li);

        big_arr.push(mapHeaderData(header, li));

      });

      cb(error, big_arr);
   });
}

module.exports = function(cb) {
  doIt('ps -ef', cb);
}
