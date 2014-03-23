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
		$("#sessionCount").html('<b>'+c+'</b>');
	},
	lc:function(){
		$m.dbu("#lcBu","Load Cache");
		$m.dbu("#ltcBu","Load Template Cache");
		$("#cacheRe").html('<li>Loading Cache...</li>');
		$m.post('./island?sp=1',{"do":"lc"});
	},
	lced:function(re){
		$m.ebu("#lcBu","Load Cache");
		$m.ebu("#ltcBu","Load Template Cache");
		$("#cacheRe").html(re);
	},
	ltc:function(){
		$m.dbu("#lcBu","Load Cache");
		$m.dbu("#ltcBu","Load Template Cache");
		$("#cacheRe").html('<li>Loading Template Cache...</li>');
		$m.post('./island?sp=1',{"do":"ltc"});
	}
};
var $ipwd={
	objectEditor:{
		content:'<input type="hidden" id="oid" class="bindOids bindOidd" /><input type="hidden" id="do" class="bindOidd" value="oidd" /><input type="hidden" id="do" class="bindOids" value="oids" />'+pwdEditorCon+'<input id="oidsBu" class="abu" value="Save" type="button" onclick="$i.oids()" /> <input id="oiddBu" class="abu" value="Delete" type="button" onclick="$i.oidd()" /> <input id="oidscBu" class="abu" value="Cancel" type="button" onclick="$pw.close()" />',
		d:function(){
			pwdEditor=ace.edit("pwdEditor");
			pwdEditor.setTheme("ace/theme/textmate");
			pwdEditor.session.setMode("ace/mode/json");
			$("#pwdType").off("change");
			$("#pwdType").val('json');
			$("#pwdType").on("change",pwdTypeChange);
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