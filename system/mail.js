var nodemailer=require("nodemailer");

global.rw.mail=function(id,opt,callback){
	var smtpTransport=nodemailer.createTransport("SMTP",rw.config.mail[id]);
	smtpTransport.sendMail(opt,callback);
};