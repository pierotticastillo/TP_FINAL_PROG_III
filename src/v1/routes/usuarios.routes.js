import express from 'express';

import * as usuariosController from '../../controllers/usuarios.controller.js';

const router = express.Router();

// Obtener todos los usuarios
router.get('/', usuariosController.getAll);

// Obtener usuario por ID
router.get('/:idUsuario', usuariosController.getById);

// Crear usuario
router.post('/', usuariosController.create);

// Modificar usuario
router.patch('/:idUsuario', usuariosController.update);

// Eliminado lógico de un usuario, es decir, va a ser cambiado a 0 el campo activo del registro del usuario
router.delete('/:idUsuario', usuariosController.destroy);

export default router;
