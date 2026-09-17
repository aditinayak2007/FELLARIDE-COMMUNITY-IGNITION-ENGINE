(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const U="modulepreload",z=function(e,r){return new URL(e,r).href},O={},M=function(r,n,i){let t=Promise.resolve();if(n&&n.length>0){const s=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));t=Promise.allSettled(n.map(d=>{if(d=z(d,i),d in O)return;O[d]=!0;const u=d.endsWith(".css"),b=u?'[rel="stylesheet"]':"";if(!!i)for(let f=s.length-1;f>=0;f--){const m=s[f];if(m.href===d&&(!u||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${b}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":U,u||(g.as="script"),g.crossOrigin="",g.href=d,c&&g.setAttribute("nonce",c),document.head.appendChild(g),u)return new Promise((f,m)=>{g.addEventListener("load",f),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return t.then(s=>{for(const a of s||[])a.status==="rejected"&&o(a.reason);return r().catch(o)})},A=[{name:"Kavoor",lat:12.8845,lng:74.849,population:400},{name:"Kottara",lat:12.892,lng:74.838,population:350},{name:"Bendoor",lat:12.878,lng:74.835,population:300},{name:"Surathkal",lat:12.9916,lng:74.8095,population:450},{name:"Kadri",lat:12.875,lng:74.853,population:350},{name:"Bejai",lat:12.887,lng:74.845,population:300},{name:"Falnir",lat:12.865,lng:74.842,population:250},{name:"Kankanady",lat:12.87,lng:74.856,population:350},{name:"Hampankatta",lat:12.871,lng:74.843,population:280},{name:"Attavar",lat:12.873,lng:74.848,population:200},{name:"Jeppu",lat:12.858,lng:74.837,population:250},{name:"Kulur",lat:12.91,lng:74.82,population:300},{name:"Bajpe",lat:12.912,lng:74.89,population:250},{name:"Mulki",lat:13.097,lng:74.793,population:200},{name:"Moodbidri",lat:12.958,lng:74.993,population:170}],P=[{name:"St. Aloysius Campus",lat:12.8698,lng:74.8432},{name:"Mangalore University Campus",lat:12.8083,lng:74.9318}],D={name:"St. Aloysius University",population:5e3,id:"STALO"};function B(e){return function(){var r=e+=1831565813;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}const y=B(12345);function L(e,r){let n=r.reduce((t,o)=>t+o,0),i=y()*n;for(let t=0;t<e.length;t++){if(i<r[t])return e[t];i-=r[t]}return e[e.length-1]}function j(e,r,n,i){const o=(n-e)*Math.PI/180,s=(i-r)*Math.PI/180,a=Math.sin(o/2)*Math.sin(o/2)+Math.cos(e*Math.PI/180)*Math.cos(n*Math.PI/180)*Math.sin(s/2)*Math.sin(s/2);return 6371*(2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)))}const V=["CS Department","Commerce Faculty","Science Club","Coding Club","Dramatics Society","NSS","Sports Team","Music Club","Debate Society","Student Council","Library Committee","Hostel A","Hostel B","Hostel C","Alumni Network","Cultural Committee","Eco Club","Photography Club"];function Y(){const e=[],r=A.reduce((n,i)=>n+i.population,0);for(let n=1;n<=5e3;n++){let i=y()*r,t;for(let S of A){if(i<S.population){t=S;break}i-=S.population}t||(t=A[A.length-1]);let o=y()<.8?P[0]:P[1],s=L(["07:15","07:45","08:15","08:45","09:30"],[.3,.35,.2,.1,.05]),a=L(["15:45","16:15","16:45","17:15","18:00"],[.15,.25,.3,.2,.1]),c=L([["Mon","Tue","Wed","Thu","Fri"],["Mon","Wed","Fri"],["Tue","Thu","Sat"],["Mon","Tue","Wed","Thu","Fri","Sat"],["Mon","Thu"]],[.6,.15,.1,.1,.05]),d=y()<.18,u=!1,b=0;d&&(y()<.55&&(u=!0),u&&(b=L([2,3,4],[.4,.4,.2])));let C=L(["Bus","Auto","Two-wheeler","Walk","Car","Other"],[.4,.2,.2,.05,.1,.05]);d&&C!=="Car"&&(C=y()<.5?"Car":C);let g=Math.floor(y()*4)+1,f=[],m=[...V];for(let S=0;S<g;S++){let R=Math.floor(y()*m.length);f.push(m[R]),m.splice(R,1)}let w=Math.floor(Math.pow(y(),3)*45)+2,T=Math.floor((y()+y()+y())/3*10)+1,x=y()<.02,E=x?Math.floor(y()*5)+1:0,G=x?Math.floor(y()*4):0,q=j(t.lat,t.lng,o.lat,o.lng);e.push({userId:`U${String(n).padStart(4,"0")}`,communityId:D.id,locality:t.name,localityLat:t.lat,localityLng:t.lng,destination:o.name,destLat:o.lat,destLng:o.lng,travelDays:c,departureTime:s,returnTime:a,currentMode:C,carAccess:d,availableSeats:b,willingToDrive:u,willingToRide:!0,routeDistance:parseFloat(q.toFixed(1)),routeFrequency:c.length,communityGroups:f,communityConnections:w,activityLevel:T,existingFellaRideUser:x,previousRideCount:E,referralCount:G})}return e}const W=Y();function K(e,r=10){if(!e.carAccess)return 0;let n=Math.min(100,r*5)*.35,i=(e.routeFrequency>=5?100:e.routeFrequency*20)*.2,t=0;e.availableSeats>=4?t=100:e.availableSeats===3?t=80:e.availableSeats===2?t=60:e.availableSeats===1&&(t=40);let o=t*.2,s=(e.willingToDrive?100:0)*.15,a=Math.min(100,e.activityLevel*5+e.previousRideCount*10+e.referralCount*15)*.1;return Math.round(n+i+o+s+a)}function J(e,r=10){let n=Math.min(100,r*5)*.3,i=(e.routeFrequency>=5?100:e.routeFrequency*20)*.25,t=(e.routeFrequency>=5?100:e.routeFrequency*20)*.2,o=(e.willingToRide?100:0)*.15,s=(["Bus","Auto","Walk"].includes(e.currentMode)?100:0)*.1;return Math.round(n+i+t+o+s)}function Q(e,r=50,n=[]){let i=Math.min(100,e.communityConnections/r*100)*.3,t=Math.min(100,e.communityGroups.length*25)*.25,o=e.activityLevel*10*.2,s=50;n.includes(`${e.locality}-${e.destination}`)&&(s=100);let a=s*.15,c=Math.min(100,e.referralCount*33)*.1;return Math.round(i+t+o+a+c)}function Z(e){let r=e.activityLevel*10*.3,n=e.communityGroups.some(c=>["CS Department","Coding Club"].includes(c)),t=Math.min(100,e.activityLevel*5+(n?50:0))*.2,o=Math.min(100,e.referralCount*33)*.2,s=Math.min(100,e.communityConnections*3.3)*.15,a=(e.existingFellaRideUser?100:e.activityLevel*10)*.15;return Math.round(r+t+o+s+a)}function X(e){return e.driverScore>0?Math.round(e.driverScore*.35+e.connectorScore*.25+e.earlyAdopterScore*.25+e.passengerScore*.15):Math.round(e.connectorScore*.35+e.earlyAdopterScore*.3+e.passengerScore*.35)}function ee(e){let r={};e.forEach(t=>{let o=`${t.locality}-${t.destination}`;r[o]=(r[o]||0)+1});let n=Math.max(...e.map(t=>t.communityConnections)),i=Object.keys(r).sort((t,o)=>r[o]-r[t]).slice(0,5);return e.map(t=>{let o=r[`${t.locality}-${t.destination}`]||0,s=K(t,o),a=J(t,o),c=Q(t,n,i),d=Z(t),u=X({driverScore:s,passengerScore:a,connectorScore:c,earlyAdopterScore:d});return{...t,driverScore:s,passengerScore:a,connectorScore:c,earlyAdopterScore:d,priorityScore:u}})}function te(e){let r={};return e.forEach(n=>{let i=`${n.locality}-${n.destination}`.toLowerCase().replace(/[\s\.]+/g,"-");r[i]||(r[i]={id:i,origin:n.locality,originLat:n.localityLat,originLng:n.localityLng,destination:n.destination,destLat:n.destLat,destLng:n.destLng,users:[],totalCount:0,passengerCount:0,driverCount:0,potentialDriverCount:0,avgDistance:n.routeDistance,times:{}});let t=r[i];t.users.push(n),t.totalCount++,n.carAccess?n.willingToDrive?t.driverCount++:t.potentialDriverCount++:t.passengerCount++,t.times[n.departureTime]=(t.times[n.departureTime]||0)+1}),Object.values(r).map(n=>{let i=Object.keys(n.times).sort((o,s)=>n.times[s]-n.times[o])[0],t=n.driverCount>0?n.driverCount/n.passengerCount:0;return{...n,supplyDemandRatio:`1:${Math.round(n.passengerCount/Math.max(1,n.driverCount))}`,supplyDemandValue:t,peakTime:i?`${i}-${i}`:"Unknown"}})}function ne(e){return e.map(n=>{let i=n.driverCount*3,t=n.passengerCount-i,o="LOW";t>50?o="CRITICAL":t>20?o="HIGH":t>5&&(o="MODERATE");let s=t>20?"HIGH DEMAND / LOW SUPPLY":"BALANCED";return{corridor:n,passengers:n.passengerCount,confirmedDrivers:n.driverCount,potentialDrivers:n.potentialDriverCount,gap:t,severity:o,status:s}}).filter(n=>n.gap>0).sort((n,i)=>i.gap-n.gap)}function ie(e,r=4){return[...e].sort((n,i)=>i.passengerCount-n.passengerCount).slice(0,r)}function re(e,r,n){let i=[];return e.slice(0,3).forEach((t,o)=>{i.push({id:`INT-00${o+1}`,type:"DRIVER_ACTIVATION",priority:t.severity,targetUsers:[],corridor:t.corridor,title:`Activate drivers on ${t.corridor.origin} corridor`,description:`High demand corridor needs drivers. Gap of ${t.gap} passengers.`,reasoning:"Critical supply shortage",expectedImpact:{newDrivers:3,newPassengers:12,potentialRides:4},suggestedMessage:"Hey! Your route to campus is in high demand. Interested in driving?"})}),i}function oe(e,r=10){let n=[],i={connectors:0,drivers:0,passengers:0,rides:0,referrals:0,totalActive:0};for(let t=0;t<=r;t++)n.push({step:t,label:`Week ${t}: ${t===0?"Pre-ignition":"Growth phase"}`,...i,newThisStep:t*2,events:t===0?["Community analysis complete"]:[`Activated ${t} new drivers`]}),i.connectors+=1,i.drivers+=Math.floor(t*1.5),i.passengers+=Math.floor(t*3),i.rides+=Math.floor(t*5),i.referrals+=t,i.totalActive=i.connectors+i.drivers+i.passengers;return n}const l=e=>`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`,ae={home:l('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),barChart:l('<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>'),map:l('<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>'),users:l('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),zap:l('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),sparkles:l('<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 13l.75 2.25L22 16l-2.25.75L19 19l-.75-2.25L16 16l2.25-.75L19 13z"/>'),search:l('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),filter:l('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'),chevronRight:l('<polyline points="9 18 15 12 9 6"/>'),x:l('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),play:l('<polygon points="5 3 19 12 5 21 5 3"/>'),pause:l('<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'),skipForward:l('<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>'),skipBack:l('<polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/>'),refreshCw:l('<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>'),copy:l('<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),send:l('<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>'),externalLink:l('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'),car:l('<path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/><path d="M5 17H3v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2"/>'),route:l('<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H18"/><circle cx="18" cy="5" r="3"/>'),activity:l('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),target:l('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),link:l('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),trendingUp:l('<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'),alertTriangle:l('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),checkCircle:l('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'),clock:l('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),compass:l('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'),logo:l('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>')};function h(e,r=20){const n=ae[e];return n?r===20?n:n.replace('width="20" height="20"',`width="${r}" height="${r}"`):""}function H(e,r,n,i){const t=[{id:"community-select",icon:"compass",label:"Community Select"},{id:"overview",icon:"barChart",label:"Overview"},{id:"mobility-map",icon:"map",label:"Mobility Map"},{id:"people-intelligence",icon:"users",label:"People"},{id:"butterfly-effect",icon:"zap",label:"Butterfly Effect"}],o=`
    <div class="sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-brand-icon">
          ${h("logo")}
        </div>
        <div class="sidebar-brand-text">
          <span class="sidebar-brand-name">FellaRide</span>
          <span class="sidebar-brand-label">Ignition Engine</span>
        </div>
      </div>
      
      <div class="sidebar-divider"></div>
      
      <div class="sidebar-section-label">ANALYSIS</div>
      <div class="nav-menu">
        ${t.map(c=>`
          <div class="nav-item ${r===c.id?"active":""}" data-screen="${c.id}" role="button" tabindex="0">
            <div class="nav-icon">${h(c.icon)}</div>
            <span>${c.label}</span>
          </div>
        `).join("")}
      </div>
      
      <div class="sidebar-divider"></div>
      <div class="sidebar-section-label">INTELLIGENCE</div>
      <button class="btn btn-ghost" id="btn-ai-strategy" style="width: 100%; justify-content: flex-start; gap: var(--sp-2); border-color: rgba(79, 142, 247, 0.2);">
        <span style="color: var(--color-primary); display: flex; align-items: center;">${h("sparkles",16)}</span>
        <span>Strategy Engine</span>
      </button>
      
      <div style="flex: 1;"></div>
      
      <div class="sidebar-footer">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span>Prototype v1.0</span>
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--color-success);" title="Engine active"></span>
        </div>
      </div>
    </div>
  `;e.innerHTML=o,e.querySelectorAll(".nav-item").forEach(c=>{const d=()=>{const u=c.getAttribute("data-screen");n&&n(u)};c.addEventListener("click",d),c.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),d())})});const a=e.querySelector("#btn-ai-strategy");a&&a.addEventListener("click",()=>{i&&i()})}function pe(e,r,n,i="primary"){const t=typeof r=="number"||typeof r=="string"&&!isNaN(Number(r))&&r.trim()!==""&&!r.includes(":"),o=t?`data-count="${r}"`:"";return`
    <div class="metric">
      <div class="metric-icon" style="color: var(--color-${i}); margin-bottom: var(--sp-1);">
        ${n?h(n,20):""}
      </div>
      <div class="metric-value" ${o}>${t?"0":r}</div>
      <div class="metric-label">${e}</div>
    </div>
  `}function k(e,r="primary"){return`<span class="badge badge-${r}">${e}</span>`}function ue(e,r,n=100,i="primary"){const t=Math.min(100,Math.max(0,r/n*100)),o=i.replace("bg-","");return`
    <div class="score-row">
      <div class="score-name">${e}</div>
      <div class="progress-track">
        <div class="progress-fill ${o}" data-width="${t}%" style="width: 0%;"></div>
      </div>
      <div class="score-val">${r}</div>
    </div>
  `}function ve(e){const r=(e.destination||"").replace("St. Aloysius Campus","Campus").replace("Mangalore University Campus","MU Campus"),n=e.passengerCount||0,i=e.driverCount||0,t=e.potentialDriverCount||0,o=n>i*3+5,s=o?"SUPPLY GAP":n>20?"HIGH DEMAND":"BALANCED",a=o?"danger":n>20?"warning":"success";return`
    <div class="corridor-row">
      <div style="flex: 1; display: flex; flex-direction: column; gap: var(--sp-1);">
        <div style="font-weight: 500; font-size: var(--text-sm);">${e.origin} &rarr; ${r}</div>
        <div style="font-size: var(--text-xs); color: var(--text-muted); display: flex; gap: var(--sp-3); flex-wrap: wrap;">
          <span>Pass: <span style="color: var(--color-success); font-family: var(--font-mono);">${n}</span></span>
          <span>Driv: <span style="color: var(--color-primary); font-family: var(--font-mono);">${i}</span></span>
          <span>Pot: <span style="color: var(--color-warning); font-family: var(--font-mono);">${t}</span></span>
          <span>Ratio: <span style="color: ${o?"var(--color-danger)":"var(--color-success)"}; font-family: var(--font-mono);">${e.supplyDemandRatio||"N/A"}</span></span>
        </div>
      </div>
      <div>
        ${k(s,a)}
      </div>
    </div>
  `}function ye(e,r,n,i){const t=Math.min(100,Math.max(14,r/Math.max(1,n)*100));return`
    <div class="funnel-row">
      <div class="funnel-label">${e}</div>
      <div class="funnel-bar" style="background: ${i}; width: 0%;" data-width="${t}%">
        ${typeof r=="number"?r.toLocaleString():r}
      </div>
    </div>
  `}function se(e,r,n=1200){if(typeof r!="number"||isNaN(r)){e.innerHTML=r;return}let i=null;const t=o=>{i||(i=o);const s=Math.min((o-i)/n,1),a=1-Math.pow(1-s,4);e.innerHTML=Math.floor(a*r).toLocaleString(),s<1?window.requestAnimationFrame(t):e.innerHTML=r.toLocaleString()};window.requestAnimationFrame(t)}function me(e){if(!e)return;e.querySelectorAll("[data-count]").forEach(n=>{const i=n.getAttribute("data-count"),t=parseFloat(i||"0");!isNaN(t)&&t>0?se(n,t):i&&(n.innerHTML=i)}),setTimeout(()=>{e.querySelectorAll("[data-width]").forEach(i=>{i.style.width=i.getAttribute("data-width")})},40)}let p=null;function le(e,r){var T;p&&p.parentNode&&p.parentNode.removeChild(p),p=document.createElement("div"),p.className="ai-panel";const n=r.corridors||[],i=r.supplyGaps||[],t=r.topDrivers||[],o=r.topConnectors||[],s=i[0]||{},a=s.corridor||n[0]||{origin:"Surathkal",destination:"Campus"},c=s.passengers||42,d=s.confirmedDrivers||1,u=s.potentialDrivers||9,b=t[0]||{userId:"U0092",driverScore:91,availableSeats:3},C=o[0]||{userId:"U0184",connectorScore:88},g=(a.destination||"").replace("St. Aloysius Campus","Campus"),f=`
    <div class="ai-panel-header">
      <div style="display: flex; align-items: center; gap: var(--sp-2);">
        <span style="color: var(--color-primary); display: flex; align-items: center;">${h("sparkles",18)}</span>
        <span style="font-weight: 600; font-size: var(--text-md); letter-spacing: -0.01em;">Strategy Engine</span>
      </div>
      <button class="btn btn-subtle" id="ai-panel-close" aria-label="Close panel" style="padding: var(--sp-1); border-radius: 50%;">
        ${h("x",18)}
      </button>
    </div>
    
    <div class="ai-panel-body" id="ai-panel-content">
      <div id="ai-loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: var(--sp-4); opacity: 0.8;">
        <div style="width: 14px; height: 14px; border-radius: 50%; background: var(--color-primary); box-shadow: 0 0 12px var(--color-primary); animation: pulse 0.9s infinite alternate;"></div>
        <div style="font-size: var(--text-xs); font-family: var(--font-mono); color: var(--text-secondary); letter-spacing: 0.05em;">SYNTHESIZING COMMUNITY SIGNALS...</div>
        <style>
          @keyframes pulse {
            0% { transform: scale(0.9); opacity: 0.4; }
            100% { transform: scale(1.3); opacity: 1; }
          }
        </style>
      </div>

      <div id="ai-results" style="display: none; flex-direction: column; gap: var(--sp-5);">
        
        <div>
          <div class="section-title">PRIORITY CORRIDOR</div>
          <div class="glass-1" style="padding: var(--sp-4);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--sp-3);">
              <div style="font-weight: 500; font-size: var(--text-sm);">${a.origin} &rarr; ${g}</div>
              ${k("CRITICAL GAP","danger")}
            </div>
            <div style="display: flex; gap: var(--sp-3);">
              <div style="flex: 1;">
                <div class="data-label">Passengers</div>
                <div class="mono" style="color: var(--color-success); font-size: var(--text-lg); font-weight: 600;">${c}</div>
              </div>
              <div style="flex: 1;">
                <div class="data-label">Drivers</div>
                <div class="mono" style="color: var(--color-primary); font-size: var(--text-lg); font-weight: 600;">${d}</div>
              </div>
              <div style="flex: 1;">
                <div class="data-label">Potential</div>
                <div class="mono" style="color: var(--color-warning); font-size: var(--text-lg); font-weight: 600;">${u}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="section-title">RECOMMENDED ACTIONS</div>
          <ol style="padding-left: var(--sp-4); font-size: var(--text-sm); color: var(--text-secondary); display: flex; flex-direction: column; gap: var(--sp-3); line-height: 1.5;">
            <li><span style="color: var(--text-primary); font-weight: 500;">Activate ${b.userId}</span> &mdash; Driver Score ${b.driverScore}, ${b.availableSeats||3} seats. High route overlap on peak morning window.</li>
            <li><span style="color: var(--text-primary); font-weight: 500;">Engage ${C.userId}</span> &mdash; Connector Score ${C.connectorScore}. Introduce pilot ride across community circles.</li>
            <li><span style="color: var(--text-primary); font-weight: 500;">Target ${Math.min(3,u)} potential drivers</span> &mdash; Vehicle access confirmed, commute subsidization offer advised.</li>
            <li><span style="color: var(--text-primary); font-weight: 500;">Schedule pilot ride</span> &mdash; Trigger activation once 3 drivers lock schedule.</li>
          </ol>
        </div>

        <div>
          <div class="section-title">TARGET CANDIDATES</div>
          <div style="display: flex; flex-direction: column; gap: var(--sp-2);">
            ${t.slice(0,3).map(x=>`
              <div class="glass-1" style="display: flex; justify-content: space-between; align-items: center; padding: var(--sp-2) var(--sp-3);">
                <div>
                  <div class="mono" style="color: var(--color-primary); font-weight: 500; font-size: var(--text-sm);">${x.userId}</div>
                  <div style="font-size: var(--text-xs); color: var(--text-muted);">${x.locality}</div>
                </div>
                ${k("Score: "+x.driverScore,"primary")}
              </div>
            `).join("")}
          </div>
        </div>

        <div>
          <div class="section-title">PROJECTED ACTIVATION IMPACT</div>
          <div class="glass-1" style="padding: var(--sp-3) var(--sp-4); display: flex; justify-content: space-between;">
            <div style="text-align: center;">
              <div class="mono" style="color: var(--color-primary); font-size: var(--text-lg); font-weight: 600;">3&ndash;5</div>
              <div class="data-label">Drivers</div>
            </div>
            <div style="text-align: center;">
              <div class="mono" style="color: var(--color-success); font-size: var(--text-lg); font-weight: 600;">10&ndash;15</div>
              <div class="data-label">Passengers</div>
            </div>
            <div style="text-align: center;">
              <div class="mono" style="color: var(--color-accent); font-size: var(--text-lg); font-weight: 600;">4&ndash;8</div>
              <div class="data-label">First Rides</div>
            </div>
          </div>
        </div>

        <div>
          <div class="section-title">OUTREACH TEMPLATE</div>
          <div class="glass-1 mono" style="padding: var(--sp-3) var(--sp-4); font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.6; user-select: all;" id="ai-outreach-msg">"Hey! We noticed high student demand from ${a.origin} to campus around 7:30-8:30 AM. Since you commute regularly, would you share your empty seats on FellaRide? You'll help classmates travel safely while covering fuel costs."</div>
          <button class="btn btn-ghost" id="btn-copy-outreach" style="width: 100%; margin-top: var(--sp-2);">
            ${h("copy",16)} Copy Message
          </button>
        </div>

        <button class="btn btn-primary" id="btn-regen-strategy" style="width: 100%; margin-top: var(--sp-1);">
          ${h("refreshCw",16)} Regenerate Strategy
        </button>
      </div>
    </div>
  `;p.innerHTML=f,e.appendChild(p),(T=p.querySelector("#ai-panel-close"))==null||T.addEventListener("click",F);const m=p.querySelector("#btn-copy-outreach");m==null||m.addEventListener("click",()=>{var E;const x=((E=p.querySelector("#ai-outreach-msg"))==null?void 0:E.innerText)||"";navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(x),m.innerHTML=`${h("checkCircle",16)} Copied to Clipboard`,setTimeout(()=>{m.innerHTML=`${h("copy",16)} Copy Message`},2e3)});const w=p.querySelector("#btn-regen-strategy");w==null||w.addEventListener("click",()=>{N()})}function N(){if(!p)return;const e=p.querySelector("#ai-loading"),r=p.querySelector("#ai-results");!e||!r||(e.style.display="flex",r.style.display="none",setTimeout(()=>{e.style.display="none",r.style.display="flex";const n=r.children;for(let i=0;i<n.length;i++)n[i].style.opacity="0",n[i].style.transform="translateY(6px)",n[i].style.transition="all var(--duration-normal) var(--ease-out)",setTimeout(()=>{n[i].style.opacity="1",n[i].style.transform="translateY(0)"},i*70+40)},1e3))}function _(){p&&(p.classList.add("open"),N())}function F(){p&&p.classList.remove("open")}document.addEventListener("keydown",e=>{e.key==="Escape"&&p&&p.classList.contains("open")&&F()});const v={currentScreen:"community-select",community:{name:D.name,population:D.population,id:D.id,responses:327},localities:A,destinations:P,users:[],corridors:[],supplyGaps:[],highDemandCorridors:[],interventions:[],growthSimulation:[],isAnalysed:!1,aiPanelOpen:!1};function ce(){console.time("Analysis Pipeline");const e=ee(W),r=te(e),n=ne(r),i=ie(r,4),t=[...e].sort((a,c)=>c.priorityScore-a.priorityScore),o=re(n),s=oe({community:v.community,topDrivers:t.filter(a=>a.driverScore>60).slice(0,10),topConnectors:t.filter(a=>a.connectorScore>60).slice(0,10)});v.users=t,v.corridors=r,v.supplyGaps=n,v.highDemandCorridors=i,v.interventions=o,v.growthSimulation=s,console.timeEnd("Analysis Pipeline")}let $=null;async function I(e){v.currentScreen=e;const r=document.getElementById("nav-container");r&&H(r,e,I,_);const n=document.getElementById("main-content");if(n){$&&$.destroy&&$.destroy(),n.style.opacity="0",n.style.transform="translateY(10px)",await new Promise(i=>setTimeout(i,150)),n.innerHTML="";try{let i;switch(e){case"community-select":i=await M(()=>import("./CommunitySelect-Bi4PlD6t.js"),[],import.meta.url);break;case"overview":i=await M(()=>import("./CommunityOverview-Cn3rcheG.js"),[],import.meta.url);break;case"mobility-map":i=await M(()=>import("./MobilityMap-CIcEzLI2.js"),[],import.meta.url);break;case"people-intelligence":i=await M(()=>import("./PeopleIntelligence-B7rRaGJ0.js"),[],import.meta.url);break;case"butterfly-effect":i=await M(()=>import("./ButterflyEffect-DJpWgiRa.js"),[],import.meta.url);break;default:n.innerHTML='<div class="screen"><h2>404 — Screen not found</h2></div>';return}$=i,i.render(n,v,I),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateY(0)"})}catch(i){console.error("Error loading screen:",i),n.innerHTML=`
      <div class="screen" style="padding:2rem;">
        <h2 style="color:var(--color-danger);">Error loading screen</h2>
        <pre style="color:var(--text-secondary);margin-top:1rem;white-space:pre-wrap;">${i.message}
${i.stack}</pre>
      </div>`,n.style.opacity="1",n.style.transform="translateY(0)"}}}async function de(){ce();const e=document.getElementById("loading-screen"),r=e==null?void 0:e.querySelector(".loading-status"),n=["Loading synthetic dataset (5,000 users)...","Running scoring engine...","Clustering routes and corridors...","Identifying supply-demand gaps...","Generating intervention strategies...","Initializing Command Centre..."];for(let a=0;a<n.length;a++)r&&(r.textContent=n[a]),await new Promise(c=>setTimeout(c,400));e&&(e.style.opacity="0",e.style.pointerEvents="none",setTimeout(()=>e.remove(),500));const i=document.getElementById("app");i.style.display="grid";const t=document.createElement("div");t.id="nav-container";const o=document.createElement("div");o.className="main-content",o.id="main-content",o.style.transition="opacity var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out)",i.innerHTML="",i.appendChild(t),i.appendChild(o),H(t,v.currentScreen,I,_);const s={community:v.community,corridors:v.corridors,supplyGaps:v.supplyGaps,topDrivers:v.users.filter(a=>a.driverScore>70).slice(0,5),topConnectors:v.users.filter(a=>a.connectorScore>70).slice(0,5),topEarlyAdopters:v.users.filter(a=>a.earlyAdopterScore>70).slice(0,5),interventions:v.interventions};le(i,s),I("community-select")}document.addEventListener("DOMContentLoaded",de);export{me as a,pe as b,k as c,ye as d,ve as e,ue as f,h as i};
