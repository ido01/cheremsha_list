import { Box, Button, Typography } from '@mui/material'
import React from 'react'

import { IFilter } from '../../types'
import { convertTimeToText } from '../../utils'

export const TinyFilter: React.FC<{ filter: IFilter; onChange: () => void }> = ({ filter, onChange }) => {
    return (
        <Box
            sx={{
                py: 1,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant="body1">Фильтр:</Typography>
            <Box
                sx={{
                    py: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant="body1">{filter.date.format('DD.MM')}</Typography>
                    <Typography variant="body1">с {convertTimeToText(filter)}</Typography>
                    <Typography variant="body1">на {filter.guests} человек</Typography>
                </Box>

                <Button color="warning" onClick={onChange}>
                    Изменить
                </Button>
            </Box>
        </Box>
    )
}
