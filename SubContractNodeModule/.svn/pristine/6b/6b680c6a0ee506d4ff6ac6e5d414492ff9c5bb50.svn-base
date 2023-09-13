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
exports.getReportData = void 0;
const soap_1 = require("soap");
const util_1 = require("util");
const xml2js_1 = require("xml2js");
const getReportData = (credentials, reportArgs, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const soapURL = `https://${credentials.domain}/xmlpserver/services/PublicReportService?wsdl`;
        const client = yield soap_1.createClientAsync(soapURL);
        // client.setSecurity(new BasicAuthSecurity("", ""));
        const result = yield client.runReportAsync(reportArgs);
        const xml = Buffer.from(result[0].runReportReturn.reportBytes, "base64").toString();
        // fs.writeFile(`${id}.xml`, xml, function (err) {
        //   if (err) throw err;
        //   console.log("File is created successfully.");
        // });
        return util_1.promisify(xml2js_1.parseString)(xml);
    }
    catch (err) {
        throw err;
    }
});
exports.getReportData = getReportData;
//# sourceMappingURL=soap.js.map