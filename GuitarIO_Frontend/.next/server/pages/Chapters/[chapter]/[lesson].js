"use strict";(()=>{var a={};a.id=983,a.ids=[983],a.modules={361:a=>{a.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},2015:a=>{a.exports=require("react")},2326:a=>{a.exports=require("react-dom")},2507:(a,b,c)=>{c.a(a,async(a,d)=>{try{c.r(b),c.d(b,{config:()=>q,default:()=>m,getServerSideProps:()=>p,getStaticPaths:()=>o,getStaticProps:()=>n,handler:()=>y,reportWebVitals:()=>r,routeModule:()=>x,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>w,unstable_getStaticParams:()=>u,unstable_getStaticPaths:()=>t,unstable_getStaticProps:()=>s});var e=c(3885),f=c(237),g=c(1413),h=c(2572),i=c(1548),j=c(8375),k=c(2289),l=a([i,j]);[i,j]=l.then?(await l)():l;let m=(0,g.M)(j,"default"),n=(0,g.M)(j,"getStaticProps"),o=(0,g.M)(j,"getStaticPaths"),p=(0,g.M)(j,"getServerSideProps"),q=(0,g.M)(j,"config"),r=(0,g.M)(j,"reportWebVitals"),s=(0,g.M)(j,"unstable_getStaticProps"),t=(0,g.M)(j,"unstable_getStaticPaths"),u=(0,g.M)(j,"unstable_getStaticParams"),v=(0,g.M)(j,"unstable_getServerProps"),w=(0,g.M)(j,"unstable_getServerSideProps"),x=new e.PagesRouteModule({definition:{kind:f.RouteKind.PAGES,page:"/Chapters/[chapter]/[lesson]",pathname:"/Chapters/[chapter]/[lesson]",bundlePath:"",filename:""},distDir:".next",relativeProjectDir:"",components:{App:i.default,Document:h.default},userland:j}),y=(0,k.U)({srcPage:"/Chapters/[chapter]/[lesson]",config:q,userland:j,routeModule:x,getStaticPaths:o,getStaticProps:n,getServerSideProps:p});d()}catch(a){d(a)}})},2564:a=>{a.exports=import("jwt-decode")},2971:(a,b,c)=>{c.d(b,{A:()=>f});var d=c(8732),e=c(2015);let f=()=>{let a=(0,e.useRef)(null),b={width:"300px",height:"4px",background:"#fff",borderRadius:"2px",transformOrigin:"left center"};return(0,e.useEffect)(()=>{let a=document.createElement("style");return a.type="text/css",a.innerText=`
      @keyframes waveOverlap1 {
        0%,100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-3px) rotate(0.3deg); }
        50% { transform: translateY(0) rotate(-0.3deg); }
        75% { transform: translateY(3px) rotate(0.3deg); }
      }
      @keyframes waveOverlap2 {
        0%,100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(2px) rotate(0.2deg); }
        50% { transform: translateY(0) rotate(-0.2deg); }
        75% { transform: translateY(-2px) rotate(0.2deg); }
      }
      @keyframes waveOverlap3 {
        0%,100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-1.5px) rotate(0.1deg); }
        50% { transform: translateY(0) rotate(0); }
        75% { transform: translateY(1.5px) rotate(-0.1deg); }
      }
      @keyframes waveOverlap4 {
        0%,100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(3.5px) rotate(0.4deg); }
        50% { transform: translateY(0) rotate(-0.4deg); }
        75% { transform: translateY(-3.5px) rotate(0.4deg); }
      }
      @keyframes waveOverlap5 {
        0%,100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-2.5px) rotate(0.25deg); }
        50% { transform: translateY(0) rotate(0); }
        75% { transform: translateY(2.5px) rotate(-0.25deg); }
      }
      /* Assign animations for overlapping wave effect */
      .string:nth-child(1) {
        animation: waveOverlap1 2s infinite ease-in-out;
      }
      .string:nth-child(2) {
        animation: waveOverlap2 2.2s infinite ease-in-out;
      }
      .string:nth-child(3) {
        animation: waveOverlap3 2.4s infinite ease-in-out;
      }
      .string:nth-child(4) {
        animation: waveOverlap4 2.6s infinite ease-in-out;
      }
      .string:nth-child(5) {
        animation: waveOverlap5 2.8s infinite ease-in-out;
      }

      /* Style for musical note symbols */
      .note {
        position: absolute;
        font-size: 24px;
        font-family: Arial, sans-serif;
        color: yellow;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        pointer-events: none;
        animation: floatNote 2s forwards;
      }

      @keyframes floatNote {
        0% {
          opacity: 1;
          transform: translateY(0) translateX(0) scale(1);
        }
        50% {
          opacity: 1;
          transform: translateY(-80px) translateX(100px) scale(1.2);
        }
        100% {
          opacity: 0;
          transform: translateY(-120px) translateX(150px) scale(0.8);
        }
      }
    `,document.head.appendChild(a),()=>{document.head.removeChild(a)}},[]),(0,e.useEffect)(()=>{let b=setInterval(()=>{if(a.current){let b,c,d,e=Array.from(a.current.children),f=Math.floor(Math.random()*e.length);b=e[f].getBoundingClientRect(),(c=document.createElement("div")).className="note",c.textContent=(d=["\uD83C\uDFB5","\uD83C\uDFB6","♩","♪","♫"])[Math.floor(Math.random()*d.length)],c.style.left=b.left+b.width+"px",c.style.bottom=window.innerHeight-b.top-b.height/2+"px",document.body.appendChild(c),setTimeout(()=>{c.style.transform="translateY(-120px) translateX(150px)",c.style.opacity="0"},10),c.addEventListener("animationend",()=>{c.remove()})}},300);return()=>clearInterval(b)},[]),(0,d.jsx)("div",{style:{background:"#222",display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",overflow:"hidden",position:"relative"},children:(0,d.jsx)("div",{style:{position:"relative"},children:(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},ref:a,id:"strings",children:[(0,d.jsx)("div",{className:"string",style:b}),(0,d.jsx)("div",{className:"string",style:b}),(0,d.jsx)("div",{className:"string",style:b}),(0,d.jsx)("div",{className:"string",style:b}),(0,d.jsx)("div",{className:"string",style:b})]})})})}},3873:a=>{a.exports=require("path")},4075:a=>{a.exports=require("zlib")},4078:a=>{a.exports=import("swr")},6060:a=>{a.exports=require("next/dist/shared/lib/no-fallback-error.external.js")},6472:a=>{a.exports=require("@opentelemetry/api")},7910:a=>{a.exports=require("stream")},8375:(a,b,c)=>{c.a(a,async(a,d)=>{try{c.r(b),c.d(b,{default:()=>m,getServerSideProps:()=>n});var e=c(8732),f=c(4078),g=c(9918),h=c.n(g),i=c(4233),j=c(2971),k=c(8127),l=a([f,k]);[f,k]=l.then?(await l)():l;let o=async a=>{let b=localStorage.getItem("accessToken"),c=await fetch(a,{headers:b?{Authorization:`Bearer ${b}`}:{}});if(!c.ok)throw Error(await c.text());return c.json()};function m({chapter:a,lesson:b}){console.log("chapter:",a,"lesson:",b),(0,i.useRouter)();let c=parseInt(b,10),d=decodeURIComponent(a),g=`/api/lessons/${encodeURIComponent(d)}/${c}`,{data:l,error:m,isLoading:n}=(0,f.default)(g,o,{revalidateOnFocus:!1,dedupingInterval:6e4}),{data:p}=(0,f.default)("/api/lessons/chapters-with-numbers",o,{revalidateOnFocus:!1,dedupingInterval:6e5});if(console.log("chaptersIndex:",p),n)return(0,e.jsx)(j.A,{});if(m)return(0,e.jsxs)("p",{children:["Error: ",m.message]});let q=(l?.content||"").replace(/\\n/g,"\n"),r=c+1,s=`/Chapters/${encodeURIComponent(d)}/${r}`,t=`/api/lessons/${encodeURIComponent(d)}/${r}`,u=p?.[d]||[],v=u.includes(r);return console.log("hasNext:",v,"nextNum:",r,"lessonNumbers:",u),(0,e.jsx)(k.A,{children:(0,e.jsxs)("div",{className:"lessonss",children:[(0,e.jsx)("div",{className:"titel1",style:{width:"0"},children:(0,e.jsxs)("h2",{children:[a," Lesson"]})}),(0,e.jsxs)("div",{id:"celeste",children:[(0,e.jsx)("div",{className:"top-left"}),(0,e.jsx)("div",{className:"bottom-right"}),(0,e.jsx)("div",{className:"celeste2",children:(0,e.jsx)("div",{className:"celeste3",children:(0,e.jsxs)("div",{className:"celeste4",children:[(0,e.jsx)("div",{className:"celeste-write",children:q?q.split(/\r?\n/).map((a,b)=>(0,e.jsxs)("span",{children:[a,(0,e.jsx)("br",{})]},b)):(0,e.jsx)("p",{children:"No lesson content available."})}),(0,e.jsxs)("div",{className:"celeste5",children:[(0,e.jsx)("div",{className:"celeste-iconn",children:(0,e.jsxs)("div",{className:"celeste-iconnn",style:{backgroundImage:"url(https://r4.wallpaperflare.com/wallpaper/981/624/44/bocchi-the-rock-hitori-bocchi-guitar-forest-vertical-hd-wallpaper-e30a33aae8658cad98a29e7371f82261.jpg)"},children:[(0,e.jsx)("div",{className:"celeste-iconnnn"}),(0,e.jsx)("div",{className:"celeste-ball1"})]})}),(0,e.jsxs)("div",{className:"celeste-lyrics",children:[(0,e.jsx)("sup",{children:"Already finished "}),(0,e.jsx)("h1",{children:"Go to the next lesson"}),(0,e.jsx)("sub",{children:v?(0,e.jsx)(h(),{href:s,onMouseEnter:()=>{v&&(0,f.mutate)(t,o(t),!1)},children:"Next lesson →"}):(0,e.jsx)(h(),{href:"/Chapters",children:(0,e.jsx)("span",{style:{opacity:.6},children:"Last lesson ✔ Next Chapter"})})})]})]})]})})})]})]})})}async function n(a){let{chapter:b,lesson:c}=a.params;return{props:{chapter:b,lesson:c}}}d()}catch(a){d(a)}})},8732:a=>{a.exports=require("react/jsx-runtime")},9021:a=>{a.exports=require("fs")}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[13,124,79,781,676],()=>b(b.s=2507));module.exports=c})();