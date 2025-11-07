import { Box } from '@mui/material'
import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IReservationMapping, ITable, ITime } from 'types/ITable'

import { listsActions } from '../../slice'
import { selectDate } from '../../slice/selectors'
import { curretnTime } from '../../utils'
import { AddReservation } from './components/AddReservation'
import { ReservationItem } from './components/ReservationItem'

export const TableTimeline: React.FC<{
    count: number
    heightItem: number
    width: number
    table: ITable
    timeLines: number[]
    currentTime: number
    isChairVisible?: boolean
    chair?: number
}> = ({ table, heightItem, width, timeLines, count, currentTime, isChairVisible = false, chair = 1 }) => {
    const dispatch = useDispatch()

    const minWidth = width / 30
    const countItems = count * 2
    const date = useSelector(selectDate)
    const dateArr = date.split('-')
    const dateInt = 10000 * parseInt(dateArr[0]) + 100 * parseInt(dateArr[1]) + parseInt(dateArr[2])
    const curDate = dayjs().subtract(6, 'hour').format('YYYY-MM-DD')
    const curDateArr = curDate.split('-')
    const curDateInt = 10000 * parseInt(curDateArr[0]) + 100 * parseInt(curDateArr[1]) + parseInt(curDateArr[2])

    const times: { left: number; time: ITime }[] = []

    for (let index = 0; index < countItems; index++) {
        const hour = (12 + Math.floor(index / 2)) % 24
        const minute = index % 2 ? 30 : 0
        times.push({
            left: width * (index + 1),
            time: {
                hour,
                minute,
            },
        })
    }

    const handleFreeOpen = () => {
        dispatch(listsActions.showFree(table.id))
    }

    const reservations: IReservationMapping[] = useMemo(() => {
        const now = new Date()
        const currentMinute = now.getMinutes()
        const currentHour = now.getHours()
        const reservationsFiltered = table.reservations
        return reservationsFiltered
            .map((reservation) => {
                let status = reservation.status
                let crossDelay = 0

                const end =
                    status === 'close' || status === 'delete'
                        ? {
                              hour: reservation.close.hour,
                              minute: reservation.close.minute,
                          }
                        : {
                              hour: reservation.end.hour,
                              minute: reservation.end.minute,
                          }
                const tEmin = curretnTime(reservation.end)
                const cEmin = curretnTime({
                    hour: currentHour,
                    minute: currentMinute,
                })
                if (reservation.status === 'active' && tEmin < cEmin) {
                    end.hour = currentHour
                    end.minute = currentMinute
                    status = 'delay'
                    crossDelay = cEmin - tEmin
                }
                return {
                    ...reservation,
                    end,
                    status,
                    crossDelay,
                    endDB: reservation.end,
                }
            })
            .map((reservation, index, rs) => {
                let crossDelay = reservation.crossDelay || 0
                let startCrossMinutes = 0
                let endCrossMinutes = 0

                const rSmin = curretnTime(reservation.start)
                const rEmin = curretnTime(reservation.end)
                if (index > 0) {
                    const bEmin = curretnTime(rs[index - 1].end)
                    startCrossMinutes = bEmin - rSmin
                    if (startCrossMinutes < 0) {
                        startCrossMinutes = 0
                    }
                }
                if (index < reservationsFiltered.length - 1) {
                    const nSmin = curretnTime(rs[index + 1].start)
                    endCrossMinutes = rEmin - nSmin
                    if (endCrossMinutes < 0) {
                        endCrossMinutes = 0
                    } else {
                        crossDelay -= endCrossMinutes
                    }
                    if (crossDelay < 0) {
                        crossDelay = 0
                    }
                }

                return {
                    ...reservation,
                    crossDelay,
                    startCrossMinutes,
                    endCrossMinutes,
                } as IReservationMapping
            })
    }, [table, currentTime])

    return (
        <Box
            sx={{
                borderBottom: '1px solid #eee',
                width: '100%',
                height: `${heightItem}px`,
                p: 1,
                px: `${width}px`,
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    width: `${width}px`,
                    position: 'absolute',
                    height: `${heightItem}px`,
                    top: 0,
                    left: `${0}px`,
                    backgroundColor: '#f9f9f9',
                }}
            ></Box>
            {timeLines.length > 0 && (
                <Box
                    sx={{
                        width: `${width}px`,
                        position: 'absolute',
                        height: `${heightItem}px`,
                        top: 0,
                        left: `${timeLines[timeLines.length - 1]}px`,
                        backgroundColor: '#f9f9f9',
                    }}
                ></Box>
            )}
            {timeLines.map((left, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '1px',
                        position: 'absolute',
                        height: `${heightItem}px`,
                        top: 0,
                        left: `${left}px`,
                        backgroundColor: '#ddd',
                    }}
                ></Box>
            ))}

            {times.map((time, index) => (
                <AddReservation
                    key={index}
                    left={time.left}
                    width={width}
                    heightItem={heightItem}
                    time={time.time}
                    table={table}
                    currentTime={currentTime}
                    dateInt={dateInt}
                    curDateInt={curDateInt}
                    curDate={curDate}
                    date={date}
                    chair={chair}
                />
            ))}

            {table.free && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 4,
                        left: `${width + 4}px`,
                        width: `calc( 100% - ${width * 2 + 8}px )`,
                        height: `${heightItem - 8}px`,
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        cursor: 'pointer',
                        ':hover': {
                            border: '1px solid #bbb',
                        },
                    }}
                    onClick={handleFreeOpen}
                ></Box>
            )}

            {reservations.map((reservation, index) => (
                <ReservationItem
                    key={`reservation_${index}`}
                    currentTime={currentTime}
                    reservation={reservation}
                    minWidth={minWidth}
                    heightItem={heightItem}
                    places={table.places}
                    free={table.free}
                    isChairVisible={isChairVisible}
                />
            ))}
        </Box>
    )
}
