"use client"

import { useContext } from "react"
import { IconButton, useTheme } from "@mui/material"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { ColorModeContext } from "@/components/theme-registry"

export default function ModeToggle() {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
