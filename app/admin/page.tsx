import {authenticated} from '@/lib/security';
import {Admin} from '@/components/admin';
export const dynamic='force-dynamic';
export const metadata={title:'Private Admin',robots:{index:false,follow:false}};
export default async function Page(){return <Admin initialAuthenticated={await authenticated()}/>;}
