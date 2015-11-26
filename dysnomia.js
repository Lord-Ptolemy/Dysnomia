"use strict";

var config = require("./config.json");
var Discord = require("discord.js");
var Parse = require("./lib/parser.js");
var Loader = require("./lib/command-loader.js");
var bot = new Discord.Client();

bot.on("ready", () => {
    console.log("The bot is ready!");
});

bot.on("message", (message) => {

    if (~["bot", "testing"].indexOf(message.channel.name)) {

        var cmd = Parse.command("$", message, {
            allowMention : bot.user,
            sensitive: false
        });

        if (cmd) {
            var result = Loader.findAndExecute(cmd);
            message.channel.sendMessage(result);
        } else {
            bot.reply(message,
                "An error occurred while parsing the command!");
        }
    }

});

bot.login(config.email, config.password);
