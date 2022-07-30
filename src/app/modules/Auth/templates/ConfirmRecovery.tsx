import { LoadingButton } from '@mui/lab'
import { Box, Button, Paper, TextField } from '@mui/material'
import { Logo } from 'app/components/Logo/Logo'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { EStatus } from 'types'
import * as yup from 'yup'

import { authActions } from '../slice'
import { selectConfirmRecoveryForm } from '../slice/selectors'
import { Auth } from './Auth'

export const ConfirmRecovery: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { status, data: initialValues } = useSelector(selectConfirmRecoveryForm)

    const validationSchema = yup.object({
        email: yup.string().required().email(),
        code: yup.string().required().min(4),
        password: yup.string().required().min(4),
    })

    const formik = useFormik({
        validationSchema,
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(authActions.confirmRecovery(values))
        },
    })

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
                            <Logo size={'big'} />
                        </Box>

                        <TextField
                            fullWidth
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
                            label="Код из email"
                            name="code"
                            value={formik.values.code || ''}
                            error={!!formik.errors.code}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            sx={{ mt: 3 }}
                            variant="outlined"
                            label="Новый пароль"
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
                            Сменить пароль
                        </LoadingButton>

                        <Box mt={1} display={'flex'} justifyContent={'space-between'}>
                            <Button
                                variant="text"
                                onClick={() => history.push('/auth/recovery')}
                                sx={{ textTransform: 'initial' }}
                            >
                                Отправить код еще раз
                            </Button>

                            <Button
                                variant="text"
                                onClick={() => history.push('/auth')}
                                sx={{ textTransform: 'initial' }}
                            >
                                Войти
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Auth>
    )
}
