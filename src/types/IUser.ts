import { EGender, ERole } from '.'
import { IFile } from './IFile'
import { IQuizState } from './IQuizState'

export type IUsersCollectionResponse = {
    data: IUser[]
    meta: {
        count: number
        total: number
        totalPages: number
    }
}

export type ITinyUserCollectionResponse = {
    data: ITinyUser[]
}

export interface IUserItemResponse {
    data: IUser
}

export interface IProfileResponse {
    profile: IUser
}

export interface IResultRequest {
    id: string
    uid: string
}

export interface IUser {
    id: string
    active: boolean
    ban: boolean
    role: ERole
    gender: EGender
    name: string
    last_name: string
    image?: string
    address: string
    position_id: number
    job?: string
    fid: string
    avatar?: IFile
    doc: string
    doc_file?: IFile
    university: string
    birthday: string
    day: number
    month: number
    workday: number
    workmonth: number
    workyear: number
    hobby: string
    about: string
    place_id: string
    first_date: string
    rate: number
    phone: string
    email: string
    blocked: boolean
    favorite: boolean
    createdAt: string
    state?: IQuizState
    quiz?: IQuizState
}

export interface ITinyUser {
    id: string
    label: string
}
