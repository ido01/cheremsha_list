import { Close as CloseIcon } from '@mui/icons-material'
import { Box, Container, Divider, Drawer, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

interface ModalProps {
    children: React.ReactNode
    open: boolean
    title: string | React.ReactNode
    handleClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ children, open, title, handleClose }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    return (
        <Drawer
            open={open}
            anchor={isMobile ? 'bottom' : 'right'}
            PaperProps={{
                sx: {
                    width: '100%',
                    height: { xs: 'calc(100% - 40px)', md: '100%' },
                    borderTopLeftRadius: { xs: '10px', md: '0px' },
                    borderTopRightRadius: { xs: '10px', md: '0px' },
                    maxWidth: { xs: '100%', md: '50%' },
                },
            }}
            onClose={handleClose}
        >
            <Box
                sx={{
                    py: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    userSelect: 'none',
                }}
            >
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography sx={{ fontWeight: 500, textTransform: 'uppercase' }} variant="h5">
                            {title}
                        </Typography>

                        <IconButton sx={{ mr: -1 }} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Container>

                <Divider sx={{ mt: 2.75 }} />

                {children}
            </Box>
        </Drawer>
    )
}
