import Link from "next/link"
import { Box, Container, Divider, Grid, Typography } from "@mui/material"

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.dark",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Electronic Paralegal
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              A tool for evaluating criminal cases and connecting individuals with legal representation.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ p: 0, listStyle: "none" }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/" style={{ color: "inherit", opacity: 0.8, textDecoration: "none" }}>
                  Home
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/questions" style={{ color: "inherit", opacity: 0.8, textDecoration: "none" }}>
                  Start Evaluation
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/about" style={{ color: "inherit", opacity: 0.8, textDecoration: "none" }}>
                  About
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/contact" style={{ color: "inherit", opacity: 0.8, textDecoration: "none" }}>
                  Contact
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ p: 0, listStyle: "none" }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/terms" style={{ color: "inherit", opacity: 0.8, textDecoration: "none" }}>
                  Terms of Service
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/privacy" style={{ color: "inherit", opacity: 0.8, textDecoration: "none" }}>
                  Privacy Policy
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/disclaimer" style={{ color: "inherit", opacity: 0.8, textDecoration: "none" }}>
                  Legal Disclaimer
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} Electronic Paralegal. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}
