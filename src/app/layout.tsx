import type { Metadata } from "next";
import "./globals.css";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";
import {site} from "@/lib/site";
import {company} from "@/data/company";
export const metadata:Metadata={
 title:{default:"ДаДом — каркасные дома на Урале",template:"%s | ДаДом"},
 description:"Проекты каркасных домов и строительство в Екатеринбурге и на Урале.",
 ...(site.url ? {metadataBase:new URL(site.url)}:{}),
 robots:{index:site.indexable,follow:site.indexable},
 icons:{icon:"/brand-icon.svg"},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
 const organization=site.url?{"@context":"https://schema.org","@type":"Organization",name:company.name,url:site.url,areaServed:company.region}:null;
 return <html lang="ru"><body><a href="#main-content" className="skip-link">Перейти к содержанию</a><Header/><main id="main-content">{children}</main><Footer/>{organization&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization).replace(/</g,"\\u003c")}}/>}</body></html>;
}
