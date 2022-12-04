interface Stock {
  sku: string;
  stock: number;
}

interface Transaction {
  sku: string;
  type: string;
  qty: number;
}

interface CurrentStock {
  sku: string;
  qty: number;
}

enum TransactionType {
  ORDER = 'order',
  REFUND = 'refund',
}

export {Stock, Transaction, CurrentStock, TransactionType};
