import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { ILocationsResponse } from 'types/ILocation'
import { request } from 'utils/request'

import { locationsActions } from '.'

export function* loadLocations(action: PayloadAction<string>) {
    try {
        const response: ILocationsResponse = yield call(request, `locations`, {
            params: {
                project: action.payload,
            },
        })

        yield put(locationsActions.locationsLoaded(response))
    } catch (error: any) {
        yield put(locationsActions.statusError())
    }
}

export function* locationsWatcher() {
    yield takeLatest(locationsActions.loadLocations.type, loadLocations)
}
