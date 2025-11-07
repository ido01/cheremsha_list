import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

export const ModalLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'absolute',
                flexDirection: 'column',
                width: '100%',
                height: 'calc( 100% - 88px )',
                top: '88px',
                left: 0,
                backgroundColor: '#fff',
                overflow: 'hidden',
            }}
        >
            {children}
        </Box>
    )
}
