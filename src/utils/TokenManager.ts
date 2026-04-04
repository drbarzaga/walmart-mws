import moment from "moment";
import queryString from "query-string";
import type { WalmartHttpClient } from "../http/walmartFetchClient";
import { Token } from "../models/Token";
import { getStoredToken, setStoredToken } from "../tokenState";

interface OAuthTokenBody {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface TokenManager {
  generateToken: () => Promise<Token>;
  getToken: () => Token | null;
  areTokenExpired: () => boolean;
}

export function createTokenManager(
  httpClient: WalmartHttpClient,
  version: string
): TokenManager {
  return {
    generateToken,
    getToken,
    areTokenExpired,
  };

  async function generateToken(): Promise<Token> {
    const data = queryString.stringify({ grant_type: "client_credentials" });
    const response = await httpClient.post<OAuthTokenBody>(`${version}/token`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });
    const token = new Token();
    token.token = response.data.access_token;
    token.expires_at = moment().add(response.data.expires_in / 60, "minutes");
    token.type = response.data.token_type;
    setStoredToken(token);
    return token;
  }

  function areTokenExpired(): boolean {
    const t = getStoredToken();
    if (t !== null && t.expires_at !== null) {
      return moment().diff(t.expires_at, "minutes") >= 0;
    }
    return true;
  }

  function getToken(): Token | null {
    return getStoredToken();
  }
}
