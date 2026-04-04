import type { WalmartHttpClient } from "../http/walmartFetchClient";

export interface OrderService {
  getReleasedOrders: (limit?: number) => Promise<unknown>;
  getAll: (
    limit?: number,
    nextCursor?: string,
    createdStartDate?: string,
    createdEndDate?: string,
    productInfo?: string,
    shipNodeType?: string,
    sku?: string,
    customerOrderId?: string,
    purchaseOrderId?: string,
    fromExpectedShipDate?: string,
    toExpectedShipDate?: string,
    shippingProgramType?: string,
    replacementInfo?: string,
    orderType?: string
  ) => Promise<unknown>;
  get: (purchaseOrderId: string | number) => Promise<unknown>;
  acknowledge: (purchaseOrderId: string | number) => Promise<unknown>;
  cancel: (purchaseOrderId: string | number, orderLines: unknown) => Promise<unknown>;
  refund: (purchaseOrderId: string | number, orderLines: unknown) => Promise<unknown>;
  ship: (purchaseOrderId: string | number, orderLines: unknown) => Promise<unknown>;
}

export default function createOrder(
  httpClient: WalmartHttpClient,
  version: string
): OrderService {
  return {
    getReleasedOrders,
    getAll,
    get,
    acknowledge,
    cancel,
    refund,
    ship,
  };

  async function getReleasedOrders(limit = 100): Promise<unknown> {
    const response = await httpClient.get(`${version}/orders/released`, {
      params: { limit },
    });
    const data = response.data as { list?: unknown };
    return data.list;
  }

  async function getAll(
    limit = 100,
    nextCursor = "",
    createdStartDate = "",
    createdEndDate = "",
    productInfo = "false",
    shipNodeType = "",
    sku = "",
    customerOrderId = "",
    purchaseOrderId = "",
    fromExpectedShipDate = "",
    toExpectedShipDate = "",
    shippingProgramType = "",
    replacementInfo = "false",
    orderType = ""
  ): Promise<unknown> {
    const response = await httpClient.get(`${version}/orders`, {
      params: {
        limit,
        nextCursor,
        createdStartDate,
        createdEndDate,
        productInfo,
        shipNodeType,
        sku,
        customerOrderId,
        purchaseOrderId,
        fromExpectedShipDate,
        toExpectedShipDate,
        shippingProgramType,
        replacementInfo,
        orderType,
      },
    });
    const data = response.data as { list?: unknown };
    return data.list;
  }

  async function get(purchaseOrderId: string | number): Promise<unknown> {
    const response = await httpClient.get(`${version}/orders/${purchaseOrderId}`);
    const data = response.data as { order?: unknown };
    return data.order;
  }

  async function acknowledge(purchaseOrderId: string | number): Promise<unknown> {
    const response = await httpClient.post(
      `${version}/orders/${purchaseOrderId}/acknowledge`
    );
    const data = response.data as { order?: unknown };
    return data.order;
  }

  async function cancel(
    purchaseOrderId: string | number,
    orderLines: unknown
  ): Promise<unknown> {
    const response = await httpClient.post(
      `${version}/orders/${purchaseOrderId}/cancel`,
      { orderLines }
    );
    const data = response.data as { orderCancellation?: unknown };
    return data.orderCancellation;
  }

  async function refund(
    purchaseOrderId: string | number,
    orderLines: unknown
  ): Promise<unknown> {
    const response = await httpClient.post(
      `${version}/orders/${purchaseOrderId}/refund`,
      { orderLines }
    );
    const data = response.data as { orderRefund?: unknown };
    return data.orderRefund;
  }

  async function ship(
    purchaseOrderId: string | number,
    orderLines: unknown
  ): Promise<unknown> {
    const response = await httpClient.post(
      `${version}/orders/${purchaseOrderId}/shipping`,
      { orderLines }
    );
    const data = response.data as { orderRefund?: unknown };
    return data.orderRefund;
  }
}
