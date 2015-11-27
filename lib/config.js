"use strict";

var fs = require("fs");

var exports = {
    data: {}
};

var FILENAME = "config.json";
var EXAMPLE_FILENAME = "config.example.json";

// Creates a default config file based on the example file that should be
// present
function createDefaultConfig() {
    // Copy over the example file to the actual file, then read it again
    fs.writeFileSync(FILENAME, fs.readFileSync(EXAMPLE_FILENAME));
    exports.readFile();
}

// Reads the config file and dumps the properties into exports.data
exports.readFile = function() {
    try {
        var fileData = fs.readFileSync(FILENAME, "utf8");

        // File exists, so parse the JSON and add it to the data
        exports.data = JSON.parse(fileData);
    } catch (err) {
        if (err.code === "ENOENT")
            // Config file doesn't exist, so create a default one
            createDefaultConfig();
    }
};

// Writes the properties
exports.writeFile = function() {
    // Stringify the data so it can be written into the file
    var jsonToWrite = JSON.stringify(exports.data);
    try {
        fs.writeFileSync(FILENAME, jsonToWrite);
    } catch (err) {
        // Some error happened! Output it to stdout so the user can
        // deal with it accordingly
        console.log(err);
    }
};

// Method to get a property's value with an optional default value
exports.get = function(key, defaultValue) {
    exports.readFile();
    var value = exports.silentGet(key);
    if(value === undefined) value = defaultValue;
    return value;
};

// Method to silently get an option (without reading the file)
exports.silentGet = function(key) {
    return exports.data[key];
};

// Method to set a property's value (without writing it to file)
exports.set = function(key, value) {
    exports.data[key] = value;
};

// Utility method to set a property and write the file afterwards
exports.setAndWrite = function(key, value) {
    exports.set(key, value);
    exports.writeFile();
};

module.exports = exports;
