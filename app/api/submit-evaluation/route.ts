import { NextResponse } from "next/server"
import { generateReport } from "@/lib/report-generator"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the data
    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 })
    }

    // Generate a report based on the evaluation data
    const report = await generateReport(data)

    // In a real implementation, you would save the report to a database
    // and potentially trigger other actions

    return NextResponse.json({
      success: true,
      reportId: report.id,
      message: "Evaluation submitted successfully",
    })
  } catch (error) {
    console.error("Error processing evaluation:", error)
    return NextResponse.json({ error: "Failed to process evaluation" }, { status: 500 })
  }
}
