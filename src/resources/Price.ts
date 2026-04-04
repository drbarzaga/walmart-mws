import type { WalmartHttpClient } from "../http/walmartFetchClient";

export interface PriceService {
  updateRegularPriceItem: () => Promise<never>;
  updateBulkPrices: () => Promise<never>;
  setUpCapSKU: () => Promise<never>;
  setUpCapSKUAll: () => Promise<never>;
}

export default function createPrice(
  _httpClient: WalmartHttpClient,
  _version: string
): PriceService {
  return {
    updateRegularPriceItem,
    updateBulkPrices,
    setUpCapSKU,
    setUpCapSKUAll,
  };

  async function updateRegularPriceItem(): Promise<never> {
    throw new Error("Not implemented exception.");
  }

  async function updateBulkPrices(): Promise<never> {
    throw new Error("Not implemented exception.");
  }

  async function setUpCapSKU(): Promise<never> {
    throw new Error("Not implemented exception.");
  }

  async function setUpCapSKUAll(): Promise<never> {
    throw new Error("Not implemented exception.");
  }
}
