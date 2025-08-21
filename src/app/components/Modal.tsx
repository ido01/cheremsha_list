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
            anchor={'bottom'}
            PaperProps={{
                sx: {
                    width: { xs: '100%', md: '900px' },
                    height: 'calc(100% - 40px)', //{ xs: 'calc(100% - 40px)', md: '100%' },
                    margin: '0 auto',
                    borderTopLeftRadius: '10px', //{ xs: '10px', md: '0px' },
                    borderTopRightRadius: '10px', //{ xs: '10px', md: '0px' },
                    maxWidth: '100%',
                },
            }}
            onClose={handleClose}
        >
            <Box
                sx={{
                    pt: isMobile ? 1 : 3,
                    pb: isMobile ? 0 : 3,
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
                        <Typography
                            sx={{ fontWeight: 500, textTransform: 'uppercase' }}
                            variant={isMobile ? 'h6' : 'h5'}
                        >
                            {title}
                        </Typography>

                        <IconButton sx={{ mr: -1 }} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Container>

                <Divider sx={{ mt: isMobile ? 1 : 2.75, mb: 1 }} />

                {children}
            </Box>
        </Drawer>
    )
}
