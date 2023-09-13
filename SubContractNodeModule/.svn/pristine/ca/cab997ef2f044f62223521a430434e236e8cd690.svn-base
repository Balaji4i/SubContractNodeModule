"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hrPool = {
    // user: process.env.DB_USER || "PAYROLL4I_FUSION",
    // password: process.env.DB_PASSWORD || "welcome",
    // connectString:
    //   process.env.DB_CONNECTION_STRING || "172.16.2.108:1522/orclpdb.4iapps.com",
    // user: process.env.DB_USER || "subcont_uat",
    // password: process.env.DB_PASSWORD || "subcont123",
    // connectString:
    //   process.env.DB_CONNECTION_STRING ||
    //   "144.21.67.79:1533/OMNIPDB1.606532292.oraclecloud.internal",
    _enableStats: true,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
    poolMin: process.env.DB_POOL_MIN ? parseInt(process.env.DB_POOL_MIN, 10) : 1,
    poolMax: process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX, 10) : 2,
    poolIncrement: process.env.DB_POOL_INC
        ? parseInt(process.env.DB_POOL_INC, 10)
        : 1,
    poolTimeout: 60 * 3,
    queueTimeout: 60000 * 60,
};
exports.default = hrPool;
//# sourceMappingURL=database.js.map