import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const base='/The-Toy-Masters-website-/';
export default defineConfig({root:path.join(root,'preview'),base,publicDir:path.join(root,'public'),resolve:{alias:{'@':root}},plugins:[{name:'preview-links',enforce:'pre',transform(code,id){if(id.replaceAll('\\','/').endsWith('/components/public.tsx'))return code.replace(/(["'])\/(?!\/)([a-zA-Z0-9_/?=&.%+: -]*)\1/g,(_,q,p)=>q+base+p+q);}},react()],build:{outDir:path.join(root,'out'),emptyOutDir:true}});

