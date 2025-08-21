import { Box, Typography } from '@mui/material'
import React from 'react'
import { IMinLine } from 'types/ITable'

export const TimesListItem: React.FC<{
    width: number
    halfWidth: number
    time: string
    isSmall: boolean
    minutes: IMinLine[]
}> = ({ width, halfWidth, time, isSmall, minutes }) => {
    return (
        <Box
            sx={{
                width: `${width}px`,
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
            }}
        >
            <Typography>{time}</Typography>

            <Box
                sx={{
                    width: '1px',
                    height: isSmall ? '8px' : '12px',
                    position: 'absolute',
                    bottom: 0,
                    left: `${halfWidth}px`,
                    backgroundColor: '#777',
                }}
            ></Box>

            {minutes.map((min, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '1px',
                        height: min.height,
                        position: 'absolute',
                        bottom: 0,
                        left: min.left,
                        backgroundColor: '#aaa',
                    }}
                ></Box>
            ))}
        </Box>
    )
}
