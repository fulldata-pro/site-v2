import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-secondary-light">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-header.svg"
              alt="Fulldata Logo"
              width={200}
              height={80}
              className="w-48 h-auto"
            />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6">
            Sistema de Búsqueda de Información
          </h1>
          
          <p className="text-xl text-gray-300 mb-12">
            Acceda a información detallada de personas, empresas, vehículos y más
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-primary text-4xl mb-4">🔍</div>
              <h3 className="text-white font-semibold text-lg mb-2">Búsqueda Avanzada</h3>
              <p className="text-gray-300 text-sm">
                Múltiples criterios de búsqueda para resultados precisos
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-primary text-4xl mb-4">📊</div>
              <h3 className="text-white font-semibold text-lg mb-2">Reportes Completos</h3>
              <p className="text-gray-300 text-sm">
                Información detallada y organizada en reportes profesionales
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-primary text-4xl mb-4">⚡</div>
              <h3 className="text-white font-semibold text-lg mb-2">Resultados Rápidos</h3>
              <p className="text-gray-300 text-sm">
                Respuestas inmediatas con procesamiento asíncrono
              </p>
            </div>
          </div>

          <Link
            href="/login"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
          >
            Comenzar Ahora
          </Link>
        </div>
      </div>
    </div>
  )
}