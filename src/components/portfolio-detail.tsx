import Link from "next/link";
import type { HouseProject, PortfolioItem } from "@/types/content";
import { galleryImages } from "@/lib/catalog";
import { Breadcrumbs } from "./breadcrumbs";
import { Specifications, Works } from "./detail-blocks";
import { ImageGallery } from "./image-gallery";

export function PortfolioDetail({ item, project }: { item: PortfolioItem; project?: HouseProject }) {
  return (
    <div className="page-surface">
      <div className="wrap detail-lead">
        <Breadcrumbs items={[{ label: "Портфолио", href: "/portfolio" }, { label: item.title, href: `/portfolio/${item.slug}` }]} />
        <p className="eyebrow mt-8">Построенный объект</p>
        <h1 className="display mt-5 max-w-4xl text-5xl sm:text-7xl">{item.title}</h1>
        <p className="muted mt-6 max-w-2xl whitespace-pre-line text-lg leading-8">{item.description}</p>
        <div className="mt-12"><ImageGallery images={galleryImages(item.heroImage, item.gallery)} priorityFirst label="Галерея объекта" /></div>
        <section className="mt-16 grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><h2 className="display text-4xl">О доме</h2><Specifications items={Object.entries({ ...item.specifications, "Площадь": item.area === null ? null : item.area + " м²", "Местоположение": item.location, "Год завершения": item.completionYear === null ? null : String(item.completionYear) })} /></section>
        {item.customerBrief && <section className="mt-16 grid gap-8 md:grid-cols-2"><h2 className="display text-4xl">Задача заказчика</h2><p className="muted whitespace-pre-line leading-7">{item.customerBrief}</p></section>}
        <section className="mt-12"><Works title="Выполненные работы" items={item.completedWorks} /></section>
        {item.constructionPhotos.length > 0 && <section className="mt-16"><h2 className="display mb-8 text-4xl">Ход строительства</h2><ImageGallery images={item.constructionPhotos} /></section>}
        {project && <section className="card mt-16 p-6 sm:p-8"><p className="eyebrow">Связанный проект</p><h2 className="display mt-4 text-3xl">{project.name}</h2><Link className="mt-5 inline-flex min-h-11 items-center font-extrabold underline underline-offset-4" href={`/projects/${project.slug}`}>Посмотреть проект →</Link></section>}
        <Link href={`/contacts?portfolio=${encodeURIComponent(item.slug)}`} className="button mt-12">Хочу похожий дом</Link>
      </div>
    </div>
  );
}
