def organize_journeys(trips):
    journeys = []
    trips.sort(key=lambda x: x['starting_time'])  # Sort trips by starting time
    
    ongoing_journeys = {}
    
    for trip in trips:
        origin = trip['origin']
        destination = trip['destination']
        
        if origin not in ongoing_journeys:
            ongoing_journeys[origin] = [trip]  # Start a new journey
        else:
            current_journey = ongoing_journeys[origin][-1]  # Get the last journey for this origin
            if current_journey['destination'] == destination:
                current_journey['ending_time'] = trip['ending_time']  # Extend the current journey
            else:
                ongoing_journeys[origin].append(trip)  # Start a new journey
        
        # Check if any journey has ended and move it to journeys list
        for journey in list(ongoing_journeys[origin]):
            if journey['ending_time']:
                journeys.append(ongoing_journeys[origin].pop(0))
    
    # Add any ongoing journeys to the list of journeys
    for origin, journey_list in ongoing_journeys.items():
        journeys.extend(journey_list)
    
    return journeys

# Example usage:
trips = [
    {'origin': 'A', 'destination': 'B', 'starting_time': 100, 'ending_time': 200},
    {'origin': 'B', 'destination': 'C', 'starting_time': 150, 'ending_time': 250},
    {'origin': 'A', 'destination': 'C', 'starting_time': 180, 'ending_time': 220},
    {'origin': 'C', 'destination': 'D', 'starting_time': 210, 'ending_time': 300},
    {'origin': 'B', 'destination': 'D', 'starting_time': 220, 'ending_time': 320}
]

organized_journeys = organize_journeys(trips)
print(organized_journeys)
