"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resp_success_200 = exports.Resp_created_201 = exports.Resp_err_403 = void 0;
const Resp_err_403 = (res, message) => {
    return res.status(403).json({ status: "validation failed", message });
};
exports.Resp_err_403 = Resp_err_403;
const Resp_created_201 = (res, result) => {
    res.status(201).json(result);
};
exports.Resp_created_201 = Resp_created_201;
const Resp_success_200 = (res, result = []) => {
    res.status(200).json(result);
};
exports.Resp_success_200 = Resp_success_200;
//# sourceMappingURL=util.js.map