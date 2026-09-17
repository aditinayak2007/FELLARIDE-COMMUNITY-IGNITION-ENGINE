import { icon } from './icons.js';
import { createBadge } from './shared.js';

let aiPanelElement = null;

export function renderAIPanel(container, analysisData) {
  if (aiPanelElement && aiPanelElement.parentNode) {
    aiPanelElement.parentNode.removeChild(aiPanelElement);
  }

  aiPanelElement = document.createElement('div');
  aiPanelElement.className = 'ai-panel';

  const corridors = analysisData.corridors || [];
  const supplyGaps = analysisData.supplyGaps || [];
  const topDrivers = analysisData.topDrivers || [];
  const topConnectors = analysisData.topConnectors || [];
  
  const worstGap = supplyGaps[0] || {};
  const topCorridor = worstGap.corridor || (corridors[0] || { origin: 'Surathkal', destination: 'Campus' });
  const totalPassengers = worstGap.passengers || 42;
  const totalDrivers = worstGap.confirmedDrivers || 1;
  const potentialDrivers = worstGap.potentialDrivers || 9;
  const topDriver = topDrivers[0] || { userId: 'U0092', driverScore: 91, availableSeats: 3 };
  const topConnector = topConnectors[0] || { userId: 'U0184', locality: 'Surathkal', connectorScore: 88 };
  const dest = (topCorridor.destination || '').replace('St. Aloysius Campus', 'Campus');

  const contentHtml = `
    <div class="ai-panel-header">
      <div style="display: flex; align-items: center; gap: var(--sp-2);">
        <span style="color: var(--color-primary); display: flex; align-items: center;">${icon('sparkles', 18)}</span>
        <span style="font-weight: 600; font-size: var(--text-md); letter-spacing: -0.01em;">Strategy Engine</span>
      </div>
      <button class="btn btn-subtle" id="ai-panel-close" aria-label="Close panel" style="padding: var(--sp-1); border-radius: 50%;">
        ${icon('x', 18)}
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
              <div style="font-weight: 500; font-size: var(--text-sm);">${topCorridor.origin} &rarr; ${dest}</div>
              ${createBadge('CRITICAL GAP', 'danger')}
            </div>
            <div style="display: flex; gap: var(--sp-3);">
              <div style="flex: 1;">
                <div class="data-label">Passengers</div>
                <div class="mono" style="color: var(--color-success); font-size: var(--text-lg); font-weight: 600;">${totalPassengers}</div>
              </div>
              <div style="flex: 1;">
                <div class="data-label">Drivers</div>
                <div class="mono" style="color: var(--color-primary); font-size: var(--text-lg); font-weight: 600;">${totalDrivers}</div>
              </div>
              <div style="flex: 1;">
                <div class="data-label">Potential</div>
                <div class="mono" style="color: var(--color-warning); font-size: var(--text-lg); font-weight: 600;">${potentialDrivers}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="section-title">RECOMMENDED ACTIONS</div>
          <ol style="padding-left: var(--sp-4); font-size: var(--text-sm); color: var(--text-secondary); display: flex; flex-direction: column; gap: var(--sp-3); line-height: 1.5;">
            <li><span style="color: var(--text-primary); font-weight: 500;">Activate ${topDriver.userId}</span> &mdash; Driver Score ${topDriver.driverScore}, ${topDriver.availableSeats || 3} seats. High route overlap on peak morning window.</li>
            <li><span style="color: var(--text-primary); font-weight: 500;">Engage ${topConnector.userId}</span> &mdash; Connector Score ${topConnector.connectorScore}. Introduce pilot ride across community circles.</li>
            <li><span style="color: var(--text-primary); font-weight: 500;">Target ${Math.min(3, potentialDrivers)} potential drivers</span> &mdash; Vehicle access confirmed, commute subsidization offer advised.</li>
            <li><span style="color: var(--text-primary); font-weight: 500;">Schedule pilot ride</span> &mdash; Trigger activation once 3 drivers lock schedule.</li>
          </ol>
        </div>

        <div>
          <div class="section-title">TARGET CANDIDATES</div>
          <div style="display: flex; flex-direction: column; gap: var(--sp-2);">
            ${topDrivers.slice(0, 3).map(u => `
              <div class="glass-1" style="display: flex; justify-content: space-between; align-items: center; padding: var(--sp-2) var(--sp-3);">
                <div>
                  <div class="mono" style="color: var(--color-primary); font-weight: 500; font-size: var(--text-sm);">${u.userId}</div>
                  <div style="font-size: var(--text-xs); color: var(--text-muted);">${u.locality}</div>
                </div>
                ${createBadge('Score: ' + u.driverScore, 'primary')}
              </div>
            `).join('')}
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
          <div class="glass-1 mono" style="padding: var(--sp-3) var(--sp-4); font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.6; user-select: all;" id="ai-outreach-msg">"Hey! We noticed high student demand from ${topCorridor.origin} to campus around 7:30-8:30 AM. Since you commute regularly, would you share your empty seats on FellaRide? You'll help classmates travel safely while covering fuel costs."</div>
          <button class="btn btn-ghost" id="btn-copy-outreach" style="width: 100%; margin-top: var(--sp-2);">
            ${icon('copy', 16)} Copy Message
          </button>
        </div>

        <button class="btn btn-primary" id="btn-regen-strategy" style="width: 100%; margin-top: var(--sp-1);">
          ${icon('refreshCw', 16)} Regenerate Strategy
        </button>
      </div>
    </div>
  `;

  aiPanelElement.innerHTML = contentHtml;
  container.appendChild(aiPanelElement);

  // Close handlers
  aiPanelElement.querySelector('#ai-panel-close')?.addEventListener('click', hideAIPanel);

  // Copy handler
  const copyBtn = aiPanelElement.querySelector('#btn-copy-outreach');
  copyBtn?.addEventListener('click', () => {
    const text = aiPanelElement.querySelector('#ai-outreach-msg')?.innerText || '';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
    copyBtn.innerHTML = `${icon('checkCircle', 16)} Copied to Clipboard`;
    setTimeout(() => {
      copyBtn.innerHTML = `${icon('copy', 16)} Copy Message`;
    }, 2000);
  });

  // Regenerate handler
  const regenBtn = aiPanelElement.querySelector('#btn-regen-strategy');
  regenBtn?.addEventListener('click', () => {
    runSynthesis();
  });
}

function runSynthesis() {
  if (!aiPanelElement) return;
  const loading = aiPanelElement.querySelector('#ai-loading');
  const results = aiPanelElement.querySelector('#ai-results');
  if (!loading || !results) return;

  loading.style.display = 'flex';
  results.style.display = 'none';

  setTimeout(() => {
    loading.style.display = 'none';
    results.style.display = 'flex';

    const sections = results.children;
    for (let i = 0; i < sections.length; i++) {
      sections[i].style.opacity = '0';
      sections[i].style.transform = 'translateY(6px)';
      sections[i].style.transition = 'all var(--duration-normal) var(--ease-out)';

      setTimeout(() => {
        sections[i].style.opacity = '1';
        sections[i].style.transform = 'translateY(0)';
      }, i * 70 + 40);
    }
  }, 1000);
}

export function showAIPanel() {
  if (!aiPanelElement) return;
  aiPanelElement.classList.add('open');
  runSynthesis();
}

export function hideAIPanel() {
  if (aiPanelElement) {
    aiPanelElement.classList.remove('open');
  }
}

// Global escape key listener
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && aiPanelElement && aiPanelElement.classList.contains('open')) {
    hideAIPanel();
  }
});
