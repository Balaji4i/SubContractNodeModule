"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M_updScdlLine_status = exports.M_insScdlLine = void 0;
const oracledb_1 = require("oracledb");
exports.M_insScdlLine = (scheduleId, tableName) => {
    return {
        schedule_id: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.NUMBER,
            val: scheduleId,
        },
        table_name: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.STRING,
            val: tableName,
        },
        err_code: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        err_msg: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        schedule_list: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.CURSOR,
        },
        table_structure: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.CURSOR,
        },
    };
};
exports.M_updScdlLine_status = (schdl_list_id, status, err_msg) => {
    return {
        schdl_list_id: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.STRING,
            val: schdl_list_id,
        },
        status: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.STRING,
            val: status,
        },
        err_msg: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.STRING,
            val: err_msg,
        },
    };
};
//# sourceMappingURL=lines.js.map