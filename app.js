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
var downloads = require("/home/nicohman/ravenserver/downloads.json");
var domains = ["nicohman.demenses.net", "demenses.net"];
domains.forEach(function(domain){
var expT = exec("openssl s_client -connect "+domain+":443 < /dev/null 2>/dev/null | openssl x509 -noout -enddate").toString().replace("notAfter=","").replace(" GMT","");
var expM = moment(expT, "MMM D HH:mm:ss YYYY").utcOffset(0);
console.log(domain+" SSL certificate:\n\tExpires "+moment().to(expM).red);

});
//Call hddtemp and diskspace scripts. Not written by me, but taken from https github.com/Heholord/FalconStats
//console.log(exec("node /home/nicohman/demstats/hddtemp.js").toString());
console.log(exec("node "+__dirname+"/diskspace.js").toString());
console.log("Downloads:");
Object.keys(downloads).forEach(function(k){
	console.log(k+" - "+ downloads[k]);
});
