(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[983],{3760:(e,t,s)=>{"use strict";s.r(t),s.d(t,{__N_SSP:()=>h,default:()=>m});var a=s(7876),r=s(7596),n=s(9829),l=s(8230),i=s.n(l),o=s(9099),c=s(8908),d=s(9188);let p=async e=>{let t=localStorage.getItem("accessToken"),s=await fetch(e,{headers:t?{Authorization:`Bearer ${t}`}:{}});if(!s.ok)throw Error(await s.text());return s.json()};var h=!0;function m({chapter:e,lesson:t}){console.log("chapter:",e,"lesson:",t),(0,o.useRouter)();let s=parseInt(t,10),l=decodeURIComponent(e),h=`/api/lessons/${encodeURIComponent(l)}/${s}`,{data:m,error:f,isLoading:x}=(0,r.Ay)(h,p,{revalidateOnFocus:!1,dedupingInterval:6e4}),{data:u}=(0,r.Ay)("/api/lessons/chapters-with-numbers",p,{revalidateOnFocus:!1,dedupingInterval:6e5});if(console.log("chaptersIndex:",u),x)return(0,a.jsx)(c.A,{});if(f)return(0,a.jsxs)("p",{children:["Error: ",f.message]});let v=(m?.content||"").replace(/\\n/g,"\n"),g=s+1,y=`/Chapters/${encodeURIComponent(l)}/${g}`,j=`/api/lessons/${encodeURIComponent(l)}/${g}`,w=u?.[l]||[],N=w.includes(g);return console.log("hasNext:",N,"nextNum:",g,"lessonNumbers:",w),(0,a.jsx)(d.A,{children:(0,a.jsxs)("div",{className:"lessonss",children:[(0,a.jsx)("div",{className:"titel1",style:{width:"0"},children:(0,a.jsxs)("h2",{children:[e," Lesson"]})}),(0,a.jsxs)("div",{id:"celeste",children:[(0,a.jsx)("div",{className:"top-left"}),(0,a.jsx)("div",{className:"bottom-right"}),(0,a.jsx)("div",{className:"celeste2",children:(0,a.jsx)("div",{className:"celeste3",children:(0,a.jsxs)("div",{className:"celeste4",children:[(0,a.jsx)("div",{className:"celeste-write",children:v?v.split(/\r?\n/).map((e,t)=>(0,a.jsxs)("span",{children:[e,(0,a.jsx)("br",{})]},t)):(0,a.jsx)("p",{children:"No lesson content available."})}),(0,a.jsxs)("div",{className:"celeste5",children:[(0,a.jsx)("div",{className:"celeste-iconn",children:(0,a.jsxs)("div",{className:"celeste-iconnn",style:{backgroundImage:"url(https://r4.wallpaperflare.com/wallpaper/981/624/44/bocchi-the-rock-hitori-bocchi-guitar-forest-vertical-hd-wallpaper-e30a33aae8658cad98a29e7371f82261.jpg)"},children:[(0,a.jsx)("div",{className:"celeste-iconnnn"}),(0,a.jsx)("div",{className:"celeste-ball1"})]})}),(0,a.jsxs)("div",{className:"celeste-lyrics",children:[(0,a.jsx)("sup",{children:"Already finished "}),(0,a.jsx)("h1",{children:"Go to the next lesson"}),(0,a.jsx)("sub",{children:N?(0,a.jsx)(i(),{href:y,onMouseEnter:()=>{N&&(0,n.j)(j,p(j),!1)},children:"Next lesson →"}):(0,a.jsx)(i(),{href:"/Chapters",children:(0,a.jsx)("span",{style:{opacity:.6},children:"Last lesson ✔ Next Chapter"})})})]})]})]})})})]})]})})}},7478:(e,t,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/Chapters/[chapter]/[lesson]",function(){return s(3760)}])},8908:(e,t,s)=>{"use strict";s.d(t,{A:()=>n});var a=s(7876),r=s(4232);let n=()=>{let e=(0,r.useRef)(null),t={width:"300px",height:"4px",background:"#fff",borderRadius:"2px",transformOrigin:"left center"};return(0,r.useEffect)(()=>{let e=document.createElement("style");return e.type="text/css",e.innerText=`
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
    `,document.head.appendChild(e),()=>{document.head.removeChild(e)}},[]),(0,r.useEffect)(()=>{let t=setInterval(()=>{if(e.current){let t,s,a,r=Array.from(e.current.children),n=Math.floor(Math.random()*r.length);t=r[n].getBoundingClientRect(),(s=document.createElement("div")).className="note",s.textContent=(a=["\uD83C\uDFB5","\uD83C\uDFB6","♩","♪","♫"])[Math.floor(Math.random()*a.length)],s.style.left=t.left+t.width+"px",s.style.bottom=window.innerHeight-t.top-t.height/2+"px",document.body.appendChild(s),setTimeout(()=>{s.style.transform="translateY(-120px) translateX(150px)",s.style.opacity="0"},10),s.addEventListener("animationend",()=>{s.remove()})}},300);return()=>clearInterval(t)},[]),(0,a.jsx)("div",{style:{background:"#222",display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",overflow:"hidden",position:"relative"},children:(0,a.jsx)("div",{style:{position:"relative"},children:(0,a.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},ref:e,id:"strings",children:[(0,a.jsx)("div",{className:"string",style:t}),(0,a.jsx)("div",{className:"string",style:t}),(0,a.jsx)("div",{className:"string",style:t}),(0,a.jsx)("div",{className:"string",style:t}),(0,a.jsx)("div",{className:"string",style:t})]})})})}},9188:(e,t,s)=>{"use strict";s.d(t,{A:()=>l});var a=s(6879),r=s(9099),n=s(4232);function l({children:e}){let{connected:t,loading:s}=(0,a.A)(),l=(0,r.useRouter)();return((0,n.useEffect)(()=>{s||t||l.replace("/login")},[s,t,l]),s||!t)?null:e}}},e=>{e.O(0,[596,636,593,792],()=>e(e.s=7478)),_N_E=e.O()}]);