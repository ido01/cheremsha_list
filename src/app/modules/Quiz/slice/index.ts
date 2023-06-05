import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EState, EStatus } from 'types'
import { IDocumentStateRequest } from 'types/IDocumentState'
import { IQuestionRequest, IQuiz, IQuizItemResponse, IQuizResponse } from 'types/IQuiz'
import { EQuizState } from 'types/IQuizState'
import { TTableOrder } from 'types/ITable'

import { IQuizState } from './types'

export const quizAdapter = createEntityAdapter<IQuiz>()

const slice = createSlice({
    name: 'quiz',
    initialState: quizAdapter.getInitialState<IQuizState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        quizLoading: false,
        questionLoading: false,
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
                draft: false,
                type: 'quiz',
                path: 'faq',
                parentId: '',
                name: '',
                description: '',
                incorrect_count: 0,
                max_min: 30,
                questions: [],
                state: {
                    id: '',
                    state: EQuizState.INITIAL,
                    uid: '',
                    qid: '',
                    current_question: -1,
                    correct: 0,
                    incorrect: 0,
                    all_questions: 0,
                    time_passed: 0,
                    createdAt: '',
                    updatedAt: '',
                },
                createdAt: '',
            },
        },
    }),
    reducers: {
        loadQuiz(state) {
            state.status = EStatus.PENDING
        },
        quizLoaded(state, action: PayloadAction<IQuizResponse>) {
            quizAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        question(state, action: PayloadAction<IQuestionRequest>) {
            state.questionLoading = true
            action.payload
        },
        questionLoaded(state, action: PayloadAction<IQuizItemResponse>) {
            state.questionLoading = false
            quizAdapter.setOne(state, action.payload.data)
        },
        completed(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        setPublic(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        setDraft(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        loadQuizById(state, action: PayloadAction<string>) {
            state.status = EStatus.PENDING
            state.quizLoading = true
            action.payload
        },
        quizByIdLoaded(state, action: PayloadAction<IQuizItemResponse>) {
            state.status = EStatus.FINISHED
            state.quizLoading = false
            quizAdapter.setOne(state, action.payload.data)
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
        moveUpInfo(state, action: PayloadAction<number>) {
            ;[state.form.data.questions[action.payload], state.form.data.questions[action.payload - 1]] = [
                state.form.data.questions[action.payload - 1],
                state.form.data.questions[action.payload],
            ]
        },
        moveDownInfo(state, action: PayloadAction<number>) {
            ;[state.form.data.questions[action.payload], state.form.data.questions[action.payload + 1]] = [
                state.form.data.questions[action.payload + 1],
                state.form.data.questions[action.payload],
            ]
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
        setStart(state, action: PayloadAction<string>) {
            state
            action.payload
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
