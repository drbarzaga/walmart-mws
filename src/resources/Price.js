module.exports = function(httpClient, version){
    let service = {
        updateRegularPriceItem: updateRegularPriceItem,
        updateBulkPrices: updateBulkPrices,
        setUpCapSKU: setUpCapSKU,
        setUpCapSKUAll: setUpCapSKUAll
    };
    return service;


    async function updateRegularPriceItem(){
        throw new Error('Not implemented exception.')
    }

    async function updateBulkPrices(){
        throw new Error('Not implemented exception.')
    }

    async function setUpCapSKU(){
        throw new Error('Not implemented exception.')
    }

    async function setUpCapSKUAll(){
        throw new Error('Not implemented exception.')
    }
}