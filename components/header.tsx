"use client"

import Link from "next/link"
import { AppBar, Box, Button, Container, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"
import ModeToggle from "./mode-toggle"

export default function Header() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              mr: 4,
              fontWeight: 700,
              color: "text.primary",
              textDecoration: "none",
              display: "flex",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            Electronic Paralegal
          </Typography>

          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Button component={Link} href="/" sx={{ color: "text.secondary", mx: 1 }}>
                Home
              </Button>
              <Button component={Link} href="/questions" sx={{ color: "text.secondary", mx: 1 }}>
                Evaluation
              </Button>
              <Button component={Link} href="/about" sx={{ color: "text.secondary", mx: 1 }}>
                About
              </Button>
              <Button component={Link} href="/contact" sx={{ color: "text.secondary", mx: 1 }}>
                Contact
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ModeToggle />
            <Button component={Link} href="/questions" variant="contained" color="primary" sx={{ ml: 2 }}>
              Start Evaluation
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
