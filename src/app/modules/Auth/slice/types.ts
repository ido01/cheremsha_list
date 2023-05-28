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
    email: string
    password: string
}

export interface IRecovery {
    email: string
}

export interface IConfirmRecovery {
    email: string
    code: string
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
        recovery: {
            status: EStatus
            data: IRecovery
        }
        confirm_recovery: {
            status: EStatus
            data: IConfirmRecovery
        }
    }
}
