import * as oficinaDataBase from "../dataBase/oficinas.db.js"
import * as reclamoTipoService from "../services/reclamostipos.services.js"

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
        await reclamoTipoService.getById(oficina.idReclamoTipo);
        const allOficinas = await getAll();
        const oficinaConTipoReclamo = allOficinas.find(
            (o) => o.idReclamoTipo === oficina.idReclamoTipo
        );        
        if (oficinaConTipoReclamo) {
            throw new Error("Ya existe una oficina con el tipo de reclamo");
        }
        const createdOficina = await oficinaDataBase.create(oficina);
        return createdOficina;
    } catch (error) {
        console.error("Error al crear la oficina en la base de datos:", error.message);
        throw new Error("No se pudo crear la oficina en la base de datos");
    }
};

export const update = async (oficina) => {
    try {
        await getById(oficina.idOficina);
        await reclamoTipoService.getById(oficina.idReclamoTipo);
        const allOficinas = await getAll();
        const oficinaConTipoReclamo = allOficinas.find(
            (o) => o.idReclamoTipo === oficina.idReclamoTipo
        );        
        if (oficinaConTipoReclamo) {
            throw new Error("Ya existe una oficina con el tipo de reclamo");
        }        
        const updatedOficina = await oficinaDataBase.update(oficina);
        return updatedOficina;
    } catch (error) {
        console.error("Error al actualizar la oficina en la base de datos:", error.message);
        throw new Error("No se pudo actualizar la oficina en la base de datos");
    }
};

export const destroy = async (idOficina) => {
    try {        
        await getById(idOficina);
        const destroyedOficina = await oficinaDataBase.destroy(idOficina);
        return destroyedOficina;
    } catch (error) {
        console.error("Error al eliminar la oficina en la base de datos:", error.message);
        throw new Error("No se pudo eliminar la oficina en la base de datos");
    }
};
