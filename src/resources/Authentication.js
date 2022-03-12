const moment = require("moment");
const querystring = require("querystring");
const Token = require("../models/Token");
require("../models/Token");

let Authentication = function (httpClient, version) {
  let service = {
    token: token,
  };
  return service;

  async function token() {
    try {
      let data = querystring.stringify({ grant_type: "client_credentials" });
      const response = await httpClient.post(`${version}/token`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      let token = new Token();
      token._token = response.data.access_token;
      token.expires_at = moment().add(response.data.expires_in / 60, "minutes");
      token.type = response.data.token_type;
      global.token = token;
      return response;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Authentication;
