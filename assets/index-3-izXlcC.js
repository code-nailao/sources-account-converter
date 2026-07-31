var At=Object.defineProperty;var St=(e,t,n)=>t in e?At(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ae=(e,t,n)=>St(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=(e,t,n=[])=>{const r=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(a=>{r.setAttribute(a,String(t[a]))}),n.length&&n.forEach(a=>{const i=at(...a);r.appendChild(i)}),r};var kt=([e,t,n])=>at(e,t,n);/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=e=>Array.from(e.attributes).reduce((t,n)=>(t[n.name]=n.value,t),{}),xt=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",Tt=e=>e.flatMap(xt).map(n=>n.trim()).filter(Boolean).filter((n,r,a)=>a.indexOf(n)===r).join(" "),Ct=e=>e.replace(/(\w)(\w*)(_|-|\s*)/g,(t,n,r)=>n.toUpperCase()+r.toLowerCase()),Re=(e,{nameAttr:t,icons:n,attrs:r})=>{var g;const a=e.getAttribute(t);if(a==null)return;const i=Ct(a),o=n[i];if(!o)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const c=Mt(e),[s,d,l]=o,u={...d,"data-lucide":a,...r,...c},p=Tt(["lucide",`lucide-${a}`,c,r]);p&&Object.assign(u,{class:p});const v=kt([s,u,l]);return(g=e.parentNode)==null?void 0:g.replaceChild(v,e)};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=["svg",M,[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=["svg",M,[["path",{d:"M20 6 9 17l-5-5"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ft=["svg",M,[["path",{d:"m9 18 6-6-6-6"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=["svg",M,[["path",{d:"M12 13v8"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{d:"m8 17 4-4 4 4"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=["svg",M,[["path",{d:"m18 16 4-4-4-4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"m14.5 4-5 16"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=["svg",M,[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{points:"7 10 12 15 17 10"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jt=["svg",M,[["path",{d:"M10 12v-1"}],["path",{d:"M10 18v-2"}],["path",{d:"M10 7V6"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01"}],["circle",{cx:"10",cy:"20",r:"2"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=["svg",M,[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=["svg",M,[["path",{d:"M20 7h-3a2 2 0 0 1-2-2V2"}],["path",{d:"M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"}],["path",{d:"M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=["svg",M,[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}],["path",{d:"M9 18c-4.51 2-5-2-7-2"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=["svg",M,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=["svg",M,[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=["svg",M,[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=["svg",M,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=["svg",M,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=({icons:e={},nameAttr:t="data-lucide",attrs:n={}}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const r=document.querySelectorAll(`[${t}]`);if(Array.from(r).forEach(a=>Re(a,{nameAttr:t,icons:e,attrs:n})),t==="data-lucide"){const a=document.querySelectorAll("[icon-name]");a.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(a).forEach(i=>Re(i,{nameAttr:"icon-name",icons:e,attrs:n})))}};class J extends Error{constructor(n,r,a){super(r);Ae(this,"code");Ae(this,"details");this.name="AccountConverterError",this.code=n,this.details=a}}function Je(e,t){if(!Number.isSafeInteger(e)||e<=0)throw new J("invalid_grouping",`${t} must be a positive integer`,{field:t})}function Ht(e,t){if(e.length===0)return[];if(t.mode==="merge")return[[...e]];if(t.mode==="chunkSize"){Je(t.chunkSize,"chunkSize");const c=[];for(let s=0;s<e.length;s+=t.chunkSize)c.push(e.slice(s,s+t.chunkSize));return c}Je(t.partCount,"partCount");const n=Math.min(t.partCount,e.length),r=Math.floor(e.length/n);let a=e.length%n,i=0;const o=[];for(let c=0;c<n;c+=1){const s=r+(a>0?1:0);a-=a>0?1:0,o.push(e.slice(i,i+s)),i+=s}return o}function de(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ce(e){return typeof e=="string"&&e.trim()!==""?e:void 0}function G(e,t){for(const n of e)for(const r of t){const a=ce(n[r]);if(a!==void 0)return a}}function Kt(e){return de(e.credentials)?e.credentials:void 0}function Rt(e){const t=Kt(e),n=de(e.extra)?e.extra:void 0,r=[t,e,n].filter(a=>a!==void 0);return{accessToken:G(r,["access_token","accessToken"]),refreshToken:G(r,["refresh_token","refreshToken"]),idToken:G(r,["id_token","idToken"]),accountId:G(r,["account_id","chatgpt_account_id","accountId"]),userId:G(r,["user_id","chatgpt_user_id","userId"]),email:G(r,["email"]),planType:G(r,["plan_type","planType"])}}function Jt(e){return de(e.credentials)||"platform"in e||"concurrency"in e?"sub2api":ce(e.access_token)!==void 0||ce(e.refresh_token)!==void 0||ce(e.id_token)!==void 0?"cpa":"unknown"}function Xt(e){var n;const t=e.trim();if(t==="")throw new J("empty_input","Input is empty");try{return[JSON.parse(t)]}catch{const r=[],a=e.split(/\r?\n/u);for(let i=0;i<a.length;i+=1){const o=((n=a[i])==null?void 0:n.trim())??"";if(o!=="")try{r.push(JSON.parse(o))}catch{throw new J("invalid_jsonl",`Invalid JSON on line ${i+1}`,{line:i+1})}}if(r.length===0)throw new J("empty_input","Input is empty");return r}}function xe(e,t,n){if(Array.isArray(e)){e.forEach((s,d)=>xe(s,{...t,path:`${t.path}[${d}]`},n));return}if(!de(e))throw new J("unsupported_value",`Expected an account object at ${t.path}`,{path:t.path});const r=Array.isArray(e.proxies)?e.proxies:t.proxies,a=ce(e.exported_at)??t.exportedAt,i=de(e.data)?e.data:void 0,c=[["accounts",Array.isArray(e.accounts)?e.accounts:void 0],["items",Array.isArray(e.items)?e.items:void 0],["auths",Array.isArray(e.auths)?e.auths:void 0],["data.accounts",i&&Array.isArray(i.accounts)?i.accounts:void 0]].find(s=>s[1]!==void 0);if(c!=null&&c[1]){c[1].forEach((s,d)=>{xe(s,{path:`${t.path}.${c[0]}[${d}]`,...r?{proxies:r}:{},...a?{exportedAt:a}:{}},n)});return}n.push({ordinal:n.length+1,sourceFormat:Jt(e),sourcePath:t.path,original:structuredClone(e),oauth:Rt(e),...r?{sourceProxies:structuredClone(r)}:{},...a?{sourceExportedAt:a}:{}})}function Yt(e){const t=typeof e=="string"?Xt(e):[e],n=[];if(t.forEach((r,a)=>xe(r,{path:t.length===1?"$":`$line[${a+1}]`},n)),n.length===0)throw new J("no_accounts","No accounts were found");return n}function it(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ue(e){return structuredClone(e)}function pe(e,t){return!e||e.trim()===""||/^(?:placeholder|mock|fake|your[_-]?token|xxx|null|undefined)$/iu.test(e.trim())?!1:!t||e.split(".").length===3}function ot(e){const t=[];if(pe(e.oauth.accessToken,!0)||t.push("access_token"),pe(e.oauth.refreshToken,!1)||t.push("refresh_token"),pe(e.oauth.idToken,!0)||t.push("id_token"),pe(e.oauth.accountId,!1)||t.push("account_id"),t.length>0)throw new J("missing_cpa_credentials",`Account ${e.ordinal} cannot be converted to CPA`,{account:e.ordinal,missing:t});return{...e.oauth,accessToken:e.oauth.accessToken,refreshToken:e.oauth.refreshToken,idToken:e.oauth.idToken,accountId:e.oauth.accountId}}function Zt(e){const t=ot(e),n=e.original,r=it(n.credentials)?n.credentials:void 0,a={type:typeof n.type=="string"&&n.type!=="oauth"?n.type:"codex",access_token:t.accessToken,refresh_token:t.refreshToken,id_token:t.idToken,account_id:t.accountId};t.email&&(a.email=t.email),typeof n.priority=="number"&&(a.priority=n.priority),typeof n.disabled=="boolean"&&(a.disabled=n.disabled);for(const i of["last_refresh","expired","proxy_url","weight"]){const o=n[i]??(r==null?void 0:r[i]);o!==void 0&&(a[i]=ue(o))}return a}function Gt(e,t){if(e.sourceFormat==="sub2api"&&it(e.original.credentials))return ue(e.original);const n=ot(e),r={access_token:n.accessToken,refresh_token:n.refreshToken,id_token:n.idToken,chatgpt_account_id:n.accountId};return n.userId&&(r.chatgpt_user_id=n.userId),n.email&&(r.email=n.email),n.planType&&(r.plan_type=n.planType),{name:`codex-account-${String(t).padStart(3,"0")}`,platform:"openai",type:"oauth",credentials:r,...n.planType?{plan_type:n.planType}:{},...typeof e.original.priority=="number"?{priority:e.original.priority}:{},...n.email?{extra:{email:n.email}}:{}}}function Te(e){return Array.isArray(e)?`[${e.map(Te).join(",")}]`:e&&typeof e=="object"?`{${Object.keys(e).sort().map(t=>`${JSON.stringify(t)}:${Te(e[t])}`).join(",")}}`:JSON.stringify(e)}function Wt(e){const t=new Set,n=[];for(const r of e)for(const a of r.sourceProxies??[]){const i=Te(a);t.has(i)||(t.add(i),n.push(ue(a)))}return n}function he(e,t){return String(e).padStart(Math.max(3,String(t).length),"0")}function Qt(e){const t=new Date(e);if(Number.isNaN(t.getTime()))throw new J("invalid_generated_at","generatedAt must be a valid date-time");const n=e.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})/u);if(n)return`${n[1]}${n[2]}${n[3]}-${n[4]}${n[5]}${n[6]}`;const r=t.getUTCFullYear(),a=String(t.getUTCMonth()+1).padStart(2,"0"),i=String(t.getUTCDate()).padStart(2,"0"),o=String(t.getUTCHours()).padStart(2,"0"),c=String(t.getUTCMinutes()).padStart(2,"0"),s=String(t.getUTCSeconds()).padStart(2,"0");return`${r}${a}${i}-${o}${c}${s}`}function en(e,t){if(e.length===0)throw new J("no_accounts","No accounts were provided");const n=Ht(e,t.grouping),r=t.indent??2,a=t.generatedAt??new Date().toISOString(),i=Qt(a),o=e.length;if(t.format==="cpa"){const s=[];let d=0;return n.forEach((l,u)=>{l.forEach(p=>{d+=1,s.push({filename:`accounts-${i}-cpa-${o}-account-${he(d,o)}-of-${he(o,o)}.json`,mediaType:"application/json",content:JSON.stringify(Zt(p),null,r),accountCount:1,bundleIndex:u+1,bundleCount:n.length,format:"cpa"})})}),s}let c=0;return n.map((s,d)=>{var u;let l;return t.format==="sub2api"?l={exported_at:t.exportedAt??((u=s[0])==null?void 0:u.sourceExportedAt)??a,proxies:Wt(s),accounts:s.map(p=>(c+=1,Gt(p,c)))}:l=s.length===1?ue(s[0].original):s.map(p=>ue(p.original)),{filename:n.length===1?`accounts-${i}-${t.format}-${o}.json`:`accounts-${i}-${t.format}-${o}-part-${he(d+1,n.length)}-of-${he(n.length,n.length)}.json`,mediaType:"application/json",content:JSON.stringify(l,null,r),accountCount:s.length,bundleIndex:d+1,bundleCount:n.length,format:t.format}})}var k=Uint8Array,F=Uint16Array,je=Int32Array,ze=new k([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Oe=new k([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Xe=new k([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),st=function(e,t){for(var n=new F(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var a=new je(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)a[i]=i-n[r]<<5|r;return{b:n,r:a}},ct=st(ze,2),tn=ct.b,Ce=ct.r;tn[28]=258,Ce[258]=28;var nn=st(Oe,0),Ye=nn.r,Ee=new F(32768);for(var m=0;m<32768;++m){var Z=(m&43690)>>1|(m&21845)<<1;Z=(Z&52428)>>2|(Z&13107)<<2,Z=(Z&61680)>>4|(Z&3855)<<4,Ee[m]=((Z&65280)>>8|(Z&255)<<8)>>1}var le=(function(e,t,n){for(var r=e.length,a=0,i=new F(t);a<r;++a)e[a]&&++i[e[a]-1];var o=new F(t);for(a=1;a<t;++a)o[a]=o[a-1]+i[a-1]<<1;var c;if(n){c=new F(1<<t);var s=15-t;for(a=0;a<r;++a)if(e[a])for(var d=a<<4|e[a],l=t-e[a],u=o[e[a]-1]++<<l,p=u|(1<<l)-1;u<=p;++u)c[Ee[u]>>s]=d}else for(c=new F(r),a=0;a<r;++a)e[a]&&(c[a]=Ee[o[e[a]-1]++]>>15-e[a]);return c}),W=new k(288);for(var m=0;m<144;++m)W[m]=8;for(var m=144;m<256;++m)W[m]=9;for(var m=256;m<280;++m)W[m]=7;for(var m=280;m<288;++m)W[m]=8;var ve=new k(32);for(var m=0;m<32;++m)ve[m]=5;var rn=le(W,9,0),an=le(ve,5,0),lt=function(e){return(e+7)/8|0},dt=function(e,t,n){return(n==null||n>e.length)&&(n=e.length),new k(e.subarray(t,n))},on=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ge=function(e,t,n){var r=new Error(t||on[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,ge),!n)throw r;return r},H=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},oe=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},Se=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var a=n.length,i=n.slice();if(!a)return{t:ft,l:0};if(a==1){var o=new k(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(T,C){return T.f-C.f}),n.push({s:-1,f:25001});var c=n[0],s=n[1],d=0,l=1,u=2;for(n[0]={s:-1,f:c.f+s.f,l:c,r:s};l!=a-1;)c=n[n[d].f<n[u].f?d++:u++],s=n[d!=l&&n[d].f<n[u].f?d++:u++],n[l++]={s:-1,f:c.f+s.f,l:c,r:s};for(var p=i[0].s,r=1;r<a;++r)i[r].s>p&&(p=i[r].s);var v=new F(p+1),g=_e(n[l-1],v,0);if(g>t){var r=0,y=0,x=g-t,D=1<<x;for(i.sort(function(C,w){return v[w.s]-v[C.s]||C.f-w.f});r<a;++r){var I=i[r].s;if(v[I]>t)y+=D-(1<<g-v[I]),v[I]=t;else break}for(y>>=x;y>0;){var V=i[r].s;v[V]<t?y-=1<<t-v[V]++-1:++r}for(;r>=0&&y;--r){var b=i[r].s;v[b]==t&&(--v[b],++y)}g=t}return{t:new k(v),l:g}},_e=function(e,t,n){return e.s==-1?Math.max(_e(e.l,t,n+1),_e(e.r,t,n+1)):t[e.s]=n},Ze=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new F(++t),r=0,a=e[0],i=1,o=function(s){n[r++]=s},c=1;c<=t;++c)if(e[c]==a&&c!=t)++i;else{if(!a&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(a),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(a);i=1,a=e[c]}return{c:n.subarray(0,r),n:t}},se=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},ut=function(e,t,n){var r=n.length,a=lt(t+2);e[a]=r&255,e[a+1]=r>>8,e[a+2]=e[a]^255,e[a+3]=e[a+1]^255;for(var i=0;i<r;++i)e[a+i+4]=n[i];return(a+4+r)*8},Ge=function(e,t,n,r,a,i,o,c,s,d,l){H(t,l++,n),++a[256];for(var u=Se(a,15),p=u.t,v=u.l,g=Se(i,15),y=g.t,x=g.l,D=Ze(p),I=D.c,V=D.n,b=Ze(y),T=b.c,C=b.n,w=new F(19),h=0;h<I.length;++h)++w[I[h]&31];for(var h=0;h<T.length;++h)++w[T[h]&31];for(var f=Se(w,7),E=f.t,Q=f.l,_=19;_>4&&!E[Xe[_-1]];--_);var ee=d+5<<3,j=se(a,W)+se(i,ve)+o,z=se(a,p)+se(i,y)+o+14+3*_+se(w,E)+2*w[16]+3*w[17]+7*w[18];if(s>=0&&ee<=j&&ee<=z)return ut(t,l,e.subarray(s,s+d));var B,$,O,Y;if(H(t,l,1+(z<j)),l+=2,z<j){B=le(p,v,0),$=p,O=le(y,x,0),Y=y;var ye=le(E,Q,0);H(t,l,V-257),H(t,l+5,C-1),H(t,l+10,_-4),l+=14;for(var h=0;h<_;++h)H(t,l+3*h,E[Xe[h]]);l+=3*_;for(var q=[I,T],ie=0;ie<2;++ie)for(var te=q[ie],h=0;h<te.length;++h){var U=te[h]&31;H(t,l,ye[U]),l+=E[U],U>15&&(H(t,l,te[h]>>5&127),l+=te[h]>>12)}}else B=rn,$=W,O=an,Y=ve;for(var h=0;h<c;++h){var S=r[h];if(S>255){var U=S>>18&31;oe(t,l,B[U+257]),l+=$[U+257],U>7&&(H(t,l,S>>23&31),l+=ze[U]);var ne=S&31;oe(t,l,O[ne]),l+=Y[ne],ne>3&&(oe(t,l,S>>5&8191),l+=Oe[ne])}else oe(t,l,B[S]),l+=$[S]}return oe(t,l,B[256]),l+$[256]},sn=new je([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ft=new k(0),cn=function(e,t,n,r,a,i){var o=i.z||e.length,c=new k(r+o+5*(1+Math.ceil(o/7e3))+a),s=c.subarray(r,c.length-a),d=i.l,l=(i.r||0)&7;if(t){l&&(s[0]=i.r>>3);for(var u=sn[t-1],p=u>>13,v=u&8191,g=(1<<n)-1,y=i.p||new F(32768),x=i.h||new F(g+1),D=Math.ceil(n/3),I=2*D,V=function($e){return(e[$e]^e[$e+1]<<D^e[$e+2]<<I)&g},b=new je(25e3),T=new F(288),C=new F(32),w=0,h=0,f=i.i||0,E=0,Q=i.w||0,_=0;f+2<o;++f){var ee=V(f),j=f&32767,z=x[ee];if(y[j]=z,x[ee]=j,Q<=f){var B=o-f;if((w>7e3||E>24576)&&(B>423||!d)){l=Ge(e,s,0,b,T,C,h,E,_,f-_,l),E=w=h=0,_=f;for(var $=0;$<286;++$)T[$]=0;for(var $=0;$<30;++$)C[$]=0}var O=2,Y=0,ye=v,q=j-z&32767;if(B>2&&ee==V(f-q))for(var ie=Math.min(p,B)-1,te=Math.min(32767,f),U=Math.min(258,B);q<=te&&--ye&&j!=z;){if(e[f+O]==e[f+O-q]){for(var S=0;S<U&&e[f+S]==e[f+S-q];++S);if(S>O){if(O=S,Y=q,S>ie)break;for(var ne=Math.min(q,S-2),qe=0,$=0;$<ne;++$){var we=f-q+$&32767,$t=y[we],Ue=we-$t&32767;Ue>qe&&(qe=Ue,z=we)}}}j=z,z=y[j],q+=j-z&32767}if(Y){b[E++]=268435456|Ce[O]<<18|Ye[Y];var He=Ce[O]&31,Ke=Ye[Y]&31;h+=ze[He]+Oe[Ke],++T[257+He],++C[Ke],Q=f+O,++w}else b[E++]=e[f],++T[e[f]]}}for(f=Math.max(f,Q);f<o;++f)b[E++]=e[f],++T[e[f]];l=Ge(e,s,d,b,T,C,h,E,_,f-_,l),d||(i.r=l&7|s[l/8|0]<<3,l-=7,i.h=x,i.p=y,i.i=f,i.w=Q)}else{for(var f=i.w||0;f<o+d;f+=65535){var be=f+65535;be>=o&&(s[l/8|0]=d,be=o),l=ut(s,l+1,e.subarray(f,be))}i.i=o}return dt(c,0,r+lt(l)+a)},ln=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),dn=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=ln[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}},un=function(e,t,n,r,a){if(!a&&(a={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),o=new k(i.length+e.length);o.set(i),o.set(e,i.length),e=o,a.w=i.length}return cn(e,t.level==null?6:t.level,t.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,a)},pt=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n},A=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function fn(e,t){return un(e,t||{},0,0)}var ht=function(e,t,n,r){for(var a in e){var i=e[a],o=t+a,c=r;Array.isArray(i)&&(c=pt(r,i[1]),i=i[0]),ArrayBuffer.isView(i)?n[o]=[i,c]:(n[o+="/"]=[new k(0),c],ht(i,o,n,r))}},We=typeof TextEncoder<"u"&&new TextEncoder,pn=typeof TextDecoder<"u"&&new TextDecoder,hn=0;try{pn.decode(ft,{stream:!0}),hn=1}catch{}function Fe(e,t){var n;if(We)return We.encode(e);for(var r=e.length,a=new k(e.length+(e.length>>1)),i=0,o=function(d){a[i++]=d},n=0;n<r;++n){if(i+5>a.length){var c=new k(i+8+(r-n<<1));c.set(a),a=c}var s=e.charCodeAt(n);s<128||t?o(s):s<2048?(o(192|s>>6),o(128|s&63)):s>55295&&s<57344?(s=65536+(s&1047552)|e.charCodeAt(++n)&1023,o(240|s>>18),o(128|s>>12&63),o(128|s>>6&63),o(128|s&63)):(o(224|s>>12),o(128|s>>6&63),o(128|s&63))}return dt(a,0,i)}var Ne=function(e){var t=0;if(e)for(var n in e){var r=e[n].length;r>65535&&ge(9),t+=r+4}return t},Qe=function(e,t,n,r,a,i,o,c){var s=r.length,d=n.extra,l=c&&c.length,u=Ne(d);A(e,t,o!=null?33639248:67324752),t+=4,o!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(i<0&&8),e[t++]=a&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var p=new Date(n.mtime==null?Date.now():n.mtime),v=p.getFullYear()-1980;if((v<0||v>119)&&ge(10),A(e,t,v<<25|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>1),t+=4,i!=-1&&(A(e,t,n.crc),A(e,t+4,i<0?-i-2:i),A(e,t+8,n.size)),A(e,t+12,s),A(e,t+14,u),t+=16,o!=null&&(A(e,t,l),A(e,t+6,n.attrs),A(e,t+10,o),t+=14),e.set(r,t),t+=s,u)for(var g in d){var y=d[g],x=y.length;A(e,t,+g),A(e,t+2,x),e.set(y,t+4),t+=4+x}return l&&(e.set(c,t),t+=l),t},vn=function(e,t,n,r,a){A(e,t,101010256),A(e,t+8,n),A(e,t+10,n),A(e,t+12,r),A(e,t+16,a)};function mn(e,t){t||(t={});var n={},r=[];ht(e,"",n,t);var a=0,i=0;for(var o in n){var c=n[o],s=c[0],d=c[1],l=d.level==0?0:8,u=Fe(o),p=u.length,v=d.comment,g=v&&Fe(v),y=g&&g.length,x=Ne(d.extra);p>65535&&ge(11);var D=l?fn(s,d):s,I=D.length,V=dn();V.p(s),r.push(pt(d,{size:s.length,crc:V.d(),c:D,f:u,m:g,u:p!=o.length||g&&v.length!=y,o:a,compression:l})),a+=30+p+x+I,i+=76+2*(p+x)+(y||0)+I}for(var b=new k(i+22),T=a,C=i-a,w=0;w<r.length;++w){var u=r[w];Qe(b,u.o,u,u.f,u.u,u.c.length);var h=30+u.f.length+Ne(u.extra);b.set(u.c,u.o+h),Qe(b,a,u,u.f,u.u,u.c.length,u.o,u.m),a+=16+h+(u.m?u.m.length:0)}return vn(b,a,r.length,C,T),b}const gn={outputFormat:"sub2api",bundleMode:"merged",splitMode:"accounts_per_file",splitValue:20};function fe(e){const t=e.outputFormat,n=t==="cpa"?"split":e.bundleMode;return{outputFormat:t,bundleMode:n,splitMode:e.splitMode,splitValue:Math.max(1,Math.floor(Number(e.splitValue)||1))}}function yn(e){const t=fe(e);let n={mode:"merge"};return t.bundleMode==="split"&&(n=t.splitMode==="accounts_per_file"?{mode:"chunkSize",chunkSize:t.splitValue}:{mode:"partCount",partCount:t.splitValue}),{format:t.outputFormat,grouping:n}}function wn(e,t){const n=fe(t);return e<1?0:n.outputFormat==="cpa"?e:n.bundleMode==="merged"?1:n.splitMode==="file_count"?Math.min(e,n.splitValue):Math.ceil(e/n.splitValue)}function et(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(1)} MB`}function Pe(e){const t=n=>String(n).padStart(2,"0");return[e.getFullYear(),t(e.getMonth()+1),t(e.getDate()),"-",t(e.getHours()),t(e.getMinutes()),t(e.getSeconds())].join("")}function me(e,t,n,r,a,i){const o=`accounts-${e}-${t}-${n}`;if(a===void 0||i===void 0)return`${o}.${r}`;const c=Math.max(3,String(i).length),s=String(a).padStart(c,"0"),d=String(i).padStart(c,"0");return`${o}-part-${s}-of-${d}.${r}`}const tt=5e3,bn=256*1024*1024,$n=[".json",".jsonl",".ndjson"],vt=document.querySelector("#app");if(!vt)throw new Error("Missing #app root");let N=[],X=[],De=[],K={...gn},re=Pe(new Date),L=!1,mt="等待添加文件",gt="neutral";const Ie={BookOpen:Et,Check:_t,ChevronRight:Ft,Code2:It,Download:Lt,FileArchive:jt,FileJson:zt,Files:Ot,Github:Pt,Info:Dt,LockKeyhole:Vt,RefreshCw:Bt,ShieldCheck:qt,Trash2:Ut,UploadCloud:Nt};function Ve(){const e=window.location.hash.replace(/^#\/?/,"");return e==="api"||e==="privacy"?e:"convert"}function ke(e,t,n){const r=Ve()===e;return`
    <a class="nav-link${r?" is-active":""}" href="#/${e}" ${r?'aria-current="page"':""}>
      <i data-lucide="${n}" aria-hidden="true"></i>
      <span>${t}</span>
    </a>
  `}function An(e){return`
    <header class="app-header">
      <div class="header-inner">
        <a class="brand" href="#/convert" aria-label="Sources Account Converter 首页">
          <span class="brand-mark"><i data-lucide="refresh-cw" aria-hidden="true"></i></span>
          <span>Sources Account Converter</span>
        </a>
        <div class="header-actions">
          <div class="local-status">
            <span class="status-dot" aria-hidden="true"></span>
            本地处理
          </div>
          <a class="repository-link" href="https://github.com/code-nailao/sources-account-converter" target="_blank" rel="noreferrer">
            <i data-lucide="github" aria-hidden="true"></i>
            开源仓库
          </a>
        </div>
      </div>
    </header>
    <div class="workspace">
      <aside class="sidebar" aria-label="主导航">
        <nav>
          ${ke("convert","转换工具","files")}
          ${ke("api","API / SDK","code-2")}
          ${ke("privacy","隐私说明","shield-check")}
        </nav>
        <div class="sidebar-note">
          <i data-lucide="lock-keyhole" aria-hidden="true"></i>
          <span>文件仅保留在当前页面内存</span>
        </div>
      </aside>
      <main class="main-content">${e}</main>
    </div>
  `}function Be(e,t,n){return`
    <div class="page-header">
      <div>
        <p class="eyebrow">${e}</p>
        <h1>${t}</h1>
        <p>${n}</p>
      </div>
    </div>
  `}function yt(e){return{sub2api:"Sub2API",cpa:"CPA",mixed:"混合格式",unknown:"待识别"}[e]??"待识别"}function Sn(e){return e.replace(/[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}/g,"[令牌已隐藏]").replace(/(Bearer\s+)[^\s,;]+/gi,"$1[已隐藏]").replace(/((?:access|refresh|id)[_-]?token\s*[:=]\s*)[^\s,;]+/gi,"$1[已隐藏]")}function kn(){return N.length===0?'<div class="empty-files">尚未添加文件</div>':`<div class="file-list" id="file-list" role="list"></div>
    <script type="application/json" id="file-row-count">${N.length}<\/script>`}function Mn(){const e=document.querySelector("#file-list");e&&N.forEach((t,n)=>{const r=De[n],a=document.createElement("div");a.className="file-row",a.setAttribute("role","listitem");const i=document.createElement("span");i.className="file-icon",i.innerHTML='<i data-lucide="file-json" aria-hidden="true"></i>';const o=document.createElement("div");o.className="file-details";const c=document.createElement("strong");c.textContent=t.name;const s=document.createElement("span");s.textContent=r?`${yt(r.format)} · ${r.accountCount} 个账号 · ${et(t.size)}`:`${et(t.size)} · 待解析`,o.append(c,s);const d=document.createElement("button");d.className="icon-button",d.type="button",d.title="移除文件",d.setAttribute("aria-label",`移除 ${t.name}`),d.dataset.removeIndex=String(n),d.innerHTML='<i data-lucide="trash-2" aria-hidden="true"></i>',a.append(i,o,d),e.append(a)})}function xn(){const e=fe(K),t=X.length,n=wn(t,e),r=n>1?"ZIP":"JSON",a=t===0?"添加文件后显示":me(re,e.outputFormat,t,n>1?"zip":"json"),i=e.bundleMode==="split",o=e.outputFormat==="cpa";return`
    ${Be("ACCOUNT TOOLKIT","账号文件转换","批量合并、按数量拆分，并输出可直接导入的账号文件。")}
    <section class="converter-layout" aria-label="账号转换工具">
      <div class="converter-main">
        <div class="section-heading">
          <div>
            <span class="step-index">1</span>
            <h2>添加账号文件</h2>
          </div>
          ${N.length>0?'<button class="quiet-button" id="clear-files" type="button"><i data-lucide="trash-2" aria-hidden="true"></i>清空</button>':""}
        </div>
        <label class="drop-zone${L?" is-disabled":""}" id="drop-zone" for="file-input">
          <input id="file-input" type="file" accept=".json,.jsonl,.ndjson,application/json" multiple ${L?"disabled":""} />
          <span class="drop-icon"><i data-lucide="upload-cloud" aria-hidden="true"></i></span>
          <strong>拖入 JSON 文件，或点击选择</strong>
          <span>支持单个大文件和多个单账号文件</span>
        </label>
        ${kn()}

        <div class="section-divider"></div>
        <div class="section-heading">
          <div>
            <span class="step-index">2</span>
            <h2>设置输出</h2>
          </div>
        </div>

        <div class="settings-grid">
          <fieldset class="field-group">
            <legend>输出格式</legend>
            <div class="segmented" data-field="outputFormat">
              <button type="button" data-value="sub2api" class="${e.outputFormat==="sub2api"?"is-selected":""}">Sub2API</button>
              <button type="button" data-value="cpa" class="${e.outputFormat==="cpa"?"is-selected":""}">CPA</button>
            </div>
          </fieldset>

          <fieldset class="field-group">
            <legend>打包方式</legend>
            <div class="segmented" data-field="bundleMode">
              <button type="button" data-value="merged" ${o?"disabled":""} class="${e.bundleMode==="merged"?"is-selected":""}">合并为一份</button>
              <button type="button" data-value="split" class="${e.bundleMode==="split"?"is-selected":""}">拆分文件</button>
            </div>
            ${o?'<p class="field-hint">CPA 多账号按原生多文件 ZIP 输出</p>':""}
          </fieldset>

          <fieldset class="field-group split-settings${i?"":" is-hidden"}">
            <legend>拆分规则</legend>
            <div class="segmented" data-field="splitMode">
              <button type="button" data-value="accounts_per_file" class="${e.splitMode==="accounts_per_file"?"is-selected":""}">每份数量</button>
              <button type="button" data-value="file_count" class="${e.splitMode==="file_count"?"is-selected":""}">拆成几份</button>
            </div>
          </fieldset>

          <label class="number-field split-settings${i?"":" is-hidden"}" for="split-value">
            <span>${e.splitMode==="accounts_per_file"?"每份账号数":"目标文件数"}</span>
            <input id="split-value" type="number" min="1" step="1" inputmode="numeric" value="${e.splitValue}" />
          </label>
        </div>
      </div>

      <aside class="output-panel" aria-label="输出摘要">
        <div class="output-heading">
          <span class="output-icon"><i data-lucide="file-archive" aria-hidden="true"></i></span>
          <div>
            <span>输出摘要</span>
            <strong>${yt(e.outputFormat)}</strong>
          </div>
        </div>
        <dl class="summary-list">
          <div><dt>已选文件</dt><dd>${N.length}</dd></div>
          <div><dt>账号总数</dt><dd>${t}</dd></div>
          <div><dt>输出文件</dt><dd>${n}</dd></div>
          <div><dt>下载类型</dt><dd>${r}</dd></div>
        </dl>
        <div class="filename-preview"><span>下载文件</span><code title="${a}">${a}</code></div>
        <div class="status-line is-${gt}" role="status" aria-live="polite">
          <span></span>${Sn(mt)}
        </div>
        <button class="primary-button" id="download-button" type="button" ${L||t===0?"disabled":""}>
          <i data-lucide="${L?"refresh-cw":"download"}" aria-hidden="true" class="${L?"spin":""}"></i>
          ${L?"处理中":"生成并下载"}
        </button>
        <p class="privacy-inline"><i data-lucide="shield-check" aria-hidden="true"></i>处理过程不发送网络请求</p>
      </aside>
    </section>
  `}const wt=`import {
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
});`,bt=`import { readFile, writeFile } from "node:fs/promises";
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
);`;function nt(e,t){return`
    <div class="code-block">
      <button class="copy-button" type="button" data-copy="${t}"><i data-lucide="files" aria-hidden="true"></i>复制</button>
      <pre><code id="${t}"></code></pre>
    </div>
  `}function Tn(){return`
    ${Be("INTEGRATION","API / SDK 接入","同一套 core 能力可运行在浏览器或 Node.js，不依赖远程转换服务。")}
    <div class="docs-layout">
      <nav class="docs-index" aria-label="本页目录">
        <a href="#browser-sdk">浏览器 SDK<i data-lucide="chevron-right" aria-hidden="true"></i></a>
        <a href="#node-sdk">Node.js SDK<i data-lucide="chevron-right" aria-hidden="true"></i></a>
        <a href="#contract">接口约定<i data-lucide="chevron-right" aria-hidden="true"></i></a>
      </nav>
      <article class="docs-article">
        <section id="browser-sdk">
          <div class="doc-title"><span>01</span><div><h2>浏览器 SDK</h2><p>读取 File 对象后直接在当前页面进程中转换。</p></div></div>
          ${nt(wt,"browser-sdk-code")}
        </section>
        <section id="node-sdk">
          <div class="doc-title"><span>02</span><div><h2>Node.js SDK</h2><p>适合本地脚本、CLI 和自托管内部工具。</p></div></div>
          ${nt(bt,"node-sdk-code")}
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
  `}function Cn(){return`
    ${Be("PRIVACY","隐私说明","转换器以本地优先为前提设计，账号文件不离开当前浏览器。")}
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
  `}function P(){const e=Ve(),t=e==="api"?Tn():e==="privacy"?Cn():xn();if(vt.innerHTML=An(t),Me({icons:Ie}),e==="convert")Mn(),Me({icons:Ie}),jn();else if(e==="api"){const n=document.querySelector("#browser-sdk-code"),r=document.querySelector("#node-sdk-code");n&&(n.textContent=wt),r&&(r.textContent=bt),zn()}}function R(e,t="neutral"){mt=e,gt=t}function ae(){X=[],De=[]}function En(e){if(e.length>tt)return`单次最多选择 ${tt} 个文件`;const t=e.find(r=>!$n.some(a=>r.name.toLowerCase().endsWith(a)));return t?`不支持的文件类型：${t.name}`:e.reduce((r,a)=>r+a.size,0)>bn?"文件总大小不能超过 256 MB":null}async function Le(e){if(L||e.length===0)return;const t=[...N,...e],n=En(t);if(n){R(n,"error"),P();return}L=!0,ae(),N.length===0&&(re=Pe(new Date)),N=t,R("正在解析文件"),P();try{const r=await Promise.all(N.map(async a=>{const i=Yt(await a.text()),o=new Set(i.map(s=>s.sourceFormat)),c=o.size===1?o.values().next().value??"unknown":"mixed";return{name:a.name,accounts:i,format:c}}));X=r.flatMap(a=>a.accounts).map((a,i)=>({...a,ordinal:i+1})),De=r.map(a=>({name:a.name,accountCount:a.accounts.length,format:a.format})),R(`已识别 ${X.length} 个账号`,"success")}catch(r){ae(),R(r instanceof Error?r.message:"文件解析失败","error")}finally{L=!1,P()}}function _n(){ae(),N=[],re=Pe(new Date),R("等待添加文件"),P()}function Fn(e){const t=N.filter((n,r)=>r!==e);if(ae(),N=[],t.length===0){R("等待添加文件"),P();return}Le(t)}function rt(e,t){const n=URL.createObjectURL(e),r=document.createElement("a");r.href=n,r.download=t,r.click(),window.setTimeout(()=>URL.revokeObjectURL(n),0)}function Nn(e){return e.map((t,n)=>({...t,filename:e.length===1?me(re,K.outputFormat,X.length,"json"):me(re,K.outputFormat,X.length,"json",n+1,e.length)}))}function In(e){const t={};return e.forEach(n=>{t[n.filename]=Fe(n.content)}),mn(t,{level:6})}async function Ln(){if(!(X.length===0||L)){L=!0,R("正在生成下载文件"),P();try{const e=Nn(en(X,yn(K)));if(e.length===1){const t=e[0];rt(new Blob([t.content],{type:t.mediaType}),t.filename)}else{const t=In(e);rt(new Blob([t.buffer],{type:"application/zip"}),me(re,K.outputFormat,X.length,"zip"))}R("下载文件已生成","success")}catch(e){R(e instanceof Error?e.message:"生成下载文件失败","error")}finally{L=!1,P()}}}function jn(){var n,r,a;const e=document.querySelector("#file-input");e==null||e.addEventListener("change",()=>{Le(Array.from(e.files??[])),e.value=""});const t=document.querySelector("#drop-zone");t==null||t.addEventListener("dragover",i=>{i.preventDefault(),t.classList.add("is-dragging")}),t==null||t.addEventListener("dragleave",()=>t.classList.remove("is-dragging")),t==null||t.addEventListener("drop",i=>{var o;i.preventDefault(),t.classList.remove("is-dragging"),Le(Array.from(((o=i.dataTransfer)==null?void 0:o.files)??[]))}),(n=document.querySelector("#clear-files"))==null||n.addEventListener("click",_n),(r=document.querySelector("#download-button"))==null||r.addEventListener("click",()=>void Ln()),document.querySelectorAll("[data-remove-index]").forEach(i=>{i.addEventListener("click",()=>Fn(Number(i.dataset.removeIndex)))}),document.querySelectorAll(".segmented[data-field]").forEach(i=>{i.addEventListener("click",o=>{const c=o.target.closest("button[data-value]");if(!c||c.disabled)return;const s=i.dataset.field;K=fe({...K,[s]:c.dataset.value}),P()})}),(a=document.querySelector("#split-value"))==null||a.addEventListener("change",i=>{K=fe({...K,splitValue:Number(i.target.value)}),P()})}function zn(){document.querySelectorAll("[data-copy]").forEach(e=>{e.addEventListener("click",async()=>{var n;const t=(n=document.querySelector(`#${e.dataset.copy}`))==null?void 0:n.textContent;t&&(await navigator.clipboard.writeText(t),e.innerHTML='<i data-lucide="check" aria-hidden="true"></i>已复制',Me({icons:Ie}))})})}window.addEventListener("hashchange",()=>{Ve()!=="convert"&&(ae(),N=[]),P()});window.addEventListener("beforeunload",ae);P();
