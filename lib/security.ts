import {env} from 'cloudflare:workers';
import {database} from './store';
import {cookies} from 'next/headers';
export const cookieName='toy_admin';
export function password(){return (env as unknown as {ADMIN_PASSWORD?:string}).ADMIN_PASSWORD||process.env.ADMIN_PASSWORD||'';}
export async function digest(s:string){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(x=>x.toString(16).padStart(2,'0')).join('');}
export async function authenticated(req?:Request){const token=req?req.headers.get('cookie')?.split(';').find(c=>c.trim().startsWith(cookieName+'='))?.trim().slice(cookieName.length+1):(await cookies()).get(cookieName)?.value;if(!token||!password())return false;const row=await database().prepare('SELECT expires,password_version FROM sessions WHERE hash=?').bind(await digest(token)).first<{expires:number;password_version:string}>();return !!row&&row.expires>Date.now()&&row.password_version===await digest(password());}
export function originCheck(req:Request){return req.headers.get('origin')===new URL(req.url).origin;}
export async function limit(key:string,max=8,window=900000){const db=database();const now=Date.now();await db.prepare('INSERT INTO rate_limits (key,count,reset) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN reset < ? THEN 1 ELSE count+1 END,reset=CASE WHEN reset < ? THEN ? ELSE reset END').bind(key,now+window,now,now,now+window).run();const r=await db.prepare('SELECT count FROM rate_limits WHERE key=?').bind(key).first<{count:number}>();return !!r&&r.count<=max;}
export function ip(req:Request){return req.headers.get('cf-connecting-ip')||'local';}
export function json(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store'}});}
