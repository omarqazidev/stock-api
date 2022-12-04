import express from 'express';
import stockController from '../controllers/stock';

const router = express.Router();

router.get('/', stockController.getCurrentStock);
router.get('/initial/', stockController.getInitialStock);

export default router;
