module.exports = function(httpClient, version){
    let service = {
        getItem: getItem,
        getAllItems: getAllItems,
        getTaxonomy: getTaxonomy,
        retireItem: retireItem,
        bulkRetireItem: bulkRetireItem
    };
    return service;

    /**
     * Retrieves an item and displays the item details
     * @param {String} sku An arbitrary alphanumeric unique ID
     */
    async function getItem(sku){
        try {
            const response = await httpClient.get(`${version}/items`, {
                params: {
                    sku: sku
                }
            });
            return response.data.ItemResponse !== null ? response.data.ItemResponse[0] :null;;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param {String} nextCursor Used for pagination when more than 200 items are retrieved. The nextCursor value of the response includes a link to another GET call which retrieves the next page of results.
     * @param {String} sku An arbitrary alphanumeric unique ID
     * @param {Number} limit The number of entities to be returned. Cannot be more than 20.
     * @param {Number} offset The object response to the starting number, where 0 is the first entity available for request. Maximum 1000.
     * @param {String} lifecycleStatus The lifecycle status of an item describes where the item listing is in the overall lifecycle. Examples of allowed values are ACTIVE , ARCHIVED, RETIRED.
     * @param {String} publishedStatus The published status of an item describes where the item is in the submission process. Examples of allowed values are PUBLISHED, UNPUBLISHED
     */
    async function getAllItems(nextCursor=null, sku = null, limit = 20, offset = 0,lifecycleStatus = null, publishedStatus = null){
        try {
            const response = await httpClient.get(`${version}/items`, {
                params: {
                    nextCursor: nextCursor,
                    sku: sku,
                    limit: limit,
                    offset: offset,
                    lifecycleStatus: lifecycleStatus,
                    publishedStatus: publishedStatus
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    /**
     * The Taxonomy API exposes the category taxonomy that Walmart.com uses to categorize items. It describes the Departments, Categories, and Subcategories levels available on Walmart.com. You can specify the exact category as a parameter when using any of the following APIs:
     * Search
     * Data feeds
     * Special feeds, to includePre-order, Best Sellers, Rollbacks, Clearance, and Special Buys
     * For example, you can restrict the Search API to search within a category by supplying the ID through the taxonomy. Similarly, you can use the Feed API to download category-specific feeds by specifying a category ID
     * @param {*} category 
     * @param {*} subcategory 
     * @param {*} subcategoryName 
     * @param {*} subcategoryId 
     */
    async function getTaxonomy(category, subcategory = null, subcategoryName = null, subcategoryId = null){
        try {
            const response = await httpClient.get(`${version}/items/taxonomy`, {
                params: {
                    category:category,
                    subcategory: subcategory,
                    subcategoryName: subcategoryName,
                    subcategoryId: subcategoryId
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Completely deactivates and unpublishes an item from the site.
     * Retired items are not displayed on Walmart.com, but their content stays intact in our system. You can republish an item by providing future discontinue date for the item.
     * @param {String} sku An arbitrary alphanumeric unique ID
     */
    async function retireItem(sku){
        try {
            const response = await httpClient.delete(`${version}/items`, {
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
     * Completely deactivates and unpublishes items in bulk from the site.
     * @param {String} feedType The feed type
     * @param {String} file 
     */
    async function bulkRetireItem(feedType , file){
        try {
            const response = await httpClient.post(`${version}/feeds`,file, {
                params: {
                    feedType: feedType
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
				    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}