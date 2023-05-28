export type { RootState } from './RootState'

export type EType = 'faq' | 'school' | 'quiz' | 'motivation' | 'actions'

export type EGender = 'female' | 'male'

export type EPosition =
    | 'seller'
    | 'hookah'
    | 'manager'
    | 'owner'
    | 'creator'
    | 'managerControl'
    | 'accountant'
    | 'storekeeper'
    | 'technician'
    | 'opt'
    | 'office'
    | 'sklad'

export enum EState {
    INITIAL = 'initial',
    PENDING = 'pending',
    REJECTED = 'rejected',
    COMPLETED = 'completed',
    CLOSED = 'closed',
}

export enum ERole {
    GUEST = 'guest',
    USER = 'user',
    MODER = 'moder',
    ADMIN = 'admin',
}

export enum EStatus {
    INITIAL = 'INITIAL',
    PENDING = 'PENDING',
    FINISHED = 'FINISHED',
    ERROR = 'ERROR',
}

export enum EAuthStatus {
    INITIAL = 'INITIAL',
    NEW = 'NEW',
    AUTHORIZED = 'AUTHORIZED',
    NOT_AUTHORIZED = 'NOT_AUTHORIZED',
}
