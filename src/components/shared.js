import { icon } from './icons.js';

export function createMetric(label, value, iconName, color = 'primary') {
  const isNumeric = typeof value === 'number' || 
    (typeof value === 'string' && !isNaN(Number(value)) && value.trim() !== '' && !value.includes(':'));
  const countAttr = isNumeric ? `data-count="${value}"` : '';

  return `
    <div class="metric">
      <div class="metric-icon" style="color: var(--color-${color}); margin-bottom: var(--sp-1);">
        ${iconName ? icon(iconName, 20) : ''}
      </div>
      <div class="metric-value" ${countAttr}>${isNumeric ? '0' : value}</div>
      <div class="metric-label">${label}</div>
    </div>
  `;
}

export function createBadge(text, type = 'primary') {
  return `<span class="badge badge-${type}">${text}</span>`;
}

export function createScoreRow(label, value, max = 100, colorClass = 'primary') {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const cleanColor = colorClass.replace('bg-', '');
  return `
    <div class="score-row">
      <div class="score-name">${label}</div>
      <div class="progress-track">
        <div class="progress-fill ${cleanColor}" data-width="${percentage}%" style="width: 0%;"></div>
      </div>
      <div class="score-val">${value}</div>
    </div>
  `;
}

export function createCorridorRow(corridor) {
  const dest = (corridor.destination || '').replace('St. Aloysius Campus', 'Campus').replace('Mangalore University Campus', 'MU Campus');
  const passengers = corridor.passengerCount || 0;
  const drivers = corridor.driverCount || 0;
  const potential = corridor.potentialDriverCount || 0;
  const hasGap = passengers > (drivers * 3 + 5);
  const badgeText = hasGap ? 'SUPPLY GAP' : (passengers > 20 ? 'HIGH DEMAND' : 'BALANCED');
  const badgeType = hasGap ? 'danger' : (passengers > 20 ? 'warning' : 'success');

  return `
    <div class="corridor-row">
      <div style="flex: 1; display: flex; flex-direction: column; gap: var(--sp-1);">
        <div style="font-weight: 500; font-size: var(--text-sm);">${corridor.origin} &rarr; ${dest}</div>
        <div style="font-size: var(--text-xs); color: var(--text-muted); display: flex; gap: var(--sp-3); flex-wrap: wrap;">
          <span>Pass: <span style="color: var(--color-success); font-family: var(--font-mono);">${passengers}</span></span>
          <span>Driv: <span style="color: var(--color-primary); font-family: var(--font-mono);">${drivers}</span></span>
          <span>Pot: <span style="color: var(--color-warning); font-family: var(--font-mono);">${potential}</span></span>
          <span>Ratio: <span style="color: ${hasGap ? 'var(--color-danger)' : 'var(--color-success)'}; font-family: var(--font-mono);">${corridor.supplyDemandRatio || 'N/A'}</span></span>
        </div>
      </div>
      <div>
        ${createBadge(badgeText, badgeType)}
      </div>
    </div>
  `;
}

export function createFunnelBar(label, value, maxValue, color) {
  const percentage = Math.min(100, Math.max(14, (value / Math.max(1, maxValue)) * 100));
  return `
    <div class="funnel-row">
      <div class="funnel-label">${label}</div>
      <div class="funnel-bar" style="background: ${color}; width: 0%;" data-width="${percentage}%">
        ${typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  `;
}

export function animateCounter(element, target, duration = 1200) {
  if (typeof target !== 'number' || isNaN(target)) {
    element.innerHTML = target;
    return;
  }
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    element.innerHTML = Math.floor(easeOutQuart * target).toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.innerHTML = target.toLocaleString();
    }
  };
  window.requestAnimationFrame(step);
}

export function initAnimations(container) {
  if (!container) return;
  const counters = container.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const raw = counter.getAttribute('data-count');
    const target = parseFloat(raw || '0');
    if (!isNaN(target) && target > 0) {
      animateCounter(counter, target);
    } else if (raw) {
      counter.innerHTML = raw;
    }
  });

  setTimeout(() => {
    const fills = container.querySelectorAll('[data-width]');
    fills.forEach(fill => {
      fill.style.width = fill.getAttribute('data-width');
    });
  }, 40);
}
