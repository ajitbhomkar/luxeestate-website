import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_PROPERTIES_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";

export default async function Home() {
  const { data: properties } = await sanityFetch({
    query: FEATURED_PROPERTIES_QUERY,
  });

  const { data: testimonials } = await sanityFetch({
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
