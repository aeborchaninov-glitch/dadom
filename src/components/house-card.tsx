"use client";

import Link from "next/link";
import { useState } from "react";
import type { Complectation, HouseProject } from "@/types/content";
import { ContentImage } from "./content-image";
import { ProjectPrice } from "./price";

export function HouseCard({ project, packages = [], detailHref, quoteHref }: { project: HouseProject; packages?: readonly Complectation[]; detailHref?: string; quoteHref?: string }) {
  const [view, setView] = useState<"facade" | "plan">("facade");
  const terrace = project.specifications["Терраса"] ?? project.specifications.terrace ?? null;
  const details = [
    project.area === null ? null : `${project.area} м²`,
    project.dimensions,
    project.floors === null ? null : `${project.floors} эт.`,
    project.bedrooms === null ? null : `${project.bedrooms} сп.`,
    terrace ? `Терраса: ${terrace}` : null,
  ].filter((value): value is string => Boolean(value));
  const hasPlan = project.floorPlans.length > 0;
  const image = view === "plan" ? project.floorPlans[0] : project.heroImage ?? project.gallery[0] ?? null;
  const detailsHref = detailHref ?? `/projects/${project.slug}`;
  const calculationHref = quoteHref ?? `/contacts?project=${encodeURIComponent(project.slug)}`;

  return (
    <article className="project-card card">
      <div className="project-card__media relative aspect-[16/10] bg-[var(--mist)]">
        <Link href={detailsHref} aria-label={`Проект ${project.name}`} className="absolute inset-0 block"><ContentImage image={image} sizes="(max-width: 768px) 95vw, (max-width: 1024px) 48vw, 420px" /></Link>
        {hasPlan && <div className="project-card__toggle" role="group" aria-label="Изображение проекта"><button type="button" aria-pressed={view === "facade"} onClick={() => setView("facade")}>Фасад</button><button type="button" aria-pressed={view === "plan"} onClick={() => setView("plan")}>Планировка</button></div>}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="project-card__chips">{details.length ? details.map((detail) => <span key={detail}>{detail}</span>) : <span>Характеристики уточняются</span>}</div>
        <h3 className="display mt-5 text-3xl"><Link href={detailsHref}>{project.name}</Link></h3>
        <div className="mt-6 border-t border-[var(--line)] pt-4">
          <ProjectPrice project={project} packages={packages} />
          <div className="mt-5 flex flex-wrap gap-2"><Link className="button button--light" href={detailsHref}>Подробнее</Link><Link className="button" href={calculationHref}>Рассчитать этот дом</Link></div>
        </div>
      </div>
    </article>
  );
}
