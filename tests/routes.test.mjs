import test from "node:test";
import assert from "node:assert/strict";
import {createRequire} from "node:module";
import {renderToStaticMarkup} from "react-dom/server";
const load=createRequire(import.meta.url);
const content=load("../src/data/content.ts");
const {project,pack,item}=load("./fixtures.ts");
const projectRoute=load("../src/app/projects/[slug]/page.tsx");
const portfolioRoute=load("../src/app/portfolio/[slug]/page.tsx");
const contactsRoute=load("../src/app/contacts/page.tsx");
const params=slug=>({params:Promise.resolve({slug})});
test("actual route handlers: published records, metadata, ID relation, draft and missing 404",async()=>{
 content.projects.push(project,{...project,id:"draft-id",slug:"draft",published:false});
 content.publishedProjects.push(project);content.complectations.push(pack);
 content.portfolio.push(item);content.publishedPortfolio.push(item);
 try{
  assert.deepEqual(projectRoute.generateStaticParams(),[{slug:project.slug}]);
  assert.deepEqual(portfolioRoute.generateStaticParams(),[{slug:item.slug}]);
  const metadata=await projectRoute.generateMetadata(params(project.slug));
  assert.equal(metadata.title,project.name);
  assert.equal(metadata.description,project.description);
  assert.ok(renderToStaticMarkup(await projectRoute.default(params(project.slug))).includes(pack.name));
  assert.ok(renderToStaticMarkup(await portfolioRoute.default(params(item.slug))).includes("/projects/"+project.slug));
  const quote=renderToStaticMarkup(await contactsRoute.default({searchParams:Promise.resolve({project:project.slug})}));
  assert.ok(quote.includes(project.id));assert.ok(quote.includes("ещё не отправлена"));
  for(const slug of ["missing","draft"]) {
   await assert.rejects(()=>projectRoute.default(params(slug)),/NEXT_HTTP_ERROR_FALLBACK;404/);
   await assert.rejects(()=>projectRoute.generateMetadata(params(slug)),/NEXT_HTTP_ERROR_FALLBACK;404/);
  }
  await assert.rejects(()=>portfolioRoute.default(params("missing")),/NEXT_HTTP_ERROR_FALLBACK;404/);
 }finally{
  content.projects.length=0;content.portfolio.length=0;content.complectations.length=0;content.publishedProjects.length=0;content.publishedPortfolio.length=0;
 }
});
