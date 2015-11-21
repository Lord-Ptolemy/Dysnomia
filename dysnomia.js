var config = require('./config.json');
var Discord = require('discord.js');

var bot = new Discord.Client();

bot.on('ready', () => {
    console.log('The bot is ready!');
});

bot.on('message', (message) => {
    if (message.content.toLowerCase() === 'ping') {
        bot.reply(message, 'Pong!');
    }
});

bot.login(config.email, config.password);