import{i,a as d}from"./index-DZUtRM5o.js";function v(a,s,n){a.innerHTML="";const t=document.createElement("div");t.className="screen flex flex-col items-center justify-center",t.style.padding="4rem 2rem",t.innerHTML=`
    <div class="text-center mb-6" style="margin-bottom: var(--sp-8);">
      <h1 class="page-title">Community Command Centre</h1>
      <p class="page-subtitle">Select a community to begin analysis</p>
    </div>
    
    <div class="card-elevated" style="width: 100%; max-width: 560px; margin-bottom: var(--sp-6);">
      <div class="flex justify-between items-center" style="margin-bottom: var(--sp-5);">
        <div>
          <h2 style="font-size: var(--text-xl); font-weight: 600; margin-bottom: var(--sp-1);">St. Aloysius University</h2>
          <p class="data-label">Mangalore, Karnataka</p>
        </div>
        <span class="badge badge-warning">Pre-ignition</span>
      </div>
      
      <div class="grid grid-3 gap-4" style="margin-bottom: var(--sp-6);">
        <div class="metric">
          <div class="data-label">Population</div>
          <div class="metric-value" data-count="5000">0</div>
        </div>
        <div class="metric">
          <div class="data-label">Responses</div>
          <div class="metric-value" data-count="327">0</div>
        </div>
        <div class="metric">
          <div class="data-label">Active Users</div>
          <div class="metric-value">0</div>
        </div>
      </div>
      
      <button id="btn-analyse" class="btn btn-primary btn-lg w-full">
        ${i("zap")} Analyse Community
      </button>
    </div>
    
    <div class="grid grid-2 gap-4" style="width: 100%; max-width: 560px;">
      <div class="card glass-1 flex justify-between items-center" style="opacity: 0.6;">
        <div>
          <div style="font-size: var(--text-md); font-weight: 500; margin-bottom: var(--sp-1);">Manipal Institute of Tech</div>
          <div class="data-label mono">Pop: 8,000</div>
        </div>
        <span class="badge badge-muted">Coming Soon</span>
      </div>
      
      <div class="card glass-1 flex justify-between items-center" style="opacity: 0.6;">
        <div>
          <div style="font-size: var(--text-md); font-weight: 500; margin-bottom: var(--sp-1);">NIT Surathkal</div>
          <div class="data-label mono">Pop: 6,500</div>
        </div>
        <span class="badge badge-muted">Coming Soon</span>
      </div>
    </div>
  `,a.appendChild(t),d(t);const e=t.querySelector("#btn-analyse");e.addEventListener("click",()=>{e.innerHTML=`${i("activity")} Analysing…`,e.style.pointerEvents="none",e.style.opacity="0.7",setTimeout(()=>{s.isAnalysed=!0,n("overview")},800)})}export{v as render};
