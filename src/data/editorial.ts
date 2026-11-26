import type { EditorialEntry } from "@/types/editorial";

export const articles: EditorialEntry[] = [];
export const publishedArticles = articles.filter((entry) => entry.status === "published");
export const getArticle = (slug: string) => publishedArticles.find((entry) => entry.slug === slug);