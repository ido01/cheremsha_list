import { Logout as LogoutIcon } from '@mui/icons-material'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Step,
    StepButton,
    Stepper,
    Typography,
} from '@mui/material'
import { Logo } from 'app/components/Logo/Logo'
import { authActions } from 'app/modules/Auth/slice'
import { selectAuthStatus } from 'app/modules/Auth/slice/selectors'
import { Auth } from 'app/modules/Auth/templates/Auth'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EAuthStatus } from 'types'

interface EmptyProps {
    children: React.ReactNode
}

export const Empty: React.FC<EmptyProps> = ({ children }) => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState<boolean>(false)

    const steps = ['Регистрация', 'Анкета']

    const authStatus = useSelector(selectAuthStatus)

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
                    px: 8,
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

                <Box sx={{ maxWidth: 560 }}>
                    <Stepper nonLinear activeStep={authStatus === EAuthStatus.NEW ? 1 : 0}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={authStatus === EAuthStatus.NEW && index === 0}>
                                <StepButton color="inherit">
                                    <Typography variant="body1" fontWeight={500}>
                                        {label}
                                    </Typography>
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <Box sx={{ p: 1, mt: 6, flex: '1 0 auto' }}>
                    <Paper
                        sx={{
                            bgcolor: 'white',
                            height: '100%',
                            maxHeight: '100%',
                            width: '100%',
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ overflow: 'auto', p: 4, height: '100%' }}>{children}</Box>
                    </Paper>
                </Box>
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
