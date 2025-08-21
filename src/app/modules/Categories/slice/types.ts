import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { ICategory } from 'types/ICategory'
import { TTableOrder } from 'types/ITableDisplay'

export interface ICategoriesState extends EntityState<ICategory> {
    status: EStatus
    order: TTableOrder
    form: {
        status: EStatus
        open: boolean
        data: ICategory
    }
}
