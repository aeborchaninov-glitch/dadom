import { notFound } from "next/navigation";
import { getArticle, publishedArticles } from "@/data/editorial";
import { pageMetadata } from "@/lib/seo";
import { EditorialDetail } from "@/components/editorial-detail";

export const dynamicParams = false;
export function generateStaticParams() { return publishedArticles.length ? publishedArticles.map(({ slug }) => ({ slug })) : [{ slug: "__not-published" }]; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const entry = getArticle((await params).slug); if (!entry) notFound(); return pageMetadata(entry.title, entry.description, `/articles/${entry.slug}`, true, entry.heroImage); }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { const entry = getArticle((await params).slug); if (!entry) notFound(); return <EditorialDetail entry={entry} sectionLabel="Полезные статьи" sectionHref="/articles" />; }
