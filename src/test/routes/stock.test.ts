import request from 'supertest';
import app from '../../app';

describe('GET INITIAL STOCK LEVEL - GET /api/stock/initial/', () => {
  it('should successfully get initial stock level', async () => {
    const response = await request(app).get('/api/stock/initial/?sku=CLQ274846/07/46');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.body.status).toBe('success');
    expect(response.body.data).toEqual({sku: 'CLQ274846/07/46', stock: 8414});
  });
  it('should fail getting initial stock level with `valid sku required` message', async () => {
    const response = await request(app).get('/api/stock/initial/');
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('valid sku required');
  });
  it('should fail getting initial stock level with `could not get initial stock level` message', async () => {
    const response = await request(app).get('/api/stock/initial/?sku=CLQ274846/07/22');
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('could not get initial stock level');
  });
});

describe('GET CURRENT STOCK LEVEL - GET /api/stock/', () => {
  it('should successfully get current stock level', async () => {
    const response = await request(app).get('/api/stock/?sku=CLQ274846/07/46');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.body.status).toBe('success');
    expect(response.body.data).toEqual({sku: 'CLQ274846/07/46', qty: 8369});
  });
  it('should fail getting current stock level with `valid sku required` message', async () => {
    const response = await request(app).get('/api/stock/');
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('valid sku required');
  });
  it('should fail getting current stock level with `could not get initial stock level` message', async () => {
    const response = await request(app).get('/api/stock/?sku=CLQ274846/07/22');
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('could not get current stock level');
  });
});
