export type HttpParams = Record<string, string | number | boolean | null | undefined>;

export interface HttpResult<T> {
  data: T;
  status: number;
}

export interface WalmartHttpClient {
  get<T>(path: string, init?: { params?: HttpParams }): Promise<HttpResult<T>>;
  post<T, B = unknown>(
    path: string,
    body?: B,
    init?: { params?: HttpParams; headers?: Record<string, string> }
  ): Promise<HttpResult<T>>;
  put<T>(
    path: string,
    body?: unknown,
    init?: { params?: HttpParams; headers?: Record<string, string> }
  ): Promise<HttpResult<T>>;
  delete<T>(
    path: string,
    init?: { params?: HttpParams; headers?: Record<string, string> }
  ): Promise<HttpResult<T>>;
}

export class WalmartHttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown
  ) {
    super(message);
    this.name = "WalmartHttpError";
  }
}

function joinBase(baseURL: string, path: string): string {
  const base = baseURL.replace(/\/$/, "");
  const p = path.replace(/^\//, "");
  return `${base}/${p}`;
}

function appendQuery(path: string, params?: HttpParams): string {
  if (!params) return path;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;
    search.append(key, String(value));
  }
  const qs = search.toString();
  return qs ? `${path}?${qs}` : path;
}

export interface CreateWalmartFetchClientOptions {
  baseURL: string;
  defaultHeaders: Record<string, string>;
  skipAccessToken: (path: string) => boolean;
  getAccessToken: () => Promise<string | null>;
}

export function createWalmartFetchClient(
  options: CreateWalmartFetchClientOptions
): WalmartHttpClient {
  const { baseURL, defaultHeaders, skipAccessToken, getAccessToken } = options;

  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
    init?: { params?: HttpParams; headers?: Record<string, string> }
  ): Promise<HttpResult<T>> {
    const pathWithQuery = appendQuery(path, init?.params);
    const url = joinBase(baseURL, pathWithQuery);

    const headers: Record<string, string> = { ...defaultHeaders };
    if (init?.headers) {
      Object.assign(headers, init.headers);
    }

    if (!skipAccessToken(path)) {
      const access = await getAccessToken();
      if (access != null) {
        headers["WM_SEC.ACCESS_TOKEN"] = access;
      }
    }

    let bodyInit: BodyInit | undefined;
    if (body !== undefined && body !== null) {
      if (typeof body === "string") {
        bodyInit = body;
      } else if (
        body instanceof ArrayBuffer ||
        (typeof Blob !== "undefined" && body instanceof Blob) ||
        (typeof FormData !== "undefined" && body instanceof FormData)
      ) {
        bodyInit = body as BodyInit;
      } else if (typeof body === "object") {
        const hasCt = Boolean(headers["Content-Type"] ?? headers["content-type"]);
        if (!hasCt) {
          headers["Content-Type"] = "application/json";
        }
        bodyInit = JSON.stringify(body);
      }
    }

    const res = await fetch(url, {
      method,
      headers,
      body: bodyInit,
    });

    const text = await res.text();
    let parsed: unknown;
    if (text.length === 0) {
      parsed = undefined;
    } else {
      try {
        parsed = JSON.parse(text) as unknown;
      } catch {
        parsed = text;
      }
    }

    if (!res.ok) {
      throw new WalmartHttpError(res.status, text, parsed);
    }

    return { data: parsed as T, status: res.status };
  }

  return {
    get: (path, init) => request("GET", path, undefined, init),
    post: (path, body, init) => request("POST", path, body, init),
    put: (path, body, init) => request("PUT", path, body, init),
    delete: (path, init) => request("DELETE", path, undefined, init),
  };
}
