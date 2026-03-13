(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[390],{2110:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>c});var s=a(7876),r=a(4232),n=a(7596),l=a(9188);let i=({chapterss:e})=>{let[t,a]=(0,r.useState)(e),[n,l]=(0,r.useState)(null);return(0,s.jsxs)("div",{id:"guitarLessonPage",children:[(0,s.jsxs)("div",{className:"sidebar",children:[(0,s.jsx)("h2",{children:"Chapters"}),(0,s.jsx)("ul",{className:"bonobo",children:t.map(e=>(0,s.jsx)("li",{children:(0,s.jsxs)("button",{onClick:()=>{e.locked||l(e)},className:"chapter-button",disabled:e.locked,children:[e," ",e.locked&&"(Locked)"]})},e.id))})]}),(0,s.jsxs)("div",{className:"content",children:[(0,s.jsx)("h1",{className:"header",children:"Cozy Cyberpunk Guitar Lessons"}),(0,s.jsx)("p",{className:"subtitle",children:"Relax and learn with a gentle neon glow"}),(0,s.jsxs)("div",{className:"lesson-box",children:[n?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"lesson-title",children:t.find(e=>e===n).title}),(0,s.jsxs)("div",{className:"lesson-content",children:["Content for ",t.find(e=>e===n)," will appear here."]})]}):(0,s.jsx)("p",{children:"Select a chapter to begin."}),(0,s.jsx)("button",{className:"start-button",onClick:()=>{console.log("ssss",n),null!==n&&(window.location.href=`/Chapters/${n}/1`)},disabled:!n,children:n?"Start Lesson":"Select a Chapter"})]})]})]})};var o=a(8908);let d=async e=>{let t=localStorage.getItem("accessToken");if(!t)throw Error("NO_TOKEN");let a=await fetch(e,{headers:{Authorization:`Bearer ${t}`}});if(!a.ok)throw Error(await a.text());return a.json()};function c(){let e=(0,r.useMemo)(()=>localStorage.getItem("accessToken")?"/api/lessons/chapters-with-numbers":null,[]),{data:t,error:a,isLoading:c}=(0,n.Ay)(e,d,{revalidateOnFocus:!1,dedupingInterval:6e5});return(0,s.jsxs)(l.A,{children:[c&&(0,s.jsx)(o.A,{}),a&&"NO_TOKEN"!==a.message&&(0,s.jsxs)("p",{children:["Error: ",a.message]}),t&&(0,s.jsx)(i,{chapterss:Object.keys(t)})]})}},7834:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/Chapters",function(){return a(2110)}])},8908:(e,t,a)=>{"use strict";a.d(t,{A:()=>n});var s=a(7876),r=a(4232);let n=()=>{let e=(0,r.useRef)(null),t={width:"300px",height:"4px",background:"#fff",borderRadius:"2px",transformOrigin:"left center"};return(0,r.useEffect)(()=>{let e=document.createElement("style");return e.type="text/css",e.innerText=`
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
    `,document.head.appendChild(e),()=>{document.head.removeChild(e)}},[]),(0,r.useEffect)(()=>{let t=setInterval(()=>{if(e.current){let t,a,s,r=Array.from(e.current.children),n=Math.floor(Math.random()*r.length);t=r[n].getBoundingClientRect(),(a=document.createElement("div")).className="note",a.textContent=(s=["\uD83C\uDFB5","\uD83C\uDFB6","♩","♪","♫"])[Math.floor(Math.random()*s.length)],a.style.left=t.left+t.width+"px",a.style.bottom=window.innerHeight-t.top-t.height/2+"px",document.body.appendChild(a),setTimeout(()=>{a.style.transform="translateY(-120px) translateX(150px)",a.style.opacity="0"},10),a.addEventListener("animationend",()=>{a.remove()})}},300);return()=>clearInterval(t)},[]),(0,s.jsx)("div",{style:{background:"#222",display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",overflow:"hidden",position:"relative"},children:(0,s.jsx)("div",{style:{position:"relative"},children:(0,s.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},ref:e,id:"strings",children:[(0,s.jsx)("div",{className:"string",style:t}),(0,s.jsx)("div",{className:"string",style:t}),(0,s.jsx)("div",{className:"string",style:t}),(0,s.jsx)("div",{className:"string",style:t}),(0,s.jsx)("div",{className:"string",style:t})]})})})}},9188:(e,t,a)=>{"use strict";a.d(t,{A:()=>l});var s=a(6879),r=a(9099),n=a(4232);function l({children:e}){let{connected:t,loading:a}=(0,s.A)(),l=(0,r.useRouter)();return((0,n.useEffect)(()=>{a||t||l.replace("/login")},[a,t,l]),a||!t)?null:e}}},e=>{e.O(0,[596,636,593,792],()=>e(e.s=7834)),_N_E=e.O()}]);