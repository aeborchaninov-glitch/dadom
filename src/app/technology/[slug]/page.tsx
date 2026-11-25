import { notFound } from "next/navigation";
import { getTechnology, publishedTechnology } from "@/data/editorial";
import { pageMetadata } from "@/lib/seo";
import { EditorialDetail } from "@/components/editorial-detail";

export const dynamicParams = false;
export function generateStaticParams() { return publishedTechnology.length ? publishedTechnology.map(({ slug }) => ({ slug })) : [{ slug: "__not-published" }]; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const entry = getTechnology((await params).slug); if (!entry) notFound(); return pageMetadata(entry.title, entry.description, `/technology/${entry.slug}`, true, entry.heroImage); }
export default async function TechnologyDetailPage({ params }: { params: Promise<{ slug: string }> }) { const entry = getTechnology((await params).slug); if (!entry) notFound(); return <EditorialDetail entry={entry} sectionLabel="Технология" sectionHref="/technology" />; }
