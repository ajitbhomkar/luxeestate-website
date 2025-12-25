import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '38fw45r3'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'RealEstate Website',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Properties')
              .child(
                S.documentTypeList('property')
                  .title('Properties')
              ),
            S.listItem()
              .title('Agents')
              .child(
                S.documentTypeList('agent')
                  .title('Agents')
              ),
            S.listItem()
              .title('Testimonials')
              .child(
                S.documentTypeList('testimonial')
                  .title('Testimonials')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['property', 'agent', 'testimonial'].includes(item.getId() || '')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
