import React from 'react'
import Link from 'next/link'
import { Segment, Container, Grid, List, Header } from 'semantic-ui-react'
import Image from 'next/image'
const Footer = () => (
  <footer className="bg-black text-white py-16 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 no-underline">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <Image className="block" height={80} width={80} src={'/sentinel-logo.png'} alt={'sentinel-logo'} />
            <span className="text-xl font-bold">Sentinel IA</span>
          </div>
          <p className="text-gray-300 mb-6 max-w-md">
            Pioneering the first Tech MarketCap for Web3 projects. Measure and demonstrate your technological quality beyond trading volumes.
          </p>
          <div className="text-sm text-gray-400">
            © 2024 Sentinel IA. Todos los derechos reservados.
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Navegación</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
            <li><a href="#ranking" className="text-gray-300 hover:text-white transition-colors">Ranking</a></li>
            <li><a href="#como-funciona" className="text-gray-300 hover:text-white transition-colors">Cómo funciona</a></li>
            <li><a href="#beneficios" className="text-gray-300 hover:text-white transition-colors">Beneficios</a></li>
            <li><a href="#faqs" className="text-gray-300 hover:text-white transition-colors">FAQs</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Servicios</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Auditoría inicial</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Monitoreo continuo</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Widget integración</a></li>
            <li><a href="#contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Soporte</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
