import { Router } from 'express';
import { healthCheck } from './health';
import { userRoutes } from './users';

const router = Router();

// Routes de base
router.use('/health', healthCheck);
router.use('/users', userRoutes);

export default router;
