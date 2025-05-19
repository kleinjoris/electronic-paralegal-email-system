import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

// Mock database of lawyers (in production, this would come from your actual database)
const lawyerDatabase = [
  { id: 1, name: 'Jane Smith', email: 'jane.smith@lawfirm.com', practiceAreas: ['criminal'], 
    location: { lat: 40.7128, lng: -74.0060 }, city: 'New York', state: 'NY' },
  { id: 2, name: 'John Doe', email: 'john.doe@legalpractice.com', practiceAreas: ['criminal', 'civil'], 
    location: { lat: 40.7300, lng: -73.9950 }, city: 'New York', state: 'NY' },
  { id: 3, name: 'Maria Rodriguez', email: 'maria@criminaldefense.com', practiceAreas: ['criminal'], 
    location: { lat: 40.6892, lng: -74.0445 }, city: 'Jersey City', state: 'NJ' },
  { id: 4, name: 'Robert Johnson', email: 'rjohnson@legalaid.org', practiceAreas: ['criminal', 'family'], 
    location: { lat: 40.7831, lng: -73.9712 }, city: 'New York', state: 'NY' },
  { id: 5, name: 'Sarah Williams', email: 'swilliams@defenselaw.com', practiceAreas: ['criminal'], 
    location: { lat: 40.8448, lng: -73.8648 }, city: 'Bronx', state: 'NY' },
];

// Function to calculate distance between two points (using Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in miles
}

// Function to find nearby lawyers based on client location and practice area
function findNearbyLawyers(clientLocation, practiceArea, maxDistance, maxLawyers) {
  // Filter lawyers by practice area
  const relevantLawyers = lawyerDatabase.filter(lawyer => 
    lawyer.practiceAreas.includes(practiceArea.toLowerCase())
  );
  
  // Calculate distance for each lawyer
  const lawyersWithDistance = relevantLawyers.map(lawyer => {
    const distance = calculateDistance(
      clientLocation.lat, 
      clientLocation.lng, 
      lawyer.location.lat, 
      lawyer.location.lng
    );
    return { ...lawyer, distance };
  });
  
  // Sort by distance and limit to lawyers within maxDistance
  const nearbyLawyers = lawyersWithDistance
    .filter(lawyer => lawyer.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxLawyers);
  
  return nearbyLawyers;
}

// Function to read report file
async function readReportFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Error reading report file: ${error.message}`);
    throw error;
  }
}

// Function to send emails to lawyers
async function sendEmailsToLawyers(report, clientInfo, lawyers) {
  // In production, use your actual SMTP configuration
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@example.com',
      pass: 'your-password'
    }
  });

  const emailPromises = lawyers.map(lawyer => {
    const emailContent = createEmailContent(report, clientInfo, lawyer);
    
    const mailOptions = {
      from: '"Electronic Paralegal" <notifications@electronicparalegal.com>',
      to: lawyer.email,
      subject: `Potential Client Seeking ${clientInfo.caseType} Representation`,
      html: emailContent,
      attachments: [
        {
          filename: `${clientInfo.name}_case_report.pdf`,
          content: Buffer.from(report, 'utf-8')
        }
      ]
    };
    
    return transporter.sendMail(mailOptions);
  });
  
  try {
    const results = await Promise.all(emailPromises);
    return results.map((result, index) => ({
      lawyer: lawyers[index].name,
      email: lawyers[index].email,
      messageId: result.messageId,
      success: true
    }));
  } catch (error) {
    console.error(`Error sending emails: ${error.message}`);
    throw error;
  }
}

// Function to create email content
function createEmailContent(report, clientInfo, lawyer) {
  return `
    <html>
      <body>
        <h2>Potential Client Seeking Legal Representation</h2>
        <p>Dear ${lawyer.name},</p>
        
        <p>A potential client has used our Electronic Paralegal system to evaluate their criminal case 
        and has expressed interest in legal representation. They are located approximately 
        ${lawyer.distance.toFixed(1)} miles from your office.</p>
        
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
  `;
}

// Main function to distribute report to lawyers
async function distributeReportToLawyers(reportFilePath, clientInfo, options = {}) {
  const {
    practiceArea = 'criminal',
    maxDistance = 50, // miles
    maxLawyers = 5
  } = options;
  
  try {
    console.log(`Processing report for ${clientInfo.name}...`);
    
    // 1. Read the report file
    const reportContent = await readReportFile(reportFilePath);
    
    // 2. Find nearby lawyers
    const nearbyLawyers = findNearbyLawyers(
      clientInfo.location, 
      practiceArea, 
      maxDistance, 
      maxLawyers
    );
    
    console.log(`Found ${nearbyLawyers.length} lawyers within ${maxDistance} miles who practice ${practiceArea} law.`);
    
    if (nearbyLawyers.length === 0) {
      console.log('No suitable lawyers found in the area.');
      return { success: false, reason: 'No lawyers found' };
    }
    
    // 3. Send emails to the lawyers
    const emailResults = await sendEmailsToLawyers(reportContent, clientInfo, nearbyLawyers);
    
    // 4. Log the activity
    const logEntry = {
      timestamp: new Date().toISOString(),
      client: clientInfo.name,
      reportFile: reportFilePath,
      lawyersContacted: emailResults
    };
    
    console.log('Email distribution completed successfully.');
    console.log('Distribution log:', JSON.stringify(logEntry, null, 2));
    
    return { 
      success: true, 
      lawyersContacted: nearbyLawyers.length,
      emailResults 
    };
    
  } catch (error) {
    console.error(`Error in distributeReportToLawyers: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Example usage
const clientInfo = {
  name: 'Michael Johnson',
  email: 'mjohnson@example.com',
  phone: '555-123-4567',
  city: 'New York',
  state: 'NY',
  caseType: 'Criminal Defense - First Contact',
  location: { lat: 40.7128, lng: -74.0060 } // New York City coordinates
};

// Simulate the report path (in your system, this would be the actual path)
const reportPath = './reports/michael_johnson_case_report.txt';

// Execute the distribution function
distributeReportToLawyers(reportPath, clientInfo, {
  practiceArea: 'criminal',
  maxDistance: 30,
  maxLawyers: 5
})
  .then(result => {
    if (result.success) {
      console.log(`Successfully distributed report to ${result.lawyersContacted} lawyers.`);
    } else {
      console.log(`Failed to distribute report: ${result.reason || result.error}`);
    }
  })
  .catch(error => {
    console.error('Error executing distribution:', error);
  });
