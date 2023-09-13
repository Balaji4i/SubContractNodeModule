"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M_MailReq = void 0;
const oracledb_1 = require("oracledb");
const M_MailReq = () => {
    return {
        mailNotificationFlag: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        recordCount: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.NUMBER,
        },
        mailTo: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        mailFrom: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        mailSubject: {
            dir: oracledb_1.BIND_OUT,
            type: oracledb_1.STRING,
        },
        mailContent: {
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
exports.M_MailReq = M_MailReq;
//# sourceMappingURL=mail.js.map