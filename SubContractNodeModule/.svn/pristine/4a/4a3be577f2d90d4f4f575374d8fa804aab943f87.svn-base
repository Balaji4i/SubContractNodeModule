"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scheduler_1 = require("../controllers/scheduler");
const router = express_1.default();
router.get("/scheduler/start", scheduler_1.getStartScheduler);
router.get("/scheduler/stop", scheduler_1.getStopScheduler);
router.get("/scheduler/status", scheduler_1.getStatusScheduler);
exports.default = router;
//# sourceMappingURL=index.js.map