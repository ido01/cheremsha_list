import { Box, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'

import { listsActions } from '../../slice'
import { IFilter, ITableFree } from '../../types'
import { convertTimeToText } from '../../utils'

export const EmptyTable: React.FC<{ table: ITableFree; filter: IFilter }> = ({ table, filter }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(
            listsActions.showEditModal({
                id: '',
                tid: table.id,
                name: '',
                phone: '',
                comment: '',
                guests: filter.guests,
                status: 'init',
                start: {
                    hour: filter.hour,
                    minute: filter.minute,
                },
                end: {
                    hour: filter.hour + 1,
                    minute: filter.minute,
                },
                close: {
                    hour: 0,
                    minute: 0,
                },
                date: filter.date.format('YYYY-MM-DD'),
                items: [],
            })
        )
    }
    return (
        <Box
            sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                border: '1px solid #2196F3',
                backgroundColor: '#E3F2FD',
                borderRadius: 2,
                cursor: 'pointer',
                ':hover': {
                    backgroundColor: '#BBDEFB',
                },
            }}
            onClick={handleClick}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="body1" fontWeight={600}>
                    {table.full_name}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="body1">Мест: {table.places}</Typography>
                </Box>
            </Box>
            <Typography variant="body1">
                Можно занять с {convertTimeToText({ hour: filter.hour, minute: filter.minute })} до{' '}
                {convertTimeToText(table.end)}
            </Typography>
        </Box>
    )
}
