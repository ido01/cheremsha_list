import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Auth } from 'app/modules/Auth/templates/Auth'
import React from 'react'

interface QuizProps {
    children: React.ReactNode
}

export const Game: React.FC<QuizProps> = ({ children }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    return (
        <Auth>
            <Box
                sx={{
                    bgcolor: 'grey.200',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    minHeight: '100vh',
                    px: isMobile ? 1 : 8,
                    py: 4,
                    alignItems: 'center',
                }}
            >
                {children}
            </Box>
        </Auth>
    )
}
