import React from 'react'
import Link from 'next/link'
import { Segment, Container, Grid, List, Header } from 'semantic-ui-react'
import Image from 'next/image'
const Footer = () => (
  <footer className="bg-black text-white py-16 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <Image className="block" height={80} width={80} src={'/sentinel-logo.png'} alt={'sentinel-logo'} />
            <span className="text-xl font-bold">Sentinel IA</span>
          </div>
          <p className="text-gray-300 mb-6 max-w-md">
            Protección inteligente para el futuro de las finanzas descentralizadas.
            Aseguramos tu código, protegemos tu inversión.
          </p>
          <div className="text-sm text-gray-400">
            © 2024 Sentinel IA. Todos los derechos reservados.
          </div>
        </div>

        <div>
          {/* <h4 className="font-semibold text-lg mb-4">Servicios</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-sentinel-accent transition-colors">Auditorías Smart Contract</a></li>
            <li><a href="#" className="hover:text-sentinel-accent transition-colors">Monitoreo Continuo</a></li>
            <li><a href="#" className="hover:text-sentinel-accent transition-colors">Consultoría</a></li>
            <li><a href="#" className="hover:text-sentinel-accent transition-colors">Respuesta de Emergencia</a></li>
          </ul> */}
        </div>

        <div>
          {/* <h4 className="font-semibold text-lg mb-4">Contacto</h4>
          <ul className="space-y-2 text-gray-300">
            <li>security@sentinel-ia.com</li>
            <li>+1 (555) 123-4567</li>
            <li>San Francisco, CA</li>
            <li>24/7 Support</li>
          </ul> */}
          <Image
            src={'/SHARKTE.png'}
            alt={`Shark logo`}
            width={200} // Ancho y alto de la imagen en px
            height={200}
            className="object-contain" // Para que la imagen se ajuste dentro del div sin cortarse
          />
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
