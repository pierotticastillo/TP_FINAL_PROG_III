import * as usuariosDataBase from '../dataBase/usuarios.db.js';

export const getAll = async (parameters) => {
    try {
        const allUsuarios = await usuariosDataBase.getAll(parameters);
        return allUsuarios;
    } catch (error) {
        console.error("Error al obtener todos los usuarios en la base de datos:", error.message);
        throw new Error("No se pudo obtener todos los usuarios en la base de datos");
    }
};

export const getById = async (idUsuario) => {
    try {
        const usuarioById = await usuariosDataBase.getById(idUsuario);
        return usuarioById;
    } catch (error) {
        console.error("Error al obtener el usuario en la base de datos:", error);
        throw new Error("No se pudo obtener el usuario en la de datos");
    }
};

export const createByAdmin = async (usuario) => {
    try {
        const createdUsuario = await usuariosDataBase.createByAdmin(usuario);
        return createdUsuario;
    } catch (error) {
        console.error("Error al crear el usuario en la base de datos:", error);
        throw new Error("No se pudo crear el usuario en la base de datos");
    }
};

export const createByCliente = async (usuario) => {
    try {
        const createdUsuario = await usuariosDataBase.createByCliente(usuario);
        return createdUsuario;
    } catch (error) {
        console.error("Error al crear el usuario en la base de datos:", error);
        throw new Error("No se pudo crear el usuario en la base de datos");
    }
};

export const update = async (idUsuario, usuario) => {
    try {
        await getById(idUsuario);
        const updatedUsuario = await usuariosDataBase.update(idUsuario, usuario);
        return updatedUsuario;
    } catch (error) {
        console.error("Error al actualizar el usuario en la base de datos:", error);
        throw new Error("No se pudo actualizar el usuario en la base de datos");
    }
};

export const destroy = async (idUsuario) => {
    try {
        const empleadoRol = await getById(idUsuario);
        if (empleadoRol.idUsuarioTipo !== 'Empleado') {
            throw new Error(`No se puede eliminar un usuario ${empleadoRol.idUsuarioTipo}`);
        }
        const destroyedUsuario = await usuariosDataBase.destroy(idUsuario);
        return destroyedUsuario;
    } catch (error) {
        console.error("Error al eliminar el usuario en la base de datos:", error.message);
        throw new Error("No se pudo eliminar el usuario en la base de datos de datos");
    }
};