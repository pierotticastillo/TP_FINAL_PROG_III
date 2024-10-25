import express from "express";
import * as usuariosOficinasController from "../../controllers/usuariosoficinas.controller.js"

const router = express.Router();

router.get("/", usuariosOficinasController.getAll);

router.get("/:idUsuarioOficina", usuariosOficinasController.getById);

router.post("/", usuariosOficinasController.create);

router.patch("/actualizacion", usuariosOficinasController.update);

router.patch("/eliminacion", usuariosOficinasController.destroy);

export default router;
