import { Home as HomeIcon, MoreVert as MoreVertIcon, Search as SearchIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listsActions } from '../../slice'
import { selectCount } from '../../slice/selectors'

export const ControlBlock: React.FC = () => {
    const dispatch = useDispatch()
    const count = useSelector(selectCount)

    const handleOpenFind = () => {
        dispatch(listsActions.openFind())
    }

    const handleSettingOpen = () => {
        dispatch(listsActions.openSettings())
    }

    return (
        <Box
            sx={{
                display: 'flex',
                p: 1,
                justifyContent: 'space-between',
            }}
        >
            <IconButton color="info" href="/">
                <HomeIcon />
            </IconButton>

            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                }}
            >
                <Box>
                    <Typography variant="caption">Всего:</Typography>
                    <Typography variant="body3">{count.hookah}</Typography>
                </Box>

                <Box>
                    <Typography variant="caption">Експресс:</Typography>
                    <Typography variant="body3">{count.express}</Typography>
                </Box>

                <Box>
                    <Typography variant="caption">Авторских:</Typography>
                    <Typography variant="body3">{count.author}</Typography>
                </Box>

                <Box>
                    <Typography variant="caption">Чайных:</Typography>
                    <Typography variant="body3">{count.tea}</Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                }}
            >
                <IconButton onClick={handleOpenFind}>
                    <SearchIcon />
                </IconButton>
                <IconButton aria-label="more" id="long-button" aria-haspopup="true" onClick={handleSettingOpen}>
                    <MoreVertIcon />
                </IconButton>
            </Box>
        </Box>
    )
}
