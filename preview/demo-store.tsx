import React from 'react';
import snapshot from './catalogue.json';
import type {Catalogue,Enquiry} from '../lib/model';
import {Image} from '../components/public';
type Media={id:string;name:string;mime:string;private:number;size:number;content:string};
type Demo=Catalogue&{enquiries:Enquiry[];media:Media[]};
const key='toy-masters-browser-demo-v1';
const base=import.meta.env.BASE_URL;
const sample=(kind:string,name:string,status:string,message:string):Enquiry=>({id:'sample-'+kind,kind,name,email:'client-test@example.com',status,data:{message,subject:'Sample request',productId:snapshot.products[0]?.id,quantity:1},createdAt:new Date().toISOString()});
function initial():Demo{return {...structuredClone(snapshot) as Catalogue,enquiries:[sample('contact','Sample customer','Unread','Demo feedback for testing the inbox. This is a sample message.'),sample('custom','Sample custom order','New','Please test changing this sample custom order status.'),sample('reservation','Sample reservation','New','Please test confirming this sample reservation.')],media:[]};}
export function readDemo():Demo{try{const value=localStorage.getItem(key);if(value){const parsed=JSON.parse(value);if(Array.isArray(parsed.products)&&Array.isArray(parsed.categories)&&Array.isArray(parsed.media)&&parsed.settings)return parsed;}}catch{}return initial();}
function persist(data:Demo){try{localStorage.setItem(key,JSON.stringify(data));}catch{throw new Error('Browser storage is full or unavailable. Remove unused demo photos or reset the demo, then try again.');}}
export function resetDemo(){localStorage.removeItem(key);location.reload();}
export function demoExportUrl(){return 'data:application/json;charset=utf-8,'+encodeURIComponent(JSON.stringify(readDemo(),null,2));}
export function mediaUrl(url:string){return url.startsWith('/api/media/')?readDemo().media.find(m=>m.id===url.slice('/api/media/'.length))?.content||'':url;}
export function DemoImage(props:React.ComponentProps<typeof Image>){return <Image {...props} src={props.src?mediaUrl(props.src):undefined}/>;}
export function publicDemo():Catalogue{const data=readDemo();const categories=data.categories.filter(c=>!c.hidden).map(c=>({...c,image:mediaUrl(c.image)}));return {...data,categories,markets:data.markets.filter(m=>m.status!=='Pending'),products:data.products.filter(p=>p.published&&!p.archived&&categories.some(c=>c.id===p.categoryId)).map(p=>({...p,photos:p.photos.map(im=>({...im,url:mediaUrl(im.url)})),video:mediaUrl(p.video),colours:p.colours.map(c=>({...c,photo:c.photo?mediaUrl(c.photo):undefined}))}))};}
export async function demoFetch(input:RequestInfo|URL,options:RequestInit={}):Promise<Response>{
 const url=String(input),method=options.method||'GET';
 const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json'}});
 try{
  if(url==='/api/auth'){if(method==='DELETE')location.assign(base);return json({ok:true});}
  const store=readDemo();
  if(url==='/api/admin'&&method==='GET')return json(store);
  if(url==='/api/upload'){
   const file=(options.body as FormData).get('file');if(!(file instanceof File)||!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('Choose a JPEG, PNG or WebP demo photo.');
   if(file.size>2*1024*1024)throw new Error('Demo photos must be under 2 MB after resizing.');
   const content=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(new Error('Could not read this photo'));reader.readAsDataURL(file);});
   const id=crypto.randomUUID();store.media.unshift({id,name:file.name,mime:file.type,size:file.size,private:0,content});persist(store);return json({id,url:'/api/media/'+id});
  }
  if(url!=='/api/admin'||method!=='POST')throw new Error('This action is unavailable in the browser demo.');
  const {kind,data}=JSON.parse(String(options.body));
  function upsert(list:any[],item:any){const index=list.findIndex(x=>x.id===item.id);if(index<0)list.unshift(item);else list[index]=item;}
  if(kind==='product'){
   if(store.products.some(p=>p.id!==data.id&&p.slug===data.slug))throw new Error('This URL slug is already used by another product.');
   const now=new Date().toISOString();upsert(store.products,{...data,createdAt:data.createdAt||now,updatedAt:now});
  }else if(kind==='productArchive'||kind==='productRestore'){const p=store.products.find(p=>p.id===data.id);if(!p)throw new Error('Listing no longer exists');p.archived=kind==='productArchive';p.published=false;
  }else if(kind==='category')upsert(store.categories,data);
  else if(kind==='market')upsert(store.markets,data);
  else if(kind==='settings')store.settings=data;
  else if(kind==='enquiry'){const e=store.enquiries.find(e=>e.id===data.id);if(e)e.status=data.status;}
  else if(kind==='mediaRename'){const m=store.media.find(m=>m.id===data.id);if(m)m.name=data.name;}
  else if(kind==='mediaDelete'){
   const url='/api/media/'+data.id;
   if(JSON.stringify([store.products,store.categories,store.markets,store.enquiries]).includes(url))throw new Error('This photo is in use. Remove it from the record first.');
   store.media=store.media.filter(m=>m.id!==data.id);
  }else throw new Error('Unknown demo action');
  persist(store);return json({ok:true});
 }catch(error){return json({error:error instanceof Error?error.message:'Could not save demo changes'},400);}
}
export function DemoNotice(){return <div style={{padding:'12px 20px',textAlign:'center',background:'#26324b',color:'#fff'}}>Browser demo · Changes stay in this browser and are visible only to you. <a href={base+'admin/'} style={{textDecoration:'underline',marginLeft:12}}>Demo admin</a> <button type="button" style={{marginLeft:12,padding:'6px 10px',border:'1px solid #aabbcc',borderRadius:6}} onClick={()=>{if(confirm('Reset all demo changes and photos in this browser?'))resetDemo();}}>Reset demo</button></div>;}
