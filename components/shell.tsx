import {Header,Footer} from './public';
import type {Settings} from '@/lib/model';
export function Shell({settings,children}:{settings:Settings;children:React.ReactNode}){return <><Header settings={settings}/><main id="main">{children}</main><Footer settings={settings}/></>;}
