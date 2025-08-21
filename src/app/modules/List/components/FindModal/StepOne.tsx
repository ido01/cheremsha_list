import { Box, Typography } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectFind } from '../../slice/selectors'
import { IFilter } from '../../types'
import { RadioButton } from '../RadioButton'

const minutes = [0, 15, 30, 45]

export const StepOne: React.FC<{ filter: IFilter; onChange: (filter: IFilter) => void }> = ({ filter, onChange }) => {
    dayjs.locale('ru')

    const { open } = useSelector(selectFind)

    const [hours, setHours] = useState<number[]>([])

    useEffect(() => {
        if (open) {
            let count = 16
            const now = new Date()
            let hour = now.getHours()
            if (hour < 10) {
                hour += 24
            }
            const currentDate = dayjs().subtract(6, 'hour').format('YYYY-MM-DD')
            if (currentDate !== filter.date.format('YYYY-MM-DD')) {
                hour = 12
            }
            count = count - (hour - 12)
            const hours = []
            for (let i = 0; i < count; i++) {
                hours.push(hour + i)
            }
            setHours(hours)
        }
    }, [open, filter])

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                flexDirection: 'column',
            }}
        >
            <Box>
                <Typography variant="body1">Выбрать день</Typography>
                <MobileDatePicker
                    sx={{ width: '100%', backgroundColor: 'white' }}
                    value={filter.date}
                    format="YYYY-MM-DD"
                    onChange={(day) => {
                        if (day) {
                            onChange({
                                ...filter,
                                date: day,
                            })
                        }
                    }}
                />
            </Box>
            <Box>
                <Typography variant="body1">Выбрать час</Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                    }}
                >
                    {hours.map((curHour, index) => {
                        const hour = curHour % 24
                        return (
                            <RadioButton
                                key={index}
                                active={filter.hour === hour}
                                label={`${hour < 10 ? `0${hour}` : hour}`}
                                badge={`:${filter.minute < 10 ? `0${filter.minute}` : filter.minute}`}
                                onClick={() =>
                                    onChange({
                                        ...filter,
                                        hour,
                                    })
                                }
                            />
                        )
                    })}
                </Box>
            </Box>

            <Box>
                <Typography variant="body1">Выбрать минуты</Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    }}
                >
                    {minutes.map((minute, index) => {
                        return (
                            <RadioButton
                                key={index}
                                active={filter.minute === minute}
                                label={`${minute < 10 ? `0${minute}` : minute}`}
                                leftBadge={`${filter.hour < 10 ? `0${filter.hour}` : filter.hour}:`}
                                onClick={() =>
                                    onChange({
                                        ...filter,
                                        minute,
                                    })
                                }
                            />
                        )
                    })}
                </Box>
            </Box>
            <Box>
                <Typography variant="body1">Гостей</Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                    }}
                >
                    {Array(12)
                        .fill(null)
                        .map((_, index) => {
                            return (
                                <RadioButton
                                    key={index}
                                    active={filter.guests === index + 1}
                                    label={`${index + 1}`}
                                    onClick={() =>
                                        onChange({
                                            ...filter,
                                            guests: index + 1,
                                        })
                                    }
                                />
                            )
                        })}
                </Box>
            </Box>
        </Box>
    )
}
