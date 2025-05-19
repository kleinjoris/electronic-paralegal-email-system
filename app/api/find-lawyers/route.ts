import { NextResponse } from "next/server"
import { findNearbyLawyers } from "@/lib/lawyer-database"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the request
    if (!data.location) {
      return NextResponse.json({ error: "Missing location data" }, { status: 400 })
    }

    const {
      location,
      practiceArea = "criminal",
      maxDistance = 25,
      maxResults = 10,
      includePublicDefenders = true,
    } = data

    // Find nearby lawyers based on client location and preferences
    const lawyers = await findNearbyLawyers({
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      practiceArea,
      maxDistance,
      maxResults,
      includePublicDefenders,
    })

    return NextResponse.json({
      success: true,
      lawyers,
      total: lawyers.length,
    })
  } catch (error) {
    console.error("Error finding lawyers:", error)
    return NextResponse.json({ error: "Failed to find lawyers" }, { status: 500 })
  }
}
