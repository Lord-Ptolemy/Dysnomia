var assert = require('assert');
var fs = require('fs');

describe('Config', () => {
  describe('#readFile', () => {
    before(() => {
      // Back up an existing config file
      try {
        fs.createReadStream('config.json').pipe(fs.createWriteStream('config.backup.json'));
      } catch (e) {} // Suppress errors, they don't matter
    });

    after(() => {
      // Restore the backed up file
      try {
        fs.createReadStream('config.backup.json').pipe(fs.createWriteStream('config.json'));
      } catch (e) {} // Suppress errors, they don't matter
    });

    it('should read an existing config file', () => {
      // Make a config file
      fs.writeFileSync('config.json', JSON.stringify({ testKey: 'testValue' }));

      var Config = require('../lib/config.js');
      Config.readFile();
      assert.equal(Config.get('testKey'), 'testValue');
    });

    it('should create a new config file if none is present', () => {
      // Delete any config file
      fs.unlinkSync('config.json');

      var Config = require('../lib/config.js');
      Config.readFile();
      assert.equal(Config.get('exampleTestKey'), 'exampleTestValue');
    });
  });

  describe('#writeFile', () => {
    before(() => {
      // Back up an existing config file
      fs.createReadStream('config.json').pipe(fs.createWriteStream('config.backup.json'));
    });

    after(() => {
      // Restore the backed up file
      fs.createReadStream('config.backup.json').pipe(fs.createWriteStream('config.json'));
    });

    it('should write a config file and then read it again', () => {
      // Delete any config file and make a new example one
      fs.unlinkSync('config.json');

      var Config = require('../lib/config.js');
      Config.readFile();
      Config.set('testKey1', 'testValue1');
      Config.setAndWrite('testKey2', 'testValue2');

      Config = require('../lib/config.js');

      Config.readFile();
      assert.equal(Config.get('testKey1'), 'testValue1');
      assert.equal(Config.get('testKey2'), 'testValue2');
    });
  });
});
