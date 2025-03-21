import * as reclamosDataBase from '../dataBase/reclamos.db.js';
import * as reclamosTipoService from '../services/reclamostipos.services.js'
import * as usuariosService from '../services/usuarios.services.js'
import * as correoService from '../services/notificaciones.service.js'
import * as oficinasService from '../services/oficinas.services.js'

export const getAllByEmployee = async (idUsuario) => {
    try {
        const allReclamos = await reclamosDataBase.getAllByEmployee(idUsuario);
        return allReclamos;
    } catch (error) {
        console.error("Error al obtener todos los reclamos en la base de datos:", error.message);
        throw new Error("Error al obtener todos los reclamos en la base de datos");
    }
};

export const getAllByUser = async (idReclamo) => {
    try {
        const reclamosByUser = await reclamosDataBase.getAllByUser(idReclamo);
        return reclamosByUser;
    } catch (error) {
        console.error("Error al obtener los reclamos de un usuario en la base de datos:", error.message);
        throw new Error("No se pudieron obtener los reclamos de un usuario en la base de datos");
    }

}

export const getById = async (idReclamo) => {
    try {
        const reclamoById = await reclamosDataBase.getById(idReclamo);
        return reclamoById;
    } catch (error) {
        console.error("Error al obtener el reclamo en la base de datos:", error.message);
        throw new Error("No se pudo obtener el reclamo en la base de datos");
    }
};

export const getByIdByUser = async (idReclamo, idUsuario) => {
    try {
        const reclamo = await getById(idReclamo);
        if (reclamo[0].idUsuarioCreador != idUsuario) {
            throw new Error("El reclamo no pertenece al cliente");
        }
        return reclamo;
    } catch (error) {
        console.error("Error al obtener los reclamos de un usuario en la base de datos:", error.message);
        throw new Error("No se pudieron obtener los reclamos de un usuario en la base de datos");
    }
}

export const create = async (reclamo) => {
    try {
        await reclamosTipoService.getById(reclamo.idReclamoTipo);
        const oficinas = await oficinasService.getAll() 
        const reclamosOficina = oficinas.find((r) => r.idReclamoTipo === reclamo.idReclamoTipo);
        if(!reclamosOficina){
            throw new Error("No hay oficinas con el tipo de reclamo");
        }
        const createdReclamo = await reclamosDataBase.create(reclamo);
        return createdReclamo;
    } catch (error) {
        console.error("Error al crear el reclamo en la base de datos:", error.message);
        throw new Error("No se pudo crear el reclamo en la base de datos");
    }
};

export const updateByUser = async (idReclamo, idUsuarioCreador) => {
    try {
        const reclamoActual = await getByIdByUser(idReclamo, idUsuarioCreador);
        console.log(reclamoActual);
        if (reclamoActual[0].estadoReclamo === "Cancelado") {
            throw new Error("El reclamo ya fue cancelado");
        }
        const updatedReclamo = await reclamosDataBase.updateByUser(idReclamo, idUsuarioCreador);
        const usuario = await usuariosService.getById(updatedReclamo[0].idUsuarioCreador)
        console.log(usuario);
        const datosCorreo = {
            nombre: usuario.nombre,
            correoElectronico: usuario.correoelectronico,
            reclamo: idReclamo,
            estado: updatedReclamo[0].estadoReclamo
        }
        console.log(datosCorreo);
        await correoService.enviarCorreo(datosCorreo)
        return updatedReclamo;
    } catch (error) {
        console.error("Error al actualizar el reclamo en la base de datos:", error);
        throw new Error("No se pudo actualizar el reclamo en la base de datos");
    }
};

export const updateByEmployee = async (idReclamo, estado, idUsuario) => {
    try {
        const reclamoActual = await getById(idReclamo);
        console.log(reclamoActual);
        if (reclamoActual[0].estadoReclamo === "Cancelado") {
            throw new Error("El reclamo ya fue cancelado");
        }
        const reclamosPertenecientes = await getAllByEmployee(idUsuario);
        // Verificar si el reclamo actual pertenece al usuario
        const reclamoDelEmpleado = reclamosPertenecientes.find(
            (r) => r.idReclamo === idReclamo
        );
        if (!reclamoDelEmpleado) {
            throw new Error("El reclamo no pertenece al empleado");
        }
        const updatedReclamo = await reclamosDataBase.updateByEmployee(idReclamo, estado, idUsuario);
        const usuario = await usuariosService.getById(updatedReclamo[0].idUsuarioCreador)
        console.log(usuario);
        const datosCorreo = {
            nombre: usuario.nombre,
            correoElectronico: usuario.correoelectronico,
            reclamo: idReclamo,
            estado: updatedReclamo[0].estadoReclamo
        }
        console.log(datosCorreo);
        await correoService.enviarCorreo(datosCorreo)
        return updatedReclamo;
    } catch (error) {
        console.error("Error al actualizar el reclamo en la base de datos:", error);
        throw new Error("No se pudo actualizar el reclamo en la base de datos");
    }
};