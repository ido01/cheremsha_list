import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'
import { ILogResponse } from 'types/ILog'
import { request } from 'utils/request'

import { logActions } from '.'

export function* loadLog(action: PayloadAction<string>) {
    try {
        const response: ILogResponse = yield call(request, `log/${action.payload}`)

        yield put(logActions.logLoaded(response))
    } catch (error: any) {
        yield put(logActions.statusError())
    }
}

export function* logWatcher() {
    yield takeLeading(logActions.loadLog.type, loadLog)
}
