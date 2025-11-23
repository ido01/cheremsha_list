import { Box, Container, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IReservationStatus } from 'types/ITable'

import { ActiveControl } from '../components/Control/ActiveControl'
import { CloseControl } from '../components/Control/CloseControl'
import { InitControl } from '../components/Control/InitControl'
import { Reservation } from '../components/Reservation'
import { CloseStatusText, Colors, StatusText } from '../constants'
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
                start: reservation.main_start,
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
                    start: reservation.main_start,
                }),
                end: {
                    hour: reservation.end_hour,
                    minute: reservation.end_minute,
                },
            })
        )
    }

    return (
        <Modal open={open} title={`${reservation.name}(${table?.name}) ${reservation.phone}`} handleClose={handleClose}>
            <Box
                pt={11}
                pb={30}
                sx={{
                    overflow: 'auto',
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
                                    {StatusText[reservationStatus]}{' '}
                                    {reservationStatus === 'delete' &&
                                        reservation.close_status &&
                                        reservation.close_status !== 'none' &&
                                        `(${CloseStatusText[reservation.close_status]})`}
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
                                    {reservationStatus === 'init'
                                        ? 'Придут'
                                        : reservationStatus === 'delete' || reservationStatus === 'late'
                                        ? 'Должны были придти'
                                        : 'Пришли'}
                                </Typography>
                                <Typography variant="h6" color="grey.900" lineHeight="1.4">
                                    {convertTimeToText(reservation.main_start)}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="caption" color="grey.600">
                                    {reservationStatus === 'close'
                                        ? 'Ушли'
                                        : reservationStatus === 'delete' || reservationStatus === 'delay'
                                        ? 'Должны были уйти'
                                        : 'Уйдут'}
                                </Typography>
                                <Typography variant="h6" color="grey.900" lineHeight="1.4">
                                    {reservationStatus === 'delete' || reservationStatus === 'delay'
                                        ? convertTimeToText({
                                              hour: reservation.end_hour,
                                              minute: reservation.end_minute,
                                          })
                                        : reservationStatus === 'close'
                                        ? convertTimeToText(reservation.close)
                                        : convertTimeToText(reservation.end)}
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
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        {(reservationStatus === 'active' || reservationStatus === 'delay') && (
                            <ActiveControl reservation={reservation} status={status} handleStatus={handleStatus} />
                        )}
                        {(reservationStatus === 'init' || reservationStatus === 'late') && (
                            <InitControl reservation={reservation} status={status} handleStatus={handleStatus} />
                        )}

                        {reservationStatus === 'close' && (
                            <CloseControl reservation={reservation} status={status} handleStatus={handleStatus} />
                        )}
                    </Box>
                </Container>
            </Box>
        </Modal>
    )
}
