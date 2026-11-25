import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { visualPackages, visualProjects } from "@/data/visual-fixtures";
import { site } from "@/lib/site";

export const metadata = { title: "Визуальная проверка проекта", robots: { index: false, follow: false } };
export const dynamicParams = false;

export function generateStaticParams() {
  return visualProjects.map(({ slug }) => ({ slug }));
}

export default async function VisualProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  if (site.indexable) notFound();
  const { slug } = await params;
  const project = visualProjects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} packages={visualPackages} />;
}
