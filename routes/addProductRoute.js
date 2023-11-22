import express from 'express';
const router = express.Router();

import formidable from 'express-formidable'

import {
  addProduct,
} from '../controllers/addProductController.js';

router.route('/').post(formidable(), addProduct);

export default router;