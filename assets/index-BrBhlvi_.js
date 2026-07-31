var zt=Object.defineProperty;var Tt=(e,t,n)=>t in e?zt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Me=(e,t,n)=>Tt(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=(e,t,n=[])=>{const r=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(a=>{r.setAttribute(a,String(t[a]))}),n.length&&n.forEach(a=>{const i=ct(...a);r.appendChild(i)}),r};var Et=([e,t,n])=>ct(e,t,n);/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=e=>Array.from(e.attributes).reduce((t,n)=>(t[n.name]=n.value,t),{}),_t=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",Ft=e=>e.flatMap(_t).map(n=>n.trim()).filter(Boolean).filter((n,r,a)=>a.indexOf(n)===r).join(" "),Nt=e=>e.replace(/(\w)(\w*)(_|-|\s*)/g,(t,n,r)=>n.toUpperCase()+r.toLowerCase()),Ye=(e,{nameAttr:t,icons:n,attrs:r})=>{var g;const a=e.getAttribute(t);if(a==null)return;const i=Nt(a),o=n[i];if(!o)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const c=Ct(e),[s,l,d]=o,u={...l,"data-lucide":a,...r,...c},p=Ft(["lucide",`lucide-${a}`,c,r]);p&&Object.assign(u,{class:p});const v=Et([s,u,d]);return(g=e.parentNode)==null?void 0:g.replaceChild(v,e)};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=["svg",A,[["path",{d:"m16 3 4 4-4 4"}],["path",{d:"M20 7H4"}],["path",{d:"m8 21-4-4 4-4"}],["path",{d:"M4 17h16"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=["svg",A,[["path",{d:"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"}],["path",{d:"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jt=["svg",A,[["path",{d:"M20 6 9 17l-5-5"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=["svg",A,[["path",{d:"m9 18 6-6-6-6"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=["svg",A,[["path",{d:"M12 13v8"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"m8 17 4-4 4 4"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=["svg",A,[["path",{d:"m18 16 4-4-4-4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"m14.5 4-5 16"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=["svg",A,[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"7 10 12 15 17 10"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=["svg",A,[["path",{d:"M10 12v-1"}],["path",{d:"M10 18v-2"}],["path",{d:"M10 7V6"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01"}],["circle",{cx:"10",cy:"20",r:"2"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=["svg",A,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=["svg",A,[["path",{d:"M20 7h-3a2 2 0 0 1-2-2V2"}],["path",{d:"M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"}],["path",{d:"M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=["svg",A,[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}],["path",{d:"M9 18c-4.51 2-5-2-7-2"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=["svg",A,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=["svg",A,[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jt=["svg",A,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=["svg",A,[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=["svg",A,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=["svg",A,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=({icons:e={},nameAttr:t="data-lucide",attrs:n={}}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const r=document.querySelectorAll(`[${t}]`);if(Array.from(r).forEach(a=>Ye(a,{nameAttr:t,icons:e,attrs:n})),t==="data-lucide"){const a=document.querySelectorAll("[icon-name]");a.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(a).forEach(i=>Ye(i,{nameAttr:"icon-name",icons:e,attrs:n})))}};class K extends Error{constructor(n,r,a){super(r);Me(this,"code");Me(this,"details");this.name="AccountConverterError",this.code=n,this.details=a}}function xe(e,t){if(!Number.isSafeInteger(e)||e<=0)throw new K("invalid_grouping",`${t} must be a positive integer`,{field:t})}function Zt(e,t){if(e.length===0)return[];if(t.mode==="merge")return[[...e]];if(t.mode==="chunkSize"){xe(t.chunkSize,"chunkSize");const c=[];for(let s=0;s<e.length;s+=t.chunkSize)c.push(e.slice(s,s+t.chunkSize));return c}if(t.mode==="customSizes"){if(t.sizes.length===0)throw new K("invalid_grouping","sizes must contain at least one positive integer",{field:"sizes"});t.sizes.forEach((l,d)=>xe(l,`sizes[${d}]`));const c=[];let s=0;for(const l of t.sizes){if(s>=e.length)break;const d=Math.min(s+l,e.length);c.push(e.slice(s,d)),s=d}return s<e.length&&c.push(e.slice(s)),c}xe(t.partCount,"partCount");const n=Math.min(t.partCount,e.length),r=Math.floor(e.length/n);let a=e.length%n,i=0;const o=[];for(let c=0;c<n;c+=1){const s=r+(a>0?1:0);a-=a>0?1:0,o.push(e.slice(i,i+s)),i+=s}return o}function fe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function de(e){return typeof e=="string"&&e.trim()!==""?e:void 0}function W(e,t){for(const n of e)for(const r of t){const a=de(n[r]);if(a!==void 0)return a}}function Wt(e){return fe(e.credentials)?e.credentials:void 0}function Qt(e){const t=Wt(e),n=fe(e.extra)?e.extra:void 0,r=[t,e,n].filter(a=>a!==void 0);return{accessToken:W(r,["access_token","accessToken"]),refreshToken:W(r,["refresh_token","refreshToken"]),idToken:W(r,["id_token","idToken"]),accountId:W(r,["account_id","chatgpt_account_id","accountId"]),userId:W(r,["user_id","chatgpt_user_id","userId"]),email:W(r,["email"]),planType:W(r,["plan_type","planType"])}}function en(e){return fe(e.credentials)||"platform"in e||"concurrency"in e?"sub2api":de(e.access_token)!==void 0||de(e.refresh_token)!==void 0||de(e.id_token)!==void 0?"cpa":"unknown"}function tn(e){var n;const t=e.trim();if(t==="")throw new K("empty_input","Input is empty");try{return[JSON.parse(t)]}catch{const r=[],a=e.split(/\r?\n/u);for(let i=0;i<a.length;i+=1){const o=((n=a[i])==null?void 0:n.trim())??"";if(o!=="")try{r.push(JSON.parse(o))}catch{throw new K("invalid_jsonl",`Invalid JSON on line ${i+1}`,{line:i+1})}}if(r.length===0)throw new K("empty_input","Input is empty");return r}}function Ce(e,t,n){if(Array.isArray(e)){e.forEach((s,l)=>Ce(s,{...t,path:`${t.path}[${l}]`},n));return}if(!fe(e))throw new K("unsupported_value",`Expected an account object at ${t.path}`,{path:t.path});const r=Array.isArray(e.proxies)?e.proxies:t.proxies,a=de(e.exported_at)??t.exportedAt,i=fe(e.data)?e.data:void 0,c=[["accounts",Array.isArray(e.accounts)?e.accounts:void 0],["items",Array.isArray(e.items)?e.items:void 0],["auths",Array.isArray(e.auths)?e.auths:void 0],["data.accounts",i&&Array.isArray(i.accounts)?i.accounts:void 0]].find(s=>s[1]!==void 0);if(c!=null&&c[1]){c[1].forEach((s,l)=>{Ce(s,{path:`${t.path}.${c[0]}[${l}]`,...r?{proxies:r}:{},...a?{exportedAt:a}:{}},n)});return}n.push({ordinal:n.length+1,sourceFormat:en(e),sourcePath:t.path,original:structuredClone(e),oauth:Qt(e),...r?{sourceProxies:structuredClone(r)}:{},...a?{sourceExportedAt:a}:{}})}function nn(e){const t=typeof e=="string"?tn(e):[e],n=[];if(t.forEach((r,a)=>Ce(r,{path:t.length===1?"$":`$line[${a+1}]`},n)),n.length===0)throw new K("no_accounts","No accounts were found");return n}function lt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function pe(e){return structuredClone(e)}function me(e,t){return!e||e.trim()===""||/^(?:placeholder|mock|fake|your[_-]?token|xxx|null|undefined)$/iu.test(e.trim())?!1:!t||e.split(".").length===3}function dt(e){const t=[];if(me(e.oauth.accessToken,!0)||t.push("access_token"),me(e.oauth.refreshToken,!1)||t.push("refresh_token"),me(e.oauth.idToken,!0)||t.push("id_token"),me(e.oauth.accountId,!1)||t.push("account_id"),t.length>0)throw new K("missing_cpa_credentials",`Account ${e.ordinal} cannot be converted to CPA`,{account:e.ordinal,missing:t});return{...e.oauth,accessToken:e.oauth.accessToken,refreshToken:e.oauth.refreshToken,idToken:e.oauth.idToken,accountId:e.oauth.accountId}}function rn(e){const t=dt(e),n=e.original,r=lt(n.credentials)?n.credentials:void 0,a={type:typeof n.type=="string"&&n.type!=="oauth"?n.type:"codex",access_token:t.accessToken,refresh_token:t.refreshToken,id_token:t.idToken,account_id:t.accountId};t.email&&(a.email=t.email),typeof n.priority=="number"&&(a.priority=n.priority),typeof n.disabled=="boolean"&&(a.disabled=n.disabled);for(const i of["last_refresh","expired","proxy_url","weight"]){const o=n[i]??(r==null?void 0:r[i]);o!==void 0&&(a[i]=pe(o))}return a}function an(e,t){if(e.sourceFormat==="sub2api"&&lt(e.original.credentials))return pe(e.original);const n=dt(e),r={access_token:n.accessToken,refresh_token:n.refreshToken,id_token:n.idToken,chatgpt_account_id:n.accountId};return n.userId&&(r.chatgpt_user_id=n.userId),n.email&&(r.email=n.email),n.planType&&(r.plan_type=n.planType),{name:`codex-account-${String(t).padStart(3,"0")}`,platform:"openai",type:"oauth",credentials:r,...n.planType?{plan_type:n.planType}:{},...typeof e.original.priority=="number"?{priority:e.original.priority}:{},...n.email?{extra:{email:n.email}}:{}}}function _e(e){return Array.isArray(e)?`[${e.map(_e).join(",")}]`:e&&typeof e=="object"?`{${Object.keys(e).sort().map(t=>`${JSON.stringify(t)}:${_e(e[t])}`).join(",")}}`:JSON.stringify(e)}function on(e){const t=new Set,n=[];for(const r of e)for(const a of r.sourceProxies??[]){const i=_e(a);t.has(i)||(t.add(i),n.push(pe(a)))}return n}function ge(e,t){return String(e).padStart(Math.max(3,String(t).length),"0")}function sn(e){const t=new Date(e);if(Number.isNaN(t.getTime()))throw new K("invalid_generated_at","generatedAt must be a valid date-time");const n=e.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})/u);if(n)return`${n[1]}${n[2]}${n[3]}-${n[4]}${n[5]}${n[6]}`;const r=t.getUTCFullYear(),a=String(t.getUTCMonth()+1).padStart(2,"0"),i=String(t.getUTCDate()).padStart(2,"0"),o=String(t.getUTCHours()).padStart(2,"0"),c=String(t.getUTCMinutes()).padStart(2,"0"),s=String(t.getUTCSeconds()).padStart(2,"0");return`${r}${a}${i}-${o}${c}${s}`}function cn(e,t){if(e.length===0)throw new K("no_accounts","No accounts were provided");const n=Zt(e,t.grouping),r=t.indent??2,a=t.generatedAt??new Date().toISOString(),i=sn(a),o=e.length;if(t.format==="cpa"){const s=[];let l=0;return n.forEach((d,u)=>{d.forEach(p=>{l+=1,s.push({filename:`accounts-${i}-cpa-${o}-account-${ge(l,o)}-of-${ge(o,o)}.json`,mediaType:"application/json",content:JSON.stringify(rn(p),null,r),accountCount:1,bundleIndex:u+1,bundleCount:n.length,format:"cpa"})})}),s}let c=0;return n.map((s,l)=>{var u;let d;return t.format==="sub2api"?d={exported_at:t.exportedAt??((u=s[0])==null?void 0:u.sourceExportedAt)??a,proxies:on(s),accounts:s.map(p=>(c+=1,an(p,c)))}:d=s.length===1?pe(s[0].original):s.map(p=>pe(p.original)),{filename:n.length===1?`accounts-${i}-${t.format}-${o}.json`:`accounts-${i}-${t.format}-${o}-part-${ge(l+1,n.length)}-of-${ge(n.length,n.length)}.json`,mediaType:"application/json",content:JSON.stringify(d,null,r),accountCount:s.length,bundleIndex:l+1,bundleCount:n.length,format:t.format}})}var z=Uint8Array,L=Uint16Array,qe=Int32Array,De=new z([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Be=new z([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ze=new z([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ut=function(e,t){for(var n=new L(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var a=new qe(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)a[i]=i-n[r]<<5|r;return{b:n,r:a}},ft=ut(De,2),ln=ft.b,Fe=ft.r;ln[28]=258,Fe[258]=28;var dn=ut(Be,0),We=dn.r,Ne=new L(32768);for(var m=0;m<32768;++m){var Y=(m&43690)>>1|(m&21845)<<1;Y=(Y&52428)>>2|(Y&13107)<<2,Y=(Y&61680)>>4|(Y&3855)<<4,Ne[m]=((Y&65280)>>8|(Y&255)<<8)>>1}var ue=(function(e,t,n){for(var r=e.length,a=0,i=new L(t);a<r;++a)e[a]&&++i[e[a]-1];var o=new L(t);for(a=1;a<t;++a)o[a]=o[a-1]+i[a-1]<<1;var c;if(n){c=new L(1<<t);var s=15-t;for(a=0;a<r;++a)if(e[a])for(var l=a<<4|e[a],d=t-e[a],u=o[e[a]-1]++<<d,p=u|(1<<d)-1;u<=p;++u)c[Ne[u]>>s]=l}else for(c=new L(r),a=0;a<r;++a)e[a]&&(c[a]=Ne[o[e[a]-1]++]>>15-e[a]);return c}),Q=new z(288);for(var m=0;m<144;++m)Q[m]=8;for(var m=144;m<256;++m)Q[m]=9;for(var m=256;m<280;++m)Q[m]=7;for(var m=280;m<288;++m)Q[m]=8;var ye=new z(32);for(var m=0;m<32;++m)ye[m]=5;var un=ue(Q,9,0),fn=ue(ye,5,0),pt=function(e){return(e+7)/8|0},ht=function(e,t,n){return(n==null||n>e.length)&&(n=e.length),new z(e.subarray(t,n))},pn=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],we=function(e,t,n){var r=new Error(t||pn[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,we),!n)throw r;return r},J=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},se=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},ze=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var a=n.length,i=n.slice();if(!a)return{t:mt,l:0};if(a==1){var o=new z(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(E,_){return E.f-_.f}),n.push({s:-1,f:25001});var c=n[0],s=n[1],l=0,d=1,u=2;for(n[0]={s:-1,f:c.f+s.f,l:c,r:s};d!=a-1;)c=n[n[l].f<n[u].f?l++:u++],s=n[l!=d&&n[l].f<n[u].f?l++:u++],n[d++]={s:-1,f:c.f+s.f,l:c,r:s};for(var p=i[0].s,r=1;r<a;++r)i[r].s>p&&(p=i[r].s);var v=new L(p+1),g=Ie(n[d-1],v,0);if(g>t){var r=0,y=0,T=g-t,B=1<<T;for(i.sort(function(_,w){return v[w.s]-v[_.s]||_.f-w.f});r<a;++r){var j=i[r].s;if(v[j]>t)y+=B-(1<<g-v[j]),v[j]=t;else break}for(y>>=T;y>0;){var V=i[r].s;v[V]<t?y-=1<<t-v[V]++-1:++r}for(;r>=0&&y;--r){var S=i[r].s;v[S]==t&&(--v[S],++y)}g=t}return{t:new z(v),l:g}},Ie=function(e,t,n){return e.s==-1?Math.max(Ie(e.l,t,n+1),Ie(e.r,t,n+1)):t[e.s]=n},Qe=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new L(++t),r=0,a=e[0],i=1,o=function(s){n[r++]=s},c=1;c<=t;++c)if(e[c]==a&&c!=t)++i;else{if(!a&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(a),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(a);i=1,a=e[c]}return{c:n.subarray(0,r),n:t}},ce=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},vt=function(e,t,n){var r=n.length,a=pt(t+2);e[a]=r&255,e[a+1]=r>>8,e[a+2]=e[a]^255,e[a+3]=e[a+1]^255;for(var i=0;i<r;++i)e[a+i+4]=n[i];return(a+4+r)*8},et=function(e,t,n,r,a,i,o,c,s,l,d){J(t,d++,n),++a[256];for(var u=ze(a,15),p=u.t,v=u.l,g=ze(i,15),y=g.t,T=g.l,B=Qe(p),j=B.c,V=B.n,S=Qe(y),E=S.c,_=S.n,w=new L(19),h=0;h<j.length;++h)++w[j[h]&31];for(var h=0;h<E.length;++h)++w[E[h]&31];for(var f=ze(w,7),F=f.t,ee=f.l,N=19;N>4&&!F[Ze[N-1]];--N);var te=l+5<<3,P=ce(a,Q)+ce(i,ye)+o,O=ce(a,p)+ce(i,y)+o+14+3*N+ce(w,F)+2*w[16]+3*w[17]+7*w[18];if(s>=0&&te<=P&&te<=O)return vt(t,d,e.subarray(s,s+l));var H,b,q,X;if(J(t,d,1+(O<P)),d+=2,O<P){H=ue(p,v,0),b=p,q=ue(y,T,0),X=y;var be=ue(F,ee,0);J(t,d,V-257),J(t,d+5,_-1),J(t,d+10,N-4),d+=14;for(var h=0;h<N;++h)J(t,d+3*h,F[Ze[h]]);d+=3*N;for(var U=[j,E],oe=0;oe<2;++oe)for(var ne=U[oe],h=0;h<ne.length;++h){var R=ne[h]&31;J(t,d,be[R]),d+=F[R],R>15&&(J(t,d,ne[h]>>5&127),d+=ne[h]>>12)}}else H=un,b=Q,q=fn,X=ye;for(var h=0;h<c;++h){var k=r[h];if(k>255){var R=k>>18&31;se(t,d,H[R+257]),d+=b[R+257],R>7&&(J(t,d,k>>23&31),d+=De[R]);var re=k&31;se(t,d,q[re]),d+=X[re],re>3&&(se(t,d,k>>5&8191),d+=Be[re])}else se(t,d,H[k]),d+=b[k]}return se(t,d,H[256]),d+b[256]},hn=new qe([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),mt=new z(0),vn=function(e,t,n,r,a,i){var o=i.z||e.length,c=new z(r+o+5*(1+Math.ceil(o/7e3))+a),s=c.subarray(r,c.length-a),l=i.l,d=(i.r||0)&7;if(t){d&&(s[0]=i.r>>3);for(var u=hn[t-1],p=u>>13,v=u&8191,g=(1<<n)-1,y=i.p||new L(32768),T=i.h||new L(g+1),B=Math.ceil(n/3),j=2*B,V=function(ke){return(e[ke]^e[ke+1]<<B^e[ke+2]<<j)&g},S=new qe(25e3),E=new L(288),_=new L(32),w=0,h=0,f=i.i||0,F=0,ee=i.w||0,N=0;f+2<o;++f){var te=V(f),P=f&32767,O=T[te];if(y[P]=O,T[te]=P,ee<=f){var H=o-f;if((w>7e3||F>24576)&&(H>423||!l)){d=et(e,s,0,S,E,_,h,F,N,f-N,d),F=w=h=0,N=f;for(var b=0;b<286;++b)E[b]=0;for(var b=0;b<30;++b)_[b]=0}var q=2,X=0,be=v,U=P-O&32767;if(H>2&&te==V(f-U))for(var oe=Math.min(p,H)-1,ne=Math.min(32767,f),R=Math.min(258,H);U<=ne&&--be&&P!=O;){if(e[f+q]==e[f+q-U]){for(var k=0;k<R&&e[f+k]==e[f+k-U];++k);if(k>q){if(q=k,X=U,k>oe)break;for(var re=Math.min(U,k-2),Ke=0,b=0;b<re;++b){var $e=f-U+b&32767,xt=y[$e],Je=$e-xt&32767;Je>Ke&&(Ke=Je,O=$e)}}}P=O,O=y[P],U+=P-O&32767}if(X){S[F++]=268435456|Fe[q]<<18|We[X];var Ge=Fe[q]&31,Xe=We[X]&31;h+=De[Ge]+Be[Xe],++E[257+Ge],++_[Xe],ee=f+q,++w}else S[F++]=e[f],++E[e[f]]}}for(f=Math.max(f,ee);f<o;++f)S[F++]=e[f],++E[e[f]];d=et(e,s,l,S,E,_,h,F,N,f-N,d),l||(i.r=d&7|s[d/8|0]<<3,d-=7,i.h=T,i.p=y,i.i=f,i.w=ee)}else{for(var f=i.w||0;f<o+l;f+=65535){var Ae=f+65535;Ae>=o&&(s[d/8|0]=l,Ae=o),d=vt(s,d+1,e.subarray(f,Ae))}i.i=o}return ht(c,0,r+pt(d)+a)},mn=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),gn=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=mn[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}},yn=function(e,t,n,r,a){if(!a&&(a={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),o=new z(i.length+e.length);o.set(i),o.set(e,i.length),e=o,a.w=i.length}return vn(e,t.level==null?6:t.level,t.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,a)},gt=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n},$=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function wn(e,t){return yn(e,t||{},0,0)}var yt=function(e,t,n,r){for(var a in e){var i=e[a],o=t+a,c=r;Array.isArray(i)&&(c=gt(r,i[1]),i=i[0]),ArrayBuffer.isView(i)?n[o]=[i,c]:(n[o+="/"]=[new z(0),c],yt(i,o,n,r))}},tt=typeof TextEncoder<"u"&&new TextEncoder,Sn=typeof TextDecoder<"u"&&new TextDecoder,bn=0;try{Sn.decode(mt,{stream:!0}),bn=1}catch{}function Le(e,t){var n;if(tt)return tt.encode(e);for(var r=e.length,a=new z(e.length+(e.length>>1)),i=0,o=function(l){a[i++]=l},n=0;n<r;++n){if(i+5>a.length){var c=new z(i+8+(r-n<<1));c.set(a),a=c}var s=e.charCodeAt(n);s<128||t?o(s):s<2048?(o(192|s>>6),o(128|s&63)):s>55295&&s<57344?(s=65536+(s&1047552)|e.charCodeAt(++n)&1023,o(240|s>>18),o(128|s>>12&63),o(128|s>>6&63),o(128|s&63)):(o(224|s>>12),o(128|s>>6&63),o(128|s&63))}return ht(a,0,i)}var je=function(e){var t=0;if(e)for(var n in e){var r=e[n].length;r>65535&&we(9),t+=r+4}return t},nt=function(e,t,n,r,a,i,o,c){var s=r.length,l=n.extra,d=c&&c.length,u=je(l);$(e,t,o!=null?33639248:67324752),t+=4,o!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(i<0&&8),e[t++]=a&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var p=new Date(n.mtime==null?Date.now():n.mtime),v=p.getFullYear()-1980;if((v<0||v>119)&&we(10),$(e,t,v<<25|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>1),t+=4,i!=-1&&($(e,t,n.crc),$(e,t+4,i<0?-i-2:i),$(e,t+8,n.size)),$(e,t+12,s),$(e,t+14,u),t+=16,o!=null&&($(e,t,d),$(e,t+6,n.attrs),$(e,t+10,o),t+=14),e.set(r,t),t+=s,u)for(var g in l){var y=l[g],T=y.length;$(e,t,+g),$(e,t+2,T),e.set(y,t+4),t+=4+T}return d&&(e.set(c,t),t+=d),t},$n=function(e,t,n,r,a){$(e,t,101010256),$(e,t+8,n),$(e,t+10,n),$(e,t+12,r),$(e,t+16,a)};function An(e,t){t||(t={});var n={},r=[];yt(e,"",n,t);var a=0,i=0;for(var o in n){var c=n[o],s=c[0],l=c[1],d=l.level==0?0:8,u=Le(o),p=u.length,v=l.comment,g=v&&Le(v),y=g&&g.length,T=je(l.extra);p>65535&&we(11);var B=d?wn(s,l):s,j=B.length,V=gn();V.p(s),r.push(gt(l,{size:s.length,crc:V.d(),c:B,f:u,m:g,u:p!=o.length||g&&v.length!=y,o:a,compression:d})),a+=30+p+T+j,i+=76+2*(p+T)+(y||0)+j}for(var S=new z(i+22),E=a,_=i-a,w=0;w<r.length;++w){var u=r[w];nt(S,u.o,u,u.f,u.u,u.c.length);var h=30+u.f.length+je(u.extra);S.set(u.c,u.o+h),nt(S,a,u,u.f,u.u,u.c.length,u.o,u.m),a+=16+h+(u.m?u.m.length:0)}return $n(S,a,r.length,_,E),S}const kn={outputFormat:"sub2api",bundleMode:"merged",splitMode:"accounts_per_file",splitValue:20,customSizes:"5,10,20,30,100"};function ae(e){const t=e.outputFormat,n=t==="cpa"?"split":e.bundleMode;return{outputFormat:t,bundleMode:n,splitMode:t==="cpa"?"accounts_per_file":e.splitMode,splitValue:Math.max(1,Math.floor(Number(e.splitValue)||1)),customSizes:e.customSizes}}function ve(e,t){const n=t.trim().split(/[,，\/／\s]+/u).filter(Boolean);if(n.length===0)return{requestedSizes:[],outputSizes:[],remaining:Math.max(0,e),error:"请输入至少一个分组数量"};const r=[];for(const s of n){if(!/^\d+$/u.test(s))return{requestedSizes:r,outputSizes:[],remaining:Math.max(0,e),error:`“${s}”不是有效的正整数`};const l=Number(s);if(!Number.isSafeInteger(l)||l<=0)return{requestedSizes:r,outputSizes:[],remaining:Math.max(0,e),error:"分组数量必须是安全的正整数"};r.push(l)}const a=Math.max(0,Math.floor(e)),i=[];let o=a,c=0;for(const s of r){if(o===0)break;const l=Math.min(s,o);s>o&&(c=o),i.push(l),o-=l}return o>0&&(c=o,i.push(o)),{requestedSizes:r,outputSizes:i,remaining:c,error:null}}function Mn(e){const t=ae(e);let n={mode:"merge"};if(t.bundleMode==="split")if(t.splitMode==="custom_sizes"){const r=ve(0,t.customSizes);if(r.error)throw new Error(r.error);n={mode:"customSizes",sizes:r.requestedSizes}}else n=t.splitMode==="accounts_per_file"?{mode:"chunkSize",chunkSize:t.splitValue}:{mode:"partCount",partCount:t.splitValue};return{format:t.outputFormat,grouping:n}}function wt(e,t){const n=ae(t);if(e<1)return 0;if(n.outputFormat==="cpa")return e;if(n.bundleMode==="merged")return 1;if(n.splitMode==="custom_sizes"){const r=ve(e,n.customSizes);return r.error?0:r.outputSizes.length}return n.splitMode==="file_count"?Math.min(e,n.splitValue):Math.ceil(e/n.splitValue)}function rt(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(1)} MB`}function Ve(e){const t=n=>String(n).padStart(2,"0");return[e.getFullYear(),t(e.getMonth()+1),t(e.getDate()),"-",t(e.getHours()),t(e.getMinutes()),t(e.getSeconds())].join("")}function he(e,t,n,r,a,i){const o=`accounts-${e}-${t}-${n}`;if(a===void 0||i===void 0)return`${o}.${r}`;const c=Math.max(3,String(i).length),s=String(a).padStart(c,"0"),l=String(i).padStart(c,"0");return`${o}-part-${s}-of-${l}.${r}`}const at=5e3,xn=256*1024*1024,zn=[".json",".jsonl",".ndjson"],St=document.querySelector("#app");if(!St)throw new Error("Missing #app root");let C=[],M=[],Se=[],x={...kn},Z=Ve(new Date),I=!1,bt="等待添加文件",$t="neutral";const Pe={ArrowRightLeft:It,Braces:Lt,Check:jt,ChevronRight:Pt,Code2:qt,Download:Dt,FileArchive:Bt,FileJson:Vt,Files:Ht,Github:Ut,Info:Rt,LockKeyhole:Kt,Plus:Jt,RefreshCw:Gt,ShieldCheck:Xt,Trash2:Yt,UploadCloud:Ot};function He(){const e=window.location.hash.replace(/^#\/?/,"");return e==="api"||e==="privacy"?e:"convert"}function Te(e,t,n){const r=He()===e;return`
    <a class="nav-link${r?" is-active":""}" href="#/${e}" ${r?'aria-current="page"':""}>
      <i data-lucide="${n}" aria-hidden="true"></i>
      <span>${t}</span>
    </a>
  `}function Tn(e){return`
    <div class="workspace">
      <aside class="sidebar" aria-label="主导航">
        <div class="sidebar-top">
          <a class="brand" href="#/convert" aria-label="Sub2API / CPA 转换与分号器首页">
            <span class="brand-mark"><i data-lucide="refresh-cw" aria-hidden="true"></i></span>
            <span class="brand-copy"><strong>Sub2API / CPA</strong><small>转换与分号器</small></span>
          </a>
          <nav>
            ${Te("convert","转换工具","files")}
            ${Te("api","API / SDK","code-2")}
            ${Te("privacy","隐私说明","shield-check")}
          </nav>
        </div>
        <div class="sidebar-footer">
          <div class="local-status">
            <span class="status-dot" aria-hidden="true"></span>
            本地处理
          </div>
          <a class="repository-link" href="https://github.com/code-nailao/sources-account-converter" target="_blank" rel="noreferrer">
            <i data-lucide="github" aria-hidden="true"></i>
            开源仓库
          </a>
          <div class="sidebar-note">
            <i data-lucide="lock-keyhole" aria-hidden="true"></i>
            <span>文件仅在当前页面内存中处理</span>
          </div>
        </div>
      </aside>
      <main class="main-content"><div class="content-frame">${e}</div></main>
    </div>
  `}function Ue(e,t,n){return`
    <div class="page-header">
      <div>
        <p class="eyebrow">${e}</p>
        <h1>${t}</h1>
        <p>${n}</p>
      </div>
    </div>
  `}function Re(e){return{sub2api:"Sub2API",cpa:"CPA",mixed:"混合格式",unknown:"待识别"}[e]??"待识别"}function En(e){return e.replace(/[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}/g,"[令牌已隐藏]").replace(/(Bearer\s+)[^\s,;]+/gi,"$1[已隐藏]").replace(/((?:access|refresh|id)[_-]?token\s*[:=]\s*)[^\s,;]+/gi,"$1[已隐藏]")}function le(e){return e.replace(/[&<>"']/gu,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t]??t)}function Cn(){return C.length===0?'<div class="empty-files">尚未添加文件</div>':'<div class="file-list" id="file-list" role="list"></div>'}function _n(){const e=document.querySelector("#file-list");e&&C.forEach((t,n)=>{const r=Se[n],a=document.createElement("div");a.className="file-row",a.setAttribute("role","listitem");const i=document.createElement("span");i.className="file-icon",i.innerHTML='<i data-lucide="file-json" aria-hidden="true"></i>';const o=document.createElement("div");o.className="file-details";const c=document.createElement("strong");c.textContent=t.name;const s=document.createElement("span");s.textContent=r?`${Re(r.format)} · ${r.accountCount} 个账号 · ${rt(t.size)}`:`${rt(t.size)} · 待解析`,o.append(c,s);const l=document.createElement("button");l.className="icon-button",l.type="button",l.title="移除文件",l.setAttribute("aria-label",`移除 ${t.name}`),l.dataset.removeIndex=String(n),l.innerHTML='<i data-lucide="trash-2" aria-hidden="true"></i>',a.append(i,o,l),e.append(a)})}function Fn(){const e=new Set(Se.map(t=>t.format));return e.size===0?"自动识别":[...e].map(Re).join(" + ")}function At(e,t){const n=ve(e,t);return n.error?`<p class="custom-error" id="custom-error">${le(n.error)}</p>`:e===0?'<p class="custom-empty" id="custom-error">添加账号后显示实际分组</p>':`
    <div class="group-preview" id="custom-error" aria-label="分组预览">
      <span class="group-preview-label">将生成</span>
      <div class="group-size-list">
        ${n.outputSizes.map((r,a)=>`<span class="group-size${n.remaining>0&&a===n.outputSizes.length-1?" is-remainder":""}">${r}</span>`).join("")}
      </div>
      ${n.remaining>0?`<small>剩余 ${n.remaining} 个自动成组</small>`:""}
    </div>
  `}function Nn(){const e=ae(x),t=M.length,n=wt(t,e),r=e.bundleMode==="split",a=e.outputFormat==="cpa",i=!a&&r&&e.splitMode==="custom_sizes",o=i?ve(t,e.customSizes):null,c=!!(o!=null&&o.error),s=n>1?"ZIP":"JSON",l=t===0?"添加文件后显示":c?"请修正自定义分组":he(Z,e.outputFormat,t,n>1?"zip":"json");return`
    ${Ue("ACCOUNT TOOLKIT","Sub2API / CPA 转换与分号器","合并、拆分和格式转换都在当前浏览器中完成。")}
    <section class="converter-layout" aria-label="账号转换工具">
      <div class="converter-main">
        <div class="section-heading">
          <div>
            <span class="step-index">1</span>
            <h2>添加账号文件</h2>
          </div>
          ${C.length>0?`<div class="section-actions">
                  <button class="quiet-button" id="add-files" type="button"><i data-lucide="plus" aria-hidden="true"></i>继续添加</button>
                  <button class="icon-button danger-button" id="clear-files" type="button" title="清空文件" aria-label="清空文件"><i data-lucide="trash-2" aria-hidden="true"></i></button>
                </div>`:""}
        </div>
        <label class="drop-zone${I?" is-disabled":""}" id="drop-zone" for="file-input">
          <input id="file-input" type="file" accept=".json,.jsonl,.ndjson,application/json" multiple ${I?"disabled":""} />
          <span class="drop-icon"><i data-lucide="upload-cloud" aria-hidden="true"></i></span>
          <strong>拖入 JSON 文件，或点击选择</strong>
          <span>支持单个大文件和多个单账号文件</span>
        </label>
        ${Cn()}

        <div class="section-divider"></div>
        <div class="section-heading">
          <div>
            <span class="step-index">2</span>
            <h2>格式转换</h2>
          </div>
        </div>

        <div class="format-flow">
          <div class="format-source">
            <span class="format-label">输入格式</span>
            <div class="format-node">
              <strong>${Fn()}</strong>
              <small>${C.length>0?`${C.length} 个文件`:"JSON / JSONL"}</small>
            </div>
          </div>
          <span class="format-arrow"><i data-lucide="arrow-right-left" aria-hidden="true"></i></span>
          <fieldset class="field-group format-output">
            <legend>输出格式</legend>
            <div class="format-options" data-field="outputFormat">
              <button type="button" data-value="sub2api" class="${e.outputFormat==="sub2api"?"is-selected":""}"><i data-lucide="braces" aria-hidden="true"></i><span><strong>Sub2API</strong><small>标准导入包</small></span></button>
              <button type="button" data-value="cpa" class="${e.outputFormat==="cpa"?"is-selected":""}"><i data-lucide="file-json" aria-hidden="true"></i><span><strong>CPA</strong><small>逐账号文件</small></span></button>
            </div>
          </fieldset>
        </div>

        <div class="section-divider"></div>
        <div class="section-heading">
          <div>
            <span class="step-index">3</span>
            <h2>拆分与打包</h2>
          </div>
        </div>

        ${a?'<div class="locked-rule"><i data-lucide="file-archive" aria-hidden="true"></i><div><strong>每个账号单独输出</strong><span>多个 CPA 文件自动打包为 ZIP</span></div></div>':`<div class="settings-grid">
          <fieldset class="field-group">
            <legend>打包方式</legend>
            <div class="segmented" data-field="bundleMode">
              <button type="button" data-value="merged" class="${e.bundleMode==="merged"?"is-selected":""}">合并为一份</button>
              <button type="button" data-value="split" class="${e.bundleMode==="split"?"is-selected":""}">拆分文件</button>
            </div>
          </fieldset>

          <fieldset class="field-group split-settings${r?"":" is-hidden"}">
            <legend>拆分规则</legend>
            <div class="segmented is-three" data-field="splitMode">
              <button type="button" data-value="accounts_per_file" class="${e.splitMode==="accounts_per_file"?"is-selected":""}">固定数量</button>
              <button type="button" data-value="file_count" class="${e.splitMode==="file_count"?"is-selected":""}">均分份数</button>
              <button type="button" data-value="custom_sizes" class="${e.splitMode==="custom_sizes"?"is-selected":""}">自定义</button>
            </div>
          </fieldset>

          <label class="number-field split-settings${r&&e.splitMode!=="custom_sizes"?"":" is-hidden"}" for="split-value">
            <span>${e.splitMode==="accounts_per_file"?"每份账号数":"目标份数"}</span>
            <input id="split-value" type="number" min="1" step="1" inputmode="numeric" value="${e.splitValue}" />
          </label>

          <div class="custom-settings split-settings${i?"":" is-hidden"}">
            <label for="custom-sizes">每份账号数</label>
            <input id="custom-sizes" type="text" inputmode="numeric" autocomplete="off" spellcheck="false" value="${le(e.customSizes)}" placeholder="5,10,20,30,100" />
            <div class="quick-sizes" aria-label="快捷添加数量">
              ${[5,10,20,30,100].map(d=>`<button type="button" data-append-size="${d}"><i data-lucide="plus" aria-hidden="true"></i>${d}</button>`).join("")}
            </div>
            <div id="custom-preview">${At(t,e.customSizes)}</div>
          </div>
        </div>`}
      </div>

      <aside class="output-panel" aria-label="输出摘要">
        <div class="output-heading">
          <span class="output-icon"><i data-lucide="file-archive" aria-hidden="true"></i></span>
          <div>
            <span>输出摘要</span>
            <strong>${Re(e.outputFormat)}</strong>
          </div>
        </div>
        <dl class="summary-list">
          <div><dt>已选文件</dt><dd>${C.length}</dd></div>
          <div><dt>账号总数</dt><dd>${t}</dd></div>
          <div><dt>输出文件</dt><dd id="summary-output-count">${c?"-":n}</dd></div>
          <div><dt>下载类型</dt><dd id="summary-download-type">${c?"待修正":s}</dd></div>
        </dl>
        <div class="filename-preview"><span>下载文件</span><code id="summary-filename" title="${le(l)}">${le(l)}</code></div>
        <div class="status-line is-${$t}" role="status" aria-live="polite">
          <span></span>${le(En(bt))}
        </div>
        <button class="primary-button" id="download-button" type="button" ${I||t===0||c?"disabled":""}>
          <i data-lucide="${I?"refresh-cw":"download"}" aria-hidden="true" class="${I?"spin":""}"></i>
          ${I?"处理中":"生成并下载"}
        </button>
        <p class="privacy-inline"><i data-lucide="shield-check" aria-hidden="true"></i>处理过程不发送网络请求</p>
      </aside>
    </section>
  `}const kt=`import {
  parseAccounts,
  renderArtifacts,
} from "@sources/account-converter-core";

const batches = await Promise.all(
  [...input.files].map(async (file) => parseAccounts(await file.text())),
);
const accounts = batches.flat().map((account, index) => ({
  ...account,
  ordinal: index + 1,
}));

const artifacts = renderArtifacts(accounts, {
  format: "sub2api",
  grouping: { mode: "chunkSize", chunkSize: 20 },
});`,Mt=`import { readFile, writeFile } from "node:fs/promises";
import {
  parseAccounts,
  renderArtifacts,
} from "@sources/account-converter-core";

const accounts = parseAccounts(await readFile("accounts.json", "utf8"));
const artifacts = renderArtifacts(accounts, {
  format: "cpa",
  grouping: { mode: "merge" },
});

await Promise.all(
  artifacts.map((artifact) => writeFile(artifact.filename, artifact.content)),
);`;function it(e,t){return`
    <div class="code-block">
      <button class="copy-button" type="button" data-copy="${t}"><i data-lucide="files" aria-hidden="true"></i>复制</button>
      <pre><code id="${t}"></code></pre>
    </div>
  `}function In(){return`
    ${Ue("INTEGRATION","API / SDK 接入","同一套 core 能力可运行在浏览器或 Node.js，不依赖远程转换服务。")}
    <div class="docs-layout">
      <nav class="docs-index" aria-label="本页目录">
        <a href="#browser-sdk">浏览器 SDK<i data-lucide="chevron-right" aria-hidden="true"></i></a>
        <a href="#node-sdk">Node.js SDK<i data-lucide="chevron-right" aria-hidden="true"></i></a>
        <a href="#contract">接口约定<i data-lucide="chevron-right" aria-hidden="true"></i></a>
      </nav>
      <article class="docs-article">
        <section id="browser-sdk">
          <div class="doc-title"><span>01</span><div><h2>浏览器 SDK</h2><p>读取 File 对象后直接在当前页面进程中转换。</p></div></div>
          ${it(kt,"browser-sdk-code")}
        </section>
        <section id="node-sdk">
          <div class="doc-title"><span>02</span><div><h2>Node.js SDK</h2><p>适合本地脚本、CLI 和自托管内部工具。</p></div></div>
          ${it(Mt,"node-sdk-code")}
        </section>
        <section id="contract">
          <div class="doc-title"><span>03</span><div><h2>接口约定</h2><p>敏感账号数据只保留在调用方内存，页面只消费安全摘要。</p></div></div>
          <div class="contract-table" role="table" aria-label="SDK 接口约定">
            <div role="row"><strong role="cell">parseAccounts</strong><span role="cell">解析 JSON、JSONL 与常见账号容器</span></div>
            <div role="row"><strong role="cell">groupAccounts</strong><span role="cell">按每份数量或目标份数进行稳定分组</span></div>
            <div role="row"><strong role="cell">renderArtifacts</strong><span role="cell">输出 Sub2API 文档或逐账号 CPA 文件</span></div>
          </div>
          <div class="filename-examples">
            <span>产物命名示例</span>
            <code>accounts-20260731-150809-sub2api-200.json</code>
            <code>accounts-20260731-150809-sub2api-200-part-002-of-010.json</code>
            <code>accounts-20260731-150809-cpa-200.zip</code>
          </div>
          <div class="notice"><i data-lucide="info" aria-hidden="true"></i><p>本页面不调用远程 HTTP 转换 API。需要服务端集成时，应在自己的环境中调用 Node.js SDK。</p></div>
        </section>
      </article>
    </div>
  `}function Ln(){return`
    ${Ue("PRIVACY","隐私说明","转换器以本地优先为前提设计，账号文件不离开当前浏览器。")}
    <div class="privacy-grid">
      <section class="privacy-lead">
        <span class="large-icon"><i data-lucide="shield-check" aria-hidden="true"></i></span>
        <h2>本地读取，本地生成</h2>
        <p>上传控件只读取你主动选择的文件。解析、格式转换、拆分和 ZIP 生成均由本地 core 模块完成。</p>
      </section>
      <section class="privacy-points" aria-label="隐私措施">
        <div><i data-lucide="check" aria-hidden="true"></i><span><strong>无上传接口</strong>页面代码不使用 fetch、XMLHttpRequest 或表单上传。</span></div>
        <div><i data-lucide="check" aria-hidden="true"></i><span><strong>无持久化</strong>不写入 Cookie、localStorage、IndexedDB 或浏览器缓存数据库。</span></div>
        <div><i data-lucide="check" aria-hidden="true"></i><span><strong>不展示凭据</strong>界面只显示文件名、格式、账号数量和安全诊断。</span></div>
        <div><i data-lucide="check" aria-hidden="true"></i><span><strong>主动释放</strong>清空文件、切换页面或关闭窗口时销毁转换会话。</span></div>
      </section>
    </div>
    <section class="privacy-boundary">
      <div class="doc-title"><span>!</span><div><h2>边界说明</h2><p>浏览器仍可能受扩展程序、恶意脚本和受感染设备影响。</p></div></div>
      <p>建议使用可信浏览器、关闭不必要扩展，并在处理后删除下载目录中的临时文件。Node.js SDK 的文件安全由运行它的主机负责。</p>
    </section>
  `}function D(){const e=He(),t=e==="api"?In():e==="privacy"?Ln():Nn();if(St.innerHTML=Tn(t),Ee({icons:Pe}),e==="convert")_n(),Ee({icons:Pe}),Hn();else if(e==="api"){const n=document.querySelector("#browser-sdk-code"),r=document.querySelector("#node-sdk-code");n&&(n.textContent=kt),r&&(r.textContent=Mt),Un()}}function G(e,t="neutral"){bt=e,$t=t}function ie(){M=[],Se=[]}function jn(e){if(e.length>at)return`单次最多选择 ${at} 个文件`;const t=e.find(r=>!zn.some(a=>r.name.toLowerCase().endsWith(a)));return t?`不支持的文件类型：${t.name}`:e.reduce((r,a)=>r+a.size,0)>xn?"文件总大小不能超过 256 MB":null}async function Oe(e){if(I||e.length===0)return;const t=[...C,...e],n=jn(t);if(n){G(n,"error"),D();return}I=!0,ie(),C.length===0&&(Z=Ve(new Date)),C=t,G("正在解析文件"),D();try{const r=await Promise.all(C.map(async a=>{const i=nn(await a.text()),o=new Set(i.map(s=>s.sourceFormat)),c=o.size===1?o.values().next().value??"unknown":"mixed";return{name:a.name,accounts:i,format:c}}));M=r.flatMap(a=>a.accounts).map((a,i)=>({...a,ordinal:i+1})),Se=r.map(a=>({name:a.name,accountCount:a.accounts.length,format:a.format})),G(`已识别 ${M.length} 个账号`,"success")}catch(r){ie(),G(r instanceof Error?r.message:"文件解析失败","error")}finally{I=!1,D()}}function Pn(){ie(),C=[],Z=Ve(new Date),G("等待添加文件"),D()}function On(e){const t=C.filter((n,r)=>r!==e);if(ie(),C=[],t.length===0){G("等待添加文件"),D();return}Oe(t)}function ot(e,t){const n=URL.createObjectURL(e),r=document.createElement("a");r.href=n,r.download=t,r.click(),window.setTimeout(()=>URL.revokeObjectURL(n),0)}function qn(e,t){const n=Math.max(3,String(t).length),r=String(e).padStart(n,"0"),a=String(t).padStart(n,"0");return`accounts-${Z}-cpa-${t}-account-${r}-of-${a}.json`}function Dn(e){return e.map((t,n)=>{let r;return x.outputFormat==="cpa"?r=qn(n+1,M.length):e.length===1?r=he(Z,x.outputFormat,M.length,"json"):r=he(Z,x.outputFormat,M.length,"json",n+1,e.length),{...t,filename:r}})}function Bn(e){const t={};return e.forEach(n=>{t[n.filename]=Le(n.content)}),An(t,{level:6})}async function Vn(){if(!(M.length===0||I)){I=!0,G("正在生成下载文件"),D();try{const e=Dn(cn(M,Mn(x)));if(e.length===1){const t=e[0];ot(new Blob([t.content],{type:t.mediaType}),t.filename)}else{const t=Bn(e);ot(new Blob([t.buffer],{type:"application/zip"}),he(Z,x.outputFormat,M.length,"zip"))}G("下载文件已生成","success")}catch(e){G(e instanceof Error?e.message:"生成下载文件失败","error")}finally{I=!1,D()}}}function Hn(){var r,a,i,o;const e=document.querySelector("#file-input");e==null||e.addEventListener("change",()=>{Oe(Array.from(e.files??[])),e.value=""}),(r=document.querySelector("#add-files"))==null||r.addEventListener("click",()=>e==null?void 0:e.click());const t=document.querySelector("#drop-zone");t==null||t.addEventListener("dragover",c=>{c.preventDefault(),t.classList.add("is-dragging")}),t==null||t.addEventListener("dragleave",()=>t.classList.remove("is-dragging")),t==null||t.addEventListener("drop",c=>{var s;c.preventDefault(),t.classList.remove("is-dragging"),Oe(Array.from(((s=c.dataTransfer)==null?void 0:s.files)??[]))}),(a=document.querySelector("#clear-files"))==null||a.addEventListener("click",Pn),(i=document.querySelector("#download-button"))==null||i.addEventListener("click",()=>void Vn()),document.querySelectorAll("[data-remove-index]").forEach(c=>{c.addEventListener("click",()=>On(Number(c.dataset.removeIndex)))}),document.querySelectorAll("[data-field]").forEach(c=>{c.addEventListener("click",s=>{const l=s.target.closest("button[data-value]");if(!l||l.disabled)return;const d=c.dataset.field;x=ae({...x,[d]:l.dataset.value}),D()})}),(o=document.querySelector("#split-value"))==null||o.addEventListener("change",c=>{x=ae({...x,splitValue:Number(c.target.value)}),D()});const n=document.querySelector("#custom-sizes");n==null||n.addEventListener("input",()=>{x={...x,customSizes:n.value},st()}),document.querySelectorAll("[data-append-size]").forEach(c=>{c.addEventListener("click",()=>{if(!n)return;const s=c.dataset.appendSize,l=n.value.trim().replace(/[,，\/／\s]+$/u,"");n.value=l?`${l},${s}`:s??"",x={...x,customSizes:n.value},st(),n.focus(),n.setSelectionRange(n.value.length,n.value.length)})})}function st(){const e=ae(x),t=ve(M.length,e.customSizes),n=document.querySelector("#custom-preview");n&&(n.innerHTML=At(M.length,e.customSizes));const r=t.error?0:wt(M.length,e),a=r>1?"ZIP":"JSON",i=M.length===0?"添加文件后显示":t.error?"请修正自定义分组":he(Z,e.outputFormat,M.length,r>1?"zip":"json"),o=document.querySelector("#summary-output-count"),c=document.querySelector("#summary-download-type"),s=document.querySelector("#summary-filename"),l=document.querySelector("#download-button");o&&(o.textContent=t.error?"-":String(r)),c&&(c.textContent=t.error?"待修正":a),s&&(s.textContent=i,s.title=i),l&&(l.disabled=I||M.length===0||!!t.error)}function Un(){document.querySelectorAll("[data-copy]").forEach(e=>{e.addEventListener("click",async()=>{var n;const t=(n=document.querySelector(`#${e.dataset.copy}`))==null?void 0:n.textContent;t&&(await navigator.clipboard.writeText(t),e.innerHTML='<i data-lucide="check" aria-hidden="true"></i>已复制',Ee({icons:Pe}))})})}window.addEventListener("hashchange",()=>{He()!=="convert"&&(ie(),C=[]),D()});window.addEventListener("beforeunload",ie);D();
