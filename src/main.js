import './styles/main.css';
import { dataset, COMMUNITY_INFO, LOCALITIES, DESTINATIONS } from './data/dataset.js';
import { scoreAllUsers } from './engine/scoring.js';
import { clusterByRoute, identifySupplyGaps, getHighDemandCorridors, clusterByTime } from './engine/clustering.js';
import { generateInterventions, simulateGrowth } from './engine/intervention.js';
import { renderNavigation } from './components/Navigation.js';
import { renderAIPanel, showAIPanel } from './components/AIRecommendation.js';

const appState = {
  currentScreen: 'community-select',
  community: {
    name: COMMUNITY_INFO.name,
    population: COMMUNITY_INFO.population,
    id: COMMUNITY_INFO.id,
    responses: 327
  },
  localities: LOCALITIES,
  destinations: DESTINATIONS,
  users: [],
  corridors: [],
  supplyGaps: [],
  highDemandCorridors: [],
  interventions: [],
  growthSimulation: [],
  isAnalysed: false,
  aiPanelOpen: false
};

function runAnalysisPipeline() {
  console.time('Analysis Pipeline');

  const scoredUsers = scoreAllUsers(dataset);
  const corridors = clusterByRoute(scoredUsers);
  const supplyGaps = identifySupplyGaps(corridors);
  const highDemandCorridors = getHighDemandCorridors(corridors, 4);
  const sortedUsers = [...scoredUsers].sort((a, b) => b.priorityScore - a.priorityScore);
  const interventions = generateInterventions(supplyGaps, sortedUsers, corridors);
  
  const growthSimulation = simulateGrowth({
    community: appState.community,
    topDrivers: sortedUsers.filter(u => u.driverScore > 60).slice(0, 10),
    topConnectors: sortedUsers.filter(u => u.connectorScore > 60).slice(0, 10),
  });

  appState.users = sortedUsers;
  appState.corridors = corridors;
  appState.supplyGaps = supplyGaps;
  appState.highDemandCorridors = highDemandCorridors;
  appState.interventions = interventions;
  appState.growthSimulation = growthSimulation;

  console.timeEnd('Analysis Pipeline');
}

let currentScreenModule = null;

async function navigateTo(screenName) {
  appState.currentScreen = screenName;

  const navContainer = document.getElementById('nav-container');
  if (navContainer) {
    renderNavigation(navContainer, screenName, navigateTo, showAIPanel);
  }

  const mainContainer = document.getElementById('main-content');
  if (!mainContainer) return;

  if (currentScreenModule && currentScreenModule.destroy) {
    currentScreenModule.destroy();
  }

  mainContainer.style.opacity = '0';
  mainContainer.style.transform = 'translateY(10px)';

  await new Promise(r => setTimeout(r, 150));

  mainContainer.innerHTML = '';

  try {
    let module;
    switch (screenName) {
      case 'community-select':
        module = await import('./screens/CommunitySelect.js');
        break;
      case 'overview':
        module = await import('./screens/CommunityOverview.js');
        break;
      case 'mobility-map':
        module = await import('./screens/MobilityMap.js');
        break;
      case 'people-intelligence':
        module = await import('./screens/PeopleIntelligence.js');
        break;
      case 'butterfly-effect':
        module = await import('./screens/ButterflyEffect.js');
        break;
      default:
        mainContainer.innerHTML = `<div class="screen"><h2>404 — Screen not found</h2></div>`;
        return;
    }

    currentScreenModule = module;
    module.render(mainContainer, appState, navigateTo);

    requestAnimationFrame(() => {
      mainContainer.style.opacity = '1';
      mainContainer.style.transform = 'translateY(0)';
    });
  } catch (error) {
    console.error('Error loading screen:', error);
    mainContainer.innerHTML = `
      <div class="screen" style="padding:2rem;">
        <h2 style="color:var(--color-danger);">Error loading screen</h2>
        <pre style="color:var(--text-secondary);margin-top:1rem;white-space:pre-wrap;">${error.message}\n${error.stack}</pre>
      </div>`;
    mainContainer.style.opacity = '1';
    mainContainer.style.transform = 'translateY(0)';
  }
}

async function init() {
  runAnalysisPipeline();

  const loadingScreen = document.getElementById('loading-screen');
  const loadingStatus = loadingScreen?.querySelector('.loading-status');

  const steps = [
    'Loading synthetic dataset (5,000 users)...',
    'Running scoring engine...',
    'Clustering routes and corridors...',
    'Identifying supply-demand gaps...',
    'Generating intervention strategies...',
    'Initializing Command Centre...'
  ];

  for (let i = 0; i < steps.length; i++) {
    if (loadingStatus) loadingStatus.textContent = steps[i];
    await new Promise(r => setTimeout(r, 400));
  }

  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.pointerEvents = 'none';
    setTimeout(() => loadingScreen.remove(), 500);
  }

  const appEl = document.getElementById('app');
  appEl.style.display = 'grid';

  const navContainer = document.createElement('div');
  navContainer.id = 'nav-container';

  const mainContainer = document.createElement('div');
  mainContainer.className = 'main-content';
  mainContainer.id = 'main-content';
  mainContainer.style.transition = 'opacity var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out)';

  appEl.innerHTML = '';
  appEl.appendChild(navContainer);
  appEl.appendChild(mainContainer);

  renderNavigation(navContainer, appState.currentScreen, navigateTo, showAIPanel);

  const analysisData = {
    community: appState.community,
    corridors: appState.corridors,
    supplyGaps: appState.supplyGaps,
    topDrivers: appState.users.filter(u => u.driverScore > 70).slice(0, 5),
    topConnectors: appState.users.filter(u => u.connectorScore > 70).slice(0, 5),
    topEarlyAdopters: appState.users.filter(u => u.earlyAdopterScore > 70).slice(0, 5),
    interventions: appState.interventions,
  };
  
  renderAIPanel(appEl, analysisData);

  navigateTo('community-select');
}

document.addEventListener('DOMContentLoaded', init);
