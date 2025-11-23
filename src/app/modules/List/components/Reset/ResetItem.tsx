import { Box, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IReservation, ITable } from 'types/ITable'

import { listsActions } from '../../slice'
import { curretnTime } from '../../utils'

type TableStatus = 'empty' | 'reverse' | 'close'

type IColorTableStatus = { [key in TableStatus]: string }

const Colors: IColorTableStatus = {
    empty: '#8BC34A',
    close: '#E53935',
    reverse: '#E53935',
}

export const ResetItem: React.FC<{ table: ITable; reservation: IReservation }> = ({ table, reservation }) => {
    const dispatch = useDispatch()

    const now = new Date()
    const currentMinute = now.getMinutes()
    const currentHour = now.getHours()

    const startTime = curretnTime({
        hour: currentHour,
        minute: currentMinute,
    })
    const endTime = curretnTime(reservation.end)
    const [rid, setRid] = useState('')

    const status: TableStatus = useMemo(() => {
        setRid('')
        let status: TableStatus = 'empty'
        table.reservations.forEach((res) => {
            const aStartTime = curretnTime(res.start)
            const aEndTime = curretnTime(res.end)
            const general1 = aEndTime - startTime
            const general2 = endTime - aStartTime
            if (general1 > 0 && general2 > 0) {
                if (general1 > 45 && general2 > 45) {
                    setRid(res.id)
                    status = 'reverse'
                } else if (status !== 'reverse') {
                    status = 'close'
                }
            }
        })
        return status
    }, [reservation, table])

    const statusText = useMemo(() => {
        if (status === 'empty') {
            return 'Свободен'
        } else if (status === 'reverse') {
            return 'Может быть занят'
        } else {
            return 'Может быть занят'
        }
    }, [status])

    const handleClick = () => {
        const now = new Date()
        const currentMinute = now.getMinutes()
        const currentHour = now.getHours()

        const currentTime = {
            hour: currentHour,
            minute: currentMinute,
        }
        dispatch(
            listsActions.resetReservation({
                id: reservation.id,
                old_tid: reservation.tid,
                tid: table.id,
                replace_id: rid,
                currentTime,
            })
        )

        dispatch(listsActions.hideReset())
    }

    return (
        <Box
            sx={{
                display: 'flex',
                p: 1,
                flexDirection: 'column',
                borderRadius: 2,
                border: `1px solid ${Colors[status]}`,
                backgroundColor: `${Colors[status]}10`,
                cursor: 'pointer',
                ':hover': {
                    backgroundColor: `${Colors[status]}25`,
                },
            }}
            onClick={handleClick}
        >
            <Typography variant="body1" fontWeight={600}>{`${table.full_name} (${table.short_name})`}</Typography>
            <Typography variant="body1">{statusText}</Typography>
        </Box>
    )
}
