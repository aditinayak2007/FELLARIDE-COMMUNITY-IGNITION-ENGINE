import { icon } from '../components/icons.js';
import { createBadge, createScoreRow, initAnimations } from '../components/shared.js';

export function render(container, appState, navigateTo) {
  container.innerHTML = '';
  const screen = document.createElement('div');
  screen.className = 'screen flex flex-col';
  screen.style.height = '100%';

  const users = appState.users || [];
  const driversCount = users.filter(u => u.carAccess && u.willingToDrive).length;
  const connectorsCount = users.filter(u => u.connectorScore > 70).length;
  const corridorNames = [...new Set((appState.corridors || []).map(c => c.origin))].sort();

  let currentSort = 'priorityScore';
  let currentRole = 'all';
  let currentCorridor = 'all';
  let searchTerm = '';
  let displayCount = 30;
  let selectedUserId = users[0]?.userId || null;

  function getFilteredUsers() {
    let filtered = [...users];
    if (currentRole === 'drivers') filtered = filtered.filter(u => u.carAccess && u.willingToDrive);
    else if (currentRole === 'connectors') filtered = filtered.filter(u => u.connectorScore > 70);
    else if (currentRole === 'early-adopters') filtered = filtered.filter(u => u.earlyAdopterScore > 70);
    else if (currentRole === 'passengers') filtered = filtered.filter(u => !u.carAccess);
    if (currentCorridor !== 'all') filtered = filtered.filter(u => u.locality === currentCorridor);
    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.userId.toLowerCase().includes(searchTerm) || 
        u.locality.toLowerCase().includes(searchTerm) ||
        (u.communityGroups && u.communityGroups.some(g => g.toLowerCase().includes(searchTerm)))
      );
    }
    filtered.sort((a, b) => (b[currentSort] || 0) - (a[currentSort] || 0));
    return filtered;
  }

  function miniBar(val, max, color) {
    const pct = Math.min(100, Math.max(0, (val / max) * 100));
    return `<div class="flex items-center gap-2">
      <div class="progress-track" style="width:44px;">
        <div class="progress-fill ${color}" style="width:${pct}%;"></div>
      </div>
      <span class="mono" style="font-size:var(--text-xs); width:24px; color:var(--text-secondary); text-align:right;">${val}</span>
    </div>`;
  }

  function renderRoles(u) {
    const roles = [];
    if (u.carAccess && u.willingToDrive) roles.push(createBadge('Driver', 'primary'));
    if (u.connectorScore > 70) roles.push(createBadge('Connector', 'accent'));
    if (u.earlyAdopterScore > 70) roles.push(createBadge('Early Adopter', 'warning'));
    if (!u.carAccess) roles.push(createBadge('Passenger', 'success'));
    return roles.join(' ');
  }

  function getReasons(u) {
    const reasons = [];
    if (u.carAccess && u.willingToDrive) reasons.push(`Has personal vehicle with ${u.availableSeats || 3} available passenger seats`);
    if (u.routeFrequency >= 5) reasons.push(`Daily commuter (${u.routeFrequency} days/week on peak morning corridor)`);
    else if (u.routeFrequency >= 3) reasons.push(`Consistent schedule (${u.routeFrequency} days/week)`);
    if (u.communityGroups && u.communityGroups.length >= 3) reasons.push(`Bridge connector across ${u.communityGroups.length} campus organizations`);
    if (u.communityConnections > 20) reasons.push(`High social centrality with ${u.communityConnections} verified peer connections`);
    if (u.activityLevel >= 7) reasons.push(`Top-decile campus engagement index (${u.activityLevel}/10)`);
    if (u.existingFellaRideUser) reasons.push('Prior FellaRide user &mdash; verified community trust');
    if (u.departureTime) reasons.push(`Regular departure at ${u.departureTime} matches prime student travel demand`);
    if (reasons.length === 0) reasons.push('Standard community commuter profile');
    return reasons;
  }

  function getIntervention(u) {
    if (u.carAccess && u.willingToDrive && u.connectorScore > 60)
      return `Invite as Founding Mobility Lead on the ${u.locality} corridor. Incentivize onboarding 2 trusted peers from their network.`;
    if (u.carAccess && u.willingToDrive)
      return `Targeted driver activation: offer guaranteed commute fuel offset for the ${u.locality} &rarr; Campus route.`;
    if (u.connectorScore > 70)
      return `Connector advocacy outreach: request introduction to car owners within their student societies.`;
    return `Passenger notification: alert when first verified carpool ride launches on the ${u.locality} corridor.`;
  }

  function renderTable(filtered) {
    if (filtered.length === 0) {
      return `
        <tr>
          <td colspan="7" style="text-align:center; padding: var(--sp-8); color: var(--text-muted);">
            <div style="margin-bottom: var(--sp-2);">${icon('search', 24)}</div>
            <div style="font-weight: 500; color: var(--text-secondary); margin-bottom: var(--sp-1);">No candidates found</div>
            <div style="font-size: var(--text-xs);">Try adjusting your filter or search query</div>
          </td>
        </tr>
      `;
    }

    const shown = filtered.slice(0, displayCount);
    return shown.map((u, i) => `
      <tr class="user-row ${selectedUserId === u.userId ? 'selected' : ''}" data-uid="${u.userId}">
        <td style="color:var(--text-muted); font-size:var(--text-xs);">${i + 1}</td>
        <td class="mono" style="color:var(--color-primary); font-weight:500;">${u.userId}</td>
        <td style="font-size: var(--text-sm);">${u.locality}</td>
        <td>${renderRoles(u)}</td>
        <td>${miniBar(u.driverScore, 100, 'primary')}</td>
        <td>${miniBar(u.connectorScore, 100, 'accent')}</td>
        <td>${miniBar(u.priorityScore, 100, 'warning')}</td>
      </tr>
    `).join('');
  }

  function renderDetail(u) {
    if (!u) {
      return `
        <div class="flex flex-col items-center justify-center h-full text-center p-4" style="color:var(--text-muted);">
          <div style="margin-bottom: var(--sp-2);">${icon('users', 28)}</div>
          <div style="font-weight: 500; color: var(--text-secondary);">No Candidate Selected</div>
          <div style="font-size: var(--text-xs); margin-top: var(--sp-1);">Select a user from the table to inspect scores and activation strategy</div>
        </div>
      `;
    }
    const dest = (u.destination || '').replace('St. Aloysius Campus', 'Campus').replace('Mangalore University Campus', 'MU Campus');
    const reasons = getReasons(u);
    const intervention = getIntervention(u);

    return `
      <div style="margin-bottom: var(--sp-5);">
        <div class="data-label" style="margin-bottom: var(--sp-1); text-transform: uppercase; letter-spacing: 0.05em;">CANDIDATE INTELLIGENCE</div>
        <div class="flex justify-between items-start">
          <div class="mono" style="font-size: var(--text-2xl); color: var(--color-primary); font-weight: 600;">${u.userId}</div>
          ${u.priorityScore >= 75 ? createBadge('HIGH PRIORITY', 'accent') : createBadge('RANKED', 'muted')}
        </div>
        <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--sp-1);">${u.locality} &rarr; ${dest}</div>
        <div style="font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px;">${u.routeDistance || 4.2} km &middot; ${u.currentMode} &middot; ${u.routeFrequency}d/wk &middot; Dep: ${u.departureTime || '07:45'}</div>
      </div>

      <div style="margin-bottom: var(--sp-5);">
        <div class="section-title">Score Breakdown</div>
        ${createScoreRow('Priority', u.priorityScore, 100, 'accent')}
        ${createScoreRow('Driver Score', u.driverScore, 100, 'primary')}
        ${createScoreRow('Connector', u.connectorScore, 100, 'warning')}
        ${createScoreRow('Early Adopter', u.earlyAdopterScore, 100, 'success')}
        ${createScoreRow('Passenger Match', u.passengerScore, 100, 'primary')}
      </div>

      <div style="margin-bottom: var(--sp-5);">
        <div class="section-title">Why This User?</div>
        <ul style="font-size: var(--text-sm); color: var(--text-secondary); padding-left: var(--sp-4); display:flex; flex-direction:column; gap: var(--sp-2); line-height: 1.4;">
          ${reasons.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>

      ${u.communityGroups && u.communityGroups.length > 0 ? `
      <div style="margin-bottom: var(--sp-5);">
        <div class="section-title">Affiliated Circles</div>
        <div class="flex flex-wrap gap-1">
          ${u.communityGroups.map(g => `<span class="badge badge-muted">${g}</span>`).join('')}
        </div>
      </div>` : ''}

      <div style="margin-top:auto; padding-top: var(--sp-4); border-top: 1px solid var(--border-subtle);">
        <div class="section-title">Tailored Intervention</div>
        <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--sp-3); line-height: 1.4;">${intervention}</p>
        <button class="btn btn-primary w-full" id="btn-draft-outreach">
          ${icon('send', 16)} Draft Outreach Message
        </button>
      </div>
    `;
  }

  // Initial filtered set
  const filtered = getFilteredUsers();
  if (filtered.length > 0 && (!selectedUserId || !filtered.some(u => u.userId === selectedUserId))) {
    selectedUserId = filtered[0].userId;
  }
  const selectedUser = users.find(u => u.userId === selectedUserId) || filtered[0] || null;

  screen.innerHTML = `
    <div style="margin-bottom: var(--sp-4);">
      <h1 class="page-title">People Intelligence</h1>
      <p class="page-subtitle">${users.length.toLocaleString()} candidates evaluated &middot; ${driversCount} potential drivers &middot; ${connectorsCount} community connectors</p>
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
        ${corridorNames.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
      <select id="filter-sort" class="select" aria-label="Sort by score">
        <option value="priorityScore">Sort: Priority Score</option>
        <option value="driverScore">Sort: Driver Score</option>
        <option value="connectorScore">Sort: Connector Score</option>
        <option value="earlyAdopterScore">Sort: Early Adopter</option>
      </select>
      <div class="flex-1" style="min-width: 160px; position: relative;">
        <span style="position: absolute; left: var(--sp-3); top: 50%; transform: translateY(-50%); color: var(--text-muted); display: flex;">
          ${icon('search', 14)}
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
          <tbody id="user-tbody">${renderTable(filtered)}</tbody>
        </table>
        <div id="load-more-container" style="padding: var(--sp-3); text-align:center; ${filtered.length <= displayCount ? 'display:none;' : ''}">
          <button id="btn-load-more" class="btn btn-subtle btn-sm">Load More Candidates</button>
        </div>
      </div>

      <div id="detail-panel" class="card glass-2 flex flex-col" style="overflow-y: auto;">
        ${renderDetail(selectedUser)}
      </div>
    </div>
  `;

  container.appendChild(screen);
  initAnimations(screen);

  // Wire events
  const tbody = screen.querySelector('#user-tbody');
  const detailPanel = screen.querySelector('#detail-panel');
  const loadMoreBtn = screen.querySelector('#btn-load-more');
  const resetBtn = screen.querySelector('#btn-reset-filters');

  function bindDetailActions() {
    const draftBtn = detailPanel.querySelector('#btn-draft-outreach');
    draftBtn?.addEventListener('click', () => {
      const activeUser = users.find(u => u.userId === selectedUserId);
      if (!activeUser) return;
      const message = `Hi ${activeUser.userId}! FellaRide is starting a verified student carpool pilot from ${activeUser.locality} to Campus. We identified your schedule as an ideal fit. Would you be open to learning how you can help anchor this route?`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message);
      }
      draftBtn.innerHTML = `${icon('checkCircle', 16)} Outreach Copied to Clipboard`;
      setTimeout(() => {
        draftBtn.innerHTML = `${icon('send', 16)} Draft Outreach Message`;
      }, 2000);
    });
  }

  bindDetailActions();

  function selectUser(userId) {
    selectedUserId = userId;
    const user = users.find(u => u.userId === userId);
    tbody.querySelectorAll('.user-row').forEach(r => r.classList.remove('selected'));
    const row = tbody.querySelector(`[data-uid="${userId}"]`);
    if (row) row.classList.add('selected');
    detailPanel.innerHTML = renderDetail(user);
    initAnimations(detailPanel);
    bindDetailActions();
  }

  tbody.addEventListener('click', e => {
    const row = e.target.closest('.user-row');
    if (row) {
      const uid = row.getAttribute('data-uid');
      if (uid) selectUser(uid);
    }
  });

  function applyFilters() {
    currentRole = screen.querySelector('#filter-role').value;
    currentCorridor = screen.querySelector('#filter-corridor').value;
    currentSort = screen.querySelector('#filter-sort').value;
    searchTerm = screen.querySelector('#filter-search').value.trim().toLowerCase();
    displayCount = 30;

    const isFiltered = currentRole !== 'all' || currentCorridor !== 'all' || searchTerm !== '';
    if (resetBtn) resetBtn.style.display = isFiltered ? 'inline-flex' : 'none';

    const currentFiltered = getFilteredUsers();
    tbody.innerHTML = renderTable(currentFiltered);

    const loadMoreBox = screen.querySelector('#load-more-container');
    if (loadMoreBox) {
      loadMoreBox.style.display = currentFiltered.length > displayCount ? 'block' : 'none';
    }

    // Update detail panel to first result if current selected is no longer in filtered
    if (currentFiltered.length > 0) {
      if (!currentFiltered.some(u => u.userId === selectedUserId)) {
        selectUser(currentFiltered[0].userId);
      } else {
        // Re-highlight
        const row = tbody.querySelector(`[data-uid="${selectedUserId}"]`);
        if (row) row.classList.add('selected');
      }
    } else {
      detailPanel.innerHTML = renderDetail(null);
    }
  }

  screen.querySelector('#filter-role').addEventListener('change', applyFilters);
  screen.querySelector('#filter-corridor').addEventListener('change', applyFilters);
  screen.querySelector('#filter-sort').addEventListener('change', applyFilters);
  screen.querySelector('#filter-search').addEventListener('input', applyFilters);

  resetBtn?.addEventListener('click', () => {
    screen.querySelector('#filter-role').value = 'all';
    screen.querySelector('#filter-corridor').value = 'all';
    screen.querySelector('#filter-sort').value = 'priorityScore';
    screen.querySelector('#filter-search').value = '';
    applyFilters();
  });

  loadMoreBtn?.addEventListener('click', () => {
    displayCount += 30;
    const currentFiltered = getFilteredUsers();
    tbody.innerHTML = renderTable(currentFiltered);
    const loadMoreBox = screen.querySelector('#load-more-container');
    if (loadMoreBox) {
      loadMoreBox.style.display = currentFiltered.length > displayCount ? 'block' : 'none';
    }
    // Maintain selection highlight
    const row = tbody.querySelector(`[data-uid="${selectedUserId}"]`);
    if (row) row.classList.add('selected');
  });
}
