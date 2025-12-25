import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Maximize, MapPin, Calendar, Check, Mail, Phone, User } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/live'
import { PROPERTY_QUERY, PROPERTY_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch<Array<{ slug: string }>>({
      query: PROPERTY_SLUGS_QUERY,
    })
    return data || []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const { data: property } = await sanityFetch({
    query: PROPERTY_QUERY,
    params: { slug },
  })

  if (!property) notFound()

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const amenityLabels: Record<string, string> = {
    pool: 'Swimming Pool',
    gym: 'Gym',
    garden: 'Garden',
    balcony: 'Balcony',
    garage: 'Garage',
    security: 'Security System',
    ac: 'Air Conditioning',
    heating: 'Heating',
    fireplace: 'Fireplace',
    hardwood: 'Hardwood Floors',
    walkin: 'Walk-in Closet',
    laundry: 'Laundry Room',
    pets: 'Pet Friendly',
    accessible: 'Wheelchair Accessible',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-[500px] bg-gray-900">
        {property.mainImage && (
          <Image
            src={urlFor(property.mainImage).width(1920).height(800).url()}
            alt={property.mainImage.alt || property.title}
            fill
            className="object-cover opacity-90"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        
        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-white text-sm">
              <Link href="/" className="hover:text-primary-400">Home</Link>
              <span>/</span>
              <Link href="/properties" className="hover:text-primary-400">Properties</Link>
              <span>/</span>
              <span className="text-gray-300">{property.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>
                      {property.address.street}, {property.address.city}
                      {property.address.state && `, ${property.address.state}`} {property.address.zipCode}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600">
                    {formatPrice(property.price, property.currency)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    For {property.status === 'sale' ? 'Sale' : 'Rent'}
                  </div>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-200">
                {property.specifications.bedrooms && (
                  <div className="text-center">
                    <Bed className="h-6 w-6 mx-auto text-primary-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.specifications.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                )}
                {property.specifications.bathrooms && (
                  <div className="text-center">
                    <Bath className="h-6 w-6 mx-auto text-primary-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.specifications.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                )}
                {property.specifications.area && (
                  <div className="text-center">
                    <Maximize className="h-6 w-6 mx-auto text-primary-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.specifications.area.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                )}
                {property.specifications.yearBuilt && (
                  <div className="text-center">
                    <Calendar className="h-6 w-6 mx-auto text-primary-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.specifications.yearBuilt}</div>
                    <div className="text-sm text-gray-600">Year Built</div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3">
                      <div className="bg-primary-100 rounded-full p-2">
                        <Check className="h-4 w-4 text-primary-600" />
                      </div>
                      <span className="text-gray-700">{amenityLabels[amenity] || amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {property.gallery && property.gallery.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.gallery.map((image: any, index: number) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(image).width(400).height(300).url()}
                        alt={image.alt || `Gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Agent Card */}
            {property.agent && (
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
                
                <div className="flex items-center gap-4 mb-6">
                  {property.agent.image && (
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={property.agent.image.asset.url}
                        alt={property.agent.image.alt || property.agent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-gray-900">{property.agent.name}</div>
                    <div className="text-sm text-gray-600">{property.agent.title}</div>
                  </div>
                </div>

                {property.agent.bio && (
                  <p className="text-sm text-gray-700 mb-6">{property.agent.bio}</p>
                )}

                <div className="space-y-3 mb-6">
                  {property.agent.phone && (
                    <a href={`tel:${property.agent.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-primary-600">
                      <Phone className="h-5 w-5" />
                      <span>{property.agent.phone}</span>
                    </a>
                  )}
                  {property.agent.email && (
                    <a href={`mailto:${property.agent.email}`} className="flex items-center gap-3 text-gray-700 hover:text-primary-600">
                      <Mail className="h-5 w-5" />
                      <span>{property.agent.email}</span>
                    </a>
                  )}
                </div>

                <Link
                  href="/contact"
                  className="block w-full bg-primary-600 text-white text-center px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                >
                  Request Information
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
