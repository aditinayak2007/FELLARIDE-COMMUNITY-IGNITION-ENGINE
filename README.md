# FellaRide Community Ignition Engine

> **FellaRide tells people where they can ride. The Community Ignition Engine tells FellaRide where to start, who to activate, and what to do first.**

The **FellaRide Community Ignition Engine** is an internal intelligence and activation layer for launching carpool and ride-sharing networks in closed communities (such as university campuses, hospital networks, or corporate parks) from a cold start (zero active users).

Instead of treating all users equally or relying on random marketing, the system analyzes voluntary mobility survey signals, clusters travel corridors, calculates explainable readiness scores, identifies supply-demand deficits, and triggers targeted interventions that set off a network growth cascade (The Butterfly Effect).

---

## 🎨 Visual Direction: 60% Refined Glassmorphism · 40% Modern Minimalism

- **3 Glass Depth Tiers**: Level 1 (50% opacity, 16px blur) for data surfaces, Level 2 (62% opacity, 20px blur) for cards & tables, and Level 3 (74% opacity, 28px blur) for elevated actions and floating panels.
- **Minimalist Restraint**: Pure typographic hierarchy (`Inter` + `JetBrains Mono`), neutral dark foundation (`#0B0F19`), and a focused color system (Electric Blue, Warm Amber, Emerald Green, and Coral Rose).
- **100% SVG Outline Icons**: Zero emojis; 28 bespoke geometric SVG outline icons with 1.5px stroke width.
- **Card-Soup Reduction**: Consolidated data slabs and minimal list rows (`.corridor-row`) instead of nested boxes.

---

## 🚀 Key Features & Screens

1. **Community Command Centre (`CommunitySelect.js`)**
   - Single elevated command card for target community (*St. Aloysius University, Mangalore*).
   - Instant metrics: 5,000 Population, 327 Mobility Responses, Pre-Ignition status.
   - One-click community analysis execution.

2. **Community Overview Dashboard (`CommunityOverview.js`)**
   - Single Level-1 glass data slab displaying 8 core indicators (Population, Responses, Potential Drivers, Confirmed Drivers, Passengers, Connectors, Corridors, Supply/Demand Ratio).
   - **Growth Funnel Pipeline**: Visual conversion tracking from 327 survey responses to confirmed drivers and target pilot rides.
   - **Priority Corridors List**: Real-time demand-supply ratio tracking across high-volume commuter routes.
   - **Activation Readiness Roadmap**: 6-stage operational pipeline from data ingestion to ignition launch.

3. **Spatial Mobility Map (`MobilityMap.js`)**
   - Interactive Leaflet cartography with dark CartoDB tiles centered on Mangalore.
   - Proportional demand weighting and dashed lines for supply deficits.
   - Rich interactive origin popups showing passenger demand, confirmed supply, and potential driver reserves.
   - Floating overlays (Legend & Bottom KPI Bar) with proper layering above map panes.

4. **People Intelligence (`PeopleIntelligence.js`)**
   - 70/30 split view: 5,000 candidate dataset table alongside a deep Candidate Dossier.
   - Multi-factor explainable scoring: Driver Score, Connector Score, Early Adopter Score, Priority Score.
   - Algorithmic rationale ("Why this user?") based on vehicle capacity, schedule consistency, and campus society bridge connectivity.
   - Direct outreach drafting with one-click clipboard copy.
   - Search & filtering with empty-state handling.

5. **The Butterfly Effect Simulation (`ButterflyEffect.js`)**
   - Real-time physics-assisted canvas network simulator showing how 1 Key Connector recruits 3 Anchor Drivers, matching 8 Passengers to produce the first rides and organic referral loops.
   - Interactive transport controls (Play/Pause, Step Forward, Reset).
   - Reverse-chronological ignition event log.

6. **Strategy Engine Drawer (`AIRecommendation.js`)**
   - Slide-in contextual recommendation panel accessible across screens.
   - Identifies top deficit corridor (*Surathkal &rarr; Campus*).
   - Provides 4 concrete action recommendations referencing specific Candidate IDs.
   - Copyable personalized outreach scripts with live regeneration.

---

## 🛠️ Technology Stack

- **Framework**: Vite + Vanilla JavaScript (ES Modules)
- **Styling**: Modern CSS Design System (CSS Custom Properties, Glassmorphism, CSS Grid)
- **Mapping**: Leaflet.js with CartoDB Dark Tiles
- **Typography**: Inter (Body/Headings) + JetBrains Mono (Data/Metrics)
- **Data Engine**: Seeded PRNG (`mulberry32`) synthetic university community dataset (5,000 users, 15 localities, realistic schedule & modal split)

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Run

1. Clone repository:
   ```bash
   git clone https://github.com/TANGOSIERRApapi/KuchTehelka.git
   cd KuchTehelka
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000/`.

4. Build for production:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📁 Repository Structure

```
├── index.html                      # Application HTML5 entry point
├── package.json                    # Project dependencies & build scripts
├── vite.config.js                  # Vite configuration
├── src/
│   ├── main.js                     # State management & screen orchestration
│   ├── styles/
│   │   └── main.css                # Complete 60:40 glassmorphic design system
│   ├── components/
│   │   ├── icons.js                # Bespoke 20×20 SVG outline icon system
│   │   ├── shared.js               # Reusable metrics, badges, score rows, funnel bars
│   │   ├── Navigation.js           # Accessible sidebar navigation
│   │   └── AIRecommendation.js     # Strategy Engine slide-in drawer
│   ├── data/
│   │   └── dataset.js              # 5,000 synthetic Mangalore university records
│   ├── engine/
│   │   ├── scoring.js              # Explainable rule-based scoring engine
│   │   ├── clustering.js           # Route & corridor clustering logic
│   │   └── intervention.js         # Strategic intervention templates & cascade model
│   └── screens/
│       ├── CommunitySelect.js      # Screen 1: Community selection command centre
│       ├── CommunityOverview.js    # Screen 2: Pre-ignition operational overview
│       ├── MobilityMap.js          # Screen 3: Interactive Leaflet demand map
│       ├── PeopleIntelligence.js   # Screen 4: Candidate table & rationale dossier
│       └── ButterflyEffect.js      # Screen 5: Community ignition cascade simulator
```
