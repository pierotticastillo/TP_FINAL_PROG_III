import * as oficinaDataBase from "../dataBase/oficinas.db.js"

export const getAll = async ()=>{
    try {
        const allOficinas = await oficinaDataBase.getAll();
        return allOficinas;
    } catch (error) {
        console.error("Error al obtener todas las oficinas en la base de datos:", error.message);
        throw new Error("No se pudo obtener las oficinas en la base de datos");
    }
};

export const getById = async (idOficina) => {
    try {
        const oficinaById = await oficinaDataBase.getById(idOficina);
        return oficinaById;
    } catch (error) {
        console.error("Error al obtener la oficina en la base de datos:", error.message);
        throw new Error("No se pudo obtener la oficina en la base de datos");
    }
};

export const create = async (oficina) => {
    try {
        const createdOficina = await oficinaDataBase.create(oficina);
        return createdOficina;
    } catch (error) {
        console.error("Error al crear la oficina en la base de datos:", error.message);
        throw new Error("No se pudo crear la oficina en la base de datos");
    }
};

export const update = async (idOficina, oficina) => {
    try {
        const updatedOficina = await oficinaDataBase.update(idOficina, oficina);
        return updatedOficina;
    } catch (error) {
        console.error("Error al actualizar la oficina en la base de datos:", error.message);
        throw new Error("No se pudo actualizar la oficina en la base de datos");
    }
};

export const destroy = async (idOficina) => {
    try {
        const destroyedOficina = await oficinaDataBase.destroy(idOficina);
        return destroyedOficina;
    } catch (error) {
        console.error("Error al eliminar la oficina en la base de datos:", error.message);
        throw new Error("No se pudo eliminar la oficina en la base de datos");
    }
};
