import { PayloadAction } from '@reduxjs/toolkit'
import { authActions } from 'app/modules/Auth/slice'
import { call, put, select, takeLeading } from 'redux-saga/effects'
import { IProfileResponse, IUser } from 'types/IUser'
import { request } from 'utils/request'

import { profileActions } from '.'

export function* loadProfile() {
    try {
        const response: IProfileResponse = yield call(request, `profile`)

        yield put(profileActions.profileLoaded(response))
    } catch (error: any) {
        yield put(authActions.logout())
        yield put(profileActions.statusError())
    }
}

export function* updateProfile(action: PayloadAction<IUser>) {
    try {
        const response: IProfileResponse = yield call(request, `profile`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(profileActions.profileLoaded(response))
    } catch (error: any) {
        yield put(profileActions.statusError())
    }
}

export function* updateAvatar(action: PayloadAction<string>) {
    try {
        const response: IProfileResponse = yield call(request, `profile/avatar`, {
            method: 'PATCH',
            data: {
                fid: action.payload,
            },
        })

        yield put(profileActions.profileLoaded(response))
    } catch (error: any) {
        yield put(profileActions.statusError())
    }
}
export function* profileWatcher() {
    yield takeLeading(profileActions.loadProfile.type, loadProfile)
    yield takeLeading(profileActions.updateProfile.type, updateProfile)
    yield takeLeading(profileActions.updateAvatar.type, updateAvatar)
}
