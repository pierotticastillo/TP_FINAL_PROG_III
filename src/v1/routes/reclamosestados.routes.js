import express from 'express';
import * as reclamosEstadosController from '../../controllers/reclamosestados.controller.js';

const router = express.Router();

router.get("/", reclamosEstadosController.getAll);

router.get("/:idReclamoEstado", reclamosEstadosController.getById);

router.post("/", reclamosEstadosController.create);

router.patch("/actualizacion", reclamosEstadosController.update);

router.patch("/eliminacion", reclamosEstadosController.destroy);

export default router;