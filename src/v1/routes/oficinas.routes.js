import express from 'express';
import * as oficinasController from '../../controllers/oficinas.controller.js';

const router = express.Router();

router.get('/', oficinasController.getAll);

router.get('/:idOficina', oficinasController.getById);

router.post('/', oficinasController.create);

router.patch('actualizacion', oficinasController.update);

router.patch('eliminacion', oficinasController.destroy);

export default router;