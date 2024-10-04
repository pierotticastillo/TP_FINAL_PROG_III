import * as usuariosOficinasDataBase from "../dataBase/usuariosOficinas.db.js";

export const getAll = async () => {
    try {
        const allUsuariosOficinas = await usuariosOficinasDataBase.getAll();
        return allUsuariosOficinas;
    } catch (error) {
        console.error("Error al obtener todos los usuarios en la base de datos:", error.message);
        throw new Error("No se pudo obtener los usuarios en la base de datos");
    }
};

export const getById = async (idUsuarioOficina) => {
    try {
        const usuarioOficinaById = await usuariosOficinasDataBase.getById(idUsuarioOficina);
        return usuarioOficinaById;
    } catch (error) {
        console.error("Error al obtener el usuario en la base de datos:", error.message);
        throw new Error("No se pudo obtener el usuario en la base de datos");
    }
};

export const create = async (usuarioOficina) => {
    try {
        const createdUsuarioOficina = await usuariosOficinasDataBase.create(usuarioOficina);
        return createdUsuarioOficina;
    } catch (error) {
        console.error("Error al crear el usuario en la base de datos:", error.message);
        throw new Error("No se pudo crear el usuario en la base de datos");
    }
};

export const update = async (idUsuarioOficina, usuarioOficina) => {
    try {
        const updatedUsuarioOficina = await usuariosOficinasDataBase.update(idUsuarioOficina, usuarioOficina);
        return updatedUsuarioOficina;
    } catch (error) {
        console.error("Error al actualizar el usuario en la base de datos:", error.message);
        throw new Error("No se pudo actualizar el usuario en la base de datos");
    }
};

export const destroy = async (idUsuarioOficina) => {
    try {
        const deletedUsuarioOficina = await usuariosOficinasDataBase.destroy(idUsuarioOficina);
        return deletedUsuarioOficina;
    } catch (error) {
        console.error("Error al eliminar el usuario en la base de datos:", error.message);
        throw new Error("No se pudo eliminar el usuario en la base de datos");
    }
};