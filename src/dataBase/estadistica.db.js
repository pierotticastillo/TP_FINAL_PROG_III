import pool from '../dataBase/dataBase.js';

export const getEstadistica = async () => {
    try {
        const [consulta] = await pool.query(`CALL obtenerReclamosPorEstado();`);
        return consulta[0];

    } catch (error) {
        console.error("Error al obtener las estadísticas en la base de datos:", error.message);
        throw new Error('No se pudieron obtener las estadísticas en la base de datos');
    }
};

export const getCSV = async () => {
    try {
        const [consulta] = await pool.query(`SELECT re.descripcion AS Estado, COUNT(r.idReclamo) AS Total FROM reclamos AS r INNER JOIN reclamosestado AS re ON r.idReclamoEstado = re.idReclamoEstado GROUP BY re.descripcion;;`);
        return consulta;
    } catch (error) {
        console.error("Error al obtener las estadísticas en la base de datos:", error.message);
        throw new Error('No se pudieron obtener las estadísticas en la base de datos');
    }
};

export const getPDF = async () => {
    try {
        const [consulta] = await pool.query(` SELECT re.descripcion AS Estado, COUNT(r.idReclamo) AS Total FROM reclamos AS r
            INNER JOIN reclamosestado AS re ON r.idReclamoEstado = re.idReclamoEstado GROUP BY re.descripcion;`);
        return consulta;

    } catch (error) {
        console.error("Error al obtener las estadísticas en la base de datos:", error.message);
        throw new Error('No se pudieron obtener las estadísticas en la base de datos');
    }
};
