// Run against a production server with an empty initial catalog.
import assert from "node:assert/strict";
import {gzipSync} from "node:zlib";
const origin=process.argv[2]||"http://localhost:3000";
for(const [path,status] of [["/",200],["/projects",200],["/portfolio",200],["/contacts?project=unknown",200],["/complectations",200],["/technology",200],["/about",200],["/privacy",200],["/consent",200],["/projects/audit-missing",404],["/portfolio/audit-missing",404],["/audit-missing",404],["/thank-you",404]]) {
 const response=await fetch(origin+path);
 assert.equal(response.status,status,path);
 const html=await response.text();
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,path+" H1");
 console.log(response.status,path);
 if(path==="/"){
  const scripts=[...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>m[1]))];
  let raw=0,gzip=0;
  for(const src of scripts){const r=await fetch(new URL(src,origin));assert.ok(r.ok,src);const bytes=Buffer.from(await r.arrayBuffer());raw+=bytes.length;gzip+=gzipSync(bytes).length;}
  console.log(JSON.stringify({homeScriptFiles:scripts.length,decodedJsBytes:raw,localGzipJsBytes:gzip}));
 }
}
for(const width of [640,1080]){
 const r=await fetch(origin+"/_next/image?url=%2Fimages%2Fhero-concept.png&w="+width+"&q=75",{headers:{Accept:"image/webp"}});
 assert.ok(r.ok);
 console.log(JSON.stringify({heroWidth:width,type:r.headers.get("content-type"),bytes:(await r.arrayBuffer()).byteLength}));
}
