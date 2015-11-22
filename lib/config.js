var fs = require('fs');

var exports = {};

var FILENAME = 'config.json';
var EXAMPLE_FILENAME = 'config.example.json';
var data = {};

// Creates a default config file based on the example file that should be
// present
function createDefaultConfig() {
  // Copy over the example file to the actual file
  fs.createReadStream(EXAMPLE_FILENAME).pipe(fs.createWriteStream(FILENAME));
}

// Reads the config file and dumps the properties into exports.data
exports.readFile = function() {
  fs.readFile(FILENAME, 'utf8', (err, fileData) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // Config file doesn't exist, so create a default one
        createDefaultConfig();
      }
    } else {
      // File exists, so parse the JSON and add it to the data
      data = JSON.parse(fileData);
    }
  });
};

// Writes the properties
exports.writeFile = function() {
  // Stringify the data so it can be written into the file
  var jsonToWrite = JSON.stringify(data);
  fs.writeFile(FILENAME, jsonToWrite, (err) => {
    if (err) {
      // Some error happened! Output it to stdout so the user can
      // deal with it accordingly
      console.log(err);
    }
  });
};

// Method to get a property's value
exports.get = function(key) {
  return data[key];
};

// Method to set a property's value (without writing it to file)
exports.set = function(key, value) {
  data[key] = value;
};

// Utility method to set a property and write the file afterwards
exports.setAndWrite = function(key, value) {
  set(key, value);
  writeFile();
};

module.exports = exports;
