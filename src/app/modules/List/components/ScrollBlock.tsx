import { Box } from '@mui/material'
import React, { ReactNode, useEffect, useRef } from 'react'

export const ScrollBlock: React.FC<{
    scrollLeft: number
    children: ReactNode
}> = ({ scrollLeft, children }) => {
    const ref = useRef<HTMLElement>(null)

    const halfWidth = window.innerWidth / 2

    useEffect(() => {
        if (ref.current) {
            ref.current.scroll({
                top: 0,
                left: scrollLeft - halfWidth,
                behavior: 'smooth',
            })
        }
    }, [scrollLeft])

    return (
        <Box
            ref={ref}
            sx={{
                width: '100%',
                overflowX: 'scroll',
                overflowY: 'hidden',
                position: 'relative',
            }}
        >
            {children}
        </Box>
    )
}
