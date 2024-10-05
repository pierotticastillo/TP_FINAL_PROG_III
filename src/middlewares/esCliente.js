import jwt from 'jsonwebtoken';
import * as authServices from "../services/auth.services.js";
import * as config from '../../config.js';

export const esCliente = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // El token es enviado utilizando "Bearer"

        if (!token) {
            return res.sendStatus(401); // No autorizado
        }

        const usuario = jwt.verify(token, config.JWT_SECRET);
        const data = await authServices.findById(usuario.idUsuario);
        if (data.length === 0 || data[0].idUsuarioTipo !== "Cliente") {
            return res.status(403).send({
                status: "Fallo",
                data: { error: "No tiene los privilegios necesarios." }
            });
        }
        // console.log(data)
        // & Le envío la información para que el usuario no tenga que ingresar su ID para crear un reclamo
        req.user = data[0];
        next();
    } catch (err) {
        return res.status(403).send({
            status: "Fallo",
            data: { error: "Token inválido." }
        }); // Token inválido
    }
};
