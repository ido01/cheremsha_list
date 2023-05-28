export interface ILogResponse {
    data: ILog[]
}

export interface ILog {
    id: string
    row: string
    old_value: string
    new_value: string
}
