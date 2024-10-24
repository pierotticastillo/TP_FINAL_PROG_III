import * as oficinasServices from '../services/oficinas.services.js';

export const getAll = async (req, res) => {
    try {
        const resultado = await oficinasServices.getAll();
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const idOficina = req.params.idOficina;
        if (!idOficina) {
            return res.status(404).json({ estado: "Falla", mensaje: "Falta el ID de la oficina que desea obtener" });
        }
        const resultado = await oficinasServices.getById(idOficina);
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const { nombre, idReclamoTipo } = req.body;
        if (!nombre || !idReclamoTipo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan los datos de la oficina para crearla" });
        }
        const oficina = {
            nombre,
            idReclamoTipo: parseInt(idReclamoTipo)
        }
        const oficinaCreada = await oficinasServices.create(oficina);
        res.status(201).json({ estado: 'OK', dato: oficinaCreada });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const idOficina = req.params.idOficina;
        const { nombre, idReclamoTipo } = req.body;
        if (!idOficina) {
            return res.status(404).json({ estado: "Falla", mensaje: "Falta el ID de la oficina que desea actualizar" });
        }
        if (!nombre || !idReclamoTipo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan los datos de la oficina para actualizarla" });
        }
        const oficina = {
            nombre,
            idReclamoTipo: parseInt(idReclamoTipo)
        }
        const oficinaActualizada = await oficinasServices.update(idOficina, oficina);
        res.status(200).json({ estado: 'OK', dato: oficinaActualizada });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
}

export const destroy = async (req, res) => {
    try {
        const idOficina = req.params.idOficina;
        if (!idOficina) {
            return res.status(404).json({ estado: "Falla", mensaje: "Falta el ID de la oficina que desea eliminar" });
        }
        await oficinasServices.destroy(idOficina);
        res.status(200).json({ estado: 'OK', mensaje: "Oficina eliminada exitosamente"});
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
}
