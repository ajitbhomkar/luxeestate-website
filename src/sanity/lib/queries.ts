import { defineQuery } from 'next-sanity'

// Get all properties
export const PROPERTIES_QUERY = defineQuery(`
  *[_type == "property"] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    propertyType,
    status,
    price,
    currency,
    featured,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt
    },
    description,
    address,
    specifications,
    amenities,
    agent->{
      _id,
      name,
      "slug": slug.current,
      image {
        asset->{ url },
        alt
      }
    },
    publishedAt
  }
`)

// Get featured properties
export const FEATURED_PROPERTIES_QUERY = defineQuery(`
  *[_type == "property" && featured == true] | order(publishedAt desc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    propertyType,
    status,
    price,
    currency,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt
    },
    address,
    specifications
  }
`)

// Get single property by slug
export const PROPERTY_QUERY = defineQuery(`
  *[_type == "property" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    propertyType,
    status,
    price,
    currency,
    featured,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt,
      hotspot,
      crop
    },
    gallery[] {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt,
      hotspot,
      crop
    },
    description,
    address,
    specifications,
    amenities,
    agent->{
      _id,
      name,
      title,
      "slug": slug.current,
      image {
        asset->{ url },
        alt
      },
      email,
      phone,
      bio
    },
    publishedAt
  }
`)

// Get all property slugs for static paths
export const PROPERTY_SLUGS_QUERY = defineQuery(`
  *[_type == "property" && defined(slug.current)]{
    "slug": slug.current
  }
`)

// Get all agents
export const AGENTS_QUERY = defineQuery(`
  *[_type == "agent"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    title,
    image {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt
    },
    bio,
    email,
    phone,
    specialties,
    experience,
    socialMedia
  }
`)

// Get featured testimonials
export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && featured == true] | order(publishedAt desc) [0...6] {
    _id,
    name,
    role,
    image {
      asset->{ url },
      alt
    },
    content,
    rating,
    property->{
      title,
      "slug": slug.current
    }
  }
`)
