var mongoServer=require('mongodb').Server,
	mongoDb=require('mongodb').Db,
	ObjectID=require('mongodb').ObjectID,
	taskCount=0,
	serverList={},
	dbList={},
	dbReady={};
	
global.rw.mongoColList={};

dbOpened=function(e,db){
	if(e){
		rw.log.write('Database ['+db.databaseName+'] Error.'+e,'error');
		return;
	}
	db.authenticate(rw.config.mongo[db.databaseName].user,rw.config.mongo[db.databaseName].pass,{a:1},function(e){
		if(e){
			rw.log.write('Database ['+db.databaseName+'] Error.'+e,'error');
			return;
		}
		var i;
		for(i in rw.config.mongo[db.databaseName].col){
			rw.log.write('Opening Collection ['+db.databaseName+'.'+rw.config.mongo[db.databaseName].col[i]+'] ...');
			db.collection(rw.config.mongo[db.databaseName].col[i],function(e,col){
				if(e){
					rw.log.write('Collection ['+col.db.databaseName+'.'+col.collectionName+'] Error.'+e,'error');
					return;
				}
				rw.mongoColList[col.db.databaseName+'.'+col.collectionName]=col;
				colOpened();
			});
		}
	});
};

colOpened=function(){
	taskCount--;
	if(taskCount<=0){
		dbReady();
	}
};

exports.init=function(callback){
	dbReady=callback;
	rw.log.write('Initializing Database ...');
	var i;
	for(i in rw.config.mongo){
		serverList[i]=new mongoServer(rw.config.mongo[i].host,rw.config.mongo[i].port,{auto_reconnect:true});
		dbList[i]=new mongoDb(i,serverList[i],{w:1});
		rw.log.write('Opening Database ['+i+'] ...');
		dbList[i].open(dbOpened);
		taskCount+=rw.config.mongo[i].col.length;
	}
	if(taskCount==0){
		dbReady();
	}
};

exports.objectID=function(id){
	return new ObjectID(id);
};