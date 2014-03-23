var common=require(__dirname+'/../lib/common.js');

exports.run=function(req,res){
	rw.sess.start(req,res);
	if(!common.checkAuth(req,res)){
		req=null;
		res=null;
		return;
	}
	var t=rw.util.s2t(process.uptime());
	var up=t.d+'d '+t.h+'h '+t.m+'m '+t.s+'s';
	rw.http.zout(
		rw.t.render(
			__dirname+'/../template/page.html',{'LINK':'<script type="text/javascript" src="./index.js?sp=1"></script>','MCUR1':' cur','WRAPPER':'','V':rw.config.version,'WRAPPER':rw.t.render(__dirname+'/../template/index.html',{'NV':process.version,'PID':process.pid,'TITLE':process.title,'MEM':parseInt(process.memoryUsage().rss/1024/1024)+' MB','UP':up})}
		),
		req,
		res
	);
	req=null;
	res=null;
	t=null;
	up=null;
};