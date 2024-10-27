import * as reclamosServices from '../services/reclamos.services.js';

export const getAllByEmployee = async (req, res) => {
    try {
        const idUsuario = req.user.idUsuario;
        if (!idUsuario) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del usuario" });
        }
        const resultado = await reclamosServices.getAllByEmployee(idUsuario);
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const getAllByUser = async (req, res) => {
    try {
        const idUsuario = req.user.idUsuario;
        if (!idUsuario) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del usuario" });
        }
        const resultado = await reclamosServices.getAllByUser(idUsuario);
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
}

export const getByIdUser = async (req, res) => {
    try {
        const idUsuario = req.user.idUsuario;
        const idReclamo = req.params.idReclamo;
        if (!idReclamo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del reclamo" });
        }
        const resultado = await reclamosServices.getByIdByUser(idReclamo, idUsuario);
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const { asunto, descripcion, idReclamoTipo } = req.body;
        const idUsuarioCreador = req.user.idUsuario; // Obtenemos el idUsuario desde el token JWT
        // Verificar los campos obligatorios
        if (!asunto || !idReclamoTipo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan campos obligatorios para crear un reclamo" });
        }
        const reclamo = {
            asunto,
            descripcion: descripcion === "" ? null : descripcion,
            idReclamoTipo: parseInt(idReclamoTipo),
            idUsuarioCreador: parseInt(idUsuarioCreador)
        };
        const reclamoCreado = await reclamosServices.create(reclamo);
        res.status(201).json({ estado: "OK", mensaje: "El reclamo fue creado exitosamente", dato: reclamoCreado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const idReclamo = req.body.idReclamo;
        const idUsuarioCreador = req.user.idUsuario;
        if (!idReclamo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del reclamo que desea actualizar" });
        }
        const reclamoActualizado = await reclamosServices.updateUser(idReclamo, idUsuarioCreador);
        res.status(201).json({ estado: "OK", mensaje: "El reclamo fue actualizado exitosamente", dato: reclamoActualizado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const idUsuario = req.user.idUsuario;
        const { idReclamo, idReclamoEstado } = req.body;
        const estado = parseInt(idReclamoEstado)
        const estadosValidos = [2, 4];

        if (!idReclamo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del reclamo que desea actualizar" });
        }
        if (!idReclamoEstado) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan campos obligatorios para actualizar el reclamo" });
        }
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ estado: "Falla", mensaje: "El estado del reclamo debe ser uno de los siguientes: 2 (En proceso), 4 (Resuelto)" });
        }
        const reclamoActualizado = await reclamosServices.updateEmployee(idReclamo, estado, idUsuario);
        res.status(201).json({ estado: "OK", mensaje: "El reclamo fue actualizado exitosamente", dato: reclamoActualizado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};