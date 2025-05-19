"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slider,
  Tab,
  Tabs,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material"
import WarningIcon from "@mui/icons-material/Warning"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import InfoIcon from "@mui/icons-material/Info"
import DownloadIcon from "@mui/icons-material/Download"
import EmailIcon from "@mui/icons-material/Email"
import Header from "@/components/header"
import LawyerSearchDialog from "@/components/lawyer-search-dialog"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

// Mock data - in a real app, this would come from your API
const reportData = {
  caseId: "CR-2023-05192",
  clientName: "John Smith",
  evaluationDate: "May 19, 2023",
  summary: {
    score: 65,
    potentialIssues: 3,
    recommendation: "Potential procedural issues identified. Legal consultation recommended.",
  },
  issues: [
    {
      id: 1,
      title: "Miranda Rights Violation",
      description: "Based on your responses, there may be an issue with how your Miranda rights were administered.",
      severity: "high",
      details:
        "You indicated that you were questioned after requesting an attorney. Once you request an attorney, all questioning must cease until your attorney is present. Any statements obtained after you requested an attorney may be inadmissible.",
    },
    {
      id: 2,
      title: "Search Warrant Concerns",
      description: "There may be issues with the search that led to evidence collection.",
      severity: "medium",
      details:
        "You indicated that there was no search warrant, but a search was conducted without your explicit consent. This may constitute an illegal search depending on the specific circumstances.",
    },
    {
      id: 3,
      title: "Arraignment Timing",
      description: "There may be an issue with the timing of your arraignment.",
      severity: "low",
      details:
        "You indicated that your arraignment was delayed. Defendants have the right to be brought before a judge without unnecessary delay. The specific requirements vary by jurisdiction.",
    },
  ],
  nextSteps: [
    "Consult with a criminal defense attorney to discuss these potential issues",
    "Gather any documentation related to your arrest and charges",
    "Do not discuss your case with anyone except your attorney",
    "Keep track of all court dates and deadlines",
  ],
}

