import express from 'express';
import * as reclamostiposcontroller from '../../controllers/reclamostipos.controller.js';

const router = express.Router();

router.get('/', reclamostiposcontroller.getAll);

router.get('/:idReclamoTipo', reclamostiposcontroller.getById);

router.post('/', reclamostiposcontroller.create);

router.patch('/actualizacion', reclamostiposcontroller.update);

router.patch('/eliminacion', reclamostiposcontroller.destroy);

export default router;