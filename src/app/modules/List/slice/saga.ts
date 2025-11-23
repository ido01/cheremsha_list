import { PayloadAction } from '@reduxjs/toolkit'
import { reservationsActions } from 'app/modules/Reservation/slice'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IReservation, IReservationItem, IReservationReset, ITableItemResponse, ITablesResponse } from 'types/ITable'
import { request } from 'utils/request'

import { listsActions } from '.'

export function* loadTables(action: PayloadAction<{ date: string; place?: string; status: 'active' | 'deleted' }>) {
    try {
        const response: ITablesResponse = yield call(
            request,
            `tables?date=${action.payload.date}&status=${action.payload.status}${
                action.payload.place ? `&place=${action.payload.place}` : ''
            }`,
            {
                data: {
                    date: '2222-22',
                },
            }
        )

        yield put(listsActions.tablesLoaded(response))

        const reservations = response.data.reduce<IReservation[]>((acc, table) => {
            return [...acc, ...table.reservations]
        }, [])
        yield put(reservationsActions.setManyReservations(reservations))
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

        yield put(listsActions.reservationSave({ data: [response.data] }))

        yield put(reservationsActions.setManyReservations(response.data.reservations))
    } catch (error: any) {
        yield put(listsActions.statusError())
    }
}

export function* updateReservation(action: PayloadAction<IReservation>) {
    try {
        const response: ITablesResponse = yield call(request, `tables/reserv/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(listsActions.reservationSave(response))

        const reservations = response.data.reduce<IReservation[]>((acc, table) => {
            return [...acc, ...table.reservations]
        }, [])
        yield put(reservationsActions.setManyReservations(reservations))
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

        const reservations = response.data.reduce<IReservation[]>((acc, table) => {
            return [...acc, ...table.reservations]
        }, [])
        yield put(reservationsActions.setManyReservations(reservations))
    } catch (error: any) {
        yield put(listsActions.statusError())
    }
}

export function* createItem(action: PayloadAction<IReservationItem>) {
    try {
        const response: ITablesResponse = yield call(request, `tables/item`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(listsActions.reservationItemSave(response))

        const reservations = response.data.reduce<IReservation[]>((acc, table) => {
            return [...acc, ...table.reservations]
        }, [])
        yield put(reservationsActions.setManyReservations(reservations))
    } catch (error: any) {
        yield put(listsActions.statusError())
    }
}

export function* deleteItem(action: PayloadAction<string>) {
    try {
        const response: ITablesResponse = yield call(request, `tables/item/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(listsActions.reservationItemSave(response))

        const reservations = response.data.reduce<IReservation[]>((acc, table) => {
            return [...acc, ...table.reservations]
        }, [])
        yield put(reservationsActions.setManyReservations(reservations))
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
