import express from 'express';
const router = express.Router();
import { deliveryDetail } from '../controllers/deliveryOrder.js';

router.route('/order-delivery').get(deliveryDetail);
export default router;
