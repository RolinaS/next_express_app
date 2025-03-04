import { Router } from 'express';
import { userRoutes } from './users';
import { alimentRoutes } from './aliments';
import { recetteRoutes } from './recettes';

const router = Router();

// Routes de base
router.use('/users', userRoutes);
router.use('/aliments', alimentRoutes);
router.use('/recettes', recetteRoutes);

// Route de santé
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API opérationnelle',
    timestamp: new Date().toISOString()
  });
});

export default router;
