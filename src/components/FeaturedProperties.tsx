import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Maximize, MapPin } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

type Property = {
  _id: string
  title: string
  slug: string
  propertyType: string
  status: string
  price: number
  currency: string
  mainImage: any
  address: {
    city: string
    state?: string
  }
  specifications: {
    bedrooms?: number
    bathrooms?: number
    area?: number
  }
}

type Props = {
  properties: Property[]
}

export function FeaturedProperties({ properties }: Props) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of luxury properties available now
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Link
              key={property._id}
              href={`/properties/${property.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                {property.mainImage && (
                  <Image
                    src={urlFor(property.mainImage).width(600).height(400).url()}
                    alt={property.mainImage.alt || property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    For {property.status === 'sale' ? 'Sale' : 'Rent'}
                  </span>
                  <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                    {property.propertyType}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {property.address.city}
                    {property.address.state && `, ${property.address.state}`}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {property.title}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary-600">
                    {formatPrice(property.price, property.currency)}
                  </div>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 text-gray-600 text-sm">
                  {property.specifications.bedrooms && (
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.specifications.bedrooms}</span>
                    </div>
                  )}
                  {property.specifications.bathrooms && (
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.specifications.bathrooms}</span>
                    </div>
                  )}
                  {property.specifications.area && (
                    <div className="flex items-center gap-1">
                      <Maximize className="h-4 w-4" />
                      <span>{property.specifications.area.toLocaleString()} sq ft</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  )
}
