import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {catalogue} from '@/lib/store';
import {Shell} from '@/components/shell';
import {ProductDetail} from '@/components/public';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=(await catalogue()).products.find(p=>p.slug===slug);return {title:p?.name||'Product not found',description:p?.shortDescription,alternates:{canonical:'/product/'+slug}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const data=await catalogue();const p=data.products.find(p=>p.slug===slug);if(!p)notFound();const structured={'@context':'https://schema.org','@type':'Product',name:p.name,description:p.shortDescription,image:p.photos.map(im=>im.url),brand:{'@type':'Brand',name:data.settings.businessName}};return <Shell settings={data.settings}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/><ProductDetail p={p} data={data}/></Shell>;}
