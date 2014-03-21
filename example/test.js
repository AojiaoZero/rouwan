exports.run=function(req,res){
	rw.http.zout('['+rw.util.date('y.m.d H:i:s')+'] Test.',req,res);
};