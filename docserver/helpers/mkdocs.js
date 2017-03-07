var shell = require("shelljs")

module.exports = {
  builddocs: function(dir) {
    shell.config.silent = true;
    shell.rm('-rf', dir)
    if (shell.exec('git clone https://github.com/zhouyaoji/'+dir+'.git').code !== 0) {
       shell.echo('Error: Git clone failed.');
       return 1; 
    } else {
      shell.cd(dir)
    } 
    if(shell.exec('mkdocs build').code !== 0) {
       shell.echo("Error: Mkdocs build failed.");
       return 2;
    }
    return 0;
  },
  copydocs: function(src, dest) {
    if(shell.cp('-R', src, dest).code !== 0) {
      shell.echo("Error: files couldn't be copied.");
      return 3;
    } 
    return 0;
  }
};
