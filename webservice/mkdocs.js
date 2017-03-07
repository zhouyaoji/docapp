var shell = require("shelljs")

module.exports = {
  builddocs: function(dir, callback) {
    shell.config.silent = true;
    var ret_val = 0;
    shell.rm('-rf', "./" + dir)
    if (shell.exec('git clone https://github.com/zhouyaoji/'+dir+'.git').code !== 0) {
       console.log('Error: Git clone failed.');
       ret_val = 1; 
    } else {
      shell.cd(dir)
    } 
    if(shell.exec('mkdocs build').code !== 0) {
       console.log("Error: Mkdocs build failed.");
       ret_val = 2;
    }
    return callback(ret_val);
  },
  mvdocs: function(src, dest, callback) {
    var ret_val = 0
    console.log(shell.pwd())
    shell.ls(dest)
    console.log("Source: " + src + "\nDest: " + dest);
    if(shell.mv(src, dest).code !== 0) {
      console.log("Error: files couldn't be moved.");
      ret_val = 3;
    } 
    if(shell.rm('-rf', src).code !== 0) {
      console.log("Error: files couldn't be moved.");
      ret_val = 4;
    } 
    return callback(ret_val);
  }
};
