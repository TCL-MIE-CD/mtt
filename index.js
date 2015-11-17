//vi mtt/index.js
var fis = module.exports =  require("fis3");
fis.require.prefixes.unshift("mtt");
fis.cli.name = "mtt";
fis.cli.info = require("./package.json");

//scaffold for mtt github
fis.config.set("scaffold.namespace", "mtt-scaffold");

fis.config.set("component.github", {
  author: "mtt-components"
});


