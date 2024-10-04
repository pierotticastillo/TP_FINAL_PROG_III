import express from "express";
import * as usuariosOficinasController from "../../controllers/usuariosoficinas.controller.js"

const router = express.Router();

router.get("/", usuariosOficinasController.getAll);

router.get("/:idUsuarioOficina", usuariosOficinasController.getById);

router.post("/", usuariosOficinasController.create);

router.patch("/:idUsuarioOficina", usuariosOficinasController.update);

router.delete("/:idUsuarioOficina", usuariosOficinasController.destroy);

export default router;
