import { sanityFetch } from "@/sanity/lib/live";
import { PROPERTIES_QUERY } from "@/sanity/lib/queries";
import { PropertiesGrid } from "@/components/PropertiesGrid";

export default async function PropertiesPage() {
  const { data: properties } = await sanityFetch({
    query: PROPERTIES_QUERY,
  });

  return <PropertiesGrid properties={properties || []} />;
}
