import React, { PropsWithChildren } from 'react'
import { Container } from 'semantic-ui-react' // Asegúrate de que Container de semantic-ui-react se use si es necesario

// ✨ Importa next/dynamic ✨
import dynamic from 'next/dynamic';

import Footer from '@components/Footer/Footer'
// ✨ Importa NavBar dinámicamente con ssr: false ✨
// Esto significa que NavBar solo se renderizará en el cliente,
// eliminando cualquier problema de hidratación con t() en el servidor.
const DynamicNavBar = dynamic(() => import('@components/NavBar/NavBar'), { ssr: false });

type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <div>
    {/* ✨ Usa el componente dinámico aquí ✨ */}
    <DynamicNavBar />
    {children}
    {/* Asegúrate de que Footer también sea responsive si lo necesitas,
        y si tiene problemas de hidratación, también podrías dinamizarlo. */}
    <Footer />
  </div>
)

export default Layout
