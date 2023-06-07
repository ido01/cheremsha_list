import { Search as SearchIcon } from '@mui/icons-material'
import { Box, TextField } from '@mui/material'
import React from 'react'

export const SearchBlock: React.FC = () => (
    <Box
        display={'flex'}
        flexShrink={0}
        alignItems={'center'}
        px={4}
        height={'90px'}
        sx={{ bgcolor: 'white', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.08)' }}
    >
        <Box display={'flex'} width={'100%'}>
            <TextField
                fullWidth
                placeholder={'Поиск'}
                variant="standard"
                InputProps={{
                    disableUnderline: true,
                    startAdornment: <SearchIcon style={{ color: '#c7c7cc' }} />,
                }}
            />
        </Box>
    </Box>
)
