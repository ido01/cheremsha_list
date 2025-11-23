import { Autorenew as AutorenewIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import { useDispatch } from 'react-redux'
import { EStatus } from 'types'
import { IReservation } from 'types/ITable'

import { listsActions } from '../../slice'

interface Props {
    reservation: IReservation
    status: EStatus
}

export const ResetButton: React.FC<Props> = ({ reservation, status }) => {
    const dispatch = useDispatch()

    const handleReset = () => {
        dispatch(listsActions.openReset(reservation))
    }

    return (
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
    )
}
