import { EAuthStatus, EStatus } from 'types'

export interface IActiveToken {
    id: string
    token: string
}

export interface ISignin {
    email: string
    password: string
}

export interface ISignup {
    name: string
    last_name: string
    email: string
    password: string
}

export interface IAuthState {
    token: string
    auth_status: EAuthStatus
    status: EStatus
    forms: {
        signin: {
            status: EStatus
            data: ISignin
        }
        signup: {
            status: EStatus
            data: ISignup
        }
    }
}
