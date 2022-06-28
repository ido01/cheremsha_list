import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EAuthStatus, EStatus } from 'types'

import { IActiveToken, IAuthState, ISignin, ISignup } from './types'

const initialState: IAuthState = {
    status: EStatus.INITIAL,
    auth_status: localStorage.getItem('corp_token') ? EAuthStatus.AUTHORIZED : EAuthStatus.NOT_AUTHORIZED,
    token: localStorage.getItem('corp_token') || '',
    forms: {
        signin: {
            status: EStatus.INITIAL,
            data: {
                email: '',
                password: '',
            },
        },
        signup: {
            status: EStatus.INITIAL,
            data: {
                last_name: '',
                name: '',
                email: '',
                password: '',
            },
        },
    },
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetStatus(state) {
            state.status = EStatus.INITIAL
        },
        activeLogin(state, action: PayloadAction<IActiveToken>) {
            state
            action.payload
        },
        signIn(state, action: PayloadAction<ISignin>) {
            state.status = EStatus.PENDING
            action.payload
        },
        signUp(state, action: PayloadAction<ISignup>) {
            state.forms.signup.status = EStatus.PENDING
            action.payload
        },
        signUpFinished(state) {
            state.forms.signup.status = EStatus.FINISHED
        },
        statusSignUpError(state) {
            state.forms.signup.status = EStatus.ERROR
        },
        logined(state, action: PayloadAction<string>) {
            state.status = EStatus.FINISHED
            state.auth_status = EAuthStatus.AUTHORIZED
            localStorage.setItem('corp_token', action.payload)
        },
        logout(state) {
            state.auth_status = EAuthStatus.NOT_AUTHORIZED
            state.token = ''
        },
        logouted(state) {
            state
            localStorage.removeItem('corp_token')
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
    },
})

export const { actions: authActions, reducer: authReducer } = slice
