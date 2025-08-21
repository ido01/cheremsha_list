import { Box } from '@mui/material'
import React from 'react'
import { ITable } from 'types/ITable'

import { TableListItem } from './components/TableListItem'

export const TablesList: React.FC<{ data: ITable[]; height: number }> = ({ data, height }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '92px',
                left: 0,
                width: '50px',
                background: 'linear-gradient(to right, #fff 25%, transparent)',
                zIndex: 6,
            }}
        >
            {data.map((table, index) => (
                <TableListItem key={`TablesList_${index}`} table={table} height={height} />
            ))}
        </Box>
    )
}
