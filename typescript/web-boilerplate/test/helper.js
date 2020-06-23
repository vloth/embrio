"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mock = exports.expect = exports.td = void 0;
var td = require("testdouble");
exports.td = td;
var chai_1 = require("chai");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return chai_1.expect; } });
// Built-in mocks
exports.mock = {
    ctx: td.object()
};
