import type { WalmartHttpClient } from "../http/walmartFetchClient";

export interface ReportsService {
  multipleReports: (type: string) => Promise<unknown>;
  availableReconReportDates: () => Promise<unknown>;
  reconReport: (reportDate: string) => Promise<unknown>;
}

export default function createReports(
  httpClient: WalmartHttpClient,
  version: string
): ReportsService {
  return {
    multipleReports,
    availableReconReportDates,
    reconReport,
  };

  async function multipleReports(type: string): Promise<unknown> {
    const response = await httpClient.get(`${version}/getRerport`, {
      params: { type },
    });
    return response.data;
  }

  async function availableReconReportDates(): Promise<unknown> {
    const response = await httpClient.get(
      `${version}/report/reconreport/availableReconFiles`
    );
    return response.data;
  }

  async function reconReport(reportDate: string): Promise<unknown> {
    const response = await httpClient.post(
      `${version}/report/reconreport/reconFile`,
      {
        params: {
          reportDate,
        },
      },
      {}
    );
    return response.data;
  }
}
