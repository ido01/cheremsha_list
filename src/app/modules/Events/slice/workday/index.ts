import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { EStatus } from 'types'
import { IBirthdaysResponse } from 'types/IBirthday'
import { IUser } from 'types/IUser'

import { IWorkdayState } from './types'

export const workdaysAdapter = createEntityAdapter<IUser>()

export interface IWorkdayRequest {
    month: number
    year: number
}

const slice = createSlice({
    name: 'workdays',
    initialState: workdaysAdapter.getInitialState<IWorkdayState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        currentMonth: dayjs().month() + 1,
        currentYear: dayjs().year(),
        modal: {
            isOpen: false,
            activeId: '',
        },
    }),
    reducers: {
        setCurrentMonth(state, action: PayloadAction<number>) {
            state.currentMonth = action.payload + 1
        },
        setCurrentYear(state, action: PayloadAction<number>) {
            state.currentYear = action.payload
        },
        loadWorkdays(state, action: PayloadAction<IWorkdayRequest>) {
            state.status = EStatus.PENDING
            action.payload
        },
        workdaysLoaded(state, action: PayloadAction<IBirthdaysResponse>) {
            workdaysAdapter.setMany(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },

        setActiveId(state, action: PayloadAction<string>) {
            state.modal.activeId = action.payload
        },
        showModal(state) {
            state.modal.isOpen = true
        },
        hideModal(state) {
            state.modal.isOpen = false
        },
    },
})

export const { actions: workdaysActions, reducer: workdaysReducer } = slice
