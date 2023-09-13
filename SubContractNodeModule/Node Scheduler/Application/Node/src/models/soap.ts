import { SOAP_API } from "../config/soap";
import { I_ReportArgsRes } from "../interfaces/soap";

export const M_ReportArgsSoap = (
  lastUpdatedDate: string,
  reportAbsolutePath: string
): I_ReportArgsRes => {
  return {
    password: SOAP_API.PASSWORD,
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
    userID: SOAP_API.USER_ID,
  };
};
