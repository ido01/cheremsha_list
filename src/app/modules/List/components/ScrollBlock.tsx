import { Box } from '@mui/material'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

export const ScrollBlock: React.FC<{
    scrollLeft: number
    children: ReactNode
}> = ({ scrollLeft, children }) => {
    const ref = useRef<HTMLElement>(null)
    const canScroll = useRef(true)
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

    const triggerScroll = () => {
        if (timer) {
            clearTimeout(timer)
        }

        canScroll.current = true
    }

    const halfWidth = window.innerWidth / 2

    const scrollEvent = () => {
        canScroll.current = false
        setTimer(
            setTimeout(() => {
                triggerScroll()
            }, 30000)
        )
    }

    useEffect(() => {
        if (ref.current && canScroll.current) {
            ref.current.scroll({
                top: 0,
                left: scrollLeft - halfWidth,
                behavior: 'smooth',
            })
        }
    }, [scrollLeft])

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('scroll', scrollEvent)
        }
        return () => {
            if (ref.current) {
                ref.current.removeEventListener('scroll', scrollEvent)
            }
        }
    }, [])

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
