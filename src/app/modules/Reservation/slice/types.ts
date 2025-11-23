import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IReservation } from 'types/ITable'

export interface IReservationState extends EntityState<IReservation> {
    status: EStatus
}
