import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IUser } from 'types/IUser'

export interface IWorkdayState extends EntityState<IUser> {
    status: EStatus
    currentMonth: number
    currentYear: number
    modal: {
        isOpen: boolean
        activeId: string
    }
}
