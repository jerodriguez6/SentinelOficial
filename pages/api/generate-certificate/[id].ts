// pages/api/generate-certificate/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { getAuditById } from '../../../lib/audit-data';
import autoTable from 'jspdf-autotable';
import * as fs from 'fs';
import * as path from 'path';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// --- FUNCIÓN PARA AÑADIR LA MARCA DE AGUA ---
const addWatermark = (doc: jsPDF) => {
  try {
    const watermarkPath = path.resolve('./public', 'logo-b.png');
    if (!fs.existsSync(watermarkPath)) {
        console.warn(`WARN: No se encontró el archivo de la marca de agua en: ${watermarkPath}`);
        return;
    }
    const watermarkBuffer = fs.readFileSync(watermarkPath);
    const watermarkBase64 = watermarkBuffer.toString('base64');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const logoWidth = 120;
    const logoHeight = 120;
    const x = (pageWidth - logoWidth) / 2;
    const y = (pageHeight - logoHeight) / 2;
    const numberOfPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= numberOfPages; i++) {
      doc.setPage(i);
      doc.setGState(new (doc as any).GState({ opacity: 0.08 }));
      doc.addImage(watermarkBase64, 'PNG', x, y, logoWidth, logoHeight, 'watermark', 'NONE');
      doc.setGState(new (doc as any).GState({ opacity: 1 }));
    }
  } catch (e) {
      console.error(`ERROR: No se pudo añadir la marca de agua.`, e);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID de reporte inválido.' });
  }
  const auditData = getAuditById(id);
  if (!auditData) {
    return res.status(404).json({ error: 'Auditoría no encontrada.' });
  }

  try {
    const doc = new jsPDF();
    const {
      projectName, projectTicker, releaseDate, auditFirm, verdict,
      findingsSummary, keyFindings, auditHash, logo,
    } = auditData;

    // --- Títulos del documento ---
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('Certificado de Auditoría de Seguridad', 105, 30, { align: 'center' });
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text(`${projectName} (${projectTicker})`, 105, 45, { align: 'center' });

    // --- Posición inicial para el contenido dinámico (logo y tablas) ---
    let contentStartY = 50;

    // --- Logo de la Blockchain (debajo del nombre) ---
    if (logo) {
      try {
        const imageResponse = await fetch(logo);
        if (imageResponse.ok) {
          const imageBuffer = await imageResponse.arrayBuffer();
          const imageBase64 = Buffer.from(imageBuffer).toString('base64');
          const imageExtension = logo.split('.').pop()?.toLowerCase() || 'png';
          
          const logoWidth = 30;
          const logoHeight = 30;
          const logoX = (doc.internal.pageSize.getWidth() - logoWidth) / 2;

          doc.addImage(`data:image/${imageExtension};base64,${imageBase64}`, 'PNG', logoX, contentStartY, logoWidth, logoHeight);
          
          contentStartY += logoHeight + 10;
        } else {
          console.warn(`WARN: No se pudo obtener el logo para el reporte ${id}. URL: ${logo}. Estado: ${imageResponse.status}`);
          contentStartY += 10;
        }
      } catch (e) {
        console.error(`ERROR: Falló el fetch del logo para el reporte ${id}. URL: ${logo}`, e);
        contentStartY += 10;
      }
    } else {
        contentStartY += 10;
    }

    // --- Colores personalizados ---
    // ✅ CORRECCIÓN: Se añade 'as const' para que TypeScript infiera una tupla de longitud fija.
    const colorGris = [22, 26, 29] as [number, number, number];    // #161A1D
    const colorRojo = [216, 47, 50] as [number, number, number];   // #D82F32

    // --- Tablas y Pie de Página Fijo ---
    const pageHeight = doc.internal.pageSize.getHeight();
    const footerY = pageHeight - 15;

    autoTable(doc, {
      startY: contentStartY,
      head: [['Detalle', 'Información']],
      body: [
        ['ID del Reporte', id],
        ['Fecha de Emisión', releaseDate],
        ['Firma Auditora', auditFirm],
        ['Veredicto Final', verdict.title],
        ['Calificación', `${verdict.grade} (${verdict.score} / 100)`],
        ['Hash de Auditoría', auditHash],
      ],
      theme: 'grid',
      headStyles: { fillColor: colorRojo },
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Criticidad', 'Cantidad']],
      body: [
        ['Críticos', findingsSummary.critical],
        ['Altos', findingsSummary.high],
        ['Medios', findingsSummary.medium],
        ['Bajos', findingsSummary.low],
        ['Informativos', findingsSummary.informational],
      ],
      headStyles: { fillColor: colorGris },
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['ID', 'Descripción', 'Severidad', 'Estado']],
      body: keyFindings.map(f => [f.id, f.description, f.severity, f.status]),
      headStyles: { fillColor: colorGris },
      didDrawPage: (data) => {
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Generado el ${new Date().toLocaleString()}`, doc.internal.pageSize.getWidth() / 2, footerY, { align: 'center' });
      }
    });

    // --- AÑADIR MARCA DE AGUA A TODAS LAS PÁGINAS ---
    addWatermark(doc);

    // --- Generar y enviar el PDF ---
    const pdfBuffer = doc.output('arraybuffer');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="certificado-${id}.pdf"`);
    res.send(Buffer.from(pdfBuffer));

  } catch (error) {
    console.error(`ERROR FATAL al generar PDF para reporte ${id}:`, error);
    res.status(500).json({ error: 'Ocurrió un error al generar el PDF.' });
  }
}