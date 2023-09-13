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
exports.stopJobs = exports.startJobs = exports.processReportData = exports.runJob = void 0;
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
const runJob = ({ SCHEDULE_ID, BI_REPORT_NAME, BI_REPORT_PATH, DB_COLUMN_NAMES, DB_TABLE_NAME, OPERATION, RESET_DATA, PACKAGE_TO_RUN_AFTER_PROCESS, RUN_PACKAGE_AT_LAST_SEQ }, credentials) => __awaiter(void 0, void 0, void 0, function* () {
    var params;
    try {
        params = yield lines_2.readScdParams_api(lines_1.M_readScdParams(SCHEDULE_ID));
        yield exports.processReportData(SCHEDULE_ID, BI_REPORT_NAME, BI_REPORT_PATH, DB_COLUMN_NAMES, DB_TABLE_NAME, OPERATION, RESET_DATA, credentials, 1, params, PACKAGE_TO_RUN_AFTER_PROCESS, RUN_PACKAGE_AT_LAST_SEQ, 0);
    }
    catch (err) {
        console.error(err);
    }
});
exports.runJob = runJob;
const processReportData = (SCHEDULE_ID, BI_REPORT_NAME, BI_REPORT_PATH, DB_COLUMN_NAMES, DB_TABLE_NAME, OPERATION, RESET_DATA, credentials, paramcount, params, PACKAGE_TO_RUN_AFTER_PROCESS, RUN_PACKAGE_AT_LAST_SEQ, TOTAL_REPORT_COUNT) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    var lastParam = "NO";
    var recordCount = 0;
    if (params.params_count === 0 || paramcount === params.params_count) {
        lastParam = "YES";
    }
    var scdlList;
    try {
        let paramList = params.params.filter(par => { return par.SEQUENCE_NO === paramcount; });
        scdlList = yield lines_2.insScdlLine_api(lines_1.M_insScdlLine(SCHEDULE_ID, DB_TABLE_NAME, paramcount));
        if (params.already_running === 0) {
            const reportAbsolutePath = `${BI_REPORT_PATH}/${BI_REPORT_NAME}.xdo`;
            let lastUpdate = '';
            if (scdlList.schedule_list[0].LAST_REFRESH_TIME) {
                lastUpdate = date_and_time_1.format(scdlList.schedule_list[0].LAST_REFRESH_TIME, "MM-DD-YYYY HH:mm:ss");
            }
            // console.log(scdlList.schedule_list[0].LAST_REFRESH_TIME);
            // const lastUpdate: string = "01-01-2010 06:00:00"; // MM-dd-yyyy HH:mm:ss
            // console.log(M_ReportArgsSoap(lastUpdate, reportAbsolutePath, credentials));
            const reportData = yield soap_2.getReportData(credentials, soap_1.M_ReportArgsSoap(lastUpdate, reportAbsolutePath, credentials, paramList), SCHEDULE_ID.toString());
            if (RESET_DATA === "Y" && paramcount === 1)
                yield _1.executeMergeQuery([{ table_name: DB_TABLE_NAME, query: `delete from ${DB_TABLE_NAME}` }], models_1.M_ExeMrgQryOptions());
            if ((_a = reportData === null || reportData === void 0 ? void 0 : reportData.DATA_DS) === null || _a === void 0 ? void 0 : _a.G_1) {
                recordCount = reportData.DATA_DS.G_1.length;
                _1.pushReports(DB_TABLE_NAME, DB_COLUMN_NAMES, scdlList.table_structure, OPERATION, reportData.DATA_DS.G_1);
            }
            lines_2.updScdlLine_status_api(lines_1.M_updScdlLine_status(scdlList.schedule_list[0].SCHEDULE_LIST_ID.toString(), "COMPLETED", null, paramcount, lastParam, recordCount));
            TOTAL_REPORT_COUNT += recordCount;
            if (PACKAGE_TO_RUN_AFTER_PROCESS && PACKAGE_TO_RUN_AFTER_PROCESS !== null && TOTAL_REPORT_COUNT > 0 && (RUN_PACKAGE_AT_LAST_SEQ !== "Y" || lastParam === "YES")) {
                let packageCall = `BEGIN
          ${PACKAGE_TO_RUN_AFTER_PROCESS};
          END;`;
                yield lines_2.executePackage_api(packageCall);
            }
            paramcount += 1;
            if (lastParam === "NO") {
                yield exports.processReportData(SCHEDULE_ID, BI_REPORT_NAME, BI_REPORT_PATH, DB_COLUMN_NAMES, DB_TABLE_NAME, OPERATION, RESET_DATA, credentials, paramcount, params, PACKAGE_TO_RUN_AFTER_PROCESS, RUN_PACKAGE_AT_LAST_SEQ, TOTAL_REPORT_COUNT);
            }
        }
        else {
            lines_2.updScdlLine_status_api(lines_1.M_updScdlLine_status(scdlList.schedule_list[0].SCHEDULE_LIST_ID.toString(), "ALREADY RUNNING", null, paramcount, lastParam, recordCount));
        }
    }
    catch (err) {
        console.error(err);
        if (((_b = scdlList.schedule_list) === null || _b === void 0 ? void 0 : _b.length) &&
            scdlList.schedule_list[0].SCHEDULE_LIST_ID.toString())
            lines_2.updScdlLine_status_api(lines_1.M_updScdlLine_status(scdlList.schedule_list[0].SCHEDULE_LIST_ID.toString(), "ERROR", err.message
                ? err.message.substring(0, 2000)
                : err.toString().substring(0, 2000), paramcount, lastParam, recordCount));
        paramcount += 1;
        if (lastParam === "NO") {
            yield exports.processReportData(SCHEDULE_ID, BI_REPORT_NAME, BI_REPORT_PATH, DB_COLUMN_NAMES, DB_TABLE_NAME, OPERATION, RESET_DATA, credentials, paramcount, params, PACKAGE_TO_RUN_AFTER_PROCESS, RUN_PACKAGE_AT_LAST_SEQ, TOTAL_REPORT_COUNT);
        }
    }
});
exports.processReportData = processReportData;
const startJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    yield lines_2.resetLine_status_api(models_1.M_ResetStatus());
    const getSchedule = yield header_1.readScdlHdr(models_1.M_GetSchedule());
    if (getSchedule.cursor) {
        lodash_1.default.each(getSchedule.cursor, (scdlHdr) => {
            const { SCHEDULE_ID, FREQUENCY_MIN, OPERATION, DB_COLUMN_NAMES, } = scdlHdr;
            if (!node_schedule_1.scheduledJobs[SCHEDULE_ID.toString()]) {
                let minorhour = FREQUENCY_MIN / 60;
                let rule = '';
                if (minorhour < 1) {
                    rule = `*/${FREQUENCY_MIN} * * * *`;
                }
                else {
                    let hour = Math.floor(minorhour);
                    if (hour === 24) {
                        hour = 0;
                        rule = `0 ${hour} * * *`;
                    }
                    else {
                        rule = `0 */${hour} * * *`;
                    }
                }
                node_schedule_1.scheduleJob(SCHEDULE_ID.toString(), rule, () => {
                    if ((OPERATION === "MERGE" && DB_COLUMN_NAMES) ||
                        OPERATION === "INSERT")
                        exports.runJob(scdlHdr, {
                            domain: getSchedule.domain,
                            password: getSchedule.password,
                            username: getSchedule.username,
                        });
                });
            }
            else {
                console.log(SCHEDULE_ID.toString(), ' schedule id is already running');
            }
        });
    }
});
exports.startJobs = startJobs;
const stopJobs = () => {
    lodash_1.default.each(node_schedule_1.scheduledJobs, job => {
        if (job.name !== process.env.MAIL_SCHEDULER_NAME) {
            job.cancel();
        }
    });
};
exports.stopJobs = stopJobs;
//# sourceMappingURL=job.js.map