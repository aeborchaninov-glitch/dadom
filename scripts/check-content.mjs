import {createRequire} from "node:module";
import fs from "node:fs";
const load=createRequire(import.meta.url);
const {projects,portfolio,complectations}=load("../src/data/content.ts");
const {validateContent}=load("../src/lib/catalog.ts");
const errors=validateContent(projects,portfolio,complectations);
for(const p of [...projects,...portfolio]){
 const images=[...(p.heroImage?[p.heroImage]:[]),...p.gallery,...(p.floorPlans??p.constructionPhotos)];
 for(const image of images)if(!fs.existsSync("public"+image.src))errors.push(p.id+": файл не найден "+image.src);
}
if(errors.length){console.error(errors.join("\n"));process.exitCode=1;}else console.log("Контент корректен: "+projects.length+" проектов, "+portfolio.length+" объектов, "+complectations.length+" комплектаций.");
