import pool from '../dataBase/dataBase.js';

export const getAllAsigned = async () => {
    try {
        const [consulta] = await pool.query(`SELECT uo.idUsuarioOficina, u.idUsuario,u.nombre AS nombreUsuario, u.apellido AS apellidoUsuario, u.correoElectronico, o.idOficina,o.nombre AS nombreOficina, uo.activo FROM usuariosOficinas uo INNER JOIN usuarios u ON uo.idUsuario = u.idUsuario INNER JOIN oficinas o ON uo.idOficina = o.idOficina WHERE uo.activo = 1;`);
        if(consulta.length === 0) {
            throw new Error('No hay usuarios oficinas registrados');
        }
        return consulta;
    } catch (error) {
        console.error("Error al obtener todos los usuarios en la base de datos:", error.message);
        throw new Error('No se pudieron obtener los usuarios');
    }
};

export const getAllUnasigned = async () => {
    try {
        const [consulta] = await pool.query(`SELECT u.idUsuario, u.nombre AS nombreUsuario, u.apellido AS apellidoUsuario, u.correoElectronico FROM usuarios u WHERE u.idUsuarioTipo = 2 AND NOT EXISTS (SELECT 1 FROM usuariosOficinas uo WHERE uo.idUsuario = u.idUsuario AND uo.activo = 1);`);
        if(consulta.length === 0) {
            throw new Error('No hay usuarios oficinas sin asignar');
        }
        return consulta;
    } catch (error) {
        console.error("Error al obtener todos los usuarios en la base de datos:", error.message);
        throw new Error('No se pudieron obtener los usuarios');
    }
};



export const getById = async (idUsuarioOficina) => {
    try {
        const [usuarioOficinaExistente] = await pool.query(`SELECT uo.idUsuarioOficina, u.nombre AS nombreUsuario, u.apellido AS apellidoUsuario, u.correoElectronico, o.nombre AS nombreOficina, uo.activo FROM usuariosOficinas uo INNER JOIN usuarios u ON uo.idUsuario = u.idUsuario INNER JOIN oficinas o ON uo.idOficina = o.idOficina WHERE uo.idUsuarioOficina = ? AND uo.activo = 1;`, [idUsuarioOficina]);
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
        return await getById(consulta.insertId);
    } catch (error) {
        console.error("Error al crear el usuario en la base de datos:", error.message);
        throw new Error('No se pudo crear el usuario en la base de datos');
    }
};

export const update = async (usuarioOficina) => {
    try {        
        const [consulta] = await pool.query(`UPDATE usuariosoficinas SET idUsuario = ?, idOficina = ? WHERE idUsuarioOficina = ?`, [usuarioOficina.idUsuario, usuarioOficina.idOficina, usuarioOficina.idUsuarioOficina]);
        if (consulta.affectedRows === 0) {
            throw new Error('El usuario oficina no existe');
        }
        return await getById(usuarioOficina.idUsuarioOficina);
    } catch (error) {
        console.error("Error al actualizar el usuario en la base de datos:", error.message);
        throw new Error('No se pudo actualizar el usuario en la base de datos');
    }
};

export const destroy = async (idUsuarioOficina) => {
    try {        
        const [consulta] = await pool.query(`UPDATE usuariosoficinas SET activo = 0 WHERE idUsuarioOficina =? AND activo = 1`, [idUsuarioOficina]);
        if (consulta.affectedRows === 0) {
            throw new Error('No se pudo eliminar el estado del usuario oficina');
        }
        return true;
    } catch (error) {
        console.error("Error al eliminar el usuario", error.message);
        throw new Error('No se pudo eliminar el usuario en la base de datos');
    }
};
