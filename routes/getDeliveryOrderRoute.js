import express from 'express';
const router = express.Router();
import { orderDetail } from '../controllers/deliveryOrder.js';

router.route('/order-delivery').get(orderDetail);
export default router;
