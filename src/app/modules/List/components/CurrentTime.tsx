import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

export const CurrentTime: React.FC<{ width: number; changeScroll: (value: number) => void }> = ({
    width,
    changeScroll,
}) => {
    const minWidth = width / 30

    const [currentTime, setCurrentTime] = useState(0)
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

    const triggerScroll = () => {
        if (timer) {
            clearTimeout(timer)
        }

        const now = new Date()
        const currentMinute = now.getMinutes()
        let currentHour = now.getHours() - 12
        if (currentHour < -6) {
            currentHour += 24
        }

        if (currentHour > 16) {
            currentHour = 16
        }

        const currentTime = (currentHour * 60 + currentMinute + 30) * minWidth
        setCurrentTime(currentTime)

        setTimer(
            setTimeout(() => {
                triggerScroll()
            }, 60000)
        )
    }

    useEffect(() => {
        triggerScroll()
    }, [width])

    useEffect(() => {
        changeScroll(currentTime)
    }, [currentTime])

    return (
        <Box
            sx={{
                width: '1px',
                height: '100vh',
                position: 'absolute',
                top: 0,
                left: `${currentTime}px`,
                backgroundColor: '#f00',
                zIndex: 2,
            }}
        ></Box>
    )
}
