import {Request, Response} from 'express';
import {getInitialStockLevel, getCurrentStockLevel} from '../services/stock';
import _ from 'lodash';

const getCurrentStock = async (req: Request, res: Response) => {
  const sku = req.query.sku;
  if (!_.isString(sku)) return res.status(400).send({status: 'fail', message: 'valid sku required'});

  const currentStock = await getCurrentStockLevel(sku);
  if (_.isNil(currentStock))
    return res.status(400).send({status: 'fail', message: 'could not get current stock level'});

  return res.send({status: 'success', data: currentStock});
};

const getInitialStock = async (req: Request, res: Response) => {
  const sku = req.query.sku;
  if (!_.isString(sku)) return res.status(400).send({status: 'fail', message: 'valid sku required'});

  const initialStock = await getInitialStockLevel(sku);
  if (_.isNil(initialStock))
    return res.status(400).send({status: 'fail', message: 'could not get initial stock level'});

  return res.send({status: 'success', data: initialStock});
};

export default {getInitialStock, getCurrentStock};
