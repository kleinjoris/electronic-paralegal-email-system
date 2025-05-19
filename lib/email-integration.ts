// Integration of the emailDistribution.js functionality into TypeScript

import nodemailer from "nodemailer"
import fs from "fs/promises"

type Lawyer = {
  id: number | string
  name: string
  email: string
  practiceAreas: string[]
  location: {
    lat: number
    lng: number
  }
  city: string
  state: string
  distance?: number
}

type ClientInfo = {
  name: string
  email: string
  phone: string
  city: string
  state: string
  caseType: string
  location: {
    lat: number
    lng: number
  }
}

type DistributionOptions = {
  practiceArea?: string
  maxDistance?: number
  maxLawyers?: number
}

type EmailResult = {
  lawyer: string
  email: string
  messageId?: string
  success: boolean
  error?: string
}

// Mock database of lawyers (in production, this would come from your actual database)
const lawyerDatabase: Lawyer[] = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@lawfirm.com",
    practiceAreas: ["criminal"],
    location: { lat: 40.7128, lng: -74.006 },
    city: "New York",
    state: "NY",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@legalpractice.com",
    practiceAreas: ["criminal", "civil"],
    location: { lat: 40.73, lng: -73.995 },
    city: "New York",
    state: "NY",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    email: "maria@criminaldefense.com",
    practiceAreas: ["criminal"],
    location: { lat: 40.6892, lng: -74.0445 },
    city: "Jersey City",
    state: "NJ",
  },
  {
    id: 4,
    name: "Robert Johnson",
    email: "rjohnson@legalaid.org",
    practiceAreas: ["criminal", "family"],
    location: { lat: 40.7831, lng: -73.9712 },
    city: "New York",
    state: "NY",
  },
  {
    id: 5,
    name: "Sarah Williams",
    email: "swilliams@defenselaw.com",
    practiceAreas: ["criminal"],
    location: { lat: 40.8448, lng: -73.8648 },
    city: "Bronx",
    state: "NY",
  },
]

// Function to calculate distance between two points (using Haversine formula)
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

// Function to find nearby lawyers based on client location and practice area
export function findNearbyLawyers(
  clientLocation: { lat: number; lng: number },
  practiceArea: string,
  maxDistance: number,
  maxLawyers: number,
): Lawyer[] {
  // Filter lawyers by practice area
  const relevantLawyers = lawyerDatabase.filter((lawyer) => lawyer.practiceAreas.includes(practiceArea.toLowerCase()))

  // Calculate distance for each lawyer
  const lawyersWithDistance = relevantLawyers.map((lawyer) => {
    const distance = calculateDistance(clientLocation.lat, clientLocation.lng, lawyer.location.lat, lawyer.location.lng)
    return { ...lawyer, distance }
  })

  // Sort by distance and limit to lawyers within maxDistance
  const nearbyLawyers = lawyersWithDistance
    .filter((lawyer) => lawyer.distance! <= maxDistance)
    .sort((a, b) => a.distance! - b.distance!)
    .slice(0, maxLawyers)

  return nearbyLawyers
}

// Function to read report file
async function readReportFile(filePath: string): Promise<string> {
  try {
    const content = await fs.readFile(filePath, "utf8")
    return content
  } catch (error) {
    console.error(`Error reading report file: ${error instanceof Error ? error.message : error}`)
    throw error
  }
}

// Function to create email content
function createEmailContent(report: string, clientInfo: ClientInfo, lawyer: Lawyer): string {
  return `
    <html>
      <body>
        <h2>Potential Client Seeking Legal Representation</h2>
        <p>Dear ${lawyer.name},</p>
        
        <p>A potential client has used our Electronic Paralegal system to evaluate their criminal case 
        and has expressed interest in legal representation. They are located approximately 
        ${lawyer.distance!.toFixed(1)} miles from your office.</p>
        
        <h3>Client Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${clientInfo.name}</li>
          <li><strong>Contact:</strong> ${clientInfo.phone} / ${clientInfo.email}</li>
          <li><strong>Location:</strong> ${clientInfo.city}, ${clientInfo.state}</li>
          <li><strong>Case Type:</strong> ${clientInfo.caseType}</li>
        </ul>
        
        <p>The system has identified potential procedural due process issues in their case. 
        A detailed report is attached for your review.</p>
        
        <p>If you are interested in representing this client, please contact them directly 
        using the information provided above.</p>
        
        <p>Best regards,<br>
        Electronic Paralegal System</p>
        
        <hr>
        <p style="font-size: 0.8em; color: #666;">
          This email was sent because the client requested attorney referrals through our system. 
          If you wish to opt out of future referrals, please click <a href="#">here</a>.
        </p>
      </body>
    </html>
  `
}

