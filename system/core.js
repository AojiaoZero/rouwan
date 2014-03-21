console.log('- First Tick -');

global.rw={};
global.rw.emptyCall=function(){return;};

console.log('Load System Module [FS] ...');
global.rw.fs=require('fs');
console.log('System Module [FS] Loaded.');

console.log('Load Config File ...');
global.rw.config=require('../config/config.js').config;
console.log('Config File Loaded.');

console.log('Load Module [Util] ...');
global.rw.util=require('./util.js');
console.log('Module [Util] Loaded.');

console.log('Load Module [Log] ...');
global.rw.log=require('./log.js');
rw.log.write('Module [Log] Loaded.');

rw.log.write('Load Module [Dying] ...');
global.rw.dying=require('./dying.js').dying;
rw.log.write('Module [Dying] Loaded.');

rw.log.write('Bind Process SIG ...');
process.on('uncaughtException',function(e){
	rw.log.write('uncaughtException: '+e.stack,'error');
});
process.on('SIGINT',function(){
	rw.dying('SIGINT');
});
process.on('SIGTERM',function(){
	rw.dying('SIGTERM');
});
rw.log.write('Process SIG Binded.');

rw.log.write('Load System Module [HTTP] ...');
global.rw.hs=require('http');
rw.log.write('System Module [HTTP] Loaded.');

rw.log.write('Load System Module [HTTPS] ...');
global.rw.hssl=require('https');
rw.log.write('System Module [HTTPS] Loaded.');

rw.log.write('Load System Module [Url] ...');
global.rw.url=require('url');
rw.log.write('System Module [Url] Loaded.');

rw.log.write('Load System Module [Path] ...');
global.rw.path=require('path');
rw.log.write('System Module [Path] Loaded.');

rw.log.write('Load System Module [Zlib] ...');
global.rw.zlib=require('zlib');
rw.log.write('System Module [Zlib] Loaded.');

rw.log.write('Load System Module [Util.Inspect] ...');
global.rw.inspect=require('util').inspect;
rw.log.write('System Module [Util.Inspect] Loaded.');

rw.log.write('Load System Module [Querystring] ...');
global.rw.querystring=require('querystring');
rw.log.write('System Module [Querystring] Loaded.');

rw.log.write('Load Module [Template] ...');
global.rw.t={};
global.rw.t=require('./template.js');
rw.log.write('Module [Template] Loaded.');

rw.log.write('Load Module [Validator] ...');
global.rw.validator=require('./validator.js');
rw.log.write('Module [Validator] Loaded.');

rw.log.write('Load Module [Counter] ...');
global.rw.counter=require('./counter.js');
rw.log.write('Module [Counter] Loaded.');

rw.log.write('Load Module [Cache] ...');
global.rw.cache=require('./cache.js');
rw.log.write('Module [Cache] Loaded.');

rw.log.write('Load Module [Mail] ...');
global.rw.server=require('./mail.js');
rw.log.write('Module [Mail] Loaded.');

rw.log.write('Load Module [Session] ...');
global.rw.sess=require('./session.js');
rw.log.write('Module [Session] Loaded.');

rw.log.write('Load Module [Mongo] ...');
global.rw.mongo=require('./mongo.js');
rw.log.write('Module [Mongo] Loaded.');

rw.log.write('Load Module [Http] ...');
global.rw.http=require('./http.js');
rw.log.write('Module [Http] Loaded.');

rw.log.write('Load Module [Server] ...');
global.rw.server=require('./server.js');
rw.log.write('Module [Server] Loaded.');