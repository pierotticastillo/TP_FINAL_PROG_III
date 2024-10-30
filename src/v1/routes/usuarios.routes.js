import express from 'express';
import passport from 'passport';
import * as usuariosController from '../../controllers/usuarios.controller.js';
import * as administradorMiddleware from '../../middlewares/esAdministrador.js';
import * as empleadoMiddleware from '../../middlewares/esEmpleado.js';
import * as clienteMiddleware from '../../middlewares/esCliente.js';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

const authenticate = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get('/:usuariotipo', [authenticate, administradorMiddleware.esAdministrador], usuariosController.getAll);
// router.get('/', usuariosController.getAll);

// Obtener usuario por ID
router.get('/usuarioid/:idUsuario', [authenticate, administradorMiddleware.esAdministrador], usuariosController.getById);

// Crear usuario empleado
router.post('/creacionempleado',
    [authenticate, administradorMiddleware.esAdministrador, check('correoElectronico', 'Revisar el formato del correo electrónico!').isEmail(), validarCampos], usuariosController.createByAdmin);

// Crear usuario cliente
router.post('/creacioncliente',
    [check('correoElectronico', 'Revisar el formato del correo electrónico!').isEmail(), validarCampos], usuariosController.createByCliente);

// Modificar usuario
router.patch('/modificacionempleado', [authenticate, empleadoMiddleware.esEmpleado], usuariosController.update);

router.patch('/modificacioncliente', [authenticate, clienteMiddleware.esCliente], usuariosController.update);

// Eliminado lógico de un usuario, es decir, va a ser cambiado a 0 el campo activo del registro del usuario
router.patch('/eliminacion', [authenticate, administradorMiddleware.esAdministrador], usuariosController.destroy);

export default router;
