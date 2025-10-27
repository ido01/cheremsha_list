import { LoadingButton } from '@mui/lab'
import { Box, Container, TextField, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { PhoneField } from 'app/components/PhoneField'
import { useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IReservationStatus, ISelect, ITable, ITableItemResponse, ITime } from 'types/ITable'
import { request } from 'utils/request'
import * as yup from 'yup'

import { RadioButton } from '../components/RadioButton'
import { Reserv } from '../constants'
import { listsActions } from '../slice'
import { selectForm } from '../slice/selectors'

const minTime = 12 * 60
const maxTime = 28 * 60

interface IReservMap {
    time: ISelect
    disabled?: boolean
    badge?: string
    isReserved: boolean
    calcTime?: ITime
}

export const ListModalForm: React.FC = () => {
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)

    const [table, setTable] = useState<ITable>()

    const fetchTables = (date: string) => {
        request(`tables/${data.tid}?date=${date}`).then((response: ITableItemResponse) => {
            setTable(response.data)
        })
    }

    useEffect(() => {
        if (open && data.tid) {
            fetchTables(data.date)
        }
    }, [open, data])

    const startTimes: IReservMap[] = [
        {
            isReserved: false,
            time: {
                value: {
                    hour: data.start.hour,
                    minute: data.start.minute,
                },
                label: '',
            },
        },
        {
            isReserved: false,
            time: {
                value: {
                    hour: data.start.hour,
                    minute: data.start.minute,
                },
                label: '',
            },
        },
        {
            isReserved: false,
            time: {
                value: {
                    hour: data.start.hour,
                    minute: data.start.minute,
                },
                label: '',
            },
        },
    ]

    startTimes[0].time.value.minute -= 15
    startTimes[2].time.value.minute += 15

    if (startTimes[0].time.value.minute < 0) {
        startTimes[0].time.value.minute += 60
        startTimes[0].time.value.hour -= 1
        if (startTimes[0].time.value.hour < 0) {
            startTimes[0].time.value.hour += 24
        }
    }

    if (startTimes[2].time.value.minute >= 60) {
        startTimes[2].time.value.minute -= 60
        startTimes[2].time.value.hour += 1
        if (startTimes[0].time.value.hour >= 24) {
            startTimes[0].time.value.hour -= 24
        }
    }

    const displayStartTimes = useMemo(() => {
        return startTimes.map((start) => {
            let hour = start.time.value.hour
            const minute = start.time.value.minute
            const label = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`

            hour = hour > 10 ? hour : hour + 24
            const res = hour * 60 + minute

            const findIndex = table?.reservations.findIndex((reservation) => {
                if (reservation.id === data.id) return false
                const rStartHour = reservation.start.hour > 10 ? reservation.start.hour : reservation.start.hour + 24
                const rStartMinute = reservation.start.minute
                const rEndHour = reservation.end.hour > 10 ? reservation.end.hour : reservation.end.hour + 24
                const rEndMinute = reservation.end.minute
                const ress = rStartHour * 60 + rStartMinute
                const rese = rEndHour * 60 + rEndMinute
                return res >= ress && res < rese
            })

            const disabled = res < minTime || res > maxTime

            const isReserved = findIndex !== -1
            return {
                isReserved,
                disabled,
                time: {
                    label,
                    value: start.time.value,
                },
            }
        })
    }, [startTimes, table])

    const validationSchema = yup.object({
        name: yup.string(),
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
                    listsActions.updateReservation({
                        ...values,
                    })
                )
            } else {
                dispatch(
                    listsActions.createReservation({
                        ...values,
                    })
                )
            }
        },
    })

    const filterReserv: IReservMap[] = useMemo(() => {
        return Reserv.map((res) => {
            let hour = formik.values.start.hour + res.value.hour
            let minute = formik.values.start.minute + res.value.minute
            if (minute >= 60) {
                hour += 1
                minute -= 60
            }
            if (hour >= 24) {
                hour -= 24
            }
            const reh = hour > 10 ? hour : hour + 24
            const rem = minute
            const rsh = formik.values.start.hour > 10 ? formik.values.start.hour : formik.values.start.hour + 24
            const rsm = formik.values.start.minute
            const rese = reh * 60 + rem
            const ress = rsh * 60 + rsm
            const badge = `(${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute})`
            const findIndex = table?.reservations.findIndex((reservation) => {
                if (reservation.id === data.id) return false
                const rStartHour = reservation.start.hour > 10 ? reservation.start.hour : reservation.start.hour + 24
                const rStartMinute = reservation.start.minute
                const res = rStartHour * 60 + rStartMinute
                return res >= ress && res < rese
            })

            const disabled = rese < minTime || rese > maxTime
            const isReserved = findIndex !== -1
            return {
                isReserved,
                disabled,
                time: res,
                badge,
                calcTime: {
                    hour,
                    minute,
                },
            }
        })
    }, [table, formik])

    const handleClose = () => {
        dispatch(listsActions.hideEditModal())
    }

    const handleSubmitStatus = (status: IReservationStatus) => {
        formik.setFieldValue('status', status)
        formik.handleSubmit()
    }

    const handleSubmitCheck = () => {
        if (data.status === 'delay') {
            formik.setFieldValue('status', 'active')
        }
        formik.handleSubmit()
    }

    return (
        <Modal
            open={open}
            title={data.id ? 'Редактирование Должности' : `Добавить бронь за ${table?.name} стол`}
            handleClose={handleClose}
        >
            <Box
                mt={1}
                py={11}
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
                            gap: '8px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            <Typography variant="body2">Забронировать стол с:</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <TextField
                                    variant="filled"
                                    size="small"
                                    name="start.hour"
                                    sx={{
                                        width: '48px',
                                    }}
                                    value={formik.values.start.hour || '00'}
                                    error={!!formik.errors.start?.hour}
                                    onChange={(e) => {
                                        formik.setFieldValue('start.hour', parseInt(e.target.value) || 0)
                                    }}
                                />
                                <Typography variant="body2">:</Typography>
                                <TextField
                                    variant="filled"
                                    size="small"
                                    name="start.minute"
                                    sx={{
                                        width: '48px',
                                    }}
                                    value={formik.values.start.minute || '00'}
                                    error={!!formik.errors.start?.minute}
                                    onChange={(e) => {
                                        formik.setFieldValue('start.minute', parseInt(e.target.value) || 0)
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                {displayStartTimes.map((time, index) => {
                                    return (
                                        <RadioButton
                                            key={index}
                                            active={
                                                formik.values.start.hour === time.time.value.hour &&
                                                formik.values.start.minute === time.time.value.minute
                                            }
                                            isReserved={time.isReserved}
                                            disabled={time.disabled}
                                            label={time.time.label}
                                            onClick={() => {
                                                const h = formik.values.end.hour - formik.values.start.hour
                                                const m = formik.values.end.minute - formik.values.start.minute

                                                formik.setFieldValue('start', {
                                                    hour: time.time.value.hour,
                                                    minute: time.time.value.minute,
                                                })

                                                let hour = time.time.value.hour + h
                                                let minute = time.time.value.minute + m
                                                if (minute >= 60) {
                                                    hour += 1
                                                    minute -= 60
                                                }
                                                if (hour >= 24) {
                                                    hour -= 24
                                                } else if (hour < 0) {
                                                    hour += 24
                                                }
                                                formik.setFieldValue('end', {
                                                    hour: hour,
                                                    minute: minute,
                                                })
                                            }}
                                        />
                                    )
                                })}
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            <Typography variant="body2">Бронь на:</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <TextField
                                    variant="filled"
                                    size="small"
                                    name="end.hour"
                                    sx={{
                                        width: '48px',
                                    }}
                                    value={formik.values.end.hour || '00'}
                                    error={!!formik.errors.end?.hour}
                                    onChange={(e) => {
                                        formik.setFieldValue('end.hour', parseInt(e.target.value) || 0)
                                    }}
                                />
                                <Typography variant="body2">:</Typography>
                                <TextField
                                    variant="filled"
                                    size="small"
                                    name="end.minute"
                                    sx={{
                                        width: '48px',
                                    }}
                                    value={formik.values.end.minute || '00'}
                                    error={!!formik.errors.end?.minute}
                                    onChange={(e) => {
                                        formik.setFieldValue('end.minute', parseInt(e.target.value) || 0)
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gap: 1,
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                }}
                            >
                                {filterReserv.map((res, index) => {
                                    return (
                                        <RadioButton
                                            key={index}
                                            active={
                                                res.calcTime?.hour === formik.values.end.hour &&
                                                res.calcTime?.minute === formik.values.end.minute
                                            }
                                            label={res.time.label}
                                            isReserved={res.isReserved}
                                            disabled={res.disabled}
                                            badge={res.badge}
                                            onClick={() => {
                                                let hour = formik.values.start.hour + res.time.value.hour
                                                let minute = formik.values.start.minute + res.time.value.minute
                                                if (minute >= 60) {
                                                    hour += 1
                                                    minute -= 60
                                                }
                                                if (hour >= 24) {
                                                    hour -= 24
                                                }
                                                formik.setFieldValue('end', {
                                                    hour: hour,
                                                    minute: minute,
                                                })
                                            }}
                                        />
                                    )
                                })}
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <Typography variant="body2">Имя гостя:</Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Б/Б"
                                    name="name"
                                    value={formik.values.name || ''}
                                    error={!!formik.errors.name}
                                    onChange={formik.handleChange}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <Typography variant="body2">Количество гостей:</Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="guests"
                                    value={formik.values.guests || ''}
                                    error={!!formik.errors.guests}
                                    onChange={formik.handleChange}
                                />
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="body2">Телефон:</Typography>
                            <PhoneField
                                fullWidth
                                variant="outlined"
                                label="Номер телефона"
                                name="phone"
                                value={formik.values.phone || ''}
                                error={!!formik.errors.phone && formik.touched.phone}
                                onChange={formik.handleChange}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2">Комментарий:</Typography>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                variant="outlined"
                                label="Комментарий"
                                name="comment"
                                value={formik.values.comment || ''}
                                error={!!formik.errors.comment && formik.touched.comment}
                                onChange={formik.handleChange}
                            />
                        </Box>
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
                    {!data.id && data.status === 'active' && (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            <LoadingButton
                                loading={status === EStatus.PENDING}
                                color="success"
                                fullWidth
                                variant="contained"
                                sx={{
                                    height: '64px',
                                }}
                                onClick={() => formik.handleSubmit()}
                            >
                                Посадить сразу
                            </LoadingButton>

                            <LoadingButton
                                loading={status === EStatus.PENDING}
                                color="info"
                                fullWidth
                                variant="contained"
                                sx={{
                                    height: '64px',
                                }}
                                onClick={() => handleSubmitStatus('init')}
                            >
                                Забронировать
                            </LoadingButton>
                        </Box>
                    )}
                    {!data.id && data.status === 'init' && (
                        <LoadingButton
                            loading={status === EStatus.PENDING}
                            color="info"
                            fullWidth
                            variant="contained"
                            sx={{
                                height: '64px',
                            }}
                            onClick={() => formik.handleSubmit()}
                        >
                            Забронировать
                        </LoadingButton>
                    )}
                    {data.id && (
                        <LoadingButton
                            loading={status === EStatus.PENDING}
                            color="info"
                            fullWidth
                            variant="contained"
                            sx={{
                                height: '64px',
                            }}
                            onClick={() => handleSubmitCheck()}
                        >
                            Cохранить
                        </LoadingButton>
                    )}
                </Container>
            </Box>
        </Modal>
    )
}
