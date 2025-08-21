import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { call, put, takeLeading } from 'redux-saga/effects'
import { ITable, ITableItemResponse, ITablesResponse } from 'types/ITable'
import { request } from 'utils/request'

import { tablesActions } from '.'

export function* loadTables() {
    try {
        const response: ITablesResponse = yield call(request, `tables`)
        yield put(tablesActions.tablesLoaded(response))
    } catch (error: any) {
        yield put(tablesActions.statusError())
    }
}

export function* updateTable(action: PayloadAction<ITable>) {
    try {
        const response: ITableItemResponse = yield call(request, `tables/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(tablesActions.tableSave(response.data))
        toast.success('Данные успешно сохранены', {
            type: 'success',
        })
    } catch (error: any) {
        yield put(tablesActions.statusError())
    }
}

export function* createTable(action: PayloadAction<ITable>) {
    try {
        const response: ITableItemResponse = yield call(request, `tables`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(tablesActions.tableSave(response.data))
    } catch (error: any) {
        yield put(tablesActions.statusError())
    }
}

export function* deleteTable(action: PayloadAction<string>) {
    try {
        yield call(request, `tables/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(tablesActions.tableDeleted(action.payload))
    } catch (error: any) {
        yield put(tablesActions.statusError())
    }
}

export function* tablesWatcher() {
    yield takeLeading(tablesActions.loadTables.type, loadTables)
    yield takeLeading(tablesActions.updateTable.type, updateTable)
    yield takeLeading(tablesActions.createTable.type, createTable)
    yield takeLeading(tablesActions.deleteTable.type, deleteTable)
}
