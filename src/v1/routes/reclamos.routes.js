import express from 'express';
import * as reclamosController from '../../controllers/reclamos.controller.js';

const router = express.Router();

router.get("/", reclamosController.getAll);

router.get("/:idReclamo", reclamosController.getById);

router.post("/", reclamosController.create);

router.patch("/:idReclamo", reclamosController.update);

export default router;
