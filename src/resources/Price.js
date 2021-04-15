module.exports = function (httpClient, version) {
    let service = {
        updatePrice: updatePrice,
        updateBulkPrices: updateBulkPrices,
        setUpCapSKUAll: setUpCapSKUAll
    };
    return service;

    /**
     * Update the price for a given sku.
     * @param {String} sku 
     * @param {Pricing} pricing - please refer to this link for object definition https://developer.walmart.com/api/us/mp/price#operation/updatePrice
     */
    async function updatePrice(sku, pricing) {
        try {
            const response = await httpClient.put(`${version}/price`, {
                params: {
                    sku: sku,
                    pricing: pricing
                }
            });
            return response.data.ItemPriceResponse;
        } catch (error) {
            throw error;
        }
    }

    async function updateBulkPrices() {
        try {
            const response = await httpClient.put(`${version}/feeds?feedType=price`, {
                params: {
                    subsidyEnrolled: subsidyEnrolled,
                    subsidyPreference: subsidyPreference
                }
            });
            return response.data.martId;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update prices in bulk.
     * @param {String} path - need to pass the path of the XML/JSON file, check for reference (https://developer.walmart.com/api/us/mp/price#operation/priceBulkUploads)
     */
    async function setUpCapSKUAll(path) {
        try {
            const response = await httpClient.post(`${version}/cppreference`, fs.createReadStream(path), {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data.feedId;
        } catch (error) {
            throw error;
        }
    }
}
