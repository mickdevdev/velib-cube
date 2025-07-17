import { Router } from 'express';
import { updateStation } from '../controllers/StationController.js';

const router = Router();

router.put('/stations/:id', updateStation);

export default router;
