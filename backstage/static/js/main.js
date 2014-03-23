var $m={
	one:function(ord,c){if(c){event=c;}if(event.keyCode==13){eval(ord);}},
	dbu:function(id,v){$(id).val(v);if($(id).attr('disabled')){$(id).removeAttr('disabled')}else{$(id).attr('disabled','true')}},
	ebu:function(id,v){$(id).val(v);$(id).removeAttr('disabled');},
	post:function(u,d,fd){$.ajax({url:u,type:'POST',contentType:'application/json',processData:false,dataType:'HTML',timeout:6000000,data:JSON.stringify(d),error:function(e){alert('Load fail, please refresh.');try{fd();}catch(e){}},success:function(json){json=eval("("+json+")");eval(json.js);}});},
	bind:function(n){n=n?n:'bind';var a=$('.'+n),i,obj={};for(i in a){switch(a[i].nodeName){case 'INPUT':case 'TEXTAREA':case 'SELECT':obj[a[i].id]=a[i].value;break;}}return obj;},
	bindFind:function(c,id){var a=$('.'+c),i=0,re;for(i;i<a.length;i++){if(a[i].id==id){re=a[i];break;}}return $(re);},
	hitokoto:function(d){
		$("#hitokoto").html('<a href="http://hitokoto.us/view/'+d.id+'.html" target="_blank" title="Cat：'+d.catname+'&#10;From：'+d.source+'&#10;Like：'+d.like+'&#10;Author：'+d.author+' @ '+d.date+'">『'+d.hitokoto+'』</a>');
	},
	docScroll:function(){
		($(document).scrollTop()>50)?$("#fbox").fadeIn(100):$("#fbox").fadeOut(100);
	},
	login:function(){
		if(!$m.bindFind('bindLogin','user').val() || !$m.bindFind('bindLogin','pass').val()){return;}
		$m.dbu("#loginBu","Loading...");
		$m.post('./island?sp=1',$m.bind('bindLogin'));
	},
	logined:function(){
		location.reload();
	},
	logout:function(){
		$pw.load($pwd.logout);
		$m.post('./island?sp=1',{"do":"logout"});
	},
	logouted:function(){
		location.reload();
	},
	throw:function(arr){
		var i,re='';
		for(i in arr){
			switch(arr[i]){
				case 1:
					re+='Bad username or password.\n';
					$m.ebu("#loginBu","Login");
					break;
				case 2:
					re+='Login Locked.\n';
					$m.ebu("#loginBu","Login");
					break;
			}
		}
		alert(re);
	}
};
var $pw={
	load:function(pwd){
		if(!pwd){return;}
		$pw.show(pwd.title,pwd.content,pwd.w,pwd.h,pwd.ac);
		if(pwd.d){
			pwd.d();
		}
	},
	show:function(title,con,w,h,ac){
		if(ac){
			$("#msgBoxAc").hide();
		}else{
			$("#msgBoxAc").show();
			//$("#cover").one("click",$pw.close);
		}
		$("#msgTitle").html(title);
		$("#msgCon").html(con);
		$("#msgBox").css({'opacity':0});
		$("#msgBox").show();
		w=w?w:$("#msgBox").width()+32;
		h=h?h:$("#msgBox").height()+42;
		var x=($(window).height()-h)*0.5;
		var y=($(window).width()-w)*0.5;
		$("#cover").show();
		$("#msgBox").css({'top':x,'left':y,'opacity':1});
	},
	close:function(){
		$("#cover").hide();
		$("#msgBox").hide();
	}
};
var $pwd={
		logout:{
			title:"登出",
			ac:true,
			content:"正在登出... ",
			d:function(){
				$('#uamenu').off('mouseleave');
			}
		}
};