import { EStatus } from '.'
import { IDocumentInfo } from './IDocumentInfo'
import { IDocumentPoint } from './IDocumentPoint'
import { IDocumentTaskUser } from './IDocumentTaskUser'
import { IState } from './IState'
import { IUser } from './IUser'

export interface IDocumentsResponse {
    data: IDocument[]
}

export interface IDocumentResponse {
    data: IDocument
}

export interface IDocument {
    id: string
    type: 'document'
    status?: EStatus
    uid: string
    parentId: string
    name: string
    deadTime: string
    end_date: string
    end_date_unix: number
    info: IDocumentInfo[]
    points: IDocumentPoint[]
    users: IDocumentTaskUser[]
    author?: IUser
    state: IState
    createdAt: string
    task_status: EStatus
}
