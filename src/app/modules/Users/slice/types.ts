import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { TTableOrder, TTablePagination } from 'types/ITable'
import { IUser } from 'types/IUser'

export interface IUsersState extends EntityState<IUser> {
    status: EStatus
    order: TTableOrder
    total_count: number
    old_total_count: number
    pagination: TTablePagination
    modal: {
        isOpen: boolean
        activeId: string
    }
    form: {
        status: EStatus
        data: IUser
    }
}
