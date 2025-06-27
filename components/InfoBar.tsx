// components/InfoBar.tsx
import React from 'react';

// Definimos las propiedades que recibirá el componente
interface InfoBarProps {
    messages: string[]; // Un array de mensajes para mostrar
    isVisible: boolean; // Un booleano para controlar la visibilidad
}

const InfoBar: React.FC<InfoBarProps> = ({ messages, isVisible }) => {
    // Unimos los mensajes con un separador visual para el efecto de carrusel
    const fullMessage = messages.join(' ••• ');

    return (
        <>
            {/* El contenedor principal de la barra */}
            <div
                className={`
          fixed top-0 left-0 w-full h-12 bg-black overflow-hidden z-50
          transition-transform duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
            >
                <div className="info-bar-content h-full flex items-center">
                    {/* Usamos un span que se animará con CSS. 
              La clave 'key' ayuda a React a reiniciar la animación si el mensaje cambia */}
                    <span key={fullMessage} className="neon-text whitespace-nowrap">
                        {fullMessage}
                    </span>
                </div>
            </div>

            {/* Estilos CSS para la animación y el efecto neón usando style jsx */}
            <style jsx global>{`
        /* Definimos la animación de desplazamiento de izquierda a derecha */
        @keyframes scrollLeftToRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .info-bar-content {
          /* Aplicamos la animación al contenedor del texto */
          animation: scrollLeftToRight 60s linear infinite;
        }

        /* Estilo de texto NEON */
        .neon-text {
          font-family: 'Courier New', Courier, monospace; /* Una fuente que parece digital */
          font-size: 1.1rem; /* Tamaño del texto */
          color: #fff;
          /* El truco para el efecto neón está en los text-shadows */
        //   text-shadow:
        //     0 0 5px #00bfff,  /* Cian brillante */
        //     0 0 10px #00bfff,
        //     0 0 20px #00bfff,
        //     0 0 40px #007bff,  /* Azul más oscuro */
        //     0 0 80px #007bff,
        //     0 0 90px #007bff,
        //     0 0 100px #007bff,
        //     0 0 150px #007bff;
        }
      `}</style>
        </>
    );
};

export default InfoBar;