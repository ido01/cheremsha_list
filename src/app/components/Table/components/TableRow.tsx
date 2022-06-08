import { Box } from '@mui/material'
import React from 'react'

interface TableRowProps {
    children: React.ReactNode
}

export const TableRow: React.FC<TableRowProps> = ({ children }) => (
    <Box display={'flex'} alignItems={'center'} height={'100%'} position={'relative'}>
        {children}
    </Box>
)
