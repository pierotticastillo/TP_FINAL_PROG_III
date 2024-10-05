import jwt from 'jsonwebtoken';
import passport from 'passport';
import * as config from '../../config.js';

export const login = async (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Error de autenticación', // Puedes devolver el mensaje adecuado de `info`
                error: err || 'Credenciales incorrectas'
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error en el login' });
            }
            // Generar el token solo con la información relevante
            const token = jwt.sign(
                { idUsuario: user.idUsuario, email: user.correoelectronico, usuarioTipo: user.idUsuarioTipo },
                config.JWT_SECRET,
                { expiresIn: '1h' } // Expiración de 1 hora
            );
            return res.json({ user, token });
        });
    })(req, res);
};