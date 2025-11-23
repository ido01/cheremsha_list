import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { EStatus } from 'types'
import { IReservation } from 'types/ITable'

import { listsActions } from '../../slice'

export const AddTimeControl: React.FC<{ reservation: IReservation }> = ({ reservation }) => {
    const dispatch = useDispatch()

    const handleEnd = (minute: number) => {
        const end = {
            hour: reservation.end.hour,
            minute: reservation.end.minute,
        }
        end.minute += minute

        while (end.minute > 60) {
            end.hour += 1
            end.minute -= 60
        }

        if (end.hour >= 24) {
            end.hour -= 24
        }

        dispatch(
            listsActions.updateReservation({
                ...reservation,
                start: reservation.main_start,
                end,
            })
        )
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: '1fr 1fr 1fr',
            }}
        >
            <LoadingButton
                loading={status === EStatus.PENDING}
                fullWidth
                color="success"
                variant="outlined"
                sx={{
                    height: '64px',
                }}
                onClick={() => handleEnd(30)}
            >
                +30 Минут
            </LoadingButton>

            <LoadingButton
                loading={status === EStatus.PENDING}
                fullWidth
                color="success"
                variant="outlined"
                sx={{
                    height: '64px',
                }}
                onClick={() => handleEnd(60)}
            >
                +1 Час
            </LoadingButton>

            <LoadingButton
                loading={status === EStatus.PENDING}
                fullWidth
                color="success"
                variant="outlined"
                sx={{
                    height: '64px',
                }}
                onClick={() => handleEnd(120)}
            >
                +2 Часа
            </LoadingButton>
        </Box>
    )
}
