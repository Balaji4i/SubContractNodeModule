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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.initialize = void 0;
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const rotating_file_stream_1 = require("rotating-file-stream");
const webServer_1 = require("../config/webServer");
const routes_1 = __importDefault(require("../routes"));
let httpServer;
exports.initialize = () => {
    return new Promise((resolve, reject) => {
        const app = express_1.default();
        app.use(express_1.json());
        app.use(express_1.urlencoded({ extended: true }));
        // log only 4xx and 5xx responses to console
        app.use(morgan_1.default("combined", {
            skip: (req, res) => {
                return res.statusCode < 400;
            },
            stream: rotating_file_stream_1.createStream("error.log", {
                interval: "10d",
                path: path_1.default.join(__dirname, "..", "..", "logs"),
            }),
        }));
        // log only success request to access.log
        app.use(morgan_1.default("combined", {
            skip: (req, res) => {
                return res.statusCode >= 400;
            },
            stream: rotating_file_stream_1.createStream("access.log", {
                interval: "10d",
                path: path_1.default.join(__dirname, "..", "..", "logs"),
            }),
        }));
        // *** Mount the all routes
        app.use(process.env.BASE_URL || "/api", routes_1.default);
        app.get("/", (req, res) => {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Welcome to Node Js Application");
        });
        // Listening the port for server
        httpServer = app
            .listen(webServer_1.port, () => {
            console.log(`Web server listening on ${webServer_1.port}`);
            resolve();
        })
            .on("error", (err) => {
            reject(err);
        });
    });
};
exports.close = () => {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};
//# sourceMappingURL=webServer.js.map