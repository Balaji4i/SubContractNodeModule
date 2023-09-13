"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M_InsErrLogOptions = exports.M_ExeMrgQryOptions = exports.M_GetTableColumns = exports.M_GetSchedule = void 0;
const oracledb_1 = require("oracledb");
exports.M_GetSchedule = () => {
    return {
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
};
exports.M_GetTableColumns = (table) => {
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
exports.M_ExeMrgQryOptions = () => {
    const opts = {
        bindDefs: {
            table_name: {
                dir: oracledb_1.BIND_INOUT,
                type: oracledb_1.STRING,
                maxSize: 200,
            },
            query: {
                dir: oracledb_1.BIND_INOUT,
                type: oracledb_1.STRING,
                maxSize: 10000,
            },
            err_code: {
                dir: oracledb_1.BIND_OUT,
                type: oracledb_1.STRING,
                maxSize: 200,
            },
            err_msg: {
                dir: oracledb_1.BIND_OUT,
                type: oracledb_1.STRING,
                maxSize: 200,
            },
        },
    };
    return opts;
};
exports.M_InsErrLogOptions = () => {
    const opts = {
        bindDefs: {
            table_name: {
                dir: oracledb_1.BIND_IN,
                type: oracledb_1.STRING,
                maxSize: 20,
            },
            query: {
                dir: oracledb_1.BIND_IN,
                type: oracledb_1.STRING,
                maxSize: 10000,
            },
            err_code: {
                dir: oracledb_1.BIND_IN,
                type: oracledb_1.STRING,
                maxSize: 10,
            },
            err_msg: {
                dir: oracledb_1.BIND_IN,
                type: oracledb_1.STRING,
                maxSize: 200,
            },
        },
    };
    return opts;
};
//# sourceMappingURL=index.js.map