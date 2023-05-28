import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EAuthStatus, EStatus } from 'types'
import { IUser } from 'types/IUser'

import { IActiveToken, IAuthState, IConfirmRecovery, IRecovery, ISignin, ISignup } from './types'

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
                email: '',
                password: '',
            },
        },
        recovery: {
            status: EStatus.INITIAL,
            data: {
                email: '',
            },
        },
        confirm_recovery: {
            status: EStatus.INITIAL,
            data: {
                email: '',
                code: '',
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
        profileLoaded(state, action: PayloadAction<IUser>) {
            if (!action.payload.active) {
                state.auth_status = EAuthStatus.NEW
            }
        },
        logined(state, action: PayloadAction<string>) {
            state.status = EStatus.FINISHED
            state.auth_status = EAuthStatus.AUTHORIZED
            localStorage.setItem('corp_token', action.payload)
        },
        signUp(state, action: PayloadAction<ISignup>) {
            state.forms.signup.status = EStatus.PENDING
            action.payload
        },
        signUpFinished(state, action: PayloadAction<string>) {
            state.status = EStatus.FINISHED
            state.auth_status = EAuthStatus.NEW
            localStorage.setItem('corp_token', action.payload)
        },
        statusSignUpError(state) {
            state.forms.signup.status = EStatus.ERROR
        },
        recoveryInit(state) {
            state.forms.recovery.status = EStatus.INITIAL
        },
        recovery(state, action: PayloadAction<IRecovery>) {
            state.forms.recovery.status = EStatus.PENDING
            state.forms.confirm_recovery.data.email = action.payload.email
            state.forms.recovery.data.email = action.payload.email
        },
        recoveryFinished(state) {
            state.forms.recovery.status = EStatus.FINISHED
        },
        statusRecoveryError(state) {
            state.forms.recovery.status = EStatus.ERROR
        },
        confirmRecovery(state, action: PayloadAction<IConfirmRecovery>) {
            state.forms.confirm_recovery.status = EStatus.PENDING
            action.payload
        },
        confirmRecoveryFinished(state, action: PayloadAction<string>) {
            state.forms.confirm_recovery.status = EStatus.FINISHED
            state.auth_status = EAuthStatus.AUTHORIZED
            localStorage.setItem('corp_token', action.payload)
        },
        statusConfirmRecoveryError(state) {
            state.forms.confirm_recovery.status = EStatus.ERROR
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
