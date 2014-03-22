exports.run=function(req,res){
	rw.http.zout(
		rw.t.render(
			__dirname+'/../template/page.html',{'MCUR1':' cur','WRAPPER':''}
		),
		req,
		res
	);
};