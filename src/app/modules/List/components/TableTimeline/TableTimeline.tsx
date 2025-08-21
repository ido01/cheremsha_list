import { Box } from '@mui/material'
import React, { useMemo } from 'react'
import { IReservationMapping, ITable, ITime } from 'types/ITable'

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
}> = ({ table, heightItem, width, timeLines, count, currentTime }) => {
    const minWidth = width / 30
    const countItems = count * 2

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

    const reservations: IReservationMapping[] = useMemo(() => {
        const now = new Date()
        const currentMinute = now.getMinutes()
        const currentHour = now.getHours()
        return table.reservations
            .map((reservation) => {
                let status = reservation.status
                let crossDelay = 0
                const end = {
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
                }
            })
            .map((reservation, index, rs) => {
                let crossDelay = reservation.crossDelay || 0
                let startCrossMinutes = 0
                let endCrossMinutes = 0
                let cross = 0
                let stepsLeft = 0

                const rSmin = curretnTime(reservation.start)
                const rEmin = curretnTime(reservation.end)
                if (index > 0) {
                    const bEmin = curretnTime(rs[index - 1].end)
                    startCrossMinutes = bEmin - rSmin
                    if (startCrossMinutes < 0) {
                        startCrossMinutes = 0
                    }

                    for (let i = 1; i <= index; i++) {
                        const cEmin = curretnTime(rs[index - i].end)
                        const cSmin = curretnTime(rs[index - i].start)
                        if (cEmin - rSmin > 0) {
                            cross += rs[index - i].guests

                            if (rSmin - cSmin < 60) {
                                stepsLeft++
                            }
                        }
                    }
                }
                if (index < table.reservations.length - 1) {
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
                    cross,
                    stepsLeft,
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
                />
            ))}

            {reservations.map((reservation, index) => (
                <ReservationItem
                    key={`reservation_${index}`}
                    currentTime={currentTime}
                    reservation={reservation}
                    minWidth={minWidth}
                    heightItem={heightItem}
                    places={table.places}
                    free={table.free}
                />
            ))}
        </Box>
    )
}
