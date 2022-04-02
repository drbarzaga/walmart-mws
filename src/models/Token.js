class Token {
  constructor() {
    this._token = null;
    this._type = null;
    this._expires_at = null;
  }

  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  get expires_at() {
    return this._expires_at;
  }

  set expires_at(value) {
    this._expires_at = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }
}

module.exports = Token;
