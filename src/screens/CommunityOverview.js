import { icon } from '../components/icons.js';
import { createMetric, createFunnelBar, createCorridorRow, createBadge, initAnimations } from '../components/shared.js';

export function render(container, appState, navigateTo) {
  container.innerHTML = '';
  const screen = document.createElement('div');
  screen.className = 'screen';

  // Ground truth metrics from Section 4 of spec
  const population = 5000;
  const responses = 327;
  const potentialDrivers = 31;
  const confirmedDrivers = 7;
  const totalPassengers = 126;
  const connectors = 18;
  const supplyGapsCount = 4;
  const sdRatio = '1:18';

  // Specific high-priority corridors from Section 5
  const priorityCorridors = [
    { origin: 'Surathkal', destination: 'St. Aloysius Campus', passengerCount: 42, driverCount: 1, potentialDriverCount: 9, supplyDemandRatio: '1:42' },
    { origin: 'Kavoor', destination: 'St. Aloysius Campus', passengerCount: 32, driverCount: 4, potentialDriverCount: 6, supplyDemandRatio: '1:8' },
    { origin: 'Kottara', destination: 'St. Aloysius Campus', passengerCount: 21, driverCount: 3, potentialDriverCount: 4, supplyDemandRatio: '1:7' },
    { origin: 'Bendoor', destination: 'St. Aloysius Campus', passengerCount: 18, driverCount: 7, potentialDriverCount: 5, supplyDemandRatio: '1:3' }
  ];

  screen.innerHTML = `
    <div class="flex justify-between items-center mb-6" style="flex-wrap: wrap; gap: var(--sp-3);">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <h1 class="page-title">${appState.community.name}</h1>
          ${createBadge('Pre-Ignition Analysis', 'success')}
        </div>
        <p class="page-subtitle">Community Mobility Assessment &middot; ${responses} Voluntary Responses from ${population.toLocaleString()} Members</p>
      </div>
      <button class="btn btn-ghost" id="btn-ai-overview">
        ${icon('sparkles', 16)} Strategy Engine
      </button>
    </div>
    
    <!-- KEY METRICS (Single Level-1 Glass Surface) -->
    <div class="glass-1 p-5 mb-6" style="border-radius: var(--radius-lg);">
      <div class="grid grid-4 gap-4">
        ${createMetric('Community Population', population, 'users', 'primary')}
        ${createMetric('Mobility Responses', responses, 'activity', 'primary')}
        ${createMetric('Potential Drivers', potentialDrivers, 'car', 'warning')}
        ${createMetric('Confirmed Drivers', confirmedDrivers, 'checkCircle', 'success')}
      </div>
      <div class="grid grid-4 gap-4 mt-4" style="border-top: 1px solid var(--border-subtle); padding-top: var(--sp-4);">
        ${createMetric('Passengers', totalPassengers, 'route', 'primary')}
        ${createMetric('Connectors (>70)', connectors, 'link', 'accent')}
        ${createMetric('High-Demand Corridors', supplyGapsCount, 'alertTriangle', 'danger')}
        ${createMetric('Supply / Demand Ratio', sdRatio, 'target', 'warning')}
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
            ${createFunnelBar('Mobility Responses', responses, responses, 'var(--color-primary)')}
            ${createFunnelBar('Potential Drivers', potentialDrivers, responses, 'var(--color-accent)')}
            ${createFunnelBar('Confirmed Drivers', confirmedDrivers, responses, 'var(--color-success)')}
            ${createFunnelBar('Target First Rides', 3, responses, 'var(--color-primary)')}
            ${createFunnelBar('Active Pilot Users', 11, responses, 'var(--color-warning)')}
            ${createFunnelBar('Projected Growth', 35, responses, 'var(--color-accent)')}
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
          ${priorityCorridors.map(c => createCorridorRow(c)).join('')}
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
        ${['Data Collection', 'Community Mapping', 'Route Clustering', 'Supply Analysis', 'Candidate ID', 'Ready for Ignition'].map((label, i) => `
          <div class="timeline-step">
            <div class="timeline-dot ${i < 5 ? 'done' : 'current'}">${i < 5 ? '✓' : '!'}</div>
            <div class="timeline-label ${i < 5 ? 'done' : 'current'}">${label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.appendChild(screen);
  initAnimations(screen);

  // Wire events
  screen.querySelector('#view-map-link')?.addEventListener('click', () => navigateTo('mobility-map'));
  screen.querySelector('#btn-ai-overview')?.addEventListener('click', () => {
    document.getElementById('btn-ai-strategy')?.click();
  });
}
