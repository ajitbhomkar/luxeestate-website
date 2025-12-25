import Link from 'next/link'
import { Search, MapPin } from 'lucide-react'

export function Hero() {
  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl animate-slide-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              Dream Home
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Discover luxury properties and modern living spaces with expert guidance from our professional agents.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg p-4 shadow-2xl max-w-xl">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location (City, State)"
                  className="flex-1 bg-transparent border-none outline-none text-gray-700"
                />
              </div>
              <Link
                href="/properties"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <Search className="h-5 w-5" />
                Search
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-gray-300">Properties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">200+</div>
              <div className="text-gray-300">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-gray-300">Expert Agents</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
