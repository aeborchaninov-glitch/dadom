import {notFound} from "next/navigation";
import {getProject,publishedProjects,complectations} from "@/data/content";
import {pageMetadata} from "@/lib/seo";
import {ProjectDetail} from "@/components/project-detail";
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return publishedProjects.length ? publishedProjects.map(({slug})=>({slug})) : [{slug:"__empty"}];}
export async function generateMetadata({params}:Props){
  const project=getProject((await params).slug);if(!project)notFound();
  return pageMetadata(project.seoTitle?.trim()||project.name,project.seoDescription?.trim()||project.description,`/projects/${project.slug}`,true,project.heroImage);
}
export default async function ProjectPage({params}:Props){
  const project=getProject((await params).slug);if(!project)notFound();
  return <ProjectDetail project={project} packages={complectations} similar={publishedProjects.filter(p=>p.id!==project.id).slice(0,3)}/>;
}
