import React from 'react'
import Link from 'next/link'
import { Segment, Container, Grid, List, Header } from 'semantic-ui-react'
import Image from 'next/image'
const Footer = () => (
  <footer className="bg-sentinel-dark text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-sentinel-accent to-sentinel-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
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
          <h4 className="font-semibold text-lg mb-4">Servicios</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-sentinel-accent transition-colors">Auditorías Smart Contract</a></li>
            <li><a href="#" className="hover:text-sentinel-accent transition-colors">Monitoreo Continuo</a></li>
            <li><a href="#" className="hover:text-sentinel-accent transition-colors">Consultoría</a></li>
            <li><a href="#" className="hover:text-sentinel-accent transition-colors">Respuesta de Emergencia</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Contacto</h4>
          <ul className="space-y-2 text-gray-300">
            <li>security@sentinel-ia.com</li>
            <li>+1 (555) 123-4567</li>
            <li>San Francisco, CA</li>
            <li>24/7 Support</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
