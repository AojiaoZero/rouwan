global.rw.tcache={};

global.rw.templateReloadList={};

var buildTemplateReloadObject=function(source){
	rw.templateReloadList[source]={};
	rw.templateReloadList[source].r=function(){
		exports.load(source,true);
		rw.log.write('Template File Updated ['+source+']','system');
	};
	rw.templateReloadList[source].d=function(e){
		if(rw.templateReloadList[source].w){rw.templateReloadList[source].w.close();}
		rw.templateReloadList[source].w=rw.fs.watch(source,{persistent:false},rw.templateReloadList[source].d);
		if(e=='change'){
			if(rw.templateReloadList[source].s){clearTimeout(rw.templateReloadList[source].s);}
			rw.templateReloadList[source].s=setTimeout(rw.templateReloadList[source].r,5000);
		}else if(!e){
			exports.load(source);
		}
	};
}

exports.load=function(source,clear){
	if(clear){
		delete rw.tcache[source];
	}
	if(!rw.templateReloadList[source]){
		buildTemplateReloadObject(source);
		rw.templateReloadList[source].d();
	}
	if(!rw.tcache[source]){
		rw.tcache[source]=rw.fs.readFileSync(source,'utf8');
	}
};

exports.render=function(source,data,name,clear){
	if(name && rw.tcache[name]){
		return rw.tcache[name];
	}
	exports.load(source,clear);
	if(!data){
		return rw.tcache[source];
	}
	var re='';
	rw.tcache[source].split('{{').forEach(function(cc){
		cc=cc.split('}}');
		if(cc.length==1){
			re+=cc[0];
		}else{
			cc=[cc.shift(),cc.join('}}')];
			if(typeof(data[cc[0]])!='undefined'){
				re+=data[cc[0]];
			}else{
				re+='';
			}
			re+=(cc[1] || '');
		}
	});
	if(name && !clear){
		rw.tcache[name]=re;
	}
	return re;
};

exports.deleteCache=function(id){
	if(id=='all'){
		rw.tcache=null;
		rw.tcache={};
		return true;
	}else{
		rw.tcache[id]=null;
		return delete rw.tcache[id];
	}
};

exports.getAllCache=function(){
	return rw.tcache;
};