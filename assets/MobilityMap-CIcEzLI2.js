import{i as h}from"./index-DZUtRM5o.js";let i=null;function D(m,c,I){var f,u;m.innerHTML="";const d=document.createElement("div");d.className="screen flex flex-col",d.style.height="100%";const a=c.corridors||[],y=c.supplyGaps||[],E=new Set(y.map(t=>t.corridor?t.corridor.id:t.id)),A=[...new Set(a.map(t=>t.destination))],C=a.reduce((t,n)=>t+(n.passengerCount||0),0),w=a.reduce((t,n)=>t+(n.driverCount||0),0),$=y.filter(t=>t.severity==="CRITICAL"||t.severity==="HIGH").length;if(d.innerHTML=`
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="page-title">Mobility Map</h1>
        <p class="page-subtitle">${a.length} active corridors identified</p>
      </div>
    </div>
    
    <div class="flex gap-3 mb-4 items-center">
      <select id="map-dest-filter" class="select">
        <option value="all">All Destinations</option>
        ${A.map(t=>`<option value="${t}">${t.replace("St. Aloysius Campus","Campus").replace("Mangalore University Campus","MU Campus")}</option>`).join("")}
      </select>
      <button id="toggle-gaps" class="btn btn-ghost">
        ${h("alertTriangle")} Supply Gaps Only
      </button>
    </div>
    
    <div class="relative flex-1" style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-subtle); min-height: 55vh;">
      <div id="map" style="width:100%;height:100%;position:absolute;inset:0;"></div>
      
      <!-- Legend -->
      <div class="map-overlay" style="position:absolute; top:var(--sp-4); right:var(--sp-4); font-size: var(--text-xs);">
        <div style="font-weight:500; margin-bottom: var(--sp-2); color: var(--text-secondary);">Legend</div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2"><div style="width:10px;height:10px;border-radius:50%;background:#E55A6E;"></div> Supply Gap</div>
          <div class="flex items-center gap-2"><div style="width:10px;height:10px;border-radius:50%;background:#E5A84B;"></div> High Demand</div>
          <div class="flex items-center gap-2"><div style="width:10px;height:10px;border-radius:50%;background:#3ECFA0;"></div> Balanced</div>
          <div class="flex items-center gap-2"><div style="width:14px;height:2px;background:var(--color-primary);"></div> Route Line</div>
        </div>
      </div>

      <!-- Stats Bar -->
      <div class="map-overlay flex gap-6" style="position:absolute; bottom:var(--sp-4); left:var(--sp-4); right:var(--sp-4);">
        <div>
          <div class="data-label">Total Demand</div>
          <div class="mono" style="font-size: var(--text-lg); color: var(--color-success);">${C}</div>
        </div>
        <div>
          <div class="data-label">Total Supply</div>
          <div class="mono" style="font-size: var(--text-lg); color: var(--color-primary);">${w}</div>
        </div>
        <div>
          <div class="data-label">Critical Gaps</div>
          <div class="mono" style="font-size: var(--text-lg); color: var(--color-danger);">${$}</div>
        </div>
        <div>
          <div class="data-label">Corridors</div>
          <div class="mono" style="font-size: var(--text-lg);">${a.length}</div>
        </div>
      </div>
    </div>
  `,m.appendChild(d),typeof L>"u"){document.getElementById("map").innerHTML='<div class="flex items-center justify-center h-full" style="color:var(--text-muted);">Leaflet not loaded. Check internet.</div>';return}i=L.map("map",{zoomControl:!1}).setView([12.89,74.84],12),L.control.zoom({position:"topleft"}).addTo(i),L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{attribution:"&copy; OpenStreetMap &copy; CARTO",subdomains:"abcd",maxZoom:19}).addTo(i);let r=[],v=[],l=!1;function g(){var n;r.forEach(e=>e.remove()),v.forEach(e=>e.remove()),r=[],v=[];const t=((n=document.getElementById("map-dest-filter"))==null?void 0:n.value)||"all";(c.destinations||[]).forEach(e=>{if(t!=="all"&&e.name!==t)return;const s=L.divIcon({html:`<div style="width:20px;height:20px;background:rgba(79,142,247,0.3);border:2px solid var(--color-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;">${h("target",12)}</div>`,className:"custom-div-icon",iconSize:[20,20],iconAnchor:[10,10]}),o=L.marker([e.lat,e.lng],{icon:s}).addTo(i).bindPopup(`<div style="background:#141A2A;color:#E8ECF4;padding:8px;border-radius:8px;font-family:Inter,sans-serif;"><b>${e.name}</b></div>`);r.push(o)}),a.forEach(e=>{if(t!=="all"&&e.destination!==t)return;const s=E.has(e.id);if(l&&!s)return;const o=e.passengerCount||0,x=e.driverCount||0,k=o>20&&!s;let p="#3ECFA0";s?p="#E55A6E":k&&(p="#E5A84B");const z=e.totalCount||o+x,M=Math.max(6,Math.min(35,z*.1));if(e.originLat&&e.originLng){const b=L.circleMarker([e.originLat,e.originLng],{radius:M,fillColor:p,color:"rgba(255,255,255,0.2)",weight:1,fillOpacity:.6}).addTo(i);if(b.bindPopup(`
          <div style="background:#141A2A;color:#E8ECF4;padding:12px;border-radius:8px;font-family:Inter,sans-serif;min-width:160px;">
            <div style="font-weight:600;margin-bottom:6px;">${e.origin}</div>
            <div style="font-size:12px;color:#8892A7;margin-bottom:8px;">to ${e.destination}</div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;"><span style="color:#8892A7;">Passengers</span><span style="font-family:'JetBrains Mono',monospace;color:#3ECFA0;">${o}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;"><span style="color:#8892A7;">Drivers</span><span style="font-family:'JetBrains Mono',monospace;color:#4F8EF7;">${x}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;"><span style="color:#8892A7;">Potential</span><span style="font-family:'JetBrains Mono',monospace;color:#E5A84B;">${e.potentialDriverCount||0}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:#8892A7;">Ratio</span><span style="font-family:'JetBrains Mono',monospace;">${e.supplyDemandRatio||"N/A"}</span></div>
            <div style="margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.06);">
              ${s?'<span style="display:inline-block;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:500;background:rgba(229,90,110,0.12);color:#E55A6E;">SUPPLY GAP</span>':'<span style="display:inline-block;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:500;background:rgba(62,207,160,0.12);color:#3ECFA0;">BALANCED</span>'}
            </div>
          </div>
        `),r.push(b),e.destLat&&e.destLng){const T=Math.max(1.5,Math.min(6,o/10)),B=L.polyline([[e.originLat,e.originLng],[e.destLat,e.destLng]],{color:p,weight:T,opacity:.35,dashArray:s?"6, 8":null}).addTo(i);v.push(B)}}})}g(),setTimeout(()=>i==null?void 0:i.invalidateSize(),200),(f=document.getElementById("map-dest-filter"))==null||f.addEventListener("change",g),(u=document.getElementById("toggle-gaps"))==null||u.addEventListener("click",function(){l=!l,this.classList.toggle("btn-ghost",!l),this.classList.toggle("btn-primary",l),g()})}function F(){i&&(i.remove(),i=null)}export{F as destroy,D as render};
