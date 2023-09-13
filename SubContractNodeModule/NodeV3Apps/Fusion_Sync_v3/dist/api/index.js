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
exports.executeMergeQuery = exports.pushReports = exports.getDynamicInsertQuery = exports.getDynamicMergeQuery = exports.readTableColumns = void 0;
const date_and_time_1 = require("date-and-time");
const lodash_1 = __importDefault(require("lodash"));
const db_package_1 = require("../bundle/db-package");
const models_1 = require("../models");
const database_1 = require("../services/database");
const readTableColumns = (binds) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.resultSetExecute(db_package_1.xxfnd_node_scheduler.get_table_columns, binds);
});
exports.readTableColumns = readTableColumns;
const getDynamicMergeQuery = (tableName, filterColumns, tableStructure, tableValues) => {
    let columnsString = "";
    let dynamicValue;
    let updateValue;
    let mergeQuery = "";
    let insertString = "";
    let insertFlag = false;
    let updateString = "";
    let updateFlag = false;
    let onCondition = "";
    let conditionFlag = false;
    let matchedQuery = "";
    let notMatchedQuery = "";
    lodash_1.default.each(tableStructure, (column, index) => {
        var _a;
        if (index) {
            columnsString += ",";
            if (insertFlag) {
                insertString += ",";
                insertFlag = false;
            }
            if (updateFlag) {
                updateString += ",";
                updateFlag = false;
            }
        }
        dynamicValue = `${((_a = tableValues[column.COLUMN_NAME]) === null || _a === void 0 ? void 0 : _a.toString())
            ? column.DATA_TYPE.includes("TIMESTAMP")
                ? `TO_TIMESTAMP('${date_and_time_1.format(new Date(tableValues[column.COLUMN_NAME]), "DD-MMM-YY HH:mm:ss.SS")}','DD-Mon-RR HH24:MI:SS.FF')`
                : column.DATA_TYPE.includes("DATE")
                    ? `TO_DATE('${date_and_time_1.format(new Date(tableValues[column.COLUMN_NAME]), "DD-MM-YYYY")}','DD-MM-YYYY')`
                    : column.DATA_TYPE.includes("VARCHAR2")
                        ? `'${tableValues[column.COLUMN_NAME]
                            .toString()
                            .replace(/'/g, "''")}'`
                        : `'${tableValues[column.COLUMN_NAME]}'`
            : null}`;
        if (!lodash_1.default.includes(filterColumns, column.COLUMN_NAME)) {
            updateValue = tableValues[column.COLUMN_NAME] ? tableValues[column.COLUMN_NAME].toString() === '' ? null : dynamicValue : column.COLUMN_NAME;
            updateString += `${column.COLUMN_NAME} = ${updateValue}`;
            updateFlag = true;
        }
        else {
            if (conditionFlag) {
                onCondition += " and ";
                conditionFlag = false;
            }
            onCondition += `${column.COLUMN_NAME} = ${dynamicValue}`;
            conditionFlag = true;
        }
        columnsString += column.COLUMN_NAME;
        insertString += dynamicValue;
        insertFlag = true;
    });
    if (updateString !== "")
        matchedQuery = `WHEN MATCHED THEN UPDATE SET ${updateString.replace(/,\s*$/, "")}`;
    if (insertString !== "")
        notMatchedQuery = `WHEN NOT MATCHED THEN INSERT (${columnsString.replace(/,\s*$/, "")}) VALUES (${insertString.replace(/,\s*$/, "")})`;
    mergeQuery += `MERGE INTO ${tableName.replace(/,\s*$/, "")} 
  USING DUAL ON (${onCondition.replace(/,\s*$/, "")}) 
  ${matchedQuery} 
  ${notMatchedQuery}`;
    return mergeQuery;
};
exports.getDynamicMergeQuery = getDynamicMergeQuery;
const getDynamicInsertQuery = (tableName, tableStructure, tableValues) => {
    let columnsString = "";
    let dynamicValue;
    let insertQuery = "";
    let insertString = "";
    let insertFlag = false;
    lodash_1.default.each(tableStructure, (column, index) => {
        var _a;
        if (index) {
            columnsString += ",";
            if (insertFlag) {
                insertString += ",";
                insertFlag = false;
            }
        }
        dynamicValue = `${((_a = tableValues[column.COLUMN_NAME]) === null || _a === void 0 ? void 0 : _a.toString())
            ? column.DATA_TYPE.includes("TIMESTAMP")
                ? `TO_TIMESTAMP('${date_and_time_1.format(new Date(tableValues[column.COLUMN_NAME]), "DD-MMM-YY HH:mm:ss.SS")}','DD-Mon-RR HH24:MI:SS.FF')`
                : column.DATA_TYPE.includes("DATE")
                    ? `TO_DATE('${date_and_time_1.format(new Date(tableValues[column.COLUMN_NAME]), "DD-MM-YYYY")}','DD-MM-YYYY')`
                    : column.DATA_TYPE.includes("VARCHAR2")
                        ? `'${tableValues[column.COLUMN_NAME]
                            .toString()
                            .replace(/'/g, "''")}'`
                        : `'${tableValues[column.COLUMN_NAME]}'`
            : null}`;
        columnsString += column.COLUMN_NAME;
        insertString += dynamicValue;
        insertFlag = true;
    });
    insertQuery += `INSERT INTO ${tableName}(${columnsString.replace(/,\s*$/, "")}) 
  VALUES (${insertString.replace(/,\s*$/, "")})`;
    return insertQuery;
};
exports.getDynamicInsertQuery = getDynamicInsertQuery;
const pushReports = (table, filterBy, tabStruct, operation, reportData) => {
    const dynamicQuery = lodash_1.default.map(reportData, (data) => {
        return {
            table_name: table,
            query: operation === "INSERT"
                ? exports.getDynamicInsertQuery(table, tabStruct, data)
                : exports.getDynamicMergeQuery(table, lodash_1.default.map(lodash_1.default.split(filterBy, ","), (value) => value.trim().toUpperCase()), tabStruct, data),
        };
    });
    lodash_1.default.chain(dynamicQuery)
        .chunk(1000)
        .map((bulkQuery) => exports.executeMergeQuery(bulkQuery, models_1.M_ExeMrgQryOptions()))
        .value();
};
exports.pushReports = pushReports;
const executeMergeQuery = (binds, opts) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.executeManyPlSql(db_package_1.xxfnd_node_scheduler.execute_merge_query, binds, opts);
});
exports.executeMergeQuery = executeMergeQuery;
//# sourceMappingURL=index.js.map