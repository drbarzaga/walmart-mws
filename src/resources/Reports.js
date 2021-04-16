module.exports = function (httpClient, version) {
    let service = {
        getAll: getAll,
        createReport: createReport,
        getReport: getReport,
        downloadReport: downloadReport
    };
    return service;

    /**
     * Fetches a list of all report requests.
     */
    async function getAll() {
        try {
            const response = await httpClient.get(`${version}/reports/reportRequests`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a new request for report by specifying the reportType and reportVersion.
     * @param {String} reportType
     * @param {String} reportVersion
     */
    async function createReport(reportType = "ITEM", reportVersion) {
        try {
            const response = await httpClient.post(`${version}/lagtime`, {
                params: {
                    reportType: reportType,
                    reportVersion: reportVersion
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetches status and other details of a report request by providing a requestID.
     * @param {Number} requestId
     */
    async function getReport(requestId) {
        try {
            const response = await httpClient.get(`${version}/reports/reportRequests/${requestId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetches URL to download a generated report.
     * @param {Number} requestId
     */
    async function downloadReport(requestId) {
        try {
            const response = await httpClient.get(`${version}/reports/downloadReport?requestId=${requestId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
