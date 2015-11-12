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
  configName: 'mtt-conf',

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

  //severType is default to jello! @todo config this
  var serverType = argv.type || 'jello';
  //If server start, set serve type
  if(argv._[0] === 'server' && argv._[1] === 'start') {
    argv.type = serverType;
  }
  switch (serverType) {
    case 'jello' :
      //先加载jello初始配置
      fis.require('jello')(fis);
      //加载mtt默认配置
      require("../config/jello")(fis);
      break;
    //todo other server types
    default :
      break;
  }

  fis.cli.run(argv, env);
});
