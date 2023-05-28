import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { IBirthdaysResponse } from 'types/IBirthday'
import { request } from 'utils/request'

import { IWorkdayRequest, workdaysActions } from '.'

export function* loadWorkdays(action: PayloadAction<IWorkdayRequest>) {
    try {
        const response: IBirthdaysResponse = yield call(request, 'users/workdays', {
            params: { month: action.payload.month, year: action.payload.year },
        })

        yield put(workdaysActions.workdaysLoaded(response))
    } catch (error: any) {
        yield put(workdaysActions.statusError())
    }
}

export function* workdaysWatcher() {
    yield takeLatest(workdaysActions.loadWorkdays.type, loadWorkdays)
}
