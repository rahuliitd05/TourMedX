import { Router } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { protect } from '../middleware/auth.js';
import { login, me } from '../controllers/authController.js';

const router = Router();

router.post('/login', asyncHandler(login));
router.get('/me', protect, asyncHandler(me));

export default router;
