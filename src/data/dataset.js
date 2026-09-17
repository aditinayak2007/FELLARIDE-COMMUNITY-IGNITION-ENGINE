export const LOCALITIES = [
  { name: 'Kavoor', lat: 12.8845, lng: 74.8490, population: 400 },
  { name: 'Kottara', lat: 12.8920, lng: 74.8380, population: 350 },
  { name: 'Bendoor', lat: 12.8780, lng: 74.8350, population: 300 },
  { name: 'Surathkal', lat: 12.9916, lng: 74.8095, population: 450 },
  { name: 'Kadri', lat: 12.8750, lng: 74.8530, population: 350 },
  { name: 'Bejai', lat: 12.8870, lng: 74.8450, population: 300 },
  { name: 'Falnir', lat: 12.8650, lng: 74.8420, population: 250 },
  { name: 'Kankanady', lat: 12.8700, lng: 74.8560, population: 350 },
  { name: 'Hampankatta', lat: 12.8710, lng: 74.8430, population: 280 },
  { name: 'Attavar', lat: 12.8730, lng: 74.8480, population: 200 },
  { name: 'Jeppu', lat: 12.8580, lng: 74.8370, population: 250 },
  { name: 'Kulur', lat: 12.9100, lng: 74.8200, population: 300 },
  { name: 'Bajpe', lat: 12.9120, lng: 74.8900, population: 250 },
  { name: 'Mulki', lat: 13.0970, lng: 74.7930, population: 200 },
  { name: 'Moodbidri', lat: 12.9580, lng: 74.9930, population: 170 }
];

export const DESTINATIONS = [
  { name: 'St. Aloysius Campus', lat: 12.8698, lng: 74.8432 },
  { name: 'Mangalore University Campus', lat: 12.8083, lng: 74.9318 }
];

export const COMMUNITY_INFO = { name: 'St. Aloysius University', population: 5000, id: 'STALO' };

function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

const random = mulberry32(12345);

function getRandomWeighted(arr, weights) {
  let sum = weights.reduce((a, b) => a + b, 0);
  let r = random() * sum;
  for (let i = 0; i < arr.length; i++) {
    if (r < weights[i]) return arr[i];
    r -= weights[i];
  }
  return arr[arr.length - 1];
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const ALL_GROUPS = ["CS Department", "Commerce Faculty", "Science Club", "Coding Club", "Dramatics Society", "NSS", "Sports Team", "Music Club", "Debate Society", "Student Council", "Library Committee", "Hostel A", "Hostel B", "Hostel C", "Alumni Network", "Cultural Committee", "Eco Club", "Photography Club"];

export function generateDataset() {
  const users = [];
  const totalLocalityPop = LOCALITIES.reduce((sum, l) => sum + l.population, 0);
  
  for (let i = 1; i <= 5000; i++) {
    let rLoc = random() * totalLocalityPop;
    let locality;
    for (let l of LOCALITIES) {
      if (rLoc < l.population) { locality = l; break; }
      rLoc -= l.population;
    }
    if (!locality) locality = LOCALITIES[LOCALITIES.length - 1];

    let dest = random() < 0.8 ? DESTINATIONS[0] : DESTINATIONS[1];

    let departureTime = getRandomWeighted(['07:15', '07:45', '08:15', '08:45', '09:30'], [0.30, 0.35, 0.20, 0.10, 0.05]);
    let returnTime = getRandomWeighted(['15:45', '16:15', '16:45', '17:15', '18:00'], [0.15, 0.25, 0.30, 0.20, 0.10]);
    
    let travelDaysArr = getRandomWeighted(
      [['Mon','Tue','Wed','Thu','Fri'], ['Mon','Wed','Fri'], ['Tue','Thu','Sat'], ['Mon','Tue','Wed','Thu','Fri','Sat'], ['Mon','Thu']],
      [0.60, 0.15, 0.10, 0.10, 0.05]
    );

    let carAccess = random() < 0.18;
    let willingToDrive = false;
    let availableSeats = 0;
    if (carAccess) {
      let wRand = random();
      if (wRand < 0.55) willingToDrive = true;
      if (willingToDrive) {
        availableSeats = getRandomWeighted([2, 3, 4], [0.4, 0.4, 0.2]);
      }
    }

    let currentMode = getRandomWeighted(['Bus', 'Auto', 'Two-wheeler', 'Walk', 'Car', 'Other'], [0.40, 0.20, 0.20, 0.05, 0.10, 0.05]);
    if (carAccess && currentMode !== 'Car') currentMode = random() < 0.5 ? 'Car' : currentMode;

    let groupCount = Math.floor(random() * 4) + 1;
    let groups = [];
    let groupPool = [...ALL_GROUPS];
    for (let g = 0; g < groupCount; g++) {
      let idx = Math.floor(random() * groupPool.length);
      groups.push(groupPool[idx]);
      groupPool.splice(idx, 1);
    }

    let communityConnections = Math.floor(Math.pow(random(), 3) * 45) + 2; 
    let activityLevel = Math.floor((random() + random() + random()) / 3 * 10) + 1;

    let existingFellaRideUser = random() < 0.02;
    let previousRideCount = existingFellaRideUser ? Math.floor(random() * 5) + 1 : 0;
    let referralCount = existingFellaRideUser ? Math.floor(random() * 4) : 0;

    let routeDistance = haversine(locality.lat, locality.lng, dest.lat, dest.lng);

    users.push({
      userId: `U${String(i).padStart(4, '0')}`,
      communityId: COMMUNITY_INFO.id,
      locality: locality.name,
      localityLat: locality.lat,
      localityLng: locality.lng,
      destination: dest.name,
      destLat: dest.lat,
      destLng: dest.lng,
      travelDays: travelDaysArr,
      departureTime,
      returnTime,
      currentMode,
      carAccess,
      availableSeats,
      willingToDrive,
      willingToRide: true,
      routeDistance: parseFloat(routeDistance.toFixed(1)),
      routeFrequency: travelDaysArr.length,
      communityGroups: groups,
      communityConnections,
      activityLevel,
      existingFellaRideUser,
      previousRideCount,
      referralCount
    });
  }
  return users;
}

export const dataset = generateDataset();
