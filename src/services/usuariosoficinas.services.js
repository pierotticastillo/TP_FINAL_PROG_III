import * as usuariosOficinasDataBase from "../dataBase/usuariosOficinas.db.js";
import * as usuariosServices from "../services/usuarios.services.js";
import * as oficinaServices from "../services/oficinas.services.js";

export const getAllAsigned = async () => {
    try {
        const allUsuariosOficinas = await usuariosOficinasDataBase.getAllAsigned();
        return allUsuariosOficinas;
    } catch (error) {
        console.error("Error al obtener todos los usuarios en la base de datos:", error.message);
        throw new Error("No se pudo obtener los usuarios en la base de datos");
    }
};

export const getAllUnasigned = async () => {
    try {
        const allUsuariosOficinas = await usuariosOficinasDataBase.getAllUnasigned();
        return allUsuariosOficinas;
    } catch (error) {
        console.error("Error al obtener todos los usuarios en la base de datos:", error.message);
        throw new Error("No se pudo obtener los usuarios en la base de datos");
    }
};


export const getById = async (idUsuarioOficina) => {
    try {
        const usuarioOficinaById = await usuariosOficinasDataBase.getById(idUsuarioOficina);
        return usuarioOficinaById;
    } catch (error) {
        console.error("Error al obtener el usuario en la base de datos:", error.message);
        throw new Error("No se pudo obtener el usuario en la base de datos");
    }
};

export const create = async (usuarioOficina) => {
    try {
        const usuario = await usuariosServices.getById(usuarioOficina.idUsuario);
        // Comprueba si el usuario tiene el rol de empleado
        if (usuario.idUsuarioTipo !== 'Empleado') { // Ajusta la verificación según cómo se define el rol de empleado
            throw new Error('El usuario no tiene el rol de empleado');
        }
        const oficina = await oficinaServices.getById(usuarioOficina.idOficina)
        if (!oficina || oficina.length === 0) {
            throw new Error('La oficina no existe o está inactiva');
        }
        const allUsuariosOficinas = await getAll();
        const existeEmpleadoOficina = allUsuariosOficinas.find((uo) => uo.idUsuario === usuarioOficina.idUsuario && uo.idOficina === usuarioOficina.idOficina);
        if (existeEmpleadoOficina) {
            throw new Error('El empleado ya pertenece a esta oficina');
        }
        const createdUsuarioOficina = await usuariosOficinasDataBase.create(usuarioOficina);
        return createdUsuarioOficina;
    } catch (error) {
        console.error("Error al crear el usuario en la base de datos:", error.message);
        throw new Error("No se pudo crear el usuario en la base de datos");
    }
};

export const update = async (usuarioOficina) => {
    try {
        await getById(usuarioOficina.idUsuarioOficina);
        const usuario = await usuariosServices.getById(usuarioOficina.idUsuario);
        // Comprueba si el usuario tiene el rol de empleado
        if (usuario.idUsuarioTipo !== 'Empleado') { // Ajusta la verificación según cómo se define el rol de empleado
            throw new Error('El usuario no tiene el rol de empleado');
        }
        const oficina = await oficinaServices.getById(usuarioOficina.idOficina)
        if (!oficina || oficina.length === 0) {
            throw new Error('La oficina no existe o está inactiva');
        }
        const allUsuariosOficinas = await getAll();
        const existeEmpleadoOficina = allUsuariosOficinas.find((uo) => uo.idUsuario === usuarioOficina.idUsuario && uo.idOficina === usuarioOficina.idOficina);
        if (existeEmpleadoOficina) {
            throw new Error('El empleado ya pertenece a esta oficina');
        }
        const updatedUsuarioOficina = await usuariosOficinasDataBase.update(usuarioOficina);
        return updatedUsuarioOficina;
    } catch (error) {
        console.error("Error al actualizar el usuario en la base de datos:", error.message);
        throw new Error("No se pudo actualizar el usuario en la base de datos");
    }
};

export const destroy = async (idUsuarioOficina) => {
    try {
        const deletedUsuarioOficina = await usuariosOficinasDataBase.destroy(idUsuarioOficina);
        return deletedUsuarioOficina;
    } catch (error) {
        console.error("Error al eliminar el usuario en la base de datos:", error.message);
        throw new Error("No se pudo eliminar el usuario en la base de datos");
    }
};