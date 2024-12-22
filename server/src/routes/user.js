import express from 'express';
import { getMyProfile } from '../controllers/userController.js';

const router = express.Router();

// GET /user/me => kullanıcının kendi profili
router.get('/me', getMyProfile);

export default router;