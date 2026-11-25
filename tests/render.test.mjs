import test from "node:test";
import assert from "node:assert/strict";
import {createRequire} from "node:module";
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
const load=createRequire(import.meta.url);
const {project,missing,pack,item}=load("./fixtures.ts");
const {ProjectDetail}=load("../src/components/project-detail.tsx");
const {PortfolioDetail}=load("../src/components/portfolio-detail.tsx");
const {ProjectCatalog}=load("../src/components/project-catalog.tsx");
const {QuoteContext}=load("../src/components/quote-context.tsx");
const {HouseCard}=load("../src/components/house-card.tsx");
const render=(component,props)=>renderToStaticMarkup(React.createElement(component,props));
test("populated project renders price, package, plans and quote context link",()=>{
 const html=render(ProjectDetail,{project,packages:[pack]});
 for(const text of [pack.name,project.dimensions,project.floorPlans[0].alt,"object-contain",project.includedWorks[0],project.excludedWorks[0],"/contacts?project="+project.slug])assert.ok(html.includes(text),text);
 assert.equal((html.match(/<h1/g)||[]).length,1);
});
test("missing fields render explicit fallbacks, never null/undefined or a fake price",()=>{
 const html=render(ProjectDetail,{project:missing,packages:[]});
 for(const text of ["Цена по запросу","Уточняется","материалы готовятся"])assert.ok(html.includes(text));
 assert.ok(!html.includes("undefined"));assert.ok(!html.includes(">null<"));
 const card=render(HouseCard,{project:{...project,pricePackageId:null},packages:[pack]});
 assert.ok(card.includes("Цена по запросу"));assert.ok(!card.includes("1 000 000"));
});
test("portfolio renders construction photos and related project URL",()=>{
 const html=render(PortfolioDetail,{item,project});
 assert.ok(html.includes("Ход строительства"));assert.ok(html.includes("/projects/"+project.slug));
});
test("quote shows selected record and ID, not arbitrary query text",()=>{
 const html=render(QuoteContext,{project,requested:true});
 assert.ok(html.includes(project.name));assert.ok(html.includes(project.id));assert.ok(html.includes("ещё не отправлена"));
 assert.ok(render(QuoteContext,{requested:true}).includes("недоступен"));
});
test("catalog pages render no draft records and keep server controls",()=>{
 const html=render(ProjectCatalog,{projects:[project,missing,{...project,id:"draft",slug:"draft",name:"DRAFT_SECRET",published:false}],packages:[pack],query:{floors:"2"}});
 assert.ok(html.includes('method="get"'));assert.ok(html.includes('name="floors"'));
 assert.ok(!html.includes("DRAFT_SECRET"));assert.ok(!html.includes(missing.name));
});
