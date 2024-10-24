import express from 'express';
import * as estadisticaController from '../../controllers/estadistica.controller.js';
const router = express.Router();

router.get("/informacion", estadisticaController.getEstadistica);
router.get('/informacion/reclamos/csv', estadisticaController.downloadCSV);
router.get('/informacion/reclamos/pdf', estadisticaController.downloadPDF);

export default router;