import * as reclamosTiposDataBase from '../dataBase/reclamostipos.db.js';

export const getAll = async() => {
    try {
        const allReclamosTipos = await reclamosTiposDataBase.getAll();
        return allReclamosTipos;
    } catch (error) {
        console.error("Error al obtener todos los reclamos en la base de datos:", error.message);
        throw new Error('No se pudo obtener los reclamos tipos en la base de datos');
    }
};

export const getById = async(idReclamoTipo) => {
    try {
        const reclamoTipoById = await reclamosTiposDataBase.getById(idReclamoTipo);
        return reclamoTipoById;
    } catch (error) {
        console.error("Error al obtener el tipo de reclamo en la base de datos:", error.message);
        throw new Error('No se pudo obtener el tipo de reclamo en la base de datos');
    }
};

export const create = async(descripcion) => {
    try {
        const createdReclamoTipo = await reclamosTiposDataBase.create(descripcion);
        return createdReclamoTipo;
    } catch (error) {
        console.error("Error al crear el tipo de reclamo en la base de datos:", error.message);
        throw new Error('No se pudo crear el tipo de reclamo en la base de datos');
    }
};

export const update = async(idReclamoTipo, descripcion) => {
    try {
        const updatedReclamoTipo = await reclamosTiposDataBase.update(idReclamoTipo, descripcion);
        return updatedReclamoTipo;
    } catch (error) {
        console.error("Error al actualizar el tipo de reclamo en la base de datos:", error.message);
        throw new Error('No se pudo actualizar el tipo de reclamo en la base de datos');
    }
};

export const destroy = async(idReclamoTipo) => {
    try {
        const destroyedReclamoTipo = await reclamosTiposDataBase.destroy(idReclamoTipo);
        return destroyedReclamoTipo;
    } catch (error) {
        console.error("Error al eliminar el tipo de reclamo en la base de datos:", error.message);
        throw new Error('No se pudo eliminar el tipo de reclamo en la base de datos');
    }
};
