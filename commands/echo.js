// Echo command. Will output exactly what is given, or a modified version if
// used with modifier flags. Exists to demonstrate commands, aliases and flags
"use strict";

// This is the main name this command will respond to, and the one that
// will be found in the help command.
exports.commandName = "echo";

// These are aliases which the command will also respond to.
exports.aliases = ["say", "!"];

// Description which will appear in the help command.
exports.description = "Outputs the arguments it is given exactly unless " +
    "modified using certain modifier flags.";

// Executed before execute(), if this returns anything except true exactly,
// the command will fail silently or with a returned message.
exports.isValid = function(/* message, command */) {
    return true;
};

// This method will be executed when it's actually time for the command to
// execute.
exports.execute = function(message, command) {
    // command.joinArguments() will join the arguments into one string.
    var text = command.joinArguments();

    // command.hasFlag() can be used to check whether a command has a particular
    // explicit flag (i.e. --upcase) OR a one-character flag starting with the
    // letter of the explicit flag given.
    if (command.hasFlag("upcase")) {
        text = text.toUpperCase();
    }
    if (command.hasFlag("downcase")) {
        text = text.toLowerCase();
    }

    // command.getOption(name, default) can be used instead of
    // command.options.name if a default value is needed
    var start = command.getOption("start", 0);
    var end = command.getOption("end", 2000); // 2000 is used as a very large
                                              // default value (equal to
                                              // Discord's message length)
    text = text.substring(start, end);

    // Anything returned by the function will be turned into a string
    // and sent to the channel.
    return text;
};
