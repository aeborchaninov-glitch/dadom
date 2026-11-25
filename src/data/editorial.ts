import type { EditorialEntry, TechnologyEntry } from "@/types/editorial";

// Draft entries only describe the future information architecture. They are not
// linked in public navigation, rendered as articles, or included in sitemap.xml.
export const technology: TechnologyEntry[] = [
  "fundament", "karkas", "steny", "pol", "perekrytiya", "uteplenie", "paroizolyatsiya", "vetrozashchita", "krovlya", "fasad", "okna", "teplyy-pol", "ventilyatsiya", "otoplenie", "inzhenernye-sistemy", "dom-dlya-urala",
].map((slug) => ({
  slug,
  title: "Материал готовится к публикации",
  description: "Технический материал будет опубликован после проверки специалистом.",
  category: "Технология строительства",
  status: "draft",
  publishedAt: null,
  updatedAt: null,
  heroImage: null,
  intro: "",
  sections: [],
  faq: [],
  sources: [],
  author: null,
  technicalReviewer: null,
  relatedSlugs: [],
  relatedProjectSlugs: [],
  relatedPackageIds: [],
}));

export const articles: EditorialEntry[] = [];

export const publishedTechnology = technology.filter((entry) => entry.status === "published");
export const publishedArticles = articles.filter((entry) => entry.status === "published");
export const getTechnology = (slug: string) => publishedTechnology.find((entry) => entry.slug === slug);
export const getArticle = (slug: string) => publishedArticles.find((entry) => entry.slug === slug);