// Function to send emails to lawyers
async function sendEmailsToLawyers(report: string, clientInfo: ClientInfo, lawyers: Lawyer[]): Promise<EmailResult[]> {
  // In production, use your actual SMTP configuration
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: "your-email@example.com",
      pass: "your-password",
    },
  })

  const emailPromises = lawyers.map(async (lawyer) => {
    try {
      const emailContent = createEmailContent(report, clientInfo, lawyer)

      const mailOptions = {
        from: '"Electronic Paralegal" <notifications@electronicparalegal.com>',
        to: lawyer.email,
        subject: `Potential Client Seeking ${clientInfo.caseType} Representation`,
        html: emailContent,
        attachments: [
          {
            filename: `${clientInfo.name}_case_report.pdf`,
            content: Buffer.from(report, "utf-8"),
          },
        ],
      }

      const result = await transporter.sendMail(mailOptions)
      return {
        lawyer: lawyer.name,
        email: lawyer.email,
        messageId: result.messageId,
        success: true,
      }
    } catch (error) {
      console.error(`Error sending email to ${lawyer.name}:`, error)
      return {
        lawyer: lawyer.name,
        email: lawyer.email,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  })

  return Promise.all(emailPromises)
}

// Main function to distribute report to lawyers
export async function distributeReportToLawyers(
  reportFilePath: string,
  clientInfo: ClientInfo,
  options: DistributionOptions = {},
) {
  const { practiceArea = "criminal", maxDistance = 50, maxLawyers = 5 } = options

  try {
    console.log(`Processing report for ${clientInfo.name}...`)

    // 1. Read the report file
    const reportContent = await readReportFile(reportFilePath)

    // 2. Find nearby lawyers
    const nearbyLawyers = findNearbyLawyers(clientInfo.location, practiceArea, maxDistance, maxLawyers)

    console.log(`Found ${nearbyLawyers.length} lawyers within ${maxDistance} miles who practice ${practiceArea} law.`)

    if (nearbyLawyers.length === 0) {
      console.log("No suitable lawyers found in the area.")
      return { success: false, reason: "No lawyers found" }
    }

    // 3. Send emails to the lawyers
    const emailResults = await sendEmailsToLawyers(reportContent, clientInfo, nearbyLawyers)

    // 4. Log the activity
    const logEntry = {
      timestamp: new Date().toISOString(),
      client: clientInfo.name,
      reportFile: reportFilePath,
      lawyersContacted: emailResults,
    }

    console.log("Email distribution completed successfully.")
    console.log("Distribution log:", JSON.stringify(logEntry, null, 2))

    return {
      success: true,
      lawyersContacted: nearbyLawyers.length,
      emailResults,
    }
  } catch (error) {
    console.error(`Error in distributeReportToLawyers: ${error instanceof Error ? error.message : error}`)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Function to distribute report content directly (without reading from file)
export async function distributeReportContent(
  reportContent: string,
  clientInfo: ClientInfo,
  options: DistributionOptions = {},
) {
  const { practiceArea = "criminal", maxDistance = 50, maxLawyers = 5 } = options

  try {
    console.log(`Processing report for ${clientInfo.name}...`)

    // Find nearby lawyers
    const nearbyLawyers = findNearbyLawyers(clientInfo.location, practiceArea, maxDistance, maxLawyers)

    console.log(`Found ${nearbyLawyers.length} lawyers within ${maxDistance} miles who practice ${practiceArea} law.`)

    if (nearbyLawyers.length === 0) {
      console.log("No suitable lawyers found in the area.")
      return { success: false, reason: "No lawyers found" }
    }

    // Send emails to the lawyers
    const emailResults = await sendEmailsToLawyers(reportContent, clientInfo, nearbyLawyers)

    // Log the activity
    const logEntry = {
      timestamp: new Date().toISOString(),
      client: clientInfo.name,
      lawyersContacted: emailResults,
    }

    console.log("Email distribution completed successfully.")
    console.log("Distribution log:", JSON.stringify(logEntry, null, 2))

    return {
      success: true,
      lawyersContacted: nearbyLawyers.length,
      emailResults,
    }
  } catch (error) {
    console.error(`Error in distributeReportContent: ${error instanceof Error ? error.message : error}`)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
