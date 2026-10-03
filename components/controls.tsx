'use client';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
export function Choice({label,value,onChange,options}:{label:string;value:string;onChange:(v:string)=>void;options:(string|{value:string;label:string})[]}){return <label className="field"><span>{label}</span><Select value={value||'__empty'} onValueChange={v=>onChange(v==='__empty'?'':v)}><SelectTrigger aria-label={label}><SelectValue/></SelectTrigger><SelectContent>{options.map(o=>{const v=typeof o==='string'?o:o.value;return <SelectItem value={v||'__empty'} key={v}>{typeof o==='string'?o:o.label}</SelectItem>;})}</SelectContent></Select></label>;}
export function Check({label,checked,onChange}:{label:string;checked:boolean;onChange:(v:boolean)=>void}){return <label className="check"><Checkbox checked={checked} onCheckedChange={v=>onChange(v===true)}/><span>{label}</span></label>;}

