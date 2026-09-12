var Bt=Object.defineProperty;var Dt=(e,t,n)=>t in e?Bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ze=(e,t,n)=>Dt(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=(e,t,n=[])=>{const r=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(a=>{r.setAttribute(a,String(t[a]))}),n.length&&n.forEach(a=>{const i=ft(...a);r.appendChild(i)}),r};var Vt=([e,t,n])=>ft(e,t,n);/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=e=>Array.from(e.attributes).reduce((t,n)=>(t[n.name]=n.value,t),{}),Ut=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",Jt=e=>e.flatMap(Ut).map(n=>n.trim()).filter(Boolean).filter((n,r,a)=>a.indexOf(n)===r).join(" "),Rt=e=>e.replace(/(\w)(\w*)(_|-|\s*)/g,(t,n,r)=>n.toUpperCase()+r.toLowerCase()),Qe=(e,{nameAttr:t,icons:n,attrs:r})=>{var g;const a=e.getAttribute(t);if(a==null)return;const i=Rt(a),s=n[i];if(!s)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const c=Ht(e),[o,d,l]=s,u={...d,"data-lucide":a,...r,...c},p=Jt(["lucide",`lucide-${a}`,c,r]);p&&Object.assign(u,{class:p});const v=Vt([o,u,l]);return(g=e.parentNode)==null?void 0:g.replaceChild(v,e)};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=["svg",b,[["path",{d:"m16 3 4 4-4 4"}],["path",{d:"M20 7H4"}],["path",{d:"m8 21-4-4 4-4"}],["path",{d:"M4 17h16"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=["svg",b,[["path",{d:"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"}],["path",{d:"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=["svg",b,[["path",{d:"M20 6 9 17l-5-5"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=["svg",b,[["path",{d:"m9 18 6-6-6-6"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=["svg",b,[["path",{d:"M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10"}],["path",{d:"m17 10 4 4-4 4"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=["svg",b,[["path",{d:"M12 13v8"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"m8 17 4-4 4 4"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qt=["svg",b,[["path",{d:"m18 16 4-4-4-4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"m14.5 4-5 16"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const en=["svg",b,[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"7 10 12 15 17 10"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tn=["svg",b,[["path",{d:"M10 12v-1"}],["path",{d:"M10 18v-2"}],["path",{d:"M10 7V6"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01"}],["circle",{cx:"10",cy:"20",r:"2"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nn=["svg",b,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rn=["svg",b,[["path",{d:"M20 7h-3a2 2 0 0 1-2-2V2"}],["path",{d:"M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"}],["path",{d:"M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an=["svg",b,[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}],["path",{d:"M9 18c-4.51 2-5-2-7-2"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const on=["svg",b,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sn=["svg",b,[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cn=["svg",b,[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ln=["svg",b,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dn=["svg",b,[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const un=["svg",b,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fn=["svg",b,[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pn=["svg",b,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=({icons:e={},nameAttr:t="data-lucide",attrs:n={}}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const r=document.querySelectorAll(`[${t}]`);if(Array.from(r).forEach(a=>Qe(a,{nameAttr:t,icons:e,attrs:n})),t==="data-lucide"){const a=document.querySelectorAll("[icon-name]");a.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(a).forEach(i=>Qe(i,{nameAttr:"icon-name",icons:e,attrs:n})))}};class V extends Error{constructor(n,r,a){super(r);ze(this,"code");ze(this,"details");this.name="AccountConverterError",this.code=n,this.details=a}}function Ee(e,t){if(!Number.isSafeInteger(e)||e<=0)throw new V("invalid_grouping",`${t} must be a positive integer`,{field:t})}function hn(e,t){if(e.length===0)return[];if(t.mode==="merge")return[[...e]];if(t.mode==="chunkSize"){Ee(t.chunkSize,"chunkSize");const c=[];for(let o=0;o<e.length;o+=t.chunkSize)c.push(e.slice(o,o+t.chunkSize));return c}if(t.mode==="customSizes"){if(t.sizes.length===0)throw new V("invalid_grouping","sizes must contain at least one positive integer",{field:"sizes"});t.sizes.forEach((d,l)=>Ee(d,`sizes[${l}]`));const c=[];let o=0;for(const d of t.sizes){if(o>=e.length)break;const l=Math.min(o+d,e.length);c.push(e.slice(o,l)),o=l}return o<e.length&&c.push(e.slice(o)),c}Ee(t.partCount,"partCount");const n=Math.min(t.partCount,e.length),r=Math.floor(e.length/n);let a=e.length%n,i=0;const s=[];for(let c=0;c<n;c+=1){const o=r+(a>0?1:0);a-=a>0?1:0,s.push(e.slice(i,i+o)),i+=o}return s}function he(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function fe(e){return typeof e=="string"&&e.trim()!==""?e:void 0}function ee(e,t){for(const n of e)for(const r of t){const a=fe(n[r]);if(a!==void 0)return a}}function vn(e){return he(e.credentials)?e.credentials:void 0}function mn(e){const t=vn(e),n=he(e.extra)?e.extra:void 0,r=[t,e,n].filter(a=>a!==void 0);return{accessToken:ee(r,["access_token","accessToken"]),refreshToken:ee(r,["refresh_token","refreshToken"]),idToken:ee(r,["id_token","idToken"]),accountId:ee(r,["account_id","chatgpt_account_id","accountId"]),userId:ee(r,["user_id","chatgpt_user_id","userId"]),email:ee(r,["email"]),planType:ee(r,["plan_type","planType"])}}function gn(e){return he(e.credentials)||"platform"in e||"concurrency"in e?"sub2api":fe(e.access_token)!==void 0||fe(e.refresh_token)!==void 0||fe(e.id_token)!==void 0?"cpa":"unknown"}function yn(e){var n;const t=e.trim();if(t==="")throw new V("empty_input","Input is empty");try{return[JSON.parse(t)]}catch{const r=[],a=e.split(/\r?\n/u);for(let i=0;i<a.length;i+=1){const s=((n=a[i])==null?void 0:n.trim())??"";if(s!=="")try{r.push(JSON.parse(s))}catch{throw new V("invalid_jsonl",`Invalid JSON on line ${i+1}`,{line:i+1})}}if(r.length===0)throw new V("empty_input","Input is empty");return r}}function Ne(e,t,n){if(Array.isArray(e)){e.forEach((o,d)=>Ne(o,{...t,path:`${t.path}[${d}]`},n));return}if(!he(e))throw new V("unsupported_value",`Expected an account object at ${t.path}`,{path:t.path});const r=Array.isArray(e.proxies)?e.proxies:t.proxies,a=fe(e.exported_at)??t.exportedAt,i=he(e.data)?e.data:void 0,c=[["accounts",Array.isArray(e.accounts)?e.accounts:void 0],["items",Array.isArray(e.items)?e.items:void 0],["auths",Array.isArray(e.auths)?e.auths:void 0],["data.accounts",i&&Array.isArray(i.accounts)?i.accounts:void 0]].find(o=>o[1]!==void 0);if(c!=null&&c[1]){c[1].forEach((o,d)=>{Ne(o,{path:`${t.path}.${c[0]}[${d}]`,...r?{proxies:r}:{},...a?{exportedAt:a}:{}},n)});return}n.push({ordinal:n.length+1,sourceFormat:gn(e),sourcePath:t.path,original:structuredClone(e),oauth:mn(e),...r?{sourceProxies:structuredClone(r)}:{},...a?{sourceExportedAt:a}:{}})}function pt(e){const t=typeof e=="string"?yn(e):[e],n=[];if(t.forEach((r,a)=>Ne(r,{path:t.length===1?"$":`$line[${a+1}]`},n)),n.length===0)throw new V("no_accounts","No accounts were found");return n}function ht(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ve(e){return structuredClone(e)}function we(e,t){return!e||e.trim()===""||/^(?:placeholder|mock|fake|your[_-]?token|xxx|null|undefined)$/iu.test(e.trim())?!1:!t||e.split(".").length===3}function vt(e){const t=[];if(we(e.oauth.accessToken,!0)||t.push("access_token"),we(e.oauth.refreshToken,!1)||t.push("refresh_token"),we(e.oauth.idToken,!0)||t.push("id_token"),we(e.oauth.accountId,!1)||t.push("account_id"),t.length>0)throw new V("missing_cpa_credentials",`Account ${e.ordinal} cannot be converted to CPA`,{account:e.ordinal,missing:t});return{...e.oauth,accessToken:e.oauth.accessToken,refreshToken:e.oauth.refreshToken,idToken:e.oauth.idToken,accountId:e.oauth.accountId}}function wn(e){const t=vt(e),n=e.original,r=ht(n.credentials)?n.credentials:void 0,a={type:typeof n.type=="string"&&n.type!=="oauth"?n.type:"codex",access_token:t.accessToken,refresh_token:t.refreshToken,id_token:t.idToken,account_id:t.accountId};t.email&&(a.email=t.email),typeof n.priority=="number"&&(a.priority=n.priority),typeof n.disabled=="boolean"&&(a.disabled=n.disabled);for(const i of["last_refresh","expired","proxy_url","weight"]){const s=n[i]??(r==null?void 0:r[i]);s!==void 0&&(a[i]=ve(s))}return a}function bn(e,t){var i;const n=(i=e.oauth.email)==null?void 0:i.trim();if(e.sourceFormat==="sub2api"&&ht(e.original.credentials)){const s=ve(e.original);return n&&(s.name=n),s}const r=vt(e),a={access_token:r.accessToken,refresh_token:r.refreshToken,id_token:r.idToken,chatgpt_account_id:r.accountId};return r.userId&&(a.chatgpt_user_id=r.userId),r.email&&(a.email=r.email),r.planType&&(a.plan_type=r.planType),{name:n||`codex-account-${String(t).padStart(3,"0")}`,platform:"openai",type:"oauth",credentials:a,...r.planType?{plan_type:r.planType}:{},...typeof e.original.priority=="number"?{priority:e.original.priority}:{},...r.email?{extra:{email:r.email}}:{}}}function Le(e){return Array.isArray(e)?`[${e.map(Le).join(",")}]`:e&&typeof e=="object"?`{${Object.keys(e).sort().map(t=>`${JSON.stringify(t)}:${Le(e[t])}`).join(",")}}`:JSON.stringify(e)}function Sn(e){const t=new Set,n=[];for(const r of e)for(const a of r.sourceProxies??[]){const i=Le(a);t.has(i)||(t.add(i),n.push(ve(a)))}return n}function be(e,t){return String(e).padStart(Math.max(3,String(t).length),"0")}function $n(e){const t=new Date(e);if(Number.isNaN(t.getTime()))throw new V("invalid_generated_at","generatedAt must be a valid date-time");const n=e.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})/u);if(n)return`${n[1]}${n[2]}${n[3]}-${n[4]}${n[5]}${n[6]}`;const r=t.getUTCFullYear(),a=String(t.getUTCMonth()+1).padStart(2,"0"),i=String(t.getUTCDate()).padStart(2,"0"),s=String(t.getUTCHours()).padStart(2,"0"),c=String(t.getUTCMinutes()).padStart(2,"0"),o=String(t.getUTCSeconds()).padStart(2,"0");return`${r}${a}${i}-${s}${c}${o}`}function kn(e,t){if(e.length===0)throw new V("no_accounts","No accounts were provided");const n=hn(e,t.grouping),r=t.indent??2,a=t.generatedAt??new Date().toISOString(),i=$n(a),s=e.length;if(t.format==="cpa"){const o=[];let d=0;return n.forEach((l,u)=>{l.forEach(p=>{d+=1,o.push({filename:`accounts-${i}-cpa-${s}-account-${be(d,s)}-of-${be(s,s)}.json`,mediaType:"application/json",content:JSON.stringify(wn(p),null,r),accountCount:1,bundleIndex:u+1,bundleCount:n.length,format:"cpa"})})}),o}let c=0;return n.map((o,d)=>{var u;let l;return t.format==="sub2api"?l={exported_at:t.exportedAt??((u=o[0])==null?void 0:u.sourceExportedAt)??a,proxies:Sn(o),accounts:o.map(p=>(c+=1,bn(p,c)))}:l=o.length===1?ve(o[0].original):o.map(p=>ve(p.original)),{filename:n.length===1?`accounts-${i}-${t.format}-${s}.json`:`accounts-${i}-${t.format}-${s}-part-${be(d+1,n.length)}-of-${be(n.length,n.length)}.json`,mediaType:"application/json",content:JSON.stringify(l,null,r),accountCount:o.length,bundleIndex:d+1,bundleCount:n.length,format:t.format}})}var C=Uint8Array,O=Uint16Array,Be=Int32Array,De=new C([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ve=new C([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),et=new C([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),mt=function(e,t){for(var n=new O(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var a=new Be(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)a[i]=i-n[r]<<5|r;return{b:n,r:a}},gt=mt(De,2),Mn=gt.b,Fe=gt.r;Mn[28]=258,Fe[258]=28;var An=mt(Ve,0),tt=An.r,Ie=new O(32768);for(var m=0;m<32768;++m){var Q=(m&43690)>>1|(m&21845)<<1;Q=(Q&52428)>>2|(Q&13107)<<2,Q=(Q&61680)>>4|(Q&3855)<<4,Ie[m]=((Q&65280)>>8|(Q&255)<<8)>>1}var pe=(function(e,t,n){for(var r=e.length,a=0,i=new O(t);a<r;++a)e[a]&&++i[e[a]-1];var s=new O(t);for(a=1;a<t;++a)s[a]=s[a-1]+i[a-1]<<1;var c;if(n){c=new O(1<<t);var o=15-t;for(a=0;a<r;++a)if(e[a])for(var d=a<<4|e[a],l=t-e[a],u=s[e[a]-1]++<<l,p=u|(1<<l)-1;u<=p;++u)c[Ie[u]>>o]=d}else for(c=new O(r),a=0;a<r;++a)e[a]&&(c[a]=Ie[s[e[a]-1]++]>>15-e[a]);return c}),ne=new C(288);for(var m=0;m<144;++m)ne[m]=8;for(var m=144;m<256;++m)ne[m]=9;for(var m=256;m<280;++m)ne[m]=7;for(var m=280;m<288;++m)ne[m]=8;var Se=new C(32);for(var m=0;m<32;++m)Se[m]=5;var xn=pe(ne,9,0),zn=pe(Se,5,0),yt=function(e){return(e+7)/8|0},wt=function(e,t,n){return(n==null||n>e.length)&&(n=e.length),new C(e.subarray(t,n))},En=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],$e=function(e,t,n){var r=new Error(t||En[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,$e),!n)throw r;return r},G=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},le=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},Te=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var a=n.length,i=n.slice();if(!a)return{t:St,l:0};if(a==1){var s=new C(n[0].s+1);return s[n[0].s]=1,{t:s,l:1}}n.sort(function(L,F){return L.f-F.f}),n.push({s:-1,f:25001});var c=n[0],o=n[1],d=0,l=1,u=2;for(n[0]={s:-1,f:c.f+o.f,l:c,r:o};l!=a-1;)c=n[n[d].f<n[u].f?d++:u++],o=n[d!=l&&n[d].f<n[u].f?d++:u++],n[l++]={s:-1,f:c.f+o.f,l:c,r:o};for(var p=i[0].s,r=1;r<a;++r)i[r].s>p&&(p=i[r].s);var v=new O(p+1),g=je(n[l-1],v,0);if(g>t){var r=0,y=0,N=g-t,H=1<<N;for(i.sort(function(F,S){return v[S.s]-v[F.s]||F.f-S.f});r<a;++r){var P=i[r].s;if(v[P]>t)y+=H-(1<<g-v[P]),v[P]=t;else break}for(y>>=N;y>0;){var U=i[r].s;v[U]<t?y-=1<<t-v[U]++-1:++r}for(;r>=0&&y;--r){var A=i[r].s;v[A]==t&&(--v[A],++y)}g=t}return{t:new C(v),l:g}},je=function(e,t,n){return e.s==-1?Math.max(je(e.l,t,n+1),je(e.r,t,n+1)):t[e.s]=n},nt=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new O(++t),r=0,a=e[0],i=1,s=function(o){n[r++]=o},c=1;c<=t;++c)if(e[c]==a&&c!=t)++i;else{if(!a&&i>2){for(;i>138;i-=138)s(32754);i>2&&(s(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(s(a),--i;i>6;i-=6)s(8304);i>2&&(s(i-3<<5|8208),i=0)}for(;i--;)s(a);i=1,a=e[c]}return{c:n.subarray(0,r),n:t}},de=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},bt=function(e,t,n){var r=n.length,a=yt(t+2);e[a]=r&255,e[a+1]=r>>8,e[a+2]=e[a]^255,e[a+3]=e[a+1]^255;for(var i=0;i<r;++i)e[a+i+4]=n[i];return(a+4+r)*8},rt=function(e,t,n,r,a,i,s,c,o,d,l){G(t,l++,n),++a[256];for(var u=Te(a,15),p=u.t,v=u.l,g=Te(i,15),y=g.t,N=g.l,H=nt(p),P=H.c,U=H.n,A=nt(y),L=A.c,F=A.n,S=new O(19),h=0;h<P.length;++h)++S[P[h]&31];for(var h=0;h<L.length;++h)++S[L[h]&31];for(var f=Te(S,7),I=f.t,re=f.l,j=19;j>4&&!I[et[j-1]];--j);var ae=d+5<<3,q=de(a,ne)+de(i,Se)+s,B=de(a,p)+de(i,y)+s+14+3*j+de(S,I)+2*S[16]+3*S[17]+7*S[18];if(o>=0&&ae<=q&&ae<=B)return bt(t,l,e.subarray(o,o+d));var J,x,D,W;if(G(t,l,1+(B<q)),l+=2,B<q){J=pe(p,v,0),x=p,D=pe(y,N,0),W=y;var ke=pe(I,re,0);G(t,l,U-257),G(t,l+5,F-1),G(t,l+10,j-4),l+=14;for(var h=0;h<j;++h)G(t,l+3*h,I[et[h]]);l+=3*j;for(var R=[P,L],ce=0;ce<2;++ce)for(var ie=R[ce],h=0;h<ie.length;++h){var K=ie[h]&31;G(t,l,ke[K]),l+=I[K],K>15&&(G(t,l,ie[h]>>5&127),l+=ie[h]>>12)}}else J=xn,x=ne,D=zn,W=Se;for(var h=0;h<c;++h){var E=r[h];if(E>255){var K=E>>18&31;le(t,l,J[K+257]),l+=x[K+257],K>7&&(G(t,l,E>>23&31),l+=De[K]);var oe=E&31;le(t,l,D[oe]),l+=W[oe],oe>3&&(le(t,l,E>>5&8191),l+=Ve[oe])}else le(t,l,J[E]),l+=x[E]}return le(t,l,J[256]),l+x[256]},Tn=new Be([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),St=new C(0),_n=function(e,t,n,r,a,i){var s=i.z||e.length,c=new C(r+s+5*(1+Math.ceil(s/7e3))+a),o=c.subarray(r,c.length-a),d=i.l,l=(i.r||0)&7;if(t){l&&(o[0]=i.r>>3);for(var u=Tn[t-1],p=u>>13,v=u&8191,g=(1<<n)-1,y=i.p||new O(32768),N=i.h||new O(g+1),H=Math.ceil(n/3),P=2*H,U=function(xe){return(e[xe]^e[xe+1]<<H^e[xe+2]<<P)&g},A=new Be(25e3),L=new O(288),F=new O(32),S=0,h=0,f=i.i||0,I=0,re=i.w||0,j=0;f+2<s;++f){var ae=U(f),q=f&32767,B=N[ae];if(y[q]=B,N[ae]=q,re<=f){var J=s-f;if((S>7e3||I>24576)&&(J>423||!d)){l=rt(e,o,0,A,L,F,h,I,j,f-j,l),I=S=h=0,j=f;for(var x=0;x<286;++x)L[x]=0;for(var x=0;x<30;++x)F[x]=0}var D=2,W=0,ke=v,R=q-B&32767;if(J>2&&ae==U(f-R))for(var ce=Math.min(p,J)-1,ie=Math.min(32767,f),K=Math.min(258,J);R<=ie&&--ke&&q!=B;){if(e[f+D]==e[f+D-R]){for(var E=0;E<K&&e[f+E]==e[f+E-R];++E);if(E>D){if(D=E,W=R,E>ce)break;for(var oe=Math.min(R,E-2),Ge=0,x=0;x<oe;++x){var Me=f-R+x&32767,qt=y[Me],Xe=Me-qt&32767;Xe>Ge&&(Ge=Xe,B=Me)}}}q=B,B=y[q],R+=q-B&32767}if(W){A[I++]=268435456|Fe[D]<<18|tt[W];var Ye=Fe[D]&31,We=tt[W]&31;h+=De[Ye]+Ve[We],++L[257+Ye],++F[We],re=f+D,++S}else A[I++]=e[f],++L[e[f]]}}for(f=Math.max(f,re);f<s;++f)A[I++]=e[f],++L[e[f]];l=rt(e,o,d,A,L,F,h,I,j,f-j,l),d||(i.r=l&7|o[l/8|0]<<3,l-=7,i.h=N,i.p=y,i.i=f,i.w=re)}else{for(var f=i.w||0;f<s+d;f+=65535){var Ae=f+65535;Ae>=s&&(o[l/8|0]=d,Ae=s),l=bt(o,l+1,e.subarray(f,Ae))}i.i=s}return wt(c,0,r+yt(l)+a)},Cn=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),Nn=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=Cn[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}},Ln=function(e,t,n,r,a){if(!a&&(a={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),s=new C(i.length+e.length);s.set(i),s.set(e,i.length),e=s,a.w=i.length}return _n(e,t.level==null?6:t.level,t.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,a)},$t=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n},z=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function Fn(e,t){return Ln(e,t||{},0,0)}var kt=function(e,t,n,r){for(var a in e){var i=e[a],s=t+a,c=r;Array.isArray(i)&&(c=$t(r,i[1]),i=i[0]),ArrayBuffer.isView(i)?n[s]=[i,c]:(n[s+="/"]=[new C(0),c],kt(i,s,n,r))}},at=typeof TextEncoder<"u"&&new TextEncoder,In=typeof TextDecoder<"u"&&new TextDecoder,jn=0;try{In.decode(St,{stream:!0}),jn=1}catch{}function Oe(e,t){var n;if(at)return at.encode(e);for(var r=e.length,a=new C(e.length+(e.length>>1)),i=0,s=function(d){a[i++]=d},n=0;n<r;++n){if(i+5>a.length){var c=new C(i+8+(r-n<<1));c.set(a),a=c}var o=e.charCodeAt(n);o<128||t?s(o):o<2048?(s(192|o>>6),s(128|o&63)):o>55295&&o<57344?(o=65536+(o&1047552)|e.charCodeAt(++n)&1023,s(240|o>>18),s(128|o>>12&63),s(128|o>>6&63),s(128|o&63)):(s(224|o>>12),s(128|o>>6&63),s(128|o&63))}return wt(a,0,i)}var Pe=function(e){var t=0;if(e)for(var n in e){var r=e[n].length;r>65535&&$e(9),t+=r+4}return t},it=function(e,t,n,r,a,i,s,c){var o=r.length,d=n.extra,l=c&&c.length,u=Pe(d);z(e,t,s!=null?33639248:67324752),t+=4,s!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(i<0&&8),e[t++]=a&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var p=new Date(n.mtime==null?Date.now():n.mtime),v=p.getFullYear()-1980;if((v<0||v>119)&&$e(10),z(e,t,v<<25|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>1),t+=4,i!=-1&&(z(e,t,n.crc),z(e,t+4,i<0?-i-2:i),z(e,t+8,n.size)),z(e,t+12,o),z(e,t+14,u),t+=16,s!=null&&(z(e,t,l),z(e,t+6,n.attrs),z(e,t+10,s),t+=14),e.set(r,t),t+=o,u)for(var g in d){var y=d[g],N=y.length;z(e,t,+g),z(e,t+2,N),e.set(y,t+4),t+=4+N}return l&&(e.set(c,t),t+=l),t},On=function(e,t,n,r,a){z(e,t,101010256),z(e,t+8,n),z(e,t+10,n),z(e,t+12,r),z(e,t+16,a)};function Pn(e,t){t||(t={});var n={},r=[];kt(e,"",n,t);var a=0,i=0;for(var s in n){var c=n[s],o=c[0],d=c[1],l=d.level==0?0:8,u=Oe(s),p=u.length,v=d.comment,g=v&&Oe(v),y=g&&g.length,N=Pe(d.extra);p>65535&&$e(11);var H=l?Fn(o,d):o,P=H.length,U=Nn();U.p(o),r.push($t(d,{size:o.length,crc:U.d(),c:H,f:u,m:g,u:p!=s.length||g&&v.length!=y,o:a,compression:l})),a+=30+p+N+P,i+=76+2*(p+N)+(y||0)+P}for(var A=new C(i+22),L=a,F=i-a,S=0;S<r.length;++S){var u=r[S];it(A,u.o,u,u.f,u.u,u.c.length);var h=30+u.f.length+Pe(u.extra);A.set(u.c,u.o+h),it(A,a,u,u.f,u.u,u.c.length,u.o,u.m),a+=16+h+(u.m?u.m.length:0)}return On(A,a,r.length,F,L),A}const qn={outputFormat:"sub2api",bundleMode:"merged",splitMode:"accounts_per_file",splitValue:20,customSizes:"5,10,20,30,100"};function se(e){const t=e.outputFormat,n=t==="cpa"?"split":e.bundleMode;return{outputFormat:t,bundleMode:n,splitMode:t==="cpa"?"accounts_per_file":e.splitMode,splitValue:Math.max(1,Math.floor(Number(e.splitValue)||1)),customSizes:e.customSizes}}function ge(e,t){const n=t.trim().split(/[,，\/／\s]+/u).filter(Boolean);if(n.length===0)return{requestedSizes:[],outputSizes:[],remaining:Math.max(0,e),error:"请输入至少一个分组数量"};const r=[];for(const o of n){if(!/^\d+$/u.test(o))return{requestedSizes:r,outputSizes:[],remaining:Math.max(0,e),error:`“${o}”不是有效的正整数`};const d=Number(o);if(!Number.isSafeInteger(d)||d<=0)return{requestedSizes:r,outputSizes:[],remaining:Math.max(0,e),error:"分组数量必须是安全的正整数"};r.push(d)}const a=Math.max(0,Math.floor(e)),i=[];let s=a,c=0;for(const o of r){if(s===0)break;const d=Math.min(o,s);o>s&&(c=s),i.push(d),s-=d}return s>0&&(c=s,i.push(s)),{requestedSizes:r,outputSizes:i,remaining:c,error:null}}function Bn(e){const t=se(e);let n={mode:"merge"};if(t.bundleMode==="split")if(t.splitMode==="custom_sizes"){const r=ge(0,t.customSizes);if(r.error)throw new Error(r.error);n={mode:"customSizes",sizes:r.requestedSizes}}else n=t.splitMode==="accounts_per_file"?{mode:"chunkSize",chunkSize:t.splitValue}:{mode:"partCount",partCount:t.splitValue};return{format:t.outputFormat,grouping:n}}function Mt(e,t){const n=se(t);if(e<1)return 0;if(n.outputFormat==="cpa")return e;if(n.bundleMode==="merged")return 1;if(n.splitMode==="custom_sizes"){const r=ge(e,n.customSizes);return r.error?0:r.outputSizes.length}return n.splitMode==="file_count"?Math.min(e,n.splitValue):Math.ceil(e/n.splitValue)}function Dn(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(1)} MB`}function ye(e){const t=n=>String(n).padStart(2,"0");return[e.getFullYear(),t(e.getMonth()+1),t(e.getDate()),"-",t(e.getHours()),t(e.getMinutes()),t(e.getSeconds())].join("")}function me(e,t,n,r,a,i){const s=`accounts-${e}-${t}-${n}`;if(a===void 0||i===void 0)return`${s}.${r}`;const c=Math.max(3,String(i).length),o=String(a).padStart(c,"0"),d=String(i).padStart(c,"0");return`${s}-part-${o}-of-${d}.${r}`}const ot=5e3,At=256*1024*1024,Vn=[".json",".jsonl",".ndjson"],xt=document.querySelector("#app");if(!xt)throw new Error("Missing #app root");const zt=window.matchMedia("(prefers-color-scheme: dark)");let Y=zt.matches?"dark":"light",Et=!1,k=[],$=[],te="file",X="",Tt=1,_t=1,_={...qn},Z=ye(new Date),w=!1,Ct="等待添加账号",Nt="neutral";const qe={ArrowRightLeft:Kt,Braces:Zt,Check:Gt,ChevronRight:Xt,ClipboardPaste:Yt,Code2:Qt,Download:en,FileArchive:tn,FileJson:nn,Files:rn,Github:an,Info:on,LockKeyhole:sn,Moon:cn,Plus:ln,RefreshCw:dn,ShieldCheck:un,Sun:fn,Trash2:pn,UploadCloud:Wt};function He(){const e=window.location.hash.replace(/^#\/?/,"");return e==="api"||e==="privacy"?e:"convert"}function _e(e,t,n){const r=He()===e;return`
    <a class="nav-link${r?" is-active":""}" href="#/${e}" ${r?'aria-current="page"':""}>
      <i data-lucide="${n}" aria-hidden="true"></i>
      <span>${t}</span>
    </a>
  `}function Hn(e){const t=Y==="dark"?"切换到日间模式":"切换到夜间模式";return`
    <div class="workspace">
      <aside class="sidebar" aria-label="主导航">
        <div class="sidebar-top">
          <div class="brand-row">
            <a class="brand" href="#/convert" aria-label="Sub2API / CPA 转换与分号器首页">
              <span class="brand-mark"><i data-lucide="refresh-cw" aria-hidden="true"></i></span>
              <span class="brand-copy"><strong>Sub2API / CPA</strong><small>转换与分号器</small></span>
            </a>
            <button class="theme-toggle" id="theme-toggle" type="button" title="${t}" aria-label="${t}" aria-pressed="${Y==="dark"}">
              <i data-lucide="${Y==="dark"?"sun":"moon"}" aria-hidden="true"></i>
            </button>
          </div>
          <nav>
            ${_e("convert","转换工具","files")}
            ${_e("api","API / SDK","code-2")}
            ${_e("privacy","隐私说明","shield-check")}
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
            <span>账号数据仅在当前页面内存中处理</span>
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
  `}function Je(e){return{sub2api:"Sub2API",cpa:"CPA",mixed:"混合格式",unknown:"待识别"}[e]??"待识别"}function Un(e){return e.replace(/[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}/g,"[令牌已隐藏]").replace(/(Bearer\s+)[^\s,;]+/gi,"$1[已隐藏]").replace(/((?:access|refresh|id)[_-]?token\s*[:=]\s*)[^\s,;]+/gi,"$1[已隐藏]")}function ue(e){return e.replace(/[&<>"']/gu,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t]??t)}function Jn(){return k.length===0?'<div class="empty-files">尚未添加账号</div>':'<div class="file-list" id="input-list" role="list"></div>'}function Rn(){const e=document.querySelector("#input-list");e&&k.forEach(t=>{const n=document.createElement("div");n.className="file-row",n.setAttribute("role","listitem");const r=document.createElement("span");r.className="file-icon",r.innerHTML=`<i data-lucide="${t.kind==="paste"?"clipboard-paste":"file-json"}" aria-hidden="true"></i>`;const a=document.createElement("div");a.className="file-details";const i=document.createElement("strong");i.textContent=t.name;const s=document.createElement("span");s.textContent=`${Je(t.format)} · ${t.accounts.length} 个账号 · ${Dn(t.byteSize)}`,a.append(i,s);const c=document.createElement("button");c.className="icon-button",c.type="button",c.title="移除输入",c.setAttribute("aria-label",`移除 ${t.name}`),c.dataset.removeBatch=String(t.id),c.innerHTML='<i data-lucide="trash-2" aria-hidden="true"></i>',n.append(r,a,c),e.append(n)})}function Kn(){const e=new Set(k.map(t=>t.format));return e.size===0?"自动识别":[...e].map(Je).join(" + ")}function Lt(e,t){const n=ge(e,t);return n.error?`<p class="custom-error" id="custom-error">${ue(n.error)}</p>`:e===0?'<p class="custom-empty" id="custom-error">添加账号后显示实际分组</p>':`
    <div class="group-preview" id="custom-error" aria-label="分组预览">
      <span class="group-preview-label">将生成</span>
      <div class="group-size-list">
        ${n.outputSizes.map((r,a)=>`<span class="group-size${n.remaining>0&&a===n.outputSizes.length-1?" is-remainder":""}">${r}</span>`).join("")}
      </div>
      ${n.remaining>0?`<small>剩余 ${n.remaining} 个自动成组</small>`:""}
    </div>
  `}function Zn(){const e=se(_),t=$.length,n=Mt(t,e),r=e.bundleMode==="split",a=e.outputFormat==="cpa",i=!a&&r&&e.splitMode==="custom_sizes",s=i?ge(t,e.customSizes):null,c=!!(s!=null&&s.error),o=n>1?"ZIP":"JSON",d=t===0?"添加账号后显示":c?"请修正自定义分组":me(Z,e.outputFormat,t,n>1?"zip":"json");return`
    ${Ue("ACCOUNT TOOLKIT","Sub2API / CPA 转换与分号器","合并、拆分和格式转换都在当前浏览器中完成。")}
    <section class="converter-layout" aria-label="账号转换工具">
      <div class="converter-main">
        <div class="section-heading">
          <div>
            <span class="step-index">1</span>
            <h2>添加账号</h2>
          </div>
          ${k.length>0?`<div class="section-actions">
                  <button class="icon-button danger-button" id="clear-inputs" type="button" title="清空全部输入" aria-label="清空全部输入"><i data-lucide="trash-2" aria-hidden="true"></i></button>
                </div>`:""}
        </div>
        <div class="input-methods" role="tablist" aria-label="账号添加方式">
          <button id="file-mode" type="button" role="tab" aria-selected="${te==="file"}" data-input-mode="file" class="${te==="file"?"is-selected":""}">
            <i data-lucide="upload-cloud" aria-hidden="true"></i>上传文件
          </button>
          <button id="paste-mode" type="button" role="tab" aria-selected="${te==="paste"}" data-input-mode="paste" class="${te==="paste"?"is-selected":""}">
            <i data-lucide="clipboard-paste" aria-hidden="true"></i>粘贴 JSON
          </button>
        </div>
        ${te==="file"?`<label class="drop-zone${w?" is-disabled":""}" id="drop-zone" for="file-input">
                <input id="file-input" type="file" accept=".json,.jsonl,.ndjson,application/json" multiple ${w?"disabled":""} />
                <span class="drop-icon"><i data-lucide="upload-cloud" aria-hidden="true"></i></span>
                <strong>拖入 JSON 文件，或点击选择</strong>
                <span>支持单个大文件和多个单账号文件</span>
              </label>`:`<div class="paste-panel" role="tabpanel" aria-labelledby="paste-mode">
                <label for="pasted-json">JSON 内容</label>
                <textarea id="pasted-json" rows="9" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="粘贴单个账号、多账号数组或 JSONL / NDJSON" ${w?"disabled":""}></textarea>
                <div class="paste-actions">
                  <span>凭据只在当前浏览器内存中解析</span>
                  <button class="parse-button" id="parse-pasted-json" type="button" ${w||X.trim()===""?"disabled":""}>
                    <i data-lucide="${w?"refresh-cw":"plus"}" aria-hidden="true" class="${w?"spin":""}"></i>
                    ${w?"正在解析":"解析并添加"}
                  </button>
                </div>
              </div>`}
        ${Jn()}

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
              <strong>${Kn()}</strong>
              <small>${k.length>0?`${k.length} 个输入来源`:"JSON / JSONL"}</small>
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
            <input id="custom-sizes" type="text" inputmode="numeric" autocomplete="off" spellcheck="false" value="${ue(e.customSizes)}" placeholder="5,10,20,30,100" />
            <div class="quick-sizes" aria-label="快捷添加数量">
              ${[5,10,20,30,100].map(l=>`<button type="button" data-append-size="${l}"><i data-lucide="plus" aria-hidden="true"></i>${l}</button>`).join("")}
            </div>
            <div id="custom-preview">${Lt(t,e.customSizes)}</div>
          </div>
        </div>`}
      </div>

      <aside class="output-panel" aria-label="输出摘要">
        <div class="output-heading">
          <span class="output-icon"><i data-lucide="file-archive" aria-hidden="true"></i></span>
          <div>
            <span>输出摘要</span>
            <strong>${Je(e.outputFormat)}</strong>
          </div>
        </div>
        <dl class="summary-list">
          <div><dt>输入来源</dt><dd>${k.length}</dd></div>
          <div><dt>账号总数</dt><dd>${t}</dd></div>
          <div><dt>输出文件</dt><dd id="summary-output-count">${c?"-":n}</dd></div>
          <div><dt>下载类型</dt><dd id="summary-download-type">${c?"待修正":o}</dd></div>
        </dl>
        <div class="filename-preview"><span>下载文件</span><code id="summary-filename" title="${ue(d)}">${ue(d)}</code></div>
        <div class="status-line is-${Nt}" role="status" aria-live="polite">
          <span></span>${ue(Un(Ct))}
        </div>
        <button class="primary-button" id="download-button" type="button" ${w||t===0||c?"disabled":""}>
          <i data-lucide="${w?"refresh-cw":"download"}" aria-hidden="true" class="${w?"spin":""}"></i>
          ${w?"处理中":"生成并下载"}
        </button>
        <p class="privacy-inline"><i data-lucide="shield-check" aria-hidden="true"></i>处理过程不发送网络请求</p>
      </aside>
    </section>
  `}const Ft=`import {
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
});`,It=`import { readFile, writeFile } from "node:fs/promises";
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
);`;function st(e,t){return`
    <div class="code-block">
      <button class="copy-button" type="button" data-copy="${t}"><i data-lucide="files" aria-hidden="true"></i>复制</button>
      <pre><code id="${t}"></code></pre>
    </div>
  `}function Gn(){return`
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
          ${st(Ft,"browser-sdk-code")}
        </section>
        <section id="node-sdk">
          <div class="doc-title"><span>02</span><div><h2>Node.js SDK</h2><p>适合本地脚本、CLI 和自托管内部工具。</p></div></div>
          ${st(It,"node-sdk-code")}
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
  `}function Xn(){return`
    ${Ue("PRIVACY","隐私说明","转换器以本地优先为前提设计，账号文件不离开当前浏览器。")}
    <div class="privacy-grid">
      <section class="privacy-lead">
        <span class="large-icon"><i data-lucide="shield-check" aria-hidden="true"></i></span>
        <h2>本地读取，本地生成</h2>
        <p>页面只读取你主动选择的文件或粘贴的内容。解析、格式转换、拆分和 ZIP 生成均由本地 core 模块完成。</p>
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
  `}function M(){var n;const e=He(),t=e==="api"?Gn():e==="privacy"?Xn():Zn();if(xt.innerHTML=Hn(t),Ce({icons:qe}),(n=document.querySelector("#theme-toggle"))==null||n.addEventListener("click",()=>{Et=!0,Y=Y==="dark"?"light":"dark",Re(),M()}),e==="convert"){Rn();const r=document.querySelector("#pasted-json");r&&(r.value=X),Ce({icons:qe}),ar()}else if(e==="api"){const r=document.querySelector("#browser-sdk-code"),a=document.querySelector("#node-sdk-code");r&&(r.textContent=Ft),a&&(a.textContent=It),ir()}}function Re(){var e;document.documentElement.dataset.theme=Y,document.documentElement.style.colorScheme=Y,(e=document.querySelector('meta[name="theme-color"]'))==null||e.setAttribute("content",Y==="dark"?"#0b0f14":"#f5f7fa")}function T(e,t="neutral"){Ct=e,Nt=t}function jt(e,t){var n;if(!(e instanceof V))return t;if(e.code==="empty_input")return"输入内容为空";if(e.code==="no_accounts")return"没有识别到账号";if(e.code==="unsupported_value")return"JSON 中包含无法识别的值";if(e.code==="invalid_jsonl"){const r=(n=e.details)==null?void 0:n.line;return typeof r=="number"?`JSON 格式无效，请检查第 ${r} 行`:"JSON 格式无效"}return t}function Ot(e){const t=new Set(e.map(n=>n.sourceFormat));return t.size===1?t.values().next().value??"unknown":"mixed"}function Ke(){$=k.flatMap(e=>e.accounts).map((e,t)=>({...e,ordinal:t+1}))}function Pt(){return k.reduce((e,t)=>e+t.byteSize,0)}function Ze(){$=[],k=[],X="",_t=1}function Yn(e){if(k.filter(a=>a.kind==="file").length+e.length>ot)return`单次最多选择 ${ot} 个文件`;const n=e.find(a=>!Vn.some(i=>a.name.toLowerCase().endsWith(i)));return n?`不支持的文件类型：${n.name}`:Pt()+e.reduce((a,i)=>a+i.size,0)>At?"文件总大小不能超过 256 MB":null}async function ct(e){if(w||e.length===0)return;const t=Yn(e);if(t){T(t,"error"),M();return}w=!0,k.length===0&&(Z=ye(new Date)),T("正在解析文件"),M();try{const n=await Promise.all(e.map(async r=>{const a=pt(await r.text());return{id:Tt++,kind:"file",name:r.name,byteSize:r.size,accounts:a,format:Ot(a)}}));k.push(...n),Ke(),T(`已识别 ${$.length} 个账号`,"success")}catch(n){T(jt(n,"文件解析失败"),"error")}finally{w=!1,M()}}async function lt(){if(w)return;if(X.trim()===""){T("请先粘贴 JSON 内容","error"),M();return}const e=new TextEncoder().encode(X).byteLength;if(Pt()+e>At){T("输入内容总大小不能超过 256 MB","error"),M();return}w=!0,k.length===0&&(Z=ye(new Date)),T("正在解析粘贴内容"),M();try{await Promise.resolve();const t=pt(X);k.push({id:Tt++,kind:"paste",name:`粘贴内容 ${_t++}`,byteSize:e,accounts:t,format:Ot(t)}),X="",Ke(),T(`已识别 ${$.length} 个账号`,"success")}catch(t){T(jt(t,"粘贴内容解析失败"),"error")}finally{w=!1,M()}}function Wn(){Ze(),Z=ye(new Date),T("等待添加账号"),M()}function Qn(e){k=k.filter(t=>t.id!==e),Ke(),k.length===0?(Z=ye(new Date),T("等待添加账号")):T(`已识别 ${$.length} 个账号`,"success"),M()}function dt(e,t){const n=URL.createObjectURL(e),r=document.createElement("a");r.href=n,r.download=t,r.click(),window.setTimeout(()=>URL.revokeObjectURL(n),0)}function er(e,t){const n=Math.max(3,String(t).length),r=String(e).padStart(n,"0"),a=String(t).padStart(n,"0");return`accounts-${Z}-cpa-${t}-account-${r}-of-${a}.json`}function tr(e){return e.map((t,n)=>{let r;return _.outputFormat==="cpa"?r=er(n+1,$.length):e.length===1?r=me(Z,_.outputFormat,$.length,"json"):r=me(Z,_.outputFormat,$.length,"json",n+1,e.length),{...t,filename:r}})}function nr(e){const t={};return e.forEach(n=>{t[n.filename]=Oe(n.content)}),Pn(t,{level:6})}async function rr(){if(!($.length===0||w)){w=!0,T("正在生成下载文件"),M();try{const e=tr(kn($,Bn(_)));if(e.length===1){const t=e[0];dt(new Blob([t.content],{type:t.mediaType}),t.filename)}else{const t=nr(e);dt(new Blob([t.buffer],{type:"application/zip"}),me(Z,_.outputFormat,$.length,"zip"))}T("下载文件已生成","success")}catch(e){T(e instanceof Error?e.message:"生成下载文件失败","error")}finally{w=!1,M()}}}function ar(){var i,s,c;document.querySelectorAll("[data-input-mode]").forEach(o=>{o.addEventListener("click",()=>{var l;const d=o.dataset.inputMode;d!==te&&(te=d,M(),d==="paste"&&((l=document.querySelector("#pasted-json"))==null||l.focus()))})});const e=document.querySelector("#file-input");e==null||e.addEventListener("change",()=>{ct(Array.from(e.files??[])),e.value=""});const t=document.querySelector("#drop-zone");t==null||t.addEventListener("dragover",o=>{o.preventDefault(),t.classList.add("is-dragging")}),t==null||t.addEventListener("dragleave",()=>t.classList.remove("is-dragging")),t==null||t.addEventListener("drop",o=>{var d;o.preventDefault(),t.classList.remove("is-dragging"),ct(Array.from(((d=o.dataTransfer)==null?void 0:d.files)??[]))});const n=document.querySelector("#pasted-json"),r=document.querySelector("#parse-pasted-json");n==null||n.addEventListener("input",()=>{X=n.value,r&&(r.disabled=w||X.trim()==="")}),n==null||n.addEventListener("keydown",o=>{o.key!=="Enter"||!o.ctrlKey&&!o.metaKey||(o.preventDefault(),r!=null&&r.disabled||lt())}),r==null||r.addEventListener("click",()=>void lt()),(i=document.querySelector("#clear-inputs"))==null||i.addEventListener("click",Wn),(s=document.querySelector("#download-button"))==null||s.addEventListener("click",()=>void rr()),document.querySelectorAll("[data-remove-batch]").forEach(o=>{o.addEventListener("click",()=>Qn(Number(o.dataset.removeBatch)))}),document.querySelectorAll("[data-field]").forEach(o=>{o.addEventListener("click",d=>{const l=d.target.closest("button[data-value]");if(!l||l.disabled)return;const u=o.dataset.field;_=se({..._,[u]:l.dataset.value}),M()})}),(c=document.querySelector("#split-value"))==null||c.addEventListener("change",o=>{_=se({..._,splitValue:Number(o.target.value)}),M()});const a=document.querySelector("#custom-sizes");a==null||a.addEventListener("input",()=>{_={..._,customSizes:a.value},ut()}),document.querySelectorAll("[data-append-size]").forEach(o=>{o.addEventListener("click",()=>{if(!a)return;const d=o.dataset.appendSize,l=a.value.trim().replace(/[,，\/／\s]+$/u,"");a.value=l?`${l},${d}`:d??"",_={..._,customSizes:a.value},ut(),a.focus(),a.setSelectionRange(a.value.length,a.value.length)})})}function ut(){const e=se(_),t=ge($.length,e.customSizes),n=document.querySelector("#custom-preview");n&&(n.innerHTML=Lt($.length,e.customSizes));const r=t.error?0:Mt($.length,e),a=r>1?"ZIP":"JSON",i=$.length===0?"添加账号后显示":t.error?"请修正自定义分组":me(Z,e.outputFormat,$.length,r>1?"zip":"json"),s=document.querySelector("#summary-output-count"),c=document.querySelector("#summary-download-type"),o=document.querySelector("#summary-filename"),d=document.querySelector("#download-button");s&&(s.textContent=t.error?"-":String(r)),c&&(c.textContent=t.error?"待修正":a),o&&(o.textContent=i,o.title=i),d&&(d.disabled=w||$.length===0||!!t.error)}function ir(){document.querySelectorAll("[data-copy]").forEach(e=>{e.addEventListener("click",async()=>{var n;const t=(n=document.querySelector(`#${e.dataset.copy}`))==null?void 0:n.textContent;t&&(await navigator.clipboard.writeText(t),e.innerHTML='<i data-lucide="check" aria-hidden="true"></i>已复制',Ce({icons:qe}))})})}window.addEventListener("hashchange",()=>{He()!=="convert"&&(Ze(),T("等待添加账号")),M()});window.addEventListener("beforeunload",Ze);zt.addEventListener("change",e=>{Et||(Y=e.matches?"dark":"light",Re(),M())});Re();M();
