import { Box, Typography } from '@mui/material'
import React from 'react'

export const MainPage: React.FC = () => (
    <Box height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
            <Typography variant="h1" color="primary" sx={{ fontSize: '15rem' }}>
                404
            </Typography>

            <Typography variant="h5">Упс, а страница то не найдена</Typography>
        </Box>
    </Box>
)
