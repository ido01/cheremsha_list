import { DesktopDatePicker, LoadingButton, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { PhoneField } from 'app/components/PhoneField'
import { selectLocations } from 'app/modules/Locations/selectors'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ERole, EStatus } from 'types'
import * as yup from 'yup'

import { profileActions } from '../slice'
import { selectForm, selectProfileRole } from '../slice/selectors'

interface AccountDataFormProps {
    onEditFinish: () => void
}

export const AccountDataForm: React.FC<AccountDataFormProps> = ({ onEditFinish }) => {
    const dispatch = useDispatch()

    const profileRole = useSelector(selectProfileRole)
    const { data, status } = useSelector(selectForm)
    const locations = useSelector(selectLocations)

    const places = useMemo(() => {
        return locations.map((location) => ({ label: location.name, value: location.id }))
    }, [locations])

    const positions =
        profileRole === ERole.ADMIN
            ? [
                  {
                      label: 'Продавец',
                      value: 'seller',
                  },
                  {
                      label: 'Кальянщик',
                      value: 'hookah',
                  },
                  {
                      label: 'Управляющий',
                      value: 'manager',
                  },
                  {
                      label: 'Сотрудник офиса',
                      value: 'office',
                  },
                  {
                      label: 'Сотрудник склада',
                      value: 'sklad',
                  },
                  {
                      label: 'Менеджер и Управляющий',
                      value: 'managerControl',
                  },
                  {
                      label: 'Бухгалтер',
                      value: 'accountant',
                  },
                  {
                      label: 'Кладовщик',
                      value: 'storekeeper',
                  },
                  {
                      label: 'Техник',
                      value: 'technician',
                  },
                  {
                      label: 'Оптовый менеджер',
                      value: 'opt',
                  },
                  {
                      label: 'Владелец',
                      value: 'owner',
                  },
                  {
                      label: 'Создатель',
                      value: 'creator',
                  },
              ]
            : [
                  {
                      label: 'Продавец',
                      value: 'seller',
                  },
                  {
                      label: 'Кальянщик',
                      value: 'hookah',
                  },
                  {
                      label: 'Сотрудник офиса',
                      value: 'office',
                  },
                  {
                      label: 'Сотрудник склада',
                      value: 'sklad',
                  },
                  {
                      label: 'Менеджер и Управляющий',
                      value: 'managerControl',
                  },
                  {
                      label: 'Бухгалтер',
                      value: 'accountant',
                  },
                  {
                      label: 'Кладовщик',
                      value: 'storekeeper',
                  },
                  {
                      label: 'Техник',
                      value: 'technician',
                  },
                  {
                      label: 'Оптовый менеджер',
                      value: 'opt',
                  },
              ]

    const validationSchema = yup.object({
        email: yup.string().email('Не корректный Email').required(),
        name: yup.string().required(),
        last_name: yup.string().required(),
        address: yup.string().required(),
        university: yup.string().required(),
        birthday: yup.string().required(),
        hobby: yup.string().required(),
        about: yup.string().required(),
        place_id: yup.string().required(),
        first_date: yup.string().required(),
        position: yup.string().required(),
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
            dispatch(
                profileActions.updateProfile({
                    ...values,
                    birthday: moment(values.birthday).format('yyyy-MM-DD'),
                    first_date: moment(values.first_date).format('yyyy-MM-DD'),
                })
            )
        },
    })

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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Дата рождения"
                            inputFormat="dd.MM.yyyy"
                            mask="__.__.____"
                            value={formik.values.birthday}
                            onChange={(val) => {
                                formik.setFieldValue('birthday', val)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    {...params}
                                    error={!!formik.errors.birthday && formik.touched.birthday}
                                />
                            )}
                        />
                    </LocalizationProvider>
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
                        error={!!formik.errors?.position && formik.touched.position}
                    >
                        <InputLabel>Должность</InputLabel>
                        <Select
                            value={formik.values.position || ''}
                            label="Должность"
                            onChange={(e) => {
                                const { value } = e.target

                                formik.setFieldValue('position', value)
                            }}
                        >
                            {positions.map((position, index) => (
                                <MenuItem key={index} value={position.value}>
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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Первый день работы"
                            inputFormat="dd.MM.yyyy"
                            mask="__.__.____"
                            value={formik.values.first_date}
                            onChange={(val) => {
                                formik.setFieldValue('first_date', val)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    {...params}
                                    error={!!formik.errors.first_date && formik.touched.first_date}
                                />
                            )}
                        />
                    </LocalizationProvider>
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
