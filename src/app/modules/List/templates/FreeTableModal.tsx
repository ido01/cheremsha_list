import { Modal } from 'app/components/Modal'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CurrentTime } from '../components/CurrentTime'
import { ModalLayout } from '../components/ModalLayout'
import { ScrollBlock } from '../components/ScrollBlock'
import { ScrollList } from '../components/ScrollList'
import { TablesList } from '../components/TablesList'
import { TableTimeline } from '../components/TableTimeline'
import { TimesList } from '../components/TimesList'
import { listsActions } from '../slice'
import { selectFree, selectTableById } from '../slice/selectors'

const COUNT_HOURS = 16

interface FreeTableModalProps {
    heightItem: number
    scrollLeft: number
    halfWidth: number
    currentTime: number
    timeLines: number[]
    setScrollLeft: (value: number) => void
    handleDoubleClick: () => void
}

export const FreeTableModal: React.FC<FreeTableModalProps> = ({
    heightItem,
    scrollLeft,
    halfWidth,
    currentTime,
    timeLines,
    setScrollLeft,
    handleDoubleClick,
}) => {
    const dispatch = useDispatch()

    const tableIndex = {}

    const { open, id } = useSelector(selectFree)
    const selectTable = useSelector(selectTableById)
    const table = selectTable(id)

    const isOpen = open && table && table.free

    const handleClose = () => {
        dispatch(listsActions.hideFree())
    }

    const data = useMemo(() => {
        if (!table) return []
        return new Array(table.places).fill(table).map((t, index) => {
            const reservations = table.reservations
                .filter(
                    (reservation) =>
                        index + 1 >= reservation.start_table && index + 1 < reservation.start_table + reservation.guests
                )
                .map((reservation) => {
                    return {
                        ...reservation,
                        position: index + 1,
                    }
                })
            return {
                ...t,
                free: false,
                name: `${index + 1}`,
                short_name: `${index + 1}`,
                full_name: `Стул ${index + 1}`,
                position: index + 1,
                reservations,
            }
        })
    }, [table])

    return (
        <Modal open={isOpen as boolean} title={table?.full_name} handleClose={handleClose}>
            <ModalLayout>
                <TablesList top={34} height={heightItem} data={data} />

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
                                timeLines={timeLines}
                                count={COUNT_HOURS}
                                isChairVisible={true}
                                chair={table.position}
                                tableIndex={tableIndex}
                            />
                        ))}
                    </ScrollList>

                    <CurrentTime width={halfWidth} changeScroll={setScrollLeft} />
                </ScrollBlock>
            </ModalLayout>
        </Modal>
    )
}
