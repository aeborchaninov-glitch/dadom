import { complectations, publishedProjects } from "@/data/content";
import { ProjectCatalog } from "@/components/project-catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Проекты каркасных домов", "Каталог проектов каркасных домов: характеристики, планировки и комплектации строительства на Урале.", "/projects", publishedProjects.length > 0);

export default function ProjectsPage() {
  return <><section className="page-intro"><div className="wrap"><p className="eyebrow">Каталог</p><h1 className="display page-intro__title mt-5">Проекты домов</h1><p className="muted mt-5 max-w-2xl leading-7">Типовые проекты с характеристиками, планировками и условиями расчёта.</p></div></section><section className="page-surface"><div className="wrap"><div className="pt-10"><ProjectCatalog projects={publishedProjects} packages={complectations} /></div></div></section></>;
}