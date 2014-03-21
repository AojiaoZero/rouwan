global.rw.counterGroup={};

exports.new=function(id,time,reset){
	if(!id){
		return false;
	}
	if(rw.counterGroup[id] && !reset){
		return true;
	}
	time=time?Number(time):0;
	if(!rw.counterGroup[id]){
		rw.counterGroup[id]={};
		rw.counterGroup[id].ctime=rw.counterGroup[id].utime=new Date().getTime();
		rw.counterGroup[id].count=0;
		rw.counterGroup[id].time=time;
		rw.counterGroup[id].total=0;
	}
};

exports.add=function(id,re,step){
	if(!rw.counterGroup[id]){
		return false;
	}
	step=step?parseInt(step):1;
	var ct=new Date().getTime();
	if((ct-rw.counterGroup[id].utime)>rw.counterGroup[id].time && rw.counterGroup[id].time!=0){
		rw.counterGroup[id].utime=ct;
		rw.counterGroup[id].count=step;
		rw.counterGroup[id].total+=step;
		if(re){
			return exports.get(id);
		}
		return;
	}
	rw.counterGroup[id].count+=step;
	rw.counterGroup[id].total+=step;
	if(re){return exports.get(id);}
};

exports.get=function(id,avg){
	if(!rw.counterGroup[id]){
		return false;
	}
	var re;
	var ct=new Date().getTime();
	if(avg){
		re=rw.counterGroup[id].total/(ct-rw.counterGroup[id].ctime);
	}else{
		var df=Math.max(1000,ct-rw.counterGroup[id].utime);
		re=rw.counterGroup[id].count/df;
		if(df>rw.counterGroup[id].time){
			rw.counterGroup[id].utime=ct;
			rw.counterGroup[id].count=0;
		}
	}
	return re?re:0;
};

exports.reset=function(id){
	if(!rw.counterGroup[id]){
		return false;
	}
	rw.counterGroup[id]={};
	rw.counterGroup[id].ctime=rw.counterGroup[id].utime=new Date().getTime();
	rw.counterGroup[id].count=0;
	rw.counterGroup[id].time=time;
	rw.counterGroup[id].total=0;
};

exports.resetAll=function(){
	rw.counterGroup=null;
	rw.counterGroup={};
};