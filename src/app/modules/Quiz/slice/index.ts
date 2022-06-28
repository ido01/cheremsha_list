import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EState, EStatus } from 'types'
import { IDocumentStateRequest } from 'types/IDocumentState'
import { IQuiz, IQuizResponse } from 'types/IQuiz'
import { TTableOrder } from 'types/ITable'

import { IQuizState } from './types'

export const quizAdapter = createEntityAdapter<IQuiz>()

const slice = createSlice({
    name: 'quiz',
    initialState: quizAdapter.getInitialState<IQuizState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        order: {
            row: 'createdAt',
            order: 'desc',
        },
        modal: {
            isOpen: false,
            activeId: '',
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: {
                id: '',
                type: 'quiz',
                path: 'faq',
                parentId: '',
                name: '',
                questions: [],
                state: {
                    id: '',
                    state: EState.INITIAL,
                    uid: '',
                    createdAt: '',
                    updatedAt: '',
                },
                createdAt: '',
            },
        },
    }),
    reducers: {
        loadDQuiz(state) {
            state.status = EStatus.PENDING
        },
        quizLoaded(state, action: PayloadAction<IQuizResponse>) {
            quizAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        openEditModal(state, action: PayloadAction<IQuiz>) {
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideEditModal(state) {
            state.form.open = false
            state.form.data.parentId = ''
        },
        createQuiz(state, action: PayloadAction<IQuiz>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateQuiz(state, action: PayloadAction<IQuiz>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        quizSave(state, action: PayloadAction<IQuiz>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            quizAdapter.setOne(state, action.payload)
        },
        deleteQuiz(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        quizDeleted(state, action: PayloadAction<string>) {
            quizAdapter.removeOne(state, action.payload)
        },
        setOrder(state, action: PayloadAction<TTableOrder>) {
            state.order = action.payload
        },
        setActiveId(state, action: PayloadAction<string>) {
            state.modal.activeId = action.payload
        },
        setComplete(state, action: PayloadAction<IDocumentStateRequest>) {
            state
            action.payload
        },
        showModal(state) {
            state.modal.isOpen = true
        },
        hideModal(state) {
            state.modal.isOpen = false
        },
        statusError(state) {
            state.status = EStatus.ERROR
            state.form.status = EStatus.ERROR
        },
    },
})

export const { actions: quizActions, reducer: quizReducer } = slice
