var exec = require('child_process').exec, child, rows, line, big_arr, li;

module.exports = function(cb) {
  child = exec('ps -ef', function(error, stdout, stderr) {
    if (error) {
      console.log("Command error!\n");
      cb(null);
    }

    rows = stdout.toString();
    line = rows.split('\n');

    // Remove the header
    line.pop(line[0]);
    // Remove the last element if it's empty
    if (!line[line.length]) {
      line.pop(line[line.length]);
    }

    big_arr = [];

    line.forEach(function(item) {
      li = item.split(' ');
      li = li.filter(function(n) { return n != '' });
      big_arr.push({
        'UUID' : li[0],
        'PID' : li[1],
        'PPID' : li[2],
        'C' : li[3],
        'STIME' : li[4],
        'TTY' : li[5],
        'TIME' : li[6],
        'CMD' : li[7]
      });
    });

    cb(JSON.stringify(big_arr));
   }); 
}
