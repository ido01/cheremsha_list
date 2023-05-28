import { IEventInfo } from './IEventInfo'

export interface IEventsResponse {
    data: IEvent[]
}

export interface IEventResponse {
    data: IEvent
}

export interface IEvent {
    id: string
    name: string
    info: IEventInfo[]
    eventDate: string
    day: number
    month: number
    year: number
    prioritet: string
    createdAt: string
}
