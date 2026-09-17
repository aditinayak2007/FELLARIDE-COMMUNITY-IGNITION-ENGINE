import { icon } from './icons.js';

export function renderNavigation(container, currentScreen, onNavigate, onAIClick) {
  const navItems = [
    { id: 'community-select', icon: 'compass', label: 'Community Select' },
    { id: 'overview', icon: 'barChart', label: 'Overview' },
    { id: 'mobility-map', icon: 'map', label: 'Mobility Map' },
    { id: 'people-intelligence', icon: 'users', label: 'People' },
    { id: 'butterfly-effect', icon: 'zap', label: 'Butterfly Effect' }
  ];

  const html = `
    <div class="sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-brand-icon">
          ${icon('logo')}
        </div>
        <div class="sidebar-brand-text">
          <span class="sidebar-brand-name">FellaRide</span>
          <span class="sidebar-brand-label">Ignition Engine</span>
        </div>
      </div>
      
      <div class="sidebar-divider"></div>
      
      <div class="sidebar-section-label">ANALYSIS</div>
      <div class="nav-menu">
        ${navItems.map(item => `
          <div class="nav-item ${currentScreen === item.id ? 'active' : ''}" data-screen="${item.id}" role="button" tabindex="0">
            <div class="nav-icon">${icon(item.icon)}</div>
            <span>${item.label}</span>
          </div>
        `).join('')}
      </div>
      
      <div class="sidebar-divider"></div>
      <div class="sidebar-section-label">INTELLIGENCE</div>
      <button class="btn btn-ghost" id="btn-ai-strategy" style="width: 100%; justify-content: flex-start; gap: var(--sp-2); border-color: rgba(79, 142, 247, 0.2);">
        <span style="color: var(--color-primary); display: flex; align-items: center;">${icon('sparkles', 16)}</span>
        <span>Strategy Engine</span>
      </button>
      
      <div style="flex: 1;"></div>
      
      <div class="sidebar-footer">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span>Prototype v1.0</span>
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--color-success);" title="Engine active"></span>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const items = container.querySelectorAll('.nav-item');
  items.forEach(item => {
    const handleNav = () => {
      const screen = item.getAttribute('data-screen');
      if (onNavigate) onNavigate(screen);
    };
    item.addEventListener('click', handleNav);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNav();
      }
    });
  });

  const aiBtn = container.querySelector('#btn-ai-strategy');
  if (aiBtn) {
    aiBtn.addEventListener('click', () => {
      if (onAIClick) onAIClick();
    });
  }
}
