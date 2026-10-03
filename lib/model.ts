export type Photo={id?:string;mediaId?:string;url:string;alt:string};
export type Colour={name:string;hex:string;photo?:string};
export type Product={id:string;slug:string;name:string;categoryId:string;price:number;salePrice?:number;bundlePrice?:number;bundleQuantity?:number;bundleLabel?:string;shortDescription:string;description:string;subcategory:string;tags:string[];type:string;size:string;age:string;material:string;care:string;safety:string;makerNote:string;customisable:boolean;stock:string;marketAvailable:boolean;featured:boolean;isNew:boolean;marketPick:boolean;published:boolean;archived:boolean;photos:Photo[];colours:Colour[];video:string;occasions:string[];related:string[];createdAt:string;updatedAt:string};
export type Category={id:string;name:string;image:string;icon:string;position:number;hidden:boolean};
export type Market={id:string;name:string;date:string;status:string;start:string;end:string;venue:string;address:string;stall:string;notes:string;photos:Photo[];products:string[];deals:string[]};
export type Settings={businessName:string;tagline:string;email:string;instagram:string;tiktok:string;youtube:string;location:string;announcement:string;marketBanner:string;about:string;maker:string;reviews:string;transport:string};
export type Enquiry={id:string;kind:string;name:string;email:string;status:string;data:Record<string,unknown>;createdAt:string};
export type Catalogue={products:Product[];categories:Category[];markets:Market[];settings:Settings};
export const money=(n:number)=>new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:2}).format(n);
export const currentPrice=(p:Product)=>p.salePrice??p.price;
export const marketDate=(m:Market)=>new Date(m.date+'T12:00:00+10:00').toLocaleDateString('en-AU',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Australia/Melbourne'});
export function marketIsUpcoming(m:Market){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Australia/Melbourne',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());const get=(k:string)=>parts.find(p=>p.type===k)?.value||'';const now=`${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`;return m.status==='Confirmed'&&`${m.date}T${m.end||'23:59'}`>now;}
export const nextMarket=(markets:Market[])=>markets.filter(marketIsUpcoming).sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start))[0];
