"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hrPool = {
    user: process.env.DB_USER || "xxoando",
    password: process.env.DB_PASSWORD || "Oao_Tst_321",
    connectString: process.env.DB_CONNECTION_STRING ||
        "130.61.54.104:1521/oaodbtst_pdb1.sub08071802371.oandopaasvcn.oraclevcn.com",
    poolMin: process.env.DB_POOL_MIN ? parseInt(process.env.DB_POOL_MIN, 10) : 1,
    poolMax: process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX, 10) : 2,
    poolIncrement: process.env.DB_POOL_INC
        ? parseInt(process.env.DB_POOL_INC, 10)
        : 1,
};
exports.default = hrPool;
//# sourceMappingURL=database.js.map