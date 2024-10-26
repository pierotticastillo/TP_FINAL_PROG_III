import pool from '../dataBase/dataBase.js';

export const getAll = async () => {
    try {
        const [consulta] = await pool.query(`SELECT * FROM reclamosestado WHERE activo = 1;`);
        if(consulta.length === 0) {
            throw new Error('No hay estados de reclamos disponibles');
        }
        return consulta;
    } catch (error) {
        console.error("Error al obtener todos los reclamos en la base de datos:", error.message);
        throw new Error('No se pudo obtener los reclamos');
    }
};

export const getById = async (idReclamoEstado) => {
    try {
        const [reclamoEstadoExistente] = await pool.query(`SELECT * FROM reclamosestado WHERE idReclamoEstado = ?`, [idReclamoEstado]);
        if (reclamoEstadoExistente.length === 0) {
            throw new Error("El estado del reclamo no existe");
        }
        if (reclamoEstadoExistente[0].activo === 0) {
            throw new Error("El estado del reclamo está inactivo");
        }
        return reclamoEstadoExistente;
    } catch (error) {
        console.error("Error al obtener el estado del reclamo en la base de datos:", error.message);
        throw new Error('No se pudo obtener el estado del reclamo');
    }
};

export const create = async (descripcion) => {
    try {
        const [consulta] = await pool.query(`INSERT INTO reclamosestado (descripcion) 
        VALUES(?)`,[descripcion]);
        return await getById(consulta.insertId);
    } catch (error) {
        console.error("Error al crear el reclamo en la base de datos:", error.message);
        throw new Error('No se pudo crear el estado del reclamo en la base de datos');
    }
};

export const update = async (idReclamoEstado, descripcion) => {
    try {
        const [consulta] = await pool.query(`UPDATE reclamosestado SET descripcion = ? WHERE idReclamoEstado = ?;`, [descripcion, idReclamoEstado]);
        if(consulta.affectedRows === 0) {
            throw new Error("No se pudo actualizar el estado del reclamo en la base de datos");
        }
        return await getById(idReclamoEstado);
    } catch (error) {
        console.error("Error al actualizar el estado del reclamo en la base de datos:", error.message);
        throw new Error('No se pudo actualizar el estado del reclamo en la base de datos');
    }
};

export const destroy = async (idReclamoEstado) => {
    try {
        const [consulta] = await pool.query(`UPDATE reclamosestado SET activo = 0 WHERE idReclamoEstado = ?;`,[idReclamoEstado]);
        if(consulta.affectedRows === 0) {
            throw new Error("No se pudo eliminar el estado del reclamo en la base de datos");
        }
        return true;
    } catch (error) {
        console.error("Error al eliminar el estado del reclamo en la base de datos:", error.message);
        throw new Error("Error al eliminar el estado del reclamo en la base de datos");
    }
};