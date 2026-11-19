(()=>{var ck=Object.create;var Ed=Object.defineProperty;var mk=Object.getOwnPropertyDescriptor;var dk=Object.getOwnPropertyNames;var fk=Object.getPrototypeOf,hk=Object.prototype.hasOwnProperty;var no=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports),Fe=(o,e)=>{for(var t in e)Ed(o,t,{get:e[t],enumerable:!0})},gk=(o,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of dk(e))!hk.call(o,n)&&n!==t&&Ed(o,n,{get:()=>e[n],enumerable:!(r=mk(e,n))||r.enumerable});return o};var $d=(o,e,t)=>(t=o!=null?ck(fk(o)):{},gk(e||!o||!o.__esModule?Ed(t,"default",{value:o,enumerable:!0}):t,o));var nx=no((nG,rx)=>{rx.exports=Ge;var so=null;try{so=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function Ge(o,e,t){this.low=o|0,this.high=e|0,this.unsigned=!!t}Ge.prototype.__isLong__;Object.defineProperty(Ge.prototype,"__isLong__",{value:!0});function Gt(o){return(o&&o.__isLong__)===!0}Ge.isLong=Gt;var jg={},Xg={};function ts(o,e){var t,r,n;return e?(o>>>=0,(n=0<=o&&o<256)&&(r=Xg[o],r)?r:(t=He(o,(o|0)<0?-1:0,!0),n&&(Xg[o]=t),t)):(o|=0,(n=-128<=o&&o<128)&&(r=jg[o],r)?r:(t=He(o,o<0?-1:0,!1),n&&(jg[o]=t),t))}Ge.fromInt=ts;function ao(o,e){if(isNaN(o))return e?es:io;if(e){if(o<0)return es;if(o>=Jg)return ox}else{if(o<=-Yg)return Wt;if(o+1>=Yg)return tx}return o<0?ao(-o,e).neg():He(o%Fi|0,o/Fi|0,e)}Ge.fromNumber=ao;function He(o,e,t){return new Ge(o,e,t)}Ge.fromBits=He;var Rl=Math.pow;function Hd(o,e,t){if(o.length===0)throw Error("empty string");if(o==="NaN"||o==="Infinity"||o==="+Infinity"||o==="-Infinity")return io;if(typeof e=="number"?(t=e,e=!1):e=!!e,t=t||10,t<2||36<t)throw RangeError("radix");var r;if((r=o.indexOf("-"))>0)throw Error("interior hyphen");if(r===0)return Hd(o.substring(1),e,t).neg();for(var n=ao(Rl(t,8)),s=io,a=0;a<o.length;a+=8){var i=Math.min(8,o.length-a),p=parseInt(o.substring(a,a+i),t);if(i<8){var l=ao(Rl(t,i));s=s.mul(l).add(ao(p))}else s=s.mul(n),s=s.add(ao(p))}return s.unsigned=e,s}Ge.fromString=Hd;function yo(o,e){return typeof o=="number"?ao(o,e):typeof o=="string"?Hd(o,e):He(o.low,o.high,typeof e=="boolean"?e:o.unsigned)}Ge.fromValue=yo;var Qg=65536,Bk=1<<24,Fi=Qg*Qg,Jg=Fi*Fi,Yg=Jg/2,Zg=ts(Bk),io=ts(0);Ge.ZERO=io;var es=ts(0,!0);Ge.UZERO=es;var Ai=ts(1);Ge.ONE=Ai;var ex=ts(1,!0);Ge.UONE=ex;var Gd=ts(-1);Ge.NEG_ONE=Gd;var tx=He(-1,2147483647,!1);Ge.MAX_VALUE=tx;var ox=He(-1,-1,!0);Ge.MAX_UNSIGNED_VALUE=ox;var Wt=He(0,-2147483648,!1);Ge.MIN_VALUE=Wt;var J=Ge.prototype;J.toInt=function(){return this.unsigned?this.low>>>0:this.low};J.toNumber=function(){return this.unsigned?(this.high>>>0)*Fi+(this.low>>>0):this.high*Fi+(this.low>>>0)};J.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(Wt)){var t=ao(e),r=this.div(t),n=r.mul(t).sub(this);return r.toString(e)+n.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var s=ao(Rl(e,6),this.unsigned),a=this,i="";;){var p=a.div(s),l=a.sub(p.mul(s)).toInt()>>>0,u=l.toString(e);if(a=p,a.isZero())return u+i;for(;u.length<6;)u="0"+u;i=""+u+i}};J.getHighBits=function(){return this.high};J.getHighBitsUnsigned=function(){return this.high>>>0};J.getLowBits=function(){return this.low};J.getLowBitsUnsigned=function(){return this.low>>>0};J.getNumBitsAbs=function(){if(this.isNegative())return this.eq(Wt)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,t=31;t>0&&!(e&1<<t);t--);return this.high!=0?t+33:t+1};J.isZero=function(){return this.high===0&&this.low===0};J.eqz=J.isZero;J.isNegative=function(){return!this.unsigned&&this.high<0};J.isPositive=function(){return this.unsigned||this.high>=0};J.isOdd=function(){return(this.low&1)===1};J.isEven=function(){return(this.low&1)===0};J.equals=function(e){return Gt(e)||(e=yo(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};J.eq=J.equals;J.notEquals=function(e){return!this.eq(e)};J.neq=J.notEquals;J.ne=J.notEquals;J.lessThan=function(e){return this.comp(e)<0};J.lt=J.lessThan;J.lessThanOrEqual=function(e){return this.comp(e)<=0};J.lte=J.lessThanOrEqual;J.le=J.lessThanOrEqual;J.greaterThan=function(e){return this.comp(e)>0};J.gt=J.greaterThan;J.greaterThanOrEqual=function(e){return this.comp(e)>=0};J.gte=J.greaterThanOrEqual;J.ge=J.greaterThanOrEqual;J.compare=function(e){if(Gt(e)||(e=yo(e)),this.eq(e))return 0;var t=this.isNegative(),r=e.isNegative();return t&&!r?-1:!t&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};J.comp=J.compare;J.negate=function(){return!this.unsigned&&this.eq(Wt)?Wt:this.not().add(Ai)};J.neg=J.negate;J.add=function(e){Gt(e)||(e=yo(e));var t=this.high>>>16,r=this.high&65535,n=this.low>>>16,s=this.low&65535,a=e.high>>>16,i=e.high&65535,p=e.low>>>16,l=e.low&65535,u=0,c=0,m=0,d=0;return d+=s+l,m+=d>>>16,d&=65535,m+=n+p,c+=m>>>16,m&=65535,c+=r+i,u+=c>>>16,c&=65535,u+=t+a,u&=65535,He(m<<16|d,u<<16|c,this.unsigned)};J.subtract=function(e){return Gt(e)||(e=yo(e)),this.add(e.neg())};J.sub=J.subtract;J.multiply=function(e){if(this.isZero())return io;if(Gt(e)||(e=yo(e)),so){var t=so.mul(this.low,this.high,e.low,e.high);return He(t,so.get_high(),this.unsigned)}if(e.isZero())return io;if(this.eq(Wt))return e.isOdd()?Wt:io;if(e.eq(Wt))return this.isOdd()?Wt:io;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Zg)&&e.lt(Zg))return ao(this.toNumber()*e.toNumber(),this.unsigned);var r=this.high>>>16,n=this.high&65535,s=this.low>>>16,a=this.low&65535,i=e.high>>>16,p=e.high&65535,l=e.low>>>16,u=e.low&65535,c=0,m=0,d=0,f=0;return f+=a*u,d+=f>>>16,f&=65535,d+=s*u,m+=d>>>16,d&=65535,d+=a*l,m+=d>>>16,d&=65535,m+=n*u,c+=m>>>16,m&=65535,m+=s*l,c+=m>>>16,m&=65535,m+=a*p,c+=m>>>16,m&=65535,c+=r*u+n*l+s*p+a*i,c&=65535,He(d<<16|f,c<<16|m,this.unsigned)};J.mul=J.multiply;J.divide=function(e){if(Gt(e)||(e=yo(e)),e.isZero())throw Error("division by zero");if(so){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var t=(this.unsigned?so.div_u:so.div_s)(this.low,this.high,e.low,e.high);return He(t,so.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?es:io;var r,n,s;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return es;if(e.gt(this.shru(1)))return ex;s=es}else{if(this.eq(Wt)){if(e.eq(Ai)||e.eq(Gd))return Wt;if(e.eq(Wt))return Ai;var a=this.shr(1);return r=a.div(e).shl(1),r.eq(io)?e.isNegative()?Ai:Gd:(n=this.sub(e.mul(r)),s=r.add(n.div(e)),s)}else if(e.eq(Wt))return this.unsigned?es:io;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();s=io}for(n=this;n.gte(e);){r=Math.max(1,Math.floor(n.toNumber()/e.toNumber()));for(var i=Math.ceil(Math.log(r)/Math.LN2),p=i<=48?1:Rl(2,i-48),l=ao(r),u=l.mul(e);u.isNegative()||u.gt(n);)r-=p,l=ao(r,this.unsigned),u=l.mul(e);l.isZero()&&(l=Ai),s=s.add(l),n=n.sub(u)}return s};J.div=J.divide;J.modulo=function(e){if(Gt(e)||(e=yo(e)),so){var t=(this.unsigned?so.rem_u:so.rem_s)(this.low,this.high,e.low,e.high);return He(t,so.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};J.mod=J.modulo;J.rem=J.modulo;J.not=function(){return He(~this.low,~this.high,this.unsigned)};J.and=function(e){return Gt(e)||(e=yo(e)),He(this.low&e.low,this.high&e.high,this.unsigned)};J.or=function(e){return Gt(e)||(e=yo(e)),He(this.low|e.low,this.high|e.high,this.unsigned)};J.xor=function(e){return Gt(e)||(e=yo(e)),He(this.low^e.low,this.high^e.high,this.unsigned)};J.shiftLeft=function(e){return Gt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?He(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):He(0,this.low<<e-32,this.unsigned)};J.shl=J.shiftLeft;J.shiftRight=function(e){return Gt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?He(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):He(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};J.shr=J.shiftRight;J.shiftRightUnsigned=function(e){if(Gt(e)&&(e=e.toInt()),e&=63,e===0)return this;var t=this.high;if(e<32){var r=this.low;return He(r>>>e|t<<32-e,t>>>e,this.unsigned)}else return e===32?He(t,0,this.unsigned):He(t>>>e-32,0,this.unsigned)};J.shru=J.shiftRightUnsigned;J.shr_u=J.shiftRightUnsigned;J.toSigned=function(){return this.unsigned?He(this.low,this.high,!1):this};J.toUnsigned=function(){return this.unsigned?this:He(this.low,this.high,!0)};J.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};J.toBytesLE=function(){var e=this.high,t=this.low;return[t&255,t>>>8&255,t>>>16&255,t>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};J.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,t>>>24,t>>>16&255,t>>>8&255,t&255]};Ge.fromBytes=function(e,t,r){return r?Ge.fromBytesLE(e,t):Ge.fromBytesBE(e,t)};Ge.fromBytesLE=function(e,t){return new Ge(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)};Ge.fromBytesBE=function(e,t){return new Ge(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)}});var Gx=no(()=>{});var Hx=no(()=>{});var _b=no((bb,vf)=>{(function(o,e,t){function r(i){var p=this,l=a();p.next=function(){var u=2091639*p.s0+p.c*23283064365386963e-26;return p.s0=p.s1,p.s1=p.s2,p.s2=u-(p.c=u|0)},p.c=1,p.s0=l(" "),p.s1=l(" "),p.s2=l(" "),p.s0-=l(i),p.s0<0&&(p.s0+=1),p.s1-=l(i),p.s1<0&&(p.s1+=1),p.s2-=l(i),p.s2<0&&(p.s2+=1),l=null}function n(i,p){return p.c=i.c,p.s0=i.s0,p.s1=i.s1,p.s2=i.s2,p}function s(i,p){var l=new r(i),u=p&&p.state,c=l.next;return c.int32=function(){return l.next()*4294967296|0},c.double=function(){return c()+(c()*2097152|0)*11102230246251565e-32},c.quick=c,u&&(typeof u=="object"&&n(u,l),c.state=function(){return n(l,{})}),c}function a(){var i=4022871197,p=function(l){l=String(l);for(var u=0;u<l.length;u++){i+=l.charCodeAt(u);var c=.02519603282416938*i;i=c>>>0,c-=i,c*=i,i=c>>>0,c-=i,i+=c*4294967296}return(i>>>0)*23283064365386963e-26};return p}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.alea=s})(bb,typeof vf=="object"&&vf,typeof define=="function"&&define)});var vb=no((Tb,wf)=>{(function(o,e,t){function r(a){var i=this,p="";i.x=0,i.y=0,i.z=0,i.w=0,i.next=function(){var u=i.x^i.x<<11;return i.x=i.y,i.y=i.z,i.z=i.w,i.w^=i.w>>>19^u^u>>>8},a===(a|0)?i.x=a:p+=a;for(var l=0;l<p.length+64;l++)i.x^=p.charCodeAt(l)|0,i.next()}function n(a,i){return i.x=a.x,i.y=a.y,i.z=a.z,i.w=a.w,i}function s(a,i){var p=new r(a),l=i&&i.state,u=function(){return(p.next()>>>0)/4294967296};return u.double=function(){do var c=p.next()>>>11,m=(p.next()>>>0)/4294967296,d=(c+m)/(1<<21);while(d===0);return d},u.int32=p.next,u.quick=u,l&&(typeof l=="object"&&n(l,p),u.state=function(){return n(p,{})}),u}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.xor128=s})(Tb,typeof wf=="object"&&wf,typeof define=="function"&&define)});var Cb=no((wb,Cf)=>{(function(o,e,t){function r(a){var i=this,p="";i.next=function(){var u=i.x^i.x>>>2;return i.x=i.y,i.y=i.z,i.z=i.w,i.w=i.v,(i.d=i.d+362437|0)+(i.v=i.v^i.v<<4^(u^u<<1))|0},i.x=0,i.y=0,i.z=0,i.w=0,i.v=0,a===(a|0)?i.x=a:p+=a;for(var l=0;l<p.length+64;l++)i.x^=p.charCodeAt(l)|0,l==p.length&&(i.d=i.x<<10^i.x>>>4),i.next()}function n(a,i){return i.x=a.x,i.y=a.y,i.z=a.z,i.w=a.w,i.v=a.v,i.d=a.d,i}function s(a,i){var p=new r(a),l=i&&i.state,u=function(){return(p.next()>>>0)/4294967296};return u.double=function(){do var c=p.next()>>>11,m=(p.next()>>>0)/4294967296,d=(c+m)/(1<<21);while(d===0);return d},u.int32=p.next,u.quick=u,l&&(typeof l=="object"&&n(l,p),u.state=function(){return n(p,{})}),u}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.xorwow=s})(wb,typeof Cf=="object"&&Cf,typeof define=="function"&&define)});var Sb=no((Nb,Nf)=>{(function(o,e,t){function r(a){var i=this;i.next=function(){var l=i.x,u=i.i,c,m,d;return c=l[u],c^=c>>>7,m=c^c<<24,c=l[u+1&7],m^=c^c>>>10,c=l[u+3&7],m^=c^c>>>3,c=l[u+4&7],m^=c^c<<7,c=l[u+7&7],c=c^c<<13,m^=c^c<<9,l[u]=m,i.i=u+1&7,m};function p(l,u){var c,m,d=[];if(u===(u|0))m=d[0]=u;else for(u=""+u,c=0;c<u.length;++c)d[c&7]=d[c&7]<<15^u.charCodeAt(c)+d[c+1&7]<<13;for(;d.length<8;)d.push(0);for(c=0;c<8&&d[c]===0;++c);for(c==8?m=d[7]=-1:m=d[c],l.x=d,l.i=0,c=256;c>0;--c)l.next()}p(i,a)}function n(a,i){return i.x=a.x.slice(),i.i=a.i,i}function s(a,i){a==null&&(a=+new Date);var p=new r(a),l=i&&i.state,u=function(){return(p.next()>>>0)/4294967296};return u.double=function(){do var c=p.next()>>>11,m=(p.next()>>>0)/4294967296,d=(c+m)/(1<<21);while(d===0);return d},u.int32=p.next,u.quick=u,l&&(l.x&&n(l,p),u.state=function(){return n(p,{})}),u}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.xorshift7=s})(Nb,typeof Nf=="object"&&Nf,typeof define=="function"&&define)});var kb=no((Ib,Sf)=>{(function(o,e,t){function r(a){var i=this;i.next=function(){var l=i.w,u=i.X,c=i.i,m,d;return i.w=l=l+1640531527|0,d=u[c+34&127],m=u[c=c+1&127],d^=d<<13,m^=m<<17,d^=d>>>15,m^=m>>>12,d=u[c]=d^m,i.i=c,d+(l^l>>>16)|0};function p(l,u){var c,m,d,f,g,h=[],x=128;for(u===(u|0)?(m=u,u=null):(u=u+"\0",m=0,x=Math.max(x,u.length)),d=0,f=-32;f<x;++f)u&&(m^=u.charCodeAt((f+32)%u.length)),f===0&&(g=m),m^=m<<10,m^=m>>>15,m^=m<<4,m^=m>>>13,f>=0&&(g=g+1640531527|0,c=h[f&127]^=m+g,d=c==0?d+1:0);for(d>=128&&(h[(u&&u.length||0)&127]=-1),d=127,f=4*128;f>0;--f)m=h[d+34&127],c=h[d=d+1&127],m^=m<<13,c^=c<<17,m^=m>>>15,c^=c>>>12,h[d]=m^c;l.w=g,l.X=h,l.i=d}p(i,a)}function n(a,i){return i.i=a.i,i.w=a.w,i.X=a.X.slice(),i}function s(a,i){a==null&&(a=+new Date);var p=new r(a),l=i&&i.state,u=function(){return(p.next()>>>0)/4294967296};return u.double=function(){do var c=p.next()>>>11,m=(p.next()>>>0)/4294967296,d=(c+m)/(1<<21);while(d===0);return d},u.int32=p.next,u.quick=u,l&&(l.X&&n(l,p),u.state=function(){return n(p,{})}),u}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.xor4096=s})(Ib,typeof Sf=="object"&&Sf,typeof define=="function"&&define)});var $b=no((Eb,If)=>{(function(o,e,t){function r(a){var i=this,p="";i.next=function(){var u=i.b,c=i.c,m=i.d,d=i.a;return u=u<<25^u>>>7^c,c=c-m|0,m=m<<24^m>>>8^d,d=d-u|0,i.b=u=u<<20^u>>>12^c,i.c=c=c-m|0,i.d=m<<16^c>>>16^d,i.a=d-u|0},i.a=0,i.b=0,i.c=-1640531527,i.d=1367130551,a===Math.floor(a)?(i.a=a/4294967296|0,i.b=a|0):p+=a;for(var l=0;l<p.length+20;l++)i.b^=p.charCodeAt(l)|0,i.next()}function n(a,i){return i.a=a.a,i.b=a.b,i.c=a.c,i.d=a.d,i}function s(a,i){var p=new r(a),l=i&&i.state,u=function(){return(p.next()>>>0)/4294967296};return u.double=function(){do var c=p.next()>>>11,m=(p.next()>>>0)/4294967296,d=(c+m)/(1<<21);while(d===0);return d},u.int32=p.next,u.quick=u,l&&(typeof l=="object"&&n(l,p),u.state=function(){return n(p,{})}),u}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.tychei=s})(Eb,typeof If=="object"&&If,typeof define=="function"&&define)});var Ab=no(()=>{});var Db=no((Fb,Tu)=>{(function(o,e,t){var r=256,n=6,s=52,a="random",i=t.pow(r,n),p=t.pow(2,s),l=p*2,u=r-1,c;function m(w,v,k){var E=[];v=v==!0?{entropy:!0}:v||{};var $=h(g(v.entropy?[w,b(e)]:w??x(),3),E),A=new d(E),D=function(){for(var R=A.g(n),P=i,V=0;R<p;)R=(R+V)*r,P*=r,V=A.g(1);for(;R>=l;)R/=2,P/=2,V>>>=1;return(R+V)/P};return D.int32=function(){return A.g(4)|0},D.quick=function(){return A.g(4)/4294967296},D.double=D,h(b(A.S),e),(v.pass||k||function(R,P,V,L){return L&&(L.S&&f(L,A),R.state=function(){return f(A,{})}),V?(t[a]=R,P):R})(D,$,"global"in v?v.global:this==t,v.state)}function d(w){var v,k=w.length,E=this,$=0,A=E.i=E.j=0,D=E.S=[];for(k||(w=[k++]);$<r;)D[$]=$++;for($=0;$<r;$++)D[$]=D[A=u&A+w[$%k]+(v=D[$])],D[A]=v;(E.g=function(R){for(var P,V=0,L=E.i,B=E.j,M=E.S;R--;)P=M[L=u&L+1],V=V*r+M[u&(M[L]=M[B=u&B+P])+(M[B]=P)];return E.i=L,E.j=B,V})(r)}function f(w,v){return v.i=w.i,v.j=w.j,v.S=w.S.slice(),v}function g(w,v){var k=[],E=typeof w,$;if(v&&E=="object")for($ in w)try{k.push(g(w[$],v-1))}catch{}return k.length?k:E=="string"?w:w+"\0"}function h(w,v){for(var k=w+"",E,$=0;$<k.length;)v[u&$]=u&(E^=v[u&$]*19)+k.charCodeAt($++);return b(v)}function x(){try{var w;return c&&(w=c.randomBytes)?w=w(r):(w=new Uint8Array(r),(o.crypto||o.msCrypto).getRandomValues(w)),b(w)}catch{var v=o.navigator,k=v&&v.plugins;return[+new Date,o,k,o.screen,b(e)]}}function b(w){return String.fromCharCode.apply(0,w)}if(h(t.random(),e),typeof Tu=="object"&&Tu.exports){Tu.exports=m;try{c=Ab()}catch{}}else typeof define=="function"&&define.amd?define(function(){return m}):t["seed"+a]=m})(typeof self<"u"?self:Fb,[],Math)});var kf=no((zte,Rb)=>{var mF=_b(),dF=vb(),fF=Cb(),hF=Sb(),gF=kb(),xF=$b(),hs=Db();hs.alea=mF;hs.xor128=dF;hs.xorwow=fF;hs.xorshift7=hF;hs.xor4096=gF;hs.tychei=xF;Rb.exports=hs});var Gr=class{constructor(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}},jo=class{refCount(e){return zt("refCount")}incRef(e){return zt("incRef")}timerAvailable(){return!0}time(e){return zt("time")}read(e){return zt("read")}readSync(e){return zt("readSync")}readToGPU(e,t){return zt("readToGPU")}numDataIds(){return zt("numDataIds")}disposeData(e,t){return zt("disposeData")}write(e,t,r){return zt("write")}move(e,t,r,n,s){return zt("move")}createTensorFromGPUData(e,t,r){return zt("createTensorFromGPUData")}memory(){return zt("memory")}floatPrecision(){return zt("floatPrecision")}epsilon(){return this.floatPrecision()===32?1e-7:1e-4}dispose(){return zt("dispose")}};function zt(o){throw new Error(`'${o}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}function Bg(o){let e=o.length,t=0;for(;e>0;)t=Math.random()*e|0,e--,bl(o,e,t)}function xk(o,e){if(o.length!==e.length)throw new Error(`Array sizes must match to be shuffled together First array length was ${o.length}Second array length was ${e.length}`);let t=o.length,r=0;for(;t>0;)r=Math.random()*t|0,t--,bl(o,t,r),bl(e,t,r)}function Vs(o,e,t){return Math.max(o,Math.min(e,t))}function yk(o){return o%2===0?o:o+1}function bl(o,e,t){let r=o[e];o[e]=o[t],o[t]=r}function bk(o){let e=0;for(let t=0;t<o.length;t++)e+=o[t];return e}function _k(o,e){let t=Math.random();return e*t+(1-t)*o}function Tk(o,e){let t=0;for(let r=0;r<o.length;r++){let n=Number(o[r])-Number(e[r]);t+=n*n}return t}function I(o,e){if(!o)throw new Error(typeof e=="string"?e:e())}function Ke(o,e,t=""){I(Ut(o,e),()=>t+` Shapes ${o} and ${e} must match`)}function Jt(o){I(o!=null,()=>"The input to the tensor constructor must be a non-null value.")}function ge(o){if(o.length===0)return 1;let e=o[0];for(let t=1;t<o.length;t++)e*=o[t];return e}function vk(o){return o.length===0}function Ad(o,e){if(o===e)return!0;if(o==null||e==null||o.length!==e.length)return!1;for(let t=0;t<o.length;t++)if(o[t]!==null&&e[t]!==null&&o[t]!==e[t])return!1;return!0}function Ut(o,e){if(o===e)return!0;if(o==null||e==null||o.length!==e.length)return!1;for(let t=0;t<o.length;t++)if(o[t]!==e[t])return!1;return!0}function Xo(o){return o%1===0}function wk(o){if(Math.tanh!=null)return Math.tanh(o);if(o===1/0)return 1;if(o===-1/0)return-1;{let e=Math.exp(2*o);return(e-1)/(e+1)}}function Ck(o){let e=Math.ceil(Math.sqrt(o));return[e,Math.ceil(o/e)]}function Nk(o){let e=new Uint32Array(o);for(let t=0;t<o;++t)e[t]=t;return Bg(e),e}function qr(o,e){return e<=o.length?o:o+" ".repeat(e-o.length)}function Sk(o,e=n=>0,t,r){return new Promise((n,s)=>{let a=0,i=()=>{if(o()){n();return}a++;let p=e(a);if(t!=null&&a>=t){s();return}r!=null?r(i,p):setTimeout(i,p)};i()})}function Ik(o,e){let t=1,r=-1;for(let s=0;s<o.length;++s)if(o[s]>=0)t*=o[s];else if(o[s]===-1){if(r!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${r} and dim ${s}`);r=s}else if(o[s]<0)throw Error(`Shapes can not be < 0. Found ${o[s]} at dim ${s}`);if(r===-1){if(e>0&&e!==t)throw Error(`Size(${e}) must match the product of shape ${o}`);return o}if(t===0)throw Error(`Cannot infer the missing size in [${o}] when there are 0 elements`);if(e%t!==0)throw Error(`The implicit shape can't be a fractional number. Got ${e} / ${t}`);let n=o.slice();return n[r]=e/t,n}function hr(o,e){let t=e.length;return o=o==null?e.map((r,n)=>n):[].concat(o),I(o.every(r=>r>=-t&&r<t),()=>`All values in axis param must be in range [-${t}, ${t}) but got axis ${o}`),I(o.every(r=>Xo(r)),()=>`All values in axis param must be integers but got axis ${o}`),o.map(r=>r<0?t+r:r)}function Fd(o,e){let t=[],r=[],n=e!=null&&Array.isArray(e)&&e.length===0,s=e==null||n?null:hr(e,o).sort(),a=0;for(let i=0;i<o.length;++i){if(s!=null){if(s[a]===i&&o[i]!==1)throw new Error(`Can't squeeze axis ${i} since its dim '${o[i]}' is not 1`);(s[a]==null||s[a]>i)&&o[i]===1&&(t.push(o[i]),r.push(i)),s[a]<=i&&a++}o[i]!==1&&(t.push(o[i]),r.push(i))}return{newShape:t,keptDims:r}}function Dd(o,e){return _l(o,e)}function _l(o,e){let t=null;if(o==null||o==="float32")t=new Float32Array(e);else if(o==="int32")t=new Int32Array(e);else if(o==="bool")t=new Uint8Array(e);else if(o==="string")t=new Array(e);else throw new Error(`Unknown data type ${o}`);return t}function Rd(o,e){for(let t=0;t<o.length;t++){let r=o[t];if(isNaN(r)||!isFinite(r))throw Error(`A tensor of type ${e} being uploaded contains ${r}.`)}}function Od(o){return o==="bool"||o==="complex64"||o==="float32"||o==="int32"||o==="string"}function kk(o,e){return!(e==="complex64"||e==="float32"&&o!=="complex64"||e==="int32"&&o!=="float32"&&o!=="complex64"||e==="bool"&&o==="bool")}function Ls(o){if(o==="float32"||o==="int32")return 4;if(o==="complex64")return 8;if(o==="bool")return 1;throw new Error(`Unknown dtype ${o}`)}function Pd(o){if(o==null)return 0;let e=0;return o.forEach(t=>e+=t.length),e}function Ms(o){return typeof o=="string"||o instanceof String}function zg(o){return typeof o=="boolean"}function Ug(o){return typeof o=="number"}function gr(o){return Array.isArray(o)?gr(o[0]):o instanceof Float32Array?"float32":o instanceof Int32Array||o instanceof Uint8Array||o instanceof Uint8ClampedArray?"int32":Ug(o)?"float32":Ms(o)?"string":zg(o)?"bool":"float32"}function Bs(o){return!!(o&&o.constructor&&o.call&&o.apply)}function zs(o,e){for(let t=e;t<o;++t)if(o%t===0)return t;return o}function ko(o){let e=o.length;if(e<2)return[];let t=new Array(e-1);t[e-2]=o[e-1];for(let r=e-3;r>=0;--r)t[r]=t[r+1]*o[r+1];return t}function Wg(o,e,t,r=!1){let n=new Array;if(e.length===1){let s=e[0]*(r?2:1);for(let a=0;a<s;a++)n[a]=t[o+a]}else{let s=e[0],a=e.slice(1),i=a.reduce((p,l)=>p*l)*(r?2:1);for(let p=0;p<s;p++)n[p]=Wg(o+p*i,a,t,r)}return n}function Hr(o,e,t=!1){if(o.length===0)return e[0];let r=o.reduce((n,s)=>n*s)*(t?2:1);if(r===0)return[];if(r!==e.length)throw new Error(`[${o}] does not match the input size ${e.length}${t?" for a complex tensor":""}.`);return Wg(0,o,e,t)}function Ek(o,e){if(Array.isArray(o))return o;if(e==="float32")return o instanceof Float32Array?o:new Float32Array(o);if(e==="int32")return o instanceof Int32Array?o:new Int32Array(o);if(e==="bool"||e==="string")return Uint8Array.from(new Int32Array(o));throw new Error(`Unknown dtype ${e}`)}function Cp(o,e){let t=Us(o,e);for(let r=0;r<t.length;r++)t[r]=1;return t}function Us(o,e){if(e==null||e==="float32"||e==="complex64")return new Float32Array(o);if(e==="int32")return new Int32Array(o);if(e==="bool")return new Uint8Array(o);throw new Error(`Unknown data type ${e}`)}function $k(o,e){let t=o.reduce((r,n)=>r*n,1);if(e==null||e==="float32")return Hr(o,new Float32Array(t));if(e==="int32")return Hr(o,new Int32Array(t));if(e==="bool")return Hr(o,new Uint8Array(t));throw new Error(`Unknown data type ${e}`)}function Be(o){o.forEach(e=>{I(Number.isInteger(e)&&e>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${o}].`)})}function Ak(o,e,t){if(e===0)return 0;if(e===1)return o[0];let r=o[o.length-1];for(let n=0;n<o.length-1;++n)r+=t[n]*o[n];return r}function Fk(o,e,t){if(e===0)return[];if(e===1)return[o];let r=new Array(e);for(let n=0;n<r.length-1;++n)r[n]=Math.floor(o/t[n]),o-=r[n]*t[n];return r[r.length-1]=o,r}function Kr(o){return o&&o.then&&typeof o.then=="function"}var Gg="tfjsflags",Np=class{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=Rk,this.populateURLFlags()}setPlatform(e,t){this.platform!=null&&(F().getBool("IS_TEST")||F().getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${e}.`)),this.platformName=e,this.platform=t}registerFlag(e,t,r){if(this.flagRegistry[e]={evaluationFn:t,setHook:r},this.urlFlags[e]!=null){let n=this.urlFlags[e];F().getBool("IS_TEST")||F().getBool("PROD")||console.warn(`Setting feature override from URL ${e}: ${n}.`),this.set(e,n)}}async getAsync(e){return e in this.flags?this.flags[e]:(this.flags[e]=await this.evaluateFlag(e),this.flags[e])}get(e){if(e in this.flags)return this.flags[e];let t=this.evaluateFlag(e);if(Kr(t))throw new Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(this.flagRegistry[e]==null)throw new Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,this.flagRegistry[e].setHook!=null&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(this.flagRegistry[e]==null)throw new Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(typeof this.global>"u"||typeof this.global.location>"u"||typeof this.global.location.search>"u")return;let e=this.getQueryParams(this.global.location.search);Gg in e&&e[Gg].split(",").forEach(r=>{let[n,s]=r.split(":");this.urlFlags[n]=Pk(n,s)})}};function Rk(o){let e={};return o.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(t,...r)=>(Ok(e,r[0],r[1]),r.join("="))),e}function Ok(o,e,t){o[decodeURIComponent(e)]=decodeURIComponent(t||"")}function Pk(o,e){let t=e.toLowerCase();return t==="true"||t==="false"?t==="true":`${+t}`===t?+t:e}function F(){return Vd}var Vd=null;function Hg(o){Vd=o}var Ld;function Md(){if(Ld==null){let o;if(typeof window<"u")o=window;else if(typeof global<"u")o=global;else if(typeof process<"u")o=process;else if(typeof self<"u")o=self;else throw new Error("Could not find a global object");Ld=o}return Ld}function Vk(){let o=Md();return o._tfGlobals==null&&(o._tfGlobals=new Map),o._tfGlobals}function Sp(o,e){let t=Vk();if(t.has(o))return t.get(o);{let r=e();return t.set(o,r),t.get(o)}}var Ws="Abs",jr="Acos",Xr="Acosh",Qo="Add",Gs="AddN",Hs="All",qs="Any",Ks="ArgMax",js="ArgMin",Qr="Asin",Yr="Asinh",Zr="Atan",Jr="Atanh",en="Atan2",Xs="AvgPool",Tl="AvgPoolGrad",Qs="AvgPool3D",vl="AvgPool3DGrad",Ys="BatchMatMul",Zs="BatchToSpaceND",Js="Bincount",tn="BitwiseAnd";var ea="BroadcastArgs",xr="Cast",on="Ceil",rn="ClipByValue",ta="Complex",oa="ComplexAbs",ra="Concat",na="Conv2D",sa="Conv2DBackpropFilter",aa="Conv2DBackpropInput",ia="Conv3D",wl="Conv3DBackpropFilterV2",pa="Conv3DBackpropInputV2",nn="Cos",sn="Cosh",la="Cumprod",ua="Cumsum",ca="CropAndResize",ma="DenseBincount",da="DepthToSpace",fa="DepthwiseConv2dNative",ha="DepthwiseConv2dNativeBackpropFilter",ga="DepthwiseConv2dNativeBackpropInput",xa="Diag",ya="Dilation2D",Bd="Dilation2DBackpropInput",zd="Dilation2DBackpropFilter",Ip="Draw",an="RealDiv",ba="Einsum",pn="Elu",Cl="EluGrad",ln="Erf",un="Equal",cn="Exp",_a="ExpandDims",mn="Expm1",Ta="FFT",va="Fill",wa="FlipLeftRight",dn="Floor",fn="FloorDiv",Ca="FusedBatchNorm",Na="GatherV2",Sa="GatherNd",hn="Greater",gn="GreaterEqual",yr="Identity",Ia="IFFT",ka="Imag",xn="IsFinite",yn="IsInf",bn="IsNan",Ea="LeakyRelu",_n="Less",Tn="LessEqual",$a="LinSpace",vn="Log",wn="Log1p",Cn="LogicalAnd",Nn="LogicalNot",Sn="LogicalOr";var Aa="LRN",Nl="LRNGrad";var Fa="Max",In="Maximum",Da="MaxPool",Sl="MaxPoolGrad",Ra="MaxPool3D",Il="MaxPool3DGrad",Oa="MaxPoolWithArgmax",Pa="Mean",Va="Min",kn="Minimum",La="MirrorPad",En="Mod",Ma="Multinomial",$n="Multiply",Ba="Neg",An="NotEqual",za="NonMaxSuppressionV3",Ua="NonMaxSuppressionV4",Wa="NonMaxSuppressionV5",Ga="OnesLike",Ha="OneHot",qa="Pack",Ka="PadV2";var Fn="Pow",ja="Prelu",Xa="Prod",Qa="RaggedGather",Ya="RaggedRange",Za="RaggedTensorToTensor",Ja="Range",ei="Real",Dn="Reciprocal",Rn="Relu",ti="Reshape",oi="ResizeNearestNeighbor",kl="ResizeNearestNeighborGrad",ri="ResizeBilinear",El="ResizeBilinearGrad",On="Relu6",ni="Reverse",Pn="Round",Vn="Rsqrt",si="ScatterNd",ai="TensorScatterUpdate",ii="SearchSorted",pi="Select",Ln="Selu",li="Slice",Mn="Sin",Bn="Sinh",zn="Sign",Un="Sigmoid",Wn="Softplus",Gn="Sqrt",ui="Sum",ci="SpaceToBatchND",mi="SplitV",di="Softmax",fi="SparseFillEmptyRows",hi="SparseReshape",gi="SparseSegmentMean",xi="SparseSegmentSum",yi="SparseToDense",Hn="SquaredDifference",$l="Square",qn="StaticRegexReplace",bi="StridedSlice",_i="StringNGrams",Ti="StringSplit",vi="StringToHashBucketFast",Kn="Sub",jn="Tan",Xn="Tanh",br="Tile",wi="TopK",Ci="Transform",_r="Transpose",Ni="Unique",Si="Unpack",Ii="UnsortedSegmentSum";var ki="ZerosLike",Qn="Step",kp="FromPixels",Ei="RotateWithOffset",Yn="_FusedMatMul",Zn="FusedConv2D",Jn="FusedDepthwiseConv2D";function Yo(...o){F().getBool("IS_TEST")||F().getBool("PROD")||console.warn(...o)}function Lk(...o){F().getBool("IS_TEST")||F().getBool("PROD")||console.log(...o)}var Al=Sp("kernelRegistry",()=>new Map),Mk=Sp("gradRegistry",()=>new Map);function $i(o,e){let t=Kg(o,e);return Al.get(t)}function Ud(o){return Mk.get(o)}function Wd(o){let e=Al.entries(),t=[];for(;;){let{done:r,value:n}=e.next();if(r)break;let[s,a]=n,[i]=s.split("_");i===o&&t.push(a)}return t}function Fl(o){let{kernelName:e,backendName:t}=o,r=Kg(e,t);Al.has(r)&&Yo(`The kernel '${e}' for backend '${t}' is already registered`),Al.set(r,o)}function Kg(o,e){return`${e}_${o}`}var y={};Fe(y,{arraysEqual:()=>Ut,arraysEqualWithNull:()=>Ad,assert:()=>I,assertNonNegativeIntegerDimensions:()=>Be,assertNonNull:()=>Jt,assertShapesMatch:()=>Ke,bytesFromStringArray:()=>Pd,bytesPerElement:()=>Ls,checkConversionForErrors:()=>Rd,clamp:()=>Vs,computeStrides:()=>ko,convertBackendValuesAndArrayBuffer:()=>Ek,createScalarValue:()=>qk,createShuffledIndices:()=>Nk,decodeString:()=>Oi,distSquared:()=>Tk,encodeString:()=>Ri,fetch:()=>jk,fingerPrint64:()=>Hk,flatten:()=>vr,getArrayFromDType:()=>_l,getTypedArrayFromDType:()=>Dd,hasEncodingLoss:()=>kk,hexToLong:()=>Ep,indexToLoc:()=>Fk,inferDtype:()=>gr,inferFromImplicitShape:()=>Ik,isBoolean:()=>zg,isFunction:()=>Bs,isInt:()=>Xo,isNumber:()=>Ug,isPromise:()=>Kr,isScalarShape:()=>vk,isString:()=>Ms,isTypedArray:()=>vt,isValidDtype:()=>Od,locToIndex:()=>Ak,makeOnesTypedArray:()=>Cp,makeZerosNestedTypedArray:()=>$k,makeZerosTypedArray:()=>Us,nearestDivisor:()=>zs,nearestLargerEven:()=>yk,now:()=>ns,parseAxisParam:()=>hr,randUniform:()=>_k,repeatedTry:()=>Sk,rightPad:()=>qr,shuffle:()=>Bg,shuffleCombo:()=>xk,sizeFromShape:()=>ge,sizeToSquarishShape:()=>Ck,squeezeShape:()=>Fd,sum:()=>bk,swap:()=>bl,tanh:()=>wk,toNestedArray:()=>Hr,toTypedArray:()=>Di});function Dl(o){return o instanceof Float32Array||o instanceof Int32Array||o instanceof Uint8Array||o instanceof Uint8ClampedArray}var Kd=$d(nx());var rs=Kd.default||Kd;function Ep(o){return rs.fromString(o,!0,16)}var ax=Ep("c3a5c85c97cb3127"),os=Ep("b492b66fbe98f273"),Ct=Ep("9ae16a3b2f90404f");function qd(o){return o.xor(o.shru(47))}function ix(o,e,t){let r=o.slice(e,e+t);return rs.fromBytes(Array.from(r),!0,!0)}function ze(o,e){return ix(o,e,8)}function sx(o,e){return ix(o,e,4)}function lt(o,e){return e===0?o:o.shru(e).or(o.shl(64-e))}function Tr(o,e,t=Ep("9ddfea08eb382d69")){let r=o.xor(e).mul(t);r=r.xor(r.shru(47));let n=e.xor(r).mul(t);return n=n.xor(n.shru(47)),n=n.mul(t),n}function zk(o,e,t,r,n,s){n=n.add(o),s=lt(s.add(n).add(r),21);let a=n;return n=n.add(e),n=n.add(t),s=s.add(lt(n,44)),[n.add(r),s.add(a)]}function Ol(o,e,t,r){return zk(ze(o,e),ze(o,e+8),ze(o,e+16),ze(o,e+24),t,r)}function Uk(o,e=o.length){if(e>=8){let t=Ct.add(e*2),r=ze(o,0).add(Ct),n=ze(o,e-8),s=lt(n,37).mul(t).add(r),a=lt(r,25).add(n).mul(t);return Tr(s,a,t)}if(e>=4){let t=Ct.add(e*2),r=sx(o,0);return Tr(r.shl(3).add(e),sx(o,e-4),t)}if(e>0){let t=o[0],r=o[e>>1],n=o[e-1],s=t+(r<<8),a=e+(n<<2);return qd(Ct.mul(s).xor(ax.mul(a))).mul(Ct)}return Ct}function Wk(o,e=o.length){let t=Ct.add(e*2),r=ze(o,0).mul(os),n=ze(o,8),s=ze(o,e-8).mul(t),a=ze(o,e-16).mul(Ct);return Tr(lt(r.add(n),43).add(lt(s,30)).add(a),r.add(lt(n.add(Ct),18)).add(s),t)}function Gk(o,e=o.length){let t=Ct.add(e*2),r=ze(o,0).mul(Ct),n=ze(o,8),s=ze(o,e-8).mul(t),a=ze(o,e-16).mul(Ct),i=lt(r.add(n),43).add(lt(s,30)).add(a),p=Tr(i,r.add(lt(n.add(Ct),18)).add(s),t),l=ze(o,16).mul(t),u=ze(o,24),c=i.add(ze(o,e-32)).mul(t),m=p.add(ze(o,e-24)).mul(t);return Tr(lt(l.add(u),43).add(lt(c,30)).add(m),l.add(lt(u.add(r),18)).add(c),t)}function Hk(o,e=o.length){let t=rs.fromNumber(81,!0);if(e<=32)return e<=16?Uk(o,e):Wk(o,e);if(e<=64)return Gk(o,e);let r=t,n=t.mul(os).add(113),s=qd(n.mul(Ct).add(113)).mul(Ct),a=[rs.UZERO,rs.UZERO],i=[rs.UZERO,rs.UZERO];r=r.mul(Ct).add(ze(o,0));let p=0,l=(e-1>>6)*64,u=l+(e-1&63)-63;do r=lt(r.add(n).add(a[0]).add(ze(o,p+8)),37).mul(os),n=lt(n.add(a[1]).add(ze(o,p+48)),42).mul(os),r=r.xor(i[1]),n=n.add(a[0]).add(ze(o,p+40)),s=lt(s.add(i[0]),33).mul(os),a=Ol(o,p,a[1].mul(os),r.add(i[0])),i=Ol(o,p+32,s.add(i[1]),n.add(ze(o,p+16))),[s,r]=[r,s],p+=64;while(p!==l);let c=os.add(s.and(255).shl(1));return p=u,i[0]=i[0].add(e-1&63),a[0]=a[0].add(i[0]),i[0]=i[0].add(a[0]),r=lt(r.add(n).add(a[0]).add(ze(o,p+8)),37).mul(c),n=lt(n.add(a[1]).add(ze(o,p+48)),42).mul(c),r=r.xor(i[1].mul(9)),n=n.add(a[0].mul(9).add(ze(o,p+40))),s=lt(s.add(i[0]),33).mul(c),a=Ol(o,p,a[1].mul(c),r.add(i[0])),i=Ol(o,p+32,s.add(i[1]),n.add(ze(o,p+16))),[s,r]=[r,s],Tr(Tr(a[0],i[0],c).add(qd(n).mul(ax)).add(s),Tr(a[1],i[1],c).add(r),c)}function qk(o,e){return e==="string"?Ri(o):Di([o],e)}function Kk(o,e){return o instanceof Float32Array&&e==="float32"||o instanceof Int32Array&&e==="int32"||o instanceof Uint8Array&&e==="bool"}function Di(o,e){if(e==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(o)&&(o=vr(o)),F().getBool("DEBUG")&&Rd(o,e),Kk(o,e))return o;if(e==null||e==="float32"||e==="complex64")return new Float32Array(o);if(e==="int32")return new Int32Array(o);if(e==="bool"){let t=new Uint8Array(o.length);for(let r=0;r<t.length;++r)Math.round(o[r])!==0&&(t[r]=1);return t}else throw new Error(`Unknown data type ${e}`)}function ns(){return F().platform.now()}function jk(o,e){return F().platform.fetch(o,e)}function Ri(o,e="utf-8"){return e=e||"utf-8",F().platform.encode(o,e)}function Oi(o,e="utf-8"){return e=e||"utf-8",F().platform.decode(o,e)}function vt(o){return F().platform.isTypedArray!=null?F().platform.isTypedArray(o):Dl(o)}function vr(o,e=[],t=!1){if(e==null&&(e=[]),typeof o=="boolean"||typeof o=="number"||typeof o=="string"||Kr(o)||o==null||vt(o)&&t)e.push(o);else if(Array.isArray(o)||vt(o))for(let r=0;r<o.length;++r)vr(o[r],e,t);else{let r=-1;for(let n of Object.keys(o))/^([1-9]+[0-9]*|0)$/.test(n)&&(r=Math.max(r,Number(n)));for(let n=0;n<=r;n++)vr(o[n],e,t)}return e}var Pl=class{constructor(e,t){this.backendTimer=e,this.logger=t,t==null&&(this.logger=new jd)}profileKernel(e,t,r){let n,s=()=>{n=r()},a,i=ns();if(this.backendTimer.timerAvailable())a=this.backendTimer.time(s);else{s();for(let l of n)l.dataSync();a=Promise.resolve({kernelMs:ns()-i})}if(F().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let l=0;l<n.length;l++){let u=n[l];u.data().then(c=>{Xk(c,u.dtype,e)})}return{kernelName:e,outputs:n,inputs:t,timeMs:a.then(l=>l.kernelMs),extraInfo:a.then(l=>l.getExtraProfileInfo!=null?l.getExtraProfileInfo():"")}}logKernelProfile(e){let{kernelName:t,outputs:r,timeMs:n,inputs:s,extraInfo:a}=e;r.forEach(i=>{Promise.all([i.data(),n,a]).then(p=>{this.logger.logKernelProfile(t,i,p[0],p[1],s,p[2])})})}};function Xk(o,e,t){if(e!=="float32")return!1;for(let r=0;r<o.length;r++){let n=o[r];if(isNaN(n)||!isFinite(n))return console.warn(`Found ${n} in the result of '${t}'`),!0}return!1}var jd=class{logKernelProfile(e,t,r,n,s,a){let i=typeof n=="number"?qr(`${n}ms`,9):n.error,p=qr(e,25),l=t.rank,u=t.size,c=qr(t.shape.toString(),14),m="";for(let d in s){let f=s[d];if(f!=null){let g=f.shape||t.shape,h=g.length;m+=`${d}: ${h}D ${h>0?g:""} `}}console.log(`%c${p}	%c${i}	%c${l}D ${c}	%c${u}	%c${m}	%c${a}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}};function px(o,e,t){let r={},n={};for(let p=0;p<e.length;p++)r[e[p].id]=!0;for(let p=0;p<o.length;p++){let l=o[p],u=l.inputs;for(let c in u){let m=u[c],d=!1;for(let f=0;f<e.length;f++)if(r[m.id]){l.outputs.forEach(g=>r[g.id]=!0),d=!0,n[l.id]=!0;break}if(d)break}}let s={};s[t.id]=!0;let a={};for(let p=o.length-1;p>=0;p--){let l=o[p],u=l.inputs;for(let c=0;c<l.outputs.length;c++)if(s[l.outputs[c].id]){for(let m in u)s[u[m].id]=!0,a[l.id]=!0;break}}let i=[];for(let p=0;p<o.length;p++){let l=o[p];if(n[l.id]&&a[l.id]){let u={};for(let m in l.inputs){let d=l.inputs[m];r[d.id]&&(u[m]=d)}let c=Object.assign({},l);c.inputs=u,c.outputs=l.outputs,i.push(c)}}return i}function lx(o,e,t,r){for(let n=e.length-1;n>=0;n--){let s=e[n],a=[];if(s.outputs.forEach(p=>{let l=o[p.id];l!=null?a.push(l):a.push(null)}),s.gradient==null)throw new Error(`Cannot compute gradient: gradient function not found for ${s.kernelName}.`);let i=s.gradient(a);for(let p in s.inputs){if(!(p in i))throw new Error(`Cannot backprop through input ${p}. Available gradients found: ${Object.keys(i)}.`);let l=t(()=>i[p]());if(l.dtype!=="float32")throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input ${p} must have 'float32' dtype, but has '${l.dtype}'`);let u=s.inputs[p];if(!Ut(l.shape,u.shape))throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input '${p}' has shape '${l.shape}', which does not match the shape of the input '${u.shape}'`);if(o[u.id]==null)o[u.id]=l;else{let c=o[u.id];o[u.id]=r(c,l),c.dispose()}}}}var ux=20,$p=3,Xd=7;function cx(o,e,t,r){let n=ko(e),s=Qk(o,e,t,n),a=e.length,i=Vl(o,e,t,n,s),p=["Tensor"];return r&&(p.push(`  dtype: ${t}`),p.push(`  rank: ${a}`),p.push(`  shape: [${e}]`),p.push("  values:")),p.push(i.map(l=>"    "+l).join(`
`)),p.join(`
`)}function Qk(o,e,t,r){let n=ge(e),s=r[r.length-1],a=new Array(s).fill(0),i=e.length,p=t==="complex64"?Fp(o):o;if(i>1)for(let l=0;l<n/s;l++){let u=l*s;for(let c=0;c<s;c++)a[c]=Math.max(a[c],Ap(p[u+c],0,t).length)}return a}function Ap(o,e,t){let r;return Array.isArray(o)?r=`${parseFloat(o[0].toFixed(Xd))} + ${parseFloat(o[1].toFixed(Xd))}j`:Ms(o)?r=`'${o}'`:t==="bool"?r=mx(o):r=parseFloat(o.toFixed(Xd)).toString(),qr(r,e)}function mx(o){return o===0?"false":"true"}function Vl(o,e,t,r,n,s=!0){let a=t==="complex64"?2:1,i=e[0],p=e.length;if(p===0){if(t==="complex64"){let g=Fp(o);return[Ap(g[0],0,t)]}return t==="bool"?[mx(o[0])]:[o[0].toString()]}if(p===1){if(i>ux){let h=$p*a,x=Array.from(o.slice(0,h)),b=Array.from(o.slice((i-$p)*a,i*a));return t==="complex64"&&(x=Fp(x),b=Fp(b)),["["+x.map((w,v)=>Ap(w,n[v],t)).join(", ")+", ..., "+b.map((w,v)=>Ap(w,n[i-$p+v],t)).join(", ")+"]"]}return["["+(t==="complex64"?Fp(o):Array.from(o)).map((h,x)=>Ap(h,n[x],t)).join(", ")+"]"]}let l=e.slice(1),u=r.slice(1),c=r[0]*a,m=[];if(i>ux){for(let g=0;g<$p;g++){let h=g*c,x=h+c;m.push(...Vl(o.slice(h,x),l,t,u,n,!1))}m.push("...");for(let g=i-$p;g<i;g++){let h=g*c,x=h+c;m.push(...Vl(o.slice(h,x),l,t,u,n,g===i-1))}}else for(let g=0;g<i;g++){let h=g*c,x=h+c;m.push(...Vl(o.slice(h,x),l,t,u,n,g===i-1))}let d=p===2?",":"";m[0]="["+(i>0?m[0]+d:"");for(let g=1;g<m.length-1;g++)m[g]=" "+m[g]+d;let f=`,
`;for(let g=2;g<p;g++)f+=`
`;return m[m.length-1]=" "+m[m.length-1]+"]"+(s?"":f),m}function Fp(o){let e=[];for(let t=0;t<o.length;t+=2)e.push([o[t],o[t+1]]);return e}var Se=class{constructor(e,t,r){if(this.dtype=t,this.shape=e.slice(),this.size=ge(e),r!=null){let n=r.length;I(n===this.size,()=>`Length of values '${n}' does not match the size inferred by the shape '${this.size}'.`)}if(t==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=r||_l(t,this.size),this.strides=ko(e)}set(e,...t){t.length===0&&(t=[0]),I(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);let r=this.locToIndex(t);this.values[r]=e}get(...e){e.length===0&&(e=[0]);let t=0;for(let n of e){if(n<0||n>=this.shape[t]){let s=`Requested out of range element at ${e}.   Buffer shape=${this.shape}`;throw new Error(s)}t++}let r=e[e.length-1];for(let n=0;n<e.length-1;++n)r+=this.strides[n]*e[n];return this.values[r]}locToIndex(e){if(this.rank===0)return 0;if(this.rank===1)return e[0];let t=e[e.length-1];for(let r=0;r<e.length-1;++r)t+=this.strides[r]*e[r];return t}indexToLoc(e){if(this.rank===0)return[];if(this.rank===1)return[e];let t=new Array(this.shape.length);for(let r=0;r<t.length-1;++r)t[r]=Math.floor(e/this.strides[r]),e-=t[r]*this.strides[r];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return bo().makeTensor(this.values,this.shape,this.dtype)}},bo=null,Pi=null,Yk=null;function dx(o){bo=o}function fx(o){Pi=o}function hx(o){Yk=o}var Oe=class{constructor(e,t,r,n){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=ge(e),this.strides=ko(e),this.dataId=r,this.id=n,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){let e=await this.data();return Pi.buffer(this.shape,this.dtype,e)}bufferSync(){return Pi.buffer(this.shape,this.dtype,this.dataSync())}async array(){let e=await this.data();return Hr(this.shape,e,this.dtype==="complex64")}arraySync(){return Hr(this.shape,this.dataSync(),this.dtype==="complex64")}async data(){this.throwIfDisposed();let e=bo().read(this.dataId);if(this.dtype==="string"){let t=await e;try{return t.map(r=>Oi(r))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return e}dataToGPU(e){return this.throwIfDisposed(),bo().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();let e=bo().readSync(this.dataId);if(this.dtype==="string")try{return e.map(t=>Oi(t))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e}async bytes(){this.throwIfDisposed();let e=await bo().read(this.dataId);return this.dtype==="string"?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),bo().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(e=!1){return Pi.print(this,e)}clone(){return this.throwIfDisposed(),Pi.clone(this)}toString(e=!1){let t=this.dataSync();return cx(t,this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),Pi.cast(this,e)}variable(e=!0,t,r){return this.throwIfDisposed(),bo().makeVariable(this,e,t,r)}};Object.defineProperty(Oe,Symbol.hasInstance,{value:o=>!!o&&o.data!=null&&o.dataSync!=null&&o.throwIfDisposed!=null});function Qd(){return Sp("Tensor",()=>Oe)}Qd();var Zo=class extends Oe{constructor(e,t,r,n){super(e.shape,e.dtype,e.dataId,n),this.trainable=t,this.name=r}assign(e){if(e.dtype!==this.dtype)throw new Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!Ut(e.shape,this.shape))throw new Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);bo().disposeTensor(this),this.dataId=e.dataId,bo().incRef(this,null)}dispose(){bo().disposeVariable(this),this.isDisposedInternal=!0}};Object.defineProperty(Zo,Symbol.hasInstance,{value:o=>o instanceof Oe&&o.assign!=null&&o.assign instanceof Function});var Yd;(function(o){o.R0="R0",o.R1="R1",o.R2="R2",o.R3="R3",o.R4="R4",o.R5="R5",o.R6="R6"})(Yd||(Yd={}));var Zd;(function(o){o.float32="float32",o.int32="int32",o.bool="int32",o.complex64="complex64"})(Zd||(Zd={}));var Jd;(function(o){o.float32="float32",o.int32="int32",o.bool="bool",o.complex64="complex64"})(Jd||(Jd={}));var ef;(function(o){o.float32="float32",o.int32="float32",o.bool="float32",o.complex64="complex64"})(ef||(ef={}));var tf;(function(o){o.float32="complex64",o.int32="complex64",o.bool="complex64",o.complex64="complex64"})(tf||(tf={}));var Zk={float32:ef,int32:Zd,bool:Jd,complex64:tf};function et(o,e){if(o==="string"||e==="string"){if(o==="string"&&e==="string")return"string";throw new Error(`Can not upcast ${o} with ${e}`)}return Zk[o][e]}function ss(o){return et(o,"int32")}function Ll(o){return o!=null&&typeof o=="object"&&"texture"in o&&o.texture instanceof WebGLTexture}function Ml(o){return typeof GPUBuffer<"u"&&o!=null&&typeof o=="object"&&"buffer"in o&&o.buffer instanceof GPUBuffer}function he(o,e){if(o.dtype===e.dtype)return[o,e];let t=et(o.dtype,e.dtype);return[o.cast(t),e.cast(t)]}function gx(o,e){I(o.dtype===e.dtype,()=>`The dtypes of the first(${o.dtype}) and second(${e.dtype}) input must match`)}function Bl(o){let e=[];return xx(o,e,new Set),e}function xx(o,e,t){if(o==null)return;if(o instanceof Oe){e.push(o);return}if(!Jk(o))return;let r=o;for(let n in r){let s=r[n];t.has(s)||(t.add(s),xx(s,e,t))}}function Jk(o){return Array.isArray(o)||typeof o=="object"}function of(o){return o.kernelName!=null}var zl=class{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(let e in this.registeredVariables)this.registeredVariables[e].dispose()}},Dp=class o{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new zl}async ready(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let r=e[t];if(await this.initializeBackend(r).success){await this.setBackend(r);return}}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(this.pendingBackendInit!=null)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){let{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw new Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry))if(e in this.registryFactory){let{asyncInit:t}=this.initializeBackend(e);if(t)return null}else return null;return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,r=1){return e in this.registryFactory?(Yo(`${e} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[e]={factory:t,priority:r},!0)}async setBackend(e){if(this.registryFactory[e]==null)throw new Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,this.registry[e]==null){this.backendInstance=null;let{success:t,asyncInit:r}=this.initializeBackend(e);if(!(r?await t:t))return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new Pl(this.backendInstance),!0}setupRegisteredKernels(){Wd(this.backendName).forEach(t=>{t.setupFunc!=null&&t.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){Wd(e).forEach(r=>{r.disposeFunc!=null&&r.disposeFunc(this.registry[e])})}initializeBackend(e){let t=this.registryFactory[e];if(t==null)throw new Error(`Cannot initialize backend ${e}, no registration found.`);try{let r=t.factory();if(r&&!(r instanceof jo)&&typeof r.then=="function"){let n=++this.pendingBackendInitId,s=r.then(a=>n<this.pendingBackendInitId?!1:(this.registry[e]=a,this.pendingBackendInit=null,!0)).catch(a=>(n<this.pendingBackendInitId||(this.pendingBackendInit=null,Yo(`Initialization of backend ${e} failed`),Yo(a.stack||a.message)),!1));return this.pendingBackendInit=s,{success:s,asyncInit:!0}}else return this.registry[e]=r,{success:!0,asyncInit:!1}}catch(r){return Yo(`Initialization of backend ${e} failed`),Yo(r.stack||r.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw new Error(`${e} backend not found in registry`);this.backendName===e&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let r=e[t],{success:n,asyncInit:s}=this.initializeBackend(r);if(s||n)return{name:r,asyncInit:s}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(e,t){let r=this.state.tensorInfo.get(t),n=r.backend,s=this.readSync(t),a=n.refCount(t);n.disposeData(t,!0),r.backend=e,e.move(t,s,r.shape,r.dtype,a),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let r=null;if(t==null){if(typeof e!="function")throw new Error("Please provide a function to tidy()");t=e}else{if(typeof e!="string"&&!(e instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof t!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");r=e}let n;return this.scopedRun(()=>this.startScope(r),()=>this.endScope(n),()=>(n=t(),n instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n))}scopedRun(e,t,r){e();try{let n=r();return t(),n}catch(n){throw t(),n}}nextTensorId(){return o.nextTensorId++}nextVariableId(){return o.nextVariableId++}clone(e){let t=S.runKernel(yr,{x:e}),r={x:e},n=a=>({x:()=>{let i="float32",p={x:a},l={dtype:i};return S.runKernel(xr,p,l)}}),s=[];return this.addTapeNode(this.state.activeScope.name,r,[t],n,s,{}),t}runKernel(e,t,r){if(this.backendName==null&&this.backend,!($i(e,this.backendName)!=null))throw new Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:t,attrs:r})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(e,t,r){let n=this.backend.numDataIds(),s=0;r.forEach(p=>{s+=p.dtype==="complex64"?3:1});let a=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],i=n-t-s-a;if(i>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${i} data ids) after running '${e}'`)}runKernelFunc(e){let t,r=[],n=this.isTapeOn(),s=this.state.numBytes,a=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let i;this.backendName==null&&this.backend;let p,l=of(e)?e.kernelName:this.state.activeScope!=null?this.state.activeScope.name:"";if(of(e)){let{kernelName:f,inputs:g,attrs:h}=e;this.backendName==null&&this.backend;let x=$i(f,this.backendName);I(x!=null,()=>`Cannot find registered kernel '${f}' for backend '${this.backendName}'`),i=()=>{let b=this.backend.numDataIds();p=x.kernelFunc({inputs:g,attrs:h,backend:this.backend});let w=Array.isArray(p)?p:[p];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(f,b,w);let v=w.map(k=>k.rank!=null?k:this.makeTensorFromTensorInfo(k));if(n){let k=this.getTensorsForGradient(f,g,v);r=this.saveTensorsForBackwardMode(k)}return v}}else{let{forwardFunc:f}=e,g=h=>{n&&(r=h.map(x=>this.keep(this.clone(x))))};i=()=>{let h=this.backend.numDataIds();p=this.tidy(()=>f(this.backend,g));let x=Array.isArray(p)?p:[p];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(l,h,x),x}}let{inputs:u,attrs:c}=e,m=of(e)?null:e.backwardsFunc,d;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool("DEBUG")&&!this.state.profiling?t=i():(d=this.profiler.profileKernel(l,u,()=>i()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(d),t=d.outputs)}),n&&this.addTapeNode(l,u,t,m,r,c),this.state.profiling&&this.state.activeProfile.kernels.push({name:l,bytesAdded:this.state.numBytes-s,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-a,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(u).map(f=>u[f]!=null?u[f].shape:null),outputShapes:t.map(f=>f.shape),kernelTimeMs:d.timeMs,extraInfo:d.extraInfo}),Array.isArray(p)?t:t[0]}saveTensorsForBackwardMode(e){return e.map(r=>this.keep(this.clone(r)))}getTensorsForGradient(e,t,r){let n=Ud(e);if(n!=null){let s=n.inputsToSave||[],a=n.outputsToSave||[],i;n.saveAllInputs?(I(Array.isArray(t),()=>"saveAllInputs is true, expected inputs to be an array."),i=Object.keys(t).map(l=>t[l])):i=s.map(l=>t[l]);let p=r.filter((l,u)=>a[u]);return i.concat(p)}return[]}makeTensor(e,t,r,n){if(e==null)throw new Error("Values passed to engine.makeTensor() are null");r=r||"float32",n=n||this.backend;let s=e;r==="string"&&Ms(e[0])&&(s=e.map(p=>Ri(p)));let a=n.write(s,t,r),i=new Oe(t,r,a,this.nextTensorId());if(this.trackTensor(i,n),r==="string"){let p=this.state.tensorInfo.get(a),l=Pd(s);this.state.numBytes+=l-p.bytes,p.bytes=l}return i}makeTensorFromDataId(e,t,r,n){r=r||"float32";let s={dataId:e,shape:t,dtype:r};return this.makeTensorFromTensorInfo(s,n)}makeTensorFromTensorInfo(e,t){let{dataId:r,shape:n,dtype:s}=e,a=new Oe(n,s,r,this.nextTensorId());return this.trackTensor(a,t),a}makeVariable(e,t=!0,r,n){r=r||this.nextVariableId().toString(),n!=null&&n!==e.dtype&&(e=e.cast(n));let s=new Zo(e,t,r,this.nextTensorId());if(this.state.registeredVariables[s.name]!=null)throw new Error(`Variable with name ${s.name} was already registered`);return this.state.registeredVariables[s.name]=s,this.incRef(s,this.backend),s}trackTensor(e,t){this.state.numTensors++,e.dtype==="string"&&this.state.numStringTensors++;let r=0;e.dtype!=="complex64"&&e.dtype!=="string"&&(r=e.size*Ls(e.dtype)),this.state.numBytes+=r,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:r})),e instanceof Zo||this.track(e)}incRef(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)}removeDataId(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;let t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,e.dtype==="string"&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),e.dtype!=="complex64"&&e.dtype!=="string"){let r=e.size*Ls(e.dtype);this.state.numBytes-=r}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}disposeVariables(){for(let e in this.state.registeredVariables){let t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),this.state.registeredVariables[e.name]!=null&&delete this.state.registeredVariables[e.name]}memory(){let e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,e.reasons==null&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e}async profile(e){this.state.profiling=!0;let t=this.state.numBytes,r=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(n=>n.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-r;for(let n of this.state.activeProfile.kernels)n.kernelTimeMs=await n.kernelTimeMs,n.extraInfo=await n.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(e,t,r,n,s,a){let i={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:r,saved:s},p=Ud(e);p!=null&&(n=p.gradFunc),n!=null&&(i.gradient=l=>(l=l.map((u,c)=>{if(u==null){let m=r[c],d=Us(m.size,m.dtype);return this.makeTensor(d,m.shape,m.dtype)}return u}),n(l.length>1?l:l[0],s,a))),this.state.activeTape.push(i)}keep(e){return e.kept=!0,e}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){let t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){let t=Bl(e),r=new Set(t.map(s=>s.id));for(let s=0;s<this.state.activeScope.track.length;s++){let a=this.state.activeScope.track[s];!a.kept&&!r.has(a.id)&&a.dispose()}let n=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(s=>{!s.kept&&s.scopeId===n.id&&this.track(s)})}gradients(e,t,r,n=!1){if(I(t.length>0,()=>"gradients() received an empty list of xs."),r!=null&&r.dtype!=="float32")throw new Error(`dy must have 'float32' dtype, but has '${r.dtype}'`);let s=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",e));I(s instanceof Oe,()=>"The result y returned by f() must be a tensor.");let a=px(this.state.activeTape,t,s);if(!n&&a.length===0&&t.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{let i={};i[s.id]=r??eE(s.shape),lx(i,a,l=>this.tidy(l),tE);let p=t.map(l=>i[l.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(l=>{for(let u of l.saved)u.dispose()}),this.state.activeTape=null),{value:s,grads:p}})}customGrad(e){return I(Bs(e),()=>"The f passed in customGrad(f) must be a function."),(...t)=>{I(t.every(i=>i instanceof Oe),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let r,n={};t.forEach((i,p)=>{n[p]=i});let s=(i,p)=>(r=e(...t,p),I(r.value instanceof Oe,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),I(Bs(r.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),r.value),a=(i,p)=>{let l=r.gradFunc(i,p),u=Array.isArray(l)?l:[l];I(u.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),I(u.every(m=>m instanceof Oe),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");let c={};return u.forEach((m,d)=>{c[d]=()=>m}),c};return this.runKernelFunc({forwardFunc:s,backwardsFunc:a,inputs:n})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}readToGPU(e,t){return this.state.tensorInfo.get(e).backend.readToGPU(e,t)}async time(e){let t=ns(),r=await this.backend.time(e);return r.wallMs=ns()-t,r}track(e){return this.state.activeScope!=null&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new zl;for(let e in this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}};Dp.nextTensorId=0;Dp.nextVariableId=0;function eE(o){let e=Cp(ge(o),"float32");return S.makeTensor(e,o,"float32")}function rf(){let o=Md();if(o._tfengine==null){let e=new Np(o);o._tfengine=new Dp(e)}return Hg(o._tfengine.ENV),dx(()=>o._tfengine),o._tfengine}var S=rf();function tE(o,e){let t={a:o,b:e};return S.runKernel(Qo,t)}var wr={};Fe(wr,{isBrowser:()=>sf,isMobile:()=>nE,mockIsMobile:()=>rE});function oE(){return typeof navigator<"u"&&navigator!=null}var nf;function rE(o){nf=o}function nE(o){if(nf!==void 0)return nf;if(o||oE()){if(o||(o=navigator),o.product==="ReactNative")return!0;let e=o.userAgent||o.vendor||(typeof window<"u"?window.opera:"");if(!e){let t=o;return t.userAgentData&&t.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))}return!1}function sf(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}var Et=F();Et.registerFlag("DEBUG",()=>!1,o=>{o&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")});Et.registerFlag("IS_BROWSER",()=>sf());Et.registerFlag("IS_NODE",()=>typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u");Et.registerFlag("IS_CHROME",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor));Et.registerFlag("IS_SAFARI",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor));Et.registerFlag("PROD",()=>!1);Et.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>Et.getBool("DEBUG"));Et.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0);Et.registerFlag("IS_TEST",()=>!1);Et.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>Et.getBool("DEBUG"));Et.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1);Et.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1);Et.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);function $t(o,e){let t=o;if(vt(o))return e==="string"?[]:[o.length];if(Ll(o)){let n=o.channels||"RGBA";return[o.height,o.width*n.length]}else if(Ml(o))return[o.buffer.size/(e==null?4:Ls(e))];if(!Array.isArray(o))return[];let r=[];for(;Array.isArray(t)||vt(t)&&e!=="string";)r.push(t.length),t=t[0];return Array.isArray(o)&&F().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&bx(o,r,[]),r}function bx(o,e,t){if(t=t||[],!Array.isArray(o)&&!vt(o)){I(e.length===0,()=>`Element arr[${t.join("][")}] is a primitive, but should be an array/TypedArray of ${e[0]} elements`);return}I(e.length>0,()=>`Element arr[${t.join("][")}] should be a primitive, but is an array of ${o.length} elements`),I(o.length===e[0],()=>`Element arr[${t.join("][")}] should have ${e[0]} elements, but has ${o.length} elements`);let r=e.slice(1);for(let n=0;n<o.length;++n)bx(o[n],r,t.concat(n))}function yx(o,e,t,r){if(o!=="string_or_numeric"){if(o==null)throw new Error("Expected dtype cannot be null.");if(o!=="numeric"&&o!==e||o==="numeric"&&e==="string")throw new Error(`Argument '${t}' passed to '${r}' must be ${o} tensor, but got ${e} tensor`)}}function T(o,e,t,r="numeric"){if(o instanceof Qd())return yx(r,o.dtype,e,t),o;let n=gr(o);if(n!=="string"&&["bool","int32","float32"].indexOf(r)>=0&&(n=r),yx(r,n,e,t),o==null||!vt(o)&&!Array.isArray(o)&&typeof o!="number"&&typeof o!="boolean"&&typeof o!="string"){let p=o==null?"null":o.constructor.name;throw new Error(`Argument '${e}' passed to '${t}' must be a Tensor or TensorLike, but got '${p}'`)}let s=$t(o,n);!vt(o)&&!Array.isArray(o)&&(o=[o]);let i=n!=="string"?Di(o,n):vr(o,[],!0);return S.makeTensor(i,s,n)}function as(o,e,t,r="numeric"){if(!Array.isArray(o))throw new Error(`Argument ${e} passed to ${t} must be a \`Tensor[]\` or \`TensorLike[]\``);return o.map((s,a)=>T(s,`${e}[${a}]`,t,r))}var af="__op";function C(o){let e=Object.keys(o);if(e.length!==1)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${e.length} keys.`);let t=e[0],r=o[t];t.endsWith("_")&&(t=t.substring(0,t.length-1)),t=t+af;let n=(...s)=>{S.startScope(t);try{let a=r(...s);return Kr(a)&&console.error("Cannot return a Promise inside of tidy."),S.endScope(a),a}catch(a){throw S.endScope(null),a}};return Object.defineProperty(n,"name",{value:t,configurable:!0}),n}function sE(o,e){let t=T(o,"real","complex"),r=T(e,"imag","complex");Ke(t.shape,r.shape,`real and imag shapes, ${t.shape} and ${r.shape}, must match in call to tf.complex().`);let n={real:t,imag:r};return S.runKernel(ta,n)}var At=C({complex_:sE});function Nt(o,e,t,r){if(r==null)r=gr(o);else if(r==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(Ml(o)||Ll(o)){if(r!=="float32"&&r!=="int32")throw new Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${r}.`);return S.backend.createTensorFromGPUData(o,e||t,r)}if(!vt(o)&&!Array.isArray(o)&&typeof o!="number"&&typeof o!="boolean"&&typeof o!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(e!=null){Be(e);let n=ge(e),s=ge(t);I(n===s,()=>`Based on the provided shape, [${e}], the tensor should have ${n} values but has ${s}`);for(let a=0;a<t.length;++a){let i=t[a],p=a===t.length-1?i!==ge(e.slice(a)):!0;I(t[a]===e[a]||!p,()=>`Error creating a new Tensor. Inferred shape (${t}) does not match the provided shape (${e}). `)}}return!vt(o)&&!Array.isArray(o)&&(o=[o]),e=e||t,o=r!=="string"?Di(o,r):vr(o,[],!0),S.makeTensor(o,e,r)}function St(o,e,t){let r=$t(o,t);return Nt(o,e,r,t)}var Jo={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8};var gt=class o{static join(e){return new o(e).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,e==null||(e instanceof Array||(e=[e]),e=e.map(r=>vt(r)?r.buffer:r),e.length===0))return;this.bufferUniformSize=e[0].byteLength;let t=0;for(let r=0;r<e.length;r++){let n=e[r];r!==e.length-1&&n.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);let s=t+n.byteLength;this.shards.push({buffer:n,start:t,end:s}),t=s}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,t=this.byteLength){if(this.shards.length===0)return new ArrayBuffer(0);if(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),t=Math.min(this.byteLength,t),t<=e)return new ArrayBuffer(0);let r=this.findShardForByte(e);if(r===-1)throw new Error(`Could not find start shard for byte ${e}`);let n=t-e,s=new ArrayBuffer(n),a=new Uint8Array(s),i=0;for(let p=r;p<this.shards.length;p++){let l=this.shards[p],c=e+i-l.start,m=i,f=Math.min(t,l.end)-l.start,g=new Uint8Array(l.buffer,c,f-c);if(a.set(g,m),i+=g.length,t<l.end)break}return s}findShardForByte(e){if(this.shards.length===0||e<0||e>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function t(n){return e<n.start?-1:e>=n.end?1:0}if(t(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;let r=aE(this.shards,t);return r===-1?-1:(this.previousShardIndex=r,this.previousShardIndex)}};function aE(o,e){let t=0,r=o.length;for(;t<=r;){let n=Math.floor((r-t)/2)+t,s=e(o[n]);if(s===0)return n;s<0?r=n:t=n+1}return-1}function iE(o){F().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(o+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}hx(iE);function po(){return S}function fe(o,e){return S.tidy(o,e)}function Ye(o){Bl(o).forEach(t=>t.dispose())}function Ft(o){return S.keep(o)}function pf(o){return S.setBackend(o)}function _x(){return S.ready()}function Ul(){return S.backendName}function Wl(o,e,t=1){return S.registerBackend(o,e,t)}function Tx(){return S.backend}var Cr=4;async function Cx(o,e){let t=[],r=[],n=Array.isArray(o)?o.map(a=>a.name):Object.keys(o);for(let a=0;a<n.length;++a){let i=n[a],p=Array.isArray(o)?o[a].tensor:o[i];if(p.dtype!=="float32"&&p.dtype!=="int32"&&p.dtype!=="bool"&&p.dtype!=="string"&&p.dtype!=="complex64")throw new Error(`Unsupported dtype in weight '${i}': ${p.dtype}`);let l={name:i,shape:p.shape,dtype:p.dtype};if(p.dtype==="string"){let u=new Promise(async c=>{let m=await p.bytes(),d=m.reduce((h,x)=>h+x.length,0)+Cr*m.length,f=new Uint8Array(d),g=0;for(let h=0;h<m.length;h++){let x=m[h],b=new Uint8Array(new Uint32Array([x.length]).buffer);f.set(b,g),g+=Cr,f.set(x,g),g+=x.length}c(f)});r.push(u)}else r.push(p.data());e!=null&&(l.group=e),t.push(l)}let s=await Promise.all(r);return{data:uE(s),specs:t}}function Gl(o,e){let t=new gt(o),r={},n=0;for(let s of e){let a=pE(s,(i,p)=>t.slice(n+i,n+p));r[s.name]=Nx(s,t.slice(n,n+a)),n+=a}return r}function pE(o,e){let t=ge(o.shape),r;if("quantization"in o){let n=o.quantization;r=Jo[n.dtype]}else if(o.dtype==="string"){let n=0;for(let s=0;s<t;s++)n+=Cr+new Uint32Array(e(n,n+Cr))[0];return n}else r=Jo[o.dtype];return t*r}async function lE(o,e){let t=ge(o.shape),r;if("quantization"in o){let n=o.quantization;r=Jo[n.dtype]}else if(o.dtype==="string"){let n=0;for(let s=0;s<t;s++)n+=Cr+new Uint32Array(await e(n,n+Cr))[0];return n}else r=Jo[o.dtype];return t*r}function Nx(o,e){let t=o.name,r=o.dtype,n=o.shape,s=ge(n),a,i=0;if("quantization"in o){let p=o.quantization;if(p.dtype==="uint8"||p.dtype==="uint16"){if(!("min"in p&&"scale"in p))throw new Error(`Weight ${o.name} with quantization ${p.dtype} doesn't have corresponding metadata min and scale.`)}else if(p.dtype==="float16"){if(r!=="float32")throw new Error(`Weight ${o.name} is quantized with ${p.dtype} which only supports weights of type float32 not ${r}.`)}else throw new Error(`Weight ${o.name} has unknown quantization dtype ${p.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);let l=Jo[p.dtype],u=p.dtype==="uint8"?new Uint8Array(e):new Uint16Array(e);if(r==="float32")if(p.dtype==="uint8"||p.dtype==="uint16"){a=new Float32Array(u.length);for(let c=0;c<u.length;c++){let m=u[c];a[c]=m*p.scale+p.min}}else if(p.dtype==="float16")a=fE()(u);else throw new Error(`Unsupported quantization type ${p.dtype} for weight type float32.`);else if(r==="int32"){if(p.dtype!=="uint8"&&p.dtype!=="uint16")throw new Error(`Unsupported quantization type ${p.dtype} for weight type int32.`);a=new Int32Array(u.length);for(let c=0;c<u.length;c++){let m=u[c];a[c]=Math.round(m*p.scale+p.min)}}else throw new Error(`Unsupported dtype in weight '${t}': ${r}`);i+=s*l}else if(r==="string"){let p=ge(o.shape);a=[];for(let l=0;l<p;l++){let u=new Uint32Array(e.slice(i,i+Cr))[0];i+=Cr;let c=new Uint8Array(e.slice(i,i+u));a.push(c),i+=u}}else{let p=Jo[r];if(r==="float32")a=new Float32Array(e);else if(r==="int32")a=new Int32Array(e);else if(r==="bool")a=new Uint8Array(e);else if(r==="complex64"){a=new Float32Array(e);let l=new Float32Array(a.length/2),u=new Float32Array(a.length/2);for(let f=0;f<l.length;f++)l[f]=a[f*2],u[f]=a[f*2+1];let c=St(l,n,"float32"),m=St(u,n,"float32"),d=At(c,m);return c.dispose(),m.dispose(),d}else throw new Error(`Unsupported dtype in weight '${t}': ${r}`);i+=s*p}return St(a,n,r)}async function vx(o,e,t){let r=new Uint8Array(e);for(;r.byteLength<t;){let{done:n,value:s}=await o.read();if(n&&s==null){let i=t-r.byteLength;throw new Error(`Reader is done but ${i} bytes are still expected`)}let a=new Uint8Array(r.length+s.byteLength);a.set(r,0),a.set(new Uint8Array(s),r.length),r=a}return r.buffer}async function Hl(o,e){let t={},r=o.getReader(),n=new ArrayBuffer(0);for(let s of e){let a=await lE(s,async(l,u)=>(n=await vx(r,n,u),n.slice(l,u)));n=await vx(r,n,a);let i=n.slice(0,a);n=n.slice(a);let p=Nx(s,i);if(t[s.name]=p,Ul()==="webgpu"){let l=Tx();"uploadToGPU"in l&&ge(p.shape)>=F().get("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD")&&l.uploadToGPU(p.dataId)}}return t}function uE(o){if(o===null)throw new Error(`Invalid input value: ${JSON.stringify(o)}`);let e=0,t=[];o.forEach(s=>{if(e+=s.byteLength,t.push(s.byteLength===s.buffer.byteLength?s:new s.constructor(s)),!(s instanceof Float32Array||s instanceof Int32Array||s instanceof Uint8Array))throw new Error(`Unsupported TypedArray subtype: ${s.constructor.name}`)});let r=new Uint8Array(e),n=0;return t.forEach(s=>{r.set(new Uint8Array(s.buffer),n),n+=s.byteLength}),r.buffer}var lf=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function wx(o){return lf?Buffer.byteLength(o,"utf8"):new Blob([o]).size}function Sx(o){if(lf)return Buffer.from(o).toString("base64");let e=new Uint8Array(o),t="";for(let r=0,n=e.length;r<n;r++)t+=String.fromCharCode(e[r]);return btoa(t)}function Ix(o){if(lf){let r=Buffer.from(o,"base64");return r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength)}let e=atob(o),t=new Uint8Array(e.length);for(let r=0;r<e.length;++r)t.set([e.charCodeAt(r)],r);return t.buffer}function kx(o){return gt.join(o)}function uf(o){let e="/";for(o=o.trim();o.endsWith(e);)o=o.slice(0,o.length-1);let t=o.split(e);return t[t.length-1]}function ql(o,e){let t={modelTopology:o.modelTopology,format:o.format,generatedBy:o.generatedBy,convertedBy:o.convertedBy,weightsManifest:e};return o.signature!=null&&(t.signature=o.signature),o.userDefinedMetadata!=null&&(t.userDefinedMetadata=o.userDefinedMetadata),o.modelInitializer!=null&&(t.modelInitializer=o.modelInitializer),o.initializerSignature!=null&&(t.initializerSignature=o.initializerSignature),o.trainingConfig!=null&&(t.trainingConfig=o.trainingConfig),t}function cf(o,e,t){let r={modelTopology:o.modelTopology,format:o.format,generatedBy:o.generatedBy,convertedBy:o.convertedBy};if(o.trainingConfig!=null&&(r.trainingConfig=o.trainingConfig),o.weightsManifest!=null){if(!e)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!t)throw new Error("modelJSON has weightsManifest but weightData is null");r.weightSpecs=e,r.weightData=t}return o.signature!=null&&(r.signature=o.signature),o.userDefinedMetadata!=null&&(r.userDefinedMetadata=o.userDefinedMetadata),o.modelInitializer!=null&&(r.modelInitializer=o.modelInitializer),o.initializerSignature!=null&&(r.initializerSignature=o.initializerSignature),r}async function Vi(o,e){let t,r;return o.weightsManifest!=null&&([t,r]=await e(o.weightsManifest)),cf(o,t,r)}function Eo(o){if(o.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:o.modelTopology==null?0:wx(JSON.stringify(o.modelTopology)),weightSpecsBytes:o.weightSpecs==null?0:wx(JSON.stringify(o.weightSpecs)),weightDataBytes:o.weightData==null?0:new gt(o.weightData).byteLength}}function Rp(o){let e=[];for(let t of o)e.push(...t.weights);return e}function cE(){let o=t=>{let r=t<<13,n=0;for(;!(r&8388608);)n-=8388608,r<<=1;return r&=-8388609,n+=947912704,r|n},e=new Uint32Array(2048);e[0]=0;for(let t=1;t<1024;t++)e[t]=o(t);for(let t=1024;t<2048;t++)e[t]=939524096+(t-1024<<13);return e}function mE(){let o=new Uint32Array(64);o[0]=0,o[31]=1199570944,o[32]=2147483648,o[63]=3347054592;for(let e=1;e<31;e++)o[e]=e<<23;for(let e=33;e<63;e++)o[e]=2147483648+(e-32<<23);return o}function dE(){let o=new Uint32Array(64);for(let e=0;e<64;e++)o[e]=1024;return o[0]=o[32]=0,o}function fE(){let o=cE(),e=mE(),t=dE();return r=>{let n=new ArrayBuffer(4*r.length),s=new Uint32Array(n);for(let a=0;a<r.length;a++){let i=r[a],p=o[t[i>>10]+(i&1023)]+e[i>>10];s[a]=p}return new Float32Array(n)}}var at=class o{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return o.instance==null&&(o.instance=new o),o.instance}static registerSaveRouter(e){o.getInstance().saveRouters.push(e)}static registerLoadRouter(e){o.getInstance().loadRouters.push(e)}static getSaveHandlers(e){return o.getHandlers(e,"save")}static getLoadHandlers(e,t){return o.getHandlers(e,"load",t)}static getHandlers(e,t,r){let n=[];return(t==="load"?o.getInstance().loadRouters:o.getInstance().saveRouters).forEach(a=>{let i=a(e,r);i!==null&&n.push(i)}),n}},Ex=o=>at.registerSaveRouter(o),$x=o=>at.registerLoadRouter(o),Ax=o=>at.getSaveHandlers(o),Fx=(o,e)=>at.getLoadHandlers(o,e);var mf="tensorflowjs",df=1,is="models_store",Nr="model_info_store";function Dx(){if(!F().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");let o=typeof window>"u"?self:window,e=o.indexedDB||o.mozIndexedDB||o.webkitIndexedDB||o.msIndexedDB||o.shimIndexedDB;if(e==null)throw new Error("The current browser does not appear to support IndexedDB.");return e}function ff(o){let e=o.result;e.createObjectStore(is,{keyPath:"modelPath"}),e.createObjectStore(Nr,{keyPath:"modelPath"})}var $o=class{constructor(e){if(this.indexedDB=Dx(),e==null||!e)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,t){return new Promise((r,n)=>{let s=this.indexedDB.open(mf,df);s.onupgradeneeded=()=>ff(s),s.onsuccess=()=>{let a=s.result;if(t==null){let i=a.transaction(is,"readonly"),l=i.objectStore(is).get(this.modelPath);l.onsuccess=()=>{if(l.result==null)return a.close(),n(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));r(l.result.modelArtifacts)},l.onerror=u=>(a.close(),n(l.error)),i.oncomplete=()=>a.close()}else{t.weightData=gt.join(t.weightData);let i=Eo(t),p=a.transaction(Nr,"readwrite"),l=p.objectStore(Nr),u;try{u=l.put({modelPath:this.modelPath,modelArtifactsInfo:i})}catch(m){return n(m)}let c;u.onsuccess=()=>{c=a.transaction(is,"readwrite");let m=c.objectStore(is),d;try{d=m.put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:i})}catch(f){return n(f)}d.onsuccess=()=>r({modelArtifactsInfo:i}),d.onerror=f=>{l=p.objectStore(Nr);let g=l.delete(this.modelPath);g.onsuccess=()=>(a.close(),n(d.error)),g.onerror=h=>(a.close(),n(d.error))}},u.onerror=m=>(a.close(),n(u.error)),p.oncomplete=()=>{c==null?a.close():c.oncomplete=()=>a.close()}}},s.onerror=a=>n(s.error)})}};$o.URL_SCHEME="indexeddb://";var Rx=o=>F().getBool("IS_BROWSER")&&!Array.isArray(o)&&o.startsWith($o.URL_SCHEME)?hE(o.slice($o.URL_SCHEME.length)):null;at.registerSaveRouter(Rx);at.registerLoadRouter(Rx);function hE(o){return new $o(o)}function gE(o){return o.startsWith($o.URL_SCHEME)?o.slice($o.URL_SCHEME.length):o}var Kl=class{constructor(){this.indexedDB=Dx()}async listModels(){return new Promise((e,t)=>{let r=this.indexedDB.open(mf,df);r.onupgradeneeded=()=>ff(r),r.onsuccess=()=>{let n=r.result,s=n.transaction(Nr,"readonly"),i=s.objectStore(Nr).getAll();i.onsuccess=()=>{let p={};for(let l of i.result)p[l.modelPath]=l.modelArtifactsInfo;e(p)},i.onerror=p=>(n.close(),t(i.error)),s.oncomplete=()=>n.close()},r.onerror=n=>t(r.error)})}async removeModel(e){return e=gE(e),new Promise((t,r)=>{let n=this.indexedDB.open(mf,df);n.onupgradeneeded=()=>ff(n),n.onsuccess=()=>{let s=n.result,a=s.transaction(Nr,"readwrite"),i=a.objectStore(Nr),p=i.get(e),l;p.onsuccess=()=>{if(p.result==null)return s.close(),r(new Error(`Cannot find model with path '${e}' in IndexedDB.`));{let u=i.delete(e),c=()=>{l=s.transaction(is,"readwrite");let d=l.objectStore(is).delete(e);d.onsuccess=()=>t(p.result.modelArtifactsInfo),d.onerror=f=>r(p.error)};u.onsuccess=c,u.onerror=m=>(c(),s.close(),r(p.error))}},p.onerror=u=>(s.close(),r(p.error)),a.oncomplete=()=>{l==null?s.close():l.oncomplete=()=>s.close()}},n.onerror=s=>r(n.error)})}};var er="/",Li="tensorflowjs_models",Ox="info",xE="model_topology",yE="weight_specs",bE="weight_data",_E="model_metadata";function Px(o){return{info:[Li,o,Ox].join(er),topology:[Li,o,xE].join(er),weightSpecs:[Li,o,yE].join(er),weightData:[Li,o,bE].join(er),modelMetadata:[Li,o,_E].join(er)}}function Vx(o){for(let e of Object.values(o))window.localStorage.removeItem(e)}function TE(o){let e=o.split(er);if(e.length<3)throw new Error(`Invalid key format: ${o}`);return e.slice(1,e.length-1).join(er)}function vE(o){return o.startsWith(Ao.URL_SCHEME)?o.slice(Ao.URL_SCHEME.length):o}var Ao=class{constructor(e){if(!F().getBool("IS_BROWSER")||typeof window>"u"||typeof window.localStorage>"u")throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,e==null||!e)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=Px(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{let t=JSON.stringify(e.modelTopology),r=JSON.stringify(e.weightSpecs),n=Eo(e),s=gt.join(e.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(n)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,r),this.LS.setItem(this.keys.weightData,Sx(s));let a={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:e.signature!=null?e.signature:void 0,userDefinedMetadata:e.userDefinedMetadata!=null?e.userDefinedMetadata:void 0,modelInitializer:e.modelInitializer!=null?e.modelInitializer:void 0,initializerSignature:e.initializerSignature!=null?e.initializerSignature:void 0,trainingConfig:e.trainingConfig!=null?e.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(a)),{modelArtifactsInfo:n}}catch{throw Vx(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${n.modelTopologyBytes}, weightSpecsBytes=${n.weightSpecsBytes}, weightDataBytes=${n.weightDataBytes}.`)}}}async load(){let e=JSON.parse(this.LS.getItem(this.keys.info));if(e==null)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if(e.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");let t={},r=JSON.parse(this.LS.getItem(this.keys.topology));if(r==null)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);t.modelTopology=r;let n=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(n==null)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);t.weightSpecs=n;let s=this.LS.getItem(this.keys.modelMetadata);if(s!=null){let i=JSON.parse(s);t.format=i.format,t.generatedBy=i.generatedBy,t.convertedBy=i.convertedBy,i.signature!=null&&(t.signature=i.signature),i.userDefinedMetadata!=null&&(t.userDefinedMetadata=i.userDefinedMetadata),i.modelInitializer!=null&&(t.modelInitializer=i.modelInitializer),i.initializerSignature!=null&&(t.initializerSignature=i.initializerSignature),i.trainingConfig!=null&&(t.trainingConfig=i.trainingConfig)}let a=this.LS.getItem(this.keys.weightData);if(a==null)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return t.weightData=Ix(a),t}};Ao.URL_SCHEME="localstorage://";var Lx=o=>F().getBool("IS_BROWSER")&&!Array.isArray(o)&&o.startsWith(Ao.URL_SCHEME)?wE(o.slice(Ao.URL_SCHEME.length)):null;at.registerSaveRouter(Lx);at.registerLoadRouter(Lx);function wE(o){return new Ao(o)}var jl=class{constructor(){I(F().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),I(typeof window>"u"||typeof window.localStorage<"u",()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){let e={},t=Li+er,r=er+Ox;for(let n=0;n<this.LS.length;++n){let s=this.LS.key(n);if(s.startsWith(t)&&s.endsWith(r)){let a=TE(s);e[a]=JSON.parse(this.LS.getItem(s))}}return e}async removeModel(e){e=vE(e);let t=Px(e);if(this.LS.getItem(t.info)==null)throw new Error(`Cannot find model at path '${e}'`);let r=JSON.parse(this.LS.getItem(t.info));return Vx(t),r}};var Mi="://",_o=class o{constructor(){this.managers={}}static getInstance(){return o.instance==null&&(o.instance=new o),o.instance}static registerManager(e,t){I(e!=null,()=>"scheme must not be undefined or null."),e.endsWith(Mi)&&(e=e.slice(0,e.indexOf(Mi))),I(e.length>0,()=>"scheme must not be an empty string.");let r=o.getInstance();I(r.managers[e]==null,()=>`A model store manager is already registered for scheme '${e}'.`),r.managers[e]=t}static getManager(e){let t=o.getInstance().managers[e];if(t==null)throw new Error(`Cannot find model manager for scheme '${e}'`);return t}static getSchemes(){return Object.keys(o.getInstance().managers)}};function Xl(o){if(o.indexOf(Mi)===-1)throw new Error(`The url string provided does not contain a scheme. Supported schemes are: ${_o.getSchemes().join(",")}`);return{scheme:o.split(Mi)[0],path:o.split(Mi)[1]}}async function Mx(o,e,t=!1){I(o!==e,()=>`Old path and new path are the same: '${o}'`);let r=at.getLoadHandlers(o);I(r.length>0,()=>`Copying failed because no load handler is found for source URL ${o}.`),I(r.length<2,()=>`Copying failed because more than one (${r.length}) load handlers for source URL ${o}.`);let n=r[0],s=at.getSaveHandlers(e);I(s.length>0,()=>`Copying failed because no save handler is found for destination URL ${e}.`),I(s.length<2,()=>`Copying failed because more than one (${r.length}) save handlers for destination URL ${e}.`);let a=s[0],i=Xl(o).scheme,p=Xl(o).path,l=i===Xl(o).scheme,u=await n.load();t&&l&&await _o.getManager(i).removeModel(p);let c=await a.save(u);return t&&!l&&await _o.getManager(i).removeModel(p),c.modelArtifactsInfo}async function Bx(){let o=_o.getSchemes(),e={};for(let t of o){let r=await _o.getManager(t).listModels();for(let n in r){let s=t+Mi+n;e[s]=r[n]}}return e}async function zx(o){let e=Xl(o);return _o.getManager(e.scheme).removeModel(e.path)}async function Ux(o,e){return Mx(o,e,!1)}async function Wx(o,e){return Mx(o,e,!0)}var hf=class{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if(t!=="utf-8"&&t!=="utf8")throw new Error(`Browser's encoder only supports utf-8, but got ${t}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}setTimeoutCustom(e,t){if(typeof window>"u"||!F().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(e,t);return}this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",r=>{if(r.source===window&&r.data.name===this.messageName){r.stopPropagation();let n=this.functionRefs[r.data.index];n(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(e){return Dl(e)}};if(F().get("IS_BROWSER")){F().setPlatform("browser",new hf);try{_o.registerManager(Ao.URL_SCHEME,new jl)}catch{}try{_o.registerManager($o.URL_SCHEME,new Kl)}catch{}}var CE={importFetch:()=>Gx()},gf;var xf=class{constructor(){this.util=Hx(),this.textEncoder=new this.util.TextEncoder}fetch(e,t){return F().global.fetch!=null?F().global.fetch(e,t):(gf==null&&(gf=CE.importFetch()),gf(e,t))}now(){let e=process.hrtime();return e[0]*1e3+e[1]/1e6}encode(e,t){if(t!=="utf-8"&&t!=="utf8")throw new Error(`Node built-in encoder only supports utf-8, but got ${t}`);return this.textEncoder.encode(e)}decode(e,t){return e.length===0?"":new this.util.TextDecoder(t).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}};F().get("IS_NODE")&&!F().get("IS_BROWSER")&&F().setPlatform("node",new xf);function oe(o,e="float32",t){return e=e||"float32",Be(o),new Se(o,e,t)}function NE(o,e){let t=T(o,"x","cast");if(!Od(e))throw new Error(`Failed to cast to unknown dtype ${e}`);if(e==="string"&&t.dtype!=="string"||e!=="string"&&t.dtype==="string")throw new Error("Only strings can be casted to strings");let r={x:t},n={dtype:e};return S.runKernel(xr,r,n)}var we=C({cast_:NE});function SE(o){let t={x:T(o,"x","clone","string_or_numeric")};return S.runKernel(yr,t)}var Ht=C({clone_:SE});function Ql(o,e=!1){console.log(o.toString(e))}rf();var IE={buffer:oe,cast:we,clone:Ht,print:Ql};fx(IE);function kE(o,e){let t=T(o,"a","add"),r=T(e,"b","add");[t,r]=he(t,r);let n={a:t,b:r};return S.runKernel(Qo,n)}var se=C({add_:kE});function EE(o,e){let t=T(o,"a","floorDiv"),r=T(e,"b","floorDiv");[t,r]=he(t,r);let n={a:t,b:r};return S.runKernel(fn,n)}var Yl=C({floorDiv_:EE});function $E(o,e){let t=T(o,"a","div"),r=T(e,"b","div");if([t,r]=he(t,r),t.dtype==="int32"&&r.dtype==="int32")return Yl(t,r);let n={a:t,b:r},s={};return S.runKernel(an,n,s)}var _e=C({div_:$E});function AE(o,e){let t=T(o,"a","mul"),r=T(e,"b","mul");[t,r]=he(t,r);let n={a:t,b:r};return S.runKernel($n,n)}var K=C({mul_:AE});function FE(o){let e=T(o,"x","abs");if(e.dtype==="complex64"){let t={x:e};return S.runKernel(oa,t)}else{let t={x:e};return S.runKernel(Ws,t)}}var ut=C({abs_:FE});function DE(o){let t={x:T(o,"x","acos")};return S.runKernel(jr,t)}var qx=C({acos_:DE});function RE(o){let t={x:T(o,"x","acosh")};return S.runKernel(Xr,t)}var Kx=C({acosh_:RE});function OE(o){I(Array.isArray(o),()=>"The argument passed to tf.addN() must be a list of tensors"),I(o.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${o.length}`);let e=o.map((n,s)=>T(n,`tensors${s}`,"addN")),t=e[0];e.forEach(n=>{if(n.dtype!==t.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),e.forEach(n=>{if(!Ut(n.shape,t.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});let r=e;return S.runKernel(Gs,r)}var jx=C({addN_:OE});function PE(o,e=null,t=!1){let n={x:T(o,"x","all","bool")},s={axis:e,keepDims:t};return S.runKernel(Hs,n,s)}var Xx=C({all_:PE});function VE(o,e=null,t=!1){let n={x:T(o,"x","any","bool")},s={axis:e,keepDims:t};return S.runKernel(qs,n,s)}var Qx=C({any_:VE});function LE(o,e=0){let r={x:T(o,"x","argMax")},n={axis:e};return S.runKernel(Ks,r,n)}var Yx=C({argMax_:LE});function ME(o,e=0){let r={x:T(o,"x","argMin")},n={axis:e};return S.runKernel(js,r,n)}var Zx=C({argMin_:ME});function BE(o){let t={x:T(o,"x","asin")};return S.runKernel(Qr,t)}var Jx=C({asin_:BE});function zE(o){let t={x:T(o,"x","asinh")};return S.runKernel(Yr,t)}var ey=C({asinh_:zE});function UE(o){let t={x:T(o,"x","atan")};return S.runKernel(Zr,t)}var ty=C({atan_:UE});function WE(o,e){let t=T(o,"a","atan2"),r=T(e,"b","atan2");[t,r]=he(t,r);let n={a:t,b:r};return S.runKernel(en,n)}var oy=C({atan2_:WE});function GE(o){let t={x:T(o,"x","atanh")};return S.runKernel(Jr,t)}var ry=C({atanh_:GE});function HE(o,e,t,r,n="NHWC",s){let a=o[3],i=[...e,a],p=sy(n);return ls(o,i,t,s,r,null,null,p)}function bf(o,e,t,r,n,s,a="channelsLast"){let[i,p]=Op(e),l;if(a==="channelsLast")l=[i,p,o[3],o[3]];else if(a==="channelsFirst")l=[i,p,o[1],o[1]];else throw new Error(`Unknown dataFormat ${a}`);return ls(o,l,t,r,n,s,!1,a)}function qE(o,e,t,r,n,s,a="NDHWC"){let[i,p,l]=yf(e),u,c;if(a==="NDHWC")c="channelsLast",u=[i,p,l,o[4],o[4]];else if(a==="NCDHW")c="channelsFirst",u=[i,p,l,o[1],o[1]];else throw new Error(`Unknown dataFormat ${a}`);return ny(o,u,t,r,n,!1,c,s)}function ls(o,e,t,r,n,s,a=!1,i="channelsLast"){let[p,l,u,c]=[-1,-1,-1,-1];if(i==="channelsLast")[p,l,u,c]=o;else if(i==="channelsFirst")[p,c,l,u]=o;else throw new Error(`Unknown dataFormat ${i}`);let[m,d,,f]=e,[g,h]=Op(t),[x,b]=Op(r),w=Bi(m,x),v=Bi(d,b),{padInfo:k,outHeight:E,outWidth:$}=XE(n,l,u,g,h,w,v,s,i),A=a?f*c:f,D;return i==="channelsFirst"?D=[p,A,E,$]:i==="channelsLast"&&(D=[p,E,$,A]),{batchSize:p,dataFormat:i,inHeight:l,inWidth:u,inChannels:c,outHeight:E,outWidth:$,outChannels:A,padInfo:k,strideHeight:g,strideWidth:h,filterHeight:m,filterWidth:d,effectiveFilterHeight:w,effectiveFilterWidth:v,dilationHeight:x,dilationWidth:b,inShape:o,outShape:D,filterShape:e}}function ny(o,e,t,r,n,s=!1,a="channelsLast",i){let[p,l,u,c,m]=[-1,-1,-1,-1,-1];if(a==="channelsLast")[p,l,u,c,m]=o;else if(a==="channelsFirst")[p,m,l,u,c]=o;else throw new Error(`Unknown dataFormat ${a}`);let[d,f,g,,h]=e,[x,b,w]=yf(t),[v,k,E]=yf(r),$=Bi(d,v),A=Bi(f,k),D=Bi(g,E),{padInfo:R,outDepth:P,outHeight:V,outWidth:L}=QE(n,l,u,c,x,b,w,$,A,D,i),B=s?h*m:h,M;return a==="channelsFirst"?M=[p,B,P,V,L]:a==="channelsLast"&&(M=[p,P,V,L,B]),{batchSize:p,dataFormat:a,inDepth:l,inHeight:u,inWidth:c,inChannels:m,outDepth:P,outHeight:V,outWidth:L,outChannels:B,padInfo:R,strideDepth:x,strideHeight:b,strideWidth:w,filterDepth:d,filterHeight:f,filterWidth:g,effectiveFilterDepth:$,effectiveFilterHeight:A,effectiveFilterWidth:D,dilationDepth:v,dilationHeight:k,dilationWidth:E,inShape:o,outShape:M,filterShape:e}}function KE(o,e,t,r,n){r==null&&(r=_f(o,e,t));let s=o[0],a=o[1],i=Pp((s-e+2*r)/t+1,n),p=Pp((a-e+2*r)/t+1,n);return[i,p]}function jE(o,e,t,r,n,s){n==null&&(n=_f(o,e[0],r[0]));let a=[0,0,0,t];for(let i=0;i<3;i++)o[i]+2*n>=e[i]&&(a[i]=Pp((o[i]-e[i]+2*n)/r[i]+1,s));return a}function _f(o,e,t,r=1){let n=Bi(e,r);return Math.floor((o[0]*(t-1)-t+n)/2)}function Op(o){return typeof o=="number"?[o,o,o]:o.length===2?[o[0],o[1],1]:o}function yf(o){return typeof o=="number"?[o,o,o]:o}function Bi(o,e){return e<=1?o:o+(o-1)*(e-1)}function XE(o,e,t,r,n,s,a,i,p){let l,u,c;if(typeof o=="number"){l={top:o,bottom:o,left:o,right:o,type:o===0?"VALID":"NUMBER"};let d=KE([e,t],s,r,o,i);u=d[0],c=d[1]}else if(o==="same"){u=Math.ceil(e/r),c=Math.ceil(t/n);let m=Math.max(0,(u-1)*r+s-e),d=Math.max(0,(c-1)*n+a-t),f=Math.floor(m/2),g=m-f,h=Math.floor(d/2),x=d-h;l={top:f,bottom:g,left:h,right:x,type:"SAME"}}else if(o==="valid")l={top:0,bottom:0,left:0,right:0,type:"VALID"},u=Math.ceil((e-s+1)/r),c=Math.ceil((t-a+1)/n);else if(typeof o=="object"){let m=p==="channelsLast"?o[1][0]:o[2][0],d=p==="channelsLast"?o[1][1]:o[2][1],f=p==="channelsLast"?o[2][0]:o[3][0],g=p==="channelsLast"?o[2][1]:o[3][1];l={top:m,bottom:d,left:f,right:g,type:m===0&&d===0&&f===0&&g===0?"VALID":"EXPLICIT"},u=Pp((e-s+m+d)/r+1,i),c=Pp((t-a+f+g)/n+1,i)}else throw Error(`Unknown padding parameter: ${o}`);return{padInfo:l,outHeight:u,outWidth:c}}function QE(o,e,t,r,n,s,a,i,p,l,u){let c,m,d,f;if(o==="valid"&&(o=0),typeof o=="number"){c={top:o,bottom:o,left:o,right:o,front:o,back:o,type:o===0?"VALID":"NUMBER"};let h=jE([e,t,r,1],[i,p,l],1,[n,s,a],o,u);m=h[0],d=h[1],f=h[2]}else if(o==="same"){m=Math.ceil(e/n),d=Math.ceil(t/s),f=Math.ceil(r/a);let g=(m-1)*n+i-e,h=(d-1)*s+p-t,x=(f-1)*a+l-r,b=Math.floor(g/2),w=g-b,v=Math.floor(h/2),k=h-v,E=Math.floor(x/2),$=x-E;c={top:v,bottom:k,left:E,right:$,front:b,back:w,type:"SAME"}}else throw Error(`Unknown padding parameter: ${o}`);return{padInfo:c,outDepth:m,outHeight:d,outWidth:f}}function Pp(o,e){if(!e)return Math.trunc(o);switch(e){case"round":return Math.round(o);case"ceil":return Math.ceil(o);case"floor":return Math.floor(o);default:throw new Error(`Unknown roundingMode ${e}`)}}function ps(o){let[e,t,r]=Op(o);return e===1&&t===1&&r===1}function wt(o,e){return ps(o)||ps(e)}function Fo(o){return Op(o).every(e=>e>0)}function sy(o){if(o==="NHWC")return"channelsLast";if(o==="NCHW")return"channelsFirst";throw new Error(`Unknown dataFormat ${o}`)}function tt(o,e,t){if(t!=null){if(typeof e=="string")throw Error(`Error in ${o}: pad must be an integer when using dimRoundingMode ${t} but got pad ${e}.`);if(typeof e=="number")I(Xo(e),()=>`Error in ${o}: pad must be an integer when using dimRoundingMode ${t} but got pad ${e}.`);else if(typeof e=="object")e.forEach(r=>{r.forEach(n=>{I(Xo(n),()=>`Error in ${o}: pad must be an integer when using dimRoundingMode ${t} but got pad ${n}.`)})});else throw Error(`Error in ${o}: Unknown padding parameter: ${e}`)}}function YE(o,e){let r={x:T(o,"x","reshape","string_or_numeric")},n={shape:e};return S.runKernel(ti,r,n)}var O=C({reshape_:YE});function ZE(o,e,t,r,n){let s=T(o,"x","avgPool","float32"),a=1;I(wt(t,a),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${t} and dilations '${a}'`);let i=s,p=!1;s.rank===3&&(p=!0,i=O(s,[1,s.shape[0],s.shape[1],s.shape[2]])),I(i.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${i.rank}.`),tt("avgPool",r,n);let l={x:i},u={filterSize:e,strides:t,pad:r,dimRoundingMode:n},c=S.runKernel(Xs,l,u);return c=we(c,s.dtype),p?O(c,[c.shape[1],c.shape[2],c.shape[3]]):c}var Zl=C({avgPool_:ZE});function JE(o,e,t,r,n,s="NDHWC"){let a=T(o,"x","avgPool3d","float32"),i=a,p=!1;a.rank===4&&(p=!0,i=O(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]])),I(i.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${i.rank}.`),I(s==="NDHWC",()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${s}`),I(typeof t=="number"&&t>0||Array.isArray(t)&&t[0]>0&&t[1]>0&&t[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${t}'`),tt("avgPool3d",r,n);let l={x:i},u={filterSize:e,strides:t,pad:r,dimRoundingMode:n,dataFormat:s},c=S.runKernel(Qs,l,u);return c=we(c,i.dtype),p?O(c,[c.shape[1],c.shape[2],c.shape[3],c.shape[4]]):c}var ay=C({avgPool3d_:JE});function e$(o,e=0){I(o.length>=1,()=>"Pass at least one tensor to concat");let t=as(o,"tensors","concat","string_or_numeric");if(t[0].dtype==="complex64"&&t.forEach(s=>{if(s.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${s.dtype}. `)}),t.length===1)return Ht(t[0]);let r=t,n={axis:e};return S.runKernel(ra,r,n)}var Pe=C({concat_:e$});function t$(o,e,t=!1,r=!1){let n=T(o,"a","matMul"),s=T(e,"b","matMul");[n,s]=he(n,s);let a={a:n,b:s},i={transposeA:t,transposeB:r};return S.runKernel(Ys,a,i)}var ke=C({matMul_:t$});function o$(o){let t={x:T(o,"x","sigmoid","float32")};return S.runKernel(Un,t)}var Ro=C({sigmoid_:o$});function r$(o,e,t){let r=T(o,"x","slice","string_or_numeric");if(r.rank===0)throw new Error("Slicing scalar is not possible");let n={x:r},s={begin:e,size:t};return S.runKernel(li,n,s)}var Te=C({slice_:r$});function n$(o){let t={x:T(o,"x","tanh","float32")};return S.runKernel(Xn,t)}var Vp=C({tanh_:n$});function s$(o,e,t,r,n,s){let a=T(o,"forgetBias","basicLSTMCell"),i=T(e,"lstmKernel","basicLSTMCell"),p=T(t,"lstmBias","basicLSTMCell"),l=T(r,"data","basicLSTMCell"),u=T(n,"c","basicLSTMCell"),c=T(s,"h","basicLSTMCell"),m=Pe([l,c],1),d=ke(m,i),f=se(d,p),g=f.shape[0],h=f.shape[1]/4,x=[g,h],b=Te(f,[0,0],x),w=Te(f,[0,h],x),v=Te(f,[0,h*2],x),k=Te(f,[0,h*3],x),E=se(K(Ro(b),Vp(w)),K(u,Ro(se(a,v)))),$=K(Vp(E),Ro(k));return[E,$]}var iy=C({basicLSTMCell_:s$});function a$(o,e,t){let r=T(o,"x","batchToSpaceND"),n=e.reduce((i,p)=>i*p);I(r.rank>=1+e.length,()=>`input rank is ${r.rank} but should be > than blockShape.length ${e.length}`),I(t.length===e.length,()=>`crops.length is ${t.length} but should be equal to blockShape.length  ${e.length}`),I(r.shape[0]%n===0,()=>`input tensor batch is ${r.shape[0]} but is not divisible by the product of the elements of blockShape ${e.join(" * ")} === ${n}`);let s={x:r},a={blockShape:e,crops:t};return S.runKernel(Zs,s,a)}var Jl=C({batchToSpaceND_:a$});function py(o){let e;return o.rank===0||o.rank===1?e=O(o,[1,1,1,o.size]):o.rank===2?e=O(o,[1,1,o.shape[0],o.shape[1]]):o.rank===3?e=O(o,[1,o.shape[0],o.shape[1],o.shape[2]]):e=o,e}function i$(o,e,t,r,n,s){s==null&&(s=.001);let a=T(o,"x","batchNorm"),i=T(e,"mean","batchNorm"),p=T(t,"variance","batchNorm"),l;n!=null&&(l=T(n,"scale","batchNorm"));let u;r!=null&&(u=T(r,"offset","batchNorm")),I(i.rank===p.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),I(u==null||i.rank===u.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),I(l==null||i.rank===l.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let m={x:py(a),scale:l,offset:u,mean:i,variance:p},d={varianceEpsilon:s},f=S.runKernel(Ca,m,d);return O(f,a.shape)}var Sr=C({batchNorm_:i$});function p$(o,e,t,r,n,s){let a=T(o,"x","batchNorm"),i=T(e,"mean","batchNorm"),p=T(t,"variance","batchNorm"),l;n!=null&&(l=T(n,"scale","batchNorm"));let u;return r!=null&&(u=T(r,"offset","batchNorm")),I(a.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${a.rank}.`),I(i.rank===2||i.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${i.rank}.`),I(p.rank===2||p.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${p.rank}.`),l!=null&&I(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${l.rank}.`),u!=null&&I(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${u.rank}.`),Sr(a,i,p,u,l,s)}var ly=C({batchNorm2d_:p$});function l$(o,e,t,r,n,s){let a=T(o,"x","batchNorm"),i=T(e,"mean","batchNorm"),p=T(t,"variance","batchNorm"),l;n!=null&&(l=T(n,"scale","batchNorm"));let u;return r!=null&&(u=T(r,"offset","batchNorm")),I(a.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${a.rank}.`),I(i.rank===3||i.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${i.rank}.`),I(p.rank===3||p.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${p.rank}.`),l!=null&&I(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${l.rank}.`),u!=null&&I(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${u.rank}.`),Sr(a,i,p,u,l,s)}var uy=C({batchNorm3d_:l$});function u$(o,e,t,r,n,s){let a=T(o,"x","batchNorm"),i=T(e,"mean","batchNorm"),p=T(t,"variance","batchNorm"),l;n!=null&&(l=T(n,"scale","batchNorm"));let u;return r!=null&&(u=T(r,"offset","batchNorm")),I(a.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${a.rank}.`),I(i.rank===4||i.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${i.rank}.`),I(p.rank===4||p.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${p.rank}.`),l!=null&&I(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${l.rank}.`),u!=null&&I(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${u.rank}.`),Sr(a,i,p,u,l,s)}var cy=C({batchNorm4d_:u$});function c$(o,e,t){let r=T(o,"x","bincount"),n=T(e,"weights","bincount");I(r.dtype==="int32",()=>`Error in bincount: input dtype must be int32, but got ${r.dtype}`),I(t>=0,()=>`size must be non-negative, but got ${t}.`),I(n.size===r.size||n.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${r.shape}, weights shape: ${n.shape}.`);let s={x:r,weights:n},a={size:t};return S.runKernel(Js,s,a)}var eu=C({bincount_:c$});function m$(o,e){let t=T(o,"x","bitwiseAnd"),r=T(e,"y","bitwiseAnd");if(!Ut(t.shape,r.shape))throw new Error(`BitwiseAnd: Tensors must have the same shape. x: ${t.shape}, y: ${r.shape}`);if(t.dtype!=="int32"||r.dtype!=="int32")throw new Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${t.dtype} and type of y: ${r.dtype}`);let n={a:t,b:r};return S.runKernel(tn,n)}var my=C({bitwiseAnd_:m$});function d$(o,e){let t=T(o,"s0","broadcastArgs","int32"),r=T(e,"s1","broadcastArgs","int32");if(t.rank!==1)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${t.rank}`);if(r.rank!==1)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${r.rank}`);let n={s0:t,s1:r};return S.runKernel(ea,n)}var dy=C({broadcastArgs_:d$});function f$(o,e){let t=T(o,"broadcastTo","x"),r=t.shape;if(Be(e),e.length<t.rank)throw new Error(`broadcastTo(): shape.length=${e.length} < input.rank=${t.rank}.`);if(e.length>t.rank){let l=t.shape.slice();for(;l.length<e.length;)l.unshift(1);t=O(t,l)}let n=t.shape,s=Array.from(e);for(let l=e.length-1;l>=0;l--)if(n[l]===e[l])s[l]=1;else if(t.shape[l]!==1)throw new Error(`broadcastTo(): [${r}] cannot be broadcast to [${e}].`);if(s.map((l,u)=>l>1?u:-1).filter(l=>l>=0).length===0)return Ht(t);let i={x:t},p={reps:s};return S.runKernel(br,i,p)}var Ir=C({broadcastTo_:f$});function h$(o){let t={x:T(o,"x","ceil","float32")};return S.runKernel(on,t)}var fy=C({ceil_:h$});function Oo(o,e,t){Be(o),t=t||gr(e);let r={shape:o,value:e,dtype:t};return S.runKernel(va,{},r)}function g$(o,e,t){let r=T(o,"x","clipByValue");if(I(e<=t,()=>`Error in clip: min (${e}) must be less than or equal to max (${t}).`),e===t)return Oo(r.shape,e,r.dtype);let n={x:r},s={clipValueMin:e,clipValueMax:t};return S.runKernel(rn,n,s)}var hy=C({clipByValue_:g$});function x$(o){return Pe(o,0)}var gy=C({concat1d_:x$});function y$(o,e){return Pe(o,e)}var xy=C({concat2d_:y$});function b$(o,e){return Pe(o,e)}var yy=C({concat3d_:b$});function _$(o,e){return Pe(o,e)}var by=C({concat4d_:_$});function T$(o,e,t,r,n="NHWC",s=[1,1],a){let i=T(o,"x","conv2d","float32"),p=T(e,"filter","conv2d","float32"),l=i,u=!1;i.rank===3&&(u=!0,l=O(i,[1,i.shape[0],i.shape[1],i.shape[2]])),I(l.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${l.rank}.`),I(p.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${p.rank}.`),tt("conv2d",r,a);let c=n==="NHWC"?l.shape[3]:l.shape[1];I(c===p.shape[2],()=>`Error in conv2d: depth of input (${c}) must match input depth for filter ${p.shape[2]}.`),I(wt(t,s),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${t} and dilations '${s}'`),I(Fo(s),()=>"Error in conv2D: Dilated rates should be larger than 0."),I(Fo(t),()=>"Error in conv2D: Strides should be larger than 0.");let m={x:l,filter:p},d={strides:t,pad:r,dataFormat:n,dilations:s,dimRoundingMode:a},f=S.runKernel(na,m,d);return u?O(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var kr=C({conv2d_:T$});function v$(o,e,t,r,n="NWC",s=1,a){let i=T(o,"x","conv1d"),p=T(e,"filter","conv1d"),l=i,u=!1;i.rank===2&&(u=!0,l=O(i,[1,i.shape[0],i.shape[1]])),I(l.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${l.rank}.`),I(p.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${p.rank}.`),tt("conv1d",r,a),I(l.shape[2]===p.shape[1],()=>`Error in conv1d: depth of input (${l.shape[2]}) must match input depth for filter ${p.shape[1]}.`),I(wt(t,s),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${t} and dilation '${s}'`),I(Fo(s),()=>"Error in conv1D: Dilated rates should be larger than 0."),I(Fo(t),()=>"Error in conv1D: Stride should be larger than 0."),I(n==="NWC",()=>`Error in conv1d: got dataFormat of ${n} but only NWC is currently supported.`);let c=O(p,[1,p.shape[0],p.shape[1],p.shape[2]]),m=O(l,[l.shape[0],1,l.shape[1],l.shape[2]]),h=kr(m,c,[1,t],r,"NHWC",[1,s],a);return u?O(h,[h.shape[2],h.shape[3]]):O(h,[h.shape[0],h.shape[2],h.shape[3]])}var _y=C({conv1d_:v$});function w$(o,e,t,r,n,s="NHWC",a){I(o.length===e.rank,()=>`Length of inShape (${o.length}) and rank of dy (${e.rank}) must match`);let i=o,p=e,l=!1;e.rank===3&&(l=!0,p=O(e,[1,e.shape[0],e.shape[1],e.shape[2]]),i=[1,o[0],o[1],o[2]]),I(i.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${i.length}.`),I(p.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${p.rank}`),I(t.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${t.rank}`);let u=s==="NHWC"?i[3]:i[1],c=s==="NHWC"?p.shape[3]:p.shape[1];I(u===t.shape[2],()=>`Error in conv2dDerInput: depth of input (${u}) must match input depth for filter ${t.shape[2]}.`),I(c===t.shape[3],()=>`Error in conv2dDerInput: depth of output (${c}) must match output depth for filter ${t.shape[3]}.`),tt("conv2dDerInput",n,a);let m={dy:p,filter:t},d={strides:r,pad:n,dataFormat:s,dimRoundingMode:a,inputShape:i},f=S.runKernel(aa,m,d);return l?O(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var tu=C({conv2DBackpropInput_:w$});function C$(o,e,t,r,n,s){let a=T(o,"x","conv2dTranspose"),i=T(e,"filter","conv2dTranspose");return tu(t,a,i,r,n,"NHWC",s)}var Ty=C({conv2dTranspose_:C$});function N$(o,e,t,r,n="NDHWC",s=[1,1,1]){let a=T(o,"x","conv3d"),i=T(e,"filter","conv3d"),p=a,l=!1;a.rank===4&&(l=!0,p=O(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]])),I(p.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${p.rank}.`),I(i.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${i.rank}.`),I(p.shape[4]===i.shape[3],()=>`Error in conv3d: depth of input (${p.shape[4]}) must match input depth for filter ${i.shape[3]}.`),I(wt(t,s),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${t} and dilations '${s}'`),I(n==="NDHWC",()=>`Error in conv3d: got dataFormat of ${n} but only NDHWC is currently supported.`),I(Fo(s),()=>"Error in conv3D: Dilated rates should be larger than 0."),I(Fo(t),()=>"Error in conv3D: Strides should be larger than 0.");let u={x:p,filter:i},c={strides:t,pad:r,dataFormat:n,dilations:s},m=S.runKernel(ia,u,c);return l?O(m,[m.shape[1],m.shape[2],m.shape[3],m.shape[4]]):m}var vy=C({conv3d_:N$});function S$(o,e,t,r,n){I(o.length===e.rank,()=>`Length of inShape (${o.length}) and rank of dy (${e.rank}) must match`);let s=o,a=e,i=!1;e.rank===4&&(i=!0,a=O(e,[1,e.shape[0],e.shape[1],e.shape[2],e.shape[3]]),s=[1,o[0],o[1],o[2],o[3]]);let p=s[4],l=a.shape[4];I(s.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${s.length}.`),I(a.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${a.rank}`),I(t.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${t.rank}`),I(p===t.shape[3],()=>`Error in conv3dDerInput: depth of input (${p}) must match input depth for filter ${t.shape[3]}.`),I(l===t.shape[4],()=>`Error in conv3dDerInput: depth of output (${l}) must match output depth for filter ${t.shape[4]}.`);let u={dy:a,filter:t},c={pad:n,strides:r,inputShape:s},m=S.runKernel(pa,u,c);return i?O(m,[m.shape[1],m.shape[2],m.shape[3],m.shape[4]]):m}var wy=C({conv3DBackpropInput_:S$});function I$(o,e,t,r,n){let s=T(o,"x","conv3dTranspose"),a=T(e,"filter","conv3dTranspose");return wy(t,s,a,r,n)}var Cy=C({conv3dTranspose_:I$});function k$(o){let t={x:T(o,"x","cos","float32")};return S.runKernel(nn,t)}var Ny=C({cos_:k$});function E$(o){let t={x:T(o,"x","cosh","float32")};return S.runKernel(sn,t)}var Sy=C({cosh_:E$});function $$(o,e=0,t=!1,r=!1){let s={x:T(o,"x","cumprod")},a={axis:e,exclusive:t,reverse:r};return S.runKernel(la,s,a)}var Iy=C({cumprod_:$$});function A$(o,e=0,t=!1,r=!1){let s={x:T(o,"x","cumsum")},a={axis:e,exclusive:t,reverse:r};return S.runKernel(ua,s,a)}var ky=C({cumsum_:A$});function F$(o,e,t,r=!1){let n=T(o,"x","denseBincount"),s=T(e,"weights","denseBincount");I(n.dtype==="int32",()=>`Error in denseBincount: input dtype must be int32, but got ${n.dtype}`),I(n.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${n.rank}.`),I(t>=0,()=>`size must be non-negative, but got ${t}.`),I(s.size===n.size||s.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${n.shape}, weights shape: ${s.shape}.`);let a={x:n,weights:s},i={size:t,binaryOutput:r};return S.runKernel(ma,a,i)}var Ey=C({denseBincount_:F$});function D$(o,e,t="NHWC"){let r=T(o,"x","depthToSpace","float32"),n=t==="NHWC"?r.shape[1]:r.shape[2],s=t==="NHWC"?r.shape[2]:r.shape[3],a=t==="NHWC"?r.shape[3]:r.shape[1];I(e>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${e}`),I(n*e>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${n} and ${e}  for depthToSpace with input shape
    ${r.shape}`),I(s*e>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${s} and ${e} for depthToSpace with input shape
        ${r.shape}`),I(a%(e*e)===0,()=>`Dimension size must be evenly divisible by ${e*e} but is ${a} for depthToSpace with input shape ${r.shape}`);let i={x:r},p={blockSize:e,dataFormat:t};return S.runKernel(da,i,p)}var $y=C({depthToSpace_:D$});function R$(o,e,t,r,n="NHWC",s=[1,1],a){let i=T(o,"x","depthwiseConv2d","float32"),p=T(e,"filter","depthwiseConv2d","float32"),l=i,u=!1;i.rank===3&&(u=!0,l=O(i,[1,i.shape[0],i.shape[1],i.shape[2]])),I(l.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${l.rank}.`),I(p.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${p.rank}.`);let c=n==="NHWC"?l.shape[3]:l.shape[1];I(c===p.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${c}) must match the inChannels dimension in filter ${p.shape[2]}.`),tt("depthwiseConv2d",r,a);let m={x:l,filter:p},d={strides:t,pad:r,dataFormat:n,dilations:s,dimRoundingMode:a},f=S.runKernel(fa,m,d);return u?O(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var zi=C({depthwiseConv2d_:R$});function O$(o){let t={x:T(o,"x","diag")};return S.runKernel(xa,t)}var Ay=C({diag_:O$});function P$(o,e,t,r,n=[1,1],s="NHWC"){let a=T(o,"x","dilation2d"),i=T(e,"filter","dilation2d");I(a.rank===3||a.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${a.rank}.`),I(i.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${i.rank}.`),I(s==="NHWC",()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${s}`);let p=a,l=!1;a.rank===3&&(p=O(a,[1,a.shape[0],a.shape[1],a.shape[2]]),l=!0),I(p.shape[3]===i.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${p.shape[3]} vs ${i.shape[2]}`);let u={x:p,filter:i},c={strides:t,pad:r,dilations:n},m=S.runKernel(ya,u,c);return l?O(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var Fy=C({dilation2d_:P$});var Po={};Fe(Po,{assertAndGetBroadcastShape:()=>Ie,getBroadcastDims:()=>Dy,getReductionAxes:()=>ou});function Dy(o,e){let t=o.length,r=[];for(let n=0;n<t;n++){let s=t-1-n,a=o[s]||1;(e[e.length-1-n]||1)>1&&a===1&&r.unshift(s)}return r}function ou(o,e){let t=[];for(let r=0;r<e.length;r++){let n=o[o.length-r-1],s=e.length-r-1,a=e[s];(n==null||n===1&&a>1)&&t.unshift(s)}return t}function Ie(o,e){let t=Math.max(o.length,e.length),r=new Array(t);for(let n=0;n<t;n++){let s=o[o.length-n-1];s==null&&(s=1);let a=e[e.length-n-1];if(a==null&&(a=1),s===1)r[t-n-1]=a;else if(a===1)r[t-n-1]=s;else if(s!==a){let i=`Operands could not be broadcast together with shapes ${o} and ${e}.`;throw Error(i)}else r[t-n-1]=s}return r}function V$(o,e){let t=T(o,"a","equal","string_or_numeric"),r=T(e,"b","equal","string_or_numeric");[t,r]=he(t,r),Ie(t.shape,r.shape);let n={a:t,b:r};return S.runKernel(un,n)}var ru=C({equal_:V$});function L$(o,e,t){let r=T(e,"a","where"),n=T(t,"b","where"),s=T(o,"condition","where","bool"),a=Ie(Ie(s.shape,r.shape),n.shape),i=Ir(s,a),p=Ir(r,a),l=Ir(n,a),u={condition:i,t:p,e:l};return S.runKernel(pi,u)}var eo=C({where_:L$});function M$(o){let t={x:T(o,"x","zerosLike")};return S.runKernel(ki,t)}var nt=C({zerosLike_:M$});function B$(o,e){let t=T(o,"a","div"),r=T(e,"b","div");[t,r]=he(t,r);let n=_e(t,r),s=nt(n),a=ru(r,s);return eo(a,s,n)}var Ry=C({divNoNan_:B$});function z$(o,e){let t=T(o,"t1","dot"),r=T(e,"t2","dot");I((t.rank===1||t.rank===2)&&(r.rank===1||r.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${t.rank} and ${r.rank}.`);let n=t.rank===1?t.size:t.shape[1],s=r.rank===1?r.size:r.shape[0];if(I(n===s,()=>`Error in dot: inner dimensions of inputs must match, but got ${n} and ${s}.`),t.rank===1&&r.rank===1){let a=O(t,[1,-1]),i=O(r,[-1,1]),p=ke(a,i);return O(p,[])}else if(t.rank===1&&r.rank===2){let a=O(t,[1,-1]),i=O(r,[r.shape[0],r.shape[1]]),p=ke(a,i);return O(p,[p.size])}else if(t.rank===2&&r.rank===1){let a=O(r,[-1,1]),i=ke(t,a);return O(i,[i.size])}else{let a=O(r,[r.shape[0],r.shape[1]]);return ke(t,a)}}var Oy=C({dot_:z$});function U$(o,...e){let t=e.map((n,s)=>T(n,`tensors${s}`,"einsum")),r={equation:o};return S.runKernel(ba,t,r)}var Er=C({einsum_:U$});function W$(o){let t={x:T(o,"x","elu","float32")};return S.runKernel(pn,t)}var nu=C({elu_:W$});function G$(o,e){let t=T(o,"x","ensureShape","string_or_numeric");if(!Ad(t.shape,e))throw new Error(`EnsureShape: Shape of tensor ${t.shape} is not compatible with expected shape ${e}`);return o}var Py=C({ensureShape_:G$});function H$(o){let e=T(o,"x","erf");I(e.dtype==="int32"||e.dtype==="float32",()=>"Input dtype must be `int32` or `float32`."),e.dtype==="int32"&&(e=we(e,"float32"));let t={x:e};return S.runKernel(ln,t)}var Vy=C({erf_:H$});function Tf(o,e){for(let t=0;t<o.length;++t)if(o[o.length-t-1]!==e-1-t)return!1;return!0}function Ly(o,e,t){let r=o.length+e.length,n=[],s=0,a=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(o[s++]):n.push(e[a++]);return n}function q$(o,e){let t=[],r=o.length;for(let s=0;s<r;s++)e.indexOf(s)===-1&&t.push(o[s]);let n=e.map(s=>o[s]);return[t,n]}function tr(o,e){let t=e.map(r=>1);return Ly(o,t,e)}function K$(o,e,t){I(Tf(e,t),()=>`${o} supports only inner-most axes for now. Got axes ${e} and rank-${t} input.`)}function j$(o,e){if(Tf(o,e))return null;let t=[];for(let r=0;r<e;++r)o.indexOf(r)===-1&&t.push(r);return o.forEach(r=>t.push(r)),t}function X$(o){return o.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function Q$(o,e){let t=[];for(let r=e-o;r<e;++r)t.push(r);return t}function Z$(o,e=null,t=!1){let n={x:T(o,"x","max")},s={reductionIndices:e,keepDims:t};return S.runKernel(Fa,n,s)}var Vo=C({max_:Z$});function J$(o,e=null,t=!1){let n={x:T(o,"x","min")},s={axis:e,keepDims:t};return S.runKernel(Va,n,s)}var Lp=C({min_:J$});function eA(o,e){let t=T(o,"base","pow"),r=T(e,"exp","pow");[t,r]=he(t,r);let n={a:t,b:r};return S.runKernel(Fn,n)}var or=C({pow_:eA});function pe(o,e){if((vt(o)&&e!=="string"||Array.isArray(o))&&e!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(e==="string"&&vt(o)&&!(o instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Nt(o,[],[],e)}function tA(o){let t={x:T(o,"x","sqrt","float32")};return S.runKernel(Gn,t)}var Dt=C({sqrt_:tA});function oA(o){let e=T(o,"x","square"),t={};return S.runKernel("Square",{x:e},t)}var ct=C({square_:oA});function rA(o,e=null,t=!1){let r=T(o,"x","sum");r.dtype==="bool"&&(r=we(r,"int32"));let n={x:r},s={axis:e,keepDims:t};return S.runKernel(ui,n,s)}var Ee=C({sum_:rA});function nA(o,e="euclidean",t=null,r=!1){o=T(o,"x","norm");let n=My(o,e,t),s=n.shape;if(r){let a=hr(t,o.shape);s=tr(n.shape,a)}return O(n,s)}function My(o,e,t=null){if(o.rank===0)return ut(o);if(o.rank!==1&&t===null)return My(O(o,[-1]),e,t);if(o.rank===1||typeof t=="number"||Array.isArray(t)&&t.length===1){if(e===1)return Ee(ut(o),t);if(e===1/0)return Vo(ut(o),t);if(e===-1/0)return Lp(ut(o),t);if(e==="euclidean"||e===2)return Dt(Ee(or(ut(o),pe(2,"int32")),t));throw new Error(`Error in norm: invalid ord value: ${e}`)}if(Array.isArray(t)&&t.length===2){if(e===1)return Vo(Ee(ut(o),t[0]),t[1]-1);if(e===1/0)return Vo(Ee(ut(o),t[1]),t[0]);if(e===-1/0)return Lp(Ee(ut(o),t[1]),t[0]);if(e==="fro"||e==="euclidean")return Dt(Ee(ct(o),t));throw new Error(`Error in norm: invalid ord value: ${e}`)}throw new Error(`Error in norm: invalid axis: ${t}`)}var us=C({norm_:nA});function sA(o,e=null,t=!1){return us(o,"euclidean",e,t)}var By=C({euclideanNorm_:sA});function aA(o){let t={x:T(o,"x","exp")};return S.runKernel(cn,t)}var lo=C({exp_:aA});function iA(o,e=0){let t=T(o,"x","expandDims","string_or_numeric");I(e<=t.rank,()=>"Axis must be <= rank of the tensor");let r={input:t},n={dim:e};return S.runKernel(_a,r,n)}var To=C({expandDims_:iA});function pA(o){let t={x:T(o,"x","expm1")};return S.runKernel(mn,t)}var zy=C({expm1_:pA});function lA(o,e){let t=T(o,"x","tile","string_or_numeric");I(t.rank===e.length,()=>`Error in transpose: rank of input ${t.rank} must match length of reps ${e}.`);let r={x:t},n={reps:e};return S.runKernel(br,r,n)}var $r=C({tile_:lA});function uA(o,e,t,r="float32"){e==null&&(e=o);let n=oe([o,e],r),s=o<=e?o:e;for(let i=0;i<s;++i)n.set(1,i,i);let a=O(n.toTensor(),[o,e]);if(t==null)return a;if(t.length===1)return $r(To(a,0),[t[0],1,1]);if(t.length===2)return $r(To(To(a,0),0),[t[0],t[1],1,1]);if(t.length===3)return $r(To(To(To(a,0),0),0),[t[0],t[1],t[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${t.length}D.`)}var su=C({eye_:uA});function cA(o){let t={x:T(o,"x","floor","float32")};return S.runKernel(dn,t)}var au=C({floor_:cA});function mA(o,e,t=0,r=0){let n=T(o,"x","gather"),s=T(e,"indices","gather","int32"),a={x:n,indices:s},i={axis:t,batchDims:r};return S.runKernel(Na,a,i)}var iu=C({gather_:mA});function dA(o,e){let t=T(o,"a","greater","string_or_numeric"),r=T(e,"b","greater","string_or_numeric");[t,r]=he(t,r),Ie(t.shape,r.shape);let n={a:t,b:r};return S.runKernel(hn,n)}var cs=C({greater_:dA});function fA(o,e){let t=T(o,"a","greaterEqual","string_or_numeric"),r=T(e,"b","greaterEqual","string_or_numeric");[t,r]=he(t,r),Ie(t.shape,r.shape);let n={a:t,b:r};return S.runKernel(gn,n)}var pu=C({greaterEqual_:fA});function hA(o){let t={input:T(o,"input","imag")};return S.runKernel(ka,t)}var Ar=C({imag_:hA});function gA(o){let t={x:T(o,"x","isFinite")};return S.runKernel(xn,t)}var Uy=C({isFinite_:gA});function xA(o){let t={x:T(o,"x","isInf")};return S.runKernel(yn,t)}var Wy=C({isInf_:xA});function yA(o){let t={x:T(o,"x","isNaN")};return S.runKernel(bn,t)}var Gy=C({isNaN_:yA});function bA(o,e=.2){let r={x:T(o,"x","leakyRelu")},n={alpha:e};return S.runKernel(Ea,r,n)}var lu=C({leakyRelu_:bA});function _A(o,e){let t=T(o,"a","less","string_or_numeric"),r=T(e,"b","less","string_or_numeric");[t,r]=he(t,r),Ie(t.shape,r.shape);let n={a:t,b:r};return S.runKernel(_n,n)}var Mp=C({less_:_A});function TA(o,e){let t=T(o,"a","lessEqual","string_or_numeric"),r=T(e,"b","lessEqual","string_or_numeric");[t,r]=he(t,r),Ie(t.shape,r.shape);let n={a:t,b:r};return S.runKernel(Tn,n)}var Ui=C({lessEqual_:TA});function Hy(o,e,t){if(t<=0)throw new Error("The number of values should be positive.");let r={start:o,stop:e,num:t};return S.runKernel($a,{},r)}function vA(o,e=5,t=1,r=1,n=.5){let s=T(o,"x","localResponseNormalization");I(s.rank===4||s.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${s.rank}.`),I(Xo(e),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${e}.`);let a=s,i=!1;s.rank===3&&(i=!0,a=O(s,[1,s.shape[0],s.shape[1],s.shape[2]]));let p={x:a},l={depthRadius:e,bias:t,alpha:r,beta:n},u=S.runKernel(Aa,p,l);return i?O(u,[u.shape[1],u.shape[2],u.shape[3]]):u}var qy=C({localResponseNormalization_:vA});function wA(o){let t={x:T(o,"x","log","float32")};return S.runKernel(vn,t)}var rr=C({log_:wA});function CA(o){let t={x:T(o,"x","log1p")};return S.runKernel(wn,t)}var uu=C({log1p_:CA});function Ky(o,e){I(Bs(o),()=>"The f passed in variableGrads(f) must be a function"),I(e==null||Array.isArray(e)&&e.every(l=>l instanceof Zo),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");let t=e!=null;if(!t){e=[];for(let l in S.registeredVariables)e.push(S.registeredVariables[l])}let r=t?e.filter(l=>!l.trainable):null,n=e.length;e=e.filter(l=>l.trainable),I(e.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${n} variables is trainable.`);let s=!0,{value:a,grads:i}=S.gradients(o,e,null,s);I(i.some(l=>l!=null),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),I(a.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${a.rank} tensor`);let p={};return e.forEach((l,u)=>{i[u]!=null&&(p[l.name]=i[u])}),r?.forEach(l=>p[l.name]=null),{value:a,grads:p}}function Rt(o){return S.customGrad(o)}function NA(o){let t={x:T(o,"x","neg")};return S.runKernel(Ba,t)}var xt=C({neg_:NA});function SA(o){let t={x:T(o,"x","softplus")};return S.runKernel(Wn,t)}var cu=C({softplus_:SA});function IA(o){let e=T(o,"x","logSigmoid");return Rt(r=>({value:xt(cu(xt(r))),gradFunc:a=>K(a,Ro(xt(r)))}))(e)}var jy=C({logSigmoid_:IA});function kA(o,e){let t=T(o,"a","sub"),r=T(e,"b","sub");[t,r]=he(t,r);let n={a:t,b:r};return S.runKernel(Kn,n)}var ue=C({sub_:kA});function EA(o,e=-1){let t=T(o,"logits","logSoftmax");if(e===-1&&(e=t.rank-1),e!==t.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${t.rank} and axis was ${e}`);return Rt((n,s)=>{let i=Vo(n,e,!0),p=ue(n,i),l=ue(we(p,"float32"),rr(Ee(lo(p),e,!0)));return s([l]),{value:l,gradFunc:(c,m)=>{let[d]=m,f=!0,g=lo(d);return ue(c,K(Ee(c,e,f),g))}}})(t)}var Xy=C({logSoftmax_:EA});function $A(o,e=null,t=!1){let r=T(o,"x","logSumExp"),n=hr(e,r.shape),s=Vo(r,n,!0),a=ue(r,s),i=lo(a),p=Ee(i,n),l=rr(p),u=se(O(s,l.shape),l);if(t){let c=tr(u.shape,n);return O(u,c)}return u}var mu=C({logSumExp_:$A});function AA(o,e){let t=T(o,"a","logicalAnd","bool"),r=T(e,"b","logicalAnd","bool");Ie(t.shape,r.shape);let n={a:t,b:r};return S.runKernel(Cn,n)}var ms=C({logicalAnd_:AA});function FA(o){let t={x:T(o,"x","logicalNot","bool")};return S.runKernel(Nn,t)}var du=C({logicalNot_:FA});function DA(o,e){let t=T(o,"a","logicalOr","bool"),r=T(e,"b","logicalOr","bool");Ie(t.shape,r.shape);let n={a:t,b:r};return S.runKernel(Sn,n)}var fu=C({logicalOr_:DA});function RA(o,e){let t=T(o,"a","logicalXor","bool"),r=T(e,"b","logicalXor","bool");return Ie(t.shape,r.shape),ms(fu(o,e),du(ms(o,e)))}var Qy=C({logicalXor_:RA});var hu=2147483648;function OA(o,e,t="left"){let r=T(o,"sortedSequence","searchSorted"),n=T(e,"values","searchSorted"),s=r.shape[r.shape.length-1],a=n.shape[n.shape.length-1],i=O(r,[-1,s]),p=O(n,[-1,a]);if(i.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(i.shape[0]!==p.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(ge(p.shape)>=hu)throw new Error(`values tensor size must less than ${hu}`);if(i.shape[1]>=hu)throw new Error(`trailing dim_size must less than ${hu} for int32 output type, was ${i.shape[1]}`);let l={sortedSequence:i,values:p},u={side:t};return S.runKernel(ii,l,u)}var Bp=C({searchSorted_:OA});function Yy(o,e){return Bp(o,e,"left")}function PA(o,e,t,r,n){let s=T(o,"x","maxPool"),a=1,i=s,p=!1;s.rank===3&&(p=!0,i=O(s,[1,s.shape[0],s.shape[1],s.shape[2]])),I(i.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${i.rank}.`),I(wt(t,a),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${t} and dilations '${a}'`),tt("maxPool",r,n);let l={x:i},u={filterSize:e,strides:t,pad:r,dimRoundingMode:n},c=S.runKernel(Da,l,u);return p?O(c,[c.shape[1],c.shape[2],c.shape[3]]):c}var gu=C({maxPool_:PA});function VA(o,e=[1,1,1],t,r,n,s="NDHWC"){let a=T(o,"x","maxPool3d"),i=a,p=!1;a.rank===4&&(p=!0,i=O(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]])),I(i.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${i.rank}.`),I(s==="NDHWC",()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${s}`),tt("maxPool3d",r,n);let l={x:i},u={filterSize:e,strides:t,pad:r,dimRoundingMode:n,dataFormat:s},c=S.runKernel(Ra,l,u);return p?O(c,[c.shape[1],c.shape[2],c.shape[3],c.shape[4]]):c}var Zy=C({maxPool3d_:VA});function LA(o,e,t,r,n=!1){let a={x:T(o,"x","maxPoolWithArgmax")},i={filterSize:e,strides:t,pad:r,includeBatchInIndex:n},p=S.runKernel(Oa,a,i);return{result:p[0],indexes:p[1]}}var Jy=C({maxPoolWithArgmax_:LA});function MA(o,e){let t=T(o,"a","maximum"),r=T(e,"b","maximum");[t,r]=he(t,r),t.dtype==="bool"&&(t=we(t,"int32"),r=we(r,"int32")),Ie(t.shape,r.shape);let n={a:t,b:r};return S.runKernel(In,n)}var xu=C({maximum_:MA});function BA(o,e=null,t=!1){let n={x:T(o,"x","mean")},s={axis:e,keepDims:t};return S.runKernel(Pa,n,s)}var ds=C({mean_:BA});function qt(o,e="float32"){if(Be(o),e==="complex64"){let r=qt(o,"float32"),n=qt(o,"float32");return At(r,n)}let t=Us(ge(o),e);return S.makeTensor(t,o,e)}function Lo(o,e="float32"){if(Be(o),e==="complex64"){let r=Lo(o,"float32"),n=qt(o,"float32");return At(r,n)}let t=Cp(ge(o),e);return S.makeTensor(t,o,e)}function eb(o,e,{indexing:t="xy"}={}){if(t!=="xy"&&t!=="ij")throw new TypeError(`${t} is not a valid third argument to meshgrid`);if(o===void 0)return[];let r=T(o,"x","meshgrid",o instanceof Oe?o.dtype:"float32");if(e===void 0)return[r];let n=T(e,"y","meshgrid",e instanceof Oe?e.dtype:"float32"),s=ge(r.shape),a=ge(n.shape);return t==="xy"?(r=O(r,[1,-1]),n=O(n,[-1,1]),[ke(Lo([a,1],r.dtype),r),ke(n,Lo([1,s],n.dtype))]):(r=O(r,[-1,1]),n=O(n,[1,-1]),[ke(r,Lo([1,a],r.dtype)),ke(Lo([s,1],n.dtype),n)])}function zA(o,e){let t=T(o,"a","minimum"),r=T(e,"b","minimum");[t,r]=he(t,r),t.dtype==="bool"&&(t=we(t,"int32"),r=we(r,"int32")),Ie(t.shape,r.shape);let n={a:t,b:r};return S.runKernel(kn,n)}var fs=C({minimum_:zA});function UA(o,e,t){I(t==="reflect"||t==="symmetric",()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${t}.`);let r=T(o,"x","mirrorPad");if(r.rank===0)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");I(e.length===r.rank,()=>`Padding doesn't match input. Must be ${r.rank}. Got ${e.length}.`);let n=t==="reflect"?1:0;for(let i=0;i<r.rank;i++)I(e[i].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),I(e[i][0]>=0&&e[i][0]<=r.shape[i]-n&&e[i][1]>=0&&e[i][1]<=r.shape[i]-n,()=>`Padding in dimension ${i} cannot be greater than or equal to ${r.shape[i]-n} or less than 0 for input of shape ${r.shape}`);let s={paddings:e,mode:t},a={x:r};return S.runKernel(La,a,s)}var tb=C({mirrorPad_:UA});function WA(o,e){let t=T(o,"a","mod"),r=T(e,"b","mod");[t,r]=he(t,r);let n={a:t,b:r};return S.runKernel(En,n)}var ob=C({mod_:WA});function GA(o,e=null,t=!1){o=T(o,"x","moments");let r=hr(e,o.shape),n=ds(o,r,t),s=n.shape;t||(s=tr(n.shape,r));let a=ct(ue(we(o,"float32"),O(n,s))),i=ds(a,r,t);return{mean:n,variance:i}}var rb=C({moments_:GA});function HA(o,e,t,r){let n=T(e,"data","multiRNNCell"),s=as(t,"c","multiRNNCell"),a=as(r,"h","multiRNNCell"),i=n,p=[];for(let c=0;c<o.length;c++){let m=o[c](i,s[c],a[c]);p.push(m[0]),p.push(m[1]),i=m[1]}let l=[],u=[];for(let c=0;c<p.length;c+=2)l.push(p[c]),u.push(p[c+1]);return[l,u]}var nb=C({multiRNNCell_:HA});function qA(o,e,t,r=!1){let n=T(o,"logits","multinomial"),s=n.size,a=n.rank;if(s<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${s}.`);if(a>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${a}`);t=t||Math.random();let p={logits:a===1?O(n,[1,-1]):n},l={numSamples:e,seed:t,normalized:r},u=S.runKernel(Ma,p,l);return a===1?O(u,[u.size]):u}var sb=C({multinomial_:qA});function KA(o,e){let t=T(o,"a","notEqual","string_or_numeric"),r=T(e,"b","notEqual","string_or_numeric");[t,r]=he(t,r),Ie(t.shape,r.shape);let n={a:t,b:r};return S.runKernel(An,n)}var yu=C({notEqual_:KA});function jA(o,e,t=1,r=0,n="int32"){if(e<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${e}`);let a={indices:T(o,"indices","oneHot","int32")},i={dtype:n,depth:e,onValue:t,offValue:r};return S.runKernel(Ha,a,i)}var ab=C({oneHot_:jA});function XA(o){let t={x:T(o,"x","onesLike")};return S.runKernel(Ga,t)}var ib=C({onesLike_:XA});function QA(o,e){let t=T(o,"v1","outerProduct"),r=T(e,"v2","outerProduct");I(t.rank===1&&r.rank===1,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${t.rank} and ${r.rank}.`);let n=O(t,[-1,1]),s=O(r,[1,-1]);return ke(n,s)}var pb=C({outerProduct_:QA});function YA(o,e,t=0){let r=T(o,"x","pad");if(r.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");let n={paddings:e,constantValue:t},s={x:r};return S.runKernel(Ka,s,n)}var Mo=C({pad_:YA});function ZA(o,e,t=0){return I(e.length===2,()=>"Invalid number of paddings. Must be length of 2."),Mo(o,[e],t)}var lb=C({pad1d_:ZA});function JA(o,e,t=0){return I(e.length===2&&e[0].length===2&&e[1].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),Mo(o,e,t)}var ub=C({pad2d_:JA});function eF(o,e,t=0){return I(e.length===3&&e[0].length===2&&e[1].length===2&&e[2].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),Mo(o,e,t)}var cb=C({pad3d_:eF});function tF(o,e,t=0){return I(e.length===4&&e[0].length===2&&e[1].length===2&&e[2].length===2&&e[3].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),Mo(o,e,t)}var mb=C({pad4d_:tF});function oF(o,e,t){let r=T(o,"x","spaceToBatchND");I(r.rank>=1+e.length,()=>`input rank ${r.rank} should be > than [blockShape] ${e.length}`),I(t.length===e.length,()=>`paddings.shape[0] ${t.length} must be equal to [blockShape] ${e.length}`),I(r.shape.reduce((a,i,p)=>p>0&&p<=e.length?a&&(i+t[p-1][0]+t[p-1][1])%e[p-1]===0:a,!0),()=>`input spatial dimensions ${r.shape.slice(1)} with paddings ${t.toString()} must be divisible by blockShapes ${e.toString()}`);let n={x:r},s={blockShape:e,paddings:t};return S.runKernel(ci,n,s)}var bu=C({spaceToBatchND_:oF});function rF(o,e,t,r,n,s,a){n==null&&(n=[1,1]),s==null&&(s=1),r===0&&(r="valid");let i=T(o,"x","maxPool"),p=i,l=!1;i.rank===3&&(l=!0,p=O(i,[1,i.shape[0],i.shape[1],i.shape[2]])),I(wt(s,n),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${s} and dilations '${n}'`);let u=bf(p.shape,e,s,n,r),c=[u.dilationHeight,u.dilationWidth],m;r==="same"?m=sF([u.filterHeight,u.filterWidth],c):m=[[0,0],[0,0]];let d=c[0]===1&&c[1]===1,[f,g]=nF([u.inHeight,u.inWidth],c,m),h=d?r:"valid",x=d?p:bu(p,c,f),w=(t==="avg"?()=>Zl(x,e,s,h,a):()=>gu(x,e,s,h,a))(),v=d?w:Jl(w,c,g);return l?O(v,[v.shape[1],v.shape[2],v.shape[3]]):v}function nF(o,e,t){let r=t.map(u=>u[0]),n=t.map(u=>u[1]),s=o.concat(r,n),a=e.map((u,c)=>(u-s[c]%u)%u),i=n.map((u,c)=>u+a[c]),p=e.map((u,c)=>[r[c],i[c]]),l=e.map((u,c)=>[0,a[c]]);return[p,l]}function sF(o,e){let r=o.map((a,i)=>a+(a-1)*(e[i]-1)).map(a=>a-1),n=r.map(a=>Math.floor(a/2)),s=r.map((a,i)=>a-n[i]);return r.map((a,i)=>[n[i],s[i]])}var db=C({pool_:rF});function aF(o,e){let t=T(o,"x","prelu"),r=T(e,"alpha","prelu"),n={x:t,alpha:r};return S.runKernel(ja,n)}var _u=C({prelu_:aF});function iF(o,e=null,t=!1){let r=T(o,"x","prod");r.dtype==="bool"&&(r=we(r,"int32"));let n={x:r},s={axis:e,keepDims:t};return S.runKernel(Xa,n,s)}var fb=C({prod_:iF});function pF(o,e,t,r){let n=o.map((u,c)=>T(u,`tensors${c}`,"raggedGather","int32")),s=T(e,"paramsDenseValues","raggedGather"),a=T(t,"indices","raggedGather","int32"),i={paramsNestedSplits:n,paramsDenseValues:s,indices:a},p={outputRaggedRank:r},l=S.runKernel(Qa,i,p);return{outputNestedSplits:l.slice(0,l.length-1),outputDenseValues:l[l.length-1]}}var hb=C({raggedGather_:pF});function lF(o,e,t){let r=T(o,"starts","raggedRange"),n=T(e,"limits","raggedRange",r.dtype),s=T(t,"deltas","raggedRange",r.dtype),a={starts:r,limits:n,deltas:s},i=S.runKernel(Ya,a);return{rtNestedSplits:i[0],rtDenseValues:i[1]}}var gb=C({raggedRange_:lF});function uF(o,e,t,r,n){let s=T(o,"shape","raggedTensorToTensor","int32"),a=T(e,"values","raggedTensorToTensor"),i=T(t,"defaultValue","raggedTensorToTensor",a.dtype),p=r.map((c,m)=>T(c,`tensors${m}`,"raggedTensorToTensor","int32")),l={shape:s,values:a,defaultValue:i,rowPartitionTensors:p},u={rowPartitionTypes:n};return S.runKernel(Za,l,u)}var xb=C({raggedTensorToTensor_:uF});function cF(o,e,t){Be(o);let r=ge(o),n=null;if(t==null||t==="float32")n=new Float32Array(r);else if(t==="int32")n=new Int32Array(r);else if(t==="bool")n=new Uint8Array(r);else throw new Error(`Unknown data type ${t}`);for(let s=0;s<r;s++)n[s]=e();return S.makeTensor(n,o,t)}var yb=C({rand_:cF});var Cu=$d(kf());var gs=class{constructor(e,t,r,n,s){this.mean=e,this.stdDev=t,this.dtype=r,this.nextVal=NaN,this.truncated=n,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);let a=s||Math.random();this.random=Cu.alea(a.toString())}nextValue(){if(!isNaN(this.nextVal)){let n=this.nextVal;return this.nextVal=NaN,n}let e,t,r=!1;for(;!r;){let n,s,a;do n=2*this.random()-1,s=2*this.random()-1,a=n*n+s*s;while(a>=1||a===0);let i=Math.sqrt(-2*Math.log(a)/a);e=this.mean+this.stdDev*n*i,t=this.mean+this.stdDev*s*i,(!this.truncated||this.isValidTruncated(e))&&(r=!0)}return(!this.truncated||this.isValidTruncated(t))&&(this.nextVal=this.convertValue(t)),this.convertValue(e)}convertValue(e){return this.dtype==null||this.dtype==="float32"?e:Math.round(e)}isValidTruncated(e){return e<=this.upper&&e>=this.lower}},vu=class{constructor(e,t,r,n){this.alpha=e,this.beta=1/t,this.dtype=r;let s=n||Math.random();this.randu=Cu.alea(s.toString()),this.randn=new gs(0,1,r,!1,this.randu()),e<1?this.d=e+2/3:this.d=e-1/3,this.c=1/Math.sqrt(9*this.d)}nextValue(){let e,t,r,n,s,a;for(;;){do n=this.randn.nextValue(),a=1+this.c*n;while(a<=0);if(a*=a*a,e=n*n,t=1-.331*e*e,r=.5*e+this.d*(1-a+Math.log(a)),s=this.randu(),s<t||Math.log(s)<r)break}return a=1/this.beta*this.d*a,this.alpha<1&&(a*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(a)}convertValue(e){return this.dtype==="float32"?e:Math.round(e)}},wu=class{constructor(e=0,t=1,r,n){if(this.canReturnFloat=()=>this.dtype==null||this.dtype==="float32",this.min=e,this.range=t-e,this.dtype=r,n==null&&(n=Math.random()),typeof n=="number"&&(n=n.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${e} - ${t} <= 1 and dtype is not float`);this.random=Cu.alea(n)}convertValue(e){return this.canReturnFloat()?e:Math.round(e)}nextValue(){return this.convertValue(this.min+this.range*this.random())}};function yF(o,e,t=1,r="float32",n){if(Be(o),t==null&&(t=1),r==null&&(r="float32"),r!=="float32"&&r!=="int32")throw new Error(`Unsupported data type ${r}`);let s=new vu(e,t,r,n),a=oe(o,r);for(let i=0;i<a.values.length;i++)a.values[i]=s.nextValue();return a.toTensor()}var Ob=C({randomGamma_:yF});function bF(o,e=0,t=1,r,n){if(Be(o),r!=null&&r==="bool")throw new Error(`Unsupported data type ${r}`);let s=new gs(e,t,r,!1,n),a=oe(o,r);for(let i=0;i<a.values.length;i++)a.values[i]=s.nextValue();return a.toTensor()}var Nu=C({randomNormal_:bF});function _F(o,e,t){if(e!=null&&e==="bool")throw new Error(`Unsupported data type ${e}`);return Nu(o,0,1,e,t)}var Pb=C({randomStandardNormal_:_F});function TF(o,e=0,t=1,r="float32",n){Be(o);let s=oe(o,r),a=new wu(e,t,null,n);for(let i=0;i<s.values.length;i++)s.values[i]=a.nextValue();return s.toTensor()}var Wi=C({randomUniform_:TF});function vF(o,e,t,r){return Wi(o,e,t,"int32",r)}var Vb=C({randomUniformInt_:vF});function Fr(o,e,t=1,r="float32"){if(t===0)throw new Error("Cannot have a step of zero");let n={start:o,stop:e,step:t,dtype:r};return S.runKernel(Ja,{},n)}function wF(o){let t={input:T(o,"input","real")};return S.runKernel(ei,t)}var nr=C({real_:wF});function CF(o){let t={x:T(o,"x","reciprocal")};return S.runKernel(Dn,t)}var Lb=C({reciprocal_:CF});function NF(o){let t={x:T(o,"x","relu")};return S.runKernel(Rn,t)}var Dr=C({relu_:NF});function SF(o){let t={x:T(o,"x","relu6")};return S.runKernel(On,t)}var Su=C({relu6_:SF});function IF(o,e){let r={x:T(o,"x","reverse")},n={dims:e};return S.runKernel(ni,r,n)}var to=C({reverse_:IF});function kF(o){let e=T(o,"x","reverse");return I(e.rank===1,()=>`Error in reverse1D: x must be rank 1 but got rank ${e.rank}.`),to(e,0)}var Mb=C({reverse1d_:kF});function EF(o,e){let t=T(o,"x","reverse");return I(t.rank===2,()=>`Error in reverse2D: x must be rank 2 but got rank ${t.rank}.`),to(t,e)}var Bb=C({reverse2d_:EF});function $F(o,e){let t=T(o,"x","reverse");return I(t.rank===3,()=>`Error in reverse3D: x must be rank 3 but got rank ${t.rank}.`),to(t,e)}var zb=C({reverse3d_:$F});function AF(o,e){let t=T(o,"x","reverse");return I(t.rank===4,()=>`Error in reverse4D: x must be rank 4 but got rank ${t.rank}.`),to(t,e)}var Ub=C({reverse4d_:AF});function FF(o){let t={x:T(o,"x","round")};return S.runKernel(Pn,t)}var Iu=C({round_:FF});function DF(o){let t={x:T(o,"x","rsqrt","float32")};return S.runKernel(Vn,t)}var Wb=C({rsqrt_:DF});function RF(o){let t={x:T(o,"x","selu")};return S.runKernel(Ln,t)}var Gb=C({selu_:RF});function OF(o,e,t,r,n,s=[1,1],a="NHWC"){let i=T(o,"x","separableConv2d"),p=T(e,"depthwiseFilter","separableConv2d"),l=T(t,"pointwiseFilter","separableConv2d"),u=i,c=!1;if(i.rank===3&&(c=!0,u=O(i,[1,i.shape[0],i.shape[1],i.shape[2]])),a==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");I(u.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${u.rank}.`),I(p.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${p.rank}.`),I(l.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${p.rank}.`),I(l.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${l.shape[0]}.`),I(l.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${l.shape[1]}.`);let m=p.shape[2],d=p.shape[3];I(l.shape[2]===m*d,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${m*d}, but got ${l.shape[2]}.`);let f=zi(u,p,r,n,a,s),h=kr(f,l,1,"valid",a);return c?O(h,[h.shape[1],h.shape[2],h.shape[3]]):h}var Hb=C({separableConv2d_:OF});async function PF(o,e){let t=T(o,"x","setdiff1d"),r=T(e,"y","setdiff1d");I(t.dtype===r.dtype,()=>`x and y should have the same dtype, but got x (${t.dtype}) and y (${r.dtype}).`),I(t.rank===1,()=>`x should be 1D tensor, but got x (${t.shape}).`),I(r.rank===1,()=>`y should be 1D tensor, but got y (${r.shape}).`);let n=await t.data(),s=await r.data(),a=new Set(s),i=0;for(let u=0;u<n.length;u++)a.has(n[u])||i++;let p=new Se([i],t.dtype),l=new Se([i],"int32");for(let u=0,c=0;u<n.length;u++)a.has(n[u])||(p.values[c]=n[u],l.values[c]=u,c++);return[p.toTensor(),l.toTensor()]}var qb=PF;function VF(o){let t={x:T(o,"x","sign")};return S.runKernel(zn,t)}var Kb=C({sign_:VF});function LF(o){let t={x:T(o,"x","sin","float32")};return S.runKernel(Mn,t)}var jb=C({sin_:LF});function MF(o){let t={x:T(o,"x","sinh")};return S.runKernel(Bn,t)}var Xb=C({sinh_:MF});function BF(o,e,t){let r=T(o,"x","slice1d");return I(r.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${r.rank} tensor`),Te(r,[e],[t])}var Qb=C({slice1d_:BF});function zF(o,e,t){let r=T(o,"x","slice2d");return I(r.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${r.rank} tensor`),Te(r,e,t)}var Yb=C({slice2d_:zF});function UF(o,e,t){let r=T(o,"x","slice3d");return I(r.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${r.rank} tensor`),Te(r,e,t)}var Zb=C({slice3d_:UF});function WF(o,e,t){let r=T(o,"x","slice4d");return I(r.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${r.rank} tensor`),Te(r,e,t)}var Jb=C({slice4d_:WF});function GF(o,e=-1){let t=T(o,"logits","softmax","float32");if(e===-1&&(e=t.rank-1),e!==t.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${t.rank} and dim was ${e}`);let r={logits:t},n={dim:e};return S.runKernel(di,r,n)}var ku=C({softmax_:GF});function HF(o){I(o.dtype==="complex64",()=>`The dtype for tf.spectral.fft() must be complex64 but got ${o.dtype}.`);let e={input:o};return S.runKernel(Ta,e)}var Gi=C({fft_:HF});function qF(o){I(o.dtype==="complex64",()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${o.dtype}.`);let e={input:o};return S.runKernel(Ia,e)}var xs=C({ifft_:qF});function KF(o){let e=o.shape[o.shape.length-1],t=o.size/e,r;if(e<=2){let n=O(o,[t,e]);r=xs(n)}else{let n=[t,2*(e-1)],s=O(nr(o),[t,e]),a=O(Ar(o),[t,e]),i=to(Te(s,[0,1],[t,e-2]),1),p=K(to(Te(a,[0,1],[t,e-2]),1),pe(-1)),l=Pe([s,i],1),u=Pe([a,p],1),c=O(At(l,u),[n[0],n[1]]);r=xs(c)}if(r=nr(r),o.rank===3&&o.shape[0]!==0){let n=r,s=o.shape[0];r=O(r,[s,r.shape[0]/s,r.shape[1]]),n.dispose()}return r}var Eu=C({irfft_:KF});function jF(o,e,t=0){let n={x:T(o,"x","split")},s={numOrSizeSplits:e,axis:t};return S.runKernel(mi,n,s)}var sr=C({split_:jF});function XF(o,e){I(o.dtype==="float32",()=>`The dtype for rfft() must be real value but got ${o.dtype}`);let t=o.shape[o.shape.length-1],r=o.size/t,n;if(e!=null&&e<t){let f=o.shape.map(h=>0),g=o.shape.map(h=>h);g[o.shape.length-1]=e,n=Te(o,f,g),t=e}else if(e!=null&&e>t){let f=o.shape.map(g=>g);f[o.shape.length-1]=e-t,n=Pe([o,qt(f)],o.shape.length-1),t=e}else n=o;let s=nt(n),a=O(At(n,s),[r,t]),i=Gi(a),p=Math.floor(t/2)+1,l=nr(i),u=Ar(i),c=sr(l,[p,t-p],l.shape.length-1),m=sr(u,[p,t-p],u.shape.length-1),d=n.shape.slice();return d[n.shape.length-1]=p,O(At(c[0],m[0]),d)}var Hi=C({rfft_:XF});function QF(o,e){let t=T(o,"a","squaredDifference"),r=T(e,"b","squaredDifference");[t,r]=he(t,r),Ie(t.shape,r.shape);let n={a:t,b:r},s={};return S.runKernel(Hn,n,s)}var $u=C({squaredDifference_:QF});function YF(o,e){let t=T(o,"x","squeeze","string_or_numeric");return O(t,Fd(t.shape,e).newShape)}var qi=C({squeeze_:YF});function ZF(o,e=0){let t=as(o,"tensors","stack","string_or_numeric");I(t.length>=1,()=>"Pass at least one tensor to tf.stack"),t.length>0&&I(e<=t[0].rank,()=>"Axis must be <= rank of the tensor");let r=t,n={axis:e};return S.runKernel(qa,r,n)}var It=C({stack_:ZF});function JF(o,e=0){let r={x:T(o,"x","step")},n={alpha:e};return S.runKernel(Qn,r,n)}var Au=C({step_:JF});function eD(o,e,t,r,n=0,s=0,a=0,i=0,p=0){let u={x:T(o,"x","stridedSlice","string_or_numeric")},c={begin:e,end:t,strides:r,beginMask:n,endMask:s,ellipsisMask:a,newAxisMask:i,shrinkAxisMask:p};return S.runKernel(bi,u,c)}var e_=C({stridedSlice_:eD});function tD(o){let t={x:T(o,"x","tan","float32")};return S.runKernel(jn,t)}var t_=C({tan_:tD});function mt(o,e){Jt(o);let t=$t(o,e);if(t.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return Nt(o,null,t,e)}function Rr(o,e,t){if(Jt(o),e!=null&&e.length!==2)throw new Error("tensor2d() requires shape to have two numbers");let r=$t(o,t);if(r.length!==2&&r.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Nt(o,e,r,t)}function Fu(o,e,t){if(Jt(o),e!=null&&e.length!==3)throw new Error("tensor3d() requires shape to have three numbers");let r=$t(o,t);if(r.length!==3&&r.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return Nt(o,e,r,t)}function o_(o,e,t){if(Jt(o),e!=null&&e.length!==4)throw new Error("tensor4d() requires shape to have four numbers");let r=$t(o,t);if(r.length!==4&&r.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return Nt(o,e,r,t)}function r_(o,e,t){if(Jt(o),e!=null&&e.length!==5)throw new Error("tensor5d() requires shape to have five numbers");let r=$t(o,t);if(r.length!==5&&r.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return Nt(o,e,r,t)}function n_(o,e,t){if(Jt(o),e!=null&&e.length!==6)throw new Error("tensor6d() requires shape to have six numbers");let r=$t(o,t);if(r.length!==6&&r.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return e=e||r,Nt(o,e,r,t)}function s_(o,e,t){let r=e.rank>1?e.shape[e.rank-1]:1,n=e.rank>1?e.rank-1:1,s=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${t.shape}, indices.shape: ${e.shape}, shape: ${o}, sliceDim: ${r}, and batchDim: ${n}.`;if(t.rank<n)throw new Error(s+` update.rank < ${n}. `);if(o.length<r+(t.rank-n))throw new Error(s+` Output shape length < ${r+(t.rank-n)}`);if(t.rank!==n+o.length-r)throw new Error(s+` update.rank != ${n+o.length-r}`);for(let a=0;a<n;++a)if(t.shape[a]!==e.shape[a])throw new Error(s+` updates.shape[${a}] (${t.shape[a]}) != indices.shape[${a}] (${e.shape[a]}).`);for(let a=0;a<t.rank-n;++a)if(t.shape[a+n]!==o[a+r])throw new Error(s+` updates.shape[${a+n}] (${t.shape[a+n]}) != shape[${a+n}] (${o[a+n]})`)}function zp(o,e,t){if(e.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${e.rank}.`);if(o.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${o.rank}.`);if(e.dtype!=="int32")throw new Error(`The dtype of 'indices' should be int32, but got dtype: ${e.dtype}`);if(t.length<1)throw new Error(`Output rank must be greater or equal to 1, but got shape: ${t}`);if(t.length===0){if(e.size===0)throw new Error(`Indices specified for empty output. indices shape: ${e.shape}`);if(o.size===0)throw new Error(`Updates specified for empty output. updates shape: ${o.shape}`)}s_(t,e,o)}function oD(o,e,t){let r=e.shape.length,n=r>1?e.shape[r-1]:1,s=t.length,a=1;for(let c=n;c<s;++c)a*=t[c];let i=n<1?1:n,p=ge(e.shape)/i,l=[...ko(t.slice(0,n)),1],u=ge(t);return{sliceRank:n,numUpdates:p,sliceSize:a,strides:l,outputSize:u}}function rD(o,e,t){let r=T(o,"tensor","tensorScatterupdate"),n=T(e,"indices","tensorScatterupdate","int32"),s=T(t,"updates","tensorScatterupdate");if(zp(s,n,r.shape),r.dtype!==s.dtype)throw new Error(`tensor and updates must have the same dtype, instead they are ${r.dtype} and ${s.dtype}.`);let a={tensor:r,indices:n,updates:s},i={};return S.runKernel(ai,a,i)}var i_=C({tensorScatterUpdate_:rD});function nD(o,e=1,t=!0){let r=T(o,"x","topk");if(r.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");let n=r.shape[r.shape.length-1];if(e<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${e}`);if(e>n)throw new Error(`'k' passed to topk() must be <= the last dimension (${n}) but got ${e}`);let s={x:r},a={k:e,sorted:t},[i,p]=S.runKernel(wi,s,a);return{values:i,indices:p}}var p_=C({topk_:nD});function sD(o,e=0,t=1,r,n){if(Be(o),r!=null&&r==="bool")throw new Error("Unsupported data type $ { dtype }");let s=new gs(e,t,r,!0,n),a=oe(o,r);for(let i=0;i<a.values.length;i++)a.values[i]=s.nextValue();return a.toTensor()}var l_=C({truncatedNormal_:sD});function aD(o,e=0){let t=T(o,"x","unique","string_or_numeric");I(t.rank>0,()=>"The input tensor must be at least 1D");let r={x:t},n={axis:e},[s,a]=S.runKernel(Ni,r,n);return{values:s,indices:a}}var u_=C({unique_:aD});function iD(o,e,t){let r=T(o,"x","unsortedSegmentSum"),n=T(e,"segmentIds","unsortedSegmentSum","int32");I(Xo(t),()=>"numSegments must be of dtype int");let s={x:r,segmentIds:n},a={numSegments:t};return S.runKernel(Ii,s,a)}var c_=C({unsortedSegmentSum_:iD});function pD(o,e=0){let t=T(o,"x","unstack","string_or_numeric");I(e>=-t.shape.length&&e<t.shape.length,()=>`Axis = ${e} is not in [-${t.shape.length}, ${t.shape.length})`);let r={value:t},n={axis:e};return S.runKernel(Si,r,n)}var oo=C({unstack_:pD});function m_(o,e){return Bp(o,e,"right")}function d_(o,e=!0,t,r){return S.makeVariable(o,e,t,r)}function Du(o,e){let t=[];for(let s=0;s<e.length;s++)e[s]&&t.push(s);let r=oe(o,"int32"),n=oe([t.length,o.length],"int32");for(let s=0;s<t.length;s++){let a=r.indexToLoc(t[s]),i=s*o.length;n.values.set(a,i)}return n.toTensor()}async function lD(o){let e=T(o,"condition","whereAsync","bool"),t=await e.data(),r=Du(e.shape,t);return o!==e&&e.dispose(),r}var Ru=lD;async function uD(o,e,t){let r=T(o,"tensor","boolMask"),n=T(e,"mask","boolMask","bool"),s=t??0,a=n.rank,i=r.shape;I(a>0,()=>"mask cannot be scalar"),Ke(i.slice(s,s+a),n.shape,"mask's shape must match the first K dimensions of tensor's shape,");let p=1;for(let g=s;g<s+a;g++)p*=i[g];let l=i.slice(0,s).concat([p],i.slice(s+a)),u=O(r,l),c=O(n,[-1]),m=await Ru(c),d=qi(m,[1]),f=iu(u,d,s);return o!==r&&r.dispose(),e!==n&&n.dispose(),d.dispose(),u.dispose(),c.dispose(),m.dispose(),f}var cD=uD;function mD(o,e,t){let r=T(o,"x","transpose");if(e==null&&(e=r.shape.map((a,i)=>i).reverse()),I(r.rank===e.length,()=>`Error in transpose: rank of input ${r.rank} must match length of perm ${e}.`),e.forEach(a=>{I(a>=0&&a<r.rank,()=>`All entries in 'perm' must be between 0 and ${r.rank-1} but got ${e}`)}),r.rank<=1)return r.clone();let n={x:r},s={perm:e};return r.dtype==="complex64"?fe(()=>{let a=nr(r),i=Ar(r);return a=S.runKernel(_r,{x:a},s),i=S.runKernel(_r,{x:i},s),t&&(i=xt(i)),At(a,i)}):S.runKernel(_r,n,s)}var Ou=C({transpose_:mD});function dD(o,e,t,r,n=!0){let s=T(o,"v","movingAverage"),a=T(e,"x","movingAverage"),i=T(t,"decay","movingAverage");gx(s,a),I(Ut(s.shape,a.shape),()=>"Shape mismatch in v and x");let p=pe(1),l=ue(p,i),u=K(ue(a,s),l);if(n){I(r!=null,()=>"When using zeroDebias: true, step is required.");let c=T(r,"step","movingAverage");u=_e(u,ue(p,or(i,c)))}return se(s,u)}var fD=C({movingAverage_:dD});function hD(o,e,t){Be(t);let r=T(o,"indices","scatterND","int32"),n=T(e,"updates","scatterND");zp(n,r,t);let s={indices:r,updates:n},a={shape:t};return S.runKernel(si,s,a)}var gD=C({scatterND_:hD});function f_(o,e,t,r){if(o.dtype!=="int32")throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${o.dtype}.`);if(o.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${o.shape}.`);let n=o.rank>0?o.shape[0]:1,s=o.rank>1?o.shape[1]:1;if(t.length!==s)throw new Error(`outputShape has incorrect number of elements:, ${t.length}, should be: ${s}.`);let a=e.size;if(!(e.rank===0||e.rank===1&&a===n))throw new Error(`sparseValues has incorrect shape ${e.shape}, should be [] or [${n}]`);if(e.dtype!==r.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}function yD(o,e,t,r=0){Be(t);let n=T(o,"sparseIndices","sparseToDense","int32"),s=T(e,"sparseValues","sparseToDense","string_or_numeric"),a=T(r,"defaultValue","sparseToDense",s.dtype);f_(n,s,t,a);let i={sparseIndices:n,sparseValues:s,defaultValue:a},p={outputShape:t};return S.runKernel(yi,i,p)}var bD=C({sparseToDense_:yD});function _D(o,e){let t=T(e,"indices","gatherND","int32"),n={params:T(o,"x","gatherND","string_or_numeric"),indices:t};return S.runKernel(Sa,n)}var TD=C({gatherND_:_D});function h_(o,e){if(e==null)return o.shape.slice();if(Ut(o.shape,e))return e;if(o.shape.length===e.length){let t=[];for(let r=0;r<o.shape.length;r++)e[r]==null&&o.shape[r]!=null?t.push(o.shape[r]):t.push(e[r]);return t}return e}function vD(o,e,t,r){let n=T(o,"x","dropout");if(I(n.dtype==="float32",()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${n.dtype} tensor instead.`),I(e>=0&&e<1,()=>`rate must be a float in the range [0, 1), but got ${e}.`),e===0)return o instanceof Oe?n.clone():n;let s=h_(n,t),a=1-e,i=_e(au(se(Wi(s,0,1,"float32",r),a)),a);return K(n,i)}var wD=C({dropout_:vD});function Ef(o){return Math.floor(Math.pow(2,Math.ceil(Math.log(o)/Math.log(2))))}function Up(o,e,t){let r=1-o%2,n=new Float32Array(o);for(let s=0;s<o;++s){let a=2*Math.PI*s/(o+r-1);n[s]=e-t*Math.cos(a)}return mt(n,"float32")}async function CD(o,e,t=1){let r=T(o,"predictions","inTopK"),n=T(e,"targets","inTopK");I(r.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${r.rank}`),I(r.rank-1===n.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${r.rank} and targets rank ${n.rank}`),Ke(r.shape.slice(0,r.shape.length-1),n.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");let s=r.shape[r.shape.length-1];I(t>0&&t<=s,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${s}), but got ${t}`);let a=await r.data(),i=await n.data(),[p,l]=[a.length/s,s],u=Dd("bool",p);for(let c=0;c<p;c++){let m=c*l,d=a.subarray(m,m+l),f=[];for(let g=0;g<d.length;g++)f.push({value:d[g],index:g});f.sort((g,h)=>h.value-g.value),u[c]=0;for(let g=0;g<t;g++)if(f[g].index===i[c]){u[c]=1;break}}return o!==r&&r.dispose(),e!==n&&n.dispose(),St(u,n.shape,"bool")}var ND=CD;var $f={};Fe($f,{conv2d:()=>x_,depthwiseConv2d:()=>__,matMul:()=>T_});function SD(o,e,t,r,n,s="NHWC",a){let i=o;o.rank===3&&(i=O(o,[1,o.shape[0],o.shape[1],o.shape[2]]));let p=e;p.rank===3&&(p=O(e,[1,e.shape[0],e.shape[1],e.shape[2]])),I(i.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${i.shape}.`),I(p.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${p.shape}.`),I(t.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${t}.`);let l=s==="NHWC"?i.shape[3]:i.shape[1],u=s==="NHWC"?p.shape[3]:p.shape[1];I(l===t[2],()=>`Error in conv2dDerFilter: depth of input ${l}) must match input depth in filter (${t[2]}.`),I(u===t[3],()=>`Error in conv2dDerFilter: depth of dy (${u}) must match output depth for filter (${t[3]}).`),tt("conv2dDerFilter",n,a);let c={x:i,dy:p},m={strides:r,pad:n,dataFormat:s,dimRoundingMode:a,filterShape:t};return S.runKernel(sa,c,m)}var g_=C({conv2DBackpropFilter_:SD});function ys(o,e,t){if(t==null||t==="linear")return o;if(t==="relu")return K(o,Au(e));throw new Error(`Cannot compute gradient for fused activation ${t}.`)}function bs(o,e){let t=e,r=ou(o.shape,e.shape);return r.length>0&&(t=Ee(t,r)),O(t,o.shape)}function _s(o,e,t,r){if(e==="linear")return o;if(e==="relu")return Dr(o);if(e==="elu")return nu(o);if(e==="relu6")return Su(o);if(e==="prelu")return _u(o,t);if(e==="leakyrelu")return lu(o,r);if(e==="sigmoid")return Ro(o);throw new Error(`Unknown fused activation ${e}.`)}var Ts=(o,e)=>!(o>0)||e==="linear";function ID({x:o,filter:e,strides:t,pad:r,dataFormat:n="NHWC",dilations:s=[1,1],dimRoundingMode:a,bias:i,activation:p="linear",preluActivationWeights:l,leakyreluAlpha:u}){if(p=p||"linear",Ts(S.state.gradientDepth,p)===!1){I(n==="NHWC",()=>`Error in fused conv2d: got dataFormat of ${n} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let E=kr(o,e,t,r,n,s,a);return i!=null&&(E=se(E,i)),_s(E,p,l,u)}let c=T(o,"x","conv2d","float32"),m=T(e,"filter","conv2d","float32"),d=c,f=!1;c.rank===3&&(f=!0,d=O(c,[1,c.shape[0],c.shape[1],c.shape[2]])),I(d.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${d.rank}.`),I(m.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${m.rank}.`),tt("fused conv2d",r,a);let g=n==="NHWC"?d.shape[3]:d.shape[1];I(m.shape[2]===g,()=>`Error in conv2d: depth of input (${g}) must match input depth for filter ${m.shape[2]}.`),I(wt(t,s),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${t} and dilations '${s}'`);let h=ls(d.shape,m.shape,t,s,r,a),x;i!=null&&(x=T(i,"bias","fused conv2d"),[x]=he(x,c),n==="NHWC"?Ie(h.outShape,x.shape):(I(x.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${x.shape.length}.`),I(x.shape.length===0||x.shape[0]===h.outChannels||x.shape[0]===1,()=>`Error in fused conv2d: bias shape (${x.shape}) is not compatible with the number of output channels (${h.outChannels})`)));let b;if(l!=null){let E=l.shape;if(I(E.length<=1||E.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${E.length}.`),E.length===1)I(E[0]===1||E[0]===h.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${E}) is not compatible with the number of output channels (${h.outChannels}).`);else if(E.length===3)try{Ie(E,h.outShape)}catch{let A=`Error in fused conv2d: PReLU activation weights (${E}) is not compatible with the output shape of the conv2d (${h.outShape}).`;throw Error(A)}b=T(l,"prelu weights","fused conv2d")}let w=(E,$)=>{I(n==="NHWC",()=>`Error in gradient of fused conv2D: got dataFormat of ${n} but only NHWC is currently supported.`);let[A,D,R,P]=$,V=ys(E,R,p);I(ps(s),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${s}'`);let L=tu(D.shape,V,A,t,r),B=g_(D,V,A.shape,t,r),M=[L,B];if(P!=null){let W=bs(P,V);M.push(W)}return M},v={x:d,filter:m,bias:x,preluActivationWeights:b},k={strides:t,pad:r,dataFormat:n,dilations:s,dimRoundingMode:a,activation:p,leakyreluAlpha:u};return i==null?Rt(($,A,D)=>{let R=S.runKernel(Zn,v,k);return D([A,$,R]),f&&(R=O(R,[R.shape[1],R.shape[2],R.shape[3]])),{value:R,gradFunc:w}})(d,m):Rt(($,A,D,R)=>{let P=S.runKernel(Zn,v,k);return R([A,$,P,D]),f&&(P=O(P,[P.shape[1],P.shape[2],P.shape[3]])),{value:P,gradFunc:w}})(d,m,x)}var x_=C({fusedConv2d_:ID});function kD(o,e,t,r,n,s=[1,1],a){let i=o;o.rank===3&&(i=O(o,[1,o.shape[0],o.shape[1],o.shape[2]]));let p=e;p.rank===3&&(p=O(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let l={x:i,dy:p},u={strides:r,pad:n,dimRoundingMode:a,dilations:s,filterShape:t};return S.runKernel(ha,l,u)}var y_=C({depthwiseConv2dNativeBackpropFilter_:kD});function ED(o,e,t,r,n,s=[1,1],a){let i=e,p=!1;e.rank===3&&(p=!0,i=O(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let l={dy:i,filter:t},u={strides:r,pad:n,dimRoundingMode:a,dilations:s,inputShape:o},c=S.runKernel(ga,l,u);return p?O(c,[c.shape[1],c.shape[2],c.shape[3]]):c}var b_=C({depthwiseConv2dNativeBackpropInput_:ED});function $D({x:o,filter:e,strides:t,pad:r,dataFormat:n="NHWC",dilations:s=[1,1],dimRoundingMode:a,bias:i,activation:p="linear",preluActivationWeights:l,leakyreluAlpha:u}){if(Ts(S.state.gradientDepth,p)===!1){let k=zi(o,e,t,r,n,s,a);return i!=null&&(k=se(k,i)),_s(k,p,l,u)}let c=T(o,"x","depthwiseConv2d","float32"),m=T(e,"filter","depthwiseConv2d","float32"),d=c,f=!1;c.rank===3&&(f=!0,d=O(c,[1,c.shape[0],c.shape[1],c.shape[2]])),I(d.rank===4,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${d.rank}.`),I(m.rank===4,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${m.rank}.`),I(d.shape[3]===m.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${d.shape[3]}) must match the inChannels dimension in filter ${m.shape[2]}.`),s==null&&(s=[1,1]),I(wt(t,s),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${t} and dilations '${s}'`),tt("fused depthwiseConv2d",r,a);let g=ls(d.shape,m.shape,t,s,r,a,!0),h;i!=null&&(h=T(i,"bias","fused conv2d"),[h]=he(h,c),Ie(g.outShape,h.shape));let x;l!=null&&(x=T(l,"prelu weights","fused depthwiseConv2d"));let b=(k,E)=>{I(ps(s),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${s}'`);let[$,A,D,R]=E,P=ys(k,D,p),V=b_(A.shape,P,$,t,r,s,a),L=y_(A,P,$.shape,t,r,s,a);if(R!=null){let B=bs(h,P);return[V,L,B]}return[V,L]},w={x:d,filter:m,bias:h,preluActivationWeights:x},v={strides:t,pad:r,dataFormat:n,dilations:s,dimRoundingMode:a,activation:p,leakyreluAlpha:u};return i==null?Rt((E,$,A)=>{let D=S.runKernel(Jn,w,v);return A([$,E,D]),f&&(D=O(D,[D.shape[1],D.shape[2],D.shape[3]])),{value:D,gradFunc:b}})(d,m):Rt((E,$,A,D)=>{let R=S.runKernel(Jn,w,v);return D([$,E,R,A]),f&&(R=O(R,[R.shape[1],R.shape[2],R.shape[3]])),{value:R,gradFunc:b}})(d,m,h)}var __=C({fusedDepthwiseConv2d_:$D});function AD({a:o,b:e,transposeA:t=!1,transposeB:r=!1,bias:n,activation:s="linear",preluActivationWeights:a,leakyreluAlpha:i=.2}){if(Ts(S.state.gradientDepth,s)===!1){let P=ke(o,e,t,r);return n!=null&&(P=se(P,n)),_s(P,s,a,i)}let p=T(o,"a","fused matMul"),l=T(e,"b","fused matMul");[p,l]=he(p,l);let u=t?p.shape[p.rank-2]:p.shape[p.rank-1],c=r?l.shape[l.rank-1]:l.shape[l.rank-2],m=t?p.shape[p.rank-1]:p.shape[p.rank-2],d=r?l.shape[l.rank-2]:l.shape[l.rank-1],f=p.shape.slice(0,-2),g=l.shape.slice(0,-2),h=ge(f),x=ge(g);I(u===c,()=>`Error in fused matMul: inner shapes (${u}) and (${c}) of Tensors with shapes ${p.shape} and ${l.shape} and transposeA=${t} and transposeB=${r} must match.`);let w=Ie(p.shape.slice(0,-2),l.shape.slice(0,-2)).concat([m,d]),v=t?O(p,[h,u,m]):O(p,[h,m,u]),k=r?O(l,[x,d,c]):O(l,[x,c,d]),E;n!=null&&(E=T(n,"bias","fused matMul"),[E]=he(E,p),Ie(w,E.shape));let $;a!=null&&($=T(a,"prelu weights","fused matMul"));let A=(P,V)=>{let[L,B,M,W]=V,G=ys(O(P,M.shape),M,s),z,H;if(!t&&!r?(z=ke(G,B,!1,!0),H=ke(L,G,!0,!1)):!t&&r?(z=ke(G,B,!1,!1),H=ke(G,L,!0,!1)):t&&!r?(z=ke(B,G,!1,!0),H=ke(L,G,!1,!1)):(z=ke(B,G,!0,!0),H=ke(G,L,!0,!0)),n!=null){let j=bs(W,G);return[z,H,j]}else return[z,H]},D={a:v,b:k,bias:E,preluActivationWeights:$},R={transposeA:t,transposeB:r,activation:s,leakyreluAlpha:i};return n==null?Rt((V,L,B)=>{let M=S.runKernel(Yn,D,R);return B([V,L,M]),{value:O(M,w),gradFunc:A}})(v,k):Rt((V,L,B,M)=>{let W=S.runKernel(Yn,D,R);return M([V,L,W,B]),{value:O(W,w),gradFunc:A}})(v,k,E)}var T_=C({fusedMatMul_:AD});function FD(o){return Up(o,.54,.46)}var v_=C({hammingWindow_:FD});function DD(o){return Up(o,.5,.5)}var Pu=C({hannWindow_:DD});function RD(o,e,t,r=!1,n=0){let s=0,a=[];for(;s+e<=o.size;)a.push(Te(o,s,e)),s+=t;if(r)for(;s<o.size;){let i=s+e-o.size,p=Pe([Te(o,s,e-i),Oo([i],n)]);a.push(p),s+=t}return a.length===0?Rr([],[0,e]):O(Pe(a),[a.length,e])}var Vu=C({frame_:RD});function OD(o,e,t,r,n=Pu){r==null&&(r=Ef(e));let s=Vu(o,e,t),a=K(s,n(e));return Hi(a,r)}var w_=C({stft_:OD});function PD(o,e,t,r,n="bilinear",s=0){let a=T(o,"image","cropAndResize"),i=T(e,"boxes","cropAndResize","float32"),p=T(t,"boxInd","cropAndResize","int32"),l=i.shape[0];I(a.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${a.rank}.`),I(i.rank===2&&i.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${l},4] but had shape ${i.shape}.`),I(p.rank===1&&p.shape[0]===l,()=>`Error in cropAndResize: boxInd must be have size [${l}] but had shape ${i.shape}.`),I(r.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${r.length}.`),I(r[0]>=1&&r[1]>=1,()=>`cropSize must be atleast [1,1], but was ${r}`),I(n==="bilinear"||n==="nearest",()=>`method must be bilinear or nearest, but was ${n}`);let u={image:a,boxes:i,boxInd:p},c={method:n,extrapolationValue:s,cropSize:r};return S.runKernel(ca,u,c)}var C_=C({cropAndResize_:PD});function VD(o){let e=T(o,"image","flipLeftRight","float32");I(e.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${e.rank}.`);let t={image:e};return S.runKernel(wa,t,{})}var N_=C({flipLeftRight_:VD});function LD(o){let e=T(o,"image","grayscaleToRGB"),t=e.rank-1,r=e.shape[t];I(e.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${e.rank}.`),I(r===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${r}.`);let n=new Array(e.rank);return n.fill(1,0,t),n[t]=3,$r(e,n)}var S_=C({grayscaleToRGB_:LD});function MD(o){let e=T(o,"image","RGBToGrayscale"),t=e.rank-1,r=e.shape[t];I(e.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${e.rank}.`),I(r===3,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${r}.`);let n=e.dtype,s=we(e,"float32"),a=mt([.2989,.587,.114]),i;switch(e.rank){case 2:i=Er("ij,j->i",s,a);break;case 3:i=Er("ijk,k->ij",s,a);break;case 4:i=Er("ijkl,l->ijk",s,a);break;case 5:i=Er("ijklm,m->ijkl",s,a);break;case 6:i=Er("ijklmn,n->ijklm",s,a);break;default:throw new Error("Not a valid tensor rank.")}return i=To(i,-1),we(i,n)}var I_=C({rgbToGrayscale_:MD});function BD(o,e,t=0,r=.5){let n=T(o,"image","rotateWithOffset","float32");I(n.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${n.rank}.`);let s={image:n},a={radians:e,fillValue:t,center:r};return S.runKernel(Ei,s,a)}var k_=C({rotateWithOffset_:BD});function uo(o,e,t,r,n,s){r==null&&(r=.5),n==null&&(n=Number.NEGATIVE_INFINITY),s==null&&(s=0);let a=o.shape[0];return t=Math.min(t,a),I(0<=r&&r<=1,()=>`iouThreshold must be in [0, 1], but was '${r}'`),I(o.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${o.rank}'`),I(o.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${o.shape[1]}`),I(e.rank===1,()=>"scores must be a 1D tensor"),I(e.shape[0]===a,()=>`scores has incompatible shape with boxes. Expected ${a}, but was ${e.shape[0]}`),I(0<=s&&s<=1,()=>`softNmsSigma must be in [0, 1], but was '${s}'`),{maxOutputSize:t,iouThreshold:r,scoreThreshold:n,softNmsSigma:s}}function zD(o,e,t,r=.5,n=Number.NEGATIVE_INFINITY){let s=T(o,"boxes","nonMaxSuppression","float32"),a=T(e,"scores","nonMaxSuppression","float32"),i=uo(s,a,t,r,n);t=i.maxOutputSize,r=i.iouThreshold,n=i.scoreThreshold;let p={maxOutputSize:t,iouThreshold:r,scoreThreshold:n};return S.runKernel(za,{boxes:s,scores:a},p)}var E_=C({nonMaxSuppression_:zD});function $_(o,e,t){let r=UD(o,e,t),n=r<0?-(r+1):r;o.splice(n,0,e)}function UD(o,e,t){return GD(o,e,t||WD)}function WD(o,e){return o>e?1:o<e?-1:0}function GD(o,e,t){let r=0,n=o.length,s=0,a=!1;for(;r<n;){s=r+(n-r>>>1);let i=t(e,o[s]);i>0?r=s+1:(n=s,a=!i)}return a?r:-r-1}function Lu(o,e,t,r,n){return Af(o,e,t,r,n,0)}function Mu(o,e,t,r,n,s){return Af(o,e,t,r,n,0,!1,s,!0)}function Bu(o,e,t,r,n,s){return Af(o,e,t,r,n,s,!0)}function Af(o,e,t,r,n,s,a=!1,i=!1,p=!1){let l=[];for(let h=0;h<e.length;h++)e[h]>n&&l.push({score:e[h],boxIndex:h,suppressBeginIndex:0});l.sort(A_);let u=s>0?-.5/s:0,c=[],m=[];for(;c.length<t&&l.length>0;){let h=l.pop(),{score:x,boxIndex:b,suppressBeginIndex:w}=h;if(x<n)break;let v=!1;for(let k=c.length-1;k>=w;--k){let E=HD(o,b,c[k]);if(E>=r){v=!0;break}if(h.score=h.score*qD(r,u,E),h.score<=n)break}h.suppressBeginIndex=c.length,v||(h.score===x?(c.push(b),m.push(h.score)):h.score>n&&$_(l,h,A_))}let d=c.length,f=t-d;i&&f>0&&(c.push(...new Array(f).fill(0)),m.push(...new Array(f).fill(0)));let g={selectedIndices:c};return a&&(g.selectedScores=m),p&&(g.validOutputs=d),g}function HD(o,e,t){let r=o.subarray(e*4,e*4+4),n=o.subarray(t*4,t*4+4),s=Math.min(r[0],r[2]),a=Math.min(r[1],r[3]),i=Math.max(r[0],r[2]),p=Math.max(r[1],r[3]),l=Math.min(n[0],n[2]),u=Math.min(n[1],n[3]),c=Math.max(n[0],n[2]),m=Math.max(n[1],n[3]),d=(i-s)*(p-a),f=(c-l)*(m-u);if(d<=0||f<=0)return 0;let g=Math.max(s,l),h=Math.max(a,u),x=Math.min(i,c),b=Math.min(p,m),w=Math.max(x-g,0)*Math.max(b-h,0);return w/(d+f-w)}function qD(o,e,t){let r=Math.exp(e*t*t);return t<=o?r:0}function A_(o,e){return o.score-e.score||o.score===e.score&&e.boxIndex-o.boxIndex}async function KD(o,e,t,r=.5,n=Number.NEGATIVE_INFINITY){let s=T(o,"boxes","nonMaxSuppressionAsync"),a=T(e,"scores","nonMaxSuppressionAsync"),i=uo(s,a,t,r,n);t=i.maxOutputSize,r=i.iouThreshold,n=i.scoreThreshold;let p=await Promise.all([s.data(),a.data()]),l=p[0],u=p[1],{selectedIndices:c}=Lu(l,u,t,r,n);return s!==o&&s.dispose(),a!==e&&a.dispose(),mt(c,"int32")}var F_=KD;function jD(o,e,t,r=.5,n=Number.NEGATIVE_INFINITY,s=0){let a=T(o,"boxes","nonMaxSuppression"),i=T(e,"scores","nonMaxSuppression"),p=uo(a,i,t,r,n,s);t=p.maxOutputSize,r=p.iouThreshold,n=p.scoreThreshold,s=p.softNmsSigma;let l={boxes:a,scores:i},u={maxOutputSize:t,iouThreshold:r,scoreThreshold:n,softNmsSigma:s},c=S.runKernel(Wa,l,u);return{selectedIndices:c[0],selectedScores:c[1]}}var D_=C({nonMaxSuppressionWithScore_:jD});async function XD(o,e,t,r=.5,n=Number.NEGATIVE_INFINITY,s=0){let a=T(o,"boxes","nonMaxSuppressionAsync"),i=T(e,"scores","nonMaxSuppressionAsync"),p=uo(a,i,t,r,n,s);t=p.maxOutputSize,r=p.iouThreshold,n=p.scoreThreshold,s=p.softNmsSigma;let l=await Promise.all([a.data(),i.data()]),u=l[0],c=l[1],{selectedIndices:m,selectedScores:d}=Bu(u,c,t,r,n,s);return a!==o&&a.dispose(),i!==e&&i.dispose(),{selectedIndices:mt(m,"int32"),selectedScores:mt(d)}}var R_=XD;function QD(o,e,t,r=.5,n=Number.NEGATIVE_INFINITY,s=!1){let a=T(o,"boxes","nonMaxSuppression"),i=T(e,"scores","nonMaxSuppression"),p=uo(a,i,t,r,n,null),l=p.maxOutputSize,u=p.iouThreshold,c=p.scoreThreshold,m={boxes:a,scores:i},d={maxOutputSize:l,iouThreshold:u,scoreThreshold:c,padToMaxOutputSize:s},f=S.runKernel(Ua,m,d);return{selectedIndices:f[0],validOutputs:f[1]}}var O_=C({nonMaxSuppressionPadded_:QD});async function YD(o,e,t,r=.5,n=Number.NEGATIVE_INFINITY,s=!1){let a=T(o,"boxes","nonMaxSuppressionAsync"),i=T(e,"scores","nonMaxSuppressionAsync"),p=uo(a,i,t,r,n,null),l=p.maxOutputSize,u=p.iouThreshold,c=p.scoreThreshold,[m,d]=await Promise.all([a.data(),i.data()]),{selectedIndices:f,validOutputs:g}=Mu(m,d,l,u,c,s);return a!==o&&a.dispose(),i!==e&&i.dispose(),{selectedIndices:mt(f,"int32"),validOutputs:pe(g,"int32")}}var P_=YD;function ZD(o,e,t=!1,r=!1){let n=T(o,"images","resizeBilinear");I(n.rank===3||n.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${n.rank}.`),I(e.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${e}.`),I(r===!1||t===!1,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let s=n,a=!1;n.rank===3&&(a=!0,s=O(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let[]=e,i={images:s},p={alignCorners:t,halfPixelCenters:r,size:e},l=S.runKernel(ri,i,p);return a?O(l,[l.shape[1],l.shape[2],l.shape[3]]):l}var V_=C({resizeBilinear_:ZD});function JD(o,e,t=!1,r=!1){let n=T(o,"images","resizeNearestNeighbor");I(n.rank===3||n.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${n.rank}.`),I(e.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${e}.`),I(n.dtype==="float32"||n.dtype==="int32",()=>"`images` must have `int32` or `float32` as dtype"),I(r===!1||t===!1,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let s=n,a=!1;n.rank===3&&(a=!0,s=O(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let[]=e,i={images:s},p={alignCorners:t,halfPixelCenters:r,size:e},l=S.runKernel(oi,i,p);return a?O(l,[l.shape[1],l.shape[2],l.shape[3]]):l}var L_=C({resizeNearestNeighbor_:JD});function eR(o,e="binary",t=!1,r=.5){let n=T(o,"image","threshold"),s=.2989,a=.587,i=.114,p=n.shape[0]*n.shape[1],l=K(mt([r]),255),u,c,m,d;if(I(n.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${n.rank}.`),I(n.shape[2]===3||n.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${n.shape[2]}.`),I(n.dtype==="int32"||n.dtype==="float32",()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${n.dtype}.`),I(e==="otsu"||e==="binary",()=>`Method must be binary or otsu, but was ${e}`),n.shape[2]===3){[u,c,m]=sr(n,[1,1,1],-1);let h=K(u,s),x=K(c,a),b=K(m,i);d=se(se(h,x),b)}else d=o;if(e==="otsu"){let h=eu(we(Iu(d),"int32"),St([]),256);l=tR(h,p)}let f=t?Ui(d,l):cs(d,l);return we(K(f,255),"int32")}function tR(o,e){let t=mt([-1]),r=mt([0]),n=mt([0]),s,a,i,p,l,u;for(let c=0;c<o.size-1;c++){s=Te(o,0,c+1),a=Te(o,c+1),l=_e(Ee(s),e),u=_e(Ee(a),e);let m=Ee(K(s,Fr(0,s.size)));i=_e(m,Ee(s));let d=Oo(a.shape,s.size),f=se(Fr(0,a.size),d),g=K(a,f);p=_e(Ee(g),Ee(a));let h=ue(i,p),x=ue(i,p),b=K(l,u);n=K(K(b,h),x);let w=cs(n,r);r=eo(w,n,r),t=eo(w,mt([c]),t)}return t}var M_=C({threshold_:eR});function oR(o,e,t="nearest",r="constant",n=0,s){let a=T(o,"image","transform","float32"),i=T(e,"transforms","transform","float32");I(a.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${a.rank}.`),I(i.rank===2&&(i.shape[0]===a.shape[0]||i.shape[0]===1)&&i.shape[1]===8,()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),I(s==null||s.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${s}.`);let p={image:a,transforms:i},l={interpolation:t,fillMode:r,fillValue:n,outputShape:s};return S.runKernel(Ci,p,l)}var B_=C({transform_:oR});function rR(o,e,t){let r=T(o,"a","bandPart");I(r.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${r.rank}.`);let n=r.shape,[s,a]=r.shape.slice(-2),i,p;typeof e=="number"?(I(e%1===0,()=>`bandPart(): numLower must be an integer, got ${e}.`),I(e<=s,()=>`bandPart(): numLower (${e}) must not be greater than the number of rows (${s}).`),i=T(e<0?s:e,"numLower","bandPart")):(I(e.dtype==="int32",()=>"bandPart(): numLower's dtype must be an int32."),i=eo(Mp(e,0),s,fs(e,s))),typeof t=="number"?(I(t%1===0,()=>`bandPart(): numUpper must be an integer, got ${t}.`),I(t<=a,()=>`bandPart(): numUpper (${t}) must not be greater than the number of columns (${a}).`),p=T(t<0?a:t,"numUpper","bandPart")):(I(t.dtype==="int32",()=>"bandPart(): numUpper's dtype must be an int32."),p=eo(Mp(t,0),a,fs(t,a)));let l=O(Fr(0,s,1,"int32"),[-1,1]),u=Fr(0,a,1,"int32"),c=ue(l,u),m=ms(Ui(c,i),pu(c,xt(p))),d=qt([s,a],r.dtype);return O(It(oo(O(r,[-1,s,a])).map(f=>eo(m,f,d))),n)}var z_=C({bandPart_:rR});function nR(o){let e;if(Array.isArray(o)){e=!1,I(o!=null&&o.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");let n=o[0].shape[0];for(let s=1;s<o.length;++s)I(o[s].shape[0]===n,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${o[s].shape[0]} vs. ${n})`)}else e=!0,o=sr(o,o.shape[0],0).map(n=>qi(n,[0]));I(o.length<=o[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${o.length}) exceeds number of dimensions (${o[0].shape[0]}).`);let t=[],r=o;for(let n=0;n<o.length;++n)t.push(S.tidy(()=>{let s=r[n];if(n>0)for(let a=0;a<n;++a){let i=K(Ee(K(t[a],s)),t[a]);s=ue(s,i)}return _e(s,us(s,"euclidean"))}));return e?It(t,0):t}var U_=C({gramSchmidt_:nR});function sR(o,e=!1){if(I(o.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${o.rank}`),o.rank===2)return W_(o,e);{let t=o.shape.slice(0,o.shape.length-2).reduce((p,l)=>p*l),r=oo(O(o,[t,o.shape[o.shape.length-2],o.shape[o.shape.length-1]]),0),n=[],s=[];r.forEach(p=>{let[l,u]=W_(p,e);n.push(l),s.push(u)});let a=O(It(n,0),o.shape),i=O(It(s,0),o.shape);return[a,i]}}function W_(o,e=!1){return S.tidy(()=>{I(o.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${o.shape.length}D Tensor.`);let t=o.shape[0],r=o.shape[1],n=su(t),s=Ht(o),a=Rr([[1]],[1,1]),i=Ht(a),p=t>=r?r:t;for(let l=0;l<p;++l){let u=s,c=i,m=n;[i,s,n]=S.tidy(()=>{let d=Te(s,[l,l],[t-l,1]),f=us(d),g=Te(s,[l,l],[1,1]),h=eo(cs(g,0),Rr([[-1]]),Rr([[1]])),x=ue(g,K(h,f)),b=_e(d,x);b.shape[0]===1?i=Ht(a):i=Pe([a,Te(b,[1,0],[b.shape[0]-1,b.shape[1]])],0);let w=xt(_e(ke(h,x),f)),v=Te(s,[l,0],[t-l,r]),k=K(w,i),E=Ou(i);if(l===0)s=ue(v,ke(k,ke(E,v)));else{let D=ue(v,ke(k,ke(E,v)));s=Pe([Te(s,[0,0],[l,r]),D],0)}let $=Ou(k),A=Te(n,[0,l],[t,n.shape[1]-l]);if(l===0)n=ue(A,ke(ke(A,i),$));else{let D=ue(A,ke(ke(A,i),$));n=Pe([Te(n,[0,0],[t,l]),D],1)}return[i,s,n]}),Ye([u,c,m])}return!e&&t>r&&(n=Te(n,[0,0],[t,r]),s=Te(s,[0,0],[r,r])),[n,s]})}var G_=C({qr_:sR});var Ze;(function(o){o[o.NONE=0]="NONE",o[o.MEAN=1]="MEAN",o[o.SUM=2]="SUM",o[o.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(Ze||(Ze={}));function aR(o,e,t=Ze.SUM_BY_NONZERO_WEIGHTS){let r=T(o,"losses","computeWeightedLoss"),n=null;e!=null&&(n=T(e,"weights","computeWeightedLoss"));let s=n==null?r:K(r,n);if(t===Ze.NONE)return s;if(t===Ze.SUM)return Ee(s);if(t===Ze.MEAN){if(n==null)return ds(s);{let a=r.size/n.size,i=_e(Ee(s),Ee(n));return a>1?_e(i,pe(a)):i}}if(t===Ze.SUM_BY_NONZERO_WEIGHTS){if(n==null)return _e(Ee(s),pe(r.size));{let a=K(n,Lo(r.shape)),i=we(Ee(yu(a,pe(0))),"float32");return _e(Ee(s),i)}}throw Error(`Unknown reduction: ${t}`)}var yt=C({computeWeightedLoss_:aR});function iR(o,e,t,r=Ze.SUM_BY_NONZERO_WEIGHTS){let n=T(o,"labels","absoluteDifference"),s=T(e,"predictions","absoluteDifference"),a=null;t!=null&&(a=T(t,"weights","absoluteDifference")),Ke(n.shape,s.shape,"Error in absoluteDifference: ");let i=ut(ue(n,s));return yt(i,a,r)}var H_=C({absoluteDifference_:iR});function pR(o,e,t,r,n=Ze.SUM_BY_NONZERO_WEIGHTS){let s=T(o,"labels","cosineDistance"),a=T(e,"predictions","cosineDistance"),i=null;r!=null&&(i=T(r,"weights","cosineDistance")),Ke(s.shape,a.shape,"Error in cosineDistance: ");let p=pe(1),l=ue(p,Ee(K(s,a),t,!0));return yt(l,i,n)}var q_=C({cosineDistance_:pR});function lR(o,e,t,r=Ze.SUM_BY_NONZERO_WEIGHTS){let n=T(o,"labels","hingeLoss"),s=T(e,"predictions","hingeLoss"),a=null;t!=null&&(a=T(t,"weights","hingeLoss")),Ke(n.shape,s.shape,"Error in hingeLoss: ");let i=pe(1);n=ue(K(pe(2),n),i);let p=Dr(ue(i,K(n,s)));return yt(p,a,r)}var K_=C({hingeLoss_:lR});function uR(o,e,t,r=1,n=Ze.SUM_BY_NONZERO_WEIGHTS){let s=T(o,"labels","huberLoss"),a=T(e,"predictions","huberLoss"),i=null;t!=null&&(i=T(t,"weights","huberLoss")),Ke(s.shape,a.shape,"Error in huberLoss: ");let p=pe(r),l=ut(ue(a,s)),u=fs(l,p),c=ue(l,u),m=se(K(pe(.5),ct(u)),K(p,c));return yt(m,i,n)}var j_=C({huberLoss_:uR});function cR(o,e,t,r=1e-7,n=Ze.SUM_BY_NONZERO_WEIGHTS){let s=T(o,"labels","logLoss"),a=T(e,"predictions","logLoss"),i=null;t!=null&&(i=T(t,"weights","logLoss")),Ke(s.shape,a.shape,"Error in logLoss: ");let p=pe(1),l=pe(r),u=xt(K(s,rr(se(a,l)))),c=K(ue(p,s),rr(se(ue(p,a),l))),m=ue(u,c);return yt(m,i,n)}var X_=C({logLoss_:cR});function mR(o,e,t,r=Ze.SUM_BY_NONZERO_WEIGHTS){let n=T(o,"labels","meanSquaredError"),s=T(e,"predictions","meanSquaredError"),a=null;t!=null&&(a=T(t,"weights","meanSquaredError")),Ke(n.shape,s.shape,"Error in meanSquaredError: ");let i=$u(n,s);return yt(i,a,r)}var Q_=C({meanSquaredError_:mR});function dR(o,e){let t=T(o,"labels","sigmoidCrossEntropyWithLogits"),r=T(e,"logits","sigmoidCrossEntropyWithLogits");Ke(t.shape,r.shape,"Error in sigmoidCrossEntropyWithLogits: ");let n=Dr(r),s=K(r,t),a=uu(lo(xt(ut(r))));return se(ue(n,s),a)}function fR(o,e,t,r=0,n=Ze.SUM_BY_NONZERO_WEIGHTS){let s=T(o,"multiClassLabels","sigmoidCrossEntropy"),a=T(e,"logits","sigmoidCrossEntropy"),i=null;if(t!=null&&(i=T(t,"weights","sigmoidCrossEntropy")),Ke(s.shape,a.shape,"Error in sigmoidCrossEntropy: "),r>0){let l=pe(r),u=pe(1),c=pe(.5);s=se(K(s,ue(u,l)),K(c,l))}let p=dR(s,a);return yt(p,i,n)}var Y_=C({sigmoidCrossEntropy_:fR});function hR(o,e,t=-1){if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${e.rank} and dim was ${t}`);return Rt((n,s,a)=>{let p=mu(s,[t],!0),l=ue(we(s,"float32"),p);a([n,l]);let u=xt(K(l,n));return{value:Ee(u,[t]),gradFunc:(d,f)=>{let[g,h]=f,x=tr(d.shape,[t]);return[K(O(d,x),ue(we(g,"float32"),lo(h))),K(O(d,x),ue(lo(h),we(g,"float32")))]}}})(o,e)}function gR(o,e,t,r=0,n=Ze.SUM_BY_NONZERO_WEIGHTS){let s=T(o,"onehotLabels","softmaxCrossEntropy"),a=T(e,"logits","softmaxCrossEntropy"),i=null;if(t!=null&&(i=T(t,"weights","softmaxCrossEntropy")),Ke(s.shape,a.shape,"Error in softmaxCrossEntropy: "),r>0){let l=pe(r),u=pe(1),c=pe(s.shape[1]);s=se(K(s,ue(u,l)),_e(l,c))}let p=hR(s,a);return yt(p,i,n)}var Z_=C({softmaxCrossEntropy_:gR});function xR(o,e,t,r){let n=T(o,"indices","sparseFillEmptyRows","int32"),s=T(e,"values","sparseFillEmptyRows"),a=T(t,"denseShape","sparseFillEmptyRows","int32"),i=T(r,"defaultValue","sparseFillEmptyRows",s.dtype);if(n.rank!==2)throw new Error(`Indices should be Tensor2D but received shape
        ${n.shape}`);if(s.rank!==1)throw new Error(`Values should be Tensor1D but received shape ${s.shape}`);if(a.rank!==1)throw new Error(`Dense shape should be Tensor1D but received shape ${a.shape}`);if(i.rank!==0)throw new Error(`Default value should be a scalar but received shape ${i.shape}`);let p={indices:n,values:s,denseShape:a,defaultValue:i},l=S.runKernel(fi,p);return{outputIndices:l[0],outputValues:l[1],emptyRowIndicator:l[2],reverseIndexMap:l[3]}}var J_=C({sparseFillEmptyRows_:xR});function yR(o,e,t){let r=T(o,"inputIndices","sparseReshape","int32"),n=T(e,"inputShape","sparseReshape","int32"),s=T(t,"newShape","sparseReshape","int32");if(r.rank!==2)throw new Error(`Input indices should be Tensor2D but received shape
        ${r.shape}`);if(n.rank!==1)throw new Error(`Input shape should be Tensor1D but received shape ${n.shape}`);if(s.rank!==1)throw new Error(`New shape should be Tensor1D but received shape ${s.shape}`);let a={inputIndices:r,inputShape:n,newShape:s},i=S.runKernel(hi,a);return{outputIndices:i[0],outputShape:i[1]}}var e1=C({sparseReshape_:yR});function bR(o,e,t){let r=T(o,"data","sparseSegmentMean"),n=T(e,"indices","sparseSegmentMean","int32"),s=T(t,"segmentIds","sparseSegmentMean","int32");if(r.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
          ${n.shape}`);if(s.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
          ${s.shape}`);let a={data:r,indices:n,segmentIds:s};return S.runKernel(gi,a)}var t1=C({sparseSegmentMean_:bR});function _R(o,e,t){let r=T(o,"data","sparseSegmentSum"),n=T(e,"indices","sparseSegmentSum","int32"),s=T(t,"segmentIds","sparseSegmentSum","int32");if(r.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
         ${n.shape}`);if(s.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
         ${s.shape}`);let a={data:r,indices:n,segmentIds:s};return S.runKernel(xi,a)}var o1=C({sparseSegmentSum_:_R});function TR(o,e,t,r,n,s,a,i){let p=T(o,"data","stringNGrams","string");if(p.dtype!=="string")throw new Error("Data must be of datatype string");if(p.shape.length!==1)throw new Error(`Data must be a vector, saw: ${p.shape}`);let l=T(e,"dataSplits","stringNGrams");if(l.dtype!=="int32")throw new Error("Data splits must be of datatype int32");let u={separator:t,nGramWidths:r,leftPad:n,rightPad:s,padWidth:a,preserveShortSequences:i},c={data:p,dataSplits:l},m=S.runKernel(_i,c,u);return{nGrams:m[0],nGramsSplits:m[1]}}var r1=C({stringNGrams_:TR});function vR(o,e,t=!0){let r=T(o,"input","stringSplit","string"),n=T(e,"delimiter","stringSplit","string");if(r.rank!==1)throw new Error(`Input should be Tensor1D but received shape ${r.shape}`);if(n.rank!==0)throw new Error(`Delimiter should be a scalar but received shape ${n.shape}`);let s={skipEmpty:t},a={input:r,delimiter:n},i=S.runKernel(Ti,a,s);return{indices:i[0],values:i[1],shape:i[2]}}var n1=C({stringSplit_:vR});function wR(o,e){let t=T(o,"input","stringToHashBucketFast","string"),r={numBuckets:e};if(e<=0)throw new Error("Number of buckets must be at least 1");let n={input:t};return S.runKernel(vi,n,r)}var s1=C({stringToHashBucketFast_:wR});function CR(o,e,t,r=!0){let n=T(o,"input","staticRegexReplace","string"),s={pattern:e,rewrite:t,replaceGlobal:r};return S.runKernel(qn,{x:n},s)}var a1=C({staticRegexReplace_:CR});var NR={fft:Gi,ifft:xs,rfft:Hi,irfft:Eu},SR={hammingWindow:v_,hannWindow:Pu,frame:Vu,stft:w_},IR={flipLeftRight:N_,grayscaleToRGB:S_,resizeNearestNeighbor:L_,resizeBilinear:V_,rgbToGrayscale:I_,rotateWithOffset:k_,cropAndResize:C_,nonMaxSuppression:E_,nonMaxSuppressionAsync:F_,nonMaxSuppressionWithScore:D_,nonMaxSuppressionWithScoreAsync:R_,nonMaxSuppressionPadded:O_,nonMaxSuppressionPaddedAsync:P_,threshold:M_,transform:B_},kR={bandPart:z_,gramSchmidt:U_,qr:G_},ER={absoluteDifference:H_,computeWeightedLoss:yt,cosineDistance:q_,hingeLoss:K_,huberLoss:j_,logLoss:X_,meanSquaredError:Q_,sigmoidCrossEntropy:Y_,softmaxCrossEntropy:Z_},$R={sparseFillEmptyRows:J_,sparseReshape:e1,sparseSegmentMean:t1,sparseSegmentSum:o1},AR={stringNGrams:r1,stringSplit:n1,stringToHashBucketFast:s1,staticRegexReplace:a1};var FR=new Map,DR=new Map,zu=class{getClassName(){return this.constructor.className}static fromConfig(e,t){return new e(t)}},Ff=class o{constructor(){this.classNameMap={}}static getMap(){return o.instance==null&&(o.instance=new o),o.instance}static register(e){o.getMap().classNameMap[e.className]=[e,e.fromConfig]}};function i1(o,e,t){I(o.className!=null,()=>"Class being registered does not have the static className property defined."),I(typeof o.className=="string",()=>"className is required to be a string, but got type "+typeof o.className),I(o.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),typeof e>"u"&&(e="Custom"),typeof t>"u"&&(t=o.className);let r=t,n=e+">"+r;return Ff.register(o),FR.set(n,o),DR.set(o,n),o}var Ot=class extends zu{minimize(e,t=!1,r){let{value:n,grads:s}=this.computeGradients(e,r);if(r!=null){let a=r.map(i=>({name:i.name,tensor:s[i.name]}));this.applyGradients(a)}else this.applyGradients(s);return Ye(s),t?n:(n.dispose(),null)}get iterations(){return this.iterations_==null&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,t){return Ky(e,t)}dispose(){this.iterations_!=null&&Ye(this.iterations_)}async saveIterations(){return this.iterations_==null&&(this.iterations_=0),{name:"iter",tensor:pe(this.iterations_,"int32")}}async getWeights(){throw new Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(e){throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(e){return this.iterations_=(await e[0].tensor.data())[0],e.slice(1)}};Object.defineProperty(Ot,Symbol.hasInstance,{value:o=>o.minimize!=null&&o.computeGradients!=null&&o.applyGradients!=null});var Uu=class extends Ot{static get className(){return"Adadelta"}constructor(e,t,r=null){super(),this.learningRate=e,this.rho=t,this.epsilon=r,this.accumulatedGrads=[],this.accumulatedUpdates=[],r==null&&(this.epsilon=S.backend.epsilon())}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,n)=>{let s=S.registeredVariables[r],a=!1;this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${r}/accum_grad`,variable:fe(()=>nt(s).variable(a))}),this.accumulatedUpdates[n]==null&&(this.accumulatedUpdates[n]={originalName:`${r}/accum_var`,variable:fe(()=>nt(s).variable(a))});let i=Array.isArray(e)?e[n].tensor:e[r];if(i==null)return;let p=this.accumulatedGrads[n].variable,l=this.accumulatedUpdates[n].variable;fe(()=>{let u=se(K(p,this.rho),K(ct(i),1-this.rho)),c=K(_e(Dt(se(l,this.epsilon)),Dt(se(p,this.epsilon))),i),m=se(K(l,this.rho),K(ct(c),1-this.rho));p.assign(u),l.assign(m);let d=se(K(c,-this.learningRate),s);s.assign(d)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(Ye(this.accumulatedGrads.map(e=>e.variable)),Ye(this.accumulatedUpdates.map(e=>e.variable)))}async getWeights(){let e=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(e.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=e.length/2,r=!1;this.accumulatedGrads=e.slice(0,t).map(n=>({originalName:n.name,variable:n.tensor.variable(r)})),this.accumulatedUpdates=e.slice(t,t*2).map(n=>({originalName:n.name,variable:n.tensor.variable(r)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.rho,t.epsilon)}};var Wu=class extends Ot{static get className(){return"Adagrad"}constructor(e,t=.1){super(),this.learningRate=e,this.initialAccumulatorValue=t,this.accumulatedGrads=[]}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,n)=>{let s=S.registeredVariables[r];this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${r}/accumulator`,variable:fe(()=>Oo(s.shape,this.initialAccumulatorValue).variable(!1))});let a=Array.isArray(e)?e[n].tensor:e[r];if(a==null)return;let i=this.accumulatedGrads[n].variable;fe(()=>{let p=se(i,ct(a));i.assign(p);let l=se(K(_e(a,Dt(se(p,S.backend.epsilon()))),-this.learningRate),s);s.assign(l)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&Ye(this.accumulatedGrads.map(e=>e.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=!1;this.accumulatedGrads=e.map(r=>({originalName:r.name,variable:r.tensor.variable(t)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,t){return new e(t.learningRate,t.initialAccumulatorValue)}};var Gu=class extends Ot{static get className(){return"Adam"}constructor(e,t,r,n=null){super(),this.learningRate=e,this.beta1=t,this.beta2=r,this.epsilon=n,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],fe(()=>{this.accBeta1=pe(t).variable(),this.accBeta2=pe(r).variable()}),n==null&&(this.epsilon=S.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(r=>r.name):Object.keys(e);fe(()=>{let r=ue(1,this.accBeta1),n=ue(1,this.accBeta2);t.forEach((s,a)=>{let i=S.registeredVariables[s],p=!1;this.accumulatedFirstMoment[a]==null&&(this.accumulatedFirstMoment[a]={originalName:`${s}/m`,variable:fe(()=>nt(i).variable(p))}),this.accumulatedSecondMoment[a]==null&&(this.accumulatedSecondMoment[a]={originalName:`${s}/v`,variable:fe(()=>nt(i).variable(p))});let l=Array.isArray(e)?e[a].tensor:e[s];if(l==null)return;let u=this.accumulatedFirstMoment[a].variable,c=this.accumulatedSecondMoment[a].variable,m=se(K(u,this.beta1),K(l,1-this.beta1)),d=se(K(c,this.beta2),K(ct(l),1-this.beta2)),f=_e(m,r),g=_e(d,n);u.assign(m),c.assign(d);let h=se(K(_e(f,se(Dt(g),this.epsilon)),-this.learningRate),i);i.assign(h)}),this.accBeta1.assign(K(this.accBeta1,this.beta1)),this.accBeta2.assign(K(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&Ye(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedSecondMoment!=null&&Ye(this.accumulatedSecondMoment.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(e.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(e){e=await this.extractIterations(e),fe(()=>{this.accBeta1.assign(or(this.beta1,this.iterations_+1)),this.accBeta2.assign(or(this.beta2,this.iterations_+1))});let t=e.length/2,r=!1;this.accumulatedFirstMoment=e.slice(0,t).map(n=>({originalName:n.name,variable:n.tensor.variable(r)})),this.accumulatedSecondMoment=e.slice(t,t*2).map(n=>({originalName:n.name,variable:n.tensor.variable(r)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)}};var Hu=class extends Ot{static get className(){return"Adamax"}constructor(e,t,r,n=null,s=0){super(),this.learningRate=e,this.beta1=t,this.beta2=r,this.epsilon=n,this.decay=s,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],fe(()=>{this.iteration=pe(0).variable(),this.accBeta1=pe(t).variable()}),n==null&&(this.epsilon=S.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(r=>r.name):Object.keys(e);fe(()=>{let r=ue(1,this.accBeta1),n=_e(-this.learningRate,se(K(this.iteration,this.decay),1));t.forEach((s,a)=>{let i=S.registeredVariables[s],p=!1;this.accumulatedFirstMoment[a]==null&&(this.accumulatedFirstMoment[a]={originalName:`${s}/m`,variable:nt(i).variable(p)}),this.accumulatedWeightedInfNorm[a]==null&&(this.accumulatedWeightedInfNorm[a]={originalName:`${s}/v`,variable:nt(i).variable(p)});let l=Array.isArray(e)?e[a].tensor:e[s];if(l==null)return;let u=this.accumulatedFirstMoment[a].variable,c=this.accumulatedWeightedInfNorm[a].variable,m=se(K(u,this.beta1),K(l,1-this.beta1)),d=K(c,this.beta2),f=ut(l),g=xu(d,f);u.assign(m),c.assign(g);let h=se(K(_e(n,r),_e(m,se(g,this.epsilon))),i);i.assign(h)}),this.iteration.assign(se(this.iteration,1)),this.accBeta1.assign(K(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&Ye(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedWeightedInfNorm!=null&&Ye(this.accumulatedWeightedInfNorm.map(e=>e.variable))}async getWeights(){throw new Error("getWeights() is not implemented for Adamax yet.")}async setWeights(e){throw new Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)}};var Ki=class extends Ot{static get className(){return"SGD"}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,n)=>{let s=Array.isArray(e)?e[n].tensor:e[r];if(s==null)return;let a=S.registeredVariables[r];fe(()=>{let i=se(K(this.c,s),a);a.assign(i)})}),this.incrementIterations()}setLearningRate(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=Ft(pe(-e))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(e){if(e=await this.extractIterations(e),e.length!==0)throw new Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,t){return new e(t.learningRate)}};var qu=class extends Ki{static get className(){return"Momentum"}constructor(e,t,r=!1){super(e),this.learningRate=e,this.momentum=t,this.useNesterov=r,this.accumulations=[],this.m=pe(this.momentum)}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,n)=>{let s=S.registeredVariables[r];this.accumulations[n]==null&&(this.accumulations[n]={originalName:`${r}/momentum`,variable:fe(()=>nt(s).variable(!1))});let a=this.accumulations[n].variable,i=Array.isArray(e)?e[n].tensor:e[r];i!=null&&fe(()=>{let p,l=se(K(this.m,a),i);this.useNesterov?p=se(K(this.c,se(i,K(l,this.m))),s):p=se(K(this.c,l),s),a.assign(l),s.assign(p)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&Ye(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=!1;this.accumulations=e.map(r=>({originalName:r.name,variable:r.tensor.variable(t)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)}};var Ku=class extends Ot{static get className(){return"RMSProp"}constructor(e,t=.9,r=0,n=null,s=!1){if(super(),this.learningRate=e,this.decay=t,this.momentum=r,this.epsilon=n,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=s,n==null&&(this.epsilon=S.backend.epsilon()),e==null)throw new Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,n)=>{let s=S.registeredVariables[r],a=!1;this.accumulatedMeanSquares[n]==null&&(this.accumulatedMeanSquares[n]={originalName:`${r}/rms`,variable:fe(()=>nt(s).variable(a))}),this.accumulatedMoments[n]==null&&(this.accumulatedMoments[n]={originalName:`${r}/momentum`,variable:fe(()=>nt(s).variable(a))}),this.accumulatedMeanGrads[n]==null&&this.centered&&(this.accumulatedMeanGrads[n]={originalName:`${r}/mg`,variable:fe(()=>nt(s).variable(a))});let i=Array.isArray(e)?e[n].tensor:e[r];if(i==null)return;let p=this.accumulatedMeanSquares[n].variable,l=this.accumulatedMoments[n].variable;fe(()=>{let u=se(K(p,this.decay),K(ct(i),1-this.decay));if(this.centered){let c=this.accumulatedMeanGrads[n].variable,m=se(K(c,this.decay),K(i,1-this.decay)),d=_e(K(i,this.learningRate),Dt(ue(u,se(ct(m),this.epsilon)))),f=se(K(l,this.momentum),d);p.assign(u),c.assign(m),l.assign(f);let g=ue(s,f);s.assign(g)}else{let c=se(K(p,this.decay),K(ct(i),1-this.decay)),m=se(K(l,this.momentum),_e(K(i,this.learningRate),Dt(se(c,this.epsilon))));p.assign(c),l.assign(m);let d=ue(s,m);s.assign(d)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&Ye(this.accumulatedMeanSquares.map(e=>e.variable)),this.accumulatedMeanGrads!=null&&this.centered&&Ye(this.accumulatedMeanGrads.map(e=>e.variable)),this.accumulatedMoments!=null&&Ye(this.accumulatedMoments.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&e.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(e.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=this.centered?e.length/3:e.length/2,r=!1;this.accumulatedMeanSquares=e.slice(0,t).map(n=>({originalName:n.name,variable:n.tensor.variable(r)})),this.accumulatedMoments=e.slice(t,t*2).map(n=>({originalName:n.name,variable:n.tensor.variable(r)})),this.centered&&(this.accumulatedMeanGrads=e.slice(t*2,t*3).map(n=>({originalName:n.name,variable:n.tensor.variable(r)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)}};var RR=[Uu,Wu,Gu,Hu,qu,Ku,Ki];function p1(){for(let o of RR)i1(o)}var vs={};Fe(vs,{CompositeArrayBuffer:()=>gt,browserFiles:()=>u1,browserHTTPRequest:()=>f1,concatenateArrayBuffers:()=>kx,copyModel:()=>Ux,decodeWeights:()=>Gl,decodeWeightsStream:()=>Hl,encodeWeights:()=>Cx,fromMemory:()=>h1,fromMemorySync:()=>Lf,getLoadHandlers:()=>Fx,getModelArtifactsForJSON:()=>Vi,getModelArtifactsForJSONSync:()=>cf,getModelArtifactsInfoForJSON:()=>Eo,getSaveHandlers:()=>Ax,getWeightSpecs:()=>Rp,http:()=>Xu,isHTTPScheme:()=>ju,listModels:()=>Bx,loadWeights:()=>m1,moveModel:()=>Wx,registerLoadRouter:()=>$x,registerSaveRouter:()=>Ex,removeModel:()=>zx,weightsLoaderFactory:()=>Pf,withSaveHandler:()=>g1,withSaveHandlerSync:()=>x1});var OR="model",PR=".json",VR=".weights.bin";function l1(o){return new Promise(e=>setTimeout(e)).then(o)}var ji=class o{constructor(e){if(!F().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(o.URL_SCHEME)&&(e=e.slice(o.URL_SCHEME.length)),(e==null||e.length===0)&&(e=OR),this.modelJsonFileName=e+PR,this.weightDataFileName=e+VR}async save(e){if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");let t=gt.join(e.weightData),r=window.URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{let n=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],s=ql(e,n),a=window.URL.createObjectURL(new Blob([JSON.stringify(s)],{type:"application/json"})),i=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(i.download=this.modelJsonFileName,i.href=a,await l1(()=>i.dispatchEvent(new MouseEvent("click"))),e.weightData!=null){let p=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;p.download=this.weightDataFileName,p.href=r,await l1(()=>p.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:Eo(e)}}}};ji.URL_SCHEME="downloads://";var Df=class{constructor(e){if(e==null||e.length<1)throw new Error(`When calling browserFiles, at least 1 file is required, but received ${e}`);this.jsonFile=e[0],this.weightsFiles=e.slice(1)}async load(){return new Promise((e,t)=>{let r=new FileReader;r.onload=n=>{let s=JSON.parse(n.target.result),a=s.modelTopology;if(a==null){t(new Error(`modelTopology field is missing from file ${this.jsonFile.name}`));return}if(s.weightsManifest==null){t(new Error(`weightManifest field is missing from file ${this.jsonFile.name}`));return}if(this.weightsFiles.length===0){e({modelTopology:a});return}let p=Vi(s,l=>this.loadWeights(l));e(p)},r.onerror=n=>t(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),r.readAsText(this.jsonFile)})}loadWeights(e){let t=[],r=[];for(let a of e)t.push(...a.weights),r.push(...a.paths);let n=this.checkManifestAndWeightFiles(e),s=r.map(a=>this.loadWeightsFile(a,n[a]));return Promise.all(s).then(a=>[t,a])}loadWeightsFile(e,t){return new Promise((r,n)=>{let s=new FileReader;s.onload=a=>{let i=a.target.result;r(i)},s.onerror=a=>n(`Failed to weights data from file of path '${e}'.`),s.readAsArrayBuffer(t)})}checkManifestAndWeightFiles(e){let t=[],r=this.weightsFiles.map(s=>uf(s.name)),n={};for(let s of e)s.paths.forEach(a=>{let i=uf(a);if(t.indexOf(i)!==-1)throw new Error(`Duplicate file basename found in weights manifest: '${i}'`);if(t.push(i),r.indexOf(i)===-1)throw new Error(`Weight file with basename '${i}' is not provided.`);n[a]=this.weightsFiles[r.indexOf(i)]});if(t.length!==this.weightsFiles.length)throw new Error(`Mismatch in the number of files in weights manifest (${t.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return n}},LR=o=>F().getBool("IS_BROWSER")&&!Array.isArray(o)&&o.startsWith(ji.URL_SCHEME)?MR(o.slice(ji.URL_SCHEME.length)):null;at.registerSaveRouter(LR);function MR(o="model"){return new ji(o)}function u1(o){return new Df(o)}function Rf(o,e,t,r){a(o),t=t??0,r=r??1,i(t,r);let n=0,s=p=>(p.then(l=>{let u=t+ ++n/o.length*(r-t);return e(u),l}),p);function a(p){I(p!=null&&Array.isArray(p)&&p.length>0,()=>"promises must be a none empty array")}function i(p,l){I(p>=0&&p<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${p}`),I(l>=0&&l<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${l}`),I(l>=p,()=>`startFraction must be no more than endFraction, but got startFraction ${p} and endFraction ${l}`)}return Promise.all(o.map(s))}async function Of(o,e){e==null&&(e={});let t=e.fetchFunc==null?F().platform.fetch:e.fetchFunc,r=o.map(c=>t(c,e.requestInit,{isBinary:!0})),i=(e.onProgress==null?await Promise.all(r):await Rf(r,e.onProgress,0,.5)).map(c=>c.arrayBuffer());return e.onProgress==null?await Promise.all(i):await Rf(i,e.onProgress,.5,1)}function c1(o,e){var t;let r=e.fetchFunc==null?F().platform.fetch:e.fetchFunc,n=0,s;return(t=e.onProgress)===null||t===void 0||t.call(e,0),new ReadableStream({pull:async a=>{for(var i;n<o.length;){s||(s=(await r(o[n],e.requestInit,{isBinary:!0})).body.getReader());let{done:p,value:l}=await s.read();if(p){n++,s=void 0,(i=e.onProgress)===null||i===void 0||i.call(e,n/o.length);continue}a.enqueue(l);return}a.close()}})}async function m1(o,e="",t,r){return Pf(a=>Of(a,{requestInit:r}))(o,e,t)}function Pf(o){return async(e,t="",r)=>{let n=e.map(()=>!1),s={},a=r!=null?r.map(()=>!1):[],i=[];if(e.forEach((d,f)=>{let g=0;d.weights.forEach(h=>{let x="quantization"in h?h.quantization.dtype:h.dtype,b=Jo[x]*ge(h.shape),w=()=>{n[f]=!0,s[f]==null&&(s[f]=[]),s[f].push({manifestEntry:h,groupOffset:g,sizeBytes:b})};r!=null?r.forEach((v,k)=>{v===h.name&&(w(),a[k]=!0)}):w(),i.push(h.name),g+=b})}),!a.every(d=>d)){let d=r.filter((f,g)=>!a[g]);throw new Error(`Could not find weights in manifest with names: ${d.join(", ")}. 
Manifest JSON has weights with names: ${i.join(", ")}.`)}let p=n.reduce((d,f,g)=>(f&&d.push(g),d),[]),l=[];p.forEach(d=>{e[d].paths.forEach(f=>{let g=t+(t.endsWith("/")?"":"/")+f;l.push(g)})});let u=await o(l),c={},m=0;return p.forEach(d=>{let f=e[d].paths.length,g=new gt(u.slice(m,m+f));s[d].forEach(x=>{let b=g.slice(x.groupOffset,x.groupOffset+x.sizeBytes),w=Gl(b,[x.manifestEntry]);for(let v in w)c[v]=w[v]}),m+=f}),c}}var BR="application/octet-stream",zR="application/json",Wp=class{constructor(e,t){if(this.DEFAULT_METHOD="POST",t==null&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,t.fetchFunc!=null?(I(typeof t.fetchFunc=="function",()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=t.fetchFunc):this.fetch=F().platform.fetch,I(e!=null&&e.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(e)&&I(e.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,t.requestInit!=null&&t.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{},this.loadOptions=t}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");let t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);t.body=new FormData;let r=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],n=ql(e,r);if(t.body.append("model.json",new Blob([JSON.stringify(n)],{type:zR}),"model.json"),e.weightData!=null){let a=gt.join(e.weightData);t.body.append("model.weights.bin",new Blob([a],{type:BR}),"model.weights.bin")}let s=await this.fetch(this.path,t);if(s.ok)return{modelArtifactsInfo:Eo(e),responses:[s]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${s.status}.`)}async loadModelJSON(){let e=await this.fetch(this.path,this.requestInit);if(!e.ok)throw new Error(`Request to ${this.path} failed with status code ${e.status}. Please verify this URL points to the model JSON of the model to load.`);let t;try{t=await e.json()}catch{let a=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?a+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":a+=" Please make sure the server is serving valid JSON for this request.",new Error(a)}let r=t.modelTopology,n=t.weightsManifest;if(r==null&&n==null)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return t}async load(){if(this.loadOptions.streamWeights)return this.loadStream();let e=await this.loadModelJSON();return Vi(e,t=>this.loadWeights(t))}async loadStream(){let e=await this.loadModelJSON(),t=await this.getWeightUrls(e.weightsManifest),r=Rp(e.weightsManifest),n=()=>c1(t,this.loadOptions);return Object.assign(Object.assign({},e),{weightSpecs:r,getWeightStream:n})}async getWeightUrls(e){let t=Array.isArray(this.path)?this.path[1]:this.path,[r,n]=UR(t),s=this.weightPathPrefix||r,a=[],i=[];for(let p of e)for(let l of p.paths)this.weightUrlConverter!=null?i.push(this.weightUrlConverter(l)):a.push(s+l+n);return this.weightUrlConverter&&a.push(...await Promise.all(i)),a}async loadWeights(e){let t=await this.getWeightUrls(e),r=Rp(e),n=await Of(t,this.loadOptions);return[r,n]}};Wp.URL_SCHEME_REGEX=/^https?:\/\//;function UR(o){let e=o.lastIndexOf("/"),t=o.lastIndexOf("?"),r=o.substring(0,e),n=t>e?o.substring(t):"";return[r+"/",n]}function ju(o){return o.match(Wp.URL_SCHEME_REGEX)!=null}var d1=(o,e)=>{if(typeof fetch>"u"&&(e==null||e.fetchFunc==null))return null;{let t=!0;if(Array.isArray(o)?t=o.every(r=>ju(r)):t=ju(o),t)return Xu(o,e)}return null};at.registerSaveRouter(d1);at.registerLoadRouter(d1);function Xu(o,e){return new Wp(o,e)}function f1(o,e){return Xu(o,e)}var Gp=class{constructor(e){this.modelArtifacts=e}load(){return this.modelArtifacts}},Qu=class{constructor(e){this.saveHandler=e}save(e){return this.saveHandler(e)}},Vf=class{constructor(e){e.load&&(this.load=()=>Promise.resolve(e.load())),e.save&&(this.save=t=>Promise.resolve(e.save(t)))}};function h1(o,e,t,r){let n=arguments;return new Vf(Lf(...n))}function Lf(o,e,t,r){return arguments.length===1?o.modelTopology!=null||o.weightSpecs!=null?new Gp(o):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Gp({modelTopology:o})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Gp({modelTopology:o,weightSpecs:e,weightData:t,trainingConfig:r}))}function g1(o){return new Qu(o)}function x1(o){return new Qu(o)}var Yu={};Fe(Yu,{draw:()=>QR,fromPixels:()=>YR,fromPixelsAsync:()=>KR,toPixels:()=>XR});var ws,y1=!1;function b1(o,e=3){if(e>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(o==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let t=!1,r=!1,n=!1,s=!1,a=!1,i=!1;if(o.data instanceof Uint8Array)t=!0;else if(typeof ImageData<"u"&&o instanceof ImageData)r=!0;else if(typeof HTMLVideoElement<"u"&&o instanceof HTMLVideoElement)n=!0;else if(typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement)s=!0;else if(o.getContext!=null)a=!0;else if(typeof ImageBitmap<"u"&&o instanceof ImageBitmap)i=!0;else throw new Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${o.constructor.name}`);if($i(kp,S.backendName)!=null){let f={pixels:o},g={numChannels:e};return S.runKernel(kp,f,g)}let[l,u]=n?[o.videoWidth,o.videoHeight]:[o.width,o.height],c;if(a)c=o.getContext("2d").getImageData(0,0,l,u).data;else if(r||t)c=o.data;else if(s||n||i){if(ws==null)if(typeof document>"u")if(typeof OffscreenCanvas<"u"&&typeof OffscreenCanvasRenderingContext2D<"u")ws=new OffscreenCanvas(1,1).getContext("2d");else throw new Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.");else ws=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});ws.canvas.width=l,ws.canvas.height=u,ws.drawImage(o,0,0,l,u),c=ws.getImageData(0,0,l,u).data}let m;if(e===4)m=new Int32Array(c);else{let f=l*u;m=new Int32Array(f*e);for(let g=0;g<f;g++)for(let h=0;h<e;++h)m[g*e+h]=c[g*4+h]}return Fu(m,[u,l,e],"int32")}function WR(o){return o!=null&&o.data instanceof Uint8Array}function GR(){return typeof window<"u"&&typeof ImageBitmap<"u"&&window.hasOwnProperty("createImageBitmap")}function HR(o){return o!=null&&o.width!==0&&o.height!==0}function qR(o){return GR()&&!(o instanceof ImageBitmap)&&HR(o)&&!WR(o)}async function KR(o,e=3){let t=null;if(F().getBool("WRAP_TO_IMAGEBITMAP")&&qR(o)){let r;try{r=await createImageBitmap(o,{premultiplyAlpha:"none"})}catch{r=null}r!=null&&r.width===o.width&&r.height===o.height?t=r:t=o}else t=o;return b1(t,e)}function _1(o){if(o.rank!==2&&o.rank!==3)throw new Error(`toPixels only supports rank 2 or 3 tensors, got rank ${o.rank}.`);let e=o.rank===2?1:o.shape[2];if(e>4||e===2)throw new Error(`toPixels only supports depth of size 1, 3 or 4 but got ${e}`);if(o.dtype!=="float32"&&o.dtype!=="int32")throw new Error(`Unsupported type for toPixels: ${o.dtype}. Please use float32 or int32 tensors.`)}function jR(o){let e=o?.alpha||1;if(e>1||e<0)throw new Error(`Alpha value ${e} is suppoed to be in range [0 - 1].`)}async function XR(o,e){let t=T(o,"img","toPixels");if(!(o instanceof Oe)){let l=t;t=we(l,"int32"),l.dispose()}_1(t);let[r,n]=t.shape.slice(0,2),s=t.rank===2?1:t.shape[2],a=await t.data(),i=t.dtype==="float32"?255:1,p=new Uint8ClampedArray(n*r*4);for(let l=0;l<r*n;++l){let u=[0,0,0,255];for(let m=0;m<s;m++){let d=a[l*s+m];if(t.dtype==="float32"){if(d<0||d>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${d}.`)}else if(t.dtype==="int32"&&(d<0||d>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${d}.`);s===1?(u[0]=d*i,u[1]=d*i,u[2]=d*i):u[m]=d*i}let c=l*4;p[c+0]=Math.round(u[0]),p[c+1]=Math.round(u[1]),p[c+2]=Math.round(u[2]),p[c+3]=Math.round(u[3])}if(e!=null){y1||$i(Ip,S.backendName)!=null&&(console.warn("tf.browser.toPixels is not efficient to draw tensor on canvas. Please try tf.browser.draw instead."),y1=!0),e.width=n,e.height=r;let l=e.getContext("2d"),u=new ImageData(p,n,r);l.putImageData(u,0,0)}return t!==o&&t.dispose(),p}function QR(o,e,t){let r=T(o,"img","draw");if(!(o instanceof Oe)){let a=r;r=we(a,"int32"),a.dispose()}_1(r),jR(t?.imageOptions);let n={image:r},s={canvas:e,options:t};S.runKernel(Ip,n,s)}var YR=C({fromPixels_:b1});function ZR(o,e){let t=o.shape.length,r=e.shape.length;if(t<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${t}.`);if(r<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${r}.`);if(e.dtype!=="int32")throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${e.dtype}.`);if(e.shape[r-1]>t)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${e.shape[r-1]} vs. ${t}`);if(ge(o.shape)===0)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${o.shape}.`);let n=e.shape,s=n[n.length-1],a=1;for(let c=0;c<n.length-1;++c)a*=n[c];let i=o.shape,p=n.slice();p.pop();let l=1;for(let c=s;c<t;++c)l*=i[c],p.push(i[c]);let u=[...ko(o.shape).map(c=>c/l),1].slice(0,s);return[p,a,l,u]}var it={};Fe(it,{assertParamsValid:()=>eO,computeFlatOffset:()=>sO,computeOutShape:()=>oO,getNormalizedAxes:()=>rO,isSliceContinous:()=>nO,maskToAxes:()=>tO,parseSliceParams:()=>aO,sliceInfo:()=>iO,startForAxis:()=>k1,startIndicesWithElidedDims:()=>N1,stopForAxis:()=>E1,stopIndicesWithElidedDims:()=>S1,stridesForAxis:()=>I1,stridesWithElidedDims:()=>v1});var Mf=-2,JR=-1;function eO(o,e,t){let r=o.shape.length;I(r===e.length,()=>`Error in slice${r}D: Length of begin ${e} must match the rank of the array (${r}).`),I(r===t.length,()=>`Error in slice${r}D: Length of size ${t} must match the rank of the array (${r}).`);for(let n=0;n<r;++n)I(e[n]+t[n]<=o.shape[n],()=>`Error in slice${r}D: begin[${n}] + size[${n}] (${e[n]+t[n]}) would overflow input.shape[${n}] (${o.shape[n]})`)}function tO(o){let e=[],t=0;for(;o>0;)o&1&&e.push(t),o/=2,t++;return e}function oO(o,e,t){let r=[];for(let n=0;n<o.length;n++)r[n]=Math.ceil((e[n]-o[n])/t[n]);return r}function v1(o,e,t,r){let n=[...o];for(let s=n.length;s<r.length;s++)n.push(1);for(let s=0;s<t;s++)s===0?n[e]=1:(n.splice(e,0,1),n.pop());return n}function w1(o,e,t){return t<=o?t:t-(e-1)}function C1(o,e){let t=[];for(let r=0;r<o;r++)t.push(e+r);return t}function rO(o,e,t,r,n,s,a,i,p){let l=o.length,u=new Array(l),c=new Array(l),m=new Array(l);if(e.length&&t>0){let d=e[0],f=t+1;u=N1(a,d,f,r,o),c=S1(i,d,f,n,o),m=v1(s,d,f,o)}else for(let d=0;d<l;d++)u[d]=k1(a,r,s,o,d,p),c[d]=E1(i,n,s,o,d,p),m[d]=I1(s,d,p);return{begin:u,end:c,strides:m}}function N1(o,e,t,r,n){let s=[...n],a=C1(t,e);for(let i=0;i<s.length;i++)if(a.indexOf(i)>-1)s[i]=0;else{let p=w1(e,t,i),l=r[p];o&1<<p&&(l=0),s[i]=l}return s}function S1(o,e,t,r,n){let s=[...n],a=C1(t,e);for(let i=0;i<s.length;i++)if(a.indexOf(i)>-1)s[i]=Number.MAX_SAFE_INTEGER;else{let p=w1(e,t,i),l=r[p];o&1<<p&&(l=Number.MAX_SAFE_INTEGER),s[i]=l}for(let i=0;i<s.length;i++){let p=n[i];s[i]<0&&(s[i]+=p),s[i]=Vs(0,s[i],n[i])}return s}function I1(o,e,t){let r=o[e];return(t&1<<e||r==null)&&(r=1),r}function k1(o,e,t,r,n,s){let a=e[n],i=t[n]||1;(o&1<<n||s&1<<n||a==null)&&(i>0?a=Number.MIN_SAFE_INTEGER:a=Number.MAX_SAFE_INTEGER);let p=r[n];return a<0&&(a+=p),a=Vs(0,a,p-1),a}function E1(o,e,t,r,n,s){let a=e[n],i=t[n]||1;(o&1<<n||s&1<<n||a==null)&&(i>0?a=Number.MAX_SAFE_INTEGER:a=Number.MIN_SAFE_INTEGER);let p=r[n];return a<0&&(a+=p),i>0?a=Vs(0,a,p):a=Vs(-1,a,p-1),a}function nO(o,e,t){let r=t.length;for(let n=0;n<t.length;n++)if(t[n]>1){r=n;break}for(let n=r+1;n<t.length;n++)if(e[n]>0||t[n]!==o[n])return!1;return!0}function sO(o,e){let t=o.length>0?o[o.length-1]:1;for(let r=0;r<o.length-1;r++)t+=o[r]*e[r];return t}function aO(o,e,t){let r,n=o.shape.length;typeof e=="number"?r=[e,...new Array(n-1).fill(0)]:e.length<n?r=e.concat(new Array(n-e.length).fill(0)):r=e.slice(),r.forEach(a=>{I(a!==-1,()=>"slice() does not support negative begin indexing.")});let s;return t==null?s=new Array(n).fill(-1):typeof t=="number"?s=[t,...new Array(n-1).fill(-1)]:t.length<n?s=t.concat(new Array(n-t.length).fill(-1)):s=t,s=s.map((a,i)=>a>=0?a:(I(a===-1,()=>`Negative size values should be exactly -1 but got ${a} for the slice() size at index ${i}.`),o.shape[i]-r[i])),[r,s]}function iO(o,e,t,r,n,s,a,i,p){let l;if(r==null?(l=new Array(e.length),l.fill(1)):l=r,a!=null&&a&a-1)throw new Error("Multiple ellipses in slice is not allowed.");let u=!1,c={dims:l.length,numAddAxisAfterEllipsis:0,begin:e.slice(),end:t.slice(),strides:l.slice(),beginMask:n,endMask:s,ellipsisMask:a,newAxisMask:i,shrinkAxisMask:p};for(let w=0;w<c.dims;w++)u&&1<<w&i&&c.numAddAxisAfterEllipsis++,1<<w&a&&(u=!0);u||(c.ellipsisMask|=1<<c.dims,c.dims++);let m={dims:o.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};pO(c,m);let d=!0,f=!0,g=!0,h=[],x=[];for(let w=0;w<o.length;++w){if(m.strides[w]===0)throw Error(`strides[${w}] must be non-zero`);let v=!!(m.shrinkAxisMask&1<<w),k=o[w];if(k===-1){h.push(v?1:-1);continue}let E=[m.beginMask&1<<w,m.endMask&1<<w],$=[m.strides[w]>0?0:-1,m.strides[w]>0?k:k-1];if(v&&m.strides[w]<=0)throw Error("only stride 1 allowed on non-range indexing.");g=g&&m.strides[w]===1;let A=!!(m.beginMask&1<<w&&m.endMask&1<<w);if(m.beginValid&&m.endValid){if(v){let V=m.begin[w]<0?k+m.begin[w]:m.begin[w];if(m.begin[w]=V,m.end[w]=m.begin[w]+1,V<0||V>=k)throw Error(`slice index ${m.begin[w]} of dimension ${w} out of bounds.`)}else m.begin[w]=T1(m.begin[w],0,m.strides[w],k,E,$),m.end[w]=T1(m.end[w],1,m.strides[w],k,E,$);let P=m.strides[w]===1&&m.begin[w]===0&&m.end[w]===k;d=d&&P,f=f&&(w===0&&m.strides[w]===1||P)}else d=d&&m.strides[w]===1&&A,f=f&&(w===0&&m.strides[w]===1||A);let D,R=!1;if(m.beginValid&&m.endValid?(D=m.end[w]-m.begin[w],R=!0):v?(D=1,R=!0):A&&k>=0&&(m.strides[w]<0?D=-k:D=k,R=!0),R){let P;D===0||D<0!=m.strides[w]<0?P=0:P=Math.trunc(D/m.strides[w])+(D%m.strides[w]!==0?1:0),h.push(P)}else h.push(-1)}for(let w=0;w<m.finalShapeGatherIndices.length;++w){let v=m.finalShapeGatherIndices[w];v>=0?x.push(h[v]):v===Mf&&x.push(1)}return{finalShapeSparse:x.filter((w,v)=>m.finalShapeGatherIndices[v]!==Mf),finalShape:x,isIdentity:d,sliceDim0:f,isSimpleSlice:g,begin:m.begin,end:m.end,strides:m.strides}}function pO(o,e){e.beginMask=0,e.endMask=0,e.shrinkAxisMask=0;let t=0;e.beginValid=o.begin!=null,e.endValid=o.end!=null,e.begin=new Array(e.dims),e.end=new Array(e.dims),e.strides=new Array(e.dims),e.finalShapeGatherIndices=[],e.finalShapeGatherIndicesSparse=[],e.inputShapeGatherIndicesSparse=new Array(e.dims);for(let r=0;r<o.dims;r++)if(1<<r&o.ellipsisMask){let n=Math.min(e.dims-(o.dims-r)+1+o.numAddAxisAfterEllipsis,e.dims);for(;t<n;t++)e.begin[t]=0,e.end[t]=0,e.strides[t]=1,e.beginMask|=1<<t,e.endMask|=1<<t,e.finalShapeGatherIndices.push(t),e.finalShapeGatherIndicesSparse.push(-1),e.inputShapeGatherIndicesSparse[t]=r}else if(1<<r&o.newAxisMask)e.finalShapeGatherIndices.push(Mf),e.finalShapeGatherIndicesSparse.push(-1);else{if(t===e.begin.length)throw Error(`Index out of range using input dim ${t}; input has only ${e.dims} dims, ${e.begin.length}.`);o.begin!=null&&(e.begin[t]=o.begin[r]),o.end!=null&&(e.end[t]=o.end[r]),e.strides[t]=o.strides[r],o.beginMask&1<<r&&(e.beginMask|=1<<t),o.endMask&1<<r&&(e.endMask|=1<<t),o.shrinkAxisMask&1<<r?(e.finalShapeGatherIndices.push(JR),e.finalShapeGatherIndicesSparse.push(-1),e.shrinkAxisMask|=1<<t):(e.finalShapeGatherIndices.push(t),e.finalShapeGatherIndicesSparse.push(r)),e.inputShapeGatherIndicesSparse[t]=r,t++}}function T1(o,e,t,r,n,s){if(n[e])return t>0?s[e]:s[e+1&1];{let a=o<0?r+o:o;return a<s[0]?s[0]:a>s[1]?s[1]:a}}var lO=typeof requestAnimationFrame<"u"?requestAnimationFrame:typeof setImmediate<"u"?setImmediate:o=>o();function Bf(){return new Promise(o=>lO(()=>o()))}var N={};Fe(N,{ERF_A1:()=>SO,ERF_A2:()=>IO,ERF_A3:()=>kO,ERF_A4:()=>EO,ERF_A5:()=>$O,ERF_P:()=>NO,PARALLELIZE_THRESHOLD:()=>Zu,RowPartitionType:()=>Bo,SELU_SCALE:()=>CO,SELU_SCALEALPHA:()=>wO,applyActivation:()=>_s,assertAndGetBroadcastShape:()=>Ie,assertAxesAreInnerMostDims:()=>K$,assertParamsConsistent:()=>uO,assignToTypedArray:()=>PO,axesAreInnerMostDims:()=>Tf,calculateShapes:()=>oD,checkEinsumDimSizes:()=>UO,checkPadOnDimRoundingMode:()=>tt,combineLocations:()=>Ly,combineRaggedTensorToTensorShapes:()=>mO,complexWithEvenIndex:()=>DO,complexWithOddIndex:()=>RO,computeConv2DInfo:()=>ls,computeConv3DInfo:()=>ny,computeDefaultPad:()=>_f,computeDilation2DInfo:()=>HE,computeOptimalWindowSize:()=>gO,computeOutAndReduceShapes:()=>q$,computeOutShape:()=>cO,computePool2DInfo:()=>bf,computePool3DInfo:()=>qE,convertConv2DDataFormat:()=>sy,decodeEinsumEquation:()=>BO,eitherStridesOrDilationsAreOne:()=>wt,expandShapeToKeepDim:()=>tr,exponent:()=>LO,exponents:()=>VO,fromStringArrayToUint8:()=>lP,fromUint8ToStringArray:()=>pP,getAxesPermutation:()=>j$,getBroadcastDims:()=>Dy,getComplexWithIndex:()=>OO,getEinsumComputePath:()=>WO,getEinsumPermutation:()=>zO,getFusedBiasGradient:()=>bs,getFusedDyActivation:()=>ys,getImageCenter:()=>xO,getInnerMostAxes:()=>Q$,getPermuted:()=>bO,getRaggedRank:()=>fO,getReductionAxes:()=>ou,getReshaped:()=>yO,getReshapedPermuted:()=>_O,getRowPartitionTypesHelper:()=>dO,getSliceBeginCoords:()=>TO,getSliceSize:()=>vO,getSparseFillEmptyRowsIndicesDenseShapeMismatch:()=>KO,getSparseFillEmptyRowsNegativeIndexErrorMessage:()=>jO,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:()=>XO,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:()=>ZO,getSparseReshapeInputOutputMismatchErrorMessage:()=>eP,getSparseReshapeInputOutputMultipleErrorMessage:()=>JO,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:()=>QO,getSparseReshapeNegativeOutputDimErrorMessage:()=>YO,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:()=>nP,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:()=>tP,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:()=>oP,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:()=>rP,getUndoAxesPermutation:()=>X$,isIdentityPermutation:()=>GO,log:()=>Lk,mergeRealAndImagArrays:()=>AO,prepareAndValidate:()=>ZR,prepareSplitSize:()=>qO,segment_util:()=>Uf,shouldFuse:()=>Ts,slice_util:()=>it,splitRealAndImagArrays:()=>FO,stridesOrDilationsArePositive:()=>Fo,tupleValuesAreOne:()=>ps,upcastType:()=>et,validateDefaultValueShape:()=>hO,validateInput:()=>zp,validateUpdateShape:()=>s_,warn:()=>Yo});function uO(o,e){let t=o[0].length;o.forEach((n,s)=>{I(n.length===t,()=>`Error in concat${t}D: rank of tensors[${s}] must be the same as the rank of the rest (${t})`)}),I(e>=0&&e<t,()=>`Error in concat${t}D: axis must be between 0 and ${t-1}.`);let r=o[0];o.forEach((n,s)=>{for(let a=0;a<t;a++)I(a===e||n[a]===r[a],()=>`Error in concat${t}D: Shape of tensors[${s}] (${n}) does not match the shape of the rest (${r}) along the non-concatenated axis ${s}.`)})}function cO(o,e){let t=o[0].slice();for(let r=1;r<o.length;r++)t[e]+=o[r][e];return t}var Bo;(function(o){o[o.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",o[o.VALUE_ROWIDS=1]="VALUE_ROWIDS",o[o.ROW_LENGTHS=2]="ROW_LENGTHS",o[o.ROW_SPLITS=3]="ROW_SPLITS",o[o.ROW_LIMITS=4]="ROW_LIMITS",o[o.ROW_STARTS=5]="ROW_STARTS"})(Bo||(Bo={}));function mO(o,e,t){let r=new Array;if(t==null&&e==null)return r;if(e==null)for(;r.length<o+t.length;)r.push(-1);else r=e.slice();if(t==null)return r;if(o+t.length!==r.length)throw new Error(`rt input.shape and shape=${e} are incompatible: rt input.rank = ${o+t.length}, but shape.rank = ${r.length}`);for(let n=1;n<t.length;++n){let s=t[n],a=r[r.length-t.length+n],i=r[a];if(s>=0)if(i>=0){if(i!==s)throw new Error(`rt input.shape and shape=${e} are incompatible: rt input.shape[${n+o}] = ${s} but shape[${n+o}] = ${i}`)}else r[a]=s}return r}function dO(o){let e={FIRST_DIM_SIZE:Bo.FIRST_DIM_SIZE,VALUE_ROWIDS:Bo.VALUE_ROWIDS,ROW_LENGTHS:Bo.ROW_LENGTHS,ROW_SPLITS:Bo.ROW_SPLITS,ROW_LIMITS:Bo.ROW_LIMITS,ROW_STARTS:Bo.ROW_STARTS},t=[];for(let r of o)if(r in e)t.push(e[r]);else break;return t}function fO(o){return o.length===0?0:o[0]===Bo.FIRST_DIM_SIZE?o.length-1:o.length}function hO(o,e){if(o==null||e==null)return;let t=o.length,r=e.length;if(t>=r)throw new Error(`defaultValue.shape=${o} and ragged tensor flatValues.shape=${e}, are incompatible: defaultValue.rank = ${t} must be less than ragged tensor input flatValues.rank = ${r})`);for(let n=0;n<Math.min(t,r-1);++n){let s=o[n],a=e[n+1];if(s>=0&&a>=0&&s!==1&&s!==a)throw new Error(`defaultValue.shape=${o}, and ragged tensor input flatValues.shape=${e} are incompatible: defaultValue.shape[${n-o.length}] = ${s} but ragged tensor input.flatValues.shape[${n-o.length}] = ${a}`)}}var Zu=30;function gO(o){return o<=Zu?o:zs(o,Math.floor(Math.sqrt(o)))}function xO(o,e,t){let r=t*(typeof o=="number"?o:o[0]),n=e*(typeof o=="number"?o:o[1]);return[r,n]}function yO(o,e,t,r=!0){let n=[];if(r)n=n.concat(e.slice(0)),n.push(o[0]/t),n=n.concat(o.slice(1));else{n=n.concat(o[0]);let s=e.length;for(let a=0;a<s;++a)n=n.concat([o[a+1]/e[a],e[a]]);n=n.concat(o.slice(s+1))}return n}function bO(o,e,t=!0){let r=[];if(t){r.push(e);for(let n=e+1;n<o;++n)n<=2*e?(r.push(n),r.push(n-(e+1))):r.push(n)}else{let n=[],s=[];for(let a=1;a<o;++a)a>=e*2+1||a%2===1?s.push(a):n.push(a);r.push(...n),r.push(0),r.push(...s)}return r}function _O(o,e,t,r=!0){let n=[];r?n.push(o[0]/t):n.push(o[0]*t);for(let s=1;s<o.length;++s)s<=e.length?r?n.push(e[s-1]*o[s]):n.push(o[s]/e[s-1]):n.push(o[s]);return n}function TO(o,e){let t=[0];for(let r=0;r<e;++r)t.push(o[r][0]);return t}function vO(o,e,t){let r=o.slice(0,1);for(let n=0;n<t;++n)r.push(o[n+1]-e[n][0]-e[n][1]);return r}var wO=1.7580993408473768,CO=1.0507009873554805;var NO=.3275911,SO=.254829592,IO=-.284496736,kO=1.421413741,EO=-1.453152027,$O=1.061405429;function AO(o,e){if(o.length!==e.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${o.length}, imag: ${e.length}.`);let t=new Float32Array(o.length*2);for(let r=0;r<t.length;r+=2)t[r]=o[r/2],t[r+1]=e[r/2];return t}function FO(o){let e=new Float32Array(o.length/2),t=new Float32Array(o.length/2);for(let r=0;r<o.length;r+=2)e[r/2]=o[r],t[r/2]=o[r+1];return{real:e,imag:t}}function DO(o){let e=Math.ceil(o.length/4),t=new Float32Array(e),r=new Float32Array(e);for(let n=0;n<o.length;n+=4)t[Math.floor(n/4)]=o[n],r[Math.floor(n/4)]=o[n+1];return{real:t,imag:r}}function RO(o){let e=Math.floor(o.length/4),t=new Float32Array(e),r=new Float32Array(e);for(let n=2;n<o.length;n+=4)t[Math.floor(n/4)]=o[n],r[Math.floor(n/4)]=o[n+1];return{real:t,imag:r}}function OO(o,e){let t=o[e*2],r=o[e*2+1];return{real:t,imag:r}}function PO(o,e,t,r){o[r*2]=e,o[r*2+1]=t}function VO(o,e){let t=new Float32Array(o/2),r=new Float32Array(o/2);for(let n=0;n<Math.ceil(o/2);n++){let s=(e?2:-2)*Math.PI*(n/o);t[n]=Math.cos(s),r[n]=Math.sin(s)}return{real:t,imag:r}}function LO(o,e,t){let r=(t?2:-2)*Math.PI*(o/e),n=Math.cos(r),s=Math.sin(r);return{real:n,imag:s}}var zf="->",MO=/->/g,$1=",",A1="...";function BO(o,e){o=o.replace(/\s/g,"");let t=(o.length-o.replace(MO,"").length)/zf.length;if(t<1)throw new Error("Equations without an arrow are not supported.");if(t>1)throw new Error(`Equation must contain exactly one arrow ("${zf}").`);let[r,n]=o.split(zf);I(r.indexOf(A1)===-1,()=>`The ellipsis notation ("${A1}") is not supported yet.`);let s=r.split($1),a=s.length;if(e!==a)throw new Error(`Expected ${a} input tensors, received ${e}`);if(a>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");let i=[];for(let m=0;m<n.length;++m){let d=n[m];if(!s.some(f=>f.indexOf(d)!==-1))throw new Error(`Output subscripts contain the label ${d} not present in the input subscripts.`);i.indexOf(d)===-1&&i.push(d)}for(let m=0;m<r.length;++m){let d=r[m];i.indexOf(d)===-1&&d!==$1&&i.push(d)}let p=new Array(s.length);for(let m=0;m<a;++m){if(new Set(s[m].split("")).size!==s[m].length)throw new Error(`Found duplicate axes in input component ${s[m]}. Support for duplicate axes in input is not implemented yet.`);p[m]=[];for(let d=0;d<s[m].length;++d)p[m].push(i.indexOf(s[m][d]))}let l=i.length,u=n.length,c=[];for(let m=u;m<l;++m)c.push(m);return{allDims:i,summedDims:c,idDims:p}}function zO(o,e){let t=new Array(o);t.fill(-1);for(let n=0;n<e.length;++n)t[e[n]]=n;let r=[];for(let n=0;n<o;++n)t[n]===-1&&r.push(n);return t=t.filter(n=>n!==-1),{permutationIndices:t,expandDims:r}}function UO(o,e,t){let r=new Array(o);for(let n=0;n<t.length;++n){let s=t[n].shape;for(let a=0;a<e[n].length;++a)r[e[n][a]]===void 0?r[e[n][a]]=s[a]:I(r[e[n][a]]===s[a],()=>`Expected dimension ${r[e[n][a]]} at axis ${a} of input shaped ${JSON.stringify(s)}, but got dimension ${s[a]}`)}}function WO(o,e){let t=o,r=[],n=0;o.length===0&&t.push(-1),n=o.length+1;for(let a=0;a<n;++a)r.push([]);let s=[];for(let a=0;a<t.length;++a){let i=t[a],p=HO(e,i);for(let l of p)s.indexOf(l)===-1&&(r[a].push(l),s.push(l))}return{path:t,steps:r}}function GO(o){return o.every((e,t)=>e===t)}function HO(o,e){let t=[];for(let r=0;r<o.length;++r)(o[r].length===0||o[r].indexOf(e)!==-1||e===-1)&&t.push(r);return t}function qO(o,e,t=0){let r=[];if(typeof e=="number")I(o.shape[t]%e===0,()=>"Number of splits must evenly divide the axis."),r=new Array(e).fill(o.shape[t]/e);else{let n=e.reduce((a,i)=>(i===-1&&(a+=1),a),0);I(n<=1,()=>"There should be only one negative value in split array.");let s=e.indexOf(-1);if(s!==-1){let a=e.reduce((i,p)=>p>0?i+p:i);e[s]=o.shape[t]-a}I(o.shape[t]===e.reduce((a,i)=>a+i),()=>"The sum of sizes must match the size of the axis dimension."),r=e}return r}function KO(o){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${o}`}function jO(o,e){return`indices(${o}, 0) is invalid: ${e} < 0`}function XO(o,e,t){return`indices(${o}, 0) is invalid: ${e} >= ${t}`}function QO(o,e){return`only one output dimension may be -1, not both ${o} and ${e}`}function YO(o,e){return`size ${o} must be non-negative, not ${e}`}function ZO(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function JO(o,e){let t=ge(o),r=ge(e);return`Input to reshape is a SparseTensor with ${t}
  dense values, but the requested shape requires a multiple of ${r}. inputShape=${o} outputShape= ${e}`}function eP(o,e){let t=ge(o),r=ge(e);return`Input to reshape is a tensor with ${t} dense values, but the requested shape has ${r}. inputShape=${o} outputShape=${e}`}function tP(){return"segment ids must be >= 0"}function oP(){return"segment ids are not increasing"}function rP(o,e){return`Segment id ${o} out of range [0, ${e}), possibly because segmentIds input is not sorted.`}function nP(o,e,t){return`Bad: indices[${o}] == ${e} out of range [0, ${t})`}var Uf={};Fe(Uf,{collectGatherOpShapeInfo:()=>iP,computeOutShape:()=>aP,segOpComputeOptimalWindowSize:()=>sP});function sP(o,e){let t=!1,r;for(o<=Zu?(r=o,t=!0):r=zs(o,Math.floor(Math.sqrt(o)));!t;)r>e||r===o?t=!0:r=zs(o,r+1);return r}function aP(o,e,t){let r=[],n=o.length;for(let s=0;s<n;s++)s!==e?r.push(o[s]):r.push(t);return r}function iP(o,e,t,r){let n=e.shape.length,s=o.shape.length;if(r!==0&&(r<-n||r>n))throw new Error(`Expect batchDims in the range of [-${n}, ${n}], but got ${r}`);if(r<0&&(r+=n),r>s)throw new Error(`batchDims (${r}) must be less than rank(x) (
    ${s}).`);if(t<r)throw new Error(`batchDims (${r}) must be less than or equal to axis (${t}).`);for(let c=0;c<r;++c)if(o.shape[c]!==e.shape[c])throw new Error(`x.shape[${c}]: ${o.shape[c]} should be equal to indices.shape[${c}]: ${e.shape[c]}.`);let a=o.shape[t],i=[],p=1,l=1,u=1;for(let c=0;c<r;++c)i.push(o.shape[c]),p*=o.shape[c];for(let c=r;c<t;c++)i.push(o.shape[c]),l*=o.shape[c];for(let c=r;c<n;c++)i.push(e.shape[c]);for(let c=t+1;c<s;c++)i.push(o.shape[c]),u*=o.shape[c];return{batchSize:p,sliceSize:u,outerSize:l,dimSize:a,outputShape:i}}function pP(o){try{return o.map(e=>Oi(e))}catch(e){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${e}`)}}function lP(o){return o.map(e=>Ri(e))}var bt={};Fe(bt,{nonMaxSuppressionV3Impl:()=>Lu,nonMaxSuppressionV4Impl:()=>Mu,nonMaxSuppressionV5Impl:()=>Bu,whereImpl:()=>Du});p1();var Cs={},Ju={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function F1(o,e){Cs[o]=e}function Kt(o,e){if(!(o in Cs)||e!=null){let r=cP(o,e);if(r!==null)Cs[o]=r;else return console.log("Could not get context for WebGL version",o),null}let t=Cs[o];return t==null||t.isContextLost()?(delete Cs[o],Kt(o)):(t.disable(t.DEPTH_TEST),t.disable(t.STENCIL_TEST),t.disable(t.BLEND),t.disable(t.DITHER),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SAMPLE_COVERAGE),t.enable(t.SCISSOR_TEST),t.enable(t.CULL_FACE),t.cullFace(t.BACK),Cs[o])}function uP(o){if(!F().getBool("IS_SAFARI")&&typeof OffscreenCanvas<"u"&&o===2)return new OffscreenCanvas(300,150);if(typeof document<"u")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}function cP(o,e){if(o!==1&&o!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");let t=e??uP(o);return t.addEventListener("webglcontextlost",r=>{r.preventDefault(),delete Cs[o]},!1),F().getBool("SOFTWARE_WEBGL_ENABLED")&&(Ju.failIfMajorPerformanceCaveat=!1),o===1?t.getContext("webgl",Ju)||t.getContext("experimental-webgl",Ju):t.getContext("webgl2",Ju)}var Or;(function(o){o[o.DENSE=0]="DENSE",o[o.SHARED_BATCH=1]="SHARED_BATCH"})(Or||(Or={}));var _t;(function(o){o[o.RENDER=0]="RENDER",o[o.UPLOAD=1]="UPLOAD",o[o.PIXELS=2]="PIXELS",o[o.DOWNLOAD=3]="DOWNLOAD"})(_t||(_t={}));var dt;(function(o){o[o.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",o[o.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",o[o.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",o[o.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",o[o.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"})(dt||(dt={}));function Ns(o,e){return[e,o]}function D1(o,e){return o*e}function Hp(o){let e=y.sizeFromShape(o),t=Math.ceil(e/4);return y.sizeToSquarishShape(t)}function zo(o,e){return[Math.max(1,Math.ceil(e/2)),Math.max(1,Math.ceil(o/2))]}function R1(o,e){let[t,r]=zo(o,e);return t*r*4}function qp(o,e){let t=o,r,n,s,a,i,p,l,u,c,m;return F().getNumber("WEBGL_VERSION")===2?(r=t.R32F,n=t.R16F,s=t.RGBA16F,a=t.RGBA32F,i=t.RED,l=4,u=1,c=t.HALF_FLOAT,m=t.FLOAT,p=t.RGBA8):(r=o.RGBA,n=o.RGBA,s=o.RGBA,a=t.RGBA,i=o.RGBA,l=4,u=4,c=e!=null?e.HALF_FLOAT_OES:null,m=o.FLOAT,p=o.RGBA),{internalFormatFloat:r,internalFormatHalfFloat:n,internalFormatPackedHalfFloat:s,internalFormatPackedFloat:a,textureFormatFloat:i,downloadTextureFormat:p,downloadUnpackNumChannels:l,defaultNumChannels:u,textureTypeHalfFloat:c,textureTypeFloat:m}}function te(o,e){let t=e();return F().getBool("DEBUG")&&mP(o),t}function mP(o){let e=o.getError();if(e!==o.NO_ERROR)throw new Error("WebGL Error: "+hP(o,e))}var dP=596e-10,fP=65504;function O1(o){return!!(F().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||o===0||dP<Math.abs(o)&&Math.abs(o)<fP)}function hP(o,e){switch(e){case o.NO_ERROR:return"NO_ERROR";case o.INVALID_ENUM:return"INVALID_ENUM";case o.INVALID_VALUE:return"INVALID_VALUE";case o.INVALID_OPERATION:return"INVALID_OPERATION";case o.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case o.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case o.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return`Unknown error code ${e}`}}function Kp(o,e){return ar(o,()=>o.getExtension(e),'Extension "'+e+'" not supported on this browser.')}function P1(o,e){let t=ar(o,()=>o.createShader(o.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(te(o,()=>o.shaderSource(t,e)),te(o,()=>o.compileShader(t)),o.getShaderParameter(t,o.COMPILE_STATUS)===!1)throw console.log(o.getShaderInfoLog(t)),new Error("Failed to compile vertex shader.");return t}function V1(o,e){let t=ar(o,()=>o.createShader(o.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(te(o,()=>o.shaderSource(t,e)),te(o,()=>o.compileShader(t)),F().get("ENGINE_COMPILE_ONLY"))return t;if(o.getShaderParameter(t,o.COMPILE_STATUS)===!1)throw jf(e,o.getShaderInfoLog(t)),new Error("Failed to compile fragment shader.");return t}var gP=/ERROR: [0-9]+:([0-9]+):/g;function jf(o,e){let t=gP.exec(e);if(t==null){console.log(`Couldn't parse line number in error: ${e}`),console.log(o);return}let r=+t[1],n=o.split(`
`),s=n.length.toString().length+2,a=n.map((c,m)=>y.rightPad((m+1).toString(),s)+c),i=0;for(let c=0;c<a.length;c++)i=Math.max(a[c].length,i);let p=a.slice(0,r-1),l=a.slice(r-1,r),u=a.slice(r);console.log(p.join(`
`)),console.log(e.split(`
`)[0]),console.log(`%c ${y.rightPad(l[0],i)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(u.join(`
`))}function L1(o){return ar(o,()=>o.createProgram(),"Unable to create WebGLProgram.")}function M1(o,e){if(te(o,()=>o.linkProgram(e)),!F().get("ENGINE_COMPILE_ONLY")&&o.getProgramParameter(e,o.LINK_STATUS)===!1)throw console.log(o.getProgramInfoLog(e)),new Error("Failed to link vertex and fragment shaders.")}function tc(o,e){if(te(o,()=>o.validateProgram(e)),o.getProgramParameter(e,o.VALIDATE_STATUS)===!1)throw console.log(o.getProgramInfoLog(e)),new Error("Shader program validation failed.")}function B1(o,e){let t=ar(o,()=>o.createBuffer(),"Unable to create WebGLBuffer");return te(o,()=>o.bindBuffer(o.ARRAY_BUFFER,t)),te(o,()=>o.bufferData(o.ARRAY_BUFFER,e,o.STATIC_DRAW)),t}function z1(o,e){let t=ar(o,()=>o.createBuffer(),"Unable to create WebGLBuffer");return te(o,()=>o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t)),te(o,()=>o.bufferData(o.ELEMENT_ARRAY_BUFFER,e,o.STATIC_DRAW)),t}function U1(o){return ar(o,()=>o.createTexture(),"Unable to create WebGLTexture.")}function W1(o,e){let t=F().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(o<=0||e<=0){let r=`[${o}x${e}]`;throw new Error("Requested texture size "+r+" is invalid.")}if(o>t||e>t){let r=`[${o}x${e}]`,n=`[${t}x${t}]`;throw new Error("Requested texture size "+r+" greater than WebGL maximum on this browser / GPU "+n+".")}}function G1(o){return ar(o,()=>o.createFramebuffer(),"Unable to create WebGLFramebuffer.")}function Xf(o,e,t,r,n,s,a){let i=o.getAttribLocation(e,t);return i===-1?!1:(te(o,()=>o.bindBuffer(o.ARRAY_BUFFER,r)),te(o,()=>o.vertexAttribPointer(i,n,o.FLOAT,!1,s,a)),te(o,()=>o.enableVertexAttribArray(i)),!0)}function xP(o,e,t){bP(o,t),te(o,()=>o.activeTexture(o.TEXTURE0+t)),te(o,()=>o.bindTexture(o.TEXTURE_2D,e))}function H1(o,e,t){return ar(o,()=>o.getUniformLocation(e,t),'uniform "'+t+'" not present in program.')}function q1(o,e,t){return o.getUniformLocation(e,t)}function K1(o,e,t,r){te(o,()=>xP(o,e,r)),te(o,()=>o.uniform1i(t,r))}function oc(o,e,t){te(o,()=>o.bindFramebuffer(o.FRAMEBUFFER,t)),te(o,()=>o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0))}function Qf(o,e){te(o,()=>o.bindFramebuffer(o.FRAMEBUFFER,e)),te(o,()=>o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,null,0))}function jp(o){let e=o.checkFramebufferStatus(o.FRAMEBUFFER);if(e!==o.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+yP(o,e))}function yP(o,e){switch(e){case o.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case o.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case o.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case o.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return`unknown error ${e}`}}function ar(o,e,t){let r=te(o,()=>e());if(r==null)throw new Error(t);return r}function bP(o,e){let t=o.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,r=e+o.TEXTURE0;if(r<o.TEXTURE0||r>t){let n=`[gl.TEXTURE0, gl.TEXTURE${t}]`;throw new Error(`textureUnit must be in ${n}.`)}}function Pr(o,e=2){return y.sizeFromShape(o.slice(0,o.length-e))}function Vr(o){if(o.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[o.length>1?o[o.length-2]:1,o[o.length-1]]}function Xp(o){let e=[1,1,1];return o.length===0||o.length===1&&o[0]===1||(e=[Pr(o),...Vr(o)]),e}function j1(o,e=!1){let t=F().getNumber("WEBGL_MAX_TEXTURE_SIZE"),r=F().getNumber("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE");r===1/0&&F().getBool("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE")&&(r=t/2),e&&(t=t*2,r=r*2,o=o.map((i,p)=>p>=o.length-2?y.nearestLargerEven(o[p]):o[p]),o.length===1&&(o=[2,o[0]])),o.length!==2&&(o=y.squeezeShape(o).newShape);let n=y.sizeFromShape(o),s=null;o.length<=1&&n<=t?s=[1,n]:o.length===2&&o[0]<=t&&o[1]<=t?s=o:o.length===3&&o[0]*o[1]<=t&&o[2]<=t?s=[o[0]*o[1],o[2]]:o.length===3&&o[0]<=t&&o[1]*o[2]<=t?s=[o[0],o[1]*o[2]]:o.length===4&&o[0]*o[1]*o[2]<=t&&o[3]<=t?s=[o[0]*o[1]*o[2],o[3]]:o.length===4&&o[0]<=t&&o[1]*o[2]*o[3]<=t&&(s=[o[0],o[1]*o[2]*o[3]]);let a=s!=null&&Math.max(...s)>r&&Math.min(...s)<=(e?2:1)&&Math.min(...s)>0;if(s==null||a)if(e){let i=Pr(o),p=2,l=2;o.length&&([p,l]=Vr(o)),n=i*(p/2)*(l/2),s=y.sizeToSquarishShape(n).map(u=>u*2)}else s=y.sizeToSquarishShape(n);return s}function ec(o){return o%2===0}function Ss(o,e){if(o=o.slice(-2),e=e.slice(-2),y.arraysEqual(o,e)||!o.length||!e.length||o[0]===0||o[1]===0||e[0]===0||e[1]===0)return!0;if(o.length!==e.length){let t=o[o.length-1],r=e[e.length-1];if(t===r||ec(t)&&ec(r)&&(o[0]===1||e[0]===1))return!0}return o[1]===e[1]&&ec(o[0])&&ec(e[0])}var Hf,qf;function X1(o){if(Hf==null){let e=Kt(o);Hf=e.getParameter(e.MAX_TEXTURE_SIZE)}return Hf}function Q1(o){if(qf==null){let e=Kt(o);qf=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,qf)}function Y1(o){if(o===0)return 0;let e,t=Kt(o);return ro(t,"EXT_disjoint_timer_query_webgl2")&&o===2?e=2:ro(t,"EXT_disjoint_timer_query")?e=1:e=0,e}function ro(o,e){return o.getExtension(e)!=null}function Yf(o){try{if(Kt(o)!=null)return!0}catch(e){return console.log("Error when getting WebGL context: ",e),!1}return!1}function Z1(o){if(o===0)return!1;let e=Kt(o);if(o===1){if(!ro(e,"OES_texture_float"))return!1}else if(!ro(e,"EXT_color_buffer_float"))return!1;return Kf(e)}function J1(o){if(o===0)return!1;let e=Kt(o);if(o===1){if(!ro(e,"OES_texture_float")||!ro(e,"WEBGL_color_buffer_float"))return!1}else{if(ro(e,"EXT_color_buffer_float"))return Kf(e);let r="EXT_color_buffer_half_float";if(ro(e,r)){let n=e.getExtension(r);return _P(e,n)}return!1}return Kf(e)}function Kf(o){let e=qp(o),t=o.createTexture();o.bindTexture(o.TEXTURE_2D,t),o.texImage2D(o.TEXTURE_2D,0,e.internalFormatFloat,1,1,0,e.textureFormatFloat,e.textureTypeFloat,null);let s=o.createFramebuffer();o.bindFramebuffer(o.FRAMEBUFFER,s),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,t,0);let a=o.checkFramebufferStatus(o.FRAMEBUFFER)===o.FRAMEBUFFER_COMPLETE;return o.bindTexture(o.TEXTURE_2D,null),o.bindFramebuffer(o.FRAMEBUFFER,null),o.deleteTexture(t),o.deleteFramebuffer(s),a}function _P(o,e){let t=qp(o,e),r=o.createTexture();o.bindTexture(o.TEXTURE_2D,r),o.texImage2D(o.TEXTURE_2D,0,t.internalFormatHalfFloat,1,1,0,t.textureFormatFloat,t.textureTypeHalfFloat,null);let a=o.createFramebuffer();o.bindFramebuffer(o.FRAMEBUFFER,a),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,r,0);let i=o.checkFramebufferStatus(o.FRAMEBUFFER)===o.FRAMEBUFFER_COMPLETE;return o.bindTexture(o.TEXTURE_2D,null),o.bindFramebuffer(o.FRAMEBUFFER,null),o.deleteTexture(r),o.deleteFramebuffer(a),i}function eT(o){return o!==2?!1:Kt(o).fenceSync!=null}function Uo(o,e){Array.isArray(o)||(o=[o]),o.forEach(t=>{t!=null&&y.assert(t.dtype!=="complex64",()=>`${e} does not support complex64 tensors in the WebGL backend.`)})}var ae=F();ae.registerFlag("HAS_WEBGL",()=>ae.getNumber("WEBGL_VERSION")>0);ae.registerFlag("WEBGL_VERSION",()=>Yf(2)?2:Yf(1)?1:0);ae.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1);ae.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>ae.get("WEBGL_VERSION")===2);ae.registerFlag("WEBGL_CPU_FORWARD",()=>!0);ae.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1);ae.registerFlag("WEBGL_PACK",()=>ae.getBool("HAS_WEBGL"));ae.registerFlag("WEBGL_PACK_NORMALIZATION",()=>ae.getBool("WEBGL_PACK"));ae.registerFlag("WEBGL_PACK_CLIP",()=>ae.getBool("WEBGL_PACK"));ae.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>ae.getBool("WEBGL_PACK"));ae.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>ae.getBool("WEBGL_PACK"));ae.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>ae.getBool("WEBGL_PACK"));ae.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>ae.getBool("WEBGL_PACK"));ae.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>ae.getBool("WEBGL_PACK"));ae.registerFlag("WEBGL_PACK_REDUCE",()=>ae.getBool("WEBGL_PACK"));ae.registerFlag("WEBGL_LAZILY_UNPACK",()=>ae.getBool("WEBGL_PACK"));ae.registerFlag("WEBGL_CONV_IM2COL",()=>ae.getBool("WEBGL_PACK"));ae.registerFlag("WEBGL_PACK_CONV2DTRANSPOSE",()=>ae.getBool("WEBGL_PACK"));ae.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>X1(ae.getNumber("WEBGL_VERSION")));ae.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>Q1(ae.getNumber("WEBGL_VERSION")));ae.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{let o=ae.getNumber("WEBGL_VERSION");return o===0?0:Y1(o)});ae.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>ae.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!wr.isMobile());ae.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>Z1(ae.getNumber("WEBGL_VERSION")));ae.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>ae.getBool("WEBGL_FORCE_F16_TEXTURES")?!1:ae.getBool("WEBGL_RENDER_FLOAT32_CAPABLE"));ae.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>J1(ae.getNumber("WEBGL_VERSION")));ae.registerFlag("WEBGL_FENCE_API_ENABLED",()=>eT(ae.getNumber("WEBGL_VERSION")));ae.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>ae.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0);ae.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,o=>{if(typeof o!="number")throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${o}.`);if(o<0&&o!==-1)throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${o}.`)});ae.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>wr.isMobile()?1:-1,o=>{if(typeof o!="number")throw new Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${o}.`);if(o<0&&o!==-1)throw new Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${o}.`)});ae.registerFlag("CPU_HANDOFF_SIZE_THRESHOLD",()=>128);ae.registerFlag("WEBGL_USE_SHAPES_UNIFORMS",()=>!1);ae.registerFlag("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e5);ae.registerFlag("TOPK_K_CPU_HANDOFF_THRESHOLD",()=>128);ae.registerFlag("WEBGL_EXP_CONV",()=>!1);ae.registerFlag("SOFTWARE_WEBGL_ENABLED",()=>ae.getBool("IS_TEST"));ae.registerFlag("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE",()=>1/0);ae.registerFlag("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE",()=>!1);ae.registerFlag("WEBGL2_ISNAN_CUSTOM",()=>!1);ae.registerFlag("ENGINE_COMPILE_ONLY",()=>!1);function Ue(){let o,e,t,r,n,s,a,i,p,l;return F().getNumber("WEBGL_VERSION")===2?(o="#version 300 es",e="in",t="out",r="in",n="texture",s="outputColor",a="out vec4 outputColor;",i=F().getBool("WEBGL2_ISNAN_CUSTOM")?`
      bool isnan_custom(float val) {
        uint floatToUint = floatBitsToUint(val);
        return (floatToUint & 0x7fffffffu) > 0x7f800000u;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `:"",p="",l=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(o="",e="attribute",t="varying",r="varying",n="texture2D",s="gl_FragColor",a="",i=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,p=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,l=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:o,attribute:e,varyingVs:t,varyingFs:r,texture2D:n,output:s,defineOutput:a,defineSpecialNaN:i,defineSpecialInf:p,defineRound:l}}function vo(o,e,t="index"){let r=y.computeStrides(e);return r.map((n,s)=>{let a=`int ${o[s]} = ${t} / ${n}`,i=s===r.length-1?`int ${o[s+1]} = ${t} - ${o[s]} * ${n}`:`index -= ${o[s]} * ${n}`;return`${a}; ${i};`}).join("")}function Is(o,e,t="index"){let r=y.computeStrides(e);return r.map((n,s)=>{let a=`int ${o[s]} = ${t} / outShapeStrides[${s}]`,i=s===r.length-1?`int ${o[s+1]} = ${t} - ${o[s]} * outShapeStrides[${s}]`:`index -= ${o[s]} * outShapeStrides[${s}]`;return`${a}; ${i};`}).join("")}function TP(o,e){let t=o.length,r=o.map(s=>`${e}[${s}]`),n=new Array(t-1);n[t-2]=r[t-1];for(let s=t-3;s>=0;--s)n[s]=`(${n[s+1]} * ${r[s+1]})`;return n}function tT(o,e,t="index"){let r=o.map((s,a)=>a),n=TP(r,e);return n.map((s,a)=>{let i=`int ${o[a]} = ${t} / ${n[a]}`,p=a===n.length-1?`int ${o[a+1]} = ${t} - ${o[a]} * ${n[a]}`:`index -= ${o[a]} * ${n[a]}`;return`${i}; ${p};`}).join("")}function Xi(o){let e=y.computeStrides(o).map(t=>t.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${e[0]} + coords.y * ${e[1]} + coords.z;
  }
`}function Qi(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}var nc=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`;var{getBroadcastDims:oT}=N;function rT(o,e,t){let r=[];if(o.forEach(d=>{let f=y.sizeFromShape(d.shapeInfo.logicalShape);if(d.shapeInfo.isUniform?r.push(`uniform float ${d.name}${f>1?`[${f}]`:""};`):(r.push(`uniform sampler2D ${d.name};`),r.push(`uniform int offset${d.name};`)),t.enableShapeUniforms){let{uniformShape:g}=sc(t.packedInputs,d.shapeInfo.logicalShape,d.shapeInfo.texShape);switch(g.length){case 1:r.push(`uniform int ${d.name}Shape;`);break;case 2:r.push(`uniform ivec2 ${d.name}Shape;`);break;case 3:r.push(`uniform ivec3 ${d.name}Shape;`);break;case 4:r.push(`uniform ivec4 ${d.name}Shape;`);break;default:break}r.push(`uniform ivec2 ${d.name}TexShape;`)}}),t.enableShapeUniforms){switch(e.logicalShape.length){case 1:r.push("uniform int outShape;");break;case 2:r.push("uniform ivec2 outShape;"),r.push("uniform int outShapeStrides;");break;case 3:r.push("uniform ivec3 outShape;"),r.push("uniform ivec2 outShapeStrides;");break;case 4:r.push("uniform ivec4 outShape;"),r.push("uniform ivec3 outShapeStrides;");break;default:break}r.push("uniform ivec2 outTexShape;")}t.customUniforms&&t.customUniforms.forEach(d=>{r.push(`uniform ${d.type} ${d.name}${d.arrayIndex?`[${d.arrayIndex}]`:""};`)});let n=r.join(`
`),s=o.map(d=>vP(d,e,t.packedInputs,t.enableShapeUniforms)).join(`
`),a=e.texShape,i=Ue(),p=NP(i),l,u,c=kP(i);return e.isPacked?(l=wP(e.logicalShape,a,t.enableShapeUniforms),u=IP(i)):(l=CP(e.logicalShape,a,t.enableShapeUniforms),u=SP(i)),t.packedInputs&&(c+=FP),[c,p,u,n,l,s,t.userCode].join(`
`)}function Zi(o,e=!1){let t=o.shapeInfo.logicalShape;switch(t.length){case 0:return GP(o,e);case 1:return qP(o,e);case 2:return jP(o,e);case 3:return QP(o,e);case 4:return ZP(o,e);case 5:return JP(o);case 6:return eV(o);default:throw new Error(`${t.length}-D input sampling is not yet supported`)}}function nT(o,e){switch(o.shapeInfo.logicalShape.length){case 0:return WP(o);case 1:return HP(o,e);case 2:return KP(o,e);case 3:return XP(o,e);default:return YP(o,e)}}function vP(o,e,t=!1,r){let n="";t?n+=nT(o,r):n+=Zi(o,r);let s=o.shapeInfo.logicalShape,a=e.logicalShape;return s.length<=a.length&&(t?n+=tV(o,e):n+=oV(o,e)),n}function wP(o,e,t){switch(o.length){case 0:return sT();case 1:return DP(o,e,t);case 2:return zP(o,e,t);case 3:return OP(o,e,t);default:return VP(o,e,t)}}function CP(o,e,t){switch(o.length){case 0:return sT();case 1:return RP(o,e,t);case 2:return UP(o,e,t);case 3:return PP(o,e,t);case 4:return LP(o,e,t);case 5:return MP(o,e);case 6:return BP(o,e);default:throw new Error(`${o.length}-D output sampling is not yet supported`)}}function NP(o){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${o.texture2D}(textureSampler, uv).r;
    }
  `}function SP(o){return`
    void setOutput(float val) {
      ${o.output} = vec4(val, 0, 0, 0);
    }
  `}function IP(o){return`
    void setOutput(vec4 val) {
      ${o.output} = val;
    }
  `}function kP(o){return`${o.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${o.varyingFs} vec2 resultUV;
    ${o.defineOutput}
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    ${o.defineSpecialNaN}
    ${o.defineSpecialInf}
    ${o.defineRound}

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${EP}
    ${$P}
    ${AP}
  `}var EP=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,$P=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,AP=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,FP=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function sT(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function DP(o,e,t){let r=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)];return r[0]===1?t?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${r[1]}.0);
      }
    `:r[1]===1?t?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${r[0]}.0);
      }
    `:t?`
    int getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      return 2 * (resTexRC.x * packedTexShape[1] + resTexRC.y);
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      return 2 * (resTexRC.x * ${r[1]} + resTexRC.y);
    }
  `}function RP(o,e,t){return e[0]===1?t?`
      int getOutputCoords() {
        return int(resultUV.x * float(outTexShape[1]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.x * ${e[1]}.0);
      }
    `:e[1]===1?t?`
      int getOutputCoords() {
        return int(resultUV.y * float(outTexShape[0]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.y * ${e[0]}.0);
      }
    `:t?`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      return resTexRC.x * outTexShape[1] + resTexRC.y;
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${e[0]}, ${e[1]}));
      return resTexRC.x * ${e[1]} + resTexRC.y;
    }
  `}function OP(o,e,t){if(t)return`
    ivec3 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec3(b, r, c);
    }
  `;let r=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)],n=Math.ceil(o[2]/2),s=n*Math.ceil(o[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      int index = resTexRC.x * ${r[1]} + resTexRC.y;

      int b = index / ${s};
      index -= b * ${s};

      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec3(b, r, c);
    }
  `}function PP(o,e,t){if(t)return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${Is(["r","c","d"],o)}
    return ivec3(r, c, d);
  }
`;let r=vo(["r","c","d"],o);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;
      ${r}
      return ivec3(r, c, d);
    }
  `}function VP(o,e,t){if(t)return`
    ivec4 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int texelsInLogicalRow = int(ceil(float(outShape[3]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatchN = texelsInBatch * outShape[1];

      int b2 = index / texelsInBatchN;
      index -= b2 * texelsInBatchN;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec4(b2, b, r, c);
    }
  `;let r=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)],n=Math.ceil(o[o.length-1]/2),s=n*Math.ceil(o[o.length-2]/2),a=s,i="",p="b, r, c";for(let l=2;l<o.length-1;l++)a*=o[o.length-l-1],i=`
      int b${l} = index / ${a};
      index -= b${l} * ${a};
    `+i,p=`b${l}, `+p;return`
    ivec${o.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      int index = resTexRC.x * ${r[1]} + resTexRC.y;

      ${i}

      int b = index / ${s};
      index -= b * ${s};

      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec${o.length}(${p});
    }
  `}function LP(o,e,t){if(t)return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${Is(["r","c","d","d2"],o)}
      return ivec4(r, c, d, d2);
    }
  `;let r=vo(["r","c","d","d2"],o);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;
      ${r}
      return ivec4(r, c, d, d2);
    }
  `}function MP(o,e){let t=vo(["r","c","d","d2","d3"],o);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${e[0]},
                             ${e[1]}));

      int index = resTexRC.x * ${e[1]} + resTexRC.y;

      ${t}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}function BP(o,e){let t=vo(["r","c","d","d2","d3","d4"],o);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;

      ${t}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}function zP(o,e,t){let r=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)];if(y.arraysEqual(o,e))return t?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${r[0]}, ${r[1]}));
      }
    `;let n=Math.ceil(o[1]/2);return t?`
    ivec2 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));

      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;
      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));

      int index = resTexRC.x * ${r[1]} + resTexRC.y;
      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec2(r, c);
    }
  `}function UP(o,e,t){return y.arraysEqual(o,e)?t?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${e[0]}, ${e[1]}));
      }
    `:o[1]===1?t?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(index, 0);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${e[0]}, ${e[1]}));
        int index = resTexRC.x * ${e[1]} + resTexRC.y;
        return ivec2(index, 0);
      }
    `:o[0]===1?t?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${e[0]}, ${e[1]}));
        int index = resTexRC.x * ${e[1]} + resTexRC.y;
        return ivec2(0, index);
      }
    `:t?`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      int r = index / outShape[1];
      int c = index - r * outShape[1];
      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;
      int r = index / ${o[1]};
      int c = index - r * ${o[1]};
      return ivec2(r, c);
    }
  `}function ks(o){return`offset${o}`}function WP(o){let e=o.name,t="get"+e.charAt(0).toUpperCase()+e.slice(1),r=Ue();return`
    vec4 ${t}() {
      return ${r.texture2D}(${e}, halfCR);
    }
  `}function GP(o,e){let t=o.name,r="get"+t.charAt(0).toUpperCase()+t.slice(1);if(o.shapeInfo.isUniform)return`float ${r}() {return ${t};}`;let[n,s]=o.shapeInfo.texShape;if(n===1&&s===1)return`
      float ${r}() {
        return sampleTexture(${t}, halfCR);
      }
    `;let a=ks(t);if(e)return`
    float ${r}() {
      vec2 uv = uvFromFlat(${t}TexShape[0], ${t}TexShape[1], ${a});
      return sampleTexture(${t}, uv);
    }
  `;let[i,p]=o.shapeInfo.texShape;return`
    float ${r}() {
      vec2 uv = uvFromFlat(${i}, ${p}, ${a});
      return sampleTexture(${t}, uv);
    }
  `}function HP(o,e){let t=o.name,r="get"+t.charAt(0).toUpperCase()+t.slice(1),n=o.shapeInfo.texShape,s=Ue();if(e)return`
    vec4 ${r}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${t}TexShape[0]) / 2.0), ceil(float(${t}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${s.texture2D}(${t}, uv);
    }
  `;let a=[Math.ceil(n[0]/2),Math.ceil(n[1]/2)];return`
    vec4 ${r}(int index) {
      vec2 uv = packedUVfrom1D(
        ${a[0]}, ${a[1]}, index);
      return ${s.texture2D}(${t}, uv);
    }
  `}function qP(o,e){let t=o.name,r="get"+t.charAt(0).toUpperCase()+t.slice(1);if(o.shapeInfo.isUniform)return`
      float ${r}(int index) {
        ${Ji(o)}
      }
    `;let n=o.shapeInfo.texShape,s=n[0],a=n[1];if(a===1&&s===1)return`
      float ${r}(int index) {
        return sampleTexture(${t}, halfCR);
      }
    `;let i=ks(t);return a===1?e?`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${i}) + 0.5) / float(${t}TexShape[0]));
        return sampleTexture(${t}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${i}) + 0.5) / ${s}.0);
        return sampleTexture(${t}, uv);
      }
    `:s===1?e?`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${i}) + 0.5) / float(${t}TexShape[1]), 0.5);
        return sampleTexture(${t}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${i}) + 0.5) / ${a}.0, 0.5);
        return sampleTexture(${t}, uv);
      }
    `:e?`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${t}TexShape[0], ${t}TexShape[1], index + ${i});
      return sampleTexture(${t}, uv);
    }
  `:`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${s}, ${a}, index + ${i});
      return sampleTexture(${t}, uv);
    }
  `}function KP(o,e){let t=o.shapeInfo.logicalShape,r=o.name,n="get"+r.charAt(0).toUpperCase()+r.slice(1),s=o.shapeInfo.texShape,a=s[0],i=s[1],p=Ue();if(s!=null&&y.arraysEqual(t,s))return e?`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);

        return ${p.texture2D}(${r}, uv);
      }
    `:`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${i}.0, ${a}.0);

        return ${p.texture2D}(${r}, uv);
      }
    `;if(e)return`
    vec4 ${n}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${r}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${p.texture2D}(${r}, uv);
    }
  `;let l=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],u=Math.ceil(t[1]/2);return`
    vec4 ${n}(int row, int col) {
      vec2 uv = packedUVfrom2D(${u}, ${l[0]}, ${l[1]}, row, col);
      return ${p.texture2D}(${r}, uv);
    }
  `}function jP(o,e){let t=o.shapeInfo.logicalShape,r=o.name,n="get"+r.charAt(0).toUpperCase()+r.slice(1),s=o.shapeInfo.texShape;if(s!=null&&y.arraysEqual(t,s)){if(e)return`
      float ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `;let m=s[0],d=s[1];return`
    float ${n}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${d}.0, ${m}.0);
      return sampleTexture(${r}, uv);
    }
  `}let{newShape:a,keptDims:i}=y.squeezeShape(t),p=a;if(p.length<t.length){let m=ep(o,p),d=["row","col"];return`
      ${Zi(m,e)}
      float ${n}(int row, int col) {
        return ${n}(${tp(d,i)});
      }
    `}if(o.shapeInfo.isUniform)return`
      float ${n}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${t[1]}, 1)));
        ${Ji(o)}
      }
    `;let l=s[0],u=s[1],c=ks(r);return u===1?e?`
      float ${n}(int row, int col) {
        float index = dot(vec3(row, col, ${c}), vec3(${r}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${r}TexShape[0]));
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${n}(int row, int col) {
      float index = dot(vec3(row, col, ${c}), vec3(${t[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
      return sampleTexture(${r}, uv);
    }
  `:l===1?e?`
      float ${n}(int row, int col) {
        float index = dot(vec3(row, col, ${c}), vec3(${r}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${r}TexShape[1]), 0.5);
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${n}(int row, int col) {
      float index = dot(vec3(row, col, ${c}), vec3(${t[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${u}.0, 0.5);
      return sampleTexture(${r}, uv);
    }
  `:e?`
      float ${n}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${r}Shape[1] + col + ${c};
        vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index);
        return sampleTexture(${r}, uv);
      }
    `:`
  float ${n}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${t[1]} + col + ${c};
    vec2 uv = uvFromFlat(${l}, ${u}, index);
    return sampleTexture(${r}, uv);
  }
`}function XP(o,e){let t=o.shapeInfo.logicalShape,r=o.name,n="get"+r.charAt(0).toUpperCase()+r.slice(1),s=o.shapeInfo.texShape,a=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)];if(t[0]===1){let m=t.slice(1),d=[1,2],f=ep(o,m),g=["b","row","col"];return`
        ${nT(f,e)}
        vec4 ${n}(int b, int row, int col) {
          return ${n}(${tp(g,d)});
        }
      `}let i=Ue();if(e)return`
    vec4 ${n}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${r}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${r}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${i.texture2D}(${r}, uv);
    }
  `;let p=a[0],l=a[1],u=Math.ceil(t[2]/2),c=u*Math.ceil(t[1]/2);return`
    vec4 ${n}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${p}, ${l}, ${c}, ${u}, b, row, col);
      return ${i.texture2D}(${r}, uv);
    }
  `}function QP(o,e){let t=o.shapeInfo.logicalShape,r=o.name,n="get"+r.charAt(0).toUpperCase()+r.slice(1),s=t[1]*t[2],a=t[2],{newShape:i,keptDims:p}=y.squeezeShape(t),l=i;if(l.length<t.length){let g=ep(o,l),h=["row","col","depth"];return`
        ${Zi(g,e)}
        float ${n}(int row, int col, int depth) {
          return ${n}(${tp(h,p)});
        }
      `}if(o.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${s}, ${a}, 1)));
        ${Ji(o)}
      }
    `;let u=o.shapeInfo.texShape,c=u[0],m=u[1],d=o.shapeInfo.flatOffset;if(m===s&&d==null)return e?`
      float ${n}(int row, int col, int depth) {
        int stride1 = ${r}Shape[2];
        float texR = float(row);
        float texC = dot(vec2(col, depth), vec2(stride1, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
        float ${n}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${a}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${m}.0, ${c}.0);
          return sampleTexture(${r}, uv);
        }
      `;if(m===a&&d==null)return e?`
      float ${n}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${r}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
    float ${n}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${t[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${m}.0, ${c}.0);
      return sampleTexture(${r}, uv);
    }
  `;let f=ks(r);return e?`
    float ${n}(int row, int col, int depth) {
      // Explicitly use integer operations as dot() only works on floats.
      int stride0 = ${r}Shape[1] * ${r}Shape[2];
      int stride1 = ${r}Shape[2];
      int index = row * stride0 + col * stride1 + depth + ${f};
      vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index);
      return sampleTexture(${r}, uv);
    }
    `:`
      float ${n}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${s} + col * ${a} + depth + ${f};
        vec2 uv = uvFromFlat(${c}, ${m}, index);
        return sampleTexture(${r}, uv);
      }
  `}function YP(o,e){let t=o.name,r="get"+t.charAt(0).toUpperCase()+t.slice(1),n=Ue();if(e)return`
    vec4 ${r}(int b2, int b, int row, int col) {
      int valuesPerRow = int(ceil(float(${t}Shape[3]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${t}Shape[2]) / 2.0));
      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);
      texelsInBatch *= ${t}Shape[1];
      index = b2 * texelsInBatch + index;
      ivec2 packedTexShape = ivec2(ceil(float(${t}TexShape[0]) / 2.0), ceil(float(${t}TexShape[1]) / 2.0));
      int texR = index / packedTexShape[1];
      int texC = index - texR * packedTexShape[1];
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${n.texture2D}(${t}, uv);
    }
  `;let s=o.shapeInfo.logicalShape,a=s.length,i=o.shapeInfo.texShape,p=[Math.ceil(i[0]/2),Math.ceil(i[1]/2)],l=p[0],u=p[1],c=Math.ceil(s[a-1]/2),m=c*Math.ceil(s[a-2]/2),d="int b, int row, int col",f=`b * ${m} + (row / 2) * ${c} + (col / 2)`;for(let g=2;g<a-1;g++)d=`int b${g}, `+d,m*=s[a-g-1],f=`b${g} * ${m} + `+f;return`
    vec4 ${r}(${d}) {
      int index = ${f};
      int texR = index / ${u};
      int texC = index - texR * ${u};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${u}, ${l});
      return ${n.texture2D}(${t}, uv);
    }
  `}function ZP(o,e){let t=o.shapeInfo.logicalShape,r=o.name,n="get"+r.charAt(0).toUpperCase()+r.slice(1),s=t[3],a=t[2]*s,i=t[1]*a,{newShape:p,keptDims:l}=y.squeezeShape(t);if(p.length<t.length){let b=ep(o,p),w=["row","col","depth","depth2"];return`
      ${Zi(b,e)}
      float ${n}(int row, int col, int depth, int depth2) {
        return ${n}(${tp(w,l)});
      }
    `}if(o.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${i}, ${a}, ${s}, 1)));
        ${Ji(o)}
      }
    `;let u=o.shapeInfo.flatOffset,c=o.shapeInfo.texShape,m=c[0],d=c[1],f=`int stride2 = ${r}Shape[3];`,g=`int stride1 = ${r}Shape[2] * stride2;`,h=`int stride0 = ${r}Shape[1] * stride1;`;if(d===i&&u==null)return e?`
      float ${n}(int row, int col, int depth, int depth2) {
        ${f}
        ${g}
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(stride1, stride2, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${a}, ${s}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${m}.0);
        return sampleTexture(${r}, uv);
      }
    `;if(d===s&&u==null)return e?`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${r}Shape[1] * ${r}Shape[2], ${r}Shape[2], 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${r}TexShape[1], ${r}TexShape[0]);
        return sampleTexture(${r}, uv);
      }
    `:`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${t[1]*t[2]}, ${t[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${m}.0);
        return sampleTexture(${r}, uv);
      }
    `;let x=ks(r);return e?`
    float ${n}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      ${f}
      ${g}
      ${h}
      int index = row * stride0 + col * stride1 +
          depth * stride2 + depth2;
      vec2 uv = uvFromFlat(${r}TexShape[0], ${r}TexShape[1], index + ${x});
      return sampleTexture(${r}, uv);
    }
  `:`
    float ${n}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${i} + col * ${a} +
          depth * ${s} + depth2;
      vec2 uv = uvFromFlat(${m}, ${d}, index + ${x});
      return sampleTexture(${r}, uv);
    }
  `}function JP(o){let e=o.shapeInfo.logicalShape,t=o.name,r="get"+t.charAt(0).toUpperCase()+t.slice(1),n=e[4],s=e[3]*n,a=e[2]*s,i=e[1]*a,{newShape:p,keptDims:l}=y.squeezeShape(e);if(p.length<e.length){let g=ep(o,p),h=["row","col","depth","depth2","depth3"];return`
      ${Zi(g)}
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        return ${r}(${tp(h,l)});
      }
    `}if(o.shapeInfo.isUniform)return`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${i}, ${a}, ${s}, ${n})) +
          depth3;
        ${Ji(o)}
      }
    `;let u=o.shapeInfo.flatOffset,c=o.shapeInfo.texShape,m=c[0],d=c[1];if(d===i&&u==null)return`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${a}, ${s}, ${n}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${m}.0);
        return sampleTexture(${t}, uv);
      }
    `;if(d===n&&u==null)return`
      float ${r}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${e[1]*e[2]*e[3]},
               ${e[2]*e[3]}, ${e[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${m}.0);
        return sampleTexture(${t}, uv);
      }
    `;let f=ks(t);return`
    float ${r}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${i} + col * ${a} + depth * ${s} +
          depth2 * ${n} + depth3 + ${f};
      vec2 uv = uvFromFlat(${m}, ${d}, index);
      return sampleTexture(${t}, uv);
    }
  `}function eV(o){let e=o.shapeInfo.logicalShape,t=o.name,r="get"+t.charAt(0).toUpperCase()+t.slice(1),{newShape:n,keptDims:s}=y.squeezeShape(e);if(n.length<e.length){let h=ep(o,n),x=["row","col","depth","depth2","depth3","depth4"];return`
      ${Zi(h)}
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${r}(${tp(x,s)});
      }
    `}let a=e[5],i=e[4]*a,p=e[3]*i,l=e[2]*p,u=e[1]*l;if(o.shapeInfo.isUniform)return`
      float ${r}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${u}, ${l}, ${p}, ${i})) +
          dot(
            vec2(depth3, depth4),
            vec2(${a}, 1)));
        ${Ji(o)}
      }
    `;let c=o.shapeInfo.flatOffset,m=o.shapeInfo.texShape,d=m[0],f=m[1];if(f===u&&c==null)return`
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(${l}, ${p}, ${i}, ${a})) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${f}.0, ${d}.0);
        return sampleTexture(${t}, uv);
      }
    `;if(f===a&&c==null)return`
      float ${r}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${e[1]*e[2]*e[3]*e[4]},
               ${e[2]*e[3]*e[4]},
               ${e[3]*e[4]},
               ${e[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${f}.0, ${d}.0);
        return sampleTexture(${t}, uv);
      }
    `;let g=ks(t);return`
    float ${r}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${u} + col * ${l} + depth * ${p} +
          depth2 * ${i} + depth3 * ${a} + depth4 + ${g};
      vec2 uv = uvFromFlat(${d}, ${f}, index);
      return sampleTexture(${t}, uv);
    }
  `}function Ji(o){let e=o.name,t=y.sizeFromShape(o.shapeInfo.logicalShape);return t<2?`return ${e};`:`
    for (int i = 0; i < ${t}; i++) {
      if (i == index) {
        return ${e}[i];
      }
    }
  `}function tV(o,e){let t=o.name,r=t.charAt(0).toUpperCase()+t.slice(1),n="get"+r+"AtOutCoords",s=o.shapeInfo.logicalShape.length,a=e.logicalShape.length,i=oT(o.shapeInfo.logicalShape,e.logicalShape),p=me(a),l=a-s,u,c=["x","y","z","w","u","v"];s===0?u="":a<2&&i.length>=1?u="coords = 0;":u=i.map(b=>`coords.${c[b+l]} = 0;`).join(`
`);let m="";a<2&&s>0?m="coords":m=o.shapeInfo.logicalShape.map((b,w)=>`coords.${c[w+l]}`).join(", ");let d="return outputValue;",g=y.sizeFromShape(o.shapeInfo.logicalShape)===1,x=y.sizeFromShape(e.logicalShape)===1;if(s===1&&!g&&!x)d=`
      return vec4(outputValue.xy, outputValue.xy);
    `;else if(g&&!x)a===1?d=`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:d=`
        return vec4(outputValue.x);
      `;else if(i.length){let b=s-2,w=s-1;i.indexOf(b)>-1&&i.indexOf(w)>-1?d="return vec4(outputValue.x);":i.indexOf(b)>-1?d="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":i.indexOf(w)>-1&&(d="return vec4(outputValue.xx, outputValue.zz);")}return`
    vec4 ${n}() {
      ${p} coords = getOutputCoords();
      ${u}
      vec4 outputValue = get${r}(${m});
      ${d}
    }
  `}function oV(o,e){let t=o.name,r=t.charAt(0).toUpperCase()+t.slice(1),n="get"+r+"AtOutCoords",s=e.texShape,a=o.shapeInfo.texShape,i=o.shapeInfo.logicalShape.length,p=e.logicalShape.length;if(!o.shapeInfo.isUniform&&i===p&&o.shapeInfo.flatOffset==null&&y.arraysEqual(a,s))return`
      float ${n}() {
        return sampleTexture(${t}, resultUV);
      }
    `;let l=me(p),u=oT(o.shapeInfo.logicalShape,e.logicalShape),c=p-i,m,d=["x","y","z","w","u","v"];i===0?m="":p<2&&u.length>=1?m="coords = 0;":m=u.map(g=>`coords.${d[g+c]} = 0;`).join(`
`);let f="";return p<2&&i>0?f="coords":f=o.shapeInfo.logicalShape.map((g,h)=>`coords.${d[h+c]}`).join(", "),`
    float ${n}() {
      ${l} coords = getOutputCoords();
      ${m}
      return get${r}(${f});
    }
  `}function me(o){if(o<=1)return"int";if(o===2)return"ivec2";if(o===3)return"ivec3";if(o===4)return"ivec4";if(o===5)return"ivec5";if(o===6)return"ivec6";throw Error(`GPU for rank ${o} is not yet supported`)}function sc(o,e,t){let{newShape:r,keptDims:n}=y.squeezeShape(e),s=e.length,a=o&&s===3&&e[0]===1,i=a?e.slice(1):r,p=!o&&s>1&&!y.arraysEqual(e,t)&&r.length<s||a;return{useSqueezeShape:p,uniformShape:p?i:e,keptDims:n}}function ep(o,e){let t=JSON.parse(JSON.stringify(o));return t.shapeInfo.logicalShape=e,t}function tp(o,e){return e.map(t=>o[t]).join(", ")}function iT(o,e,t,r){let n=t.map((u,c)=>{let m={logicalShape:u.shape,texShape:u.isUniform?null:u.texData.texShape,isUniform:u.isUniform,isPacked:u.isUniform?!1:u.texData.isPacked,flatOffset:null};return u.texData!=null&&u.texData.slice!=null&&u.texData.slice.flatOffset>0&&(m.flatOffset=u.texData.slice.flatOffset),{name:e.variableNames[c],shapeInfo:m}}),s=n.map(u=>u.shapeInfo),a={logicalShape:r.shape,texShape:r.texData.texShape,isUniform:!1,isPacked:r.texData.isPacked,flatOffset:null},i=rT(n,a,e),p=V1(o.gl,i),l=o.createProgram(p);return F().get("ENGINE_COMPILE_ONLY")?{program:e,fragmentShader:p,source:i,webGLProgram:l,inShapeInfos:s,outShapeInfo:a,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(o.buildVao(l),Object.assign({program:e,fragmentShader:p,source:i,webGLProgram:l,inShapeInfos:s,outShapeInfo:a},Zf(o,e,l)))}function Zf(o,e,t){let r=[],n=[],s,a,i,p=null,l=null;l=o.getUniformLocation(t,"NAN",!1),F().getNumber("WEBGL_VERSION")===1&&(p=o.getUniformLocation(t,"INFINITY",!1));let u=!1;for(let c of e.variableNames){let m={name:c,uniform:o.getUniformLocation(t,c,u),offset:o.getUniformLocation(t,`offset${c}`,u)};e.enableShapeUniforms&&(m.shape=o.getUniformLocation(t,`${c}Shape`,u),m.texShape=o.getUniformLocation(t,`${c}TexShape`,u)),r.push(m)}if(e.enableShapeUniforms&&(s=o.getUniformLocation(t,"outShape",u),i=o.getUniformLocation(t,"outShapeStrides",u),a=o.getUniformLocation(t,"outTexShape",u)),e.customUniforms)for(let c of e.customUniforms)n.push(o.getUniformLocation(t,c.name,u));return{variablesLocations:r,customUniformLocations:n,infLoc:p,nanLoc:l,outShapeLocation:s,outShapeStridesLocation:i,outTexShapeLocation:a}}function aT(o,e){if(o.length!==e.length)throw Error(`Binary was compiled with ${o.length} inputs, but was executed with ${e.length} inputs`);o.forEach((t,r)=>{let n=t.logicalShape,s=e[r],a=s.shape;if(!y.arraysEqual(n,a))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${n} and ${a} must match`);if(t.isUniform&&s.isUniform)return;let i=t.texShape,p=s.isUniform?null:s.texData.texShape;if(!y.arraysEqual(i,p))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${i} and ${p} must match`)})}function pT(o,e,t,r,n){e.program.enableShapeUniforms||(aT(e.inShapeInfos,t),aT([e.outShapeInfo],[r]));let s=r.texData.texture,a=r.texData.texShape;r.texData.isPacked?o.setOutputPackedMatrixTexture(s.texture,a[0],a[1]):o.setOutputMatrixTexture(s.texture,a[0],a[1]),o.setProgram(e.webGLProgram),o.bindVertexArray(e.webGLProgram.vao),F().getNumber("WEBGL_VERSION")===1&&e.infLoc!==null&&o.gl.uniform1f(e.infLoc,1/0),e.nanLoc!==null&&o.gl.uniform1f(e.nanLoc,NaN);for(let p=0;p<t.length;++p){let l=t[p],{uniform:u,offset:c,shape:m,texShape:d}=e.variablesLocations[p];if(m){let{uniformShape:f}=sc(e.program.packedInputs,l.shape,l.texData.texShape);switch(f.length){case 1:o.gl.uniform1iv(m,new Int32Array(f));break;case 2:o.gl.uniform2iv(m,new Int32Array(f));break;case 3:o.gl.uniform3iv(m,new Int32Array(f));break;case 4:o.gl.uniform4iv(m,new Int32Array(f));break;default:break}}if(d&&o.gl.uniform2i(d,l.texData.texShape[0],l.texData.texShape[1]),u!=null){if(l.isUniform){if(y.sizeFromShape(l.shape)<2)o.gl.uniform1f(u,l.uniformValues[0]);else{let f=l.uniformValues;f instanceof Float32Array||(f=new Float32Array(f)),o.gl.uniform1fv(u,f)}continue}l.texData.slice!=null&&c!=null&&o.gl.uniform1i(c,l.texData.slice.flatOffset),o.setInputMatrixTexture(l.texData.texture.texture,u,p)}}let i=e.outShapeLocation;if(i)switch(r.shape.length){case 1:o.gl.uniform1iv(i,new Int32Array(r.shape));break;case 2:o.gl.uniform2iv(i,new Int32Array(r.shape));break;case 3:o.gl.uniform3iv(i,new Int32Array(r.shape));break;case 4:o.gl.uniform4iv(i,new Int32Array(r.shape));break;default:break}if(e.outShapeStridesLocation){let p=y.computeStrides(r.shape);switch(r.shape.length){case 2:o.gl.uniform1iv(e.outShapeStridesLocation,new Int32Array(p));break;case 3:o.gl.uniform2iv(e.outShapeStridesLocation,new Int32Array(p));break;case 4:o.gl.uniform3iv(e.outShapeStridesLocation,new Int32Array(p));break;default:break}}if(e.outTexShapeLocation&&o.gl.uniform2i(e.outTexShapeLocation,r.texData.texShape[0],r.texData.texShape[1]),e.program.customUniforms&&n)for(let p=0;p<e.program.customUniforms.length;++p){let l=e.program.customUniforms[p],u=e.customUniformLocations[p],c=n[p];if(l.type==="float")o.gl.uniform1fv(u,c);else if(l.type==="vec2")o.gl.uniform2fv(u,c);else if(l.type==="vec3")o.gl.uniform3fv(u,c);else if(l.type==="vec4")o.gl.uniform4fv(u,c);else if(l.type==="int")o.gl.uniform1iv(u,c);else if(l.type==="ivec2")o.gl.uniform2iv(u,c);else if(l.type==="ivec3")o.gl.uniform3iv(u,c);else if(l.type==="ivec4")o.gl.uniform4iv(u,c);else throw Error(`uniform type ${l.type} is not supported yet.`)}o.executeProgram()}function lT(o,e,t){let r="";e.concat(t).forEach(a=>{let i=a.texData!=null&&a.texData.slice!=null&&a.texData.slice.flatOffset>0;if(o.enableShapeUniforms&&!a.isUniform){let p=a.texData.texShape,{useSqueezeShape:l,uniformShape:u,keptDims:c}=sc(o.packedInputs,a.shape,p),m="",d="",f="";if(u.length===1&&o.packedInputs){let k=[Math.ceil(p[0]/2),Math.ceil(p[1]/2)];m=`${k[0]>1}_${k[1]>1}`}else if(u.length===2&&!o.packedInputs)d=`${u[0]>1}_${u[1]>1}`;else if(u.length>2&&!o.packedInputs){let k=y.computeStrides(u);f=`${k[0]===p[1]}_${k[k.length-1]===p[1]}`}let g=a.shape.length,h=u.length===2&&y.arraysEqual(a.shape,p),x=y.sizeFromShape(a.shape)===1,b=N.getBroadcastDims(a.shape,t.shape),w=!o.packedInputs&&g===t.shape.length&&y.arraysEqual(p,t.texData.texShape),v=o.packedInputs||u.length>2?"":`${p[0]>1}_${p[1]>1}`;r+=`${g}_${w}_${l?c:""}_${u.length}_${x}_${b}_${h}_${m}_${d}_${f}_${v}_${i}`}else{let p=a.isUniform?"uniform":a.texData.texShape;r+=`${a.shape}_${p}_${i}`}});let n=o.userCode,s=o.constructor.name;return s+="_"+r+"_"+n+`${F().getNumber("WEBGL_VERSION")}`,s}function Ae(o){return F().getBool("WEBGL_USE_SHAPES_UNIFORMS")&&o<=4}var ac=class{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=Or.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=Ue();this.outputShape=e,this.enableShapeUniforms=Ae(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?Is(["r","c","d"],e):vo(["r","c","d"],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        ${t.output} = result;
      }
    `}};var ic=class{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=Or.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=Ue();this.outputShape=e,this.enableShapeUniforms=Ae(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?Is(["r","c","d"],e):vo(["r","c","d"],e)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        ${t.output} = result;
      }
    `}};var pc=class{constructor(e){this.variableNames=["A"],this.outTexUsage=_t.DOWNLOAD;let t=Ue();this.outputShape=e,this.userCode=`
      ${nc}

      void main() {
        float x = getAAtOutCoords();
        ${t.output} = encode_float(x);
      }
    `}};var lc=class{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=_t.DOWNLOAD;let t=Ue();this.outputShape=e,this.userCode=`
      ${nc}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${t.output} = encode_float(x);
      }
    `}};var sV={R:0,G:1,B:2,A:3},Qp=class{constructor(e,t=!1,r="RGBA"){this.variableNames=["A"],this.customUniforms=[{name:"texShape",type:"ivec2"}];let n=Ue();this.outputShape=e,this.enableShapeUniforms=Ae(this.outputShape.length);let s="result";t&&(s="floor(result * 255. + 0.5)");let a="";for(let i=0;i<r.length;i++){let p=r[i];a+=`
          if(offset == ${i}) {
            result = values[${sV[p]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?Qi():Xi(e)}

      void main() {
        ivec3 coords = getOutputCoords();
        int flatIndex = getFlatIndex(coords);
        float result = 0.;
        int offset = imod(flatIndex, ${r.length});

        flatIndex = idiv(flatIndex, ${r.length}, 1.);

        int r = flatIndex / texShape[1];
        if (r < texShape[0]) {
          int c = imod(flatIndex, texShape[1]);
          vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
          vec4 values = ${n.texture2D}(A, uv);
          ${a}
        }
        ${n.output} = vec4(${s}, 0., 0., 0.);
      }
    `}};var uc=class{constructor(e,t=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:"texShape",type:"ivec2"}];let r=Ue();this.outputShape=e,this.enableShapeUniforms=Ae(this.outputShape.length);let n="",s="result";t&&(s="floor(result * 255. + 0.5)");for(let a=0;a<=1;a++)for(let i=0;i<=1;i++){let p=a*2+i;n+=`
          localCoords = coords;
          if(localCoords[2] + ${i} < ${this.enableShapeUniforms?"outShape[2]":`${e[2]}`}) {
          localCoords[2] += ${i};
          if (localCoords[1] + ${a} < ${this.enableShapeUniforms?"outShape[1]":`${e[1]}`}) {
            localCoords[1] += ${a};

            flatIndex = getFlatIndex(localCoords);
            offset = imod(flatIndex, 4);

            flatIndex = idiv(flatIndex, 4, 1.);

            int r = flatIndex / texShape[1];
            int c = imod(flatIndex, texShape[1]);
            vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
            values = ${r.texture2D}(A, uv);

            if (offset == 0) {
              result[${p}] = values[0];
            } else if (offset == 1) {
              result[${p}] = values[1];
            } else if (offset == 2) {
              result[${p}] = values[2];
            } else {
              result[${p}] = values[3];
            }
          }
        }
        `}this.userCode=`
        ${this.enableShapeUniforms?Qi():Xi(e)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${n}

          ${r.output} = ${s};
        }
    `}};function uT(o){let e=Ue(),t=`${e.version}
    precision highp float;
    ${e.attribute} vec3 clipSpacePos;
    ${e.attribute} vec2 uv;
    ${e.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`;return P1(o,t)}function cT(o){let e=new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]);return B1(o,e)}function mT(o){let e=new Uint16Array([0,1,2,2,1,3]);return z1(o,e)}function Yp(o,e,t,r,n,s){W1(e,t);let a=U1(o),i=o.TEXTURE_2D;return te(o,()=>o.bindTexture(i,a)),te(o,()=>o.texParameteri(i,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE)),te(o,()=>o.texParameteri(i,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE)),te(o,()=>o.texParameteri(i,o.TEXTURE_MIN_FILTER,o.NEAREST)),te(o,()=>o.texParameteri(i,o.TEXTURE_MAG_FILTER,o.NEAREST)),F().getNumber("WEBGL_VERSION")===1?te(o,()=>o.texImage2D(i,0,r,e,t,0,n,s,null)):te(o,()=>o.texStorage2D(i,1,r,e,t)),te(o,()=>o.bindTexture(o.TEXTURE_2D,null)),{texture:a,texShape:[t,e]}}function Jf(o){return o.internalFormatFloat}function dT(o,e,t,r){let[n,s]=Ns(e,t);return Yp(o,n,s,Jf(r),r.textureFormatFloat,o.FLOAT)}function eh(o){return o.internalFormatHalfFloat}function fT(o,e,t,r){let[n,s]=Ns(e,t);return Yp(o,n,s,eh(r),r.textureFormatFloat,r.textureTypeHalfFloat)}function th(o){return o.downloadTextureFormat}function hT(o,e,t,r){let[n,s]=Ns(e,t);return Yp(o,n,s,th(r),o.RGBA,o.UNSIGNED_BYTE)}function oh(o){return o.internalFormatPackedFloat}function gT(o,e,t,r){let[n,s]=zo(e,t);return Yp(o,n,s,oh(r),o.RGBA,o.FLOAT)}function rh(o){return o.internalFormatPackedHalfFloat}function xT(o,e,t,r){let[n,s]=zo(e,t);return Yp(o,n,s,rh(r),o.RGBA,r.textureTypeHalfFloat)}function yT(o,e,t){return te(o,()=>o.bindBuffer(o.ARRAY_BUFFER,t)),Xf(o,e,"clipSpacePos",t,3,20,0)&&Xf(o,e,"uv",t,2,20,12)}function bT(o,e,t,r,n,s){te(o,()=>o.bindTexture(o.TEXTURE_2D,e));let a,i,p;n instanceof Uint8Array?(a=new Uint8Array(t*r*4),i=o.UNSIGNED_BYTE,p=o.RGBA):(a=new Float32Array(t*r*4),i=o.FLOAT,p=s.internalFormatPackedFloat),a.set(n),F().getNumber("WEBGL_VERSION")===2?te(o,()=>o.texSubImage2D(o.TEXTURE_2D,0,0,0,t,r,o.RGBA,i,a)):te(o,()=>o.texImage2D(o.TEXTURE_2D,0,p,t,r,0,o.RGBA,i,a)),te(o,()=>o.bindTexture(o.TEXTURE_2D,null))}function _T(o,e,t){te(o,()=>o.bindTexture(o.TEXTURE_2D,e)),t.data instanceof Uint8Array?F().getNumber("WEBGL_VERSION")===2?te(o,()=>o.texSubImage2D(o.TEXTURE_2D,0,0,0,t.width,t.height,o.RGBA,o.UNSIGNED_BYTE,t.data)):te(o,()=>o.texImage2D(o.TEXTURE_2D,0,o.RGBA,t.width,t.height,0,o.RGBA,o.UNSIGNED_BYTE,t.data)):F().getNumber("WEBGL_VERSION")===2?te(o,()=>o.texSubImage2D(o.TEXTURE_2D,0,0,0,o.RGBA,o.UNSIGNED_BYTE,t)):te(o,()=>o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,t)),te(o,()=>o.bindTexture(o.TEXTURE_2D,null))}function TT(o,e,t,r){let n=o.createBuffer();te(o,()=>o.bindBuffer(o.PIXEL_PACK_BUFFER,n));let i=4*4*e*t;return te(o,()=>o.bufferData(o.PIXEL_PACK_BUFFER,i,o.STREAM_READ)),te(o,()=>o.readPixels(0,0,t,e,o.RGBA,o.FLOAT,0)),te(o,()=>o.bindBuffer(o.PIXEL_PACK_BUFFER,null)),n}function vT(o,e,t){let r=o,n=new Float32Array(t);return r.bindBuffer(r.PIXEL_PACK_BUFFER,e),r.getBufferSubData(r.PIXEL_PACK_BUFFER,0,n),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),n}function wT(o,e,t,r){let[n,s]=Ns(e,t),a=4,i=new Uint8Array(D1(e*t,a));return te(o,()=>o.readPixels(0,0,n,s,r.downloadTextureFormat,o.UNSIGNED_BYTE,i)),new Float32Array(i.buffer)}function CT(o,e,t,r,n,s,a,i){let p=o,l=new Float32Array(R1(s,a));return p.bindBuffer(p.PIXEL_PACK_BUFFER,e),p.getBufferSubData(p.PIXEL_PACK_BUFFER,0,l),p.bindBuffer(p.PIXEL_PACK_BUFFER,null),l}function NT(o,e,t){let r=new Float32Array(e*t*4);return te(o,()=>o.readPixels(0,0,t,e,o.RGBA,o.FLOAT,r)),r}var op=class{constructor(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];let t=F().getNumber("WEBGL_VERSION");if(e!=null?(this.gl=e,F1(t,e)):this.gl=Kt(t),e=this.gl,F().getNumber("WEBGL_VERSION")===2){let s=e;this.createVertexArray=()=>te(s,()=>s.createVertexArray()),this.bindVertexArray=a=>te(s,()=>s.bindVertexArray(a)),this.deleteVertexArray=a=>te(s,()=>s.deleteVertexArray(a)),this.getVertexArray=()=>te(s,()=>s.getParameter(s.VERTEX_ARRAY_BINDING))}else if(e!=null){let s=e.getExtension("OES_vertex_array_object");if(s==null)throw new Error("All WebGL1 implementations are expected to offer OES_vertex_array_object.");this.createVertexArray=()=>te(e,()=>s.createVertexArrayOES()),this.bindVertexArray=a=>te(e,()=>s.bindVertexArrayOES(a)),this.deleteVertexArray=a=>te(e,()=>s.deleteVertexArrayOES(a)),this.getVertexArray=()=>te(e,()=>e.getParameter(s.VERTEX_ARRAY_BINDING_OES))}let r="WEBGL_color_buffer_float",n="EXT_color_buffer_half_float";if(this.parallelCompilationExtension=this.gl.getExtension("KHR_parallel_shader_compile"),F().getNumber("WEBGL_VERSION")===1){let s="OES_texture_float",a="OES_texture_half_float";if(this.textureFloatExtension=Kp(this.gl,s),ro(this.gl,a))this.textureHalfFloatExtension=Kp(this.gl,a);else if(F().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(r),ro(this.gl,n))this.colorBufferHalfFloatExtension=Kp(this.gl,n);else if(F().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(r="EXT_color_buffer_float",ro(this.gl,r))this.colorBufferFloatExtension=this.gl.getExtension(r);else if(ro(this.gl,n))this.colorBufferHalfFloatExtension=this.gl.getExtension(n);else throw new Error("GL context does not support color renderable floats");this.vertexBuffer=cT(this.gl),this.indexBuffer=mT(this.gl),this.framebuffer=G1(this.gl),this.textureConfig=qp(this.gl,this.textureHalfFloatExtension)}get debug(){return F().getBool("DEBUG")}dispose(){if(this.disposed)return;this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");let e=this.gl;te(e,()=>e.finish()),te(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),te(e,()=>e.deleteFramebuffer(this.framebuffer)),te(e,()=>e.bindBuffer(e.ARRAY_BUFFER,null)),te(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)),te(e,()=>e.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(e,t){return this.throwIfDisposed(),dT(this.gl,e,t,this.textureConfig)}createFloat16MatrixTexture(e,t){return this.throwIfDisposed(),fT(this.gl,e,t,this.textureConfig)}createUnsignedBytesMatrixTexture(e,t){return this.throwIfDisposed(),hT(this.gl,e,t,this.textureConfig)}uploadPixelDataToTexture(e,t){this.throwIfDisposed(),_T(this.gl,e,t)}uploadDenseMatrixToTexture(e,t,r,n){this.throwIfDisposed(),bT(this.gl,e,t,r,n,this.textureConfig)}createFloat16PackedMatrixTexture(e,t){return this.throwIfDisposed(),xT(this.gl,e,t,this.textureConfig)}createPackedMatrixTexture(e,t){return this.throwIfDisposed(),gT(this.gl,e,t,this.textureConfig)}deleteMatrixTexture(e){this.throwIfDisposed(),this.outputTexture===e&&(Qf(this.gl,this.framebuffer),this.outputTexture=null),te(this.gl,()=>this.gl.deleteTexture(e))}downloadByteEncodedFloatMatrixFromOutputTexture(e,t,r){return this.downloadMatrixDriver(e,()=>wT(this.gl,t,r,this.textureConfig))}downloadPackedMatrixFromBuffer(e,t,r,n,s,a){return CT(this.gl,e,t,r,n,s,a,this.textureConfig)}downloadFloat32MatrixFromBuffer(e,t){return vT(this.gl,e,t)}createBufferFromTexture(e,t,r){this.bindTextureToFrameBuffer(e);let n=TT(this.gl,t,r,this.textureConfig);return this.unbindTextureToFrameBuffer(),n}createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,r;if(F().getBool("WEBGL_FENCE_API_ENABLED")){let n=e,s=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),r=()=>{let a=n.clientWaitSync(s,0,0);return a===n.ALREADY_SIGNALED||a===n.CONDITION_SATISFIED},t=s}else F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(t=this.beginQuery(),this.endQuery(),r=()=>this.isQueryAvailable(t,F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):r=()=>!0;return{query:t,isFencePassed:r}}downloadMatrixFromPackedTexture(e,t,r){return this.downloadMatrixDriver(e,()=>NT(this.gl,t,r))}createProgram(e){this.throwIfDisposed();let t=this.gl;this.vertexShader==null&&(this.vertexShader=uT(t));let r=L1(t);te(t,()=>t.attachShader(r,this.vertexShader)),te(t,()=>t.attachShader(r,e)),M1(t,r);let n=Object.assign(r,{vao:this.createVertexArray()});return this.debug&&tc(t,n),n}buildVao(e){this.setProgram(e),this.bindVertexArray(e.vao);let t=this.gl;te(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),yT(t,e,this.vertexBuffer)}deleteProgram(e){this.throwIfDisposed(),e===this.program&&(this.program=null),e!=null&&(te(this.gl,()=>this.gl.deleteProgram(e)),this.deleteVertexArray(e.vao))}setProgram(e){this.throwIfDisposed(),this.program=e,this.program!=null&&this.debug&&tc(this.gl,this.program),te(this.gl,()=>this.gl.useProgram(e))}getUniformLocation(e,t,r=!0){return this.throwIfDisposed(),r?H1(this.gl,e,t):q1(this.gl,e,t)}getAttributeLocation(e,t){return this.throwIfDisposed(),te(this.gl,()=>this.gl.getAttribLocation(e,t))}getUniformLocationNoThrow(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)}setInputMatrixTexture(e,t,r){this.throwIfDisposed(),this.throwIfNoProgram(),K1(this.gl,e,t,r)}setOutputMatrixTexture(e,t,r){this.setOutputMatrixTextureDriver(e,r,t)}setOutputPackedMatrixTexture(e,t,r){this.throwIfDisposed();let[n,s]=zo(t,r);this.setOutputMatrixTextureDriver(e,n,s)}setOutputMatrixWriteRegion(e,t,r,n){this.setOutputMatrixWriteRegionDriver(r,e,n,t)}setOutputPackedMatrixWriteRegion(e,t,r,n){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){this.program!=null&&tc(this.gl,this.program),jp(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();let e=this.gl;if(this.debug){let t=this.getVertexArray();console.assert(t===this.program.vao,"VAO changed between setProgram and executeProgram!"),this.debugValidate()}te(e,()=>e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),te(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=Kp(this.gl,F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){let r=this.gl,n=this.getQueryTimerExtensionWebGL2(),s=r.createQuery();return r.beginQuery(n.TIME_ELAPSED_EXT,s),s}let e=this.getQueryTimerExtensionWebGL1(),t=e.createQueryEXT();return e.beginQueryEXT(e.TIME_ELAPSED_EXT,t),t}endQuery(){if(F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){let t=this.gl,r=this.getQueryTimerExtensionWebGL2();t.endQuery(r.TIME_ELAPSED_EXT);return}let e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(e){return await y.repeatedTry(()=>this.disposed||this.isQueryAvailable(e,F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(e,F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}getQueryTime(e,t){if(t===0)return null;if(t===2){let r=this.gl;return r.getQueryParameter(e,r.QUERY_RESULT)/1e6}else{let r=this.getQueryTimerExtensionWebGL1();return r.getQueryObjectEXT(e,r.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(e,t){if(t===0)return!0;if(t===2){let r=this.gl,n=this.getQueryTimerExtensionWebGL2(),s=r.getQueryParameter(e,r.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(n.GPU_DISJOINT_EXT)),s&&!this.disjoint}else{let r=this.getQueryTimerExtensionWebGL1(),n=r.getQueryObjectEXT(e,r.QUERY_RESULT_AVAILABLE_EXT);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(r.GPU_DISJOINT_EXT)),n&&!this.disjoint}}pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=iV(this.itemsToPoll.map(t=>t.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:r}=this.itemsToPoll[t];r()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}addItemToPoll(e,t){if(this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1)return;let r;"setTimeoutCustom"in F().platform&&(r=F().platform.setTimeoutCustom.bind(F().platform)),y.repeatedTry(()=>(this.pollItems(),this.itemsToPoll.length===0),()=>0,null,r)}bindTextureToFrameBuffer(e){this.throwIfDisposed(),oc(this.gl,e,this.framebuffer),this.debug&&jp(this.gl)}unbindTextureToFrameBuffer(){this.outputTexture!=null?(oc(this.gl,this.outputTexture,this.framebuffer),this.debug&&jp(this.gl)):Qf(this.gl,this.framebuffer)}downloadMatrixDriver(e,t){this.bindTextureToFrameBuffer(e);let r=t();return this.unbindTextureToFrameBuffer(),r}setOutputMatrixTextureDriver(e,t,r){this.throwIfDisposed();let n=this.gl;oc(n,e,this.framebuffer),this.debug&&jp(n),this.outputTexture=e,te(n,()=>n.viewport(0,0,t,r)),te(n,()=>n.scissor(0,0,t,r))}setOutputMatrixWriteRegionDriver(e,t,r,n){this.throwIfDisposed(),te(this.gl,()=>this.gl.scissor(e,t,r,n))}throwIfDisposed(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(this.program==null)throw new Error("No GPU program is currently set.")}};function iV(o){let e=0;for(;e<o.length&&o[e]();++e);return e-1}var Rh={};Fe(Rh,{addImpl:()=>ah,bincountImpl:()=>sp,bincountReduceImpl:()=>cc,bitwiseAndImpl:()=>ih,castImpl:()=>sh,ceilImpl:()=>ph,concatImpl:()=>mc,equalImpl:()=>lh,expImpl:()=>ch,expm1Impl:()=>dh,floorDivImpl:()=>hh,floorImpl:()=>fh,gatherNdImpl:()=>dc,gatherV2Impl:()=>fc,greaterEqualImpl:()=>xh,greaterImpl:()=>gh,lessEqualImpl:()=>bh,lessImpl:()=>yh,linSpaceImpl:()=>hc,logImpl:()=>_h,maxImpl:()=>gc,maximumImpl:()=>Th,minimumImpl:()=>vh,multiplyImpl:()=>Zp,negImpl:()=>wh,notEqualImpl:()=>Ch,prodImpl:()=>Nh,raggedGatherImpl:()=>xc,raggedRangeImpl:()=>yc,raggedTensorToTensorImpl:()=>bc,rangeImpl:()=>_c,rsqrtImpl:()=>Ih,scatterImpl:()=>wo,sigmoidImpl:()=>ov,simpleAbsImpl:()=>nh,sliceImpl:()=>Eh,sparseFillEmptyRowsImpl:()=>Tc,sparseReshapeImpl:()=>vc,sparseSegmentReductionImpl:()=>ip,sqrtImpl:()=>sv,squaredDifferenceImpl:()=>$h,staticRegexReplaceImpl:()=>Ah,stridedSliceImpl:()=>wc,stringNGramsImpl:()=>Cc,stringSplitImpl:()=>Nc,stringToHashBucketFastImpl:()=>Sc,subImpl:()=>Dh,tileImpl:()=>Ic,topKImpl:()=>kc,transposeImpl:()=>ap,uniqueImpl:()=>Ec});function U(o,e){Array.isArray(o)||(o=[o]),o.forEach(t=>{t!=null&&y.assert(t.dtype!=="complex64",()=>`${e} does not support complex64 tensors in the CPU backend.`)})}function nh(o){let e=new Float32Array(o.length);for(let t=0;t<o.length;++t)e[t]=Math.abs(o[t]);return e}var pV=o=>{let{x:e}=o.inputs,t=o.backend;U(e,"abs");let r=new Float32Array(y.sizeFromShape(e.shape)),n=t.data.get(e.dataId).values;return r=nh(n),t.makeOutput(r,e.shape,e.dtype)},ST={kernelName:Ws,backendName:"cpu",kernelFunc:pV};function xe(o){return(e,t,r,n,s)=>{let a=N.assertAndGetBroadcastShape(e,t),i=a.length,p=y.computeStrides(a),l=y.sizeFromShape(a),u=y.getTypedArrayFromDType(s,l),c=e.length,m=t.length,d=y.computeStrides(e),f=y.computeStrides(t),g=N.getBroadcastDims(e,a),h=N.getBroadcastDims(t,a);if(g.length+h.length===0)for(let x=0;x<u.length;++x)u[x]=o(r[x%r.length],n[x%n.length]);else for(let x=0;x<u.length;++x){let b=y.indexToLoc(x,i,p),w=b.slice(-c);g.forEach($=>w[$]=0);let v=y.locToIndex(w,c,d),k=b.slice(-m);h.forEach($=>k[$]=0);let E=y.locToIndex(k,m,f);u[x]=o(r[v],n[E])}return[u,a]}}function st(o){let{inputs:e,backend:t}=o,{real:r,imag:n}=e,s=t.data.get(r.dataId).values,a=t.data.get(n.dataId).values,i=t.makeTensorInfo(r.shape,"complex64"),p=t.data.get(i.dataId);return p.complexTensorInfos={real:t.makeTensorInfo(r.shape,"float32",s),imag:t.makeTensorInfo(n.shape,"float32",a)},i}var IT={kernelName:ta,backendName:"cpu",kernelFunc:st};function rp(o,e,t="float32"){if(t==="complex64"){let n=rp(o,e,"float32"),s=rp(o,e,"float32");return st({inputs:{real:n,imag:s},backend:o})}let r=y.makeZerosTypedArray(y.sizeFromShape(e),t);return o.makeTensorInfo(e,t,r)}function Tt(o){let{inputs:e,backend:t}=o,{x:r}=e;return t.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}var kT={kernelName:yr,backendName:"cpu",kernelFunc:Tt};function co(o){let{inputs:e,backend:t}=o,{input:r}=e,n=t.data.get(r.dataId).complexTensorInfos.real,s=t.data.get(n.dataId).values;return t.makeTensorInfo(n.shape,n.dtype,s)}var ET={kernelName:ei,backendName:"cpu",kernelFunc:co};function sh(o,e,t,r){if(r==="int32"){let n=Int32Array.from(o);return[e,"int32",n]}if(r==="bool"){let n=y.toTypedArray([0],t),[s,a]=xe((i,p)=>i!==p?1:0)(e,[],o,n,"bool");return[a,"bool",s]}throw new Error(`Error in Cast: failed to cast ${t} to ${r}`)}function mo(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{dtype:s}=r;if(s==="complex64"){if(n.dtype==="complex64")return Tt({inputs:{x:n},backend:t});let u=rp(t,n.shape,n.dtype),c=mo({inputs:{x:n},backend:t,attrs:{dtype:"float32"}}),m=st({inputs:{real:c,imag:u},backend:t});return t.disposeIntermediateTensorInfo(u),t.disposeIntermediateTensorInfo(c),m}if(n.dtype==="complex64"){let u=co({inputs:{input:n},backend:t}),c=mo({inputs:{x:u},backend:t,attrs:{dtype:s}});return t.disposeIntermediateTensorInfo(u),c}if(!y.hasEncodingLoss(n.dtype,s)){let u=Tt({inputs:{x:n},backend:t});return{dataId:u.dataId,shape:u.shape,dtype:s}}let a=t.data.get(n.dataId).values,[i,p,l]=sh(a,n.shape,n.dtype,s);return t.makeTensorInfo(i,p,l)}var $T={kernelName:xr,backendName:"cpu",kernelFunc:mo};function Ce(o,e,t,r){return t==null?({inputs:n,backend:s})=>{let{a,b:i}=n,p=s;U([a,i],o);let l=p.data.get(a.dataId).values,u=p.data.get(i.dataId).values,c=a.dtype==="string"?N.fromUint8ToStringArray(l):l,m=a.dtype==="string"?N.fromUint8ToStringArray(u):u,d=r||a.dtype,[f,g]=e(a.shape,i.shape,c,m,d);return p.makeTensorInfo(g,d,f)}:({inputs:n,backend:s})=>{let{a,b:i}=n,p=s;if(a.dtype==="complex64"||i.dtype==="complex64"){let l=mo({inputs:{x:a},backend:p,attrs:{dtype:"complex64"}}),u=p.data.get(l.dataId),c=u.complexTensorInfos.real,m=u.complexTensorInfos.imag,d=p.data.get(c.dataId).values,f=p.data.get(m.dataId).values,g=mo({inputs:{x:i},backend:p,attrs:{dtype:"complex64"}}),h=p.data.get(g.dataId),x=h.complexTensorInfos.real,b=h.complexTensorInfos.imag,w=p.data.get(x.dataId).values,v=p.data.get(b.dataId).values,[k,E,$]=t(a.shape,i.shape,d,f,w,v),A=p.makeTensorInfo($,"float32",k),D=p.makeTensorInfo($,"float32",E),R=st({inputs:{real:A,imag:D},backend:p});return p.disposeIntermediateTensorInfo(l),p.disposeIntermediateTensorInfo(g),p.disposeIntermediateTensorInfo(A),p.disposeIntermediateTensorInfo(D),R}else{let l=p.data.get(a.dataId).values,u=p.data.get(i.dataId).values,c=r||a.dtype,[m,d]=e(a.shape,i.shape,l,u,c);return p.makeTensorInfo(d,c,m)}}}function np(o){return(e,t,r,n,s,a)=>{let i=N.assertAndGetBroadcastShape(e,t),p=y.sizeFromShape(i),l=i.length,u=y.computeStrides(i),c=y.getTypedArrayFromDType("float32",p),m=y.getTypedArrayFromDType("float32",p),d=N.getBroadcastDims(e,i),f=N.getBroadcastDims(t,i),g=N.mergeRealAndImagArrays(r,n),h=N.mergeRealAndImagArrays(s,a),x=e.length,b=y.computeStrides(e),w=t.length,v=y.computeStrides(t);if(d.length+f.length===0)for(let k=0;k<c.length;k++){let E=k%g.length,$=k%h.length,A=o(g[E*2],g[E*2+1],h[$*2],h[$*2+1]);c[k]=A.real,m[k]=A.imag}else for(let k=0;k<c.length;k++){let E=y.indexToLoc(k,l,u),$=E.slice(-x);d.forEach(V=>$[V]=0);let A=y.locToIndex($,x,b),D=E.slice(-w);f.forEach(V=>D[V]=0);let R=y.locToIndex(D,w,v),P=o(g[A*2],g[A*2+1],h[R*2],h[R*2+1]);c[k]=P.real,m[k]=P.imag}return[c,m,i]}}var ah=xe((o,e)=>o+e),lV=np((o,e,t,r)=>({real:o+t,imag:e+r})),Wo=Ce(Qo,ah,lV),AT={kernelName:Qo,backendName:"cpu",kernelFunc:Wo};function sp(o,e,t,r,n){let s=y.sizeFromShape(r),a=y.makeZerosTypedArray(n,t);for(let i=0;i<o.length;i++){let p=o[i];if(p<0)throw new Error("Input x must be non-negative!");p>=n||(s>0?a[p]+=e[i]:a[p]+=1)}return a}function cc(o,e,t,r=!1){let n=o.shape[0],s=o.shape[1],a=oe([n,t],e.dtype);for(let i=0;i<n;i++)for(let p=0;p<s;p++){let l=o.get(i,p);if(l<0)throw new Error("Input x must be non-negative!");l>=t||(r?a.set(1,i,l):e.size>0?a.set(a.get(i,l)+e.get(i,p),i,l):a.set(a.get(i,l)+1,i,l))}return a}var ih=xe((o,e)=>o&e),uV=Ce(tn,ih),FT={kernelName:tn,backendName:"cpu",kernelFunc:uV};function pt(o){return(e,t,r)=>{let n=y.getArrayFromDType(t,e.length);for(let s=0;s<e.length;++s)n[s]=o(e[s],r);return n}}function ie(o,e,t){let r=pt(e);return Pt(o,r,t)}function Pt(o,e,t){return({inputs:r,attrs:n,backend:s})=>{let{x:a}=r;U(a,o);let i=s,p=i.data.get(a.dataId).values,l;if(a.dtype==="string"){if(!Array.isArray(p))throw new Error("String tensor's value was not an instance of Array");l=N.fromUint8ToStringArray(p)}else l=p;let u=t||a.dtype,c=e(l,u,n);return i.makeTensorInfo(a.shape,u,c)}}var ph=pt(o=>Math.ceil(o)),cV=Pt(on,ph),DT={kernelName:on,backendName:"cpu",kernelFunc:cV};function mc(o,e,t,r){let n=y.getArrayFromDType(t,y.sizeFromShape(e));if(r&&t!=="string"){let s=0;o.forEach(a=>{let i=y.sizeFromShape(a.shape);n.set(a.vals,s),s+=i})}else{let s=0;o.forEach(a=>{let i=t==="string"?N.fromUint8ToStringArray(a.vals):a.vals,p=0;for(let l=0;l<a.shape[0];++l){let u=l*e[1]+s;for(let c=0;c<a.shape[1];++c)n[u+c]=i[p++]}s+=a.shape[1]})}return n}var lh=xe((o,e)=>o===e?1:0),uh=Ce(un,lh,null,"bool"),RT={kernelName:un,backendName:"cpu",kernelFunc:uh};var ch=pt(o=>Math.exp(o)),mh=Pt(cn,ch,"float32"),OT={kernelName:cn,backendName:"cpu",kernelFunc:mh};var dh=pt(o=>Math.expm1(o)),mV=Pt(mn,dh),PT={kernelName:mn,backendName:"cpu",kernelFunc:mV};var fh=pt(o=>Math.floor(o)),dV=Pt(dn,fh),VT={kernelName:dn,backendName:"cpu",kernelFunc:dV};var hh=xe((o,e)=>Math.floor(o/e)),fV=Ce(fn,hh,null,"int32"),LT={kernelName:fn,backendName:"cpu",kernelFunc:fV};function dc(o,e,t,r,n,s,a,i,p){let l=oe([r,s],t);for(let u=0;u<r;u++){let c=[],m=0;for(let d=0;d<n;d++){let f=o[u*n+d];m+=f*a[d],c.push(f)}if(m<0||m>=p/s)throw new Error(`Invalid indices: ${c} does not index into ${i}`);for(let d=0;d<s;d++)l.values[u*s+d]=e.get(...e.indexToLoc(m*s+d))}return l}function fc(o,e,t){let r=oe(t,o.dtype);for(let n=0;n<r.size;++n){let a=r.indexToLoc(n).slice(),i=a[0],p=a[2],l=e.locToIndex([i,p]);a[2]=e.values[l];let u=o.locToIndex(a);0<=u&&u<o.values.length&&(r.values[n]=o.values[u])}return r}var gh=xe((o,e)=>o>e?1:0),hV=Ce(hn,gh,null,"bool"),MT={kernelName:hn,backendName:"cpu",kernelFunc:hV};var xh=xe((o,e)=>o>=e?1:0),gV=Ce(gn,xh,null,"bool"),BT={kernelName:gn,backendName:"cpu",kernelFunc:gV};var yh=xe((o,e)=>o<e?1:0),xV=Ce(_n,yh,null,"bool"),zT={kernelName:_n,backendName:"cpu",kernelFunc:xV};var bh=xe((o,e)=>o<=e?1:0),yV=Ce(Tn,bh,null,"bool"),UT={kernelName:Tn,backendName:"cpu",kernelFunc:yV};function hc(o,e,t){let r=(e-o)/(t-1),n=y.makeZerosTypedArray(t,"float32");n[0]=o;for(let s=1;s<n.length;s++)n[s]=n[s-1]+r;return n}var _h=pt(o=>Math.log(o)),bV=Pt(vn,_h),WT={kernelName:vn,backendName:"cpu",kernelFunc:bV};function gc(o,e,t,r){let n=y.getTypedArrayFromDType(r,y.sizeFromShape(t));for(let s=0;s<n.length;++s){let a=s*e,i=o[a];for(let p=0;p<e;++p){let l=o[a+p];(Number.isNaN(l)||l>i)&&(i=l)}n[s]=i}return n}var Th=xe((o,e)=>Math.max(o,e)),_V=Ce(In,Th),GT={kernelName:In,backendName:"cpu",kernelFunc:_V};var vh=xe((o,e)=>Math.min(o,e)),TV=Ce(kn,vh),HT={kernelName:kn,backendName:"cpu",kernelFunc:TV};var Zp=xe((o,e)=>o*e),vV=np((o,e,t,r)=>({real:o*t-e*r,imag:o*r+e*t})),Es=Ce($n,Zp,vV),qT={kernelName:$n,backendName:"cpu",kernelFunc:Es};function wh(o,e,t){let r=y.createScalarValue(-1,t);return Zp([],e,r,o,t)}function wV(o){let{inputs:e,backend:t}=o,{x:r}=e;U(r,"neg");let n=t.data.get(r.dataId).values,[s,a]=wh(n,r.shape,r.dtype);return t.makeTensorInfo(a,r.dtype,s)}var KT={kernelName:Ba,backendName:"cpu",kernelFunc:wV};var Ch=xe((o,e)=>o!==e?1:0),CV=Ce(An,Ch,null,"bool"),jT={kernelName:An,backendName:"cpu",kernelFunc:CV};function ap(o,e,t,r,n){let s=e.length,a=y.sizeFromShape(e),i=y.computeStrides(e),p=y.computeStrides(n),l=y.getTypedArrayFromDType(t,y.sizeFromShape(n));for(let u=0;u<a;++u){let c=y.indexToLoc(u,s,i),m=new Array(c.length);for(let f=0;f<m.length;f++)m[f]=c[r[f]];let d=y.locToIndex(m,s,p);l[d]=o[u]}return l}function We(o){let{inputs:e,attrs:t,backend:r}=o,{x:n}=e,{perm:s}=t;U(n,"transpose");let a=n.shape.length,i=new Array(a);for(let c=0;c<i.length;c++)i[c]=n.shape[s[c]];let p=r.data.get(n.dataId).values,l=ap(p,n.shape,n.dtype,s,i);return{dataId:r.write(l,i,n.dtype),shape:i,dtype:n.dtype}}var XT={kernelName:_r,backendName:"cpu",kernelFunc:We};function Nh(o,e,t,r){let[n,s]=N.computeOutAndReduceShapes(o,r),a=et(e,"int32"),i=y.makeZerosTypedArray(y.sizeFromShape(n),a),p=y.sizeFromShape(s);for(let l=0;l<i.length;++l){let u=l*p,c=1;for(let m=0;m<p;++m)c*=t[u+m];i[l]=c}return{outVals:i,outShape:n,outDtype:a}}function NV(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,keepDims:a}=r;U(n,"prod");let i=n.shape.length,p=y.parseAxisParam(s,n.shape),l=N.getAxesPermutation(p,i),u=p,c=n,m=[];l!=null&&(c=We({inputs:{x:n},backend:t,attrs:{perm:l}}),m.push(c),u=N.getInnerMostAxes(u.length,i));let d=t.data.get(c.dataId).values,{outVals:f,outShape:g,outDtype:h}=Nh(c.shape,c.dtype,d,u),x=g;return a&&(x=N.expandShapeToKeepDim(g,p)),m.forEach(b=>t.disposeIntermediateTensorInfo(b)),t.makeTensorInfo(x,h,f)}var QT={kernelName:Xa,backendName:"cpu",kernelFunc:NV};function SV(o,e,t){o.forEach((r,n)=>{if(r<0||r>=t){let s=y.indexToLoc(n,e.length,y.computeStrides(e)).join(",");throw new Error(`indices[${s}] = ${r} is not in [0, ${t})`)}})}function IV(o,e){for(let t=0;t<o.length;++t){let r=o[t],n=t===o.length-1?e:o[t+1].length;if(r.length===0)throw new Error("Ragged splits may not be empty");if(r[0]<0)throw new Error("Ragged splits must be non-negative");if(r[r.length-1]>n)throw new Error("Ragged splits must not point past values");for(let s=1;s<r.length;++s)if(r[s-1]>r[s])throw new Error("Ragged splits must be sorted in ascending order")}}function kV(o,e,t,r){let n=[],s=0,a=e.length-1+t.length,i=new Array(a).fill(null).map(()=>[0]);IV(t,r);let p=1;for(let l=0;l<e.length-1;++l){p*=e[l];let u=e[l+1];for(let c=1;c<p+1;++c)i[l].push(c*u)}for(let l=0;l<o.length;++l){let u=o[l],c=o[l]+1;for(let m=0;m<t.length;++m){let d=t[m],f=m+e.length-1;if(f>=0){let g=i[f],h=g[g.length-1]-d[u];for(let x=u;x<c;++x)i[f].push(d[x+1]+h)}u=d[u],c=d[c]}c!==u&&(n.push([u,c]),s+=c-u)}return{outSplits:i,valueSlices:n,numValues:s}}function EV(o){let e=[];for(let t=0;t<o.length;++t){let r=o[t].length,n=y.getArrayFromDType("int32",r);e.push(n),o[t].forEach((s,a)=>n[a]=s)}return e}function YT(o,e){let t=o.slice(0,e);for(;t.length<e;)t.push(1);for(let r=e;r<o.length;r++)t[e-1]*=o[r];return t}function $V(o,e,t,r,n,s){let a=YT(e,2)[1],i=YT(s,2)[1],p=0;for(let l of t)for(let u=l[0];u<l[1];++u){for(let c=0;c<r;++c)n[p*i+c]=o[u*a+c];++p}}function AV(o,e,t,r,n){let s=e.slice();s[0]=n;let a=y.getArrayFromDType(t,y.sizeFromShape(s)),i=o.length,p=i===0?0:i/e[0];return $V(o,e,r,p,a,s),[a,s]}function xc(o,e,t,r,n,s,a,i){if(o.length===0)throw new Error("paramsNestedSplits must be non empty");if(e[0].length===0)throw new Error("Split tensors must not be scalars");let p=e[0][0]-1;if(SV(s,a,p),r.length===0)throw new Error("params.rank must be nonzero");let l=r[0],{outSplits:u,valueSlices:c,numValues:m}=kV(s,a,o,l),d=EV(u),f=AV(t,r,n,c,m);return[d,f[0],f[1]]}var ZT=2147483647;function yc(o,e,t,r,n,s,a){if(e.length>1)throw new Error("starts must be a scalar or vector");if(n.length>1)throw new Error("limits must be a scalar or vector");if(a.length>1)throw new Error("deltas must be a scalar or vector");let i=e.length===0,p=n.length===0,l=a.length===0,u=[];i||u.push(e[0]),p||u.push(n[0]),l||u.push(a[0]);for(let h=1;h<u.length;++h)if(u[h]!==u[h-1])throw new Error("starts, limits, and deltas must have the same shape");let c=u.length===0?1:u[0],m=y.getArrayFromDType("int32",c+1);m[0]=0;for(let h=0;h<c;++h){let x=i?o[0]:o[h],b=p?r[0]:r[h],w=l?s[0]:s[h];if(w===0)throw new Error("Requires delta != 0");let v;if(w>0&&b<x||w<0&&b>x)v=0;else if(v=Math.ceil(Math.abs((b-x)/w)),v>ZT)throw new Error(`Requires ((limit - start) / delta) <= ${ZT}`);m[h+1]=m[h]+v}let d=m[c],f=y.getArrayFromDType(t,d),g=0;for(let h=0;h<c;++h){let x=m[h+1]-m[h],b=i?o[0]:o[h],w=l?s[0]:s[h];for(let v=0;v<x;++v)f[g++]=b,b+=w}return[m,f]}var fo=N.RowPartitionType,Sh=class o{constructor(e,t,r,n,s,a,i,p,l,u){this.shape=e,this.shapeShape=t,this.values=r,this.valuesShape=n,this.valuesDType=s,this.defaultValue=a,this.defaultValueShape=i,this.rowPartitionValues=p,this.rowPartitionValuesShapes=l,this.rowPartitionTypes=N.getRowPartitionTypesHelper(u),this.raggedRank=N.getRaggedRank(this.rowPartitionTypes)}getRowPartitionTypeByDimension(e){return this.rowPartitionTypes[0]===fo.FIRST_DIM_SIZE?this.rowPartitionTypes[e+1]:this.rowPartitionTypes[e]}getRowPartitionTensor(e){return this.rowPartitionTypes[0]===fo.FIRST_DIM_SIZE?this.rowPartitionValues[e+1]:this.rowPartitionValues[e]}getMaxWidth(e){let t=this.getRowPartitionTensor(e-1);switch(this.getRowPartitionTypeByDimension(e-1)){case fo.VALUE_ROWIDS:return o.getMaxWidthValueRowID(t);case fo.ROW_SPLITS:return o.getMaxWidthRowSplit(t);default:throw new Error(`Cannot handle partition type ${fo[this.getRowPartitionTypeByDimension(e-1)]}`)}}static getMaxWidthRowSplit(e){let t=e.length;if(t===0||t===1)return 0;let r=0;for(let n=0;n<t-1;++n){let s=e[n+1]-e[n];s>r&&(r=s)}return r}static getMaxWidthValueRowID(e){let t=e.length;if(t===0)return 0;let r=0,n=e[0],s=0;for(let a=1;a<t;++a){let i=e[a];i!==n&&(n=i,s=Math.max(a-r,s),r=a)}return Math.max(t-r,s)}tensorShapeFromTensor(e,t,r=!0){if(t.length===0){if(e[0]===-1)return[];throw new Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return ev(e,r)}calculateOutputSize(e){let t=this.valuesShape,r=this.defaultValueShape;N.validateDefaultValueShape(r,t);let n=this.tensorShapeFromTensor(this.shape,this.shapeShape),a=N.combineRaggedTensorToTensorShapes(this.raggedRank,n,t);a[0]<0&&(a[0]=e);for(let i=1;i<=this.raggedRank;++i)a[i]<0&&(a[i]=this.getMaxWidth(i));return a}calculateFirstParentOutputIndex(e,t,r){let n=Math.min(e,r),s=[],a=0;for(let i=0;i<n;++i,a+=t)s.push(a);for(let i=n;i<e;++i)s.push(-1);return y.assert(s.length===e,()=>"Final length of result must be equal to firstDimension."),s}calculateOutputIndexRowSplit(e,t,r,n){let s=e.length,a=[];for(let i=0;i<s-1;++i){let p=e[i+1]-e[i],l=Math.min(n,p),u=t[i];u===-1&&(l=0);for(let c=0;c<l;++c)a.push(u),u+=r;for(let c=0;c<p-l;++c)a.push(-1)}if(s>0&&a.length!==e[s-1])throw new Error("Invalid row split size.");return a}calculateOutputIndexValueRowID(e,t,r,n){let s=e.length,a=[];if(s===0)return[];let i=0,p=e[0];if(p>=t.length)throw new Error(`Got currentValueRowId=${p}, which is not less than ${t.length}`);let l=t[p];a.push(l);for(let u=1;u<s;++u){let c=e[u];if(c===p)l>=0&&(++i,i<n?l+=r:l=-1);else{if(i=0,p=c,c>=t.length)throw new Error(`Got nextValueRowId=${c} which is not less than ${t.length}`);l=t[c]}a.push(l)}if(a.length!==e.length)throw new Error("Invalid row ids.");return a}calculateOutputIndex(e,t,r,n){let s=this.getRowPartitionTensor(e),a=this.getRowPartitionTypeByDimension(e);switch(a){case fo.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(s,t,r,n);case fo.ROW_SPLITS:if(s.length-1>t.length)throw new Error(`Row partition size is greater than output size: ${s.length-1} > ${t.length}`);return this.calculateOutputIndexRowSplit(s,t,r,n);default:throw new Error(`Unsupported partition type: ${fo[a]}`)}}getFirstDimensionSize(){let e=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw new Error("No row_partition_types given.");let t=this.rowPartitionTypes[0];switch(t){case fo.FIRST_DIM_SIZE:return e[0];case fo.VALUE_ROWIDS:throw new Error("Cannot handle VALUE_ROWIDS in first dimension.");case fo.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw new Error(`Cannot handle type ${fo[t]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw new Error("Invalid first partition input. Tensor requires at least one element.");let t=this.getFirstDimensionSize(),r=this.calculateOutputSize(t),n=new Array(this.raggedRank+1);n[n.length-1]=1;for(let p=n.length-2;p>=0;--p)n[p]=n[p+1]*r[p+1];let s=ev(r,!1),a=y.getArrayFromDType(this.valuesDType,y.sizeFromShape(s));if(n[0]*r[0]>0){let p=this.calculateFirstParentOutputIndex(t,n[0],r[0]);for(let l=1;l<=this.raggedRank;++l)p=this.calculateOutputIndex(l-1,p,n[l],r[l]);this.setOutput(this.raggedRank,p,a,s)}return[s,a]}setOutput(e,t,r,n){if(r.length===0)return;let s=this.values,a=r,i=n.slice();i=i.slice(e+1);let p=y.sizeFromShape(i),l=t.length,u=this.defaultValue;if(u.length!==p&&u.length!==1){let f=this.defaultValueShape;fe(()=>{let g=O(u,f);u=Ir(g,i).dataSync()})}let c=0,m=0,d=0;for(let f=0;f<=l;++f){let g=f<l?t[f]:-1;if(g===d){++d;continue}if(m<d){let h=s.subarray(c*p),x=a.subarray(m*p),b=(d-m)*p;JT(x,h,b)}if(f>=l){let h=r.length;g=Math.floor(h/p)}if(g>d)if(this.defaultValue.length===1)a.subarray(d*p,g*p).fill(this.defaultValue[0]),d=g;else for(;g>d;){let h=a.slice(d*p);JT(h,u,p),++d}g<0?(c=f+1,m=d):(c=f,m=d,d=m+1)}}};function JT(o,e,t){for(let r=0;r<t;r++)o[r]=e[r]}function ev(o,e){let t=[];for(let r of o){if(r<0){if(!e)throw new Error(`Dimension ${r} must be >= 0`);if(r<-1)throw new Error(`Dimension ${r} must be >= -1`);r=-1}t.push(r)}return t}function bc(o,e,t,r,n,s,a,i,p,l){return new Sh(o,e,t,r,n,s,a,i,p,l).compute()}function _c(o,e,t,r){let n=o===e,s=o<e&&t<0,a=e<o&&t>1;if(n||s||a)return y.makeZerosTypedArray(0,r);let i=Math.abs(Math.ceil((e-o)/t)),p=y.makeZerosTypedArray(i,r);e<o&&t===1&&(t=-1),p[0]=o;for(let l=1;l<p.length;l++)p[l]=p[l-1]+t;return p}var Ih=pt(o=>1/Math.sqrt(o)),FV=Pt(Vn,Ih),tv={kernelName:Vn,backendName:"cpu",kernelFunc:FV};function wo(o,e,t,r,n,s,a,i,p,l){let u=[r/n,n],c=o.values,m=e.values;if(r===0)return oe(t,e.dtype);let d=p instanceof Se?p:oe(u,e.dtype);typeof p=="string"||typeof p=="number"?d.values.fill(p):typeof p=="boolean"&&d.values.fill(+p);for(let f=0;f<s;f++){let g=[],h=0;for(let x=0;x<a;x++){let b=c[f*a+x];g.push(b),h+=b*i[x]}if(h<0||h>=r/n)throw new Error(`Invalid indices: ${g} does not index into ${t}`);for(let x=0;x<n;x++)l?d.values[h*n+x]+=m[f*n+x]:d.values[h*n+x]=e.rank===0?m[0]:m[f*n+x]}return d}var ov=pt(o=>1/(1+Math.exp(-o))),kh=ie(Un,o=>1/(1+Math.exp(-o))),rv={kernelName:Un,backendName:"cpu",kernelFunc:kh};function Eh(o,e,t,r,n){let s=it.isSliceContinous(r,e,t),a=y.sizeFromShape(t),i=y.computeStrides(r);if(s){let c=it.computeFlatOffset(e,i);return n==="string"?o.slice(c,c+a):o.subarray(c,c+a)}let p=n==="string"?N.fromUint8ToStringArray(o):o,l=oe(r,n,p),u=oe(t,n);for(let c=0;c<u.size;++c){let m=u.indexToLoc(c),d=m.map((f,g)=>f+e[g]);u.set(l.get(...d),...m)}return n==="string"?N.fromStringArrayToUint8(u.values):u.values}function ho(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{begin:s,size:a}=r;U(n,"slice");let[i,p]=it.parseSliceParams(n,s,a);it.assertParamsValid(n,i,p);let l=t.data.get(n.dataId).values,u=Eh(l,i,p,n.shape,n.dtype);return t.makeTensorInfo(p,n.dtype,u)}var nv={kernelName:li,backendName:"cpu",kernelFunc:ho};function Tc(o,e,t,r,n,s,a){let i=e[0],p=s[0],l=new Array(p),u=new Array(i),c=e[1];if(p===0){if(i!==0)throw new Error(N.getSparseFillEmptyRowsIndicesDenseShapeMismatch(i));let h=y.getArrayFromDType(t,0),x=y.getArrayFromDType(n,0);return[h,[0,c],x,l,u]}let m=!0,d=0,f=new Array(p).fill(0);for(let h=0;h<i;++h){let x=o[h*c];if(x<0)throw new Error(N.getSparseFillEmptyRowsNegativeIndexErrorMessage(h,x));if(x>=p)throw new Error(N.getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(h,x,p));++f[x],m=m&&x>=d,d=x}let g=!0;for(let h=0;h<p;++h){let x=f[h]===0;l[h]=x,g=g&&!x,f[h]=Math.max(f[h],1),h>0&&(f[h]+=f[h-1])}if(g&&m){let h=o,x=r;for(let b=0;b<i;++b)u[b]=b;return[h,[i,c],x,l,u]}else{let h=f[p-1],x=y.getArrayFromDType(t,h*c),b=y.getArrayFromDType(n,h),w=new Array(p).fill(0);for(let v=0;v<i;++v){let k=o[v*c],E=w[k],$=(k===0?0:f[k-1])+E;w[k]++;for(let A=0;A<c;++A)x[$*c+A]=o[v*c+A];b[$]=r[v],u[v]=$}for(let v=0;v<p;++v)if(w[v]===0){let E=v===0?0:f[v-1];x[E*c+0]=v;for(let $=1;$<c;++$)x[E*c+$]=0;b[E]=a}return[x,[h,c],b,l,u]}}function vc(o,e,t,r,n){let s=y.sizeFromShape(r),a=e[0],i=n.length,p=[],l=1,u=-1;for(let h=0;h<i;++h){let x=n[h];if(x===-1){if(u!==-1)throw new Error(N.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(u,h));u=h,p.push(1)}else{if(x<0)throw new Error(N.getSparseReshapeNegativeOutputDimErrorMessage(h,x));l*=x,p.push(x)}}if(u!==-1){if(l<=0)throw new Error(N.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage());let h=Math.trunc(s/l);if(l*h!==s)throw new Error(N.getSparseReshapeInputOutputMultipleErrorMessage(r,p));p[u]=h}if(y.sizeFromShape(p)!==s)throw new Error(N.getSparseReshapeInputOutputMismatchErrorMessage(r,p));let m=r.length,d=[];if(m>0){d[m-1]=1;for(let h=m-2;h>=0;--h)d[h]=d[h+1]*r[h+1]}let f=[];if(i>0){f[i-1]=1;for(let h=i-2;h>=0;--h)f[h]=f[h+1]*p[h+1]}let g=y.getArrayFromDType(t,a*i);for(let h=0;h<a;++h){let x=0;for(let b=0;b<m;++b)x+=o[h*m+b]*d[b];for(let b=0;b<i;++b)g[h*i+b]=Math.trunc(x/f[b]),x%=f[b]}return[g,[a,i],p]}function ip(o,e,t,r,n,s=!1,a=0){let i=r.length,p=[e[0],o.length/e[0]],l=p[1],c=i>0?n[i-1]+1:0;if(c<0)throw new Error(N.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let m=e.slice();m[0]=c;let d=m.reduce((w,v)=>w*v,1),f=y.getArrayFromDType(t,d);if(i===0)return c>0&&f.fill(a),[f,m];if(c<=0)throw new Error(N.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let g=0,h=1,x=0,b=n[g];for(;;){let w=0;if(h<i){if(w=n[h],b===w){++h;continue}if(b>=w)throw new Error(N.getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage())}if(b<0||b>=c)throw new Error(N.getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(b,c));b>x&&f.fill(a,x*l,b*l);for(let v=g;v<h;++v){let k=r[v];if(k<0||k>=p[0])throw new Error(N.getSparseSegmentReductionIndicesOutOfRangeErrorMessage(v,r[v],p[0]));for(let E=0;E<l;E++)f[b*l+E]+=o[k*l+E]}if(s)for(let v=0;v<l;v++)f[b*l+v]/=h-g;if(g=h,++h,x=b+1,b=w,h>i)break}return x<c&&f.fill(a,x*l,c*l),[f,m]}var sv=pt(o=>Math.sqrt(o)),DV=ie(Gn,o=>Math.sqrt(o)),av={kernelName:Gn,backendName:"cpu",kernelFunc:DV};var $h=xe((o,e)=>{let t=o-e;return t*t}),RV=Ce(Hn,$h),iv={kernelName:Hn,backendName:"cpu",kernelFunc:RV};var Ah=pt((o,e)=>{let{pattern:t,replaceGlobal:r,rewrite:n}=e;return o.replace(new RegExp(t,r?"g":""),n)}),OV=Pt(qn,Ah),pv={kernelName:qn,backendName:"cpu",kernelFunc:OV};function wc(o,e,t,r){let n=oe(o,e.dtype);for(let s=0;s<n.size;s++){let a=n.indexToLoc(s),i=new Array(a.length);for(let p=0;p<i.length;p++)i[p]=a[p]*t[p]+r[p];n.set(e.get(...i),...a)}return n}var Fh=class{constructor(e,t,r,n,s,a){this.separator=y.encodeString(e),this.nGramWidths=t,this.leftPad=y.encodeString(r),this.rightPad=y.encodeString(n),this.padWidth=s,this.preserveShort=a}getPadWidth(e){return Math.min(this.padWidth<0?e-1:this.padWidth,e-1)}getNumNGrams(e,t){let r=this.getPadWidth(t);return Math.max(0,e+2*r-t+1)}createNGrams(e,t,r,n,s,a){for(let i=0;i<s;++i){let p=this.getPadWidth(a),l=Math.max(0,p-i),u=Math.max(0,p-(s-(i+1))),c=a-(l+u),m=t+(l>0?0:i-p),d=0;d+=l*this.leftPad.length;for(let b=0;b<c;++b)d+=e[m+b].length;d+=u*this.rightPad.length;let f=l+u+c-1;d+=f*this.separator.length,r[n+i]=new Uint8Array(d);let g=r[n+i],h=0,x=b=>b.forEach(w=>g[h++]=w);for(let b=0;b<l;++b)x(this.leftPad),x(this.separator);for(let b=0;b<c-1;++b)x(e[m+b]),x(this.separator);if(c>0){x(e[m+c-1]);for(let b=0;b<u;++b)x(this.separator),x(this.rightPad)}else{for(let b=0;b<u-1;++b)x(this.rightPad),x(this.separator);x(this.rightPad)}}}compute(e,t){let r=e.length,n=t.length;if(n>0){let p=t[0];if(p!==0)throw new Error(`First split value must be 0, got ${p}`);for(let l=1;l<n;++l){let u=t[l]>=p;if(u=u&&t[l]<=r,!u)throw new Error(`Invalid split value ${t[l]}, must be in [${p}, ${r}]`);p=t[l]}if(p!==r)throw new Error(`Last split value must be data size. Expected ${r}, got ${p}`)}let s=n-1,a=y.getArrayFromDType("int32",n);if(r===0||n===0){let p=new Array(r);for(let l=0;l<=s;++l)a[l]=0;return[p,a]}a[0]=0;for(let p=1;p<=s;++p){let l=t[p]-t[p-1],u=0;this.nGramWidths.forEach(c=>{u+=this.getNumNGrams(l,c)}),this.preserveShort&&l>0&&u===0&&(u=1),a[p]=a[p-1]+u}let i=new Array(a[s]);for(let p=0;p<s;++p){let l=t[p],u=a[p];if(this.nGramWidths.forEach(c=>{let m=t[p+1]-t[p],d=this.getNumNGrams(m,c);this.createNGrams(e,l,i,u,d,c),u+=d}),this.preserveShort&&u===a[p]){let c=t[p+1]-t[p];if(c===0)continue;let m=c+2*this.padWidth;this.createNGrams(e,l,i,u,1,m)}}return[i,a]}};function Cc(o,e,t,r,n,s,a,i){return new Fh(t,r,n,s,a,i).compute(o,e)}function PV(o,e,t,r){if(!o.length)return;if(e.length===0){for(let s=0;s<o.length;++s)r.push(o.subarray(s,s+1));return}if(e.length===1){let s=e[0],a=o.indexOf(s);for(;a!==-1;){let i=o.subarray(0,a);(!t||i.length!==0)&&r.push(i),o=o.subarray(a+1),a=o.indexOf(s)}(!t||o.length!==0)&&r.push(o);return}let n=0;for(let s=0;s<o.length+1;s++)if(s===o.length||e.indexOf(o[s])!==-1){let a=o.subarray(n,s);(!t||a.length!==0)&&r.push(a),n=s+1}}function Nc(o,e,t){let r=o.length,n=[],s=0,a=0,i=new Array(r);for(let m=0;m<r;++m){let d=n.length;PV(o[m],e,t,n);let f=n.length-d;i[m]=f,s+=f,a=Math.max(a,f)}let p=y.getArrayFromDType("int32",s*2),l=new Array(s),u=[r,a],c=0;for(let m=0;m<r;++m)for(let d=0;d<i[m];++d)p[c*2]=m,p[c*2+1]=d,l[c]=n[c],++c;return[p,l,u]}function Sc(o,e){let t=y.getArrayFromDType("int32",o.length);for(let r=0;r<o.length;++r)t[r]=y.fingerPrint64(o[r]).modulo(e).getLowBitsUnsigned();return t}var Dh=xe((o,e)=>o-e),VV=np((o,e,t,r)=>({real:o-t,imag:e-r})),Jp=Ce(Kn,Dh,VV),lv={kernelName:Kn,backendName:"cpu",kernelFunc:Jp};function Ic(o,e){let t=new Array(o.rank);for(let n=0;n<t.length;n++)t[n]=o.shape[n]*e[n];let r=oe(t,o.dtype);for(let n=0;n<r.values.length;++n){let s=r.indexToLoc(n),a=new Array(o.rank);for(let p=0;p<a.length;p++)a[p]=s[p]%o.shape[p];let i=o.locToIndex(a);r.values[n]=o.values[i]}return r}var el=(o,e)=>{let t=e.value-o.value;return t===0?o.index-e.index:t};function uv(o,e,t=0,r=o.length-1){for(;r>t;){if(r-t>600){let i=r-t+1,p=e-t+1,l=Math.log(i),u=.5*Math.exp(2*l/3),c=.5*Math.sqrt(l*u*(i-u)/i)*Math.sign(p-i/2),m=Math.max(t,Math.floor(e-p*u/i+c)),d=Math.min(r,Math.floor(e+(i-p)*u/i+c));uv(o,e,m,d)}let n=o[e],s=t,a=r;for(y.swap(o,t,e),el(o[r],n)>0&&y.swap(o,t,r);s<a;){for(y.swap(o,s,a),s++,a--;el(o[s],n)<0;)s=s+1;for(;el(o[a],n)>0;)a=a-1}el(o[t],n)===0?y.swap(o,t,a):(a=a+1,y.swap(o,a,r)),a<=e&&(t=a+1),e<=a&&(r=a-1)}}function kc(o,e,t,r,n){let s=e[e.length-1],[a,i]=[o.length/s,s],p=y.getTypedArrayFromDType(t,a*r),l=y.getTypedArrayFromDType("int32",a*r);for(let c=0;c<a;c++){let m=c*i,d=o.subarray(m,m+i),f=new Array(d.length);d.forEach((b,w)=>f[w]={value:b,index:w}),r<f.length&&(uv(f,r),f=f.slice(0,r)),n&&f.sort(el);let g=c*r,h=p.subarray(g,g+r),x=l.subarray(g,g+r);for(let b=0;b<r;b++)h[b]=f[b].value,x[b]=f[b].index}let u=e.slice();return u[u.length-1]=r,[oe(u,t,p),oe(u,"int32",l)]}function Ec(o,e,t,r){let n=y.parseAxisParam(e,t)[0],s=[1,t[0],1];for(let f=0;f<n;f++)s[0]*=t[f];s[1]=t[n];for(let f=n+1;f<t.length;f++)s[2]*=t[f];let a=new Map,i=new Int32Array(t[n]),p=new Se(s,r,o),l=[],u=s[0]===1&&s[2]===1;for(let f=0;f<t[n];f++){let g;if(u)g=o[f].toString();else{let x=[];for(let b=0;b<s[0];b++)for(let w=0;w<s[2];w++)x.push(p.get(b,f,w));g=x.join(",")}let h=a.get(g);if(h!=null)i[f]=h;else{let x=a.size;a.set(g,x),i[f]=x,l.push(f)}}let c=s.slice();c[1]=a.size;let m=new Se(c,r);l.forEach((f,g)=>{for(let h=0;h<s[0];h++)for(let x=0;x<s[2];x++)m.set(p.get(h,f,x),h,g,x)});let d=t.slice();return d[n]=c[1],{outputValues:m.values,outputShape:d,indices:i}}var{addImpl:cv,bincountImpl:$c,bincountReduceImpl:mv,bitwiseAndImpl:dv,castImpl:fv,ceilImpl:hv,concatImpl:gv,equalImpl:xv,expImpl:yv,expm1Impl:bv,floorImpl:_v,gatherNdImpl:Tv,gatherV2Impl:vv,greaterImpl:wv,greaterEqualImpl:Cv,lessImpl:Nv,lessEqualImpl:Sv,linSpaceImpl:Iv,logImpl:kv,maxImpl:Ev,maximumImpl:$v,minimumImpl:Av,multiplyImpl:Fv,negImpl:Dv,notEqualImpl:Rv,prodImpl:Ov,raggedGatherImpl:Pv,raggedRangeImpl:Vv,raggedTensorToTensorImpl:Lv,rangeImpl:Mv,rsqrtImpl:Bv,scatterImpl:zv,sigmoidImpl:Uv,simpleAbsImpl:Ac,sliceImpl:Wv,sparseFillEmptyRowsImpl:Gv,sparseReshapeImpl:Hv,sparseSegmentReductionImpl:Fc,sqrtImpl:qv,staticRegexReplaceImpl:Kv,stridedSliceImpl:jv,stringNGramsImpl:Xv,stringSplitImpl:Qv,stringToHashBucketFastImpl:Yv,subImpl:Zv,tileImpl:Jv,topKImpl:e0,transposeImpl:$s,uniqueImpl:t0}=Rh;function Oh(o,e){return["x","y","z","w","u","v"].slice(0,e).map(t=>`${o}.${t}`)}function je(o,e){return e===1?[o]:Oh(o,e)}function o0(o,e){if(o===1)return"rc";let t="";for(let r=0;r<o;r++)t+=e[r],r<o-1&&(t+=",");return t}var Dc=class{constructor(e){if(this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.enableShapeUniforms=Ae(this.outputShape.length),this.rank===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{let t=je("rc",this.rank),r=me(this.rank),n=this.getOutOfBoundsCondition(t),s=this.getSetup(t),a=this.getOutput(t);this.userCode=`
        void main() {
          ${r} rc = getOutputCoords();

          if(${n}) {
            setOutput(vec4(0));
          } else {
            ${s}

            setOutput(vec4(${a}));
          }
        }
      `}}getSourceCoordsArr(e){let t=[];for(let r=0;r<=1;r++)for(let n=0;n<=1;n++){let s=`${r===0?"r":"rp1"}, ${n===0?"c":"cp1"}`;for(let a=2;a<this.rank;a++)s=`${e[e.length-1-a]},`+s;t.push(s)}return t}getOutOfBoundsCondition(e){if(this.rank===1)return`rc > ${this.enableShapeUniforms?"outShape":this.outputShape[0]}`;let t="";for(let r=this.rank-2;r<this.rank;r++)t+=`${e[r]} >= ${this.enableShapeUniforms?`outShape[${r}]`:this.outputShape[r]}`,r<this.rank-1&&(t+="||");return t}getSetup(e){if(this.rank===1)return"";let t=e.slice(-2),r=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],n=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${t[0]};
      int c = ${t[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${r};
      bool rEdge = rp1 >= ${n};
    `}getOutput(e){let t=this.getSourceCoordsArr(e);return this.rank===1?`getA(rc), (rc + 1 >= ${this.enableShapeUniforms?"outShape":this.outputShape[0]} ? 0. : getA(rc + 1)), 0, 0`:`getA(${t[0]}),
            cEdge ? 0. : getA(${t[1]}),
            rEdge ? 0. : getA(${t[2]}),
            rEdge || cEdge ? 0. : getA(${t[3]})`}};var pp=class{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec3"}],this.outputShape=e,this.enableShapeUniforms=Ae(this.outputShape.length);let r="";for(let n=0;n<4;n++){let s="thisRC = rc;";n%2===1&&(s+="thisRC.z += 1;"),n>1&&(s+="thisRC.y += 1;"),r+=`
        ${s}
        ${n>0?"if(thisRC.y < rows && thisRC.z < cols){":""}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${n}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${n>0?"}":""}
      `}this.userCode=`
      ${LV(t,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?Qi():Xi(e)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?"outShape[1]":e[1]};
        int cols = ${this.enableShapeUniforms?"outShape[2]":e[2]};

        ${r}

        setOutput(result);
      }
    `}};function LV(o,e){return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e?tT(["r","c","d"],"inputShape"):vo(["r","c","d"],o)}
      return ivec3(r, c, d);
    }
  `}var Rc=class{constructor(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(e,t,r){let n=n0(t,r),s=s0(e,n,r);s in this.freeTextures||(this.freeTextures[s]=[]),s in this.usedTextures||(this.usedTextures[s]=[]);let a=r0(e,n,this.gpgpu.gl,this.gpgpu.textureConfig,r);if(this.freeTextures[s].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=a,this.log();let p=this.freeTextures[s].pop();return this.usedTextures[s].push(p),p}let i;return n===dt.PACKED_2X2_FLOAT32?i=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):n===dt.PACKED_2X2_FLOAT16?i=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):n===dt.UNPACKED_FLOAT32?i=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):n===dt.UNPACKED_FLOAT16?i=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):n===dt.PACKED_4X1_UNSIGNED_BYTE&&(i=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[s].push(i),this.numUsedTextures++,this._numBytesAllocated+=a,this.log(),i}releaseTexture(e,t,r,n){if(this.freeTextures==null)return;let s=n0(r,n),a=s0(t,s,n);a in this.freeTextures||(this.freeTextures[a]=[]);let i=r0(t,s,this.gpgpu.gl,this.gpgpu.textureConfig,n),p=F().getNumber("WEBGL_DELETE_TEXTURE_THRESHOLD");p!==-1&&this._numBytesAllocated>p?(this.gpgpu.deleteMatrixTexture(e.texture),this._numBytesAllocated-=i):(this.freeTextures[a].push(e),this.numFreeTextures++,this._numBytesFree+=i),this.numUsedTextures--;let l=this.usedTextures[a],u=l&&l.indexOf(e);if(u==null||u<0)throw new Error("Cannot release a texture that was never provided by this texture manager");l[u]=l[l.length-1],l.pop(),this.log()}log(){if(!this.logEnabled)return;let e=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${e})`);let t=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*t)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(this.freeTextures!=null){for(let e in this.freeTextures)this.freeTextures[e].forEach(t=>{this.gpgpu.deleteMatrixTexture(t.texture)});for(let e in this.usedTextures)this.usedTextures[e].forEach(t=>{this.gpgpu.deleteMatrixTexture(t.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}};function MV(o,e){let t=o;if(e===t.R32F)return 4;if(e===t.R16F)return 2;if(e===t.RGBA32F)return 16;if(e===o.RGBA)return 16;if(e===t.RGBA16F)return 8;if(e===t.RGBA8)return 4;throw new Error(`Unknown internal format ${e}`)}function r0(o,e,t,r,n){let s=BV(e,r),a;if(n){let[p,l]=zo(o[0],o[1]);a=p*l}else{let[p,l]=Ns(o[0],o[1]);a=p*l}let i=MV(t,s);return a*i}function BV(o,e){switch(o){case dt.PACKED_2X2_FLOAT32:return oh(e);case dt.PACKED_2X2_FLOAT16:return rh(e);case dt.UNPACKED_FLOAT32:return Jf(e);case dt.UNPACKED_FLOAT16:return eh(e);case dt.PACKED_4X1_UNSIGNED_BYTE:return th(e);default:throw new Error(`Unknown physical texture type ${o}`)}}function zV(o){return F().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?o?dt.PACKED_2X2_FLOAT32:dt.UNPACKED_FLOAT32:o?dt.PACKED_2X2_FLOAT16:dt.UNPACKED_FLOAT16}function n0(o,e){if(o===_t.UPLOAD)return dt.PACKED_2X2_FLOAT32;if(o===_t.RENDER||o==null)return zV(e);if(o===_t.DOWNLOAD||o===_t.PIXELS)return dt.PACKED_4X1_UNSIGNED_BYTE;throw new Error(`Unknown logical texture type ${o}`)}function s0(o,e,t){return`${o[0]}_${o[1]}_${e}_${t}`}var ft=class{constructor(e,t){this.variableNames=["A"],this.outputShape=e,this.enableShapeUniforms=Ae(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${t}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}},rt="if (isnan(x)) return x;",a0="return x;",Ph="return abs(x);";var i0="return (x >= 0.0) ? x : (exp(x) - 1.0);",p0=rt+`
  return (x < 0.0) ? 0.0 : x;
`,l0=rt+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,Go="return x;",u0="return 1.0 / (1.0 + exp(-1.0 * x));";var m0="return x;",d0=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,f0=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,h0=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,g0="return 1.0 / (1.0 + exp(-1.0 * x));",Vt=class{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.enableShapeUniforms=Ae(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${t}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}};var Oc=class{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=e,this.enableShapeUniforms=Ae(this.outputShape.length);let t=e.length,r=je("rc",t),n=me(t),s=o0(t,r),a=r.slice(-2),i=t<=1?"rc":`vec2(${a.join(",")})`;this.userCode=`
      void main() {
        ${n} rc = getOutputCoords();
        vec4 packedInput = getA(${s});

        setOutput(getChannel(packedInput, ${i}));
      }
    `}};var WV=bt.whereImpl,GV=1e-7,HV=1e-4,Pc={};function qV(o){return o in Pc||(Pc[o]={}),Pc[o]}var KV=F().getNumber("CPU_HANDOFF_SIZE_THRESHOLD"),jV=600;function XV(){return F().global.screen==null?1024:F().global.screen.height*F().global.screen.width*window.devicePixelRatio*jV/1024/1024}var tl=class o extends jo{nextDataId(){return o.nextDataId++}constructor(e){if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!F().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");let t;if(e!=null){if(e instanceof op)t=e;else{let r=Kt(F().getNumber("WEBGL_VERSION"),e);t=new op(r)}this.binaryCache={},this.gpgpuCreatedLocally=!1}else{let r=Kt(F().getNumber("WEBGL_VERSION"));t=new op(r),this.binaryCache=qV(F().getNumber("WEBGL_VERSION")),this.gpgpuCreatedLocally=!0}this.gpgpu=t,this.canvas=this.gpgpu.gl.canvas,this.textureManager=new Rc(this.gpgpu),this.numMBBeforeWarning=XV(),this.texData=new Gr(this,po())}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}writeTexture(e,t,r,n,s,a){let i=this.makeTensorInfo(t,r),p=this.texData.get(i.dataId);p.isPacked=!1,p.texture={texture:e,texShape:[n,s]},p.texShape=[n,s];let l=Xp(t),u=new Qp(l,!1,a),c=this.runWebGLProgram(u,[i],r,[[n,s]]);return c.shape=t,p.texture=null,this.disposeIntermediateTensorInfo(i),c.dataId}write(e,t,r){if((F().getBool("WEBGL_CHECK_NUMERICAL_PROBLEMS")||F().getBool("DEBUG"))&&this.checkNumericalProblems(e),r==="complex64"&&e!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");let n={id:this.nextDataId()};return this.texData.set(n,{shape:t,dtype:r,values:e,usage:_t.UPLOAD,refCount:1}),n}refCount(e){return this.texData.has(e)?this.texData.get(e).refCount:0}incRef(e){let t=this.texData.get(e);t.refCount++}decRef(e){if(this.texData.has(e)){let t=this.texData.get(e);t.refCount--}}move(e,t,r,n,s){if(F().getBool("DEBUG")&&this.checkNumericalProblems(t),n==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(e,{shape:r,dtype:n,values:t,usage:_t.UPLOAD,refCount:s})}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}readSync(e){let t=this.texData.get(e),{values:r,dtype:n,complexTensorInfos:s,slice:a,shape:i,isPacked:p}=t;if(a!=null){let m;p?m=new Vt(i,Go):m=new ft(i,Go);let d=this.runWebGLProgram(m,[{dataId:e,shape:i,dtype:n}],n),f=this.readSync(d.dataId);return this.disposeIntermediateTensorInfo(d),f}if(r!=null)return this.convertAndCacheOnCPU(e);if(n==="string")return r;let l=this.activeTimers!=null,u;l&&(u=y.now());let c;if(n==="complex64"){let m=this.readSync(s.real.dataId),d=this.readSync(s.imag.dataId);c=N.mergeRealAndImagArrays(m,d)}else c=this.getValuesFromTexture(e);return l&&(this.downloadWaitMs+=y.now()-u),this.convertAndCacheOnCPU(e,c)}async read(e){if(this.pendingRead.has(e)){let f=this.pendingRead.get(e);return new Promise(g=>f.push(g))}let t=this.texData.get(e),{values:r,shape:n,slice:s,dtype:a,complexTensorInfos:i,isPacked:p}=t;if(s!=null){let f;p?f=new Vt(n,Go):f=new ft(n,Go);let g=this.runWebGLProgram(f,[{dataId:e,shape:n,dtype:a}],a),h=this.read(g.dataId);return this.disposeIntermediateTensorInfo(g),h}if(r!=null)return this.convertAndCacheOnCPU(e);if(F().getBool("DEBUG")&&!F().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&F().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");let l=null,u;if(a!=="complex64"&&F().get("WEBGL_BUFFER_SUPPORTED")){u=this.decode(e);let f=this.texData.get(u.dataId);l=this.gpgpu.createBufferFromTexture(f.texture.texture,...Hp(n))}this.pendingRead.set(e,[]),a!=="complex64"&&await this.gpgpu.createAndWaitForFence();let c;if(a==="complex64"){let f=await Promise.all([this.read(i.real.dataId),this.read(i.imag.dataId)]),g=f[0],h=f[1];c=N.mergeRealAndImagArrays(g,h)}else if(l==null)c=this.getValuesFromTexture(e);else{let f=y.sizeFromShape(n);c=this.gpgpu.downloadFloat32MatrixFromBuffer(l,f)}if(u!=null&&this.disposeIntermediateTensorInfo(u),l!=null){let f=this.gpgpu.gl;te(f,()=>f.deleteBuffer(l))}let m=this.convertAndCacheOnCPU(e,c),d=this.pendingRead.get(e);return this.pendingRead.delete(e),d.forEach(f=>f(m)),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e)&&po().removeDataId(e,this),this.pendingDeletes--),m}readToGPU(e,t={}){let r=this.texData.get(e),{values:n,shape:s,slice:a,dtype:i,isPacked:p,texture:l}=r;if(i==="complex64")throw new Error("Does not support reading texture for complex64 dtype.");if(a!=null){let d;p?d=new Vt(s,Go):d=new ft(s,Go);let f=this.runWebGLProgram(d,[{dataId:e,shape:s,dtype:i}],i),g=this.readToGPU(f,t);return this.disposeIntermediateTensorInfo(f),g}if(l==null)throw n!=null?new Error("Data is not on GPU but on CPU."):new Error("There is no data on GPU or CPU.");let u=this.decode(e,t.customTexShape),c=po().makeTensorFromTensorInfo(u),m=this.texData.get(u.dataId);return Object.assign({tensorRef:c},m.texture)}bufferSync(e){let t=this.readSync(e.dataId);if(e.dtype==="string")try{let r=t.map(n=>y.decodeString(n));return oe(e.shape,e.dtype,r)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return oe(e.shape,e.dtype,t)}checkNumericalProblems(e){if(e!=null)for(let t=0;t<e.length;t++){let r=e[t];if(!O1(r))throw F().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error(`The value ${r} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`):Error(`The value ${r} cannot be represented on this device.`)}}getValuesFromTexture(e){let{shape:t,dtype:r,isPacked:n}=this.texData.get(e),s=y.sizeFromShape(t);if(F().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){let m=this.decode(e),d=this.texData.get(m.dataId),f=this.gpgpu.downloadMatrixFromPackedTexture(d.texture.texture,...Hp(t)).subarray(0,s);return this.disposeIntermediateTensorInfo(m),f}let a=F().getBool("WEBGL_PACK")&&n===!0,i=a?Xp(t):t,p=a?new lc(i):new pc(i),l=this.runWebGLProgram(p,[{shape:i,dtype:r,dataId:e}],"float32"),u=this.texData.get(l.dataId),c=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(u.texture.texture,u.texShape[0],u.texShape[1]).subarray(0,s);return this.disposeIntermediateTensorInfo(l),c}timerAvailable(){return F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0}time(e){let t=this.activeTimers,r=[],n=!1;this.programTimersStack==null?(this.programTimersStack=r,n=!0):this.activeTimers.push(r),this.activeTimers=r,e();let s=y.flatten(this.activeTimers.map(p=>p.query)).filter(p=>p!=null),a=y.flatten(this.activeTimers.map(p=>p.name)).filter(p=>p!=null);this.activeTimers=t,n&&(this.programTimersStack=null);let i={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};return(async()=>{if(F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0){let p=await Promise.all(s);i.kernelMs=y.sum(p),i.getExtraProfileInfo=()=>p.map((l,u)=>({name:a[u],ms:l})).map(l=>`${l.name}: ${l.ms}`).join(", ")}else i.kernelMs={error:"WebGL query timers are not supported in this environment."};return this.uploadWaitMs=0,this.downloadWaitMs=0,i})()}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:y.now(),endMs:null}}endTimer(e){return F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),e):(e.endMs=y.now(),e)}async getQueryTime(e){if(F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0)return this.gpgpu.waitForQueryAndGetTime(e);let t=e;return t.endMs-t.startMs}disposeData(e,t=!1){if(this.pendingDisposal.has(e))return!1;if(!this.texData.has(e))return!0;if(t?this.texData.get(e).refCount=0:this.texData.get(e).refCount--,!t&&this.texData.get(e).refCount>0)return!1;if(this.pendingRead.has(e))return this.pendingDisposal.add(e),this.pendingDeletes++,!1;this.releaseGPUData(e);let{complexTensorInfos:r}=this.texData.get(e);return r!=null&&(this.disposeData(r.real.dataId,t),this.disposeData(r.imag.dataId,t)),this.texData.delete(e),!0}releaseGPUData(e){let{texture:t,dtype:r,texShape:n,usage:s,isPacked:a,slice:i}=this.texData.get(e),p=i&&i.origDataId||e,l=this.dataRefCount.get(p);l>1?this.dataRefCount.set(p,l-1):(this.dataRefCount.delete(p),t!=null&&(this.numBytesInGPU-=this.computeBytes(n,r),this.textureManager.releaseTexture(t,n,s,a)));let u=this.texData.get(e);u.texture=null,u.texShape=null,u.isPacked=!1,u.slice=null}getTexture(e){return this.uploadToGPU(e),this.texData.get(e).texture.texture}getDataInfo(e){return this.texData.get(e)}shouldExecuteOnCPU(e,t=KV){return F().getBool("WEBGL_CPU_FORWARD")&&e.every(r=>this.texData.get(r.dataId).texture==null&&y.sizeFromShape(r.shape)<t)}getGPGPUContext(){return this.gpgpu}where(e){N.warn("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");let t=e.dataSync();return WV(e.shape,t)}packedUnaryOp(e,t,r){let n=new Vt(e.shape,t),s=this.compileAndRun(n,[e],r);return po().makeTensorFromTensorInfo(s)}abs(e){if(this.shouldExecuteOnCPU([e])&&e.dtype!=="complex64"){let n=Ac(this.texData.get(e.dataId).values);return this.makeOutput(e.shape,e.dtype,n)}if(F().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Ph,e.dtype);let t=new ft(e.shape,Ph),r=this.compileAndRun(t,[e]);return po().makeTensorFromTensorInfo(r)}makeTensorInfo(e,t,r){let n;if(t==="string"&&r!=null&&r.length>0&&y.isString(r[0])){let s=r.map(a=>y.encodeString(a));n=this.write(s,e,t)}else n=this.write(r,e,t);return this.texData.get(n).usage=null,{dataId:n,shape:e,dtype:t}}makeOutput(e,t,r){return po().makeTensorFromTensorInfo(this.makeTensorInfo(e,t,r),this)}unpackTensor(e){let t=new Oc(e.shape);return this.runWebGLProgram(t,[e],e.dtype)}packTensor(e){let t=new Dc(e.shape);return this.runWebGLProgram(t,[e],e.dtype,null,!0)}packedReshape(e,t){let r=[Pr(e.shape),...Vr(e.shape)],n={dtype:e.dtype,shape:r,dataId:e.dataId},s=[Pr(t),...Vr(t)],a=new pp(s,r),i=!0,p=[r],l=this.runWebGLProgram(a,[n],e.dtype,p,i);return{dataId:l.dataId,shape:t,dtype:l.dtype}}decode(e,t){let r=this.texData.get(e),{isPacked:n,shape:s,dtype:a}=r;if(t!=null){let m=y.sizeFromShape(s),d=t[0]*t[1]*4;y.assert(m<=d,()=>"customTexShape is too small. Row * Column * 4 should be equal or larger than the size of the tensor data.")}let i=Xp(s),p;n?p=new ic(i):p=new ac(i);let l=!0,u=[t??Hp(i)],c=this.runWebGLProgram(p,[{shape:i,dtype:a,dataId:e}],a,u,l,t);return{dtype:a,shape:s,dataId:c.dataId}}runWebGLProgram(e,t,r,n,s=!1,a){let i=this.makeTensorInfo(e.outputShape,r),p=this.texData.get(i.dataId);if(e.packedOutput&&(p.isPacked=!0),e.outPackingScheme===Or.DENSE){let x=a??Hp(e.outputShape);p.texShape=x.map(b=>b*2)}if(e.outTexUsage!=null&&(p.usage=e.outTexUsage),y.sizeFromShape(i.shape)===0)return p.values=y.getTypedArrayFromDType(i.dtype,0),i;let l=[],u=t.map(x=>{if(x.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");let b=this.texData.get(x.dataId);if(b.texture==null){if(!e.packedInputs&&y.sizeFromShape(x.shape)<=F().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:x.shape,texData:null,isUniform:!0,uniformValues:b.values};e.packedInputs&&(b.isPacked=!0,b.shape=x.shape)}if(this.uploadToGPU(x.dataId),!!b.isPacked!=!!e.packedInputs)x=b.isPacked?this.unpackTensor(x):this.packTensor(x),l.push(x),b=this.texData.get(x.dataId);else if(b.isPacked&&!Ss(b.shape,x.shape)){let w=x,v=x.shape;x.shape=b.shape,x=this.packedReshape(x,v),l.push(x),b=this.texData.get(x.dataId),w.shape=v}return{shape:x.shape,texData:b,isUniform:!1}});this.uploadToGPU(i.dataId);let c={shape:i.shape,texData:p,isUniform:!1},m=lT(e,u,c),d=this.getAndSaveBinary(m,()=>iT(this.gpgpu,e,u,c)),f=this.activeTimers!=null,g;f&&(g=this.startTimer()),F().get("ENGINE_COMPILE_ONLY")||pT(this.gpgpu,d,u,c,n),l.forEach(x=>this.disposeIntermediateTensorInfo(x)),f&&(g=this.endTimer(g),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(g)}));let h=F().getNumber("WEBGL_FLUSH_THRESHOLD");if(h>0){let x=y.now();x-this.lastGlFlushTime>h&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=x)}if(!F().getBool("WEBGL_LAZILY_UNPACK")&&p.isPacked&&s===!1){let x=this.unpackTensor(i);return this.disposeIntermediateTensorInfo(i),x}return i}compileAndRun(e,t,r,n,s=!1){return r=r||t[0].dtype,this.runWebGLProgram(e,t,r,n,s)}getAndSaveBinary(e,t){return e in this.binaryCache||(this.binaryCache[e]=t()),this.binaryCache[e]}getTextureManager(){return this.textureManager}dispose(){this.disposed||(F().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach(t=>{this.gpgpu.deleteProgram(this.binaryCache[t].webGLProgram),delete this.binaryCache[t]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<"u"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)}floatPrecision(){return this.floatPrecisionValue==null&&(this.floatPrecisionValue=fe(()=>{if(!F().get("WEBGL_RENDER_FLOAT32_ENABLED")){let e=F().getBool("DEBUG");F().set("DEBUG",!1);let t=this.abs(pe(1e-8)).dataSync()[0];if(F().set("DEBUG",e),t>0)return 32}return 16})),this.floatPrecisionValue}epsilon(){return this.floatPrecision()===32?GV:HV}uploadToGPU(e){let t=this.texData.get(e),{shape:r,dtype:n,values:s,texture:a,usage:i,isPacked:p}=t;if(a!=null)return;let l=this.activeTimers!=null,u;l&&(u=y.now());let c=t.texShape;if(c==null&&(c=j1(r,p),t.texShape=c),s!=null){let m=Xp(r),d,f=c[1],g=c[0],h=s instanceof Uint8Array||s instanceof Uint8ClampedArray;(p||!h)&&([f,g]=zo(c[0],c[1])),p?d=new uc(m,h):d=new Qp(m,h);let x=h?[g,f]:c,b=this.makeTensorInfo(x,n),w=this.texData.get(b.dataId);h?w.usage=_t.PIXELS:w.usage=_t.UPLOAD,w.texShape=x,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(b.dataId),f,g,s);let v=[[g,f]],E=this.runWebGLProgram(d,[b],n,v,!0),$=this.texData.get(E.dataId);t.texShape=$.texShape,t.isPacked=$.isPacked,t.usage=$.usage,F().get("ENGINE_COMPILE_ONLY")?this.disposeData(E.dataId):(t.texture=$.texture,t.values=null,this.texData.delete(E.dataId)),this.disposeIntermediateTensorInfo(b),l&&(this.uploadWaitMs+=y.now()-u)}else{let m=this.acquireTexture(c,i,n,p);t.texture=m}}convertAndCacheOnCPU(e,t){let r=this.texData.get(e),{dtype:n}=r;return t!=null&&(r.values=QV(t,n)),r.values}acquireTexture(e,t,r,n){if(this.numBytesInGPU+=this.computeBytes(e,r),!this.warnedAboutMemory&&this.numBytesInGPU>this.numMBBeforeWarning*1024*1024){let s=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${s} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(e,t,n)}computeBytes(e,t){return e[0]*e[1]*y.bytesPerElement(t)}checkCompileCompletion(){for(let[,e]of Object.entries(this.binaryCache))this.checkCompletion_(e)}async checkCompileCompletionAsync(){let e=[];if(this.gpgpu.parallelCompilationExtension){for(let[,t]of Object.entries(this.binaryCache))e.push(this.checkCompletionAsync_(t));return Promise.all(e)}else{for(let[,t]of Object.entries(this.binaryCache)){let r=new Promise(n=>{try{this.checkCompletion_(t),n(!0)}catch(s){throw s}});e.push(r)}return Promise.all(e)}}async checkCompletionAsync_(e){return this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.parallelCompilationExtension.COMPLETION_STATUS_KHR)?this.checkCompletion_(e):(await Bf(),this.checkCompletionAsync_(e))}checkCompletion_(e){if(this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.gl.LINK_STATUS)===!1)throw console.log(this.gpgpu.gl.getProgramInfoLog(e.webGLProgram)),this.gpgpu.gl.getShaderParameter(e.fragmentShader,this.gpgpu.gl.COMPILE_STATUS)===!1?(jf(e.source,this.gpgpu.gl.getShaderInfoLog(e.fragmentShader)),new Error("Failed to compile fragment shader.")):new Error("Failed to link vertex and fragment shaders.");return!0}getUniformLocations(){for(let e of Object.values(this.binaryCache)){this.gpgpu.buildVao(e.webGLProgram);let{variablesLocations:t,customUniformLocations:r,infLoc:n,nanLoc:s,outShapeLocation:a,outShapeStridesLocation:i,outTexShapeLocation:p}=Zf(this.gpgpu,e.program,e.webGLProgram);e.variablesLocations=t,e.customUniformLocations=r,e.infLoc=n,e.nanLoc=s,e.outShapeLocation=a,e.outShapeStridesLocation=i,e.outTexShapeLocation=p}}createTensorFromGPUData(e,t,r){e.channels=e.channels||"RGBA";let{texture:n,height:s,width:a,channels:i}=e,p=po().backend;if(!p.gpgpu.gl.isTexture(n))throw new Error("The texture is invalid. Also, please make sure the texture and the TFJS WebGL backend are using the same canvas. If you want to use your own custom canvas, you have to create and use the custom TFJS WebGL backend created from the canvas through 'new tf.MathBackendWebGL(customCanvas)'.");let l=p.writeTexture(n,t,r,s,a,i);return po().makeTensorFromDataId(l,t,r,p)}};tl.nextDataId=0;function QV(o,e){if(e==="float32"||e==="complex64")return o;if(e==="int32"||e==="bool"){let t=e==="int32"?new Int32Array(o.length):new Uint8Array(o.length);for(let r=0;r<t.length;++r)t[r]=Math.round(o[r]);return t}else throw new Error(`Unknown dtype ${e}`)}wr.isBrowser()&&Wl("webgl",()=>new tl,2);var lp=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`;var Lt=class{constructor(e,t,r){this.variableNames=["A","B"],this.outputShape=N.assertAndGetBroadcastShape(t,r),this.enableShapeUniforms=Ae(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${e}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}};var Xt=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`;var jt=class{constructor(e,t,r,n=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=N.assertAndGetBroadcastShape(t,r);let s=this.outputShape.length;this.enableShapeUniforms=Ae(s);let a="";if(n)if(s===0||y.sizeFromShape(this.outputShape)===1)a=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(a=`
          ${me(s)} coords = getOutputCoords();
        `,s===1)this.enableShapeUniforms?a+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:a+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{let p=je("coords",s);this.enableShapeUniforms?a+=`
            bool nextRowOutOfBounds =
              (${p[s-2]} + 1) >= outShape[${s} - 2];
            bool nextColOutOfBounds =
              (${p[s-1]} + 1) >= outShape[${s} - 1];
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `:a+=`
            bool nextRowOutOfBounds =
              (${p[s-2]} + 1) >= ${this.outputShape[s-2]};
            bool nextColOutOfBounds =
              (${p[s-1]} + 1) >= ${this.outputShape[s-1]};
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        ${e}
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        ${a}

        setOutput(result);
      }
    `}};function Xe(o){let{inputs:e,backend:t}=o,{x:r}=e;return t.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}var x0={kernelName:yr,backendName:"webgl",kernelFunc:Xe};function Mt(o){let{inputs:e,backend:t}=o,{real:r,imag:n}=e,s=t.makeTensorInfo(r.shape,"complex64"),a=t.texData.get(s.dataId),i=Xe({inputs:{x:r},backend:t}),p=Xe({inputs:{x:n},backend:t});return a.complexTensorInfos={real:i,imag:p},s}var y0={kernelName:ta,backendName:"webgl",kernelFunc:Mt};var Vh="return (a < 0.) ? b * a : a;",Lh=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function YV(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{alpha:s}=r,a=t.makeTensorInfo([],"float32",y.createScalarValue(s,"float32")),i=F().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new jt(Lh,n.shape,a.shape):new Lt(Vh,n.shape,a.shape),p=t.runWebGLProgram(i,[n,a],"float32");return t.disposeIntermediateTensorInfo(a),p}var b0={kernelName:Ea,backendName:"webgl",kernelFunc:YV};var Mh="return (a < 0.) ? b * a : a;",Bh=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function ZV(o){let{inputs:e,backend:t}=o,{x:r,alpha:n}=e,s=F().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new jt(Bh,r.shape,n.shape):new Lt(Mh,r.shape,n.shape);return t.runWebGLProgram(s,[r,n],"float32")}var _0={kernelName:ja,backendName:"webgl",kernelFunc:ZV};var go="if (isnan(x)) return x;";function ne({opSnippet:o,packedOpSnippet:e,cpuKernelImpl:t,dtype:r}){return({inputs:n,backend:s})=>{let{x:a}=n,i=s,p=r||a.dtype;if(i.shouldExecuteOnCPU([a])&&t!=null){let c=i.texData.get(a.dataId),m=t(c.values,p);return i.makeTensorInfo(a.shape,p,m)}let l=F().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&e!=null,u;return l?u=new Vt(a.shape,e):u=new ft(a.shape,o),i.runWebGLProgram(u,[a],p)}}function $e({opSnippet:o,packedOpSnippet:e,checkOutOfBounds:t=!1,supportsComplex:r=!1,cpuKernelImpl:n,dtype:s}){return({inputs:a,backend:i})=>{let{a:p,b:l}=a,u=i;if(r&&p.dtype==="complex64"){let f=u.texData.get(p.dataId),g=u.texData.get(l.dataId),[h,x]=[[f.complexTensorInfos.real,g.complexTensorInfos.real],[f.complexTensorInfos.imag,g.complexTensorInfos.imag]].map(w=>{let[v,k]=w,E={dataId:v.dataId,dtype:v.dtype,shape:p.shape},$={dataId:k.dataId,dtype:k.dtype,shape:l.shape},A=new Lt(o,p.shape,l.shape);return u.runWebGLProgram(A,[E,$],et(v.dtype,k.dtype))}),b=Mt({inputs:{real:h,imag:x},backend:u});return u.disposeIntermediateTensorInfo(h),u.disposeIntermediateTensorInfo(x),b}let c=s||et(p.dtype,l.dtype);if((p.dtype==="string"||l.dtype==="string"||u.shouldExecuteOnCPU([p,l]))&&n!=null){let f=u.texData.get(p.dataId).values,g=u.texData.get(l.dataId).values,h=p.dtype==="string"?N.fromUint8ToStringArray(f):f,x=p.dtype==="string"?N.fromUint8ToStringArray(g):g,[b,w]=n(p.shape,l.shape,h,x,c),v=u.makeTensorInfo(w,c),k=u.texData.get(v.dataId);return k.values=b,v}let m=F().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&e!=null,d;return m?d=new jt(e,p.shape,l.shape,t):d=new Lt(o,p.shape,l.shape),u.runWebGLProgram(d,[p,l],c)}}function ir(o,e=!1){if(o==="linear")return e?m0:a0;if(o==="relu")return e?f0:p0;if(o==="elu")return e?d0:i0;if(o==="relu6")return e?h0:l0;if(o==="prelu")return e?Bh:Mh;if(o==="leakyrelu")return e?Lh:Vh;if(o==="sigmoid")return e?g0:u0;throw new Error(`Activation ${o} has not been implemented for the WebGL backend.`)}var up=class{constructor(e,t,r,n=!1,s=!1,a=!1,i=null,p=!1,l=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.enableShapeUniforms=Ae(this.outputShape.length);let u=n?e[1]:e[2],c=Math.ceil(u/2),m=n?"i * 2, rc.y":"rc.y, i * 2",d=s?"rc.z, i * 2":"i * 2, rc.z",f=n?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],g=s?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],h="",x="";i&&(p?h=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${i}
        }`:l?h=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${i}
        }`:h=`vec4 activation(vec4 x) {
          ${i}
        }`,x="result = activation(result);");let b=a?"result += getBiasAtOutCoords();":"";a&&this.variableNames.push("bias"),p&&this.variableNames.push("preluActivationWeights"),l&&this.variableNames.push("leakyreluAlpha");let w="rc.x",v="rc.x";e[0]<t[0]?w=`imod(rc.x, ${e[0]})`:t[0]<e[0]&&(v=`imod(rc.x, ${t[0]})`),this.userCode=`
      ${h}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${c}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        int batchA = ${w};
        int batchB = ${v};
        for (int i = 0; i < ${c}; i++) {
          vec4 a = getMatrixA(batchA, ${m});
          vec4 b = getMatrixB(batchB, ${d});

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (${f[0]} * ${g[0]});
          result += (${f[1]} * ${g[1]});
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        ${b}

        ${x}

        setOutput(result);
      }
    `}};var zh={REAL:"return areal * breal - aimag * bimag;",IMAG:"return areal * bimag + aimag * breal;"},ol=class{constructor(e,t,r){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=N.assertAndGetBroadcastShape(t,r),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        ${e}
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}};var T0="return a * b;";function rl(o){let{inputs:e,backend:t}=o,{a:r,b:n}=e,s=N.upcastType(r.dtype,n.dtype);if(r.dtype==="complex64"){let i=t.texData.get(r.dataId),p=t.texData.get(n.dataId),l=new ol(zh.REAL,r.shape,n.shape),u=new ol(zh.IMAG,r.shape,n.shape),c=[{dataId:i.complexTensorInfos.real.dataId,dtype:i.complexTensorInfos.real.dtype,shape:r.shape},{dataId:i.complexTensorInfos.imag.dataId,dtype:i.complexTensorInfos.imag.dtype,shape:r.shape},{dataId:p.complexTensorInfos.real.dataId,dtype:p.complexTensorInfos.real.dtype,shape:n.shape},{dataId:p.complexTensorInfos.imag.dataId,dtype:p.complexTensorInfos.imag.dtype,shape:n.shape}],m=t.runWebGLProgram(l,c,"float32"),d=t.runWebGLProgram(u,c,"float32"),f=Mt({inputs:{real:m,imag:d},backend:t});return t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d),f}if(t.shouldExecuteOnCPU([r,n])){let i=t.texData.get(r.dataId),p=t.texData.get(n.dataId),[l,u]=Fv(r.shape,n.shape,i.values,p.values,s),c=t.makeTensorInfo(u,s),m=t.texData.get(c.dataId);return m.values=l,c}let a;return F().getBool("WEBGL_PACK_BINARY_OPERATIONS")?a=new jt(T0,r.shape,n.shape):a=new Lt(T0,r.shape,n.shape),t.runWebGLProgram(a,[r,n],s)}var v0={kernelName:$n,backendName:"webgl",kernelFunc:rl};function w0(o,e,t){let r=[Pr(o.shape),...Vr(o.shape)],n={dtype:o.dtype,shape:r,dataId:o.dataId},s=[Pr(e),...Vr(e)],a=new pp(s,r),i=!0,p=[r],l=t.runWebGLProgram(a,[n],o.dtype,p,i);return{dataId:l.dataId,shape:e,dtype:l.dtype}}function q(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{shape:s}=r,a=t,i=y.sizeFromShape(n.shape),p=y.inferFromImplicitShape(s,i),l=y.sizeFromShape(p);y.assert(i===l,()=>`The new shape (${p}) has ${l} elements and the old shape (${n.shape}) has ${i} elements. The new shape and old shape must have the same number of elements.`);let u=a.texData.get(n.dataId);return u.isPacked&&!Ss(n.shape,p)&&!(u.texture!==null&&Ss(u.shape,p))?w0(n,p,a):(a.incRef(n.dataId),{dataId:n.dataId,shape:p,dtype:n.dtype})}var C0={kernelName:ti,backendName:"webgl",kernelFunc:q};var nl=class{constructor(e,t){this.variableNames=["x"];let{windowSize:r,batchSize:n,inSize:s,outSize:a}=e;this.outputShape=[n,a];let i=Math.floor(r/4)*4,p=r%4,l="sumValue += dot(values, ones);";if(t!=null){let c=1/t;l=`sumValue += dot(values * ${y.isInt(c)?c.toPrecision(2):c}, ones);`}let u="";s%r>0&&(u=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return 0.0;
        }
      `),this.userCode=`
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${u}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        float sumValue = 0.0;

        for (int i = 0; i < ${i}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${l}
        }

        int inIdx = inOffset + ${i};
        if (${p===1}) {
          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);

          ${l}
        } else if (${p===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1), 0.0, 0.0);

          ${l}
        } else if (${p===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2), 0.0);

          ${l}
        }
        setOutput(sumValue);
      }
    `}};var Vc=class{constructor(e,t){this.variableNames=["x"];let{windowSize:r,batchSize:n,inSize:s,outSize:a}=e;this.outputShape=[n,a];let i="0.0",p="";t==="prod"?i="1.0":t==="min"?(i="1.0 / 1e-20",p="min"):t==="max"&&(i="-1.0 / 1e-20",p="max");let l=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t==="sum"?l="sumValue":t==="prod"?l="prodValue":t==="all"?l="allValue":t==="any"&&(l="anyValue");let u=Math.floor(r/4)*4,c=r%4,m=`
      if (${t==="sum"}) {
        sumValue += dot(values, ones);
      } else if (${t==="prod"}) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = ${p}(values, minMaxValue);
        if (${t==="min"} || ${t==="max"}) {
          minMaxValue = ${p}(values, minMaxValue);
          bvec4 isNaN = isnan(values);
          if (isNaN.r || isNaN.g || isNaN.b || isNaN.a) {
            minMaxValue = vec4(NAN);
          }
        }
      }
    `,d="vec4";t==="all"?(i="1.0",m=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,d="bvec4"):t==="any"&&(i="0.0",m=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,d="bvec4");let f="";s%r>0&&(f=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = ${i};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${f}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${r};

        vec4 minMaxValue = vec4(${i});
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < ${u}; i += 4) {
          int inIdx = inOffset + i;
          ${d} values = ${d}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${m}
        }

        int inIdx = inOffset + ${u};
        if (${c===1}) {
          ${d} values = ${d}(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          ${m}
        } else if (${c===2}) {
          ${d} values = ${d}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          ${m}
        } else if (${c===3}) {
          ${d} values = ${d}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          ${m}
        }
        setOutput(${l});
      }
    `}};function eL(o){let e=[];for(;e.length===0||e[e.length-1].outSize!==1;){let t=e.length?e[e.length-1].outSize:o[1],r=N.computeOptimalWindowSize(t);e.push({inSize:t,windowSize:r,outSize:Math.ceil(t/r)})}return e}function Qt(o,e,t,r){let n=eL(o.shape),s=o;for(let a=0;a<n.length;a++){let{inSize:i,windowSize:p,outSize:l}=n[a],u,c;t==="mean"?u=a===0?new nl({windowSize:p,inSize:i,batchSize:o.shape[0],outSize:l},i):new nl({windowSize:p,inSize:i,batchSize:o.shape[0],outSize:l}):u=new Vc({windowSize:p,inSize:i,batchSize:o.shape[0],outSize:l},t),c=s,s=r.runWebGLProgram(u,[s],e),c.dataId!==o.dataId&&r.disposeIntermediateTensorInfo(c)}return s}var Lc=class{constructor(e,t){this.variableNames=["A"];let r=new Array(e.length);for(let a=0;a<r.length;a++)r[a]=e[t[a]];this.outputShape=r,this.rank=r.length;let n=me(this.rank),s=tL(t);this.userCode=`
    void main() {
      ${n} resRC = getOutputCoords();
      setOutput(getA(${s}));
    }
    `}};function tL(o){let e=o.length;if(e>6)throw Error(`Transpose for rank ${e} is not yet supported`);let t=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],r=new Array(e);for(let n=0;n<o.length;n++)r[o[n]]=t[n];return r.join()}var Mc=class{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;let r=new Array(e.length);for(let u=0;u<r.length;u++)r[u]=e[t[u]];if(this.outputShape=r,this.rank=r.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);let n=me(this.rank),s=Oh("rc",this.rank),a=new Array(this.rank);for(let u=0;u<t.length;u++)a[t[u]]=s[u];let i=`vec2(${a.slice(-2).join()})`,p=`++${s[this.rank-1]} < ${r[this.rank-1]}`,l=`getChannel(getA(${a.join()}), ${i})`;this.userCode=`
    void main() {
      ${n} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${l};
      if(${p}) {
        result[1] = ${l};
      }
      --${s[this.rank-1]};
      if(++${s[this.rank-2]} < ${r[this.rank-2]}) {
        result[2] = ${l};
        if(${p}) {
          result[3] = ${l};
        }
      }
      setOutput(result);
    }
    `}};function Lr(o,e,t){let r=F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Mc(o.shape,e):new Lc(o.shape,e);return t.runWebGLProgram(r,[o],o.dtype)}function N0(o,e,t,r){let n=e,s=o.shape.length,a=y.parseAxisParam(n,o.shape),i=a,p=N.getAxesPermutation(i,s),l=p!=null,u=o;l&&(u=Lr(o,p,r),i=N.getInnerMostAxes(i.length,s)),N.assertAxesAreInnerMostDims("sum",i,s);let[c,m]=N.computeOutAndReduceShapes(u.shape,i),d=c;t&&(d=N.expandShapeToKeepDim(c,a));let f=y.sizeFromShape(m),h=y.sizeFromShape(o.shape)/f,x=q({inputs:{x:u},attrs:{shape:[h,f]},backend:r}),b=ss(o.dtype),w=Qt(x,b,"sum",r),v=q({inputs:{x:w},attrs:{shape:d},backend:r});return r.disposeIntermediateTensorInfo(x),r.disposeIntermediateTensorInfo(w),l&&r.disposeIntermediateTensorInfo(u),v}function As(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,keepDims:a}=r;return N0(n,s,a,t)}var S0={kernelName:ui,backendName:"webgl",kernelFunc:As};function Ve(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{perm:s}=r,a=t,i=n.shape.length,p=new Array(i);for(let u=0;u<p.length;u++)p[u]=n.shape[s[u]];let l;if(a.shouldExecuteOnCPU([n])){let c=a.texData.get(n.dataId).values,m=$s(c,n.shape,n.dtype,s,p);l=a.makeTensorInfo(p,n.dtype);let d=a.texData.get(l.dataId);d.values=m}else l=Lr(n,s,a);return l}var I0={kernelName:_r,backendName:"webgl",kernelFunc:Ve};var Uh=1e3;function Fs({a:o,b:e,transposeA:t,transposeB:r,backend:n,bias:s=null,preluActivationWeights:a=null,leakyreluAlpha:i=0,activation:p=null}){let l=o.shape.length,u=e.shape.length,c=t?o.shape[l-2]:o.shape[l-1],m=r?e.shape[u-1]:e.shape[u-2],d=t?o.shape[l-1]:o.shape[l-2],f=r?e.shape[u-2]:e.shape[u-1],g=o.shape.slice(0,-2),h=e.shape.slice(0,-2),x=y.sizeFromShape(g),b=y.sizeFromShape(h),v=Po.assertAndGetBroadcastShape(o.shape.slice(0,-2),e.shape.slice(0,-2)).concat([d,f]);y.assert(c===m,()=>`Error in matMul: inner shapes (${c}) and (${m}) of Tensors with shapes ${o.shape} and ${e.shape} and transposeA=${t} and transposeB=${r} must match.`);let k=t?[x,c,d]:[x,d,c],E=r?[b,f,m]:[b,m,f],$=q({inputs:{x:o},backend:n,attrs:{shape:k}}),A=q({inputs:{x:e},backend:n,attrs:{shape:E}}),D=[$,A],R=Math.max(x,b),P=t?$.shape[1]:$.shape[2],V=s!=null,L=a!=null,B=p==="leakyrelu",M=p!=null?ir(p,!0):null,W=V||L||B||M!=null,G;if((d===1||f===1)&&P>Uh&&W===!1){let H=$,j=A;t&&(H=Ve({inputs:{x:$},backend:n,attrs:{perm:[0,2,1]}}),D.push(H)),r&&(j=Ve({inputs:{x:A},backend:n,attrs:{perm:[0,2,1]}}),D.push(j));let X=f!==1,Z=f===1,Q=H;X&&(Q=q({inputs:{x:H},backend:n,attrs:{shape:[R,P,1]}}),D.push(Q));let ee=f===1?2:1,Y=j;Z&&(Y=q({inputs:{x:j},backend:n,attrs:{shape:[R,1,P]}}),D.push(Y));let re=rl({inputs:{a:Q,b:Y},backend:n});G=As({inputs:{x:re},backend:n,attrs:{axis:ee,keepDims:!0}}),D.push(re)}else{let H=et(o.dtype,e.dtype),j=new up(k,E,[R,d,f],t,r,V,M,L,B),X=[$,A];if(s!=null&&X.push(s),L&&X.push(a),B){let Z=n.makeTensorInfo([],"float32",y.createScalarValue(i,"float32"));X.push(Z),D.push(Z)}G=n.runWebGLProgram(j,X,H)}let z=q({inputs:{x:G},backend:n,attrs:{shape:v}});D.push(G);for(let H of D)n.disposeIntermediateTensorInfo(H);return z}function oL(o){let{inputs:e,backend:t,attrs:r}=o,{a:n,b:s,bias:a,preluActivationWeights:i}=e,{transposeA:p,transposeB:l,activation:u,leakyreluAlpha:c}=r;return Fs({a:n,b:s,transposeA:p,transposeB:l,backend:t,bias:a,preluActivationWeights:i,leakyreluAlpha:c,activation:u})}var k0={kernelName:Yn,backendName:"webgl",kernelFunc:oL};var E0="return abs(x);";function rL(o){let{inputs:e,backend:t}=o,{x:r}=e;if(t.shouldExecuteOnCPU([r])&&r.dtype!=="complex64"){let s=t.texData.get(r.dataId),a=Ac(s.values);return t.makeTensorInfo(r.shape,r.dtype,a)}let n;return F().getBool("WEBGL_PACK_UNARY_OPERATIONS")?n=new Vt(r.shape,E0):n=new ft(r.shape,E0),t.runWebGLProgram(n,[r],r.dtype)}var $0={kernelName:Ws,backendName:"webgl",kernelFunc:rL};var nL=rt+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,sL=ne({opSnippet:nL}),A0={kernelName:jr,backendName:"webgl",kernelFunc:sL};var aL=rt+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`,iL=ne({opSnippet:aL}),F0={kernelName:Xr,backendName:"webgl",kernelFunc:iL};var D0="return a + b;",pL=$e({opSnippet:D0,packedOpSnippet:D0,supportsComplex:!0,cpuKernelImpl:cv}),R0={kernelName:Qo,backendName:"webgl",kernelFunc:pL};var Bc=class{constructor(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map((s,a)=>`T${a}`);let r=[];this.variableNames.forEach(s=>{r.push(`float v${s} = get${s}AtOutCoords();`)});let n=this.variableNames.map(s=>`v${s}`).join(" + ");this.userCode=`
      void main() {
        ${r.join(`
        `)}

        float result = ${n};
        setOutput(result);
      }
    `}};var zc=class{constructor(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map((s,a)=>`T${a}`);let r=[];this.variableNames.forEach(s=>{r.push(`vec4 v${s} = get${s}AtOutCoords();`)});let n=this.variableNames.map(s=>`v${s}`).join(" + ");this.userCode=`
      void main() {
        ${r.join(`
        `)}

        vec4 result = ${n};
        setOutput(result);
      }
    `}};function Uc(o){let{inputs:e,backend:t}=o,r=e;if(r.length===1)return Xe({inputs:{x:r[0]},backend:t});if(r.length>F().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){let p=Math.floor(r.length/2),l=Uc({inputs:r.slice(0,p),backend:t}),u=Uc({inputs:r.slice(p),backend:t});return Uc({inputs:[l,u],backend:t})}let n=r.map(p=>p.dtype).reduce((p,l)=>et(p,l)),s=r.map(p=>p.shape),i=F().getBool("WEBGL_PACK")?new zc(r[0].shape,s):new Bc(r[0].shape,s);return t.runWebGLProgram(i,r,n)}var O0={kernelName:Gs,backendName:"webgl",kernelFunc:Uc};function lL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,keepDims:a}=r,i=n.shape.length,p=y.parseAxisParam(s,n.shape),l=p,u=N.getAxesPermutation(l,i),c=n;u!=null&&(c=Ve({inputs:{x:n},backend:t,attrs:{perm:u}}),l=N.getInnerMostAxes(l.length,i)),N.assertAxesAreInnerMostDims("all",l,i);let[m,d]=N.computeOutAndReduceShapes(c.shape,l),f=y.sizeFromShape(d),g=q({inputs:{x:c},backend:t,attrs:{shape:[-1,f]}}),h=Qt(g,g.dtype,"all",t),x;if(a){let b=N.expandShapeToKeepDim(m,p);x=q({inputs:{x:h},backend:t,attrs:{shape:b}})}else x=q({inputs:{x:h},backend:t,attrs:{shape:m}});return t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(h),u!=null&&t.disposeIntermediateTensorInfo(c),x}var P0={kernelName:Hs,backendName:"webgl",kernelFunc:lL};function uL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,keepDims:a}=r,i=n.shape.length,p=y.parseAxisParam(s,n.shape),l=p,u=N.getAxesPermutation(l,i),c=n;u!=null&&(c=Ve({inputs:{x:n},backend:t,attrs:{perm:u}}),l=N.getInnerMostAxes(l.length,i)),N.assertAxesAreInnerMostDims("any",l,i);let[m,d]=N.computeOutAndReduceShapes(c.shape,l),f=y.sizeFromShape(d),g=q({inputs:{x:c},backend:t,attrs:{shape:[-1,f]}}),h=Qt(g,g.dtype,"any",t),x;if(a){let b=N.expandShapeToKeepDim(m,p);x=q({inputs:{x:h},backend:t,attrs:{shape:b}})}else x=q({inputs:{x:h},backend:t,attrs:{shape:m}});return t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(h),u!=null&&t.disposeIntermediateTensorInfo(c),x}var V0={kernelName:qs,backendName:"webgl",kernelFunc:uL};var Wc=class{constructor(e,t,r){this.variableNames=["A"];let{windowSize:n,batchSize:s,outSize:a}=e;r||this.variableNames.push("bestIndicesA"),this.outputShape=[s,a];let i=t==="max"?">":"<",p=r?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${n};

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < ${n}; i++) {
          int inIdx = ${p};
          float candidate = getA(batch, inIdx);
          if (candidate ${i} bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `}};var Gc=class{constructor(e,t,r,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,y.assert(e.length>2,()=>`Packed arg${r.charAt(0).toUpperCase()+r.slice(1)} supports only inputs with rank above 2.`);let s=e[e.length-1],a=Math.ceil(s/t);this.outputShape=e.slice(0,-1),a>1&&this.outputShape.push(a),n||this.variableNames.push("bestIndicesA");let i=this.outputShape,p=i.length,l=me(p),u=je("coords",p),c,m;if(a===1){m=p+1;let A=me(m);c=`
        ${A} sourceLocR = ${A}(${u.join()}, 0);
        ++${u[p-1]};
        ${A} sourceLocG = ${A}(${u.join()}, 0);
        ++${u[p-2]};
        ${A} sourceLocA = ${A}(${u.join()}, 0);
        --${u[p-1]};
        ${A} sourceLocB = ${A}(${u.join()}, 0);
        --${u[p-2]};`}else m=p,c=`
        ${l} sourceLocR = coords;
        ++${u[p-1]};
        ${l} sourceLocG = coords;
        ++${u[p-2]};
        ${l} sourceLocA = coords;
        --${u[p-1]};
        ${l} sourceLocB = coords;
        --${u[p-2]};`;let d=["x","y","z","w","u","v"].slice(0,m),f="."+d[m-1],g=d.map(A=>"int "+A),h=je("sourceLocR",m-1).concat("inIdx.r"),x=je("sourceLocG",m-1).concat("inIdx.g"),b=je("sourceLocB",m-1).concat("inIdx.b"),w=je("sourceLocA",m-1).concat("inIdx.a"),v=r==="max"?"greaterThan":"lessThan",k=n?"":`
          inIdx = round(vec4(getBestIndicesAChannel(${h.join()}),
                             getBestIndicesAChannel(${x.join()}),
                             getBestIndicesAChannel(${b.join()}),
                             getBestIndicesAChannel(${w.join()})));`,E=`vec4(
            getAChannel(${h.join()}),
            hasNextCol ? getAChannel(${x.join()}) : 0.,
            hasNextRow ? getAChannel(${b.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${w.join()}) : 0.)`,$=n?"":`
      float getBestIndicesAChannel(${g.join()}) {
        return getChannel(getBestIndicesA(${d.join()}),
                                          vec2(${d.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${g.join()}) {
        return getChannel(getA(${d.join()}),
                               vec2(${d.slice(-2).join()}));
      }
      ${$}
      void main() {
        ${l} coords = getOutputCoords();
        bool hasNextCol = ${u[p-1]} < ${i[p-1]-1};
        bool hasNextRow = ${u[p-2]} < ${i[p-2]-1};
        ${c}
        ivec4 srcIdx = ivec4(sourceLocR${f}, sourceLocG${f},
          sourceLocB${f}, sourceLocA${f}) * ${t};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${E};

        for (int i = 0; i < ${t}; i++) {
          inIdx = srcIdx;
          ${k}
          vec4 candidate = ${E};
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(${v}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}};function L0(o,e,t,r=null){let n=e.shape[0],s=e.shape[1];r!=null&&(n=r.shape[0],s=r.shape[1]);let a=N.computeOptimalWindowSize(s),i={windowSize:a,inSize:s,batchSize:n,outSize:Math.ceil(s/a)},p=new Wc(i,t,r==null),l=[e];r!=null&&l.push(r);let u=o.runWebGLProgram(p,l,"int32");if(u.shape[1]===1)return u;let c=L0(o,e,t,u);return o.disposeIntermediateTensorInfo(u),c}function M0(o,e,t,r=null){let n=r!=null?r.shape:e.shape,s=n[n.length-1],a=N.computeOptimalWindowSize(s),i=new Gc(n,a,t,r==null),p=r==null?[e]:[e,r],l=o.runWebGLProgram(i,p,"int32");if(l.shape.length===e.shape.length){let u=M0(o,e,t,l);return o.disposeIntermediateTensorInfo(l),u}return l}function Hc(o,e,t,r){let n=[t];if(N.assertAxesAreInnerMostDims("arg"+r.charAt(0).toUpperCase()+r.slice(1),n,e.shape.length),!F().getBool("WEBGL_PACK_REDUCE")||e.shape.length<=2){let s=[],a=o.texData.get(e.dataId),i=a!==null&&a.isPacked,p=e;i&&(p=o.unpackTensor(e),s.push(p));let[l,u]=N.computeOutAndReduceShapes(p.shape,n),c=y.sizeFromShape(u),m=q({inputs:{x:p},backend:o,attrs:{shape:[-1,c]}});s.push(m);let d=L0(o,m,r);s.push(d);let f=q({inputs:{x:d},backend:o,attrs:{shape:l}});return s.forEach(g=>o.disposeIntermediateTensorInfo(g)),f}return M0(o,e,r)}function cL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s}=r,a=y.parseAxisParam(s,n.shape),i=N.getAxesPermutation(a,n.shape.length),p=n,l=[];i!=null&&(p=Ve({inputs:{x:n},backend:t,attrs:{perm:i}}),l.push(p),a=N.getInnerMostAxes(a.length,p.shape.length)),N.assertAxesAreInnerMostDims("argMax",[a[0]],p.shape.length);let u=Hc(t,p,a[0],"max");return l.forEach(c=>t.disposeIntermediateTensorInfo(c)),u}var B0={kernelName:Ks,backendName:"webgl",kernelFunc:cL};function mL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s}=r,a=y.parseAxisParam(s,n.shape),i=N.getAxesPermutation(a,n.shape.length),p=n,l=[];i!=null&&(p=Ve({inputs:{x:n},backend:t,attrs:{perm:i}}),l.push(p),a=N.getInnerMostAxes(a.length,p.shape.length)),N.assertAxesAreInnerMostDims("argMin",[a[0]],p.shape.length);let u=Hc(t,p,a[0],"min");return l.forEach(c=>t.disposeIntermediateTensorInfo(c)),u}var z0={kernelName:js,backendName:"webgl",kernelFunc:mL};var dL=rt+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,fL=ne({opSnippet:dL}),U0={kernelName:Qr,backendName:"webgl",kernelFunc:fL};var hL=rt+"return log(x + sqrt(x * x + 1.0));",gL=ne({opSnippet:hL}),W0={kernelName:Yr,backendName:"webgl",kernelFunc:gL};var xL=rt+`
  return atan(x);
`,yL=ne({opSnippet:xL}),G0={kernelName:Zr,backendName:"webgl",kernelFunc:yL};var bL=lp+`
  return atan(a, b);
`,_L=`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+Xt+`
  return result;
`,TL=$e({opSnippet:bL,packedOpSnippet:_L}),H0={kernelName:en,backendName:"webgl",kernelFunc:TL};var vL=rt+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,wL=ne({opSnippet:vL}),q0={kernelName:Jr,backendName:"webgl",kernelFunc:wL};var Co=class{constructor(e,t,r,n=!1,s=!1){if(this.variableNames=["x"],t==="avg"&&r)throw new Error("Cannot compute positions for average pool.");let a=e.filterWidth,i=e.strideHeight,p=e.strideWidth,l=e.dilationHeight,u=e.dilationWidth,c=e.effectiveFilterHeight,m=e.effectiveFilterWidth,d=e.padInfo.top,f=e.padInfo.left;this.outputShape=e.outShape;let g=t==="avg",h=`((batch  * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + d`,x=`(xR * ${e.inWidth} + xC) * ${e.inChannels} + d`,b="0.0";if(g||(b="-1.0 / 1e-20"),r){let A=">=";this.userCode=`
        const ivec2 strides = ivec2(${i}, ${p});
        const ivec2 pads = ivec2(${d}, ${f});

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < ${c};
              wR += ${l}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${m};
                wC += ${u}) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value ${A} currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = ${n?s?h:x:`wR * ${m} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let w="max",v=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t==="avg"&&(v="avgValue / max(count, 1.0)");let k=Math.floor(a/4)*4,E=a%4,$=`
      if (${g}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${w}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(${i}, ${p});
      const ivec2 pads = ivec2(${d}, ${f});
      const float initializationValue = ${b};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(${b});
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < ${c};
            wR += ${l}) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${k}; wC += 4) {
            int xC = xCCorner + wC * ${u};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              getValue(batch, xR, xC + 3 * ${u}, d)
            );

            ${$}
          }

          int xC = xCCorner + ${k};
          if (${E===1}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${$}
          } else if (${E===2}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              initializationValue,
              initializationValue
            );

            ${$}
          } else if (${E===3}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              initializationValue
            );

            ${$}
          }
        }
        setOutput(${v});
      }
    `}},Mr=class{constructor(e,t,r,n=!1,s=!1){if(this.variableNames=["x"],t==="avg"&&r)throw new Error("Cannot compute positions for average pool.");let a=e.filterWidth,i=e.strideDepth,p=e.strideHeight,l=e.strideWidth,u=e.dilationDepth,c=e.dilationHeight,m=e.dilationWidth,d=e.effectiveFilterDepth,f=e.effectiveFilterHeight,g=e.effectiveFilterWidth,h=e.padInfo.front,x=e.padInfo.top,b=e.padInfo.left;this.outputShape=e.outShape;let w=t==="avg",v="0.0";if(w||(v="-1.0 / 1e-20"),r){let R=">=";this.userCode=`
        const ivec3 strides =
            ivec3(${i}, ${p}, ${l});
        const ivec3 pads = ivec3(${h}, ${x}, ${b});

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < ${d};
              wD += ${u}) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= ${e.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${f};
                wR += ${c}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${g};
                  wC += ${m}) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value ${R} currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition = ${n?s?`(((batch * ${e.inDepth} + xD) * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`((xD * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`wD * ${f} * ${g} +
                      wR * ${g} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let k="max",E=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t==="avg"&&(E="avgValue / max(count, 1.0)");let $=Math.floor(a/4)*4,A=a%4,D=`
      if (${w}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${k}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${i}, ${p}, ${l});
      const ivec3 pads = ivec3(${h}, ${x}, ${b});
      const float initializationValue = ${v};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= ${e.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(${v});
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < ${d};
            wD += ${u}) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${f};
            wR += ${c}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${$}; wC += 4) {
              int xC = xCCorner + wC * ${m};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                getValue(batch, xD, xR, xC + 2 * ${m}, ch),
                getValue(batch, xD, xR, xC + 3 * ${m}, ch)
              );

              ${D}
            }

            int xC = xCCorner + ${$};
            if (${A===1}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${D}
            } else if (${A===2}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                initializationValue,
                initializationValue
              );

              ${D}
            } else if (${A===3}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                getValue(batch, xD, xR, xC + 2 * ${m}, ch),
                initializationValue
              );

              ${D}
            }
          }
        }
        setOutput(${E});
      }
    `}};function CL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e;Uo(n,"avgPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:p}=r,l=1;y.assert(N.eitherStridesOrDilationsAreOne(a,l),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${l}'`);let u=N.computePool2DInfo(n.shape,s,a,l,i,p);if(u.filterWidth===1&&u.filterHeight===1&&y.arraysEqual(u.inShape,u.outShape))return Xe({inputs:{x:n},backend:t});let c=new Co(u,"avg",!1);return t.runWebGLProgram(c,[n],"float32")}var K0={kernelName:Xs,backendName:"webgl",kernelFunc:CL};function NL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{filterSize:s,strides:a,pad:i,dimRoundingMode:p,dataFormat:l}=r,u=[1,1,1],c=N.computePool3DInfo(n.shape,s,a,u,i,p,l),m=new Mr(c,"avg",!1);return t.runWebGLProgram(m,[n],"float32")}var j0={kernelName:Qs,backendName:"webgl",kernelFunc:NL};var qc=class{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,n=e.strideHeight,s=e.strideWidth,a=e.dilationHeight,i=e.dilationWidth,p=e.effectiveFilterHeight,l=e.effectiveFilterWidth,u=p-1-e.padInfo.top,c=l-1-e.padInfo.left,m=1/(t*r);this.userCode=`
      const ivec2 pads = ivec2(${u}, ${c});
      const float avgMultiplier = float(${m});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${p};
            wR += ${a}) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${l};
            wC+= ${i}) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `}},Kc=class{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterDepth,r=e.filterHeight,n=e.filterWidth,s=e.strideDepth,a=e.strideHeight,i=e.strideWidth,p=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,c=e.effectiveFilterDepth,m=e.effectiveFilterHeight,d=e.effectiveFilterWidth,f=c-1-e.padInfo.front,g=m-1-e.padInfo.top,h=d-1-e.padInfo.left,x=1/(t*r*n);this.userCode=`
      const ivec3 pads = ivec3(${f}, ${g}, ${h});
      const float avgMultiplier = float(${x});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${c};
            wD += ${p}) {
          float dyD = float(dyDCorner + wD) / ${s}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${m};
              wR += ${l}) {
            float dyR = float(dyRCorner + wR) / ${a}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${d};
                wC += ${u}) {
              float dyC = float(dyCCorner + wC) / ${i}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function SL(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,input:s}=e,a=s,{filterSize:i,strides:p,pad:l,dimRoundingMode:u}=r,c=[1,1,1],m=N.computePool3DInfo(a.shape,i,p,c,l,u),d=new Kc(m);return t.runWebGLProgram(d,[n],a.dtype)}var X0={kernelName:vl,backendName:"webgl",kernelFunc:SL};function IL(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,input:s}=e,a=s;Uo([n,s],"avgPoolGrad");let{filterSize:i,strides:p,pad:l}=r,u=N.computePool2DInfo(a.shape,i,p,1,l),c=new qc(u);return t.runWebGLProgram(c,[n],a.dtype)}var Q0={kernelName:Tl,backendName:"webgl",kernelFunc:IL};function kL(o){let{inputs:e,backend:t,attrs:r}=o,{a:n,b:s}=e,{transposeA:a,transposeB:i}=r;return Fs({a:n,b:s,transposeA:a,transposeB:i,backend:t})}var Y0={kernelName:Ys,backendName:"webgl",kernelFunc:kL};var jc=class{constructor(e,t,r,n,s,a){this.outputShape=[],this.variableNames=["x","mean","variance"],N.assertAndGetBroadcastShape(e,t),N.assertAndGetBroadcastShape(e,r);let i="0.0";n!=null&&(N.assertAndGetBroadcastShape(e,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");let p="1.0";s!=null&&(N.assertAndGetBroadcastShape(e,s),this.variableNames.push("scale"),p="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${i};
        float scale = ${p};
        float inv = scale * inversesqrt(variance + float(${a}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}};var Xc=class{constructor(e,t,r,n,s,a){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],N.assertAndGetBroadcastShape(e,t),N.assertAndGetBroadcastShape(e,r);let i="vec4(0.0)";n!=null&&(N.assertAndGetBroadcastShape(e,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");let p="vec4(1.0)";s!=null&&(N.assertAndGetBroadcastShape(e,s),this.variableNames.push("scale"),p="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        vec4 offset = ${i};
        vec4 scale = ${p};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${a}));

        setOutput((x - mean) * inv + offset);
      }
    `}};var EL=({inputs:o,backend:e,attrs:t})=>{let{x:r,mean:n,variance:s,offset:a,scale:i}=o;y.assert(n.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),y.assert(a==null||n.shape.length===a.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),y.assert(i==null||n.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:p}=t;p==null&&(p=.001);let l=[r,n,s],u=null;a!=null&&(u=a.shape,l.push(a));let c=null;i!=null&&(c=i.shape,l.push(i));let m=F().getBool("WEBGL_PACK_NORMALIZATION")?new Xc(r.shape,n.shape,s.shape,u,c,p):new jc(r.shape,n.shape,s.shape,u,c,p);return e.runWebGLProgram(m,l,l[0].dtype)},Z0={kernelName:Ca,backendName:"webgl",kernelFunc:EL};var Qc=class{constructor(e){this.variableNames=["source"],this.outputShape=e,this.rank=e.length;let t=me(this.rank);this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let r=$L(this.rank),n,s=e.map((a,i)=>`sourceLoc.${Wh[i]} = start[${i}] + coords.${Wh[i]};`);n=`
        ${t} sourceLoc;
        ${t} coords = getOutputCoords();
        ${s.join(`
`)}
      `,this.userCode=`
      void main() {
        ${n}
        setOutput(getSource(${r}));
      }
    `}},Wh=["x","y","z","w","u","v"];function $L(o){if(o===1)return"sourceLoc";if(o<=6)return Wh.slice(0,o).map(e=>"sourceLoc."+e).join(",");throw Error(`Slicing for rank ${o} is not yet supported`)}var Yc=class{constructor(e){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let t=me(this.rank),r=je("coords",this.rank),n=je("sourceLoc",this.rank),s=this.rank===1?"sourceLoc":`vec2(${n.slice(-2).join()})`,a=`getChannel(getSource(${n.join()}), ${s})`,i=`
      result.x = ${a};
      if (++${r[this.rank-1]} < ${e[this.rank-1]}) {
        ++${n[this.rank-1]};
        result.y = ${a};
        --${n[this.rank-1]};
      }
    `,p=this.rank===1?"":`
      --${r[this.rank-1]};
      if (++${r[this.rank-2]} < ${e[this.rank-2]}) {
        ++${n[this.rank-2]};
        result.z = ${a};
        if (++${r[this.rank-1]} < ${e[this.rank-1]}) {
          ++${n[this.rank-1]};
          result.w = ${a};
        }
      }
    `,l=this.rank<=4?`sourceLoc = coords +
            ${t}(${e.map((u,c)=>`start[${c}]`).join()});`:e.map((u,c)=>`${n[c]} = ${r[c]} + start[${c}];`).join(`
`);this.userCode=`
      void main() {
        ${t} coords = getOutputCoords();
        ${t} sourceLoc;
        ${l}
        vec4 result = vec4(0.);
        ${i}
        ${p}
        setOutput(result);
      }
    `}};function AL(o,e,t,r){let n=r.texData.get(o.dataId),s=r.makeTensorInfo(t,o.dtype),a=r.texData.get(s.dataId);Object.assign(a,n),a.refCount=1,a.shape=t,a.dtype=o.dtype;let i=it.computeFlatOffset(e,y.computeStrides(o.shape));n.slice&&(i+=n.slice.flatOffset),a.slice={flatOffset:i,origDataId:n.slice&&n.slice.origDataId||o.dataId};let p=r.dataRefCount.get(a.slice.origDataId)||1;return r.dataRefCount.set(a.slice.origDataId,p+1),s}function No(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{begin:s,size:a}=r,[i,p]=it.parseSliceParams(n,s,a);if(it.assertParamsValid(n,i,p),y.sizeFromShape(p)===0)return t.makeTensorInfo(p,n.dtype,[]);if(t.shouldExecuteOnCPU([n])||n.dtype==="string"){let c=t.texData.get(n.dataId),m=Wv(c.values,i,p,n.shape,n.dtype);return t.makeTensorInfo(p,n.dtype,m)}let{isPacked:l}=t.texData.get(n.dataId),u=it.isSliceContinous(n.shape,i,p);if(l||!u){let c=F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Yc(p):new Qc(p),m=[i];return t.runWebGLProgram(c,[n],n.dtype,m)}return t.uploadToGPU(n.dataId),AL(n,i,p,t)}var J0={kernelName:li,backendName:"webgl",kernelFunc:No};var FL=o=>{let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{blockShape:s,crops:a}=r;y.assert(n.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");let i=s.reduce((b,w)=>b*w),p=N.getReshaped(n.shape,s,i),l=N.getPermuted(p.length,s.length),u=N.getReshapedPermuted(n.shape,s,i),c=N.getSliceBeginCoords(a,s.length),m=N.getSliceSize(u,a,s.length),d=[],f=q({inputs:{x:n},backend:t,attrs:{shape:p}}),g=Ve({inputs:{x:f},backend:t,attrs:{perm:l}}),h=q({inputs:{x:g},backend:t,attrs:{shape:u}}),x=No({inputs:{x:h},backend:t,attrs:{begin:c,size:m}});return d.push(f),d.push(g),d.push(h),d.forEach(b=>t.disposeIntermediateTensorInfo(b)),x},ew={kernelName:Zs,backendName:"webgl",kernelFunc:FL};function DL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,weights:s}=e,{size:a}=r,i=t.readSync(n.dataId),p=t.readSync(s.dataId),l=$c(i,p,s.dtype,s.shape,a);return t.makeTensorInfo([a],s.dtype,l)}var tw={kernelName:Js,backendName:"webgl",kernelFunc:DL};var RL=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,OL=`
  return float(int(a.r) & int(b.r));
`;function PL(o){let{inputs:e,backend:t}=o,{a:r,b:n}=e,s=F().getBool("WEBGL_PACK_BINARY_OPERATIONS"),a=F().getNumber("WEBGL_VERSION");if(t.shouldExecuteOnCPU([r,n])||a===1){let p=t.texData.get(r.dataId).values,l=t.texData.get(n.dataId).values,[u,c]=dv(r.shape,n.shape,p,l,r.dtype),m=t.makeTensorInfo(c,r.dtype),d=t.texData.get(m.dataId);return d.values=u,m}let i;return s?i=new jt(RL,r.shape,n.shape,!1):i=new Lt(OL,r.shape,n.shape),t.runWebGLProgram(i,[r,n],r.dtype)}var ow={kernelName:tn,backendName:"webgl",kernelFunc:PL};function VL(o){let{inputs:e,backend:t}=o,{s0:r,s1:n}=e,s=t.readSync(r.dataId),a=t.readSync(n.dataId),i=N.assertAndGetBroadcastShape(Array.from(s),Array.from(a));return t.makeTensorInfo([i.length],"int32",Int32Array.from(i))}var rw={kernelName:ea,backendName:"webgl",kernelFunc:VL};var LL="return float(a != b);",Gh=$e({opSnippet:LL,cpuKernelImpl:Rv,dtype:"bool"}),nw={kernelName:An,backendName:"webgl",kernelFunc:Gh};function pr(o){let{inputs:e,backend:t}=o,{input:r}=e,n=t.texData.get(r.dataId);return Xe({inputs:{x:n.complexTensorInfos.real},backend:t})}var sw={kernelName:ei,backendName:"webgl",kernelFunc:pr};var ML="return float(int(x));";function aw(o,e){let t=new ft(o.shape,ML),r=e.runWebGLProgram(t,[o],"int32");return{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}function Hh(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{dtype:s}=r;if(s==="complex64"){if(n.dtype==="complex64")return Xe({inputs:{x:n},backend:t});let a=qt(n.shape),i=Hh({inputs:{x:n},backend:t,attrs:{dtype:"float32"}}),p=Mt({inputs:{real:i,imag:a},backend:t});return a.dispose(),t.disposeIntermediateTensorInfo(i),p}if(n.dtype==="complex64"){let a=pr({inputs:{input:n},backend:t}),i=Hh({inputs:{x:a},backend:t,attrs:{dtype:s}});return t.disposeIntermediateTensorInfo(a),i}if(!y.hasEncodingLoss(n.dtype,s)){let a=Xe({inputs:{x:n},backend:t});return{dataId:a.dataId,shape:a.shape,dtype:s}}if(t.shouldExecuteOnCPU([n])){let a=t.texData.get(n.dataId).values,[i,p,l]=fv(a,n.shape,n.dtype,s);return t.makeTensorInfo(i,p,l)}if(s==="int32")return aw(n,t);if(s==="bool"){let a=t.makeTensorInfo([],"bool",y.getTypedArrayFromDType("bool",1)),p=Gh({inputs:{a:n,b:a},backend:t});return t.disposeIntermediateTensorInfo(a),p}throw new Error(`Error in Cast: failed to cast ${n.dtype} to ${s}`)}var iw={kernelName:xr,backendName:"webgl",kernelFunc:Hh};var pw="return ceil(x);",BL=ne({opSnippet:pw,packedOpSnippet:pw,cpuKernelImpl:hv}),lw={kernelName:on,backendName:"webgl",kernelFunc:BL};var Zc=class{constructor(e){this.variableNames=["A"],this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}};var Jc=class{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}};function zL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{clipValueMin:s,clipValueMax:a}=r,i;F().getBool("WEBGL_PACK_CLIP")?i=new Jc(n.shape):i=new Zc(n.shape);let p=[[s],[a]];return t.runWebGLProgram(i,[n],n.dtype,p)}var uw={kernelName:rn,backendName:"webgl",kernelFunc:zL};var em=class{constructor(e){this.variableNames=["real","imag"],this.outputShape=e,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `}};function cw(o,e){return{dataId:e.dataId,dtype:e.dtype,shape:o.shape}}function UL(o){let{inputs:e,backend:t}=o,{x:r}=e,n=t.texData.get(r.dataId),s=new em(r.shape),a=[cw(r,n.complexTensorInfos.real),cw(r,n.complexTensorInfos.imag)];return t.runWebGLProgram(s,a,a[0].dtype)}var mw={kernelName:oa,backendName:"webgl",kernelFunc:UL};var tm=class{constructor(e){this.outputShape=[],this.outputShape=N.computeOutShape(e,1),this.variableNames=e.map((a,i)=>`T${i}`);let t=new Array(e.length-1);t[0]=e[0][1];for(let a=1;a<t.length;a++)t[a]=t[a-1]+e[a][1];let r=[`if (yC < ${t[0]}) setOutput(getT0(yR, yC));`];for(let a=1;a<t.length;a++){let i=t[a-1];r.push(`else if (yC < ${t[a]}) setOutput(getT${a}(yR, yC-${i}));`)}let n=t.length,s=t[t.length-1];r.push(`else setOutput(getT${n}(yR, yC-${s}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${r.join(`
        `)}
      }
    `}};var rm=class{constructor(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=N.computeOutShape(e,t);let r=this.outputShape,n=r.length,s=me(n),a=je("coords",n),i=["x","y","z","w","u","v"].slice(0,n);this.variableNames=e.map((g,h)=>`T${h}`);let p=new Array(e.length-1);p[0]=e[0][t];for(let g=1;g<p.length;g++)p[g]=p[g-1]+e[g][t];let l=i[t],u=i.slice(-2),c=i.join(),m=`if (${l} < ${p[0]}) {
        return getChannel(
            getT0(${c}), vec2(${u.join()}));
        }`;for(let g=1;g<p.length;g++){let h=p[g-1];m+=`
        if (${l} < ${p[g]}  && ${l} >= ${p[g-1]}) {
          return getChannel(
            getT${g}(${om(i,l,h)}),
            vec2(${om(u,l,h)}));
        }`}let d=p.length,f=p[p.length-1];m+=`
        return getChannel(
          getT${d}(${om(i,l,f)}),
          vec2(${om(u,l,f)}));`,this.userCode=`
      float getValue(${i.map(g=>"int "+g)}) {
        ${m}
      }

      void main() {
        ${s} coords = getOutputCoords();
        vec4 result = vec4(getValue(${a}), 0., 0., 0.);

        ${a[n-1]} = ${a[n-1]} + 1;
        if (${a[n-1]} < ${r[n-1]}) {
          result.g = getValue(${a});
        }

        ${a[n-2]} = ${a[n-2]} + 1;
        if (${a[n-2]} < ${r[n-2]}) {
          result.a = getValue(${a});
        }

        ${a[n-1]} = ${a[n-1]} - 1;
        if (${a[n-2]} < ${r[n-2]} &&
            ${a[n-1]} < ${r[n-1]}) {
          result.b = getValue(${a});
        }
        setOutput(result);
      }
    `}};function om(o,e,t){let r=o.indexOf(e);return o.map((s,a)=>a===r?`${s} - ${t}`:s).join()}function Ds(o){let{inputs:e,backend:t}=o,{input:r}=e,n=t.texData.get(r.dataId);return Xe({inputs:{x:n.complexTensorInfos.imag},backend:t})}var dw={kernelName:ka,backendName:"webgl",kernelFunc:Ds};function cp(o,e,t){let r=o[0].dtype;if(r==="complex64"){let d=o.map(b=>pr({inputs:{input:b},backend:t})),f=o.map(b=>Ds({inputs:{input:b},backend:t})),g=cp(d,e,t),h=cp(f,e,t),x=Mt({inputs:{real:g,imag:h},backend:t});return d.forEach(b=>t.disposeIntermediateTensorInfo(b)),f.forEach(b=>t.disposeIntermediateTensorInfo(b)),t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(h),x}let n=t.shouldExecuteOnCPU(o);if(r==="string"&&(n=!0),n){let d=o.map(v=>{let E=[-1,y.sizeFromShape(v.shape.slice(e))];return q({inputs:{x:v},backend:t,attrs:{shape:E}})}),f=d.map(v=>({vals:t.readSync(v.dataId),shape:v.shape})),g=N.computeOutShape(d.map(v=>v.shape),1),h=d[0].shape[0]===1,x=gv(f,g,r,h),b=N.computeOutShape(o.map(v=>v.shape),e),w=t.makeTensorInfo(b,r,x);return d.forEach(v=>t.disposeIntermediateTensorInfo(v)),w}let s=o.filter(d=>y.sizeFromShape(d.shape)>0),a=F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&s[0].shape.length>1;if(s.length===1){let d=a?new ft(o[0].shape,Go):new Vt(o[0].shape,Go);return t.runWebGLProgram(d,o,r)}let i=F().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER");if(s.length>i){let d=[];for(let g=0;g<s.length;g+=i){let h=s.slice(g,g+i);d.push(cp(h,e,t))}let f=cp(d,e,t);for(let g of d)t.disposeIntermediateTensorInfo(g);return f}if(a){let d=new rm(s.map(f=>f.shape),e);return t.runWebGLProgram(d,s,r)}let{tensors2D:p,outShape:l}=WL(s,e,t),u=new tm(p.map(d=>d.shape)),c=t.runWebGLProgram(u,p,r);p.forEach(d=>t.disposeIntermediateTensorInfo(d));let m=q({inputs:{x:c},attrs:{shape:l},backend:t});return t.disposeIntermediateTensorInfo(c),m}function WL(o,e,t){let r=N.computeOutShape(o.map(s=>s.shape),e);return{tensors2D:o.map(s=>q({inputs:{x:s},attrs:{shape:[-1,y.sizeFromShape(s.shape.slice(e))]},backend:t})),outShape:r}}function qh(o){let{inputs:e,backend:t,attrs:r}=o,{axis:n}=r,s=y.parseAxisParam(n,e[0].shape)[0],a=e.map(l=>l.shape);N.assertParamsConsistent(a,s);let i=N.computeOutShape(e.map(l=>l.shape),s);if(y.sizeFromShape(i)===0)return t.makeTensorInfo(i,e[0].dtype,[]);let p=e.filter(l=>y.sizeFromShape(l.shape)>0);return p.length===1?Xe({inputs:{x:p[0]},backend:t}):cp(p,s,t)}var fw={kernelName:ra,backendName:"webgl",kernelFunc:qh};var mp=class{constructor(e,t=!1,r=null,n=!1,s=!1){this.variableNames=["x","W"],this.outputShape=e.outShape;let a=e.padInfo.top,i=e.padInfo.left,p=e.strideHeight,l=e.strideWidth,u=e.dilationHeight,c=e.dilationWidth,m=e.filterHeight,d=e.filterWidth,f=Math.floor(e.inChannels/4)*4,g=e.inChannels%4,h=e.dataFormat==="channelsLast",x=h?1:2,b=h?2:3,w=h?3:1,v="",k="";r&&(n?v=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:s?v=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:v=`
          float activation(float x) {
            ${r}
          }
        `,k="result = activation(result);");let E=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${v}

      const ivec2 strides = ivec2(${p}, ${l});
      const ivec2 pads = ivec2(${a}, ${i});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[${w}];

        ivec2 xRCCorner =
            ivec2(coords[${x}], coords[${b}]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${m}; wR++) {
          int xR = xRCorner + wR * ${u};

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${d}; wC++) {
            int xC = xCCorner + wC * ${c};

            if (xC < 0 || xC >= ${e.inWidth}) {
              continue;
            }

            for (int d1 = 0; d1 < ${f}; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (${h}) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (${g===1}) {

              if (${h}) {
                dotProd +=
                    getX(batch, xR, xC, ${f}) *
                    getW(wR, wC, ${f}, d2);
              } else {
                dotProd +=
                    getX(batch, ${f}, xR, xC) *
                    getW(wR, wC, ${f}, d2);
              }

            } else if (${g===2}) {
              vec2 wValues = vec2(
                getW(wR, wC, ${f}, d2),
                getW(wR, wC, ${f} + 1, d2)
              );

              if (${h}) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, ${f}),
                  getX(batch, xR, xC, ${f} + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, ${f}, xR, xC),
                  getX(batch, ${f} + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (${g===3}) {
              vec3 wValues = vec3(
                getW(wR, wC, ${f}, d2),
                getW(wR, wC, ${f} + 1, d2),
                getW(wR, wC, ${f} + 2, d2)
              );

              if (${h}) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, ${f}),
                  getX(batch, xR, xC, ${f} + 1),
                  getX(batch, xR, xC, ${f} + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, ${f}, xR, xC),
                  getX(batch, ${f} + 1, xR, xC),
                  getX(batch, ${f} + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        ${E}
        ${k}
        setOutput(result);
      }
    `}},nm=class{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let t=e.padInfo.front,r=e.padInfo.top,n=e.padInfo.left,s=e.strideDepth,a=e.strideHeight,i=e.strideWidth,p=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,c=e.filterDepth,m=e.filterHeight,d=e.filterWidth,f=Math.floor(e.inChannels/4)*4,g=e.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${s}, ${a}, ${i});
      const ivec3 pads = ivec3(${t}, ${r}, ${n});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < ${c}; wF++) {
          int xF = xFCorner + wF * ${p};

          if (xF < 0 || xF >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${m}; wR++) {
            int xR = xRCorner + wR * ${l};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${d}; wC++) {
              int xC = xCCorner + wC * ${u};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              for (int d1 = 0; d1 < ${f}; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (${g===1}) {
                dotProd +=
                  getX(batch, xF, xR, xC, ${f}) *
                  getW(wF, wR, wC, ${f}, d2);
              } else if (${g===2}) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, ${f}),
                  getX(batch, xF, xR, xC, ${f} + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, ${f}, d2),
                  getW(wF, wR, wC, ${f} + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (${g===3}) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, ${f}),
                  getX(batch, xF, xR, xC, ${f} + 1),
                  getX(batch, xF, xR, xC, ${f} + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, ${f}, d2),
                  getW(wF, wR, wC, ${f} + 1, d2),
                  getW(wF, wR, wC, ${f} + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};var dp=class{constructor(e,t=!1,r=null,n=!1,s=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=Ae(this.outputShape.length);let a=e.padInfo.left,i=e.strideWidth,p=e.dilationWidth,l=e.filterHeight,u=e.filterWidth,c=u,m=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let h=0;h<u;h++)m+=`
           vec4 xTexelC${h*2};
           int xTexelC${h*2}Ready;
           vec4 xTexelC${h*2+1};
           int xTexelC${h*2+1}Ready;
           vec4 xC${h};`;m+=`
     for (int r = 0; r < ${l}; r++) {
      for (int d1 = 0; d1 < ${e.inChannels}; d1 += 2) {
       `;for(let h=0;h<u;h++)m+=`
           xTexelC${h*2} = vec4(0.0);
           xTexelC${h*2}Ready = 0;
           xTexelC${h*2+1} = vec4(0.0);
           xTexelC${h*2+1}Ready = 0;
           xC${h} = vec4(0.0);`;m+=`
         xR = xRCorner + r * dilations[0];
         if (xR >=0 && xR < inDims[0]) {
       `;for(let h=0;h<(c+1)/2;h++){let x=h*2;if(m+=`
           xC = xCCorner + ${x*p};
           `,i===1){if(x<u&&(a%2===1?(m+=`
                 xCOffset = xC + 1;
                 if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xCOffset, d1);

                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }
               `,p===1&&x>0?m+=`
                 xC${x} = vec4(xTexelC${x-2}.zw, xTexelC${x}.xy);
                 `:m+=`
                   xCOffset = xC + 1 - 2;

                   if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       previous.zw = vec2(0.0);
                     }

                     xC${x} = vec4(previous.zw, xTexelC${x}.xy);
                   } else {
                     xC${x} = vec4(0.0, 0.0, xTexelC${x}.xy);
                   }
                   `):m+=`
                 if (xC >= 0 && xC < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 xC${x} = xTexelC${x};
                 `,x+1<u)){let b=a%2===0?y.nearestLargerEven(p):p;p%2===0&&a%2===1||p%2!==0&&a%2!==1?(m+=`
                   xCOffset = xC + imod(pads[1], 2) + ${b};

                   if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                     xTexelC${x+1} = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       xTexelC${x+1}.zw = vec2(0.0);
                     }
                     xTexelC${x+1}Ready = 1;
                   }
                   `,p>1?m+=`
                     xCOffset -= 2;
                     if (xCOffset >= 0 && xCOffset < inDims[1]) {
                      previous = getX(batch, xR, xCOffset, d1);
                      xC${x+1} = vec4(previous.zw, xTexelC${x+1}.xy);
                     } else {
                      xC${x+1} = vec4(0.0, 0.0, xTexelC${x+1}.xy);
                     }
                     `:m+=`
                     xC${x+1} = vec4(xTexelC${x}.zw, xTexelC${x+1}.xy);
                     `):b===1?m+=`
                     xC${x+1} = xTexelC${x};
                     `:m+=`
                     xCOffset = xC + ${b};

                     if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                       xTexelC${x+1} = getX(batch, xR, xCOffset, d1);
                       if (xCOffset + 1 >= inDims[1]) {
                         xTexelC${x+1}.zw = vec2(0.0);
                       }
                       xTexelC${x+1}Ready = 1;
                     }

                     xC${x+1} = xTexelC${x+1};
                     `}}else x<u&&(a%2===1?(m+=`
                 xCOffset = xC + 1 - strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xCOffset, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${x+1}Ready == 0) {
                   xTexelC${x+1} = getX(batch, xR, xC + 1, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xC + 2 >= inDims[1]) {
                     xTexelC${x+1}.zw = vec2(0.0);
                   }
                   xTexelC${x+1}Ready = 1;
                 }

                 xC${x} = vec4(xTexelC${x}.zw, xTexelC${x+1}.zw);
               `,x+1<u&&(m+=`
                   final = vec4(0.0);
                   xCOffset = xC + 1 + strides[1];
                   if(xCOffset >= 0 && xCOffset < inDims[1]) {
                     final = getX(batch, xR, xCOffset, d1);
                   }
                   xC${x+1} = vec4(xTexelC${x+1}.xy, final.xy);
                 `)):(m+=`
                 if(xC >= 0 && xC < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 xCOffset = xC + strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                   xTexelC${x+1} = getX(batch, xR, xCOffset, d1);
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x+1}.zw = vec2(0.);
                   }
                   xTexelC${x+1}Ready = 1;
                 }

                 xC${x} = vec4(
                   xTexelC${x}.xy, xTexelC${x+1}.xy);
               `,x+1<u&&(m+=`
                   xC${x+1} = vec4(xTexelC${x}.zw, xTexelC${x+1}.zw);
                 `)));x<u&&(m+=`
             wTexel = getW(r, ${x}, d1, d2);
             dotProd += xC${x}.xxzz * vec4(wTexel.xy, wTexel.xy);
             if(d1 + 1 < ${e.inChannels}) {
               dotProd += xC${x}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,x+1<u&&(m+=`
               wTexel = getW(r, ${x+1}, d1, d2);
               dotProd += xC${x+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${e.inChannels}) {
                 dotProd += xC${x+1}.yyww * vec4(wTexel.zw, wTexel.zw);
               }
             `))}m+=`
     }
   `,m+=`
     }
   `,m+=`
     }
   `;let d="",f="";r&&(n?d=`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${r}
         }`:s?d=`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${r}
         }`:d=`vec4 activation(vec4 x) {
           ${r}
         }`,f="result = activation(result);");let g=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
       ${d}

       void main() {
         ivec4 coords = getOutputCoords();
         int batch = coords.x;
         ivec2 xRCCorner = coords.yz * strides - pads;
         int d2 = coords.w;
         int xRCorner = xRCCorner.x;
         int xCCorner = xRCCorner.y;

         //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
         vec4 dotProd = vec4(0.000000000000001);

         ${m}

         vec4 result = dotProd - vec4(0.000000000000001);
         ${g}
         ${f}
         setOutput(result);
       }
     `}};var sm=class{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec4"},{name:"pad",type:"ivec2"},{name:"stride",type:"ivec2"},{name:"dilation",type:"ivec2"},{name:"inChannels",type:"int"},{name:"itemsPerBlockRow",type:"int"},{name:"outWidth",type:"int"}],this.outputShape=e,this.enableShapeUniforms=Ae(this.outputShape.length);let{dataFormat:r}=t,n=Ue(),s=r==="channelsLast",a=s?1:2,i=s?2:3,p=this.enableShapeUniforms?"if(blockIndex < outShape[2] && pos < outShape[1]) {":`if(blockIndex < ${e[2]} && pos < ${e[1]}) {`,l="";for(let u=0;u<=1;u++)for(let c=0;c<=1;c++)l+=`
          blockIndex = rc.z + ${c};
          pos = rc.y + ${u};

          ${p}
            offsetY = int(blockIndex / outWidth) * stride[0] - pad[0];
            d0 = offsetY + dilation[0] * (pos / itemsPerBlockRow);

            if(d0 < inputShape[${a}] && d0 >= 0) {
              // Use custom imod instead mod. On Intel GPU, mod may generate
              // unexpected value.
              // https://github.com/tensorflow/tfjs/issues/5447
              offsetX = imod(blockIndex, outWidth) * stride[1] - pad[1];
              d1 = offsetX + dilation[1] * (imod(pos, itemsPerBlockRow) /
                  inChannels);

              if(d1 < inputShape[${i}] && d1 >= 0) {

                ch = imod(pos, inChannels);

                if (${s}) {
                  innerDims = vec2(d1, ch);
                  result[${u*2+c}] = getChannel(
                    getA(rc.x, d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[${u*2+c}] = getChannel(
                    getA(rc.x, ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        ${l}

        ${n.output} = result;
      }
    `}};function am(o,e){let t=o.length;return t>=3?e?[...o.slice(0,-3),o[t-3]*o[t-2],o[t-1]]:[...o.slice(0,-3),o[t-3],o[t-2]*o[t-1]]:!e&&t===1&&o[0]>1?[o[0],1]:null}function im({x:o,filter:e,convInfo:t,backend:r,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:i=null}){let p=o.shape,l=r.texData.get(o.dataId),u=t.inChannels,c=p[0]*p[1]*p[2],m=t.outChannels,d=t.dataFormat==="channelsLast",f=!1,g=!1,h,x=[];if(s!=null){let v=am(s.shape,d);v!=null&&(s=q({inputs:{x:s},backend:r,attrs:{shape:v}}),x.push(s))}if(n!=null){let v=am(n.shape,d);v!=null&&(n=q({inputs:{x:n},backend:r,attrs:{shape:v}}),x.push(n))}if(!((c===1||m===1)&&u>Uh)&&l.isPacked&&d&&l.texture!=null&&p[2]%2!==0&&y.arraysEqual(l.shape.slice(-3),p.slice(-3))){let v=p[0]*p[1]*(p[2]+1),k={dataId:o.dataId,shape:[1,v,t.inChannels],dtype:o.dtype},E=l.shape;l.shape=l.shape.slice(),l.shape[l.shape.length-2]++,y.assert(Ss(l.shape,k.shape),()=>`packed reshape ${l.shape} to ${k.shape} isn't free`);let $=q({inputs:{x:e},backend:r,attrs:{shape:[1,t.inChannels,t.outChannels]}});x.push($);let A=Fs({a:k,b:$,backend:r,transposeA:f,transposeB:g,bias:n,activation:i,preluActivationWeights:s,leakyreluAlpha:a}),D=r.texData.get(A.dataId);y.assert(D.isPacked,()=>"batchMatMul result is expected to be packed"),l.shape=E,D.shape=t.outShape,h=Xe({inputs:{x:A},backend:r}),h.shape=t.outShape,x.push(A)}else{let v=t.outHeight*t.outWidth,k=q({inputs:{x:o},backend:r,attrs:{shape:d?[t.batchSize,v,t.inChannels]:[t.batchSize,t.inChannels,v]}}),E=q({inputs:{x:e},backend:r,attrs:{shape:[1,t.inChannels,t.outChannels]}}),$=Fs({a:d?k:E,b:d?E:k,transposeA:!d,transposeB:g,backend:r,bias:n,activation:i,preluActivationWeights:s,leakyreluAlpha:a});h=q({inputs:{x:$},backend:r,attrs:{shape:t.outShape}}),x.push(k),x.push(E),x.push($)}for(let v of x)r.disposeIntermediateTensorInfo(v);return h}function pm({x:o,filter:e,convInfo:t,backend:r,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:i=null}){let{filterWidth:p,filterHeight:l,inChannels:u,outWidth:c,outHeight:m,dataFormat:d}=t,f=d==="channelsLast",g=p*l*u,h=m*c,x=[t.batchSize,g,h],b=!0,w=!1,v=[];if(s!=null){let z=am(s.shape,f);z!=null&&(s=q({inputs:{x:s},backend:r,attrs:{shape:z}}),v.push(s))}if(n!=null){let z=am(n.shape,f);z!=null&&(n=q({inputs:{x:n},backend:r,attrs:{shape:z}}),v.push(n))}let k=q({inputs:{x:e},backend:r,attrs:{shape:[1,g,y.sizeFromShape(e.shape)/g]}});v.push(k);let E=new sm(x,t),$=[o.shape,[t.padInfo.top,t.padInfo.left],[t.strideHeight,t.strideWidth],[t.dilationHeight,t.dilationWidth],[t.inChannels],[t.filterWidth*t.inChannels],[t.outWidth]],A=r.runWebGLProgram(E,[o],"float32",$),D=q({inputs:{x:A},backend:r,attrs:{shape:x}});v.push(A),v.push(D);let R=n!=null,P=s!=null,V=i==="leakyrelu",L=i?ir(i,!0):null,B=new up(f?D.shape:k.shape,f?k.shape:D.shape,f?[t.batchSize,h,t.outChannels]:[t.batchSize,t.outChannels,h],b,w,R,L,P,V),M=f?[D,k]:[k,D];if(n&&M.push(n),P&&M.push(s),V){let z=r.makeTensorInfo([],"float32",y.createScalarValue(a,"float32"));M.push(z),v.push(z)}let W=r.runWebGLProgram(B,M,"float32"),G=q({inputs:{x:W},backend:r,attrs:{shape:t.outShape}});v.push(W);for(let z of v)r.disposeIntermediateTensorInfo(z);return G}function GL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,filter:s}=e,{strides:a,pad:i,dataFormat:p,dilations:l,dimRoundingMode:u}=r,c=N.convertConv2DDataFormat(p),m=N.computeConv2DInfo(n.shape,s.shape,a,l,i,u,!1,c),d;if(m.filterHeight===1&&m.filterWidth===1&&m.dilationHeight===1&&m.dilationWidth===1&&m.strideHeight===1&&m.strideWidth===1&&(m.padInfo.type==="SAME"||m.padInfo.type==="VALID"))d=im({x:n,filter:s,convInfo:m,backend:t});else if(m.strideWidth<=2&&c==="channelsLast"&&F().getBool("WEBGL_EXP_CONV")){let g=new dp(m),h=[[m.padInfo.top,m.padInfo.left],[m.strideHeight,m.strideWidth],[m.dilationHeight,m.dilationWidth],[m.inHeight,m.inWidth]];d=t.runWebGLProgram(g,[n,s],"float32",h)}else if(F().getBool("WEBGL_CONV_IM2COL"))d=pm({x:n,filter:s,convInfo:m,backend:t});else{let g=new mp(m);d=t.runWebGLProgram(g,[n,s],"float32")}let f=q({inputs:{x:d},backend:t,attrs:{shape:m.outShape}});return t.disposeIntermediateTensorInfo(d),f}var hw={kernelName:na,backendName:"webgl",kernelFunc:GL};var lm=class{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,r=e.strideWidth,n=e.padInfo.top,s=e.padInfo.left,a=e.dataFormat==="channelsLast";this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${n};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${s};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              ${a?`float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);`:`float dyValue = getDy(b, d2, yR, yC);
              float xValue = getX(b, d1, xR, xC);
              dotProd += (xValue * dyValue);`}
            }
          }
        }
        setOutput(dotProd);
      }
    `}},um=class{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,n=e.strideHeight,s=e.strideWidth,a=e.dataFormat==="channelsLast",i=t-1-e.padInfo.top,p=r-1-e.padInfo.left,l=a?1:2,u=a?2:3,c=a?3:1;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${p});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[${c}];

        ivec2 dyCorner = ivec2(coords[${l}], coords[${u}]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${r} - 1 - wC;

            for (int d2 = 0; d2 < ${e.outChannels}; d2++) {

              if (${a}) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}},cm=class{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideDepth,r=e.strideHeight,n=e.strideWidth,s=e.padInfo.front,a=e.padInfo.top,i=e.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yF = 0; yF < ${e.outDepth}; yF++) {
            int xF = wF + yF * ${t} - ${s};

            if (xF < 0 || xF >= ${e.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${e.outHeight}; yR++) {
              int xR = wR + yR * ${r} - ${a};

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${e.outWidth}; yC++) {
                int xC = wC + yC * ${n} - ${i};

                if (xC < 0 || xC >= ${e.inWidth}) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}},mm=class{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterDepth,r=e.filterHeight,n=e.filterWidth,s=e.strideDepth,a=e.strideHeight,i=e.strideWidth,p=t-1-e.padInfo.front,l=r-1-e.padInfo.top,u=n-1-e.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${p}, ${l}, ${u});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < ${t}; wF++) {
          float dyF = float(dyFCorner + wF) / ${s}.0;

          if (dyF < 0.0 || dyF >= ${e.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${t} - 1 - wF;

          for (int wR = 0; wR < ${r}; wR++) {
            float dyR = float(dyRCorner + wR) / ${a}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${r} - 1 - wR;

            for (int wC = 0; wC < ${n}; wC++) {
              float dyC = float(dyCCorner + wC) / ${i}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${n} - 1 - wC;

              for (int d2 = 0; d2 < ${e.outChannels}; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function HL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,dy:s}=e,{strides:a,pad:i,dataFormat:p,dimRoundingMode:l,filterShape:u}=r,c=N.convertConv2DDataFormat(p),m=N.computeConv2DInfo(n.shape,u,a,1,i,l,!1,c),d=new lm(m);return t.runWebGLProgram(d,[n,s],"float32")}var gw={kernelName:sa,backendName:"webgl",kernelFunc:HL};var dm=class{constructor(e){this.variableNames=["dy","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"strides",type:"vec2"}],this.outputShape=e.inShape,this.enableShapeUniforms=Ae(this.outputShape.length);let t=e.filterHeight,r=e.filterWidth,n=t-1-e.padInfo.top,s=r-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${n}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];

        ivec2 dyCorner = ivec2(coords[1], coords[2]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        vec4 result = vec4(0.);
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / strides[0];
          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);
          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            int wCPerm = ${r} - 1 - wC;

            float dyC = float(dyCCorner + wC) / strides[1];
            bool idyCVal = (dyC >= 0.0) && (dyC < ${e.outWidth}.0)
              && (fract(dyC) == 0.0);
            int idyC = int(dyC);

            float dyC2 = float(dyCCorner + wC + 1) / strides[1];
            bool idyCVal2 = (dyC2 >= 0.0) && (dyC2 < ${e.outWidth}.0)
              && (fract(dyC2) == 0.0);
            int idyC2 = int(dyC2);

            if (idyCVal && idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec4 dySample2 = (idyC / 2 == idyC2 / 2) ?
                  dySample : getDy(batch, idyR, idyC2, d2);

                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));

                dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample2.xy : dySample2.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC2, d2);
                vec2 dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            }
          }
        }
        setOutput(result);
      }
    `}};function qL(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,filter:s}=e,{inputShape:a,strides:i,pad:p,dataFormat:l,dimRoundingMode:u}=r,c=N.convertConv2DDataFormat(l),m=N.computeConv2DInfo(a,s.shape,i,1,p,u,!1,c);if(F().getBool("WEBGL_PACK_CONV2DTRANSPOSE")&&c==="channelsLast"){let d=[[m.strideHeight,m.strideWidth]],f=new dm(m);return t.runWebGLProgram(f,[n,s],"float32",d)}else{let d=new um(m);return t.runWebGLProgram(d,[n,s],"float32")}}var xw={kernelName:aa,backendName:"webgl",kernelFunc:qL};function KL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,filter:s}=e,{strides:a,pad:i,dilations:p}=r,l=N.computeConv3DInfo(n.shape,s.shape,a,p,i),u=new nm(l);return t.runWebGLProgram(u,[n,s],"float32")}var yw={kernelName:ia,backendName:"webgl",kernelFunc:KL};function jL(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,dy:s}=e,{strides:a,pad:i,filterShape:p}=r,l=N.computeConv3DInfo(n.shape,p,a,1,i),u=new cm(l);return t.runWebGLProgram(u,[n,s],"float32")}var bw={kernelName:wl,backendName:"webgl",kernelFunc:jL};function XL(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,filter:s}=e,{pad:a,strides:i,inputShape:p}=r,l=N.computeConv3DInfo(p,s.shape,i,1,a),u=new mm(l);return t.runWebGLProgram(u,[n,s],"float32")}var _w={kernelName:pa,backendName:"webgl",kernelFunc:XL};var QL=go+`
  return cos(x);
`,YL=`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${Xt}
  return result;
`,ZL=ne({opSnippet:QL,packedOpSnippet:YL}),Tw={kernelName:nn,backendName:"webgl",kernelFunc:ZL};var JL=`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`,eM=ne({opSnippet:JL}),vw={kernelName:sn,backendName:"webgl",kernelFunc:eM};var fm=class{constructor(e,t,r,n,s){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];let[a,i,p,l]=e,[u]=t,[c,m]=r;this.outputShape=[u,c,m,l];let d=n==="bilinear"?1:0,[f,g]=[`${i-1}.0`,`${p-1}.0`],[h,x,b]=c>1?[`${(i-1)/(c-1)}`,"(y2-y1) * height_ratio",`y1*${f} + float(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${f}`],[w,v,k]=m>1?[`${(p-1)/(m-1)}`,"(x2-x1) * width_ratio",`x1*${g} + float(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${g}`];this.userCode=`
      const float height_ratio = float(${h});
      const float width_ratio = float(${w});
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= ${a}) {
          return;
        }

        float height_scale = ${x};
        float width_scale = ${v};

        float in_y = ${b};
        if( in_y < 0.0 || in_y > ${f} ) {
          setOutput(float(${s}));
          return;
        }
        float in_x = ${k};
        if( in_x < 0.0 || in_x > ${g} ) {
          setOutput(float(${s}));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(${d} == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `}};var tM=o=>{let{inputs:e,backend:t,attrs:r}=o,{image:n,boxes:s,boxInd:a}=e,{cropSize:i,method:p,extrapolationValue:l}=r,u=new fm(n.shape,s.shape,i,p,l);return t.runWebGLProgram(u,[n,s,a],"float32")},ww={kernelName:ca,backendName:"webgl",kernelFunc:tM};var Rs;(function(o){o.Prod="*",o.Sum="+"})(Rs||(Rs={}));var sl=class{constructor(e,t,r,n){this.op=e,this.outputShape=t,this.variableNames=["x"],this.customUniforms=[{name:"index",type:"float"}];let s=this.outputShape.length,a=this.op===Rs.Prod?"1.0":"0.0",i=r?a:`getX(${Cw(s,"coords",this.op)})`,p=this.outputShape[this.outputShape.length-1],l="",u="";r?(l=n?`end != ${p-1}`:"end != 0",u=n?"end + 1":"end - 1"):(l=n?`end + pow2 < ${p}`:"end >= pow2",u=n?"end + pow2":"end - pow2"),this.userCode=`
      void main() {
        ${me(s)} coords = getOutputCoords();
        int end = ${Nw(s,"coords",this.op)};
        float val = ${i};
        int pow2 = int(pow(2.0, index));
        if (${l}) {
          int idx = ${u};
          ${Nw(s,"coords",this.op)} = idx;
          val ${this.op}= getX(${Cw(s,"coords",this.op)});
        }
        setOutput(val);
      }
    `}};function Cw(o,e,t){if(o===1)return`${e}`;if(o===2)return`${e}.x, ${e}.y`;if(o===3)return`${e}.x, ${e}.y, ${e}.z`;if(o===4)return`${e}.x, ${e}.y, ${e}.z, ${e}.w`;throw new Error(`Cumulative ${t} for rank ${o} is not yet supported`)}function Nw(o,e,t){if(o===1)return`${e}`;if(o===2)return`${e}.y`;if(o===3)return`${e}.z`;if(o===4)return`${e}.w`;throw new Error(`Cumulative ${t} for rank ${o} is not yet supported`)}function hm(o,e,t,r,n,s){let a=e.shape.length,i=N.getAxesPermutation([r],a),p=e;i!=null&&(p=Ve({inputs:{x:e},backend:t,attrs:{perm:i}}));let l=N.getInnerMostAxes(1,a)[0];if(l!==a-1)throw new Error(`WebGL cumprod shader expects an inner-most axis=${e.shape.length-1} but got axis=${r}`);let u=p.shape[l],c=Xe({inputs:{x:p},backend:t});for(let m=0;m<=Math.ceil(Math.log2(u))-1;m++){let d=new sl(o,p.shape,!1,s),f=[[m]],g=c;c=t.runWebGLProgram(d,[c],c.dtype,f),t.disposeIntermediateTensorInfo(g)}if(n){let m=new sl(o,p.shape,n,s),d=c;c=t.runWebGLProgram(m,[c],c.dtype),t.disposeIntermediateTensorInfo(d)}if(i!=null){let m=N.getUndoAxesPermutation(i),d=Ve({inputs:{x:c},backend:t,attrs:{perm:m}});return t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(p),d}return c}function oM(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,exclusive:a,reverse:i}=r;return hm(Rs.Prod,n,t,s,a,i)}var Sw={kernelName:la,backendName:"webgl",kernelFunc:oM};function rM(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,exclusive:a,reverse:i}=r;return hm(Rs.Sum,n,t,s,a,i)}var Iw={kernelName:ua,backendName:"webgl",kernelFunc:rM};function nM(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,weights:s}=e,{size:a,binaryOutput:i}=r;if(n.shape.length===1){let p=t.readSync(n.dataId),l=t.readSync(s.dataId),u=$c(p,l,s.dtype,s.shape,a);return t.makeTensorInfo([a],s.dtype,u)}else if(n.shape.length===2){let p=t.bufferSync(n),l=t.bufferSync(s),u=mv(p,l,a,i);return t.makeTensorInfo(u.shape,s.dtype,u.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}var kw={kernelName:ma,backendName:"webgl",kernelFunc:nM};var gm=class{constructor(e,t,r){this.variableNames=["x"],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=r,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = ${this.getHeightCoordString()};
      int w = ${this.getWidthCoordString()};
      int d = ${this.getDepthCoordString()};

      int in_h = h / ${t};
      int offset_h = imod(h, ${t});
      int in_w = w / ${t};
      int offset_w = imod(w, ${t});
      int offset_d = (offset_h * ${t} + offset_w) *
        ${this.getOutputDepthSize()};
      int in_d = d + offset_d;

      float result = ${this.getInputSamplingString()};
      setOutput(result);
    }
  `}getHeightCoordString(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"}getWidthCoordString(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"}getDepthCoordString(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"}getOutputDepthSize(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}};function sM(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{blockSize:s,dataFormat:a}=r,i=n.shape[0],p=a==="NHWC"?n.shape[1]:n.shape[2],l=a==="NHWC"?n.shape[2]:n.shape[3],u=a==="NHWC"?n.shape[3]:n.shape[1],c=p*s,m=l*s,d=u/(s*s),f=a==="NHWC"?[i,c,m,d]:[i,d,c,m],g=new gm(f,s,a);return t.runWebGLProgram(g,[n],n.dtype)}var Ew={kernelName:da,backendName:"webgl",kernelFunc:sM};var fp=class{constructor(e,t=!1,r=null,n=!1,s=!1){this.variableNames=["x","W"],this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=Ae(this.outputShape.length);let a=e.filterHeight,i=e.filterWidth,p=e.outChannels/e.inChannels,l="",u="";r&&(n?l=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:s?l=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:l=`
          float activation(float x) {
            ${r}
          }
        `,u="result = activation(result);");let c=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${l}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${p};
        int q = d2 - d1 * ${p};

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < ${a}; wR++) {
          int xR = xRCorner + wR * dilations[0];

          if (xR < 0 || xR >= inDims[0]) {
            continue;
          }

          for (int wC = 0; wC < ${i}; wC++) {
            int xC = xCCorner + wC * dilations[1];

            if (xC < 0 || xC >= inDims[1]) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        ${c}
        ${u}
        setOutput(result);
      }
    `}};var hp=class{constructor(e,t=!1,r=null,n=!1,s=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=Ae(this.outputShape.length);let a=e.outChannels/e.inChannels,i=e.padInfo.left,p=e.strideWidth,l=e.dilationWidth,u=e.filterHeight,c=e.filterWidth,m=c,d=`
      int xR; int xC; int xCOffset;
      vec4 wTexel; vec4 previous; vec4 final;`;for(let x=0;x<c;x++)d+=`
          vec4 xTexelC${x*2};
          int xTexelC${x*2}Ready;
          vec4 xTexelC${x*2+1};
          int xTexelC${x*2+1}Ready;
          vec4 xC${x};`;d+=`
    for (int r = 0; r < ${u}; r++) {
      `;for(let x=0;x<c;x++)d+=`
          xTexelC${x*2} = vec4(0.0);
          xTexelC${x*2}Ready = 0;
          xTexelC${x*2+1} = vec4(0.0);
          xTexelC${x*2+1}Ready = 0;
          xC${x} = vec4(0.0);`;d+=`
        xR = xRCorner + r * dilations[0];
        if (xR >=0 && xR < inDims[0]) {
      `;for(let x=0;x<(m+1)/2;x++){let b=x*2;if(d+=`
          xC = xCCorner + ${b*l};
          `,p===1){if(b<c&&(i%2===1?(d+=`
                xCOffset = xC + 1;
                if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }
              `,l===1&&b>0?d+=`
                xC${b} = vec4(xTexelC${b-2}.zw, xTexelC${b}.xy);
                `:d+=`
                  xCOffset = xC + 1 - 2;

                  if (xCOffset >= 0 && xCOffset < inDims[1]) {
                    previous = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      previous.zw = vec2(0.0);
                    }

                    xC${b} = vec4(previous.zw, xTexelC${b}.xy);
                  } else {
                    xC${b} = vec4(0.0, 0.0, xTexelC${b}.xy);
                  }
                  `):d+=`
                if (xC >= 0 && xC < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                xC${b} = xTexelC${b};
                `,b+1<c)){let w=i%2===0?y.nearestLargerEven(l):l;l%2===0&&i%2===1||l%2!==0&&i%2!==1?(d+=`
                  xCOffset = xC + imod(pads[1], 2) + ${w};

                  if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                    xTexelC${b+1} = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      xTexelC${b+1}.zw = vec2(0.0);
                    }
                    xTexelC${b+1}Ready = 1;
                  }
                  `,l>1?d+=`
                    xCOffset -= 2;
                    if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);
                     xC${b+1} = vec4(previous.zw, xTexelC${b+1}.xy);
                    } else {
                     xC${b+1} = vec4(0.0, 0.0, xTexelC${b+1}.xy);
                    }
                    `:d+=`
                    xC${b+1} = vec4(xTexelC${b}.zw, xTexelC${b+1}.xy);
                    `):w===1?d+=`
                    xC${b+1} = xTexelC${b};
                    `:d+=`
                    xCOffset = xC + ${w};

                    if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                      xTexelC${b+1} = getX(batch, xR, xCOffset, d1);
                      if (xCOffset + 1 >= inDims[1]) {
                        xTexelC${b+1}.zw = vec2(0.0);
                      }
                      xTexelC${b+1}Ready = 1;
                    }

                    xC${b+1} = xTexelC${b+1};
                    `}}else b<c&&(i%2===1?(d+=`
                xCOffset = xC + 1 - strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xCOffset, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${b+1}Ready == 0) {
                  xTexelC${b+1} = getX(batch, xR, xC + 1, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xC + 2 >= inDims[1]) {
                    xTexelC${b+1}.zw = vec2(0.0);
                  }
                  xTexelC${b+1}Ready = 1;
                }

                xC${b} = vec4(xTexelC${b}.zw, xTexelC${b+1}.zw);
              `,b+1<c&&(d+=`
                  final = vec4(0.0);
                  xCOffset = xC + 1 + strides[1];
                  if(xCOffset >= 0 && xCOffset < inDims[1]) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xC${b+1} = vec4(xTexelC${b+1}.xy, final.xy);
                `)):(d+=`
                if(xC >= 0 && xC < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                xCOffset = xC + strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                  xTexelC${b+1} = getX(batch, xR, xCOffset, d1);
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b+1}.zw = vec2(0.);
                  }
                  xTexelC${b+1}Ready = 1;
                }

                xC${b} = vec4(
                  xTexelC${b}.xy, xTexelC${b+1}.xy);
              `,b+1<c&&(d+=`
                  xC${b+1} = vec4(xTexelC${b}.zw, xTexelC${b+1}.zw);
                `)));b<c&&(d+=`
            wTexel = getW(r, ${b}, d1, q);
            dotProd += xC${b} * vec4(wTexel.xz, wTexel.xz);
          `,b+1<c&&(d+=`
              wTexel = getW(r, ${b+1}, d1, q);
              dotProd += xC${b+1} * vec4(wTexel.xz, wTexel.xz);
            `))}d+=`
    }
  `,d+=`
      }
    `;let f="",g="";r&&(n?f=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${r}
        }`:s?f=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${r}
        }`:f=`vec4 activation(vec4 x) {
          ${r}
        }`,g="result = activation(result);");let h=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${f}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${a};
        int q = d2 - d1 * ${a};
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
        vec4 dotProd = vec4(0.000000000000001);

        ${d}

        vec4 result = dotProd - vec4(0.000000000000001);
        ${h}
        ${g}
        setOutput(result);
      }
    `}};function aM(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,filter:s}=e,{strides:a,pad:i,dilations:p,dimRoundingMode:l}=r,u=p;u==null&&(u=[1,1]),y.assert(N.eitherStridesOrDilationsAreOne(a,u),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${a} and dilations '${u}'`);let c=N.computeConv2DInfo(n.shape,s.shape,a,u,i,l,!0),m;F().getBool("WEBGL_PACK_DEPTHWISECONV")&&c.strideWidth<=2&&c.outChannels/c.inChannels===1?m=new hp(c):m=new fp(c);let d=[[c.padInfo.top,c.padInfo.left],[c.strideHeight,c.strideWidth],[c.dilationHeight,c.dilationWidth],[c.inHeight,c.inWidth]];return t.runWebGLProgram(m,[n,s],"float32",d)}var $w={kernelName:fa,backendName:"webgl",kernelFunc:aM};var xm=class{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,r=e.strideWidth,n=e.padInfo.top,s=e.padInfo.left,a=e.outChannels/e.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${a} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${n};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${r} - ${s};

              if (xC < 0 || xC >= ${e.inWidth}) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `}},ym=class{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,r=e.filterWidth,n=e.strideHeight,s=e.strideWidth,a=t-1-e.padInfo.top,i=r-1-e.padInfo.left,p=e.outChannels/e.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${a}, ${i});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${r}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${r} - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < ${p}; dm++) {
              int d2 = d1 * ${p} + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function iM(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,dy:s}=e,{strides:a,dilations:i,pad:p,dimRoundingMode:l,filterShape:u}=r,c=N.computeConv2DInfo(n.shape,u,a,i,p,l,!0),m=new xm(c);return t.runWebGLProgram(m,[n,s],"float32")}var Aw={kernelName:ha,backendName:"webgl",kernelFunc:iM};function pM(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,filter:s}=e,{strides:a,dilations:i,pad:p,dimRoundingMode:l,inputShape:u}=r,c=N.computeConv2DInfo(u,s.shape,a,i,p,l,!0),m=new ym(c);return t.runWebGLProgram(m,[n,s],"float32")}var Fw={kernelName:ga,backendName:"webgl",kernelFunc:pM};var bm=class{constructor(e){this.variableNames=["X"],this.outputShape=[e,e],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}};function lM(o){let{inputs:e,backend:t}=o,{x:r}=e,n=[...r.shape,...r.shape],s=y.sizeFromShape(r.shape),a=q({inputs:{x:r},backend:t,attrs:{shape:[s]}}),i=new bm(s),p=t.runWebGLProgram(i,[a],a.dtype),l=q({inputs:{x:p},backend:t,attrs:{shape:n}});return t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(p),l}var Dw={kernelName:xa,backendName:"webgl",kernelFunc:lM};var _m=class{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let{inHeight:t,inWidth:r,padInfo:n,strideHeight:s,strideWidth:a,filterHeight:i,filterWidth:p,dilationHeight:l,dilationWidth:u}=e,{top:c,left:m}=n;this.userCode=`
      const ivec2 strides = ivec2(${s}, ${a});
      const ivec2 pads = ivec2(${c}, ${m});
      const float neg_infinity = -3.4e38;

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.w;
        ivec2 outTopLeftCorner =
            coords.yz * strides - pads;
        int hBeg = outTopLeftCorner.x;
        int wBeg = outTopLeftCorner.y;

        float curVal = neg_infinity;
        for (int h = 0; h < ${i}; h++) {
          int hIn = hBeg + h * ${l};

          if (hIn >= 0 && hIn < ${t}) {
            for (int w = 0; w < ${p}; w++) {
              int wIn = wBeg + w * ${u};

              if (wIn >= 0 && wIn < ${r}) {
                float xVal = getX(batch, hIn, wIn, d1);
                float wVal = getW(h, w, d1);

                float val = xVal + wVal;
                if (val > curVal) {
                  curVal = val;
                }
              }
            }
          }
        }

        float result = curVal;
        setOutput(result);
      }
    `}};function uM(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,filter:s}=e,{strides:a,pad:i,dilations:p}=r,l=N.computeDilation2DInfo(n.shape,s.shape,a,i,"NHWC",p),u,c=new _m(l);u=t.runWebGLProgram(c,[n,s],"float32");let m=q({inputs:{x:u},backend:t,attrs:{shape:l.outShape}});return t.disposeIntermediateTensorInfo(u),m}var Rw={kernelName:ya,backendName:"webgl",kernelFunc:uM};function cM(o){let{inputs:e,backend:t,attrs:r}=o,{equation:n}=r,s=e,{allDims:a,summedDims:i,idDims:p}=N.decodeEinsumEquation(n,s.length);N.checkEinsumDimSizes(a.length,p,s);let{path:l,steps:u}=N.getEinsumComputePath(i,p),c=u.length,m=null,d=a.length,f=[];for(let g=0;g<c;++g){for(let h of u[g]){let{permutationIndices:x,expandDims:b}=N.getEinsumPermutation(d,p[h]),w;N.isIdentityPermutation(x)?w=s[h]:(w=Ve({inputs:{x:s[h]},backend:t,attrs:{perm:x}}),f.push(w));let v=w.shape.slice();for(let k=0;k<b.length;++k)v.splice(b[k],0,1);y.arraysEqual(w.shape,v)||(w=q({inputs:{x:w},backend:t,attrs:{shape:v}}),f.push(w)),m===null?m=w:(m=rl({inputs:{a:w,b:m},backend:t}),f.push(m))}g<c-1&&(l[g]>=0&&(m=As({inputs:{x:m},backend:t,attrs:{axis:l[g]-(a.length-d),keepDims:!1}}),f.push(m)),d--)}for(let g of f)g!==m&&t.disposeIntermediateTensorInfo(g);return m}var Ow={kernelName:ba,backendName:"webgl",kernelFunc:cM};var mM="return (x >= 0.0) ? x : (exp(x) - 1.0);",dM=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,fM=ne({opSnippet:mM,packedOpSnippet:dM}),Pw={kernelName:pn,backendName:"webgl",kernelFunc:fM};var hM="return (b >= 0.0) ? a : a * (b + 1.0);",gM=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,xM=o=>{let{inputs:e,backend:t}=o,{dy:r,y:n}=e,s=F().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new jt(gM,r.shape,n.shape):new Lt(hM,r.shape,n.shape);return t.runWebGLProgram(s,[r,n],r.dtype)},Vw={kernelName:Cl,backendName:"webgl",kernelFunc:xM};var yM=`
  return vec4(equal(a, b));
`,bM="return float(a == b);",_M=$e({opSnippet:bM,packedOpSnippet:yM,dtype:"bool",cpuKernelImpl:xv}),Lw={kernelName:un,backendName:"webgl",kernelFunc:_M};var TM=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${N.ERF_P};
  float a1 = ${N.ERF_A1};
  float a2 = ${N.ERF_A2};
  float a3 = ${N.ERF_A3};
  float a4 = ${N.ERF_A4};
  float a5 = ${N.ERF_A5};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`,vM=ne({opSnippet:TM}),Mw={kernelName:ln,backendName:"webgl",kernelFunc:vM};var wM=go+`
  return exp(x);
`,CM=`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,Kh=ne({opSnippet:wM,packedOpSnippet:CM,cpuKernelImpl:yv,dtype:"float32"}),Bw={kernelName:cn,backendName:"webgl",kernelFunc:Kh};function Tm(o){let{inputs:e,attrs:t,backend:r}=o,{dim:n}=t,{input:s}=e,a=s.shape.length,i=s.shape.slice(),p=n;return n<0&&(y.assert(-(a+1)<=n,()=>`Axis must be in the interval [${-(a+1)}, ${a}]`),p=a+n+1),i.splice(p,0,1),q({inputs:{x:s},backend:r,attrs:{shape:i}})}var zw={kernelName:_a,backendName:"webgl",kernelFunc:Tm};var Uw="return exp(x) - 1.0;",NM=ne({opSnippet:Uw,packedOpSnippet:Uw,cpuKernelImpl:bv}),Ww={kernelName:mn,backendName:"webgl",kernelFunc:NM};var al=class{constructor(e,t,r){this.variableNames=["real","imag"];let n=t[1];this.outputShape=t;let s=r?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,a=r?`${n}.0`:"1.0",i;if(e==="real")i="return real * expR - imag * expI;";else if(e==="imag")i="return real * expI + imag * expR;";else throw new Error(`FFT component must be either "real" or "imag", got ${e}.`);this.userCode=`
      const float exponentMultiplier = ${s};

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        ${i}
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(${n});
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < ${n}; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / ${a};
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `}};function vm(o,e,t){let r=t.texData.get(o.dataId),n=y.sizeFromShape(o.shape),s=o.shape[o.shape.length-1],a=n/s,i=q({inputs:{x:o},backend:t,attrs:{shape:[a,s]}}),p=i.shape,l=new al("real",p,e),u=new al("imag",p,e),c=[{dataId:r.complexTensorInfos.real.dataId,dtype:r.complexTensorInfos.real.dtype,shape:p},{dataId:r.complexTensorInfos.imag.dataId,dtype:r.complexTensorInfos.imag.dtype,shape:p}],m=t.runWebGLProgram(l,c,"float32"),d=t.runWebGLProgram(u,c,"float32"),f=Mt({inputs:{real:m,imag:d},backend:t});t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d);let g=q({inputs:{x:f},backend:t,attrs:{shape:o.shape}});return t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(f),g}function SM(o){let{inputs:e,backend:t}=o,{input:r}=e;return vm(r,!1,t)}var Gw={kernelName:Ta,backendName:"webgl",kernelFunc:SM};var wm=class{constructor(e,t){this.outputShape=[],this.customUniforms=[{name:"value",type:"float"}],this.variableNames=["x"],this.outputShape=e,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}};function lr(o){let{backend:e,attrs:t}=o,{shape:r,value:n}=t,{dtype:s}=t;if(s=s||y.inferDtype(n),s==="string"){let a=y.getArrayFromDType(s,y.sizeFromShape(r));return a.fill(n),e.makeTensorInfo(r,s,a)}else{let a=new wm(r,n),i=[[n]];return e.runWebGLProgram(a,[],s,i)}}var Hw={kernelName:va,backendName:"webgl",kernelFunc:lr};var Cm=class{constructor(e){this.variableNames=["Image"],this.outputShape=[];let t=e[2];this.outputShape=e,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];

          int coordX = ${t} - x - 1;
          float outputValue;
          if(coordX >= 0 && coordX < ${t}) {
            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);
          } else {
            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);
          }
          setOutput(outputValue);
        }
    `}};var qw={kernelName:wa,backendName:"webgl",kernelFunc:({inputs:o,backend:e})=>{let{image:t}=o,r=e,n=new Cm(t.shape);return r.runWebGLProgram(n,[t],t.dtype)}};var Kw="return floor(x);",IM=ne({opSnippet:Kw,packedOpSnippet:Kw,cpuKernelImpl:_v}),jw={kernelName:dn,backendName:"webgl",kernelFunc:IM};var kM=`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,EM=`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,$M=$e({opSnippet:kM,packedOpSnippet:EM,dtype:"int32"}),Xw={kernelName:fn,backendName:"webgl",kernelFunc:$M};var Nm=class{constructor(e){this.variableNames=["A"];let t=Ue(),[r,n]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${n}.0, ${r}.0);

        vec4 values = ${t.texture2D}(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `}};var Sm=class{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;let t=Ue(),[r,n]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(${n}.0, ${r}.0);
            vec4 values = ${t.texture2D}(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        ${t.output} = result;
      }
    `}};var Qw={kernelName:kp,backendName:"webgl",kernelFunc:AM},gp,jh=F().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");function AM(o){let{inputs:e,backend:t,attrs:r}=o,{pixels:n}=e,{numChannels:s}=r,a=typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement,i=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,[p,l]=a?[n.videoWidth,n.videoHeight]:[n.width,n.height],u=[l,p],c=[l,p,s];if(i||a){let g=F().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(gp==null||g!==jh)&&(jh=g,gp=document.createElement("canvas").getContext("2d",{willReadFrequently:jh})),gp.canvas.width=p,gp.canvas.height=l,gp.drawImage(n,0,0,p,l),n=gp.canvas}let m=t.makeTensorInfo(u,"int32");t.texData.get(m.dataId).usage=_t.PIXELS,t.gpgpu.uploadPixelDataToTexture(t.getTexture(m.dataId),n);let d=F().getBool("WEBGL_PACK")?new Sm(c):new Nm(c),f=t.runWebGLProgram(d,[m],"int32");return t.disposeData(m.dataId),f}function FM(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,filter:s,bias:a,preluActivationWeights:i}=e,{strides:p,pad:l,dataFormat:u,dilations:c,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=r,g=N.convertConv2DDataFormat(u),h=N.computeConv2DInfo(n.shape,s.shape,p,c,l,m,!1,g),x,b=[],w=a!=null,v=i!=null,k=d==="leakyrelu",E=()=>{let A=[n,s],D=(R,P)=>{if(P==="NCHW"&&R.shape.length===1&&R.shape[0]!==1){let V=q({inputs:{x:R},backend:t,attrs:{shape:[R.shape[0],1,1]}});return b.push(V),V}return R};if(w&&A.push(D(a,u)),v&&A.push(D(i,u)),k){let R=t.makeTensorInfo([],"float32",y.createScalarValue(f,"float32"));A.push(R),b.push(R)}return A};if(h.filterHeight===1&&h.filterWidth===1&&h.dilationHeight===1&&h.dilationWidth===1&&h.strideHeight===1&&h.strideWidth===1&&(h.padInfo.type==="SAME"||h.padInfo.type==="VALID"))x=im({x:n,filter:s,convInfo:h,backend:t,bias:a,activation:d,preluActivationWeights:i,leakyreluAlpha:f});else if(h.strideWidth<=2&&g==="channelsLast"&&F().getBool("WEBGL_EXP_CONV")){let A=d?ir(d,!0):null,D=new dp(h,w,A,v,k),R=[[h.padInfo.top,h.padInfo.left],[h.strideHeight,h.strideWidth],[h.dilationHeight,h.dilationWidth],[h.inHeight,h.inWidth]],P=E();x=t.runWebGLProgram(D,P,"float32",R)}else if(F().getBool("WEBGL_CONV_IM2COL"))x=pm({x:n,filter:s,convInfo:h,backend:t,bias:a,activation:d,preluActivationWeights:i,leakyreluAlpha:f});else{let A=d?ir(d,!1):null,D=new mp(h,w,A,v,k),R=E();x=t.runWebGLProgram(D,R,"float32")}let $=q({inputs:{x},backend:t,attrs:{shape:h.outShape}});return b.push(x),b.forEach(A=>t.disposeIntermediateTensorInfo(A)),$}var Yw={kernelName:Zn,backendName:"webgl",kernelFunc:FM};function DM(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,filter:s,bias:a,preluActivationWeights:i}=e,{strides:p,pad:l,dilations:u,dimRoundingMode:c,activation:m,leakyreluAlpha:d}=r,f=[],g=u;g==null&&(g=[1,1]),y.assert(N.eitherStridesOrDilationsAreOne(p,g),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${p} and dilations '${g}'`);let h=N.computeConv2DInfo(n.shape,s.shape,p,g,l,c,!0),x=F().getBool("WEBGL_PACK_DEPTHWISECONV")&&h.strideWidth<=2&&h.outChannels/h.inChannels===1,b=m?ir(m,x):null,w=[n,s],v=a!=null,k=i!=null,E=m==="leakyrelu";if(v&&w.push(a),k&&w.push(i),E){let R=t.makeTensorInfo([],"float32",y.createScalarValue(d,"float32"));w.push(R),f.push(R)}let $;x?$=new hp(h,v,b,k,E):$=new fp(h,v,b,k,E);let A=[[h.padInfo.top,h.padInfo.left],[h.strideHeight,h.strideWidth],[h.dilationHeight,h.dilationWidth],[h.inHeight,h.inWidth]],D=t.runWebGLProgram($,w,"float32",A);return f.forEach(R=>t.disposeIntermediateTensorInfo(R)),D}var Zw={kernelName:Jn,backendName:"webgl",kernelFunc:DM};var Im=class{constructor(e,t,r,n){this.sliceDim=e,this.strides=t,this.paramsShape=n,this.variableNames=["x","indices"],this.outputShape=r;let s=me(r.length),a=`
    int index;`;for(let i=0;i<this.sliceDim;i++)a+=`
          index = round(getIndices(coords[0], ${i}));
          out_of_bounds = out_of_bounds || index < 0;
          out_of_bounds = out_of_bounds || index >= ${this.paramsShape[i]};
          flattenIndex += index * ${this.strides[i]};`;this.userCode=`
         void main() {
          ${s} coords = getOutputCoords();
          int flattenIndex = 0;
          bool out_of_bounds = false;

          ${a}

          setOutput(out_of_bounds ? 0.0 : getX(flattenIndex, coords[1]));
        }
      `}};function RM(o){let{inputs:e,backend:t}=o,{params:r,indices:n}=e,s=n.shape,a=s[s.length-1],i=y.sizeFromShape(r.shape),[p,l,u,c]=N.prepareAndValidate(r,n),m=q({inputs:{x:n},backend:t,attrs:{shape:[l,a]}}),d=q({inputs:{x:r},backend:t,attrs:{shape:[y.sizeFromShape(r.shape)/u,u]}});if(t.shouldExecuteOnCPU([r,n])||r.dtype==="string"){let x=t.readSync(n.dataId),b=t.bufferSync(r),w=Tv(x,b,r.dtype,l,a,u,c,r.shape,i);return t.makeTensorInfo(p,r.dtype,w.values)}let f=new Im(a,c,[l,u],r.shape),g=t.runWebGLProgram(f,[d,m],d.dtype),h=q({inputs:{x:g},backend:t,attrs:{shape:p}});return t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(g),h}var Jw={kernelName:Sa,backendName:"webgl",kernelFunc:RM};var km=class{constructor(e,t){this.variableNames=["A","indices"],this.outputShape=t,this.rank=t.length;let r=me(this.rank),n=OM(e,2);this.userCode=`
      void main() {
        ${r} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${e[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${n}));
      }
    `}};function OM(o,e){let t=["resRC.x","resRC.y","resRC.z","resRC.w"],r=[];for(let n=0;n<o.length;n++)n===2?r.push("index"):r.push(`${t[n]}`);return r.join()}function Xh(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,indices:s}=e,{axis:a,batchDims:i}=r,p=y.parseAxisParam(a,n.shape)[0];if(F().get("DEBUG")){let b=t.readSync(s.dataId),w=n.shape[p];for(let v=0;v<b.length;++v){let k=b[v];y.assert(k<=w-1&&k>=0,()=>`GatherV2: the index value ${k} is not in [0, ${w-1}]`)}}let l=N.segment_util.collectGatherOpShapeInfo(n,s,p,i),u=y.sizeFromShape(s.shape),c=[],m=q({inputs:{x:n},backend:t,attrs:{shape:[l.batchSize,l.outerSize,l.dimSize,l.sliceSize]}}),d=q({inputs:{x:s},backend:t,attrs:{shape:[l.batchSize,u/l.batchSize]}});c.push(m),c.push(d);let f=[l.batchSize,l.outerSize,u/l.batchSize,l.sliceSize];if(t.shouldExecuteOnCPU([n,s])||n.dtype==="string"){let b=t.bufferSync(d),w=t.bufferSync(m),v=vv(w,b,f);return c.forEach(k=>t.disposeIntermediateTensorInfo(k)),t.makeTensorInfo(l.outputShape,v.dtype,v.values)}let g=new km(m.shape,f),h=t.runWebGLProgram(g,[m,d],m.dtype);c.push(h);let x=q({inputs:{x:h},backend:t,attrs:{shape:l.outputShape}});return c.forEach(b=>t.disposeIntermediateTensorInfo(b)),x}var eC={kernelName:Na,backendName:"webgl",kernelFunc:Xh};var PM="return float(a > b);",VM=`
  return vec4(greaterThan(a, b));
`,LM=$e({opSnippet:PM,packedOpSnippet:VM,cpuKernelImpl:wv,dtype:"bool"}),tC={kernelName:hn,backendName:"webgl",kernelFunc:LM};var MM="return float(a >= b);",BM=`
  return vec4(greaterThanEqual(a, b));
`,zM=$e({opSnippet:MM,packedOpSnippet:BM,dtype:"bool",cpuKernelImpl:Cv}),oC={kernelName:gn,backendName:"webgl",kernelFunc:zM};function UM(o){let{inputs:e,backend:t}=o,{input:r}=e;return vm(r,!0,t)}var rC={kernelName:Ia,backendName:"webgl",kernelFunc:UM};var WM="return float(!isnan(x) && !isinf(x));",GM=ne({opSnippet:WM,dtype:"bool"}),nC={kernelName:xn,backendName:"webgl",kernelFunc:GM};var HM="return float(isinf(x));",qM=ne({opSnippet:HM,dtype:"bool"}),sC={kernelName:yn,backendName:"webgl",kernelFunc:qM};var KM="return float(isnan(x));",jM=ne({opSnippet:KM,dtype:"bool"}),aC={kernelName:bn,backendName:"webgl",kernelFunc:jM};var XM="return float(a < b);",QM=`
  return vec4(lessThan(a, b));
`,YM=$e({opSnippet:XM,packedOpSnippet:QM,cpuKernelImpl:Nv,dtype:"bool"}),iC={kernelName:_n,backendName:"webgl",kernelFunc:YM};var ZM="return float(a <= b);",JM=`
  return vec4(lessThanEqual(a, b));
`,e3=$e({opSnippet:ZM,packedOpSnippet:JM,cpuKernelImpl:Sv,dtype:"bool"}),pC={kernelName:Tn,backendName:"webgl",kernelFunc:e3};function t3(o){let{backend:e,attrs:t}=o,{start:r,stop:n,num:s}=t,a=Iv(r,n,s);return e.makeTensorInfo([a.length],"float32",a)}var lC={kernelName:$a,backendName:"webgl",kernelFunc:t3};var o3=go+`
  return x < 0.0 ? 0./0. : log(x);
`,r3=`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,n3=ne({opSnippet:o3,packedOpSnippet:r3,cpuKernelImpl:kv}),uC={kernelName:vn,backendName:"webgl",kernelFunc:n3};var s3=go+`
  return log(1.0 + x);
`,a3=ne({opSnippet:s3}),cC={kernelName:wn,backendName:"webgl",kernelFunc:a3};var i3="return float(a >= 1.0 && b >= 1.0);",p3=`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,l3=$e({opSnippet:i3,packedOpSnippet:p3,dtype:"bool"}),mC={kernelName:Cn,backendName:"webgl",kernelFunc:l3};var u3="return float(!(x >= 1.0));",c3=ne({opSnippet:u3}),dC={kernelName:Nn,backendName:"webgl",kernelFunc:c3};var m3="return float(a >= 1.0 || b >= 1.0);",d3=`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,f3=$e({opSnippet:m3,packedOpSnippet:d3,dtype:"bool"}),fC={kernelName:Sn,backendName:"webgl",kernelFunc:f3};var Em=class{constructor(e,t,r,n,s){this.variableNames=["x"],this.outputShape=[];let a=t,i=e[3]-1;this.outputShape=e;let p,l=`float(${r}) + float(${n}) * sum`;s===.5?p=`inversesqrt(${l})`:s===1?p=`1.0/(${l})`:p=`exp(log(${l}) * float(-${s}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -${a}; j <= ${a}; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  ${i}) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * ${p};
        setOutput(val);
      }
    `}};var $m=class{constructor(e,t,r,n,s){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;let a=t,i=e[3]-1;this.outputShape=e;let p,l=`float(${r}) + float(${n}) * sum`;s===.5?p=`inversesqrt(${l})`:s===1?p=`1.0/(${l})`:p=`exp(log(${l}) * float(-${s}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < ${this.outputShape[3]};
        bool hasNextRow = c < ${this.outputShape[2]};

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - ${a};
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - ${a}; j <= ${a}; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${i}));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * ${p};
        setOutput(result);
      }
    `}};var h3=o=>{let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{depthRadius:s,bias:a,alpha:i,beta:p}=r,l=F().getBool("WEBGL_PACK_NORMALIZATION")?new $m(n.shape,s,a,i,p):new Em(n.shape,s,a,i,p);return t.runWebGLProgram(l,[n],n.dtype)},hC={kernelName:Aa,backendName:"webgl",kernelFunc:h3};var Am=class{constructor(e,t,r,n,s){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=r,this.alpha=n,this.beta=s,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < ${this.depth}; ++d) {
          int depthBegin = int(max(0.0, float(d - ${t})));
          int depthEnd = int(min(float(${this.depth}),
              float(d + ${t} + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = ${this.depth};

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(${n}) * norm + float(${r});

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(${n})
                * float(${s})
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * ${s});
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `}};var g3=o=>{let{inputs:e,backend:t,attrs:r}=o,{x:n,y:s,dy:a}=e,{depthRadius:i,bias:p,alpha:l,beta:u}=r,c=new Am(n.shape,i,p,l,u);return t.runWebGLProgram(c,[n,s,a],n.dtype)},gC={kernelName:Nl,backendName:"webgl",kernelFunc:g3};function xC(o,e,t,r){let n=y.sizeFromShape(e),a=y.sizeFromShape(o.shape)/n,i=q({inputs:{x:o},attrs:{shape:[a,n]},backend:r}),p=Qt(i,o.dtype,"max",r),l=q({inputs:{x:p},attrs:{shape:t},backend:r});return r.disposeIntermediateTensorInfo(i),r.disposeIntermediateTensorInfo(p),l}function Qh(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{reductionIndices:s,keepDims:a}=r,i=n.shape.length,p=y.parseAxisParam(s,n.shape),l=p,u=N.getAxesPermutation(l,i),c=u!=null,m=t.shouldExecuteOnCPU([n]),d=n;if(c){if(m){let w=t.texData.get(d.dataId).values,v=new Array(i);for(let $=0;$<v.length;$++)v[$]=n.shape[u[$]];let k=$s(w,n.shape,n.dtype,u,v);d=t.makeTensorInfo(v,n.dtype);let E=t.texData.get(d.dataId);E.values=k}else d=Lr(n,u,t);l=N.getInnerMostAxes(l.length,i)}N.assertAxesAreInnerMostDims("max",l,i);let[f,g]=N.computeOutAndReduceShapes(d.shape,l),h=f;a&&(h=N.expandShapeToKeepDim(f,p));let x;if(m){let w=t.texData.get(d.dataId).values,v=Ev(w,y.sizeFromShape(g),h,n.dtype);x=t.makeTensorInfo(h,n.dtype);let k=t.texData.get(x.dataId);k.values=v}else x=xC(d,g,h,t);return c&&t.disposeIntermediateTensorInfo(d),x}var yC={kernelName:Fa,backendName:"webgl",kernelFunc:Qh};var x3=lp+`
  return max(a, b);
`,y3=`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+Xt+`
  return result;
`,b3=$e({opSnippet:x3,packedOpSnippet:y3,cpuKernelImpl:$v}),bC={kernelName:In,backendName:"webgl",kernelFunc:b3};function _3(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e;Uo(n,"maxPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:p}=r,l=1;y.assert(N.eitherStridesOrDilationsAreOne(a,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${l}'`);let u=N.computePool2DInfo(n.shape,s,a,l,i,p);if(u.filterWidth===1&&u.filterHeight===1&&y.arraysEqual(u.inShape,u.outShape))return Xe({inputs:{x:n},backend:t});let c=new Co(u,"max",!1);return t.runWebGLProgram(c,[n],n.dtype)}var _C={kernelName:Da,backendName:"webgl",kernelFunc:_3};function T3(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{filterSize:s,strides:a,pad:i,dataFormat:p,dimRoundingMode:l}=r,u=[1,1,1],c=N.computePool3DInfo(n.shape,s,a,u,i,l,p),m=new Mr(c,"max",!1);return t.runWebGLProgram(m,[n],n.dtype)}var TC={kernelName:Ra,backendName:"webgl",kernelFunc:T3};var Fm=class{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideHeight,r=e.strideWidth,n=e.dilationHeight,s=e.effectiveFilterHeight,a=e.effectiveFilterWidth,i=s-1-e.padInfo.top,p=a-1-e.padInfo.left,l=s*a-1;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${p});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${s};
          wR += ${n}) {
          float dyR = float(dyRCorner + wR) / ${t}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${a}; wC++) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = ${l} - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * ${a} + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}},Dm=class{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideDepth,r=e.strideHeight,n=e.strideWidth,s=e.dilationDepth,a=e.dilationHeight,i=e.dilationWidth,p=e.effectiveFilterDepth,l=e.effectiveFilterHeight,u=e.effectiveFilterWidth,c=p-1-e.padInfo.front,m=l-1-e.padInfo.top,d=u-1-e.padInfo.left,f=p*l*u-1;this.userCode=`
      const ivec3 pads = ivec3(${c}, ${m}, ${d});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${p};
           wD += ${s}) {
          float dyD = float(dyDCorner + wD) / ${t}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${l};
              wR += ${a}) {
            float dyR = float(dyRCorner + wR) / ${r}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${u};
                wC += ${i}) {
              float dyC = float(dyCCorner + wC) / ${n}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = ${f} -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * ${l} * ${u} +
                  wR * ${u} + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function v3(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,input:s}=e,a=s,{filterSize:i,strides:p,pad:l,dimRoundingMode:u}=r,c=[1,1,1],m=N.computePool3DInfo(a.shape,i,p,c,l,u),d=new Mr(m,"max",!0),f=t.runWebGLProgram(d,[a],a.dtype),g=new Dm(m),h=t.runWebGLProgram(g,[n,f],a.dtype);return t.disposeIntermediateTensorInfo(f),h}var vC={kernelName:Il,backendName:"webgl",kernelFunc:v3};function w3(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,input:s,output:a}=e,i=s;Uo([s,a],"maxPoolGrad");let{filterSize:p,strides:l,pad:u,dimRoundingMode:c}=r,m=N.computePool2DInfo(i.shape,p,l,1,u,c),d=!0,f=new Co(m,"max",d),g=t.runWebGLProgram(f,[i],i.dtype),h=new Fm(m),x=t.runWebGLProgram(h,[n,g],i.dtype);return t.disposeIntermediateTensorInfo(g),x}var wC={kernelName:Sl,backendName:"webgl",kernelFunc:w3};function CC(o,e,t,r){let n=new Co(t,"max",!1),s=r.runWebGLProgram(n,[o],"float32");n=new Co(t,"max",!0,!0,e);let a=r.runWebGLProgram(n,[o],"float32");return[s,a]}var NC={kernelName:Oa,backendName:"webgl",kernelFunc:({inputs:o,attrs:e,backend:t})=>{let{x:r}=o,{filterSize:n,strides:s,pad:a,includeBatchInIndex:i}=e,p=t;y.assert(r.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${r.shape.length}.`);let l=[1,1];y.assert(N.eitherStridesOrDilationsAreOne(s,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${l}'`);let u=N.computePool2DInfo(r.shape,n,s,l,a),[c,m]=CC(r,i,u,p);return[c,m]}};function SC(o,e,t,r){let n=y.sizeFromShape(e),a=y.sizeFromShape(o.shape)/n,i=q({inputs:{x:o},attrs:{shape:[a,n]},backend:r}),p=Qt(i,"float32","mean",r),l=q({inputs:{x:p},attrs:{shape:t},backend:r});return r.disposeIntermediateTensorInfo(i),r.disposeIntermediateTensorInfo(p),l}var IC={kernelName:Pa,backendName:"webgl",kernelFunc:({inputs:o,attrs:e,backend:t})=>{let{x:r}=o,{keepDims:n,axis:s}=e,a=t,i=r.shape.length,p=y.parseAxisParam(s,r.shape),l=p,u=N.getAxesPermutation(l,i),c=u!=null,m=a.shouldExecuteOnCPU([r]),d=[],f=r;if(c){if(m){let v=a.texData.get(f.dataId).values,k=new Array(i);for(let A=0;A<k.length;A++)k[A]=r.shape[u[A]];let E=$s(v,r.shape,r.dtype,u,k);f=a.makeTensorInfo(k,r.dtype);let $=a.texData.get(f.dataId);$.values=E}else f=Lr(r,u,a);d.push(f),l=N.getInnerMostAxes(l.length,i)}N.assertAxesAreInnerMostDims("sum",l,i);let[g,h]=N.computeOutAndReduceShapes(f.shape,l),x=g;n&&(x=N.expandShapeToKeepDim(g,p));let b=SC(f,h,x,a);for(let w of d)a.disposeIntermediateTensorInfo(w);return b}};function C3(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,keepDims:a}=r,i=n.shape.length,p=y.parseAxisParam(s,n.shape),l=p,u=N.getAxesPermutation(l,i),c=n;u!=null&&(c=Ve({inputs:{x:n},backend:t,attrs:{perm:u}}),l=N.getInnerMostAxes(l.length,n.shape.length)),N.assertAxesAreInnerMostDims("min",l,i);let[m,d]=N.computeOutAndReduceShapes(c.shape,l),f=y.sizeFromShape(d),g=q({inputs:{x:c},backend:t,attrs:{shape:[-1,f]}}),h=Qt(g,g.dtype,"min",t),x;if(a){let b=N.expandShapeToKeepDim(m,p);x=q({inputs:{x:h},backend:t,attrs:{shape:b}})}else x=q({inputs:{x:h},backend:t,attrs:{shape:m}});return t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(h),u!=null&&t.disposeIntermediateTensorInfo(c),x}var kC={kernelName:Va,backendName:"webgl",kernelFunc:C3};var N3=lp+`
  return min(a, b);
`,S3=`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+Xt+`
  return result;
`,I3=$e({opSnippet:N3,packedOpSnippet:S3,cpuKernelImpl:Av}),EC={kernelName:kn,backendName:"webgl",kernelFunc:I3};var Rm=class{constructor(e,t,r){this.variableNames=["x"],this.outputShape=t.map((u,c)=>u[0]+e[c]+u[1]);let n=e.length,s=me(n),a=t.map(u=>u[0]).join(","),i=t.map((u,c)=>u[0]+e[c]).join(","),p=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n),l=r==="reflect"?0:1;if(n===1){this.userCode=`
        int start = ${a};
        int end = ${i};

        void main() {
          int outC = getOutputCoords();
          if (outC < start) {
            outC = start * 2 - outC - ${l};
          } else if(outC >= end) {
            outC = (end - 1) * 2 - outC + ${l};
          }
          setOutput(getX(outC - start));
        }
      `;return}this.userCode=`
      ${s} start = ${s}(${a});
      ${s} end = ${s}(${i});

      void main() {
        ${s} outC = getOutputCoords();
        for (int i = 0; i < ${n}; i++) {
          if (outC[i] < start[i]) {
            outC[i] = start[i] * 2 - outC[i] - ${l};
          } else if(outC[i] >= end[i]) {
            outC[i] = (end[i] - 1) * 2 - outC[i] + ${l};
          }
        }
        ${s} coords = outC - start;
        setOutput(getX(${p}));
      }
    `}};var Om=class{constructor(e,t,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((f,g)=>f[0]+e[g]+f[1]);let n=e.length,s=me(n),a=t.map(f=>f[0]).join(","),i=t.map((f,g)=>f[0]+e[g]).join(","),p=je("rc",n),l=je("source",n),u=`${p[n-1]} < ${this.outputShape[n-1]}`,c=n===1?"source":`vec2(${l.slice(-2).join()})`,m=r==="reflect"?0:1,d="";if(n===1){let f=`
        ${s} source = rc;
        if (source < start) {
          source = start * 2 - source - ${m};
        } else if (source >= end) {
          source = (end - 1) * 2 - source + ${m};
        }
        source -= start;
      `;d=`
        ${s} rc = outputLoc;
        ${f}
        result[0] = getChannel(getX(${l.join()}), ${c});
        ${p[n-1]} += 1;
        if(${u}) {
          ${f}
          result[1] = getChannel(getX(${l.join()}), ${c});
        }
      `}else{let f=`
        ${s} source = rc;
        ${s} lt = ${s}(lessThan(source, start));
        ${s} gte = ${s}(greaterThanEqual(source, end));
        ${s} orig = 1 - (lt + gte);
        source = orig * source +
                lt * (start * 2 - source - ${m}) +
                gte * ((end - 1) * 2 - source + ${m});
        source -= start;
      `;d=`
        ${s} rc = outputLoc;
        ${f}
        result[0] = getChannel(getX(${l.join()}), ${c});
        ${p[n-1]} += 1;
        if(${u}) {
          ${f}
          result[1] = getChannel(getX(${l.join()}), ${c});
        }
        rc = outputLoc;
        ${p[n-2]} += 1;
        if(${p[n-2]} < ${this.outputShape[n-2]}) {
          ${f}
          result[2] = getChannel(getX(${l.join()}), ${c});
          ${p[n-1]} += 1;
          if(${u}) {
            ${f}
            result[3] = getChannel(getX(${l.join()}), ${c});
          }
        }
      `}this.userCode=`
      const ${s} start = ${s}(${a});
      const ${s} end = ${s}(${i});

      void main() {
        ${s} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${d}
        setOutput(result);
      }
    `}};var k3=({inputs:o,backend:e,attrs:t})=>{let{x:r}=o,{paddings:n,mode:s}=t,a=F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Om(r.shape,n,s):new Rm(r.shape,n,s);return e.runWebGLProgram(a,[r],r.dtype)},$C={kernelName:La,backendName:"webgl",kernelFunc:k3};var E3=`if (b == 0.0) return NAN;
  return mod(a, b);`,$3=`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+Xt+`
  return result;
`,A3=$e({opSnippet:E3,packedOpSnippet:$3}),AC={kernelName:En,backendName:"webgl",kernelFunc:A3};var Pm=class{constructor(e,t,r){this.variableNames=["probs"],this.customUniforms=[{name:"seed",type:"float"}],this.outputShape=[e,r],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < ${t-1}; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(${t-1}));
      }
    `}};var F3=`
if (a == b) {
  return 1.0;
};
return a / b;`,D3=`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,Yh=$e({opSnippet:F3,packedOpSnippet:D3,checkOutOfBounds:!0}),FC={kernelName:an,backendName:"webgl",kernelFunc:Yh};var DC="return a - b;",Zh=$e({opSnippet:DC,packedOpSnippet:DC,supportsComplex:!0,cpuKernelImpl:Zv}),RC={kernelName:Kn,backendName:"webgl",kernelFunc:Zh};function Jh(o){let{inputs:e,backend:t,attrs:r}=o,{logits:n}=e,{dim:s}=r,a=y.parseAxisParam([s],n.shape),i=Qh({inputs:{x:n},backend:t,attrs:{reductionIndices:a,keepDims:!1}}),p=N.expandShapeToKeepDim(i.shape,a),l=q({inputs:{x:i},backend:t,attrs:{shape:p}}),u=Zh({inputs:{a:n,b:l},backend:t}),c=Kh({inputs:{x:u},backend:t}),m=As({inputs:{x:c},backend:t,attrs:{axis:a,keepDims:!1}}),d=q({inputs:{x:m},backend:t,attrs:{shape:p}}),f=Yh({inputs:{a:c,b:d},backend:t});return t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(l),t.disposeIntermediateTensorInfo(u),t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d),f}var OC={kernelName:di,backendName:"webgl",kernelFunc:Jh};function R3(o){let{inputs:e,backend:t,attrs:r}=o,{logits:n}=e,{numSamples:s,seed:a,normalized:i}=r,p=i?n:Jh({inputs:{logits:n},backend:t,attrs:{dim:n.shape.length-1}}),l=p.shape[0],u=p.shape[1],c=new Pm(l,u,s),m=[[a]],d=t.runWebGLProgram(c,[p],"int32",m);return i||t.disposeIntermediateTensorInfo(p),d}var PC={kernelName:Ma,backendName:"webgl",kernelFunc:R3};var O3=rt+`
  return -x;
`,P3=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`;function V3(o){let{inputs:e,backend:t}=o,{x:r}=e;if(t.shouldExecuteOnCPU([r])){let s=t.texData.get(r.dataId),[a,i]=Dv(s.values,r.shape,r.dtype);return t.makeTensorInfo(i,r.dtype,a)}let n;return F().getBool("WEBGL_PACK_UNARY_OPERATIONS")?n=new Vt(r.shape,P3):n=new ft(r.shape,O3),t.runWebGLProgram(n,[r],r.dtype)}var VC={kernelName:Ba,backendName:"webgl",kernelFunc:V3};var L3=bt.nonMaxSuppressionV3Impl;function M3(o){N.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:e,backend:t,attrs:r}=o,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p}=r,l=t.readSync(n.dataId),u=t.readSync(s.dataId),{selectedIndices:c}=L3(l,u,a,i,p);return t.makeTensorInfo([c.length],"int32",new Int32Array(c))}var LC={kernelName:za,backendName:"webgl",kernelFunc:M3};var B3=bt.nonMaxSuppressionV4Impl;function z3(o){N.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:e,backend:t,attrs:r}=o,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p,padToMaxOutputSize:l}=r,u=t.readSync(n.dataId),c=t.readSync(s.dataId),{selectedIndices:m,validOutputs:d}=B3(u,c,a,i,p,l);return[t.makeTensorInfo([m.length],"int32",new Int32Array(m)),t.makeTensorInfo([],"int32",new Int32Array([d]))]}var MC={kernelName:Ua,backendName:"webgl",kernelFunc:z3};var U3=bt.nonMaxSuppressionV5Impl;function W3(o){N.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:e,backend:t,attrs:r}=o,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p,softNmsSigma:l}=r,u=t.readSync(n.dataId),c=t.readSync(s.dataId),m=a,d=i,f=p,g=l,{selectedIndices:h,selectedScores:x}=U3(u,c,m,d,f,g);return[t.makeTensorInfo([h.length],"int32",new Int32Array(h)),t.makeTensorInfo([x.length],"float32",new Float32Array(x))]}var BC={kernelName:Wa,backendName:"webgl",kernelFunc:W3};var Vm=class{constructor(e,t,r,n){this.variableNames=["indices"],this.outputShape=[e,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${n}), float(${r}),
                      float(index == coords.y)));
      }
    `}};var G3=o=>{let{inputs:e,backend:t,attrs:r}=o,{indices:n}=e,{dtype:s,depth:a,onValue:i,offValue:p}=r,l=y.sizeFromShape(n.shape),u=new Vm(l,a,i,p),c=q({inputs:{x:n},backend:t,attrs:{shape:[l]}}),m=t.runWebGLProgram(u,[c],s);t.disposeIntermediateTensorInfo(c);let d=[...n.shape,a],f=q({inputs:{x:m},backend:t,attrs:{shape:d}});return t.disposeIntermediateTensorInfo(m),f},zC={kernelName:Ha,backendName:"webgl",kernelFunc:G3};function il(o){let{inputs:e,backend:t}=o,{x:r}=e;if(r.dtype==="complex64"){let n=pr({inputs:{input:r},backend:t}),s=il({inputs:{x:n},backend:t}),a=Ds({inputs:{input:r},backend:t}),i=il({inputs:{x:a},backend:t}),p=Mt({inputs:{real:s,imag:i},backend:t});return t.disposeIntermediateTensorInfo(n),t.disposeIntermediateTensorInfo(s),t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(i),p}else return lr({attrs:{shape:r.shape,dtype:r.dtype,value:r.dtype==="string"?"":0},backend:t})}var UC={kernelName:ki,backendName:"webgl",kernelFunc:il};function WC(o){let{inputs:e,backend:t}=o,{x:r}=e;if(r.dtype==="string")throw new Error("onesLike is not supported under string dtype");if(r.dtype==="complex64"){let n=pr({inputs:{input:r},backend:t}),s=WC({inputs:{x:n},backend:t}),a=Ds({inputs:{input:r},backend:t}),i=il({inputs:{x:a},backend:t}),p=Mt({inputs:{real:s,imag:i},backend:t});return t.disposeIntermediateTensorInfo(n),t.disposeIntermediateTensorInfo(s),t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(i),p}else return lr({attrs:{shape:r.shape,dtype:r.dtype,value:1},backend:t})}var GC={kernelName:Ga,backendName:"webgl",kernelFunc:WC};function H3(o){let{inputs:e,backend:t,attrs:r}=o,{axis:n}=r;if(e.length===1)return Tm({inputs:{input:e[0]},backend:t,attrs:{dim:n}});let s=e[0].shape,a=e[0].dtype;e.forEach(u=>{y.assertShapesMatch(s,u.shape,"All tensors passed to stack must have matching shapes"),y.assert(a===u.dtype,()=>"All tensors passed to stack must have matching dtypes")});let i=[],p=e.map(u=>{let c=Tm({inputs:{input:u},backend:t,attrs:{dim:n}});return i.push(c),c}),l=qh({inputs:p,backend:t,attrs:{axis:n}});return i.forEach(u=>t.disposeIntermediateTensorInfo(u)),l}var HC={kernelName:qa,backendName:"webgl",kernelFunc:H3};var Lm=class{constructor(e,t,r){this.variableNames=["x"],this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((l,u)=>l[0]+e[u]+l[1]);let n=e.length,s=me(n),a=t.map(l=>l[0]).join(","),i=t.map((l,u)=>l[0]+e[u]).join(","),p=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n);if(n===1){this.userCode=`
        int start = ${a};
        int end = ${i};

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(value);
          } else {
            setOutput(getX(outC - start));
          }
        }
      `;return}this.userCode=`
      ${s} start = ${s}(${a});
      ${s} end = ${s}(${i});

      void main() {
        ${s} outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(value);
        } else {
          ${s} coords = outC - start;
          setOutput(getX(${p}));
        }
      }
    `}};var Mm=class{constructor(e,t,r){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((g,h)=>g[0]+e[h]+g[1]);let n=e.length,s=me(n),a=t.map(g=>g[0]).join(","),i=t.map((g,h)=>g[0]+e[h]).join(","),p=je("rc",n),l=je("source",n),u=`${p[n-1]} < ${this.outputShape[n-1]}`,c=n===1?"source":`vec2(${l.slice(-2).join()})`,m=[`${s} rc = outputLoc;`,`${p[n-1]} += 1;
       if(${u}) {
      `,n===1?"":`}
       rc = outputLoc;
       ${p[n-2]} += 1;
       if(${p[n-2]} < ${this.outputShape[n-2]}) {`,n===1?"":`  ${p[n-1]} += 1;
         if(${u}) {`],d=n===1?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",f="";for(let g=0,h=n===1?2:4;g<h;g++)f+=`
        ${m[g]}
        if (${d}) {
          result[${g}] = float(value);
        } else {
          ${s} source = rc - start;
          result[${g}] = getChannel(getX(${l.join()}), ${c});
        }
      `;f+=n===1?"} ":"}}",this.userCode=`
      const ${s} start = ${s}(${a});
      const ${s} end = ${s}(${i});

      void main() {
        ${s} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${f}
        setOutput(result);
      }
    `}};var eg=o=>{let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{paddings:s,constantValue:a}=r;if(y.sizeFromShape(n.shape)===0){let l=s.map((u,c)=>u[0]+n.shape[c]+u[1]);return lr({backend:t,attrs:{shape:l,value:a,dtype:n.dtype}})}let i=F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Mm(n.shape,s,a):new Lm(n.shape,s,a),p=[[a]];return t.runWebGLProgram(i,[n],n.dtype,p)},qC={kernelName:Ka,backendName:"webgl",kernelFunc:eg};var q3=`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,K3=`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  bvec4 isNaN1 = lessThan(a, vec4(0.0));
  bvec4 isNaN2 = lessThan(floor(b), b);
  bvec4 isNaN = bvec4(isNaN1.x && isNaN2.x, isNaN1.y && isNaN2.y, isNaN1.z && isNaN2.z, isNaN1.w && isNaN2.w);
  `+Xt+`
  return result;
`,j3=$e({opSnippet:q3,packedOpSnippet:K3}),KC={kernelName:Fn,backendName:"webgl",kernelFunc:j3};function X3(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,keepDims:a}=r,i=n.shape.length,p=[],l=y.parseAxisParam(s,n.shape),u=l,c=N.getAxesPermutation(u,i),m=n;c!=null&&(m=Ve({inputs:{x:n},backend:t,attrs:{perm:c}}),u=N.getInnerMostAxes(u.length,i),p.push(m)),N.assertAxesAreInnerMostDims("prod",u,i);let d;if(t.shouldExecuteOnCPU([m])){let f=t.texData.get(m.dataId).values,{outVals:g,outShape:h,outDtype:x}=Ov(m.shape,m.dtype,f,u);d=t.makeTensorInfo(h,x,g)}else{let[f,g]=N.computeOutAndReduceShapes(m.shape,u),h=y.sizeFromShape(g),x=q({inputs:{x:m},backend:t,attrs:{shape:[-1,h]}}),b=ss(n.dtype),w=Qt(x,b,"prod",t);d=q({inputs:{x:w},backend:t,attrs:{shape:f}}),p.push(x),p.push(w)}if(a){p.push(d);let f=N.expandShapeToKeepDim(d.shape,l);d=q({inputs:{x:d},backend:t,attrs:{shape:f}})}return p.forEach(f=>t.disposeIntermediateTensorInfo(f)),d}var jC={kernelName:Xa,backendName:"webgl",kernelFunc:X3};function Q3(o){let{inputs:e,backend:t,attrs:r}=o,{paramsNestedSplits:n,paramsDenseValues:s,indices:a}=e,{outputRaggedRank:i}=r,p=n.map(x=>t.readSync(x.dataId)),l=n.map(x=>x.shape),u=t.readSync(s.dataId),c=t.readSync(a.dataId),[m,d,f]=Pv(p,l,u,s.shape,s.dtype,c,a.shape,i),g=m.map(x=>t.makeTensorInfo([x.length],"int32",x)),h=t.makeTensorInfo(f,s.dtype,d);return g.concat([h])}var XC={kernelName:Qa,backendName:"webgl",kernelFunc:Q3};function Y3(o){let{inputs:e,backend:t}=o,{starts:r,limits:n,deltas:s}=e,a=t.readSync(r.dataId),i=t.readSync(n.dataId),p=t.readSync(s.dataId),[l,u]=Vv(a,r.shape,r.dtype,i,n.shape,p,s.shape),c=t.makeTensorInfo([l.length],"int32",l),m=t.makeTensorInfo([u.length],r.dtype,u);return[c,m]}var QC={kernelName:Ya,backendName:"webgl",kernelFunc:Y3};function Z3(o){let{inputs:e,backend:t,attrs:r}=o,{shape:n,values:s,defaultValue:a,rowPartitionTensors:i}=e,{rowPartitionTypes:p}=r,l=t.readSync(n.dataId),u=t.readSync(s.dataId),c=t.readSync(a.dataId),m=i.map(h=>t.readSync(h.dataId)),d=i.map(h=>h.shape),[f,g]=Lv(l,n.shape,u,s.shape,s.dtype,c,a.shape,m,d,p);return t.makeTensorInfo(f,s.dtype,g)}var YC={kernelName:Za,backendName:"webgl",kernelFunc:Z3};var tg=o=>{let{backend:e,attrs:t}=o,{start:r,stop:n,step:s,dtype:a}=t,i=Mv(r,n,s,a);return e.makeTensorInfo([i.length],a,i)},ZC={kernelName:Ja,backendName:"webgl",kernelFunc:tg};var J3="return 1.0 / x;",eB=ne({opSnippet:J3}),JC={kernelName:Dn,backendName:"webgl",kernelFunc:eB};var tB=rt+`
  return (x < 0.0) ? 0.0 : x;
`,oB=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,rB=ne({opSnippet:tB,packedOpSnippet:oB}),eN={kernelName:Rn,backendName:"webgl",kernelFunc:rB};var nB=rt+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,sB=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,aB=ne({opSnippet:nB,packedOpSnippet:sB}),tN={kernelName:On,backendName:"webgl",kernelFunc:aB};var Bm=class{constructor(e,t,r,n,s){this.variableNames=["A"],this.outputShape=[];let[a,i,p,l]=e;this.outputShape=[a,t,r,l];let u=[n&&t>1?i-1:i,n&&r>1?p-1:p],c=[n&&t>1?t-1:t,n&&r>1?r-1:r],m;s?m="(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":m="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${u[0]/c[0]},
          ${u[1]/c[1]});
      const vec2 inputShapeRC = vec2(${i}.0, ${p}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${m};

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(max(sourceFracIndexRC, vec2(0.0)));
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `}};var zm=class{constructor(e,t,r,n,s){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[a,i,p,l]=e;this.outputShape=[a,t,r,l];let u=[n&&t>1?i-1:i,n&&r>1?p-1:p],c=[n&&t>1?t-1:t,n&&r>1?r-1:r],m;s?m="(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":m="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${u[0]/c[0]},
          ${u[1]/c[1]},
          ${u[1]/c[1]});
      const vec3 inputShapeRC = vec3(${i}.0, ${p}.0,
                                     ${p}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${m};

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(max(sourceFracIndexRC, vec3(0.0)));
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${l-1};
        bool hasNextRow = coords.z < ${r-1};

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `}};function iB(o){let{inputs:e,backend:t,attrs:r}=o,{images:n}=e,{alignCorners:s,halfPixelCenters:a,size:i}=r,[p,l]=i,u=F().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new zm(n.shape,p,l,s,a):new Bm(n.shape,p,l,s,a);return t.runWebGLProgram(u,[n],"float32")}var oN={kernelName:ri,backendName:"webgl",kernelFunc:iB};var Um=class{constructor(e,t,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,n,s]=t,[,a,i]=e,p=[r&&a>1?n-1:n,r&&i>1?s-1:s],l=[r&&a>1?a-1:a,r&&i>1?i-1:i],u=p[0]/l[0],c=p[1]/l[1],m=1/u,d=1/c,f=Math.ceil(m)*2+2,g=Math.ceil(d)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${c});

        const float invHeightScale = float(${m});
        const float invWidthScale = float(${d});

        const int winHeight = int(${f});
        const int winWidth = int(${g});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${a}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${i}) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), ${n-1}.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), ${s-1}.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};function pB(o){let{inputs:e,backend:t,attrs:r}=o,{images:n,dy:s}=e,{alignCorners:a}=r,i=new Um(s.shape,n.shape,a);return t.runWebGLProgram(i,[s],s.dtype)}var rN={kernelName:El,backendName:"webgl",kernelFunc:pB};var Wm=class{constructor(e,t,r,n,s){this.variableNames=["A"],this.outputShape=[];let[a,i,p,l]=e;this.outputShape=[a,t,r,l];let u=[n&&t>1?i-1:i,n&&r>1?p-1:p],c=[n&&t>1?t-1:t,n&&r>1?r-1:r],m=n?"0.5":"0.0",d;s?d="max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":d="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${u[0]/c[0]},
          ${u[1]/c[1]});
      const vec2 inputShapeRC = vec2(${i}.0, ${p}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${d};

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${m})));
        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `}};var Gm=class{constructor(e,t,r,n,s){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[a,i,p,l]=e;this.outputShape=[a,t,r,l];let u=[n&&t>1?i-1:i,n&&r>1?p-1:p],c=[n&&t>1?t-1:t,n&&r>1?r-1:r],m=n?"0.5":"0.0",d;s?d="max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":d="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${u[0]/c[0]},
          ${u[1]/c[1]},
          ${u[1]/c[1]});
      const vec3 inputShapeRC = vec3(${i}.0, ${p}.0,
                                     ${p}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${d};

        // Compute the coordinators of nearest neighbor point.
        ivec3 sourceNearestRC = ivec3(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${m})));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${l-1};
        bool hasNextRow = coords.z < ${r-1};

        vec4 newValue = vec4(
          getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d),
          hasNextCol ? getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d + 1) : 0.0);

        setOutput(newValue);
      }
    `}};function lB(o){let{inputs:e,backend:t,attrs:r}=o,{images:n}=e,{alignCorners:s,halfPixelCenters:a,size:i}=r,[p,l]=i,u=F().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new Gm(n.shape,p,l,s,a):new Wm(n.shape,p,l,s,a);return t.runWebGLProgram(u,[n],n.dtype)}var nN={kernelName:oi,backendName:"webgl",kernelFunc:lB};var Hm=class{constructor(e,t,r){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,n,s]=t,[,a,i]=e,p=[r&&a>1?n-1:n,r&&i>1?s-1:s],l=[r&&a>1?a-1:a,r&&i>1?i-1:i],u=p[0]/l[0],c=p[1]/l[1],m=1/u,d=1/c,f=Math.ceil(m)*2+2,g=Math.ceil(d)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${c});

        const float invHeightScale = float(${m});
        const float invWidthScale = float(${d});

        const int winHeight = int(${f});
        const int winWidth = int(${g});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${a}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${i}) {
              continue;
            }

            float sourceFracRow =
              float(${p[0]}) *
                (float(dyR) / float(${l[0]}));

            float sourceFracCol =
                float(${p[1]}) *
                  (float(dyC) / float(${l[1]}));

            int sourceNearestRow = int(min(
                float(int(${n}) - 1),
                ${r} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${s}) - 1),
                ${r} ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};function uB(o){let{inputs:e,backend:t,attrs:r}=o,{images:n,dy:s}=e,{alignCorners:a}=r,i=new Hm(s.shape,n.shape,a);return t.runWebGLProgram(i,[s],s.dtype)}var sN={kernelName:kl,backendName:"webgl",kernelFunc:uB};var qm=class{constructor(e,t){this.variableNames=["x"];let r=e.length;if(r>4)throw new Error(`WebGL backend: Reverse of rank-${r} tensor is not yet supported`);if(this.outputShape=e,r===1){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${e[0]} - coord - 1));
        }
      `;return}let n=i=>t.indexOf(i)!==-1&&e[i]!==1?`${e[i]} - coords[${i}] - 1`:`coords[${i}]`,s=e.map((i,p)=>n(p)).join(","),a=me(r);this.userCode=`
      void main() {
        ${a} coords = getOutputCoords();
        setOutput(getX(${s}));
      }
    `}};var Km=class{constructor(e,t){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;let r=e.length;if(r>4)throw new Error(`WebGL backend: Reverse of rank-${r} tensor is not yet supported`);this.outputShape=e;let n=je("rc",r),s=`${n[r-1]} + 1 < ${this.outputShape[r-1]}`,a=`${n[r-2]} + 1 < ${this.outputShape[r-2]}`,i=me(r);r===1?this.userCode=`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(${e[0]} - rc - 1),
            ${e[0]} - rc - 1);
          if(${s}){
              result.g = getChannel(getX(${e[0]} - (rc  + 1) - 1),
                ${e[0]} - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:this.userCode=`
        void main() {
          ${i} rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = ${p(n.slice())};
          if(${s}){
            result.g = ${l(n.slice())};
          }
          if(${a}) {
            result.b = ${u(n.slice())};
            if(${s}) {
              result.a = ${c(n.slice())};
            }
          }
          setOutput(result);
        }
    `;function p(f){return m(f)}function l(f){return f[r-1]="("+f[r-1]+" + 1)",m(f)}function u(f){return f[r-2]="("+f[r-2]+" + 1)",m(f)}function c(f){return f[r-1]="("+f[r-1]+" + 1)",f[r-2]="("+f[r-2]+" + 1)",m(f)}function m(f){let g=e.map((b,w)=>d(w,f)),h=g.join(","),x=g.slice(-2).join(",");return`getChannel(getX(${h}), vec2(${x}))`}function d(f,g){return t.indexOf(f)!==-1&&e[f]!==1?`${e[f]} - ${g[f]} - 1`:`${g[f]}`}}};function cB(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{dims:s}=r,a=n.shape.length,i=y.parseAxisParam(s,n.shape);if(a===0)return Xe({inputs:{x:n},backend:t});let p=F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Km(n.shape,i):new qm(n.shape,i);return t.runWebGLProgram(p,[n],n.dtype)}var aN={kernelName:ni,backendName:"webgl",kernelFunc:cB};var jm=class{constructor(e,t){this.variableNames=["Image"],this.outputShape=[],this.customUniforms=[{name:"params",type:"vec4"}];let r=e[1],n=e[2];this.outputShape=e;let s="";typeof t=="number"?s=`float outputValue = ${t.toFixed(2)};`:s=`
        vec3 fill = vec3(${t.join(",")});
        float outputValue = fill[coords[3]];`,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];
          int y = coords[1];
          float coordXFloat = (float(x) - params[0]) * params[3] -
            (float(y) - params[1]) * params[2];
          float coordYFloat = (float(x) - params[0]) * params[2] +
            (float(y) - params[1]) * params[3];
          int coordX = int(round(coordXFloat + params[0]));
          int coordY = int(round(coordYFloat + params[1]));
          ${s}
          if(coordX >= 0 && coordX < ${n} && coordY >= 0 && coordY < ${r}) {
            outputValue = getImage(coords[0], coordY, coordX, coords[3]);
          }
          setOutput(outputValue);
        }
    `}};var iN={kernelName:Ei,backendName:"webgl",kernelFunc:({inputs:o,attrs:e,backend:t})=>{let{image:r}=o,{radians:n,fillValue:s,center:a}=e,i=t,p=new jm(r.shape,s),[l,u]=N.getImageCenter(a,r.shape[1],r.shape[2]),c=[[l,u,Math.sin(n),Math.cos(n)]];return i.runWebGLProgram(p,[r],r.dtype,c)}};var mB=`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`,dB=ne({opSnippet:mB}),pN={kernelName:Pn,backendName:"webgl",kernelFunc:dB};var fB="return inversesqrt(x);",hB=ne({opSnippet:fB,cpuKernelImpl:Bv}),lN={kernelName:Vn,backendName:"webgl",kernelFunc:hB};var Br=class{constructor(e,t,r,n,s,a,i=!0,p=!1){this.variableNames=["updates","indices","defaultValue"],this.outputShape=a;let l=me(s.length),u=me(a.length),c="";r===1?c="i":r===2&&(c="i, j");let m=`getIndices(${c})`,d="";n===1?d="i":n===2&&(d="i, coords[1]");let f=`getUpdates(${d})`,g="";p&&(g="coords[0], coords[1]");let h=`getDefaultValue(${g})`,x=t>1?"strides[j]":"strides";this.userCode=`
        ${l} strides = ${l}(${s});

        void main() {
          ${u} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${e}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${t}; j++) {
              int index = round(${m});
              flattenedIndex += index * ${x};
            }
            if (flattenedIndex == coords[0]) {
              sum += ${f};
              found = true;
            }
          }
          setOutput(mix(${h}, sum, float(found)));
        }
      `}};var Xm=class{constructor(e,t,r,n,s,a,i=!0,p=!1){this.variableNames=["updates","indices","defaultValue"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=a;let l=me(s.length),u=me(a.length),c="";r===1?c="i":r===2&&(c="i, j");let m=`getIndices(${c})`,d="";n===1?d="i":n===2&&(d="i, coords[1]");let f=`getUpdates(${d})`,g="";p&&(g="coords[0], coords[1]");let h=`getDefaultValue(${g})`,x=t>1?"strides[j]":"strides",b=t>1?"strides[j + 1]":"strides";this.userCode=`
        ${l} strides = ${l}(${s});

        void main() {
          ${u} coords = getOutputCoords();
          vec4 sum = vec4(0.);
          vec4 found = vec4(0.);
          for (int i = 0; i < ${e}; i+=2) {
            ivec2 flattenedIndex = ivec2(0);
            for (int j = 0; j < ${t}; j+=2) {
              ivec4 index = round(${m});
              flattenedIndex += index.xz * ${x};
              if (j + 1 < ${t}) {
                flattenedIndex += index.yw * ${b};
              }
            }
            if (flattenedIndex[0] == coords[0] || flattenedIndex[1] == coords[0] ||
                flattenedIndex[0] == coords[0] + 1 || flattenedIndex[1] == coords[0] + 1) {
              vec4 updVals = ${f};
              if (flattenedIndex[0] == coords[0]) {
                sum.xy += updVals.xy;
                found.xy = vec2(1.);
              } else if (flattenedIndex[0] == coords[0] + 1) {
                sum.zw += updVals.xy;
                found.zw = vec2(1.);
              }
              if (flattenedIndex[1] == coords[0]) {
                sum.xy += updVals.zw;
                found.xy = vec2(1.);
              } else if (flattenedIndex[1] == coords[0] + 1) {
                sum.zw += updVals.zw;
                found.zw = vec2(1.);
              }
            }
          }
          setOutput(mix(${h}, sum, found));
        }
      `}};function gB(o){let{inputs:e,backend:t,attrs:r}=o,{indices:n,updates:s}=e,{shape:a}=r,{sliceRank:i,numUpdates:p,sliceSize:l,strides:u,outputSize:c}=N.calculateShapes(s,n,a),m=[c/l,l];if(c===0)return t.makeTensorInfo(a,n.dtype);let d=q({inputs:{x:n},backend:t,attrs:{shape:[p,i]}}),f=q({inputs:{x:s},backend:t,attrs:{shape:[p,l]}}),g=t.makeTensorInfo([],"float32",new Float32Array([0])),h;F().getBool("WEBGL_PACK")?h=new Xm(p,i,d.shape.length,f.shape.length,u,m):h=new Br(p,i,d.shape.length,f.shape.length,u,m);let x=t.runWebGLProgram(h,[f,d,g],f.dtype),b=q({inputs:{x},backend:t,attrs:{shape:a}});return t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(x),t.disposeIntermediateTensorInfo(g),b}var uN={kernelName:si,backendName:"webgl",kernelFunc:gB};var Qm=class{constructor(e,t,r,n){this.variableNames=["sortedSequence","values"],this.customUniforms=[{name:"numInputs",type:"int"}],this.outputShape=[e,r];let s="while (left < right) {",a=`for (int i = 0; i < ${Math.ceil(Math.log2(t+1))}; ++i) { if (left >= right) break;`,i=F().getNumber("WEBGL_VERSION")===2?s:a,p=n==="left"?"<":"<=";this.userCode=`
       int findBound(int batch, float value) {
         int left = 0;
         int right = numInputs;
         int mid;
         ${i}
           mid = (left + right) / 2;
           if (getSortedSequence(batch, mid) ${p} value) {
             left = mid + 1;
           } else {
             right = mid;
           }
         }
         return right;
       }

       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int valueIndex = coords[1];

         float value = getValues(batch, valueIndex);

         setOutput(float(findBound(batch, value)));
       }
     `}};function xB(o){let{inputs:e,backend:t,attrs:r}=o,{sortedSequence:n,values:s}=e,{side:a}=r,i=new Qm(n.shape[0],n.shape[1],s.shape[1],a),p=[[n.shape[1]]];return t.runWebGLProgram(i,[n,s],"int32",p)}var cN={kernelName:ii,backendName:"webgl",kernelFunc:xB};var Ym=class{constructor(e,t,r){this.variableNames=["c","a","b"],this.outputShape=t;let n,s;if(r>4)throw Error(`Where for rank ${r} is not yet supported`);if(r===1)s="resRC",n="resRC";else{let i=["resRC.x","resRC.y","resRC.z","resRC.w"],p=[],l=[];for(let u=0;u<t.length;u++)l.push(`${i[u]}`),u<e&&p.push(`${i[u]}`);n=p.join(),s=l.join()}let a=me(r);this.userCode=`
      void main() {
        ${a} resRC = getOutputCoords();
        float cVal = getC(${n});
        if (cVal >= 1.0) {
          setOutput(getA(${s}));
        } else {
          setOutput(getB(${s}));
        }
      }
    `}};function yB(o){let{inputs:e,backend:t}=o,{condition:r,t:n,e:s}=e,a=new Ym(r.shape.length,n.shape,n.shape.length);return t.runWebGLProgram(a,[r,n,s],et(n.dtype,s.dtype))}var mN={kernelName:pi,backendName:"webgl",kernelFunc:yB};var bB=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${N.SELU_SCALEALPHA};
  float scale = ${N.SELU_SCALE};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,_B=ne({opSnippet:bB}),dN={kernelName:Ln,backendName:"webgl",kernelFunc:_B};var TB=go+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,vB=`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,wB=ne({opSnippet:TB,packedOpSnippet:vB,cpuKernelImpl:Uv}),fN={kernelName:Un,backendName:"webgl",kernelFunc:wB};var CB=`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`,NB=ne({opSnippet:CB}),hN={kernelName:zn,backendName:"webgl",kernelFunc:NB};var SB=go+`
  return sin(x);
`,IB=`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${Xt}
  return result;
`,kB=ne({opSnippet:SB,packedOpSnippet:IB}),gN={kernelName:Mn,backendName:"webgl",kernelFunc:kB};var EB=`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`,$B=ne({opSnippet:EB}),xN={kernelName:Bn,backendName:"webgl",kernelFunc:$B};var AB=`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`,FB=ne({opSnippet:AB}),yN={kernelName:Wn,backendName:"webgl",kernelFunc:FB};var DB=o=>{let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{blockShape:s,paddings:a}=r;y.assert(n.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");let i=s.reduce((x,b)=>x*b),p=[[0,0]];p.push(...a);for(let x=1+s.length;x<n.shape.length;++x)p.push([0,0]);let l=[],u=eg({inputs:{x:n},backend:t,attrs:{paddings:p,constantValue:0}}),c=N.getReshaped(u.shape,s,i,!1),m=N.getPermuted(c.length,s.length,!1),d=N.getReshapedPermuted(u.shape,s,i,!1),f=q({inputs:{x:u},backend:t,attrs:{shape:c}}),g=Ve({inputs:{x:f},backend:t,attrs:{perm:m}}),h=q({inputs:{x:g},backend:t,attrs:{shape:d}});return l.push(u),l.push(f),l.push(g),l.forEach(x=>t.disposeIntermediateTensorInfo(x)),h},bN={kernelName:ci,backendName:"webgl",kernelFunc:DB};function RB(o){let{inputs:e,backend:t}=o,{indices:r,values:n,denseShape:s,defaultValue:a}=e;if(s.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
         ${s.shape}`);if(r.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
         ${r.shape}`);if(n.shape.length!==1)throw new Error(`Values must be a vector, saw:
         ${n.shape}`);if(a.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${a.shape}`);let i=t.readSync(r.dataId),p=t.readSync(n.dataId),l=t.readSync(s.dataId),u=t.readSync(a.dataId)[0],[c,m,d,f,g]=Gv(i,r.shape,r.dtype,p,n.dtype,l,u);return[t.makeTensorInfo(m,r.dtype,c),t.makeTensorInfo([m[0]],n.dtype,d),t.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(h=>Number(h)))),t.makeTensorInfo([g.length],r.dtype,new Int32Array(g))]}var _N={kernelName:fi,backendName:"webgl",kernelFunc:RB};function OB(o){let{inputs:e,backend:t}=o,{inputIndices:r,inputShape:n,newShape:s}=e;if(r.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape ${r.shape}`);if(n.shape.length!==1)throw new Error(`Input shape should be a vector but received shape ${n.shape}`);if(s.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${s.shape}`);let a=Array.from(t.readSync(n.dataId)),i=t.readSync(r.dataId),p=Array.from(t.readSync(s.dataId)),[l,u,c]=Hv(i,r.shape,r.dtype,a,p);return[t.makeTensorInfo(u,r.dtype,l),t.makeTensorInfo([c.length],s.dtype,new Int32Array(c))]}var TN={kernelName:hi,backendName:"webgl",kernelFunc:OB};function PB(o){let{inputs:e,backend:t}=o,{data:r,indices:n,segmentIds:s}=e;if(r.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
              ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
              ${s.shape}`);let a=t.readSync(r.dataId),i=t.readSync(n.dataId),p=t.readSync(s.dataId),[l,u]=Fc(a,r.shape,r.dtype,i,p,!0);return t.makeTensorInfo(u,r.dtype,l)}var vN={kernelName:gi,backendName:"webgl",kernelFunc:PB};function VB(o){let{inputs:e,backend:t}=o,{data:r,indices:n,segmentIds:s}=e;if(r.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
             ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
             ${s.shape}`);let a=t.readSync(r.dataId),i=t.readSync(n.dataId),p=t.readSync(s.dataId),[l,u]=Fc(a,r.shape,r.dtype,i,p);return t.makeTensorInfo(u,r.dtype,l)}var wN={kernelName:xi,backendName:"webgl",kernelFunc:VB};function LB(o){let{inputs:e,backend:t,attrs:r}=o,{sparseIndices:n,sparseValues:s,defaultValue:a}=e,{outputShape:i}=r,{sliceRank:p,numUpdates:l,sliceSize:u,strides:c,outputSize:m}=N.calculateShapes(s,n,i),d=!1;if(s.dtype==="string"){let x=t.bufferSync(n),b=t.bufferSync(s),w=y.decodeString(t.readSync(a.dataId)[0]),v=zv(x,b,i,m,u,l,p,c,w,d);return t.makeTensorInfo(i,v.dtype,v.values)}let f=new Br(l,p,n.shape.length,s.shape.length,c,[m,1],d),g=t.runWebGLProgram(f,[s,n,a],s.dtype),h=q({inputs:{x:g},backend:t,attrs:{shape:i}});return t.disposeIntermediateTensorInfo(g),h}var CN={kernelName:yi,backendName:"webgl",kernelFunc:LB};function MB(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{numOrSizeSplits:s,axis:a}=r,i=y.parseAxisParam(a,n.shape)[0],p=N.prepareSplitSize(n,s,i),l=n.shape.length,u=new Array(l).fill(0),c=n.shape.slice();return p.map(m=>{let d=[...c];d[i]=m;let f=No({inputs:{x:n},backend:t,attrs:{begin:u,size:d}});return u[i]+=m,f})}var NN={kernelName:mi,backendName:"webgl",kernelFunc:MB};var SN="return sqrt(x);",BB=ne({opSnippet:SN,packedOpSnippet:SN,cpuKernelImpl:qv}),IN={kernelName:Gn,backendName:"webgl",kernelFunc:BB};var zB="return x * x;",UB=ne({opSnippet:zB}),kN={kernelName:$l,backendName:"webgl",kernelFunc:UB};var EN="return (a - b) * (a - b);",WB=$e({opSnippet:EN,packedOpSnippet:EN}),$N={kernelName:Hn,backendName:"webgl",kernelFunc:WB};function GB(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e;if(n.dtype!=="string")throw new Error("Input must be of datatype string");let s=t.readSync(n.dataId),a=N.fromUint8ToStringArray(s),i=Kv(a,"string",r);return t.makeTensorInfo(n.shape,"string",i)}var AN={kernelName:qn,backendName:"webgl",kernelFunc:GB};function HB({inputs:o,attrs:e,backend:t}){let{x:r}=o,n=rt+`
    return x > 0.0 ? 1.0 : float(${e.alpha});
  `,s=new ft(r.shape,n);return t.runWebGLProgram(s,[r],r.dtype)}var FN={kernelName:Qn,backendName:"webgl",kernelFunc:HB};var Zm=class{constructor(e,t,r){this.variableNames=["x"],this.outputShape=r;let n=r.length,s=me(r.length),a=me(r.length),i="";if(n===1)i="coords * strides + begin";else{let p=0;i=r.map((l,u)=>(p++,r.length===1?`coords * strides[${u}] + begin[${u}]`:`coords[${p-1}] * strides[${u}] + begin[${u}]`)).join(",")}this.userCode=`
      ${s} begin = ${s}(${e});
      ${s} strides = ${s}(${t});

      void main() {
        ${a} coords = getOutputCoords();
        setOutput(getX(${i}));
      }
    `}};function qB(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{begin:s,end:a,strides:i,beginMask:p,endMask:l,ellipsisMask:u,newAxisMask:c,shrinkAxisMask:m}=r,{finalShapeSparse:d,finalShape:f,isIdentity:g,sliceDim0:h,isSimpleSlice:x,begin:b,end:w,strides:v}=it.sliceInfo(n.shape,s,a,i,p,l,u,c,m),k;if(g)k=q({inputs:{x:n},backend:t,attrs:{shape:f}});else if(h||x){y.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let $=it.computeOutShape(b,w,v),A=No({inputs:{x:n},backend:t,attrs:{begin:b,size:$}});k=q({inputs:{x:A},backend:t,attrs:{shape:f}}),t.disposeIntermediateTensorInfo(A)}else if(t.shouldExecuteOnCPU([n])){let A=t.readSync(n.dataId),D=oe(n.shape,n.dtype,A),R=jv(d,D,v,b);k=t.makeTensorInfo(f,n.dtype,R.values)}else{let A=new Zm(b,v,d);k=t.runWebGLProgram(A,[n],n.dtype)}let E=q({inputs:{x:k},backend:t,attrs:{shape:f}});return t.disposeIntermediateTensorInfo(k),E}var DN={kernelName:bi,backendName:"webgl",kernelFunc:qB};function KB(o){let{inputs:e,backend:t,attrs:r}=o,{separator:n,nGramWidths:s,leftPad:a,rightPad:i,padWidth:p,preserveShortSequences:l}=r,{data:u,dataSplits:c}=e,m=t.readSync(u.dataId),d=t.readSync(c.dataId),[f,g]=Xv(m,d,n,s,a,i,p,l);return[t.makeTensorInfo([f.length],"string",f),t.makeTensorInfo(c.shape,"int32",g)]}var RN={kernelName:_i,backendName:"webgl",kernelFunc:KB};function jB(o){let{inputs:e,backend:t,attrs:r}=o,{skipEmpty:n}=r,{input:s,delimiter:a}=e;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(s.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${s.shape}`);if(a.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${a.shape}`);let i=t.readSync(s.dataId),p=t.readSync(a.dataId)[0],[l,u,c]=Qv(i,p,n),m=u.length;return[t.makeTensorInfo([m,2],"int32",l),t.makeTensorInfo([m],"string",u),t.makeTensorInfo([2],"int32",new Int32Array(c))]}var ON={kernelName:Ti,backendName:"webgl",kernelFunc:jB};function XB(o){let{inputs:e,backend:t,attrs:r}=o,{numBuckets:n}=r,{input:s}=e;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(n<=0)throw new Error("Number of buckets must be at least 1");let a=t.readSync(s.dataId),i=Yv(a,n);return t.makeTensorInfo(s.shape,"int32",i)}var PN={kernelName:vi,backendName:"webgl",kernelFunc:XB};var QB="return tan(x);",YB=ne({opSnippet:QB}),VN={kernelName:jn,backendName:"webgl",kernelFunc:YB};var ZB=`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`,JB=ne({opSnippet:ZB}),LN={kernelName:Xn,backendName:"webgl",kernelFunc:JB};function ez(o){let{inputs:e,backend:t,attrs:r}=o,{tensor:n,indices:s,updates:a}=e,{}=r,{sliceRank:i,numUpdates:p,sliceSize:l,strides:u,outputSize:c}=N.calculateShapes(a,s,n.shape),m=[c/l,l];if(c===0)return t.makeTensorInfo(n.shape,s.dtype);let d=q({inputs:{x:s},backend:t,attrs:{shape:[p,i]}}),f=q({inputs:{x:a},backend:t,attrs:{shape:[p,l]}}),g=q({inputs:{x:n},backend:t,attrs:{shape:m}}),h=new Br(p,i,d.shape.length,f.shape.length,u,m,!1,!0),x=t.runWebGLProgram(h,[f,d,g],g.dtype),b=q({inputs:{x},backend:t,attrs:{shape:n.shape}});return t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(x),b}var MN={kernelName:ai,backendName:"webgl",kernelFunc:ez};var Jm=class{constructor(e,t){this.variableNames=["A"];let r=new Array(e.length);for(let a=0;a<r.length;a++)r[a]=e[a]*t[a];this.outputShape=r,this.rank=r.length;let n=me(this.rank),s=tz(e);this.userCode=`
      void main() {
        ${n} resRC = getOutputCoords();
        setOutput(getA(${s}));
      }
    `}};function tz(o){let e=o.length;if(e>5)throw Error(`Tile for rank ${e} is not yet supported`);if(e===1)return`imod(resRC, ${o[0]})`;let t=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],r=[];for(let n=0;n<o.length;n++)r.push(`imod(${t[n]}, ${o[n]})`);return r.join()}function og(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{reps:s}=r;if(n.dtype==="string"||n.shape.length>5){let p=t.readSync(n.dataId),l=n.dtype==="string"?p.map(m=>y.decodeString(m)):p,u=oe(n.shape,n.dtype,l),c=Jv(u,s);return t.makeTensorInfo(c.shape,c.dtype,c.values)}let a=new Jm(n.shape,s);return t.runWebGLProgram(a,[n],n.dtype)}var BN={kernelName:br,backendName:"webgl",kernelFunc:og};var ed=class{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"negativeInf",type:"float"},{name:"dir",type:"int"},{name:"inc",type:"int"}],this.outputShape=e,this.userCode=`
       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // We compare elements pair-wise within a group of size 2 * inc.
         // The comparing rule for each group alternates between ascending
         // and descending. Within each group, we compare each pair at
         // positions i and i+inc. To decide whether an element at position i
         // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
         // inc, it is in the first half of the group, we denote it as x0,
         // otherwise we denote it as x1.
         // For example, as shown in the Bitonic top K paper referenced above,
         // Figure5(a) shows that element[1] is in the
         // second half of the group when group size is 2, but it is in the
         // first half of the group when group size is 4.

         bool isFirstInPair = imod(elemIdx, 2 * inc) < inc;
         int i = isFirstInPair ? elemIdx : elemIdx - inc;

         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + inc : int(getIndices(batch, i + inc));
         float x0 = i0 < n ? getX(batch, i0) : negativeInf;
         float x1 = i1 < n ? getX(batch, i1) : negativeInf;

         // Denotes which direction indices are in (ascending or descending).
         bool reverse = imod(elemIdx, 2 * dir) >= dir;
         bool isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
         if (reverse == isGreater) { // Elements in opposite order of direction
           int iTemp = i0;
           i0 = i1;
           i1 = iTemp;
         }
         if (isFirstInPair) {
            setOutput(float(i0));
         } else {
            setOutput(float(i1));
         }
       }
     `}},td=class{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"k",type:"int"}],this.outputShape=e,this.userCode=`
    void main() {
         // Takes max of indices (0, k), (1, k + 1), (2, k + 2) ...
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // The output size is half of the previous size.
         // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _ (k=4),
         // we only need to output the indices at positions |, the indices at
         // positions _ can be thrown away, see Figure5(b) After Phase 2
         // (Merge phase) in the Bitonic Top K paper referenced above.
         // For example, the paper shows we only need to output the orange bars.
         // The output sequence should look like this | | | | | | | |.
         // Because the sequence is halved, to map the output index back
         // to the previous sequence to find the corresponding value,
         // we need to double the index. When we double the index,
         // we basically interpolate a position, so 2i looks like
         // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k position
         // of each 2k positions by - elemIdx % k. E.g. for output at
         // index 4,5,6,7, we want to get the corresponding element at
         // original index 8,9,10,11, for output at index 8,9,10,11,
         // we want to get the corresponding element at original index
         // 16,17,18,19, so on and so forth.

         int i = elemIdx < k ? elemIdx : (elemIdx * 2 - imod(elemIdx, k));
         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + k : int(getIndices(batch, i + k));

         float x0 = getX(batch, i0);
         float x1 = i1 < n ? getX(batch, i1) : x0;

         setOutput(x0 >= x1 ? float(i0) : float(i1));
       }
     `}};function Os(o,e){e!==null&&o.disposeIntermediateTensorInfo(e)}function zN(o){let e=1;for(;e<o;)e*=2;return e}function oz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{k:s,sorted:a}=r,i=F().getNumber("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD"),p=F().getNumber("TOPK_K_CPU_HANDOFF_THRESHOLD"),l=n.shape,u=l[l.length-1];if(t.shouldExecuteOnCPU([n])||u<i||s>p){let R=t.readSync(n.dataId),[P,V]=e0(R,l,n.dtype,s,a);return[t.makeTensorInfo(P.shape,P.dtype,P.values),t.makeTensorInfo(V.shape,V.dtype,V.values)]}if(s===0)return l[l.length-1]=0,[t.makeTensorInfo(l,n.dtype,[]),t.makeTensorInfo(l,"int32",[])];if(u===1)return[n,lr({attrs:{shape:l,dtype:"int32",value:0},backend:t})];let c=t.texData.get(n.dataId),m=c!==null&&c.isPacked,d=m?t.unpackTensor(n):n,g=y.sizeFromShape(l)/u,h=q({inputs:{x:d},attrs:{shape:[g,u]},backend:t});m&&Os(t,d);let x=zN(s),b=zN(u),w=null,v=()=>w===null?[h,h]:[h,w],k=(R,P,V)=>{let L=v(),B=new ed(V),W=[[u],[w===null?1:0],[Number.NEGATIVE_INFINITY],[R],[P]],G=w;w=t.runWebGLProgram(B,L,"int32",W),Os(t,G)};for(let R=1;R<x;R*=2){let P=R*2;for(let V=R;V>=1;V/=2)k(P,V,[g,b])}for(let R=b;R>x;R/=2){let P=v(),V=new td([g,R/2]),B=[[u],[w===null?1:0],[x]],M=w;w=t.runWebGLProgram(V,P,"int32",B),Os(t,M);let W=x/2,G=W*2;for(let z=W;z>=1;z/=2)k(G,z,w.shape)}let E=w;w=No({inputs:{x:w},backend:t,attrs:{begin:0,size:[g,s]}}),Os(t,E);let $=Xh({inputs:{x:h,indices:w},backend:t,attrs:{axis:1,batchDims:1}});Os(t,h);let A=l.slice(0,-1);A.push(s),E=w,w=q({inputs:{x:w},attrs:{shape:A},backend:t}),Os(t,E);let D=$;return $=q({inputs:{x:$},attrs:{shape:A},backend:t}),Os(t,D),[$,w]}var UN={kernelName:wi,backendName:"webgl",kernelFunc:oz};var od=class{constructor(e,t,r,n,s,a){this.variableNames=["Image","Transforms"],this.outputShape=a;let i=r==="nearest"?1:2,p;switch(n){case"constant":p=1;break;case"reflect":p=2;break;case"wrap":p=3;break;case"nearest":p=4;break;default:p=1;break}this.userCode=`
            float mapCoord(float outCoord, float len) {
              float inCoord = outCoord;
              if(${p} == 2) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    if (inCoord < sz2) {
                      inCoord = sz2 * float(int(float(-inCoord / sz2))) +
                      inCoord;
                    }
                    inCoord = inCoord < -len ? inCoord + sz2 : -inCoord - 1.0;
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    inCoord -= sz2 * float(int(float(inCoord / sz2)));
                    if (inCoord >= len) {
                      inCoord = sz2 - inCoord - 1.0;
                    }
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${p} == 3) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord += len * (float(int(float(-inCoord / sz))) + 1.0);
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord -= len * float(int(float(inCoord / sz)));
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${p} == 4) {
                return clamp(outCoord, 0.0, len - 1.0);
              } else {
                return outCoord;
              }
            }

            float readWithFillValue(int batch, int coordY, int coordX,
              int channel) {
              float outputValue;
              if (0 <= coordY && coordY < ${e} && 0 <= coordX && coordX < ${t}) {
                  outputValue = getImage(batch, coordY, coordX, channel);
              } else {
                outputValue = float(${s});
              }
              return outputValue;
            }

            void main() {
              ivec4 coords = getOutputCoords();
              float outputValue;
              int batch = coords[0];
              int x = coords[2];
              int y = coords[1];
              int channel = coords[3];
              float xf = float(x);
              float yf = float(y);
              float a1 = getTransforms(batch, 0);
              float a2 = getTransforms(batch, 1);
              float a3 = getTransforms(batch, 2);
              float b1 = getTransforms(batch, 3);
              float b2 = getTransforms(batch, 4);
              float b3 = getTransforms(batch, 5);
              float c1 = getTransforms(batch, 6);
              float c2 = getTransforms(batch, 7);
              float projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = float(${s});
              } else {
                float inX = (a1 * xf + a2 * yf + a3) / projection;
                float inY = (b1 * xf + b2 * yf + b3) / projection;
                float mapX = mapCoord(inX, float(${t}));
                float mapY = mapCoord(inY, float(${e}));

                if (${i} == 1) {
                  int coordY = int(round(mapY));
                  int coordX = int(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  float yFloor = floor(mapY);
                  float xFloor = floor(mapX);
                  float yCeil = yFloor + 1.0;
                  float xCeil = xFloor + 1.0;
                  float valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, int(yFloor), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yFloor), int(xCeil), channel);
                  float valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, int(yCeil), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yCeil), int(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutput(outputValue);
            }
        `}};function rz(o){let{inputs:e,backend:t,attrs:r}=o,{image:n,transforms:s}=e,{interpolation:a,fillMode:i,fillValue:p,outputShape:l}=r,[u,c,m,d]=n.shape,[f,g]=l??[c,m],h=[u,f,g,d],x=new od(c,m,a,i,p,h);return t.runWebGLProgram(x,[n,s],"float32")}var WN={kernelName:Ci,backendName:"webgl",kernelFunc:rz};function nz(o){let{inputs:e,attrs:t,backend:r}=o,{axis:n}=t,{x:s}=e;Uo(s,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");let a=r.readSync(s.dataId),{outputValues:i,outputShape:p,indices:l}=t0(a,n,s.shape,s.dtype);return[r.makeTensorInfo(p,s.dtype,i),r.makeTensorInfo([l.length],"int32",l)]}var GN={kernelName:Ni,backendName:"webgl",kernelFunc:nz};function sz(o){let{inputs:e,backend:t,attrs:r}=o,{value:n}=e,{axis:s}=r;s<0&&(s+=n.shape.length);let a=n,i=a.shape.length,p=n.shape[s],l=new Array(i-1),u=0;for(let g=0;g<i;g++)g!==s&&(l[u++]=a.shape[g]);let c=[],m=new Array(i).fill(0),d=a.shape.slice();d[s]=1;let f=new Array(p);for(let g=0;g<f.length;g++){m[s]=g;let h=No({inputs:{x:a},backend:t,attrs:{begin:m,size:d}}),x=q({inputs:{x:h},backend:t,attrs:{shape:l}});f[g]=x,c.push(h)}return c.forEach(g=>t.disposeIntermediateTensorInfo(g)),f}var HN={kernelName:Si,backendName:"webgl",kernelFunc:sz};var rd=class{constructor(e,t){this.variableNames=["x","segmentIds"];let r=e.windowSize,n=e.batchSize,s=e.inSize,a=e.numSegments,i=a*Math.ceil(s/r);this.outputShape=[n,i];let p="0.0",l="sumValue",u=Math.floor(r/4)*4,c=r%4,m=`
        sumValue += dot(values, segFilter);
    `,d="";s%r>0&&(d=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return initializationValue;
        }
      `);let f="";s%r>0&&(f=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = ${p};

      float getValue(int batch, int inIdx) {
        ${d}
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        ${f}
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          ${a})) * float(${r}));
        int currentSeg = int(mod(float(outIdx), float(${a})));

        float sumValue = 0.0;

        for (int i = 0; i < ${u}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          ${m}
        }

        int inIdx = inOffset + ${u};
        if (${c===1}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          ${m}
        } else if (${c===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          ${m}
        } else if (${c===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          ${m}
        }
        setOutput(${l});
      }
    `}};function az(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,segmentIds:s}=e,{numSegments:a}=r,i=n.shape.length,p=[],l=0,u=N.getAxesPermutation([l],i),c=n;u!=null&&(c=Ve({inputs:{x:n},backend:t,attrs:{perm:u}}),p.push(c),l=N.getInnerMostAxes(1,i)[0]);let m=N.segment_util.computeOutShape(c.shape,l,a),d=y.sizeFromShape([c.shape[l]]),f=q({inputs:{x:c},backend:t,attrs:{shape:[-1,d]}});p.push(f);let g=ss(n.dtype),h=(v,k,E,$,A)=>{let D=v.shape[0],R=v.shape[1],P=N.segment_util.segOpComputeOptimalWindowSize(R,A),V={windowSize:P,inSize:R,batchSize:D,numSegments:A},L=new rd(V,k),B=t.compileAndRun(L,[v,E],$);if(p.push(B),B.shape[1]===A)return B;let M=tg({backend:t,attrs:{start:0,stop:A,step:1,dtype:"float32"}}),W=og({inputs:{x:M},backend:t,attrs:{reps:[R/P]}});return p.push(M),p.push(W),h(B,k,W,$,A)},x=h(f,"unsortedSegmentSum",s,g,a),b=q({inputs:{x},backend:t,attrs:{shape:m}}),w=b;if(u!=null){p.push(b);let v=N.getUndoAxesPermutation(u);w=Ve({inputs:{x:w},backend:t,attrs:{perm:v}})}return p.forEach(v=>t.disposeIntermediateTensorInfo(v)),w}var qN={kernelName:Ii,backendName:"webgl",kernelFunc:az};var iz=[k0,$0,A0,F0,R0,O0,P0,V0,B0,z0,U0,W0,G0,H0,q0,K0,j0,X0,Q0,Y0,Z0,ew,tw,ow,rw,iw,lw,uw,y0,mw,fw,hw,gw,xw,yw,bw,_w,Tw,vw,ww,Sw,Iw,kw,Ew,$w,Aw,Fw,Dw,Rw,Ow,Pw,Vw,Lw,Mw,Bw,zw,Ww,Gw,Hw,qw,jw,Xw,Qw,Yw,Zw,Jw,eC,tC,oC,x0,rC,dw,nC,sC,aC,b0,iC,pC,lC,uC,cC,mC,dC,fC,hC,gC,yC,bC,_C,TC,vC,wC,NC,IC,kC,EC,$C,AC,PC,v0,VC,LC,MC,BC,nw,zC,GC,HC,qC,KC,_0,jC,XC,QC,YC,ZC,sw,FC,JC,eN,tN,C0,oN,rN,nN,sN,aN,iN,pN,lN,uN,cN,mN,dN,fN,hN,gN,xN,J0,OC,yN,bN,_N,TN,vN,wN,CN,NN,IN,kN,$N,AN,FN,DN,RN,ON,PN,RC,S0,VN,LN,MN,BN,UN,WN,I0,GN,HN,qN,UC];for(let o of iz)Fl(o);var pz=bt.whereImpl,pl=class o extends jo{nextDataId(){return o.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new Gr(this,po())}write(e,t,r){this.firstUse&&(this.firstUse=!1,F().get("IS_NODE")&&N.warn(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));let n={id:this.nextDataId()};return this.data.set(n,{values:e,dtype:r,refCount:1}),n}makeTensorInfo(e,t,r){let n;if(t==="string"&&r!=null&&r.length>0&&y.isString(r[0])){let s=r.map(a=>y.encodeString(a));n=this.write(s,e,t)}else n=this.write(r,e,t);return{dataId:n,shape:e,dtype:t}}refCount(e){return this.data.has(e)?this.data.get(e).refCount:0}incRef(e){let t=this.data.get(e);t.refCount++}decRef(e){if(this.data.has(e)){let t=this.data.get(e);t.refCount--}}move(e,t,r,n,s){this.data.set(e,{values:t,dtype:n,refCount:s})}numDataIds(){return this.data.numDataIds()}async read(e){return this.readSync(e)}readSync(e){let{dtype:t,complexTensorInfos:r}=this.data.get(e);if(t==="complex64"){let n=this.readSync(r.real.dataId),s=this.readSync(r.imag.dataId);return N.mergeRealAndImagArrays(n,s)}return y.convertBackendValuesAndArrayBuffer(this.data.get(e).values,t)}bufferSync(e){let t=this.readSync(e.dataId);if(e.dtype==="string")try{let r=t.map(n=>y.decodeString(n));return oe(e.shape,e.dtype,r)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return oe(e.shape,e.dtype,t)}makeOutput(e,t,r){return po().makeTensorFromTensorInfo(this.makeTensorInfo(t,r,e),this)}disposeData(e,t=!1){if(this.data.has(e)){if(this.data.get(e).refCount--,!t&&this.data.get(e).refCount>0)return!1;let{complexTensorInfos:r}=this.data.get(e);r!=null&&(this.disposeData(r.real.dataId,!0),this.disposeData(r.imag.dataId,!0)),this.data.delete(e)}return!0}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}async time(e){let t=y.now();return e(),{kernelMs:y.now()-t}}memory(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}}where(e){U([e],"where");let t=this.readSync(e.dataId);return pz(e.shape,t)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}};pl.nextDataId=0;Wl("cpu",()=>new pl,1);var rg=ie(pn,o=>o>=0?o:Math.exp(o)-1),KN={kernelName:pn,backendName:"cpu",kernelFunc:rg};function ng(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{alpha:s}=r;U([n],"leakyRelu");let a=y.sizeFromShape(n.shape),i=t.data.get(n.dataId).values,p=y.getTypedArrayFromDType("float32",a);for(let l=0;l<i.length;l++)p[l]=i[l]<0?s*i[l]:i[l];return t.makeTensorInfo(n.shape,"float32",p)}var jN={kernelName:Ea,backendName:"cpu",kernelFunc:ng};var lz=xe((o,e)=>o<0?e*o:o);function sg(o){let{inputs:e,backend:t}=o,{x:r,alpha:n}=e;U([r,n],"prelu");let s=t.data.get(r.dataId).values,a=t.data.get(n.dataId).values,[i,p]=lz(r.shape,n.shape,s,a,"float32");return t.makeTensorInfo(p,"float32",i)}var XN={kernelName:ja,backendName:"cpu",kernelFunc:sg};var ag=ie(Rn,o=>Math.max(0,o)),QN={kernelName:Rn,backendName:"cpu",kernelFunc:ag};var ig=ie(On,o=>Math.min(Math.max(0,o),6)),YN={kernelName:On,backendName:"cpu",kernelFunc:ig};function Ps(o,e,t,r,n){if(t==="linear")return Tt({inputs:{x:e},backend:o});if(t==="relu")return ag({inputs:{x:e},backend:o});if(t==="elu")return rg({inputs:{x:e},backend:o});if(t==="relu6")return ig({inputs:{x:e},backend:o});if(t==="prelu")return sg({inputs:{x:e,alpha:r},backend:o});if(t==="leakyrelu")return ng({inputs:{x:e},backend:o,attrs:{alpha:n}});if(t==="sigmoid")return kh({inputs:{x:e},backend:o});throw new Error(`Activation ${t} has not been implemented for the CPU backend.`)}function ye(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{shape:s}=r,a=y.sizeFromShape(n.shape),i=y.inferFromImplicitShape(s,a),p=y.sizeFromShape(i);y.assert(a===p,()=>`The new shape (${i}) has ${p} elements and the old shape (${n.shape}) has ${a} elements. The new shape and old shape must have the same number of elements.`),t.incRef(n.dataId);let l=t.data.get(n.dataId);if(l.complexTensorInfos!=null){let u=l.complexTensorInfos.real,c=l.complexTensorInfos.imag;u.shape=i,c.shape=i}return{dataId:n.dataId,shape:i,dtype:n.dtype}}var ZN={kernelName:ti,backendName:"cpu",kernelFunc:ye};function pg(o){let{inputs:e,backend:t,attrs:r}=o,{a:n,b:s}=e,{transposeA:a,transposeB:i}=r;U([n,s],"matMul");let p=n.shape.length,l=s.shape.length,u=a?n.shape[p-2]:n.shape[p-1],c=i?s.shape[l-1]:s.shape[l-2],m=a?n.shape[p-1]:n.shape[p-2],d=i?s.shape[l-2]:s.shape[l-1],f=n.shape.slice(0,-2),g=s.shape.slice(0,-2),h=y.sizeFromShape(f),x=y.sizeFromShape(g),w=Po.assertAndGetBroadcastShape(n.shape.slice(0,-2),s.shape.slice(0,-2)).concat([m,d]);y.assert(u===c,()=>`Error in matMul: inner shapes (${u}) and (${c}) of Tensors with shapes ${n.shape} and ${s.shape} and transposeA=${a} and transposeB=${i} must match.`);let v=a?[h,u,m]:[h,m,u],k=i?[x,d,c]:[x,c,d],E=ye({inputs:{x:n},backend:t,attrs:{shape:v}}),$=ye({inputs:{x:s},backend:t,attrs:{shape:k}}),A=a?E.shape[1]:E.shape[2],D=a?E.shape[2]:E.shape[1],R=i?$.shape[1]:$.shape[2],P=Math.max(h,x),V=t.data.get(E.dataId).values,L=t.data.get($.dataId).values,B=y.computeStrides(E.shape),M=y.computeStrides($.shape),[W,G,z]=a?[B[0],1,B[1]]:[B[0],B[1],1],[H,j,X]=i?[1,M[1],M[0]]:[M[1],1,M[0]],Z=D*R,Q=oe([P,D,R],E.dtype),ee=Q.values,Y=t.blockSize;for(let re=0;re<P;re++){let le=re%h,de=re%x;for(let ce=0;ce<D;ce+=Y){let be=Math.min(ce+Y,D);for(let ve=0;ve<R;ve+=Y){let De=Math.min(ve+Y,R);for(let Le=0;Le<A;Le+=Y){let Je=Math.min(Le+Y,A);for(let Me=ce;Me<be;Me++)for(let Re=ve;Re<De;Re++){let Qe=0;for(let qe=Le;qe<Je;qe++){let qo=V[le*W+Me*G+qe*z],ht=L[qe*H+Re*j+de*X];Qe+=qo*ht}ee[re*Z+(Me*R+Re)]+=Qe}}}}}return t.disposeIntermediateTensorInfo(E),t.disposeIntermediateTensorInfo($),t.makeTensorInfo(w,Q.dtype,Q.values)}var JN={kernelName:Ys,backendName:"cpu",kernelFunc:pg};function uz(o){let{inputs:e,backend:t,attrs:r}=o,{a:n,b:s,bias:a,preluActivationWeights:i}=e,{transposeA:p,transposeB:l,activation:u,leakyreluAlpha:c}=r,m,d,f,g=[];m=pg({inputs:{a:n,b:s},attrs:{transposeA:p,transposeB:l},backend:t}),a&&(d=Wo({inputs:{a:m,b:a},backend:t}),g.push(m),m=d),u&&(f=Ps(t,m,u,i,c),g.push(m),m=f);for(let x of g)t.disposeIntermediateTensorInfo(x);return m}var eS={kernelName:Yn,backendName:"cpu",kernelFunc:uz};var cz=ie(jr,o=>Math.acos(o)),tS={kernelName:jr,backendName:"cpu",kernelFunc:cz};var mz=ie(Xr,o=>Math.acosh(o)),oS={kernelName:Xr,backendName:"cpu",kernelFunc:mz};function dz(o){let{inputs:e,backend:t}=o,r=e;U(e,"addN");let n=r.map(i=>t.data.get(i.dataId).values),s=oe(r[0].shape,r[0].dtype),a=s.values;for(let i=0;i<r.length;i++){let p=n[i];for(let l=0;l<a.length;l++)a[l]+=p[l]}return t.makeTensorInfo(s.shape,s.dtype,s.values)}var rS={kernelName:Gs,backendName:"cpu",kernelFunc:dz};function fz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,keepDims:a}=r;U(n,"all");let i=y.parseAxisParam(s,n.shape),p=i,l=N.getAxesPermutation(p,n.shape.length),u=n;l!=null&&(u=We({inputs:{x:n},backend:t,attrs:{perm:l}}),p=N.getInnerMostAxes(p.length,n.shape.length)),N.assertAxesAreInnerMostDims("all",p,u.shape.length);let[c,m]=N.computeOutAndReduceShapes(u.shape,p),d=y.sizeFromShape(m),f=y.makeZerosTypedArray(y.sizeFromShape(c),u.dtype),g=t.data.get(u.dataId).values;for(let x=0;x<f.length;++x){let b=x*d,w=g[b];for(let v=0;v<d;++v){let k=g[b+v];w=w&&k}f[x]=w}l!=null&&t.disposeIntermediateTensorInfo(u);let h=t.makeTensorInfo(c,u.dtype,f);if(a){let x=N.expandShapeToKeepDim(c,i),b=ye({inputs:{x:h},backend:t,attrs:{shape:x}});return t.disposeIntermediateTensorInfo(h),b}return h}var nS={kernelName:Hs,backendName:"cpu",kernelFunc:fz};function hz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,keepDims:a}=r;U(n,"any");let i=y.parseAxisParam(s,n.shape),p=i,l=N.getAxesPermutation(p,n.shape.length),u=n;l!=null&&(u=We({inputs:{x:n},backend:t,attrs:{perm:l}}),p=N.getInnerMostAxes(p.length,n.shape.length)),N.assertAxesAreInnerMostDims("any",p,u.shape.length);let[c,m]=N.computeOutAndReduceShapes(u.shape,p),d=y.sizeFromShape(m),f=y.makeZerosTypedArray(y.sizeFromShape(c),u.dtype),g=t.data.get(u.dataId).values;for(let x=0;x<f.length;++x){let b=x*d,w=g[b];for(let v=0;v<d;++v){let k=g[b+v];w=w||k}f[x]=w}l!=null&&t.disposeIntermediateTensorInfo(u);let h=t.makeTensorInfo(c,u.dtype,f);if(a){let x=N.expandShapeToKeepDim(c,i),b=ye({inputs:{x:h},backend:t,attrs:{shape:x}});return t.disposeIntermediateTensorInfo(h),b}return h}var sS={kernelName:qs,backendName:"cpu",kernelFunc:hz};function gz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s}=r;U(n,"argMax");let a=y.parseAxisParam(s,n.shape),i=N.getAxesPermutation(a,n.shape.length),p=n,l=[];i!=null&&(p=We({inputs:{x:n},backend:t,attrs:{perm:i}}),l.push(p),a=N.getInnerMostAxes(a.length,p.shape.length)),a=[a[0]],N.assertAxesAreInnerMostDims("argMax",a,p.shape.length);let[u,c]=N.computeOutAndReduceShapes(p.shape,a),m=y.sizeFromShape(u),d=y.makeZerosTypedArray(m,"int32"),f=y.sizeFromShape(c),g=t.data.get(p.dataId).values;for(let h=0;h<d.length;++h){let x=h*f,b=g[x],w=0;for(let v=0;v<f;++v){let k=g[x+v];k>b&&(b=k,w=v)}d[h]=w}return l.forEach(h=>t.disposeIntermediateTensorInfo(h)),t.makeTensorInfo(u,"int32",d)}var aS={kernelName:Ks,backendName:"cpu",kernelFunc:gz};function xz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s}=r;U(n,"argMin");let a=y.parseAxisParam(s,n.shape),i=N.getAxesPermutation(a,n.shape.length),p=n,l=[];i!=null&&(p=We({inputs:{x:n},backend:t,attrs:{perm:i}}),l.push(p),a=N.getInnerMostAxes(a.length,p.shape.length)),a=[a[0]],N.assertAxesAreInnerMostDims("argMin",a,p.shape.length);let[u,c]=N.computeOutAndReduceShapes(p.shape,a),m=y.sizeFromShape(u),d=y.makeZerosTypedArray(m,"int32"),f=y.sizeFromShape(c),g=t.data.get(p.dataId).values;for(let h=0;h<d.length;++h){let x=h*f,b=g[x],w=0;for(let v=0;v<f;++v){let k=g[x+v];k<b&&(b=k,w=v)}d[h]=w}return l.forEach(h=>t.disposeIntermediateTensorInfo(h)),t.makeTensorInfo(u,"int32",d)}var iS={kernelName:js,backendName:"cpu",kernelFunc:xz};var yz=ie(Qr,o=>Math.asin(o)),pS={kernelName:Qr,backendName:"cpu",kernelFunc:yz};var bz=ie(Yr,o=>Math.asinh(o)),lS={kernelName:Yr,backendName:"cpu",kernelFunc:bz};var _z=ie(Zr,o=>Math.atan(o)),uS={kernelName:Zr,backendName:"cpu",kernelFunc:_z};var Tz=xe((o,e)=>Math.atan2(o,e)),vz=Ce(en,Tz),cS={kernelName:en,backendName:"cpu",kernelFunc:vz};var wz=ie(Jr,o=>Math.atanh(o)),mS={kernelName:Jr,backendName:"cpu",kernelFunc:wz};function xp(o,e,t,r,n,s){let a=n.strideHeight,i=n.strideWidth,p=n.dilationHeight,l=n.dilationWidth,u=n.effectiveFilterHeight,c=n.effectiveFilterWidth,m=n.padInfo.top,d=n.padInfo.left,f=s==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,g=oe(n.outShape,t),h=g.values,x=n.outShape[1]*n.outShape[2]*n.outShape[3],b=n.outShape[2]*n.outShape[3],w=n.outShape[3];for(let v=0;v<n.batchSize;++v){let k=v*x,E=v*r[0];for(let $=0;$<n.inChannels;++$)for(let A=0;A<n.outHeight;++A){let D=A*a-m,R=Math.max(0,D),P=Math.min(n.inHeight,u+D),V=k+A*b;for(let L=0;L<n.outWidth;++L){let B=L*i-d,M=Math.max(0,B),W=Math.min(n.inWidth,c+B),G=f,z=0,H=0;for(let X=R;X<P;X+=p){let Z=E+X*r[1];for(let Q=M;Q<W;Q+=l){let ee=Z+Q*r[2],Y=o[ee+$];s==="max"&&Y>G?G=Y:s==="avg"&&(z+=Y,H++)}if(isNaN(G))break}let j=V+L*w+$;h[j]=s==="avg"?z/H:G}}}return g}function nd(o,e,t,r,n=!1,s=!1){let a=oe(r.outShape,"int32"),i=r.strideHeight,p=r.strideWidth,l=r.dilationHeight,u=r.dilationWidth,c=r.effectiveFilterHeight,m=r.effectiveFilterWidth,d=r.padInfo.top,f=r.padInfo.left,g=oe(e,t,o);for(let h=0;h<r.batchSize;++h)for(let x=0;x<r.inChannels;++x)for(let b=0;b<r.outHeight;++b){let w=b*i-d,v=w;for(;v<0;)v+=l;let k=Math.min(r.inHeight,c+w);for(let E=0;E<r.outWidth;++E){let $=E*p-f,A=$;for(;A<0;)A+=u;let D=Math.min(r.inWidth,m+$),R=Number.NEGATIVE_INFINITY,P=-1;for(let V=v;V<k;V+=l){let L=V-w;for(let B=A;B<D;B+=u){let M=B-$,W=g.get(h,V,B,x);W>R&&(R=W,n?P=s?((h*r.inHeight+V)*r.inWidth+B)*r.inChannels+x:(V*r.inWidth+B)*r.inChannels+x:P=L*m+M)}}a.set(P,h,b,E,x)}}return a}function sd(o,e,t,r,n,s){let a=n.strideDepth,i=n.strideHeight,p=n.strideWidth,l=n.dilationDepth,u=n.dilationHeight,c=n.dilationWidth,m=n.effectiveFilterDepth,d=n.effectiveFilterHeight,f=n.effectiveFilterWidth,g=n.padInfo.front,h=n.padInfo.top,x=n.padInfo.left,b=s==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,w=oe(n.outShape,t),v=w.values,k=n.outShape[1]*n.outShape[2]*n.outShape[3]*n.outShape[4],E=n.outShape[2]*n.outShape[3]*n.outShape[4],$=n.outShape[3]*n.outShape[4],A=n.outShape[4];for(let D=0;D<n.batchSize;++D){let R=D*k,P=D*r[0];for(let V=0;V<n.inChannels;++V)for(let L=0;L<n.outDepth;++L){let B=L*a-g,M=B;for(;M<0;)M+=l;let W=Math.min(n.inDepth,m+B),G=R+L*E;for(let z=0;z<n.outHeight;++z){let H=z*i-h,j=H;for(;j<0;)j+=u;let X=Math.min(n.inHeight,d+H),Z=G+z*$;for(let Q=0;Q<n.outWidth;++Q){let ee=Q*p-x,Y=ee;for(;Y<0;)Y+=c;let re=Math.min(n.inWidth,f+ee),le=Z+Q*A,de=b,ce=0,be=0;for(let De=M;De<W;De+=l){let Le=P+De*r[1];for(let Je=j;Je<X;Je+=u){let Me=Le+Je*r[2];for(let Re=Y;Re<re;Re+=c){let Qe=Me+Re*r[3],qe=o[Qe+V];if(s==="max"&&qe>de?de=qe:s==="avg"&&(ce+=qe,be++),isNaN(de))break}if(isNaN(de))break}if(isNaN(de))break}let ve=le+V;v[ve]=s==="avg"?ce/Math.max(be,1):de}}}}return w}function dS(o,e){let t=oe(e.outShape,"int32"),r=e.strideDepth,n=e.strideHeight,s=e.strideWidth,a=e.dilationDepth,i=e.dilationHeight,p=e.dilationWidth,l=e.effectiveFilterDepth,u=e.effectiveFilterHeight,c=e.effectiveFilterWidth,m=e.padInfo.front,d=e.padInfo.top,f=e.padInfo.left;for(let g=0;g<e.batchSize;++g)for(let h=0;h<e.inChannels;++h)for(let x=0;x<e.outDepth;++x){let b=x*r-m,w=b;for(;w<0;)w+=a;let v=Math.min(e.inDepth,l+b);for(let k=0;k<e.outHeight;++k){let E=k*n-d,$=E;for(;$<0;)$+=i;let A=Math.min(e.inHeight,u+E);for(let D=0;D<e.outWidth;++D){let R=D*s-f,P=R;for(;P<0;)P+=p;let V=Math.min(e.inWidth,c+R),L=Number.NEGATIVE_INFINITY,B=-1;for(let M=w;M<v;M+=a){let W=M-b;for(let G=$;G<A;G+=i){let z=G-E;for(let H=P;H<V;H+=p){let j=H-R,X=o.get(g,M,G,H,h);X>=L&&(L=X,B=W*u*c+z*u+j)}}}t.set(B,g,x,k,D,h)}}}return t}function Cz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e;U(n,"avgPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:p}=r,l=1;y.assert(N.eitherStridesOrDilationsAreOne(a,l),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${l}'`);let u=N.computePool2DInfo(n.shape,s,a,l,i,p),c;if(u.filterWidth===1&&u.filterHeight===1&&y.arraysEqual(u.inShape,u.outShape))c=Tt({inputs:{x:n},backend:t});else{let m=t.data.get(n.dataId).values,d=y.computeStrides(n.shape),f=xp(m,n.shape,n.dtype,d,u,"avg");c=t.makeTensorInfo(u.outShape,n.dtype,f.values)}return c}var fS={kernelName:Xs,backendName:"cpu",kernelFunc:Cz};function Nz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{filterSize:s,strides:a,pad:i,dimRoundingMode:p,dataFormat:l}=r;U(n,"avgPool3d");let u=N.computePool3DInfo(n.shape,s,a,1,i,p,l),c=t.data.get(n.dataId).values,m=sd(c,n.shape,n.dtype,y.computeStrides(n.shape),u,"avg");return t.makeTensorInfo(m.shape,"float32",m.values)}var hS={kernelName:Qs,backendName:"cpu",kernelFunc:Nz};function Sz(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,input:s}=e,{filterSize:a,strides:i,pad:p,dimRoundingMode:l}=r;U([n,s],"avgPool3DGrad");let u=N.computePool3DInfo(s.shape,a,i,1,p,l),c=u.strideDepth,m=u.strideHeight,d=u.strideWidth,f=u.filterDepth,g=u.filterHeight,h=u.filterWidth,x=u.dilationDepth,b=u.dilationHeight,w=u.dilationWidth,v=u.effectiveFilterDepth,k=u.effectiveFilterHeight,E=u.effectiveFilterWidth,$=v-1-u.padInfo.front,A=E-1-u.padInfo.left,D=k-1-u.padInfo.top,R=oe(s.shape,"float32"),P=1/(f*g*h),V=t.bufferSync(n);for(let L=0;L<u.batchSize;++L)for(let B=0;B<u.inChannels;++B)for(let M=0;M<u.inDepth;++M)for(let W=0;W<u.inHeight;++W)for(let G=0;G<u.inWidth;++G){let z=M-$,H=W-D,j=G-A,X=0;for(let Z=0;Z<v;Z+=x){let Q=(z+Z)/c;if(!(Q<0||Q>=u.outDepth||Math.floor(Q)!==Q))for(let ee=0;ee<k;ee+=b){let Y=(H+ee)/m;if(!(Y<0||Y>=u.outHeight||Math.floor(Y)!==Y))for(let re=0;re<E;re+=w){let le=(j+re)/d;if(le<0||le>=u.outWidth||Math.floor(le)!==le)continue;let de=V.get(L,Q,Y,le,B);X+=de}}}R.set(X*P,L,M,W,G,B)}return t.makeTensorInfo(R.shape,R.dtype,R.values)}var gS={kernelName:vl,backendName:"cpu",kernelFunc:Sz};function Iz(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,input:s}=e,a=s;U([n,s],"avgPoolGrad");let{filterSize:i,strides:p,pad:l}=r,u=N.computePool2DInfo(a.shape,i,p,1,l),c=u.strideHeight,m=u.strideWidth,d=u.filterHeight,f=u.filterWidth,g=u.dilationHeight,h=u.dilationWidth,x=u.effectiveFilterHeight,b=u.effectiveFilterWidth,w=b-1-u.padInfo.left,v=x-1-u.padInfo.top,k=oe(a.shape,"float32"),E=1/(d*f),$=t.data.get(n.dataId).values,A=oe(n.shape,"float32",$);for(let D=0;D<u.batchSize;++D)for(let R=0;R<u.inChannels;++R)for(let P=0;P<u.inHeight;++P)for(let V=0;V<u.inWidth;++V){let L=P-v,B=V-w,M=0;for(let W=0;W<x;W+=g){let G=(L+W)/c;if(!(G<0||G>=u.outHeight||Math.floor(G)!==G))for(let z=0;z<b;z+=h){let H=(B+z)/m;if(H<0||H>=u.outWidth||Math.floor(H)!==H)continue;let j=A.get(D,G,H,R);M+=j}}k.set(M*E,D,P,V,R)}return t.makeTensorInfo(k.shape,k.dtype,k.values)}var xS={kernelName:Tl,backendName:"cpu",kernelFunc:Iz};function kz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,scale:s,offset:a,mean:i,variance:p}=e;y.assert(i.shape.length===p.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),y.assert(a==null||i.shape.length===a.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),y.assert(s==null||i.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks."),U([n,i,p,s,a],"batchNorm");let{varianceEpsilon:l}=r;l==null&&(l=.001);let u=t.data.get(n.dataId).values,c=t.data.get(i.dataId).values,m=t.data.get(p.dataId).values,d=s?t.data.get(s.dataId).values:new Float32Array([1]),f=a?t.data.get(a.dataId).values:new Float32Array([0]),g=new Float32Array(u.length),h=f.length,x=d.length,b=m.length,w=c.length,v=0,k=0,E=0,$=0;for(let A=0;A<u.length;++A)g[A]=f[v++]+(u[A]-c[k++])*d[E++]/Math.sqrt(m[$++]+l),v>=h&&(v=0),k>=w&&(k=0),E>=x&&(E=0),$>=b&&($=0);return t.makeTensorInfo(n.shape,n.dtype,g)}var yS={kernelName:Ca,backendName:"cpu",kernelFunc:kz};function Ez(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{blockShape:s,crops:a}=r;U([n],"batchToSpaceND");let i=s.reduce((x,b)=>x*b),p=N.getReshaped(n.shape,s,i),l=N.getPermuted(p.length,s.length),u=N.getReshapedPermuted(n.shape,s,i),c=N.getSliceBeginCoords(a,s.length),m=N.getSliceSize(u,a,s.length),d=ye({inputs:{x:n},backend:t,attrs:{shape:p}}),f=We({inputs:{x:d},backend:t,attrs:{perm:l}}),g=ye({inputs:{x:f},backend:t,attrs:{shape:u}}),h=ho({inputs:{x:g},backend:t,attrs:{begin:c,size:m}});return t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(g),h}var bS={kernelName:Zs,backendName:"cpu",kernelFunc:Ez};function $z(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,weights:s}=e,{size:a}=r,i=t.data.get(n.dataId).values,p=t.data.get(s.dataId).values,l=sp(i,p,s.dtype,s.shape,a);return t.makeTensorInfo([a],s.dtype,l)}var _S={kernelName:Js,backendName:"cpu",kernelFunc:$z};function Az(o){let{inputs:e,backend:t}=o,{s0:r,s1:n}=e,s=t.data.get(r.dataId).values,a=t.data.get(n.dataId).values,i=N.assertAndGetBroadcastShape(Array.from(s),Array.from(a));return t.makeTensorInfo([i.length],"int32",Int32Array.from(i))}var TS={kernelName:ea,backendName:"cpu",kernelFunc:Az};var Fz=ie(rn,(o,e)=>{let t=e;return o>t.clipValueMax?t.clipValueMax:o<t.clipValueMin?t.clipValueMin:o}),vS={kernelName:rn,backendName:"cpu",kernelFunc:Fz};var Dz=o=>{let{x:e}=o.inputs,t=o.backend,r=new Float32Array(y.sizeFromShape(e.shape)),n=t.data.get(e.dataId),s=n.complexTensorInfos.real,a=n.complexTensorInfos.imag,i=t.data.get(s.dataId).values,p=t.data.get(a.dataId).values;for(let l=0;l<i.length;l++){let u=i[l],c=p[l];r[l]=Math.hypot(u,c)}return t.makeOutput(r,e.shape,"float32")},wS={kernelName:oa,backendName:"cpu",kernelFunc:Dz};function Ho(o){let{inputs:e,backend:t}=o,{input:r}=e,n=t.data.get(r.dataId).complexTensorInfos.imag,s=t.data.get(n.dataId).values;return t.makeTensorInfo(n.shape,n.dtype,s)}var CS={kernelName:ka,backendName:"cpu",kernelFunc:Ho};function zr(o){let{inputs:e,backend:t,attrs:r}=o,{axis:n}=r,s=y.parseAxisParam(n,e[0].shape)[0],a=e.map(g=>g.shape);N.assertParamsConsistent(a,s);let i=N.computeOutShape(e.map(g=>g.shape),s);if(y.sizeFromShape(i)===0)return t.makeTensorInfo(i,e[0].dtype,[]);let p=e.filter(g=>y.sizeFromShape(g.shape)>0);if(p.length===1)return Tt({inputs:{x:p[0]},backend:t});if(p[0].dtype==="complex64"){let g=p.map(v=>co({inputs:{input:v},backend:t})),h=p.map(v=>Ho({inputs:{input:v},backend:t})),x=zr({inputs:g,backend:t,attrs:{axis:s}}),b=zr({inputs:h,backend:t,attrs:{axis:s}}),w=st({inputs:{real:x,imag:b},backend:t});return g.forEach(v=>t.disposeIntermediateTensorInfo(v)),h.forEach(v=>t.disposeIntermediateTensorInfo(v)),t.disposeIntermediateTensorInfo(x),t.disposeIntermediateTensorInfo(b),w}let l=p.map(g=>{let x=[-1,y.sizeFromShape(g.shape.slice(s))];return ye({inputs:{x:g},backend:t,attrs:{shape:x}})}),u=l.map(g=>({vals:t.data.get(g.dataId).values,shape:g.shape}));i=N.computeOutShape(l.map(g=>g.shape),1);let c=l[0].shape[0]===1,m=mc(u,i,e[0].dtype,c),d=N.computeOutShape(p.map(g=>g.shape),s),f=t.makeTensorInfo(d,e[0].dtype,m);return l.forEach(g=>t.disposeIntermediateTensorInfo(g)),f}var NS={kernelName:ra,backendName:"cpu",kernelFunc:zr};function lg(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,filter:s}=e,{strides:a,pad:i,dataFormat:p,dilations:l,dimRoundingMode:u}=r;U([n,s],"conv2d");let c=N.convertConv2DDataFormat(p),m=N.computeConv2DInfo(n.shape,s.shape,a,l,i,u,!1,c),d=m.filterHeight,f=m.filterWidth,g=m.dilationHeight,h=m.dilationWidth,x=m.padInfo.left,b=m.padInfo.top,w=m.dataFormat==="channelsLast",v=new Se(m.outShape,n.dtype),k=y.computeStrides(n.shape),E=y.computeStrides(s.shape),$=k[0],A=w?k[1]:k[2],D=w?k[2]:1,R=w?1:k[1],P=v.strides[0],V=w?v.strides[1]:v.strides[2],L=w?v.strides[2]:1,B=w?1:v.strides[1],M=t.data.get(n.dataId).values,W=t.data.get(s.dataId).values,G=v.values;for(let z=0;z<m.batchSize;++z){let H=z*$,j=z*P;for(let X=0;X<m.outHeight;++X){let Z=j+X*V,Q=X*m.strideHeight-b;for(let ee=0;ee<d;++ee){let Y=Q+ee*g;if(Y<0||Y>=m.inHeight)continue;let re=ee*E[0],le=H+Y*A;for(let de=0;de<m.outWidth;++de){let ce=Z+de*L,be=de*m.strideWidth-x;for(let ve=0;ve<f;++ve){let De=be+ve*h;if(De<0||De>=m.inWidth)continue;let Le=re+ve*E[1],Je=le+De*D,Me=Le;for(let Re=0;Re<m.inChannels;++Re){let Qe=M[Je+Re*R];for(let qe=0;qe<m.outChannels;++qe)G[ce+qe*B]+=Qe*W[Me+qe];Me+=m.outChannels}}}}}}return t.makeTensorInfo(v.shape,v.dtype,G)}var SS={kernelName:na,backendName:"cpu",kernelFunc:lg};function Rz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,dy:s}=e,{strides:a,pad:i,dataFormat:p,dimRoundingMode:l,filterShape:u}=r;U([n,s],"conv2dBackpropFilter");let c=N.convertConv2DDataFormat(p),m=N.computeConv2DInfo(n.shape,u,a,1,i,l,!1,c),{strideHeight:d,strideWidth:f,filterHeight:g,filterWidth:h}=m,x=m.dataFormat==="channelsLast",b=new Se(m.filterShape,"float32"),w=m.padInfo.left,v=m.padInfo.top,k=t.data.get(n.dataId).values,E=t.data.get(s.dataId).values,$=new Se(n.shape,n.dtype,k),A=new Se(s.shape,s.dtype,E);for(let D=0;D<g;++D){let R=Math.max(0,Math.ceil((v-D)/d)),P=Math.min(m.outHeight,(m.inHeight+v-D)/d);for(let V=0;V<h;++V){let L=Math.max(0,Math.ceil((w-V)/f)),B=Math.min(m.outWidth,(m.inWidth+w-V)/f);for(let M=0;M<m.inChannels;++M)for(let W=0;W<m.outChannels;++W){let G=0;for(let z=0;z<m.batchSize;++z)for(let H=R;H<P;++H){let j=D+H*d-v;for(let X=L;X<B;++X){let Z=V+X*f-w;x?G+=$.get(z,j,Z,M)*A.get(z,H,X,W):G+=$.get(z,M,j,Z)*A.get(z,W,H,X)}}b.set(G,D,V,M,W)}}}return t.makeTensorInfo(b.shape,b.dtype,b.values)}var IS={kernelName:sa,backendName:"cpu",kernelFunc:Rz};function Oz(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,filter:s}=e,{inputShape:a,strides:i,pad:p,dataFormat:l,dimRoundingMode:u}=r;U([n,s],"conv2dBackpropInput");let c=y.computeStrides(s.shape),m=y.computeStrides(n.shape),d=N.convertConv2DDataFormat(l),f=N.computeConv2DInfo(a,s.shape,i,1,p,u,!1,d),g=new Se(f.inShape,"float32"),h=g.values,x=t.data.get(n.dataId).values,b=t.data.get(s.dataId).values,[w,v,k]=c,{batchSize:E,filterHeight:$,filterWidth:A,inChannels:D,inHeight:R,inWidth:P,outChannels:V,outHeight:L,outWidth:B,strideHeight:M,strideWidth:W}=f;d=f.dataFormat;let G=$-1-f.padInfo.top,z=A-1-f.padInfo.left,H=d==="channelsLast",j=g.strides[0],X=H?g.strides[1]:g.strides[2],Z=H?g.strides[2]:1,Q=H?1:g.strides[1],ee=m[0],Y=H?m[1]:m[2],re=H?m[2]:1,le=H?1:m[1];for(let de=0;de<E;++de)for(let ce=0;ce<D;++ce)for(let be=0;be<R;++be){let ve=be-G,De=Math.max(0,Math.ceil(ve/M)),Le=Math.min(L,($+ve)/M);for(let Je=0;Je<P;++Je){let Me=Je-z,Re=Math.max(0,Math.ceil(Me/W)),Qe=Math.min(B,(A+Me)/W),qe=0;for(let ht=De;ht<Le;++ht){let cr=ht*M-ve;for(let Zt=Re;Zt<Qe;++Zt){let Wr=Zt*W-Me,xo=ee*de+Y*ht+re*Zt,Ko=w*($-1-cr)+v*(A-1-Wr)+k*ce;for(let mr=0;mr<V;++mr){let dr=x[xo+le*mr],fr=b[Ko+mr];qe+=dr*fr}}}let qo=j*de+X*be+Z*Je+Q*ce;h[qo]=qe}}return t.makeTensorInfo(g.shape,g.dtype,g.values)}var kS={kernelName:aa,backendName:"cpu",kernelFunc:Oz};function Pz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,filter:s}=e,{strides:a,pad:i,dilations:p}=r;U([n,s],"conv3d");let l=N.computeConv3DInfo(n.shape,s.shape,a,p,i),{filterDepth:u,filterHeight:c,filterWidth:m,dilationDepth:d,dilationHeight:f,dilationWidth:g,padInfo:h}=l,x=h.front,b=h.left,w=h.top,v=new Se(l.outShape,n.dtype),k=t.data.get(n.dataId).values,E=t.data.get(s.dataId).values,$=v.values,A=y.computeStrides(n.shape),D=y.computeStrides(s.shape);for(let R=0;R<l.batchSize;++R){let P=R*A[0],V=R*v.strides[0];for(let L=0;L<l.outDepth;++L){let B=V+L*v.strides[1],M=L*l.strideDepth-x;for(let W=0;W<u;++W){let G=M+W*d;if(G<0||G>=l.inDepth)continue;let z=W*D[0],H=P+G*A[1];for(let j=0;j<l.outHeight;++j){let X=B+j*v.strides[2],Z=j*l.strideHeight-w;for(let Q=0;Q<c;++Q){let ee=Z+Q*f;if(ee<0||ee>=l.inHeight)continue;let Y=z+Q*D[1],re=H+ee*A[2];for(let le=0;le<l.outWidth;++le){let de=X+le*l.outChannels,ce=le*l.strideWidth-b;for(let be=0;be<m;++be){let ve=ce+be*g;if(ve<0||ve>=l.inWidth)continue;let De=Y+be*D[2],Le=re+ve*l.inChannels,Je=De;for(let Me=0;Me<l.inChannels;++Me){let Re=k[Le+Me];for(let Qe=0;Qe<l.outChannels;++Qe)$[de+Qe]+=Re*E[Je+Qe];Je+=l.outChannels}}}}}}}}return t.makeTensorInfo(v.shape,v.dtype,v.values)}var ES={kernelName:ia,backendName:"cpu",kernelFunc:Pz};function Vz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,dy:s}=e,{strides:a,pad:i,filterShape:p}=r;U([n,s],"conv3dBackpropFilterV2");let l=y.computeStrides(n.shape),u=y.computeStrides(s.shape),c=N.computeConv3DInfo(n.shape,p,a,1,i),m=c.strideDepth,d=c.strideHeight,f=c.strideWidth,g=c.filterDepth,h=c.filterHeight,x=c.filterWidth,b=new Se(c.filterShape,"float32"),w=b.values,[v,k,E,$]=b.strides,A=t.data.get(s.dataId).values,[D,R,P,V]=u,L=t.data.get(n.dataId).values,[B,M,W,G]=l,z=c.padInfo.front,H=c.padInfo.left,j=c.padInfo.top;for(let X=0;X<g;++X){let Z=Math.max(0,Math.ceil((z-X)/m)),Q=Math.min(c.outDepth,(c.inDepth+z-X)/m),ee=X*v;for(let Y=0;Y<h;++Y){let re=Math.max(0,Math.ceil((j-Y)/d)),le=Math.min(c.outHeight,(c.inHeight+j-Y)/d),de=Y*k+ee;for(let ce=0;ce<x;++ce){let be=Math.max(0,Math.ceil((H-ce)/f)),ve=Math.min(c.outWidth,(c.inWidth+H-ce)/f),De=ce*E+de;for(let Le=0;Le<c.inChannels;++Le){let Je=Le*$+De;for(let Me=0;Me<c.outChannels;++Me){let Re=0;for(let Qe=0;Qe<c.batchSize;++Qe){let qe=Qe*B,qo=Qe*D;for(let ht=Z;ht<Q;++ht){let Zt=(X+ht*m-z)*M+qe,Wr=ht*R+qo;for(let xo=re;xo<le;++xo){let mr=(Y+xo*d-j)*W+Zt,dr=xo*P+Wr;for(let fr=be;fr<ve;++fr){let Id=(ce+fr*f-H)*G+mr,kd=fr*V+dr;Re+=L[Id+Le]*A[kd+Me]}}}}w[Je+Me]=Re}}}}}return t.makeTensorInfo(b.shape,b.dtype,b.values)}var $S={kernelName:wl,backendName:"cpu",kernelFunc:Vz};function Lz(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,filter:s}=e,{pad:a,strides:i,inputShape:p}=r;U([n],"conv3dBackpropInputV2");let l=y.computeStrides(n.shape),u=y.computeStrides(s.shape),c=N.computeConv3DInfo(p,s.shape,i,1,a),m=new Se(c.inShape,"float32"),d=m.values,[f,g,h,x]=m.strides,b=t.data.get(n.dataId).values,[w,v,k,E]=l,$=t.data.get(s.dataId).values,[A,D,R,P]=u,{batchSize:V,filterDepth:L,filterHeight:B,filterWidth:M,inChannels:W,inDepth:G,inHeight:z,inWidth:H,outChannels:j,outDepth:X,outHeight:Z,outWidth:Q,strideDepth:ee,strideHeight:Y,strideWidth:re}=c,le=L-1-c.padInfo.front,de=B-1-c.padInfo.top,ce=M-1-c.padInfo.left;for(let be=0;be<V;++be)for(let ve=0;ve<W;++ve)for(let De=0;De<G;++De){let Le=De-le,Je=Math.max(0,Math.ceil(Le/ee)),Me=Math.min(X,(L+Le)/ee);for(let Re=0;Re<z;++Re){let Qe=Re-de,qe=Math.max(0,Math.ceil(Qe/Y)),qo=Math.min(Z,(B+Qe)/Y);for(let ht=0;ht<H;++ht){let cr=ht-ce,Zt=Math.max(0,Math.ceil(cr/re)),Wr=Math.min(Q,(M+cr)/re),xo=0;for(let Ko=Je;Ko<Me;++Ko){let mr=Ko*ee-Le;for(let dr=qe;dr<qo;++dr){let fr=dr*Y-Qe;for(let wp=Zt;wp<Wr;++wp){let Id=wp*re-cr,kd=w*be+v*Ko+k*dr+E*wp,pk=A*(L-1-mr)+D*(B-1-fr)+R*(M-1-Id)+P*ve;for(let yl=0;yl<j;++yl){let lk=b[kd+yl],uk=$[pk+yl];xo+=lk*uk}}}}d[f*be+g*De+h*Re+x*ht+ve]=xo}}}return t.makeTensorInfo(m.shape,m.dtype,m.values)}var AS={kernelName:pa,backendName:"cpu",kernelFunc:Lz};var Mz=ie(nn,o=>Math.cos(o)),FS={kernelName:nn,backendName:"cpu",kernelFunc:Mz};var Bz=ie(sn,o=>Math.cosh(o)),DS={kernelName:sn,backendName:"cpu",kernelFunc:Bz};function zz(o){let{inputs:e,backend:t,attrs:r}=o,{image:n,boxes:s,boxInd:a}=e,{cropSize:i,method:p,extrapolationValue:l}=r,[u,c,m,d]=n.shape,f=s.shape[0],[g,h]=i,x=oe([f,g,h,d],"float32"),b=t.data.get(s.dataId).values,w=t.data.get(a.dataId).values,v=t.data.get(n.dataId).values,k=y.computeStrides(n.shape),E=y.computeStrides(x.shape);for(let $=0;$<f;$++){let A=$*4,D=b[A],R=b[A+1],P=b[A+2],V=b[A+3],L=w[$];if(L>=u)continue;let B=g>1?(P-D)*(c-1)/(g-1):0,M=h>1?(V-R)*(m-1)/(h-1):0;for(let W=0;W<g;W++){let G=g>1?D*(c-1)+W*B:.5*(D+P)*(c-1);if(G<0||G>c-1){for(let z=0;z<h;z++)for(let H=0;H<d;H++){let j=H+z*E[2]+W*E[1]+$*E[0];x.values[j]=l}continue}if(p==="bilinear"){let z=Math.floor(G),H=Math.ceil(G),j=G-z;for(let X=0;X<h;X++){let Z=h>1?R*(m-1)+X*M:.5*(R+V)*(m-1);if(Z<0||Z>m-1){for(let re=0;re<d;re++){let le=re+X*E[2]+W*E[1]+$*E[0];x.values[le]=l}continue}let Q=Math.floor(Z),ee=Math.ceil(Z),Y=Z-Q;for(let re=0;re<d;re++){let le=re+Q*k[2]+z*k[1]+L*k[0],de=v[le];le=re+ee*k[2]+z*k[1]+L*k[0];let ce=v[le];le=re+Q*k[2]+H*k[1]+L*k[0];let be=v[le];le=re+ee*k[2]+H*k[1]+L*k[0];let ve=v[le],De=de+(ce-de)*Y,Le=be+(ve-be)*Y;le=re+X*E[2]+W*E[1]+$*E[0],x.values[le]=De+(Le-De)*j}}}else for(let z=0;z<h;++z){let H=h>1?R*(m-1)+z*M:.5*(R+V)*(m-1);if(H<0||H>m-1){for(let Z=0;Z<d;Z++){let Q=Z+z*E[2]+W*E[1]+$*E[0];x.values[Q]=l}continue}let j=Math.round(H),X=Math.round(G);for(let Z=0;Z<d;Z++){let Q=Z+j*k[2]+X*k[1]+L*k[0],ee=Z+z*E[2]+W*E[1]+$*E[0];x.values[ee]=v[Q]}}}}return t.makeTensorInfo(x.shape,x.dtype,x.values)}var RS={kernelName:ca,backendName:"cpu",kernelFunc:zz};function Uz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,exclusive:a,reverse:i}=r;U(n,"cumprod");let p=N.getAxesPermutation([s],n.shape.length),l=n;p!=null&&(l=We({inputs:{x:n},backend:t,attrs:{perm:p}}));let u=N.getInnerMostAxes(1,n.shape.length)[0];if(u!==l.shape.length-1)throw new Error(`backend.cumprod in CPU expects an inner-most axis=${l.shape.length-1} but got axis=${u}`);let c=et(l.dtype,"int32"),m=y.makeOnesTypedArray(y.sizeFromShape(l.shape),c),d=t.data.get(l.dataId).values,f=l.shape[l.shape.length-1],g=i?(x,b)=>x+f-b-1:(x,b)=>x+b;for(let x=0;x<d.length;x+=f)for(let b=0;b<f;b++){let w=g(x,b);if(b===0)m[w]=a?1:d[w];else{let v=g(x,b-1);m[w]=a?d[v]*m[v]:d[w]*m[v]}}let h=t.makeTensorInfo(l.shape,c,m);if(p!=null){let x=N.getUndoAxesPermutation(p),b=We({inputs:{x:h},backend:t,attrs:{perm:x}});return t.disposeIntermediateTensorInfo(h),t.disposeIntermediateTensorInfo(l),b}return h}var OS={kernelName:la,backendName:"cpu",kernelFunc:Uz};function Wz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,exclusive:a,reverse:i}=r;U(n,"cumsum");let p=N.getAxesPermutation([s],n.shape.length),l=n;p!=null&&(l=We({inputs:{x:n},backend:t,attrs:{perm:p}}));let u=N.getInnerMostAxes(1,n.shape.length)[0];if(u!==l.shape.length-1)throw new Error(`backend.cumsum in CPU expects an inner-most axis=${l.shape.length-1} but got axis=${u}`);let c=et(l.dtype,"int32"),m=y.makeZerosTypedArray(y.sizeFromShape(l.shape),c),d=t.data.get(l.dataId).values,f=l.shape[l.shape.length-1],g=i?(x,b)=>x+f-b-1:(x,b)=>x+b;for(let x=0;x<d.length;x+=f)for(let b=0;b<f;b++){let w=g(x,b);if(b===0)m[w]=a?0:d[w];else{let v=g(x,b-1);m[w]=a?d[v]+m[v]:d[w]+m[v]}}let h=t.makeTensorInfo(l.shape,c,m);if(p!=null){let x=N.getUndoAxesPermutation(p),b=We({inputs:{x:h},backend:t,attrs:{perm:x}});return t.disposeIntermediateTensorInfo(h),t.disposeIntermediateTensorInfo(l),b}return h}var PS={kernelName:ua,backendName:"cpu",kernelFunc:Wz};function Gz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,weights:s}=e,{size:a,binaryOutput:i}=r;if(n.shape.length===1){let p=t.data.get(n.dataId).values,l=t.data.get(s.dataId).values,u=sp(p,l,s.dtype,s.shape,a);return t.makeTensorInfo([a],s.dtype,u)}else if(n.shape.length===2){let p=t.bufferSync(n),l=t.bufferSync(s),u=cc(p,l,a,i);return t.makeTensorInfo(u.shape,s.dtype,u.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}var VS={kernelName:ma,backendName:"cpu",kernelFunc:Gz};function Hz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{blockSize:s,dataFormat:a}=r;y.assert(a==="NHWC",()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${a}`);let i=n.shape[0],p=n.shape[1],l=n.shape[2],u=n.shape[3],c=p*s,m=l*s,d=u/(s*s),f=t.data.get(n.dataId).values,g=new Float32Array(i*c*m*d),h=0;for(let x=0;x<i;++x)for(let b=0;b<c;++b){let w=Math.floor(b/s),v=b%s;for(let k=0;k<m;++k){let E=Math.floor(k/s),$=k%s,A=(v*s+$)*d;for(let D=0;D<d;++D){let P=D+A+u*(E+l*(w+p*x));g[h++]=f[P]}}}return t.makeTensorInfo([i,c,m,d],n.dtype,g)}var LS={kernelName:da,backendName:"cpu",kernelFunc:Hz};function ug(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,filter:s}=e,{strides:a,pad:i,dilations:p,dimRoundingMode:l}=r;U([n,s],"depthwiseConv2DNative");let u=y.computeStrides(n.shape),c=y.computeStrides(s.shape),m=p;m==null&&(m=[1,1]),y.assert(N.eitherStridesOrDilationsAreOne(a,m),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${a} and dilations '${m}'`);let d=N.computeConv2DInfo(n.shape,s.shape,a,m,i,l,!0),{filterHeight:f,filterWidth:g,dilationHeight:h,dilationWidth:x,padInfo:b}=d,w=b.left,v=b.top,k=d.outChannels/d.inChannels,E=new Se(d.outShape,n.dtype),$=t.data.get(n.dataId).values,A=t.data.get(s.dataId).values,D=E.values;for(let R=0;R<d.batchSize;++R){let P=R*u[0],V=R*E.strides[0];for(let L=0;L<d.outHeight;++L){let B=V+L*E.strides[1],M=L*d.strideHeight-v;for(let W=0;W<f;++W){let G=M+W*h;if(G<0||G>=d.inHeight)continue;let z=W*c[0],H=P+G*u[1];for(let j=0;j<d.outWidth;++j){let X=B+j*E.strides[2],Z=j*d.strideWidth-w;for(let Q=0;Q<g;++Q){let ee=Z+Q*x;if(ee<0||ee>=d.inWidth)continue;let Y=z+Q*c[1],re=H+ee*d.inChannels,le=X,de=Y;for(let ce=0;ce<d.inChannels;++ce){let be=$[re+ce];for(let ve=0;ve<k;++ve)D[le+ve]+=be*A[de+ve];le+=k,de+=k}}}}}}return t.makeTensorInfo(E.shape,E.dtype,E.values)}var MS={kernelName:fa,backendName:"cpu",kernelFunc:ug};function qz(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,dy:s}=e,{strides:a,dilations:i,pad:p,dimRoundingMode:l,filterShape:u}=r;U([n,s],"depthwiseConv2dNativeBackpropFilter");let c=N.computeConv2DInfo(n.shape,u,a,i,p,l,!0),{strideHeight:m,strideWidth:d,filterHeight:f,filterWidth:g}=c,h=new Se(c.filterShape,"float32"),x=c.padInfo.left,b=c.padInfo.top,w=c.outChannels/c.inChannels,v=t.data.get(n.dataId).values,k=new Se(n.shape,n.dtype,v),E=t.data.get(s.dataId).values,$=new Se(s.shape,s.dtype,E);for(let A=0;A<f;++A){let D=Math.max(0,Math.ceil((b-A)/m)),R=Math.min(c.outHeight,(c.inHeight+b-A)/m);for(let P=0;P<g;++P){let V=Math.max(0,Math.ceil((x-P)/d)),L=Math.min(c.outWidth,(c.inWidth+x-P)/d);for(let B=0;B<c.outChannels;++B){let M=Math.trunc(B/w),W=B%w,G=0;for(let z=0;z<c.batchSize;++z)for(let H=D;H<R;++H){let j=A+H*m-b;for(let X=V;X<L;++X){let Z=P+X*d-x;G+=k.get(z,j,Z,M)*$.get(z,H,X,B)}}h.set(G,A,P,M,W)}}}return t.makeTensorInfo(h.shape,h.dtype,h.values)}var BS={kernelName:ha,backendName:"cpu",kernelFunc:qz};function Kz(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,filter:s}=e,{strides:a,dilations:i,pad:p,dimRoundingMode:l,inputShape:u}=r;U([n,s],"depthwiseConv2DNativeBackpropInput");let c=y.computeStrides(n.shape),m=y.computeStrides(s.shape),d=N.computeConv2DInfo(u,s.shape,a,i,p,l,!0),f=new Se(d.inShape,"float32"),g=f.values,[h,x,b]=f.strides,w=t.data.get(n.dataId).values,[v,k,E]=c,$=t.data.get(s.dataId).values,[A,D,R]=m,{batchSize:P,filterHeight:V,filterWidth:L,inChannels:B,inHeight:M,inWidth:W,outChannels:G,outHeight:z,outWidth:H,strideHeight:j,strideWidth:X}=d,Z=V-1-d.padInfo.top,Q=L-1-d.padInfo.left,ee=G/B;for(let Y=0;Y<P;++Y)for(let re=0;re<B;++re)for(let le=0;le<M;++le){let de=le-Z,ce=Math.max(0,Math.ceil(de/j)),be=Math.min(z,(V+de)/j);for(let ve=0;ve<W;++ve){let De=ve-Q,Le=Math.max(0,Math.ceil(De/X)),Je=Math.min(H,(L+De)/X),Me=0;for(let Re=ce;Re<be;++Re){let Qe=Re*j-de;for(let qe=Le;qe<Je;++qe){let qo=qe*X-De,ht=v*Y+k*Re+E*qe,cr=A*(V-1-Qe)+D*(L-1-qo)+R*re;for(let Zt=0;Zt<ee;++Zt){let Wr=re*ee+Zt,xo=w[ht+Wr],Ko=$[cr+Zt];Me+=xo*Ko}}}g[h*Y+x*le+b*ve+re]=Me}}return t.makeTensorInfo(f.shape,f.dtype,f.values)}var zS={kernelName:ga,backendName:"cpu",kernelFunc:Kz};function jz(o){let{inputs:e,backend:t}=o,{x:r}=e,n=y.sizeFromShape(r.shape),s=t.data.get(r.dataId).values,a=oe([n,n],r.dtype),i=a.values;for(let l=0;l<s.length;l++)i[l*n+l]=s[l];let p=[...r.shape,...r.shape];return t.makeTensorInfo(p,a.dtype,a.values)}var US={kernelName:xa,backendName:"cpu",kernelFunc:jz};var WS={kernelName:ya,backendName:"cpu",kernelFunc:({inputs:o,backend:e,attrs:t})=>{let{x:r,filter:n}=o,{strides:s,pad:a,dilations:i}=t,p=e,l=p.data.get(r.dataId).values,u=r.shape.length,c=p.data.get(n.dataId).values,m=n.shape.length,{batchSize:d,inHeight:f,inWidth:g,inChannels:h,outHeight:x,outWidth:b,padInfo:w,strideHeight:v,strideWidth:k,filterHeight:E,filterWidth:$,dilationHeight:A,dilationWidth:D,outShape:R}=N.computeDilation2DInfo(r.shape,n.shape,s,a,"NHWC",i),P=y.sizeFromShape(R),V=R.length,L=y.getArrayFromDType(r.dtype,P);for(let M=0;M<d;++M)for(let W=0;W<x;++W){let G=W*v-w.top;for(let z=0;z<b;++z){let H=z*k-w.left;for(let j=0;j<h;++j){let X=Number.MIN_SAFE_INTEGER;for(let Q=0;Q<E;++Q){let ee=G+Q*A;if(ee>=0&&ee<f)for(let Y=0;Y<$;++Y){let re=H+Y*D;if(re>=0&&re<g){let le=y.locToIndex([M,ee,re,j],u,y.computeStrides(r.shape)),de=y.locToIndex([Q,Y,j],m,y.computeStrides(n.shape)),ce=l[le]+c[de];ce>X&&(X=ce)}}}let Z=y.locToIndex([M,W,z,j],V,y.computeStrides(R));L[Z]=X}}}return{dataId:p.write(y.toTypedArray(L,r.dtype),R,r.dtype),shape:R,dtype:r.dtype}}};var GS={kernelName:zd,backendName:"cpu",kernelFunc:({inputs:o,backend:e,attrs:t})=>{let{x:r,filter:n,dy:s}=o,{strides:a,pad:i,dilations:p}=t,l=e,u=y.toNestedArray(r.shape,l.data.get(r.dataId).values),c=y.toNestedArray(n.shape,l.data.get(n.dataId).values),{batchSize:m,inHeight:d,inWidth:f,inChannels:g,outHeight:h,outWidth:x,padInfo:b,strideHeight:w,strideWidth:v,filterHeight:k,filterWidth:E,dilationHeight:$,dilationWidth:A,outShape:D}=N.computeDilation2DInfo(r.shape,n.shape,a,i,"NHWC",p);y.assert(s.rank===D.length,()=>`Error in ${zd}, dy must have the same rank as output ${D.length}, but got ${s.rank}`);let R=y.toNestedArray(D,l.data.get(s.dataId).values),P=y.makeZerosNestedTypedArray(n.shape,n.dtype);for(let L=0;L<m;++L)for(let B=0;B<h;++B){let M=B*w-b.top;for(let W=0;W<x;++W){let G=W*v-b.left;for(let z=0;z<g;++z){let H=Number.MIN_SAFE_INTEGER,j=0,X=0;for(let Z=0;Z<k;++Z){let Q=M+Z*$;if(Q>=0&&Q<d)for(let ee=0;ee<E;++ee){let Y=G+ee*A;if(Y>=0&&Y<f){let re=u[L][Q][Y][z]+c[Z][ee][z];re>H&&(H=re,j=Z,X=ee)}}}P[j][X][z]+=R[L][B][W][z]}}}return{dataId:l.write(y.toTypedArray(P,r.dtype),n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}};var HS={kernelName:Bd,backendName:"cpu",kernelFunc:({inputs:o,backend:e,attrs:t})=>{let{x:r,filter:n,dy:s}=o,{strides:a,pad:i,dilations:p}=t,l=e,u=y.toNestedArray(r.shape,l.data.get(r.dataId).values),c=y.toNestedArray(n.shape,l.data.get(n.dataId).values),{batchSize:m,inHeight:d,inWidth:f,inChannels:g,outHeight:h,outWidth:x,padInfo:b,strideHeight:w,strideWidth:v,filterHeight:k,filterWidth:E,dilationHeight:$,dilationWidth:A,outShape:D}=N.computeDilation2DInfo(r.shape,n.shape,a,i,"NHWC",p);y.assert(s.rank===D.length,()=>`Error in ${Bd}, dy must have the same rank as output ${D.length}, but got ${s.rank}`);let R=y.toNestedArray(D,l.data.get(s.dataId).values),P=y.makeZerosNestedTypedArray(r.shape,r.dtype);for(let L=0;L<m;++L)for(let B=0;B<h;++B){let M=B*w-b.top;for(let W=0;W<x;++W){let G=W*v-b.left;for(let z=0;z<g;++z){let H=Number.MIN_SAFE_INTEGER,j=M<0?0:M,X=G<0?0:G;for(let Z=0;Z<k;++Z){let Q=M+Z*$;if(Q>=0&&Q<d)for(let ee=0;ee<E;++ee){let Y=G+ee*A;if(Y>=0&&Y<f){let re=u[L][Q][Y][z]+c[Z][ee][z];re>H&&(H=re,j=Q,X=Y)}}}P[L][j][X][z]+=R[L][B][W][z]}}}return{dataId:l.write(y.toTypedArray(P,r.dtype),r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};function Xz(o){let{inputs:e,backend:t,attrs:r}=o,{image:n}=e,{canvas:s,options:a}=r,{contextOptions:i,imageOptions:p}=a||{},l=p?.alpha||1,u=i?.contextType||"2d";if(u!=="2d")throw new Error(`Context type ${i.contextType} is not supported by the CPU backend.`);let c=s.getContext(u,i?.contextAttributes||{});if(c==null)throw new Error(`Could not get the context with ${u} type.`);let[m,d]=n.shape.slice(0,2),f=n.shape.length===2?1:n.shape[2],g=t.data.get(n.dataId).values,h=n.dtype==="float32"?255:1,x=new Uint8ClampedArray(d*m*4);for(let w=0;w<m*d;++w){let v=[0,0,0,255*l];for(let E=0;E<f;E++){let $=g[w*f+E];if(n.dtype==="float32"){if($<0||$>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${$}.`)}else if(n.dtype==="int32"&&($<0||$>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${$}.`);f===1?(v[0]=$*h,v[1]=$*h,v[2]=$*h):v[E]=$*h}let k=w*4;x[k+0]=Math.round(v[0]),x[k+1]=Math.round(v[1]),x[k+2]=Math.round(v[2]),x[k+3]=Math.round(v[3])}s.width=d,s.height=m;let b=new ImageData(x,d,m);return c.putImageData(b,0,0),n}var qS={kernelName:Ip,backendName:"cpu",kernelFunc:Xz};function ur(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,keepDims:a}=r;U(n,"sum");let i;n.dtype==="bool"?i=mo({inputs:{x:n},backend:t,attrs:{dtype:"int32"}}):i=Tt({inputs:{x:n},backend:t});let p=i.shape.length,l=y.parseAxisParam(s,i.shape),u=N.getAxesPermutation(l,p),c=l,m=i;u!=null&&(m=We({inputs:{x:i},backend:t,attrs:{perm:u}}),c=N.getInnerMostAxes(c.length,p)),N.assertAxesAreInnerMostDims("sum",c,m.shape.length);let[d,f]=N.computeOutAndReduceShapes(m.shape,c),g=N.upcastType(m.dtype,"int32"),h=rp(t,d,g),x=y.sizeFromShape(f),b=t.data.get(h.dataId).values,w=t.data.get(m.dataId).values;for(let v=0;v<b.length;++v){let k=v*x,E=0;for(let $=0;$<x;++$)E+=w[k+$];b[v]=E}if(a){let v=N.expandShapeToKeepDim(h.shape,l),k=h;h=ye({inputs:{x:h},backend:t,attrs:{shape:v}}),t.disposeIntermediateTensorInfo(k)}return t.disposeIntermediateTensorInfo(i),u!=null&&t.disposeIntermediateTensorInfo(m),h}var KS={kernelName:ui,backendName:"cpu",kernelFunc:ur};function Qz(o){let{inputs:e,backend:t,attrs:r}=o,{equation:n}=r,s=e,{allDims:a,summedDims:i,idDims:p}=N.decodeEinsumEquation(n,s.length);N.checkEinsumDimSizes(a.length,p,s);let{path:l,steps:u}=N.getEinsumComputePath(i,p),c=u.length,m=null,d=a.length,f=[];for(let g=0;g<c;++g){for(let h of u[g]){let{permutationIndices:x,expandDims:b}=N.getEinsumPermutation(d,p[h]),w;N.isIdentityPermutation(x)?w=s[h]:(w=We({inputs:{x:s[h]},backend:t,attrs:{perm:x}}),f.push(w));let v=w.shape.slice();for(let k=0;k<b.length;++k)v.splice(b[k],0,1);y.arraysEqual(w.shape,v)||(w=ye({inputs:{x:w},backend:t,attrs:{shape:v}}),f.push(w)),m===null?m=w:(m=Es({inputs:{a:w,b:m},backend:t}),f.push(m))}g<c-1&&(l[g]>=0&&(m=ur({inputs:{x:m},backend:t,attrs:{axis:l[g]-(a.length-d),keepDims:!1}}),f.push(m)),d--)}for(let g of f)g!==m&&t.disposeIntermediateTensorInfo(g);return m}var jS={kernelName:ba,backendName:"cpu",kernelFunc:Qz};function Yz(o){let{inputs:e,backend:t}=o,{dy:r,y:n}=e;U([r,n],"eluGrad");let s=new Float32Array(y.sizeFromShape(n.shape)),a=t.data.get(n.dataId).values,i=t.data.get(r.dataId).values;for(let p=0;p<a.length;++p){let l=a[p];l>=0?s[p]=i[p]:s[p]=i[p]*(l+1)}return t.makeTensorInfo(n.shape,"float32",s)}var XS={kernelName:Cl,backendName:"cpu",kernelFunc:Yz};var Zz=N.ERF_P,Jz=N.ERF_A1,e4=N.ERF_A2,t4=N.ERF_A3,o4=N.ERF_A4,r4=N.ERF_A5,n4=ie(ln,o=>{let e=Math.sign(o),t=Math.abs(o),r=1/(1+Zz*t);return e*(1-((((r4*r+o4)*r+t4)*r+e4)*r+Jz)*r*Math.exp(-t*t))}),QS={kernelName:ln,backendName:"cpu",kernelFunc:n4};function yp(o){let{inputs:e,backend:t,attrs:r}=o,{input:n}=e,{dim:s}=r,a=n.shape.length,i=n.shape.slice(),p=s;return s<0&&(y.assert(-(a+1)<=s,()=>`Axis must be in the interval [${-(a+1)}, ${a}]`),p=a+s+1),i.splice(p,0,1),ye({inputs:{x:n},backend:t,attrs:{shape:i}})}var YS={kernelName:_a,backendName:"cpu",kernelFunc:yp};var s4=xe((o,e)=>o/e),ll=Ce(an,s4),ul={kernelName:an,backendName:"cpu",kernelFunc:ll};function ad(o,e,t){let r=o.shape,n=r[0],s=r[1],a=t.data.get(o.dataId),i=a.complexTensorInfos.real,p=a.complexTensorInfos.imag,l=[n,s],u=y.sizeFromShape(l),c=y.getTypedArrayFromDType("float32",u),m=y.getTypedArrayFromDType("float32",u);for(let h=0;h<n;h++){let x=ho({inputs:{x:i},backend:t,attrs:{begin:[h,0],size:[1,s]}}),b=ho({inputs:{x:p},backend:t,attrs:{begin:[h,0],size:[1,s]}}),w=st({inputs:{real:x,imag:b},backend:t}),{real:v,imag:k}=a4(w,e,t),E=N.mergeRealAndImagArrays(v,k);for(let $=0;$<s;$++){let A=N.getComplexWithIndex(E,$);c[h*s+$]=A.real,m[h*s+$]=A.imag}t.disposeIntermediateTensorInfo(x),t.disposeIntermediateTensorInfo(b),t.disposeIntermediateTensorInfo(w)}let d=t.makeTensorInfo(l,"float32",c),f=t.makeTensorInfo(l,"float32",m),g=st({inputs:{real:d,imag:f},backend:t});return t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),g}function a4(o,e,t){let r=y.sizeFromShape(o.shape),n=t.data.get(o.dataId),s=t.data.get(n.complexTensorInfos.real.dataId).values,a=t.data.get(n.complexTensorInfos.imag.dataId).values;if(i4(r)){let i=cg(s,a,r,e,t),p=[o.shape[0],o.shape[1]];if(e){let l=t.makeTensorInfo(p,"float32",i.real),u=t.makeTensorInfo(p,"float32",i.imag),c=t.makeTensorInfo([],"float32",y.createScalarValue(r,"float32")),m=Tt({inputs:{x:c},backend:t}),d=ul.kernelFunc({inputs:{a:l,b:c},backend:t}),f=ul.kernelFunc({inputs:{a:u,b:m},backend:t}),g=t.data.get(d.dataId).values,h=t.data.get(f.dataId).values;return t.disposeIntermediateTensorInfo(l),t.disposeIntermediateTensorInfo(u),t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),{real:g,imag:h}}return i}else{let i=N.mergeRealAndImagArrays(s,a),p=p4(i,r,e);return N.splitRealAndImagArrays(p)}}function i4(o){return(o&o-1)===0}function cg(o,e,t,r,n){if(t===1)return{real:o,imag:e};let s=N.mergeRealAndImagArrays(o,e),a=t/2,i=N.complexWithEvenIndex(s),p=i.real,l=i.imag,u=[p.length],c=n.makeTensorInfo(u,"float32",p),m=n.makeTensorInfo(u,"float32",l),d=st({inputs:{real:c,imag:m},backend:n}),f=N.complexWithOddIndex(s),g=f.real,h=f.imag,x=[g.length],b=n.makeTensorInfo(x,"float32",g),w=n.makeTensorInfo(x,"float32",h),v=st({inputs:{real:b,imag:w},backend:n}),k=cg(p,l,a,r,n),E=k.real,$=k.imag,A=[E.length],D=n.makeTensorInfo(A,"float32",E),R=n.makeTensorInfo(A,"float32",$),P=st({inputs:{real:D,imag:R},backend:n}),V=cg(g,h,a,r,n),L=V.real,B=V.imag,M=[L.length],W=n.makeTensorInfo(M,"float32",L),G=n.makeTensorInfo(M,"float32",B),z=st({inputs:{real:W,imag:G},backend:n}),H=N.exponents(t,r),j=[H.real.length],X=n.makeTensorInfo(j,"float32",H.real),Z=n.makeTensorInfo(j,"float32",H.imag),Q=st({inputs:{real:X,imag:Z},backend:n}),ee=Es({inputs:{a:Q,b:z},backend:n}),Y=Wo({inputs:{a:P,b:ee},backend:n}),re=Jp({inputs:{a:P,b:ee},backend:n}),le=co({inputs:{input:Y},backend:n}),de=co({inputs:{input:re},backend:n}),ce=Ho({inputs:{input:Y},backend:n}),be=Ho({inputs:{input:re},backend:n}),ve=zr({inputs:[le,de],backend:n,attrs:{axis:0}}),De=zr({inputs:[ce,be],backend:n,attrs:{axis:0}}),Le=n.data.get(ve.dataId).values,Je=n.data.get(De.dataId).values;return n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(b),n.disposeIntermediateTensorInfo(w),n.disposeIntermediateTensorInfo(v),n.disposeIntermediateTensorInfo(D),n.disposeIntermediateTensorInfo(R),n.disposeIntermediateTensorInfo(P),n.disposeIntermediateTensorInfo(W),n.disposeIntermediateTensorInfo(G),n.disposeIntermediateTensorInfo(z),n.disposeIntermediateTensorInfo(X),n.disposeIntermediateTensorInfo(Z),n.disposeIntermediateTensorInfo(Q),n.disposeIntermediateTensorInfo(ee),n.disposeIntermediateTensorInfo(Y),n.disposeIntermediateTensorInfo(re),n.disposeIntermediateTensorInfo(le),n.disposeIntermediateTensorInfo(ce),n.disposeIntermediateTensorInfo(de),n.disposeIntermediateTensorInfo(be),n.disposeIntermediateTensorInfo(ve),n.disposeIntermediateTensorInfo(De),{real:Le,imag:Je}}function p4(o,e,t){let r=new Float32Array(e*2);for(let n=0;n<e;n++){let s=0,a=0;for(let i=0;i<e;i++){let p=N.exponent(n*i,e,t),l=N.getComplexWithIndex(o,i);s+=l.real*p.real-l.imag*p.imag,a+=l.real*p.imag+l.imag*p.real}t&&(s/=e,a/=e),N.assignToTypedArray(r,s,a,n)}return r}function l4(o){let{inputs:e,backend:t}=o,{input:r}=e,n=y.sizeFromShape(r.shape),s=r.shape[r.shape.length-1],a=n/s,i=ye({inputs:{x:r},backend:t,attrs:{shape:[a,s]}}),p=ad(i,!1,t),l=ye({inputs:{x:p},backend:t,attrs:{shape:r.shape}});return t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(p),l}var ZS={kernelName:Ta,backendName:"cpu",kernelFunc:l4};function cl(o){let{backend:e,attrs:t}=o,{shape:r,value:n,dtype:s}=t,a=s||y.inferDtype(n),i=y.getArrayFromDType(a,y.sizeFromShape(r));return u4(i,n,a),e.makeTensorInfo(r,a,i)}var JS={kernelName:va,backendName:"cpu",kernelFunc:cl};function u4(o,e,t){o.fill(e)}var e2={kernelName:wa,backendName:"cpu",kernelFunc:({inputs:o,attrs:e,backend:t})=>{let{image:r}=o,n=t,s=y.getTypedArrayFromDType(r.dtype,y.sizeFromShape(r.shape)),[a,i,p,l]=r.shape,u=n.data.get(r.dataId).values;for(let m=0;m<a;m++){let d=m*p*i*l;for(let f=0;f<i;f++){let g=f*(p*l);for(let h=0;h<p;h++){let x=h*l;for(let b=0;b<l;b++){let w=Math.round(p-h-1),v=d+g+x+b,k=u[v];if(w>=0&&w<p){let E=w*l,$=d+g+E+b;k=u[$]}s[v]=k}}}}return{dataId:n.write(s,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};function c4(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,filter:s,bias:a,preluActivationWeights:i}=e,{strides:p,pad:l,dataFormat:u,dilations:c,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=r,g=lg({inputs:{x:n,filter:s},backend:t,attrs:{strides:p,pad:l,dataFormat:u,dilations:c,dimRoundingMode:m}});if(a){let h=g;if(u==="NCHW"&&a.shape.length===1&&a.shape[0]!==1){let x=ye({inputs:{x:a},backend:t,attrs:{shape:[a.shape[0],1,1]}});g=Wo({inputs:{a:g,b:x},backend:t}),t.disposeIntermediateTensorInfo(x)}else g=Wo({inputs:{a:g,b:a},backend:t});t.disposeIntermediateTensorInfo(h)}if(d){let h=g;if(u==="NCHW"&&d==="prelu"&&i.shape.length===1&&i.shape[0]!==1){let x=ye({inputs:{x:i},backend:t,attrs:{shape:[i.shape[0],1,1]}});g=Ps(t,g,d,x,f),t.disposeIntermediateTensorInfo(x)}else g=Ps(t,g,d,i,f);t.disposeIntermediateTensorInfo(h)}return g}var t2={kernelName:Zn,backendName:"cpu",kernelFunc:c4};function m4(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,filter:s,bias:a,preluActivationWeights:i}=e,{strides:p,pad:l,dataFormat:u,dilations:c,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=r,g=ug({inputs:{x:n,filter:s},backend:t,attrs:{strides:p,pad:l,dataFormat:u,dilations:c,dimRoundingMode:m}});if(a){let h=g;g=Wo({inputs:{a:g,b:a},backend:t}),t.disposeIntermediateTensorInfo(h)}if(d){let h=g;g=Ps(t,g,d,i,f),t.disposeIntermediateTensorInfo(h)}return g}var o2={kernelName:Jn,backendName:"cpu",kernelFunc:m4};function d4(o){let{inputs:e,backend:t}=o,{params:r,indices:n}=e,s=y.sizeFromShape(r.shape),a=n.shape,i=a[a.length-1],[p,l,u,c]=N.prepareAndValidate(r,n);if(l===0)return t.makeTensorInfo(p,r.dtype,[]);let m=t.data.get(n.dataId).values,d=t.bufferSync(r),f=dc(m,d,r.dtype,l,i,u,c,r.shape,s);return t.makeTensorInfo(p,r.dtype,f.values)}var r2={kernelName:Sa,backendName:"cpu",kernelFunc:d4};function f4(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,indices:s}=e,{axis:a,batchDims:i}=r;U([n,s],"gatherV2");let p=y.parseAxisParam(a,n.shape)[0],l=t.data.get(s.dataId).values,u=n.shape[p];for(let v=0;v<l.length;++v){let k=l[v];y.assert(k<=u-1&&k>=0,()=>`GatherV2: the index value ${k} is not in [0, ${u-1}]`)}let c=i;i==null&&(c=0);let m=y.sizeFromShape(s.shape),d=N.segment_util.collectGatherOpShapeInfo(n,s,p,c),f=ye({inputs:{x:n},backend:t,attrs:{shape:[d.batchSize,d.outerSize,d.dimSize,d.sliceSize]}}),g=ye({inputs:{x:s},backend:t,attrs:{shape:[d.batchSize,m/d.batchSize]}}),h=[d.batchSize,d.outerSize,m/d.batchSize,d.sliceSize],x=t.bufferSync(g),b=t.bufferSync(f),w=fc(b,x,h);return t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(g),t.makeTensorInfo(d.outputShape,w.dtype,w.values)}var n2={kernelName:Na,backendName:"cpu",kernelFunc:f4};function h4(o){let{inputs:e,backend:t}=o,{input:r}=e,n=y.sizeFromShape(r.shape),s=r.shape[r.shape.length-1],a=n/s,i=ye({inputs:{x:r},backend:t,attrs:{shape:[a,s]}}),p=ad(i,!0,t),l=ye({inputs:{x:p},backend:t,attrs:{shape:r.shape}});return t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(p),l}var s2={kernelName:Ia,backendName:"cpu",kernelFunc:h4};var g4=ie(xn,o=>Number.isFinite(o)?1:0,"bool"),a2={kernelName:xn,backendName:"cpu",kernelFunc:g4};var x4=ie(yn,o=>Math.abs(o)===1/0?1:0,"bool"),i2={kernelName:yn,backendName:"cpu",kernelFunc:x4};var y4=ie(bn,o=>Number.isNaN(o)?1:0,"bool"),p2={kernelName:bn,backendName:"cpu",kernelFunc:y4};function b4(o){let{backend:e,attrs:t}=o,{start:r,stop:n,num:s}=t,a=hc(r,n,s);return e.makeTensorInfo([a.length],"float32",a)}var l2={kernelName:$a,backendName:"cpu",kernelFunc:b4};var _4=ie(wn,o=>Math.log1p(o)),u2={kernelName:wn,backendName:"cpu",kernelFunc:_4};var T4=xe((o,e)=>o&&e),v4=Ce(Cn,T4,null,"bool"),c2={kernelName:Cn,backendName:"cpu",kernelFunc:v4};var w4=ie(Nn,o=>o?0:1,"bool"),m2={kernelName:Nn,backendName:"cpu",kernelFunc:w4};var C4=xe((o,e)=>o||e),N4=Ce(Sn,C4,null,"bool"),d2={kernelName:Sn,backendName:"cpu",kernelFunc:N4};function S4(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{depthRadius:s,bias:a,alpha:i,beta:p}=r;U(n,"LRN");let l=n.shape[3],u=l-1,c=t.data.get(n.dataId).values,m=y.sizeFromShape(n.shape),d=new Float32Array(m);function f(g){let h=g%l,x=g-h+Math.max(0,h-s),b=g-h+Math.min(h+s,u),w=0;for(;x<=b;x++){let v=c[x];w+=v*v}return w}for(let g=0;g<m;g++){let h=f(g),x=c[g]*Math.pow(a+i*h,-p);d[g]=x}return t.makeTensorInfo(n.shape,n.dtype,d)}var f2={kernelName:Aa,backendName:"cpu",kernelFunc:S4};function I4(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,y:s,dy:a}=e,{depthRadius:i,bias:p,alpha:l,beta:u}=r;U(a,"LRNGrad");let c=y.sizeFromShape(a.shape),m=a.shape[3],d=t.data.get(a.dataId).values,f=t.data.get(n.dataId).values,g=t.data.get(s.dataId).values,h=new Float32Array(c),x=c;for(let b=0;b<x;b++){let w=b%m,v=b-w+Math.max(0,w-i),k=b-w+Math.min(m,w+i+1),E=0;for(let $=v;$<k;$++)E+=Math.pow(f[$],2);E=l*E+p;for(let $=v;$<k;$++){let A=-2*l*u*f[$]*g[b]/E;b===$&&(A+=Math.pow(E,-u)),A*=d[b],h[$]+=A}}return t.makeTensorInfo(a.shape,n.dtype,h)}var h2={kernelName:Nl,backendName:"cpu",kernelFunc:I4};function mg(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{reductionIndices:s,keepDims:a}=r,i=t,p=n.shape,l=p.length,u=y.parseAxisParam(s,p),c=u,m=N.getAxesPermutation(c,l),d=i.data.get(n.dataId).values;if(m!=null){let v=new Array(l);for(let k=0;k<v.length;k++)v[k]=p[m[k]];d=ap(d,p,n.dtype,m,v),c=N.getInnerMostAxes(c.length,l),p=v}U(n,"max"),N.assertAxesAreInnerMostDims("max",c,l);let[f,g]=N.computeOutAndReduceShapes(p,c),h=y.sizeFromShape(g),x=gc(d,h,f,n.dtype),b=i.write(x,f,n.dtype),w=f;return a&&(w=N.expandShapeToKeepDim(f,u)),{dataId:b,shape:w,dtype:n.dtype}}var g2={kernelName:Fa,backendName:"cpu",kernelFunc:mg};function k4(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e;U(n,"maxPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:p}=r,l=1;y.assert(N.eitherStridesOrDilationsAreOne(a,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${l}'`);let u=N.computePool2DInfo(n.shape,s,a,l,i,p),c;if(u.filterWidth===1&&u.filterHeight===1&&y.arraysEqual(u.inShape,u.outShape))c=Tt({inputs:{x:n},backend:t});else{let m=t.data.get(n.dataId).values,d=y.computeStrides(n.shape),f=xp(m,n.shape,n.dtype,d,u,"max");c=t.makeTensorInfo(u.outShape,n.dtype,f.values)}return c}var x2={kernelName:Da,backendName:"cpu",kernelFunc:k4};function E4(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{filterSize:s,strides:a,pad:i,dimRoundingMode:p,dataFormat:l}=r;U(n,"maxPool3d");let u=N.computePool3DInfo(n.shape,s,a,1,i,p,l),c=t.data.get(n.dataId).values,m=sd(c,n.shape,n.dtype,y.computeStrides(n.shape),u,"max");return t.makeTensorInfo(m.shape,"float32",m.values)}var y2={kernelName:Ra,backendName:"cpu",kernelFunc:E4};function $4(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,input:s}=e,{filterSize:a,strides:i,pad:p,dimRoundingMode:l}=r;U([n,s],"maxPool3DGrad");let u=N.computePool3DInfo(s.shape,a,i,1,p,l),c=t.bufferSync(s),m=dS(c,u),d=u.strideDepth,f=u.strideHeight,g=u.strideWidth,h=u.dilationDepth,x=u.dilationHeight,b=u.dilationWidth,w=u.effectiveFilterDepth,v=u.effectiveFilterHeight,k=u.effectiveFilterWidth,E=w-1-u.padInfo.front,$=k-1-u.padInfo.left,A=v-1-u.padInfo.top,D=oe(s.shape,"float32"),R=t.bufferSync(n);for(let P=0;P<u.batchSize;++P)for(let V=0;V<u.inChannels;++V)for(let L=0;L<u.inDepth;++L)for(let B=0;B<u.inHeight;++B)for(let M=0;M<u.inWidth;++M){let W=L-E,G=B-A,z=M-$,H=0;for(let j=0;j<w;j+=h){let X=(W+j)/d;if(!(X<0||X>=u.outDepth||Math.floor(X)!==X))for(let Z=0;Z<v;Z+=x){let Q=(G+Z)/f;if(!(Q<0||Q>=u.outHeight||Math.floor(Q)!==Q))for(let ee=0;ee<k;ee+=b){let Y=(z+ee)/g;if(Y<0||Y>=u.outWidth||Math.floor(Y)!==Y)continue;let re=w*v*k-1-m.get(P,X,Q,Y,V),le=j*v*k+Z*k+ee,de=re===le?1:0;if(de===0)continue;let ce=R.get(P,X,Q,Y,V);H+=ce*de}}}D.set(H,P,L,B,M,V)}return t.makeTensorInfo(D.shape,D.dtype,D.values)}var b2={kernelName:Il,backendName:"cpu",kernelFunc:$4};function A4(o){let{inputs:e,backend:t,attrs:r}=o,{dy:n,input:s,output:a}=e,i=s;U([s,a],"maxPoolGrad");let{filterSize:p,strides:l,pad:u,dimRoundingMode:c}=r,m=N.computePool2DInfo(i.shape,p,l,1,u,c),d=t.data.get(i.dataId).values,f=oe(m.outShape,i.dtype,nd(d,i.shape,i.dtype,m).values),g=m.strideHeight,h=m.strideWidth,x=m.dilationHeight,b=m.dilationWidth,w=m.effectiveFilterHeight,v=m.effectiveFilterWidth,k=v-1-m.padInfo.left,E=w-1-m.padInfo.top,$=oe(i.shape,"float32"),A=t.data.get(n.dataId).values,D=oe(n.shape,"float32",A);for(let R=0;R<m.batchSize;++R)for(let P=0;P<m.inChannels;++P)for(let V=0;V<m.inHeight;++V)for(let L=0;L<m.inWidth;++L){let B=V-E,M=L-k,W=0;for(let G=0;G<w;G+=x){let z=(B+G)/g;if(!(z<0||z>=m.outHeight||Math.floor(z)!==z))for(let H=0;H<v;H+=b){let j=(M+H)/h;if(j<0||j>=m.outWidth||Math.floor(j)!==j)continue;let X=w*v-1-f.get(R,z,j,P),Z=G*v+H,Q=X===Z?1:0;if(Q===0)continue;let ee=D.get(R,z,j,P);W+=ee*Q}}$.set(W,R,V,L,P)}return t.makeTensorInfo($.shape,$.dtype,$.values)}var _2={kernelName:Sl,backendName:"cpu",kernelFunc:A4};function T2(o,e,t,r,n){let s=y.computeStrides(e),a=xp(o,e,t,s,n,"max"),i=nd(o,e,t,n,!0,r);return[a.values,i.values]}var v2={kernelName:Oa,backendName:"cpu",kernelFunc:({inputs:o,attrs:e,backend:t})=>{let{x:r}=o,{filterSize:n,strides:s,pad:a,includeBatchInIndex:i}=e,p=t;U(r,"MaxPoolWithArgmax");let l=p.data.get(r.dataId).values,u=N.computePool2DInfo(r.shape,n,s,[1,1],a),[c,m]=T2(l,r.shape,r.dtype,i,u),d=p.write(c,u.outShape,r.dtype),f=p.write(m,u.outShape,r.dtype);return[{dataId:d,shape:u.outShape,dtype:r.dtype},{dataId:f,shape:u.outShape,dtype:"int32"}]}};function F4(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,keepDims:a}=r,i=y.parseAxisParam(s,n.shape),l=N.computeOutAndReduceShapes(n.shape,i)[1],u=y.sizeFromShape(l),c=[],m=t.makeTensorInfo([],"float32",new Float32Array([u]));c.push(m);let d=mo({inputs:{x:n},backend:t,attrs:{dtype:"float32"}});c.push(d);let f=ll({inputs:{a:d,b:m},backend:t});c.push(f);let g=ur({inputs:{x:f},backend:t,attrs:{axis:s,keepDims:a}});return c.forEach(h=>t.disposeIntermediateTensorInfo(h)),g}var w2={kernelName:Pa,backendName:"cpu",kernelFunc:F4};function D4(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{axis:s,keepDims:a}=r;U(n,"min");let i=y.parseAxisParam(s,n.shape),p=i,l=N.getAxesPermutation(p,n.shape.length),u=n;l!=null&&(u=We({inputs:{x:n},backend:t,attrs:{perm:l}}),p=N.getInnerMostAxes(p.length,n.shape.length)),N.assertAxesAreInnerMostDims("min",p,u.shape.length);let[c,m]=N.computeOutAndReduceShapes(u.shape,p),d=y.sizeFromShape(m),f=y.makeZerosTypedArray(y.sizeFromShape(c),u.dtype),g=t.data.get(u.dataId).values;for(let x=0;x<f.length;++x){let b=x*d,w=g[b];for(let v=0;v<d;++v){let k=g[b+v];(Number.isNaN(k)||k<w)&&(w=k)}f[x]=w}l!=null&&t.disposeIntermediateTensorInfo(u);let h=t.makeTensorInfo(c,u.dtype,f);if(a){let x=N.expandShapeToKeepDim(c,i),b=ye({inputs:{x:h},backend:t,attrs:{shape:x}});return t.disposeIntermediateTensorInfo(h),b}return h}var C2={kernelName:Va,backendName:"cpu",kernelFunc:D4};function R4(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{paddings:s,mode:a}=r;U(n,"mirrorPad");let i=s.map((w,v)=>w[0]+n.shape[v]+w[1]),p=s.map(w=>w[0]),l=s.map((w,v)=>w[0]+n.shape[v]),u=a==="reflect"?0:1,c=t.data.get(n.dataId).values,m=n.shape.length,d=y.computeStrides(n.shape),f=y.sizeFromShape(i),g=i.length,h=y.computeStrides(i),x=y.getTypedArrayFromDType(n.dtype,f);for(let w=0;w<f;w++){let v=y.indexToLoc(w,g,h);for(let E=0;E<g;E++)v[E]<p[E]?v[E]=p[E]*2-v[E]-u:v[E]>=l[E]&&(v[E]=(l[E]-1)*2-v[E]+u);v=v.map((E,$)=>E-p[$]);let k=y.locToIndex(v,m,d);x[w]=c[k]}return{dataId:t.write(x,i,n.dtype),shape:i,dtype:n.dtype}}var N2={kernelName:La,backendName:"cpu",kernelFunc:R4};var O4=xe((o,e)=>{let t=o%e;return o<0&&e<0||o>=0&&e>=0?t:(t+e)%e}),P4=Ce(En,O4),S2={kernelName:En,backendName:"cpu",kernelFunc:P4};var k2=$d(kf());function dg(o){let{inputs:e,backend:t,attrs:r}=o,{logits:n}=e,{dim:s}=r,a=n.shape.length,i=s;if(i===-1&&(i=a-1),i!==a-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${a} and dim was ${i}`);let p=y.parseAxisParam([i],n.shape),l=mg({inputs:{x:n},backend:t,attrs:{reductionIndices:p,keepDims:!1}}),u=N.expandShapeToKeepDim(l.shape,p),c=ye({inputs:{x:l},backend:t,attrs:{shape:u}}),m=Jp({inputs:{a:n,b:c},backend:t}),d=mh({inputs:{x:m},backend:t}),f=ur({inputs:{x:d},backend:t,attrs:{axis:p,keepDims:!1}}),g=ye({inputs:{x:f},backend:t,attrs:{shape:u}}),h=ll({inputs:{a:d,b:g},backend:t});return t.disposeIntermediateTensorInfo(l),t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(g),h}var I2={kernelName:di,backendName:"cpu",kernelFunc:dg};function V4(o){let{inputs:e,backend:t,attrs:r}=o,{logits:n}=e,{numSamples:s,seed:a,normalized:i}=r;U(n,"multinomial");let p=i?n:dg({inputs:{logits:n},backend:t,attrs:{dim:-1}}),l=p.shape[0],u=p.shape[1],c=t.data.get(p.dataId).values,m=[l,s],d=y.makeZerosTypedArray(y.sizeFromShape(m),"int32");for(let f=0;f<l;++f){let g=f*u,h=new Float32Array(u-1);h[0]=c[g];for(let w=1;w<h.length;++w)h[w]=h[w-1]+c[g+w];let x=k2.alea(a.toString()),b=f*s;for(let w=0;w<s;++w){let v=x();d[b+w]=h.length;for(let k=0;k<h.length;k++)if(v<h[k]){d[b+w]=k;break}}}return i||t.disposeIntermediateTensorInfo(p),t.makeTensorInfo(m,"int32",d)}var E2={kernelName:Ma,backendName:"cpu",kernelFunc:V4};var L4=bt.nonMaxSuppressionV3Impl;function M4(o){let{inputs:e,backend:t,attrs:r}=o,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p}=r;U(n,"NonMaxSuppression");let l=t.data.get(n.dataId).values,u=t.data.get(s.dataId).values,{selectedIndices:c}=L4(l,u,a,i,p);return t.makeTensorInfo([c.length],"int32",new Int32Array(c))}var $2={kernelName:za,backendName:"cpu",kernelFunc:M4};var B4=bt.nonMaxSuppressionV4Impl;function z4(o){let{inputs:e,backend:t,attrs:r}=o,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p,padToMaxOutputSize:l}=r;U(n,"NonMaxSuppressionPadded");let u=t.data.get(n.dataId).values,c=t.data.get(s.dataId).values,{selectedIndices:m,validOutputs:d}=B4(u,c,a,i,p,l);return[t.makeTensorInfo([m.length],"int32",new Int32Array(m)),t.makeTensorInfo([],"int32",new Int32Array([d]))]}var A2={kernelName:Ua,backendName:"cpu",kernelFunc:z4};var U4=bt.nonMaxSuppressionV5Impl;function W4(o){let{inputs:e,backend:t,attrs:r}=o,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p,softNmsSigma:l}=r;U(n,"NonMaxSuppressionWithScore");let u=t.data.get(n.dataId).values,c=t.data.get(s.dataId).values,m=a,d=i,f=p,g=l,{selectedIndices:h,selectedScores:x}=U4(u,c,m,d,f,g);return[t.makeTensorInfo([h.length],"int32",new Int32Array(h)),t.makeTensorInfo([x.length],"float32",new Float32Array(x))]}var F2={kernelName:Wa,backendName:"cpu",kernelFunc:W4};function G4(o){let{inputs:e,backend:t,attrs:r}=o,{indices:n}=e,{dtype:s,depth:a,onValue:i,offValue:p}=r;U(n,"oneHot");let l=y.sizeFromShape(n.shape),u=new Float32Array(l*a);u.fill(p);let c=t.data.get(n.dataId).values;for(let m=0;m<l;++m)c[m]>=0&&c[m]<a&&(u[m*a+c[m]]=i);return t.makeTensorInfo([...n.shape,a],s,u)}var D2={kernelName:Ha,backendName:"cpu",kernelFunc:G4};function ml(o){let{inputs:e,backend:t}=o,{x:r}=e;if(r.dtype==="string")throw new Error("zerosLike is not supported for string tensors");if(r.dtype==="complex64"){let n=co({inputs:{input:r},backend:t}),s=ml({inputs:{x:n},backend:t}),a=Ho({inputs:{input:r},backend:t}),i=ml({inputs:{x:a},backend:t}),p=st({inputs:{real:s,imag:i},backend:t});return t.disposeIntermediateTensorInfo(n),t.disposeIntermediateTensorInfo(s),t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(i),p}else return cl({backend:t,attrs:{shape:r.shape,value:0,dtype:r.dtype}})}var R2={kernelName:ki,backendName:"cpu",kernelFunc:ml};function O2(o){let{inputs:e,backend:t}=o,{x:r}=e;if(r.dtype==="string")throw new Error("onesLike is not supported for string tensors");if(r.dtype==="complex64"){let n=co({inputs:{input:r},backend:t}),s=O2({inputs:{x:n},backend:t}),a=Ho({inputs:{input:r},backend:t}),i=ml({inputs:{x:a},backend:t}),p=st({inputs:{real:s,imag:i},backend:t});return t.disposeIntermediateTensorInfo(n),t.disposeIntermediateTensorInfo(s),t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(i),p}else return cl({backend:t,attrs:{shape:r.shape,value:1,dtype:r.dtype}})}var P2={kernelName:Ga,backendName:"cpu",kernelFunc:O2};function fg(o){let{inputs:e,backend:t,attrs:r}=o,{axis:n}=r;if(e.length===1)return yp({inputs:{input:e[0]},backend:t,attrs:{dim:n}});let s=e[0].shape,a=e[0].dtype;e.forEach(u=>{y.assertShapesMatch(s,u.shape,"All tensors passed to stack must have matching shapes"),y.assert(a===u.dtype,()=>"All tensors passed to stack must have matching dtypes")});let i=[],p=e.map(u=>{let c=yp({inputs:{input:u},backend:t,attrs:{dim:n}});return i.push(c),c}),l=zr({inputs:p,backend:t,attrs:{axis:n}});return i.forEach(u=>t.disposeIntermediateTensorInfo(u)),l}var V2={kernelName:qa,backendName:"cpu",kernelFunc:fg};function H4(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{paddings:s,constantValue:a}=r;U(n,"pad");let i=s.map((b,w)=>b[0]+n.shape[w]+b[1]),p=s.map(b=>b[0]),l=t.data.get(n.dataId).values,u=y.sizeFromShape(n.shape),c=n.shape.length,m=y.computeStrides(n.shape),d=y.sizeFromShape(i),f=i.length,g=y.computeStrides(i),h=y.getTypedArrayFromDType(n.dtype,d);a!==0&&h.fill(a);for(let b=0;b<u;b++){let v=y.indexToLoc(b,c,m).map((E,$)=>E+p[$]),k=y.locToIndex(v,f,g);h[k]=l[b]}return{dataId:t.write(h,i,n.dtype),shape:i,dtype:n.dtype}}var id={kernelName:Ka,backendName:"cpu",kernelFunc:H4};var q4=xe((o,e)=>Math.pow(o,e)),K4=Ce(Fn,q4),L2={kernelName:Fn,backendName:"cpu",kernelFunc:K4};function j4(o){let{inputs:e,backend:t,attrs:r}=o,{paramsNestedSplits:n,paramsDenseValues:s,indices:a}=e,{outputRaggedRank:i}=r,p=n.map(x=>t.data.get(x.dataId).values),l=n.map(x=>x.shape),u=t.data.get(s.dataId).values,c=t.data.get(a.dataId).values,[m,d,f]=xc(p,l,u,s.shape,s.dtype,c,a.shape,i),g=m.map(x=>t.makeTensorInfo([x.length],"int32",x)),h=t.makeTensorInfo(f,s.dtype,d);return g.concat([h])}var M2={kernelName:Qa,backendName:"cpu",kernelFunc:j4};function X4(o){let{inputs:e,backend:t}=o,{starts:r,limits:n,deltas:s}=e,a=t.data.get(r.dataId).values,i=t.data.get(n.dataId).values,p=t.data.get(s.dataId).values,[l,u]=yc(a,r.shape,r.dtype,i,n.shape,p,s.shape),c=t.makeTensorInfo([l.length],"int32",l),m=t.makeTensorInfo([u.length],r.dtype,u);return[c,m]}var B2={kernelName:Ya,backendName:"cpu",kernelFunc:X4};function Q4(o){let{inputs:e,backend:t,attrs:r}=o,{shape:n,values:s,defaultValue:a,rowPartitionTensors:i}=e,{rowPartitionTypes:p}=r,l=t.data.get(n.dataId).values,u=t.data.get(s.dataId).values,c=t.data.get(a.dataId).values,m=i.map(h=>t.data.get(h.dataId).values),d=i.map(h=>h.shape),[f,g]=bc(l,n.shape,u,s.shape,s.dtype,c,a.shape,m,d,p);return t.makeTensorInfo(f,s.dtype,g)}var z2={kernelName:Za,backendName:"cpu",kernelFunc:Q4};function Y4(o){let{backend:e,attrs:t}=o,{start:r,stop:n,dtype:s,step:a}=t,i=_c(r,n,a,s);return e.makeTensorInfo([i.length],s,i)}var U2={kernelName:Ja,backendName:"cpu",kernelFunc:Y4};var Z4=ie(Dn,o=>1/o),W2={kernelName:Dn,backendName:"cpu",kernelFunc:Z4};function J4(o){let{inputs:e,backend:t,attrs:r}=o,{images:n}=e,{alignCorners:s,halfPixelCenters:a,size:i}=r;U(n,"resizeBilinear");let p=y.computeStrides(n.shape),[l,u]=i,[c,m,d,f]=n.shape,g=t.data.get(n.dataId).values,h=new Float32Array(y.sizeFromShape([c,l,u,f])),x=[s&&l>1?m-1:m,s&&u>1?d-1:d],b=[s&&l>1?l-1:l,s&&u>1?u-1:u],w=0,v=x[0]/b[0],k=x[1]/b[1];for(let E=0;E<c;E++)for(let $=0;$<l;$++){let A;a?A=v*($+.5)-.5:A=v*$;let D=Math.max(0,Math.floor(A)),R=A-D,P=Math.min(m-1,Math.ceil(A)),V=E*p[0]+D*p[1],L=E*p[0]+P*p[1];for(let B=0;B<u;B++){let M;a?M=k*(B+.5)-.5:M=k*B;let W=Math.max(0,Math.floor(M)),G=M-W,z=Math.min(d-1,Math.ceil(M)),H=V+W*p[2],j=L+W*p[2],X=V+z*p[2],Z=L+z*p[2];for(let Q=0;Q<f;Q++){let ee=g[H+Q],Y=g[j+Q],re=g[X+Q],le=g[Z+Q],de=ee+(re-ee)*G,ce=Y+(le-Y)*G,be=de+(ce-de)*R;h[w++]=be}}}return t.makeTensorInfo([c,l,u,f],"float32",h)}var G2={kernelName:ri,backendName:"cpu",kernelFunc:J4};function eU(o){let{inputs:e,backend:t,attrs:r}=o,{images:n,dy:s}=e,{alignCorners:a}=r;U([s,n],"resizeBilinearGrad");let i=y.computeStrides(n.shape),[p,l,u,c]=n.shape,[,m,d]=s.shape,f=new Float32Array(p*l*u*c),g=[a&&m>1?l-1:l,a&&d>1?u-1:u],h=[a&&m>1?m-1:m,a&&d>1?d-1:d],x=g[0]/h[0],b=g[1]/h[1],w=t.data.get(s.dataId).values,v=0;for(let k=0;k<p;k++){let E=k*i[0];for(let $=0;$<m;$++){let A=$*x,D=Math.floor(A),R=Math.min(Math.ceil(A),l-1),P=E+D*i[1],V=E+R*i[1],L=A-D,B=1-L;for(let M=0;M<d;M++){let W=M*b,G=Math.floor(W),z=Math.min(Math.ceil(W),u-1),H=W-G,j=1-H,X=P+G*i[2],Z=P+z*i[2],Q=V+G*i[2],ee=V+z*i[2],Y=B*j,re=B*H,le=L*j,de=L*H;for(let ce=0;ce<c;ce++){let be=w[v++];f[X+ce]+=be*Y,f[Z+ce]+=be*re,f[Q+ce]+=be*le,f[ee+ce]+=be*de}}}}return t.makeTensorInfo([p,u,l,c],"float32",f)}var H2={kernelName:El,backendName:"cpu",kernelFunc:eU};function tU(o){let{inputs:e,backend:t,attrs:r}=o,{images:n}=e,{alignCorners:s,halfPixelCenters:a,size:i}=r;U(n,"resizeNearestNeighbor");let p=y.computeStrides(n.shape),[l,u]=i,[c,m,d,f]=n.shape,g=t.data.get(n.dataId).values,h=new Float32Array(c*l*u*f),x=[s&&l>1?m-1:m,s&&u>1?d-1:d],b=[s&&l>1?l-1:l,s&&u>1?u-1:u],w=x[0]/b[0],v=x[1]/b[1],k=0;for(let E=0;E<c;E++){let $=E*p[0];for(let A=0;A<l;A++){let D=a?w*(A+.5):w*A,R=Math.min(m-1,s?Math.round(D):Math.floor(D));a&&(R=Math.max(0,R));let P=$+R*p[1];for(let V=0;V<u;V++){let L=a?v*(V+.5):v*V,B=Math.min(d-1,s?Math.round(L):Math.floor(L));a&&(B=Math.max(0,B));let M=P+B*p[2];for(let W=0;W<f;W++){let G=g[M+W];h[k++]=G}}}}return t.makeTensorInfo([c,l,u,f],n.dtype,h)}var q2={kernelName:oi,backendName:"cpu",kernelFunc:tU};function oU(o){let{inputs:e,backend:t,attrs:r}=o,{images:n,dy:s}=e,{alignCorners:a}=r;U([s,n],"resizeNearestNeighborGrad");let i=y.computeStrides(n.shape),p=y.computeStrides(s.shape),[l,u,c,m]=n.shape,[,d,f]=s.shape,g=new Float32Array(l*u*c*m),h=t.data.get(s.dataId).values,x=[a&&d>1?u-1:u,a&&f>1?c-1:c],b=[a&&d>1?d-1:d,a&&f>1?f-1:f],w=x[0]/b[0],v=x[1]/b[1],k=1/w,E=1/v,$=Math.ceil(k)*2+2,A=Math.ceil(E)*2+2;for(let D=0;D<l;D++){let R=D*i[0];for(let P=0;P<u;P++){let V=R+P*i[1],L=Math.floor(P*k),B=Math.floor(L-$/2);for(let M=0;M<c;M++){let W=V+M*i[2],G=Math.floor(M*E),z=Math.floor(G-A/2);for(let H=0;H<m;H++){let j=0;for(let X=0;X<$;X++){let Z=X+B;if(Z<0||Z>=d)continue;let Q=R+Z*p[1],ee=Z*w,Y=Math.min(u-1,a?Math.round(ee):Math.floor(ee));if(P===Y)for(let re=0;re<A;re++){let le=re+z;if(le<0||le>=f)continue;let de=Q+le*p[2],ce=le*v,be=Math.min(c-1,a?Math.round(ce):Math.floor(ce));M===be&&(j+=h[de+H])}}g[W+H]=j}}}}return t.makeTensorInfo(n.shape,n.dtype,g)}var K2={kernelName:kl,backendName:"cpu",kernelFunc:oU};function rU(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{dims:s}=r;U(n,"reverse");let a=n.shape.length,i=y.parseAxisParam(s,n.shape);if(a===0)return Tt({inputs:{x:n},backend:t});let p=new Se(n.shape,n.dtype),l=t.bufferSync(n);for(let u=0;u<p.size;u++){let c=p.indexToLoc(u),m=c.slice();i.forEach(d=>m[d]=n.shape[d]-1-m[d]),p.set(l.get(...m),...c)}return t.makeTensorInfo(p.shape,p.dtype,p.values)}var j2={kernelName:ni,backendName:"cpu",kernelFunc:rU};var X2={kernelName:Ei,backendName:"cpu",kernelFunc:({inputs:o,attrs:e,backend:t})=>{let{image:r}=o,{radians:n,fillValue:s,center:a}=e,i=t,p=y.getTypedArrayFromDType(r.dtype,y.sizeFromShape(r.shape)),[l,u,c,m]=r.shape,[d,f]=N.getImageCenter(a,u,c),g=255,h=Math.sin(n),x=Math.cos(n),b=i.data.get(r.dataId).values;for(let v=0;v<l;v++){let k=v*c*u*m;for(let E=0;E<u;E++){let $=E*(c*m);for(let A=0;A<c;A++){let D=A*m;for(let R=0;R<m;R++){let P=[l,E,A,R],V=P[2],L=P[1],B=(V-d)*x-(L-f)*h,M=(V-d)*h+(L-f)*x;B=Math.round(B+d),M=Math.round(M+f);let W=s;if(typeof s!="number"&&(R===3?W=g:W=s[R]),B>=0&&B<c&&M>=0&&M<u){let z=M*(c*m),H=B*m,j=k+z+H+R;W=b[j]}let G=k+$+D+R;p[G]=W}}}}return{dataId:i.write(p,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};var nU=ie(Pn,o=>{let e=Math.floor(o);return o-e<.5?Math.floor(o):o-e>.5?Math.ceil(o):e%2===0?e:e+1}),Q2={kernelName:Pn,backendName:"cpu",kernelFunc:nU};function sU(o){let{inputs:e,backend:t,attrs:r}=o,{indices:n,updates:s}=e,{shape:a}=r,{sliceRank:i,numUpdates:p,sliceSize:l,strides:u,outputSize:c}=N.calculateShapes(s,n,a),m=!0,d=t.bufferSync(n),f=t.bufferSync(s),g=wo(d,f,a,c,l,p,i,u,0,m);return t.makeTensorInfo(a,g.dtype,g.values)}var Y2={kernelName:si,backendName:"cpu",kernelFunc:sU};function aU(o,e){let t=0,r=o.length,n=0;for(;t<r;)n=Math.floor((t+r)/2),o[n]<e?t=n+1:r=n;return r}function iU(o,e){let t=0,r=o.length,n=0;for(;t<r;)n=Math.floor((t+r)/2),o[n]<=e?t=n+1:r=n;return r}function Z2(o,e,t,r,n,s){let a=y.getArrayFromDType("int32",t*n);for(let i=0;i<t;++i){let p=o.slice(i*r,(i+1)*r),l=i*n;for(let u=0;u<n;++u)a[l+u]=s==="left"?aU(p,e[u+l]):iU(p,e[u+l])}return a}function pU(o){let{inputs:e,backend:t,attrs:r}=o,{sortedSequence:n,values:s}=e,{side:a}=r,i=t.data.get(n.dataId).values,p=t.data.get(s.dataId).values,l=Z2(i,p,n.shape[0],n.shape[1],s.shape[1],a);return t.makeTensorInfo(s.shape,"int32",l)}var J2={kernelName:ii,backendName:"cpu",kernelFunc:pU};function lU(o){let{inputs:e,backend:t}=o,{condition:r,t:n,e:s}=e;U([r,n,s],"select");let a=r.shape.length,i=t.data.get(r.dataId).values,p=t.data.get(n.dataId).values,l=t.data.get(s.dataId).values,u=et(n.dtype,s.dtype),c=y.makeZerosTypedArray(y.sizeFromShape(n.shape),u),m=0,d=a===0||a>1||n.shape.length===1?1:y.sizeFromShape(n.shape.slice(1));for(let f=0;f<i.length;f++)for(let g=0;g<d;g++)i[f]===1?c[m++]=p[f]:c[m++]=l[f];return t.makeTensorInfo(n.shape,u,c)}var eI={kernelName:pi,backendName:"cpu",kernelFunc:lU};var uU=N.SELU_SCALEALPHA,cU=N.SELU_SCALE,mU=ie(Ln,o=>o>=0?cU*o:uU*(Math.exp(o)-1)),tI={kernelName:Ln,backendName:"cpu",kernelFunc:mU};var dU=ie(zn,o=>o<0?-1:o>0?1:0),oI={kernelName:zn,backendName:"cpu",kernelFunc:dU};var fU=ie(Mn,o=>Math.sin(o)),rI={kernelName:Mn,backendName:"cpu",kernelFunc:fU};var hU=ie(Bn,o=>Math.sinh(o)),nI={kernelName:Bn,backendName:"cpu",kernelFunc:hU};var gU=11920928955078125e-23,sI=Math.log(gU)+2,xU=ie(Wn,o=>{let e=o>-sI,t=o<sI,r=Math.exp(o),n;return t?n=r:e?n=o:n=Math.log(1+r),n}),aI={kernelName:Wn,backendName:"cpu",kernelFunc:xU};function yU(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{blockShape:s,paddings:a}=r;U([n],"spaceToBatchND");let i=y.sizeFromShape(s),p=[[0,0]];p.push(...a);for(let E=1+s.length;E<n.shape.length;++E)p.push([0,0]);let l=id.kernelFunc({inputs:{x:n},backend:t,attrs:{paddings:p,constantValue:0}}),u=N.getReshaped(l.shape,s,i,!1),c=N.getPermuted(u.length,s.length,!1),m=N.getReshapedPermuted(l.shape,s,i,!1),g=ye({inputs:{x:l},backend:t,attrs:{shape:u}}),b=We({inputs:{x:g},backend:t,attrs:{perm:c}}),k=ye({inputs:{x:b},backend:t,attrs:{shape:m}});return t.disposeIntermediateTensorInfo(l),t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(b),k}var iI={kernelName:ci,backendName:"cpu",kernelFunc:yU};function bU(o){let{inputs:e,backend:t}=o,{indices:r,values:n,denseShape:s,defaultValue:a}=e;if(s.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
        ${s.shape}`);if(r.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
        ${r.shape}`);if(n.shape.length!==1)throw new Error(`Values must be a vector, saw:
        ${n.shape}`);if(a.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${a.shape}`);let i=t.data.get(r.dataId).values,p=t.data.get(n.dataId).values,l=t.data.get(s.dataId).values,u=t.data.get(a.dataId).values[0],[c,m,d,f,g]=Tc(i,r.shape,r.dtype,p,n.dtype,l,u);return[t.makeTensorInfo(m,r.dtype,c),t.makeTensorInfo([m[0]],n.dtype,d),t.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(h=>Number(h)))),t.makeTensorInfo([g.length],r.dtype,new Int32Array(g))]}var pI={kernelName:fi,backendName:"cpu",kernelFunc:bU};function _U(o){let{inputs:e,backend:t}=o,{inputIndices:r,inputShape:n,newShape:s}=e;if(r.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape
        ${r.shape}`);if(n.shape.length!==1)throw new Error(`Input shape should be a vector but received shape
        ${n.shape}`);if(s.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${s.shape}`);let a=Array.from(t.data.get(n.dataId).values),i=t.data.get(r.dataId).values,p=Array.from(t.data.get(s.dataId).values),[l,u,c]=vc(i,r.shape,r.dtype,a,p);return[t.makeTensorInfo(u,r.dtype,l),t.makeTensorInfo([c.length],s.dtype,new Int32Array(c))]}var lI={kernelName:hi,backendName:"cpu",kernelFunc:_U};function TU(o){let{inputs:e,backend:t}=o,{data:r,indices:n,segmentIds:s}=e;if(r.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
          ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
          ${s.shape}`);if(n.shape[0]!==s.shape[0])throw new Error("segmentIds and indices should have same size.");let a=t.data.get(r.dataId).values,i=t.data.get(n.dataId).values,p=t.data.get(s.dataId).values,[l,u]=ip(a,r.shape,r.dtype,i,p,!0);return t.makeTensorInfo(u,r.dtype,l)}var uI={kernelName:gi,backendName:"cpu",kernelFunc:TU};function vU(o){let{inputs:e,backend:t}=o,{data:r,indices:n,segmentIds:s}=e;if(r.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
         ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
         ${s.shape}`);if(n.shape[0]!==s.shape[0])throw new Error("segmentIds and indices should have same size.");let a=t.data.get(r.dataId).values,i=t.data.get(n.dataId).values,p=t.data.get(s.dataId).values,[l,u]=ip(a,r.shape,r.dtype,i,p);return t.makeTensorInfo(u,r.dtype,l)}var cI={kernelName:xi,backendName:"cpu",kernelFunc:vU};function wU(o){let{inputs:e,backend:t,attrs:r}=o,{sparseIndices:n,sparseValues:s,defaultValue:a}=e,{outputShape:i}=r,{sliceRank:p,numUpdates:l,sliceSize:u,strides:c,outputSize:m}=N.calculateShapes(s,n,i),d=!1,f=t.bufferSync(n),g;switch(s.dtype){case"bool":{let h=t.bufferSync(s),x=!!t.data.get(a.dataId).values[0];g=wo(f,h,i,m,u,l,p,c,x,d);break}case"float32":{let h=t.bufferSync(s),x=t.data.get(a.dataId).values[0];g=wo(f,h,i,m,u,l,p,c,x,d);break}case"int32":{let h=t.bufferSync(s),x=t.data.get(a.dataId).values[0];g=wo(f,h,i,m,u,l,p,c,x,d);break}case"string":{let h=t.bufferSync(s),x=y.decodeString(t.data.get(a.dataId).values[0]);g=wo(f,h,i,m,u,l,p,c,x,d);break}default:throw new Error(`Unsupported type ${s.dtype}`)}return t.makeTensorInfo(i,g.dtype,g.values)}var mI={kernelName:yi,backendName:"cpu",kernelFunc:wU};function CU(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{numOrSizeSplits:s,axis:a}=r,i=y.parseAxisParam(a,n.shape)[0],p=N.prepareSplitSize(n,s,i),l=new Array(n.shape.length).fill(0),u=n.shape.slice();return p.map(c=>{let m=[...u];m[i]=c;let d=ho({inputs:{x:n},backend:t,attrs:{begin:l,size:m}});return l[i]+=c,d})}var dI={kernelName:mi,backendName:"cpu",kernelFunc:CU};var fI={kernelName:$l,backendName:"cpu",kernelFunc:({inputs:o,backend:e})=>{let{x:t}=o,r=e;U(t,"square");let n=r.data.get(t.dataId).values,s=new Float32Array(n.length);for(let i=0;i<n.length;++i){let p=n[i];s[i]=p*p}return{dataId:r.write(s,t.shape,t.dtype),shape:t.shape,dtype:t.dtype}}};var NU=ie(Qn,(o,e)=>{let t=e;return isNaN(o)?NaN:o>0?1:t.alpha}),hI={kernelName:Qn,backendName:"cpu",kernelFunc:NU};function SU(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{begin:s,end:a,strides:i,beginMask:p,endMask:l,ellipsisMask:u,newAxisMask:c,shrinkAxisMask:m}=r;U(n,"stridedSlice");let{finalShapeSparse:d,finalShape:f,isIdentity:g,sliceDim0:h,isSimpleSlice:x,begin:b,end:w,strides:v}=it.sliceInfo(n.shape,s,a,i,p,l,u,c,m),k;if(g)k=ye({inputs:{x:n},backend:t,attrs:{shape:f}});else if(h||x){y.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let E=it.computeOutShape(b,w,v),$=ho({inputs:{x:n},backend:t,attrs:{begin:b,size:E}});k=ye({inputs:{x:$},backend:t,attrs:{shape:f}}),t.disposeIntermediateTensorInfo($)}else{let E=t.bufferSync(n),$=wc(d,E,v,b);k=t.makeTensorInfo(f,$.dtype,$.values)}return k}var gI={kernelName:bi,backendName:"cpu",kernelFunc:SU};function IU(o){let{inputs:e,backend:t,attrs:r}=o,{separator:n,nGramWidths:s,leftPad:a,rightPad:i,padWidth:p,preserveShortSequences:l}=r,{data:u,dataSplits:c}=e,m=t.data.get(u.dataId).values,d=t.data.get(c.dataId).values,[f,g]=Cc(m,d,n,s,a,i,p,l);return[t.makeTensorInfo([f.length],"string",f),t.makeTensorInfo(c.shape,"int32",g)]}var xI={kernelName:_i,backendName:"cpu",kernelFunc:IU};function kU(o){let{inputs:e,backend:t,attrs:r}=o,{skipEmpty:n}=r,{input:s,delimiter:a}=e;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(s.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${s.shape}`);if(a.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${a.shape}`);let i=t.data.get(s.dataId).values,p=t.data.get(a.dataId).values[0],[l,u,c]=Nc(i,p,n),m=u.length;return[t.makeTensorInfo([m,2],"int32",l),t.makeTensorInfo([m],"string",u),t.makeTensorInfo([2],"int32",new Int32Array(c))]}var yI={kernelName:Ti,backendName:"cpu",kernelFunc:kU};function EU(o){let{inputs:e,backend:t,attrs:r}=o,{numBuckets:n}=r,{input:s}=e;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(n<=0)throw new Error("Number of buckets must be at least 1");let a=t.data.get(s.dataId).values,i=Sc(a,n);return t.makeTensorInfo(s.shape,"int32",i)}var bI={kernelName:vi,backendName:"cpu",kernelFunc:EU};var $U=ie(jn,o=>Math.tan(o)),_I={kernelName:jn,backendName:"cpu",kernelFunc:$U};var AU=ie(Xn,o=>Math.tanh(o)),TI={kernelName:Xn,backendName:"cpu",kernelFunc:AU};function FU(o){let{inputs:e,backend:t}=o,{tensor:r,indices:n,updates:s}=e,{sliceRank:a,numUpdates:i,sliceSize:p,strides:l,outputSize:u}=N.calculateShapes(s,n,r.shape),c=!1,m=t.bufferSync(n),d=t.bufferSync(s),f=t.bufferSync(r),g=wo(m,d,r.shape,u,p,i,a,l,f,c);return t.makeTensorInfo(r.shape,g.dtype,g.values)}var vI={kernelName:ai,backendName:"cpu",kernelFunc:FU};function DU(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{reps:s}=r;U(n,"tile");let a=Ic(t.bufferSync(n),s);return t.makeTensorInfo(a.shape,a.dtype,a.values)}var wI={kernelName:br,backendName:"cpu",kernelFunc:DU};function RU(o){let{inputs:e,backend:t,attrs:r}=o,{x:n}=e,{k:s,sorted:a}=r;U(n,"topk");let i=t.data.get(n.dataId).values,[p,l]=kc(i,n.shape,n.dtype,s,a);return[t.makeTensorInfo(p.shape,p.dtype,p.values),t.makeTensorInfo(l.shape,l.dtype,l.values)]}var CI={kernelName:wi,backendName:"cpu",kernelFunc:RU};function OU(o){let{inputs:e,attrs:t,backend:r}=o,{image:n,transforms:s}=e,{interpolation:a,fillMode:i,fillValue:p,outputShape:l}=t,[u,c,m,d]=n.shape,[f,g]=l??[c,m],h=[u,f,g,d],x=y.computeStrides(n.shape),b=x[0],w=x[1],v=x[2],k=y.computeStrides(h),E=k[0],$=k[1],A=k[2],D=y.getTypedArrayFromDType(n.dtype,y.sizeFromShape(h));D.fill(p);let R=r.data.get(n.dataId).values,P=r.data.get(s.dataId).values;for(let L=0;L<u;++L){let B=s.shape[0]===1?P:P.subarray(L*8,L*8+8);for(let M=0;M<f;++M)for(let W=0;W<g;++W)for(let G=0;G<d;++G){let z,H=B[6]*W+B[7]*M+1;if(H===0)continue;let j=(B[0]*W+B[1]*M+B[2])/H,X=(B[3]*W+B[4]*M+B[5])/H,Z=NI(j,m,i),Q=NI(X,c,i);switch(a){case"nearest":z=BU(R,c,m,b,w,v,L,Q,Z,G,p);break;case"bilinear":z=zU(R,c,m,b,w,v,L,Q,Z,G,p);break;default:throw new Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${a}`)}let ee=L*E+M*$+W*A+G;D[ee]=z}return r.makeTensorInfo(h,n.dtype,D)}return{dataId:r.write(D,h,n.dtype),shape:n.shape,dtype:n.dtype}}var SI={kernelName:Ci,backendName:"cpu",kernelFunc:OU};function NI(o,e,t){switch(t){case"reflect":return PU(o,e);case"wrap":return VU(o,e);case"nearest":return MU(o,e);case"constant":default:return LU(o,e)}}function PU(o,e){let t=o;if(t<0)if(e<=1)t=0;else{let r=2*e;t<r&&(t=r*Math.trunc(-t/r)+t),t=t<-e?t+r:-t-1}else if(t>e-1)if(e<=1)t=0;else{let r=2*e;t-=r*Math.trunc(t/r),t>=e&&(t=r-t-1)}return y.clamp(0,t,e-1)}function VU(o,e){let t=o;if(t<0)if(e<=1)t=0;else{let r=e-1;t+=e*(Math.trunc(-t/r)+1)}else if(t>e-1)if(e<=1)t=0;else{let r=e-1;t-=e*Math.trunc(t/r)}return y.clamp(0,t,e-1)}function LU(o,e){return o}function MU(o,e){return y.clamp(0,o,e-1)}function dl(o,e,t,r,n,s,a,i,p,l,u){let c=a*r+i*n+p*s+l;return 0<=i&&i<e&&0<=p&&p<t?o[c]:u}function BU(o,e,t,r,n,s,a,i,p,l,u){let c=Math.round(i),m=Math.round(p);return dl(o,e,t,r,n,s,a,c,m,l,u)}function zU(o,e,t,r,n,s,a,i,p,l,u){let c=Math.floor(i),m=Math.floor(p),d=c+1,f=m+1,g=(f-p)*dl(o,e,t,r,n,s,a,c,m,l,u)+(p-m)*dl(o,e,t,r,n,s,a,c,f,l,u),h=(f-p)*dl(o,e,t,r,n,s,a,d,m,l,u)+(p-m)*dl(o,e,t,r,n,s,a,d,f,l,u);return(d-i)*g+(i-c)*h}function UU(o){let{inputs:e,attrs:t,backend:r}=o,{axis:n}=t,{x:s}=e;U(s,"unique");let a=r.data.get(s.dataId).values,{outputValues:i,outputShape:p,indices:l}=Ec(a,n,s.shape,s.dtype);return[r.makeTensorInfo(p,s.dtype,i),r.makeTensorInfo([l.length],"int32",l)]}var II={kernelName:Ni,backendName:"cpu",kernelFunc:UU};function WU(o){let{inputs:e,backend:t,attrs:r}=o,{value:n}=e,{axis:s}=r;s<0&&(s+=n.shape.length);let a=n.shape.length,i=n.shape[s],p=new Array(a-1),l=0;for(let d=0;d<a;d++)d!==s&&(p[l++]=n.shape[d]);let u=new Array(a).fill(0),c=n.shape.slice();c[s]=1;let m=new Array(i);for(let d=0;d<m.length;d++){u[s]=d;let f=ho({inputs:{x:n},backend:t,attrs:{begin:u,size:c}});m[d]=ye({inputs:{x:f},backend:t,attrs:{shape:p}}),t.disposeIntermediateTensorInfo(f)}return m}var kI={kernelName:Si,backendName:"cpu",kernelFunc:WU};function GU(o){let{inputs:e,backend:t,attrs:r}=o,{x:n,segmentIds:s}=e,{numSegments:a}=r;U(n,"unsortedSegmentSum");let i=n.shape.length,p=s.shape.length,l=[],u=[],c=i-p,m=s;for(let f=0;f<c;++f){let g=yp({inputs:{input:m},backend:t,attrs:{dim:f+1}});m=g,u.push(g)}for(let f=0;f<a;++f){let g=y.createScalarValue(f,"int32"),h=t.makeTensorInfo([],"int32",g),x=uh({inputs:{a:h,b:m},backend:t}),b=mo({inputs:{x},backend:t,attrs:{dtype:"float32"}}),w=Es({inputs:{a:b,b:n},backend:t}),v=ur({inputs:{x:w},backend:t,attrs:{axis:0,keepDims:!1}});l.push(v),u.push(h),u.push(x),u.push(b),u.push(w),u.push(v)}let d=fg({inputs:l,backend:t,attrs:{axis:0}});return u.forEach(f=>t.disposeIntermediateTensorInfo(f)),d}var EI={kernelName:Ii,backendName:"cpu",kernelFunc:GU};var HU=[eS,ST,tS,oS,AT,rS,nS,sS,aS,iS,pS,lS,uS,cS,mS,fS,hS,gS,xS,JN,yS,bS,_S,FT,TS,$T,DT,vS,IT,wS,NS,SS,IS,kS,ES,$S,AS,FS,DS,RS,OS,PS,VS,LS,MS,BS,zS,US,WS,GS,HS,qS,jS,KN,XS,RT,QS,OT,YS,PT,ZS,JS,e2,VT,LT,t2,o2,r2,n2,MT,BT,kT,s2,CS,a2,i2,p2,jN,zT,UT,l2,WT,u2,c2,m2,d2,f2,h2,g2,GT,x2,y2,b2,_2,v2,w2,C2,HT,N2,S2,E2,qT,KT,$2,A2,F2,jT,D2,P2,V2,id,L2,XN,QT,M2,B2,z2,U2,ET,ul,W2,QN,YN,ZN,G2,H2,q2,K2,j2,X2,Q2,tv,Y2,J2,eI,tI,rv,oI,rI,nI,nv,I2,aI,iI,pI,lI,uI,cI,mI,dI,av,fI,iv,pv,hI,gI,xI,yI,bI,lv,KS,_I,TI,vI,wI,CI,SI,XT,II,kI,EI,R2];for(let o of HU)Fl(o);var qU=F();qU.registerFlag("KEEP_INTERMEDIATE_TENSORS",()=>!1,o=>{o&&console.warn("Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.")});var Bt;(function(o){o[o.DT_INVALID=0]="DT_INVALID",o[o.DT_FLOAT=1]="DT_FLOAT",o[o.DT_DOUBLE=2]="DT_DOUBLE",o[o.DT_INT32=3]="DT_INT32",o[o.DT_UINT8=4]="DT_UINT8",o[o.DT_INT16=5]="DT_INT16",o[o.DT_INT8=6]="DT_INT8",o[o.DT_STRING=7]="DT_STRING",o[o.DT_COMPLEX64=8]="DT_COMPLEX64",o[o.DT_INT64=9]="DT_INT64",o[o.DT_BOOL=10]="DT_BOOL",o[o.DT_QINT8=11]="DT_QINT8",o[o.DT_QUINT8=12]="DT_QUINT8",o[o.DT_QINT32=13]="DT_QINT32",o[o.DT_BFLOAT16=14]="DT_BFLOAT16",o[o.DT_QINT16=15]="DT_QINT16",o[o.DT_QUINT16=16]="DT_QUINT16",o[o.DT_UINT16=17]="DT_UINT16",o[o.DT_COMPLEX128=18]="DT_COMPLEX128",o[o.DT_HALF=19]="DT_HALF",o[o.DT_RESOURCE=20]="DT_RESOURCE",o[o.DT_VARIANT=21]="DT_VARIANT",o[o.DT_UINT32=22]="DT_UINT32",o[o.DT_UINT64=23]="DT_UINT64",o[o.DT_FLOAT_REF=101]="DT_FLOAT_REF",o[o.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",o[o.DT_INT32_REF=103]="DT_INT32_REF",o[o.DT_UINT8_REF=104]="DT_UINT8_REF",o[o.DT_INT16_REF=105]="DT_INT16_REF",o[o.DT_INT8_REF=106]="DT_INT8_REF",o[o.DT_STRING_REF=107]="DT_STRING_REF",o[o.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",o[o.DT_INT64_REF=109]="DT_INT64_REF",o[o.DT_BOOL_REF=110]="DT_BOOL_REF",o[o.DT_QINT8_REF=111]="DT_QINT8_REF",o[o.DT_QUINT8_REF=112]="DT_QUINT8_REF",o[o.DT_QINT32_REF=113]="DT_QINT32_REF",o[o.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF",o[o.DT_QINT16_REF=115]="DT_QINT16_REF",o[o.DT_QUINT16_REF=116]="DT_QUINT16_REF",o[o.DT_UINT16_REF=117]="DT_UINT16_REF",o[o.DT_COMPLEX128_REF=118]="DT_COMPLEX128_REF",o[o.DT_HALF_REF=119]="DT_HALF_REF",o[o.DT_RESOURCE_REF=120]="DT_RESOURCE_REF",o[o.DT_VARIANT_REF=121]="DT_VARIANT_REF",o[o.DT_UINT32_REF=122]="DT_UINT32_REF",o[o.DT_UINT64_REF=123]="DT_UINT64_REF"})(Bt||(Bt={}));var $I;(function(o){let e;(function(t){t[t.LEGACY=0]="LEGACY",t[t.V1=1]="V1",t[t.V2=2]="V2"})(e=o.CheckpointFormatVersion||(o.CheckpointFormatVersion={}))})($I||($I={}));var jU={};function pd(o){return jU[o]}function _(o,e,t,r,n){let s=e.inputParams[o];if(s&&s.inputIndexStart!==void 0){let i=s.inputIndexStart,p=s.inputIndexEnd===0?void 0:s.inputIndexEnd===void 0?i+1:s.inputIndexEnd,l=i<0?e.inputNames.length+i:i;if(s.type==="tensor")return ot(e.inputNames[l],t,r,n);if(s.type==="tensors"){let m=e.inputs.slice(i,p);return e.inputNames.slice(i,p).filter((f,g)=>{var h;return((h=m[g])===null||h===void 0?void 0:h.op)!=="NoOp"}).map(f=>ot(f,t,r,n))}let u=ot(e.inputNames[l],t,r,n),c=u.dataSync();return s.type==="number"?c[0]:y.toNestedArray(u.shape,c)}let a=e.attrParams[o];return a&&a.value}function ot(o,e,t,r){let[n,s]=kt(o,t);if(r!=null){let i=r.getHashTableHandleByName(n);if(i!=null)return i}let a=t.currentContextIds.find(i=>!!e[ld(n,i)]);return a!==void 0?e[ld(n,a)][s]:void 0}function hg(o,e,t){return e[ld(o,t.currentContextId)]}function So(o,e){let[t,r,n]=kt(o,e);return[ld(t,e&&e.currentContextId),r,n]}function ld(o,e){return e?`${o}-${e}`:o}function kt(o,e){if(o==="")return["",0,void 0];let t=e!=null&&e.parseNodeNameCache!=null;if(t){let s=e.parseNodeNameCache.get(o);if(s!=null)return s}let r=o.split(":"),n;if(r.length===1)n=[o,0,void 0];else{let s=r[0],a=r.length===3?r[1]:void 0,i=Number(r[r.length-1]);n=[s,i,a]}return t&&e.parseNodeNameCache.set(o,n),n}function fl(o,e,t){let r=_("pad",o,e,t);if(r==="explicit"){r=_("explicitPaddings",o,e,t);let n=[[0,0],[0,0],[0,0],[0,0]];for(let s=0;s<4;s++)n[s][0]=r[s*2],n[s][1]=r[s*2+1];return n}return r}function Io(o){return o.kept?o:Ht(o)}var gg={};Fe(gg,{json:()=>XU});var XU=[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var xg={};Fe(xg,{json:()=>QU});var QU=[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsFinite",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsInf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var yg={};Fe(yg,{json:()=>YU});var YU=[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}];var bg={};Fe(bg,{json:()=>ZU});var ZU=[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}];var _g={};Fe(_g,{json:()=>JU});var JU=[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniformInt",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number"},{tfName:"maxval",name:"maxval",type:"number"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}];var Tg={};Fe(Tg,{json:()=>eW});var eW=[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var vg={};Fe(vg,{json:()=>tW});var tW=[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}];var wg={};Fe(wg,{json:()=>oW});var oW=[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}];var Cg={};Fe(Cg,{json:()=>rW});var rW=[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"InitializeTable",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]},{tfOpName:"InitializeTableV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]}];var Ng={};Fe(Ng,{json:()=>nW});var nW=[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}];var Sg={};Fe(Sg,{json:()=>sW});var sW=[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BitwiseAnd",category:"logical",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}]}];var Ig={};Fe(Ig,{json:()=>aW});var aW=[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"MatrixBandPart",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"numLower",type:"tensor"},{start:1,name:"numUpper",type:"tensor"}]}];var kg={};Fe(kg,{json:()=>iW});var iW=[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]}];var Eg={};Fe(Eg,{json:()=>pW});var pW=[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}];var $g={};Fe($g,{json:()=>lW});var lW=[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]},{tfOpName:"TensorScatterUpdate",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"values",type:"tensor"}]}];var Ag={};Fe(Ag,{json:()=>uW});var uW=[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}];var Fg={};Fe(Fg,{json:()=>cW});var cW=[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}];var Dg={};Fe(Dg,{json:()=>mW});var mW=[{tfOpName:"StaticRegexReplace",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"pattern",name:"pattern",type:"string"},{tfName:"rewrite",name:"rewrite",type:"string"},{tfName:"replace_global",name:"replaceGlobal",type:"bool"}]},{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}];var Rg={};Fe(Rg,{json:()=>dW});var dW=[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"EnsureShape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}];var hl=class{static get Instance(){return this._instance||(this._instance=new this)}constructor(){let e=[gg,xg,yg,bg,_g,Tg,vg,wg,Cg,Ng,Sg,Ig,kg,Eg,$g,Ag,Fg,Dg,Rg],t=[].concat(...e.map(r=>r.json));this.opMappers=t.reduce((r,n)=>(r[n.tfOpName]=n,r),{})}transformGraph(e,t={}){let r=e.node,n=[],s=[],a=[],i=r.reduce((g,h)=>(g[h.name]=this.mapNode(h),h.op.startsWith("Placeholder")?n.push(g[h.name]):h.op==="Const"?s.push(g[h.name]):(h.input==null||h.input.length===0)&&a.push(g[h.name]),g),{}),p=[],l=[],u={},c={};t!=null&&(u=this.mapSignatureEntries(t.inputs),c=this.mapSignatureEntries(t.outputs));let m=Object.keys(i);m.forEach(g=>{let h=i[g];h.inputNames.forEach((x,b)=>{let[w,,v]=So(x),k=i[w];if(k.outputs!=null){let E=k.outputs.indexOf(v);if(E!==-1){let $=`${w}:${E}`;h.inputNames[b]=$}}h.inputs.push(k),k.children.push(h)})}),Object.keys(c).length===0?m.forEach(g=>{let h=i[g];h.children.length===0&&l.push(h)}):Object.keys(c).forEach(g=>{let[h]=So(g),x=i[h];x!=null&&(x.signatureKey=c[g],l.push(x))}),Object.keys(u).length>0?Object.keys(u).forEach(g=>{let[h]=So(g),x=i[h];x&&(x.signatureKey=u[g],p.push(x))}):p=n;let d={};e.library!=null&&e.library.function!=null&&(d=e.library.function.reduce((g,h)=>(g[h.signature.name]=this.mapFunction(h),g),{}));let f={nodes:i,inputs:p,outputs:l,weights:s,placeholders:n,signature:t,functions:d};return a.length>0&&(f.initNodes=a),f}mapSignatureEntries(e){return Object.keys(e||{}).reduce((t,r)=>(t[e[r].name]=r,t),{})}mapNode(e){let t=pd(e.op)||this.opMappers[e.op]||{};e.attr==null&&(e.attr={});let r={name:e.name,op:e.op,category:t.category,inputNames:(e.input||[]).map(n=>n.startsWith("^")?n.slice(1):n),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:e.attr,outputs:t.outputs};return t.inputs!=null&&(r.inputParams=t.inputs.reduce((n,s)=>(n[s.name]={type:s.type,inputIndexStart:s.start,inputIndexEnd:s.end},n),{})),t.attrs!=null&&(r.attrParams=t.attrs.reduce((n,s)=>{let a=s.type,i;switch(s.type){case"string":i=ud(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=ud(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"string[]":i=xd(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=xd(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"number":i=md(e.attr,s.tfName,s.defaultValue||0),i===void 0&&s.tfDeprecatedName&&(i=md(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"number[]":i=gd(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=gd(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"bool":i=cd(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=cd(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"bool[]":i=bd(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=bd(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"shape":i=hd(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=hd(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"shape[]":i=yd(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=yd(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"dtype":i=dd(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=dd(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"dtype[]":i=fd(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=fd(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"func":i=AI(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=AI(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error(`Unsupported param type: ${s.type} for op: ${e.op}`)}return n[s.name]={value:i,type:a},n},{})),r}mapFunction(e){let t=e.nodeDef,r=[],n=[],s={};t!=null&&(s=t.reduce((c,m)=>(c[m.name]=this.mapNode(m),m.op==="Const"&&n.push(c[m.name]),c),{}));let a=[],i=[];e.signature.inputArg.forEach(c=>{let[m]=So(c.name),d={name:m,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:Og(c.type),type:"dtype"}},children:[]};d.signatureKey=c.name,a.push(d),s[m]=d}),Object.keys(s).forEach(c=>{let m=s[c];m.inputNames.forEach((d,f)=>{let[g,,h]=So(d),x=s[g];if(x.outputs!=null){let b=x.outputs.indexOf(h);if(b!==-1){let w=`${g}:${b}`;m.inputNames[f]=w}}m.inputs.push(x),x.children.push(m)})});let l=e.ret;e.signature.outputArg.forEach(c=>{let[m,d]=So(l[c.name]),f=s[m];f!=null&&(f.defaultOutput=d,i.push(f))});let u=this.mapArgsToSignature(e);return{nodes:s,inputs:a,outputs:i,weights:n,placeholders:r,signature:u}}mapArgsToSignature(e){return{methodName:e.signature.name,inputs:e.signature.inputArg.reduce((t,r)=>(t[r.name]=this.mapArgToTensorInfo(r),t),{}),outputs:e.signature.outputArg.reduce((t,r)=>(t[r.name]=this.mapArgToTensorInfo(r,e.ret),t),{})}}mapArgToTensorInfo(e,t){let r=e.name;return t!=null&&(r=t[r]),{name:r,dtype:e.type}}};function fW(o){let e=F().global;if(typeof e.atob<"u")return e.atob(o);if(typeof Buffer<"u")return new Buffer(o,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}function FI(o,e){let t=Array.isArray(o)?String.fromCharCode.apply(null,o):fW(o);return e?t:t.toLowerCase()}function ud(o,e,t,r=!1){let n=o[e];return n!=null?FI(n.s,r):t}function cd(o,e,t){let r=o[e];return r?r.b:t}function md(o,e,t){let r=o[e]||{},n=r.i!=null?r.i:r.f!=null?r.f:t;return typeof n=="number"?n:parseInt(n,10)}function Og(o){switch(typeof o=="string"&&(o=Bt[o]),o){case Bt.DT_FLOAT:case Bt.DT_HALF:return"float32";case Bt.DT_INT32:case Bt.DT_INT64:case Bt.DT_INT8:case Bt.DT_UINT8:return"int32";case Bt.DT_BOOL:return"bool";case Bt.DT_DOUBLE:return"float32";case Bt.DT_STRING:return"string";case Bt.DT_COMPLEX64:case Bt.DT_COMPLEX128:return"complex64";default:return null}}function AI(o,e,t){let r=o[e];return r&&r.func?r.func.name:t}function dd(o,e,t){let r=o[e];return r&&r.type?Og(r.type):t}function fd(o,e,t){let r=o[e];return r&&r.list&&r.list.type?r.list.type.map(n=>Og(n)):t}function DI(o){if(!o.unknownRank)return o.dim!=null?o.dim.map(e=>typeof e.size=="number"?e.size:parseInt(e.size,10)):[]}function hd(o,e,t){let r=o[e];return r&&r.shape?DI(r.shape):t}function gd(o,e,t){let r=o[e];return r?((r.list.f&&r.list.f.length?r.list.f:r.list.i)||[]).map(n=>typeof n=="number"?n:parseInt(n,10)):t}function xd(o,e,t,r=!1){let n=o[e];return n&&n.list&&n.list.s?n.list.s.map(s=>FI(s,r)):t}function yd(o,e,t){let r=o[e];return r&&r.list&&r.list.shape?r.list.shape.map(n=>DI(n)):t}function bd(o,e,t){let r=o[e];return r&&r.list&&r.list.b?r.list.b:t}var _d=class{constructor(e,t,r){this.node=e,this.tensorMap=t,this.context=r,this.inputs=[],this.attrs={},this.inputs=e.inputNames.map(n=>this.getInput(n)),e.rawAttrs!=null&&(this.attrs=Object.keys(e.rawAttrs).reduce((n,s)=>(n[s]=this.getAttr(s),n),{}))}getInput(e){return ot(e,this.tensorMap,this.context)}getAttr(e,t){let r=this.node.rawAttrs[e];if(r.tensor!=null)return ot(e,this.tensorMap,this.context);if(r.i!=null||r.f!=null)return md(this.node.rawAttrs,e,t);if(r.s!=null)return ud(this.node.rawAttrs,e,t);if(r.b!=null)return cd(this.node.rawAttrs,e,t);if(r.shape!=null)return hd(this.node.rawAttrs,e,t);if(r.type!=null)return dd(this.node.rawAttrs,e,t);if(r.list!=null){if(r.list.i!=null||r.list.f!=null)return gd(this.node.rawAttrs,e,t);if(r.list.s!=null)return xd(this.node.rawAttrs,e,t);if(r.list.shape!=null)return yd(this.node.rawAttrs,e,t);if(r.list.b!=null)return bd(this.node.rawAttrs,e,t);if(r.list.type!=null)return fd(this.node.rawAttrs,e,t)}return t}};var Ne={};Fe(Ne,{OP_SCOPE_SUFFIX:()=>af,abs:()=>ut,acos:()=>qx,acosh:()=>Kx,add:()=>se,addN:()=>jx,all:()=>Xx,any:()=>Qx,argMax:()=>Yx,argMin:()=>Zx,asin:()=>Jx,asinh:()=>ey,atan:()=>ty,atan2:()=>oy,atanh:()=>ry,avgPool:()=>Zl,avgPool3d:()=>ay,basicLSTMCell:()=>iy,batchNorm:()=>Sr,batchNorm2d:()=>ly,batchNorm3d:()=>uy,batchNorm4d:()=>cy,batchToSpaceND:()=>Jl,bincount:()=>eu,bitwiseAnd:()=>my,booleanMaskAsync:()=>cD,broadcastArgs:()=>dy,broadcastTo:()=>Ir,buffer:()=>oe,cast:()=>we,ceil:()=>fy,clipByValue:()=>hy,clone:()=>Ht,complex:()=>At,concat:()=>Pe,concat1d:()=>gy,concat2d:()=>xy,concat3d:()=>yy,concat4d:()=>by,conv1d:()=>_y,conv2d:()=>kr,conv2dTranspose:()=>Ty,conv3d:()=>vy,conv3dTranspose:()=>Cy,cos:()=>Ny,cosh:()=>Sy,cosineWindow:()=>Up,cumprod:()=>Iy,cumsum:()=>ky,denseBincount:()=>Ey,depthToSpace:()=>$y,depthwiseConv2d:()=>zi,diag:()=>Ay,dilation2d:()=>Fy,div:()=>_e,divNoNan:()=>Ry,dot:()=>Oy,dropout:()=>wD,einsum:()=>Er,elu:()=>nu,enclosingPowerOfTwo:()=>Ef,ensureShape:()=>Py,equal:()=>ru,erf:()=>Vy,euclideanNorm:()=>By,exp:()=>lo,expandDims:()=>To,expm1:()=>zy,eye:()=>su,fft:()=>Gi,fill:()=>Oo,floor:()=>au,floorDiv:()=>Yl,fused:()=>$f,gather:()=>iu,gatherND:()=>TD,greater:()=>cs,greaterEqual:()=>pu,ifft:()=>xs,imag:()=>Ar,image:()=>IR,inTopKAsync:()=>ND,irfft:()=>Eu,isFinite:()=>Uy,isInf:()=>Wy,isNaN:()=>Gy,leakyRelu:()=>lu,less:()=>Mp,lessEqual:()=>Ui,linalg:()=>kR,linspace:()=>Hy,localResponseNormalization:()=>qy,log:()=>rr,log1p:()=>uu,logSigmoid:()=>jy,logSoftmax:()=>Xy,logSumExp:()=>mu,logicalAnd:()=>ms,logicalNot:()=>du,logicalOr:()=>fu,logicalXor:()=>Qy,losses:()=>ER,lowerBound:()=>Yy,matMul:()=>ke,max:()=>Vo,maxPool:()=>gu,maxPool3d:()=>Zy,maxPoolWithArgmax:()=>Jy,maximum:()=>xu,mean:()=>ds,meshgrid:()=>eb,min:()=>Lp,minimum:()=>fs,mirrorPad:()=>tb,mod:()=>ob,moments:()=>rb,movingAverage:()=>fD,mul:()=>K,multiRNNCell:()=>nb,multinomial:()=>sb,neg:()=>xt,norm:()=>us,notEqual:()=>yu,oneHot:()=>ab,ones:()=>Lo,onesLike:()=>ib,op:()=>C,outerProduct:()=>pb,pad:()=>Mo,pad1d:()=>lb,pad2d:()=>ub,pad3d:()=>cb,pad4d:()=>mb,pool:()=>db,pow:()=>or,prelu:()=>_u,print:()=>Ql,prod:()=>fb,raggedGather:()=>hb,raggedRange:()=>gb,raggedTensorToTensor:()=>xb,rand:()=>yb,randomGamma:()=>Ob,randomNormal:()=>Nu,randomStandardNormal:()=>Pb,randomUniform:()=>Wi,randomUniformInt:()=>Vb,range:()=>Fr,real:()=>nr,reciprocal:()=>Lb,relu:()=>Dr,relu6:()=>Su,reshape:()=>O,reverse:()=>to,reverse1d:()=>Mb,reverse2d:()=>Bb,reverse3d:()=>zb,reverse4d:()=>Ub,rfft:()=>Hi,round:()=>Iu,rsqrt:()=>Wb,scalar:()=>pe,scatterND:()=>gD,searchSorted:()=>Bp,selu:()=>Gb,separableConv2d:()=>Hb,setdiff1dAsync:()=>qb,sigmoid:()=>Ro,sign:()=>Kb,signal:()=>SR,sin:()=>jb,sinh:()=>Xb,slice:()=>Te,slice1d:()=>Qb,slice2d:()=>Yb,slice3d:()=>Zb,slice4d:()=>Jb,softmax:()=>ku,softplus:()=>cu,spaceToBatchND:()=>bu,sparse:()=>$R,sparseToDense:()=>bD,spectral:()=>NR,split:()=>sr,sqrt:()=>Dt,square:()=>ct,squaredDifference:()=>$u,squeeze:()=>qi,stack:()=>It,step:()=>Au,stridedSlice:()=>e_,string:()=>AR,sub:()=>ue,sum:()=>Ee,tan:()=>t_,tanh:()=>Vp,tensor:()=>St,tensor1d:()=>mt,tensor2d:()=>Rr,tensor3d:()=>Fu,tensor4d:()=>o_,tensor5d:()=>r_,tensor6d:()=>n_,tensorScatterUpdate:()=>i_,tile:()=>$r,topk:()=>p_,transpose:()=>Ou,truncatedNormal:()=>l_,unique:()=>u_,unsortedSegmentSum:()=>c_,unstack:()=>oo,upperBound:()=>m_,variable:()=>d_,where:()=>eo,whereAsync:()=>Ru,zeros:()=>qt,zerosLike:()=>nt});var RI=(o,e,t,r=Ne)=>{switch(o.op){case"BiasAdd":case"AddV2":case"Add":return[r.add(_("a",o,e,t),_("b",o,e,t))];case"AddN":return[r.addN(_("tensors",o,e,t))];case"FloorMod":case"Mod":return[r.mod(_("a",o,e,t),_("b",o,e,t))];case"Mul":return[r.mul(_("a",o,e,t),_("b",o,e,t))];case"RealDiv":case"Div":return[r.div(_("a",o,e,t),_("b",o,e,t))];case"DivNoNan":return[r.divNoNan(_("a",o,e,t),_("b",o,e,t))];case"FloorDiv":return[r.floorDiv(_("a",o,e,t),_("b",o,e,t))];case"Sub":return[r.sub(_("a",o,e,t),_("b",o,e,t))];case"Minimum":return[r.minimum(_("a",o,e,t),_("b",o,e,t))];case"Maximum":return[r.maximum(_("a",o,e,t),_("b",o,e,t))];case"Pow":return[r.pow(_("a",o,e,t),_("b",o,e,t))];case"SquaredDifference":return[r.squaredDifference(_("a",o,e,t),_("b",o,e,t))];default:throw TypeError(`Node type ${o.op} is not implemented`)}};var OI=(o,e,t,r=Ne)=>{switch(o.op){case"Abs":case"ComplexAbs":return[r.abs(_("x",o,e,t))];case"Acos":return[r.acos(_("x",o,e,t))];case"Acosh":return[r.acosh(_("x",o,e,t))];case"Asin":return[r.asin(_("x",o,e,t))];case"Asinh":return[r.asinh(_("x",o,e,t))];case"Atan":return[r.atan(_("x",o,e,t))];case"Atan2":return[r.atan2(_("x",o,e,t),_("y",o,e,t))];case"Atanh":return[r.atanh(_("x",o,e,t))];case"Ceil":return[r.ceil(_("x",o,e,t))];case"Complex":return[r.complex(_("real",o,e,t),_("imag",o,e,t))];case"Cos":return[r.cos(_("x",o,e,t))];case"Cosh":return[r.cosh(_("x",o,e,t))];case"Elu":return[r.elu(_("x",o,e,t))];case"Erf":return[r.erf(_("x",o,e,t))];case"Exp":return[r.exp(_("x",o,e,t))];case"Expm1":return[r.expm1(_("x",o,e,t))];case"Floor":return[r.floor(_("x",o,e,t))];case"Log":return[r.log(_("x",o,e,t))];case"Log1p":return[r.log1p(_("x",o,e,t))];case"Imag":return[r.imag(_("x",o,e,t))];case"Neg":return[r.neg(_("x",o,e,t))];case"Reciprocal":return[r.reciprocal(_("x",o,e,t))];case"Real":return[r.real(_("x",o,e,t))];case"Relu":return[r.relu(_("x",o,e,t))];case"Round":return[r.round(_("x",o,e,t))];case"Selu":return[r.selu(_("x",o,e,t))];case"Sigmoid":return[r.sigmoid(_("x",o,e,t))];case"Sin":return[r.sin(_("x",o,e,t))];case"Sign":return[r.sign(_("x",o,e,t))];case"Sinh":return[r.sinh(_("x",o,e,t))];case"Softplus":return[r.softplus(_("x",o,e,t))];case"Sqrt":return[r.sqrt(_("x",o,e,t))];case"Square":return[r.square(_("x",o,e,t))];case"Tanh":return[r.tanh(_("x",o,e,t))];case"Tan":return[r.tan(_("x",o,e,t))];case"ClipByValue":return[r.clipByValue(_("x",o,e,t),_("clipValueMin",o,e,t),_("clipValueMax",o,e,t))];case"Relu6":return[r.relu6(_("x",o,e,t))];case"Rsqrt":return[r.rsqrt(ot(o.inputNames[0],e,t))];case"LeakyRelu":return[r.leakyRelu(_("x",o,e,t),_("alpha",o,e,t))];case"Prelu":return[r.prelu(_("x",o,e,t),_("alpha",o,e,t))];case"IsNan":return[r.isNaN(ot(o.inputNames[0],e,t))];case"IsInf":return[r.isInf(ot(o.inputNames[0],e,t))];case"IsFinite":return[r.isFinite(ot(o.inputNames[0],e,t))];default:throw TypeError(`Node type ${o.op} is not implemented`)}};function Yt(o,e,t=""){if(!(typeof o=="number"||typeof e=="number")){y.assert(o.length===e.length,()=>t+` Shapes ${o} and ${e} must match`);for(let r=0;r<o.length;r++){let n=o[r],s=e[r];y.assert(n<0||s<0||n===s,()=>t+` Shapes ${o} and ${e} must match`)}}}function PI(o){return!(typeof o=="number"||o.some(e=>e<0))}function bp(o,e,t){let r=Td(o,t),n=!PI(r);if(n&&e.length===0)throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${r}`);if(n&&e.forEach(s=>{r=Td(s.shape,r)}),!PI(r))throw new Error(`Non-fully-defined elementShape: ${r}`);return r}function Td(o,e){if(typeof o=="number")return e;if(typeof e=="number")return o;if(o.length!==e.length)throw new Error(`Incompatible ranks during merge: ${o} vs. ${e}`);let t=[];for(let r=0;r<o.length;++r){let n=o[r],s=e[r];if(n>=0&&s>=0&&n!==s)throw new Error(`Incompatible shape during merge: ${o} vs. ${e}`);t[r]=n>=0?n:s}return t}var vd=class{constructor(e,t,r,n,s,a,i){this.name=e,this.dtype=t,this.maxSize=r,this.elementShape=n,this.identicalElementShapes=s,this.dynamicSize=a,this.clearAfterRead=i,this.tensors=[],this.closed_=!1,this.idTensor=pe(0),Ft(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(e){this.tensors.forEach(t=>{(e==null||!e.has(t.tensor.id))&&t.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(e){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||e>=this.size())throw new Error(`Tried to read from index ${e}, but array size is: ${this.size()}`);let t=this.tensors[e];if(t.cleared)throw new Error(`TensorArray ${this.name}: Could not read index ${e} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(t.cleared=!0),t.read=!0,t.tensor}readMany(e){return e.map(t=>this.read(t))}write(e,t){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||!this.dynamicSize&&e>=this.maxSize)throw new Error(`Tried to write to index ${e}, but array is not resizeable and size is: ${this.maxSize}`);let r=this.tensors[e]||{};if(t.dtype!==this.dtype)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e},
          because the value dtype is ${t.dtype}, but TensorArray dtype is ${this.dtype}.`);if(this.size()===0&&(this.elementShape==null||this.elementShape.length===0)&&(this.elementShape=t.shape),Yt(this.elementShape,t.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${e}.`),r.read)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been read.`);if(r.written)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been written.`);r.tensor=t,Ft(t),r.written=!0,this.tensors[e]=r}writeMany(e,t){if(e.length!==t.length)throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${e.length} is not the same as tensors size: ${t.length}.`);e.forEach((r,n)=>this.write(r,t[n]))}gather(e,t){if(t&&t!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${t}`);if(e)e=e.slice(0,this.size());else{e=[];for(let n=0;n<this.size();n++)e.push(n)}if(e.length===0)return St([],[0].concat(this.elementShape));let r=this.readMany(e);return Yt(this.elementShape,r[0].shape,"TensorArray shape mismatch: "),It(r,0)}concat(e){if(e&&e!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${e}`);if(this.size()===0)return St([],[0].concat(this.elementShape));let t=[];for(let n=0;n<this.size();n++)t.push(n);let r=this.readMany(t);return Yt(this.elementShape,r[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${r[0].shape})`),Pe(r,0)}scatter(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);if(e.length!==t.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${t.shape[0]}`);let r=Math.max(...e);if(!this.dynamicSize&&r>=this.maxSize)throw new Error(`Max index must be < array size (${r}  vs. ${this.maxSize})`);this.writeMany(e,oo(t,0))}split(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);let r=0,n=e.map(p=>(r+=p,r));if(r!==t.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${r}, and tensor's shape is: ${t.shape}`);if(!this.dynamicSize&&e.length!==this.maxSize)throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${e.length}), and the TensorArray is not marked as dynamically resizeable`);let s=r===0?0:t.size/r,a=[];fe(()=>{t=O(t,[1,r,s]);for(let p=0;p<e.length;++p){let u=[0,p===0?0:n[p-1],0],c=[1,e[p],s];a[p]=O(Te(t,u,c),this.elementShape)}return a});let i=[];for(let p=0;p<e.length;p++)i[p]=p;this.writeMany(i,a)}};var _p=class o{get id(){return this.idTensor.id}constructor(e,t,r,n=-1){this.tensors=e,this.elementShape=t,this.elementDtype=r,e?.forEach(s=>{if(r!==s.dtype)throw new Error(`Invalid data types; op elements ${r}, but list elements ${s.dtype}`);Yt(t,s.shape,"TensorList shape mismatch: "),Ft(s)}),this.idTensor=pe(0),this.maxNumElements=n,Ft(this.idTensor)}copy(){return new o([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(e){this.tensors.forEach(t=>{(e==null||!e.has(t.id))&&t.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(e,t,r=-1){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(r!==-1&&this.tensors.length!==r)throw new Error(`Operation expected a list with ${r} elements but got a list with ${this.tensors.length} elements.`);Yt(e,this.elementShape,"TensorList shape mismatch: ");let n=bp(this.elementShape,this.tensors,e);return fe(()=>{let s=this.tensors.map(a=>O(a,n));return It(s,0)})}popBack(e,t){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(this.size()===0)throw new Error("Trying to pop from an empty list.");let r=bp(this.elementShape,this.tensors,e),n=this.tensors.pop();return n.kept=!1,Yt(n.shape,e,"TensorList shape mismatch: "),O(n,r)}pushBack(e){if(e.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${this.elementDtype}`);if(Yt(e.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw new Error("Trying to push element into a full list.");Ft(e),this.tensors.push(e)}resize(e){if(e<0)throw new Error(`TensorListResize expects size to be non-negative. Got: ${e}`);if(this.maxNumElements!==-1&&e>this.maxNumElements)throw new Error(`TensorListResize input size ${e} is greater maxNumElement ${this.maxNumElements}.`);let t=new o([],this.elementShape,this.elementDtype,this.maxNumElements);t.tensors.length=e;for(let r=0;r<Math.min(this.tensors.length,e);++r)t.tensors[r]=this.tensors[r];return t}getItem(e,t,r){if(r!==this.elementDtype)throw new Error(`Invalid data types; op elements ${r}, but list elements ${this.elementDtype}`);if(e<0||e>this.tensors.length)throw new Error(`Trying to access element ${e} in a list with ${this.tensors.length} elements.`);if(this.tensors[e]==null)throw new Error(`element at index ${e} is null.`);Yt(this.tensors[e].shape,t,"TensorList shape mismatch: ");let n=bp(this.elementShape,this.tensors,t);return O(this.tensors[e],n)}setItem(e,t){if(t.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t.dtype}, but list elements ${this.elementDtype}`);if(e<0||this.maxNumElements!==-1&&e>=this.maxNumElements)throw new Error(`Trying to set element ${e} in a list with max ${this.maxNumElements} elements.`);Yt(this.elementShape,t.shape,"TensorList shape mismatch: "),Ft(t),this.tensors[e]!=null&&(this.tensors[e].kept=!1),this.tensors[e]=t}gather(e,t,r){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);Yt(this.elementShape,r,"TensorList shape mismatch: "),e=e.slice(0,this.size());let n=bp(this.elementShape,this.tensors,r);return e.length===0?St([],[0].concat(n)):fe(()=>{let s=e.map(a=>O(this.tensors[a],n));return It(s,0)})}concat(e,t){if(e&&e!==this.elementDtype)throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${e}`);Yt(this.elementShape,t,"TensorList shape mismatch: ");let r=bp(this.elementShape,this.tensors,t);return this.size()===0?St([],[0].concat(r)):fe(()=>{let n=this.tensors.map(s=>O(s,r));return Pe(n,0)})}};function VI(o,e,t){let r=o.dtype;if(o.shape.length<1)throw new Error(`Tensor must be at least a vector, but saw shape: ${o.shape}`);if(o.dtype!==t)throw new Error(`Invalid data types; op elements ${o.dtype}, but list elements ${t}`);let n=o.shape.slice(1);Yt(n,e,"TensorList shape mismatch: ");let s=oo(o);return new _p(s,e,r)}function LI(o,e,t,r){return new _p([],o,e,r)}function MI(o,e,t,r){if(e.length!==o.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${o.shape[0]}`);let n=Math.max(...e);if(r!=null&&r!==-1&&n>=r)throw new Error(`Max index must be < array size (${n}  vs. ${r})`);let s=new _p([],t,o.dtype,r),a=oo(o,0);return e.forEach((i,p)=>{s.setItem(i,a[p])}),s}function BI(o,e,t){let r=0,n=e.map(u=>(r+=u,r));if(r!==o.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${r}, and tensor's shape is: ${o.shape}`);let s=o.shape.slice(1),a=Td(s,t),i=r===0?0:o.size/r,p=fe(()=>{let u=[];o=O(o,[1,r,i]);for(let c=0;c<e.length;++c){let d=[0,c===0?0:n[c-1],0],f=[1,e[c],i];u[c]=O(Te(o,d,f),a)}return o.dispose(),u}),l=new _p([],t,o.dtype,e.length);for(let u=0;u<p.length;u++)l.setItem(u,p[u]);return l}var zI=async(o,e,t)=>{switch(o.op){case"If":case"StatelessIf":{let r=_("thenBranch",o,e,t),n=_("elseBranch",o,e,t),s=_("cond",o,e,t),a=_("args",o,e,t);return(await s.data())[0]?t.functionMap[r].executeFunctionAsync(a,t.tensorArrayMap,t.tensorListMap):t.functionMap[n].executeFunctionAsync(a,t.tensorArrayMap,t.tensorListMap)}case"While":case"StatelessWhile":{let r=_("body",o,e,t),n=_("cond",o,e,t),s=_("args",o,e,t),a=await t.functionMap[n].executeFunctionAsync(s,t.tensorArrayMap,t.tensorListMap),i=s.map(u=>u.id),p=await a[0].data();a.forEach(u=>{!u.kept&&i.indexOf(u.id)===-1&&u.dispose()});let l=s;for(;p[0];){let u=l;l=await t.functionMap[r].executeFunctionAsync(l,t.tensorArrayMap,t.tensorListMap);let c=l.map(d=>d.id);u.forEach(d=>{!d.kept&&i.indexOf(d.id)===-1&&c.indexOf(d.id)===-1&&d.dispose()});let m=await t.functionMap[n].executeFunctionAsync(l,t.tensorArrayMap,t.tensorListMap);p=await m[0].data(),m.forEach(d=>{!d.kept&&i.indexOf(d.id)===-1&&c.indexOf(d.id)===-1&&d.dispose()})}return l}case"LoopCond":{let r=_("pred",o,e,t);return[Io(r)]}case"Switch":{let r=_("pred",o,e,t),n=_("data",o,e,t);return n.kept||(n=Io(n)),(await r.data())[0]?[void 0,n]:[n,void 0]}case"Merge":{let r=o.inputNames.find(n=>ot(n,e,t)!==void 0);if(r){let n=ot(r,e,t);return[Io(n)]}return}case"Enter":{let r=_("frameName",o,e,t),n=_("tensor",o,e,t);return t.enterFrame(r),[Io(n)]}case"Exit":{let r=_("tensor",o,e,t);return t.exitFrame(),[Io(r)]}case"NextIteration":{let r=_("tensor",o,e,t);return t.nextIteration(),[Io(r)]}case"TensorArrayV3":{let r=_("size",o,e,t),n=_("dtype",o,e,t),s=_("elementShape",o,e,t),a=_("dynamicSize",o,e,t),i=_("clearAfterRead",o,e,t),p=_("identicalElementShapes",o,e,t),l=_("name",o,e,t),u=new vd(l,n,r,s,p,a,i);return t.addTensorArray(u),[u.idTensor,pe(1)]}case"TensorArrayWriteV3":{let r=_("tensorArrayId",o,e,t),n=_("index",o,e,t),s=_("tensor",o,e,t),a=t.getTensorArray(r.id);return a.write(n,s),[a.idTensor]}case"TensorArrayReadV3":{let r=_("tensorArrayId",o,e,t),n=_("index",o,e,t);return[t.getTensorArray(r.id).read(n)]}case"TensorArrayGatherV3":{let r=_("tensorArrayId",o,e,t),n=_("indices",o,e,t),s=_("dtype",o,e,t);return[t.getTensorArray(r.id).gather(n,s)]}case"TensorArrayScatterV3":{let r=_("tensorArrayId",o,e,t),n=_("indices",o,e,t),s=_("tensor",o,e,t),a=t.getTensorArray(r.id);return a.scatter(n,s),[a.idTensor]}case"TensorArrayConcatV3":{let r=_("tensorArrayId",o,e,t),n=t.getTensorArray(r.id),s=_("dtype",o,e,t);return[n.concat(s)]}case"TensorArraySplitV3":{let r=_("tensorArrayId",o,e,t),n=_("tensor",o,e,t),s=_("lengths",o,e,t),a=t.getTensorArray(r.id);return a.split(s,n),[a.idTensor]}case"TensorArraySizeV3":{let r=_("tensorArrayId",o,e,t),n=t.getTensorArray(r.id);return[pe(n.size(),"int32")]}case"TensorArrayCloseV3":{let r=_("tensorArrayId",o,e,t),n=t.getTensorArray(r.id);return n.clearAndClose(),[n.idTensor]}case"TensorListSetItem":{let r=_("tensorListId",o,e,t),n=_("index",o,e,t),s=_("tensor",o,e,t),a=t.getTensorList(r.id);return a.setItem(n,s),[a.idTensor]}case"TensorListGetItem":{let r=_("tensorListId",o,e,t),n=_("index",o,e,t),s=_("elementShape",o,e,t),a=_("elementDType",o,e,t);return[t.getTensorList(r.id).getItem(n,s,a)]}case"TensorListScatterV2":case"TensorListScatter":{let r=_("indices",o,e,t),n=_("tensor",o,e,t),s=_("elementShape",o,e,t),a=_("numElements",o,e,t),i=MI(n,r,s,a);return t.addTensorList(i),[i.idTensor]}case"TensorListReserve":case"EmptyTensorList":{let r=_("elementShape",o,e,t),n=_("elementDType",o,e,t),s;o.op==="TensorListReserve"?s="numElements":s="maxNumElements";let a=_(s,o,e,t),i=o.op==="TensorListReserve"?-1:a,p=LI(r,n,a,i);return t.addTensorList(p),[p.idTensor]}case"TensorListGather":{let r=_("tensorListId",o,e,t),n=_("indices",o,e,t),s=_("elementShape",o,e,t),a=_("elementDType",o,e,t);return[t.getTensorList(r.id).gather(n,a,s)]}case"TensorListStack":{let r=_("tensorListId",o,e,t),n=_("elementShape",o,e,t),s=_("elementDType",o,e,t),a=_("numElements",o,e,t);return[t.getTensorList(r.id).stack(n,s,a)]}case"TensorListFromTensor":{let r=_("tensor",o,e,t),n=_("elementShape",o,e,t),s=_("elementDType",o,e,t),a=VI(r,n,s);return t.addTensorList(a),[a.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{let r=_("tensorListId",o,e,t),n=t.getTensorList(r.id),s=_("dtype",o,e,t),a=_("elementShape",o,e,t);return[n.concat(s,a)]}case"TensorListPushBack":{let r=_("tensorListId",o,e,t),n=_("tensor",o,e,t),s=t.getTensorList(r.id);return s.pushBack(n),[s.idTensor]}case"TensorListPopBack":{let r=_("tensorListId",o,e,t),n=_("elementShape",o,e,t),s=_("elementDType",o,e,t);return[t.getTensorList(r.id).popBack(n,s)]}case"TensorListSplit":{let r=_("tensor",o,e,t),n=_("elementShape",o,e,t),s=_("lengths",o,e,t),a=BI(r,s,n);return t.addTensorList(a),[a.idTensor]}case"TensorListLength":{let r=_("tensorListId",o,e,t),n=t.getTensorList(r.id);return[pe(n.size(),"int32")]}case"TensorListResize":{let r=_("tensorListId",o,e,t),n=_("size",o,e,t),a=t.getTensorList(r.id).resize(n);return t.addTensorList(a),[a.idTensor]}default:throw TypeError(`Node type ${o.op} is not implemented`)}};function UI(o,e,t){let[r,n]=_("fusedOps",o,e,t),s=r==="biasadd",a=!s,i=n==="prelu",p=r==="fusedbatchnorm",l=_("numArgs",o,e,t);if(s){if(i&&l!==2)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&s&&l!==1)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if(p)throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");let u=_("strides",o,e,t),c=fl(o,e,t),m=_("dataFormat",o,e,t).toUpperCase(),d=_("dilations",o,e,t),[f,g]=_("args",o,e,t);a&&(g=f,f=void 0);let h=_("leakyreluAlpha",o,e,t);return{stride:u,pad:c,dataFormat:m,dilations:d,biasArg:f,preluArg:g,activationFunc:n,leakyreluAlpha:h}}var WI=(o,e,t,r=Ne)=>{switch(o.op){case"Conv1D":{let n=_("stride",o,e,t),s=_("pad",o,e,t),a=_("dataFormat",o,e,t).toUpperCase(),i=_("dilation",o,e,t);return[r.conv1d(_("x",o,e,t),_("filter",o,e,t),n,s,a,i)]}case"Conv2D":{let n=_("strides",o,e,t),s=fl(o,e,t),a=_("dataFormat",o,e,t).toUpperCase(),i=_("dilations",o,e,t);return[r.conv2d(_("x",o,e,t),_("filter",o,e,t),[n[1],n[2]],s,a,[i[1],i[2]])]}case"_FusedConv2D":{let{stride:n,pad:s,dataFormat:a,dilations:i,biasArg:p,preluArg:l,activationFunc:u,leakyreluAlpha:c}=UI(o,e,t);return[r.fused.conv2d({x:_("x",o,e,t),filter:_("filter",o,e,t),strides:[n[1],n[2]],pad:s,dataFormat:a,dilations:[i[1],i[2]],bias:p,activation:u,preluActivationWeights:l,leakyreluAlpha:c})]}case"FusedDepthwiseConv2dNative":{let{stride:n,pad:s,dataFormat:a,dilations:i,biasArg:p,preluArg:l,activationFunc:u,leakyreluAlpha:c}=UI(o,e,t);return[r.fused.depthwiseConv2d({x:_("x",o,e,t),filter:_("filter",o,e,t),strides:[n[1],n[2]],pad:s,dataFormat:a,dilations:[i[1],i[2]],bias:p,activation:u,preluActivationWeights:l,leakyreluAlpha:c})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{let n=_("outputShape",o,e,t),s=_("strides",o,e,t),a=fl(o,e,t);return[r.conv2dTranspose(_("x",o,e,t),_("filter",o,e,t),n,[s[1],s[2]],a)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{let n=_("strides",o,e,t),s=fl(o,e,t),a=_("dilations",o,e,t),i=_("dataFormat",o,e,t).toUpperCase();return[r.depthwiseConv2d(_("input",o,e,t),_("filter",o,e,t),[n[1],n[2]],s,i,[a[1],a[2]])]}case"Conv3D":{let n=_("strides",o,e,t),s=_("pad",o,e,t),a=_("dataFormat",o,e,t).toUpperCase(),i=_("dilations",o,e,t);return[r.conv3d(_("x",o,e,t),_("filter",o,e,t),[n[1],n[2],n[3]],s,a,[i[1],i[2],i[3]])]}case"AvgPool":{let n=_("strides",o,e,t),s=_("pad",o,e,t),a=_("kernelSize",o,e,t);return[r.avgPool(_("x",o,e,t),[a[1],a[2]],[n[1],n[2]],s)]}case"MaxPool":{let n=_("strides",o,e,t),s=_("pad",o,e,t),a=_("kernelSize",o,e,t);return[r.maxPool(_("x",o,e,t),[a[1],a[2]],[n[1],n[2]],s)]}case"MaxPoolWithArgmax":{let n=_("strides",o,e,t),s=_("pad",o,e,t),a=_("kernelSize",o,e,t),i=_("includeBatchInIndex",o,e,t),{result:p,indexes:l}=r.maxPoolWithArgmax(_("x",o,e,t),[a[1],a[2]],[n[1],n[2]],s,i);return[p,l]}case"AvgPool3D":{let n=_("strides",o,e,t),s=_("pad",o,e,t),a=_("kernelSize",o,e,t);return[r.avgPool3d(_("x",o,e,t),[a[1],a[2],a[3]],[n[1],n[2],n[3]],s)]}case"MaxPool3D":{let n=_("strides",o,e,t),s=_("pad",o,e,t),a=_("kernelSize",o,e,t);return[r.maxPool3d(_("x",o,e,t),[a[1],a[2],a[3]],[n[1],n[2],n[3]],s)]}case"Dilation2D":{let n=_("strides",o,e,t),s=_("pad",o,e,t),a=_("dilations",o,e,t),i=n[1],p=n[2],l=a[1],u=a[2];return[r.dilation2d(_("x",o,e,t),_("filter",o,e,t),[i,p],s,[l,u],"NHWC")]}default:throw TypeError(`Node type ${o.op} is not implemented`)}};var GI=(o,e,t,r=Ne)=>{switch(o.op){case"Fill":{let n=_("shape",o,e,t),s=_("dtype",o,e,t),a=_("value",o,e,t);return[r.fill(n,a,s)]}case"LinSpace":{let n=_("start",o,e,t),s=_("stop",o,e,t),a=_("num",o,e,t);return[r.linspace(n,s,a)]}case"Multinomial":{let n=_("logits",o,e,t),s=_("numSamples",o,e,t),a=_("seed",o,e,t);return[r.multinomial(n,s,a)]}case"OneHot":{let n=_("indices",o,e,t),s=_("depth",o,e,t),a=_("onValue",o,e,t),i=_("offValue",o,e,t),p=_("dtype",o,e,t);return[r.oneHot(n,s,a,i,p)]}case"Ones":return[r.ones(_("shape",o,e,t),_("dtype",o,e,t))];case"OnesLike":return[r.onesLike(_("x",o,e,t))];case"RandomStandardNormal":return[r.randomStandardNormal(_("shape",o,e,t),_("dtype",o,e,t),_("seed",o,e,t))];case"RandomUniform":return[r.randomUniform(_("shape",o,e,t),_("minval",o,e,t),_("maxval",o,e,t),_("dtype",o,e,t))];case"RandomUniformInt":return[r.randomUniformInt(_("shape",o,e,t),_("minval",o,e,t),_("maxval",o,e,t),_("seed",o,e,t))];case"Range":{let n=_("start",o,e,t),s=_("stop",o,e,t),a=_("step",o,e,t);return[r.range(n,s,a,_("dtype",o,e,t))]}case"TruncatedNormal":{let n=_("shape",o,e,t),s=_("mean",o,e,t),a=_("stdDev",o,e,t),i=_("seed",o,e,t);return[r.truncatedNormal(n,s,a,_("dtype",o,e,t),i)]}case"Zeros":return[r.zeros(_("shape",o,e,t),_("dtype",o,e,t))];case"ZerosLike":return[r.zerosLike(_("x",o,e,t))];default:throw TypeError(`Node type ${o.op} is not implemented`)}};function Pg(o,e,t){let r=_("boxes",o,e,t),n=_("scores",o,e,t),s=_("maxOutputSize",o,e,t),a=_("iouThreshold",o,e,t),i=_("scoreThreshold",o,e,t),p=_("softNmsSigma",o,e,t);return{boxes:r,scores:n,maxOutputSize:s,iouThreshold:a,scoreThreshold:i,softNmsSigma:p}}var HI=async(o,e,t,r,n=Ne)=>{switch(o.op){case"NonMaxSuppressionV5":{let{boxes:s,scores:a,maxOutputSize:i,iouThreshold:p,scoreThreshold:l,softNmsSigma:u}=Pg(o,e,t),c=await n.image.nonMaxSuppressionWithScoreAsync(s,a,i,p,l,u);return[c.selectedIndices,c.selectedScores]}case"NonMaxSuppressionV4":{let{boxes:s,scores:a,maxOutputSize:i,iouThreshold:p,scoreThreshold:l}=Pg(o,e,t),u=_("padToMaxOutputSize",o,e,t),c=await n.image.nonMaxSuppressionPaddedAsync(s,a,i,p,l,u);return[c.selectedIndices,c.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{let{boxes:s,scores:a,maxOutputSize:i,iouThreshold:p,scoreThreshold:l}=Pg(o,e,t);return[await n.image.nonMaxSuppressionAsync(s,a,i,p,l)]}case"Where":{let s=n.cast(_("condition",o,e,t),"bool"),a=[await n.whereAsync(s)];return s.dispose(),a}case"ListDiff":return n.setdiff1dAsync(_("x",o,e,t),_("y",o,e,t));default:throw TypeError(`Node type ${o.op} is not implemented`)}};var qI=(o,e,t,r=Ne)=>{switch(o.op){case"LowerBound":{let n=_("sortedSequence",o,e,t),s=_("values",o,e,t);return[r.lowerBound(n,s)]}case"TopKV2":{let n=_("x",o,e,t),s=_("k",o,e,t),a=_("sorted",o,e,t),i=r.topk(n,s,a);return[i.values,i.indices]}case"UpperBound":{let n=_("sortedSequence",o,e,t),s=_("values",o,e,t);return[r.upperBound(n,s)]}case"Unique":{let n=_("x",o,e,t),s=r.unique(n);return[s.values,s.indices]}case"UniqueV2":{let n=_("x",o,e,t),s=_("axis",o,e,t),a=r.unique(n,s);return[a.values,a.indices]}default:throw TypeError(`Node type ${o.op} is not implemented`)}};var KI=(o,e,t,r=Ne)=>{switch(o.op){case"Const":return e[o.name];case"PlaceholderWithDefault":let n=_("default",o,e,t);return[ot(o.name,e,t)||n];case"Placeholder":return[ot(o.name,e,t)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":{let u=_("x",o,e,t);return[Io(u)]}case"IdentityN":return _("x",o,e,t).map(u=>Io(u));case"Snapshot":let s=_("x",o,e,t);return[Io(s)];case"Shape":return[r.tensor1d(_("x",o,e,t).shape,"int32")];case"ShapeN":return _("x",o,e,t).map(u=>r.tensor1d(u.shape));case"Size":return[r.scalar(_("x",o,e,t).size,"int32")];case"Rank":return[r.scalar(_("x",o,e,t).rank,"int32")];case"NoOp":return[r.scalar(1)];case"Print":let a=_("x",o,e,t),i=_("data",o,e,t),p=_("message",o,e,t),l=_("summarize",o,e,t);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(p);for(let u=0;u<i.length;u++)console.log(Array.prototype.slice.call(i[u].dataSync()).slice(0,l));return[a];default:throw TypeError(`Node type ${o.op} is not implemented`)}};var wd=class{get id(){return this.handle.id}constructor(e,t){this.keyDType=e,this.valueDType=t,this.handle=pe(0),this.tensorMap=new Map,Ft(this.handle)}clearAndClose(){this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return pe(this.size(),"int32")}async import(e,t){this.checkKeyAndValueTensor(e,t);let r=await e.data();return this.tensorMap.forEach(n=>n.dispose()),this.tensorMap.clear(),fe(()=>{let n=oo(t),s=r.length,a=n.length;y.assert(s===a,()=>`The number of elements doesn't match, keys has ${s} elements, the values has ${a} elements.`);for(let i=0;i<s;i++){let p=r[i],l=n[i];Ft(l),this.tensorMap.set(p,l)}return this.handle})}async find(e,t){this.checkKeyAndValueTensor(e,t);let r=await e.data();return fe(()=>{let n=[];for(let s=0;s<r.length;s++){let a=r[s],i=this.findWithDefault(a,t);n.push(i)}return It(n)})}findWithDefault(e,t){let r=this.tensorMap.get(e);return r??t}checkKeyAndValueTensor(e,t){if(e.dtype!==this.keyDType)throw new Error(`Expect key dtype ${this.keyDType}, but got ${e.dtype}`);if(t.dtype!==this.valueDType)throw new Error(`Expect value dtype ${this.valueDType}, but got ${t.dtype}`)}};var jI=async(o,e,t,r)=>{switch(o.op){case"HashTable":case"HashTableV2":{let n=r.getHashTableHandleByName(o.name);if(n!=null)return[n];{let s=_("keyDType",o,e,t),a=_("valueDType",o,e,t),i=new wd(s,a);return r.addHashTable(o.name,i),[i.handle]}}case"InitializeTable":case"InitializeTableV2":case"LookupTableImport":case"LookupTableImportV2":{let n=_("tableHandle",o,e,t,r),s=_("keys",o,e,t),a=_("values",o,e,t);return[await r.getHashTableById(n.id).import(s,a)]}case"LookupTableFind":case"LookupTableFindV2":{let n=_("tableHandle",o,e,t,r),s=_("keys",o,e,t),a=_("defaultValue",o,e,t);return[await r.getHashTableById(n.id).find(s,a)]}case"LookupTableSize":case"LookupTableSizeV2":{let n=_("tableHandle",o,e,t,r);return[r.getHashTableById(n.id).tensorSize()]}default:throw TypeError(`Node type ${o.op} is not implemented`)}};var XI=(o,e,t,r=Ne)=>{switch(o.op){case"ResizeBilinear":{let n=_("images",o,e,t),s=_("size",o,e,t),a=_("alignCorners",o,e,t),i=_("halfPixelCenters",o,e,t);return[r.image.resizeBilinear(n,[s[0],s[1]],a,i)]}case"ResizeNearestNeighbor":{let n=_("images",o,e,t),s=_("size",o,e,t),a=_("alignCorners",o,e,t),i=_("halfPixelCenters",o,e,t);return[r.image.resizeNearestNeighbor(n,[s[0],s[1]],a,i)]}case"CropAndResize":{let n=_("image",o,e,t),s=_("boxes",o,e,t),a=_("boxInd",o,e,t),i=_("cropSize",o,e,t),p=_("method",o,e,t),l=_("extrapolationValue",o,e,t);return[r.image.cropAndResize(n,s,a,i,p,l)]}case"ImageProjectiveTransformV3":{let n=_("images",o,e,t),s=_("transforms",o,e,t),a=_("outputShape",o,e,t),i=_("fillValue",o,e,t),p=_("interpolation",o,e,t),l=_("fillMode",o,e,t);return[r.image.transform(n,s,p.toLowerCase(),l.toLowerCase(),i,a)]}default:throw TypeError(`Node type ${o.op} is not implemented`)}};var QI=(o,e,t,r=Ne)=>{switch(o.op){case"Equal":return[r.equal(_("a",o,e,t),_("b",o,e,t))];case"NotEqual":return[r.notEqual(_("a",o,e,t),_("b",o,e,t))];case"Greater":return[r.greater(_("a",o,e,t),_("b",o,e,t))];case"GreaterEqual":return[r.greaterEqual(_("a",o,e,t),_("b",o,e,t))];case"Less":return[r.less(_("a",o,e,t),_("b",o,e,t))];case"LessEqual":return[r.lessEqual(_("a",o,e,t),_("b",o,e,t))];case"LogicalAnd":return[r.logicalAnd(_("a",o,e,t),_("b",o,e,t))];case"LogicalNot":return[r.logicalNot(_("a",o,e,t))];case"LogicalOr":return[r.logicalOr(_("a",o,e,t),_("b",o,e,t))];case"Select":case"SelectV2":return[r.where(_("condition",o,e,t),_("a",o,e,t),_("b",o,e,t))];case"BitwiseAnd":return[r.bitwiseAnd(_("a",o,e,t),_("b",o,e,t))];default:throw TypeError(`Node type ${o.op} is not implemented`)}};var YI=(o,e,t,r=Ne)=>{switch(o.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[r.matMul(_("a",o,e,t),_("b",o,e,t),_("transposeA",o,e,t),_("transposeB",o,e,t))];case"Einsum":return[r.einsum(_("equation",o,e,t),..._("tensors",o,e,t))];case"Transpose":return[r.transpose(_("x",o,e,t),_("perm",o,e,t))];case"_FusedMatMul":let[n,s]=_("fusedOps",o,e,t),a=n==="biasadd",i=s==="prelu",p=_("numArgs",o,e,t),l=_("leakyreluAlpha",o,e,t);if(a){if(i&&p!==2)throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&p!==1)throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}let[u,c]=_("args",o,e,t);return[r.fused.matMul({a:_("a",o,e,t),b:_("b",o,e,t),transposeA:_("transposeA",o,e,t),transposeB:_("transposeB",o,e,t),bias:u,activation:s,preluActivationWeights:c,leakyreluAlpha:l})];case"MatrixBandPart":return[r.linalg.bandPart(_("a",o,e,t),_("numLower",o,e,t),_("numUpper",o,e,t))];default:throw TypeError(`Node type ${o.op} is not implemented`)}};var ZI=(o,e,t,r=Ne)=>{switch(o.op){case"EuclideanNorm":return[r.euclideanNorm(_("x",o,e,t),_("axis",o,e,t),_("keepDims",o,e,t))];case"FusedBatchNorm":case"FusedBatchNormV2":return[r.batchNorm(_("x",o,e,t),_("mean",o,e,t),_("variance",o,e,t),_("offset",o,e,t),_("scale",o,e,t),_("epsilon",o,e,t))];case"FusedBatchNormV3":return[r.batchNorm(_("x",o,e,t),_("mean",o,e,t),_("variance",o,e,t),_("offset",o,e,t),_("scale",o,e,t),_("epsilon",o,e,t))];case"LRN":return[r.localResponseNormalization(_("x",o,e,t),_("radius",o,e,t),_("bias",o,e,t),_("alpha",o,e,t),_("beta",o,e,t))];case"Softmax":return[r.softmax(_("x",o,e,t))];case"LogSoftmax":return[r.logSoftmax(_("x",o,e,t))];default:throw TypeError(`Node type ${o.op} is not implemented`)}};var JI=(o,e,t,r=Ne)=>{switch(o.op){case"RaggedGather":{let{outputNestedSplits:n,outputDenseValues:s}=r.raggedGather(_("paramsNestedSplits",o,e,t),_("paramsDenseValues",o,e,t),_("indices",o,e,t),_("outputRaggedRank",o,e,t));return n.concat(s)}case"RaggedRange":{let{rtNestedSplits:n,rtDenseValues:s}=r.raggedRange(_("starts",o,e,t),_("limits",o,e,t),_("splits",o,e,t));return[n,s]}case"RaggedTensorToTensor":return[r.raggedTensorToTensor(_("shape",o,e,t),_("values",o,e,t),_("defaultValue",o,e,t),_("rowPartitionTensors",o,e,t),_("rowPartitionTypes",o,e,t))];default:throw TypeError(`Node type ${o.op} is not implemented`)}};var ek=(o,e,t,r=Ne)=>{switch(o.op){case"Max":{let i=_("axis",o,e,t),p=_("keepDims",o,e,t);return[r.max(_("x",o,e,t),i,p)]}case"Mean":{let i=_("axis",o,e,t),p=_("keepDims",o,e,t);return[r.mean(_("x",o,e,t),i,p)]}case"Min":{let i=_("axis",o,e,t),p=_("keepDims",o,e,t);return[r.min(_("x",o,e,t),i,p)]}case"Sum":{let i=_("axis",o,e,t),p=_("keepDims",o,e,t);return[r.sum(_("x",o,e,t),i,p)]}case"All":{let i=_("axis",o,e,t),p=_("keepDims",o,e,t);return[r.all(_("x",o,e,t),i,p)]}case"Any":{let i=_("axis",o,e,t),p=_("keepDims",o,e,t);return[r.any(_("x",o,e,t),i,p)]}case"ArgMax":{let i=_("axis",o,e,t);return[r.argMax(_("x",o,e,t),i)]}case"ArgMin":{let i=_("axis",o,e,t);return[r.argMin(_("x",o,e,t),i)]}case"Prod":{let i=_("axis",o,e,t),p=_("keepDims",o,e,t);return[r.prod(_("x",o,e,t),i,p)]}case"Cumprod":{let i=_("axis",o,e,t),p=_("exclusive",o,e,t),l=_("reverse",o,e,t);return[r.cumprod(_("x",o,e,t),i,p,l)]}case"Cumsum":{let i=_("axis",o,e,t),p=_("exclusive",o,e,t),l=_("reverse",o,e,t);return[r.cumsum(_("x",o,e,t),i,p,l)]}case"Bincount":let n=_("x",o,e,t),s=_("weights",o,e,t),a=_("size",o,e,t);return[r.bincount(n,s,a)];case"DenseBincount":{let i=_("x",o,e,t),p=_("weights",o,e,t),l=_("size",o,e,t),u=_("binaryOutput",o,e,t);return[r.denseBincount(i,p,l,u)]}default:throw TypeError(`Node type ${o.op} is not implemented`)}};var tk=(o,e,t,r=Ne)=>{switch(o.op){case"ConcatV2":case"Concat":{let n=_("n",o,e,t),s=_("axis",o,e,t),a=_("tensors",o,e,t);return a=a.slice(0,n),[r.concat(a,s)]}case"Gather":{let n=_("x",o,e,t),s=_("indices",o,e,t);return[r.gather(n,r.cast(s,"int32"),0)]}case"GatherV2":{let n=_("axis",o,e,t),s=_("batchDims",o,e,t),a=_("x",o,e,t),i=_("indices",o,e,t);return[r.gather(a,r.cast(i,"int32"),n,s)]}case"Reverse":{let n=_("dims",o,e,t),s=[];for(let i=0;i<n.length;i++)n[i]&&s.push(i);let a=_("x",o,e,t);return[r.reverse(a,s)]}case"ReverseV2":{let n=_("axis",o,e,t),s=_("x",o,e,t);return[r.reverse(s,n)]}case"Slice":{let n=_("begin",o,e,t),s=_("size",o,e,t);return[r.slice(_("x",o,e,t),n,s)]}case"StridedSlice":{let n=_("begin",o,e,t),s=_("end",o,e,t),a=_("strides",o,e,t),i=_("beginMask",o,e,t),p=_("endMask",o,e,t),l=_("ellipsisMask",o,e,t),u=_("newAxisMask",o,e,t),c=_("shrinkAxisMask",o,e,t),m=_("x",o,e,t);return[r.stridedSlice(m,n,s,a,i,p,l,u,c)]}case"Pack":return fe(()=>{let n=_("axis",o,e,t),s=_("tensors",o,e,t),a=s[0].shape,i=r.squeeze(s[0]).shape,p=s.map(l=>{let u=y.arraysEqual(l.shape,a);if(!u&&!y.arraysEqual(r.squeeze(l).shape,i))throw new Error("the input tensors shape does not match");return u?l:r.reshape(l,a)});return[r.stack(p,n)]});case"Unpack":{let n=_("axis",o,e,t),s=_("tensor",o,e,t);return r.unstack(s,n)}case"Tile":{let n=_("reps",o,e,t);return[r.tile(_("x",o,e,t),n)]}case"Split":case"SplitV":{let n=_("axis",o,e,t),s=_("numOrSizeSplits",o,e,t),a=_("x",o,e,t);return r.split(a,s,n)}case"ScatterNd":{let n=_("indices",o,e,t),s=_("values",o,e,t),a=_("shape",o,e,t);return[r.scatterND(n,s,a)]}case"GatherNd":{let n=_("x",o,e,t),s=_("indices",o,e,t);return[r.gatherND(n,s)]}case"SparseToDense":{let n=_("sparseIndices",o,e,t),s=_("outputShape",o,e,t),a=_("sparseValues",o,e,t),i=_("defaultValue",o,e,t);return[r.sparseToDense(n,a,s,a.dtype===i.dtype?i:r.cast(i,a.dtype))]}case"TensorScatterUpdate":{let n=_("indices",o,e,t),s=_("values",o,e,t),a=_("tensor",o,e,t);return[r.tensorScatterUpdate(a,n,s)]}default:throw TypeError(`Node type ${o.op} is not implemented`)}};var ok=(o,e,t,r=Ne)=>{switch(o.op){case"SparseFillEmptyRows":{let{outputIndices:n,outputValues:s,emptyRowIndicator:a,reverseIndexMap:i}=r.sparse.sparseFillEmptyRows(_("indices",o,e,t),_("values",o,e,t),_("denseShape",o,e,t),_("defaultValue",o,e,t));return[n,s,a,i]}case"SparseReshape":{let{outputIndices:n,outputShape:s}=r.sparse.sparseReshape(_("inputIndices",o,e,t),_("inputShape",o,e,t),_("newShape",o,e,t));return[n,s]}case"SparseSegmentMean":return[r.sparse.sparseSegmentMean(_("data",o,e,t),_("indices",o,e,t),_("segmentIds",o,e,t))];case"SparseSegmentSum":return[r.sparse.sparseSegmentSum(_("data",o,e,t),_("indices",o,e,t),_("segmentIds",o,e,t))];default:throw TypeError(`Node type ${o.op} is not implemented`)}};var rk=(o,e,t,r=Ne)=>{switch(o.op){case"FFT":return[r.fft(_("x",o,e,t))];case"IFFT":return[r.ifft(_("x",o,e,t))];case"RFFT":return[r.rfft(_("x",o,e,t))];case"IRFFT":return[r.irfft(_("x",o,e,t))];default:throw TypeError(`Node type ${o.op} is not implemented`)}};var nk=(o,e,t,r=Ne)=>{switch(o.op){case"StaticRegexReplace":return[r.string.staticRegexReplace(_("input",o,e,t),_("pattern",o,e,t),_("rewrite",o,e,t),_("replaceGlobal",o,e,t))];case"StringNGrams":{let{nGrams:n,nGramsSplits:s}=r.string.stringNGrams(_("data",o,e,t),_("dataSplits",o,e,t),_("separator",o,e,t),_("nGramWidths",o,e,t),_("leftPad",o,e,t),_("rightPad",o,e,t),_("padWidth",o,e,t),_("preserveShortSequences",o,e,t));return[n,s]}case"StringSplit":{let{indices:n,values:s,shape:a}=r.string.stringSplit(_("input",o,e,t),_("delimiter",o,e,t),_("skipEmpty",o,e,t));return[n,s,a]}case"StringToHashBucketFast":return[r.string.stringToHashBucketFast(_("input",o,e,t),_("numBuckets",o,e,t))];default:throw TypeError(`Node type ${o.op} is not implemented`)}};var sk=(o,e,t,r=Ne)=>{switch(o.op){case"Cast":return[r.cast(_("x",o,e,t),_("dtype",o,e,t))];case"ExpandDims":{let n=_("axis",o,e,t);return[r.expandDims(_("x",o,e,t),n)]}case"Squeeze":{let n=_("axis",o,e,t);return[r.squeeze(_("x",o,e,t),n)]}case"Reshape":return[r.reshape(_("x",o,e,t),_("shape",o,e,t))];case"EnsureShape":return[r.ensureShape(_("x",o,e,t),_("shape",o,e,t))];case"MirrorPad":return[r.mirrorPad(_("x",o,e,t),_("padding",o,e,t),_("mode",o,e,t))];case"PadV2":case"Pad":return[r.pad(_("x",o,e,t),_("padding",o,e,t),_("constantValue",o,e,t))];case"SpaceToBatchND":{let n=_("blockShape",o,e,t),s=_("paddings",o,e,t);return[r.spaceToBatchND(_("x",o,e,t),n,s)]}case"BatchToSpaceND":{let n=_("blockShape",o,e,t),s=_("crops",o,e,t);return[r.batchToSpaceND(_("x",o,e,t),n,s)]}case"DepthToSpace":{let n=_("blockSize",o,e,t),s=_("dataFormat",o,e,t).toUpperCase();return[r.depthToSpace(_("x",o,e,t),n,s)]}case"BroadcastTo":return[r.broadcastTo(_("x",o,e,t),_("shape",o,e,t))];case"BroadcastArgs":return[r.broadcastArgs(_("s0",o,e,t),_("s1",o,e,t))];default:throw TypeError(`Node type ${o.op} is not implemented`)}};function Vg(o,e,t,r,n=fe){let s=((a,i,p)=>{switch(a.category){case"arithmetic":return n(()=>RI(a,i,p));case"basic_math":return n(()=>OI(a,i,p));case"control":return zI(a,i,p);case"convolution":return n(()=>WI(a,i,p));case"creation":return n(()=>GI(a,i,p));case"dynamic":return HI(a,i,p);case"evaluation":return n(()=>qI(a,i,p));case"image":return n(()=>XI(a,i,p));case"graph":return n(()=>KI(a,i,p));case"logical":return n(()=>QI(a,i,p));case"matrices":return n(()=>YI(a,i,p));case"normalization":return n(()=>ZI(a,i,p));case"ragged":return n(()=>JI(a,i,p));case"reduction":return n(()=>ek(a,i,p));case"slice_join":return n(()=>tk(a,i,p));case"sparse":return n(()=>ok(a,i,p));case"spectral":return n(()=>rk(a,i,p));case"string":return n(()=>nk(a,i,p));case"transformation":return n(()=>sk(a,i,p));case"hash_table":return jI(a,i,p,r);case"custom":let l=pd(a.op);if(l&&l.customExecutor)return l.customExecutor(new _d(a,i,p));throw TypeError(`Custom op ${a.op} is not registered.`);default:throw TypeError(`Unknown op '${a.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(o,e,t);return y.isPromise(s)?s.then(a=>[].concat(a)):[].concat(s)}var gl=class{constructor(e={},t={},r={},n={},s){this.weightMap=e,this.tensorArrayMap=t,this.tensorListMap=r,this.functionMap=n,this.parseNodeNameCache=s,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(e,t){return{id:e,frameName:t,iterationId:0}}set currentContext(e){this.contexts!==e&&(this.contexts=e,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){let e=[];for(let t=0;t<this.contexts.length-1;t++){let r=this.contexts.slice(0,this.contexts.length-t);e.push(this.contextIdforContexts(r))}e.push(""),this._currentContextIds=e}contextIdforContexts(e){return e?e.map(t=>t.id===0&&t.iterationId===0?"":`${t.frameName}-${t.iterationId}`).join("/"):""}enterFrame(e){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,e)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(this.contexts&&this.contexts.length>1)this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();else throw new Error("Cannot exit frame, the context is empty")}nextIteration(){if(this.contexts&&this.contexts.length>0){this.contexts=this.contexts.slice(),this.lastId++;let e=Object.assign({},this.contexts[this.contexts.length-1]);e.iterationId+=1,e.id=this.lastId,this.contexts.splice(-1,1,e),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}else throw new Error("Cannot increase frame iteration, the context is empty")}getWeight(e){return this.weightMap[e]}addTensorArray(e){this.tensorArrayMap[e.id]=e}getTensorArray(e){return this.tensorArrayMap[e]}addTensorList(e){this.tensorListMap[e.id]=e}getTensorList(e){return this.tensorListMap[e]}dispose(e){for(let t in this.tensorArrayMap)this.tensorArrayMap[t].clearAndClose(e);for(let t in this.tensorListMap)this.tensorListMap[t].clearAndClose(e)}};function Lg(o,e,t,r){let n=new Set,s=[],a=null,i=null,p=new Set,l=new Set(Object.keys(o).map(m=>kt(m)[0]));r=r||[];let u=new Set(r.map(m=>kt(m.name)[0])),c=[...e];for(;c.length>0;){let m=c.pop();if((Ur(m)||BW(m)||zW(m))&&a==null&&(a=m,i=a.children.map(d=>d.name).filter(d=>n.has(d))),n.add(m.name),t[m.name]==null&&!l.has(m.name)&&!u.has(m.name)){if(m.inputs.length===0){s.push(m.name);continue}m.inputs.forEach(d=>{p.has(d.name)||(p.add(d.name),c.push(d))})}}return{inputs:o,outputs:e,usedNodes:n,missingInputs:s,dynamicNode:a,syncInputs:i}}function ak(o,e){let{usedNodes:t,inputs:r}=e,n=Object.keys(r).map(h=>kt(h)[0]).map(h=>o.nodes[h]),s=o.initNodes||[],a=h=>t.has(typeof h=="string"?h:h.name);function i(h){return[...new Map(h.map(x=>[x.name,x])).values()]}let p=i([...n,...o.weights,...s]).filter(a),l=i([...p,...Object.values(o.nodes)]).filter(a),u=new Map(l.map(h=>[h.name,h])),c={};for(let h of l){c[h.name]=c[h.name]||0;for(let x of h.children)a(x)||(c[x.name]=Number.POSITIVE_INFINITY),c[x.name]=(c[x.name]||0)+1}let m=Object.entries(c).filter(([,h])=>h===0).map(([h])=>h),d=[...m];for(;m.length>0;){let h=m.pop(),x=u.get(h);for(let b of x.children.filter(a))--c[b.name]===0&&(d.push(b.name),m.push(b.name))}let f=d.map(h=>u.get(h)),g=OW(f,p);return PW(g,p),g}function OW(o,e){let t=new Map(o.map(a=>[a.name,a])),r=e.map(a=>a.name),n=new Set(r);for(;r.length>0;){let a=r.pop(),i=t.get(a);for(let p of i.children)!t.has(p.name)||n.has(p.name)||(n.add(p.name),r.push(p.name))}return o.filter(a=>n.has(a.name))}var Tp=class extends Error{constructor(e){super(`NodesExecutionOrderError: ${e}`)}};function PW(o,e){let t=new Map(o.map((i,p)=>[i.name,p])),r=new Set(e.map(i=>i.name)),n=i=>r.has(typeof i=="string"?i:i.name),s=new Set(o.map(i=>i.name)),a=i=>s.has(typeof i=="string"?i:i.name);for(let i of o){for(let p of i.children.filter(a)){if(!t.has(p.name))throw new Tp(`Child ${p.name} of node ${i.name} is unreachable.`);if(t.get(i.name)>t.get(p.name))throw new Tp(`Node ${i.name} is scheduled to run after its child ${p.name}.`)}if(!n(i))for(let p of i.inputs){if(!t.has(p.name))throw new Tp(`Input ${p.name} of node ${i.name} is unreachable.`);if(t.get(p.name)>t.get(i.name))throw new Tp(`Node ${i.name} is scheduled to run before its input ${p.name}.`)}}}function ik(o){let e=new Map(o.map((i,p)=>[i.name,p])),t=Number.MAX_SAFE_INTEGER,r=o.map((i,p)=>Ur(i)?t:p),n=i=>{let p=r[e.get(i.name)];return p??-1},s=o.map((i,p)=>i.children.map(n).reduce((l,u)=>Math.max(l,u),r[p])),a=new Map;for(let i=0;i<o.length;++i){let p=s[i];if(p===t)continue;let l=o[i],u=o[p];a.has(u.name)||a.set(u.name,[]),a.get(u.name).push(l)}return a}var VW=new Set(["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"]),LW=new Set(["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"]),MW=new Set(["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"]);function Ur(o){return VW.has(o.op)}function BW(o){return LW.has(o.op)}function zW(o){return MW.has(o.op)}var xl=class o{get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(e){let t=Object.keys(e).map(r=>e[r].map(n=>n.id));this._weightIds=[].concat(...t),this._weightMap=e}set resourceManager(e){this._resourceManager=e}get inputs(){return this._inputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(e=>e.signatureKey||e.name)}get outputNodes(){return this._outputs.map(e=>{let t=e.signatureKey||e.name;return e.defaultOutput?`${t}:${e.defaultOutput}`:t})}get functions(){return Object.keys(this._functions).reduce((e,t)=>(e[t]=this._functions[t].signature,e),{})}constructor(e,t){this.graph=e,this.parent=t,this.compiledMap=new Map,this.parseNodeNameCache=new Map,this._weightMap={},this.SEPARATOR=",",this._functions={},this._functionExecutorMap={},this.keepIntermediateTensors=!1,this._outputs=e.outputs,this._inputs=e.inputs,this._initNodes=e.initNodes,this._signature=e.signature,this._functions=e.functions,e.functions!=null&&Object.keys(e.functions).forEach(r=>{this._functionExecutorMap[r]=new o(e.functions[r],this)})}getCompilationKey(e,t){let r=e.map(s=>s.name).sort(),n=t.map(s=>s.name).sort();return r.join(this.SEPARATOR)+"--"+n.join(this.SEPARATOR)}compile(e,t){let r=Lg(e,t,this.weightMap,this._initNodes),{missingInputs:n,dynamicNode:s,syncInputs:a}=r;if(s!=null)throw new Error(`This execution contains the node '${s.name}', which has the dynamic op '${s.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${a}]`);if(n.length>0){let l=t.map(c=>c.name),u=Object.keys(e);throw new Error(`Cannot compute the outputs [${l}] from the provided inputs [${u}]. Missing the following inputs: [${n}]`)}let i=ak(this.graph,r),p=ik(i);return{orderedNodes:i,nodeLiveUntilMap:p}}cloneAndKeepTensor(e){if(e==null)return null;let t=e.clone();return Ft(t),t}cloneTensorList(e){return e?e.map(r=>this.cloneAndKeepTensor(r)):null}cloneTensorMap(e){return Object.fromEntries(Object.entries(e).map(([t,r])=>[t,this.cloneTensorList(r)]))}execute(e,t){this.disposeIntermediateTensors(),e=this.mapInputs(e);let r=Object.keys(e).sort();this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t);let n=r.map(m=>this.graph.nodes[kt(m)[0]]),s=t.map(m=>kt(m)[0]),a=new Set(s),i=s.map(m=>this.graph.nodes[m]);i.length===0&&(i=this._outputs);let p=this.getCompilationKey(n,i),l=this.compiledMap.get(p);l==null&&(l=this.compile(e,i),this.compiledMap.set(p,l));try{this.keepIntermediateTensors=F().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(m){this.keepIntermediateTensors=!1,console.warn(m.message)}let u={},c={};return fe(()=>{let m=new gl(this.weightMap,u,c,this.functionExecutorMap,this.parseNodeNameCache),d=Object.assign({},this.weightMap);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap)),Object.keys(e).forEach(x=>{let[b,w]=kt(x,m),v=[];v[w]=e[x],d[b]=v,this.keepIntermediateTensors&&(this.clonedTensorsMap[b]=this.cloneTensorList(v))});let f=this.getFrozenTensorIds(d),{orderedNodes:g,nodeLiveUntilMap:h}=l;for(let x of g){if(d[x.name])continue;let b=Vg(x,d,m,this._resourceManager);if(y.isPromise(b))throw new Error(`The execution of the op '${x.op}' returned a promise. Please use model.executeAsync() instead.`);d[x.name]=b,this.keepIntermediateTensors&&(this.clonedTensorsMap[x.name]=this.cloneTensorList(b)),this.checkTensorForDisposalWithNodeLiveUntilInfo(x,d,m,f,a,h.get(x.name))}return this.parent==null&&m.dispose(f),t.map(x=>ot(x,d,m))})}getFrozenTensorIds(e){let t=[].concat.apply([],Object.keys(e).map(r=>e[r]).map(r=>r.map(n=>n.id)));return new Set(t)}checkTensorForDisposal(e,t,r,n,s,a,i){if(!(Ur(t)||a.has(e))){for(let p of r[e])p!=null&&(i[p.id]=(i[p.id]||0)+t.children.length);for(let p of t.inputs){if(Ur(p))continue;let l=hg(p.name,r,n);if(l!=null)for(let u of l){if(!u||u.kept||s.has(u.id))continue;let c=i[u.id];c===1?(u.dispose(),delete i[u.id]):c!=null&&i[u.id]--}}}}checkTensorForDisposalWithNodeLiveUntilInfo(e,t,r,n,s,a){function i(p){return Ur(p)||s.has(p.name)}if(!(Ur(e)||a==null))for(let p of a){if(i(p))continue;let l=hg(p.name,t,r);for(let u of l)!u||u.kept||n.has(u.id)||u.dispose()}}async executeAsync(e,t){return this._executeAsync(e,t)}disposeIntermediateTensors(){this.clonedTensorsMap&&(Object.values(this.clonedTensorsMap).forEach(e=>{for(let t of e)t&&!t.isDisposed&&t.dispose()}),this.clonedTensorsMap=null)}getIntermediateTensors(){return this.clonedTensorsMap}async _executeAsync(e,t,r=!1,n={},s={}){this.disposeIntermediateTensors(),r||(e=this.mapInputs(e),this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t));try{this.keepIntermediateTensors=F().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(m){this.keepIntermediateTensors=!1,console.warn(m.message)}let a=new gl(this.weightMap,n,s,this.functionExecutorMap,this.parseNodeNameCache);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap));let i=await this.executeWithControlFlow(e,a,t,r),p=t.map(m=>ot(m,i,a)),l=p.map(m=>m.id),u=Object.keys(e).map(m=>e[m].id),c=new Set([...l,...u,...this.weightIds]);return Object.values(i).forEach(m=>{m.forEach(d=>{d&&!d.isDisposed&&!c.has(d.id)&&d.dispose()})}),this.parent==null&&a.dispose(c),p}async executeFunctionAsync(e,t,r){let n=e.reduce((s,a,i)=>(s[this.inputs[i].name]=a,s),{});return this._executeAsync(n,this.outputNodes,!0,t,r)}async executeWithControlFlow(e,t,r,n){let s=Object.keys(e),a=s.map(v=>this.graph.nodes[kt(v)[0]]),i=r.map(v=>kt(v)[0]),p=new Set(i),l=i.map(v=>this.graph.nodes[v]);l.length===0&&(l=this._outputs);let{usedNodes:u,missingInputs:c,dynamicNode:m,syncInputs:d}=Lg(e,l,this.weightMap,this._initNodes),f=[...a,...this.graph.weights,...this._initNodes||[]].map(v=>({node:v,contexts:t.currentContext})),g=Object.assign({},this.weightMap);Object.keys(e).forEach(v=>{let[k,E]=kt(v),$=[];$[E]=e[v],g[k]=$});let h={},x=this.getFrozenTensorIds(g),b={};for(;f.length>0;){let v=this.processStack(a,f,t,g,b,x,p,h,u);await Promise.all(v)}m==null&&!n&&console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.");let w=l.filter(v=>!Ur(v)&&!ot(v.name,g,t)).map(v=>v.name);if(w.length>0){let v="";throw m!=null&&(v=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${d}]`),new Error(`Cannot compute the outputs [${w}] from the provided inputs [${s}]. Consider providing the following inputs: [${c}]. ${v}`)}return g}processStack(e,t,r,n,s,a,i,p,l){let u=[];for(;t.length>0;){let c=t.pop();r.currentContext=c.contexts;let m="";if(c.node.op==="Enter"&&_("isConstant",c.node,n,r)&&([m]=So(c.node.name,r)),n[c.node.name]==null){let d=Vg(c.node,n,r,this._resourceManager);m||([m]=So(c.node.name,r));let f=r.currentContext;y.isPromise(d)?u.push(d.then(g=>(n[m]=g,this.keepIntermediateTensors&&(this.clonedTensorsMap[m]=this.cloneTensorList(g)),r.currentContext=f,this.checkTensorForDisposal(m,c.node,n,r,a,i,p),this.processChildNodes(c.node,t,r,n,s,l),g))):(n[m]=d,this.keepIntermediateTensors&&(this.clonedTensorsMap[m]=this.cloneTensorList(d)),this.checkTensorForDisposal(m,c.node,n,r,a,i,p),this.processChildNodes(c.node,t,r,n,s,l))}else this.processChildNodes(c.node,t,r,n,s,l)}return u}processChildNodes(e,t,r,n,s,a){e.children.forEach(i=>{let[p]=So(i.name,r);s[p]||!a.has(i.name)||(i.op==="Merge"?i.inputNames.some(l=>!!ot(l,n,r))&&(s[p]=!0,t.push({contexts:r.currentContext,node:i})):i.inputNames.every(l=>!!ot(l,n,r))&&(s[p]=!0,t.push({contexts:r.currentContext,node:i})))})}dispose(){Object.keys(this.weightMap).forEach(e=>this.weightMap[e].forEach(t=>t.dispose()))}checkInputShapeAndType(e){Object.keys(e).forEach(t=>{let r=e[t],[n]=kt(t),s=this.graph.nodes[n];if(s.attrParams.shape&&s.attrParams.shape.value){let a=s.attrParams.shape.value,i=a.length===r.shape.length&&r.shape.every((p,l)=>a[l]===-1||a[l]===p);y.assert(i,()=>`The shape of dict['${s.name}'] provided in model.execute(dict) must be [${a}], but was [${r.shape}]`)}s.attrParams.dtype&&s.attrParams.dtype.value&&y.assert(r.dtype===s.attrParams.dtype.value,()=>`The dtype of dict['${s.name}'] provided in model.execute(dict) must be ${s.attrParams.dtype.value}, but was ${r.dtype}`)})}mapInputs(e){var t,r;let n={};for(let s in e){let a=(r=(t=this._signature)===null||t===void 0?void 0:t.inputs)===null||r===void 0?void 0:r[s];a!=null?n[a.name]=e[s]:n[s]=e[s]}return n}checkInputs(e){let t=Object.keys(e).filter(r=>{let[n]=kt(r);return this.graph.nodes[n]==null});if(t.length>0)throw new Error(`The dict provided in model.execute(dict) has keys: [${t}] that are not part of graph`)}mapOutputs(e){return e.map(t=>{var r,n;let s=(n=(r=this._signature)===null||r===void 0?void 0:r.outputs)===null||n===void 0?void 0:n[t];return s!=null?s.name:t},{})}checkOutputs(e){e.forEach(t=>{let[r]=kt(t);if(!this.graph.nodes[r])throw new Error(`The output '${t}' is not found in the graph`)})}};var Cd=class{constructor(e={},t={}){this.hashTableNameToHandle=e,this.hashTableMap=t}addHashTable(e,t){this.hashTableNameToHandle[e]=t.handle,this.hashTableMap[t.id]=t}getHashTableHandleByName(e){return this.hashTableNameToHandle[e]}getHashTableById(e){return this.hashTableMap[e]}dispose(){for(let e in this.hashTableMap)this.hashTableMap[e].clearAndClose(),delete this.hashTableMap[e];for(let e in this.hashTableNameToHandle)this.hashTableNameToHandle[e].dispose(),delete this.hashTableNameToHandle[e]}};var UW="?tfjs-format=file",WW="model.json",Nd=class{get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}constructor(e,t={},r=vs){this.modelUrl=e,this.loadOptions=t,this.version="n/a",this.io=r,t==null&&(this.loadOptions={}),this.resourceManager=new Cd}findIOHandler(){let e=this.modelUrl;if(e.load!=null)this.handler=e;else if(this.loadOptions.requestInit!=null)this.handler=this.io.browserHTTPRequest(e,this.loadOptions);else{let t=this.io.getLoadHandlers(e,this.loadOptions);if(t.length===0)t.push(this.io.browserHTTPRequest(e,this.loadOptions));else if(t.length>1)throw new Error(`Found more than one (${t.length}) load handlers for URL '${[e]}'`);this.handler=t[0]}}load(){if(this.findIOHandler(),this.handler.load==null)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");let e=this.handler.load();return y.isPromise(e)?e.then(t=>t.getWeightStream==null?this.loadSync(t):this.loadStreaming(t)):this.loadSync(e)}loadSync(e){let t=this.io.decodeWeights(e.weightData,e.weightSpecs);return this.loadWithWeightMap(e,t)}async loadStreaming(e){if(e.getWeightStream==null)throw new Error("Model artifacts missing streamWeights function");let t=await Hl(e.getWeightStream(),e.weightSpecs);return this.loadWithWeightMap(e,t)}loadWithWeightMap(e,t){this.artifacts=e;let r=this.artifacts.modelTopology,n=this.artifacts.signature;if(this.artifacts.userDefinedMetadata!=null){let s=this.artifacts.userDefinedMetadata;s.signature!=null&&(n=s.signature),s.structuredOutputKeys!=null&&(this.structuredOutputKeys=s.structuredOutputKeys)}if(this.signature=n,this.version=`${r.versions.producer}.${r.versions.minConsumer}`,this.executor=new xl(hl.Instance.transformGraph(r,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(t),this.executor.resourceManager=this.resourceManager,e.modelInitializer!=null&&e.modelInitializer.node!=null){let s=hl.Instance.transformGraph(e.modelInitializer);this.initializer=new xl(s),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializerSignature=e.initializerSignature}return!0}async save(e,t){if(typeof e=="string"){let r=this.io.getSaveHandlers(e);if(r.length===0)throw new Error(`Cannot find any save handlers for URL '${e}'`);if(r.length>1)throw new Error(`Found more than one (${r.length}) save handlers for URL '${e}'`);e=r[0]}if(e.save==null)throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return e.save(this.artifacts)}addStructuredOutputNames(e){if(this.structuredOutputKeys){let t=e instanceof Oe?[e]:e,r={};return t.forEach((n,s)=>r[this.structuredOutputKeys[s]]=n),r}return e}predict(e,t){let r=this.execute(e,this.outputNodes);return this.addStructuredOutputNames(r)}async predictAsync(e,t){let r=await this.executeAsync(e,this.outputNodes);return this.addStructuredOutputNames(r)}normalizeInputs(e){var t;if(!(e instanceof Oe)&&!Array.isArray(e)){let s=(t=this.signature)===null||t===void 0?void 0:t.inputs;if(s!=null)for(let a in s){let i=s[a];i.resourceId!=null&&(e[a]=this.resourceIdToCapturedInput[i.resourceId])}return e}e=Array.isArray(e)?e:[e];let r=Object.keys(this.resourceIdToCapturedInput).length;if(e.length+r!==this.inputNodes.length)throw new Error(`Input tensor count mismatch, the graph model has ${this.inputNodes.length-r} non-resource placeholders, while there are ${e.length} input tensors provided.`);let n=0;return this.inputNodes.reduce((s,a)=>{var i,p,l;let u=(l=(p=(i=this.signature)===null||i===void 0?void 0:i.inputs)===null||p===void 0?void 0:p[a])===null||l===void 0?void 0:l.resourceId;return u!=null?s[a]=this.resourceIdToCapturedInput[u]:s[a]=e[n++],s},{})}normalizeOutputs(e){return e=e||this.outputNodes,Array.isArray(e)?e:[e]}executeInitializerGraph(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.execute({},[]):this.initializer.execute({},Object.keys(this.initializerSignature.outputs))}async executeInitializerGraphAsync(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.executeAsync({},[]):this.initializer.executeAsync({},Object.keys(this.initializerSignature.outputs))}setResourceIdToCapturedInput(e){if(this.resourceIdToCapturedInput={},this.initializerSignature){let t=this.initializerSignature.outputs,r=Object.keys(t);for(let n=0;n<r.length;n++){let s=r[n],a=t[s];this.resourceIdToCapturedInput[a.resourceId]=e[n]}}}execute(e,t){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(this.executeInitializerGraph()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);let r=this.executor.execute(e,t);return r.length>1?r:r[0]}async executeAsync(e,t){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(await this.executeInitializerGraphAsync()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);let r=await this.executor.executeAsync(e,t);return r.length>1?r:r[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(e){return Object.keys(e).reduce((t,r)=>(t[r]=[e[r]],t),{})}dispose(){this.executor.dispose(),this.initializer&&(this.initializer.dispose(),this.resourceIdToCapturedInput&&Ye(this.resourceIdToCapturedInput)),this.resourceManager.dispose()}};async function Mg(o,e={},t=vs){if(o==null)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");e==null&&(e={}),e.fromTFHub&&typeof o=="string"&&(o=GW(o));let r=new Nd(o,e,t);return await r.load(),r}function GW(o){return o.endsWith("/")||(o=o+"/"),`${o}${WW}${UW}`}var vp={format:"graph-model",generatedBy:"1.14.0",convertedBy:"TensorFlow.js Converter v1.2.10.1",modelTopology:{node:[{attr:{dtype:{type:"DT_FLOAT"},shape:{shape:{dim:[{size:"-1"},{size:"224"},{size:"224"},{size:"3"}]}}},name:"images",op:"Placeholder"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{}}}},name:"module_apply_default/hub_input/Mul/y",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{}}}},name:"module_apply_default/hub_input/Sub/y",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"1280"},{size:"1001"}]}}}},name:"module/MobilenetV2/Logits/Conv2d_1c_1x1/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1001"}]}}}},name:"module/MobilenetV2/Logits/Conv2d_1c_1x1/biases",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"3"},{size:"32"}]}}}},name:"module/MobilenetV2/Conv/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"32"}]}}}},name:"module_apply_default/MobilenetV2/Conv/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"32"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"32"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"32"},{size:"16"}]}}}},name:"module/MobilenetV2/expanded_conv/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"16"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"16"},{size:"96"}]}}}},name:"module/MobilenetV2/expanded_conv_1/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"96"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_1/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"96"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_1/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"96"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_1/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"96"},{size:"24"}]}}}},name:"module/MobilenetV2/expanded_conv_1/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"24"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_1/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"24"},{size:"144"}]}}}},name:"module/MobilenetV2/expanded_conv_2/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"144"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_2/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"144"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_2/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"144"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_2/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"144"},{size:"24"}]}}}},name:"module/MobilenetV2/expanded_conv_2/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"24"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_2/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"24"},{size:"144"}]}}}},name:"module/MobilenetV2/expanded_conv_3/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"144"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_3/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"144"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_3/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"144"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_3/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"144"},{size:"32"}]}}}},name:"module/MobilenetV2/expanded_conv_3/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"32"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_3/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"32"},{size:"192"}]}}}},name:"module/MobilenetV2/expanded_conv_4/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"192"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_4/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"192"},{size:"32"}]}}}},name:"module/MobilenetV2/expanded_conv_4/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"32"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"32"},{size:"192"}]}}}},name:"module/MobilenetV2/expanded_conv_5/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_5/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"192"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_5/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_5/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"192"},{size:"32"}]}}}},name:"module/MobilenetV2/expanded_conv_5/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"32"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_5/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"32"},{size:"192"}]}}}},name:"module/MobilenetV2/expanded_conv_6/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_6/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"192"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_6/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_6/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"192"},{size:"64"}]}}}},name:"module/MobilenetV2/expanded_conv_6/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"64"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_6/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"64"},{size:"384"}]}}}},name:"module/MobilenetV2/expanded_conv_7/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_7/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"384"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_7/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_7/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"384"},{size:"64"}]}}}},name:"module/MobilenetV2/expanded_conv_7/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"64"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_7/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"64"},{size:"384"}]}}}},name:"module/MobilenetV2/expanded_conv_8/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"384"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_8/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"384"},{size:"64"}]}}}},name:"module/MobilenetV2/expanded_conv_8/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"64"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"64"},{size:"384"}]}}}},name:"module/MobilenetV2/expanded_conv_9/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_9/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"384"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_9/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_9/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"384"},{size:"64"}]}}}},name:"module/MobilenetV2/expanded_conv_9/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"64"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_9/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"64"},{size:"384"}]}}}},name:"module/MobilenetV2/expanded_conv_10/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_10/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"384"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_10/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_10/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"384"},{size:"96"}]}}}},name:"module/MobilenetV2/expanded_conv_10/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"96"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_10/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"96"},{size:"576"}]}}}},name:"module/MobilenetV2/expanded_conv_11/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_11/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"576"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_11/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_11/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"576"},{size:"96"}]}}}},name:"module/MobilenetV2/expanded_conv_11/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"96"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_11/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"96"},{size:"576"}]}}}},name:"module/MobilenetV2/expanded_conv_12/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_12/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"576"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_12/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_12/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"576"},{size:"96"}]}}}},name:"module/MobilenetV2/expanded_conv_12/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"96"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_12/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"96"},{size:"576"}]}}}},name:"module/MobilenetV2/expanded_conv_13/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_13/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"576"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_13/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_13/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"576"},{size:"160"}]}}}},name:"module/MobilenetV2/expanded_conv_13/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"160"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_13/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"160"},{size:"960"}]}}}},name:"module/MobilenetV2/expanded_conv_14/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_14/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"960"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_14/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_14/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"960"},{size:"160"}]}}}},name:"module/MobilenetV2/expanded_conv_14/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"160"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_14/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"160"},{size:"960"}]}}}},name:"module/MobilenetV2/expanded_conv_15/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_15/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"960"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_15/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_15/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"960"},{size:"160"}]}}}},name:"module/MobilenetV2/expanded_conv_15/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"160"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_15/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"160"},{size:"960"}]}}}},name:"module/MobilenetV2/expanded_conv_16/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_16/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"960"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_16/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_16/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"960"},{size:"320"}]}}}},name:"module/MobilenetV2/expanded_conv_16/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"320"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_16/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"320"},{size:"1280"}]}}}},name:"module/MobilenetV2/Conv_1/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1280"}]}}}},name:"module_apply_default/MobilenetV2/Conv_1/Conv2D_bn_offset",op:"Const"},{input:["images","module_apply_default/hub_input/Mul/y"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/hub_input/Mul",op:"Mul"},{input:["module_apply_default/hub_input/Mul","module_apply_default/hub_input/Sub/y"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/hub_input/Sub",op:"Sub"},{device:"/device:CPU:0",input:["module_apply_default/hub_input/Sub","module/MobilenetV2/Conv/weights","module_apply_default/MobilenetV2/Conv/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","2","2","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/Conv/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/Conv/Relu6","module/MobilenetV2/expanded_conv/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv/depthwise/Relu6","module/MobilenetV2/expanded_conv/project/weights","module_apply_default/MobilenetV2/expanded_conv/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_1/expand/weights","module_apply_default/MobilenetV2/expanded_conv_1/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_1/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_1/expand/Relu6","module/MobilenetV2/expanded_conv_1/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","2","2","1"]}},dilations:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_1/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_1/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_1/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_1/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_1/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_1/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_1/depthwise/Relu6","module/MobilenetV2/expanded_conv_1/project/weights","module_apply_default/MobilenetV2/expanded_conv_1/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_1/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_1/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_2/expand/weights","module_apply_default/MobilenetV2/expanded_conv_2/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_2/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_2/expand/Relu6","module/MobilenetV2/expanded_conv_2/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},dilations:{list:{i:["1","1","1","1"]}},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_2/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_2/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_2/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_2/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_2/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_2/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_2/depthwise/Relu6","module/MobilenetV2/expanded_conv_2/project/weights","module_apply_default/MobilenetV2/expanded_conv_2/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_2/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_1/project/BatchNorm/FusedBatchNorm","module_apply_default/MobilenetV2/expanded_conv_2/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_2/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_2/add","module/MobilenetV2/expanded_conv_3/expand/weights","module_apply_default/MobilenetV2/expanded_conv_3/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_3/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_3/expand/Relu6","module/MobilenetV2/expanded_conv_3/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","2","2","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_3/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_3/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_3/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_3/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_3/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_3/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_3/depthwise/Relu6","module/MobilenetV2/expanded_conv_3/project/weights","module_apply_default/MobilenetV2/expanded_conv_3/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_3/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_3/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_4/expand/weights","module_apply_default/MobilenetV2/expanded_conv_4/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_4/expand/Relu6","module/MobilenetV2/expanded_conv_4/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"},strides:{list:{i:["1","1","1","1"]}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_4/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_4/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_4/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_4/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_4/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_4/depthwise/Relu6","module/MobilenetV2/expanded_conv_4/project/weights","module_apply_default/MobilenetV2/expanded_conv_4/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_3/project/BatchNorm/FusedBatchNorm","module_apply_default/MobilenetV2/expanded_conv_4/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_4/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_4/add","module/MobilenetV2/expanded_conv_5/expand/weights","module_apply_default/MobilenetV2/expanded_conv_5/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_5/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_5/expand/Relu6","module/MobilenetV2/expanded_conv_5/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_5/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_5/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_5/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_5/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_5/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_5/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_5/depthwise/Relu6","module/MobilenetV2/expanded_conv_5/project/weights","module_apply_default/MobilenetV2/expanded_conv_5/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_5/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_4/add","module_apply_default/MobilenetV2/expanded_conv_5/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_5/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_5/add","module/MobilenetV2/expanded_conv_6/expand/weights","module_apply_default/MobilenetV2/expanded_conv_6/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_6/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_6/expand/Relu6","module/MobilenetV2/expanded_conv_6/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","2","2","1"]}},dilations:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_6/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_6/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_6/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_6/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_6/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_6/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_6/depthwise/Relu6","module/MobilenetV2/expanded_conv_6/project/weights","module_apply_default/MobilenetV2/expanded_conv_6/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_6/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_6/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_7/expand/weights","module_apply_default/MobilenetV2/expanded_conv_7/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_7/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_7/expand/Relu6","module/MobilenetV2/expanded_conv_7/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},dilations:{list:{i:["1","1","1","1"]}},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_7/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_7/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_7/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_7/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_7/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_7/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_7/depthwise/Relu6","module/MobilenetV2/expanded_conv_7/project/weights","module_apply_default/MobilenetV2/expanded_conv_7/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_7/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_6/project/BatchNorm/FusedBatchNorm","module_apply_default/MobilenetV2/expanded_conv_7/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_7/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_7/add","module/MobilenetV2/expanded_conv_8/expand/weights","module_apply_default/MobilenetV2/expanded_conv_8/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_8/expand/Relu6","module/MobilenetV2/expanded_conv_8/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"},strides:{list:{i:["1","1","1","1"]}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_8/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_8/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_8/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_8/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_8/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_8/depthwise/Relu6","module/MobilenetV2/expanded_conv_8/project/weights","module_apply_default/MobilenetV2/expanded_conv_8/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_7/add","module_apply_default/MobilenetV2/expanded_conv_8/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_8/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_8/add","module/MobilenetV2/expanded_conv_9/expand/weights","module_apply_default/MobilenetV2/expanded_conv_9/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_9/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_9/expand/Relu6","module/MobilenetV2/expanded_conv_9/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_9/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_9/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_9/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_9/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_9/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_9/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_9/depthwise/Relu6","module/MobilenetV2/expanded_conv_9/project/weights","module_apply_default/MobilenetV2/expanded_conv_9/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_9/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_8/add","module_apply_default/MobilenetV2/expanded_conv_9/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_9/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_9/add","module/MobilenetV2/expanded_conv_10/expand/weights","module_apply_default/MobilenetV2/expanded_conv_10/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_10/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_10/expand/Relu6","module/MobilenetV2/expanded_conv_10/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},dilations:{list:{i:["1","1","1","1"]}},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_10/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_10/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_10/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_10/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_10/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_10/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_10/depthwise/Relu6","module/MobilenetV2/expanded_conv_10/project/weights","module_apply_default/MobilenetV2/expanded_conv_10/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_10/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_10/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_11/expand/weights","module_apply_default/MobilenetV2/expanded_conv_11/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_11/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_11/expand/Relu6","module/MobilenetV2/expanded_conv_11/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_11/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_11/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_11/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_11/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_11/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_11/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_11/depthwise/Relu6","module/MobilenetV2/expanded_conv_11/project/weights","module_apply_default/MobilenetV2/expanded_conv_11/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_11/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_10/project/BatchNorm/FusedBatchNorm","module_apply_default/MobilenetV2/expanded_conv_11/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_11/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_11/add","module/MobilenetV2/expanded_conv_12/expand/weights","module_apply_default/MobilenetV2/expanded_conv_12/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_12/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_12/expand/Relu6","module/MobilenetV2/expanded_conv_12/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_12/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_12/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_12/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_12/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_12/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_12/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_12/depthwise/Relu6","module/MobilenetV2/expanded_conv_12/project/weights","module_apply_default/MobilenetV2/expanded_conv_12/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_12/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_11/add","module_apply_default/MobilenetV2/expanded_conv_12/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_12/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_12/add","module/MobilenetV2/expanded_conv_13/expand/weights","module_apply_default/MobilenetV2/expanded_conv_13/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_13/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_13/expand/Relu6","module/MobilenetV2/expanded_conv_13/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","2","2","1"]}},padding:{s:"U0FNRQ=="},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_13/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_13/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_13/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_13/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_13/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_13/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_13/depthwise/Relu6","module/MobilenetV2/expanded_conv_13/project/weights","module_apply_default/MobilenetV2/expanded_conv_13/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_13/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_13/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_14/expand/weights","module_apply_default/MobilenetV2/expanded_conv_14/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_14/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_14/expand/Relu6","module/MobilenetV2/expanded_conv_14/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_14/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_14/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_14/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_14/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_14/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_14/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_14/depthwise/Relu6","module/MobilenetV2/expanded_conv_14/project/weights","module_apply_default/MobilenetV2/expanded_conv_14/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_14/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_13/project/BatchNorm/FusedBatchNorm","module_apply_default/MobilenetV2/expanded_conv_14/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_14/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_14/add","module/MobilenetV2/expanded_conv_15/expand/weights","module_apply_default/MobilenetV2/expanded_conv_15/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_15/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_15/expand/Relu6","module/MobilenetV2/expanded_conv_15/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},dilations:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_15/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_15/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_15/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_15/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_15/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_15/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_15/depthwise/Relu6","module/MobilenetV2/expanded_conv_15/project/weights","module_apply_default/MobilenetV2/expanded_conv_15/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_15/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_14/add","module_apply_default/MobilenetV2/expanded_conv_15/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_15/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_15/add","module/MobilenetV2/expanded_conv_16/expand/weights","module_apply_default/MobilenetV2/expanded_conv_16/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_16/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_16/expand/Relu6","module/MobilenetV2/expanded_conv_16/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_16/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_16/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_16/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_16/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_16/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_16/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_16/depthwise/Relu6","module/MobilenetV2/expanded_conv_16/project/weights","module_apply_default/MobilenetV2/expanded_conv_16/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_16/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_16/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/Conv_1/weights","module_apply_default/MobilenetV2/Conv_1/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/Conv_1/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/Conv_1/Relu6"],attr:{padding:{s:"VkFMSUQ="},strides:{list:{i:["1","1","1","1"]}},data_format:{s:"TkhXQw=="},ksize:{list:{i:["1","7","7","1"]}},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/Logits/AvgPool",op:"AvgPool"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/Logits/AvgPool","module/MobilenetV2/Logits/Conv2d_1c_1x1/weights","module/MobilenetV2/Logits/Conv2d_1c_1x1/biases"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/Logits/Conv2d_1c_1x1/BiasAdd",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/Logits/Conv2d_1c_1x1/BiasAdd"],attr:{squeeze_dims:{list:{i:["1","2"]}},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/Logits/Squeeze",op:"Squeeze"},{input:["module_apply_default/MobilenetV2/Logits/Squeeze"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/Logits/output",op:"Identity"}],library:{},versions:{}},weightSpecs:[{name:"module_apply_default/hub_input/Mul/y",shape:[],dtype:"float32"},{name:"module_apply_default/hub_input/Sub/y",shape:[],dtype:"float32"},{name:"module/MobilenetV2/Logits/Conv2d_1c_1x1/weights",shape:[1,1,1280,1001],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/Logits/Conv2d_1c_1x1/biases",shape:[1001],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/Conv/weights",shape:[3,3,3,32],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/Conv/Conv2D_bn_offset",shape:[32],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv/depthwise/depthwise_weights",shape:[3,3,32,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv/depthwise/depthwise_bn_offset",shape:[32],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv/project/weights",shape:[1,1,32,16],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv/project/Conv2D_bn_offset",shape:[16],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_1/expand/weights",shape:[1,1,16,96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_1/expand/Conv2D_bn_offset",shape:[96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_1/depthwise/depthwise_weights",shape:[3,3,96,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_1/depthwise/depthwise_bn_offset",shape:[96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_1/project/weights",shape:[1,1,96,24],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_1/project/Conv2D_bn_offset",shape:[24],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_2/expand/weights",shape:[1,1,24,144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_2/expand/Conv2D_bn_offset",shape:[144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_2/depthwise/depthwise_weights",shape:[3,3,144,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_2/depthwise/depthwise_bn_offset",shape:[144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_2/project/weights",shape:[1,1,144,24],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_2/project/Conv2D_bn_offset",shape:[24],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_3/expand/weights",shape:[1,1,24,144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_3/expand/Conv2D_bn_offset",shape:[144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_3/depthwise/depthwise_weights",shape:[3,3,144,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_3/depthwise/depthwise_bn_offset",shape:[144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_3/project/weights",shape:[1,1,144,32],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_3/project/Conv2D_bn_offset",shape:[32],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_4/expand/weights",shape:[1,1,32,192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_4/expand/Conv2D_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_4/depthwise/depthwise_weights",shape:[3,3,192,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_4/depthwise/depthwise_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_4/project/weights",shape:[1,1,192,32],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_4/project/Conv2D_bn_offset",shape:[32],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_5/expand/weights",shape:[1,1,32,192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_5/expand/Conv2D_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_5/depthwise/depthwise_weights",shape:[3,3,192,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_5/depthwise/depthwise_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_5/project/weights",shape:[1,1,192,32],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_5/project/Conv2D_bn_offset",shape:[32],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_6/expand/weights",shape:[1,1,32,192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_6/expand/Conv2D_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_6/depthwise/depthwise_weights",shape:[3,3,192,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_6/depthwise/depthwise_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_6/project/weights",shape:[1,1,192,64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_6/project/Conv2D_bn_offset",shape:[64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_7/expand/weights",shape:[1,1,64,384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_7/expand/Conv2D_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_7/depthwise/depthwise_weights",shape:[3,3,384,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_7/depthwise/depthwise_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_7/project/weights",shape:[1,1,384,64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_7/project/Conv2D_bn_offset",shape:[64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_8/expand/weights",shape:[1,1,64,384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_8/expand/Conv2D_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_8/depthwise/depthwise_weights",shape:[3,3,384,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_8/depthwise/depthwise_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_8/project/weights",shape:[1,1,384,64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_8/project/Conv2D_bn_offset",shape:[64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_9/expand/weights",shape:[1,1,64,384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_9/expand/Conv2D_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_9/depthwise/depthwise_weights",shape:[3,3,384,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_9/depthwise/depthwise_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_9/project/weights",shape:[1,1,384,64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_9/project/Conv2D_bn_offset",shape:[64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_10/expand/weights",shape:[1,1,64,384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_10/expand/Conv2D_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_10/depthwise/depthwise_weights",shape:[3,3,384,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_10/depthwise/depthwise_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_10/project/weights",shape:[1,1,384,96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_10/project/Conv2D_bn_offset",shape:[96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_11/expand/weights",shape:[1,1,96,576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_11/expand/Conv2D_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_11/depthwise/depthwise_weights",shape:[3,3,576,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_11/depthwise/depthwise_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_11/project/weights",shape:[1,1,576,96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_11/project/Conv2D_bn_offset",shape:[96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_12/expand/weights",shape:[1,1,96,576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_12/expand/Conv2D_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_12/depthwise/depthwise_weights",shape:[3,3,576,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_12/depthwise/depthwise_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_12/project/weights",shape:[1,1,576,96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_12/project/Conv2D_bn_offset",shape:[96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_13/expand/weights",shape:[1,1,96,576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_13/expand/Conv2D_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_13/depthwise/depthwise_weights",shape:[3,3,576,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_13/depthwise/depthwise_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_13/project/weights",shape:[1,1,576,160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_13/project/Conv2D_bn_offset",shape:[160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_14/expand/weights",shape:[1,1,160,960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_14/expand/Conv2D_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_14/depthwise/depthwise_weights",shape:[3,3,960,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_14/depthwise/depthwise_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_14/project/weights",shape:[1,1,960,160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_14/project/Conv2D_bn_offset",shape:[160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_15/expand/weights",shape:[1,1,160,960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_15/expand/Conv2D_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_15/depthwise/depthwise_weights",shape:[3,3,960,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_15/depthwise/depthwise_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_15/project/weights",shape:[1,1,960,160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_15/project/Conv2D_bn_offset",shape:[160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_16/expand/weights",shape:[1,1,160,960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_16/expand/Conv2D_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_16/depthwise/depthwise_weights",shape:[3,3,960,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_16/depthwise/depthwise_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_16/project/weights",shape:[1,1,960,320],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_16/project/Conv2D_bn_offset",shape:[320],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/Conv_1/weights",shape:[1,1,320,1280],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/Conv_1/Conv2D_bn_offset",shape:[1280],dtype:"float32",quantization:{dtype:"float16"}}]};var Sd=null;async function qW(o){if(Sd)return;let e=!1;try{e=await pf("webgl")}catch{e=!1}e||await pf("cpu"),await _x(),Sd=await Mg(vs.fromMemory({modelTopology:vp.modelTopology,weightSpecs:vp.weightSpecs,weightData:o,format:vp.format,generatedBy:vp.generatedBy,convertedBy:vp.convertedBy})),fe(()=>Sd.predict(qt([1,224,224,3])))}async function KW(o){let e=fe(()=>{let r=_e(we(Yu.fromPixels(o),"float32"),255),n=Sd.predict(O(r,[1,224,224,3]));return ku(Te(n,[0,1],[-1,1e3]))}),t=await e.data();return e.dispose(),t}window.QAITA_AI={load:qW,classify:KW,backend:()=>Ul()};})();
