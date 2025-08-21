import { LoadingButton } from '@mui/lab'
import { Box, Container, TextField } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import * as yup from 'yup'

import { tablesActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const FormModal: React.FC = () => {
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)

    const validationSchema = yup.object({
        name: yup.string().required(),
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
                    tablesActions.updateTable({
                        ...values,
                    })
                )
            } else {
                dispatch(
                    tablesActions.createTable({
                        ...values,
                    })
                )
            }
        },
    })

    const handleClose = () => {
        dispatch(tablesActions.hideEditModal())
    }

    return (
        <Modal open={open} title={data.id ? 'Редактирование Стола' : 'Создание Стола'} handleClose={handleClose}>
            <Box
                mt={1}
                pt={1}
                noValidate
                component="form"
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault()

                    formik.handleSubmit()
                }}
                sx={(theme) => ({
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    borderBottom: 1,
                    maxHeight: 'calc( 100% - 117px )',
                    borderColor: theme.palette.grey[300],
                })}
            >
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Полное Название"
                            name="full_name"
                            value={formik.values.full_name || ''}
                            error={!!formik.errors.full_name}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Название"
                            name="name"
                            value={formik.values.name || ''}
                            error={!!formik.errors.name}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Короткое Название"
                            name="short_name"
                            value={formik.values.short_name || ''}
                            error={!!formik.errors.short_name}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Количество Мест"
                            name="places"
                            value={formik.values.places || ''}
                            error={!!formik.errors.places}
                            onChange={formik.handleChange}
                        />
                    </Box>
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
