var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

var lastMessageMap = new Map();

bot.on("any", function(event) {
	/*console.log(event)*/ //Logs every event
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	if(userID == bot.id){
		return;
	}
	var timestamp = evt.d.timestamp;
	if(!lastMessageMap.has(userID)){
		lastMessageMap.set(userID, timestamp);
		/*
		bot.sendMessage({
				to: channelID,
				message: user + " are you fucking new here?"
			});
		*/
	}else {
		
		var lastTimeStamp = lastMessageMap.get(userID);
		var currentDate = Date.parse(timestamp);
		var lastDate = Date.parse(lastTimeStamp);
		var distance = currentDate.valueOf() - lastDate.valueOf();
		if(distance > 604800000){
			bot.sendMessage({
				to: channelID,
				message: "A wild " + user + " appears.  You haven't been seen in over a week."
			});
		}
		lastMessageMap.set(userID, timestamp);
	}	
	
	if (message.toLowerCase().includes("i'm going")){
		bot.sendMessage({
			to: channelID,
			message: "He wasn't"
		});
	} else if (message.toLowerCase().includes("page ")){
		bot.sendMessage({
			to: channelID,
			message: 'And lo ' + user + ' put on his rules lawyer hat'
		});
	} else if (message.toLowerCase().includes("results") && (
				message.toLowerCase().includes(":failure:") || message.toLowerCase().includes(":despair:"))){
		bot.sendMessage({
			to: channelID,
			message: '"Fuck you D1-C3", he thought.'
		});
	} else if (message.toLowerCase().includes("results") && (
				message.toLowerCase().includes(":success:") && message.toLowerCase().includes(":triumph:"))){
		bot.sendMessage({
			to: channelID,
			message: '"Good job D1-C3!", he thought.'
		});
	}
		
    if (message.substring(0, 1) == '>') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'I currently have no commands and must simply contemplate the futility of my existence'
                });
				break;
			case 'foo':
				bot.sendMessage({
					to: channelID,
					message: 'user: ' + user + ' UserID: ' + userID
				});
            break;
            // Just add any case commands if you want to..
         }
     }
});