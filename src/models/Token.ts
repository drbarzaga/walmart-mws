import type { Moment } from "moment";

export class Token {
  private _token: string | null = null;
  private _type: string | null = null;
  private _expires_at: Moment | null = null;

  get token(): string | null {
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
  }

  get expires_at(): Moment | null {
    return this._expires_at;
  }

  set expires_at(value: Moment | null) {
    this._expires_at = value;
  }

  get type(): string | null {
    return this._type;
  }

  set type(value: string | null) {
    this._type = value;
  }
}
