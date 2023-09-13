"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M_ReportArgsSoap = void 0;
const M_ReportArgsSoap = (lastUpdatedDate, reportAbsolutePath, credential, params) => {
    var reportParams = { item: [] };
    params.forEach((data) => {
        var items = [];
        if (data.PARAM_VALUE === 'FETCH_TIME') {
            items.push(lastUpdatedDate);
        }
        else {
            let Array = data.PARAM_VALUE.split(',');
            Array.forEach((rmItems) => {
                items.push(rmItems);
            });
        }
        reportParams.item.push({
            name: data.PARAM_NAME,
            values: {
                item: items,
            },
        });
    });
    return {
        password: credential.password,
        reportRequest: {
            parameterNameValues: reportParams,
            reportAbsolutePath: reportAbsolutePath,
        },
        userID: credential.username,
    };
};
exports.M_ReportArgsSoap = M_ReportArgsSoap;
//# sourceMappingURL=soap.js.map