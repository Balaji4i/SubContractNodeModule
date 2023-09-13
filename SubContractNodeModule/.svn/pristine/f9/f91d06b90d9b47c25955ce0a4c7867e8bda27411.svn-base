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
exports.executeManyPlSql = exports.resultSetExecute = exports.simpleExecutePlSql = exports.close = exports.initialize = void 0;
const lodash_1 = __importDefault(require("lodash"));
const oracledb_1 = require("oracledb");
const database_1 = __importDefault(require("../config/database"));
let connectionPool;
// Initialize the database
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    connectionPool = yield oracledb_1.createPool(database_1.default);
});
exports.initialize = initialize;
// Closing the database
const close = () => __awaiter(void 0, void 0, void 0, function* () {
    if (connectionPool)
        yield connectionPool.close();
});
exports.close = close;
// Execute the query
const simpleExecutePlSql = (statement, binds = [], opts = {}) => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    opts.outFormat = oracledb_1.OUT_FORMAT_OBJECT;
    try {
        conn = yield connectionPool.getConnection();
        const result = yield conn.execute(statement, binds, opts);
        return result;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn)
            yield conn.close();
    }
});
exports.simpleExecutePlSql = simpleExecutePlSql;
const resultSetExecute = (statement, binds = [], opts = {}) => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    opts.resultSet = true;
    opts.outFormat = oracledb_1.OUT_FORMAT_OBJECT;
    try {
        conn = yield connectionPool.getConnection();
        const result = yield conn.execute(statement, binds, opts);
        let outBinds = {};
        yield Promise.all(lodash_1.default.chain(result.outBinds)
            .map((value, key) => __awaiter(void 0, void 0, void 0, function* () {
            if (typeof (value === null || value === void 0 ? void 0 : value.getRow) != "function")
                outBinds[key] = value;
            else {
                const row = yield value.getRows(5000);
                yield value.close();
                outBinds[key] = row;
            }
        }))
            .value());
        return outBinds;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn)
            yield conn.close();
    }
});
exports.resultSetExecute = resultSetExecute;
const executeManyPlSql = (statement, binds = [], opts = {}) => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        conn = yield connectionPool.getConnection();
        const result = yield conn.executeMany(statement, binds, opts);
        return result;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn)
            yield conn.close();
    }
});
exports.executeManyPlSql = executeManyPlSql;
//# sourceMappingURL=database.js.map