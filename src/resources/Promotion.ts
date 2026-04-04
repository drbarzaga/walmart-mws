import type { WalmartHttpClient } from "../http/walmartFetchClient";

export interface PromotionService {
  getPromotionalPrices: (sku: string) => Promise<unknown>;
}

export default function createPromotion(
  httpClient: WalmartHttpClient,
  version: string
): PromotionService {
  return {
    getPromotionalPrices,
  };

  async function getPromotionalPrices(sku: string): Promise<unknown> {
    const response = await httpClient.get(`${version}/promo/sku/${sku}`);
    return response.data;
  }
}
