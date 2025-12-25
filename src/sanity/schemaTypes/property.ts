import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'House', value: 'house' },
          { title: 'Apartment', value: 'apartment' },
          { title: 'Villa', value: 'villa' },
          { title: 'Condo', value: 'condo' },
          { title: 'Townhouse', value: 'townhouse' },
          { title: 'Land', value: 'land' },
          { title: 'Commercial', value: 'commercial' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'For Sale', value: 'sale' },
          { title: 'For Rent', value: 'rent' },
          { title: 'Sold', value: 'sold' },
          { title: 'Rented', value: 'rented' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      options: {
        list: [
          { title: 'USD ($)', value: 'USD' },
          { title: 'EUR (€)', value: 'EUR' },
          { title: 'GBP (£)', value: 'GBP' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(50),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          title: 'Street Address',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'state',
          title: 'State/Province',
          type: 'string',
        }),
        defineField({
          name: 'zipCode',
          title: 'ZIP/Postal Code',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        defineField({
          name: 'bedrooms',
          title: 'Bedrooms',
          type: 'number',
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: 'bathrooms',
          title: 'Bathrooms',
          type: 'number',
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: 'area',
          title: 'Area (sq ft)',
          type: 'number',
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: 'lotSize',
          title: 'Lot Size (sq ft)',
          type: 'number',
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: 'yearBuilt',
          title: 'Year Built',
          type: 'number',
          validation: (rule) => rule.min(1800).max(new Date().getFullYear()),
        }),
        defineField({
          name: 'parking',
          title: 'Parking Spaces',
          type: 'number',
          validation: (rule) => rule.min(0),
        }),
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Swimming Pool', value: 'pool' },
          { title: 'Gym', value: 'gym' },
          { title: 'Garden', value: 'garden' },
          { title: 'Balcony', value: 'balcony' },
          { title: 'Garage', value: 'garage' },
          { title: 'Security System', value: 'security' },
          { title: 'Air Conditioning', value: 'ac' },
          { title: 'Heating', value: 'heating' },
          { title: 'Fireplace', value: 'fireplace' },
          { title: 'Hardwood Floors', value: 'hardwood' },
          { title: 'Walk-in Closet', value: 'walkin' },
          { title: 'Laundry Room', value: 'laundry' },
          { title: 'Pet Friendly', value: 'pets' },
          { title: 'Wheelchair Accessible', value: 'accessible' },
        ],
      },
    }),
    defineField({
      name: 'agent',
      title: 'Listing Agent',
      type: 'reference',
      to: [{ type: 'agent' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'address.city',
      media: 'mainImage',
      status: 'status',
      price: 'price',
    },
    prepare({ title, subtitle, media, status, price }) {
      return {
        title,
        subtitle: `${subtitle} - $${price?.toLocaleString()} - ${status}`,
        media,
      }
    },
  },
})
