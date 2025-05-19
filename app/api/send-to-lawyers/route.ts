import { NextResponse } from "next/server"
import { findNearbyLawyers } from "@/lib/lawyer-database"
import { sendEmailToLawyers } from "@/lib/email-service"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the request
    if (!data.reportId || !data.clientLocation || !data.preferences) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    const { reportId, clientLocation, preferences } = data

    // Find nearby lawyers based on client location and preferences
    const lawyers = await findNearbyLawyers({
      location: {
        latitude: clientLocation.latitude,
        longitude: clientLocation.longitude,
      },
      practiceArea: preferences.practiceArea || "criminal",
      maxDistance: preferences.distance || 25,
      maxResults: preferences.count || 5,
      includePublicDefenders: preferences.includePublicDefenders !== false,
    })

    if (lawyers.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No lawyers found matching your criteria",
      })
    }

    // Send the report to the selected lawyers
    const emailResults = await sendEmailToLawyers({
      reportId,
      lawyers,
      clientInfo: data.clientInfo,
    })

    // Log the distribution for record-keeping
    // In a real implementation, you would save this to a database
    console.log(`Report ${reportId} sent to ${lawyers.length} lawyers`)

    return NextResponse.json({
      success: true,
      lawyersContacted: lawyers.length,
      emailResults,
    })
  } catch (error) {
    console.error("Error sending report to lawyers:", error)
    return NextResponse.json({ error: "Failed to send report to lawyers" }, { status: 500 })
  }
}
