import express from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { registerSchema, loginSchema } from '../utils/validation';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

// Register route
router.post('/register', validate(registerSchema), register);

// Login route
router.post('/login', validate(loginSchema), login);

// Get current user route (protected)
router.get('/me', protect, getCurrentUser);

export default router;
