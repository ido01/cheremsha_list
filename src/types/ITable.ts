export interface ITime {
    hour: number
    minute: number
}

export interface ISelect {
    value: ITime
    label: string
}

export type IReservationStatus = 'init' | 'late' | 'active' | 'close' | 'delay' | 'delete'

export type IReservationItemStatus = 'hookah' | 'tea' | 'author' | 'express' | 'double'

export type IColorStatus = { [key in IReservationStatus]: string }

export interface IReservationItem {
    id: string
    rid: string
    tid: string
    position: IReservationItemStatus
    // timestamp: number
    time: ITime
}

export interface IReservationReset {
    id: string
    old_tid: string
    tid: string
    replace_id: string
}

export interface IReservation {
    id: string
    tid: string
    name: string
    phone: string
    comment: string
    start: ITime
    end: ITime
    close: ITime
    guests: number
    date: string
    status: IReservationStatus
    items: IReservationItem[]
    crossDelay?: number
}

export interface IReservationMapping extends IReservation {
    endCrossMinutes: number
    startCrossMinutes: number
    cross: number
    stepsLeft: number
}

export interface ITable {
    id: string
    name: string
    short_name: string
    full_name: string
    places: number
    free: boolean
    reservations: IReservation[]
}

export interface IMinLine {
    height: string
    left: string
}

export interface ITablesResponse {
    data: ITable[]
}

export interface ITableItemResponse {
    data: ITable
}
