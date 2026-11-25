import type {MetadataRoute} from "next";
import {site} from "@/lib/site";
import {publishedProjects,publishedPortfolio,complectations} from "@/data/content";
import {company} from "@/data/company";
import {publishedArticles,publishedTechnology} from "@/data/editorial";
export const dynamic = "force-static";
export default function sitemap():MetadataRoute.Sitemap{
 if(!site.indexable)return [];
 const paths=["/",...(publishedProjects.length?["/projects"]:[]),...(publishedPortfolio.length?["/portfolio"]:[]),...(complectations.length?["/complectations"]:[]),...(publishedTechnology.length?["/technology"]:[]),...(publishedArticles.length?["/articles"]:[]),...(company.phone||company.email?["/contacts"]:[])];
 return [...paths,...publishedProjects.map(p=>"/projects/"+p.slug),...publishedPortfolio.map(p=>"/portfolio/"+p.slug),...publishedTechnology.map(p=>"/technology/"+p.slug),...publishedArticles.map(p=>"/articles/"+p.slug)].map(path=>({url:site.url+path}));
}
