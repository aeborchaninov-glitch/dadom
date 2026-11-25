import { notFound } from "next/navigation";
import { ProjectCatalog } from "@/components/project-catalog";
import { complectations, publishedProjects } from "@/data/content";
import { getActiveProjectCategories, getCategoryProjects, getProjectCategory } from "@/data/project-categories";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  const categories = getActiveProjectCategories(publishedProjects);
  return categories.length ? categories.map(({ slug }) => ({ slug })) : [{ slug: "__empty" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const category = getProjectCategory((await params).slug);
  if (!category || !getCategoryProjects(category, publishedProjects).length) notFound();
  return pageMetadata(category.title, category.description, `/projects/category/${category.slug}`, true);
}

export default async function ProjectCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const category = getProjectCategory((await params).slug);
  if (!category) notFound();
  const projects = getCategoryProjects(category, publishedProjects);
  if (!projects.length) notFound();
  return <><section className="page-intro"><div className="wrap"><p className="eyebrow">Каталог</p><h1 className="display page-intro__title mt-5">{category.title}</h1><p className="muted mt-5 max-w-2xl leading-7">{category.description}</p></div></section><section className="page-surface"><div className="wrap"><div className="pt-10"><ProjectCatalog projects={projects} packages={complectations} /></div></div></section></>;
}
