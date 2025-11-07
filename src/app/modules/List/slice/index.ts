import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { EStatus } from 'types'
import { IReservation, IReservationItem, IReservationReset, ITable, ITablesResponse } from 'types/ITable'

import { ICount, IListState } from './types'

export const listAdapter = createEntityAdapter<ITable>()

const slice = createSlice({
    name: 'lists',
    initialState: listAdapter.getInitialState<IListState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        itemStatus: 'init',
        filter: {
            date: dayjs().subtract(6, 'hour').format('YYYY-MM-DD'),
            status: 'active',
        },
        dateSettings: false,
        find: {
            open: false,
        },
        free: {
            open: false,
            id: '',
        },
        reset: {
            open: false,
            reservation: {
                id: '',
                tid: '',
                name: '',
                phone: '',
                comment: '',
                start: {
                    hour: 12,
                    minute: 0,
                },
                end: {
                    hour: 13,
                    minute: 0,
                },
                end_hour: 0,
                end_minute: 0,
                close: {
                    hour: 0,
                    minute: 0,
                },
                guests: 2,
                start_table: 1,
                status: 'init',
                close_status: 'none',
                date: '',
                items: [],
            },
        },
        count: {
            hookah: 0,
            express: 0,
            author: 0,
            tea: 0,
        },
        modal: {
            status: EStatus.INITIAL,
            open: false,
            activeId: '0',
            reservation: {
                id: '',
                tid: '',
                name: '',
                phone: '',
                comment: '',
                start: {
                    hour: 12,
                    minute: 0,
                },
                end: {
                    hour: 13,
                    minute: 0,
                },
                end_hour: 0,
                end_minute: 0,
                close: {
                    hour: 0,
                    minute: 0,
                },
                guests: 2,
                start_table: 1,
                status: 'init',
                close_status: 'none',
                date: '',
                items: [],
            },
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: {
                id: '',
                tid: '',
                name: '',
                phone: '',
                comment: '',
                start: {
                    hour: 12,
                    minute: 0,
                },
                end: {
                    hour: 13,
                    minute: 0,
                },
                end_hour: 0,
                end_minute: 0,
                close: {
                    hour: 0,
                    minute: 0,
                },
                guests: 2,
                start_table: 1,
                status: 'init',
                close_status: 'none',
                date: '',
                items: [],
            },
        },
    }),
    reducers: {
        setCount(state, action: PayloadAction<ICount>) {
            state.count = action.payload
        },
        loadTables(state, action: PayloadAction<{ date: string; status: 'active' | 'deleted' }>) {
            action
            state.status = EStatus.PENDING
        },
        tablesLoaded(state, action: PayloadAction<ITablesResponse>) {
            // action.payload.data.forEach((table) => {
            //     listAdapter.setOne(state, table)
            // })
            listAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        createItem(state, action: PayloadAction<IReservationItem>) {
            state.itemStatus = action.payload.position
        },
        deleteItem(state, action: PayloadAction<string>) {
            state
            action
        },
        reservationItemSave(state, action: PayloadAction<ITable>) {
            state.itemStatus = 'init'
            listAdapter.setOne(state, action.payload)
            const reservation = action.payload.reservations.find((res) => res.id === state.modal.activeId)
            if (reservation) {
                state.modal.reservation = reservation
            }
        },
        createReservation(state, action: PayloadAction<IReservation>) {
            action
            state.form.status = EStatus.PENDING
        },
        reservationSave(state, action: PayloadAction<ITable>) {
            state.itemStatus = 'init'
            state.form.status = EStatus.FINISHED
            state.form.open = false
            state.modal.status = EStatus.FINISHED
            state.modal.open = false
            state.find.open = false
            listAdapter.setOne(state, action.payload)
        },
        showModal(state, action: PayloadAction<IReservation>) {
            state.modal.status = EStatus.INITIAL
            state.modal.reservation = action.payload
            state.modal.activeId = action.payload.id
            state.modal.open = true
        },
        resetReservation(state, action: PayloadAction<IReservationReset>) {
            action
            state.modal.status = EStatus.PENDING
        },
        reservationReset(state, action: PayloadAction<ITablesResponse>) {
            listAdapter.setMany(state, action.payload.data)
            state.modal.status = EStatus.FINISHED
        },
        updateReservation(state, action: PayloadAction<IReservation>) {
            action
            state.modal.status = EStatus.PENDING
        },
        hideModal(state) {
            state.modal.open = false
            state.itemStatus = 'init'
        },
        showEditModal(state, action: PayloadAction<IReservation>) {
            state.form.data = action.payload
            state.form.open = true
            state.modal.open = false
        },
        hideEditModal(state) {
            state.form.open = false
        },
        statusError(state) {
            state.status = EStatus.ERROR
            state.form.status = EStatus.ERROR
        },
        openFind(state) {
            state.find.open = true
        },
        hideFind(state) {
            state.find.open = false
        },
        openReset(state, action: PayloadAction<IReservation>) {
            state.reset.reservation = action.payload
            state.reset.open = true
        },
        hideReset(state) {
            state.reset.open = false
        },
        setDate(state, action: PayloadAction<string>) {
            state.filter.date = action.payload
            state.dateSettings = false
        },
        setFilterStatus(state, action: PayloadAction<'active' | 'deleted'>) {
            state.filter.status = action.payload
        },
        openSettings(state) {
            state.dateSettings = true
        },
        hideSettings(state) {
            state.dateSettings = false
        },
        showFree(state, action: PayloadAction<string>) {
            state.free.id = action.payload
            state.free.open = true
        },
        hideFree(state) {
            state.free.id = ''
            state.free.open = false
        },
    },
})

export const { actions: listsActions, reducer: listsReducer } = slice
