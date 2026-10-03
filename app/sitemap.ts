import {catalogue} from '@/lib/store';
export default async function sitemap(){const origin='https://the-toy-masters-melbourne.adoria-4063.chatgpt.site';const d=await catalogue();return ['', '/shop','/market','/custom','/about','/gifts','/faq','/contact','/blog','/privacy','/terms',...d.products.map(p=>'/product/'+p.slug)].map(path=>({url:origin+path,changeFrequency:'weekly' as const}));}
