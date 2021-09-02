"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshJWT = exports.generateAccessJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Secrets are generated using require('crypto').randomBytes(48).toString('hex') 
var generateAccessJWT = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30s" });
};
exports.generateAccessJWT = generateAccessJWT;
var generateRefreshJWT = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "2m" });
};
exports.generateRefreshJWT = generateRefreshJWT;
