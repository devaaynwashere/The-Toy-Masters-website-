import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const base='/The-Toy-Masters-website-/';
export default defineConfig({root:path.join(root,'preview'),base,publicDir:path.join(root,'public'),resolve:{alias:{'@':root}},plugins:[{name:'preview-links',enforce:'pre',transform(code,id){
 const file=id.replaceAll('\\','/');
 if(file.endsWith('/components/admin.tsx')){
  code="import {demoFetch,demoExportUrl,mediaUrl as demoMediaUrl} from '@/preview/demo-store';\n"+code.replaceAll('fetch(', 'demoFetch(').replace("import {Image} from './public';","import {DemoImage as Image} from '@/preview/demo-store';").replaceAll("'/api/media/'+m.id","demoMediaUrl('/api/media/'+m.id)").replaceAll('Logout','Exit demo').replace('href="/api/export" download','href={demoExportUrl()} download="toy-masters-demo.json"').replace('Download database backup','Export demo data').replace('Messages are stored here; email notifications are not configured.','The inbox contains sample messages for testing.');
 }
 if(file.endsWith('/components/public.tsx'))code=code.replaceAll("'/product/'+p.slug","'/product/?slug='+encodeURIComponent(p.slug)");
 if(file.endsWith('/components/public.tsx')||file.endsWith('/components/admin.tsx'))return code.replace(/(["'])\/(?!\/)([a-zA-Z0-9_/?=&.%+: -]*)\1/g,(_,q,p)=>p.startsWith('api/')?q+'/'+p+q:q+base+p+q);
}},react()],build:{outDir:path.join(root,'out'),emptyOutDir:true}});

