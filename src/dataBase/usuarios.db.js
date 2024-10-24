import pool from '../dataBase/dataBase.js';

export const getAll = async (parameters) => {
    try {
        let consulta = `
            SELECT u.idUsuario, u.nombre, u.apellido, u.correoelectronico, ut.descripcion AS idUsuarioTipo, u.imagen FROM usuarios u INNER JOIN usuariostipo ut ON u.idUsuarioTipo = ut.idUsuarioTipo 
            WHERE u.activo = 1`;
        const conditions = [];
        const values = [];
        if (parameters.nombre) {
            conditions.push(`u.nombre LIKE ?`);
            values.push(`%${parameters.nombre}%`);
        }
        if (parameters.apellido) {
            conditions.push(`u.apellido LIKE ?`);
            values.push(`%${parameters.apellido}%`);
        }
        if (conditions.length > 0) {
            consulta += ' AND ' + conditions.join(' AND ');
        }
        consulta += ` ORDER BY ${parameters.order} ${parameters.asc} LIMIT ? OFFSET ?`;
        values.push(parameters.limit, parameters.offset);
        const [resultado] = await pool.query(consulta, values);
        return resultado;
    } catch (error) {
        console.error("Error al obtener todos los usuarios en la base de datos:", error.message);
        throw new Error('No se pudo obtener los usuarios en la base de datos');
    }
};

export const getById = async (idUsuario) => {
    try {
        const [usuarioExistente] = await pool.query(`
            SELECT u.nombre, u.apellido, u.correoelectronico, ut.descripcion AS idUsuarioTipo, u.imagen, u.activo 
            FROM usuarios u 
            INNER JOIN usuariostipo ut ON u.idUsuarioTipo = ut.idUsuarioTipo 
            WHERE u.idUsuario = ?`, [idUsuario]);
        if (usuarioExistente.length === 0) {
            throw new Error("Usuario no encontrado");
        }
        if (usuarioExistente[0].activo === 0) {
            throw new Error("El usuario está inactivo");
        }
        return usuarioExistente[0]; // Devuelve el primer usuario
    } catch (error) {
        console.error("Error al obtener el usuario en la base de datos:", error.message);
        throw new Error('Error al obtener el usuario en la base de datos');
    }
};

export const createByAdmin = async (usuario) => {
    try {
        const [consulta] = await pool.query(`INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen) VALUES (?, ?, ?, sha2(?, 256), 2, ?);`, [usuario.nombre, usuario.apellido, usuario.correoElectronico, usuario.contrasenia, usuario.imagen || null]);
        return await getById(consulta.insertId);
    } catch (error) {
        console.error("Error al crear el usuario en la base de datos:", error.message);
        throw new Error('No se pudo crear el usuario en la base de datos');
    }
};

export const createByCliente = async (usuario) => {
    try {
        const [consulta] = await pool.query(`INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen) VALUES (?, ?, ?, sha2(?, 256), 3, ?);`, [usuario.nombre, usuario.apellido, usuario.correoElectronico, usuario.contrasenia, usuario.imagen || null]);
        return await getById(consulta.insertId);
    } catch (error) {
        console.error("Error al crear el usuario en la base de datos:", error.message);
        throw new Error('No se pudo crear el usuario en la base de datos');
    }
};

export const update = async (idUsuario, usuario) => {
    try {
        // Crear dinámicamente la consulta de actualización
        let campos = [];
        let valores = [];
        if (usuario.nombre) {
            campos.push("nombre = ?");
            valores.push(usuario.nombre);
        }
        if (usuario.apellido) {
            campos.push("apellido = ?");
            valores.push(usuario.apellido);
        }
        if (usuario.correoElectronico) {
            campos.push("correoElectronico = ?");
            valores.push(usuario.correoElectronico);
        }
        if (usuario.contrasenia) {
            campos.push("contrasenia = sha2(?, 256)");
            valores.push(usuario.contrasenia);
        }
        if (usuario.imagen !== undefined) {
            campos.push("imagen = ?");
            valores.push(usuario.imagen || null);
        }
        if (campos.length === 0) {
            throw new Error("No se proporcionaron campos para actualizar");
        }
        valores.push(idUsuario);
        const [consulta] = await pool.query(
            `UPDATE usuarios SET ${campos.join(", ")} WHERE idUsuario = ? AND activo = 1;`,
            valores
        );
        if (consulta.affectedRows === 0) {
            throw new Error("El usuario no se pudo actualizar");
        }
        return await getById(idUsuario);
    } catch (error) {
        console.error("Error al actualizar el usuario en la base de datos:", error.message);
        throw new Error('No se pudo actualizar el usuario en la base de datos');
    }
};


export const destroy = async (idUsuario) => {
    try {
        const [consulta] = await pool.query(`UPDATE usuarios SET activo = 0 WHERE idUsuario = ?`, [idUsuario]);
        if (consulta.affectedRows === 0) {
            throw new Error("No se pudo eliminar el usuario");
        }
        return true;
    } catch (error) {
        console.error("Error al eliminar el usuario en la base de datos:", error);
        throw new Error("Error al eliminar el usuario en la base de datos");
    }
};