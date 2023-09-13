"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M_ResetStatus = exports.M_ExeMrgQryOptions = exports.M_GetTableColumns = exports.M_GetSchedule = void 0;
const oracledb_1 = require("oracledb");
const M_GetSchedule = () => {
    return {
        cursor: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.CURSOR,
        },
        domain: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        username: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        password: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        err_code: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        err_msg: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
    };
};
exports.M_GetSchedule = M_GetSchedule;
const M_GetTableColumns = (table) => {
    const binds = {
        table_name: {
            dir: oracledb_1.BIND_IN,
            type: oracledb_1.STRING,
            val: table,
        },
        cursor: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.CURSOR,
        },
        err_code: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        err_msg: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
    };
    return binds;
};
exports.M_GetTableColumns = M_GetTableColumns;
const M_ExeMrgQryOptions = () => {
    const opts = {
        bindDefs: {
            table_name: {
                dir: oracledb_1.BIND_INOUT,
                type: oracledb_1.STRING,
                maxSize: 2000,
            },
            query: {
                dir: oracledb_1.BIND_INOUT,
                type: oracledb_1.STRING,
                maxSize: 20000,
            },
            err_code: {
                dir: oracledb_1.BIND_OUT,
                type: oracledb_1.STRING,
                maxSize: 2000,
            },
            err_msg: {
                dir: oracledb_1.BIND_OUT,
                type: oracledb_1.STRING,
                maxSize: 2000,
            },
        },
    };
    return opts;
};
exports.M_ExeMrgQryOptions = M_ExeMrgQryOptions;
const M_ResetStatus = () => {
    return {
        err_code: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        err_msg: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
    };
};
exports.M_ResetStatus = M_ResetStatus;
//# sourceMappingURL=index.js.map