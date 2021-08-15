"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validate_request_1 = require("../middlewares/auth/validate_request");
var validate_signup_1 = require("../middlewares/auth/validate_signup");
var signup_1 = require("../controllers/auth/signup");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.status(200).send("Hello, it's me.");
});
router.post('/signup', [validate_signup_1.validateEmail, validate_signup_1.validatePassword, validate_signup_1.validateConfirmPassword, validate_request_1.validateRequest], signup_1.controller_post_signup);
exports.default = router;
