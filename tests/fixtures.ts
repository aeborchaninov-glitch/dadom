// Synthetic assertions only. Not imported by src/data or production routes.
import type {HouseProject,PortfolioItem,Complectation} from "../src/types/content";
export const pack:Complectation={id:"test-package",name:"Тестовая комплектация",description:"Только проверка интерфейса",includedWorks:["Тест включения"],excludedWorks:["Тест исключения"]};
export const project:HouseProject={
 id:"test-project-id",slug:"test-project-slug",name:"Тест интерфейса — не предложение",description:"Синтетическая запись для проверки шаблона, не проект компании.",
 area:120,dimensions:"10 × 12 м",floors:2,bedrooms:3,rooms:5,intendedUse:"Тестовое назначение",architecturalStyle:null,
 price:1000000,priceStatus:"known",priceCurrency:"RUB",pricePackageId:pack.id,priceUpdatedAt:"2026-11-16",
 heroImage:{src:"/images/hero-concept.png",alt:"Тестовая иллюстрация — не объект компании",isIllustration:true},gallery:[],
 floorPlans:[{src:"/images/hero-concept.png",alt:"Тест отображения без обрезки — не план дома",isIllustration:true}],
 specifications:{},packageIds:[pack.id],includedWorks:["Тест проектных работ"],excludedWorks:["Тест исключений"],featured:true,published:true,seoTitle:null,seoDescription:null,
};
export const missing:HouseProject={...project,id:"test-empty-id",slug:"test-empty",name:"Тест отсутствующих данных",area:null,dimensions:null,floors:null,bedrooms:null,rooms:null,intendedUse:null,price:null,priceStatus:"on-request",pricePackageId:null,priceUpdatedAt:null,heroImage:null,gallery:[],floorPlans:[],packageIds:[],includedWorks:[],excludedWorks:[]};
export const item:PortfolioItem={id:"test-portfolio-id",slug:"test-portfolio",title:"Тест шаблона портфолио — не реальный объект",description:"Синтетические данные только для проверки.",area:null,location:null,completionYear:null,heroImage:null,gallery:[],constructionPhotos:[{src:"/images/audit-missing.jpg",alt:"Тест отсутствующего файла"}],specifications:{},relatedProjectId:project.id,customerBrief:"Тест задачи",completedWorks:["Тест работ"],featured:false,published:true,seoTitle:null,seoDescription:null};
