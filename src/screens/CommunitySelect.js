import { initAnimations } from '../components/shared.js';
import { icon } from '../components/icons.js';

export function render(container, appState, navigateTo) {
  container.innerHTML = '';
  const screen = document.createElement('div');
  screen.className = 'screen flex flex-col items-center justify-center';
  screen.style.padding = '4rem 2rem';

  screen.innerHTML = `
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
        ${icon('zap')} Analyse Community
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
  `;

  container.appendChild(screen);
  initAnimations(screen);

  const btn = screen.querySelector('#btn-analyse');
  btn.addEventListener('click', () => {
    btn.innerHTML = `${icon('activity')} Analysing…`;
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';
    setTimeout(() => {
      appState.isAnalysed = true;
      navigateTo('overview');
    }, 800);
  });
}
