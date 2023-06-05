import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IResultResponse } from 'types/IResult'
import { TLimit, TTableOrder } from 'types/ITable'
import { IResultRequest, IUser, IUsersCollectionResponse } from 'types/IUser'

import { IResultFilter, IResultsState } from './types'

export const resultsAdapter = createEntityAdapter<IUser>()

const slice = createSlice({
    name: 'results',
    initialState: resultsAdapter.getInitialState<IResultsState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        completedLoading: false,
        closedLoading: false,
        rejectedLoading: false,
        acceptLoading: false,
        declineLoading: false,
        active_question_id: '',
        status_quiz: EStatus.INITIAL,
        total_count: 0,
        old_total_count: 0,
        order: {
            row: 'createdAt',
            order: 'desc',
        },
        pagination: {
            limit: 25,
            page: 1,
            total_pages: 0,
        },
        filter: {
            position: '',
            place_id: '',
            query: '',
            state: '',
        },
        modal: {
            isOpen: false,
            activeId: '',
        },
    }),
    reducers: {
        cleanResults(state) {
            resultsAdapter.setAll(state, [])
            state.pagination.page = 1
            state.pagination.total_pages = 1
            state.total_count = 0
            state.modal.activeId = ''
        },
        setFilter(state, action: PayloadAction<IResultFilter>) {
            state.filter = action.payload
        },
        loadResults(state, action: PayloadAction<string>) {
            state.status = EStatus.PENDING
            action.payload
        },
        resultsLoaded(state, action: PayloadAction<IUsersCollectionResponse>) {
            resultsAdapter.setAll(state, action.payload.data)
            state.pagination.total_pages = action.payload.meta.totalPages
            state.total_count = action.payload.meta.total
            state.status = EStatus.FINISHED
        },
        loadResult(state, action: PayloadAction<IResultRequest>) {
            state.status_quiz = EStatus.PENDING
            action.payload
            state.quiz = undefined
        },
        resultLoaded(state, action: PayloadAction<IResultResponse>) {
            state.status_quiz = EStatus.FINISHED
            state.closedLoading = false
            state.completedLoading = false
            state.rejectedLoading = false
            state.acceptLoading = false
            state.declineLoading = false
            resultsAdapter.setOne(state, action.payload.user)
            state.quiz = action.payload.data
        },
        setQuestionAccept(state, action: PayloadAction<string>) {
            state.acceptLoading = true
            state.active_question_id = action.payload
        },
        setQuestionDecline(state, action: PayloadAction<string>) {
            state.declineLoading = true
            state.active_question_id = action.payload
        },
        setResultCompleted(state, action: PayloadAction<IResultRequest>) {
            state.completedLoading = true
            action.payload
        },
        setResultClosed(state, action: PayloadAction<IResultRequest>) {
            state.closedLoading = true
            action.payload
        },
        setResultReject(state, action: PayloadAction<IResultRequest>) {
            state.rejectedLoading = true
            action.payload
        },
        setOrder(state, action: PayloadAction<TTableOrder>) {
            state.order = action.payload
        },
        setLimit(state, action: PayloadAction<TLimit>) {
            state.pagination.page = 1
            state.pagination.limit = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.pagination.page = action.payload
        },

        setActiveId(state, action: PayloadAction<string>) {
            if (state.modal.activeId !== action.payload) {
                state.modal.activeId = action.payload
                state.quiz = undefined
            }
        },
        showModal(state) {
            state.modal.isOpen = true
        },
        hideModal(state) {
            state.modal.isOpen = false
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
    },
})

export const { actions: resultsActions, reducer: resultsReducer } = slice
