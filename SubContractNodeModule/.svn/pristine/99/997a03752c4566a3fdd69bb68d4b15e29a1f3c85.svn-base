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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updScdlLine_status_api = exports.insScdlLine_api = void 0;
const db_package_1 = require("../../bundle/db-package");
const database_1 = require("../../services/database");
exports.insScdlLine_api = (binds) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.resultSetExecute(db_package_1.xxfnd_node_scheduler.ins_schdl_list, binds);
});
exports.updScdlLine_status_api = (binds) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.resultSetExecute(db_package_1.xxfnd_node_scheduler.upd_schdl_list_status, binds);
});
//# sourceMappingURL=lines.js.map