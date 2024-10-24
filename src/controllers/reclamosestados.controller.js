import * as reclamosEstadoServices from '../services/reclamosestados.services.js';

export const getAll = async (req, res) => {
    try {
        const resultado = await reclamosEstadoServices.getAll();
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const idReclamoEstado = req.params.idReclamoEstado;
        if (!idReclamoEstado) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del reclamo" });
        }
        const resultado = await reclamosEstadoServices.getById(idReclamoEstado);
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const { descripcion } = req.body;
        if (!descripcion) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan la descripción para crear un reclamo estado" });
        };
        const reclamoEstadoCreado = await reclamosEstadoServices.create(descripcion);
        res.status(201).json({ estado: "OK", mensaje: "El reclamo estado fue creado exitosamente", dato: reclamoEstadoCreado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const idReclamoEstado = req.params.idReclamoEstado;
        const { descripcion } = req.body;
        if (!idReclamoEstado) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del reclamo estado que desea actualizar" });
        }
        if (!descripcion) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan campos obligatorios para actualizar el reclamo estado" });
        }
        const reclamoEstadoActualizado = await reclamosEstadoServices.update(idReclamoEstado, descripcion);
        res.status(201).json({ estado: "OK", mensaje: "El reclamo estado fue actualizado exitosamente", dato: reclamoEstadoActualizado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const destroy = async (req, res) => {
    try {
        const idReclamoEstado = req.params.idReclamoEstado;
        if (!idReclamoEstado) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del reclamo estado que desea eliminar" });
        }
        await reclamosEstadoServices.destroy(idReclamoEstado);
        res.status(200).json({ estado: "OK", mensaje: "El reclamo estado fue eliminado exitosamente"});
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};