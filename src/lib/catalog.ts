import type { Complectation, HouseProject, ImageAsset, PortfolioItem } from "../types/content";

export function priceDetails(project: HouseProject, packages: readonly Complectation[]) {
  const pack = packages.find(p => p.id === project.pricePackageId && p.name.trim());
  if (project.priceStatus !== "known" || project.price === null || !Number.isFinite(project.price) || project.price <= 0 || !pack) {
    return { amount: null, label: "Цена по запросу", package: null } as const;
  }
  return { amount: project.price, label: new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(project.price) + " ₽", package: pack };
}

export function galleryImages(hero: ImageAsset | null, gallery: ImageAsset[]) {
  return [...new Map([...(hero ? [hero] : []), ...gallery].filter(i => i.src.trim()).map(i => [i.src, i])).values()];
}

export function findPublished<T extends { published: boolean; id: string; slug: string }>(items: readonly T[], value: string, key: "id" | "slug" = "slug") {
  return items.find(item => item.published && item[key] === value);
}

export type Query = Record<string, string | string[] | undefined>;
export function single(value: string | string[] | undefined) { return typeof value === "string" ? value : ""; }
function numeric(value: string | undefined) { return value && Number.isFinite(Number(value)) && Number(value) >= 0 ? Number(value) : null; }
export function queryProjects(items: readonly HouseProject[], packages: readonly Complectation[], query: Query) {
  const q = Object.fromEntries(Object.entries(query).map(([k,v]) => [k,single(v)]));
  const min = numeric(q.minArea), max = numeric(q.maxArea), budget = numeric(q.maxPrice);
  const floors = numeric(q.floors), bedrooms = numeric(q.bedrooms);
  const result = items.filter(p => p.published
    && (min === null || (p.area !== null && p.area >= min))
    && (max === null || (p.area !== null && p.area <= max))
    && (floors === null || p.floors === floors)
    && (bedrooms === null || p.bedrooms === bedrooms)
    && (!q.use || p.intendedUse === q.use)
    && (budget === null || (priceDetails(p, packages).amount !== null && priceDetails(p, packages).amount! <= budget)));
  if (["area-asc","area-desc","price-asc","price-desc"].includes(q.sort)) {
    result.sort((a,b) => {
      const av = q.sort.startsWith("price") ? priceDetails(a,packages).amount : a.area;
      const bv = q.sort.startsWith("price") ? priceDetails(b,packages).amount : b.area;
      if (av === null) return bv === null ? a.slug.localeCompare(b.slug) : 1;
      if (bv === null) return -1;
      return (q.sort.endsWith("desc") ? bv-av : av-bv) || a.slug.localeCompare(b.slug);
    });
  }
  return paginate(result, q.page);
}
export function paginate<T>(items: readonly T[], value: string, size = 12) {
  const pages = Math.max(1,Math.ceil(items.length / size));
  const page = Math.min(pages, Math.max(1, Number.isSafeInteger(Number(value)) ? Number(value) : 1));
  return { items: items.slice((page-1)*size,page*size), total: items.length, page, pages };
}
export function projectSpecs(p: HouseProject): [string, string | null][] {
  return Object.entries({ ...p.specifications, "Площадь":p.area === null ? null : p.area+" м²", "Габариты":p.dimensions, "Этажей":p.floors === null ? null : String(p.floors), "Спален":p.bedrooms === null ? null : String(p.bedrooms), "Комнат":p.rooms === null ? null : String(p.rooms), "Назначение":p.intendedUse, "Стиль":p.architecturalStyle });
}
export function validateContent(projects: readonly HouseProject[], portfolio: readonly PortfolioItem[], packages: readonly Complectation[]) {
  const errors: string[] = [];
  for (const [label, items] of [["projects", projects],["portfolio",portfolio],["complectations",packages]] as const) {
    const ids = new Set<string>(), slugs = new Set<string>();
    for (const item of items) {
      if (!item.id.trim() || ids.has(item.id)) errors.push(label+": пустой/повторный id "+item.id);
      ids.add(item.id);
      if ("slug" in item) {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) || slugs.has(item.slug)) errors.push(label+": некорректный/повторный slug "+item.slug);
        slugs.add(item.slug);
      }
    }
  }
  for (const p of projects) {
    if (!p.name.trim() || (p.published && !p.description.trim())) errors.push(p.id+": название/описание обязательно");
    for (const key of ["area","floors","bedrooms","rooms"] as const) {
      const v = p[key];
      if (v !== null && (!Number.isFinite(v) || v < 0 || (key !== "area" && !Number.isInteger(v)) || ((key === "area" || key === "floors") && v === 0))) errors.push(p.id+": неверное поле "+key);
    }
    if (p.priceStatus === "known" && priceDetails(p, packages).amount === null) errors.push(p.id+": известная цена требует положительную сумму и существующую комплектацию");
    if (p.priceStatus !== "known" && p.price !== null) errors.push(p.id+": цена не соответствует priceStatus");
    for (const id of new Set([...p.packageIds, ...(p.pricePackageId ? [p.pricePackageId] : [])])) if (!packages.some(pack => pack.id === id)) errors.push(p.id+": неизвестная комплектация "+id);
    if (p.priceUpdatedAt && !/^\d{4}-\d{2}-\d{2}$/.test(p.priceUpdatedAt)) errors.push(p.id+": дата должна быть YYYY-MM-DD");
  }
  for (const p of portfolio) {
    if (!p.title.trim() || (p.published && !p.description.trim())) errors.push(p.id+": название/описание обязательно");
    if (p.relatedProjectId && !projects.some(project => project.id === p.relatedProjectId)) errors.push(p.id+": неизвестный relatedProjectId");
    if (p.area !== null && (!Number.isFinite(p.area) || p.area <= 0)) errors.push(p.id+": неверная площадь");
    if (p.completionYear !== null && (!Number.isInteger(p.completionYear) || p.completionYear < 1900)) errors.push(p.id+": неверный год");
  }
  for (const p of [...projects,...portfolio]) {
    const images = [...(p.heroImage ? [p.heroImage] : []), ...p.gallery, ...("floorPlans" in p ? p.floorPlans : p.constructionPhotos)];
    for (const image of images) {
      if (!/^\/images\/[a-zA-Z0-9/_-]+\.(?:webp|png|jpg|jpeg|avif)$/i.test(image.src) || image.src.includes("..") || !image.alt.trim()) errors.push(p.id+": изображение требует локальный путь /images/… и alt");
      if ("constructionPhotos" in p && image.isIllustration) errors.push(p.id+": портфолио допускает только реальные фотографии");
    }
  }
  for (const pack of packages) if (!pack.name.trim()) errors.push(pack.id+": название комплектации обязательно");
  return errors;
}
