var common=require(__dirname+'/../lib/common.js');

exports.run=function(req,res){
	rw.sess.start(req,res);
	if(!common.checkAuth(req,res)){
		req=null;
		res=null;
		return;
	}
	rw.http.zout(
		rw.t.render(
			__dirname+'/../template/page.html',{'MCUR1':' cur','WRAPPER':'','V':rw.config.version}
		),
		req,
		res
	);
};