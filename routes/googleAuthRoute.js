import express from 'express';
import { getGoogleOauthUrlRoute } from '../controllers/getGoogleAuthController.js';

const router = express.Router();
router.get('/', getGoogleOauthUrlRoute)

export default router;