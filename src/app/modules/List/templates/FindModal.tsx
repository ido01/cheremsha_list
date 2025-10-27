import { LoadingButton } from '@mui/lab'
import { Box, Container } from '@mui/material'
import { Modal } from 'app/components/Modal'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITable, ITablesResponse } from 'types/ITable'
import { request } from 'utils/request'

import { StepTwo } from '../components/FindModal/SrepTwo'
import { StepOne } from '../components/FindModal/StepOne'
import { listsActions } from '../slice'
import { selectFind } from '../slice/selectors'
import { IFilter, ITableFree } from '../types'

export const FindModal: React.FC = () => {
    dayjs.locale('ru')
    const dispatch = useDispatch()

    const { open } = useSelector(selectFind)
    const [data, setData] = useState<ITable[]>([])

    const [filter, setFilter] = useState<IFilter>({
        hour: -1,
        minute: 0,
        guests: 2,
        date: dayjs().subtract(6, 'hour'),
    })
    const [status, setStatus] = useState(false)
    const [step, setStep] = useState(0)
    const [tables, setTables] = useState<ITableFree[]>([])

    const handleClose = () => {
        dispatch(listsActions.hideFind())
    }

    const fetchTables = (date: string) => {
        request(`tables?date=${date}`).then((response: ITablesResponse) => {
            setData(response.data)
        })
    }

    useEffect(() => {
        if (open) {
            const date = dayjs().subtract(6, 'hour')
            setFilter({
                hour: -1,
                minute: 0,
                guests: 2,
                date,
            })
            setStep(0)
            fetchTables(date.format('YYYY-MM-DD'))
        }
    }, [open])

    const changeFilter = (newFilter: IFilter) => {
        if (newFilter.date !== filter.date) {
            fetchTables(newFilter.date.format('YYYY-MM-DD'))
        }
        setFilter(newFilter)
    }

    const handleSearch = () => {
        setStatus(true)
        const findTimeHour = filter.hour > 10 ? filter.hour : filter.hour + 24
        const findTime = findTimeHour * 60 + filter.minute
        const tables: ITableFree[] = data.map((table) => {
            const tableFree = {
                id: table.id,
                full_name: table.full_name,
                places: table.places,
                disabled: false,
                end: {
                    hour: 4,
                    minute: 0,
                },
            }
            if (table.places < filter.guests) {
                tableFree.disabled = true
                return tableFree
            }

            let findEndTimeHour = tableFree.end.hour > 10 ? tableFree.end.hour : tableFree.end.hour + 24
            let findendTime = findEndTimeHour * 60 + tableFree.end.minute

            table.reservations.forEach((reservation) => {
                const startTimeHour = reservation.start.hour > 10 ? reservation.start.hour : reservation.start.hour + 24
                const endTimeHour = reservation.end.hour > 10 ? reservation.end.hour : reservation.end.hour + 24
                const startTime = startTimeHour * 60 + reservation.start.minute
                const endTime = endTimeHour * 60 + reservation.end.minute

                if (startTime <= findTime && endTime > findTime) {
                    tableFree.disabled = true
                }

                if (!tableFree.disabled && startTime > findTime && startTime < findendTime) {
                    tableFree.end = reservation.start
                    findEndTimeHour = tableFree.end.hour > 10 ? tableFree.end.hour : tableFree.end.hour + 24
                    findendTime = findEndTimeHour * 60 + tableFree.end.minute
                }
            })

            if (findendTime - findTime < 60) {
                tableFree.disabled = true
            }

            return tableFree
        })

        setTables(tables)
        setStep(1)
        setStatus(false)
    }

    const handleFilterReset = () => {
        setStep(0)
    }

    return (
        <Modal open={open} title={'Найти стол'} handleClose={handleClose}>
            <Box py={11}>
                <Container>
                    {step === 0 && <StepOne filter={filter} onChange={changeFilter} />}
                    {step === 1 && <StepTwo tables={tables} filter={filter} onChange={handleFilterReset} />}
                </Container>
                {step === 0 && (
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
                                    loading={status}
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                    disabled={filter.hour === -1}
                                    sx={{
                                        height: '64px',
                                    }}
                                    onClick={() => handleSearch()}
                                >
                                    Найти
                                </LoadingButton>
                            </Box>
                        </Container>
                    </Box>
                )}
            </Box>
        </Modal>
    )
}
