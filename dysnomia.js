"use strict";

var config = require("./config.json");
var Discord = require("discord.js");
var Parse = require("./parser.js");
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
            Loader.findAndExecute(cmd);
        } else {
            bot.reply(message,
                "An error occurred while parsing the command!");
        }
    }

});

bot.login(config.email, config.password);
