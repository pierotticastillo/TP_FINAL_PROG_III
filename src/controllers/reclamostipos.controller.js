import * as reclamosServices from '../services/reclamostipos.services.js';

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
        const idReclamoTipo = req.params.idReclamoTipo;
        if (!idReclamoTipo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del reclamo tipo" });
        }
        const resultado = await reclamosServices.getById(idReclamoTipo);
        res.status(200).json({ estado: 'OK', dato: resultado });
    }
    catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const { descripcion } = req.body;
        if (!descripcion) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta la descripcion para crear el reclamo tipo" });
        }
        const reclamoTipoCreado = await reclamosServices.create(descripcion);
        res.status(201).json({ estado: 'OK', dato: reclamoTipoCreado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const { idReclamoTipo, descripcion } = req.body;
        if (!idReclamoTipo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del reclamo tipo" });
        }
        if (!descripcion) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta la descripcion para actualizar el reclamo tipo" });
        }
        const reclamoTipoActualizado = await reclamosServices.update(parseInt(idReclamoTipo), descripcion);
        res.status(200).json({ estado: 'OK', dato: reclamoTipoActualizado });
    }
    catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const destroy = async (req, res) => {
    try {
        const { idReclamoTipo } = req.body;
        if (!idReclamoTipo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del reclamo tipo" });
        }
        await reclamosServices.destroy(parseInt(idReclamoTipo));
        res.status(200).json({ estado: 'OK', mensaje: "Reclamo tipo eliminado correctamente" });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};