import { Autorenew as AutorenewIcon, Edit as EditIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Container, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IReservationStatus } from 'types/ITable'

import { AddButton } from '../components/Buttons/AddButton'
import { Reservation } from '../components/Reservation'
import { Colors, StatusText } from '../constants'
import { listsActions } from '../slice'
import { selectModal, selectTableById } from '../slice/selectors'
import { convertTimeToText } from '../utils'

export const ReservationModal: React.FC<{ currentTime: number }> = ({ currentTime }) => {
    const dispatch = useDispatch()

    const { status, open, reservation } = useSelector(selectModal)
    const getTable = useSelector(selectTableById)
    const table = getTable(reservation.tid)

    const startTimeHour = reservation.start.hour > 10 ? reservation.start.hour : reservation.start.hour + 24
    const endTimeHour = reservation.end.hour > 10 ? reservation.end.hour : reservation.end.hour + 24
    const startTime = startTimeHour * 60 + reservation.start.minute
    const endTime = endTimeHour * 60 + reservation.end.minute

    const reservationStatus = useMemo(() => {
        if (reservation.status === 'init' && currentTime > startTime) {
            return 'late' as IReservationStatus
        } else if (reservation.status === 'active' && currentTime > endTime) {
            return 'delay' as IReservationStatus
        }
        return reservation.status
    }, [reservation])

    const hasExpress = useMemo(() => {
        return reservation.items.findIndex((i) => i.position === 'express') !== -1
    }, [reservation])

    const hasHookah = useMemo(() => {
        return (
            reservation.items.findIndex(
                (i) => i.position === 'author' || i.position === 'double' || i.position === 'hookah'
            ) !== -1
        )
    }, [reservation])

    const currentTableTimestamp = useMemo(() => {
        if (reservationStatus !== 'active' && reservationStatus !== 'delay') {
            return -1
        }
        return currentTime - startTime
    }, [currentTime, reservationStatus])

    const currentTableTime = useMemo(() => {
        const hour = Math.floor(currentTableTimestamp / 60)
        const minute = currentTableTimestamp % 60
        return convertTimeToText({
            hour,
            minute,
        })
    }, [currentTableTimestamp])

    const handleClose = () => {
        dispatch(listsActions.hideModal())
    }

    const handleStatus = (status: IReservationStatus) => {
        const now = new Date()
        const minute = now.getMinutes()
        const hour = now.getHours()
        dispatch(
            listsActions.updateReservation({
                ...reservation,
                status,
                ...(status === 'active' &&
                    reservation.status !== 'close' && {
                        start: {
                            hour,
                            minute,
                        },
                    }),
                ...(status === 'close' && {
                    close: {
                        hour,
                        minute,
                    },
                }),
            })
        )
    }

    const handleEdit = () => {
        dispatch(listsActions.showEditModal(reservation))
    }

    const handleReset = () => {
        dispatch(listsActions.openReset(reservation))
    }

    return (
        <Modal open={open} title={`${reservation.name}(${table?.name}) ${reservation.phone}`} handleClose={handleClose}>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gap: 1,
                            gridTemplateColumns: '1fr 1fr',
                        }}
                    >
                        <Box>
                            <Typography variant="caption" color="grey.600">
                                Стол
                            </Typography>
                            <Typography variant="h6" color="grey.900" lineHeight="1.4">
                                {table?.full_name}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="grey.600">
                                Статус
                            </Typography>
                            <Typography variant="h6" color={Colors[reservationStatus]} lineHeight="1.4">
                                {StatusText[reservationStatus]}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gap: 1,
                            gridTemplateColumns: '1fr 1fr',
                        }}
                    >
                        <Box>
                            <Typography variant="caption" color="grey.600">
                                Пришли
                            </Typography>
                            <Typography variant="h6" color="grey.900" lineHeight="1.4">
                                {convertTimeToText(reservation.start)}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="grey.600">
                                Ушли
                            </Typography>
                            <Typography variant="h6" color="grey.900" lineHeight="1.4">
                                {convertTimeToText(reservation.end)}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gap: 1,
                            gridTemplateColumns: '1fr 1fr',
                        }}
                    >
                        <Box>
                            <Typography variant="caption" color="grey.600">
                                Гостей
                            </Typography>
                            <Typography variant="h6" color="grey.900" lineHeight="1.4">
                                {reservation.guests}
                            </Typography>
                        </Box>

                        {currentTableTimestamp >= 0 && (
                            <Box>
                                <Typography variant="caption" color="grey.600">
                                    Уже сидят
                                </Typography>
                                <Typography variant="h6" color="grey.900" lineHeight="1.4">
                                    {currentTableTime}
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {reservation.comment && (
                        <Box>
                            <Typography variant="caption" color="grey.600">
                                Комментарий
                            </Typography>
                            <Typography variant="h6" color="grey.900" lineHeight="1.4">
                                {reservation.comment}
                            </Typography>
                        </Box>
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Typography variant="caption" color="grey.600">
                            Что за столом
                        </Typography>

                        {reservation.items.map((item, index) => (
                            <Reservation key={index} item={item} currentTime={currentTime} />
                        ))}
                    </Box>
                </Box>
            </Container>

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
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        {(reservationStatus === 'active' || reservationStatus === 'delay') && (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gap: 1,
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                }}
                            >
                                <AddButton disabled={hasHookah} color="success" label="+ Экспресс" position="express" />
                                <AddButton disabled={hasExpress} color="info" label="+ Авторский" position="author" />
                                <AddButton
                                    disabled={hasExpress}
                                    color="primary"
                                    label="+ Два сразу"
                                    position="double"
                                />
                            </Box>
                        )}
                        {(reservationStatus === 'active' || reservationStatus === 'delay') && (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gap: 1,
                                    gridTemplateColumns: '1fr 1fr',
                                }}
                            >
                                <AddButton disabled={hasExpress} color="success" label="+ Кальян" position="hookah" />
                                <AddButton color="info" label="+ Церемония" position="tea" />
                            </Box>
                        )}
                        {(reservationStatus === 'init' || reservationStatus === 'late') && (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gap: 1,
                                    gridTemplateColumns: '1fr 1fr',
                                }}
                            >
                                <LoadingButton
                                    loading={status === EStatus.PENDING}
                                    fullWidth
                                    color="success"
                                    variant="contained"
                                    sx={{
                                        height: '64px',
                                    }}
                                    onClick={() => handleStatus('active')}
                                >
                                    Стол пришел
                                </LoadingButton>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 1,
                                    }}
                                >
                                    <LoadingButton
                                        loading={status === EStatus.PENDING}
                                        fullWidth
                                        color="error"
                                        variant="contained"
                                        sx={{
                                            height: '64px',
                                        }}
                                        onClick={() => handleStatus('delete')}
                                    >
                                        Удалить бронь
                                    </LoadingButton>

                                    <LoadingButton
                                        loading={status === EStatus.PENDING}
                                        color="primary"
                                        variant="contained"
                                        sx={{
                                            height: '64px',
                                        }}
                                        onClick={handleEdit}
                                    >
                                        <EditIcon />
                                    </LoadingButton>

                                    <LoadingButton
                                        loading={status === EStatus.PENDING}
                                        color="info"
                                        variant="contained"
                                        sx={{
                                            height: '64px',
                                        }}
                                        onClick={handleReset}
                                    >
                                        <AutorenewIcon />
                                    </LoadingButton>
                                </Box>
                            </Box>
                        )}

                        {(reservation.status === 'active' || reservation.status === 'delay') && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                <LoadingButton
                                    loading={status === EStatus.PENDING}
                                    fullWidth
                                    color="error"
                                    variant="contained"
                                    sx={{
                                        height: '64px',
                                    }}
                                    onClick={() => handleStatus('close')}
                                >
                                    Закрыть бронь
                                </LoadingButton>

                                <LoadingButton
                                    loading={status === EStatus.PENDING}
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        height: '64px',
                                    }}
                                    onClick={handleEdit}
                                >
                                    <EditIcon />
                                </LoadingButton>

                                <LoadingButton
                                    loading={status === EStatus.PENDING}
                                    color="info"
                                    variant="contained"
                                    sx={{
                                        height: '64px',
                                    }}
                                    onClick={handleReset}
                                >
                                    <AutorenewIcon />
                                </LoadingButton>
                            </Box>
                        )}

                        {reservation.status === 'close' && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                <LoadingButton
                                    loading={status === EStatus.PENDING}
                                    fullWidth
                                    color="error"
                                    variant="contained"
                                    sx={{
                                        height: '64px',
                                    }}
                                    onClick={() => handleStatus('active')}
                                >
                                    Ой, открыть
                                </LoadingButton>

                                <LoadingButton
                                    loading={status === EStatus.PENDING}
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        height: '64px',
                                    }}
                                    onClick={handleEdit}
                                >
                                    <EditIcon />
                                </LoadingButton>
                            </Box>
                        )}
                    </Box>
                </Container>
            </Box>
        </Modal>
    )
}
