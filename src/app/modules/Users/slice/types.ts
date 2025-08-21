import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { TTableOrder, TTablePagination } from 'types/ITableDisplay'
import { IUser } from 'types/IUser'

export type TUserStatus = 'all' | 'new' | 'active' | 'blocked'

export interface IUserFilter {
    position_id: string
    place_id: string
    status: TUserStatus
    query: string
}

export interface IUsersState extends EntityState<IUser> {
    status: EStatus
    order: TTableOrder
    total_count: number
    old_total_count: number
    pagination: TTablePagination
    filter: IUserFilter
    modal: {
        isOpen: boolean
        activeId: string
    }
    form: {
        status: EStatus
        data: IUser
    }
}
