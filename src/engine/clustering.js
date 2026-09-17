export function clusterByRoute(users) {
  let corridors = {};
  
  users.forEach(u => {
    let id = `${u.locality}-${u.destination}`.toLowerCase().replace(/[\s\.]+/g, '-');
    if (!corridors[id]) {
      corridors[id] = {
        id,
        origin: u.locality,
        originLat: u.localityLat,
        originLng: u.localityLng,
        destination: u.destination,
        destLat: u.destLat,
        destLng: u.destLng,
        users: [],
        totalCount: 0,
        passengerCount: 0,
        driverCount: 0,
        potentialDriverCount: 0,
        avgDistance: u.routeDistance,
        times: {}
      };
    }
    
    let c = corridors[id];
    c.users.push(u);
    c.totalCount++;
    if (u.carAccess) {
      if (u.willingToDrive) c.driverCount++;
      else c.potentialDriverCount++;
    } else {
      c.passengerCount++;
    }
    
    c.times[u.departureTime] = (c.times[u.departureTime] || 0) + 1;
  });
  
  return Object.values(corridors).map(c => {
    let peakTime = Object.keys(c.times).sort((a,b) => c.times[b] - c.times[a])[0];
    let sdVal = c.driverCount > 0 ? c.driverCount / c.passengerCount : 0;
    
    return {
      ...c,
      supplyDemandRatio: `1:${Math.round(c.passengerCount / Math.max(1, c.driverCount))}`,
      supplyDemandValue: sdVal,
      peakTime: peakTime ? `${peakTime}-${peakTime}` : 'Unknown'
    };
  });
}

export function clusterByTime(users, timeField = 'departureTime') {
  let windows = {};
  users.forEach(u => {
    let t = u[timeField];
    if (!windows[t]) windows[t] = { window: t, count: 0, users: [] };
    windows[t].count++;
    windows[t].users.push(u);
  });
  return Object.values(windows);
}

export function identifySupplyGaps(corridors) {
  let gaps = corridors.map(c => {
    let capacity = c.driverCount * 3;
    let gap = c.passengerCount - capacity;
    let severity = 'LOW';
    if (gap > 50) severity = 'CRITICAL';
    else if (gap > 20) severity = 'HIGH';
    else if (gap > 5) severity = 'MODERATE';
    
    let status = gap > 20 ? 'HIGH DEMAND / LOW SUPPLY' : 'BALANCED';
    
    return {
      corridor: c,
      passengers: c.passengerCount,
      confirmedDrivers: c.driverCount,
      potentialDrivers: c.potentialDriverCount,
      gap,
      severity,
      status
    };
  }).filter(g => g.gap > 0).sort((a, b) => b.gap - a.gap);
  
  return gaps;
}

export function getHighDemandCorridors(corridors, topN = 4) {
  return [...corridors].sort((a,b) => b.passengerCount - a.passengerCount).slice(0, topN);
}

export function getCorridorStats(corridors) {
  return {
    totalCorridors: corridors.length,
    totalPassengers: corridors.reduce((s, c) => s + c.passengerCount, 0),
    totalDrivers: corridors.reduce((s, c) => s + c.driverCount, 0)
  };
}
