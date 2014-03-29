var crypto=require('crypto');

exports.nfix=function(n,l,f){f=f?f:'0';var i=0,t=l-n.toString().length,fix='';for(i;i<t;i++){fix+=f;}return fix+n;}
exports.s2t=function(t){
	var h=parseInt(t/3600);
	var m=parseInt((t-h*3600)/60);
	var s=parseInt(t-h*3600-m*60);
	var d=parseInt(h/24);
	h-=d*24;
	return [d,h,m,s];
	//return {d:d,h:h,m:m,s:s};
};
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
				re+=exports.nfix(d.getMonth()+1,2);
				break;
			case 'd':
				re+=exports.nfix(d.getDate(),2);
				break;
			case 'h':
				re+=exports.nfix(d.getHours(),2);
				break;
			case 'i':
				re+=exports.nfix(d.getMinutes(),2);
				break;
			case 's':
				re+=exports.nfix(d.getSeconds(),2);
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

exports.seq=function(col,id,callback,step){
	if(!step){
		step=1;
	}
	col.findAndModify({'_id':id},[],{'$inc':{'v':step}},{'new':true,'upsert':true},function(e,d){
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

exports.jsonCensor=function(censor){
	var i=0;
	return function(key,value){
		if(i!==0 && typeof(censor)==='object' && typeof(value)=='object' && censor==value){
			return '[Circular]';
		}
		if(i>=29){
			return '[Data Too Long]';
		}
		++i;
		key=null;
		censor=null;
		return value;
	}
};