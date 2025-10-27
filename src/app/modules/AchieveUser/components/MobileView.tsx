import { Delete as DeleteIcon } from '@mui/icons-material'
import * as Icons from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IAchieve } from 'types/IAchieve'
import { checkSudoAccess } from 'utils/roles'

import { achieveUserActions } from '../slice'

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
        dispatch(achieveUserActions.showDeleteModal(achieve))
    }

    return (
        <Box width={'100%'} display="flex" justifyContent="space-between" gap={1}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    pr: 1,
                }}
            >
                <Box
                    sx={{
                        borderRadius: 8,
                        p: achieve.image ? 0 : 1,
                        display: 'flex',
                        color: '#fff',
                        backgroundColor: achieve.color,
                        overflow: 'hidden',
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
                        {achieve.user?.description || achieve.description}
                    </Typography>
                </Box>
            </Box>

            {checkSudoAccess(profileRole) && (
                <IconButton color="error" onClick={handleDeleteOpen}>
                    <DeleteIcon />
                </IconButton>
            )}
        </Box>
    )
}
