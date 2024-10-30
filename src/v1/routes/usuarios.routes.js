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


/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener todos los usuarios
 *     description: Devuelve una lista de todos los usuarios del sistema. Solo accesible para administradores.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Lionel"
 *                   apellido:
 *                     type: string
 *                     example: "Messi"
 *                   correoElectronico:
 *                     type: string
 *                     example: "lionel.messi@ejemplo.com"
 *                   tipoUsuario:
 *                     type: string
 *                     example: "Administrador"
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       403:
 *         description: Prohibido, solo los administradores tienen acceso
 */
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
