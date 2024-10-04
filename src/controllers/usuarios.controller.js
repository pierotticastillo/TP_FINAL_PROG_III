import * as usuariosServices from '../services/usuarios.services.js';

export const getAll = async (req, res) => {
    try {
        const validColumns = ['idUsuario', 'nombre', 'apellido', 'correoelectronico']; // Lista de columnas válidas para el parámetro order
        // Definir los parámetros con validación
        const parameters = {
            nombre: req.query.nombre,
            apellido: req.query.apellido,
            limit: Number.isInteger(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 10,  // Valor por defecto
            offset: Number.isInteger(parseInt(req.query.offset)) ? parseInt(req.query.offset) : 0,  // Valor por defecto
            order: validColumns.includes(req.query.order) ? req.query.order : 'idUsuario',          // Ordenar por defecto
            asc: (req.query.asc === 'ASC' || req.query.asc === 'DESC') ? req.query.asc : 'ASC'  // Asignar el valor validado de 'asc'
        };
        // Llamar al servicio con los parámetros validados
        const resultado = await usuariosServices.getAll(parameters);
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;
        if (!idUsuario) {
            return res.status(404).json({ estado: "Falla", mensaje: "Falta el ID del usuario" });
        }
        const resultado = await usuariosServices.getById(idUsuario);
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const { nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen } = req.body;
        if (!nombre || !apellido || !correoElectronico || !contrasenia || !idUsuarioTipo) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan campos obligatorios para registrar al usuario" });
        }
        const usuario = {
            nombre,
            apellido,
            correoElectronico,
            contrasenia,
            idUsuarioTipo: parseInt(idUsuarioTipo),
            imagen: imagen === "" ? null : imagen
        };
        const usuarioCreado = await usuariosServices.create(usuario);
        res.status(201).json({ estado: "OK", mensaje: "El usuario fue creado exitosamente", dato: usuarioCreado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;
        const { nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen } = req.body;
        if (!idUsuario) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del usuario que desea actualizar" });
        }
        const usuario = {};
        if (nombre) usuario.nombre = nombre;
        if (apellido) usuario.apellido = apellido;
        if (correoElectronico) usuario.correoElectronico = correoElectronico;
        if (contrasenia) usuario.contrasenia = contrasenia;
        if (idUsuarioTipo) usuario.idUsuarioTipo = parseInt(idUsuarioTipo);
        usuario.imagen = imagen === "" ? null : imagen;
        const usuarioActualizado = await usuariosServices.update(idUsuario, usuario);
        res.status(200).json({ estado: "OK", mensaje: "Usuario actualizado exitosamente", dato: usuarioActualizado });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const destroy = async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;
        if (!idUsuario) {
            return res.status(404).json({ estado: "Falla", mensaje: "Falta el ID del usuario que desea eliminar" });
        }
        const usuarioEliminado = await usuariosServices.destroy(idUsuario);
        res.status(200).json({ estado: "OK", mensaje: 'El usuario fue eliminado exitosamente', dato: usuarioEliminado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};