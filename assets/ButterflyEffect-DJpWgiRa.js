import{i as p}from"./index-DZUtRM5o.js";let g=null,o=[],f=[],c=0,v=!1,n=null,h=0,x=0,l={active:0,rides:0,drivers:0,referrals:0},m=null;function z(w,T,A){var S,B,M,P;w.innerHTML="";const y=document.createElement("div");y.className="screen flex flex-col",y.style.height="100%",y.innerHTML=`
    <div class="mb-4">
      <h1 class="page-title">The Butterfly Effect</h1>
      <p class="page-subtitle">Interactive network cascade &mdash; watch a single targeted activation ignite organic community adoption</p>
    </div>
    
    <div class="grid grid-3-2 gap-6 flex-1 min-h-0">
      <!-- Left Column: Canvas + Controls -->
      <div class="flex flex-col h-full">
        <div class="card glass-2 flex-1 mb-4 relative overflow-hidden flex flex-col" style="padding: 0; min-height: 380px;">
          <!-- Canvas Overlay Legend -->
          <div style="position: absolute; top: var(--sp-3); left: var(--sp-3); display: flex; gap: var(--sp-3); background: rgba(14, 19, 33, 0.7); backdrop-filter: blur(8px); padding: 6px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); z-index: 5; font-size: var(--text-xs);">
            <div class="flex items-center gap-1"><span style="width: 8px; height: 8px; border-radius: 50%; background: #E8734A; display: inline-block;"></span> <span style="color: var(--text-secondary);">Connector</span></div>
            <div class="flex items-center gap-1"><span style="width: 8px; height: 8px; border-radius: 50%; background: #4F8EF7; display: inline-block;"></span> <span style="color: var(--text-secondary);">Driver</span></div>
            <div class="flex items-center gap-1"><span style="width: 8px; height: 8px; border-radius: 50%; background: #3ECFA0; display: inline-block;"></span> <span style="color: var(--text-secondary);">Passenger</span></div>
            <div class="flex items-center gap-1"><span style="width: 8px; height: 8px; border-radius: 50%; background: rgba(85,94,115,0.4); display: inline-block;"></span> <span style="color: var(--text-muted);">Community</span></div>
          </div>
          
          <canvas id="sim-canvas" class="w-full h-full" style="background: var(--bg-base); display: block;"></canvas>
        </div>
        
        <!-- Controls Toolbar -->
        <div class="flex justify-between items-center glass-1 p-3" style="border-radius: var(--radius-md);">
          <div class="flex gap-2 items-center">
            <button id="btn-skip-back" class="btn btn-subtle" style="padding: var(--sp-2);" title="Reset to start">
              ${p("skipBack",16)}
            </button>
            <button id="btn-play-pause" class="btn btn-primary" style="padding: var(--sp-2) var(--sp-4); gap: var(--sp-2);" title="Play/Pause simulation">
              <span id="play-icon">${p("play",16)}</span>
              <span id="play-label" style="font-size: var(--text-xs); font-weight: 600;">Play</span>
            </button>
            <button id="btn-skip-forward" class="btn btn-subtle" style="padding: var(--sp-2);" title="Step forward">
              ${p("skipForward",16)}
            </button>
          </div>
          <div class="mono" style="font-size: var(--text-xs); color: var(--text-secondary);" id="step-indicator">
            Stage 0 of 10 &middot; Pre-Ignition
          </div>
        </div>
      </div>
      
      <!-- Right Column: Live Metrics & Event Log -->
      <div class="flex flex-col gap-5 h-full min-h-0">
        <!-- Live Metrics -->
        <div class="card glass-2">
          <div class="flex justify-between items-center mb-3">
            <h2 class="section-title" style="margin-bottom:0;">Network Growth</h2>
            <span class="data-label" style="font-size: var(--text-xs);">Live Community State</span>
          </div>
          <div class="grid grid-2 gap-4">
            <div class="metric-inline flex-col items-start gap-1">
              <span class="data-label">Active Users</span>
              <span class="data-value mono" id="metric-active">0</span>
            </div>
            <div class="metric-inline flex-col items-start gap-1">
              <span class="data-label">Rides Created</span>
              <span class="data-value mono" style="color: var(--color-success);" id="metric-rides">0</span>
            </div>
            <div class="metric-inline flex-col items-start gap-1">
              <span class="data-label">Active Drivers</span>
              <span class="data-value mono" style="color: var(--color-primary);" id="metric-drivers">0</span>
            </div>
            <div class="metric-inline flex-col items-start gap-1">
              <span class="data-label">Organic Referrals</span>
              <span class="data-value mono" style="color: var(--color-accent);" id="metric-referrals">0</span>
            </div>
          </div>
        </div>
        
        <!-- Chronological Event Log -->
        <div class="card glass-1 flex-1 flex flex-col min-h-0">
          <div class="flex justify-between items-center mb-3">
            <h2 class="section-title" style="margin-bottom:0;">Ignition Sequence Log</h2>
            <span class="data-label mono" style="font-size: var(--text-xs);">REAL-TIME</span>
          </div>
          <div class="overflow-y-auto flex-1 flex flex-col" id="event-log" style="padding-right: var(--sp-2);">
            <div class="text-muted italic" style="font-size: var(--text-xs); padding: var(--sp-2) 0;">
              Simulation ready. Press Play or Step Forward to trigger ignition.
            </div>
          </div>
          
          <button id="btn-reset" class="btn btn-ghost w-full mt-3" style="font-size: var(--text-xs);">
            ${p("refreshCw",14)} Reset Simulation
          </button>
        </div>
      </div>
    </div>
  `,w.appendChild(y);const u=document.getElementById("sim-canvas");if(!u)return;n=u.getContext("2d"),m=()=>{if(!u||!u.parentElement)return;const r=u.parentElement.getBoundingClientRect();u.width=r.width,u.height=r.height,h=r.width,x=r.height,o.length===0&&k()},window.addEventListener("resize",m),setTimeout(m,20);function k(){o=[],f=[],c=0,l={active:0,rides:0,drivers:0,referrals:0},L();const r=75;for(let e=0;e<r;e++)o.push({id:e,x:Math.random()*(h||500),y:Math.random()*(x||400),vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,type:"inactive",active:!1,pulse:0})}function C(){if(c>=10){v=!1;const t=document.getElementById("play-icon"),a=document.getElementById("play-label");t&&(t.innerHTML=p("play",16)),a&&(a.textContent="Play");return}c++;const r=document.getElementById("event-log"),e=`T+0${c}w`;let s="";if(c===1){const t=o.find(a=>!a.active);t&&(t.type="connector",t.active=!0,t.pulse=1,l.active++),s="Activated Key Connector U0184 (Surathkal Society Lead). High referral centrality."}else if(c===2){const t=o.find(i=>i.type==="connector");let a=0;o.forEach(i=>{!i.active&&a<3&&(i.type="driver",i.active=!0,i.pulse=1,t&&f.push({source:t,target:i,active:!0}),l.active++,l.drivers++,a++)}),s="Connector introduced 3 anchor drivers on Surathkal corridor (commute subsidization activated)."}else if(c===3){const t=o.filter(i=>i.type==="driver");let a=0;o.forEach(i=>{if(!i.active&&a<8){i.type="passenger",i.active=!0,i.pulse=1;const d=t[a%t.length];d&&f.push({source:d,target:i,active:!0}),l.active++,a++}}),s="8 daily bus commuters matched with anchor drivers for morning departure."}else if(c===4)l.rides+=12,f.forEach(t=>t.active=!0),s="First 12 pilot rides completed with 100% on-time arrival. Trust verified.";else if(c===5){let t=0;o.forEach(a=>{if(!a.active&&t<2){a.type="connector",a.active=!0,a.pulse=1;const i=o.find(d=>d.active&&d.type!=="inactive");i&&f.push({source:i,target:a,active:!0}),l.active++,l.referrals++,t++}}),s="Butterfly cascade: 2 riders advocate FellaRide in Commerce Faculty & NSS groups."}else if(c===6){let t=0;o.forEach(a=>{if(!a.active&&t<4){a.type="driver",a.active=!0,a.pulse=1;const i=o.find(d=>d.active&&d.type!=="inactive");i&&f.push({source:i,target:a,active:!0}),l.active++,l.drivers++,t++}}),l.rides+=16,s="Kavoor & Kottara corridors ignite: 4 new drivers onboarded via peer invites."}else{let t=0;o.forEach(a=>{if(!a.active&&t<c*2){a.type=Math.random()>.25?"passenger":"driver",a.active=!0,a.pulse=1;const i=o.find(d=>d.active&&d.type!=="inactive");i&&f.push({source:i,target:a,active:!0}),l.active++,a.type==="driver"&&l.drivers++,t++}}),l.rides+=c*6,l.referrals+=2,s="Self-sustaining network effect. Community density reached across all 4 corridors."}if(r){r.querySelector(".italic")&&(r.innerHTML="");const t=document.createElement("div");t.className="event-log-entry",t.innerHTML=`<span class="event-log-time">[${e}]</span> <span style="line-height:1.4;">${s}</span>`,r.prepend(t)}L()}function L(){const r=document.getElementById("metric-active"),e=document.getElementById("metric-rides"),s=document.getElementById("metric-drivers"),t=document.getElementById("metric-referrals"),a=document.getElementById("step-indicator");if(r&&(r.textContent=l.active),e&&(e.textContent=l.rides),s&&(s.textContent=l.drivers),t&&(t.textContent=l.referrals),a){const i=c===0?"Pre-Ignition":c<=3?"Anchor Seeding":c<=6?"Referral Cascade":"Self-Sustaining";a.textContent=`Stage ${c} of 10 · ${i}`}}let E=0;function I(r){n&&(n.fillStyle="rgba(11, 15, 25, 0.3)",n.fillRect(0,0,h,x),n.lineWidth=1,f.forEach(e=>{n.beginPath(),n.moveTo(e.source.x,e.source.y),n.lineTo(e.target.x,e.target.y),n.strokeStyle=e.active?"rgba(79, 142, 247, 0.35)":"rgba(255, 255, 255, 0.05)",n.stroke()}),o.forEach(e=>{e.x+=e.vx,e.y+=e.vy,(e.x<10||e.x>h-10)&&(e.vx*=-1),(e.y<10||e.y>x-10)&&(e.vy*=-1);let s="rgba(85, 94, 115, 0.25)";e.type==="connector"?s="#E8734A":e.type==="driver"?s="#4F8EF7":e.type==="passenger"&&(s="#3ECFA0");let t=e.active?4.5:2.5;e.pulse>0&&(n.beginPath(),n.arc(e.x,e.y,t+e.pulse*8,0,Math.PI*2),n.fillStyle=s.replace(")",", 0.2)").replace("rgb","rgba"),n.fill(),e.pulse-=.04),n.beginPath(),n.arc(e.x,e.y,t,0,Math.PI*2),n.fillStyle=s,n.fill()}),v&&r-E>1800&&(C(),E=r),g=requestAnimationFrame(I))}function b(){k();const r=document.getElementById("event-log");r&&(r.innerHTML='<div class="text-muted italic" style="font-size: var(--text-xs); padding: var(--sp-2) 0;">Simulation reset. Press Play or Step Forward to start.</div>'),v=!1;const e=document.getElementById("play-icon"),s=document.getElementById("play-label");e&&(e.innerHTML=p("play",16)),s&&(s.textContent="Play")}(S=document.getElementById("btn-skip-back"))==null||S.addEventListener("click",b),(B=document.getElementById("btn-reset"))==null||B.addEventListener("click",b),(M=document.getElementById("btn-play-pause"))==null||M.addEventListener("click",r=>{c>=10&&b(),v=!v;const e=document.getElementById("play-icon"),s=document.getElementById("play-label");e&&(e.innerHTML=v?p("pause",16):p("play",16)),s&&(s.textContent=v?"Pause":"Play"),v&&(E=performance.now())}),(P=document.getElementById("btn-skip-forward"))==null||P.addEventListener("click",()=>{c>=10&&b(),C()}),g=requestAnimationFrame(I)}function H(){g&&(cancelAnimationFrame(g),g=null),m&&(window.removeEventListener("resize",m),m=null),n=null,v=!1}export{H as destroy,z as render};
