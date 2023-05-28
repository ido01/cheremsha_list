import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { ILocation } from 'types/ILocation'

export interface ILocationsState extends EntityState<ILocation> {
    status: EStatus
}
