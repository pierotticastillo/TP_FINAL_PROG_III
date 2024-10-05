import jwt from 'jsonwebtoken';
import * as authServices from "../services/auth.services.js";
import * as config from '../../config.js';

export const esAdministrador = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(401); // No autorizado
        }
        const usuario = jwt.verify(token, config.JWT_SECRET);
        const data = await authServices.findById(usuario.idUsuario);
        if (data.length === 0 || data[0].idUsuarioTipo !== "Administrador") {
            return res.status(403).send({
                status: "Fallo",
                data: { error: "No tiene los privilegios necesarios." }
            });
        }
        req.user = data[0];
        next();
    } catch (err) {
        return res.status(403).send({
            status: "Fallo",
            data: { error: "Token inválido." }
        }); // Token inválido
    }
};
