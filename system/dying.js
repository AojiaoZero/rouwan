exports.dying=function(sig){
	rw.log.write('Dying SIG ['+sig+'].','system',true);
	if(rw.config.dying.session.save && rw.sessionLoaded){
		rw.log.write('Saving Session...','system',true);
		rw.fs.writeFileSync(rw.config.dying.session.path+'session.json',JSON.stringify(rw.session));
		rw.log.write('Session Saved ['+rw.config.dying.session.path+'].','system',true);
	}
	rw.log.write(' - Last Tick - ','system',true);
	process.exit();
};