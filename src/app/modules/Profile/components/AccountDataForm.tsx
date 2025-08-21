import 'date-fns/locale/ru'

import { LoadingButton } from '@mui/lab'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PhoneField } from 'app/components/PhoneField'
import { selectLocations } from 'app/modules/Locations/slice/selectors'
import { selectPositions } from 'app/modules/Positions/slice/selectors'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import * as yup from 'yup'

import { profileActions } from '../slice'
import { selectForm } from '../slice/selectors'
import { DocForm } from './DocForm'

interface AccountDataFormProps {
    onEditFinish: () => void
}

export const AccountDataForm: React.FC<AccountDataFormProps> = ({ onEditFinish }) => {
    const dispatch = useDispatch()

    const { data, status } = useSelector(selectForm)
    const locations = useSelector(selectLocations)
    const positions = useSelector(selectPositions)

    const places = useMemo(() => {
        return locations.map((location) => ({ label: location.name, value: location.id }))
    }, [locations])

    const validationSchema = yup.object({
        email: yup.string().email('Не корректный Email').required(),
        name: yup.string().required(),
        last_name: yup.string().required(),
        address: yup.string().required(),
        university: yup.string().required(),
        birthday: yup.string().required(),
        hobby: yup.string(),
        about: yup.string(),
        place_id: yup.string(),
        first_date: yup.string().required(),
        phone: yup.string().required(),
    })

    const formik = useFormik({
        validationSchema,
        initialValues: data,
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: (values) => {
            onEditFinish()
            dispatch(profileActions.updateProfile(values))
        },
    })

    const handleBlur = () => {
        if (!formik.values.active) {
            dispatch(profileActions.draftProfile(formik.values))
        }
    }

    useEffect(() => {
        dispatch(profileActions.setProfile(formik.values))
    }, [formik.values])

    return (
        <Box
            noValidate
            component="form"
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault()

                formik.handleSubmit()
            }}
        >
            <Box mb={4}>
                <Typography variant="h5" fontWeight={500}>
                    Личные данные
                </Typography>
            </Box>

            <Grid container rowSpacing={4} columnSpacing={2}>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Фамилия"
                        name="last_name"
                        value={formik.values.last_name || ''}
                        error={!!formik.errors.last_name && formik.touched.last_name}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Имя"
                        name="name"
                        value={formik.values.name || ''}
                        error={!!formik.errors.name && formik.touched.name}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <PhoneField
                        fullWidth
                        variant="outlined"
                        label="Номер телефона"
                        name="phone"
                        value={formik.values.phone || ''}
                        error={!!formik.errors.phone && formik.touched.phone}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={formik.values.email || ''}
                        error={!!formik.errors.email}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined" error={!!formik.errors?.gender}>
                        <InputLabel>Пол</InputLabel>
                        <Select
                            value={formik.values.gender || ''}
                            label="Пол"
                            onChange={(e) => {
                                const { value } = e.target

                                formik.setFieldValue('gender', value)
                                handleBlur()
                            }}
                        >
                            {[
                                {
                                    label: 'Прекрасная девушка',
                                    value: 'female',
                                },
                                {
                                    label: 'Прекрасный мужчина',
                                    value: 'male',
                                },
                            ].map((gender, index) => (
                                <MenuItem key={index} value={gender.value}>
                                    {gender.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <DatePicker
                        label="Дата рождения"
                        value={dayjs(formik.values.birthday)}
                        onChange={(val) => {
                            if (val) {
                                formik.setFieldValue('birthday', val?.format('YYYY-MM-DD'))
                            }
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Хобби"
                        name="hobby"
                        value={formik.values.hobby || ''}
                        error={!!formik.errors.hobby && formik.touched.hobby}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Адрес проживания"
                        name="address"
                        value={formik.values.address || ''}
                        error={!!formik.errors.address && formik.touched.address}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Место учебы"
                        name="university"
                        value={formik.values.university || ''}
                        error={!!formik.errors.university && formik.touched.university}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        variant="outlined"
                        label="О себе"
                        name="about"
                        value={formik.values.about || ''}
                        error={!!formik.errors.about && formik.touched.about}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                    />
                </Grid>
            </Grid>

            <Box mt={4} mb={4}>
                <Typography variant="h5" fontWeight={500}>
                    Рабочие данные
                </Typography>
            </Box>

            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} md={4}>
                    <FormControl
                        fullWidth
                        variant="outlined"
                        error={!!formik.errors?.position_id && formik.touched.position_id}
                    >
                        <InputLabel>Должность</InputLabel>
                        <Select
                            value={formik.values.position_id || ''}
                            label="Должность"
                            onChange={(e) => {
                                const { value } = e.target

                                formik.setFieldValue('position_id', value)
                                handleBlur()
                            }}
                        >
                            {positions.map((position, index) => (
                                <MenuItem key={index} value={position.id}>
                                    {position.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormControl
                        fullWidth
                        variant="outlined"
                        error={!!formik.errors?.place_id && formik.touched.place_id}
                    >
                        <InputLabel>Место работы</InputLabel>
                        <Select
                            value={formik.values.place_id || ''}
                            label="Место работы"
                            onChange={(e) => {
                                const { value } = e.target

                                formik.setFieldValue('place_id', value)
                                handleBlur()
                            }}
                        >
                            {places.map((place, index) => (
                                <MenuItem key={index} value={place.value}>
                                    {place.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <DatePicker
                        label="Первый день работы"
                        value={dayjs(formik.values.first_date)}
                        onChange={(val) => {
                            if (val) {
                                formik.setFieldValue('first_date', val?.format('YYYY-MM-DD'))
                            }
                        }}
                    />
                </Grid>
            </Grid>

            <Grid mt={4} container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} md={4}>
                    <DocForm profile={formik.values} />
                </Grid>
            </Grid>

            <Box mt={6.25} display={'flex'} justifyContent={'flex-start'}>
                <LoadingButton
                    loading={status === EStatus.PENDING}
                    color="success"
                    variant="contained"
                    onClick={() => formik.handleSubmit()}
                >
                    Сохранить
                </LoadingButton>
            </Box>
        </Box>
    )
}
