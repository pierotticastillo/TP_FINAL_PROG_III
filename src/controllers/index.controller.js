import { testerDB } from "../dataBase/index.db.js";

export const testerController = async (req, res) => {
    try {
        const resultado = await testerDB();
        res.status(200).json({ estado: 'OK', dato: resultado })

    } catch (exec) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    };

}
