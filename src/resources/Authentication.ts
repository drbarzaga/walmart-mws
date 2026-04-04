import moment from "moment";
import querystring from "querystring";
import type { HttpResult, WalmartHttpClient } from "../http/walmartFetchClient";
import { Token } from "../models/Token";
import { setStoredToken } from "../tokenState";

interface OAuthTokenBody {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface AuthenticationService {
  token: () => Promise<HttpResult<OAuthTokenBody>>;
}

export default function createAuthentication(
  httpClient: WalmartHttpClient,
  version: string
): AuthenticationService {
  return {
    token,
  };

  async function token(): Promise<HttpResult<OAuthTokenBody>> {
    const data = querystring.stringify({ grant_type: "client_credentials" });
    const response = await httpClient.post<OAuthTokenBody>(`${version}/token`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });
    const tok = new Token();
    tok.token = response.data.access_token;
    tok.expires_at = moment().add(response.data.expires_in / 60, "minutes");
    tok.type = response.data.token_type;
    setStoredToken(tok);
    return response;
  }
}
