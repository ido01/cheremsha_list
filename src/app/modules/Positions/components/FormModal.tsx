import { LoadingButton } from '@mui/lab'
import { Box, Container, TextField } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import * as yup from 'yup'

import { positionsActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const FormModal: React.FC = () => {
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)

    const validationSchema = yup.object({
        label: yup.string().required(),
    })

    const formik = useFormik({
        validationSchema,
        initialValues: data,
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (values.id) {
                dispatch(
                    positionsActions.updatePosition({
                        ...values,
                    })
                )
            } else {
                dispatch(
                    positionsActions.createPosition({
                        ...values,
                    })
                )
            }
        },
    })

    const handleClose = () => {
        dispatch(positionsActions.hideEditModal())
    }

    return (
        <Modal
            open={open}
            title={data.id ? 'Редактирование Должности' : 'Создание Должности'}
            handleClose={handleClose}
        >
            <Box
                noValidate
                component="form"
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault()

                    formik.handleSubmit()
                }}
                py={11}
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    maxHeight: 'calc( 100% )',
                }}
            >
                <Container>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Название"
                        name="label"
                        value={formik.values.label || ''}
                        error={!!formik.errors.label}
                        onChange={formik.handleChange}
                    />
                </Container>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    bottom: 0,
                    py: 2,
                    bgcolor: 'white',
                    zIndex: 1,
                }}
            >
                <Container>
                    <LoadingButton
                        loading={status === EStatus.PENDING}
                        fullWidth
                        variant="contained"
                        onClick={() => formik.handleSubmit()}
                    >
                        Сохранить
                    </LoadingButton>
                </Container>
            </Box>
        </Modal>
    )
}
