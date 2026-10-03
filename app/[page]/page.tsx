import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {catalogue} from '@/lib/store';
import {Shell} from '@/components/shell';
import {Shop} from '@/components/public';
import {ContentPage} from '@/components/pages';
export const dynamic='force-dynamic';
const titles:Record<string,string>={shop:'Shop 3D-Printed Toys',market:'Melbourne Makers Market',custom:'Custom 3D-Printed Gifts',about:'About The Toy Masters',gifts:'Gift Guide',faq:'Safety, Care & FAQ',contact:'Contact',blog:'Print Stories',privacy:'Privacy',terms:'Terms'};
export async function generateMetadata({params}:{params:Promise<{page:string}>}):Promise<Metadata>{const {page}=await params;return {title:titles[page]||'Page not found',alternates:{canonical:'/'+page}};}
export default async function Page({params}:{params:Promise<{page:string}>}){const {page}=await params;if(!titles[page])notFound();const data=await catalogue();return <Shell settings={data.settings}>{page==='shop'||page==='gifts'?<Shop data={data} gifts={page==='gifts'}/>:<ContentPage page={page} data={data}/>}</Shell>;}
