import { format } from "date-and-time";
import _ from "lodash";
import { scheduledJobs, scheduleJob } from "node-schedule";
import { pushReports } from ".";
import { I_singleCursorResp } from "../interfaces";
import { I_InsScdlLineRes } from "../interfaces/schedule/lines";
import { M_GetSchedule } from "../models";
import { M_insScdlLine, M_updScdlLine_status } from "../models/scheduler/lines";
import { M_ReportArgsSoap } from "../models/soap";
import { T_ScdlHdrRes } from "../types/schedule/header";
import { readScdlHdr } from "./scheduler/header";
import { insScdlLine_api, updScdlLine_status_api } from "./scheduler/lines";
import { getReportData } from "./soap";

export const runJob = async (scdlHdr: T_ScdlHdrRes) => {
  var scdlList: I_InsScdlLineRes | null;
  try {
    scdlList = await insScdlLine_api(
      M_insScdlLine(scdlHdr.SCHEDULE_ID, scdlHdr.DB_TABLE_NAME)
    );
    const reportAbsolutePath: string = `${scdlHdr.BI_REPORT_PATH}/${scdlHdr.BI_REPORT_NAME}.xdo`;
    const lastUpdate: string = format(
      scdlList.schedule_list[0].LAST_REFRESH_TIME,
      "MM-DD-YYYY HH:mm:ss"
    );
    // const lastUpdate: string = "06-14-2020 06:00:00"; // MM-dd-yyyy HH:mm:ss
    const reportData: any = await getReportData(
      M_ReportArgsSoap(lastUpdate, reportAbsolutePath),
      scdlHdr.SCHEDULE_ID.toString()
    );
    if (reportData?.DATA_DS?.G_1)
      pushReports(
        scdlHdr.DB_TABLE_NAME,
        scdlHdr.DB_COLUMN_NAMES,
        scdlList.table_structure,
        reportData.DATA_DS.G_1
      );
    updScdlLine_status_api(
      M_updScdlLine_status(
        scdlList.schedule_list[0].SCHEDULE_LIST_ID.toString(),
        "COMPLETED",
        null
      )
    );
  } catch (err) {
    console.log(err.message);
    if (scdlList!.schedule_list[0].SCHEDULE_LIST_ID.toString())
      updScdlLine_status_api(
        M_updScdlLine_status(
          scdlList!.schedule_list[0].SCHEDULE_LIST_ID.toString(),
          "ERROR",
          err.message
        )
      );
  }
};

export const startJobs = async () => {
  const getSchedule: I_singleCursorResp<T_ScdlHdrRes> = await readScdlHdr(
    M_GetSchedule()
  );
  if (getSchedule.cursor) {
    _.each(getSchedule.cursor, (scdlHdr: T_ScdlHdrRes) => {
      scheduleJob(
        scdlHdr.SCHEDULE_ID.toString(),
        `*/${scdlHdr.FREQUENCY_MIN} * * * *`,
        () => {
          runJob(scdlHdr);
        }
      );
    });
  }
};

export const stopJobs = async () => {
  _.each(scheduledJobs, (job) => {
    job.cancel();
  });
};
