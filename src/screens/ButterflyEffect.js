import { icon } from '../components/icons.js';

let animationId = null;
let nodes = [];
let edges = [];
let step = 0;
let isPlaying = false;
let canvasCtx = null;
let canvasWidth = 0;
let canvasHeight = 0;
let metrics = {
  active: 0,
  rides: 0,
  drivers: 0,
  referrals: 0
};
let resizeHandler = null;

export function render(container, appState, navigateTo) {
  container.innerHTML = '';
  const screen = document.createElement('div');
  screen.className = 'screen flex flex-col';
  screen.style.height = '100%';

  screen.innerHTML = `
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
              ${icon('skipBack', 16)}
            </button>
            <button id="btn-play-pause" class="btn btn-primary" style="padding: var(--sp-2) var(--sp-4); gap: var(--sp-2);" title="Play/Pause simulation">
              <span id="play-icon">${icon('play', 16)}</span>
              <span id="play-label" style="font-size: var(--text-xs); font-weight: 600;">Play</span>
            </button>
            <button id="btn-skip-forward" class="btn btn-subtle" style="padding: var(--sp-2);" title="Step forward">
              ${icon('skipForward', 16)}
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
            ${icon('refreshCw', 14)} Reset Simulation
          </button>
        </div>
      </div>
    </div>
  `;

  container.appendChild(screen);

  // Setup Canvas
  const canvas = document.getElementById('sim-canvas');
  if (!canvas) return;
  canvasCtx = canvas.getContext('2d');

  resizeHandler = () => {
    if (!canvas || !canvas.parentElement) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvasWidth = rect.width;
    canvasHeight = rect.height;
    if (nodes.length === 0) initNodes();
  };

  window.addEventListener('resize', resizeHandler);
  setTimeout(resizeHandler, 20);

  function initNodes() {
    nodes = [];
    edges = [];
    step = 0;
    metrics = { active: 0, rides: 0, drivers: 0, referrals: 0 };
    updateMetricsAndLog();

    const count = 75;
    for (let i = 0; i < count; i++) {
      nodes.push({
        id: i,
        x: Math.random() * (canvasWidth || 500),
        y: Math.random() * (canvasHeight || 400),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        type: 'inactive',
        active: false,
        pulse: 0
      });
    }
  }

  function advanceStep() {
    if (step >= 10) {
      isPlaying = false;
      const playIcon = document.getElementById('play-icon');
      const playLabel = document.getElementById('play-label');
      if (playIcon) playIcon.innerHTML = icon('play', 16);
      if (playLabel) playLabel.textContent = 'Play';
      return;
    }

    step++;
    const eventLog = document.getElementById('event-log');
    const time = `T+0${step}w`;
    let logMsg = '';

    if (step === 1) {
      const n = nodes.find(n => !n.active);
      if (n) { n.type = 'connector'; n.active = true; n.pulse = 1; metrics.active++; }
      logMsg = 'Activated Key Connector U0184 (Surathkal Society Lead). High referral centrality.';
    } else if (step === 2) {
      const c = nodes.find(n => n.type === 'connector');
      let added = 0;
      nodes.forEach(n => {
        if (!n.active && added < 3) {
          n.type = 'driver'; n.active = true; n.pulse = 1;
          if (c) edges.push({ source: c, target: n, active: true });
          metrics.active++; metrics.drivers++; added++;
        }
      });
      logMsg = 'Connector introduced 3 anchor drivers on Surathkal corridor (commute subsidization activated).';
    } else if (step === 3) {
      const drvs = nodes.filter(n => n.type === 'driver');
      let added = 0;
      nodes.forEach(n => {
        if (!n.active && added < 8) {
          n.type = 'passenger'; n.active = true; n.pulse = 1;
          const targetD = drvs[added % drvs.length];
          if (targetD) edges.push({ source: targetD, target: n, active: true });
          metrics.active++; added++;
        }
      });
      logMsg = '8 daily bus commuters matched with anchor drivers for morning departure.';
    } else if (step === 4) {
      metrics.rides += 12;
      edges.forEach(e => e.active = true);
      logMsg = 'First 12 pilot rides completed with 100% on-time arrival. Trust verified.';
    } else if (step === 5) {
      let added = 0;
      nodes.forEach(n => {
        if (!n.active && added < 2) {
          n.type = 'connector'; n.active = true; n.pulse = 1;
          const randomActive = nodes.find(x => x.active && x.type !== 'inactive');
          if (randomActive) edges.push({ source: randomActive, target: n, active: true });
          metrics.active++; metrics.referrals++; added++;
        }
      });
      logMsg = 'Butterfly cascade: 2 riders advocate FellaRide in Commerce Faculty & NSS groups.';
    } else if (step === 6) {
      let added = 0;
      nodes.forEach(n => {
        if (!n.active && added < 4) {
          n.type = 'driver'; n.active = true; n.pulse = 1;
          const randomActive = nodes.find(x => x.active && x.type !== 'inactive');
          if (randomActive) edges.push({ source: randomActive, target: n, active: true });
          metrics.active++; metrics.drivers++; added++;
        }
      });
      metrics.rides += 16;
      logMsg = 'Kavoor & Kottara corridors ignite: 4 new drivers onboarded via peer invites.';
    } else {
      let added = 0;
      nodes.forEach(n => {
        if (!n.active && added < step * 2) {
          n.type = Math.random() > 0.25 ? 'passenger' : 'driver';
          n.active = true; n.pulse = 1;
          const randomActive = nodes.find(x => x.active && x.type !== 'inactive');
          if (randomActive) edges.push({ source: randomActive, target: n, active: true });
          metrics.active++;
          if (n.type === 'driver') metrics.drivers++;
          added++;
        }
      });
      metrics.rides += step * 6;
      metrics.referrals += 2;
      logMsg = `Self-sustaining network effect. Community density reached across all 4 corridors.`;
    }

    if (eventLog) {
      if (eventLog.querySelector('.italic')) eventLog.innerHTML = '';
      const entry = document.createElement('div');
      entry.className = 'event-log-entry';
      entry.innerHTML = `<span class="event-log-time">[${time}]</span> <span style="line-height:1.4;">${logMsg}</span>`;
      eventLog.prepend(entry);
    }

    updateMetricsAndLog();
  }

  function updateMetricsAndLog() {
    const activeEl = document.getElementById('metric-active');
    const ridesEl = document.getElementById('metric-rides');
    const driversEl = document.getElementById('metric-drivers');
    const referralsEl = document.getElementById('metric-referrals');
    const stepEl = document.getElementById('step-indicator');

    if (activeEl) activeEl.textContent = metrics.active;
    if (ridesEl) ridesEl.textContent = metrics.rides;
    if (driversEl) driversEl.textContent = metrics.drivers;
    if (referralsEl) referralsEl.textContent = metrics.referrals;
    if (stepEl) {
      const stageName = step === 0 ? 'Pre-Ignition' : step <= 3 ? 'Anchor Seeding' : step <= 6 ? 'Referral Cascade' : 'Self-Sustaining';
      stepEl.textContent = `Stage ${step} of 10 \u00B7 ${stageName}`;
    }
  }

  let lastTime = 0;
  function renderFrame(time) {
    if (!canvasCtx) return;

    canvasCtx.fillStyle = 'rgba(11, 15, 25, 0.3)';
    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Render edges
    canvasCtx.lineWidth = 1;
    edges.forEach(e => {
      canvasCtx.beginPath();
      canvasCtx.moveTo(e.source.x, e.source.y);
      canvasCtx.lineTo(e.target.x, e.target.y);
      canvasCtx.strokeStyle = e.active ? 'rgba(79, 142, 247, 0.35)' : 'rgba(255, 255, 255, 0.05)';
      canvasCtx.stroke();
    });

    // Render nodes
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 10 || n.x > canvasWidth - 10) n.vx *= -1;
      if (n.y < 10 || n.y > canvasHeight - 10) n.vy *= -1;

      let color = 'rgba(85, 94, 115, 0.25)';
      if (n.type === 'connector') color = '#E8734A';
      else if (n.type === 'driver') color = '#4F8EF7';
      else if (n.type === 'passenger') color = '#3ECFA0';

      let radius = n.active ? 4.5 : 2.5;
      if (n.pulse > 0) {
        canvasCtx.beginPath();
        canvasCtx.arc(n.x, n.y, radius + n.pulse * 8, 0, Math.PI * 2);
        canvasCtx.fillStyle = color.replace(')', ', 0.2)').replace('rgb', 'rgba');
        canvasCtx.fill();
        n.pulse -= 0.04;
      }

      canvasCtx.beginPath();
      canvasCtx.arc(n.x, n.y, radius, 0, Math.PI * 2);
      canvasCtx.fillStyle = color;
      canvasCtx.fill();
    });

    if (isPlaying) {
      if (time - lastTime > 1800) {
        advanceStep();
        lastTime = time;
      }
    }

    animationId = requestAnimationFrame(renderFrame);
  }

  function resetSim() {
    initNodes();
    const eventLog = document.getElementById('event-log');
    if (eventLog) eventLog.innerHTML = '<div class="text-muted italic" style="font-size: var(--text-xs); padding: var(--sp-2) 0;">Simulation reset. Press Play or Step Forward to start.</div>';
    isPlaying = false;
    const playIcon = document.getElementById('play-icon');
    const playLabel = document.getElementById('play-label');
    if (playIcon) playIcon.innerHTML = icon('play', 16);
    if (playLabel) playLabel.textContent = 'Play';
  }

  document.getElementById('btn-skip-back')?.addEventListener('click', resetSim);
  document.getElementById('btn-reset')?.addEventListener('click', resetSim);

  document.getElementById('btn-play-pause')?.addEventListener('click', (e) => {
    if (step >= 10) {
      resetSim();
    }
    isPlaying = !isPlaying;
    const playIcon = document.getElementById('play-icon');
    const playLabel = document.getElementById('play-label');
    if (playIcon) playIcon.innerHTML = isPlaying ? icon('pause', 16) : icon('play', 16);
    if (playLabel) playLabel.textContent = isPlaying ? 'Pause' : 'Play';
    if (isPlaying) lastTime = performance.now();
  });

  document.getElementById('btn-skip-forward')?.addEventListener('click', () => {
    if (step >= 10) resetSim();
    advanceStep();
  });

  animationId = requestAnimationFrame(renderFrame);
}

export function destroy() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
  canvasCtx = null;
  isPlaying = false;
}
