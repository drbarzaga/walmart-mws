module.exports = function(httpClient, version) {
    let service = {
        deleteSubscription: deleteSubscription,
        updateSubscription: updateSubscription,
        testNotification: testNotification,
        eventTypes: eventTypes,
        allSubscriptions: allSubscriptions,
        createSubscription: createSubscription
    }

    return service;


    async function deleteSubscription () {
        // TODO
    }

    async function updateSubscription () {
        // TODO
    }

    async function testNotification () {
        // TODO
    }

    async function eventTypes () {
        // TODO
    }

    async function allSubscriptions () {
        // TODO
    }

    /**
     * This API is used to create subscription for notification of an event by selecting an event type, event version, resource name, and providing event URL. 
     * One or more than one events can be subscribed for notifications in one subscription request.
     * 
     * @param {string} eventType Event that you want to subscribe to. For all allowed eventType(s) see Event Payload section or use GET Event Types API
     * @param {string} eventVersion Version of the specific event type. For all eventVersion(s) for each eventType, see Event Payload section or use GET Event Types API
     * @param {string} resourceName Delegated access scope that event type is mapped to. For all allowed resourceName(s) for each eventType, see Event Payload section or use GET Event Types API
     * @param {string} eventUrl Destination URL where notification will be received by seller
     * @param {string} status Status of the subscription. Allowed values are ACTIVE or INACTIVE. To create subscription, use status = ACTIVE. Notification will be triggered only if subscription is in ACTIVE status
     */
    async function createSubscription (eventType, eventVersion, resourceName, eventUrl, status) {
        // TODO
    }
}