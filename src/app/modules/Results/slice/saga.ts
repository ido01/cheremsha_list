import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, select, takeLeading } from 'redux-saga/effects'
import { IResultResponse } from 'types/IResult'
import { TTableOrder, TTablePagination } from 'types/ITableDisplay'
import { IResultRequest, IUsersCollectionResponse } from 'types/IUser'
import { request } from 'utils/request'

import { resultsActions } from '.'
import { selectFilter, selectOrder, selectPagination } from './selectors'
import { IResultFilter } from './types'

export function* loadResults(action: PayloadAction<string>) {
    try {
        const pagination: TTablePagination = yield select(selectPagination)
        const order: TTableOrder = yield select(selectOrder)
        const filter: IResultFilter = yield select(selectFilter)

        const response: IUsersCollectionResponse = yield call(request, `results/${action.payload}`, {
            params: {
                page: pagination.page,
                limit: pagination.limit,
                order: order.order,
                orderRow: order.row,
                place_id: filter.place_id,
                position_id: filter.position_id,
                query: filter.query,
                state: filter.state,
            },
        })

        yield put(resultsActions.resultsLoaded(response))
    } catch (error: any) {
        yield put(resultsActions.statusError())
    }
}

export function* loadResult(action: PayloadAction<IResultRequest>) {
    try {
        const response: IResultResponse = yield call(request, `results/${action.payload.id}/${action.payload.uid}`)

        yield put(resultsActions.resultLoaded(response))
    } catch (error: any) {
        yield put(resultsActions.statusError())
    }
}

export function* setResultCompleted(action: PayloadAction<IResultRequest>) {
    try {
        const response: IResultResponse = yield call(
            request,
            `results/${action.payload.id}/${action.payload.uid}/completed`,
            {
                method: 'POST',
            }
        )

        yield put(resultsActions.resultLoaded(response))
    } catch (error: any) {
        yield put(resultsActions.statusError())
    }
}

export function* setResultClosed(action: PayloadAction<IResultRequest>) {
    try {
        const response: IResultResponse = yield call(
            request,
            `results/${action.payload.id}/${action.payload.uid}/closed`,
            {
                method: 'POST',
            }
        )

        yield put(resultsActions.resultLoaded(response))
    } catch (error: any) {
        yield put(resultsActions.statusError())
    }
}

export function* setResultReject(action: PayloadAction<IResultRequest>) {
    try {
        const response: IResultResponse = yield call(
            request,
            `results/${action.payload.id}/${action.payload.uid}/reject`,
            {
                method: 'POST',
            }
        )

        yield put(resultsActions.resultLoaded(response))
    } catch (error: any) {
        yield put(resultsActions.statusError())
    }
}

export function* setQuestionAccept(action: PayloadAction<string>) {
    try {
        const response: IResultResponse = yield call(request, `question/${action.payload}/accept`, {
            method: 'POST',
        })

        yield put(resultsActions.resultLoaded(response))
    } catch (error: any) {
        yield put(resultsActions.statusError())
    }
}

export function* setQuestionDecline(action: PayloadAction<string>) {
    try {
        const response: IResultResponse = yield call(request, `question/${action.payload}/decline`, {
            method: 'POST',
        })

        yield put(resultsActions.resultLoaded(response))
    } catch (error: any) {
        yield put(resultsActions.statusError())
    }
}

export function* resultsWatcher() {
    yield takeLeading(resultsActions.loadResults.type, loadResults)
    yield takeLeading(resultsActions.loadResult.type, loadResult)
    yield takeLeading(resultsActions.setResultCompleted.type, setResultCompleted)
    yield takeLeading(resultsActions.setResultClosed.type, setResultClosed)
    yield takeLeading(resultsActions.setResultReject.type, setResultReject)
    yield takeLeading(resultsActions.setQuestionAccept.type, setQuestionAccept)
    yield takeLeading(resultsActions.setQuestionDecline.type, setQuestionDecline)
}
