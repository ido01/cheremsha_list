import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { ILog } from 'types/ILog'

export interface ILogState extends EntityState<ILog> {
    status: EStatus
}
