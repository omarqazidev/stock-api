import {getInitialStockLevel, getCurrentStockLevel} from '../../services/stock';

describe('GET INITIAL STOCK LEVEL - SERVICES', () => {
  it('should get initial stock level', async () => {
    const initialStockLevel = await getInitialStockLevel('CLQ274846/07/46');
    expect(initialStockLevel).toEqual({sku: 'CLQ274846/07/46', stock: 8414});
  });
  it('should get initial stock level of stock that doesnt exist in stock.json', async () => {
    const initialStockLevel = await getInitialStockLevel('BLW357145/52/57');
    expect(initialStockLevel).toEqual({sku: 'BLW357145/52/57', stock: 0});
  });
  it('should fail in getting initial stock level', async () => {
    const initialStockLevel = await getInitialStockLevel('CLQ274846/07/47');
    expect(initialStockLevel).toEqual(null);
  });
});

describe('GET CURRENT STOCK LEVEL - SERVICES', () => {
  it('should get current stock level', async () => {
    const currentStockLevel = await getCurrentStockLevel('CLQ274846/07/46');
    expect(currentStockLevel).toEqual({sku: 'CLQ274846/07/46', qty: 8369});
  });
  it('should get current stock level of stock that doesnt exist in stock.json', async () => {
    const currentStockLevel = await getCurrentStockLevel('BLW357145/52/57');
    expect(currentStockLevel).toEqual({sku: 'BLW357145/52/57', qty: -96});
  });
  it('should fail in getting current stock level', async () => {
    const currentStockLevel = await getCurrentStockLevel('CLQ274846/07/47');
    expect(currentStockLevel).toEqual(null);
  });
});
