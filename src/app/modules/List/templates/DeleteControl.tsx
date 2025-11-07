import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { EStatus } from 'types'
import { IReservation, IReservationCloseStatus } from 'types/ITable'

import { listsActions } from '../slice'

export const DeleteControl: React.FC<{ reservation: IReservation }> = ({ reservation }) => {
    const dispatch = useDispatch()

    const handleStatus = (status: IReservationCloseStatus) => {
        const close = {
            hour: reservation.start.hour,
            minute: reservation.start.minute + 30,
        }
        if (close.minute > 60) {
            close.hour += 1
            close.minute -= 60
        }

        if (close.hour >= 24) {
            close.hour -= 24
        }

        dispatch(
            listsActions.updateReservation({
                ...reservation,
                status: 'delete',
                close_status: status,
                close,
            })
        )
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
            }}
        >
            <LoadingButton
                loading={status === EStatus.PENDING}
                fullWidth
                color="error"
                variant="outlined"
                sx={{
                    height: '64px',
                }}
                onClick={() => handleStatus('late')}
            >
                Опоздали
            </LoadingButton>

            <LoadingButton
                loading={status === EStatus.PENDING}
                fullWidth
                color="error"
                variant="outlined"
                sx={{
                    height: '64px',
                }}
                onClick={() => handleStatus('passport')}
            >
                Без документов
            </LoadingButton>

            <LoadingButton
                loading={status === EStatus.PENDING}
                fullWidth
                color="error"
                variant="outlined"
                sx={{
                    height: '64px',
                }}
                onClick={() => handleStatus('close')}
            >
                Отменили
            </LoadingButton>

            <LoadingButton
                loading={status === EStatus.PENDING}
                fullWidth
                color="error"
                variant="outlined"
                sx={{
                    height: '64px',
                }}
                onClick={() => handleStatus('none')}
            >
                Удалить
            </LoadingButton>
        </Box>
    )
}
