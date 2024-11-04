import express from 'express';
import * as reclamosController from '../../controllers/reclamos.controller.js';
import * as clienteController from '../../middlewares/esCliente.js';
import * as empleadoController from '../../middlewares/esEmpleado.js';

const router = express.Router();

// Trae todos los reclamos de la oficina que tiene competencia el empleado
router.get("/", empleadoController.esEmpleado, reclamosController.getAllByEmployee);

// Trae todos los reclamos creados por un usuario tipo cliente
router.get("/misreclamos", clienteController.esCliente, reclamosController.getAllByUser);

router.get("/misreclamos/:idReclamo", clienteController.esCliente, reclamosController.getByIdUser);

router.post("/", clienteController.esCliente, reclamosController.create);

router.patch("/cancelacion", clienteController.esCliente, reclamosController.updateByUser);

router.patch("/actualizacion", empleadoController.esEmpleado, reclamosController.updateByEmployee);

export default router;
