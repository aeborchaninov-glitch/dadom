import type { Complectation, HouseProject } from "@/types/content";

// Internal visual QA only. These entries are deliberately excluded from content.ts,
// selectors, sitemap and production metadata.
export const visualPackages: Complectation[] = [{
  id: "visual-warm-shell",
  name: "Тестовая комплектация",
  description: "Демонстрационные данные для проверки карточек и страницы проекта. Не являются предложением «ДаДом».",
  includedWorks: ["Позиции для проверки интерфейса"],
  excludedWorks: ["Значения не опубликованы"],
}];

export const visualProjects: HouseProject[] = [{
  id: "visual-project-01",
  slug: "visual-demo-house",
  name: "Демонстрационный проект",
  description: "Тестовая запись для проверки отображения фасада, планировки, характеристик, цены и комплектации. Не является реальным проектом компании.",
  area: 118,
  dimensions: "9 × 13 м",
  floors: 2,
  bedrooms: 3,
  rooms: 5,
  intendedUse: "Постоянное проживание",
  architecturalStyle: "Современный",
  price: 6900000,
  priceStatus: "known",
  priceCurrency: "RUB",
  pricePackageId: "visual-warm-shell",
  priceUpdatedAt: null,
  heroImage: { src: "/images/editorial/modern-house.webp", alt: "Иллюстративный современный загородный дом", width: 1200, height: 800, isIllustration: true },
  gallery: [{ src: "/images/editorial/panoramic-house.webp", alt: "Иллюстративный дом с панорамными окнами", width: 1200, height: 800, isIllustration: true }],
  floorPlans: [{ src: "/images/placeholder-plan.svg", alt: "Демонстрационная планировка", width: 1200, height: 800, isIllustration: true }],
  specifications: { "Терраса": "есть" },
  packageIds: ["visual-warm-shell"],
  includedWorks: ["Демонстрационный состав работ"],
  excludedWorks: ["Уточняется по участку"],
  featured: true,
  published: false,
  seoTitle: null,
  seoDescription: null,
}];
