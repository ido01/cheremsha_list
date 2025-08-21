import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { TableEmptyRow } from 'app/components/Table'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ITable } from 'types/ITable'

import { tablesActions } from '../slice'

interface MobileViewProps {
    table: ITable
}

export const MobileView: React.FC<MobileViewProps> = ({ table }) => {
    const dispatch = useDispatch()

    const handleDeleteOpen = () => {
        dispatch(tablesActions.showDeleteModal(table))
    }

    const handleUpdateOpen = () => {
        dispatch(tablesActions.openEditModal(table))
    }

    return (
        <Box px={2} width={'100%'} display="flex" flexDirection="column" gap={1}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
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
                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-end'}>
                        <Typography mr={1} variant="caption" color="grey.600">
                            Короткое Имя
                        </Typography>

                        <>
                            {!!table.short_name && (
                                <Typography variant="body2" color="grey.600" lineHeight="1.4">
                                    {table.short_name}
                                </Typography>
                            )}

                            {!table.short_name && <TableEmptyRow />}
                        </>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-end'}>
                        <Typography mr={1} variant="caption" color="grey.600">
                            Имя
                        </Typography>

                        <>
                            {!!table.name && (
                                <Typography variant="body2" color="grey.600" lineHeight="1.4">
                                    {table.name}
                                </Typography>
                            )}

                            {!table.name && <TableEmptyRow />}
                        </>
                    </Box>
                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-end'}>
                        <Typography mr={1} variant="caption" color="grey.600">
                            Мест
                        </Typography>

                        <>
                            {!!table.places && (
                                <Typography variant="body2" color="grey.600" lineHeight="1.4">
                                    {table.places}
                                </Typography>
                            )}

                            {!table.places && <TableEmptyRow />}
                        </>
                    </Box>
                </Box>
            </Box>

            <Box width="100%" display="flex" gap={2} justifyContent="space-between">
                <Button color="info" startIcon={<EditIcon />} onClick={handleUpdateOpen}>
                    Редактировать
                </Button>
                <Button color="error" startIcon={<DeleteIcon />} onClick={handleDeleteOpen}>
                    Удалить
                </Button>
            </Box>
        </Box>
    )
}
