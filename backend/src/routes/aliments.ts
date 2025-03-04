import { Router } from 'express';
import { AlimentController } from '../controllers/AlimentController';

const router = Router();
const alimentController = new AlimentController();

// Routes pour les aliments
router.get('/', alimentController.getAllAliments);
router.get('/:id', alimentController.getAlimentById);
router.post('/', alimentController.createAliment);
router.put('/:id', alimentController.updateAliment);
router.delete('/:id', alimentController.deleteAliment);

export { router as alimentRoutes };
