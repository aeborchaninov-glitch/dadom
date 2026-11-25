import type { Metadata } from "next";
import type { ImageAsset } from "@/types/content";
import { site } from "./site";
export function pageMetadata(title: string, description: string, path: string, ready = true, image?: ImageAsset | null): Metadata {
  return {
    title, description,
    alternates: site.url ? { canonical: site.url + path } : undefined,
    robots: { index: site.indexable && ready, follow: site.indexable },
    openGraph: { type: "website", locale: "ru_RU", siteName: "ДаДом", title, description,
      ...(site.url ? { url: site.url + path } : {}),
      ...(site.url && image ? { images: [{ url: site.url + image.src, alt: image.alt }] } : {}) },
  };
}
