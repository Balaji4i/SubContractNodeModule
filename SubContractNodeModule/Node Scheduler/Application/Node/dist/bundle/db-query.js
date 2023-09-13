"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_TAB_COLUMNS = void 0;
exports.GET_TAB_COLUMNS = `SELECT COLUMN_NAME, DATA_TYPE FROM USER_TAB_COLUMNS 
WHERE TABLE_NAME LIKE UPPER(:TABLE_NAME)`;
//# sourceMappingURL=db-query.js.map