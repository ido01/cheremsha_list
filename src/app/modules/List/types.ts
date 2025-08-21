import { Dayjs } from 'dayjs'
import { ITime } from 'types/ITable'

export interface ITableFree {
    id: string
    full_name: string
    places: number
    disabled: boolean
    end: ITime
}

export interface IFilter {
    hour: number
    minute: number
    guests: number
    date: Dayjs
}
