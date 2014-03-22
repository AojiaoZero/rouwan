exports.checkAuth=function(req,res){
	if(rw.config.backstage.ipList.length!=0 && rw.config.backstage.ipList.indexOf(req.connection.remoteAddress)==-1){
		rw.log.write('Bad Ip Visit ['+req.connection.remoteAddress+']','backstage');
		res.end();
		req=null;
		res=null;
		return false;
	}
	if(req.session.data['rouwanbs_login']!='yes'){
		rw.http.zout(
			rw.t.render(
				__dirname+'/../template/login.html',{},'backStageLoginPage'
			),
			req,
			res
		);
		req=null;
		res=null;
		return false;
	}
	return true;
};