"use strict";

var parser = require("../lib/parser.js");
var assert = require("assert");

describe("Parser", () => {
    describe("#command", () => {
        it("should return a correctly dissected simple command", () => {
            var dissected = parser.command("$", { content: "$command arg1 arg2 \"arg 3 arg 4\" -cf --verbose" });
            assert.equal(dissected.command, "command");
            assert.deepEqual(dissected.arguments, ["arg1", "arg2", "arg 3 arg 4"]);
            assert.deepEqual(dissected.flags, ["c", "f"]);
            assert(dissected.options.verbose);
        });

        it("should return a correctly dissected complex command", () => {
            var dissected = parser.command("$", { content: "$command \"ab \\\"ala\\\" haha\" -cf --b -a a d a --ca" });
            assert.equal(dissected.command, "command");
            assert.deepEqual(dissected.arguments, ["ab \"ala\" haha", "a", "d", "a"]);
            assert.deepEqual(dissected.flags, ["a", "c", "f"]);
            assert(dissected.options.b);
            assert(dissected.options.ca);
        });

    });
});