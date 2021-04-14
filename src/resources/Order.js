module.exports = function (httpClient, version) {
    let service = {
        getReleasedOrders: getReleasedOrders,
        getAll: getAll,
        acknowledge: acknowledge,
        get: get,
        cancel: cancel,
        refund: refund
    };
    return service;

    /**
     * Returns the released orders.
     * @param {Number} limit 
     */
    async function getReleasedOrders(limit = 100) {
        try {
            const response = await httpClient.get(`${version}/orders/released`, {
                params: {
                    limit: limit
                }
            });
            return response.data.list;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns all the orders.
     * @param {Number} limit 
     */
    async function getAll(limit = 100) {
        try {
            const response = await httpClient.get(`${version}/orders`, {
                params: {
                    limit: limit
                }
            });
            return response.data.list;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the given order.
     * @param {Number} purchaseOrderId  
     */
    async function get(purchaseOrderId) {
        try {
            const response = await httpClient.get(`${version}/orders/${purchaseOrderId}`);
            return response.data.order;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Mark the order as acknowledged in the marketplace.
     * @param {Number} purchaseOrderId 
     */
    async function acknowledge(purchaseOrderId) {
        try {
            const response = await httpClient.post(`${version}/orders/${purchaseOrderId}/acknowledge`);
            return response.data.order;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Cancel the given order.
     * @param {Number} purchaseOrderId  
     */
    async function cancel(purchaseOrderId) {
        try {
            const response = await httpClient.post(`${version}/orders/${purchaseOrderId}/cancel`);
            return response.data.orderCancellation;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Refund the given order.
     * @param {Number} purchaseOrderId  
     */
    async function refund(purchaseOrderId) {
        try {
            const response = await httpClient.post(`${version}/orders/${purchaseOrderId}/refund`);
            return response.data.orderRefund;
        } catch (error) {
            throw error;
        }
    }
}
