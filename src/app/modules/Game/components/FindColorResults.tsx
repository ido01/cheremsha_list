import { Box, Button, Typography } from '@mui/material'
import Table from 'app/components/Table'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React, { useEffect, useState } from 'react'
import { EGameState, IGame, IGamesResponse } from 'types/IGame'
import { TTableRowData } from 'types/ITable'
import { request } from 'utils/request'

interface FindColorResultsProps {
    onChangeState: (state: EGameState) => void
}

export const FindColorResults: React.FC<FindColorResultsProps> = ({ onChangeState }) => {
    const [items, setItems] = useState<IGame[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    const tableRows: TTableRowData[] = [
        {
            title: 'Кто',
            name: 'name',
            xs: 12,
            element: (item: IGame) => (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarImage
                            name={`${item.user?.last_name} ${item.user?.name}`}
                            image={item.user?.avatar?.thumb}
                            size={'36px'}
                        />

                        <Box ml={2}>
                            <Typography variant="body2">{`${item.user?.last_name} ${item.user?.name}`}</Typography>
                        </Box>
                    </Box>

                    <Typography variant="body2" fontWeight="bold">
                        {item.best}
                    </Typography>
                </Box>
            ),
        },
    ]

    useEffect(() => {
        setLoading(true)
        request('games/find_color/list')
            .then((response: IGamesResponse) => {
                setLoading(false)
                setItems(response.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    return (
        <Box
            sx={{
                flex: '1 0 auto',
                overflow: 'auto',
            }}
        >
            <Button fullWidth variant="outlined" sx={{ my: 2 }} onClick={() => onChangeState(EGameState.INIT)}>
                Назад
            </Button>

            <Table isLoading={isLoading} items={items} rows={tableRows} />
        </Box>
    )
}
