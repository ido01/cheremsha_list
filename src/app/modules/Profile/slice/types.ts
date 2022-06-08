import { EStatus } from 'types'
import { IUser } from 'types/IUser'

export interface IProfileState {
    status: EStatus
    data: IUser
    form: {
        status: EStatus
        data: IUser
    }
}
