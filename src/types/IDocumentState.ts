import { EState } from 'types'

export interface IDocumentStateRequest {
    did: string
    id: string
}

export interface IDocumentState {
    id: string
    state: EState
    did: string
    uid: string
    createdAt: string
    updatedAt: string
}
