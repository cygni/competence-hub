function Df(t,e){const n=Object.create(null),s=t.split(",");for(let r=0;r<s.length;r++)n[s[r]]=!0;return e?r=>!!n[r.toLowerCase()]:r=>!!n[r]}const De={},xr=[],cn=()=>{},oC=()=>!1,aC=/^on[^a-z]/,zo=t=>aC.test(t),xf=t=>t.startsWith("onUpdate:"),Qe=Object.assign,Mf=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},cC=Object.prototype.hasOwnProperty,ye=(t,e)=>cC.call(t,e),Q=Array.isArray,Mr=t=>yi(t)==="[object Map]",ol=t=>yi(t)==="[object Set]",og=t=>yi(t)==="[object Date]",lC=t=>yi(t)==="[object RegExp]",re=t=>typeof t=="function",He=t=>typeof t=="string",mo=t=>typeof t=="symbol",Ae=t=>t!==null&&typeof t=="object",D_=t=>Ae(t)&&re(t.then)&&re(t.catch),x_=Object.prototype.toString,yi=t=>x_.call(t),uC=t=>yi(t).slice(8,-1),M_=t=>yi(t)==="[object Object]",Lf=t=>He(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Xi=Df(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),al=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},hC=/-(\w)/g,An=al(t=>t.replace(hC,(e,n)=>n?n.toUpperCase():"")),fC=/\B([A-Z])/g,_i=al(t=>t.replace(fC,"-$1").toLowerCase()),cl=al(t=>t.charAt(0).toUpperCase()+t.slice(1)),uu=al(t=>t?`on${cl(t)}`:""),yo=(t,e)=>!Object.is(t,e),Lr=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},uc=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},hc=t=>{const e=parseFloat(t);return isNaN(e)?t:e},L_=t=>{const e=He(t)?Number(t):NaN;return isNaN(e)?t:e};let ag;const sh=()=>ag||(ag=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ff(t){if(Q(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],r=He(s)?mC(s):Ff(s);if(r)for(const i in r)e[i]=r[i]}return e}else{if(He(t))return t;if(Ae(t))return t}}const dC=/;(?![^(]*\))/g,pC=/:([^]+)/,gC=/\/\*[^]*?\*\//g;function mC(t){const e={};return t.replace(gC,"").split(dC).forEach(n=>{if(n){const s=n.split(pC);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function Uf(t){let e="";if(He(t))e=t;else if(Q(t))for(let n=0;n<t.length;n++){const s=Uf(t[n]);s&&(e+=s+" ")}else if(Ae(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const yC="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",_C=Df(yC);function F_(t){return!!t||t===""}function vC(t,e){if(t.length!==e.length)return!1;let n=!0;for(let s=0;n&&s<t.length;s++)n=Qr(t[s],e[s]);return n}function Qr(t,e){if(t===e)return!0;let n=og(t),s=og(e);if(n||s)return n&&s?t.getTime()===e.getTime():!1;if(n=mo(t),s=mo(e),n||s)return t===e;if(n=Q(t),s=Q(e),n||s)return n&&s?vC(t,e):!1;if(n=Ae(t),s=Ae(e),n||s){if(!n||!s)return!1;const r=Object.keys(t).length,i=Object.keys(e).length;if(r!==i)return!1;for(const o in t){const a=t.hasOwnProperty(o),c=e.hasOwnProperty(o);if(a&&!c||!a&&c||!Qr(t[o],e[o]))return!1}}return String(t)===String(e)}function wC(t,e){return t.findIndex(n=>Qr(n,e))}const AV=t=>He(t)?t:t==null?"":Q(t)||Ae(t)&&(t.toString===x_||!re(t.toString))?JSON.stringify(t,U_,2):String(t),U_=(t,e)=>e&&e.__v_isRef?U_(t,e.value):Mr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,r])=>(n[`${s} =>`]=r,n),{})}:ol(e)?{[`Set(${e.size})`]:[...e.values()]}:Ae(e)&&!Q(e)&&!M_(e)?String(e):e;let Vt;class $_{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Vt,!e&&Vt&&(this.index=(Vt.scopes||(Vt.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=Vt;try{return Vt=this,e()}finally{Vt=n}}}on(){Vt=this}off(){Vt=this.parent}stop(e){if(this._active){let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.scopes)for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0,this._active=!1}}}function $f(t){return new $_(t)}function EC(t,e=Vt){e&&e.active&&e.effects.push(t)}function Vf(){return Vt}function V_(t){Vt&&Vt.cleanups.push(t)}const Bf=t=>{const e=new Set(t);return e.w=0,e.n=0,e},B_=t=>(t.w&bs)>0,H_=t=>(t.n&bs)>0,TC=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=bs},IC=t=>{const{deps:e}=t;if(e.length){let n=0;for(let s=0;s<e.length;s++){const r=e[s];B_(r)&&!H_(r)?r.delete(t):e[n++]=r,r.w&=~bs,r.n&=~bs}e.length=n}},fc=new WeakMap;let ji=0,bs=1;const rh=30;let nn;const zs=Symbol(""),ih=Symbol("");class Hf{constructor(e,n=null,s){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,EC(this,s)}run(){if(!this.active)return this.fn();let e=nn,n=vs;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=nn,nn=this,vs=!0,bs=1<<++ji,ji<=rh?TC(this):cg(this),this.fn()}finally{ji<=rh&&IC(this),bs=1<<--ji,nn=this.parent,vs=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){nn===this?this.deferStop=!0:this.active&&(cg(this),this.onStop&&this.onStop(),this.active=!1)}}function cg(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let vs=!0;const j_=[];function vi(){j_.push(vs),vs=!1}function wi(){const t=j_.pop();vs=t===void 0?!0:t}function Ut(t,e,n){if(vs&&nn){let s=fc.get(t);s||fc.set(t,s=new Map);let r=s.get(n);r||s.set(n,r=Bf()),W_(r)}}function W_(t,e){let n=!1;ji<=rh?H_(t)||(t.n|=bs,n=!B_(t)):n=!t.has(nn),n&&(t.add(nn),nn.deps.push(t))}function Qn(t,e,n,s,r,i){const o=fc.get(t);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(n==="length"&&Q(t)){const c=Number(s);o.forEach((l,u)=>{(u==="length"||u>=c)&&a.push(l)})}else switch(n!==void 0&&a.push(o.get(n)),e){case"add":Q(t)?Lf(n)&&a.push(o.get("length")):(a.push(o.get(zs)),Mr(t)&&a.push(o.get(ih)));break;case"delete":Q(t)||(a.push(o.get(zs)),Mr(t)&&a.push(o.get(ih)));break;case"set":Mr(t)&&a.push(o.get(zs));break}if(a.length===1)a[0]&&oh(a[0]);else{const c=[];for(const l of a)l&&c.push(...l);oh(Bf(c))}}function oh(t,e){const n=Q(t)?t:[...t];for(const s of n)s.computed&&lg(s);for(const s of n)s.computed||lg(s)}function lg(t,e){(t!==nn||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}function CC(t,e){var n;return(n=fc.get(t))==null?void 0:n.get(e)}const bC=Df("__proto__,__v_isRef,__isVue"),K_=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(mo)),SC=jf(),RC=jf(!1,!0),kC=jf(!0),ug=AC();function AC(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const s=de(this);for(let i=0,o=this.length;i<o;i++)Ut(s,"get",i+"");const r=s[e](...n);return r===-1||r===!1?s[e](...n.map(de)):r}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){vi();const s=de(this)[e].apply(this,n);return wi(),s}}),t}function NC(t){const e=de(this);return Ut(e,"has",t),e.hasOwnProperty(t)}function jf(t=!1,e=!1){return function(s,r,i){if(r==="__v_isReactive")return!t;if(r==="__v_isReadonly")return t;if(r==="__v_isShallow")return e;if(r==="__v_raw"&&i===(t?e?qC:Y_:e?Q_:G_).get(s))return s;const o=Q(s);if(!t){if(o&&ye(ug,r))return Reflect.get(ug,r,i);if(r==="hasOwnProperty")return NC}const a=Reflect.get(s,r,i);return(mo(r)?K_.has(r):bC(r))||(t||Ut(s,"get",r),e)?a:Le(a)?o&&Lf(r)?a:a.value:Ae(a)?t?X_(a):Kt(a):a}}const OC=q_(),PC=q_(!0);function q_(t=!1){return function(n,s,r,i){let o=n[s];if(er(o)&&Le(o)&&!Le(r))return!1;if(!t&&(!dc(r)&&!er(r)&&(o=de(o),r=de(r)),!Q(n)&&Le(o)&&!Le(r)))return o.value=r,!0;const a=Q(n)&&Lf(s)?Number(s)<n.length:ye(n,s),c=Reflect.set(n,s,r,i);return n===de(i)&&(a?yo(r,o)&&Qn(n,"set",s,r):Qn(n,"add",s,r)),c}}function DC(t,e){const n=ye(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&n&&Qn(t,"delete",e,void 0),s}function xC(t,e){const n=Reflect.has(t,e);return(!mo(e)||!K_.has(e))&&Ut(t,"has",e),n}function MC(t){return Ut(t,"iterate",Q(t)?"length":zs),Reflect.ownKeys(t)}const z_={get:SC,set:OC,deleteProperty:DC,has:xC,ownKeys:MC},LC={get:kC,set(t,e){return!0},deleteProperty(t,e){return!0}},FC=Qe({},z_,{get:RC,set:PC}),Wf=t=>t,ll=t=>Reflect.getPrototypeOf(t);function Sa(t,e,n=!1,s=!1){t=t.__v_raw;const r=de(t),i=de(e);n||(e!==i&&Ut(r,"get",e),Ut(r,"get",i));const{has:o}=ll(r),a=s?Wf:n?zf:_o;if(o.call(r,e))return a(t.get(e));if(o.call(r,i))return a(t.get(i));t!==r&&t.get(e)}function Ra(t,e=!1){const n=this.__v_raw,s=de(n),r=de(t);return e||(t!==r&&Ut(s,"has",t),Ut(s,"has",r)),t===r?n.has(t):n.has(t)||n.has(r)}function ka(t,e=!1){return t=t.__v_raw,!e&&Ut(de(t),"iterate",zs),Reflect.get(t,"size",t)}function hg(t){t=de(t);const e=de(this);return ll(e).has.call(e,t)||(e.add(t),Qn(e,"add",t,t)),this}function fg(t,e){e=de(e);const n=de(this),{has:s,get:r}=ll(n);let i=s.call(n,t);i||(t=de(t),i=s.call(n,t));const o=r.call(n,t);return n.set(t,e),i?yo(e,o)&&Qn(n,"set",t,e):Qn(n,"add",t,e),this}function dg(t){const e=de(this),{has:n,get:s}=ll(e);let r=n.call(e,t);r||(t=de(t),r=n.call(e,t)),s&&s.call(e,t);const i=e.delete(t);return r&&Qn(e,"delete",t,void 0),i}function pg(){const t=de(this),e=t.size!==0,n=t.clear();return e&&Qn(t,"clear",void 0,void 0),n}function Aa(t,e){return function(s,r){const i=this,o=i.__v_raw,a=de(o),c=e?Wf:t?zf:_o;return!t&&Ut(a,"iterate",zs),o.forEach((l,u)=>s.call(r,c(l),c(u),i))}}function Na(t,e,n){return function(...s){const r=this.__v_raw,i=de(r),o=Mr(i),a=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,l=r[t](...s),u=n?Wf:e?zf:_o;return!e&&Ut(i,"iterate",c?ih:zs),{next(){const{value:h,done:f}=l.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function is(t){return function(...e){return t==="delete"?!1:this}}function UC(){const t={get(i){return Sa(this,i)},get size(){return ka(this)},has:Ra,add:hg,set:fg,delete:dg,clear:pg,forEach:Aa(!1,!1)},e={get(i){return Sa(this,i,!1,!0)},get size(){return ka(this)},has:Ra,add:hg,set:fg,delete:dg,clear:pg,forEach:Aa(!1,!0)},n={get(i){return Sa(this,i,!0)},get size(){return ka(this,!0)},has(i){return Ra.call(this,i,!0)},add:is("add"),set:is("set"),delete:is("delete"),clear:is("clear"),forEach:Aa(!0,!1)},s={get(i){return Sa(this,i,!0,!0)},get size(){return ka(this,!0)},has(i){return Ra.call(this,i,!0)},add:is("add"),set:is("set"),delete:is("delete"),clear:is("clear"),forEach:Aa(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=Na(i,!1,!1),n[i]=Na(i,!0,!1),e[i]=Na(i,!1,!0),s[i]=Na(i,!0,!0)}),[t,n,e,s]}const[$C,VC,BC,HC]=UC();function Kf(t,e){const n=e?t?HC:BC:t?VC:$C;return(s,r,i)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?s:Reflect.get(ye(n,r)&&r in s?n:s,r,i)}const jC={get:Kf(!1,!1)},WC={get:Kf(!1,!0)},KC={get:Kf(!0,!1)},G_=new WeakMap,Q_=new WeakMap,Y_=new WeakMap,qC=new WeakMap;function zC(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function GC(t){return t.__v_skip||!Object.isExtensible(t)?0:zC(uC(t))}function Kt(t){return er(t)?t:qf(t,!1,z_,jC,G_)}function J_(t){return qf(t,!1,FC,WC,Q_)}function X_(t){return qf(t,!0,LC,KC,Y_)}function qf(t,e,n,s,r){if(!Ae(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=r.get(t);if(i)return i;const o=GC(t);if(o===0)return t;const a=new Proxy(t,o===2?s:n);return r.set(t,a),a}function qn(t){return er(t)?qn(t.__v_raw):!!(t&&t.__v_isReactive)}function er(t){return!!(t&&t.__v_isReadonly)}function dc(t){return!!(t&&t.__v_isShallow)}function Z_(t){return qn(t)||er(t)}function de(t){const e=t&&t.__v_raw;return e?de(e):t}function ul(t){return uc(t,"__v_skip",!0),t}const _o=t=>Ae(t)?Kt(t):t,zf=t=>Ae(t)?X_(t):t;function ev(t){vs&&nn&&(t=de(t),W_(t.dep||(t.dep=Bf())))}function tv(t,e){t=de(t);const n=t.dep;n&&oh(n)}function Le(t){return!!(t&&t.__v_isRef===!0)}function kt(t){return nv(t,!1)}function Yr(t){return nv(t,!0)}function nv(t,e){return Le(t)?t:new QC(t,e)}class QC{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:de(e),this._value=n?e:_o(e)}get value(){return ev(this),this._value}set value(e){const n=this.__v_isShallow||dc(e)||er(e);e=n?e:de(e),yo(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:_o(e),tv(this))}}function Re(t){return Le(t)?t.value:t}const YC={get:(t,e,n)=>Re(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const r=t[e];return Le(r)&&!Le(n)?(r.value=n,!0):Reflect.set(t,e,n,s)}};function sv(t){return qn(t)?t:new Proxy(t,YC)}function JC(t){const e=Q(t)?new Array(t.length):{};for(const n in t)e[n]=rv(t,n);return e}class XC{constructor(e,n,s){this._object=e,this._key=n,this._defaultValue=s,this.__v_isRef=!0}get value(){const e=this._object[this._key];return e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return CC(de(this._object),this._key)}}class ZC{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function Gf(t,e,n){return Le(t)?t:re(t)?new ZC(t):Ae(t)&&arguments.length>1?rv(t,e,n):kt(t)}function rv(t,e,n){const s=t[e];return Le(s)?s:new XC(t,e,n)}class eb{constructor(e,n,s,r){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new Hf(e,()=>{this._dirty||(this._dirty=!0,tv(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!r,this.__v_isReadonly=s}get value(){const e=de(this);return ev(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}function tb(t,e,n=!1){let s,r;const i=re(t);return i?(s=t,r=cn):(s=t.get,r=t.set),new eb(s,r,i||!r,n)}function ws(t,e,n,s){let r;try{r=s?t(...s):t()}catch(i){Ei(i,e,n)}return r}function Zt(t,e,n,s){if(re(t)){const i=ws(t,e,n,s);return i&&D_(i)&&i.catch(o=>{Ei(o,e,n)}),i}const r=[];for(let i=0;i<t.length;i++)r.push(Zt(t[i],e,n,s));return r}function Ei(t,e,n,s=!0){const r=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,a=n;for(;i;){const l=i.ec;if(l){for(let u=0;u<l.length;u++)if(l[u](t,o,a)===!1)return}i=i.parent}const c=e.appContext.config.errorHandler;if(c){ws(c,null,10,[t,o,a]);return}}nb(t,n,r,s)}function nb(t,e,n,s=!0){console.error(t)}let vo=!1,ah=!1;const mt=[];let vn=0;const Fr=[];let $n=null,Vs=0;const iv=Promise.resolve();let Qf=null;function ur(t){const e=Qf||iv;return t?e.then(this?t.bind(this):t):e}function sb(t){let e=vn+1,n=mt.length;for(;e<n;){const s=e+n>>>1;wo(mt[s])<t?e=s+1:n=s}return e}function hl(t){(!mt.length||!mt.includes(t,vo&&t.allowRecurse?vn+1:vn))&&(t.id==null?mt.push(t):mt.splice(sb(t.id),0,t),ov())}function ov(){!vo&&!ah&&(ah=!0,Qf=iv.then(cv))}function rb(t){const e=mt.indexOf(t);e>vn&&mt.splice(e,1)}function av(t){Q(t)?Fr.push(...t):(!$n||!$n.includes(t,t.allowRecurse?Vs+1:Vs))&&Fr.push(t),ov()}function gg(t,e=vo?vn+1:0){for(;e<mt.length;e++){const n=mt[e];n&&n.pre&&(mt.splice(e,1),e--,n())}}function pc(t){if(Fr.length){const e=[...new Set(Fr)];if(Fr.length=0,$n){$n.push(...e);return}for($n=e,$n.sort((n,s)=>wo(n)-wo(s)),Vs=0;Vs<$n.length;Vs++)$n[Vs]();$n=null,Vs=0}}const wo=t=>t.id==null?1/0:t.id,ib=(t,e)=>{const n=wo(t)-wo(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function cv(t){ah=!1,vo=!0,mt.sort(ib);const e=cn;try{for(vn=0;vn<mt.length;vn++){const n=mt[vn];n&&n.active!==!1&&ws(n,null,14)}}finally{vn=0,mt.length=0,pc(),vo=!1,Qf=null,(mt.length||Fr.length)&&cv()}}function ob(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||De;let r=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in s){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:h,trim:f}=s[u]||De;f&&(r=n.map(d=>He(d)?d.trim():d)),h&&(r=n.map(hc))}let a,c=s[a=uu(e)]||s[a=uu(An(e))];!c&&i&&(c=s[a=uu(_i(e))]),c&&Zt(c,t,6,r);const l=s[a+"Once"];if(l){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,Zt(l,t,6,r)}}function lv(t,e,n=!1){const s=e.emitsCache,r=s.get(t);if(r!==void 0)return r;const i=t.emits;let o={},a=!1;if(!re(t)){const c=l=>{const u=lv(l,e,!0);u&&(a=!0,Qe(o,u))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!a?(Ae(t)&&s.set(t,null),null):(Q(i)?i.forEach(c=>o[c]=null):Qe(o,i),Ae(t)&&s.set(t,o),o)}function fl(t,e){return!t||!zo(e)?!1:(e=e.slice(2).replace(/Once$/,""),ye(t,e[0].toLowerCase()+e.slice(1))||ye(t,_i(e))||ye(t,e))}let tt=null,uv=null;function gc(t){const e=tt;return tt=t,uv=t&&t.type.__scopeId||null,e}function Yf(t,e=tt,n){if(!e||t._n)return t;const s=(...r)=>{s._d&&kg(-1);const i=gc(e);let o;try{o=t(...r)}finally{gc(i),s._d&&kg(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function hu(t){const{type:e,vnode:n,proxy:s,withProxy:r,props:i,propsOptions:[o],slots:a,attrs:c,emit:l,render:u,renderCache:h,data:f,setupState:d,ctx:p,inheritAttrs:y}=t;let E,v;const g=gc(t);try{if(n.shapeFlag&4){const w=r||s;E=Qt(u.call(w,w,h,i,d,f,p)),v=c}else{const w=e;E=Qt(w.length>1?w(i,{attrs:c,slots:a,emit:l}):w(i,null)),v=e.props?c:cb(c)}}catch(w){eo.length=0,Ei(w,t,1),E=Be(Nt)}let T=E;if(v&&y!==!1){const w=Object.keys(v),{shapeFlag:b}=T;w.length&&b&7&&(o&&w.some(xf)&&(v=lb(v,o)),T=Yn(T,v))}return n.dirs&&(T=Yn(T),T.dirs=T.dirs?T.dirs.concat(n.dirs):n.dirs),n.transition&&(T.transition=n.transition),E=T,gc(g),E}function ab(t){let e;for(let n=0;n<t.length;n++){const s=t[n];if(Zr(s)){if(s.type!==Nt||s.children==="v-if"){if(e)return;e=s}}else return}return e}const cb=t=>{let e;for(const n in t)(n==="class"||n==="style"||zo(n))&&((e||(e={}))[n]=t[n]);return e},lb=(t,e)=>{const n={};for(const s in t)(!xf(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function ub(t,e,n){const{props:s,children:r,component:i}=t,{props:o,children:a,patchFlag:c}=e,l=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return s?mg(s,o,l):!!o;if(c&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(o[f]!==s[f]&&!fl(l,f))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:s===o?!1:s?o?mg(s,o,l):!0:!!o;return!1}function mg(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(e[i]!==t[i]&&!fl(n,i))return!0}return!1}function Jf({vnode:t,parent:e},n){for(;e&&e.subTree===t;)(t=e.vnode).el=n,e=e.parent}const hv=t=>t.__isSuspense,hb={name:"Suspense",__isSuspense:!0,process(t,e,n,s,r,i,o,a,c,l){t==null?fb(e,n,s,r,i,o,a,c,l):db(t,e,n,s,r,o,a,c,l)},hydrate:pb,create:Xf,normalize:gb},fv=hb;function Eo(t,e){const n=t.props&&t.props[e];re(n)&&n()}function fb(t,e,n,s,r,i,o,a,c){const{p:l,o:{createElement:u}}=c,h=u("div"),f=t.suspense=Xf(t,r,s,e,h,n,i,o,a,c);l(null,f.pendingBranch=t.ssContent,h,null,s,f,i,o),f.deps>0?(Eo(t,"onPending"),Eo(t,"onFallback"),l(null,t.ssFallback,e,n,s,null,i,o),Ur(f,t.ssFallback)):f.resolve(!1,!0)}function db(t,e,n,s,r,i,o,a,{p:c,um:l,o:{createElement:u}}){const h=e.suspense=t.suspense;h.vnode=e,e.el=t.el;const f=e.ssContent,d=e.ssFallback,{activeBranch:p,pendingBranch:y,isInFallback:E,isHydrating:v}=h;if(y)h.pendingBranch=f,sn(f,y)?(c(y,f,h.hiddenContainer,null,r,h,i,o,a),h.deps<=0?h.resolve():E&&(c(p,d,n,s,r,null,i,o,a),Ur(h,d))):(h.pendingId++,v?(h.isHydrating=!1,h.activeBranch=y):l(y,r,h),h.deps=0,h.effects.length=0,h.hiddenContainer=u("div"),E?(c(null,f,h.hiddenContainer,null,r,h,i,o,a),h.deps<=0?h.resolve():(c(p,d,n,s,r,null,i,o,a),Ur(h,d))):p&&sn(f,p)?(c(p,f,n,s,r,h,i,o,a),h.resolve(!0)):(c(null,f,h.hiddenContainer,null,r,h,i,o,a),h.deps<=0&&h.resolve()));else if(p&&sn(f,p))c(p,f,n,s,r,h,i,o,a),Ur(h,f);else if(Eo(e,"onPending"),h.pendingBranch=f,h.pendingId++,c(null,f,h.hiddenContainer,null,r,h,i,o,a),h.deps<=0)h.resolve();else{const{timeout:g,pendingId:T}=h;g>0?setTimeout(()=>{h.pendingId===T&&h.fallback(d)},g):g===0&&h.fallback(d)}}function Xf(t,e,n,s,r,i,o,a,c,l,u=!1){const{p:h,m:f,um:d,n:p,o:{parentNode:y,remove:E}}=l;let v;const g=mb(t);g&&e!=null&&e.pendingBranch&&(v=e.pendingId,e.deps++);const T=t.props?L_(t.props.timeout):void 0,w={vnode:t,parent:e,parentComponent:n,isSVG:o,container:s,hiddenContainer:r,anchor:i,deps:0,pendingId:0,timeout:typeof T=="number"?T:-1,activeBranch:null,pendingBranch:null,isInFallback:!0,isHydrating:u,isUnmounted:!1,effects:[],resolve(b=!1,D=!1){const{vnode:O,activeBranch:C,pendingBranch:A,pendingId:H,effects:Y,parentComponent:B,container:te}=w;if(w.isHydrating)w.isHydrating=!1;else if(!b){const ne=C&&A.transition&&A.transition.mode==="out-in";ne&&(C.transition.afterLeave=()=>{H===w.pendingId&&f(A,te,ve,0)});let{anchor:ve}=w;C&&(ve=p(C),d(C,B,w,!0)),ne||f(A,te,ve,0)}Ur(w,A),w.pendingBranch=null,w.isInFallback=!1;let K=w.parent,Ne=!1;for(;K;){if(K.pendingBranch){K.effects.push(...Y),Ne=!0;break}K=K.parent}Ne||av(Y),w.effects=[],g&&e&&e.pendingBranch&&v===e.pendingId&&(e.deps--,e.deps===0&&!D&&e.resolve()),Eo(O,"onResolve")},fallback(b){if(!w.pendingBranch)return;const{vnode:D,activeBranch:O,parentComponent:C,container:A,isSVG:H}=w;Eo(D,"onFallback");const Y=p(O),B=()=>{w.isInFallback&&(h(null,b,A,Y,C,null,H,a,c),Ur(w,b))},te=b.transition&&b.transition.mode==="out-in";te&&(O.transition.afterLeave=B),w.isInFallback=!0,d(O,C,null,!0),te||B()},move(b,D,O){w.activeBranch&&f(w.activeBranch,b,D,O),w.container=b},next(){return w.activeBranch&&p(w.activeBranch)},registerDep(b,D){const O=!!w.pendingBranch;O&&w.deps++;const C=b.vnode.el;b.asyncDep.catch(A=>{Ei(A,b,0)}).then(A=>{if(b.isUnmounted||w.isUnmounted||w.pendingId!==b.suspenseId)return;b.asyncResolved=!0;const{vnode:H}=b;dh(b,A,!1),C&&(H.el=C);const Y=!C&&b.subTree.el;D(b,H,y(C||b.subTree.el),C?null:p(b.subTree),w,o,c),Y&&E(Y),Jf(b,H.el),O&&--w.deps===0&&w.resolve()})},unmount(b,D){w.isUnmounted=!0,w.activeBranch&&d(w.activeBranch,n,b,D),w.pendingBranch&&d(w.pendingBranch,n,b,D)}};return w}function pb(t,e,n,s,r,i,o,a,c){const l=e.suspense=Xf(e,s,n,t.parentNode,document.createElement("div"),null,r,i,o,a,!0),u=c(t,l.pendingBranch=e.ssContent,n,l,i,o);return l.deps===0&&l.resolve(!1,!0),u}function gb(t){const{shapeFlag:e,children:n}=t,s=e&32;t.ssContent=yg(s?n.default:n),t.ssFallback=s?yg(n.fallback):Be(Nt)}function yg(t){let e;if(re(t)){const n=Xr&&t._c;n&&(t._d=!1,Vn()),t=t(),n&&(t._d=!0,e=Jt,xv())}return Q(t)&&(t=ab(t)),t=Qt(t),e&&!t.dynamicChildren&&(t.dynamicChildren=e.filter(n=>n!==t)),t}function dv(t,e){e&&e.pendingBranch?Q(t)?e.effects.push(...t):e.effects.push(t):av(t)}function Ur(t,e){t.activeBranch=e;const{vnode:n,parentComponent:s}=t,r=n.el=e.el;s&&s.subTree===n&&(s.vnode.el=r,Jf(s,r))}function mb(t){var e;return((e=t.props)==null?void 0:e.suspensible)!=null&&t.props.suspensible!==!1}function NV(t,e){return Zf(t,null,e)}const Oa={};function Gs(t,e,n){return Zf(t,e,n)}function Zf(t,e,{immediate:n,deep:s,flush:r,onTrack:i,onTrigger:o}=De){var a;const c=Vf()===((a=ze)==null?void 0:a.scope)?ze:null;let l,u=!1,h=!1;if(Le(t)?(l=()=>t.value,u=dc(t)):qn(t)?(l=()=>t,s=!0):Q(t)?(h=!0,u=t.some(w=>qn(w)||dc(w)),l=()=>t.map(w=>{if(Le(w))return w.value;if(qn(w))return Hs(w);if(re(w))return ws(w,c,2)})):re(t)?e?l=()=>ws(t,c,2):l=()=>{if(!(c&&c.isUnmounted))return f&&f(),Zt(t,c,3,[d])}:l=cn,e&&s){const w=l;l=()=>Hs(w())}let f,d=w=>{f=g.onStop=()=>{ws(w,c,4)}},p;if(ti)if(d=cn,e?n&&Zt(e,c,3,[l(),h?[]:void 0,d]):l(),r==="sync"){const w=cS();p=w.__watcherHandles||(w.__watcherHandles=[])}else return cn;let y=h?new Array(t.length).fill(Oa):Oa;const E=()=>{if(g.active)if(e){const w=g.run();(s||u||(h?w.some((b,D)=>yo(b,y[D])):yo(w,y)))&&(f&&f(),Zt(e,c,3,[w,y===Oa?void 0:h&&y[0]===Oa?[]:y,d]),y=w)}else g.run()};E.allowRecurse=!!e;let v;r==="sync"?v=E:r==="post"?v=()=>it(E,c&&c.suspense):(E.pre=!0,c&&(E.id=c.uid),v=()=>hl(E));const g=new Hf(l,v);e?n?E():y=g.run():r==="post"?it(g.run.bind(g),c&&c.suspense):g.run();const T=()=>{g.stop(),c&&c.scope&&Mf(c.scope.effects,g)};return p&&p.push(T),T}function yb(t,e,n){const s=this.proxy,r=He(t)?t.includes(".")?pv(s,t):()=>s[t]:t.bind(s,s);let i;re(e)?i=e:(i=e.handler,n=e);const o=ze;ei(this);const a=Zf(r,i.bind(s),n);return o?ei(o):Ys(),a}function pv(t,e){const n=e.split(".");return()=>{let s=t;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}function Hs(t,e){if(!Ae(t)||t.__v_skip||(e=e||new Set,e.has(t)))return t;if(e.add(t),Le(t))Hs(t.value,e);else if(Q(t))for(let n=0;n<t.length;n++)Hs(t[n],e);else if(ol(t)||Mr(t))t.forEach(n=>{Hs(n,e)});else if(M_(t))for(const n in t)Hs(t[n],e);return t}function OV(t,e){const n=tt;if(n===null)return t;const s=gl(n)||n.proxy,r=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[o,a,c,l=De]=e[i];o&&(re(o)&&(o={mounted:o,updated:o}),o.deep&&Hs(a),r.push({dir:o,instance:s,value:a,oldValue:void 0,arg:c,modifiers:l}))}return t}function _n(t,e,n,s){const r=t.dirs,i=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];i&&(a.oldValue=i[o].value);let c=a.dir[s];c&&(vi(),Zt(c,n,8,[t.el,a,t,e]),wi())}}function _b(){const t={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return ed(()=>{t.isMounted=!0}),td(()=>{t.isUnmounting=!0}),t}const Gt=[Function,Array],gv={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Gt,onEnter:Gt,onAfterEnter:Gt,onEnterCancelled:Gt,onBeforeLeave:Gt,onLeave:Gt,onAfterLeave:Gt,onLeaveCancelled:Gt,onBeforeAppear:Gt,onAppear:Gt,onAfterAppear:Gt,onAppearCancelled:Gt},vb={name:"BaseTransition",props:gv,setup(t,{slots:e}){const n=Qo(),s=_b();let r;return()=>{const i=e.default&&yv(e.default(),!0);if(!i||!i.length)return;let o=i[0];if(i.length>1){for(const y of i)if(y.type!==Nt){o=y;break}}const a=de(t),{mode:c}=a;if(s.isLeaving)return fu(o);const l=_g(o);if(!l)return fu(o);const u=ch(l,a,s,n);mc(l,u);const h=n.subTree,f=h&&_g(h);let d=!1;const{getTransitionKey:p}=l.type;if(p){const y=p();r===void 0?r=y:y!==r&&(r=y,d=!0)}if(f&&f.type!==Nt&&(!sn(l,f)||d)){const y=ch(f,a,s,n);if(mc(f,y),c==="out-in")return s.isLeaving=!0,y.afterLeave=()=>{s.isLeaving=!1,n.update.active!==!1&&n.update()},fu(o);c==="in-out"&&l.type!==Nt&&(y.delayLeave=(E,v,g)=>{const T=mv(s,f);T[String(f.key)]=f,E._leaveCb=()=>{v(),E._leaveCb=void 0,delete u.delayedLeave},u.delayedLeave=g})}return o}}},wb=vb;function mv(t,e){const{leavingVNodes:n}=t;let s=n.get(e.type);return s||(s=Object.create(null),n.set(e.type,s)),s}function ch(t,e,n,s){const{appear:r,mode:i,persisted:o=!1,onBeforeEnter:a,onEnter:c,onAfterEnter:l,onEnterCancelled:u,onBeforeLeave:h,onLeave:f,onAfterLeave:d,onLeaveCancelled:p,onBeforeAppear:y,onAppear:E,onAfterAppear:v,onAppearCancelled:g}=e,T=String(t.key),w=mv(n,t),b=(C,A)=>{C&&Zt(C,s,9,A)},D=(C,A)=>{const H=A[1];b(C,A),Q(C)?C.every(Y=>Y.length<=1)&&H():C.length<=1&&H()},O={mode:i,persisted:o,beforeEnter(C){let A=a;if(!n.isMounted)if(r)A=y||a;else return;C._leaveCb&&C._leaveCb(!0);const H=w[T];H&&sn(t,H)&&H.el._leaveCb&&H.el._leaveCb(),b(A,[C])},enter(C){let A=c,H=l,Y=u;if(!n.isMounted)if(r)A=E||c,H=v||l,Y=g||u;else return;let B=!1;const te=C._enterCb=K=>{B||(B=!0,K?b(Y,[C]):b(H,[C]),O.delayedLeave&&O.delayedLeave(),C._enterCb=void 0)};A?D(A,[C,te]):te()},leave(C,A){const H=String(t.key);if(C._enterCb&&C._enterCb(!0),n.isUnmounting)return A();b(h,[C]);let Y=!1;const B=C._leaveCb=te=>{Y||(Y=!0,A(),te?b(p,[C]):b(d,[C]),C._leaveCb=void 0,w[H]===t&&delete w[H])};w[H]=t,f?D(f,[C,B]):B()},clone(C){return ch(C,e,n,s)}};return O}function fu(t){if(Go(t))return t=Yn(t),t.children=null,t}function _g(t){return Go(t)?t.children?t.children[0]:void 0:t}function mc(t,e){t.shapeFlag&6&&t.component?mc(t.component.subTree,e):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function yv(t,e=!1,n){let s=[],r=0;for(let i=0;i<t.length;i++){let o=t[i];const a=n==null?o.key:String(n)+String(o.key!=null?o.key:i);o.type===Mt?(o.patchFlag&128&&r++,s=s.concat(yv(o.children,e,a))):(e||o.type!==Nt)&&s.push(a!=null?Yn(o,{key:a}):o)}if(r>1)for(let i=0;i<s.length;i++)s[i].patchFlag=-2;return s}function hr(t,e){return re(t)?(()=>Qe({name:t.name},e,{setup:t}))():t}const Qs=t=>!!t.type.__asyncLoader;function Eb(t){re(t)&&(t={loader:t});const{loader:e,loadingComponent:n,errorComponent:s,delay:r=200,timeout:i,suspensible:o=!0,onError:a}=t;let c=null,l,u=0;const h=()=>(u++,c=null,f()),f=()=>{let d;return c||(d=c=e().catch(p=>{if(p=p instanceof Error?p:new Error(String(p)),a)return new Promise((y,E)=>{a(p,()=>y(h()),()=>E(p),u+1)});throw p}).then(p=>d!==c&&c?c:(p&&(p.__esModule||p[Symbol.toStringTag]==="Module")&&(p=p.default),l=p,p)))};return hr({name:"AsyncComponentWrapper",__asyncLoader:f,get __asyncResolved(){return l},setup(){const d=ze;if(l)return()=>du(l,d);const p=g=>{c=null,Ei(g,d,13,!s)};if(o&&d.suspense||ti)return f().then(g=>()=>du(g,d)).catch(g=>(p(g),()=>s?Be(s,{error:g}):null));const y=kt(!1),E=kt(),v=kt(!!r);return r&&setTimeout(()=>{v.value=!1},r),i!=null&&setTimeout(()=>{if(!y.value&&!E.value){const g=new Error(`Async component timed out after ${i}ms.`);p(g),E.value=g}},i),f().then(()=>{y.value=!0,d.parent&&Go(d.parent.vnode)&&hl(d.parent.update)}).catch(g=>{p(g),E.value=g}),()=>{if(y.value&&l)return du(l,d);if(E.value&&s)return Be(s,{error:E.value});if(n&&!v.value)return Be(n)}}})}function du(t,e){const{ref:n,props:s,children:r,ce:i}=e.vnode,o=Be(t,s,r);return o.ref=n,o.ce=i,delete e.vnode.ce,o}const Go=t=>t.type.__isKeepAlive,Tb={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(t,{slots:e}){const n=Qo(),s=n.ctx;if(!s.renderer)return()=>{const g=e.default&&e.default();return g&&g.length===1?g[0]:g};const r=new Map,i=new Set;let o=null;const a=n.suspense,{renderer:{p:c,m:l,um:u,o:{createElement:h}}}=s,f=h("div");s.activate=(g,T,w,b,D)=>{const O=g.component;l(g,T,w,0,a),c(O.vnode,g,T,w,O,a,b,g.slotScopeIds,D),it(()=>{O.isDeactivated=!1,O.a&&Lr(O.a);const C=g.props&&g.props.onVnodeMounted;C&&xt(C,O.parent,g)},a)},s.deactivate=g=>{const T=g.component;l(g,f,null,1,a),it(()=>{T.da&&Lr(T.da);const w=g.props&&g.props.onVnodeUnmounted;w&&xt(w,T.parent,g),T.isDeactivated=!0},a)};function d(g){pu(g),u(g,n,a,!0)}function p(g){r.forEach((T,w)=>{const b=ph(T.type);b&&(!g||!g(b))&&y(w)})}function y(g){const T=r.get(g);!o||!sn(T,o)?d(T):o&&pu(o),r.delete(g),i.delete(g)}Gs(()=>[t.include,t.exclude],([g,T])=>{g&&p(w=>Wi(g,w)),T&&p(w=>!Wi(T,w))},{flush:"post",deep:!0});let E=null;const v=()=>{E!=null&&r.set(E,gu(n.subTree))};return ed(v),vv(v),td(()=>{r.forEach(g=>{const{subTree:T,suspense:w}=n,b=gu(T);if(g.type===b.type&&g.key===b.key){pu(b);const D=b.component.da;D&&it(D,w);return}d(g)})}),()=>{if(E=null,!e.default)return null;const g=e.default(),T=g[0];if(g.length>1)return o=null,g;if(!Zr(T)||!(T.shapeFlag&4)&&!(T.shapeFlag&128))return o=null,T;let w=gu(T);const b=w.type,D=ph(Qs(w)?w.type.__asyncResolved||{}:b),{include:O,exclude:C,max:A}=t;if(O&&(!D||!Wi(O,D))||C&&D&&Wi(C,D))return o=w,T;const H=w.key==null?b:w.key,Y=r.get(H);return w.el&&(w=Yn(w),T.shapeFlag&128&&(T.ssContent=w)),E=H,Y?(w.el=Y.el,w.component=Y.component,w.transition&&mc(w,w.transition),w.shapeFlag|=512,i.delete(H),i.add(H)):(i.add(H),A&&i.size>parseInt(A,10)&&y(i.values().next().value)),w.shapeFlag|=256,o=w,hv(T.type)?T:w}}},Ib=Tb;function Wi(t,e){return Q(t)?t.some(n=>Wi(n,e)):He(t)?t.split(",").includes(e):lC(t)?t.test(e):!1}function Cb(t,e){_v(t,"a",e)}function bb(t,e){_v(t,"da",e)}function _v(t,e,n=ze){const s=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(dl(e,s,n),n){let r=n.parent;for(;r&&r.parent;)Go(r.parent.vnode)&&Sb(s,e,n,r),r=r.parent}}function Sb(t,e,n,s){const r=dl(e,t,s,!0);wv(()=>{Mf(s[e],r)},n)}function pu(t){t.shapeFlag&=-257,t.shapeFlag&=-513}function gu(t){return t.shapeFlag&128?t.ssContent:t}function dl(t,e,n=ze,s=!1){if(n){const r=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;vi(),ei(n);const a=Zt(e,n,t,o);return Ys(),wi(),a});return s?r.unshift(i):r.push(i),i}}const ns=t=>(e,n=ze)=>(!ti||t==="sp")&&dl(t,(...s)=>e(...s),n),Rb=ns("bm"),ed=ns("m"),kb=ns("bu"),vv=ns("u"),td=ns("bum"),wv=ns("um"),Ab=ns("sp"),Nb=ns("rtg"),Ob=ns("rtc");function Ev(t,e=ze){dl("ec",t,e)}const nd="components";function PV(t,e){return Iv(nd,t,!0,e)||t}const Tv=Symbol.for("v-ndc");function Pb(t){return He(t)?Iv(nd,t,!1)||t:t||Tv}function Iv(t,e,n=!0,s=!1){const r=tt||ze;if(r){const i=r.type;if(t===nd){const a=ph(i,!1);if(a&&(a===e||a===An(e)||a===cl(An(e))))return i}const o=vg(r[t]||i[t],e)||vg(r.appContext[t],e);return!o&&s?i:o}}function vg(t,e){return t&&(t[e]||t[An(e)]||t[cl(An(e))])}function DV(t,e,n,s){let r;const i=n&&n[s];if(Q(t)||He(t)){r=new Array(t.length);for(let o=0,a=t.length;o<a;o++)r[o]=e(t[o],o,void 0,i&&i[o])}else if(typeof t=="number"){r=new Array(t);for(let o=0;o<t;o++)r[o]=e(o+1,o,void 0,i&&i[o])}else if(Ae(t))if(t[Symbol.iterator])r=Array.from(t,(o,a)=>e(o,a,void 0,i&&i[a]));else{const o=Object.keys(t);r=new Array(o.length);for(let a=0,c=o.length;a<c;a++){const l=o[a];r[a]=e(t[l],l,a,i&&i[a])}}else r=[];return n&&(n[s]=r),r}function xV(t,e,n={},s,r){if(tt.isCE||tt.parent&&Qs(tt.parent)&&tt.parent.isCE)return e!=="default"&&(n.name=e),Be("slot",n,s&&s());let i=t[e];i&&i._c&&(i._d=!1),Vn();const o=i&&Cv(i(n)),a=ds(Mt,{key:n.key||o&&o.key||`_${e}`},o||(s?s():[]),o&&t._===1?64:-2);return!r&&a.scopeId&&(a.slotScopeIds=[a.scopeId+"-s"]),i&&i._c&&(i._d=!0),a}function Cv(t){return t.some(e=>Zr(e)?!(e.type===Nt||e.type===Mt&&!Cv(e.children)):!0)?t:null}const lh=t=>t?Uv(t)?gl(t)||t.proxy:lh(t.parent):null,Zi=Qe(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>lh(t.parent),$root:t=>lh(t.root),$emit:t=>t.emit,$options:t=>sd(t),$forceUpdate:t=>t.f||(t.f=()=>hl(t.update)),$nextTick:t=>t.n||(t.n=ur.bind(t.proxy)),$watch:t=>yb.bind(t)}),mu=(t,e)=>t!==De&&!t.__isScriptSetup&&ye(t,e),Db={get({_:t},e){const{ctx:n,setupState:s,data:r,props:i,accessCache:o,type:a,appContext:c}=t;let l;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return s[e];case 2:return r[e];case 4:return n[e];case 3:return i[e]}else{if(mu(s,e))return o[e]=1,s[e];if(r!==De&&ye(r,e))return o[e]=2,r[e];if((l=t.propsOptions[0])&&ye(l,e))return o[e]=3,i[e];if(n!==De&&ye(n,e))return o[e]=4,n[e];uh&&(o[e]=0)}}const u=Zi[e];let h,f;if(u)return e==="$attrs"&&Ut(t,"get",e),u(t);if((h=a.__cssModules)&&(h=h[e]))return h;if(n!==De&&ye(n,e))return o[e]=4,n[e];if(f=c.config.globalProperties,ye(f,e))return f[e]},set({_:t},e,n){const{data:s,setupState:r,ctx:i}=t;return mu(r,e)?(r[e]=n,!0):s!==De&&ye(s,e)?(s[e]=n,!0):ye(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:r,propsOptions:i}},o){let a;return!!n[o]||t!==De&&ye(t,o)||mu(e,o)||(a=i[0])&&ye(a,o)||ye(s,o)||ye(Zi,o)||ye(r.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:ye(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function wg(t){return Q(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let uh=!0;function xb(t){const e=sd(t),n=t.proxy,s=t.ctx;uh=!1,e.beforeCreate&&Eg(e.beforeCreate,t,"bc");const{data:r,computed:i,methods:o,watch:a,provide:c,inject:l,created:u,beforeMount:h,mounted:f,beforeUpdate:d,updated:p,activated:y,deactivated:E,beforeDestroy:v,beforeUnmount:g,destroyed:T,unmounted:w,render:b,renderTracked:D,renderTriggered:O,errorCaptured:C,serverPrefetch:A,expose:H,inheritAttrs:Y,components:B,directives:te,filters:K}=e;if(l&&Mb(l,s,null),o)for(const ve in o){const Ee=o[ve];re(Ee)&&(s[ve]=Ee.bind(n))}if(r){const ve=r.call(n,n);Ae(ve)&&(t.data=Kt(ve))}if(uh=!0,i)for(const ve in i){const Ee=i[ve],Fn=re(Ee)?Ee.bind(n,n):re(Ee.get)?Ee.get.bind(n,n):cn,rs=!re(Ee)&&re(Ee.set)?Ee.set.bind(n):cn,gn=yt({get:Fn,set:rs});Object.defineProperty(s,ve,{enumerable:!0,configurable:!0,get:()=>gn.value,set:Pt=>gn.value=Pt})}if(a)for(const ve in a)bv(a[ve],s,n,ve);if(c){const ve=re(c)?c.call(n):c;Reflect.ownKeys(ve).forEach(Ee=>{$r(Ee,ve[Ee])})}u&&Eg(u,t,"c");function ne(ve,Ee){Q(Ee)?Ee.forEach(Fn=>ve(Fn.bind(n))):Ee&&ve(Ee.bind(n))}if(ne(Rb,h),ne(ed,f),ne(kb,d),ne(vv,p),ne(Cb,y),ne(bb,E),ne(Ev,C),ne(Ob,D),ne(Nb,O),ne(td,g),ne(wv,w),ne(Ab,A),Q(H))if(H.length){const ve=t.exposed||(t.exposed={});H.forEach(Ee=>{Object.defineProperty(ve,Ee,{get:()=>n[Ee],set:Fn=>n[Ee]=Fn})})}else t.exposed||(t.exposed={});b&&t.render===cn&&(t.render=b),Y!=null&&(t.inheritAttrs=Y),B&&(t.components=B),te&&(t.directives=te)}function Mb(t,e,n=cn){Q(t)&&(t=hh(t));for(const s in t){const r=t[s];let i;Ae(r)?"default"in r?i=At(r.from||s,r.default,!0):i=At(r.from||s):i=At(r),Le(i)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[s]=i}}function Eg(t,e,n){Zt(Q(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function bv(t,e,n,s){const r=s.includes(".")?pv(n,s):()=>n[s];if(He(t)){const i=e[t];re(i)&&Gs(r,i)}else if(re(t))Gs(r,t.bind(n));else if(Ae(t))if(Q(t))t.forEach(i=>bv(i,e,n,s));else{const i=re(t.handler)?t.handler.bind(n):e[t.handler];re(i)&&Gs(r,i,t)}}function sd(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let c;return a?c=a:!r.length&&!n&&!s?c=e:(c={},r.length&&r.forEach(l=>yc(c,l,o,!0)),yc(c,e,o)),Ae(e)&&i.set(e,c),c}function yc(t,e,n,s=!1){const{mixins:r,extends:i}=e;i&&yc(t,i,n,!0),r&&r.forEach(o=>yc(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const a=Lb[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const Lb={data:Tg,props:Ig,emits:Ig,methods:Ki,computed:Ki,beforeCreate:St,created:St,beforeMount:St,mounted:St,beforeUpdate:St,updated:St,beforeDestroy:St,beforeUnmount:St,destroyed:St,unmounted:St,activated:St,deactivated:St,errorCaptured:St,serverPrefetch:St,components:Ki,directives:Ki,watch:Ub,provide:Tg,inject:Fb};function Tg(t,e){return e?t?function(){return Qe(re(t)?t.call(this,this):t,re(e)?e.call(this,this):e)}:e:t}function Fb(t,e){return Ki(hh(t),hh(e))}function hh(t){if(Q(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function St(t,e){return t?[...new Set([].concat(t,e))]:e}function Ki(t,e){return t?Qe(Object.create(null),t,e):e}function Ig(t,e){return t?Q(t)&&Q(e)?[...new Set([...t,...e])]:Qe(Object.create(null),wg(t),wg(e??{})):e}function Ub(t,e){if(!t)return e;if(!e)return t;const n=Qe(Object.create(null),t);for(const s in e)n[s]=St(t[s],e[s]);return n}function Sv(){return{app:null,config:{isNativeTag:oC,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let $b=0;function Vb(t,e){return function(s,r=null){re(s)||(s=Qe({},s)),r!=null&&!Ae(r)&&(r=null);const i=Sv(),o=new Set;let a=!1;const c=i.app={_uid:$b++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:Bv,get config(){return i.config},set config(l){},use(l,...u){return o.has(l)||(l&&re(l.install)?(o.add(l),l.install(c,...u)):re(l)&&(o.add(l),l(c,...u))),c},mixin(l){return i.mixins.includes(l)||i.mixins.push(l),c},component(l,u){return u?(i.components[l]=u,c):i.components[l]},directive(l,u){return u?(i.directives[l]=u,c):i.directives[l]},mount(l,u,h){if(!a){const f=Be(s,r);return f.appContext=i,u&&e?e(f,l):t(f,l,h),a=!0,c._container=l,l.__vue_app__=c,gl(f.component)||f.component.proxy}},unmount(){a&&(t(null,c._container),delete c._container.__vue_app__)},provide(l,u){return i.provides[l]=u,c},runWithContext(l){To=c;try{return l()}finally{To=null}}};return c}}let To=null;function $r(t,e){if(ze){let n=ze.provides;const s=ze.parent&&ze.parent.provides;s===n&&(n=ze.provides=Object.create(s)),n[t]=e}}function At(t,e,n=!1){const s=ze||tt;if(s||To){const r=s?s.parent==null?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:To._context.provides;if(r&&t in r)return r[t];if(arguments.length>1)return n&&re(e)?e.call(s&&s.proxy):e}}function rd(){return!!(ze||tt||To)}function Bb(t,e,n,s=!1){const r={},i={};uc(i,pl,1),t.propsDefaults=Object.create(null),Rv(t,e,r,i);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=s?r:J_(r):t.type.props?t.props=r:t.props=i,t.attrs=i}function Hb(t,e,n,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=t,a=de(r),[c]=t.propsOptions;let l=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(fl(t.emitsOptions,f))continue;const d=e[f];if(c)if(ye(i,f))d!==i[f]&&(i[f]=d,l=!0);else{const p=An(f);r[p]=fh(c,a,p,d,t,!1)}else d!==i[f]&&(i[f]=d,l=!0)}}}else{Rv(t,e,r,i)&&(l=!0);let u;for(const h in a)(!e||!ye(e,h)&&((u=_i(h))===h||!ye(e,u)))&&(c?n&&(n[h]!==void 0||n[u]!==void 0)&&(r[h]=fh(c,a,h,void 0,t,!0)):delete r[h]);if(i!==a)for(const h in i)(!e||!ye(e,h))&&(delete i[h],l=!0)}l&&Qn(t,"set","$attrs")}function Rv(t,e,n,s){const[r,i]=t.propsOptions;let o=!1,a;if(e)for(let c in e){if(Xi(c))continue;const l=e[c];let u;r&&ye(r,u=An(c))?!i||!i.includes(u)?n[u]=l:(a||(a={}))[u]=l:fl(t.emitsOptions,c)||(!(c in s)||l!==s[c])&&(s[c]=l,o=!0)}if(i){const c=de(n),l=a||De;for(let u=0;u<i.length;u++){const h=i[u];n[h]=fh(r,c,h,l[h],t,!ye(l,h))}}return o}function fh(t,e,n,s,r,i){const o=t[n];if(o!=null){const a=ye(o,"default");if(a&&s===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&re(c)){const{propsDefaults:l}=r;n in l?s=l[n]:(ei(r),s=l[n]=c.call(null,e),Ys())}else s=c}o[0]&&(i&&!a?s=!1:o[1]&&(s===""||s===_i(n))&&(s=!0))}return s}function kv(t,e,n=!1){const s=e.propsCache,r=s.get(t);if(r)return r;const i=t.props,o={},a=[];let c=!1;if(!re(t)){const u=h=>{c=!0;const[f,d]=kv(h,e,!0);Qe(o,f),d&&a.push(...d)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!c)return Ae(t)&&s.set(t,xr),xr;if(Q(i))for(let u=0;u<i.length;u++){const h=An(i[u]);Cg(h)&&(o[h]=De)}else if(i)for(const u in i){const h=An(u);if(Cg(h)){const f=i[u],d=o[h]=Q(f)||re(f)?{type:f}:Qe({},f);if(d){const p=Rg(Boolean,d.type),y=Rg(String,d.type);d[0]=p>-1,d[1]=y<0||p<y,(p>-1||ye(d,"default"))&&a.push(h)}}}const l=[o,a];return Ae(t)&&s.set(t,l),l}function Cg(t){return t[0]!=="$"}function bg(t){const e=t&&t.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:t===null?"null":""}function Sg(t,e){return bg(t)===bg(e)}function Rg(t,e){return Q(e)?e.findIndex(n=>Sg(n,t)):re(e)&&Sg(e,t)?0:-1}const Av=t=>t[0]==="_"||t==="$stable",id=t=>Q(t)?t.map(Qt):[Qt(t)],jb=(t,e,n)=>{if(e._n)return e;const s=Yf((...r)=>id(e(...r)),n);return s._c=!1,s},Nv=(t,e,n)=>{const s=t._ctx;for(const r in t){if(Av(r))continue;const i=t[r];if(re(i))e[r]=jb(r,i,s);else if(i!=null){const o=id(i);e[r]=()=>o}}},Ov=(t,e)=>{const n=id(e);t.slots.default=()=>n},Wb=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=de(e),uc(e,"_",n)):Nv(e,t.slots={})}else t.slots={},e&&Ov(t,e);uc(t.slots,pl,1)},Kb=(t,e,n)=>{const{vnode:s,slots:r}=t;let i=!0,o=De;if(s.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:(Qe(r,e),!n&&a===1&&delete r._):(i=!e.$stable,Nv(e,r)),o=e}else e&&(Ov(t,e),o={default:1});if(i)for(const a in r)!Av(a)&&!(a in o)&&delete r[a]};function _c(t,e,n,s,r=!1){if(Q(t)){t.forEach((f,d)=>_c(f,e&&(Q(e)?e[d]:e),n,s,r));return}if(Qs(s)&&!r)return;const i=s.shapeFlag&4?gl(s.component)||s.component.proxy:s.el,o=r?null:i,{i:a,r:c}=t,l=e&&e.r,u=a.refs===De?a.refs={}:a.refs,h=a.setupState;if(l!=null&&l!==c&&(He(l)?(u[l]=null,ye(h,l)&&(h[l]=null)):Le(l)&&(l.value=null)),re(c))ws(c,a,12,[o,u]);else{const f=He(c),d=Le(c);if(f||d){const p=()=>{if(t.f){const y=f?ye(h,c)?h[c]:u[c]:c.value;r?Q(y)&&Mf(y,i):Q(y)?y.includes(i)||y.push(i):f?(u[c]=[i],ye(h,c)&&(h[c]=u[c])):(c.value=[i],t.k&&(u[t.k]=c.value))}else f?(u[c]=o,ye(h,c)&&(h[c]=o)):d&&(c.value=o,t.k&&(u[t.k]=o))};o?(p.id=-1,it(p,n)):p()}}}let os=!1;const Pa=t=>/svg/.test(t.namespaceURI)&&t.tagName!=="foreignObject",Da=t=>t.nodeType===8;function qb(t){const{mt:e,p:n,o:{patchProp:s,createText:r,nextSibling:i,parentNode:o,remove:a,insert:c,createComment:l}}=t,u=(v,g)=>{if(!g.hasChildNodes()){n(null,v,g),pc(),g._vnode=v;return}os=!1,h(g.firstChild,v,null,null,null),pc(),g._vnode=v,os&&console.error("Hydration completed but contains mismatches.")},h=(v,g,T,w,b,D=!1)=>{const O=Da(v)&&v.data==="[",C=()=>y(v,g,T,w,b,O),{type:A,ref:H,shapeFlag:Y,patchFlag:B}=g;let te=v.nodeType;g.el=v,B===-2&&(D=!1,g.dynamicChildren=null);let K=null;switch(A){case Jr:te!==3?g.children===""?(c(g.el=r(""),o(v),v),K=v):K=C():(v.data!==g.children&&(os=!0,v.data=g.children),K=i(v));break;case Nt:te!==8||O?K=C():K=i(v);break;case ec:if(O&&(v=i(v),te=v.nodeType),te===1||te===3){K=v;const Ne=!g.children.length;for(let ne=0;ne<g.staticCount;ne++)Ne&&(g.children+=K.nodeType===1?K.outerHTML:K.data),ne===g.staticCount-1&&(g.anchor=K),K=i(K);return O?i(K):K}else C();break;case Mt:O?K=p(v,g,T,w,b,D):K=C();break;default:if(Y&1)te!==1||g.type.toLowerCase()!==v.tagName.toLowerCase()?K=C():K=f(v,g,T,w,b,D);else if(Y&6){g.slotScopeIds=b;const Ne=o(v);if(e(g,Ne,null,T,w,Pa(Ne),D),K=O?E(v):i(v),K&&Da(K)&&K.data==="teleport end"&&(K=i(K)),Qs(g)){let ne;O?(ne=Be(Mt),ne.anchor=K?K.previousSibling:Ne.lastChild):ne=v.nodeType===3?Fv(""):Be("div"),ne.el=v,g.component.subTree=ne}}else Y&64?te!==8?K=C():K=g.type.hydrate(v,g,T,w,b,D,t,d):Y&128&&(K=g.type.hydrate(v,g,T,w,Pa(o(v)),b,D,t,h))}return H!=null&&_c(H,null,w,g),K},f=(v,g,T,w,b,D)=>{D=D||!!g.dynamicChildren;const{type:O,props:C,patchFlag:A,shapeFlag:H,dirs:Y}=g,B=O==="input"&&Y||O==="option";if(B||A!==-1){if(Y&&_n(g,null,T,"created"),C)if(B||!D||A&48)for(const K in C)(B&&K.endsWith("value")||zo(K)&&!Xi(K))&&s(v,K,null,C[K],!1,void 0,T);else C.onClick&&s(v,"onClick",null,C.onClick,!1,void 0,T);let te;if((te=C&&C.onVnodeBeforeMount)&&xt(te,T,g),Y&&_n(g,null,T,"beforeMount"),((te=C&&C.onVnodeMounted)||Y)&&dv(()=>{te&&xt(te,T,g),Y&&_n(g,null,T,"mounted")},w),H&16&&!(C&&(C.innerHTML||C.textContent))){let K=d(v.firstChild,g,v,T,w,b,D);for(;K;){os=!0;const Ne=K;K=K.nextSibling,a(Ne)}}else H&8&&v.textContent!==g.children&&(os=!0,v.textContent=g.children)}return v.nextSibling},d=(v,g,T,w,b,D,O)=>{O=O||!!g.dynamicChildren;const C=g.children,A=C.length;for(let H=0;H<A;H++){const Y=O?C[H]:C[H]=Qt(C[H]);if(v)v=h(v,Y,w,b,D,O);else{if(Y.type===Jr&&!Y.children)continue;os=!0,n(null,Y,T,null,w,b,Pa(T),D)}}return v},p=(v,g,T,w,b,D)=>{const{slotScopeIds:O}=g;O&&(b=b?b.concat(O):O);const C=o(v),A=d(i(v),g,C,T,w,b,D);return A&&Da(A)&&A.data==="]"?i(g.anchor=A):(os=!0,c(g.anchor=l("]"),C,A),A)},y=(v,g,T,w,b,D)=>{if(os=!0,g.el=null,D){const A=E(v);for(;;){const H=i(v);if(H&&H!==A)a(H);else break}}const O=i(v),C=o(v);return a(v),n(null,g,C,O,T,w,Pa(C),b),O},E=v=>{let g=0;for(;v;)if(v=i(v),v&&Da(v)&&(v.data==="["&&g++,v.data==="]")){if(g===0)return i(v);g--}return v};return[u,h]}const it=dv;function zb(t){return Pv(t)}function Gb(t){return Pv(t,qb)}function Pv(t,e){const n=sh();n.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:a,createComment:c,setText:l,setElementText:u,parentNode:h,nextSibling:f,setScopeId:d=cn,insertStaticContent:p}=t,y=(m,_,I,S=null,k=null,P=null,j=!1,L=null,F=!!_.dynamicChildren)=>{if(m===_)return;m&&!sn(m,_)&&(S=R(m),Pt(m,k,P,!0),m=null),_.patchFlag===-2&&(F=!1,_.dynamicChildren=null);const{type:x,ref:X,shapeFlag:q}=_;switch(x){case Jr:E(m,_,I,S);break;case Nt:v(m,_,I,S);break;case ec:m==null&&g(_,I,S,j);break;case Mt:B(m,_,I,S,k,P,j,L,F);break;default:q&1?b(m,_,I,S,k,P,j,L,F):q&6?te(m,_,I,S,k,P,j,L,F):(q&64||q&128)&&x.process(m,_,I,S,k,P,j,L,F,U)}X!=null&&k&&_c(X,m&&m.ref,P,_||m,!_)},E=(m,_,I,S)=>{if(m==null)s(_.el=a(_.children),I,S);else{const k=_.el=m.el;_.children!==m.children&&l(k,_.children)}},v=(m,_,I,S)=>{m==null?s(_.el=c(_.children||""),I,S):_.el=m.el},g=(m,_,I,S)=>{[m.el,m.anchor]=p(m.children,_,I,S,m.el,m.anchor)},T=({el:m,anchor:_},I,S)=>{let k;for(;m&&m!==_;)k=f(m),s(m,I,S),m=k;s(_,I,S)},w=({el:m,anchor:_})=>{let I;for(;m&&m!==_;)I=f(m),r(m),m=I;r(_)},b=(m,_,I,S,k,P,j,L,F)=>{j=j||_.type==="svg",m==null?D(_,I,S,k,P,j,L,F):A(m,_,k,P,j,L,F)},D=(m,_,I,S,k,P,j,L)=>{let F,x;const{type:X,props:q,shapeFlag:Z,transition:oe,dirs:ue}=m;if(F=m.el=o(m.type,P,q&&q.is,q),Z&8?u(F,m.children):Z&16&&C(m.children,F,null,S,k,P&&X!=="foreignObject",j,L),ue&&_n(m,null,S,"created"),O(F,m,m.scopeId,j,S),q){for(const Se in q)Se!=="value"&&!Xi(Se)&&i(F,Se,null,q[Se],P,m.children,S,k,ut);"value"in q&&i(F,"value",null,q.value),(x=q.onVnodeBeforeMount)&&xt(x,S,m)}ue&&_n(m,null,S,"beforeMount");const Oe=(!k||k&&!k.pendingBranch)&&oe&&!oe.persisted;Oe&&oe.beforeEnter(F),s(F,_,I),((x=q&&q.onVnodeMounted)||Oe||ue)&&it(()=>{x&&xt(x,S,m),Oe&&oe.enter(F),ue&&_n(m,null,S,"mounted")},k)},O=(m,_,I,S,k)=>{if(I&&d(m,I),S)for(let P=0;P<S.length;P++)d(m,S[P]);if(k){let P=k.subTree;if(_===P){const j=k.vnode;O(m,j,j.scopeId,j.slotScopeIds,k.parent)}}},C=(m,_,I,S,k,P,j,L,F=0)=>{for(let x=F;x<m.length;x++){const X=m[x]=L?hs(m[x]):Qt(m[x]);y(null,X,_,I,S,k,P,j,L)}},A=(m,_,I,S,k,P,j)=>{const L=_.el=m.el;let{patchFlag:F,dynamicChildren:x,dirs:X}=_;F|=m.patchFlag&16;const q=m.props||De,Z=_.props||De;let oe;I&&Ms(I,!1),(oe=Z.onVnodeBeforeUpdate)&&xt(oe,I,_,m),X&&_n(_,m,I,"beforeUpdate"),I&&Ms(I,!0);const ue=k&&_.type!=="foreignObject";if(x?H(m.dynamicChildren,x,L,I,S,ue,P):j||Ee(m,_,L,null,I,S,ue,P,!1),F>0){if(F&16)Y(L,_,q,Z,I,S,k);else if(F&2&&q.class!==Z.class&&i(L,"class",null,Z.class,k),F&4&&i(L,"style",q.style,Z.style,k),F&8){const Oe=_.dynamicProps;for(let Se=0;Se<Oe.length;Se++){const We=Oe[Se],tn=q[We],wr=Z[We];(wr!==tn||We==="value")&&i(L,We,tn,wr,k,m.children,I,S,ut)}}F&1&&m.children!==_.children&&u(L,_.children)}else!j&&x==null&&Y(L,_,q,Z,I,S,k);((oe=Z.onVnodeUpdated)||X)&&it(()=>{oe&&xt(oe,I,_,m),X&&_n(_,m,I,"updated")},S)},H=(m,_,I,S,k,P,j)=>{for(let L=0;L<_.length;L++){const F=m[L],x=_[L],X=F.el&&(F.type===Mt||!sn(F,x)||F.shapeFlag&70)?h(F.el):I;y(F,x,X,null,S,k,P,j,!0)}},Y=(m,_,I,S,k,P,j)=>{if(I!==S){if(I!==De)for(const L in I)!Xi(L)&&!(L in S)&&i(m,L,I[L],null,j,_.children,k,P,ut);for(const L in S){if(Xi(L))continue;const F=S[L],x=I[L];F!==x&&L!=="value"&&i(m,L,x,F,j,_.children,k,P,ut)}"value"in S&&i(m,"value",I.value,S.value)}},B=(m,_,I,S,k,P,j,L,F)=>{const x=_.el=m?m.el:a(""),X=_.anchor=m?m.anchor:a("");let{patchFlag:q,dynamicChildren:Z,slotScopeIds:oe}=_;oe&&(L=L?L.concat(oe):oe),m==null?(s(x,I,S),s(X,I,S),C(_.children,I,X,k,P,j,L,F)):q>0&&q&64&&Z&&m.dynamicChildren?(H(m.dynamicChildren,Z,I,k,P,j,L),(_.key!=null||k&&_===k.subTree)&&Dv(m,_,!0)):Ee(m,_,I,X,k,P,j,L,F)},te=(m,_,I,S,k,P,j,L,F)=>{_.slotScopeIds=L,m==null?_.shapeFlag&512?k.ctx.activate(_,I,S,j,F):K(_,I,S,k,P,j,F):Ne(m,_,F)},K=(m,_,I,S,k,P,j)=>{const L=m.component=nS(m,S,k);if(Go(m)&&(L.ctx.renderer=U),sS(L),L.asyncDep){if(k&&k.registerDep(L,ne),!m.el){const F=L.subTree=Be(Nt);v(null,F,_,I)}return}ne(L,m,_,I,k,P,j)},Ne=(m,_,I)=>{const S=_.component=m.component;if(ub(m,_,I))if(S.asyncDep&&!S.asyncResolved){ve(S,_,I);return}else S.next=_,rb(S.update),S.update();else _.el=m.el,S.vnode=_},ne=(m,_,I,S,k,P,j)=>{const L=()=>{if(m.isMounted){let{next:X,bu:q,u:Z,parent:oe,vnode:ue}=m,Oe=X,Se;Ms(m,!1),X?(X.el=ue.el,ve(m,X,j)):X=ue,q&&Lr(q),(Se=X.props&&X.props.onVnodeBeforeUpdate)&&xt(Se,oe,X,ue),Ms(m,!0);const We=hu(m),tn=m.subTree;m.subTree=We,y(tn,We,h(tn.el),R(tn),m,k,P),X.el=We.el,Oe===null&&Jf(m,We.el),Z&&it(Z,k),(Se=X.props&&X.props.onVnodeUpdated)&&it(()=>xt(Se,oe,X,ue),k)}else{let X;const{el:q,props:Z}=_,{bm:oe,m:ue,parent:Oe}=m,Se=Qs(_);if(Ms(m,!1),oe&&Lr(oe),!Se&&(X=Z&&Z.onVnodeBeforeMount)&&xt(X,Oe,_),Ms(m,!0),q&&Te){const We=()=>{m.subTree=hu(m),Te(q,m.subTree,m,k,null)};Se?_.type.__asyncLoader().then(()=>!m.isUnmounted&&We()):We()}else{const We=m.subTree=hu(m);y(null,We,I,S,m,k,P),_.el=We.el}if(ue&&it(ue,k),!Se&&(X=Z&&Z.onVnodeMounted)){const We=_;it(()=>xt(X,Oe,We),k)}(_.shapeFlag&256||Oe&&Qs(Oe.vnode)&&Oe.vnode.shapeFlag&256)&&m.a&&it(m.a,k),m.isMounted=!0,_=I=S=null}},F=m.effect=new Hf(L,()=>hl(x),m.scope),x=m.update=()=>F.run();x.id=m.uid,Ms(m,!0),x()},ve=(m,_,I)=>{_.component=m;const S=m.vnode.props;m.vnode=_,m.next=null,Hb(m,_.props,S,I),Kb(m,_.children,I),vi(),gg(),wi()},Ee=(m,_,I,S,k,P,j,L,F=!1)=>{const x=m&&m.children,X=m?m.shapeFlag:0,q=_.children,{patchFlag:Z,shapeFlag:oe}=_;if(Z>0){if(Z&128){rs(x,q,I,S,k,P,j,L,F);return}else if(Z&256){Fn(x,q,I,S,k,P,j,L,F);return}}oe&8?(X&16&&ut(x,k,P),q!==x&&u(I,q)):X&16?oe&16?rs(x,q,I,S,k,P,j,L,F):ut(x,k,P,!0):(X&8&&u(I,""),oe&16&&C(q,I,S,k,P,j,L,F))},Fn=(m,_,I,S,k,P,j,L,F)=>{m=m||xr,_=_||xr;const x=m.length,X=_.length,q=Math.min(x,X);let Z;for(Z=0;Z<q;Z++){const oe=_[Z]=F?hs(_[Z]):Qt(_[Z]);y(m[Z],oe,I,null,k,P,j,L,F)}x>X?ut(m,k,P,!0,!1,q):C(_,I,S,k,P,j,L,F,q)},rs=(m,_,I,S,k,P,j,L,F)=>{let x=0;const X=_.length;let q=m.length-1,Z=X-1;for(;x<=q&&x<=Z;){const oe=m[x],ue=_[x]=F?hs(_[x]):Qt(_[x]);if(sn(oe,ue))y(oe,ue,I,null,k,P,j,L,F);else break;x++}for(;x<=q&&x<=Z;){const oe=m[q],ue=_[Z]=F?hs(_[Z]):Qt(_[Z]);if(sn(oe,ue))y(oe,ue,I,null,k,P,j,L,F);else break;q--,Z--}if(x>q){if(x<=Z){const oe=Z+1,ue=oe<X?_[oe].el:S;for(;x<=Z;)y(null,_[x]=F?hs(_[x]):Qt(_[x]),I,ue,k,P,j,L,F),x++}}else if(x>Z)for(;x<=q;)Pt(m[x],k,P,!0),x++;else{const oe=x,ue=x,Oe=new Map;for(x=ue;x<=Z;x++){const $t=_[x]=F?hs(_[x]):Qt(_[x]);$t.key!=null&&Oe.set($t.key,x)}let Se,We=0;const tn=Z-ue+1;let wr=!1,sg=0;const Di=new Array(tn);for(x=0;x<tn;x++)Di[x]=0;for(x=oe;x<=q;x++){const $t=m[x];if(We>=tn){Pt($t,k,P,!0);continue}let mn;if($t.key!=null)mn=Oe.get($t.key);else for(Se=ue;Se<=Z;Se++)if(Di[Se-ue]===0&&sn($t,_[Se])){mn=Se;break}mn===void 0?Pt($t,k,P,!0):(Di[mn-ue]=x+1,mn>=sg?sg=mn:wr=!0,y($t,_[mn],I,null,k,P,j,L,F),We++)}const rg=wr?Qb(Di):xr;for(Se=rg.length-1,x=tn-1;x>=0;x--){const $t=ue+x,mn=_[$t],ig=$t+1<X?_[$t+1].el:S;Di[x]===0?y(null,mn,I,ig,k,P,j,L,F):wr&&(Se<0||x!==rg[Se]?gn(mn,I,ig,2):Se--)}}},gn=(m,_,I,S,k=null)=>{const{el:P,type:j,transition:L,children:F,shapeFlag:x}=m;if(x&6){gn(m.component.subTree,_,I,S);return}if(x&128){m.suspense.move(_,I,S);return}if(x&64){j.move(m,_,I,U);return}if(j===Mt){s(P,_,I);for(let q=0;q<F.length;q++)gn(F[q],_,I,S);s(m.anchor,_,I);return}if(j===ec){T(m,_,I);return}if(S!==2&&x&1&&L)if(S===0)L.beforeEnter(P),s(P,_,I),it(()=>L.enter(P),k);else{const{leave:q,delayLeave:Z,afterLeave:oe}=L,ue=()=>s(P,_,I),Oe=()=>{q(P,()=>{ue(),oe&&oe()})};Z?Z(P,ue,Oe):Oe()}else s(P,_,I)},Pt=(m,_,I,S=!1,k=!1)=>{const{type:P,props:j,ref:L,children:F,dynamicChildren:x,shapeFlag:X,patchFlag:q,dirs:Z}=m;if(L!=null&&_c(L,null,I,m,!0),X&256){_.ctx.deactivate(m);return}const oe=X&1&&Z,ue=!Qs(m);let Oe;if(ue&&(Oe=j&&j.onVnodeBeforeUnmount)&&xt(Oe,_,m),X&6)ba(m.component,I,S);else{if(X&128){m.suspense.unmount(I,S);return}oe&&_n(m,null,_,"beforeUnmount"),X&64?m.type.remove(m,_,I,k,U,S):x&&(P!==Mt||q>0&&q&64)?ut(x,_,I,!1,!0):(P===Mt&&q&384||!k&&X&16)&&ut(F,_,I),S&&_r(m)}(ue&&(Oe=j&&j.onVnodeUnmounted)||oe)&&it(()=>{Oe&&xt(Oe,_,m),oe&&_n(m,null,_,"unmounted")},I)},_r=m=>{const{type:_,el:I,anchor:S,transition:k}=m;if(_===Mt){vr(I,S);return}if(_===ec){w(m);return}const P=()=>{r(I),k&&!k.persisted&&k.afterLeave&&k.afterLeave()};if(m.shapeFlag&1&&k&&!k.persisted){const{leave:j,delayLeave:L}=k,F=()=>j(I,P);L?L(m.el,P,F):F()}else P()},vr=(m,_)=>{let I;for(;m!==_;)I=f(m),r(m),m=I;r(_)},ba=(m,_,I)=>{const{bum:S,scope:k,update:P,subTree:j,um:L}=m;S&&Lr(S),k.stop(),P&&(P.active=!1,Pt(j,m,_,I)),L&&it(L,_),it(()=>{m.isUnmounted=!0},_),_&&_.pendingBranch&&!_.isUnmounted&&m.asyncDep&&!m.asyncResolved&&m.suspenseId===_.pendingId&&(_.deps--,_.deps===0&&_.resolve())},ut=(m,_,I,S=!1,k=!1,P=0)=>{for(let j=P;j<m.length;j++)Pt(m[j],_,I,S,k)},R=m=>m.shapeFlag&6?R(m.component.subTree):m.shapeFlag&128?m.suspense.next():f(m.anchor||m.el),W=(m,_,I)=>{m==null?_._vnode&&Pt(_._vnode,null,null,!0):y(_._vnode||null,m,_,null,null,null,I),gg(),pc(),_._vnode=m},U={p:y,um:Pt,m:gn,r:_r,mt:K,mc:C,pc:Ee,pbc:H,n:R,o:t};let J,Te;return e&&([J,Te]=e(U)),{render:W,hydrate:J,createApp:Vb(W,J)}}function Ms({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function Dv(t,e,n=!1){const s=t.children,r=e.children;if(Q(s)&&Q(r))for(let i=0;i<s.length;i++){const o=s[i];let a=r[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[i]=hs(r[i]),a.el=o.el),n||Dv(o,a)),a.type===Jr&&(a.el=o.el)}}function Qb(t){const e=t.slice(),n=[0];let s,r,i,o,a;const c=t.length;for(s=0;s<c;s++){const l=t[s];if(l!==0){if(r=n[n.length-1],t[r]<l){e[s]=r,n.push(s);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<l?i=a+1:o=a;l<t[n[i]]&&(i>0&&(e[s]=n[i-1]),n[i]=s)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}const Yb=t=>t.__isTeleport,Mt=Symbol.for("v-fgt"),Jr=Symbol.for("v-txt"),Nt=Symbol.for("v-cmt"),ec=Symbol.for("v-stc"),eo=[];let Jt=null;function Vn(t=!1){eo.push(Jt=t?null:[])}function xv(){eo.pop(),Jt=eo[eo.length-1]||null}let Xr=1;function kg(t){Xr+=t}function Mv(t){return t.dynamicChildren=Xr>0?Jt||xr:null,xv(),Xr>0&&Jt&&Jt.push(t),t}function MV(t,e,n,s,r,i){return Mv(od(t,e,n,s,r,i,!0))}function ds(t,e,n,s,r){return Mv(Be(t,e,n,s,r,!0))}function Zr(t){return t?t.__v_isVNode===!0:!1}function sn(t,e){return t.type===e.type&&t.key===e.key}const pl="__vInternal",Lv=({key:t})=>t??null,tc=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?He(t)||Le(t)||re(t)?{i:tt,r:t,k:e,f:!!n}:t:null);function od(t,e=null,n=null,s=0,r=null,i=t===Mt?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Lv(e),ref:e&&tc(e),scopeId:uv,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:tt};return a?(ad(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=He(n)?8:16),Xr>0&&!o&&Jt&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Jt.push(c),c}const Be=Jb;function Jb(t,e=null,n=null,s=0,r=null,i=!1){if((!t||t===Tv)&&(t=Nt),Zr(t)){const a=Yn(t,e,!0);return n&&ad(a,n),Xr>0&&!i&&Jt&&(a.shapeFlag&6?Jt[Jt.indexOf(t)]=a:Jt.push(a)),a.patchFlag|=-2,a}if(aS(t)&&(t=t.__vccOpts),e){e=Xb(e);let{class:a,style:c}=e;a&&!He(a)&&(e.class=Uf(a)),Ae(c)&&(Z_(c)&&!Q(c)&&(c=Qe({},c)),e.style=Ff(c))}const o=He(t)?1:hv(t)?128:Yb(t)?64:Ae(t)?4:re(t)?2:0;return od(t,e,n,s,r,o,i,!0)}function Xb(t){return t?Z_(t)||pl in t?Qe({},t):t:null}function Yn(t,e,n=!1){const{props:s,ref:r,patchFlag:i,children:o}=t,a=e?Zb(s||{},e):s;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:a,key:a&&Lv(a),ref:e&&e.ref?n&&r?Q(r)?r.concat(tc(e)):[r,tc(e)]:tc(e):r,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Mt?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Yn(t.ssContent),ssFallback:t.ssFallback&&Yn(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce}}function Fv(t=" ",e=0){return Be(Jr,null,t,e)}function LV(t="",e=!1){return e?(Vn(),ds(Nt,null,t)):Be(Nt,null,t)}function Qt(t){return t==null||typeof t=="boolean"?Be(Nt):Q(t)?Be(Mt,null,t.slice()):typeof t=="object"?hs(t):Be(Jr,null,String(t))}function hs(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Yn(t)}function ad(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(Q(e))n=16;else if(typeof e=="object")if(s&65){const r=e.default;r&&(r._c&&(r._d=!1),ad(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!(pl in e)?e._ctx=tt:r===3&&tt&&(tt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else re(e)?(e={default:e,_ctx:tt},n=32):(e=String(e),s&64?(n=16,e=[Fv(e)]):n=8);t.children=e,t.shapeFlag|=n}function Zb(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const r in s)if(r==="class")e.class!==s.class&&(e.class=Uf([e.class,s.class]));else if(r==="style")e.style=Ff([e.style,s.style]);else if(zo(r)){const i=e[r],o=s[r];o&&i!==o&&!(Q(i)&&i.includes(o))&&(e[r]=i?[].concat(i,o):o)}else r!==""&&(e[r]=s[r])}return e}function xt(t,e,n,s=null){Zt(t,e,7,[n,s])}const eS=Sv();let tS=0;function nS(t,e,n){const s=t.type,r=(e?e.appContext:t.appContext)||eS,i={uid:tS++,vnode:t,type:s,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new $_(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:kv(s,r),emitsOptions:lv(s,r),emit:null,emitted:null,propsDefaults:De,inheritAttrs:s.inheritAttrs,ctx:De,data:De,props:De,attrs:De,slots:De,refs:De,setupState:De,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=ob.bind(null,i),t.ce&&t.ce(i),i}let ze=null;const Qo=()=>ze||tt;let cd,Er,Ag="__VUE_INSTANCE_SETTERS__";(Er=sh()[Ag])||(Er=sh()[Ag]=[]),Er.push(t=>ze=t),cd=t=>{Er.length>1?Er.forEach(e=>e(t)):Er[0](t)};const ei=t=>{cd(t),t.scope.on()},Ys=()=>{ze&&ze.scope.off(),cd(null)};function Uv(t){return t.vnode.shapeFlag&4}let ti=!1;function sS(t,e=!1){ti=e;const{props:n,children:s}=t.vnode,r=Uv(t);Bb(t,n,r,e),Wb(t,s);const i=r?rS(t,e):void 0;return ti=!1,i}function rS(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=ul(new Proxy(t.ctx,Db));const{setup:s}=n;if(s){const r=t.setupContext=s.length>1?oS(t):null;ei(t),vi();const i=ws(s,t,0,[t.props,r]);if(wi(),Ys(),D_(i)){if(i.then(Ys,Ys),e)return i.then(o=>{dh(t,o,e)}).catch(o=>{Ei(o,t,0)});t.asyncDep=i}else dh(t,i,e)}else $v(t,e)}function dh(t,e,n){re(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ae(e)&&(t.setupState=sv(e)),$v(t,n)}let Ng;function $v(t,e,n){const s=t.type;if(!t.render){if(!e&&Ng&&!s.render){const r=s.template||sd(t).template;if(r){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:a,compilerOptions:c}=s,l=Qe(Qe({isCustomElement:i,delimiters:a},o),c);s.render=Ng(r,l)}}t.render=s.render||cn}ei(t),vi(),xb(t),wi(),Ys()}function iS(t){return t.attrsProxy||(t.attrsProxy=new Proxy(t.attrs,{get(e,n){return Ut(t,"get","$attrs"),e[n]}}))}function oS(t){const e=n=>{t.exposed=n||{}};return{get attrs(){return iS(t)},slots:t.slots,emit:t.emit,expose:e}}function gl(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(sv(ul(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Zi)return Zi[n](t)},has(e,n){return n in e||n in Zi}}))}function ph(t,e=!0){return re(t)?t.displayName||t.name:t.name||e&&t.__name}function aS(t){return re(t)&&"__vccOpts"in t}const yt=(t,e)=>tb(t,e,ti);function bn(t,e,n){const s=arguments.length;return s===2?Ae(e)&&!Q(e)?Zr(e)?Be(t,null,[e]):Be(t,e):Be(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Zr(n)&&(n=[n]),Be(t,e,n))}const Vv=Symbol.for("v-scx"),cS=()=>At(Vv),Bv="3.3.4",lS="http://www.w3.org/2000/svg",Bs=typeof document<"u"?document:null,Og=Bs&&Bs.createElement("template"),uS={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const r=e?Bs.createElementNS(lS,t):Bs.createElement(t,n?{is:n}:void 0);return t==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:t=>Bs.createTextNode(t),createComment:t=>Bs.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Bs.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,r,i){const o=n?n.previousSibling:e.lastChild;if(r&&(r===i||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===i||!(r=r.nextSibling)););else{Og.innerHTML=s?`<svg>${t}</svg>`:t;const a=Og.content;if(s){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}};function hS(t,e,n){const s=t._vtc;s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}function fS(t,e,n){const s=t.style,r=He(n);if(n&&!r){if(e&&!He(e))for(const i in e)n[i]==null&&gh(s,i,"");for(const i in n)gh(s,i,n[i])}else{const i=s.display;r?e!==n&&(s.cssText=n):e&&t.removeAttribute("style"),"_vod"in t&&(s.display=i)}}const Pg=/\s*!important$/;function gh(t,e,n){if(Q(n))n.forEach(s=>gh(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=dS(t,e);Pg.test(n)?t.setProperty(_i(s),n.replace(Pg,""),"important"):t[s]=n}}const Dg=["Webkit","Moz","ms"],yu={};function dS(t,e){const n=yu[e];if(n)return n;let s=An(e);if(s!=="filter"&&s in t)return yu[e]=s;s=cl(s);for(let r=0;r<Dg.length;r++){const i=Dg[r]+s;if(i in t)return yu[e]=i}return e}const xg="http://www.w3.org/1999/xlink";function pS(t,e,n,s,r){if(s&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(xg,e.slice(6,e.length)):t.setAttributeNS(xg,e,n);else{const i=_C(e);n==null||i&&!F_(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function gS(t,e,n,s,r,i,o){if(e==="innerHTML"||e==="textContent"){s&&o(s,r,i),t[e]=n??"";return}const a=t.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){t._value=n;const l=a==="OPTION"?t.getAttribute("value"):t.value,u=n??"";l!==u&&(t.value=u),n==null&&t.removeAttribute(e);return}let c=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=F_(n):n==null&&l==="string"?(n="",c=!0):l==="number"&&(n=0,c=!0)}try{t[e]=n}catch{}c&&t.removeAttribute(e)}function ps(t,e,n,s){t.addEventListener(e,n,s)}function mS(t,e,n,s){t.removeEventListener(e,n,s)}function yS(t,e,n,s,r=null){const i=t._vei||(t._vei={}),o=i[e];if(s&&o)o.value=s;else{const[a,c]=_S(e);if(s){const l=i[e]=ES(s,r);ps(t,a,l,c)}else o&&(mS(t,a,o,c),i[e]=void 0)}}const Mg=/(?:Once|Passive|Capture)$/;function _S(t){let e;if(Mg.test(t)){e={};let s;for(;s=t.match(Mg);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):_i(t.slice(2)),e]}let _u=0;const vS=Promise.resolve(),wS=()=>_u||(vS.then(()=>_u=0),_u=Date.now());function ES(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;Zt(TS(s,n.value),e,5,[s])};return n.value=t,n.attached=wS(),n}function TS(t,e){if(Q(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>r=>!r._stopped&&s&&s(r))}else return e}const Lg=/^on[a-z]/,IS=(t,e,n,s,r=!1,i,o,a,c)=>{e==="class"?hS(t,s,r):e==="style"?fS(t,n,s):zo(e)?xf(e)||yS(t,e,n,s,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):CS(t,e,s,r))?gS(t,e,s,i,o,a,c):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),pS(t,e,s,r))};function CS(t,e,n,s){return s?!!(e==="innerHTML"||e==="textContent"||e in t&&Lg.test(e)&&re(n)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA"||Lg.test(e)&&He(n)?!1:e in t}const as="transition",xi="animation",ml=(t,{slots:e})=>bn(wb,bS(t),e);ml.displayName="Transition";const Hv={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};ml.props=Qe({},gv,Hv);const Ls=(t,e=[])=>{Q(t)?t.forEach(n=>n(...e)):t&&t(...e)},Fg=t=>t?Q(t)?t.some(e=>e.length>1):t.length>1:!1;function bS(t){const e={};for(const B in t)B in Hv||(e[B]=t[B]);if(t.css===!1)return e;const{name:n="v",type:s,duration:r,enterFromClass:i=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:c=i,appearActiveClass:l=o,appearToClass:u=a,leaveFromClass:h=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=t,p=SS(r),y=p&&p[0],E=p&&p[1],{onBeforeEnter:v,onEnter:g,onEnterCancelled:T,onLeave:w,onLeaveCancelled:b,onBeforeAppear:D=v,onAppear:O=g,onAppearCancelled:C=T}=e,A=(B,te,K)=>{Fs(B,te?u:a),Fs(B,te?l:o),K&&K()},H=(B,te)=>{B._isLeaving=!1,Fs(B,h),Fs(B,d),Fs(B,f),te&&te()},Y=B=>(te,K)=>{const Ne=B?O:g,ne=()=>A(te,B,K);Ls(Ne,[te,ne]),Ug(()=>{Fs(te,B?c:i),cs(te,B?u:a),Fg(Ne)||$g(te,s,y,ne)})};return Qe(e,{onBeforeEnter(B){Ls(v,[B]),cs(B,i),cs(B,o)},onBeforeAppear(B){Ls(D,[B]),cs(B,c),cs(B,l)},onEnter:Y(!1),onAppear:Y(!0),onLeave(B,te){B._isLeaving=!0;const K=()=>H(B,te);cs(B,h),AS(),cs(B,f),Ug(()=>{B._isLeaving&&(Fs(B,h),cs(B,d),Fg(w)||$g(B,s,E,K))}),Ls(w,[B,K])},onEnterCancelled(B){A(B,!1),Ls(T,[B])},onAppearCancelled(B){A(B,!0),Ls(C,[B])},onLeaveCancelled(B){H(B),Ls(b,[B])}})}function SS(t){if(t==null)return null;if(Ae(t))return[vu(t.enter),vu(t.leave)];{const e=vu(t);return[e,e]}}function vu(t){return L_(t)}function cs(t,e){e.split(/\s+/).forEach(n=>n&&t.classList.add(n)),(t._vtc||(t._vtc=new Set)).add(e)}function Fs(t,e){e.split(/\s+/).forEach(s=>s&&t.classList.remove(s));const{_vtc:n}=t;n&&(n.delete(e),n.size||(t._vtc=void 0))}function Ug(t){requestAnimationFrame(()=>{requestAnimationFrame(t)})}let RS=0;function $g(t,e,n,s){const r=t._endId=++RS,i=()=>{r===t._endId&&s()};if(n)return setTimeout(i,n);const{type:o,timeout:a,propCount:c}=kS(t,e);if(!o)return s();const l=o+"end";let u=0;const h=()=>{t.removeEventListener(l,f),i()},f=d=>{d.target===t&&++u>=c&&h()};setTimeout(()=>{u<c&&h()},a+1),t.addEventListener(l,f)}function kS(t,e){const n=window.getComputedStyle(t),s=p=>(n[p]||"").split(", "),r=s(`${as}Delay`),i=s(`${as}Duration`),o=Vg(r,i),a=s(`${xi}Delay`),c=s(`${xi}Duration`),l=Vg(a,c);let u=null,h=0,f=0;e===as?o>0&&(u=as,h=o,f=i.length):e===xi?l>0&&(u=xi,h=l,f=c.length):(h=Math.max(o,l),u=h>0?o>l?as:xi:null,f=u?u===as?i.length:c.length:0);const d=u===as&&/\b(transform|all)(,|$)/.test(s(`${as}Property`).toString());return{type:u,timeout:h,propCount:f,hasTransform:d}}function Vg(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max(...e.map((n,s)=>Bg(n)+Bg(t[s])))}function Bg(t){return Number(t.slice(0,-1).replace(",","."))*1e3}function AS(){return document.body.offsetHeight}const ni=t=>{const e=t.props["onUpdate:modelValue"]||!1;return Q(e)?n=>Lr(e,n):e};function NS(t){t.target.composing=!0}function Hg(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const FV={created(t,{modifiers:{lazy:e,trim:n,number:s}},r){t._assign=ni(r);const i=s||r.props&&r.props.type==="number";ps(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),i&&(a=hc(a)),t._assign(a)}),n&&ps(t,"change",()=>{t.value=t.value.trim()}),e||(ps(t,"compositionstart",NS),ps(t,"compositionend",Hg),ps(t,"change",Hg))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:s,number:r}},i){if(t._assign=ni(i),t.composing||document.activeElement===t&&t.type!=="range"&&(n||s&&t.value.trim()===e||(r||t.type==="number")&&hc(t.value)===e))return;const o=e??"";t.value!==o&&(t.value=o)}},UV={created(t,{value:e},n){t.checked=Qr(e,n.props.value),t._assign=ni(n),ps(t,"change",()=>{t._assign(Io(t))})},beforeUpdate(t,{value:e,oldValue:n},s){t._assign=ni(s),e!==n&&(t.checked=Qr(e,s.props.value))}},$V={deep:!0,created(t,{value:e,modifiers:{number:n}},s){const r=ol(e);ps(t,"change",()=>{const i=Array.prototype.filter.call(t.options,o=>o.selected).map(o=>n?hc(Io(o)):Io(o));t._assign(t.multiple?r?new Set(i):i:i[0])}),t._assign=ni(s)},mounted(t,{value:e}){jg(t,e)},beforeUpdate(t,e,n){t._assign=ni(n)},updated(t,{value:e}){jg(t,e)}};function jg(t,e){const n=t.multiple;if(!(n&&!Q(e)&&!ol(e))){for(let s=0,r=t.options.length;s<r;s++){const i=t.options[s],o=Io(i);if(n)Q(e)?i.selected=wC(e,o)>-1:i.selected=e.has(o);else if(Qr(Io(i),e)){t.selectedIndex!==s&&(t.selectedIndex=s);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function Io(t){return"_value"in t?t._value:t.value}const jv=Qe({patchProp:IS},uS);let to,Wg=!1;function OS(){return to||(to=zb(jv))}function PS(){return to=Wg?to:Gb(jv),Wg=!0,to}const DS=(...t)=>{const e=OS().createApp(...t),{mount:n}=e;return e.mount=s=>{const r=Wv(s);if(!r)return;const i=e._component;!re(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.innerHTML="";const o=n(r,!1,r instanceof SVGElement);return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e},xS=(...t)=>{const e=PS().createApp(...t),{mount:n}=e;return e.mount=s=>{const r=Wv(s);if(r)return n(r,!0,r instanceof SVGElement)},e};function Wv(t){return He(t)?document.querySelector(t):t}const MS=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,LS=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,FS=/^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;function US(t,e){if(t!=="__proto__"&&!(t==="constructor"&&e&&typeof e=="object"&&"prototype"in e))return e}function $S(t,e={}){if(typeof t!="string")return t;const n=t.toLowerCase().trim();if(n==="true")return!0;if(n==="false")return!1;if(n==="null")return null;if(n==="nan")return Number.NaN;if(n==="infinity")return Number.POSITIVE_INFINITY;if(n!=="undefined"){if(!FS.test(t)){if(e.strict)throw new SyntaxError("Invalid JSON");return t}try{return MS.test(t)||LS.test(t)?JSON.parse(t,US):JSON.parse(t)}catch(s){if(e.strict)throw s;return t}}}const VS=/#/g,BS=/&/g,HS=/=/g,Kv=/\+/g,jS=/%5e/gi,WS=/%60/gi,KS=/%7c/gi,qS=/%20/gi;function zS(t){return encodeURI(""+t).replace(KS,"|")}function mh(t){return zS(typeof t=="string"?t:JSON.stringify(t)).replace(Kv,"%2B").replace(qS,"+").replace(VS,"%23").replace(BS,"%26").replace(WS,"`").replace(jS,"^")}function wu(t){return mh(t).replace(HS,"%3D")}function qv(t=""){try{return decodeURIComponent(""+t)}catch{return""+t}}function GS(t){return qv(t.replace(Kv," "))}function QS(t=""){const e={};t[0]==="?"&&(t=t.slice(1));for(const n of t.split("&")){const s=n.match(/([^=]+)=?(.*)/)||[];if(s.length<2)continue;const r=qv(s[1]);if(r==="__proto__"||r==="constructor")continue;const i=GS(s[2]||"");typeof e[r]<"u"?Array.isArray(e[r])?e[r].push(i):e[r]=[e[r],i]:e[r]=i}return e}function YS(t,e){return(typeof e=="number"||typeof e=="boolean")&&(e=String(e)),e?Array.isArray(e)?e.map(n=>`${wu(t)}=${mh(n)}`).join("&"):`${wu(t)}=${mh(e)}`:wu(t)}function JS(t){return Object.keys(t).filter(e=>t[e]!==void 0).map(e=>YS(e,t[e])).join("&")}const XS=/^\w{2,}:([/\\]{1,2})/,ZS=/^\w{2,}:([/\\]{2})?/,eR=/^([/\\]\s*){2,}[^/\\]/;function yl(t,e={}){return typeof e=="boolean"&&(e={acceptRelative:e}),e.strict?XS.test(t):ZS.test(t)||(e.acceptRelative?eR.test(t):!1)}const tR=/\/$|\/\?/;function yh(t="",e=!1){return e?tR.test(t):t.endsWith("/")}function zv(t="",e=!1){if(!e)return(yh(t)?t.slice(0,-1):t)||"/";if(!yh(t,!0))return t||"/";const[n,...s]=t.split("?");return(n.slice(0,-1)||"/")+(s.length>0?`?${s.join("?")}`:"")}function nR(t="",e=!1){if(!e)return t.endsWith("/")?t:t+"/";if(yh(t,!0))return t||"/";const[n,...s]=t.split("?");return n+"/"+(s.length>0?`?${s.join("?")}`:"")}function sR(t=""){return t.startsWith("/")}function rR(t=""){return(sR(t)?t.slice(1):t)||"/"}function iR(t,e){if(Gv(e)||yl(t))return t;const n=zv(e);return t.startsWith(n)?t:_l(n,t)}function Kg(t,e){if(Gv(e))return t;const n=zv(e);if(!t.startsWith(n))return t;const s=t.slice(n.length);return s[0]==="/"?s:"/"+s}function oR(t,e){const n=ld(t),s={...QS(n.search),...e};return n.search=JS(s),cR(n)}function Gv(t){return!t||t==="/"}function aR(t){return t&&t!=="/"}function _l(t,...e){let n=t||"";for(const s of e.filter(r=>aR(r)))n=n?nR(n)+rR(s):s;return n}function ld(t="",e){if(!yl(t,{acceptRelative:!0}))return e?ld(e+t):qg(t);const[n="",s,r=""]=(t.replace(/\\/g,"/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/)||[]).splice(1),[i="",o=""]=(r.match(/([^#/?]*)(.*)?/)||[]).splice(1),{pathname:a,search:c,hash:l}=qg(o.replace(/\/(?=[A-Za-z]:)/,""));return{protocol:n,auth:s?s.slice(0,Math.max(0,s.length-1)):"",host:i,pathname:a,search:c,hash:l}}function qg(t=""){const[e="",n="",s=""]=(t.match(/([^#?]*)(\?[^#]*)?(#.*)?/)||[]).splice(1);return{pathname:e,search:n,hash:s}}function cR(t){const e=t.pathname+(t.search?(t.search.startsWith("?")?"":"?")+t.search:"")+t.hash;return t.protocol?t.protocol+"//"+(t.auth?t.auth+"@":"")+t.host+e:e}class lR extends Error{constructor(){super(...arguments),this.name="FetchError"}}function uR(t,e,n){let s="";e&&(s=e.message),t&&n?s=`${s} (${n.status} ${n.statusText} (${t.toString()}))`:t&&(s=`${s} (${t.toString()})`);const r=new lR(s);return Object.defineProperty(r,"request",{get(){return t}}),Object.defineProperty(r,"response",{get(){return n}}),Object.defineProperty(r,"data",{get(){return n&&n._data}}),Object.defineProperty(r,"status",{get(){return n&&n.status}}),Object.defineProperty(r,"statusText",{get(){return n&&n.statusText}}),Object.defineProperty(r,"statusCode",{get(){return n&&n.status}}),Object.defineProperty(r,"statusMessage",{get(){return n&&n.statusText}}),r}const hR=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));function zg(t="GET"){return hR.has(t.toUpperCase())}function fR(t){if(t===void 0)return!1;const e=typeof t;return e==="string"||e==="number"||e==="boolean"||e===null?!0:e!=="object"?!1:Array.isArray(t)?!0:t.constructor&&t.constructor.name==="Object"||typeof t.toJSON=="function"}const dR=new Set(["image/svg","application/xml","application/xhtml","application/html"]),pR=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function gR(t=""){if(!t)return"json";const e=t.split(";").shift()||"";return pR.test(e)?"json":dR.has(e)||e.startsWith("text/")?"text":"blob"}function mR(t,e,n=globalThis.Headers){const s={...e,...t};if(e!=null&&e.params&&(t!=null&&t.params)&&(s.params={...e==null?void 0:e.params,...t==null?void 0:t.params}),e!=null&&e.query&&(t!=null&&t.query)&&(s.query={...e==null?void 0:e.query,...t==null?void 0:t.query}),e!=null&&e.headers&&(t!=null&&t.headers)){s.headers=new n((e==null?void 0:e.headers)||{});for(const[r,i]of new n((t==null?void 0:t.headers)||{}))s.headers.set(r,i)}return s}const yR=new Set([408,409,425,429,500,502,503,504]);function Qv(t){const{fetch:e,Headers:n}=t;function s(o){const a=o.error&&o.error.name==="AbortError"||!1;if(o.options.retry!==!1&&!a){let l;typeof o.options.retry=="number"?l=o.options.retry:l=zg(o.options.method)?0:1;const u=o.response&&o.response.status||500;if(l>0&&yR.has(u))return r(o.request,{...o.options,retry:l-1})}const c=uR(o.request,o.error,o.response);throw Error.captureStackTrace&&Error.captureStackTrace(c,r),c}const r=async function(a,c={}){const l={request:a,options:mR(c,t.defaults,n),response:void 0,error:void 0};l.options.onRequest&&await l.options.onRequest(l),typeof l.request=="string"&&(l.options.baseURL&&(l.request=iR(l.request,l.options.baseURL)),(l.options.query||l.options.params)&&(l.request=oR(l.request,{...l.options.params,...l.options.query})),l.options.body&&zg(l.options.method)&&fR(l.options.body)&&(l.options.body=typeof l.options.body=="string"?l.options.body:JSON.stringify(l.options.body),l.options.headers=new n(l.options.headers||{}),l.options.headers.has("content-type")||l.options.headers.set("content-type","application/json"),l.options.headers.has("accept")||l.options.headers.set("accept","application/json")));try{l.response=await e(l.request,l.options)}catch(h){return l.error=h,l.options.onRequestError&&await l.options.onRequestError(l),await s(l)}const u=(l.options.parseResponse?"json":l.options.responseType)||gR(l.response.headers.get("content-type")||"");if(u==="json"){const h=await l.response.text(),f=l.options.parseResponse||$S;l.response._data=f(h)}else u==="stream"?l.response._data=l.response.body:l.response._data=await l.response[u]();return l.options.onResponse&&await l.options.onResponse(l),!l.options.ignoreResponseError&&l.response.status>=400&&l.response.status<600?(l.options.onResponseError&&await l.options.onResponseError(l),await s(l)):l.response},i=async function(a,c){return(await r(a,c))._data};return i.raw=r,i.native=e,i.create=(o={})=>Qv({...t,defaults:{...t.defaults,...o}}),i}const Yv=function(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}(),_R=Yv.fetch||(()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),vR=Yv.Headers,wR=Qv({fetch:_R,Headers:vR}),ER=wR,TR=()=>{var t;return((t=window==null?void 0:window.__NUXT__)==null?void 0:t.config)||{}},vc=TR().app,IR=()=>vc.baseURL,CR=()=>vc.buildAssetsDir,bR=(...t)=>_l(Jv(),CR(),...t),Jv=(...t)=>{const e=vc.cdnURL||vc.baseURL;return t.length?_l(e,...t):e};globalThis.__buildAssetsURL=bR,globalThis.__publicAssetsURL=Jv;function _h(t,e={},n){for(const s in t){const r=t[s],i=n?`${n}:${s}`:s;typeof r=="object"&&r!==null?_h(r,e,i):typeof r=="function"&&(e[i]=r)}return e}const SR={run:t=>t()},RR=()=>SR,Xv=typeof console.createTask<"u"?console.createTask:RR;function kR(t,e){const n=e.shift(),s=Xv(n);return t.reduce((r,i)=>r.then(()=>s.run(()=>i(...e))),Promise.resolve())}function AR(t,e){const n=e.shift(),s=Xv(n);return Promise.all(t.map(r=>s.run(()=>r(...e))))}function Eu(t,e){for(const n of[...t])n(e)}class NR{constructor(){this._hooks={},this._before=void 0,this._after=void 0,this._deprecatedMessages=void 0,this._deprecatedHooks={},this.hook=this.hook.bind(this),this.callHook=this.callHook.bind(this),this.callHookWith=this.callHookWith.bind(this)}hook(e,n,s={}){if(!e||typeof n!="function")return()=>{};const r=e;let i;for(;this._deprecatedHooks[e];)i=this._deprecatedHooks[e],e=i.to;if(i&&!s.allowDeprecated){let o=i.message;o||(o=`${r} hook has been deprecated`+(i.to?`, please use ${i.to}`:"")),this._deprecatedMessages||(this._deprecatedMessages=new Set),this._deprecatedMessages.has(o)||(console.warn(o),this._deprecatedMessages.add(o))}if(!n.name)try{Object.defineProperty(n,"name",{get:()=>"_"+e.replace(/\W+/g,"_")+"_hook_cb",configurable:!0})}catch{}return this._hooks[e]=this._hooks[e]||[],this._hooks[e].push(n),()=>{n&&(this.removeHook(e,n),n=void 0)}}hookOnce(e,n){let s,r=(...i)=>(typeof s=="function"&&s(),s=void 0,r=void 0,n(...i));return s=this.hook(e,r),s}removeHook(e,n){if(this._hooks[e]){const s=this._hooks[e].indexOf(n);s!==-1&&this._hooks[e].splice(s,1),this._hooks[e].length===0&&delete this._hooks[e]}}deprecateHook(e,n){this._deprecatedHooks[e]=typeof n=="string"?{to:n}:n;const s=this._hooks[e]||[];delete this._hooks[e];for(const r of s)this.hook(e,r)}deprecateHooks(e){Object.assign(this._deprecatedHooks,e);for(const n in e)this.deprecateHook(n,e[n])}addHooks(e){const n=_h(e),s=Object.keys(n).map(r=>this.hook(r,n[r]));return()=>{for(const r of s.splice(0,s.length))r()}}removeHooks(e){const n=_h(e);for(const s in n)this.removeHook(s,n[s])}removeAllHooks(){for(const e in this._hooks)delete this._hooks[e]}callHook(e,...n){return n.unshift(e),this.callHookWith(kR,e,...n)}callHookParallel(e,...n){return n.unshift(e),this.callHookWith(AR,e,...n)}callHookWith(e,n,...s){const r=this._before||this._after?{name:n,args:s,context:{}}:void 0;this._before&&Eu(this._before,r);const i=e(n in this._hooks?[...this._hooks[n]]:[],s);return i instanceof Promise?i.finally(()=>{this._after&&r&&Eu(this._after,r)}):(this._after&&r&&Eu(this._after,r),i)}beforeEach(e){return this._before=this._before||[],this._before.push(e),()=>{if(this._before!==void 0){const n=this._before.indexOf(e);n!==-1&&this._before.splice(n,1)}}}afterEach(e){return this._after=this._after||[],this._after.push(e),()=>{if(this._after!==void 0){const n=this._after.indexOf(e);n!==-1&&this._after.splice(n,1)}}}}function Zv(){return new NR}function OR(t={}){let e,n=!1;const s=o=>{if(e&&e!==o)throw new Error("Context conflict")};let r;if(t.asyncContext){const o=t.AsyncLocalStorage||globalThis.AsyncLocalStorage;o?r=new o:console.warn("[unctx] `AsyncLocalStorage` is not provided.")}const i=()=>{if(r&&e===void 0){const o=r.getStore();if(o!==void 0)return o}return e};return{use:()=>{const o=i();if(o===void 0)throw new Error("Context is not available");return o},tryUse:()=>i(),set:(o,a)=>{a||s(o),e=o,n=!0},unset:()=>{e=void 0,n=!1},call:(o,a)=>{s(o),e=o;try{return r?r.run(o,a):a()}finally{n||(e=void 0)}},async callAsync(o,a){e=o;const c=()=>{e=o},l=()=>e===o?c:void 0;vh.add(l);try{const u=r?r.run(o,a):a();return n||(e=void 0),await u}finally{vh.delete(l)}}}}function PR(t={}){const e={};return{get(n,s={}){return e[n]||(e[n]=OR({...t,...s})),e[n],e[n]}}}const wc=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof global<"u"?global:typeof window<"u"?window:{},Gg="__unctx__",DR=wc[Gg]||(wc[Gg]=PR()),xR=(t,e={})=>DR.get(t,e),Qg="__unctx_async_handlers__",vh=wc[Qg]||(wc[Qg]=new Set);function Co(t){const e=[];for(const r of vh){const i=r();i&&e.push(i)}const n=()=>{for(const r of e)r()};let s=t();return s&&typeof s=="object"&&"catch"in s&&(s=s.catch(r=>{throw n(),r})),[s,n]}const ew=xR("nuxt-app"),MR="__nuxt_plugin";function LR(t){let e=0;const n={provide:void 0,globalName:"nuxt",versions:{get nuxt(){return"3.5.3"},get vue(){return n.vueApp.version}},payload:Kt({data:{},state:{},_errors:{},...window.__NUXT__??{}}),static:{data:{}},runWithContext:r=>VR(n,r),isHydrating:!0,deferHydration(){if(!n.isHydrating)return()=>{};e++;let r=!1;return()=>{if(!r&&(r=!0,e--,e===0))return n.isHydrating=!1,n.callHook("app:suspense:resolve")}},_asyncDataPromises:{},_asyncData:{},_payloadRevivers:{},...t};n.hooks=Zv(),n.hook=n.hooks.hook,n.callHook=n.hooks.callHook,n.provide=(r,i)=>{const o="$"+r;xa(n,o,i),xa(n.vueApp.config.globalProperties,o,i)},xa(n.vueApp,"$nuxt",n),xa(n.vueApp.config.globalProperties,"$nuxt",n);{window.addEventListener("nuxt.preloadError",i=>{n.callHook("app:chunkError",{error:i.payload})});const r=n.hook("app:error",(...i)=>{console.error("[nuxt] error caught during app initialization",...i)});n.hook("app:mounted",r)}const s=Kt(n.payload.config);return n.provide("config",s),n}async function FR(t,e){if(typeof e!="function")return;const{provide:n}=await t.runWithContext(()=>e(t))||{};if(n&&typeof n=="object")for(const s in n)t.provide(s,n[s])}async function UR(t,e){var r;const n=[],s=[];for(const i of e){const o=FR(t,i);(r=i.meta)!=null&&r.parallel?n.push(o.catch(a=>s.push(a))):await o}if(await Promise.all(n),s.length)throw s[0]}function $R(t){const e=[];for(const n of t){if(typeof n!="function")continue;let s=n;n.length>1&&(s=r=>n(r,r.provide)),e.push(s)}return e.sort((n,s)=>{var r,i;return(((r=n.meta)==null?void 0:r.order)||Ec.default)-(((i=s.meta)==null?void 0:i.order)||Ec.default)}),e}const Ec={pre:-20,default:0,post:20};function zt(t,e){var s;if(typeof t=="function")return zt({setup:t},e);const n=r=>{if(t.hooks&&r.hooks.addHooks(t.hooks),t.setup)return t.setup(r)};return n.meta={name:(e==null?void 0:e.name)||t.name||((s=t.setup)==null?void 0:s.name),parallel:t.parallel,order:(e==null?void 0:e.order)||t.order||Ec[t.enforce||"default"]||Ec.default},n[MR]=!0,n}function VR(t,e,n){const s=()=>n?e(...n):e();return ew.set(t),t.vueApp.runWithContext(s)}function nt(){var e;let t;if(rd()&&(t=(e=Qo())==null?void 0:e.appContext.app.$nuxt),t=t||ew.tryUse(),!t)throw new Error("[nuxt] instance unavailable");return t}function tw(){return nt().$config}function xa(t,e,n){Object.defineProperty(t,e,{get:()=>n})}const BR=!1;/*!
  * pinia v2.1.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */let nw;const Yo=t=>nw=t,sw=Symbol();function wh(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var no;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(no||(no={}));function HR(){const t=$f(!0),e=t.run(()=>kt({}));let n=[],s=[];const r=ul({install(i){Yo(r),r._a=i,i.provide(sw,r),i.config.globalProperties.$pinia=r,s.forEach(o=>n.push(o)),s=[]},use(i){return!this._a&&!BR?s.push(i):n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return r}const rw=()=>{};function Yg(t,e,n,s=rw){t.push(e);const r=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),s())};return!n&&Vf()&&V_(r),r}function Tr(t,...e){t.slice().forEach(n=>{n(...e)})}const jR=t=>t();function Eh(t,e){t instanceof Map&&e instanceof Map&&e.forEach((n,s)=>t.set(s,n)),t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const s=e[n],r=t[n];wh(r)&&wh(s)&&t.hasOwnProperty(n)&&!Le(s)&&!qn(s)?t[n]=Eh(r,s):t[n]=s}return t}const WR=Symbol();function KR(t){return!wh(t)||!t.hasOwnProperty(WR)}const{assign:us}=Object;function qR(t){return!!(Le(t)&&t.effect)}function zR(t,e,n,s){const{state:r,actions:i,getters:o}=e,a=n.state.value[t];let c;function l(){a||(n.state.value[t]=r?r():{});const u=JC(n.state.value[t]);return us(u,i,Object.keys(o||{}).reduce((h,f)=>(h[f]=ul(yt(()=>{Yo(n);const d=n._s.get(t);return o[f].call(d,d)})),h),{}))}return c=iw(t,l,e,n,s,!0),c}function iw(t,e,n={},s,r,i){let o;const a=us({actions:{}},n),c={deep:!0};let l,u,h=[],f=[],d;const p=s.state.value[t];!i&&!p&&(s.state.value[t]={}),kt({});let y;function E(C){let A;l=u=!1,typeof C=="function"?(C(s.state.value[t]),A={type:no.patchFunction,storeId:t,events:d}):(Eh(s.state.value[t],C),A={type:no.patchObject,payload:C,storeId:t,events:d});const H=y=Symbol();ur().then(()=>{y===H&&(l=!0)}),u=!0,Tr(h,A,s.state.value[t])}const v=i?function(){const{state:A}=n,H=A?A():{};this.$patch(Y=>{us(Y,H)})}:rw;function g(){o.stop(),h=[],f=[],s._s.delete(t)}function T(C,A){return function(){Yo(s);const H=Array.from(arguments),Y=[],B=[];function te(ne){Y.push(ne)}function K(ne){B.push(ne)}Tr(f,{args:H,name:C,store:b,after:te,onError:K});let Ne;try{Ne=A.apply(this&&this.$id===t?this:b,H)}catch(ne){throw Tr(B,ne),ne}return Ne instanceof Promise?Ne.then(ne=>(Tr(Y,ne),ne)).catch(ne=>(Tr(B,ne),Promise.reject(ne))):(Tr(Y,Ne),Ne)}}const w={_p:s,$id:t,$onAction:Yg.bind(null,f),$patch:E,$reset:v,$subscribe(C,A={}){const H=Yg(h,C,A.detached,()=>Y()),Y=o.run(()=>Gs(()=>s.state.value[t],B=>{(A.flush==="sync"?u:l)&&C({storeId:t,type:no.direct,events:d},B)},us({},c,A)));return H},$dispose:g},b=Kt(w);s._s.set(t,b);const D=s._a&&s._a.runWithContext||jR,O=s._e.run(()=>(o=$f(),D(()=>o.run(e))));for(const C in O){const A=O[C];if(Le(A)&&!qR(A)||qn(A))i||(p&&KR(A)&&(Le(A)?A.value=p[C]:Eh(A,p[C])),s.state.value[t][C]=A);else if(typeof A=="function"){const H=T(C,A);O[C]=H,a.actions[C]=A}}return us(b,O),us(de(b),O),Object.defineProperty(b,"$state",{get:()=>s.state.value[t],set:C=>{E(A=>{us(A,C)})}}),s._p.forEach(C=>{us(b,o.run(()=>C({store:b,app:s._a,pinia:s,options:a})))}),p&&i&&n.hydrate&&n.hydrate(b.$state,p),l=!0,u=!0,b}function VV(t,e,n){let s,r;const i=typeof e=="function";typeof t=="string"?(s=t,r=i?n:e):(r=t,s=t.id);function o(a,c){const l=rd();return a=a||(l?At(sw,null):null),a&&Yo(a),a=nw,a._s.has(s)||(i?iw(s,e,r,a):zR(s,r,a)),a._s.get(s)}return o.$id=s,o}function BV(t){{t=de(t);const e={};for(const n in t){const s=t[n];(Le(s)||qn(s))&&(e[n]=Gf(t,n))}return e}}function GR(t){return Array.isArray(t)?t:[t]}const ow=["title","script","style","noscript"],aw=["base","meta","link","style","script","noscript"],QR=["title","titleTemplate","templateParams","base","htmlAttrs","bodyAttrs","meta","link","style","script","noscript"],YR=["base","title","titleTemplate","bodyAttrs","htmlAttrs","templateParams"],JR=["tagPosition","tagPriority","tagDuplicateStrategy","innerHTML","textContent"];function cw(t){let e=9;for(let n=0;n<t.length;)e=Math.imul(e^t.charCodeAt(n++),9**9);return((e^e>>>9)+65536).toString(16).substring(1,8).toLowerCase()}function Th(t){return cw(`${t.tag}:${t.textContent||t.innerHTML||""}:${Object.entries(t.props).map(([e,n])=>`${e}:${String(n)}`).join(",")}`)}function XR(t){let e=9;for(const n of t)for(let s=0;s<n.length;)e=Math.imul(e^n.charCodeAt(s++),9**9);return((e^e>>>9)+65536).toString(16).substring(1,8).toLowerCase()}function lw(t,e){const{props:n,tag:s}=t;if(YR.includes(s))return s;if(s==="link"&&n.rel==="canonical")return"canonical";if(n.charset)return"charset";const r=["id"];s==="meta"&&r.push("name","property","http-equiv");for(const i of r)if(typeof n[i]<"u"){const o=String(n[i]);return e&&!e(o)?!1:`${s}:${i}:${o}`}return!1}function Jg(t,e){return t==null?e||null:typeof t=="function"?t(e):t}function Ma(t,e=!1,n){const{tag:s,$el:r}=t;r&&(Object.entries(s.props).forEach(([i,o])=>{o=String(o);const a=`attr:${i}`;if(i==="class"){if(!o)return;for(const c of o.split(" ")){const l=`${a}:${c}`;n&&n(t,l,()=>r.classList.remove(c)),r.classList.contains(c)||r.classList.add(c)}return}n&&!i.startsWith("data-h-")&&n(t,a,()=>r.removeAttribute(i)),(e||r.getAttribute(i)!==o)&&r.setAttribute(i,o)}),ow.includes(s.tag)&&(s.textContent&&s.textContent!==r.textContent?r.textContent=s.textContent:s.innerHTML&&s.innerHTML!==r.innerHTML&&(r.innerHTML=s.innerHTML)))}let Mi=!1;async function ZR(t,e={}){var f,d;const n={shouldRender:!0};if(await t.hooks.callHook("dom:beforeRender",n),!n.shouldRender)return;const s=e.document||t.resolvedOptions.document||window.document,r=(await t.resolveTags()).map(a);if(t.resolvedOptions.experimentalHashHydration&&(Mi=Mi||t._hash||!1,Mi)){const p=XR(r.map(y=>y.tag._h));if(Mi===p)return;Mi=p}const i=t._popSideEffectQueue();t.headEntries().map(p=>p._sde).forEach(p=>{Object.entries(p).forEach(([y,E])=>{i[y]=E})});const o=(p,y,E)=>{y=`${p.renderId}:${y}`,p.entry&&(p.entry._sde[y]=E),delete i[y]};function a(p){const y=t.headEntries().find(v=>v._i===p._e),E={renderId:p._d||Th(p),$el:null,shouldRender:!0,tag:p,entry:y,markSideEffect:(v,g)=>o(E,v,g)};return E}const c=[],l={body:[],head:[]},u=p=>{t._elMap[p.renderId]=p.$el,c.push(p),o(p,"el",()=>{var y;(y=p.$el)==null||y.remove(),delete t._elMap[p.renderId]})};for(const p of r){if(await t.hooks.callHook("dom:beforeRenderTag",p),!p.shouldRender)continue;const{tag:y}=p;if(y.tag==="title"){s.title=y.textContent||"",c.push(p);continue}if(y.tag==="htmlAttrs"||y.tag==="bodyAttrs"){p.$el=s[y.tag==="htmlAttrs"?"documentElement":"body"],Ma(p,!1,o),c.push(p);continue}if(p.$el=t._elMap[p.renderId],!p.$el&&y.key&&(p.$el=s.querySelector(`${(f=y.tagPosition)!=null&&f.startsWith("body")?"body":"head"} > ${y.tag}[data-h-${y._h}]`)),p.$el){p.tag._d&&Ma(p),u(p);continue}l[(d=y.tagPosition)!=null&&d.startsWith("body")?"body":"head"].push(p)}const h={bodyClose:void 0,bodyOpen:void 0,head:void 0};Object.entries(l).forEach(([p,y])=>{var v;if(!y.length)return;const E=(v=s==null?void 0:s[p])==null?void 0:v.children;if(E){for(const g of[...E].reverse()){const T=g.tagName.toLowerCase();if(!aw.includes(T))continue;const w=g.getAttributeNames().reduce((C,A)=>({...C,[A]:g.getAttribute(A)}),{}),b={tag:T,props:w};g.innerHTML&&(b.innerHTML=g.innerHTML);const D=Th(b);let O=y.findIndex(C=>(C==null?void 0:C.renderId)===D);if(O===-1){const C=lw(b);O=y.findIndex(A=>(A==null?void 0:A.tag._d)&&A.tag._d===C)}if(O!==-1){const C=y[O];C.$el=g,Ma(C),u(C),delete y[O]}}y.forEach(g=>{const T=g.tag.tagPosition||"head";h[T]=h[T]||s.createDocumentFragment(),g.$el||(g.$el=s.createElement(g.tag.tag),Ma(g,!0)),h[T].appendChild(g.$el),u(g)})}}),h.head&&s.head.appendChild(h.head),h.bodyOpen&&s.body.insertBefore(h.bodyOpen,s.body.firstChild),h.bodyClose&&s.body.appendChild(h.bodyClose);for(const p of c)await t.hooks.callHook("dom:renderTag",p);Object.values(i).forEach(p=>p())}let Tu=null;async function ek(t,e={}){function n(){return Tu=null,ZR(t,e)}const s=e.delayFn||(r=>setTimeout(r,10));return Tu=Tu||new Promise(r=>s(()=>r(n())))}function tk(t){return{hooks:{"entries:updated":function(e){if(typeof(t==null?void 0:t.document)>"u"&&typeof window>"u")return;let n=t==null?void 0:t.delayFn;!n&&typeof requestAnimationFrame<"u"&&(n=requestAnimationFrame),ek(e,{document:(t==null?void 0:t.document)||window.document,delayFn:n})}}}}function nk(t){var e;return((e=t==null?void 0:t.head.querySelector('meta[name="unhead:ssr"]'))==null?void 0:e.getAttribute("content"))||!1}const Xg={critical:2,high:9,low:12,base:-1,title:1,meta:10};function Zg(t){if(typeof t.tagPriority=="number")return t.tagPriority;if(t.tag==="meta"){if(t.props.charset)return-2;if(t.props["http-equiv"]==="content-security-policy")return 0}const e=t.tagPriority||t.tag;return e in Xg?Xg[e]:10}const sk=[{prefix:"before:",offset:-1},{prefix:"after:",offset:1}];function rk(){return{hooks:{"tags:resolve":t=>{const e=n=>{var s;return(s=t.tags.find(r=>r._d===n))==null?void 0:s._p};for(const{prefix:n,offset:s}of sk)for(const r of t.tags.filter(i=>typeof i.tagPriority=="string"&&i.tagPriority.startsWith(n))){const i=e(r.tagPriority.replace(n,""));typeof i<"u"&&(r._p=i+s)}t.tags.sort((n,s)=>n._p-s._p).sort((n,s)=>Zg(n)-Zg(s))}}}}function ik(){return{hooks:{"tags:resolve":t=>{const{tags:e}=t;let n=e.findIndex(r=>r.tag==="titleTemplate");const s=e.findIndex(r=>r.tag==="title");if(s!==-1&&n!==-1){const r=Jg(e[n].textContent,e[s].textContent);r!==null?e[s].textContent=r||e[s].textContent:delete e[s]}else if(n!==-1){const r=Jg(e[n].textContent);r!==null&&(e[n].textContent=r,e[n].tag="title",n=-1)}n!==-1&&delete e[n],t.tags=e.filter(Boolean)}}}}function ok(){return{hooks:{"tag:normalise":function({tag:t}){typeof t.props.body<"u"&&(t.tagPosition="bodyClose",delete t.props.body)}}}}const ak=["link","style","script","noscript"];function ck(){return{hooks:{"tag:normalise":({tag:t,resolvedOptions:e})=>{e.experimentalHashHydration===!0&&(t._h=Th(t)),t.key&&ak.includes(t.tag)&&(t._h=cw(t.key),t.props[`data-h-${t._h}`]="")}}}}const em=["script","link","bodyAttrs"];function lk(){const t=(e,n)=>{const s={},r={};Object.entries(n.props).forEach(([o,a])=>{o.startsWith("on")&&typeof a=="function"?r[o]=a:s[o]=a});let i;return e==="dom"&&n.tag==="script"&&typeof s.src=="string"&&typeof r.onload<"u"&&(i=s.src,delete s.src),{props:s,eventHandlers:r,delayedSrc:i}};return{hooks:{"ssr:render":function(e){e.tags=e.tags.map(n=>(!em.includes(n.tag)||!Object.entries(n.props).find(([s,r])=>s.startsWith("on")&&typeof r=="function")||(n.props=t("ssr",n).props),n))},"dom:beforeRenderTag":function(e){if(!em.includes(e.tag.tag)||!Object.entries(e.tag.props).find(([i,o])=>i.startsWith("on")&&typeof o=="function"))return;const{props:n,eventHandlers:s,delayedSrc:r}=t("dom",e.tag);Object.keys(s).length&&(e.tag.props=n,e.tag._eventHandlers=s,e.tag._delayedSrc=r)},"dom:renderTag":function(e){const n=e.$el;if(!e.tag._eventHandlers||!n)return;const s=e.tag.tag==="bodyAttrs"&&typeof window<"u"?window:n;Object.entries(e.tag._eventHandlers).forEach(([r,i])=>{const o=`${e.tag._d||e.tag._p}:${r}`,a=r.slice(2).toLowerCase(),c=`data-h-${a}`;if(e.markSideEffect(o,()=>{}),n.hasAttribute(c))return;const l=i;n.setAttribute(c,""),s.addEventListener(a,l),e.entry&&(e.entry._sde[o]=()=>{s.removeEventListener(a,l),n.removeAttribute(c)})}),e.tag._delayedSrc&&n.setAttribute("src",e.tag._delayedSrc)}}}}const uk=["templateParams","htmlAttrs","bodyAttrs"];function hk(){return{hooks:{"tag:normalise":function({tag:t}){["hid","vmid","key"].forEach(s=>{t.props[s]&&(t.key=t.props[s],delete t.props[s])});const n=lw(t)||(t.key?`${t.tag}:${t.key}`:!1);n&&(t._d=n)},"tags:resolve":function(t){const e={};t.tags.forEach(s=>{const r=(s.key?`${s.tag}:${s.key}`:s._d)||s._p,i=e[r];if(i){let a=s==null?void 0:s.tagDuplicateStrategy;if(!a&&uk.includes(s.tag)&&(a="merge"),a==="merge"){const c=i.props;["class","style"].forEach(l=>{s.props[l]&&c[l]&&(l==="style"&&!c[l].endsWith(";")&&(c[l]+=";"),s.props[l]=`${c[l]} ${s.props[l]}`)}),e[r].props={...c,...s.props};return}else if(s._e===i._e){i._duped=i._duped||[],s._d=`${i._d}:${i._duped.length+1}`,i._duped.push(s);return}}const o=Object.keys(s.props).length+(s.innerHTML?1:0)+(s.textContent?1:0);if(aw.includes(s.tag)&&o===0){delete e[r];return}e[r]=s});const n=[];Object.values(e).forEach(s=>{const r=s._duped;delete s._duped,n.push(s),r&&n.push(...r)}),t.tags=n}}}}function La(t,e){function n(i){if(["s","pageTitle"].includes(i))return e.pageTitle;let o;return i.includes(".")?o=i.split(".").reduce((a,c)=>a&&a[c]||void 0,e):o=e[i],typeof o<"u"?o||"":!1}let s=t;try{s=decodeURI(t)}catch{}return(s.match(/%(\w+\.+\w+)|%(\w+)/g)||[]).sort().reverse().forEach(i=>{const o=n(i.slice(1));typeof o=="string"&&(t=t.replace(new RegExp(`\\${i}(\\W|$)`,"g"),`${o}$1`).trim())}),e.separator&&(t.endsWith(e.separator)&&(t=t.slice(0,-e.separator.length).trim()),t.startsWith(e.separator)&&(t=t.slice(e.separator.length).trim()),t=t.replace(new RegExp(`\\${e.separator}\\s*\\${e.separator}`,"g"),e.separator)),t}function fk(){return{hooks:{"tags:resolve":t=>{var i;const{tags:e}=t,n=(i=e.find(o=>o.tag==="title"))==null?void 0:i.textContent,s=e.findIndex(o=>o.tag==="templateParams"),r=s!==-1?e[s].props:{};r.pageTitle=r.pageTitle||n||"";for(const o of e)if(["titleTemplate","title"].includes(o.tag)&&typeof o.textContent=="string")o.textContent=La(o.textContent,r);else if(o.tag==="meta"&&typeof o.props.content=="string")o.props.content=La(o.props.content,r);else if(o.tag==="link"&&typeof o.props.href=="string")o.props.href=La(o.props.href,r);else if(o.tag==="script"&&["application/json","application/ld+json"].includes(o.props.type)&&typeof o.innerHTML=="string")try{o.innerHTML=JSON.stringify(JSON.parse(o.innerHTML),(a,c)=>typeof c=="string"?La(c,r):c)}catch{}t.tags=e.filter(o=>o.tag!=="templateParams")}}}}const dk=typeof window<"u";async function pk(t,e){const n={tag:t,props:{}};return t==="templateParams"?(n.props=e,n):["title","titleTemplate"].includes(t)?(n.textContent=e instanceof Promise?await e:e,n):typeof e=="string"?["script","noscript","style"].includes(t)?(t==="script"&&(/^(https?:)?\/\//.test(e)||e.startsWith("/"))?n.props.src=e:n.innerHTML=e,n):!1:(n.props=await mk(t,{...e}),n.props.children&&(n.props.innerHTML=n.props.children),delete n.props.children,Object.keys(n.props).filter(s=>JR.includes(s)).forEach(s=>{(!["innerHTML","textContent"].includes(s)||ow.includes(n.tag))&&(n[s]=n.props[s]),delete n.props[s]}),["innerHTML","textContent"].forEach(s=>{if(n.tag==="script"&&typeof n[s]=="string"&&["application/ld+json","application/json"].includes(n.props.type))try{n[s]=JSON.parse(n[s])}catch{n[s]=""}typeof n[s]=="object"&&(n[s]=JSON.stringify(n[s]))}),n.props.class&&(n.props.class=gk(n.props.class)),n.props.content&&Array.isArray(n.props.content)?n.props.content.map(s=>({...n,props:{...n.props,content:s}})):n)}function gk(t){return typeof t=="object"&&!Array.isArray(t)&&(t=Object.keys(t).filter(e=>t[e])),(Array.isArray(t)?t.join(" "):t).split(" ").filter(e=>e.trim()).filter(Boolean).join(" ")}async function mk(t,e){for(const n of Object.keys(e)){const s=n.startsWith("data-");e[n]instanceof Promise&&(e[n]=await e[n]),String(e[n])==="true"?e[n]=s?"true":"":String(e[n])==="false"&&(s?e[n]="false":delete e[n])}return e}const yk=10;async function _k(t){const e=[];return Object.entries(t.resolvedInput).filter(([n,s])=>typeof s<"u"&&QR.includes(n)).forEach(([n,s])=>{const r=GR(s);e.push(...r.map(i=>pk(n,i)).flat())}),(await Promise.all(e)).flat().filter(Boolean).map((n,s)=>(n._e=t._i,n._p=(t._i<<yk)+s,n))}function vk(){return[hk(),rk(),fk(),ik(),ck(),lk(),ok()]}function wk(t={}){return[tk({document:t==null?void 0:t.document,delayFn:t==null?void 0:t.domDelayFn})]}function Ek(t={}){const e=Tk({...t,plugins:[...wk(t),...(t==null?void 0:t.plugins)||[]]});return t.experimentalHashHydration&&e.resolvedOptions.document&&(e._hash=nk(e.resolvedOptions.document)),e}function Tk(t={}){let e=[],n={},s=0;const r=Zv();t!=null&&t.hooks&&r.addHooks(t.hooks),t.plugins=[...vk(),...(t==null?void 0:t.plugins)||[]],t.plugins.forEach(a=>a.hooks&&r.addHooks(a.hooks)),t.document=t.document||(dk?document:void 0);const i=()=>r.callHook("entries:updated",o),o={resolvedOptions:t,headEntries(){return e},get hooks(){return r},use(a){a.hooks&&r.addHooks(a.hooks)},push(a,c){const l={_i:s++,input:a,_sde:{}};return c!=null&&c.mode&&(l._m=c==null?void 0:c.mode),c!=null&&c.transform&&(l._t=c==null?void 0:c.transform),e.push(l),i(),{dispose(){e=e.filter(u=>u._i!==l._i?!0:(n={...n,...u._sde||{}},u._sde={},i(),!1))},patch(u){e=e.map(h=>(h._i===l._i&&(l.input=h.input=u,i()),h))}}},async resolveTags(){const a={tags:[],entries:[...e]};await r.callHook("entries:resolve",a);for(const c of a.entries){const l=c._t||(u=>u);if(c.resolvedInput=l(c.resolvedInput||c.input),c.resolvedInput)for(const u of await _k(c)){const h={tag:u,entry:c,resolvedOptions:o.resolvedOptions};await r.callHook("tag:normalise",h),a.tags.push(h.tag)}}return await r.callHook("tags:resolve",a),a.tags},_popSideEffectQueue(){const a={...n};return n={},a},_elMap:{}};return o.hooks.callHook("init",o),o}function Ik(t){return typeof t=="function"?t():Re(t)}function Ih(t,e=""){if(t instanceof Promise)return t;const n=Ik(t);return!t||!n?n:Array.isArray(n)?n.map(s=>Ih(s,e)):typeof n=="object"?Object.fromEntries(Object.entries(n).map(([s,r])=>s==="titleTemplate"||s.startsWith("on")?[s,Re(r)]:[s,Ih(r,s)])):n}const Ck=Bv.startsWith("3"),bk="usehead";function Sk(t){return{install(n){Ck&&(n.config.globalProperties.$unhead=t,n.config.globalProperties.$head=t,n.provide(bk,t))}}.install}function Rk(t={}){const e=Ek({...t,domDelayFn:n=>setTimeout(()=>ur(()=>n()),10),plugins:[kk(),...(t==null?void 0:t.plugins)||[]]});return e.install=Sk(e),e}function kk(){return{hooks:{"entries:resolve":function(t){for(const e of t.entries)e.resolvedInput=Ih(e.input)}}}}function Iu(t){return t!==null&&typeof t=="object"}function Ch(t,e,n=".",s){if(!Iu(e))return Ch(t,{},n,s);const r=Object.assign({},e);for(const i in t){if(i==="__proto__"||i==="constructor")continue;const o=t[i];o!=null&&(s&&s(r,i,o,n)||(Array.isArray(o)&&Array.isArray(r[i])?r[i]=[...o,...r[i]]:Iu(o)&&Iu(r[i])?r[i]=Ch(o,r[i],(n?`${n}.`:"")+i.toString(),s):r[i]=o))}return r}function uw(t){return(...e)=>e.reduce((n,s)=>Ch(n,s,"",t),{})}const Ak=uw(),Nk=uw((t,e,n)=>{if(typeof t[e]<"u"&&typeof n=="function")return t[e]=n(t[e]),!0});class bh extends Error{constructor(){super(...arguments),this.statusCode=500,this.fatal=!1,this.unhandled=!1,this.statusMessage=void 0}toJSON(){const e={message:this.message,statusCode:Rh(this.statusCode,500)};return this.statusMessage&&(e.statusMessage=hw(this.statusMessage)),this.data!==void 0&&(e.data=this.data),e}}bh.__h3_error__=!0;function Sh(t){if(typeof t=="string")return new bh(t);if(Ok(t))return t;const e=new bh(t.message??t.statusMessage,t.cause?{cause:t.cause}:void 0);if("stack"in t)try{Object.defineProperty(e,"stack",{get(){return t.stack}})}catch{try{e.stack=t.stack}catch{}}if(t.data&&(e.data=t.data),t.statusCode?e.statusCode=Rh(t.statusCode,e.statusCode):t.status&&(e.statusCode=Rh(t.status,e.statusCode)),t.statusMessage?e.statusMessage=t.statusMessage:t.statusText&&(e.statusMessage=t.statusText),e.statusMessage){const n=e.statusMessage;hw(e.statusMessage)!==n&&console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future `statusMessage` will be sanitized by default.")}return t.fatal!==void 0&&(e.fatal=t.fatal),t.unhandled!==void 0&&(e.unhandled=t.unhandled),e}function Ok(t){var e;return((e=t==null?void 0:t.constructor)==null?void 0:e.__h3_error__)===!0}const Pk=/[^\u0009\u0020-\u007E]/g;function hw(t=""){return t.replace(Pk,"")}function Rh(t,e=200){return!t||(typeof t=="string"&&(t=Number.parseInt(t,10)),t<100||t>999)?e:t}function Dk(...t){const e=typeof t[t.length-1]=="string"?t.pop():void 0;typeof t[0]!="string"&&t.unshift(e);const[n,s]=t;if(!n||typeof n!="string")throw new TypeError("[nuxt] [useState] key must be a string: "+n);if(s!==void 0&&typeof s!="function")throw new Error("[nuxt] [useState] init must be a function: "+s);const r="$s"+n,i=nt(),o=Gf(i.payload.state,r);if(o.value===void 0&&s){const a=s();if(Le(a))return i.payload.state[r]=a,a;o.value=a}return o}const Jo=()=>{var t;return(t=nt())==null?void 0:t.$router},fw=()=>rd()?At("_route",nt()._route):nt()._route,dw=t=>t,xk=()=>{try{if(nt()._processingMiddleware)return!0}catch{return!0}return!1},HV=(t,e)=>{t||(t="/");const n=typeof t=="string"?t:t.path||"/",s=(e==null?void 0:e.external)||yl(n,{acceptRelative:!0});if(s&&!(e!=null&&e.external))throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");if(s&&ld(n).protocol==="script:")throw new Error("Cannot navigate to an URL with script protocol.");const r=xk();if(!s&&r)return t;const i=Jo();return s?(e!=null&&e.replace?location.replace(n):location.href=n,Promise.resolve()):e!=null&&e.replace?i.replace(t):i.push(t)},vl=()=>Gf(nt().payload,"error"),kr=t=>{const e=ud(t);try{const n=nt(),s=vl();n.hooks.callHook("app:error",e),s.value=s.value||e}catch{throw e}return e},Mk=async(t={})=>{const e=nt(),n=vl();e.callHook("app:error:cleared",t),t.redirect&&await Jo().replace(t.redirect),n.value=null},Lk=t=>!!(t&&typeof t=="object"&&"__nuxt_error"in t),ud=t=>{const e=Sh(t);return e.__nuxt_error=!0,e},Fk="modulepreload",Uk=function(t,e){return t.startsWith(".")?new URL(t,e).href:t},tm={},$k=function(e,n,s){if(!n||n.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=Uk(i,s),i in tm)return;tm[i]=!0;const o=i.endsWith(".css"),a=o?'[rel="stylesheet"]':"";if(!!s)for(let u=r.length-1;u>=0;u--){const h=r[u];if(h.href===i&&(!o||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${a}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":Fk,o||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),o)return new Promise((u,h)=>{l.addEventListener("load",u),l.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e())},Vr=(...t)=>$k(...t).catch(e=>{const n=new Event("nuxt.preloadError");throw n.payload=e,window.dispatchEvent(n),e}),Vk=-1,Bk=-2,Hk=-3,jk=-4,Wk=-5,Kk=-6;function qk(t,e){return zk(JSON.parse(t),e)}function zk(t,e){if(typeof t=="number")return r(t,!0);if(!Array.isArray(t)||t.length===0)throw new Error("Invalid input");const n=t,s=Array(n.length);function r(i,o=!1){if(i===Vk)return;if(i===Hk)return NaN;if(i===jk)return 1/0;if(i===Wk)return-1/0;if(i===Kk)return-0;if(o)throw new Error("Invalid input");if(i in s)return s[i];const a=n[i];if(!a||typeof a!="object")s[i]=a;else if(Array.isArray(a))if(typeof a[0]=="string"){const c=a[0],l=e==null?void 0:e[c];if(l)return s[i]=l(r(a[1]));switch(c){case"Date":s[i]=new Date(a[1]);break;case"Set":const u=new Set;s[i]=u;for(let d=1;d<a.length;d+=1)u.add(r(a[d]));break;case"Map":const h=new Map;s[i]=h;for(let d=1;d<a.length;d+=2)h.set(r(a[d]),r(a[d+1]));break;case"RegExp":s[i]=new RegExp(a[1],a[2]);break;case"Object":s[i]=Object(a[1]);break;case"BigInt":s[i]=BigInt(a[1]);break;case"null":const f=Object.create(null);s[i]=f;for(let d=1;d<a.length;d+=2)f[a[d]]=r(a[d+1]);break;default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(a.length);s[i]=c;for(let l=0;l<a.length;l+=1){const u=a[l];u!==Bk&&(c[l]=r(u))}}else{const c={};s[i]=c;for(const l in a){const u=a[l];c[l]=r(u)}}return s[i]}return r(0)}const Gk={meta:[{name:"viewport",content:"width=device-width, initial-scale=1"},{charset:"utf-8"}],link:[],style:[],script:[],noscript:[],title:"Competence Hub"},kh={name:"page",mode:"out-in"},Qk=!1,Yk=!1,Jk="__nuxt",Xk=!0;async function Zk(t){try{return Xk?pw(await fetch(t).then(e=>e.text())):await Vr(()=>import(t),[],import.meta.url).then(e=>e.default||e)}catch(e){console.warn("[nuxt] Cannot load payload ",t,e)}return null}let Fa=null;async function eA(){if(Fa)return Fa;const t=document.getElementById("__NUXT_DATA__");if(!t)return{};const e=pw(t.textContent||""),n=t.dataset.src?await Zk(t.dataset.src):void 0;return Fa={...e,...n,...window.__NUXT__},Fa}function pw(t){return qk(t,nt()._payloadRevivers)}function tA(t,e){nt()._payloadRevivers[t]=e}function nA(t={}){const e=t.path||window.location.pathname;let n={};try{n=JSON.parse(sessionStorage.getItem("nuxt:reload")||"{}")}catch{}if(t.force||(n==null?void 0:n.path)!==e||(n==null?void 0:n.expires)<Date.now()){try{sessionStorage.setItem("nuxt:reload",JSON.stringify({path:e,expires:Date.now()+(t.ttl??1e4)}))}catch{}if(t.persistState)try{sessionStorage.setItem("nuxt:reload:state",JSON.stringify({state:nt().payload.state}))}catch{}window.location.pathname!==e?window.location.href=e:window.location.reload()}}const sA={firebaseConfig:{apiKey:"AIzaSyCv2SZo5e62v566bJOgLRPe5erL7VCUGok",authDomain:"cygnicompetencehub.firebaseapp.com",projectId:"cygnicompetencehub",storageBucket:"cygnicompetencehub.appspot.com",messagingSenderId:"225273337132",appId:"1:225273337132:web:161ab4d7909b78531e0889",measurementId:"G-JY96C7V423"},vuefireOptions:{optionsApiPlugin:!1,auth:!0,config:{apiKey:"AIzaSyCv2SZo5e62v566bJOgLRPe5erL7VCUGok",authDomain:"cygnicompetencehub.firebaseapp.com",projectId:"cygnicompetencehub",storageBucket:"cygnicompetencehub.appspot.com",messagingSenderId:"225273337132",appId:"1:225273337132:web:161ab4d7909b78531e0889",measurementId:"G-JY96C7V423"},admin:{serviceAccount:"credentials.json"}},firebaseAdmin:{serviceAccount:"credentials.json"}},rA=Nk(sA);function gw(){const t=nt();return t._appConfig||(t._appConfig=Kt(rA)),t._appConfig}const iA=zt(t=>{const e=HR();return t.vueApp.use(e),Yo(e),t.payload&&t.payload.pinia&&(e.state.value=t.payload.pinia),{provide:{pinia:e}}}),nm={NuxtError:t=>ud(t),EmptyShallowRef:t=>Yr(t==="_"?void 0:t==="0n"?0n:JSON.parse(t)),EmptyRef:t=>kt(t==="_"?void 0:t==="0n"?0n:JSON.parse(t)),ShallowRef:t=>Yr(t),ShallowReactive:t=>J_(t),Ref:t=>kt(t),Reactive:t=>Kt(t)},oA=zt({name:"nuxt:revive-payload:client",order:-30,async setup(t){let e,n;for(const s in nm)tA(s,nm[s]);Object.assign(t.payload,([e,n]=Co(()=>t.runWithContext(eA)),e=await e,n(),e)),window.__NUXT__=t.payload}},1),aA=zt({name:"nuxt:global-components"}),cA=zt({name:"nuxt:head",setup(t){const n=Rk();n.push(Gk),t.vueApp.use(n);{let s=!0;const r=()=>{s=!1,n.hooks.callHook("entries:updated",n)};n.hooks.hook("dom:beforeRender",i=>{i.shouldRender=!s}),t.hooks.hook("page:start",()=>{s=!0}),t.hooks.hook("page:finish",r),t.hooks.hook("app:suspense:resolve",r)}}});/*!
  * vue-router v4.2.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const br=typeof window<"u";function lA(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const Ce=Object.assign;function Cu(t,e){const n={};for(const s in e){const r=e[s];n[s]=hn(r)?r.map(t):t(r)}return n}const so=()=>{},hn=Array.isArray,uA=/\/$/,hA=t=>t.replace(uA,"");function bu(t,e,n="/"){let s,r={},i="",o="";const a=e.indexOf("#");let c=e.indexOf("?");return a<c&&a>=0&&(c=-1),c>-1&&(s=e.slice(0,c),i=e.slice(c+1,a>-1?a:e.length),r=t(i)),a>-1&&(s=s||e.slice(0,a),o=e.slice(a,e.length)),s=gA(s??e,n),{fullPath:s+(i&&"?")+i+o,path:s,query:r,hash:o}}function fA(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function sm(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function dA(t,e,n){const s=e.matched.length-1,r=n.matched.length-1;return s>-1&&s===r&&si(e.matched[s],n.matched[r])&&mw(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function si(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function mw(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!pA(t[n],e[n]))return!1;return!0}function pA(t,e){return hn(t)?rm(t,e):hn(e)?rm(e,t):t===e}function rm(t,e){return hn(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function gA(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),r=s[s.length-1];(r===".."||r===".")&&s.push("");let i=n.length-1,o,a;for(o=0;o<s.length;o++)if(a=s[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+s.slice(o-(o===s.length?1:0)).join("/")}var bo;(function(t){t.pop="pop",t.push="push"})(bo||(bo={}));var ro;(function(t){t.back="back",t.forward="forward",t.unknown=""})(ro||(ro={}));function mA(t){if(!t)if(br){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),hA(t)}const yA=/^[^#]+#/;function _A(t,e){return t.replace(yA,"#")+e}function vA(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const wl=()=>({left:window.pageXOffset,top:window.pageYOffset});function wA(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;e=vA(r,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function im(t,e){return(history.state?history.state.position-e:-1)+t}const Ah=new Map;function EA(t,e){Ah.set(t,e)}function TA(t){const e=Ah.get(t);return Ah.delete(t),e}let IA=()=>location.protocol+"//"+location.host;function yw(t,e){const{pathname:n,search:s,hash:r}=e,i=t.indexOf("#");if(i>-1){let a=r.includes(t.slice(i))?t.slice(i).length:1,c=r.slice(a);return c[0]!=="/"&&(c="/"+c),sm(c,"")}return sm(n,t)+s+r}function CA(t,e,n,s){let r=[],i=[],o=null;const a=({state:f})=>{const d=yw(t,location),p=n.value,y=e.value;let E=0;if(f){if(n.value=d,e.value=f,o&&o===p){o=null;return}E=y?f.position-y.position:0}else s(d);r.forEach(v=>{v(n.value,p,{delta:E,type:bo.pop,direction:E?E>0?ro.forward:ro.back:ro.unknown})})};function c(){o=n.value}function l(f){r.push(f);const d=()=>{const p=r.indexOf(f);p>-1&&r.splice(p,1)};return i.push(d),d}function u(){const{history:f}=window;f.state&&f.replaceState(Ce({},f.state,{scroll:wl()}),"")}function h(){for(const f of i)f();i=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:c,listen:l,destroy:h}}function om(t,e,n,s=!1,r=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:r?wl():null}}function bA(t){const{history:e,location:n}=window,s={value:yw(t,n)},r={value:e.state};r.value||i(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,l,u){const h=t.indexOf("#"),f=h>-1?(n.host&&document.querySelector("base")?t:t.slice(h))+c:IA()+t+c;try{e[u?"replaceState":"pushState"](l,"",f),r.value=l}catch(d){console.error(d),n[u?"replace":"assign"](f)}}function o(c,l){const u=Ce({},e.state,om(r.value.back,c,r.value.forward,!0),l,{position:r.value.position});i(c,u,!0),s.value=c}function a(c,l){const u=Ce({},r.value,e.state,{forward:c,scroll:wl()});i(u.current,u,!0);const h=Ce({},om(s.value,c,null),{position:u.position+1},l);i(c,h,!1),s.value=c}return{location:s,state:r,push:a,replace:o}}function _w(t){t=mA(t);const e=bA(t),n=CA(t,e.state,e.location,e.replace);function s(i,o=!0){o||n.pauseListeners(),history.go(i)}const r=Ce({location:"",base:t,go:s,createHref:_A.bind(null,t)},e,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}function SA(t){return t=location.host?t||location.pathname+location.search:"",t.includes("#")||(t+="#"),_w(t)}function RA(t){return typeof t=="string"||t&&typeof t=="object"}function vw(t){return typeof t=="string"||typeof t=="symbol"}const yn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},ww=Symbol("");var am;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(am||(am={}));function ri(t,e){return Ce(new Error,{type:t,[ww]:!0},e)}function Un(t,e){return t instanceof Error&&ww in t&&(e==null||!!(t.type&e))}const cm="[^/]+?",kA={sensitive:!1,strict:!1,start:!0,end:!0},AA=/[.+*?^${}()[\]/\\]/g;function NA(t,e){const n=Ce({},kA,e),s=[];let r=n.start?"^":"";const i=[];for(const l of t){const u=l.length?[]:[90];n.strict&&!l.length&&(r+="/");for(let h=0;h<l.length;h++){const f=l[h];let d=40+(n.sensitive?.25:0);if(f.type===0)h||(r+="/"),r+=f.value.replace(AA,"\\$&"),d+=40;else if(f.type===1){const{value:p,repeatable:y,optional:E,regexp:v}=f;i.push({name:p,repeatable:y,optional:E});const g=v||cm;if(g!==cm){d+=10;try{new RegExp(`(${g})`)}catch(w){throw new Error(`Invalid custom RegExp for param "${p}" (${g}): `+w.message)}}let T=y?`((?:${g})(?:/(?:${g}))*)`:`(${g})`;h||(T=E&&l.length<2?`(?:/${T})`:"/"+T),E&&(T+="?"),r+=T,d+=20,E&&(d+=-8),y&&(d+=-20),g===".*"&&(d+=-50)}u.push(d)}s.push(u)}if(n.strict&&n.end){const l=s.length-1;s[l][s[l].length-1]+=.7000000000000001}n.strict||(r+="/?"),n.end?r+="$":n.strict&&(r+="(?:/|$)");const o=new RegExp(r,n.sensitive?"":"i");function a(l){const u=l.match(o),h={};if(!u)return null;for(let f=1;f<u.length;f++){const d=u[f]||"",p=i[f-1];h[p.name]=d&&p.repeatable?d.split("/"):d}return h}function c(l){let u="",h=!1;for(const f of t){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const d of f)if(d.type===0)u+=d.value;else if(d.type===1){const{value:p,repeatable:y,optional:E}=d,v=p in l?l[p]:"";if(hn(v)&&!y)throw new Error(`Provided param "${p}" is an array but it is not repeatable (* or + modifiers)`);const g=hn(v)?v.join("/"):v;if(!g)if(E)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${p}"`);u+=g}}return u||"/"}return{re:o,score:s,keys:i,parse:a,stringify:c}}function OA(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===40+40?-1:1:t.length>e.length?e.length===1&&e[0]===40+40?1:-1:0}function PA(t,e){let n=0;const s=t.score,r=e.score;for(;n<s.length&&n<r.length;){const i=OA(s[n],r[n]);if(i)return i;n++}if(Math.abs(r.length-s.length)===1){if(lm(s))return 1;if(lm(r))return-1}return r.length-s.length}function lm(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const DA={type:0,value:""},xA=/[a-zA-Z0-9_]/;function MA(t){if(!t)return[[]];if(t==="/")return[[DA]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(d){throw new Error(`ERR (${n})/"${l}": ${d}`)}let n=0,s=n;const r=[];let i;function o(){i&&r.push(i),i=[]}let a=0,c,l="",u="";function h(){l&&(n===0?i.push({type:0,value:l}):n===1||n===2||n===3?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:l,regexp:u,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),l="")}function f(){l+=c}for(;a<t.length;){if(c=t[a++],c==="\\"&&n!==2){s=n,n=4;continue}switch(n){case 0:c==="/"?(l&&h(),o()):c===":"?(h(),n=1):f();break;case 4:f(),n=s;break;case 1:c==="("?n=2:xA.test(c)?f():(h(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case 2:c===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+c:n=3:u+=c;break;case 3:h(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${l}"`),h(),o(),r}function LA(t,e,n){const s=NA(MA(t.path),n),r=Ce(s,{record:t,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function FA(t,e){const n=[],s=new Map;e=fm({strict:!1,end:!0,sensitive:!1},e);function r(u){return s.get(u)}function i(u,h,f){const d=!f,p=UA(u);p.aliasOf=f&&f.record;const y=fm(e,u),E=[p];if("alias"in u){const T=typeof u.alias=="string"?[u.alias]:u.alias;for(const w of T)E.push(Ce({},p,{components:f?f.record.components:p.components,path:w,aliasOf:f?f.record:p}))}let v,g;for(const T of E){const{path:w}=T;if(h&&w[0]!=="/"){const b=h.record.path,D=b[b.length-1]==="/"?"":"/";T.path=h.record.path+(w&&D+w)}if(v=LA(T,h,y),f?f.alias.push(v):(g=g||v,g!==v&&g.alias.push(v),d&&u.name&&!hm(v)&&o(u.name)),p.children){const b=p.children;for(let D=0;D<b.length;D++)i(b[D],v,f&&f.children[D])}f=f||v,(v.record.components&&Object.keys(v.record.components).length||v.record.name||v.record.redirect)&&c(v)}return g?()=>{o(g)}:so}function o(u){if(vw(u)){const h=s.get(u);h&&(s.delete(u),n.splice(n.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=n.indexOf(u);h>-1&&(n.splice(h,1),u.record.name&&s.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function a(){return n}function c(u){let h=0;for(;h<n.length&&PA(u,n[h])>=0&&(u.record.path!==n[h].record.path||!Ew(u,n[h]));)h++;n.splice(h,0,u),u.record.name&&!hm(u)&&s.set(u.record.name,u)}function l(u,h){let f,d={},p,y;if("name"in u&&u.name){if(f=s.get(u.name),!f)throw ri(1,{location:u});y=f.record.name,d=Ce(um(h.params,f.keys.filter(g=>!g.optional).map(g=>g.name)),u.params&&um(u.params,f.keys.map(g=>g.name))),p=f.stringify(d)}else if("path"in u)p=u.path,f=n.find(g=>g.re.test(p)),f&&(d=f.parse(p),y=f.record.name);else{if(f=h.name?s.get(h.name):n.find(g=>g.re.test(h.path)),!f)throw ri(1,{location:u,currentLocation:h});y=f.record.name,d=Ce({},h.params,u.params),p=f.stringify(d)}const E=[];let v=f;for(;v;)E.unshift(v.record),v=v.parent;return{name:y,path:p,params:d,matched:E,meta:VA(E)}}return t.forEach(u=>i(u)),{addRoute:i,resolve:l,removeRoute:o,getRoutes:a,getRecordMatcher:r}}function um(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function UA(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:$A(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function $A(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="boolean"?n:n[s];return e}function hm(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function VA(t){return t.reduce((e,n)=>Ce(e,n.meta),{})}function fm(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}function Ew(t,e){return e.children.some(n=>n===t||Ew(t,n))}const Tw=/#/g,BA=/&/g,HA=/\//g,jA=/=/g,WA=/\?/g,Iw=/\+/g,KA=/%5B/g,qA=/%5D/g,Cw=/%5E/g,zA=/%60/g,bw=/%7B/g,GA=/%7C/g,Sw=/%7D/g,QA=/%20/g;function hd(t){return encodeURI(""+t).replace(GA,"|").replace(KA,"[").replace(qA,"]")}function YA(t){return hd(t).replace(bw,"{").replace(Sw,"}").replace(Cw,"^")}function Nh(t){return hd(t).replace(Iw,"%2B").replace(QA,"+").replace(Tw,"%23").replace(BA,"%26").replace(zA,"`").replace(bw,"{").replace(Sw,"}").replace(Cw,"^")}function JA(t){return Nh(t).replace(jA,"%3D")}function XA(t){return hd(t).replace(Tw,"%23").replace(WA,"%3F")}function ZA(t){return t==null?"":XA(t).replace(HA,"%2F")}function Tc(t){try{return decodeURIComponent(""+t)}catch{}return""+t}function eN(t){const e={};if(t===""||t==="?")return e;const s=(t[0]==="?"?t.slice(1):t).split("&");for(let r=0;r<s.length;++r){const i=s[r].replace(Iw," "),o=i.indexOf("="),a=Tc(o<0?i:i.slice(0,o)),c=o<0?null:Tc(i.slice(o+1));if(a in e){let l=e[a];hn(l)||(l=e[a]=[l]),l.push(c)}else e[a]=c}return e}function dm(t){let e="";for(let n in t){const s=t[n];if(n=JA(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(hn(s)?s.map(i=>i&&Nh(i)):[s&&Nh(s)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function tN(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=hn(s)?s.map(r=>r==null?null:""+r):s==null?s:""+s)}return e}const nN=Symbol(""),pm=Symbol(""),fd=Symbol(""),dd=Symbol(""),Oh=Symbol("");function Li(){let t=[];function e(s){return t.push(s),()=>{const r=t.indexOf(s);r>-1&&t.splice(r,1)}}function n(){t=[]}return{add:e,list:()=>t,reset:n}}function fs(t,e,n,s,r){const i=s&&(s.enterCallbacks[r]=s.enterCallbacks[r]||[]);return()=>new Promise((o,a)=>{const c=h=>{h===!1?a(ri(4,{from:n,to:e})):h instanceof Error?a(h):RA(h)?a(ri(2,{from:e,to:h})):(i&&s.enterCallbacks[r]===i&&typeof h=="function"&&i.push(h),o())},l=t.call(s&&s.instances[r],e,n,c);let u=Promise.resolve(l);t.length<3&&(u=u.then(c)),u.catch(h=>a(h))})}function Su(t,e,n,s){const r=[];for(const i of t)for(const o in i.components){let a=i.components[o];if(!(e!=="beforeRouteEnter"&&!i.instances[o]))if(sN(a)){const l=(a.__vccOpts||a)[e];l&&r.push(fs(l,n,s,i,o))}else{let c=a();r.push(()=>c.then(l=>{if(!l)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${i.path}"`));const u=lA(l)?l.default:l;i.components[o]=u;const f=(u.__vccOpts||u)[e];return f&&fs(f,n,s,i,o)()}))}}return r}function sN(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function gm(t){const e=At(fd),n=At(dd),s=yt(()=>e.resolve(Re(t.to))),r=yt(()=>{const{matched:c}=s.value,{length:l}=c,u=c[l-1],h=n.matched;if(!u||!h.length)return-1;const f=h.findIndex(si.bind(null,u));if(f>-1)return f;const d=mm(c[l-2]);return l>1&&mm(u)===d&&h[h.length-1].path!==d?h.findIndex(si.bind(null,c[l-2])):f}),i=yt(()=>r.value>-1&&aN(n.params,s.value.params)),o=yt(()=>r.value>-1&&r.value===n.matched.length-1&&mw(n.params,s.value.params));function a(c={}){return oN(c)?e[Re(t.replace)?"replace":"push"](Re(t.to)).catch(so):Promise.resolve()}return{route:s,href:yt(()=>s.value.href),isActive:i,isExactActive:o,navigate:a}}const rN=hr({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:gm,setup(t,{slots:e}){const n=Kt(gm(t)),{options:s}=At(fd),r=yt(()=>({[ym(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[ym(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&e.default(n);return t.custom?i:bn("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},i)}}}),iN=rN;function oN(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function aN(t,e){for(const n in e){const s=e[n],r=t[n];if(typeof s=="string"){if(s!==r)return!1}else if(!hn(r)||r.length!==s.length||s.some((i,o)=>i!==r[o]))return!1}return!0}function mm(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const ym=(t,e,n)=>t??e??n,cN=hr({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=At(Oh),r=yt(()=>t.route||s.value),i=At(pm,0),o=yt(()=>{let l=Re(i);const{matched:u}=r.value;let h;for(;(h=u[l])&&!h.components;)l++;return l}),a=yt(()=>r.value.matched[o.value]);$r(pm,yt(()=>o.value+1)),$r(nN,a),$r(Oh,r);const c=kt();return Gs(()=>[c.value,a.value,t.name],([l,u,h],[f,d,p])=>{u&&(u.instances[h]=l,d&&d!==u&&l&&l===f&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),l&&u&&(!d||!si(u,d)||!f)&&(u.enterCallbacks[h]||[]).forEach(y=>y(l))},{flush:"post"}),()=>{const l=r.value,u=t.name,h=a.value,f=h&&h.components[u];if(!f)return _m(n.default,{Component:f,route:l});const d=h.props[u],p=d?d===!0?l.params:typeof d=="function"?d(l):d:null,E=bn(f,Ce({},p,e,{onVnodeUnmounted:v=>{v.component.isUnmounted&&(h.instances[u]=null)},ref:c}));return _m(n.default,{Component:E,route:l})||E}}});function _m(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Rw=cN;function lN(t){const e=FA(t.routes,t),n=t.parseQuery||eN,s=t.stringifyQuery||dm,r=t.history,i=Li(),o=Li(),a=Li(),c=Yr(yn);let l=yn;br&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Cu.bind(null,R=>""+R),h=Cu.bind(null,ZA),f=Cu.bind(null,Tc);function d(R,W){let U,J;return vw(R)?(U=e.getRecordMatcher(R),J=W):J=R,e.addRoute(J,U)}function p(R){const W=e.getRecordMatcher(R);W&&e.removeRoute(W)}function y(){return e.getRoutes().map(R=>R.record)}function E(R){return!!e.getRecordMatcher(R)}function v(R,W){if(W=Ce({},W||c.value),typeof R=="string"){const I=bu(n,R,W.path),S=e.resolve({path:I.path},W),k=r.createHref(I.fullPath);return Ce(I,S,{params:f(S.params),hash:Tc(I.hash),redirectedFrom:void 0,href:k})}let U;if("path"in R)U=Ce({},R,{path:bu(n,R.path,W.path).path});else{const I=Ce({},R.params);for(const S in I)I[S]==null&&delete I[S];U=Ce({},R,{params:h(I)}),W.params=h(W.params)}const J=e.resolve(U,W),Te=R.hash||"";J.params=u(f(J.params));const m=fA(s,Ce({},R,{hash:YA(Te),path:J.path})),_=r.createHref(m);return Ce({fullPath:m,hash:Te,query:s===dm?tN(R.query):R.query||{}},J,{redirectedFrom:void 0,href:_})}function g(R){return typeof R=="string"?bu(n,R,c.value.path):Ce({},R)}function T(R,W){if(l!==R)return ri(8,{from:W,to:R})}function w(R){return O(R)}function b(R){return w(Ce(g(R),{replace:!0}))}function D(R){const W=R.matched[R.matched.length-1];if(W&&W.redirect){const{redirect:U}=W;let J=typeof U=="function"?U(R):U;return typeof J=="string"&&(J=J.includes("?")||J.includes("#")?J=g(J):{path:J},J.params={}),Ce({query:R.query,hash:R.hash,params:"path"in J?{}:R.params},J)}}function O(R,W){const U=l=v(R),J=c.value,Te=R.state,m=R.force,_=R.replace===!0,I=D(U);if(I)return O(Ce(g(I),{state:typeof I=="object"?Ce({},Te,I.state):Te,force:m,replace:_}),W||U);const S=U;S.redirectedFrom=W;let k;return!m&&dA(s,J,U)&&(k=ri(16,{to:S,from:J}),gn(J,J,!0,!1)),(k?Promise.resolve(k):H(S,J)).catch(P=>Un(P)?Un(P,2)?P:rs(P):Ee(P,S,J)).then(P=>{if(P){if(Un(P,2))return O(Ce({replace:_},g(P.to),{state:typeof P.to=="object"?Ce({},Te,P.to.state):Te,force:m}),W||S)}else P=B(S,J,!0,_,Te);return Y(S,J,P),P})}function C(R,W){const U=T(R,W);return U?Promise.reject(U):Promise.resolve()}function A(R){const W=vr.values().next().value;return W&&typeof W.runWithContext=="function"?W.runWithContext(R):R()}function H(R,W){let U;const[J,Te,m]=uN(R,W);U=Su(J.reverse(),"beforeRouteLeave",R,W);for(const I of J)I.leaveGuards.forEach(S=>{U.push(fs(S,R,W))});const _=C.bind(null,R,W);return U.push(_),ut(U).then(()=>{U=[];for(const I of i.list())U.push(fs(I,R,W));return U.push(_),ut(U)}).then(()=>{U=Su(Te,"beforeRouteUpdate",R,W);for(const I of Te)I.updateGuards.forEach(S=>{U.push(fs(S,R,W))});return U.push(_),ut(U)}).then(()=>{U=[];for(const I of R.matched)if(I.beforeEnter&&!W.matched.includes(I))if(hn(I.beforeEnter))for(const S of I.beforeEnter)U.push(fs(S,R,W));else U.push(fs(I.beforeEnter,R,W));return U.push(_),ut(U)}).then(()=>(R.matched.forEach(I=>I.enterCallbacks={}),U=Su(m,"beforeRouteEnter",R,W),U.push(_),ut(U))).then(()=>{U=[];for(const I of o.list())U.push(fs(I,R,W));return U.push(_),ut(U)}).catch(I=>Un(I,8)?I:Promise.reject(I))}function Y(R,W,U){for(const J of a.list())A(()=>J(R,W,U))}function B(R,W,U,J,Te){const m=T(R,W);if(m)return m;const _=W===yn,I=br?history.state:{};U&&(J||_?r.replace(R.fullPath,Ce({scroll:_&&I&&I.scroll},Te)):r.push(R.fullPath,Te)),c.value=R,gn(R,W,U,_),rs()}let te;function K(){te||(te=r.listen((R,W,U)=>{if(!ba.listening)return;const J=v(R),Te=D(J);if(Te){O(Ce(Te,{replace:!0}),J).catch(so);return}l=J;const m=c.value;br&&EA(im(m.fullPath,U.delta),wl()),H(J,m).catch(_=>Un(_,12)?_:Un(_,2)?(O(_.to,J).then(I=>{Un(I,20)&&!U.delta&&U.type===bo.pop&&r.go(-1,!1)}).catch(so),Promise.reject()):(U.delta&&r.go(-U.delta,!1),Ee(_,J,m))).then(_=>{_=_||B(J,m,!1),_&&(U.delta&&!Un(_,8)?r.go(-U.delta,!1):U.type===bo.pop&&Un(_,20)&&r.go(-1,!1)),Y(J,m,_)}).catch(so)}))}let Ne=Li(),ne=Li(),ve;function Ee(R,W,U){rs(R);const J=ne.list();return J.length?J.forEach(Te=>Te(R,W,U)):console.error(R),Promise.reject(R)}function Fn(){return ve&&c.value!==yn?Promise.resolve():new Promise((R,W)=>{Ne.add([R,W])})}function rs(R){return ve||(ve=!R,K(),Ne.list().forEach(([W,U])=>R?U(R):W()),Ne.reset()),R}function gn(R,W,U,J){const{scrollBehavior:Te}=t;if(!br||!Te)return Promise.resolve();const m=!U&&TA(im(R.fullPath,0))||(J||!U)&&history.state&&history.state.scroll||null;return ur().then(()=>Te(R,W,m)).then(_=>_&&wA(_)).catch(_=>Ee(_,R,W))}const Pt=R=>r.go(R);let _r;const vr=new Set,ba={currentRoute:c,listening:!0,addRoute:d,removeRoute:p,hasRoute:E,getRoutes:y,resolve:v,options:t,push:w,replace:b,go:Pt,back:()=>Pt(-1),forward:()=>Pt(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:ne.add,isReady:Fn,install(R){const W=this;R.component("RouterLink",iN),R.component("RouterView",Rw),R.config.globalProperties.$router=W,Object.defineProperty(R.config.globalProperties,"$route",{enumerable:!0,get:()=>Re(c)}),br&&!_r&&c.value===yn&&(_r=!0,w(r.location).catch(Te=>{}));const U={};for(const Te in yn)U[Te]=yt(()=>c.value[Te]);R.provide(fd,W),R.provide(dd,Kt(U)),R.provide(Oh,c);const J=R.unmount;vr.add(R),R.unmount=function(){vr.delete(R),vr.size<1&&(l=yn,te&&te(),te=null,c.value=yn,_r=!1,ve=!1),J()}}};function ut(R){return R.reduce((W,U)=>W.then(()=>A(U)),Promise.resolve())}return ba}function uN(t,e){const n=[],s=[],r=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const a=e.matched[o];a&&(t.matched.find(l=>si(l,a))?s.push(a):n.push(a));const c=t.matched[o];c&&(e.matched.find(l=>si(l,c))||r.push(c))}return[n,s,r]}function hN(){return At(dd)}const vm=[{name:"about",path:"/about",meta:{},alias:[],redirect:void 0,component:()=>Vr(()=>import("./about.cfce5940.js"),[],import.meta.url).then(t=>t.default||t)},{name:"index",path:"/",meta:{},alias:[],redirect:void 0,component:()=>Vr(()=>import("./index.f7c5d4fb.js"),["./index.f7c5d4fb.js","./Dialog.bc954534.js","./Dialog.b6fa9710.css"],import.meta.url).then(t=>t.default||t)},{name:"tags",path:"/tags",meta:{},alias:[],redirect:void 0,component:()=>Vr(()=>import("./tags.2314827f.js"),["./tags.2314827f.js","./Dialog.bc954534.js","./Dialog.b6fa9710.css"],import.meta.url).then(t=>t.default||t)}],fN={scrollBehavior(t,e,n){const s=nt();let r=n||void 0;if(!r&&e&&t&&t.meta.scrollToTop!==!1&&dN(e,t)&&(r={left:0,top:0}),t.path===e.path){if(e.hash&&!t.hash)return{left:0,top:0};if(t.hash)return{el:t.hash,top:wm(t.hash)}}const i=a=>!!(a.meta.pageTransition??kh),o=i(e)&&i(t)?"page:transition:finish":"page:finish";return new Promise(a=>{s.hooks.hookOnce(o,async()=>{await ur(),t.hash&&(r={el:t.hash,top:wm(t.hash)}),a(r)})})}};function wm(t){try{const e=document.querySelector(t);if(e)return parseFloat(getComputedStyle(e).scrollMarginTop)}catch{}return 0}function dN(t,e){const n=t.matched[0]===e.matched[0];return!!(!n||n&&JSON.stringify(t.params)!==JSON.stringify(e.params))}const pN={},Dt={...pN,...fN},gN=dw(async t=>{var c;let e,n;if(!((c=t.meta)!=null&&c.validate))return;const s=nt(),r=Jo();if(([e,n]=Co(()=>Promise.resolve(t.meta.validate(t))),e=await e,n(),e)===!0)return;const o=ud({statusCode:404,statusMessage:`Page Not Found: ${t.fullPath}`}),a=r.beforeResolve(l=>{if(a(),l===t){const u=r.afterEach(async()=>{u(),await s.runWithContext(()=>kr(o)),window.history.pushState({},"",t.fullPath)});return!1}})});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kw={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $=function(t,e){if(!t)throw Ti(e)},Ti=function(t){return new Error("Firebase Database ("+kw.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aw=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},mN=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},El={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,u=i>>2,h=(i&3)<<4|a>>4;let f=(a&15)<<2|l>>6,d=l&63;c||(d=64,o||(f=64)),s.push(n[u],n[h],n[f],n[d])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Aw(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):mN(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const h=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||l==null||h==null)throw new yN;const f=i<<2|a>>4;if(s.push(f),l!==64){const d=a<<4&240|l>>2;if(s.push(d),h!==64){const p=l<<6&192|h;s.push(p)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class yN extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Nw=function(t){const e=Aw(t);return El.encodeByteArray(e,!0)},Ic=function(t){return Nw(t).replace(/\./g,"")},Cc=function(t){try{return El.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _N(t){return Ow(void 0,t)}function Ow(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!vN(n)||(t[n]=Ow(t[n],e[n]));return t}function vN(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wN(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EN=()=>wN().__FIREBASE_DEFAULTS__,TN=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},IN=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Cc(t[1]);return e&&JSON.parse(e)},pd=()=>{try{return EN()||TN()||IN()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Pw=t=>{var e,n;return(n=(e=pd())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},CN=t=>{const e=Pw(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Dw=()=>{var t;return(t=pd())===null||t===void 0?void 0:t.config},xw=t=>{var e;return(e=pd())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bN(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t),a="";return[Ic(JSON.stringify(n)),Ic(JSON.stringify(o)),a].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function gd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(It())}function SN(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Mw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function RN(){const t=It();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Lw(){return kw.NODE_ADMIN===!0}function Fw(){try{return typeof indexedDB=="object"}catch{return!1}}function kN(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AN="FirebaseError";class Mn extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=AN,Object.setPrototypeOf(this,Mn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ii.prototype.create)}}class Ii{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?NN(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Mn(r,a,s)}}function NN(t,e){return t.replace(ON,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const ON=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ro(t){return JSON.parse(t)}function ct(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uw=function(t){let e={},n={},s={},r="";try{const i=t.split(".");e=Ro(Cc(i[0])||""),n=Ro(Cc(i[1])||""),r=i[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:r}},PN=function(t){const e=Uw(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},DN=function(t){const e=Uw(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ss(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function ii(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Ph(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function bc(t,e,n){const s={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=e.call(n,t[r],r,t));return s}function Sc(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(Em(i)&&Em(o)){if(!Sc(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function Em(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ci(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xN{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)s[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const f=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(f<<1|f>>>31)&4294967295}let r=this.chain_[0],i=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let h=0;h<80;h++){h<40?h<20?(l=a^i&(o^a),u=1518500249):(l=i^o^a,u=1859775393):h<60?(l=i&o|a&(i|o),u=2400959708):(l=i^o^a,u=3395469782);const f=(r<<5|r>>>27)+l+c+u+s[h]&4294967295;c=a,a=o,o=(i<<30|i>>>2)&4294967295,i=r,r=f}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let r=0;const i=this.buf_;let o=this.inbuf_;for(;r<n;){if(o===0)for(;r<=s;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<n;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<n;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let r=0;r<5;r++)for(let i=24;i>=0;i-=8)e[s]=this.chain_[r]>>i&255,++s;return e}}function MN(t,e){const n=new LN(t,e);return n.subscribe.bind(n)}class LN{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");FN(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=Ru),r.error===void 0&&(r.error=Ru),r.complete===void 0&&(r.complete=Ru);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function FN(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ru(){}function UN(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $N=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);if(r>=55296&&r<=56319){const i=r-55296;s++,$(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;r=65536+(i<<10)+o}r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):r<65536?(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Tl=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(t){return t&&t._delegate?t._delegate:t}class fn{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VN{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new So;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(HN(e))try{this.getOrInitializeService({instanceIdentifier:Us})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=Us){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Us){return this.instances.has(e)}getOptions(e=Us){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){var s;const r=this.normalizeInstanceIdentifier(n),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:BN(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Us){return this.component?this.component.multipleInstances?e:Us:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function BN(t){return t===Us?void 0:t}function HN(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jN{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new VN(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _e;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(_e||(_e={}));const WN={debug:_e.DEBUG,verbose:_e.VERBOSE,info:_e.INFO,warn:_e.WARN,error:_e.ERROR,silent:_e.SILENT},KN=_e.INFO,qN={[_e.DEBUG]:"log",[_e.VERBOSE]:"log",[_e.INFO]:"info",[_e.WARN]:"warn",[_e.ERROR]:"error"},zN=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=qN[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Xo{constructor(e){this.name=e,this._logLevel=KN,this._logHandler=zN,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in _e))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?WN[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,_e.DEBUG,...e),this._logHandler(this,_e.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,_e.VERBOSE,...e),this._logHandler(this,_e.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,_e.INFO,...e),this._logHandler(this,_e.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,_e.WARN,...e),this._logHandler(this,_e.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,_e.ERROR,...e),this._logHandler(this,_e.ERROR,...e)}}const GN=(t,e)=>e.some(n=>t instanceof n);let Tm,Im;function QN(){return Tm||(Tm=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function YN(){return Im||(Im=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const $w=new WeakMap,Dh=new WeakMap,Vw=new WeakMap,ku=new WeakMap,md=new WeakMap;function JN(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Es(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&$w.set(n,t)}).catch(()=>{}),md.set(e,t),e}function XN(t){if(Dh.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Dh.set(t,e)}let xh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Dh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Vw.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Es(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function ZN(t){xh=t(xh)}function e1(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Au(this),e,...n);return Vw.set(s,e.sort?e.sort():[e]),Es(s)}:YN().includes(t)?function(...e){return t.apply(Au(this),e),Es($w.get(this))}:function(...e){return Es(t.apply(Au(this),e))}}function t1(t){return typeof t=="function"?e1(t):(t instanceof IDBTransaction&&XN(t),GN(t,QN())?new Proxy(t,xh):t)}function Es(t){if(t instanceof IDBRequest)return JN(t);if(ku.has(t))return ku.get(t);const e=t1(t);return e!==t&&(ku.set(t,e),md.set(e,t)),e}const Au=t=>md.get(t);function n1(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=Es(o);return s&&o.addEventListener("upgradeneeded",c=>{s(Es(o.result),c.oldVersion,c.newVersion,Es(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const s1=["get","getKey","getAll","getAllKeys","count"],r1=["put","add","delete","clear"],Nu=new Map;function Cm(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Nu.get(e))return Nu.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=r1.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||s1.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return Nu.set(e,i),i}ZN(t=>({...t,get:(e,n,s)=>Cm(e,n)||t.get(e,n,s),has:(e,n)=>!!Cm(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i1{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(o1(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function o1(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Mh="@firebase/app",bm="0.9.12";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr=new Xo("@firebase/app"),a1="@firebase/app-compat",c1="@firebase/analytics-compat",l1="@firebase/analytics",u1="@firebase/app-check-compat",h1="@firebase/app-check",f1="@firebase/auth",d1="@firebase/auth-compat",p1="@firebase/database",g1="@firebase/database-compat",m1="@firebase/functions",y1="@firebase/functions-compat",_1="@firebase/installations",v1="@firebase/installations-compat",w1="@firebase/messaging",E1="@firebase/messaging-compat",T1="@firebase/performance",I1="@firebase/performance-compat",C1="@firebase/remote-config",b1="@firebase/remote-config-compat",S1="@firebase/storage",R1="@firebase/storage-compat",k1="@firebase/firestore",A1="@firebase/firestore-compat",N1="firebase",O1="9.22.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh="[DEFAULT]",P1={[Mh]:"fire-core",[a1]:"fire-core-compat",[l1]:"fire-analytics",[c1]:"fire-analytics-compat",[h1]:"fire-app-check",[u1]:"fire-app-check-compat",[f1]:"fire-auth",[d1]:"fire-auth-compat",[p1]:"fire-rtdb",[g1]:"fire-rtdb-compat",[m1]:"fire-fn",[y1]:"fire-fn-compat",[_1]:"fire-iid",[v1]:"fire-iid-compat",[w1]:"fire-fcm",[E1]:"fire-fcm-compat",[T1]:"fire-perf",[I1]:"fire-perf-compat",[C1]:"fire-rc",[b1]:"fire-rc-compat",[S1]:"fire-gcs",[R1]:"fire-gcs-compat",[k1]:"fire-fst",[A1]:"fire-fst-compat","fire-js":"fire-js",[N1]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rc=new Map,Fh=new Map;function D1(t,e){try{t.container.addComponent(e)}catch(n){tr.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Nn(t){const e=t.name;if(Fh.has(e))return tr.debug(`There were multiple attempts to register component ${e}.`),!1;Fh.set(e,t);for(const n of Rc.values())D1(n,t);return!0}function yd(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x1={["no-app"]:"No Firebase App '{$appName}' has been created - call initializeApp() first",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Ts=new Ii("app","Firebase",x1);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M1{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new fn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ts.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Os=O1;function _d(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Lh,automaticDataCollectionEnabled:!1},e),r=s.name;if(typeof r!="string"||!r)throw Ts.create("bad-app-name",{appName:String(r)});if(n||(n=Dw()),!n)throw Ts.create("no-options");const i=Rc.get(r);if(i){if(Sc(n,i.options)&&Sc(s,i.config))return i;throw Ts.create("duplicate-app",{appName:r})}const o=new jN(r);for(const c of Fh.values())o.addComponent(c);const a=new M1(n,s,o);return Rc.set(r,a),a}function vd(t=Lh){const e=Rc.get(t);if(!e&&t===Lh&&Dw())return _d();if(!e)throw Ts.create("no-app",{appName:t});return e}function Ht(t,e,n){var s;let r=(s=P1[t])!==null&&s!==void 0?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),tr.warn(a.join(" "));return}Nn(new fn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L1="firebase-heartbeat-database",F1=1,ko="firebase-heartbeat-store";let Ou=null;function Bw(){return Ou||(Ou=n1(L1,F1,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(ko)}}}).catch(t=>{throw Ts.create("idb-open",{originalErrorMessage:t.message})})),Ou}async function U1(t){try{return await(await Bw()).transaction(ko).objectStore(ko).get(Hw(t))}catch(e){if(e instanceof Mn)tr.warn(e.message);else{const n=Ts.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});tr.warn(n.message)}}}async function Sm(t,e){try{const s=(await Bw()).transaction(ko,"readwrite");await s.objectStore(ko).put(e,Hw(t)),await s.done}catch(n){if(n instanceof Mn)tr.warn(n.message);else{const s=Ts.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});tr.warn(s.message)}}}function Hw(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $1=1024,V1=30*24*60*60*1e3;class B1{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new j1(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Rm();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(r=>{const i=new Date(r.date).valueOf();return Date.now()-i<=V1}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Rm(),{heartbeatsToSend:n,unsentEntries:s}=H1(this._heartbeatsCache.heartbeats),r=Ic(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function Rm(){return new Date().toISOString().substring(0,10)}function H1(t,e=$1){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),km(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),km(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class j1{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Fw()?kN().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await U1(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Sm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Sm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function km(t){return Ic(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W1(t){Nn(new fn("platform-logger",e=>new i1(e),"PRIVATE")),Nn(new fn("heartbeat",e=>new B1(e),"PRIVATE")),Ht(Mh,bm,t),Ht(Mh,bm,"esm2017"),Ht("fire-js","")}W1("");function wd(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(t);r<s.length;r++)e.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(t,s[r])&&(n[s[r]]=t[s[r]]);return n}function jw(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const K1=jw,Ww=new Ii("auth","Firebase",jw());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kc=new Xo("@firebase/auth");function q1(t,...e){kc.logLevel<=_e.WARN&&kc.warn(`Auth (${Os}): ${t}`,...e)}function nc(t,...e){kc.logLevel<=_e.ERROR&&kc.error(`Auth (${Os}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function On(t,...e){throw Ed(t,...e)}function Sn(t,...e){return Ed(t,...e)}function Kw(t,e,n){const s=Object.assign(Object.assign({},K1()),{[e]:n});return new Ii("auth","Firebase",s).create(e,{appName:t.name})}function z1(t,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&On(t,"argument-error"),Kw(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ed(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Ww.create(t,...e)}function ce(t,e,...n){if(!t)throw Ed(e,...n)}function Hn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw nc(e),new Error(e)}function Jn(t,e){t||Hn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function G1(){return Am()==="http:"||Am()==="https:"}function Am(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q1(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(G1()||SN()||"connection"in navigator)?navigator.onLine:!0}function Y1(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e,n){this.shortDelay=e,this.longDelay=n,Jn(n>e,"Short delay should be less than long delay!"),this.isMobile=gd()||Mw()}get(){return Q1()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Td(t,e){Jn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Hn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Hn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Hn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J1={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X1=new Zo(3e4,6e4);function zw(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ea(t,e,n,s,r={}){return Gw(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=Ci(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode),qw.fetch()(Qw(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},i))})}async function Gw(t,e,n){t._canInitEmulator=!1;const s=Object.assign(Object.assign({},J1),e);try{const r=new eO(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Ua(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ua(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ua(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ua(t,"user-disabled",o);const u=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Kw(t,u,l);On(t,u)}}catch(r){if(r instanceof Mn)throw r;On(t,"network-request-failed",{message:String(r)})}}async function Z1(t,e,n,s,r={}){const i=await ea(t,e,n,s,r);return"mfaPendingCredential"in i&&On(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Qw(t,e,n,s){const r=`${e}${n}?${s}`;return t.config.emulator?Td(t.config,r):`${t.config.apiScheme}://${r}`}class eO{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Sn(this.auth,"network-request-failed")),X1.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ua(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=Sn(t,e,s);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tO(t,e){return ea(t,"POST","/v1/accounts:delete",e)}async function nO(t,e){return ea(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function sO(t,e=!1){const n=Ct(t),s=await n.getIdToken(e),r=Id(s);ce(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:io(Pu(r.auth_time)),issuedAtTime:io(Pu(r.iat)),expirationTime:io(Pu(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Pu(t){return Number(t)*1e3}function Id(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return nc("JWT malformed, contained fewer than 3 sections"),null;try{const r=Cc(n);return r?JSON.parse(r):(nc("Failed to decode base64 JWT payload"),null)}catch(r){return nc("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function rO(t){const e=Id(t);return ce(e,"internal-error"),ce(typeof e.exp<"u","internal-error"),ce(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ao(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof Mn&&iO(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function iO({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oO{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const r=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=io(this.lastLoginAt),this.creationTime=io(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ac(t){var e;const n=t.auth,s=await t.getIdToken(),r=await Ao(t,nO(n,{idToken:s}));ce(r==null?void 0:r.users.length,n,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?lO(i.providerUserInfo):[],a=cO(t.providerData,o),c=t.isAnonymous,l=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),u=c?l:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Yw(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(t,h)}async function aO(t){const e=Ct(t);await Ac(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function cO(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function lO(t){return t.map(e=>{var{providerId:n}=e,s=wd(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uO(t,e){const n=await Gw(t,{},async()=>{const s=Ci({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=Qw(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",qw.fetch()(o,{method:"POST",headers:a,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ce(e.idToken,"internal-error"),ce(typeof e.idToken<"u","internal-error"),ce(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):rO(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return ce(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await uO(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new No;return s&&(ce(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(ce(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(ce(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new No,this.toJSON())}_performRefresh(){return Hn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ls(t,e){ce(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Js{constructor(e){var{uid:n,auth:s,stsTokenManager:r}=e,i=wd(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new oO(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Yw(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Ao(this,this.stsTokenManager.getToken(this.auth,e));return ce(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return sO(this,e)}reload(){return aO(this)}_assign(e){this!==e&&(ce(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Js(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){ce(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Ac(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Ao(this,tO(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,r,i,o,a,c,l,u;const h=(s=n.displayName)!==null&&s!==void 0?s:void 0,f=(r=n.email)!==null&&r!==void 0?r:void 0,d=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,p=(o=n.photoURL)!==null&&o!==void 0?o:void 0,y=(a=n.tenantId)!==null&&a!==void 0?a:void 0,E=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,v=(l=n.createdAt)!==null&&l!==void 0?l:void 0,g=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:T,emailVerified:w,isAnonymous:b,providerData:D,stsTokenManager:O}=n;ce(T&&O,e,"internal-error");const C=No.fromJSON(this.name,O);ce(typeof T=="string",e,"internal-error"),ls(h,e.name),ls(f,e.name),ce(typeof w=="boolean",e,"internal-error"),ce(typeof b=="boolean",e,"internal-error"),ls(d,e.name),ls(p,e.name),ls(y,e.name),ls(E,e.name),ls(v,e.name),ls(g,e.name);const A=new Js({uid:T,auth:e,email:f,emailVerified:w,displayName:h,isAnonymous:b,photoURL:p,phoneNumber:d,tenantId:y,stsTokenManager:C,createdAt:v,lastLoginAt:g});return D&&Array.isArray(D)&&(A.providerData=D.map(H=>Object.assign({},H))),E&&(A._redirectEventId=E),A}static async _fromIdTokenResponse(e,n,s=!1){const r=new No;r.updateFromServerResponse(n);const i=new Js({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await Ac(i),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nm=new Map;function jn(t){Jn(t instanceof Function,"Expected a class definition");let e=Nm.get(t);return e?(Jn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Nm.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Jw.type="NONE";const Om=Jw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sc(t,e,n){return`firebase:${t}:${e}:${n}`}class Br{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=sc(this.userKey,r.apiKey,i),this.fullPersistenceKey=sc("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Js._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new Br(jn(Om),e,s);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=r[0]||jn(Om);const o=sc(s,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){const h=Js._fromJSON(e,u);l!==i&&(a=h),i=l;break}}catch{}const c=r.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Br(i,e,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new Br(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pm(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(eE(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Xw(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(nE(e))return"Blackberry";if(sE(e))return"Webos";if(Cd(e))return"Safari";if((e.includes("chrome/")||Zw(e))&&!e.includes("edge/"))return"Chrome";if(tE(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Xw(t=It()){return/firefox\//i.test(t)}function Cd(t=It()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Zw(t=It()){return/crios\//i.test(t)}function eE(t=It()){return/iemobile/i.test(t)}function tE(t=It()){return/android/i.test(t)}function nE(t=It()){return/blackberry/i.test(t)}function sE(t=It()){return/webos/i.test(t)}function Il(t=It()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function hO(t=It()){var e;return Il(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function fO(){return RN()&&document.documentMode===10}function rE(t=It()){return Il(t)||tE(t)||sE(t)||nE(t)||/windows phone/i.test(t)||eE(t)}function dO(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iE(t,e=[]){let n;switch(t){case"Browser":n=Pm(It());break;case"Worker":n=`${Pm(It())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Os}/${s}`}async function oE(t,e){return ea(t,"GET","/v2/recaptchaConfig",zw(t,e))}function Dm(t){return t!==void 0&&t.enterprise!==void 0}class aE{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pO(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function cE(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=Sn("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",pO().appendChild(s)})}function gO(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const mO="https://www.google.com/recaptcha/enterprise.js?render=",yO="recaptcha-enterprise",_O="NO_RECAPTCHA";class vO{constructor(e){this.type=yO,this.auth=ta(e)}async verify(e="verify",n=!1){async function s(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{oE(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new aE(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function r(i,o,a){const c=window.grecaptcha;Dm(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(_O)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{s(this.auth).then(a=>{if(!n&&Dm(window.grecaptcha))r(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}cE(mO+a).then(()=>{r(a,i,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wO{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EO{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new xm(this),this.idTokenSubscription=new xm(this),this.beforeStateQueue=new wO(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ww,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=jn(n)),this._initializationPromise=this.queue(async()=>{var s,r;if(!this._deleted&&(this.persistenceManager=await Br.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const s=await this.assertedPersistence.getCurrentUser();let r=s,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return ce(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ac(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Y1()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?Ct(e):null;return n&&ce(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&ce(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(jn(e))})}async initializeRecaptchaConfig(){const e=await oE(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new aE(e);this.tenantId==null?this._agentRecaptchaConfig=n:this._tenantRecaptchaConfigs[this.tenantId]=n,n.emailPasswordEnabled&&new vO(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ii("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&jn(e)||this._popupRedirectResolver;ce(n,this,"argument-error"),this.redirectPersistenceManager=await Br.create(this,[jn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return ce(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,s,r):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ce(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=iE(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(n["X-Firebase-Client"]=s);const r=await this._getAppCheckToken();return r&&(n["X-Firebase-AppCheck"]=r),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&q1(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ta(t){return Ct(t)}class xm{constructor(e){this.auth=e,this.observer=null,this.addObserver=MN(n=>this.observer=n)}get next(){return ce(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TO(t,e){const n=yd(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(Sc(i,e??{}))return r;On(r,"already-initialized")}return n.initialize({options:e})}function IO(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(jn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function CO(t,e,n){const s=ta(t);ce(s._canInitEmulator,s,"emulator-config-failed"),ce(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!!(n!=null&&n.disableWarnings),i=lE(e),{host:o,port:a}=bO(e),c=a===null?"":`:${a}`;s.config.emulator={url:`${i}//${o}${c}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})}),r||SO()}function lE(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function bO(t){const e=lE(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:Mm(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:Mm(o)}}}function Mm(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function SO(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uE{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Hn("not implemented")}_getIdTokenResponse(e){return Hn("not implemented")}_linkToIdToken(e,n){return Hn("not implemented")}_getReauthenticationResolver(e){return Hn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hr(t,e){return Z1(t,"POST","/v1/accounts:signInWithIdp",zw(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RO="http://localhost";class nr extends uE{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new nr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):On("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r}=n,i=wd(n,["providerId","signInMethod"]);if(!s||!r)return null;const o=new nr(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Hr(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Hr(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Hr(e,n)}buildRequest(){const e={requestUri:RO,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ci(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na extends bd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs extends na{constructor(){super("facebook.com")}static credential(e){return nr._fromParams({providerId:gs.PROVIDER_ID,signInMethod:gs.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return gs.credentialFromTaggedObject(e)}static credentialFromError(e){return gs.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return gs.credential(e.oauthAccessToken)}catch{return null}}}gs.FACEBOOK_SIGN_IN_METHOD="facebook.com";gs.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn extends na{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return nr._fromParams({providerId:Bn.PROVIDER_ID,signInMethod:Bn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Bn.credentialFromTaggedObject(e)}static credentialFromError(e){return Bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Bn.credential(n,s)}catch{return null}}}Bn.GOOGLE_SIGN_IN_METHOD="google.com";Bn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms extends na{constructor(){super("github.com")}static credential(e){return nr._fromParams({providerId:ms.PROVIDER_ID,signInMethod:ms.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ms.credentialFromTaggedObject(e)}static credentialFromError(e){return ms.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ms.credential(e.oauthAccessToken)}catch{return null}}}ms.GITHUB_SIGN_IN_METHOD="github.com";ms.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys extends na{constructor(){super("twitter.com")}static credential(e,n){return nr._fromParams({providerId:ys.PROVIDER_ID,signInMethod:ys.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ys.credentialFromTaggedObject(e)}static credentialFromError(e){return ys.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return ys.credential(n,s)}catch{return null}}}ys.TWITTER_SIGN_IN_METHOD="twitter.com";ys.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await Js._fromIdTokenResponse(e,s,r),o=Lm(s);return new oi({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=Lm(s);return new oi({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function Lm(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc extends Mn{constructor(e,n,s,r){var i;super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,Nc.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new Nc(e,n,s,r)}}function hE(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Nc._fromErrorAndOperation(t,i,e,s):i})}async function kO(t,e,n=!1){const s=await Ao(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return oi._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AO(t,e,n=!1){const{auth:s}=t,r="reauthenticate";try{const i=await Ao(t,hE(s,r,e,t),n);ce(i.idToken,s,"internal-error");const o=Id(i.idToken);ce(o,s,"internal-error");const{sub:a}=o;return ce(t.uid===a,s,"user-mismatch"),oi._forOperation(t,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&On(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NO(t,e,n=!1){const s="signIn",r=await hE(t,s,e),i=await oi._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}function Sd(t,e,n,s){return Ct(t).onIdTokenChanged(e,n,s)}function fE(t,e,n){return Ct(t).beforeAuthStateChanged(e,n)}const Oc="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dE{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Oc,"1"),this.storage.removeItem(Oc),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OO(){const t=It();return Cd(t)||Il(t)}const PO=1e3,DO=10;class pE extends dE{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=OO()&&dO(),this.fallbackToPolling=rE(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(s);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(s,e.newValue):this.storage.removeItem(s);else if(this.localCache[s]===e.newValue&&!n)return}const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);fO()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,DO):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},PO)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}pE.type="LOCAL";const xO=pE;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE extends dE{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}gE.type="SESSION";const mE=gE;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MO(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new Cl(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await MO(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Cl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rd(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LO{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=Rd("",20);r.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(h){const f=h;if(f.data.eventId===l)switch(f.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(f.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(){return window}function FO(t){Rn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yE(){return typeof Rn().WorkerGlobalScope<"u"&&typeof Rn().importScripts=="function"}async function UO(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $O(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function VO(){return yE()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _E="firebaseLocalStorageDb",BO=1,Pc="firebaseLocalStorage",vE="fbase_key";class sa{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function bl(t,e){return t.transaction([Pc],e?"readwrite":"readonly").objectStore(Pc)}function HO(){const t=indexedDB.deleteDatabase(_E);return new sa(t).toPromise()}function $h(){const t=indexedDB.open(_E,BO);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Pc,{keyPath:vE})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Pc)?e(s):(s.close(),await HO(),e(await $h()))})})}async function Fm(t,e,n){const s=bl(t,!0).put({[vE]:e,value:n});return new sa(s).toPromise()}async function jO(t,e){const n=bl(t,!1).get(e),s=await new sa(n).toPromise();return s===void 0?null:s.value}function Um(t,e){const n=bl(t,!0).delete(e);return new sa(n).toPromise()}const WO=800,KO=3;class wE{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await $h(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>KO)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return yE()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Cl._getInstance(VO()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await UO(),!this.activeServiceWorker)return;this.sender=new LO(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((n=s[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$O()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await $h();return await Fm(e,Oc,"1"),await Um(e,Oc),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Fm(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>jO(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Um(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=bl(r,!1).getAll();return new sa(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),WO)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}wE.type="LOCAL";const qO=wE;new Zo(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EE(t,e){return e?jn(e):(ce(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd extends uE{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Hr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Hr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Hr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function zO(t){return NO(t.auth,new kd(t),t.bypassAuthState)}function GO(t){const{auth:e,user:n}=t;return ce(n,e,"internal-error"),AO(n,new kd(t),t.bypassAuthState)}async function QO(t){const{auth:e,user:n}=t;return ce(n,e,"internal-error"),kO(n,new kd(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zO;case"linkViaPopup":case"linkViaRedirect":return QO;case"reauthViaPopup":case"reauthViaRedirect":return GO;default:On(this.auth,"internal-error")}}resolve(e){Jn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Jn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YO=new Zo(2e3,1e4);class Ar extends TE{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,Ar.currentPopupAction&&Ar.currentPopupAction.cancel(),Ar.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ce(e,this.auth,"internal-error"),e}async onExecution(){Jn(this.filter.length===1,"Popup operations only handle one event");const e=Rd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Sn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Sn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ar.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if(!((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Sn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,YO.get())};e()}}Ar.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JO="pendingRedirect",rc=new Map;class XO extends TE{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=rc.get(this.auth._key());if(!e){try{const s=await ZO(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}rc.set(this.auth._key(),e)}return this.bypassAuthState||rc.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ZO(t,e){const n=CE(e),s=IE(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}async function eP(t,e){return IE(t)._set(CE(e),"true")}function tP(t,e){rc.set(t._key(),e)}function IE(t){return jn(t._redirectPersistence)}function CE(t){return sc(JO,t.config.apiKey,t.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nP(t,e,n){return sP(t,e,n)}async function sP(t,e,n){const s=ta(t);z1(t,e,bd),await s._initializationPromise;const r=EE(s,n);return await eP(r,s),r._openRedirect(s,e,"signInViaRedirect")}async function rP(t,e,n=!1){const s=ta(t),r=EE(s,e),o=await new XO(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iP=10*60*1e3;class oP{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!aP(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!bE(e)){const r=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(Sn(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=iP&&this.cachedEventUids.clear(),this.cachedEventUids.has($m(e))}saveEventToCache(e){this.cachedEventUids.add($m(e)),this.lastProcessedEventTime=Date.now()}}function $m(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function bE({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function aP(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return bE(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cP(t,e={}){return ea(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lP=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,uP=/^https?/;async function hP(t){if(t.config.emulator)return;const{authorizedDomains:e}=await cP(t);for(const n of e)try{if(fP(n))return}catch{}On(t,"unauthorized-domain")}function fP(t){const e=Uh(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!uP.test(n))return!1;if(lP.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dP=new Zo(3e4,6e4);function Vm(){const t=Rn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function pP(t){return new Promise((e,n)=>{var s,r,i;function o(){Vm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Vm(),n(Sn(t,"network-request-failed"))},timeout:dP.get()})}if(!((r=(s=Rn().gapi)===null||s===void 0?void 0:s.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((i=Rn().gapi)===null||i===void 0)&&i.load)o();else{const a=gO("iframefcb");return Rn()[a]=()=>{gapi.load?o():n(Sn(t,"network-request-failed"))},cE(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw ic=null,e})}let ic=null;function gP(t){return ic=ic||pP(t),ic}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mP=new Zo(5e3,15e3),yP="__/auth/iframe",_P="emulator/auth/iframe",vP={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},wP=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function EP(t){const e=t.config;ce(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Td(e,_P):`https://${t.config.authDomain}/${yP}`,s={apiKey:e.apiKey,appName:t.name,v:Os},r=wP.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Ci(s).slice(1)}`}async function TP(t){const e=await gP(t),n=Rn().gapi;return ce(n,t,"internal-error"),e.open({where:document.body,url:EP(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:vP,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=Sn(t,"network-request-failed"),a=Rn().setTimeout(()=>{i(o)},mP.get());function c(){Rn().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IP={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},CP=500,bP=600,SP="_blank",RP="http://localhost";class Bm{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function kP(t,e,n,s=CP,r=bP){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c=Object.assign(Object.assign({},IP),{width:s.toString(),height:r.toString(),top:i,left:o}),l=It().toLowerCase();n&&(a=Zw(l)?SP:n),Xw(l)&&(e=e||RP,c.scrollbars="yes");const u=Object.entries(c).reduce((f,[d,p])=>`${f}${d}=${p},`,"");if(hO(l)&&a!=="_self")return AP(e||"",a),new Bm(null);const h=window.open(e||"",a,u);ce(h,t,"popup-blocked");try{h.focus()}catch{}return new Bm(h)}function AP(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NP="__/auth/handler",OP="emulator/auth/handler",PP=encodeURIComponent("fac");async function Hm(t,e,n,s,r,i){ce(t.config.authDomain,t,"auth-domain-config-required"),ce(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Os,eventId:r};if(e instanceof bd){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Ph(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,h]of Object.entries(i||{}))o[u]=h}if(e instanceof na){const u=e.getScopes().filter(h=>h!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${PP}=${encodeURIComponent(c)}`:"";return`${DP(t)}?${Ci(a).slice(1)}${l}`}function DP({config:t}){return t.emulator?Td(t,OP):`https://${t.authDomain}/${NP}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du="webStorageSupport";class xP{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=mE,this._completeRedirectFn=rP,this._overrideRedirectResult=tP}async _openPopup(e,n,s,r){var i;Jn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Hm(e,n,s,Uh(),r);return kP(e,o,Rd())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await Hm(e,n,s,Uh(),r);return FO(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(Jn(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await TP(e),s=new oP(e);return n.register("authEvent",r=>(ce(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Du,{type:Du},r=>{var i;const o=(i=r==null?void 0:r[0])===null||i===void 0?void 0:i[Du];o!==void 0&&n(!!o),On(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=hP(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return rE()||Cd()||Il()}}const MP=xP;var jm="@firebase/auth",Wm="0.23.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LP{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ce(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FP(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function UP(t){Nn(new fn("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;ce(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:iE(t)},l=new EO(s,r,i,c);return IO(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Nn(new fn("auth-internal",e=>{const n=ta(e.getProvider("auth").getImmediate());return(s=>new LP(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ht(jm,Wm,FP(t)),Ht(jm,Wm,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $P=5*60,VP=xw("authIdTokenMaxAge")||$P;let Km=null;const BP=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>VP)return;const r=n==null?void 0:n.token;Km!==r&&(Km=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Ad(t=vd()){const e=yd(t,"auth");if(e.isInitialized())return e.getImmediate();const n=TO(t,{popupRedirectResolver:MP,persistence:[qO,xO,mE]}),s=xw("authTokenSyncURL");if(s){const i=BP(s);fE(n,i,()=>i(n.currentUser)),Sd(n,o=>i(o))}const r=Pw("auth");return r&&CO(n,`http://${r}`),n}UP("Browser");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HP=new Map,jP={activated:!1,tokenObservers:[]};function dn(t){return HP.get(t)||Object.assign({},jP)}const qm={OFFSET_DURATION:5*60*1e3,RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WP{constructor(e,n,s,r,i){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=r,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=r,r>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new So,await KP(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new So,await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function KP(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qP={["already-initialized"]:"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.",["use-before-activation"]:"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.",["fetch-network-error"]:"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",["fetch-parse-error"]:"Fetch client could not parse response. Original error: {$originalErrorMessage}.",["fetch-status-error"]:"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",["storage-open"]:"Error thrown when opening storage. Original error: {$originalErrorMessage}.",["storage-get"]:"Error thrown when reading from storage. Original error: {$originalErrorMessage}.",["storage-set"]:"Error thrown when writing to storage. Original error: {$originalErrorMessage}.",["recaptcha-error"]:"ReCAPTCHA error.",throttled:"Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}"},Dc=new Ii("appCheck","AppCheck",qP);function SE(t){if(!dn(t).activated)throw Dc.create("use-before-activation",{appName:t.name})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zP="firebase-app-check-database",GP=1,Vh="firebase-app-check-store";let $a=null;function QP(){return $a||($a=new Promise((t,e)=>{try{const n=indexedDB.open(zP,GP);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{var r;e(Dc.create("storage-open",{originalErrorMessage:(r=s.target.error)===null||r===void 0?void 0:r.message}))},n.onupgradeneeded=s=>{const r=s.target.result;switch(s.oldVersion){case 0:r.createObjectStore(Vh,{keyPath:"compositeKey"})}}}catch(n){e(Dc.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}}),$a)}function YP(t,e){return JP(XP(t),e)}async function JP(t,e){const s=(await QP()).transaction(Vh,"readwrite"),i=s.objectStore(Vh).put({compositeKey:t,value:e});return new Promise((o,a)=>{i.onsuccess=c=>{o()},s.onerror=c=>{var l;a(Dc.create("storage-set",{originalErrorMessage:(l=c.target.error)===null||l===void 0?void 0:l.message}))}})}function XP(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bh=new Xo("@firebase/app-check");function zm(t,e){return Fw()?YP(t,e).catch(n=>{Bh.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZP={error:"UNKNOWN_ERROR"};function eD(t){return El.encodeString(JSON.stringify(t),!1)}async function Hh(t,e=!1){const n=t.app;SE(n);const s=dn(n);let r=s.token,i;if(r&&!qi(r)&&(s.token=void 0,r=void 0),!r){const c=await s.cachedTokenPromise;c&&(qi(c)?r=c:await zm(n,void 0))}if(!e&&r&&qi(r))return{token:r.token};let o=!1;try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),o=!0),r=await dn(n).exchangeTokenPromise}catch(c){c.code==="appCheck/throttled"?Bh.warn(c.message):Bh.error(c),i=c}let a;return r?i?qi(r)?a={token:r.token,internalError:i}:a=Qm(i):(a={token:r.token},s.token=r,await zm(n,r)):a=Qm(i),o&&rD(n,a),a}async function tD(t){const e=t.app;SE(e);const{provider:n}=dn(e);{const{token:s}=await n.getToken();return{token:s}}}function nD(t,e,n,s){const{app:r}=t,i=dn(r),o={next:n,error:s,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&qi(i.token)){const a=i.token;Promise.resolve().then(()=>{n({token:a.token}),Gm(t)}).catch(()=>{})}i.cachedTokenPromise.then(()=>Gm(t))}function RE(t,e){const n=dn(t),s=n.tokenObservers.filter(r=>r.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function Gm(t){const{app:e}=t,n=dn(e);let s=n.tokenRefresher;s||(s=sD(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function sD(t){const{app:e}=t;return new WP(async()=>{const n=dn(e);let s;if(n.token?s=await Hh(t,!0):s=await Hh(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=dn(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const r=n.token.expireTimeMillis-5*60*1e3;return s=Math.min(s,r),Math.max(0,s-Date.now())}else return 0},qm.RETRIAL_MIN_WAIT,qm.RETRIAL_MAX_WAIT)}function rD(t,e){const n=dn(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function qi(t){return t.expireTimeMillis-Date.now()>0}function Qm(t){return{token:eD(ZP),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iD{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=dn(this.app);for(const n of e)RE(this.app,n.next);return Promise.resolve()}}function oD(t,e){return new iD(t,e)}function aD(t){return{getToken:e=>Hh(t,e),getLimitedUseToken:()=>tD(t),addTokenListener:e=>nD(t,"INTERNAL",e),removeTokenListener:e=>RE(t.app,e)}}const cD="@firebase/app-check",lD="0.8.0",uD="app-check",Ym="app-check-internal";function hD(){Nn(new fn(uD,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return oD(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(Ym).initialize()})),Nn(new fn(Ym,t=>{const e=t.getProvider("app-check").getImmediate();return aD(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),Ht(cD,lD)}hD();var fD="firebase",dD="9.22.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ht(fD,dD,"app");const kE=Symbol("firebaseApp");function Sl(t){return Qo()&&At(kE,null)||vd(t)}const En=()=>{};function Nd(t,e){return e.split(".").reduce((n,s)=>n&&n[s],t)}function pD(t,e,n){const s=(""+e).split("."),r=s.pop(),i=s.reduce((o,a)=>o&&o[a],t);if(i!=null)return Array.isArray(i)?i.splice(Number(r),1,n):i[r]=n}function fr(t){return!!t&&typeof t=="object"}const gD=Object.prototype;function mD(t){return fr(t)&&Object.getPrototypeOf(t)===gD}function Od(t){return fr(t)&&t.type==="document"}function AE(t){return fr(t)&&t.type==="collection"}function yD(t){return Od(t)||AE(t)}function _D(t){return fr(t)&&t.type==="query"}function vD(t){return fr(t)&&"ref"in t}function wD(t){return fr(t)&&typeof t.bucket=="string"}function ED(t,e){let n;return()=>{if(!n)return n=!0,t(e())}}function TD(){return!!(Qo()&&At(Vv,null))}const Va=new WeakMap;function ID(t,e){if(!Va.has(t)){const n=$f(!0);Va.set(t,n);const{unmount:s}=e;e.unmount=()=>{s.call(e),n.stop(),Va.delete(t)}}return Va.get(t)}const CD=new WeakMap,Ba=new WeakMap;function NE(t){const e=Sl(t);if(!Ba.has(e)){let n;const r=[new Promise(i=>{n=i}),i=>{Ba.set(e,i),n(i.value)}];Ba.set(e,r)}return Ba.get(e)}function bD(t){const e=NE(t);return Array.isArray(e)?e[0]:Promise.resolve(e.value)}function SD(t,e){const n=Ad(e);Sd(n,s=>{const r=NE();t.value=s,Array.isArray(r)&&r[1](t)})}const Jm="@firebase/database",Xm="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let OE="";function RD(t){OE=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kD{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ct(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Ro(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AD{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return ss(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PE=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new kD(e)}}catch{}return new AD},js=PE("localStorage"),jh=PE("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jr=new Xo("@firebase/database"),ND=function(){let t=1;return function(){return t++}}(),DE=function(t){const e=$N(t),n=new xN;n.update(e);const s=n.digest();return El.encodeByteArray(s)},ra=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=ra.apply(null,s):typeof s=="object"?e+=ct(s):e+=s,e+=" "}return e};let Xs=null,Zm=!0;const OD=function(t,e){$(!e||t===!0||t===!1,"Can't turn on custom loggers persistently."),t===!0?(jr.logLevel=_e.VERBOSE,Xs=jr.log.bind(jr),e&&jh.set("logging_enabled",!0)):typeof t=="function"?Xs=t:(Xs=null,jh.remove("logging_enabled"))},dt=function(...t){if(Zm===!0&&(Zm=!1,Xs===null&&jh.get("logging_enabled")===!0&&OD(!0)),Xs){const e=ra.apply(null,t);Xs(e)}},ia=function(t){return function(...e){dt(t,...e)}},Wh=function(...t){const e="FIREBASE INTERNAL ERROR: "+ra(...t);jr.error(e)},sr=function(...t){const e=`FIREBASE FATAL ERROR: ${ra(...t)}`;throw jr.error(e),new Error(e)},jt=function(...t){const e="FIREBASE WARNING: "+ra(...t);jr.warn(e)},PD=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&jt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},xE=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},DD=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},ai="[MIN_NAME]",rr="[MAX_NAME]",bi=function(t,e){if(t===e)return 0;if(t===ai||e===rr)return-1;if(e===ai||t===rr)return 1;{const n=ey(t),s=ey(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},xD=function(t,e){return t===e?0:t<e?-1:1},Fi=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ct(e))},Pd=function(t){if(typeof t!="object"||t===null)return ct(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=ct(e[s]),n+=":",n+=Pd(t[e[s]]);return n+="}",n},ME=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let r=0;r<n;r+=e)r+e>n?s.push(t.substring(r,n)):s.push(t.substring(r,r+e));return s};function en(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const LE=function(t){$(!xE(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let r,i,o,a,c;t===0?(i=0,o=0,r=1/t===-1/0?1:0):(r=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),i=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-s-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(i%2?1:0),i=Math.floor(i/2);l.push(r?1:0),l.reverse();const u=l.join("");let h="";for(c=0;c<64;c+=8){let f=parseInt(u.substr(c,8),2).toString(16);f.length===1&&(f="0"+f),h=h+f}return h.toLowerCase()},MD=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},LD=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"},FD=new RegExp("^-?(0*)\\d{1,10}$"),UD=-2147483648,$D=2147483647,ey=function(t){if(FD.test(t)){const e=Number(t);if(e>=UD&&e<=$D)return e}return null},oa=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw jt("Exception was thrown by user callback.",n),e},Math.floor(0))}},VD=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},oo=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BD{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(s=>this.appCheck=s)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){jt(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HD{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(dt("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',jt(e)}}class Kh{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Kh.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd="5",FE="v",UE="s",$E="r",VE="f",BE=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,HE="ls",jE="p",qh="ac",WE="websocket",KE="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jD{constructor(e,n,s,r,i=!1,o="",a=!1,c=!1){this.secure=n,this.namespace=s,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=js.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&js.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function WD(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function qE(t,e,n){$(typeof e=="string","typeof type must == string"),$(typeof n=="object","typeof params must == object");let s;if(e===WE)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===KE)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);WD(t)&&(n.ns=t.namespace);const r=[];return en(n,(i,o)=>{r.push(i+"="+o)}),s+r.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KD{constructor(){this.counters_={}}incrementCounter(e,n=1){ss(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return _N(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xu={},Mu={};function xd(t){const e=t.toString();return xu[e]||(xu[e]=new KD),xu[e]}function qD(t,e){const n=t.toString();return Mu[n]||(Mu[n]=e()),Mu[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zD{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<s.length;++r)s[r]&&oa(()=>{this.onMessage_(s[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty="start",GD="close",QD="pLPCommand",YD="pRTLPCB",zE="id",GE="pw",QE="ser",JD="cb",XD="seg",ZD="ts",ex="d",tx="dframe",YE=1870,JE=30,nx=YE-JE,sx=25e3,rx=3e4;class Nr{constructor(e,n,s,r,i,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ia(e),this.stats_=xd(n),this.urlFn=c=>(this.appCheckToken&&(c[qh]=this.appCheckToken),qE(n,KE,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new zD(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(rx)),DD(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Md((...i)=>{const[o,a,c,l,u]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ty)this.id=a,this.password=c;else if(o===GD)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,a]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[ty]="t",s[QE]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[JD]=this.scriptTagHolder.uniqueCallbackIdentifier),s[FE]=Dd,this.transportSessionId&&(s[UE]=this.transportSessionId),this.lastSessionId&&(s[HE]=this.lastSessionId),this.applicationId&&(s[jE]=this.applicationId),this.appCheckToken&&(s[qh]=this.appCheckToken),typeof location<"u"&&location.hostname&&BE.test(location.hostname)&&(s[$E]=VE);const r=this.urlFn(s);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Nr.forceAllow_=!0}static forceDisallow(){Nr.forceDisallow_=!0}static isAvailable(){return Nr.forceAllow_?!0:!Nr.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!MD()&&!LD()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ct(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Nw(n),r=ME(s,nx);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[tx]="t",s[zE]=e,s[GE]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ct(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Md{constructor(e,n,s,r){this.onDisconnect=s,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ND(),window[QD+this.uniqueCallbackIdentifier]=e,window[YD+this.uniqueCallbackIdentifier]=n,this.myIFrame=Md.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){dt("frame writing exception"),a.stack&&dt(a.stack),dt(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||dt("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[zE]=this.myID,e[GE]=this.myPW,e[QE]=this.currentSerial;let n=this.urlFn(e),s="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+JE+s.length<=YE;){const o=this.pendingSegs.shift();s=s+"&"+XD+r+"="+o.seg+"&"+ZD+r+"="+o.ts+"&"+ex+r+"="+o.d,r++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},r=setTimeout(s,Math.floor(sx)),i=()=>{clearTimeout(r),s()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const r=s.readyState;(!r||r==="loaded"||r==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{dt("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ix=16384,ox=45e3;let xc=null;typeof MozWebSocket<"u"?xc=MozWebSocket:typeof WebSocket<"u"&&(xc=WebSocket);class rn{constructor(e,n,s,r,i,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ia(this.connId),this.stats_=xd(n),this.connURL=rn.connectionURL_(n,o,a,r,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,r,i){const o={};return o[FE]=Dd,typeof location<"u"&&location.hostname&&BE.test(location.hostname)&&(o[$E]=VE),n&&(o[UE]=n),s&&(o[HE]=s),r&&(o[qh]=r),i&&(o[jE]=i),qE(e,WE,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,js.set("previous_websocket_failure",!0);try{let s;Lw(),this.mySock=new xc(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){rn.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&xc!==null&&!rn.forceDisallow_}static previouslyFailed(){return js.isInMemoryStorage||js.get("previous_websocket_failure")===!0}markConnectionHealthy(){js.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=Ro(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if($(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=ct(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=ME(n,ix);s.length>1&&this.sendString_(String(s.length));for(let r=0;r<s.length;r++)this.sendString_(s[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(ox))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}rn.responsesRequiredToBeHealthy=2;rn.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Nr,rn]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=rn&&rn.isAvailable();let s=n&&!rn.previouslyFailed();if(e.webSocketOnly&&(n||jt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[rn];else{const r=this.transports_=[];for(const i of Oo.ALL_TRANSPORTS)i&&i.isAvailable()&&r.push(i);Oo.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Oo.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ax=6e4,cx=5e3,lx=10*1024,ux=100*1024,Lu="t",ny="d",hx="s",sy="r",fx="e",ry="o",iy="a",oy="n",ay="p",dx="h";class px{constructor(e,n,s,r,i,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ia("c:"+this.id+":"),this.transportManager_=new Oo(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=oo(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>ux?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>lx?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Lu in e){const n=e[Lu];n===iy?this.upgradeIfSecondaryHealthy_():n===sy?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===ry&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Fi("t",e),s=Fi("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ay,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:iy,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:oy,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Fi("t",e),s=Fi("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Fi(Lu,e);if(ny in e){const s=e[ny];if(n===dx){const r=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(n===oy){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===hx?this.onConnectionShutdown_(s):n===sy?this.onReset_(s):n===fx?Wh("Server Error: "+s):n===ry?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Wh("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Dd!==s&&jt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),oo(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ax))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):oo(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(cx))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ay,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(js.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XE{put(e,n,s,r){}merge(e,n,s,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZE{constructor(e){this.allowedEvents_=e,this.listeners_={},$(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let r=0;r<s.length;r++)s[r].callback.apply(s[r].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const r=this.getInitialEvent(e);r&&n.apply(s,r)}off(e,n,s){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===n&&(!s||s===r[i].context)){r.splice(i,1);return}}validateEventType_(e){$(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc extends ZE{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!gd()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Mc}getInitialEvent(e){return $(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy=32,ly=768;class Ue{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[s]=this.pieces_[r],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function ke(){return new Ue("")}function ge(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Ss(t){return t.pieces_.length-t.pieceNum_}function xe(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new Ue(t.pieces_,e)}function e0(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function gx(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function t0(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function n0(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new Ue(e,0)}function et(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof Ue)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let r=0;r<s.length;r++)s[r].length>0&&n.push(s[r])}return new Ue(n,0)}function fe(t){return t.pieceNum_>=t.pieces_.length}function Xt(t,e){const n=ge(t),s=ge(e);if(n===null)return e;if(n===s)return Xt(xe(t),xe(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function s0(t,e){if(Ss(t)!==Ss(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function on(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(Ss(t)>Ss(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class mx{constructor(e,n){this.errorPrefix_=n,this.parts_=t0(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Tl(this.parts_[s]);r0(this)}}function yx(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Tl(e),r0(t)}function _x(t){const e=t.parts_.pop();t.byteLength_-=Tl(e),t.parts_.length>0&&(t.byteLength_-=1)}function r0(t){if(t.byteLength_>ly)throw new Error(t.errorPrefix_+"has a key path longer than "+ly+" bytes ("+t.byteLength_+").");if(t.parts_.length>cy)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+cy+") or object contains a cycle "+$s(t))}function $s(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld extends ZE{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}static getInstance(){return new Ld}getInitialEvent(e){return $(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui=1e3,vx=60*5*1e3,uy=30*1e3,wx=1.3,Ex=3e4,Tx="server_kill",hy=3;class zn extends XE{constructor(e,n,s,r,i,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=zn.nextPersistentConnectionId_++,this.log_=ia("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ui,this.maxReconnectDelay_=vx,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c&&!Lw())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ld.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Mc.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const r=++this.requestNumber_,i={r,a:e,b:n};this.log_(ct(i)),$(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),s&&(this.requestCBHash_[r]=s)}get(e){this.initConnection_();const n=new So,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,s,r){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),$(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),$(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:n,query:e,tag:s};this.listens.get(o).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),r=n._queryIdentifier;this.log_("Listen on "+s+" for "+r);const i={p:s},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,a=>{const c=a.d,l=a.s;zn.warnOnListenWarnings_(c,n),(this.listens.get(s)&&this.listens.get(s).get(r))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(s,r),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&ss(e,"w")){const s=ii(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const r='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();jt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||DN(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=uy)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=PN(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,r=>{const i=r.s,o=r.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+r),$(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,r)&&this.connected_&&this.sendUnlisten_(s,r,e._queryObject,n)}sendUnlisten_(e,n,s,r){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";r&&(i.q=s,i.t=r),this.sendRequest(o,i)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,r){const i={p:n,d:s};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{r&&setTimeout(()=>{r(o.s,o.d)},Math.floor(0))})}put(e,n,s,r){this.putInternal("p",e,n,s,r)}merge(e,n,s,r){this.putInternal("m",e,n,s,r)}putInternal(e,n,s,r,i){this.initConnection_();const o={p:n,d:s};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const i=s.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ct(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Wh("Unrecognized action received from server: "+ct(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){$(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ui,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ui,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Ex&&(this.reconnectDelay_=Ui),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*wx)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+zn.nextConnectionId_++,i=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,s())},l=function(h){$(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,f]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?dt("getToken() completed but was canceled"):(dt("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=f&&f.token,a=new px(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,d=>{jt(d+" ("+this.repoInfo_.toString()+")"),this.interrupt(Tx)},i))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&jt(h),c())}}}interrupt(e){dt("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){dt("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ph(this.interruptReasons_)&&(this.reconnectDelay_=Ui,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(i=>Pd(i)).join("$"):s="default";const r=this.removeListen_(e,s);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,n){const s=new Ue(e).toString();let r;if(this.listens.has(s)){const i=this.listens.get(s);r=i.get(n),i.delete(n),i.size===0&&this.listens.delete(s)}else r=void 0;return r}onAuthRevoked_(e,n){dt("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=hy&&(this.reconnectDelay_=uy,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){dt("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=hy&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+OE.replace(/\./g,"-")]=1,gd()?e["framework.cordova"]=1:Mw()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Mc.getInstance().currentlyOnline();return Ph(this.interruptReasons_)&&e}}zn.nextPersistentConnectionId_=0;zn.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new me(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new me(ai,e),r=new me(ai,n);return this.compare(s,r)!==0}minPost(){return me.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ha;class i0 extends Rl{static get __EMPTY_NODE(){return Ha}static set __EMPTY_NODE(e){Ha=e}compare(e,n){return bi(e.name,n.name)}isDefinedOn(e){throw Ti("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return me.MIN}maxPost(){return new me(rr,Ha)}makePost(e,n){return $(typeof e=="string","KeyIndex indexValue must always be a string."),new me(e,Ha)}toString(){return".key"}}const Wr=new i0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e,n,s,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,r&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ze{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??Ze.RED,this.left=r??Ft.EMPTY_NODE,this.right=i??Ft.EMPTY_NODE}copy(e,n,s,r,i){return new Ze(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return i<0?r=r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r=r.copy(null,n,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return Ft.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,r;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return Ft.EMPTY_NODE;r=s.right.min_(),s=s.copy(r.key,r.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ze.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ze.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ze.RED=!0;Ze.BLACK=!1;class Ix{copy(e,n,s,r,i){return this}insert(e,n,s){return new Ze(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Ft{constructor(e,n=Ft.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Ft(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Ze.BLACK,null,null))}remove(e){return new Ft(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ze.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,r=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return r?r.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(r=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ja(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new ja(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new ja(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new ja(this.root_,null,this.comparator_,!0,e)}}Ft.EMPTY_NODE=new Ix;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cx(t,e){return bi(t.name,e.name)}function Fd(t,e){return bi(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zh;function bx(t){zh=t}const o0=function(t){return typeof t=="number"?"number:"+LE(t):"string:"+t},a0=function(t){if(t.isLeafNode()){const e=t.val();$(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ss(e,".sv"),"Priority must be a string or number.")}else $(t===zh||t.isEmpty(),"priority of unexpected type.");$(t===zh||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fy;class Je{constructor(e,n=Je.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,$(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),a0(this.priorityNode_)}static set __childrenNodeConstructor(e){fy=e}static get __childrenNodeConstructor(){return fy}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Je(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Je.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return fe(e)?this:ge(e)===".priority"?this.priorityNode_:Je.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Je.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=ge(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:($(s!==".priority"||Ss(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,Je.__childrenNodeConstructor.EMPTY_NODE.updateChild(xe(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+o0(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=LE(this.value_):e+=this.value_,this.lazyHash_=DE(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Je.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Je.__childrenNodeConstructor?-1:($(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,r=Je.VALUE_TYPE_ORDER.indexOf(n),i=Je.VALUE_TYPE_ORDER.indexOf(s);return $(r>=0,"Unknown leaf type: "+n),$(i>=0,"Unknown leaf type: "+s),r===i?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Je.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let c0,l0;function Sx(t){c0=t}function Rx(t){l0=t}class kx extends Rl{compare(e,n){const s=e.node.getPriority(),r=n.node.getPriority(),i=s.compareTo(r);return i===0?bi(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return me.MIN}maxPost(){return new me(rr,new Je("[PRIORITY-POST]",l0))}makePost(e,n){const s=c0(e);return new me(n,new Je("[PRIORITY-POST]",s))}toString(){return".priority"}}const vt=new kx;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ax=Math.log(2);class Nx{constructor(e){const n=i=>parseInt(Math.log(i)/Ax,10),s=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const r=s(this.count);this.bits_=e+1&r}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Lc=function(t,e,n,s){t.sort(e);const r=function(c,l){const u=l-c;let h,f;if(u===0)return null;if(u===1)return h=t[c],f=n?n(h):h,new Ze(f,h.node,Ze.BLACK,null,null);{const d=parseInt(u/2,10)+c,p=r(c,d),y=r(d+1,l);return h=t[d],f=n?n(h):h,new Ze(f,h.node,Ze.BLACK,p,y)}},i=function(c){let l=null,u=null,h=t.length;const f=function(p,y){const E=h-p,v=h;h-=p;const g=r(E+1,v),T=t[E],w=n?n(T):T;d(new Ze(w,T.node,y,null,g))},d=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const y=c.nextBitIsOne(),E=Math.pow(2,c.count-(p+1));y?f(E,Ze.BLACK):(f(E,Ze.BLACK),f(E,Ze.RED))}return u},o=new Nx(t.length),a=i(o);return new Ft(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fu;const Ir={};class Wn{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return $(Ir&&vt,"ChildrenNode.ts has not been loaded"),Fu=Fu||new Wn({".priority":Ir},{".priority":vt}),Fu}get(e){const n=ii(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Ft?n:null}hasIndex(e){return ss(this.indexSet_,e.toString())}addIndex(e,n){$(e!==Wr,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let r=!1;const i=n.getIterator(me.Wrap);let o=i.getNext();for(;o;)r=r||e.isDefinedOn(o.node),s.push(o),o=i.getNext();let a;r?a=Lc(s,e.getCompare()):a=Ir;const c=e.toString(),l=Object.assign({},this.indexSet_);l[c]=e;const u=Object.assign({},this.indexes_);return u[c]=a,new Wn(u,l)}addToIndexes(e,n){const s=bc(this.indexes_,(r,i)=>{const o=ii(this.indexSet_,i);if($(o,"Missing index implementation for "+i),r===Ir)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(me.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Lc(a,o.getCompare())}else return Ir;else{const a=n.get(e.name);let c=r;return a&&(c=c.remove(new me(e.name,a))),c.insert(e,e.node)}});return new Wn(s,this.indexSet_)}removeFromIndexes(e,n){const s=bc(this.indexes_,r=>{if(r===Ir)return r;{const i=n.get(e.name);return i?r.remove(new me(e.name,i)):r}});return new Wn(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $i;class Ie{constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&a0(this.priorityNode_),this.children_.isEmpty()&&$(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return $i||($i=new Ie(new Ft(Fd),null,Wn.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||$i}updatePriority(e){return this.children_.isEmpty()?this:new Ie(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?$i:n}}getChild(e){const n=ge(e);return n===null?this:this.getImmediateChild(n).getChild(xe(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if($(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new me(e,n);let r,i;n.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(s,this.children_)):(r=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(s,this.children_));const o=r.isEmpty()?$i:this.priorityNode_;return new Ie(r,o,i)}}updateChild(e,n){const s=ge(e);if(s===null)return n;{$(ge(e)!==".priority"||Ss(e)===1,".priority must be the last token in a path");const r=this.getImmediateChild(s).updateChild(xe(e),n);return this.updateImmediateChild(s,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,r=0,i=!0;if(this.forEachChild(vt,(o,a)=>{n[o]=a.val(e),s++,i&&Ie.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):i=!1}),!e&&i&&r<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+o0(this.getPriority().val())+":"),this.forEachChild(vt,(n,s)=>{const r=s.hash();r!==""&&(e+=":"+n+":"+r)}),this.lazyHash_=e===""?"":DE(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const r=this.resolveIndex_(s);if(r){const i=r.getPredecessorKey(new me(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new me(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new me(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(r=>n(r.name,r.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,r=>r);{const r=this.children_.getIteratorFrom(e.name,me.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)<0;)r.getNext(),i=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,r=>r);{const r=this.children_.getReverseIteratorFrom(e.name,me.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)>0;)r.getNext(),i=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===aa?-1:0}withIndex(e){if(e===Wr||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new Ie(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Wr||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(vt),r=n.getIterator(vt);let i=s.getNext(),o=r.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=s.getNext(),o=r.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Wr?null:this.indexMap_.get(e.toString())}}Ie.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Ox extends Ie{constructor(){super(new Ft(Fd),Ie.EMPTY_NODE,Wn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return Ie.EMPTY_NODE}isEmpty(){return!1}}const aa=new Ox;Object.defineProperties(me,{MIN:{value:new me(ai,Ie.EMPTY_NODE)},MAX:{value:new me(rr,aa)}});i0.__EMPTY_NODE=Ie.EMPTY_NODE;Je.__childrenNodeConstructor=Ie;bx(aa);Rx(aa);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Px=!0;function pt(t,e=null){if(t===null)return Ie.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),$(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Je(n,pt(e))}if(!(t instanceof Array)&&Px){const n=[];let s=!1;if(en(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=pt(a);c.isEmpty()||(s=s||!c.getPriority().isEmpty(),n.push(new me(o,c)))}}),n.length===0)return Ie.EMPTY_NODE;const i=Lc(n,Cx,o=>o.name,Fd);if(s){const o=Lc(n,vt.getCompare());return new Ie(i,pt(e),new Wn({".priority":o},{".priority":vt}))}else return new Ie(i,pt(e),Wn.Default)}else{let n=Ie.EMPTY_NODE;return en(t,(s,r)=>{if(ss(t,s)&&s.substring(0,1)!=="."){const i=pt(r);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(s,i))}}),n.updatePriority(pt(e))}}Sx(pt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dx extends Rl{constructor(e){super(),this.indexPath_=e,$(!fe(e)&&ge(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),r=this.extractChild(n.node),i=s.compareTo(r);return i===0?bi(e.name,n.name):i}makePost(e,n){const s=pt(e),r=Ie.EMPTY_NODE.updateChild(this.indexPath_,s);return new me(n,r)}maxPost(){const e=Ie.EMPTY_NODE.updateChild(this.indexPath_,aa);return new me(rr,e)}toString(){return t0(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xx extends Rl{compare(e,n){const s=e.node.compareTo(n.node);return s===0?bi(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return me.MIN}maxPost(){return me.MAX}makePost(e,n){const s=pt(e);return new me(n,s)}toString(){return".value"}}const Mx=new xx;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lx(t){return{type:"value",snapshotNode:t}}function Fx(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Ux(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function dy(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function $x(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=vt}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return $(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return $(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ai}hasEnd(){return this.endSet_}getIndexEndValue(){return $(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return $(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:rr}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return $(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===vt}copy(){const e=new Ud;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function py(t){const e={};if(t.isDefault())return e;let n;if(t.index_===vt?n="$priority":t.index_===Mx?n="$value":t.index_===Wr?n="$key":($(t.index_ instanceof Dx,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ct(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=ct(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+ct(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=ct(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+ct(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function gy(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==vt&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc extends XE{constructor(e,n,s,r){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=r,this.log_=ia("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:($(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,s,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=Fc.getListenId_(e,s),a={};this.listens_[o]=a;const c=py(e._queryParams);this.restRequest_(i+".json",c,(l,u)=>{let h=u;if(l===404&&(h=null,l=null),l===null&&this.onDataUpdate_(i,h,!1,s),ii(this.listens_,o)===a){let f;l?l===401?f="permission_denied":f="rest_error:"+l:f="ok",r(f,null)}})}unlisten(e,n){const s=Fc.getListenId_(e,n);delete this.listens_[s]}get(e){const n=py(e._queryParams),s=e._path.toString(),r=new So;return this.restRequest_(s+".json",n,(i,o)=>{let a=o;i===404&&(a=null,i=null),i===null?(this.onDataUpdate_(s,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(n.auth=r.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Ci(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Ro(a.responseText)}catch{jt("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,c)}else a.status!==401&&a.status!==404&&jt("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vx{constructor(){this.rootNode_=Ie.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uc(){return{value:null,children:new Map}}function u0(t,e,n){if(fe(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=ge(e);t.children.has(s)||t.children.set(s,Uc());const r=t.children.get(s);e=xe(e),u0(r,e,n)}}function Gh(t,e,n){t.value!==null?n(e,t.value):Bx(t,(s,r)=>{const i=new Ue(e.toString()+"/"+s);Gh(r,i,n)})}function Bx(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hx{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&en(this.last_,(s,r)=>{n[s]=n[s]-r}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const my=10*1e3,jx=30*1e3,Wx=5*60*1e3;class Kx{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Hx(e);const s=my+(jx-my)*Math.random();oo(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;en(e,(r,i)=>{i>0&&ss(this.statsToReport_,r)&&(n[r]=i,s=!0)}),s&&this.server_.reportStats(n),oo(this.reportStats_.bind(this),Math.floor(Math.random()*2*Wx))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Tn;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Tn||(Tn={}));function h0(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function f0(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function d0(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=Tn.ACK_USER_WRITE,this.source=h0()}operationForChild(e){if(fe(this.path)){if(this.affectedTree.value!=null)return $(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new Ue(e));return new $c(ke(),n,this.revert)}}else return $(ge(this.path)===e,"operationForChild called for unrelated child."),new $c(xe(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=Tn.OVERWRITE}operationForChild(e){return fe(this.path)?new ir(this.source,ke(),this.snap.getImmediateChild(e)):new ir(this.source,xe(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=Tn.MERGE}operationForChild(e){if(fe(this.path)){const n=this.children.subtree(new Ue(e));return n.isEmpty()?null:n.value?new ir(this.source,ke(),n.value):new Po(this.source,ke(),n)}else return $(ge(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Po(this.source,xe(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(fe(e))return this.isFullyInitialized()&&!this.filtered_;const n=ge(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}function qx(t,e,n,s){const r=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push($x(o.childName,o.snapshotNode))}),Vi(t,r,"child_removed",e,s,n),Vi(t,r,"child_added",e,s,n),Vi(t,r,"child_moved",i,s,n),Vi(t,r,"child_changed",e,s,n),Vi(t,r,"value",e,s,n),r}function Vi(t,e,n,s,r,i){const o=s.filter(a=>a.type===n);o.sort((a,c)=>Gx(t,a,c)),o.forEach(a=>{const c=zx(t,a,i);r.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function zx(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Gx(t,e,n){if(e.childName==null||n.childName==null)throw Ti("Should only compare child_ events.");const s=new me(e.childName,e.snapshotNode),r=new me(n.childName,n.snapshotNode);return t.index_.compare(s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p0(t,e){return{eventCache:t,serverCache:e}}function ao(t,e,n,s){return p0(new $d(e,n,s),t.serverCache)}function g0(t,e,n,s){return p0(t.eventCache,new $d(e,n,s))}function Qh(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function or(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Uu;const Qx=()=>(Uu||(Uu=new Ft(xD)),Uu);class Pe{constructor(e,n=Qx()){this.value=e,this.children=n}static fromObject(e){let n=new Pe(null);return en(e,(s,r)=>{n=n.set(new Ue(s),r)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:ke(),value:this.value};if(fe(e))return null;{const s=ge(e),r=this.children.get(s);if(r!==null){const i=r.findRootMostMatchingPathAndValue(xe(e),n);return i!=null?{path:et(new Ue(s),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(fe(e))return this;{const n=ge(e),s=this.children.get(n);return s!==null?s.subtree(xe(e)):new Pe(null)}}set(e,n){if(fe(e))return new Pe(n,this.children);{const s=ge(e),i=(this.children.get(s)||new Pe(null)).set(xe(e),n),o=this.children.insert(s,i);return new Pe(this.value,o)}}remove(e){if(fe(e))return this.children.isEmpty()?new Pe(null):new Pe(null,this.children);{const n=ge(e),s=this.children.get(n);if(s){const r=s.remove(xe(e));let i;return r.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,r),this.value===null&&i.isEmpty()?new Pe(null):new Pe(this.value,i)}else return this}}get(e){if(fe(e))return this.value;{const n=ge(e),s=this.children.get(n);return s?s.get(xe(e)):null}}setTree(e,n){if(fe(e))return n;{const s=ge(e),i=(this.children.get(s)||new Pe(null)).setTree(xe(e),n);let o;return i.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,i),new Pe(this.value,o)}}fold(e){return this.fold_(ke(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((r,i)=>{s[r]=i.fold_(et(e,r),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,ke(),n)}findOnPath_(e,n,s){const r=this.value?s(n,this.value):!1;if(r)return r;if(fe(e))return null;{const i=ge(e),o=this.children.get(i);return o?o.findOnPath_(xe(e),et(n,i),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,ke(),n)}foreachOnPath_(e,n,s){if(fe(e))return this;{this.value&&s(n,this.value);const r=ge(e),i=this.children.get(r);return i?i.foreachOnPath_(xe(e),et(n,r),s):new Pe(null)}}foreach(e){this.foreach_(ke(),e)}foreach_(e,n){this.children.inorderTraversal((s,r)=>{r.foreach_(et(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e){this.writeTree_=e}static empty(){return new ln(new Pe(null))}}function co(t,e,n){if(fe(e))return new ln(new Pe(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const r=s.path;let i=s.value;const o=Xt(r,e);return i=i.updateChild(o,n),new ln(t.writeTree_.set(r,i))}else{const r=new Pe(n),i=t.writeTree_.setTree(e,r);return new ln(i)}}}function yy(t,e,n){let s=t;return en(n,(r,i)=>{s=co(s,et(e,r),i)}),s}function _y(t,e){if(fe(e))return ln.empty();{const n=t.writeTree_.setTree(e,new Pe(null));return new ln(n)}}function Yh(t,e){return dr(t,e)!=null}function dr(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Xt(n.path,e)):null}function vy(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(vt,(s,r)=>{e.push(new me(s,r))}):t.writeTree_.children.inorderTraversal((s,r)=>{r.value!=null&&e.push(new me(s,r.value))}),e}function Is(t,e){if(fe(e))return t;{const n=dr(t,e);return n!=null?new ln(new Pe(n)):new ln(t.writeTree_.subtree(e))}}function Jh(t){return t.writeTree_.isEmpty()}function ci(t,e){return m0(ke(),t.writeTree_,e)}function m0(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((r,i)=>{r===".priority"?($(i.value!==null,"Priority writes must always be leaf nodes"),s=i.value):n=m0(et(t,r),i,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(et(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y0(t,e){return T0(e,t)}function Yx(t,e,n,s,r){$(s>t.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:r}),r&&(t.visibleWrites=co(t.visibleWrites,e,n)),t.lastWriteId=s}function Jx(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function Xx(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);$(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let r=s.visible,i=!1,o=t.allWrites.length-1;for(;r&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&Zx(a,s.path)?r=!1:on(s.path,a.path)&&(i=!0)),o--}if(r){if(i)return eM(t),!0;if(s.snap)t.visibleWrites=_y(t.visibleWrites,s.path);else{const a=s.children;en(a,c=>{t.visibleWrites=_y(t.visibleWrites,et(s.path,c))})}return!0}else return!1}function Zx(t,e){if(t.snap)return on(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&on(et(t.path,n),e))return!0;return!1}function eM(t){t.visibleWrites=_0(t.allWrites,tM,ke()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function tM(t){return t.visible}function _0(t,e,n){let s=ln.empty();for(let r=0;r<t.length;++r){const i=t[r];if(e(i)){const o=i.path;let a;if(i.snap)on(n,o)?(a=Xt(n,o),s=co(s,a,i.snap)):on(o,n)&&(a=Xt(o,n),s=co(s,ke(),i.snap.getChild(a)));else if(i.children){if(on(n,o))a=Xt(n,o),s=yy(s,a,i.children);else if(on(o,n))if(a=Xt(o,n),fe(a))s=yy(s,ke(),i.children);else{const c=ii(i.children,ge(a));if(c){const l=c.getChild(xe(a));s=co(s,ke(),l)}}}else throw Ti("WriteRecord should have .snap or .children")}}return s}function v0(t,e,n,s,r){if(!s&&!r){const i=dr(t.visibleWrites,e);if(i!=null)return i;{const o=Is(t.visibleWrites,e);if(Jh(o))return n;if(n==null&&!Yh(o,ke()))return null;{const a=n||Ie.EMPTY_NODE;return ci(o,a)}}}else{const i=Is(t.visibleWrites,e);if(!r&&Jh(i))return n;if(!r&&n==null&&!Yh(i,ke()))return null;{const o=function(l){return(l.visible||r)&&(!s||!~s.indexOf(l.writeId))&&(on(l.path,e)||on(e,l.path))},a=_0(t.allWrites,o,e),c=n||Ie.EMPTY_NODE;return ci(a,c)}}}function nM(t,e,n){let s=Ie.EMPTY_NODE;const r=dr(t.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(vt,(i,o)=>{s=s.updateImmediateChild(i,o)}),s;if(n){const i=Is(t.visibleWrites,e);return n.forEachChild(vt,(o,a)=>{const c=ci(Is(i,new Ue(o)),a);s=s.updateImmediateChild(o,c)}),vy(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const i=Is(t.visibleWrites,e);return vy(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function sM(t,e,n,s,r){$(s||r,"Either existingEventSnap or existingServerSnap must exist");const i=et(e,n);if(Yh(t.visibleWrites,i))return null;{const o=Is(t.visibleWrites,i);return Jh(o)?r.getChild(n):ci(o,r.getChild(n))}}function rM(t,e,n,s){const r=et(e,n),i=dr(t.visibleWrites,r);if(i!=null)return i;if(s.isCompleteForChild(n)){const o=Is(t.visibleWrites,r);return ci(o,s.getNode().getImmediateChild(n))}else return null}function iM(t,e){return dr(t.visibleWrites,e)}function oM(t,e,n,s,r,i,o){let a;const c=Is(t.visibleWrites,e),l=dr(c,ke());if(l!=null)a=l;else if(n!=null)a=ci(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),f=i?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let d=f.getNext();for(;d&&u.length<r;)h(d,s)!==0&&u.push(d),d=f.getNext();return u}else return[]}function aM(){return{visibleWrites:ln.empty(),allWrites:[],lastWriteId:-1}}function Xh(t,e,n,s){return v0(t.writeTree,t.treePath,e,n,s)}function w0(t,e){return nM(t.writeTree,t.treePath,e)}function wy(t,e,n,s){return sM(t.writeTree,t.treePath,e,n,s)}function Vc(t,e){return iM(t.writeTree,et(t.treePath,e))}function cM(t,e,n,s,r,i){return oM(t.writeTree,t.treePath,e,n,s,r,i)}function Vd(t,e,n){return rM(t.writeTree,t.treePath,e,n)}function E0(t,e){return T0(et(t.treePath,e),t.writeTree)}function T0(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lM{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;$(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),$(s!==".priority","Only non-priority child changes can be tracked.");const r=this.changeMap.get(s);if(r){const i=r.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(s,dy(s,e.snapshotNode,r.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(s,Ux(s,r.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(s,Fx(s,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(s,dy(s,e.snapshotNode,r.oldSnap));else throw Ti("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uM{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const I0=new uM;class Bd{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new $d(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Vd(this.writes_,e,s)}}getChildAfterChild(e,n,s){const r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:or(this.viewCache_),i=cM(this.writes_,r,n,1,s,e);return i.length===0?null:i[0]}}function hM(t,e){$(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),$(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function fM(t,e,n,s,r){const i=new lM;let o,a;if(n.type===Tn.OVERWRITE){const l=n;l.source.fromUser?o=Zh(t,e,l.path,l.snap,s,r,i):($(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!fe(l.path),o=Bc(t,e,l.path,l.snap,s,r,a,i))}else if(n.type===Tn.MERGE){const l=n;l.source.fromUser?o=pM(t,e,l.path,l.children,s,r,i):($(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=ef(t,e,l.path,l.children,s,r,a,i))}else if(n.type===Tn.ACK_USER_WRITE){const l=n;l.revert?o=yM(t,e,l.path,s,r,i):o=gM(t,e,l.path,l.affectedTree,s,r,i)}else if(n.type===Tn.LISTEN_COMPLETE)o=mM(t,e,n.path,s,i);else throw Ti("Unknown operation type: "+n.type);const c=i.getChanges();return dM(e,o,c),{viewCache:o,changes:c}}function dM(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const r=s.getNode().isLeafNode()||s.getNode().isEmpty(),i=Qh(t);(n.length>0||!t.eventCache.isFullyInitialized()||r&&!s.getNode().equals(i)||!s.getNode().getPriority().equals(i.getPriority()))&&n.push(Lx(Qh(e)))}}function C0(t,e,n,s,r,i){const o=e.eventCache;if(Vc(s,n)!=null)return e;{let a,c;if(fe(n))if($(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=or(e),u=l instanceof Ie?l:Ie.EMPTY_NODE,h=w0(s,u);a=t.filter.updateFullNode(e.eventCache.getNode(),h,i)}else{const l=Xh(s,or(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,i)}else{const l=ge(n);if(l===".priority"){$(Ss(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const h=wy(s,n,u,c);h!=null?a=t.filter.updatePriority(u,h):a=o.getNode()}else{const u=xe(n);let h;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const f=wy(s,n,o.getNode(),c);f!=null?h=o.getNode().getImmediateChild(l).updateChild(u,f):h=o.getNode().getImmediateChild(l)}else h=Vd(s,l,e.serverCache);h!=null?a=t.filter.updateChild(o.getNode(),l,h,u,r,i):a=o.getNode()}}return ao(e,a,o.isFullyInitialized()||fe(n),t.filter.filtersNodes())}}function Bc(t,e,n,s,r,i,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(fe(n))l=u.updateFullNode(c.getNode(),s,null);else if(u.filtersNodes()&&!c.isFiltered()){const d=c.getNode().updateChild(n,s);l=u.updateFullNode(c.getNode(),d,null)}else{const d=ge(n);if(!c.isCompleteForPath(n)&&Ss(n)>1)return e;const p=xe(n),E=c.getNode().getImmediateChild(d).updateChild(p,s);d===".priority"?l=u.updatePriority(c.getNode(),E):l=u.updateChild(c.getNode(),d,E,p,I0,null)}const h=g0(e,l,c.isFullyInitialized()||fe(n),u.filtersNodes()),f=new Bd(r,h,i);return C0(t,h,n,r,f,a)}function Zh(t,e,n,s,r,i,o){const a=e.eventCache;let c,l;const u=new Bd(r,e,i);if(fe(n))l=t.filter.updateFullNode(e.eventCache.getNode(),s,o),c=ao(e,l,!0,t.filter.filtersNodes());else{const h=ge(n);if(h===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),s),c=ao(e,l,a.isFullyInitialized(),a.isFiltered());else{const f=xe(n),d=a.getNode().getImmediateChild(h);let p;if(fe(f))p=s;else{const y=u.getCompleteChild(h);y!=null?e0(f)===".priority"&&y.getChild(n0(f)).isEmpty()?p=y:p=y.updateChild(f,s):p=Ie.EMPTY_NODE}if(d.equals(p))c=e;else{const y=t.filter.updateChild(a.getNode(),h,p,f,u,o);c=ao(e,y,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function Ey(t,e){return t.eventCache.isCompleteForChild(e)}function pM(t,e,n,s,r,i,o){let a=e;return s.foreach((c,l)=>{const u=et(n,c);Ey(e,ge(u))&&(a=Zh(t,a,u,l,r,i,o))}),s.foreach((c,l)=>{const u=et(n,c);Ey(e,ge(u))||(a=Zh(t,a,u,l,r,i,o))}),a}function Ty(t,e,n){return n.foreach((s,r)=>{e=e.updateChild(s,r)}),e}function ef(t,e,n,s,r,i,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;fe(n)?l=s:l=new Pe(null).setTree(n,s);const u=e.serverCache.getNode();return l.children.inorderTraversal((h,f)=>{if(u.hasChild(h)){const d=e.serverCache.getNode().getImmediateChild(h),p=Ty(t,d,f);c=Bc(t,c,new Ue(h),p,r,i,o,a)}}),l.children.inorderTraversal((h,f)=>{const d=!e.serverCache.isCompleteForChild(h)&&f.value===null;if(!u.hasChild(h)&&!d){const p=e.serverCache.getNode().getImmediateChild(h),y=Ty(t,p,f);c=Bc(t,c,new Ue(h),y,r,i,o,a)}}),c}function gM(t,e,n,s,r,i,o){if(Vc(r,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(s.value!=null){if(fe(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Bc(t,e,n,c.getNode().getChild(n),r,i,a,o);if(fe(n)){let l=new Pe(null);return c.getNode().forEachChild(Wr,(u,h)=>{l=l.set(new Ue(u),h)}),ef(t,e,n,l,r,i,a,o)}else return e}else{let l=new Pe(null);return s.foreach((u,h)=>{const f=et(n,u);c.isCompleteForPath(f)&&(l=l.set(u,c.getNode().getChild(f)))}),ef(t,e,n,l,r,i,a,o)}}function mM(t,e,n,s,r){const i=e.serverCache,o=g0(e,i.getNode(),i.isFullyInitialized()||fe(n),i.isFiltered());return C0(t,o,n,s,I0,r)}function yM(t,e,n,s,r,i){let o;if(Vc(s,n)!=null)return e;{const a=new Bd(s,e,r),c=e.eventCache.getNode();let l;if(fe(n)||ge(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Xh(s,or(e));else{const h=e.serverCache.getNode();$(h instanceof Ie,"serverChildren would be complete if leaf node"),u=w0(s,h)}u=u,l=t.filter.updateFullNode(c,u,i)}else{const u=ge(n);let h=Vd(s,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=c.getImmediateChild(u)),h!=null?l=t.filter.updateChild(c,u,h,xe(n),a,i):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,Ie.EMPTY_NODE,xe(n),a,i):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Xh(s,or(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,i)))}return o=e.serverCache.isFullyInitialized()||Vc(s,ke())!=null,ao(e,l,o,t.filter.filtersNodes())}}function _M(t,e){const n=or(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!fe(e)&&!n.getImmediateChild(ge(e)).isEmpty())?n.getChild(e):null}function Iy(t,e,n,s){e.type===Tn.MERGE&&e.source.queryId!==null&&($(or(t.viewCache_),"We should always have a full cache before handling merges"),$(Qh(t.viewCache_),"Missing event cache, even though we have a server cache"));const r=t.viewCache_,i=fM(t.processor_,r,e,n,s);return hM(t.processor_,i.viewCache),$(i.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,vM(t,i.changes,i.viewCache.eventCache.getNode(),null)}function vM(t,e,n,s){const r=s?[s]:t.eventRegistrations_;return qx(t.eventGenerator_,e,n,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cy;function wM(t){$(!Cy,"__referenceConstructor has already been defined"),Cy=t}function Hd(t,e,n,s){const r=e.source.queryId;if(r!==null){const i=t.views.get(r);return $(i!=null,"SyncTree gave us an op for an invalid query."),Iy(i,e,n,s)}else{let i=[];for(const o of t.views.values())i=i.concat(Iy(o,e,n,s));return i}}function jd(t,e){let n=null;for(const s of t.views.values())n=n||_M(s,e);return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let by;function EM(t){$(!by,"__referenceConstructor has already been defined"),by=t}class Sy{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Pe(null),this.pendingWriteTree_=aM(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function TM(t,e,n,s,r){return Yx(t.pendingWriteTree_,e,n,s,r),r?Al(t,new ir(h0(),e,n)):[]}function Or(t,e,n=!1){const s=Jx(t.pendingWriteTree_,e);if(Xx(t.pendingWriteTree_,e)){let i=new Pe(null);return s.snap!=null?i=i.set(ke(),!0):en(s.children,o=>{i=i.set(new Ue(o),!0)}),Al(t,new $c(s.path,i,n))}else return[]}function kl(t,e,n){return Al(t,new ir(f0(),e,n))}function IM(t,e,n){const s=Pe.fromObject(n);return Al(t,new Po(f0(),e,s))}function CM(t,e,n,s){const r=k0(t,s);if(r!=null){const i=A0(r),o=i.path,a=i.queryId,c=Xt(o,e),l=new ir(d0(a),c,n);return N0(t,o,l)}else return[]}function bM(t,e,n,s){const r=k0(t,s);if(r){const i=A0(r),o=i.path,a=i.queryId,c=Xt(o,e),l=Pe.fromObject(n),u=new Po(d0(a),c,l);return N0(t,o,u)}else return[]}function b0(t,e,n){const r=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=Xt(o,e),l=jd(a,c);if(l)return l});return v0(r,e,i,n,!0)}function Al(t,e){return S0(e,t.syncPointTree_,null,y0(t.pendingWriteTree_,ke()))}function S0(t,e,n,s){if(fe(t.path))return R0(t,e,n,s);{const r=e.get(ke());n==null&&r!=null&&(n=jd(r,ke()));let i=[];const o=ge(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=E0(s,o);i=i.concat(S0(a,c,l,u))}return r&&(i=i.concat(Hd(r,t,s,n))),i}}function R0(t,e,n,s){const r=e.get(ke());n==null&&r!=null&&(n=jd(r,ke()));let i=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=E0(s,o),u=t.operationForChild(o);u&&(i=i.concat(R0(u,a,c,l)))}),r&&(i=i.concat(Hd(r,t,s,n))),i}function k0(t,e){return t.tagToQueryMap.get(e)}function A0(t){const e=t.indexOf("$");return $(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new Ue(t.substr(0,e))}}function N0(t,e,n){const s=t.syncPointTree_.get(e);$(s,"Missing sync point for query tag that we're tracking");const r=y0(t.pendingWriteTree_,e);return Hd(s,n,r,null)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Wd(n)}node(){return this.node_}}class Kd{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=et(this.path_,e);return new Kd(this.syncTree_,n)}node(){return b0(this.syncTree_,this.path_)}}const SM=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Ry=function(t,e,n){if(!t||typeof t!="object")return t;if($(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return RM(t[".sv"],e,n);if(typeof t[".sv"]=="object")return kM(t[".sv"],e);$(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},RM=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:$(!1,"Unexpected server value: "+t)}},kM=function(t,e,n){t.hasOwnProperty("increment")||$(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&$(!1,"Unexpected increment value: "+s);const r=e.node();if($(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return s;const o=r.getValue();return typeof o!="number"?s:o+s},AM=function(t,e,n,s){return qd(e,new Kd(n,t),s)},NM=function(t,e,n){return qd(t,new Wd(e),n)};function qd(t,e,n){const s=t.getPriority().val(),r=Ry(s,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,a=Ry(o.getValue(),e,n);return a!==o.getValue()||r!==o.getPriority().val()?new Je(a,pt(r)):t}else{const o=t;return i=o,r!==o.getPriority().val()&&(i=i.updatePriority(new Je(r))),o.forEachChild(vt,(a,c)=>{const l=qd(c,e.getImmediateChild(a),n);l!==c&&(i=i.updateImmediateChild(a,l))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function Gd(t,e){let n=e instanceof Ue?e:new Ue(e),s=t,r=ge(n);for(;r!==null;){const i=ii(s.node.children,r)||{children:{},childCount:0};s=new zd(r,s,i),n=xe(n),r=ge(n)}return s}function Si(t){return t.node.value}function O0(t,e){t.node.value=e,tf(t)}function P0(t){return t.node.childCount>0}function OM(t){return Si(t)===void 0&&!P0(t)}function Nl(t,e){en(t.node.children,(n,s)=>{e(new zd(n,t,s))})}function D0(t,e,n,s){n&&!s&&e(t),Nl(t,r=>{D0(r,e,!0,s)}),n&&s&&e(t)}function PM(t,e,n){let s=n?t:t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function ca(t){return new Ue(t.parent===null?t.name:ca(t.parent)+"/"+t.name)}function tf(t){t.parent!==null&&DM(t.parent,t.name,t)}function DM(t,e,n){const s=OM(n),r=ss(t.node.children,e);s&&r?(delete t.node.children[e],t.node.childCount--,tf(t)):!s&&!r&&(t.node.children[e]=n.node,t.node.childCount++,tf(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xM=/[\[\].#$\/\u0000-\u001F\u007F]/,MM=/[\[\].#$\u0000-\u001F\u007F]/,$u=10*1024*1024,x0=function(t){return typeof t=="string"&&t.length!==0&&!xM.test(t)},LM=function(t){return typeof t=="string"&&t.length!==0&&!MM.test(t)},FM=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),LM(t)},M0=function(t,e,n){const s=n instanceof Ue?new mx(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+$s(s));if(typeof e=="function")throw new Error(t+"contains a function "+$s(s)+" with contents = "+e.toString());if(xE(e))throw new Error(t+"contains "+e.toString()+" "+$s(s));if(typeof e=="string"&&e.length>$u/3&&Tl(e)>$u)throw new Error(t+"contains a string greater than "+$u+" utf8 bytes "+$s(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,i=!1;if(en(e,(o,a)=>{if(o===".value")r=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!x0(o)))throw new Error(t+" contains an invalid key ("+o+") "+$s(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);yx(s,o),M0(t,a,s),_x(s)}),r&&i)throw new Error(t+' contains ".value" child '+$s(s)+" in addition to actual children.")}},UM=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!x0(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!FM(n))throw new Error(UN(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $M{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function VM(t,e){let n=null;for(let s=0;s<e.length;s++){const r=e[s],i=r.getPath();n!==null&&!s0(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(r)}n&&t.eventLists_.push(n)}function pr(t,e,n){VM(t,n),BM(t,s=>on(s,e)||on(e,s))}function BM(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const r=t.eventLists_[s];if(r){const i=r.path;e(i)?(HM(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function HM(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();Xs&&dt("event: "+n.toString()),oa(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jM="repo_interrupt",WM=25;class KM{constructor(e,n,s,r){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new $M,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Uc(),this.transactionQueueTree_=new zd,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function qM(t,e,n){if(t.stats_=xd(t.repoInfo_),t.forceRestClient_||VD())t.server_=new Fc(t.repoInfo_,(s,r,i,o)=>{ky(t,s,r,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Ay(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ct(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new zn(t.repoInfo_,e,(s,r,i,o)=>{ky(t,s,r,i,o)},s=>{Ay(t,s)},s=>{GM(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=qD(t.repoInfo_,()=>new Kx(t.stats_,t.server_)),t.infoData_=new Vx,t.infoSyncTree_=new Sy({startListening:(s,r,i,o)=>{let a=[];const c=t.infoData_.getNode(s._path);return c.isEmpty()||(a=kl(t.infoSyncTree_,s._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Qd(t,"connected",!1),t.serverSyncTree_=new Sy({startListening:(s,r,i,o)=>(t.server_.listen(s,i,r,(a,c)=>{const l=o(a,c);pr(t.eventQueue_,s._path,l)}),[]),stopListening:(s,r)=>{t.server_.unlisten(s,r)}})}function zM(t){const n=t.infoData_.getNode(new Ue(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function L0(t){return SM({timestamp:zM(t)})}function ky(t,e,n,s,r){t.dataUpdateCount++;const i=new Ue(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(r)if(s){const c=bc(n,l=>pt(l));o=bM(t.serverSyncTree_,i,c,r)}else{const c=pt(n);o=CM(t.serverSyncTree_,i,c,r)}else if(s){const c=bc(n,l=>pt(l));o=IM(t.serverSyncTree_,i,c)}else{const c=pt(n);o=kl(t.serverSyncTree_,i,c)}let a=i;o.length>0&&(a=Jd(t,i)),pr(t.eventQueue_,a,o)}function Ay(t,e){Qd(t,"connected",e),e===!1&&YM(t)}function GM(t,e){en(e,(n,s)=>{Qd(t,n,s)})}function Qd(t,e,n){const s=new Ue("/.info/"+e),r=pt(n);t.infoData_.updateSnapshot(s,r);const i=kl(t.infoSyncTree_,s,r);pr(t.eventQueue_,s,i)}function QM(t){return t.nextWriteId_++}function YM(t){F0(t,"onDisconnectEvents");const e=L0(t),n=Uc();Gh(t.onDisconnect_,ke(),(r,i)=>{const o=AM(r,i,t.serverSyncTree_,e);u0(n,r,o)});let s=[];Gh(n,ke(),(r,i)=>{s=s.concat(kl(t.serverSyncTree_,r,i));const o=eL(t,r);Jd(t,o)}),t.onDisconnect_=Uc(),pr(t.eventQueue_,ke(),s)}function JM(t){t.persistentConnection_&&t.persistentConnection_.interrupt(jM)}function F0(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),dt(n,...e)}function U0(t,e,n){return b0(t.serverSyncTree_,e,n)||Ie.EMPTY_NODE}function Yd(t,e=t.transactionQueueTree_){if(e||Ol(t,e),Si(e)){const n=V0(t,e);$(n.length>0,"Sending zero length transaction queue"),n.every(r=>r.status===0)&&XM(t,ca(e),n)}else P0(e)&&Nl(e,n=>{Yd(t,n)})}function XM(t,e,n){const s=n.map(l=>l.currentWriteId),r=U0(t,e,s);let i=r;const o=r.hash();for(let l=0;l<n.length;l++){const u=n[l];$(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=Xt(e,u.path);i=i.updateChild(h,u.currentOutputSnapshotRaw)}const a=i.val(!0),c=e;t.server_.put(c.toString(),a,l=>{F0(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const h=[];for(let f=0;f<n.length;f++)n[f].status=2,u=u.concat(Or(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&h.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();Ol(t,Gd(t.transactionQueueTree_,e)),Yd(t,t.transactionQueueTree_),pr(t.eventQueue_,e,u);for(let f=0;f<h.length;f++)oa(h[f])}else{if(l==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{jt("transaction at "+c.toString()+" failed: "+l);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=l}Jd(t,e)}},o)}function Jd(t,e){const n=$0(t,e),s=ca(n),r=V0(t,n);return ZM(t,r,s),s}function ZM(t,e,n){if(e.length===0)return;const s=[];let r=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=Xt(n,c.path);let u=!1,h;if($(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,h=c.abortReason,r=r.concat(Or(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=WM)u=!0,h="maxretry",r=r.concat(Or(t.serverSyncTree_,c.currentWriteId,!0));else{const f=U0(t,c.path,o);c.currentInputSnapshot=f;const d=e[a].update(f.val());if(d!==void 0){M0("transaction failed: Data returned ",d,c.path);let p=pt(d);typeof d=="object"&&d!=null&&ss(d,".priority")||(p=p.updatePriority(f.getPriority()));const E=c.currentWriteId,v=L0(t),g=NM(p,f,v);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=g,c.currentWriteId=QM(t),o.splice(o.indexOf(E),1),r=r.concat(TM(t.serverSyncTree_,c.path,g,c.currentWriteId,c.applyLocally)),r=r.concat(Or(t.serverSyncTree_,E,!0))}else u=!0,h="nodata",r=r.concat(Or(t.serverSyncTree_,c.currentWriteId,!0))}pr(t.eventQueue_,n,r),r=[],u&&(e[a].status=2,function(f){setTimeout(f,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(h),!1,null))))}Ol(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)oa(s[a]);Yd(t,t.transactionQueueTree_)}function $0(t,e){let n,s=t.transactionQueueTree_;for(n=ge(e);n!==null&&Si(s)===void 0;)s=Gd(s,n),e=xe(e),n=ge(e);return s}function V0(t,e){const n=[];return B0(t,e,n),n.sort((s,r)=>s.order-r.order),n}function B0(t,e,n){const s=Si(e);if(s)for(let r=0;r<s.length;r++)n.push(s[r]);Nl(e,r=>{B0(t,r,n)})}function Ol(t,e){const n=Si(e);if(n){let s=0;for(let r=0;r<n.length;r++)n[r].status!==2&&(n[s]=n[r],s++);n.length=s,O0(e,n.length>0?n:void 0)}Nl(e,s=>{Ol(t,s)})}function eL(t,e){const n=ca($0(t,e)),s=Gd(t.transactionQueueTree_,e);return PM(s,r=>{Vu(t,r)}),Vu(t,s),D0(s,r=>{Vu(t,r)}),n}function Vu(t,e){const n=Si(e);if(n){const s=[];let r=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?($(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):($(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),r=r.concat(Or(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?O0(e,void 0):n.length=i+1,pr(t.eventQueue_,ca(e),r);for(let o=0;o<s.length;o++)oa(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tL(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let r=n[s];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function nL(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):jt(`Invalid query segment '${n}' in query '${t}'`)}return e}const Ny=function(t,e){const n=sL(t),s=n.namespace;n.domain==="firebase.com"&&sr(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&sr("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||PD();const r=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new jD(n.host,n.secure,s,r,e,"",s!==n.subdomain),path:new Ue(n.pathString)}},sL=function(t){let e="",n="",s="",r="",i="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(u,h)),u<h&&(r=tL(t.substring(u,h)));const f=nL(t.substring(Math.min(t.length,h)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const d=e.slice(0,l);if(d.toLowerCase()==="localhost")n="localhost";else if(d.split(".").length<=2)n=d;else{const p=e.indexOf(".");s=e.substring(0,p).toLowerCase(),n=e.substring(p+1),i=s}"ns"in f&&(i=f.ns)}return{host:e,port:c,domain:n,subdomain:s,secure:o,scheme:a,pathString:r,namespace:i}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e,n,s,r){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=r}get key(){return fe(this._path)?null:e0(this._path)}get ref(){return new Ri(this._repo,this._path)}get _queryIdentifier(){const e=gy(this._queryParams),n=Pd(e);return n==="{}"?"default":n}get _queryObject(){return gy(this._queryParams)}isEqual(e){if(e=Ct(e),!(e instanceof Xd))return!1;const n=this._repo===e._repo,s=s0(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return n&&s&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+gx(this._path)}}class Ri extends Xd{constructor(e,n){super(e,n,new Ud,!1)}get parent(){const e=n0(this._path);return e===null?null:new Ri(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}wM(Ri);EM(Ri);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rL="FIREBASE_DATABASE_EMULATOR_HOST",nf={};let iL=!1;function oL(t,e,n,s,r){let i=s||t.options.databaseURL;i===void 0&&(t.options.projectId||sr("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),dt("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Ny(i,r),a=o.repoInfo,c,l;typeof process<"u"&&process.env&&(l=process.env[rL]),l?(c=!0,i=`http://${l}?ns=${a.namespace}`,o=Ny(i,r),a=o.repoInfo):c=!o.repoInfo.secure;const u=r&&c?new Kh(Kh.OWNER):new HD(t.name,t.options,e);UM("Invalid Firebase Database URL",o),fe(o.path)||sr("Database URL must point to the root of a Firebase Database (not including a child path).");const h=cL(a,t,u,new BD(t.name,n));return new lL(h,t)}function aL(t,e){const n=nf[e];(!n||n[t.key]!==t)&&sr(`Database ${e}(${t.repoInfo_}) has already been deleted.`),JM(t),delete n[t.key]}function cL(t,e,n,s){let r=nf[e.name];r||(r={},nf[e.name]=r);let i=r[t.toURLString()];return i&&sr("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new KM(t,iL,n,s),r[t.toURLString()]=i,i}class lL{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(qM(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ri(this._repo,ke())),this._rootInternal}_delete(){return this._rootInternal!==null&&(aL(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&sr("Cannot call "+e+" on a deleted database.")}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uL(t){RD(Os),Nn(new fn("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return oL(s,r,i,n)},"PUBLIC").setMultipleInstances(!0)),Ht(Jm,Xm,t),Ht(Jm,Xm,"esm2017")}zn.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};zn.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};uL();var hL=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},V,Zd=Zd||{},ie=hL||self;function Pl(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function la(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function fL(t){return Object.prototype.hasOwnProperty.call(t,Bu)&&t[Bu]||(t[Bu]=++dL)}var Bu="closure_uid_"+(1e9*Math.random()>>>0),dL=0;function pL(t,e,n){return t.call.apply(t.bind,arguments)}function gL(t,e,n){if(!t)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var r=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(r,s),t.apply(e,r)}}return function(){return t.apply(e,arguments)}}function wt(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?wt=pL:wt=gL,wt.apply(null,arguments)}function Wa(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var s=n.slice();return s.push.apply(s,arguments),t.apply(this,s)}}function rt(t,e){function n(){}n.prototype=e.prototype,t.$=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.ac=function(s,r,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[r].apply(s,o)}}function Ps(){this.s=this.s,this.o=this.o}var mL=0;Ps.prototype.s=!1;Ps.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),mL!=0)&&fL(this)};Ps.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const H0=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1};function ep(t){const e=t.length;if(0<e){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function Oy(t,e){for(let n=1;n<arguments.length;n++){const s=arguments[n];if(Pl(s)){const r=t.length||0,i=s.length||0;t.length=r+i;for(let o=0;o<i;o++)t[r+o]=s[o]}else t.push(s)}}function Et(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}Et.prototype.h=function(){this.defaultPrevented=!0};var yL=function(){if(!ie.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{ie.addEventListener("test",()=>{},e),ie.removeEventListener("test",()=>{},e)}catch{}return t}();function Do(t){return/^[\s\xa0]*$/.test(t)}function Dl(){var t=ie.navigator;return t&&(t=t.userAgent)?t:""}function wn(t){return Dl().indexOf(t)!=-1}function tp(t){return tp[" "](t),t}tp[" "]=function(){};function _L(t,e){var n=uF;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}var vL=wn("Opera"),li=wn("Trident")||wn("MSIE"),j0=wn("Edge"),sf=j0||li,W0=wn("Gecko")&&!(Dl().toLowerCase().indexOf("webkit")!=-1&&!wn("Edge"))&&!(wn("Trident")||wn("MSIE"))&&!wn("Edge"),wL=Dl().toLowerCase().indexOf("webkit")!=-1&&!wn("Edge");function K0(){var t=ie.document;return t?t.documentMode:void 0}var rf;e:{var Hu="",ju=function(){var t=Dl();if(W0)return/rv:([^\);]+)(\)|;)/.exec(t);if(j0)return/Edge\/([\d\.]+)/.exec(t);if(li)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(wL)return/WebKit\/(\S+)/.exec(t);if(vL)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(ju&&(Hu=ju?ju[1]:""),li){var Wu=K0();if(Wu!=null&&Wu>parseFloat(Hu)){rf=String(Wu);break e}}rf=Hu}var of;if(ie.document&&li){var Py=K0();of=Py||parseInt(rf,10)||void 0}else of=void 0;var EL=of;function xo(t,e){if(Et.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(W0){e:{try{tp(e.nodeName);var r=!0;break e}catch{}r=!1}r||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,s?(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:TL[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&xo.$.h.call(this)}}rt(xo,Et);var TL={2:"touch",3:"pen",4:"mouse"};xo.prototype.h=function(){xo.$.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var ua="closure_listenable_"+(1e6*Math.random()|0),IL=0;function CL(t,e,n,s,r){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.la=r,this.key=++IL,this.fa=this.ia=!1}function xl(t){t.fa=!0,t.listener=null,t.proxy=null,t.src=null,t.la=null}function np(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function bL(t,e){for(const n in t)e.call(void 0,t[n],n,t)}function q0(t){const e={};for(const n in t)e[n]=t[n];return e}const Dy="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function z0(t,e){let n,s;for(let r=1;r<arguments.length;r++){s=arguments[r];for(n in s)t[n]=s[n];for(let i=0;i<Dy.length;i++)n=Dy[i],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function Ml(t){this.src=t,this.g={},this.h=0}Ml.prototype.add=function(t,e,n,s,r){var i=t.toString();t=this.g[i],t||(t=this.g[i]=[],this.h++);var o=cf(t,e,s,r);return-1<o?(e=t[o],n||(e.ia=!1)):(e=new CL(e,this.src,i,!!s,r),e.ia=n,t.push(e)),e};function af(t,e){var n=e.type;if(n in t.g){var s=t.g[n],r=H0(s,e),i;(i=0<=r)&&Array.prototype.splice.call(s,r,1),i&&(xl(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function cf(t,e,n,s){for(var r=0;r<t.length;++r){var i=t[r];if(!i.fa&&i.listener==e&&i.capture==!!n&&i.la==s)return r}return-1}var sp="closure_lm_"+(1e6*Math.random()|0),Ku={};function G0(t,e,n,s,r){if(s&&s.once)return Y0(t,e,n,s,r);if(Array.isArray(e)){for(var i=0;i<e.length;i++)G0(t,e[i],n,s,r);return null}return n=op(n),t&&t[ua]?t.O(e,n,la(s)?!!s.capture:!!s,r):Q0(t,e,n,!1,s,r)}function Q0(t,e,n,s,r,i){if(!e)throw Error("Invalid event type");var o=la(r)?!!r.capture:!!r,a=ip(t);if(a||(t[sp]=a=new Ml(t)),n=a.add(e,n,s,o,i),n.proxy)return n;if(s=SL(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)yL||(r=o),r===void 0&&(r=!1),t.addEventListener(e.toString(),s,r);else if(t.attachEvent)t.attachEvent(X0(e.toString()),s);else if(t.addListener&&t.removeListener)t.addListener(s);else throw Error("addEventListener and attachEvent are unavailable.");return n}function SL(){function t(n){return e.call(t.src,t.listener,n)}const e=RL;return t}function Y0(t,e,n,s,r){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Y0(t,e[i],n,s,r);return null}return n=op(n),t&&t[ua]?t.P(e,n,la(s)?!!s.capture:!!s,r):Q0(t,e,n,!0,s,r)}function J0(t,e,n,s,r){if(Array.isArray(e))for(var i=0;i<e.length;i++)J0(t,e[i],n,s,r);else s=la(s)?!!s.capture:!!s,n=op(n),t&&t[ua]?(t=t.i,e=String(e).toString(),e in t.g&&(i=t.g[e],n=cf(i,n,s,r),-1<n&&(xl(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete t.g[e],t.h--)))):t&&(t=ip(t))&&(e=t.g[e.toString()],t=-1,e&&(t=cf(e,n,s,r)),(n=-1<t?e[t]:null)&&rp(n))}function rp(t){if(typeof t!="number"&&t&&!t.fa){var e=t.src;if(e&&e[ua])af(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(X0(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=ip(e))?(af(n,t),n.h==0&&(n.src=null,e[sp]=null)):xl(t)}}}function X0(t){return t in Ku?Ku[t]:Ku[t]="on"+t}function RL(t,e){if(t.fa)t=!0;else{e=new xo(e,this);var n=t.listener,s=t.la||t.src;t.ia&&rp(t),t=n.call(s,e)}return t}function ip(t){return t=t[sp],t instanceof Ml?t:null}var qu="__closure_events_fn_"+(1e9*Math.random()>>>0);function op(t){return typeof t=="function"?t:(t[qu]||(t[qu]=function(e){return t.handleEvent(e)}),t[qu])}function st(){Ps.call(this),this.i=new Ml(this),this.S=this,this.J=null}rt(st,Ps);st.prototype[ua]=!0;st.prototype.removeEventListener=function(t,e,n,s){J0(this,t,e,n,s)};function lt(t,e){var n,s=t.J;if(s)for(n=[];s;s=s.J)n.push(s);if(t=t.S,s=e.type||e,typeof e=="string")e=new Et(e,t);else if(e instanceof Et)e.target=e.target||t;else{var r=e;e=new Et(s,t),z0(e,r)}if(r=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];r=Ka(o,s,!0,e)&&r}if(o=e.g=t,r=Ka(o,s,!0,e)&&r,r=Ka(o,s,!1,e)&&r,n)for(i=0;i<n.length;i++)o=e.g=n[i],r=Ka(o,s,!1,e)&&r}st.prototype.N=function(){if(st.$.N.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],s=0;s<n.length;s++)xl(n[s]);delete t.g[e],t.h--}}this.J=null};st.prototype.O=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)};st.prototype.P=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};function Ka(t,e,n,s){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var r=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.fa&&o.capture==n){var a=o.listener,c=o.la||o.src;o.ia&&af(t.i,o),r=a.call(c,s)!==!1&&r}}return r&&!s.defaultPrevented}var ap=ie.JSON.stringify;class kL{constructor(e,n){this.i=e,this.j=n,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function AL(){var t=cp;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class NL{constructor(){this.h=this.g=null}add(e,n){const s=Z0.get();s.set(e,n),this.h?this.h.next=s:this.g=s,this.h=s}}var Z0=new kL(()=>new OL,t=>t.reset());class OL{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function PL(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function DL(t){ie.setTimeout(()=>{throw t},0)}let Mo,Lo=!1,cp=new NL,eT=()=>{const t=ie.Promise.resolve(void 0);Mo=()=>{t.then(xL)}};var xL=()=>{for(var t;t=AL();){try{t.h.call(t.g)}catch(n){DL(n)}var e=Z0;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}Lo=!1};function Ll(t,e){st.call(this),this.h=t||1,this.g=e||ie,this.j=wt(this.qb,this),this.l=Date.now()}rt(Ll,st);V=Ll.prototype;V.ga=!1;V.T=null;V.qb=function(){if(this.ga){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-t):(this.T&&(this.g.clearTimeout(this.T),this.T=null),lt(this,"tick"),this.ga&&(lp(this),this.start()))}};V.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function lp(t){t.ga=!1,t.T&&(t.g.clearTimeout(t.T),t.T=null)}V.N=function(){Ll.$.N.call(this),lp(this),delete this.g};function up(t,e,n){if(typeof t=="function")n&&(t=wt(t,n));else if(t&&typeof t.handleEvent=="function")t=wt(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:ie.setTimeout(t,e||0)}function tT(t){t.g=up(()=>{t.g=null,t.i&&(t.i=!1,tT(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class ML extends Ps{constructor(e,n){super(),this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:tT(this)}N(){super.N(),this.g&&(ie.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Fo(t){Ps.call(this),this.h=t,this.g={}}rt(Fo,Ps);var xy=[];function nT(t,e,n,s){Array.isArray(n)||(n&&(xy[0]=n.toString()),n=xy);for(var r=0;r<n.length;r++){var i=G0(e,n[r],s||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function sT(t){np(t.g,function(e,n){this.g.hasOwnProperty(n)&&rp(e)},t),t.g={}}Fo.prototype.N=function(){Fo.$.N.call(this),sT(this)};Fo.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function Fl(){this.g=!0}Fl.prototype.Ea=function(){this.g=!1};function LL(t,e,n,s,r,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var h=u.split("_");o=2<=h.length&&h[1]=="type"?o+(u+"="+l+"&"):o+(u+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+s+") [attempt "+r+"]: "+e+`
`+n+`
`+o})}function FL(t,e,n,s,r,i,o){t.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+r+"]: "+e+`
`+n+`
`+i+" "+o})}function Pr(t,e,n,s){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+$L(t,n)+(s?" "+s:"")})}function UL(t,e){t.info(function(){return"TIMEOUT: "+e})}Fl.prototype.info=function(){};function $L(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var s=n[t];if(!(2>s.length)){var r=s[1];if(Array.isArray(r)&&!(1>r.length)){var i=r[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<r.length;o++)r[o]=""}}}}return ap(n)}catch{return e}}var gr={},My=null;function Ul(){return My=My||new st}gr.Ta="serverreachability";function rT(t){Et.call(this,gr.Ta,t)}rt(rT,Et);function Uo(t){const e=Ul();lt(e,new rT(e))}gr.STAT_EVENT="statevent";function iT(t,e){Et.call(this,gr.STAT_EVENT,t),this.stat=e}rt(iT,Et);function Rt(t){const e=Ul();lt(e,new iT(e,t))}gr.Ua="timingevent";function oT(t,e){Et.call(this,gr.Ua,t),this.size=e}rt(oT,Et);function ha(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return ie.setTimeout(function(){t()},e)}var $l={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},aT={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function hp(){}hp.prototype.h=null;function Ly(t){return t.h||(t.h=t.i())}function cT(){}var fa={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function fp(){Et.call(this,"d")}rt(fp,Et);function dp(){Et.call(this,"c")}rt(dp,Et);var lf;function Vl(){}rt(Vl,hp);Vl.prototype.g=function(){return new XMLHttpRequest};Vl.prototype.i=function(){return{}};lf=new Vl;function da(t,e,n,s){this.l=t,this.j=e,this.m=n,this.W=s||1,this.U=new Fo(this),this.P=VL,t=sf?125:void 0,this.V=new Ll(t),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new lT}function lT(){this.i=null,this.g="",this.h=!1}var VL=45e3,uf={},Hc={};V=da.prototype;V.setTimeout=function(t){this.P=t};function hf(t,e,n){t.L=1,t.v=Hl(Xn(e)),t.s=n,t.S=!0,uT(t,null)}function uT(t,e){t.G=Date.now(),pa(t),t.A=Xn(t.v);var n=t.A,s=t.W;Array.isArray(s)||(s=[String(s)]),_T(n.i,"t",s),t.C=0,n=t.l.J,t.h=new lT,t.g=$T(t.l,n?e:null,!t.s),0<t.O&&(t.M=new ML(wt(t.Pa,t,t.g),t.O)),nT(t.U,t.g,"readystatechange",t.nb),e=t.I?q0(t.I):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ha(t.A,t.u,t.s,e)):(t.u="GET",t.g.ha(t.A,t.u,null,e)),Uo(),LL(t.j,t.u,t.A,t.m,t.W,t.s)}V.nb=function(t){t=t.target;const e=this.M;e&&In(t)==3?e.l():this.Pa(t)};V.Pa=function(t){try{if(t==this.g)e:{const u=In(this.g);var e=this.g.Ia();const h=this.g.da();if(!(3>u)&&(u!=3||sf||this.g&&(this.h.h||this.g.ja()||Vy(this.g)))){this.J||u!=4||e==7||(e==8||0>=h?Uo(3):Uo(2)),Bl(this);var n=this.g.da();this.ca=n;t:if(hT(this)){var s=Vy(this.g);t="";var r=s.length,i=In(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ws(this),lo(this);var o="";break t}this.h.i=new ie.TextDecoder}for(e=0;e<r;e++)this.h.h=!0,t+=this.h.i.decode(s[e],{stream:i&&e==r-1});s.splice(0,r),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=n==200,FL(this.j,this.u,this.A,this.m,this.W,u,n),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Do(a)){var l=a;break t}}l=null}if(n=l)Pr(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ff(this,n);else{this.i=!1,this.o=3,Rt(12),Ws(this),lo(this);break e}}this.S?(fT(this,u,o),sf&&this.i&&u==3&&(nT(this.U,this.V,"tick",this.mb),this.V.start())):(Pr(this.j,this.m,o,null),ff(this,o)),u==4&&Ws(this),this.i&&!this.J&&(u==4?MT(this.l,this):(this.i=!1,pa(this)))}else aF(this.g),n==400&&0<o.indexOf("Unknown SID")?(this.o=3,Rt(12)):(this.o=0,Rt(13)),Ws(this),lo(this)}}}catch{}finally{}};function hT(t){return t.g?t.u=="GET"&&t.L!=2&&t.l.Ha:!1}function fT(t,e,n){let s=!0,r;for(;!t.J&&t.C<n.length;)if(r=BL(t,n),r==Hc){e==4&&(t.o=4,Rt(14),s=!1),Pr(t.j,t.m,null,"[Incomplete Response]");break}else if(r==uf){t.o=4,Rt(15),Pr(t.j,t.m,n,"[Invalid Chunk]"),s=!1;break}else Pr(t.j,t.m,r,null),ff(t,r);hT(t)&&r!=Hc&&r!=uf&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,Rt(16),s=!1),t.i=t.i&&s,s?0<n.length&&!t.ba&&(t.ba=!0,e=t.l,e.g==t&&e.ca&&!e.M&&(e.l.info("Great, no buffering proxy detected. Bytes received: "+n.length),vp(e),e.M=!0,Rt(11))):(Pr(t.j,t.m,n,"[Invalid Chunked Response]"),Ws(t),lo(t))}V.mb=function(){if(this.g){var t=In(this.g),e=this.g.ja();this.C<e.length&&(Bl(this),fT(this,t,e),this.i&&t!=4&&pa(this))}};function BL(t,e){var n=t.C,s=e.indexOf(`
`,n);return s==-1?Hc:(n=Number(e.substring(n,s)),isNaN(n)?uf:(s+=1,s+n>e.length?Hc:(e=e.slice(s,s+n),t.C=s+n,e)))}V.cancel=function(){this.J=!0,Ws(this)};function pa(t){t.Y=Date.now()+t.P,dT(t,t.P)}function dT(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=ha(wt(t.lb,t),e)}function Bl(t){t.B&&(ie.clearTimeout(t.B),t.B=null)}V.lb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(UL(this.j,this.A),this.L!=2&&(Uo(),Rt(17)),Ws(this),this.o=2,lo(this)):dT(this,this.Y-t)};function lo(t){t.l.H==0||t.J||MT(t.l,t)}function Ws(t){Bl(t);var e=t.M;e&&typeof e.sa=="function"&&e.sa(),t.M=null,lp(t.V),sT(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.sa())}function ff(t,e){try{var n=t.l;if(n.H!=0&&(n.g==t||df(n.i,t))){if(!t.K&&df(n.i,t)&&n.H==3){try{var s=n.Ja.g.parse(e)}catch{s=null}if(Array.isArray(s)&&s.length==3){var r=s;if(r[0]==0){e:if(!n.u){if(n.g)if(n.g.G+3e3<t.G)Kc(n),Kl(n);else break e;_p(n),Rt(18)}}else n.Fa=r[1],0<n.Fa-n.V&&37500>r[2]&&n.G&&n.A==0&&!n.v&&(n.v=ha(wt(n.ib,n),6e3));if(1>=ET(n.i)&&n.oa){try{n.oa()}catch{}n.oa=void 0}}else Ks(n,11)}else if((t.K||n.g==t)&&Kc(n),!Do(e))for(r=n.Ja.g.parse(e),e=0;e<r.length;e++){let l=r[e];if(n.V=l[0],l=l[1],n.H==2)if(l[0]=="c"){n.K=l[1],n.pa=l[2];const u=l[3];u!=null&&(n.ra=u,n.l.info("VER="+n.ra));const h=l[4];h!=null&&(n.Ga=h,n.l.info("SVER="+n.Ga));const f=l[5];f!=null&&typeof f=="number"&&0<f&&(s=1.5*f,n.L=s,n.l.info("backChannelRequestTimeoutMs_="+s)),s=n;const d=t.g;if(d){const p=d.g?d.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(p){var i=s.i;i.g||p.indexOf("spdy")==-1&&p.indexOf("quic")==-1&&p.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(pp(i,i.h),i.h=null))}if(s.F){const y=d.g?d.g.getResponseHeader("X-HTTP-Session-Id"):null;y&&(s.Da=y,Me(s.I,s.F,y))}}n.H=3,n.h&&n.h.Ba(),n.ca&&(n.S=Date.now()-t.G,n.l.info("Handshake RTT: "+n.S+"ms")),s=n;var o=t;if(s.wa=UT(s,s.J?s.pa:null,s.Y),o.K){TT(s.i,o);var a=o,c=s.L;c&&a.setTimeout(c),a.B&&(Bl(a),pa(a)),s.g=o}else DT(s);0<n.j.length&&ql(n)}else l[0]!="stop"&&l[0]!="close"||Ks(n,7);else n.H==3&&(l[0]=="stop"||l[0]=="close"?l[0]=="stop"?Ks(n,7):yp(n):l[0]!="noop"&&n.h&&n.h.Aa(l),n.A=0)}}Uo(4)}catch{}}function HL(t){if(t.Z&&typeof t.Z=="function")return t.Z();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(Pl(t)){for(var e=[],n=t.length,s=0;s<n;s++)e.push(t[s]);return e}e=[],n=0;for(s in t)e[n++]=t[s];return e}function jL(t){if(t.ta&&typeof t.ta=="function")return t.ta();if(!t.Z||typeof t.Z!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(Pl(t)||typeof t=="string"){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const s in t)e[n++]=s;return e}}}function pT(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(Pl(t)||typeof t=="string")Array.prototype.forEach.call(t,e,void 0);else for(var n=jL(t),s=HL(t),r=s.length,i=0;i<r;i++)e.call(void 0,s[i],n&&n[i],t)}var gT=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function WL(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var s=t[n].indexOf("="),r=null;if(0<=s){var i=t[n].substring(0,s);r=t[n].substring(s+1)}else i=t[n];e(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}function Zs(t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,t instanceof Zs){this.h=t.h,jc(this,t.j),this.s=t.s,this.g=t.g,Wc(this,t.m),this.l=t.l;var e=t.i,n=new $o;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),Fy(this,n),this.o=t.o}else t&&(e=String(t).match(gT))?(this.h=!1,jc(this,e[1]||"",!0),this.s=zi(e[2]||""),this.g=zi(e[3]||"",!0),Wc(this,e[4]),this.l=zi(e[5]||"",!0),Fy(this,e[6]||"",!0),this.o=zi(e[7]||"")):(this.h=!1,this.i=new $o(null,this.h))}Zs.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Gi(e,Uy,!0),":");var n=this.g;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push(Gi(e,Uy,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.g&&n.charAt(0)!="/"&&t.push("/"),t.push(Gi(n,n.charAt(0)=="/"?zL:qL,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.o)&&t.push("#",Gi(n,QL)),t.join("")};function Xn(t){return new Zs(t)}function jc(t,e,n){t.j=n?zi(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Wc(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function Fy(t,e,n){e instanceof $o?(t.i=e,YL(t.i,t.h)):(n||(e=Gi(e,GL)),t.i=new $o(e,t.h))}function Me(t,e,n){t.i.set(e,n)}function Hl(t){return Me(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function zi(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Gi(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,KL),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function KL(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Uy=/[#\/\?@]/g,qL=/[#\?:]/g,zL=/[#\?]/g,GL=/[#\?@]/g,QL=/#/g;function $o(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function Ds(t){t.g||(t.g=new Map,t.h=0,t.i&&WL(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}V=$o.prototype;V.add=function(t,e){Ds(this),this.i=null,t=ki(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function mT(t,e){Ds(t),e=ki(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function yT(t,e){return Ds(t),e=ki(t,e),t.g.has(e)}V.forEach=function(t,e){Ds(this),this.g.forEach(function(n,s){n.forEach(function(r){t.call(e,r,s,this)},this)},this)};V.ta=function(){Ds(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let s=0;s<e.length;s++){const r=t[s];for(let i=0;i<r.length;i++)n.push(e[s])}return n};V.Z=function(t){Ds(this);let e=[];if(typeof t=="string")yT(this,t)&&(e=e.concat(this.g.get(ki(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e};V.set=function(t,e){return Ds(this),this.i=null,t=ki(this,t),yT(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};V.get=function(t,e){return t?(t=this.Z(t),0<t.length?String(t[0]):e):e};function _T(t,e,n){mT(t,e),0<n.length&&(t.i=null,t.g.set(ki(t,e),ep(n)),t.h+=n.length)}V.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var s=e[n];const i=encodeURIComponent(String(s)),o=this.Z(s);for(s=0;s<o.length;s++){var r=i;o[s]!==""&&(r+="="+encodeURIComponent(String(o[s]))),t.push(r)}}return this.i=t.join("&")};function ki(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function YL(t,e){e&&!t.j&&(Ds(t),t.i=null,t.g.forEach(function(n,s){var r=s.toLowerCase();s!=r&&(mT(this,s),_T(this,r,n))},t)),t.j=e}var JL=class{constructor(t,e){this.g=t,this.map=e}};function vT(t){this.l=t||XL,ie.PerformanceNavigationTiming?(t=ie.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(ie.g&&ie.g.Ka&&ie.g.Ka()&&ie.g.Ka().ec),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var XL=10;function wT(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function ET(t){return t.h?1:t.g?t.g.size:0}function df(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function pp(t,e){t.g?t.g.add(e):t.h=e}function TT(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}vT.prototype.cancel=function(){if(this.i=IT(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function IT(t){if(t.h!=null)return t.i.concat(t.h.F);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.F);return e}return ep(t.i)}var ZL=class{stringify(t){return ie.JSON.stringify(t,void 0)}parse(t){return ie.JSON.parse(t,void 0)}};function eF(){this.g=new ZL}function tF(t,e,n){const s=n||"";try{pT(t,function(r,i){let o=r;la(r)&&(o=ap(r)),e.push(s+i+"="+encodeURIComponent(o))})}catch(r){throw e.push(s+"type="+encodeURIComponent("_badmap")),r}}function nF(t,e){const n=new Fl;if(ie.Image){const s=new Image;s.onload=Wa(qa,n,s,"TestLoadImage: loaded",!0,e),s.onerror=Wa(qa,n,s,"TestLoadImage: error",!1,e),s.onabort=Wa(qa,n,s,"TestLoadImage: abort",!1,e),s.ontimeout=Wa(qa,n,s,"TestLoadImage: timeout",!1,e),ie.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=t}else e(!1)}function qa(t,e,n,s,r){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,r(s)}catch{}}function ga(t){this.l=t.fc||null,this.j=t.ob||!1}rt(ga,hp);ga.prototype.g=function(){return new jl(this.l,this.j)};ga.prototype.i=function(t){return function(){return t}}({});function jl(t,e){st.call(this),this.F=t,this.u=e,this.m=void 0,this.readyState=gp,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}rt(jl,st);var gp=0;V=jl.prototype;V.open=function(t,e){if(this.readyState!=gp)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,Vo(this)};V.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.F||ie).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))};V.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ma(this)),this.readyState=gp};V.$a=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Vo(this)),this.g&&(this.readyState=3,Vo(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof ie.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;CT(this)}else t.text().then(this.Za.bind(this),this.ka.bind(this))};function CT(t){t.j.read().then(t.Xa.bind(t)).catch(t.ka.bind(t))}V.Xa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?ma(this):Vo(this),this.readyState==3&&CT(this)}};V.Za=function(t){this.g&&(this.response=this.responseText=t,ma(this))};V.Ya=function(t){this.g&&(this.response=t,ma(this))};V.ka=function(){this.g&&ma(this)};function ma(t){t.readyState=4,t.l=null,t.j=null,t.A=null,Vo(t)}V.setRequestHeader=function(t,e){this.v.append(t,e)};V.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};V.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function Vo(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(jl.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var sF=ie.JSON.parse;function je(t){st.call(this),this.headers=new Map,this.u=t||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=bT,this.L=this.M=!1}rt(je,st);var bT="",rF=/^https?$/i,iF=["POST","PUT"];V=je.prototype;V.Oa=function(t){this.M=t};V.ha=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+t);e=e?e.toUpperCase():"GET",this.I=t,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():lf.g(),this.C=this.u?Ly(this.u):Ly(lf),this.g.onreadystatechange=wt(this.La,this);try{this.G=!0,this.g.open(e,String(t),!0),this.G=!1}catch(i){$y(this,i);return}if(t=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var r in s)n.set(r,s[r]);else if(typeof s.keys=="function"&&typeof s.get=="function")for(const i of s.keys())n.set(i,s.get(i));else throw Error("Unknown input type for opt_headers: "+String(s));s=Array.from(n.keys()).find(i=>i.toLowerCase()=="content-type"),r=ie.FormData&&t instanceof ie.FormData,!(0<=H0(iF,e))||s||r||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of n)this.g.setRequestHeader(i,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{kT(this),0<this.B&&((this.L=oF(this.g))?(this.g.timeout=this.B,this.g.ontimeout=wt(this.ua,this)):this.A=up(this.ua,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(i){$y(this,i)}};function oF(t){return li&&typeof t.timeout=="number"&&t.ontimeout!==void 0}V.ua=function(){typeof Zd<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,lt(this,"timeout"),this.abort(8))};function $y(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,ST(t),Wl(t)}function ST(t){t.F||(t.F=!0,lt(t,"complete"),lt(t,"error"))}V.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,lt(this,"complete"),lt(this,"abort"),Wl(this))};V.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Wl(this,!0)),je.$.N.call(this)};V.La=function(){this.s||(this.G||this.v||this.l?RT(this):this.kb())};V.kb=function(){RT(this)};function RT(t){if(t.h&&typeof Zd<"u"&&(!t.C[1]||In(t)!=4||t.da()!=2)){if(t.v&&In(t)==4)up(t.La,0,t);else if(lt(t,"readystatechange"),In(t)==4){t.h=!1;try{const o=t.da();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var s;if(s=o===0){var r=String(t.I).match(gT)[1]||null;!r&&ie.self&&ie.self.location&&(r=ie.self.location.protocol.slice(0,-1)),s=!rF.test(r?r.toLowerCase():"")}n=s}if(n)lt(t,"complete"),lt(t,"success");else{t.m=6;try{var i=2<In(t)?t.g.statusText:""}catch{i=""}t.j=i+" ["+t.da()+"]",ST(t)}}finally{Wl(t)}}}}function Wl(t,e){if(t.g){kT(t);const n=t.g,s=t.C[0]?()=>{}:null;t.g=null,t.C=null,e||lt(t,"ready");try{n.onreadystatechange=s}catch{}}}function kT(t){t.g&&t.L&&(t.g.ontimeout=null),t.A&&(ie.clearTimeout(t.A),t.A=null)}V.isActive=function(){return!!this.g};function In(t){return t.g?t.g.readyState:0}V.da=function(){try{return 2<In(this)?this.g.status:-1}catch{return-1}};V.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};V.Wa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),sF(e)}};function Vy(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.K){case bT:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function aF(t){const e={};t=(t.g&&2<=In(t)&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let s=0;s<t.length;s++){if(Do(t[s]))continue;var n=PL(t[s]);const r=n[0];if(n=n[1],typeof n!="string")continue;n=n.trim();const i=e[r]||[];e[r]=i,i.push(n)}bL(e,function(s){return s.join(", ")})}V.Ia=function(){return this.m};V.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function AT(t){let e="";return np(t,function(n,s){e+=s,e+=":",e+=n,e+=`\r
`}),e}function mp(t,e,n){e:{for(s in n){var s=!1;break e}s=!0}s||(n=AT(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):Me(t,e,n))}function Bi(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function NT(t){this.Ga=0,this.j=[],this.l=new Fl,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=Bi("failFast",!1,t),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=Bi("baseRetryDelayMs",5e3,t),this.hb=Bi("retryDelaySeedMs",1e4,t),this.eb=Bi("forwardChannelMaxRetries",2,t),this.xa=Bi("forwardChannelRequestTimeoutMs",2e4,t),this.va=t&&t.xmlHttpFactory||void 0,this.Ha=t&&t.dc||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.i=new vT(t&&t.concurrentRequestLimit),this.Ja=new eF,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=t&&t.bc||!1,t&&t.Ea&&this.l.Ea(),t&&t.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&t&&t.detectBufferingProxy||!1,this.qa=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.qa=t.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}V=NT.prototype;V.ra=8;V.H=1;function yp(t){if(OT(t),t.H==3){var e=t.W++,n=Xn(t.I);if(Me(n,"SID",t.K),Me(n,"RID",e),Me(n,"TYPE","terminate"),ya(t,n),e=new da(t,t.l,e),e.L=2,e.v=Hl(Xn(n)),n=!1,ie.navigator&&ie.navigator.sendBeacon)try{n=ie.navigator.sendBeacon(e.v.toString(),"")}catch{}!n&&ie.Image&&(new Image().src=e.v,n=!0),n||(e.g=$T(e.l,null),e.g.ha(e.v)),e.G=Date.now(),pa(e)}FT(t)}function Kl(t){t.g&&(vp(t),t.g.cancel(),t.g=null)}function OT(t){Kl(t),t.u&&(ie.clearTimeout(t.u),t.u=null),Kc(t),t.i.cancel(),t.m&&(typeof t.m=="number"&&ie.clearTimeout(t.m),t.m=null)}function ql(t){if(!wT(t.i)&&!t.m){t.m=!0;var e=t.Na;Mo||eT(),Lo||(Mo(),Lo=!0),cp.add(e,t),t.C=0}}function cF(t,e){return ET(t.i)>=t.i.j-(t.m?1:0)?!1:t.m?(t.j=e.F.concat(t.j),!0):t.H==1||t.H==2||t.C>=(t.cb?0:t.eb)?!1:(t.m=ha(wt(t.Na,t,e),LT(t,t.C)),t.C++,!0)}V.Na=function(t){if(this.m)if(this.m=null,this.H==1){if(!t){this.W=Math.floor(1e5*Math.random()),t=this.W++;const r=new da(this,this.l,t);let i=this.s;if(this.U&&(i?(i=q0(i),z0(i,this.U)):i=this.U),this.o!==null||this.O||(r.I=i,i=null),this.P)e:{for(var e=0,n=0;n<this.j.length;n++){t:{var s=this.j[n];if("__data__"in s.map&&(s=s.map.__data__,typeof s=="string")){s=s.length;break t}s=void 0}if(s===void 0)break;if(e+=s,4096<e){e=n;break e}if(e===4096||n===this.j.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=PT(this,r,e),n=Xn(this.I),Me(n,"RID",t),Me(n,"CVER",22),this.F&&Me(n,"X-HTTP-Session-Id",this.F),ya(this,n),i&&(this.O?e="headers="+encodeURIComponent(String(AT(i)))+"&"+e:this.o&&mp(n,this.o,i)),pp(this.i,r),this.bb&&Me(n,"TYPE","init"),this.P?(Me(n,"$req",e),Me(n,"SID","null"),r.aa=!0,hf(r,n,null)):hf(r,n,e),this.H=2}}else this.H==3&&(t?By(this,t):this.j.length==0||wT(this.i)||By(this))};function By(t,e){var n;e?n=e.m:n=t.W++;const s=Xn(t.I);Me(s,"SID",t.K),Me(s,"RID",n),Me(s,"AID",t.V),ya(t,s),t.o&&t.s&&mp(s,t.o,t.s),n=new da(t,t.l,n,t.C+1),t.o===null&&(n.I=t.s),e&&(t.j=e.F.concat(t.j)),e=PT(t,n,1e3),n.setTimeout(Math.round(.5*t.xa)+Math.round(.5*t.xa*Math.random())),pp(t.i,n),hf(n,s,e)}function ya(t,e){t.na&&np(t.na,function(n,s){Me(e,s,n)}),t.h&&pT({},function(n,s){Me(e,s,n)})}function PT(t,e,n){n=Math.min(t.j.length,n);var s=t.h?wt(t.h.Va,t.h,t):null;e:{var r=t.j;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=r[0].g,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let c=0;c<n;c++){let l=r[c].g;const u=r[c].map;if(l-=i,0>l)i=Math.max(0,r[c].g-100),a=!1;else try{tF(u,o,"req"+l+"_")}catch{s&&s(u)}}if(a){s=o.join("&");break e}}}return t=t.j.splice(0,n),e.F=t,s}function DT(t){if(!t.g&&!t.u){t.ba=1;var e=t.Ma;Mo||eT(),Lo||(Mo(),Lo=!0),cp.add(e,t),t.A=0}}function _p(t){return t.g||t.u||3<=t.A?!1:(t.ba++,t.u=ha(wt(t.Ma,t),LT(t,t.A)),t.A++,!0)}V.Ma=function(){if(this.u=null,xT(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var t=2*this.S;this.l.info("BP detection timer enabled: "+t),this.B=ha(wt(this.jb,this),t)}};V.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,Rt(10),Kl(this),xT(this))};function vp(t){t.B!=null&&(ie.clearTimeout(t.B),t.B=null)}function xT(t){t.g=new da(t,t.l,"rpc",t.ba),t.o===null&&(t.g.I=t.s),t.g.O=0;var e=Xn(t.wa);Me(e,"RID","rpc"),Me(e,"SID",t.K),Me(e,"AID",t.V),Me(e,"CI",t.G?"0":"1"),!t.G&&t.qa&&Me(e,"TO",t.qa),Me(e,"TYPE","xmlhttp"),ya(t,e),t.o&&t.s&&mp(e,t.o,t.s),t.L&&t.g.setTimeout(t.L);var n=t.g;t=t.pa,n.L=1,n.v=Hl(Xn(e)),n.s=null,n.S=!0,uT(n,t)}V.ib=function(){this.v!=null&&(this.v=null,Kl(this),_p(this),Rt(19))};function Kc(t){t.v!=null&&(ie.clearTimeout(t.v),t.v=null)}function MT(t,e){var n=null;if(t.g==e){Kc(t),vp(t),t.g=null;var s=2}else if(df(t.i,e))n=e.F,TT(t.i,e),s=1;else return;if(t.H!=0){if(e.i)if(s==1){n=e.s?e.s.length:0,e=Date.now()-e.G;var r=t.C;s=Ul(),lt(s,new oT(s,n)),ql(t)}else DT(t);else if(r=e.o,r==3||r==0&&0<e.ca||!(s==1&&cF(t,e)||s==2&&_p(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),r){case 1:Ks(t,5);break;case 4:Ks(t,10);break;case 3:Ks(t,6);break;default:Ks(t,2)}}}function LT(t,e){let n=t.ab+Math.floor(Math.random()*t.hb);return t.isActive()||(n*=2),n*e}function Ks(t,e){if(t.l.info("Error code "+e),e==2){var n=null;t.h&&(n=null);var s=wt(t.pb,t);n||(n=new Zs("//www.google.com/images/cleardot.gif"),ie.location&&ie.location.protocol=="http"||jc(n,"https"),Hl(n)),nF(n.toString(),s)}else Rt(2);t.H=0,t.h&&t.h.za(e),FT(t),OT(t)}V.pb=function(t){t?(this.l.info("Successfully pinged google.com"),Rt(2)):(this.l.info("Failed to ping google.com"),Rt(1))};function FT(t){if(t.H=0,t.ma=[],t.h){const e=IT(t.i);(e.length!=0||t.j.length!=0)&&(Oy(t.ma,e),Oy(t.ma,t.j),t.i.i.length=0,ep(t.j),t.j.length=0),t.h.ya()}}function UT(t,e,n){var s=n instanceof Zs?Xn(n):new Zs(n);if(s.g!="")e&&(s.g=e+"."+s.g),Wc(s,s.m);else{var r=ie.location;s=r.protocol,e=e?e+"."+r.hostname:r.hostname,r=+r.port;var i=new Zs(null);s&&jc(i,s),e&&(i.g=e),r&&Wc(i,r),n&&(i.l=n),s=i}return n=t.F,e=t.Da,n&&e&&Me(s,n,e),Me(s,"VER",t.ra),ya(t,s),s}function $T(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Ha&&!t.va?new je(new ga({ob:!0})):new je(t.va),e.Oa(t.J),e}V.isActive=function(){return!!this.h&&this.h.isActive(this)};function VT(){}V=VT.prototype;V.Ba=function(){};V.Aa=function(){};V.za=function(){};V.ya=function(){};V.isActive=function(){return!0};V.Va=function(){};function qc(){if(li&&!(10<=Number(EL)))throw Error("Environmental error: no available transport.")}qc.prototype.g=function(t,e){return new qt(t,e)};function qt(t,e){st.call(this),this.g=new NT(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(t?t["X-WebChannel-Client-Profile"]=e.Ca:t={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=t,(t=e&&e.cc)&&!Do(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Do(e)&&(this.g.F=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new Ai(this)}rt(qt,st);qt.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var t=this.g,e=this.l,n=this.h||void 0;Rt(0),t.Y=e,t.na=n||{},t.G=t.aa,t.I=UT(t,null,t.Y),ql(t)};qt.prototype.close=function(){yp(this.g)};qt.prototype.u=function(t){var e=this.g;if(typeof t=="string"){var n={};n.__data__=t,t=n}else this.v&&(n={},n.__data__=ap(t),t=n);e.j.push(new JL(e.fb++,t)),e.H==3&&ql(e)};qt.prototype.N=function(){this.g.h=null,delete this.j,yp(this.g),delete this.g,qt.$.N.call(this)};function BT(t){fp.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}rt(BT,fp);function HT(){dp.call(this),this.status=1}rt(HT,dp);function Ai(t){this.g=t}rt(Ai,VT);Ai.prototype.Ba=function(){lt(this.g,"a")};Ai.prototype.Aa=function(t){lt(this.g,new BT(t))};Ai.prototype.za=function(t){lt(this.g,new HT)};Ai.prototype.ya=function(){lt(this.g,"b")};function lF(){this.blockSize=-1}function pn(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}rt(pn,lF);pn.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function zu(t,e,n){n||(n=0);var s=Array(16);if(typeof e=="string")for(var r=0;16>r;++r)s[r]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(r=0;16>r;++r)s[r]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],r=t.g[2];var i=t.g[3],o=e+(i^n&(r^i))+s[0]+3614090360&4294967295;e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[1]+3905402710&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[2]+606105819&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[3]+3250441966&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(i^n&(r^i))+s[4]+4118548399&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[5]+1200080426&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[6]+2821735955&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[7]+4249261313&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(i^n&(r^i))+s[8]+1770035416&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[9]+2336552879&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[10]+4294925233&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[11]+2304563134&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(i^n&(r^i))+s[12]+1804603682&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[13]+4254626195&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[14]+2792965006&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[15]+1236535329&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(r^i&(n^r))+s[1]+4129170786&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[6]+3225465664&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[11]+643717713&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[0]+3921069994&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(r^i&(n^r))+s[5]+3593408605&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[10]+38016083&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[15]+3634488961&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[4]+3889429448&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(r^i&(n^r))+s[9]+568446438&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[14]+3275163606&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[3]+4107603335&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[8]+1163531501&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(r^i&(n^r))+s[13]+2850285829&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[2]+4243563512&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[7]+1735328473&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[12]+2368359562&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(n^r^i)+s[5]+4294588738&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[8]+2272392833&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[11]+1839030562&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[14]+4259657740&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(n^r^i)+s[1]+2763975236&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[4]+1272893353&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[7]+4139469664&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[10]+3200236656&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(n^r^i)+s[13]+681279174&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[0]+3936430074&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[3]+3572445317&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[6]+76029189&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(n^r^i)+s[9]+3654602809&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[12]+3873151461&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[15]+530742520&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[2]+3299628645&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(r^(n|~i))+s[0]+4096336452&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[7]+1126891415&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[14]+2878612391&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[5]+4237533241&4294967295,n=r+(o<<21&4294967295|o>>>11),o=e+(r^(n|~i))+s[12]+1700485571&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[3]+2399980690&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[10]+4293915773&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[1]+2240044497&4294967295,n=r+(o<<21&4294967295|o>>>11),o=e+(r^(n|~i))+s[8]+1873313359&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[15]+4264355552&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[6]+2734768916&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[13]+1309151649&4294967295,n=r+(o<<21&4294967295|o>>>11),o=e+(r^(n|~i))+s[4]+4149444226&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[11]+3174756917&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[2]+718787259&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(r+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+r&4294967295,t.g[3]=t.g[3]+i&4294967295}pn.prototype.j=function(t,e){e===void 0&&(e=t.length);for(var n=e-this.blockSize,s=this.m,r=this.h,i=0;i<e;){if(r==0)for(;i<=n;)zu(this,t,i),i+=this.blockSize;if(typeof t=="string"){for(;i<e;)if(s[r++]=t.charCodeAt(i++),r==this.blockSize){zu(this,s),r=0;break}}else for(;i<e;)if(s[r++]=t[i++],r==this.blockSize){zu(this,s),r=0;break}}this.h=r,this.i+=e};pn.prototype.l=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.i;for(e=t.length-8;e<t.length;++e)t[e]=n&255,n/=256;for(this.j(t),t=Array(16),e=n=0;4>e;++e)for(var s=0;32>s;s+=8)t[n++]=this.g[e]>>>s&255;return t};function be(t,e){this.h=e;for(var n=[],s=!0,r=t.length-1;0<=r;r--){var i=t[r]|0;s&&i==e||(n[r]=i,s=!1)}this.g=n}var uF={};function wp(t){return-128<=t&&128>t?_L(t,function(e){return new be([e|0],0>e?-1:0)}):new be([t|0],0>t?-1:0)}function Cn(t){if(isNaN(t)||!isFinite(t))return Kr;if(0>t)return at(Cn(-t));for(var e=[],n=1,s=0;t>=n;s++)e[s]=t/n|0,n*=pf;return new be(e,0)}function jT(t,e){if(t.length==0)throw Error("number format error: empty string");if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(t.charAt(0)=="-")return at(jT(t.substring(1),e));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=Cn(Math.pow(e,8)),s=Kr,r=0;r<t.length;r+=8){var i=Math.min(8,t.length-r),o=parseInt(t.substring(r,r+i),e);8>i?(i=Cn(Math.pow(e,i)),s=s.R(i).add(Cn(o))):(s=s.R(n),s=s.add(Cn(o)))}return s}var pf=4294967296,Kr=wp(0),gf=wp(1),Hy=wp(16777216);V=be.prototype;V.ea=function(){if(Yt(this))return-at(this).ea();for(var t=0,e=1,n=0;n<this.g.length;n++){var s=this.D(n);t+=(0<=s?s:pf+s)*e,e*=pf}return t};V.toString=function(t){if(t=t||10,2>t||36<t)throw Error("radix out of range: "+t);if(Kn(this))return"0";if(Yt(this))return"-"+at(this).toString(t);for(var e=Cn(Math.pow(t,6)),n=this,s="";;){var r=Gc(n,e).g;n=zc(n,r.R(e));var i=((0<n.g.length?n.g[0]:n.h)>>>0).toString(t);if(n=r,Kn(n))return i+s;for(;6>i.length;)i="0"+i;s=i+s}};V.D=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h};function Kn(t){if(t.h!=0)return!1;for(var e=0;e<t.g.length;e++)if(t.g[e]!=0)return!1;return!0}function Yt(t){return t.h==-1}V.X=function(t){return t=zc(this,t),Yt(t)?-1:Kn(t)?0:1};function at(t){for(var e=t.g.length,n=[],s=0;s<e;s++)n[s]=~t.g[s];return new be(n,~t.h).add(gf)}V.abs=function(){return Yt(this)?at(this):this};V.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0,r=0;r<=e;r++){var i=s+(this.D(r)&65535)+(t.D(r)&65535),o=(i>>>16)+(this.D(r)>>>16)+(t.D(r)>>>16);s=o>>>16,i&=65535,o&=65535,n[r]=o<<16|i}return new be(n,n[n.length-1]&-2147483648?-1:0)};function zc(t,e){return t.add(at(e))}V.R=function(t){if(Kn(this)||Kn(t))return Kr;if(Yt(this))return Yt(t)?at(this).R(at(t)):at(at(this).R(t));if(Yt(t))return at(this.R(at(t)));if(0>this.X(Hy)&&0>t.X(Hy))return Cn(this.ea()*t.ea());for(var e=this.g.length+t.g.length,n=[],s=0;s<2*e;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(var r=0;r<t.g.length;r++){var i=this.D(s)>>>16,o=this.D(s)&65535,a=t.D(r)>>>16,c=t.D(r)&65535;n[2*s+2*r]+=o*c,za(n,2*s+2*r),n[2*s+2*r+1]+=i*c,za(n,2*s+2*r+1),n[2*s+2*r+1]+=o*a,za(n,2*s+2*r+1),n[2*s+2*r+2]+=i*a,za(n,2*s+2*r+2)}for(s=0;s<e;s++)n[s]=n[2*s+1]<<16|n[2*s];for(s=e;s<2*e;s++)n[s]=0;return new be(n,0)};function za(t,e){for(;(t[e]&65535)!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function Hi(t,e){this.g=t,this.h=e}function Gc(t,e){if(Kn(e))throw Error("division by zero");if(Kn(t))return new Hi(Kr,Kr);if(Yt(t))return e=Gc(at(t),e),new Hi(at(e.g),at(e.h));if(Yt(e))return e=Gc(t,at(e)),new Hi(at(e.g),e.h);if(30<t.g.length){if(Yt(t)||Yt(e))throw Error("slowDivide_ only works with positive integers.");for(var n=gf,s=e;0>=s.X(t);)n=jy(n),s=jy(s);var r=Cr(n,1),i=Cr(s,1);for(s=Cr(s,2),n=Cr(n,2);!Kn(s);){var o=i.add(s);0>=o.X(t)&&(r=r.add(n),i=o),s=Cr(s,1),n=Cr(n,1)}return e=zc(t,r.R(e)),new Hi(r,e)}for(r=Kr;0<=t.X(e);){for(n=Math.max(1,Math.floor(t.ea()/e.ea())),s=Math.ceil(Math.log(n)/Math.LN2),s=48>=s?1:Math.pow(2,s-48),i=Cn(n),o=i.R(e);Yt(o)||0<o.X(t);)n-=s,i=Cn(n),o=i.R(e);Kn(i)&&(i=gf),r=r.add(i),t=zc(t,o)}return new Hi(r,t)}V.gb=function(t){return Gc(this,t).h};V.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.D(s)&t.D(s);return new be(n,this.h&t.h)};V.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.D(s)|t.D(s);return new be(n,this.h|t.h)};V.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.D(s)^t.D(s);return new be(n,this.h^t.h)};function jy(t){for(var e=t.g.length+1,n=[],s=0;s<e;s++)n[s]=t.D(s)<<1|t.D(s-1)>>>31;return new be(n,t.h)}function Cr(t,e){var n=e>>5;e%=32;for(var s=t.g.length-n,r=[],i=0;i<s;i++)r[i]=0<e?t.D(i+n)>>>e|t.D(i+n+1)<<32-e:t.D(i+n);return new be(r,t.h)}qc.prototype.createWebChannel=qc.prototype.g;qt.prototype.send=qt.prototype.u;qt.prototype.open=qt.prototype.m;qt.prototype.close=qt.prototype.close;$l.NO_ERROR=0;$l.TIMEOUT=8;$l.HTTP_ERROR=6;aT.COMPLETE="complete";cT.EventType=fa;fa.OPEN="a";fa.CLOSE="b";fa.ERROR="c";fa.MESSAGE="d";st.prototype.listen=st.prototype.O;je.prototype.listenOnce=je.prototype.P;je.prototype.getLastError=je.prototype.Sa;je.prototype.getLastErrorCode=je.prototype.Ia;je.prototype.getStatus=je.prototype.da;je.prototype.getResponseJson=je.prototype.Wa;je.prototype.getResponseText=je.prototype.ja;je.prototype.send=je.prototype.ha;je.prototype.setWithCredentials=je.prototype.Oa;pn.prototype.digest=pn.prototype.l;pn.prototype.reset=pn.prototype.reset;pn.prototype.update=pn.prototype.j;be.prototype.add=be.prototype.add;be.prototype.multiply=be.prototype.R;be.prototype.modulo=be.prototype.gb;be.prototype.compare=be.prototype.X;be.prototype.toNumber=be.prototype.ea;be.prototype.toString=be.prototype.toString;be.prototype.getBits=be.prototype.D;be.fromNumber=Cn;be.fromString=jT;var hF=function(){return new qc},fF=function(){return Ul()},Gu=$l,dF=aT,pF=gr,Wy={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},gF=ga,Ga=cT,mF=je,yF=pn,qr=be;const Ky="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ft.UNAUTHENTICATED=new ft(null),ft.GOOGLE_CREDENTIALS=new ft("google-credentials-uid"),ft.FIRST_PARTY=new ft("first-party-uid"),ft.MOCK_USER=new ft("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ni="9.22.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar=new Xo("@firebase/firestore");function qy(){return ar.logLevel}function z(t,...e){if(ar.logLevel<=_e.DEBUG){const n=e.map(Ep);ar.debug(`Firestore (${Ni}): ${t}`,...n)}}function Zn(t,...e){if(ar.logLevel<=_e.ERROR){const n=e.map(Ep);ar.error(`Firestore (${Ni}): ${t}`,...n)}}function ui(t,...e){if(ar.logLevel<=_e.WARN){const n=e.map(Ep);ar.warn(`Firestore (${Ni}): ${t}`,...n)}}function Ep(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(t="Unexpected state"){const e=`FIRESTORE (${Ni}) INTERNAL ASSERTION FAILED: `+t;throw Zn(e),new Error(e)}function Fe(t,e){t||se()}function le(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class G extends Mn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class _F{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ft.UNAUTHENTICATED))}shutdown(){}}class vF{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class wF{constructor(e){this.t=e,this.currentUser=ft.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let s=this.i;const r=c=>this.i!==s?(s=this.i,n(c)):Promise.resolve();let i=new Gn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Gn,e.enqueueRetryable(()=>r(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await r(this.currentUser)})},a=c=>{z("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(z("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Gn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(z("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Fe(typeof s.accessToken=="string"),new WT(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return Fe(e===null||typeof e=="string"),new ft(e)}}class EF{constructor(e,n,s){this.h=e,this.l=n,this.m=s,this.type="FirstParty",this.user=ft.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const e=this.p();return e&&this.g.set("Authorization",e),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class TF{constructor(e,n,s){this.h=e,this.l=n,this.m=s}getToken(){return Promise.resolve(new EF(this.h,this.l,this.m))}start(e,n){e.enqueueRetryable(()=>n(ft.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class IF{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class CF{constructor(e){this.I=e,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(e,n){const s=i=>{i.error!=null&&z("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.T;return this.T=i.token,z("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const r=i=>{z("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.I.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.I.getImmediate({optional:!0});i?r(i):z("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Fe(typeof n.token=="string"),this.T=n.token,new IF(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bF(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KT{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const r=bF(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<n&&(s+=e.charAt(r[i]%e.length))}return s}}function we(t,e){return t<e?-1:t>e?1:0}function hi(t,e,n){return t.length===e.length&&t.every((s,r)=>n(s,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new G(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new G(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new G(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new G(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ge.fromMillis(Date.now())}static fromDate(e){return Ge.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*n));return new Ge(n,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?we(this.nanoseconds,e.nanoseconds):we(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ae(e)}static min(){return new ae(new Ge(0,0))}static max(){return new ae(new Ge(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{constructor(e,n,s){n===void 0?n=0:n>e.length&&se(),s===void 0?s=e.length-n:s>e.length-n&&se(),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return Bo.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Bo?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let r=0;r<s;r++){const i=e.get(r),o=n.get(r);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class $e extends Bo{construct(e,n,s){return new $e(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new G(N.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(r=>r.length>0))}return new $e(n)}static emptyPath(){return new $e([])}}const SF=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class _t extends Bo{construct(e,n,s){return new _t(e,n,s)}static isValidIdentifier(e){return SF.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),_t.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new _t(["__name__"])}static fromServerFormat(e){const n=[];let s="",r=0;const i=()=>{if(s.length===0)throw new G(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let o=!1;for(;r<e.length;){const a=e[r];if(a==="\\"){if(r+1===e.length)throw new G(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[r+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new G(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=c,r+=2}else a==="`"?(o=!o,r++):a!=="."||o?(s+=a,r++):(i(),r++)}if(i(),o)throw new G(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new _t(n)}static emptyPath(){return new _t([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(e){this.path=e}static fromPath(e){return new ee($e.fromString(e))}static fromName(e){return new ee($e.fromString(e).popFirst(5))}static empty(){return new ee($e.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&$e.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return $e.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ee(new $e(e.slice()))}}function RF(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=ae.fromTimestamp(s===1e9?new Ge(n+1,0):new Ge(n,s));return new Rs(r,ee.empty(),e)}function kF(t){return new Rs(t.readTime,t.key,-1)}class Rs{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new Rs(ae.min(),ee.empty(),-1)}static max(){return new Rs(ae.max(),ee.empty(),-1)}}function AF(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=ee.comparator(t.documentKey,e.documentKey),n!==0?n:we(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NF="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class OF{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _a(t){if(t.code!==N.FAILED_PRECONDITION||t.message!==NF)throw t;z("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&se(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new M((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,r)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof M?n:M.resolve(n)}catch(n){return M.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):M.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):M.reject(n)}static resolve(e){return new M((n,s)=>{n(e)})}static reject(e){return new M((n,s)=>{s(e)})}static waitFor(e){return new M((n,s)=>{let r=0,i=0,o=!1;e.forEach(a=>{++r,a.next(()=>{++i,o&&i===r&&n()},c=>s(c))}),o=!0,i===r&&n()})}static or(e){let n=M.resolve(!1);for(const s of e)n=n.next(r=>r?M.resolve(r):s());return n}static forEach(e,n){const s=[];return e.forEach((r,i)=>{s.push(n.call(this,r,i))}),this.waitFor(s)}static mapArray(e,n){return new M((s,r)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const l=c;n(e[l]).next(u=>{o[l]=u,++a,a===i&&s(o)},u=>r(u))}})}static doWhile(e,n){return new M((s,r)=>{const i=()=>{e()===!0?n().next(()=>{i()},r):s()};i()})}}function va(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.ot(s),this.ut=s=>n.writeSequenceNumber(s))}ot(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ut&&this.ut(e),e}}Tp.ct=-1;function zl(t){return t==null}function Qc(t){return t===0&&1/t==-1/0}function PF(t){return typeof t=="number"&&Number.isInteger(t)&&!Qc(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function mr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function qT(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e,n){this.comparator=e,this.root=n||ot.EMPTY}insert(e,n){return new Ve(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,ot.BLACK,null,null))}remove(e){return new Ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ot.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return n+s.left.size;r<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Qa(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Qa(this.root,e,this.comparator,!1)}getReverseIterator(){return new Qa(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Qa(this.root,e,this.comparator,!0)}}class Qa{constructor(e,n,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?s(e.key,n):1,n&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ot{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??ot.RED,this.left=r??ot.EMPTY,this.right=i??ot.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,r,i){return new ot(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r.copy(null,n,null,null,null):r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return ot.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,r=this;if(n(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),n(e,r.key)===0){if(r.right.isEmpty())return ot.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ot.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ot.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw se();const e=this.left.check();if(e!==this.right.check())throw se();return e+(this.isRed()?0:1)}}ot.EMPTY=null,ot.RED=!0,ot.BLACK=!1;ot.EMPTY=new class{constructor(){this.size=0}get key(){throw se()}get value(){throw se()}get color(){throw se()}get left(){throw se()}get right(){throw se()}copy(t,e,n,s,r){return this}insert(t,e,n){return new ot(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this.comparator=e,this.data=new Ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;n(r.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Gy(this.data.getIterator())}getIteratorFrom(e){return new Gy(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof Tt)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Tt(this.comparator);return n.data=e,n}}class Gy{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this.fields=e,e.sort(_t.comparator)}static empty(){return new Bt([])}unionWith(e){let n=new Tt(_t.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new Bt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return hi(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zT extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new zT("Invalid base64 string: "+r):r}}(e);return new bt(n)}static fromUint8Array(e){const n=function(s){let r="";for(let i=0;i<s.length;++i)r+=String.fromCharCode(s[i]);return r}(e);return new bt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return we(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}bt.EMPTY_BYTE_STRING=new bt("");const DF=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ks(t){if(Fe(!!t),typeof t=="string"){let e=0;const n=DF.exec(t);if(Fe(!!n),n[1]){let r=n[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:qe(t.seconds),nanos:qe(t.nanos)}}function qe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function cr(t){return typeof t=="string"?bt.fromBase64String(t):bt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ip(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Cp(t){const e=t.mapValue.fields.__previous_value__;return Ip(e)?Cp(e):e}function Ho(t){const e=ks(t.mapValue.fields.__local_write_time__.timestampValue);return new Ge(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xF{constructor(e,n,s,r,i,o,a,c,l){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l}}class jo{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new jo("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof jo&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function lr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Ip(t)?4:MF(t)?9007199254740991:10:se()}function Pn(t,e){if(t===e)return!0;const n=lr(t);if(n!==lr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Ho(t).isEqual(Ho(e));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const i=ks(s.timestampValue),o=ks(r.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,r){return cr(s.bytesValue).isEqual(cr(r.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,r){return qe(s.geoPointValue.latitude)===qe(r.geoPointValue.latitude)&&qe(s.geoPointValue.longitude)===qe(r.geoPointValue.longitude)}(t,e);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return qe(s.integerValue)===qe(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const i=qe(s.doubleValue),o=qe(r.doubleValue);return i===o?Qc(i)===Qc(o):isNaN(i)&&isNaN(o)}return!1}(t,e);case 9:return hi(t.arrayValue.values||[],e.arrayValue.values||[],Pn);case 10:return function(s,r){const i=s.mapValue.fields||{},o=r.mapValue.fields||{};if(zy(i)!==zy(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!Pn(i[a],o[a])))return!1;return!0}(t,e);default:return se()}}function Wo(t,e){return(t.values||[]).find(n=>Pn(n,e))!==void 0}function fi(t,e){if(t===e)return 0;const n=lr(t),s=lr(e);if(n!==s)return we(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return we(t.booleanValue,e.booleanValue);case 2:return function(r,i){const o=qe(r.integerValue||r.doubleValue),a=qe(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(t,e);case 3:return Qy(t.timestampValue,e.timestampValue);case 4:return Qy(Ho(t),Ho(e));case 5:return we(t.stringValue,e.stringValue);case 6:return function(r,i){const o=cr(r),a=cr(i);return o.compareTo(a)}(t.bytesValue,e.bytesValue);case 7:return function(r,i){const o=r.split("/"),a=i.split("/");for(let c=0;c<o.length&&c<a.length;c++){const l=we(o[c],a[c]);if(l!==0)return l}return we(o.length,a.length)}(t.referenceValue,e.referenceValue);case 8:return function(r,i){const o=we(qe(r.latitude),qe(i.latitude));return o!==0?o:we(qe(r.longitude),qe(i.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(r,i){const o=r.values||[],a=i.values||[];for(let c=0;c<o.length&&c<a.length;++c){const l=fi(o[c],a[c]);if(l)return l}return we(o.length,a.length)}(t.arrayValue,e.arrayValue);case 10:return function(r,i){if(r===Ya.mapValue&&i===Ya.mapValue)return 0;if(r===Ya.mapValue)return 1;if(i===Ya.mapValue)return-1;const o=r.fields||{},a=Object.keys(o),c=i.fields||{},l=Object.keys(c);a.sort(),l.sort();for(let u=0;u<a.length&&u<l.length;++u){const h=we(a[u],l[u]);if(h!==0)return h;const f=fi(o[a[u]],c[l[u]]);if(f!==0)return f}return we(a.length,l.length)}(t.mapValue,e.mapValue);default:throw se()}}function Qy(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return we(t,e);const n=ks(t),s=ks(e),r=we(n.seconds,s.seconds);return r!==0?r:we(n.nanos,s.nanos)}function di(t){return mf(t)}function mf(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(s){const r=ks(s);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?cr(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,ee.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(s){let r="[",i=!0;for(const o of s.values||[])i?i=!1:r+=",",r+=mf(o);return r+"]"}(t.arrayValue):"mapValue"in t?function(s){const r=Object.keys(s.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${mf(s.fields[a])}`;return i+"}"}(t.mapValue):se();var e,n}function yf(t){return!!t&&"integerValue"in t}function bp(t){return!!t&&"arrayValue"in t}function Yy(t){return!!t&&"nullValue"in t}function Jy(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function oc(t){return!!t&&"mapValue"in t}function uo(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return mr(t.mapValue.fields,(n,s)=>e.mapValue.fields[n]=uo(s)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=uo(t.arrayValue.values[n]);return e}return Object.assign({},t)}function MF(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.value=e}static empty(){return new Lt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!oc(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=uo(n)}setAll(e){let n=_t.emptyPath(),s={},r=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,s,r),s={},r=[],n=a.popLast()}o?s[a.lastSegment()]=uo(o):r.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,r)}delete(e){const n=this.field(e.popLast());oc(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Pn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=n.mapValue.fields[e.get(s)];oc(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=r),n=r}return n.mapValue.fields}applyChanges(e,n,s){mr(n,(r,i)=>e[r]=i);for(const r of s)delete e[r]}clone(){return new Lt(uo(this.value))}}function GT(t){const e=[];return mr(t.fields,(n,s)=>{const r=new _t([n]);if(oc(s)){const i=GT(s.mapValue).fields;if(i.length===0)e.push(r);else for(const o of i)e.push(r.child(o))}else e.push(r)}),new Bt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,n,s,r,i,o,a){this.key=e,this.documentType=n,this.version=s,this.readTime=r,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new gt(e,0,ae.min(),ae.min(),ae.min(),Lt.empty(),0)}static newFoundDocument(e,n,s,r){return new gt(e,1,n,ae.min(),s,r,0)}static newNoDocument(e,n){return new gt(e,2,n,ae.min(),ae.min(),Lt.empty(),0)}static newUnknownDocument(e,n){return new gt(e,3,n,ae.min(),ae.min(),Lt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ae.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Lt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Lt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ae.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof gt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new gt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc{constructor(e,n){this.position=e,this.inclusive=n}}function Xy(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(i.field.isKeyField()?s=ee.comparator(ee.fromName(o.referenceValue),n.key):s=fi(o,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function Zy(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Pn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(e,n="asc"){this.field=e,this.dir=n}}function LF(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QT{}class Ye extends QT{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,s):new UF(e,n,s):n==="array-contains"?new BF(e,s):n==="in"?new HF(e,s):n==="not-in"?new jF(e,s):n==="array-contains-any"?new WF(e,s):new Ye(e,n,s)}static createKeyFieldInFilter(e,n,s){return n==="in"?new $F(e,s):new VF(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(fi(n,this.value)):n!==null&&lr(this.value)===lr(n)&&this.matchesComparison(fi(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return se()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class Dn extends QT{constructor(e,n){super(),this.filters=e,this.op=n,this.lt=null}static create(e,n){return new Dn(e,n)}matches(e){return YT(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.lt!==null||(this.lt=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.lt}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.ft(n=>n.isInequality());return e!==null?e.field:null}ft(e){for(const n of this.getFlattenedFilters())if(e(n))return n;return null}}function YT(t){return t.op==="and"}function JT(t){return FF(t)&&YT(t)}function FF(t){for(const e of t.filters)if(e instanceof Dn)return!1;return!0}function _f(t){if(t instanceof Ye)return t.field.canonicalString()+t.op.toString()+di(t.value);if(JT(t))return t.filters.map(e=>_f(e)).join(",");{const e=t.filters.map(n=>_f(n)).join(",");return`${t.op}(${e})`}}function XT(t,e){return t instanceof Ye?function(n,s){return s instanceof Ye&&n.op===s.op&&n.field.isEqual(s.field)&&Pn(n.value,s.value)}(t,e):t instanceof Dn?function(n,s){return s instanceof Dn&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((r,i,o)=>r&&XT(i,s.filters[o]),!0):!1}(t,e):void se()}function ZT(t){return t instanceof Ye?function(e){return`${e.field.canonicalString()} ${e.op} ${di(e.value)}`}(t):t instanceof Dn?function(e){return e.op.toString()+" {"+e.getFilters().map(ZT).join(" ,")+"}"}(t):"Filter"}class UF extends Ye{constructor(e,n,s){super(e,n,s),this.key=ee.fromName(s.referenceValue)}matches(e){const n=ee.comparator(e.key,this.key);return this.matchesComparison(n)}}class $F extends Ye{constructor(e,n){super(e,"in",n),this.keys=eI("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class VF extends Ye{constructor(e,n){super(e,"not-in",n),this.keys=eI("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function eI(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(s=>ee.fromName(s.referenceValue))}class BF extends Ye{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return bp(n)&&Wo(n.arrayValue,this.value)}}class HF extends Ye{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Wo(this.value.arrayValue,n)}}class jF extends Ye{constructor(e,n){super(e,"not-in",n)}matches(e){if(Wo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Wo(this.value.arrayValue,n)}}class WF extends Ye{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!bp(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>Wo(this.value.arrayValue,s))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KF{constructor(e,n=null,s=[],r=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=a,this.dt=null}}function e_(t,e=null,n=[],s=[],r=null,i=null,o=null){return new KF(t,e,n,s,r,i,o)}function Sp(t){const e=le(t);if(e.dt===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>_f(s)).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(r){return r.field.canonicalString()+r.dir}(s)).join(","),zl(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>di(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>di(s)).join(",")),e.dt=n}return e.dt}function Rp(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!LF(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!XT(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Zy(t.startAt,e.startAt)&&Zy(t.endAt,e.endAt)}function vf(t){return ee.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(e,n=null,s=[],r=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.wt=null,this._t=null,this.startAt,this.endAt}}function qF(t,e,n,s,r,i,o,a){return new Gl(t,e,n,s,r,i,o,a)}function Ql(t){return new Gl(t)}function t_(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function zF(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function GF(t){for(const e of t.filters){const n=e.getFirstInequalityField();if(n!==null)return n}return null}function QF(t){return t.collectionGroup!==null}function zr(t){const e=le(t);if(e.wt===null){e.wt=[];const n=GF(e),s=zF(e);if(n!==null&&s===null)n.isKeyField()||e.wt.push(new ho(n)),e.wt.push(new ho(_t.keyField(),"asc"));else{let r=!1;for(const i of e.explicitOrderBy)e.wt.push(i),i.field.isKeyField()&&(r=!0);if(!r){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.wt.push(new ho(_t.keyField(),i))}}}return e.wt}function es(t){const e=le(t);if(!e._t)if(e.limitType==="F")e._t=e_(e.path,e.collectionGroup,zr(e),e.filters,e.limit,e.startAt,e.endAt);else{const n=[];for(const i of zr(e)){const o=i.dir==="desc"?"asc":"desc";n.push(new ho(i.field,o))}const s=e.endAt?new Yc(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Yc(e.startAt.position,e.startAt.inclusive):null;e._t=e_(e.path,e.collectionGroup,n,e.filters,e.limit,s,r)}return e._t}function wf(t,e,n){return new Gl(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Yl(t,e){return Rp(es(t),es(e))&&t.limitType===e.limitType}function tI(t){return`${Sp(es(t))}|lt:${t.limitType}`}function Ef(t){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(s=>ZT(s)).join(", ")}]`),zl(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(s=>function(r){return`${r.field.canonicalString()} (${r.dir})`}(s)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>di(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>di(s)).join(",")),`Target(${n})`}(es(t))}; limitType=${t.limitType})`}function Jl(t,e){return e.isFoundDocument()&&function(n,s){const r=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(r):ee.isDocumentKey(n.path)?n.path.isEqual(r):n.path.isImmediateParentOf(r)}(t,e)&&function(n,s){for(const r of zr(n))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(t,e)&&function(n,s){for(const r of n.filters)if(!r.matches(s))return!1;return!0}(t,e)&&function(n,s){return!(n.startAt&&!function(r,i,o){const a=Xy(r,i,o);return r.inclusive?a<=0:a<0}(n.startAt,zr(n),s)||n.endAt&&!function(r,i,o){const a=Xy(r,i,o);return r.inclusive?a>=0:a>0}(n.endAt,zr(n),s))}(t,e)}function YF(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function nI(t){return(e,n)=>{let s=!1;for(const r of zr(t)){const i=JF(r,e,n);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function JF(t,e,n){const s=t.field.isKeyField()?ee.comparator(e.key,n.key):function(r,i,o){const a=i.data.field(r),c=o.data.field(r);return a!==null&&c!==null?fi(a,c):se()}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return se()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,n]);r.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[n]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){mr(this.inner,(n,s)=>{for(const[r,i]of s)e(r,i)})}isEmpty(){return qT(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XF=new Ve(ee.comparator);function ts(){return XF}const sI=new Ve(ee.comparator);function Qi(...t){let e=sI;for(const n of t)e=e.insert(n.key,n);return e}function rI(t){let e=sI;return t.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function qs(){return fo()}function iI(){return fo()}function fo(){return new Oi(t=>t.toString(),(t,e)=>t.isEqual(e))}const ZF=new Ve(ee.comparator),eU=new Tt(ee.comparator);function he(...t){let e=eU;for(const n of t)e=e.add(n);return e}const tU=new Tt(we);function nU(){return tU}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oI(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Qc(e)?"-0":e}}function aI(t){return{integerValue:""+t}}function sU(t,e){return PF(e)?aI(e):oI(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(){this._=void 0}}function rU(t,e,n){return t instanceof Jc?function(s,r){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&Ip(r)&&(r=Cp(r)),r&&(i.fields.__previous_value__=r),{mapValue:i}}(n,e):t instanceof Ko?lI(t,e):t instanceof qo?uI(t,e):function(s,r){const i=cI(s,r),o=n_(i)+n_(s.gt);return yf(i)&&yf(s.gt)?aI(o):oI(s.serializer,o)}(t,e)}function iU(t,e,n){return t instanceof Ko?lI(t,e):t instanceof qo?uI(t,e):n}function cI(t,e){return t instanceof Xc?yf(n=e)||function(s){return!!s&&"doubleValue"in s}(n)?e:{integerValue:0}:null;var n}class Jc extends Xl{}class Ko extends Xl{constructor(e){super(),this.elements=e}}function lI(t,e){const n=hI(e);for(const s of t.elements)n.some(r=>Pn(r,s))||n.push(s);return{arrayValue:{values:n}}}class qo extends Xl{constructor(e){super(),this.elements=e}}function uI(t,e){let n=hI(e);for(const s of t.elements)n=n.filter(r=>!Pn(r,s));return{arrayValue:{values:n}}}class Xc extends Xl{constructor(e,n){super(),this.serializer=e,this.gt=n}}function n_(t){return qe(t.integerValue||t.doubleValue)}function hI(t){return bp(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function oU(t,e){return t.field.isEqual(e.field)&&function(n,s){return n instanceof Ko&&s instanceof Ko||n instanceof qo&&s instanceof qo?hi(n.elements,s.elements,Pn):n instanceof Xc&&s instanceof Xc?Pn(n.gt,s.gt):n instanceof Jc&&s instanceof Jc}(t.transform,e.transform)}class aU{constructor(e,n){this.version=e,this.transformResults=n}}class un{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new un}static exists(e){return new un(void 0,e)}static updateTime(e){return new un(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ac(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Zl{}function fI(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new kp(t.key,un.none()):new wa(t.key,t.data,un.none());{const n=t.data,s=Lt.empty();let r=new Tt(_t.comparator);for(let i of e.fields)if(!r.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new xs(t.key,s,new Bt(r.toArray()),un.none())}}function cU(t,e,n){t instanceof wa?function(s,r,i){const o=s.value.clone(),a=r_(s.fieldTransforms,r,i.transformResults);o.setAll(a),r.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(t,e,n):t instanceof xs?function(s,r,i){if(!ac(s.precondition,r))return void r.convertToUnknownDocument(i.version);const o=r_(s.fieldTransforms,r,i.transformResults),a=r.data;a.setAll(dI(s)),a.setAll(o),r.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(t,e,n):function(s,r,i){r.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,n)}function po(t,e,n,s){return t instanceof wa?function(r,i,o,a){if(!ac(r.precondition,i))return o;const c=r.value.clone(),l=i_(r.fieldTransforms,a,i);return c.setAll(l),i.convertToFoundDocument(i.version,c).setHasLocalMutations(),null}(t,e,n,s):t instanceof xs?function(r,i,o,a){if(!ac(r.precondition,i))return o;const c=i_(r.fieldTransforms,a,i),l=i.data;return l.setAll(dI(r)),l.setAll(c),i.convertToFoundDocument(i.version,l).setHasLocalMutations(),o===null?null:o.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(u=>u.field))}(t,e,n,s):function(r,i,o){return ac(r.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):o}(t,e,n)}function lU(t,e){let n=null;for(const s of t.fieldTransforms){const r=e.data.field(s.field),i=cI(s.transform,r||null);i!=null&&(n===null&&(n=Lt.empty()),n.set(s.field,i))}return n||null}function s_(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&hi(n,s,(r,i)=>oU(r,i))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class wa extends Zl{constructor(e,n,s,r=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class xs extends Zl{constructor(e,n,s,r,i=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function dI(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function r_(t,e,n){const s=new Map;Fe(t.length===n.length);for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,a=e.data.field(i.field);s.set(i.field,iU(o,a,n[r]))}return s}function i_(t,e,n){const s=new Map;for(const r of t){const i=r.transform,o=n.data.field(r.field);s.set(r.field,rU(i,o,e))}return s}class kp extends Zl{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class uU extends Zl{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hU{constructor(e,n,s,r){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&cU(i,e,s[r])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=po(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=po(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=iI();return this.mutations.forEach(r=>{const i=e.get(r.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(r.key)?null:a;const c=fI(o,a);c!==null&&s.set(r.key,c),o.isValidDocument()||o.convertToNoDocument(ae.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),he())}isEqual(e){return this.batchId===e.batchId&&hi(this.mutations,e.mutations,(n,s)=>s_(n,s))&&hi(this.baseMutations,e.baseMutations,(n,s)=>s_(n,s))}}class Ap{constructor(e,n,s,r){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=r}static from(e,n,s){Fe(e.mutations.length===s.length);let r=ZF;const i=e.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new Ap(e,n,s,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fU{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dU{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ke,pe;function pU(t){switch(t){default:return se();case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0}}function pI(t){if(t===void 0)return Zn("GRPC error has no .code"),N.UNKNOWN;switch(t){case Ke.OK:return N.OK;case Ke.CANCELLED:return N.CANCELLED;case Ke.UNKNOWN:return N.UNKNOWN;case Ke.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case Ke.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case Ke.INTERNAL:return N.INTERNAL;case Ke.UNAVAILABLE:return N.UNAVAILABLE;case Ke.UNAUTHENTICATED:return N.UNAUTHENTICATED;case Ke.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case Ke.NOT_FOUND:return N.NOT_FOUND;case Ke.ALREADY_EXISTS:return N.ALREADY_EXISTS;case Ke.PERMISSION_DENIED:return N.PERMISSION_DENIED;case Ke.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case Ke.ABORTED:return N.ABORTED;case Ke.OUT_OF_RANGE:return N.OUT_OF_RANGE;case Ke.UNIMPLEMENTED:return N.UNIMPLEMENTED;case Ke.DATA_LOSS:return N.DATA_LOSS;default:return se()}}(pe=Ke||(Ke={}))[pe.OK=0]="OK",pe[pe.CANCELLED=1]="CANCELLED",pe[pe.UNKNOWN=2]="UNKNOWN",pe[pe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",pe[pe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",pe[pe.NOT_FOUND=5]="NOT_FOUND",pe[pe.ALREADY_EXISTS=6]="ALREADY_EXISTS",pe[pe.PERMISSION_DENIED=7]="PERMISSION_DENIED",pe[pe.UNAUTHENTICATED=16]="UNAUTHENTICATED",pe[pe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",pe[pe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",pe[pe.ABORTED=10]="ABORTED",pe[pe.OUT_OF_RANGE=11]="OUT_OF_RANGE",pe[pe.UNIMPLEMENTED=12]="UNIMPLEMENTED",pe[pe.INTERNAL=13]="INTERNAL",pe[pe.UNAVAILABLE=14]="UNAVAILABLE",pe[pe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return Ja}static getOrCreateInstance(){return Ja===null&&(Ja=new Np),Ja}onExistenceFilterMismatch(e){const n=Symbol();return this.onExistenceFilterMismatchCallbacks.set(n,e),()=>this.onExistenceFilterMismatchCallbacks.delete(n)}notifyOnExistenceFilterMismatch(e){this.onExistenceFilterMismatchCallbacks.forEach(n=>n(e))}}let Ja=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gU(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mU=new qr([4294967295,4294967295],0);function o_(t){const e=gU().encode(t),n=new yF;return n.update(e),new Uint8Array(n.digest())}function a_(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new qr([n,s],0),new qr([r,i],0)]}class Op{constructor(e,n,s){if(this.bitmap=e,this.padding=n,this.hashCount=s,n<0||n>=8)throw new Yi(`Invalid padding: ${n}`);if(s<0)throw new Yi(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new Yi(`Invalid hash count: ${s}`);if(e.length===0&&n!==0)throw new Yi(`Invalid padding when bitmap length is 0: ${n}`);this.It=8*e.length-n,this.Tt=qr.fromNumber(this.It)}Et(e,n,s){let r=e.add(n.multiply(qr.fromNumber(s)));return r.compare(mU)===1&&(r=new qr([r.getBits(0),r.getBits(1)],0)),r.modulo(this.Tt).toNumber()}At(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}vt(e){if(this.It===0)return!1;const n=o_(e),[s,r]=a_(n);for(let i=0;i<this.hashCount;i++){const o=this.Et(s,r,i);if(!this.At(o))return!1}return!0}static create(e,n,s){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Op(i,r,n);return s.forEach(a=>o.insert(a)),o}insert(e){if(this.It===0)return;const n=o_(e),[s,r]=a_(n);for(let i=0;i<this.hashCount;i++){const o=this.Et(s,r,i);this.Rt(o)}}Rt(e){const n=Math.floor(e/8),s=e%8;this.bitmap[n]|=1<<s}}class Yi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,n,s,r,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,s){const r=new Map;return r.set(e,Ea.createSynthesizedTargetChangeForCurrentChange(e,n,s)),new eu(ae.min(),r,new Ve(we),ts(),he())}}class Ea{constructor(e,n,s,r,i){this.resumeToken=e,this.current=n,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,s){return new Ea(s,n,he(),he(),he())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(e,n,s,r){this.Pt=e,this.removedTargetIds=n,this.key=s,this.bt=r}}class gI{constructor(e,n){this.targetId=e,this.Vt=n}}class mI{constructor(e,n,s=bt.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=n,this.resumeToken=s,this.cause=r}}class c_{constructor(){this.St=0,this.Dt=u_(),this.Ct=bt.EMPTY_BYTE_STRING,this.xt=!1,this.Nt=!0}get current(){return this.xt}get resumeToken(){return this.Ct}get kt(){return this.St!==0}get Mt(){return this.Nt}$t(e){e.approximateByteSize()>0&&(this.Nt=!0,this.Ct=e)}Ot(){let e=he(),n=he(),s=he();return this.Dt.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:n=n.add(r);break;case 1:s=s.add(r);break;default:se()}}),new Ea(this.Ct,this.xt,e,n,s)}Ft(){this.Nt=!1,this.Dt=u_()}Bt(e,n){this.Nt=!0,this.Dt=this.Dt.insert(e,n)}Lt(e){this.Nt=!0,this.Dt=this.Dt.remove(e)}qt(){this.St+=1}Ut(){this.St-=1}Kt(){this.Nt=!0,this.xt=!0}}class yU{constructor(e){this.Gt=e,this.Qt=new Map,this.jt=ts(),this.zt=l_(),this.Wt=new Ve(we)}Ht(e){for(const n of e.Pt)e.bt&&e.bt.isFoundDocument()?this.Jt(n,e.bt):this.Yt(n,e.key,e.bt);for(const n of e.removedTargetIds)this.Yt(n,e.key,e.bt)}Xt(e){this.forEachTarget(e,n=>{const s=this.Zt(n);switch(e.state){case 0:this.te(n)&&s.$t(e.resumeToken);break;case 1:s.Ut(),s.kt||s.Ft(),s.$t(e.resumeToken);break;case 2:s.Ut(),s.kt||this.removeTarget(n);break;case 3:this.te(n)&&(s.Kt(),s.$t(e.resumeToken));break;case 4:this.te(n)&&(this.ee(n),s.$t(e.resumeToken));break;default:se()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Qt.forEach((s,r)=>{this.te(r)&&n(r)})}ne(e){var n;const s=e.targetId,r=e.Vt.count,i=this.se(s);if(i){const o=i.target;if(vf(o))if(r===0){const a=new ee(o.path);this.Yt(s,a,gt.newNoDocument(a,ae.min()))}else Fe(r===1);else{const a=this.ie(s);if(a!==r){const c=this.re(e,a);if(c!==0){this.ee(s);const l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Wt=this.Wt.insert(s,l)}(n=Np.instance)===null||n===void 0||n.notifyOnExistenceFilterMismatch(function(l,u,h){var f,d,p,y,E,v;const g={localCacheCount:u,existenceFilterCount:h.count},T=h.unchangedNames;return T&&(g.bloomFilter={applied:l===0,hashCount:(f=T==null?void 0:T.hashCount)!==null&&f!==void 0?f:0,bitmapLength:(y=(p=(d=T==null?void 0:T.bits)===null||d===void 0?void 0:d.bitmap)===null||p===void 0?void 0:p.length)!==null&&y!==void 0?y:0,padding:(v=(E=T==null?void 0:T.bits)===null||E===void 0?void 0:E.padding)!==null&&v!==void 0?v:0}),g}(c,a,e.Vt))}}}}re(e,n){const{unchangedNames:s,count:r}=e.Vt;if(!s||!s.bits)return 1;const{bits:{bitmap:i="",padding:o=0},hashCount:a=0}=s;let c,l;try{c=cr(i).toUint8Array()}catch(u){if(u instanceof zT)return ui("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),1;throw u}try{l=new Op(c,o,a)}catch(u){return ui(u instanceof Yi?"BloomFilter error: ":"Applying bloom filter failed: ",u),1}return l.It===0?1:r!==n-this.oe(e.targetId,l)?2:0}oe(e,n){const s=this.Gt.getRemoteKeysForTarget(e);let r=0;return s.forEach(i=>{const o=this.Gt.ue(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;n.vt(a)||(this.Yt(e,i,null),r++)}),r}ce(e){const n=new Map;this.Qt.forEach((i,o)=>{const a=this.se(o);if(a){if(i.current&&vf(a.target)){const c=new ee(a.target.path);this.jt.get(c)!==null||this.ae(o,c)||this.Yt(o,c,gt.newNoDocument(c,e))}i.Mt&&(n.set(o,i.Ot()),i.Ft())}});let s=he();this.zt.forEach((i,o)=>{let a=!0;o.forEachWhile(c=>{const l=this.se(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(s=s.add(i))}),this.jt.forEach((i,o)=>o.setReadTime(e));const r=new eu(e,n,this.Wt,this.jt,s);return this.jt=ts(),this.zt=l_(),this.Wt=new Ve(we),r}Jt(e,n){if(!this.te(e))return;const s=this.ae(e,n.key)?2:0;this.Zt(e).Bt(n.key,s),this.jt=this.jt.insert(n.key,n),this.zt=this.zt.insert(n.key,this.he(n.key).add(e))}Yt(e,n,s){if(!this.te(e))return;const r=this.Zt(e);this.ae(e,n)?r.Bt(n,1):r.Lt(n),this.zt=this.zt.insert(n,this.he(n).delete(e)),s&&(this.jt=this.jt.insert(n,s))}removeTarget(e){this.Qt.delete(e)}ie(e){const n=this.Zt(e).Ot();return this.Gt.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}qt(e){this.Zt(e).qt()}Zt(e){let n=this.Qt.get(e);return n||(n=new c_,this.Qt.set(e,n)),n}he(e){let n=this.zt.get(e);return n||(n=new Tt(we),this.zt=this.zt.insert(e,n)),n}te(e){const n=this.se(e)!==null;return n||z("WatchChangeAggregator","Detected inactive target",e),n}se(e){const n=this.Qt.get(e);return n&&n.kt?null:this.Gt.le(e)}ee(e){this.Qt.set(e,new c_),this.Gt.getRemoteKeysForTarget(e).forEach(n=>{this.Yt(e,n,null)})}ae(e,n){return this.Gt.getRemoteKeysForTarget(e).has(n)}}function l_(){return new Ve(ee.comparator)}function u_(){return new Ve(ee.comparator)}const _U=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),vU=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),wU=(()=>({and:"AND",or:"OR"}))();class EU{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Tf(t,e){return t.useProto3Json||zl(e)?e:{value:e}}function Zc(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function yI(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function TU(t,e){return Zc(t,e.toTimestamp())}function kn(t){return Fe(!!t),ae.fromTimestamp(function(e){const n=ks(e);return new Ge(n.seconds,n.nanos)}(t))}function Pp(t,e){return function(n){return new $e(["projects",n.projectId,"databases",n.database])}(t).child("documents").child(e).canonicalString()}function _I(t){const e=$e.fromString(t);return Fe(TI(e)),e}function If(t,e){return Pp(t.databaseId,e.path)}function Qu(t,e){const n=_I(e);if(n.get(1)!==t.databaseId.projectId)throw new G(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new G(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new ee(vI(n))}function Cf(t,e){return Pp(t.databaseId,e)}function IU(t){const e=_I(t);return e.length===4?$e.emptyPath():vI(e)}function bf(t){return new $e(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function vI(t){return Fe(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function h_(t,e,n){return{name:If(t,e),fields:n.value.mapValue.fields}}function CU(t,e){let n;if("targetChange"in e){e.targetChange;const s=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:se()}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(c,l){return c.useProto3Json?(Fe(l===void 0||typeof l=="string"),bt.fromBase64String(l||"")):(Fe(l===void 0||l instanceof Uint8Array),bt.fromUint8Array(l||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const l=c.code===void 0?N.UNKNOWN:pI(c.code);return new G(l,c.message||"")}(o);n=new mI(s,r,i,a||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=Qu(t,s.document.name),i=kn(s.document.updateTime),o=s.document.createTime?kn(s.document.createTime):ae.min(),a=new Lt({mapValue:{fields:s.document.fields}}),c=gt.newFoundDocument(r,i,o,a),l=s.targetIds||[],u=s.removedTargetIds||[];n=new cc(l,u,c.key,c)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=Qu(t,s.document),i=s.readTime?kn(s.readTime):ae.min(),o=gt.newNoDocument(r,i),a=s.removedTargetIds||[];n=new cc([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=Qu(t,s.document),i=s.removedTargetIds||[];n=new cc([],i,r,null)}else{if(!("filter"in e))return se();{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,o=new dU(r,i),a=s.targetId;n=new gI(a,o)}}return n}function bU(t,e){let n;if(e instanceof wa)n={update:h_(t,e.key,e.value)};else if(e instanceof kp)n={delete:If(t,e.key)};else if(e instanceof xs)n={update:h_(t,e.key,e.data),updateMask:xU(e.fieldMask)};else{if(!(e instanceof uU))return se();n={verify:If(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(r,i){const o=i.transform;if(o instanceof Jc)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof Ko)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof qo)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof Xc)return{fieldPath:i.field.canonicalString(),increment:o.gt};throw se()}(0,s))),e.precondition.isNone||(n.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:TU(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:se()}(t,e.precondition)),n}function SU(t,e){return t&&t.length>0?(Fe(e!==void 0),t.map(n=>function(s,r){let i=s.updateTime?kn(s.updateTime):kn(r);return i.isEqual(ae.min())&&(i=kn(r)),new aU(i,s.transformResults||[])}(n,e))):[]}function RU(t,e){return{documents:[Cf(t,e.path)]}}function kU(t,e){const n={structuredQuery:{}},s=e.path;e.collectionGroup!==null?(n.parent=Cf(t,s),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Cf(t,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);const r=function(c){if(c.length!==0)return EI(Dn.create(c,"and"))}(e.filters);r&&(n.structuredQuery.where=r);const i=function(c){if(c.length!==0)return c.map(l=>function(u){return{field:Sr(u.field),direction:OU(u.dir)}}(l))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=Tf(t,e.limit);var a;return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),n}function AU(t){let e=IU(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){Fe(s===1);const u=n.from[0];u.allDescendants?r=u.collectionId:e=e.child(u.collectionId)}let i=[];n.where&&(i=function(u){const h=wI(u);return h instanceof Dn&&JT(h)?h.getFilters():[h]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(u=>function(h){return new ho(Rr(h.field),function(f){switch(f){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(u)));let a=null;n.limit&&(a=function(u){let h;return h=typeof u=="object"?u.value:u,zl(h)?null:h}(n.limit));let c=null;n.startAt&&(c=function(u){const h=!!u.before,f=u.values||[];return new Yc(f,h)}(n.startAt));let l=null;return n.endAt&&(l=function(u){const h=!u.before,f=u.values||[];return new Yc(f,h)}(n.endAt)),qF(e,r,o,i,a,"F",c,l)}function NU(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return se()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function wI(t){return t.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Rr(e.unaryFilter.field);return Ye.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Rr(e.unaryFilter.field);return Ye.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Rr(e.unaryFilter.field);return Ye.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Rr(e.unaryFilter.field);return Ye.create(i,"!=",{nullValue:"NULL_VALUE"});default:return se()}}(t):t.fieldFilter!==void 0?function(e){return Ye.create(Rr(e.fieldFilter.field),function(n){switch(n){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return se()}}(e.fieldFilter.op),e.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(e){return Dn.create(e.compositeFilter.filters.map(n=>wI(n)),function(n){switch(n){case"AND":return"and";case"OR":return"or";default:return se()}}(e.compositeFilter.op))}(t):se()}function OU(t){return _U[t]}function PU(t){return vU[t]}function DU(t){return wU[t]}function Sr(t){return{fieldPath:t.canonicalString()}}function Rr(t){return _t.fromServerFormat(t.fieldPath)}function EI(t){return t instanceof Ye?function(e){if(e.op==="=="){if(Jy(e.value))return{unaryFilter:{field:Sr(e.field),op:"IS_NAN"}};if(Yy(e.value))return{unaryFilter:{field:Sr(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Jy(e.value))return{unaryFilter:{field:Sr(e.field),op:"IS_NOT_NAN"}};if(Yy(e.value))return{unaryFilter:{field:Sr(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Sr(e.field),op:PU(e.op),value:e.value}}}(t):t instanceof Dn?function(e){const n=e.getFilters().map(s=>EI(s));return n.length===1?n[0]:{compositeFilter:{op:DU(e.op),filters:n}}}(t):se()}function xU(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function TI(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,n,s,r,i=ae.min(),o=ae.min(),a=bt.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new _s(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new _s(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new _s(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new _s(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MU{constructor(e){this.fe=e}}function LU(t){const e=AU({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?wf(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FU{constructor(){this.rn=new UU}addToCollectionParentIndex(e,n){return this.rn.add(n),M.resolve()}getCollectionParents(e,n){return M.resolve(this.rn.getEntries(n))}addFieldIndex(e,n){return M.resolve()}deleteFieldIndex(e,n){return M.resolve()}getDocumentsMatchingTarget(e,n){return M.resolve(null)}getIndexType(e,n){return M.resolve(0)}getFieldIndexes(e,n){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,n){return M.resolve(Rs.min())}getMinOffsetFromCollectionGroup(e,n){return M.resolve(Rs.min())}updateCollectionGroup(e,n,s){return M.resolve()}updateIndexEntries(e,n){return M.resolve()}}class UU{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n]||new Tt($e.comparator),i=!r.has(s);return this.index[n]=r.add(s),i}has(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n];return r&&r.has(s)}getEntries(e){return(this.index[e]||new Tt($e.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e){this.Nn=e}next(){return this.Nn+=2,this.Nn}static kn(){return new pi(0)}static Mn(){return new pi(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $U{constructor(){this.changes=new Oi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,gt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?M.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VU{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BU{constructor(e,n,s,r){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(r=>(s=r,this.remoteDocumentCache.getEntry(e,n))).next(r=>(s!==null&&po(s.mutation,r,Bt.empty(),Ge.now()),r))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,he()).next(()=>s))}getLocalViewOfDocuments(e,n,s=he()){const r=qs();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,s).next(i=>{let o=Qi();return i.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const s=qs();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,he()))}populateOverlays(e,n,s){const r=[];return s.forEach(i=>{n.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,s,r){let i=ts();const o=fo(),a=fo();return n.forEach((c,l)=>{const u=s.get(l.key);r.has(l.key)&&(u===void 0||u.mutation instanceof xs)?i=i.insert(l.key,l):u!==void 0?(o.set(l.key,u.mutation.getFieldMask()),po(u.mutation,l,u.mutation.getFieldMask(),Ge.now())):o.set(l.key,Bt.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((l,u)=>o.set(l,u)),n.forEach((l,u)=>{var h;return a.set(l,new VU(u,(h=o.get(l))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,n){const s=fo();let r=new Ve((o,a)=>o-a),i=he();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(c=>{const l=n.get(c);if(l===null)return;let u=s.get(c)||Bt.empty();u=a.applyToLocalView(l,u),s.set(c,u);const h=(r.get(a.batchId)||he()).add(c);r=r.insert(a.batchId,h)})}).next(()=>{const o=[],a=r.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),l=c.key,u=c.value,h=iI();u.forEach(f=>{if(!i.has(f)){const d=fI(n.get(f),s.get(f));d!==null&&h.set(f,d),i=i.add(f)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,h))}return M.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s){return function(r){return ee.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):QF(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s):this.getDocumentsMatchingCollectionQuery(e,n,s)}getNextDocuments(e,n,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,r).next(i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,r-i.size):M.resolve(qs());let a=-1,c=i;return o.next(l=>M.forEach(l,(u,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),i.get(u)?M.resolve():this.remoteDocumentCache.getEntry(e,u).next(f=>{c=c.insert(u,f)}))).next(()=>this.populateOverlays(e,l,i)).next(()=>this.computeViews(e,c,l,he())).next(u=>({batchId:a,changes:rI(u)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new ee(n)).next(s=>{let r=Qi();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(e,n,s){const r=n.collectionGroup;let i=Qi();return this.indexManager.getCollectionParents(e,r).next(o=>M.forEach(o,a=>{const c=function(l,u){return new Gl(u,null,l.explicitOrderBy.slice(),l.filters.slice(),l.limit,l.limitType,l.startAt,l.endAt)}(n,a.child(r));return this.getDocumentsMatchingCollectionQuery(e,c,s).next(l=>{l.forEach((u,h)=>{i=i.insert(u,h)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,n,s){let r;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId).next(i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,s,r))).next(i=>{r.forEach((a,c)=>{const l=c.getKey();i.get(l)===null&&(i=i.insert(l,gt.newInvalidDocument(l)))});let o=Qi();return i.forEach((a,c)=>{const l=r.get(a);l!==void 0&&po(l.mutation,c,Bt.empty(),Ge.now()),Jl(n,c)&&(o=o.insert(a,c))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HU{constructor(e){this.serializer=e,this.cs=new Map,this.hs=new Map}getBundleMetadata(e,n){return M.resolve(this.cs.get(n))}saveBundleMetadata(e,n){var s;return this.cs.set(n.id,{id:(s=n).id,version:s.version,createTime:kn(s.createTime)}),M.resolve()}getNamedQuery(e,n){return M.resolve(this.hs.get(n))}saveNamedQuery(e,n){return this.hs.set(n.name,function(s){return{name:s.name,query:LU(s.bundledQuery),readTime:kn(s.readTime)}}(n)),M.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jU{constructor(){this.overlays=new Ve(ee.comparator),this.ls=new Map}getOverlay(e,n){return M.resolve(this.overlays.get(n))}getOverlays(e,n){const s=qs();return M.forEach(n,r=>this.getOverlay(e,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((r,i)=>{this.we(e,n,i)}),M.resolve()}removeOverlaysForBatchId(e,n,s){const r=this.ls.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.ls.delete(s)),M.resolve()}getOverlaysForCollection(e,n,s){const r=qs(),i=n.length+1,o=new ee(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,l=c.getKey();if(!n.isPrefixOf(l.path))break;l.path.length===i&&c.largestBatchId>s&&r.set(c.getKey(),c)}return M.resolve(r)}getOverlaysForCollectionGroup(e,n,s,r){let i=new Ve((l,u)=>l-u);const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===n&&l.largestBatchId>s){let u=i.get(l.largestBatchId);u===null&&(u=qs(),i=i.insert(l.largestBatchId,u)),u.set(l.getKey(),l)}}const a=qs(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((l,u)=>a.set(l,u)),!(a.size()>=r)););return M.resolve(a)}we(e,n,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.ls.get(r.largestBatchId).delete(s.key);this.ls.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new fU(n,s));let i=this.ls.get(n);i===void 0&&(i=he(),this.ls.set(n,i)),this.ls.set(n,i.add(s.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(){this.fs=new Tt(Xe.ds),this.ws=new Tt(Xe._s)}isEmpty(){return this.fs.isEmpty()}addReference(e,n){const s=new Xe(e,n);this.fs=this.fs.add(s),this.ws=this.ws.add(s)}gs(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.ys(new Xe(e,n))}ps(e,n){e.forEach(s=>this.removeReference(s,n))}Is(e){const n=new ee(new $e([])),s=new Xe(n,e),r=new Xe(n,e+1),i=[];return this.ws.forEachInRange([s,r],o=>{this.ys(o),i.push(o.key)}),i}Ts(){this.fs.forEach(e=>this.ys(e))}ys(e){this.fs=this.fs.delete(e),this.ws=this.ws.delete(e)}Es(e){const n=new ee(new $e([])),s=new Xe(n,e),r=new Xe(n,e+1);let i=he();return this.ws.forEachInRange([s,r],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Xe(e,0),s=this.fs.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class Xe{constructor(e,n){this.key=e,this.As=n}static ds(e,n){return ee.comparator(e.key,n.key)||we(e.As,n.As)}static _s(e,n){return we(e.As,n.As)||ee.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WU{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.vs=1,this.Rs=new Tt(Xe.ds)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,r){const i=this.vs;this.vs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new hU(i,n,s,r);this.mutationQueue.push(o);for(const a of r)this.Rs=this.Rs.add(new Xe(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return M.resolve(o)}lookupMutationBatch(e,n){return M.resolve(this.Ps(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,r=this.bs(s),i=r<0?0:r;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?-1:this.vs-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new Xe(n,0),r=new Xe(n,Number.POSITIVE_INFINITY),i=[];return this.Rs.forEachInRange([s,r],o=>{const a=this.Ps(o.As);i.push(a)}),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new Tt(we);return n.forEach(r=>{const i=new Xe(r,0),o=new Xe(r,Number.POSITIVE_INFINITY);this.Rs.forEachInRange([i,o],a=>{s=s.add(a.As)})}),M.resolve(this.Vs(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,r=s.length+1;let i=s;ee.isDocumentKey(i)||(i=i.child(""));const o=new Xe(new ee(i),0);let a=new Tt(we);return this.Rs.forEachWhile(c=>{const l=c.key.path;return!!s.isPrefixOf(l)&&(l.length===r&&(a=a.add(c.As)),!0)},o),M.resolve(this.Vs(a))}Vs(e){const n=[];return e.forEach(s=>{const r=this.Ps(s);r!==null&&n.push(r)}),n}removeMutationBatch(e,n){Fe(this.Ss(n.batchId,"removed")===0),this.mutationQueue.shift();let s=this.Rs;return M.forEach(n.mutations,r=>{const i=new Xe(r.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Rs=s})}Cn(e){}containsKey(e,n){const s=new Xe(n,0),r=this.Rs.firstAfterOrEqual(s);return M.resolve(n.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}Ss(e,n){return this.bs(e)}bs(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Ps(e){const n=this.bs(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KU{constructor(e){this.Ds=e,this.docs=new Ve(ee.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,r=this.docs.get(s),i=r?r.size:0,o=this.Ds(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return M.resolve(s?s.document.mutableCopy():gt.newInvalidDocument(n))}getEntries(e,n){let s=ts();return n.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():gt.newInvalidDocument(r))}),M.resolve(s)}getDocumentsMatchingQuery(e,n,s,r){let i=ts();const o=n.path,a=new ee(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:l,value:{document:u}}=c.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||AF(kF(u),s)<=0||(r.has(u.key)||Jl(n,u))&&(i=i.insert(u.key,u.mutableCopy()))}return M.resolve(i)}getAllFromCollectionGroup(e,n,s,r){se()}Cs(e,n){return M.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new qU(this)}getSize(e){return M.resolve(this.size)}}class qU extends $U{constructor(e){super(),this.os=e}applyChanges(e){const n=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?n.push(this.os.addEntry(e,r)):this.os.removeEntry(s)}),M.waitFor(n)}getFromCache(e,n){return this.os.getEntry(e,n)}getAllFromCache(e,n){return this.os.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zU{constructor(e){this.persistence=e,this.xs=new Oi(n=>Sp(n),Rp),this.lastRemoteSnapshotVersion=ae.min(),this.highestTargetId=0,this.Ns=0,this.ks=new Dp,this.targetCount=0,this.Ms=pi.kn()}forEachTarget(e,n){return this.xs.forEach((s,r)=>n(r)),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.Ns)}allocateTargetId(e){return this.highestTargetId=this.Ms.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.Ns&&(this.Ns=n),M.resolve()}Fn(e){this.xs.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.Ms=new pi(n),this.highestTargetId=n),e.sequenceNumber>this.Ns&&(this.Ns=e.sequenceNumber)}addTargetData(e,n){return this.Fn(n),this.targetCount+=1,M.resolve()}updateTargetData(e,n){return this.Fn(n),M.resolve()}removeTargetData(e,n){return this.xs.delete(n.target),this.ks.Is(n.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,n,s){let r=0;const i=[];return this.xs.forEach((o,a)=>{a.sequenceNumber<=n&&s.get(a.targetId)===null&&(this.xs.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),M.waitFor(i).next(()=>r)}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,n){const s=this.xs.get(n)||null;return M.resolve(s)}addMatchingKeys(e,n,s){return this.ks.gs(n,s),M.resolve()}removeMatchingKeys(e,n,s){this.ks.ps(n,s);const r=this.persistence.referenceDelegate,i=[];return r&&n.forEach(o=>{i.push(r.markPotentiallyOrphaned(e,o))}),M.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.ks.Is(n),M.resolve()}getMatchingKeysForTargetId(e,n){const s=this.ks.Es(n);return M.resolve(s)}containsKey(e,n){return M.resolve(this.ks.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GU{constructor(e,n){this.$s={},this.overlays={},this.Os=new Tp(0),this.Fs=!1,this.Fs=!0,this.referenceDelegate=e(this),this.Bs=new zU(this),this.indexManager=new FU,this.remoteDocumentCache=function(s){return new KU(s)}(s=>this.referenceDelegate.Ls(s)),this.serializer=new MU(n),this.qs=new HU(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Fs=!1,Promise.resolve()}get started(){return this.Fs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new jU,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this.$s[e.toKey()];return s||(s=new WU(n,this.referenceDelegate),this.$s[e.toKey()]=s),s}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qs}runTransaction(e,n,s){z("MemoryPersistence","Starting transaction:",e);const r=new QU(this.Os.next());return this.referenceDelegate.Us(),s(r).next(i=>this.referenceDelegate.Ks(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Gs(e,n){return M.or(Object.values(this.$s).map(s=>()=>s.containsKey(e,n)))}}class QU extends OF{constructor(e){super(),this.currentSequenceNumber=e}}class xp{constructor(e){this.persistence=e,this.Qs=new Dp,this.js=null}static zs(e){return new xp(e)}get Ws(){if(this.js)return this.js;throw se()}addReference(e,n,s){return this.Qs.addReference(s,n),this.Ws.delete(s.toString()),M.resolve()}removeReference(e,n,s){return this.Qs.removeReference(s,n),this.Ws.add(s.toString()),M.resolve()}markPotentiallyOrphaned(e,n){return this.Ws.add(n.toString()),M.resolve()}removeTarget(e,n){this.Qs.Is(n.targetId).forEach(r=>this.Ws.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(r=>{r.forEach(i=>this.Ws.add(i.toString()))}).next(()=>s.removeTargetData(e,n))}Us(){this.js=new Set}Ks(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.Ws,s=>{const r=ee.fromPath(s);return this.Hs(e,r).next(i=>{i||n.removeEntry(r,ae.min())})}).next(()=>(this.js=null,n.apply(e)))}updateLimboDocument(e,n){return this.Hs(e,n).next(s=>{s?this.Ws.delete(n.toString()):this.Ws.add(n.toString())})}Ls(e){return 0}Hs(e,n){return M.or([()=>M.resolve(this.Qs.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Gs(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(e,n,s,r){this.targetId=e,this.fromCache=n,this.Fi=s,this.Bi=r}static Li(e,n){let s=he(),r=he();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Mp(e,n.fromCache,s,r)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YU{constructor(){this.qi=!1}initialize(e,n){this.Ui=e,this.indexManager=n,this.qi=!0}getDocumentsMatchingQuery(e,n,s,r){return this.Ki(e,n).next(i=>i||this.Gi(e,n,r,s)).next(i=>i||this.Qi(e,n))}Ki(e,n){if(t_(n))return M.resolve(null);let s=es(n);return this.indexManager.getIndexType(e,s).next(r=>r===0?null:(n.limit!==null&&r===1&&(n=wf(n,null,"F"),s=es(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const o=he(...i);return this.Ui.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,s).next(c=>{const l=this.ji(n,a);return this.zi(n,l,o,c.readTime)?this.Ki(e,wf(n,null,"F")):this.Wi(e,l,n,c)}))})))}Gi(e,n,s,r){return t_(n)||r.isEqual(ae.min())?this.Qi(e,n):this.Ui.getDocuments(e,s).next(i=>{const o=this.ji(n,i);return this.zi(n,o,s,r)?this.Qi(e,n):(qy()<=_e.DEBUG&&z("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Ef(n)),this.Wi(e,o,n,RF(r,-1)))})}ji(e,n){let s=new Tt(nI(e));return n.forEach((r,i)=>{Jl(e,i)&&(s=s.add(i))}),s}zi(e,n,s,r){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Qi(e,n){return qy()<=_e.DEBUG&&z("QueryEngine","Using full collection scan to execute query:",Ef(n)),this.Ui.getDocumentsMatchingQuery(e,n,Rs.min())}Wi(e,n,s,r){return this.Ui.getDocumentsMatchingQuery(e,s,r).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JU{constructor(e,n,s,r){this.persistence=e,this.Hi=n,this.serializer=r,this.Ji=new Ve(we),this.Yi=new Oi(i=>Sp(i),Rp),this.Xi=new Map,this.Zi=e.getRemoteDocumentCache(),this.Bs=e.getTargetCache(),this.qs=e.getBundleCache(),this.tr(s)}tr(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new BU(this.Zi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Zi.setIndexManager(this.indexManager),this.Hi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ji))}}function XU(t,e,n,s){return new JU(t,e,n,s)}async function II(t,e){const n=le(t);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let r;return n.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,n.tr(e),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const o=[],a=[];let c=he();for(const l of r){o.push(l.batchId);for(const u of l.mutations)c=c.add(u.key)}for(const l of i){a.push(l.batchId);for(const u of l.mutations)c=c.add(u.key)}return n.localDocuments.getDocuments(s,c).next(l=>({er:l,removedBatchIds:o,addedBatchIds:a}))})})}function ZU(t,e){const n=le(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=e.batch.keys(),i=n.Zi.newChangeBuffer({trackRemovals:!0});return function(o,a,c,l){const u=c.batch,h=u.keys();let f=M.resolve();return h.forEach(d=>{f=f.next(()=>l.getEntry(a,d)).next(p=>{const y=c.docVersions.get(d);Fe(y!==null),p.version.compareTo(y)<0&&(u.applyToRemoteDocument(p,c),p.isValidDocument()&&(p.setReadTime(c.commitVersion),l.addEntry(p)))})}),f.next(()=>o.mutationQueue.removeMutationBatch(a,u))}(n,s,e,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(o){let a=he();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(a=a.add(o.batch.mutations[c].key));return a}(e))).next(()=>n.localDocuments.getDocuments(s,r))})}function CI(t){const e=le(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Bs.getLastRemoteSnapshotVersion(n))}function e2(t,e){const n=le(t),s=e.snapshotVersion;let r=n.Ji;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Zi.newChangeBuffer({trackRemovals:!0});r=n.Ji;const a=[];e.targetChanges.forEach((u,h)=>{const f=r.get(h);if(!f)return;a.push(n.Bs.removeMatchingKeys(i,u.removedDocuments,h).next(()=>n.Bs.addMatchingKeys(i,u.addedDocuments,h)));let d=f.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(h)!==null?d=d.withResumeToken(bt.EMPTY_BYTE_STRING,ae.min()).withLastLimboFreeSnapshotVersion(ae.min()):u.resumeToken.approximateByteSize()>0&&(d=d.withResumeToken(u.resumeToken,s)),r=r.insert(h,d),function(p,y,E){return p.resumeToken.approximateByteSize()===0||y.snapshotVersion.toMicroseconds()-p.snapshotVersion.toMicroseconds()>=3e8?!0:E.addedDocuments.size+E.modifiedDocuments.size+E.removedDocuments.size>0}(f,d,u)&&a.push(n.Bs.updateTargetData(i,d))});let c=ts(),l=he();if(e.documentUpdates.forEach(u=>{e.resolvedLimboDocuments.has(u)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,u))}),a.push(t2(i,o,e.documentUpdates).next(u=>{c=u.nr,l=u.sr})),!s.isEqual(ae.min())){const u=n.Bs.getLastRemoteSnapshotVersion(i).next(h=>n.Bs.setTargetsMetadata(i,i.currentSequenceNumber,s));a.push(u)}return M.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,l)).next(()=>c)}).then(i=>(n.Ji=r,i))}function t2(t,e,n){let s=he(),r=he();return n.forEach(i=>s=s.add(i)),e.getEntries(t,s).next(i=>{let o=ts();return n.forEach((a,c)=>{const l=i.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(r=r.add(a)),c.isNoDocument()&&c.version.isEqual(ae.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):z("LocalStore","Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)}),{nr:o,sr:r}})}function n2(t,e){const n=le(t);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function s2(t,e){const n=le(t);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return n.Bs.getTargetData(s,e).next(i=>i?(r=i,M.resolve(r)):n.Bs.allocateTargetId(s).next(o=>(r=new _s(e,o,"TargetPurposeListen",s.currentSequenceNumber),n.Bs.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=n.Ji.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ji=n.Ji.insert(s.targetId,s),n.Yi.set(e,s.targetId)),s})}async function Sf(t,e,n){const s=le(t),r=s.Ji.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,o=>s.persistence.referenceDelegate.removeTarget(o,r))}catch(o){if(!va(o))throw o;z("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}s.Ji=s.Ji.remove(e),s.Yi.delete(r.target)}function f_(t,e,n){const s=le(t);let r=ae.min(),i=he();return s.persistence.runTransaction("Execute query","readonly",o=>function(a,c,l){const u=le(a),h=u.Yi.get(l);return h!==void 0?M.resolve(u.Ji.get(h)):u.Bs.getTargetData(c,l)}(s,o,es(e)).next(a=>{if(a)return r=a.lastLimboFreeSnapshotVersion,s.Bs.getMatchingKeysForTargetId(o,a.targetId).next(c=>{i=c})}).next(()=>s.Hi.getDocumentsMatchingQuery(o,e,n?r:ae.min(),n?i:he())).next(a=>(r2(s,YF(e),a),{documents:a,ir:i})))}function r2(t,e,n){let s=t.Xi.get(e)||ae.min();n.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),t.Xi.set(e,s)}class d_{constructor(){this.activeTargetIds=nU()}lr(e){this.activeTargetIds=this.activeTargetIds.add(e)}dr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}hr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class i2{constructor(){this.Hr=new d_,this.Jr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e){return this.Hr.lr(e),this.Jr[e]||"not-current"}updateQueryState(e,n,s){this.Jr[e]=n}removeLocalQueryTarget(e){this.Hr.dr(e)}isLocalQueryTarget(e){return this.Hr.activeTargetIds.has(e)}clearQueryState(e){delete this.Jr[e]}getAllActiveQueryTargets(){return this.Hr.activeTargetIds}isActiveQueryTarget(e){return this.Hr.activeTargetIds.has(e)}start(){return this.Hr=new d_,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o2{Yr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(){this.Xr=()=>this.Zr(),this.eo=()=>this.no(),this.so=[],this.io()}Yr(e){this.so.push(e)}shutdown(){window.removeEventListener("online",this.Xr),window.removeEventListener("offline",this.eo)}io(){window.addEventListener("online",this.Xr),window.addEventListener("offline",this.eo)}Zr(){z("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.so)e(0)}no(){z("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.so)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xa=null;function Yu(){return Xa===null?Xa=268435456+Math.round(2147483648*Math.random()):Xa++,"0x"+Xa.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a2={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c2{constructor(e){this.ro=e.ro,this.oo=e.oo}uo(e){this.co=e}ao(e){this.ho=e}onMessage(e){this.lo=e}close(){this.oo()}send(e){this.ro(e)}fo(){this.co()}wo(e){this.ho(e)}_o(e){this.lo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht="WebChannelConnection";class l2 extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.mo=n+"://"+e.host,this.yo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get po(){return!1}Io(e,n,s,r,i){const o=Yu(),a=this.To(e,n);z("RestConnection",`Sending RPC '${e}' ${o}:`,a,s);const c={};return this.Eo(c,r,i),this.Ao(e,a,c,s).then(l=>(z("RestConnection",`Received RPC '${e}' ${o}: `,l),l),l=>{throw ui("RestConnection",`RPC '${e}' ${o} failed with error: `,l,"url: ",a,"request:",s),l})}vo(e,n,s,r,i,o){return this.Io(e,n,s,r,i)}Eo(e,n,s){e["X-Goog-Api-Client"]="gl-js/ fire/"+Ni,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((r,i)=>e[i]=r),s&&s.headers.forEach((r,i)=>e[i]=r)}To(e,n){const s=a2[e];return`${this.mo}/v1/${n}:${s}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ao(e,n,s,r){const i=Yu();return new Promise((o,a)=>{const c=new mF;c.setWithCredentials(!0),c.listenOnce(dF.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Gu.NO_ERROR:const u=c.getResponseJson();z(ht,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(u)),o(u);break;case Gu.TIMEOUT:z(ht,`RPC '${e}' ${i} timed out`),a(new G(N.DEADLINE_EXCEEDED,"Request time out"));break;case Gu.HTTP_ERROR:const h=c.getStatus();if(z(ht,`RPC '${e}' ${i} failed with status:`,h,"response text:",c.getResponseText()),h>0){let f=c.getResponseJson();Array.isArray(f)&&(f=f[0]);const d=f==null?void 0:f.error;if(d&&d.status&&d.message){const p=function(y){const E=y.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(E)>=0?E:N.UNKNOWN}(d.status);a(new G(p,d.message))}else a(new G(N.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new G(N.UNAVAILABLE,"Connection failed."));break;default:se()}}finally{z(ht,`RPC '${e}' ${i} completed.`)}});const l=JSON.stringify(r);z(ht,`RPC '${e}' ${i} sending request:`,r),c.send(n,"POST",l,s,15)})}Ro(e,n,s){const r=Yu(),i=[this.mo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=hF(),a=fF(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.xmlHttpFactory=new gF({})),this.Eo(c.initMessageHeaders,n,s),c.encodeInitMessageHeaders=!0;const u=i.join("");z(ht,`Creating RPC '${e}' stream ${r}: ${u}`,c);const h=o.createWebChannel(u,c);let f=!1,d=!1;const p=new c2({ro:E=>{d?z(ht,`Not sending because RPC '${e}' stream ${r} is closed:`,E):(f||(z(ht,`Opening RPC '${e}' stream ${r} transport.`),h.open(),f=!0),z(ht,`RPC '${e}' stream ${r} sending:`,E),h.send(E))},oo:()=>h.close()}),y=(E,v,g)=>{E.listen(v,T=>{try{g(T)}catch(w){setTimeout(()=>{throw w},0)}})};return y(h,Ga.EventType.OPEN,()=>{d||z(ht,`RPC '${e}' stream ${r} transport opened.`)}),y(h,Ga.EventType.CLOSE,()=>{d||(d=!0,z(ht,`RPC '${e}' stream ${r} transport closed`),p.wo())}),y(h,Ga.EventType.ERROR,E=>{d||(d=!0,ui(ht,`RPC '${e}' stream ${r} transport errored:`,E),p.wo(new G(N.UNAVAILABLE,"The operation could not be completed")))}),y(h,Ga.EventType.MESSAGE,E=>{var v;if(!d){const g=E.data[0];Fe(!!g);const T=g,w=T.error||((v=T[0])===null||v===void 0?void 0:v.error);if(w){z(ht,`RPC '${e}' stream ${r} received error:`,w);const b=w.status;let D=function(C){const A=Ke[C];if(A!==void 0)return pI(A)}(b),O=w.message;D===void 0&&(D=N.INTERNAL,O="Unknown error status: "+b+" with message "+w.message),d=!0,p.wo(new G(D,O)),h.close()}else z(ht,`RPC '${e}' stream ${r} received:`,g),p._o(g)}}),y(a,pF.STAT_EVENT,E=>{E.stat===Wy.PROXY?z(ht,`RPC '${e}' stream ${r} detected buffering proxy`):E.stat===Wy.NOPROXY&&z(ht,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{p.fo()},0),p}}function Ju(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(t){return new EU(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bI{constructor(e,n,s=1e3,r=1.5,i=6e4){this.ii=e,this.timerId=n,this.Po=s,this.bo=r,this.Vo=i,this.So=0,this.Do=null,this.Co=Date.now(),this.reset()}reset(){this.So=0}xo(){this.So=this.Vo}No(e){this.cancel();const n=Math.floor(this.So+this.ko()),s=Math.max(0,Date.now()-this.Co),r=Math.max(0,n-s);r>0&&z("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.So} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.Do=this.ii.enqueueAfterDelay(this.timerId,r,()=>(this.Co=Date.now(),e())),this.So*=this.bo,this.So<this.Po&&(this.So=this.Po),this.So>this.Vo&&(this.So=this.Vo)}Mo(){this.Do!==null&&(this.Do.skipDelay(),this.Do=null)}cancel(){this.Do!==null&&(this.Do.cancel(),this.Do=null)}ko(){return(Math.random()-.5)*this.So}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SI{constructor(e,n,s,r,i,o,a,c){this.ii=e,this.$o=s,this.Oo=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Fo=0,this.Bo=null,this.Lo=null,this.stream=null,this.qo=new bI(e,n)}Uo(){return this.state===1||this.state===5||this.Ko()}Ko(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Go()}async stop(){this.Uo()&&await this.close(0)}Qo(){this.state=0,this.qo.reset()}jo(){this.Ko()&&this.Bo===null&&(this.Bo=this.ii.enqueueAfterDelay(this.$o,6e4,()=>this.zo()))}Wo(e){this.Ho(),this.stream.send(e)}async zo(){if(this.Ko())return this.close(0)}Ho(){this.Bo&&(this.Bo.cancel(),this.Bo=null)}Jo(){this.Lo&&(this.Lo.cancel(),this.Lo=null)}async close(e,n){this.Ho(),this.Jo(),this.qo.cancel(),this.Fo++,e!==4?this.qo.reset():n&&n.code===N.RESOURCE_EXHAUSTED?(Zn(n.toString()),Zn("Using maximum backoff delay to prevent overloading the backend."),this.qo.xo()):n&&n.code===N.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Yo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.ao(n)}Yo(){}auth(){this.state=1;const e=this.Xo(this.Fo),n=this.Fo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.Fo===n&&this.Zo(s,r)},s=>{e(()=>{const r=new G(N.UNKNOWN,"Fetching auth token failed: "+s.message);return this.tu(r)})})}Zo(e,n){const s=this.Xo(this.Fo);this.stream=this.eu(e,n),this.stream.uo(()=>{s(()=>(this.state=2,this.Lo=this.ii.enqueueAfterDelay(this.Oo,1e4,()=>(this.Ko()&&(this.state=3),Promise.resolve())),this.listener.uo()))}),this.stream.ao(r=>{s(()=>this.tu(r))}),this.stream.onMessage(r=>{s(()=>this.onMessage(r))})}Go(){this.state=5,this.qo.No(async()=>{this.state=0,this.start()})}tu(e){return z("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Xo(e){return n=>{this.ii.enqueueAndForget(()=>this.Fo===e?n():(z("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class u2 extends SI{constructor(e,n,s,r,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i}eu(e,n){return this.connection.Ro("Listen",e,n)}onMessage(e){this.qo.reset();const n=CU(this.serializer,e),s=function(r){if(!("targetChange"in r))return ae.min();const i=r.targetChange;return i.targetIds&&i.targetIds.length?ae.min():i.readTime?kn(i.readTime):ae.min()}(e);return this.listener.nu(n,s)}su(e){const n={};n.database=bf(this.serializer),n.addTarget=function(r,i){let o;const a=i.target;if(o=vf(a)?{documents:RU(r,a)}:{query:kU(r,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0){o.resumeToken=yI(r,i.resumeToken);const c=Tf(r,i.expectedCount);c!==null&&(o.expectedCount=c)}else if(i.snapshotVersion.compareTo(ae.min())>0){o.readTime=Zc(r,i.snapshotVersion.toTimestamp());const c=Tf(r,i.expectedCount);c!==null&&(o.expectedCount=c)}return o}(this.serializer,e);const s=NU(this.serializer,e);s&&(n.labels=s),this.Wo(n)}iu(e){const n={};n.database=bf(this.serializer),n.removeTarget=e,this.Wo(n)}}class h2 extends SI{constructor(e,n,s,r,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i,this.ru=!1}get ou(){return this.ru}start(){this.ru=!1,this.lastStreamToken=void 0,super.start()}Yo(){this.ru&&this.uu([])}eu(e,n){return this.connection.Ro("Write",e,n)}onMessage(e){if(Fe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.ru){this.qo.reset();const n=SU(e.writeResults,e.commitTime),s=kn(e.commitTime);return this.listener.cu(s,n)}return Fe(!e.writeResults||e.writeResults.length===0),this.ru=!0,this.listener.au()}hu(){const e={};e.database=bf(this.serializer),this.Wo(e)}uu(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>bU(this.serializer,s))};this.Wo(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f2 extends class{}{constructor(e,n,s,r){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=s,this.serializer=r,this.lu=!1}fu(){if(this.lu)throw new G(N.FAILED_PRECONDITION,"The client has already been terminated.")}Io(e,n,s){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection.Io(e,n,s,r,i)).catch(r=>{throw r.name==="FirebaseError"?(r.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new G(N.UNKNOWN,r.toString())})}vo(e,n,s,r){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.vo(e,n,s,i,o,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new G(N.UNKNOWN,i.toString())})}terminate(){this.lu=!0}}class d2{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.wu=0,this._u=null,this.mu=!0}gu(){this.wu===0&&(this.yu("Unknown"),this._u=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._u=null,this.pu("Backend didn't respond within 10 seconds."),this.yu("Offline"),Promise.resolve())))}Iu(e){this.state==="Online"?this.yu("Unknown"):(this.wu++,this.wu>=1&&(this.Tu(),this.pu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.yu("Offline")))}set(e){this.Tu(),this.wu=0,e==="Online"&&(this.mu=!1),this.yu(e)}yu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}pu(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.mu?(Zn(n),this.mu=!1):z("OnlineStateTracker",n)}Tu(){this._u!==null&&(this._u.cancel(),this._u=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p2{constructor(e,n,s,r,i){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.Eu=[],this.Au=new Map,this.vu=new Set,this.Ru=[],this.Pu=i,this.Pu.Yr(o=>{s.enqueueAndForget(async()=>{yr(this)&&(z("RemoteStore","Restarting streams for network reachability change."),await async function(a){const c=le(a);c.vu.add(4),await Ta(c),c.bu.set("Unknown"),c.vu.delete(4),await nu(c)}(this))})}),this.bu=new d2(s,r)}}async function nu(t){if(yr(t))for(const e of t.Ru)await e(!0)}async function Ta(t){for(const e of t.Ru)await e(!1)}function RI(t,e){const n=le(t);n.Au.has(e.targetId)||(n.Au.set(e.targetId,e),Up(n)?Fp(n):Pi(n).Ko()&&Lp(n,e))}function kI(t,e){const n=le(t),s=Pi(n);n.Au.delete(e),s.Ko()&&AI(n,e),n.Au.size===0&&(s.Ko()?s.jo():yr(n)&&n.bu.set("Unknown"))}function Lp(t,e){if(t.Vu.qt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ae.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Pi(t).su(e)}function AI(t,e){t.Vu.qt(e),Pi(t).iu(e)}function Fp(t){t.Vu=new yU({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),le:e=>t.Au.get(e)||null,ue:()=>t.datastore.serializer.databaseId}),Pi(t).start(),t.bu.gu()}function Up(t){return yr(t)&&!Pi(t).Uo()&&t.Au.size>0}function yr(t){return le(t).vu.size===0}function NI(t){t.Vu=void 0}async function g2(t){t.Au.forEach((e,n)=>{Lp(t,e)})}async function m2(t,e){NI(t),Up(t)?(t.bu.Iu(e),Fp(t)):t.bu.set("Unknown")}async function y2(t,e,n){if(t.bu.set("Online"),e instanceof mI&&e.state===2&&e.cause)try{await async function(s,r){const i=r.cause;for(const o of r.targetIds)s.Au.has(o)&&(await s.remoteSyncer.rejectListen(o,i),s.Au.delete(o),s.Vu.removeTarget(o))}(t,e)}catch(s){z("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),s),await el(t,s)}else if(e instanceof cc?t.Vu.Ht(e):e instanceof gI?t.Vu.ne(e):t.Vu.Xt(e),!n.isEqual(ae.min()))try{const s=await CI(t.localStore);n.compareTo(s)>=0&&await function(r,i){const o=r.Vu.ce(i);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){const l=r.Au.get(c);l&&r.Au.set(c,l.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach((a,c)=>{const l=r.Au.get(a);if(!l)return;r.Au.set(a,l.withResumeToken(bt.EMPTY_BYTE_STRING,l.snapshotVersion)),AI(r,a);const u=new _s(l.target,a,c,l.sequenceNumber);Lp(r,u)}),r.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(s){z("RemoteStore","Failed to raise snapshot:",s),await el(t,s)}}async function el(t,e,n){if(!va(e))throw e;t.vu.add(1),await Ta(t),t.bu.set("Offline"),n||(n=()=>CI(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{z("RemoteStore","Retrying IndexedDB access"),await n(),t.vu.delete(1),await nu(t)})}function OI(t,e){return e().catch(n=>el(t,n,e))}async function su(t){const e=le(t),n=As(e);let s=e.Eu.length>0?e.Eu[e.Eu.length-1].batchId:-1;for(;_2(e);)try{const r=await n2(e.localStore,s);if(r===null){e.Eu.length===0&&n.jo();break}s=r.batchId,v2(e,r)}catch(r){await el(e,r)}PI(e)&&DI(e)}function _2(t){return yr(t)&&t.Eu.length<10}function v2(t,e){t.Eu.push(e);const n=As(t);n.Ko()&&n.ou&&n.uu(e.mutations)}function PI(t){return yr(t)&&!As(t).Uo()&&t.Eu.length>0}function DI(t){As(t).start()}async function w2(t){As(t).hu()}async function E2(t){const e=As(t);for(const n of t.Eu)e.uu(n.mutations)}async function T2(t,e,n){const s=t.Eu.shift(),r=Ap.from(s,e,n);await OI(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await su(t)}async function I2(t,e){e&&As(t).ou&&await async function(n,s){if(r=s.code,pU(r)&&r!==N.ABORTED){const i=n.Eu.shift();As(n).Qo(),await OI(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await su(n)}var r}(t,e),PI(t)&&DI(t)}async function g_(t,e){const n=le(t);n.asyncQueue.verifyOperationInProgress(),z("RemoteStore","RemoteStore received new credentials");const s=yr(n);n.vu.add(3),await Ta(n),s&&n.bu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.vu.delete(3),await nu(n)}async function C2(t,e){const n=le(t);e?(n.vu.delete(2),await nu(n)):e||(n.vu.add(2),await Ta(n),n.bu.set("Unknown"))}function Pi(t){return t.Su||(t.Su=function(e,n,s){const r=le(e);return r.fu(),new u2(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(t.datastore,t.asyncQueue,{uo:g2.bind(null,t),ao:m2.bind(null,t),nu:y2.bind(null,t)}),t.Ru.push(async e=>{e?(t.Su.Qo(),Up(t)?Fp(t):t.bu.set("Unknown")):(await t.Su.stop(),NI(t))})),t.Su}function As(t){return t.Du||(t.Du=function(e,n,s){const r=le(e);return r.fu(),new h2(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(t.datastore,t.asyncQueue,{uo:w2.bind(null,t),ao:I2.bind(null,t),au:E2.bind(null,t),cu:T2.bind(null,t)}),t.Ru.push(async e=>{e?(t.Du.Qo(),await su(t)):(await t.Du.stop(),t.Eu.length>0&&(z("RemoteStore",`Stopping write stream with ${t.Eu.length} pending writes`),t.Eu=[]))})),t.Du}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $p{constructor(e,n,s,r,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new Gn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,n,s,r,i){const o=Date.now()+s,a=new $p(e,n,o,r,i);return a.start(s),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new G(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Vp(t,e){if(Zn("AsyncQueue",`${e}: ${t}`),va(t))return new G(N.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(e){this.comparator=e?(n,s)=>e(n,s)||ee.comparator(n.key,s.key):(n,s)=>ee.comparator(n.key,s.key),this.keyedMap=Qi(),this.sortedSet=new Ve(this.comparator)}static emptySet(e){return new Gr(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,s)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Gr)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const s=new Gr;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=n,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_{constructor(){this.Cu=new Ve(ee.comparator)}track(e){const n=e.doc.key,s=this.Cu.get(n);s?e.type!==0&&s.type===3?this.Cu=this.Cu.insert(n,e):e.type===3&&s.type!==1?this.Cu=this.Cu.insert(n,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.Cu=this.Cu.insert(n,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.Cu=this.Cu.insert(n,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.Cu=this.Cu.remove(n):e.type===1&&s.type===2?this.Cu=this.Cu.insert(n,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.Cu=this.Cu.insert(n,{type:2,doc:e.doc}):se():this.Cu=this.Cu.insert(n,e)}xu(){const e=[];return this.Cu.inorderTraversal((n,s)=>{e.push(s)}),e}}class gi{constructor(e,n,s,r,i,o,a,c,l){this.query=e,this.docs=n,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,n,s,r,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new gi(e,n,Gr.emptySet(n),o,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Yl(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,s=e.docChanges;if(n.length!==s.length)return!1;for(let r=0;r<n.length;r++)if(n[r].type!==s[r].type||!n[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b2{constructor(){this.Nu=void 0,this.listeners=[]}}class S2{constructor(){this.queries=new Oi(e=>tI(e),Yl),this.onlineState="Unknown",this.ku=new Set}}async function Bp(t,e){const n=le(t),s=e.query;let r=!1,i=n.queries.get(s);if(i||(r=!0,i=new b2),r)try{i.Nu=await n.onListen(s)}catch(o){const a=Vp(o,`Initialization of query '${Ef(e.query)}' failed`);return void e.onError(a)}n.queries.set(s,i),i.listeners.push(e),e.Mu(n.onlineState),i.Nu&&e.$u(i.Nu)&&jp(n)}async function Hp(t,e){const n=le(t),s=e.query;let r=!1;const i=n.queries.get(s);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),r=i.listeners.length===0)}if(r)return n.queries.delete(s),n.onUnlisten(s)}function R2(t,e){const n=le(t);let s=!1;for(const r of e){const i=r.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.$u(r)&&(s=!0);o.Nu=r}}s&&jp(n)}function k2(t,e,n){const s=le(t),r=s.queries.get(e);if(r)for(const i of r.listeners)i.onError(n);s.queries.delete(e)}function jp(t){t.ku.forEach(e=>{e.next()})}class Wp{constructor(e,n,s){this.query=e,this.Ou=n,this.Fu=!1,this.Bu=null,this.onlineState="Unknown",this.options=s||{}}$u(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new gi(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Fu?this.Lu(e)&&(this.Ou.next(e),n=!0):this.qu(e,this.onlineState)&&(this.Uu(e),n=!0),this.Bu=e,n}onError(e){this.Ou.error(e)}Mu(e){this.onlineState=e;let n=!1;return this.Bu&&!this.Fu&&this.qu(this.Bu,e)&&(this.Uu(this.Bu),n=!0),n}qu(e,n){if(!e.fromCache)return!0;const s=n!=="Offline";return(!this.options.Ku||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Lu(e){if(e.docChanges.length>0)return!0;const n=this.Bu&&this.Bu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Uu(e){e=gi.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Fu=!0,this.Ou.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(e){this.key=e}}class MI{constructor(e){this.key=e}}class A2{constructor(e,n){this.query=e,this.Yu=n,this.Xu=null,this.hasCachedResults=!1,this.current=!1,this.Zu=he(),this.mutatedKeys=he(),this.tc=nI(e),this.ec=new Gr(this.tc)}get nc(){return this.Yu}sc(e,n){const s=n?n.ic:new m_,r=n?n.ec:this.ec;let i=n?n.mutatedKeys:this.mutatedKeys,o=r,a=!1;const c=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,l=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((u,h)=>{const f=r.get(u),d=Jl(this.query,h)?h:null,p=!!f&&this.mutatedKeys.has(f.key),y=!!d&&(d.hasLocalMutations||this.mutatedKeys.has(d.key)&&d.hasCommittedMutations);let E=!1;f&&d?f.data.isEqual(d.data)?p!==y&&(s.track({type:3,doc:d}),E=!0):this.rc(f,d)||(s.track({type:2,doc:d}),E=!0,(c&&this.tc(d,c)>0||l&&this.tc(d,l)<0)&&(a=!0)):!f&&d?(s.track({type:0,doc:d}),E=!0):f&&!d&&(s.track({type:1,doc:f}),E=!0,(c||l)&&(a=!0)),E&&(d?(o=o.add(d),i=y?i.add(u):i.delete(u)):(o=o.delete(u),i=i.delete(u)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const u=this.query.limitType==="F"?o.last():o.first();o=o.delete(u.key),i=i.delete(u.key),s.track({type:1,doc:u})}return{ec:o,ic:s,zi:a,mutatedKeys:i}}rc(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,s){const r=this.ec;this.ec=e.ec,this.mutatedKeys=e.mutatedKeys;const i=e.ic.xu();i.sort((l,u)=>function(h,f){const d=p=>{switch(p){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return se()}};return d(h)-d(f)}(l.type,u.type)||this.tc(l.doc,u.doc)),this.oc(s);const o=n?this.uc():[],a=this.Zu.size===0&&this.current?1:0,c=a!==this.Xu;return this.Xu=a,i.length!==0||c?{snapshot:new gi(this.query,e.ec,r,i,e.mutatedKeys,a===0,c,!1,!!s&&s.resumeToken.approximateByteSize()>0),cc:o}:{cc:o}}Mu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ec:this.ec,ic:new m_,mutatedKeys:this.mutatedKeys,zi:!1},!1)):{cc:[]}}ac(e){return!this.Yu.has(e)&&!!this.ec.has(e)&&!this.ec.get(e).hasLocalMutations}oc(e){e&&(e.addedDocuments.forEach(n=>this.Yu=this.Yu.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Yu=this.Yu.delete(n)),this.current=e.current)}uc(){if(!this.current)return[];const e=this.Zu;this.Zu=he(),this.ec.forEach(s=>{this.ac(s.key)&&(this.Zu=this.Zu.add(s.key))});const n=[];return e.forEach(s=>{this.Zu.has(s)||n.push(new MI(s))}),this.Zu.forEach(s=>{e.has(s)||n.push(new xI(s))}),n}hc(e){this.Yu=e.ir,this.Zu=he();const n=this.sc(e.documents);return this.applyChanges(n,!0)}lc(){return gi.fromInitialDocuments(this.query,this.ec,this.mutatedKeys,this.Xu===0,this.hasCachedResults)}}class N2{constructor(e,n,s){this.query=e,this.targetId=n,this.view=s}}class O2{constructor(e){this.key=e,this.fc=!1}}class P2{constructor(e,n,s,r,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.dc={},this.wc=new Oi(a=>tI(a),Yl),this._c=new Map,this.mc=new Set,this.gc=new Ve(ee.comparator),this.yc=new Map,this.Ic=new Dp,this.Tc={},this.Ec=new Map,this.Ac=pi.Mn(),this.onlineState="Unknown",this.vc=void 0}get isPrimaryClient(){return this.vc===!0}}async function D2(t,e){const n=j2(t);let s,r;const i=n.wc.get(e);if(i)s=i.targetId,n.sharedClientState.addLocalQueryTarget(s),r=i.view.lc();else{const o=await s2(n.localStore,es(e)),a=n.sharedClientState.addLocalQueryTarget(o.targetId);s=o.targetId,r=await x2(n,e,s,a==="current",o.resumeToken),n.isPrimaryClient&&RI(n.remoteStore,o)}return r}async function x2(t,e,n,s,r){t.Rc=(h,f,d)=>async function(p,y,E,v){let g=y.view.sc(E);g.zi&&(g=await f_(p.localStore,y.query,!1).then(({documents:b})=>y.view.sc(b,g)));const T=v&&v.targetChanges.get(y.targetId),w=y.view.applyChanges(g,p.isPrimaryClient,T);return __(p,y.targetId,w.cc),w.snapshot}(t,h,f,d);const i=await f_(t.localStore,e,!0),o=new A2(e,i.ir),a=o.sc(i.documents),c=Ea.createSynthesizedTargetChangeForCurrentChange(n,s&&t.onlineState!=="Offline",r),l=o.applyChanges(a,t.isPrimaryClient,c);__(t,n,l.cc);const u=new N2(e,n,o);return t.wc.set(e,u),t._c.has(n)?t._c.get(n).push(e):t._c.set(n,[e]),l.snapshot}async function M2(t,e){const n=le(t),s=n.wc.get(e),r=n._c.get(s.targetId);if(r.length>1)return n._c.set(s.targetId,r.filter(i=>!Yl(i,e))),void n.wc.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Sf(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),kI(n.remoteStore,s.targetId),Rf(n,s.targetId)}).catch(_a)):(Rf(n,s.targetId),await Sf(n.localStore,s.targetId,!0))}async function L2(t,e,n){const s=W2(t);try{const r=await function(i,o){const a=le(i),c=Ge.now(),l=o.reduce((f,d)=>f.add(d.key),he());let u,h;return a.persistence.runTransaction("Locally write mutations","readwrite",f=>{let d=ts(),p=he();return a.Zi.getEntries(f,l).next(y=>{d=y,d.forEach((E,v)=>{v.isValidDocument()||(p=p.add(E))})}).next(()=>a.localDocuments.getOverlayedDocuments(f,d)).next(y=>{u=y;const E=[];for(const v of o){const g=lU(v,u.get(v.key).overlayedDocument);g!=null&&E.push(new xs(v.key,g,GT(g.value.mapValue),un.exists(!0)))}return a.mutationQueue.addMutationBatch(f,c,E,o)}).next(y=>{h=y;const E=y.applyToLocalDocumentSet(u,p);return a.documentOverlayCache.saveOverlays(f,y.batchId,E)})}).then(()=>({batchId:h.batchId,changes:rI(u)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),function(i,o,a){let c=i.Tc[i.currentUser.toKey()];c||(c=new Ve(we)),c=c.insert(o,a),i.Tc[i.currentUser.toKey()]=c}(s,r.batchId,n),await Ia(s,r.changes),await su(s.remoteStore)}catch(r){const i=Vp(r,"Failed to persist write");n.reject(i)}}async function LI(t,e){const n=le(t);try{const s=await e2(n.localStore,e);e.targetChanges.forEach((r,i)=>{const o=n.yc.get(i);o&&(Fe(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1),r.addedDocuments.size>0?o.fc=!0:r.modifiedDocuments.size>0?Fe(o.fc):r.removedDocuments.size>0&&(Fe(o.fc),o.fc=!1))}),await Ia(n,s,e)}catch(s){await _a(s)}}function y_(t,e,n){const s=le(t);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const r=[];s.wc.forEach((i,o)=>{const a=o.view.Mu(e);a.snapshot&&r.push(a.snapshot)}),function(i,o){const a=le(i);a.onlineState=o;let c=!1;a.queries.forEach((l,u)=>{for(const h of u.listeners)h.Mu(o)&&(c=!0)}),c&&jp(a)}(s.eventManager,e),r.length&&s.dc.nu(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function F2(t,e,n){const s=le(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s.yc.get(e),i=r&&r.key;if(i){let o=new Ve(ee.comparator);o=o.insert(i,gt.newNoDocument(i,ae.min()));const a=he().add(i),c=new eu(ae.min(),new Map,new Ve(we),o,a);await LI(s,c),s.gc=s.gc.remove(i),s.yc.delete(e),Kp(s)}else await Sf(s.localStore,e,!1).then(()=>Rf(s,e,n)).catch(_a)}async function U2(t,e){const n=le(t),s=e.batch.batchId;try{const r=await ZU(n.localStore,e);UI(n,s,null),FI(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Ia(n,r)}catch(r){await _a(r)}}async function $2(t,e,n){const s=le(t);try{const r=await function(i,o){const a=le(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let l;return a.mutationQueue.lookupMutationBatch(c,o).next(u=>(Fe(u!==null),l=u.keys(),a.mutationQueue.removeMutationBatch(c,u))).next(()=>a.mutationQueue.performConsistencyCheck(c)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(c,l,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,l)).next(()=>a.localDocuments.getDocuments(c,l))})}(s.localStore,e);UI(s,e,n),FI(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await Ia(s,r)}catch(r){await _a(r)}}function FI(t,e){(t.Ec.get(e)||[]).forEach(n=>{n.resolve()}),t.Ec.delete(e)}function UI(t,e,n){const s=le(t);let r=s.Tc[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(n?i.reject(n):i.resolve(),r=r.remove(e)),s.Tc[s.currentUser.toKey()]=r}}function Rf(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t._c.get(e))t.wc.delete(s),n&&t.dc.Pc(s,n);t._c.delete(e),t.isPrimaryClient&&t.Ic.Is(e).forEach(s=>{t.Ic.containsKey(s)||$I(t,s)})}function $I(t,e){t.mc.delete(e.path.canonicalString());const n=t.gc.get(e);n!==null&&(kI(t.remoteStore,n),t.gc=t.gc.remove(e),t.yc.delete(n),Kp(t))}function __(t,e,n){for(const s of n)s instanceof xI?(t.Ic.addReference(s.key,e),V2(t,s)):s instanceof MI?(z("SyncEngine","Document no longer in limbo: "+s.key),t.Ic.removeReference(s.key,e),t.Ic.containsKey(s.key)||$I(t,s.key)):se()}function V2(t,e){const n=e.key,s=n.path.canonicalString();t.gc.get(n)||t.mc.has(s)||(z("SyncEngine","New document in limbo: "+n),t.mc.add(s),Kp(t))}function Kp(t){for(;t.mc.size>0&&t.gc.size<t.maxConcurrentLimboResolutions;){const e=t.mc.values().next().value;t.mc.delete(e);const n=new ee($e.fromString(e)),s=t.Ac.next();t.yc.set(s,new O2(n)),t.gc=t.gc.insert(n,s),RI(t.remoteStore,new _s(es(Ql(n.path)),s,"TargetPurposeLimboResolution",Tp.ct))}}async function Ia(t,e,n){const s=le(t),r=[],i=[],o=[];s.wc.isEmpty()||(s.wc.forEach((a,c)=>{o.push(s.Rc(c,e,n).then(l=>{if((l||n)&&s.isPrimaryClient&&s.sharedClientState.updateQueryState(c.targetId,l!=null&&l.fromCache?"not-current":"current"),l){r.push(l);const u=Mp.Li(c.targetId,l);i.push(u)}}))}),await Promise.all(o),s.dc.nu(r),await async function(a,c){const l=le(a);try{await l.persistence.runTransaction("notifyLocalViewChanges","readwrite",u=>M.forEach(c,h=>M.forEach(h.Fi,f=>l.persistence.referenceDelegate.addReference(u,h.targetId,f)).next(()=>M.forEach(h.Bi,f=>l.persistence.referenceDelegate.removeReference(u,h.targetId,f)))))}catch(u){if(!va(u))throw u;z("LocalStore","Failed to update sequence numbers: "+u)}for(const u of c){const h=u.targetId;if(!u.fromCache){const f=l.Ji.get(h),d=f.snapshotVersion,p=f.withLastLimboFreeSnapshotVersion(d);l.Ji=l.Ji.insert(h,p)}}}(s.localStore,i))}async function B2(t,e){const n=le(t);if(!n.currentUser.isEqual(e)){z("SyncEngine","User change. New user:",e.toKey());const s=await II(n.localStore,e);n.currentUser=e,function(r,i){r.Ec.forEach(o=>{o.forEach(a=>{a.reject(new G(N.CANCELLED,i))})}),r.Ec.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await Ia(n,s.er)}}function H2(t,e){const n=le(t),s=n.yc.get(e);if(s&&s.fc)return he().add(s.key);{let r=he();const i=n._c.get(e);if(!i)return r;for(const o of i){const a=n.wc.get(o);r=r.unionWith(a.view.nc)}return r}}function j2(t){const e=le(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=LI.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=H2.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=F2.bind(null,e),e.dc.nu=R2.bind(null,e.eventManager),e.dc.Pc=k2.bind(null,e.eventManager),e}function W2(t){const e=le(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=U2.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=$2.bind(null,e),e}class v_{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=tu(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,n){return null}createIndexBackfillerScheduler(e,n){return null}createLocalStore(e){return XU(this.persistence,new YU,e.initialUser,this.serializer)}createPersistence(e){return new GU(xp.zs,this.serializer)}createSharedClientState(e){return new i2}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class K2{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>y_(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=B2.bind(null,this.syncEngine),await C2(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new S2}createDatastore(e){const n=tu(e.databaseInfo.databaseId),s=(r=e.databaseInfo,new l2(r));var r;return function(i,o,a,c){return new f2(i,o,a,c)}(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return n=this.localStore,s=this.datastore,r=e.asyncQueue,i=a=>y_(this.syncEngine,a,0),o=p_.D()?new p_:new o2,new p2(n,s,r,i,o);var n,s,r,i,o}createSyncEngine(e,n){return function(s,r,i,o,a,c,l){const u=new P2(s,r,i,o,a,c);return l&&(u.vc=!0),u}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(e){const n=le(e);z("RemoteStore","RemoteStore shutting down."),n.vu.add(5),await Ta(n),n.Pu.shutdown(),n.bu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qp{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Sc(this.observer.next,e)}error(e){this.observer.error?this.Sc(this.observer.error,e):Zn("Uncaught Error in snapshot listener:",e.toString())}Dc(){this.muted=!0}Sc(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q2{constructor(e,n,s,r){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this.databaseInfo=r,this.user=ft.UNAUTHENTICATED,this.clientId=KT.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(s,async i=>{z("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(s,i=>(z("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new G(N.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Gn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=Vp(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function Xu(t,e){t.asyncQueue.verifyOperationInProgress(),z("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async r=>{s.isEqual(r)||(await II(e.localStore,r),s=r)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function w_(t,e){t.asyncQueue.verifyOperationInProgress();const n=await G2(t);z("FirestoreClient","Initializing OnlineComponentProvider");const s=await t.getConfiguration();await e.initialize(n,s),t.setCredentialChangeListener(r=>g_(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>g_(e.remoteStore,i)),t._onlineComponents=e}function z2(t){return t.name==="FirebaseError"?t.code===N.FAILED_PRECONDITION||t.code===N.UNIMPLEMENTED:!(typeof DOMException<"u"&&t instanceof DOMException)||t.code===22||t.code===20||t.code===11}async function G2(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){z("FirestoreClient","Using user provided OfflineComponentProvider");try{await Xu(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!z2(n))throw n;ui("Error using user provided cache. Falling back to memory cache: "+n),await Xu(t,new v_)}}else z("FirestoreClient","Using default OfflineComponentProvider"),await Xu(t,new v_);return t._offlineComponents}async function VI(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(z("FirestoreClient","Using user provided OnlineComponentProvider"),await w_(t,t._uninitializedComponentsProvider._online)):(z("FirestoreClient","Using default OnlineComponentProvider"),await w_(t,new K2))),t._onlineComponents}function Q2(t){return VI(t).then(e=>e.syncEngine)}async function tl(t){const e=await VI(t),n=e.eventManager;return n.onListen=D2.bind(null,e.syncEngine),n.onUnlisten=M2.bind(null,e.syncEngine),n}function Y2(t,e,n={}){const s=new Gn;return t.asyncQueue.enqueueAndForget(async()=>function(r,i,o,a,c){const l=new qp({next:h=>{i.enqueueAndForget(()=>Hp(r,u));const f=h.docs.has(o);!f&&h.fromCache?c.reject(new G(N.UNAVAILABLE,"Failed to get document because the client is offline.")):f&&h.fromCache&&a&&a.source==="server"?c.reject(new G(N.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(h)},error:h=>c.reject(h)}),u=new Wp(Ql(o.path),l,{includeMetadataChanges:!0,Ku:!0});return Bp(r,u)}(await tl(t),t.asyncQueue,e,n,s)),s.promise}function J2(t,e,n={}){const s=new Gn;return t.asyncQueue.enqueueAndForget(async()=>function(r,i,o,a,c){const l=new qp({next:h=>{i.enqueueAndForget(()=>Hp(r,u)),h.fromCache&&a.source==="server"?c.reject(new G(N.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(h)},error:h=>c.reject(h)}),u=new Wp(o,l,{includeMetadataChanges:!0,Ku:!0});return Bp(r,u)}(await tl(t),t.asyncQueue,e,n,s)),s.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BI(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HI(t,e,n){if(!n)throw new G(N.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function X2(t,e,n,s){if(e===!0&&s===!0)throw new G(N.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function T_(t){if(!ee.isDocumentKey(t))throw new G(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function I_(t){if(ee.isDocumentKey(t))throw new G(N.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function zp(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":se()}function Wt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new G(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=zp(t);throw new G(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(e){var n,s;if(e.host===void 0){if(e.ssl!==void 0)throw new G(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.cache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new G(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}X2("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=BI((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new G(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new G(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new G(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(n=this.experimentalLongPollingOptions,s=e.experimentalLongPollingOptions,n.timeoutSeconds===s.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var n,s}}class ru{constructor(e,n,s,r){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new C_({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new G(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new G(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new C_(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new _F;switch(n.type){case"firstParty":return new TF(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new G(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=E_.get(e);n&&(z("ComponentProvider","Removing Datastore"),E_.delete(e),n.terminate())}(this),Promise.resolve()}}function Z2(t,e,n,s={}){var r;const i=(t=Wt(t,ru))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&ui("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),s.mockUserToken){let a,c;if(typeof s.mockUserToken=="string")a=s.mockUserToken,c=ft.MOCK_USER;else{a=bN(s.mockUserToken,(r=t._app)===null||r===void 0?void 0:r.options.projectId);const l=s.mockUserToken.sub||s.mockUserToken.user_id;if(!l)throw new G(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new ft(l)}t._authCredentials=new vF(new WT(a,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Cs(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ot(this.firestore,e,this._key)}}class Ca{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Ca(this.firestore,e,this._query)}}class Cs extends Ca{constructor(e,n,s){super(e,n,Ql(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ot(this.firestore,null,new ee(e))}withConverter(e){return new Cs(this.firestore,e,this._path)}}function jV(t,e,...n){if(t=Ct(t),HI("collection","path",e),t instanceof ru){const s=$e.fromString(e,...n);return I_(s),new Cs(t,null,s)}{if(!(t instanceof Ot||t instanceof Cs))throw new G(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child($e.fromString(e,...n));return I_(s),new Cs(t.firestore,null,s)}}function WV(t,e,...n){if(t=Ct(t),arguments.length===1&&(e=KT.A()),HI("doc","path",e),t instanceof ru){const s=$e.fromString(e,...n);return T_(s),new Ot(t,null,new ee(s))}{if(!(t instanceof Ot||t instanceof Cs))throw new G(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child($e.fromString(e,...n));return T_(s),new Ot(t.firestore,t instanceof Cs?t.converter:null,new ee(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e${constructor(){this.Gc=Promise.resolve(),this.Qc=[],this.jc=!1,this.zc=[],this.Wc=null,this.Hc=!1,this.Jc=!1,this.Yc=[],this.qo=new bI(this,"async_queue_retry"),this.Xc=()=>{const n=Ju();n&&z("AsyncQueue","Visibility state changed to "+n.visibilityState),this.qo.Mo()};const e=Ju();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Xc)}get isShuttingDown(){return this.jc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Zc(),this.ta(e)}enterRestrictedMode(e){if(!this.jc){this.jc=!0,this.Jc=e||!1;const n=Ju();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Xc)}}enqueue(e){if(this.Zc(),this.jc)return new Promise(()=>{});const n=new Gn;return this.ta(()=>this.jc&&this.Jc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qc.push(e),this.ea()))}async ea(){if(this.Qc.length!==0){try{await this.Qc[0](),this.Qc.shift(),this.qo.reset()}catch(e){if(!va(e))throw e;z("AsyncQueue","Operation failed with retryable error: "+e)}this.Qc.length>0&&this.qo.No(()=>this.ea())}}ta(e){const n=this.Gc.then(()=>(this.Hc=!0,e().catch(s=>{this.Wc=s,this.Hc=!1;const r=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(s);throw Zn("INTERNAL UNHANDLED ERROR: ",r),s}).then(s=>(this.Hc=!1,s))));return this.Gc=n,n}enqueueAfterDelay(e,n,s){this.Zc(),this.Yc.indexOf(e)>-1&&(n=0);const r=$p.createAndSchedule(this,e,n,s,i=>this.na(i));return this.zc.push(r),r}Zc(){this.Wc&&se()}verifyOperationInProgress(){}async sa(){let e;do e=this.Gc,await e;while(e!==this.Gc)}ia(e){for(const n of this.zc)if(n.timerId===e)return!0;return!1}ra(e){return this.sa().then(()=>{this.zc.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.zc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.sa()})}oa(e){this.Yc.push(e)}na(e){const n=this.zc.indexOf(e);this.zc.splice(n,1)}}function b_(t){return function(e,n){if(typeof e!="object"||e===null)return!1;const s=e;for(const r of n)if(r in s&&typeof s[r]=="function")return!0;return!1}(t,["next","error","complete"])}class Ns extends ru{constructor(e,n,s,r){super(e,n,s,r),this.type="firestore",this._queue=new e$,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||jI(this),this._firestoreClient.terminate()}}function t$(t,e){const n=typeof t=="object"?t:vd(),s=typeof t=="string"?t:e||"(default)",r=yd(n,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=CN("firestore");i&&Z2(r,...i)}return r}function iu(t){return t._firestoreClient||jI(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function jI(t){var e,n,s;const r=t._freezeSettings(),i=function(o,a,c,l){return new xF(o,a,c,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,BI(l.experimentalLongPollingOptions),l.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,r);t._firestoreClient=new q2(t._authCredentials,t._appCheckCredentials,t._queue,i),!((n=r.cache)===null||n===void 0)&&n._offlineComponentProvider&&(!((s=r.cache)===null||s===void 0)&&s._onlineComponentProvider)&&(t._firestoreClient._uninitializedComponentsProvider={_offlineKind:r.cache.kind,_offline:r.cache._offlineComponentProvider,_online:r.cache._onlineComponentProvider})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(e){this._byteString=e}static fromBase64String(e){try{return new mi(bt.fromBase64String(e))}catch(n){throw new G(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new mi(bt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new G(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new _t(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new G(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new G(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return we(this._lat,e._lat)||we(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n$=/^__.*__$/;class s${constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new xs(e,this.data,this.fieldMask,n,this.fieldTransforms):new wa(e,this.data,n,this.fieldTransforms)}}class WI{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return new xs(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function KI(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw se()}}class Qp{constructor(e,n,s,r,i,o){this.settings=e,this.databaseId=n,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.ua(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get ca(){return this.settings.ca}aa(e){return new Qp(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ha(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.aa({path:s,la:!1});return r.fa(e),r}da(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.aa({path:s,la:!1});return r.ua(),r}wa(e){return this.aa({path:void 0,la:!0})}_a(e){return nl(e,this.settings.methodName,this.settings.ma||!1,this.path,this.settings.ga)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}ua(){if(this.path)for(let e=0;e<this.path.length;e++)this.fa(this.path.get(e))}fa(e){if(e.length===0)throw this._a("Document fields must not be empty");if(KI(this.ca)&&n$.test(e))throw this._a('Document fields cannot begin and end with "__"')}}class r${constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=s||tu(e)}ya(e,n,s,r=!1){return new Qp({ca:e,methodName:n,ga:s,path:_t.emptyPath(),la:!1,ma:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function qI(t){const e=t._freezeSettings(),n=tu(t._databaseId);return new r$(t._databaseId,!!e.ignoreUndefinedProperties,n)}function i$(t,e,n,s,r,i={}){const o=t.ya(i.merge||i.mergeFields?2:0,e,n,r);Yp("Data must be an object, but it was:",o,s);const a=zI(s,o);let c,l;if(i.merge)c=new Bt(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const u=[];for(const h of i.mergeFields){const f=kf(e,h,n);if(!o.contains(f))throw new G(N.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);QI(u,f)||u.push(f)}c=new Bt(u),l=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,l=o.fieldTransforms;return new s$(new Lt(a),c,l)}class cu extends Gp{_toFieldTransform(e){if(e.ca!==2)throw e.ca===1?e._a(`${this._methodName}() can only appear at the top level of your update data`):e._a(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof cu}}function o$(t,e,n,s){const r=t.ya(1,e,n);Yp("Data must be an object, but it was:",r,s);const i=[],o=Lt.empty();mr(s,(c,l)=>{const u=Jp(e,c,n);l=Ct(l);const h=r.da(u);if(l instanceof cu)i.push(u);else{const f=lu(l,h);f!=null&&(i.push(u),o.set(u,f))}});const a=new Bt(i);return new WI(o,a,r.fieldTransforms)}function a$(t,e,n,s,r,i){const o=t.ya(1,e,n),a=[kf(e,s,n)],c=[r];if(i.length%2!=0)throw new G(N.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let f=0;f<i.length;f+=2)a.push(kf(e,i[f])),c.push(i[f+1]);const l=[],u=Lt.empty();for(let f=a.length-1;f>=0;--f)if(!QI(l,a[f])){const d=a[f];let p=c[f];p=Ct(p);const y=o.da(d);if(p instanceof cu)l.push(d);else{const E=lu(p,y);E!=null&&(l.push(d),u.set(d,E))}}const h=new Bt(l);return new WI(u,h,o.fieldTransforms)}function lu(t,e){if(GI(t=Ct(t)))return Yp("Unsupported field value:",e,t),zI(t,e);if(t instanceof Gp)return function(n,s){if(!KI(s.ca))throw s._a(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s._a(`${n._methodName}() is not currently supported inside arrays`);const r=n._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.la&&e.ca!==4)throw e._a("Nested arrays are not supported");return function(n,s){const r=[];let i=0;for(const o of n){let a=lu(o,s.wa(i));a==null&&(a={nullValue:"NULL_VALUE"}),r.push(a),i++}return{arrayValue:{values:r}}}(t,e)}return function(n,s){if((n=Ct(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return sU(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const r=Ge.fromDate(n);return{timestampValue:Zc(s.serializer,r)}}if(n instanceof Ge){const r=new Ge(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Zc(s.serializer,r)}}if(n instanceof au)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof mi)return{bytesValue:yI(s.serializer,n._byteString)};if(n instanceof Ot){const r=s.databaseId,i=n.firestore._databaseId;if(!i.isEqual(r))throw s._a(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:Pp(n.firestore._databaseId||s.databaseId,n._key.path)}}throw s._a(`Unsupported field value: ${zp(n)}`)}(t,e)}function zI(t,e){const n={};return qT(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):mr(t,(s,r)=>{const i=lu(r,e.ha(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function GI(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ge||t instanceof au||t instanceof mi||t instanceof Ot||t instanceof Gp)}function Yp(t,e,n){if(!GI(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const s=zp(n);throw s==="an object"?e._a(t+" a custom object"):e._a(t+" "+s)}}function kf(t,e,n){if((e=Ct(e))instanceof ou)return e._internalPath;if(typeof e=="string")return Jp(t,e);throw nl("Field path arguments must be of type string or ",t,!1,void 0,n)}const c$=new RegExp("[~\\*/\\[\\]]");function Jp(t,e,n){if(e.search(c$)>=0)throw nl(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ou(...e.split("."))._internalPath}catch{throw nl(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function nl(t,e,n,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new G(N.INVALID_ARGUMENT,a+t+c)}function QI(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YI{constructor(e,n,s,r,i){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ot(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new l$(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(JI("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class l$ extends YI{data(){return super.data()}}function JI(t,e){return typeof e=="string"?Jp(t,e):e instanceof ou?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XI(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new G(N.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class u${convertValue(e,n="none"){switch(lr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return qe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(cr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw se()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const s={};return mr(e,(r,i)=>{s[r]=this.convertValue(i,n)}),s}convertGeoPoint(e){return new au(qe(e.latitude),qe(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=Cp(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(Ho(e));default:return null}}convertTimestamp(e){const n=ks(e);return new Ge(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=$e.fromString(e);Fe(TI(s));const r=new jo(s.get(1),s.get(3)),i=new ee(s.popFirst(5));return r.isEqual(n)||Zn(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h$(t,e,n){let s;return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ZI extends YI{constructor(e,n,s,r,i,o){super(e,n,s,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new lc(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(JI("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}}class lc extends ZI{data(e={}){return super.data(e)}}class eC{constructor(e,n,s,r){this._firestore=e,this._userDataWriter=n,this._snapshot=r,this.metadata=new Ji(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(s=>{e.call(n,new lc(this._firestore,this._userDataWriter,s.key,s,new Ji(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new G(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,r){if(s._snapshot.oldDocs.isEmpty()){let i=0;return s._snapshot.docChanges.map(o=>{const a=new lc(s._firestore,s._userDataWriter,o.doc.key,o.doc,new Ji(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter);return o.doc,{type:"added",doc:a,oldIndex:-1,newIndex:i++}})}{let i=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(o=>r||o.type!==3).map(o=>{const a=new lc(s._firestore,s._userDataWriter,o.doc.key,o.doc,new Ji(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,l=-1;return o.type!==0&&(c=i.indexOf(o.doc.key),i=i.delete(o.doc.key)),o.type!==1&&(i=i.add(o.doc),l=i.indexOf(o.doc.key)),{type:f$(o.type),doc:a,oldIndex:c,newIndex:l}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function f$(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return se()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tC(t){t=Wt(t,Ot);const e=Wt(t.firestore,Ns);return Y2(iu(e),t._key).then(n=>nC(e,t,n))}class Xp extends u${constructor(e){super(),this.firestore=e}convertBytes(e){return new mi(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Ot(this.firestore,null,n)}}function d$(t){t=Wt(t,Ca);const e=Wt(t.firestore,Ns),n=iu(e),s=new Xp(e);return XI(t._query),J2(n,t._query).then(r=>new eC(e,s,t,r))}function KV(t,e,n){t=Wt(t,Ot);const s=Wt(t.firestore,Ns),r=h$(t.converter,e,n);return eg(s,[i$(qI(s),"setDoc",t._key,r,t.converter!==null,n).toMutation(t._key,un.none())])}function qV(t,e,n,...s){t=Wt(t,Ot);const r=Wt(t.firestore,Ns),i=qI(r);let o;return o=typeof(e=Ct(e))=="string"||e instanceof ou?a$(i,"updateDoc",t._key,e,n,s):o$(i,"updateDoc",t._key,e),eg(r,[o.toMutation(t._key,un.exists(!0))])}function zV(t){return eg(Wt(t.firestore,Ns),[new kp(t._key,un.none())])}function Zp(t,...e){var n,s,r;t=Ct(t);let i={includeMetadataChanges:!1},o=0;typeof e[o]!="object"||b_(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(b_(e[o])){const h=e[o];e[o]=(n=h.next)===null||n===void 0?void 0:n.bind(h),e[o+1]=(s=h.error)===null||s===void 0?void 0:s.bind(h),e[o+2]=(r=h.complete)===null||r===void 0?void 0:r.bind(h)}let c,l,u;if(t instanceof Ot)l=Wt(t.firestore,Ns),u=Ql(t._key.path),c={next:h=>{e[o]&&e[o](nC(l,t,h))},error:e[o+1],complete:e[o+2]};else{const h=Wt(t,Ca);l=Wt(h.firestore,Ns),u=h._query;const f=new Xp(l);c={next:d=>{e[o]&&e[o](new eC(l,f,h,d))},error:e[o+1],complete:e[o+2]},XI(t._query)}return function(h,f,d,p){const y=new qp(p),E=new Wp(f,y,d);return h.asyncQueue.enqueueAndForget(async()=>Bp(await tl(h),E)),()=>{y.Dc(),h.asyncQueue.enqueueAndForget(async()=>Hp(await tl(h),E))}}(iu(l),u,a,c)}function eg(t,e){return function(n,s){const r=new Gn;return n.asyncQueue.enqueueAndForget(async()=>L2(await Q2(n),s,r)),r.promise}(iu(t),e)}function nC(t,e,n){const s=n.docs.get(e._key),r=new Xp(t);return new ZI(t,r,e._key,s,new Ji(n.hasPendingWrites,n.fromCache),e.converter)}(function(t,e=!0){(function(n){Ni=n})(Os),Nn(new fn("firestore",(n,{instanceIdentifier:s,options:r})=>{const i=n.getProvider("app").getImmediate(),o=new Ns(new wF(n.getProvider("auth-internal")),new CF(n.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new G(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new jo(a.options.projectId,c)}(i,s),i);return r=Object.assign({useFetchStreams:e},r),o._setSettings(r),o},"PUBLIC").setMultipleInstances(!0)),Ht(Ky,"3.12.2",t),Ht(Ky,"3.12.2","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sC="firebasestorage.googleapis.com",p$="storageBucket",g$=2*60*1e3,m$=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln extends Mn{constructor(e,n,s=0){super(Zu(e),`Firebase Storage: ${n} (${Zu(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ln.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Zu(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var xn;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(xn||(xn={}));function Zu(t){return"storage/"+t}function y$(){const t="An unknown error occurred, please check the error payload for server response.";return new Ln(xn.UNKNOWN,t)}function _$(){return new Ln(xn.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function v$(){return new Ln(xn.CANCELED,"User canceled the upload/download.")}function w$(t){return new Ln(xn.INVALID_URL,"Invalid URL '"+t+"'.")}function E$(t){return new Ln(xn.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function S_(t){return new Ln(xn.INVALID_ARGUMENT,t)}function rC(){return new Ln(xn.APP_DELETED,"The Firebase app was deleted.")}function T$(t){return new Ln(xn.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let s;try{s=an.makeFromUrl(e,n)}catch{return new an(e,"")}if(s.path==="")return s;throw E$(e)}static makeFromUrl(e,n){let s=null;const r="([A-Za-z0-9.\\-_]+)";function i(w){w.path.charAt(w.path.length-1)==="/"&&(w.path_=w.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+r+o,"i"),c={bucket:1,path:3};function l(w){w.path_=decodeURIComponent(w.path)}const u="v[A-Za-z0-9_]+",h=n.replace(/[.]/g,"\\."),f="(/([^?#]*).*)?$",d=new RegExp(`^https?://${h}/${u}/b/${r}/o${f}`,"i"),p={bucket:1,path:3},y=n===sC?"(?:storage.googleapis.com|storage.cloud.google.com)":n,E="([^?#]*)",v=new RegExp(`^https?://${y}/${r}/${E}`,"i"),T=[{regex:a,indices:c,postModify:i},{regex:d,indices:p,postModify:l},{regex:v,indices:{bucket:1,path:2},postModify:l}];for(let w=0;w<T.length;w++){const b=T[w],D=b.regex.exec(e);if(D){const O=D[b.indices.bucket];let C=D[b.indices.path];C||(C=""),s=new an(O,C),b.postModify(s);break}}if(s==null)throw w$(e);return s}}class I${constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C$(t,e,n){let s=1,r=null,i=null,o=!1,a=0;function c(){return a===2}let l=!1;function u(...E){l||(l=!0,e.apply(null,E))}function h(E){r=setTimeout(()=>{r=null,t(d,c())},E)}function f(){i&&clearTimeout(i)}function d(E,...v){if(l){f();return}if(E){f(),u.call(null,E,...v);return}if(c()||o){f(),u.call(null,E,...v);return}s<64&&(s*=2);let T;a===1?(a=2,T=0):T=(s+Math.random())*1e3,h(T)}let p=!1;function y(E){p||(p=!0,f(),!l&&(r!==null?(E||(a=2),clearTimeout(r),h(0)):E||(a=1)))}return h(0),i=setTimeout(()=>{o=!0,y(!0)},n),y}function b$(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S$(t){return t!==void 0}function R_(t,e,n,s){if(s<e)throw S_(`Invalid value for '${t}'. Expected ${e} or greater.`);if(s>n)throw S_(`Invalid value for '${t}'. Expected ${n} or less.`)}function R$(t){const e=encodeURIComponent;let n="?";for(const s in t)if(t.hasOwnProperty(s)){const r=e(s)+"="+e(t[s]);n=n+r+"&"}return n=n.slice(0,-1),n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var sl;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(sl||(sl={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k$(t,e){const n=t>=500&&t<600,r=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||r||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A${constructor(e,n,s,r,i,o,a,c,l,u,h,f=!0){this.url_=e,this.method_=n,this.headers_=s,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=c,this.timeout_=l,this.progressCallback_=u,this.connectionFactory_=h,this.retry=f,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((d,p)=>{this.resolve_=d,this.reject_=p,this.start_()})}start_(){const e=(s,r)=>{if(r){s(!1,new Za(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=a=>{const c=a.loaded,l=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,l)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const a=i.getErrorCode()===sl.NO_ERROR,c=i.getStatus();if(!a||k$(c,this.additionalRetryCodes_)&&this.retry){const u=i.getErrorCode()===sl.ABORT;s(!1,new Za(!1,null,u));return}const l=this.successCodes_.indexOf(c)!==-1;s(!0,new Za(l,i))})},n=(s,r)=>{const i=this.resolve_,o=this.reject_,a=r.connection;if(r.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());S$(c)?i(c):i()}catch(c){o(c)}else if(a!==null){const c=y$();c.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,c)):o(c)}else if(r.canceled){const c=this.appDelete_?rC():v$();o(c)}else{const c=_$();o(c)}};this.canceled_?n(!1,new Za(!1,null,!0)):this.backoffId_=C$(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&b$(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Za{constructor(e,n,s){this.wasSuccessCode=e,this.connection=n,this.canceled=!!s}}function N$(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function O$(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function P$(t,e){e&&(t["X-Firebase-GMPID"]=e)}function D$(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function x$(t,e,n,s,r,i,o=!0){const a=R$(t.urlParams),c=t.url+a,l=Object.assign({},t.headers);return P$(l,e),N$(l,n),O$(l,i),D$(l,s),new A$(c,t.method,l,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,r,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M$(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function L$(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,n){this._service=e,n instanceof an?this._location=n:this._location=an.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new rl(e,n)}get root(){const e=new an(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return L$(this._location.path)}get storage(){return this._service}get parent(){const e=M$(this._location.path);if(e===null)return null;const n=new an(this._location.bucket,e);return new rl(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw T$(e)}}function k_(t,e){const n=e==null?void 0:e[p$];return n==null?null:an.makeFromBucketSpec(n,t)}class F${constructor(e,n,s,r,i){this.app=e,this._authProvider=n,this._appCheckProvider=s,this._url=r,this._firebaseVersion=i,this._bucket=null,this._host=sC,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=g$,this._maxUploadRetryTime=m$,this._requests=new Set,r!=null?this._bucket=an.makeFromBucketSpec(r,this._host):this._bucket=k_(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=an.makeFromBucketSpec(this._url,e):this._bucket=k_(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){R_("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){R_("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new rl(this,e)}_makeRequest(e,n,s,r,i=!0){if(this._deleted)return new I$(rC());{const o=x$(e,this._appId,s,r,n,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[s,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,s,r).getPromise()}}const A_="@firebase/storage",N_="0.11.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U$="storage";function $$(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),s=t.getProvider("auth-internal"),r=t.getProvider("app-check-internal");return new F$(n,s,r,e,Os)}function V$(){Nn(new fn(U$,$$,"PUBLIC").setMultipleInstances(!0)),Ht(A_,N_,""),Ht(A_,N_,"esm2017")}V$();const eh=new WeakMap;function tg(t,e){return eh.has(e)||eh.set(e,t||{f:{},r:{},s:{},u:{}}),eh.get(e)}function B$(t,e,n,s){if(!t)return n;const[r,i]=iC(t);if(!r)return n;const o=tg(void 0,s)[r]||{},a=e||i;return a&&a in o?o[a]:n}function H$(t,e,n,s){if(!t)return;const[r,i]=iC(t);if(!r)return;const o=tg(void 0,s)[r],a=e||i;if(a)return n.then(c=>{o[a]=c}).catch(En),a}function iC(t){return yD(t)||_D(t)?["f",t.path]:vD(t)?["r",t.toString()]:wD(t)?["s",t.toString()]:[]}const th=new WeakMap;function j$(t,e,n){const s=Sl();th.has(s)||th.set(s,new Map);const r=th.get(s),i=H$(e,n,t,s);return i&&r.set(i,t),i?()=>r.delete(i):En}const W$={toFirestore(t){return t},fromFirestore(t,e){return t.exists()?Object.defineProperties(t.data(e),{id:{value:t.id}}):null}};function Af(t,e,n,s){if(!mD(t))return[t,{}];const r=[{},{}],i=Object.keys(n).reduce((a,c)=>{const l=n[c];return a[l.path]=l.data(),a},{});function o(a,c,l,u){c=c||{};const[h,f]=u;Object.getOwnPropertyNames(a).forEach(d=>{const p=Object.getOwnPropertyDescriptor(a,d);p&&!p.enumerable&&Object.defineProperty(h,d,p)});for(const d in a){const p=a[d];if(p==null||p instanceof Date||p instanceof Ge||p instanceof au)h[d]=p;else if(Od(p)){const y=l+d;h[d]=y in n?c[d]:p.path,f[y]=p.converter?p:p.withConverter(s.converter)}else if(Array.isArray(p)){h[d]=Array(p.length);for(let y=0;y<p.length;y++){const E=p[y];E&&E.path in i&&(h[d][y]=i[E.path])}o(p,c[d]||h[d],l+d+".",[h[d],f])}else fr(p)?(h[d]={},o(p,c[d],l+d+".",[h[d],f])):h[d]=p}}return o(t,e,"",r),r}const ng={reset:!1,wait:!0,maxRefDepth:2,converter:W$,snapshotOptions:{serverTimestamps:"estimate"}};function il(t){for(const e in t)t[e].unsub()}function Nf(t,e,n,s,r,i,o,a,c){const[l,u]=Af(s.data(t.snapshotOptions),Nd(e,n),r,t);i.set(e,n,l),Of(t,e,n,r,u,i,o,a,c)}function K$({ref:t,target:e,path:n,depth:s,resolve:r,reject:i,ops:o},a){const c=Object.create(null);let l=En;return a.once?tC(t).then(u=>{u.exists()?Nf(a,e,n,u,c,o,s,r,i):(o.set(e,n,null),r())}).catch(i):l=Zp(t,u=>{u.exists()?Nf(a,e,n,u,c,o,s,r,i):(o.set(e,n,null),r())},i),()=>{l(),il(c)}}function Of(t,e,n,s,r,i,o,a,c){const l=Object.keys(r);if(Object.keys(s).filter(y=>l.indexOf(y)<0).forEach(y=>{s[y].unsub(),delete s[y]}),!l.length||++o>t.maxRefDepth)return a(n);let h=0;const f=l.length,d=Object.create(null);function p(y){y in d&&++h>=f&&a(n)}l.forEach(y=>{const E=s[y],v=r[y],g=`${n}.${y}`;if(d[g]=!0,E)if(E.path!==v.path)E.unsub();else return;s[y]={data:()=>Nd(e,g),unsub:K$({ref:v,target:e,path:g,depth:o,ops:i,resolve:p.bind(null,g),reject:c},t),path:v.path}})}function q$(t,e,n,s,r,i){const o=Object.assign({},ng,i),{snapshotListenOptions:a,snapshotOptions:c,wait:l,once:u}=o,h="value";let f=kt(l?[]:t.value);l||n.set(t,h,[]);const d=s;let p,y=En;const E=[],v={added:({newIndex:T,doc:w})=>{E.splice(T,0,Object.create(null));const b=E[T],[D,O]=Af(w.data(c),void 0,b,o);n.add(Re(f),T,D),Of(o,f,`${h}.${T}`,b,O,n,0,s.bind(null,w),r)},modified:({oldIndex:T,newIndex:w,doc:b})=>{const D=Re(f),O=E[T],C=D[T],[A,H]=Af(b.data(c),C,O,o);E.splice(w,0,O),n.remove(D,T),n.add(D,w,A),Of(o,f,`${h}.${w}`,O,H,n,0,s,r)},removed:({oldIndex:T})=>{const w=Re(f);n.remove(w,T),il(E.splice(T,1)[0])}};function g(T){const w=T.docChanges(a);if(!p&&w.length){p=!0;let b=0;const D=w.length,O=Object.create(null);for(let C=0;C<D;C++)O[w[C].doc.id]=!0;s=C=>{C&&C.id in O&&++b>=D&&(l&&(n.set(t,h,Re(f)),f=t),d(Re(f)),s=En)}}w.forEach(b=>{v[b.type](b)}),w.length||(l&&(n.set(t,h,Re(f)),f=t),s(Re(f)))}return u?d$(e).then(g).catch(r):y=Zp(e,g,r),T=>{if(y(),T){const w=typeof T=="function"?T():[];n.set(t,h,w)}E.forEach(il)}}function z$(t,e,n,s,r,i){const o=Object.assign({},ng,i),a="value",c=Object.create(null);s=ED(s,()=>Nd(t,a));let l=En;function u(h){h.exists()?Nf(o,t,a,h,c,n,0,s,r):(n.set(t,a,null),s(null))}return o.once?tC(e).then(u).catch(r):l=Zp(e,u,r),h=>{if(l(),h){const f=typeof h=="function"?h():null;n.set(t,a,f)}il(c)}}function G$(t,e){let n=En;const s=Object.assign({},ng,e),r=Re(t),i=s.target||kt();TD()&&(s.once=!0);const o=B$(r,s.ssrKey,i.value,Sl());i.value=o;let c=!(AE(r)?(o||[]).length>0:o!==void 0);const l=kt(!1),u=kt(),h=Yr(),f=Vf();let d=En;function p(){let v=Re(t);const g=new Promise((T,w)=>{if(n(s.reset),!v)return n=En,T(null);l.value=c,c=!0,v.converter||(v=v.withConverter(s.converter)),n=(Od(v)?z$:q$)(i,v,Q$,T,w,s)}).catch(T=>(h.value===g&&(u.value=T),Promise.reject(T))).finally(()=>{h.value===g&&(l.value=!1)});h.value=g}let y=En;Le(t)&&(y=Gs(t,p)),p(),r&&(d=j$(h.value,r,s.ssrKey)),f&&V_(E);function E(v=s.reset){y(),d(),n(v)}return Object.defineProperties(i,{error:{get:()=>u},data:{get:()=>i},pending:{get:()=>l},promise:{get:()=>h},stop:{get:()=>E}})}const Q$={set:(t,e,n)=>pD(t,e,n),add:(t,e,n)=>t.splice(e,0,n),remove:(t,e)=>t.splice(e,1)};function GV(t,e){return G$(t,{target:kt([]),...e})}function QV(t){return t$(Sl(t))}function Y$(t){return(e,n)=>{const s=ID(e,n).run(()=>kt(t));CD.set(e,s),SD(s,e)}}function J$(t,{firebaseApp:e,modules:n=[]}){t.provide(kE,e);for(const s of n)t.use(s.bind(null,e))}const X$=()=>nt().$firebaseApp,Z$=t=>bD(t??X$().name),eV=dw(async(t,e)=>{let n,s;console.log("MIDDLEWARE ACTIVE"),([n,s]=Co(()=>Z$()),n=await n,s(),n)||tV()}),tV=async()=>{const t=Ad(),e=new Bn;await nP(t,e)},nV=[gN,eV],go={};function sV(t,e){const{pathname:n,search:s,hash:r}=e,i=t.indexOf("#");if(i>-1){const a=r.includes(t.slice(i))?t.slice(i).length:1;let c=r.slice(a);return c[0]!=="/"&&(c="/"+c),Kg(c,"")}return Kg(n,t)+s+r}const rV=zt({name:"nuxt:router",enforce:"pre",async setup(t){var y,E;let e,n,s=tw().app.baseURL;Dt.hashMode&&!s.includes("#")&&(s+="#");const r=((y=Dt.history)==null?void 0:y.call(Dt,s))??(Dt.hashMode?SA(s):_w(s)),i=((E=Dt.routes)==null?void 0:E.call(Dt,vm))??vm;let o;const a=sV(s,window.location),c=lN({...Dt,scrollBehavior:(v,g,T)=>{var w;if(g===yn){o=T;return}return c.options.scrollBehavior=Dt.scrollBehavior,(w=Dt.scrollBehavior)==null?void 0:w.call(Dt,v,yn,o||T)},history:r,routes:i});t.vueApp.use(c);const l=Yr(c.currentRoute.value);c.afterEach((v,g)=>{l.value=g}),Object.defineProperty(t.vueApp.config.globalProperties,"previousRoute",{get:()=>l.value});const u=Yr(c.resolve(a)),h=()=>{u.value=c.currentRoute.value};t.hook("page:finish",h),c.afterEach((v,g)=>{var T,w,b,D;((w=(T=v.matched[0])==null?void 0:T.components)==null?void 0:w.default)===((D=(b=g.matched[0])==null?void 0:b.components)==null?void 0:D.default)&&h()});const f={};for(const v in u.value)f[v]=yt(()=>u.value[v]);t._route=Kt(f),t._middleware=t._middleware||{global:[],named:{}};const d=vl();try{[e,n]=Co(()=>c.isReady()),await e,n()}catch(v){[e,n]=Co(()=>t.runWithContext(()=>kr(v))),await e,n()}const p=Dk("_layout");return c.beforeEach(async(v,g)=>{var T;v.meta=Kt(v.meta),t.isHydrating&&p.value&&!er(v.meta.layout)&&(v.meta.layout=p.value),t._processingMiddleware=!0;{const w=new Set([...nV,...t._middleware.global]);for(const b of v.matched){const D=b.meta.middleware;if(D)if(Array.isArray(D))for(const O of D)w.add(O);else w.add(D)}for(const b of w){const D=typeof b=="string"?t._middleware.named[b]||await((T=go[b])==null?void 0:T.call(go).then(C=>C.default||C)):b;if(!D)throw new Error(`Unknown route middleware: '${b}'.`);const O=await t.runWithContext(()=>D(v,g));if(!t.payload.serverRendered&&t.isHydrating&&(O===!1||O instanceof Error)){const C=O||Sh({statusCode:404,statusMessage:`Page Not Found: ${a}`});return await t.runWithContext(()=>kr(C)),!1}if(O||O===!1)return O}}}),c.onError(()=>{delete t._processingMiddleware}),c.afterEach(async(v,g,T)=>{delete t._processingMiddleware,!t.isHydrating&&d.value&&await t.runWithContext(Mk),v.matched.length===0&&await t.runWithContext(()=>kr(Sh({statusCode:404,fatal:!1,statusMessage:`Page not found: ${v.fullPath}`})))}),t.hooks.hookOnce("app:created",async()=>{try{await c.replace({...c.resolve(a),name:void 0,force:!0}),c.options.scrollBehavior=Dt.scrollBehavior}catch(v){await t.runWithContext(()=>kr(v))}}),{provide:{router:c}}}},1),Dr={default:()=>Vr(()=>import("./default.4ff8ee1e.js"),["./default.4ff8ee1e.js","./default.633157ed.css"],import.meta.url).then(t=>t.default||t)},iV=zt({name:"nuxt:prefetch",setup(t){const e=Jo();t.hooks.hook("app:mounted",()=>{e.beforeEach(async n=>{var r;const s=(r=n==null?void 0:n.meta)==null?void 0:r.layout;s&&typeof Dr[s]=="function"&&await Dr[s]()})}),t.hooks.hook("link:prefetch",n=>{var o,a,c,l;if(yl(n))return;const s=e.resolve(n);if(!s)return;const r=(o=s==null?void 0:s.meta)==null?void 0:o.layout;let i=Array.isArray((a=s==null?void 0:s.meta)==null?void 0:a.middleware)?(c=s==null?void 0:s.meta)==null?void 0:c.middleware:[(l=s==null?void 0:s.meta)==null?void 0:l.middleware];i=i.filter(u=>typeof u=="string");for(const u of i)typeof go[u]=="function"&&go[u]();r&&typeof Dr[r]=="function"&&Dr[r]()})}}),oV=zt(()=>{const t=gw();return{provide:{firebaseApp:_d(t.firebaseConfig)}}}),aV=zt(t=>{var n;gw();const e=t.$firebaseApp;t.vueApp.use(J$,{firebaseApp:e}),(n=t.payload)!=null&&n.vuefire&&tg(t.payload.vuefire,e)}),cV=zt(t=>{const e=t.$firebaseApp;Y$(t.payload.vuefireUser)(e,t.vueApp)}),lV=zt(t=>{const e=t.$firebaseApp,n=Ad(e);fE(n,nh,()=>{nh(n.currentUser)}),Sd(n,nh)});async function nh(t){const e=await(t==null?void 0:t.getIdToken(!0));await $fetch("/api/__session",{method:"POST",body:{token:e}})}const uV=zt({name:"nuxt:chunk-reload",setup(t){const e=Jo(),n=tw(),s=new Set;e.beforeEach(()=>{s.clear()}),t.hook("app:chunkError",({error:r})=>{s.add(r)}),e.onError((r,i)=>{if(s.has(r)){const a="href"in i&&i.href.startsWith("#")?n.app.baseURL+i.href:_l(n.app.baseURL,i.fullPath);nA({path:a,persistState:!0})}})}}),hV={apiKey:"AIzaSyCv2SZo5e62v566bJOgLRPe5erL7VCUGok",authDomain:"cygnicompetencehub.firebaseapp.com",projectId:"cygnicompetencehub",storageBucket:"cygnicompetencehub.appspot.com",messagingSenderId:"225273337132",appId:"1:225273337132:web:161ab4d7909b78531e0889",measurementId:"G-JY96C7V423"};_d(hV);const fV=zt(()=>{}),dV=[iA,oA,aA,cA,rV,iV,oV,aV,cV,lV,uV,fV],pV=(t,e)=>e.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,n=>{var s;return((s=t.params[n.slice(1)])==null?void 0:s.toString())||""}),gV=(t,e)=>{const n=t.route.matched.find(r=>{var i;return((i=r.components)==null?void 0:i.default)===t.Component.type}),s=e??(n==null?void 0:n.meta.key)??(n&&pV(t.route,n));return typeof s=="function"?s(t.route):s},mV=(t,e)=>({default:()=>t?bn(Ib,t===!0?{}:t,e):e}),Pf=(t,e,n)=>(e=e===!0?{}:e,{default:()=>{var s;return e?bn(t,e,n):(s=n.default)==null?void 0:s.call(n)}}),yV=hr({name:"NuxtPage",inheritAttrs:!1,props:{name:{type:String},transition:{type:[Boolean,Object],default:void 0},keepalive:{type:[Boolean,Object],default:void 0},route:{type:Object},pageKey:{type:[Function,String],default:null}},setup(t,{attrs:e}){const n=nt();return()=>bn(Rw,{name:t.name,route:t.route,...e},{default:s=>{if(!s.Component)return;const r=gV(s,t.pageKey),i=n.deferHydration(),o=!!(t.transition??s.route.meta.pageTransition??kh),a=o&&vV([t.transition,s.route.meta.pageTransition,kh,{onAfterLeave:()=>{n.callHook("page:transition:finish",s.Component)}}].filter(Boolean));return Pf(ml,o&&a,mV(t.keepalive??s.route.meta.keepalive??Yk,bn(fv,{suspensible:!0,onPending:()=>n.callHook("page:start",s.Component),onResolve:()=>{ur(()=>n.callHook("page:finish",s.Component).finally(i))}},{default:()=>bn(wV,{key:r,routeProps:s,pageKey:r,hasTransition:o})}))).default()}})}});function _V(t){return Array.isArray(t)?t:t?[t]:[]}function vV(t){const e=t.map(n=>({...n,onAfterLeave:_V(n.onAfterLeave)}));return Ak(...e)}const wV=hr({name:"RouteProvider",props:["routeProps","pageKey","hasTransition"],setup(t){const e=t.pageKey,n=t.routeProps.route,s={};for(const r in t.routeProps.route)s[r]=yt(()=>e===t.pageKey?t.routeProps.route[r]:n[r]);return $r("_route",Kt(s)),()=>bn(t.routeProps.Component)}}),EV=hr({name:"LayoutLoader",inheritAttrs:!1,props:{name:String},async setup(t,e){const n=await Dr[t.name]().then(s=>s.default||s);return()=>bn(n,e.attrs,e.slots)}}),TV=hr({name:"NuxtLayout",inheritAttrs:!1,props:{name:{type:[String,Boolean,Object],default:null}},setup(t,e){const n=At("_route"),s=n===fw()?hN():n,r=yt(()=>Re(t.name)??s.meta.layout??"default");return()=>{const i=r.value&&r.value in Dr,o=s.meta.layoutTransition??Qk;return Pf(ml,i&&o,{default:()=>Pf(EV,i&&{key:r.value,name:r.value,...e.attrs},e.slots).default()}).default()}}});const IV=(t,e)=>{const n=t.__vccOpts||t;for(const[s,r]of e)n[s]=r;return n},CV={},bV={id:"Main"};function SV(t,e){const n=yV,s=TV;return Vn(),ds(s,null,{default:Yf(()=>[od("div",bV,[Be(n)])]),_:1})}const RV=IV(CV,[["render",SV]]),O_={__name:"nuxt-root",setup(t){const e=Eb(()=>Vr(()=>import("./error-component.39aa1057.js"),[],import.meta.url).then(c=>c.default||c)),n=()=>null,s=nt(),r=s.deferHydration(),i=!1;$r("_route",fw()),s.hooks.callHookWith(c=>c.map(l=>l()),"vue:setup");const o=vl();Ev((c,l,u)=>{if(s.hooks.callHook("vue:error",c,l,u).catch(h=>console.error("[nuxt] Error in `vue:error` hook",h)),Lk(c)&&(c.fatal||c.unhandled))return s.runWithContext(()=>kr(c)),!1});const{islandContext:a}=!1;return(c,l)=>(Vn(),ds(fv,{onResolve:Re(r)},{default:Yf(()=>[Re(o)?(Vn(),ds(Re(e),{key:0,error:Re(o)},null,8,["error"])):Re(a)?(Vn(),ds(Re(n),{key:1,context:Re(a)},null,8,["context"])):Re(i)?(Vn(),ds(Pb(Re(i)),{key:2})):(Vn(),ds(Re(RV),{key:3}))]),_:1},8,["onResolve"]))}};globalThis.$fetch||(globalThis.$fetch=ER.create({baseURL:IR()}));let P_;const kV=$R(dV);{let t;P_=async function(){var i,o;if(t)return t;const s=!!((i=window.__NUXT__)!=null&&i.serverRendered||((o=document.getElementById("__NUXT_DATA__"))==null?void 0:o.dataset.ssr)==="true")?xS(O_):DS(O_),r=LR({vueApp:s});try{await UR(r,kV)}catch(a){await r.callHook("app:error",a),r.payload.error=r.payload.error||a}try{await r.hooks.callHook("app:created",s),await r.hooks.callHook("app:beforeMount",s),s.mount("#"+Jk),await r.hooks.callHook("app:mounted",s),await ur()}catch(a){await r.callHook("app:error",a),r.payload.error=r.payload.error||a}return s},t=P_().catch(e=>{console.error("Error while mounting app:",e)})}export{qV as A,zV as B,Fv as C,UV as D,ud as E,Mt as F,Ff as G,xV as H,nt as I,Jo as J,yl as K,ed as L,td as M,bn as N,PV as O,ld as P,QS as Q,nR as R,zv as S,HV as T,IV as _,od as a,Mk as b,MV as c,hr as d,VV as e,yt as f,jV as g,QV as h,Re as i,LV as j,OV as k,Le as l,$V as m,DV as n,Vn as o,ds as p,Be as q,kt as r,BV as s,AV as t,GV as u,FV as v,NV as w,Yf as x,KV as y,WV as z};
