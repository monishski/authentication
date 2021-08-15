"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var auth_1 = __importDefault(require("./routes/auth"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = express_1.default();
var PORT = process.env.PORT || 3000;
var MONGO_URI = process.env.MONGO_URI;
var MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
mongoose_1.default
    .connect(MONGO_URI, MONGO_OPTIONS)
    .then(function () { return console.log('[MONGODB LISTENING ON PORT: 27017]'); })
    .catch(function (err) { return console.log("[FAILED TO CONNECT TO DATABASE] Error: " + err); });
app.use(express_1.json());
app.use('/api/auth', auth_1.default);
app.listen(PORT, function () {
    console.log("[EXPRESS LISTENING ON PORT: " + PORT + "]");
});
