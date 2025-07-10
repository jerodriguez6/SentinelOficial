import React from 'react';

// --- SVG Icon for WhatsApp ---
// Es una buena práctica mantener el ícono junto al componente que lo usa si no se reutiliza en otro lugar.
const WhatsAppIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-10 h-10 text-white fill-current"
    >
        <path d="M16.04 2.003c-7.84 0-14.2 6.36-14.2 14.2 0 2.504.66 4.943 1.914 7.1L2 30l6.9-1.813c2.085 1.147 4.446 1.747 7.14 1.747h.001c7.84 0 14.2-6.36 14.2-14.2s-6.36-14.2-14.2-14.2zm0 25.9c-2.328 0-4.585-.625-6.553-1.812l-.469-.28-4.1 1.08 1.093-4.001-.306-.49a11.925 11.925 0 01-1.812-6.56c0-6.605 5.375-11.98 11.98-11.98s11.98 5.375 11.98 11.98-5.375 11.98-11.98 11.98zm6.52-8.847c-.357-.178-2.105-1.039-2.43-1.158-.327-.12-.566-.178-.805.178-.24.356-.924 1.158-1.135 1.396-.21.238-.42.267-.777.09-.356-.179-1.504-.553-2.865-1.763-1.059-.944-1.773-2.111-1.98-2.468-.206-.356-.022-.548.154-.726.157-.157.356-.41.534-.613.18-.203.239-.356.358-.594.119-.238.06-.446-.03-.623-.09-.178-.805-1.946-1.103-2.665-.29-.7-.584-.605-.805-.617l-.686-.012c-.238 0-.623.09-.948.446s-1.24 1.213-1.24 2.956c0 1.743 1.268 3.43 1.445 3.668.178.238 2.494 3.804 6.043 5.334.843.364 1.5.58 2.012.741.845.268 1.616.23 2.225.14.678-.101 2.105-.861 2.4-1.694.296-.834.296-1.55.206-1.694-.089-.145-.327-.237-.684-.415z" />
    </svg>

);

// --- Floating WhatsApp Button Component ---
const WhatsApp: React.FC = () => {
    // IMPORTANTE: Reemplaza este número con tu número de WhatsApp real.
    const phoneNumber: string = '573175090528';
    const message: string = 'Hola, me gustaría obtener más información.';

    const whatsappUrl: string = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out"
            aria-label="Contactar por WhatsApp"
        >
            <WhatsAppIcon />
        </a>
    );
};

export default WhatsApp;
