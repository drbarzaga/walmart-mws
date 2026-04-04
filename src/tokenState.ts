import type { Token } from "./models/Token";

let storedToken: Token | null = null;

export function getStoredToken(): Token | null {
  return storedToken;
}

export function setStoredToken(token: Token | null): void {
  storedToken = token;
}
