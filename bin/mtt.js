#!/usr/bin/env node
// vi mtt/bin/mtt.js
var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var mttCli = require("../lib/cli");
var path = require('path');
var cli = new Liftoff({
  name: 'mtt', // 命令名字
  processTitle: 'mtt',
  moduleName: 'mtt',
  configName: 'fis-conf',

  // only js supported!
  extensions: {
    '.js': null
  }
});

cli.launch({
  cwd: argv.r || argv.root,
  configPath: argv.f || argv.file
}, function(env) {
  var fis;
  if (!env.modulePath) {
    fis = require('../');
  } else {
    fis = require(env.modulePath);
  }
  fis.set('system.localNPMFolder', path.join(env.cwd, 'node_modules/mtt'));
  fis.set('system.globalNPMFolder', path.dirname(__dirname));

  //reset cli by mtt
  mttCli(fis);

  fis.cli.run(argv, env);
});
