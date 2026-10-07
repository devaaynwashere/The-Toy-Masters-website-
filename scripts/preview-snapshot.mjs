import {DatabaseSync} from 'node:sqlite';
import {readdir,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const dir='.wrangler/state/v3/d1/miniflare-D1DatabaseObject';
const file=(await readdir(dir)).find(f=>f.endsWith('.sqlite')&&f!=='metadata.sqlite');
if(!file)throw new Error('Start the local website first to create its catalogue database.');
const db=new DatabaseSync(path.join(dir,file),{readOnly:true});
const rows=table=>db.prepare('SELECT * FROM '+table).all();
const categories=rows('categories').filter(c=>!c.hidden).map(c=>({...c,hidden:false})).sort((a,b)=>a.position-b.position);
const images=rows('product_images'),colours=rows('product_colours');
const products=rows('products').filter(p=>p.published&&!p.archived&&categories.some(c=>c.id===p.category_id)).map(row=>{const p=JSON.parse(row.data);const cs=colours.filter(c=>c.product_id===p.id);return {...p,price:row.price,published:true,archived:false,photos:images.filter(i=>i.product_id===p.id).sort((a,b)=>a.position-b.position).map(i=>({url:i.url,alt:i.alt})),colours:cs.length?cs.map(c=>({name:c.name,hex:c.hex,photo:c.photo})):p.colours};});
const mp=rows('market_products'),md=rows('market_deals');
const markets=rows('markets').map(r=>JSON.parse(r.data)).filter(m=>m.status!=='Pending').map(m=>({...m,products:mp.filter(r=>r.market_id===m.id).map(r=>r.product_id),deals:md.filter(r=>r.market_id===m.id).map(r=>r.label)}));
const settings=JSON.parse(db.prepare("SELECT data FROM site_settings WHERE id='main'").get().data);
const catalogue={products,categories,markets,settings};
await mkdir('public/preview-media',{recursive:true});
async function media(url){if(!url?.startsWith('/api/media/'))return url;const id=url.split('/').pop();const response=await fetch('http://127.0.0.1:5173'+url);if(!response.ok)throw new Error('Unable to copy public catalogue image '+id);const ext={'image/webp':'webp','image/png':'png','image/jpeg':'jpg','video/mp4':'mp4'}[response.headers.get('content-type')?.split(';')[0]];if(!ext)throw new Error('Unsupported public image type');await writeFile('public/preview-media/'+id+'.'+ext,Buffer.from(await response.arrayBuffer()));return '/The-Toy-Masters-website-/preview-media/'+id+'.'+ext;}
for(const p of products){for(const im of p.photos)im.url=await media(im.url);for(const c of p.colours)if(c.photo)c.photo=await media(c.photo);p.video=await media(p.video);}
for(const c of categories)c.image=await media(c.image);
for(const m of markets)for(const im of m.photos||[])im.url=await media(im.url);
await writeFile('preview/catalogue.json',JSON.stringify(catalogue,null,2)+'\n');
db.close();console.log('Exported '+products.length+' public products. Private messages, sessions and credentials excluded.');
