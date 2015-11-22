var config = require('./config.json');
var Discord = require('discord.js');
var Parse = require("./parser.js");
var bot = new Discord.Client();

bot.on('ready', () => {
    console.log('The bot is ready!');
});

bot.on('message', (message) => {

    if (~["bot", "testing"].indexOf(message.channel.name)) {

        var cmd = Parse.command("$", message, {
            allowMention : bot.user,
            sensitive: false
        });

        if(cmd){
            bot.sendMessage(message.channel, "**Parsed Argument Input**:\n\n" + cmd.arguments.join("\n"));
            bot.sendMessage(message.channel, "**Parsed Options Input**:\n\n" + JSON.stringify(cmd.options, null, 4));
            bot.sendMessage(message.channel, "**Parsed Flags Input**:\n\n" + cmd.flags.join("\n"));
            bot.sendMessage(message.channel, "**Command:** `" + cmd.command + "`");
        }
    }

});

bot.login(config.email, config.password);