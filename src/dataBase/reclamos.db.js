import pool from '../dataBase/dataBase.js';

export const getAllByEmployee = async (idUsuario) => {
    try {
        const [consulta] = await pool.query(`SELECT u.nombre, o.idOficina, o.nombre, r.idReclamo, r.asunto, r.fechaCreado, rt.descripcion, re.descripcion AS estadoReclamo FROM usuariosoficinas AS uo
        INNER JOIN usuarios AS u ON u.idUsuario = uo.idUsuario
        INNER JOIN oficinas AS o ON o.idOficina = uo.idOficina
        INNER JOIN reclamostipo AS rt ON rt.idReclamoTipo = o.idReclamoTipo
        INNER JOIN reclamos AS r ON r.idReclamoTipo = rt.idReclamoTipo
        INNER JOIN reclamosEstado re ON r.idReclamoEstado = re.idReclamoEstado
        WHERE uo.idUsuario = ?`, [idUsuario])
        if (consulta.length === 0) {
            throw new Error('El usuario no posee reclamos');
        }
        return consulta;
    } catch (error) {
        console.error("Error al obtener todos los reclamos en la base de datos:", error.message);
        throw new Error('No se pudo obtener los reclamos');
    }
};

export const getAllByUser = async (idUsuario) => {
    try {
        const [consulta] = await pool.query(`SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaCancelado, r.fechafinalizado, 
        rt.descripcion AS tipoReclamo, re.descripcion AS estadoReclamo, 
        uC.nombre AS creadorNombre, uF.nombre AS finalizadorNombre 
        FROM reclamos r 
        INNER JOIN reclamosTipo rt ON r.idReclamoTipo = rt.idReclamoTipo 
        INNER JOIN reclamosEstado re ON r.idReclamoEstado = re.idReclamoEstado 
        INNER JOIN usuarios uC ON r.idUsuarioCreador = uC.idUsuario 
        LEFT JOIN usuarios uF ON r.idUsuarioFinalizador = uF.idUsuario 
        WHERE r.idUsuarioCreador =?;`, [idUsuario]);
        if (consulta.length === 0) {
            throw new Error('El usuario no posee reclamos');
        }
        return consulta;
    } catch (error) {
        console.error("Error al obtener los reclamo en la base de datos:", error.message);
        throw new Error('No se pudo obtener los reclamos');
    }
};

export const getById = async (idReclamo) => {
    try {
        const [reclamoExistente] = await pool.query(`SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaCancelado, r.fechafinalizado, 
        rt.descripcion AS tipoReclamo, re.descripcion AS estadoReclamo, idUsuarioCreador, 
        uC.nombre AS creadorNombre, uF.nombre AS finalizadorNombre 
        FROM reclamos r 
        INNER JOIN reclamosTipo rt ON r.idReclamoTipo = rt.idReclamoTipo 
        INNER JOIN reclamosEstado re ON r.idReclamoEstado = re.idReclamoEstado 
        INNER JOIN usuarios uC ON r.idUsuarioCreador = uC.idUsuario 
        LEFT JOIN usuarios uF ON r.idUsuarioFinalizador = uF.idUsuario 
        WHERE idReclamo = ?;`, [idReclamo]);
        if (reclamoExistente.length === 0) {
            throw new Error('El reclamo no existe');
        }
        return reclamoExistente;
    } catch (error) {
        console.error("Error al obtener el reclamo en la base de datos:", error.message);
        throw new Error('No se pudo obtener el reclamo');
    }
};

export const create = async (reclamo) => {
    try {
        const [consulta] = await pool.query(`INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) 
        VALUES(?, ?, NOW(), 1, ?, ?)`, [reclamo.asunto, reclamo.descripcion, reclamo.idReclamoTipo, reclamo.idUsuarioCreador]);
        return await getById(consulta.insertId);
    } catch (error) {
        console.error("Error al crear el reclamo en la base de datos:", error.message);
        throw new Error("Error al crear el reclamo en la base de datos");
    }
};

export const updateUser = async (idReclamo, idUsuarioCreador) => {
    try {
        const updatedReclamo = await pool.query(
            `UPDATE reclamos SET fechaCancelado = NOW(), idReclamoEstado = 3 WHERE idReclamo = ? AND idReclamoEstado = 1 AND idUsuarioCreador = ?;`, [idReclamo, idUsuarioCreador]
        );
        if (updatedReclamo[0].affectedRows === 0) {
            throw new Error("No se puede cancelar el reclamo porque no está en estado 'creado' o no pertenece al cliente");
        }
        return await getById(idReclamo);
    } catch (error) {
        console.error("Error al cancelar el reclamo en la base de datos:", error.message);
        throw new Error("No se pudo cancelar el reclamo en la base de datos");
    }
};


export const updateEmployee = async (idReclamo, estado, idUsuario) => {
    try {        
        let query;
        let params;
        if (estado === 2) {
            query = `UPDATE reclamos SET idReclamoEstado = ? WHERE idReclamo = ? AND idReclamoEstado != 4 AND idReclamoEstado != 2;`;
            params = [estado, idReclamo];
        }
        else if (estado === 4) {
            query = `UPDATE reclamos SET idReclamoEstado = ?, fechaFinalizado = NOW(), idUsuarioFinalizador = ? WHERE idReclamo = ? AND idReclamoEstado = 2 AND idReclamoEstado != 4;`;
            params = [estado, idUsuario, idReclamo];
        }
        const result = await pool.query(query, params);
        // Verificación de si se actualizó el reclamo
        if (result[0].affectedRows === 0) {
            throw new Error("No se encontró el reclamo o no se pudo actualizar.");
        }
        return await getById(idReclamo);
    } catch (error) {
        console.error("Error al actualizar el estado del reclamo:", error.message);
        throw new Error("No se pudo actualizar el estado del reclamo en la base de datos.");
    }
};
