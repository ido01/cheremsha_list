import { Box, Typography } from '@mui/material'
import React from 'react'
import { ITable } from 'types/ITable'

export const TableListItem: React.FC<{ table: ITable; height: number }> = ({ table, height }) => {
    return (
        <Box
            sx={{
                height: `${height}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: `32px`,
                position: 'relative',
                zIndex: 1,
            }}
        >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {table.name}
            </Typography>
        </Box>
    )
}
