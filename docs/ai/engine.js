(()=>{var Q$=Object.create;var Ff=Object.defineProperty;var Y$=Object.getOwnPropertyDescriptor;var Z$=Object.getOwnPropertyNames;var J$=Object.getPrototypeOf,eA=Object.prototype.hasOwnProperty;var $r=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),je=(r,e)=>{for(var t in e)Ff(r,t,{get:e[t],enumerable:!0})},tA=(r,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Z$(e))!eA.call(r,n)&&n!==t&&Ff(r,n,{get:()=>e[n],enumerable:!(o=Y$(e,n))||o.enumerable});return r};var Df=(r,e,t)=>(t=r!=null?Q$(J$(r)):{},tA(e||!r||!r.__esModule?Ff(t,"default",{value:r,enumerable:!0}):t,r));var Hy=$r((gq,Gy)=>{Gy.exports=lt;var Ar=null;try{Ar=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function lt(r,e,t){this.low=r|0,this.high=e|0,this.unsigned=!!t}lt.prototype.__isLong__;Object.defineProperty(lt.prototype,"__isLong__",{value:!0});function gr(r){return(r&&r.__isLong__)===!0}lt.isLong=gr;var Oy={},Py={};function Ds(r,e){var t,o,n;return e?(r>>>=0,(n=0<=r&&r<256)&&(o=Py[r],o)?o:(t=ut(r,(r|0)<0?-1:0,!0),n&&(Py[r]=t),t)):(r|=0,(n=-128<=r&&r<128)&&(o=Oy[r],o)?o:(t=ut(r,r<0?-1:0,!1),n&&(Oy[r]=t),t))}lt.fromInt=Ds;function Fr(r,e){if(isNaN(r))return e?Fs:Dr;if(e){if(r<0)return Fs;if(r>=By)return Wy}else{if(r<=-Ly)return hr;if(r+1>=Ly)return Uy}return r<0?Fr(-r,e).neg():ut(r%dp|0,r/dp|0,e)}lt.fromNumber=Fr;function ut(r,e,t){return new lt(r,e,t)}lt.fromBits=ut;var Iu=Math.pow;function jf(r,e,t){if(r.length===0)throw Error("empty string");if(r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return Dr;if(typeof e=="number"?(t=e,e=!1):e=!!e,t=t||10,t<2||36<t)throw RangeError("radix");var o;if((o=r.indexOf("-"))>0)throw Error("interior hyphen");if(o===0)return jf(r.substring(1),e,t).neg();for(var n=Fr(Iu(t,8)),s=Dr,a=0;a<r.length;a+=8){var i=Math.min(8,r.length-a),p=parseInt(r.substring(a,a+i),t);if(i<8){var l=Fr(Iu(t,i));s=s.mul(l).add(Fr(p))}else s=s.mul(n),s=s.add(Fr(p))}return s.unsigned=e,s}lt.fromString=jf;function Gr(r,e){return typeof r=="number"?Fr(r,e):typeof r=="string"?jf(r,e):ut(r.low,r.high,typeof e=="boolean"?e:r.unsigned)}lt.fromValue=Gr;var My=65536,SA=1<<24,dp=My*My,By=dp*dp,Ly=By/2,Vy=Ds(SA),Dr=Ds(0);lt.ZERO=Dr;var Fs=Ds(0,!0);lt.UZERO=Fs;var mp=Ds(1);lt.ONE=mp;var zy=Ds(1,!0);lt.UONE=zy;var Kf=Ds(-1);lt.NEG_ONE=Kf;var Uy=ut(-1,2147483647,!1);lt.MAX_VALUE=Uy;var Wy=ut(-1,-1,!0);lt.MAX_UNSIGNED_VALUE=Wy;var hr=ut(0,-2147483648,!1);lt.MIN_VALUE=hr;var pe=lt.prototype;pe.toInt=function(){return this.unsigned?this.low>>>0:this.low};pe.toNumber=function(){return this.unsigned?(this.high>>>0)*dp+(this.low>>>0):this.high*dp+(this.low>>>0)};pe.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(hr)){var t=Fr(e),o=this.div(t),n=o.mul(t).sub(this);return o.toString(e)+n.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var s=Fr(Iu(e,6),this.unsigned),a=this,i="";;){var p=a.div(s),l=a.sub(p.mul(s)).toInt()>>>0,u=l.toString(e);if(a=p,a.isZero())return u+i;for(;u.length<6;)u="0"+u;i=""+u+i}};pe.getHighBits=function(){return this.high};pe.getHighBitsUnsigned=function(){return this.high>>>0};pe.getLowBits=function(){return this.low};pe.getLowBitsUnsigned=function(){return this.low>>>0};pe.getNumBitsAbs=function(){if(this.isNegative())return this.eq(hr)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,t=31;t>0&&!(e&1<<t);t--);return this.high!=0?t+33:t+1};pe.isZero=function(){return this.high===0&&this.low===0};pe.eqz=pe.isZero;pe.isNegative=function(){return!this.unsigned&&this.high<0};pe.isPositive=function(){return this.unsigned||this.high>=0};pe.isOdd=function(){return(this.low&1)===1};pe.isEven=function(){return(this.low&1)===0};pe.equals=function(e){return gr(e)||(e=Gr(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};pe.eq=pe.equals;pe.notEquals=function(e){return!this.eq(e)};pe.neq=pe.notEquals;pe.ne=pe.notEquals;pe.lessThan=function(e){return this.comp(e)<0};pe.lt=pe.lessThan;pe.lessThanOrEqual=function(e){return this.comp(e)<=0};pe.lte=pe.lessThanOrEqual;pe.le=pe.lessThanOrEqual;pe.greaterThan=function(e){return this.comp(e)>0};pe.gt=pe.greaterThan;pe.greaterThanOrEqual=function(e){return this.comp(e)>=0};pe.gte=pe.greaterThanOrEqual;pe.ge=pe.greaterThanOrEqual;pe.compare=function(e){if(gr(e)||(e=Gr(e)),this.eq(e))return 0;var t=this.isNegative(),o=e.isNegative();return t&&!o?-1:!t&&o?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};pe.comp=pe.compare;pe.negate=function(){return!this.unsigned&&this.eq(hr)?hr:this.not().add(mp)};pe.neg=pe.negate;pe.add=function(e){gr(e)||(e=Gr(e));var t=this.high>>>16,o=this.high&65535,n=this.low>>>16,s=this.low&65535,a=e.high>>>16,i=e.high&65535,p=e.low>>>16,l=e.low&65535,u=0,c=0,m=0,d=0;return d+=s+l,m+=d>>>16,d&=65535,m+=n+p,c+=m>>>16,m&=65535,c+=o+i,u+=c>>>16,c&=65535,u+=t+a,u&=65535,ut(m<<16|d,u<<16|c,this.unsigned)};pe.subtract=function(e){return gr(e)||(e=Gr(e)),this.add(e.neg())};pe.sub=pe.subtract;pe.multiply=function(e){if(this.isZero())return Dr;if(gr(e)||(e=Gr(e)),Ar){var t=Ar.mul(this.low,this.high,e.low,e.high);return ut(t,Ar.get_high(),this.unsigned)}if(e.isZero())return Dr;if(this.eq(hr))return e.isOdd()?hr:Dr;if(e.eq(hr))return this.isOdd()?hr:Dr;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Vy)&&e.lt(Vy))return Fr(this.toNumber()*e.toNumber(),this.unsigned);var o=this.high>>>16,n=this.high&65535,s=this.low>>>16,a=this.low&65535,i=e.high>>>16,p=e.high&65535,l=e.low>>>16,u=e.low&65535,c=0,m=0,d=0,f=0;return f+=a*u,d+=f>>>16,f&=65535,d+=s*u,m+=d>>>16,d&=65535,d+=a*l,m+=d>>>16,d&=65535,m+=n*u,c+=m>>>16,m&=65535,m+=s*l,c+=m>>>16,m&=65535,m+=a*p,c+=m>>>16,m&=65535,c+=o*u+n*l+s*p+a*i,c&=65535,ut(d<<16|f,c<<16|m,this.unsigned)};pe.mul=pe.multiply;pe.divide=function(e){if(gr(e)||(e=Gr(e)),e.isZero())throw Error("division by zero");if(Ar){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var t=(this.unsigned?Ar.div_u:Ar.div_s)(this.low,this.high,e.low,e.high);return ut(t,Ar.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Fs:Dr;var o,n,s;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Fs;if(e.gt(this.shru(1)))return zy;s=Fs}else{if(this.eq(hr)){if(e.eq(mp)||e.eq(Kf))return hr;if(e.eq(hr))return mp;var a=this.shr(1);return o=a.div(e).shl(1),o.eq(Dr)?e.isNegative()?mp:Kf:(n=this.sub(e.mul(o)),s=o.add(n.div(e)),s)}else if(e.eq(hr))return this.unsigned?Fs:Dr;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();s=Dr}for(n=this;n.gte(e);){o=Math.max(1,Math.floor(n.toNumber()/e.toNumber()));for(var i=Math.ceil(Math.log(o)/Math.LN2),p=i<=48?1:Iu(2,i-48),l=Fr(o),u=l.mul(e);u.isNegative()||u.gt(n);)o-=p,l=Fr(o,this.unsigned),u=l.mul(e);l.isZero()&&(l=mp),s=s.add(l),n=n.sub(u)}return s};pe.div=pe.divide;pe.modulo=function(e){if(gr(e)||(e=Gr(e)),Ar){var t=(this.unsigned?Ar.rem_u:Ar.rem_s)(this.low,this.high,e.low,e.high);return ut(t,Ar.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};pe.mod=pe.modulo;pe.rem=pe.modulo;pe.not=function(){return ut(~this.low,~this.high,this.unsigned)};pe.and=function(e){return gr(e)||(e=Gr(e)),ut(this.low&e.low,this.high&e.high,this.unsigned)};pe.or=function(e){return gr(e)||(e=Gr(e)),ut(this.low|e.low,this.high|e.high,this.unsigned)};pe.xor=function(e){return gr(e)||(e=Gr(e)),ut(this.low^e.low,this.high^e.high,this.unsigned)};pe.shiftLeft=function(e){return gr(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?ut(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):ut(0,this.low<<e-32,this.unsigned)};pe.shl=pe.shiftLeft;pe.shiftRight=function(e){return gr(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?ut(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):ut(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};pe.shr=pe.shiftRight;pe.shiftRightUnsigned=function(e){if(gr(e)&&(e=e.toInt()),e&=63,e===0)return this;var t=this.high;if(e<32){var o=this.low;return ut(o>>>e|t<<32-e,t>>>e,this.unsigned)}else return e===32?ut(t,0,this.unsigned):ut(t>>>e-32,0,this.unsigned)};pe.shru=pe.shiftRightUnsigned;pe.shr_u=pe.shiftRightUnsigned;pe.toSigned=function(){return this.unsigned?ut(this.low,this.high,!1):this};pe.toUnsigned=function(){return this.unsigned?this:ut(this.low,this.high,!0)};pe.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};pe.toBytesLE=function(){var e=this.high,t=this.low;return[t&255,t>>>8&255,t>>>16&255,t>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};pe.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,t>>>24,t>>>16&255,t>>>8&255,t&255]};lt.fromBytes=function(e,t,o){return o?lt.fromBytesLE(e,t):lt.fromBytesBE(e,t)};lt.fromBytesLE=function(e,t){return new lt(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)};lt.fromBytesBE=function(e,t){return new lt(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)}});var Ab=$r(()=>{});var Fb=$r(()=>{});var i1=$r((a1,Ch)=>{(function(r,e,t){function o(i){var p=this,l=a();p.next=function(){var u=2091639*p.s0+p.c*23283064365386963e-26;return p.s0=p.s1,p.s1=p.s2,p.s2=u-(p.c=u|0)},p.c=1,p.s0=l(" "),p.s1=l(" "),p.s2=l(" "),p.s0-=l(i),p.s0<0&&(p.s0+=1),p.s1-=l(i),p.s1<0&&(p.s1+=1),p.s2-=l(i),p.s2<0&&(p.s2+=1),l=null}function n(i,p){return p.c=i.c,p.s0=i.s0,p.s1=i.s1,p.s2=i.s2,p}function s(i,p){var l=new o(i),u=p&&p.state,c=l.next;return c.int32=function(){return l.next()*4294967296|0},c.double=function(){return c()+(c()*2097152|0)*11102230246251565e-32},c.quick=c,u&&(typeof u=="object"&&n(u,l),c.state=function(){return n(l,{})}),c}function a(){var i=4022871197,p=function(l){l=String(l);for(var u=0;u<l.length;u++){i+=l.charCodeAt(u);var c=.02519603282416938*i;i=c>>>0,c-=i,c*=i,i=c>>>0,c-=i,i+=c*4294967296}return(i>>>0)*23283064365386963e-26};return p}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.alea=s})(a1,typeof Ch=="object"&&Ch,typeof define=="function"&&define)});var l1=$r((p1,Sh)=>{(function(r,e,t){function o(a){var i=this,p="";i.x=0,i.y=0,i.z=0,i.w=0,i.next=function(){var u=i.x^i.x<<11;return i.x=i.y,i.y=i.z,i.z=i.w,i.w^=i.w>>>19^u^u>>>8},a===(a|0)?i.x=a:p+=a;for(var l=0;l<p.length+64;l++)i.x^=p.charCodeAt(l)|0,i.next()}function n(a,i){return i.x=a.x,i.y=a.y,i.z=a.z,i.w=a.w,i}function s(a,i){var p=new o(a),l=i&&i.state,u=function(){return(p.next()>>>0)/4294967296};return u.double=function(){do var c=p.next()>>>11,m=(p.next()>>>0)/4294967296,d=(c+m)/(1<<21);while(d===0);return d},u.int32=p.next,u.quick=u,l&&(typeof l=="object"&&n(l,p),u.state=function(){return n(p,{})}),u}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.xor128=s})(p1,typeof Sh=="object"&&Sh,typeof define=="function"&&define)});var c1=$r((u1,Nh)=>{(function(r,e,t){function o(a){var i=this,p="";i.next=function(){var u=i.x^i.x>>>2;return i.x=i.y,i.y=i.z,i.z=i.w,i.w=i.v,(i.d=i.d+362437|0)+(i.v=i.v^i.v<<4^(u^u<<1))|0},i.x=0,i.y=0,i.z=0,i.w=0,i.v=0,a===(a|0)?i.x=a:p+=a;for(var l=0;l<p.length+64;l++)i.x^=p.charCodeAt(l)|0,l==p.length&&(i.d=i.x<<10^i.x>>>4),i.next()}function n(a,i){return i.x=a.x,i.y=a.y,i.z=a.z,i.w=a.w,i.v=a.v,i.d=a.d,i}function s(a,i){var p=new o(a),l=i&&i.state,u=function(){return(p.next()>>>0)/4294967296};return u.double=function(){do var c=p.next()>>>11,m=(p.next()>>>0)/4294967296,d=(c+m)/(1<<21);while(d===0);return d},u.int32=p.next,u.quick=u,l&&(typeof l=="object"&&n(l,p),u.state=function(){return n(p,{})}),u}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.xorwow=s})(u1,typeof Nh=="object"&&Nh,typeof define=="function"&&define)});var d1=$r((m1,Ih)=>{(function(r,e,t){function o(a){var i=this;i.next=function(){var l=i.x,u=i.i,c,m,d;return c=l[u],c^=c>>>7,m=c^c<<24,c=l[u+1&7],m^=c^c>>>10,c=l[u+3&7],m^=c^c>>>3,c=l[u+4&7],m^=c^c<<7,c=l[u+7&7],c=c^c<<13,m^=c^c<<9,l[u]=m,i.i=u+1&7,m};function p(l,u){var c,m,d=[];if(u===(u|0))m=d[0]=u;else for(u=""+u,c=0;c<u.length;++c)d[c&7]=d[c&7]<<15^u.charCodeAt(c)+d[c+1&7]<<13;for(;d.length<8;)d.push(0);for(c=0;c<8&&d[c]===0;++c);for(c==8?m=d[7]=-1:m=d[c],l.x=d,l.i=0,c=256;c>0;--c)l.next()}p(i,a)}function n(a,i){return i.x=a.x.slice(),i.i=a.i,i}function s(a,i){a==null&&(a=+new Date);var p=new o(a),l=i&&i.state,u=function(){return(p.next()>>>0)/4294967296};return u.double=function(){do var c=p.next()>>>11,m=(p.next()>>>0)/4294967296,d=(c+m)/(1<<21);while(d===0);return d},u.int32=p.next,u.quick=u,l&&(l.x&&n(l,p),u.state=function(){return n(p,{})}),u}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.xorshift7=s})(m1,typeof Ih=="object"&&Ih,typeof define=="function"&&define)});var h1=$r((f1,kh)=>{(function(r,e,t){function o(a){var i=this;i.next=function(){var l=i.w,u=i.X,c=i.i,m,d;return i.w=l=l+1640531527|0,d=u[c+34&127],m=u[c=c+1&127],d^=d<<13,m^=m<<17,d^=d>>>15,m^=m>>>12,d=u[c]=d^m,i.i=c,d+(l^l>>>16)|0};function p(l,u){var c,m,d,f,g,h=[],x=128;for(u===(u|0)?(m=u,u=null):(u=u+"\0",m=0,x=Math.max(x,u.length)),d=0,f=-32;f<x;++f)u&&(m^=u.charCodeAt((f+32)%u.length)),f===0&&(g=m),m^=m<<10,m^=m>>>15,m^=m<<4,m^=m>>>13,f>=0&&(g=g+1640531527|0,c=h[f&127]^=m+g,d=c==0?d+1:0);for(d>=128&&(h[(u&&u.length||0)&127]=-1),d=127,f=4*128;f>0;--f)m=h[d+34&127],c=h[d=d+1&127],m^=m<<13,c^=c<<17,m^=m>>>15,c^=c>>>12,h[d]=m^c;l.w=g,l.X=h,l.i=d}p(i,a)}function n(a,i){return i.i=a.i,i.w=a.w,i.X=a.X.slice(),i}function s(a,i){a==null&&(a=+new Date);var p=new o(a),l=i&&i.state,u=function(){return(p.next()>>>0)/4294967296};return u.double=function(){do var c=p.next()>>>11,m=(p.next()>>>0)/4294967296,d=(c+m)/(1<<21);while(d===0);return d},u.int32=p.next,u.quick=u,l&&(l.X&&n(l,p),u.state=function(){return n(p,{})}),u}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.xor4096=s})(f1,typeof kh=="object"&&kh,typeof define=="function"&&define)});var x1=$r((g1,Eh)=>{(function(r,e,t){function o(a){var i=this,p="";i.next=function(){var u=i.b,c=i.c,m=i.d,d=i.a;return u=u<<25^u>>>7^c,c=c-m|0,m=m<<24^m>>>8^d,d=d-u|0,i.b=u=u<<20^u>>>12^c,i.c=c=c-m|0,i.d=m<<16^c>>>16^d,i.a=d-u|0},i.a=0,i.b=0,i.c=-1640531527,i.d=1367130551,a===Math.floor(a)?(i.a=a/4294967296|0,i.b=a|0):p+=a;for(var l=0;l<p.length+20;l++)i.b^=p.charCodeAt(l)|0,i.next()}function n(a,i){return i.a=a.a,i.b=a.b,i.c=a.c,i.d=a.d,i}function s(a,i){var p=new o(a),l=i&&i.state,u=function(){return(p.next()>>>0)/4294967296};return u.double=function(){do var c=p.next()>>>11,m=(p.next()>>>0)/4294967296,d=(c+m)/(1<<21);while(d===0);return d},u.int32=p.next,u.quick=u,l&&(typeof l=="object"&&n(l,p),u.state=function(){return n(p,{})}),u}e&&e.exports?e.exports=s:t&&t.amd?t(function(){return s}):this.tychei=s})(g1,typeof Eh=="object"&&Eh,typeof define=="function"&&define)});var y1=$r(()=>{});var _1=$r((b1,fc)=>{(function(r,e,t){var o=256,n=6,s=52,a="random",i=t.pow(o,n),p=t.pow(2,s),l=p*2,u=o-1,c;function m(S,C,$){var A=[];C=C==!0?{entropy:!0}:C||{};var D=h(g(C.entropy?[S,b(e)]:S??x(),3),A),R=new d(A),M=function(){for(var L=R.g(n),B=i,W=0;L<p;)L=(L+W)*o,B*=o,W=R.g(1);for(;L>=l;)L/=2,B/=2,W>>>=1;return(L+W)/B};return M.int32=function(){return R.g(4)|0},M.quick=function(){return R.g(4)/4294967296},M.double=M,h(b(R.S),e),(C.pass||$||function(L,B,W,G){return G&&(G.S&&f(G,R),L.state=function(){return f(R,{})}),W?(t[a]=L,B):L})(M,D,"global"in C?C.global:this==t,C.state)}function d(S){var C,$=S.length,A=this,D=0,R=A.i=A.j=0,M=A.S=[];for($||(S=[$++]);D<o;)M[D]=D++;for(D=0;D<o;D++)M[D]=M[R=u&R+S[D%$]+(C=M[D])],M[R]=C;(A.g=function(L){for(var B,W=0,G=A.i,q=A.j,H=A.S;L--;)B=H[G=u&G+1],W=W*o+H[u&(H[G]=H[q=u&q+B])+(H[q]=B)];return A.i=G,A.j=q,W})(o)}function f(S,C){return C.i=S.i,C.j=S.j,C.S=S.S.slice(),C}function g(S,C){var $=[],A=typeof S,D;if(C&&A=="object")for(D in S)try{$.push(g(S[D],C-1))}catch{}return $.length?$:A=="string"?S:S+"\0"}function h(S,C){for(var $=S+"",A,D=0;D<$.length;)C[u&D]=u&(A^=C[u&D]*19)+$.charCodeAt(D++);return b(C)}function x(){try{var S;return c&&(S=c.randomBytes)?S=S(o):(S=new Uint8Array(o),(r.crypto||r.msCrypto).getRandomValues(S)),b(S)}catch{var C=r.navigator,$=C&&C.plugins;return[+new Date,r,$,r.screen,b(e)]}}function b(S){return String.fromCharCode.apply(0,S)}if(h(t.random(),e),typeof fc=="object"&&fc.exports){fc.exports=m;try{c=y1()}catch{}}else typeof define=="function"&&define.amd?define(function(){return m}):t["seed"+a]=m})(typeof self<"u"?self:b1,[],Math)});var $h=$r((Jne,v1)=>{var YR=i1(),ZR=l1(),JR=c1(),eO=d1(),tO=h1(),rO=x1(),Ks=_1();Ks.alea=YR;Ks.xor128=ZR;Ks.xorwow=JR;Ks.xorshift7=eO;Ks.xor4096=tO;Ks.tychei=rO;v1.exports=Ks});var wn=class{constructor(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}},No=class{refCount(e){return dr("refCount")}incRef(e){return dr("incRef")}timerAvailable(){return!0}time(e){return dr("time")}read(e){return dr("read")}readSync(e){return dr("readSync")}readToGPU(e,t){return dr("readToGPU")}numDataIds(){return dr("numDataIds")}disposeData(e,t){return dr("disposeData")}write(e,t,o){return dr("write")}move(e,t,o,n,s){return dr("move")}createTensorFromGPUData(e,t,o){return dr("createTensorFromGPUData")}memory(){return dr("memory")}floatPrecision(){return dr("floatPrecision")}epsilon(){return this.floatPrecision()===32?1e-7:1e-4}dispose(){return dr("dispose")}};function dr(r){throw new Error(`'${r}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}function Iy(r){let e=r.length,t=0;for(;e>0;)t=Math.random()*e|0,e--,mu(r,e,t)}function rA(r,e){if(r.length!==e.length)throw new Error(`Array sizes must match to be shuffled together First array length was ${r.length}Second array length was ${e.length}`);let t=r.length,o=0;for(;t>0;)o=Math.random()*t|0,t--,mu(r,t,o),mu(e,t,o)}function ya(r,e,t){return Math.max(r,Math.min(e,t))}function oA(r){return r%2===0?r:r+1}function mu(r,e,t){let o=r[e];r[e]=r[t],r[t]=o}function nA(r){let e=0;for(let t=0;t<r.length;t++)e+=r[t];return e}function sA(r,e){let t=Math.random();return e*t+(1-t)*r}function aA(r,e){let t=0;for(let o=0;o<r.length;o++){let n=Number(r[o])-Number(e[o]);t+=n*n}return t}function E(r,e){if(!r)throw new Error(typeof e=="string"?e:e())}function ct(r,e,t=""){E(fr(r,e),()=>t+` Shapes ${r} and ${e} must match`)}function Sr(r){E(r!=null,()=>"The input to the tensor constructor must be a non-null value.")}function Ee(r){if(r.length===0)return 1;let e=r[0];for(let t=1;t<r.length;t++)e*=r[t];return e}function iA(r){return r.length===0}function Rf(r,e){if(r===e)return!0;if(r==null||e==null||r.length!==e.length)return!1;for(let t=0;t<r.length;t++)if(r[t]!==null&&e[t]!==null&&r[t]!==e[t])return!1;return!0}function fr(r,e){if(r===e)return!0;if(r==null||e==null||r.length!==e.length)return!1;for(let t=0;t<r.length;t++)if(r[t]!==e[t])return!1;return!0}function Io(r){return r%1===0}function pA(r){if(Math.tanh!=null)return Math.tanh(r);if(r===1/0)return 1;if(r===-1/0)return-1;{let e=Math.exp(2*r);return(e-1)/(e+1)}}function lA(r){let e=Math.ceil(Math.sqrt(r));return[e,Math.ceil(r/e)]}function uA(r){let e=new Uint32Array(r);for(let t=0;t<r;++t)e[t]=t;return Iy(e),e}function Sn(r,e){return e<=r.length?r:r+" ".repeat(e-r.length)}function cA(r,e=n=>0,t,o){return new Promise((n,s)=>{let a=0,i=()=>{if(r()){n();return}a++;let p=e(a);if(t!=null&&a>=t){s();return}o!=null?o(i,p):setTimeout(i,p)};i()})}function mA(r,e){let t=1,o=-1;for(let s=0;s<r.length;++s)if(r[s]>=0)t*=r[s];else if(r[s]===-1){if(o!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${o} and dim ${s}`);o=s}else if(r[s]<0)throw Error(`Shapes can not be < 0. Found ${r[s]} at dim ${s}`);if(o===-1){if(e>0&&e!==t)throw Error(`Size(${e}) must match the product of shape ${r}`);return r}if(t===0)throw Error(`Cannot infer the missing size in [${r}] when there are 0 elements`);if(e%t!==0)throw Error(`The implicit shape can't be a fractional number. Got ${e} / ${t}`);let n=r.slice();return n[o]=e/t,n}function Ho(r,e){let t=e.length;return r=r==null?e.map((o,n)=>n):[].concat(r),E(r.every(o=>o>=-t&&o<t),()=>`All values in axis param must be in range [-${t}, ${t}) but got axis ${r}`),E(r.every(o=>Io(o)),()=>`All values in axis param must be integers but got axis ${r}`),r.map(o=>o<0?t+o:o)}function Of(r,e){let t=[],o=[],n=e!=null&&Array.isArray(e)&&e.length===0,s=e==null||n?null:Ho(e,r).sort(),a=0;for(let i=0;i<r.length;++i){if(s!=null){if(s[a]===i&&r[i]!==1)throw new Error(`Can't squeeze axis ${i} since its dim '${r[i]}' is not 1`);(s[a]==null||s[a]>i)&&r[i]===1&&(t.push(r[i]),o.push(i)),s[a]<=i&&a++}r[i]!==1&&(t.push(r[i]),o.push(i))}return{newShape:t,keptDims:o}}function Pf(r,e){return du(r,e)}function du(r,e){let t=null;if(r==null||r==="float32")t=new Float32Array(e);else if(r==="int32")t=new Int32Array(e);else if(r==="bool")t=new Uint8Array(e);else if(r==="string")t=new Array(e);else throw new Error(`Unknown data type ${r}`);return t}function Mf(r,e){for(let t=0;t<r.length;t++){let o=r[t];if(isNaN(o)||!isFinite(o))throw Error(`A tensor of type ${e} being uploaded contains ${o}.`)}}function Lf(r){return r==="bool"||r==="complex64"||r==="float32"||r==="int32"||r==="string"}function dA(r,e){return!(e==="complex64"||e==="float32"&&r!=="complex64"||e==="int32"&&r!=="float32"&&r!=="complex64"||e==="bool"&&r==="bool")}function ba(r){if(r==="float32"||r==="int32")return 4;if(r==="complex64")return 8;if(r==="bool")return 1;throw new Error(`Unknown dtype ${r}`)}function Vf(r){if(r==null)return 0;let e=0;return r.forEach(t=>e+=t.length),e}function _a(r){return typeof r=="string"||r instanceof String}function ky(r){return typeof r=="boolean"}function Ey(r){return typeof r=="number"}function qo(r){return Array.isArray(r)?qo(r[0]):r instanceof Float32Array?"float32":r instanceof Int32Array||r instanceof Uint8Array||r instanceof Uint8ClampedArray?"int32":Ey(r)?"float32":_a(r)?"string":ky(r)?"bool":"float32"}function va(r){return!!(r&&r.constructor&&r.call&&r.apply)}function Ta(r,e){for(let t=e;t<r;++t)if(r%t===0)return t;return r}function no(r){let e=r.length;if(e<2)return[];let t=new Array(e-1);t[e-2]=r[e-1];for(let o=e-3;o>=0;--o)t[o]=t[o+1]*r[o+1];return t}function $y(r,e,t,o=!1){let n=new Array;if(e.length===1){let s=e[0]*(o?2:1);for(let a=0;a<s;a++)n[a]=t[r+a]}else{let s=e[0],a=e.slice(1),i=a.reduce((p,l)=>p*l)*(o?2:1);for(let p=0;p<s;p++)n[p]=$y(r+p*i,a,t,o)}return n}function Cn(r,e,t=!1){if(r.length===0)return e[0];let o=r.reduce((n,s)=>n*s)*(t?2:1);if(o===0)return[];if(o!==e.length)throw new Error(`[${r}] does not match the input size ${e.length}${t?" for a complex tensor":""}.`);return $y(0,r,e,t)}function fA(r,e){if(Array.isArray(r))return r;if(e==="float32")return r instanceof Float32Array?r:new Float32Array(r);if(e==="int32")return r instanceof Int32Array?r:new Int32Array(r);if(e==="bool"||e==="string")return Uint8Array.from(new Int32Array(r));throw new Error(`Unknown dtype ${e}`)}function il(r,e){let t=wa(r,e);for(let o=0;o<t.length;o++)t[o]=1;return t}function wa(r,e){if(e==null||e==="float32"||e==="complex64")return new Float32Array(r);if(e==="int32")return new Int32Array(r);if(e==="bool")return new Uint8Array(r);throw new Error(`Unknown data type ${e}`)}function hA(r,e){let t=r.reduce((o,n)=>o*n,1);if(e==null||e==="float32")return Cn(r,new Float32Array(t));if(e==="int32")return Cn(r,new Int32Array(t));if(e==="bool")return Cn(r,new Uint8Array(t));throw new Error(`Unknown data type ${e}`)}function st(r){r.forEach(e=>{E(Number.isInteger(e)&&e>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${r}].`)})}function gA(r,e,t){if(e===0)return 0;if(e===1)return r[0];let o=r[r.length-1];for(let n=0;n<r.length-1;++n)o+=t[n]*r[n];return o}function xA(r,e,t){if(e===0)return[];if(e===1)return[r];let o=new Array(e);for(let n=0;n<o.length-1;++n)o[n]=Math.floor(r/t[n]),r-=o[n]*t[n];return o[o.length-1]=r,o}function Nn(r){return r&&r.then&&typeof r.then=="function"}var Ay="tfjsflags",pl=class{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=bA,this.populateURLFlags()}setPlatform(e,t){this.platform!=null&&(P().getBool("IS_TEST")||P().getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${e}.`)),this.platformName=e,this.platform=t}registerFlag(e,t,o){if(this.flagRegistry[e]={evaluationFn:t,setHook:o},this.urlFlags[e]!=null){let n=this.urlFlags[e];P().getBool("IS_TEST")||P().getBool("PROD")||console.warn(`Setting feature override from URL ${e}: ${n}.`),this.set(e,n)}}async getAsync(e){return e in this.flags?this.flags[e]:(this.flags[e]=await this.evaluateFlag(e),this.flags[e])}get(e){if(e in this.flags)return this.flags[e];let t=this.evaluateFlag(e);if(Nn(t))throw new Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(this.flagRegistry[e]==null)throw new Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,this.flagRegistry[e].setHook!=null&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(this.flagRegistry[e]==null)throw new Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(typeof this.global>"u"||typeof this.global.location>"u"||typeof this.global.location.search>"u")return;let e=this.getQueryParams(this.global.location.search);Ay in e&&e[Ay].split(",").forEach(o=>{let[n,s]=o.split(":");this.urlFlags[n]=vA(n,s)})}};function bA(r){let e={};return r.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(t,...o)=>(_A(e,o[0],o[1]),o.join("="))),e}function _A(r,e,t){r[decodeURIComponent(e)]=decodeURIComponent(t||"")}function vA(r,e){let t=e.toLowerCase();return t==="true"||t==="false"?t==="true":`${+t}`===t?+t:e}function P(){return Bf}var Bf=null;function Fy(r){Bf=r}var zf;function Uf(){if(zf==null){let r;if(typeof window<"u")r=window;else if(typeof global<"u")r=global;else if(typeof process<"u")r=process;else if(typeof self<"u")r=self;else throw new Error("Could not find a global object");zf=r}return zf}function TA(){let r=Uf();return r._tfGlobals==null&&(r._tfGlobals=new Map),r._tfGlobals}function ll(r,e){let t=TA();if(t.has(r))return t.get(r);{let o=e();return t.set(r,o),t.get(r)}}var Ca="Abs",In="Acos",kn="Acosh",ko="Add",Sa="AddN",Na="All",Ia="Any",ka="ArgMax",Ea="ArgMin",En="Asin",$n="Asinh",An="Atan",Fn="Atanh",Dn="Atan2",$a="AvgPool",fu="AvgPoolGrad",Aa="AvgPool3D",hu="AvgPool3DGrad",Fa="BatchMatMul",Da="BatchToSpaceND",Ra="Bincount",Rn="BitwiseAnd";var Oa="BroadcastArgs",Ko="Cast",On="Ceil",Pn="ClipByValue",Pa="Complex",Ma="ComplexAbs",La="Concat",Va="Conv2D",Ba="Conv2DBackpropFilter",za="Conv2DBackpropInput",Ua="Conv3D",gu="Conv3DBackpropFilterV2",Wa="Conv3DBackpropInputV2",Mn="Cos",Ln="Cosh",Ga="Cumprod",Ha="Cumsum",qa="CropAndResize",Ka="DenseBincount",ja="DepthToSpace",Xa="DepthwiseConv2dNative",Qa="DepthwiseConv2dNativeBackpropFilter",Ya="DepthwiseConv2dNativeBackpropInput",Za="Diag",Ja="Dilation2D",Wf="Dilation2DBackpropInput",Gf="Dilation2DBackpropFilter",ul="Draw",Vn="RealDiv",ei="Einsum",Bn="Elu",xu="EluGrad",zn="Erf",Un="Equal",Wn="Exp",ti="ExpandDims",Gn="Expm1",ri="FFT",oi="Fill",ni="FlipLeftRight",Hn="Floor",qn="FloorDiv",si="FusedBatchNorm",ai="GatherV2",ii="GatherNd",Kn="Greater",jn="GreaterEqual",jo="Identity",pi="IFFT",li="Imag",Xn="IsFinite",Qn="IsInf",Yn="IsNan",ui="LeakyRelu",Zn="Less",Jn="LessEqual",ci="LinSpace",es="Log",ts="Log1p",rs="LogicalAnd",os="LogicalNot",ns="LogicalOr";var mi="LRN",yu="LRNGrad";var di="Max",ss="Maximum",fi="MaxPool",bu="MaxPoolGrad",hi="MaxPool3D",_u="MaxPool3DGrad",gi="MaxPoolWithArgmax",xi="Mean",yi="Min",as="Minimum",bi="MirrorPad",is="Mod",_i="Multinomial",ps="Multiply",vi="Neg",ls="NotEqual",Ti="NonMaxSuppressionV3",wi="NonMaxSuppressionV4",Ci="NonMaxSuppressionV5",Si="OnesLike",Ni="OneHot",Ii="Pack",ki="PadV2";var us="Pow",Ei="Prelu",$i="Prod",Ai="RaggedGather",Fi="RaggedRange",Di="RaggedTensorToTensor",Ri="Range",Oi="Real",cs="Reciprocal",ms="Relu",Pi="Reshape",Mi="ResizeNearestNeighbor",vu="ResizeNearestNeighborGrad",Li="ResizeBilinear",Tu="ResizeBilinearGrad",ds="Relu6",Vi="Reverse",fs="Round",hs="Rsqrt",Bi="ScatterNd",zi="TensorScatterUpdate",Ui="SearchSorted",Wi="Select",gs="Selu",Gi="Slice",xs="Sin",ys="Sinh",bs="Sign",_s="Sigmoid",vs="Softplus",Ts="Sqrt",Hi="Sum",qi="SpaceToBatchND",Ki="SplitV",ji="Softmax",Xi="SparseFillEmptyRows",Qi="SparseReshape",Yi="SparseSegmentMean",Zi="SparseSegmentSum",Ji="SparseToDense",ws="SquaredDifference",wu="Square",Cs="StaticRegexReplace",ep="StridedSlice",tp="StringNGrams",rp="StringSplit",op="StringToHashBucketFast",Ss="Sub",Ns="Tan",Is="Tanh",Xo="Tile",np="TopK",sp="Transform",Qo="Transpose",ap="Unique",ip="Unpack",pp="UnsortedSegmentSum";var lp="ZerosLike",ks="Step",cl="FromPixels",up="RotateWithOffset",Es="_FusedMatMul",$s="FusedConv2D",As="FusedDepthwiseConv2D";function Eo(...r){P().getBool("IS_TEST")||P().getBool("PROD")||console.warn(...r)}function wA(...r){P().getBool("IS_TEST")||P().getBool("PROD")||console.log(...r)}var Cu=ll("kernelRegistry",()=>new Map),CA=ll("gradRegistry",()=>new Map);function cp(r,e){let t=Ry(r,e);return Cu.get(t)}function Hf(r){return CA.get(r)}function qf(r){let e=Cu.entries(),t=[];for(;;){let{done:o,value:n}=e.next();if(o)break;let[s,a]=n,[i]=s.split("_");i===r&&t.push(a)}return t}function Su(r){let{kernelName:e,backendName:t}=r,o=Ry(e,t);Cu.has(o)&&Eo(`The kernel '${e}' for backend '${t}' is already registered`),Cu.set(o,r)}function Ry(r,e){return`${e}_${r}`}var y={};je(y,{arraysEqual:()=>fr,arraysEqualWithNull:()=>Rf,assert:()=>E,assertNonNegativeIntegerDimensions:()=>st,assertNonNull:()=>Sr,assertShapesMatch:()=>ct,bytesFromStringArray:()=>Vf,bytesPerElement:()=>ba,checkConversionForErrors:()=>Mf,clamp:()=>ya,computeStrides:()=>no,convertBackendValuesAndArrayBuffer:()=>fA,createScalarValue:()=>AA,createShuffledIndices:()=>uA,decodeString:()=>gp,distSquared:()=>aA,encodeString:()=>hp,fetch:()=>DA,fingerPrint64:()=>$A,flatten:()=>Zo,getArrayFromDType:()=>du,getTypedArrayFromDType:()=>Pf,hasEncodingLoss:()=>dA,hexToLong:()=>ml,indexToLoc:()=>xA,inferDtype:()=>qo,inferFromImplicitShape:()=>mA,isBoolean:()=>ky,isFunction:()=>va,isInt:()=>Io,isNumber:()=>Ey,isPromise:()=>Nn,isScalarShape:()=>iA,isString:()=>_a,isTypedArray:()=>jt,isValidDtype:()=>Lf,locToIndex:()=>gA,makeOnesTypedArray:()=>il,makeZerosNestedTypedArray:()=>hA,makeZerosTypedArray:()=>wa,nearestDivisor:()=>Ta,nearestLargerEven:()=>oA,now:()=>Ps,parseAxisParam:()=>Ho,randUniform:()=>sA,repeatedTry:()=>cA,rightPad:()=>Sn,shuffle:()=>Iy,shuffleCombo:()=>rA,sizeFromShape:()=>Ee,sizeToSquarishShape:()=>lA,squeezeShape:()=>Of,sum:()=>nA,swap:()=>mu,tanh:()=>pA,toNestedArray:()=>Cn,toTypedArray:()=>fp});function Nu(r){return r instanceof Float32Array||r instanceof Int32Array||r instanceof Uint8Array||r instanceof Uint8ClampedArray}var Qf=Df(Hy());var Os=Qf.default||Qf;function ml(r){return Os.fromString(r,!0,16)}var Ky=ml("c3a5c85c97cb3127"),Rs=ml("b492b66fbe98f273"),Qt=ml("9ae16a3b2f90404f");function Xf(r){return r.xor(r.shru(47))}function jy(r,e,t){let o=r.slice(e,e+t);return Os.fromBytes(Array.from(o),!0,!0)}function at(r,e){return jy(r,e,8)}function qy(r,e){return jy(r,e,4)}function Ft(r,e){return e===0?r:r.shru(e).or(r.shl(64-e))}function Yo(r,e,t=ml("9ddfea08eb382d69")){let o=r.xor(e).mul(t);o=o.xor(o.shru(47));let n=e.xor(o).mul(t);return n=n.xor(n.shru(47)),n=n.mul(t),n}function NA(r,e,t,o,n,s){n=n.add(r),s=Ft(s.add(n).add(o),21);let a=n;return n=n.add(e),n=n.add(t),s=s.add(Ft(n,44)),[n.add(o),s.add(a)]}function ku(r,e,t,o){return NA(at(r,e),at(r,e+8),at(r,e+16),at(r,e+24),t,o)}function IA(r,e=r.length){if(e>=8){let t=Qt.add(e*2),o=at(r,0).add(Qt),n=at(r,e-8),s=Ft(n,37).mul(t).add(o),a=Ft(o,25).add(n).mul(t);return Yo(s,a,t)}if(e>=4){let t=Qt.add(e*2),o=qy(r,0);return Yo(o.shl(3).add(e),qy(r,e-4),t)}if(e>0){let t=r[0],o=r[e>>1],n=r[e-1],s=t+(o<<8),a=e+(n<<2);return Xf(Qt.mul(s).xor(Ky.mul(a))).mul(Qt)}return Qt}function kA(r,e=r.length){let t=Qt.add(e*2),o=at(r,0).mul(Rs),n=at(r,8),s=at(r,e-8).mul(t),a=at(r,e-16).mul(Qt);return Yo(Ft(o.add(n),43).add(Ft(s,30)).add(a),o.add(Ft(n.add(Qt),18)).add(s),t)}function EA(r,e=r.length){let t=Qt.add(e*2),o=at(r,0).mul(Qt),n=at(r,8),s=at(r,e-8).mul(t),a=at(r,e-16).mul(Qt),i=Ft(o.add(n),43).add(Ft(s,30)).add(a),p=Yo(i,o.add(Ft(n.add(Qt),18)).add(s),t),l=at(r,16).mul(t),u=at(r,24),c=i.add(at(r,e-32)).mul(t),m=p.add(at(r,e-24)).mul(t);return Yo(Ft(l.add(u),43).add(Ft(c,30)).add(m),l.add(Ft(u.add(o),18)).add(c),t)}function $A(r,e=r.length){let t=Os.fromNumber(81,!0);if(e<=32)return e<=16?IA(r,e):kA(r,e);if(e<=64)return EA(r,e);let o=t,n=t.mul(Rs).add(113),s=Xf(n.mul(Qt).add(113)).mul(Qt),a=[Os.UZERO,Os.UZERO],i=[Os.UZERO,Os.UZERO];o=o.mul(Qt).add(at(r,0));let p=0,l=(e-1>>6)*64,u=l+(e-1&63)-63;do o=Ft(o.add(n).add(a[0]).add(at(r,p+8)),37).mul(Rs),n=Ft(n.add(a[1]).add(at(r,p+48)),42).mul(Rs),o=o.xor(i[1]),n=n.add(a[0]).add(at(r,p+40)),s=Ft(s.add(i[0]),33).mul(Rs),a=ku(r,p,a[1].mul(Rs),o.add(i[0])),i=ku(r,p+32,s.add(i[1]),n.add(at(r,p+16))),[s,o]=[o,s],p+=64;while(p!==l);let c=Rs.add(s.and(255).shl(1));return p=u,i[0]=i[0].add(e-1&63),a[0]=a[0].add(i[0]),i[0]=i[0].add(a[0]),o=Ft(o.add(n).add(a[0]).add(at(r,p+8)),37).mul(c),n=Ft(n.add(a[1]).add(at(r,p+48)),42).mul(c),o=o.xor(i[1].mul(9)),n=n.add(a[0].mul(9).add(at(r,p+40))),s=Ft(s.add(i[0]),33).mul(c),a=ku(r,p,a[1].mul(c),o.add(i[0])),i=ku(r,p+32,s.add(i[1]),n.add(at(r,p+16))),[s,o]=[o,s],Yo(Yo(a[0],i[0],c).add(Xf(n).mul(Ky)).add(s),Yo(a[1],i[1],c).add(o),c)}function AA(r,e){return e==="string"?hp(r):fp([r],e)}function FA(r,e){return r instanceof Float32Array&&e==="float32"||r instanceof Int32Array&&e==="int32"||r instanceof Uint8Array&&e==="bool"}function fp(r,e){if(e==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(r)&&(r=Zo(r)),P().getBool("DEBUG")&&Mf(r,e),FA(r,e))return r;if(e==null||e==="float32"||e==="complex64")return new Float32Array(r);if(e==="int32")return new Int32Array(r);if(e==="bool"){let t=new Uint8Array(r.length);for(let o=0;o<t.length;++o)Math.round(r[o])!==0&&(t[o]=1);return t}else throw new Error(`Unknown data type ${e}`)}function Ps(){return P().platform.now()}function DA(r,e){return P().platform.fetch(r,e)}function hp(r,e="utf-8"){return e=e||"utf-8",P().platform.encode(r,e)}function gp(r,e="utf-8"){return e=e||"utf-8",P().platform.decode(r,e)}function jt(r){return P().platform.isTypedArray!=null?P().platform.isTypedArray(r):Nu(r)}function Zo(r,e=[],t=!1){if(e==null&&(e=[]),typeof r=="boolean"||typeof r=="number"||typeof r=="string"||Nn(r)||r==null||jt(r)&&t)e.push(r);else if(Array.isArray(r)||jt(r))for(let o=0;o<r.length;++o)Zo(r[o],e,t);else{let o=-1;for(let n of Object.keys(r))/^([1-9]+[0-9]*|0)$/.test(n)&&(o=Math.max(o,Number(n)));for(let n=0;n<=o;n++)Zo(r[n],e,t)}return e}var Eu=class{constructor(e,t){this.backendTimer=e,this.logger=t,t==null&&(this.logger=new Yf)}profileKernel(e,t,o){let n,s=()=>{n=o()},a,i=Ps();if(this.backendTimer.timerAvailable())a=this.backendTimer.time(s);else{s();for(let l of n)l.dataSync();a=Promise.resolve({kernelMs:Ps()-i})}if(P().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let l=0;l<n.length;l++){let u=n[l];u.data().then(c=>{RA(c,u.dtype,e)})}return{kernelName:e,outputs:n,inputs:t,timeMs:a.then(l=>l.kernelMs),extraInfo:a.then(l=>l.getExtraProfileInfo!=null?l.getExtraProfileInfo():"")}}logKernelProfile(e){let{kernelName:t,outputs:o,timeMs:n,inputs:s,extraInfo:a}=e;o.forEach(i=>{Promise.all([i.data(),n,a]).then(p=>{this.logger.logKernelProfile(t,i,p[0],p[1],s,p[2])})})}};function RA(r,e,t){if(e!=="float32")return!1;for(let o=0;o<r.length;o++){let n=r[o];if(isNaN(n)||!isFinite(n))return console.warn(`Found ${n} in the result of '${t}'`),!0}return!1}var Yf=class{logKernelProfile(e,t,o,n,s,a){let i=typeof n=="number"?Sn(`${n}ms`,9):n.error,p=Sn(e,25),l=t.rank,u=t.size,c=Sn(t.shape.toString(),14),m="";for(let d in s){let f=s[d];if(f!=null){let g=f.shape||t.shape,h=g.length;m+=`${d}: ${h}D ${h>0?g:""} `}}console.log(`%c${p}	%c${i}	%c${l}D ${c}	%c${u}	%c${m}	%c${a}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}};function Xy(r,e,t){let o={},n={};for(let p=0;p<e.length;p++)o[e[p].id]=!0;for(let p=0;p<r.length;p++){let l=r[p],u=l.inputs;for(let c in u){let m=u[c],d=!1;for(let f=0;f<e.length;f++)if(o[m.id]){l.outputs.forEach(g=>o[g.id]=!0),d=!0,n[l.id]=!0;break}if(d)break}}let s={};s[t.id]=!0;let a={};for(let p=r.length-1;p>=0;p--){let l=r[p],u=l.inputs;for(let c=0;c<l.outputs.length;c++)if(s[l.outputs[c].id]){for(let m in u)s[u[m].id]=!0,a[l.id]=!0;break}}let i=[];for(let p=0;p<r.length;p++){let l=r[p];if(n[l.id]&&a[l.id]){let u={};for(let m in l.inputs){let d=l.inputs[m];o[d.id]&&(u[m]=d)}let c=Object.assign({},l);c.inputs=u,c.outputs=l.outputs,i.push(c)}}return i}function Qy(r,e,t,o){for(let n=e.length-1;n>=0;n--){let s=e[n],a=[];if(s.outputs.forEach(p=>{let l=r[p.id];l!=null?a.push(l):a.push(null)}),s.gradient==null)throw new Error(`Cannot compute gradient: gradient function not found for ${s.kernelName}.`);let i=s.gradient(a);for(let p in s.inputs){if(!(p in i))throw new Error(`Cannot backprop through input ${p}. Available gradients found: ${Object.keys(i)}.`);let l=t(()=>i[p]());if(l.dtype!=="float32")throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input ${p} must have 'float32' dtype, but has '${l.dtype}'`);let u=s.inputs[p];if(!fr(l.shape,u.shape))throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input '${p}' has shape '${l.shape}', which does not match the shape of the input '${u.shape}'`);if(r[u.id]==null)r[u.id]=l;else{let c=r[u.id];r[u.id]=o(c,l),c.dispose()}}}}var Yy=20,dl=3,Zf=7;function Zy(r,e,t,o){let n=no(e),s=OA(r,e,t,n),a=e.length,i=$u(r,e,t,n,s),p=["Tensor"];return o&&(p.push(`  dtype: ${t}`),p.push(`  rank: ${a}`),p.push(`  shape: [${e}]`),p.push("  values:")),p.push(i.map(l=>"    "+l).join(`
`)),p.join(`
`)}function OA(r,e,t,o){let n=Ee(e),s=o[o.length-1],a=new Array(s).fill(0),i=e.length,p=t==="complex64"?hl(r):r;if(i>1)for(let l=0;l<n/s;l++){let u=l*s;for(let c=0;c<s;c++)a[c]=Math.max(a[c],fl(p[u+c],0,t).length)}return a}function fl(r,e,t){let o;return Array.isArray(r)?o=`${parseFloat(r[0].toFixed(Zf))} + ${parseFloat(r[1].toFixed(Zf))}j`:_a(r)?o=`'${r}'`:t==="bool"?o=Jy(r):o=parseFloat(r.toFixed(Zf)).toString(),Sn(o,e)}function Jy(r){return r===0?"false":"true"}function $u(r,e,t,o,n,s=!0){let a=t==="complex64"?2:1,i=e[0],p=e.length;if(p===0){if(t==="complex64"){let g=hl(r);return[fl(g[0],0,t)]}return t==="bool"?[Jy(r[0])]:[r[0].toString()]}if(p===1){if(i>Yy){let h=dl*a,x=Array.from(r.slice(0,h)),b=Array.from(r.slice((i-dl)*a,i*a));return t==="complex64"&&(x=hl(x),b=hl(b)),["["+x.map((S,C)=>fl(S,n[C],t)).join(", ")+", ..., "+b.map((S,C)=>fl(S,n[i-dl+C],t)).join(", ")+"]"]}return["["+(t==="complex64"?hl(r):Array.from(r)).map((h,x)=>fl(h,n[x],t)).join(", ")+"]"]}let l=e.slice(1),u=o.slice(1),c=o[0]*a,m=[];if(i>Yy){for(let g=0;g<dl;g++){let h=g*c,x=h+c;m.push(...$u(r.slice(h,x),l,t,u,n,!1))}m.push("...");for(let g=i-dl;g<i;g++){let h=g*c,x=h+c;m.push(...$u(r.slice(h,x),l,t,u,n,g===i-1))}}else for(let g=0;g<i;g++){let h=g*c,x=h+c;m.push(...$u(r.slice(h,x),l,t,u,n,g===i-1))}let d=p===2?",":"";m[0]="["+(i>0?m[0]+d:"");for(let g=1;g<m.length-1;g++)m[g]=" "+m[g]+d;let f=`,
`;for(let g=2;g<p;g++)f+=`
`;return m[m.length-1]=" "+m[m.length-1]+"]"+(s?"":f),m}function hl(r){let e=[];for(let t=0;t<r.length;t+=2)e.push([r[t],r[t+1]]);return e}var Le=class{constructor(e,t,o){if(this.dtype=t,this.shape=e.slice(),this.size=Ee(e),o!=null){let n=o.length;E(n===this.size,()=>`Length of values '${n}' does not match the size inferred by the shape '${this.size}'.`)}if(t==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=o||du(t,this.size),this.strides=no(e)}set(e,...t){t.length===0&&(t=[0]),E(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);let o=this.locToIndex(t);this.values[o]=e}get(...e){e.length===0&&(e=[0]);let t=0;for(let n of e){if(n<0||n>=this.shape[t]){let s=`Requested out of range element at ${e}.   Buffer shape=${this.shape}`;throw new Error(s)}t++}let o=e[e.length-1];for(let n=0;n<e.length-1;++n)o+=this.strides[n]*e[n];return this.values[o]}locToIndex(e){if(this.rank===0)return 0;if(this.rank===1)return e[0];let t=e[e.length-1];for(let o=0;o<e.length-1;++o)t+=this.strides[o]*e[o];return t}indexToLoc(e){if(this.rank===0)return[];if(this.rank===1)return[e];let t=new Array(this.shape.length);for(let o=0;o<t.length-1;++o)t[o]=Math.floor(e/this.strides[o]),e-=t[o]*this.strides[o];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return Hr().makeTensor(this.values,this.shape,this.dtype)}},Hr=null,xp=null,PA=null;function eb(r){Hr=r}function tb(r){xp=r}function rb(r){PA=r}var rt=class{constructor(e,t,o,n){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=Ee(e),this.strides=no(e),this.dataId=o,this.id=n,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){let e=await this.data();return xp.buffer(this.shape,this.dtype,e)}bufferSync(){return xp.buffer(this.shape,this.dtype,this.dataSync())}async array(){let e=await this.data();return Cn(this.shape,e,this.dtype==="complex64")}arraySync(){return Cn(this.shape,this.dataSync(),this.dtype==="complex64")}async data(){this.throwIfDisposed();let e=Hr().read(this.dataId);if(this.dtype==="string"){let t=await e;try{return t.map(o=>gp(o))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return e}dataToGPU(e){return this.throwIfDisposed(),Hr().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();let e=Hr().readSync(this.dataId);if(this.dtype==="string")try{return e.map(t=>gp(t))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e}async bytes(){this.throwIfDisposed();let e=await Hr().read(this.dataId);return this.dtype==="string"?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),Hr().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(e=!1){return xp.print(this,e)}clone(){return this.throwIfDisposed(),xp.clone(this)}toString(e=!1){let t=this.dataSync();return Zy(t,this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),xp.cast(this,e)}variable(e=!0,t,o){return this.throwIfDisposed(),Hr().makeVariable(this,e,t,o)}};Object.defineProperty(rt,Symbol.hasInstance,{value:r=>!!r&&r.data!=null&&r.dataSync!=null&&r.throwIfDisposed!=null});function Jf(){return ll("Tensor",()=>rt)}Jf();var $o=class extends rt{constructor(e,t,o,n){super(e.shape,e.dtype,e.dataId,n),this.trainable=t,this.name=o}assign(e){if(e.dtype!==this.dtype)throw new Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!fr(e.shape,this.shape))throw new Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);Hr().disposeTensor(this),this.dataId=e.dataId,Hr().incRef(this,null)}dispose(){Hr().disposeVariable(this),this.isDisposedInternal=!0}};Object.defineProperty($o,Symbol.hasInstance,{value:r=>r instanceof rt&&r.assign!=null&&r.assign instanceof Function});var eh;(function(r){r.R0="R0",r.R1="R1",r.R2="R2",r.R3="R3",r.R4="R4",r.R5="R5",r.R6="R6"})(eh||(eh={}));var th;(function(r){r.float32="float32",r.int32="int32",r.bool="int32",r.complex64="complex64"})(th||(th={}));var rh;(function(r){r.float32="float32",r.int32="int32",r.bool="bool",r.complex64="complex64"})(rh||(rh={}));var oh;(function(r){r.float32="float32",r.int32="float32",r.bool="float32",r.complex64="complex64"})(oh||(oh={}));var nh;(function(r){r.float32="complex64",r.int32="complex64",r.bool="complex64",r.complex64="complex64"})(nh||(nh={}));var MA={float32:oh,int32:th,bool:rh,complex64:nh};function bt(r,e){if(r==="string"||e==="string"){if(r==="string"&&e==="string")return"string";throw new Error(`Can not upcast ${r} with ${e}`)}return MA[r][e]}function Ms(r){return bt(r,"int32")}function Au(r){return r!=null&&typeof r=="object"&&"texture"in r&&r.texture instanceof WebGLTexture}function Fu(r){return typeof GPUBuffer<"u"&&r!=null&&typeof r=="object"&&"buffer"in r&&r.buffer instanceof GPUBuffer}function ke(r,e){if(r.dtype===e.dtype)return[r,e];let t=bt(r.dtype,e.dtype);return[r.cast(t),e.cast(t)]}function ob(r,e){E(r.dtype===e.dtype,()=>`The dtypes of the first(${r.dtype}) and second(${e.dtype}) input must match`)}function Du(r){let e=[];return nb(r,e,new Set),e}function nb(r,e,t){if(r==null)return;if(r instanceof rt){e.push(r);return}if(!LA(r))return;let o=r;for(let n in o){let s=o[n];t.has(s)||(t.add(s),nb(s,e,t))}}function LA(r){return Array.isArray(r)||typeof r=="object"}function sh(r){return r.kernelName!=null}var Ru=class{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(let e in this.registeredVariables)this.registeredVariables[e].dispose()}},gl=class r{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Ru}async ready(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let o=e[t];if(await this.initializeBackend(o).success){await this.setBackend(o);return}}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(this.pendingBackendInit!=null)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){let{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw new Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry))if(e in this.registryFactory){let{asyncInit:t}=this.initializeBackend(e);if(t)return null}else return null;return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,o=1){return e in this.registryFactory?(Eo(`${e} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[e]={factory:t,priority:o},!0)}async setBackend(e){if(this.registryFactory[e]==null)throw new Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,this.registry[e]==null){this.backendInstance=null;let{success:t,asyncInit:o}=this.initializeBackend(e);if(!(o?await t:t))return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new Eu(this.backendInstance),!0}setupRegisteredKernels(){qf(this.backendName).forEach(t=>{t.setupFunc!=null&&t.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){qf(e).forEach(o=>{o.disposeFunc!=null&&o.disposeFunc(this.registry[e])})}initializeBackend(e){let t=this.registryFactory[e];if(t==null)throw new Error(`Cannot initialize backend ${e}, no registration found.`);try{let o=t.factory();if(o&&!(o instanceof No)&&typeof o.then=="function"){let n=++this.pendingBackendInitId,s=o.then(a=>n<this.pendingBackendInitId?!1:(this.registry[e]=a,this.pendingBackendInit=null,!0)).catch(a=>(n<this.pendingBackendInitId||(this.pendingBackendInit=null,Eo(`Initialization of backend ${e} failed`),Eo(a.stack||a.message)),!1));return this.pendingBackendInit=s,{success:s,asyncInit:!0}}else return this.registry[e]=o,{success:!0,asyncInit:!1}}catch(o){return Eo(`Initialization of backend ${e} failed`),Eo(o.stack||o.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw new Error(`${e} backend not found in registry`);this.backendName===e&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){let e=this.getSortedBackends();for(let t=0;t<e.length;t++){let o=e[t],{success:n,asyncInit:s}=this.initializeBackend(o);if(s||n)return{name:o,asyncInit:s}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(e,t){let o=this.state.tensorInfo.get(t),n=o.backend,s=this.readSync(t),a=n.refCount(t);n.disposeData(t,!0),o.backend=e,e.move(t,s,o.shape,o.dtype,a),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let o=null;if(t==null){if(typeof e!="function")throw new Error("Please provide a function to tidy()");t=e}else{if(typeof e!="string"&&!(e instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof t!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");o=e}let n;return this.scopedRun(()=>this.startScope(o),()=>this.endScope(n),()=>(n=t(),n instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n))}scopedRun(e,t,o){e();try{let n=o();return t(),n}catch(n){throw t(),n}}nextTensorId(){return r.nextTensorId++}nextVariableId(){return r.nextVariableId++}clone(e){let t=k.runKernel(jo,{x:e}),o={x:e},n=a=>({x:()=>{let i="float32",p={x:a},l={dtype:i};return k.runKernel(Ko,p,l)}}),s=[];return this.addTapeNode(this.state.activeScope.name,o,[t],n,s,{}),t}runKernel(e,t,o){if(this.backendName==null&&this.backend,!(cp(e,this.backendName)!=null))throw new Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:t,attrs:o})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(e,t,o){let n=this.backend.numDataIds(),s=0;o.forEach(p=>{s+=p.dtype==="complex64"?3:1});let a=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],i=n-t-s-a;if(i>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${i} data ids) after running '${e}'`)}runKernelFunc(e){let t,o=[],n=this.isTapeOn(),s=this.state.numBytes,a=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let i;this.backendName==null&&this.backend;let p,l=sh(e)?e.kernelName:this.state.activeScope!=null?this.state.activeScope.name:"";if(sh(e)){let{kernelName:f,inputs:g,attrs:h}=e;this.backendName==null&&this.backend;let x=cp(f,this.backendName);E(x!=null,()=>`Cannot find registered kernel '${f}' for backend '${this.backendName}'`),i=()=>{let b=this.backend.numDataIds();p=x.kernelFunc({inputs:g,attrs:h,backend:this.backend});let S=Array.isArray(p)?p:[p];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(f,b,S);let C=S.map($=>$.rank!=null?$:this.makeTensorFromTensorInfo($));if(n){let $=this.getTensorsForGradient(f,g,C);o=this.saveTensorsForBackwardMode($)}return C}}else{let{forwardFunc:f}=e,g=h=>{n&&(o=h.map(x=>this.keep(this.clone(x))))};i=()=>{let h=this.backend.numDataIds();p=this.tidy(()=>f(this.backend,g));let x=Array.isArray(p)?p:[p];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(l,h,x),x}}let{inputs:u,attrs:c}=e,m=sh(e)?null:e.backwardsFunc,d;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool("DEBUG")&&!this.state.profiling?t=i():(d=this.profiler.profileKernel(l,u,()=>i()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(d),t=d.outputs)}),n&&this.addTapeNode(l,u,t,m,o,c),this.state.profiling&&this.state.activeProfile.kernels.push({name:l,bytesAdded:this.state.numBytes-s,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-a,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(u).map(f=>u[f]!=null?u[f].shape:null),outputShapes:t.map(f=>f.shape),kernelTimeMs:d.timeMs,extraInfo:d.extraInfo}),Array.isArray(p)?t:t[0]}saveTensorsForBackwardMode(e){return e.map(o=>this.keep(this.clone(o)))}getTensorsForGradient(e,t,o){let n=Hf(e);if(n!=null){let s=n.inputsToSave||[],a=n.outputsToSave||[],i;n.saveAllInputs?(E(Array.isArray(t),()=>"saveAllInputs is true, expected inputs to be an array."),i=Object.keys(t).map(l=>t[l])):i=s.map(l=>t[l]);let p=o.filter((l,u)=>a[u]);return i.concat(p)}return[]}makeTensor(e,t,o,n){if(e==null)throw new Error("Values passed to engine.makeTensor() are null");o=o||"float32",n=n||this.backend;let s=e;o==="string"&&_a(e[0])&&(s=e.map(p=>hp(p)));let a=n.write(s,t,o),i=new rt(t,o,a,this.nextTensorId());if(this.trackTensor(i,n),o==="string"){let p=this.state.tensorInfo.get(a),l=Vf(s);this.state.numBytes+=l-p.bytes,p.bytes=l}return i}makeTensorFromDataId(e,t,o,n){o=o||"float32";let s={dataId:e,shape:t,dtype:o};return this.makeTensorFromTensorInfo(s,n)}makeTensorFromTensorInfo(e,t){let{dataId:o,shape:n,dtype:s}=e,a=new rt(n,s,o,this.nextTensorId());return this.trackTensor(a,t),a}makeVariable(e,t=!0,o,n){o=o||this.nextVariableId().toString(),n!=null&&n!==e.dtype&&(e=e.cast(n));let s=new $o(e,t,o,this.nextTensorId());if(this.state.registeredVariables[s.name]!=null)throw new Error(`Variable with name ${s.name} was already registered`);return this.state.registeredVariables[s.name]=s,this.incRef(s,this.backend),s}trackTensor(e,t){this.state.numTensors++,e.dtype==="string"&&this.state.numStringTensors++;let o=0;e.dtype!=="complex64"&&e.dtype!=="string"&&(o=e.size*ba(e.dtype)),this.state.numBytes+=o,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:o})),e instanceof $o||this.track(e)}incRef(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)}removeDataId(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;let t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,e.dtype==="string"&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),e.dtype!=="complex64"&&e.dtype!=="string"){let o=e.size*ba(e.dtype);this.state.numBytes-=o}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}disposeVariables(){for(let e in this.state.registeredVariables){let t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),this.state.registeredVariables[e.name]!=null&&delete this.state.registeredVariables[e.name]}memory(){let e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,e.reasons==null&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e}async profile(e){this.state.profiling=!0;let t=this.state.numBytes,o=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(n=>n.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-o;for(let n of this.state.activeProfile.kernels)n.kernelTimeMs=await n.kernelTimeMs,n.extraInfo=await n.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(e,t,o,n,s,a){let i={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:o,saved:s},p=Hf(e);p!=null&&(n=p.gradFunc),n!=null&&(i.gradient=l=>(l=l.map((u,c)=>{if(u==null){let m=o[c],d=wa(m.size,m.dtype);return this.makeTensor(d,m.shape,m.dtype)}return u}),n(l.length>1?l:l[0],s,a))),this.state.activeTape.push(i)}keep(e){return e.kept=!0,e}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){let t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){let t=Du(e),o=new Set(t.map(s=>s.id));for(let s=0;s<this.state.activeScope.track.length;s++){let a=this.state.activeScope.track[s];!a.kept&&!o.has(a.id)&&a.dispose()}let n=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(s=>{!s.kept&&s.scopeId===n.id&&this.track(s)})}gradients(e,t,o,n=!1){if(E(t.length>0,()=>"gradients() received an empty list of xs."),o!=null&&o.dtype!=="float32")throw new Error(`dy must have 'float32' dtype, but has '${o.dtype}'`);let s=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",e));E(s instanceof rt,()=>"The result y returned by f() must be a tensor.");let a=Xy(this.state.activeTape,t,s);if(!n&&a.length===0&&t.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{let i={};i[s.id]=o??VA(s.shape),Qy(i,a,l=>this.tidy(l),BA);let p=t.map(l=>i[l.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(l=>{for(let u of l.saved)u.dispose()}),this.state.activeTape=null),{value:s,grads:p}})}customGrad(e){return E(va(e),()=>"The f passed in customGrad(f) must be a function."),(...t)=>{E(t.every(i=>i instanceof rt),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let o,n={};t.forEach((i,p)=>{n[p]=i});let s=(i,p)=>(o=e(...t,p),E(o.value instanceof rt,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),E(va(o.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),o.value),a=(i,p)=>{let l=o.gradFunc(i,p),u=Array.isArray(l)?l:[l];E(u.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),E(u.every(m=>m instanceof rt),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");let c={};return u.forEach((m,d)=>{c[d]=()=>m}),c};return this.runKernelFunc({forwardFunc:s,backwardsFunc:a,inputs:n})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}readToGPU(e,t){return this.state.tensorInfo.get(e).backend.readToGPU(e,t)}async time(e){let t=Ps(),o=await this.backend.time(e);return o.wallMs=Ps()-t,o}track(e){return this.state.activeScope!=null&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Ru;for(let e in this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}};gl.nextTensorId=0;gl.nextVariableId=0;function VA(r){let e=il(Ee(r),"float32");return k.makeTensor(e,r,"float32")}function ah(){let r=Uf();if(r._tfengine==null){let e=new pl(r);r._tfengine=new gl(e)}return Fy(r._tfengine.ENV),eb(()=>r._tfengine),r._tfengine}var k=ah();function BA(r,e){let t={a:r,b:e};return k.runKernel(ko,t)}var Jo={};je(Jo,{isBrowser:()=>ph,isMobile:()=>WA,mockIsMobile:()=>UA});function zA(){return typeof navigator<"u"&&navigator!=null}var ih;function UA(r){ih=r}function WA(r){if(ih!==void 0)return ih;if(r||zA()){if(r||(r=navigator),r.product==="ReactNative")return!0;let e=r.userAgent||r.vendor||(typeof window<"u"?window.opera:"");if(!e){let t=r;return t.userAgentData&&t.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))}return!1}function ph(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}var tr=P();tr.registerFlag("DEBUG",()=>!1,r=>{r&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")});tr.registerFlag("IS_BROWSER",()=>ph());tr.registerFlag("IS_NODE",()=>typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u");tr.registerFlag("IS_CHROME",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor));tr.registerFlag("IS_SAFARI",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor));tr.registerFlag("PROD",()=>!1);tr.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>tr.getBool("DEBUG"));tr.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0);tr.registerFlag("IS_TEST",()=>!1);tr.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>tr.getBool("DEBUG"));tr.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1);tr.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1);tr.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);function rr(r,e){let t=r;if(jt(r))return e==="string"?[]:[r.length];if(Au(r)){let n=r.channels||"RGBA";return[r.height,r.width*n.length]}else if(Fu(r))return[r.buffer.size/(e==null?4:ba(e))];if(!Array.isArray(r))return[];let o=[];for(;Array.isArray(t)||jt(t)&&e!=="string";)o.push(t.length),t=t[0];return Array.isArray(r)&&P().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&ab(r,o,[]),o}function ab(r,e,t){if(t=t||[],!Array.isArray(r)&&!jt(r)){E(e.length===0,()=>`Element arr[${t.join("][")}] is a primitive, but should be an array/TypedArray of ${e[0]} elements`);return}E(e.length>0,()=>`Element arr[${t.join("][")}] should be a primitive, but is an array of ${r.length} elements`),E(r.length===e[0],()=>`Element arr[${t.join("][")}] should have ${e[0]} elements, but has ${r.length} elements`);let o=e.slice(1);for(let n=0;n<r.length;++n)ab(r[n],o,t.concat(n))}function sb(r,e,t,o){if(r!=="string_or_numeric"){if(r==null)throw new Error("Expected dtype cannot be null.");if(r!=="numeric"&&r!==e||r==="numeric"&&e==="string")throw new Error(`Argument '${t}' passed to '${o}' must be ${r} tensor, but got ${e} tensor`)}}function v(r,e,t,o="numeric"){if(r instanceof Jf())return sb(o,r.dtype,e,t),r;let n=qo(r);if(n!=="string"&&["bool","int32","float32"].indexOf(o)>=0&&(n=o),sb(o,n,e,t),r==null||!jt(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string"){let p=r==null?"null":r.constructor.name;throw new Error(`Argument '${e}' passed to '${t}' must be a Tensor or TensorLike, but got '${p}'`)}let s=rr(r,n);!jt(r)&&!Array.isArray(r)&&(r=[r]);let i=n!=="string"?fp(r,n):Zo(r,[],!0);return k.makeTensor(i,s,n)}function Ls(r,e,t,o="numeric"){if(!Array.isArray(r))throw new Error(`Argument ${e} passed to ${t} must be a \`Tensor[]\` or \`TensorLike[]\``);return r.map((s,a)=>v(s,`${e}[${a}]`,t,o))}var lh="__op";function N(r){let e=Object.keys(r);if(e.length!==1)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${e.length} keys.`);let t=e[0],o=r[t];t.endsWith("_")&&(t=t.substring(0,t.length-1)),t=t+lh;let n=(...s)=>{k.startScope(t);try{let a=o(...s);return Nn(a)&&console.error("Cannot return a Promise inside of tidy."),k.endScope(a),a}catch(a){throw k.endScope(null),a}};return Object.defineProperty(n,"name",{value:t,configurable:!0}),n}function GA(r,e){let t=v(r,"real","complex"),o=v(e,"imag","complex");ct(t.shape,o.shape,`real and imag shapes, ${t.shape} and ${o.shape}, must match in call to tf.complex().`);let n={real:t,imag:o};return k.runKernel(Pa,n)}var or=N({complex_:GA});function Yt(r,e,t,o){if(o==null)o=qo(r);else if(o==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(Fu(r)||Au(r)){if(o!=="float32"&&o!=="int32")throw new Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${o}.`);return k.backend.createTensorFromGPUData(r,e||t,o)}if(!jt(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(e!=null){st(e);let n=Ee(e),s=Ee(t);E(n===s,()=>`Based on the provided shape, [${e}], the tensor should have ${n} values but has ${s}`);for(let a=0;a<t.length;++a){let i=t[a],p=a===t.length-1?i!==Ee(e.slice(a)):!0;E(t[a]===e[a]||!p,()=>`Error creating a new Tensor. Inferred shape (${t}) does not match the provided shape (${e}). `)}}return!jt(r)&&!Array.isArray(r)&&(r=[r]),e=e||t,r=o!=="string"?fp(r,o):Zo(r,[],!0),k.makeTensor(r,e,o)}function Zt(r,e,t){let o=rr(r,t);return Yt(r,e,o,t)}var Ao={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8};var Bt=class r{static join(e){return new r(e).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,e==null||(e instanceof Array||(e=[e]),e=e.map(o=>jt(o)?o.buffer:o),e.length===0))return;this.bufferUniformSize=e[0].byteLength;let t=0;for(let o=0;o<e.length;o++){let n=e[o];o!==e.length-1&&n.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);let s=t+n.byteLength;this.shards.push({buffer:n,start:t,end:s}),t=s}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,t=this.byteLength){if(this.shards.length===0)return new ArrayBuffer(0);if(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),t=Math.min(this.byteLength,t),t<=e)return new ArrayBuffer(0);let o=this.findShardForByte(e);if(o===-1)throw new Error(`Could not find start shard for byte ${e}`);let n=t-e,s=new ArrayBuffer(n),a=new Uint8Array(s),i=0;for(let p=o;p<this.shards.length;p++){let l=this.shards[p],c=e+i-l.start,m=i,f=Math.min(t,l.end)-l.start,g=new Uint8Array(l.buffer,c,f-c);if(a.set(g,m),i+=g.length,t<l.end)break}return s}findShardForByte(e){if(this.shards.length===0||e<0||e>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function t(n){return e<n.start?-1:e>=n.end?1:0}if(t(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;let o=HA(this.shards,t);return o===-1?-1:(this.previousShardIndex=o,this.previousShardIndex)}};function HA(r,e){let t=0,o=r.length;for(;t<=o;){let n=Math.floor((o-t)/2)+t,s=e(r[n]);if(s===0)return n;s<0?o=n:t=n+1}return-1}function qA(r){P().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(r+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}rb(qA);function Rr(){return k}function Se(r,e){return k.tidy(r,e)}function gt(r){Du(r).forEach(t=>t.dispose())}function nr(r){return k.keep(r)}function uh(r){return k.setBackend(r)}function ib(){return k.ready()}function Ou(){return k.backendName}function Pu(r,e,t=1){return k.registerBackend(r,e,t)}function pb(){return k.backend}var en=4;async function cb(r,e){let t=[],o=[],n=Array.isArray(r)?r.map(a=>a.name):Object.keys(r);for(let a=0;a<n.length;++a){let i=n[a],p=Array.isArray(r)?r[a].tensor:r[i];if(p.dtype!=="float32"&&p.dtype!=="int32"&&p.dtype!=="bool"&&p.dtype!=="string"&&p.dtype!=="complex64")throw new Error(`Unsupported dtype in weight '${i}': ${p.dtype}`);let l={name:i,shape:p.shape,dtype:p.dtype};if(p.dtype==="string"){let u=new Promise(async c=>{let m=await p.bytes(),d=m.reduce((h,x)=>h+x.length,0)+en*m.length,f=new Uint8Array(d),g=0;for(let h=0;h<m.length;h++){let x=m[h],b=new Uint8Array(new Uint32Array([x.length]).buffer);f.set(b,g),g+=en,f.set(x,g),g+=x.length}c(f)});o.push(u)}else o.push(p.data());e!=null&&(l.group=e),t.push(l)}let s=await Promise.all(o);return{data:XA(s),specs:t}}function Mu(r,e){let t=new Bt(r),o={},n=0;for(let s of e){let a=KA(s,(i,p)=>t.slice(n+i,n+p));o[s.name]=mb(s,t.slice(n,n+a)),n+=a}return o}function KA(r,e){let t=Ee(r.shape),o;if("quantization"in r){let n=r.quantization;o=Ao[n.dtype]}else if(r.dtype==="string"){let n=0;for(let s=0;s<t;s++)n+=en+new Uint32Array(e(n,n+en))[0];return n}else o=Ao[r.dtype];return t*o}async function jA(r,e){let t=Ee(r.shape),o;if("quantization"in r){let n=r.quantization;o=Ao[n.dtype]}else if(r.dtype==="string"){let n=0;for(let s=0;s<t;s++)n+=en+new Uint32Array(await e(n,n+en))[0];return n}else o=Ao[r.dtype];return t*o}function mb(r,e){let t=r.name,o=r.dtype,n=r.shape,s=Ee(n),a,i=0;if("quantization"in r){let p=r.quantization;if(p.dtype==="uint8"||p.dtype==="uint16"){if(!("min"in p&&"scale"in p))throw new Error(`Weight ${r.name} with quantization ${p.dtype} doesn't have corresponding metadata min and scale.`)}else if(p.dtype==="float16"){if(o!=="float32")throw new Error(`Weight ${r.name} is quantized with ${p.dtype} which only supports weights of type float32 not ${o}.`)}else throw new Error(`Weight ${r.name} has unknown quantization dtype ${p.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);let l=Ao[p.dtype],u=p.dtype==="uint8"?new Uint8Array(e):new Uint16Array(e);if(o==="float32")if(p.dtype==="uint8"||p.dtype==="uint16"){a=new Float32Array(u.length);for(let c=0;c<u.length;c++){let m=u[c];a[c]=m*p.scale+p.min}}else if(p.dtype==="float16")a=JA()(u);else throw new Error(`Unsupported quantization type ${p.dtype} for weight type float32.`);else if(o==="int32"){if(p.dtype!=="uint8"&&p.dtype!=="uint16")throw new Error(`Unsupported quantization type ${p.dtype} for weight type int32.`);a=new Int32Array(u.length);for(let c=0;c<u.length;c++){let m=u[c];a[c]=Math.round(m*p.scale+p.min)}}else throw new Error(`Unsupported dtype in weight '${t}': ${o}`);i+=s*l}else if(o==="string"){let p=Ee(r.shape);a=[];for(let l=0;l<p;l++){let u=new Uint32Array(e.slice(i,i+en))[0];i+=en;let c=new Uint8Array(e.slice(i,i+u));a.push(c),i+=u}}else{let p=Ao[o];if(o==="float32")a=new Float32Array(e);else if(o==="int32")a=new Int32Array(e);else if(o==="bool")a=new Uint8Array(e);else if(o==="complex64"){a=new Float32Array(e);let l=new Float32Array(a.length/2),u=new Float32Array(a.length/2);for(let f=0;f<l.length;f++)l[f]=a[f*2],u[f]=a[f*2+1];let c=Zt(l,n,"float32"),m=Zt(u,n,"float32"),d=or(c,m);return c.dispose(),m.dispose(),d}else throw new Error(`Unsupported dtype in weight '${t}': ${o}`);i+=s*p}return Zt(a,n,o)}async function lb(r,e,t){let o=new Uint8Array(e);for(;o.byteLength<t;){let{done:n,value:s}=await r.read();if(n&&s==null){let i=t-o.byteLength;throw new Error(`Reader is done but ${i} bytes are still expected`)}let a=new Uint8Array(o.length+s.byteLength);a.set(o,0),a.set(new Uint8Array(s),o.length),o=a}return o.buffer}async function Lu(r,e){let t={},o=r.getReader(),n=new ArrayBuffer(0);for(let s of e){let a=await jA(s,async(l,u)=>(n=await lb(o,n,u),n.slice(l,u)));n=await lb(o,n,a);let i=n.slice(0,a);n=n.slice(a);let p=mb(s,i);if(t[s.name]=p,Ou()==="webgpu"){let l=pb();"uploadToGPU"in l&&Ee(p.shape)>=P().get("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD")&&l.uploadToGPU(p.dataId)}}return t}function XA(r){if(r===null)throw new Error(`Invalid input value: ${JSON.stringify(r)}`);let e=0,t=[];r.forEach(s=>{if(e+=s.byteLength,t.push(s.byteLength===s.buffer.byteLength?s:new s.constructor(s)),!(s instanceof Float32Array||s instanceof Int32Array||s instanceof Uint8Array))throw new Error(`Unsupported TypedArray subtype: ${s.constructor.name}`)});let o=new Uint8Array(e),n=0;return t.forEach(s=>{o.set(new Uint8Array(s.buffer),n),n+=s.byteLength}),o.buffer}var ch=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function ub(r){return ch?Buffer.byteLength(r,"utf8"):new Blob([r]).size}function db(r){if(ch)return Buffer.from(r).toString("base64");let e=new Uint8Array(r),t="";for(let o=0,n=e.length;o<n;o++)t+=String.fromCharCode(e[o]);return btoa(t)}function fb(r){if(ch){let o=Buffer.from(r,"base64");return o.buffer.slice(o.byteOffset,o.byteOffset+o.byteLength)}let e=atob(r),t=new Uint8Array(e.length);for(let o=0;o<e.length;++o)t.set([e.charCodeAt(o)],o);return t.buffer}function hb(r){return Bt.join(r)}function mh(r){let e="/";for(r=r.trim();r.endsWith(e);)r=r.slice(0,r.length-1);let t=r.split(e);return t[t.length-1]}function Vu(r,e){let t={modelTopology:r.modelTopology,format:r.format,generatedBy:r.generatedBy,convertedBy:r.convertedBy,weightsManifest:e};return r.signature!=null&&(t.signature=r.signature),r.userDefinedMetadata!=null&&(t.userDefinedMetadata=r.userDefinedMetadata),r.modelInitializer!=null&&(t.modelInitializer=r.modelInitializer),r.initializerSignature!=null&&(t.initializerSignature=r.initializerSignature),r.trainingConfig!=null&&(t.trainingConfig=r.trainingConfig),t}function dh(r,e,t){let o={modelTopology:r.modelTopology,format:r.format,generatedBy:r.generatedBy,convertedBy:r.convertedBy};if(r.trainingConfig!=null&&(o.trainingConfig=r.trainingConfig),r.weightsManifest!=null){if(!e)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!t)throw new Error("modelJSON has weightsManifest but weightData is null");o.weightSpecs=e,o.weightData=t}return r.signature!=null&&(o.signature=r.signature),r.userDefinedMetadata!=null&&(o.userDefinedMetadata=r.userDefinedMetadata),r.modelInitializer!=null&&(o.modelInitializer=r.modelInitializer),r.initializerSignature!=null&&(o.initializerSignature=r.initializerSignature),o}async function yp(r,e){let t,o;return r.weightsManifest!=null&&([t,o]=await e(r.weightsManifest)),dh(r,t,o)}function so(r){if(r.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:r.modelTopology==null?0:ub(JSON.stringify(r.modelTopology)),weightSpecsBytes:r.weightSpecs==null?0:ub(JSON.stringify(r.weightSpecs)),weightDataBytes:r.weightData==null?0:new Bt(r.weightData).byteLength}}function xl(r){let e=[];for(let t of r)e.push(...t.weights);return e}function QA(){let r=t=>{let o=t<<13,n=0;for(;!(o&8388608);)n-=8388608,o<<=1;return o&=-8388609,n+=947912704,o|n},e=new Uint32Array(2048);e[0]=0;for(let t=1;t<1024;t++)e[t]=r(t);for(let t=1024;t<2048;t++)e[t]=939524096+(t-1024<<13);return e}function YA(){let r=new Uint32Array(64);r[0]=0,r[31]=1199570944,r[32]=2147483648,r[63]=3347054592;for(let e=1;e<31;e++)r[e]=e<<23;for(let e=33;e<63;e++)r[e]=2147483648+(e-32<<23);return r}function ZA(){let r=new Uint32Array(64);for(let e=0;e<64;e++)r[e]=1024;return r[0]=r[32]=0,r}function JA(){let r=QA(),e=YA(),t=ZA();return o=>{let n=new ArrayBuffer(4*o.length),s=new Uint32Array(n);for(let a=0;a<o.length;a++){let i=o[a],p=r[t[i>>10]+(i&1023)]+e[i>>10];s[a]=p}return new Float32Array(n)}}var Et=class r{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return r.instance==null&&(r.instance=new r),r.instance}static registerSaveRouter(e){r.getInstance().saveRouters.push(e)}static registerLoadRouter(e){r.getInstance().loadRouters.push(e)}static getSaveHandlers(e){return r.getHandlers(e,"save")}static getLoadHandlers(e,t){return r.getHandlers(e,"load",t)}static getHandlers(e,t,o){let n=[];return(t==="load"?r.getInstance().loadRouters:r.getInstance().saveRouters).forEach(a=>{let i=a(e,o);i!==null&&n.push(i)}),n}},gb=r=>Et.registerSaveRouter(r),xb=r=>Et.registerLoadRouter(r),yb=r=>Et.getSaveHandlers(r),bb=(r,e)=>Et.getLoadHandlers(r,e);var fh="tensorflowjs",hh=1,Vs="models_store",tn="model_info_store";function _b(){if(!P().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");let r=typeof window>"u"?self:window,e=r.indexedDB||r.mozIndexedDB||r.webkitIndexedDB||r.msIndexedDB||r.shimIndexedDB;if(e==null)throw new Error("The current browser does not appear to support IndexedDB.");return e}function gh(r){let e=r.result;e.createObjectStore(Vs,{keyPath:"modelPath"}),e.createObjectStore(tn,{keyPath:"modelPath"})}var ao=class{constructor(e){if(this.indexedDB=_b(),e==null||!e)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,t){return new Promise((o,n)=>{let s=this.indexedDB.open(fh,hh);s.onupgradeneeded=()=>gh(s),s.onsuccess=()=>{let a=s.result;if(t==null){let i=a.transaction(Vs,"readonly"),l=i.objectStore(Vs).get(this.modelPath);l.onsuccess=()=>{if(l.result==null)return a.close(),n(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));o(l.result.modelArtifacts)},l.onerror=u=>(a.close(),n(l.error)),i.oncomplete=()=>a.close()}else{t.weightData=Bt.join(t.weightData);let i=so(t),p=a.transaction(tn,"readwrite"),l=p.objectStore(tn),u;try{u=l.put({modelPath:this.modelPath,modelArtifactsInfo:i})}catch(m){return n(m)}let c;u.onsuccess=()=>{c=a.transaction(Vs,"readwrite");let m=c.objectStore(Vs),d;try{d=m.put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:i})}catch(f){return n(f)}d.onsuccess=()=>o({modelArtifactsInfo:i}),d.onerror=f=>{l=p.objectStore(tn);let g=l.delete(this.modelPath);g.onsuccess=()=>(a.close(),n(d.error)),g.onerror=h=>(a.close(),n(d.error))}},u.onerror=m=>(a.close(),n(u.error)),p.oncomplete=()=>{c==null?a.close():c.oncomplete=()=>a.close()}}},s.onerror=a=>n(s.error)})}};ao.URL_SCHEME="indexeddb://";var vb=r=>P().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(ao.URL_SCHEME)?eF(r.slice(ao.URL_SCHEME.length)):null;Et.registerSaveRouter(vb);Et.registerLoadRouter(vb);function eF(r){return new ao(r)}function tF(r){return r.startsWith(ao.URL_SCHEME)?r.slice(ao.URL_SCHEME.length):r}var Bu=class{constructor(){this.indexedDB=_b()}async listModels(){return new Promise((e,t)=>{let o=this.indexedDB.open(fh,hh);o.onupgradeneeded=()=>gh(o),o.onsuccess=()=>{let n=o.result,s=n.transaction(tn,"readonly"),i=s.objectStore(tn).getAll();i.onsuccess=()=>{let p={};for(let l of i.result)p[l.modelPath]=l.modelArtifactsInfo;e(p)},i.onerror=p=>(n.close(),t(i.error)),s.oncomplete=()=>n.close()},o.onerror=n=>t(o.error)})}async removeModel(e){return e=tF(e),new Promise((t,o)=>{let n=this.indexedDB.open(fh,hh);n.onupgradeneeded=()=>gh(n),n.onsuccess=()=>{let s=n.result,a=s.transaction(tn,"readwrite"),i=a.objectStore(tn),p=i.get(e),l;p.onsuccess=()=>{if(p.result==null)return s.close(),o(new Error(`Cannot find model with path '${e}' in IndexedDB.`));{let u=i.delete(e),c=()=>{l=s.transaction(Vs,"readwrite");let d=l.objectStore(Vs).delete(e);d.onsuccess=()=>t(p.result.modelArtifactsInfo),d.onerror=f=>o(p.error)};u.onsuccess=c,u.onerror=m=>(c(),s.close(),o(p.error))}},p.onerror=u=>(s.close(),o(p.error)),a.oncomplete=()=>{l==null?s.close():l.oncomplete=()=>s.close()}},n.onerror=s=>o(n.error)})}};var Fo="/",bp="tensorflowjs_models",Tb="info",rF="model_topology",oF="weight_specs",nF="weight_data",sF="model_metadata";function wb(r){return{info:[bp,r,Tb].join(Fo),topology:[bp,r,rF].join(Fo),weightSpecs:[bp,r,oF].join(Fo),weightData:[bp,r,nF].join(Fo),modelMetadata:[bp,r,sF].join(Fo)}}function Cb(r){for(let e of Object.values(r))window.localStorage.removeItem(e)}function aF(r){let e=r.split(Fo);if(e.length<3)throw new Error(`Invalid key format: ${r}`);return e.slice(1,e.length-1).join(Fo)}function iF(r){return r.startsWith(io.URL_SCHEME)?r.slice(io.URL_SCHEME.length):r}var io=class{constructor(e){if(!P().getBool("IS_BROWSER")||typeof window>"u"||typeof window.localStorage>"u")throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,e==null||!e)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=wb(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{let t=JSON.stringify(e.modelTopology),o=JSON.stringify(e.weightSpecs),n=so(e),s=Bt.join(e.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(n)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,o),this.LS.setItem(this.keys.weightData,db(s));let a={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:e.signature!=null?e.signature:void 0,userDefinedMetadata:e.userDefinedMetadata!=null?e.userDefinedMetadata:void 0,modelInitializer:e.modelInitializer!=null?e.modelInitializer:void 0,initializerSignature:e.initializerSignature!=null?e.initializerSignature:void 0,trainingConfig:e.trainingConfig!=null?e.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(a)),{modelArtifactsInfo:n}}catch{throw Cb(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${n.modelTopologyBytes}, weightSpecsBytes=${n.weightSpecsBytes}, weightDataBytes=${n.weightDataBytes}.`)}}}async load(){let e=JSON.parse(this.LS.getItem(this.keys.info));if(e==null)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if(e.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");let t={},o=JSON.parse(this.LS.getItem(this.keys.topology));if(o==null)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);t.modelTopology=o;let n=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(n==null)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);t.weightSpecs=n;let s=this.LS.getItem(this.keys.modelMetadata);if(s!=null){let i=JSON.parse(s);t.format=i.format,t.generatedBy=i.generatedBy,t.convertedBy=i.convertedBy,i.signature!=null&&(t.signature=i.signature),i.userDefinedMetadata!=null&&(t.userDefinedMetadata=i.userDefinedMetadata),i.modelInitializer!=null&&(t.modelInitializer=i.modelInitializer),i.initializerSignature!=null&&(t.initializerSignature=i.initializerSignature),i.trainingConfig!=null&&(t.trainingConfig=i.trainingConfig)}let a=this.LS.getItem(this.keys.weightData);if(a==null)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return t.weightData=fb(a),t}};io.URL_SCHEME="localstorage://";var Sb=r=>P().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(io.URL_SCHEME)?pF(r.slice(io.URL_SCHEME.length)):null;Et.registerSaveRouter(Sb);Et.registerLoadRouter(Sb);function pF(r){return new io(r)}var zu=class{constructor(){E(P().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),E(typeof window>"u"||typeof window.localStorage<"u",()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){let e={},t=bp+Fo,o=Fo+Tb;for(let n=0;n<this.LS.length;++n){let s=this.LS.key(n);if(s.startsWith(t)&&s.endsWith(o)){let a=aF(s);e[a]=JSON.parse(this.LS.getItem(s))}}return e}async removeModel(e){e=iF(e);let t=wb(e);if(this.LS.getItem(t.info)==null)throw new Error(`Cannot find model at path '${e}'`);let o=JSON.parse(this.LS.getItem(t.info));return Cb(t),o}};var _p="://",qr=class r{constructor(){this.managers={}}static getInstance(){return r.instance==null&&(r.instance=new r),r.instance}static registerManager(e,t){E(e!=null,()=>"scheme must not be undefined or null."),e.endsWith(_p)&&(e=e.slice(0,e.indexOf(_p))),E(e.length>0,()=>"scheme must not be an empty string.");let o=r.getInstance();E(o.managers[e]==null,()=>`A model store manager is already registered for scheme '${e}'.`),o.managers[e]=t}static getManager(e){let t=r.getInstance().managers[e];if(t==null)throw new Error(`Cannot find model manager for scheme '${e}'`);return t}static getSchemes(){return Object.keys(r.getInstance().managers)}};function Uu(r){if(r.indexOf(_p)===-1)throw new Error(`The url string provided does not contain a scheme. Supported schemes are: ${qr.getSchemes().join(",")}`);return{scheme:r.split(_p)[0],path:r.split(_p)[1]}}async function Nb(r,e,t=!1){E(r!==e,()=>`Old path and new path are the same: '${r}'`);let o=Et.getLoadHandlers(r);E(o.length>0,()=>`Copying failed because no load handler is found for source URL ${r}.`),E(o.length<2,()=>`Copying failed because more than one (${o.length}) load handlers for source URL ${r}.`);let n=o[0],s=Et.getSaveHandlers(e);E(s.length>0,()=>`Copying failed because no save handler is found for destination URL ${e}.`),E(s.length<2,()=>`Copying failed because more than one (${o.length}) save handlers for destination URL ${e}.`);let a=s[0],i=Uu(r).scheme,p=Uu(r).path,l=i===Uu(r).scheme,u=await n.load();t&&l&&await qr.getManager(i).removeModel(p);let c=await a.save(u);return t&&!l&&await qr.getManager(i).removeModel(p),c.modelArtifactsInfo}async function Ib(){let r=qr.getSchemes(),e={};for(let t of r){let o=await qr.getManager(t).listModels();for(let n in o){let s=t+_p+n;e[s]=o[n]}}return e}async function kb(r){let e=Uu(r);return qr.getManager(e.scheme).removeModel(e.path)}async function Eb(r,e){return Nb(r,e,!1)}async function $b(r,e){return Nb(r,e,!0)}var xh=class{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if(t!=="utf-8"&&t!=="utf8")throw new Error(`Browser's encoder only supports utf-8, but got ${t}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}setTimeoutCustom(e,t){if(typeof window>"u"||!P().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(e,t);return}this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",o=>{if(o.source===window&&o.data.name===this.messageName){o.stopPropagation();let n=this.functionRefs[o.data.index];n(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(e){return Nu(e)}};if(P().get("IS_BROWSER")){P().setPlatform("browser",new xh);try{qr.registerManager(io.URL_SCHEME,new zu)}catch{}try{qr.registerManager(ao.URL_SCHEME,new Bu)}catch{}}var lF={importFetch:()=>Ab()},yh;var bh=class{constructor(){this.util=Fb(),this.textEncoder=new this.util.TextEncoder}fetch(e,t){return P().global.fetch!=null?P().global.fetch(e,t):(yh==null&&(yh=lF.importFetch()),yh(e,t))}now(){let e=process.hrtime();return e[0]*1e3+e[1]/1e6}encode(e,t){if(t!=="utf-8"&&t!=="utf8")throw new Error(`Node built-in encoder only supports utf-8, but got ${t}`);return this.textEncoder.encode(e)}decode(e,t){return e.length===0?"":new this.util.TextDecoder(t).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}};P().get("IS_NODE")&&!P().get("IS_BROWSER")&&P().setPlatform("node",new bh);function me(r,e="float32",t){return e=e||"float32",st(r),new Le(r,e,t)}function uF(r,e){let t=v(r,"x","cast");if(!Lf(e))throw new Error(`Failed to cast to unknown dtype ${e}`);if(e==="string"&&t.dtype!=="string"||e!=="string"&&t.dtype==="string")throw new Error("Only strings can be casted to strings");let o={x:t},n={dtype:e};return k.runKernel(Ko,o,n)}var Re=N({cast_:uF});function cF(r){let t={x:v(r,"x","clone","string_or_numeric")};return k.runKernel(jo,t)}var xr=N({clone_:cF});function Wu(r,e=!1){console.log(r.toString(e))}ah();var mF={buffer:me,cast:Re,clone:xr,print:Wu};tb(mF);function dF(r,e){let t=v(r,"a","add"),o=v(e,"b","add");[t,o]=ke(t,o);let n={a:t,b:o};return k.runKernel(ko,n)}var fe=N({add_:dF});function fF(r,e){let t=v(r,"a","floorDiv"),o=v(e,"b","floorDiv");[t,o]=ke(t,o);let n={a:t,b:o};return k.runKernel(qn,n)}var Gu=N({floorDiv_:fF});function hF(r,e){let t=v(r,"a","div"),o=v(e,"b","div");if([t,o]=ke(t,o),t.dtype==="int32"&&o.dtype==="int32")return Gu(t,o);let n={a:t,b:o},s={};return k.runKernel(Vn,n,s)}var Fe=N({div_:hF});function gF(r,e){let t=v(r,"a","mul"),o=v(e,"b","mul");[t,o]=ke(t,o);let n={a:t,b:o};return k.runKernel(ps,n)}var se=N({mul_:gF});function xF(r){let e=v(r,"x","abs");if(e.dtype==="complex64"){let t={x:e};return k.runKernel(Ma,t)}else{let t={x:e};return k.runKernel(Ca,t)}}var Dt=N({abs_:xF});function yF(r){let t={x:v(r,"x","acos")};return k.runKernel(In,t)}var Db=N({acos_:yF});function bF(r){let t={x:v(r,"x","acosh")};return k.runKernel(kn,t)}var Rb=N({acosh_:bF});function _F(r){E(Array.isArray(r),()=>"The argument passed to tf.addN() must be a list of tensors"),E(r.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${r.length}`);let e=r.map((n,s)=>v(n,`tensors${s}`,"addN")),t=e[0];e.forEach(n=>{if(n.dtype!==t.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),e.forEach(n=>{if(!fr(n.shape,t.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});let o=e;return k.runKernel(Sa,o)}var Ob=N({addN_:_F});function vF(r,e=null,t=!1){let n={x:v(r,"x","all","bool")},s={axis:e,keepDims:t};return k.runKernel(Na,n,s)}var Pb=N({all_:vF});function TF(r,e=null,t=!1){let n={x:v(r,"x","any","bool")},s={axis:e,keepDims:t};return k.runKernel(Ia,n,s)}var Mb=N({any_:TF});function wF(r,e=0){let o={x:v(r,"x","argMax")},n={axis:e};return k.runKernel(ka,o,n)}var Lb=N({argMax_:wF});function CF(r,e=0){let o={x:v(r,"x","argMin")},n={axis:e};return k.runKernel(Ea,o,n)}var Vb=N({argMin_:CF});function SF(r){let t={x:v(r,"x","asin")};return k.runKernel(En,t)}var Bb=N({asin_:SF});function NF(r){let t={x:v(r,"x","asinh")};return k.runKernel($n,t)}var zb=N({asinh_:NF});function IF(r){let t={x:v(r,"x","atan")};return k.runKernel(An,t)}var Ub=N({atan_:IF});function kF(r,e){let t=v(r,"a","atan2"),o=v(e,"b","atan2");[t,o]=ke(t,o);let n={a:t,b:o};return k.runKernel(Dn,n)}var Wb=N({atan2_:kF});function EF(r){let t={x:v(r,"x","atanh")};return k.runKernel(Fn,t)}var Gb=N({atanh_:EF});function $F(r,e,t,o,n="NHWC",s){let a=r[3],i=[...e,a],p=qb(n);return zs(r,i,t,s,o,null,null,p)}function vh(r,e,t,o,n,s,a="channelsLast"){let[i,p]=yl(e),l;if(a==="channelsLast")l=[i,p,r[3],r[3]];else if(a==="channelsFirst")l=[i,p,r[1],r[1]];else throw new Error(`Unknown dataFormat ${a}`);return zs(r,l,t,o,n,s,!1,a)}function AF(r,e,t,o,n,s,a="NDHWC"){let[i,p,l]=_h(e),u,c;if(a==="NDHWC")c="channelsLast",u=[i,p,l,r[4],r[4]];else if(a==="NCDHW")c="channelsFirst",u=[i,p,l,r[1],r[1]];else throw new Error(`Unknown dataFormat ${a}`);return Hb(r,u,t,o,n,!1,c,s)}function zs(r,e,t,o,n,s,a=!1,i="channelsLast"){let[p,l,u,c]=[-1,-1,-1,-1];if(i==="channelsLast")[p,l,u,c]=r;else if(i==="channelsFirst")[p,c,l,u]=r;else throw new Error(`Unknown dataFormat ${i}`);let[m,d,,f]=e,[g,h]=yl(t),[x,b]=yl(o),S=vp(m,x),C=vp(d,b),{padInfo:$,outHeight:A,outWidth:D}=RF(n,l,u,g,h,S,C,s,i),R=a?f*c:f,M;return i==="channelsFirst"?M=[p,R,A,D]:i==="channelsLast"&&(M=[p,A,D,R]),{batchSize:p,dataFormat:i,inHeight:l,inWidth:u,inChannels:c,outHeight:A,outWidth:D,outChannels:R,padInfo:$,strideHeight:g,strideWidth:h,filterHeight:m,filterWidth:d,effectiveFilterHeight:S,effectiveFilterWidth:C,dilationHeight:x,dilationWidth:b,inShape:r,outShape:M,filterShape:e}}function Hb(r,e,t,o,n,s=!1,a="channelsLast",i){let[p,l,u,c,m]=[-1,-1,-1,-1,-1];if(a==="channelsLast")[p,l,u,c,m]=r;else if(a==="channelsFirst")[p,m,l,u,c]=r;else throw new Error(`Unknown dataFormat ${a}`);let[d,f,g,,h]=e,[x,b,S]=_h(t),[C,$,A]=_h(o),D=vp(d,C),R=vp(f,$),M=vp(g,A),{padInfo:L,outDepth:B,outHeight:W,outWidth:G}=OF(n,l,u,c,x,b,S,D,R,M,i),q=s?h*m:h,H;return a==="channelsFirst"?H=[p,q,B,W,G]:a==="channelsLast"&&(H=[p,B,W,G,q]),{batchSize:p,dataFormat:a,inDepth:l,inHeight:u,inWidth:c,inChannels:m,outDepth:B,outHeight:W,outWidth:G,outChannels:q,padInfo:L,strideDepth:x,strideHeight:b,strideWidth:S,filterDepth:d,filterHeight:f,filterWidth:g,effectiveFilterDepth:D,effectiveFilterHeight:R,effectiveFilterWidth:M,dilationDepth:C,dilationHeight:$,dilationWidth:A,inShape:r,outShape:H,filterShape:e}}function FF(r,e,t,o,n){o==null&&(o=Th(r,e,t));let s=r[0],a=r[1],i=bl((s-e+2*o)/t+1,n),p=bl((a-e+2*o)/t+1,n);return[i,p]}function DF(r,e,t,o,n,s){n==null&&(n=Th(r,e[0],o[0]));let a=[0,0,0,t];for(let i=0;i<3;i++)r[i]+2*n>=e[i]&&(a[i]=bl((r[i]-e[i]+2*n)/o[i]+1,s));return a}function Th(r,e,t,o=1){let n=vp(e,o);return Math.floor((r[0]*(t-1)-t+n)/2)}function yl(r){return typeof r=="number"?[r,r,r]:r.length===2?[r[0],r[1],1]:r}function _h(r){return typeof r=="number"?[r,r,r]:r}function vp(r,e){return e<=1?r:r+(r-1)*(e-1)}function RF(r,e,t,o,n,s,a,i,p){let l,u,c;if(typeof r=="number"){l={top:r,bottom:r,left:r,right:r,type:r===0?"VALID":"NUMBER"};let d=FF([e,t],s,o,r,i);u=d[0],c=d[1]}else if(r==="same"){u=Math.ceil(e/o),c=Math.ceil(t/n);let m=Math.max(0,(u-1)*o+s-e),d=Math.max(0,(c-1)*n+a-t),f=Math.floor(m/2),g=m-f,h=Math.floor(d/2),x=d-h;l={top:f,bottom:g,left:h,right:x,type:"SAME"}}else if(r==="valid")l={top:0,bottom:0,left:0,right:0,type:"VALID"},u=Math.ceil((e-s+1)/o),c=Math.ceil((t-a+1)/n);else if(typeof r=="object"){let m=p==="channelsLast"?r[1][0]:r[2][0],d=p==="channelsLast"?r[1][1]:r[2][1],f=p==="channelsLast"?r[2][0]:r[3][0],g=p==="channelsLast"?r[2][1]:r[3][1];l={top:m,bottom:d,left:f,right:g,type:m===0&&d===0&&f===0&&g===0?"VALID":"EXPLICIT"},u=bl((e-s+m+d)/o+1,i),c=bl((t-a+f+g)/n+1,i)}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:l,outHeight:u,outWidth:c}}function OF(r,e,t,o,n,s,a,i,p,l,u){let c,m,d,f;if(r==="valid"&&(r=0),typeof r=="number"){c={top:r,bottom:r,left:r,right:r,front:r,back:r,type:r===0?"VALID":"NUMBER"};let h=DF([e,t,o,1],[i,p,l],1,[n,s,a],r,u);m=h[0],d=h[1],f=h[2]}else if(r==="same"){m=Math.ceil(e/n),d=Math.ceil(t/s),f=Math.ceil(o/a);let g=(m-1)*n+i-e,h=(d-1)*s+p-t,x=(f-1)*a+l-o,b=Math.floor(g/2),S=g-b,C=Math.floor(h/2),$=h-C,A=Math.floor(x/2),D=x-A;c={top:C,bottom:$,left:A,right:D,front:b,back:S,type:"SAME"}}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:c,outDepth:m,outHeight:d,outWidth:f}}function bl(r,e){if(!e)return Math.trunc(r);switch(e){case"round":return Math.round(r);case"ceil":return Math.ceil(r);case"floor":return Math.floor(r);default:throw new Error(`Unknown roundingMode ${e}`)}}function Bs(r){let[e,t,o]=yl(r);return e===1&&t===1&&o===1}function Xt(r,e){return Bs(r)||Bs(e)}function po(r){return yl(r).every(e=>e>0)}function qb(r){if(r==="NHWC")return"channelsLast";if(r==="NCHW")return"channelsFirst";throw new Error(`Unknown dataFormat ${r}`)}function _t(r,e,t){if(t!=null){if(typeof e=="string")throw Error(`Error in ${r}: pad must be an integer when using dimRoundingMode ${t} but got pad ${e}.`);if(typeof e=="number")E(Io(e),()=>`Error in ${r}: pad must be an integer when using dimRoundingMode ${t} but got pad ${e}.`);else if(typeof e=="object")e.forEach(o=>{o.forEach(n=>{E(Io(n),()=>`Error in ${r}: pad must be an integer when using dimRoundingMode ${t} but got pad ${n}.`)})});else throw Error(`Error in ${r}: Unknown padding parameter: ${e}`)}}function PF(r,e){let o={x:v(r,"x","reshape","string_or_numeric")},n={shape:e};return k.runKernel(Pi,o,n)}var z=N({reshape_:PF});function MF(r,e,t,o,n){let s=v(r,"x","avgPool","float32"),a=1;E(Xt(t,a),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${t} and dilations '${a}'`);let i=s,p=!1;s.rank===3&&(p=!0,i=z(s,[1,s.shape[0],s.shape[1],s.shape[2]])),E(i.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${i.rank}.`),_t("avgPool",o,n);let l={x:i},u={filterSize:e,strides:t,pad:o,dimRoundingMode:n},c=k.runKernel($a,l,u);return c=Re(c,s.dtype),p?z(c,[c.shape[1],c.shape[2],c.shape[3]]):c}var Hu=N({avgPool_:MF});function LF(r,e,t,o,n,s="NDHWC"){let a=v(r,"x","avgPool3d","float32"),i=a,p=!1;a.rank===4&&(p=!0,i=z(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]])),E(i.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${i.rank}.`),E(s==="NDHWC",()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${s}`),E(typeof t=="number"&&t>0||Array.isArray(t)&&t[0]>0&&t[1]>0&&t[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${t}'`),_t("avgPool3d",o,n);let l={x:i},u={filterSize:e,strides:t,pad:o,dimRoundingMode:n,dataFormat:s},c=k.runKernel(Aa,l,u);return c=Re(c,i.dtype),p?z(c,[c.shape[1],c.shape[2],c.shape[3],c.shape[4]]):c}var Kb=N({avgPool3d_:LF});function VF(r,e=0){E(r.length>=1,()=>"Pass at least one tensor to concat");let t=Ls(r,"tensors","concat","string_or_numeric");if(t[0].dtype==="complex64"&&t.forEach(s=>{if(s.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${s.dtype}. `)}),t.length===1)return xr(t[0]);let o=t,n={axis:e};return k.runKernel(La,o,n)}var ot=N({concat_:VF});function BF(r,e,t=!1,o=!1){let n=v(r,"a","matMul"),s=v(e,"b","matMul");[n,s]=ke(n,s);let a={a:n,b:s},i={transposeA:t,transposeB:o};return k.runKernel(Fa,a,i)}var Be=N({matMul_:BF});function zF(r){let t={x:v(r,"x","sigmoid","float32")};return k.runKernel(_s,t)}var uo=N({sigmoid_:zF});function UF(r,e,t){let o=v(r,"x","slice","string_or_numeric");if(o.rank===0)throw new Error("Slicing scalar is not possible");let n={x:o},s={begin:e,size:t};return k.runKernel(Gi,n,s)}var De=N({slice_:UF});function WF(r){let t={x:v(r,"x","tanh","float32")};return k.runKernel(Is,t)}var _l=N({tanh_:WF});function GF(r,e,t,o,n,s){let a=v(r,"forgetBias","basicLSTMCell"),i=v(e,"lstmKernel","basicLSTMCell"),p=v(t,"lstmBias","basicLSTMCell"),l=v(o,"data","basicLSTMCell"),u=v(n,"c","basicLSTMCell"),c=v(s,"h","basicLSTMCell"),m=ot([l,c],1),d=Be(m,i),f=fe(d,p),g=f.shape[0],h=f.shape[1]/4,x=[g,h],b=De(f,[0,0],x),S=De(f,[0,h],x),C=De(f,[0,h*2],x),$=De(f,[0,h*3],x),A=fe(se(uo(b),_l(S)),se(u,uo(fe(a,C)))),D=se(_l(A),uo($));return[A,D]}var jb=N({basicLSTMCell_:GF});function HF(r,e,t){let o=v(r,"x","batchToSpaceND"),n=e.reduce((i,p)=>i*p);E(o.rank>=1+e.length,()=>`input rank is ${o.rank} but should be > than blockShape.length ${e.length}`),E(t.length===e.length,()=>`crops.length is ${t.length} but should be equal to blockShape.length  ${e.length}`),E(o.shape[0]%n===0,()=>`input tensor batch is ${o.shape[0]} but is not divisible by the product of the elements of blockShape ${e.join(" * ")} === ${n}`);let s={x:o},a={blockShape:e,crops:t};return k.runKernel(Da,s,a)}var qu=N({batchToSpaceND_:HF});function Xb(r){let e;return r.rank===0||r.rank===1?e=z(r,[1,1,1,r.size]):r.rank===2?e=z(r,[1,1,r.shape[0],r.shape[1]]):r.rank===3?e=z(r,[1,r.shape[0],r.shape[1],r.shape[2]]):e=r,e}function qF(r,e,t,o,n,s){s==null&&(s=.001);let a=v(r,"x","batchNorm"),i=v(e,"mean","batchNorm"),p=v(t,"variance","batchNorm"),l;n!=null&&(l=v(n,"scale","batchNorm"));let u;o!=null&&(u=v(o,"offset","batchNorm")),E(i.rank===p.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),E(u==null||i.rank===u.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),E(l==null||i.rank===l.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let m={x:Xb(a),scale:l,offset:u,mean:i,variance:p},d={varianceEpsilon:s},f=k.runKernel(si,m,d);return z(f,a.shape)}var rn=N({batchNorm_:qF});function KF(r,e,t,o,n,s){let a=v(r,"x","batchNorm"),i=v(e,"mean","batchNorm"),p=v(t,"variance","batchNorm"),l;n!=null&&(l=v(n,"scale","batchNorm"));let u;return o!=null&&(u=v(o,"offset","batchNorm")),E(a.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${a.rank}.`),E(i.rank===2||i.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${i.rank}.`),E(p.rank===2||p.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${p.rank}.`),l!=null&&E(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${l.rank}.`),u!=null&&E(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${u.rank}.`),rn(a,i,p,u,l,s)}var Qb=N({batchNorm2d_:KF});function jF(r,e,t,o,n,s){let a=v(r,"x","batchNorm"),i=v(e,"mean","batchNorm"),p=v(t,"variance","batchNorm"),l;n!=null&&(l=v(n,"scale","batchNorm"));let u;return o!=null&&(u=v(o,"offset","batchNorm")),E(a.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${a.rank}.`),E(i.rank===3||i.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${i.rank}.`),E(p.rank===3||p.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${p.rank}.`),l!=null&&E(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${l.rank}.`),u!=null&&E(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${u.rank}.`),rn(a,i,p,u,l,s)}var Yb=N({batchNorm3d_:jF});function XF(r,e,t,o,n,s){let a=v(r,"x","batchNorm"),i=v(e,"mean","batchNorm"),p=v(t,"variance","batchNorm"),l;n!=null&&(l=v(n,"scale","batchNorm"));let u;return o!=null&&(u=v(o,"offset","batchNorm")),E(a.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${a.rank}.`),E(i.rank===4||i.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${i.rank}.`),E(p.rank===4||p.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${p.rank}.`),l!=null&&E(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${l.rank}.`),u!=null&&E(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${u.rank}.`),rn(a,i,p,u,l,s)}var Zb=N({batchNorm4d_:XF});function QF(r,e,t){let o=v(r,"x","bincount"),n=v(e,"weights","bincount");E(o.dtype==="int32",()=>`Error in bincount: input dtype must be int32, but got ${o.dtype}`),E(t>=0,()=>`size must be non-negative, but got ${t}.`),E(n.size===o.size||n.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${o.shape}, weights shape: ${n.shape}.`);let s={x:o,weights:n},a={size:t};return k.runKernel(Ra,s,a)}var Ku=N({bincount_:QF});function YF(r,e){let t=v(r,"x","bitwiseAnd"),o=v(e,"y","bitwiseAnd");if(!fr(t.shape,o.shape))throw new Error(`BitwiseAnd: Tensors must have the same shape. x: ${t.shape}, y: ${o.shape}`);if(t.dtype!=="int32"||o.dtype!=="int32")throw new Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${t.dtype} and type of y: ${o.dtype}`);let n={a:t,b:o};return k.runKernel(Rn,n)}var Jb=N({bitwiseAnd_:YF});function ZF(r,e){let t=v(r,"s0","broadcastArgs","int32"),o=v(e,"s1","broadcastArgs","int32");if(t.rank!==1)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${t.rank}`);if(o.rank!==1)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${o.rank}`);let n={s0:t,s1:o};return k.runKernel(Oa,n)}var e_=N({broadcastArgs_:ZF});function JF(r,e){let t=v(r,"broadcastTo","x"),o=t.shape;if(st(e),e.length<t.rank)throw new Error(`broadcastTo(): shape.length=${e.length} < input.rank=${t.rank}.`);if(e.length>t.rank){let l=t.shape.slice();for(;l.length<e.length;)l.unshift(1);t=z(t,l)}let n=t.shape,s=Array.from(e);for(let l=e.length-1;l>=0;l--)if(n[l]===e[l])s[l]=1;else if(t.shape[l]!==1)throw new Error(`broadcastTo(): [${o}] cannot be broadcast to [${e}].`);if(s.map((l,u)=>l>1?u:-1).filter(l=>l>=0).length===0)return xr(t);let i={x:t},p={reps:s};return k.runKernel(Xo,i,p)}var on=N({broadcastTo_:JF});function eD(r){let t={x:v(r,"x","ceil","float32")};return k.runKernel(On,t)}var t_=N({ceil_:eD});function co(r,e,t){st(r),t=t||qo(e);let o={shape:r,value:e,dtype:t};return k.runKernel(oi,{},o)}function tD(r,e,t){let o=v(r,"x","clipByValue");if(E(e<=t,()=>`Error in clip: min (${e}) must be less than or equal to max (${t}).`),e===t)return co(o.shape,e,o.dtype);let n={x:o},s={clipValueMin:e,clipValueMax:t};return k.runKernel(Pn,n,s)}var r_=N({clipByValue_:tD});function rD(r){return ot(r,0)}var o_=N({concat1d_:rD});function oD(r,e){return ot(r,e)}var n_=N({concat2d_:oD});function nD(r,e){return ot(r,e)}var s_=N({concat3d_:nD});function sD(r,e){return ot(r,e)}var a_=N({concat4d_:sD});function aD(r,e,t,o,n="NHWC",s=[1,1],a){let i=v(r,"x","conv2d","float32"),p=v(e,"filter","conv2d","float32"),l=i,u=!1;i.rank===3&&(u=!0,l=z(i,[1,i.shape[0],i.shape[1],i.shape[2]])),E(l.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${l.rank}.`),E(p.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${p.rank}.`),_t("conv2d",o,a);let c=n==="NHWC"?l.shape[3]:l.shape[1];E(c===p.shape[2],()=>`Error in conv2d: depth of input (${c}) must match input depth for filter ${p.shape[2]}.`),E(Xt(t,s),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${t} and dilations '${s}'`),E(po(s),()=>"Error in conv2D: Dilated rates should be larger than 0."),E(po(t),()=>"Error in conv2D: Strides should be larger than 0.");let m={x:l,filter:p},d={strides:t,pad:o,dataFormat:n,dilations:s,dimRoundingMode:a},f=k.runKernel(Va,m,d);return u?z(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var nn=N({conv2d_:aD});function iD(r,e,t,o,n="NWC",s=1,a){let i=v(r,"x","conv1d"),p=v(e,"filter","conv1d"),l=i,u=!1;i.rank===2&&(u=!0,l=z(i,[1,i.shape[0],i.shape[1]])),E(l.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${l.rank}.`),E(p.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${p.rank}.`),_t("conv1d",o,a),E(l.shape[2]===p.shape[1],()=>`Error in conv1d: depth of input (${l.shape[2]}) must match input depth for filter ${p.shape[1]}.`),E(Xt(t,s),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${t} and dilation '${s}'`),E(po(s),()=>"Error in conv1D: Dilated rates should be larger than 0."),E(po(t),()=>"Error in conv1D: Stride should be larger than 0."),E(n==="NWC",()=>`Error in conv1d: got dataFormat of ${n} but only NWC is currently supported.`);let c=z(p,[1,p.shape[0],p.shape[1],p.shape[2]]),m=z(l,[l.shape[0],1,l.shape[1],l.shape[2]]),h=nn(m,c,[1,t],o,"NHWC",[1,s],a);return u?z(h,[h.shape[2],h.shape[3]]):z(h,[h.shape[0],h.shape[2],h.shape[3]])}var i_=N({conv1d_:iD});function pD(r,e,t,o,n,s="NHWC",a){E(r.length===e.rank,()=>`Length of inShape (${r.length}) and rank of dy (${e.rank}) must match`);let i=r,p=e,l=!1;e.rank===3&&(l=!0,p=z(e,[1,e.shape[0],e.shape[1],e.shape[2]]),i=[1,r[0],r[1],r[2]]),E(i.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${i.length}.`),E(p.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${p.rank}`),E(t.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${t.rank}`);let u=s==="NHWC"?i[3]:i[1],c=s==="NHWC"?p.shape[3]:p.shape[1];E(u===t.shape[2],()=>`Error in conv2dDerInput: depth of input (${u}) must match input depth for filter ${t.shape[2]}.`),E(c===t.shape[3],()=>`Error in conv2dDerInput: depth of output (${c}) must match output depth for filter ${t.shape[3]}.`),_t("conv2dDerInput",n,a);let m={dy:p,filter:t},d={strides:o,pad:n,dataFormat:s,dimRoundingMode:a,inputShape:i},f=k.runKernel(za,m,d);return l?z(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var ju=N({conv2DBackpropInput_:pD});function lD(r,e,t,o,n,s){let a=v(r,"x","conv2dTranspose"),i=v(e,"filter","conv2dTranspose");return ju(t,a,i,o,n,"NHWC",s)}var p_=N({conv2dTranspose_:lD});function uD(r,e,t,o,n="NDHWC",s=[1,1,1]){let a=v(r,"x","conv3d"),i=v(e,"filter","conv3d"),p=a,l=!1;a.rank===4&&(l=!0,p=z(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]])),E(p.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${p.rank}.`),E(i.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${i.rank}.`),E(p.shape[4]===i.shape[3],()=>`Error in conv3d: depth of input (${p.shape[4]}) must match input depth for filter ${i.shape[3]}.`),E(Xt(t,s),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${t} and dilations '${s}'`),E(n==="NDHWC",()=>`Error in conv3d: got dataFormat of ${n} but only NDHWC is currently supported.`),E(po(s),()=>"Error in conv3D: Dilated rates should be larger than 0."),E(po(t),()=>"Error in conv3D: Strides should be larger than 0.");let u={x:p,filter:i},c={strides:t,pad:o,dataFormat:n,dilations:s},m=k.runKernel(Ua,u,c);return l?z(m,[m.shape[1],m.shape[2],m.shape[3],m.shape[4]]):m}var l_=N({conv3d_:uD});function cD(r,e,t,o,n){E(r.length===e.rank,()=>`Length of inShape (${r.length}) and rank of dy (${e.rank}) must match`);let s=r,a=e,i=!1;e.rank===4&&(i=!0,a=z(e,[1,e.shape[0],e.shape[1],e.shape[2],e.shape[3]]),s=[1,r[0],r[1],r[2],r[3]]);let p=s[4],l=a.shape[4];E(s.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${s.length}.`),E(a.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${a.rank}`),E(t.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${t.rank}`),E(p===t.shape[3],()=>`Error in conv3dDerInput: depth of input (${p}) must match input depth for filter ${t.shape[3]}.`),E(l===t.shape[4],()=>`Error in conv3dDerInput: depth of output (${l}) must match output depth for filter ${t.shape[4]}.`);let u={dy:a,filter:t},c={pad:n,strides:o,inputShape:s},m=k.runKernel(Wa,u,c);return i?z(m,[m.shape[1],m.shape[2],m.shape[3],m.shape[4]]):m}var u_=N({conv3DBackpropInput_:cD});function mD(r,e,t,o,n){let s=v(r,"x","conv3dTranspose"),a=v(e,"filter","conv3dTranspose");return u_(t,s,a,o,n)}var c_=N({conv3dTranspose_:mD});function dD(r){let t={x:v(r,"x","cos","float32")};return k.runKernel(Mn,t)}var m_=N({cos_:dD});function fD(r){let t={x:v(r,"x","cosh","float32")};return k.runKernel(Ln,t)}var d_=N({cosh_:fD});function hD(r,e=0,t=!1,o=!1){let s={x:v(r,"x","cumprod")},a={axis:e,exclusive:t,reverse:o};return k.runKernel(Ga,s,a)}var f_=N({cumprod_:hD});function gD(r,e=0,t=!1,o=!1){let s={x:v(r,"x","cumsum")},a={axis:e,exclusive:t,reverse:o};return k.runKernel(Ha,s,a)}var h_=N({cumsum_:gD});function xD(r,e,t,o=!1){let n=v(r,"x","denseBincount"),s=v(e,"weights","denseBincount");E(n.dtype==="int32",()=>`Error in denseBincount: input dtype must be int32, but got ${n.dtype}`),E(n.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${n.rank}.`),E(t>=0,()=>`size must be non-negative, but got ${t}.`),E(s.size===n.size||s.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${n.shape}, weights shape: ${s.shape}.`);let a={x:n,weights:s},i={size:t,binaryOutput:o};return k.runKernel(Ka,a,i)}var g_=N({denseBincount_:xD});function yD(r,e,t="NHWC"){let o=v(r,"x","depthToSpace","float32"),n=t==="NHWC"?o.shape[1]:o.shape[2],s=t==="NHWC"?o.shape[2]:o.shape[3],a=t==="NHWC"?o.shape[3]:o.shape[1];E(e>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${e}`),E(n*e>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${n} and ${e}  for depthToSpace with input shape
    ${o.shape}`),E(s*e>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${s} and ${e} for depthToSpace with input shape
        ${o.shape}`),E(a%(e*e)===0,()=>`Dimension size must be evenly divisible by ${e*e} but is ${a} for depthToSpace with input shape ${o.shape}`);let i={x:o},p={blockSize:e,dataFormat:t};return k.runKernel(ja,i,p)}var x_=N({depthToSpace_:yD});function bD(r,e,t,o,n="NHWC",s=[1,1],a){let i=v(r,"x","depthwiseConv2d","float32"),p=v(e,"filter","depthwiseConv2d","float32"),l=i,u=!1;i.rank===3&&(u=!0,l=z(i,[1,i.shape[0],i.shape[1],i.shape[2]])),E(l.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${l.rank}.`),E(p.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${p.rank}.`);let c=n==="NHWC"?l.shape[3]:l.shape[1];E(c===p.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${c}) must match the inChannels dimension in filter ${p.shape[2]}.`),_t("depthwiseConv2d",o,a);let m={x:l,filter:p},d={strides:t,pad:o,dataFormat:n,dilations:s,dimRoundingMode:a},f=k.runKernel(Xa,m,d);return u?z(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var Tp=N({depthwiseConv2d_:bD});function _D(r){let t={x:v(r,"x","diag")};return k.runKernel(Za,t)}var y_=N({diag_:_D});function vD(r,e,t,o,n=[1,1],s="NHWC"){let a=v(r,"x","dilation2d"),i=v(e,"filter","dilation2d");E(a.rank===3||a.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${a.rank}.`),E(i.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${i.rank}.`),E(s==="NHWC",()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${s}`);let p=a,l=!1;a.rank===3&&(p=z(a,[1,a.shape[0],a.shape[1],a.shape[2]]),l=!0),E(p.shape[3]===i.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${p.shape[3]} vs ${i.shape[2]}`);let u={x:p,filter:i},c={strides:t,pad:o,dilations:n},m=k.runKernel(Ja,u,c);return l?z(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var b_=N({dilation2d_:vD});var mo={};je(mo,{assertAndGetBroadcastShape:()=>Ve,getBroadcastDims:()=>__,getReductionAxes:()=>Xu});function __(r,e){let t=r.length,o=[];for(let n=0;n<t;n++){let s=t-1-n,a=r[s]||1;(e[e.length-1-n]||1)>1&&a===1&&o.unshift(s)}return o}function Xu(r,e){let t=[];for(let o=0;o<e.length;o++){let n=r[r.length-o-1],s=e.length-o-1,a=e[s];(n==null||n===1&&a>1)&&t.unshift(s)}return t}function Ve(r,e){let t=Math.max(r.length,e.length),o=new Array(t);for(let n=0;n<t;n++){let s=r[r.length-n-1];s==null&&(s=1);let a=e[e.length-n-1];if(a==null&&(a=1),s===1)o[t-n-1]=a;else if(a===1)o[t-n-1]=s;else if(s!==a){let i=`Operands could not be broadcast together with shapes ${r} and ${e}.`;throw Error(i)}else o[t-n-1]=s}return o}function TD(r,e){let t=v(r,"a","equal","string_or_numeric"),o=v(e,"b","equal","string_or_numeric");[t,o]=ke(t,o),Ve(t.shape,o.shape);let n={a:t,b:o};return k.runKernel(Un,n)}var Qu=N({equal_:TD});function wD(r,e,t){let o=v(e,"a","where"),n=v(t,"b","where"),s=v(r,"condition","where","bool"),a=Ve(Ve(s.shape,o.shape),n.shape),i=on(s,a),p=on(o,a),l=on(n,a),u={condition:i,t:p,e:l};return k.runKernel(Wi,u)}var Nr=N({where_:wD});function CD(r){let t={x:v(r,"x","zerosLike")};return k.runKernel(lp,t)}var It=N({zerosLike_:CD});function SD(r,e){let t=v(r,"a","div"),o=v(e,"b","div");[t,o]=ke(t,o);let n=Fe(t,o),s=It(n),a=Qu(o,s);return Nr(a,s,n)}var v_=N({divNoNan_:SD});function ND(r,e){let t=v(r,"t1","dot"),o=v(e,"t2","dot");E((t.rank===1||t.rank===2)&&(o.rank===1||o.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${t.rank} and ${o.rank}.`);let n=t.rank===1?t.size:t.shape[1],s=o.rank===1?o.size:o.shape[0];if(E(n===s,()=>`Error in dot: inner dimensions of inputs must match, but got ${n} and ${s}.`),t.rank===1&&o.rank===1){let a=z(t,[1,-1]),i=z(o,[-1,1]),p=Be(a,i);return z(p,[])}else if(t.rank===1&&o.rank===2){let a=z(t,[1,-1]),i=z(o,[o.shape[0],o.shape[1]]),p=Be(a,i);return z(p,[p.size])}else if(t.rank===2&&o.rank===1){let a=z(o,[-1,1]),i=Be(t,a);return z(i,[i.size])}else{let a=z(o,[o.shape[0],o.shape[1]]);return Be(t,a)}}var T_=N({dot_:ND});function ID(r,...e){let t=e.map((n,s)=>v(n,`tensors${s}`,"einsum")),o={equation:r};return k.runKernel(ei,t,o)}var sn=N({einsum_:ID});function kD(r){let t={x:v(r,"x","elu","float32")};return k.runKernel(Bn,t)}var Yu=N({elu_:kD});function ED(r,e){let t=v(r,"x","ensureShape","string_or_numeric");if(!Rf(t.shape,e))throw new Error(`EnsureShape: Shape of tensor ${t.shape} is not compatible with expected shape ${e}`);return r}var w_=N({ensureShape_:ED});function $D(r){let e=v(r,"x","erf");E(e.dtype==="int32"||e.dtype==="float32",()=>"Input dtype must be `int32` or `float32`."),e.dtype==="int32"&&(e=Re(e,"float32"));let t={x:e};return k.runKernel(zn,t)}var C_=N({erf_:$D});function wh(r,e){for(let t=0;t<r.length;++t)if(r[r.length-t-1]!==e-1-t)return!1;return!0}function S_(r,e,t){let o=r.length+e.length,n=[],s=0,a=0;for(let i=0;i<o;i++)t.indexOf(i)===-1?n.push(r[s++]):n.push(e[a++]);return n}function AD(r,e){let t=[],o=r.length;for(let s=0;s<o;s++)e.indexOf(s)===-1&&t.push(r[s]);let n=e.map(s=>r[s]);return[t,n]}function Do(r,e){let t=e.map(o=>1);return S_(r,t,e)}function FD(r,e,t){E(wh(e,t),()=>`${r} supports only inner-most axes for now. Got axes ${e} and rank-${t} input.`)}function DD(r,e){if(wh(r,e))return null;let t=[];for(let o=0;o<e;++o)r.indexOf(o)===-1&&t.push(o);return r.forEach(o=>t.push(o)),t}function RD(r){return r.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function OD(r,e){let t=[];for(let o=e-r;o<e;++o)t.push(o);return t}function MD(r,e=null,t=!1){let n={x:v(r,"x","max")},s={reductionIndices:e,keepDims:t};return k.runKernel(di,n,s)}var fo=N({max_:MD});function LD(r,e=null,t=!1){let n={x:v(r,"x","min")},s={axis:e,keepDims:t};return k.runKernel(yi,n,s)}var vl=N({min_:LD});function VD(r,e){let t=v(r,"base","pow"),o=v(e,"exp","pow");[t,o]=ke(t,o);let n={a:t,b:o};return k.runKernel(us,n)}var Ro=N({pow_:VD});function _e(r,e){if((jt(r)&&e!=="string"||Array.isArray(r))&&e!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(e==="string"&&jt(r)&&!(r instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Yt(r,[],[],e)}function BD(r){let t={x:v(r,"x","sqrt","float32")};return k.runKernel(Ts,t)}var sr=N({sqrt_:BD});function zD(r){let e=v(r,"x","square"),t={};return k.runKernel("Square",{x:e},t)}var Rt=N({square_:zD});function UD(r,e=null,t=!1){let o=v(r,"x","sum");o.dtype==="bool"&&(o=Re(o,"int32"));let n={x:o},s={axis:e,keepDims:t};return k.runKernel(Hi,n,s)}var ze=N({sum_:UD});function WD(r,e="euclidean",t=null,o=!1){r=v(r,"x","norm");let n=N_(r,e,t),s=n.shape;if(o){let a=Ho(t,r.shape);s=Do(n.shape,a)}return z(n,s)}function N_(r,e,t=null){if(r.rank===0)return Dt(r);if(r.rank!==1&&t===null)return N_(z(r,[-1]),e,t);if(r.rank===1||typeof t=="number"||Array.isArray(t)&&t.length===1){if(e===1)return ze(Dt(r),t);if(e===1/0)return fo(Dt(r),t);if(e===-1/0)return vl(Dt(r),t);if(e==="euclidean"||e===2)return sr(ze(Ro(Dt(r),_e(2,"int32")),t));throw new Error(`Error in norm: invalid ord value: ${e}`)}if(Array.isArray(t)&&t.length===2){if(e===1)return fo(ze(Dt(r),t[0]),t[1]-1);if(e===1/0)return fo(ze(Dt(r),t[1]),t[0]);if(e===-1/0)return vl(ze(Dt(r),t[1]),t[0]);if(e==="fro"||e==="euclidean")return sr(ze(Rt(r),t));throw new Error(`Error in norm: invalid ord value: ${e}`)}throw new Error(`Error in norm: invalid axis: ${t}`)}var Us=N({norm_:WD});function GD(r,e=null,t=!1){return Us(r,"euclidean",e,t)}var I_=N({euclideanNorm_:GD});function HD(r){let t={x:v(r,"x","exp")};return k.runKernel(Wn,t)}var Or=N({exp_:HD});function qD(r,e=0){let t=v(r,"x","expandDims","string_or_numeric");E(e<=t.rank,()=>"Axis must be <= rank of the tensor");let o={input:t},n={dim:e};return k.runKernel(ti,o,n)}var Kr=N({expandDims_:qD});function KD(r){let t={x:v(r,"x","expm1")};return k.runKernel(Gn,t)}var k_=N({expm1_:KD});function jD(r,e){let t=v(r,"x","tile","string_or_numeric");E(t.rank===e.length,()=>`Error in transpose: rank of input ${t.rank} must match length of reps ${e}.`);let o={x:t},n={reps:e};return k.runKernel(Xo,o,n)}var an=N({tile_:jD});function XD(r,e,t,o="float32"){e==null&&(e=r);let n=me([r,e],o),s=r<=e?r:e;for(let i=0;i<s;++i)n.set(1,i,i);let a=z(n.toTensor(),[r,e]);if(t==null)return a;if(t.length===1)return an(Kr(a,0),[t[0],1,1]);if(t.length===2)return an(Kr(Kr(a,0),0),[t[0],t[1],1,1]);if(t.length===3)return an(Kr(Kr(Kr(a,0),0),0),[t[0],t[1],t[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${t.length}D.`)}var Zu=N({eye_:XD});function QD(r){let t={x:v(r,"x","floor","float32")};return k.runKernel(Hn,t)}var Ju=N({floor_:QD});function YD(r,e,t=0,o=0){let n=v(r,"x","gather"),s=v(e,"indices","gather","int32"),a={x:n,indices:s},i={axis:t,batchDims:o};return k.runKernel(ai,a,i)}var ec=N({gather_:YD});function ZD(r,e){let t=v(r,"a","greater","string_or_numeric"),o=v(e,"b","greater","string_or_numeric");[t,o]=ke(t,o),Ve(t.shape,o.shape);let n={a:t,b:o};return k.runKernel(Kn,n)}var Ws=N({greater_:ZD});function JD(r,e){let t=v(r,"a","greaterEqual","string_or_numeric"),o=v(e,"b","greaterEqual","string_or_numeric");[t,o]=ke(t,o),Ve(t.shape,o.shape);let n={a:t,b:o};return k.runKernel(jn,n)}var tc=N({greaterEqual_:JD});function eR(r){let t={input:v(r,"input","imag")};return k.runKernel(li,t)}var pn=N({imag_:eR});function tR(r){let t={x:v(r,"x","isFinite")};return k.runKernel(Xn,t)}var E_=N({isFinite_:tR});function rR(r){let t={x:v(r,"x","isInf")};return k.runKernel(Qn,t)}var $_=N({isInf_:rR});function oR(r){let t={x:v(r,"x","isNaN")};return k.runKernel(Yn,t)}var A_=N({isNaN_:oR});function nR(r,e=.2){let o={x:v(r,"x","leakyRelu")},n={alpha:e};return k.runKernel(ui,o,n)}var rc=N({leakyRelu_:nR});function sR(r,e){let t=v(r,"a","less","string_or_numeric"),o=v(e,"b","less","string_or_numeric");[t,o]=ke(t,o),Ve(t.shape,o.shape);let n={a:t,b:o};return k.runKernel(Zn,n)}var Tl=N({less_:sR});function aR(r,e){let t=v(r,"a","lessEqual","string_or_numeric"),o=v(e,"b","lessEqual","string_or_numeric");[t,o]=ke(t,o),Ve(t.shape,o.shape);let n={a:t,b:o};return k.runKernel(Jn,n)}var wp=N({lessEqual_:aR});function F_(r,e,t){if(t<=0)throw new Error("The number of values should be positive.");let o={start:r,stop:e,num:t};return k.runKernel(ci,{},o)}function iR(r,e=5,t=1,o=1,n=.5){let s=v(r,"x","localResponseNormalization");E(s.rank===4||s.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${s.rank}.`),E(Io(e),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${e}.`);let a=s,i=!1;s.rank===3&&(i=!0,a=z(s,[1,s.shape[0],s.shape[1],s.shape[2]]));let p={x:a},l={depthRadius:e,bias:t,alpha:o,beta:n},u=k.runKernel(mi,p,l);return i?z(u,[u.shape[1],u.shape[2],u.shape[3]]):u}var D_=N({localResponseNormalization_:iR});function pR(r){let t={x:v(r,"x","log","float32")};return k.runKernel(es,t)}var Oo=N({log_:pR});function lR(r){let t={x:v(r,"x","log1p")};return k.runKernel(ts,t)}var oc=N({log1p_:lR});function R_(r,e){E(va(r),()=>"The f passed in variableGrads(f) must be a function"),E(e==null||Array.isArray(e)&&e.every(l=>l instanceof $o),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");let t=e!=null;if(!t){e=[];for(let l in k.registeredVariables)e.push(k.registeredVariables[l])}let o=t?e.filter(l=>!l.trainable):null,n=e.length;e=e.filter(l=>l.trainable),E(e.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${n} variables is trainable.`);let s=!0,{value:a,grads:i}=k.gradients(r,e,null,s);E(i.some(l=>l!=null),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),E(a.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${a.rank} tensor`);let p={};return e.forEach((l,u)=>{i[u]!=null&&(p[l.name]=i[u])}),o?.forEach(l=>p[l.name]=null),{value:a,grads:p}}function ar(r){return k.customGrad(r)}function uR(r){let t={x:v(r,"x","neg")};return k.runKernel(vi,t)}var zt=N({neg_:uR});function cR(r){let t={x:v(r,"x","softplus")};return k.runKernel(vs,t)}var nc=N({softplus_:cR});function mR(r){let e=v(r,"x","logSigmoid");return ar(o=>({value:zt(nc(zt(o))),gradFunc:a=>se(a,uo(zt(o)))}))(e)}var O_=N({logSigmoid_:mR});function dR(r,e){let t=v(r,"a","sub"),o=v(e,"b","sub");[t,o]=ke(t,o);let n={a:t,b:o};return k.runKernel(Ss,n)}var ve=N({sub_:dR});function fR(r,e=-1){let t=v(r,"logits","logSoftmax");if(e===-1&&(e=t.rank-1),e!==t.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${t.rank} and axis was ${e}`);return ar((n,s)=>{let i=fo(n,e,!0),p=ve(n,i),l=ve(Re(p,"float32"),Oo(ze(Or(p),e,!0)));return s([l]),{value:l,gradFunc:(c,m)=>{let[d]=m,f=!0,g=Or(d);return ve(c,se(ze(c,e,f),g))}}})(t)}var P_=N({logSoftmax_:fR});function hR(r,e=null,t=!1){let o=v(r,"x","logSumExp"),n=Ho(e,o.shape),s=fo(o,n,!0),a=ve(o,s),i=Or(a),p=ze(i,n),l=Oo(p),u=fe(z(s,l.shape),l);if(t){let c=Do(u.shape,n);return z(u,c)}return u}var sc=N({logSumExp_:hR});function gR(r,e){let t=v(r,"a","logicalAnd","bool"),o=v(e,"b","logicalAnd","bool");Ve(t.shape,o.shape);let n={a:t,b:o};return k.runKernel(rs,n)}var Gs=N({logicalAnd_:gR});function xR(r){let t={x:v(r,"x","logicalNot","bool")};return k.runKernel(os,t)}var ac=N({logicalNot_:xR});function yR(r,e){let t=v(r,"a","logicalOr","bool"),o=v(e,"b","logicalOr","bool");Ve(t.shape,o.shape);let n={a:t,b:o};return k.runKernel(ns,n)}var ic=N({logicalOr_:yR});function bR(r,e){let t=v(r,"a","logicalXor","bool"),o=v(e,"b","logicalXor","bool");return Ve(t.shape,o.shape),Gs(ic(r,e),ac(Gs(r,e)))}var M_=N({logicalXor_:bR});var pc=2147483648;function _R(r,e,t="left"){let o=v(r,"sortedSequence","searchSorted"),n=v(e,"values","searchSorted"),s=o.shape[o.shape.length-1],a=n.shape[n.shape.length-1],i=z(o,[-1,s]),p=z(n,[-1,a]);if(i.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(i.shape[0]!==p.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(Ee(p.shape)>=pc)throw new Error(`values tensor size must less than ${pc}`);if(i.shape[1]>=pc)throw new Error(`trailing dim_size must less than ${pc} for int32 output type, was ${i.shape[1]}`);let l={sortedSequence:i,values:p},u={side:t};return k.runKernel(Ui,l,u)}var wl=N({searchSorted_:_R});function L_(r,e){return wl(r,e,"left")}function vR(r,e,t,o,n){let s=v(r,"x","maxPool"),a=1,i=s,p=!1;s.rank===3&&(p=!0,i=z(s,[1,s.shape[0],s.shape[1],s.shape[2]])),E(i.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${i.rank}.`),E(Xt(t,a),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${t} and dilations '${a}'`),_t("maxPool",o,n);let l={x:i},u={filterSize:e,strides:t,pad:o,dimRoundingMode:n},c=k.runKernel(fi,l,u);return p?z(c,[c.shape[1],c.shape[2],c.shape[3]]):c}var lc=N({maxPool_:vR});function TR(r,e=[1,1,1],t,o,n,s="NDHWC"){let a=v(r,"x","maxPool3d"),i=a,p=!1;a.rank===4&&(p=!0,i=z(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]])),E(i.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${i.rank}.`),E(s==="NDHWC",()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${s}`),_t("maxPool3d",o,n);let l={x:i},u={filterSize:e,strides:t,pad:o,dimRoundingMode:n,dataFormat:s},c=k.runKernel(hi,l,u);return p?z(c,[c.shape[1],c.shape[2],c.shape[3],c.shape[4]]):c}var V_=N({maxPool3d_:TR});function wR(r,e,t,o,n=!1){let a={x:v(r,"x","maxPoolWithArgmax")},i={filterSize:e,strides:t,pad:o,includeBatchInIndex:n},p=k.runKernel(gi,a,i);return{result:p[0],indexes:p[1]}}var B_=N({maxPoolWithArgmax_:wR});function CR(r,e){let t=v(r,"a","maximum"),o=v(e,"b","maximum");[t,o]=ke(t,o),t.dtype==="bool"&&(t=Re(t,"int32"),o=Re(o,"int32")),Ve(t.shape,o.shape);let n={a:t,b:o};return k.runKernel(ss,n)}var uc=N({maximum_:CR});function SR(r,e=null,t=!1){let n={x:v(r,"x","mean")},s={axis:e,keepDims:t};return k.runKernel(xi,n,s)}var Hs=N({mean_:SR});function yr(r,e="float32"){if(st(r),e==="complex64"){let o=yr(r,"float32"),n=yr(r,"float32");return or(o,n)}let t=wa(Ee(r),e);return k.makeTensor(t,r,e)}function ho(r,e="float32"){if(st(r),e==="complex64"){let o=ho(r,"float32"),n=yr(r,"float32");return or(o,n)}let t=il(Ee(r),e);return k.makeTensor(t,r,e)}function z_(r,e,{indexing:t="xy"}={}){if(t!=="xy"&&t!=="ij")throw new TypeError(`${t} is not a valid third argument to meshgrid`);if(r===void 0)return[];let o=v(r,"x","meshgrid",r instanceof rt?r.dtype:"float32");if(e===void 0)return[o];let n=v(e,"y","meshgrid",e instanceof rt?e.dtype:"float32"),s=Ee(o.shape),a=Ee(n.shape);return t==="xy"?(o=z(o,[1,-1]),n=z(n,[-1,1]),[Be(ho([a,1],o.dtype),o),Be(n,ho([1,s],n.dtype))]):(o=z(o,[-1,1]),n=z(n,[1,-1]),[Be(o,ho([1,a],o.dtype)),Be(ho([s,1],n.dtype),n)])}function NR(r,e){let t=v(r,"a","minimum"),o=v(e,"b","minimum");[t,o]=ke(t,o),t.dtype==="bool"&&(t=Re(t,"int32"),o=Re(o,"int32")),Ve(t.shape,o.shape);let n={a:t,b:o};return k.runKernel(as,n)}var qs=N({minimum_:NR});function IR(r,e,t){E(t==="reflect"||t==="symmetric",()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${t}.`);let o=v(r,"x","mirrorPad");if(o.rank===0)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");E(e.length===o.rank,()=>`Padding doesn't match input. Must be ${o.rank}. Got ${e.length}.`);let n=t==="reflect"?1:0;for(let i=0;i<o.rank;i++)E(e[i].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),E(e[i][0]>=0&&e[i][0]<=o.shape[i]-n&&e[i][1]>=0&&e[i][1]<=o.shape[i]-n,()=>`Padding in dimension ${i} cannot be greater than or equal to ${o.shape[i]-n} or less than 0 for input of shape ${o.shape}`);let s={paddings:e,mode:t},a={x:o};return k.runKernel(bi,a,s)}var U_=N({mirrorPad_:IR});function kR(r,e){let t=v(r,"a","mod"),o=v(e,"b","mod");[t,o]=ke(t,o);let n={a:t,b:o};return k.runKernel(is,n)}var W_=N({mod_:kR});function ER(r,e=null,t=!1){r=v(r,"x","moments");let o=Ho(e,r.shape),n=Hs(r,o,t),s=n.shape;t||(s=Do(n.shape,o));let a=Rt(ve(Re(r,"float32"),z(n,s))),i=Hs(a,o,t);return{mean:n,variance:i}}var G_=N({moments_:ER});function $R(r,e,t,o){let n=v(e,"data","multiRNNCell"),s=Ls(t,"c","multiRNNCell"),a=Ls(o,"h","multiRNNCell"),i=n,p=[];for(let c=0;c<r.length;c++){let m=r[c](i,s[c],a[c]);p.push(m[0]),p.push(m[1]),i=m[1]}let l=[],u=[];for(let c=0;c<p.length;c+=2)l.push(p[c]),u.push(p[c+1]);return[l,u]}var H_=N({multiRNNCell_:$R});function AR(r,e,t,o=!1){let n=v(r,"logits","multinomial"),s=n.size,a=n.rank;if(s<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${s}.`);if(a>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${a}`);t=t||Math.random();let p={logits:a===1?z(n,[1,-1]):n},l={numSamples:e,seed:t,normalized:o},u=k.runKernel(_i,p,l);return a===1?z(u,[u.size]):u}var q_=N({multinomial_:AR});function FR(r,e){let t=v(r,"a","notEqual","string_or_numeric"),o=v(e,"b","notEqual","string_or_numeric");[t,o]=ke(t,o),Ve(t.shape,o.shape);let n={a:t,b:o};return k.runKernel(ls,n)}var cc=N({notEqual_:FR});function DR(r,e,t=1,o=0,n="int32"){if(e<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${e}`);let a={indices:v(r,"indices","oneHot","int32")},i={dtype:n,depth:e,onValue:t,offValue:o};return k.runKernel(Ni,a,i)}var K_=N({oneHot_:DR});function RR(r){let t={x:v(r,"x","onesLike")};return k.runKernel(Si,t)}var j_=N({onesLike_:RR});function OR(r,e){let t=v(r,"v1","outerProduct"),o=v(e,"v2","outerProduct");E(t.rank===1&&o.rank===1,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${t.rank} and ${o.rank}.`);let n=z(t,[-1,1]),s=z(o,[1,-1]);return Be(n,s)}var X_=N({outerProduct_:OR});function PR(r,e,t=0){let o=v(r,"x","pad");if(o.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");let n={paddings:e,constantValue:t},s={x:o};return k.runKernel(ki,s,n)}var go=N({pad_:PR});function MR(r,e,t=0){return E(e.length===2,()=>"Invalid number of paddings. Must be length of 2."),go(r,[e],t)}var Q_=N({pad1d_:MR});function LR(r,e,t=0){return E(e.length===2&&e[0].length===2&&e[1].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),go(r,e,t)}var Y_=N({pad2d_:LR});function VR(r,e,t=0){return E(e.length===3&&e[0].length===2&&e[1].length===2&&e[2].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),go(r,e,t)}var Z_=N({pad3d_:VR});function BR(r,e,t=0){return E(e.length===4&&e[0].length===2&&e[1].length===2&&e[2].length===2&&e[3].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),go(r,e,t)}var J_=N({pad4d_:BR});function zR(r,e,t){let o=v(r,"x","spaceToBatchND");E(o.rank>=1+e.length,()=>`input rank ${o.rank} should be > than [blockShape] ${e.length}`),E(t.length===e.length,()=>`paddings.shape[0] ${t.length} must be equal to [blockShape] ${e.length}`),E(o.shape.reduce((a,i,p)=>p>0&&p<=e.length?a&&(i+t[p-1][0]+t[p-1][1])%e[p-1]===0:a,!0),()=>`input spatial dimensions ${o.shape.slice(1)} with paddings ${t.toString()} must be divisible by blockShapes ${e.toString()}`);let n={x:o},s={blockShape:e,paddings:t};return k.runKernel(qi,n,s)}var mc=N({spaceToBatchND_:zR});function UR(r,e,t,o,n,s,a){n==null&&(n=[1,1]),s==null&&(s=1),o===0&&(o="valid");let i=v(r,"x","maxPool"),p=i,l=!1;i.rank===3&&(l=!0,p=z(i,[1,i.shape[0],i.shape[1],i.shape[2]])),E(Xt(s,n),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${s} and dilations '${n}'`);let u=vh(p.shape,e,s,n,o),c=[u.dilationHeight,u.dilationWidth],m;o==="same"?m=GR([u.filterHeight,u.filterWidth],c):m=[[0,0],[0,0]];let d=c[0]===1&&c[1]===1,[f,g]=WR([u.inHeight,u.inWidth],c,m),h=d?o:"valid",x=d?p:mc(p,c,f),S=(t==="avg"?()=>Hu(x,e,s,h,a):()=>lc(x,e,s,h,a))(),C=d?S:qu(S,c,g);return l?z(C,[C.shape[1],C.shape[2],C.shape[3]]):C}function WR(r,e,t){let o=t.map(u=>u[0]),n=t.map(u=>u[1]),s=r.concat(o,n),a=e.map((u,c)=>(u-s[c]%u)%u),i=n.map((u,c)=>u+a[c]),p=e.map((u,c)=>[o[c],i[c]]),l=e.map((u,c)=>[0,a[c]]);return[p,l]}function GR(r,e){let o=r.map((a,i)=>a+(a-1)*(e[i]-1)).map(a=>a-1),n=o.map(a=>Math.floor(a/2)),s=o.map((a,i)=>a-n[i]);return o.map((a,i)=>[n[i],s[i]])}var e1=N({pool_:UR});function HR(r,e){let t=v(r,"x","prelu"),o=v(e,"alpha","prelu"),n={x:t,alpha:o};return k.runKernel(Ei,n)}var dc=N({prelu_:HR});function qR(r,e=null,t=!1){let o=v(r,"x","prod");o.dtype==="bool"&&(o=Re(o,"int32"));let n={x:o},s={axis:e,keepDims:t};return k.runKernel($i,n,s)}var t1=N({prod_:qR});function KR(r,e,t,o){let n=r.map((u,c)=>v(u,`tensors${c}`,"raggedGather","int32")),s=v(e,"paramsDenseValues","raggedGather"),a=v(t,"indices","raggedGather","int32"),i={paramsNestedSplits:n,paramsDenseValues:s,indices:a},p={outputRaggedRank:o},l=k.runKernel(Ai,i,p);return{outputNestedSplits:l.slice(0,l.length-1),outputDenseValues:l[l.length-1]}}var r1=N({raggedGather_:KR});function jR(r,e,t){let o=v(r,"starts","raggedRange"),n=v(e,"limits","raggedRange",o.dtype),s=v(t,"deltas","raggedRange",o.dtype),a={starts:o,limits:n,deltas:s},i=k.runKernel(Fi,a);return{rtNestedSplits:i[0],rtDenseValues:i[1]}}var o1=N({raggedRange_:jR});function XR(r,e,t,o,n){let s=v(r,"shape","raggedTensorToTensor","int32"),a=v(e,"values","raggedTensorToTensor"),i=v(t,"defaultValue","raggedTensorToTensor",a.dtype),p=o.map((c,m)=>v(c,`tensors${m}`,"raggedTensorToTensor","int32")),l={shape:s,values:a,defaultValue:i,rowPartitionTensors:p},u={rowPartitionTypes:n};return k.runKernel(Di,l,u)}var n1=N({raggedTensorToTensor_:XR});function QR(r,e,t){st(r);let o=Ee(r),n=null;if(t==null||t==="float32")n=new Float32Array(o);else if(t==="int32")n=new Int32Array(o);else if(t==="bool")n=new Uint8Array(o);else throw new Error(`Unknown data type ${t}`);for(let s=0;s<o;s++)n[s]=e();return k.makeTensor(n,r,t)}var s1=N({rand_:QR});var xc=Df($h());var js=class{constructor(e,t,o,n,s){this.mean=e,this.stdDev=t,this.dtype=o,this.nextVal=NaN,this.truncated=n,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);let a=s||Math.random();this.random=xc.alea(a.toString())}nextValue(){if(!isNaN(this.nextVal)){let n=this.nextVal;return this.nextVal=NaN,n}let e,t,o=!1;for(;!o;){let n,s,a;do n=2*this.random()-1,s=2*this.random()-1,a=n*n+s*s;while(a>=1||a===0);let i=Math.sqrt(-2*Math.log(a)/a);e=this.mean+this.stdDev*n*i,t=this.mean+this.stdDev*s*i,(!this.truncated||this.isValidTruncated(e))&&(o=!0)}return(!this.truncated||this.isValidTruncated(t))&&(this.nextVal=this.convertValue(t)),this.convertValue(e)}convertValue(e){return this.dtype==null||this.dtype==="float32"?e:Math.round(e)}isValidTruncated(e){return e<=this.upper&&e>=this.lower}},hc=class{constructor(e,t,o,n){this.alpha=e,this.beta=1/t,this.dtype=o;let s=n||Math.random();this.randu=xc.alea(s.toString()),this.randn=new js(0,1,o,!1,this.randu()),e<1?this.d=e+2/3:this.d=e-1/3,this.c=1/Math.sqrt(9*this.d)}nextValue(){let e,t,o,n,s,a;for(;;){do n=this.randn.nextValue(),a=1+this.c*n;while(a<=0);if(a*=a*a,e=n*n,t=1-.331*e*e,o=.5*e+this.d*(1-a+Math.log(a)),s=this.randu(),s<t||Math.log(s)<o)break}return a=1/this.beta*this.d*a,this.alpha<1&&(a*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(a)}convertValue(e){return this.dtype==="float32"?e:Math.round(e)}},gc=class{constructor(e=0,t=1,o,n){if(this.canReturnFloat=()=>this.dtype==null||this.dtype==="float32",this.min=e,this.range=t-e,this.dtype=o,n==null&&(n=Math.random()),typeof n=="number"&&(n=n.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${e} - ${t} <= 1 and dtype is not float`);this.random=xc.alea(n)}convertValue(e){return this.canReturnFloat()?e:Math.round(e)}nextValue(){return this.convertValue(this.min+this.range*this.random())}};function oO(r,e,t=1,o="float32",n){if(st(r),t==null&&(t=1),o==null&&(o="float32"),o!=="float32"&&o!=="int32")throw new Error(`Unsupported data type ${o}`);let s=new hc(e,t,o,n),a=me(r,o);for(let i=0;i<a.values.length;i++)a.values[i]=s.nextValue();return a.toTensor()}var T1=N({randomGamma_:oO});function nO(r,e=0,t=1,o,n){if(st(r),o!=null&&o==="bool")throw new Error(`Unsupported data type ${o}`);let s=new js(e,t,o,!1,n),a=me(r,o);for(let i=0;i<a.values.length;i++)a.values[i]=s.nextValue();return a.toTensor()}var yc=N({randomNormal_:nO});function sO(r,e,t){if(e!=null&&e==="bool")throw new Error(`Unsupported data type ${e}`);return yc(r,0,1,e,t)}var w1=N({randomStandardNormal_:sO});function aO(r,e=0,t=1,o="float32",n){st(r);let s=me(r,o),a=new gc(e,t,null,n);for(let i=0;i<s.values.length;i++)s.values[i]=a.nextValue();return s.toTensor()}var Cp=N({randomUniform_:aO});function iO(r,e,t,o){return Cp(r,e,t,"int32",o)}var C1=N({randomUniformInt_:iO});function ln(r,e,t=1,o="float32"){if(t===0)throw new Error("Cannot have a step of zero");let n={start:r,stop:e,step:t,dtype:o};return k.runKernel(Ri,{},n)}function pO(r){let t={input:v(r,"input","real")};return k.runKernel(Oi,t)}var Po=N({real_:pO});function lO(r){let t={x:v(r,"x","reciprocal")};return k.runKernel(cs,t)}var S1=N({reciprocal_:lO});function uO(r){let t={x:v(r,"x","relu")};return k.runKernel(ms,t)}var un=N({relu_:uO});function cO(r){let t={x:v(r,"x","relu6")};return k.runKernel(ds,t)}var bc=N({relu6_:cO});function mO(r,e){let o={x:v(r,"x","reverse")},n={dims:e};return k.runKernel(Vi,o,n)}var Ir=N({reverse_:mO});function dO(r){let e=v(r,"x","reverse");return E(e.rank===1,()=>`Error in reverse1D: x must be rank 1 but got rank ${e.rank}.`),Ir(e,0)}var N1=N({reverse1d_:dO});function fO(r,e){let t=v(r,"x","reverse");return E(t.rank===2,()=>`Error in reverse2D: x must be rank 2 but got rank ${t.rank}.`),Ir(t,e)}var I1=N({reverse2d_:fO});function hO(r,e){let t=v(r,"x","reverse");return E(t.rank===3,()=>`Error in reverse3D: x must be rank 3 but got rank ${t.rank}.`),Ir(t,e)}var k1=N({reverse3d_:hO});function gO(r,e){let t=v(r,"x","reverse");return E(t.rank===4,()=>`Error in reverse4D: x must be rank 4 but got rank ${t.rank}.`),Ir(t,e)}var E1=N({reverse4d_:gO});function xO(r){let t={x:v(r,"x","round")};return k.runKernel(fs,t)}var _c=N({round_:xO});function yO(r){let t={x:v(r,"x","rsqrt","float32")};return k.runKernel(hs,t)}var $1=N({rsqrt_:yO});function bO(r){let t={x:v(r,"x","selu")};return k.runKernel(gs,t)}var A1=N({selu_:bO});function _O(r,e,t,o,n,s=[1,1],a="NHWC"){let i=v(r,"x","separableConv2d"),p=v(e,"depthwiseFilter","separableConv2d"),l=v(t,"pointwiseFilter","separableConv2d"),u=i,c=!1;if(i.rank===3&&(c=!0,u=z(i,[1,i.shape[0],i.shape[1],i.shape[2]])),a==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");E(u.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${u.rank}.`),E(p.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${p.rank}.`),E(l.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${p.rank}.`),E(l.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${l.shape[0]}.`),E(l.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${l.shape[1]}.`);let m=p.shape[2],d=p.shape[3];E(l.shape[2]===m*d,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${m*d}, but got ${l.shape[2]}.`);let f=Tp(u,p,o,n,a,s),h=nn(f,l,1,"valid",a);return c?z(h,[h.shape[1],h.shape[2],h.shape[3]]):h}var F1=N({separableConv2d_:_O});async function vO(r,e){let t=v(r,"x","setdiff1d"),o=v(e,"y","setdiff1d");E(t.dtype===o.dtype,()=>`x and y should have the same dtype, but got x (${t.dtype}) and y (${o.dtype}).`),E(t.rank===1,()=>`x should be 1D tensor, but got x (${t.shape}).`),E(o.rank===1,()=>`y should be 1D tensor, but got y (${o.shape}).`);let n=await t.data(),s=await o.data(),a=new Set(s),i=0;for(let u=0;u<n.length;u++)a.has(n[u])||i++;let p=new Le([i],t.dtype),l=new Le([i],"int32");for(let u=0,c=0;u<n.length;u++)a.has(n[u])||(p.values[c]=n[u],l.values[c]=u,c++);return[p.toTensor(),l.toTensor()]}var D1=vO;function TO(r){let t={x:v(r,"x","sign")};return k.runKernel(bs,t)}var R1=N({sign_:TO});function wO(r){let t={x:v(r,"x","sin","float32")};return k.runKernel(xs,t)}var O1=N({sin_:wO});function CO(r){let t={x:v(r,"x","sinh")};return k.runKernel(ys,t)}var P1=N({sinh_:CO});function SO(r,e,t){let o=v(r,"x","slice1d");return E(o.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${o.rank} tensor`),De(o,[e],[t])}var M1=N({slice1d_:SO});function NO(r,e,t){let o=v(r,"x","slice2d");return E(o.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${o.rank} tensor`),De(o,e,t)}var L1=N({slice2d_:NO});function IO(r,e,t){let o=v(r,"x","slice3d");return E(o.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${o.rank} tensor`),De(o,e,t)}var V1=N({slice3d_:IO});function kO(r,e,t){let o=v(r,"x","slice4d");return E(o.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${o.rank} tensor`),De(o,e,t)}var B1=N({slice4d_:kO});function EO(r,e=-1){let t=v(r,"logits","softmax","float32");if(e===-1&&(e=t.rank-1),e!==t.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${t.rank} and dim was ${e}`);let o={logits:t},n={dim:e};return k.runKernel(ji,o,n)}var vc=N({softmax_:EO});function $O(r){E(r.dtype==="complex64",()=>`The dtype for tf.spectral.fft() must be complex64 but got ${r.dtype}.`);let e={input:r};return k.runKernel(ri,e)}var Sp=N({fft_:$O});function AO(r){E(r.dtype==="complex64",()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${r.dtype}.`);let e={input:r};return k.runKernel(pi,e)}var Xs=N({ifft_:AO});function FO(r){let e=r.shape[r.shape.length-1],t=r.size/e,o;if(e<=2){let n=z(r,[t,e]);o=Xs(n)}else{let n=[t,2*(e-1)],s=z(Po(r),[t,e]),a=z(pn(r),[t,e]),i=Ir(De(s,[0,1],[t,e-2]),1),p=se(Ir(De(a,[0,1],[t,e-2]),1),_e(-1)),l=ot([s,i],1),u=ot([a,p],1),c=z(or(l,u),[n[0],n[1]]);o=Xs(c)}if(o=Po(o),r.rank===3&&r.shape[0]!==0){let n=o,s=r.shape[0];o=z(o,[s,o.shape[0]/s,o.shape[1]]),n.dispose()}return o}var Tc=N({irfft_:FO});function DO(r,e,t=0){let n={x:v(r,"x","split")},s={numOrSizeSplits:e,axis:t};return k.runKernel(Ki,n,s)}var Mo=N({split_:DO});function RO(r,e){E(r.dtype==="float32",()=>`The dtype for rfft() must be real value but got ${r.dtype}`);let t=r.shape[r.shape.length-1],o=r.size/t,n;if(e!=null&&e<t){let f=r.shape.map(h=>0),g=r.shape.map(h=>h);g[r.shape.length-1]=e,n=De(r,f,g),t=e}else if(e!=null&&e>t){let f=r.shape.map(g=>g);f[r.shape.length-1]=e-t,n=ot([r,yr(f)],r.shape.length-1),t=e}else n=r;let s=It(n),a=z(or(n,s),[o,t]),i=Sp(a),p=Math.floor(t/2)+1,l=Po(i),u=pn(i),c=Mo(l,[p,t-p],l.shape.length-1),m=Mo(u,[p,t-p],u.shape.length-1),d=n.shape.slice();return d[n.shape.length-1]=p,z(or(c[0],m[0]),d)}var Np=N({rfft_:RO});function OO(r,e){let t=v(r,"a","squaredDifference"),o=v(e,"b","squaredDifference");[t,o]=ke(t,o),Ve(t.shape,o.shape);let n={a:t,b:o},s={};return k.runKernel(ws,n,s)}var wc=N({squaredDifference_:OO});function PO(r,e){let t=v(r,"x","squeeze","string_or_numeric");return z(t,Of(t.shape,e).newShape)}var Ip=N({squeeze_:PO});function MO(r,e=0){let t=Ls(r,"tensors","stack","string_or_numeric");E(t.length>=1,()=>"Pass at least one tensor to tf.stack"),t.length>0&&E(e<=t[0].rank,()=>"Axis must be <= rank of the tensor");let o=t,n={axis:e};return k.runKernel(Ii,o,n)}var Jt=N({stack_:MO});function LO(r,e=0){let o={x:v(r,"x","step")},n={alpha:e};return k.runKernel(ks,o,n)}var Cc=N({step_:LO});function VO(r,e,t,o,n=0,s=0,a=0,i=0,p=0){let u={x:v(r,"x","stridedSlice","string_or_numeric")},c={begin:e,end:t,strides:o,beginMask:n,endMask:s,ellipsisMask:a,newAxisMask:i,shrinkAxisMask:p};return k.runKernel(ep,u,c)}var z1=N({stridedSlice_:VO});function BO(r){let t={x:v(r,"x","tan","float32")};return k.runKernel(Ns,t)}var U1=N({tan_:BO});function Ot(r,e){Sr(r);let t=rr(r,e);if(t.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return Yt(r,null,t,e)}function cn(r,e,t){if(Sr(r),e!=null&&e.length!==2)throw new Error("tensor2d() requires shape to have two numbers");let o=rr(r,t);if(o.length!==2&&o.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(o.length===1&&e==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Yt(r,e,o,t)}function Sc(r,e,t){if(Sr(r),e!=null&&e.length!==3)throw new Error("tensor3d() requires shape to have three numbers");let o=rr(r,t);if(o.length!==3&&o.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(o.length===1&&e==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return Yt(r,e,o,t)}function W1(r,e,t){if(Sr(r),e!=null&&e.length!==4)throw new Error("tensor4d() requires shape to have four numbers");let o=rr(r,t);if(o.length!==4&&o.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(o.length===1&&e==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return Yt(r,e,o,t)}function G1(r,e,t){if(Sr(r),e!=null&&e.length!==5)throw new Error("tensor5d() requires shape to have five numbers");let o=rr(r,t);if(o.length!==5&&o.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(o.length===1&&e==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return Yt(r,e,o,t)}function H1(r,e,t){if(Sr(r),e!=null&&e.length!==6)throw new Error("tensor6d() requires shape to have six numbers");let o=rr(r,t);if(o.length!==6&&o.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(o.length===1&&e==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return e=e||o,Yt(r,e,o,t)}function q1(r,e,t){let o=e.rank>1?e.shape[e.rank-1]:1,n=e.rank>1?e.rank-1:1,s=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${t.shape}, indices.shape: ${e.shape}, shape: ${r}, sliceDim: ${o}, and batchDim: ${n}.`;if(t.rank<n)throw new Error(s+` update.rank < ${n}. `);if(r.length<o+(t.rank-n))throw new Error(s+` Output shape length < ${o+(t.rank-n)}`);if(t.rank!==n+r.length-o)throw new Error(s+` update.rank != ${n+r.length-o}`);for(let a=0;a<n;++a)if(t.shape[a]!==e.shape[a])throw new Error(s+` updates.shape[${a}] (${t.shape[a]}) != indices.shape[${a}] (${e.shape[a]}).`);for(let a=0;a<t.rank-n;++a)if(t.shape[a+n]!==r[a+o])throw new Error(s+` updates.shape[${a+n}] (${t.shape[a+n]}) != shape[${a+n}] (${r[a+n]})`)}function Cl(r,e,t){if(e.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${e.rank}.`);if(r.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${r.rank}.`);if(e.dtype!=="int32")throw new Error(`The dtype of 'indices' should be int32, but got dtype: ${e.dtype}`);if(t.length<1)throw new Error(`Output rank must be greater or equal to 1, but got shape: ${t}`);if(t.length===0){if(e.size===0)throw new Error(`Indices specified for empty output. indices shape: ${e.shape}`);if(r.size===0)throw new Error(`Updates specified for empty output. updates shape: ${r.shape}`)}q1(t,e,r)}function zO(r,e,t){let o=e.shape.length,n=o>1?e.shape[o-1]:1,s=t.length,a=1;for(let c=n;c<s;++c)a*=t[c];let i=n<1?1:n,p=Ee(e.shape)/i,l=[...no(t.slice(0,n)),1],u=Ee(t);return{sliceRank:n,numUpdates:p,sliceSize:a,strides:l,outputSize:u}}function UO(r,e,t){let o=v(r,"tensor","tensorScatterupdate"),n=v(e,"indices","tensorScatterupdate","int32"),s=v(t,"updates","tensorScatterupdate");if(Cl(s,n,o.shape),o.dtype!==s.dtype)throw new Error(`tensor and updates must have the same dtype, instead they are ${o.dtype} and ${s.dtype}.`);let a={tensor:o,indices:n,updates:s},i={};return k.runKernel(zi,a,i)}var j1=N({tensorScatterUpdate_:UO});function WO(r,e=1,t=!0){let o=v(r,"x","topk");if(o.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");let n=o.shape[o.shape.length-1];if(e<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${e}`);if(e>n)throw new Error(`'k' passed to topk() must be <= the last dimension (${n}) but got ${e}`);let s={x:o},a={k:e,sorted:t},[i,p]=k.runKernel(np,s,a);return{values:i,indices:p}}var X1=N({topk_:WO});function GO(r,e=0,t=1,o,n){if(st(r),o!=null&&o==="bool")throw new Error("Unsupported data type $ { dtype }");let s=new js(e,t,o,!0,n),a=me(r,o);for(let i=0;i<a.values.length;i++)a.values[i]=s.nextValue();return a.toTensor()}var Q1=N({truncatedNormal_:GO});function HO(r,e=0){let t=v(r,"x","unique","string_or_numeric");E(t.rank>0,()=>"The input tensor must be at least 1D");let o={x:t},n={axis:e},[s,a]=k.runKernel(ap,o,n);return{values:s,indices:a}}var Y1=N({unique_:HO});function qO(r,e,t){let o=v(r,"x","unsortedSegmentSum"),n=v(e,"segmentIds","unsortedSegmentSum","int32");E(Io(t),()=>"numSegments must be of dtype int");let s={x:o,segmentIds:n},a={numSegments:t};return k.runKernel(pp,s,a)}var Z1=N({unsortedSegmentSum_:qO});function KO(r,e=0){let t=v(r,"x","unstack","string_or_numeric");E(e>=-t.shape.length&&e<t.shape.length,()=>`Axis = ${e} is not in [-${t.shape.length}, ${t.shape.length})`);let o={value:t},n={axis:e};return k.runKernel(ip,o,n)}var kr=N({unstack_:KO});function J1(r,e){return wl(r,e,"right")}function ev(r,e=!0,t,o){return k.makeVariable(r,e,t,o)}function Nc(r,e){let t=[];for(let s=0;s<e.length;s++)e[s]&&t.push(s);let o=me(r,"int32"),n=me([t.length,r.length],"int32");for(let s=0;s<t.length;s++){let a=o.indexToLoc(t[s]),i=s*r.length;n.values.set(a,i)}return n.toTensor()}async function jO(r){let e=v(r,"condition","whereAsync","bool"),t=await e.data(),o=Nc(e.shape,t);return r!==e&&e.dispose(),o}var Ic=jO;async function XO(r,e,t){let o=v(r,"tensor","boolMask"),n=v(e,"mask","boolMask","bool"),s=t??0,a=n.rank,i=o.shape;E(a>0,()=>"mask cannot be scalar"),ct(i.slice(s,s+a),n.shape,"mask's shape must match the first K dimensions of tensor's shape,");let p=1;for(let g=s;g<s+a;g++)p*=i[g];let l=i.slice(0,s).concat([p],i.slice(s+a)),u=z(o,l),c=z(n,[-1]),m=await Ic(c),d=Ip(m,[1]),f=ec(u,d,s);return r!==o&&o.dispose(),e!==n&&n.dispose(),d.dispose(),u.dispose(),c.dispose(),m.dispose(),f}var QO=XO;function YO(r,e,t){let o=v(r,"x","transpose");if(e==null&&(e=o.shape.map((a,i)=>i).reverse()),E(o.rank===e.length,()=>`Error in transpose: rank of input ${o.rank} must match length of perm ${e}.`),e.forEach(a=>{E(a>=0&&a<o.rank,()=>`All entries in 'perm' must be between 0 and ${o.rank-1} but got ${e}`)}),o.rank<=1)return o.clone();let n={x:o},s={perm:e};return o.dtype==="complex64"?Se(()=>{let a=Po(o),i=pn(o);return a=k.runKernel(Qo,{x:a},s),i=k.runKernel(Qo,{x:i},s),t&&(i=zt(i)),or(a,i)}):k.runKernel(Qo,n,s)}var kc=N({transpose_:YO});function ZO(r,e,t,o,n=!0){let s=v(r,"v","movingAverage"),a=v(e,"x","movingAverage"),i=v(t,"decay","movingAverage");ob(s,a),E(fr(s.shape,a.shape),()=>"Shape mismatch in v and x");let p=_e(1),l=ve(p,i),u=se(ve(a,s),l);if(n){E(o!=null,()=>"When using zeroDebias: true, step is required.");let c=v(o,"step","movingAverage");u=Fe(u,ve(p,Ro(i,c)))}return fe(s,u)}var JO=N({movingAverage_:ZO});function eP(r,e,t){st(t);let o=v(r,"indices","scatterND","int32"),n=v(e,"updates","scatterND");Cl(n,o,t);let s={indices:o,updates:n},a={shape:t};return k.runKernel(Bi,s,a)}var tP=N({scatterND_:eP});function tv(r,e,t,o){if(r.dtype!=="int32")throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${r.dtype}.`);if(r.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${r.shape}.`);let n=r.rank>0?r.shape[0]:1,s=r.rank>1?r.shape[1]:1;if(t.length!==s)throw new Error(`outputShape has incorrect number of elements:, ${t.length}, should be: ${s}.`);let a=e.size;if(!(e.rank===0||e.rank===1&&a===n))throw new Error(`sparseValues has incorrect shape ${e.shape}, should be [] or [${n}]`);if(e.dtype!==o.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}function oP(r,e,t,o=0){st(t);let n=v(r,"sparseIndices","sparseToDense","int32"),s=v(e,"sparseValues","sparseToDense","string_or_numeric"),a=v(o,"defaultValue","sparseToDense",s.dtype);tv(n,s,t,a);let i={sparseIndices:n,sparseValues:s,defaultValue:a},p={outputShape:t};return k.runKernel(Ji,i,p)}var nP=N({sparseToDense_:oP});function sP(r,e){let t=v(e,"indices","gatherND","int32"),n={params:v(r,"x","gatherND","string_or_numeric"),indices:t};return k.runKernel(ii,n)}var aP=N({gatherND_:sP});function rv(r,e){if(e==null)return r.shape.slice();if(fr(r.shape,e))return e;if(r.shape.length===e.length){let t=[];for(let o=0;o<r.shape.length;o++)e[o]==null&&r.shape[o]!=null?t.push(r.shape[o]):t.push(e[o]);return t}return e}function iP(r,e,t,o){let n=v(r,"x","dropout");if(E(n.dtype==="float32",()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${n.dtype} tensor instead.`),E(e>=0&&e<1,()=>`rate must be a float in the range [0, 1), but got ${e}.`),e===0)return r instanceof rt?n.clone():n;let s=rv(n,t),a=1-e,i=Fe(Ju(fe(Cp(s,0,1,"float32",o),a)),a);return se(n,i)}var pP=N({dropout_:iP});function Ah(r){return Math.floor(Math.pow(2,Math.ceil(Math.log(r)/Math.log(2))))}function Sl(r,e,t){let o=1-r%2,n=new Float32Array(r);for(let s=0;s<r;++s){let a=2*Math.PI*s/(r+o-1);n[s]=e-t*Math.cos(a)}return Ot(n,"float32")}async function lP(r,e,t=1){let o=v(r,"predictions","inTopK"),n=v(e,"targets","inTopK");E(o.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${o.rank}`),E(o.rank-1===n.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${o.rank} and targets rank ${n.rank}`),ct(o.shape.slice(0,o.shape.length-1),n.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");let s=o.shape[o.shape.length-1];E(t>0&&t<=s,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${s}), but got ${t}`);let a=await o.data(),i=await n.data(),[p,l]=[a.length/s,s],u=Pf("bool",p);for(let c=0;c<p;c++){let m=c*l,d=a.subarray(m,m+l),f=[];for(let g=0;g<d.length;g++)f.push({value:d[g],index:g});f.sort((g,h)=>h.value-g.value),u[c]=0;for(let g=0;g<t;g++)if(f[g].index===i[c]){u[c]=1;break}}return r!==o&&o.dispose(),e!==n&&n.dispose(),Zt(u,n.shape,"bool")}var uP=lP;var Fh={};je(Fh,{conv2d:()=>nv,depthwiseConv2d:()=>iv,matMul:()=>pv});function cP(r,e,t,o,n,s="NHWC",a){let i=r;r.rank===3&&(i=z(r,[1,r.shape[0],r.shape[1],r.shape[2]]));let p=e;p.rank===3&&(p=z(e,[1,e.shape[0],e.shape[1],e.shape[2]])),E(i.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${i.shape}.`),E(p.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${p.shape}.`),E(t.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${t}.`);let l=s==="NHWC"?i.shape[3]:i.shape[1],u=s==="NHWC"?p.shape[3]:p.shape[1];E(l===t[2],()=>`Error in conv2dDerFilter: depth of input ${l}) must match input depth in filter (${t[2]}.`),E(u===t[3],()=>`Error in conv2dDerFilter: depth of dy (${u}) must match output depth for filter (${t[3]}).`),_t("conv2dDerFilter",n,a);let c={x:i,dy:p},m={strides:o,pad:n,dataFormat:s,dimRoundingMode:a,filterShape:t};return k.runKernel(Ba,c,m)}var ov=N({conv2DBackpropFilter_:cP});function Qs(r,e,t){if(t==null||t==="linear")return r;if(t==="relu")return se(r,Cc(e));throw new Error(`Cannot compute gradient for fused activation ${t}.`)}function Ys(r,e){let t=e,o=Xu(r.shape,e.shape);return o.length>0&&(t=ze(t,o)),z(t,r.shape)}function Zs(r,e,t,o){if(e==="linear")return r;if(e==="relu")return un(r);if(e==="elu")return Yu(r);if(e==="relu6")return bc(r);if(e==="prelu")return dc(r,t);if(e==="leakyrelu")return rc(r,o);if(e==="sigmoid")return uo(r);throw new Error(`Unknown fused activation ${e}.`)}var Js=(r,e)=>!(r>0)||e==="linear";function mP({x:r,filter:e,strides:t,pad:o,dataFormat:n="NHWC",dilations:s=[1,1],dimRoundingMode:a,bias:i,activation:p="linear",preluActivationWeights:l,leakyreluAlpha:u}){if(p=p||"linear",Js(k.state.gradientDepth,p)===!1){E(n==="NHWC",()=>`Error in fused conv2d: got dataFormat of ${n} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let A=nn(r,e,t,o,n,s,a);return i!=null&&(A=fe(A,i)),Zs(A,p,l,u)}let c=v(r,"x","conv2d","float32"),m=v(e,"filter","conv2d","float32"),d=c,f=!1;c.rank===3&&(f=!0,d=z(c,[1,c.shape[0],c.shape[1],c.shape[2]])),E(d.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${d.rank}.`),E(m.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${m.rank}.`),_t("fused conv2d",o,a);let g=n==="NHWC"?d.shape[3]:d.shape[1];E(m.shape[2]===g,()=>`Error in conv2d: depth of input (${g}) must match input depth for filter ${m.shape[2]}.`),E(Xt(t,s),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${t} and dilations '${s}'`);let h=zs(d.shape,m.shape,t,s,o,a),x;i!=null&&(x=v(i,"bias","fused conv2d"),[x]=ke(x,c),n==="NHWC"?Ve(h.outShape,x.shape):(E(x.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${x.shape.length}.`),E(x.shape.length===0||x.shape[0]===h.outChannels||x.shape[0]===1,()=>`Error in fused conv2d: bias shape (${x.shape}) is not compatible with the number of output channels (${h.outChannels})`)));let b;if(l!=null){let A=l.shape;if(E(A.length<=1||A.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${A.length}.`),A.length===1)E(A[0]===1||A[0]===h.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${A}) is not compatible with the number of output channels (${h.outChannels}).`);else if(A.length===3)try{Ve(A,h.outShape)}catch{let R=`Error in fused conv2d: PReLU activation weights (${A}) is not compatible with the output shape of the conv2d (${h.outShape}).`;throw Error(R)}b=v(l,"prelu weights","fused conv2d")}let S=(A,D)=>{E(n==="NHWC",()=>`Error in gradient of fused conv2D: got dataFormat of ${n} but only NHWC is currently supported.`);let[R,M,L,B]=D,W=Qs(A,L,p);E(Bs(s),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${s}'`);let G=ju(M.shape,W,R,t,o),q=ov(M,W,R.shape,t,o),H=[G,q];if(B!=null){let K=Ys(B,W);H.push(K)}return H},C={x:d,filter:m,bias:x,preluActivationWeights:b},$={strides:t,pad:o,dataFormat:n,dilations:s,dimRoundingMode:a,activation:p,leakyreluAlpha:u};return i==null?ar((D,R,M)=>{let L=k.runKernel($s,C,$);return M([R,D,L]),f&&(L=z(L,[L.shape[1],L.shape[2],L.shape[3]])),{value:L,gradFunc:S}})(d,m):ar((D,R,M,L)=>{let B=k.runKernel($s,C,$);return L([R,D,B,M]),f&&(B=z(B,[B.shape[1],B.shape[2],B.shape[3]])),{value:B,gradFunc:S}})(d,m,x)}var nv=N({fusedConv2d_:mP});function dP(r,e,t,o,n,s=[1,1],a){let i=r;r.rank===3&&(i=z(r,[1,r.shape[0],r.shape[1],r.shape[2]]));let p=e;p.rank===3&&(p=z(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let l={x:i,dy:p},u={strides:o,pad:n,dimRoundingMode:a,dilations:s,filterShape:t};return k.runKernel(Qa,l,u)}var sv=N({depthwiseConv2dNativeBackpropFilter_:dP});function fP(r,e,t,o,n,s=[1,1],a){let i=e,p=!1;e.rank===3&&(p=!0,i=z(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let l={dy:i,filter:t},u={strides:o,pad:n,dimRoundingMode:a,dilations:s,inputShape:r},c=k.runKernel(Ya,l,u);return p?z(c,[c.shape[1],c.shape[2],c.shape[3]]):c}var av=N({depthwiseConv2dNativeBackpropInput_:fP});function hP({x:r,filter:e,strides:t,pad:o,dataFormat:n="NHWC",dilations:s=[1,1],dimRoundingMode:a,bias:i,activation:p="linear",preluActivationWeights:l,leakyreluAlpha:u}){if(Js(k.state.gradientDepth,p)===!1){let $=Tp(r,e,t,o,n,s,a);return i!=null&&($=fe($,i)),Zs($,p,l,u)}let c=v(r,"x","depthwiseConv2d","float32"),m=v(e,"filter","depthwiseConv2d","float32"),d=c,f=!1;c.rank===3&&(f=!0,d=z(c,[1,c.shape[0],c.shape[1],c.shape[2]])),E(d.rank===4,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${d.rank}.`),E(m.rank===4,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${m.rank}.`),E(d.shape[3]===m.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${d.shape[3]}) must match the inChannels dimension in filter ${m.shape[2]}.`),s==null&&(s=[1,1]),E(Xt(t,s),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${t} and dilations '${s}'`),_t("fused depthwiseConv2d",o,a);let g=zs(d.shape,m.shape,t,s,o,a,!0),h;i!=null&&(h=v(i,"bias","fused conv2d"),[h]=ke(h,c),Ve(g.outShape,h.shape));let x;l!=null&&(x=v(l,"prelu weights","fused depthwiseConv2d"));let b=($,A)=>{E(Bs(s),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${s}'`);let[D,R,M,L]=A,B=Qs($,M,p),W=av(R.shape,B,D,t,o,s,a),G=sv(R,B,D.shape,t,o,s,a);if(L!=null){let q=Ys(h,B);return[W,G,q]}return[W,G]},S={x:d,filter:m,bias:h,preluActivationWeights:x},C={strides:t,pad:o,dataFormat:n,dilations:s,dimRoundingMode:a,activation:p,leakyreluAlpha:u};return i==null?ar((A,D,R)=>{let M=k.runKernel(As,S,C);return R([D,A,M]),f&&(M=z(M,[M.shape[1],M.shape[2],M.shape[3]])),{value:M,gradFunc:b}})(d,m):ar((A,D,R,M)=>{let L=k.runKernel(As,S,C);return M([D,A,L,R]),f&&(L=z(L,[L.shape[1],L.shape[2],L.shape[3]])),{value:L,gradFunc:b}})(d,m,h)}var iv=N({fusedDepthwiseConv2d_:hP});function gP({a:r,b:e,transposeA:t=!1,transposeB:o=!1,bias:n,activation:s="linear",preluActivationWeights:a,leakyreluAlpha:i=.2}){if(Js(k.state.gradientDepth,s)===!1){let B=Be(r,e,t,o);return n!=null&&(B=fe(B,n)),Zs(B,s,a,i)}let p=v(r,"a","fused matMul"),l=v(e,"b","fused matMul");[p,l]=ke(p,l);let u=t?p.shape[p.rank-2]:p.shape[p.rank-1],c=o?l.shape[l.rank-1]:l.shape[l.rank-2],m=t?p.shape[p.rank-1]:p.shape[p.rank-2],d=o?l.shape[l.rank-2]:l.shape[l.rank-1],f=p.shape.slice(0,-2),g=l.shape.slice(0,-2),h=Ee(f),x=Ee(g);E(u===c,()=>`Error in fused matMul: inner shapes (${u}) and (${c}) of Tensors with shapes ${p.shape} and ${l.shape} and transposeA=${t} and transposeB=${o} must match.`);let S=Ve(p.shape.slice(0,-2),l.shape.slice(0,-2)).concat([m,d]),C=t?z(p,[h,u,m]):z(p,[h,m,u]),$=o?z(l,[x,d,c]):z(l,[x,c,d]),A;n!=null&&(A=v(n,"bias","fused matMul"),[A]=ke(A,p),Ve(S,A.shape));let D;a!=null&&(D=v(a,"prelu weights","fused matMul"));let R=(B,W)=>{let[G,q,H,K]=W,Z=Qs(z(B,H.shape),H,s),X,J;if(!t&&!o?(X=Be(Z,q,!1,!0),J=Be(G,Z,!0,!1)):!t&&o?(X=Be(Z,q,!1,!1),J=Be(Z,G,!0,!1)):t&&!o?(X=Be(q,Z,!1,!0),J=Be(G,Z,!1,!1)):(X=Be(q,Z,!0,!0),J=Be(Z,G,!0,!0)),n!=null){let ae=Ys(K,Z);return[X,J,ae]}else return[X,J]},M={a:C,b:$,bias:A,preluActivationWeights:D},L={transposeA:t,transposeB:o,activation:s,leakyreluAlpha:i};return n==null?ar((W,G,q)=>{let H=k.runKernel(Es,M,L);return q([W,G,H]),{value:z(H,S),gradFunc:R}})(C,$):ar((W,G,q,H)=>{let K=k.runKernel(Es,M,L);return H([W,G,K,q]),{value:z(K,S),gradFunc:R}})(C,$,A)}var pv=N({fusedMatMul_:gP});function xP(r){return Sl(r,.54,.46)}var lv=N({hammingWindow_:xP});function yP(r){return Sl(r,.5,.5)}var Ec=N({hannWindow_:yP});function bP(r,e,t,o=!1,n=0){let s=0,a=[];for(;s+e<=r.size;)a.push(De(r,s,e)),s+=t;if(o)for(;s<r.size;){let i=s+e-r.size,p=ot([De(r,s,e-i),co([i],n)]);a.push(p),s+=t}return a.length===0?cn([],[0,e]):z(ot(a),[a.length,e])}var $c=N({frame_:bP});function _P(r,e,t,o,n=Ec){o==null&&(o=Ah(e));let s=$c(r,e,t),a=se(s,n(e));return Np(a,o)}var uv=N({stft_:_P});function vP(r,e,t,o,n="bilinear",s=0){let a=v(r,"image","cropAndResize"),i=v(e,"boxes","cropAndResize","float32"),p=v(t,"boxInd","cropAndResize","int32"),l=i.shape[0];E(a.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${a.rank}.`),E(i.rank===2&&i.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${l},4] but had shape ${i.shape}.`),E(p.rank===1&&p.shape[0]===l,()=>`Error in cropAndResize: boxInd must be have size [${l}] but had shape ${i.shape}.`),E(o.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${o.length}.`),E(o[0]>=1&&o[1]>=1,()=>`cropSize must be atleast [1,1], but was ${o}`),E(n==="bilinear"||n==="nearest",()=>`method must be bilinear or nearest, but was ${n}`);let u={image:a,boxes:i,boxInd:p},c={method:n,extrapolationValue:s,cropSize:o};return k.runKernel(qa,u,c)}var cv=N({cropAndResize_:vP});function TP(r){let e=v(r,"image","flipLeftRight","float32");E(e.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${e.rank}.`);let t={image:e};return k.runKernel(ni,t,{})}var mv=N({flipLeftRight_:TP});function wP(r){let e=v(r,"image","grayscaleToRGB"),t=e.rank-1,o=e.shape[t];E(e.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${e.rank}.`),E(o===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${o}.`);let n=new Array(e.rank);return n.fill(1,0,t),n[t]=3,an(e,n)}var dv=N({grayscaleToRGB_:wP});function CP(r){let e=v(r,"image","RGBToGrayscale"),t=e.rank-1,o=e.shape[t];E(e.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${e.rank}.`),E(o===3,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${o}.`);let n=e.dtype,s=Re(e,"float32"),a=Ot([.2989,.587,.114]),i;switch(e.rank){case 2:i=sn("ij,j->i",s,a);break;case 3:i=sn("ijk,k->ij",s,a);break;case 4:i=sn("ijkl,l->ijk",s,a);break;case 5:i=sn("ijklm,m->ijkl",s,a);break;case 6:i=sn("ijklmn,n->ijklm",s,a);break;default:throw new Error("Not a valid tensor rank.")}return i=Kr(i,-1),Re(i,n)}var fv=N({rgbToGrayscale_:CP});function SP(r,e,t=0,o=.5){let n=v(r,"image","rotateWithOffset","float32");E(n.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${n.rank}.`);let s={image:n},a={radians:e,fillValue:t,center:o};return k.runKernel(up,s,a)}var hv=N({rotateWithOffset_:SP});function Pr(r,e,t,o,n,s){o==null&&(o=.5),n==null&&(n=Number.NEGATIVE_INFINITY),s==null&&(s=0);let a=r.shape[0];return t=Math.min(t,a),E(0<=o&&o<=1,()=>`iouThreshold must be in [0, 1], but was '${o}'`),E(r.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${r.rank}'`),E(r.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${r.shape[1]}`),E(e.rank===1,()=>"scores must be a 1D tensor"),E(e.shape[0]===a,()=>`scores has incompatible shape with boxes. Expected ${a}, but was ${e.shape[0]}`),E(0<=s&&s<=1,()=>`softNmsSigma must be in [0, 1], but was '${s}'`),{maxOutputSize:t,iouThreshold:o,scoreThreshold:n,softNmsSigma:s}}function NP(r,e,t,o=.5,n=Number.NEGATIVE_INFINITY){let s=v(r,"boxes","nonMaxSuppression","float32"),a=v(e,"scores","nonMaxSuppression","float32"),i=Pr(s,a,t,o,n);t=i.maxOutputSize,o=i.iouThreshold,n=i.scoreThreshold;let p={maxOutputSize:t,iouThreshold:o,scoreThreshold:n};return k.runKernel(Ti,{boxes:s,scores:a},p)}var gv=N({nonMaxSuppression_:NP});function xv(r,e,t){let o=IP(r,e,t),n=o<0?-(o+1):o;r.splice(n,0,e)}function IP(r,e,t){return EP(r,e,t||kP)}function kP(r,e){return r>e?1:r<e?-1:0}function EP(r,e,t){let o=0,n=r.length,s=0,a=!1;for(;o<n;){s=o+(n-o>>>1);let i=t(e,r[s]);i>0?o=s+1:(n=s,a=!i)}return a?o:-o-1}function Ac(r,e,t,o,n){return Dh(r,e,t,o,n,0)}function Fc(r,e,t,o,n,s){return Dh(r,e,t,o,n,0,!1,s,!0)}function Dc(r,e,t,o,n,s){return Dh(r,e,t,o,n,s,!0)}function Dh(r,e,t,o,n,s,a=!1,i=!1,p=!1){let l=[];for(let h=0;h<e.length;h++)e[h]>n&&l.push({score:e[h],boxIndex:h,suppressBeginIndex:0});l.sort(yv);let u=s>0?-.5/s:0,c=[],m=[];for(;c.length<t&&l.length>0;){let h=l.pop(),{score:x,boxIndex:b,suppressBeginIndex:S}=h;if(x<n)break;let C=!1;for(let $=c.length-1;$>=S;--$){let A=$P(r,b,c[$]);if(A>=o){C=!0;break}if(h.score=h.score*AP(o,u,A),h.score<=n)break}h.suppressBeginIndex=c.length,C||(h.score===x?(c.push(b),m.push(h.score)):h.score>n&&xv(l,h,yv))}let d=c.length,f=t-d;i&&f>0&&(c.push(...new Array(f).fill(0)),m.push(...new Array(f).fill(0)));let g={selectedIndices:c};return a&&(g.selectedScores=m),p&&(g.validOutputs=d),g}function $P(r,e,t){let o=r.subarray(e*4,e*4+4),n=r.subarray(t*4,t*4+4),s=Math.min(o[0],o[2]),a=Math.min(o[1],o[3]),i=Math.max(o[0],o[2]),p=Math.max(o[1],o[3]),l=Math.min(n[0],n[2]),u=Math.min(n[1],n[3]),c=Math.max(n[0],n[2]),m=Math.max(n[1],n[3]),d=(i-s)*(p-a),f=(c-l)*(m-u);if(d<=0||f<=0)return 0;let g=Math.max(s,l),h=Math.max(a,u),x=Math.min(i,c),b=Math.min(p,m),S=Math.max(x-g,0)*Math.max(b-h,0);return S/(d+f-S)}function AP(r,e,t){let o=Math.exp(e*t*t);return t<=r?o:0}function yv(r,e){return r.score-e.score||r.score===e.score&&e.boxIndex-r.boxIndex}async function FP(r,e,t,o=.5,n=Number.NEGATIVE_INFINITY){let s=v(r,"boxes","nonMaxSuppressionAsync"),a=v(e,"scores","nonMaxSuppressionAsync"),i=Pr(s,a,t,o,n);t=i.maxOutputSize,o=i.iouThreshold,n=i.scoreThreshold;let p=await Promise.all([s.data(),a.data()]),l=p[0],u=p[1],{selectedIndices:c}=Ac(l,u,t,o,n);return s!==r&&s.dispose(),a!==e&&a.dispose(),Ot(c,"int32")}var bv=FP;function DP(r,e,t,o=.5,n=Number.NEGATIVE_INFINITY,s=0){let a=v(r,"boxes","nonMaxSuppression"),i=v(e,"scores","nonMaxSuppression"),p=Pr(a,i,t,o,n,s);t=p.maxOutputSize,o=p.iouThreshold,n=p.scoreThreshold,s=p.softNmsSigma;let l={boxes:a,scores:i},u={maxOutputSize:t,iouThreshold:o,scoreThreshold:n,softNmsSigma:s},c=k.runKernel(Ci,l,u);return{selectedIndices:c[0],selectedScores:c[1]}}var _v=N({nonMaxSuppressionWithScore_:DP});async function RP(r,e,t,o=.5,n=Number.NEGATIVE_INFINITY,s=0){let a=v(r,"boxes","nonMaxSuppressionAsync"),i=v(e,"scores","nonMaxSuppressionAsync"),p=Pr(a,i,t,o,n,s);t=p.maxOutputSize,o=p.iouThreshold,n=p.scoreThreshold,s=p.softNmsSigma;let l=await Promise.all([a.data(),i.data()]),u=l[0],c=l[1],{selectedIndices:m,selectedScores:d}=Dc(u,c,t,o,n,s);return a!==r&&a.dispose(),i!==e&&i.dispose(),{selectedIndices:Ot(m,"int32"),selectedScores:Ot(d)}}var vv=RP;function OP(r,e,t,o=.5,n=Number.NEGATIVE_INFINITY,s=!1){let a=v(r,"boxes","nonMaxSuppression"),i=v(e,"scores","nonMaxSuppression"),p=Pr(a,i,t,o,n,null),l=p.maxOutputSize,u=p.iouThreshold,c=p.scoreThreshold,m={boxes:a,scores:i},d={maxOutputSize:l,iouThreshold:u,scoreThreshold:c,padToMaxOutputSize:s},f=k.runKernel(wi,m,d);return{selectedIndices:f[0],validOutputs:f[1]}}var Tv=N({nonMaxSuppressionPadded_:OP});async function PP(r,e,t,o=.5,n=Number.NEGATIVE_INFINITY,s=!1){let a=v(r,"boxes","nonMaxSuppressionAsync"),i=v(e,"scores","nonMaxSuppressionAsync"),p=Pr(a,i,t,o,n,null),l=p.maxOutputSize,u=p.iouThreshold,c=p.scoreThreshold,[m,d]=await Promise.all([a.data(),i.data()]),{selectedIndices:f,validOutputs:g}=Fc(m,d,l,u,c,s);return a!==r&&a.dispose(),i!==e&&i.dispose(),{selectedIndices:Ot(f,"int32"),validOutputs:_e(g,"int32")}}var wv=PP;function MP(r,e,t=!1,o=!1){let n=v(r,"images","resizeBilinear");E(n.rank===3||n.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${n.rank}.`),E(e.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${e}.`),E(o===!1||t===!1,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let s=n,a=!1;n.rank===3&&(a=!0,s=z(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let[]=e,i={images:s},p={alignCorners:t,halfPixelCenters:o,size:e},l=k.runKernel(Li,i,p);return a?z(l,[l.shape[1],l.shape[2],l.shape[3]]):l}var Cv=N({resizeBilinear_:MP});function LP(r,e,t=!1,o=!1){let n=v(r,"images","resizeNearestNeighbor");E(n.rank===3||n.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${n.rank}.`),E(e.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${e}.`),E(n.dtype==="float32"||n.dtype==="int32",()=>"`images` must have `int32` or `float32` as dtype"),E(o===!1||t===!1,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let s=n,a=!1;n.rank===3&&(a=!0,s=z(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let[]=e,i={images:s},p={alignCorners:t,halfPixelCenters:o,size:e},l=k.runKernel(Mi,i,p);return a?z(l,[l.shape[1],l.shape[2],l.shape[3]]):l}var Sv=N({resizeNearestNeighbor_:LP});function VP(r,e="binary",t=!1,o=.5){let n=v(r,"image","threshold"),s=.2989,a=.587,i=.114,p=n.shape[0]*n.shape[1],l=se(Ot([o]),255),u,c,m,d;if(E(n.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${n.rank}.`),E(n.shape[2]===3||n.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${n.shape[2]}.`),E(n.dtype==="int32"||n.dtype==="float32",()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${n.dtype}.`),E(e==="otsu"||e==="binary",()=>`Method must be binary or otsu, but was ${e}`),n.shape[2]===3){[u,c,m]=Mo(n,[1,1,1],-1);let h=se(u,s),x=se(c,a),b=se(m,i);d=fe(fe(h,x),b)}else d=r;if(e==="otsu"){let h=Ku(Re(_c(d),"int32"),Zt([]),256);l=BP(h,p)}let f=t?wp(d,l):Ws(d,l);return Re(se(f,255),"int32")}function BP(r,e){let t=Ot([-1]),o=Ot([0]),n=Ot([0]),s,a,i,p,l,u;for(let c=0;c<r.size-1;c++){s=De(r,0,c+1),a=De(r,c+1),l=Fe(ze(s),e),u=Fe(ze(a),e);let m=ze(se(s,ln(0,s.size)));i=Fe(m,ze(s));let d=co(a.shape,s.size),f=fe(ln(0,a.size),d),g=se(a,f);p=Fe(ze(g),ze(a));let h=ve(i,p),x=ve(i,p),b=se(l,u);n=se(se(b,h),x);let S=Ws(n,o);o=Nr(S,n,o),t=Nr(S,Ot([c]),t)}return t}var Nv=N({threshold_:VP});function zP(r,e,t="nearest",o="constant",n=0,s){let a=v(r,"image","transform","float32"),i=v(e,"transforms","transform","float32");E(a.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${a.rank}.`),E(i.rank===2&&(i.shape[0]===a.shape[0]||i.shape[0]===1)&&i.shape[1]===8,()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),E(s==null||s.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${s}.`);let p={image:a,transforms:i},l={interpolation:t,fillMode:o,fillValue:n,outputShape:s};return k.runKernel(sp,p,l)}var Iv=N({transform_:zP});function UP(r,e,t){let o=v(r,"a","bandPart");E(o.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${o.rank}.`);let n=o.shape,[s,a]=o.shape.slice(-2),i,p;typeof e=="number"?(E(e%1===0,()=>`bandPart(): numLower must be an integer, got ${e}.`),E(e<=s,()=>`bandPart(): numLower (${e}) must not be greater than the number of rows (${s}).`),i=v(e<0?s:e,"numLower","bandPart")):(E(e.dtype==="int32",()=>"bandPart(): numLower's dtype must be an int32."),i=Nr(Tl(e,0),s,qs(e,s))),typeof t=="number"?(E(t%1===0,()=>`bandPart(): numUpper must be an integer, got ${t}.`),E(t<=a,()=>`bandPart(): numUpper (${t}) must not be greater than the number of columns (${a}).`),p=v(t<0?a:t,"numUpper","bandPart")):(E(t.dtype==="int32",()=>"bandPart(): numUpper's dtype must be an int32."),p=Nr(Tl(t,0),a,qs(t,a)));let l=z(ln(0,s,1,"int32"),[-1,1]),u=ln(0,a,1,"int32"),c=ve(l,u),m=Gs(wp(c,i),tc(c,zt(p))),d=yr([s,a],o.dtype);return z(Jt(kr(z(o,[-1,s,a])).map(f=>Nr(m,f,d))),n)}var kv=N({bandPart_:UP});function WP(r){let e;if(Array.isArray(r)){e=!1,E(r!=null&&r.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");let n=r[0].shape[0];for(let s=1;s<r.length;++s)E(r[s].shape[0]===n,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${r[s].shape[0]} vs. ${n})`)}else e=!0,r=Mo(r,r.shape[0],0).map(n=>Ip(n,[0]));E(r.length<=r[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${r.length}) exceeds number of dimensions (${r[0].shape[0]}).`);let t=[],o=r;for(let n=0;n<r.length;++n)t.push(k.tidy(()=>{let s=o[n];if(n>0)for(let a=0;a<n;++a){let i=se(ze(se(t[a],s)),t[a]);s=ve(s,i)}return Fe(s,Us(s,"euclidean"))}));return e?Jt(t,0):t}var Ev=N({gramSchmidt_:WP});function GP(r,e=!1){if(E(r.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${r.rank}`),r.rank===2)return $v(r,e);{let t=r.shape.slice(0,r.shape.length-2).reduce((p,l)=>p*l),o=kr(z(r,[t,r.shape[r.shape.length-2],r.shape[r.shape.length-1]]),0),n=[],s=[];o.forEach(p=>{let[l,u]=$v(p,e);n.push(l),s.push(u)});let a=z(Jt(n,0),r.shape),i=z(Jt(s,0),r.shape);return[a,i]}}function $v(r,e=!1){return k.tidy(()=>{E(r.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${r.shape.length}D Tensor.`);let t=r.shape[0],o=r.shape[1],n=Zu(t),s=xr(r),a=cn([[1]],[1,1]),i=xr(a),p=t>=o?o:t;for(let l=0;l<p;++l){let u=s,c=i,m=n;[i,s,n]=k.tidy(()=>{let d=De(s,[l,l],[t-l,1]),f=Us(d),g=De(s,[l,l],[1,1]),h=Nr(Ws(g,0),cn([[-1]]),cn([[1]])),x=ve(g,se(h,f)),b=Fe(d,x);b.shape[0]===1?i=xr(a):i=ot([a,De(b,[1,0],[b.shape[0]-1,b.shape[1]])],0);let S=zt(Fe(Be(h,x),f)),C=De(s,[l,0],[t-l,o]),$=se(S,i),A=kc(i);if(l===0)s=ve(C,Be($,Be(A,C)));else{let M=ve(C,Be($,Be(A,C)));s=ot([De(s,[0,0],[l,o]),M],0)}let D=kc($),R=De(n,[0,l],[t,n.shape[1]-l]);if(l===0)n=ve(R,Be(Be(R,i),D));else{let M=ve(R,Be(Be(R,i),D));n=ot([De(n,[0,0],[t,l]),M],1)}return[i,s,n]}),gt([u,c,m])}return!e&&t>o&&(n=De(n,[0,0],[t,o]),s=De(s,[0,0],[o,o])),[n,s]})}var Av=N({qr_:GP});var xt;(function(r){r[r.NONE=0]="NONE",r[r.MEAN=1]="MEAN",r[r.SUM=2]="SUM",r[r.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(xt||(xt={}));function HP(r,e,t=xt.SUM_BY_NONZERO_WEIGHTS){let o=v(r,"losses","computeWeightedLoss"),n=null;e!=null&&(n=v(e,"weights","computeWeightedLoss"));let s=n==null?o:se(o,n);if(t===xt.NONE)return s;if(t===xt.SUM)return ze(s);if(t===xt.MEAN){if(n==null)return Hs(s);{let a=o.size/n.size,i=Fe(ze(s),ze(n));return a>1?Fe(i,_e(a)):i}}if(t===xt.SUM_BY_NONZERO_WEIGHTS){if(n==null)return Fe(ze(s),_e(o.size));{let a=se(n,ho(o.shape)),i=Re(ze(cc(a,_e(0))),"float32");return Fe(ze(s),i)}}throw Error(`Unknown reduction: ${t}`)}var Ut=N({computeWeightedLoss_:HP});function qP(r,e,t,o=xt.SUM_BY_NONZERO_WEIGHTS){let n=v(r,"labels","absoluteDifference"),s=v(e,"predictions","absoluteDifference"),a=null;t!=null&&(a=v(t,"weights","absoluteDifference")),ct(n.shape,s.shape,"Error in absoluteDifference: ");let i=Dt(ve(n,s));return Ut(i,a,o)}var Fv=N({absoluteDifference_:qP});function KP(r,e,t,o,n=xt.SUM_BY_NONZERO_WEIGHTS){let s=v(r,"labels","cosineDistance"),a=v(e,"predictions","cosineDistance"),i=null;o!=null&&(i=v(o,"weights","cosineDistance")),ct(s.shape,a.shape,"Error in cosineDistance: ");let p=_e(1),l=ve(p,ze(se(s,a),t,!0));return Ut(l,i,n)}var Dv=N({cosineDistance_:KP});function jP(r,e,t,o=xt.SUM_BY_NONZERO_WEIGHTS){let n=v(r,"labels","hingeLoss"),s=v(e,"predictions","hingeLoss"),a=null;t!=null&&(a=v(t,"weights","hingeLoss")),ct(n.shape,s.shape,"Error in hingeLoss: ");let i=_e(1);n=ve(se(_e(2),n),i);let p=un(ve(i,se(n,s)));return Ut(p,a,o)}var Rv=N({hingeLoss_:jP});function XP(r,e,t,o=1,n=xt.SUM_BY_NONZERO_WEIGHTS){let s=v(r,"labels","huberLoss"),a=v(e,"predictions","huberLoss"),i=null;t!=null&&(i=v(t,"weights","huberLoss")),ct(s.shape,a.shape,"Error in huberLoss: ");let p=_e(o),l=Dt(ve(a,s)),u=qs(l,p),c=ve(l,u),m=fe(se(_e(.5),Rt(u)),se(p,c));return Ut(m,i,n)}var Ov=N({huberLoss_:XP});function QP(r,e,t,o=1e-7,n=xt.SUM_BY_NONZERO_WEIGHTS){let s=v(r,"labels","logLoss"),a=v(e,"predictions","logLoss"),i=null;t!=null&&(i=v(t,"weights","logLoss")),ct(s.shape,a.shape,"Error in logLoss: ");let p=_e(1),l=_e(o),u=zt(se(s,Oo(fe(a,l)))),c=se(ve(p,s),Oo(fe(ve(p,a),l))),m=ve(u,c);return Ut(m,i,n)}var Pv=N({logLoss_:QP});function YP(r,e,t,o=xt.SUM_BY_NONZERO_WEIGHTS){let n=v(r,"labels","meanSquaredError"),s=v(e,"predictions","meanSquaredError"),a=null;t!=null&&(a=v(t,"weights","meanSquaredError")),ct(n.shape,s.shape,"Error in meanSquaredError: ");let i=wc(n,s);return Ut(i,a,o)}var Mv=N({meanSquaredError_:YP});function ZP(r,e){let t=v(r,"labels","sigmoidCrossEntropyWithLogits"),o=v(e,"logits","sigmoidCrossEntropyWithLogits");ct(t.shape,o.shape,"Error in sigmoidCrossEntropyWithLogits: ");let n=un(o),s=se(o,t),a=oc(Or(zt(Dt(o))));return fe(ve(n,s),a)}function JP(r,e,t,o=0,n=xt.SUM_BY_NONZERO_WEIGHTS){let s=v(r,"multiClassLabels","sigmoidCrossEntropy"),a=v(e,"logits","sigmoidCrossEntropy"),i=null;if(t!=null&&(i=v(t,"weights","sigmoidCrossEntropy")),ct(s.shape,a.shape,"Error in sigmoidCrossEntropy: "),o>0){let l=_e(o),u=_e(1),c=_e(.5);s=fe(se(s,ve(u,l)),se(c,l))}let p=ZP(s,a);return Ut(p,i,n)}var Lv=N({sigmoidCrossEntropy_:JP});function eM(r,e,t=-1){if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${e.rank} and dim was ${t}`);return ar((n,s,a)=>{let p=sc(s,[t],!0),l=ve(Re(s,"float32"),p);a([n,l]);let u=zt(se(l,n));return{value:ze(u,[t]),gradFunc:(d,f)=>{let[g,h]=f,x=Do(d.shape,[t]);return[se(z(d,x),ve(Re(g,"float32"),Or(h))),se(z(d,x),ve(Or(h),Re(g,"float32")))]}}})(r,e)}function tM(r,e,t,o=0,n=xt.SUM_BY_NONZERO_WEIGHTS){let s=v(r,"onehotLabels","softmaxCrossEntropy"),a=v(e,"logits","softmaxCrossEntropy"),i=null;if(t!=null&&(i=v(t,"weights","softmaxCrossEntropy")),ct(s.shape,a.shape,"Error in softmaxCrossEntropy: "),o>0){let l=_e(o),u=_e(1),c=_e(s.shape[1]);s=fe(se(s,ve(u,l)),Fe(l,c))}let p=eM(s,a);return Ut(p,i,n)}var Vv=N({softmaxCrossEntropy_:tM});function rM(r,e,t,o){let n=v(r,"indices","sparseFillEmptyRows","int32"),s=v(e,"values","sparseFillEmptyRows"),a=v(t,"denseShape","sparseFillEmptyRows","int32"),i=v(o,"defaultValue","sparseFillEmptyRows",s.dtype);if(n.rank!==2)throw new Error(`Indices should be Tensor2D but received shape
        ${n.shape}`);if(s.rank!==1)throw new Error(`Values should be Tensor1D but received shape ${s.shape}`);if(a.rank!==1)throw new Error(`Dense shape should be Tensor1D but received shape ${a.shape}`);if(i.rank!==0)throw new Error(`Default value should be a scalar but received shape ${i.shape}`);let p={indices:n,values:s,denseShape:a,defaultValue:i},l=k.runKernel(Xi,p);return{outputIndices:l[0],outputValues:l[1],emptyRowIndicator:l[2],reverseIndexMap:l[3]}}var Bv=N({sparseFillEmptyRows_:rM});function oM(r,e,t){let o=v(r,"inputIndices","sparseReshape","int32"),n=v(e,"inputShape","sparseReshape","int32"),s=v(t,"newShape","sparseReshape","int32");if(o.rank!==2)throw new Error(`Input indices should be Tensor2D but received shape
        ${o.shape}`);if(n.rank!==1)throw new Error(`Input shape should be Tensor1D but received shape ${n.shape}`);if(s.rank!==1)throw new Error(`New shape should be Tensor1D but received shape ${s.shape}`);let a={inputIndices:o,inputShape:n,newShape:s},i=k.runKernel(Qi,a);return{outputIndices:i[0],outputShape:i[1]}}var zv=N({sparseReshape_:oM});function nM(r,e,t){let o=v(r,"data","sparseSegmentMean"),n=v(e,"indices","sparseSegmentMean","int32"),s=v(t,"segmentIds","sparseSegmentMean","int32");if(o.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
          ${n.shape}`);if(s.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
          ${s.shape}`);let a={data:o,indices:n,segmentIds:s};return k.runKernel(Yi,a)}var Uv=N({sparseSegmentMean_:nM});function sM(r,e,t){let o=v(r,"data","sparseSegmentSum"),n=v(e,"indices","sparseSegmentSum","int32"),s=v(t,"segmentIds","sparseSegmentSum","int32");if(o.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
         ${n.shape}`);if(s.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
         ${s.shape}`);let a={data:o,indices:n,segmentIds:s};return k.runKernel(Zi,a)}var Wv=N({sparseSegmentSum_:sM});function aM(r,e,t,o,n,s,a,i){let p=v(r,"data","stringNGrams","string");if(p.dtype!=="string")throw new Error("Data must be of datatype string");if(p.shape.length!==1)throw new Error(`Data must be a vector, saw: ${p.shape}`);let l=v(e,"dataSplits","stringNGrams");if(l.dtype!=="int32")throw new Error("Data splits must be of datatype int32");let u={separator:t,nGramWidths:o,leftPad:n,rightPad:s,padWidth:a,preserveShortSequences:i},c={data:p,dataSplits:l},m=k.runKernel(tp,c,u);return{nGrams:m[0],nGramsSplits:m[1]}}var Gv=N({stringNGrams_:aM});function iM(r,e,t=!0){let o=v(r,"input","stringSplit","string"),n=v(e,"delimiter","stringSplit","string");if(o.rank!==1)throw new Error(`Input should be Tensor1D but received shape ${o.shape}`);if(n.rank!==0)throw new Error(`Delimiter should be a scalar but received shape ${n.shape}`);let s={skipEmpty:t},a={input:o,delimiter:n},i=k.runKernel(rp,a,s);return{indices:i[0],values:i[1],shape:i[2]}}var Hv=N({stringSplit_:iM});function pM(r,e){let t=v(r,"input","stringToHashBucketFast","string"),o={numBuckets:e};if(e<=0)throw new Error("Number of buckets must be at least 1");let n={input:t};return k.runKernel(op,n,o)}var qv=N({stringToHashBucketFast_:pM});function lM(r,e,t,o=!0){let n=v(r,"input","staticRegexReplace","string"),s={pattern:e,rewrite:t,replaceGlobal:o};return k.runKernel(Cs,{x:n},s)}var Kv=N({staticRegexReplace_:lM});var uM={fft:Sp,ifft:Xs,rfft:Np,irfft:Tc},cM={hammingWindow:lv,hannWindow:Ec,frame:$c,stft:uv},mM={flipLeftRight:mv,grayscaleToRGB:dv,resizeNearestNeighbor:Sv,resizeBilinear:Cv,rgbToGrayscale:fv,rotateWithOffset:hv,cropAndResize:cv,nonMaxSuppression:gv,nonMaxSuppressionAsync:bv,nonMaxSuppressionWithScore:_v,nonMaxSuppressionWithScoreAsync:vv,nonMaxSuppressionPadded:Tv,nonMaxSuppressionPaddedAsync:wv,threshold:Nv,transform:Iv},dM={bandPart:kv,gramSchmidt:Ev,qr:Av},fM={absoluteDifference:Fv,computeWeightedLoss:Ut,cosineDistance:Dv,hingeLoss:Rv,huberLoss:Ov,logLoss:Pv,meanSquaredError:Mv,sigmoidCrossEntropy:Lv,softmaxCrossEntropy:Vv},hM={sparseFillEmptyRows:Bv,sparseReshape:zv,sparseSegmentMean:Uv,sparseSegmentSum:Wv},gM={stringNGrams:Gv,stringSplit:Hv,stringToHashBucketFast:qv,staticRegexReplace:Kv};var xM=new Map,yM=new Map,Rc=class{getClassName(){return this.constructor.className}static fromConfig(e,t){return new e(t)}},Rh=class r{constructor(){this.classNameMap={}}static getMap(){return r.instance==null&&(r.instance=new r),r.instance}static register(e){r.getMap().classNameMap[e.className]=[e,e.fromConfig]}};function jv(r,e,t){E(r.className!=null,()=>"Class being registered does not have the static className property defined."),E(typeof r.className=="string",()=>"className is required to be a string, but got type "+typeof r.className),E(r.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),typeof e>"u"&&(e="Custom"),typeof t>"u"&&(t=r.className);let o=t,n=e+">"+o;return Rh.register(r),xM.set(n,r),yM.set(r,n),r}var ir=class extends Rc{minimize(e,t=!1,o){let{value:n,grads:s}=this.computeGradients(e,o);if(o!=null){let a=o.map(i=>({name:i.name,tensor:s[i.name]}));this.applyGradients(a)}else this.applyGradients(s);return gt(s),t?n:(n.dispose(),null)}get iterations(){return this.iterations_==null&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,t){return R_(e,t)}dispose(){this.iterations_!=null&&gt(this.iterations_)}async saveIterations(){return this.iterations_==null&&(this.iterations_=0),{name:"iter",tensor:_e(this.iterations_,"int32")}}async getWeights(){throw new Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(e){throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(e){return this.iterations_=(await e[0].tensor.data())[0],e.slice(1)}};Object.defineProperty(ir,Symbol.hasInstance,{value:r=>r.minimize!=null&&r.computeGradients!=null&&r.applyGradients!=null});var Oc=class extends ir{static get className(){return"Adadelta"}constructor(e,t,o=null){super(),this.learningRate=e,this.rho=t,this.epsilon=o,this.accumulatedGrads=[],this.accumulatedUpdates=[],o==null&&(this.epsilon=k.backend.epsilon())}applyGradients(e){(Array.isArray(e)?e.map(o=>o.name):Object.keys(e)).forEach((o,n)=>{let s=k.registeredVariables[o],a=!1;this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${o}/accum_grad`,variable:Se(()=>It(s).variable(a))}),this.accumulatedUpdates[n]==null&&(this.accumulatedUpdates[n]={originalName:`${o}/accum_var`,variable:Se(()=>It(s).variable(a))});let i=Array.isArray(e)?e[n].tensor:e[o];if(i==null)return;let p=this.accumulatedGrads[n].variable,l=this.accumulatedUpdates[n].variable;Se(()=>{let u=fe(se(p,this.rho),se(Rt(i),1-this.rho)),c=se(Fe(sr(fe(l,this.epsilon)),sr(fe(p,this.epsilon))),i),m=fe(se(l,this.rho),se(Rt(c),1-this.rho));p.assign(u),l.assign(m);let d=fe(se(c,-this.learningRate),s);s.assign(d)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(gt(this.accumulatedGrads.map(e=>e.variable)),gt(this.accumulatedUpdates.map(e=>e.variable)))}async getWeights(){let e=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(e.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=e.length/2,o=!1;this.accumulatedGrads=e.slice(0,t).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.accumulatedUpdates=e.slice(t,t*2).map(n=>({originalName:n.name,variable:n.tensor.variable(o)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.rho,t.epsilon)}};var Pc=class extends ir{static get className(){return"Adagrad"}constructor(e,t=.1){super(),this.learningRate=e,this.initialAccumulatorValue=t,this.accumulatedGrads=[]}applyGradients(e){(Array.isArray(e)?e.map(o=>o.name):Object.keys(e)).forEach((o,n)=>{let s=k.registeredVariables[o];this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${o}/accumulator`,variable:Se(()=>co(s.shape,this.initialAccumulatorValue).variable(!1))});let a=Array.isArray(e)?e[n].tensor:e[o];if(a==null)return;let i=this.accumulatedGrads[n].variable;Se(()=>{let p=fe(i,Rt(a));i.assign(p);let l=fe(se(Fe(a,sr(fe(p,k.backend.epsilon()))),-this.learningRate),s);s.assign(l)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&gt(this.accumulatedGrads.map(e=>e.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=!1;this.accumulatedGrads=e.map(o=>({originalName:o.name,variable:o.tensor.variable(t)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,t){return new e(t.learningRate,t.initialAccumulatorValue)}};var Mc=class extends ir{static get className(){return"Adam"}constructor(e,t,o,n=null){super(),this.learningRate=e,this.beta1=t,this.beta2=o,this.epsilon=n,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],Se(()=>{this.accBeta1=_e(t).variable(),this.accBeta2=_e(o).variable()}),n==null&&(this.epsilon=k.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(o=>o.name):Object.keys(e);Se(()=>{let o=ve(1,this.accBeta1),n=ve(1,this.accBeta2);t.forEach((s,a)=>{let i=k.registeredVariables[s],p=!1;this.accumulatedFirstMoment[a]==null&&(this.accumulatedFirstMoment[a]={originalName:`${s}/m`,variable:Se(()=>It(i).variable(p))}),this.accumulatedSecondMoment[a]==null&&(this.accumulatedSecondMoment[a]={originalName:`${s}/v`,variable:Se(()=>It(i).variable(p))});let l=Array.isArray(e)?e[a].tensor:e[s];if(l==null)return;let u=this.accumulatedFirstMoment[a].variable,c=this.accumulatedSecondMoment[a].variable,m=fe(se(u,this.beta1),se(l,1-this.beta1)),d=fe(se(c,this.beta2),se(Rt(l),1-this.beta2)),f=Fe(m,o),g=Fe(d,n);u.assign(m),c.assign(d);let h=fe(se(Fe(f,fe(sr(g),this.epsilon)),-this.learningRate),i);i.assign(h)}),this.accBeta1.assign(se(this.accBeta1,this.beta1)),this.accBeta2.assign(se(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&gt(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedSecondMoment!=null&&gt(this.accumulatedSecondMoment.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(e.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(e){e=await this.extractIterations(e),Se(()=>{this.accBeta1.assign(Ro(this.beta1,this.iterations_+1)),this.accBeta2.assign(Ro(this.beta2,this.iterations_+1))});let t=e.length/2,o=!1;this.accumulatedFirstMoment=e.slice(0,t).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.accumulatedSecondMoment=e.slice(t,t*2).map(n=>({originalName:n.name,variable:n.tensor.variable(o)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)}};var Lc=class extends ir{static get className(){return"Adamax"}constructor(e,t,o,n=null,s=0){super(),this.learningRate=e,this.beta1=t,this.beta2=o,this.epsilon=n,this.decay=s,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],Se(()=>{this.iteration=_e(0).variable(),this.accBeta1=_e(t).variable()}),n==null&&(this.epsilon=k.backend.epsilon())}applyGradients(e){let t=Array.isArray(e)?e.map(o=>o.name):Object.keys(e);Se(()=>{let o=ve(1,this.accBeta1),n=Fe(-this.learningRate,fe(se(this.iteration,this.decay),1));t.forEach((s,a)=>{let i=k.registeredVariables[s],p=!1;this.accumulatedFirstMoment[a]==null&&(this.accumulatedFirstMoment[a]={originalName:`${s}/m`,variable:It(i).variable(p)}),this.accumulatedWeightedInfNorm[a]==null&&(this.accumulatedWeightedInfNorm[a]={originalName:`${s}/v`,variable:It(i).variable(p)});let l=Array.isArray(e)?e[a].tensor:e[s];if(l==null)return;let u=this.accumulatedFirstMoment[a].variable,c=this.accumulatedWeightedInfNorm[a].variable,m=fe(se(u,this.beta1),se(l,1-this.beta1)),d=se(c,this.beta2),f=Dt(l),g=uc(d,f);u.assign(m),c.assign(g);let h=fe(se(Fe(n,o),Fe(m,fe(g,this.epsilon))),i);i.assign(h)}),this.iteration.assign(fe(this.iteration,1)),this.accBeta1.assign(se(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&gt(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedWeightedInfNorm!=null&&gt(this.accumulatedWeightedInfNorm.map(e=>e.variable))}async getWeights(){throw new Error("getWeights() is not implemented for Adamax yet.")}async setWeights(e){throw new Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)}};var kp=class extends ir{static get className(){return"SGD"}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){(Array.isArray(e)?e.map(o=>o.name):Object.keys(e)).forEach((o,n)=>{let s=Array.isArray(e)?e[n].tensor:e[o];if(s==null)return;let a=k.registeredVariables[o];Se(()=>{let i=fe(se(this.c,s),a);a.assign(i)})}),this.incrementIterations()}setLearningRate(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=nr(_e(-e))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(e){if(e=await this.extractIterations(e),e.length!==0)throw new Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,t){return new e(t.learningRate)}};var Vc=class extends kp{static get className(){return"Momentum"}constructor(e,t,o=!1){super(e),this.learningRate=e,this.momentum=t,this.useNesterov=o,this.accumulations=[],this.m=_e(this.momentum)}applyGradients(e){(Array.isArray(e)?e.map(o=>o.name):Object.keys(e)).forEach((o,n)=>{let s=k.registeredVariables[o];this.accumulations[n]==null&&(this.accumulations[n]={originalName:`${o}/momentum`,variable:Se(()=>It(s).variable(!1))});let a=this.accumulations[n].variable,i=Array.isArray(e)?e[n].tensor:e[o];i!=null&&Se(()=>{let p,l=fe(se(this.m,a),i);this.useNesterov?p=fe(se(this.c,fe(i,se(l,this.m))),s):p=fe(se(this.c,l),s),a.assign(l),s.assign(p)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&gt(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=!1;this.accumulations=e.map(o=>({originalName:o.name,variable:o.tensor.variable(t)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)}};var Bc=class extends ir{static get className(){return"RMSProp"}constructor(e,t=.9,o=0,n=null,s=!1){if(super(),this.learningRate=e,this.decay=t,this.momentum=o,this.epsilon=n,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=s,n==null&&(this.epsilon=k.backend.epsilon()),e==null)throw new Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(e){(Array.isArray(e)?e.map(o=>o.name):Object.keys(e)).forEach((o,n)=>{let s=k.registeredVariables[o],a=!1;this.accumulatedMeanSquares[n]==null&&(this.accumulatedMeanSquares[n]={originalName:`${o}/rms`,variable:Se(()=>It(s).variable(a))}),this.accumulatedMoments[n]==null&&(this.accumulatedMoments[n]={originalName:`${o}/momentum`,variable:Se(()=>It(s).variable(a))}),this.accumulatedMeanGrads[n]==null&&this.centered&&(this.accumulatedMeanGrads[n]={originalName:`${o}/mg`,variable:Se(()=>It(s).variable(a))});let i=Array.isArray(e)?e[n].tensor:e[o];if(i==null)return;let p=this.accumulatedMeanSquares[n].variable,l=this.accumulatedMoments[n].variable;Se(()=>{let u=fe(se(p,this.decay),se(Rt(i),1-this.decay));if(this.centered){let c=this.accumulatedMeanGrads[n].variable,m=fe(se(c,this.decay),se(i,1-this.decay)),d=Fe(se(i,this.learningRate),sr(ve(u,fe(Rt(m),this.epsilon)))),f=fe(se(l,this.momentum),d);p.assign(u),c.assign(m),l.assign(f);let g=ve(s,f);s.assign(g)}else{let c=fe(se(p,this.decay),se(Rt(i),1-this.decay)),m=fe(se(l,this.momentum),Fe(se(i,this.learningRate),sr(fe(c,this.epsilon))));p.assign(c),l.assign(m);let d=ve(s,m);s.assign(d)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&gt(this.accumulatedMeanSquares.map(e=>e.variable)),this.accumulatedMeanGrads!=null&&this.centered&&gt(this.accumulatedMeanGrads.map(e=>e.variable)),this.accumulatedMoments!=null&&gt(this.accumulatedMoments.map(e=>e.variable))}async getWeights(){let e=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&e.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(e.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(e){e=await this.extractIterations(e);let t=this.centered?e.length/3:e.length/2,o=!1;this.accumulatedMeanSquares=e.slice(0,t).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.accumulatedMoments=e.slice(t,t*2).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.centered&&(this.accumulatedMeanGrads=e.slice(t*2,t*3).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)}};var bM=[Oc,Pc,Mc,Lc,Vc,Bc,kp];function Xv(){for(let r of bM)jv(r)}var ea={};je(ea,{CompositeArrayBuffer:()=>Bt,browserFiles:()=>Yv,browserHTTPRequest:()=>tT,concatenateArrayBuffers:()=>hb,copyModel:()=>Eb,decodeWeights:()=>Mu,decodeWeightsStream:()=>Lu,encodeWeights:()=>cb,fromMemory:()=>rT,fromMemorySync:()=>Bh,getLoadHandlers:()=>bb,getModelArtifactsForJSON:()=>yp,getModelArtifactsForJSONSync:()=>dh,getModelArtifactsInfoForJSON:()=>so,getSaveHandlers:()=>yb,getWeightSpecs:()=>xl,http:()=>Uc,isHTTPScheme:()=>zc,listModels:()=>Ib,loadWeights:()=>Jv,moveModel:()=>$b,registerLoadRouter:()=>xb,registerSaveRouter:()=>gb,removeModel:()=>kb,weightsLoaderFactory:()=>Lh,withSaveHandler:()=>oT,withSaveHandlerSync:()=>nT});var _M="model",vM=".json",TM=".weights.bin";function Qv(r){return new Promise(e=>setTimeout(e)).then(r)}var Ep=class r{constructor(e){if(!P().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(r.URL_SCHEME)&&(e=e.slice(r.URL_SCHEME.length)),(e==null||e.length===0)&&(e=_M),this.modelJsonFileName=e+vM,this.weightDataFileName=e+TM}async save(e){if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");let t=Bt.join(e.weightData),o=window.URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{let n=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],s=Vu(e,n),a=window.URL.createObjectURL(new Blob([JSON.stringify(s)],{type:"application/json"})),i=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(i.download=this.modelJsonFileName,i.href=a,await Qv(()=>i.dispatchEvent(new MouseEvent("click"))),e.weightData!=null){let p=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;p.download=this.weightDataFileName,p.href=o,await Qv(()=>p.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:so(e)}}}};Ep.URL_SCHEME="downloads://";var Oh=class{constructor(e){if(e==null||e.length<1)throw new Error(`When calling browserFiles, at least 1 file is required, but received ${e}`);this.jsonFile=e[0],this.weightsFiles=e.slice(1)}async load(){return new Promise((e,t)=>{let o=new FileReader;o.onload=n=>{let s=JSON.parse(n.target.result),a=s.modelTopology;if(a==null){t(new Error(`modelTopology field is missing from file ${this.jsonFile.name}`));return}if(s.weightsManifest==null){t(new Error(`weightManifest field is missing from file ${this.jsonFile.name}`));return}if(this.weightsFiles.length===0){e({modelTopology:a});return}let p=yp(s,l=>this.loadWeights(l));e(p)},o.onerror=n=>t(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),o.readAsText(this.jsonFile)})}loadWeights(e){let t=[],o=[];for(let a of e)t.push(...a.weights),o.push(...a.paths);let n=this.checkManifestAndWeightFiles(e),s=o.map(a=>this.loadWeightsFile(a,n[a]));return Promise.all(s).then(a=>[t,a])}loadWeightsFile(e,t){return new Promise((o,n)=>{let s=new FileReader;s.onload=a=>{let i=a.target.result;o(i)},s.onerror=a=>n(`Failed to weights data from file of path '${e}'.`),s.readAsArrayBuffer(t)})}checkManifestAndWeightFiles(e){let t=[],o=this.weightsFiles.map(s=>mh(s.name)),n={};for(let s of e)s.paths.forEach(a=>{let i=mh(a);if(t.indexOf(i)!==-1)throw new Error(`Duplicate file basename found in weights manifest: '${i}'`);if(t.push(i),o.indexOf(i)===-1)throw new Error(`Weight file with basename '${i}' is not provided.`);n[a]=this.weightsFiles[o.indexOf(i)]});if(t.length!==this.weightsFiles.length)throw new Error(`Mismatch in the number of files in weights manifest (${t.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return n}},wM=r=>P().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(Ep.URL_SCHEME)?CM(r.slice(Ep.URL_SCHEME.length)):null;Et.registerSaveRouter(wM);function CM(r="model"){return new Ep(r)}function Yv(r){return new Oh(r)}function Ph(r,e,t,o){a(r),t=t??0,o=o??1,i(t,o);let n=0,s=p=>(p.then(l=>{let u=t+ ++n/r.length*(o-t);return e(u),l}),p);function a(p){E(p!=null&&Array.isArray(p)&&p.length>0,()=>"promises must be a none empty array")}function i(p,l){E(p>=0&&p<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${p}`),E(l>=0&&l<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${l}`),E(l>=p,()=>`startFraction must be no more than endFraction, but got startFraction ${p} and endFraction ${l}`)}return Promise.all(r.map(s))}async function Mh(r,e){e==null&&(e={});let t=e.fetchFunc==null?P().platform.fetch:e.fetchFunc,o=r.map(c=>t(c,e.requestInit,{isBinary:!0})),i=(e.onProgress==null?await Promise.all(o):await Ph(o,e.onProgress,0,.5)).map(c=>c.arrayBuffer());return e.onProgress==null?await Promise.all(i):await Ph(i,e.onProgress,.5,1)}function Zv(r,e){var t;let o=e.fetchFunc==null?P().platform.fetch:e.fetchFunc,n=0,s;return(t=e.onProgress)===null||t===void 0||t.call(e,0),new ReadableStream({pull:async a=>{for(var i;n<r.length;){s||(s=(await o(r[n],e.requestInit,{isBinary:!0})).body.getReader());let{done:p,value:l}=await s.read();if(p){n++,s=void 0,(i=e.onProgress)===null||i===void 0||i.call(e,n/r.length);continue}a.enqueue(l);return}a.close()}})}async function Jv(r,e="",t,o){return Lh(a=>Mh(a,{requestInit:o}))(r,e,t)}function Lh(r){return async(e,t="",o)=>{let n=e.map(()=>!1),s={},a=o!=null?o.map(()=>!1):[],i=[];if(e.forEach((d,f)=>{let g=0;d.weights.forEach(h=>{let x="quantization"in h?h.quantization.dtype:h.dtype,b=Ao[x]*Ee(h.shape),S=()=>{n[f]=!0,s[f]==null&&(s[f]=[]),s[f].push({manifestEntry:h,groupOffset:g,sizeBytes:b})};o!=null?o.forEach((C,$)=>{C===h.name&&(S(),a[$]=!0)}):S(),i.push(h.name),g+=b})}),!a.every(d=>d)){let d=o.filter((f,g)=>!a[g]);throw new Error(`Could not find weights in manifest with names: ${d.join(", ")}. 
Manifest JSON has weights with names: ${i.join(", ")}.`)}let p=n.reduce((d,f,g)=>(f&&d.push(g),d),[]),l=[];p.forEach(d=>{e[d].paths.forEach(f=>{let g=t+(t.endsWith("/")?"":"/")+f;l.push(g)})});let u=await r(l),c={},m=0;return p.forEach(d=>{let f=e[d].paths.length,g=new Bt(u.slice(m,m+f));s[d].forEach(x=>{let b=g.slice(x.groupOffset,x.groupOffset+x.sizeBytes),S=Mu(b,[x.manifestEntry]);for(let C in S)c[C]=S[C]}),m+=f}),c}}var SM="application/octet-stream",NM="application/json",Nl=class{constructor(e,t){if(this.DEFAULT_METHOD="POST",t==null&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,t.fetchFunc!=null?(E(typeof t.fetchFunc=="function",()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=t.fetchFunc):this.fetch=P().platform.fetch,E(e!=null&&e.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(e)&&E(e.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,t.requestInit!=null&&t.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{},this.loadOptions=t}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");let t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);t.body=new FormData;let o=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],n=Vu(e,o);if(t.body.append("model.json",new Blob([JSON.stringify(n)],{type:NM}),"model.json"),e.weightData!=null){let a=Bt.join(e.weightData);t.body.append("model.weights.bin",new Blob([a],{type:SM}),"model.weights.bin")}let s=await this.fetch(this.path,t);if(s.ok)return{modelArtifactsInfo:so(e),responses:[s]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${s.status}.`)}async loadModelJSON(){let e=await this.fetch(this.path,this.requestInit);if(!e.ok)throw new Error(`Request to ${this.path} failed with status code ${e.status}. Please verify this URL points to the model JSON of the model to load.`);let t;try{t=await e.json()}catch{let a=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?a+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":a+=" Please make sure the server is serving valid JSON for this request.",new Error(a)}let o=t.modelTopology,n=t.weightsManifest;if(o==null&&n==null)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return t}async load(){if(this.loadOptions.streamWeights)return this.loadStream();let e=await this.loadModelJSON();return yp(e,t=>this.loadWeights(t))}async loadStream(){let e=await this.loadModelJSON(),t=await this.getWeightUrls(e.weightsManifest),o=xl(e.weightsManifest),n=()=>Zv(t,this.loadOptions);return Object.assign(Object.assign({},e),{weightSpecs:o,getWeightStream:n})}async getWeightUrls(e){let t=Array.isArray(this.path)?this.path[1]:this.path,[o,n]=IM(t),s=this.weightPathPrefix||o,a=[],i=[];for(let p of e)for(let l of p.paths)this.weightUrlConverter!=null?i.push(this.weightUrlConverter(l)):a.push(s+l+n);return this.weightUrlConverter&&a.push(...await Promise.all(i)),a}async loadWeights(e){let t=await this.getWeightUrls(e),o=xl(e),n=await Mh(t,this.loadOptions);return[o,n]}};Nl.URL_SCHEME_REGEX=/^https?:\/\//;function IM(r){let e=r.lastIndexOf("/"),t=r.lastIndexOf("?"),o=r.substring(0,e),n=t>e?r.substring(t):"";return[o+"/",n]}function zc(r){return r.match(Nl.URL_SCHEME_REGEX)!=null}var eT=(r,e)=>{if(typeof fetch>"u"&&(e==null||e.fetchFunc==null))return null;{let t=!0;if(Array.isArray(r)?t=r.every(o=>zc(o)):t=zc(r),t)return Uc(r,e)}return null};Et.registerSaveRouter(eT);Et.registerLoadRouter(eT);function Uc(r,e){return new Nl(r,e)}function tT(r,e){return Uc(r,e)}var Il=class{constructor(e){this.modelArtifacts=e}load(){return this.modelArtifacts}},Wc=class{constructor(e){this.saveHandler=e}save(e){return this.saveHandler(e)}},Vh=class{constructor(e){e.load&&(this.load=()=>Promise.resolve(e.load())),e.save&&(this.save=t=>Promise.resolve(e.save(t)))}};function rT(r,e,t,o){let n=arguments;return new Vh(Bh(...n))}function Bh(r,e,t,o){return arguments.length===1?r.modelTopology!=null||r.weightSpecs!=null?new Il(r):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Il({modelTopology:r})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Il({modelTopology:r,weightSpecs:e,weightData:t,trainingConfig:o}))}function oT(r){return new Wc(r)}function nT(r){return new Wc(r)}var Gc={};je(Gc,{draw:()=>OM,fromPixels:()=>PM,fromPixelsAsync:()=>FM,toPixels:()=>RM});var ta,sT=!1;function aT(r,e=3){if(e>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(r==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let t=!1,o=!1,n=!1,s=!1,a=!1,i=!1;if(r.data instanceof Uint8Array)t=!0;else if(typeof ImageData<"u"&&r instanceof ImageData)o=!0;else if(typeof HTMLVideoElement<"u"&&r instanceof HTMLVideoElement)n=!0;else if(typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement)s=!0;else if(r.getContext!=null)a=!0;else if(typeof ImageBitmap<"u"&&r instanceof ImageBitmap)i=!0;else throw new Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${r.constructor.name}`);if(cp(cl,k.backendName)!=null){let f={pixels:r},g={numChannels:e};return k.runKernel(cl,f,g)}let[l,u]=n?[r.videoWidth,r.videoHeight]:[r.width,r.height],c;if(a)c=r.getContext("2d").getImageData(0,0,l,u).data;else if(o||t)c=r.data;else if(s||n||i){if(ta==null)if(typeof document>"u")if(typeof OffscreenCanvas<"u"&&typeof OffscreenCanvasRenderingContext2D<"u")ta=new OffscreenCanvas(1,1).getContext("2d");else throw new Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.");else ta=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});ta.canvas.width=l,ta.canvas.height=u,ta.drawImage(r,0,0,l,u),c=ta.getImageData(0,0,l,u).data}let m;if(e===4)m=new Int32Array(c);else{let f=l*u;m=new Int32Array(f*e);for(let g=0;g<f;g++)for(let h=0;h<e;++h)m[g*e+h]=c[g*4+h]}return Sc(m,[u,l,e],"int32")}function kM(r){return r!=null&&r.data instanceof Uint8Array}function EM(){return typeof window<"u"&&typeof ImageBitmap<"u"&&window.hasOwnProperty("createImageBitmap")}function $M(r){return r!=null&&r.width!==0&&r.height!==0}function AM(r){return EM()&&!(r instanceof ImageBitmap)&&$M(r)&&!kM(r)}async function FM(r,e=3){let t=null;if(P().getBool("WRAP_TO_IMAGEBITMAP")&&AM(r)){let o;try{o=await createImageBitmap(r,{premultiplyAlpha:"none"})}catch{o=null}o!=null&&o.width===r.width&&o.height===r.height?t=o:t=r}else t=r;return aT(t,e)}function iT(r){if(r.rank!==2&&r.rank!==3)throw new Error(`toPixels only supports rank 2 or 3 tensors, got rank ${r.rank}.`);let e=r.rank===2?1:r.shape[2];if(e>4||e===2)throw new Error(`toPixels only supports depth of size 1, 3 or 4 but got ${e}`);if(r.dtype!=="float32"&&r.dtype!=="int32")throw new Error(`Unsupported type for toPixels: ${r.dtype}. Please use float32 or int32 tensors.`)}function DM(r){let e=r?.alpha||1;if(e>1||e<0)throw new Error(`Alpha value ${e} is suppoed to be in range [0 - 1].`)}async function RM(r,e){let t=v(r,"img","toPixels");if(!(r instanceof rt)){let l=t;t=Re(l,"int32"),l.dispose()}iT(t);let[o,n]=t.shape.slice(0,2),s=t.rank===2?1:t.shape[2],a=await t.data(),i=t.dtype==="float32"?255:1,p=new Uint8ClampedArray(n*o*4);for(let l=0;l<o*n;++l){let u=[0,0,0,255];for(let m=0;m<s;m++){let d=a[l*s+m];if(t.dtype==="float32"){if(d<0||d>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${d}.`)}else if(t.dtype==="int32"&&(d<0||d>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${d}.`);s===1?(u[0]=d*i,u[1]=d*i,u[2]=d*i):u[m]=d*i}let c=l*4;p[c+0]=Math.round(u[0]),p[c+1]=Math.round(u[1]),p[c+2]=Math.round(u[2]),p[c+3]=Math.round(u[3])}if(e!=null){sT||cp(ul,k.backendName)!=null&&(console.warn("tf.browser.toPixels is not efficient to draw tensor on canvas. Please try tf.browser.draw instead."),sT=!0),e.width=n,e.height=o;let l=e.getContext("2d"),u=new ImageData(p,n,o);l.putImageData(u,0,0)}return t!==r&&t.dispose(),p}function OM(r,e,t){let o=v(r,"img","draw");if(!(r instanceof rt)){let a=o;o=Re(a,"int32"),a.dispose()}iT(o),DM(t?.imageOptions);let n={image:o},s={canvas:e,options:t};k.runKernel(ul,n,s)}var PM=N({fromPixels_:aT});function MM(r,e){let t=r.shape.length,o=e.shape.length;if(t<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${t}.`);if(o<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${o}.`);if(e.dtype!=="int32")throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${e.dtype}.`);if(e.shape[o-1]>t)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${e.shape[o-1]} vs. ${t}`);if(Ee(r.shape)===0)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${r.shape}.`);let n=e.shape,s=n[n.length-1],a=1;for(let c=0;c<n.length-1;++c)a*=n[c];let i=r.shape,p=n.slice();p.pop();let l=1;for(let c=s;c<t;++c)l*=i[c],p.push(i[c]);let u=[...no(r.shape).map(c=>c/l),1].slice(0,s);return[p,a,l,u]}var $t={};je($t,{assertParamsValid:()=>VM,computeFlatOffset:()=>GM,computeOutShape:()=>zM,getNormalizedAxes:()=>UM,isSliceContinous:()=>WM,maskToAxes:()=>BM,parseSliceParams:()=>HM,sliceInfo:()=>qM,startForAxis:()=>hT,startIndicesWithElidedDims:()=>mT,stopForAxis:()=>gT,stopIndicesWithElidedDims:()=>dT,stridesForAxis:()=>fT,stridesWithElidedDims:()=>lT});var zh=-2,LM=-1;function VM(r,e,t){let o=r.shape.length;E(o===e.length,()=>`Error in slice${o}D: Length of begin ${e} must match the rank of the array (${o}).`),E(o===t.length,()=>`Error in slice${o}D: Length of size ${t} must match the rank of the array (${o}).`);for(let n=0;n<o;++n)E(e[n]+t[n]<=r.shape[n],()=>`Error in slice${o}D: begin[${n}] + size[${n}] (${e[n]+t[n]}) would overflow input.shape[${n}] (${r.shape[n]})`)}function BM(r){let e=[],t=0;for(;r>0;)r&1&&e.push(t),r/=2,t++;return e}function zM(r,e,t){let o=[];for(let n=0;n<r.length;n++)o[n]=Math.ceil((e[n]-r[n])/t[n]);return o}function lT(r,e,t,o){let n=[...r];for(let s=n.length;s<o.length;s++)n.push(1);for(let s=0;s<t;s++)s===0?n[e]=1:(n.splice(e,0,1),n.pop());return n}function uT(r,e,t){return t<=r?t:t-(e-1)}function cT(r,e){let t=[];for(let o=0;o<r;o++)t.push(e+o);return t}function UM(r,e,t,o,n,s,a,i,p){let l=r.length,u=new Array(l),c=new Array(l),m=new Array(l);if(e.length&&t>0){let d=e[0],f=t+1;u=mT(a,d,f,o,r),c=dT(i,d,f,n,r),m=lT(s,d,f,r)}else for(let d=0;d<l;d++)u[d]=hT(a,o,s,r,d,p),c[d]=gT(i,n,s,r,d,p),m[d]=fT(s,d,p);return{begin:u,end:c,strides:m}}function mT(r,e,t,o,n){let s=[...n],a=cT(t,e);for(let i=0;i<s.length;i++)if(a.indexOf(i)>-1)s[i]=0;else{let p=uT(e,t,i),l=o[p];r&1<<p&&(l=0),s[i]=l}return s}function dT(r,e,t,o,n){let s=[...n],a=cT(t,e);for(let i=0;i<s.length;i++)if(a.indexOf(i)>-1)s[i]=Number.MAX_SAFE_INTEGER;else{let p=uT(e,t,i),l=o[p];r&1<<p&&(l=Number.MAX_SAFE_INTEGER),s[i]=l}for(let i=0;i<s.length;i++){let p=n[i];s[i]<0&&(s[i]+=p),s[i]=ya(0,s[i],n[i])}return s}function fT(r,e,t){let o=r[e];return(t&1<<e||o==null)&&(o=1),o}function hT(r,e,t,o,n,s){let a=e[n],i=t[n]||1;(r&1<<n||s&1<<n||a==null)&&(i>0?a=Number.MIN_SAFE_INTEGER:a=Number.MAX_SAFE_INTEGER);let p=o[n];return a<0&&(a+=p),a=ya(0,a,p-1),a}function gT(r,e,t,o,n,s){let a=e[n],i=t[n]||1;(r&1<<n||s&1<<n||a==null)&&(i>0?a=Number.MAX_SAFE_INTEGER:a=Number.MIN_SAFE_INTEGER);let p=o[n];return a<0&&(a+=p),i>0?a=ya(0,a,p):a=ya(-1,a,p-1),a}function WM(r,e,t){let o=t.length;for(let n=0;n<t.length;n++)if(t[n]>1){o=n;break}for(let n=o+1;n<t.length;n++)if(e[n]>0||t[n]!==r[n])return!1;return!0}function GM(r,e){let t=r.length>0?r[r.length-1]:1;for(let o=0;o<r.length-1;o++)t+=r[o]*e[o];return t}function HM(r,e,t){let o,n=r.shape.length;typeof e=="number"?o=[e,...new Array(n-1).fill(0)]:e.length<n?o=e.concat(new Array(n-e.length).fill(0)):o=e.slice(),o.forEach(a=>{E(a!==-1,()=>"slice() does not support negative begin indexing.")});let s;return t==null?s=new Array(n).fill(-1):typeof t=="number"?s=[t,...new Array(n-1).fill(-1)]:t.length<n?s=t.concat(new Array(n-t.length).fill(-1)):s=t,s=s.map((a,i)=>a>=0?a:(E(a===-1,()=>`Negative size values should be exactly -1 but got ${a} for the slice() size at index ${i}.`),r.shape[i]-o[i])),[o,s]}function qM(r,e,t,o,n,s,a,i,p){let l;if(o==null?(l=new Array(e.length),l.fill(1)):l=o,a!=null&&a&a-1)throw new Error("Multiple ellipses in slice is not allowed.");let u=!1,c={dims:l.length,numAddAxisAfterEllipsis:0,begin:e.slice(),end:t.slice(),strides:l.slice(),beginMask:n,endMask:s,ellipsisMask:a,newAxisMask:i,shrinkAxisMask:p};for(let S=0;S<c.dims;S++)u&&1<<S&i&&c.numAddAxisAfterEllipsis++,1<<S&a&&(u=!0);u||(c.ellipsisMask|=1<<c.dims,c.dims++);let m={dims:r.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};KM(c,m);let d=!0,f=!0,g=!0,h=[],x=[];for(let S=0;S<r.length;++S){if(m.strides[S]===0)throw Error(`strides[${S}] must be non-zero`);let C=!!(m.shrinkAxisMask&1<<S),$=r[S];if($===-1){h.push(C?1:-1);continue}let A=[m.beginMask&1<<S,m.endMask&1<<S],D=[m.strides[S]>0?0:-1,m.strides[S]>0?$:$-1];if(C&&m.strides[S]<=0)throw Error("only stride 1 allowed on non-range indexing.");g=g&&m.strides[S]===1;let R=!!(m.beginMask&1<<S&&m.endMask&1<<S);if(m.beginValid&&m.endValid){if(C){let W=m.begin[S]<0?$+m.begin[S]:m.begin[S];if(m.begin[S]=W,m.end[S]=m.begin[S]+1,W<0||W>=$)throw Error(`slice index ${m.begin[S]} of dimension ${S} out of bounds.`)}else m.begin[S]=pT(m.begin[S],0,m.strides[S],$,A,D),m.end[S]=pT(m.end[S],1,m.strides[S],$,A,D);let B=m.strides[S]===1&&m.begin[S]===0&&m.end[S]===$;d=d&&B,f=f&&(S===0&&m.strides[S]===1||B)}else d=d&&m.strides[S]===1&&R,f=f&&(S===0&&m.strides[S]===1||R);let M,L=!1;if(m.beginValid&&m.endValid?(M=m.end[S]-m.begin[S],L=!0):C?(M=1,L=!0):R&&$>=0&&(m.strides[S]<0?M=-$:M=$,L=!0),L){let B;M===0||M<0!=m.strides[S]<0?B=0:B=Math.trunc(M/m.strides[S])+(M%m.strides[S]!==0?1:0),h.push(B)}else h.push(-1)}for(let S=0;S<m.finalShapeGatherIndices.length;++S){let C=m.finalShapeGatherIndices[S];C>=0?x.push(h[C]):C===zh&&x.push(1)}return{finalShapeSparse:x.filter((S,C)=>m.finalShapeGatherIndices[C]!==zh),finalShape:x,isIdentity:d,sliceDim0:f,isSimpleSlice:g,begin:m.begin,end:m.end,strides:m.strides}}function KM(r,e){e.beginMask=0,e.endMask=0,e.shrinkAxisMask=0;let t=0;e.beginValid=r.begin!=null,e.endValid=r.end!=null,e.begin=new Array(e.dims),e.end=new Array(e.dims),e.strides=new Array(e.dims),e.finalShapeGatherIndices=[],e.finalShapeGatherIndicesSparse=[],e.inputShapeGatherIndicesSparse=new Array(e.dims);for(let o=0;o<r.dims;o++)if(1<<o&r.ellipsisMask){let n=Math.min(e.dims-(r.dims-o)+1+r.numAddAxisAfterEllipsis,e.dims);for(;t<n;t++)e.begin[t]=0,e.end[t]=0,e.strides[t]=1,e.beginMask|=1<<t,e.endMask|=1<<t,e.finalShapeGatherIndices.push(t),e.finalShapeGatherIndicesSparse.push(-1),e.inputShapeGatherIndicesSparse[t]=o}else if(1<<o&r.newAxisMask)e.finalShapeGatherIndices.push(zh),e.finalShapeGatherIndicesSparse.push(-1);else{if(t===e.begin.length)throw Error(`Index out of range using input dim ${t}; input has only ${e.dims} dims, ${e.begin.length}.`);r.begin!=null&&(e.begin[t]=r.begin[o]),r.end!=null&&(e.end[t]=r.end[o]),e.strides[t]=r.strides[o],r.beginMask&1<<o&&(e.beginMask|=1<<t),r.endMask&1<<o&&(e.endMask|=1<<t),r.shrinkAxisMask&1<<o?(e.finalShapeGatherIndices.push(LM),e.finalShapeGatherIndicesSparse.push(-1),e.shrinkAxisMask|=1<<t):(e.finalShapeGatherIndices.push(t),e.finalShapeGatherIndicesSparse.push(o)),e.inputShapeGatherIndicesSparse[t]=o,t++}}function pT(r,e,t,o,n,s){if(n[e])return t>0?s[e]:s[e+1&1];{let a=r<0?o+r:r;return a<s[0]?s[0]:a>s[1]?s[1]:a}}var jM=typeof requestAnimationFrame<"u"?requestAnimationFrame:typeof setImmediate<"u"?setImmediate:r=>r();function Uh(){return new Promise(r=>jM(()=>r()))}var I={};je(I,{ERF_A1:()=>cL,ERF_A2:()=>mL,ERF_A3:()=>dL,ERF_A4:()=>fL,ERF_A5:()=>hL,ERF_P:()=>uL,PARALLELIZE_THRESHOLD:()=>Hc,RowPartitionType:()=>xo,SELU_SCALE:()=>lL,SELU_SCALEALPHA:()=>pL,applyActivation:()=>Zs,assertAndGetBroadcastShape:()=>Ve,assertAxesAreInnerMostDims:()=>FD,assertParamsConsistent:()=>XM,assignToTypedArray:()=>vL,axesAreInnerMostDims:()=>wh,calculateShapes:()=>zO,checkEinsumDimSizes:()=>IL,checkPadOnDimRoundingMode:()=>_t,combineLocations:()=>S_,combineRaggedTensorToTensorShapes:()=>YM,complexWithEvenIndex:()=>yL,complexWithOddIndex:()=>bL,computeConv2DInfo:()=>zs,computeConv3DInfo:()=>Hb,computeDefaultPad:()=>Th,computeDilation2DInfo:()=>$F,computeOptimalWindowSize:()=>tL,computeOutAndReduceShapes:()=>AD,computeOutShape:()=>QM,computePool2DInfo:()=>vh,computePool3DInfo:()=>AF,convertConv2DDataFormat:()=>qb,decodeEinsumEquation:()=>SL,eitherStridesOrDilationsAreOne:()=>Xt,expandShapeToKeepDim:()=>Do,exponent:()=>wL,exponents:()=>TL,fromStringArrayToUint8:()=>jL,fromUint8ToStringArray:()=>KL,getAxesPermutation:()=>DD,getBroadcastDims:()=>__,getComplexWithIndex:()=>_L,getEinsumComputePath:()=>kL,getEinsumPermutation:()=>NL,getFusedBiasGradient:()=>Ys,getFusedDyActivation:()=>Qs,getImageCenter:()=>rL,getInnerMostAxes:()=>OD,getPermuted:()=>nL,getRaggedRank:()=>JM,getReductionAxes:()=>Xu,getReshaped:()=>oL,getReshapedPermuted:()=>sL,getRowPartitionTypesHelper:()=>ZM,getSliceBeginCoords:()=>aL,getSliceSize:()=>iL,getSparseFillEmptyRowsIndicesDenseShapeMismatch:()=>FL,getSparseFillEmptyRowsNegativeIndexErrorMessage:()=>DL,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:()=>RL,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:()=>ML,getSparseReshapeInputOutputMismatchErrorMessage:()=>VL,getSparseReshapeInputOutputMultipleErrorMessage:()=>LL,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:()=>OL,getSparseReshapeNegativeOutputDimErrorMessage:()=>PL,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:()=>WL,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:()=>BL,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:()=>zL,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:()=>UL,getUndoAxesPermutation:()=>RD,isIdentityPermutation:()=>EL,log:()=>wA,mergeRealAndImagArrays:()=>gL,prepareAndValidate:()=>MM,prepareSplitSize:()=>AL,segment_util:()=>Gh,shouldFuse:()=>Js,slice_util:()=>$t,splitRealAndImagArrays:()=>xL,stridesOrDilationsArePositive:()=>po,tupleValuesAreOne:()=>Bs,upcastType:()=>bt,validateDefaultValueShape:()=>eL,validateInput:()=>Cl,validateUpdateShape:()=>q1,warn:()=>Eo});function XM(r,e){let t=r[0].length;r.forEach((n,s)=>{E(n.length===t,()=>`Error in concat${t}D: rank of tensors[${s}] must be the same as the rank of the rest (${t})`)}),E(e>=0&&e<t,()=>`Error in concat${t}D: axis must be between 0 and ${t-1}.`);let o=r[0];r.forEach((n,s)=>{for(let a=0;a<t;a++)E(a===e||n[a]===o[a],()=>`Error in concat${t}D: Shape of tensors[${s}] (${n}) does not match the shape of the rest (${o}) along the non-concatenated axis ${s}.`)})}function QM(r,e){let t=r[0].slice();for(let o=1;o<r.length;o++)t[e]+=r[o][e];return t}var xo;(function(r){r[r.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",r[r.VALUE_ROWIDS=1]="VALUE_ROWIDS",r[r.ROW_LENGTHS=2]="ROW_LENGTHS",r[r.ROW_SPLITS=3]="ROW_SPLITS",r[r.ROW_LIMITS=4]="ROW_LIMITS",r[r.ROW_STARTS=5]="ROW_STARTS"})(xo||(xo={}));function YM(r,e,t){let o=new Array;if(t==null&&e==null)return o;if(e==null)for(;o.length<r+t.length;)o.push(-1);else o=e.slice();if(t==null)return o;if(r+t.length!==o.length)throw new Error(`rt input.shape and shape=${e} are incompatible: rt input.rank = ${r+t.length}, but shape.rank = ${o.length}`);for(let n=1;n<t.length;++n){let s=t[n],a=o[o.length-t.length+n],i=o[a];if(s>=0)if(i>=0){if(i!==s)throw new Error(`rt input.shape and shape=${e} are incompatible: rt input.shape[${n+r}] = ${s} but shape[${n+r}] = ${i}`)}else o[a]=s}return o}function ZM(r){let e={FIRST_DIM_SIZE:xo.FIRST_DIM_SIZE,VALUE_ROWIDS:xo.VALUE_ROWIDS,ROW_LENGTHS:xo.ROW_LENGTHS,ROW_SPLITS:xo.ROW_SPLITS,ROW_LIMITS:xo.ROW_LIMITS,ROW_STARTS:xo.ROW_STARTS},t=[];for(let o of r)if(o in e)t.push(e[o]);else break;return t}function JM(r){return r.length===0?0:r[0]===xo.FIRST_DIM_SIZE?r.length-1:r.length}function eL(r,e){if(r==null||e==null)return;let t=r.length,o=e.length;if(t>=o)throw new Error(`defaultValue.shape=${r} and ragged tensor flatValues.shape=${e}, are incompatible: defaultValue.rank = ${t} must be less than ragged tensor input flatValues.rank = ${o})`);for(let n=0;n<Math.min(t,o-1);++n){let s=r[n],a=e[n+1];if(s>=0&&a>=0&&s!==1&&s!==a)throw new Error(`defaultValue.shape=${r}, and ragged tensor input flatValues.shape=${e} are incompatible: defaultValue.shape[${n-r.length}] = ${s} but ragged tensor input.flatValues.shape[${n-r.length}] = ${a}`)}}var Hc=30;function tL(r){return r<=Hc?r:Ta(r,Math.floor(Math.sqrt(r)))}function rL(r,e,t){let o=t*(typeof r=="number"?r:r[0]),n=e*(typeof r=="number"?r:r[1]);return[o,n]}function oL(r,e,t,o=!0){let n=[];if(o)n=n.concat(e.slice(0)),n.push(r[0]/t),n=n.concat(r.slice(1));else{n=n.concat(r[0]);let s=e.length;for(let a=0;a<s;++a)n=n.concat([r[a+1]/e[a],e[a]]);n=n.concat(r.slice(s+1))}return n}function nL(r,e,t=!0){let o=[];if(t){o.push(e);for(let n=e+1;n<r;++n)n<=2*e?(o.push(n),o.push(n-(e+1))):o.push(n)}else{let n=[],s=[];for(let a=1;a<r;++a)a>=e*2+1||a%2===1?s.push(a):n.push(a);o.push(...n),o.push(0),o.push(...s)}return o}function sL(r,e,t,o=!0){let n=[];o?n.push(r[0]/t):n.push(r[0]*t);for(let s=1;s<r.length;++s)s<=e.length?o?n.push(e[s-1]*r[s]):n.push(r[s]/e[s-1]):n.push(r[s]);return n}function aL(r,e){let t=[0];for(let o=0;o<e;++o)t.push(r[o][0]);return t}function iL(r,e,t){let o=r.slice(0,1);for(let n=0;n<t;++n)o.push(r[n+1]-e[n][0]-e[n][1]);return o}var pL=1.7580993408473768,lL=1.0507009873554805;var uL=.3275911,cL=.254829592,mL=-.284496736,dL=1.421413741,fL=-1.453152027,hL=1.061405429;function gL(r,e){if(r.length!==e.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${r.length}, imag: ${e.length}.`);let t=new Float32Array(r.length*2);for(let o=0;o<t.length;o+=2)t[o]=r[o/2],t[o+1]=e[o/2];return t}function xL(r){let e=new Float32Array(r.length/2),t=new Float32Array(r.length/2);for(let o=0;o<r.length;o+=2)e[o/2]=r[o],t[o/2]=r[o+1];return{real:e,imag:t}}function yL(r){let e=Math.ceil(r.length/4),t=new Float32Array(e),o=new Float32Array(e);for(let n=0;n<r.length;n+=4)t[Math.floor(n/4)]=r[n],o[Math.floor(n/4)]=r[n+1];return{real:t,imag:o}}function bL(r){let e=Math.floor(r.length/4),t=new Float32Array(e),o=new Float32Array(e);for(let n=2;n<r.length;n+=4)t[Math.floor(n/4)]=r[n],o[Math.floor(n/4)]=r[n+1];return{real:t,imag:o}}function _L(r,e){let t=r[e*2],o=r[e*2+1];return{real:t,imag:o}}function vL(r,e,t,o){r[o*2]=e,r[o*2+1]=t}function TL(r,e){let t=new Float32Array(r/2),o=new Float32Array(r/2);for(let n=0;n<Math.ceil(r/2);n++){let s=(e?2:-2)*Math.PI*(n/r);t[n]=Math.cos(s),o[n]=Math.sin(s)}return{real:t,imag:o}}function wL(r,e,t){let o=(t?2:-2)*Math.PI*(r/e),n=Math.cos(o),s=Math.sin(o);return{real:n,imag:s}}var Wh="->",CL=/->/g,xT=",",yT="...";function SL(r,e){r=r.replace(/\s/g,"");let t=(r.length-r.replace(CL,"").length)/Wh.length;if(t<1)throw new Error("Equations without an arrow are not supported.");if(t>1)throw new Error(`Equation must contain exactly one arrow ("${Wh}").`);let[o,n]=r.split(Wh);E(o.indexOf(yT)===-1,()=>`The ellipsis notation ("${yT}") is not supported yet.`);let s=o.split(xT),a=s.length;if(e!==a)throw new Error(`Expected ${a} input tensors, received ${e}`);if(a>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");let i=[];for(let m=0;m<n.length;++m){let d=n[m];if(!s.some(f=>f.indexOf(d)!==-1))throw new Error(`Output subscripts contain the label ${d} not present in the input subscripts.`);i.indexOf(d)===-1&&i.push(d)}for(let m=0;m<o.length;++m){let d=o[m];i.indexOf(d)===-1&&d!==xT&&i.push(d)}let p=new Array(s.length);for(let m=0;m<a;++m){if(new Set(s[m].split("")).size!==s[m].length)throw new Error(`Found duplicate axes in input component ${s[m]}. Support for duplicate axes in input is not implemented yet.`);p[m]=[];for(let d=0;d<s[m].length;++d)p[m].push(i.indexOf(s[m][d]))}let l=i.length,u=n.length,c=[];for(let m=u;m<l;++m)c.push(m);return{allDims:i,summedDims:c,idDims:p}}function NL(r,e){let t=new Array(r);t.fill(-1);for(let n=0;n<e.length;++n)t[e[n]]=n;let o=[];for(let n=0;n<r;++n)t[n]===-1&&o.push(n);return t=t.filter(n=>n!==-1),{permutationIndices:t,expandDims:o}}function IL(r,e,t){let o=new Array(r);for(let n=0;n<t.length;++n){let s=t[n].shape;for(let a=0;a<e[n].length;++a)o[e[n][a]]===void 0?o[e[n][a]]=s[a]:E(o[e[n][a]]===s[a],()=>`Expected dimension ${o[e[n][a]]} at axis ${a} of input shaped ${JSON.stringify(s)}, but got dimension ${s[a]}`)}}function kL(r,e){let t=r,o=[],n=0;r.length===0&&t.push(-1),n=r.length+1;for(let a=0;a<n;++a)o.push([]);let s=[];for(let a=0;a<t.length;++a){let i=t[a],p=$L(e,i);for(let l of p)s.indexOf(l)===-1&&(o[a].push(l),s.push(l))}return{path:t,steps:o}}function EL(r){return r.every((e,t)=>e===t)}function $L(r,e){let t=[];for(let o=0;o<r.length;++o)(r[o].length===0||r[o].indexOf(e)!==-1||e===-1)&&t.push(o);return t}function AL(r,e,t=0){let o=[];if(typeof e=="number")E(r.shape[t]%e===0,()=>"Number of splits must evenly divide the axis."),o=new Array(e).fill(r.shape[t]/e);else{let n=e.reduce((a,i)=>(i===-1&&(a+=1),a),0);E(n<=1,()=>"There should be only one negative value in split array.");let s=e.indexOf(-1);if(s!==-1){let a=e.reduce((i,p)=>p>0?i+p:i);e[s]=r.shape[t]-a}E(r.shape[t]===e.reduce((a,i)=>a+i),()=>"The sum of sizes must match the size of the axis dimension."),o=e}return o}function FL(r){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${r}`}function DL(r,e){return`indices(${r}, 0) is invalid: ${e} < 0`}function RL(r,e,t){return`indices(${r}, 0) is invalid: ${e} >= ${t}`}function OL(r,e){return`only one output dimension may be -1, not both ${r} and ${e}`}function PL(r,e){return`size ${r} must be non-negative, not ${e}`}function ML(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function LL(r,e){let t=Ee(r),o=Ee(e);return`Input to reshape is a SparseTensor with ${t}
  dense values, but the requested shape requires a multiple of ${o}. inputShape=${r} outputShape= ${e}`}function VL(r,e){let t=Ee(r),o=Ee(e);return`Input to reshape is a tensor with ${t} dense values, but the requested shape has ${o}. inputShape=${r} outputShape=${e}`}function BL(){return"segment ids must be >= 0"}function zL(){return"segment ids are not increasing"}function UL(r,e){return`Segment id ${r} out of range [0, ${e}), possibly because segmentIds input is not sorted.`}function WL(r,e,t){return`Bad: indices[${r}] == ${e} out of range [0, ${t})`}var Gh={};je(Gh,{collectGatherOpShapeInfo:()=>qL,computeOutShape:()=>HL,segOpComputeOptimalWindowSize:()=>GL});function GL(r,e){let t=!1,o;for(r<=Hc?(o=r,t=!0):o=Ta(r,Math.floor(Math.sqrt(r)));!t;)o>e||o===r?t=!0:o=Ta(r,o+1);return o}function HL(r,e,t){let o=[],n=r.length;for(let s=0;s<n;s++)s!==e?o.push(r[s]):o.push(t);return o}function qL(r,e,t,o){let n=e.shape.length,s=r.shape.length;if(o!==0&&(o<-n||o>n))throw new Error(`Expect batchDims in the range of [-${n}, ${n}], but got ${o}`);if(o<0&&(o+=n),o>s)throw new Error(`batchDims (${o}) must be less than rank(x) (
    ${s}).`);if(t<o)throw new Error(`batchDims (${o}) must be less than or equal to axis (${t}).`);for(let c=0;c<o;++c)if(r.shape[c]!==e.shape[c])throw new Error(`x.shape[${c}]: ${r.shape[c]} should be equal to indices.shape[${c}]: ${e.shape[c]}.`);let a=r.shape[t],i=[],p=1,l=1,u=1;for(let c=0;c<o;++c)i.push(r.shape[c]),p*=r.shape[c];for(let c=o;c<t;c++)i.push(r.shape[c]),l*=r.shape[c];for(let c=o;c<n;c++)i.push(e.shape[c]);for(let c=t+1;c<s;c++)i.push(r.shape[c]),u*=r.shape[c];return{batchSize:p,sliceSize:u,outerSize:l,dimSize:a,outputShape:i}}function KL(r){try{return r.map(e=>gp(e))}catch(e){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${e}`)}}function jL(r){return r.map(e=>hp(e))}var Wt={};je(Wt,{nonMaxSuppressionV3Impl:()=>Ac,nonMaxSuppressionV4Impl:()=>Fc,nonMaxSuppressionV5Impl:()=>Dc,whereImpl:()=>Nc});Xv();var ra={},qc={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function bT(r,e){ra[r]=e}function br(r,e){if(!(r in ra)||e!=null){let o=QL(r,e);if(o!==null)ra[r]=o;else return console.log("Could not get context for WebGL version",r),null}let t=ra[r];return t==null||t.isContextLost()?(delete ra[r],br(r)):(t.disable(t.DEPTH_TEST),t.disable(t.STENCIL_TEST),t.disable(t.BLEND),t.disable(t.DITHER),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SAMPLE_COVERAGE),t.enable(t.SCISSOR_TEST),t.enable(t.CULL_FACE),t.cullFace(t.BACK),ra[r])}function XL(r){if(!P().getBool("IS_SAFARI")&&typeof OffscreenCanvas<"u"&&r===2)return new OffscreenCanvas(300,150);if(typeof document<"u")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}function QL(r,e){if(r!==1&&r!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");let t=e??XL(r);return t.addEventListener("webglcontextlost",o=>{o.preventDefault(),delete ra[r]},!1),P().getBool("SOFTWARE_WEBGL_ENABLED")&&(qc.failIfMajorPerformanceCaveat=!1),r===1?t.getContext("webgl",qc)||t.getContext("experimental-webgl",qc):t.getContext("webgl2",qc)}var mn;(function(r){r[r.DENSE=0]="DENSE",r[r.SHARED_BATCH=1]="SHARED_BATCH"})(mn||(mn={}));var Gt;(function(r){r[r.RENDER=0]="RENDER",r[r.UPLOAD=1]="UPLOAD",r[r.PIXELS=2]="PIXELS",r[r.DOWNLOAD=3]="DOWNLOAD"})(Gt||(Gt={}));var Pt;(function(r){r[r.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",r[r.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",r[r.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",r[r.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",r[r.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"})(Pt||(Pt={}));function oa(r,e){return[e,r]}function _T(r,e){return r*e}function kl(r){let e=y.sizeFromShape(r),t=Math.ceil(e/4);return y.sizeToSquarishShape(t)}function yo(r,e){return[Math.max(1,Math.ceil(e/2)),Math.max(1,Math.ceil(r/2))]}function vT(r,e){let[t,o]=yo(r,e);return t*o*4}function El(r,e){let t=r,o,n,s,a,i,p,l,u,c,m;return P().getNumber("WEBGL_VERSION")===2?(o=t.R32F,n=t.R16F,s=t.RGBA16F,a=t.RGBA32F,i=t.RED,l=4,u=1,c=t.HALF_FLOAT,m=t.FLOAT,p=t.RGBA8):(o=r.RGBA,n=r.RGBA,s=r.RGBA,a=t.RGBA,i=r.RGBA,l=4,u=4,c=e!=null?e.HALF_FLOAT_OES:null,m=r.FLOAT,p=r.RGBA),{internalFormatFloat:o,internalFormatHalfFloat:n,internalFormatPackedHalfFloat:s,internalFormatPackedFloat:a,textureFormatFloat:i,downloadTextureFormat:p,downloadUnpackNumChannels:l,defaultNumChannels:u,textureTypeHalfFloat:c,textureTypeFloat:m}}function ue(r,e){let t=e();return P().getBool("DEBUG")&&YL(r),t}function YL(r){let e=r.getError();if(e!==r.NO_ERROR)throw new Error("WebGL Error: "+eV(r,e))}var ZL=596e-10,JL=65504;function TT(r){return!!(P().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||r===0||ZL<Math.abs(r)&&Math.abs(r)<JL)}function eV(r,e){switch(e){case r.NO_ERROR:return"NO_ERROR";case r.INVALID_ENUM:return"INVALID_ENUM";case r.INVALID_VALUE:return"INVALID_VALUE";case r.INVALID_OPERATION:return"INVALID_OPERATION";case r.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case r.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case r.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return`Unknown error code ${e}`}}function $l(r,e){return Lo(r,()=>r.getExtension(e),'Extension "'+e+'" not supported on this browser.')}function wT(r,e){let t=Lo(r,()=>r.createShader(r.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(ue(r,()=>r.shaderSource(t,e)),ue(r,()=>r.compileShader(t)),r.getShaderParameter(t,r.COMPILE_STATUS)===!1)throw console.log(r.getShaderInfoLog(t)),new Error("Failed to compile vertex shader.");return t}function CT(r,e){let t=Lo(r,()=>r.createShader(r.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(ue(r,()=>r.shaderSource(t,e)),ue(r,()=>r.compileShader(t)),P().get("ENGINE_COMPILE_ONLY"))return t;if(r.getShaderParameter(t,r.COMPILE_STATUS)===!1)throw Qh(e,r.getShaderInfoLog(t)),new Error("Failed to compile fragment shader.");return t}var tV=/ERROR: [0-9]+:([0-9]+):/g;function Qh(r,e){let t=tV.exec(e);if(t==null){console.log(`Couldn't parse line number in error: ${e}`),console.log(r);return}let o=+t[1],n=r.split(`
`),s=n.length.toString().length+2,a=n.map((c,m)=>y.rightPad((m+1).toString(),s)+c),i=0;for(let c=0;c<a.length;c++)i=Math.max(a[c].length,i);let p=a.slice(0,o-1),l=a.slice(o-1,o),u=a.slice(o);console.log(p.join(`
`)),console.log(e.split(`
`)[0]),console.log(`%c ${y.rightPad(l[0],i)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(u.join(`
`))}function ST(r){return Lo(r,()=>r.createProgram(),"Unable to create WebGLProgram.")}function NT(r,e){if(ue(r,()=>r.linkProgram(e)),!P().get("ENGINE_COMPILE_ONLY")&&r.getProgramParameter(e,r.LINK_STATUS)===!1)throw console.log(r.getProgramInfoLog(e)),new Error("Failed to link vertex and fragment shaders.")}function jc(r,e){if(ue(r,()=>r.validateProgram(e)),r.getProgramParameter(e,r.VALIDATE_STATUS)===!1)throw console.log(r.getProgramInfoLog(e)),new Error("Shader program validation failed.")}function IT(r,e){let t=Lo(r,()=>r.createBuffer(),"Unable to create WebGLBuffer");return ue(r,()=>r.bindBuffer(r.ARRAY_BUFFER,t)),ue(r,()=>r.bufferData(r.ARRAY_BUFFER,e,r.STATIC_DRAW)),t}function kT(r,e){let t=Lo(r,()=>r.createBuffer(),"Unable to create WebGLBuffer");return ue(r,()=>r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t)),ue(r,()=>r.bufferData(r.ELEMENT_ARRAY_BUFFER,e,r.STATIC_DRAW)),t}function ET(r){return Lo(r,()=>r.createTexture(),"Unable to create WebGLTexture.")}function $T(r,e){let t=P().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(r<=0||e<=0){let o=`[${r}x${e}]`;throw new Error("Requested texture size "+o+" is invalid.")}if(r>t||e>t){let o=`[${r}x${e}]`,n=`[${t}x${t}]`;throw new Error("Requested texture size "+o+" greater than WebGL maximum on this browser / GPU "+n+".")}}function AT(r){return Lo(r,()=>r.createFramebuffer(),"Unable to create WebGLFramebuffer.")}function Yh(r,e,t,o,n,s,a){let i=r.getAttribLocation(e,t);return i===-1?!1:(ue(r,()=>r.bindBuffer(r.ARRAY_BUFFER,o)),ue(r,()=>r.vertexAttribPointer(i,n,r.FLOAT,!1,s,a)),ue(r,()=>r.enableVertexAttribArray(i)),!0)}function rV(r,e,t){nV(r,t),ue(r,()=>r.activeTexture(r.TEXTURE0+t)),ue(r,()=>r.bindTexture(r.TEXTURE_2D,e))}function FT(r,e,t){return Lo(r,()=>r.getUniformLocation(e,t),'uniform "'+t+'" not present in program.')}function DT(r,e,t){return r.getUniformLocation(e,t)}function RT(r,e,t,o){ue(r,()=>rV(r,e,o)),ue(r,()=>r.uniform1i(t,o))}function Xc(r,e,t){ue(r,()=>r.bindFramebuffer(r.FRAMEBUFFER,t)),ue(r,()=>r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0))}function Zh(r,e){ue(r,()=>r.bindFramebuffer(r.FRAMEBUFFER,e)),ue(r,()=>r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,null,0))}function Al(r){let e=r.checkFramebufferStatus(r.FRAMEBUFFER);if(e!==r.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+oV(r,e))}function oV(r,e){switch(e){case r.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case r.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return`unknown error ${e}`}}function Lo(r,e,t){let o=ue(r,()=>e());if(o==null)throw new Error(t);return o}function nV(r,e){let t=r.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,o=e+r.TEXTURE0;if(o<r.TEXTURE0||o>t){let n=`[gl.TEXTURE0, gl.TEXTURE${t}]`;throw new Error(`textureUnit must be in ${n}.`)}}function dn(r,e=2){return y.sizeFromShape(r.slice(0,r.length-e))}function fn(r){if(r.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[r.length>1?r[r.length-2]:1,r[r.length-1]]}function Fl(r){let e=[1,1,1];return r.length===0||r.length===1&&r[0]===1||(e=[dn(r),...fn(r)]),e}function OT(r,e=!1){let t=P().getNumber("WEBGL_MAX_TEXTURE_SIZE"),o=P().getNumber("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE");o===1/0&&P().getBool("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE")&&(o=t/2),e&&(t=t*2,o=o*2,r=r.map((i,p)=>p>=r.length-2?y.nearestLargerEven(r[p]):r[p]),r.length===1&&(r=[2,r[0]])),r.length!==2&&(r=y.squeezeShape(r).newShape);let n=y.sizeFromShape(r),s=null;r.length<=1&&n<=t?s=[1,n]:r.length===2&&r[0]<=t&&r[1]<=t?s=r:r.length===3&&r[0]*r[1]<=t&&r[2]<=t?s=[r[0]*r[1],r[2]]:r.length===3&&r[0]<=t&&r[1]*r[2]<=t?s=[r[0],r[1]*r[2]]:r.length===4&&r[0]*r[1]*r[2]<=t&&r[3]<=t?s=[r[0]*r[1]*r[2],r[3]]:r.length===4&&r[0]<=t&&r[1]*r[2]*r[3]<=t&&(s=[r[0],r[1]*r[2]*r[3]]);let a=s!=null&&Math.max(...s)>o&&Math.min(...s)<=(e?2:1)&&Math.min(...s)>0;if(s==null||a)if(e){let i=dn(r),p=2,l=2;r.length&&([p,l]=fn(r)),n=i*(p/2)*(l/2),s=y.sizeToSquarishShape(n).map(u=>u*2)}else s=y.sizeToSquarishShape(n);return s}function Kc(r){return r%2===0}function na(r,e){if(r=r.slice(-2),e=e.slice(-2),y.arraysEqual(r,e)||!r.length||!e.length||r[0]===0||r[1]===0||e[0]===0||e[1]===0)return!0;if(r.length!==e.length){let t=r[r.length-1],o=e[e.length-1];if(t===o||Kc(t)&&Kc(o)&&(r[0]===1||e[0]===1))return!0}return r[1]===e[1]&&Kc(r[0])&&Kc(e[0])}var Kh,jh;function PT(r){if(Kh==null){let e=br(r);Kh=e.getParameter(e.MAX_TEXTURE_SIZE)}return Kh}function MT(r){if(jh==null){let e=br(r);jh=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,jh)}function LT(r){if(r===0)return 0;let e,t=br(r);return Er(t,"EXT_disjoint_timer_query_webgl2")&&r===2?e=2:Er(t,"EXT_disjoint_timer_query")?e=1:e=0,e}function Er(r,e){return r.getExtension(e)!=null}function Jh(r){try{if(br(r)!=null)return!0}catch(e){return console.log("Error when getting WebGL context: ",e),!1}return!1}function VT(r){if(r===0)return!1;let e=br(r);if(r===1){if(!Er(e,"OES_texture_float"))return!1}else if(!Er(e,"EXT_color_buffer_float"))return!1;return Xh(e)}function BT(r){if(r===0)return!1;let e=br(r);if(r===1){if(!Er(e,"OES_texture_float")||!Er(e,"WEBGL_color_buffer_float"))return!1}else{if(Er(e,"EXT_color_buffer_float"))return Xh(e);let o="EXT_color_buffer_half_float";if(Er(e,o)){let n=e.getExtension(o);return sV(e,n)}return!1}return Xh(e)}function Xh(r){let e=El(r),t=r.createTexture();r.bindTexture(r.TEXTURE_2D,t),r.texImage2D(r.TEXTURE_2D,0,e.internalFormatFloat,1,1,0,e.textureFormatFloat,e.textureTypeFloat,null);let s=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,s),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0);let a=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(t),r.deleteFramebuffer(s),a}function sV(r,e){let t=El(r,e),o=r.createTexture();r.bindTexture(r.TEXTURE_2D,o),r.texImage2D(r.TEXTURE_2D,0,t.internalFormatHalfFloat,1,1,0,t.textureFormatFloat,t.textureTypeHalfFloat,null);let a=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,a),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,o,0);let i=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(o),r.deleteFramebuffer(a),i}function zT(r){return r!==2?!1:br(r).fenceSync!=null}function bo(r,e){Array.isArray(r)||(r=[r]),r.forEach(t=>{t!=null&&y.assert(t.dtype!=="complex64",()=>`${e} does not support complex64 tensors in the WebGL backend.`)})}var ge=P();ge.registerFlag("HAS_WEBGL",()=>ge.getNumber("WEBGL_VERSION")>0);ge.registerFlag("WEBGL_VERSION",()=>Jh(2)?2:Jh(1)?1:0);ge.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1);ge.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>ge.get("WEBGL_VERSION")===2);ge.registerFlag("WEBGL_CPU_FORWARD",()=>!0);ge.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1);ge.registerFlag("WEBGL_PACK",()=>ge.getBool("HAS_WEBGL"));ge.registerFlag("WEBGL_PACK_NORMALIZATION",()=>ge.getBool("WEBGL_PACK"));ge.registerFlag("WEBGL_PACK_CLIP",()=>ge.getBool("WEBGL_PACK"));ge.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>ge.getBool("WEBGL_PACK"));ge.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>ge.getBool("WEBGL_PACK"));ge.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>ge.getBool("WEBGL_PACK"));ge.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>ge.getBool("WEBGL_PACK"));ge.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>ge.getBool("WEBGL_PACK"));ge.registerFlag("WEBGL_PACK_REDUCE",()=>ge.getBool("WEBGL_PACK"));ge.registerFlag("WEBGL_LAZILY_UNPACK",()=>ge.getBool("WEBGL_PACK"));ge.registerFlag("WEBGL_CONV_IM2COL",()=>ge.getBool("WEBGL_PACK"));ge.registerFlag("WEBGL_PACK_CONV2DTRANSPOSE",()=>ge.getBool("WEBGL_PACK"));ge.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>PT(ge.getNumber("WEBGL_VERSION")));ge.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>MT(ge.getNumber("WEBGL_VERSION")));ge.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{let r=ge.getNumber("WEBGL_VERSION");return r===0?0:LT(r)});ge.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>ge.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!Jo.isMobile());ge.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>VT(ge.getNumber("WEBGL_VERSION")));ge.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>ge.getBool("WEBGL_FORCE_F16_TEXTURES")?!1:ge.getBool("WEBGL_RENDER_FLOAT32_CAPABLE"));ge.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>BT(ge.getNumber("WEBGL_VERSION")));ge.registerFlag("WEBGL_FENCE_API_ENABLED",()=>zT(ge.getNumber("WEBGL_VERSION")));ge.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>ge.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0);ge.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,r=>{if(typeof r!="number")throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${r}.`);if(r<0&&r!==-1)throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${r}.`)});ge.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>Jo.isMobile()?1:-1,r=>{if(typeof r!="number")throw new Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${r}.`);if(r<0&&r!==-1)throw new Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${r}.`)});ge.registerFlag("CPU_HANDOFF_SIZE_THRESHOLD",()=>128);ge.registerFlag("WEBGL_USE_SHAPES_UNIFORMS",()=>!1);ge.registerFlag("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e5);ge.registerFlag("TOPK_K_CPU_HANDOFF_THRESHOLD",()=>128);ge.registerFlag("WEBGL_EXP_CONV",()=>!1);ge.registerFlag("SOFTWARE_WEBGL_ENABLED",()=>ge.getBool("IS_TEST"));ge.registerFlag("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE",()=>1/0);ge.registerFlag("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE",()=>!1);ge.registerFlag("WEBGL2_ISNAN_CUSTOM",()=>!1);ge.registerFlag("ENGINE_COMPILE_ONLY",()=>!1);function it(){let r,e,t,o,n,s,a,i,p,l;return P().getNumber("WEBGL_VERSION")===2?(r="#version 300 es",e="in",t="out",o="in",n="texture",s="outputColor",a="out vec4 outputColor;",i=P().getBool("WEBGL2_ISNAN_CUSTOM")?`
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
    `):(r="",e="attribute",t="varying",o="varying",n="texture2D",s="gl_FragColor",a="",i=`
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
    `),{version:r,attribute:e,varyingVs:t,varyingFs:o,texture2D:n,output:s,defineOutput:a,defineSpecialNaN:i,defineSpecialInf:p,defineRound:l}}function jr(r,e,t="index"){let o=y.computeStrides(e);return o.map((n,s)=>{let a=`int ${r[s]} = ${t} / ${n}`,i=s===o.length-1?`int ${r[s+1]} = ${t} - ${r[s]} * ${n}`:`index -= ${r[s]} * ${n}`;return`${a}; ${i};`}).join("")}function sa(r,e,t="index"){let o=y.computeStrides(e);return o.map((n,s)=>{let a=`int ${r[s]} = ${t} / outShapeStrides[${s}]`,i=s===o.length-1?`int ${r[s+1]} = ${t} - ${r[s]} * outShapeStrides[${s}]`:`index -= ${r[s]} * outShapeStrides[${s}]`;return`${a}; ${i};`}).join("")}function aV(r,e){let t=r.length,o=r.map(s=>`${e}[${s}]`),n=new Array(t-1);n[t-2]=o[t-1];for(let s=t-3;s>=0;--s)n[s]=`(${n[s+1]} * ${o[s+1]})`;return n}function UT(r,e,t="index"){let o=r.map((s,a)=>a),n=aV(o,e);return n.map((s,a)=>{let i=`int ${r[a]} = ${t} / ${n[a]}`,p=a===n.length-1?`int ${r[a+1]} = ${t} - ${r[a]} * ${n[a]}`:`index -= ${r[a]} * ${n[a]}`;return`${i}; ${p};`}).join("")}function $p(r){let e=y.computeStrides(r).map(t=>t.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${e[0]} + coords.y * ${e[1]} + coords.z;
  }
`}function Ap(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}var Yc=`
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
`;var{getBroadcastDims:WT}=I;function GT(r,e,t){let o=[];if(r.forEach(d=>{let f=y.sizeFromShape(d.shapeInfo.logicalShape);if(d.shapeInfo.isUniform?o.push(`uniform float ${d.name}${f>1?`[${f}]`:""};`):(o.push(`uniform sampler2D ${d.name};`),o.push(`uniform int offset${d.name};`)),t.enableShapeUniforms){let{uniformShape:g}=Zc(t.packedInputs,d.shapeInfo.logicalShape,d.shapeInfo.texShape);switch(g.length){case 1:o.push(`uniform int ${d.name}Shape;`);break;case 2:o.push(`uniform ivec2 ${d.name}Shape;`);break;case 3:o.push(`uniform ivec3 ${d.name}Shape;`);break;case 4:o.push(`uniform ivec4 ${d.name}Shape;`);break;default:break}o.push(`uniform ivec2 ${d.name}TexShape;`)}}),t.enableShapeUniforms){switch(e.logicalShape.length){case 1:o.push("uniform int outShape;");break;case 2:o.push("uniform ivec2 outShape;"),o.push("uniform int outShapeStrides;");break;case 3:o.push("uniform ivec3 outShape;"),o.push("uniform ivec2 outShapeStrides;");break;case 4:o.push("uniform ivec4 outShape;"),o.push("uniform ivec3 outShapeStrides;");break;default:break}o.push("uniform ivec2 outTexShape;")}t.customUniforms&&t.customUniforms.forEach(d=>{o.push(`uniform ${d.type} ${d.name}${d.arrayIndex?`[${d.arrayIndex}]`:""};`)});let n=o.join(`
`),s=r.map(d=>iV(d,e,t.packedInputs,t.enableShapeUniforms)).join(`
`),a=e.texShape,i=it(),p=uV(i),l,u,c=dV(i);return e.isPacked?(l=pV(e.logicalShape,a,t.enableShapeUniforms),u=mV(i)):(l=lV(e.logicalShape,a,t.enableShapeUniforms),u=cV(i)),t.packedInputs&&(c+=xV),[c,p,u,n,l,s,t.userCode].join(`
`)}function Dp(r,e=!1){let t=r.shapeInfo.logicalShape;switch(t.length){case 0:return EV(r,e);case 1:return AV(r,e);case 2:return DV(r,e);case 3:return OV(r,e);case 4:return MV(r,e);case 5:return LV(r);case 6:return VV(r);default:throw new Error(`${t.length}-D input sampling is not yet supported`)}}function HT(r,e){switch(r.shapeInfo.logicalShape.length){case 0:return kV(r);case 1:return $V(r,e);case 2:return FV(r,e);case 3:return RV(r,e);default:return PV(r,e)}}function iV(r,e,t=!1,o){let n="";t?n+=HT(r,o):n+=Dp(r,o);let s=r.shapeInfo.logicalShape,a=e.logicalShape;return s.length<=a.length&&(t?n+=BV(r,e):n+=zV(r,e)),n}function pV(r,e,t){switch(r.length){case 0:return qT();case 1:return yV(r,e,t);case 2:return NV(r,e,t);case 3:return _V(r,e,t);default:return TV(r,e,t)}}function lV(r,e,t){switch(r.length){case 0:return qT();case 1:return bV(r,e,t);case 2:return IV(r,e,t);case 3:return vV(r,e,t);case 4:return wV(r,e,t);case 5:return CV(r,e);case 6:return SV(r,e);default:throw new Error(`${r.length}-D output sampling is not yet supported`)}}function uV(r){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${r.texture2D}(textureSampler, uv).r;
    }
  `}function cV(r){return`
    void setOutput(float val) {
      ${r.output} = vec4(val, 0, 0, 0);
    }
  `}function mV(r){return`
    void setOutput(vec4 val) {
      ${r.output} = val;
    }
  `}function dV(r){return`${r.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${r.varyingFs} vec2 resultUV;
    ${r.defineOutput}
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
    ${r.defineSpecialNaN}
    ${r.defineSpecialInf}
    ${r.defineRound}

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

    ${fV}
    ${hV}
    ${gV}
  `}var fV=`
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
`,hV=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,gV=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,xV=`
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
`;function qT(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function yV(r,e,t){let o=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)];return o[0]===1?t?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${o[1]}.0);
      }
    `:o[1]===1?t?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${o[0]}.0);
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
                             vec2(${o[0]}, ${o[1]}));
      return 2 * (resTexRC.x * ${o[1]} + resTexRC.y);
    }
  `}function bV(r,e,t){return e[0]===1?t?`
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
  `}function _V(r,e,t){if(t)return`
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
  `;let o=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)],n=Math.ceil(r[2]/2),s=n*Math.ceil(r[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${o[0]}, ${o[1]}));
      int index = resTexRC.x * ${o[1]} + resTexRC.y;

      int b = index / ${s};
      index -= b * ${s};

      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec3(b, r, c);
    }
  `}function vV(r,e,t){if(t)return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${sa(["r","c","d"],r)}
    return ivec3(r, c, d);
  }
`;let o=jr(["r","c","d"],r);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;
      ${o}
      return ivec3(r, c, d);
    }
  `}function TV(r,e,t){if(t)return`
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
  `;let o=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)],n=Math.ceil(r[r.length-1]/2),s=n*Math.ceil(r[r.length-2]/2),a=s,i="",p="b, r, c";for(let l=2;l<r.length-1;l++)a*=r[r.length-l-1],i=`
      int b${l} = index / ${a};
      index -= b${l} * ${a};
    `+i,p=`b${l}, `+p;return`
    ivec${r.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${o[0]}, ${o[1]}));
      int index = resTexRC.x * ${o[1]} + resTexRC.y;

      ${i}

      int b = index / ${s};
      index -= b * ${s};

      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec${r.length}(${p});
    }
  `}function wV(r,e,t){if(t)return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${sa(["r","c","d","d2"],r)}
      return ivec4(r, c, d, d2);
    }
  `;let o=jr(["r","c","d","d2"],r);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;
      ${o}
      return ivec4(r, c, d, d2);
    }
  `}function CV(r,e){let t=jr(["r","c","d","d2","d3"],r);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${e[0]},
                             ${e[1]}));

      int index = resTexRC.x * ${e[1]} + resTexRC.y;

      ${t}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}function SV(r,e){let t=jr(["r","c","d","d2","d3","d4"],r);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;

      ${t}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}function NV(r,e,t){let o=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)];if(y.arraysEqual(r,e))return t?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${o[0]}, ${o[1]}));
      }
    `;let n=Math.ceil(r[1]/2);return t?`
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
                             vec2(${o[0]}, ${o[1]}));

      int index = resTexRC.x * ${o[1]} + resTexRC.y;
      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec2(r, c);
    }
  `}function IV(r,e,t){return y.arraysEqual(r,e)?t?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${e[0]}, ${e[1]}));
      }
    `:r[1]===1?t?`
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
    `:r[0]===1?t?`
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
      int r = index / ${r[1]};
      int c = index - r * ${r[1]};
      return ivec2(r, c);
    }
  `}function aa(r){return`offset${r}`}function kV(r){let e=r.name,t="get"+e.charAt(0).toUpperCase()+e.slice(1),o=it();return`
    vec4 ${t}() {
      return ${o.texture2D}(${e}, halfCR);
    }
  `}function EV(r,e){let t=r.name,o="get"+t.charAt(0).toUpperCase()+t.slice(1);if(r.shapeInfo.isUniform)return`float ${o}() {return ${t};}`;let[n,s]=r.shapeInfo.texShape;if(n===1&&s===1)return`
      float ${o}() {
        return sampleTexture(${t}, halfCR);
      }
    `;let a=aa(t);if(e)return`
    float ${o}() {
      vec2 uv = uvFromFlat(${t}TexShape[0], ${t}TexShape[1], ${a});
      return sampleTexture(${t}, uv);
    }
  `;let[i,p]=r.shapeInfo.texShape;return`
    float ${o}() {
      vec2 uv = uvFromFlat(${i}, ${p}, ${a});
      return sampleTexture(${t}, uv);
    }
  `}function $V(r,e){let t=r.name,o="get"+t.charAt(0).toUpperCase()+t.slice(1),n=r.shapeInfo.texShape,s=it();if(e)return`
    vec4 ${o}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${t}TexShape[0]) / 2.0), ceil(float(${t}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${s.texture2D}(${t}, uv);
    }
  `;let a=[Math.ceil(n[0]/2),Math.ceil(n[1]/2)];return`
    vec4 ${o}(int index) {
      vec2 uv = packedUVfrom1D(
        ${a[0]}, ${a[1]}, index);
      return ${s.texture2D}(${t}, uv);
    }
  `}function AV(r,e){let t=r.name,o="get"+t.charAt(0).toUpperCase()+t.slice(1);if(r.shapeInfo.isUniform)return`
      float ${o}(int index) {
        ${Rp(r)}
      }
    `;let n=r.shapeInfo.texShape,s=n[0],a=n[1];if(a===1&&s===1)return`
      float ${o}(int index) {
        return sampleTexture(${t}, halfCR);
      }
    `;let i=aa(t);return a===1?e?`
      float ${o}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${i}) + 0.5) / float(${t}TexShape[0]));
        return sampleTexture(${t}, uv);
      }
    `:`
      float ${o}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${i}) + 0.5) / ${s}.0);
        return sampleTexture(${t}, uv);
      }
    `:s===1?e?`
      float ${o}(int index) {
        vec2 uv = vec2((float(index + ${i}) + 0.5) / float(${t}TexShape[1]), 0.5);
        return sampleTexture(${t}, uv);
      }
    `:`
      float ${o}(int index) {
        vec2 uv = vec2((float(index + ${i}) + 0.5) / ${a}.0, 0.5);
        return sampleTexture(${t}, uv);
      }
    `:e?`
    float ${o}(int index) {
      vec2 uv = uvFromFlat(${t}TexShape[0], ${t}TexShape[1], index + ${i});
      return sampleTexture(${t}, uv);
    }
  `:`
    float ${o}(int index) {
      vec2 uv = uvFromFlat(${s}, ${a}, index + ${i});
      return sampleTexture(${t}, uv);
    }
  `}function FV(r,e){let t=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=r.shapeInfo.texShape,a=s[0],i=s[1],p=it();if(s!=null&&y.arraysEqual(t,s))return e?`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);

        return ${p.texture2D}(${o}, uv);
      }
    `:`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${i}.0, ${a}.0);

        return ${p.texture2D}(${o}, uv);
      }
    `;if(e)return`
    vec4 ${n}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${o}TexShape[0]) / 2.0), ceil(float(${o}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${o}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${p.texture2D}(${o}, uv);
    }
  `;let l=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],u=Math.ceil(t[1]/2);return`
    vec4 ${n}(int row, int col) {
      vec2 uv = packedUVfrom2D(${u}, ${l[0]}, ${l[1]}, row, col);
      return ${p.texture2D}(${o}, uv);
    }
  `}function DV(r,e){let t=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=r.shapeInfo.texShape;if(s!=null&&y.arraysEqual(t,s)){if(e)return`
      float ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `;let m=s[0],d=s[1];return`
    float ${n}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${d}.0, ${m}.0);
      return sampleTexture(${o}, uv);
    }
  `}let{newShape:a,keptDims:i}=y.squeezeShape(t),p=a;if(p.length<t.length){let m=Op(r,p),d=["row","col"];return`
      ${Dp(m,e)}
      float ${n}(int row, int col) {
        return ${n}(${Pp(d,i)});
      }
    `}if(r.shapeInfo.isUniform)return`
      float ${n}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${t[1]}, 1)));
        ${Rp(r)}
      }
    `;let l=s[0],u=s[1],c=aa(o);return u===1?e?`
      float ${n}(int row, int col) {
        float index = dot(vec3(row, col, ${c}), vec3(${o}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${o}TexShape[0]));
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${n}(int row, int col) {
      float index = dot(vec3(row, col, ${c}), vec3(${t[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
      return sampleTexture(${o}, uv);
    }
  `:l===1?e?`
      float ${n}(int row, int col) {
        float index = dot(vec3(row, col, ${c}), vec3(${o}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${o}TexShape[1]), 0.5);
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${n}(int row, int col) {
      float index = dot(vec3(row, col, ${c}), vec3(${t[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${u}.0, 0.5);
      return sampleTexture(${o}, uv);
    }
  `:e?`
      float ${n}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${o}Shape[1] + col + ${c};
        vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index);
        return sampleTexture(${o}, uv);
      }
    `:`
  float ${n}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${t[1]} + col + ${c};
    vec2 uv = uvFromFlat(${l}, ${u}, index);
    return sampleTexture(${o}, uv);
  }
`}function RV(r,e){let t=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=r.shapeInfo.texShape,a=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)];if(t[0]===1){let m=t.slice(1),d=[1,2],f=Op(r,m),g=["b","row","col"];return`
        ${HT(f,e)}
        vec4 ${n}(int b, int row, int col) {
          return ${n}(${Pp(g,d)});
        }
      `}let i=it();if(e)return`
    vec4 ${n}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${o}TexShape[0]) / 2.0), ceil(float(${o}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${o}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${o}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${i.texture2D}(${o}, uv);
    }
  `;let p=a[0],l=a[1],u=Math.ceil(t[2]/2),c=u*Math.ceil(t[1]/2);return`
    vec4 ${n}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${p}, ${l}, ${c}, ${u}, b, row, col);
      return ${i.texture2D}(${o}, uv);
    }
  `}function OV(r,e){let t=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=t[1]*t[2],a=t[2],{newShape:i,keptDims:p}=y.squeezeShape(t),l=i;if(l.length<t.length){let g=Op(r,l),h=["row","col","depth"];return`
        ${Dp(g,e)}
        float ${n}(int row, int col, int depth) {
          return ${n}(${Pp(h,p)});
        }
      `}if(r.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${s}, ${a}, 1)));
        ${Rp(r)}
      }
    `;let u=r.shapeInfo.texShape,c=u[0],m=u[1],d=r.shapeInfo.flatOffset;if(m===s&&d==null)return e?`
      float ${n}(int row, int col, int depth) {
        int stride1 = ${o}Shape[2];
        float texR = float(row);
        float texC = dot(vec2(col, depth), vec2(stride1, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
        float ${n}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${a}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${m}.0, ${c}.0);
          return sampleTexture(${o}, uv);
        }
      `;if(m===a&&d==null)return e?`
      float ${n}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${o}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${n}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${t[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${m}.0, ${c}.0);
      return sampleTexture(${o}, uv);
    }
  `;let f=aa(o);return e?`
    float ${n}(int row, int col, int depth) {
      // Explicitly use integer operations as dot() only works on floats.
      int stride0 = ${o}Shape[1] * ${o}Shape[2];
      int stride1 = ${o}Shape[2];
      int index = row * stride0 + col * stride1 + depth + ${f};
      vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index);
      return sampleTexture(${o}, uv);
    }
    `:`
      float ${n}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${s} + col * ${a} + depth + ${f};
        vec2 uv = uvFromFlat(${c}, ${m}, index);
        return sampleTexture(${o}, uv);
      }
  `}function PV(r,e){let t=r.name,o="get"+t.charAt(0).toUpperCase()+t.slice(1),n=it();if(e)return`
    vec4 ${o}(int b2, int b, int row, int col) {
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
  `;let s=r.shapeInfo.logicalShape,a=s.length,i=r.shapeInfo.texShape,p=[Math.ceil(i[0]/2),Math.ceil(i[1]/2)],l=p[0],u=p[1],c=Math.ceil(s[a-1]/2),m=c*Math.ceil(s[a-2]/2),d="int b, int row, int col",f=`b * ${m} + (row / 2) * ${c} + (col / 2)`;for(let g=2;g<a-1;g++)d=`int b${g}, `+d,m*=s[a-g-1],f=`b${g} * ${m} + `+f;return`
    vec4 ${o}(${d}) {
      int index = ${f};
      int texR = index / ${u};
      int texC = index - texR * ${u};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${u}, ${l});
      return ${n.texture2D}(${t}, uv);
    }
  `}function MV(r,e){let t=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=t[3],a=t[2]*s,i=t[1]*a,{newShape:p,keptDims:l}=y.squeezeShape(t);if(p.length<t.length){let b=Op(r,p),S=["row","col","depth","depth2"];return`
      ${Dp(b,e)}
      float ${n}(int row, int col, int depth, int depth2) {
        return ${n}(${Pp(S,l)});
      }
    `}if(r.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${i}, ${a}, ${s}, 1)));
        ${Rp(r)}
      }
    `;let u=r.shapeInfo.flatOffset,c=r.shapeInfo.texShape,m=c[0],d=c[1],f=`int stride2 = ${o}Shape[3];`,g=`int stride1 = ${o}Shape[2] * stride2;`,h=`int stride0 = ${o}Shape[1] * stride1;`;if(d===i&&u==null)return e?`
      float ${n}(int row, int col, int depth, int depth2) {
        ${f}
        ${g}
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(stride1, stride2, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${a}, ${s}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${m}.0);
        return sampleTexture(${o}, uv);
      }
    `;if(d===s&&u==null)return e?`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${o}Shape[1] * ${o}Shape[2], ${o}Shape[2], 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${t[1]*t[2]}, ${t[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${m}.0);
        return sampleTexture(${o}, uv);
      }
    `;let x=aa(o);return e?`
    float ${n}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      ${f}
      ${g}
      ${h}
      int index = row * stride0 + col * stride1 +
          depth * stride2 + depth2;
      vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index + ${x});
      return sampleTexture(${o}, uv);
    }
  `:`
    float ${n}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${i} + col * ${a} +
          depth * ${s} + depth2;
      vec2 uv = uvFromFlat(${m}, ${d}, index + ${x});
      return sampleTexture(${o}, uv);
    }
  `}function LV(r){let e=r.shapeInfo.logicalShape,t=r.name,o="get"+t.charAt(0).toUpperCase()+t.slice(1),n=e[4],s=e[3]*n,a=e[2]*s,i=e[1]*a,{newShape:p,keptDims:l}=y.squeezeShape(e);if(p.length<e.length){let g=Op(r,p),h=["row","col","depth","depth2","depth3"];return`
      ${Dp(g)}
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        return ${o}(${Pp(h,l)});
      }
    `}if(r.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${i}, ${a}, ${s}, ${n})) +
          depth3;
        ${Rp(r)}
      }
    `;let u=r.shapeInfo.flatOffset,c=r.shapeInfo.texShape,m=c[0],d=c[1];if(d===i&&u==null)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${a}, ${s}, ${n}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${m}.0);
        return sampleTexture(${t}, uv);
      }
    `;if(d===n&&u==null)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${e[1]*e[2]*e[3]},
               ${e[2]*e[3]}, ${e[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${m}.0);
        return sampleTexture(${t}, uv);
      }
    `;let f=aa(t);return`
    float ${o}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${i} + col * ${a} + depth * ${s} +
          depth2 * ${n} + depth3 + ${f};
      vec2 uv = uvFromFlat(${m}, ${d}, index);
      return sampleTexture(${t}, uv);
    }
  `}function VV(r){let e=r.shapeInfo.logicalShape,t=r.name,o="get"+t.charAt(0).toUpperCase()+t.slice(1),{newShape:n,keptDims:s}=y.squeezeShape(e);if(n.length<e.length){let h=Op(r,n),x=["row","col","depth","depth2","depth3","depth4"];return`
      ${Dp(h)}
      float ${o}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${o}(${Pp(x,s)});
      }
    `}let a=e[5],i=e[4]*a,p=e[3]*i,l=e[2]*p,u=e[1]*l;if(r.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${u}, ${l}, ${p}, ${i})) +
          dot(
            vec2(depth3, depth4),
            vec2(${a}, 1)));
        ${Rp(r)}
      }
    `;let c=r.shapeInfo.flatOffset,m=r.shapeInfo.texShape,d=m[0],f=m[1];if(f===u&&c==null)return`
      float ${o}(int row, int col, int depth,
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
      float ${o}(int row, int col, int depth,
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
    `;let g=aa(t);return`
    float ${o}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${u} + col * ${l} + depth * ${p} +
          depth2 * ${i} + depth3 * ${a} + depth4 + ${g};
      vec2 uv = uvFromFlat(${d}, ${f}, index);
      return sampleTexture(${t}, uv);
    }
  `}function Rp(r){let e=r.name,t=y.sizeFromShape(r.shapeInfo.logicalShape);return t<2?`return ${e};`:`
    for (int i = 0; i < ${t}; i++) {
      if (i == index) {
        return ${e}[i];
      }
    }
  `}function BV(r,e){let t=r.name,o=t.charAt(0).toUpperCase()+t.slice(1),n="get"+o+"AtOutCoords",s=r.shapeInfo.logicalShape.length,a=e.logicalShape.length,i=WT(r.shapeInfo.logicalShape,e.logicalShape),p=Ce(a),l=a-s,u,c=["x","y","z","w","u","v"];s===0?u="":a<2&&i.length>=1?u="coords = 0;":u=i.map(b=>`coords.${c[b+l]} = 0;`).join(`
`);let m="";a<2&&s>0?m="coords":m=r.shapeInfo.logicalShape.map((b,S)=>`coords.${c[S+l]}`).join(", ");let d="return outputValue;",g=y.sizeFromShape(r.shapeInfo.logicalShape)===1,x=y.sizeFromShape(e.logicalShape)===1;if(s===1&&!g&&!x)d=`
      return vec4(outputValue.xy, outputValue.xy);
    `;else if(g&&!x)a===1?d=`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:d=`
        return vec4(outputValue.x);
      `;else if(i.length){let b=s-2,S=s-1;i.indexOf(b)>-1&&i.indexOf(S)>-1?d="return vec4(outputValue.x);":i.indexOf(b)>-1?d="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":i.indexOf(S)>-1&&(d="return vec4(outputValue.xx, outputValue.zz);")}return`
    vec4 ${n}() {
      ${p} coords = getOutputCoords();
      ${u}
      vec4 outputValue = get${o}(${m});
      ${d}
    }
  `}function zV(r,e){let t=r.name,o=t.charAt(0).toUpperCase()+t.slice(1),n="get"+o+"AtOutCoords",s=e.texShape,a=r.shapeInfo.texShape,i=r.shapeInfo.logicalShape.length,p=e.logicalShape.length;if(!r.shapeInfo.isUniform&&i===p&&r.shapeInfo.flatOffset==null&&y.arraysEqual(a,s))return`
      float ${n}() {
        return sampleTexture(${t}, resultUV);
      }
    `;let l=Ce(p),u=WT(r.shapeInfo.logicalShape,e.logicalShape),c=p-i,m,d=["x","y","z","w","u","v"];i===0?m="":p<2&&u.length>=1?m="coords = 0;":m=u.map(g=>`coords.${d[g+c]} = 0;`).join(`
`);let f="";return p<2&&i>0?f="coords":f=r.shapeInfo.logicalShape.map((g,h)=>`coords.${d[h+c]}`).join(", "),`
    float ${n}() {
      ${l} coords = getOutputCoords();
      ${m}
      return get${o}(${f});
    }
  `}function Ce(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function Zc(r,e,t){let{newShape:o,keptDims:n}=y.squeezeShape(e),s=e.length,a=r&&s===3&&e[0]===1,i=a?e.slice(1):o,p=!r&&s>1&&!y.arraysEqual(e,t)&&o.length<s||a;return{useSqueezeShape:p,uniformShape:p?i:e,keptDims:n}}function Op(r,e){let t=JSON.parse(JSON.stringify(r));return t.shapeInfo.logicalShape=e,t}function Pp(r,e){return e.map(t=>r[t]).join(", ")}function jT(r,e,t,o){let n=t.map((u,c)=>{let m={logicalShape:u.shape,texShape:u.isUniform?null:u.texData.texShape,isUniform:u.isUniform,isPacked:u.isUniform?!1:u.texData.isPacked,flatOffset:null};return u.texData!=null&&u.texData.slice!=null&&u.texData.slice.flatOffset>0&&(m.flatOffset=u.texData.slice.flatOffset),{name:e.variableNames[c],shapeInfo:m}}),s=n.map(u=>u.shapeInfo),a={logicalShape:o.shape,texShape:o.texData.texShape,isUniform:!1,isPacked:o.texData.isPacked,flatOffset:null},i=GT(n,a,e),p=CT(r.gl,i),l=r.createProgram(p);return P().get("ENGINE_COMPILE_ONLY")?{program:e,fragmentShader:p,source:i,webGLProgram:l,inShapeInfos:s,outShapeInfo:a,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(r.buildVao(l),Object.assign({program:e,fragmentShader:p,source:i,webGLProgram:l,inShapeInfos:s,outShapeInfo:a},eg(r,e,l)))}function eg(r,e,t){let o=[],n=[],s,a,i,p=null,l=null;l=r.getUniformLocation(t,"NAN",!1),P().getNumber("WEBGL_VERSION")===1&&(p=r.getUniformLocation(t,"INFINITY",!1));let u=!1;for(let c of e.variableNames){let m={name:c,uniform:r.getUniformLocation(t,c,u),offset:r.getUniformLocation(t,`offset${c}`,u)};e.enableShapeUniforms&&(m.shape=r.getUniformLocation(t,`${c}Shape`,u),m.texShape=r.getUniformLocation(t,`${c}TexShape`,u)),o.push(m)}if(e.enableShapeUniforms&&(s=r.getUniformLocation(t,"outShape",u),i=r.getUniformLocation(t,"outShapeStrides",u),a=r.getUniformLocation(t,"outTexShape",u)),e.customUniforms)for(let c of e.customUniforms)n.push(r.getUniformLocation(t,c.name,u));return{variablesLocations:o,customUniformLocations:n,infLoc:p,nanLoc:l,outShapeLocation:s,outShapeStridesLocation:i,outTexShapeLocation:a}}function KT(r,e){if(r.length!==e.length)throw Error(`Binary was compiled with ${r.length} inputs, but was executed with ${e.length} inputs`);r.forEach((t,o)=>{let n=t.logicalShape,s=e[o],a=s.shape;if(!y.arraysEqual(n,a))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${n} and ${a} must match`);if(t.isUniform&&s.isUniform)return;let i=t.texShape,p=s.isUniform?null:s.texData.texShape;if(!y.arraysEqual(i,p))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${i} and ${p} must match`)})}function XT(r,e,t,o,n){e.program.enableShapeUniforms||(KT(e.inShapeInfos,t),KT([e.outShapeInfo],[o]));let s=o.texData.texture,a=o.texData.texShape;o.texData.isPacked?r.setOutputPackedMatrixTexture(s.texture,a[0],a[1]):r.setOutputMatrixTexture(s.texture,a[0],a[1]),r.setProgram(e.webGLProgram),r.bindVertexArray(e.webGLProgram.vao),P().getNumber("WEBGL_VERSION")===1&&e.infLoc!==null&&r.gl.uniform1f(e.infLoc,1/0),e.nanLoc!==null&&r.gl.uniform1f(e.nanLoc,NaN);for(let p=0;p<t.length;++p){let l=t[p],{uniform:u,offset:c,shape:m,texShape:d}=e.variablesLocations[p];if(m){let{uniformShape:f}=Zc(e.program.packedInputs,l.shape,l.texData.texShape);switch(f.length){case 1:r.gl.uniform1iv(m,new Int32Array(f));break;case 2:r.gl.uniform2iv(m,new Int32Array(f));break;case 3:r.gl.uniform3iv(m,new Int32Array(f));break;case 4:r.gl.uniform4iv(m,new Int32Array(f));break;default:break}}if(d&&r.gl.uniform2i(d,l.texData.texShape[0],l.texData.texShape[1]),u!=null){if(l.isUniform){if(y.sizeFromShape(l.shape)<2)r.gl.uniform1f(u,l.uniformValues[0]);else{let f=l.uniformValues;f instanceof Float32Array||(f=new Float32Array(f)),r.gl.uniform1fv(u,f)}continue}l.texData.slice!=null&&c!=null&&r.gl.uniform1i(c,l.texData.slice.flatOffset),r.setInputMatrixTexture(l.texData.texture.texture,u,p)}}let i=e.outShapeLocation;if(i)switch(o.shape.length){case 1:r.gl.uniform1iv(i,new Int32Array(o.shape));break;case 2:r.gl.uniform2iv(i,new Int32Array(o.shape));break;case 3:r.gl.uniform3iv(i,new Int32Array(o.shape));break;case 4:r.gl.uniform4iv(i,new Int32Array(o.shape));break;default:break}if(e.outShapeStridesLocation){let p=y.computeStrides(o.shape);switch(o.shape.length){case 2:r.gl.uniform1iv(e.outShapeStridesLocation,new Int32Array(p));break;case 3:r.gl.uniform2iv(e.outShapeStridesLocation,new Int32Array(p));break;case 4:r.gl.uniform3iv(e.outShapeStridesLocation,new Int32Array(p));break;default:break}}if(e.outTexShapeLocation&&r.gl.uniform2i(e.outTexShapeLocation,o.texData.texShape[0],o.texData.texShape[1]),e.program.customUniforms&&n)for(let p=0;p<e.program.customUniforms.length;++p){let l=e.program.customUniforms[p],u=e.customUniformLocations[p],c=n[p];if(l.type==="float")r.gl.uniform1fv(u,c);else if(l.type==="vec2")r.gl.uniform2fv(u,c);else if(l.type==="vec3")r.gl.uniform3fv(u,c);else if(l.type==="vec4")r.gl.uniform4fv(u,c);else if(l.type==="int")r.gl.uniform1iv(u,c);else if(l.type==="ivec2")r.gl.uniform2iv(u,c);else if(l.type==="ivec3")r.gl.uniform3iv(u,c);else if(l.type==="ivec4")r.gl.uniform4iv(u,c);else throw Error(`uniform type ${l.type} is not supported yet.`)}r.executeProgram()}function QT(r,e,t){let o="";e.concat(t).forEach(a=>{let i=a.texData!=null&&a.texData.slice!=null&&a.texData.slice.flatOffset>0;if(r.enableShapeUniforms&&!a.isUniform){let p=a.texData.texShape,{useSqueezeShape:l,uniformShape:u,keptDims:c}=Zc(r.packedInputs,a.shape,p),m="",d="",f="";if(u.length===1&&r.packedInputs){let $=[Math.ceil(p[0]/2),Math.ceil(p[1]/2)];m=`${$[0]>1}_${$[1]>1}`}else if(u.length===2&&!r.packedInputs)d=`${u[0]>1}_${u[1]>1}`;else if(u.length>2&&!r.packedInputs){let $=y.computeStrides(u);f=`${$[0]===p[1]}_${$[$.length-1]===p[1]}`}let g=a.shape.length,h=u.length===2&&y.arraysEqual(a.shape,p),x=y.sizeFromShape(a.shape)===1,b=I.getBroadcastDims(a.shape,t.shape),S=!r.packedInputs&&g===t.shape.length&&y.arraysEqual(p,t.texData.texShape),C=r.packedInputs||u.length>2?"":`${p[0]>1}_${p[1]>1}`;o+=`${g}_${S}_${l?c:""}_${u.length}_${x}_${b}_${h}_${m}_${d}_${f}_${C}_${i}`}else{let p=a.isUniform?"uniform":a.texData.texShape;o+=`${a.shape}_${p}_${i}`}});let n=r.userCode,s=r.constructor.name;return s+="_"+o+"_"+n+`${P().getNumber("WEBGL_VERSION")}`,s}function We(r){return P().getBool("WEBGL_USE_SHAPES_UNIFORMS")&&r<=4}var Jc=class{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=mn.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=it();this.outputShape=e,this.enableShapeUniforms=We(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?sa(["r","c","d"],e):jr(["r","c","d"],e)}
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
    `}};var em=class{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=mn.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let t=it();this.outputShape=e,this.enableShapeUniforms=We(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?sa(["r","c","d"],e):jr(["r","c","d"],e)}
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
    `}};var tm=class{constructor(e){this.variableNames=["A"],this.outTexUsage=Gt.DOWNLOAD;let t=it();this.outputShape=e,this.userCode=`
      ${Yc}

      void main() {
        float x = getAAtOutCoords();
        ${t.output} = encode_float(x);
      }
    `}};var rm=class{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=Gt.DOWNLOAD;let t=it();this.outputShape=e,this.userCode=`
      ${Yc}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${t.output} = encode_float(x);
      }
    `}};var GV={R:0,G:1,B:2,A:3},Dl=class{constructor(e,t=!1,o="RGBA"){this.variableNames=["A"],this.customUniforms=[{name:"texShape",type:"ivec2"}];let n=it();this.outputShape=e,this.enableShapeUniforms=We(this.outputShape.length);let s="result";t&&(s="floor(result * 255. + 0.5)");let a="";for(let i=0;i<o.length;i++){let p=o[i];a+=`
          if(offset == ${i}) {
            result = values[${GV[p]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?Ap():$p(e)}

      void main() {
        ivec3 coords = getOutputCoords();
        int flatIndex = getFlatIndex(coords);
        float result = 0.;
        int offset = imod(flatIndex, ${o.length});

        flatIndex = idiv(flatIndex, ${o.length}, 1.);

        int r = flatIndex / texShape[1];
        if (r < texShape[0]) {
          int c = imod(flatIndex, texShape[1]);
          vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
          vec4 values = ${n.texture2D}(A, uv);
          ${a}
        }
        ${n.output} = vec4(${s}, 0., 0., 0.);
      }
    `}};var om=class{constructor(e,t=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:"texShape",type:"ivec2"}];let o=it();this.outputShape=e,this.enableShapeUniforms=We(this.outputShape.length);let n="",s="result";t&&(s="floor(result * 255. + 0.5)");for(let a=0;a<=1;a++)for(let i=0;i<=1;i++){let p=a*2+i;n+=`
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
            values = ${o.texture2D}(A, uv);

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
        ${this.enableShapeUniforms?Ap():$p(e)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${n}

          ${o.output} = ${s};
        }
    `}};function YT(r){let e=it(),t=`${e.version}
    precision highp float;
    ${e.attribute} vec3 clipSpacePos;
    ${e.attribute} vec2 uv;
    ${e.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`;return wT(r,t)}function ZT(r){let e=new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]);return IT(r,e)}function JT(r){let e=new Uint16Array([0,1,2,2,1,3]);return kT(r,e)}function Rl(r,e,t,o,n,s){$T(e,t);let a=ET(r),i=r.TEXTURE_2D;return ue(r,()=>r.bindTexture(i,a)),ue(r,()=>r.texParameteri(i,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE)),ue(r,()=>r.texParameteri(i,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)),ue(r,()=>r.texParameteri(i,r.TEXTURE_MIN_FILTER,r.NEAREST)),ue(r,()=>r.texParameteri(i,r.TEXTURE_MAG_FILTER,r.NEAREST)),P().getNumber("WEBGL_VERSION")===1?ue(r,()=>r.texImage2D(i,0,o,e,t,0,n,s,null)):ue(r,()=>r.texStorage2D(i,1,o,e,t)),ue(r,()=>r.bindTexture(r.TEXTURE_2D,null)),{texture:a,texShape:[t,e]}}function tg(r){return r.internalFormatFloat}function e0(r,e,t,o){let[n,s]=oa(e,t);return Rl(r,n,s,tg(o),o.textureFormatFloat,r.FLOAT)}function rg(r){return r.internalFormatHalfFloat}function t0(r,e,t,o){let[n,s]=oa(e,t);return Rl(r,n,s,rg(o),o.textureFormatFloat,o.textureTypeHalfFloat)}function og(r){return r.downloadTextureFormat}function r0(r,e,t,o){let[n,s]=oa(e,t);return Rl(r,n,s,og(o),r.RGBA,r.UNSIGNED_BYTE)}function ng(r){return r.internalFormatPackedFloat}function o0(r,e,t,o){let[n,s]=yo(e,t);return Rl(r,n,s,ng(o),r.RGBA,r.FLOAT)}function sg(r){return r.internalFormatPackedHalfFloat}function n0(r,e,t,o){let[n,s]=yo(e,t);return Rl(r,n,s,sg(o),r.RGBA,o.textureTypeHalfFloat)}function s0(r,e,t){return ue(r,()=>r.bindBuffer(r.ARRAY_BUFFER,t)),Yh(r,e,"clipSpacePos",t,3,20,0)&&Yh(r,e,"uv",t,2,20,12)}function a0(r,e,t,o,n,s){ue(r,()=>r.bindTexture(r.TEXTURE_2D,e));let a,i,p;n instanceof Uint8Array?(a=new Uint8Array(t*o*4),i=r.UNSIGNED_BYTE,p=r.RGBA):(a=new Float32Array(t*o*4),i=r.FLOAT,p=s.internalFormatPackedFloat),a.set(n),P().getNumber("WEBGL_VERSION")===2?ue(r,()=>r.texSubImage2D(r.TEXTURE_2D,0,0,0,t,o,r.RGBA,i,a)):ue(r,()=>r.texImage2D(r.TEXTURE_2D,0,p,t,o,0,r.RGBA,i,a)),ue(r,()=>r.bindTexture(r.TEXTURE_2D,null))}function i0(r,e,t){ue(r,()=>r.bindTexture(r.TEXTURE_2D,e)),t.data instanceof Uint8Array?P().getNumber("WEBGL_VERSION")===2?ue(r,()=>r.texSubImage2D(r.TEXTURE_2D,0,0,0,t.width,t.height,r.RGBA,r.UNSIGNED_BYTE,t.data)):ue(r,()=>r.texImage2D(r.TEXTURE_2D,0,r.RGBA,t.width,t.height,0,r.RGBA,r.UNSIGNED_BYTE,t.data)):P().getNumber("WEBGL_VERSION")===2?ue(r,()=>r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,t)):ue(r,()=>r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,t)),ue(r,()=>r.bindTexture(r.TEXTURE_2D,null))}function p0(r,e,t,o){let n=r.createBuffer();ue(r,()=>r.bindBuffer(r.PIXEL_PACK_BUFFER,n));let i=4*4*e*t;return ue(r,()=>r.bufferData(r.PIXEL_PACK_BUFFER,i,r.STREAM_READ)),ue(r,()=>r.readPixels(0,0,t,e,r.RGBA,r.FLOAT,0)),ue(r,()=>r.bindBuffer(r.PIXEL_PACK_BUFFER,null)),n}function l0(r,e,t){let o=r,n=new Float32Array(t);return o.bindBuffer(o.PIXEL_PACK_BUFFER,e),o.getBufferSubData(o.PIXEL_PACK_BUFFER,0,n),o.bindBuffer(o.PIXEL_PACK_BUFFER,null),n}function u0(r,e,t,o){let[n,s]=oa(e,t),a=4,i=new Uint8Array(_T(e*t,a));return ue(r,()=>r.readPixels(0,0,n,s,o.downloadTextureFormat,r.UNSIGNED_BYTE,i)),new Float32Array(i.buffer)}function c0(r,e,t,o,n,s,a,i){let p=r,l=new Float32Array(vT(s,a));return p.bindBuffer(p.PIXEL_PACK_BUFFER,e),p.getBufferSubData(p.PIXEL_PACK_BUFFER,0,l),p.bindBuffer(p.PIXEL_PACK_BUFFER,null),l}function m0(r,e,t){let o=new Float32Array(e*t*4);return ue(r,()=>r.readPixels(0,0,t,e,r.RGBA,r.FLOAT,o)),o}var Mp=class{constructor(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];let t=P().getNumber("WEBGL_VERSION");if(e!=null?(this.gl=e,bT(t,e)):this.gl=br(t),e=this.gl,P().getNumber("WEBGL_VERSION")===2){let s=e;this.createVertexArray=()=>ue(s,()=>s.createVertexArray()),this.bindVertexArray=a=>ue(s,()=>s.bindVertexArray(a)),this.deleteVertexArray=a=>ue(s,()=>s.deleteVertexArray(a)),this.getVertexArray=()=>ue(s,()=>s.getParameter(s.VERTEX_ARRAY_BINDING))}else if(e!=null){let s=e.getExtension("OES_vertex_array_object");if(s==null)throw new Error("All WebGL1 implementations are expected to offer OES_vertex_array_object.");this.createVertexArray=()=>ue(e,()=>s.createVertexArrayOES()),this.bindVertexArray=a=>ue(e,()=>s.bindVertexArrayOES(a)),this.deleteVertexArray=a=>ue(e,()=>s.deleteVertexArrayOES(a)),this.getVertexArray=()=>ue(e,()=>e.getParameter(s.VERTEX_ARRAY_BINDING_OES))}let o="WEBGL_color_buffer_float",n="EXT_color_buffer_half_float";if(this.parallelCompilationExtension=this.gl.getExtension("KHR_parallel_shader_compile"),P().getNumber("WEBGL_VERSION")===1){let s="OES_texture_float",a="OES_texture_half_float";if(this.textureFloatExtension=$l(this.gl,s),Er(this.gl,a))this.textureHalfFloatExtension=$l(this.gl,a);else if(P().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(o),Er(this.gl,n))this.colorBufferHalfFloatExtension=$l(this.gl,n);else if(P().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(o="EXT_color_buffer_float",Er(this.gl,o))this.colorBufferFloatExtension=this.gl.getExtension(o);else if(Er(this.gl,n))this.colorBufferHalfFloatExtension=this.gl.getExtension(n);else throw new Error("GL context does not support color renderable floats");this.vertexBuffer=ZT(this.gl),this.indexBuffer=JT(this.gl),this.framebuffer=AT(this.gl),this.textureConfig=El(this.gl,this.textureHalfFloatExtension)}get debug(){return P().getBool("DEBUG")}dispose(){if(this.disposed)return;this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");let e=this.gl;ue(e,()=>e.finish()),ue(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),ue(e,()=>e.deleteFramebuffer(this.framebuffer)),ue(e,()=>e.bindBuffer(e.ARRAY_BUFFER,null)),ue(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)),ue(e,()=>e.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(e,t){return this.throwIfDisposed(),e0(this.gl,e,t,this.textureConfig)}createFloat16MatrixTexture(e,t){return this.throwIfDisposed(),t0(this.gl,e,t,this.textureConfig)}createUnsignedBytesMatrixTexture(e,t){return this.throwIfDisposed(),r0(this.gl,e,t,this.textureConfig)}uploadPixelDataToTexture(e,t){this.throwIfDisposed(),i0(this.gl,e,t)}uploadDenseMatrixToTexture(e,t,o,n){this.throwIfDisposed(),a0(this.gl,e,t,o,n,this.textureConfig)}createFloat16PackedMatrixTexture(e,t){return this.throwIfDisposed(),n0(this.gl,e,t,this.textureConfig)}createPackedMatrixTexture(e,t){return this.throwIfDisposed(),o0(this.gl,e,t,this.textureConfig)}deleteMatrixTexture(e){this.throwIfDisposed(),this.outputTexture===e&&(Zh(this.gl,this.framebuffer),this.outputTexture=null),ue(this.gl,()=>this.gl.deleteTexture(e))}downloadByteEncodedFloatMatrixFromOutputTexture(e,t,o){return this.downloadMatrixDriver(e,()=>u0(this.gl,t,o,this.textureConfig))}downloadPackedMatrixFromBuffer(e,t,o,n,s,a){return c0(this.gl,e,t,o,n,s,a,this.textureConfig)}downloadFloat32MatrixFromBuffer(e,t){return l0(this.gl,e,t)}createBufferFromTexture(e,t,o){this.bindTextureToFrameBuffer(e);let n=p0(this.gl,t,o,this.textureConfig);return this.unbindTextureToFrameBuffer(),n}createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,o;if(P().getBool("WEBGL_FENCE_API_ENABLED")){let n=e,s=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),o=()=>{let a=n.clientWaitSync(s,0,0);return a===n.ALREADY_SIGNALED||a===n.CONDITION_SATISFIED},t=s}else P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(t=this.beginQuery(),this.endQuery(),o=()=>this.isQueryAvailable(t,P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):o=()=>!0;return{query:t,isFencePassed:o}}downloadMatrixFromPackedTexture(e,t,o){return this.downloadMatrixDriver(e,()=>m0(this.gl,t,o))}createProgram(e){this.throwIfDisposed();let t=this.gl;this.vertexShader==null&&(this.vertexShader=YT(t));let o=ST(t);ue(t,()=>t.attachShader(o,this.vertexShader)),ue(t,()=>t.attachShader(o,e)),NT(t,o);let n=Object.assign(o,{vao:this.createVertexArray()});return this.debug&&jc(t,n),n}buildVao(e){this.setProgram(e),this.bindVertexArray(e.vao);let t=this.gl;ue(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),s0(t,e,this.vertexBuffer)}deleteProgram(e){this.throwIfDisposed(),e===this.program&&(this.program=null),e!=null&&(ue(this.gl,()=>this.gl.deleteProgram(e)),this.deleteVertexArray(e.vao))}setProgram(e){this.throwIfDisposed(),this.program=e,this.program!=null&&this.debug&&jc(this.gl,this.program),ue(this.gl,()=>this.gl.useProgram(e))}getUniformLocation(e,t,o=!0){return this.throwIfDisposed(),o?FT(this.gl,e,t):DT(this.gl,e,t)}getAttributeLocation(e,t){return this.throwIfDisposed(),ue(this.gl,()=>this.gl.getAttribLocation(e,t))}getUniformLocationNoThrow(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)}setInputMatrixTexture(e,t,o){this.throwIfDisposed(),this.throwIfNoProgram(),RT(this.gl,e,t,o)}setOutputMatrixTexture(e,t,o){this.setOutputMatrixTextureDriver(e,o,t)}setOutputPackedMatrixTexture(e,t,o){this.throwIfDisposed();let[n,s]=yo(t,o);this.setOutputMatrixTextureDriver(e,n,s)}setOutputMatrixWriteRegion(e,t,o,n){this.setOutputMatrixWriteRegionDriver(o,e,n,t)}setOutputPackedMatrixWriteRegion(e,t,o,n){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){this.program!=null&&jc(this.gl,this.program),Al(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();let e=this.gl;if(this.debug){let t=this.getVertexArray();console.assert(t===this.program.vao,"VAO changed between setProgram and executeProgram!"),this.debugValidate()}ue(e,()=>e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),ue(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=$l(this.gl,P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){let o=this.gl,n=this.getQueryTimerExtensionWebGL2(),s=o.createQuery();return o.beginQuery(n.TIME_ELAPSED_EXT,s),s}let e=this.getQueryTimerExtensionWebGL1(),t=e.createQueryEXT();return e.beginQueryEXT(e.TIME_ELAPSED_EXT,t),t}endQuery(){if(P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){let t=this.gl,o=this.getQueryTimerExtensionWebGL2();t.endQuery(o.TIME_ELAPSED_EXT);return}let e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(e){return await y.repeatedTry(()=>this.disposed||this.isQueryAvailable(e,P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(e,P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}getQueryTime(e,t){if(t===0)return null;if(t===2){let o=this.gl;return o.getQueryParameter(e,o.QUERY_RESULT)/1e6}else{let o=this.getQueryTimerExtensionWebGL1();return o.getQueryObjectEXT(e,o.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(e,t){if(t===0)return!0;if(t===2){let o=this.gl,n=this.getQueryTimerExtensionWebGL2(),s=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(n.GPU_DISJOINT_EXT)),s&&!this.disjoint}else{let o=this.getQueryTimerExtensionWebGL1(),n=o.getQueryObjectEXT(e,o.QUERY_RESULT_AVAILABLE_EXT);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(o.GPU_DISJOINT_EXT)),n&&!this.disjoint}}pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=qV(this.itemsToPoll.map(t=>t.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:o}=this.itemsToPoll[t];o()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}addItemToPoll(e,t){if(this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1)return;let o;"setTimeoutCustom"in P().platform&&(o=P().platform.setTimeoutCustom.bind(P().platform)),y.repeatedTry(()=>(this.pollItems(),this.itemsToPoll.length===0),()=>0,null,o)}bindTextureToFrameBuffer(e){this.throwIfDisposed(),Xc(this.gl,e,this.framebuffer),this.debug&&Al(this.gl)}unbindTextureToFrameBuffer(){this.outputTexture!=null?(Xc(this.gl,this.outputTexture,this.framebuffer),this.debug&&Al(this.gl)):Zh(this.gl,this.framebuffer)}downloadMatrixDriver(e,t){this.bindTextureToFrameBuffer(e);let o=t();return this.unbindTextureToFrameBuffer(),o}setOutputMatrixTextureDriver(e,t,o){this.throwIfDisposed();let n=this.gl;Xc(n,e,this.framebuffer),this.debug&&Al(n),this.outputTexture=e,ue(n,()=>n.viewport(0,0,t,o)),ue(n,()=>n.scissor(0,0,t,o))}setOutputMatrixWriteRegionDriver(e,t,o,n){this.throwIfDisposed(),ue(this.gl,()=>this.gl.scissor(e,t,o,n))}throwIfDisposed(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(this.program==null)throw new Error("No GPU program is currently set.")}};function qV(r){let e=0;for(;e<r.length&&r[e]();++e);return e-1}var Pg={};je(Pg,{addImpl:()=>pg,bincountImpl:()=>Bp,bincountReduceImpl:()=>nm,bitwiseAndImpl:()=>lg,castImpl:()=>ig,ceilImpl:()=>ug,concatImpl:()=>sm,equalImpl:()=>cg,expImpl:()=>dg,expm1Impl:()=>hg,floorDivImpl:()=>xg,floorImpl:()=>gg,gatherNdImpl:()=>am,gatherV2Impl:()=>im,greaterEqualImpl:()=>bg,greaterImpl:()=>yg,lessEqualImpl:()=>vg,lessImpl:()=>_g,linSpaceImpl:()=>pm,logImpl:()=>Tg,maxImpl:()=>lm,maximumImpl:()=>wg,minimumImpl:()=>Cg,multiplyImpl:()=>Ol,negImpl:()=>Sg,notEqualImpl:()=>Ng,prodImpl:()=>Ig,raggedGatherImpl:()=>um,raggedRangeImpl:()=>cm,raggedTensorToTensorImpl:()=>mm,rangeImpl:()=>dm,rsqrtImpl:()=>Eg,scatterImpl:()=>Xr,sigmoidImpl:()=>W0,simpleAbsImpl:()=>ag,sliceImpl:()=>Ag,sparseFillEmptyRowsImpl:()=>fm,sparseReshapeImpl:()=>hm,sparseSegmentReductionImpl:()=>Up,sqrtImpl:()=>q0,squaredDifferenceImpl:()=>Fg,staticRegexReplaceImpl:()=>Dg,stridedSliceImpl:()=>gm,stringNGramsImpl:()=>xm,stringSplitImpl:()=>ym,stringToHashBucketFastImpl:()=>bm,subImpl:()=>Og,tileImpl:()=>_m,topKImpl:()=>vm,transposeImpl:()=>zp,uniqueImpl:()=>Tm});function Q(r,e){Array.isArray(r)||(r=[r]),r.forEach(t=>{t!=null&&y.assert(t.dtype!=="complex64",()=>`${e} does not support complex64 tensors in the CPU backend.`)})}function ag(r){let e=new Float32Array(r.length);for(let t=0;t<r.length;++t)e[t]=Math.abs(r[t]);return e}var KV=r=>{let{x:e}=r.inputs,t=r.backend;Q(e,"abs");let o=new Float32Array(y.sizeFromShape(e.shape)),n=t.data.get(e.dataId).values;return o=ag(n),t.makeOutput(o,e.shape,e.dtype)},d0={kernelName:Ca,backendName:"cpu",kernelFunc:KV};function $e(r){return(e,t,o,n,s)=>{let a=I.assertAndGetBroadcastShape(e,t),i=a.length,p=y.computeStrides(a),l=y.sizeFromShape(a),u=y.getTypedArrayFromDType(s,l),c=e.length,m=t.length,d=y.computeStrides(e),f=y.computeStrides(t),g=I.getBroadcastDims(e,a),h=I.getBroadcastDims(t,a);if(g.length+h.length===0)for(let x=0;x<u.length;++x)u[x]=r(o[x%o.length],n[x%n.length]);else for(let x=0;x<u.length;++x){let b=y.indexToLoc(x,i,p),S=b.slice(-c);g.forEach(D=>S[D]=0);let C=y.locToIndex(S,c,d),$=b.slice(-m);h.forEach(D=>$[D]=0);let A=y.locToIndex($,m,f);u[x]=r(o[C],n[A])}return[u,a]}}function kt(r){let{inputs:e,backend:t}=r,{real:o,imag:n}=e,s=t.data.get(o.dataId).values,a=t.data.get(n.dataId).values,i=t.makeTensorInfo(o.shape,"complex64"),p=t.data.get(i.dataId);return p.complexTensorInfos={real:t.makeTensorInfo(o.shape,"float32",s),imag:t.makeTensorInfo(n.shape,"float32",a)},i}var f0={kernelName:Pa,backendName:"cpu",kernelFunc:kt};function Lp(r,e,t="float32"){if(t==="complex64"){let n=Lp(r,e,"float32"),s=Lp(r,e,"float32");return kt({inputs:{real:n,imag:s},backend:r})}let o=y.makeZerosTypedArray(y.sizeFromShape(e),t);return r.makeTensorInfo(e,t,o)}function Ht(r){let{inputs:e,backend:t}=r,{x:o}=e;return t.incRef(o.dataId),{dataId:o.dataId,shape:o.shape,dtype:o.dtype}}var h0={kernelName:jo,backendName:"cpu",kernelFunc:Ht};function Mr(r){let{inputs:e,backend:t}=r,{input:o}=e,n=t.data.get(o.dataId).complexTensorInfos.real,s=t.data.get(n.dataId).values;return t.makeTensorInfo(n.shape,n.dtype,s)}var g0={kernelName:Oi,backendName:"cpu",kernelFunc:Mr};function ig(r,e,t,o){if(o==="int32"){let n=Int32Array.from(r);return[e,"int32",n]}if(o==="bool"){let n=y.toTypedArray([0],t),[s,a]=$e((i,p)=>i!==p?1:0)(e,[],r,n,"bool");return[a,"bool",s]}throw new Error(`Error in Cast: failed to cast ${t} to ${o}`)}function Lr(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{dtype:s}=o;if(s==="complex64"){if(n.dtype==="complex64")return Ht({inputs:{x:n},backend:t});let u=Lp(t,n.shape,n.dtype),c=Lr({inputs:{x:n},backend:t,attrs:{dtype:"float32"}}),m=kt({inputs:{real:c,imag:u},backend:t});return t.disposeIntermediateTensorInfo(u),t.disposeIntermediateTensorInfo(c),m}if(n.dtype==="complex64"){let u=Mr({inputs:{input:n},backend:t}),c=Lr({inputs:{x:u},backend:t,attrs:{dtype:s}});return t.disposeIntermediateTensorInfo(u),c}if(!y.hasEncodingLoss(n.dtype,s)){let u=Ht({inputs:{x:n},backend:t});return{dataId:u.dataId,shape:u.shape,dtype:s}}let a=t.data.get(n.dataId).values,[i,p,l]=ig(a,n.shape,n.dtype,s);return t.makeTensorInfo(i,p,l)}var x0={kernelName:Ko,backendName:"cpu",kernelFunc:Lr};function Oe(r,e,t,o){return t==null?({inputs:n,backend:s})=>{let{a,b:i}=n,p=s;Q([a,i],r);let l=p.data.get(a.dataId).values,u=p.data.get(i.dataId).values,c=a.dtype==="string"?I.fromUint8ToStringArray(l):l,m=a.dtype==="string"?I.fromUint8ToStringArray(u):u,d=o||a.dtype,[f,g]=e(a.shape,i.shape,c,m,d);return p.makeTensorInfo(g,d,f)}:({inputs:n,backend:s})=>{let{a,b:i}=n,p=s;if(a.dtype==="complex64"||i.dtype==="complex64"){let l=Lr({inputs:{x:a},backend:p,attrs:{dtype:"complex64"}}),u=p.data.get(l.dataId),c=u.complexTensorInfos.real,m=u.complexTensorInfos.imag,d=p.data.get(c.dataId).values,f=p.data.get(m.dataId).values,g=Lr({inputs:{x:i},backend:p,attrs:{dtype:"complex64"}}),h=p.data.get(g.dataId),x=h.complexTensorInfos.real,b=h.complexTensorInfos.imag,S=p.data.get(x.dataId).values,C=p.data.get(b.dataId).values,[$,A,D]=t(a.shape,i.shape,d,f,S,C),R=p.makeTensorInfo(D,"float32",$),M=p.makeTensorInfo(D,"float32",A),L=kt({inputs:{real:R,imag:M},backend:p});return p.disposeIntermediateTensorInfo(l),p.disposeIntermediateTensorInfo(g),p.disposeIntermediateTensorInfo(R),p.disposeIntermediateTensorInfo(M),L}else{let l=p.data.get(a.dataId).values,u=p.data.get(i.dataId).values,c=o||a.dtype,[m,d]=e(a.shape,i.shape,l,u,c);return p.makeTensorInfo(d,c,m)}}}function Vp(r){return(e,t,o,n,s,a)=>{let i=I.assertAndGetBroadcastShape(e,t),p=y.sizeFromShape(i),l=i.length,u=y.computeStrides(i),c=y.getTypedArrayFromDType("float32",p),m=y.getTypedArrayFromDType("float32",p),d=I.getBroadcastDims(e,i),f=I.getBroadcastDims(t,i),g=I.mergeRealAndImagArrays(o,n),h=I.mergeRealAndImagArrays(s,a),x=e.length,b=y.computeStrides(e),S=t.length,C=y.computeStrides(t);if(d.length+f.length===0)for(let $=0;$<c.length;$++){let A=$%g.length,D=$%h.length,R=r(g[A*2],g[A*2+1],h[D*2],h[D*2+1]);c[$]=R.real,m[$]=R.imag}else for(let $=0;$<c.length;$++){let A=y.indexToLoc($,l,u),D=A.slice(-x);d.forEach(W=>D[W]=0);let R=y.locToIndex(D,x,b),M=A.slice(-S);f.forEach(W=>M[W]=0);let L=y.locToIndex(M,S,C),B=r(g[R*2],g[R*2+1],h[L*2],h[L*2+1]);c[$]=B.real,m[$]=B.imag}return[c,m,i]}}var pg=$e((r,e)=>r+e),jV=Vp((r,e,t,o)=>({real:r+t,imag:e+o})),_o=Oe(ko,pg,jV),y0={kernelName:ko,backendName:"cpu",kernelFunc:_o};function Bp(r,e,t,o,n){let s=y.sizeFromShape(o),a=y.makeZerosTypedArray(n,t);for(let i=0;i<r.length;i++){let p=r[i];if(p<0)throw new Error("Input x must be non-negative!");p>=n||(s>0?a[p]+=e[i]:a[p]+=1)}return a}function nm(r,e,t,o=!1){let n=r.shape[0],s=r.shape[1],a=me([n,t],e.dtype);for(let i=0;i<n;i++)for(let p=0;p<s;p++){let l=r.get(i,p);if(l<0)throw new Error("Input x must be non-negative!");l>=t||(o?a.set(1,i,l):e.size>0?a.set(a.get(i,l)+e.get(i,p),i,l):a.set(a.get(i,l)+1,i,l))}return a}var lg=$e((r,e)=>r&e),XV=Oe(Rn,lg),b0={kernelName:Rn,backendName:"cpu",kernelFunc:XV};function At(r){return(e,t,o)=>{let n=y.getArrayFromDType(t,e.length);for(let s=0;s<e.length;++s)n[s]=r(e[s],o);return n}}function be(r,e,t){let o=At(e);return pr(r,o,t)}function pr(r,e,t){return({inputs:o,attrs:n,backend:s})=>{let{x:a}=o;Q(a,r);let i=s,p=i.data.get(a.dataId).values,l;if(a.dtype==="string"){if(!Array.isArray(p))throw new Error("String tensor's value was not an instance of Array");l=I.fromUint8ToStringArray(p)}else l=p;let u=t||a.dtype,c=e(l,u,n);return i.makeTensorInfo(a.shape,u,c)}}var ug=At(r=>Math.ceil(r)),QV=pr(On,ug),_0={kernelName:On,backendName:"cpu",kernelFunc:QV};function sm(r,e,t,o){let n=y.getArrayFromDType(t,y.sizeFromShape(e));if(o&&t!=="string"){let s=0;r.forEach(a=>{let i=y.sizeFromShape(a.shape);n.set(a.vals,s),s+=i})}else{let s=0;r.forEach(a=>{let i=t==="string"?I.fromUint8ToStringArray(a.vals):a.vals,p=0;for(let l=0;l<a.shape[0];++l){let u=l*e[1]+s;for(let c=0;c<a.shape[1];++c)n[u+c]=i[p++]}s+=a.shape[1]})}return n}var cg=$e((r,e)=>r===e?1:0),mg=Oe(Un,cg,null,"bool"),v0={kernelName:Un,backendName:"cpu",kernelFunc:mg};var dg=At(r=>Math.exp(r)),fg=pr(Wn,dg,"float32"),T0={kernelName:Wn,backendName:"cpu",kernelFunc:fg};var hg=At(r=>Math.expm1(r)),YV=pr(Gn,hg),w0={kernelName:Gn,backendName:"cpu",kernelFunc:YV};var gg=At(r=>Math.floor(r)),ZV=pr(Hn,gg),C0={kernelName:Hn,backendName:"cpu",kernelFunc:ZV};var xg=$e((r,e)=>Math.floor(r/e)),JV=Oe(qn,xg,null,"int32"),S0={kernelName:qn,backendName:"cpu",kernelFunc:JV};function am(r,e,t,o,n,s,a,i,p){let l=me([o,s],t);for(let u=0;u<o;u++){let c=[],m=0;for(let d=0;d<n;d++){let f=r[u*n+d];m+=f*a[d],c.push(f)}if(m<0||m>=p/s)throw new Error(`Invalid indices: ${c} does not index into ${i}`);for(let d=0;d<s;d++)l.values[u*s+d]=e.get(...e.indexToLoc(m*s+d))}return l}function im(r,e,t){let o=me(t,r.dtype);for(let n=0;n<o.size;++n){let a=o.indexToLoc(n).slice(),i=a[0],p=a[2],l=e.locToIndex([i,p]);a[2]=e.values[l];let u=r.locToIndex(a);0<=u&&u<r.values.length&&(o.values[n]=r.values[u])}return o}var yg=$e((r,e)=>r>e?1:0),e3=Oe(Kn,yg,null,"bool"),N0={kernelName:Kn,backendName:"cpu",kernelFunc:e3};var bg=$e((r,e)=>r>=e?1:0),t3=Oe(jn,bg,null,"bool"),I0={kernelName:jn,backendName:"cpu",kernelFunc:t3};var _g=$e((r,e)=>r<e?1:0),r3=Oe(Zn,_g,null,"bool"),k0={kernelName:Zn,backendName:"cpu",kernelFunc:r3};var vg=$e((r,e)=>r<=e?1:0),o3=Oe(Jn,vg,null,"bool"),E0={kernelName:Jn,backendName:"cpu",kernelFunc:o3};function pm(r,e,t){let o=(e-r)/(t-1),n=y.makeZerosTypedArray(t,"float32");n[0]=r;for(let s=1;s<n.length;s++)n[s]=n[s-1]+o;return n}var Tg=At(r=>Math.log(r)),n3=pr(es,Tg),$0={kernelName:es,backendName:"cpu",kernelFunc:n3};function lm(r,e,t,o){let n=y.getTypedArrayFromDType(o,y.sizeFromShape(t));for(let s=0;s<n.length;++s){let a=s*e,i=r[a];for(let p=0;p<e;++p){let l=r[a+p];(Number.isNaN(l)||l>i)&&(i=l)}n[s]=i}return n}var wg=$e((r,e)=>Math.max(r,e)),s3=Oe(ss,wg),A0={kernelName:ss,backendName:"cpu",kernelFunc:s3};var Cg=$e((r,e)=>Math.min(r,e)),a3=Oe(as,Cg),F0={kernelName:as,backendName:"cpu",kernelFunc:a3};var Ol=$e((r,e)=>r*e),i3=Vp((r,e,t,o)=>({real:r*t-e*o,imag:r*o+e*t})),ia=Oe(ps,Ol,i3),D0={kernelName:ps,backendName:"cpu",kernelFunc:ia};function Sg(r,e,t){let o=y.createScalarValue(-1,t);return Ol([],e,o,r,t)}function p3(r){let{inputs:e,backend:t}=r,{x:o}=e;Q(o,"neg");let n=t.data.get(o.dataId).values,[s,a]=Sg(n,o.shape,o.dtype);return t.makeTensorInfo(a,o.dtype,s)}var R0={kernelName:vi,backendName:"cpu",kernelFunc:p3};var Ng=$e((r,e)=>r!==e?1:0),l3=Oe(ls,Ng,null,"bool"),O0={kernelName:ls,backendName:"cpu",kernelFunc:l3};function zp(r,e,t,o,n){let s=e.length,a=y.sizeFromShape(e),i=y.computeStrides(e),p=y.computeStrides(n),l=y.getTypedArrayFromDType(t,y.sizeFromShape(n));for(let u=0;u<a;++u){let c=y.indexToLoc(u,s,i),m=new Array(c.length);for(let f=0;f<m.length;f++)m[f]=c[o[f]];let d=y.locToIndex(m,s,p);l[d]=r[u]}return l}function pt(r){let{inputs:e,attrs:t,backend:o}=r,{x:n}=e,{perm:s}=t;Q(n,"transpose");let a=n.shape.length,i=new Array(a);for(let c=0;c<i.length;c++)i[c]=n.shape[s[c]];let p=o.data.get(n.dataId).values,l=zp(p,n.shape,n.dtype,s,i);return{dataId:o.write(l,i,n.dtype),shape:i,dtype:n.dtype}}var P0={kernelName:Qo,backendName:"cpu",kernelFunc:pt};function Ig(r,e,t,o){let[n,s]=I.computeOutAndReduceShapes(r,o),a=bt(e,"int32"),i=y.makeZerosTypedArray(y.sizeFromShape(n),a),p=y.sizeFromShape(s);for(let l=0;l<i.length;++l){let u=l*p,c=1;for(let m=0;m<p;++m)c*=t[u+m];i[l]=c}return{outVals:i,outShape:n,outDtype:a}}function u3(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,keepDims:a}=o;Q(n,"prod");let i=n.shape.length,p=y.parseAxisParam(s,n.shape),l=I.getAxesPermutation(p,i),u=p,c=n,m=[];l!=null&&(c=pt({inputs:{x:n},backend:t,attrs:{perm:l}}),m.push(c),u=I.getInnerMostAxes(u.length,i));let d=t.data.get(c.dataId).values,{outVals:f,outShape:g,outDtype:h}=Ig(c.shape,c.dtype,d,u),x=g;return a&&(x=I.expandShapeToKeepDim(g,p)),m.forEach(b=>t.disposeIntermediateTensorInfo(b)),t.makeTensorInfo(x,h,f)}var M0={kernelName:$i,backendName:"cpu",kernelFunc:u3};function c3(r,e,t){r.forEach((o,n)=>{if(o<0||o>=t){let s=y.indexToLoc(n,e.length,y.computeStrides(e)).join(",");throw new Error(`indices[${s}] = ${o} is not in [0, ${t})`)}})}function m3(r,e){for(let t=0;t<r.length;++t){let o=r[t],n=t===r.length-1?e:r[t+1].length;if(o.length===0)throw new Error("Ragged splits may not be empty");if(o[0]<0)throw new Error("Ragged splits must be non-negative");if(o[o.length-1]>n)throw new Error("Ragged splits must not point past values");for(let s=1;s<o.length;++s)if(o[s-1]>o[s])throw new Error("Ragged splits must be sorted in ascending order")}}function d3(r,e,t,o){let n=[],s=0,a=e.length-1+t.length,i=new Array(a).fill(null).map(()=>[0]);m3(t,o);let p=1;for(let l=0;l<e.length-1;++l){p*=e[l];let u=e[l+1];for(let c=1;c<p+1;++c)i[l].push(c*u)}for(let l=0;l<r.length;++l){let u=r[l],c=r[l]+1;for(let m=0;m<t.length;++m){let d=t[m],f=m+e.length-1;if(f>=0){let g=i[f],h=g[g.length-1]-d[u];for(let x=u;x<c;++x)i[f].push(d[x+1]+h)}u=d[u],c=d[c]}c!==u&&(n.push([u,c]),s+=c-u)}return{outSplits:i,valueSlices:n,numValues:s}}function f3(r){let e=[];for(let t=0;t<r.length;++t){let o=r[t].length,n=y.getArrayFromDType("int32",o);e.push(n),r[t].forEach((s,a)=>n[a]=s)}return e}function L0(r,e){let t=r.slice(0,e);for(;t.length<e;)t.push(1);for(let o=e;o<r.length;o++)t[e-1]*=r[o];return t}function h3(r,e,t,o,n,s){let a=L0(e,2)[1],i=L0(s,2)[1],p=0;for(let l of t)for(let u=l[0];u<l[1];++u){for(let c=0;c<o;++c)n[p*i+c]=r[u*a+c];++p}}function g3(r,e,t,o,n){let s=e.slice();s[0]=n;let a=y.getArrayFromDType(t,y.sizeFromShape(s)),i=r.length,p=i===0?0:i/e[0];return h3(r,e,o,p,a,s),[a,s]}function um(r,e,t,o,n,s,a,i){if(r.length===0)throw new Error("paramsNestedSplits must be non empty");if(e[0].length===0)throw new Error("Split tensors must not be scalars");let p=e[0][0]-1;if(c3(s,a,p),o.length===0)throw new Error("params.rank must be nonzero");let l=o[0],{outSplits:u,valueSlices:c,numValues:m}=d3(s,a,r,l),d=f3(u),f=g3(t,o,n,c,m);return[d,f[0],f[1]]}var V0=2147483647;function cm(r,e,t,o,n,s,a){if(e.length>1)throw new Error("starts must be a scalar or vector");if(n.length>1)throw new Error("limits must be a scalar or vector");if(a.length>1)throw new Error("deltas must be a scalar or vector");let i=e.length===0,p=n.length===0,l=a.length===0,u=[];i||u.push(e[0]),p||u.push(n[0]),l||u.push(a[0]);for(let h=1;h<u.length;++h)if(u[h]!==u[h-1])throw new Error("starts, limits, and deltas must have the same shape");let c=u.length===0?1:u[0],m=y.getArrayFromDType("int32",c+1);m[0]=0;for(let h=0;h<c;++h){let x=i?r[0]:r[h],b=p?o[0]:o[h],S=l?s[0]:s[h];if(S===0)throw new Error("Requires delta != 0");let C;if(S>0&&b<x||S<0&&b>x)C=0;else if(C=Math.ceil(Math.abs((b-x)/S)),C>V0)throw new Error(`Requires ((limit - start) / delta) <= ${V0}`);m[h+1]=m[h]+C}let d=m[c],f=y.getArrayFromDType(t,d),g=0;for(let h=0;h<c;++h){let x=m[h+1]-m[h],b=i?r[0]:r[h],S=l?s[0]:s[h];for(let C=0;C<x;++C)f[g++]=b,b+=S}return[m,f]}var Vr=I.RowPartitionType,kg=class r{constructor(e,t,o,n,s,a,i,p,l,u){this.shape=e,this.shapeShape=t,this.values=o,this.valuesShape=n,this.valuesDType=s,this.defaultValue=a,this.defaultValueShape=i,this.rowPartitionValues=p,this.rowPartitionValuesShapes=l,this.rowPartitionTypes=I.getRowPartitionTypesHelper(u),this.raggedRank=I.getRaggedRank(this.rowPartitionTypes)}getRowPartitionTypeByDimension(e){return this.rowPartitionTypes[0]===Vr.FIRST_DIM_SIZE?this.rowPartitionTypes[e+1]:this.rowPartitionTypes[e]}getRowPartitionTensor(e){return this.rowPartitionTypes[0]===Vr.FIRST_DIM_SIZE?this.rowPartitionValues[e+1]:this.rowPartitionValues[e]}getMaxWidth(e){let t=this.getRowPartitionTensor(e-1);switch(this.getRowPartitionTypeByDimension(e-1)){case Vr.VALUE_ROWIDS:return r.getMaxWidthValueRowID(t);case Vr.ROW_SPLITS:return r.getMaxWidthRowSplit(t);default:throw new Error(`Cannot handle partition type ${Vr[this.getRowPartitionTypeByDimension(e-1)]}`)}}static getMaxWidthRowSplit(e){let t=e.length;if(t===0||t===1)return 0;let o=0;for(let n=0;n<t-1;++n){let s=e[n+1]-e[n];s>o&&(o=s)}return o}static getMaxWidthValueRowID(e){let t=e.length;if(t===0)return 0;let o=0,n=e[0],s=0;for(let a=1;a<t;++a){let i=e[a];i!==n&&(n=i,s=Math.max(a-o,s),o=a)}return Math.max(t-o,s)}tensorShapeFromTensor(e,t,o=!0){if(t.length===0){if(e[0]===-1)return[];throw new Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return z0(e,o)}calculateOutputSize(e){let t=this.valuesShape,o=this.defaultValueShape;I.validateDefaultValueShape(o,t);let n=this.tensorShapeFromTensor(this.shape,this.shapeShape),a=I.combineRaggedTensorToTensorShapes(this.raggedRank,n,t);a[0]<0&&(a[0]=e);for(let i=1;i<=this.raggedRank;++i)a[i]<0&&(a[i]=this.getMaxWidth(i));return a}calculateFirstParentOutputIndex(e,t,o){let n=Math.min(e,o),s=[],a=0;for(let i=0;i<n;++i,a+=t)s.push(a);for(let i=n;i<e;++i)s.push(-1);return y.assert(s.length===e,()=>"Final length of result must be equal to firstDimension."),s}calculateOutputIndexRowSplit(e,t,o,n){let s=e.length,a=[];for(let i=0;i<s-1;++i){let p=e[i+1]-e[i],l=Math.min(n,p),u=t[i];u===-1&&(l=0);for(let c=0;c<l;++c)a.push(u),u+=o;for(let c=0;c<p-l;++c)a.push(-1)}if(s>0&&a.length!==e[s-1])throw new Error("Invalid row split size.");return a}calculateOutputIndexValueRowID(e,t,o,n){let s=e.length,a=[];if(s===0)return[];let i=0,p=e[0];if(p>=t.length)throw new Error(`Got currentValueRowId=${p}, which is not less than ${t.length}`);let l=t[p];a.push(l);for(let u=1;u<s;++u){let c=e[u];if(c===p)l>=0&&(++i,i<n?l+=o:l=-1);else{if(i=0,p=c,c>=t.length)throw new Error(`Got nextValueRowId=${c} which is not less than ${t.length}`);l=t[c]}a.push(l)}if(a.length!==e.length)throw new Error("Invalid row ids.");return a}calculateOutputIndex(e,t,o,n){let s=this.getRowPartitionTensor(e),a=this.getRowPartitionTypeByDimension(e);switch(a){case Vr.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(s,t,o,n);case Vr.ROW_SPLITS:if(s.length-1>t.length)throw new Error(`Row partition size is greater than output size: ${s.length-1} > ${t.length}`);return this.calculateOutputIndexRowSplit(s,t,o,n);default:throw new Error(`Unsupported partition type: ${Vr[a]}`)}}getFirstDimensionSize(){let e=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw new Error("No row_partition_types given.");let t=this.rowPartitionTypes[0];switch(t){case Vr.FIRST_DIM_SIZE:return e[0];case Vr.VALUE_ROWIDS:throw new Error("Cannot handle VALUE_ROWIDS in first dimension.");case Vr.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw new Error(`Cannot handle type ${Vr[t]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw new Error("Invalid first partition input. Tensor requires at least one element.");let t=this.getFirstDimensionSize(),o=this.calculateOutputSize(t),n=new Array(this.raggedRank+1);n[n.length-1]=1;for(let p=n.length-2;p>=0;--p)n[p]=n[p+1]*o[p+1];let s=z0(o,!1),a=y.getArrayFromDType(this.valuesDType,y.sizeFromShape(s));if(n[0]*o[0]>0){let p=this.calculateFirstParentOutputIndex(t,n[0],o[0]);for(let l=1;l<=this.raggedRank;++l)p=this.calculateOutputIndex(l-1,p,n[l],o[l]);this.setOutput(this.raggedRank,p,a,s)}return[s,a]}setOutput(e,t,o,n){if(o.length===0)return;let s=this.values,a=o,i=n.slice();i=i.slice(e+1);let p=y.sizeFromShape(i),l=t.length,u=this.defaultValue;if(u.length!==p&&u.length!==1){let f=this.defaultValueShape;Se(()=>{let g=z(u,f);u=on(g,i).dataSync()})}let c=0,m=0,d=0;for(let f=0;f<=l;++f){let g=f<l?t[f]:-1;if(g===d){++d;continue}if(m<d){let h=s.subarray(c*p),x=a.subarray(m*p),b=(d-m)*p;B0(x,h,b)}if(f>=l){let h=o.length;g=Math.floor(h/p)}if(g>d)if(this.defaultValue.length===1)a.subarray(d*p,g*p).fill(this.defaultValue[0]),d=g;else for(;g>d;){let h=a.slice(d*p);B0(h,u,p),++d}g<0?(c=f+1,m=d):(c=f,m=d,d=m+1)}}};function B0(r,e,t){for(let o=0;o<t;o++)r[o]=e[o]}function z0(r,e){let t=[];for(let o of r){if(o<0){if(!e)throw new Error(`Dimension ${o} must be >= 0`);if(o<-1)throw new Error(`Dimension ${o} must be >= -1`);o=-1}t.push(o)}return t}function mm(r,e,t,o,n,s,a,i,p,l){return new kg(r,e,t,o,n,s,a,i,p,l).compute()}function dm(r,e,t,o){let n=r===e,s=r<e&&t<0,a=e<r&&t>1;if(n||s||a)return y.makeZerosTypedArray(0,o);let i=Math.abs(Math.ceil((e-r)/t)),p=y.makeZerosTypedArray(i,o);e<r&&t===1&&(t=-1),p[0]=r;for(let l=1;l<p.length;l++)p[l]=p[l-1]+t;return p}var Eg=At(r=>1/Math.sqrt(r)),x3=pr(hs,Eg),U0={kernelName:hs,backendName:"cpu",kernelFunc:x3};function Xr(r,e,t,o,n,s,a,i,p,l){let u=[o/n,n],c=r.values,m=e.values;if(o===0)return me(t,e.dtype);let d=p instanceof Le?p:me(u,e.dtype);typeof p=="string"||typeof p=="number"?d.values.fill(p):typeof p=="boolean"&&d.values.fill(+p);for(let f=0;f<s;f++){let g=[],h=0;for(let x=0;x<a;x++){let b=c[f*a+x];g.push(b),h+=b*i[x]}if(h<0||h>=o/n)throw new Error(`Invalid indices: ${g} does not index into ${t}`);for(let x=0;x<n;x++)l?d.values[h*n+x]+=m[f*n+x]:d.values[h*n+x]=e.rank===0?m[0]:m[f*n+x]}return d}var W0=At(r=>1/(1+Math.exp(-r))),$g=be(_s,r=>1/(1+Math.exp(-r))),G0={kernelName:_s,backendName:"cpu",kernelFunc:$g};function Ag(r,e,t,o,n){let s=$t.isSliceContinous(o,e,t),a=y.sizeFromShape(t),i=y.computeStrides(o);if(s){let c=$t.computeFlatOffset(e,i);return n==="string"?r.slice(c,c+a):r.subarray(c,c+a)}let p=n==="string"?I.fromUint8ToStringArray(r):r,l=me(o,n,p),u=me(t,n);for(let c=0;c<u.size;++c){let m=u.indexToLoc(c),d=m.map((f,g)=>f+e[g]);u.set(l.get(...d),...m)}return n==="string"?I.fromStringArrayToUint8(u.values):u.values}function Br(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{begin:s,size:a}=o;Q(n,"slice");let[i,p]=$t.parseSliceParams(n,s,a);$t.assertParamsValid(n,i,p);let l=t.data.get(n.dataId).values,u=Ag(l,i,p,n.shape,n.dtype);return t.makeTensorInfo(p,n.dtype,u)}var H0={kernelName:Gi,backendName:"cpu",kernelFunc:Br};function fm(r,e,t,o,n,s,a){let i=e[0],p=s[0],l=new Array(p),u=new Array(i),c=e[1];if(p===0){if(i!==0)throw new Error(I.getSparseFillEmptyRowsIndicesDenseShapeMismatch(i));let h=y.getArrayFromDType(t,0),x=y.getArrayFromDType(n,0);return[h,[0,c],x,l,u]}let m=!0,d=0,f=new Array(p).fill(0);for(let h=0;h<i;++h){let x=r[h*c];if(x<0)throw new Error(I.getSparseFillEmptyRowsNegativeIndexErrorMessage(h,x));if(x>=p)throw new Error(I.getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(h,x,p));++f[x],m=m&&x>=d,d=x}let g=!0;for(let h=0;h<p;++h){let x=f[h]===0;l[h]=x,g=g&&!x,f[h]=Math.max(f[h],1),h>0&&(f[h]+=f[h-1])}if(g&&m){let h=r,x=o;for(let b=0;b<i;++b)u[b]=b;return[h,[i,c],x,l,u]}else{let h=f[p-1],x=y.getArrayFromDType(t,h*c),b=y.getArrayFromDType(n,h),S=new Array(p).fill(0);for(let C=0;C<i;++C){let $=r[C*c],A=S[$],D=($===0?0:f[$-1])+A;S[$]++;for(let R=0;R<c;++R)x[D*c+R]=r[C*c+R];b[D]=o[C],u[C]=D}for(let C=0;C<p;++C)if(S[C]===0){let A=C===0?0:f[C-1];x[A*c+0]=C;for(let D=1;D<c;++D)x[A*c+D]=0;b[A]=a}return[x,[h,c],b,l,u]}}function hm(r,e,t,o,n){let s=y.sizeFromShape(o),a=e[0],i=n.length,p=[],l=1,u=-1;for(let h=0;h<i;++h){let x=n[h];if(x===-1){if(u!==-1)throw new Error(I.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(u,h));u=h,p.push(1)}else{if(x<0)throw new Error(I.getSparseReshapeNegativeOutputDimErrorMessage(h,x));l*=x,p.push(x)}}if(u!==-1){if(l<=0)throw new Error(I.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage());let h=Math.trunc(s/l);if(l*h!==s)throw new Error(I.getSparseReshapeInputOutputMultipleErrorMessage(o,p));p[u]=h}if(y.sizeFromShape(p)!==s)throw new Error(I.getSparseReshapeInputOutputMismatchErrorMessage(o,p));let m=o.length,d=[];if(m>0){d[m-1]=1;for(let h=m-2;h>=0;--h)d[h]=d[h+1]*o[h+1]}let f=[];if(i>0){f[i-1]=1;for(let h=i-2;h>=0;--h)f[h]=f[h+1]*p[h+1]}let g=y.getArrayFromDType(t,a*i);for(let h=0;h<a;++h){let x=0;for(let b=0;b<m;++b)x+=r[h*m+b]*d[b];for(let b=0;b<i;++b)g[h*i+b]=Math.trunc(x/f[b]),x%=f[b]}return[g,[a,i],p]}function Up(r,e,t,o,n,s=!1,a=0){let i=o.length,p=[e[0],r.length/e[0]],l=p[1],c=i>0?n[i-1]+1:0;if(c<0)throw new Error(I.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let m=e.slice();m[0]=c;let d=m.reduce((S,C)=>S*C,1),f=y.getArrayFromDType(t,d);if(i===0)return c>0&&f.fill(a),[f,m];if(c<=0)throw new Error(I.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let g=0,h=1,x=0,b=n[g];for(;;){let S=0;if(h<i){if(S=n[h],b===S){++h;continue}if(b>=S)throw new Error(I.getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage())}if(b<0||b>=c)throw new Error(I.getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(b,c));b>x&&f.fill(a,x*l,b*l);for(let C=g;C<h;++C){let $=o[C];if($<0||$>=p[0])throw new Error(I.getSparseSegmentReductionIndicesOutOfRangeErrorMessage(C,o[C],p[0]));for(let A=0;A<l;A++)f[b*l+A]+=r[$*l+A]}if(s)for(let C=0;C<l;C++)f[b*l+C]/=h-g;if(g=h,++h,x=b+1,b=S,h>i)break}return x<c&&f.fill(a,x*l,c*l),[f,m]}var q0=At(r=>Math.sqrt(r)),y3=be(Ts,r=>Math.sqrt(r)),K0={kernelName:Ts,backendName:"cpu",kernelFunc:y3};var Fg=$e((r,e)=>{let t=r-e;return t*t}),b3=Oe(ws,Fg),j0={kernelName:ws,backendName:"cpu",kernelFunc:b3};var Dg=At((r,e)=>{let{pattern:t,replaceGlobal:o,rewrite:n}=e;return r.replace(new RegExp(t,o?"g":""),n)}),_3=pr(Cs,Dg),X0={kernelName:Cs,backendName:"cpu",kernelFunc:_3};function gm(r,e,t,o){let n=me(r,e.dtype);for(let s=0;s<n.size;s++){let a=n.indexToLoc(s),i=new Array(a.length);for(let p=0;p<i.length;p++)i[p]=a[p]*t[p]+o[p];n.set(e.get(...i),...a)}return n}var Rg=class{constructor(e,t,o,n,s,a){this.separator=y.encodeString(e),this.nGramWidths=t,this.leftPad=y.encodeString(o),this.rightPad=y.encodeString(n),this.padWidth=s,this.preserveShort=a}getPadWidth(e){return Math.min(this.padWidth<0?e-1:this.padWidth,e-1)}getNumNGrams(e,t){let o=this.getPadWidth(t);return Math.max(0,e+2*o-t+1)}createNGrams(e,t,o,n,s,a){for(let i=0;i<s;++i){let p=this.getPadWidth(a),l=Math.max(0,p-i),u=Math.max(0,p-(s-(i+1))),c=a-(l+u),m=t+(l>0?0:i-p),d=0;d+=l*this.leftPad.length;for(let b=0;b<c;++b)d+=e[m+b].length;d+=u*this.rightPad.length;let f=l+u+c-1;d+=f*this.separator.length,o[n+i]=new Uint8Array(d);let g=o[n+i],h=0,x=b=>b.forEach(S=>g[h++]=S);for(let b=0;b<l;++b)x(this.leftPad),x(this.separator);for(let b=0;b<c-1;++b)x(e[m+b]),x(this.separator);if(c>0){x(e[m+c-1]);for(let b=0;b<u;++b)x(this.separator),x(this.rightPad)}else{for(let b=0;b<u-1;++b)x(this.rightPad),x(this.separator);x(this.rightPad)}}}compute(e,t){let o=e.length,n=t.length;if(n>0){let p=t[0];if(p!==0)throw new Error(`First split value must be 0, got ${p}`);for(let l=1;l<n;++l){let u=t[l]>=p;if(u=u&&t[l]<=o,!u)throw new Error(`Invalid split value ${t[l]}, must be in [${p}, ${o}]`);p=t[l]}if(p!==o)throw new Error(`Last split value must be data size. Expected ${o}, got ${p}`)}let s=n-1,a=y.getArrayFromDType("int32",n);if(o===0||n===0){let p=new Array(o);for(let l=0;l<=s;++l)a[l]=0;return[p,a]}a[0]=0;for(let p=1;p<=s;++p){let l=t[p]-t[p-1],u=0;this.nGramWidths.forEach(c=>{u+=this.getNumNGrams(l,c)}),this.preserveShort&&l>0&&u===0&&(u=1),a[p]=a[p-1]+u}let i=new Array(a[s]);for(let p=0;p<s;++p){let l=t[p],u=a[p];if(this.nGramWidths.forEach(c=>{let m=t[p+1]-t[p],d=this.getNumNGrams(m,c);this.createNGrams(e,l,i,u,d,c),u+=d}),this.preserveShort&&u===a[p]){let c=t[p+1]-t[p];if(c===0)continue;let m=c+2*this.padWidth;this.createNGrams(e,l,i,u,1,m)}}return[i,a]}};function xm(r,e,t,o,n,s,a,i){return new Rg(t,o,n,s,a,i).compute(r,e)}function v3(r,e,t,o){if(!r.length)return;if(e.length===0){for(let s=0;s<r.length;++s)o.push(r.subarray(s,s+1));return}if(e.length===1){let s=e[0],a=r.indexOf(s);for(;a!==-1;){let i=r.subarray(0,a);(!t||i.length!==0)&&o.push(i),r=r.subarray(a+1),a=r.indexOf(s)}(!t||r.length!==0)&&o.push(r);return}let n=0;for(let s=0;s<r.length+1;s++)if(s===r.length||e.indexOf(r[s])!==-1){let a=r.subarray(n,s);(!t||a.length!==0)&&o.push(a),n=s+1}}function ym(r,e,t){let o=r.length,n=[],s=0,a=0,i=new Array(o);for(let m=0;m<o;++m){let d=n.length;v3(r[m],e,t,n);let f=n.length-d;i[m]=f,s+=f,a=Math.max(a,f)}let p=y.getArrayFromDType("int32",s*2),l=new Array(s),u=[o,a],c=0;for(let m=0;m<o;++m)for(let d=0;d<i[m];++d)p[c*2]=m,p[c*2+1]=d,l[c]=n[c],++c;return[p,l,u]}function bm(r,e){let t=y.getArrayFromDType("int32",r.length);for(let o=0;o<r.length;++o)t[o]=y.fingerPrint64(r[o]).modulo(e).getLowBitsUnsigned();return t}var Og=$e((r,e)=>r-e),T3=Vp((r,e,t,o)=>({real:r-t,imag:e-o})),Pl=Oe(Ss,Og,T3),Q0={kernelName:Ss,backendName:"cpu",kernelFunc:Pl};function _m(r,e){let t=new Array(r.rank);for(let n=0;n<t.length;n++)t[n]=r.shape[n]*e[n];let o=me(t,r.dtype);for(let n=0;n<o.values.length;++n){let s=o.indexToLoc(n),a=new Array(r.rank);for(let p=0;p<a.length;p++)a[p]=s[p]%r.shape[p];let i=r.locToIndex(a);o.values[n]=r.values[i]}return o}var Ml=(r,e)=>{let t=e.value-r.value;return t===0?r.index-e.index:t};function Y0(r,e,t=0,o=r.length-1){for(;o>t;){if(o-t>600){let i=o-t+1,p=e-t+1,l=Math.log(i),u=.5*Math.exp(2*l/3),c=.5*Math.sqrt(l*u*(i-u)/i)*Math.sign(p-i/2),m=Math.max(t,Math.floor(e-p*u/i+c)),d=Math.min(o,Math.floor(e+(i-p)*u/i+c));Y0(r,e,m,d)}let n=r[e],s=t,a=o;for(y.swap(r,t,e),Ml(r[o],n)>0&&y.swap(r,t,o);s<a;){for(y.swap(r,s,a),s++,a--;Ml(r[s],n)<0;)s=s+1;for(;Ml(r[a],n)>0;)a=a-1}Ml(r[t],n)===0?y.swap(r,t,a):(a=a+1,y.swap(r,a,o)),a<=e&&(t=a+1),e<=a&&(o=a-1)}}function vm(r,e,t,o,n){let s=e[e.length-1],[a,i]=[r.length/s,s],p=y.getTypedArrayFromDType(t,a*o),l=y.getTypedArrayFromDType("int32",a*o);for(let c=0;c<a;c++){let m=c*i,d=r.subarray(m,m+i),f=new Array(d.length);d.forEach((b,S)=>f[S]={value:b,index:S}),o<f.length&&(Y0(f,o),f=f.slice(0,o)),n&&f.sort(Ml);let g=c*o,h=p.subarray(g,g+o),x=l.subarray(g,g+o);for(let b=0;b<o;b++)h[b]=f[b].value,x[b]=f[b].index}let u=e.slice();return u[u.length-1]=o,[me(u,t,p),me(u,"int32",l)]}function Tm(r,e,t,o){let n=y.parseAxisParam(e,t)[0],s=[1,t[0],1];for(let f=0;f<n;f++)s[0]*=t[f];s[1]=t[n];for(let f=n+1;f<t.length;f++)s[2]*=t[f];let a=new Map,i=new Int32Array(t[n]),p=new Le(s,o,r),l=[],u=s[0]===1&&s[2]===1;for(let f=0;f<t[n];f++){let g;if(u)g=r[f].toString();else{let x=[];for(let b=0;b<s[0];b++)for(let S=0;S<s[2];S++)x.push(p.get(b,f,S));g=x.join(",")}let h=a.get(g);if(h!=null)i[f]=h;else{let x=a.size;a.set(g,x),i[f]=x,l.push(f)}}let c=s.slice();c[1]=a.size;let m=new Le(c,o);l.forEach((f,g)=>{for(let h=0;h<s[0];h++)for(let x=0;x<s[2];x++)m.set(p.get(h,f,x),h,g,x)});let d=t.slice();return d[n]=c[1],{outputValues:m.values,outputShape:d,indices:i}}var{addImpl:Z0,bincountImpl:wm,bincountReduceImpl:J0,bitwiseAndImpl:ew,castImpl:tw,ceilImpl:rw,concatImpl:ow,equalImpl:nw,expImpl:sw,expm1Impl:aw,floorImpl:iw,gatherNdImpl:pw,gatherV2Impl:lw,greaterImpl:uw,greaterEqualImpl:cw,lessImpl:mw,lessEqualImpl:dw,linSpaceImpl:fw,logImpl:hw,maxImpl:gw,maximumImpl:xw,minimumImpl:yw,multiplyImpl:bw,negImpl:_w,notEqualImpl:vw,prodImpl:Tw,raggedGatherImpl:ww,raggedRangeImpl:Cw,raggedTensorToTensorImpl:Sw,rangeImpl:Nw,rsqrtImpl:Iw,scatterImpl:kw,sigmoidImpl:Ew,simpleAbsImpl:Cm,sliceImpl:$w,sparseFillEmptyRowsImpl:Aw,sparseReshapeImpl:Fw,sparseSegmentReductionImpl:Sm,sqrtImpl:Dw,staticRegexReplaceImpl:Rw,stridedSliceImpl:Ow,stringNGramsImpl:Pw,stringSplitImpl:Mw,stringToHashBucketFastImpl:Lw,subImpl:Vw,tileImpl:Bw,topKImpl:zw,transposeImpl:pa,uniqueImpl:Uw}=Pg;function Mg(r,e){return["x","y","z","w","u","v"].slice(0,e).map(t=>`${r}.${t}`)}function mt(r,e){return e===1?[r]:Mg(r,e)}function Ww(r,e){if(r===1)return"rc";let t="";for(let o=0;o<r;o++)t+=e[o],o<r-1&&(t+=",");return t}var Nm=class{constructor(e){if(this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.enableShapeUniforms=We(this.outputShape.length),this.rank===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{let t=mt("rc",this.rank),o=Ce(this.rank),n=this.getOutOfBoundsCondition(t),s=this.getSetup(t),a=this.getOutput(t);this.userCode=`
        void main() {
          ${o} rc = getOutputCoords();

          if(${n}) {
            setOutput(vec4(0));
          } else {
            ${s}

            setOutput(vec4(${a}));
          }
        }
      `}}getSourceCoordsArr(e){let t=[];for(let o=0;o<=1;o++)for(let n=0;n<=1;n++){let s=`${o===0?"r":"rp1"}, ${n===0?"c":"cp1"}`;for(let a=2;a<this.rank;a++)s=`${e[e.length-1-a]},`+s;t.push(s)}return t}getOutOfBoundsCondition(e){if(this.rank===1)return`rc > ${this.enableShapeUniforms?"outShape":this.outputShape[0]}`;let t="";for(let o=this.rank-2;o<this.rank;o++)t+=`${e[o]} >= ${this.enableShapeUniforms?`outShape[${o}]`:this.outputShape[o]}`,o<this.rank-1&&(t+="||");return t}getSetup(e){if(this.rank===1)return"";let t=e.slice(-2),o=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],n=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${t[0]};
      int c = ${t[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${o};
      bool rEdge = rp1 >= ${n};
    `}getOutput(e){let t=this.getSourceCoordsArr(e);return this.rank===1?`getA(rc), (rc + 1 >= ${this.enableShapeUniforms?"outShape":this.outputShape[0]} ? 0. : getA(rc + 1)), 0, 0`:`getA(${t[0]}),
            cEdge ? 0. : getA(${t[1]}),
            rEdge ? 0. : getA(${t[2]}),
            rEdge || cEdge ? 0. : getA(${t[3]})`}};var Wp=class{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec3"}],this.outputShape=e,this.enableShapeUniforms=We(this.outputShape.length);let o="";for(let n=0;n<4;n++){let s="thisRC = rc;";n%2===1&&(s+="thisRC.z += 1;"),n>1&&(s+="thisRC.y += 1;"),o+=`
        ${s}
        ${n>0?"if(thisRC.y < rows && thisRC.z < cols){":""}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${n}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${n>0?"}":""}
      `}this.userCode=`
      ${w3(t,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?Ap():$p(e)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?"outShape[1]":e[1]};
        int cols = ${this.enableShapeUniforms?"outShape[2]":e[2]};

        ${o}

        setOutput(result);
      }
    `}};function w3(r,e){return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e?UT(["r","c","d"],"inputShape"):jr(["r","c","d"],r)}
      return ivec3(r, c, d);
    }
  `}var Im=class{constructor(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(e,t,o){let n=Hw(t,o),s=qw(e,n,o);s in this.freeTextures||(this.freeTextures[s]=[]),s in this.usedTextures||(this.usedTextures[s]=[]);let a=Gw(e,n,this.gpgpu.gl,this.gpgpu.textureConfig,o);if(this.freeTextures[s].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=a,this.log();let p=this.freeTextures[s].pop();return this.usedTextures[s].push(p),p}let i;return n===Pt.PACKED_2X2_FLOAT32?i=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):n===Pt.PACKED_2X2_FLOAT16?i=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):n===Pt.UNPACKED_FLOAT32?i=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):n===Pt.UNPACKED_FLOAT16?i=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):n===Pt.PACKED_4X1_UNSIGNED_BYTE&&(i=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[s].push(i),this.numUsedTextures++,this._numBytesAllocated+=a,this.log(),i}releaseTexture(e,t,o,n){if(this.freeTextures==null)return;let s=Hw(o,n),a=qw(t,s,n);a in this.freeTextures||(this.freeTextures[a]=[]);let i=Gw(t,s,this.gpgpu.gl,this.gpgpu.textureConfig,n),p=P().getNumber("WEBGL_DELETE_TEXTURE_THRESHOLD");p!==-1&&this._numBytesAllocated>p?(this.gpgpu.deleteMatrixTexture(e.texture),this._numBytesAllocated-=i):(this.freeTextures[a].push(e),this.numFreeTextures++,this._numBytesFree+=i),this.numUsedTextures--;let l=this.usedTextures[a],u=l&&l.indexOf(e);if(u==null||u<0)throw new Error("Cannot release a texture that was never provided by this texture manager");l[u]=l[l.length-1],l.pop(),this.log()}log(){if(!this.logEnabled)return;let e=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${e})`);let t=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*t)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(this.freeTextures!=null){for(let e in this.freeTextures)this.freeTextures[e].forEach(t=>{this.gpgpu.deleteMatrixTexture(t.texture)});for(let e in this.usedTextures)this.usedTextures[e].forEach(t=>{this.gpgpu.deleteMatrixTexture(t.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}};function C3(r,e){let t=r;if(e===t.R32F)return 4;if(e===t.R16F)return 2;if(e===t.RGBA32F)return 16;if(e===r.RGBA)return 16;if(e===t.RGBA16F)return 8;if(e===t.RGBA8)return 4;throw new Error(`Unknown internal format ${e}`)}function Gw(r,e,t,o,n){let s=S3(e,o),a;if(n){let[p,l]=yo(r[0],r[1]);a=p*l}else{let[p,l]=oa(r[0],r[1]);a=p*l}let i=C3(t,s);return a*i}function S3(r,e){switch(r){case Pt.PACKED_2X2_FLOAT32:return ng(e);case Pt.PACKED_2X2_FLOAT16:return sg(e);case Pt.UNPACKED_FLOAT32:return tg(e);case Pt.UNPACKED_FLOAT16:return rg(e);case Pt.PACKED_4X1_UNSIGNED_BYTE:return og(e);default:throw new Error(`Unknown physical texture type ${r}`)}}function N3(r){return P().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?r?Pt.PACKED_2X2_FLOAT32:Pt.UNPACKED_FLOAT32:r?Pt.PACKED_2X2_FLOAT16:Pt.UNPACKED_FLOAT16}function Hw(r,e){if(r===Gt.UPLOAD)return Pt.PACKED_2X2_FLOAT32;if(r===Gt.RENDER||r==null)return N3(e);if(r===Gt.DOWNLOAD||r===Gt.PIXELS)return Pt.PACKED_4X1_UNSIGNED_BYTE;throw new Error(`Unknown logical texture type ${r}`)}function qw(r,e,t){return`${r[0]}_${r[1]}_${e}_${t}`}var Mt=class{constructor(e,t){this.variableNames=["A"],this.outputShape=e,this.enableShapeUniforms=We(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${t}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}},Ct="if (isnan(x)) return x;",Kw="return x;",Lg="return abs(x);";var jw="return (x >= 0.0) ? x : (exp(x) - 1.0);",Xw=Ct+`
  return (x < 0.0) ? 0.0 : x;
`,Qw=Ct+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,vo="return x;",Yw="return 1.0 / (1.0 + exp(-1.0 * x));";var Jw="return x;",eC=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,tC=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,rC=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,oC="return 1.0 / (1.0 + exp(-1.0 * x));",lr=class{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.enableShapeUniforms=We(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${t}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}};var km=class{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=e,this.enableShapeUniforms=We(this.outputShape.length);let t=e.length,o=mt("rc",t),n=Ce(t),s=Ww(t,o),a=o.slice(-2),i=t<=1?"rc":`vec2(${a.join(",")})`;this.userCode=`
      void main() {
        ${n} rc = getOutputCoords();
        vec4 packedInput = getA(${s});

        setOutput(getChannel(packedInput, ${i}));
      }
    `}};var k3=Wt.whereImpl,E3=1e-7,$3=1e-4,Em={};function A3(r){return r in Em||(Em[r]={}),Em[r]}var F3=P().getNumber("CPU_HANDOFF_SIZE_THRESHOLD"),D3=600;function R3(){return P().global.screen==null?1024:P().global.screen.height*P().global.screen.width*window.devicePixelRatio*D3/1024/1024}var Ll=class r extends No{nextDataId(){return r.nextDataId++}constructor(e){if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!P().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");let t;if(e!=null){if(e instanceof Mp)t=e;else{let o=br(P().getNumber("WEBGL_VERSION"),e);t=new Mp(o)}this.binaryCache={},this.gpgpuCreatedLocally=!1}else{let o=br(P().getNumber("WEBGL_VERSION"));t=new Mp(o),this.binaryCache=A3(P().getNumber("WEBGL_VERSION")),this.gpgpuCreatedLocally=!0}this.gpgpu=t,this.canvas=this.gpgpu.gl.canvas,this.textureManager=new Im(this.gpgpu),this.numMBBeforeWarning=R3(),this.texData=new wn(this,Rr())}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}writeTexture(e,t,o,n,s,a){let i=this.makeTensorInfo(t,o),p=this.texData.get(i.dataId);p.isPacked=!1,p.texture={texture:e,texShape:[n,s]},p.texShape=[n,s];let l=Fl(t),u=new Dl(l,!1,a),c=this.runWebGLProgram(u,[i],o,[[n,s]]);return c.shape=t,p.texture=null,this.disposeIntermediateTensorInfo(i),c.dataId}write(e,t,o){if((P().getBool("WEBGL_CHECK_NUMERICAL_PROBLEMS")||P().getBool("DEBUG"))&&this.checkNumericalProblems(e),o==="complex64"&&e!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");let n={id:this.nextDataId()};return this.texData.set(n,{shape:t,dtype:o,values:e,usage:Gt.UPLOAD,refCount:1}),n}refCount(e){return this.texData.has(e)?this.texData.get(e).refCount:0}incRef(e){let t=this.texData.get(e);t.refCount++}decRef(e){if(this.texData.has(e)){let t=this.texData.get(e);t.refCount--}}move(e,t,o,n,s){if(P().getBool("DEBUG")&&this.checkNumericalProblems(t),n==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(e,{shape:o,dtype:n,values:t,usage:Gt.UPLOAD,refCount:s})}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}readSync(e){let t=this.texData.get(e),{values:o,dtype:n,complexTensorInfos:s,slice:a,shape:i,isPacked:p}=t;if(a!=null){let m;p?m=new lr(i,vo):m=new Mt(i,vo);let d=this.runWebGLProgram(m,[{dataId:e,shape:i,dtype:n}],n),f=this.readSync(d.dataId);return this.disposeIntermediateTensorInfo(d),f}if(o!=null)return this.convertAndCacheOnCPU(e);if(n==="string")return o;let l=this.activeTimers!=null,u;l&&(u=y.now());let c;if(n==="complex64"){let m=this.readSync(s.real.dataId),d=this.readSync(s.imag.dataId);c=I.mergeRealAndImagArrays(m,d)}else c=this.getValuesFromTexture(e);return l&&(this.downloadWaitMs+=y.now()-u),this.convertAndCacheOnCPU(e,c)}async read(e){if(this.pendingRead.has(e)){let f=this.pendingRead.get(e);return new Promise(g=>f.push(g))}let t=this.texData.get(e),{values:o,shape:n,slice:s,dtype:a,complexTensorInfos:i,isPacked:p}=t;if(s!=null){let f;p?f=new lr(n,vo):f=new Mt(n,vo);let g=this.runWebGLProgram(f,[{dataId:e,shape:n,dtype:a}],a),h=this.read(g.dataId);return this.disposeIntermediateTensorInfo(g),h}if(o!=null)return this.convertAndCacheOnCPU(e);if(P().getBool("DEBUG")&&!P().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&P().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");let l=null,u;if(a!=="complex64"&&P().get("WEBGL_BUFFER_SUPPORTED")){u=this.decode(e);let f=this.texData.get(u.dataId);l=this.gpgpu.createBufferFromTexture(f.texture.texture,...kl(n))}this.pendingRead.set(e,[]),a!=="complex64"&&await this.gpgpu.createAndWaitForFence();let c;if(a==="complex64"){let f=await Promise.all([this.read(i.real.dataId),this.read(i.imag.dataId)]),g=f[0],h=f[1];c=I.mergeRealAndImagArrays(g,h)}else if(l==null)c=this.getValuesFromTexture(e);else{let f=y.sizeFromShape(n);c=this.gpgpu.downloadFloat32MatrixFromBuffer(l,f)}if(u!=null&&this.disposeIntermediateTensorInfo(u),l!=null){let f=this.gpgpu.gl;ue(f,()=>f.deleteBuffer(l))}let m=this.convertAndCacheOnCPU(e,c),d=this.pendingRead.get(e);return this.pendingRead.delete(e),d.forEach(f=>f(m)),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e)&&Rr().removeDataId(e,this),this.pendingDeletes--),m}readToGPU(e,t={}){let o=this.texData.get(e),{values:n,shape:s,slice:a,dtype:i,isPacked:p,texture:l}=o;if(i==="complex64")throw new Error("Does not support reading texture for complex64 dtype.");if(a!=null){let d;p?d=new lr(s,vo):d=new Mt(s,vo);let f=this.runWebGLProgram(d,[{dataId:e,shape:s,dtype:i}],i),g=this.readToGPU(f,t);return this.disposeIntermediateTensorInfo(f),g}if(l==null)throw n!=null?new Error("Data is not on GPU but on CPU."):new Error("There is no data on GPU or CPU.");let u=this.decode(e,t.customTexShape),c=Rr().makeTensorFromTensorInfo(u),m=this.texData.get(u.dataId);return Object.assign({tensorRef:c},m.texture)}bufferSync(e){let t=this.readSync(e.dataId);if(e.dtype==="string")try{let o=t.map(n=>y.decodeString(n));return me(e.shape,e.dtype,o)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return me(e.shape,e.dtype,t)}checkNumericalProblems(e){if(e!=null)for(let t=0;t<e.length;t++){let o=e[t];if(!TT(o))throw P().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error(`The value ${o} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`):Error(`The value ${o} cannot be represented on this device.`)}}getValuesFromTexture(e){let{shape:t,dtype:o,isPacked:n}=this.texData.get(e),s=y.sizeFromShape(t);if(P().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){let m=this.decode(e),d=this.texData.get(m.dataId),f=this.gpgpu.downloadMatrixFromPackedTexture(d.texture.texture,...kl(t)).subarray(0,s);return this.disposeIntermediateTensorInfo(m),f}let a=P().getBool("WEBGL_PACK")&&n===!0,i=a?Fl(t):t,p=a?new rm(i):new tm(i),l=this.runWebGLProgram(p,[{shape:i,dtype:o,dataId:e}],"float32"),u=this.texData.get(l.dataId),c=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(u.texture.texture,u.texShape[0],u.texShape[1]).subarray(0,s);return this.disposeIntermediateTensorInfo(l),c}timerAvailable(){return P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0}time(e){let t=this.activeTimers,o=[],n=!1;this.programTimersStack==null?(this.programTimersStack=o,n=!0):this.activeTimers.push(o),this.activeTimers=o,e();let s=y.flatten(this.activeTimers.map(p=>p.query)).filter(p=>p!=null),a=y.flatten(this.activeTimers.map(p=>p.name)).filter(p=>p!=null);this.activeTimers=t,n&&(this.programTimersStack=null);let i={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};return(async()=>{if(P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0){let p=await Promise.all(s);i.kernelMs=y.sum(p),i.getExtraProfileInfo=()=>p.map((l,u)=>({name:a[u],ms:l})).map(l=>`${l.name}: ${l.ms}`).join(", ")}else i.kernelMs={error:"WebGL query timers are not supported in this environment."};return this.uploadWaitMs=0,this.downloadWaitMs=0,i})()}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:y.now(),endMs:null}}endTimer(e){return P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),e):(e.endMs=y.now(),e)}async getQueryTime(e){if(P().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0)return this.gpgpu.waitForQueryAndGetTime(e);let t=e;return t.endMs-t.startMs}disposeData(e,t=!1){if(this.pendingDisposal.has(e))return!1;if(!this.texData.has(e))return!0;if(t?this.texData.get(e).refCount=0:this.texData.get(e).refCount--,!t&&this.texData.get(e).refCount>0)return!1;if(this.pendingRead.has(e))return this.pendingDisposal.add(e),this.pendingDeletes++,!1;this.releaseGPUData(e);let{complexTensorInfos:o}=this.texData.get(e);return o!=null&&(this.disposeData(o.real.dataId,t),this.disposeData(o.imag.dataId,t)),this.texData.delete(e),!0}releaseGPUData(e){let{texture:t,dtype:o,texShape:n,usage:s,isPacked:a,slice:i}=this.texData.get(e),p=i&&i.origDataId||e,l=this.dataRefCount.get(p);l>1?this.dataRefCount.set(p,l-1):(this.dataRefCount.delete(p),t!=null&&(this.numBytesInGPU-=this.computeBytes(n,o),this.textureManager.releaseTexture(t,n,s,a)));let u=this.texData.get(e);u.texture=null,u.texShape=null,u.isPacked=!1,u.slice=null}getTexture(e){return this.uploadToGPU(e),this.texData.get(e).texture.texture}getDataInfo(e){return this.texData.get(e)}shouldExecuteOnCPU(e,t=F3){return P().getBool("WEBGL_CPU_FORWARD")&&e.every(o=>this.texData.get(o.dataId).texture==null&&y.sizeFromShape(o.shape)<t)}getGPGPUContext(){return this.gpgpu}where(e){I.warn("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");let t=e.dataSync();return k3(e.shape,t)}packedUnaryOp(e,t,o){let n=new lr(e.shape,t),s=this.compileAndRun(n,[e],o);return Rr().makeTensorFromTensorInfo(s)}abs(e){if(this.shouldExecuteOnCPU([e])&&e.dtype!=="complex64"){let n=Cm(this.texData.get(e.dataId).values);return this.makeOutput(e.shape,e.dtype,n)}if(P().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,Lg,e.dtype);let t=new Mt(e.shape,Lg),o=this.compileAndRun(t,[e]);return Rr().makeTensorFromTensorInfo(o)}makeTensorInfo(e,t,o){let n;if(t==="string"&&o!=null&&o.length>0&&y.isString(o[0])){let s=o.map(a=>y.encodeString(a));n=this.write(s,e,t)}else n=this.write(o,e,t);return this.texData.get(n).usage=null,{dataId:n,shape:e,dtype:t}}makeOutput(e,t,o){return Rr().makeTensorFromTensorInfo(this.makeTensorInfo(e,t,o),this)}unpackTensor(e){let t=new km(e.shape);return this.runWebGLProgram(t,[e],e.dtype)}packTensor(e){let t=new Nm(e.shape);return this.runWebGLProgram(t,[e],e.dtype,null,!0)}packedReshape(e,t){let o=[dn(e.shape),...fn(e.shape)],n={dtype:e.dtype,shape:o,dataId:e.dataId},s=[dn(t),...fn(t)],a=new Wp(s,o),i=!0,p=[o],l=this.runWebGLProgram(a,[n],e.dtype,p,i);return{dataId:l.dataId,shape:t,dtype:l.dtype}}decode(e,t){let o=this.texData.get(e),{isPacked:n,shape:s,dtype:a}=o;if(t!=null){let m=y.sizeFromShape(s),d=t[0]*t[1]*4;y.assert(m<=d,()=>"customTexShape is too small. Row * Column * 4 should be equal or larger than the size of the tensor data.")}let i=Fl(s),p;n?p=new em(i):p=new Jc(i);let l=!0,u=[t??kl(i)],c=this.runWebGLProgram(p,[{shape:i,dtype:a,dataId:e}],a,u,l,t);return{dtype:a,shape:s,dataId:c.dataId}}runWebGLProgram(e,t,o,n,s=!1,a){let i=this.makeTensorInfo(e.outputShape,o),p=this.texData.get(i.dataId);if(e.packedOutput&&(p.isPacked=!0),e.outPackingScheme===mn.DENSE){let x=a??kl(e.outputShape);p.texShape=x.map(b=>b*2)}if(e.outTexUsage!=null&&(p.usage=e.outTexUsage),y.sizeFromShape(i.shape)===0)return p.values=y.getTypedArrayFromDType(i.dtype,0),i;let l=[],u=t.map(x=>{if(x.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");let b=this.texData.get(x.dataId);if(b.texture==null){if(!e.packedInputs&&y.sizeFromShape(x.shape)<=P().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:x.shape,texData:null,isUniform:!0,uniformValues:b.values};e.packedInputs&&(b.isPacked=!0,b.shape=x.shape)}if(this.uploadToGPU(x.dataId),!!b.isPacked!=!!e.packedInputs)x=b.isPacked?this.unpackTensor(x):this.packTensor(x),l.push(x),b=this.texData.get(x.dataId);else if(b.isPacked&&!na(b.shape,x.shape)){let S=x,C=x.shape;x.shape=b.shape,x=this.packedReshape(x,C),l.push(x),b=this.texData.get(x.dataId),S.shape=C}return{shape:x.shape,texData:b,isUniform:!1}});this.uploadToGPU(i.dataId);let c={shape:i.shape,texData:p,isUniform:!1},m=QT(e,u,c),d=this.getAndSaveBinary(m,()=>jT(this.gpgpu,e,u,c)),f=this.activeTimers!=null,g;f&&(g=this.startTimer()),P().get("ENGINE_COMPILE_ONLY")||XT(this.gpgpu,d,u,c,n),l.forEach(x=>this.disposeIntermediateTensorInfo(x)),f&&(g=this.endTimer(g),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(g)}));let h=P().getNumber("WEBGL_FLUSH_THRESHOLD");if(h>0){let x=y.now();x-this.lastGlFlushTime>h&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=x)}if(!P().getBool("WEBGL_LAZILY_UNPACK")&&p.isPacked&&s===!1){let x=this.unpackTensor(i);return this.disposeIntermediateTensorInfo(i),x}return i}compileAndRun(e,t,o,n,s=!1){return o=o||t[0].dtype,this.runWebGLProgram(e,t,o,n,s)}getAndSaveBinary(e,t){return e in this.binaryCache||(this.binaryCache[e]=t()),this.binaryCache[e]}getTextureManager(){return this.textureManager}dispose(){this.disposed||(P().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach(t=>{this.gpgpu.deleteProgram(this.binaryCache[t].webGLProgram),delete this.binaryCache[t]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<"u"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)}floatPrecision(){return this.floatPrecisionValue==null&&(this.floatPrecisionValue=Se(()=>{if(!P().get("WEBGL_RENDER_FLOAT32_ENABLED")){let e=P().getBool("DEBUG");P().set("DEBUG",!1);let t=this.abs(_e(1e-8)).dataSync()[0];if(P().set("DEBUG",e),t>0)return 32}return 16})),this.floatPrecisionValue}epsilon(){return this.floatPrecision()===32?E3:$3}uploadToGPU(e){let t=this.texData.get(e),{shape:o,dtype:n,values:s,texture:a,usage:i,isPacked:p}=t;if(a!=null)return;let l=this.activeTimers!=null,u;l&&(u=y.now());let c=t.texShape;if(c==null&&(c=OT(o,p),t.texShape=c),s!=null){let m=Fl(o),d,f=c[1],g=c[0],h=s instanceof Uint8Array||s instanceof Uint8ClampedArray;(p||!h)&&([f,g]=yo(c[0],c[1])),p?d=new om(m,h):d=new Dl(m,h);let x=h?[g,f]:c,b=this.makeTensorInfo(x,n),S=this.texData.get(b.dataId);h?S.usage=Gt.PIXELS:S.usage=Gt.UPLOAD,S.texShape=x,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(b.dataId),f,g,s);let C=[[g,f]],A=this.runWebGLProgram(d,[b],n,C,!0),D=this.texData.get(A.dataId);t.texShape=D.texShape,t.isPacked=D.isPacked,t.usage=D.usage,P().get("ENGINE_COMPILE_ONLY")?this.disposeData(A.dataId):(t.texture=D.texture,t.values=null,this.texData.delete(A.dataId)),this.disposeIntermediateTensorInfo(b),l&&(this.uploadWaitMs+=y.now()-u)}else{let m=this.acquireTexture(c,i,n,p);t.texture=m}}convertAndCacheOnCPU(e,t){let o=this.texData.get(e),{dtype:n}=o;return t!=null&&(o.values=O3(t,n)),o.values}acquireTexture(e,t,o,n){if(this.numBytesInGPU+=this.computeBytes(e,o),!this.warnedAboutMemory&&this.numBytesInGPU>this.numMBBeforeWarning*1024*1024){let s=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${s} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(e,t,n)}computeBytes(e,t){return e[0]*e[1]*y.bytesPerElement(t)}checkCompileCompletion(){for(let[,e]of Object.entries(this.binaryCache))this.checkCompletion_(e)}async checkCompileCompletionAsync(){let e=[];if(this.gpgpu.parallelCompilationExtension){for(let[,t]of Object.entries(this.binaryCache))e.push(this.checkCompletionAsync_(t));return Promise.all(e)}else{for(let[,t]of Object.entries(this.binaryCache)){let o=new Promise(n=>{try{this.checkCompletion_(t),n(!0)}catch(s){throw s}});e.push(o)}return Promise.all(e)}}async checkCompletionAsync_(e){return this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.parallelCompilationExtension.COMPLETION_STATUS_KHR)?this.checkCompletion_(e):(await Uh(),this.checkCompletionAsync_(e))}checkCompletion_(e){if(this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.gl.LINK_STATUS)===!1)throw console.log(this.gpgpu.gl.getProgramInfoLog(e.webGLProgram)),this.gpgpu.gl.getShaderParameter(e.fragmentShader,this.gpgpu.gl.COMPILE_STATUS)===!1?(Qh(e.source,this.gpgpu.gl.getShaderInfoLog(e.fragmentShader)),new Error("Failed to compile fragment shader.")):new Error("Failed to link vertex and fragment shaders.");return!0}getUniformLocations(){for(let e of Object.values(this.binaryCache)){this.gpgpu.buildVao(e.webGLProgram);let{variablesLocations:t,customUniformLocations:o,infLoc:n,nanLoc:s,outShapeLocation:a,outShapeStridesLocation:i,outTexShapeLocation:p}=eg(this.gpgpu,e.program,e.webGLProgram);e.variablesLocations=t,e.customUniformLocations=o,e.infLoc=n,e.nanLoc=s,e.outShapeLocation=a,e.outShapeStridesLocation=i,e.outTexShapeLocation=p}}createTensorFromGPUData(e,t,o){e.channels=e.channels||"RGBA";let{texture:n,height:s,width:a,channels:i}=e,p=Rr().backend;if(!p.gpgpu.gl.isTexture(n))throw new Error("The texture is invalid. Also, please make sure the texture and the TFJS WebGL backend are using the same canvas. If you want to use your own custom canvas, you have to create and use the custom TFJS WebGL backend created from the canvas through 'new tf.MathBackendWebGL(customCanvas)'.");let l=p.writeTexture(n,t,o,s,a,i);return Rr().makeTensorFromDataId(l,t,o,p)}};Ll.nextDataId=0;function O3(r,e){if(e==="float32"||e==="complex64")return r;if(e==="int32"||e==="bool"){let t=e==="int32"?new Int32Array(r.length):new Uint8Array(r.length);for(let o=0;o<t.length;++o)t[o]=Math.round(r[o]);return t}else throw new Error(`Unknown dtype ${e}`)}Jo.isBrowser()&&Pu("webgl",()=>new Ll,2);var Gp=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`;var ur=class{constructor(e,t,o){this.variableNames=["A","B"],this.outputShape=I.assertAndGetBroadcastShape(t,o),this.enableShapeUniforms=We(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${e}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}};var vr=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`;var _r=class{constructor(e,t,o,n=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=I.assertAndGetBroadcastShape(t,o);let s=this.outputShape.length;this.enableShapeUniforms=We(s);let a="";if(n)if(s===0||y.sizeFromShape(this.outputShape)===1)a=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(a=`
          ${Ce(s)} coords = getOutputCoords();
        `,s===1)this.enableShapeUniforms?a+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:a+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{let p=mt("coords",s);this.enableShapeUniforms?a+=`
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
    `}};function dt(r){let{inputs:e,backend:t}=r,{x:o}=e;return t.incRef(o.dataId),{dataId:o.dataId,shape:o.shape,dtype:o.dtype}}var nC={kernelName:jo,backendName:"webgl",kernelFunc:dt};function cr(r){let{inputs:e,backend:t}=r,{real:o,imag:n}=e,s=t.makeTensorInfo(o.shape,"complex64"),a=t.texData.get(s.dataId),i=dt({inputs:{x:o},backend:t}),p=dt({inputs:{x:n},backend:t});return a.complexTensorInfos={real:i,imag:p},s}var sC={kernelName:Pa,backendName:"webgl",kernelFunc:cr};var Vg="return (a < 0.) ? b * a : a;",Bg=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function P3(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{alpha:s}=o,a=t.makeTensorInfo([],"float32",y.createScalarValue(s,"float32")),i=P().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new _r(Bg,n.shape,a.shape):new ur(Vg,n.shape,a.shape),p=t.runWebGLProgram(i,[n,a],"float32");return t.disposeIntermediateTensorInfo(a),p}var aC={kernelName:ui,backendName:"webgl",kernelFunc:P3};var zg="return (a < 0.) ? b * a : a;",Ug=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function M3(r){let{inputs:e,backend:t}=r,{x:o,alpha:n}=e,s=P().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new _r(Ug,o.shape,n.shape):new ur(zg,o.shape,n.shape);return t.runWebGLProgram(s,[o,n],"float32")}var iC={kernelName:Ei,backendName:"webgl",kernelFunc:M3};var zr="if (isnan(x)) return x;";function de({opSnippet:r,packedOpSnippet:e,cpuKernelImpl:t,dtype:o}){return({inputs:n,backend:s})=>{let{x:a}=n,i=s,p=o||a.dtype;if(i.shouldExecuteOnCPU([a])&&t!=null){let c=i.texData.get(a.dataId),m=t(c.values,p);return i.makeTensorInfo(a.shape,p,m)}let l=P().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&e!=null,u;return l?u=new lr(a.shape,e):u=new Mt(a.shape,r),i.runWebGLProgram(u,[a],p)}}function Ue({opSnippet:r,packedOpSnippet:e,checkOutOfBounds:t=!1,supportsComplex:o=!1,cpuKernelImpl:n,dtype:s}){return({inputs:a,backend:i})=>{let{a:p,b:l}=a,u=i;if(o&&p.dtype==="complex64"){let f=u.texData.get(p.dataId),g=u.texData.get(l.dataId),[h,x]=[[f.complexTensorInfos.real,g.complexTensorInfos.real],[f.complexTensorInfos.imag,g.complexTensorInfos.imag]].map(S=>{let[C,$]=S,A={dataId:C.dataId,dtype:C.dtype,shape:p.shape},D={dataId:$.dataId,dtype:$.dtype,shape:l.shape},R=new ur(r,p.shape,l.shape);return u.runWebGLProgram(R,[A,D],bt(C.dtype,$.dtype))}),b=cr({inputs:{real:h,imag:x},backend:u});return u.disposeIntermediateTensorInfo(h),u.disposeIntermediateTensorInfo(x),b}let c=s||bt(p.dtype,l.dtype);if((p.dtype==="string"||l.dtype==="string"||u.shouldExecuteOnCPU([p,l]))&&n!=null){let f=u.texData.get(p.dataId).values,g=u.texData.get(l.dataId).values,h=p.dtype==="string"?I.fromUint8ToStringArray(f):f,x=p.dtype==="string"?I.fromUint8ToStringArray(g):g,[b,S]=n(p.shape,l.shape,h,x,c),C=u.makeTensorInfo(S,c),$=u.texData.get(C.dataId);return $.values=b,C}let m=P().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&e!=null,d;return m?d=new _r(e,p.shape,l.shape,t):d=new ur(r,p.shape,l.shape),u.runWebGLProgram(d,[p,l],c)}}function Vo(r,e=!1){if(r==="linear")return e?Jw:Kw;if(r==="relu")return e?tC:Xw;if(r==="elu")return e?eC:jw;if(r==="relu6")return e?rC:Qw;if(r==="prelu")return e?Ug:zg;if(r==="leakyrelu")return e?Bg:Vg;if(r==="sigmoid")return e?oC:Yw;throw new Error(`Activation ${r} has not been implemented for the WebGL backend.`)}var Hp=class{constructor(e,t,o,n=!1,s=!1,a=!1,i=null,p=!1,l=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=o,this.enableShapeUniforms=We(this.outputShape.length);let u=n?e[1]:e[2],c=Math.ceil(u/2),m=n?"i * 2, rc.y":"rc.y, i * 2",d=s?"rc.z, i * 2":"i * 2, rc.z",f=n?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],g=s?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],h="",x="";i&&(p?h=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${i}
        }`:l?h=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${i}
        }`:h=`vec4 activation(vec4 x) {
          ${i}
        }`,x="result = activation(result);");let b=a?"result += getBiasAtOutCoords();":"";a&&this.variableNames.push("bias"),p&&this.variableNames.push("preluActivationWeights"),l&&this.variableNames.push("leakyreluAlpha");let S="rc.x",C="rc.x";e[0]<t[0]?S=`imod(rc.x, ${e[0]})`:t[0]<e[0]&&(C=`imod(rc.x, ${t[0]})`),this.userCode=`
      ${h}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${c}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        int batchA = ${S};
        int batchB = ${C};
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
    `}};var Wg={REAL:"return areal * breal - aimag * bimag;",IMAG:"return areal * bimag + aimag * breal;"},Vl=class{constructor(e,t,o){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=I.assertAndGetBroadcastShape(t,o),this.userCode=`
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
    `}};var pC="return a * b;";function Bl(r){let{inputs:e,backend:t}=r,{a:o,b:n}=e,s=I.upcastType(o.dtype,n.dtype);if(o.dtype==="complex64"){let i=t.texData.get(o.dataId),p=t.texData.get(n.dataId),l=new Vl(Wg.REAL,o.shape,n.shape),u=new Vl(Wg.IMAG,o.shape,n.shape),c=[{dataId:i.complexTensorInfos.real.dataId,dtype:i.complexTensorInfos.real.dtype,shape:o.shape},{dataId:i.complexTensorInfos.imag.dataId,dtype:i.complexTensorInfos.imag.dtype,shape:o.shape},{dataId:p.complexTensorInfos.real.dataId,dtype:p.complexTensorInfos.real.dtype,shape:n.shape},{dataId:p.complexTensorInfos.imag.dataId,dtype:p.complexTensorInfos.imag.dtype,shape:n.shape}],m=t.runWebGLProgram(l,c,"float32"),d=t.runWebGLProgram(u,c,"float32"),f=cr({inputs:{real:m,imag:d},backend:t});return t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d),f}if(t.shouldExecuteOnCPU([o,n])){let i=t.texData.get(o.dataId),p=t.texData.get(n.dataId),[l,u]=bw(o.shape,n.shape,i.values,p.values,s),c=t.makeTensorInfo(u,s),m=t.texData.get(c.dataId);return m.values=l,c}let a;return P().getBool("WEBGL_PACK_BINARY_OPERATIONS")?a=new _r(pC,o.shape,n.shape):a=new ur(pC,o.shape,n.shape),t.runWebGLProgram(a,[o,n],s)}var lC={kernelName:ps,backendName:"webgl",kernelFunc:Bl};function uC(r,e,t){let o=[dn(r.shape),...fn(r.shape)],n={dtype:r.dtype,shape:o,dataId:r.dataId},s=[dn(e),...fn(e)],a=new Wp(s,o),i=!0,p=[o],l=t.runWebGLProgram(a,[n],r.dtype,p,i);return{dataId:l.dataId,shape:e,dtype:l.dtype}}function re(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{shape:s}=o,a=t,i=y.sizeFromShape(n.shape),p=y.inferFromImplicitShape(s,i),l=y.sizeFromShape(p);y.assert(i===l,()=>`The new shape (${p}) has ${l} elements and the old shape (${n.shape}) has ${i} elements. The new shape and old shape must have the same number of elements.`);let u=a.texData.get(n.dataId);return u.isPacked&&!na(n.shape,p)&&!(u.texture!==null&&na(u.shape,p))?uC(n,p,a):(a.incRef(n.dataId),{dataId:n.dataId,shape:p,dtype:n.dtype})}var cC={kernelName:Pi,backendName:"webgl",kernelFunc:re};var zl=class{constructor(e,t){this.variableNames=["x"];let{windowSize:o,batchSize:n,inSize:s,outSize:a}=e;this.outputShape=[n,a];let i=Math.floor(o/4)*4,p=o%4,l="sumValue += dot(values, ones);";if(t!=null){let c=1/t;l=`sumValue += dot(values * ${y.isInt(c)?c.toPrecision(2):c}, ones);`}let u="";s%o>0&&(u=`
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
        int inOffset = outIdx * ${o};

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
    `}};var $m=class{constructor(e,t){this.variableNames=["x"];let{windowSize:o,batchSize:n,inSize:s,outSize:a}=e;this.outputShape=[n,a];let i="0.0",p="";t==="prod"?i="1.0":t==="min"?(i="1.0 / 1e-20",p="min"):t==="max"&&(i="-1.0 / 1e-20",p="max");let l=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t==="sum"?l="sumValue":t==="prod"?l="prodValue":t==="all"?l="allValue":t==="any"&&(l="anyValue");let u=Math.floor(o/4)*4,c=o%4,m=`
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
      `,d="bvec4");let f="";s%o>0&&(f=`
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
        int inOffset = outIdx * ${o};

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
    `}};function V3(r){let e=[];for(;e.length===0||e[e.length-1].outSize!==1;){let t=e.length?e[e.length-1].outSize:r[1],o=I.computeOptimalWindowSize(t);e.push({inSize:t,windowSize:o,outSize:Math.ceil(t/o)})}return e}function Tr(r,e,t,o){let n=V3(r.shape),s=r;for(let a=0;a<n.length;a++){let{inSize:i,windowSize:p,outSize:l}=n[a],u,c;t==="mean"?u=a===0?new zl({windowSize:p,inSize:i,batchSize:r.shape[0],outSize:l},i):new zl({windowSize:p,inSize:i,batchSize:r.shape[0],outSize:l}):u=new $m({windowSize:p,inSize:i,batchSize:r.shape[0],outSize:l},t),c=s,s=o.runWebGLProgram(u,[s],e),c.dataId!==r.dataId&&o.disposeIntermediateTensorInfo(c)}return s}var Am=class{constructor(e,t){this.variableNames=["A"];let o=new Array(e.length);for(let a=0;a<o.length;a++)o[a]=e[t[a]];this.outputShape=o,this.rank=o.length;let n=Ce(this.rank),s=B3(t);this.userCode=`
    void main() {
      ${n} resRC = getOutputCoords();
      setOutput(getA(${s}));
    }
    `}};function B3(r){let e=r.length;if(e>6)throw Error(`Transpose for rank ${e} is not yet supported`);let t=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],o=new Array(e);for(let n=0;n<r.length;n++)o[r[n]]=t[n];return o.join()}var Fm=class{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;let o=new Array(e.length);for(let u=0;u<o.length;u++)o[u]=e[t[u]];if(this.outputShape=o,this.rank=o.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);let n=Ce(this.rank),s=Mg("rc",this.rank),a=new Array(this.rank);for(let u=0;u<t.length;u++)a[t[u]]=s[u];let i=`vec2(${a.slice(-2).join()})`,p=`++${s[this.rank-1]} < ${o[this.rank-1]}`,l=`getChannel(getA(${a.join()}), ${i})`;this.userCode=`
    void main() {
      ${n} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${l};
      if(${p}) {
        result[1] = ${l};
      }
      --${s[this.rank-1]};
      if(++${s[this.rank-2]} < ${o[this.rank-2]}) {
        result[2] = ${l};
        if(${p}) {
          result[3] = ${l};
        }
      }
      setOutput(result);
    }
    `}};function hn(r,e,t){let o=P().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Fm(r.shape,e):new Am(r.shape,e);return t.runWebGLProgram(o,[r],r.dtype)}function mC(r,e,t,o){let n=e,s=r.shape.length,a=y.parseAxisParam(n,r.shape),i=a,p=I.getAxesPermutation(i,s),l=p!=null,u=r;l&&(u=hn(r,p,o),i=I.getInnerMostAxes(i.length,s)),I.assertAxesAreInnerMostDims("sum",i,s);let[c,m]=I.computeOutAndReduceShapes(u.shape,i),d=c;t&&(d=I.expandShapeToKeepDim(c,a));let f=y.sizeFromShape(m),h=y.sizeFromShape(r.shape)/f,x=re({inputs:{x:u},attrs:{shape:[h,f]},backend:o}),b=Ms(r.dtype),S=Tr(x,b,"sum",o),C=re({inputs:{x:S},attrs:{shape:d},backend:o});return o.disposeIntermediateTensorInfo(x),o.disposeIntermediateTensorInfo(S),l&&o.disposeIntermediateTensorInfo(u),C}function la(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,keepDims:a}=o;return mC(n,s,a,t)}var dC={kernelName:Hi,backendName:"webgl",kernelFunc:la};function nt(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{perm:s}=o,a=t,i=n.shape.length,p=new Array(i);for(let u=0;u<p.length;u++)p[u]=n.shape[s[u]];let l;if(a.shouldExecuteOnCPU([n])){let c=a.texData.get(n.dataId).values,m=pa(c,n.shape,n.dtype,s,p);l=a.makeTensorInfo(p,n.dtype);let d=a.texData.get(l.dataId);d.values=m}else l=hn(n,s,a);return l}var fC={kernelName:Qo,backendName:"webgl",kernelFunc:nt};var Gg=1e3;function ua({a:r,b:e,transposeA:t,transposeB:o,backend:n,bias:s=null,preluActivationWeights:a=null,leakyreluAlpha:i=0,activation:p=null}){let l=r.shape.length,u=e.shape.length,c=t?r.shape[l-2]:r.shape[l-1],m=o?e.shape[u-1]:e.shape[u-2],d=t?r.shape[l-1]:r.shape[l-2],f=o?e.shape[u-2]:e.shape[u-1],g=r.shape.slice(0,-2),h=e.shape.slice(0,-2),x=y.sizeFromShape(g),b=y.sizeFromShape(h),C=mo.assertAndGetBroadcastShape(r.shape.slice(0,-2),e.shape.slice(0,-2)).concat([d,f]);y.assert(c===m,()=>`Error in matMul: inner shapes (${c}) and (${m}) of Tensors with shapes ${r.shape} and ${e.shape} and transposeA=${t} and transposeB=${o} must match.`);let $=t?[x,c,d]:[x,d,c],A=o?[b,f,m]:[b,m,f],D=re({inputs:{x:r},backend:n,attrs:{shape:$}}),R=re({inputs:{x:e},backend:n,attrs:{shape:A}}),M=[D,R],L=Math.max(x,b),B=t?D.shape[1]:D.shape[2],W=s!=null,G=a!=null,q=p==="leakyrelu",H=p!=null?Vo(p,!0):null,K=W||G||q||H!=null,Z;if((d===1||f===1)&&B>Gg&&K===!1){let J=D,ae=R;t&&(J=nt({inputs:{x:D},backend:n,attrs:{perm:[0,2,1]}}),M.push(J)),o&&(ae=nt({inputs:{x:R},backend:n,attrs:{perm:[0,2,1]}}),M.push(ae));let Y=f!==1,ee=f===1,ie=J;Y&&(ie=re({inputs:{x:J},backend:n,attrs:{shape:[L,B,1]}}),M.push(ie));let oe=f===1?2:1,ne=ae;ee&&(ne=re({inputs:{x:ae},backend:n,attrs:{shape:[L,1,B]}}),M.push(ne));let ce=Bl({inputs:{a:ie,b:ne},backend:n});Z=la({inputs:{x:ce},backend:n,attrs:{axis:oe,keepDims:!0}}),M.push(ce)}else{let J=bt(r.dtype,e.dtype),ae=new Hp($,A,[L,d,f],t,o,W,H,G,q),Y=[D,R];if(s!=null&&Y.push(s),G&&Y.push(a),q){let ee=n.makeTensorInfo([],"float32",y.createScalarValue(i,"float32"));Y.push(ee),M.push(ee)}Z=n.runWebGLProgram(ae,Y,J)}let X=re({inputs:{x:Z},backend:n,attrs:{shape:C}});M.push(Z);for(let J of M)n.disposeIntermediateTensorInfo(J);return X}function z3(r){let{inputs:e,backend:t,attrs:o}=r,{a:n,b:s,bias:a,preluActivationWeights:i}=e,{transposeA:p,transposeB:l,activation:u,leakyreluAlpha:c}=o;return ua({a:n,b:s,transposeA:p,transposeB:l,backend:t,bias:a,preluActivationWeights:i,leakyreluAlpha:c,activation:u})}var hC={kernelName:Es,backendName:"webgl",kernelFunc:z3};var gC="return abs(x);";function U3(r){let{inputs:e,backend:t}=r,{x:o}=e;if(t.shouldExecuteOnCPU([o])&&o.dtype!=="complex64"){let s=t.texData.get(o.dataId),a=Cm(s.values);return t.makeTensorInfo(o.shape,o.dtype,a)}let n;return P().getBool("WEBGL_PACK_UNARY_OPERATIONS")?n=new lr(o.shape,gC):n=new Mt(o.shape,gC),t.runWebGLProgram(n,[o],o.dtype)}var xC={kernelName:Ca,backendName:"webgl",kernelFunc:U3};var W3=Ct+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,G3=de({opSnippet:W3}),yC={kernelName:In,backendName:"webgl",kernelFunc:G3};var H3=Ct+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`,q3=de({opSnippet:H3}),bC={kernelName:kn,backendName:"webgl",kernelFunc:q3};var _C="return a + b;",K3=Ue({opSnippet:_C,packedOpSnippet:_C,supportsComplex:!0,cpuKernelImpl:Z0}),vC={kernelName:ko,backendName:"webgl",kernelFunc:K3};var Dm=class{constructor(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map((s,a)=>`T${a}`);let o=[];this.variableNames.forEach(s=>{o.push(`float v${s} = get${s}AtOutCoords();`)});let n=this.variableNames.map(s=>`v${s}`).join(" + ");this.userCode=`
      void main() {
        ${o.join(`
        `)}

        float result = ${n};
        setOutput(result);
      }
    `}};var Rm=class{constructor(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map((s,a)=>`T${a}`);let o=[];this.variableNames.forEach(s=>{o.push(`vec4 v${s} = get${s}AtOutCoords();`)});let n=this.variableNames.map(s=>`v${s}`).join(" + ");this.userCode=`
      void main() {
        ${o.join(`
        `)}

        vec4 result = ${n};
        setOutput(result);
      }
    `}};function Om(r){let{inputs:e,backend:t}=r,o=e;if(o.length===1)return dt({inputs:{x:o[0]},backend:t});if(o.length>P().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){let p=Math.floor(o.length/2),l=Om({inputs:o.slice(0,p),backend:t}),u=Om({inputs:o.slice(p),backend:t});return Om({inputs:[l,u],backend:t})}let n=o.map(p=>p.dtype).reduce((p,l)=>bt(p,l)),s=o.map(p=>p.shape),i=P().getBool("WEBGL_PACK")?new Rm(o[0].shape,s):new Dm(o[0].shape,s);return t.runWebGLProgram(i,o,n)}var TC={kernelName:Sa,backendName:"webgl",kernelFunc:Om};function j3(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,keepDims:a}=o,i=n.shape.length,p=y.parseAxisParam(s,n.shape),l=p,u=I.getAxesPermutation(l,i),c=n;u!=null&&(c=nt({inputs:{x:n},backend:t,attrs:{perm:u}}),l=I.getInnerMostAxes(l.length,i)),I.assertAxesAreInnerMostDims("all",l,i);let[m,d]=I.computeOutAndReduceShapes(c.shape,l),f=y.sizeFromShape(d),g=re({inputs:{x:c},backend:t,attrs:{shape:[-1,f]}}),h=Tr(g,g.dtype,"all",t),x;if(a){let b=I.expandShapeToKeepDim(m,p);x=re({inputs:{x:h},backend:t,attrs:{shape:b}})}else x=re({inputs:{x:h},backend:t,attrs:{shape:m}});return t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(h),u!=null&&t.disposeIntermediateTensorInfo(c),x}var wC={kernelName:Na,backendName:"webgl",kernelFunc:j3};function X3(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,keepDims:a}=o,i=n.shape.length,p=y.parseAxisParam(s,n.shape),l=p,u=I.getAxesPermutation(l,i),c=n;u!=null&&(c=nt({inputs:{x:n},backend:t,attrs:{perm:u}}),l=I.getInnerMostAxes(l.length,i)),I.assertAxesAreInnerMostDims("any",l,i);let[m,d]=I.computeOutAndReduceShapes(c.shape,l),f=y.sizeFromShape(d),g=re({inputs:{x:c},backend:t,attrs:{shape:[-1,f]}}),h=Tr(g,g.dtype,"any",t),x;if(a){let b=I.expandShapeToKeepDim(m,p);x=re({inputs:{x:h},backend:t,attrs:{shape:b}})}else x=re({inputs:{x:h},backend:t,attrs:{shape:m}});return t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(h),u!=null&&t.disposeIntermediateTensorInfo(c),x}var CC={kernelName:Ia,backendName:"webgl",kernelFunc:X3};var Pm=class{constructor(e,t,o){this.variableNames=["A"];let{windowSize:n,batchSize:s,outSize:a}=e;o||this.variableNames.push("bestIndicesA"),this.outputShape=[s,a];let i=t==="max"?">":"<",p=o?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
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
    `}};var Mm=class{constructor(e,t,o,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,y.assert(e.length>2,()=>`Packed arg${o.charAt(0).toUpperCase()+o.slice(1)} supports only inputs with rank above 2.`);let s=e[e.length-1],a=Math.ceil(s/t);this.outputShape=e.slice(0,-1),a>1&&this.outputShape.push(a),n||this.variableNames.push("bestIndicesA");let i=this.outputShape,p=i.length,l=Ce(p),u=mt("coords",p),c,m;if(a===1){m=p+1;let R=Ce(m);c=`
        ${R} sourceLocR = ${R}(${u.join()}, 0);
        ++${u[p-1]};
        ${R} sourceLocG = ${R}(${u.join()}, 0);
        ++${u[p-2]};
        ${R} sourceLocA = ${R}(${u.join()}, 0);
        --${u[p-1]};
        ${R} sourceLocB = ${R}(${u.join()}, 0);
        --${u[p-2]};`}else m=p,c=`
        ${l} sourceLocR = coords;
        ++${u[p-1]};
        ${l} sourceLocG = coords;
        ++${u[p-2]};
        ${l} sourceLocA = coords;
        --${u[p-1]};
        ${l} sourceLocB = coords;
        --${u[p-2]};`;let d=["x","y","z","w","u","v"].slice(0,m),f="."+d[m-1],g=d.map(R=>"int "+R),h=mt("sourceLocR",m-1).concat("inIdx.r"),x=mt("sourceLocG",m-1).concat("inIdx.g"),b=mt("sourceLocB",m-1).concat("inIdx.b"),S=mt("sourceLocA",m-1).concat("inIdx.a"),C=o==="max"?"greaterThan":"lessThan",$=n?"":`
          inIdx = round(vec4(getBestIndicesAChannel(${h.join()}),
                             getBestIndicesAChannel(${x.join()}),
                             getBestIndicesAChannel(${b.join()}),
                             getBestIndicesAChannel(${S.join()})));`,A=`vec4(
            getAChannel(${h.join()}),
            hasNextCol ? getAChannel(${x.join()}) : 0.,
            hasNextRow ? getAChannel(${b.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${S.join()}) : 0.)`,D=n?"":`
      float getBestIndicesAChannel(${g.join()}) {
        return getChannel(getBestIndicesA(${d.join()}),
                                          vec2(${d.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${g.join()}) {
        return getChannel(getA(${d.join()}),
                               vec2(${d.slice(-2).join()}));
      }
      ${D}
      void main() {
        ${l} coords = getOutputCoords();
        bool hasNextCol = ${u[p-1]} < ${i[p-1]-1};
        bool hasNextRow = ${u[p-2]} < ${i[p-2]-1};
        ${c}
        ivec4 srcIdx = ivec4(sourceLocR${f}, sourceLocG${f},
          sourceLocB${f}, sourceLocA${f}) * ${t};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${A};

        for (int i = 0; i < ${t}; i++) {
          inIdx = srcIdx;
          ${$}
          vec4 candidate = ${A};
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(${C}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}};function SC(r,e,t,o=null){let n=e.shape[0],s=e.shape[1];o!=null&&(n=o.shape[0],s=o.shape[1]);let a=I.computeOptimalWindowSize(s),i={windowSize:a,inSize:s,batchSize:n,outSize:Math.ceil(s/a)},p=new Pm(i,t,o==null),l=[e];o!=null&&l.push(o);let u=r.runWebGLProgram(p,l,"int32");if(u.shape[1]===1)return u;let c=SC(r,e,t,u);return r.disposeIntermediateTensorInfo(u),c}function NC(r,e,t,o=null){let n=o!=null?o.shape:e.shape,s=n[n.length-1],a=I.computeOptimalWindowSize(s),i=new Mm(n,a,t,o==null),p=o==null?[e]:[e,o],l=r.runWebGLProgram(i,p,"int32");if(l.shape.length===e.shape.length){let u=NC(r,e,t,l);return r.disposeIntermediateTensorInfo(l),u}return l}function Lm(r,e,t,o){let n=[t];if(I.assertAxesAreInnerMostDims("arg"+o.charAt(0).toUpperCase()+o.slice(1),n,e.shape.length),!P().getBool("WEBGL_PACK_REDUCE")||e.shape.length<=2){let s=[],a=r.texData.get(e.dataId),i=a!==null&&a.isPacked,p=e;i&&(p=r.unpackTensor(e),s.push(p));let[l,u]=I.computeOutAndReduceShapes(p.shape,n),c=y.sizeFromShape(u),m=re({inputs:{x:p},backend:r,attrs:{shape:[-1,c]}});s.push(m);let d=SC(r,m,o);s.push(d);let f=re({inputs:{x:d},backend:r,attrs:{shape:l}});return s.forEach(g=>r.disposeIntermediateTensorInfo(g)),f}return NC(r,e,o)}function Q3(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s}=o,a=y.parseAxisParam(s,n.shape),i=I.getAxesPermutation(a,n.shape.length),p=n,l=[];i!=null&&(p=nt({inputs:{x:n},backend:t,attrs:{perm:i}}),l.push(p),a=I.getInnerMostAxes(a.length,p.shape.length)),I.assertAxesAreInnerMostDims("argMax",[a[0]],p.shape.length);let u=Lm(t,p,a[0],"max");return l.forEach(c=>t.disposeIntermediateTensorInfo(c)),u}var IC={kernelName:ka,backendName:"webgl",kernelFunc:Q3};function Y3(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s}=o,a=y.parseAxisParam(s,n.shape),i=I.getAxesPermutation(a,n.shape.length),p=n,l=[];i!=null&&(p=nt({inputs:{x:n},backend:t,attrs:{perm:i}}),l.push(p),a=I.getInnerMostAxes(a.length,p.shape.length)),I.assertAxesAreInnerMostDims("argMin",[a[0]],p.shape.length);let u=Lm(t,p,a[0],"min");return l.forEach(c=>t.disposeIntermediateTensorInfo(c)),u}var kC={kernelName:Ea,backendName:"webgl",kernelFunc:Y3};var Z3=Ct+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,J3=de({opSnippet:Z3}),EC={kernelName:En,backendName:"webgl",kernelFunc:J3};var eB=Ct+"return log(x + sqrt(x * x + 1.0));",tB=de({opSnippet:eB}),$C={kernelName:$n,backendName:"webgl",kernelFunc:tB};var rB=Ct+`
  return atan(x);
`,oB=de({opSnippet:rB}),AC={kernelName:An,backendName:"webgl",kernelFunc:oB};var nB=Gp+`
  return atan(a, b);
`,sB=`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+vr+`
  return result;
`,aB=Ue({opSnippet:nB,packedOpSnippet:sB}),FC={kernelName:Dn,backendName:"webgl",kernelFunc:aB};var iB=Ct+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,pB=de({opSnippet:iB}),DC={kernelName:Fn,backendName:"webgl",kernelFunc:pB};var Qr=class{constructor(e,t,o,n=!1,s=!1){if(this.variableNames=["x"],t==="avg"&&o)throw new Error("Cannot compute positions for average pool.");let a=e.filterWidth,i=e.strideHeight,p=e.strideWidth,l=e.dilationHeight,u=e.dilationWidth,c=e.effectiveFilterHeight,m=e.effectiveFilterWidth,d=e.padInfo.top,f=e.padInfo.left;this.outputShape=e.outShape;let g=t==="avg",h=`((batch  * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + d`,x=`(xR * ${e.inWidth} + xC) * ${e.inChannels} + d`,b="0.0";if(g||(b="-1.0 / 1e-20"),o){let R=">=";this.userCode=`
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
              if (value ${R} currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = ${n?s?h:x:`wR * ${m} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let S="max",C=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t==="avg"&&(C="avgValue / max(count, 1.0)");let $=Math.floor(a/4)*4,A=a%4,D=`
      if (${g}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${S}(values, minMaxValue);
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

          for (int wC = 0; wC < ${$}; wC += 4) {
            int xC = xCCorner + wC * ${u};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              getValue(batch, xR, xC + 3 * ${u}, d)
            );

            ${D}
          }

          int xC = xCCorner + ${$};
          if (${A===1}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${D}
          } else if (${A===2}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              initializationValue,
              initializationValue
            );

            ${D}
          } else if (${A===3}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              initializationValue
            );

            ${D}
          }
        }
        setOutput(${C});
      }
    `}},gn=class{constructor(e,t,o,n=!1,s=!1){if(this.variableNames=["x"],t==="avg"&&o)throw new Error("Cannot compute positions for average pool.");let a=e.filterWidth,i=e.strideDepth,p=e.strideHeight,l=e.strideWidth,u=e.dilationDepth,c=e.dilationHeight,m=e.dilationWidth,d=e.effectiveFilterDepth,f=e.effectiveFilterHeight,g=e.effectiveFilterWidth,h=e.padInfo.front,x=e.padInfo.top,b=e.padInfo.left;this.outputShape=e.outShape;let S=t==="avg",C="0.0";if(S||(C="-1.0 / 1e-20"),o){let L=">=";this.userCode=`
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
                if (value ${L} currMinMaxValue) {
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
      `;return}let $="max",A=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t==="avg"&&(A="avgValue / max(count, 1.0)");let D=Math.floor(a/4)*4,R=a%4,M=`
      if (${S}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${$}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${i}, ${p}, ${l});
      const ivec3 pads = ivec3(${h}, ${x}, ${b});
      const float initializationValue = ${C};
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
        vec4 minMaxValue = vec4(${C});
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

            for (int wC = 0; wC < ${D}; wC += 4) {
              int xC = xCCorner + wC * ${m};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                getValue(batch, xD, xR, xC + 2 * ${m}, ch),
                getValue(batch, xD, xR, xC + 3 * ${m}, ch)
              );

              ${M}
            }

            int xC = xCCorner + ${D};
            if (${R===1}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${M}
            } else if (${R===2}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                initializationValue,
                initializationValue
              );

              ${M}
            } else if (${R===3}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                getValue(batch, xD, xR, xC + 2 * ${m}, ch),
                initializationValue
              );

              ${M}
            }
          }
        }
        setOutput(${A});
      }
    `}};function lB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e;bo(n,"avgPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:p}=o,l=1;y.assert(I.eitherStridesOrDilationsAreOne(a,l),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${l}'`);let u=I.computePool2DInfo(n.shape,s,a,l,i,p);if(u.filterWidth===1&&u.filterHeight===1&&y.arraysEqual(u.inShape,u.outShape))return dt({inputs:{x:n},backend:t});let c=new Qr(u,"avg",!1);return t.runWebGLProgram(c,[n],"float32")}var RC={kernelName:$a,backendName:"webgl",kernelFunc:lB};function uB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{filterSize:s,strides:a,pad:i,dimRoundingMode:p,dataFormat:l}=o,u=[1,1,1],c=I.computePool3DInfo(n.shape,s,a,u,i,p,l),m=new gn(c,"avg",!1);return t.runWebGLProgram(m,[n],"float32")}var OC={kernelName:Aa,backendName:"webgl",kernelFunc:uB};var Vm=class{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterHeight,o=e.filterWidth,n=e.strideHeight,s=e.strideWidth,a=e.dilationHeight,i=e.dilationWidth,p=e.effectiveFilterHeight,l=e.effectiveFilterWidth,u=p-1-e.padInfo.top,c=l-1-e.padInfo.left,m=1/(t*o);this.userCode=`
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
    `}},Bm=class{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;let t=e.filterDepth,o=e.filterHeight,n=e.filterWidth,s=e.strideDepth,a=e.strideHeight,i=e.strideWidth,p=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,c=e.effectiveFilterDepth,m=e.effectiveFilterHeight,d=e.effectiveFilterWidth,f=c-1-e.padInfo.front,g=m-1-e.padInfo.top,h=d-1-e.padInfo.left,x=1/(t*o*n);this.userCode=`
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
    `}};function cB(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,input:s}=e,a=s,{filterSize:i,strides:p,pad:l,dimRoundingMode:u}=o,c=[1,1,1],m=I.computePool3DInfo(a.shape,i,p,c,l,u),d=new Bm(m);return t.runWebGLProgram(d,[n],a.dtype)}var PC={kernelName:hu,backendName:"webgl",kernelFunc:cB};function mB(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,input:s}=e,a=s;bo([n,s],"avgPoolGrad");let{filterSize:i,strides:p,pad:l}=o,u=I.computePool2DInfo(a.shape,i,p,1,l),c=new Vm(u);return t.runWebGLProgram(c,[n],a.dtype)}var MC={kernelName:fu,backendName:"webgl",kernelFunc:mB};function dB(r){let{inputs:e,backend:t,attrs:o}=r,{a:n,b:s}=e,{transposeA:a,transposeB:i}=o;return ua({a:n,b:s,transposeA:a,transposeB:i,backend:t})}var LC={kernelName:Fa,backendName:"webgl",kernelFunc:dB};var zm=class{constructor(e,t,o,n,s,a){this.outputShape=[],this.variableNames=["x","mean","variance"],I.assertAndGetBroadcastShape(e,t),I.assertAndGetBroadcastShape(e,o);let i="0.0";n!=null&&(I.assertAndGetBroadcastShape(e,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");let p="1.0";s!=null&&(I.assertAndGetBroadcastShape(e,s),this.variableNames.push("scale"),p="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${i};
        float scale = ${p};
        float inv = scale * inversesqrt(variance + float(${a}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}};var Um=class{constructor(e,t,o,n,s,a){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],I.assertAndGetBroadcastShape(e,t),I.assertAndGetBroadcastShape(e,o);let i="vec4(0.0)";n!=null&&(I.assertAndGetBroadcastShape(e,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");let p="vec4(1.0)";s!=null&&(I.assertAndGetBroadcastShape(e,s),this.variableNames.push("scale"),p="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        vec4 offset = ${i};
        vec4 scale = ${p};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${a}));

        setOutput((x - mean) * inv + offset);
      }
    `}};var fB=({inputs:r,backend:e,attrs:t})=>{let{x:o,mean:n,variance:s,offset:a,scale:i}=r;y.assert(n.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),y.assert(a==null||n.shape.length===a.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),y.assert(i==null||n.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:p}=t;p==null&&(p=.001);let l=[o,n,s],u=null;a!=null&&(u=a.shape,l.push(a));let c=null;i!=null&&(c=i.shape,l.push(i));let m=P().getBool("WEBGL_PACK_NORMALIZATION")?new Um(o.shape,n.shape,s.shape,u,c,p):new zm(o.shape,n.shape,s.shape,u,c,p);return e.runWebGLProgram(m,l,l[0].dtype)},VC={kernelName:si,backendName:"webgl",kernelFunc:fB};var Wm=class{constructor(e){this.variableNames=["source"],this.outputShape=e,this.rank=e.length;let t=Ce(this.rank);this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let o=hB(this.rank),n,s=e.map((a,i)=>`sourceLoc.${Hg[i]} = start[${i}] + coords.${Hg[i]};`);n=`
        ${t} sourceLoc;
        ${t} coords = getOutputCoords();
        ${s.join(`
`)}
      `,this.userCode=`
      void main() {
        ${n}
        setOutput(getSource(${o}));
      }
    `}},Hg=["x","y","z","w","u","v"];function hB(r){if(r===1)return"sourceLoc";if(r<=6)return Hg.slice(0,r).map(e=>"sourceLoc."+e).join(",");throw Error(`Slicing for rank ${r} is not yet supported`)}var Gm=class{constructor(e){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let t=Ce(this.rank),o=mt("coords",this.rank),n=mt("sourceLoc",this.rank),s=this.rank===1?"sourceLoc":`vec2(${n.slice(-2).join()})`,a=`getChannel(getSource(${n.join()}), ${s})`,i=`
      result.x = ${a};
      if (++${o[this.rank-1]} < ${e[this.rank-1]}) {
        ++${n[this.rank-1]};
        result.y = ${a};
        --${n[this.rank-1]};
      }
    `,p=this.rank===1?"":`
      --${o[this.rank-1]};
      if (++${o[this.rank-2]} < ${e[this.rank-2]}) {
        ++${n[this.rank-2]};
        result.z = ${a};
        if (++${o[this.rank-1]} < ${e[this.rank-1]}) {
          ++${n[this.rank-1]};
          result.w = ${a};
        }
      }
    `,l=this.rank<=4?`sourceLoc = coords +
            ${t}(${e.map((u,c)=>`start[${c}]`).join()});`:e.map((u,c)=>`${n[c]} = ${o[c]} + start[${c}];`).join(`
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
    `}};function gB(r,e,t,o){let n=o.texData.get(r.dataId),s=o.makeTensorInfo(t,r.dtype),a=o.texData.get(s.dataId);Object.assign(a,n),a.refCount=1,a.shape=t,a.dtype=r.dtype;let i=$t.computeFlatOffset(e,y.computeStrides(r.shape));n.slice&&(i+=n.slice.flatOffset),a.slice={flatOffset:i,origDataId:n.slice&&n.slice.origDataId||r.dataId};let p=o.dataRefCount.get(a.slice.origDataId)||1;return o.dataRefCount.set(a.slice.origDataId,p+1),s}function Yr(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{begin:s,size:a}=o,[i,p]=$t.parseSliceParams(n,s,a);if($t.assertParamsValid(n,i,p),y.sizeFromShape(p)===0)return t.makeTensorInfo(p,n.dtype,[]);if(t.shouldExecuteOnCPU([n])||n.dtype==="string"){let c=t.texData.get(n.dataId),m=$w(c.values,i,p,n.shape,n.dtype);return t.makeTensorInfo(p,n.dtype,m)}let{isPacked:l}=t.texData.get(n.dataId),u=$t.isSliceContinous(n.shape,i,p);if(l||!u){let c=P().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Gm(p):new Wm(p),m=[i];return t.runWebGLProgram(c,[n],n.dtype,m)}return t.uploadToGPU(n.dataId),gB(n,i,p,t)}var BC={kernelName:Gi,backendName:"webgl",kernelFunc:Yr};var xB=r=>{let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{blockShape:s,crops:a}=o;y.assert(n.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");let i=s.reduce((b,S)=>b*S),p=I.getReshaped(n.shape,s,i),l=I.getPermuted(p.length,s.length),u=I.getReshapedPermuted(n.shape,s,i),c=I.getSliceBeginCoords(a,s.length),m=I.getSliceSize(u,a,s.length),d=[],f=re({inputs:{x:n},backend:t,attrs:{shape:p}}),g=nt({inputs:{x:f},backend:t,attrs:{perm:l}}),h=re({inputs:{x:g},backend:t,attrs:{shape:u}}),x=Yr({inputs:{x:h},backend:t,attrs:{begin:c,size:m}});return d.push(f),d.push(g),d.push(h),d.forEach(b=>t.disposeIntermediateTensorInfo(b)),x},zC={kernelName:Da,backendName:"webgl",kernelFunc:xB};function yB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,weights:s}=e,{size:a}=o,i=t.readSync(n.dataId),p=t.readSync(s.dataId),l=wm(i,p,s.dtype,s.shape,a);return t.makeTensorInfo([a],s.dtype,l)}var UC={kernelName:Ra,backendName:"webgl",kernelFunc:yB};var bB=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,_B=`
  return float(int(a.r) & int(b.r));
`;function vB(r){let{inputs:e,backend:t}=r,{a:o,b:n}=e,s=P().getBool("WEBGL_PACK_BINARY_OPERATIONS"),a=P().getNumber("WEBGL_VERSION");if(t.shouldExecuteOnCPU([o,n])||a===1){let p=t.texData.get(o.dataId).values,l=t.texData.get(n.dataId).values,[u,c]=ew(o.shape,n.shape,p,l,o.dtype),m=t.makeTensorInfo(c,o.dtype),d=t.texData.get(m.dataId);return d.values=u,m}let i;return s?i=new _r(bB,o.shape,n.shape,!1):i=new ur(_B,o.shape,n.shape),t.runWebGLProgram(i,[o,n],o.dtype)}var WC={kernelName:Rn,backendName:"webgl",kernelFunc:vB};function TB(r){let{inputs:e,backend:t}=r,{s0:o,s1:n}=e,s=t.readSync(o.dataId),a=t.readSync(n.dataId),i=I.assertAndGetBroadcastShape(Array.from(s),Array.from(a));return t.makeTensorInfo([i.length],"int32",Int32Array.from(i))}var GC={kernelName:Oa,backendName:"webgl",kernelFunc:TB};var wB="return float(a != b);",qg=Ue({opSnippet:wB,cpuKernelImpl:vw,dtype:"bool"}),HC={kernelName:ls,backendName:"webgl",kernelFunc:qg};function Bo(r){let{inputs:e,backend:t}=r,{input:o}=e,n=t.texData.get(o.dataId);return dt({inputs:{x:n.complexTensorInfos.real},backend:t})}var qC={kernelName:Oi,backendName:"webgl",kernelFunc:Bo};var CB="return float(int(x));";function KC(r,e){let t=new Mt(r.shape,CB),o=e.runWebGLProgram(t,[r],"int32");return{dataId:o.dataId,shape:o.shape,dtype:o.dtype}}function Kg(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{dtype:s}=o;if(s==="complex64"){if(n.dtype==="complex64")return dt({inputs:{x:n},backend:t});let a=yr(n.shape),i=Kg({inputs:{x:n},backend:t,attrs:{dtype:"float32"}}),p=cr({inputs:{real:i,imag:a},backend:t});return a.dispose(),t.disposeIntermediateTensorInfo(i),p}if(n.dtype==="complex64"){let a=Bo({inputs:{input:n},backend:t}),i=Kg({inputs:{x:a},backend:t,attrs:{dtype:s}});return t.disposeIntermediateTensorInfo(a),i}if(!y.hasEncodingLoss(n.dtype,s)){let a=dt({inputs:{x:n},backend:t});return{dataId:a.dataId,shape:a.shape,dtype:s}}if(t.shouldExecuteOnCPU([n])){let a=t.texData.get(n.dataId).values,[i,p,l]=tw(a,n.shape,n.dtype,s);return t.makeTensorInfo(i,p,l)}if(s==="int32")return KC(n,t);if(s==="bool"){let a=t.makeTensorInfo([],"bool",y.getTypedArrayFromDType("bool",1)),p=qg({inputs:{a:n,b:a},backend:t});return t.disposeIntermediateTensorInfo(a),p}throw new Error(`Error in Cast: failed to cast ${n.dtype} to ${s}`)}var jC={kernelName:Ko,backendName:"webgl",kernelFunc:Kg};var XC="return ceil(x);",SB=de({opSnippet:XC,packedOpSnippet:XC,cpuKernelImpl:rw}),QC={kernelName:On,backendName:"webgl",kernelFunc:SB};var Hm=class{constructor(e){this.variableNames=["A"],this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}};var qm=class{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}};function NB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{clipValueMin:s,clipValueMax:a}=o,i;P().getBool("WEBGL_PACK_CLIP")?i=new qm(n.shape):i=new Hm(n.shape);let p=[[s],[a]];return t.runWebGLProgram(i,[n],n.dtype,p)}var YC={kernelName:Pn,backendName:"webgl",kernelFunc:NB};var Km=class{constructor(e){this.variableNames=["real","imag"],this.outputShape=e,this.userCode=`
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
    `}};function ZC(r,e){return{dataId:e.dataId,dtype:e.dtype,shape:r.shape}}function IB(r){let{inputs:e,backend:t}=r,{x:o}=e,n=t.texData.get(o.dataId),s=new Km(o.shape),a=[ZC(o,n.complexTensorInfos.real),ZC(o,n.complexTensorInfos.imag)];return t.runWebGLProgram(s,a,a[0].dtype)}var JC={kernelName:Ma,backendName:"webgl",kernelFunc:IB};var jm=class{constructor(e){this.outputShape=[],this.outputShape=I.computeOutShape(e,1),this.variableNames=e.map((a,i)=>`T${i}`);let t=new Array(e.length-1);t[0]=e[0][1];for(let a=1;a<t.length;a++)t[a]=t[a-1]+e[a][1];let o=[`if (yC < ${t[0]}) setOutput(getT0(yR, yC));`];for(let a=1;a<t.length;a++){let i=t[a-1];o.push(`else if (yC < ${t[a]}) setOutput(getT${a}(yR, yC-${i}));`)}let n=t.length,s=t[t.length-1];o.push(`else setOutput(getT${n}(yR, yC-${s}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${o.join(`
        `)}
      }
    `}};var Qm=class{constructor(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=I.computeOutShape(e,t);let o=this.outputShape,n=o.length,s=Ce(n),a=mt("coords",n),i=["x","y","z","w","u","v"].slice(0,n);this.variableNames=e.map((g,h)=>`T${h}`);let p=new Array(e.length-1);p[0]=e[0][t];for(let g=1;g<p.length;g++)p[g]=p[g-1]+e[g][t];let l=i[t],u=i.slice(-2),c=i.join(),m=`if (${l} < ${p[0]}) {
        return getChannel(
            getT0(${c}), vec2(${u.join()}));
        }`;for(let g=1;g<p.length;g++){let h=p[g-1];m+=`
        if (${l} < ${p[g]}  && ${l} >= ${p[g-1]}) {
          return getChannel(
            getT${g}(${Xm(i,l,h)}),
            vec2(${Xm(u,l,h)}));
        }`}let d=p.length,f=p[p.length-1];m+=`
        return getChannel(
          getT${d}(${Xm(i,l,f)}),
          vec2(${Xm(u,l,f)}));`,this.userCode=`
      float getValue(${i.map(g=>"int "+g)}) {
        ${m}
      }

      void main() {
        ${s} coords = getOutputCoords();
        vec4 result = vec4(getValue(${a}), 0., 0., 0.);

        ${a[n-1]} = ${a[n-1]} + 1;
        if (${a[n-1]} < ${o[n-1]}) {
          result.g = getValue(${a});
        }

        ${a[n-2]} = ${a[n-2]} + 1;
        if (${a[n-2]} < ${o[n-2]}) {
          result.a = getValue(${a});
        }

        ${a[n-1]} = ${a[n-1]} - 1;
        if (${a[n-2]} < ${o[n-2]} &&
            ${a[n-1]} < ${o[n-1]}) {
          result.b = getValue(${a});
        }
        setOutput(result);
      }
    `}};function Xm(r,e,t){let o=r.indexOf(e);return r.map((s,a)=>a===o?`${s} - ${t}`:s).join()}function ca(r){let{inputs:e,backend:t}=r,{input:o}=e,n=t.texData.get(o.dataId);return dt({inputs:{x:n.complexTensorInfos.imag},backend:t})}var eS={kernelName:li,backendName:"webgl",kernelFunc:ca};function qp(r,e,t){let o=r[0].dtype;if(o==="complex64"){let d=r.map(b=>Bo({inputs:{input:b},backend:t})),f=r.map(b=>ca({inputs:{input:b},backend:t})),g=qp(d,e,t),h=qp(f,e,t),x=cr({inputs:{real:g,imag:h},backend:t});return d.forEach(b=>t.disposeIntermediateTensorInfo(b)),f.forEach(b=>t.disposeIntermediateTensorInfo(b)),t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(h),x}let n=t.shouldExecuteOnCPU(r);if(o==="string"&&(n=!0),n){let d=r.map(C=>{let A=[-1,y.sizeFromShape(C.shape.slice(e))];return re({inputs:{x:C},backend:t,attrs:{shape:A}})}),f=d.map(C=>({vals:t.readSync(C.dataId),shape:C.shape})),g=I.computeOutShape(d.map(C=>C.shape),1),h=d[0].shape[0]===1,x=ow(f,g,o,h),b=I.computeOutShape(r.map(C=>C.shape),e),S=t.makeTensorInfo(b,o,x);return d.forEach(C=>t.disposeIntermediateTensorInfo(C)),S}let s=r.filter(d=>y.sizeFromShape(d.shape)>0),a=P().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&s[0].shape.length>1;if(s.length===1){let d=a?new Mt(r[0].shape,vo):new lr(r[0].shape,vo);return t.runWebGLProgram(d,r,o)}let i=P().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER");if(s.length>i){let d=[];for(let g=0;g<s.length;g+=i){let h=s.slice(g,g+i);d.push(qp(h,e,t))}let f=qp(d,e,t);for(let g of d)t.disposeIntermediateTensorInfo(g);return f}if(a){let d=new Qm(s.map(f=>f.shape),e);return t.runWebGLProgram(d,s,o)}let{tensors2D:p,outShape:l}=kB(s,e,t),u=new jm(p.map(d=>d.shape)),c=t.runWebGLProgram(u,p,o);p.forEach(d=>t.disposeIntermediateTensorInfo(d));let m=re({inputs:{x:c},attrs:{shape:l},backend:t});return t.disposeIntermediateTensorInfo(c),m}function kB(r,e,t){let o=I.computeOutShape(r.map(s=>s.shape),e);return{tensors2D:r.map(s=>re({inputs:{x:s},attrs:{shape:[-1,y.sizeFromShape(s.shape.slice(e))]},backend:t})),outShape:o}}function jg(r){let{inputs:e,backend:t,attrs:o}=r,{axis:n}=o,s=y.parseAxisParam(n,e[0].shape)[0],a=e.map(l=>l.shape);I.assertParamsConsistent(a,s);let i=I.computeOutShape(e.map(l=>l.shape),s);if(y.sizeFromShape(i)===0)return t.makeTensorInfo(i,e[0].dtype,[]);let p=e.filter(l=>y.sizeFromShape(l.shape)>0);return p.length===1?dt({inputs:{x:p[0]},backend:t}):qp(p,s,t)}var tS={kernelName:La,backendName:"webgl",kernelFunc:jg};var Kp=class{constructor(e,t=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.outputShape=e.outShape;let a=e.padInfo.top,i=e.padInfo.left,p=e.strideHeight,l=e.strideWidth,u=e.dilationHeight,c=e.dilationWidth,m=e.filterHeight,d=e.filterWidth,f=Math.floor(e.inChannels/4)*4,g=e.inChannels%4,h=e.dataFormat==="channelsLast",x=h?1:2,b=h?2:3,S=h?3:1,C="",$="";o&&(n?C=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:s?C=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:C=`
          float activation(float x) {
            ${o}
          }
        `,$="result = activation(result);");let A=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${C}

      const ivec2 strides = ivec2(${p}, ${l});
      const ivec2 pads = ivec2(${a}, ${i});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[${S}];

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
        ${A}
        ${$}
        setOutput(result);
      }
    `}},Ym=class{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let t=e.padInfo.front,o=e.padInfo.top,n=e.padInfo.left,s=e.strideDepth,a=e.strideHeight,i=e.strideWidth,p=e.dilationDepth,l=e.dilationHeight,u=e.dilationWidth,c=e.filterDepth,m=e.filterHeight,d=e.filterWidth,f=Math.floor(e.inChannels/4)*4,g=e.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${s}, ${a}, ${i});
      const ivec3 pads = ivec3(${t}, ${o}, ${n});

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
    `}};var jp=class{constructor(e,t=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=We(this.outputShape.length);let a=e.padInfo.left,i=e.strideWidth,p=e.dilationWidth,l=e.filterHeight,u=e.filterWidth,c=u,m=`
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
   `;let d="",f="";o&&(n?d=`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${o}
         }`:s?d=`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${o}
         }`:d=`vec4 activation(vec4 x) {
           ${o}
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
     `}};var Zm=class{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec4"},{name:"pad",type:"ivec2"},{name:"stride",type:"ivec2"},{name:"dilation",type:"ivec2"},{name:"inChannels",type:"int"},{name:"itemsPerBlockRow",type:"int"},{name:"outWidth",type:"int"}],this.outputShape=e,this.enableShapeUniforms=We(this.outputShape.length);let{dataFormat:o}=t,n=it(),s=o==="channelsLast",a=s?1:2,i=s?2:3,p=this.enableShapeUniforms?"if(blockIndex < outShape[2] && pos < outShape[1]) {":`if(blockIndex < ${e[2]} && pos < ${e[1]}) {`,l="";for(let u=0;u<=1;u++)for(let c=0;c<=1;c++)l+=`
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
    `}};function Jm(r,e){let t=r.length;return t>=3?e?[...r.slice(0,-3),r[t-3]*r[t-2],r[t-1]]:[...r.slice(0,-3),r[t-3],r[t-2]*r[t-1]]:!e&&t===1&&r[0]>1?[r[0],1]:null}function ed({x:r,filter:e,convInfo:t,backend:o,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:i=null}){let p=r.shape,l=o.texData.get(r.dataId),u=t.inChannels,c=p[0]*p[1]*p[2],m=t.outChannels,d=t.dataFormat==="channelsLast",f=!1,g=!1,h,x=[];if(s!=null){let C=Jm(s.shape,d);C!=null&&(s=re({inputs:{x:s},backend:o,attrs:{shape:C}}),x.push(s))}if(n!=null){let C=Jm(n.shape,d);C!=null&&(n=re({inputs:{x:n},backend:o,attrs:{shape:C}}),x.push(n))}if(!((c===1||m===1)&&u>Gg)&&l.isPacked&&d&&l.texture!=null&&p[2]%2!==0&&y.arraysEqual(l.shape.slice(-3),p.slice(-3))){let C=p[0]*p[1]*(p[2]+1),$={dataId:r.dataId,shape:[1,C,t.inChannels],dtype:r.dtype},A=l.shape;l.shape=l.shape.slice(),l.shape[l.shape.length-2]++,y.assert(na(l.shape,$.shape),()=>`packed reshape ${l.shape} to ${$.shape} isn't free`);let D=re({inputs:{x:e},backend:o,attrs:{shape:[1,t.inChannels,t.outChannels]}});x.push(D);let R=ua({a:$,b:D,backend:o,transposeA:f,transposeB:g,bias:n,activation:i,preluActivationWeights:s,leakyreluAlpha:a}),M=o.texData.get(R.dataId);y.assert(M.isPacked,()=>"batchMatMul result is expected to be packed"),l.shape=A,M.shape=t.outShape,h=dt({inputs:{x:R},backend:o}),h.shape=t.outShape,x.push(R)}else{let C=t.outHeight*t.outWidth,$=re({inputs:{x:r},backend:o,attrs:{shape:d?[t.batchSize,C,t.inChannels]:[t.batchSize,t.inChannels,C]}}),A=re({inputs:{x:e},backend:o,attrs:{shape:[1,t.inChannels,t.outChannels]}}),D=ua({a:d?$:A,b:d?A:$,transposeA:!d,transposeB:g,backend:o,bias:n,activation:i,preluActivationWeights:s,leakyreluAlpha:a});h=re({inputs:{x:D},backend:o,attrs:{shape:t.outShape}}),x.push($),x.push(A),x.push(D)}for(let C of x)o.disposeIntermediateTensorInfo(C);return h}function td({x:r,filter:e,convInfo:t,backend:o,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:i=null}){let{filterWidth:p,filterHeight:l,inChannels:u,outWidth:c,outHeight:m,dataFormat:d}=t,f=d==="channelsLast",g=p*l*u,h=m*c,x=[t.batchSize,g,h],b=!0,S=!1,C=[];if(s!=null){let X=Jm(s.shape,f);X!=null&&(s=re({inputs:{x:s},backend:o,attrs:{shape:X}}),C.push(s))}if(n!=null){let X=Jm(n.shape,f);X!=null&&(n=re({inputs:{x:n},backend:o,attrs:{shape:X}}),C.push(n))}let $=re({inputs:{x:e},backend:o,attrs:{shape:[1,g,y.sizeFromShape(e.shape)/g]}});C.push($);let A=new Zm(x,t),D=[r.shape,[t.padInfo.top,t.padInfo.left],[t.strideHeight,t.strideWidth],[t.dilationHeight,t.dilationWidth],[t.inChannels],[t.filterWidth*t.inChannels],[t.outWidth]],R=o.runWebGLProgram(A,[r],"float32",D),M=re({inputs:{x:R},backend:o,attrs:{shape:x}});C.push(R),C.push(M);let L=n!=null,B=s!=null,W=i==="leakyrelu",G=i?Vo(i,!0):null,q=new Hp(f?M.shape:$.shape,f?$.shape:M.shape,f?[t.batchSize,h,t.outChannels]:[t.batchSize,t.outChannels,h],b,S,L,G,B,W),H=f?[M,$]:[$,M];if(n&&H.push(n),B&&H.push(s),W){let X=o.makeTensorInfo([],"float32",y.createScalarValue(a,"float32"));H.push(X),C.push(X)}let K=o.runWebGLProgram(q,H,"float32"),Z=re({inputs:{x:K},backend:o,attrs:{shape:t.outShape}});C.push(K);for(let X of C)o.disposeIntermediateTensorInfo(X);return Z}function EB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,filter:s}=e,{strides:a,pad:i,dataFormat:p,dilations:l,dimRoundingMode:u}=o,c=I.convertConv2DDataFormat(p),m=I.computeConv2DInfo(n.shape,s.shape,a,l,i,u,!1,c),d;if(m.filterHeight===1&&m.filterWidth===1&&m.dilationHeight===1&&m.dilationWidth===1&&m.strideHeight===1&&m.strideWidth===1&&(m.padInfo.type==="SAME"||m.padInfo.type==="VALID"))d=ed({x:n,filter:s,convInfo:m,backend:t});else if(m.strideWidth<=2&&c==="channelsLast"&&P().getBool("WEBGL_EXP_CONV")){let g=new jp(m),h=[[m.padInfo.top,m.padInfo.left],[m.strideHeight,m.strideWidth],[m.dilationHeight,m.dilationWidth],[m.inHeight,m.inWidth]];d=t.runWebGLProgram(g,[n,s],"float32",h)}else if(P().getBool("WEBGL_CONV_IM2COL"))d=td({x:n,filter:s,convInfo:m,backend:t});else{let g=new Kp(m);d=t.runWebGLProgram(g,[n,s],"float32")}let f=re({inputs:{x:d},backend:t,attrs:{shape:m.outShape}});return t.disposeIntermediateTensorInfo(d),f}var rS={kernelName:Va,backendName:"webgl",kernelFunc:EB};var rd=class{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,o=e.strideWidth,n=e.padInfo.top,s=e.padInfo.left,a=e.dataFormat==="channelsLast";this.userCode=`
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
              int xC = wC + yC * ${o} - ${s};

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
    `}},od=class{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,o=e.filterWidth,n=e.strideHeight,s=e.strideWidth,a=e.dataFormat==="channelsLast",i=t-1-e.padInfo.top,p=o-1-e.padInfo.left,l=a?1:2,u=a?2:3,c=a?3:1;this.userCode=`
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

          for (int wC = 0; wC < ${o}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${o} - 1 - wC;

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
    `}},nd=class{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideDepth,o=e.strideHeight,n=e.strideWidth,s=e.padInfo.front,a=e.padInfo.top,i=e.padInfo.left;this.userCode=`
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
              int xR = wR + yR * ${o} - ${a};

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
    `}},sd=class{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterDepth,o=e.filterHeight,n=e.filterWidth,s=e.strideDepth,a=e.strideHeight,i=e.strideWidth,p=t-1-e.padInfo.front,l=o-1-e.padInfo.top,u=n-1-e.padInfo.left;this.userCode=`
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

          for (int wR = 0; wR < ${o}; wR++) {
            float dyR = float(dyRCorner + wR) / ${a}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${o} - 1 - wR;

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
    `}};function $B(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,dy:s}=e,{strides:a,pad:i,dataFormat:p,dimRoundingMode:l,filterShape:u}=o,c=I.convertConv2DDataFormat(p),m=I.computeConv2DInfo(n.shape,u,a,1,i,l,!1,c),d=new rd(m);return t.runWebGLProgram(d,[n,s],"float32")}var oS={kernelName:Ba,backendName:"webgl",kernelFunc:$B};var ad=class{constructor(e){this.variableNames=["dy","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"strides",type:"vec2"}],this.outputShape=e.inShape,this.enableShapeUniforms=We(this.outputShape.length);let t=e.filterHeight,o=e.filterWidth,n=t-1-e.padInfo.top,s=o-1-e.padInfo.left;this.userCode=`
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

          for (int wC = 0; wC < ${o}; wC++) {
            int wCPerm = ${o} - 1 - wC;

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
    `}};function AB(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,filter:s}=e,{inputShape:a,strides:i,pad:p,dataFormat:l,dimRoundingMode:u}=o,c=I.convertConv2DDataFormat(l),m=I.computeConv2DInfo(a,s.shape,i,1,p,u,!1,c);if(P().getBool("WEBGL_PACK_CONV2DTRANSPOSE")&&c==="channelsLast"){let d=[[m.strideHeight,m.strideWidth]],f=new ad(m);return t.runWebGLProgram(f,[n,s],"float32",d)}else{let d=new od(m);return t.runWebGLProgram(d,[n,s],"float32")}}var nS={kernelName:za,backendName:"webgl",kernelFunc:AB};function FB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,filter:s}=e,{strides:a,pad:i,dilations:p}=o,l=I.computeConv3DInfo(n.shape,s.shape,a,p,i),u=new Ym(l);return t.runWebGLProgram(u,[n,s],"float32")}var sS={kernelName:Ua,backendName:"webgl",kernelFunc:FB};function DB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,dy:s}=e,{strides:a,pad:i,filterShape:p}=o,l=I.computeConv3DInfo(n.shape,p,a,1,i),u=new nd(l);return t.runWebGLProgram(u,[n,s],"float32")}var aS={kernelName:gu,backendName:"webgl",kernelFunc:DB};function RB(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,filter:s}=e,{pad:a,strides:i,inputShape:p}=o,l=I.computeConv3DInfo(p,s.shape,i,1,a),u=new sd(l);return t.runWebGLProgram(u,[n,s],"float32")}var iS={kernelName:Wa,backendName:"webgl",kernelFunc:RB};var OB=zr+`
  return cos(x);
`,PB=`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${vr}
  return result;
`,MB=de({opSnippet:OB,packedOpSnippet:PB}),pS={kernelName:Mn,backendName:"webgl",kernelFunc:MB};var LB=`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`,VB=de({opSnippet:LB}),lS={kernelName:Ln,backendName:"webgl",kernelFunc:VB};var id=class{constructor(e,t,o,n,s){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];let[a,i,p,l]=e,[u]=t,[c,m]=o;this.outputShape=[u,c,m,l];let d=n==="bilinear"?1:0,[f,g]=[`${i-1}.0`,`${p-1}.0`],[h,x,b]=c>1?[`${(i-1)/(c-1)}`,"(y2-y1) * height_ratio",`y1*${f} + float(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${f}`],[S,C,$]=m>1?[`${(p-1)/(m-1)}`,"(x2-x1) * width_ratio",`x1*${g} + float(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${g}`];this.userCode=`
      const float height_ratio = float(${h});
      const float width_ratio = float(${S});
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
        float width_scale = ${C};

        float in_y = ${b};
        if( in_y < 0.0 || in_y > ${f} ) {
          setOutput(float(${s}));
          return;
        }
        float in_x = ${$};
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
    `}};var BB=r=>{let{inputs:e,backend:t,attrs:o}=r,{image:n,boxes:s,boxInd:a}=e,{cropSize:i,method:p,extrapolationValue:l}=o,u=new id(n.shape,s.shape,i,p,l);return t.runWebGLProgram(u,[n,s,a],"float32")},uS={kernelName:qa,backendName:"webgl",kernelFunc:BB};var ma;(function(r){r.Prod="*",r.Sum="+"})(ma||(ma={}));var Ul=class{constructor(e,t,o,n){this.op=e,this.outputShape=t,this.variableNames=["x"],this.customUniforms=[{name:"index",type:"float"}];let s=this.outputShape.length,a=this.op===ma.Prod?"1.0":"0.0",i=o?a:`getX(${cS(s,"coords",this.op)})`,p=this.outputShape[this.outputShape.length-1],l="",u="";o?(l=n?`end != ${p-1}`:"end != 0",u=n?"end + 1":"end - 1"):(l=n?`end + pow2 < ${p}`:"end >= pow2",u=n?"end + pow2":"end - pow2"),this.userCode=`
      void main() {
        ${Ce(s)} coords = getOutputCoords();
        int end = ${mS(s,"coords",this.op)};
        float val = ${i};
        int pow2 = int(pow(2.0, index));
        if (${l}) {
          int idx = ${u};
          ${mS(s,"coords",this.op)} = idx;
          val ${this.op}= getX(${cS(s,"coords",this.op)});
        }
        setOutput(val);
      }
    `}};function cS(r,e,t){if(r===1)return`${e}`;if(r===2)return`${e}.x, ${e}.y`;if(r===3)return`${e}.x, ${e}.y, ${e}.z`;if(r===4)return`${e}.x, ${e}.y, ${e}.z, ${e}.w`;throw new Error(`Cumulative ${t} for rank ${r} is not yet supported`)}function mS(r,e,t){if(r===1)return`${e}`;if(r===2)return`${e}.y`;if(r===3)return`${e}.z`;if(r===4)return`${e}.w`;throw new Error(`Cumulative ${t} for rank ${r} is not yet supported`)}function pd(r,e,t,o,n,s){let a=e.shape.length,i=I.getAxesPermutation([o],a),p=e;i!=null&&(p=nt({inputs:{x:e},backend:t,attrs:{perm:i}}));let l=I.getInnerMostAxes(1,a)[0];if(l!==a-1)throw new Error(`WebGL cumprod shader expects an inner-most axis=${e.shape.length-1} but got axis=${o}`);let u=p.shape[l],c=dt({inputs:{x:p},backend:t});for(let m=0;m<=Math.ceil(Math.log2(u))-1;m++){let d=new Ul(r,p.shape,!1,s),f=[[m]],g=c;c=t.runWebGLProgram(d,[c],c.dtype,f),t.disposeIntermediateTensorInfo(g)}if(n){let m=new Ul(r,p.shape,n,s),d=c;c=t.runWebGLProgram(m,[c],c.dtype),t.disposeIntermediateTensorInfo(d)}if(i!=null){let m=I.getUndoAxesPermutation(i),d=nt({inputs:{x:c},backend:t,attrs:{perm:m}});return t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(p),d}return c}function zB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,exclusive:a,reverse:i}=o;return pd(ma.Prod,n,t,s,a,i)}var dS={kernelName:Ga,backendName:"webgl",kernelFunc:zB};function UB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,exclusive:a,reverse:i}=o;return pd(ma.Sum,n,t,s,a,i)}var fS={kernelName:Ha,backendName:"webgl",kernelFunc:UB};function WB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,weights:s}=e,{size:a,binaryOutput:i}=o;if(n.shape.length===1){let p=t.readSync(n.dataId),l=t.readSync(s.dataId),u=wm(p,l,s.dtype,s.shape,a);return t.makeTensorInfo([a],s.dtype,u)}else if(n.shape.length===2){let p=t.bufferSync(n),l=t.bufferSync(s),u=J0(p,l,a,i);return t.makeTensorInfo(u.shape,s.dtype,u.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}var hS={kernelName:Ka,backendName:"webgl",kernelFunc:WB};var ld=class{constructor(e,t,o){this.variableNames=["x"],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=o,this.userCode=`
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
  `}getHeightCoordString(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"}getWidthCoordString(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"}getDepthCoordString(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"}getOutputDepthSize(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}};function GB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{blockSize:s,dataFormat:a}=o,i=n.shape[0],p=a==="NHWC"?n.shape[1]:n.shape[2],l=a==="NHWC"?n.shape[2]:n.shape[3],u=a==="NHWC"?n.shape[3]:n.shape[1],c=p*s,m=l*s,d=u/(s*s),f=a==="NHWC"?[i,c,m,d]:[i,d,c,m],g=new ld(f,s,a);return t.runWebGLProgram(g,[n],n.dtype)}var gS={kernelName:ja,backendName:"webgl",kernelFunc:GB};var Xp=class{constructor(e,t=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=We(this.outputShape.length);let a=e.filterHeight,i=e.filterWidth,p=e.outChannels/e.inChannels,l="",u="";o&&(n?l=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:s?l=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:l=`
          float activation(float x) {
            ${o}
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
    `}};var Qp=class{constructor(e,t=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=We(this.outputShape.length);let a=e.outChannels/e.inChannels,i=e.padInfo.left,p=e.strideWidth,l=e.dilationWidth,u=e.filterHeight,c=e.filterWidth,m=c,d=`
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
                `,b+1<c)){let S=i%2===0?y.nearestLargerEven(l):l;l%2===0&&i%2===1||l%2!==0&&i%2!==1?(d+=`
                  xCOffset = xC + imod(pads[1], 2) + ${S};

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
                    `):S===1?d+=`
                    xC${b+1} = xTexelC${b};
                    `:d+=`
                    xCOffset = xC + ${S};

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
    `;let f="",g="";o&&(n?f=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:s?f=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:f=`vec4 activation(vec4 x) {
          ${o}
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
    `}};function HB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,filter:s}=e,{strides:a,pad:i,dilations:p,dimRoundingMode:l}=o,u=p;u==null&&(u=[1,1]),y.assert(I.eitherStridesOrDilationsAreOne(a,u),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${a} and dilations '${u}'`);let c=I.computeConv2DInfo(n.shape,s.shape,a,u,i,l,!0),m;P().getBool("WEBGL_PACK_DEPTHWISECONV")&&c.strideWidth<=2&&c.outChannels/c.inChannels===1?m=new Qp(c):m=new Xp(c);let d=[[c.padInfo.top,c.padInfo.left],[c.strideHeight,c.strideWidth],[c.dilationHeight,c.dilationWidth],[c.inHeight,c.inWidth]];return t.runWebGLProgram(m,[n,s],"float32",d)}var xS={kernelName:Xa,backendName:"webgl",kernelFunc:HB};var ud=class{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;let t=e.strideHeight,o=e.strideWidth,n=e.padInfo.top,s=e.padInfo.left,a=e.outChannels/e.inChannels;this.userCode=`
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
              int xC = wC + yC * ${o} - ${s};

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
    `}},cd=class{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;let t=e.filterHeight,o=e.filterWidth,n=e.strideHeight,s=e.strideWidth,a=t-1-e.padInfo.top,i=o-1-e.padInfo.left,p=e.outChannels/e.inChannels;this.userCode=`
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

          for (int wC = 0; wC < ${o}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${o} - 1 - wC;

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
    `}};function qB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,dy:s}=e,{strides:a,dilations:i,pad:p,dimRoundingMode:l,filterShape:u}=o,c=I.computeConv2DInfo(n.shape,u,a,i,p,l,!0),m=new ud(c);return t.runWebGLProgram(m,[n,s],"float32")}var yS={kernelName:Qa,backendName:"webgl",kernelFunc:qB};function KB(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,filter:s}=e,{strides:a,dilations:i,pad:p,dimRoundingMode:l,inputShape:u}=o,c=I.computeConv2DInfo(u,s.shape,a,i,p,l,!0),m=new cd(c);return t.runWebGLProgram(m,[n,s],"float32")}var bS={kernelName:Ya,backendName:"webgl",kernelFunc:KB};var md=class{constructor(e){this.variableNames=["X"],this.outputShape=[e,e],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}};function jB(r){let{inputs:e,backend:t}=r,{x:o}=e,n=[...o.shape,...o.shape],s=y.sizeFromShape(o.shape),a=re({inputs:{x:o},backend:t,attrs:{shape:[s]}}),i=new md(s),p=t.runWebGLProgram(i,[a],a.dtype),l=re({inputs:{x:p},backend:t,attrs:{shape:n}});return t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(p),l}var _S={kernelName:Za,backendName:"webgl",kernelFunc:jB};var dd=class{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;let{inHeight:t,inWidth:o,padInfo:n,strideHeight:s,strideWidth:a,filterHeight:i,filterWidth:p,dilationHeight:l,dilationWidth:u}=e,{top:c,left:m}=n;this.userCode=`
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

              if (wIn >= 0 && wIn < ${o}) {
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
    `}};function XB(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,filter:s}=e,{strides:a,pad:i,dilations:p}=o,l=I.computeDilation2DInfo(n.shape,s.shape,a,i,"NHWC",p),u,c=new dd(l);u=t.runWebGLProgram(c,[n,s],"float32");let m=re({inputs:{x:u},backend:t,attrs:{shape:l.outShape}});return t.disposeIntermediateTensorInfo(u),m}var vS={kernelName:Ja,backendName:"webgl",kernelFunc:XB};function QB(r){let{inputs:e,backend:t,attrs:o}=r,{equation:n}=o,s=e,{allDims:a,summedDims:i,idDims:p}=I.decodeEinsumEquation(n,s.length);I.checkEinsumDimSizes(a.length,p,s);let{path:l,steps:u}=I.getEinsumComputePath(i,p),c=u.length,m=null,d=a.length,f=[];for(let g=0;g<c;++g){for(let h of u[g]){let{permutationIndices:x,expandDims:b}=I.getEinsumPermutation(d,p[h]),S;I.isIdentityPermutation(x)?S=s[h]:(S=nt({inputs:{x:s[h]},backend:t,attrs:{perm:x}}),f.push(S));let C=S.shape.slice();for(let $=0;$<b.length;++$)C.splice(b[$],0,1);y.arraysEqual(S.shape,C)||(S=re({inputs:{x:S},backend:t,attrs:{shape:C}}),f.push(S)),m===null?m=S:(m=Bl({inputs:{a:S,b:m},backend:t}),f.push(m))}g<c-1&&(l[g]>=0&&(m=la({inputs:{x:m},backend:t,attrs:{axis:l[g]-(a.length-d),keepDims:!1}}),f.push(m)),d--)}for(let g of f)g!==m&&t.disposeIntermediateTensorInfo(g);return m}var TS={kernelName:ei,backendName:"webgl",kernelFunc:QB};var YB="return (x >= 0.0) ? x : (exp(x) - 1.0);",ZB=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,JB=de({opSnippet:YB,packedOpSnippet:ZB}),wS={kernelName:Bn,backendName:"webgl",kernelFunc:JB};var ez="return (b >= 0.0) ? a : a * (b + 1.0);",tz=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,rz=r=>{let{inputs:e,backend:t}=r,{dy:o,y:n}=e,s=P().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new _r(tz,o.shape,n.shape):new ur(ez,o.shape,n.shape);return t.runWebGLProgram(s,[o,n],o.dtype)},CS={kernelName:xu,backendName:"webgl",kernelFunc:rz};var oz=`
  return vec4(equal(a, b));
`,nz="return float(a == b);",sz=Ue({opSnippet:nz,packedOpSnippet:oz,dtype:"bool",cpuKernelImpl:nw}),SS={kernelName:Un,backendName:"webgl",kernelFunc:sz};var az=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${I.ERF_P};
  float a1 = ${I.ERF_A1};
  float a2 = ${I.ERF_A2};
  float a3 = ${I.ERF_A3};
  float a4 = ${I.ERF_A4};
  float a5 = ${I.ERF_A5};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`,iz=de({opSnippet:az}),NS={kernelName:zn,backendName:"webgl",kernelFunc:iz};var pz=zr+`
  return exp(x);
`,lz=`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,Xg=de({opSnippet:pz,packedOpSnippet:lz,cpuKernelImpl:sw,dtype:"float32"}),IS={kernelName:Wn,backendName:"webgl",kernelFunc:Xg};function fd(r){let{inputs:e,attrs:t,backend:o}=r,{dim:n}=t,{input:s}=e,a=s.shape.length,i=s.shape.slice(),p=n;return n<0&&(y.assert(-(a+1)<=n,()=>`Axis must be in the interval [${-(a+1)}, ${a}]`),p=a+n+1),i.splice(p,0,1),re({inputs:{x:s},backend:o,attrs:{shape:i}})}var kS={kernelName:ti,backendName:"webgl",kernelFunc:fd};var ES="return exp(x) - 1.0;",uz=de({opSnippet:ES,packedOpSnippet:ES,cpuKernelImpl:aw}),$S={kernelName:Gn,backendName:"webgl",kernelFunc:uz};var Wl=class{constructor(e,t,o){this.variableNames=["real","imag"];let n=t[1];this.outputShape=t;let s=o?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,a=o?`${n}.0`:"1.0",i;if(e==="real")i="return real * expR - imag * expI;";else if(e==="imag")i="return real * expI + imag * expR;";else throw new Error(`FFT component must be either "real" or "imag", got ${e}.`);this.userCode=`
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
    `}};function hd(r,e,t){let o=t.texData.get(r.dataId),n=y.sizeFromShape(r.shape),s=r.shape[r.shape.length-1],a=n/s,i=re({inputs:{x:r},backend:t,attrs:{shape:[a,s]}}),p=i.shape,l=new Wl("real",p,e),u=new Wl("imag",p,e),c=[{dataId:o.complexTensorInfos.real.dataId,dtype:o.complexTensorInfos.real.dtype,shape:p},{dataId:o.complexTensorInfos.imag.dataId,dtype:o.complexTensorInfos.imag.dtype,shape:p}],m=t.runWebGLProgram(l,c,"float32"),d=t.runWebGLProgram(u,c,"float32"),f=cr({inputs:{real:m,imag:d},backend:t});t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d);let g=re({inputs:{x:f},backend:t,attrs:{shape:r.shape}});return t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(f),g}function cz(r){let{inputs:e,backend:t}=r,{input:o}=e;return hd(o,!1,t)}var AS={kernelName:ri,backendName:"webgl",kernelFunc:cz};var gd=class{constructor(e,t){this.outputShape=[],this.customUniforms=[{name:"value",type:"float"}],this.variableNames=["x"],this.outputShape=e,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}};function zo(r){let{backend:e,attrs:t}=r,{shape:o,value:n}=t,{dtype:s}=t;if(s=s||y.inferDtype(n),s==="string"){let a=y.getArrayFromDType(s,y.sizeFromShape(o));return a.fill(n),e.makeTensorInfo(o,s,a)}else{let a=new gd(o,n),i=[[n]];return e.runWebGLProgram(a,[],s,i)}}var FS={kernelName:oi,backendName:"webgl",kernelFunc:zo};var xd=class{constructor(e){this.variableNames=["Image"],this.outputShape=[];let t=e[2];this.outputShape=e,this.userCode=`
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
    `}};var DS={kernelName:ni,backendName:"webgl",kernelFunc:({inputs:r,backend:e})=>{let{image:t}=r,o=e,n=new xd(t.shape);return o.runWebGLProgram(n,[t],t.dtype)}};var RS="return floor(x);",mz=de({opSnippet:RS,packedOpSnippet:RS,cpuKernelImpl:iw}),OS={kernelName:Hn,backendName:"webgl",kernelFunc:mz};var dz=`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,fz=`
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
`,hz=Ue({opSnippet:dz,packedOpSnippet:fz,dtype:"int32"}),PS={kernelName:qn,backendName:"webgl",kernelFunc:hz};var yd=class{constructor(e){this.variableNames=["A"];let t=it(),[o,n]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${n}.0, ${o}.0);

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
    `}};var bd=class{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;let t=it(),[o,n]=e;this.outputShape=e,this.userCode=`
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
                       vec2(${n}.0, ${o}.0);
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
    `}};var MS={kernelName:cl,backendName:"webgl",kernelFunc:gz},Yp,Qg=P().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");function gz(r){let{inputs:e,backend:t,attrs:o}=r,{pixels:n}=e,{numChannels:s}=o,a=typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement,i=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,[p,l]=a?[n.videoWidth,n.videoHeight]:[n.width,n.height],u=[l,p],c=[l,p,s];if(i||a){let g=P().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(Yp==null||g!==Qg)&&(Qg=g,Yp=document.createElement("canvas").getContext("2d",{willReadFrequently:Qg})),Yp.canvas.width=p,Yp.canvas.height=l,Yp.drawImage(n,0,0,p,l),n=Yp.canvas}let m=t.makeTensorInfo(u,"int32");t.texData.get(m.dataId).usage=Gt.PIXELS,t.gpgpu.uploadPixelDataToTexture(t.getTexture(m.dataId),n);let d=P().getBool("WEBGL_PACK")?new bd(c):new yd(c),f=t.runWebGLProgram(d,[m],"int32");return t.disposeData(m.dataId),f}function xz(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,filter:s,bias:a,preluActivationWeights:i}=e,{strides:p,pad:l,dataFormat:u,dilations:c,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=o,g=I.convertConv2DDataFormat(u),h=I.computeConv2DInfo(n.shape,s.shape,p,c,l,m,!1,g),x,b=[],S=a!=null,C=i!=null,$=d==="leakyrelu",A=()=>{let R=[n,s],M=(L,B)=>{if(B==="NCHW"&&L.shape.length===1&&L.shape[0]!==1){let W=re({inputs:{x:L},backend:t,attrs:{shape:[L.shape[0],1,1]}});return b.push(W),W}return L};if(S&&R.push(M(a,u)),C&&R.push(M(i,u)),$){let L=t.makeTensorInfo([],"float32",y.createScalarValue(f,"float32"));R.push(L),b.push(L)}return R};if(h.filterHeight===1&&h.filterWidth===1&&h.dilationHeight===1&&h.dilationWidth===1&&h.strideHeight===1&&h.strideWidth===1&&(h.padInfo.type==="SAME"||h.padInfo.type==="VALID"))x=ed({x:n,filter:s,convInfo:h,backend:t,bias:a,activation:d,preluActivationWeights:i,leakyreluAlpha:f});else if(h.strideWidth<=2&&g==="channelsLast"&&P().getBool("WEBGL_EXP_CONV")){let R=d?Vo(d,!0):null,M=new jp(h,S,R,C,$),L=[[h.padInfo.top,h.padInfo.left],[h.strideHeight,h.strideWidth],[h.dilationHeight,h.dilationWidth],[h.inHeight,h.inWidth]],B=A();x=t.runWebGLProgram(M,B,"float32",L)}else if(P().getBool("WEBGL_CONV_IM2COL"))x=td({x:n,filter:s,convInfo:h,backend:t,bias:a,activation:d,preluActivationWeights:i,leakyreluAlpha:f});else{let R=d?Vo(d,!1):null,M=new Kp(h,S,R,C,$),L=A();x=t.runWebGLProgram(M,L,"float32")}let D=re({inputs:{x},backend:t,attrs:{shape:h.outShape}});return b.push(x),b.forEach(R=>t.disposeIntermediateTensorInfo(R)),D}var LS={kernelName:$s,backendName:"webgl",kernelFunc:xz};function yz(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,filter:s,bias:a,preluActivationWeights:i}=e,{strides:p,pad:l,dilations:u,dimRoundingMode:c,activation:m,leakyreluAlpha:d}=o,f=[],g=u;g==null&&(g=[1,1]),y.assert(I.eitherStridesOrDilationsAreOne(p,g),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${p} and dilations '${g}'`);let h=I.computeConv2DInfo(n.shape,s.shape,p,g,l,c,!0),x=P().getBool("WEBGL_PACK_DEPTHWISECONV")&&h.strideWidth<=2&&h.outChannels/h.inChannels===1,b=m?Vo(m,x):null,S=[n,s],C=a!=null,$=i!=null,A=m==="leakyrelu";if(C&&S.push(a),$&&S.push(i),A){let L=t.makeTensorInfo([],"float32",y.createScalarValue(d,"float32"));S.push(L),f.push(L)}let D;x?D=new Qp(h,C,b,$,A):D=new Xp(h,C,b,$,A);let R=[[h.padInfo.top,h.padInfo.left],[h.strideHeight,h.strideWidth],[h.dilationHeight,h.dilationWidth],[h.inHeight,h.inWidth]],M=t.runWebGLProgram(D,S,"float32",R);return f.forEach(L=>t.disposeIntermediateTensorInfo(L)),M}var VS={kernelName:As,backendName:"webgl",kernelFunc:yz};var _d=class{constructor(e,t,o,n){this.sliceDim=e,this.strides=t,this.paramsShape=n,this.variableNames=["x","indices"],this.outputShape=o;let s=Ce(o.length),a=`
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
      `}};function bz(r){let{inputs:e,backend:t}=r,{params:o,indices:n}=e,s=n.shape,a=s[s.length-1],i=y.sizeFromShape(o.shape),[p,l,u,c]=I.prepareAndValidate(o,n),m=re({inputs:{x:n},backend:t,attrs:{shape:[l,a]}}),d=re({inputs:{x:o},backend:t,attrs:{shape:[y.sizeFromShape(o.shape)/u,u]}});if(t.shouldExecuteOnCPU([o,n])||o.dtype==="string"){let x=t.readSync(n.dataId),b=t.bufferSync(o),S=pw(x,b,o.dtype,l,a,u,c,o.shape,i);return t.makeTensorInfo(p,o.dtype,S.values)}let f=new _d(a,c,[l,u],o.shape),g=t.runWebGLProgram(f,[d,m],d.dtype),h=re({inputs:{x:g},backend:t,attrs:{shape:p}});return t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(g),h}var BS={kernelName:ii,backendName:"webgl",kernelFunc:bz};var vd=class{constructor(e,t){this.variableNames=["A","indices"],this.outputShape=t,this.rank=t.length;let o=Ce(this.rank),n=_z(e,2);this.userCode=`
      void main() {
        ${o} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${e[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${n}));
      }
    `}};function _z(r,e){let t=["resRC.x","resRC.y","resRC.z","resRC.w"],o=[];for(let n=0;n<r.length;n++)n===2?o.push("index"):o.push(`${t[n]}`);return o.join()}function Yg(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,indices:s}=e,{axis:a,batchDims:i}=o,p=y.parseAxisParam(a,n.shape)[0];if(P().get("DEBUG")){let b=t.readSync(s.dataId),S=n.shape[p];for(let C=0;C<b.length;++C){let $=b[C];y.assert($<=S-1&&$>=0,()=>`GatherV2: the index value ${$} is not in [0, ${S-1}]`)}}let l=I.segment_util.collectGatherOpShapeInfo(n,s,p,i),u=y.sizeFromShape(s.shape),c=[],m=re({inputs:{x:n},backend:t,attrs:{shape:[l.batchSize,l.outerSize,l.dimSize,l.sliceSize]}}),d=re({inputs:{x:s},backend:t,attrs:{shape:[l.batchSize,u/l.batchSize]}});c.push(m),c.push(d);let f=[l.batchSize,l.outerSize,u/l.batchSize,l.sliceSize];if(t.shouldExecuteOnCPU([n,s])||n.dtype==="string"){let b=t.bufferSync(d),S=t.bufferSync(m),C=lw(S,b,f);return c.forEach($=>t.disposeIntermediateTensorInfo($)),t.makeTensorInfo(l.outputShape,C.dtype,C.values)}let g=new vd(m.shape,f),h=t.runWebGLProgram(g,[m,d],m.dtype);c.push(h);let x=re({inputs:{x:h},backend:t,attrs:{shape:l.outputShape}});return c.forEach(b=>t.disposeIntermediateTensorInfo(b)),x}var zS={kernelName:ai,backendName:"webgl",kernelFunc:Yg};var vz="return float(a > b);",Tz=`
  return vec4(greaterThan(a, b));
`,wz=Ue({opSnippet:vz,packedOpSnippet:Tz,cpuKernelImpl:uw,dtype:"bool"}),US={kernelName:Kn,backendName:"webgl",kernelFunc:wz};var Cz="return float(a >= b);",Sz=`
  return vec4(greaterThanEqual(a, b));
`,Nz=Ue({opSnippet:Cz,packedOpSnippet:Sz,dtype:"bool",cpuKernelImpl:cw}),WS={kernelName:jn,backendName:"webgl",kernelFunc:Nz};function Iz(r){let{inputs:e,backend:t}=r,{input:o}=e;return hd(o,!0,t)}var GS={kernelName:pi,backendName:"webgl",kernelFunc:Iz};var kz="return float(!isnan(x) && !isinf(x));",Ez=de({opSnippet:kz,dtype:"bool"}),HS={kernelName:Xn,backendName:"webgl",kernelFunc:Ez};var $z="return float(isinf(x));",Az=de({opSnippet:$z,dtype:"bool"}),qS={kernelName:Qn,backendName:"webgl",kernelFunc:Az};var Fz="return float(isnan(x));",Dz=de({opSnippet:Fz,dtype:"bool"}),KS={kernelName:Yn,backendName:"webgl",kernelFunc:Dz};var Rz="return float(a < b);",Oz=`
  return vec4(lessThan(a, b));
`,Pz=Ue({opSnippet:Rz,packedOpSnippet:Oz,cpuKernelImpl:mw,dtype:"bool"}),jS={kernelName:Zn,backendName:"webgl",kernelFunc:Pz};var Mz="return float(a <= b);",Lz=`
  return vec4(lessThanEqual(a, b));
`,Vz=Ue({opSnippet:Mz,packedOpSnippet:Lz,cpuKernelImpl:dw,dtype:"bool"}),XS={kernelName:Jn,backendName:"webgl",kernelFunc:Vz};function Bz(r){let{backend:e,attrs:t}=r,{start:o,stop:n,num:s}=t,a=fw(o,n,s);return e.makeTensorInfo([a.length],"float32",a)}var QS={kernelName:ci,backendName:"webgl",kernelFunc:Bz};var zz=zr+`
  return x < 0.0 ? 0./0. : log(x);
`,Uz=`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,Wz=de({opSnippet:zz,packedOpSnippet:Uz,cpuKernelImpl:hw}),YS={kernelName:es,backendName:"webgl",kernelFunc:Wz};var Gz=zr+`
  return log(1.0 + x);
`,Hz=de({opSnippet:Gz}),ZS={kernelName:ts,backendName:"webgl",kernelFunc:Hz};var qz="return float(a >= 1.0 && b >= 1.0);",Kz=`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,jz=Ue({opSnippet:qz,packedOpSnippet:Kz,dtype:"bool"}),JS={kernelName:rs,backendName:"webgl",kernelFunc:jz};var Xz="return float(!(x >= 1.0));",Qz=de({opSnippet:Xz}),eN={kernelName:os,backendName:"webgl",kernelFunc:Qz};var Yz="return float(a >= 1.0 || b >= 1.0);",Zz=`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,Jz=Ue({opSnippet:Yz,packedOpSnippet:Zz,dtype:"bool"}),tN={kernelName:ns,backendName:"webgl",kernelFunc:Jz};var Td=class{constructor(e,t,o,n,s){this.variableNames=["x"],this.outputShape=[];let a=t,i=e[3]-1;this.outputShape=e;let p,l=`float(${o}) + float(${n}) * sum`;s===.5?p=`inversesqrt(${l})`:s===1?p=`1.0/(${l})`:p=`exp(log(${l}) * float(-${s}));`,this.userCode=`
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
    `}};var wd=class{constructor(e,t,o,n,s){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;let a=t,i=e[3]-1;this.outputShape=e;let p,l=`float(${o}) + float(${n}) * sum`;s===.5?p=`inversesqrt(${l})`:s===1?p=`1.0/(${l})`:p=`exp(log(${l}) * float(-${s}));`,this.userCode=`
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
    `}};var e4=r=>{let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{depthRadius:s,bias:a,alpha:i,beta:p}=o,l=P().getBool("WEBGL_PACK_NORMALIZATION")?new wd(n.shape,s,a,i,p):new Td(n.shape,s,a,i,p);return t.runWebGLProgram(l,[n],n.dtype)},rN={kernelName:mi,backendName:"webgl",kernelFunc:e4};var Cd=class{constructor(e,t,o,n,s){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=o,this.alpha=n,this.beta=s,this.userCode=`
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

          norm = float(${n}) * norm + float(${o});

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
    `}};var t4=r=>{let{inputs:e,backend:t,attrs:o}=r,{x:n,y:s,dy:a}=e,{depthRadius:i,bias:p,alpha:l,beta:u}=o,c=new Cd(n.shape,i,p,l,u);return t.runWebGLProgram(c,[n,s,a],n.dtype)},oN={kernelName:yu,backendName:"webgl",kernelFunc:t4};function nN(r,e,t,o){let n=y.sizeFromShape(e),a=y.sizeFromShape(r.shape)/n,i=re({inputs:{x:r},attrs:{shape:[a,n]},backend:o}),p=Tr(i,r.dtype,"max",o),l=re({inputs:{x:p},attrs:{shape:t},backend:o});return o.disposeIntermediateTensorInfo(i),o.disposeIntermediateTensorInfo(p),l}function Zg(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{reductionIndices:s,keepDims:a}=o,i=n.shape.length,p=y.parseAxisParam(s,n.shape),l=p,u=I.getAxesPermutation(l,i),c=u!=null,m=t.shouldExecuteOnCPU([n]),d=n;if(c){if(m){let S=t.texData.get(d.dataId).values,C=new Array(i);for(let D=0;D<C.length;D++)C[D]=n.shape[u[D]];let $=pa(S,n.shape,n.dtype,u,C);d=t.makeTensorInfo(C,n.dtype);let A=t.texData.get(d.dataId);A.values=$}else d=hn(n,u,t);l=I.getInnerMostAxes(l.length,i)}I.assertAxesAreInnerMostDims("max",l,i);let[f,g]=I.computeOutAndReduceShapes(d.shape,l),h=f;a&&(h=I.expandShapeToKeepDim(f,p));let x;if(m){let S=t.texData.get(d.dataId).values,C=gw(S,y.sizeFromShape(g),h,n.dtype);x=t.makeTensorInfo(h,n.dtype);let $=t.texData.get(x.dataId);$.values=C}else x=nN(d,g,h,t);return c&&t.disposeIntermediateTensorInfo(d),x}var sN={kernelName:di,backendName:"webgl",kernelFunc:Zg};var r4=Gp+`
  return max(a, b);
`,o4=`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+vr+`
  return result;
`,n4=Ue({opSnippet:r4,packedOpSnippet:o4,cpuKernelImpl:xw}),aN={kernelName:ss,backendName:"webgl",kernelFunc:n4};function s4(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e;bo(n,"maxPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:p}=o,l=1;y.assert(I.eitherStridesOrDilationsAreOne(a,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${l}'`);let u=I.computePool2DInfo(n.shape,s,a,l,i,p);if(u.filterWidth===1&&u.filterHeight===1&&y.arraysEqual(u.inShape,u.outShape))return dt({inputs:{x:n},backend:t});let c=new Qr(u,"max",!1);return t.runWebGLProgram(c,[n],n.dtype)}var iN={kernelName:fi,backendName:"webgl",kernelFunc:s4};function a4(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{filterSize:s,strides:a,pad:i,dataFormat:p,dimRoundingMode:l}=o,u=[1,1,1],c=I.computePool3DInfo(n.shape,s,a,u,i,l,p),m=new gn(c,"max",!1);return t.runWebGLProgram(m,[n],n.dtype)}var pN={kernelName:hi,backendName:"webgl",kernelFunc:a4};var Sd=class{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideHeight,o=e.strideWidth,n=e.dilationHeight,s=e.effectiveFilterHeight,a=e.effectiveFilterWidth,i=s-1-e.padInfo.top,p=a-1-e.padInfo.left,l=s*a-1;this.userCode=`
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
            float dyC = float(dyCCorner + wC) / ${o}.0;

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
    `}},Nd=class{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;let t=e.strideDepth,o=e.strideHeight,n=e.strideWidth,s=e.dilationDepth,a=e.dilationHeight,i=e.dilationWidth,p=e.effectiveFilterDepth,l=e.effectiveFilterHeight,u=e.effectiveFilterWidth,c=p-1-e.padInfo.front,m=l-1-e.padInfo.top,d=u-1-e.padInfo.left,f=p*l*u-1;this.userCode=`
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
            float dyR = float(dyRCorner + wR) / ${o}.0;

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
    `}};function i4(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,input:s}=e,a=s,{filterSize:i,strides:p,pad:l,dimRoundingMode:u}=o,c=[1,1,1],m=I.computePool3DInfo(a.shape,i,p,c,l,u),d=new gn(m,"max",!0),f=t.runWebGLProgram(d,[a],a.dtype),g=new Nd(m),h=t.runWebGLProgram(g,[n,f],a.dtype);return t.disposeIntermediateTensorInfo(f),h}var lN={kernelName:_u,backendName:"webgl",kernelFunc:i4};function p4(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,input:s,output:a}=e,i=s;bo([s,a],"maxPoolGrad");let{filterSize:p,strides:l,pad:u,dimRoundingMode:c}=o,m=I.computePool2DInfo(i.shape,p,l,1,u,c),d=!0,f=new Qr(m,"max",d),g=t.runWebGLProgram(f,[i],i.dtype),h=new Sd(m),x=t.runWebGLProgram(h,[n,g],i.dtype);return t.disposeIntermediateTensorInfo(g),x}var uN={kernelName:bu,backendName:"webgl",kernelFunc:p4};function cN(r,e,t,o){let n=new Qr(t,"max",!1),s=o.runWebGLProgram(n,[r],"float32");n=new Qr(t,"max",!0,!0,e);let a=o.runWebGLProgram(n,[r],"float32");return[s,a]}var mN={kernelName:gi,backendName:"webgl",kernelFunc:({inputs:r,attrs:e,backend:t})=>{let{x:o}=r,{filterSize:n,strides:s,pad:a,includeBatchInIndex:i}=e,p=t;y.assert(o.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${o.shape.length}.`);let l=[1,1];y.assert(I.eitherStridesOrDilationsAreOne(s,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${l}'`);let u=I.computePool2DInfo(o.shape,n,s,l,a),[c,m]=cN(o,i,u,p);return[c,m]}};function dN(r,e,t,o){let n=y.sizeFromShape(e),a=y.sizeFromShape(r.shape)/n,i=re({inputs:{x:r},attrs:{shape:[a,n]},backend:o}),p=Tr(i,"float32","mean",o),l=re({inputs:{x:p},attrs:{shape:t},backend:o});return o.disposeIntermediateTensorInfo(i),o.disposeIntermediateTensorInfo(p),l}var fN={kernelName:xi,backendName:"webgl",kernelFunc:({inputs:r,attrs:e,backend:t})=>{let{x:o}=r,{keepDims:n,axis:s}=e,a=t,i=o.shape.length,p=y.parseAxisParam(s,o.shape),l=p,u=I.getAxesPermutation(l,i),c=u!=null,m=a.shouldExecuteOnCPU([o]),d=[],f=o;if(c){if(m){let C=a.texData.get(f.dataId).values,$=new Array(i);for(let R=0;R<$.length;R++)$[R]=o.shape[u[R]];let A=pa(C,o.shape,o.dtype,u,$);f=a.makeTensorInfo($,o.dtype);let D=a.texData.get(f.dataId);D.values=A}else f=hn(o,u,a);d.push(f),l=I.getInnerMostAxes(l.length,i)}I.assertAxesAreInnerMostDims("sum",l,i);let[g,h]=I.computeOutAndReduceShapes(f.shape,l),x=g;n&&(x=I.expandShapeToKeepDim(g,p));let b=dN(f,h,x,a);for(let S of d)a.disposeIntermediateTensorInfo(S);return b}};function l4(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,keepDims:a}=o,i=n.shape.length,p=y.parseAxisParam(s,n.shape),l=p,u=I.getAxesPermutation(l,i),c=n;u!=null&&(c=nt({inputs:{x:n},backend:t,attrs:{perm:u}}),l=I.getInnerMostAxes(l.length,n.shape.length)),I.assertAxesAreInnerMostDims("min",l,i);let[m,d]=I.computeOutAndReduceShapes(c.shape,l),f=y.sizeFromShape(d),g=re({inputs:{x:c},backend:t,attrs:{shape:[-1,f]}}),h=Tr(g,g.dtype,"min",t),x;if(a){let b=I.expandShapeToKeepDim(m,p);x=re({inputs:{x:h},backend:t,attrs:{shape:b}})}else x=re({inputs:{x:h},backend:t,attrs:{shape:m}});return t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(h),u!=null&&t.disposeIntermediateTensorInfo(c),x}var hN={kernelName:yi,backendName:"webgl",kernelFunc:l4};var u4=Gp+`
  return min(a, b);
`,c4=`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+vr+`
  return result;
`,m4=Ue({opSnippet:u4,packedOpSnippet:c4,cpuKernelImpl:yw}),gN={kernelName:as,backendName:"webgl",kernelFunc:m4};var Id=class{constructor(e,t,o){this.variableNames=["x"],this.outputShape=t.map((u,c)=>u[0]+e[c]+u[1]);let n=e.length,s=Ce(n),a=t.map(u=>u[0]).join(","),i=t.map((u,c)=>u[0]+e[c]).join(","),p=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n),l=o==="reflect"?0:1;if(n===1){this.userCode=`
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
    `}};var kd=class{constructor(e,t,o){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((f,g)=>f[0]+e[g]+f[1]);let n=e.length,s=Ce(n),a=t.map(f=>f[0]).join(","),i=t.map((f,g)=>f[0]+e[g]).join(","),p=mt("rc",n),l=mt("source",n),u=`${p[n-1]} < ${this.outputShape[n-1]}`,c=n===1?"source":`vec2(${l.slice(-2).join()})`,m=o==="reflect"?0:1,d="";if(n===1){let f=`
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
    `}};var d4=({inputs:r,backend:e,attrs:t})=>{let{x:o}=r,{paddings:n,mode:s}=t,a=P().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new kd(o.shape,n,s):new Id(o.shape,n,s);return e.runWebGLProgram(a,[o],o.dtype)},xN={kernelName:bi,backendName:"webgl",kernelFunc:d4};var f4=`if (b == 0.0) return NAN;
  return mod(a, b);`,h4=`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+vr+`
  return result;
`,g4=Ue({opSnippet:f4,packedOpSnippet:h4}),yN={kernelName:is,backendName:"webgl",kernelFunc:g4};var Ed=class{constructor(e,t,o){this.variableNames=["probs"],this.customUniforms=[{name:"seed",type:"float"}],this.outputShape=[e,o],this.userCode=`
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
    `}};var x4=`
if (a == b) {
  return 1.0;
};
return a / b;`,y4=`
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
`,Jg=Ue({opSnippet:x4,packedOpSnippet:y4,checkOutOfBounds:!0}),bN={kernelName:Vn,backendName:"webgl",kernelFunc:Jg};var _N="return a - b;",ex=Ue({opSnippet:_N,packedOpSnippet:_N,supportsComplex:!0,cpuKernelImpl:Vw}),vN={kernelName:Ss,backendName:"webgl",kernelFunc:ex};function tx(r){let{inputs:e,backend:t,attrs:o}=r,{logits:n}=e,{dim:s}=o,a=y.parseAxisParam([s],n.shape),i=Zg({inputs:{x:n},backend:t,attrs:{reductionIndices:a,keepDims:!1}}),p=I.expandShapeToKeepDim(i.shape,a),l=re({inputs:{x:i},backend:t,attrs:{shape:p}}),u=ex({inputs:{a:n,b:l},backend:t}),c=Xg({inputs:{x:u},backend:t}),m=la({inputs:{x:c},backend:t,attrs:{axis:a,keepDims:!1}}),d=re({inputs:{x:m},backend:t,attrs:{shape:p}}),f=Jg({inputs:{a:c,b:d},backend:t});return t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(l),t.disposeIntermediateTensorInfo(u),t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d),f}var TN={kernelName:ji,backendName:"webgl",kernelFunc:tx};function b4(r){let{inputs:e,backend:t,attrs:o}=r,{logits:n}=e,{numSamples:s,seed:a,normalized:i}=o,p=i?n:tx({inputs:{logits:n},backend:t,attrs:{dim:n.shape.length-1}}),l=p.shape[0],u=p.shape[1],c=new Ed(l,u,s),m=[[a]],d=t.runWebGLProgram(c,[p],"int32",m);return i||t.disposeIntermediateTensorInfo(p),d}var wN={kernelName:_i,backendName:"webgl",kernelFunc:b4};var _4=Ct+`
  return -x;
`,v4=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`;function T4(r){let{inputs:e,backend:t}=r,{x:o}=e;if(t.shouldExecuteOnCPU([o])){let s=t.texData.get(o.dataId),[a,i]=_w(s.values,o.shape,o.dtype);return t.makeTensorInfo(i,o.dtype,a)}let n;return P().getBool("WEBGL_PACK_UNARY_OPERATIONS")?n=new lr(o.shape,v4):n=new Mt(o.shape,_4),t.runWebGLProgram(n,[o],o.dtype)}var CN={kernelName:vi,backendName:"webgl",kernelFunc:T4};var w4=Wt.nonMaxSuppressionV3Impl;function C4(r){I.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:e,backend:t,attrs:o}=r,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p}=o,l=t.readSync(n.dataId),u=t.readSync(s.dataId),{selectedIndices:c}=w4(l,u,a,i,p);return t.makeTensorInfo([c.length],"int32",new Int32Array(c))}var SN={kernelName:Ti,backendName:"webgl",kernelFunc:C4};var S4=Wt.nonMaxSuppressionV4Impl;function N4(r){I.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:e,backend:t,attrs:o}=r,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p,padToMaxOutputSize:l}=o,u=t.readSync(n.dataId),c=t.readSync(s.dataId),{selectedIndices:m,validOutputs:d}=S4(u,c,a,i,p,l);return[t.makeTensorInfo([m.length],"int32",new Int32Array(m)),t.makeTensorInfo([],"int32",new Int32Array([d]))]}var NN={kernelName:wi,backendName:"webgl",kernelFunc:N4};var I4=Wt.nonMaxSuppressionV5Impl;function k4(r){I.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:e,backend:t,attrs:o}=r,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p,softNmsSigma:l}=o,u=t.readSync(n.dataId),c=t.readSync(s.dataId),m=a,d=i,f=p,g=l,{selectedIndices:h,selectedScores:x}=I4(u,c,m,d,f,g);return[t.makeTensorInfo([h.length],"int32",new Int32Array(h)),t.makeTensorInfo([x.length],"float32",new Float32Array(x))]}var IN={kernelName:Ci,backendName:"webgl",kernelFunc:k4};var $d=class{constructor(e,t,o,n){this.variableNames=["indices"],this.outputShape=[e,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${n}), float(${o}),
                      float(index == coords.y)));
      }
    `}};var E4=r=>{let{inputs:e,backend:t,attrs:o}=r,{indices:n}=e,{dtype:s,depth:a,onValue:i,offValue:p}=o,l=y.sizeFromShape(n.shape),u=new $d(l,a,i,p),c=re({inputs:{x:n},backend:t,attrs:{shape:[l]}}),m=t.runWebGLProgram(u,[c],s);t.disposeIntermediateTensorInfo(c);let d=[...n.shape,a],f=re({inputs:{x:m},backend:t,attrs:{shape:d}});return t.disposeIntermediateTensorInfo(m),f},kN={kernelName:Ni,backendName:"webgl",kernelFunc:E4};function Gl(r){let{inputs:e,backend:t}=r,{x:o}=e;if(o.dtype==="complex64"){let n=Bo({inputs:{input:o},backend:t}),s=Gl({inputs:{x:n},backend:t}),a=ca({inputs:{input:o},backend:t}),i=Gl({inputs:{x:a},backend:t}),p=cr({inputs:{real:s,imag:i},backend:t});return t.disposeIntermediateTensorInfo(n),t.disposeIntermediateTensorInfo(s),t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(i),p}else return zo({attrs:{shape:o.shape,dtype:o.dtype,value:o.dtype==="string"?"":0},backend:t})}var EN={kernelName:lp,backendName:"webgl",kernelFunc:Gl};function $N(r){let{inputs:e,backend:t}=r,{x:o}=e;if(o.dtype==="string")throw new Error("onesLike is not supported under string dtype");if(o.dtype==="complex64"){let n=Bo({inputs:{input:o},backend:t}),s=$N({inputs:{x:n},backend:t}),a=ca({inputs:{input:o},backend:t}),i=Gl({inputs:{x:a},backend:t}),p=cr({inputs:{real:s,imag:i},backend:t});return t.disposeIntermediateTensorInfo(n),t.disposeIntermediateTensorInfo(s),t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(i),p}else return zo({attrs:{shape:o.shape,dtype:o.dtype,value:1},backend:t})}var AN={kernelName:Si,backendName:"webgl",kernelFunc:$N};function $4(r){let{inputs:e,backend:t,attrs:o}=r,{axis:n}=o;if(e.length===1)return fd({inputs:{input:e[0]},backend:t,attrs:{dim:n}});let s=e[0].shape,a=e[0].dtype;e.forEach(u=>{y.assertShapesMatch(s,u.shape,"All tensors passed to stack must have matching shapes"),y.assert(a===u.dtype,()=>"All tensors passed to stack must have matching dtypes")});let i=[],p=e.map(u=>{let c=fd({inputs:{input:u},backend:t,attrs:{dim:n}});return i.push(c),c}),l=jg({inputs:p,backend:t,attrs:{axis:n}});return i.forEach(u=>t.disposeIntermediateTensorInfo(u)),l}var FN={kernelName:Ii,backendName:"webgl",kernelFunc:$4};var Ad=class{constructor(e,t,o){this.variableNames=["x"],this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((l,u)=>l[0]+e[u]+l[1]);let n=e.length,s=Ce(n),a=t.map(l=>l[0]).join(","),i=t.map((l,u)=>l[0]+e[u]).join(","),p=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n);if(n===1){this.userCode=`
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
    `}};var Fd=class{constructor(e,t,o){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((g,h)=>g[0]+e[h]+g[1]);let n=e.length,s=Ce(n),a=t.map(g=>g[0]).join(","),i=t.map((g,h)=>g[0]+e[h]).join(","),p=mt("rc",n),l=mt("source",n),u=`${p[n-1]} < ${this.outputShape[n-1]}`,c=n===1?"source":`vec2(${l.slice(-2).join()})`,m=[`${s} rc = outputLoc;`,`${p[n-1]} += 1;
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
    `}};var rx=r=>{let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{paddings:s,constantValue:a}=o;if(y.sizeFromShape(n.shape)===0){let l=s.map((u,c)=>u[0]+n.shape[c]+u[1]);return zo({backend:t,attrs:{shape:l,value:a,dtype:n.dtype}})}let i=P().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Fd(n.shape,s,a):new Ad(n.shape,s,a),p=[[a]];return t.runWebGLProgram(i,[n],n.dtype,p)},DN={kernelName:ki,backendName:"webgl",kernelFunc:rx};var A4=`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,F4=`
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
  `+vr+`
  return result;
`,D4=Ue({opSnippet:A4,packedOpSnippet:F4}),RN={kernelName:us,backendName:"webgl",kernelFunc:D4};function R4(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,keepDims:a}=o,i=n.shape.length,p=[],l=y.parseAxisParam(s,n.shape),u=l,c=I.getAxesPermutation(u,i),m=n;c!=null&&(m=nt({inputs:{x:n},backend:t,attrs:{perm:c}}),u=I.getInnerMostAxes(u.length,i),p.push(m)),I.assertAxesAreInnerMostDims("prod",u,i);let d;if(t.shouldExecuteOnCPU([m])){let f=t.texData.get(m.dataId).values,{outVals:g,outShape:h,outDtype:x}=Tw(m.shape,m.dtype,f,u);d=t.makeTensorInfo(h,x,g)}else{let[f,g]=I.computeOutAndReduceShapes(m.shape,u),h=y.sizeFromShape(g),x=re({inputs:{x:m},backend:t,attrs:{shape:[-1,h]}}),b=Ms(n.dtype),S=Tr(x,b,"prod",t);d=re({inputs:{x:S},backend:t,attrs:{shape:f}}),p.push(x),p.push(S)}if(a){p.push(d);let f=I.expandShapeToKeepDim(d.shape,l);d=re({inputs:{x:d},backend:t,attrs:{shape:f}})}return p.forEach(f=>t.disposeIntermediateTensorInfo(f)),d}var ON={kernelName:$i,backendName:"webgl",kernelFunc:R4};function O4(r){let{inputs:e,backend:t,attrs:o}=r,{paramsNestedSplits:n,paramsDenseValues:s,indices:a}=e,{outputRaggedRank:i}=o,p=n.map(x=>t.readSync(x.dataId)),l=n.map(x=>x.shape),u=t.readSync(s.dataId),c=t.readSync(a.dataId),[m,d,f]=ww(p,l,u,s.shape,s.dtype,c,a.shape,i),g=m.map(x=>t.makeTensorInfo([x.length],"int32",x)),h=t.makeTensorInfo(f,s.dtype,d);return g.concat([h])}var PN={kernelName:Ai,backendName:"webgl",kernelFunc:O4};function P4(r){let{inputs:e,backend:t}=r,{starts:o,limits:n,deltas:s}=e,a=t.readSync(o.dataId),i=t.readSync(n.dataId),p=t.readSync(s.dataId),[l,u]=Cw(a,o.shape,o.dtype,i,n.shape,p,s.shape),c=t.makeTensorInfo([l.length],"int32",l),m=t.makeTensorInfo([u.length],o.dtype,u);return[c,m]}var MN={kernelName:Fi,backendName:"webgl",kernelFunc:P4};function M4(r){let{inputs:e,backend:t,attrs:o}=r,{shape:n,values:s,defaultValue:a,rowPartitionTensors:i}=e,{rowPartitionTypes:p}=o,l=t.readSync(n.dataId),u=t.readSync(s.dataId),c=t.readSync(a.dataId),m=i.map(h=>t.readSync(h.dataId)),d=i.map(h=>h.shape),[f,g]=Sw(l,n.shape,u,s.shape,s.dtype,c,a.shape,m,d,p);return t.makeTensorInfo(f,s.dtype,g)}var LN={kernelName:Di,backendName:"webgl",kernelFunc:M4};var ox=r=>{let{backend:e,attrs:t}=r,{start:o,stop:n,step:s,dtype:a}=t,i=Nw(o,n,s,a);return e.makeTensorInfo([i.length],a,i)},VN={kernelName:Ri,backendName:"webgl",kernelFunc:ox};var L4="return 1.0 / x;",V4=de({opSnippet:L4}),BN={kernelName:cs,backendName:"webgl",kernelFunc:V4};var B4=Ct+`
  return (x < 0.0) ? 0.0 : x;
`,z4=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,U4=de({opSnippet:B4,packedOpSnippet:z4}),zN={kernelName:ms,backendName:"webgl",kernelFunc:U4};var W4=Ct+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,G4=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,H4=de({opSnippet:W4,packedOpSnippet:G4}),UN={kernelName:ds,backendName:"webgl",kernelFunc:H4};var Dd=class{constructor(e,t,o,n,s){this.variableNames=["A"],this.outputShape=[];let[a,i,p,l]=e;this.outputShape=[a,t,o,l];let u=[n&&t>1?i-1:i,n&&o>1?p-1:p],c=[n&&t>1?t-1:t,n&&o>1?o-1:o],m;s?m="(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":m="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
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
    `}};var Rd=class{constructor(e,t,o,n,s){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[a,i,p,l]=e;this.outputShape=[a,t,o,l];let u=[n&&t>1?i-1:i,n&&o>1?p-1:p],c=[n&&t>1?t-1:t,n&&o>1?o-1:o],m;s?m="(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":m="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
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
        bool hasNextRow = coords.z < ${o-1};

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
    `}};function q4(r){let{inputs:e,backend:t,attrs:o}=r,{images:n}=e,{alignCorners:s,halfPixelCenters:a,size:i}=o,[p,l]=i,u=P().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new Rd(n.shape,p,l,s,a):new Dd(n.shape,p,l,s,a);return t.runWebGLProgram(u,[n],"float32")}var WN={kernelName:Li,backendName:"webgl",kernelFunc:q4};var Od=class{constructor(e,t,o){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,n,s]=t,[,a,i]=e,p=[o&&a>1?n-1:n,o&&i>1?s-1:s],l=[o&&a>1?a-1:a,o&&i>1?i-1:i],u=p[0]/l[0],c=p[1]/l[1],m=1/u,d=1/c,f=Math.ceil(m)*2+2,g=Math.ceil(d)*2+2;this.userCode=`
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
    `}};function K4(r){let{inputs:e,backend:t,attrs:o}=r,{images:n,dy:s}=e,{alignCorners:a}=o,i=new Od(s.shape,n.shape,a);return t.runWebGLProgram(i,[s],s.dtype)}var GN={kernelName:Tu,backendName:"webgl",kernelFunc:K4};var Pd=class{constructor(e,t,o,n,s){this.variableNames=["A"],this.outputShape=[];let[a,i,p,l]=e;this.outputShape=[a,t,o,l];let u=[n&&t>1?i-1:i,n&&o>1?p-1:p],c=[n&&t>1?t-1:t,n&&o>1?o-1:o],m=n?"0.5":"0.0",d;s?d="max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":d="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
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
    `}};var Md=class{constructor(e,t,o,n,s){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[a,i,p,l]=e;this.outputShape=[a,t,o,l];let u=[n&&t>1?i-1:i,n&&o>1?p-1:p],c=[n&&t>1?t-1:t,n&&o>1?o-1:o],m=n?"0.5":"0.0",d;s?d="max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":d="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
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
        bool hasNextRow = coords.z < ${o-1};

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
    `}};function j4(r){let{inputs:e,backend:t,attrs:o}=r,{images:n}=e,{alignCorners:s,halfPixelCenters:a,size:i}=o,[p,l]=i,u=P().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new Md(n.shape,p,l,s,a):new Pd(n.shape,p,l,s,a);return t.runWebGLProgram(u,[n],n.dtype)}var HN={kernelName:Mi,backendName:"webgl",kernelFunc:j4};var Ld=class{constructor(e,t,o){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;let[,n,s]=t,[,a,i]=e,p=[o&&a>1?n-1:n,o&&i>1?s-1:s],l=[o&&a>1?a-1:a,o&&i>1?i-1:i],u=p[0]/l[0],c=p[1]/l[1],m=1/u,d=1/c,f=Math.ceil(m)*2+2,g=Math.ceil(d)*2+2;this.userCode=`
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
                ${o} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${s}) - 1),
                ${o} ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};function X4(r){let{inputs:e,backend:t,attrs:o}=r,{images:n,dy:s}=e,{alignCorners:a}=o,i=new Ld(s.shape,n.shape,a);return t.runWebGLProgram(i,[s],s.dtype)}var qN={kernelName:vu,backendName:"webgl",kernelFunc:X4};var Vd=class{constructor(e,t){this.variableNames=["x"];let o=e.length;if(o>4)throw new Error(`WebGL backend: Reverse of rank-${o} tensor is not yet supported`);if(this.outputShape=e,o===1){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${e[0]} - coord - 1));
        }
      `;return}let n=i=>t.indexOf(i)!==-1&&e[i]!==1?`${e[i]} - coords[${i}] - 1`:`coords[${i}]`,s=e.map((i,p)=>n(p)).join(","),a=Ce(o);this.userCode=`
      void main() {
        ${a} coords = getOutputCoords();
        setOutput(getX(${s}));
      }
    `}};var Bd=class{constructor(e,t){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;let o=e.length;if(o>4)throw new Error(`WebGL backend: Reverse of rank-${o} tensor is not yet supported`);this.outputShape=e;let n=mt("rc",o),s=`${n[o-1]} + 1 < ${this.outputShape[o-1]}`,a=`${n[o-2]} + 1 < ${this.outputShape[o-2]}`,i=Ce(o);o===1?this.userCode=`
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
    `;function p(f){return m(f)}function l(f){return f[o-1]="("+f[o-1]+" + 1)",m(f)}function u(f){return f[o-2]="("+f[o-2]+" + 1)",m(f)}function c(f){return f[o-1]="("+f[o-1]+" + 1)",f[o-2]="("+f[o-2]+" + 1)",m(f)}function m(f){let g=e.map((b,S)=>d(S,f)),h=g.join(","),x=g.slice(-2).join(",");return`getChannel(getX(${h}), vec2(${x}))`}function d(f,g){return t.indexOf(f)!==-1&&e[f]!==1?`${e[f]} - ${g[f]} - 1`:`${g[f]}`}}};function Q4(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{dims:s}=o,a=n.shape.length,i=y.parseAxisParam(s,n.shape);if(a===0)return dt({inputs:{x:n},backend:t});let p=P().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Bd(n.shape,i):new Vd(n.shape,i);return t.runWebGLProgram(p,[n],n.dtype)}var KN={kernelName:Vi,backendName:"webgl",kernelFunc:Q4};var zd=class{constructor(e,t){this.variableNames=["Image"],this.outputShape=[],this.customUniforms=[{name:"params",type:"vec4"}];let o=e[1],n=e[2];this.outputShape=e;let s="";typeof t=="number"?s=`float outputValue = ${t.toFixed(2)};`:s=`
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
          if(coordX >= 0 && coordX < ${n} && coordY >= 0 && coordY < ${o}) {
            outputValue = getImage(coords[0], coordY, coordX, coords[3]);
          }
          setOutput(outputValue);
        }
    `}};var jN={kernelName:up,backendName:"webgl",kernelFunc:({inputs:r,attrs:e,backend:t})=>{let{image:o}=r,{radians:n,fillValue:s,center:a}=e,i=t,p=new zd(o.shape,s),[l,u]=I.getImageCenter(a,o.shape[1],o.shape[2]),c=[[l,u,Math.sin(n),Math.cos(n)]];return i.runWebGLProgram(p,[o],o.dtype,c)}};var Y4=`
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
`,Z4=de({opSnippet:Y4}),XN={kernelName:fs,backendName:"webgl",kernelFunc:Z4};var J4="return inversesqrt(x);",eU=de({opSnippet:J4,cpuKernelImpl:Iw}),QN={kernelName:hs,backendName:"webgl",kernelFunc:eU};var xn=class{constructor(e,t,o,n,s,a,i=!0,p=!1){this.variableNames=["updates","indices","defaultValue"],this.outputShape=a;let l=Ce(s.length),u=Ce(a.length),c="";o===1?c="i":o===2&&(c="i, j");let m=`getIndices(${c})`,d="";n===1?d="i":n===2&&(d="i, coords[1]");let f=`getUpdates(${d})`,g="";p&&(g="coords[0], coords[1]");let h=`getDefaultValue(${g})`,x=t>1?"strides[j]":"strides";this.userCode=`
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
      `}};var Ud=class{constructor(e,t,o,n,s,a,i=!0,p=!1){this.variableNames=["updates","indices","defaultValue"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=a;let l=Ce(s.length),u=Ce(a.length),c="";o===1?c="i":o===2&&(c="i, j");let m=`getIndices(${c})`,d="";n===1?d="i":n===2&&(d="i, coords[1]");let f=`getUpdates(${d})`,g="";p&&(g="coords[0], coords[1]");let h=`getDefaultValue(${g})`,x=t>1?"strides[j]":"strides",b=t>1?"strides[j + 1]":"strides";this.userCode=`
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
      `}};function tU(r){let{inputs:e,backend:t,attrs:o}=r,{indices:n,updates:s}=e,{shape:a}=o,{sliceRank:i,numUpdates:p,sliceSize:l,strides:u,outputSize:c}=I.calculateShapes(s,n,a),m=[c/l,l];if(c===0)return t.makeTensorInfo(a,n.dtype);let d=re({inputs:{x:n},backend:t,attrs:{shape:[p,i]}}),f=re({inputs:{x:s},backend:t,attrs:{shape:[p,l]}}),g=t.makeTensorInfo([],"float32",new Float32Array([0])),h;P().getBool("WEBGL_PACK")?h=new Ud(p,i,d.shape.length,f.shape.length,u,m):h=new xn(p,i,d.shape.length,f.shape.length,u,m);let x=t.runWebGLProgram(h,[f,d,g],f.dtype),b=re({inputs:{x},backend:t,attrs:{shape:a}});return t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(x),t.disposeIntermediateTensorInfo(g),b}var YN={kernelName:Bi,backendName:"webgl",kernelFunc:tU};var Wd=class{constructor(e,t,o,n){this.variableNames=["sortedSequence","values"],this.customUniforms=[{name:"numInputs",type:"int"}],this.outputShape=[e,o];let s="while (left < right) {",a=`for (int i = 0; i < ${Math.ceil(Math.log2(t+1))}; ++i) { if (left >= right) break;`,i=P().getNumber("WEBGL_VERSION")===2?s:a,p=n==="left"?"<":"<=";this.userCode=`
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
     `}};function rU(r){let{inputs:e,backend:t,attrs:o}=r,{sortedSequence:n,values:s}=e,{side:a}=o,i=new Wd(n.shape[0],n.shape[1],s.shape[1],a),p=[[n.shape[1]]];return t.runWebGLProgram(i,[n,s],"int32",p)}var ZN={kernelName:Ui,backendName:"webgl",kernelFunc:rU};var Gd=class{constructor(e,t,o){this.variableNames=["c","a","b"],this.outputShape=t;let n,s;if(o>4)throw Error(`Where for rank ${o} is not yet supported`);if(o===1)s="resRC",n="resRC";else{let i=["resRC.x","resRC.y","resRC.z","resRC.w"],p=[],l=[];for(let u=0;u<t.length;u++)l.push(`${i[u]}`),u<e&&p.push(`${i[u]}`);n=p.join(),s=l.join()}let a=Ce(o);this.userCode=`
      void main() {
        ${a} resRC = getOutputCoords();
        float cVal = getC(${n});
        if (cVal >= 1.0) {
          setOutput(getA(${s}));
        } else {
          setOutput(getB(${s}));
        }
      }
    `}};function oU(r){let{inputs:e,backend:t}=r,{condition:o,t:n,e:s}=e,a=new Gd(o.shape.length,n.shape,n.shape.length);return t.runWebGLProgram(a,[o,n,s],bt(n.dtype,s.dtype))}var JN={kernelName:Wi,backendName:"webgl",kernelFunc:oU};var nU=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${I.SELU_SCALEALPHA};
  float scale = ${I.SELU_SCALE};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,sU=de({opSnippet:nU}),e2={kernelName:gs,backendName:"webgl",kernelFunc:sU};var aU=zr+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,iU=`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,pU=de({opSnippet:aU,packedOpSnippet:iU,cpuKernelImpl:Ew}),t2={kernelName:_s,backendName:"webgl",kernelFunc:pU};var lU=`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`,uU=de({opSnippet:lU}),r2={kernelName:bs,backendName:"webgl",kernelFunc:uU};var cU=zr+`
  return sin(x);
`,mU=`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${vr}
  return result;
`,dU=de({opSnippet:cU,packedOpSnippet:mU}),o2={kernelName:xs,backendName:"webgl",kernelFunc:dU};var fU=`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`,hU=de({opSnippet:fU}),n2={kernelName:ys,backendName:"webgl",kernelFunc:hU};var gU=`
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
`,xU=de({opSnippet:gU}),s2={kernelName:vs,backendName:"webgl",kernelFunc:xU};var yU=r=>{let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{blockShape:s,paddings:a}=o;y.assert(n.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");let i=s.reduce((x,b)=>x*b),p=[[0,0]];p.push(...a);for(let x=1+s.length;x<n.shape.length;++x)p.push([0,0]);let l=[],u=rx({inputs:{x:n},backend:t,attrs:{paddings:p,constantValue:0}}),c=I.getReshaped(u.shape,s,i,!1),m=I.getPermuted(c.length,s.length,!1),d=I.getReshapedPermuted(u.shape,s,i,!1),f=re({inputs:{x:u},backend:t,attrs:{shape:c}}),g=nt({inputs:{x:f},backend:t,attrs:{perm:m}}),h=re({inputs:{x:g},backend:t,attrs:{shape:d}});return l.push(u),l.push(f),l.push(g),l.forEach(x=>t.disposeIntermediateTensorInfo(x)),h},a2={kernelName:qi,backendName:"webgl",kernelFunc:yU};function bU(r){let{inputs:e,backend:t}=r,{indices:o,values:n,denseShape:s,defaultValue:a}=e;if(s.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
         ${s.shape}`);if(o.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
         ${o.shape}`);if(n.shape.length!==1)throw new Error(`Values must be a vector, saw:
         ${n.shape}`);if(a.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${a.shape}`);let i=t.readSync(o.dataId),p=t.readSync(n.dataId),l=t.readSync(s.dataId),u=t.readSync(a.dataId)[0],[c,m,d,f,g]=Aw(i,o.shape,o.dtype,p,n.dtype,l,u);return[t.makeTensorInfo(m,o.dtype,c),t.makeTensorInfo([m[0]],n.dtype,d),t.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(h=>Number(h)))),t.makeTensorInfo([g.length],o.dtype,new Int32Array(g))]}var i2={kernelName:Xi,backendName:"webgl",kernelFunc:bU};function _U(r){let{inputs:e,backend:t}=r,{inputIndices:o,inputShape:n,newShape:s}=e;if(o.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape ${o.shape}`);if(n.shape.length!==1)throw new Error(`Input shape should be a vector but received shape ${n.shape}`);if(s.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${s.shape}`);let a=Array.from(t.readSync(n.dataId)),i=t.readSync(o.dataId),p=Array.from(t.readSync(s.dataId)),[l,u,c]=Fw(i,o.shape,o.dtype,a,p);return[t.makeTensorInfo(u,o.dtype,l),t.makeTensorInfo([c.length],s.dtype,new Int32Array(c))]}var p2={kernelName:Qi,backendName:"webgl",kernelFunc:_U};function vU(r){let{inputs:e,backend:t}=r,{data:o,indices:n,segmentIds:s}=e;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
              ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
              ${s.shape}`);let a=t.readSync(o.dataId),i=t.readSync(n.dataId),p=t.readSync(s.dataId),[l,u]=Sm(a,o.shape,o.dtype,i,p,!0);return t.makeTensorInfo(u,o.dtype,l)}var l2={kernelName:Yi,backendName:"webgl",kernelFunc:vU};function TU(r){let{inputs:e,backend:t}=r,{data:o,indices:n,segmentIds:s}=e;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
             ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
             ${s.shape}`);let a=t.readSync(o.dataId),i=t.readSync(n.dataId),p=t.readSync(s.dataId),[l,u]=Sm(a,o.shape,o.dtype,i,p);return t.makeTensorInfo(u,o.dtype,l)}var u2={kernelName:Zi,backendName:"webgl",kernelFunc:TU};function wU(r){let{inputs:e,backend:t,attrs:o}=r,{sparseIndices:n,sparseValues:s,defaultValue:a}=e,{outputShape:i}=o,{sliceRank:p,numUpdates:l,sliceSize:u,strides:c,outputSize:m}=I.calculateShapes(s,n,i),d=!1;if(s.dtype==="string"){let x=t.bufferSync(n),b=t.bufferSync(s),S=y.decodeString(t.readSync(a.dataId)[0]),C=kw(x,b,i,m,u,l,p,c,S,d);return t.makeTensorInfo(i,C.dtype,C.values)}let f=new xn(l,p,n.shape.length,s.shape.length,c,[m,1],d),g=t.runWebGLProgram(f,[s,n,a],s.dtype),h=re({inputs:{x:g},backend:t,attrs:{shape:i}});return t.disposeIntermediateTensorInfo(g),h}var c2={kernelName:Ji,backendName:"webgl",kernelFunc:wU};function CU(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{numOrSizeSplits:s,axis:a}=o,i=y.parseAxisParam(a,n.shape)[0],p=I.prepareSplitSize(n,s,i),l=n.shape.length,u=new Array(l).fill(0),c=n.shape.slice();return p.map(m=>{let d=[...c];d[i]=m;let f=Yr({inputs:{x:n},backend:t,attrs:{begin:u,size:d}});return u[i]+=m,f})}var m2={kernelName:Ki,backendName:"webgl",kernelFunc:CU};var d2="return sqrt(x);",SU=de({opSnippet:d2,packedOpSnippet:d2,cpuKernelImpl:Dw}),f2={kernelName:Ts,backendName:"webgl",kernelFunc:SU};var NU="return x * x;",IU=de({opSnippet:NU}),h2={kernelName:wu,backendName:"webgl",kernelFunc:IU};var g2="return (a - b) * (a - b);",kU=Ue({opSnippet:g2,packedOpSnippet:g2}),x2={kernelName:ws,backendName:"webgl",kernelFunc:kU};function EU(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e;if(n.dtype!=="string")throw new Error("Input must be of datatype string");let s=t.readSync(n.dataId),a=I.fromUint8ToStringArray(s),i=Rw(a,"string",o);return t.makeTensorInfo(n.shape,"string",i)}var y2={kernelName:Cs,backendName:"webgl",kernelFunc:EU};function $U({inputs:r,attrs:e,backend:t}){let{x:o}=r,n=Ct+`
    return x > 0.0 ? 1.0 : float(${e.alpha});
  `,s=new Mt(o.shape,n);return t.runWebGLProgram(s,[o],o.dtype)}var b2={kernelName:ks,backendName:"webgl",kernelFunc:$U};var Hd=class{constructor(e,t,o){this.variableNames=["x"],this.outputShape=o;let n=o.length,s=Ce(o.length),a=Ce(o.length),i="";if(n===1)i="coords * strides + begin";else{let p=0;i=o.map((l,u)=>(p++,o.length===1?`coords * strides[${u}] + begin[${u}]`:`coords[${p-1}] * strides[${u}] + begin[${u}]`)).join(",")}this.userCode=`
      ${s} begin = ${s}(${e});
      ${s} strides = ${s}(${t});

      void main() {
        ${a} coords = getOutputCoords();
        setOutput(getX(${i}));
      }
    `}};function AU(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{begin:s,end:a,strides:i,beginMask:p,endMask:l,ellipsisMask:u,newAxisMask:c,shrinkAxisMask:m}=o,{finalShapeSparse:d,finalShape:f,isIdentity:g,sliceDim0:h,isSimpleSlice:x,begin:b,end:S,strides:C}=$t.sliceInfo(n.shape,s,a,i,p,l,u,c,m),$;if(g)$=re({inputs:{x:n},backend:t,attrs:{shape:f}});else if(h||x){y.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let D=$t.computeOutShape(b,S,C),R=Yr({inputs:{x:n},backend:t,attrs:{begin:b,size:D}});$=re({inputs:{x:R},backend:t,attrs:{shape:f}}),t.disposeIntermediateTensorInfo(R)}else if(t.shouldExecuteOnCPU([n])){let R=t.readSync(n.dataId),M=me(n.shape,n.dtype,R),L=Ow(d,M,C,b);$=t.makeTensorInfo(f,n.dtype,L.values)}else{let R=new Hd(b,C,d);$=t.runWebGLProgram(R,[n],n.dtype)}let A=re({inputs:{x:$},backend:t,attrs:{shape:f}});return t.disposeIntermediateTensorInfo($),A}var _2={kernelName:ep,backendName:"webgl",kernelFunc:AU};function FU(r){let{inputs:e,backend:t,attrs:o}=r,{separator:n,nGramWidths:s,leftPad:a,rightPad:i,padWidth:p,preserveShortSequences:l}=o,{data:u,dataSplits:c}=e,m=t.readSync(u.dataId),d=t.readSync(c.dataId),[f,g]=Pw(m,d,n,s,a,i,p,l);return[t.makeTensorInfo([f.length],"string",f),t.makeTensorInfo(c.shape,"int32",g)]}var v2={kernelName:tp,backendName:"webgl",kernelFunc:FU};function DU(r){let{inputs:e,backend:t,attrs:o}=r,{skipEmpty:n}=o,{input:s,delimiter:a}=e;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(s.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${s.shape}`);if(a.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${a.shape}`);let i=t.readSync(s.dataId),p=t.readSync(a.dataId)[0],[l,u,c]=Mw(i,p,n),m=u.length;return[t.makeTensorInfo([m,2],"int32",l),t.makeTensorInfo([m],"string",u),t.makeTensorInfo([2],"int32",new Int32Array(c))]}var T2={kernelName:rp,backendName:"webgl",kernelFunc:DU};function RU(r){let{inputs:e,backend:t,attrs:o}=r,{numBuckets:n}=o,{input:s}=e;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(n<=0)throw new Error("Number of buckets must be at least 1");let a=t.readSync(s.dataId),i=Lw(a,n);return t.makeTensorInfo(s.shape,"int32",i)}var w2={kernelName:op,backendName:"webgl",kernelFunc:RU};var OU="return tan(x);",PU=de({opSnippet:OU}),C2={kernelName:Ns,backendName:"webgl",kernelFunc:PU};var MU=`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`,LU=de({opSnippet:MU}),S2={kernelName:Is,backendName:"webgl",kernelFunc:LU};function VU(r){let{inputs:e,backend:t,attrs:o}=r,{tensor:n,indices:s,updates:a}=e,{}=o,{sliceRank:i,numUpdates:p,sliceSize:l,strides:u,outputSize:c}=I.calculateShapes(a,s,n.shape),m=[c/l,l];if(c===0)return t.makeTensorInfo(n.shape,s.dtype);let d=re({inputs:{x:s},backend:t,attrs:{shape:[p,i]}}),f=re({inputs:{x:a},backend:t,attrs:{shape:[p,l]}}),g=re({inputs:{x:n},backend:t,attrs:{shape:m}}),h=new xn(p,i,d.shape.length,f.shape.length,u,m,!1,!0),x=t.runWebGLProgram(h,[f,d,g],g.dtype),b=re({inputs:{x},backend:t,attrs:{shape:n.shape}});return t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(x),b}var N2={kernelName:zi,backendName:"webgl",kernelFunc:VU};var qd=class{constructor(e,t){this.variableNames=["A"];let o=new Array(e.length);for(let a=0;a<o.length;a++)o[a]=e[a]*t[a];this.outputShape=o,this.rank=o.length;let n=Ce(this.rank),s=BU(e);this.userCode=`
      void main() {
        ${n} resRC = getOutputCoords();
        setOutput(getA(${s}));
      }
    `}};function BU(r){let e=r.length;if(e>5)throw Error(`Tile for rank ${e} is not yet supported`);if(e===1)return`imod(resRC, ${r[0]})`;let t=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],o=[];for(let n=0;n<r.length;n++)o.push(`imod(${t[n]}, ${r[n]})`);return o.join()}function nx(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{reps:s}=o;if(n.dtype==="string"||n.shape.length>5){let p=t.readSync(n.dataId),l=n.dtype==="string"?p.map(m=>y.decodeString(m)):p,u=me(n.shape,n.dtype,l),c=Bw(u,s);return t.makeTensorInfo(c.shape,c.dtype,c.values)}let a=new qd(n.shape,s);return t.runWebGLProgram(a,[n],n.dtype)}var I2={kernelName:Xo,backendName:"webgl",kernelFunc:nx};var Kd=class{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"negativeInf",type:"float"},{name:"dir",type:"int"},{name:"inc",type:"int"}],this.outputShape=e,this.userCode=`
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
     `}},jd=class{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"k",type:"int"}],this.outputShape=e,this.userCode=`
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
     `}};function da(r,e){e!==null&&r.disposeIntermediateTensorInfo(e)}function k2(r){let e=1;for(;e<r;)e*=2;return e}function zU(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{k:s,sorted:a}=o,i=P().getNumber("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD"),p=P().getNumber("TOPK_K_CPU_HANDOFF_THRESHOLD"),l=n.shape,u=l[l.length-1];if(t.shouldExecuteOnCPU([n])||u<i||s>p){let L=t.readSync(n.dataId),[B,W]=zw(L,l,n.dtype,s,a);return[t.makeTensorInfo(B.shape,B.dtype,B.values),t.makeTensorInfo(W.shape,W.dtype,W.values)]}if(s===0)return l[l.length-1]=0,[t.makeTensorInfo(l,n.dtype,[]),t.makeTensorInfo(l,"int32",[])];if(u===1)return[n,zo({attrs:{shape:l,dtype:"int32",value:0},backend:t})];let c=t.texData.get(n.dataId),m=c!==null&&c.isPacked,d=m?t.unpackTensor(n):n,g=y.sizeFromShape(l)/u,h=re({inputs:{x:d},attrs:{shape:[g,u]},backend:t});m&&da(t,d);let x=k2(s),b=k2(u),S=null,C=()=>S===null?[h,h]:[h,S],$=(L,B,W)=>{let G=C(),q=new Kd(W),K=[[u],[S===null?1:0],[Number.NEGATIVE_INFINITY],[L],[B]],Z=S;S=t.runWebGLProgram(q,G,"int32",K),da(t,Z)};for(let L=1;L<x;L*=2){let B=L*2;for(let W=L;W>=1;W/=2)$(B,W,[g,b])}for(let L=b;L>x;L/=2){let B=C(),W=new jd([g,L/2]),q=[[u],[S===null?1:0],[x]],H=S;S=t.runWebGLProgram(W,B,"int32",q),da(t,H);let K=x/2,Z=K*2;for(let X=K;X>=1;X/=2)$(Z,X,S.shape)}let A=S;S=Yr({inputs:{x:S},backend:t,attrs:{begin:0,size:[g,s]}}),da(t,A);let D=Yg({inputs:{x:h,indices:S},backend:t,attrs:{axis:1,batchDims:1}});da(t,h);let R=l.slice(0,-1);R.push(s),A=S,S=re({inputs:{x:S},attrs:{shape:R},backend:t}),da(t,A);let M=D;return D=re({inputs:{x:D},attrs:{shape:R},backend:t}),da(t,M),[D,S]}var E2={kernelName:np,backendName:"webgl",kernelFunc:zU};var Xd=class{constructor(e,t,o,n,s,a){this.variableNames=["Image","Transforms"],this.outputShape=a;let i=o==="nearest"?1:2,p;switch(n){case"constant":p=1;break;case"reflect":p=2;break;case"wrap":p=3;break;case"nearest":p=4;break;default:p=1;break}this.userCode=`
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
        `}};function UU(r){let{inputs:e,backend:t,attrs:o}=r,{image:n,transforms:s}=e,{interpolation:a,fillMode:i,fillValue:p,outputShape:l}=o,[u,c,m,d]=n.shape,[f,g]=l??[c,m],h=[u,f,g,d],x=new Xd(c,m,a,i,p,h);return t.runWebGLProgram(x,[n,s],"float32")}var $2={kernelName:sp,backendName:"webgl",kernelFunc:UU};function WU(r){let{inputs:e,attrs:t,backend:o}=r,{axis:n}=t,{x:s}=e;bo(s,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");let a=o.readSync(s.dataId),{outputValues:i,outputShape:p,indices:l}=Uw(a,n,s.shape,s.dtype);return[o.makeTensorInfo(p,s.dtype,i),o.makeTensorInfo([l.length],"int32",l)]}var A2={kernelName:ap,backendName:"webgl",kernelFunc:WU};function GU(r){let{inputs:e,backend:t,attrs:o}=r,{value:n}=e,{axis:s}=o;s<0&&(s+=n.shape.length);let a=n,i=a.shape.length,p=n.shape[s],l=new Array(i-1),u=0;for(let g=0;g<i;g++)g!==s&&(l[u++]=a.shape[g]);let c=[],m=new Array(i).fill(0),d=a.shape.slice();d[s]=1;let f=new Array(p);for(let g=0;g<f.length;g++){m[s]=g;let h=Yr({inputs:{x:a},backend:t,attrs:{begin:m,size:d}}),x=re({inputs:{x:h},backend:t,attrs:{shape:l}});f[g]=x,c.push(h)}return c.forEach(g=>t.disposeIntermediateTensorInfo(g)),f}var F2={kernelName:ip,backendName:"webgl",kernelFunc:GU};var Qd=class{constructor(e,t){this.variableNames=["x","segmentIds"];let o=e.windowSize,n=e.batchSize,s=e.inSize,a=e.numSegments,i=a*Math.ceil(s/o);this.outputShape=[n,i];let p="0.0",l="sumValue",u=Math.floor(o/4)*4,c=o%4,m=`
        sumValue += dot(values, segFilter);
    `,d="";s%o>0&&(d=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return initializationValue;
        }
      `);let f="";s%o>0&&(f=`
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
          ${a})) * float(${o}));
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
    `}};function HU(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,segmentIds:s}=e,{numSegments:a}=o,i=n.shape.length,p=[],l=0,u=I.getAxesPermutation([l],i),c=n;u!=null&&(c=nt({inputs:{x:n},backend:t,attrs:{perm:u}}),p.push(c),l=I.getInnerMostAxes(1,i)[0]);let m=I.segment_util.computeOutShape(c.shape,l,a),d=y.sizeFromShape([c.shape[l]]),f=re({inputs:{x:c},backend:t,attrs:{shape:[-1,d]}});p.push(f);let g=Ms(n.dtype),h=(C,$,A,D,R)=>{let M=C.shape[0],L=C.shape[1],B=I.segment_util.segOpComputeOptimalWindowSize(L,R),W={windowSize:B,inSize:L,batchSize:M,numSegments:R},G=new Qd(W,$),q=t.compileAndRun(G,[C,A],D);if(p.push(q),q.shape[1]===R)return q;let H=ox({backend:t,attrs:{start:0,stop:R,step:1,dtype:"float32"}}),K=nx({inputs:{x:H},backend:t,attrs:{reps:[L/B]}});return p.push(H),p.push(K),h(q,$,K,D,R)},x=h(f,"unsortedSegmentSum",s,g,a),b=re({inputs:{x},backend:t,attrs:{shape:m}}),S=b;if(u!=null){p.push(b);let C=I.getUndoAxesPermutation(u);S=nt({inputs:{x:S},backend:t,attrs:{perm:C}})}return p.forEach(C=>t.disposeIntermediateTensorInfo(C)),S}var D2={kernelName:pp,backendName:"webgl",kernelFunc:HU};var qU=[hC,xC,yC,bC,vC,TC,wC,CC,IC,kC,EC,$C,AC,FC,DC,RC,OC,PC,MC,LC,VC,zC,UC,WC,GC,jC,QC,YC,sC,JC,tS,rS,oS,nS,sS,aS,iS,pS,lS,uS,dS,fS,hS,gS,xS,yS,bS,_S,vS,TS,wS,CS,SS,NS,IS,kS,$S,AS,FS,DS,OS,PS,MS,LS,VS,BS,zS,US,WS,nC,GS,eS,HS,qS,KS,aC,jS,XS,QS,YS,ZS,JS,eN,tN,rN,oN,sN,aN,iN,pN,lN,uN,mN,fN,hN,gN,xN,yN,wN,lC,CN,SN,NN,IN,HC,kN,AN,FN,DN,RN,iC,ON,PN,MN,LN,VN,qC,bN,BN,zN,UN,cC,WN,GN,HN,qN,KN,jN,XN,QN,YN,ZN,JN,e2,t2,r2,o2,n2,BC,TN,s2,a2,i2,p2,l2,u2,c2,m2,f2,h2,x2,y2,b2,_2,v2,T2,w2,vN,dC,C2,S2,N2,I2,E2,$2,fC,A2,F2,D2,EN];for(let r of qU)Su(r);var KU=Wt.whereImpl,Hl=class r extends No{nextDataId(){return r.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new wn(this,Rr())}write(e,t,o){this.firstUse&&(this.firstUse=!1,P().get("IS_NODE")&&I.warn(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));let n={id:this.nextDataId()};return this.data.set(n,{values:e,dtype:o,refCount:1}),n}makeTensorInfo(e,t,o){let n;if(t==="string"&&o!=null&&o.length>0&&y.isString(o[0])){let s=o.map(a=>y.encodeString(a));n=this.write(s,e,t)}else n=this.write(o,e,t);return{dataId:n,shape:e,dtype:t}}refCount(e){return this.data.has(e)?this.data.get(e).refCount:0}incRef(e){let t=this.data.get(e);t.refCount++}decRef(e){if(this.data.has(e)){let t=this.data.get(e);t.refCount--}}move(e,t,o,n,s){this.data.set(e,{values:t,dtype:n,refCount:s})}numDataIds(){return this.data.numDataIds()}async read(e){return this.readSync(e)}readSync(e){let{dtype:t,complexTensorInfos:o}=this.data.get(e);if(t==="complex64"){let n=this.readSync(o.real.dataId),s=this.readSync(o.imag.dataId);return I.mergeRealAndImagArrays(n,s)}return y.convertBackendValuesAndArrayBuffer(this.data.get(e).values,t)}bufferSync(e){let t=this.readSync(e.dataId);if(e.dtype==="string")try{let o=t.map(n=>y.decodeString(n));return me(e.shape,e.dtype,o)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return me(e.shape,e.dtype,t)}makeOutput(e,t,o){return Rr().makeTensorFromTensorInfo(this.makeTensorInfo(t,o,e),this)}disposeData(e,t=!1){if(this.data.has(e)){if(this.data.get(e).refCount--,!t&&this.data.get(e).refCount>0)return!1;let{complexTensorInfos:o}=this.data.get(e);o!=null&&(this.disposeData(o.real.dataId,!0),this.disposeData(o.imag.dataId,!0)),this.data.delete(e)}return!0}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}async time(e){let t=y.now();return e(),{kernelMs:y.now()-t}}memory(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}}where(e){Q([e],"where");let t=this.readSync(e.dataId);return KU(e.shape,t)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}};Hl.nextDataId=0;Pu("cpu",()=>new Hl,1);var sx=be(Bn,r=>r>=0?r:Math.exp(r)-1),R2={kernelName:Bn,backendName:"cpu",kernelFunc:sx};function ax(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{alpha:s}=o;Q([n],"leakyRelu");let a=y.sizeFromShape(n.shape),i=t.data.get(n.dataId).values,p=y.getTypedArrayFromDType("float32",a);for(let l=0;l<i.length;l++)p[l]=i[l]<0?s*i[l]:i[l];return t.makeTensorInfo(n.shape,"float32",p)}var O2={kernelName:ui,backendName:"cpu",kernelFunc:ax};var jU=$e((r,e)=>r<0?e*r:r);function ix(r){let{inputs:e,backend:t}=r,{x:o,alpha:n}=e;Q([o,n],"prelu");let s=t.data.get(o.dataId).values,a=t.data.get(n.dataId).values,[i,p]=jU(o.shape,n.shape,s,a,"float32");return t.makeTensorInfo(p,"float32",i)}var P2={kernelName:Ei,backendName:"cpu",kernelFunc:ix};var px=be(ms,r=>Math.max(0,r)),M2={kernelName:ms,backendName:"cpu",kernelFunc:px};var lx=be(ds,r=>Math.min(Math.max(0,r),6)),L2={kernelName:ds,backendName:"cpu",kernelFunc:lx};function fa(r,e,t,o,n){if(t==="linear")return Ht({inputs:{x:e},backend:r});if(t==="relu")return px({inputs:{x:e},backend:r});if(t==="elu")return sx({inputs:{x:e},backend:r});if(t==="relu6")return lx({inputs:{x:e},backend:r});if(t==="prelu")return ix({inputs:{x:e,alpha:o},backend:r});if(t==="leakyrelu")return ax({inputs:{x:e},backend:r,attrs:{alpha:n}});if(t==="sigmoid")return $g({inputs:{x:e},backend:r});throw new Error(`Activation ${t} has not been implemented for the CPU backend.`)}function Ae(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{shape:s}=o,a=y.sizeFromShape(n.shape),i=y.inferFromImplicitShape(s,a),p=y.sizeFromShape(i);y.assert(a===p,()=>`The new shape (${i}) has ${p} elements and the old shape (${n.shape}) has ${a} elements. The new shape and old shape must have the same number of elements.`),t.incRef(n.dataId);let l=t.data.get(n.dataId);if(l.complexTensorInfos!=null){let u=l.complexTensorInfos.real,c=l.complexTensorInfos.imag;u.shape=i,c.shape=i}return{dataId:n.dataId,shape:i,dtype:n.dtype}}var V2={kernelName:Pi,backendName:"cpu",kernelFunc:Ae};function ux(r){let{inputs:e,backend:t,attrs:o}=r,{a:n,b:s}=e,{transposeA:a,transposeB:i}=o;Q([n,s],"matMul");let p=n.shape.length,l=s.shape.length,u=a?n.shape[p-2]:n.shape[p-1],c=i?s.shape[l-1]:s.shape[l-2],m=a?n.shape[p-1]:n.shape[p-2],d=i?s.shape[l-2]:s.shape[l-1],f=n.shape.slice(0,-2),g=s.shape.slice(0,-2),h=y.sizeFromShape(f),x=y.sizeFromShape(g),S=mo.assertAndGetBroadcastShape(n.shape.slice(0,-2),s.shape.slice(0,-2)).concat([m,d]);y.assert(u===c,()=>`Error in matMul: inner shapes (${u}) and (${c}) of Tensors with shapes ${n.shape} and ${s.shape} and transposeA=${a} and transposeB=${i} must match.`);let C=a?[h,u,m]:[h,m,u],$=i?[x,d,c]:[x,c,d],A=Ae({inputs:{x:n},backend:t,attrs:{shape:C}}),D=Ae({inputs:{x:s},backend:t,attrs:{shape:$}}),R=a?A.shape[1]:A.shape[2],M=a?A.shape[2]:A.shape[1],L=i?D.shape[1]:D.shape[2],B=Math.max(h,x),W=t.data.get(A.dataId).values,G=t.data.get(D.dataId).values,q=y.computeStrides(A.shape),H=y.computeStrides(D.shape),[K,Z,X]=a?[q[0],1,q[1]]:[q[0],q[1],1],[J,ae,Y]=i?[1,H[1],H[0]]:[H[1],1,H[0]],ee=M*L,ie=me([B,M,L],A.dtype),oe=ie.values,ne=t.blockSize;for(let ce=0;ce<B;ce++){let he=ce%h,Te=ce%x;for(let xe=0;xe<M;xe+=ne){let Ne=Math.min(xe+ne,M);for(let Ie=0;Ie<L;Ie+=ne){let Ge=Math.min(Ie+ne,L);for(let Qe=0;Qe<R;Qe+=ne){let Ye=Math.min(Qe+ne,R);for(let qe=xe;qe<Ne;qe++)for(let Ke=Ie;Ke<Ge;Ke++){let Ze=0;for(let Xe=Qe;Xe<Ye;Xe++){let qt=W[he*K+qe*Z+Xe*X],ft=G[Xe*J+Ke*ae+Te*Y];Ze+=qt*ft}oe[ce*ee+(qe*L+Ke)]+=Ze}}}}}return t.disposeIntermediateTensorInfo(A),t.disposeIntermediateTensorInfo(D),t.makeTensorInfo(S,ie.dtype,ie.values)}var B2={kernelName:Fa,backendName:"cpu",kernelFunc:ux};function XU(r){let{inputs:e,backend:t,attrs:o}=r,{a:n,b:s,bias:a,preluActivationWeights:i}=e,{transposeA:p,transposeB:l,activation:u,leakyreluAlpha:c}=o,m,d,f,g=[];m=ux({inputs:{a:n,b:s},attrs:{transposeA:p,transposeB:l},backend:t}),a&&(d=_o({inputs:{a:m,b:a},backend:t}),g.push(m),m=d),u&&(f=fa(t,m,u,i,c),g.push(m),m=f);for(let x of g)t.disposeIntermediateTensorInfo(x);return m}var z2={kernelName:Es,backendName:"cpu",kernelFunc:XU};var QU=be(In,r=>Math.acos(r)),U2={kernelName:In,backendName:"cpu",kernelFunc:QU};var YU=be(kn,r=>Math.acosh(r)),W2={kernelName:kn,backendName:"cpu",kernelFunc:YU};function ZU(r){let{inputs:e,backend:t}=r,o=e;Q(e,"addN");let n=o.map(i=>t.data.get(i.dataId).values),s=me(o[0].shape,o[0].dtype),a=s.values;for(let i=0;i<o.length;i++){let p=n[i];for(let l=0;l<a.length;l++)a[l]+=p[l]}return t.makeTensorInfo(s.shape,s.dtype,s.values)}var G2={kernelName:Sa,backendName:"cpu",kernelFunc:ZU};function JU(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,keepDims:a}=o;Q(n,"all");let i=y.parseAxisParam(s,n.shape),p=i,l=I.getAxesPermutation(p,n.shape.length),u=n;l!=null&&(u=pt({inputs:{x:n},backend:t,attrs:{perm:l}}),p=I.getInnerMostAxes(p.length,n.shape.length)),I.assertAxesAreInnerMostDims("all",p,u.shape.length);let[c,m]=I.computeOutAndReduceShapes(u.shape,p),d=y.sizeFromShape(m),f=y.makeZerosTypedArray(y.sizeFromShape(c),u.dtype),g=t.data.get(u.dataId).values;for(let x=0;x<f.length;++x){let b=x*d,S=g[b];for(let C=0;C<d;++C){let $=g[b+C];S=S&&$}f[x]=S}l!=null&&t.disposeIntermediateTensorInfo(u);let h=t.makeTensorInfo(c,u.dtype,f);if(a){let x=I.expandShapeToKeepDim(c,i),b=Ae({inputs:{x:h},backend:t,attrs:{shape:x}});return t.disposeIntermediateTensorInfo(h),b}return h}var H2={kernelName:Na,backendName:"cpu",kernelFunc:JU};function eW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,keepDims:a}=o;Q(n,"any");let i=y.parseAxisParam(s,n.shape),p=i,l=I.getAxesPermutation(p,n.shape.length),u=n;l!=null&&(u=pt({inputs:{x:n},backend:t,attrs:{perm:l}}),p=I.getInnerMostAxes(p.length,n.shape.length)),I.assertAxesAreInnerMostDims("any",p,u.shape.length);let[c,m]=I.computeOutAndReduceShapes(u.shape,p),d=y.sizeFromShape(m),f=y.makeZerosTypedArray(y.sizeFromShape(c),u.dtype),g=t.data.get(u.dataId).values;for(let x=0;x<f.length;++x){let b=x*d,S=g[b];for(let C=0;C<d;++C){let $=g[b+C];S=S||$}f[x]=S}l!=null&&t.disposeIntermediateTensorInfo(u);let h=t.makeTensorInfo(c,u.dtype,f);if(a){let x=I.expandShapeToKeepDim(c,i),b=Ae({inputs:{x:h},backend:t,attrs:{shape:x}});return t.disposeIntermediateTensorInfo(h),b}return h}var q2={kernelName:Ia,backendName:"cpu",kernelFunc:eW};function tW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s}=o;Q(n,"argMax");let a=y.parseAxisParam(s,n.shape),i=I.getAxesPermutation(a,n.shape.length),p=n,l=[];i!=null&&(p=pt({inputs:{x:n},backend:t,attrs:{perm:i}}),l.push(p),a=I.getInnerMostAxes(a.length,p.shape.length)),a=[a[0]],I.assertAxesAreInnerMostDims("argMax",a,p.shape.length);let[u,c]=I.computeOutAndReduceShapes(p.shape,a),m=y.sizeFromShape(u),d=y.makeZerosTypedArray(m,"int32"),f=y.sizeFromShape(c),g=t.data.get(p.dataId).values;for(let h=0;h<d.length;++h){let x=h*f,b=g[x],S=0;for(let C=0;C<f;++C){let $=g[x+C];$>b&&(b=$,S=C)}d[h]=S}return l.forEach(h=>t.disposeIntermediateTensorInfo(h)),t.makeTensorInfo(u,"int32",d)}var K2={kernelName:ka,backendName:"cpu",kernelFunc:tW};function rW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s}=o;Q(n,"argMin");let a=y.parseAxisParam(s,n.shape),i=I.getAxesPermutation(a,n.shape.length),p=n,l=[];i!=null&&(p=pt({inputs:{x:n},backend:t,attrs:{perm:i}}),l.push(p),a=I.getInnerMostAxes(a.length,p.shape.length)),a=[a[0]],I.assertAxesAreInnerMostDims("argMin",a,p.shape.length);let[u,c]=I.computeOutAndReduceShapes(p.shape,a),m=y.sizeFromShape(u),d=y.makeZerosTypedArray(m,"int32"),f=y.sizeFromShape(c),g=t.data.get(p.dataId).values;for(let h=0;h<d.length;++h){let x=h*f,b=g[x],S=0;for(let C=0;C<f;++C){let $=g[x+C];$<b&&(b=$,S=C)}d[h]=S}return l.forEach(h=>t.disposeIntermediateTensorInfo(h)),t.makeTensorInfo(u,"int32",d)}var j2={kernelName:Ea,backendName:"cpu",kernelFunc:rW};var oW=be(En,r=>Math.asin(r)),X2={kernelName:En,backendName:"cpu",kernelFunc:oW};var nW=be($n,r=>Math.asinh(r)),Q2={kernelName:$n,backendName:"cpu",kernelFunc:nW};var sW=be(An,r=>Math.atan(r)),Y2={kernelName:An,backendName:"cpu",kernelFunc:sW};var aW=$e((r,e)=>Math.atan2(r,e)),iW=Oe(Dn,aW),Z2={kernelName:Dn,backendName:"cpu",kernelFunc:iW};var pW=be(Fn,r=>Math.atanh(r)),J2={kernelName:Fn,backendName:"cpu",kernelFunc:pW};function Zp(r,e,t,o,n,s){let a=n.strideHeight,i=n.strideWidth,p=n.dilationHeight,l=n.dilationWidth,u=n.effectiveFilterHeight,c=n.effectiveFilterWidth,m=n.padInfo.top,d=n.padInfo.left,f=s==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,g=me(n.outShape,t),h=g.values,x=n.outShape[1]*n.outShape[2]*n.outShape[3],b=n.outShape[2]*n.outShape[3],S=n.outShape[3];for(let C=0;C<n.batchSize;++C){let $=C*x,A=C*o[0];for(let D=0;D<n.inChannels;++D)for(let R=0;R<n.outHeight;++R){let M=R*a-m,L=Math.max(0,M),B=Math.min(n.inHeight,u+M),W=$+R*b;for(let G=0;G<n.outWidth;++G){let q=G*i-d,H=Math.max(0,q),K=Math.min(n.inWidth,c+q),Z=f,X=0,J=0;for(let Y=L;Y<B;Y+=p){let ee=A+Y*o[1];for(let ie=H;ie<K;ie+=l){let oe=ee+ie*o[2],ne=r[oe+D];s==="max"&&ne>Z?Z=ne:s==="avg"&&(X+=ne,J++)}if(isNaN(Z))break}let ae=W+G*S+D;h[ae]=s==="avg"?X/J:Z}}}return g}function Yd(r,e,t,o,n=!1,s=!1){let a=me(o.outShape,"int32"),i=o.strideHeight,p=o.strideWidth,l=o.dilationHeight,u=o.dilationWidth,c=o.effectiveFilterHeight,m=o.effectiveFilterWidth,d=o.padInfo.top,f=o.padInfo.left,g=me(e,t,r);for(let h=0;h<o.batchSize;++h)for(let x=0;x<o.inChannels;++x)for(let b=0;b<o.outHeight;++b){let S=b*i-d,C=S;for(;C<0;)C+=l;let $=Math.min(o.inHeight,c+S);for(let A=0;A<o.outWidth;++A){let D=A*p-f,R=D;for(;R<0;)R+=u;let M=Math.min(o.inWidth,m+D),L=Number.NEGATIVE_INFINITY,B=-1;for(let W=C;W<$;W+=l){let G=W-S;for(let q=R;q<M;q+=u){let H=q-D,K=g.get(h,W,q,x);K>L&&(L=K,n?B=s?((h*o.inHeight+W)*o.inWidth+q)*o.inChannels+x:(W*o.inWidth+q)*o.inChannels+x:B=G*m+H)}}a.set(B,h,b,A,x)}}return a}function Zd(r,e,t,o,n,s){let a=n.strideDepth,i=n.strideHeight,p=n.strideWidth,l=n.dilationDepth,u=n.dilationHeight,c=n.dilationWidth,m=n.effectiveFilterDepth,d=n.effectiveFilterHeight,f=n.effectiveFilterWidth,g=n.padInfo.front,h=n.padInfo.top,x=n.padInfo.left,b=s==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,S=me(n.outShape,t),C=S.values,$=n.outShape[1]*n.outShape[2]*n.outShape[3]*n.outShape[4],A=n.outShape[2]*n.outShape[3]*n.outShape[4],D=n.outShape[3]*n.outShape[4],R=n.outShape[4];for(let M=0;M<n.batchSize;++M){let L=M*$,B=M*o[0];for(let W=0;W<n.inChannels;++W)for(let G=0;G<n.outDepth;++G){let q=G*a-g,H=q;for(;H<0;)H+=l;let K=Math.min(n.inDepth,m+q),Z=L+G*A;for(let X=0;X<n.outHeight;++X){let J=X*i-h,ae=J;for(;ae<0;)ae+=u;let Y=Math.min(n.inHeight,d+J),ee=Z+X*D;for(let ie=0;ie<n.outWidth;++ie){let oe=ie*p-x,ne=oe;for(;ne<0;)ne+=c;let ce=Math.min(n.inWidth,f+oe),he=ee+ie*R,Te=b,xe=0,Ne=0;for(let Ge=H;Ge<K;Ge+=l){let Qe=B+Ge*o[1];for(let Ye=ae;Ye<Y;Ye+=u){let qe=Qe+Ye*o[2];for(let Ke=ne;Ke<ce;Ke+=c){let Ze=qe+Ke*o[3],Xe=r[Ze+W];if(s==="max"&&Xe>Te?Te=Xe:s==="avg"&&(xe+=Xe,Ne++),isNaN(Te))break}if(isNaN(Te))break}if(isNaN(Te))break}let Ie=he+W;C[Ie]=s==="avg"?xe/Math.max(Ne,1):Te}}}}return S}function eI(r,e){let t=me(e.outShape,"int32"),o=e.strideDepth,n=e.strideHeight,s=e.strideWidth,a=e.dilationDepth,i=e.dilationHeight,p=e.dilationWidth,l=e.effectiveFilterDepth,u=e.effectiveFilterHeight,c=e.effectiveFilterWidth,m=e.padInfo.front,d=e.padInfo.top,f=e.padInfo.left;for(let g=0;g<e.batchSize;++g)for(let h=0;h<e.inChannels;++h)for(let x=0;x<e.outDepth;++x){let b=x*o-m,S=b;for(;S<0;)S+=a;let C=Math.min(e.inDepth,l+b);for(let $=0;$<e.outHeight;++$){let A=$*n-d,D=A;for(;D<0;)D+=i;let R=Math.min(e.inHeight,u+A);for(let M=0;M<e.outWidth;++M){let L=M*s-f,B=L;for(;B<0;)B+=p;let W=Math.min(e.inWidth,c+L),G=Number.NEGATIVE_INFINITY,q=-1;for(let H=S;H<C;H+=a){let K=H-b;for(let Z=D;Z<R;Z+=i){let X=Z-A;for(let J=B;J<W;J+=p){let ae=J-L,Y=r.get(g,H,Z,J,h);Y>=G&&(G=Y,q=K*u*c+X*u+ae)}}}t.set(q,g,x,$,M,h)}}}return t}function lW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e;Q(n,"avgPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:p}=o,l=1;y.assert(I.eitherStridesOrDilationsAreOne(a,l),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${l}'`);let u=I.computePool2DInfo(n.shape,s,a,l,i,p),c;if(u.filterWidth===1&&u.filterHeight===1&&y.arraysEqual(u.inShape,u.outShape))c=Ht({inputs:{x:n},backend:t});else{let m=t.data.get(n.dataId).values,d=y.computeStrides(n.shape),f=Zp(m,n.shape,n.dtype,d,u,"avg");c=t.makeTensorInfo(u.outShape,n.dtype,f.values)}return c}var tI={kernelName:$a,backendName:"cpu",kernelFunc:lW};function uW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{filterSize:s,strides:a,pad:i,dimRoundingMode:p,dataFormat:l}=o;Q(n,"avgPool3d");let u=I.computePool3DInfo(n.shape,s,a,1,i,p,l),c=t.data.get(n.dataId).values,m=Zd(c,n.shape,n.dtype,y.computeStrides(n.shape),u,"avg");return t.makeTensorInfo(m.shape,"float32",m.values)}var rI={kernelName:Aa,backendName:"cpu",kernelFunc:uW};function cW(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,input:s}=e,{filterSize:a,strides:i,pad:p,dimRoundingMode:l}=o;Q([n,s],"avgPool3DGrad");let u=I.computePool3DInfo(s.shape,a,i,1,p,l),c=u.strideDepth,m=u.strideHeight,d=u.strideWidth,f=u.filterDepth,g=u.filterHeight,h=u.filterWidth,x=u.dilationDepth,b=u.dilationHeight,S=u.dilationWidth,C=u.effectiveFilterDepth,$=u.effectiveFilterHeight,A=u.effectiveFilterWidth,D=C-1-u.padInfo.front,R=A-1-u.padInfo.left,M=$-1-u.padInfo.top,L=me(s.shape,"float32"),B=1/(f*g*h),W=t.bufferSync(n);for(let G=0;G<u.batchSize;++G)for(let q=0;q<u.inChannels;++q)for(let H=0;H<u.inDepth;++H)for(let K=0;K<u.inHeight;++K)for(let Z=0;Z<u.inWidth;++Z){let X=H-D,J=K-M,ae=Z-R,Y=0;for(let ee=0;ee<C;ee+=x){let ie=(X+ee)/c;if(!(ie<0||ie>=u.outDepth||Math.floor(ie)!==ie))for(let oe=0;oe<$;oe+=b){let ne=(J+oe)/m;if(!(ne<0||ne>=u.outHeight||Math.floor(ne)!==ne))for(let ce=0;ce<A;ce+=S){let he=(ae+ce)/d;if(he<0||he>=u.outWidth||Math.floor(he)!==he)continue;let Te=W.get(G,ie,ne,he,q);Y+=Te}}}L.set(Y*B,G,H,K,Z,q)}return t.makeTensorInfo(L.shape,L.dtype,L.values)}var oI={kernelName:hu,backendName:"cpu",kernelFunc:cW};function mW(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,input:s}=e,a=s;Q([n,s],"avgPoolGrad");let{filterSize:i,strides:p,pad:l}=o,u=I.computePool2DInfo(a.shape,i,p,1,l),c=u.strideHeight,m=u.strideWidth,d=u.filterHeight,f=u.filterWidth,g=u.dilationHeight,h=u.dilationWidth,x=u.effectiveFilterHeight,b=u.effectiveFilterWidth,S=b-1-u.padInfo.left,C=x-1-u.padInfo.top,$=me(a.shape,"float32"),A=1/(d*f),D=t.data.get(n.dataId).values,R=me(n.shape,"float32",D);for(let M=0;M<u.batchSize;++M)for(let L=0;L<u.inChannels;++L)for(let B=0;B<u.inHeight;++B)for(let W=0;W<u.inWidth;++W){let G=B-C,q=W-S,H=0;for(let K=0;K<x;K+=g){let Z=(G+K)/c;if(!(Z<0||Z>=u.outHeight||Math.floor(Z)!==Z))for(let X=0;X<b;X+=h){let J=(q+X)/m;if(J<0||J>=u.outWidth||Math.floor(J)!==J)continue;let ae=R.get(M,Z,J,L);H+=ae}}$.set(H*A,M,B,W,L)}return t.makeTensorInfo($.shape,$.dtype,$.values)}var nI={kernelName:fu,backendName:"cpu",kernelFunc:mW};function dW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,scale:s,offset:a,mean:i,variance:p}=e;y.assert(i.shape.length===p.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),y.assert(a==null||i.shape.length===a.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),y.assert(s==null||i.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks."),Q([n,i,p,s,a],"batchNorm");let{varianceEpsilon:l}=o;l==null&&(l=.001);let u=t.data.get(n.dataId).values,c=t.data.get(i.dataId).values,m=t.data.get(p.dataId).values,d=s?t.data.get(s.dataId).values:new Float32Array([1]),f=a?t.data.get(a.dataId).values:new Float32Array([0]),g=new Float32Array(u.length),h=f.length,x=d.length,b=m.length,S=c.length,C=0,$=0,A=0,D=0;for(let R=0;R<u.length;++R)g[R]=f[C++]+(u[R]-c[$++])*d[A++]/Math.sqrt(m[D++]+l),C>=h&&(C=0),$>=S&&($=0),A>=x&&(A=0),D>=b&&(D=0);return t.makeTensorInfo(n.shape,n.dtype,g)}var sI={kernelName:si,backendName:"cpu",kernelFunc:dW};function fW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{blockShape:s,crops:a}=o;Q([n],"batchToSpaceND");let i=s.reduce((x,b)=>x*b),p=I.getReshaped(n.shape,s,i),l=I.getPermuted(p.length,s.length),u=I.getReshapedPermuted(n.shape,s,i),c=I.getSliceBeginCoords(a,s.length),m=I.getSliceSize(u,a,s.length),d=Ae({inputs:{x:n},backend:t,attrs:{shape:p}}),f=pt({inputs:{x:d},backend:t,attrs:{perm:l}}),g=Ae({inputs:{x:f},backend:t,attrs:{shape:u}}),h=Br({inputs:{x:g},backend:t,attrs:{begin:c,size:m}});return t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(g),h}var aI={kernelName:Da,backendName:"cpu",kernelFunc:fW};function hW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,weights:s}=e,{size:a}=o,i=t.data.get(n.dataId).values,p=t.data.get(s.dataId).values,l=Bp(i,p,s.dtype,s.shape,a);return t.makeTensorInfo([a],s.dtype,l)}var iI={kernelName:Ra,backendName:"cpu",kernelFunc:hW};function gW(r){let{inputs:e,backend:t}=r,{s0:o,s1:n}=e,s=t.data.get(o.dataId).values,a=t.data.get(n.dataId).values,i=I.assertAndGetBroadcastShape(Array.from(s),Array.from(a));return t.makeTensorInfo([i.length],"int32",Int32Array.from(i))}var pI={kernelName:Oa,backendName:"cpu",kernelFunc:gW};var xW=be(Pn,(r,e)=>{let t=e;return r>t.clipValueMax?t.clipValueMax:r<t.clipValueMin?t.clipValueMin:r}),lI={kernelName:Pn,backendName:"cpu",kernelFunc:xW};var yW=r=>{let{x:e}=r.inputs,t=r.backend,o=new Float32Array(y.sizeFromShape(e.shape)),n=t.data.get(e.dataId),s=n.complexTensorInfos.real,a=n.complexTensorInfos.imag,i=t.data.get(s.dataId).values,p=t.data.get(a.dataId).values;for(let l=0;l<i.length;l++){let u=i[l],c=p[l];o[l]=Math.hypot(u,c)}return t.makeOutput(o,e.shape,"float32")},uI={kernelName:Ma,backendName:"cpu",kernelFunc:yW};function To(r){let{inputs:e,backend:t}=r,{input:o}=e,n=t.data.get(o.dataId).complexTensorInfos.imag,s=t.data.get(n.dataId).values;return t.makeTensorInfo(n.shape,n.dtype,s)}var cI={kernelName:li,backendName:"cpu",kernelFunc:To};function yn(r){let{inputs:e,backend:t,attrs:o}=r,{axis:n}=o,s=y.parseAxisParam(n,e[0].shape)[0],a=e.map(g=>g.shape);I.assertParamsConsistent(a,s);let i=I.computeOutShape(e.map(g=>g.shape),s);if(y.sizeFromShape(i)===0)return t.makeTensorInfo(i,e[0].dtype,[]);let p=e.filter(g=>y.sizeFromShape(g.shape)>0);if(p.length===1)return Ht({inputs:{x:p[0]},backend:t});if(p[0].dtype==="complex64"){let g=p.map(C=>Mr({inputs:{input:C},backend:t})),h=p.map(C=>To({inputs:{input:C},backend:t})),x=yn({inputs:g,backend:t,attrs:{axis:s}}),b=yn({inputs:h,backend:t,attrs:{axis:s}}),S=kt({inputs:{real:x,imag:b},backend:t});return g.forEach(C=>t.disposeIntermediateTensorInfo(C)),h.forEach(C=>t.disposeIntermediateTensorInfo(C)),t.disposeIntermediateTensorInfo(x),t.disposeIntermediateTensorInfo(b),S}let l=p.map(g=>{let x=[-1,y.sizeFromShape(g.shape.slice(s))];return Ae({inputs:{x:g},backend:t,attrs:{shape:x}})}),u=l.map(g=>({vals:t.data.get(g.dataId).values,shape:g.shape}));i=I.computeOutShape(l.map(g=>g.shape),1);let c=l[0].shape[0]===1,m=sm(u,i,e[0].dtype,c),d=I.computeOutShape(p.map(g=>g.shape),s),f=t.makeTensorInfo(d,e[0].dtype,m);return l.forEach(g=>t.disposeIntermediateTensorInfo(g)),f}var mI={kernelName:La,backendName:"cpu",kernelFunc:yn};function cx(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,filter:s}=e,{strides:a,pad:i,dataFormat:p,dilations:l,dimRoundingMode:u}=o;Q([n,s],"conv2d");let c=I.convertConv2DDataFormat(p),m=I.computeConv2DInfo(n.shape,s.shape,a,l,i,u,!1,c),d=m.filterHeight,f=m.filterWidth,g=m.dilationHeight,h=m.dilationWidth,x=m.padInfo.left,b=m.padInfo.top,S=m.dataFormat==="channelsLast",C=new Le(m.outShape,n.dtype),$=y.computeStrides(n.shape),A=y.computeStrides(s.shape),D=$[0],R=S?$[1]:$[2],M=S?$[2]:1,L=S?1:$[1],B=C.strides[0],W=S?C.strides[1]:C.strides[2],G=S?C.strides[2]:1,q=S?1:C.strides[1],H=t.data.get(n.dataId).values,K=t.data.get(s.dataId).values,Z=C.values;for(let X=0;X<m.batchSize;++X){let J=X*D,ae=X*B;for(let Y=0;Y<m.outHeight;++Y){let ee=ae+Y*W,ie=Y*m.strideHeight-b;for(let oe=0;oe<d;++oe){let ne=ie+oe*g;if(ne<0||ne>=m.inHeight)continue;let ce=oe*A[0],he=J+ne*R;for(let Te=0;Te<m.outWidth;++Te){let xe=ee+Te*G,Ne=Te*m.strideWidth-x;for(let Ie=0;Ie<f;++Ie){let Ge=Ne+Ie*h;if(Ge<0||Ge>=m.inWidth)continue;let Qe=ce+Ie*A[1],Ye=he+Ge*M,qe=Qe;for(let Ke=0;Ke<m.inChannels;++Ke){let Ze=H[Ye+Ke*L];for(let Xe=0;Xe<m.outChannels;++Xe)Z[xe+Xe*q]+=Ze*K[qe+Xe];qe+=m.outChannels}}}}}}return t.makeTensorInfo(C.shape,C.dtype,Z)}var dI={kernelName:Va,backendName:"cpu",kernelFunc:cx};function bW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,dy:s}=e,{strides:a,pad:i,dataFormat:p,dimRoundingMode:l,filterShape:u}=o;Q([n,s],"conv2dBackpropFilter");let c=I.convertConv2DDataFormat(p),m=I.computeConv2DInfo(n.shape,u,a,1,i,l,!1,c),{strideHeight:d,strideWidth:f,filterHeight:g,filterWidth:h}=m,x=m.dataFormat==="channelsLast",b=new Le(m.filterShape,"float32"),S=m.padInfo.left,C=m.padInfo.top,$=t.data.get(n.dataId).values,A=t.data.get(s.dataId).values,D=new Le(n.shape,n.dtype,$),R=new Le(s.shape,s.dtype,A);for(let M=0;M<g;++M){let L=Math.max(0,Math.ceil((C-M)/d)),B=Math.min(m.outHeight,(m.inHeight+C-M)/d);for(let W=0;W<h;++W){let G=Math.max(0,Math.ceil((S-W)/f)),q=Math.min(m.outWidth,(m.inWidth+S-W)/f);for(let H=0;H<m.inChannels;++H)for(let K=0;K<m.outChannels;++K){let Z=0;for(let X=0;X<m.batchSize;++X)for(let J=L;J<B;++J){let ae=M+J*d-C;for(let Y=G;Y<q;++Y){let ee=W+Y*f-S;x?Z+=D.get(X,ae,ee,H)*R.get(X,J,Y,K):Z+=D.get(X,H,ae,ee)*R.get(X,K,J,Y)}}b.set(Z,M,W,H,K)}}}return t.makeTensorInfo(b.shape,b.dtype,b.values)}var fI={kernelName:Ba,backendName:"cpu",kernelFunc:bW};function _W(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,filter:s}=e,{inputShape:a,strides:i,pad:p,dataFormat:l,dimRoundingMode:u}=o;Q([n,s],"conv2dBackpropInput");let c=y.computeStrides(s.shape),m=y.computeStrides(n.shape),d=I.convertConv2DDataFormat(l),f=I.computeConv2DInfo(a,s.shape,i,1,p,u,!1,d),g=new Le(f.inShape,"float32"),h=g.values,x=t.data.get(n.dataId).values,b=t.data.get(s.dataId).values,[S,C,$]=c,{batchSize:A,filterHeight:D,filterWidth:R,inChannels:M,inHeight:L,inWidth:B,outChannels:W,outHeight:G,outWidth:q,strideHeight:H,strideWidth:K}=f;d=f.dataFormat;let Z=D-1-f.padInfo.top,X=R-1-f.padInfo.left,J=d==="channelsLast",ae=g.strides[0],Y=J?g.strides[1]:g.strides[2],ee=J?g.strides[2]:1,ie=J?1:g.strides[1],oe=m[0],ne=J?m[1]:m[2],ce=J?m[2]:1,he=J?1:m[1];for(let Te=0;Te<A;++Te)for(let xe=0;xe<M;++xe)for(let Ne=0;Ne<L;++Ne){let Ie=Ne-Z,Ge=Math.max(0,Math.ceil(Ie/H)),Qe=Math.min(G,(D+Ie)/H);for(let Ye=0;Ye<B;++Ye){let qe=Ye-X,Ke=Math.max(0,Math.ceil(qe/K)),Ze=Math.min(q,(R+qe)/K),Xe=0;for(let ft=Ge;ft<Qe;++ft){let Pe=ft*H-Ie;for(let Lt=Ke;Lt<Ze;++Lt){let wo=Lt*K-qe,Tt=oe*Te+ne*ft+ce*Lt,Ur=S*(D-1-Pe)+C*(R-1-wo)+$*xe;for(let Cr=0;Cr<W;++Cr){let Kt=x[Tt+he*Cr],Vt=b[Ur+Cr];Xe+=Kt*Vt}}}let qt=ae*Te+Y*Ne+ee*Ye+ie*xe;h[qt]=Xe}}return t.makeTensorInfo(g.shape,g.dtype,g.values)}var hI={kernelName:za,backendName:"cpu",kernelFunc:_W};function vW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,filter:s}=e,{strides:a,pad:i,dilations:p}=o;Q([n,s],"conv3d");let l=I.computeConv3DInfo(n.shape,s.shape,a,p,i),{filterDepth:u,filterHeight:c,filterWidth:m,dilationDepth:d,dilationHeight:f,dilationWidth:g,padInfo:h}=l,x=h.front,b=h.left,S=h.top,C=new Le(l.outShape,n.dtype),$=t.data.get(n.dataId).values,A=t.data.get(s.dataId).values,D=C.values,R=y.computeStrides(n.shape),M=y.computeStrides(s.shape);for(let L=0;L<l.batchSize;++L){let B=L*R[0],W=L*C.strides[0];for(let G=0;G<l.outDepth;++G){let q=W+G*C.strides[1],H=G*l.strideDepth-x;for(let K=0;K<u;++K){let Z=H+K*d;if(Z<0||Z>=l.inDepth)continue;let X=K*M[0],J=B+Z*R[1];for(let ae=0;ae<l.outHeight;++ae){let Y=q+ae*C.strides[2],ee=ae*l.strideHeight-S;for(let ie=0;ie<c;++ie){let oe=ee+ie*f;if(oe<0||oe>=l.inHeight)continue;let ne=X+ie*M[1],ce=J+oe*R[2];for(let he=0;he<l.outWidth;++he){let Te=Y+he*l.outChannels,xe=he*l.strideWidth-b;for(let Ne=0;Ne<m;++Ne){let Ie=xe+Ne*g;if(Ie<0||Ie>=l.inWidth)continue;let Ge=ne+Ne*M[2],Qe=ce+Ie*l.inChannels,Ye=Ge;for(let qe=0;qe<l.inChannels;++qe){let Ke=$[Qe+qe];for(let Ze=0;Ze<l.outChannels;++Ze)D[Te+Ze]+=Ke*A[Ye+Ze];Ye+=l.outChannels}}}}}}}}return t.makeTensorInfo(C.shape,C.dtype,C.values)}var gI={kernelName:Ua,backendName:"cpu",kernelFunc:vW};function TW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,dy:s}=e,{strides:a,pad:i,filterShape:p}=o;Q([n,s],"conv3dBackpropFilterV2");let l=y.computeStrides(n.shape),u=y.computeStrides(s.shape),c=I.computeConv3DInfo(n.shape,p,a,1,i),m=c.strideDepth,d=c.strideHeight,f=c.strideWidth,g=c.filterDepth,h=c.filterHeight,x=c.filterWidth,b=new Le(c.filterShape,"float32"),S=b.values,[C,$,A,D]=b.strides,R=t.data.get(s.dataId).values,[M,L,B,W]=u,G=t.data.get(n.dataId).values,[q,H,K,Z]=l,X=c.padInfo.front,J=c.padInfo.left,ae=c.padInfo.top;for(let Y=0;Y<g;++Y){let ee=Math.max(0,Math.ceil((X-Y)/m)),ie=Math.min(c.outDepth,(c.inDepth+X-Y)/m),oe=Y*C;for(let ne=0;ne<h;++ne){let ce=Math.max(0,Math.ceil((ae-ne)/d)),he=Math.min(c.outHeight,(c.inHeight+ae-ne)/d),Te=ne*$+oe;for(let xe=0;xe<x;++xe){let Ne=Math.max(0,Math.ceil((J-xe)/f)),Ie=Math.min(c.outWidth,(c.inWidth+J-xe)/f),Ge=xe*A+Te;for(let Qe=0;Qe<c.inChannels;++Qe){let Ye=Qe*D+Ge;for(let qe=0;qe<c.outChannels;++qe){let Ke=0;for(let Ze=0;Ze<c.batchSize;++Ze){let Xe=Ze*q,qt=Ze*M;for(let ft=ee;ft<ie;++ft){let Lt=(Y+ft*m-X)*H+Xe,wo=ft*L+qt;for(let Tt=ce;Tt<he;++Tt){let Cr=(ne+Tt*d-ae)*K+Lt,Kt=Tt*B+wo;for(let Vt=Ne;Vt<Ie;++Vt){let St=(xe+Vt*f-J)*Z+Cr,vn=Vt*W+Kt;Ke+=G[St+Qe]*R[vn+qe]}}}}S[Ye+qe]=Ke}}}}}return t.makeTensorInfo(b.shape,b.dtype,b.values)}var xI={kernelName:gu,backendName:"cpu",kernelFunc:TW};function wW(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,filter:s}=e,{pad:a,strides:i,inputShape:p}=o;Q([n],"conv3dBackpropInputV2");let l=y.computeStrides(n.shape),u=y.computeStrides(s.shape),c=I.computeConv3DInfo(p,s.shape,i,1,a),m=new Le(c.inShape,"float32"),d=m.values,[f,g,h,x]=m.strides,b=t.data.get(n.dataId).values,[S,C,$,A]=l,D=t.data.get(s.dataId).values,[R,M,L,B]=u,{batchSize:W,filterDepth:G,filterHeight:q,filterWidth:H,inChannels:K,inDepth:Z,inHeight:X,inWidth:J,outChannels:ae,outDepth:Y,outHeight:ee,outWidth:ie,strideDepth:oe,strideHeight:ne,strideWidth:ce}=c,he=G-1-c.padInfo.front,Te=q-1-c.padInfo.top,xe=H-1-c.padInfo.left;for(let Ne=0;Ne<W;++Ne)for(let Ie=0;Ie<K;++Ie)for(let Ge=0;Ge<Z;++Ge){let Qe=Ge-he,Ye=Math.max(0,Math.ceil(Qe/oe)),qe=Math.min(Y,(G+Qe)/oe);for(let Ke=0;Ke<X;++Ke){let Ze=Ke-Te,Xe=Math.max(0,Math.ceil(Ze/ne)),qt=Math.min(ee,(q+Ze)/ne);for(let ft=0;ft<J;++ft){let Pe=ft-xe,Lt=Math.max(0,Math.ceil(Pe/ce)),wo=Math.min(ie,(H+Pe)/ce),Tt=0;for(let Ur=Ye;Ur<qe;++Ur){let Cr=Ur*oe-Qe;for(let Kt=Xe;Kt<qt;++Kt){let Vt=Kt*ne-Ze;for(let _n=Lt;_n<wo;++_n){let St=_n*ce-Pe,vn=S*Ne+C*Ur+$*Kt+A*_n,tu=R*(G-1-Cr)+M*(q-1-Vt)+L*(H-1-St)+B*Ie;for(let ha=0;ha<ae;++ha){let ru=b[vn+ha],Tn=D[tu+ha];Tt+=ru*Tn}}}}d[f*Ne+g*Ge+h*Ke+x*ft+Ie]=Tt}}}return t.makeTensorInfo(m.shape,m.dtype,m.values)}var yI={kernelName:Wa,backendName:"cpu",kernelFunc:wW};var CW=be(Mn,r=>Math.cos(r)),bI={kernelName:Mn,backendName:"cpu",kernelFunc:CW};var SW=be(Ln,r=>Math.cosh(r)),_I={kernelName:Ln,backendName:"cpu",kernelFunc:SW};function NW(r){let{inputs:e,backend:t,attrs:o}=r,{image:n,boxes:s,boxInd:a}=e,{cropSize:i,method:p,extrapolationValue:l}=o,[u,c,m,d]=n.shape,f=s.shape[0],[g,h]=i,x=me([f,g,h,d],"float32"),b=t.data.get(s.dataId).values,S=t.data.get(a.dataId).values,C=t.data.get(n.dataId).values,$=y.computeStrides(n.shape),A=y.computeStrides(x.shape);for(let D=0;D<f;D++){let R=D*4,M=b[R],L=b[R+1],B=b[R+2],W=b[R+3],G=S[D];if(G>=u)continue;let q=g>1?(B-M)*(c-1)/(g-1):0,H=h>1?(W-L)*(m-1)/(h-1):0;for(let K=0;K<g;K++){let Z=g>1?M*(c-1)+K*q:.5*(M+B)*(c-1);if(Z<0||Z>c-1){for(let X=0;X<h;X++)for(let J=0;J<d;J++){let ae=J+X*A[2]+K*A[1]+D*A[0];x.values[ae]=l}continue}if(p==="bilinear"){let X=Math.floor(Z),J=Math.ceil(Z),ae=Z-X;for(let Y=0;Y<h;Y++){let ee=h>1?L*(m-1)+Y*H:.5*(L+W)*(m-1);if(ee<0||ee>m-1){for(let ce=0;ce<d;ce++){let he=ce+Y*A[2]+K*A[1]+D*A[0];x.values[he]=l}continue}let ie=Math.floor(ee),oe=Math.ceil(ee),ne=ee-ie;for(let ce=0;ce<d;ce++){let he=ce+ie*$[2]+X*$[1]+G*$[0],Te=C[he];he=ce+oe*$[2]+X*$[1]+G*$[0];let xe=C[he];he=ce+ie*$[2]+J*$[1]+G*$[0];let Ne=C[he];he=ce+oe*$[2]+J*$[1]+G*$[0];let Ie=C[he],Ge=Te+(xe-Te)*ne,Qe=Ne+(Ie-Ne)*ne;he=ce+Y*A[2]+K*A[1]+D*A[0],x.values[he]=Ge+(Qe-Ge)*ae}}}else for(let X=0;X<h;++X){let J=h>1?L*(m-1)+X*H:.5*(L+W)*(m-1);if(J<0||J>m-1){for(let ee=0;ee<d;ee++){let ie=ee+X*A[2]+K*A[1]+D*A[0];x.values[ie]=l}continue}let ae=Math.round(J),Y=Math.round(Z);for(let ee=0;ee<d;ee++){let ie=ee+ae*$[2]+Y*$[1]+G*$[0],oe=ee+X*A[2]+K*A[1]+D*A[0];x.values[oe]=C[ie]}}}}return t.makeTensorInfo(x.shape,x.dtype,x.values)}var vI={kernelName:qa,backendName:"cpu",kernelFunc:NW};function IW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,exclusive:a,reverse:i}=o;Q(n,"cumprod");let p=I.getAxesPermutation([s],n.shape.length),l=n;p!=null&&(l=pt({inputs:{x:n},backend:t,attrs:{perm:p}}));let u=I.getInnerMostAxes(1,n.shape.length)[0];if(u!==l.shape.length-1)throw new Error(`backend.cumprod in CPU expects an inner-most axis=${l.shape.length-1} but got axis=${u}`);let c=bt(l.dtype,"int32"),m=y.makeOnesTypedArray(y.sizeFromShape(l.shape),c),d=t.data.get(l.dataId).values,f=l.shape[l.shape.length-1],g=i?(x,b)=>x+f-b-1:(x,b)=>x+b;for(let x=0;x<d.length;x+=f)for(let b=0;b<f;b++){let S=g(x,b);if(b===0)m[S]=a?1:d[S];else{let C=g(x,b-1);m[S]=a?d[C]*m[C]:d[S]*m[C]}}let h=t.makeTensorInfo(l.shape,c,m);if(p!=null){let x=I.getUndoAxesPermutation(p),b=pt({inputs:{x:h},backend:t,attrs:{perm:x}});return t.disposeIntermediateTensorInfo(h),t.disposeIntermediateTensorInfo(l),b}return h}var TI={kernelName:Ga,backendName:"cpu",kernelFunc:IW};function kW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,exclusive:a,reverse:i}=o;Q(n,"cumsum");let p=I.getAxesPermutation([s],n.shape.length),l=n;p!=null&&(l=pt({inputs:{x:n},backend:t,attrs:{perm:p}}));let u=I.getInnerMostAxes(1,n.shape.length)[0];if(u!==l.shape.length-1)throw new Error(`backend.cumsum in CPU expects an inner-most axis=${l.shape.length-1} but got axis=${u}`);let c=bt(l.dtype,"int32"),m=y.makeZerosTypedArray(y.sizeFromShape(l.shape),c),d=t.data.get(l.dataId).values,f=l.shape[l.shape.length-1],g=i?(x,b)=>x+f-b-1:(x,b)=>x+b;for(let x=0;x<d.length;x+=f)for(let b=0;b<f;b++){let S=g(x,b);if(b===0)m[S]=a?0:d[S];else{let C=g(x,b-1);m[S]=a?d[C]+m[C]:d[S]+m[C]}}let h=t.makeTensorInfo(l.shape,c,m);if(p!=null){let x=I.getUndoAxesPermutation(p),b=pt({inputs:{x:h},backend:t,attrs:{perm:x}});return t.disposeIntermediateTensorInfo(h),t.disposeIntermediateTensorInfo(l),b}return h}var wI={kernelName:Ha,backendName:"cpu",kernelFunc:kW};function EW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,weights:s}=e,{size:a,binaryOutput:i}=o;if(n.shape.length===1){let p=t.data.get(n.dataId).values,l=t.data.get(s.dataId).values,u=Bp(p,l,s.dtype,s.shape,a);return t.makeTensorInfo([a],s.dtype,u)}else if(n.shape.length===2){let p=t.bufferSync(n),l=t.bufferSync(s),u=nm(p,l,a,i);return t.makeTensorInfo(u.shape,s.dtype,u.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}var CI={kernelName:Ka,backendName:"cpu",kernelFunc:EW};function $W(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{blockSize:s,dataFormat:a}=o;y.assert(a==="NHWC",()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${a}`);let i=n.shape[0],p=n.shape[1],l=n.shape[2],u=n.shape[3],c=p*s,m=l*s,d=u/(s*s),f=t.data.get(n.dataId).values,g=new Float32Array(i*c*m*d),h=0;for(let x=0;x<i;++x)for(let b=0;b<c;++b){let S=Math.floor(b/s),C=b%s;for(let $=0;$<m;++$){let A=Math.floor($/s),D=$%s,R=(C*s+D)*d;for(let M=0;M<d;++M){let B=M+R+u*(A+l*(S+p*x));g[h++]=f[B]}}}return t.makeTensorInfo([i,c,m,d],n.dtype,g)}var SI={kernelName:ja,backendName:"cpu",kernelFunc:$W};function mx(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,filter:s}=e,{strides:a,pad:i,dilations:p,dimRoundingMode:l}=o;Q([n,s],"depthwiseConv2DNative");let u=y.computeStrides(n.shape),c=y.computeStrides(s.shape),m=p;m==null&&(m=[1,1]),y.assert(I.eitherStridesOrDilationsAreOne(a,m),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${a} and dilations '${m}'`);let d=I.computeConv2DInfo(n.shape,s.shape,a,m,i,l,!0),{filterHeight:f,filterWidth:g,dilationHeight:h,dilationWidth:x,padInfo:b}=d,S=b.left,C=b.top,$=d.outChannels/d.inChannels,A=new Le(d.outShape,n.dtype),D=t.data.get(n.dataId).values,R=t.data.get(s.dataId).values,M=A.values;for(let L=0;L<d.batchSize;++L){let B=L*u[0],W=L*A.strides[0];for(let G=0;G<d.outHeight;++G){let q=W+G*A.strides[1],H=G*d.strideHeight-C;for(let K=0;K<f;++K){let Z=H+K*h;if(Z<0||Z>=d.inHeight)continue;let X=K*c[0],J=B+Z*u[1];for(let ae=0;ae<d.outWidth;++ae){let Y=q+ae*A.strides[2],ee=ae*d.strideWidth-S;for(let ie=0;ie<g;++ie){let oe=ee+ie*x;if(oe<0||oe>=d.inWidth)continue;let ne=X+ie*c[1],ce=J+oe*d.inChannels,he=Y,Te=ne;for(let xe=0;xe<d.inChannels;++xe){let Ne=D[ce+xe];for(let Ie=0;Ie<$;++Ie)M[he+Ie]+=Ne*R[Te+Ie];he+=$,Te+=$}}}}}}return t.makeTensorInfo(A.shape,A.dtype,A.values)}var NI={kernelName:Xa,backendName:"cpu",kernelFunc:mx};function AW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,dy:s}=e,{strides:a,dilations:i,pad:p,dimRoundingMode:l,filterShape:u}=o;Q([n,s],"depthwiseConv2dNativeBackpropFilter");let c=I.computeConv2DInfo(n.shape,u,a,i,p,l,!0),{strideHeight:m,strideWidth:d,filterHeight:f,filterWidth:g}=c,h=new Le(c.filterShape,"float32"),x=c.padInfo.left,b=c.padInfo.top,S=c.outChannels/c.inChannels,C=t.data.get(n.dataId).values,$=new Le(n.shape,n.dtype,C),A=t.data.get(s.dataId).values,D=new Le(s.shape,s.dtype,A);for(let R=0;R<f;++R){let M=Math.max(0,Math.ceil((b-R)/m)),L=Math.min(c.outHeight,(c.inHeight+b-R)/m);for(let B=0;B<g;++B){let W=Math.max(0,Math.ceil((x-B)/d)),G=Math.min(c.outWidth,(c.inWidth+x-B)/d);for(let q=0;q<c.outChannels;++q){let H=Math.trunc(q/S),K=q%S,Z=0;for(let X=0;X<c.batchSize;++X)for(let J=M;J<L;++J){let ae=R+J*m-b;for(let Y=W;Y<G;++Y){let ee=B+Y*d-x;Z+=$.get(X,ae,ee,H)*D.get(X,J,Y,q)}}h.set(Z,R,B,H,K)}}}return t.makeTensorInfo(h.shape,h.dtype,h.values)}var II={kernelName:Qa,backendName:"cpu",kernelFunc:AW};function FW(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,filter:s}=e,{strides:a,dilations:i,pad:p,dimRoundingMode:l,inputShape:u}=o;Q([n,s],"depthwiseConv2DNativeBackpropInput");let c=y.computeStrides(n.shape),m=y.computeStrides(s.shape),d=I.computeConv2DInfo(u,s.shape,a,i,p,l,!0),f=new Le(d.inShape,"float32"),g=f.values,[h,x,b]=f.strides,S=t.data.get(n.dataId).values,[C,$,A]=c,D=t.data.get(s.dataId).values,[R,M,L]=m,{batchSize:B,filterHeight:W,filterWidth:G,inChannels:q,inHeight:H,inWidth:K,outChannels:Z,outHeight:X,outWidth:J,strideHeight:ae,strideWidth:Y}=d,ee=W-1-d.padInfo.top,ie=G-1-d.padInfo.left,oe=Z/q;for(let ne=0;ne<B;++ne)for(let ce=0;ce<q;++ce)for(let he=0;he<H;++he){let Te=he-ee,xe=Math.max(0,Math.ceil(Te/ae)),Ne=Math.min(X,(W+Te)/ae);for(let Ie=0;Ie<K;++Ie){let Ge=Ie-ie,Qe=Math.max(0,Math.ceil(Ge/Y)),Ye=Math.min(J,(G+Ge)/Y),qe=0;for(let Ke=xe;Ke<Ne;++Ke){let Ze=Ke*ae-Te;for(let Xe=Qe;Xe<Ye;++Xe){let qt=Xe*Y-Ge,ft=C*ne+$*Ke+A*Xe,Pe=R*(W-1-Ze)+M*(G-1-qt)+L*ce;for(let Lt=0;Lt<oe;++Lt){let wo=ce*oe+Lt,Tt=S[ft+wo],Ur=D[Pe+Lt];qe+=Tt*Ur}}}g[h*ne+x*he+b*Ie+ce]=qe}}return t.makeTensorInfo(f.shape,f.dtype,f.values)}var kI={kernelName:Ya,backendName:"cpu",kernelFunc:FW};function DW(r){let{inputs:e,backend:t}=r,{x:o}=e,n=y.sizeFromShape(o.shape),s=t.data.get(o.dataId).values,a=me([n,n],o.dtype),i=a.values;for(let l=0;l<s.length;l++)i[l*n+l]=s[l];let p=[...o.shape,...o.shape];return t.makeTensorInfo(p,a.dtype,a.values)}var EI={kernelName:Za,backendName:"cpu",kernelFunc:DW};var $I={kernelName:Ja,backendName:"cpu",kernelFunc:({inputs:r,backend:e,attrs:t})=>{let{x:o,filter:n}=r,{strides:s,pad:a,dilations:i}=t,p=e,l=p.data.get(o.dataId).values,u=o.shape.length,c=p.data.get(n.dataId).values,m=n.shape.length,{batchSize:d,inHeight:f,inWidth:g,inChannels:h,outHeight:x,outWidth:b,padInfo:S,strideHeight:C,strideWidth:$,filterHeight:A,filterWidth:D,dilationHeight:R,dilationWidth:M,outShape:L}=I.computeDilation2DInfo(o.shape,n.shape,s,a,"NHWC",i),B=y.sizeFromShape(L),W=L.length,G=y.getArrayFromDType(o.dtype,B);for(let H=0;H<d;++H)for(let K=0;K<x;++K){let Z=K*C-S.top;for(let X=0;X<b;++X){let J=X*$-S.left;for(let ae=0;ae<h;++ae){let Y=Number.MIN_SAFE_INTEGER;for(let ie=0;ie<A;++ie){let oe=Z+ie*R;if(oe>=0&&oe<f)for(let ne=0;ne<D;++ne){let ce=J+ne*M;if(ce>=0&&ce<g){let he=y.locToIndex([H,oe,ce,ae],u,y.computeStrides(o.shape)),Te=y.locToIndex([ie,ne,ae],m,y.computeStrides(n.shape)),xe=l[he]+c[Te];xe>Y&&(Y=xe)}}}let ee=y.locToIndex([H,K,X,ae],W,y.computeStrides(L));G[ee]=Y}}}return{dataId:p.write(y.toTypedArray(G,o.dtype),L,o.dtype),shape:L,dtype:o.dtype}}};var AI={kernelName:Gf,backendName:"cpu",kernelFunc:({inputs:r,backend:e,attrs:t})=>{let{x:o,filter:n,dy:s}=r,{strides:a,pad:i,dilations:p}=t,l=e,u=y.toNestedArray(o.shape,l.data.get(o.dataId).values),c=y.toNestedArray(n.shape,l.data.get(n.dataId).values),{batchSize:m,inHeight:d,inWidth:f,inChannels:g,outHeight:h,outWidth:x,padInfo:b,strideHeight:S,strideWidth:C,filterHeight:$,filterWidth:A,dilationHeight:D,dilationWidth:R,outShape:M}=I.computeDilation2DInfo(o.shape,n.shape,a,i,"NHWC",p);y.assert(s.rank===M.length,()=>`Error in ${Gf}, dy must have the same rank as output ${M.length}, but got ${s.rank}`);let L=y.toNestedArray(M,l.data.get(s.dataId).values),B=y.makeZerosNestedTypedArray(n.shape,n.dtype);for(let G=0;G<m;++G)for(let q=0;q<h;++q){let H=q*S-b.top;for(let K=0;K<x;++K){let Z=K*C-b.left;for(let X=0;X<g;++X){let J=Number.MIN_SAFE_INTEGER,ae=0,Y=0;for(let ee=0;ee<$;++ee){let ie=H+ee*D;if(ie>=0&&ie<d)for(let oe=0;oe<A;++oe){let ne=Z+oe*R;if(ne>=0&&ne<f){let ce=u[G][ie][ne][X]+c[ee][oe][X];ce>J&&(J=ce,ae=ee,Y=oe)}}}B[ae][Y][X]+=L[G][q][K][X]}}}return{dataId:l.write(y.toTypedArray(B,o.dtype),n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}};var FI={kernelName:Wf,backendName:"cpu",kernelFunc:({inputs:r,backend:e,attrs:t})=>{let{x:o,filter:n,dy:s}=r,{strides:a,pad:i,dilations:p}=t,l=e,u=y.toNestedArray(o.shape,l.data.get(o.dataId).values),c=y.toNestedArray(n.shape,l.data.get(n.dataId).values),{batchSize:m,inHeight:d,inWidth:f,inChannels:g,outHeight:h,outWidth:x,padInfo:b,strideHeight:S,strideWidth:C,filterHeight:$,filterWidth:A,dilationHeight:D,dilationWidth:R,outShape:M}=I.computeDilation2DInfo(o.shape,n.shape,a,i,"NHWC",p);y.assert(s.rank===M.length,()=>`Error in ${Wf}, dy must have the same rank as output ${M.length}, but got ${s.rank}`);let L=y.toNestedArray(M,l.data.get(s.dataId).values),B=y.makeZerosNestedTypedArray(o.shape,o.dtype);for(let G=0;G<m;++G)for(let q=0;q<h;++q){let H=q*S-b.top;for(let K=0;K<x;++K){let Z=K*C-b.left;for(let X=0;X<g;++X){let J=Number.MIN_SAFE_INTEGER,ae=H<0?0:H,Y=Z<0?0:Z;for(let ee=0;ee<$;++ee){let ie=H+ee*D;if(ie>=0&&ie<d)for(let oe=0;oe<A;++oe){let ne=Z+oe*R;if(ne>=0&&ne<f){let ce=u[G][ie][ne][X]+c[ee][oe][X];ce>J&&(J=ce,ae=ie,Y=ne)}}}B[G][ae][Y][X]+=L[G][q][K][X]}}}return{dataId:l.write(y.toTypedArray(B,o.dtype),o.shape,o.dtype),shape:o.shape,dtype:o.dtype}}};function RW(r){let{inputs:e,backend:t,attrs:o}=r,{image:n}=e,{canvas:s,options:a}=o,{contextOptions:i,imageOptions:p}=a||{},l=p?.alpha||1,u=i?.contextType||"2d";if(u!=="2d")throw new Error(`Context type ${i.contextType} is not supported by the CPU backend.`);let c=s.getContext(u,i?.contextAttributes||{});if(c==null)throw new Error(`Could not get the context with ${u} type.`);let[m,d]=n.shape.slice(0,2),f=n.shape.length===2?1:n.shape[2],g=t.data.get(n.dataId).values,h=n.dtype==="float32"?255:1,x=new Uint8ClampedArray(d*m*4);for(let S=0;S<m*d;++S){let C=[0,0,0,255*l];for(let A=0;A<f;A++){let D=g[S*f+A];if(n.dtype==="float32"){if(D<0||D>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${D}.`)}else if(n.dtype==="int32"&&(D<0||D>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${D}.`);f===1?(C[0]=D*h,C[1]=D*h,C[2]=D*h):C[A]=D*h}let $=S*4;x[$+0]=Math.round(C[0]),x[$+1]=Math.round(C[1]),x[$+2]=Math.round(C[2]),x[$+3]=Math.round(C[3])}s.width=d,s.height=m;let b=new ImageData(x,d,m);return c.putImageData(b,0,0),n}var DI={kernelName:ul,backendName:"cpu",kernelFunc:RW};function Uo(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,keepDims:a}=o;Q(n,"sum");let i;n.dtype==="bool"?i=Lr({inputs:{x:n},backend:t,attrs:{dtype:"int32"}}):i=Ht({inputs:{x:n},backend:t});let p=i.shape.length,l=y.parseAxisParam(s,i.shape),u=I.getAxesPermutation(l,p),c=l,m=i;u!=null&&(m=pt({inputs:{x:i},backend:t,attrs:{perm:u}}),c=I.getInnerMostAxes(c.length,p)),I.assertAxesAreInnerMostDims("sum",c,m.shape.length);let[d,f]=I.computeOutAndReduceShapes(m.shape,c),g=I.upcastType(m.dtype,"int32"),h=Lp(t,d,g),x=y.sizeFromShape(f),b=t.data.get(h.dataId).values,S=t.data.get(m.dataId).values;for(let C=0;C<b.length;++C){let $=C*x,A=0;for(let D=0;D<x;++D)A+=S[$+D];b[C]=A}if(a){let C=I.expandShapeToKeepDim(h.shape,l),$=h;h=Ae({inputs:{x:h},backend:t,attrs:{shape:C}}),t.disposeIntermediateTensorInfo($)}return t.disposeIntermediateTensorInfo(i),u!=null&&t.disposeIntermediateTensorInfo(m),h}var RI={kernelName:Hi,backendName:"cpu",kernelFunc:Uo};function OW(r){let{inputs:e,backend:t,attrs:o}=r,{equation:n}=o,s=e,{allDims:a,summedDims:i,idDims:p}=I.decodeEinsumEquation(n,s.length);I.checkEinsumDimSizes(a.length,p,s);let{path:l,steps:u}=I.getEinsumComputePath(i,p),c=u.length,m=null,d=a.length,f=[];for(let g=0;g<c;++g){for(let h of u[g]){let{permutationIndices:x,expandDims:b}=I.getEinsumPermutation(d,p[h]),S;I.isIdentityPermutation(x)?S=s[h]:(S=pt({inputs:{x:s[h]},backend:t,attrs:{perm:x}}),f.push(S));let C=S.shape.slice();for(let $=0;$<b.length;++$)C.splice(b[$],0,1);y.arraysEqual(S.shape,C)||(S=Ae({inputs:{x:S},backend:t,attrs:{shape:C}}),f.push(S)),m===null?m=S:(m=ia({inputs:{a:S,b:m},backend:t}),f.push(m))}g<c-1&&(l[g]>=0&&(m=Uo({inputs:{x:m},backend:t,attrs:{axis:l[g]-(a.length-d),keepDims:!1}}),f.push(m)),d--)}for(let g of f)g!==m&&t.disposeIntermediateTensorInfo(g);return m}var OI={kernelName:ei,backendName:"cpu",kernelFunc:OW};function PW(r){let{inputs:e,backend:t}=r,{dy:o,y:n}=e;Q([o,n],"eluGrad");let s=new Float32Array(y.sizeFromShape(n.shape)),a=t.data.get(n.dataId).values,i=t.data.get(o.dataId).values;for(let p=0;p<a.length;++p){let l=a[p];l>=0?s[p]=i[p]:s[p]=i[p]*(l+1)}return t.makeTensorInfo(n.shape,"float32",s)}var PI={kernelName:xu,backendName:"cpu",kernelFunc:PW};var MW=I.ERF_P,LW=I.ERF_A1,VW=I.ERF_A2,BW=I.ERF_A3,zW=I.ERF_A4,UW=I.ERF_A5,WW=be(zn,r=>{let e=Math.sign(r),t=Math.abs(r),o=1/(1+MW*t);return e*(1-((((UW*o+zW)*o+BW)*o+VW)*o+LW)*o*Math.exp(-t*t))}),MI={kernelName:zn,backendName:"cpu",kernelFunc:WW};function Jp(r){let{inputs:e,backend:t,attrs:o}=r,{input:n}=e,{dim:s}=o,a=n.shape.length,i=n.shape.slice(),p=s;return s<0&&(y.assert(-(a+1)<=s,()=>`Axis must be in the interval [${-(a+1)}, ${a}]`),p=a+s+1),i.splice(p,0,1),Ae({inputs:{x:n},backend:t,attrs:{shape:i}})}var LI={kernelName:ti,backendName:"cpu",kernelFunc:Jp};var GW=$e((r,e)=>r/e),ql=Oe(Vn,GW),Kl={kernelName:Vn,backendName:"cpu",kernelFunc:ql};function Jd(r,e,t){let o=r.shape,n=o[0],s=o[1],a=t.data.get(r.dataId),i=a.complexTensorInfos.real,p=a.complexTensorInfos.imag,l=[n,s],u=y.sizeFromShape(l),c=y.getTypedArrayFromDType("float32",u),m=y.getTypedArrayFromDType("float32",u);for(let h=0;h<n;h++){let x=Br({inputs:{x:i},backend:t,attrs:{begin:[h,0],size:[1,s]}}),b=Br({inputs:{x:p},backend:t,attrs:{begin:[h,0],size:[1,s]}}),S=kt({inputs:{real:x,imag:b},backend:t}),{real:C,imag:$}=HW(S,e,t),A=I.mergeRealAndImagArrays(C,$);for(let D=0;D<s;D++){let R=I.getComplexWithIndex(A,D);c[h*s+D]=R.real,m[h*s+D]=R.imag}t.disposeIntermediateTensorInfo(x),t.disposeIntermediateTensorInfo(b),t.disposeIntermediateTensorInfo(S)}let d=t.makeTensorInfo(l,"float32",c),f=t.makeTensorInfo(l,"float32",m),g=kt({inputs:{real:d,imag:f},backend:t});return t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),g}function HW(r,e,t){let o=y.sizeFromShape(r.shape),n=t.data.get(r.dataId),s=t.data.get(n.complexTensorInfos.real.dataId).values,a=t.data.get(n.complexTensorInfos.imag.dataId).values;if(qW(o)){let i=dx(s,a,o,e,t),p=[r.shape[0],r.shape[1]];if(e){let l=t.makeTensorInfo(p,"float32",i.real),u=t.makeTensorInfo(p,"float32",i.imag),c=t.makeTensorInfo([],"float32",y.createScalarValue(o,"float32")),m=Ht({inputs:{x:c},backend:t}),d=Kl.kernelFunc({inputs:{a:l,b:c},backend:t}),f=Kl.kernelFunc({inputs:{a:u,b:m},backend:t}),g=t.data.get(d.dataId).values,h=t.data.get(f.dataId).values;return t.disposeIntermediateTensorInfo(l),t.disposeIntermediateTensorInfo(u),t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),{real:g,imag:h}}return i}else{let i=I.mergeRealAndImagArrays(s,a),p=KW(i,o,e);return I.splitRealAndImagArrays(p)}}function qW(r){return(r&r-1)===0}function dx(r,e,t,o,n){if(t===1)return{real:r,imag:e};let s=I.mergeRealAndImagArrays(r,e),a=t/2,i=I.complexWithEvenIndex(s),p=i.real,l=i.imag,u=[p.length],c=n.makeTensorInfo(u,"float32",p),m=n.makeTensorInfo(u,"float32",l),d=kt({inputs:{real:c,imag:m},backend:n}),f=I.complexWithOddIndex(s),g=f.real,h=f.imag,x=[g.length],b=n.makeTensorInfo(x,"float32",g),S=n.makeTensorInfo(x,"float32",h),C=kt({inputs:{real:b,imag:S},backend:n}),$=dx(p,l,a,o,n),A=$.real,D=$.imag,R=[A.length],M=n.makeTensorInfo(R,"float32",A),L=n.makeTensorInfo(R,"float32",D),B=kt({inputs:{real:M,imag:L},backend:n}),W=dx(g,h,a,o,n),G=W.real,q=W.imag,H=[G.length],K=n.makeTensorInfo(H,"float32",G),Z=n.makeTensorInfo(H,"float32",q),X=kt({inputs:{real:K,imag:Z},backend:n}),J=I.exponents(t,o),ae=[J.real.length],Y=n.makeTensorInfo(ae,"float32",J.real),ee=n.makeTensorInfo(ae,"float32",J.imag),ie=kt({inputs:{real:Y,imag:ee},backend:n}),oe=ia({inputs:{a:ie,b:X},backend:n}),ne=_o({inputs:{a:B,b:oe},backend:n}),ce=Pl({inputs:{a:B,b:oe},backend:n}),he=Mr({inputs:{input:ne},backend:n}),Te=Mr({inputs:{input:ce},backend:n}),xe=To({inputs:{input:ne},backend:n}),Ne=To({inputs:{input:ce},backend:n}),Ie=yn({inputs:[he,Te],backend:n,attrs:{axis:0}}),Ge=yn({inputs:[xe,Ne],backend:n,attrs:{axis:0}}),Qe=n.data.get(Ie.dataId).values,Ye=n.data.get(Ge.dataId).values;return n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(b),n.disposeIntermediateTensorInfo(S),n.disposeIntermediateTensorInfo(C),n.disposeIntermediateTensorInfo(M),n.disposeIntermediateTensorInfo(L),n.disposeIntermediateTensorInfo(B),n.disposeIntermediateTensorInfo(K),n.disposeIntermediateTensorInfo(Z),n.disposeIntermediateTensorInfo(X),n.disposeIntermediateTensorInfo(Y),n.disposeIntermediateTensorInfo(ee),n.disposeIntermediateTensorInfo(ie),n.disposeIntermediateTensorInfo(oe),n.disposeIntermediateTensorInfo(ne),n.disposeIntermediateTensorInfo(ce),n.disposeIntermediateTensorInfo(he),n.disposeIntermediateTensorInfo(xe),n.disposeIntermediateTensorInfo(Te),n.disposeIntermediateTensorInfo(Ne),n.disposeIntermediateTensorInfo(Ie),n.disposeIntermediateTensorInfo(Ge),{real:Qe,imag:Ye}}function KW(r,e,t){let o=new Float32Array(e*2);for(let n=0;n<e;n++){let s=0,a=0;for(let i=0;i<e;i++){let p=I.exponent(n*i,e,t),l=I.getComplexWithIndex(r,i);s+=l.real*p.real-l.imag*p.imag,a+=l.real*p.imag+l.imag*p.real}t&&(s/=e,a/=e),I.assignToTypedArray(o,s,a,n)}return o}function jW(r){let{inputs:e,backend:t}=r,{input:o}=e,n=y.sizeFromShape(o.shape),s=o.shape[o.shape.length-1],a=n/s,i=Ae({inputs:{x:o},backend:t,attrs:{shape:[a,s]}}),p=Jd(i,!1,t),l=Ae({inputs:{x:p},backend:t,attrs:{shape:o.shape}});return t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(p),l}var VI={kernelName:ri,backendName:"cpu",kernelFunc:jW};function jl(r){let{backend:e,attrs:t}=r,{shape:o,value:n,dtype:s}=t,a=s||y.inferDtype(n),i=y.getArrayFromDType(a,y.sizeFromShape(o));return XW(i,n,a),e.makeTensorInfo(o,a,i)}var BI={kernelName:oi,backendName:"cpu",kernelFunc:jl};function XW(r,e,t){r.fill(e)}var zI={kernelName:ni,backendName:"cpu",kernelFunc:({inputs:r,attrs:e,backend:t})=>{let{image:o}=r,n=t,s=y.getTypedArrayFromDType(o.dtype,y.sizeFromShape(o.shape)),[a,i,p,l]=o.shape,u=n.data.get(o.dataId).values;for(let m=0;m<a;m++){let d=m*p*i*l;for(let f=0;f<i;f++){let g=f*(p*l);for(let h=0;h<p;h++){let x=h*l;for(let b=0;b<l;b++){let S=Math.round(p-h-1),C=d+g+x+b,$=u[C];if(S>=0&&S<p){let A=S*l,D=d+g+A+b;$=u[D]}s[C]=$}}}}return{dataId:n.write(s,o.shape,o.dtype),shape:o.shape,dtype:o.dtype}}};function QW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,filter:s,bias:a,preluActivationWeights:i}=e,{strides:p,pad:l,dataFormat:u,dilations:c,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=o,g=cx({inputs:{x:n,filter:s},backend:t,attrs:{strides:p,pad:l,dataFormat:u,dilations:c,dimRoundingMode:m}});if(a){let h=g;if(u==="NCHW"&&a.shape.length===1&&a.shape[0]!==1){let x=Ae({inputs:{x:a},backend:t,attrs:{shape:[a.shape[0],1,1]}});g=_o({inputs:{a:g,b:x},backend:t}),t.disposeIntermediateTensorInfo(x)}else g=_o({inputs:{a:g,b:a},backend:t});t.disposeIntermediateTensorInfo(h)}if(d){let h=g;if(u==="NCHW"&&d==="prelu"&&i.shape.length===1&&i.shape[0]!==1){let x=Ae({inputs:{x:i},backend:t,attrs:{shape:[i.shape[0],1,1]}});g=fa(t,g,d,x,f),t.disposeIntermediateTensorInfo(x)}else g=fa(t,g,d,i,f);t.disposeIntermediateTensorInfo(h)}return g}var UI={kernelName:$s,backendName:"cpu",kernelFunc:QW};function YW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,filter:s,bias:a,preluActivationWeights:i}=e,{strides:p,pad:l,dataFormat:u,dilations:c,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=o,g=mx({inputs:{x:n,filter:s},backend:t,attrs:{strides:p,pad:l,dataFormat:u,dilations:c,dimRoundingMode:m}});if(a){let h=g;g=_o({inputs:{a:g,b:a},backend:t}),t.disposeIntermediateTensorInfo(h)}if(d){let h=g;g=fa(t,g,d,i,f),t.disposeIntermediateTensorInfo(h)}return g}var WI={kernelName:As,backendName:"cpu",kernelFunc:YW};function ZW(r){let{inputs:e,backend:t}=r,{params:o,indices:n}=e,s=y.sizeFromShape(o.shape),a=n.shape,i=a[a.length-1],[p,l,u,c]=I.prepareAndValidate(o,n);if(l===0)return t.makeTensorInfo(p,o.dtype,[]);let m=t.data.get(n.dataId).values,d=t.bufferSync(o),f=am(m,d,o.dtype,l,i,u,c,o.shape,s);return t.makeTensorInfo(p,o.dtype,f.values)}var GI={kernelName:ii,backendName:"cpu",kernelFunc:ZW};function JW(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,indices:s}=e,{axis:a,batchDims:i}=o;Q([n,s],"gatherV2");let p=y.parseAxisParam(a,n.shape)[0],l=t.data.get(s.dataId).values,u=n.shape[p];for(let C=0;C<l.length;++C){let $=l[C];y.assert($<=u-1&&$>=0,()=>`GatherV2: the index value ${$} is not in [0, ${u-1}]`)}let c=i;i==null&&(c=0);let m=y.sizeFromShape(s.shape),d=I.segment_util.collectGatherOpShapeInfo(n,s,p,c),f=Ae({inputs:{x:n},backend:t,attrs:{shape:[d.batchSize,d.outerSize,d.dimSize,d.sliceSize]}}),g=Ae({inputs:{x:s},backend:t,attrs:{shape:[d.batchSize,m/d.batchSize]}}),h=[d.batchSize,d.outerSize,m/d.batchSize,d.sliceSize],x=t.bufferSync(g),b=t.bufferSync(f),S=im(b,x,h);return t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(g),t.makeTensorInfo(d.outputShape,S.dtype,S.values)}var HI={kernelName:ai,backendName:"cpu",kernelFunc:JW};function eG(r){let{inputs:e,backend:t}=r,{input:o}=e,n=y.sizeFromShape(o.shape),s=o.shape[o.shape.length-1],a=n/s,i=Ae({inputs:{x:o},backend:t,attrs:{shape:[a,s]}}),p=Jd(i,!0,t),l=Ae({inputs:{x:p},backend:t,attrs:{shape:o.shape}});return t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(p),l}var qI={kernelName:pi,backendName:"cpu",kernelFunc:eG};var tG=be(Xn,r=>Number.isFinite(r)?1:0,"bool"),KI={kernelName:Xn,backendName:"cpu",kernelFunc:tG};var rG=be(Qn,r=>Math.abs(r)===1/0?1:0,"bool"),jI={kernelName:Qn,backendName:"cpu",kernelFunc:rG};var oG=be(Yn,r=>Number.isNaN(r)?1:0,"bool"),XI={kernelName:Yn,backendName:"cpu",kernelFunc:oG};function nG(r){let{backend:e,attrs:t}=r,{start:o,stop:n,num:s}=t,a=pm(o,n,s);return e.makeTensorInfo([a.length],"float32",a)}var QI={kernelName:ci,backendName:"cpu",kernelFunc:nG};var sG=be(ts,r=>Math.log1p(r)),YI={kernelName:ts,backendName:"cpu",kernelFunc:sG};var aG=$e((r,e)=>r&&e),iG=Oe(rs,aG,null,"bool"),ZI={kernelName:rs,backendName:"cpu",kernelFunc:iG};var pG=be(os,r=>r?0:1,"bool"),JI={kernelName:os,backendName:"cpu",kernelFunc:pG};var lG=$e((r,e)=>r||e),uG=Oe(ns,lG,null,"bool"),ek={kernelName:ns,backendName:"cpu",kernelFunc:uG};function cG(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{depthRadius:s,bias:a,alpha:i,beta:p}=o;Q(n,"LRN");let l=n.shape[3],u=l-1,c=t.data.get(n.dataId).values,m=y.sizeFromShape(n.shape),d=new Float32Array(m);function f(g){let h=g%l,x=g-h+Math.max(0,h-s),b=g-h+Math.min(h+s,u),S=0;for(;x<=b;x++){let C=c[x];S+=C*C}return S}for(let g=0;g<m;g++){let h=f(g),x=c[g]*Math.pow(a+i*h,-p);d[g]=x}return t.makeTensorInfo(n.shape,n.dtype,d)}var tk={kernelName:mi,backendName:"cpu",kernelFunc:cG};function mG(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,y:s,dy:a}=e,{depthRadius:i,bias:p,alpha:l,beta:u}=o;Q(a,"LRNGrad");let c=y.sizeFromShape(a.shape),m=a.shape[3],d=t.data.get(a.dataId).values,f=t.data.get(n.dataId).values,g=t.data.get(s.dataId).values,h=new Float32Array(c),x=c;for(let b=0;b<x;b++){let S=b%m,C=b-S+Math.max(0,S-i),$=b-S+Math.min(m,S+i+1),A=0;for(let D=C;D<$;D++)A+=Math.pow(f[D],2);A=l*A+p;for(let D=C;D<$;D++){let R=-2*l*u*f[D]*g[b]/A;b===D&&(R+=Math.pow(A,-u)),R*=d[b],h[D]+=R}}return t.makeTensorInfo(a.shape,n.dtype,h)}var rk={kernelName:yu,backendName:"cpu",kernelFunc:mG};function fx(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{reductionIndices:s,keepDims:a}=o,i=t,p=n.shape,l=p.length,u=y.parseAxisParam(s,p),c=u,m=I.getAxesPermutation(c,l),d=i.data.get(n.dataId).values;if(m!=null){let C=new Array(l);for(let $=0;$<C.length;$++)C[$]=p[m[$]];d=zp(d,p,n.dtype,m,C),c=I.getInnerMostAxes(c.length,l),p=C}Q(n,"max"),I.assertAxesAreInnerMostDims("max",c,l);let[f,g]=I.computeOutAndReduceShapes(p,c),h=y.sizeFromShape(g),x=lm(d,h,f,n.dtype),b=i.write(x,f,n.dtype),S=f;return a&&(S=I.expandShapeToKeepDim(f,u)),{dataId:b,shape:S,dtype:n.dtype}}var ok={kernelName:di,backendName:"cpu",kernelFunc:fx};function dG(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e;Q(n,"maxPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:p}=o,l=1;y.assert(I.eitherStridesOrDilationsAreOne(a,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${l}'`);let u=I.computePool2DInfo(n.shape,s,a,l,i,p),c;if(u.filterWidth===1&&u.filterHeight===1&&y.arraysEqual(u.inShape,u.outShape))c=Ht({inputs:{x:n},backend:t});else{let m=t.data.get(n.dataId).values,d=y.computeStrides(n.shape),f=Zp(m,n.shape,n.dtype,d,u,"max");c=t.makeTensorInfo(u.outShape,n.dtype,f.values)}return c}var nk={kernelName:fi,backendName:"cpu",kernelFunc:dG};function fG(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{filterSize:s,strides:a,pad:i,dimRoundingMode:p,dataFormat:l}=o;Q(n,"maxPool3d");let u=I.computePool3DInfo(n.shape,s,a,1,i,p,l),c=t.data.get(n.dataId).values,m=Zd(c,n.shape,n.dtype,y.computeStrides(n.shape),u,"max");return t.makeTensorInfo(m.shape,"float32",m.values)}var sk={kernelName:hi,backendName:"cpu",kernelFunc:fG};function hG(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,input:s}=e,{filterSize:a,strides:i,pad:p,dimRoundingMode:l}=o;Q([n,s],"maxPool3DGrad");let u=I.computePool3DInfo(s.shape,a,i,1,p,l),c=t.bufferSync(s),m=eI(c,u),d=u.strideDepth,f=u.strideHeight,g=u.strideWidth,h=u.dilationDepth,x=u.dilationHeight,b=u.dilationWidth,S=u.effectiveFilterDepth,C=u.effectiveFilterHeight,$=u.effectiveFilterWidth,A=S-1-u.padInfo.front,D=$-1-u.padInfo.left,R=C-1-u.padInfo.top,M=me(s.shape,"float32"),L=t.bufferSync(n);for(let B=0;B<u.batchSize;++B)for(let W=0;W<u.inChannels;++W)for(let G=0;G<u.inDepth;++G)for(let q=0;q<u.inHeight;++q)for(let H=0;H<u.inWidth;++H){let K=G-A,Z=q-R,X=H-D,J=0;for(let ae=0;ae<S;ae+=h){let Y=(K+ae)/d;if(!(Y<0||Y>=u.outDepth||Math.floor(Y)!==Y))for(let ee=0;ee<C;ee+=x){let ie=(Z+ee)/f;if(!(ie<0||ie>=u.outHeight||Math.floor(ie)!==ie))for(let oe=0;oe<$;oe+=b){let ne=(X+oe)/g;if(ne<0||ne>=u.outWidth||Math.floor(ne)!==ne)continue;let ce=S*C*$-1-m.get(B,Y,ie,ne,W),he=ae*C*$+ee*$+oe,Te=ce===he?1:0;if(Te===0)continue;let xe=L.get(B,Y,ie,ne,W);J+=xe*Te}}}M.set(J,B,G,q,H,W)}return t.makeTensorInfo(M.shape,M.dtype,M.values)}var ak={kernelName:_u,backendName:"cpu",kernelFunc:hG};function gG(r){let{inputs:e,backend:t,attrs:o}=r,{dy:n,input:s,output:a}=e,i=s;Q([s,a],"maxPoolGrad");let{filterSize:p,strides:l,pad:u,dimRoundingMode:c}=o,m=I.computePool2DInfo(i.shape,p,l,1,u,c),d=t.data.get(i.dataId).values,f=me(m.outShape,i.dtype,Yd(d,i.shape,i.dtype,m).values),g=m.strideHeight,h=m.strideWidth,x=m.dilationHeight,b=m.dilationWidth,S=m.effectiveFilterHeight,C=m.effectiveFilterWidth,$=C-1-m.padInfo.left,A=S-1-m.padInfo.top,D=me(i.shape,"float32"),R=t.data.get(n.dataId).values,M=me(n.shape,"float32",R);for(let L=0;L<m.batchSize;++L)for(let B=0;B<m.inChannels;++B)for(let W=0;W<m.inHeight;++W)for(let G=0;G<m.inWidth;++G){let q=W-A,H=G-$,K=0;for(let Z=0;Z<S;Z+=x){let X=(q+Z)/g;if(!(X<0||X>=m.outHeight||Math.floor(X)!==X))for(let J=0;J<C;J+=b){let ae=(H+J)/h;if(ae<0||ae>=m.outWidth||Math.floor(ae)!==ae)continue;let Y=S*C-1-f.get(L,X,ae,B),ee=Z*C+J,ie=Y===ee?1:0;if(ie===0)continue;let oe=M.get(L,X,ae,B);K+=oe*ie}}D.set(K,L,W,G,B)}return t.makeTensorInfo(D.shape,D.dtype,D.values)}var ik={kernelName:bu,backendName:"cpu",kernelFunc:gG};function pk(r,e,t,o,n){let s=y.computeStrides(e),a=Zp(r,e,t,s,n,"max"),i=Yd(r,e,t,n,!0,o);return[a.values,i.values]}var lk={kernelName:gi,backendName:"cpu",kernelFunc:({inputs:r,attrs:e,backend:t})=>{let{x:o}=r,{filterSize:n,strides:s,pad:a,includeBatchInIndex:i}=e,p=t;Q(o,"MaxPoolWithArgmax");let l=p.data.get(o.dataId).values,u=I.computePool2DInfo(o.shape,n,s,[1,1],a),[c,m]=pk(l,o.shape,o.dtype,i,u),d=p.write(c,u.outShape,o.dtype),f=p.write(m,u.outShape,o.dtype);return[{dataId:d,shape:u.outShape,dtype:o.dtype},{dataId:f,shape:u.outShape,dtype:"int32"}]}};function xG(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,keepDims:a}=o,i=y.parseAxisParam(s,n.shape),l=I.computeOutAndReduceShapes(n.shape,i)[1],u=y.sizeFromShape(l),c=[],m=t.makeTensorInfo([],"float32",new Float32Array([u]));c.push(m);let d=Lr({inputs:{x:n},backend:t,attrs:{dtype:"float32"}});c.push(d);let f=ql({inputs:{a:d,b:m},backend:t});c.push(f);let g=Uo({inputs:{x:f},backend:t,attrs:{axis:s,keepDims:a}});return c.forEach(h=>t.disposeIntermediateTensorInfo(h)),g}var uk={kernelName:xi,backendName:"cpu",kernelFunc:xG};function yG(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{axis:s,keepDims:a}=o;Q(n,"min");let i=y.parseAxisParam(s,n.shape),p=i,l=I.getAxesPermutation(p,n.shape.length),u=n;l!=null&&(u=pt({inputs:{x:n},backend:t,attrs:{perm:l}}),p=I.getInnerMostAxes(p.length,n.shape.length)),I.assertAxesAreInnerMostDims("min",p,u.shape.length);let[c,m]=I.computeOutAndReduceShapes(u.shape,p),d=y.sizeFromShape(m),f=y.makeZerosTypedArray(y.sizeFromShape(c),u.dtype),g=t.data.get(u.dataId).values;for(let x=0;x<f.length;++x){let b=x*d,S=g[b];for(let C=0;C<d;++C){let $=g[b+C];(Number.isNaN($)||$<S)&&(S=$)}f[x]=S}l!=null&&t.disposeIntermediateTensorInfo(u);let h=t.makeTensorInfo(c,u.dtype,f);if(a){let x=I.expandShapeToKeepDim(c,i),b=Ae({inputs:{x:h},backend:t,attrs:{shape:x}});return t.disposeIntermediateTensorInfo(h),b}return h}var ck={kernelName:yi,backendName:"cpu",kernelFunc:yG};function bG(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{paddings:s,mode:a}=o;Q(n,"mirrorPad");let i=s.map((S,C)=>S[0]+n.shape[C]+S[1]),p=s.map(S=>S[0]),l=s.map((S,C)=>S[0]+n.shape[C]),u=a==="reflect"?0:1,c=t.data.get(n.dataId).values,m=n.shape.length,d=y.computeStrides(n.shape),f=y.sizeFromShape(i),g=i.length,h=y.computeStrides(i),x=y.getTypedArrayFromDType(n.dtype,f);for(let S=0;S<f;S++){let C=y.indexToLoc(S,g,h);for(let A=0;A<g;A++)C[A]<p[A]?C[A]=p[A]*2-C[A]-u:C[A]>=l[A]&&(C[A]=(l[A]-1)*2-C[A]+u);C=C.map((A,D)=>A-p[D]);let $=y.locToIndex(C,m,d);x[S]=c[$]}return{dataId:t.write(x,i,n.dtype),shape:i,dtype:n.dtype}}var mk={kernelName:bi,backendName:"cpu",kernelFunc:bG};var _G=$e((r,e)=>{let t=r%e;return r<0&&e<0||r>=0&&e>=0?t:(t+e)%e}),vG=Oe(is,_G),dk={kernelName:is,backendName:"cpu",kernelFunc:vG};var hk=Df($h());function hx(r){let{inputs:e,backend:t,attrs:o}=r,{logits:n}=e,{dim:s}=o,a=n.shape.length,i=s;if(i===-1&&(i=a-1),i!==a-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${a} and dim was ${i}`);let p=y.parseAxisParam([i],n.shape),l=fx({inputs:{x:n},backend:t,attrs:{reductionIndices:p,keepDims:!1}}),u=I.expandShapeToKeepDim(l.shape,p),c=Ae({inputs:{x:l},backend:t,attrs:{shape:u}}),m=Pl({inputs:{a:n,b:c},backend:t}),d=fg({inputs:{x:m},backend:t}),f=Uo({inputs:{x:d},backend:t,attrs:{axis:p,keepDims:!1}}),g=Ae({inputs:{x:f},backend:t,attrs:{shape:u}}),h=ql({inputs:{a:d,b:g},backend:t});return t.disposeIntermediateTensorInfo(l),t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(g),h}var fk={kernelName:ji,backendName:"cpu",kernelFunc:hx};function TG(r){let{inputs:e,backend:t,attrs:o}=r,{logits:n}=e,{numSamples:s,seed:a,normalized:i}=o;Q(n,"multinomial");let p=i?n:hx({inputs:{logits:n},backend:t,attrs:{dim:-1}}),l=p.shape[0],u=p.shape[1],c=t.data.get(p.dataId).values,m=[l,s],d=y.makeZerosTypedArray(y.sizeFromShape(m),"int32");for(let f=0;f<l;++f){let g=f*u,h=new Float32Array(u-1);h[0]=c[g];for(let S=1;S<h.length;++S)h[S]=h[S-1]+c[g+S];let x=hk.alea(a.toString()),b=f*s;for(let S=0;S<s;++S){let C=x();d[b+S]=h.length;for(let $=0;$<h.length;$++)if(C<h[$]){d[b+S]=$;break}}}return i||t.disposeIntermediateTensorInfo(p),t.makeTensorInfo(m,"int32",d)}var gk={kernelName:_i,backendName:"cpu",kernelFunc:TG};var wG=Wt.nonMaxSuppressionV3Impl;function CG(r){let{inputs:e,backend:t,attrs:o}=r,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p}=o;Q(n,"NonMaxSuppression");let l=t.data.get(n.dataId).values,u=t.data.get(s.dataId).values,{selectedIndices:c}=wG(l,u,a,i,p);return t.makeTensorInfo([c.length],"int32",new Int32Array(c))}var xk={kernelName:Ti,backendName:"cpu",kernelFunc:CG};var SG=Wt.nonMaxSuppressionV4Impl;function NG(r){let{inputs:e,backend:t,attrs:o}=r,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p,padToMaxOutputSize:l}=o;Q(n,"NonMaxSuppressionPadded");let u=t.data.get(n.dataId).values,c=t.data.get(s.dataId).values,{selectedIndices:m,validOutputs:d}=SG(u,c,a,i,p,l);return[t.makeTensorInfo([m.length],"int32",new Int32Array(m)),t.makeTensorInfo([],"int32",new Int32Array([d]))]}var yk={kernelName:wi,backendName:"cpu",kernelFunc:NG};var IG=Wt.nonMaxSuppressionV5Impl;function kG(r){let{inputs:e,backend:t,attrs:o}=r,{boxes:n,scores:s}=e,{maxOutputSize:a,iouThreshold:i,scoreThreshold:p,softNmsSigma:l}=o;Q(n,"NonMaxSuppressionWithScore");let u=t.data.get(n.dataId).values,c=t.data.get(s.dataId).values,m=a,d=i,f=p,g=l,{selectedIndices:h,selectedScores:x}=IG(u,c,m,d,f,g);return[t.makeTensorInfo([h.length],"int32",new Int32Array(h)),t.makeTensorInfo([x.length],"float32",new Float32Array(x))]}var bk={kernelName:Ci,backendName:"cpu",kernelFunc:kG};function EG(r){let{inputs:e,backend:t,attrs:o}=r,{indices:n}=e,{dtype:s,depth:a,onValue:i,offValue:p}=o;Q(n,"oneHot");let l=y.sizeFromShape(n.shape),u=new Float32Array(l*a);u.fill(p);let c=t.data.get(n.dataId).values;for(let m=0;m<l;++m)c[m]>=0&&c[m]<a&&(u[m*a+c[m]]=i);return t.makeTensorInfo([...n.shape,a],s,u)}var _k={kernelName:Ni,backendName:"cpu",kernelFunc:EG};function Xl(r){let{inputs:e,backend:t}=r,{x:o}=e;if(o.dtype==="string")throw new Error("zerosLike is not supported for string tensors");if(o.dtype==="complex64"){let n=Mr({inputs:{input:o},backend:t}),s=Xl({inputs:{x:n},backend:t}),a=To({inputs:{input:o},backend:t}),i=Xl({inputs:{x:a},backend:t}),p=kt({inputs:{real:s,imag:i},backend:t});return t.disposeIntermediateTensorInfo(n),t.disposeIntermediateTensorInfo(s),t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(i),p}else return jl({backend:t,attrs:{shape:o.shape,value:0,dtype:o.dtype}})}var vk={kernelName:lp,backendName:"cpu",kernelFunc:Xl};function Tk(r){let{inputs:e,backend:t}=r,{x:o}=e;if(o.dtype==="string")throw new Error("onesLike is not supported for string tensors");if(o.dtype==="complex64"){let n=Mr({inputs:{input:o},backend:t}),s=Tk({inputs:{x:n},backend:t}),a=To({inputs:{input:o},backend:t}),i=Xl({inputs:{x:a},backend:t}),p=kt({inputs:{real:s,imag:i},backend:t});return t.disposeIntermediateTensorInfo(n),t.disposeIntermediateTensorInfo(s),t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(i),p}else return jl({backend:t,attrs:{shape:o.shape,value:1,dtype:o.dtype}})}var wk={kernelName:Si,backendName:"cpu",kernelFunc:Tk};function gx(r){let{inputs:e,backend:t,attrs:o}=r,{axis:n}=o;if(e.length===1)return Jp({inputs:{input:e[0]},backend:t,attrs:{dim:n}});let s=e[0].shape,a=e[0].dtype;e.forEach(u=>{y.assertShapesMatch(s,u.shape,"All tensors passed to stack must have matching shapes"),y.assert(a===u.dtype,()=>"All tensors passed to stack must have matching dtypes")});let i=[],p=e.map(u=>{let c=Jp({inputs:{input:u},backend:t,attrs:{dim:n}});return i.push(c),c}),l=yn({inputs:p,backend:t,attrs:{axis:n}});return i.forEach(u=>t.disposeIntermediateTensorInfo(u)),l}var Ck={kernelName:Ii,backendName:"cpu",kernelFunc:gx};function $G(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{paddings:s,constantValue:a}=o;Q(n,"pad");let i=s.map((b,S)=>b[0]+n.shape[S]+b[1]),p=s.map(b=>b[0]),l=t.data.get(n.dataId).values,u=y.sizeFromShape(n.shape),c=n.shape.length,m=y.computeStrides(n.shape),d=y.sizeFromShape(i),f=i.length,g=y.computeStrides(i),h=y.getTypedArrayFromDType(n.dtype,d);a!==0&&h.fill(a);for(let b=0;b<u;b++){let C=y.indexToLoc(b,c,m).map((A,D)=>A+p[D]),$=y.locToIndex(C,f,g);h[$]=l[b]}return{dataId:t.write(h,i,n.dtype),shape:i,dtype:n.dtype}}var ef={kernelName:ki,backendName:"cpu",kernelFunc:$G};var AG=$e((r,e)=>Math.pow(r,e)),FG=Oe(us,AG),Sk={kernelName:us,backendName:"cpu",kernelFunc:FG};function DG(r){let{inputs:e,backend:t,attrs:o}=r,{paramsNestedSplits:n,paramsDenseValues:s,indices:a}=e,{outputRaggedRank:i}=o,p=n.map(x=>t.data.get(x.dataId).values),l=n.map(x=>x.shape),u=t.data.get(s.dataId).values,c=t.data.get(a.dataId).values,[m,d,f]=um(p,l,u,s.shape,s.dtype,c,a.shape,i),g=m.map(x=>t.makeTensorInfo([x.length],"int32",x)),h=t.makeTensorInfo(f,s.dtype,d);return g.concat([h])}var Nk={kernelName:Ai,backendName:"cpu",kernelFunc:DG};function RG(r){let{inputs:e,backend:t}=r,{starts:o,limits:n,deltas:s}=e,a=t.data.get(o.dataId).values,i=t.data.get(n.dataId).values,p=t.data.get(s.dataId).values,[l,u]=cm(a,o.shape,o.dtype,i,n.shape,p,s.shape),c=t.makeTensorInfo([l.length],"int32",l),m=t.makeTensorInfo([u.length],o.dtype,u);return[c,m]}var Ik={kernelName:Fi,backendName:"cpu",kernelFunc:RG};function OG(r){let{inputs:e,backend:t,attrs:o}=r,{shape:n,values:s,defaultValue:a,rowPartitionTensors:i}=e,{rowPartitionTypes:p}=o,l=t.data.get(n.dataId).values,u=t.data.get(s.dataId).values,c=t.data.get(a.dataId).values,m=i.map(h=>t.data.get(h.dataId).values),d=i.map(h=>h.shape),[f,g]=mm(l,n.shape,u,s.shape,s.dtype,c,a.shape,m,d,p);return t.makeTensorInfo(f,s.dtype,g)}var kk={kernelName:Di,backendName:"cpu",kernelFunc:OG};function PG(r){let{backend:e,attrs:t}=r,{start:o,stop:n,dtype:s,step:a}=t,i=dm(o,n,a,s);return e.makeTensorInfo([i.length],s,i)}var Ek={kernelName:Ri,backendName:"cpu",kernelFunc:PG};var MG=be(cs,r=>1/r),$k={kernelName:cs,backendName:"cpu",kernelFunc:MG};function LG(r){let{inputs:e,backend:t,attrs:o}=r,{images:n}=e,{alignCorners:s,halfPixelCenters:a,size:i}=o;Q(n,"resizeBilinear");let p=y.computeStrides(n.shape),[l,u]=i,[c,m,d,f]=n.shape,g=t.data.get(n.dataId).values,h=new Float32Array(y.sizeFromShape([c,l,u,f])),x=[s&&l>1?m-1:m,s&&u>1?d-1:d],b=[s&&l>1?l-1:l,s&&u>1?u-1:u],S=0,C=x[0]/b[0],$=x[1]/b[1];for(let A=0;A<c;A++)for(let D=0;D<l;D++){let R;a?R=C*(D+.5)-.5:R=C*D;let M=Math.max(0,Math.floor(R)),L=R-M,B=Math.min(m-1,Math.ceil(R)),W=A*p[0]+M*p[1],G=A*p[0]+B*p[1];for(let q=0;q<u;q++){let H;a?H=$*(q+.5)-.5:H=$*q;let K=Math.max(0,Math.floor(H)),Z=H-K,X=Math.min(d-1,Math.ceil(H)),J=W+K*p[2],ae=G+K*p[2],Y=W+X*p[2],ee=G+X*p[2];for(let ie=0;ie<f;ie++){let oe=g[J+ie],ne=g[ae+ie],ce=g[Y+ie],he=g[ee+ie],Te=oe+(ce-oe)*Z,xe=ne+(he-ne)*Z,Ne=Te+(xe-Te)*L;h[S++]=Ne}}}return t.makeTensorInfo([c,l,u,f],"float32",h)}var Ak={kernelName:Li,backendName:"cpu",kernelFunc:LG};function VG(r){let{inputs:e,backend:t,attrs:o}=r,{images:n,dy:s}=e,{alignCorners:a}=o;Q([s,n],"resizeBilinearGrad");let i=y.computeStrides(n.shape),[p,l,u,c]=n.shape,[,m,d]=s.shape,f=new Float32Array(p*l*u*c),g=[a&&m>1?l-1:l,a&&d>1?u-1:u],h=[a&&m>1?m-1:m,a&&d>1?d-1:d],x=g[0]/h[0],b=g[1]/h[1],S=t.data.get(s.dataId).values,C=0;for(let $=0;$<p;$++){let A=$*i[0];for(let D=0;D<m;D++){let R=D*x,M=Math.floor(R),L=Math.min(Math.ceil(R),l-1),B=A+M*i[1],W=A+L*i[1],G=R-M,q=1-G;for(let H=0;H<d;H++){let K=H*b,Z=Math.floor(K),X=Math.min(Math.ceil(K),u-1),J=K-Z,ae=1-J,Y=B+Z*i[2],ee=B+X*i[2],ie=W+Z*i[2],oe=W+X*i[2],ne=q*ae,ce=q*J,he=G*ae,Te=G*J;for(let xe=0;xe<c;xe++){let Ne=S[C++];f[Y+xe]+=Ne*ne,f[ee+xe]+=Ne*ce,f[ie+xe]+=Ne*he,f[oe+xe]+=Ne*Te}}}}return t.makeTensorInfo([p,u,l,c],"float32",f)}var Fk={kernelName:Tu,backendName:"cpu",kernelFunc:VG};function BG(r){let{inputs:e,backend:t,attrs:o}=r,{images:n}=e,{alignCorners:s,halfPixelCenters:a,size:i}=o;Q(n,"resizeNearestNeighbor");let p=y.computeStrides(n.shape),[l,u]=i,[c,m,d,f]=n.shape,g=t.data.get(n.dataId).values,h=new Float32Array(c*l*u*f),x=[s&&l>1?m-1:m,s&&u>1?d-1:d],b=[s&&l>1?l-1:l,s&&u>1?u-1:u],S=x[0]/b[0],C=x[1]/b[1],$=0;for(let A=0;A<c;A++){let D=A*p[0];for(let R=0;R<l;R++){let M=a?S*(R+.5):S*R,L=Math.min(m-1,s?Math.round(M):Math.floor(M));a&&(L=Math.max(0,L));let B=D+L*p[1];for(let W=0;W<u;W++){let G=a?C*(W+.5):C*W,q=Math.min(d-1,s?Math.round(G):Math.floor(G));a&&(q=Math.max(0,q));let H=B+q*p[2];for(let K=0;K<f;K++){let Z=g[H+K];h[$++]=Z}}}}return t.makeTensorInfo([c,l,u,f],n.dtype,h)}var Dk={kernelName:Mi,backendName:"cpu",kernelFunc:BG};function zG(r){let{inputs:e,backend:t,attrs:o}=r,{images:n,dy:s}=e,{alignCorners:a}=o;Q([s,n],"resizeNearestNeighborGrad");let i=y.computeStrides(n.shape),p=y.computeStrides(s.shape),[l,u,c,m]=n.shape,[,d,f]=s.shape,g=new Float32Array(l*u*c*m),h=t.data.get(s.dataId).values,x=[a&&d>1?u-1:u,a&&f>1?c-1:c],b=[a&&d>1?d-1:d,a&&f>1?f-1:f],S=x[0]/b[0],C=x[1]/b[1],$=1/S,A=1/C,D=Math.ceil($)*2+2,R=Math.ceil(A)*2+2;for(let M=0;M<l;M++){let L=M*i[0];for(let B=0;B<u;B++){let W=L+B*i[1],G=Math.floor(B*$),q=Math.floor(G-D/2);for(let H=0;H<c;H++){let K=W+H*i[2],Z=Math.floor(H*A),X=Math.floor(Z-R/2);for(let J=0;J<m;J++){let ae=0;for(let Y=0;Y<D;Y++){let ee=Y+q;if(ee<0||ee>=d)continue;let ie=L+ee*p[1],oe=ee*S,ne=Math.min(u-1,a?Math.round(oe):Math.floor(oe));if(B===ne)for(let ce=0;ce<R;ce++){let he=ce+X;if(he<0||he>=f)continue;let Te=ie+he*p[2],xe=he*C,Ne=Math.min(c-1,a?Math.round(xe):Math.floor(xe));H===Ne&&(ae+=h[Te+J])}}g[K+J]=ae}}}}return t.makeTensorInfo(n.shape,n.dtype,g)}var Rk={kernelName:vu,backendName:"cpu",kernelFunc:zG};function UG(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{dims:s}=o;Q(n,"reverse");let a=n.shape.length,i=y.parseAxisParam(s,n.shape);if(a===0)return Ht({inputs:{x:n},backend:t});let p=new Le(n.shape,n.dtype),l=t.bufferSync(n);for(let u=0;u<p.size;u++){let c=p.indexToLoc(u),m=c.slice();i.forEach(d=>m[d]=n.shape[d]-1-m[d]),p.set(l.get(...m),...c)}return t.makeTensorInfo(p.shape,p.dtype,p.values)}var Ok={kernelName:Vi,backendName:"cpu",kernelFunc:UG};var Pk={kernelName:up,backendName:"cpu",kernelFunc:({inputs:r,attrs:e,backend:t})=>{let{image:o}=r,{radians:n,fillValue:s,center:a}=e,i=t,p=y.getTypedArrayFromDType(o.dtype,y.sizeFromShape(o.shape)),[l,u,c,m]=o.shape,[d,f]=I.getImageCenter(a,u,c),g=255,h=Math.sin(n),x=Math.cos(n),b=i.data.get(o.dataId).values;for(let C=0;C<l;C++){let $=C*c*u*m;for(let A=0;A<u;A++){let D=A*(c*m);for(let R=0;R<c;R++){let M=R*m;for(let L=0;L<m;L++){let B=[l,A,R,L],W=B[2],G=B[1],q=(W-d)*x-(G-f)*h,H=(W-d)*h+(G-f)*x;q=Math.round(q+d),H=Math.round(H+f);let K=s;if(typeof s!="number"&&(L===3?K=g:K=s[L]),q>=0&&q<c&&H>=0&&H<u){let X=H*(c*m),J=q*m,ae=$+X+J+L;K=b[ae]}let Z=$+D+M+L;p[Z]=K}}}}return{dataId:i.write(p,o.shape,o.dtype),shape:o.shape,dtype:o.dtype}}};var WG=be(fs,r=>{let e=Math.floor(r);return r-e<.5?Math.floor(r):r-e>.5?Math.ceil(r):e%2===0?e:e+1}),Mk={kernelName:fs,backendName:"cpu",kernelFunc:WG};function GG(r){let{inputs:e,backend:t,attrs:o}=r,{indices:n,updates:s}=e,{shape:a}=o,{sliceRank:i,numUpdates:p,sliceSize:l,strides:u,outputSize:c}=I.calculateShapes(s,n,a),m=!0,d=t.bufferSync(n),f=t.bufferSync(s),g=Xr(d,f,a,c,l,p,i,u,0,m);return t.makeTensorInfo(a,g.dtype,g.values)}var Lk={kernelName:Bi,backendName:"cpu",kernelFunc:GG};function HG(r,e){let t=0,o=r.length,n=0;for(;t<o;)n=Math.floor((t+o)/2),r[n]<e?t=n+1:o=n;return o}function qG(r,e){let t=0,o=r.length,n=0;for(;t<o;)n=Math.floor((t+o)/2),r[n]<=e?t=n+1:o=n;return o}function Vk(r,e,t,o,n,s){let a=y.getArrayFromDType("int32",t*n);for(let i=0;i<t;++i){let p=r.slice(i*o,(i+1)*o),l=i*n;for(let u=0;u<n;++u)a[l+u]=s==="left"?HG(p,e[u+l]):qG(p,e[u+l])}return a}function KG(r){let{inputs:e,backend:t,attrs:o}=r,{sortedSequence:n,values:s}=e,{side:a}=o,i=t.data.get(n.dataId).values,p=t.data.get(s.dataId).values,l=Vk(i,p,n.shape[0],n.shape[1],s.shape[1],a);return t.makeTensorInfo(s.shape,"int32",l)}var Bk={kernelName:Ui,backendName:"cpu",kernelFunc:KG};function jG(r){let{inputs:e,backend:t}=r,{condition:o,t:n,e:s}=e;Q([o,n,s],"select");let a=o.shape.length,i=t.data.get(o.dataId).values,p=t.data.get(n.dataId).values,l=t.data.get(s.dataId).values,u=bt(n.dtype,s.dtype),c=y.makeZerosTypedArray(y.sizeFromShape(n.shape),u),m=0,d=a===0||a>1||n.shape.length===1?1:y.sizeFromShape(n.shape.slice(1));for(let f=0;f<i.length;f++)for(let g=0;g<d;g++)i[f]===1?c[m++]=p[f]:c[m++]=l[f];return t.makeTensorInfo(n.shape,u,c)}var zk={kernelName:Wi,backendName:"cpu",kernelFunc:jG};var XG=I.SELU_SCALEALPHA,QG=I.SELU_SCALE,YG=be(gs,r=>r>=0?QG*r:XG*(Math.exp(r)-1)),Uk={kernelName:gs,backendName:"cpu",kernelFunc:YG};var ZG=be(bs,r=>r<0?-1:r>0?1:0),Wk={kernelName:bs,backendName:"cpu",kernelFunc:ZG};var JG=be(xs,r=>Math.sin(r)),Gk={kernelName:xs,backendName:"cpu",kernelFunc:JG};var e6=be(ys,r=>Math.sinh(r)),Hk={kernelName:ys,backendName:"cpu",kernelFunc:e6};var t6=11920928955078125e-23,qk=Math.log(t6)+2,r6=be(vs,r=>{let e=r>-qk,t=r<qk,o=Math.exp(r),n;return t?n=o:e?n=r:n=Math.log(1+o),n}),Kk={kernelName:vs,backendName:"cpu",kernelFunc:r6};function o6(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{blockShape:s,paddings:a}=o;Q([n],"spaceToBatchND");let i=y.sizeFromShape(s),p=[[0,0]];p.push(...a);for(let A=1+s.length;A<n.shape.length;++A)p.push([0,0]);let l=ef.kernelFunc({inputs:{x:n},backend:t,attrs:{paddings:p,constantValue:0}}),u=I.getReshaped(l.shape,s,i,!1),c=I.getPermuted(u.length,s.length,!1),m=I.getReshapedPermuted(l.shape,s,i,!1),g=Ae({inputs:{x:l},backend:t,attrs:{shape:u}}),b=pt({inputs:{x:g},backend:t,attrs:{perm:c}}),$=Ae({inputs:{x:b},backend:t,attrs:{shape:m}});return t.disposeIntermediateTensorInfo(l),t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(b),$}var jk={kernelName:qi,backendName:"cpu",kernelFunc:o6};function n6(r){let{inputs:e,backend:t}=r,{indices:o,values:n,denseShape:s,defaultValue:a}=e;if(s.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
        ${s.shape}`);if(o.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
        ${o.shape}`);if(n.shape.length!==1)throw new Error(`Values must be a vector, saw:
        ${n.shape}`);if(a.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${a.shape}`);let i=t.data.get(o.dataId).values,p=t.data.get(n.dataId).values,l=t.data.get(s.dataId).values,u=t.data.get(a.dataId).values[0],[c,m,d,f,g]=fm(i,o.shape,o.dtype,p,n.dtype,l,u);return[t.makeTensorInfo(m,o.dtype,c),t.makeTensorInfo([m[0]],n.dtype,d),t.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(h=>Number(h)))),t.makeTensorInfo([g.length],o.dtype,new Int32Array(g))]}var Xk={kernelName:Xi,backendName:"cpu",kernelFunc:n6};function s6(r){let{inputs:e,backend:t}=r,{inputIndices:o,inputShape:n,newShape:s}=e;if(o.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape
        ${o.shape}`);if(n.shape.length!==1)throw new Error(`Input shape should be a vector but received shape
        ${n.shape}`);if(s.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${s.shape}`);let a=Array.from(t.data.get(n.dataId).values),i=t.data.get(o.dataId).values,p=Array.from(t.data.get(s.dataId).values),[l,u,c]=hm(i,o.shape,o.dtype,a,p);return[t.makeTensorInfo(u,o.dtype,l),t.makeTensorInfo([c.length],s.dtype,new Int32Array(c))]}var Qk={kernelName:Qi,backendName:"cpu",kernelFunc:s6};function a6(r){let{inputs:e,backend:t}=r,{data:o,indices:n,segmentIds:s}=e;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
          ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
          ${s.shape}`);if(n.shape[0]!==s.shape[0])throw new Error("segmentIds and indices should have same size.");let a=t.data.get(o.dataId).values,i=t.data.get(n.dataId).values,p=t.data.get(s.dataId).values,[l,u]=Up(a,o.shape,o.dtype,i,p,!0);return t.makeTensorInfo(u,o.dtype,l)}var Yk={kernelName:Yi,backendName:"cpu",kernelFunc:a6};function i6(r){let{inputs:e,backend:t}=r,{data:o,indices:n,segmentIds:s}=e;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
         ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
         ${s.shape}`);if(n.shape[0]!==s.shape[0])throw new Error("segmentIds and indices should have same size.");let a=t.data.get(o.dataId).values,i=t.data.get(n.dataId).values,p=t.data.get(s.dataId).values,[l,u]=Up(a,o.shape,o.dtype,i,p);return t.makeTensorInfo(u,o.dtype,l)}var Zk={kernelName:Zi,backendName:"cpu",kernelFunc:i6};function p6(r){let{inputs:e,backend:t,attrs:o}=r,{sparseIndices:n,sparseValues:s,defaultValue:a}=e,{outputShape:i}=o,{sliceRank:p,numUpdates:l,sliceSize:u,strides:c,outputSize:m}=I.calculateShapes(s,n,i),d=!1,f=t.bufferSync(n),g;switch(s.dtype){case"bool":{let h=t.bufferSync(s),x=!!t.data.get(a.dataId).values[0];g=Xr(f,h,i,m,u,l,p,c,x,d);break}case"float32":{let h=t.bufferSync(s),x=t.data.get(a.dataId).values[0];g=Xr(f,h,i,m,u,l,p,c,x,d);break}case"int32":{let h=t.bufferSync(s),x=t.data.get(a.dataId).values[0];g=Xr(f,h,i,m,u,l,p,c,x,d);break}case"string":{let h=t.bufferSync(s),x=y.decodeString(t.data.get(a.dataId).values[0]);g=Xr(f,h,i,m,u,l,p,c,x,d);break}default:throw new Error(`Unsupported type ${s.dtype}`)}return t.makeTensorInfo(i,g.dtype,g.values)}var Jk={kernelName:Ji,backendName:"cpu",kernelFunc:p6};function l6(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{numOrSizeSplits:s,axis:a}=o,i=y.parseAxisParam(a,n.shape)[0],p=I.prepareSplitSize(n,s,i),l=new Array(n.shape.length).fill(0),u=n.shape.slice();return p.map(c=>{let m=[...u];m[i]=c;let d=Br({inputs:{x:n},backend:t,attrs:{begin:l,size:m}});return l[i]+=c,d})}var eE={kernelName:Ki,backendName:"cpu",kernelFunc:l6};var tE={kernelName:wu,backendName:"cpu",kernelFunc:({inputs:r,backend:e})=>{let{x:t}=r,o=e;Q(t,"square");let n=o.data.get(t.dataId).values,s=new Float32Array(n.length);for(let i=0;i<n.length;++i){let p=n[i];s[i]=p*p}return{dataId:o.write(s,t.shape,t.dtype),shape:t.shape,dtype:t.dtype}}};var u6=be(ks,(r,e)=>{let t=e;return isNaN(r)?NaN:r>0?1:t.alpha}),rE={kernelName:ks,backendName:"cpu",kernelFunc:u6};function c6(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{begin:s,end:a,strides:i,beginMask:p,endMask:l,ellipsisMask:u,newAxisMask:c,shrinkAxisMask:m}=o;Q(n,"stridedSlice");let{finalShapeSparse:d,finalShape:f,isIdentity:g,sliceDim0:h,isSimpleSlice:x,begin:b,end:S,strides:C}=$t.sliceInfo(n.shape,s,a,i,p,l,u,c,m),$;if(g)$=Ae({inputs:{x:n},backend:t,attrs:{shape:f}});else if(h||x){y.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let A=$t.computeOutShape(b,S,C),D=Br({inputs:{x:n},backend:t,attrs:{begin:b,size:A}});$=Ae({inputs:{x:D},backend:t,attrs:{shape:f}}),t.disposeIntermediateTensorInfo(D)}else{let A=t.bufferSync(n),D=gm(d,A,C,b);$=t.makeTensorInfo(f,D.dtype,D.values)}return $}var oE={kernelName:ep,backendName:"cpu",kernelFunc:c6};function m6(r){let{inputs:e,backend:t,attrs:o}=r,{separator:n,nGramWidths:s,leftPad:a,rightPad:i,padWidth:p,preserveShortSequences:l}=o,{data:u,dataSplits:c}=e,m=t.data.get(u.dataId).values,d=t.data.get(c.dataId).values,[f,g]=xm(m,d,n,s,a,i,p,l);return[t.makeTensorInfo([f.length],"string",f),t.makeTensorInfo(c.shape,"int32",g)]}var nE={kernelName:tp,backendName:"cpu",kernelFunc:m6};function d6(r){let{inputs:e,backend:t,attrs:o}=r,{skipEmpty:n}=o,{input:s,delimiter:a}=e;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(s.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${s.shape}`);if(a.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${a.shape}`);let i=t.data.get(s.dataId).values,p=t.data.get(a.dataId).values[0],[l,u,c]=ym(i,p,n),m=u.length;return[t.makeTensorInfo([m,2],"int32",l),t.makeTensorInfo([m],"string",u),t.makeTensorInfo([2],"int32",new Int32Array(c))]}var sE={kernelName:rp,backendName:"cpu",kernelFunc:d6};function f6(r){let{inputs:e,backend:t,attrs:o}=r,{numBuckets:n}=o,{input:s}=e;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(n<=0)throw new Error("Number of buckets must be at least 1");let a=t.data.get(s.dataId).values,i=bm(a,n);return t.makeTensorInfo(s.shape,"int32",i)}var aE={kernelName:op,backendName:"cpu",kernelFunc:f6};var h6=be(Ns,r=>Math.tan(r)),iE={kernelName:Ns,backendName:"cpu",kernelFunc:h6};var g6=be(Is,r=>Math.tanh(r)),pE={kernelName:Is,backendName:"cpu",kernelFunc:g6};function x6(r){let{inputs:e,backend:t}=r,{tensor:o,indices:n,updates:s}=e,{sliceRank:a,numUpdates:i,sliceSize:p,strides:l,outputSize:u}=I.calculateShapes(s,n,o.shape),c=!1,m=t.bufferSync(n),d=t.bufferSync(s),f=t.bufferSync(o),g=Xr(m,d,o.shape,u,p,i,a,l,f,c);return t.makeTensorInfo(o.shape,g.dtype,g.values)}var lE={kernelName:zi,backendName:"cpu",kernelFunc:x6};function y6(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{reps:s}=o;Q(n,"tile");let a=_m(t.bufferSync(n),s);return t.makeTensorInfo(a.shape,a.dtype,a.values)}var uE={kernelName:Xo,backendName:"cpu",kernelFunc:y6};function b6(r){let{inputs:e,backend:t,attrs:o}=r,{x:n}=e,{k:s,sorted:a}=o;Q(n,"topk");let i=t.data.get(n.dataId).values,[p,l]=vm(i,n.shape,n.dtype,s,a);return[t.makeTensorInfo(p.shape,p.dtype,p.values),t.makeTensorInfo(l.shape,l.dtype,l.values)]}var cE={kernelName:np,backendName:"cpu",kernelFunc:b6};function _6(r){let{inputs:e,attrs:t,backend:o}=r,{image:n,transforms:s}=e,{interpolation:a,fillMode:i,fillValue:p,outputShape:l}=t,[u,c,m,d]=n.shape,[f,g]=l??[c,m],h=[u,f,g,d],x=y.computeStrides(n.shape),b=x[0],S=x[1],C=x[2],$=y.computeStrides(h),A=$[0],D=$[1],R=$[2],M=y.getTypedArrayFromDType(n.dtype,y.sizeFromShape(h));M.fill(p);let L=o.data.get(n.dataId).values,B=o.data.get(s.dataId).values;for(let G=0;G<u;++G){let q=s.shape[0]===1?B:B.subarray(G*8,G*8+8);for(let H=0;H<f;++H)for(let K=0;K<g;++K)for(let Z=0;Z<d;++Z){let X,J=q[6]*K+q[7]*H+1;if(J===0)continue;let ae=(q[0]*K+q[1]*H+q[2])/J,Y=(q[3]*K+q[4]*H+q[5])/J,ee=mE(ae,m,i),ie=mE(Y,c,i);switch(a){case"nearest":X=S6(L,c,m,b,S,C,G,ie,ee,Z,p);break;case"bilinear":X=N6(L,c,m,b,S,C,G,ie,ee,Z,p);break;default:throw new Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${a}`)}let oe=G*A+H*D+K*R+Z;M[oe]=X}return o.makeTensorInfo(h,n.dtype,M)}return{dataId:o.write(M,h,n.dtype),shape:n.shape,dtype:n.dtype}}var dE={kernelName:sp,backendName:"cpu",kernelFunc:_6};function mE(r,e,t){switch(t){case"reflect":return v6(r,e);case"wrap":return T6(r,e);case"nearest":return C6(r,e);case"constant":default:return w6(r,e)}}function v6(r,e){let t=r;if(t<0)if(e<=1)t=0;else{let o=2*e;t<o&&(t=o*Math.trunc(-t/o)+t),t=t<-e?t+o:-t-1}else if(t>e-1)if(e<=1)t=0;else{let o=2*e;t-=o*Math.trunc(t/o),t>=e&&(t=o-t-1)}return y.clamp(0,t,e-1)}function T6(r,e){let t=r;if(t<0)if(e<=1)t=0;else{let o=e-1;t+=e*(Math.trunc(-t/o)+1)}else if(t>e-1)if(e<=1)t=0;else{let o=e-1;t-=e*Math.trunc(t/o)}return y.clamp(0,t,e-1)}function w6(r,e){return r}function C6(r,e){return y.clamp(0,r,e-1)}function Ql(r,e,t,o,n,s,a,i,p,l,u){let c=a*o+i*n+p*s+l;return 0<=i&&i<e&&0<=p&&p<t?r[c]:u}function S6(r,e,t,o,n,s,a,i,p,l,u){let c=Math.round(i),m=Math.round(p);return Ql(r,e,t,o,n,s,a,c,m,l,u)}function N6(r,e,t,o,n,s,a,i,p,l,u){let c=Math.floor(i),m=Math.floor(p),d=c+1,f=m+1,g=(f-p)*Ql(r,e,t,o,n,s,a,c,m,l,u)+(p-m)*Ql(r,e,t,o,n,s,a,c,f,l,u),h=(f-p)*Ql(r,e,t,o,n,s,a,d,m,l,u)+(p-m)*Ql(r,e,t,o,n,s,a,d,f,l,u);return(d-i)*g+(i-c)*h}function I6(r){let{inputs:e,attrs:t,backend:o}=r,{axis:n}=t,{x:s}=e;Q(s,"unique");let a=o.data.get(s.dataId).values,{outputValues:i,outputShape:p,indices:l}=Tm(a,n,s.shape,s.dtype);return[o.makeTensorInfo(p,s.dtype,i),o.makeTensorInfo([l.length],"int32",l)]}var fE={kernelName:ap,backendName:"cpu",kernelFunc:I6};function k6(r){let{inputs:e,backend:t,attrs:o}=r,{value:n}=e,{axis:s}=o;s<0&&(s+=n.shape.length);let a=n.shape.length,i=n.shape[s],p=new Array(a-1),l=0;for(let d=0;d<a;d++)d!==s&&(p[l++]=n.shape[d]);let u=new Array(a).fill(0),c=n.shape.slice();c[s]=1;let m=new Array(i);for(let d=0;d<m.length;d++){u[s]=d;let f=Br({inputs:{x:n},backend:t,attrs:{begin:u,size:c}});m[d]=Ae({inputs:{x:f},backend:t,attrs:{shape:p}}),t.disposeIntermediateTensorInfo(f)}return m}var hE={kernelName:ip,backendName:"cpu",kernelFunc:k6};function E6(r){let{inputs:e,backend:t,attrs:o}=r,{x:n,segmentIds:s}=e,{numSegments:a}=o;Q(n,"unsortedSegmentSum");let i=n.shape.length,p=s.shape.length,l=[],u=[],c=i-p,m=s;for(let f=0;f<c;++f){let g=Jp({inputs:{input:m},backend:t,attrs:{dim:f+1}});m=g,u.push(g)}for(let f=0;f<a;++f){let g=y.createScalarValue(f,"int32"),h=t.makeTensorInfo([],"int32",g),x=mg({inputs:{a:h,b:m},backend:t}),b=Lr({inputs:{x},backend:t,attrs:{dtype:"float32"}}),S=ia({inputs:{a:b,b:n},backend:t}),C=Uo({inputs:{x:S},backend:t,attrs:{axis:0,keepDims:!1}});l.push(C),u.push(h),u.push(x),u.push(b),u.push(S),u.push(C)}let d=gx({inputs:l,backend:t,attrs:{axis:0}});return u.forEach(f=>t.disposeIntermediateTensorInfo(f)),d}var gE={kernelName:pp,backendName:"cpu",kernelFunc:E6};var $6=[z2,d0,U2,W2,y0,G2,H2,q2,K2,j2,X2,Q2,Y2,Z2,J2,tI,rI,oI,nI,B2,sI,aI,iI,b0,pI,x0,_0,lI,f0,uI,mI,dI,fI,hI,gI,xI,yI,bI,_I,vI,TI,wI,CI,SI,NI,II,kI,EI,$I,AI,FI,DI,OI,R2,PI,v0,MI,T0,LI,w0,VI,BI,zI,C0,S0,UI,WI,GI,HI,N0,I0,h0,qI,cI,KI,jI,XI,O2,k0,E0,QI,$0,YI,ZI,JI,ek,tk,rk,ok,A0,nk,sk,ak,ik,lk,uk,ck,F0,mk,dk,gk,D0,R0,xk,yk,bk,O0,_k,wk,Ck,ef,Sk,P2,M0,Nk,Ik,kk,Ek,g0,Kl,$k,M2,L2,V2,Ak,Fk,Dk,Rk,Ok,Pk,Mk,U0,Lk,Bk,zk,Uk,G0,Wk,Gk,Hk,H0,fk,Kk,jk,Xk,Qk,Yk,Zk,Jk,eE,K0,tE,j0,X0,rE,oE,nE,sE,aE,Q0,RI,iE,pE,lE,uE,cE,dE,P0,fE,hE,gE,vk];for(let r of $6)Su(r);var A6=P();A6.registerFlag("KEEP_INTERMEDIATE_TENSORS",()=>!1,r=>{r&&console.warn("Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.")});var mr;(function(r){r[r.DT_INVALID=0]="DT_INVALID",r[r.DT_FLOAT=1]="DT_FLOAT",r[r.DT_DOUBLE=2]="DT_DOUBLE",r[r.DT_INT32=3]="DT_INT32",r[r.DT_UINT8=4]="DT_UINT8",r[r.DT_INT16=5]="DT_INT16",r[r.DT_INT8=6]="DT_INT8",r[r.DT_STRING=7]="DT_STRING",r[r.DT_COMPLEX64=8]="DT_COMPLEX64",r[r.DT_INT64=9]="DT_INT64",r[r.DT_BOOL=10]="DT_BOOL",r[r.DT_QINT8=11]="DT_QINT8",r[r.DT_QUINT8=12]="DT_QUINT8",r[r.DT_QINT32=13]="DT_QINT32",r[r.DT_BFLOAT16=14]="DT_BFLOAT16",r[r.DT_QINT16=15]="DT_QINT16",r[r.DT_QUINT16=16]="DT_QUINT16",r[r.DT_UINT16=17]="DT_UINT16",r[r.DT_COMPLEX128=18]="DT_COMPLEX128",r[r.DT_HALF=19]="DT_HALF",r[r.DT_RESOURCE=20]="DT_RESOURCE",r[r.DT_VARIANT=21]="DT_VARIANT",r[r.DT_UINT32=22]="DT_UINT32",r[r.DT_UINT64=23]="DT_UINT64",r[r.DT_FLOAT_REF=101]="DT_FLOAT_REF",r[r.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",r[r.DT_INT32_REF=103]="DT_INT32_REF",r[r.DT_UINT8_REF=104]="DT_UINT8_REF",r[r.DT_INT16_REF=105]="DT_INT16_REF",r[r.DT_INT8_REF=106]="DT_INT8_REF",r[r.DT_STRING_REF=107]="DT_STRING_REF",r[r.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",r[r.DT_INT64_REF=109]="DT_INT64_REF",r[r.DT_BOOL_REF=110]="DT_BOOL_REF",r[r.DT_QINT8_REF=111]="DT_QINT8_REF",r[r.DT_QUINT8_REF=112]="DT_QUINT8_REF",r[r.DT_QINT32_REF=113]="DT_QINT32_REF",r[r.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF",r[r.DT_QINT16_REF=115]="DT_QINT16_REF",r[r.DT_QUINT16_REF=116]="DT_QUINT16_REF",r[r.DT_UINT16_REF=117]="DT_UINT16_REF",r[r.DT_COMPLEX128_REF=118]="DT_COMPLEX128_REF",r[r.DT_HALF_REF=119]="DT_HALF_REF",r[r.DT_RESOURCE_REF=120]="DT_RESOURCE_REF",r[r.DT_VARIANT_REF=121]="DT_VARIANT_REF",r[r.DT_UINT32_REF=122]="DT_UINT32_REF",r[r.DT_UINT64_REF=123]="DT_UINT64_REF"})(mr||(mr={}));var xE;(function(r){let e;(function(t){t[t.LEGACY=0]="LEGACY",t[t.V1=1]="V1",t[t.V2=2]="V2"})(e=r.CheckpointFormatVersion||(r.CheckpointFormatVersion={}))})(xE||(xE={}));var D6={};function tf(r){return D6[r]}function _(r,e,t,o,n){let s=e.inputParams[r];if(s&&s.inputIndexStart!==void 0){let i=s.inputIndexStart,p=s.inputIndexEnd===0?void 0:s.inputIndexEnd===void 0?i+1:s.inputIndexEnd,l=i<0?e.inputNames.length+i:i;if(s.type==="tensor")return vt(e.inputNames[l],t,o,n);if(s.type==="tensors"){let m=e.inputs.slice(i,p);return e.inputNames.slice(i,p).filter((f,g)=>{var h;return((h=m[g])===null||h===void 0?void 0:h.op)!=="NoOp"}).map(f=>vt(f,t,o,n))}let u=vt(e.inputNames[l],t,o,n),c=u.dataSync();return s.type==="number"?c[0]:y.toNestedArray(u.shape,c)}let a=e.attrParams[r];return a&&a.value}function vt(r,e,t,o){let[n,s]=er(r,t);if(o!=null){let i=o.getHashTableHandleByName(n);if(i!=null)return i}let a=t.currentContextIds.find(i=>!!e[rf(n,i)]);return a!==void 0?e[rf(n,a)][s]:void 0}function xx(r,e,t){return e[rf(r,t.currentContextId)]}function Zr(r,e){let[t,o,n]=er(r,e);return[rf(t,e&&e.currentContextId),o,n]}function rf(r,e){return e?`${r}-${e}`:r}function er(r,e){if(r==="")return["",0,void 0];let t=e!=null&&e.parseNodeNameCache!=null;if(t){let s=e.parseNodeNameCache.get(r);if(s!=null)return s}let o=r.split(":"),n;if(o.length===1)n=[r,0,void 0];else{let s=o[0],a=o.length===3?o[1]:void 0,i=Number(o[o.length-1]);n=[s,i,a]}return t&&e.parseNodeNameCache.set(r,n),n}function Yl(r,e,t){let o=_("pad",r,e,t);if(o==="explicit"){o=_("explicitPaddings",r,e,t);let n=[[0,0],[0,0],[0,0],[0,0]];for(let s=0;s<4;s++)n[s][0]=o[s*2],n[s][1]=o[s*2+1];return n}return o}function Jr(r){return r.kept?r:xr(r)}var yx={};je(yx,{json:()=>R6});var R6=[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var bx={};je(bx,{json:()=>O6});var O6=[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsFinite",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsInf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var _x={};je(_x,{json:()=>P6});var P6=[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}];var vx={};je(vx,{json:()=>M6});var M6=[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}];var Tx={};je(Tx,{json:()=>L6});var L6=[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniformInt",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number"},{tfName:"maxval",name:"maxval",type:"number"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}];var wx={};je(wx,{json:()=>V6});var V6=[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var Cx={};je(Cx,{json:()=>B6});var B6=[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}];var Sx={};je(Sx,{json:()=>z6});var z6=[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}];var Nx={};je(Nx,{json:()=>U6});var U6=[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"InitializeTable",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]},{tfOpName:"InitializeTableV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]}];var Ix={};je(Ix,{json:()=>W6});var W6=[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}];var kx={};je(kx,{json:()=>G6});var G6=[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BitwiseAnd",category:"logical",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}]}];var Ex={};je(Ex,{json:()=>H6});var H6=[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"MatrixBandPart",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"numLower",type:"tensor"},{start:1,name:"numUpper",type:"tensor"}]}];var $x={};je($x,{json:()=>q6});var q6=[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]}];var Ax={};je(Ax,{json:()=>K6});var K6=[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}];var Fx={};je(Fx,{json:()=>j6});var j6=[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]},{tfOpName:"TensorScatterUpdate",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"values",type:"tensor"}]}];var Dx={};je(Dx,{json:()=>X6});var X6=[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}];var Rx={};je(Rx,{json:()=>Q6});var Q6=[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}];var Ox={};je(Ox,{json:()=>Y6});var Y6=[{tfOpName:"StaticRegexReplace",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"pattern",name:"pattern",type:"string"},{tfName:"rewrite",name:"rewrite",type:"string"},{tfName:"replace_global",name:"replaceGlobal",type:"bool"}]},{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}];var Px={};je(Px,{json:()=>Z6});var Z6=[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"EnsureShape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}];var Zl=class{static get Instance(){return this._instance||(this._instance=new this)}constructor(){let e=[yx,bx,_x,vx,Tx,wx,Cx,Sx,Nx,Ix,kx,Ex,$x,Ax,Fx,Dx,Rx,Ox,Px],t=[].concat(...e.map(o=>o.json));this.opMappers=t.reduce((o,n)=>(o[n.tfOpName]=n,o),{})}transformGraph(e,t={}){let o=e.node,n=[],s=[],a=[],i=o.reduce((g,h)=>(g[h.name]=this.mapNode(h),h.op.startsWith("Placeholder")?n.push(g[h.name]):h.op==="Const"?s.push(g[h.name]):(h.input==null||h.input.length===0)&&a.push(g[h.name]),g),{}),p=[],l=[],u={},c={};t!=null&&(u=this.mapSignatureEntries(t.inputs),c=this.mapSignatureEntries(t.outputs));let m=Object.keys(i);m.forEach(g=>{let h=i[g];h.inputNames.forEach((x,b)=>{let[S,,C]=Zr(x),$=i[S];if($.outputs!=null){let A=$.outputs.indexOf(C);if(A!==-1){let D=`${S}:${A}`;h.inputNames[b]=D}}h.inputs.push($),$.children.push(h)})}),Object.keys(c).length===0?m.forEach(g=>{let h=i[g];h.children.length===0&&l.push(h)}):Object.keys(c).forEach(g=>{let[h]=Zr(g),x=i[h];x!=null&&(x.signatureKey=c[g],l.push(x))}),Object.keys(u).length>0?Object.keys(u).forEach(g=>{let[h]=Zr(g),x=i[h];x&&(x.signatureKey=u[g],p.push(x))}):p=n;let d={};e.library!=null&&e.library.function!=null&&(d=e.library.function.reduce((g,h)=>(g[h.signature.name]=this.mapFunction(h),g),{}));let f={nodes:i,inputs:p,outputs:l,weights:s,placeholders:n,signature:t,functions:d};return a.length>0&&(f.initNodes=a),f}mapSignatureEntries(e){return Object.keys(e||{}).reduce((t,o)=>(t[e[o].name]=o,t),{})}mapNode(e){let t=tf(e.op)||this.opMappers[e.op]||{};e.attr==null&&(e.attr={});let o={name:e.name,op:e.op,category:t.category,inputNames:(e.input||[]).map(n=>n.startsWith("^")?n.slice(1):n),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:e.attr,outputs:t.outputs};return t.inputs!=null&&(o.inputParams=t.inputs.reduce((n,s)=>(n[s.name]={type:s.type,inputIndexStart:s.start,inputIndexEnd:s.end},n),{})),t.attrs!=null&&(o.attrParams=t.attrs.reduce((n,s)=>{let a=s.type,i;switch(s.type){case"string":i=of(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=of(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"string[]":i=cf(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=cf(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"number":i=sf(e.attr,s.tfName,s.defaultValue||0),i===void 0&&s.tfDeprecatedName&&(i=sf(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"number[]":i=uf(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=uf(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"bool":i=nf(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=nf(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"bool[]":i=df(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=df(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"shape":i=lf(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=lf(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"shape[]":i=mf(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=mf(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"dtype":i=af(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=af(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"dtype[]":i=pf(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=pf(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"func":i=yE(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=yE(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error(`Unsupported param type: ${s.type} for op: ${e.op}`)}return n[s.name]={value:i,type:a},n},{})),o}mapFunction(e){let t=e.nodeDef,o=[],n=[],s={};t!=null&&(s=t.reduce((c,m)=>(c[m.name]=this.mapNode(m),m.op==="Const"&&n.push(c[m.name]),c),{}));let a=[],i=[];e.signature.inputArg.forEach(c=>{let[m]=Zr(c.name),d={name:m,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:Mx(c.type),type:"dtype"}},children:[]};d.signatureKey=c.name,a.push(d),s[m]=d}),Object.keys(s).forEach(c=>{let m=s[c];m.inputNames.forEach((d,f)=>{let[g,,h]=Zr(d),x=s[g];if(x.outputs!=null){let b=x.outputs.indexOf(h);if(b!==-1){let S=`${g}:${b}`;m.inputNames[f]=S}}m.inputs.push(x),x.children.push(m)})});let l=e.ret;e.signature.outputArg.forEach(c=>{let[m,d]=Zr(l[c.name]),f=s[m];f!=null&&(f.defaultOutput=d,i.push(f))});let u=this.mapArgsToSignature(e);return{nodes:s,inputs:a,outputs:i,weights:n,placeholders:o,signature:u}}mapArgsToSignature(e){return{methodName:e.signature.name,inputs:e.signature.inputArg.reduce((t,o)=>(t[o.name]=this.mapArgToTensorInfo(o),t),{}),outputs:e.signature.outputArg.reduce((t,o)=>(t[o.name]=this.mapArgToTensorInfo(o,e.ret),t),{})}}mapArgToTensorInfo(e,t){let o=e.name;return t!=null&&(o=t[o]),{name:o,dtype:e.type}}};function J6(r){let e=P().global;if(typeof e.atob<"u")return e.atob(r);if(typeof Buffer<"u")return new Buffer(r,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}function bE(r,e){let t=Array.isArray(r)?String.fromCharCode.apply(null,r):J6(r);return e?t:t.toLowerCase()}function of(r,e,t,o=!1){let n=r[e];return n!=null?bE(n.s,o):t}function nf(r,e,t){let o=r[e];return o?o.b:t}function sf(r,e,t){let o=r[e]||{},n=o.i!=null?o.i:o.f!=null?o.f:t;return typeof n=="number"?n:parseInt(n,10)}function Mx(r){switch(typeof r=="string"&&(r=mr[r]),r){case mr.DT_FLOAT:case mr.DT_HALF:return"float32";case mr.DT_INT32:case mr.DT_INT64:case mr.DT_INT8:case mr.DT_UINT8:return"int32";case mr.DT_BOOL:return"bool";case mr.DT_DOUBLE:return"float32";case mr.DT_STRING:return"string";case mr.DT_COMPLEX64:case mr.DT_COMPLEX128:return"complex64";default:return null}}function yE(r,e,t){let o=r[e];return o&&o.func?o.func.name:t}function af(r,e,t){let o=r[e];return o&&o.type?Mx(o.type):t}function pf(r,e,t){let o=r[e];return o&&o.list&&o.list.type?o.list.type.map(n=>Mx(n)):t}function _E(r){if(!r.unknownRank)return r.dim!=null?r.dim.map(e=>typeof e.size=="number"?e.size:parseInt(e.size,10)):[]}function lf(r,e,t){let o=r[e];return o&&o.shape?_E(o.shape):t}function uf(r,e,t){let o=r[e];return o?((o.list.f&&o.list.f.length?o.list.f:o.list.i)||[]).map(n=>typeof n=="number"?n:parseInt(n,10)):t}function cf(r,e,t,o=!1){let n=r[e];return n&&n.list&&n.list.s?n.list.s.map(s=>bE(s,o)):t}function mf(r,e,t){let o=r[e];return o&&o.list&&o.list.shape?o.list.shape.map(n=>_E(n)):t}function df(r,e,t){let o=r[e];return o&&o.list&&o.list.b?o.list.b:t}var ff=class{constructor(e,t,o){this.node=e,this.tensorMap=t,this.context=o,this.inputs=[],this.attrs={},this.inputs=e.inputNames.map(n=>this.getInput(n)),e.rawAttrs!=null&&(this.attrs=Object.keys(e.rawAttrs).reduce((n,s)=>(n[s]=this.getAttr(s),n),{}))}getInput(e){return vt(e,this.tensorMap,this.context)}getAttr(e,t){let o=this.node.rawAttrs[e];if(o.tensor!=null)return vt(e,this.tensorMap,this.context);if(o.i!=null||o.f!=null)return sf(this.node.rawAttrs,e,t);if(o.s!=null)return of(this.node.rawAttrs,e,t);if(o.b!=null)return nf(this.node.rawAttrs,e,t);if(o.shape!=null)return lf(this.node.rawAttrs,e,t);if(o.type!=null)return af(this.node.rawAttrs,e,t);if(o.list!=null){if(o.list.i!=null||o.list.f!=null)return uf(this.node.rawAttrs,e,t);if(o.list.s!=null)return cf(this.node.rawAttrs,e,t);if(o.list.shape!=null)return mf(this.node.rawAttrs,e,t);if(o.list.b!=null)return df(this.node.rawAttrs,e,t);if(o.list.type!=null)return pf(this.node.rawAttrs,e,t)}return t}};var Me={};je(Me,{OP_SCOPE_SUFFIX:()=>lh,abs:()=>Dt,acos:()=>Db,acosh:()=>Rb,add:()=>fe,addN:()=>Ob,all:()=>Pb,any:()=>Mb,argMax:()=>Lb,argMin:()=>Vb,asin:()=>Bb,asinh:()=>zb,atan:()=>Ub,atan2:()=>Wb,atanh:()=>Gb,avgPool:()=>Hu,avgPool3d:()=>Kb,basicLSTMCell:()=>jb,batchNorm:()=>rn,batchNorm2d:()=>Qb,batchNorm3d:()=>Yb,batchNorm4d:()=>Zb,batchToSpaceND:()=>qu,bincount:()=>Ku,bitwiseAnd:()=>Jb,booleanMaskAsync:()=>QO,broadcastArgs:()=>e_,broadcastTo:()=>on,buffer:()=>me,cast:()=>Re,ceil:()=>t_,clipByValue:()=>r_,clone:()=>xr,complex:()=>or,concat:()=>ot,concat1d:()=>o_,concat2d:()=>n_,concat3d:()=>s_,concat4d:()=>a_,conv1d:()=>i_,conv2d:()=>nn,conv2dTranspose:()=>p_,conv3d:()=>l_,conv3dTranspose:()=>c_,cos:()=>m_,cosh:()=>d_,cosineWindow:()=>Sl,cumprod:()=>f_,cumsum:()=>h_,denseBincount:()=>g_,depthToSpace:()=>x_,depthwiseConv2d:()=>Tp,diag:()=>y_,dilation2d:()=>b_,div:()=>Fe,divNoNan:()=>v_,dot:()=>T_,dropout:()=>pP,einsum:()=>sn,elu:()=>Yu,enclosingPowerOfTwo:()=>Ah,ensureShape:()=>w_,equal:()=>Qu,erf:()=>C_,euclideanNorm:()=>I_,exp:()=>Or,expandDims:()=>Kr,expm1:()=>k_,eye:()=>Zu,fft:()=>Sp,fill:()=>co,floor:()=>Ju,floorDiv:()=>Gu,fused:()=>Fh,gather:()=>ec,gatherND:()=>aP,greater:()=>Ws,greaterEqual:()=>tc,ifft:()=>Xs,imag:()=>pn,image:()=>mM,inTopKAsync:()=>uP,irfft:()=>Tc,isFinite:()=>E_,isInf:()=>$_,isNaN:()=>A_,leakyRelu:()=>rc,less:()=>Tl,lessEqual:()=>wp,linalg:()=>dM,linspace:()=>F_,localResponseNormalization:()=>D_,log:()=>Oo,log1p:()=>oc,logSigmoid:()=>O_,logSoftmax:()=>P_,logSumExp:()=>sc,logicalAnd:()=>Gs,logicalNot:()=>ac,logicalOr:()=>ic,logicalXor:()=>M_,losses:()=>fM,lowerBound:()=>L_,matMul:()=>Be,max:()=>fo,maxPool:()=>lc,maxPool3d:()=>V_,maxPoolWithArgmax:()=>B_,maximum:()=>uc,mean:()=>Hs,meshgrid:()=>z_,min:()=>vl,minimum:()=>qs,mirrorPad:()=>U_,mod:()=>W_,moments:()=>G_,movingAverage:()=>JO,mul:()=>se,multiRNNCell:()=>H_,multinomial:()=>q_,neg:()=>zt,norm:()=>Us,notEqual:()=>cc,oneHot:()=>K_,ones:()=>ho,onesLike:()=>j_,op:()=>N,outerProduct:()=>X_,pad:()=>go,pad1d:()=>Q_,pad2d:()=>Y_,pad3d:()=>Z_,pad4d:()=>J_,pool:()=>e1,pow:()=>Ro,prelu:()=>dc,print:()=>Wu,prod:()=>t1,raggedGather:()=>r1,raggedRange:()=>o1,raggedTensorToTensor:()=>n1,rand:()=>s1,randomGamma:()=>T1,randomNormal:()=>yc,randomStandardNormal:()=>w1,randomUniform:()=>Cp,randomUniformInt:()=>C1,range:()=>ln,real:()=>Po,reciprocal:()=>S1,relu:()=>un,relu6:()=>bc,reshape:()=>z,reverse:()=>Ir,reverse1d:()=>N1,reverse2d:()=>I1,reverse3d:()=>k1,reverse4d:()=>E1,rfft:()=>Np,round:()=>_c,rsqrt:()=>$1,scalar:()=>_e,scatterND:()=>tP,searchSorted:()=>wl,selu:()=>A1,separableConv2d:()=>F1,setdiff1dAsync:()=>D1,sigmoid:()=>uo,sign:()=>R1,signal:()=>cM,sin:()=>O1,sinh:()=>P1,slice:()=>De,slice1d:()=>M1,slice2d:()=>L1,slice3d:()=>V1,slice4d:()=>B1,softmax:()=>vc,softplus:()=>nc,spaceToBatchND:()=>mc,sparse:()=>hM,sparseToDense:()=>nP,spectral:()=>uM,split:()=>Mo,sqrt:()=>sr,square:()=>Rt,squaredDifference:()=>wc,squeeze:()=>Ip,stack:()=>Jt,step:()=>Cc,stridedSlice:()=>z1,string:()=>gM,sub:()=>ve,sum:()=>ze,tan:()=>U1,tanh:()=>_l,tensor:()=>Zt,tensor1d:()=>Ot,tensor2d:()=>cn,tensor3d:()=>Sc,tensor4d:()=>W1,tensor5d:()=>G1,tensor6d:()=>H1,tensorScatterUpdate:()=>j1,tile:()=>an,topk:()=>X1,transpose:()=>kc,truncatedNormal:()=>Q1,unique:()=>Y1,unsortedSegmentSum:()=>Z1,unstack:()=>kr,upperBound:()=>J1,variable:()=>ev,where:()=>Nr,whereAsync:()=>Ic,zeros:()=>yr,zerosLike:()=>It});var vE=(r,e,t,o=Me)=>{switch(r.op){case"BiasAdd":case"AddV2":case"Add":return[o.add(_("a",r,e,t),_("b",r,e,t))];case"AddN":return[o.addN(_("tensors",r,e,t))];case"FloorMod":case"Mod":return[o.mod(_("a",r,e,t),_("b",r,e,t))];case"Mul":return[o.mul(_("a",r,e,t),_("b",r,e,t))];case"RealDiv":case"Div":return[o.div(_("a",r,e,t),_("b",r,e,t))];case"DivNoNan":return[o.divNoNan(_("a",r,e,t),_("b",r,e,t))];case"FloorDiv":return[o.floorDiv(_("a",r,e,t),_("b",r,e,t))];case"Sub":return[o.sub(_("a",r,e,t),_("b",r,e,t))];case"Minimum":return[o.minimum(_("a",r,e,t),_("b",r,e,t))];case"Maximum":return[o.maximum(_("a",r,e,t),_("b",r,e,t))];case"Pow":return[o.pow(_("a",r,e,t),_("b",r,e,t))];case"SquaredDifference":return[o.squaredDifference(_("a",r,e,t),_("b",r,e,t))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var TE=(r,e,t,o=Me)=>{switch(r.op){case"Abs":case"ComplexAbs":return[o.abs(_("x",r,e,t))];case"Acos":return[o.acos(_("x",r,e,t))];case"Acosh":return[o.acosh(_("x",r,e,t))];case"Asin":return[o.asin(_("x",r,e,t))];case"Asinh":return[o.asinh(_("x",r,e,t))];case"Atan":return[o.atan(_("x",r,e,t))];case"Atan2":return[o.atan2(_("x",r,e,t),_("y",r,e,t))];case"Atanh":return[o.atanh(_("x",r,e,t))];case"Ceil":return[o.ceil(_("x",r,e,t))];case"Complex":return[o.complex(_("real",r,e,t),_("imag",r,e,t))];case"Cos":return[o.cos(_("x",r,e,t))];case"Cosh":return[o.cosh(_("x",r,e,t))];case"Elu":return[o.elu(_("x",r,e,t))];case"Erf":return[o.erf(_("x",r,e,t))];case"Exp":return[o.exp(_("x",r,e,t))];case"Expm1":return[o.expm1(_("x",r,e,t))];case"Floor":return[o.floor(_("x",r,e,t))];case"Log":return[o.log(_("x",r,e,t))];case"Log1p":return[o.log1p(_("x",r,e,t))];case"Imag":return[o.imag(_("x",r,e,t))];case"Neg":return[o.neg(_("x",r,e,t))];case"Reciprocal":return[o.reciprocal(_("x",r,e,t))];case"Real":return[o.real(_("x",r,e,t))];case"Relu":return[o.relu(_("x",r,e,t))];case"Round":return[o.round(_("x",r,e,t))];case"Selu":return[o.selu(_("x",r,e,t))];case"Sigmoid":return[o.sigmoid(_("x",r,e,t))];case"Sin":return[o.sin(_("x",r,e,t))];case"Sign":return[o.sign(_("x",r,e,t))];case"Sinh":return[o.sinh(_("x",r,e,t))];case"Softplus":return[o.softplus(_("x",r,e,t))];case"Sqrt":return[o.sqrt(_("x",r,e,t))];case"Square":return[o.square(_("x",r,e,t))];case"Tanh":return[o.tanh(_("x",r,e,t))];case"Tan":return[o.tan(_("x",r,e,t))];case"ClipByValue":return[o.clipByValue(_("x",r,e,t),_("clipValueMin",r,e,t),_("clipValueMax",r,e,t))];case"Relu6":return[o.relu6(_("x",r,e,t))];case"Rsqrt":return[o.rsqrt(vt(r.inputNames[0],e,t))];case"LeakyRelu":return[o.leakyRelu(_("x",r,e,t),_("alpha",r,e,t))];case"Prelu":return[o.prelu(_("x",r,e,t),_("alpha",r,e,t))];case"IsNan":return[o.isNaN(vt(r.inputNames[0],e,t))];case"IsInf":return[o.isInf(vt(r.inputNames[0],e,t))];case"IsFinite":return[o.isFinite(vt(r.inputNames[0],e,t))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};function wr(r,e,t=""){if(!(typeof r=="number"||typeof e=="number")){y.assert(r.length===e.length,()=>t+` Shapes ${r} and ${e} must match`);for(let o=0;o<r.length;o++){let n=r[o],s=e[o];y.assert(n<0||s<0||n===s,()=>t+` Shapes ${r} and ${e} must match`)}}}function wE(r){return!(typeof r=="number"||r.some(e=>e<0))}function el(r,e,t){let o=hf(r,t),n=!wE(o);if(n&&e.length===0)throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${o}`);if(n&&e.forEach(s=>{o=hf(s.shape,o)}),!wE(o))throw new Error(`Non-fully-defined elementShape: ${o}`);return o}function hf(r,e){if(typeof r=="number")return e;if(typeof e=="number")return r;if(r.length!==e.length)throw new Error(`Incompatible ranks during merge: ${r} vs. ${e}`);let t=[];for(let o=0;o<r.length;++o){let n=r[o],s=e[o];if(n>=0&&s>=0&&n!==s)throw new Error(`Incompatible shape during merge: ${r} vs. ${e}`);t[o]=n>=0?n:s}return t}var gf=class{constructor(e,t,o,n,s,a,i){this.name=e,this.dtype=t,this.maxSize=o,this.elementShape=n,this.identicalElementShapes=s,this.dynamicSize=a,this.clearAfterRead=i,this.tensors=[],this.closed_=!1,this.idTensor=_e(0),nr(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(e){this.tensors.forEach(t=>{(e==null||!e.has(t.tensor.id))&&t.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(e){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||e>=this.size())throw new Error(`Tried to read from index ${e}, but array size is: ${this.size()}`);let t=this.tensors[e];if(t.cleared)throw new Error(`TensorArray ${this.name}: Could not read index ${e} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(t.cleared=!0),t.read=!0,t.tensor}readMany(e){return e.map(t=>this.read(t))}write(e,t){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||!this.dynamicSize&&e>=this.maxSize)throw new Error(`Tried to write to index ${e}, but array is not resizeable and size is: ${this.maxSize}`);let o=this.tensors[e]||{};if(t.dtype!==this.dtype)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e},
          because the value dtype is ${t.dtype}, but TensorArray dtype is ${this.dtype}.`);if(this.size()===0&&(this.elementShape==null||this.elementShape.length===0)&&(this.elementShape=t.shape),wr(this.elementShape,t.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${e}.`),o.read)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been read.`);if(o.written)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been written.`);o.tensor=t,nr(t),o.written=!0,this.tensors[e]=o}writeMany(e,t){if(e.length!==t.length)throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${e.length} is not the same as tensors size: ${t.length}.`);e.forEach((o,n)=>this.write(o,t[n]))}gather(e,t){if(t&&t!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${t}`);if(e)e=e.slice(0,this.size());else{e=[];for(let n=0;n<this.size();n++)e.push(n)}if(e.length===0)return Zt([],[0].concat(this.elementShape));let o=this.readMany(e);return wr(this.elementShape,o[0].shape,"TensorArray shape mismatch: "),Jt(o,0)}concat(e){if(e&&e!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${e}`);if(this.size()===0)return Zt([],[0].concat(this.elementShape));let t=[];for(let n=0;n<this.size();n++)t.push(n);let o=this.readMany(t);return wr(this.elementShape,o[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${o[0].shape})`),ot(o,0)}scatter(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);if(e.length!==t.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${t.shape[0]}`);let o=Math.max(...e);if(!this.dynamicSize&&o>=this.maxSize)throw new Error(`Max index must be < array size (${o}  vs. ${this.maxSize})`);this.writeMany(e,kr(t,0))}split(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);let o=0,n=e.map(p=>(o+=p,o));if(o!==t.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${o}, and tensor's shape is: ${t.shape}`);if(!this.dynamicSize&&e.length!==this.maxSize)throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${e.length}), and the TensorArray is not marked as dynamically resizeable`);let s=o===0?0:t.size/o,a=[];Se(()=>{t=z(t,[1,o,s]);for(let p=0;p<e.length;++p){let u=[0,p===0?0:n[p-1],0],c=[1,e[p],s];a[p]=z(De(t,u,c),this.elementShape)}return a});let i=[];for(let p=0;p<e.length;p++)i[p]=p;this.writeMany(i,a)}};var tl=class r{get id(){return this.idTensor.id}constructor(e,t,o,n=-1){this.tensors=e,this.elementShape=t,this.elementDtype=o,e?.forEach(s=>{if(o!==s.dtype)throw new Error(`Invalid data types; op elements ${o}, but list elements ${s.dtype}`);wr(t,s.shape,"TensorList shape mismatch: "),nr(s)}),this.idTensor=_e(0),this.maxNumElements=n,nr(this.idTensor)}copy(){return new r([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(e){this.tensors.forEach(t=>{(e==null||!e.has(t.id))&&t.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(e,t,o=-1){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(o!==-1&&this.tensors.length!==o)throw new Error(`Operation expected a list with ${o} elements but got a list with ${this.tensors.length} elements.`);wr(e,this.elementShape,"TensorList shape mismatch: ");let n=el(this.elementShape,this.tensors,e);return Se(()=>{let s=this.tensors.map(a=>z(a,n));return Jt(s,0)})}popBack(e,t){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(this.size()===0)throw new Error("Trying to pop from an empty list.");let o=el(this.elementShape,this.tensors,e),n=this.tensors.pop();return n.kept=!1,wr(n.shape,e,"TensorList shape mismatch: "),z(n,o)}pushBack(e){if(e.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${this.elementDtype}`);if(wr(e.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw new Error("Trying to push element into a full list.");nr(e),this.tensors.push(e)}resize(e){if(e<0)throw new Error(`TensorListResize expects size to be non-negative. Got: ${e}`);if(this.maxNumElements!==-1&&e>this.maxNumElements)throw new Error(`TensorListResize input size ${e} is greater maxNumElement ${this.maxNumElements}.`);let t=new r([],this.elementShape,this.elementDtype,this.maxNumElements);t.tensors.length=e;for(let o=0;o<Math.min(this.tensors.length,e);++o)t.tensors[o]=this.tensors[o];return t}getItem(e,t,o){if(o!==this.elementDtype)throw new Error(`Invalid data types; op elements ${o}, but list elements ${this.elementDtype}`);if(e<0||e>this.tensors.length)throw new Error(`Trying to access element ${e} in a list with ${this.tensors.length} elements.`);if(this.tensors[e]==null)throw new Error(`element at index ${e} is null.`);wr(this.tensors[e].shape,t,"TensorList shape mismatch: ");let n=el(this.elementShape,this.tensors,t);return z(this.tensors[e],n)}setItem(e,t){if(t.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t.dtype}, but list elements ${this.elementDtype}`);if(e<0||this.maxNumElements!==-1&&e>=this.maxNumElements)throw new Error(`Trying to set element ${e} in a list with max ${this.maxNumElements} elements.`);wr(this.elementShape,t.shape,"TensorList shape mismatch: "),nr(t),this.tensors[e]!=null&&(this.tensors[e].kept=!1),this.tensors[e]=t}gather(e,t,o){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);wr(this.elementShape,o,"TensorList shape mismatch: "),e=e.slice(0,this.size());let n=el(this.elementShape,this.tensors,o);return e.length===0?Zt([],[0].concat(n)):Se(()=>{let s=e.map(a=>z(this.tensors[a],n));return Jt(s,0)})}concat(e,t){if(e&&e!==this.elementDtype)throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${e}`);wr(this.elementShape,t,"TensorList shape mismatch: ");let o=el(this.elementShape,this.tensors,t);return this.size()===0?Zt([],[0].concat(o)):Se(()=>{let n=this.tensors.map(s=>z(s,o));return ot(n,0)})}};function CE(r,e,t){let o=r.dtype;if(r.shape.length<1)throw new Error(`Tensor must be at least a vector, but saw shape: ${r.shape}`);if(r.dtype!==t)throw new Error(`Invalid data types; op elements ${r.dtype}, but list elements ${t}`);let n=r.shape.slice(1);wr(n,e,"TensorList shape mismatch: ");let s=kr(r);return new tl(s,e,o)}function SE(r,e,t,o){return new tl([],r,e,o)}function NE(r,e,t,o){if(e.length!==r.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${r.shape[0]}`);let n=Math.max(...e);if(o!=null&&o!==-1&&n>=o)throw new Error(`Max index must be < array size (${n}  vs. ${o})`);let s=new tl([],t,r.dtype,o),a=kr(r,0);return e.forEach((i,p)=>{s.setItem(i,a[p])}),s}function IE(r,e,t){let o=0,n=e.map(u=>(o+=u,o));if(o!==r.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${o}, and tensor's shape is: ${r.shape}`);let s=r.shape.slice(1),a=hf(s,t),i=o===0?0:r.size/o,p=Se(()=>{let u=[];r=z(r,[1,o,i]);for(let c=0;c<e.length;++c){let d=[0,c===0?0:n[c-1],0],f=[1,e[c],i];u[c]=z(De(r,d,f),a)}return r.dispose(),u}),l=new tl([],t,r.dtype,e.length);for(let u=0;u<p.length;u++)l.setItem(u,p[u]);return l}var kE=async(r,e,t)=>{switch(r.op){case"If":case"StatelessIf":{let o=_("thenBranch",r,e,t),n=_("elseBranch",r,e,t),s=_("cond",r,e,t),a=_("args",r,e,t);return(await s.data())[0]?t.functionMap[o].executeFunctionAsync(a,t.tensorArrayMap,t.tensorListMap):t.functionMap[n].executeFunctionAsync(a,t.tensorArrayMap,t.tensorListMap)}case"While":case"StatelessWhile":{let o=_("body",r,e,t),n=_("cond",r,e,t),s=_("args",r,e,t),a=await t.functionMap[n].executeFunctionAsync(s,t.tensorArrayMap,t.tensorListMap),i=s.map(u=>u.id),p=await a[0].data();a.forEach(u=>{!u.kept&&i.indexOf(u.id)===-1&&u.dispose()});let l=s;for(;p[0];){let u=l;l=await t.functionMap[o].executeFunctionAsync(l,t.tensorArrayMap,t.tensorListMap);let c=l.map(d=>d.id);u.forEach(d=>{!d.kept&&i.indexOf(d.id)===-1&&c.indexOf(d.id)===-1&&d.dispose()});let m=await t.functionMap[n].executeFunctionAsync(l,t.tensorArrayMap,t.tensorListMap);p=await m[0].data(),m.forEach(d=>{!d.kept&&i.indexOf(d.id)===-1&&c.indexOf(d.id)===-1&&d.dispose()})}return l}case"LoopCond":{let o=_("pred",r,e,t);return[Jr(o)]}case"Switch":{let o=_("pred",r,e,t),n=_("data",r,e,t);return n.kept||(n=Jr(n)),(await o.data())[0]?[void 0,n]:[n,void 0]}case"Merge":{let o=r.inputNames.find(n=>vt(n,e,t)!==void 0);if(o){let n=vt(o,e,t);return[Jr(n)]}return}case"Enter":{let o=_("frameName",r,e,t),n=_("tensor",r,e,t);return t.enterFrame(o),[Jr(n)]}case"Exit":{let o=_("tensor",r,e,t);return t.exitFrame(),[Jr(o)]}case"NextIteration":{let o=_("tensor",r,e,t);return t.nextIteration(),[Jr(o)]}case"TensorArrayV3":{let o=_("size",r,e,t),n=_("dtype",r,e,t),s=_("elementShape",r,e,t),a=_("dynamicSize",r,e,t),i=_("clearAfterRead",r,e,t),p=_("identicalElementShapes",r,e,t),l=_("name",r,e,t),u=new gf(l,n,o,s,p,a,i);return t.addTensorArray(u),[u.idTensor,_e(1)]}case"TensorArrayWriteV3":{let o=_("tensorArrayId",r,e,t),n=_("index",r,e,t),s=_("tensor",r,e,t),a=t.getTensorArray(o.id);return a.write(n,s),[a.idTensor]}case"TensorArrayReadV3":{let o=_("tensorArrayId",r,e,t),n=_("index",r,e,t);return[t.getTensorArray(o.id).read(n)]}case"TensorArrayGatherV3":{let o=_("tensorArrayId",r,e,t),n=_("indices",r,e,t),s=_("dtype",r,e,t);return[t.getTensorArray(o.id).gather(n,s)]}case"TensorArrayScatterV3":{let o=_("tensorArrayId",r,e,t),n=_("indices",r,e,t),s=_("tensor",r,e,t),a=t.getTensorArray(o.id);return a.scatter(n,s),[a.idTensor]}case"TensorArrayConcatV3":{let o=_("tensorArrayId",r,e,t),n=t.getTensorArray(o.id),s=_("dtype",r,e,t);return[n.concat(s)]}case"TensorArraySplitV3":{let o=_("tensorArrayId",r,e,t),n=_("tensor",r,e,t),s=_("lengths",r,e,t),a=t.getTensorArray(o.id);return a.split(s,n),[a.idTensor]}case"TensorArraySizeV3":{let o=_("tensorArrayId",r,e,t),n=t.getTensorArray(o.id);return[_e(n.size(),"int32")]}case"TensorArrayCloseV3":{let o=_("tensorArrayId",r,e,t),n=t.getTensorArray(o.id);return n.clearAndClose(),[n.idTensor]}case"TensorListSetItem":{let o=_("tensorListId",r,e,t),n=_("index",r,e,t),s=_("tensor",r,e,t),a=t.getTensorList(o.id);return a.setItem(n,s),[a.idTensor]}case"TensorListGetItem":{let o=_("tensorListId",r,e,t),n=_("index",r,e,t),s=_("elementShape",r,e,t),a=_("elementDType",r,e,t);return[t.getTensorList(o.id).getItem(n,s,a)]}case"TensorListScatterV2":case"TensorListScatter":{let o=_("indices",r,e,t),n=_("tensor",r,e,t),s=_("elementShape",r,e,t),a=_("numElements",r,e,t),i=NE(n,o,s,a);return t.addTensorList(i),[i.idTensor]}case"TensorListReserve":case"EmptyTensorList":{let o=_("elementShape",r,e,t),n=_("elementDType",r,e,t),s;r.op==="TensorListReserve"?s="numElements":s="maxNumElements";let a=_(s,r,e,t),i=r.op==="TensorListReserve"?-1:a,p=SE(o,n,a,i);return t.addTensorList(p),[p.idTensor]}case"TensorListGather":{let o=_("tensorListId",r,e,t),n=_("indices",r,e,t),s=_("elementShape",r,e,t),a=_("elementDType",r,e,t);return[t.getTensorList(o.id).gather(n,a,s)]}case"TensorListStack":{let o=_("tensorListId",r,e,t),n=_("elementShape",r,e,t),s=_("elementDType",r,e,t),a=_("numElements",r,e,t);return[t.getTensorList(o.id).stack(n,s,a)]}case"TensorListFromTensor":{let o=_("tensor",r,e,t),n=_("elementShape",r,e,t),s=_("elementDType",r,e,t),a=CE(o,n,s);return t.addTensorList(a),[a.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{let o=_("tensorListId",r,e,t),n=t.getTensorList(o.id),s=_("dtype",r,e,t),a=_("elementShape",r,e,t);return[n.concat(s,a)]}case"TensorListPushBack":{let o=_("tensorListId",r,e,t),n=_("tensor",r,e,t),s=t.getTensorList(o.id);return s.pushBack(n),[s.idTensor]}case"TensorListPopBack":{let o=_("tensorListId",r,e,t),n=_("elementShape",r,e,t),s=_("elementDType",r,e,t);return[t.getTensorList(o.id).popBack(n,s)]}case"TensorListSplit":{let o=_("tensor",r,e,t),n=_("elementShape",r,e,t),s=_("lengths",r,e,t),a=IE(o,s,n);return t.addTensorList(a),[a.idTensor]}case"TensorListLength":{let o=_("tensorListId",r,e,t),n=t.getTensorList(o.id);return[_e(n.size(),"int32")]}case"TensorListResize":{let o=_("tensorListId",r,e,t),n=_("size",r,e,t),a=t.getTensorList(o.id).resize(n);return t.addTensorList(a),[a.idTensor]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};function EE(r,e,t){let[o,n]=_("fusedOps",r,e,t),s=o==="biasadd",a=!s,i=n==="prelu",p=o==="fusedbatchnorm",l=_("numArgs",r,e,t);if(s){if(i&&l!==2)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&s&&l!==1)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if(p)throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");let u=_("strides",r,e,t),c=Yl(r,e,t),m=_("dataFormat",r,e,t).toUpperCase(),d=_("dilations",r,e,t),[f,g]=_("args",r,e,t);a&&(g=f,f=void 0);let h=_("leakyreluAlpha",r,e,t);return{stride:u,pad:c,dataFormat:m,dilations:d,biasArg:f,preluArg:g,activationFunc:n,leakyreluAlpha:h}}var $E=(r,e,t,o=Me)=>{switch(r.op){case"Conv1D":{let n=_("stride",r,e,t),s=_("pad",r,e,t),a=_("dataFormat",r,e,t).toUpperCase(),i=_("dilation",r,e,t);return[o.conv1d(_("x",r,e,t),_("filter",r,e,t),n,s,a,i)]}case"Conv2D":{let n=_("strides",r,e,t),s=Yl(r,e,t),a=_("dataFormat",r,e,t).toUpperCase(),i=_("dilations",r,e,t);return[o.conv2d(_("x",r,e,t),_("filter",r,e,t),[n[1],n[2]],s,a,[i[1],i[2]])]}case"_FusedConv2D":{let{stride:n,pad:s,dataFormat:a,dilations:i,biasArg:p,preluArg:l,activationFunc:u,leakyreluAlpha:c}=EE(r,e,t);return[o.fused.conv2d({x:_("x",r,e,t),filter:_("filter",r,e,t),strides:[n[1],n[2]],pad:s,dataFormat:a,dilations:[i[1],i[2]],bias:p,activation:u,preluActivationWeights:l,leakyreluAlpha:c})]}case"FusedDepthwiseConv2dNative":{let{stride:n,pad:s,dataFormat:a,dilations:i,biasArg:p,preluArg:l,activationFunc:u,leakyreluAlpha:c}=EE(r,e,t);return[o.fused.depthwiseConv2d({x:_("x",r,e,t),filter:_("filter",r,e,t),strides:[n[1],n[2]],pad:s,dataFormat:a,dilations:[i[1],i[2]],bias:p,activation:u,preluActivationWeights:l,leakyreluAlpha:c})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{let n=_("outputShape",r,e,t),s=_("strides",r,e,t),a=Yl(r,e,t);return[o.conv2dTranspose(_("x",r,e,t),_("filter",r,e,t),n,[s[1],s[2]],a)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{let n=_("strides",r,e,t),s=Yl(r,e,t),a=_("dilations",r,e,t),i=_("dataFormat",r,e,t).toUpperCase();return[o.depthwiseConv2d(_("input",r,e,t),_("filter",r,e,t),[n[1],n[2]],s,i,[a[1],a[2]])]}case"Conv3D":{let n=_("strides",r,e,t),s=_("pad",r,e,t),a=_("dataFormat",r,e,t).toUpperCase(),i=_("dilations",r,e,t);return[o.conv3d(_("x",r,e,t),_("filter",r,e,t),[n[1],n[2],n[3]],s,a,[i[1],i[2],i[3]])]}case"AvgPool":{let n=_("strides",r,e,t),s=_("pad",r,e,t),a=_("kernelSize",r,e,t);return[o.avgPool(_("x",r,e,t),[a[1],a[2]],[n[1],n[2]],s)]}case"MaxPool":{let n=_("strides",r,e,t),s=_("pad",r,e,t),a=_("kernelSize",r,e,t);return[o.maxPool(_("x",r,e,t),[a[1],a[2]],[n[1],n[2]],s)]}case"MaxPoolWithArgmax":{let n=_("strides",r,e,t),s=_("pad",r,e,t),a=_("kernelSize",r,e,t),i=_("includeBatchInIndex",r,e,t),{result:p,indexes:l}=o.maxPoolWithArgmax(_("x",r,e,t),[a[1],a[2]],[n[1],n[2]],s,i);return[p,l]}case"AvgPool3D":{let n=_("strides",r,e,t),s=_("pad",r,e,t),a=_("kernelSize",r,e,t);return[o.avgPool3d(_("x",r,e,t),[a[1],a[2],a[3]],[n[1],n[2],n[3]],s)]}case"MaxPool3D":{let n=_("strides",r,e,t),s=_("pad",r,e,t),a=_("kernelSize",r,e,t);return[o.maxPool3d(_("x",r,e,t),[a[1],a[2],a[3]],[n[1],n[2],n[3]],s)]}case"Dilation2D":{let n=_("strides",r,e,t),s=_("pad",r,e,t),a=_("dilations",r,e,t),i=n[1],p=n[2],l=a[1],u=a[2];return[o.dilation2d(_("x",r,e,t),_("filter",r,e,t),[i,p],s,[l,u],"NHWC")]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var AE=(r,e,t,o=Me)=>{switch(r.op){case"Fill":{let n=_("shape",r,e,t),s=_("dtype",r,e,t),a=_("value",r,e,t);return[o.fill(n,a,s)]}case"LinSpace":{let n=_("start",r,e,t),s=_("stop",r,e,t),a=_("num",r,e,t);return[o.linspace(n,s,a)]}case"Multinomial":{let n=_("logits",r,e,t),s=_("numSamples",r,e,t),a=_("seed",r,e,t);return[o.multinomial(n,s,a)]}case"OneHot":{let n=_("indices",r,e,t),s=_("depth",r,e,t),a=_("onValue",r,e,t),i=_("offValue",r,e,t),p=_("dtype",r,e,t);return[o.oneHot(n,s,a,i,p)]}case"Ones":return[o.ones(_("shape",r,e,t),_("dtype",r,e,t))];case"OnesLike":return[o.onesLike(_("x",r,e,t))];case"RandomStandardNormal":return[o.randomStandardNormal(_("shape",r,e,t),_("dtype",r,e,t),_("seed",r,e,t))];case"RandomUniform":return[o.randomUniform(_("shape",r,e,t),_("minval",r,e,t),_("maxval",r,e,t),_("dtype",r,e,t))];case"RandomUniformInt":return[o.randomUniformInt(_("shape",r,e,t),_("minval",r,e,t),_("maxval",r,e,t),_("seed",r,e,t))];case"Range":{let n=_("start",r,e,t),s=_("stop",r,e,t),a=_("step",r,e,t);return[o.range(n,s,a,_("dtype",r,e,t))]}case"TruncatedNormal":{let n=_("shape",r,e,t),s=_("mean",r,e,t),a=_("stdDev",r,e,t),i=_("seed",r,e,t);return[o.truncatedNormal(n,s,a,_("dtype",r,e,t),i)]}case"Zeros":return[o.zeros(_("shape",r,e,t),_("dtype",r,e,t))];case"ZerosLike":return[o.zerosLike(_("x",r,e,t))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};function Lx(r,e,t){let o=_("boxes",r,e,t),n=_("scores",r,e,t),s=_("maxOutputSize",r,e,t),a=_("iouThreshold",r,e,t),i=_("scoreThreshold",r,e,t),p=_("softNmsSigma",r,e,t);return{boxes:o,scores:n,maxOutputSize:s,iouThreshold:a,scoreThreshold:i,softNmsSigma:p}}var FE=async(r,e,t,o,n=Me)=>{switch(r.op){case"NonMaxSuppressionV5":{let{boxes:s,scores:a,maxOutputSize:i,iouThreshold:p,scoreThreshold:l,softNmsSigma:u}=Lx(r,e,t),c=await n.image.nonMaxSuppressionWithScoreAsync(s,a,i,p,l,u);return[c.selectedIndices,c.selectedScores]}case"NonMaxSuppressionV4":{let{boxes:s,scores:a,maxOutputSize:i,iouThreshold:p,scoreThreshold:l}=Lx(r,e,t),u=_("padToMaxOutputSize",r,e,t),c=await n.image.nonMaxSuppressionPaddedAsync(s,a,i,p,l,u);return[c.selectedIndices,c.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{let{boxes:s,scores:a,maxOutputSize:i,iouThreshold:p,scoreThreshold:l}=Lx(r,e,t);return[await n.image.nonMaxSuppressionAsync(s,a,i,p,l)]}case"Where":{let s=n.cast(_("condition",r,e,t),"bool"),a=[await n.whereAsync(s)];return s.dispose(),a}case"ListDiff":return n.setdiff1dAsync(_("x",r,e,t),_("y",r,e,t));default:throw TypeError(`Node type ${r.op} is not implemented`)}};var DE=(r,e,t,o=Me)=>{switch(r.op){case"LowerBound":{let n=_("sortedSequence",r,e,t),s=_("values",r,e,t);return[o.lowerBound(n,s)]}case"TopKV2":{let n=_("x",r,e,t),s=_("k",r,e,t),a=_("sorted",r,e,t),i=o.topk(n,s,a);return[i.values,i.indices]}case"UpperBound":{let n=_("sortedSequence",r,e,t),s=_("values",r,e,t);return[o.upperBound(n,s)]}case"Unique":{let n=_("x",r,e,t),s=o.unique(n);return[s.values,s.indices]}case"UniqueV2":{let n=_("x",r,e,t),s=_("axis",r,e,t),a=o.unique(n,s);return[a.values,a.indices]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var RE=(r,e,t,o=Me)=>{switch(r.op){case"Const":return e[r.name];case"PlaceholderWithDefault":let n=_("default",r,e,t);return[vt(r.name,e,t)||n];case"Placeholder":return[vt(r.name,e,t)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":{let u=_("x",r,e,t);return[Jr(u)]}case"IdentityN":return _("x",r,e,t).map(u=>Jr(u));case"Snapshot":let s=_("x",r,e,t);return[Jr(s)];case"Shape":return[o.tensor1d(_("x",r,e,t).shape,"int32")];case"ShapeN":return _("x",r,e,t).map(u=>o.tensor1d(u.shape));case"Size":return[o.scalar(_("x",r,e,t).size,"int32")];case"Rank":return[o.scalar(_("x",r,e,t).rank,"int32")];case"NoOp":return[o.scalar(1)];case"Print":let a=_("x",r,e,t),i=_("data",r,e,t),p=_("message",r,e,t),l=_("summarize",r,e,t);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(p);for(let u=0;u<i.length;u++)console.log(Array.prototype.slice.call(i[u].dataSync()).slice(0,l));return[a];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var xf=class{get id(){return this.handle.id}constructor(e,t){this.keyDType=e,this.valueDType=t,this.handle=_e(0),this.tensorMap=new Map,nr(this.handle)}clearAndClose(){this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return _e(this.size(),"int32")}async import(e,t){this.checkKeyAndValueTensor(e,t);let o=await e.data();return this.tensorMap.forEach(n=>n.dispose()),this.tensorMap.clear(),Se(()=>{let n=kr(t),s=o.length,a=n.length;y.assert(s===a,()=>`The number of elements doesn't match, keys has ${s} elements, the values has ${a} elements.`);for(let i=0;i<s;i++){let p=o[i],l=n[i];nr(l),this.tensorMap.set(p,l)}return this.handle})}async find(e,t){this.checkKeyAndValueTensor(e,t);let o=await e.data();return Se(()=>{let n=[];for(let s=0;s<o.length;s++){let a=o[s],i=this.findWithDefault(a,t);n.push(i)}return Jt(n)})}findWithDefault(e,t){let o=this.tensorMap.get(e);return o??t}checkKeyAndValueTensor(e,t){if(e.dtype!==this.keyDType)throw new Error(`Expect key dtype ${this.keyDType}, but got ${e.dtype}`);if(t.dtype!==this.valueDType)throw new Error(`Expect value dtype ${this.valueDType}, but got ${t.dtype}`)}};var OE=async(r,e,t,o)=>{switch(r.op){case"HashTable":case"HashTableV2":{let n=o.getHashTableHandleByName(r.name);if(n!=null)return[n];{let s=_("keyDType",r,e,t),a=_("valueDType",r,e,t),i=new xf(s,a);return o.addHashTable(r.name,i),[i.handle]}}case"InitializeTable":case"InitializeTableV2":case"LookupTableImport":case"LookupTableImportV2":{let n=_("tableHandle",r,e,t,o),s=_("keys",r,e,t),a=_("values",r,e,t);return[await o.getHashTableById(n.id).import(s,a)]}case"LookupTableFind":case"LookupTableFindV2":{let n=_("tableHandle",r,e,t,o),s=_("keys",r,e,t),a=_("defaultValue",r,e,t);return[await o.getHashTableById(n.id).find(s,a)]}case"LookupTableSize":case"LookupTableSizeV2":{let n=_("tableHandle",r,e,t,o);return[o.getHashTableById(n.id).tensorSize()]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var PE=(r,e,t,o=Me)=>{switch(r.op){case"ResizeBilinear":{let n=_("images",r,e,t),s=_("size",r,e,t),a=_("alignCorners",r,e,t),i=_("halfPixelCenters",r,e,t);return[o.image.resizeBilinear(n,[s[0],s[1]],a,i)]}case"ResizeNearestNeighbor":{let n=_("images",r,e,t),s=_("size",r,e,t),a=_("alignCorners",r,e,t),i=_("halfPixelCenters",r,e,t);return[o.image.resizeNearestNeighbor(n,[s[0],s[1]],a,i)]}case"CropAndResize":{let n=_("image",r,e,t),s=_("boxes",r,e,t),a=_("boxInd",r,e,t),i=_("cropSize",r,e,t),p=_("method",r,e,t),l=_("extrapolationValue",r,e,t);return[o.image.cropAndResize(n,s,a,i,p,l)]}case"ImageProjectiveTransformV3":{let n=_("images",r,e,t),s=_("transforms",r,e,t),a=_("outputShape",r,e,t),i=_("fillValue",r,e,t),p=_("interpolation",r,e,t),l=_("fillMode",r,e,t);return[o.image.transform(n,s,p.toLowerCase(),l.toLowerCase(),i,a)]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var ME=(r,e,t,o=Me)=>{switch(r.op){case"Equal":return[o.equal(_("a",r,e,t),_("b",r,e,t))];case"NotEqual":return[o.notEqual(_("a",r,e,t),_("b",r,e,t))];case"Greater":return[o.greater(_("a",r,e,t),_("b",r,e,t))];case"GreaterEqual":return[o.greaterEqual(_("a",r,e,t),_("b",r,e,t))];case"Less":return[o.less(_("a",r,e,t),_("b",r,e,t))];case"LessEqual":return[o.lessEqual(_("a",r,e,t),_("b",r,e,t))];case"LogicalAnd":return[o.logicalAnd(_("a",r,e,t),_("b",r,e,t))];case"LogicalNot":return[o.logicalNot(_("a",r,e,t))];case"LogicalOr":return[o.logicalOr(_("a",r,e,t),_("b",r,e,t))];case"Select":case"SelectV2":return[o.where(_("condition",r,e,t),_("a",r,e,t),_("b",r,e,t))];case"BitwiseAnd":return[o.bitwiseAnd(_("a",r,e,t),_("b",r,e,t))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var LE=(r,e,t,o=Me)=>{switch(r.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[o.matMul(_("a",r,e,t),_("b",r,e,t),_("transposeA",r,e,t),_("transposeB",r,e,t))];case"Einsum":return[o.einsum(_("equation",r,e,t),..._("tensors",r,e,t))];case"Transpose":return[o.transpose(_("x",r,e,t),_("perm",r,e,t))];case"_FusedMatMul":let[n,s]=_("fusedOps",r,e,t),a=n==="biasadd",i=s==="prelu",p=_("numArgs",r,e,t),l=_("leakyreluAlpha",r,e,t);if(a){if(i&&p!==2)throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&p!==1)throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}let[u,c]=_("args",r,e,t);return[o.fused.matMul({a:_("a",r,e,t),b:_("b",r,e,t),transposeA:_("transposeA",r,e,t),transposeB:_("transposeB",r,e,t),bias:u,activation:s,preluActivationWeights:c,leakyreluAlpha:l})];case"MatrixBandPart":return[o.linalg.bandPart(_("a",r,e,t),_("numLower",r,e,t),_("numUpper",r,e,t))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var VE=(r,e,t,o=Me)=>{switch(r.op){case"EuclideanNorm":return[o.euclideanNorm(_("x",r,e,t),_("axis",r,e,t),_("keepDims",r,e,t))];case"FusedBatchNorm":case"FusedBatchNormV2":return[o.batchNorm(_("x",r,e,t),_("mean",r,e,t),_("variance",r,e,t),_("offset",r,e,t),_("scale",r,e,t),_("epsilon",r,e,t))];case"FusedBatchNormV3":return[o.batchNorm(_("x",r,e,t),_("mean",r,e,t),_("variance",r,e,t),_("offset",r,e,t),_("scale",r,e,t),_("epsilon",r,e,t))];case"LRN":return[o.localResponseNormalization(_("x",r,e,t),_("radius",r,e,t),_("bias",r,e,t),_("alpha",r,e,t),_("beta",r,e,t))];case"Softmax":return[o.softmax(_("x",r,e,t))];case"LogSoftmax":return[o.logSoftmax(_("x",r,e,t))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var BE=(r,e,t,o=Me)=>{switch(r.op){case"RaggedGather":{let{outputNestedSplits:n,outputDenseValues:s}=o.raggedGather(_("paramsNestedSplits",r,e,t),_("paramsDenseValues",r,e,t),_("indices",r,e,t),_("outputRaggedRank",r,e,t));return n.concat(s)}case"RaggedRange":{let{rtNestedSplits:n,rtDenseValues:s}=o.raggedRange(_("starts",r,e,t),_("limits",r,e,t),_("splits",r,e,t));return[n,s]}case"RaggedTensorToTensor":return[o.raggedTensorToTensor(_("shape",r,e,t),_("values",r,e,t),_("defaultValue",r,e,t),_("rowPartitionTensors",r,e,t),_("rowPartitionTypes",r,e,t))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var zE=(r,e,t,o=Me)=>{switch(r.op){case"Max":{let i=_("axis",r,e,t),p=_("keepDims",r,e,t);return[o.max(_("x",r,e,t),i,p)]}case"Mean":{let i=_("axis",r,e,t),p=_("keepDims",r,e,t);return[o.mean(_("x",r,e,t),i,p)]}case"Min":{let i=_("axis",r,e,t),p=_("keepDims",r,e,t);return[o.min(_("x",r,e,t),i,p)]}case"Sum":{let i=_("axis",r,e,t),p=_("keepDims",r,e,t);return[o.sum(_("x",r,e,t),i,p)]}case"All":{let i=_("axis",r,e,t),p=_("keepDims",r,e,t);return[o.all(_("x",r,e,t),i,p)]}case"Any":{let i=_("axis",r,e,t),p=_("keepDims",r,e,t);return[o.any(_("x",r,e,t),i,p)]}case"ArgMax":{let i=_("axis",r,e,t);return[o.argMax(_("x",r,e,t),i)]}case"ArgMin":{let i=_("axis",r,e,t);return[o.argMin(_("x",r,e,t),i)]}case"Prod":{let i=_("axis",r,e,t),p=_("keepDims",r,e,t);return[o.prod(_("x",r,e,t),i,p)]}case"Cumprod":{let i=_("axis",r,e,t),p=_("exclusive",r,e,t),l=_("reverse",r,e,t);return[o.cumprod(_("x",r,e,t),i,p,l)]}case"Cumsum":{let i=_("axis",r,e,t),p=_("exclusive",r,e,t),l=_("reverse",r,e,t);return[o.cumsum(_("x",r,e,t),i,p,l)]}case"Bincount":let n=_("x",r,e,t),s=_("weights",r,e,t),a=_("size",r,e,t);return[o.bincount(n,s,a)];case"DenseBincount":{let i=_("x",r,e,t),p=_("weights",r,e,t),l=_("size",r,e,t),u=_("binaryOutput",r,e,t);return[o.denseBincount(i,p,l,u)]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var UE=(r,e,t,o=Me)=>{switch(r.op){case"ConcatV2":case"Concat":{let n=_("n",r,e,t),s=_("axis",r,e,t),a=_("tensors",r,e,t);return a=a.slice(0,n),[o.concat(a,s)]}case"Gather":{let n=_("x",r,e,t),s=_("indices",r,e,t);return[o.gather(n,o.cast(s,"int32"),0)]}case"GatherV2":{let n=_("axis",r,e,t),s=_("batchDims",r,e,t),a=_("x",r,e,t),i=_("indices",r,e,t);return[o.gather(a,o.cast(i,"int32"),n,s)]}case"Reverse":{let n=_("dims",r,e,t),s=[];for(let i=0;i<n.length;i++)n[i]&&s.push(i);let a=_("x",r,e,t);return[o.reverse(a,s)]}case"ReverseV2":{let n=_("axis",r,e,t),s=_("x",r,e,t);return[o.reverse(s,n)]}case"Slice":{let n=_("begin",r,e,t),s=_("size",r,e,t);return[o.slice(_("x",r,e,t),n,s)]}case"StridedSlice":{let n=_("begin",r,e,t),s=_("end",r,e,t),a=_("strides",r,e,t),i=_("beginMask",r,e,t),p=_("endMask",r,e,t),l=_("ellipsisMask",r,e,t),u=_("newAxisMask",r,e,t),c=_("shrinkAxisMask",r,e,t),m=_("x",r,e,t);return[o.stridedSlice(m,n,s,a,i,p,l,u,c)]}case"Pack":return Se(()=>{let n=_("axis",r,e,t),s=_("tensors",r,e,t),a=s[0].shape,i=o.squeeze(s[0]).shape,p=s.map(l=>{let u=y.arraysEqual(l.shape,a);if(!u&&!y.arraysEqual(o.squeeze(l).shape,i))throw new Error("the input tensors shape does not match");return u?l:o.reshape(l,a)});return[o.stack(p,n)]});case"Unpack":{let n=_("axis",r,e,t),s=_("tensor",r,e,t);return o.unstack(s,n)}case"Tile":{let n=_("reps",r,e,t);return[o.tile(_("x",r,e,t),n)]}case"Split":case"SplitV":{let n=_("axis",r,e,t),s=_("numOrSizeSplits",r,e,t),a=_("x",r,e,t);return o.split(a,s,n)}case"ScatterNd":{let n=_("indices",r,e,t),s=_("values",r,e,t),a=_("shape",r,e,t);return[o.scatterND(n,s,a)]}case"GatherNd":{let n=_("x",r,e,t),s=_("indices",r,e,t);return[o.gatherND(n,s)]}case"SparseToDense":{let n=_("sparseIndices",r,e,t),s=_("outputShape",r,e,t),a=_("sparseValues",r,e,t),i=_("defaultValue",r,e,t);return[o.sparseToDense(n,a,s,a.dtype===i.dtype?i:o.cast(i,a.dtype))]}case"TensorScatterUpdate":{let n=_("indices",r,e,t),s=_("values",r,e,t),a=_("tensor",r,e,t);return[o.tensorScatterUpdate(a,n,s)]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var WE=(r,e,t,o=Me)=>{switch(r.op){case"SparseFillEmptyRows":{let{outputIndices:n,outputValues:s,emptyRowIndicator:a,reverseIndexMap:i}=o.sparse.sparseFillEmptyRows(_("indices",r,e,t),_("values",r,e,t),_("denseShape",r,e,t),_("defaultValue",r,e,t));return[n,s,a,i]}case"SparseReshape":{let{outputIndices:n,outputShape:s}=o.sparse.sparseReshape(_("inputIndices",r,e,t),_("inputShape",r,e,t),_("newShape",r,e,t));return[n,s]}case"SparseSegmentMean":return[o.sparse.sparseSegmentMean(_("data",r,e,t),_("indices",r,e,t),_("segmentIds",r,e,t))];case"SparseSegmentSum":return[o.sparse.sparseSegmentSum(_("data",r,e,t),_("indices",r,e,t),_("segmentIds",r,e,t))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var GE=(r,e,t,o=Me)=>{switch(r.op){case"FFT":return[o.fft(_("x",r,e,t))];case"IFFT":return[o.ifft(_("x",r,e,t))];case"RFFT":return[o.rfft(_("x",r,e,t))];case"IRFFT":return[o.irfft(_("x",r,e,t))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var HE=(r,e,t,o=Me)=>{switch(r.op){case"StaticRegexReplace":return[o.string.staticRegexReplace(_("input",r,e,t),_("pattern",r,e,t),_("rewrite",r,e,t),_("replaceGlobal",r,e,t))];case"StringNGrams":{let{nGrams:n,nGramsSplits:s}=o.string.stringNGrams(_("data",r,e,t),_("dataSplits",r,e,t),_("separator",r,e,t),_("nGramWidths",r,e,t),_("leftPad",r,e,t),_("rightPad",r,e,t),_("padWidth",r,e,t),_("preserveShortSequences",r,e,t));return[n,s]}case"StringSplit":{let{indices:n,values:s,shape:a}=o.string.stringSplit(_("input",r,e,t),_("delimiter",r,e,t),_("skipEmpty",r,e,t));return[n,s,a]}case"StringToHashBucketFast":return[o.string.stringToHashBucketFast(_("input",r,e,t),_("numBuckets",r,e,t))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var qE=(r,e,t,o=Me)=>{switch(r.op){case"Cast":return[o.cast(_("x",r,e,t),_("dtype",r,e,t))];case"ExpandDims":{let n=_("axis",r,e,t);return[o.expandDims(_("x",r,e,t),n)]}case"Squeeze":{let n=_("axis",r,e,t);return[o.squeeze(_("x",r,e,t),n)]}case"Reshape":return[o.reshape(_("x",r,e,t),_("shape",r,e,t))];case"EnsureShape":return[o.ensureShape(_("x",r,e,t),_("shape",r,e,t))];case"MirrorPad":return[o.mirrorPad(_("x",r,e,t),_("padding",r,e,t),_("mode",r,e,t))];case"PadV2":case"Pad":return[o.pad(_("x",r,e,t),_("padding",r,e,t),_("constantValue",r,e,t))];case"SpaceToBatchND":{let n=_("blockShape",r,e,t),s=_("paddings",r,e,t);return[o.spaceToBatchND(_("x",r,e,t),n,s)]}case"BatchToSpaceND":{let n=_("blockShape",r,e,t),s=_("crops",r,e,t);return[o.batchToSpaceND(_("x",r,e,t),n,s)]}case"DepthToSpace":{let n=_("blockSize",r,e,t),s=_("dataFormat",r,e,t).toUpperCase();return[o.depthToSpace(_("x",r,e,t),n,s)]}case"BroadcastTo":return[o.broadcastTo(_("x",r,e,t),_("shape",r,e,t))];case"BroadcastArgs":return[o.broadcastArgs(_("s0",r,e,t),_("s1",r,e,t))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};function Vx(r,e,t,o,n=Se){let s=((a,i,p)=>{switch(a.category){case"arithmetic":return n(()=>vE(a,i,p));case"basic_math":return n(()=>TE(a,i,p));case"control":return kE(a,i,p);case"convolution":return n(()=>$E(a,i,p));case"creation":return n(()=>AE(a,i,p));case"dynamic":return FE(a,i,p);case"evaluation":return n(()=>DE(a,i,p));case"image":return n(()=>PE(a,i,p));case"graph":return n(()=>RE(a,i,p));case"logical":return n(()=>ME(a,i,p));case"matrices":return n(()=>LE(a,i,p));case"normalization":return n(()=>VE(a,i,p));case"ragged":return n(()=>BE(a,i,p));case"reduction":return n(()=>zE(a,i,p));case"slice_join":return n(()=>UE(a,i,p));case"sparse":return n(()=>WE(a,i,p));case"spectral":return n(()=>GE(a,i,p));case"string":return n(()=>HE(a,i,p));case"transformation":return n(()=>qE(a,i,p));case"hash_table":return OE(a,i,p,o);case"custom":let l=tf(a.op);if(l&&l.customExecutor)return l.customExecutor(new ff(a,i,p));throw TypeError(`Custom op ${a.op} is not registered.`);default:throw TypeError(`Unknown op '${a.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(r,e,t);return y.isPromise(s)?s.then(a=>[].concat(a)):[].concat(s)}var Jl=class{constructor(e={},t={},o={},n={},s){this.weightMap=e,this.tensorArrayMap=t,this.tensorListMap=o,this.functionMap=n,this.parseNodeNameCache=s,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(e,t){return{id:e,frameName:t,iterationId:0}}set currentContext(e){this.contexts!==e&&(this.contexts=e,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){let e=[];for(let t=0;t<this.contexts.length-1;t++){let o=this.contexts.slice(0,this.contexts.length-t);e.push(this.contextIdforContexts(o))}e.push(""),this._currentContextIds=e}contextIdforContexts(e){return e?e.map(t=>t.id===0&&t.iterationId===0?"":`${t.frameName}-${t.iterationId}`).join("/"):""}enterFrame(e){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,e)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(this.contexts&&this.contexts.length>1)this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();else throw new Error("Cannot exit frame, the context is empty")}nextIteration(){if(this.contexts&&this.contexts.length>0){this.contexts=this.contexts.slice(),this.lastId++;let e=Object.assign({},this.contexts[this.contexts.length-1]);e.iterationId+=1,e.id=this.lastId,this.contexts.splice(-1,1,e),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}else throw new Error("Cannot increase frame iteration, the context is empty")}getWeight(e){return this.weightMap[e]}addTensorArray(e){this.tensorArrayMap[e.id]=e}getTensorArray(e){return this.tensorArrayMap[e]}addTensorList(e){this.tensorListMap[e.id]=e}getTensorList(e){return this.tensorListMap[e]}dispose(e){for(let t in this.tensorArrayMap)this.tensorArrayMap[t].clearAndClose(e);for(let t in this.tensorListMap)this.tensorListMap[t].clearAndClose(e)}};function Bx(r,e,t,o){let n=new Set,s=[],a=null,i=null,p=new Set,l=new Set(Object.keys(r).map(m=>er(m)[0]));o=o||[];let u=new Set(o.map(m=>er(m.name)[0])),c=[...e];for(;c.length>0;){let m=c.pop();if((bn(m)||SH(m)||NH(m))&&a==null&&(a=m,i=a.children.map(d=>d.name).filter(d=>n.has(d))),n.add(m.name),t[m.name]==null&&!l.has(m.name)&&!u.has(m.name)){if(m.inputs.length===0){s.push(m.name);continue}m.inputs.forEach(d=>{p.has(d.name)||(p.add(d.name),c.push(d))})}}return{inputs:r,outputs:e,usedNodes:n,missingInputs:s,dynamicNode:a,syncInputs:i}}function KE(r,e){let{usedNodes:t,inputs:o}=e,n=Object.keys(o).map(h=>er(h)[0]).map(h=>r.nodes[h]),s=r.initNodes||[],a=h=>t.has(typeof h=="string"?h:h.name);function i(h){return[...new Map(h.map(x=>[x.name,x])).values()]}let p=i([...n,...r.weights,...s]).filter(a),l=i([...p,...Object.values(r.nodes)]).filter(a),u=new Map(l.map(h=>[h.name,h])),c={};for(let h of l){c[h.name]=c[h.name]||0;for(let x of h.children)a(x)||(c[x.name]=Number.POSITIVE_INFINITY),c[x.name]=(c[x.name]||0)+1}let m=Object.entries(c).filter(([,h])=>h===0).map(([h])=>h),d=[...m];for(;m.length>0;){let h=m.pop(),x=u.get(h);for(let b of x.children.filter(a))--c[b.name]===0&&(d.push(b.name),m.push(b.name))}let f=d.map(h=>u.get(h)),g=_H(f,p);return vH(g,p),g}function _H(r,e){let t=new Map(r.map(a=>[a.name,a])),o=e.map(a=>a.name),n=new Set(o);for(;o.length>0;){let a=o.pop(),i=t.get(a);for(let p of i.children)!t.has(p.name)||n.has(p.name)||(n.add(p.name),o.push(p.name))}return r.filter(a=>n.has(a.name))}var rl=class extends Error{constructor(e){super(`NodesExecutionOrderError: ${e}`)}};function vH(r,e){let t=new Map(r.map((i,p)=>[i.name,p])),o=new Set(e.map(i=>i.name)),n=i=>o.has(typeof i=="string"?i:i.name),s=new Set(r.map(i=>i.name)),a=i=>s.has(typeof i=="string"?i:i.name);for(let i of r){for(let p of i.children.filter(a)){if(!t.has(p.name))throw new rl(`Child ${p.name} of node ${i.name} is unreachable.`);if(t.get(i.name)>t.get(p.name))throw new rl(`Node ${i.name} is scheduled to run after its child ${p.name}.`)}if(!n(i))for(let p of i.inputs){if(!t.has(p.name))throw new rl(`Input ${p.name} of node ${i.name} is unreachable.`);if(t.get(p.name)>t.get(i.name))throw new rl(`Node ${i.name} is scheduled to run before its input ${p.name}.`)}}}function jE(r){let e=new Map(r.map((i,p)=>[i.name,p])),t=Number.MAX_SAFE_INTEGER,o=r.map((i,p)=>bn(i)?t:p),n=i=>{let p=o[e.get(i.name)];return p??-1},s=r.map((i,p)=>i.children.map(n).reduce((l,u)=>Math.max(l,u),o[p])),a=new Map;for(let i=0;i<r.length;++i){let p=s[i];if(p===t)continue;let l=r[i],u=r[p];a.has(u.name)||a.set(u.name,[]),a.get(u.name).push(l)}return a}var TH=new Set(["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"]),wH=new Set(["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"]),CH=new Set(["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"]);function bn(r){return TH.has(r.op)}function SH(r){return wH.has(r.op)}function NH(r){return CH.has(r.op)}var eu=class r{get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(e){let t=Object.keys(e).map(o=>e[o].map(n=>n.id));this._weightIds=[].concat(...t),this._weightMap=e}set resourceManager(e){this._resourceManager=e}get inputs(){return this._inputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(e=>e.signatureKey||e.name)}get outputNodes(){return this._outputs.map(e=>{let t=e.signatureKey||e.name;return e.defaultOutput?`${t}:${e.defaultOutput}`:t})}get functions(){return Object.keys(this._functions).reduce((e,t)=>(e[t]=this._functions[t].signature,e),{})}constructor(e,t){this.graph=e,this.parent=t,this.compiledMap=new Map,this.parseNodeNameCache=new Map,this._weightMap={},this.SEPARATOR=",",this._functions={},this._functionExecutorMap={},this.keepIntermediateTensors=!1,this._outputs=e.outputs,this._inputs=e.inputs,this._initNodes=e.initNodes,this._signature=e.signature,this._functions=e.functions,e.functions!=null&&Object.keys(e.functions).forEach(o=>{this._functionExecutorMap[o]=new r(e.functions[o],this)})}getCompilationKey(e,t){let o=e.map(s=>s.name).sort(),n=t.map(s=>s.name).sort();return o.join(this.SEPARATOR)+"--"+n.join(this.SEPARATOR)}compile(e,t){let o=Bx(e,t,this.weightMap,this._initNodes),{missingInputs:n,dynamicNode:s,syncInputs:a}=o;if(s!=null)throw new Error(`This execution contains the node '${s.name}', which has the dynamic op '${s.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${a}]`);if(n.length>0){let l=t.map(c=>c.name),u=Object.keys(e);throw new Error(`Cannot compute the outputs [${l}] from the provided inputs [${u}]. Missing the following inputs: [${n}]`)}let i=KE(this.graph,o),p=jE(i);return{orderedNodes:i,nodeLiveUntilMap:p}}cloneAndKeepTensor(e){if(e==null)return null;let t=e.clone();return nr(t),t}cloneTensorList(e){return e?e.map(o=>this.cloneAndKeepTensor(o)):null}cloneTensorMap(e){return Object.fromEntries(Object.entries(e).map(([t,o])=>[t,this.cloneTensorList(o)]))}execute(e,t){this.disposeIntermediateTensors(),e=this.mapInputs(e);let o=Object.keys(e).sort();this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t);let n=o.map(m=>this.graph.nodes[er(m)[0]]),s=t.map(m=>er(m)[0]),a=new Set(s),i=s.map(m=>this.graph.nodes[m]);i.length===0&&(i=this._outputs);let p=this.getCompilationKey(n,i),l=this.compiledMap.get(p);l==null&&(l=this.compile(e,i),this.compiledMap.set(p,l));try{this.keepIntermediateTensors=P().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(m){this.keepIntermediateTensors=!1,console.warn(m.message)}let u={},c={};return Se(()=>{let m=new Jl(this.weightMap,u,c,this.functionExecutorMap,this.parseNodeNameCache),d=Object.assign({},this.weightMap);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap)),Object.keys(e).forEach(x=>{let[b,S]=er(x,m),C=[];C[S]=e[x],d[b]=C,this.keepIntermediateTensors&&(this.clonedTensorsMap[b]=this.cloneTensorList(C))});let f=this.getFrozenTensorIds(d),{orderedNodes:g,nodeLiveUntilMap:h}=l;for(let x of g){if(d[x.name])continue;let b=Vx(x,d,m,this._resourceManager);if(y.isPromise(b))throw new Error(`The execution of the op '${x.op}' returned a promise. Please use model.executeAsync() instead.`);d[x.name]=b,this.keepIntermediateTensors&&(this.clonedTensorsMap[x.name]=this.cloneTensorList(b)),this.checkTensorForDisposalWithNodeLiveUntilInfo(x,d,m,f,a,h.get(x.name))}return this.parent==null&&m.dispose(f),t.map(x=>vt(x,d,m))})}getFrozenTensorIds(e){let t=[].concat.apply([],Object.keys(e).map(o=>e[o]).map(o=>o.map(n=>n.id)));return new Set(t)}checkTensorForDisposal(e,t,o,n,s,a,i){if(!(bn(t)||a.has(e))){for(let p of o[e])p!=null&&(i[p.id]=(i[p.id]||0)+t.children.length);for(let p of t.inputs){if(bn(p))continue;let l=xx(p.name,o,n);if(l!=null)for(let u of l){if(!u||u.kept||s.has(u.id))continue;let c=i[u.id];c===1?(u.dispose(),delete i[u.id]):c!=null&&i[u.id]--}}}}checkTensorForDisposalWithNodeLiveUntilInfo(e,t,o,n,s,a){function i(p){return bn(p)||s.has(p.name)}if(!(bn(e)||a==null))for(let p of a){if(i(p))continue;let l=xx(p.name,t,o);for(let u of l)!u||u.kept||n.has(u.id)||u.dispose()}}async executeAsync(e,t){return this._executeAsync(e,t)}disposeIntermediateTensors(){this.clonedTensorsMap&&(Object.values(this.clonedTensorsMap).forEach(e=>{for(let t of e)t&&!t.isDisposed&&t.dispose()}),this.clonedTensorsMap=null)}getIntermediateTensors(){return this.clonedTensorsMap}async _executeAsync(e,t,o=!1,n={},s={}){this.disposeIntermediateTensors(),o||(e=this.mapInputs(e),this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t));try{this.keepIntermediateTensors=P().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(m){this.keepIntermediateTensors=!1,console.warn(m.message)}let a=new Jl(this.weightMap,n,s,this.functionExecutorMap,this.parseNodeNameCache);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap));let i=await this.executeWithControlFlow(e,a,t,o),p=t.map(m=>vt(m,i,a)),l=p.map(m=>m.id),u=Object.keys(e).map(m=>e[m].id),c=new Set([...l,...u,...this.weightIds]);return Object.values(i).forEach(m=>{m.forEach(d=>{d&&!d.isDisposed&&!c.has(d.id)&&d.dispose()})}),this.parent==null&&a.dispose(c),p}async executeFunctionAsync(e,t,o){let n=e.reduce((s,a,i)=>(s[this.inputs[i].name]=a,s),{});return this._executeAsync(n,this.outputNodes,!0,t,o)}async executeWithControlFlow(e,t,o,n){let s=Object.keys(e),a=s.map(C=>this.graph.nodes[er(C)[0]]),i=o.map(C=>er(C)[0]),p=new Set(i),l=i.map(C=>this.graph.nodes[C]);l.length===0&&(l=this._outputs);let{usedNodes:u,missingInputs:c,dynamicNode:m,syncInputs:d}=Bx(e,l,this.weightMap,this._initNodes),f=[...a,...this.graph.weights,...this._initNodes||[]].map(C=>({node:C,contexts:t.currentContext})),g=Object.assign({},this.weightMap);Object.keys(e).forEach(C=>{let[$,A]=er(C),D=[];D[A]=e[C],g[$]=D});let h={},x=this.getFrozenTensorIds(g),b={};for(;f.length>0;){let C=this.processStack(a,f,t,g,b,x,p,h,u);await Promise.all(C)}m==null&&!n&&console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.");let S=l.filter(C=>!bn(C)&&!vt(C.name,g,t)).map(C=>C.name);if(S.length>0){let C="";throw m!=null&&(C=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${d}]`),new Error(`Cannot compute the outputs [${S}] from the provided inputs [${s}]. Consider providing the following inputs: [${c}]. ${C}`)}return g}processStack(e,t,o,n,s,a,i,p,l){let u=[];for(;t.length>0;){let c=t.pop();o.currentContext=c.contexts;let m="";if(c.node.op==="Enter"&&_("isConstant",c.node,n,o)&&([m]=Zr(c.node.name,o)),n[c.node.name]==null){let d=Vx(c.node,n,o,this._resourceManager);m||([m]=Zr(c.node.name,o));let f=o.currentContext;y.isPromise(d)?u.push(d.then(g=>(n[m]=g,this.keepIntermediateTensors&&(this.clonedTensorsMap[m]=this.cloneTensorList(g)),o.currentContext=f,this.checkTensorForDisposal(m,c.node,n,o,a,i,p),this.processChildNodes(c.node,t,o,n,s,l),g))):(n[m]=d,this.keepIntermediateTensors&&(this.clonedTensorsMap[m]=this.cloneTensorList(d)),this.checkTensorForDisposal(m,c.node,n,o,a,i,p),this.processChildNodes(c.node,t,o,n,s,l))}else this.processChildNodes(c.node,t,o,n,s,l)}return u}processChildNodes(e,t,o,n,s,a){e.children.forEach(i=>{let[p]=Zr(i.name,o);s[p]||!a.has(i.name)||(i.op==="Merge"?i.inputNames.some(l=>!!vt(l,n,o))&&(s[p]=!0,t.push({contexts:o.currentContext,node:i})):i.inputNames.every(l=>!!vt(l,n,o))&&(s[p]=!0,t.push({contexts:o.currentContext,node:i})))})}dispose(){Object.keys(this.weightMap).forEach(e=>this.weightMap[e].forEach(t=>t.dispose()))}checkInputShapeAndType(e){Object.keys(e).forEach(t=>{let o=e[t],[n]=er(t),s=this.graph.nodes[n];if(s.attrParams.shape&&s.attrParams.shape.value){let a=s.attrParams.shape.value,i=a.length===o.shape.length&&o.shape.every((p,l)=>a[l]===-1||a[l]===p);y.assert(i,()=>`The shape of dict['${s.name}'] provided in model.execute(dict) must be [${a}], but was [${o.shape}]`)}s.attrParams.dtype&&s.attrParams.dtype.value&&y.assert(o.dtype===s.attrParams.dtype.value,()=>`The dtype of dict['${s.name}'] provided in model.execute(dict) must be ${s.attrParams.dtype.value}, but was ${o.dtype}`)})}mapInputs(e){var t,o;let n={};for(let s in e){let a=(o=(t=this._signature)===null||t===void 0?void 0:t.inputs)===null||o===void 0?void 0:o[s];a!=null?n[a.name]=e[s]:n[s]=e[s]}return n}checkInputs(e){let t=Object.keys(e).filter(o=>{let[n]=er(o);return this.graph.nodes[n]==null});if(t.length>0)throw new Error(`The dict provided in model.execute(dict) has keys: [${t}] that are not part of graph`)}mapOutputs(e){return e.map(t=>{var o,n;let s=(n=(o=this._signature)===null||o===void 0?void 0:o.outputs)===null||n===void 0?void 0:n[t];return s!=null?s.name:t},{})}checkOutputs(e){e.forEach(t=>{let[o]=er(t);if(!this.graph.nodes[o])throw new Error(`The output '${t}' is not found in the graph`)})}};var yf=class{constructor(e={},t={}){this.hashTableNameToHandle=e,this.hashTableMap=t}addHashTable(e,t){this.hashTableNameToHandle[e]=t.handle,this.hashTableMap[t.id]=t}getHashTableHandleByName(e){return this.hashTableNameToHandle[e]}getHashTableById(e){return this.hashTableMap[e]}dispose(){for(let e in this.hashTableMap)this.hashTableMap[e].clearAndClose(),delete this.hashTableMap[e];for(let e in this.hashTableNameToHandle)this.hashTableNameToHandle[e].dispose(),delete this.hashTableNameToHandle[e]}};var IH="?tfjs-format=file",kH="model.json",bf=class{get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}constructor(e,t={},o=ea){this.modelUrl=e,this.loadOptions=t,this.version="n/a",this.io=o,t==null&&(this.loadOptions={}),this.resourceManager=new yf}findIOHandler(){let e=this.modelUrl;if(e.load!=null)this.handler=e;else if(this.loadOptions.requestInit!=null)this.handler=this.io.browserHTTPRequest(e,this.loadOptions);else{let t=this.io.getLoadHandlers(e,this.loadOptions);if(t.length===0)t.push(this.io.browserHTTPRequest(e,this.loadOptions));else if(t.length>1)throw new Error(`Found more than one (${t.length}) load handlers for URL '${[e]}'`);this.handler=t[0]}}load(){if(this.findIOHandler(),this.handler.load==null)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");let e=this.handler.load();return y.isPromise(e)?e.then(t=>t.getWeightStream==null?this.loadSync(t):this.loadStreaming(t)):this.loadSync(e)}loadSync(e){let t=this.io.decodeWeights(e.weightData,e.weightSpecs);return this.loadWithWeightMap(e,t)}async loadStreaming(e){if(e.getWeightStream==null)throw new Error("Model artifacts missing streamWeights function");let t=await Lu(e.getWeightStream(),e.weightSpecs);return this.loadWithWeightMap(e,t)}loadWithWeightMap(e,t){this.artifacts=e;let o=this.artifacts.modelTopology,n=this.artifacts.signature;if(this.artifacts.userDefinedMetadata!=null){let s=this.artifacts.userDefinedMetadata;s.signature!=null&&(n=s.signature),s.structuredOutputKeys!=null&&(this.structuredOutputKeys=s.structuredOutputKeys)}if(this.signature=n,this.version=`${o.versions.producer}.${o.versions.minConsumer}`,this.executor=new eu(Zl.Instance.transformGraph(o,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(t),this.executor.resourceManager=this.resourceManager,e.modelInitializer!=null&&e.modelInitializer.node!=null){let s=Zl.Instance.transformGraph(e.modelInitializer);this.initializer=new eu(s),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializerSignature=e.initializerSignature}return!0}async save(e,t){if(typeof e=="string"){let o=this.io.getSaveHandlers(e);if(o.length===0)throw new Error(`Cannot find any save handlers for URL '${e}'`);if(o.length>1)throw new Error(`Found more than one (${o.length}) save handlers for URL '${e}'`);e=o[0]}if(e.save==null)throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return e.save(this.artifacts)}addStructuredOutputNames(e){if(this.structuredOutputKeys){let t=e instanceof rt?[e]:e,o={};return t.forEach((n,s)=>o[this.structuredOutputKeys[s]]=n),o}return e}predict(e,t){let o=this.execute(e,this.outputNodes);return this.addStructuredOutputNames(o)}async predictAsync(e,t){let o=await this.executeAsync(e,this.outputNodes);return this.addStructuredOutputNames(o)}normalizeInputs(e){var t;if(!(e instanceof rt)&&!Array.isArray(e)){let s=(t=this.signature)===null||t===void 0?void 0:t.inputs;if(s!=null)for(let a in s){let i=s[a];i.resourceId!=null&&(e[a]=this.resourceIdToCapturedInput[i.resourceId])}return e}e=Array.isArray(e)?e:[e];let o=Object.keys(this.resourceIdToCapturedInput).length;if(e.length+o!==this.inputNodes.length)throw new Error(`Input tensor count mismatch, the graph model has ${this.inputNodes.length-o} non-resource placeholders, while there are ${e.length} input tensors provided.`);let n=0;return this.inputNodes.reduce((s,a)=>{var i,p,l;let u=(l=(p=(i=this.signature)===null||i===void 0?void 0:i.inputs)===null||p===void 0?void 0:p[a])===null||l===void 0?void 0:l.resourceId;return u!=null?s[a]=this.resourceIdToCapturedInput[u]:s[a]=e[n++],s},{})}normalizeOutputs(e){return e=e||this.outputNodes,Array.isArray(e)?e:[e]}executeInitializerGraph(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.execute({},[]):this.initializer.execute({},Object.keys(this.initializerSignature.outputs))}async executeInitializerGraphAsync(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.executeAsync({},[]):this.initializer.executeAsync({},Object.keys(this.initializerSignature.outputs))}setResourceIdToCapturedInput(e){if(this.resourceIdToCapturedInput={},this.initializerSignature){let t=this.initializerSignature.outputs,o=Object.keys(t);for(let n=0;n<o.length;n++){let s=o[n],a=t[s];this.resourceIdToCapturedInput[a.resourceId]=e[n]}}}execute(e,t){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(this.executeInitializerGraph()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);let o=this.executor.execute(e,t);return o.length>1?o:o[0]}async executeAsync(e,t){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(await this.executeInitializerGraphAsync()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);let o=await this.executor.executeAsync(e,t);return o.length>1?o:o[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(e){return Object.keys(e).reduce((t,o)=>(t[o]=[e[o]],t),{})}dispose(){this.executor.dispose(),this.initializer&&(this.initializer.dispose(),this.resourceIdToCapturedInput&&gt(this.resourceIdToCapturedInput)),this.resourceManager.dispose()}};async function zx(r,e={},t=ea){if(r==null)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");e==null&&(e={}),e.fromTFHub&&typeof r=="string"&&(r=EH(r));let o=new bf(r,e,t);return await o.load(),o}function EH(r){return r.endsWith("/")||(r=r+"/"),`${r}${kH}${IH}`}var ol={format:"graph-model",generatedBy:"1.14.0",convertedBy:"TensorFlow.js Converter v1.2.10.1",modelTopology:{node:[{attr:{dtype:{type:"DT_FLOAT"},shape:{shape:{dim:[{size:"-1"},{size:"224"},{size:"224"},{size:"3"}]}}},name:"images",op:"Placeholder"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{}}}},name:"module_apply_default/hub_input/Mul/y",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{}}}},name:"module_apply_default/hub_input/Sub/y",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"1280"},{size:"1001"}]}}}},name:"module/MobilenetV2/Logits/Conv2d_1c_1x1/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1001"}]}}}},name:"module/MobilenetV2/Logits/Conv2d_1c_1x1/biases",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"3"},{size:"32"}]}}}},name:"module/MobilenetV2/Conv/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"32"}]}}}},name:"module_apply_default/MobilenetV2/Conv/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"32"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"32"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"32"},{size:"16"}]}}}},name:"module/MobilenetV2/expanded_conv/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"16"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"16"},{size:"96"}]}}}},name:"module/MobilenetV2/expanded_conv_1/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"96"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_1/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"96"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_1/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"96"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_1/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"96"},{size:"24"}]}}}},name:"module/MobilenetV2/expanded_conv_1/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"24"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_1/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"24"},{size:"144"}]}}}},name:"module/MobilenetV2/expanded_conv_2/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"144"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_2/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"144"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_2/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"144"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_2/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"144"},{size:"24"}]}}}},name:"module/MobilenetV2/expanded_conv_2/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"24"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_2/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"24"},{size:"144"}]}}}},name:"module/MobilenetV2/expanded_conv_3/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"144"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_3/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"144"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_3/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"144"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_3/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"144"},{size:"32"}]}}}},name:"module/MobilenetV2/expanded_conv_3/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"32"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_3/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"32"},{size:"192"}]}}}},name:"module/MobilenetV2/expanded_conv_4/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"192"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_4/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"192"},{size:"32"}]}}}},name:"module/MobilenetV2/expanded_conv_4/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"32"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"32"},{size:"192"}]}}}},name:"module/MobilenetV2/expanded_conv_5/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_5/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"192"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_5/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_5/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"192"},{size:"32"}]}}}},name:"module/MobilenetV2/expanded_conv_5/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"32"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_5/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"32"},{size:"192"}]}}}},name:"module/MobilenetV2/expanded_conv_6/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_6/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"192"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_6/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"192"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_6/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"192"},{size:"64"}]}}}},name:"module/MobilenetV2/expanded_conv_6/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"64"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_6/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"64"},{size:"384"}]}}}},name:"module/MobilenetV2/expanded_conv_7/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_7/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"384"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_7/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_7/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"384"},{size:"64"}]}}}},name:"module/MobilenetV2/expanded_conv_7/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"64"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_7/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"64"},{size:"384"}]}}}},name:"module/MobilenetV2/expanded_conv_8/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"384"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_8/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"384"},{size:"64"}]}}}},name:"module/MobilenetV2/expanded_conv_8/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"64"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"64"},{size:"384"}]}}}},name:"module/MobilenetV2/expanded_conv_9/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_9/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"384"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_9/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_9/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"384"},{size:"64"}]}}}},name:"module/MobilenetV2/expanded_conv_9/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"64"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_9/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"64"},{size:"384"}]}}}},name:"module/MobilenetV2/expanded_conv_10/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_10/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"384"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_10/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"384"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_10/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"384"},{size:"96"}]}}}},name:"module/MobilenetV2/expanded_conv_10/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"96"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_10/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"96"},{size:"576"}]}}}},name:"module/MobilenetV2/expanded_conv_11/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_11/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"576"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_11/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_11/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"576"},{size:"96"}]}}}},name:"module/MobilenetV2/expanded_conv_11/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"96"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_11/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"96"},{size:"576"}]}}}},name:"module/MobilenetV2/expanded_conv_12/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_12/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"576"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_12/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_12/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"576"},{size:"96"}]}}}},name:"module/MobilenetV2/expanded_conv_12/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"96"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_12/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"96"},{size:"576"}]}}}},name:"module/MobilenetV2/expanded_conv_13/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_13/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"576"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_13/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"576"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_13/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"576"},{size:"160"}]}}}},name:"module/MobilenetV2/expanded_conv_13/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"160"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_13/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"160"},{size:"960"}]}}}},name:"module/MobilenetV2/expanded_conv_14/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_14/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"960"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_14/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_14/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"960"},{size:"160"}]}}}},name:"module/MobilenetV2/expanded_conv_14/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"160"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_14/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"160"},{size:"960"}]}}}},name:"module/MobilenetV2/expanded_conv_15/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_15/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"960"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_15/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_15/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"960"},{size:"160"}]}}}},name:"module/MobilenetV2/expanded_conv_15/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"160"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_15/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"160"},{size:"960"}]}}}},name:"module/MobilenetV2/expanded_conv_16/expand/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_16/expand/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"3"},{size:"3"},{size:"960"},{size:"1"}]}}}},name:"module/MobilenetV2/expanded_conv_16/depthwise/depthwise_weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"960"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_16/depthwise/depthwise_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"960"},{size:"320"}]}}}},name:"module/MobilenetV2/expanded_conv_16/project/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"320"}]}}}},name:"module_apply_default/MobilenetV2/expanded_conv_16/project/Conv2D_bn_offset",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1"},{size:"1"},{size:"320"},{size:"1280"}]}}}},name:"module/MobilenetV2/Conv_1/weights",op:"Const"},{attr:{dtype:{type:"DT_FLOAT"},value:{tensor:{dtype:"DT_FLOAT",tensorShape:{dim:[{size:"1280"}]}}}},name:"module_apply_default/MobilenetV2/Conv_1/Conv2D_bn_offset",op:"Const"},{input:["images","module_apply_default/hub_input/Mul/y"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/hub_input/Mul",op:"Mul"},{input:["module_apply_default/hub_input/Mul","module_apply_default/hub_input/Sub/y"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/hub_input/Sub",op:"Sub"},{device:"/device:CPU:0",input:["module_apply_default/hub_input/Sub","module/MobilenetV2/Conv/weights","module_apply_default/MobilenetV2/Conv/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","2","2","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/Conv/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/Conv/Relu6","module/MobilenetV2/expanded_conv/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv/depthwise/Relu6","module/MobilenetV2/expanded_conv/project/weights","module_apply_default/MobilenetV2/expanded_conv/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_1/expand/weights","module_apply_default/MobilenetV2/expanded_conv_1/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_1/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_1/expand/Relu6","module/MobilenetV2/expanded_conv_1/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","2","2","1"]}},dilations:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_1/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_1/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_1/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_1/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_1/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_1/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_1/depthwise/Relu6","module/MobilenetV2/expanded_conv_1/project/weights","module_apply_default/MobilenetV2/expanded_conv_1/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_1/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_1/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_2/expand/weights","module_apply_default/MobilenetV2/expanded_conv_2/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_2/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_2/expand/Relu6","module/MobilenetV2/expanded_conv_2/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},dilations:{list:{i:["1","1","1","1"]}},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_2/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_2/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_2/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_2/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_2/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_2/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_2/depthwise/Relu6","module/MobilenetV2/expanded_conv_2/project/weights","module_apply_default/MobilenetV2/expanded_conv_2/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_2/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_1/project/BatchNorm/FusedBatchNorm","module_apply_default/MobilenetV2/expanded_conv_2/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_2/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_2/add","module/MobilenetV2/expanded_conv_3/expand/weights","module_apply_default/MobilenetV2/expanded_conv_3/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_3/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_3/expand/Relu6","module/MobilenetV2/expanded_conv_3/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","2","2","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_3/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_3/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_3/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_3/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_3/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_3/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_3/depthwise/Relu6","module/MobilenetV2/expanded_conv_3/project/weights","module_apply_default/MobilenetV2/expanded_conv_3/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_3/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_3/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_4/expand/weights","module_apply_default/MobilenetV2/expanded_conv_4/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_4/expand/Relu6","module/MobilenetV2/expanded_conv_4/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"},strides:{list:{i:["1","1","1","1"]}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_4/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_4/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_4/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_4/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_4/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_4/depthwise/Relu6","module/MobilenetV2/expanded_conv_4/project/weights","module_apply_default/MobilenetV2/expanded_conv_4/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_4/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_3/project/BatchNorm/FusedBatchNorm","module_apply_default/MobilenetV2/expanded_conv_4/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_4/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_4/add","module/MobilenetV2/expanded_conv_5/expand/weights","module_apply_default/MobilenetV2/expanded_conv_5/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_5/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_5/expand/Relu6","module/MobilenetV2/expanded_conv_5/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_5/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_5/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_5/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_5/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_5/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_5/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_5/depthwise/Relu6","module/MobilenetV2/expanded_conv_5/project/weights","module_apply_default/MobilenetV2/expanded_conv_5/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_5/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_4/add","module_apply_default/MobilenetV2/expanded_conv_5/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_5/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_5/add","module/MobilenetV2/expanded_conv_6/expand/weights","module_apply_default/MobilenetV2/expanded_conv_6/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_6/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_6/expand/Relu6","module/MobilenetV2/expanded_conv_6/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","2","2","1"]}},dilations:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_6/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_6/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_6/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_6/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_6/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_6/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_6/depthwise/Relu6","module/MobilenetV2/expanded_conv_6/project/weights","module_apply_default/MobilenetV2/expanded_conv_6/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_6/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_6/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_7/expand/weights","module_apply_default/MobilenetV2/expanded_conv_7/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_7/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_7/expand/Relu6","module/MobilenetV2/expanded_conv_7/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},dilations:{list:{i:["1","1","1","1"]}},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_7/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_7/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_7/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_7/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_7/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_7/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_7/depthwise/Relu6","module/MobilenetV2/expanded_conv_7/project/weights","module_apply_default/MobilenetV2/expanded_conv_7/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_7/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_6/project/BatchNorm/FusedBatchNorm","module_apply_default/MobilenetV2/expanded_conv_7/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_7/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_7/add","module/MobilenetV2/expanded_conv_8/expand/weights","module_apply_default/MobilenetV2/expanded_conv_8/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_8/expand/Relu6","module/MobilenetV2/expanded_conv_8/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"},strides:{list:{i:["1","1","1","1"]}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_8/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_8/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_8/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_8/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_8/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_8/depthwise/Relu6","module/MobilenetV2/expanded_conv_8/project/weights","module_apply_default/MobilenetV2/expanded_conv_8/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_8/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_7/add","module_apply_default/MobilenetV2/expanded_conv_8/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_8/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_8/add","module/MobilenetV2/expanded_conv_9/expand/weights","module_apply_default/MobilenetV2/expanded_conv_9/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_9/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_9/expand/Relu6","module/MobilenetV2/expanded_conv_9/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_9/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_9/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_9/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_9/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_9/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_9/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_9/depthwise/Relu6","module/MobilenetV2/expanded_conv_9/project/weights","module_apply_default/MobilenetV2/expanded_conv_9/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_9/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_8/add","module_apply_default/MobilenetV2/expanded_conv_9/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_9/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_9/add","module/MobilenetV2/expanded_conv_10/expand/weights","module_apply_default/MobilenetV2/expanded_conv_10/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_10/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_10/expand/Relu6","module/MobilenetV2/expanded_conv_10/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},dilations:{list:{i:["1","1","1","1"]}},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_10/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_10/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_10/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_10/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_10/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_10/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_10/depthwise/Relu6","module/MobilenetV2/expanded_conv_10/project/weights","module_apply_default/MobilenetV2/expanded_conv_10/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_10/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_10/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_11/expand/weights","module_apply_default/MobilenetV2/expanded_conv_11/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_11/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_11/expand/Relu6","module/MobilenetV2/expanded_conv_11/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_11/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_11/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_11/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_11/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_11/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_11/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_11/depthwise/Relu6","module/MobilenetV2/expanded_conv_11/project/weights","module_apply_default/MobilenetV2/expanded_conv_11/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_11/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_10/project/BatchNorm/FusedBatchNorm","module_apply_default/MobilenetV2/expanded_conv_11/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_11/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_11/add","module/MobilenetV2/expanded_conv_12/expand/weights","module_apply_default/MobilenetV2/expanded_conv_12/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_12/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_12/expand/Relu6","module/MobilenetV2/expanded_conv_12/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_12/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_12/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_12/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_12/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_12/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_12/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_12/depthwise/Relu6","module/MobilenetV2/expanded_conv_12/project/weights","module_apply_default/MobilenetV2/expanded_conv_12/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_12/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_11/add","module_apply_default/MobilenetV2/expanded_conv_12/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_12/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_12/add","module/MobilenetV2/expanded_conv_13/expand/weights","module_apply_default/MobilenetV2/expanded_conv_13/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_13/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_13/expand/Relu6","module/MobilenetV2/expanded_conv_13/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","2","2","1"]}},padding:{s:"U0FNRQ=="},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_13/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_13/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_13/depthwise/depthwise_bn_offset"],attr:{data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_13/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_13/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_13/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_13/depthwise/Relu6","module/MobilenetV2/expanded_conv_13/project/weights","module_apply_default/MobilenetV2/expanded_conv_13/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_13/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_13/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/expanded_conv_14/expand/weights","module_apply_default/MobilenetV2/expanded_conv_14/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_14/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_14/expand/Relu6","module/MobilenetV2/expanded_conv_14/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_14/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_14/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_14/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_14/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_14/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_14/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_14/depthwise/Relu6","module/MobilenetV2/expanded_conv_14/project/weights","module_apply_default/MobilenetV2/expanded_conv_14/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_14/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_13/project/BatchNorm/FusedBatchNorm","module_apply_default/MobilenetV2/expanded_conv_14/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_14/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_14/add","module/MobilenetV2/expanded_conv_15/expand/weights","module_apply_default/MobilenetV2/expanded_conv_15/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_15/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_15/expand/Relu6","module/MobilenetV2/expanded_conv_15/depthwise/depthwise_weights"],attr:{padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},dilations:{list:{i:["1","1","1","1"]}},T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_15/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_15/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_15/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_15/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_15/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_15/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_15/depthwise/Relu6","module/MobilenetV2/expanded_conv_15/project/weights","module_apply_default/MobilenetV2/expanded_conv_15/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_15/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_14/add","module_apply_default/MobilenetV2/expanded_conv_15/project/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_15/add",op:"Add"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_15/add","module/MobilenetV2/expanded_conv_16/expand/weights","module_apply_default/MobilenetV2/expanded_conv_16/expand/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_16/expand/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/expanded_conv_16/expand/Relu6","module/MobilenetV2/expanded_conv_16/depthwise/depthwise_weights"],attr:{dilations:{list:{i:["1","1","1","1"]}},strides:{list:{i:["1","1","1","1"]}},padding:{s:"U0FNRQ=="},data_format:{s:"TkhXQw=="},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_16/depthwise/depthwise",op:"DepthwiseConv2dNative"},{input:["module_apply_default/MobilenetV2/expanded_conv_16/depthwise/depthwise","module_apply_default/MobilenetV2/expanded_conv_16/depthwise/depthwise_bn_offset"],attr:{T:{type:"DT_FLOAT"},data_format:{s:"TkhXQw=="}},name:"module_apply_default/MobilenetV2/expanded_conv_16/depthwise/BatchNorm/FusedBatchNorm",op:"BiasAdd"},{input:["module_apply_default/MobilenetV2/expanded_conv_16/depthwise/BatchNorm/FusedBatchNorm"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/expanded_conv_16/depthwise/Relu6",op:"Relu6"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_16/depthwise/Relu6","module/MobilenetV2/expanded_conv_16/project/weights","module_apply_default/MobilenetV2/expanded_conv_16/project/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/expanded_conv_16/project/BatchNorm/FusedBatchNorm",op:"_FusedConv2D"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/expanded_conv_16/project/BatchNorm/FusedBatchNorm","module/MobilenetV2/Conv_1/weights","module_apply_default/MobilenetV2/Conv_1/Conv2D_bn_offset"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA==","UmVsdTY="]}}},name:"module_apply_default/MobilenetV2/Conv_1/Relu6",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/Conv_1/Relu6"],attr:{padding:{s:"VkFMSUQ="},strides:{list:{i:["1","1","1","1"]}},data_format:{s:"TkhXQw=="},ksize:{list:{i:["1","7","7","1"]}},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/Logits/AvgPool",op:"AvgPool"},{device:"/device:CPU:0",input:["module_apply_default/MobilenetV2/Logits/AvgPool","module/MobilenetV2/Logits/Conv2d_1c_1x1/weights","module/MobilenetV2/Logits/Conv2d_1c_1x1/biases"],attr:{explicit_paddings:{list:{}},epsilon:{f:0},data_format:{s:"TkhXQw=="},use_cudnn_on_gpu:{b:!0},padding:{s:"U0FNRQ=="},strides:{list:{i:["1","1","1","1"]}},num_args:{i:"1"},T:{type:"DT_FLOAT"},dilations:{list:{i:["1","1","1","1"]}},fused_ops:{list:{s:["Qmlhc0FkZA=="]}}},name:"module_apply_default/MobilenetV2/Logits/Conv2d_1c_1x1/BiasAdd",op:"_FusedConv2D"},{input:["module_apply_default/MobilenetV2/Logits/Conv2d_1c_1x1/BiasAdd"],attr:{squeeze_dims:{list:{i:["1","2"]}},T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/Logits/Squeeze",op:"Squeeze"},{input:["module_apply_default/MobilenetV2/Logits/Squeeze"],attr:{T:{type:"DT_FLOAT"}},name:"module_apply_default/MobilenetV2/Logits/output",op:"Identity"}],library:{},versions:{}},weightSpecs:[{name:"module_apply_default/hub_input/Mul/y",shape:[],dtype:"float32"},{name:"module_apply_default/hub_input/Sub/y",shape:[],dtype:"float32"},{name:"module/MobilenetV2/Logits/Conv2d_1c_1x1/weights",shape:[1,1,1280,1001],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/Logits/Conv2d_1c_1x1/biases",shape:[1001],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/Conv/weights",shape:[3,3,3,32],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/Conv/Conv2D_bn_offset",shape:[32],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv/depthwise/depthwise_weights",shape:[3,3,32,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv/depthwise/depthwise_bn_offset",shape:[32],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv/project/weights",shape:[1,1,32,16],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv/project/Conv2D_bn_offset",shape:[16],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_1/expand/weights",shape:[1,1,16,96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_1/expand/Conv2D_bn_offset",shape:[96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_1/depthwise/depthwise_weights",shape:[3,3,96,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_1/depthwise/depthwise_bn_offset",shape:[96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_1/project/weights",shape:[1,1,96,24],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_1/project/Conv2D_bn_offset",shape:[24],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_2/expand/weights",shape:[1,1,24,144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_2/expand/Conv2D_bn_offset",shape:[144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_2/depthwise/depthwise_weights",shape:[3,3,144,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_2/depthwise/depthwise_bn_offset",shape:[144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_2/project/weights",shape:[1,1,144,24],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_2/project/Conv2D_bn_offset",shape:[24],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_3/expand/weights",shape:[1,1,24,144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_3/expand/Conv2D_bn_offset",shape:[144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_3/depthwise/depthwise_weights",shape:[3,3,144,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_3/depthwise/depthwise_bn_offset",shape:[144],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_3/project/weights",shape:[1,1,144,32],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_3/project/Conv2D_bn_offset",shape:[32],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_4/expand/weights",shape:[1,1,32,192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_4/expand/Conv2D_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_4/depthwise/depthwise_weights",shape:[3,3,192,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_4/depthwise/depthwise_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_4/project/weights",shape:[1,1,192,32],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_4/project/Conv2D_bn_offset",shape:[32],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_5/expand/weights",shape:[1,1,32,192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_5/expand/Conv2D_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_5/depthwise/depthwise_weights",shape:[3,3,192,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_5/depthwise/depthwise_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_5/project/weights",shape:[1,1,192,32],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_5/project/Conv2D_bn_offset",shape:[32],dtype:"float32"},{name:"module/MobilenetV2/expanded_conv_6/expand/weights",shape:[1,1,32,192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_6/expand/Conv2D_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_6/depthwise/depthwise_weights",shape:[3,3,192,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_6/depthwise/depthwise_bn_offset",shape:[192],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_6/project/weights",shape:[1,1,192,64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_6/project/Conv2D_bn_offset",shape:[64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_7/expand/weights",shape:[1,1,64,384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_7/expand/Conv2D_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_7/depthwise/depthwise_weights",shape:[3,3,384,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_7/depthwise/depthwise_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_7/project/weights",shape:[1,1,384,64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_7/project/Conv2D_bn_offset",shape:[64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_8/expand/weights",shape:[1,1,64,384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_8/expand/Conv2D_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_8/depthwise/depthwise_weights",shape:[3,3,384,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_8/depthwise/depthwise_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_8/project/weights",shape:[1,1,384,64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_8/project/Conv2D_bn_offset",shape:[64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_9/expand/weights",shape:[1,1,64,384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_9/expand/Conv2D_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_9/depthwise/depthwise_weights",shape:[3,3,384,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_9/depthwise/depthwise_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_9/project/weights",shape:[1,1,384,64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_9/project/Conv2D_bn_offset",shape:[64],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_10/expand/weights",shape:[1,1,64,384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_10/expand/Conv2D_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_10/depthwise/depthwise_weights",shape:[3,3,384,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_10/depthwise/depthwise_bn_offset",shape:[384],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_10/project/weights",shape:[1,1,384,96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_10/project/Conv2D_bn_offset",shape:[96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_11/expand/weights",shape:[1,1,96,576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_11/expand/Conv2D_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_11/depthwise/depthwise_weights",shape:[3,3,576,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_11/depthwise/depthwise_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_11/project/weights",shape:[1,1,576,96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_11/project/Conv2D_bn_offset",shape:[96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_12/expand/weights",shape:[1,1,96,576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_12/expand/Conv2D_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_12/depthwise/depthwise_weights",shape:[3,3,576,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_12/depthwise/depthwise_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_12/project/weights",shape:[1,1,576,96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_12/project/Conv2D_bn_offset",shape:[96],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_13/expand/weights",shape:[1,1,96,576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_13/expand/Conv2D_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_13/depthwise/depthwise_weights",shape:[3,3,576,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_13/depthwise/depthwise_bn_offset",shape:[576],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_13/project/weights",shape:[1,1,576,160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_13/project/Conv2D_bn_offset",shape:[160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_14/expand/weights",shape:[1,1,160,960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_14/expand/Conv2D_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_14/depthwise/depthwise_weights",shape:[3,3,960,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_14/depthwise/depthwise_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_14/project/weights",shape:[1,1,960,160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_14/project/Conv2D_bn_offset",shape:[160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_15/expand/weights",shape:[1,1,160,960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_15/expand/Conv2D_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_15/depthwise/depthwise_weights",shape:[3,3,960,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_15/depthwise/depthwise_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_15/project/weights",shape:[1,1,960,160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_15/project/Conv2D_bn_offset",shape:[160],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_16/expand/weights",shape:[1,1,160,960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_16/expand/Conv2D_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_16/depthwise/depthwise_weights",shape:[3,3,960,1],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_16/depthwise/depthwise_bn_offset",shape:[960],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/expanded_conv_16/project/weights",shape:[1,1,960,320],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/expanded_conv_16/project/Conv2D_bn_offset",shape:[320],dtype:"float32",quantization:{dtype:"float16"}},{name:"module/MobilenetV2/Conv_1/weights",shape:[1,1,320,1280],dtype:"float32",quantization:{dtype:"float16"}},{name:"module_apply_default/MobilenetV2/Conv_1/Conv2D_bn_offset",shape:[1280],dtype:"float32",quantization:{dtype:"float16"}}]};var eo=[["All","*","*","     ",0,"All"],["AllReadable","*","r","     ",0,"All Readable"],["AllCreatable","*","w","     ",0,"All Creatable"],["AllLinear","*","l","     ",0,"All Linear"],["AllMatrix","*","m","     ",0,"All Matrix"],["AllGS1","*","G","     ",0,"All GS1"],["AllRetail","*","R","     ",0,"All Retail"],["AllIndustrial","*","I","     ",0,"All Industrial"],["Codabar","F"," ","lrw  ",18,"Codabar"],["Code39","A"," ","lrw I",8,"Code 39"],["Code39Std","A","s","lrw I",8,"Code 39 Standard"],["Code39Ext","A","e","lr  I",9,"Code 39 Extended"],["Code32","A","2","lr  I",129,"Code 32"],["PZN","A","p","lr  I",52,"Pharmazentralnummer"],["Code93","G"," ","lrw I",25,"Code 93"],["Code128","C"," ","lrwGI",20,"Code 128"],["ITF","I"," ","lrw I",3,"ITF"],["ITF14","I","4","lr  I",89,"ITF-14"],["DataBar","e"," ","lr GR",29,"DataBar"],["DataBarOmni","e","o","lr GR",29,"DataBar Omni"],["DataBarStk","e","s","lr GR",79,"DataBar Stacked"],["DataBarStkOmni","e","O","lr GR",80,"DataBar Stacked Omni"],["DataBarLtd","e","l","lr GR",30,"DataBar Limited"],["DataBarExp","e","e","lr GR",31,"DataBar Expanded"],["DataBarExpStk","e","E","lr GR",81,"DataBar Expanded Stacked"],["EANUPC","E"," ","lr  R",15,"EAN/UPC"],["EAN13","E","1","lrw R",15,"EAN-13"],["EAN8","E","8","lrw R",10,"EAN-8"],["EAN5","E","5","l   R",12,"EAN-5"],["EAN2","E","2","l   R",11,"EAN-2"],["ISBN","E","i","lr  R",69,"ISBN"],["UPCA","E","a","lrw R",34,"UPC-A"],["UPCE","E","e","lrw R",37,"UPC-E"],["Telepen","B"," ","lr  I",32,"Telepen"],["TelepenAlpha","B","0","lr  I",32,"Telepen Alpha"],["TelepenNumeric","B","1","lr  I",87,"Telepen Numeric"],["OtherBarcode","X"," "," r   ",0,"Other barcode"],["DXFilmEdge","X","x","lr   ",147,"DX Film Edge"],["PDF417","L"," ","mrw  ",55,"PDF417"],["CompactPDF417","L","c","mr   ",56,"Compact PDF417"],["MicroPDF417","L","m","mr   ",84,"MicroPDF417"],["Aztec","z"," ","mr G ",92,"Aztec"],["AztecCode","z","c","mrwG ",92,"Aztec Code"],["AztecRune","z","r","mr   ",128,"Aztec Rune"],["QRCode","Q"," ","mrwG ",58,"QR Code"],["QRCodeModel1","Q","1","mr   ",0,"QR Code Model 1"],["QRCodeModel2","Q","2","mr   ",58,"QR Code Model 2"],["MicroQRCode","Q","m","mr   ",97,"Micro QR Code"],["RMQRCode","Q","r","mr G ",145,"rMQR Code"],["DataMatrix","d"," ","mrwG ",71,"Data Matrix"],["MaxiCode","U"," ","mr   ",57,"MaxiCode"]],AH={DataBarExpanded:"DataBarExp",DataBarLimited:"DataBarLtd","Linear-Codes":"AllLinear","Matrix-Codes":"AllMatrix",Any:"All",rMQRCode:"RMQRCode"},FH=eo.map(r=>r[5]),DH=eo.filter(r=>r[1]==="*").map(r=>r[0]),RH=eo.filter(r=>r[1]!=="*").map(r=>r[0]);var OH=eo.filter(r=>r[2]===" ").map(r=>r[0]),PH=eo.filter(r=>r[3][0]==="l").map(r=>r[0]);var MH=eo.filter(r=>r[3][0]==="m").map(r=>r[0]);var LH=eo.filter(r=>r[3][1]==="r").map(r=>r[0]),VH=eo.filter(r=>r[3][2]==="w"||r[4]!==0).map(r=>r[0]),BH=eo.filter(r=>r[3][3]==="G").map(r=>r[0]),zH=eo.filter(r=>r[3][4]==="R").map(r=>r[0]),UH=eo.filter(r=>r[3][4]==="I").map(r=>r[0]);function XE(r){var e;return(e=AH[r])==null?r:e}function QE(r){return r.map(XE).join(",")}var YE=["LocalAverage","GlobalHistogram","FixedThreshold","BoolCast"];function WH(r){return YE.indexOf(r)}var Wx="Unknown.ASCII.ISO8859_1.ISO8859_2.ISO8859_3.ISO8859_4.ISO8859_5.ISO8859_6.ISO8859_7.ISO8859_8.ISO8859_9.ISO8859_10.ISO8859_11.ISO8859_13.ISO8859_14.ISO8859_15.ISO8859_16.Cp437.Cp1250.Cp1251.Cp1252.Cp1256.Shift_JIS.Big5.GB2312.GB18030.EUC_JP.EUC_KR.UTF16BE.UTF8.UTF16LE.UTF32BE.UTF32LE.BINARY".split(".");function GH(r){return r==="UnicodeBig"?Wx.indexOf("UTF16BE"):Wx.indexOf(r)}var ZE=["Text","Binary","Mixed","GS1","ISO15434","UnknownECI"];function HH(r){return ZE[r]}var JE=["Ignore","Read","Require"];function qH(r){return JE.indexOf(r)}var e$=["Plain","ECI","HRI","Escaped","Hex","HexECI"];function KH(r){return e$.indexOf(r)}var _f={formats:[],tryHarder:!0,tryRotate:!0,tryInvert:!0,tryDownscale:!0,tryDenoise:!1,binarizer:"LocalAverage",isPure:!1,downscaleFactor:3,downscaleThreshold:500,minLineCount:2,maxNumberOfSymbols:255,validateOptionalChecksum:!1,returnErrors:!1,eanAddOnSymbol:"Ignore",textMode:"HRI",characterSet:"Unknown",tryCode39ExtendedMode:!0};function jH(r){var e;return{...r,formats:QE(r.formats),binarizer:WH(r.binarizer),eanAddOnSymbol:qH(r.eanAddOnSymbol),textMode:KH(r.textMode),characterSet:GH(r.characterSet),tryCode39ExtendedMode:(e=r.tryCode39ExtendedMode)==null||e}}function XH(r){return{...r,orientation:r.rotation,format:r.format,symbology:r.symbology,contentType:HH(r.contentType)}}var QH={format:"QRCode",readerInit:!1,forceSquareDataMatrix:!1,ecLevel:"",scale:1,sizeHint:0,rotate:0,invert:!1,withHRT:!1,withQuietZones:!0,addHRT:!1,addQuietZones:!0,options:""};function YH(r,e){let t=r.byteLength>>2;for(let o=0;o<t;o+=1024){let n=Math.min(o+1024,t);for(let s=o;s<n;s++){let a=s<<2;e[s]=306*r[a]+601*r[a+1]+117*r[a+2]+512>>10}}}var ZH={locateFile:(r,e)=>{let t=r.match(/_(.+?)\.wasm$/);return t?`https://fastly.jsdelivr.net/npm/zxing-wasm@3.1.7/dist/${t[1]}/${r}`:e+r}},Ux=new WeakMap;function JH(r,e){return Object.is(r,e)||Object.keys(r).length===Object.keys(e).length&&Object.keys(r).every(t=>Object.prototype.hasOwnProperty.call(e,t)&&r[t]===e[t])}function Gx(r){let{overrides:e,equalityFn:t=JH,fireImmediately:o=!1}=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};var n;let[s,a]=(n=Ux.get(r))==null?[ZH]:n,i=e??s,p;if(o){if(a&&(p=t(s,i)))return a;let l=r({...i});return Ux.set(r,[i,l]),l}(p??t(s,i))||Ux.set(r,[i])}async function t$(r,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:_f,o={..._f,...t},n=await Gx(r,{fireImmediately:!0}),s,a=jH(o);if("width"in e&&"height"in e&&"data"in e){let{width:i,height:p}=e,l=e.data.buffer===n.HEAPU8.buffer?e.data.slice():e.data,u=l.byteLength/4,c=n._malloc(u);if(!c)throw Error(`Failed to allocate ${u} bytes in WASM memory`);try{YH(l,n.HEAPU8.subarray(c,c+u)),s=n.readBarcodesFromPixmap(c,i,p,a)}finally{n._free(c)}}else{let i;if("buffer"in e)i=e;else if("byteLength"in e)i=new Uint8Array(e);else if("size"in e){let l=typeof e.arrayBuffer=="function"?await e.arrayBuffer():await new Promise((u,c)=>{let m=new FileReader;m.onload=()=>u(m.result),m.onerror=()=>c(m.error),m.onabort=()=>c(new DOMException("File reading aborted","AbortError")),m.readAsArrayBuffer(e)});i=new Uint8Array(l)}else throw TypeError("Invalid input type");let p=n._malloc(i.byteLength);if(!p)throw Error(`Failed to allocate ${i.byteLength} bytes in WASM memory`);try{n.HEAPU8.set(i,p),s=n.readBarcodesFromImage(p,i.byteLength,a)}finally{n._free(p)}}try{let i=[],p=s.size();for(let l=0;l<p;++l)i.push(XH(s.get(l)));return i}finally{s.delete()}}var eq={..._f,formats:[..._f.formats]},rrt={...QH};function tq(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}async function r$(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};var e,t,o=r,n=!!globalThis.window,s=!!globalThis.WorkerGlobalScope;(t=globalThis.process)!=null&&(e=t.versions)!=null&&e.node&&globalThis.process;var a=(T,w)=>{throw w},i=void 0,p="";function l(T){return o.locateFile?o.locateFile(T,p):p+T}var u,c;if(n||s||typeof fetch=="function"){try{p=new URL(".",i).href}catch{}s&&(c=T=>{var w=new XMLHttpRequest;return w.open("GET",T,!1),w.responseType="arraybuffer",w.send(null),new Uint8Array(w.response)}),u=async T=>{var w=await fetch(T,{credentials:"same-origin"});if(w.ok)return w.arrayBuffer();throw Error(w.status+" : "+w.url)}}console.log.bind(console);var m=console.error.bind(console),d,f=!1,g;class h{}class x extends h{constructor(w){super(),this.excPtr=w}}function b(){return lu.buffer}function S(){var T;if(!(K!=null&&(T=K.buffer)!=null&&T.resizable)){var w=b();K=new Int8Array(w),iu=new Int16Array(w),o.HEAPU8=Vt=new Uint8Array(w),nl=new Uint16Array(w),pu=new Int32Array(w),ne=new Uint32Array(w),sy=new Float32Array(w),ay=new Float64Array(w)}}function C(){var T=o.preRun;T&&(typeof T=="function"&&(T=[T]),J.push(...T)),Z(J)}function $(){uu.ra()}function A(){var T=o.postRun;T&&(typeof T=="function"&&(T=[T]),X.push(...T)),Z(X)}function D(T){var w;throw(w=o.onAbort)==null||w.call(o,T),T=`Aborted(${T})`,m(T),f=!0,T+=". Build with -sASSERTIONS for more info.",new WebAssembly.RuntimeError(T)}var R;function M(){return l("zxing_reader.wasm")}function L(T){if(T==R&&d)return new Uint8Array(d);if(c)return c(T);throw"both async and sync fetching of the wasm failed"}async function B(T){if(!d)try{return await u(T)}catch{}return L(T)}async function W(T,w){try{var F=await B(T);return await WebAssembly.instantiate(F,w)}catch(O){m(`failed to asynchronously prepare wasm: ${O}`),D(O)}}async function G(T,w,F){if(!T)try{var O=fetch(w,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(O,F)}catch(V){m(`wasm streaming compile failed: ${V}`),m("falling back to ArrayBuffer instantiation")}return W(w,F)}function q(){return{a:X$}}class H{constructor(w){tq(this,"name","ExitStatus"),this.message=`Program terminated with exit(${w})`,this.status=w}}var K,Z=T=>{for(;T.length>0;)T.shift()(o)},X=[],J=[],ae=!0,Y=T=>by(T),ee=()=>vy(),ie=[],oe=T=>{var w=ie[T];return w||(ie[T]=w=Sy.get(T)),w},ne;class ce{set_type(w){ne[this.ptr+4>>2]=w}get_type(){return ne[this.ptr+4>>2]}set_destructor(w){ne[this.ptr+8>>2]=w}get_destructor(){return ne[this.ptr+8>>2]}set_caught(w){w=+!!w,K[this.ptr+12]=w}get_caught(){return K[this.ptr+12]!=0}set_rethrown(w){w=+!!w,K[this.ptr+13]=w}get_rethrown(){return K[this.ptr+13]!=0}init(w,F){this.set_adjusted_ptr(0),this.set_type(w),this.set_destructor(F)}set_adjusted_ptr(w){ne[this.ptr+16>>2]=w}get_adjusted_ptr(){return ne[this.ptr+16>>2]}constructor(w){this.excPtr=w,this.ptr=w-24}}var he=[],Te=0,xe=null,Ne=T=>yy(T),Ie=T=>{var w=xe?.excPtr;if(!w)return Ne(0),0;var F=new ce(w);F.set_adjusted_ptr(w);var O=F.get_type();if(!O)return Ne(0),w;for(var V of T){if(!V||V===O)break;var U=F.ptr+16;if(wy(V,O,U))return Ne(V),w}return Ne(O),w},Ge=T=>{throw T},Qe=T=>{throw T};function Ye(T){return this.fromWireType(ne[T>>2])}var qe=T=>{for(;T.length;){var w=T.pop();T.pop()(w)}},Ke=T=>_y(T),Ze={},Xe={},qt={};class ft extends Error{constructor(w){super(w),this.name="BindingError"}}var Pe=T=>{throw new ft(T)},Lt={};function wo(T,w){let F=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};var O=w.name;if(T||Pe(`type "${O}" must have a positive integer typeid pointer`),qt[T]){if(F.ignoreDuplicateRegistrations)return;Pe(`Cannot register type '${O}' twice`)}if(qt[T]=w,delete Lt[T],Xe[T]){var V=Xe[T];delete Xe[T],V.forEach(U=>U())}}function Tt(T,w){return wo(T,w,arguments.length>2&&arguments[2]!==void 0?arguments[2]:{})}class Ur extends Error{constructor(w){super(w),this.name="InternalError"}}var Cr=T=>{throw new Ur(T)},Kt=(T,w,F)=>{T.forEach(we=>Lt[we]=w);function O(we){var Je=F(we);Je.length!==T.length&&Cr("Mismatched type converter count");for(var ht=0;ht<T.length;++ht)Tt(T[ht],Je[ht])}var V=Array(w.length),U=[],j=0;for(let[we,Je]of w.entries())if(qt[Je])V[we]=qt[Je];else{var te,le,ye;U.push(Je),((ye=(te=Xe)[le=Je])==null?te[le]=[]:ye).push(()=>{V[we]=qt[Je],++j,j===U.length&&O(V)})}U.length===0&&O(V)},Vt,_n=(T,w)=>Vt.fill(0,T,T+w),St=T=>{for(var w="";;){var F=Vt[T++];if(!F)return w;w+=String.fromCharCode(F)}},vn=!1,tu=()=>{},ha=T=>{T.smartPtr?T.smartPtrType.rawDestructor(T.smartPtr):T.ptrType.registeredClass.rawDestructor(T.ptr)},ru=T=>{--T.count.value,T.count.value===0&&ha(T)},Tn=T=>globalThis.FinalizationRegistry?(vn=new FinalizationRegistry(w=>{ru(w.$$)}),Tn=w=>{var F=w.$$;if(F.smartPtr){var O={$$:F};vn.register(w,O,w)}return w},tu=w=>vn.unregister(w),Tn(T)):(Tn=w=>w,T),qx=[],s$=T=>({count:T.count,deleteScheduled:T.deleteScheduled,preservePointerOnDelete:T.preservePointerOnDelete,ptr:T.ptr,ptrType:T.ptrType,smartPtr:T.smartPtr,smartPtrType:T.smartPtrType}),Tf=T=>{Pe(function(w){return w.$$.ptrType.registeredClass.name}(T)+" instance already deleted")};function ou(){}function a$(T,w,F,O,V,U,j,te){this.name=T,this.constructor=w,this.instancePrototype=F,this.rawDestructor=O,this.baseClass=V,this.getActualType=U,this.upcast=j,this.downcast=te,this.pureVirtualFunctions=[]}var wf=T=>{if(T===null)return"null";var w=typeof T;return w==="object"||w==="array"||w==="function"?T.toString():""+T},Cf=(T,w,F)=>{for(;w!==F;)w.upcast||Pe(`Expected null or instance of ${F.name}, got an instance of ${w.name}`),T=w.upcast(T),w=w.baseClass;return T};function i$(T,w){if(w===null)return this.isReference&&Pe(`null is not a valid ${this.name}`),0;w.$$||Pe(`Cannot pass "${wf(w)}" as a ${this.name}`),w.$$.ptr||Pe(`Cannot pass deleted object as a pointer of type ${this.name}`);var F=w.$$.ptrType.registeredClass;return Cf(w.$$.ptr,F,this.registeredClass)}var Kx=[],Wo=[0,1,,1,null,1,!0,1,!1,1],to={toValue:T=>(T||Pe(`Cannot use deleted val. handle = ${T}`),Wo[T]),toHandle:T=>{switch(T){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:{let w=Kx.pop()||Wo.length;return Wo[w]=T,Wo[w+1]=1,w}}}};function p$(T,w){var F;if(w===null)return this.isReference&&Pe(`null is not a valid ${this.name}`),this.isSmartPointer?(F=this.rawConstructor(),T!==null&&T.push(this.rawDestructor,F),F):0;w&&w.$$||Pe(`Cannot pass "${wf(w)}" as a ${this.name}`),w.$$.ptr||Pe(`Cannot pass deleted object as a pointer of type ${this.name}`),!this.isConst&&w.$$.ptrType.isConst&&Pe(`Cannot convert argument of type ${w.$$.smartPtrType?w.$$.smartPtrType.name:w.$$.ptrType.name} to parameter type ${this.name}`);var O=w.$$.ptrType.registeredClass;if(F=Cf(w.$$.ptr,O,this.registeredClass),this.isSmartPointer)switch(w.$$.smartPtr===void 0&&Pe("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:w.$$.smartPtrType===this?F=w.$$.smartPtr:Pe(`Cannot convert argument of type ${w.$$.smartPtrType?w.$$.smartPtrType.name:w.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:F=w.$$.smartPtr;break;case 2:if(w.$$.smartPtrType===this)F=w.$$.smartPtr;else{var V=w.clone();F=this.rawShare(F,to.toHandle(()=>V.delete())),T!==null&&T.push(this.rawDestructor,F)}break;default:Pe("Unsupported sharing policy")}return F}var jx=(T,w,F)=>{if(w===F)return T;if(F.baseClass===void 0)return null;var O=jx(T,w,F.baseClass);return O===null?null:F.downcast(O)},l$=(T,w)=>{for(w===void 0&&Pe("ptr should not be undefined");T.baseClass;)w=T.upcast(w),T=T.baseClass;return w},u$={},c$=(T,w)=>(w=l$(T,w),u$[w]),nu=(T,w)=>(w.ptrType&&w.ptr||Cr("makeClassHandle requires ptr and ptrType"),!!w.smartPtrType!=!!w.smartPtr&&Cr("Both smartPtrType and smartPtr must be specified"),w.count={value:1},Tn(Object.create(T,{$$:{value:w,writable:!0}}))),Xx={};function m$(T){var w=this.getPointee(T);if(!w)return this.destructor(T),null;var F=c$(this.registeredClass,w);if(F!==void 0){if(F.$$.count.value===0)return F.$$.ptr=w,F.$$.smartPtr=T,F.clone();var O=F.clone();return this.destructor(T),O}function V(){return this.isSmartPointer?nu(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:w,smartPtrType:this,smartPtr:T}):nu(this.registeredClass.instancePrototype,{ptrType:this,ptr:T})}var U=Xx[this.registeredClass.getActualType(w)];if(!U)return V.call(this);var j=this.isConst?U.constPointerType:U.pointerType,te=jx(w,this.registeredClass,j.registeredClass);return te===null?V.call(this):this.isSmartPointer?nu(j.registeredClass.instancePrototype,{ptrType:j,ptr:te,smartPtrType:this,smartPtr:T}):nu(j.registeredClass.instancePrototype,{ptrType:j,ptr:te})}function d$(T,w){if(w===null)return this.isReference&&Pe(`null is not a valid ${this.name}`),0;w.$$||Pe(`Cannot pass "${wf(w)}" as a ${this.name}`),w.$$.ptr||Pe(`Cannot pass deleted object as a pointer of type ${this.name}`),w.$$.ptrType.isConst&&Pe(`Cannot convert argument of type ${w.$$.ptrType.name} to parameter type ${this.name}`);var F=w.$$.ptrType.registeredClass;return Cf(w.$$.ptr,F,this.registeredClass)}function su(T,w,F,O,V,U,j,te,le,ye,we){this.name=T,this.registeredClass=w,this.isReference=F,this.isConst=O,this.isSmartPointer=V,this.pointeeType=U,this.sharingPolicy=j,this.rawGetPointee=te,this.rawConstructor=le,this.rawShare=ye,this.rawDestructor=we,!V&&w.baseClass===void 0?O?(this.toWireType=i$,this.destructorFunction=null):(this.toWireType=d$,this.destructorFunction=null):this.toWireType=p$}var Sf=(T,w)=>Object.defineProperty(w,"name",{value:T}),Qx={},f$=(T,w,F)=>{T=T.replace(/p/g,"i");var O=Qx[T];return O(w,...F)},h$=function(T,w){let F=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[];return T.includes("j")?f$(T,w,F):function(O){return O}(oe(w)(...F))},g$=(T,w)=>function(){return h$(T,w,[...arguments])},Wr=(T,w)=>{T=St(T);var F=function(){return T.includes("j")?g$(T,w):oe(w)}();return typeof F!="function"&&Pe(`unknown function pointer with signature ${T}: ${w}`),F},Yx=(T,w,F)=>{if(T[w].overloadTable===void 0){var O=T[w];T[w]=function(){var V=[...arguments];return T[w].overloadTable[V.length]||Pe(`Function '${F}' called with an invalid number of arguments (${V.length}) - expects one of (${T[w].overloadTable})!`),T[w].overloadTable[V.length].apply(this,V)},T[w].overloadTable=[],T[w].overloadTable[O.argCount]=O}},Zx=(T,w)=>Object.prototype.hasOwnProperty.call(T,w),Jx=(T,w,F)=>{Zx(o,T)?((F===void 0||o[T].overloadTable!==void 0&&o[T].overloadTable[F]!==void 0)&&Pe(`Cannot register public name '${T}' twice`),Yx(o,T,T),o[T].overloadTable[F]&&Pe(`Cannot register multiple overloads of a function with the same number of arguments (${F})!`),o[T].overloadTable[F]=w):(o[T]=w,o[T].argCount=F)},x$=T=>{T=T.replace(/[^a-zA-Z0-9_]/g,"$");var w=T.charCodeAt(0);return w>=48&&w<=57?`_${T}`:T},ey=(T,w,F)=>{Zx(o,T)||Cr("Replacing nonexistent public symbol"),o[T].overloadTable!==void 0&&F!==void 0?o[T].overloadTable[F]=w:(o[T]=w,o[T].argCount=F)};class y$ extends Error{}var ty=T=>{var w=hy(T),F=St(w);return Go(w),F},au=(T,w)=>{var F=[],O={};throw w.forEach(function V(U){O[U]||qt[U]||(Lt[U]?Lt[U].forEach(V):(F.push(U),O[U]=!0))}),new y$(`${T}: `+F.map(ty).join([", "]))};function b$(T){for(var w=1;w<T.length;++w)if(T[w]!==null&&T[w].argStackAlloc)return!0;return!1}function _$(T){for(var w=1;w<T.length;++w)if(T[w]!==null&&T[w].destructorFunction===void 0)return!0;return!1}function Nf(T,w,F,O,V,U){var j=w.length;j<2&&Pe("argTypes array size mismatch! Must at least get return value and receiver (this) types!");var te=w[1]!==null&&F!==null,le=_$(w),ye=b$(w),we=ye&&!U&&!le;ye&&!we&&(le=!0);var Je=!w[0].isVoid,ht=j-2,et=Array(ht),tt=[],wt=[];return Sf(T,function(){var Nt=[...arguments];wt.length=0;var ro;we&&(ro=ee());var oo;tt.length=te?2:1,tt[0]=V,te&&(oo=w[1].toWireType(wt,this),tt[1]=oo);for(var yt=0;yt<ht;++yt){var Co=w[yt+2];et[yt]=Co.toWireType(we&&Co.argStackAlloc?null:wt,Nt[yt]),tt.push(et[yt])}var xa=O(...tt);return we&&Y(ro),function(cu){if(le)qe(wt);else for(var So=te?1:2;So<w.length;So++){var al=So===1?oo:et[So-2];w[So].destructorFunction!==null&&w[So].destructorFunction(al)}if(Je)return w[0].fromWireType(cu)}(xa)})}var If=(T,w)=>{for(var F=[],O=0;O<T;O++)F.push(ne[w+O*4>>2]);return F},ry=T=>{T=T.trim();let w=T.indexOf("(");return w===-1?T:T.slice(0,w)},oy=[],kf=T=>{if(T>9&&--Wo[T+1]===0){var w=Wo[T];Wo[T]=void 0;var F=oy[T];F&&(oy[T]=void 0,F(w)),Kx.push(T)}},ny={name:"emscripten::val",fromWireType:T=>{var w=to.toValue(T);return kf(T),w},toWireType:(T,w)=>to.toHandle(w),readValueFromPointer:Ye,destructorFunction:null},sy,ay,v$=(T,w)=>{switch(w){case 4:return function(F){return this.fromWireType(sy[F>>2])};case 8:return function(F){return this.fromWireType(ay[F>>3])};default:throw TypeError(`invalid float width (${w}): ${T}`)}},iu,pu,nl,T$=(T,w,F)=>{switch(w){case 1:return F?O=>K[O]:O=>Vt[O];case 2:return F?O=>iu[O>>1]:O=>nl[O>>1];case 4:return F?O=>pu[O>>2]:O=>ne[O>>2];default:throw TypeError(`invalid integer width (${w}): ${T}`)}},w$=(T,w,F)=>{let O=(V,U)=>{let j=0;return{next(){if(j>=V)return{done:!0};let te=j;return j++,{value:U(te),done:!1}},[Symbol.iterator](){return this}}};T[Symbol.iterator]||(T[Symbol.iterator]=function(){let V=this[w]();return O(V,U=>this[F](U))})},C$=Object.assign({optional:!0},ny),iy=globalThis.TextDecoder&&new TextDecoder,py=(T,w,F,O)=>{var V=w+F;if(O)return V;for(;T[w]&&!(w>=V);)++w;return w},S$=function(T){let w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,F=arguments.length>2?arguments[2]:void 0,O=arguments.length>3?arguments[3]:void 0;var V=py(T,w,F,O);if(V-w>16&&T.buffer&&iy)return iy.decode(T.subarray(w,V));for(var U="";w<V;){var j=T[w++];if(!(j&128))U+=String.fromCharCode(j);else{var te=T[w++]&63;if((j&224)==192)U+=String.fromCharCode((j&31)<<6|te);else{var le=T[w++]&63;if(j=(j&240)==224?(j&15)<<12|te<<6|le:(j&7)<<18|te<<12|le<<6|T[w++]&63,j<65536)U+=String.fromCharCode(j);else{var ye=j-65536;U+=String.fromCharCode(55296|ye>>10,56320|ye&1023)}}}}return U},N$=(T,w,F)=>T?S$(Vt,T,w,F):"",I$=T=>{for(var w=0,F=0;F<T.length;++F){var O=T.codePointAt(F);O<=127?w++:O<=2047?w+=2:O<=65535?w+=3:(w+=4,F++)}return w},k$=(T,w,F,O)=>{if(!(O>0))return 0;for(var V=F,U=F+O-1,j=0;j<T.length;++j){var te=T.codePointAt(j);if(te<=127){if(F>=U)break;w[F++]=te}else if(te<=2047){if(F+1>=U)break;w[F++]=192|te>>6,w[F++]=128|te&63}else if(te<=65535){if(F+2>=U)break;w[F++]=224|te>>12,w[F++]=128|te>>6&63,w[F++]=128|te&63}else{if(F+3>=U)break;w[F++]=240|te>>18,w[F++]=128|te>>12&63,w[F++]=128|te>>6&63,w[F++]=128|te&63,j++}}return w[F]=0,F-V},E$=(T,w,F)=>k$(T,Vt,w,F),ly=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,$$=(T,w,F)=>{var O=T>>1,V=py(nl,O,w/2,F);if(V-O>16&&ly)return ly.decode(nl.subarray(O,V));for(var U="",j=O;j<V;++j){var te=nl[j];U+=String.fromCharCode(te)}return U},A$=(T,w,F)=>{for(var O="",V=T>>2,U=0;!(U>=w/4);U++){var j=ne[V+U];if(!j&&!F)break;O+=String.fromCodePoint(j)}return O},F$=T=>T.length*2,D$=T=>{for(var w=0,F=0;F<T.length;++F)T.codePointAt(F)>65535&&F++,w+=4;return w},R$=function(T,w){let F=arguments.length>2&&arguments[2]!==void 0?arguments[2]:2147483647;if(F<2)return 0;F-=2;for(var O=w,V=F<T.length*2?F/2:T.length,U=0;U<V;++U){var j=T.charCodeAt(U);iu[w>>1]=j,w+=2}return iu[w>>1]=0,w-O},O$=function(T,w){let F=arguments.length>2&&arguments[2]!==void 0?arguments[2]:2147483647;if(F<4)return 0;for(var O=w,V=O+F-4,U=0;U<T.length;++U){var j=T.codePointAt(U);if(j>65535&&U++,pu[w>>2]=j,w+=4,w+4>V)break}return pu[w>>2]=0,w-O},uy=0,Ef=[],P$=T=>{var w=Ef.length;return Ef.push(T),w},M$=(T,w)=>{var F=qt[T];return F===void 0&&Pe(`${w} has unknown type ${ty(T)}`),F},L$=(T,w)=>{for(var F=Array(T),O=0;O<T;++O)F[O]=M$(ne[w+O*4>>2],`parameter ${O}`);return F},V$=(T,w,F)=>{var O=[],V=T(O,F);return O.length&&(ne[w>>2]=to.toHandle(O)),V},B$={},cy=T=>{var w=B$[T];return w===void 0?St(T):w},my=T=>{if(T instanceof H||T=="unwind")return g;a(0,T)},dy=()=>ae||uy>0,fy=T=>{if(g=T,!dy()){var w;(w=o.onExit)==null||w.call(o,T),f=!0}a(0,new H(T))},z$=()=>{if(!dy())try{K$(g)}catch(T){my(T)}},U$=function(T){var w=[...arguments].slice(1);if(!f)try{return T(...w)}catch(F){my(F)}finally{z$()}},sl={},W$=()=>performance.now(),G$=(T,w)=>Math.ceil(T/w)*w,H$=()=>2147483648,q$=T=>{var w=(T-lu.buffer.byteLength+65535)/65536|0;try{return lu.grow(w),S(),1}catch{}},K$=T=>{g=T,fy(T)};(()=>{let T=ou.prototype;Object.assign(T,{isAliasOf(F){if(!(this instanceof ou)||!(F instanceof ou))return!1;var O=this.$$.ptrType.registeredClass,V=this.$$.ptr;F.$$=F.$$;for(var U=F.$$.ptrType.registeredClass,j=F.$$.ptr;O.baseClass;)V=O.upcast(V),O=O.baseClass;for(;U.baseClass;)j=U.upcast(j),U=U.baseClass;return O===U&&V===j},clone(){if(this.$$.ptr||Tf(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var F=Tn(Object.create(Object.getPrototypeOf(this),{$$:{value:s$(this.$$)}}));return F.$$.count.value+=1,F.$$.deleteScheduled=!1,F},delete(){this.$$.ptr||Tf(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&Pe("Object already scheduled for deletion"),tu(this),ru(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)},isDeleted(){return!this.$$.ptr},deleteLater(){return this.$$.ptr||Tf(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&Pe("Object already scheduled for deletion"),qx.push(this),qx.length,this.$$.deleteScheduled=!0,this}});let w=Symbol.dispose;w&&(T[w]=T.delete)})(),Object.assign(su.prototype,{getPointee(T){return this.rawGetPointee&&(T=this.rawGetPointee(T)),T},destructor(T){var w,F;(w=(F=this).rawDestructor)==null||w.call(F,T)},readValueFromPointer:Ye,fromWireType:m$}),o.noExitRuntime&&(ae=o.noExitRuntime),o.print&&o.print,o.printErr&&(m=o.printErr),o.wasmBinary&&(d=o.wasmBinary),o.arguments&&o.arguments,o.thisProgram&&o.thisProgram;var ga=o.preInit;if(ga)for(typeof ga=="function"&&(o.preInit=ga=[ga]);ga.length>0;)ga.shift()();var hy,$f,Go,gy,xy,He,yy,by,_y,vy,Af,Ty,wy,Cy,lu,Sy;function j$(T){hy=T.sa,$f=o._malloc=T.ta,Go=o._free=T.ua,gy=T.va,xy=T.xa,He=T.ya,yy=T.za,by=T.Aa,_y=T.Ba,vy=T.Ca,Af=T.Da,Ty=T.Ea,wy=T.Fa,Cy=Qx.iiij=T.Ga,lu=T.qa,Sy=T.wa}var X$={aa:(T,w)=>oe(T)(w),t:T=>{var w=new ce(T);return w.get_caught()||(w.set_caught(!0),Te--),w.set_rethrown(!1),he.push(w),gy(T)},J:()=>{He(0,0);var T=he.pop();Ty(T.excPtr),xe=null},a:()=>Ie([]),i:T=>Ie([T]),m:(T,w)=>Ie([T,w]),fa:()=>{he.length||D("no exception to throw");var T=he[he.length-1],w=T.excPtr;T.set_rethrown(!0),T.set_caught(!1),Te++,Af(w),w=xe=new x(w),Ge(w)},r:(T,w,F)=>{new ce(T).init(w,F),Af(T),T=xe=new x(T),Te++,Ge(T)},d:T=>{T=xe??(xe=new x(T)),Qe(T)},ea:()=>D(""),T:T=>{var w=Ze[T];delete Ze[T];var F=w.rawConstructor,O=w.rawDestructor,V=w.valueSize,U=w.isTrivial,j=w.fields,te=j.map(le=>le.getterReturnTypeID).concat(j.map(le=>le.setterArgumentTypeID));Kt([T],te,le=>{var ye={};for(var[we,Je]of j.entries()){let et=le[we],tt=Je.getter,wt=Je.getterContext,Nt=le[we+j.length],ro=Je.setter,oo=Je.setterContext;var ht=Nt.destructorFunction===null&&!Nt.argStackAlloc?(yt,Co)=>ro(oo,yt,Nt.toWireType(null,Co)):(yt,Co)=>{var xa=[];ro(oo,yt,Nt.toWireType(xa,Co)),qe(xa)};ye[Je.fieldName]={read:yt=>et.fromWireType(tt(wt,yt)),write:ht,optional:et.optional}}return[{name:w.name,fromWireType:et=>{var tt={};for(var wt in ye)tt[wt]=ye[wt].read(et);return O(et),tt},toWireType:(et,tt)=>{for(var wt in ye)if(!(wt in tt)&&!ye[wt].optional)throw TypeError(`Missing field: "${wt}"`);var Nt;for(wt in U&&!et?(Nt=Ke(V),_n(Nt,V)):(Nt=F(),et&&et.push(O,Nt)),ye)ye[wt].write(Nt,tt[wt]);return Nt},readValueFromPointer:Ye,destructorFunction:U?null:O,argStackAlloc:U}]})},W:()=>{},ia:(T,w,F,O)=>{w=St(w),Tt(T,{name:w,fromWireType:function(V){return!!V},toWireType:function(V,U){return U?F:O},readValueFromPointer:function(V){return this.fromWireType(Vt[V])},destructorFunction:null})},pa:(T,w,F,O,V,U,j,te,le,ye,we,Je,ht)=>{we=St(we),U=Wr(V,U),te&&(te=Wr(j,te)),ye&&(ye=Wr(le,ye)),ht=Wr(Je,ht);var et=x$(we);Jx(et,function(){au(`Cannot construct ${we} due to unbound types`,[O])}),Kt([T,w,F],O?[O]:[],tt=>{tt=tt[0];var wt,Nt;O?(wt=tt.registeredClass,Nt=wt.instancePrototype):Nt=ou.prototype;var ro=Sf(we,function(){var al=[...arguments];if(Object.getPrototypeOf(this)!==oo)throw new ft(`Use 'new' to construct ${we}`);if(yt.constructor_body===void 0)throw new ft(`${we} has no accessible constructor`);var Ny=yt.constructor_body[al.length];if(Ny===void 0)throw new ft(`Tried to invoke ctor of ${we} with invalid number of parameters (${al.length}) - expected (${Object.keys(yt.constructor_body).toString()}) parameters instead!`);return Ny.apply(this,al)}),oo=Object.create(Nt,{constructor:{value:ro}});ro.prototype=oo;var yt=new a$(we,ro,oo,ht,wt,U,te,ye);if(yt.baseClass){var Co;(Co=yt.baseClass).__derivedClasses!=null||(Co.__derivedClasses=[]),yt.baseClass.__derivedClasses.push(yt)}var xa=new su(we,yt,!0,!1,!1),cu=new su(we+"*",yt,!1,!1,!1),So=new su(we+" const*",yt,!1,!0,!1);return Xx[T]={pointerType:cu,constPointerType:So},ey(et,ro),[xa,cu,So]})},oa:(T,w,F,O,V,U)=>{var j=If(w,F);V=Wr(O,V),Kt([],[T],te=>{te=te[0];var le=`constructor ${te.name}`;if(te.registeredClass.constructor_body===void 0&&(te.registeredClass.constructor_body=[]),te.registeredClass.constructor_body[w-1]!==void 0)throw new ft(`Cannot register multiple constructors with identical number of parameters (${w-1}) for class '${te.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return te.registeredClass.constructor_body[w-1]=()=>{au(`Cannot construct ${te.name} due to unbound types`,j)},Kt([],j,ye=>(ye.splice(1,0,null),te.registeredClass.constructor_body[w-1]=Nf(le,ye,null,V,U),[])),[]})},E:(T,w,F,O,V,U,j,te,le)=>{var ye=If(F,O);w=St(w),w=ry(w),U=Wr(V,U),Kt([],[T],we=>{we=we[0];var Je=`${we.name}.${w}`;w.startsWith("@@")&&(w=Symbol[w.substring(2)]),te&&we.registeredClass.pureVirtualFunctions.push(w);function ht(){au(`Cannot call ${Je} due to unbound types`,ye)}var et=we.registeredClass.instancePrototype,tt=et[w];return tt===void 0||tt.overloadTable===void 0&&tt.className!==we.name&&tt.argCount===F-2?(ht.argCount=F-2,ht.className=we.name,et[w]=ht):(Yx(et,w,Je),et[w].overloadTable[F-2]=ht),Kt([],ye,wt=>{var Nt=Nf(Je,wt,we,U,j,le);return et[w].overloadTable===void 0?(Nt.argCount=F-2,et[w]=Nt):et[w].overloadTable[F-2]=Nt,[]}),[]})},ga:T=>Tt(T,ny),Q:(T,w,F)=>{w=St(w),Tt(T,{name:w,fromWireType:O=>O,toWireType:(O,V)=>V,readValueFromPointer:v$(w,F),destructorFunction:null})},R:(T,w,F,O,V,U,j)=>{var te=If(w,F);T=St(T),T=ry(T),V=Wr(O,V),Jx(T,function(){au(`Cannot call ${T} due to unbound types`,te)},w-1),Kt([],te,le=>{var ye=[le[0],null].concat(le.slice(1));return ey(T,Nf(T,ye,null,V,U,j),w-1),[]})},y:(T,w,F,O,V)=>{w=St(w);let U=O===0,j=le=>le;if(U){var te=32-8*F;j=le=>le<<te>>>te,V=j(V)}Tt(T,{name:w,fromWireType:j,toWireType:(le,ye)=>ye,readValueFromPointer:T$(w,F,O!==0),destructorFunction:null})},ka:(T,w,F,O)=>{F=St(F),O=St(O),Kt([],[T,w],V=>{let U=V[0];return w$(U.registeredClass.instancePrototype,F,O),[]})},u:(T,w,F)=>{var O=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][w];function V(U){var j=ne[U>>2],te=ne[U+4>>2];return new O(K.buffer,te,j)}F=St(F),Tt(T,{name:F,fromWireType:V,readValueFromPointer:V},{ignoreDuplicateRegistrations:!0})},S:T=>{Tt(T,C$)},ha:(T,w)=>{w=St(w),Tt(T,{name:w,fromWireType(F){var O=ne[F>>2],V=N$(F+4,O,!0);return Go(F),V},toWireType(F,O){O instanceof ArrayBuffer&&(O=new Uint8Array(O));var V,U=typeof O=="string";U||ArrayBuffer.isView(O)&&O.BYTES_PER_ELEMENT==1||Pe("Cannot pass non-string to std::string"),V=U?I$(O):O.length;var j=$f(4+V+1),te=j+4;return ne[j>>2]=V,U?E$(O,te,V+1):Vt.set(O,te),F!==null&&F.push(Go,j),j},readValueFromPointer:Ye,destructorFunction(F){Go(F)}})},L:(T,w,F)=>{F=St(F);var O,V,U;w===2?(O=$$,V=R$,U=F$):(O=A$,V=O$,U=D$),Tt(T,{name:F,fromWireType:j=>{var te=ne[j>>2],le=O(j+4,te*w,!0);return Go(j),le},toWireType:(j,te)=>{typeof te!="string"&&Pe(`Cannot pass non-string to C++ string type ${F}`);var le=U(te),ye=$f(4+le+w);return ne[ye>>2]=le/w,V(te,ye+4,le+w),j!==null&&j.push(Go,ye),ye},readValueFromPointer:Ye,destructorFunction(j){Go(j)}})},C:(T,w,F,O,V,U,j,te)=>{Ze[T]={name:St(w),rawConstructor:Wr(F,O),rawDestructor:Wr(V,U),valueSize:j,isTrivial:!!te,fields:[]}},U:(T,w,F,O,V,U,j,te,le,ye)=>{Ze[T].fields.push({fieldName:St(w),getterReturnTypeID:F,getter:Wr(O,V),getterContext:U,setterArgumentTypeID:j,setter:Wr(te,le),setterContext:ye})},ja:(T,w)=>{w=St(w),Tt(T,{isVoid:!0,name:w,fromWireType:()=>{},toWireType:()=>{}})},da:()=>{ae=!1,uy=0},na:(T,w,F)=>{var[O,...V]=L$(T,w),U=O.toWireType.bind(O),j=V.map(le=>le.readValueFromPointer.bind(le));T--;var te=Array(T);return P$(Sf(`methodCaller<(${V.map(le=>le.name)}) => ${O.name}>`,(le,ye,we,Je)=>{for(var ht=0,et=0;et<T;++et)te[et]=j[et](Je+ht),ht+=8;var tt;switch(F){case 0:tt=to.toValue(le)(...te);break;case 2:tt=Reflect.construct(to.toValue(le),te);break;case 3:tt=te[0];break;case 1:tt=to.toValue(le)[cy(ye)](...te)}return V$(U,we,tt)}))},ba:kf,B:T=>T?(T=cy(T),to.toHandle(globalThis[T])):to.toHandle(globalThis),P:T=>{T>9&&(Wo[T+1]+=1)},ma:(T,w,F,O,V)=>Ef[T](w,F,O,V),la:T=>{qe(to.toValue(T)),kf(T)},_:(T,w)=>(sl[T]&&(clearTimeout(sl[T].id),delete sl[T]),w&&(sl[T]={id:setTimeout(()=>{delete sl[T],U$(xy,T,W$())},w),timeout_ms:w}),0),$:T=>{var w=Vt.length;T>>>=0;var F=H$();if(T>F)return!1;for(var O=1;O<=4;O*=2){var V=w*(1+.2/O);if(V=Math.min(V,T+100663296),q$(Math.min(F,G$(Math.max(T,V),65536))))return!0}return!1},Z:function(T,w,F){var O=ee();try{return oe(T)(w,F)}catch(V){if(Y(O),!(V instanceof h))throw V;He(1,0)}},N:function(T,w,F,O){var V=ee();try{return oe(T)(w,F,O)}catch(U){if(Y(V),!(U instanceof h))throw U;He(1,0)}},A:function(T,w,F,O,V,U){var j=ee();try{return oe(T)(w,F,O,V,U)}catch(te){if(Y(j),!(te instanceof h))throw te;He(1,0)}},b:function(T,w){var F=ee();try{return oe(T)(w)}catch(O){if(Y(F),!(O instanceof h))throw O;He(1,0)}},z:function(T,w,F,O){var V=ee();try{return oe(T)(w,F,O)}catch(U){if(Y(V),!(U instanceof h))throw U;He(1,0)}},h:function(T,w,F){var O=ee();try{return oe(T)(w,F)}catch(V){if(Y(O),!(V instanceof h))throw V;He(1,0)}},D:function(T,w,F,O,V){var U=ee();try{return oe(T)(w,F,O,V)}catch(j){if(Y(U),!(j instanceof h))throw j;He(1,0)}},g:function(T,w,F,O){var V=ee();try{return oe(T)(w,F,O)}catch(U){if(Y(V),!(U instanceof h))throw U;He(1,0)}},l:function(T,w,F,O,V){var U=ee();try{return oe(T)(w,F,O,V)}catch(j){if(Y(U),!(j instanceof h))throw j;He(1,0)}},n:function(T,w,F,O,V,U){var j=ee();try{return oe(T)(w,F,O,V,U)}catch(te){if(Y(j),!(te instanceof h))throw te;He(1,0)}},K:function(T,w,F,O,V,U,j){var te=ee();try{return oe(T)(w,F,O,V,U,j)}catch(le){if(Y(te),!(le instanceof h))throw le;He(1,0)}},O:function(T,w,F,O,V,U,j){var te=ee();try{return oe(T)(w,F,O,V,U,j)}catch(le){if(Y(te),!(le instanceof h))throw le;He(1,0)}},I:function(T,w,F,O,V,U,j,te){var le=ee();try{return oe(T)(w,F,O,V,U,j,te)}catch(ye){if(Y(le),!(ye instanceof h))throw ye;He(1,0)}},H:function(T,w,F,O,V,U,j,te,le){var ye=ee();try{return oe(T)(w,F,O,V,U,j,te,le)}catch(we){if(Y(ye),!(we instanceof h))throw we;He(1,0)}},V:function(T,w,F,O,V){var U=ee();try{return Cy(T,w,F,O,V)}catch(j){if(Y(U),!(j instanceof h))throw j;He(1,0)}},c:function(T){var w=ee();try{oe(T)()}catch(F){if(Y(w),!(F instanceof h))throw F;He(1,0)}},j:function(T,w){var F=ee();try{oe(T)(w)}catch(O){if(Y(F),!(O instanceof h))throw O;He(1,0)}},X:function(T,w,F){var O=ee();try{oe(T)(w,F)}catch(V){if(Y(O),!(V instanceof h))throw V;He(1,0)}},e:function(T,w,F){var O=ee();try{oe(T)(w,F)}catch(V){if(Y(O),!(V instanceof h))throw V;He(1,0)}},M:function(T,w,F,O,V,U,j,te,le){var ye=ee();try{oe(T)(w,F,O,V,U,j,te,le)}catch(we){if(Y(ye),!(we instanceof h))throw we;He(1,0)}},G:function(T,w,F,O,V){var U=ee();try{oe(T)(w,F,O,V)}catch(j){if(Y(U),!(j instanceof h))throw j;He(1,0)}},f:function(T,w,F,O){var V=ee();try{oe(T)(w,F,O)}catch(U){if(Y(V),!(U instanceof h))throw U;He(1,0)}},F:function(T,w,F,O,V,U,j){var te=ee();try{oe(T)(w,F,O,V,U,j)}catch(le){if(Y(te),!(le instanceof h))throw le;He(1,0)}},k:function(T,w,F,O,V){var U=ee();try{oe(T)(w,F,O,V)}catch(j){if(Y(U),!(j instanceof h))throw j;He(1,0)}},Y:function(T,w,F,O,V,U,j,te){var le=ee();try{oe(T)(w,F,O,V,U,j,te)}catch(ye){if(Y(le),!(ye instanceof h))throw ye;He(1,0)}},o:function(T,w,F,O,V,U){var j=ee();try{oe(T)(w,F,O,V,U)}catch(te){if(Y(j),!(te instanceof h))throw te;He(1,0)}},s:function(T,w,F,O,V,U,j){var te=ee();try{oe(T)(w,F,O,V,U,j)}catch(le){if(Y(te),!(le instanceof h))throw le;He(1,0)}},x:function(T,w,F,O,V,U,j,te){var le=ee();try{oe(T)(w,F,O,V,U,j,te)}catch(ye){if(Y(le),!(ye instanceof h))throw ye;He(1,0)}},q:function(T,w,F,O,V,U,j,te,le){var ye=ee();try{oe(T)(w,F,O,V,U,j,te,le)}catch(we){if(Y(ye),!(we instanceof h))throw we;He(1,0)}},v:function(T,w,F,O,V,U,j,te,le,ye){var we=ee();try{oe(T)(w,F,O,V,U,j,te,le,ye)}catch(Je){if(Y(we),!(Je instanceof h))throw Je;He(1,0)}},p:function(T,w,F,O,V,U,j,te,le,ye,we){var Je=ee();try{oe(T)(w,F,O,V,U,j,te,le,ye,we)}catch(ht){if(Y(Je),!(ht instanceof h))throw ht;He(1,0)}},w:T=>T,ca:fy},uu=await async function(){function T(O){return uu=O.exports,j$(uu),S(),uu}var w=q(),F=o.instantiateWasm;return F?new Promise(O=>{F(w,V=>O(T(V)))}):(R!=null||(R=M()),function(O){return T(O.instance)}(await G(d,R,w)))}();return await async function(){var T;C();var w=o.setStatus;w&&(w("Running..."),await new Promise(F=>setTimeout(F,1)),setTimeout(w,1,"")),f||($(),(T=o.onRuntimeInitialized)==null||T.call(o),A())}(),o}function o$(r){return Gx(r$,r)}async function n$(r,e){return t$(r$,r,e)}var vf=null;async function rq(r){if(vf)return;let e=!1;try{e=await uh("webgl")}catch{e=!1}e||await uh("cpu"),await ib(),vf=await zx(ea.fromMemory({modelTopology:ol.modelTopology,weightSpecs:ol.weightSpecs,weightData:r,format:ol.format,generatedBy:ol.generatedBy,convertedBy:ol.convertedBy})),Se(()=>vf.predict(yr([1,224,224,3])))}async function oq(r){let e=Se(()=>{let o=Fe(Re(Gc.fromPixels(r),"float32"),255),n=vf.predict(z(o,[1,224,224,3]));return vc(De(n,[0,1],[-1,1e3]))}),t=await e.data();return e.dispose(),t}var Hx=null;function nq(r){return Hx||(Hx=o$({overrides:{wasmBinary:r},fireImmediately:!0})),Hx}async function sq(r){return(await n$(r,{formats:["EANUPC"],tryHarder:!0,tryRotate:!0,tryInvert:!0,maxNumberOfSymbols:2})).filter(t=>t.isValid&&/^\d{8,14}$/.test(t.text)).map(t=>t.text)}window.SAQTA_AI={load:rq,classify:oq,backend:()=>Ou(),loadBarcode:nq,barcodes:sq};})();
