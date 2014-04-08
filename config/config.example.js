exports.config={
	version:'0.1.2',
	build:2014040101,
	host:'YOUR SERVER NAME',
	reloadInt:5000,
	http:{
		//maxConnection:0,
		//timeout:120000,
		
		header:{
			'Content-Type':'text/html;charset=utf-8',
			'charset':'utf-8',
			'Server':'Rouwan/0.1.2'
		},
		
		debug:true,
		printPostData:true, // print post data to console.
		
		maxPostSize:2097152,
		
		allowEmptyExtname:false,
		allowFileDownload:true,
		maxAge:30*24*3600,
		compress:['html','js','css'],
		mime:{
			css:"text/css",
			gif:"image/gif",
			html:"text/html",
			ico:"image/x-icon",
			jpeg:"image/jpeg",
			jpg:"image/jpeg",
			js:"text/javascript",
			json:"application/json",
			pdf:"application/pdf",
			png:"image/png",
			svg:"image/svg+xml",
			swf:"application/x-shockwave-flash",
			tiff:"image/tiff",
			txt:"text/plain",
			wav:"audio/x-wav",
			wma:"audio/x-ms-wma",
			wmv:"video/x-ms-wmv",
			xml:"text/xml",
			download:"application/octet-stream"
		},
		
		cookie:{
			lifeTime:30*24*3600,
			prefix:'NRWSID'
		}
	},
	
	backstage:{
		user:'/* CHANGE THIS !!! */',
		pass:'/* CHANGE THIS !!! */',
		email:'',
		ipList:[],
		startScript:'',
		autoRestartMem:0,
		autoRestartInt:30000,
		autoRestartEmailTimeout:15000,
		switch:{
			master:true,
			restart:true,
			exit:true,
			email:true,
			timetag:true,
			object:{
				view:true,
				edit:true,
				delete:true
			},
			session:{
				count:true,
				clean:true
			},
			cache:{
				list:true,
				view:true,
				edit:true,
				delete:true
			},
			code:{
				list:true,
				view:true,
				edit:true,
				delete:true,
				create:true
			}
		}
	},

	server:{
		'ExampleServer':{
			host:['example.com','localhost','127.0.0.1'],
			port:80,
			root:__dirname+'/../example/',
			staticPath:__dirname+'/../example/static/',
			indexFile:'index.html',
			/* ssl:{
				port:443,
				ca:'/root/example.ca-bundle',
				key:'/root/example_private_key.pem',
				cert:'/root/example.crt',
			}, */
			errorPage:{
				//403:'403.html',
				//404:'404.html'
			},
			router:{
				'index':['','index','index.html'],
				'test':['test','test.html']
			}
		},
		'backstage':{
			host:['localhost','127.0.0.1'],
			port:8931,
			root:__dirname+'/../backstage/module/',
			staticPath:__dirname+'/../backstage/static/',
			indexFile:'index.html',
			errorPage:{},
			router:{
				'index':['','index','index.html'],
				'code':['code','code.html'],
				'island':['island']
			}
		}
	},

	mongo:{
		'DATABASE_NAME_A':{
			host:'HOST',
			port:/* PORT */,
			user:'USER',
			pass:'PASS',
			col:['COL_A','COL_B']
		},
		'DATABASE_NAME_B':{
			host:'HOST',
			port:/* PORT */,
			user:'USER',
			pass:'PASS',
			col:['COL_A','COL_B']
		}
	},

	mail:{
		'backstage':{
			service:'Gmail',
			auth:{
				user:"USER",
				pass:"PASS"
			}
		},
		'NAME':{
			service:'Gmail',
			auth:{
				user:"USER",
				pass:"PASS"
			}
		}
	},

	log:{
		system:{
			color:32,
			filename:'system',
			path:'./log/',
			of:true
		},
		error:{
			color:31,
			filename:'error',
			path:'./log/',
			of:true
		},
		backstage:{
			color:34,
			filename:'backstage',
			path:'./log/',
			of:true
		},
		'logname':{
			color:32,
			filename:'logname',
			path:'./log/',
			of:true
		}
	},

	dying:{
		session:{
			save:true,
			path:'./log/'
		}
	}
};