"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Slider,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
} from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import GavelIcon from "@mui/icons-material/Gavel"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import SendIcon from "@mui/icons-material/Send"
import FilterListIcon from "@mui/icons-material/FilterList"
import SearchIcon from "@mui/icons-material/Search"

// Mock lawyer data - in a real app, this would come from your API
const mockLawyers = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@lawfirm.com",
    phone: "555-123-4567",
    practiceAreas: ["Criminal Defense", "DUI"],
    isPublicDefender: false,
    rating: 4.8,
    reviewCount: 56,
    location: {
      address: "123 Legal St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    distance: 2.3,
    bio: "Jane Smith is a criminal defense attorney with over 15 years of experience handling cases involving procedural violations and due process issues.",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@legalpractice.com",
    phone: "555-987-6543",
    practiceAreas: ["Criminal Defense", "Civil Rights"],
    isPublicDefender: false,
    rating: 4.5,
    reviewCount: 42,
    location: {
      address: "456 Justice Ave",
      city: "New York",
      state: "NY",
      zip: "10002",
    },
    distance: 3.7,
    bio: "John Doe specializes in criminal defense with a focus on constitutional rights and procedural justice.",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    email: "maria@criminaldefense.com",
    phone: "555-456-7890",
    practiceAreas: ["Criminal Defense"],
    isPublicDefender: false,
    rating: 4.9,
    reviewCount: 78,
    location: {
      address: "789 Defense Blvd",
      city: "Jersey City",
      state: "NJ",
      zip: "07302",
    },
    distance: 5.1,
    bio: "Maria Rodriguez is a top-rated criminal defense attorney who has successfully handled numerous cases involving Miranda rights violations and illegal searches.",
  },
  {
    id: 4,
    name: "Robert Johnson",
    email: "rjohnson@legalaid.org",
    phone: "555-789-0123",
    practiceAreas: ["Criminal Defense", "Family Law"],
    isPublicDefender: true,
    rating: 4.2,
    reviewCount: 31,
    location: {
      address: "101 Public Defender Ln",
      city: "New York",
      state: "NY",
      zip: "10003",
    },
    distance: 1.8,
    bio: "Robert Johnson is a dedicated public defender with extensive experience in criminal defense and a commitment to equal justice.",
  },
  {
    id: 5,
    name: "Sarah Williams",
    email: "swilliams@defenselaw.com",
    phone: "555-234-5678",
    practiceAreas: ["Criminal Defense"],
    isPublicDefender: false,
    rating: 4.7,
    reviewCount: 63,
    location: {
      address: "202 Attorney St",
      city: "Brooklyn",
      state: "NY",
      zip: "11201",
    },
    distance: 6.4,
    bio: "Sarah Williams focuses on criminal defense cases involving procedural violations and has a strong track record of getting evidence suppressed.",
  },
]

interface LawyerSearchDialogProps {
  open: boolean
  onClose: () => void
  reportId: string
}

