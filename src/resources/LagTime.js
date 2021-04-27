module.exports = function(httpClient, version){
    let service = {
        lagTime: lagTime,
        updateLagTime: updateLagTime
    };
    return service;

    /**
     * Retrieval of Lag Time for an item with a given SKU.
     * @param {String} sku 
     */
    async function lagTime(sku){
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

    /**
     * Allows update of lag time for items in bulk.
     * @param {Object} lagTimeHeader
     * @param {Object} lagTime - for object reference check this link (https://developer.walmart.com/api/us/mp/lagtime#operation/updateLagTimeBulk)
     */
    async function updateLagTime(lagTimeHeader, lagTime){
        try {
            const response = await httpClient.get(`${version}/feeds?feedType=lagtime`, {
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
}