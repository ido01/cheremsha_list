import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IReservation, IReservationItem, IReservationReset, ITableItemResponse, ITablesResponse } from 'types/ITable'
import { request } from 'utils/request'

import { listsActions } from '.'

export function* loadTables(action: PayloadAction<string>) {
    try {
        const response: ITablesResponse = yield call(request, `tables?date=${action.payload}`, {
            data: {
                date: '2222-22',
            },
        })

        yield put(listsActions.tablesLoaded(response))
    } catch (error: any) {
        yield put(listsActions.statusError())
    }
}

export function* createReservation(action: PayloadAction<IReservation>) {
    try {
        const response: ITableItemResponse = yield call(request, `tables/reserv`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(listsActions.reservationSave(response.data))
    } catch (error: any) {
        yield put(listsActions.statusError())
    }
}

export function* updateReservation(action: PayloadAction<IReservation>) {
    try {
        const response: ITableItemResponse = yield call(request, `tables/reserv/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(listsActions.reservationSave(response.data))
    } catch (error: any) {
        yield put(listsActions.statusError())
    }
}

export function* resetReservation(action: PayloadAction<IReservationReset>) {
    try {
        const response: ITablesResponse = yield call(request, `tables/resetreserv`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(listsActions.reservationReset(response))
    } catch (error: any) {
        yield put(listsActions.statusError())
    }
}

export function* createItem(action: PayloadAction<IReservationItem>) {
    try {
        const response: ITableItemResponse = yield call(request, `tables/item`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(listsActions.reservationItemSave(response.data))
    } catch (error: any) {
        yield put(listsActions.statusError())
    }
}

export function* deleteItem(action: PayloadAction<string>) {
    try {
        const response: ITableItemResponse = yield call(request, `tables/item/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(listsActions.reservationItemSave(response.data))
    } catch (error: any) {
        yield put(listsActions.statusError())
    }
}

export function* listsWatcher() {
    yield takeLeading(listsActions.loadTables.type, loadTables)
    yield takeLeading(listsActions.createReservation.type, createReservation)
    yield takeLeading(listsActions.updateReservation.type, updateReservation)
    yield takeLeading(listsActions.createItem.type, createItem)
    yield takeLeading(listsActions.deleteItem.type, deleteItem)
    yield takeLeading(listsActions.resetReservation.type, resetReservation)
}
