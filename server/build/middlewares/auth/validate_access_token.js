"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_access_token = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validate_access_token = function (req, res, next) {
    var authorization = req.header('Authorization'); //Note ACCESS JWT what will let you access protected resources 
    if (authorization) {
        var _a = authorization.split(' '), _ = _a[0], accessJWT = _a[1];
        jsonwebtoken_1.default.verify(accessJWT, process.env.JWT_ACCESS_SECRET, function (err, payload) {
            if (err || !payload) {
                res.status(403).send({ error: "Please authenticate [JWT Invalid]" });
                return; //return because otherwise we will try set currentUser?
            }
            req.currentUser = payload;
            next();
        });
    }
    else {
        res.status(401).send({ error: "Please authenticate [JWT Missing]" }); //TODO: migrate to custom error handling class
        return;
    }
};
exports.validate_access_token = validate_access_token;
