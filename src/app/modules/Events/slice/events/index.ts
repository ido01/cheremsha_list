import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { EStatus } from 'types'
import { IEvent, IEventsResponse } from 'types/IEvent'
import { IFile } from 'types/IFile'

import { IEventsState } from './types'

export const eventsAdapter = createEntityAdapter<IEvent>()

interface IImageResponse {
    index: number
    file: IFile
}

export interface IEventRequest {
    month: number
    year: number
}

const slice = createSlice({
    name: 'events',
    initialState: eventsAdapter.getInitialState<IEventsState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        currentMonth: dayjs().month() + 1,
        currentYear: dayjs().year(),
        modal: {
            isOpen: false,
            activeId: '',
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: {
                id: '',
                name: '',
                eventDate: '',
                day: 0,
                month: 0,
                year: 0,
                prioritet: 'normal',
                info: [],
                createdAt: '',
            },
        },
    }),
    reducers: {
        setCurrentMonth(state, action: PayloadAction<number>) {
            state.currentMonth = action.payload + 1
        },
        setCurrentYear(state, action: PayloadAction<number>) {
            state.currentYear = action.payload
        },
        loadEvents(state, action: PayloadAction<IEventRequest>) {
            state.status = EStatus.PENDING
            action.payload
        },
        eventsLoaded(state, action: PayloadAction<IEventsResponse>) {
            eventsAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        openEditModal(state, action: PayloadAction<IEvent>) {
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        updateInfo(state, action: PayloadAction<IImageResponse>) {
            state.form.data.info = state.form.data.info.map((info, index) => {
                if (index !== action.payload.index) return info
                return {
                    ...info,
                    fid: action.payload.file.id,
                    image: action.payload.file,
                }
            })
        },
        moveUpInfo(state, action: PayloadAction<number>) {
            ;[state.form.data.info[action.payload], state.form.data.info[action.payload - 1]] = [
                state.form.data.info[action.payload - 1],
                state.form.data.info[action.payload],
            ]
        },
        moveDownInfo(state, action: PayloadAction<number>) {
            ;[state.form.data.info[action.payload], state.form.data.info[action.payload + 1]] = [
                state.form.data.info[action.payload + 1],
                state.form.data.info[action.payload],
            ]
        },
        hideEditModal(state) {
            state.form.open = false
        },
        createEvent(state, action: PayloadAction<IEvent>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateEvent(state, action: PayloadAction<IEvent>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        eventSave(state, action: PayloadAction<IEvent>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            eventsAdapter.setOne(state, action.payload)
        },
        deleteEvent(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        eventDeleted(state, action: PayloadAction<string>) {
            eventsAdapter.removeOne(state, action.payload)
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
        statusError(state) {
            state.status = EStatus.ERROR
            state.form.status = EStatus.ERROR
        },
    },
})

export const { actions: eventsActions, reducer: eventsReducer } = slice
