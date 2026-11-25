// Lightweight TS/TSX loader for node:test only; never imported by the app.
import Module from "node:module";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
const original=Module._resolveFilename;
Module._resolveFilename=function(id,parent,...args){
  return original.call(this,id.startsWith("@/")?path.resolve("src",id.slice(2)):id,parent,...args);
};
for(const extension of [".ts",".tsx"]) Module._extensions[extension]=(module,filename)=>{
  const source=fs.readFileSync(filename,"utf8");
  module._compile(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,target:ts.ScriptTarget.ES2020}}).outputText,filename);
};
