import { notFound } from "next/navigation";
import { getTechnology, publishedTechnology } from "@/data/technology";
import { pageMetadata } from "@/lib/seo";
import { TechnologyDetail } from "@/components/technology-detail";

export const dynamicParams = false;
export function generateStaticParams() { return publishedTechnology.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const entry = getTechnology((await params).slug);
  if (!entry) notFound();
  return pageMetadata(entry.seoTitle, entry.seoDescription, `/technology/${entry.slug}/`, entry.indexable, entry.heroImage);
}
export default async function TechnologyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const entry = getTechnology((await params).slug);
  if (!entry) notFound();
  return <TechnologyDetail entry={entry} topics={publishedTechnology} />;
}