import * as estadisticaServices from '../services/estadistica.services.js';
import { Parser } from 'json2csv';
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
        const results = await estadisticaServices.getCSV();

        if (!results || results.length === 0) {
            return res.status(404).send('No se encontraron reclamos.');
        }

        // Crear el contenido del CSV manualmente
        let csvContent = 'INFORME DE RECLAMOS POR ESTADO\n\n'; // Título con dos saltos de línea
        csvContent += 'Estado;Total de Reclamos\n'; // Encabezados de columnas

        // Agregar los datos
        results.forEach(row => {
            csvContent += `${row.Estado};${row.Total}\n`;
        });

        // Agregar total general
        const totalReclamos = results.reduce((sum, row) => sum + row.Total, 0);
        csvContent += `\nTotal General;${totalReclamos}`;

        // Agregar BOM para caracteres especiales
        const BOM = '\uFEFF';
        const finalContent = BOM + csvContent;

        res.header('Content-Type', 'text/csv; charset=utf-8');
        res.attachment('estadisticaReclamos.csv');
        res.send(finalContent);

    } catch (error) {
        console.error("Error al generar CSV:", error.message);
        res.status(500).send('Error al generar el informe CSV.');
    }
};
export const downloadPDF = async (req, res) => {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=estadisticaReclamos.pdf');

    try {
        const results = await estadisticaServices.getPDF();
        if (!results || results.length === 0) {
            return res.status(404).send('No se encontraron reclamos.');
        }

        // Título principal
        doc.fontSize(25).text('Informe de Reclamos por Estado', { align: 'center' });
        doc.moveDown();

        // Línea separadora
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown();

        // Encabezados de la tabla
        doc.fontSize(14).font('Helvetica-Bold').text('Estado', 50, doc.y, { width: 200, align: 'left' });
        doc.text('Total', 300, doc.y, { width: 200, align: 'right' });
        doc.moveDown();

        // Línea separadora
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown();

        // Datos de los reclamos
        doc.fontSize(12).font('Helvetica');
        results.forEach(row => {
            doc.text(row.Estado, 50, doc.y, { width: 200, align: 'left' });
            doc.text(row.Total.toString(), 300, doc.y, { width: 200, align: 'right' });
            doc.moveDown();
        });

        // Línea separadora final
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    } catch (error) {
        console.error("Error al generar PDF:", error.message);
        res.status(500).send('Error al generar el informe PDF.');
    }

    doc.end();
    doc.pipe(res);
};