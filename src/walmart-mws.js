require('./global');
const axios = require('axios');
let httpClient = null;

module.exports = function (clientId, secretKey, version, name, prod_env) { // Initialize httpClient custom Axios Instance for WMS
    httpClient = axios.create({
        baseURL: prod_env ? 'https://marketplace.walmartapis.com/' : 'https://sandbox.walmartapis.com/',
        headers: {
            'WM_SVC.NAME': name,
            'WM_QOS.CORRELATION_ID': uuid(),
            'Authorization': `Basic ${
                base_64(`${clientId}:${secretKey}`)
            }`
        }
    });

    // Token Manager
    const tokenManager = require('./utils/TokenManager')(httpClient, version);

    // Intercept every request
    httpClient.interceptors.request.use(async (config) => {
        if (config.url.includes('token')) {
            return config;
        }
        let token = tokenManager.getToken();
        if (token === null || tokenManager.areTokenExpired()) {
            token = await tokenManager.generateToken();
        }
        Object.assign(config.headers, {
                'WM_SEC.ACCESS_TOKEN': `${
                token.token
            }`
        });
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    let wms = {};
    Object.assign(wms, {
        auth: require('./resources/Authentication')(httpClient, version),
        feeds: require('./resources/Feeds')(httpClient, version),
        items: require('./resources/Item')(httpClient, version),
        inventory: require('./resources/Inventory')(httpClient, version),
        orders: require('./resources/Order')(httpClient, version)
    })
    return wms;
}
