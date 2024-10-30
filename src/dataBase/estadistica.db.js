import pool from '../dataBase/dataBase.js';

export const getEstadistica = async () => {
    try {
        const [consulta] = await pool.query(`CALL obtenerReclamosPorEstado();`);
        if(consulta.length === 0) {
            throw new Error('No hay estados de reclamos disponibles');
        }
        return consulta[0];

    } catch (error) {
        console.error("Error al obtener las estadísticas en la base de datos:", error.message);
        throw new Error('No se pudieron obtener las estadísticas en la base de datos');
    }
};