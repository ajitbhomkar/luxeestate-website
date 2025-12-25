'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Maximize, MapPin, Filter } from 'lucide-react'
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

export function PropertiesGrid({ properties }: Props) {
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filterProperties = (type: string, status: string) => {
    let filtered = properties

    if (type !== 'all') {
      filtered = filtered.filter((p) => p.propertyType === type)
    }

    if (status !== 'all') {
      filtered = filtered.filter((p) => p.status === status)
    }

    setFilteredProperties(filtered)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    filterProperties(type, selectedStatus)
  }

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
    filterProperties(selectedType, status)
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Properties
          </h1>
          <p className="text-lg text-gray-600">
            Discover {filteredProperties.length} amazing properties
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Property Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
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

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No properties found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
