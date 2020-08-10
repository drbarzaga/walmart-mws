## Walmart Marketplace SDK

This is a wrapper sdk around the [Walmart Marketplace API](https://developer.walmart.com). To used this sdk you will need an developer account with the **ClientId** and **ClientSecret** keys.

## Table of Contents

- [Installation](#installation)
- [Configuraion](#configuration)
- [Feeds](#feeds)
- [Items](#items)
- [Promotions](#promotions)
- [Inventory](#inventory)
- [Dependencies](#dependencies)
- [Next Features](#next-features)
- [Issues](#issues)
- [License](#license)
- [Donation](#donation)

## Installation
```bash
npm install walmart-mws
```

## Configuration
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
Returns the feed status for a specified Feed ID.

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
feedId | String | <span style="color: red">**Yes**</span> |
includeDetails | Boolean | No | false
limit | Number | No | 50
offset | Number | No | 0
<br>

**Usage:**

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

### Get All Feed Status
Returns the feed statuses for all the specified Feed IDs.

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
feedId | String | No
limit | Number | No | 50
offset | Number | No | 0
<br>

**Usage:**

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
Displays a list of all items.

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

**Usage:**

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
Retrieves an item and displays the item details

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
sku | String | **Yes** |
<br>

**Usage:**

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

The Taxonomy API exposes the category taxonomy that Walmart.com uses to categorize items. It describes the Departments, Categories, and Subcategories levels available on Walmart.com. You can specify the exact category as a parameter when using any of the following APIs:
 - Search
 - Data feeds
 - Special feeds, to includePre-order, Best Sellers, Rollbacks, Clearance, and Special Buys

For example, you can restrict the Search API to search within a category by supplying the ID through the taxonomy. Similarly, you can use the Feed API to download category-specific feeds by specifying a category ID.

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
category | String | <span style="color: red">**Yes**</span> |
subcategory | String | No |
subcategoryName | String | No |
subcategoryId | String | No |
<br>

**Usage:**

```js
try {
    const result = await walmartMws.items.getTaxonomy('Search');
} catch (error) {    
}
```

**Response:**
```js
{
    status: "SUCCESS",
    payload: [
        {
            category: "Animal",
            subcategory: [
                {
                    subCategoryName: "Animal Accessories",
                    subCategoryId: "559c5d924fff3d64de18bf45"
                },
                {
                    subCategoryName: "Animal Food",
                    subCategoryId: "559c5d8f4fff3d64de18bf3d"
                },
                {
                    subCategoryName: "Animal Health & Grooming",
                    subCategoryId: "559c5d90ed25b136f13a05df"
                },
                {
                    subCategoryName: "Animal Other",
                    subCategoryId: "56f2eb66208f9a06158f1748"
                }
            ]
        },
        {
            category: "Art & Craft",
            subcategory: [
                {
                    subCategoryName: "Art & Craft",
                    subCategoryId: "571fdff7208f9a0cdb760a7f"
                }
            ]
        }
    ]
}
```

### Retire Item
Completely deactivates and unpublishes an item from the site.

Retired items are not displayed on Walmart.com, but their content stays intact in our system. You can republish an item by providing future discontinue date for the item.

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
  sku: "97964898989",
  message: "Thank you.  Your item has been submitted for retirement from Walmart Catalog.  Please note that it can take up to 48 hours for items to be retired from our catalog.",
  additionalAttributes: null,
  errors: null
}
```

### Bulk Item Retire
Completely deactivates and unpublishes items in bulk from the site.

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
feedType | String | <span style="color: red">**Yes**</span> |
file | String | <span style="color: red">**Yes**</span> |

<br>

**Usage:**

```js
try {
    const result = await walmartMws.items.bulkRetireItem('RETIRE_ITEM', file);
} catch (error) {    
}
```

**Response:**
```js
{
  feedId: "F129C19240844B97A3C6AD8F1A2C4997@AU8BAQA",
  additionalAttributes: null,
  errors: null
}
```

## Promotions

### Promotional Prices
Retrieves a list of promotional prices for a single SKU.

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
sku | String | <span style="color: red">**Yes**</span> |
<br>

**Usage:**

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

### Update Promotional Price
Updates the promotional price.
Sellers can update or delete an existing promotional price as well as set up a new promotional price.
 - To set a new promotional price or update an existing one, set the XML pricing attribute **processMode** to **UPSERT**
 - To delete a promotional price, set the XML pricing attribute **processMode** to **DELETE**.
 - To delete all promotions for a SKU, set **replaceAll** to an empty payload.

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
promo | Boolean | <span style="color: red">**Yes**</span> |
data | Object | <span style="color: red">**Yes**</span> |
<br>

```js
let data = {
    sku: "97964_KFTest",
    pricing: [{
      currentPrice: {
        currency: "USD",
        amount: 4
      },
      currentPriceType: "REDUCED",
      comparisonPriceType: "BASE",
      comparisonPrice: {
        currency: "USD",
        amount: 4
      },
      priceDisplayCodes: "CART",
      effectiveDate: "2019-11-03T09:49:57.943Z",
      expirationDate: "2019-12-03T09:49:57.943Z",
      processMode: "UPSERT"
    }]
}
```

**Usage:**
```js
try {
    const result = await walmartMws.promotions.updatePromotionalPrice(true, data)
} catch (error) {    
}
```

Sample of Response
```js
{
    PriceHeader: {
      version: "1.7"
    },
    Price: [{
      sku: "30348_KFTest",
      pricing: [{
        currentPrice: {
          currency: "USD",
          amount: 4
        },
        currentPriceType: "REDUCED",
        comparisonPriceType: "BASE",
        comparisonPrice: {
          currency: "USD",
          amount: 4
        },
        priceDisplayCodes: "CART",
        effectiveDate:"2019-11-09T21:29:39.420Z",
        expirationDate:"2019-12-09T21:29:39.420Z",
        processMode: "DELETE"
      }]
    }]
}
```

## Inventory

### Get Item Inventory
Return the inventory for a given item

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
sku | String | <span style="color: red">**Yes**</span> |
<br>

**Usage:**
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
Updates the inventory for a given item.

Available Parameters:<br>
Name| Type | Required | Default
--- | :---: | :---: | :---:
sku | String | <span style="color: red">**Yes**</span> |
data| Object | <span style="color: red">**Yes**</span> |
<br>

**Usage:**
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


## Next Features
 Prices:    
 - Updates the regular price for a given item.
 - Updates prices in bulk, in one Feed you can update up to 10,000 items in bulk. To ensure optimal Feed processing  time,
   we recommend sending no more than 1000 items in one Feed and keeping the Feed sizes below 10 MB.

Commission Adjustment Program:
- Set up the SKU opt-in/opt-out for an individual item.
- Global opt-in/opt-out for all items.

Reports:
- Returns all the information associated with Seller's items that are set up on Walmart’s platform.
- Returns the Buy Box data for a given item.
- Get a CAP Item Opt-in file
- Item Performance Report

Reconciliation Management:
- Get available reconciliation report dates.
- Get reconciliation report to download.
- Return Item Overrides Report.


## Issues

[Open New Issue](https://github.com/drbarzaga/walmart-mws/issues/new)

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**


## Donation
If this project help you reduce time to develop, you can give me a cup of coffee :) 

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7K3UCZN7K847N&source=url)