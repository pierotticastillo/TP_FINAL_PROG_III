import * as estadisticaDataBase from "../dataBase/estadistica.db.js";
import PDFDocument from 'pdfkit';

export const getEstadistica = async () => {
    try {
        const allEstadisticas = await estadisticaDataBase.getEstadistica();
        return allEstadisticas;
    } catch (error) {
        console.error("Error al obtener todas las oficinas en la base de datos:", error.message);
        throw new Error("No se pudo obtener las oficinas en la base de datos");
    }
};

export const generateCSV = async () => {
    const results = await getEstadistica(); // Obtener los datos de estadística
    let csvContent = 'INFORME DE RECLAMOS POR ESTADO\n\n'; // Título con dos saltos de línea
    csvContent += 'Estado;Total de Reclamos\n'; // Encabezados de columnas
    // Agregar los datos
    results.forEach(row => {
        csvContent += ` ${row.Estado};${row.Total} \n`;
    });
    // Agregar total general
    const totalReclamos = results.reduce((sum, row) => sum + row.Total, 0);
    csvContent += `\nTotal General;${totalReclamos}`;
    // Agregar BOM para caracteres especiales
    const BOM = '\uFEFF';
    const finalContent = BOM + csvContent;
    return finalContent;
};

export const generatePDF = async () => {
    const doc = new PDFDocument();
    const results = await getEstadistica();

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

    return doc;
};