import { sanityFetch } from "@/sanity/lib/live";
import { PROPERTIES_QUERY } from "@/sanity/lib/queries";
import { PropertiesGrid } from "@/components/PropertiesGrid";

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

export default async function PropertiesPage() {
  const { data: properties } = await sanityFetch<Property[]>({
    query: PROPERTIES_QUERY,
  });

  return <PropertiesGrid properties={properties || []} />;
}
