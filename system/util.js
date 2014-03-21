var crypto=require('crypto');

exports.nfix=function(n,l,f){f=f?f:'0';var i=0,t=l-n.toString().length,fix='';for(i;i<t;i++){fix+=f;}return fix+n;}
exports.fixDate=function(n){return (n<10)?('0'+n.toString()):n.toString();}

exports.date=function(str,t){
	var d=new Date(),pos,re='';
	if(t){d.setTime(t)}
	str=str.toLowerCase();
	for(pos in str){
		switch(str[pos]){
			case 'y':
				re+=d.getFullYear().toString();
				break;
			case 'm':
				re+=exports.fixDate(d.getMonth()+1);
				break;
			case 'd':
				re+=exports.fixDate(d.getDate());
				break;
			case 'h':
				re+=exports.fixDate(d.getHours());
				break;
			case 'i':
				re+=exports.fixDate(d.getMinutes());
				break;
			case 's':
				re+=exports.fixDate(d.getSeconds());
				break;
			case 'q':
				re+=exports.nfix(d.getMilliseconds(),3);
				break;
			case 'e':
				re+=exports.dayName(d.getDay(),'en');
				break;
			case 'w':
				re+=exports.dayName(d.getDay());
				break;
			case 'z':
				re+=exports.dayName(d.getDay(),'zh');
				break;
			case 'j':
				re+=exports.dayName(d.getDay(),'jp');
				break;
			default:
				re+=str[pos];
				break;
				
		}
	}
	return re;
};

exports.printJson=function(obj,level){
	var tagon='{',tagoff='}',fix='',i,arr=[];
	if(level){
		for(i=0;i<level;i++){
			fix+='    ';
		}
	}else{
		level=0;
		fix='';
	}
	if(obj instanceof Array){
		tagon='[';
		tagoff=']';
	}
	/*if(obj instanceof Array){
		var t=obj.length;
		for(i=0,i<t;i++){
			switch(typeof(obj[i])){
				case 'string':
					arr.push('"'+obj[i]+'"');
					break;
				case 'number':
				case 'boolean':
					arr.push(obj[i]);
					break;
				case 'function':
					arr.push('[Function]');
					break;
				case 'object':
					level++;
					arr.push(printJson(obj[i],level));
					break;
				default:
					arr.push(fix+'    '+i+': undefined');
			}
		}
	}else{*/
		for(i in obj){
			switch(typeof(obj[i])){
				case 'string':
					arr.push(fix+'    '+i+': "'+obj[i]+'"');
					break;
				case 'number':
				case 'boolean':
					arr.push(fix+'    '+i+': '+obj[i]);
					break;
				case 'function':
					//arr.push(fix+'    '+i+': '+obj[i]);
					arr.push(fix+'    '+i+': [Function]');
					break;
				case 'object':
					level++;
					arr.push(fix+'    '+i+': '+exports.printJson(obj[i],level));
					break;
				default:
					arr.push(fix+'    '+i+': undefined');
			}
		//console.log(i+': '+typeof(obj[i]));
		}
	//}
	return tagon+'\n'+arr.join(',\n')+'\n'+fix+tagoff;
};

exports.safe=function(s){
	if(typeof(s)=='undefined'){
		return;
	}
	s=s.toString();
	s=s.trim();
	return s.replace(/"|'|<|>/g,function(str){
		switch(str){
			case '"':
				return '&quot;';
				break;
			case "'":
				return '&#39;';
				break;
			case '<':
				return '&lt;';
				break;
			case '>':
				return '&gt;';
				break;
			default:
				return str;
		}
	});
};

exports.safeReg=function(s){
	if(typeof(s)=='undefined'){
		return;
	}
	s=s.trim();
	return s.replace(/\.|\+|\*|\^|\$|\-|\[|\]|\||\/|\\|\{|\}|\(|\)|\,|\s|\?/g,function(str){
		switch(str){
			case '.':
			case '+':
			case '*':
			case '^':
			case '$':
			case '-':
			case '[':
			case ']':
			case '|':
			case '/':
			case '\\':
			case '{':
			case '}':
			case '(':
			case ')':
			case '?':
				return '\\'+str;
				break;
			case ',':
				return '\\'+str;
				break;
			case ' ':
				return '.*';
				break;
			default:
				return str;
		}
	});
};

exports.dayName=function(id,lan){
	if(id==-1){
		return '?';
	}
	switch(lan){
		case 'en':
			return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][id];
			break;
		case 'zh':
			return ['日','一','二','三','四','五','六'][id];
			break;
		case 'jp':
			return ['日','月','火','水','木','金','土'][id];
			break;
		default:
			return ['7','1','2','3','4','5','6'][id];
	}
};

exports.seq=function(col,id,callback){
	col.findAndModify({'_id':id},[],{'$inc':{'v':1}},{'new':true,'upsert':true},function(e,d){
		callback(e,d);
		e=null;
		d=null;
		col=null;
		id=null;
		callback=null;
	});
};

exports.isEmail=function(email){
	var reg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	return reg.test(email);
};

exports.md5=function(s,d){
	d=d?d:'hex';
	var m=crypto.createHash('md5');
	m.update(s);
	return m.digest(d);
};

exports.checkPassword=function(pp,tp,salt){
	pp=exports.md5(exports.md5(pp)+salt);
	return (pp==tp);
};

exports.newSalt=function(){
	return parseInt(Math.random()*(999999-100000+1)+100000).toString();
};

exports.newPassword=function(pp,salt){
	pp=exports.md5(exports.md5(pp)+salt);
	return pp;
};

exports.randMd5Id=function(){
	return crypto.createHash('md5').update(Math.random()+'|'+process.hrtime()+'|'+Math.random()).digest('hex');
};

exports.monthLength=function(m,y){
	var arr=[0,31,28,31,30,31,30,31,31,30,31,30,31];
	if(y && !(y%4) && m==2){
		return 29;
	}
	return arr[m];
};
