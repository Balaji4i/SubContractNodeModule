import { createClientAsync } from "soap";
import { promisify } from "util";
import { parseString } from "xml2js";
import { SOAP_API } from "../config/soap";
import { I_ReportArgsRes } from "../interfaces/soap";
import { T_CreateClientAsync, T_RunReportAsync } from "../types/soap";

export const getReportData = async (
  reportArgs: I_ReportArgsRes,
  id: string
): Promise<any> => {
  const client: T_CreateClientAsync = await createClientAsync(SOAP_API.URL);
  const result: T_RunReportAsync[] = await client.runReportAsync(reportArgs);
  const xml: string = Buffer.from(
    result[0].runReportReturn.reportBytes,
    "base64"
  ).toString();

  // fs.writeFile(`${id}.xml`, xml, function (err) {
  //   if (err) throw err;
  //   console.log("File is created successfully.");
  // });

  return promisify(parseString)(xml);
};
