import{a as N,c as f,d as k,e as C,h as w,k as b,l as R,m as v,n as r}from"./chunk-7A6QTOZC.js";var L=N(d=>{"use strict";var h=C();d.createRoot=h.createRoot,d.hydrateRoot=h.hydrateRoot;var G});var O=f(k()),j=f(L());var P=`/_web/${window.id_site}`,s={site:null,pages:[],api:null},T={async site(o,n){let t=await m("/site?prod=1");return s.site=t.site,s.pages=t.pages,s.api=t.api,r.serverurl=t.site.config.api_url,r.apiurl=t.site.config.api_url,r.prasiApi={[t.site.config.api_url]:{apiEntry:t.api}},t.site},async comp(o,n){let t=await m(`/comp/${n}`);return o.comps.all[n]=t,t},npm(o,n,t){return n==="site"?`/_web/${s.site.id}/npm-site/site.js`:`/_web/${s.site.id}/npm-page/${t}/page.js`},async page(o,n){let t=s.pages.find(e=>e.id===n);return t&&!t.content_tree?await m(`/page/${n}`):null},async pages(o,n){return s.pages}},m=async o=>{let n=await fetch(`${P}${o}`);try{let t=await n.text();return JSON.parse(t)}catch{return null}};var E=()=>{let o={send:()=>{},bind:e=>{},notif:{register:e=>{},send:async e=>{let i=t();if(i)return await i.script.api._notif("send",{type:"send",id:typeof e.user_id=="string"?e.user_id:e.user_id.toString(),body:e.body,title:e.title,data:e.data})},onTap:e=>{},onReceive:e=>{}}},n={notif_token:"",p:null},t=()=>{let e=n.p;if(e&&e.site&&e.site.api_url){let i=r.prasiApi[e.site.api_url];if(i&&i.apiEntry&&i.apiEntry._notif&&e.script&&e.script.api)return e}};if(window.parent){window.addEventListener("message",async({data:i})=>{if(typeof i=="object"&&i.mobile){let a=i,g=async I=>{if(!e.notif.onTap){let y=null,_=0;await new Promise(()=>{y=setInterval(()=>{_++,_>20&&clearInterval(y),I()&&clearInterval(y)},500)});return}};switch(a.type){case"notification-token":n.notif_token=a.token;break;case"notification-tap":if(!e.notif.onTap){g(()=>e.notif.onTap?(e.notif.onTap(a.notif),!0):!1);return}e.notif.onTap&&e.notif.onTap(a.notif);break;case"notification-receive":e.notif.onReceive||g(()=>e.notif.onReceive?(e.notif.onReceive(a.notif),!0):!1),e.notif.onReceive&&e.notif.onReceive(a.notif);break}}});let e={send:i=>{window.parent.postMessage({mobile:!0,...i},"*")},bind(i){n.p=i},config:n,notif:{register:async i=>{let a=t();if(a)return await a.script.api._notif("register",{type:"register",id:typeof i=="string"?i:i.toString(),token:n.notif_token})},send:async i=>{let a=t();if(a)return await a.script.api._notif("send",{type:"send",id:typeof i.user_id=="string"?i.user_id:i.user_id.toString(),body:i.body,title:i.title,data:i.data})},onTap:null,onReceive:null}};return e}return{...o}};var p={site:null,pages:[],api:null,npm_pages:[]},x={async site(o,n){let t=await l("/content/site/site.json");p.site=t;let e=await l("/content/site/pages.json");p.pages=e;let i=await l("/content/site/npm_pages.json");return p.npm_pages=i,r.serverurl=t.config.api_url,r.apiurl=t.config.api_url,r.prasiApi={[t.config.api_url]:{apiEntry:t.api}},t},async comp(o,n){let t=await l(`/content/comps/${n}.json`);return o.comps.all[n]=t,t},npm(o,n,t){return n==="site"?"/content/npm/site/index.js":p.npm_pages.includes(t)?`/content/npm/pages/${t}/index.js`:""},async page(o,n){let t=p.pages.find(e=>e.id===n);return t&&!t.content_tree?await l(`/content/pages/${n}.json`):null},async pages(o,n){return p.pages}},l=async o=>{let n=await fetch(`${r.mobilepath}${o}`);try{let t=await n.text();return JSON.parse(t)}catch{return null}};var u=f(b()),c=window;c.mobile||(c.mobile=E());c.prasiContext={global:{},render(){}};var $=({url:o,Live:n})=>{let[t,e]=(0,O.useState)({});c.prasiContext.render=()=>{e({})};let i=w.Provider;return(0,u.jsx)(i,{value:c.prasiContext,children:(0,u.jsx)(n,{domain:o.host,pathname:location.pathname,loader:c.mobilepath?x:T})})};(async()=>{let o=document.getElementById("root");if(o){let n=(0,j.createRoot)(o),t=new URL(location.href);await v(!1),R();let{Live:e}=await import("./live-XXJYH2QG.js");n.render((0,u.jsx)($,{url:t,Live:e})),document.body.classList.contains("opacity-0")&&document.body.classList.remove("opacity-0")}})();
//# sourceMappingURL=site.js.map
