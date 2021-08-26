module.exports = function (httpClient, version) {
    let service = {
        getReleasedOrders: getReleasedOrders,
        getAll: getAll,
        acknowledge: acknowledge,
        get: get,
        cancel: cancel,
        refund: refund,
        ship: ship
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
     * @param {String} nextCursor 
     * @param {String} createdStartDate 
     * @param {String} createdEndDate 
     * @param {String} productInfo 
     * @param {String} shipNodeType 
     * @param {String} sku 
     * @param {String} customerOrderId 
     * @param {String} purchaseOrderId 
     * @param {String} fromExpectedShipDate 
     * @param {String} toExpectedShipDate 
     * @param {String} shippingProgramType 
     * @param {String} replacementInfo 
     * @param {String} orderType 
     */
    async function getAll(limit = 100, nextCursor = '', createdStartDate = '', createdEndDate = '', productInfo = 'false', shipNodeType = '', sku = '', customerOrderId = '', purchaseOrderId = '', fromExpectedShipDate = '', toExpectedShipDate = '', shippingProgramType = '', replacementInfo = 'false', orderType = '') {
        try {
            const response = await httpClient.get(`${version}/orders`, {
                params: {
                    limit: limit,
                    nextCursor: nextCursor,
                    createdStartDate: createdStartDate,
                    createdEndDate: createdEndDate,
                    productInfo: productInfo,
                    shipNodeType: shipNodeType,
                    sku: sku,
                    customerOrderId: customerOrderId,
                    purchaseOrderId: purchaseOrderId,
                    fromExpectedShipDate: fromExpectedShipDate,
                    toExpectedShipDate: toExpectedShipDate,
                    shippingProgramType: shippingProgramType,
                    replacementInfo: replacementInfo,
                    orderType: orderType
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
     * @param {Array} orderLines - please refer to this link for object definition (https://developer.walmart.com/api/us/mp/orders#operation/cancelOrderLines)
     */
    async function cancel(purchaseOrderId, orderLines) {
        try {
            const response = await httpClient.post(`${version}/orders/${purchaseOrderId}/cancel`, {orderLines: orderLines});
            return response.data.orderCancellation;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Refund the given order.
     * @param {Number} purchaseOrderId  
     * @param {Array} orderLines - please refer to this link for object definition (https://developer.walmart.com/api/us/mp/orders#operation/refundOrderLines)
     */
    async function refund(purchaseOrderId, orderLines) {
        try {
            const response = await httpClient.post(`${version}/orders/${purchaseOrderId}/refund`, {orderLines: orderLines});
            return response.data.orderRefund;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Ship the given order.
     * @param {Number} purchaseOrderId  
     * @param {Array} orderLines - please refer to this link for object definition (https://developer.walmart.com/api/us/mp/orders#operation/shippingUpdates)
     */
    async function ship(purchaseOrderId, orderLines) {
        try {
            const response = await httpClient.post(`${version}/orders/${purchaseOrderId}/shipping`, {orderLines: orderLines});
            return response.data.orderRefund;
        } catch (error) {
            throw error;
        }
    }
}
