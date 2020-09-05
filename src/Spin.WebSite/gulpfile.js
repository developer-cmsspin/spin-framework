/// <binding AfterBuild='default' Clean='clean' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007


Validate requireDir https://github.com/aseemk/requireDir
*/

require('./tasks/spin-sys/sign.js')()

var conf = require("./appsettings.json")
if(!conf.enviroment)
  conf.enviroment = "dev";

console.log();
console.log("== > YOU ARE CONNECT TO ENVIROMENT " + conf.Enviroment);
console.log();

requireDir = require('require-dir');
var dir = requireDir('./tasks', 
{ 
    recurse: true, 
    extensions: ['.js', '.json'] ,
    filter: function (fullPath) {
        var isFilter = false;
        isFilter =fullPath.includes("/"+conf.Enviroment+"/") || 
                                    fullPath.endsWith("spin-sys") || 
                                    fullPath.endsWith("spin-sys/"+conf.Enviroment) || 
                                    fullPath.endsWith("/"+conf.Enviroment);
        
        return isFilter;
      }
});
