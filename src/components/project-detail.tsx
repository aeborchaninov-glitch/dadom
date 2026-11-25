import Link from "next/link";
import type { Complectation, HouseProject } from "@/types/content";
import { galleryImages, projectSpecs } from "@/lib/catalog";
import { Breadcrumbs } from "./breadcrumbs";
import { PackageCard, Specifications, Works } from "./detail-blocks";
import { HouseCard } from "./house-card";
import { ImageGallery } from "./image-gallery";
import { ProjectPrice } from "./price";

export function ProjectDetail({ project, packages, similar = [] }: { project: HouseProject; packages: Complectation[]; similar?: HouseProject[] }) {
  const selected = packages.filter((item) => item.id === project.pricePackageId || project.packageIds.includes(item.id));

  return (
    <div className="page-surface">
      <div className="wrap detail-lead">
        <Breadcrumbs items={[{ label: "Проекты", href: "/projects" }, { label: project.name, href: `/projects/${project.slug}` }]} />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="eyebrow">Типовой проект</p>
            <h1 className="display mt-5 text-5xl sm:text-7xl">{project.name}</h1>
            <p className="muted mt-6 max-w-2xl whitespace-pre-line text-lg leading-8">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href={`/contacts?project=${encodeURIComponent(project.slug)}`} className="button">Получить расчёт</Link><a href="#specs" className="button button--light">Характеристики</a></div>
          </div>
          <aside className="detail-price card self-start p-6 sm:p-8"><p className="eyebrow mb-5">Стоимость</p><ProjectPrice project={project} packages={packages} large /><p className="muted mt-6 border-t border-[var(--line)] pt-5 text-sm leading-6">Стоимость строительства рассчитывается с учётом участка и согласованного состава работ.</p></aside>
        </div>
        <section className="mt-14" aria-label="Изображения проекта"><ImageGallery images={galleryImages(project.heroImage, project.gallery)} priorityFirst label="Галерея проекта" /></section>
        <section id="specs" className="mt-16 grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><h2 className="display text-4xl">Характеристики дома</h2><Specifications items={projectSpecs(project)} /></section>
        <section className="mt-16 grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">Планировки</p><h2 className="display mt-4 text-4xl">Планировки дома</h2></div><ImageGallery images={project.floorPlans} plans label="Планировки" /></section>
        <section className="mt-16 grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><h2 className="display text-4xl">Комплектации</h2><div className="space-y-5">{selected.length ? selected.map((item) => <PackageCard item={item} projectSlug={project.slug} key={item.id} />) : <p className="muted">Для проекта пока не опубликованы утверждённые комплектации.</p>}</div></section>
        <section className="mt-16 border-t border-[var(--line)] pt-10"><h2 className="display text-4xl">Работы по проекту</h2><div className="mt-7 grid gap-8 md:grid-cols-2"><Works title="Включённые работы" items={project.includedWorks} /><Works title="Исключения из цены" items={project.excludedWorks} /></div></section>
        <section className="mt-16 grid gap-6 border-t border-[var(--line)] pt-10 lg:grid-cols-[.7fr_1.3fr]"><h2 className="display text-4xl">Условия расчёта</h2><p className="muted max-w-2xl leading-7">Стоимость уточняется после выбора проекта, комплектации и обсуждения участка. Запрос сохраняет выбранный проект; отправка заявки на этом сайте пока не выполняется.</p></section>
        {similar.length > 0 && <section className="mt-16"><h2 className="display text-4xl">Другие проекты</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{similar.map((item) => <HouseCard key={item.id} project={item} packages={packages} />)}</div></section>}
      </div>
    </div>
  );
}
