import { Box } from '@mui/material'
import LogoIcon from 'assets/logo.png'
import React from 'react'

interface LogoProps {
    size?: 'small' | 'big'
}

export const Logo: React.FC<LogoProps> = ({ size }) => {
    return (
        <Box
            pb={2}
            pr={size === 'big' ? 0 : 1}
            sx={{ width: size === 'big' ? '240px' : '140px' }}
            component={'img'}
            src={LogoIcon}
        />
    )
}
