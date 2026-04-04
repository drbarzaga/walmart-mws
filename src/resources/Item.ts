import type { WalmartHttpClient } from "../http/walmartFetchClient";

export interface ItemService {
  getItem: (sku: string) => Promise<unknown>;
  getAllItems: (
    nextCursor?: string | null,
    sku?: string | null,
    limit?: number,
    offset?: number,
    lifecycleStatus?: string | null,
    publishedStatus?: string | null
  ) => Promise<unknown>;
  getTaxonomy: (
    category: string,
    subcategory?: string | null,
    subcategoryName?: string | null,
    subcategoryId?: string | null
  ) => Promise<unknown>;
  retireItem: (sku: string) => Promise<unknown>;
  bulkRetireItem: (feedType: string, file: unknown) => Promise<unknown>;
}

export default function createItem(
  httpClient: WalmartHttpClient,
  version: string
): ItemService {
  return {
    getItem,
    getAllItems,
    getTaxonomy,
    retireItem,
    bulkRetireItem,
  };

  async function getItem(sku: string): Promise<unknown> {
    const response = await httpClient.get(`${version}/items`, {
      params: { sku },
    });
    const data = response.data as { ItemResponse?: unknown[] | null };
    return data.ItemResponse != null ? data.ItemResponse[0] : null;
  }

  async function getAllItems(
    nextCursor: string | null = null,
    sku: string | null = null,
    limit = 20,
    offset = 0,
    lifecycleStatus: string | null = null,
    publishedStatus: string | null = null
  ): Promise<unknown> {
    const response = await httpClient.get(`${version}/items`, {
      params: {
        nextCursor: nextCursor == null ? "*" : nextCursor,
        sku,
        limit,
        offset,
        lifecycleStatus,
        publishedStatus,
      },
    });
    return response.data;
  }

  async function getTaxonomy(
    category: string,
    subcategory: string | null = null,
    subcategoryName: string | null = null,
    subcategoryId: string | null = null
  ): Promise<unknown> {
    const response = await httpClient.get(`${version}/items/taxonomy`, {
      params: {
        category,
        subcategory,
        subcategoryName,
        subcategoryId,
      },
    });
    return response.data;
  }

  async function retireItem(sku: string): Promise<unknown> {
    const response = await httpClient.delete(`${version}/items`, {
      params: { sku },
    });
    return response.data;
  }

  async function bulkRetireItem(feedType: string, file: unknown): Promise<unknown> {
    const response = await httpClient.post(`${version}/feeds`, file, {
      params: { feedType },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });
    return response.data;
  }
}
