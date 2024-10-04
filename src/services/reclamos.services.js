import * as reclamosDataBase from '../dataBase/reclamos.db.js';

export const getAll = async () => {
    try {
        const allReclamos = await reclamosDataBase.getAll();
        return allReclamos;
    } catch (error) {
        console.error("Error al obtener todos los reclamos en la base de datos:", error.message);
        throw new Error("Error al obtener todos los reclamos en la base de datos");
    }
};

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

export const update = async (idReclamo, reclamo) => {
    try {
        const updatedReclamo = await reclamosDataBase.update(idReclamo, reclamo);
        return updatedReclamo;
    } catch (error) {
        console.error("Error al actualizar el reclamo en la base de datos:", error);
        throw new Error("No se pudo actualizar el reclamo en la base de datos");
    }
};