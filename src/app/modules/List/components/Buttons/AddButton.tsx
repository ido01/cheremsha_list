import { LoadingButton } from '@mui/lab'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IReservationItemStatus } from 'types/ITable'

import { listsActions } from '../../slice'
import { selectItemStatus, selectModal } from '../../slice/selectors'

export const AddButton: React.FC<{
    color: 'success' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'warning'
    position: IReservationItemStatus
    label: string
    disabled?: boolean
}> = ({ color, position, label, disabled }) => {
    const dispatch = useDispatch()
    const itemStatus = useSelector(selectItemStatus)
    const { reservation } = useSelector(selectModal)

    const handleAddItem = (status: IReservationItemStatus) => {
        const now = new Date()
        const minute = now.getMinutes()
        const hour = now.getHours()
        dispatch(
            listsActions.createItem({
                id: '',
                tid: reservation.tid,
                rid: reservation.id,
                position: status,
                time: {
                    hour,
                    minute,
                },
            })
        )
    }

    return (
        <LoadingButton
            loading={itemStatus === position}
            disabled={disabled}
            fullWidth
            color={color}
            variant="outlined"
            sx={{
                height: '64px',
            }}
            onClick={() => handleAddItem(position)}
        >
            {label}
        </LoadingButton>
    )
}
