"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateEmail = void 0;
var express_validator_1 = require("express-validator");
var utilities_1 = require("./utilities");
exports.validateEmail = express_validator_1.body("email")
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail()
    .isLength({ max: 250 }) // Stop outrageous submissions
    .withMessage('Email must not exceed 250 characters')
    .custom(utilities_1.doesEmailExists);
exports.validatePassword = express_validator_1.body("password")
    .trim()
    .isLength({ max: 250 }) // Stop outrageous submissions
    .withMessage('Password must not exceed 250 characters');
