import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';
import * as config from '../../config.js';

export const enviarCorreo = async (datosCorreo) => {
    // Verificar que los datos del correo son correctos
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const plantillaPath = path.join(__dirname, '../utiles/handlebars/plantilla.hbs');

    const plantilla = fs.readFileSync(plantillaPath, 'utf-8');

    // Compilar la plantilla con handlebars y verificar los datos
    const template = handlebars.compile(plantilla);
    const datos = {
        nombre: datosCorreo.nombre,  // Cambié `cliente` por `nombre` según tu variable
        reclamo: datosCorreo.reclamo,
        estado: datosCorreo.estado
    };

    const correoHtml = template(datos);

    // Configuración del transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.USER_CORREO,
            pass: config.PASS_CORREO
        }
    });

    const mailOptions = {
        to: datosCorreo.correoElectronico,
        subject: "NOTIFICACION PROG3",
        html: correoHtml
    };

    try {
        // Verificar si se está intentando enviar el correo
        console.log('Enviando correo a:', datosCorreo.correoElectronico);
        const info = await transporter.sendMail(mailOptions);
        console.log('Respuesta del servidor de correo:', info.response);
        return { estado: true, mensaje: 'Correo electrónico enviado.' };
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return { estado: false, mensaje: 'Correo electrónico no enviado.' };
    }
}
