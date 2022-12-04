import {Stock, Transaction, CurrentStock, TransactionType} from '../interfaces/stock';
import {readFileAndReturnObject, readFileAndParseJson} from '../utils/file';

const stockFilePath = process.env.STOCK_FILE_PATH || './resources/stock.json';
const transactionFilePath = process.env.TRANSACTION_FILE_PATH || './resources/transactions.json';

async function getStockData(sku: string, getTransactions: boolean = true) {
  try {
    let stock = await readFileAndReturnObject<Stock>(sku, stockFilePath);
    if (stock === undefined) {
      const transactions = readFileAndParseJson<Transaction>(transactionFilePath);
      if (transactions === undefined) throw new Error('transactions not found');
      if (transactions.find((transaction) => transaction.sku === sku)) {
        stock = {sku, stock: 0};
        if (getTransactions) return {stock, transactions};
        else return {stock};
      }
      throw new Error('stock not found');
    }
    if (getTransactions) {
      const transactions = readFileAndParseJson<Transaction>(transactionFilePath);
      if (!transactions) throw new Error('transactions not found');
      return {stock, transactions};
    }
    return {stock};
  } catch (error) {
    // console.error(error);
    return null;
  }
}

async function getInitialStockLevel(sku: string): Promise<Stock | null> {
  try {
    const stockData = await getStockData(sku, false);
    if (stockData) return stockData.stock;
    throw new Error('stock not found');
  } catch (error) {
    // console.error(error);
    return null;
  }
}

async function getCurrentStockLevel(sku: string): Promise<CurrentStock | null> {
  try {
    const stockData = await getStockData(sku, true);

    if (!stockData) throw new Error('stock not found');
    if (!stockData?.transactions) throw new Error('transactions not found');

    const stock = stockData.stock;
    const transactions = stockData.transactions;

    // console.log('INITIAL STOCK: ', stock);

    transactions.forEach((transacation) => {
      if (transacation.sku === stock.sku) {
        if (transacation.type === TransactionType.ORDER) {
          // console.log('ORDERED:\t', transacation.qty);
          stock.stock = stock.stock - transacation.qty;
        }
        if (transacation.type === TransactionType.REFUND) {
          // console.log('REFUNDED:\t', transacation.qty);
          stock.stock = stock.stock + transacation.qty;
        }
      }
    });

    const currentStockObject: CurrentStock = {
      sku: stock.sku,
      qty: stock.stock,
    };

    // console.log('FINAL STOCK: ', currentStockObject);

    return currentStockObject;
  } catch (error) {
    // console.error(error);
    return null;
  }
}

export {getInitialStockLevel, getCurrentStockLevel};
