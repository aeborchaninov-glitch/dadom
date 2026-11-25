import {notFound} from "next/navigation";
import {getPortfolioItem,getProjectById,publishedPortfolio} from "@/data/content";
import {pageMetadata} from "@/lib/seo";
import {PortfolioDetail} from "@/components/portfolio-detail";
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return publishedPortfolio.length ? publishedPortfolio.map(({slug})=>({slug})) : [{slug:"__empty"}];}
export async function generateMetadata({params}:Props){const item=getPortfolioItem((await params).slug);if(!item)notFound();return pageMetadata(item.seoTitle?.trim()||item.title,item.seoDescription?.trim()||item.description,`/portfolio/${item.slug}`,true,item.heroImage);}
export default async function PortfolioPage({params}:Props){const item=getPortfolioItem((await params).slug);if(!item)notFound();return <PortfolioDetail item={item} project={item.relatedProjectId?getProjectById(item.relatedProjectId):undefined}/>;}
