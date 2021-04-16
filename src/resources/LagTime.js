module.exports = function (httpClient, version) {
    let service = {
        updateLagTime: updateLagTime,
        lagTime: lagTime
    };
    return service;

    /**
     * Allows the update of lag time for items in bulk.
     * @param {LagTimeHeader} lagTimeHeader - please refer to this link for object definition (https://developer.walmart.com/api/us/mp/lagtime#operation/updateLagTimeBulk)
     * @param {LagTime} lagTime  - please refer to this link for object definition (https://developer.walmart.com/api/us/mp/lagtime#operation/updateLagTimeBulk)
     */
    async function updateLagTime(lagTimeHeader, lagTime) {
        try {
            const response = await httpClient.post(`${version}/feeds?feedType=lagtime`, {
                params: {
                    lagTimeHeader: lagTimeHeader,
                    lagTime: lagTime
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the feed statuses for all the specified Feed IDs.
     * @param {String} sku
     */
    async function lagTime(sku) {
        try {
            const response = await httpClient.get(`${version}/lagtime`, {
                params: {
                    sku: sku
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
