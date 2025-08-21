import { Box } from '@mui/material'
import React, { useMemo } from 'react'
import { IMinLine } from 'types/ITable'

import { TimesListItem } from './components/TimesListItem'

export const TimesList: React.FC<{ count: number; width: number; onDoubleClick: () => void }> = ({
    count,
    width,
    onDoubleClick,
}) => {
    const halfWidth = width / 2
    const minWidth = width / 30

    const times = useMemo(() => {
        const tmp = []
        const maxP = count * 2

        for (let index = 0; index <= maxP; index++) {
            const h = (12 + Math.floor(index / 2)) % 24
            const m = index % 2 ? '30' : '00'
            tmp.push(`${h < 10 ? `0${h}` : h}:${m}`)
        }

        return tmp
    }, [count])

    const minutes = useMemo(() => {
        const tmp: IMinLine[] = []

        for (let index = 0; index < 30; index++) {
            tmp.push({
                height: index === 5 || index === 25 ? '6px' : index % 5 === 0 ? '4px' : '2px',
                left: `${index * minWidth}px`,
            })
        }

        return tmp
    }, [count])

    const handleClick = () => {
        onDoubleClick()
    }

    return (
        <Box
            sx={{
                display: 'flex',
                pl: `${halfWidth}px`,
                height: '32px',
            }}
            onDoubleClick={handleClick}
        >
            {times.map((time, index) => (
                <TimesListItem
                    key={`time_${index}`}
                    isSmall={!!(index % 2)}
                    time={time}
                    width={width}
                    halfWidth={halfWidth}
                    minutes={minutes}
                />
            ))}
        </Box>
    )
}
