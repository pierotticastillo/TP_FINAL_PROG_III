import pool from '../dataBase/dataBase.js';

export const getAll = async () => {
    try {
        const [consulta] = await pool.query(`SELECT * FROM usuariosoficinas WHERE activo = 1;`);
        return consulta;
    } catch (error) {
        console.error("Error al obtener todos los usuarios en la base de datos:", error.message);
        throw new Error('No se pudieron obtener los usuarios');
    }
};

export const getById = async (idUsuarioOficina) => {
    try {
        const [usuarioOficinaExistente] = await pool.query(`SELECT * FROM usuariosoficinas WHERE idUsuarioOficina =? AND activo = 1`, [idUsuarioOficina]);
        if (usuarioOficinaExistente.length === 0) {
            throw new Error('El usuario oficina no existe');
        }
        if (usuarioOficinaExistente[0].activo === 0) {
            throw new Error('El usuario oficina no está inactivo');
        }
        return usuarioOficinaExistente;
    } catch (error) {
        console.error("Error al obtener el usuario oficina en la base de datos:", error.message);
        throw new Error('No se pudo obtener el usuario oficina en la base de datos');
    }
};

export const create = async (usuarioOficina) => {
    try {
        const [consulta] = await pool.query(`INSERT INTO usuariosoficinas (idUsuario, idOficina) VALUES (?,?)`, [usuarioOficina.idUsuario, usuarioOficina.idOficina]);
        return getById(consulta.insertId);
    } catch (error) {
        console.error("Error al crear el usuario en la base de datos:", error.message);
        throw new Error('No se pudo crear el usuario en la base de datos');
    }
};

export const update = async (idUsuarioOficina, usuarioOficina) => {
    try {
        const [usuarioOficinaExistente] = await pool.query(`SELECT * FROM usuariosoficinas WHERE idUsuarioOficina = ?`, [idUsuarioOficina]);
        if (usuarioOficinaExistente.length === 0) {
            throw new Error('El usuario oficina no existe');
        }
        if (usuarioOficinaExistente[0].activo === 0) {
            throw new Error('El usuario oficina no está inactivo y no puede ser actualizado');
        }
        const [consulta] = await pool.query(`UPDATE usuariosoficinas SET idUsuario = ?, idOficina = ? WHERE idUsuarioOficina = ?`, [usuarioOficina.idUsuario, usuarioOficina.idOficina, idUsuarioOficina]);
        if (consulta.affectedRows === 0) {
            throw new Error('El usuario oficina no existe');
        }
        return getById(idUsuarioOficina);
    } catch (error) {
        console.error("Error al actualizar el usuario en la base de datos:", error.message);
        throw new Error('No se pudo actualizar el usuario en la base de datos');
    }
};

export const destroy = async (idUsuarioOficina) => {
    try {
        const [usuarioOficinaExistente] = await pool.query(`SELECT * FROM usuariosoficinas WHERE idUsuarioOficina = ?`, [idUsuarioOficina]);
        if (usuarioOficinaExistente.length === 0) {
            throw new Error('El usuario oficina no existe');
        }
        if (usuarioOficinaExistente[0].activo === 0) {
            throw new Error('El usuario oficina está inactivo y no puede ser eliminado');
        }
        const consulta = await pool.query(`UPDATE usuariosoficinas SET activo = 0 WHERE idUsuarioOficina =?`, [idUsuarioOficina]);
        if (consulta.affectedRows === 0) {
            throw new Error('No se pudo eliminar el estado del usuario oficina');
        }
        return usuarioOficinaExistente;
    } catch (error) {
        console.error("Error al eliminar el usuario", error.message);
        throw new Error('No se pudo eliminar el usuario en la base de datos');
    }
};
