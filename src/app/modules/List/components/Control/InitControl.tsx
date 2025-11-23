import { Delete as DeleteIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { EStatus } from 'types'
import { IReservation, IReservationStatus } from 'types/ITable'

import { DeleteControl } from './DeleteControl'
import { EditButton } from './EditButton'
import { ResetButton } from './ResetButton'

interface Props {
    reservation: IReservation
    status: EStatus
    handleStatus: (status: IReservationStatus) => void
}

export const InitControl: React.FC<Props> = ({ reservation, status, handleStatus }) => {
    const [isDelete, setDelete] = useState(false)

    useEffect(() => {
        setDelete(false)
    }, [reservation])

    return (
        <>
            {!isDelete && (
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
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

                    <LoadingButton
                        loading={status === EStatus.PENDING}
                        color="error"
                        variant="contained"
                        sx={{
                            height: '64px',
                        }}
                        onClick={() => setDelete(true)}
                    >
                        <DeleteIcon />
                    </LoadingButton>

                    <EditButton reservation={reservation} status={status} />

                    <ResetButton reservation={reservation} status={status} />
                </Box>
            )}

            {isDelete && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <DeleteControl reservation={reservation} />

                    <LoadingButton
                        loading={status === EStatus.PENDING}
                        fullWidth
                        color="warning"
                        variant="contained"
                        sx={{
                            height: '64px',
                        }}
                        onClick={() => setDelete(false)}
                    >
                        Назад
                    </LoadingButton>
                </Box>
            )}
        </>
    )
}
