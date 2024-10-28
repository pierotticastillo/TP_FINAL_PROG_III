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

export const getFile = async () => {
    try {
        const allEstadisticas = await estadisticaDataBase.getFile();
        return allEstadisticas;
    } catch (error) {
        console.error("Error al obtener todas las oficinas en la base de datos:", error.message);
        throw new Error("No se pudo obtener las oficinas en la base de datos");
    }
};
