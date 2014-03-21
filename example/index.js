rw.counter.new('example.test',10000);

exports.run=function(req,res){
	rw.http.zout(
		rw.t.render(
			__dirname+'/../doc/http/boxpage.html',
			{
				'TITLE':'Hello World!',
				'HL':'<center>Hello World!</center>',
				'CONTENT':'<center>'+Math.ceil(rw.counter.add('example.test',true)*1000)+' req/s; '+rw.config.http.header.Server+'</center>'
			}
		),
		req,
		res
	);
	req=null;
};