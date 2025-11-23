import { Add as AddIcon } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { listsActions } from 'app/modules/List/slice'
import { selectFilterStatus } from 'app/modules/List/slice/selectors'
import dayjs from 'dayjs'
import md5 from 'md5'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IReservationStatus, ITable, ITime } from 'types/ITable'

export const AddReservation: React.FC<{
    width: number
    heightItem: number
    left: number
    time: ITime
    table: ITable
    currentTime: number
    date: string
    dateInt: number
    curDate: string
    curDateInt: number
    chair?: number
}> = ({ width, heightItem, left, time, table, currentTime, date, dateInt, curDateInt, chair = 1 }) => {
    const dispatch = useDispatch()

    const filterStatus = useSelector(selectFilterStatus)

    const itemHeight = heightItem - 10
    const leftItem = left + 5

    const start = Object.assign({}, time)
    const h = start.hour > 7 ? start.hour : start.hour + 24
    const addTime = h * 60 + start.minute

    const handleClick = () => {
        let status: IReservationStatus = 'init'
        let start = Object.assign({}, time)

        if (currentTime > addTime && currentTime < addTime + 30) {
            const now = new Date()
            const currentMinute = now.getMinutes()
            const currentHour = now.getHours()
            start = {
                hour: currentHour,
                minute: currentMinute,
            }
            status = 'active'
        }
        dispatch(
            listsActions.showEditModal({
                id: '',
                tid: table.id,
                pid: '',
                cid: '',
                ptid: '',
                ctid: '',
                uniq: md5(`${table.id}_${dayjs().unix()}`),
                main_id: '',
                name: '',
                phone: '',
                comment: '',
                guests: 2,
                start_table: chair,
                status,
                close_status: 'none',
                start,
                main_start: {
                    hour: 12,
                    minute: 0,
                },
                end: {
                    hour: start.hour > 21 ? start.hour - 22 : start.hour + 2,
                    minute: start.minute,
                },
                end_hour: 0,
                end_minute: 0,
                close: {
                    hour: 0,
                    minute: 0,
                },
                date,
                items: [],
            })
        )
    }

    if (filterStatus === 'deleted' || (curDateInt === dateInt && addTime - currentTime < -90) || dateInt < curDateInt) {
        return null
    }

    return (
        <Box
            sx={{
                width: `${width - 10}px`,
                position: 'absolute',
                top: '5px',
                borderRadius: 2,
                height: `${itemHeight}px`,
                left: `${leftItem}px`,
                border: '1px solid #ccc',
                color: '#999',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                ':hover': {
                    border: '1px solid #aaa',
                    color: '#999',
                },
            }}
            onClick={handleClick}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="body3" sx={{ color: '#aaa', lineHeight: 1 }}>{`${
                    time.hour < 10 ? `0${time.hour}` : time.hour
                }`}</Typography>
                <Typography variant="body3" sx={{ color: '#aaa', lineHeight: 1 }}>{`${
                    time.minute < 10 ? `0${time.minute}` : time.minute
                }`}</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    top: 0,
                    left: 0,
                    position: 'absolute',
                }}
            >
                <AddIcon />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    pr: 1,
                }}
            >
                <Typography variant="body3" sx={{ color: '#aaa', lineHeight: 1 }}>
                    {`${table.places} м`}
                </Typography>
            </Box>
        </Box>
    )
}
