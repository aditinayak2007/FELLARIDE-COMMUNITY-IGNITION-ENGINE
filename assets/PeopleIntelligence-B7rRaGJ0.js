import{i as v,a as M,c as u,f as m}from"./index-DZUtRM5o.js";function j(T,q,P){var D;T.innerHTML="";const o=document.createElement("div");o.className="screen flex flex-col",o.style.height="100%";const n=q.users||[],E=n.filter(e=>e.carAccess&&e.willingToDrive).length,F=n.filter(e=>e.connectorScore>70).length,k=[...new Set((q.corridors||[]).map(e=>e.origin))].sort();let b="priorityScore",a="all",h="all",c="",d=30,s=((D=n[0])==null?void 0:D.userId)||null;function x(){let e=[...n];return a==="drivers"?e=e.filter(t=>t.carAccess&&t.willingToDrive):a==="connectors"?e=e.filter(t=>t.connectorScore>70):a==="early-adopters"?e=e.filter(t=>t.earlyAdopterScore>70):a==="passengers"&&(e=e.filter(t=>!t.carAccess)),h!=="all"&&(e=e.filter(t=>t.locality===h)),c&&(e=e.filter(t=>t.userId.toLowerCase().includes(c)||t.locality.toLowerCase().includes(c)||t.communityGroups&&t.communityGroups.some(r=>r.toLowerCase().includes(c)))),e.sort((t,r)=>(r[b]||0)-(t[b]||0)),e}function S(e,t,r){const i=Math.min(100,Math.max(0,e/t*100));return`<div class="flex items-center gap-2">
      <div class="progress-track" style="width:44px;">
        <div class="progress-fill ${r}" style="width:${i}%;"></div>
      </div>
      <span class="mono" style="font-size:var(--text-xs); width:24px; color:var(--text-secondary); text-align:right;">${e}</span>
    </div>`}function H(e){const t=[];return e.carAccess&&e.willingToDrive&&t.push(u("Driver","primary")),e.connectorScore>70&&t.push(u("Connector","accent")),e.earlyAdopterScore>70&&t.push(u("Early Adopter","warning")),e.carAccess||t.push(u("Passenger","success")),t.join(" ")}function R(e){const t=[];return e.carAccess&&e.willingToDrive&&t.push(`Has personal vehicle with ${e.availableSeats||3} available passenger seats`),e.routeFrequency>=5?t.push(`Daily commuter (${e.routeFrequency} days/week on peak morning corridor)`):e.routeFrequency>=3&&t.push(`Consistent schedule (${e.routeFrequency} days/week)`),e.communityGroups&&e.communityGroups.length>=3&&t.push(`Bridge connector across ${e.communityGroups.length} campus organizations`),e.communityConnections>20&&t.push(`High social centrality with ${e.communityConnections} verified peer connections`),e.activityLevel>=7&&t.push(`Top-decile campus engagement index (${e.activityLevel}/10)`),e.existingFellaRideUser&&t.push("Prior FellaRide user &mdash; verified community trust"),e.departureTime&&t.push(`Regular departure at ${e.departureTime} matches prime student travel demand`),t.length===0&&t.push("Standard community commuter profile"),t}function z(e){return e.carAccess&&e.willingToDrive&&e.connectorScore>60?`Invite as Founding Mobility Lead on the ${e.locality} corridor. Incentivize onboarding 2 trusted peers from their network.`:e.carAccess&&e.willingToDrive?`Targeted driver activation: offer guaranteed commute fuel offset for the ${e.locality} &rarr; Campus route.`:e.connectorScore>70?"Connector advocacy outreach: request introduction to car owners within their student societies.":`Passenger notification: alert when first verified carpool ride launches on the ${e.locality} corridor.`}function $(e){return e.length===0?`
        <tr>
          <td colspan="7" style="text-align:center; padding: var(--sp-8); color: var(--text-muted);">
            <div style="margin-bottom: var(--sp-2);">${v("search",24)}</div>
            <div style="font-weight: 500; color: var(--text-secondary); margin-bottom: var(--sp-1);">No candidates found</div>
            <div style="font-size: var(--text-xs);">Try adjusting your filter or search query</div>
          </td>
        </tr>
      `:e.slice(0,d).map((r,i)=>`
      <tr class="user-row ${s===r.userId?"selected":""}" data-uid="${r.userId}">
        <td style="color:var(--text-muted); font-size:var(--text-xs);">${i+1}</td>
        <td class="mono" style="color:var(--color-primary); font-weight:500;">${r.userId}</td>
        <td style="font-size: var(--text-sm);">${r.locality}</td>
        <td>${H(r)}</td>
        <td>${S(r.driverScore,100,"primary")}</td>
        <td>${S(r.connectorScore,100,"accent")}</td>
        <td>${S(r.priorityScore,100,"warning")}</td>
      </tr>
    `).join("")}function w(e){if(!e)return`
        <div class="flex flex-col items-center justify-center h-full text-center p-4" style="color:var(--text-muted);">
          <div style="margin-bottom: var(--sp-2);">${v("users",28)}</div>
          <div style="font-weight: 500; color: var(--text-secondary);">No Candidate Selected</div>
          <div style="font-size: var(--text-xs); margin-top: var(--sp-1);">Select a user from the table to inspect scores and activation strategy</div>
        </div>
      `;const t=(e.destination||"").replace("St. Aloysius Campus","Campus").replace("Mangalore University Campus","MU Campus"),r=R(e),i=z(e);return`
      <div style="margin-bottom: var(--sp-5);">
        <div class="data-label" style="margin-bottom: var(--sp-1); text-transform: uppercase; letter-spacing: 0.05em;">CANDIDATE INTELLIGENCE</div>
        <div class="flex justify-between items-start">
          <div class="mono" style="font-size: var(--text-2xl); color: var(--color-primary); font-weight: 600;">${e.userId}</div>
          ${e.priorityScore>=75?u("HIGH PRIORITY","accent"):u("RANKED","muted")}
        </div>
        <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--sp-1);">${e.locality} &rarr; ${t}</div>
        <div style="font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px;">${e.routeDistance||4.2} km &middot; ${e.currentMode} &middot; ${e.routeFrequency}d/wk &middot; Dep: ${e.departureTime||"07:45"}</div>
      </div>

      <div style="margin-bottom: var(--sp-5);">
        <div class="section-title">Score Breakdown</div>
        ${m("Priority",e.priorityScore,100,"accent")}
        ${m("Driver Score",e.driverScore,100,"primary")}
        ${m("Connector",e.connectorScore,100,"warning")}
        ${m("Early Adopter",e.earlyAdopterScore,100,"success")}
        ${m("Passenger Match",e.passengerScore,100,"primary")}
      </div>

      <div style="margin-bottom: var(--sp-5);">
        <div class="section-title">Why This User?</div>
        <ul style="font-size: var(--text-sm); color: var(--text-secondary); padding-left: var(--sp-4); display:flex; flex-direction:column; gap: var(--sp-2); line-height: 1.4;">
          ${r.map(L=>`<li>${L}</li>`).join("")}
        </ul>
      </div>

      ${e.communityGroups&&e.communityGroups.length>0?`
      <div style="margin-bottom: var(--sp-5);">
        <div class="section-title">Affiliated Circles</div>
        <div class="flex flex-wrap gap-1">
          ${e.communityGroups.map(L=>`<span class="badge badge-muted">${L}</span>`).join("")}
        </div>
      </div>`:""}

      <div style="margin-top:auto; padding-top: var(--sp-4); border-top: 1px solid var(--border-subtle);">
        <div class="section-title">Tailored Intervention</div>
        <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--sp-3); line-height: 1.4;">${i}</p>
        <button class="btn btn-primary w-full" id="btn-draft-outreach">
          ${v("send",16)} Draft Outreach Message
        </button>
      </div>
    `}const p=x();p.length>0&&(!s||!p.some(e=>e.userId===s))&&(s=p[0].userId);const G=n.find(e=>e.userId===s)||p[0]||null;o.innerHTML=`
    <div style="margin-bottom: var(--sp-4);">
      <h1 class="page-title">People Intelligence</h1>
      <p class="page-subtitle">${n.length.toLocaleString()} candidates evaluated &middot; ${E} potential drivers &middot; ${F} community connectors</p>
    </div>

    <!-- Filter Bar (Minimalist Header Strip) -->
    <div class="flex gap-3 mb-4 items-center" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--sp-3); flex-wrap: wrap;">
      <select id="filter-role" class="select" aria-label="Filter by role">
        <option value="all">All Roles</option>
        <option value="drivers">Drivers (Car Access)</option>
        <option value="connectors">Connectors (Score &gt; 70)</option>
        <option value="early-adopters">Early Adopters</option>
        <option value="passengers">Passengers</option>
      </select>
      <select id="filter-corridor" class="select" aria-label="Filter by corridor">
        <option value="all">All Corridors</option>
        ${k.map(e=>`<option value="${e}">${e}</option>`).join("")}
      </select>
      <select id="filter-sort" class="select" aria-label="Sort by score">
        <option value="priorityScore">Sort: Priority Score</option>
        <option value="driverScore">Sort: Driver Score</option>
        <option value="connectorScore">Sort: Connector Score</option>
        <option value="earlyAdopterScore">Sort: Early Adopter</option>
      </select>
      <div class="flex-1" style="min-width: 160px; position: relative;">
        <span style="position: absolute; left: var(--sp-3); top: 50%; transform: translateY(-50%); color: var(--text-muted); display: flex;">
          ${v("search",14)}
        </span>
        <input id="filter-search" type="text" class="input w-full" placeholder="Search candidate ID, locality, society…" style="padding-left: 32px;" />
      </div>
      <button id="btn-reset-filters" class="btn btn-ghost btn-sm" style="display:none;">Reset</button>
    </div>

    <!-- Main Content (Grid 7-3) -->
    <div class="grid grid-7-3 gap-6 flex-1" style="min-height: 0; overflow: hidden;">
      <div class="table-wrap" style="overflow-y: auto;">
        <table>
          <thead>
            <tr>
              <th style="width: 36px;">#</th>
              <th style="width: 80px;">Candidate</th>
              <th>Origin Locality</th>
              <th>Detected Roles</th>
              <th style="width: 90px;">Driver</th>
              <th style="width: 90px;">Connect</th>
              <th style="width: 90px;">Priority</th>
            </tr>
          </thead>
          <tbody id="user-tbody">${$(p)}</tbody>
        </table>
        <div id="load-more-container" style="padding: var(--sp-3); text-align:center; ${p.length<=d?"display:none;":""}">
          <button id="btn-load-more" class="btn btn-subtle btn-sm">Load More Candidates</button>
        </div>
      </div>

      <div id="detail-panel" class="card glass-2 flex flex-col" style="overflow-y: auto;">
        ${w(G)}
      </div>
    </div>
  `,T.appendChild(o),M(o);const l=o.querySelector("#user-tbody"),g=o.querySelector("#detail-panel"),C=o.querySelector("#btn-load-more"),y=o.querySelector("#btn-reset-filters");function A(){const e=g.querySelector("#btn-draft-outreach");e==null||e.addEventListener("click",()=>{const t=n.find(i=>i.userId===s);if(!t)return;const r=`Hi ${t.userId}! FellaRide is starting a verified student carpool pilot from ${t.locality} to Campus. We identified your schedule as an ideal fit. Would you be open to learning how you can help anchor this route?`;navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(r),e.innerHTML=`${v("checkCircle",16)} Outreach Copied to Clipboard`,setTimeout(()=>{e.innerHTML=`${v("send",16)} Draft Outreach Message`},2e3)})}A();function I(e){s=e;const t=n.find(i=>i.userId===e);l.querySelectorAll(".user-row").forEach(i=>i.classList.remove("selected"));const r=l.querySelector(`[data-uid="${e}"]`);r&&r.classList.add("selected"),g.innerHTML=w(t),M(g),A()}l.addEventListener("click",e=>{const t=e.target.closest(".user-row");if(t){const r=t.getAttribute("data-uid");r&&I(r)}});function f(){a=o.querySelector("#filter-role").value,h=o.querySelector("#filter-corridor").value,b=o.querySelector("#filter-sort").value,c=o.querySelector("#filter-search").value.trim().toLowerCase(),d=30;const e=a!=="all"||h!=="all"||c!=="";y&&(y.style.display=e?"inline-flex":"none");const t=x();l.innerHTML=$(t);const r=o.querySelector("#load-more-container");if(r&&(r.style.display=t.length>d?"block":"none"),t.length>0)if(!t.some(i=>i.userId===s))I(t[0].userId);else{const i=l.querySelector(`[data-uid="${s}"]`);i&&i.classList.add("selected")}else g.innerHTML=w(null)}o.querySelector("#filter-role").addEventListener("change",f),o.querySelector("#filter-corridor").addEventListener("change",f),o.querySelector("#filter-sort").addEventListener("change",f),o.querySelector("#filter-search").addEventListener("input",f),y==null||y.addEventListener("click",()=>{o.querySelector("#filter-role").value="all",o.querySelector("#filter-corridor").value="all",o.querySelector("#filter-sort").value="priorityScore",o.querySelector("#filter-search").value="",f()}),C==null||C.addEventListener("click",()=>{d+=30;const e=x();l.innerHTML=$(e);const t=o.querySelector("#load-more-container");t&&(t.style.display=e.length>d?"block":"none");const r=l.querySelector(`[data-uid="${s}"]`);r&&r.classList.add("selected")})}export{j as render};
