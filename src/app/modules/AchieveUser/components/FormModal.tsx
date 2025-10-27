import * as Icons from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { selectAchieve } from 'app/modules/Achieve/slice/selectors'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import * as yup from 'yup'

import { achieveUserActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const FormModal: React.FC = () => {
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)

    const achieves = useSelector(selectAchieve)

    const validationSchema = yup.object({
        aid: yup.string().required(),
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
                    achieveUserActions.updateAchieve({
                        ...values,
                    })
                )
            } else {
                dispatch(
                    achieveUserActions.createAchieve({
                        ...values,
                    })
                )
            }
        },
    })

    const handleClose = () => {
        dispatch(achieveUserActions.hideEditModal())
    }

    return (
        <Modal open={open} title={'Назначить награду'} handleClose={handleClose}>
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
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <FormControl fullWidth variant="outlined" error={!!formik.errors?.aid}>
                            <InputLabel>Награда</InputLabel>

                            <Select
                                value={formik.values.aid || ''}
                                label="Награда"
                                onChange={(e) => {
                                    const { value } = e.target

                                    formik.setFieldValue('aid', value)
                                }}
                            >
                                {achieves.map((achieve, index) => {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    const Icon = Icons[achieve.icon]
                                    return (
                                        <MenuItem key={index} value={achieve.id}>
                                            <Box
                                                sx={{
                                                    borderRadius: 8,
                                                    p: achieve.image ? 0 : 1,
                                                    overflow: 'hidden',
                                                    mr: 1,
                                                    display: 'inline-flex',
                                                    color: '#fff',
                                                    backgroundColor: achieve.color,
                                                }}
                                            >
                                                {achieve.image && (
                                                    <img
                                                        src={achieve.image.thumb}
                                                        style={{ width: '44px', height: '44px' }}
                                                    />
                                                )}
                                                {!achieve.image && Icon && <Icon />}
                                            </Box>
                                            {achieve.label}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            variant="outlined"
                            label="Описание"
                            name="description"
                            value={formik.values.description || ''}
                            error={!!formik.errors.description && formik.touched.description}
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
