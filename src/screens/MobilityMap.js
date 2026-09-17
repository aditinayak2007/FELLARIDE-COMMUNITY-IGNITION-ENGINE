
import { icon } from '../components/icons.js';
import { createBadge } from '../components/shared.js';

let mapInstance = null;

export function render(container, appState, navigateTo) {
  container.innerHTML = '';
  const screen = document.createElement('div');
  screen.className = 'screen flex flex-col';
  screen.style.height = '100%';

  const corridors = appState.corridors || [];
  const supplyGaps = appState.supplyGaps || [];
  const gapIds = new Set(supplyGaps.map(g => g.corridor ? g.corridor.id : g.id));
  const destinations = [...new Set(corridors.map(c => c.destination))];
  const totalDemand = corridors.reduce((s, c) => s + (c.passengerCount || 0), 0);
  const totalSupply = corridors.reduce((s, c) => s + (c.driverCount || 0), 0);
  const gapCount = supplyGaps.filter(g => g.severity === 'CRITICAL' || g.severity === 'HIGH').length;

  screen.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="page-title">Mobility Map</h1>
        <p class="page-subtitle">${corridors.length} active corridors identified</p>
      </div>
    </div>
    
    <div class="flex gap-3 mb-4 items-center">
      <select id="map-dest-filter" class="select">
        <option value="all">All Destinations</option>
        ${destinations.map(d => `<option value="${d}">${d.replace('St. Aloysius Campus', 'Campus').replace('Mangalore University Campus', 'MU Campus')}</option>`).join('')}
      </select>
      <button id="toggle-gaps" class="btn btn-ghost">
        ${icon('alertTriangle')} Supply Gaps Only
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
          <div class="mono" style="font-size: var(--text-lg); color: var(--color-success);">${totalDemand}</div>
        </div>
        <div>
          <div class="data-label">Total Supply</div>
          <div class="mono" style="font-size: var(--text-lg); color: var(--color-primary);">${totalSupply}</div>
        </div>
        <div>
          <div class="data-label">Critical Gaps</div>
          <div class="mono" style="font-size: var(--text-lg); color: var(--color-danger);">${gapCount}</div>
        </div>
        <div>
          <div class="data-label">Corridors</div>
          <div class="mono" style="font-size: var(--text-lg);">${corridors.length}</div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(screen);

  // Initialize map
  if (typeof L === 'undefined') {
    document.getElementById('map').innerHTML = '<div class="flex items-center justify-center h-full" style="color:var(--text-muted);">Leaflet not loaded. Check internet.</div>';
    return;
  }

  mapInstance = L.map('map', { zoomControl: false }).setView([12.89, 74.84], 12);
  L.control.zoom({ position: 'topleft' }).addTo(mapInstance);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(mapInstance);

  let markers = [];
  let lines = [];
  let showingGapsOnly = false;

  function renderCorridors() {
    markers.forEach(m => m.remove());
    lines.forEach(l => l.remove());
    markers = [];
    lines = [];

    const destFilter = document.getElementById('map-dest-filter')?.value || 'all';

    // Add destination markers
    (appState.destinations || []).forEach(dest => {
      if (destFilter !== 'all' && dest.name !== destFilter) return;
      const destIcon = L.divIcon({
        html: `<div style="width:20px;height:20px;background:rgba(79,142,247,0.3);border:2px solid var(--color-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;">${icon('target', 12)}</div>`,
        className: 'custom-div-icon',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      const m = L.marker([dest.lat, dest.lng], { icon: destIcon }).addTo(mapInstance)
        .bindPopup(`<div style="background:#141A2A;color:#E8ECF4;padding:8px;border-radius:8px;font-family:Inter,sans-serif;"><b>${dest.name}</b></div>`);
      markers.push(m);
    });

    corridors.forEach(corridor => {
      if (destFilter !== 'all' && corridor.destination !== destFilter) return;
      const isGap = gapIds.has(corridor.id);
      if (showingGapsOnly && !isGap) return;

      const passengers = corridor.passengerCount || 0;
      const drivers = corridor.driverCount || 0;
      const isHighDemand = passengers > 20 && !isGap;

      let color = '#3ECFA0'; // success
      if (isGap) color = '#E55A6E'; // danger
      else if (isHighDemand) color = '#E5A84B'; // warning

      const totalCount = corridor.totalCount || (passengers + drivers);
      const radius = Math.max(6, Math.min(35, totalCount * 0.1));

      if (corridor.originLat && corridor.originLng) {
        const circle = L.circleMarker([corridor.originLat, corridor.originLng], {
          radius,
          fillColor: color,
          color: 'rgba(255,255,255,0.2)',
          weight: 1,
          fillOpacity: 0.6
        }).addTo(mapInstance);

        circle.bindPopup(`
          <div style="background:#141A2A;color:#E8ECF4;padding:12px;border-radius:8px;font-family:Inter,sans-serif;min-width:160px;">
            <div style="font-weight:600;margin-bottom:6px;">${corridor.origin}</div>
            <div style="font-size:12px;color:#8892A7;margin-bottom:8px;">to ${corridor.destination}</div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;"><span style="color:#8892A7;">Passengers</span><span style="font-family:'JetBrains Mono',monospace;color:#3ECFA0;">${passengers}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;"><span style="color:#8892A7;">Drivers</span><span style="font-family:'JetBrains Mono',monospace;color:#4F8EF7;">${drivers}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;"><span style="color:#8892A7;">Potential</span><span style="font-family:'JetBrains Mono',monospace;color:#E5A84B;">${corridor.potentialDriverCount || 0}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:#8892A7;">Ratio</span><span style="font-family:'JetBrains Mono',monospace;">${corridor.supplyDemandRatio || 'N/A'}</span></div>
            <div style="margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.06);">
              ${isGap
                ? '<span style="display:inline-block;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:500;background:rgba(229,90,110,0.12);color:#E55A6E;">SUPPLY GAP</span>'
                : '<span style="display:inline-block;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:500;background:rgba(62,207,160,0.12);color:#3ECFA0;">BALANCED</span>'}
            </div>
          </div>
        `);
        markers.push(circle);

        // Route line
        if (corridor.destLat && corridor.destLng) {
          const weight = Math.max(1.5, Math.min(6, passengers / 10));
          const line = L.polyline(
            [[corridor.originLat, corridor.originLng], [corridor.destLat, corridor.destLng]],
            { color, weight, opacity: 0.35, dashArray: isGap ? '6, 8' : null }
          ).addTo(mapInstance);
          lines.push(line);
        }
      }
    });
  }

  renderCorridors();
  setTimeout(() => mapInstance?.invalidateSize(), 200);

  // Filters
  document.getElementById('map-dest-filter')?.addEventListener('change', renderCorridors);
  document.getElementById('toggle-gaps')?.addEventListener('click', function () {
    showingGapsOnly = !showingGapsOnly;
    this.classList.toggle('btn-ghost', !showingGapsOnly);
    this.classList.toggle('btn-primary', showingGapsOnly);
    renderCorridors();
  });
}

export function destroy() {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
}
