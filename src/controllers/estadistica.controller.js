import * as estadisticaServices from '../services/estadistica.services.js';
import PDFDocument from 'pdfkit';

export const getEstadistica = async (req, res) => {
    try {
        const resultado = await estadisticaServices.getEstadistica();
        res.status(200).json({ estado: 'OK', dato: resultado });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ estado: "Falla", mensaje: "Error en el servidor", error: error.message });
    }
};

export const downloadCSV = async (req, res) => {
    try {
        res.header('Content-Type', 'text/csv; charset=utf-8');
        res.attachment('estadisticaReclamos.csv');
        res.send(await estadisticaServices.generateCSV());
    } catch (error) {
        console.error("Error al generar CSV:", error.message);
        res.status(500).send('Error al generar el informe CSV.');
    }
};

export const downloadPDF = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=estadisticaReclamos.pdf');
        const pdfStream = await estadisticaServices.generatePDF();
        pdfStream.pipe(res);
        pdfStream.end();
    } catch (error) {
        console.error("Error al generar PDF:", error.message);
        res.status(500).send('Error al generar el informe PDF.');
    }
};