import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, DialogActions, DialogTitle, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { EStatus } from 'types'
import * as yup from 'yup'

import { authActions } from '../slice'
import { selectSignupForm } from '../slice/selectors'

export const Signup: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [open, setOpen] = useState<boolean>(false)

    const { status, data } = useSelector(selectSignupForm)

    const validationSchema = yup.object({
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
        <>
            <Box
                noValidate
                component="form"
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault()

                    formik.handleSubmit()
                }}
            >
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={formik.values.email || ''}
                            error={!!formik.errors.email}
                            onChange={formik.handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={8} />

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Пароль"
                            name="password"
                            type={'password'}
                            sx={{ mt: 4 }}
                            value={formik.values.password || ''}
                            error={!!formik.errors.password}
                            onChange={formik.handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={8} />

                    <Grid item xs={12} md={4}>
                        <LoadingButton
                            loading={status === EStatus.PENDING}
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                            sx={{ mt: 4 }}
                            onClick={() => formik.handleSubmit()}
                        >
                            Зарегистрироваться
                        </LoadingButton>

                        <Box mt={1}>
                            <Button
                                variant="text"
                                onClick={() => history.push('/auth')}
                                sx={{ textTransform: 'initial' }}
                            >
                                Уже есть аккаунт
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
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
        </>
    )
}
