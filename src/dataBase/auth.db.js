import pool from '../dataBase/dataBase.js';

export const findUser = async (email, password) => {
    try {
        const [rows] = await pool.query(`
            SELECT u.idUsuario, u.nombre, u.apellido, u.correoelectronico, ut.descripcion AS idUsuarioTipo, u.activo 
            FROM usuarios u 
            INNER JOIN usuariostipo ut ON u.idUsuarioTipo = ut.idUsuarioTipo 
            WHERE u.activo = 1 
            AND u.correoElectronico = ? 
            AND u.contrasenia = SHA2(?,256)
        `, [email, password]);

        // Asegurarse de que el usuario existe
        if (rows.length === 0) {
            return null; // No se encontró el usuario
        }
        return rows[0]; // Devuelve el primer usuario
    } catch (error) {
        console.error("Error al buscar el usuario en la base de datos:", error.message);
        throw new Error("Error al buscar el usuario en la base de datos");
    }
};


export const findById = async (idUsuario) => {
    try {
        const [usuario] = await pool.query(`SELECT u.idUsuario, u.nombre, u.apellido, u.correoelectronico, ut.descripcion AS idUsuarioTipo, u.activo FROM usuarios u INNER JOIN usuariostipo ut ON u.idUsuarioTipo = ut.idUsuarioTipo WHERE u.idUsuario = ? AND u.activo = 1`, [idUsuario]);
        return usuario;
    } catch (error) {
        console.error("Error al buscar el usuario en la base de datos:", error.message);
        throw new Error("Error al buscar el usuario en la base de datos");
    }
};