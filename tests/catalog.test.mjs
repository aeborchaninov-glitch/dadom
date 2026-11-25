import test from "node:test";
import assert from "node:assert/strict";
import {createRequire} from "node:module";
const load=createRequire(import.meta.url);
const {project,missing,pack,item}=load("./fixtures.ts");
const {priceDetails,findPublished,queryProjects,galleryImages,validateContent,projectSpecs}=load("../src/lib/catalog.ts");
const {siteSettings}=load("../src/lib/site.ts");
test("price is hidden unless a named package and positive amount exist",()=>{
 for(const p of [missing,{...project,pricePackageId:null},{...project,price:0},{...project,price:NaN},{...project,price:-1},{...project,priceStatus:"on-request"}]) assert.equal(priceDetails(p,[pack]).label,"Цена по запросу");
 assert.equal(priceDetails(project,[pack]).package.name,pack.name);
 assert.equal(priceDetails(project,[]).amount,null);
});
test("drafts cannot be resolved by slug or id; relation uses id",()=>{
 const draft={...project,published:false};
 assert.equal(findPublished([draft],draft.slug),undefined);
 assert.equal(findPublished([draft],draft.id,"id"),undefined);
 assert.equal(findPublished([project],item.relatedProjectId,"id"),project);
 assert.equal(findPublished([project],item.relatedProjectId),undefined);
});
test("filtering excludes unknown values only when corresponding filter active",()=>{
 const data=[project,missing,{...project,id:"draft",slug:"draft",published:false}];
 assert.equal(queryProjects(data,[pack],{}).total,2);
 for(const q of [{minArea:"100"},{maxArea:"150"},{floors:"2"},{bedrooms:"3"},{maxPrice:"1000000"},{use:project.intendedUse}]) assert.deepEqual(queryProjects(data,[pack],q).items,[project]);
 assert.equal(queryProjects(data,[pack],{maxPrice:"999999"}).total,0);
 assert.equal(queryProjects(data,[pack],{minArea:"oops"}).total,2);
});
test("null values sort last, pagination handles 100 records and bad input",()=>{
 for(const sort of ["area-asc","area-desc","price-asc","price-desc"]) assert.equal(queryProjects([missing,project],[pack],{sort}).items.at(-1),missing);
 const many=Array.from({length:100},(_,i)=>({...project,id:"p-"+i,slug:"p-"+i}));
 assert.equal(queryProjects(many,[pack],{}).items.length,12);
 assert.equal(queryProjects(many,[pack],{page:"999"}).page,9);
 assert.equal(queryProjects(many,[pack],{page:"9"}).items.length,4);
 assert.equal(queryProjects(many,[pack],{page:"-1"}).page,1);
 assert.equal(queryProjects(many,[pack],{page:["2","3"]}).page,1);
});
test("validation rejects duplicate URLs, invalid price and broken relation",()=>{
 const valid=project;
 assert.deepEqual(validateContent([valid],[],[pack]),[]);
 assert.ok(validateContent([valid,{...valid,id:"another"}],[],[pack]).some(e=>e.includes("slug")));
 assert.ok(validateContent([{...valid,pricePackageId:null}],[],[pack]).some(e=>e.includes("цена")));
 assert.ok(validateContent([valid],[{...item,relatedProjectId:"absent",constructionPhotos:[]}],[pack]).some(e=>e.includes("relatedProjectId")));
 assert.ok(validateContent([{...valid,area:-10}],[],[pack]).length);
});
test("images merge cover first, no duplicates; unknown specs stay null",()=>{
 assert.deepEqual(galleryImages(project.heroImage,[project.heroImage]),[project.heroImage]);
 assert.deepEqual(galleryImages(null,[]),[]);
 assert.equal(projectSpecs(missing).find(([key])=>key==="Площадь")[1],null);
});
test("domain alone never enables indexing, URL is normalized and validated",()=>{
 assert.equal(siteSettings("https://example.ru/").indexable,false);
 assert.equal(siteSettings("https://example.ru/","true").url,"https://example.ru");
 assert.equal(siteSettings("","true").indexable,false);
 assert.throws(()=>siteSettings("http://example.ru","true"));
 assert.throws(()=>siteSettings("https://example.ru/path","true"));
});
