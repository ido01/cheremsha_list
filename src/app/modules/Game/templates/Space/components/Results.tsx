import CloseIcon from '@mui/icons-material/Close'
import { Box, Dialog, IconButton, Typography } from '@mui/material'
import * as Colors from '@mui/material/colors'
import Table from 'app/components/Table'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React, { useEffect, useState } from 'react'
import { IGame, IGamesResponse } from 'types/IGame'
import { TTableRowData } from 'types/ITableDisplay'
import { request } from 'utils/request'

interface ResultsProps {
    isOpen: boolean
    handleClose: () => void
}

export const Results: React.FC<ResultsProps> = ({ isOpen, handleClose }) => {
    const [items, setItems] = useState<IGame[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    const tableRows: TTableRowData[] = [
        {
            title: '',
            name: 'name',
            xs: 12,
            element: (item: IGame, index?: number) => (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pr: 2,
                        pl: 1,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {index !== undefined && (
                            <Box
                                sx={{
                                    borderRadius: '50%',
                                    border: '2px solid #999',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="body3">{index + 1}</Typography>
                            </Box>
                        )}
                        <AvatarImage
                            name={`${item.user?.last_name} ${item.user?.name}`}
                            image={item.user?.image}
                            size={'36px'}
                        />

                        <Box>
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
        if (isOpen) {
            setLoading(true)
            request('games/planet/list')
                .then((response: IGamesResponse) => {
                    setLoading(false)
                    setItems(response.data)
                })
                .catch(() => {
                    setLoading(false)
                })
        } else {
            setItems([])
        }
    }, [isOpen])

    return (
        <Dialog fullWidth open={isOpen}>
            <Box
                sx={{
                    width: '100%',
                    bgcolor: Colors.blueGrey[700],
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    flex: 'auto',
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                    }}
                    onClick={handleClose}
                >
                    <CloseIcon sx={{ color: Colors.blueGrey[50] }} />
                </IconButton>
                <Typography variant="h4" color="white">
                    Таблица лидеров
                </Typography>
                <Table disableBorder disablePadding isLoading={isLoading} items={items} rows={tableRows} />
            </Box>
        </Dialog>
    )
}
