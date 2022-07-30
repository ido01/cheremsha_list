import { LoadingButton } from '@mui/lab'
import { Box, Button, Paper, TextField } from '@mui/material'
import { Logo } from 'app/components/Logo/Logo'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { EStatus } from 'types'
import * as yup from 'yup'

import { authActions } from '../slice'
import { selectRecoveryForm } from '../slice/selectors'
import { Auth } from './Auth'

export const Recovery: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { status, data: initialValues } = useSelector(selectRecoveryForm)

    const validationSchema = yup.object({
        email: yup.string().required().email(),
    })

    const formik = useFormik({
        validationSchema,
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(authActions.recovery(values))
        },
    })

    useEffect(() => {
        if (status === EStatus.FINISHED) {
            history.push('/auth/confirm_recovery')
            dispatch(authActions.recoveryInit())
        }
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

                        <LoadingButton
                            loading={status === EStatus.PENDING}
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={() => formik.handleSubmit()}
                        >
                            Отправить код восстановления
                        </LoadingButton>

                        <Box mt={1} display={'flex'} justifyContent={'space-between'}>
                            <Button
                                variant="text"
                                onClick={() => history.push('/auth')}
                                sx={{ textTransform: 'initial' }}
                            >
                                Вспомнил пароль!
                            </Button>

                            <Button
                                variant="text"
                                onClick={() => history.push('/auth/confirm_recovery')}
                                sx={{ textTransform: 'initial' }}
                            >
                                Уже получил код
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Auth>
    )
}
