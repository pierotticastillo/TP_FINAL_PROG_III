import * as estadisticaDataBase from "../dataBase/estadistica.db.js";

export const getEstadistica = async () => {
    try {
        const allEstadisticas = await estadisticaDataBase.getEstadistica();
        return allEstadisticas;
    } catch (error) {
        console.error("Error al obtener todas las oficinas en la base de datos:", error.message);
        throw new Error("No se pudo obtener las oficinas en la base de datos");
    }
};

export const getCSV = async () => {
    try {
        const allEstadisticas = await estadisticaDataBase.getCSV();
        return allEstadisticas;
    } catch (error) {
        console.error("Error al obtener todas las oficinas en la base de datos:", error.message);
        throw new Error("No se pudo obtener las oficinas en la base de datos");
    }
};

export const getPDF = async () => {
    try {
        const allEstadisticas = await estadisticaDataBase.getPDF();
        return allEstadisticas;
    } catch (error) {
        console.error("Error al obtener todas las oficinas en la base de datos:", error.message);
        throw new Error("No se pudo obtener las oficinas en la base de datos");
    }
};