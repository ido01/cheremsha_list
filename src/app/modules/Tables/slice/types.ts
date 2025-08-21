import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { ITable } from 'types/ITable'

export interface ITablesState extends EntityState<ITable> {
    status: EStatus
    modal: {
        isOpen: boolean
        activeId: string
    }
    deleteModal: {
        status: EStatus
        open: boolean
        data: ITable
    }
    form: {
        status: EStatus
        open: boolean
        data: ITable
    }
}
