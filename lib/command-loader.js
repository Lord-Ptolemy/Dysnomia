"use strict";
var path = require("path");
var fs = require("fs");

var COMMAND_PATH = "commands";
var commands = [];

// Adds some required functions to a command module if it does not have them
exports.normalizeCommandModule = function(commandModule) {
    // A command module must always have a command name
    if (!commandModule.commandName) {
        throw new Error("Module has no command name!");
    }

    commandModule.description = commandModule.description || "";
    commandModule.aliases = commandModule.aliases || [];
    commandModule.isValid = commandModule.isValid || (() => true);
    commandModule.execute = commandModule.execute || (() => {});

    return commandModule;
};

// Adds utility functions to a command object
exports.addUtilities = function(command) {
    command.hasFlag = function(flagName) {
        var firstChar = flagName[0];
        return command.flags.indexOf(firstChar) >= 0 ||
            command.options[flagName] === true;
    };

    command.getOption = function(option, defaultValue) {
        return command.options[option] || defaultValue;
    };

    command.joinArguments = function(delimiter) {
        return command.arguments.join(delimiter || " ");
    };
};

// Load all commands from the directory
exports.loadCommands = function() {
    var normalizedPath = path.join(__dirname, COMMAND_PATH);

    fs.readdirSync(normalizedPath).forEach(function(file) {
        var commandModule = exports.normalizeCommandModule(require(
            "./commands/" + file));
        commands.push(commandModule);
    });
};

// Find a command with a given name
exports.findCommand = function(commandName) {
    for (var element in commands) {
        if (element.commandName === commandName ||
                element.commandName in element.aliases) {
            // Command found
            return element;
        }
    }
};

// Find a command and execute it
exports.findAndExecute = function(message, command) {
    var commandModule = exports.findCommand(command.commandName);
    exports.addUtilities(command);

    // Check whether command is valid
    var validityMessage = commandModule.isValid(message, command);
    if(validityMessage !== true) {
        if(typeof validityMessage === "string") {
            return validityMessage;
        }
        return undefined;
    }

    // Command is definitely valid, so execute it
    try {
        var result = commandModule.execute(message, command);
        return result;
    } catch(err) {
        return "An error occurred while processing the " +
            `command \`\`\`\n${command}\n\`\`\`\n: \n\`\`\`\n${err}\n\`\`\``;
    }
};
