"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLastName = exports.validateFirstName = exports.validateConfirmPassword = exports.validatePassword = exports.validateEmail = exports.validateUsername = void 0;
var express_validator_1 = require("express-validator");
var utilities_1 = require("./utilities");
exports.validateUsername = express_validator_1.body("username")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('Username must be between 4 and 20 characters')
    .notEmpty().withMessage('Username must not be empty')
    .matches(/[a-z\d]/)
    .withMessage('Username must contain only lowercase characters and numbers')
    .custom(utilities_1.isUsernameInUse);
exports.validateEmail = express_validator_1.body("email")
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail()
    .isLength({ max: 250 })
    .withMessage('Email must not exceed 250 characters')
    .custom(utilities_1.isEmailInUse);
exports.validatePassword = express_validator_1.body("password")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('Password must be between 8 and 20 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&_]/)
    .withMessage("Password must include one lowercase character, one uppercase character, a number, and a special character");
exports.validateConfirmPassword = express_validator_1.body("confirmPassword")
    .notEmpty()
    .withMessage('Confirm Password must not be empty')
    .custom(utilities_1.isConfirmPassWordEqual);
exports.validateFirstName = express_validator_1.body("firstName")
    .trim()
    .notEmpty()
    .withMessage('First Name must not be empty')
    .isLength({ max: 50 })
    .withMessage('First Name must not exceeed 50 characters');
exports.validateLastName = express_validator_1.body("lastName")
    .trim()
    .notEmpty()
    .withMessage('Last Name must not be empty')
    .isLength({ max: 50 })
    .withMessage('Last Name must not exceeed 50 characters');
