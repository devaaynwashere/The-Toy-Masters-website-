import type {Metadata} from 'next';
import './globals.css';
const origin='https://the-toy-masters-melbourne.adoria-4063.chatgpt.site';
export const metadata:Metadata={metadataBase:new URL(origin),title:{default:'The Toy Masters | 3D-Printed Toys Melbourne',template:'%s | The Toy Masters'},description:'Discover Melbourne-made 3D-printed toys, fidgets, articulated creatures and personalised gifts. Browse the range, enquire or find our next Docklands makers market.',icons:{icon:'/favicon.svg'},openGraph:{title:'The Toy Masters',description:'3D-Printed Toys. Made to Move.',type:'website',locale:'en_AU'},twitter:{card:'summary'},alternates:{canonical:'/'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-AU"><body>{children}</body></html>;}
