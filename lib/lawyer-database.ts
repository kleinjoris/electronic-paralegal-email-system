// This file integrates the functionality from emailDistribution.js

type Lawyer = {
  id: string
  name: string
  email: string
  phone: string
  practiceAreas: string[]
  isPublicDefender: boolean
  location: {
    address: string
    city: string
    state: string
    zip: string
    coordinates: {
      latitude: number
      longitude: number
    }
  }
}

// Mock database of lawyers - using the data from emailDistribution.js
const lawyersDatabase: Lawyer[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane.smith@lawfirm.com",
    phone: "555-123-4567",
    practiceAreas: ["criminal", "dui"],
    isPublicDefender: false,
    location: {
      address: "123 Legal St",
      city: "New York",
      state: "NY",
      zip: "10001",
      coordinates: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    },
  },
  {
    id: "2",
    name: "John Doe",
    email: "john.doe@legalpractice.com",
    phone: "555-987-6543",
    practiceAreas: ["criminal", "civil"],
    isPublicDefender: false,
    location: {
      address: "456 Justice Ave",
      city: "New York",
      state: "NY",
      zip: "10002",
      coordinates: {
        latitude: 40.73,
        longitude: -73.995,
      },
    },
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    email: "maria@criminaldefense.com",
    phone: "555-456-7890",
    practiceAreas: ["criminal"],
    isPublicDefender: false,
    location: {
      address: "789 Defense Blvd",
      city: "Jersey City",
      state: "NJ",
      zip: "07302",
      coordinates: {
        latitude: 40.6892,
        longitude: -74.0445,
      },
    },
  },
  {
    id: "4",
    name: "Robert Johnson",
    email: "rjohnson@legalaid.org",
    phone: "555-789-0123",
    practiceAreas: ["criminal", "family"],
    isPublicDefender: true,
    location: {
      address: "101 Public Defender Ln",
      city: "New York",
      state: "NY",
      zip: "10003",
      coordinates: {
        latitude: 40.7831,
        longitude: -73.9712,
      },
    },
  },
  {
    id: "5",
    name: "Sarah Williams",
    email: "swilliams@defenselaw.com",
    phone: "555-234-5678",
    practiceAreas: ["criminal"],
    isPublicDefender: false,
    location: {
      address: "202 Attorney St",
      city: "Brooklyn",
      state: "NY",
      zip: "11201",
      coordinates: {
        latitude: 40.8448,
        longitude: -73.8648,
      },
    },
  },
]

// Calculate distance between two points using the Haversine formula
// This is the same function from emailDistribution.js
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8 // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in miles
}

type FindLawyersParams = {
  location: {
    latitude: number
    longitude: number
  }
  practiceArea: string
  maxDistance: number
  maxResults: number
  includePublicDefenders: boolean
}

type LawyerWithDistance = Lawyer & { distance: number }

export async function findNearbyLawyers(params: FindLawyersParams): Promise<LawyerWithDistance[]> {
  const { location, practiceArea, maxDistance, maxResults, includePublicDefenders } = params

  // Filter lawyers by practice area
  let filteredLawyers = lawyersDatabase.filter((lawyer) => lawyer.practiceAreas.includes(practiceArea.toLowerCase()))

  // Filter by public defender status if needed
  if (!includePublicDefenders) {
    filteredLawyers = filteredLawyers.filter((lawyer) => !lawyer.isPublicDefender)
  }

  // Calculate distance for each lawyer
  const lawyersWithDistance = filteredLawyers.map((lawyer) => {
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      lawyer.location.coordinates.latitude,
      lawyer.location.coordinates.longitude,
    )

    return { ...lawyer, distance }
  })

  // Filter by distance and sort by proximity
  const nearbyLawyers = lawyersWithDistance
    .filter((lawyer) => lawyer.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxResults)

  return nearbyLawyers
}
