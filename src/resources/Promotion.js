module.exports = function(httpClient, version){
    let service = {
        getPromotionalPrices: getPromotionalPrices,
        updatePromotionalPrice: updatePromotionalPrice
    };
    return service;

    /**
     * Retrieves a list of promotional prices for a single SKU.
     * @param {String} sku 
     */
    async function getPromotionalPrices(sku){
        try {
            const response = await httpClient.get(`${version}/promo/sku/${sku}`);
            return response.data;    
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates the promotional price.
     * @param {Boolean} promo The promotional price. Set to 'true' in order to retrieve promotional prices
     * @param {Object} data Body for Promotional Pricing, Delete
     */
    async function updatePromotionalPrice(promo, data){
        try {
            const response = await httpClient.put(`${version}/price`, data, {
                params: {
                    promo: promo
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}