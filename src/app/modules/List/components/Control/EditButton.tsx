import { Edit as EditIcon } from '@mui/icons-material'
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

export const EditButton: React.FC<Props> = ({ reservation, status }) => {
    const dispatch = useDispatch()

    const handleEdit = () => {
        dispatch(listsActions.showEditModal({ ...reservation, start: reservation.main_start }))
    }

    return (
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
    )
}
