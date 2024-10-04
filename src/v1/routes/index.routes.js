import express from 'express';
import { testerController } from '../../controllers/index.controller.js';

const router = express.Router();

router.get("/prueba", testerController);

export default router;
