var $a={
	cvr:{
		version:'0.1.2',
		build:2014032601,
	},
	vr:function(){
		document.write('当前版本: v'+$a.cvr.version+' (Build '+$a.cvr.build+')');
	},
	vre:function(obj){
		var i,re='';
		if(obj.build>$a.cvr.build){
			if(obj.update.length>0){
				re='<br /><br />更新内容: <ul class="uul">';
				for(i in obj.update){
					re+='<li>'+obj.update[i]+'</li>';
				}
				re+='</ul>';
			}
			$("#version").html('最新版本: v'+obj.version+' (Build '+obj.build+')<br />下载地址: <a href="'+obj.url+'" target="_blank">'+obj.url+'</a>'+re);
			re='';
		}else{
			$("#version").html("");
		}
		if(obj.doing.length>0){
			re+='正在努力: <ul class="uul">';
			for(i in obj.doing){
				re+='<li>'+obj.doing[i]+'</li>';
			}
			re+='</ul>';
		}
		$("#version").append(re);
	}
}