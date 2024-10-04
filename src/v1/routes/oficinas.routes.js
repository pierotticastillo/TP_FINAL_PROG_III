import express from 'express';
import * as oficinasController from '../../controllers/oficinas.controller.js';

const router = express.Router();

router.get('/', oficinasController.getAll);

router.get('/:idOficina', oficinasController.getById);

router.post('/', oficinasController.create);

router.patch('/:idOficina', oficinasController.update);

router.delete('/:idOficina', oficinasController.destroy);

export default router;