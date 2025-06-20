import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type FormData = {
    projectName: string;
    fullName: string;
    email: string;
    jobTitle: string;
    contactMethod: string;
    services: { [key: string]: boolean };
    additionalNotes: string;
};

type EmailResponse = {
    message: string;
    success: boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<EmailResponse>
) {
    // Solo permitir solicitudes POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed', success: false });
    }

    const formData: FormData = req.body;

    // ✨ Configura el transportador de Nodemailer ✨
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Por ejemplo, si usas Gmail. Cambia si usas otro (ej. host: 'smtp.sendgrid.net', port: 587, secure: false)
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        // Desactiva la verificación del certificado TLS en desarrollo si es necesario (NO EN PRODUCCIÓN REAL)
        // tls: {
        //   rejectUnauthorized: false
        // }
    });

    // Construye el contenido del correo electrónico
    const selectedServices = Object.entries(formData.services)
        .filter(([, checked]) => checked)
        .map(([serviceName]) => {
            // Un pequeño ajuste para que los nombres de los servicios sean más legibles en el correo
            // Puedes mapear las claves a sus traducciones si lo deseas, pero el backend no tiene 't()'
            switch (serviceName) {
                case 'auditing': return 'Auditoría';
                case 'penetrationTesting': return 'Pruebas de Penetración';
                case 'skynetScore': return 'Skynet Score';
                case 'teamVerification': return 'Verificación de Equipo, Contrato, Bug Bounty';
                case 'advisory': return 'Asesoría u Otros Servicios';
                case 'skynetQuest': return 'Skynet Quest';
                case 'complianceAML': return 'Cumplimiento / AML';
                default: return serviceName;
            }
        })
        .join(', ') || 'Ninguno';

    const mailOptions = {
        from: process.env.EMAIL_USER, // Remitente
        to: 'dromero.code@gmail.com',     // ✨ DESTINATARIO: Hardcodeado según tu solicitud ✨
        subject: `Nueva Solicitud de Auditoría - ${formData.projectName}`,
        html: `
            <h1>Nueva Solicitud de Auditoría</h1>
            <p><strong>Nombre del Proyecto/Compañía:</strong> ${formData.projectName}</p>
            <p><strong>Nombre Completo:</strong> ${formData.fullName}</p>
            <p><strong>Correo Electrónico:</strong> ${formData.email}</p>
            <p><strong>Cargo:</strong> ${formData.jobTitle || 'No especificado'}</p>
            <p><strong>Método de Contacto Preferido:</strong> ${formData.contactMethod || 'No especificado'}</p>
            <p><strong>Servicios Interesados:</strong> ${selectedServices}</p>
            <p><strong>Notas Adicionales:</strong></p>
            <p>${formData.additionalNotes || 'Ninguna'}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito a dromero.code@gmail.com!');
        return res.status(200).json({ message: 'Formulario enviado con éxito.', success: true });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).json({ message: 'Error al enviar el formulario.', success: false });
    }
}
