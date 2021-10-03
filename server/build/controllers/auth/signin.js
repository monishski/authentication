"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller_post_signin = void 0;
var User_1 = require("../../models/User");
var jwt_1 = require("../../utilities/jwt");
// Note: the error response from the
var controller_post_signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.User.findOne({ email: email }).exec()];
            case 1:
                user = _b.sent();
                if (!user) {
                    // Not as part of Validation Chain for cosistent error handling
                    res
                        .status(400)
                        .send({ message: "Invalid credentials [Email is incorrect]" });
                    return [2 /*return*/];
                }
                user.comparePasswords(password, function (err, isMatch) { return __awaiter(void 0, void 0, void 0, function () {
                    var accessToken, refreshToken;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err) {
                                    res.status(500).send({ error: "Failed to compare passwords" });
                                    return [2 /*return*/];
                                }
                                if (!!isMatch) return [3 /*break*/, 1];
                                res
                                    .status(400)
                                    .send({ message: "Invalid credentials [Password is incorrect]" });
                                return [2 /*return*/];
                            case 1:
                                accessToken = jwt_1.generateAccessJWT(user._id);
                                refreshToken = jwt_1.generateRefreshJWT(user._id);
                                user.refreshToken = refreshToken; //Save refreshToken in DB
                                return [4 /*yield*/, user.save()];
                            case 2:
                                _a.sent();
                                //Save refreshToken in Cookie as HttpOnly & only send back Access Token in body
                                //I am not using signedCookies because the JWT already has a SECRET associated with it...
                                res
                                    .status(200)
                                    .cookie("refresh_token", refreshToken, {
                                    //Note I am not sending back refresh token in the response body, but as cookie to be stored in the browser
                                    httpOnly: true,
                                    secure: process.env.NODE_ENV === "production",
                                })
                                    .send({ accessToken: accessToken }); //this will be stored in memory (via REACT/REDUX)
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
exports.controller_post_signin = controller_post_signin;