export default function LawyerSearchDialog({ open, onClose, reportId }: LawyerSearchDialogProps) {
  const [searchParams, setSearchParams] = useState({
    distance: 25,
    includePublicDefenders: true,
    practiceArea: "Criminal Defense",
    sortBy: "distance",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [lawyers, setLawyers] = useState<any[]>([])
  const [selectedLawyers, setSelectedLawyers] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailSending, setEmailSending] = useState(false)

  // Load lawyers when dialog opens
  useEffect(() => {
    if (open) {
      searchLawyers()
    }
  }, [open])

  const searchLawyers = async () => {
    setIsLoading(true)

    try {
      // In a real implementation, this would call your API
      // For now, we'll use the mock data and filter it
      setTimeout(() => {
        let filteredLawyers = [...mockLawyers]

        // Filter by distance
        filteredLawyers = filteredLawyers.filter((lawyer) => lawyer.distance <= searchParams.distance)

        // Filter by public defender status if needed
        if (!searchParams.includePublicDefenders) {
          filteredLawyers = filteredLawyers.filter((lawyer) => !lawyer.isPublicDefender)
        }

        // Filter by practice area
        filteredLawyers = filteredLawyers.filter((lawyer) => lawyer.practiceAreas.includes(searchParams.practiceArea))

        // Sort results
        if (searchParams.sortBy === "distance") {
          filteredLawyers.sort((a, b) => a.distance - b.distance)
        } else if (searchParams.sortBy === "rating") {
          filteredLawyers.sort((a, b) => b.rating - a.rating)
        }

        setLawyers(filteredLawyers)
        setIsLoading(false)
      }, 1000) // Simulate API delay
    } catch (error) {
      console.error("Error searching for lawyers:", error)
      setIsLoading(false)
    }
  }

  const handleSearchParamChange = (param: string, value: any) => {
    setSearchParams((prev) => ({
      ...prev,
      [param]: value,
    }))
  }

  const toggleLawyerSelection = (lawyerId: number) => {
    setSelectedLawyers((prev) => {
      if (prev.includes(lawyerId)) {
        return prev.filter((id) => id !== lawyerId)
      } else {
        return [...prev, lawyerId]
      }
    })
  }

  const handleSendReport = async () => {
    if (selectedLawyers.length === 0) return

    setEmailSending(true)

    try {
      // In a real implementation, this would call your API
      // For now, we'll simulate an API call
      setTimeout(() => {
        setEmailSent(true)
        setEmailSending(false)
      }, 2000) // Simulate API delay
    } catch (error) {
      console.error("Error sending report to lawyers:", error)
      setEmailSending(false)
    }
  }

  const renderStarRating = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarIcon key={i} fontSize="small" sx={{ color: "gold" }} />)
      } else if (i - 0.5 <= rating) {
        stars.push(<StarIcon key={i} fontSize="small" sx={{ color: "gold" }} />)
      } else {
        stars.push(<StarBorderIcon key={i} fontSize="small" sx={{ color: "gold" }} />)
      }
    }
    return stars
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{emailSent ? "Report Sent Successfully" : "Find Qualified Attorneys"}</DialogTitle>

      <DialogContent dividers>
        {emailSent ? (
          <Box sx={{ py: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", mb: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "success.light",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <SendIcon sx={{ fontSize: 40, color: "white" }} />
              </Box>
              <Typography variant="h5" gutterBottom>
                Your Case Report Has Been Sent!
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Your case report has been sent to {selectedLawyers.length} selected attorneys.
              </Typography>
            </Box>

            <Box sx={{ bgcolor: "background.paper", p: 3, borderRadius: 2, mb: 3, border: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom>
                What happens next?
              </Typography>
              <List>
                <ListItem>
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
                      }}
                    >
                      1
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary="Attorneys will review your case"
                    secondary="The selected attorneys will receive your case report and review the details."
                  />
                </ListItem>
                <ListItem>
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
                      }}
                    >
                      2
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary="Attorneys will contact you"
                    secondary="Interested attorneys will reach out to you directly via email or phone within 1-2 business days."
                  />
                </ListItem>
                <ListItem>
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
                      }}
                    >
                      3
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary="Choose your representation"
                    secondary="You can speak with multiple attorneys before deciding who you want to work with."
                  />
                </ListItem>
              </List>
            </Box>

            <Alert severity="info">
              There is no obligation to hire any of the attorneys who contact you. You are free to choose the best fit
              for your case.
            </Alert>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Attorneys Near You</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Find qualified attorneys who can help with your case
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    startIcon={<FilterListIcon />}
                    onClick={() => setShowFilters(!showFilters)}
                    variant={showFilters ? "contained" : "outlined"}
                    size="small"
                  >
                    {showFilters ? "Hide Filters" : "Show Filters"}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {showFilters && (
              <Box sx={{ mb: 3, p: 2, border: 1, borderColor: "divider", borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Search Filters
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>Maximum Distance</Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body2" color="text.secondary">
                        5 miles
                      </Typography>
                      <Box sx={{ flex: 1, mx: 2 }}>
                        <Slider
                          value={searchParams.distance}
                          onChange={(e, newValue) => handleSearchParamChange("distance", newValue)}
                          min={5}
                          max={50}
                          step={5}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        50 miles
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Practice Area</InputLabel>
                      <Select
                        value={searchParams.practiceArea}
                        label="Practice Area"
                        onChange={(e) => handleSearchParamChange("practiceArea", e.target.value)}
                      >
                        <MenuItem value="Criminal Defense">Criminal Defense</MenuItem>
                        <MenuItem value="DUI">DUI</MenuItem>
                        <MenuItem value="Civil Rights">Civil Rights</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Sort By</InputLabel>
                      <Select
                        value={searchParams.sortBy}
                        label="Sort By"
                        onChange={(e) => handleSearchParamChange("sortBy", e.target.value)}
                      >
                        <MenuItem value="distance">Distance</MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={searchParams.includePublicDefenders}
                          onChange={(e) => handleSearchParamChange("includePublicDefenders", e.target.checked)}
                        />
                      }
                      label="Include public defenders and legal aid"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" startIcon={<SearchIcon />} onClick={searchLawyers} disabled={isLoading}>
                      {isLoading ? "Searching..." : "Search"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : lawyers.length > 0 ? (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  {lawyers.length} attorneys found within {searchParams.distance} miles
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Select one or more attorneys to send your case report to
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {lawyers.map((lawyer) => (
                    <Card
                      key={lawyer.id}
                      variant="outlined"
                      sx={{
                        borderColor: selectedLawyers.includes(lawyer.id) ? "primary.main" : "divider",
                        bgcolor: selectedLawyers.includes(lawyer.id) ? "action.selected" : "background.paper",
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={8}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <Typography variant="h6" component="div">
                                {lawyer.name}
                              </Typography>
                              {lawyer.isPublicDefender && (
                                <Chip
                                  label="Public Defender"
                                  size="small"
                                  sx={{ ml: 1, bgcolor: "info.light", color: "info.contrastText" }}
                                />
                              )}
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              {renderStarRating(lawyer.rating)}
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                ({lawyer.reviewCount} reviews)
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <GavelIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                              <Typography variant="body2">{lawyer.practiceAreas.join(", ")}</Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <LocationOnIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                              <Typography variant="body2">
                                {lawyer.location.city}, {lawyer.location.state} ({lawyer.distance.toFixed(1)} miles
                                away)
                              </Typography>
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {lawyer.bio}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            sm={4}
                            sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                          >
                            <Box>
                              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <EmailIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                                <Typography variant="body2" noWrap>
                                  {lawyer.email}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <PhoneIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                                <Typography variant="body2">{lawyer.phone}</Typography>
                              </Box>
                            </Box>

                            <Box sx={{ mt: 2 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={selectedLawyers.includes(lawyer.id)}
                                    onChange={() => toggleLawyerSelection(lawyer.id)}
                                    color="primary"
                                  />
                                }
                                label="Select this attorney"
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No attorneys found matching your criteria. Try adjusting your search filters.
                </Typography>
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        {emailSent ? (
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        ) : (
          <>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedLawyers.length === 0 || emailSending}
              onClick={handleSendReport}
              startIcon={emailSending ? <CircularProgress size={20} /> : <SendIcon />}
            >
              {emailSending
                ? "Sending..."
                : `Send Report to ${selectedLawyers.length} Attorney${selectedLawyers.length !== 1 ? "s" : ""}`}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}
