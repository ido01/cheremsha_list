import { Box, Typography } from '@mui/material'
import Table from 'app/components/Table'
import React from 'react'
import { useSelector } from 'react-redux'
import { EStatus } from 'types'
import { ILog } from 'types/ILog'
import { TTableRowData } from 'types/ITable'

import { selectLog, selectStatus } from '../slice/selectors'

export const LogList: React.FC = () => {
    const status = useSelector(selectStatus)
    const logs = useSelector(selectLog)

    const rowToName = (row: string) => {
        switch (row) {
            case 'gender':
                return 'Пол'
            case 'name':
                return 'Имя'
            case 'last_name':
                return 'Фамилия'
            case 'address':
                return 'Адрес'
            case 'university':
                return 'Место учебы'
            case 'birthday':
                return 'День рождения'
            case 'hobby':
                return 'Хобби'
            case 'about':
                return 'О себе'
            case 'place_id':
                return 'Место работы'
            case 'first_date':
                return 'Первый рабочий день'
            case 'position':
                return 'Должность'
            case 'phone':
                return 'Телефон'
            case 'email':
                return 'Email'
            default:
                return row
        }
    }

    const tableRows: TTableRowData[] = [
        {
            title: 'Поле',
            name: 'row',
            xs: 4,
            element: (log: ILog) => <Typography variant="body2">{rowToName(log.row)}</Typography>,
        },
        {
            title: 'Старое поле',
            name: 'old_value',
            xs: 4,
            element: (log: ILog) => (
                <Typography variant="body2" color="grey.600">
                    {log.old_value}
                </Typography>
            ),
        },
        {
            title: 'Новое поле',
            name: 'new_value',
            xs: 4,
            element: (log: ILog) => (
                <Typography variant="body2" color="grey.600">
                    {log.new_value}
                </Typography>
            ),
        },
    ]

    // const mobileView = (item: IUser) => <MobileUserView user={item} />

    return (
        <Box pt={4}>
            <Table disablePadding items={logs} rows={tableRows} isLoading={status === EStatus.PENDING} />
        </Box>
    )
}
