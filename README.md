## Walmart Marketplace SDK

This is a wrapper sdk around the [Walmart Marketplace API](https://developer.walmart.com). To used this sdk you will need an developer account with the **ClientId** and **ClientSecret** keys.

## Installation
```bash
npm install walmart-mws
```

## Configuration Using JavaScript
```js
var walmartMws = require('walmart-mws')(
    'WAL_CLIENT_ID',
    'WAL_SECRET_KEY', 
    'HOST', 
    'VERSION', 
    'NAME'
);
```

## Feeds

### Get Feed Status
**Request:**

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
feedId | String | <span style="color: red">**Yes**</span> |
includeDetails | Boolean | No | false
limit | Number | No | 50
offset | Number | No | 0
<br>

```js
try {
    const result = await walmartMws.feeds.getFeedStatus('5EF8AB43C8B949EAA6DFCDE98FCB3017@AQkBCgB');
} catch (error) {    
}
```

**Response:**
```js
{    
    feedDate:1596738014958
    feedId:'5EF8AB43C8B949EAA6DFCDE98FCB3017@AQkBCgB'
    feedSource:'SELLER'
    feedStatus:'PROCESSED'
    feedType:'inventory'
    itemDataErrorCount:1
    itemsFailed:1
    itemsProcessing:0
    itemsReceived:5118
    itemsSucceeded:5117
    itemSystemErrorCount:0
    itemTimeoutErrorCount:0
    modifiedDtm:1596738053539
    orgId:'8744aa2f-3a1f-4e37-8a99-1bef6567f92e'
    partnerId:'10000010921'
}
```

## Get All Feed Status
**Request:**

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
feedId | String | No
limit | Number | No | 50
offset | Number | No | 0
<br>

```js
try {
    const result = await walmartMws.feeds.getAllFeedStatus();
} catch (error) {    
}
```

**Response:**
```js
{
    totalResults: 2,
    offset: 0,
    limit: 50,
    results: {
        feed: [
            {
                feedDate:1596738014958
                feedId:'5EF8AB43C8B949EAA6DFCDE98FCB3017@AQkBCgB'
                feedSource:'SELLER'
                feedStatus:'PROCESSED'
                feedType:'inventory'
                itemDataErrorCount:1
                itemsFailed:1
                itemsProcessing:0
                itemsReceived:5118
                itemsSucceeded:5117
                itemSystemErrorCount:0
                itemTimeoutErrorCount:0
                modifiedDtm:1596738053539
                orgId:'8744aa2f-3a1f-4e37-8a99-1bef6567f92e'
                partnerId:'10000010921'
            },
            {
               ...
            }
        ]
    }
}
```

## Items

### Get All Items
**Request:**

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
nextCursor | String | No |
sku | String | No | 
limit | Number | No | 20
offset | Number | No | 0
lifecycleStatus | String | No |
publishedStatus | String | No |
<br>

```js
try {
    const result = await walmartMws.items.getAllItems();
} catch (error) {    
}
```
**Response:**
```js
{
    ItemResponse: [
        {
            gtin:'00192339211111'
            lifecycleStatus:'ACTIVE'
            mart:'WALMART_US'
            price:{currency: 'USD', amount: 20.21}
            productName:'Product Name'
            productType:'Product Type'
            publishedStatus:'UNPUBLISHED'
            shelf:["Home Page","Sports & Outdoors","Sports","Golf Equipment","Golf Clothing","Women's Golf Shorts"]
            sku:'192339252042022'
            unpublishedReasons:{
                reason: [
                    "Reason 1", "Reason 2"
                ]
            }
            upc:'192339252042022'
            wpid:'0RCN8JI3SKJY'
        },
        {
            ...
        }
    ],
    nextCursor:'AoE/GjBSQ1MyQjJHV1BWODBTRUxMRVJfT0ZGRVJERDhGODVEM0U2ODU0RDRDOEQ2MDAwQTI4MzQzMDhDMw=='
    totalItems:100
}
```

### Get Item Details
**Request:**

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
sku | String | **Yes** |
<br>

```js
try {
    const result = await walmartMws.items.getItem('192339252042022');
} catch (error) {    
}
```
**Response:**
```js
{
    gtin:'00192503120223'
    lifecycleStatus:'ACTIVE'
    mart:'WALMART_US',
    price: {
        amount:40.12
        currency:'USD'
    },
    productName:'Product name',
    productType:'Product type'
    publishedStatus:'PUBLISHED'
    shelf: [ 
        "Shelf1",
        "Shelf2",
    ],
    sku:'192503120222'
    upc:'192503120222'
    wpid:'3MH4ITZKQ2A3'
}
```

### Get Taxonomy
**Request:** 

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
category | String | <span style="color: red">**Yes**</span> |
subcategory | String | No |
subcategoryName | String | No |
subcategoryId | String | No |
<br>

```js
try {
    const result = await walmartMws.items.getTaxonomy('Search');
} catch (error) {    
}
```

### Retire Item
**Request:**

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
sku | String | <span style="color: red">**Yes**</span> |


<span style="color: red">**Note:**</span> You can't reuse the SKU or Product ID from a retired item. If you need to change the SKU or Product ID, see Product ID & SKU section.
<br>

```js
try {
    const result = await walmartMws.items.retireItem('97964898989');
} catch (error) {    
}
```

**Response:**
```js
{
  "sku": "97964898989",
  "message": "Thank you.  Your item has been submitted for retirement from Walmart Catalog.  Please note that it can take up to 48 hours for items to be retired from our catalog.",
  "additionalAttributes": null,
  "errors": null
}
```

### Bulk Item Retire
**Request:**

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
feedType | String | <span style="color: red">**Yes**</span> |
file | String | <span style="color: red">**Yes**</span> |

<br>

```js
try {
    const result = await walmartMws.items.bulkRetireItem('RETIRE_ITEM', file);
} catch (error) {    
}
```

```js
{
  feedId: "F129C19240844B97A3C6AD8F1A2C4997@AU8BAQA",
  additionalAttributes: null,
  errors: null
}
```

## Promotions

### Promotional Prices
**Request:**

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
sku | String | <span style="color: red">**Yes**</span> |
<br>

```js
try {
    const result = await walmartMws.promotions.getPromotionalPrices('97964787878');
} catch (error) {    
}
```

**Response:**
```js
{
    status: "OK",
    header: {
      headerAttributes: null
    },
    payload: {
      itemIdentifier: {
        sku: "97964787878"
      },
      pricingList: {
        pricing: [
          {
            currentPrice: {
              value: {
                value: null,
                currency: "USD",
                amount: 4.00
              },
              uomType: null,
              minValue: null,
              maxValue: null,
              perUnitValue: null,
              minUnitValue: null,
              maxUnitValue: null
            },
            currentPriceType: "REDUCED",
            comparisonPrice: {
              value: {
                value: null,
                currency: "USD",
                amount: 4.00
              },
              uomType: null,
              minValue: null,
              maxValue: null,
              perUnitValue: null,
              minUnitValue: null,
              maxUnitValue: null
            },
            comparisonPriceType: "BASE",
            savingsAmount: 0.00,
            savingsPercent: 0.00,
            priceDisplayCodes: {
              isRollback: false,
              isStrikethrough: true,
              isReducedPrice: true,
              isClearance: false,
              hidePriceForSOI: null,
              isEligibleForAssociateDiscount: null,
              submapType: null
            },
            effectiveDate: 1572774597943,
            expirationDate: 1575366597943,
            promoId: "ce9dfbce-4043-442c-8cb9-77d39d0f727f",
            processMode: null
          }
        ],
        replaceAll: false
      },
      maxSalesRetailPrice: null,
      minAdvtPrice: null,
      rebate: null
    }
  }
```


## Inventory

### Get Item Inventory
**Request:**

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
sku | String | <span style="color: red">**Yes**</span> |
<br>

```js
try {
    const result = await walmartMws.inventory.getItemInventory('192503120522');
} catch (error) {    
}
```
**Response:**
```js
{
    sku:'192503120522',
    quantity:{
        unit: 'EACH', 
        amount: 30
    }
}
```

### Update Item Inventory
**Request:**

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
sku | String | <span style="color: red">**Yes**</span> |
data| Object | <span style="color: red">**Yes**</span> |
<br>

```js
let data = {
    sku:'192503120522',
    quantity:{
        unit: 'EACH', 
        amount: 0
    }
};
try {
    const result = await walmartMws.inventory.updateItemInventory('192503120522', data);
} catch (error) {    
}
```
**Response:**
```js
{
    sku:'192503120522',
    quantity:{
        unit: 'EACH', 
        amount: 0
    }
}
```

## Dependencies

Package | Version
--- |:---:
[axios](https://www.npmjs.com/package/axios) | 0.19.2 
[moment](https://www.npmjs.com/package/moment) | 2.27.0
[querystring](https://www.npmjs.com/package/querystring) | 0.2.0

## Report Issue

[Open New Issue](https://github.com/drbarzaga/walmart-mws/issues/new)