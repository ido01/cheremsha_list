import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { IBirthdaysResponse } from 'types/IBirthday'
import { request } from 'utils/request'

import { birthdaysActions } from '.'

export function* loadBirthdays(action: PayloadAction<number>) {
    try {
        const response: IBirthdaysResponse = yield call(request, 'users/event', { params: { month: action.payload } })

        yield put(birthdaysActions.birthdaysLoaded(response))
    } catch (error: any) {
        yield put(birthdaysActions.statusError())
    }
}

export function* birthdaysWatcher() {
    yield takeLatest(birthdaysActions.loadBirthdays.type, loadBirthdays)
}
