import { Home as HomeIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

import { selectCount } from '../../slice/selectors'

export const ControlBlock: React.FC = () => {
    const count = useSelector(selectCount)

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
        </Box>
    )
}
