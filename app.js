#! /usr/bin/node
var moment = require("moment");
var colors = require("colors");
var os = require("os");
var exec = require("child_process").execSync;
console.log(("Welcome to "+os.hostname()+", running "+ os.release()).yellow);
var uptime = moment.duration(os.uptime(), "seconds");
console.log(("Current uptime: "+uptime.humanize()).yellow);
var processes = ['mongod', 'app.js 0', 'app.js 1', 'app.js 2', 'demenses.js'];
var niceP = ['MongoDB', 'Dragon', 'Defiant', 'Dragon\'s Teeth', 'Demenses']
console.log("Service Status:");
processes.forEach(function(pro, ind){
	var count = exec("ps aux | grep '"+pro+"'").toString().split("\n").length -2;
	if(count > 0){
		console.log("\t"+niceP[ind]+" up".green);
	} else {
		console.log("\t"+niceP[ind]+ " down".red);
	}
});
var expT = exec("openssl s_client -connect demenses.net:443 < /dev/null 2>/dev/null | openssl x509 -noout -enddate").toString().replace("notAfter=","").replace(" GMT","");
var expM = moment(expT, "MMM  D HH:mm:ss 2018").utcOffset(0);
console.log("SSL certificate:\n\tExpires "+moment().to(expM).red);
//Call hddtemp and diskspace scripts. Not written by me, but taken from https github.com/Heholord/FalconStats
//console.log(exec("node /home/nicohman/demstats/hddtemp.js").toString());
console.log(exec("node "+__dirname+"/diskspace.js").toString());
