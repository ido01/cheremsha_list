import { SportsEsports as SportsEsportsIcon } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import Table from 'app/components/Table'
import { TitleBlock } from 'app/components/TitleBlock'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { TTableRowData } from 'types/ITable'

interface ILink {
    icon: React.ReactNode
    title: string
    path: string
}

export const GameList: React.FC = () => {
    const history = useHistory()

    const links: ILink[] = [
        {
            icon: <SportsEsportsIcon />,
            title: 'Лишний цвет',
            path: '/game/find_color',
        },
    ]

    const tableRows: TTableRowData[] = [
        {
            title: 'Название',
            name: 'name',
            xs: 12,
            element: (item: ILink) => (
                <Box display={'flex'} alignItems={'center'} pl={1}>
                    {item.icon}

                    <Typography variant="body1" sx={{ ml: item.icon ? 2 : 5 }}>
                        {item.title}
                    </Typography>
                </Box>
            ),
        },
    ]

    const handleClickRow = (item: ILink) => {
        history.push(item.path)
    }

    return (
        <>
            <TitleBlock title={'Игры'} />

            <Box flex="1 0 100%" sx={{ pt: 4, overflow: 'auto', maxHeight: { md: 'calc( 100vh - 90px )' } }}>
                <Table items={links} rows={tableRows} handleClickRow={handleClickRow} />
            </Box>
        </>
    )
}
