var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;

var button = buttons.ActionButton({
  id: "idem-helper-icon",
  label: "Idem Helper",
  icon: {
    "16": "./Reminder-16.png",
    "32": "./Reminder-32.png",
    "64": "./Reminder-64.png"
  },
  onClick: handleClick
});

tabs.on('activate', function () {
  check();
});

tabs.on('load', function () {
  check();
});

function check(){
	console.log('active: ' + tabs.activeTab.url);
	var idemUrl = "localhost/firefox-addon/"
	if(tabs.activeTab.url.indexOf(idemUrl) != -1){
		tabs.activeTab.attach({
			contentScriptFile:[
				data.url("libs/jquery.js"),
				data.url("libs/noty.js"),
				data.url("libs/moments.js"),
				data.url("libs/moments-locales.js"),
				data.url("libs/config.js"),
				data.url("libs/ticket.js"), 
				data.url("libs/tickets_view.js"), 
				data.url("main.js")
			]   
		});
	}
}

function handleClick(state) {
	check();
}
