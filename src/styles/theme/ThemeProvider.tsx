import { CssBaseline, ThemeProvider as OriginalThemeProvider } from '@mui/material'
import React from 'react'

import { customTheme } from './themes'

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => (
    <OriginalThemeProvider theme={customTheme}>
        <CssBaseline />

        {React.Children.only(children)}
    </OriginalThemeProvider>
)
