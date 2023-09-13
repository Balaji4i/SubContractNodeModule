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
exports.stopJobs = exports.startJobs = exports.runJob = void 0;
const date_and_time_1 = require("date-and-time");
const lodash_1 = __importDefault(require("lodash"));
const node_schedule_1 = require("node-schedule");
const _1 = require(".");
const models_1 = require("../models");
const lines_1 = require("../models/scheduler/lines");
const soap_1 = require("../models/soap");
const header_1 = require("./scheduler/header");
const lines_2 = require("./scheduler/lines");
const soap_2 = require("./soap");
exports.runJob = (scdlHdr) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    var scdlList;
    try {
        scdlList = yield lines_2.insScdlLine_api(lines_1.M_insScdlLine(scdlHdr.SCHEDULE_ID, scdlHdr.DB_TABLE_NAME));
        const reportAbsolutePath = `${scdlHdr.BI_REPORT_PATH}/${scdlHdr.BI_REPORT_NAME}.xdo`;
        const lastUpdate = date_and_time_1.format(scdlList.schedule_list[0].LAST_REFRESH_TIME, "MM-DD-YYYY HH:mm:ss");
        // const lastUpdate: string = "06-14-2020 06:00:00"; // MM-dd-yyyy HH:mm:ss
        const reportData = yield soap_2.getReportData(soap_1.M_ReportArgsSoap(lastUpdate, reportAbsolutePath), scdlHdr.SCHEDULE_ID.toString());
        if ((_a = reportData === null || reportData === void 0 ? void 0 : reportData.DATA_DS) === null || _a === void 0 ? void 0 : _a.G_1)
            _1.pushReports(scdlHdr.DB_TABLE_NAME, scdlHdr.DB_COLUMN_NAMES, scdlList.table_structure, reportData.DATA_DS.G_1);
        lines_2.updScdlLine_status_api(lines_1.M_updScdlLine_status(scdlList.schedule_list[0].SCHEDULE_LIST_ID.toString(), "COMPLETED", null));
    }
    catch (err) {
        console.log(err.message);
        if (scdlList.schedule_list[0].SCHEDULE_LIST_ID.toString())
            lines_2.updScdlLine_status_api(lines_1.M_updScdlLine_status(scdlList.schedule_list[0].SCHEDULE_LIST_ID.toString(), "ERROR", err.message));
    }
});
exports.startJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    const getSchedule = yield header_1.readScdlHdr(models_1.M_GetSchedule());
    if (getSchedule.cursor) {
        lodash_1.default.each(getSchedule.cursor, (scdlHdr) => {
            node_schedule_1.scheduleJob(scdlHdr.SCHEDULE_ID.toString(), `*/${scdlHdr.FREQUENCY_MIN} * * * *`, () => {
                exports.runJob(scdlHdr);
            });
        });
    }
});
exports.stopJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    lodash_1.default.each(node_schedule_1.scheduledJobs, (job) => {
        job.cancel();
    });
});
//# sourceMappingURL=job.js.map