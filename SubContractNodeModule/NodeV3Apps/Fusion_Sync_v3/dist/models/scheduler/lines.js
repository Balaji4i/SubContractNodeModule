"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M_updScdlLine_status = exports.M_readScdParams = exports.M_insScdlLine = void 0;
const oracledb_1 = require("oracledb");
const M_insScdlLine = (scheduleId, tableName, seqNo) => {
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
        seq_no: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.NUMBER,
            val: seqNo
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
exports.M_insScdlLine = M_insScdlLine;
const M_readScdParams = (scheduleId) => {
    return {
        schedule_id: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.NUMBER,
            val: scheduleId,
        },
        params_count: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.NUMBER,
        },
        params: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.CURSOR,
        },
        already_running: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.NUMBER,
        },
        err_code: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        err_msg: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        }
    };
};
exports.M_readScdParams = M_readScdParams;
const M_updScdlLine_status = (schdl_list_id, status, err_msg, seqno, lastseq, recordCount) => {
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
        seq_no: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.NUMBER,
            val: seqno,
        },
        last_seq: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.STRING,
            val: lastseq,
        },
        record_count: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.NUMBER,
            val: recordCount,
        },
        err_msg: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.STRING,
            val: err_msg,
        },
    };
};
exports.M_updScdlLine_status = M_updScdlLine_status;
//# sourceMappingURL=lines.js.map