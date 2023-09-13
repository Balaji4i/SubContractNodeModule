"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M_ReportArgsSoap = void 0;
const soap_1 = require("../config/soap");
exports.M_ReportArgsSoap = (lastUpdatedDate, reportAbsolutePath) => {
    return {
        password: soap_1.SOAP_API.PASSWORD,
        reportRequest: {
            parameterNameValues: {
                item: {
                    name: "p_last_update_date",
                    values: {
                        item: lastUpdatedDate,
                    },
                },
            },
            reportAbsolutePath: reportAbsolutePath,
        },
        userID: soap_1.SOAP_API.USER_ID,
    };
};
//# sourceMappingURL=soap.js.map