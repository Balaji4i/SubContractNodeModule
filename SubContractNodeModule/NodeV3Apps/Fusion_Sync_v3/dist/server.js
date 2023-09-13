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
Object.defineProperty(exports, "__esModule", { value: true });
// import "./config/dotenv.conf";
const database_1 = require("./services/database");
const webServer_1 = require("./services/webServer");
const scheduler_1 = require("./controllers/scheduler");
const startup = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Starting application`);
    // DataBase Initialization
    try {
        console.log("Initializing database module");
        yield database_1.initialize();
    }
    catch (err) {
        console.error(err);
        process.exit(1); // Non-zero failure code
    }
    // Server Initialization
    try {
        console.log("Initializing web server module");
        yield webServer_1.initialize();
    }
    catch (err) {
        console.error(err);
        process.exit(1); // Non-zero failure code
    }
    try {
        yield scheduler_1.mailNotification();
    }
    catch (err) {
        console.error(err);
        process.exit(1); // Non-zero failure code
    }
});
// Starting the function initially
startup();
const shutdown = (e) => __awaiter(void 0, void 0, void 0, function* () {
    let err = e;
    console.log("Shutting down application");
    // Closing DataBase
    try {
        console.log("Closing database module");
        yield database_1.close();
    }
    catch (err) {
        console.error(err);
        process.exit(1); // Non-zero failure code
    }
    // Closing Server
    try {
        console.log("Closing web server module");
        yield webServer_1.close();
    }
    catch (e) {
        console.error(e);
        err = err || e;
    }
    if (err) {
        process.exit(1); // Non-zero failure code
    }
    else {
        process.exit(0);
    }
});
process.on("SIGTERM", (signal) => {
    console.log(`Received ${signal}`);
    shutdown();
});
// Handle ^C
process.on("SIGINT", (signal) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Received ${signal}`);
    shutdown();
}));
process.on("uncaughtException", (err) => {
    console.error("Uncaught exception");
    console.error(err);
    shutdown(err);
});
//# sourceMappingURL=server.js.map