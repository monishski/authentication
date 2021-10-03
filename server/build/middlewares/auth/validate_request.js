"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
var express_validator_1 = require("express-validator");
var validateRequest = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    // res.status(400).send(errors.array()) // Dump of errors?
    res.status(400).send({
        error: "Sign Up Failed - Your email may be invalid/in use or your password doesn't meet our requirement",
    }); // Dump of errors?
};
exports.validateRequest = validateRequest;
