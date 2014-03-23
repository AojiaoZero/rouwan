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