import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'

import { ControlBlock } from '../components/ControlBlock'
import { CurrentTime } from '../components/CurrentTime'
import { ListLayout } from '../components/ListLayout'
import { ScrollBlock } from '../components/ScrollBlock'
import { ScrollList } from '../components/ScrollList'
import { TablesList } from '../components/TablesList'
import { TableTimeline } from '../components/TableTimeline'
import { TimesList } from '../components/TimesList'
import { listsActions } from '../slice'
import { selectDate, selectStatus, selectTables } from '../slice/selectors'
import { ICount } from '../slice/types'
import { DayModal } from './DayModal'
import { FindModal } from './FindModal'
import { ListModalForm } from './ListModalForm'
import { ReservationModal } from './ReservationModal'
import { ResetModal } from './ResetModal'

export const List: React.FC = () => {
    const dispatch = useDispatch()
    const date = useSelector(selectDate)
    const data = useSelector(selectTables)
    const status = useSelector(selectStatus)

    const COUNT_HOURS = 16
    let halfWidth = window.innerWidth / 5
    if (halfWidth < 150) {
        halfWidth = 150
    }

    const heightItem = (window.innerHeight - 100) / data.length
    // if (heightItem < 56) {
    //     heightItem = 56
    // }
    const tl: number[] = []

    for (let index = 1; index < 34; index++) {
        tl.push(halfWidth * index)
    }

    const [scrollLeft, setScrollLeft] = useState(0)

    const [currentTime, setCurrentTime] = useState(0)
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

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
            dispatch(listsActions.loadTables(date))
            triggerCurrentTime()
        }
    }, [date])

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

    return (
        <ListLayout>
            <ControlBlock />

            <TablesList height={heightItem} data={data} />

            <ScrollBlock scrollLeft={scrollLeft}>
                <ScrollList width={halfWidth} count={34}>
                    <TimesList count={COUNT_HOURS} width={halfWidth} onDoubleClick={handleDoubleClick} />
                    {status === EStatus.PENDING && (
                        <Box
                            sx={{
                                width: '100vw',
                                height: '500px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
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
            </ScrollBlock>

            <DayModal />
            <FindModal />
            <ListModalForm />
            <ReservationModal currentTime={currentTime} />
            <ResetModal />
        </ListLayout>
    )
}
