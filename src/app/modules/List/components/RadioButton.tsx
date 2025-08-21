import { Box, Typography } from '@mui/material'
import React from 'react'

export const RadioButton: React.FC<{
    active: boolean
    label: string
    badge?: string
    leftBadge?: string
    isReserved?: boolean
    disabled?: boolean
    onClick: () => void
}> = ({ active, label, badge, leftBadge, isReserved, disabled, onClick }) => {
    const color = disabled ? '#eee' : active ? '#8BC34A' : '#f9f9f9'
    const fontColor = disabled ? '#666' : active ? '#fff' : '#333'
    const reservedColor = `linear-gradient(45deg, #f00 25%, ${color} 25%, ${color} 50%, #f00 50%, #f00 75%, ${color} 75%, ${color})`
    const handleClick = () => {
        if (!disabled) {
            onClick()
        }
    }
    return (
        <Box
            sx={{
                cursor: !disabled ? 'pointer' : 'default',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                border: !disabled ? '1px solid #999' : '1px solid #eee',
                background: isReserved ? reservedColor : color,
                backgroundSize: '50px 50px',
                color: fontColor,
                height: '64px',
                width: '100%',
                gap: 1,
            }}
            onClick={handleClick}
        >
            {leftBadge && <Typography variant="body3">{`${leftBadge}`}</Typography>}
            <Typography variant="h5">{label}</Typography>
            {badge && <Typography variant="body3">{`${badge}`}</Typography>}
        </Box>
    )
}
