export function generateInterventions(supplyGaps, topUsers, corridors) {
  let interventions = [];
  
  supplyGaps.slice(0, 3).forEach((gap, i) => {
    interventions.push({
      id: `INT-00${i+1}`,
      type: 'DRIVER_ACTIVATION',
      priority: gap.severity,
      targetUsers: [],
      corridor: gap.corridor,
      title: `Activate drivers on ${gap.corridor.origin} corridor`,
      description: `High demand corridor needs drivers. Gap of ${gap.gap} passengers.`,
      reasoning: 'Critical supply shortage',
      expectedImpact: { newDrivers: 3, newPassengers: 12, potentialRides: 4 },
      suggestedMessage: 'Hey! Your route to campus is in high demand. Interested in driving?'
    });
  });
  
  return interventions;
}

export function generateAIRecommendation(communityInfo, corridors, supplyGaps, topUsers) {
  return `Based on our analysis of ${communityInfo.name}, there is significant demand for carpooling. We recommend activating early adopters and targeting key corridors to maximize impact.`;
}

export function simulateGrowth(initialState, steps = 10) {
  let sim = [];
  let current = { connectors: 0, drivers: 0, passengers: 0, rides: 0, referrals: 0, totalActive: 0 };
  
  for(let i=0; i<=steps; i++) {
    sim.push({
      step: i,
      label: `Week ${i}: ${i===0 ? 'Pre-ignition' : 'Growth phase'}`,
      ...current,
      newThisStep: i * 2,
      events: i === 0 ? ['Community analysis complete'] : [`Activated ${i} new drivers`]
    });
    
    current.connectors += 1;
    current.drivers += Math.floor(i * 1.5);
    current.passengers += Math.floor(i * 3);
    current.rides += Math.floor(i * 5);
    current.referrals += i;
    current.totalActive = current.connectors + current.drivers + current.passengers;
  }
  return sim;
}

export function getInterventionTemplates() {
  return {
    DRIVER_ACTIVATION: { title: 'Driver Activation' },
    CONNECTOR_OUTREACH: { title: 'Connector Outreach' },
    PASSENGER_RECRUITMENT: { title: 'Passenger Recruitment' },
    PILOT_RIDE: { title: 'Pilot Ride' },
    CORRIDOR_HOLD: { title: 'Corridor Hold' }
  };
}
