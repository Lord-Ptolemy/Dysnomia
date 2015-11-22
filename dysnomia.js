var config = require('./config.json');
var Discord = require('discord.js');
var Parse = require("./parser.js");
var bot = new Discord.Client();

bot.on('ready', () => {
    console.log('The bot is ready!');
});

bot.on('message', (message) => {

    if (~["bot", "testing"].indexOf(message.channel.name)) {
        var args = Parse.command("$", message, null);
        
        if(args)
            bot.sendMessage(message.channel, "Parsed Argument Input:\n\n" + args.join("\n"));
    }

});

bot.login(config.email, config.password);