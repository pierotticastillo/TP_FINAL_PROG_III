import pool from '../dataBase/dataBase.js';

export const getAll = async () => {
    try {
        const consulta = await pool.query(`SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaCancelado, r.fechafinalizado, 
        rt.descripcion AS tipoReclamo, re.descripcion AS estadoReclamo, 
        uC.nombre AS creadorNombre, uF.nombre AS finalizadorNombre 
        FROM reclamos r 
        INNER JOIN reclamosTipo rt ON r.idReclamoTipo = rt.idReclamoTipo 
        INNER JOIN reclamosEstado re ON r.idReclamoEstado = re.idReclamoEstado 
        INNER JOIN usuarios uC ON r.idUsuarioCreador = uC.idUsuario 
        LEFT JOIN usuarios uF ON r.idUsuarioFinalizador = uF.idUsuario;`);
        return consulta;
    } catch (error) {
        console.error("Error al obtener todos los reclamos en la base de datos:", error.message);
        throw new Error('No se pudo obtener los reclamos');
    }
};

export const getById = async (idReclamo) => {
    try {
        const [reclamoExistente] = await pool.query(`SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaCancelado, r.fechafinalizado, 
        rt.descripcion AS tipoReclamo, re.descripcion AS estadoReclamo, 
        uC.nombre AS creadorNombre, uF.nombre AS finalizadorNombre 
        FROM reclamos r 
        INNER JOIN reclamosTipo rt ON r.idReclamoTipo = rt.idReclamoTipo 
        INNER JOIN reclamosEstado re ON r.idReclamoEstado = re.idReclamoEstado 
        INNER JOIN usuarios uC ON r.idUsuarioCreador = uC.idUsuario 
        LEFT JOIN usuarios uF ON r.idUsuarioFinalizador = uF.idUsuario 
        WHERE idReclamo = ?;`, [idReclamo]);
        if(!reclamoExistente.length === 0){
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
        const consulta = await pool.query(`INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador) 
        VALUES(?, ?, NOW(), ?, ?, ?)`,[reclamo.asunto, reclamo.descripcion, reclamo.idReclamoEstado, reclamo.idReclamoTipo, reclamo.idUsuarioCreador]);
        return getById(consulta.insertId);
    } catch (error) {
        console.error("Error al crear el reclamo en la base de datos:", error.message);
        throw new Error("Error al crear el reclamo en la base de datos");
    }
};