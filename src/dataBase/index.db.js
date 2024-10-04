import pool from '../dataBase/dataBase.js';

export const testerDB = async () => {
    try {
        const [resultado] = await pool.query('SELECT 1+1 AS result');
        return resultado;
    } catch (error) {
        console.error("Error al crear el usuario en la base de datos:", error);
        throw error;
    }
};
