import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_PROPERTIES_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";

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

type Testimonial = {
  _id: string
  name: string
  role?: string
  image?: any
  content: string
  rating: number
  property?: {
    title: string
    slug: string
  }
}

export default async function Home() {
  const { data: properties } = await sanityFetch<Property[]>({
    query: FEATURED_PROPERTIES_QUERY,
  });

  const { data: testimonials } = await sanityFetch<Testimonial[]>({
    query: TESTIMONIALS_QUERY,
  });

  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProperties properties={properties || []} />
      <Testimonials testimonials={testimonials || []} />
      <CTA />
    </>
  );
}
