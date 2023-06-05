import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface CountDownProps {
    seconds: number
    onEnd: () => void
}

export const CountDown: React.FC<CountDownProps> = ({ seconds, onEnd }) => {
    const [over, setOver] = useState(false)
    const [[h, m, s], setTime] = useState([0, 0, 0])

    useEffect(() => {
        const hours = Math.floor(seconds / 3600)
        const left = seconds % 3600
        const minutes = Math.floor(left / 60)
        const sec = left % 60
        setTime([hours, minutes, sec])
    }, [seconds])

    const tick = () => {
        if (over) return

        if (h === 0 && m === 0 && s === 0) {
            setOver(true)
            onEnd()
        } else if (m === 0 && s === 0) {
            setTime([h - 1, 59, 59])
        } else if (s == 0) {
            setTime([h, m - 1, 59])
        } else {
            setTime([h, m, s - 1])
        }
    }

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000)
        return () => clearInterval(timerID)
    })

    return (
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
        </Typography>
    )
}
