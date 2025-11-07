import {
    Air as AirIcon,
    Delete as DeleteIcon,
    ElectricBolt as ElectricBoltIcon,
    EmojiFoodBeverage as EmojiFoodBeverageIcon,
    Filter2 as Filter2Icon,
    Redeem as RedeemIcon,
} from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IReservationItem, IReservationItemStatus } from 'types/ITable'

import { listsActions } from '../slice'
import { convertTimeToText } from '../utils'

const convertStatusToText = (status: IReservationItemStatus) => {
    switch (status) {
        case 'author':
            return 'Авторский'
        case 'double':
            return 'Два сразу'
        case 'express':
            return 'Экспресс'
        case 'hookah':
            return 'Кальян'
        case 'tea':
            return 'Церемония'
    }
}

const convertStatusToIcon = (status: IReservationItemStatus) => {
    switch (status) {
        case 'author':
            return <RedeemIcon />
        case 'double':
            return <Filter2Icon />
        case 'express':
            return <ElectricBoltIcon />
        case 'hookah':
            return <AirIcon />
        case 'tea':
            return <EmojiFoodBeverageIcon />
    }
}

export const Reservation: React.FC<{ item: IReservationItem; currentTime: number }> = ({ item, currentTime }) => {
    const dispatch = useDispatch()

    const [isLoading, setLoading] = useState(false)

    const startTimeHour = item.time.hour > 10 ? item.time.hour : item.time.hour + 24
    const startTime = startTimeHour * 60 + item.time.minute

    const hour = Math.floor((currentTime - startTime) / 60)
    const minute = (currentTime - startTime) % 60

    const handleDelete = () => {
        setLoading(true)
        dispatch(listsActions.deleteItem(item.id))
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: '7fr 2fr 2fr 1fr',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                {convertStatusToIcon(item.position)}
                <Typography variant="body2">{convertStatusToText(item.position)}</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body2">{convertTimeToText(item.time)}</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body2">
                    {currentTime >= startTime && convertTimeToText({ hour, minute })}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                }}
            >
                {isLoading ? (
                    <Box p={1}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    <IconButton color="error" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </Box>
        </Box>
    )
}
