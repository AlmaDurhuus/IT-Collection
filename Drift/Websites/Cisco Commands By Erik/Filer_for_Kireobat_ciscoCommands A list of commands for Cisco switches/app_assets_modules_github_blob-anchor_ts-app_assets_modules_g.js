"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["app_assets_modules_github_blob-anchor_ts-app_assets_modules_github_code-editor_ts-app_assets_-d384d0"],{56334:(e,t,n)=>{function r(e){let t=e.match(/#?(?:L)(\d+)((?:C)(\d+))?/g);if(t){if(1===t.length){let e=u(t[0]);if(!e)return;return Object.freeze({start:e,end:e})}if(2!==t.length)return;{let e=u(t[0]),n=u(t[1]);if(!e||!n)return;return f(Object.freeze({start:e,end:n}))}}}function o(e){let{start:t,end:n}=f(e);return null!=t.column&&null!=n.column?`L${t.line}C${t.column}-L${n.line}C${n.column}`:null!=t.column?`L${t.line}C${t.column}-L${n.line}`:null!=n.column?`L${t.line}-L${n.line}C${n.column}`:t.line===n.line?`L${t.line}`:`L${t.line}-L${n.line}`}function i(e){let t=e.match(/(file-.+?-)L\d+?/i);return t?t[1]:""}function l(e){let t=r(e),n=i(e);return{blobRange:t,anchorPrefix:n}}function s({anchorPrefix:e,blobRange:t}){return t?`#${e}${o(t)}`:"#"}function u(e){let t=e.match(/L(\d+)/),n=e.match(/C(\d+)/);return t?Object.freeze({line:parseInt(t[1]),column:n?parseInt(n[1]):null}):null}function a(e,t){let[n,r]=c(e.start,!0,t),[o,i]=c(e.end,!1,t);if(!n||!o)return;let l=r,s=i;if(-1===l&&(l=0),-1===s&&(s=o.childNodes.length),!n.ownerDocument)throw Error("DOMRange needs to be inside document");let u=n.ownerDocument.createRange();return u.setStart(n,l),u.setEnd(o,s),u}function c(e,t,n){let r=[null,0],o=n(e.line);if(!o)return r;if(null==e.column)return[o,-1];let i=e.column-1,l=d(o);for(let e=0;e<l.length;e++){let n=l[e],r=i-(n.textContent||"").length;if(0===r){let r=l[e+1];if(t&&r)return[r,0];return[n,i]}if(r<0)return[n,i];i=r}return r}function d(e){if(e.nodeType===Node.TEXT_NODE)return[e];if(!e.childNodes||!e.childNodes.length)return[];let t=[];for(let n of e.childNodes)t=t.concat(d(n));return t}function f(e){let t=[e.start,e.end];return(t.sort(h),t[0]===e.start&&t[1]===e.end)?e:Object.freeze({start:t[0],end:t[1]})}function h(e,t){return e.line===t.line&&e.column===t.column?0:e.line===t.line&&"number"==typeof e.column&&"number"==typeof t.column?e.column-t.column:e.line-t.line}n.d(t,{Dw:()=>s,G5:()=>r,M9:()=>a,n6:()=>l})},54697:(e,t,n)=>{n.d(t,{Pi:()=>l,gD:()=>s,hX:()=>a,l8:()=>u});var r=n(59753);let o=new WeakMap,i=new WeakMap;function l(e){return o.get(e)}async function s(e){return o.get(e)||c(await d(e,"codeEditor:ready"))}function u(e,t){i.set(e,t)}function a(e){return i.get(e)}function c(e){if(!(e instanceof CustomEvent))throw Error("assert: event is not a CustomEvent");let t=e.detail.editor;if(!e.target)throw Error("assert: event.target is null");return o.set(e.target,t),t}function d(e,t){return new Promise(n=>{e.addEventListener(t,n,{once:!0})})}(0,r.on)("codeEditor:ready",".js-code-editor",c)},67404:(e,t,n)=>{function r(e){return o(e)[0]}function o(e){let t=[];for(let n of i()){let[r,o]=n.trim().split("=");e===r&&void 0!==o&&t.push({key:r,value:o})}return t}function i(){try{return document.cookie.split(";")}catch{return[]}}function l(e,t,n=null,r=!1,o="lax"){let i=document.domain;if(null==i)throw Error("Unable to get document domain");i.endsWith(".github.com")&&(i="github.com");let l="https:"===location.protocol?"; secure":"",s=n?`; expires=${n}`:"";!1===r&&(i=`.${i}`);try{document.cookie=`${e}=${t}; path=/; domain=${i}${s}${l}; samesite=${o}`}catch{}}function s(e,t=!1){let n=document.domain;if(null==n)throw Error("Unable to get document domain");n.endsWith(".github.com")&&(n="github.com");let r=new Date().getTime(),o=new Date(r-1).toUTCString(),i="https:"===location.protocol?"; secure":"",l=`; expires=${o}`;!1===t&&(n=`.${n}`);try{document.cookie=`${e}=''; path=/; domain=${n}${l}${i}`}catch{}}n.d(t,{$1:()=>o,d8:()=>l,ej:()=>r,kT:()=>s})},41982:(e,t,n)=>{function*r(e,t){for(let n of e){let e=t(n);null!=e&&(yield e)}}function o(e,t,n){let o=e=>{let n=t(e);return null!=n?[e,n]:null};return[...r(e,o)].sort((e,t)=>n(e[1],t[1])).map(([e])=>e)}n.d(t,{W:()=>o})},87098:(e,t,n)=>{function r(e,t=location.hash){return o(e,i(t))}function o(e,t){return""===t?null:e.getElementById(t)||e.getElementsByName(t)[0]}function i(e){try{return decodeURIComponent(e.slice(1))}catch{return""}}n.d(t,{$z:()=>i,Kt:()=>r,Q:()=>o})},87738:(e,t,n)=>{function r(e,t,n=.1){let r=s(e,t,n);if(r&&-1===t.indexOf("/")){let o=e.substring(e.lastIndexOf("/")+1);r+=s(o,t,n)}return r}function o(e){let t=e.toLowerCase().split(""),n="";for(let e=0;e<t.length;e++){let r=t[e],o=r.replace(/[\\^$*+?.()|[\]{}]/g,"\\$&");0===e?n+=`(.*)(${o})`:n+=`([^${o}]*?)(${o})`}return RegExp(`${n}(.*?)$`,"i")}function i(e,t,n){if(t){let r=e.innerHTML.trim().match(n||o(t));if(!r)return;let i=!1,l=[];for(let e=1;e<r.length;++e){let t=r[e];t&&(e%2==0?i||(l.push("<mark>"),i=!0):i&&(l.push("</mark>"),i=!1),l.push(t))}e.innerHTML=l.join("")}else{let t=e.innerHTML.trim(),n=t.replace(/<\/?mark>/g,"");t!==n&&(e.innerHTML=n)}}n.d(t,{EW:()=>r,Qw:()=>i,qu:()=>u});let l=new Set([" ","-","_"]);function s(e,t,n=.1){let r=e;if(r===t)return 1;let o=r.length,i=0,s=0;for(let e=0;e<t.length;e++){let u=t[e],a=r.indexOf(u.toLowerCase()),c=r.indexOf(u.toUpperCase()),d=Math.min(a,c),f=d>-1?d:Math.max(a,c);if(-1===f)return 0;i+=.1,r[f]===u&&(i+=.1),0===f&&(i+=.9-n,0===e&&(s=1)),l.has(r.charAt(f-1))&&(i+=.9-n),r=r.substring(f+1,o)}let u=t.length,a=i/u,c=(a*(u/o)+a)/2;return s&&c+n<1&&(c+=n),c}function u(e,t){return e.score>t.score?-1:e.score<t.score?1:e.text<t.text?-1:e.text>t.text?1:0}},93928:(e,t,n)=>{function r(e){let t=e.split("\u200D"),n=0;for(let e of t){let t=Array.from(e.split(/[\ufe00-\ufe0f]/).join("")).length;n+=t}return n/t.length}function o(e,t,n,r=!0){let o=e.value.substring(0,e.selectionEnd||0),i=e.value.substring(e.selectionEnd||0);return s(e,(o=o.replace(t,n))+(i=i.replace(t,n)),o.length,r),n}function i(e,t,n){if(null===e.selectionStart||null===e.selectionEnd)return o(e,t,n);let r=e.value.substring(0,e.selectionStart),i=e.value.substring(e.selectionEnd);return s(e,r+n+i,r.length),n}function l(e,t,n={}){let r=e.selectionEnd||0,o=e.value.substring(0,r),i=e.value.substring(r),l=""===e.value||o.match(/\n$/)?"":"\n",s=n.appendNewline?"\n":"",u=l+t+s;e.value=o+u+i;let a=r+u.length;return e.selectionStart=a,e.selectionEnd=a,e.dispatchEvent(new CustomEvent("change",{bubbles:!0,cancelable:!1})),e.focus(),u}function s(e,t,n,r=!0){e.value=t,r&&(e.selectionStart=n,e.selectionEnd=n),e.dispatchEvent(new CustomEvent("change",{bubbles:!0,cancelable:!1}))}function u(e,t){let n=[...e],r=new TextEncoder,o=new Uint8Array(4);for(let e=0;e<n.length;e++){let i=n[e],{written:l,read:s}=r.encodeInto(i,o);if(!l||!s)return -1;let u=l-s;if(0!==u&&(e<t&&(t-=u),e>=t))break}return t}n.d(t,{Om:()=>l,lp:()=>o,rq:()=>r,t4:()=>i,yb:()=>u})},69202:(e,t,n)=>{let r;n.d(t,{G:()=>M});var o=n(21461);let AliveSession=class AliveSession extends o.a2{getUrlFromRefreshUrl(){return i(this.refreshUrl)}constructor(e,t,n,r){super(e,()=>this.getUrlFromRefreshUrl(),n,r),this.refreshUrl=t}};async function i(e){let t=await l(e);return t&&t.url&&t.token?s(t.url,t.token):null}async function l(e){let t=await fetch(e,{headers:{Accept:"application/json"}});if(t.ok)return t.json();if(404===t.status)return null;throw Error("fetch error")}async function s(e,t){let n=await fetch(e,{method:"POST",mode:"same-origin",headers:{"Scoped-CSRF-Token":t}});if(n.ok)return n.text();throw Error("fetch error")}var u=n(46263),a=n(4412),c=n(44544),d=n(22490),f=n(71643),h=n(7180);let InvalidSourceRelError=class InvalidSourceRelError extends h.d{};let p=d.Z.createPolicy("alive",{createScriptURL:e=>h.O.apply({policy:()=>{if(!(0,f.B)())return e;if(!e.startsWith("/"))throw new InvalidSourceRelError("Alive worker src URL must start with a slash");return e},fallback:e,fallbackOnError:!0})});function m(){return"SharedWorker"in window&&"true"!==(0,c.Z)("localStorage").getItem("bypassSharedWorker")}function g(){let e=document.head.querySelector("link[rel=shared-web-socket-src]")?.getAttribute("href")??"";try{return p.createScriptURL(e)}catch(e){if(e instanceof InvalidSourceRelError)return null;throw e}}function b(){return document.head.querySelector("link[rel=shared-web-socket]")?.href??null}function w(){return document.head.querySelector("link[rel=shared-web-socket]")?.getAttribute("data-refresh-url")??null}function k(){return document.head.querySelector("link[rel=shared-web-socket]")?.getAttribute("data-session-id")??null}function y(e,{channel:t,type:n,data:r}){for(let o of e)o.dispatchEvent(new CustomEvent(`socket:${n}`,{bubbles:!1,cancelable:!1,detail:{name:t,data:r}}))}let $=class AliveSessionProxy{subscribe(e){let t=this.subscriptions.add(...e);t.length&&this.worker.port.postMessage({subscribe:t});let n=new Set(t.map(e=>e.name)),r=e.reduce((e,t)=>{let r=t.topic.name;return(0,o.A)(r)&&!n.has(r)&&e.add(r),e},new Set);r.size&&this.worker.port.postMessage({requestPresence:Array.from(r)})}unsubscribeAll(...e){let t=this.subscriptions.drain(...e);t.length&&this.worker.port.postMessage({unsubscribe:t});let n=this.presenceMetadata.removeSubscribers(e);this.sendPresenceMetadataUpdate(n)}updatePresenceMetadata(e){let t=new Set;for(let n of e)this.presenceMetadata.setMetadata(n),t.add(n.channelName);this.sendPresenceMetadataUpdate(t)}sendPresenceMetadataUpdate(e){if(!e.size)return;let t=[];for(let n of e)t.push({channelName:n,metadata:this.presenceMetadata.getChannelMetadata(n)});this.worker.port.postMessage({updatePresenceMetadata:t})}online(){this.worker.port.postMessage({online:!0})}offline(){this.worker.port.postMessage({online:!1})}hangup(){this.worker.port.postMessage({hangup:!0})}receive(e){let{channel:t}=e;if("presence"===e.type){let n=this.notifyPresenceDebouncedByChannel.get(t);n||(n=(0,u.D)((e,n)=>{this.notify(e,n),this.notifyPresenceDebouncedByChannel.delete(t)},100),this.notifyPresenceDebouncedByChannel.set(t,n)),n(this.subscriptions.subscribers(t),e);return}this.notify(this.subscriptions.subscribers(t),e)}constructor(e,t,n,r,i){this.subscriptions=new o.vk,this.presenceMetadata=new o.ah,this.notifyPresenceDebouncedByChannel=new Map,this.notify=i,this.worker=new SharedWorker(e,`github-socket-worker-v2-${r}`),this.worker.port.onmessage=({data:e})=>this.receive(e),this.worker.port.postMessage({connect:{url:t,refreshUrl:n}})}};async function v(){let e=g();if(!e)return;let t=b();if(!t)return;let n=w();if(!n)return;let r=k();if(!r)return;let o=(()=>{if(m())try{return new $(e,t,n,r,y)}catch(e){}return new AliveSession(t,n,!1,y)})();return window.addEventListener("online",()=>o.online()),window.addEventListener("offline",()=>o.offline()),window.addEventListener("pagehide",()=>{"hangup"in o&&o.hangup()}),o}async function E(){return await a.x,v()}function M(){return r||(r=E())}},99550:(e,t,n)=>{n.d(t,{l:()=>i,p:()=>o});let r=!0;function o(e){r=e}function i(){return r}}}]);
//# sourceMappingURL=app_assets_modules_github_blob-anchor_ts-app_assets_modules_github_code-editor_ts-app_assets_-d384d0-9a95e26ec78f.js.map