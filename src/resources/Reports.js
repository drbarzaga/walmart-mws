module.exports = function(httpClient, version){
    let service = {
        getItemReport: getItemReport,
        getBuyBoxReport: getBuyBoxReport,
        getCapItemOptInFile: getCapItemOptInFile,
        getItemPerformanceReport: getItemPerformanceReport,
        getAvailableReconciliationReportDates: getAvailableReconciliationReportDates,
        getReconciliationReportToDownload: getReconciliationReportToDownload,
        getItemOverridesReport: getItemOverridesReport
    };

    return service;


    async function getItemReport(){
        try {
            throw new Error('Not implemented exception.');
        } catch (error) {
            throw error;
        }
    }

    async function getBuyBoxReport(){
        try {
            throw new Error('Not implemented exception.');
        } catch (error) {
            throw error;
        }
    }

    async function getCapItemOptInFile(){
        try {
            throw new Error('Not implemented exception.');
        } catch (error) {
            throw error;
        }
    }

    async function getItemPerformanceReport(){
        try {
            throw new Error('Not implemented exception.');
        } catch (error) {
            throw error;
        }
    }

    async function getAvailableReconciliationReportDates(){
        try {
            throw new Error('Not implemented exception.');
        } catch (error) {
            throw error;
        }
    }

    async function getItemOverridesReport(){
        try {
            throw new Error('Not implemented exception.');
        } catch (error) {
            throw error;
        }
    }
}