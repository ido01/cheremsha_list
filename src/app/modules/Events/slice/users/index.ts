import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { EStatus } from 'types'
import { IBirthdaysResponse } from 'types/IBirthday'
import { IUser } from 'types/IUser'

import { IBirthdayState } from './types'

export const birthdaysAdapter = createEntityAdapter<IUser>()

const slice = createSlice({
    name: 'birthdays',
    initialState: birthdaysAdapter.getInitialState<IBirthdayState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        currentMonth: dayjs().month() + 1,
        modal: {
            isOpen: false,
            activeId: '',
        },
    }),
    reducers: {
        setCurrentMonth(state, action: PayloadAction<number>) {
            state.currentMonth = action.payload + 1
        },
        loadBirthdays(state, action: PayloadAction<number>) {
            state.status = EStatus.PENDING
            action.payload
        },
        birthdaysLoaded(state, action: PayloadAction<IBirthdaysResponse>) {
            birthdaysAdapter.setMany(state, action.payload.data)
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

export const { actions: birthdaysActions, reducer: birthdaysReducer } = slice
