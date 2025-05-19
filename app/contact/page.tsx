"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import SendIcon from "@mui/icons-material/Send"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real implementation, this would call your API
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setSubmitSuccess(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false)
    setSubmitError(false)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            py: 8,
            bgcolor: "primary.light",
            color: "primary.contrastText",
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Contact Us
            </Typography>
            <Typography variant="h5" sx={{ maxWidth: 800, opacity: 0.9 }}>
              Have questions about Electronic Paralegal? We're here to help.
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Get in Touch
              </Typography>
              <Typography variant="body1" paragraph>
                Whether you have questions about our system, need help with your evaluation, or want to learn more about
                our services, our team is ready to assist you.
              </Typography>

              <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <List>
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Email" secondary="info@electronicparalegal.com" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <PhoneIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Phone" secondary="(555) 123-4567" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <LocationOnIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Address" secondary="123 Legal Tech Way, New York, NY 10001" />
                  </ListItem>
                </List>
              </Paper>

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                Hours of Operation
              </Typography>
              <Typography variant="body2">Monday - Friday: 9:00 AM - 6:00 PM EST</Typography>
              <Typography variant="body2">Saturday: 10:00 AM - 2:00 PM EST</Typography>
              <Typography variant="body2">Sunday: Closed</Typography>
            </Grid>

            <Grid item xs={12} md={7}>
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Send Us a Message
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          fullWidth
                          required
                          error={!!formErrors.name}
                          helperText={formErrors.name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          fullWidth
                          required
                          error={!!formErrors.email}
                          helperText={formErrors.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Phone Number (Optional)"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          multiline
                          rows={6}
                          fullWidth
                          required
                          error={!!formErrors.message}
                          helperText={formErrors.message}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          disabled={isSubmitting}
                          startIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Frequently Asked Questions
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Is Electronic Paralegal a law firm?
                    </Typography>
                    <Typography variant="body2">
                      No, Electronic Paralegal is not a law firm and does not provide legal advice. We are a technology
                      platform that helps individuals identify potential procedural issues in their criminal cases and
                      connect with qualified attorneys.
                    </Typography>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      How much does it cost to use Electronic Paralegal?
                    </Typography>
                    <Typography variant="body2">
                      Our basic case evaluation is free. There are no hidden fees or obligations when using our service.
                      If you choose to hire an attorney through our platform, any fees would be arranged directly
                      between you and the attorney.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Is my information kept confidential?
                    </Typography>
                    <Typography variant="body2">
                      Yes, we take your privacy seriously. Your information is encrypted and secure. We only share your
                      case details with attorneys you specifically authorize us to contact on your behalf.
                    </Typography>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      What types of cases can Electronic Paralegal evaluate?
                    </Typography>
                    <Typography variant="body2">
                      Currently, our system is designed to evaluate criminal cases with a focus on procedural due
                      process issues. We plan to expand to other areas of law in the future.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Footer />

      <Snackbar open={submitSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>

      <Snackbar open={submitError} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          There was an error sending your message. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  )
}
