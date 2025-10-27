import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IDocument } from 'types/IDocument'
import { TTableOrder } from 'types/ITableDisplay'

export interface IPasteDocument {
    id: string
    parentId: string
}

export interface IDocumentsState extends EntityState<IDocument> {
    status: EStatus
    order: TTableOrder
    moveId: string
    copyId: string
    modal: {
        isOpen: boolean
        activeId: string
    }
    form: {
        status: EStatus
        open: boolean
        data: IDocument
        copy: IDocument
    }
}
