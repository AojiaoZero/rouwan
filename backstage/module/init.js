var id=0;
var os=require('os');
var restartEd=false;

var restart=function(f){
	if(restartEd){return;}
	restartEd=true;
	var email='';
	if(f){
		email=' [EMAIL NTS]';
		rw.log.write('Auto Restart Failed to Send Mail ...','backstage');
	}
	rw.log.write('Auto Restarting ['+process.memoryUsage().rss+'] ['+process.uptime()+']'+email+' ...','system');
	var exec=require('child_process').exec;
	exec('node '+__dirname+'/../lib/restart.js '+process.pid+' "'+rw.config.backstage.startScript+'"');
}

var checkAutoRestart=function(){
	var f=false;
	if(rw.config.backstage.autoRestartMem<1){
		if((process.memoryUsage().rss/os.totalmem())>rw.config.backstage.autoRestartMem){
			f=true;
		}
	}else{
		if(process.memoryUsage().rss>rw.config.backstage.autoRestartMem){
			f=true;
		}
	}
	if(!f){
		setTimeout(checkAutoRestart,rw.config.backstage.autoRestartInt);
		return;
	}
	rw.log.write('Auto Restart ['+process.memoryUsage().rss+'] ['+process.uptime()+']','backstage');
	rw.log.write('Auto Restart Sending Mail ['+rw.config.backstage.email+'] ...','backstage');
	
	id=setTimeout(function(){
		restart(true);
	},10000);
	
	rw.mail('backstage',{
		from:rw.config.mail['backstage']['auth']['user']+" <"+rw.config.mail['backstage']['auth']['user']+">",
		to:rw.config.backstage.email,
		subject:"Auto Restart",
		html:"Auto Restart<br />["+process.memoryUsage().rss+"] ["+process.uptime()+"] ["+rw.config.backstage.autoRestartMem+"]"
	},function(){
		clearTimeout(id);
		restart();
	});
	
};

exports.run=function(){
	if(rw.config.backstage.autoRestartMem!=0){
		setTimeout(checkAutoRestart,rw.config.backstage.autoRestartInt);
	}
};