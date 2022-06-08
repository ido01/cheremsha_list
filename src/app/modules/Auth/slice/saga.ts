import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { call, put, takeLeading } from 'redux-saga/effects'
import { request } from 'utils/request'

import { authActions } from '.'
import { IActiveToken, ISignin, ISignup } from './types'

interface signInResponse {
    token: string
}

export function* activeLogin(action: PayloadAction<IActiveToken>) {
    try {
        const response: signInResponse = yield call(request, `auth/active`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(authActions.logined(response.token))
    } catch (error: any) {
        yield put(authActions.statusError())

        toast.error(error.data.message || error.data.error || 'Что-то пошло не так', {
            type: 'error',
        })
    }
}

export function* signIn(action: PayloadAction<ISignin>) {
    try {
        const response: signInResponse = yield call(request, `auth`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(authActions.logined(response.token))
    } catch (error: any) {
        yield put(authActions.statusError())

        toast.error(error.data.message || error.data.error || 'Что-то пошло не так', {
            type: 'error',
        })
    }
}

export function* signUp(action: PayloadAction<ISignup>) {
    try {
        yield call(request, `auth/signup`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(authActions.signUpFinished())
    } catch (error: any) {
        yield put(authActions.statusSignUpError())

        toast.error(error.data.message || error.data.error || 'Что-то пошло не так', {
            type: 'error',
        })
    }
}

export function* logout() {
    try {
        yield call(request, `auth/logout`, {
            method: 'POST',
        })

        yield put(authActions.logouted())
    } catch (error: any) {
        yield put(authActions.statusSignUpError())

        toast.error(error.data.message || error.data.error || 'Что-то пошло не так', {
            type: 'error',
        })
    }
}

export function* authWatcher() {
    yield takeLeading(authActions.activeLogin.type, activeLogin)
    yield takeLeading(authActions.signIn.type, signIn)
    yield takeLeading(authActions.signUp.type, signUp)
    yield takeLeading(authActions.logout.type, logout)
}
