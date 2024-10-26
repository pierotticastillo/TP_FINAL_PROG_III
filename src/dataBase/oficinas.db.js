import pool from '../dataBase/dataBase.js';

export const getAll = async () => {
    try {
        const [consulta] = await pool.query(`SELECT o.idOficina, o.nombre, o.idReclamoTipo,rt.descripcion AS tipoReclamo, o.activo FROM oficinas o INNER JOIN reclamosTipo rt ON o.idReclamoTipo = rt. idReclamoTipo WHERE o.activo = 1;`);
        if (consulta.length === 0) {
            throw new Error('Las oficina no fueron encontradas');
        }
        return consulta;
    } catch (error) {
        console.error("Error al obtener todas las oficinas en la base de datos:", error.message);
        throw new Error('No se pudieron obtener las oficinas');
    }
};

export const getById = async (idOficina) => {
    try {
        const [oficinaExistente] = await pool.query(`
            SELECT o.idOficina, o.nombre, o.idReclamoTipo,rt.descripcion AS tipoReclamo, o.activo FROM oficinas o INNER JOIN reclamosTipo rt ON o.idReclamoTipo = rt.idReclamoTipo WHERE o.activo = 1 AND o.idOficina = ?`, [idOficina]);
        if (oficinaExistente.length === 0) {
            throw new Error('La oficina no existe o está inactiva');
        }
        return oficinaExistente;
    } catch (error) {
        console.error("Error al obtener la oficina en la base de datos:", error.message);
        throw new Error('No se pudo obtener la oficina');
    }
};

export const create = async (oficina) => {
    try {
        const [consulta] = await pool.query(`INSERT INTO oficinas (nombre, idReclamoTipo) VALUES (?,?);`, [oficina.nombre, oficina.idReclamoTipo]);
        return await getById(consulta.insertId);
    } catch (error) {
        console.error("Error al crear la oficina en la base de datos:", error.message);
        throw new Error('No se pudo crear la oficina');
    }
};

export const update = async (oficina) => {
    try {        
        const [consulta] = await pool.query(`UPDATE oficinas SET nombre =?, idReclamoTipo =? WHERE idOficina =?;`, [oficina.nombre, oficina.idReclamoTipo, oficina.idOficina]);
        if (consulta.affectedRows === 0) {
            throw new Error('La oficina no se pudo actualizar');
        }
        return await getById(oficina.idOficina);
    } catch (error) {
        console.error("Error al actualizar la oficina en la base de datos:", error.message);
        throw new Error('No se pudo actualizar la oficina');
    }
};

export const destroy = async (idOficina) => {
    try {        
        const [consulta] = await pool.query(`UPDATE oficinas SET activo = 0 WHERE idOficina = ?;`,[idOficina]);
        if (consulta.affectedRows === 0) {
            throw new Error('No se pudo eliminar la oficina');
        }
        return true;
    } catch (error) {
        console.error("Error al inactivar oficinas en la base de datos:", error.message);
        throw new Error('No se pudieron inactivar las oficinas')
    }
};
