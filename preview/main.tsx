/// <reference types="vite/client" />
import React from 'react';
import {createRoot} from 'react-dom/client';
import {Header,Footer,Home,Shop,ProductDetail} from '../components/public';
import type {Catalogue} from '../lib/model';
import dataJson from './catalogue.json';
import '../app/globals.css';
const data=dataJson as Catalogue;
const base=import.meta.env.BASE_URL;
const route=location.pathname.slice(base.length).replace(/\/$/,'');
const product=route.startsWith('product/')?data.products.find(p=>p.slug===route.slice(8)):undefined;
function Info(){return <div className="wrap"><section><h1>{route==='about'?'Made in Melbourne.':route==='market'?'Meet us at the market.':route==='faq'?'Care & safety':route==='contact'||route==='custom'?'Catalogue preview':'Coming soon'}</h1><p>{route==='about'?data.settings.about:route==='market'?'Market dates and availability will be confirmed on the full website.':route==='faq'?'Please read the care and safety information on each product. Ask the maker to confirm suitability.':'This temporary site is for browsing the catalogue. Enquiries, reservations, feedback and admin changes are unavailable here.'}</p>{data.settings.email&&<a className="button" href={'mailto:'+data.settings.email}>Email the maker</a>}<p><a className="button secondary" href={base+'shop/'}>Browse the catalogue</a></p></section></div>}
createRoot(document.getElementById('root')!).render(<React.StrictMode><div style={{padding:'12px 20px',textAlign:'center',background:'#26324b',color:'#fff'}}>Temporary catalogue preview · Enquiries and admin are unavailable · Prices and availability require confirmation.</div><Header settings={data.settings}/><main id="main">{route===''?<Home data={data}/>:route==='shop'||route==='gifts'?<Shop data={data} gifts={route==='gifts'}/>:product?<ProductDetail p={product} data={data}/>:<Info/>}</main><Footer settings={data.settings}/></React.StrictMode>);
