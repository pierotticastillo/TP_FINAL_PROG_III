import pool from "../dataBase/dataBase.js";

export const getAll = async () => {
    try {
        const [consulta] = await pool.query(`SELECT * FROM reclamostipo WHERE activo = 1;`);
        return consulta;
    } catch (error) {
        console.error("Error al obtener todos los tipos de reclamos en la base de datos:", error.message);
        throw new Error('No se pudieron obtener los tipos de reclamos');
    }
};

export const getById = async (idReclamoTipo) => {
    try {
        const [reclamoTipoExistente] = await pool.query(`SELECT * FROM reclamostipo WHERE idReclamoTipo = ?`, [idReclamoTipo]);
        if (reclamoTipoExistente.length === 0) {
            throw new Error('El tipo de reclamo no existe');
        }
        if (reclamoTipoExistente[0].activo === 0) {
            throw new Error('El tipo de reclamo está inactivo');
        }
        return reclamoTipoExistente;
    } catch (error) {
        console.error("Error al obtener el tipo de reclamo en la base de datos:", error.message);
        throw new Error('No se pudo obtener el tipo de reclamo en la base de datos');
    }
};

export const create = async (descripcion) => {
    try {
        const [consulta] = await pool.query(`INSERT INTO reclamostipo (descripcion) VALUES (?)`, [descripcion]);
        return await getById(consulta.insertId);
    } catch (error) {
        console.error("Error al crear el tipo de reclamo en la base de datos:", error.message);
        throw new Error('No se pudo crear el tipo de reclamo en la base de datos');
    }
};

export const update = async (idReclamoTipo, descripcion) => {
    try {
        const [consulta] = await pool.query(`UPDATE reclamostipo SET descripcion = ? WHERE idReclamoTipo = ? AND activo = 1;`, [descripcion, idReclamoTipo]);
        if (consulta.affectedRows === 0) {
            throw new Error('El tipo de reclamo no se pudo actualizar');
        }
        return await getById(idReclamoTipo);
    }
    catch (error) {
        console.error("Error al actualizar el tipo de reclamo en la base de datos:", error.message);
        throw new Error('No se pudo actualizar el tipo de reclamo en la base de datos');
    }
};

export const destroy = async (idReclamoTipo) => {
    try {
        const [consulta] = await pool.query(`UPDATE reclamostipo SET activo = 0 WHERE idReclamoTipo = ?;`, [idReclamoTipo]);
        if (consulta.affectedRows === 0) {
            throw new Error('El tipo de reclamo no se pudo eliminar');
        }
        return true;
    }
    catch (error) {
        console.error("Error al eliminar el tipo de reclamo en la base de datos:", error.message);
        throw new Error('No se pudo eliminar el tipo de reclamo en la base de datos');
    }
};