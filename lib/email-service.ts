// This file integrates the functionality from emailDistribution.js

import nodemailer from "nodemailer"
import { v4 as uuidv4 } from "uuid"

type Lawyer = {
  id: string
  name: string
  email: string
  distance?: number
  [key: string]: any
}

type ClientInfo = {
  name: string
  email: string
  phone: string
  city: string
  state: string
  [key: string]: any
}

type SendEmailParams = {
  reportId: string
  lawyers: Lawyer[]
  clientInfo: ClientInfo
}

type EmailResult = {
  lawyerId: string
  lawyerName: string
  lawyerEmail: string
  messageId?: string
  success: boolean
  error?: string
}

// In a real implementation, you would use environment variables for these settings
const emailConfig = {
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: "notifications@electronicparalegal.com",
    pass: "your-password-here",
  },
}

export async function sendEmailToLawyers(params: SendEmailParams): Promise<EmailResult[]> {
  const { reportId, lawyers, clientInfo } = params

  // In a real implementation, you would fetch the actual report from your database
  // For this example, we'll assume we have the report content

  // Create a transporter
  const transporter = nodemailer.createTransport(emailConfig)

  // Send emails to each lawyer
  const emailPromises = lawyers.map(async (lawyer) => {
    try {
      const emailContent = createEmailContent(lawyer, clientInfo, reportId)

      const mailOptions = {
        from: '"Electronic Paralegal" <notifications@electronicparalegal.com>',
        to: lawyer.email,
        subject: `Potential Client Seeking Criminal Defense Representation`,
        html: emailContent,
        attachments: [
          {
            filename: `${clientInfo.name.replace(/\s+/g, "_")}_case_report.pdf`,
            path: `/reports/${reportId}.pdf`, // In a real implementation, this would be the actual path
            contentType: "application/pdf",
          },
        ],
      }

      const info = await transporter.sendMail(mailOptions)

      return {
        lawyerId: lawyer.id,
        lawyerName: lawyer.name,
        lawyerEmail: lawyer.email,
        messageId: info.messageId,
        success: true,
      }
    } catch (error) {
      console.error(`Error sending email to ${lawyer.name}:`, error)
      return {
        lawyerId: lawyer.id,
        lawyerName: lawyer.name,
        lawyerEmail: lawyer.email,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  })

  // Wait for all emails to be sent
  const results = await Promise.all(emailPromises)

  // In a real implementation, you would log these results to your database

  return results
}

function createEmailContent(lawyer: Lawyer, clientInfo: ClientInfo, reportId: string): string {
  const distance = lawyer.distance ? `${lawyer.distance.toFixed(1)} miles` : "your area"

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
          .footer { font-size: 12px; color: #777; margin-top: 30px; padding-top: 10px; border-top: 1px solid #eee; }
          .client-info { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
          h2 { color: #444; }
          .button { display: inline-block; background-color: #4169e1; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Potential Client Seeking Legal Representation</h2>
          </div>
          
          <p>Dear ${lawyer.name},</p>
          
          <p>A potential client has used our Electronic Paralegal system to evaluate their criminal case 
          and has expressed interest in legal representation. They are located approximately 
          ${distance} from your office.</p>
          
          <div class="client-info">
            <h3>Client Information:</h3>
            <ul>
              <li><strong>Name:</strong> ${clientInfo.name}</li>
              <li><strong>Contact:</strong> ${clientInfo.phone} / ${clientInfo.email}</li>
              <li><strong>Location:</strong> ${clientInfo.city}, ${clientInfo.state}</li>
              <li><strong>Case Type:</strong> Criminal Defense</li>
            </ul>
          </div>
          
          <p>The system has identified potential procedural due process issues in their case. 
          A detailed report is attached for your review.</p>
          
          <p>If you are interested in representing this client, please contact them directly 
          using the information provided above.</p>
          
          <p>Best regards,<br>
          Electronic Paralegal System</p>
          
          <div class="footer">
            <p>This email was sent because the client requested attorney referrals through our system. 
            If you wish to opt out of future referrals, please <a href="https://electronicparalegal.com/opt-out?id=${lawyer.id}&token=${uuidv4()}">click here</a>.</p>
            <p>Electronic Paralegal | 123 Legal Tech Way | New York, NY 10001</p>
          </div>
        </div>
      </body>
    </html>
  `
}
