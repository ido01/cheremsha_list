import { LoadingButton } from '@mui/lab'
import { Box, Container, Typography } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { Modal } from 'app/components/Modal'
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listsActions } from '../slice'
import { selectDateSetting } from '../slice/selectors'

export const DayModal: React.FC = () => {
    dayjs.locale('ru')
    const dispatch = useDispatch()

    const open = useSelector(selectDateSetting)
    const [date, setDate] = useState<Dayjs>(dayjs())

    const handleClose = () => {
        dispatch(listsActions.hideSettings())
    }

    const handleShow = () => {
        dispatch(listsActions.setDate(date.format('YYYY-MM-DD')))
    }

    return (
        <Modal open={open} title={'Показан день'} handleClose={handleClose}>
            <Box py={11}>
                <Container>
                    <Box>
                        <Typography variant="body1">Выбрать день</Typography>
                        <MobileDatePicker
                            sx={{ width: '100%', backgroundColor: 'white' }}
                            value={date}
                            format="YYYY-MM-DD"
                            onChange={(day) => {
                                if (day) {
                                    setDate(day)
                                }
                            }}
                        />
                    </Box>
                </Container>
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                        py: 2,
                        bgcolor: 'white',
                        zIndex: 1,
                    }}
                >
                    <Container>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            <LoadingButton
                                fullWidth
                                color="primary"
                                variant="contained"
                                sx={{
                                    height: '64px',
                                }}
                                onClick={() => handleShow()}
                            >
                                Показать
                            </LoadingButton>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Modal>
    )
}
