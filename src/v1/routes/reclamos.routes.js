import express from 'express';
import * as reclamosController from '../../controllers/reclamos.controller.js';
import * as clienteController from '../../middlewares/esCliente.js';
import * as empleadoController from '../../middlewares/esEmpleado.js';

const router = express.Router();

router.get("/", empleadoController.esEmpleado,reclamosController.getAll);

router.get("/:idReclamo", clienteController.esCliente, reclamosController.getById);

router.post("/", clienteController.esCliente, reclamosController.create);

router.patch("/:idReclamo", reclamosController.update);

export default router;
