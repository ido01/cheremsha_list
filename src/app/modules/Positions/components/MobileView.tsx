import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IPosition } from 'types/IPosition'
import { checkSudoAccess } from 'utils/roles'

import { positionsActions } from '../slice'

interface MobileViewProps {
    position: IPosition
}

export const MobileView: React.FC<MobileViewProps> = ({ position }) => {
    const dispatch = useDispatch()

    const profileRole = useSelector(selectProfileRole)

    const handleDeleteOpen = () => {
        dispatch(positionsActions.showDeleteModal(position))
    }

    const handleUpdateOpen = () => {
        dispatch(positionsActions.openEditModal(position))
    }

    return (
        <Box px={2} width={'100%'} display="flex" flexDirection="column" gap={1}>
            <Typography variant="body1" fontWeight={600}>
                {position.label}
            </Typography>

            {checkSudoAccess(profileRole) && (
                <Box width="100%" display="flex" gap={2} justifyContent="space-between">
                    <Button color="info" startIcon={<EditIcon />} onClick={handleUpdateOpen}>
                        Редактировать
                    </Button>
                    <Button color="error" startIcon={<DeleteIcon />} onClick={handleDeleteOpen}>
                        Удалить
                    </Button>
                </Box>
            )}
        </Box>
    )
}
