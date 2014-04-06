global.rw.serverList={};
global.rw.routerList={};
global.rw.initList={};

exports.start=function(){
	var i,ii,iii,portList={};
	for(i in rw.config.server){
		if(rw.fs.existsSync(rw.config.server[i].root+'/init.js')){
			rw.initList[i]=require(rw.config.server[i].root+'/init.js');
			rw.initList[i].run();
		}
		if(!portList[rw.config.server[i].port]){
			portList[rw.config.server[i].port]=[];
		}
		if(rw.config.server[i].ssl){
			rw.log.write('Starting HTTPS Server ['+rw.config.server[i].host+'] ...');
			rw.hssl.createServer({
				ca:rw.fs.readFileSync(rw.config.server[i].ssl.ca),
				key:rw.fs.readFileSync(rw.config.server[i].ssl.key),
				cert:rw.fs.readFileSync(rw.config.server[i].ssl.cert)
			},exports.request).listen(rw.config.server[i].ssl.port,'0.0.0.0');
		}
		rw.config.server[i].host.forEach(function(host){
			if(rw.config.server[i].port!=80){
				host+=':'+rw.config.server[i].port;
			}
			rw.serverList[host]=i;
			portList[rw.config.server[i].port].push(host);
		});
		rw.routerList[i]={};
		for(ii in rw.config.server[i].router){
			for(iii in rw.config.server[i].router[ii]){
				rw.routerList[i][rw.config.server[i].router[ii][iii]]=ii;
			}
		}
	}
	for(i in portList){
		rw.log.write('Starting Server ['+portList[i]+'] ...');
		rw.hs.createServer(exports.request).listen(Number(i),'0.0.0.0');
	}
	
};

//global.rw.httpConnectionPool=[];
global.rw.stb=false;
exports.request=function(req,res){
	if(rw.stb){
		res.end('Server is too busy.');
		req=null;
		res=null;
		return;
	}
	if(!rw.serverList[req.headers.host]){
		rw.http.throw(0,res);
		req=null;
		return;
	}
	res.server=req.server=rw.serverList[req.headers.host];
	req.ourl=req.url;
	req.url=rw.url.parse(req.url,true);
	res.host=req.headers.host;
	if(req.url.query.sp){
		var sp=parseInt(req.url.query.sp);
		var parr=req.url.pathname.split('/');
		req.url.pathname='/'+parr.slice(parr.length-sp).join('/');
	}
	req.url.pathname=rw.path.normalize(req.url.pathname);
	req.url.router=req.url.pathname.split('/').slice(1);
	if(req.headers.cookie){
		req.cookie={};
		req.headers.cookie.split(';').forEach(function(cookie){
			var cc=cookie.split('=');
			req.cookie[cc[0].trim()]=(cc[1] || '').trim();
		});
	}else{
		req.cookie={};
	}
	/*if(req.url.query.log){
		console.log(req.url);
		console.log(req.headers);
	}*/
	req.module=rw.routerList[req.server][req.url.router[0]];
	if(req.module){
		try{
			rw.http.runModule(req,res);
		}catch(e){
			rw.http.throw(500,res,{server:req.server,url:req.url,stack:e.stack});
			if(rw.initList[req.server].onError){
				rw.initList[req.server].onError(e);
			}
			req=null;
		}
		return;
	}
	if(req.method=='GET'){
		rw.http.staticFileRequest(req,res);
		return;
	}
	rw.http.throw(405,res);
	req=null;
};