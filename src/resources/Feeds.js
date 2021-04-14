module.exports = function (httpClient, version) {
    let service = {
        getFeedStatus: getFeedStatus,
        getAllFeedStatus: getAllFeedStatus
    };
    return service;

    /**
     * Returns the feed status for a specified Feed ID.
     * @param {String} feedId 
     * @param {Boolean} includeDetails 
     * @param {Number} limit 
     * @param {Number} offset 
     */
    async function getFeedStatus(feedId, includeDetails = false, limit = 50, offset = 0) {
        try {
            const response = await httpClient.get(`${version}/feeds`, {
                params: {
                    feedId: feedId,
                    includeDetails: includeDetails,
                    limit: limit,
                    offset: offset
                }
            });
            return response.data.results.feed !== null ? response.data.results.feed[0] : null;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the feed statuses for all the specified Feed IDs.
     * @param {String} feedId
     * @param {Number} limit 
     * @param {Number} offset 
     */
    async function getAllFeedStatus(feedId = null, limit = 50, offset = 0) {
        try {
            const response = await httpClient.get(`${version}/feeds`, {
                params: {
                    feedId: feedId,
                    limit: limit,
                    offset: offset
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