export default function ResultsPage() {
  const [tabValue, setTabValue] = useState(0)
  const [showLawyerDialog, setShowLawyerDialog] = useState(false)
  const [showLawyerSearchDialog, setShowLawyerSearchDialog] = useState(false)
  const [lawyerPreferences, setLawyerPreferences] = useState({
    distance: 25,
    count: 5,
    includePublicDefenders: true,
    practiceArea: "criminal",
  })
  const [emailSent, setEmailSent] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Show the connection prompt after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download a PDF
    alert("In a real implementation, this would download a PDF report")
  }

  const handleSendToLawyers = async () => {
    setIsLoading(true)

    try {
      // In a real implementation, this would call your API to send the report to lawyers
      const response = await fetch("/api/send-to-lawyers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportId: reportData.caseId,
          clientLocation: {
            // New York City coordinates as an example
            latitude: 40.7128,
            longitude: -74.006,
          },
          preferences: lawyerPreferences,
          clientInfo: {
            name: reportData.clientName,
            // In a real implementation, this would include more client info
            email: "client@example.com",
            phone: "555-123-4567",
            city: "New York",
            state: "NY",
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send report to lawyers")
      }

      setEmailSent(true)
    } catch (error) {
      console.error("Error sending report to lawyers:", error)
      alert("There was an error sending your report. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFindLawyers = () => {
    setShowLawyerSearchDialog(true)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "error.main"
      case "medium":
        return "warning.main"
      case "low":
        return "info.main"
      default:
        return "text.secondary"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <WarningIcon color="error" />
      case "medium":
        return <WarningIcon color="warning" />
      case "low":
        return <InfoIcon color="info" />
      default:
        return <InfoIcon color="action" />
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Your Case Evaluation Results
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review your case evaluation and explore potential procedural due process issues.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Case ID" sx={{ pb: 1 }} />
              <CardContent>
                <Typography variant="h4" component="div" gutterBottom>
                  {reportData.caseId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Evaluation Date: {reportData.evaluationDate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Evaluation Score" sx={{ pb: 1 }} />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h4"
                    component="div"
                    color={
                      reportData.summary.score > 70
                        ? "success.main"
                        : reportData.summary.score > 40
                          ? "warning.main"
                          : "error.main"
                    }
                  >
                    {reportData.summary.score}/100
                  </Typography>
                  <Box sx={{ ml: "auto" }}>
                    {reportData.summary.score > 70 ? (
                      <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                    ) : (
                      <WarningIcon color="warning" sx={{ fontSize: 40 }} />
                    )}
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {reportData.summary.potentialIssues} potential issues identified
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Actions" sx={{ pb: 1 }} />
              <CardContent>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadReport}
                  sx={{ mb: 1 }}
                >
                  Download Report
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EmailIcon />}
                  onClick={() => setShowLawyerDialog(true)}
                >
                  Send to Lawyers
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {showPrompt && (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderLeft: 4,
              borderColor: "primary.main",
              bgcolor: (theme) => (theme.palette.mode === "dark" ? "primary.dark" : "primary.light"),
              color: "primary.contrastText",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>
                  Would you like us to connect you with qualified attorneys in your area?
                </Typography>
                <Typography variant="body1">
                  Based on your case evaluation, we can help you find attorneys who specialize in handling cases with
                  similar procedural issues.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleFindLawyers}
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    "&:hover": {
                      bgcolor: "grey.100",
                    },
                  }}
                >
                  Find Attorneys Now
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        <Alert severity="warning" sx={{ mb: 4 }}>
          <AlertTitle>Disclaimer</AlertTitle>
          This evaluation is not legal advice. The results are based on the information you provided and should be
          reviewed by a qualified attorney.
        </Alert>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="case evaluation tabs">
              <Tab label="Summary" id="tab-0" aria-controls="tabpanel-0" />
              <Tab label="Potential Issues" id="tab-1" aria-controls="tabpanel-1" />
              <Tab label="Next Steps" id="tab-2" aria-controls="tabpanel-2" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Card>
              <CardHeader title="Case Summary" subheader="Overview of your case evaluation" />
              <CardContent>
                <Typography variant="body1" paragraph>
                  {reportData.summary.recommendation}
                </Typography>

                <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1, mt: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Key Findings:
                  </Typography>
                  <List dense>
                    {reportData.issues.map((issue) => (
                      <ListItem key={issue.id}>
                        <ListItemText
                          primary={issue.title}
                          primaryTypographyProps={{
                            color: getSeverityColor(issue.severity),
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Card>
              <CardHeader
                title="Potential Procedural Issues"
                subheader="Detailed analysis of potential issues in your case"
              />
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {reportData.issues.map((issue) => (
                    <Card key={issue.id} variant="outlined">
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Box sx={{ mr: 1 }}>{getSeverityIcon(issue.severity)}</Box>
                          <Typography variant="h6" component="h3" color={getSeverityColor(issue.severity)}>
                            {issue.title}
                          </Typography>
                          <Box
                            sx={{
                              ml: "auto",
                              px: 1,
                              py: 0.5,
                              borderRadius: 10,
                              bgcolor: `${getSeverityColor(issue.severity)}`,
                              color: "white",
                              fontSize: "0.75rem",
                              fontWeight: "medium",
                              opacity: 0.9,
                            }}
                          >
                            {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Severity
                          </Box>
                        </Box>
                        <Typography variant="body1" paragraph>
                          {issue.description}
                        </Typography>
                        <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1, mt: 1 }}>
                          <Typography variant="body2">{issue.details}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Card>
              <CardHeader title="Recommended Next Steps" subheader="Actions you should consider taking" />
              <CardContent>
                <List>
                  {reportData.nextSteps.map((step, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            bgcolor: "primary.main",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.875rem",
                            fontWeight: "medium",
                          }}
                        >
                          {index + 1}
                        </Box>
                      </ListItemIcon>
                      <ListItemText primary={step} />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Button variant="contained" color="primary" size="large" onClick={handleFindLawyers}>
                    Connect with Lawyers in Your Area
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </TabPanel>
        </Box>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button component={Link} href="/" variant="outlined">
            Return to Home
          </Button>
        </Box>
      </Container>

      {/* Send to Lawyers Dialog */}
      <Dialog open={showLawyerDialog} onClose={() => setShowLawyerDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{emailSent ? "Report Sent Successfully" : "Connect with Lawyers"}</DialogTitle>
        <DialogContent>
          {emailSent ? (
            <Box sx={{ py: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", mb: 3 }}>
                <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Report Sent Successfully
                </Typography>
                <DialogContentText>
                  Your case report has been sent to {lawyerPreferences.count} lawyers within{" "}
                  {lawyerPreferences.distance} miles of your location.
                </DialogContentText>
              </Box>
              <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  What happens next?
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Lawyers will review your case report" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Interested lawyers may contact you directly" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="You can choose which lawyer you want to work with" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="There is no obligation to hire any lawyer who contacts you" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          ) : (
            <Box sx={{ py: 2 }}>
              <DialogContentText sx={{ mb: 3 }}>
                Send your case report to qualified lawyers in your area who may be able to help with your case.
              </DialogContentText>

              <Typography gutterBottom>Maximum Distance</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  5 miles
                </Typography>
                <Box sx={{ flex: 1, mx: 2 }}>
                  <Slider
                    value={lawyerPreferences.distance}
                    onChange={(e, newValue) =>
                      setLawyerPreferences({ ...lawyerPreferences, distance: newValue as number })
                    }
                    min={5}
                    max={50}
                    step={5}
                    valueLabelDisplay="auto"
                    aria-labelledby="distance-slider"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  50 miles
                </Typography>
              </Box>

              <Typography gutterBottom>Number of Lawyers</Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  1 lawyer
                </Typography>
                <Box sx={{ flex: 1, mx: 2 }}>
                  <Slider
                    value={lawyerPreferences.count}
                    onChange={(e, newValue) =>
                      setLawyerPreferences({ ...lawyerPreferences, count: newValue as number })
                    }
                    min={1}
                    max={10}
                    valueLabelDisplay="auto"
                    aria-labelledby="count-slider"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  10 lawyers
                </Typography>
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={lawyerPreferences.includePublicDefenders}
                    onChange={(e) =>
                      setLawyerPreferences({
                        ...lawyerPreferences,
                        includePublicDefenders: e.target.checked,
                      })
                    }
                  />
                }
                label="Include public defenders and legal aid"
              />

              <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1, mt: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  What information will be shared?
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Your contact information" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Your case evaluation report" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="The potential procedural issues identified" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {emailSent ? (
            <Button onClick={() => setShowLawyerDialog(false)}>Close</Button>
          ) : (
            <>
              <Button onClick={() => setShowLawyerDialog(false)}>Cancel</Button>
              <Button onClick={handleSendToLawyers} variant="contained" color="primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Sending...
                  </>
                ) : (
                  "Send Report"
                )}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Lawyer Search Dialog */}
      <LawyerSearchDialog
        open={showLawyerSearchDialog}
        onClose={() => setShowLawyerSearchDialog(false)}
        reportId={reportData.caseId}
      />
    </Box>
  )
}
