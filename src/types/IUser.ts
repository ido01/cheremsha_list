import { EGender, EPosition, ERole } from '.'
import { IFile } from './IFile'

export type IUsersCollectionResponse = {
    data: IUser[]
    meta: {
        count: number
        total: number
        totalPages: number
    }
}

export interface IUserItemResponse {
    data: IUser
}

export interface IProfileResponse {
    profile: IUser
}

export interface IUser {
    id: string
    active: boolean
    ban: boolean
    role: ERole
    gender: EGender
    name: string
    last_name: string
    address: string
    fid: string
    avatar?: IFile
    university: string
    birthday: string
    hobby: string
    about: string
    place_id: string
    first_date: string
    position: EPosition
    rate: number
    phone: string
    email: string
    blocked: boolean
    createdAt: string
}
