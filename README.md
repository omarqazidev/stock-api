# How to Run

Clone this repo:
```
git clone https://github.com/omarqazidev/stock-api
```

Install the required node modules:
```
npm install
```

To run the application:
```
npm start
```

To run the tests:
```
npm test
```

# Postman Collection
[Download Postman Collection](https://api.postman.com/collections/16998694-927476d5-8bbd-455a-b687-067d57e753b7?access_key=PMAT-01GKFABWBCV3BMYGM6Z6Q1MGEM)

# Node Test - Instructions

You are given two json files:

- stock.json: contains objects which represent the starting stock levels for given SKUS
- transactions.json: contains an array of transactions since the stock levels were recorded in `stock.json`

The objective is to create a function which is able to return the current stock levels for a given SKU by combining the data in these two files. These are the requirements.

- The function must match the following signature: `(sku: string) => Promise<{ sku: string, qty: number }>`.
- The function must read from the `stock` and `transactions` files on each invocation (totals cannot be precomputed)
- The function must throw an error where the SKU does not exist in the `transactions.json` and `stock.json` file
- All code must be adequately tested

Notes:

- Transactions may exist for SKUs which are not present in `stock.json`. It should be assumed that the starting quantity for these is 0.
- Functionality can be split into many files to help keep the project clear and organised
