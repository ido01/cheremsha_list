import { Box, Container, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ResetItem } from '../components/Reset/ResetItem'
import { listsActions } from '../slice'
import { selectReset, selectTableById, selectTables } from '../slice/selectors'

export const ResetModal: React.FC = () => {
    const dispatch = useDispatch()

    const { open, reservation } = useSelector(selectReset)
    const getTable = useSelector(selectTableById)
    const table = getTable(reservation.tid)
    const data = useSelector(selectTables)

    const handleClose = () => {
        dispatch(listsActions.hideReset())
    }

    return (
        <Modal open={open} title={'Пересадить'} handleClose={handleClose}>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gap: 1,
                            gridTemplateColumns: '1fr 1fr',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant="caption">Гость</Typography>
                            <Typography variant="body1">{reservation.name}</Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant="caption">Стол</Typography>
                            <Typography variant="body1">{table?.full_name}</Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gap: 1,
                            gridTemplateColumns: '1fr 1fr',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant="caption">Гостей</Typography>
                            <Typography variant="body1">{reservation.guests}</Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant="caption">Комментарий</Typography>
                            <Typography variant="body1">{reservation.comment || '-'}</Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Typography variant="caption">Столы</Typography>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                gap: 1,
                            }}
                        >
                            {data
                                .filter((table) => table.id !== reservation.tid)
                                .map((table, index) => (
                                    <ResetItem key={index} table={table} reservation={reservation} />
                                ))}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Modal>
    )
}
