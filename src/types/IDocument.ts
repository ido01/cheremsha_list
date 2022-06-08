import { EType } from '.'
import { IDocumentInfo } from './IDocumentInfo'
import { IState } from './IState'

export interface IDocumentsResponse {
    data: IDocument[]
}

export interface IDocumentResponse {
    data: IDocument
}

export interface IDocument {
    id: string
    type: 'document'
    path: EType
    parentId: string
    name: string
    info: IDocumentInfo[]
    state: IState
    createdAt: string
}
