var $m={
	hitokoto:function(d){
		$("#hitokoto").html('<a href="http://hitokoto.us/view/'+d.id+'.html" target="_blank" title="分类：'+d.catname+'&#10;出自：'+d.source+'&#10;喜欢：'+d.like+'&#10;投稿：'+d.author+' @ '+d.date+'">『'+d.hitokoto+'』</a>');
	},
	docScroll:function(){
		($(document).scrollTop()>50)?$("#fbox").fadeIn(100):$("#fbox").fadeOut(100);
	}
};