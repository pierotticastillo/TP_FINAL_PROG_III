import express from 'express';

import passport from 'passport';

import * as usuariosController from '../../controllers/usuarios.controller.js';

import * as administradorMiddleware from '../../middlewares/esAdministrador.js';

import * as empleadoMiddleware from '../../middlewares/esEmpleado.js';

const authenticate = passport.authenticate('jwt', { session: false });

const router = express.Router();

// Obtener todos los usuarios
router.get('/', [authenticate, administradorMiddleware.esAdministrador], usuariosController.getAll);

// Obtener usuario por ID
router.get('/:idUsuario', [authenticate, administradorMiddleware.esAdministrador], usuariosController.getById);

// Crear usuario empleado
router.post('/crearempleado', [authenticate, administradorMiddleware.esAdministrador], usuariosController.createByAdmin);

// Crear usuario cliente
router.post('/crearcliente', usuariosController.createByCliente);

// Modificar usuario
router.patch('modificarempleado', [authenticate, empleadoMiddleware.esEmpleado], usuariosController.update);

// Eliminado lógico de un usuario, es decir, va a ser cambiado a 0 el campo activo del registro del usuario
router.delete('/:idUsuario', [authenticate, administradorMiddleware.esAdministrador], usuariosController.destroy);

export default router;
