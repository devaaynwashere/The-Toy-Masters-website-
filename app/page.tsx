import {catalogue} from '@/lib/store';
import {Shell} from '@/components/shell';
import {Home} from '@/components/public';
export const dynamic='force-dynamic';
export default async function Page(){const data=await catalogue();return <Shell settings={data.settings}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness",name:data.settings.businessName,description:data.settings.tagline,areaServed:"Melbourne",url:"https://the-toy-masters-melbourne.adoria-4063.chatgpt.site"}).replace(/</g,"\u003c")}}/><Home data={data}/></Shell>;}
