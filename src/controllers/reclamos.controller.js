import * as reclamosServices from '../services/reclamos.services.js';

export const getAll = async (req, res) => {
    try {
        const resultado = await reclamosServices.getAll();
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const idReclamo = req.params.idReclamo;
        if (!idReclamo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del reclamo" });
        }
        const resultado = await reclamosServices.getById(idReclamo);
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const { asunto, descripcion, idReclamoEstado, idReclamoTipo, idUsuarioCreador } = req.body;
        if (!asunto || !idReclamoEstado || !idReclamoTipo || !idUsuarioCreador) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan campos obligatorios para crear un reclamo" });
        }
        const reclamo = {
            asunto,
            descripcion: descripcion === "" ? null : descripcion,
            idReclamoEstado: parseInt(idReclamoEstado),
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

export const update = async (req, res) => {
    try {
        const idReclamo = req.params.idReclamo;
        const { asunto, descripcion, idReclamoEstado, idReclamoTipo, idUsuarioCreador } = req.body;
        if (!idReclamo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del reclamo que desea actualizar" });
        }
        if (!asunto || !idReclamoEstado || !idReclamoTipo || !idUsuarioCreador) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan campos obligatorios para actualizar el reclamo" });
        }
        const reclamo = {
            asunto,
            descripcion: descripcion === "" ? null : descripcion,
            idReclamoEstado: parseInt(idReclamoEstado),
            idReclamoTipo: parseInt(idReclamoTipo),
            idUsuarioCreador: parseInt(idUsuarioCreador)
        };
        const reclamoActualizado = await reclamosServices.update(idReclamo, reclamo);
        res.status(201).json({ estado: "OK", mensaje: "El reclamo fue actualizado exitosamente", dato: reclamoActualizado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};