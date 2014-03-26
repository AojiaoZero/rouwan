var $a={
	cvr:{
		version:0.1,
		build:2013032601,
	},
	vr:function(){
		document.write('当前版本: v'+$a.cvr.version+' (Build '+$a.cvr.build+')');
	},
	vre:function(obj){
		if(obj.build>$a.cvr.build){
			var i,re='';
			if(obj.update.length>0){
				re='<br /><br />更新内容: <ul class="uul">';
				for(i in obj.update){
					re+='<li>'+obj.update[i]+'</li>';
				}
				re+='</ul>';
			}
			if(obj.doing.length>0){
				re+='我正在做: <ul class="uul">';
				for(i in obj.doing){
					re+='<li>'+obj.doing[i]+'</li>';
				}
				re+='</ul>';
			}
			$("#version").html('最新版本: v'+obj.version+' (Build '+obj.build+')<br />下载地址: <a href="'+obj.url+'" target="_blank">'+obj.url+'</a>'+re);
		}else{
			$("#version").html("");
		}
	}
}