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
exports.getResult = exports.getMailContent = exports.mailNotification = exports.getStatusScheduler = exports.getStopScheduler = exports.getStartScheduler = void 0;
const job_1 = require("../api/job");
const scheduler_1 = require("../interfaces/scheduler");
const util_1 = require("../middleware/util");
const lodash_1 = __importDefault(require("lodash"));
const node_schedule_1 = require("node-schedule");
const header_1 = require("../api/scheduler/header");
const models_1 = require("../models");
const mail_1 = require("../api/mail");
const mail_2 = require("../services/mail");
var startFlag = true;
const getStartScheduler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getStartScheduler = getStartScheduler;
const getStopScheduler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getStopScheduler = getStopScheduler;
const getStatusScheduler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSchedule = yield header_1.readScdlHdr(models_1.M_GetSchedule());
        const logs = yield Promise.all(lodash_1.default.map(getSchedule.cursor, (schedule) => {
            var _a, _b;
            return {
                id: schedule.BI_REPORT_NAME,
                date: (_b = (_a = node_schedule_1.scheduledJobs[schedule.SCHEDULE_ID]) === null || _a === void 0 ? void 0 : _a.nextInvocation()) === null || _b === void 0 ? void 0 : _b.toString(),
            };
        }));
        res.status(200).json(logs);
    }
    catch (err) {
        util_1.Resp_err_403(res, err.message);
    }
});
exports.getStatusScheduler = getStatusScheduler;
const mailNotification = () => __awaiter(void 0, void 0, void 0, function* () {
    node_schedule_1.scheduleJob(process.env.MAIL_SCHEDULER_NAME || 'Sync Mail Notification', `${process.env.MAIL_NOTIFICATION_MIN} ${process.env.MAIL_NOTIFICATION_HOUR} * * *`, () => {
        exports.getMailContent();
    });
});
exports.mailNotification = mailNotification;
const getMailContent = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailNotification = yield mail_1.readMailContent();
        if (mailNotification.err_code)
            console.error("Mail Scheduler Error");
        if (mailNotification.mailNotificationFlag === 'Y' && mailNotification.recordCount > 0) {
            let mailtoArray = mailNotification.mailTo.split(',');
            mail_2.sendMail_mdlr({
                html: mailNotification.mailContent[0].MAIL_CONTENT,
                subject: mailNotification.mailSubject,
                to: mailtoArray,
                from: mailNotification.mailFrom
            });
        }
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.getMailContent = getMailContent;
const getResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let query = (_a = req.params) === null || _a === void 0 ? void 0 : _a.query.toUpperCase();
        if (query) {
            if (query.includes("DELETE") || query.includes("UPDATE")) {
                res.status(200).json("Delete or update operation not allowed!");
            }
            else {
                const result = yield header_1.readQuery(query);
                res.status(200).json(result === null || result === void 0 ? void 0 : result.rows);
            }
        }
        else {
            res.status(200).json("Query not provided!");
        }
    }
    catch (err) {
        util_1.Resp_err_403(res, err.message);
    }
});
exports.getResult = getResult;
//# sourceMappingURL=scheduler.js.map