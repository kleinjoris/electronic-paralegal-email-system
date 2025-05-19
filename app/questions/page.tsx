"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Container,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Radio,
  TextField,
  Typography,
  FormLabel,
  Paper,
} from "@mui/material"
import Grid from "@mui/material/Grid"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Header from "@/components/header"

// Sample questions for first contact criminal case evaluation
const questions = [
  {
    id: "arrest",
    title: "Arrest Information",
    description: "Tell us about the arrest process",
    type: "multiple",
    questions: [
      {
        id: "arrest_warrant",
        question: "Was there an arrest warrant?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unsure", label: "I'm not sure" },
        ],
      },
      {
        id: "miranda_rights",
        question: "Were you read your Miranda rights?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unsure", label: "I'm not sure" },
        ],
      },
    ],
  },
  {
    id: "evidence",
    title: "Evidence Collection",
    description: "Information about evidence in your case",
    type: "multiple",
    questions: [
      {
        id: "search_warrant",
        question: "Was there a search warrant?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unsure", label: "I'm not sure" },
        ],
      },
      {
        id: "consent_to_search",
        question: "Did you consent to any searches?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unsure", label: "I'm not sure" },
        ],
      },
    ],
  },
  {
    id: "interrogation",
    title: "Interrogation Process",
    description: "Tell us about any questioning by law enforcement",
    type: "multiple",
    questions: [
      {
        id: "requested_lawyer",
        question: "Did you request a lawyer at any point?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "questioning_continued",
        question: "If you requested a lawyer, did questioning continue?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not_applicable", label: "Not applicable" },
        ],
      },
    ],
  },
  {
    id: "charges",
    title: "Charges and Court Proceedings",
    description: "Information about your charges and court appearances",
    type: "multiple",
    questions: [
      {
        id: "formal_charges",
        question: "Have you been formally charged?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unsure", label: "I'm not sure" },
        ],
      },
      {
        id: "arraignment",
        question: "Have you had an arraignment or initial appearance?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unsure", label: "I'm not sure" },
        ],
      },
    ],
  },
  {
    id: "additional_info",
    title: "Additional Information",
    description: "Any other details you think might be relevant",
    type: "text",
    question: "Please provide any additional details about your case that you think might be important:",
  },
  {
    id: "contact_info",
    title: "Contact Information",
    description: "Your information for the report and potential attorney contact",
    type: "contact",
    fields: [
      { id: "name", label: "Full Name", type: "text" },
      { id: "email", label: "Email Address", type: "email" },
      { id: "phone", label: "Phone Number", type: "tel" },
      { id: "address", label: "Address", type: "text" },
      { id: "city", label: "City", type: "text" },
      { id: "state", label: "State", type: "text" },
      { id: "zip", label: "ZIP Code", type: "text" },
    ],
  },
]

export default function QuestionsPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = questions[currentStep]
  const progress = (currentStep / (questions.length - 1)) * 100

  // Debug the current state of answers
  useEffect(() => {
    console.log("Current answers:", answers)
  }, [answers])

  const handleRadioChange = (questionId: string, value: string) => {
    console.log(`Radio changed: ${questionId} = ${value}`)
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleContactInfoChange = (fieldId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [fieldId]: value,
      },
    }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // In a real implementation, this would send the data to your API
      const response = await fetch("/api/submit-evaluation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      })

      if (response.ok) {
        // Navigate to results page
        router.push("/results")
      } else {
        console.error("Failed to submit evaluation")
      }
    } catch (error) {
      console.error("Error submitting evaluation:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Custom radio button component with more visible styling
  const CustomRadio = ({ questionId, option }: { questionId: string; option: { value: string; label: string } }) => {
    const isSelected = answers[questionId] === option.value

    return (
      <Paper
        elevation={isSelected ? 3 : 1}
        sx={{
          mb: 1,
          p: 1,
          border: 2,
          borderColor: isSelected ? "primary.main" : "transparent",
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
        onClick={() => handleRadioChange(questionId, option.value)}
      >
        <FormControlLabel
          value={option.value}
          control={
            <Radio
              checked={isSelected}
              onChange={() => {}} // Handled by the Paper onClick
              sx={{
                color: isSelected ? "primary.main" : "action.active",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              }}
            />
          }
          label={option.label}
          sx={{ width: "100%", m: 0 }}
        />
      </Paper>
    )
  }

  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case "multiple":
        return (
          <Box sx={{ mt: 3 }}>
            {currentQuestion.questions?.map((q) => (
              <Box key={q.id} sx={{ mb: 4 }}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend" sx={{ mb: 2, fontSize: "1.1rem", fontWeight: 500 }}>
                    {q.question}
                  </FormLabel>
                  <Box>
                    {q.options.map((option) => (
                      <CustomRadio key={option.value} questionId={q.id} option={option} />
                    ))}
                  </Box>
                </FormControl>
              </Box>
            ))}
          </Box>
        )

      case "text":
        return (
          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <FormLabel component="legend" sx={{ mb: 1, fontSize: "1.1rem", fontWeight: 500 }}>
                {currentQuestion.question}
              </FormLabel>
              <TextField
                multiline
                rows={6}
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => handleTextChange(currentQuestion.id, e.target.value)}
                placeholder="Enter your response here..."
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Box>
        )

      case "contact":
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {currentQuestion.fields?.map((field) => (
                <Grid item xs={12} sm={field.id === "address" ? 12 : 6} key={field.id}>
                  <TextField
                    id={field.id}
                    label={field.label}
                    type={field.type}
                    value={(answers.contact && answers.contact[field.id]) || ""}
                    onChange={(e) => handleContactInfoChange(field.id, e.target.value)}
                    fullWidth
                    variant="outlined"
                    required={field.id === "name" || field.id === "email" || field.id === "phone"}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )

      default:
        return null
    }
  }

  const isLastStep = currentStep === questions.length - 1

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Case Evaluation
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Answer the following questions to evaluate your criminal case for procedural due process issues.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Step {currentStep + 1} of {questions.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}% Complete
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
        </Box>

        <Card>
          <CardHeader title={currentQuestion.title} subheader={currentQuestion.description} />
          <CardContent>{renderQuestionContent()}</CardContent>
          <CardActions sx={{ p: 3, justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              startIcon={<ArrowBackIcon />}
            >
              Previous
            </Button>

            {isLastStep ? (
              <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting} color="primary">
                {isSubmitting ? "Submitting..." : "Submit Evaluation"}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext} color="primary" endIcon={<ArrowForwardIcon />}>
                Next
              </Button>
            )}
          </CardActions>
        </Card>
      </Container>
    </Box>
  )
}
