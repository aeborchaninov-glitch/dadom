import type { ImageAsset } from "./content";

export type ContentStatus = "draft" | "published";

export type EditorialSection = {
  id: string;
  heading: string;
  body: string;
  subheadings?: { heading: string; body: string }[];
};

export type FaqItem = { question: string; answer: string };

export type EditorialEntry = {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: ContentStatus;
  publishedAt: string | null;
  updatedAt: string | null;
  heroImage: ImageAsset | null;
  intro: string;
  sections: EditorialSection[];
  faq: FaqItem[];
  sources: { label: string; href: string }[];
  author: string | null;
  technicalReviewer: string | null;
  relatedSlugs: string[];
};

export type TechnologyEntry = EditorialEntry & {
  relatedProjectSlugs: string[];
  relatedPackageIds: string[];
};

export type TechnologyTopic = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  excerpt: string;
  intro: string;
  keyPoints: string[];
  faq: FaqItem[];
  published: boolean;
  indexable: boolean;
  relatedTopics: string[];
  heroImage: ImageAsset | null;
  hotspotLabel: string;
  hotspot: { x: number; y: number };
};