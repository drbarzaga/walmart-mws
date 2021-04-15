module.exports = function (httpClient, version) {
    let service = {
        multipleReports: multipleReports,
        availableReconReportDates: availableReconReportDates,
        reconReport: reconReport
    };
    return service;

    /**
     * All the information associated with Seller's items that are set up.
     * @param {String} type  ["item", "buybox", "cpa", "shippingProgram", "shippingConfiguration", "itemPerformance", "returnOverrides", "promo"]
     */
    async function multipleReports(type) {
        try {
            const response = await httpClient.get(`${version}/getRerport`, {
                params: {
                    type: type
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * All the available Marketplace reconciliation report dates for the Seller.
     */

    async function availableReconReportDates() {
        try {
            const response = await httpClient.get(`${version}/report/reconreport/availableReconFiles`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Seller can download reconciliation report for a specific date.
     * @param {String} reportDate
     */
    async function reconReport(reportDate) {
        try {
            const response = await httpClient.post(`${version}/report/reconreport/reconFile`, {
                params: {
                    reportDate: reportDate
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
