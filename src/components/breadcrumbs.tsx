import Link from "next/link";
import {site} from "@/lib/site";
export function Breadcrumbs({items}:{items:{label:string;href:string}[]}) {
  const all=[{label:"Главная",href:"/"},...items];
  const data={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:all.map((item,i)=>({"@type":"ListItem",position:i+1,name:item.label,item:site.url+item.href}))};
  return <><nav aria-label="Хлебные крошки" className="mb-8"><ol className="flex flex-wrap items-center gap-x-3 text-sm">{all.map((item,i)=><li key={item.href}>{i>0&&<span className="mr-3 muted" aria-hidden="true">/</span>}{i===all.length-1?<span aria-current="page">{item.label}</span>:<Link className="inline-flex min-h-11 items-center underline underline-offset-4" href={item.href}>{item.label}</Link>}</li>)}</ol></nav>{site.url&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}}/>}</>;
}
