var $c={
	cd:'',
	aof:false,
	go:function(f){
		if(!$("#path").val()){
			return;
		}
		$m.dbu("#goBu","Go");
		$("#path").attr("disabled","true");
		$("#tree").html('<li>Loading...</li>');
		if(f){$c.aof=f;}else{$c.aof=false;}
		$m.post('./island?sp=1',$m.bind('bindGo'));
	},
	goNE:function(){
		$m.ebu("#goBu","Go");
		$("#path").removeAttr("disabled");
		$("#tree").html('<li>File / Folder does not exist.</li>');
	},
	goND:function(){
		$m.ebu("#goBu","Go");
		$("#path").removeAttr("disabled");
		$("#tree").html('<li>Target is not a folder.</li>');
	},
	fs:function(s){
		if(s<1048576){
			return (s/1024).toFixed(2)+' KB';
		}else{
			return (s/1024/1024).toFixed(2)+' MB';
		}
	},
	god:function(d,f,cd){
		$c.cd=cd;
		$("#path").val($c.cd);
		var i,re='<li><a href="javascript:void(0)" onclick=$c.dir("..") class="dir">..</a></li>',big='';
		for(i in d){
			re+='<li><a href="javascript:void(0)" onclick=$c.dir("'+d[i]+'") class="dir">'+d[i]+'</a></li>';
		}
		for(i in f){
			if(f[i].s>204800){big=',true';}else{big='';}
			re+='<li><a href="javascript:void(0)" onclick=$c.gof("'+f[i].f+'"'+big+') class="file">'+f[i].f+'</a><span class="size">'+$c.fs(f[i].s)+'</span></li>';
		}
		$m.ebu("#goBu","Go");
		//$("#path").val(cd);
		$("#path").removeAttr("disabled");
		$("#tree").html(re);
		if($c.aof){
			$c.gof($c.aof);
			$c.aof=false;
		}
	},
	dir:function(d){
		$("#path").val($c.cd+'/'+d);
		$c.go();
	},
	gof:function(f,b){
		var ext=f.split('.');
		ext=ext.pop();
		var o=true;
		if(ext!='js' && ext!='html' && ext!='css' && ext!='json'){
			o=false;
			if(window.confirm('Unsupported file type, Are you sure to OPEN ?')){
				o=true;
			}
		}
		if(b){
			o=false;
			if(window.confirm('This file is over 200 KB, Are you sure to OPEN ?')){
				o=true;
			}
		}
		if(!o){return;}
		$pw.load($pwd.loading);
		$("#msgCon").html(f+' ...');
		$pw.fix();
		$m.post('./island?sp=1',{"do":"gof","f":$c.cd+'/'+f});
	},
	cf:'',
	gofed:function(re,cf){
		var f=cf.split('/');
		f=f[f.length-1];
		$pw.load($ipwd.codeEditor);
		$("#msgTitle").html('Edit - '+f);
		$("#msgCon").append('<input id="sfBu" class="abu" value="Save" type="button" onclick="$c.sf()" /> <input id="dfBu" class="abu" value="Delete" type="button" onclick="$c.df()" /> <input id="cfBu" class="abu" value="Cancel" type="button" onclick="$pw.close()" /><input type="hidden" id="f" class="bindSf bindDf" /><input type="hidden" id="do" class="bindSf" value="sf" /><input type="hidden" id="do" class="bindDf" value="df" />');
		
		pwdEditor.setValue(B64.decode(re));
		pwdEditor.clearSelection();
		
		f=f.split('.');
		f=f[f.length-1].toLowerCase();
		switch(f){
			case 'css':
				$("#pwdType").val('css');
				break;
			case 'html':
				$("#pwdType").val('html');
				break;
			case 'json':
				$("#pwdType").val('json');
				break;
			default:
				$("#pwdType").val('javascript');
				break;
		}
		pwdTypeChange();
		
		$m.bindFind("bindSf","f").val(cf);
	},
	sf:function(){
		if(window.confirm('Are you sure to SAVE ?')){
			$m.dbu("#sfBu","Loading...");
			$m.dbu("#dfBu","Delete");
			$m.dbu("#cfBu","Cancel");
			var o=$m.bind('bindSf');
			o.o=B64.encode(pwdEditor.getValue());
			$m.post('./island?sp=1',o);
		}
	},
	sfed:function(){
		$m.ebu("#sfBu","Save");
		$m.ebu("#dfBu","Delete");
		$m.ebu("#cfBu","Cancel");
	},
	df:function(){
		if(window.confirm('Are you sure to DELETE ?')){
			$m.dbu("#sfBu","Save");
			$m.dbu("#dfBu","Loading...");
			$m.dbu("#cfBu","Cancel");
			$m.post('./island?sp=1',$m.bind('bindDf'));
		}
	},
	dfed:function(){
		$pw.close();
		$c.go();
	},
	n:function(){
		$pw.load($ipwd.n);
	},
	nn:function(){
		$m.dbu("#nnbu","Loading...");
		$m.post('./island?sp=1',$m.bind("bindNn"));
	},
	nned:function(f){
		var ff;
		f=f.split('/');
		if(f.length==1){
			f[1]=f[0];
			f[0]='/';
		}
		ff=f.pop();
		$("#path").val(f.join('/'));
		$pw.close();
		$c.go(ff);
	},
	fet:function(){
		alert('File already exists.');
		$m.ebu("#nnbu","Create");
	},
	fnet:function(){
		alert('File does not exist.');
		$pw.close();
	}
};
var $ipwd={
	codeEditor:{
		content:pwdEditorCon,
		d:function(){
			$("#pwdType").off("change");
			$("#pwdType").val('javascript');
			$("#pwdType").on("change",pwdTypeChange);
			pwdEditor=ace.edit("pwdEditor");
			pwdEditor.setTheme("ace/theme/textmate");
			pwdEditor.session.setMode("ace/mode/javascript");
			pwdEditor.setFontSize(15);
			pwdEditor.session.setUseWrapMode(true);
			pwdEditor.setShowPrintMargin(false);
			pwdEditor.session.setUseSoftTabs(false);
			$("#pwdEditor").css({width:$(window).width()-300,height:$(window).height()-200});
			$pw.fix();
			pwdEditor.resize(true);
		}
	},
	n:{
		title:'File Name:',
		content:'<textarea id="nn" class="uinput bindNn"></textarea><br /><input id="nnBu" class="abu" value="Create" type="button" onclick="$c.nn()" /><input type="hidden" id="do" value="nn" class="bindNn" />',
		d:function(){
			$("#nn").focus();
			$("#nn").val($c.cd+'/newFile.js');
		}
	}
};