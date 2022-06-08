import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, DialogActions, DialogTitle, Paper, TextField, Typography } from '@mui/material'
import { Logo } from 'app/components/Logo/Logo'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { EStatus } from 'types'
import * as yup from 'yup'

import { authActions } from '../slice'
import { selectSignupForm } from '../slice/selectors'
import { Auth } from './Auth'

export const Signup: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [open, setOpen] = useState<boolean>(false)

    const { status, data } = useSelector(selectSignupForm)

    const validationSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().required(),
    })

    const formik = useFormik({
        validationSchema,
        initialValues: data,
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(authActions.signUp(values))
        },
    })

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (status === EStatus.FINISHED) setOpen(true)
    }, [status])

    return (
        <Auth>
            <Box
                sx={{
                    bgcolor: 'grey.200',
                    display: 'flex',
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Paper
                    sx={{
                        bgcolor: 'white',
                        p: 8.75,
                        width: '480px',
                        overflow: 'auto',
                    }}
                >
                    <Box
                        noValidate
                        component="form"
                        onSubmit={(e: React.FormEvent) => {
                            e.preventDefault()

                            formik.handleSubmit()
                        }}
                    >
                        <Box mb={2} display={'flex'} justifyContent={'center'}>
                            <Logo size="small" />
                        </Box>

                        <Box mb={2} display={'flex'} justifyContent={'center'}>
                            <Typography variant="h5" fontWeight={500}>
                                Заявка на регистрацию
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ФИО"
                            name="name"
                            value={formik.values.name || ''}
                            error={!!formik.errors.name}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            sx={{ mt: 3 }}
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={formik.values.email || ''}
                            error={!!formik.errors.email}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            sx={{ mt: 3 }}
                            variant="outlined"
                            label="Пароль"
                            name="password"
                            type={'password'}
                            value={formik.values.password || ''}
                            error={!!formik.errors.password}
                            onChange={formik.handleChange}
                        />

                        <LoadingButton
                            loading={status === EStatus.PENDING}
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={() => formik.handleSubmit()}
                        >
                            Оставить заявку
                        </LoadingButton>

                        <Box mt={1} display={'flex'} justifyContent={'flex-end'}>
                            <Button variant="text" onClick={() => history.push('/auth')}>
                                Уже есть аккаунт
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>

            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">
                    Заявка на регистрацию отправлена, ждите подтверждения на email
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Понятно
                    </Button>
                </DialogActions>
            </Dialog>
        </Auth>
    )
}
