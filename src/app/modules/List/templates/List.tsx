import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import { Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ControlBlock } from '../components/ControlBlock'
import { CurrentTime } from '../components/CurrentTime'
import { ListLayout } from '../components/ListLayout'
import { ScrollBlock } from '../components/ScrollBlock'
import { ScrollList } from '../components/ScrollList'
import { TablesList } from '../components/TablesList'
import { TableTimeline } from '../components/TableTimeline'
import { TimesList } from '../components/TimesList'
import { listsActions } from '../slice'
import { selectDate, selectFilterStatus, selectTables } from '../slice/selectors'
import { ICount } from '../slice/types'
import { DayModal } from './DayModal'
import { FindModal } from './FindModal'
import { FreeTableModal } from './FreeTableModal'
import { ListModalForm } from './ListModalForm'
import { ReservationModal } from './ReservationModal'
import { ResetModal } from './ResetModal'

export const List: React.FC = () => {
    const dispatch = useDispatch()
    const date = useSelector(selectDate)
    const filterStatus = useSelector(selectFilterStatus)
    const data = useSelector(selectTables)

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const COUNT_HOURS = 16
    let halfWidthInit = window.innerWidth / 5
    if (halfWidthInit < 150) {
        halfWidthInit = 150
    }
    const [halfWidth, setHalfWidth] = useState(halfWidthInit)

    const heightItemInit = data.length ? (window.innerHeight - 100) / data.length : 44
    const [heightItem, setHeightItem] = useState(heightItemInit)

    const tl: number[] = []

    for (let index = 1; index < 34; index++) {
        tl.push(halfWidth * index)
    }

    const actions = [
        {
            icon: <CalendarMonthIcon />,
            name: 'Календарь',
            onClick: () => {
                handleClose()
                dispatch(listsActions.openSettings())
            },
        },
        {
            icon: <FindInPageIcon />,
            name: 'Найти стол',
            onClick: () => {
                handleClose()
                dispatch(listsActions.openFind())
            },
        },
        {
            icon: <VisibilityIcon />,
            name: 'Показать столы',
            onClick: () => {
                dispatch(listsActions.setFilterStatus('active'))
            },
        },
        {
            icon: <VisibilityOffIcon />,
            name: 'Скрытые столы',
            onClick: () => {
                dispatch(listsActions.setFilterStatus('deleted'))
            },
        },
        {
            icon: <ZoomInIcon />,
            name: 'Приблизить',
            onClick: () => {
                setHalfWidth((value) => value + 50)
            },
        },
        {
            icon: <ZoomOutIcon />,
            name: 'Отдалить',
            onClick: () => {
                setHalfWidth((value) => value - 50)
            },
        },
    ]

    const [scrollLeft, setScrollLeft] = useState(0)

    const [currentTime, setCurrentTime] = useState(0)
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [timerReget, setTimerReget] = useState<ReturnType<typeof setTimeout> | null>(null)

    const updateSize = () => {
        let halfWidthInit = window.innerWidth / 5
        if (halfWidthInit < 150) {
            halfWidthInit = 150
        }
        setHalfWidth(halfWidthInit)

        if (data.length) {
            const heightItemInit = (window.innerHeight - 100) / data.length
            if (heightItemInit) {
                setHeightItem(heightItemInit)
            }
        }
    }

    const getReservations = () => {
        if (timerReget) {
            clearTimeout(timerReget)
        }

        if (date) {
            dispatch(
                listsActions.loadTables({
                    date,
                    status: filterStatus,
                })
            )

            setTimerReget(
                setTimeout(() => {
                    getReservations()
                }, 300000)
            )
        }
    }

    const triggerCurrentTime = () => {
        if (timer) {
            clearTimeout(timer)
        }

        const now = new Date()
        const currentMinute = now.getMinutes()
        let currentHour = now.getHours()
        if (currentHour < 10) {
            currentHour += 24
        }

        const currentTime = currentHour * 60 + currentMinute
        setCurrentTime(currentTime)

        setTimer(
            setTimeout(() => {
                triggerCurrentTime()
            }, 60000)
        )
    }

    const handleDoubleClick = () => {
        setScrollLeft((value) => value + 1)
    }

    useEffect(() => {
        if (date) {
            getReservations()
            triggerCurrentTime()
        }
    }, [date, filterStatus])

    useEffect(() => {
        if (heightItemInit) {
            setHeightItem(heightItemInit)
        }
    }, [heightItemInit])

    useEffect(() => {
        const count: ICount = {
            hookah: 0,
            express: 0,
            author: 0,
            tea: 0,
        }
        data.forEach((table) => {
            table.reservations.forEach((reservation) => {
                reservation.items.forEach((item) => {
                    if (item.position !== 'tea') {
                        count.hookah++
                    }
                    if (item.position === 'double') {
                        count.hookah++
                    }
                    if (item.position === 'tea') {
                        count.tea++
                    }
                    if (item.position === 'express') {
                        count.express++
                    }
                    if (item.position === 'author') {
                        count.author++
                    }
                })
            })
        })
        dispatch(listsActions.setCount(count))
    }, [data])

    useEffect(() => {
        window.addEventListener('resize', updateSize)
        return () => {
            window.removeEventListener('resize', updateSize)
        }
    }, [])

    return (
        <ListLayout>
            <Backdrop open={open} sx={{ zIndex: 100 }} />

            <ControlBlock />

            <TablesList height={heightItem} data={data} />

            <ScrollBlock scrollLeft={scrollLeft}>
                <ScrollList width={halfWidth} count={34}>
                    <TimesList count={COUNT_HOURS} width={halfWidth} onDoubleClick={handleDoubleClick} />
                    {data.map((table, index) => (
                        <TableTimeline
                            key={index}
                            currentTime={currentTime}
                            heightItem={heightItem}
                            width={halfWidth}
                            table={table}
                            timeLines={tl}
                            count={COUNT_HOURS}
                        />
                    ))}
                </ScrollList>

                <CurrentTime width={halfWidth} changeScroll={setScrollLeft} />
                <SpeedDial
                    ariaLabel="Дополнительные функции"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    FabProps={{
                        color: 'success',
                    }}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            slotProps={{
                                tooltip: {
                                    open: true,
                                    title: action.name,
                                },
                            }}
                            onClick={action.onClick}
                        />
                    ))}
                </SpeedDial>
            </ScrollBlock>

            <FreeTableModal
                heightItem={heightItem}
                scrollLeft={scrollLeft}
                halfWidth={halfWidth}
                currentTime={currentTime}
                timeLines={tl}
                setScrollLeft={setScrollLeft}
                handleDoubleClick={handleDoubleClick}
            />
            <DayModal />
            <FindModal />
            <ListModalForm />
            <ReservationModal currentTime={currentTime} />
            <ResetModal />
        </ListLayout>
    )
}
