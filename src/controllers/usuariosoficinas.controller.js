import * as usuariosOficinasServices from "../services/usuariosoficinas.services.js";

export const getAllAsigned = async (req, res) => {
    try {
        const resultado = await usuariosOficinasServices.getAllAsigned();
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const getAllUnasigned = async (req, res) => {
    try {
        const resultado = await usuariosOficinasServices.getAllUnasigned();
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const idUsuarioOficina = req.params.idUsuarioOficina;
        if (!idUsuarioOficina) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del usuario oficina" });
        }
        const resultado = await usuariosOficinasServices.getById(idUsuarioOficina);
        res.status(200).json({ estado: 'OK', dato: resultado });

    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const { idUsuario, idOficina } = req.body;
        if (!idUsuario || !idOficina) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan los IDs de usuario y oficina para crear el usuario oficina" });
        }
        const usuarioOficinaNuevo = {
            idUsuario: parseInt(idUsuario),
            idOficina: parseInt(idOficina)
        }
        const resultado = await usuariosOficinasServices.create(usuarioOficinaNuevo);
        res.status(201).json({ estado: 'OK', mensaje: "El usuario oficina fue creado exitosamente", dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const { idUsuarioOficina, idUsuario, idOficina } = req.body;
        if (!idUsuarioOficina) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del usuario oficina que desea actualizar" });
        }
        if (!idUsuario || !idOficina) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan los IDs de usuario y oficina" });
        }
        const usuarioOficinaActualizado = {
            idUsuarioOficina: parseInt(idUsuarioOficina),
            idUsuario: parseInt(idUsuario),
            idOficina: parseInt(idOficina)
        }
        const resultado = await usuariosOficinasServices.update(usuarioOficinaActualizado);
        res.status(200).json({ estado: 'OK', mensaje: "El usuario oficina fue actualizado exitosamente", dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const destroy = async (req, res) => {
    try {
        const { idUsuarioOficina } = req.body;
        if (!idUsuarioOficina) {
            return res.status(404).json({ estado: "Falla", mensaje: "Falta el ID del usuario oficina que desea eliminar" });
        }
        await usuariosOficinasServices.destroy(parseInt(idUsuarioOficina));
        res.status(200).json({ estado: 'OK', mensaje: 'El usuario oficina fue eliminado exitosamente' });
    }
    catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};