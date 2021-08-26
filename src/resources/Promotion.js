module.exports = function (httpClient, version) {
  let service = {
    getPromotionalPrices: getPromotionalPrices,
  };
  return service;

  /**
   * Retrieves a list of promotional prices for a single SKU.
   * @param {String} sku
   */
  async function getPromotionalPrices(sku) {
    try {
      const response = await httpClient.get(`${version}/promo/sku/${sku}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
