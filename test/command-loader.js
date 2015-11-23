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
        Loader.loadCommand();
        var echo = Loader.findCommand("echo");
        assert.assert(echo);
        assert.equal(echo.commandName, "echo");
    });

    describe("#addUtilities", () => {
        describe("#joinArguments", () => {
            it("should exist", () => {
                var command = {};
                Loader.addUtilities(command);
                assert(command.joinArguments);
            });

            it("should add joinArguments correctly", () => {
                var command = {
                    arguments: ["This", "is", "a", "test", "message"]
                };
                Loader.addUtilities(command);
                assert.equal(command.joinArguments(), "This is a test message");
            });
        });

        describe("#getOption", () => {
            it("should exist", () => {
                var command = {};
                Loader.addUtilities(command);
                assert(command.getOption);
            });

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

        describe("#hasFlag", () => {
            it("should exist", () => {
                var command = {};
                Loader.addUtilities(command);
                assert(command.getOption);
            });

            it("should return true if the one-char flag exists", () => {
                var command = {
                    flags: ["t"],
                    options: {}
                };
                Loader.addUtilities(command);
                assert.equal(command.hasFlag("test"), true);
            });

            it("should return true if the explicit option is true", () => {
                var command = {
                    flags: [],
                    options: {
                        test: true
                    }
                };
                Loader.addUtilities(command);
                assert.equal(command.hasFlag("test"), true);
            });

            it("should return true for the one-char and the explicit flag " +
                    "at the same time", () => {
                var command = {
                    flags: ["t"],
                    options: {
                        test: true
                    }
                };
                Loader.addUtilities(command);
                assert.equal(command.hasFlag("test"), true);
            });

            it("should return false if neither exists", () => {
                var command = {
                    flags: [],
                    options: {}
                };
                Loader.addUtilities(command);
                assert.equal(command.hasFlag("test"), false);
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

        Loader.loadCommands();
        var result = Loader.findAndExecute(message, command);
        assert.equal(result, "This is a test message");
    });
});
