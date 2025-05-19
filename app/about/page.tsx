import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material"
import GavelIcon from "@mui/icons-material/Gavel"
import DescriptionIcon from "@mui/icons-material/Description"
import PeopleIcon from "@mui/icons-material/People"
import SecurityIcon from "@mui/icons-material/Security"
import BalanceIcon from "@mui/icons-material/Balance"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
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
              About Electronic Paralegal
            </Typography>
            <Typography variant="h5" sx={{ maxWidth: 800, mb: 4, opacity: 0.9 }}>
              Our mission is to help individuals identify potential procedural due process issues in their criminal
              cases and connect them with qualified legal representation.
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                Electronic Paralegal was founded by a team of legal professionals and technologists who recognized a
                critical gap in the criminal justice system: many individuals are unaware of potential procedural
                violations in their cases that could significantly impact their legal outcomes.
              </Typography>
              <Typography variant="body1" paragraph>
                Our system was developed to democratize access to preliminary legal analysis, helping people understand
                their rights and identify potential issues before they become insurmountable problems.
              </Typography>
              <Typography variant="body1">
                By combining legal expertise with technology, we've created a tool that can help bridge the justice gap
                and connect individuals with attorneys who can address their specific legal needs.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 4, height: "100%" }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 500 }}>
                  Key Facts
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <GavelIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Expert-Developed Evaluation System"
                      secondary="Our questionnaire was developed by criminal defense attorneys with decades of experience"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DescriptionIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Comprehensive Reports"
                      secondary="Detailed analysis of potential procedural issues in your case"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PeopleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Attorney Network"
                      secondary="Connect with qualified attorneys in your area who specialize in your type of case"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Privacy-Focused"
                      secondary="Your information is secure and only shared with attorneys you approve"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 8 }} />

          <Box id="analysis" sx={{ mb: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Procedural Analysis
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                  Our system evaluates your criminal case against established procedural due process standards to
                  identify potential issues. We focus on key areas where procedural violations commonly occur:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <BalanceIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Arrest procedures and Miranda rights" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BalanceIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Search and seizure practices" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BalanceIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Interrogation methods" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BalanceIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Right to counsel" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BalanceIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Charging and arraignment timing" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      How Our Analysis Works
                    </Typography>
                    <Typography variant="body2" paragraph>
                      1. You complete our detailed questionnaire about your case
                    </Typography>
                    <Typography variant="body2" paragraph>
                      2. Our system analyzes your responses against legal standards and precedents
                    </Typography>
                    <Typography variant="body2" paragraph>
                      3. We identify potential procedural issues that may affect your case
                    </Typography>
                    <Typography variant="body2" paragraph>
                      4. You receive a comprehensive report with our findings
                    </Typography>
                    <Typography variant="body2">
                      5. If you choose, we connect you with qualified attorneys who can help address these issues
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Box id="reports" sx={{ mb: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Detailed Reports
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      What's Included in Your Report
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <DescriptionIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Case summary and evaluation score" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DescriptionIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Detailed analysis of potential procedural issues" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DescriptionIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Severity assessment of each issue" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DescriptionIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Explanation of legal implications" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DescriptionIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Recommended next steps" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                  Our reports provide a comprehensive evaluation of your case, highlighting potential procedural issues
                  that may have occurred during your arrest, interrogation, or charging process.
                </Typography>
                <Typography variant="body1" paragraph>
                  Each report is generated based on your specific case details and provides actionable insights that can
                  help you and your attorney build a stronger defense.
                </Typography>
                <Typography variant="body1">
                  While our reports are not legal advice, they serve as a valuable starting point for discussions with
                  qualified attorneys who can provide personalized legal counsel based on our findings.
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box id="connections" sx={{ mb: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Legal Connections
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                  If you choose, we can share your case report with qualified attorneys in your area who specialize in
                  handling cases with similar procedural issues.
                </Typography>
                <Typography variant="body1" paragraph>
                  Our attorney network includes experienced criminal defense lawyers, public defenders, and legal aid
                  organizations who are committed to protecting your rights.
                </Typography>
                <Typography variant="body1">
                  You maintain complete control over who receives your information, and there is never any obligation to
                  hire any attorney who contacts you.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Attorney Connection Process
                    </Typography>
                    <Typography variant="body2" paragraph>
                      1. You review your case report and decide if you want to connect with attorneys
                    </Typography>
                    <Typography variant="body2" paragraph>
                      2. You select your preferences for attorney location, type, and specialization
                    </Typography>
                    <Typography variant="body2" paragraph>
                      3. We send your report to attorneys who match your criteria
                    </Typography>
                    <Typography variant="body2" paragraph>
                      4. Interested attorneys contact you directly to discuss your case
                    </Typography>
                    <Typography variant="body2">5. You choose which attorney, if any, you want to work with</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
