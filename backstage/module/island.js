var common=require(__dirname+'/../lib/common.js');

var loginFaill={};
loginFaill.count=0;

var dataReceived=function(req,res){
	if(!req || !req.post || !req.post.do){
		rw.http.throw(3,res);
		req=null;
		res=null;
		return;
	}
	if(req.post.do!='login'){
		if(!common.checkAuth(req,res)){
			rw.log.write('Auth Fail ['+req.post.do+'] ['+req.connection.remoteAddress+']','backstage');
			req=null;
			res=null;
			return;
		}
	}
	switch(req.post.do){
		case 'login':
			if(loginFaill[req.connection.remoteAddress]){
				if((new Date().getTime()-loginFaill[req.connection.remoteAddress].t)>3600000){
					loginFaill[req.connection.remoteAddress].c=0;
				}
				if(loginFaill[req.connection.remoteAddress].c>4){
					rw.http.zout(JSON.stringify({'js':'$m.throw(json.re)','re':[2]}),req,res);
					rw.log.write('Locked Login ['+req.post.user+'] ['+req.post.pass+'] ['+req.connection.remoteAddress+']','backstage');
					req=null;
					res=null;
					return;
				}
			}
			if(req.post.user==rw.config.backstage.user && req.post.pass==rw.config.backstage.pass){
				req.session.data['rouwanbs_login']='yes';
				rw.http.zout('{"js":"$m.logined()"}',req,res);
				rw.log.write('Login ['+req.post.user+'] ['+req.connection.remoteAddress+']','backstage');
			}else{
				rw.http.zout(JSON.stringify({'js':'$m.throw(json.re)','re':[1]}),req,res);
				if(loginFaill.count>100){
					loginFaill=null;
					loginFaill={};
					loginFaill.count=0;
				}
				if(!loginFaill[req.connection.remoteAddress]){
					loginFaill[req.connection.remoteAddress]={c:0,t:new Date().getTime()};
					loginFaill.count++;
				}
				loginFaill[req.connection.remoteAddress].c++;
				rw.log.write('Bad Login '+loginFaill[req.connection.remoteAddress].c+' ['+req.post.user+'] ['+req.post.pass+'] ['+req.connection.remoteAddress+']','backstage');
			}
			req=null;
			res=null;
			break;
		case 'logout':
			delete req.session.data;
			req.session.data={};
			rw.http.zout('{"js":"$m.logouted()"}',req,res);
			rw.log.write('Logout ['+req.connection.remoteAddress+']','backstage');
			req=null;
			res=null;
			break;
		case 'exit':
			rw.http.zout('{"js":"$i.r()"}',req,res);
			rw.log.write('Exit ['+req.connection.remoteAddress+']','backstage');
			process.kill(process.pid,'SIGINT');
			break;
		case 'restart':
			rw.http.zout('{"js":"$i.r()"}',req,res);
			rw.log.write('Restart ['+req.connection.remoteAddress+']','backstage');
			rw.log.write('Restarting ...','system');
			var exec=require('child_process').exec;
			exec('node '+__dirname+'/../lib/restart.js '+process.pid+' "'+rw.config.backstage.startScript+'"');
			break;
		case 'oid':
			var arr=req.post.oid.split('.');
			arr.shift();
			var i,o=rw;
			for(i in arr){
				if(!o[arr[i]]){
					o=null;
					break;
				}
				o=o[arr[i]];
			}
			i=null;
			arr=null;
			rw.http.zout(JSON.stringify({'js':'$i.oided(json.re,json.oid)','re':o,'oid':req.post.oid}),req,res);
			req=null;
			res=null;
			break;
		case 'oidd':
			var arr=req.post.oid.split('.');
			arr.shift();
			var id=arr.pop(),o=rw;
			for(i in arr){
				if(!o[arr[i]]){
					o=null;
					break;
				}
				o=o[arr[i]];
			}
			i=null;
			arr=null;
			delete o[id];
			o=null;
			id=null;	
			rw.log.write('Object Delete ['+req.post.oid+'] ['+req.connection.remoteAddress+']','backstage');
			rw.http.zout(JSON.stringify({'js':'$i.oidded()'}),req,res);
			req=null;
			res=null;
			break;
		case 'oids':
			var arr=req.post.oid.split('.');
			arr.shift();
			var id=arr.pop(),o=rw;
			for(i in arr){
				if(!o[arr[i]]){
					o=null;
					break;
				}
				o=o[arr[i]];
			}
			i=null;
			arr=null;
			o[id]=req.post.o;
			o=null;
			id=null;	
			rw.log.write('Object Save ['+req.post.oid+'] ['+req.connection.remoteAddress+']','backstage');
			rw.http.zout(JSON.stringify({'js':'$i.oidsed()'}),req,res);
			req=null;
			res=null;
			break;
		case 'sc':
			var c=0,i;
			for(i in rw.session){
				c++;
			}
			i=null;
			rw.http.zout(JSON.stringify({'js':'$i.sced(json.re)','re':c}),req,res);
			c=null;
			req=null;
			res=null;
			break;
		case 'lc':
			var i,re='',c=0;
			for(i in rw.cacheData){
				re+='<li><a href="javascript:void(0)" onclick=$i.ec("'+i+'")>'+i+'</a></li>';
				c++;
			}
			i=null;
			re='<li>Total Cache: <b>'+c+'</b>, Click to View/Edit.</li>'+re;
			rw.http.zout(JSON.stringify({'js':'$i.lced(json.re)','re':re}),req,res);
			re=null;
			c=null;
			req=null;
			res=null;
			break;
		case 'ltc':
			var i,re='',c=0;
			for(i in rw.tcache){
				re+='<li><a href="javascript:void(0)" onclick=$i.ec("'+i+'")>'+i+'</a></li>';
				c++;
			}
			i=null;
			re='<li>Total Cache: <b>'+c+'</b>, Click to View/Edit.</li>'+re;
			rw.http.zout(JSON.stringify({'js':'$i.lced(json.re)','re':re}),req,res);
			re=null;
			c=null;
			req=null;
			res=null;
			break;
		default:
			rw.http.throw(3,res);
			req=null;
			res=null;
	}
};

exports.run=function(req,res){
	if(req.method!='POST'){
		rw.http.throw(3,res);
		req=null;
		res=null;
		return;
	}
	rw.sess.start(req,res);
	rw.http.receivePostData(req,res,dataReceived);
};