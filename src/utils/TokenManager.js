const moment = require('moment');
const querystring = require('query-string');
const Token = require('../models/Token');

module.exports = function(httpClient, version){
    let manager = {
		generateToken: generateToken,
		getToken: getToken,
		areTokenExpired: areTokenExpired
    };
	return manager;
	
	async function generateToken(){
		try {            			
			let data  = querystring.stringify({ grant_type: 'client_credentials' });
			const response = await httpClient.post(`${version}/token`,data, { headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			}});
			let token = new Token();
            token._token = response.data.access_token;
            token.expires_at = moment().add(response.data.expires_in/60, 'minutes');
            token.type = response.data.token_type;
            global.token = token;
			return token;       
		} catch (error) {
			throw error;
		}
	}

	function areTokenExpired(){
        if(global.token !== null)
            return moment().diff(global.token._expires_at, 'minutes') >= 0;
        return true;    
	}

	function getToken(){
		return global.token;
	}
}