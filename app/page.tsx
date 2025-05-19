"use client"

import Link from "next/link"
import Image from "next/image"
import { Box, Button, Card, CardContent, CardActions, Container, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  const theme = useTheme()
  const gradient = `linear-gradient(to bottom, ${theme.palette.primary.light}, ${theme.palette.primary.main})`

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            py: 8,
            background: "linear-gradient(to bottom, #a6c5e1, #7d760691)",
            color: "white",
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                Evaluate Your Criminal Case
              </Typography>
              <Typography variant="h5" sx={{ maxWidth: 800, mx: "auto", mb: 4, opacity: 0.9 }}>
                Our system analyzes procedural due process in criminal cases to identify potential issues and connect
                you with qualified legal representation.
              </Typography>

              {/* Advertisement Image */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: "200px", sm: "300px", md: "400px" },
                  maxWidth: "900px",
                  mx: "auto",
                  mb: 4,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              >
                <Image
                  src="/placeholder.jpg?height=800&width=1200"
                  alt="Electronic Paralegal System"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>

              <Button
                component={Link}
                href="/questions"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": { bgcolor: "grey.100" },
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Start Your Evaluation
              </Button>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
              Our system helps you identify potential procedural issues in your criminal case and connects you with
              qualified attorneys who can help.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Procedural Analysis
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Evaluate your case against legal standards
                  </Typography>
                  <Typography variant="body1">
                    Our system evaluates your criminal case against established procedural due process standards to
                    identify potential issues.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} href="/about#analysis" size="small" sx={{ color: "text.secondary" }}>
                    Learn more →
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Detailed Reports
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Get a comprehensive case evaluation
                  </Typography>
                  <Typography variant="body1">
                    Receive a detailed report outlining potential procedural issues in your case that may be grounds for
                    legal action.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} href="/about#reports" size="small" sx={{ color: "text.secondary" }}>
                    Learn more →
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Legal Connections
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Connect with qualified attorneys
                  </Typography>
                  <Typography variant="body1">
                    If you choose, we can share your case report with qualified attorneys in your area who may be able
                    to assist you.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} href="/about#connections" size="small" sx={{ color: "text.secondary" }}>
                    Learn more →
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 8, textAlign: "center" }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to evaluate your case?
            </Typography>
            <Button component={Link} href="/questions" variant="contained" size="large" sx={{ mt: 2, px: 4, py: 1.5 }}>
              Start Free Evaluation
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
