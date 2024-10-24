import * as reclamosEstadosDataBase from '../dataBase/reclamosestados.db.js';

export const getAll = async () => {
    try {
        const allReclamosEstados = await reclamosEstadosDataBase.getAll();
        return allReclamosEstados;
    } catch (error) {
        console.error("Error al obtener todos los reclamos en la base de datos:", error.message);
        throw new Error('No se pudo obtener los reclamos estados en la base de datos');
    }
};

export const getById = async (idReclamoEstado) => {
    try {
        const reclamoEstadoById = await reclamosEstadosDataBase.getById(idReclamoEstado);
        return reclamoEstadoById;
    } catch (error) {
        console.error("Error al obtener el reclamo en la base de datos:", error.message);
        throw new Error('No se pudo obtener el reclamo estado en la base de datos');
    }
};

export const create = async (descripcion) => {
    try {
        const createdReclamoTipo = await reclamosEstadosDataBase.create(descripcion);
        return createdReclamoTipo;
    } catch (error) {
        console.error("Error al crear el reclamo en la base de datos:", error.message);
        throw new Error('No se pudo obtener el reclamo estado en la base de datos');
    }
};

export const update = async (idReclamoEstado, descripcion) => {
    try {
        await getById(idReclamoEstado);
        const updatedReclamoEstado = await reclamosEstadosDataBase.update(idReclamoEstado, descripcion);
        return updatedReclamoEstado;
    } catch (error) {
        console.error("Error al actualizar el reclamo en la base de datos:", error.message);
        throw new Error('No se pudo actualizar el reclamo estado en la base de datos');
    }
};

export const destroy = async (idReclamoEstado) => {
    try {
        await getById(idReclamoEstado);
        const destroyedReclamoEstado = await reclamosEstadosDataBase.destroy(idReclamoEstado);
        return destroyedReclamoEstado;
    } catch (error) {
        console.error("Error al eliminar el reclamo estado en la base de datos:", error.message);
        throw new Error('No se pudo eliminar el reclamo estado en la base de datos');
    }
};