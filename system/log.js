exports.write=function(data,type,sync){
	type=type?type:'system';
	var color=30;
	data='['+rw.util.date('y-m-d h:i:s.q')+'] '+data;
	if(rw.config.log[type] && rw.config.log[type].of){
		color=rw.config.log[type].color;
		exports.writeFile(data,rw.config.log[type].path+rw.config.log[type].filename+'_'+rw.util.date('ymd')+'.log',sync);
	}else if(!config[type]){
		exports.writeFile(data,rw.config.log['system'].path+rw.config.log['system'].filename+'_'+rw.util.date('ymd')+'.log',sync);
	}
	console.log('\033[0;'+color+';1m'+data+'\033[0m');
};

exports.writeFile=function(data,path,sync){
	try{
		if(sync){
			rw.fs.appendFileSync(path,data+'\n');
		}else{
			rw.fs.appendFile(path,data+'\n',function(e){
				if(e){console.log(e.stack);}
			});
		}
	}catch(e){
		console.log(e);
	}
};