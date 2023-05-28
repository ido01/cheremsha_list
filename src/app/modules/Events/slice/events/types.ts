import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IEvent } from 'types/IEvent'

export interface IEventsState extends EntityState<IEvent> {
    status: EStatus
    currentMonth: number
    currentYear: number
    modal: {
        isOpen: boolean
        activeId: string
    }
    form: {
        status: EStatus
        open: boolean
        data: IEvent
    }
}
