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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusScheduler = exports.getStopScheduler = exports.getStartScheduler = void 0;
const lodash_1 = __importDefault(require("lodash"));
const node_schedule_1 = require("node-schedule");
const job_1 = require("../api/job");
const header_1 = require("../api/scheduler/header");
const scheduler_1 = require("../interfaces/scheduler");
const util_1 = require("../middleware/util");
const models_1 = require("../models");
var startFlag = true;
exports.getStartScheduler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!startFlag)
            throw Error("Please stop the scheduler");
        startFlag = false;
        const resp = {
            status: scheduler_1.E_SchedulerStatus.START,
        };
        util_1.Resp_success_200(res, resp);
        job_1.startJobs();
    }
    catch (err) {
        util_1.Resp_err_403(res, err.message);
    }
});
exports.getStopScheduler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (startFlag)
            throw Error("Please start the scheduler");
        startFlag = true;
        const resp = {
            status: scheduler_1.E_SchedulerStatus.STOP,
        };
        res.status(200).json(resp);
        job_1.stopJobs();
    }
    catch (err) {
        util_1.Resp_err_403(res, err.message);
    }
});
exports.getStatusScheduler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSchedule = yield header_1.readScdlHdr(models_1.M_GetSchedule());
        const logs = yield Promise.all(lodash_1.default.map(getSchedule.cursor, (schedule) => {
            return {
                id: schedule.BI_REPORT_NAME,
                date: node_schedule_1.scheduledJobs[schedule.SCHEDULE_ID].nextInvocation().toString(),
            };
        }));
        res.status(200).json(logs);
    }
    catch (err) {
        util_1.Resp_err_403(res, err.message);
    }
});
//# sourceMappingURL=scheduler.js.map