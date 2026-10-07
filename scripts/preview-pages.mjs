import {readFile,writeFile,mkdir} from 'node:fs/promises';
const data=JSON.parse(await readFile('preview/catalogue.json','utf8'));
const html=await readFile('out/index.html','utf8');
const routes=['admin','product','shop','gifts','market','about','contact','custom','faq','blog','privacy','terms',...data.products.map(p=>'product/'+p.slug)];
for(const route of routes){await mkdir('out/'+route,{recursive:true});await writeFile('out/'+route+'/index.html',html);}
await writeFile('out/404.html',html);
await writeFile('out/.nojekyll','');
console.log('Created '+routes.length+' direct page routes.');
