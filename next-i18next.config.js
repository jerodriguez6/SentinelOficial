/** @type {import('next-i18next').UserConfig} */
module.exports = {
    // Asegúrate de que las rutas a los directorios de traducción son correctas.
    // Aquí asumimos que tus traducciones estarán en `public/locales`.
    i18n: {
        defaultLocale: 'es', // El idioma por defecto de tu aplicación
        locales: ['en', 'es'], // Todos los idiomas que tu aplicación soportará
    },
    // Habilitar la recarga en desarrollo para ver los cambios en las traducciones
    // sin reiniciar el servidor. Deshabilitar en producción.
    reloadOnPrerender: process.env.NODE_ENV === 'development',
};