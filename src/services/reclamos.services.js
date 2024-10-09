import * as reclamosDataBase from '../dataBase/reclamos.db.js';

export const getAllByEmployee = async (idUsuario) => {
    try {
        const allReclamos = await reclamosDataBase.getAllByEmployee(idUsuario);
        return allReclamos;
    } catch (error) {
        console.error("Error al obtener todos los reclamos en la base de datos:", error.message);
        throw new Error("Error al obtener todos los reclamos en la base de datos");
    }
};

export const getAllByUser = async (idReclamo) => {
    try {
        const reclamosByUser = await reclamosDataBase.getAllByUser(idReclamo);
        return reclamosByUser;
    } catch (error) {
        console.error("Error al obtener los reclamos de un usuario en la base de datos:", error.message);
        throw new Error("No se pudieron obtener los reclamos de un usuario en la base de datos");
    }

}

export const getById = async (idReclamo) => {
    try {
        const reclamoById = await reclamosDataBase.getById(idReclamo);
        return reclamoById;
    } catch (error) {
        console.error("Error al obtener el reclamo en la base de datos:", error.message);
        throw new Error("No se pudo obtener el reclamo en la base de datos");
    }
};

export const create = async (reclamo) => {
    try {
        const createdReclamo = await reclamosDataBase.create(reclamo);
        return createdReclamo;
    } catch (error) {
        console.error("Error al crear el reclamo en la base de datos:", error.message);
        throw new Error("No se pudo crear el reclamo en la base de datos");
    }
};

export const updateUser = async (idReclamo, idUsuarioCreador) => {
    try {
        const updatedReclamo = await reclamosDataBase.updateUser(idReclamo, idUsuarioCreador);
        return updatedReclamo;
    } catch (error) {
        console.error("Error al actualizar el reclamo en la base de datos:", error);
        throw new Error("No se pudo actualizar el reclamo en la base de datos");
    }
};

export const updateEmployee = async (idReclamo, estado, idUsuario) => {
    try {
        const updatedReclamo = await reclamosDataBase.updateEmployee(idReclamo, estado, idUsuario);
        return updatedReclamo;
    } catch (error) {
        console.error("Error al actualizar el reclamo en la base de datos:", error);
        throw new Error("No se pudo actualizar el reclamo en la base de datos");
    }
};