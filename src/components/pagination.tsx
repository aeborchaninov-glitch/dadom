import Link from "next/link";
import {single,type Query} from "@/lib/catalog";
export function Pagination({path,page,pages,query={}}:{path:string;page:number;pages:number;query?:Query}) {
  if (pages<=1) return null;
  function href(n:number){const params=new URLSearchParams();for(const [k,v]of Object.entries(query)){if(k!=="page"&&single(v))params.set(k,single(v));}if(n>1)params.set("page",String(n));return path+(params.size?"?"+params:"");}
  return <nav aria-label="Страницы каталога" className="mt-10 flex flex-wrap items-center justify-center gap-5">{page>1&&<Link className="button button--light" href={href(page-1)}>← Назад</Link>}<span>Страница {page} из {pages}</span>{page<pages&&<Link className="button button--light" href={href(page+1)}>Далее →</Link>}</nav>;
}
