import { AccessTime as AccessTimeIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { EStatus } from 'types'
import { IReservation, IReservationStatus } from 'types/ITable'

import { AddButton } from '../Buttons/AddButton'
import { AddTimeControl } from './AddTimeControl'
import { EditButton } from './EditButton'
import { ResetButton } from './ResetButton'

interface Props {
    reservation: IReservation
    status: EStatus
    handleStatus: (status: IReservationStatus) => void
}

export const ActiveControl: React.FC<Props> = ({ reservation, status, handleStatus }) => {
    const [isTimeEdit, setTimeEdit] = useState(false)

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

    useEffect(() => {
        setTimeEdit(false)
    }, [reservation])

    return (
        <>
            {!isTimeEdit && (
                <>
                    <Box
                        sx={{
                            display: 'grid',
                            gap: 1,
                            gridTemplateColumns: '1fr 1fr 1fr',
                        }}
                    >
                        <AddButton disabled={hasHookah} color="success" label="+ Экспресс" position="express" />
                        <AddButton disabled={hasExpress} color="info" label="+ Авторский" position="author" />
                        <AddButton disabled={hasExpress} color="primary" label="+ Два сразу" position="double" />
                    </Box>

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
                            color="success"
                            variant="contained"
                            sx={{
                                height: '64px',
                            }}
                            onClick={() => setTimeEdit(true)}
                        >
                            <AccessTimeIcon />
                        </LoadingButton>

                        <EditButton reservation={reservation} status={status} />

                        <ResetButton reservation={reservation} status={status} />
                    </Box>
                </>
            )}
            {isTimeEdit && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <AddTimeControl reservation={reservation} />

                    <LoadingButton
                        loading={status === EStatus.PENDING}
                        fullWidth
                        color="warning"
                        variant="contained"
                        sx={{
                            height: '64px',
                        }}
                        onClick={() => setTimeEdit(false)}
                    >
                        Назад
                    </LoadingButton>
                </Box>
            )}
        </>
    )
}
