export function calculateDriverScore(user, corridorDemand = 10) {
  if (!user.carAccess) return 0;
  
  let routeComp = Math.min(100, corridorDemand * 5) * 0.35;
  let schedCons = (user.routeFrequency >= 5 ? 100 : user.routeFrequency * 20) * 0.20;
  let seatScore = 0;
  if (user.availableSeats >= 4) seatScore = 100;
  else if (user.availableSeats === 3) seatScore = 80;
  else if (user.availableSeats === 2) seatScore = 60;
  else if (user.availableSeats === 1) seatScore = 40;
  let seat = seatScore * 0.20;
  let willing = (user.willingToDrive ? 100 : 0) * 0.15;
  let existing = Math.min(100, (user.activityLevel * 5) + (user.previousRideCount * 10) + (user.referralCount * 15)) * 0.10;
  
  return Math.round(routeComp + schedCons + seat + willing + existing);
}

export function calculatePassengerScore(user, corridorDemand = 10) {
  let routeDemand = Math.min(100, corridorDemand * 5) * 0.30;
  let schedCons = (user.routeFrequency >= 5 ? 100 : user.routeFrequency * 20) * 0.25;
  let freq = (user.routeFrequency >= 5 ? 100 : user.routeFrequency * 20) * 0.20;
  let willing = (user.willingToRide ? 100 : 0) * 0.15;
  let nonCar = (['Bus', 'Auto', 'Walk'].includes(user.currentMode) ? 100 : 0) * 0.10;
  
  return Math.round(routeDemand + schedCons + freq + willing + nonCar);
}

export function calculateConnectorScore(user, maxConnections = 50, highDemandCorridors = []) {
  let conn = Math.min(100, (user.communityConnections / maxConnections) * 100) * 0.30;
  let groups = Math.min(100, user.communityGroups.length * 25) * 0.25;
  let act = (user.activityLevel * 10) * 0.20;
  let routeRel = 50;
  if (highDemandCorridors.includes(`${user.locality}-${user.destination}`)) routeRel = 100;
  let routeScore = routeRel * 0.15;
  let ref = Math.min(100, user.referralCount * 33) * 0.10;
  
  return Math.round(conn + groups + act + routeScore + ref);
}

export function calculateEarlyAdopterScore(user) {
  let act = (user.activityLevel * 10) * 0.30;
  
  let hasTechGroup = user.communityGroups.some(g => ['CS Department', 'Coding Club'].includes(g));
  let techProxy = Math.min(100, (user.activityLevel * 5) + (hasTechGroup ? 50 : 0));
  let tech = techProxy * 0.20;
  
  let ref = Math.min(100, user.referralCount * 33) * 0.20;
  let infl = Math.min(100, user.communityConnections * 3.3) * 0.15;
  let resp = (user.existingFellaRideUser ? 100 : user.activityLevel * 10) * 0.15;
  
  return Math.round(act + tech + ref + infl + resp);
}

export function calculatePriorityScore(scores) {
  if (scores.driverScore > 0) {
    return Math.round(scores.driverScore * 0.35 + scores.connectorScore * 0.25 + scores.earlyAdopterScore * 0.25 + scores.passengerScore * 0.15);
  }
  return Math.round(scores.connectorScore * 0.35 + scores.earlyAdopterScore * 0.30 + scores.passengerScore * 0.35);
}

export function getScoreBreakdown(user, scoreType, context = {}) {
  return { total: 0, factors: [] };
}

export function scoreAllUsers(users) {
  let corridorMap = {};
  users.forEach(u => {
    let key = `${u.locality}-${u.destination}`;
    corridorMap[key] = (corridorMap[key] || 0) + 1;
  });
  
  let maxCon = Math.max(...users.map(u => u.communityConnections));
  let highDemand = Object.keys(corridorMap).sort((a,b) => corridorMap[b] - corridorMap[a]).slice(0, 5);

  return users.map(user => {
    let cd = corridorMap[`${user.locality}-${user.destination}`] || 0;
    let ds = calculateDriverScore(user, cd);
    let ps = calculatePassengerScore(user, cd);
    let cs = calculateConnectorScore(user, maxCon, highDemand);
    let es = calculateEarlyAdopterScore(user);
    let pri = calculatePriorityScore({ driverScore: ds, passengerScore: ps, connectorScore: cs, earlyAdopterScore: es });
    
    return {
      ...user,
      driverScore: ds,
      passengerScore: ps,
      connectorScore: cs,
      earlyAdopterScore: es,
      priorityScore: pri
    };
  });
}
