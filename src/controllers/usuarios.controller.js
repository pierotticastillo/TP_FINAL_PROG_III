import * as usuariosServices from '../services/usuarios.services.js';

export const getAll = async (req, res) => {
    try {
        const parametrosadmitidos = ["empleados", "clientes"];
        const usuarioTipo = req.params.usuariotipo;
        if (!usuarioTipo || !parametrosadmitidos.includes(usuarioTipo)) {
            return res.status(404).json({ estado: "Falla", mensaje: "Falta el tipo de usuario o el parametro es invalido" });
        }
        let parameters ;
        if (usuarioTipo === "empleados"){
            parameters = 2
        }
        else if (usuarioTipo === "clientes"){
            parameters = 3
        }
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

export const createByAdmin = async (req, res) => {
    try {
        const { nombre, apellido, correoElectronico, contrasenia, imagen } = req.body;
        if (!nombre || !apellido || !correoElectronico || !contrasenia) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan campos obligatorios para registrar al usuario" });
        }
        const usuario = {
            nombre,
            apellido,
            correoElectronico,
            contrasenia,
            imagen: imagen === "" ? null : imagen
        };
        const usuarioCreado = await usuariosServices.createByAdmin(usuario);
        res.status(201).json({ estado: "OK", mensaje: "El usuario fue creado exitosamente", dato: usuarioCreado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const createByCliente = async (req, res) => {
    try {
        const { nombre, apellido, correoElectronico, contrasenia, imagen } = req.body;
        if (!nombre || !apellido || !correoElectronico || !contrasenia) {
            return res.status(400).json({ estado: "Falla", mensaje: "Faltan campos obligatorios para registrar al usuario" });
        }
        const usuario = {
            nombre,
            apellido,
            correoElectronico,
            contrasenia,
            imagen: imagen === "" ? null : imagen
        };
        const usuarioCreado = await usuariosServices.createByCliente(usuario);
        res.status(201).json({ estado: "OK", mensaje: "El usuario fue creado exitosamente", dato: usuarioCreado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const idUsuario = req.user.idUsuario;
        const { nombre, apellido, correoElectronico, contrasenia, imagen } = req.body;
        if (!idUsuario) {
            return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID del usuario que desea actualizar" });
        }
        const usuario = {};
        if (nombre) usuario.nombre = nombre;
        if (apellido) usuario.apellido = apellido;
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correoElectronico) {
            if (formatoEmail.test(correoElectronico)) {
                usuario.correoElectronico = correoElectronico;
            } else {
                return res.status(400).json({ estado: "Falla", mensaje: "El correo electrónico no es válido" });
            }
        }
        if (contrasenia) usuario.contrasenia = contrasenia;
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
        const { idUsuario } = req.body;
        if (!idUsuario) {
            return res.status(404).json({ estado: "Falla", mensaje: "Falta el ID del usuario que desea eliminar" });
        }
        await usuariosServices.destroy(parseInt(idUsuario));
        res.status(200).json({ estado: "OK", mensaje: 'El usuario fue eliminado exitosamente' });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};