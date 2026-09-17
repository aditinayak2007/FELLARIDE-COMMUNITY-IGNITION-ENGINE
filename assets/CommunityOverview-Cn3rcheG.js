import{c as C,i as x,b as i,d as a,e as $,a as w}from"./index-DZUtRM5o.js";function R(r,p,m){var c,v;r.innerHTML="";const t=document.createElement("div");t.className="screen";const o=5e3,e=327,l=31,d=7,u=126,g=18,y=4,b="1:18",f=[{origin:"Surathkal",destination:"St. Aloysius Campus",passengerCount:42,driverCount:1,potentialDriverCount:9,supplyDemandRatio:"1:42"},{origin:"Kavoor",destination:"St. Aloysius Campus",passengerCount:32,driverCount:4,potentialDriverCount:6,supplyDemandRatio:"1:8"},{origin:"Kottara",destination:"St. Aloysius Campus",passengerCount:21,driverCount:3,potentialDriverCount:4,supplyDemandRatio:"1:7"},{origin:"Bendoor",destination:"St. Aloysius Campus",passengerCount:18,driverCount:7,potentialDriverCount:5,supplyDemandRatio:"1:3"}];t.innerHTML=`
    <div class="flex justify-between items-center mb-6" style="flex-wrap: wrap; gap: var(--sp-3);">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <h1 class="page-title">${p.community.name}</h1>
          ${C("Pre-Ignition Analysis","success")}
        </div>
        <p class="page-subtitle">Community Mobility Assessment &middot; ${e} Voluntary Responses from ${o.toLocaleString()} Members</p>
      </div>
      <button class="btn btn-ghost" id="btn-ai-overview">
        ${x("sparkles",16)} Strategy Engine
      </button>
    </div>
    
    <!-- KEY METRICS (Single Level-1 Glass Surface) -->
    <div class="glass-1 p-5 mb-6" style="border-radius: var(--radius-lg);">
      <div class="grid grid-4 gap-4">
        ${i("Community Population",o,"users","primary")}
        ${i("Mobility Responses",e,"activity","primary")}
        ${i("Potential Drivers",l,"car","warning")}
        ${i("Confirmed Drivers",d,"checkCircle","success")}
      </div>
      <div class="grid grid-4 gap-4 mt-4" style="border-top: 1px solid var(--border-subtle); padding-top: var(--sp-4);">
        ${i("Passengers",u,"route","primary")}
        ${i("Connectors (>70)",g,"link","accent")}
        ${i("High-Demand Corridors",y,"alertTriangle","danger")}
        ${i("Supply / Demand Ratio",b,"target","warning")}
      </div>
    </div>
    
    <!-- FUNNEL + CORRIDORS (Grid 3-2) -->
    <div class="grid grid-3-2 gap-6 mb-6">
      <!-- Growth Funnel -->
      <div class="card glass-2 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center mb-3">
            <h2 class="section-title" style="margin-bottom:0;">Growth Funnel Pipeline</h2>
            <span class="data-label" style="font-size: var(--text-xs);">Conversion Simulation</span>
          </div>
          <div class="flex flex-col gap-2">
            ${a("Mobility Responses",e,e,"var(--color-primary)")}
            ${a("Potential Drivers",l,e,"var(--color-accent)")}
            ${a("Confirmed Drivers",d,e,"var(--color-success)")}
            ${a("Target First Rides",3,e,"var(--color-primary)")}
            ${a("Active Pilot Users",11,e,"var(--color-warning)")}
            ${a("Projected Growth",35,e,"var(--color-accent)")}
          </div>
        </div>
        <div style="margin-top: var(--sp-4); padding-top: var(--sp-3); border-top: 1px solid var(--border-subtle); font-size: var(--text-xs); color: var(--text-muted); display:flex; justify-content:space-between;">
          <span>Target: 3 initial rides in Week 1</span>
          <span class="text-accent">Butterfly Effect cascade</span>
        </div>
      </div>
      
      <!-- Corridors -->
      <div class="card glass-2 flex flex-col">
        <div class="flex justify-between items-center mb-3">
          <h2 class="section-title" style="margin-bottom:0;">High-Demand Corridors</h2>
          <button class="btn btn-subtle btn-sm" id="view-map-link">View Map &rarr;</button>
        </div>
        <div class="flex flex-col flex-1 overflow-auto">
          ${f.map(s=>$(s)).join("")}
        </div>
      </div>
    </div>
    
    <!-- ACTIVATION TIMELINE -->
    <div class="card glass-1">
      <div class="flex justify-between items-center mb-2">
        <h2 class="section-title" style="margin-bottom:0;">Activation Readiness</h2>
        <span class="mono" style="font-size: var(--text-xs); color: var(--color-accent);">STAGE 5 OF 6 READY</span>
      </div>
      <div class="timeline" style="overflow-x: auto; padding-bottom: var(--sp-2);">
        <div class="timeline-line"></div>
        <div class="timeline-line-filled" style="width: calc(83% - 24px);"></div>
        ${["Data Collection","Community Mapping","Route Clustering","Supply Analysis","Candidate ID","Ready for Ignition"].map((s,n)=>`
          <div class="timeline-step">
            <div class="timeline-dot ${n<5?"done":"current"}">${n<5?"✓":"!"}</div>
            <div class="timeline-label ${n<5?"done":"current"}">${s}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `,r.appendChild(t),w(t),(c=t.querySelector("#view-map-link"))==null||c.addEventListener("click",()=>m("mobility-map")),(v=t.querySelector("#btn-ai-overview"))==null||v.addEventListener("click",()=>{var s;(s=document.getElementById("btn-ai-strategy"))==null||s.click()})}export{R as render};
