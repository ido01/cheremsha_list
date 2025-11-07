import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IReservation, IReservationItemStatus, ITable } from 'types/ITable'

export interface ICount {
    hookah: number
    express: number
    author: number
    tea: number
}

export interface IListState extends EntityState<ITable> {
    status: EStatus
    itemStatus: IReservationItemStatus | 'init'
    count: ICount
    filter: {
        date: string
        status: 'deleted' | 'active'
    }
    dateSettings: boolean
    find: {
        open: boolean
    }
    free: {
        open: boolean
        id: string
    }
    reset: {
        open: boolean
        reservation: IReservation
    }
    modal: {
        status: EStatus
        open: boolean
        activeId: string
        reservation: IReservation
    }
    form: {
        status: EStatus
        open: boolean
        data: IReservation
    }
}
