import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import * as Icons from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IAchieve } from 'types/IAchieve'
import { checkSudoAccess } from 'utils/roles'

import { achieveActions } from '../slice'

interface MobileViewProps {
    achieve: IAchieve
}

export const MobileView: React.FC<MobileViewProps> = ({ achieve }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Icon = Icons[achieve.icon]
    const dispatch = useDispatch()

    const profileRole = useSelector(selectProfileRole)

    const handleDeleteOpen = () => {
        dispatch(achieveActions.showDeleteModal(achieve))
    }

    const handleUpdateOpen = () => {
        dispatch(achieveActions.openEditModal(achieve))
    }

    return (
        <Box px={2} width={'100%'} display="flex" flexDirection="column" gap={1}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        borderRadius: 8,
                        p: achieve.image ? 0 : 1,
                        display: 'flex',
                        color: '#fff',
                        overflow: 'hidden',
                        backgroundColor: achieve.color,
                    }}
                >
                    {achieve.image && <img src={achieve.image.thumb} style={{ width: '44px', height: '44px' }} />}
                    {!achieve.image && Icon && <Icon />}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1" fontWeight={600}>
                        {achieve.label}
                    </Typography>
                    <Typography variant="body3" color="gray.700">
                        {achieve.description}
                    </Typography>
                </Box>
            </Box>

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
