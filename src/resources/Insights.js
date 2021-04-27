module.exports = function(httpClient, version){
    let service = {
        unpublishedItems: unpublishedItems,
        topTrendingItems: topTrendingItems,
        unpublishedItemCounts:  unpublishedItemCounts
    };
    return service;

    /**
     * Get Unpublished Items
     */
    async function unpublishedItems(){
        try {
            const response = await httpClient.get(`${version}/insights/items/unpublished/items`);
            return response.data;    
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get Trending Item List
     * @param {Number} departmentId 
     * @param {Number} categoryId 
     * @param {Number} limit 
     * @param {Number} offset 
     * @param {Number} timeFrame 
     */
    async function topTrendingItems(departmentId, categoryId = null, limit = 20, offset = 0, timeFrame = 7){
        try {
            const response = await httpClient.get(`${version}/insights/items/trending`, {
                params: {
                    departmentId: departmentId,
                    categoryId: categoryId,
                    limit: limit,
                    offset: offset,
                    timeFrame: timeFrame
                }
            });
            return response.data;    
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get Count for Unpubished Item
     * @param {Date} fromDate 
     */
    async function unpublishedItemCounts(fromDate){
        try {
            const response = await httpClient.get(`${version}/insights/items/unpublished/counts`, {
                params: {
                    fromDate: fromDate
                }
            });
            return response.data;    
        } catch (error) {
            throw error;
        }
    }
}