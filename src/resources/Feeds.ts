import type { WalmartHttpClient } from "../http/walmartFetchClient";

export interface FeedsService {
  getFeedStatus: (
    feedId: string,
    includeDetails?: boolean,
    limit?: number,
    offset?: number
  ) => Promise<unknown>;
  getAllFeedStatus: (
    feedId?: string | null,
    limit?: number,
    offset?: number
  ) => Promise<unknown>;
}

export default function createFeeds(
  httpClient: WalmartHttpClient,
  version: string
): FeedsService {
  return {
    getFeedStatus,
    getAllFeedStatus,
  };

  async function getFeedStatus(
    feedId: string,
    includeDetails = false,
    limit = 50,
    offset = 0
  ): Promise<unknown> {
    const response = await httpClient.get(`${version}/feeds`, {
      params: {
        feedId,
        includeDetails,
        limit,
        offset,
      },
    });
    const feed = (response.data as { results?: { feed?: unknown[] } })?.results?.feed;
    return feed != null ? feed[0] : null;
  }

  async function getAllFeedStatus(
    feedId: string | null = null,
    limit = 50,
    offset = 0
  ): Promise<unknown> {
    const response = await httpClient.get(`${version}/feeds`, {
      params: {
        feedId,
        limit,
        offset,
      },
    });
    return response.data;
  }
}
