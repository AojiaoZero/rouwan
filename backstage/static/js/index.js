var $i={
	r:function(){
		setTimeout(function(){location.reload();},2000)
	},
	exitH:0,
	exitCount:5,
	exit:function(){
		if($i.exitCount<0){
			$("#exh").html('Exiting...');
			$m.post('./island?sp=1',{"do":"exit"});
			$i.exitCount=5;
			return;
		}
		$("#rsa").hide();
		$("#exa").hide();
		$("#exh").html('Exiting in '+$i.exitCount+'s ... <a href="javascripg:void(0)" onclick="$i.cexit()">Cancel</a>');
		$i.exitCount--;
		$i.exitH=setTimeout($i.exit,1000);
	},
	cexit:function(){
		clearTimeout($i.exitH);
		$i.exitCount=5;
		$("#rsa").show();
		$("#exa").show();
		$("#exh").html('');
	},
	restartH:0,
	restartCount:5,
	restart:function(){
		if($i.restartCount<0){
			$("#rsh").html('Restarting...');
			$m.post('./island?sp=1',{"do":"restart"});
			$i.restartCount=5;
			return;
		}
		$("#rsa").hide();
		$("#exa").hide();
		$("#rsh").html('Restarting in '+$i.restartCount+'s ... <a href="javascripg:void(0)" onclick="$i.crestart()">Cancel</a>');
		$i.restartCount--;
		$i.restartH=setTimeout($i.restart,1000);
	},
	crestart:function(){
		clearTimeout($i.restartH);
		$i.restartCount=5;
		$("#rsa").show();
		$("#exa").show();
		$("#rsh").html('');
	},
	oid:function(){
		$m.dbu("#oidBu","Loading...");
		$m.post('./island?sp=1',$m.bind('bindOid'));
	},
	oided:function(re,oid){
		$pw.load($ipwd.objectEditor);
		$("#msgTitle").html('Edit Object - '+oid);
		$("#msgCon").append('<input id="oidsBu" class="abu" value="Save" type="button" onclick="$i.oids()" /> <input id="oiddBu" class="abu" value="Delete" type="button" onclick="$i.oidd()" /> <input id="oidscBu" class="abu" value="Cancel" type="button" onclick="$pw.close()" /><input type="hidden" id="oid" class="bindOids bindOidd" /><input type="hidden" id="do" class="bindOidd" value="oidd" /><input type="hidden" id="do" class="bindOids" value="oids" />');
		
		re=JSON.stringify(re,null,'	');
		pwdEditor.setValue(re);
		pwdEditor.clearSelection();
		
		$m.ebu("#oidBu","Edit");
		$m.bindFind("bindOids","oid").val(oid);
	},
	oidd:function(){
		if(window.confirm('Are you sure to DELETE ?')){
			$m.dbu("#oidsBu","Save");
			$m.dbu("#oiddBu","Loading...");
			$m.dbu("#oidscBu","Cancel");
			$m.post('./island?sp=1',$m.bind('bindOidd'));
		}
	},
	oidded:function(){
		$pw.close();
	},
	oids:function(){
		if(window.confirm('Are you sure to SAVE ?')){
			$m.dbu("#oidsBu","Loading...");
			$m.dbu("#oiddBu","Delete");
			$m.dbu("#oidscBu","Cancel");
			var o=$m.bind('bindOids');
			o.o=JSON.parse(pwdEditor.getValue());
			$m.post('./island?sp=1',o);
		}
	},
	oidsed:function(){
		$m.ebu("#oidsBu","Save");
		$m.ebu("#oiddBu","Delete");
		$m.ebu("#oidscBu","Cancel");
	},
	sc:function(){
		$("#sessionCount").html('Loading...');
		$m.post('./island?sp=1',{"do":"sc"});
	},
	sced:function(c){
		$("#sessionCount").html('<b>'+c+'</b>, <a href="javascript:void(0)" onclick="$i.sc()">ReCount</a>');
	},
	lc:function(){
		$m.dbu("#lcBu","List Cache");
		$m.dbu("#ltcBu","List Template Cache");
		$("#cacheRe").html('<li>Loading Cache...</li>');
		$m.post('./island?sp=1',{"do":"lc"});
	},
	lced:function(re){
		$m.ebu("#lcBu","List Cache");
		$m.ebu("#ltcBu","List Template Cache");
		$("#cacheRe").html(re);
		$(document).scrollTop($("#cachea").offset().top);
	},
	ltc:function(){
		$m.dbu("#lcBu","List Cache");
		$m.dbu("#ltcBu","List Template Cache");
		$("#cacheRe").html('<li>Loading Template Cache...</li>');
		$m.post('./island?sp=1',{"do":"ltc"});
	},
	ec:function(id){
		$pw.load($pwd.loading);
		$("#msgCon").html(id+' ...');
		$pw.fix();
		$m.post('./island?sp=1',{"do":"ec","id":id});
	},
	etc:function(id){
		$pw.load($pwd.loading);
		$("#msgCon").html(id+' ...');
		$pw.fix();
		$m.post('./island?sp=1',{"do":"etc","id":id});
	},
	eced:function(re,id){
		$pw.load($ipwd.objectEditor);
		$("#msgTitle").html('Edit Cache - '+id);
		$("#msgCon").append('<input id="scBu" class="abu" value="Save" type="button" onclick="$i.savec()" /> <input id="dcBu" class="abu" value="Delete" type="button" onclick="$i.delc()" /> <input id="sccBu" class="abu" value="Cancel" type="button" onclick="$pw.close()" /><input type="hidden" id="id" class="bindSc bindDc" /><input type="hidden" id="do" class="bindSc" value="savec" /><input type="hidden" id="do" class="bindDc" value="delc" />');
		
		re=JSON.stringify(re,null,'	');
		pwdEditor.setValue(re);
		pwdEditor.clearSelection();
		
		$m.bindFind("bindSc","id").val(id);
	},
	etced:function(re,id){
		$pw.load($ipwd.objectEditor);
		$("#msgTitle").html('Edit Template Cache - '+id);
		$("#msgCon").append('<input id="stcBu" class="abu" value="Save" type="button" onclick="$i.savetc()" /> <input id="dtcBu" class="abu" value="Delete" type="button" onclick="$i.deltc()" /> <input id="stccBu" class="abu" value="Cancel" type="button" onclick="$pw.close()" /><input type="hidden" id="id" class="bindStc bindDtc" /><input type="hidden" id="do" class="bindStc" value="savetc" /><input type="hidden" id="do" class="bindDtc" value="deltc" />');
		
		pwdEditor.setValue(B64.decode(re));
		pwdEditor.clearSelection();
		
		$("#pwdType").val('html');
		pwdTypeChange();
		
		$m.bindFind("bindStc","id").val(id);
	},
	savec:function(){
		if(window.confirm('Are you sure to SAVE ?')){
			$m.dbu("#scBu","Loading...");
			$m.dbu("#dcBu","Delete");
			$m.dbu("#sccBu","Cancel");
			var o=$m.bind('bindSc');
			o.o=JSON.parse(pwdEditor.getValue());
			$m.post('./island?sp=1',o);
		}
	},
	saveced:function(){
		$m.ebu("#scBu","Save");
		$m.ebu("#dcBu","Delete");
		$m.ebu("#sccBu","Cancel");
	},
	savetc:function(){
		if(window.confirm('Are you sure to SAVE ?')){
			$m.dbu("#stcBu","Loading...");
			$m.dbu("#dtcBu","Delete");
			$m.dbu("#stccBu","Cancel");
			var o=$m.bind('bindStc');
			o.o=B64.encode(pwdEditor.getValue());
			$m.post('./island?sp=1',o);
		}
	},
	savetced:function(){
		$m.ebu("#stcBu","Save");
		$m.ebu("#dtcBu","Delete");
		$m.ebu("#stccBu","Cancel");
	},
	delc:function(){
		if(window.confirm('Are you sure to DELETE ?')){
			$m.dbu("#scBu","Save");
			$m.dbu("#dcBu","Loading...");
			$m.dbu("#sccBu","Cancel");
			$m.post('./island?sp=1',$m.bind('bindDc'));
		}
	},
	delced:function(){
		$pw.close();
		$i.lc();
	},
	deltc:function(){
		if(window.confirm('Are you sure to DELETE ?')){
			$m.dbu("#stcBu","Save");
			$m.dbu("#dtcBu","Loading...");
			$m.dbu("#stccBu","Cancel");
			$m.post('./island?sp=1',$m.bind('bindDtc'));
		}
	},
	deltced:function(){
		$pw.close();
		$i.ltc();
	},
	scup:function(){
		$("#sessionClean").html("Cleaning...");
		$m.post('./island?sp=1',{"do":"scup","t":$("#scms").val()});
	},
	scuped:function(c){
		alert(c+' Sessions Deleted.');
		$("#sessionClean").html('<a href="javascript:void(0)" onclick="$i.scup()">Clean Now</a>');
	},
	ll:function(){
		$("#lla").hide();
		$("#llca").hide();
		$("#llh").html('Loading...');
		$m.post('./island?sp=1',{"do":"ll"});
	},
	lld:function(l){
		var i,re='';
		for(i in l){
			re+='<li>'+l[i].url+'<span>'+(l[i].time).toFixed(5)+' ms</span></li>';
		}
		$("#llh").html('');
		$("#lla").show();
		$("#llca").show();
		$("#llRe").html(re);
	},
	llc:function(){
		$("#lla").hide();
		$("#llca").hide();
		$("#llch").html('Loading...');
		$m.post('./island?sp=1',{"do":"llc"});
	},
	llcd:function(){
		$("#lla").show();
		$("#llca").show();
		$("#llch").html('');
		$("#llRe").html('<li>Cleared.</li>');
	}
};
var $ipwd={
	objectEditor:{
		content:pwdEditorCon,
		d:function(){
			$("#pwdType").off("change");
			$("#pwdType").val('json');
			$("#pwdType").on("change",pwdTypeChange);
			pwdEditor=ace.edit("pwdEditor");
			pwdEditor.setTheme("ace/theme/textmate");
			pwdEditor.session.setMode("ace/mode/json");
			pwdEditor.setFontSize(15);
			pwdEditor.session.setUseWrapMode(true);
			pwdEditor.setShowPrintMargin(false);
			pwdEditor.session.setUseSoftTabs(false);
			$("#pwdEditor").css({width:$(window).width()-300,height:$(window).height()-200});
			$pw.fix();
			pwdEditor.resize(true);
		}
	}
};