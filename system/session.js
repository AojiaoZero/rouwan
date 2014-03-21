global.rw.session={};//randMd5Id
global.rw.sessionLoaded=false;

var newSession=function(sid){
	sid=sid?sid:rw.util.randMd5Id();
	return {sid:sid,ctime:new Date().getTime(),utime:new Date().getTime(),data:{}};
};

exports.init=function(callback){
	rw.log.write('Initializing Session ...');
	if(rw.config.dying.session.save){
		rw.log.write('Reloading Session ...');
		if(rw.fs.existsSync(rw.config.dying.session.path+'session.json')){
			var fss=rw.fs.statSync(rw.config.dying.session.path+'session.json');
			rw.log.write('Session Size ['+fss.size+']');
			try{
				rw.session=JSON.parse(rw.fs.readFileSync(rw.config.dying.session.path+'session.json'));
				rw.fs.unlinkSync(rw.config.dying.session.path+'session.json');
			}catch(e){
				rw.log.write('Session Error. '+e,'error');
			}
		}
	}
	rw.sessionLoaded=true;
	callback();
};

exports.start=function(req,res,f){
	var nc=false;
	if(!req.cookie[rw.config.http.cookie.prefix]){
		if(f){
			req.session=newSession('fake');
			return;
		}
		nc=true;
		req.cookie[rw.config.http.cookie.prefix]=rw.util.randMd5Id();
	}
	if(!rw.session[req.cookie[rw.config.http.cookie.prefix]]){
		if(f){
			req.session=newSession('fake');
			return;
		}
		rw.session[req.cookie[rw.config.http.cookie.prefix]]=newSession(req.cookie[rw.config.http.cookie.prefix]);
		var date=new Date();
		date.setTime(date.getTime()+rw.config.http.cookie.lifeTime*1000);
		//res.setHeader("Set-Cookie",["SID="+req.cookie['SID'],"expires=Tue, 26-Mar-2013 08:40:39 GMT",'maxage='+lifetime]);
		//console.log("SID="+req.cookie['SID']+"; path=/; expires="+date.toGMTString()+"; maxage="+config.lifeTime+"; httponly");
		if(nc){
			res.setHeader("Set-Cookie",rw.config.http.cookie.prefix+"="+req.cookie[rw.config.http.cookie.prefix]+"; path=/; expires="+date.toGMTString()+"; maxage="+rw.config.http.cookie.lifeTime+"; httponly");
		}
	}
	req.session=rw.session[req.cookie[rw.config.http.cookie.prefix]];
};