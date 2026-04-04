import type { WalmartHttpClient } from "../http/walmartFetchClient";

export interface InventoryService {
  getItemInventory: (sku: string) => Promise<unknown>;
  updateItemInventory: (sku: string, data: unknown) => Promise<unknown>;
}

export default function createInventory(
  httpClient: WalmartHttpClient,
  version: string
): InventoryService {
  return {
    getItemInventory,
    updateItemInventory,
  };

  async function getItemInventory(sku: string): Promise<unknown> {
    const response = await httpClient.get(`${version}/inventory`, {
      params: { sku },
    });
    return response.data;
  }

  async function updateItemInventory(sku: string, data: unknown): Promise<unknown> {
    const response = await httpClient.put(`${version}/inventory`, data, {
      params: { sku },
    });
    return response.data;
  }
}
