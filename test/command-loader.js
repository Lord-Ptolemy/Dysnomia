"use strict";
var Loader = require("../lib/command-loader.js");
var assert = require("assert");

describe("Loader", () => {
    it("should load the commands list without errors", () => {
        assert.doesNotThrow(() => {
            Loader.loadCommands();
        });
    });

    it("should find the echo command", () => {
        var echo = Loader.findCommand("echo");
        assert.assert(echo);
        assert.equal(echo.commandName, "echo");
    });

    describe("#addUtilities", () => {
        it("should add joinArguments correctly", () => {
            var command = {
                arguments: ["This", "is", "a", "test", "message"]
            };
            Loader.addUtilities(command);
            assert.equal(command.joinArguments(), "This is a test message");
        });

        describe("#getOption", () => {
            it("should return the given option if it exists", () => {
                var command = {
                    options: {
                        testOption: "testValue"
                    }
                };
                Loader.addUtilities(command);
                assert.equal(command.getOption("testOption"), "testValue");
            });

            it("should return the default value if the option doesn't " +
                    "exist", () => {
                var command = {
                    options: {}
                };
                Loader.addUtilities(command);
                assert.equal(command.getOption("testOption", "testValue"),
                    "testValue");
            });
        });
    });

    it("should correctly execute the echo command", () => {
        // Message shouldn't be used so make it undefined
        var message = undefined;

        // Command result
        var command = {
            command: "echo",
            arguments: ["This", "is", "a", "test", "message"]
        };

        var result = Loader.findAndExecute(message, command);
        assert.equal(result, "This is a test message");
    });
});
