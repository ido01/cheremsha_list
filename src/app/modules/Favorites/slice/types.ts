import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IUser } from 'types/IUser'

export interface IFavoritesState extends EntityState<IUser> {
    status: EStatus
    modal: {
        isOpen: boolean
        activeId: string
    }
}
