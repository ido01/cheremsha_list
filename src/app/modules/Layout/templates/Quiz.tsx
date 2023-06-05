import { Logout as LogoutIcon } from '@mui/icons-material'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { Logo } from 'app/components/Logo/Logo'
import { authActions } from 'app/modules/Auth/slice'
import { Auth } from 'app/modules/Auth/templates/Auth'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

interface QuizProps {
    children: React.ReactNode
}

export const Quiz: React.FC<QuizProps> = ({ children }) => {
    const dispatch = useDispatch()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const [open, setOpen] = useState<boolean>(false)

    const handleClose = () => {
        setOpen(false)
    }

    const logout = () => {
        setOpen(false)
        dispatch(authActions.logout())
    }

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
                }}
            >
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Logo />

                    <Button
                        variant="text"
                        startIcon={<LogoutIcon />}
                        onClick={() => setOpen(true)}
                        sx={{ textTransform: 'uppercase' }}
                    >
                        {'Выйти'}
                    </Button>
                </Box>

                {children}
            </Box>

            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>Вы уверены, что хотите выйти?</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={logout} color="error">
                        Выйти
                    </Button>
                </DialogActions>
            </Dialog>
        </Auth>
    )
}
