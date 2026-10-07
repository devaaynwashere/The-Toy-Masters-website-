const labels:Record<string,string>={name:'Product name',slug:'Product URL',categoryId:'Category',price:'Price',salePrice:'Sale price',bundlePrice:'Bundle price',bundleQuantity:'Bundle quantity',shortDescription:'Short description',description:'Description',age:'Age recommendation',photos:'Photos',colours:'Colours',video:'Video URL',date:'Market date',start:'Start time',end:'End time',email:'Contact email'};
export function normaliseProduct<T extends {slug?:unknown}>(product:T):T {
  if(typeof product.slug!=='string')return product;
  return {...product,slug:product.slug.trim().toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')};
}
export function saveError(error:unknown):string {
  const e=error as {issues?:{path:(string|number)[];message:string}[];message?:string};
  if(Array.isArray(e?.issues))return e.issues.slice(0,4).map(issue=>{
    const key=String(issue.path[0]||'');
    if(issue.message==='Sale price must not exceed regular price')return 'Sale price must be equal to or lower than Price. Leave Sale price blank if there is no sale.';
    if(key==='slug')return 'Product URL needs at least one letter or number. It will be formatted automatically from words.';
    const label=labels[key]||key;
    return (label?label+': ':'')+issue.message;
  }).join(' ');
  if(e?.message?.includes('UNIQUE constraint failed: products.slug'))return 'That product URL is already used by another product, including archived products. Choose a different URL slug and save again.';
  return 'Could not save changes. Please try again.';
}
