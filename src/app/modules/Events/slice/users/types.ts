import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IUser } from 'types/IUser'

export interface IBirthdayState extends EntityState<IUser> {
    status: EStatus
    currentMonth: number
    modal: {
        isOpen: boolean
        activeId: string
    }
}
