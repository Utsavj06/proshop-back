import express from 'express';
const router = express.Router();
import { deliveryDetail, deliverySuccess } from '../controllers/deliveryOrder.js';

router.route('/order-delivery').get(deliveryDetail);
router.route('/change-status').post(deliverySuccess);

export default router;
