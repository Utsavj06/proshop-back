import express from 'express';
import { getGoogleAuthCallback } from '../controllers/getGoogleAuthCallbackController.js';
const router = express.Router();

router.route('/google/callback').get(getGoogleAuthCallback);

export default router;