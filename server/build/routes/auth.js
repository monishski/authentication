"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validate_request_1 = require("../middlewares/auth/validate_request");
var validate_access_token_1 = require("../middlewares/auth/validate_access_token");
var validate_refresh_token_1 = require("../middlewares/auth/validate_refresh_token");
var validate_signup_1 = require("../middlewares/auth/validate_signup");
var signup_1 = require("../controllers/auth/signup");
var signin_1 = require("../controllers/auth/signin");
var refresh_token_1 = require("../controllers/auth/refresh_token");
var router = express_1.Router();
router.get('/', validate_access_token_1.validate_access_token, function (req, res) {
    console.log(req.currentUser);
    res.status(200).send("Hello, it's me.");
});
router.post('/refresh_token', [
    validate_access_token_1.validate_access_token,
    validate_refresh_token_1.validate_refresh_token
], refresh_token_1.controller_post_refresh_token);
router.post('/signin', signin_1.controller_post_signin); //The errors will be generic messages!
router.post('/signup', [
    validate_signup_1.validateEmail,
    validate_signup_1.validatePassword,
    validate_signup_1.validateConfirmPassword,
    validate_request_1.validateRequest
], signup_1.controller_post_signup); //The errors below are per field!
exports.default = router;
