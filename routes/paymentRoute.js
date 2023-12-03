import express from 'express';
const router = express.Router();
import {
    processPayment
} from '../controllers/PaymentController.js';

router.route('/').post(processPayment)

export default router;