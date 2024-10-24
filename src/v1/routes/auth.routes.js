import express from 'express';
import { check } from 'express-validator';
import * as authController from '../../controllers/auth.controller.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
const router = express.Router();


/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesión
 *     description: Permite a un usuario iniciar sesión en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correoElectronico:
 *                 type: string
 *                 example: "usuario@correo.com"
 *               contrasenia:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt_token_aqui"
 *       401:
 *         description: Credenciales inválidas
 */

router.post('/login', [
    check('correoElectronico', 'El correo electrónico es requerido!').notEmpty(),
    check('correoElectronico', 'Revisar el formato del correo electrónico!').isEmail(),
    check('contrasenia', 'La contrasenia es requerida!').notEmpty(),
    validarCampos
], authController.login);

export default router;