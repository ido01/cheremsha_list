export interface ITime {
    hour: number
    minute: number
}

export interface ISelect {
    value: ITime
    label: string
}

export type IReservationStatus = 'init' | 'late' | 'active' | 'close' | 'delay' | 'delete'

export type IReservationCloseStatus = 'none' | 'late' | 'close' | 'passport'

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
    end_hour: number
    end_minute: number
    close: ITime
    guests: number
    start_table: number
    date: string
    status: IReservationStatus
    close_status: IReservationCloseStatus
    items: IReservationItem[]
    crossDelay?: number
    position?: number
}

export interface IReservationMapping extends IReservation {
    endDB: ITime
    endCrossMinutes: number
    startCrossMinutes: number
}

export interface ITable {
    id: string
    name: string
    short_name: string
    full_name: string
    places: number
    free: boolean
    position?: number
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
