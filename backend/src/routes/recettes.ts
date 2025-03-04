import { Router } from 'express';
import { RecetteController } from '../controllers/RecetteController';

const router = Router();
const recetteController = new RecetteController();

// Routes pour les recettes
router.get('/', recetteController.getAllRecettes);
router.get('/:id', recetteController.getRecetteById);
router.post('/', recetteController.createRecette);
router.put('/:id', recetteController.updateRecette);
router.delete('/:id', recetteController.deleteRecette);

// Route spéciale pour obtenir les recettes d'un utilisateur
router.get('/user/:userId', recetteController.getRecettesByUser);

export { router as recetteRoutes };
