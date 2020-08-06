module.exports = function(httpClient, version){
    let service = {
        getItemInventory: getItemInventory,
        updateItemInventory: updateItemInventory
    };

    return service;

    
    /**
     * You can use this API to get the inventory for a given item.
     * @param {String} sku 
     */
    async function getItemInventory(sku){
        try {
            const response = await httpClient.get(`${version}/inventory`, {
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
     * Updates the inventory for a given item.
     * @param {String} sku 
     * @param {Object} data 
     */
    async function updateItemInventory(sku, data){
        try {
            const response = await httpClient.put(`${version}/inventory`, data, {
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