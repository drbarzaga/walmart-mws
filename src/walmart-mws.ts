import createAuthentication, {
  type AuthenticationService,
} from "./resources/Authentication";
import createFeeds, { type FeedsService } from "./resources/Feeds";
import createInventory, { type InventoryService } from "./resources/Inventory";
import createItem, { type ItemService } from "./resources/Item";
import createOrder, { type OrderService } from "./resources/Order";
import createPrice, { type PriceService } from "./resources/Price";
import createPromotion, { type PromotionService } from "./resources/Promotion";
import createReports, { type ReportsService } from "./resources/Reports";
import { createWalmartFetchClient } from "./http/walmartFetchClient";
import { base64Encode, uuid } from "./utils/encoding";
import { createTokenManager, type TokenManager } from "./utils/TokenManager";

function createWalmartMws(
  clientId: string,
  secretKey: string,
  host: string,
  version: string,
  name: string
): createWalmartMws.WalmartMwsClient {
  const ctx: { tokenManager?: TokenManager } = {};

  const httpClient = createWalmartFetchClient({
    baseURL: host,
    defaultHeaders: {
      "WM_SVC.NAME": name,
      "WM_QOS.CORRELATION_ID": uuid(),
      Authorization: `Basic ${base64Encode(`${clientId}:${secretKey}`)}`,
    },
    skipAccessToken: (path) => path.includes("token"),
    getAccessToken: async () => {
      const tm = ctx.tokenManager!;
      let token = tm.getToken();
      if (token === null || tm.areTokenExpired()) {
        token = await tm.generateToken();
      }
      return token.token ?? null;
    },
  });

  ctx.tokenManager = createTokenManager(httpClient, version);

  return {
    auth: createAuthentication(httpClient, version),
    feeds: createFeeds(httpClient, version),
    items: createItem(httpClient, version),
    inventory: createInventory(httpClient, version),
    orders: createOrder(httpClient, version),
    price: createPrice(httpClient, version),
    promotions: createPromotion(httpClient, version),
    reports: createReports(httpClient, version),
  };
}

/* eslint-disable @typescript-eslint/no-namespace -- fusión con export = para compat. CJS */
namespace createWalmartMws {
  export interface WalmartMwsClient {
    auth: AuthenticationService;
    feeds: FeedsService;
    items: ItemService;
    inventory: InventoryService;
    orders: OrderService;
    price: PriceService;
    promotions: PromotionService;
    reports: ReportsService;
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

export = createWalmartMws;
