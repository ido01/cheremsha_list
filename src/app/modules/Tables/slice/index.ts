import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { ITable, ITablesResponse } from 'types/ITable'

import { ITablesState } from './types'

export const tablesAdapter = createEntityAdapter<ITable>()

const slice = createSlice({
    name: 'tables',
    initialState: tablesAdapter.getInitialState<ITablesState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        modal: {
            isOpen: false,
            activeId: '',
        },
        deleteModal: {
            status: EStatus.INITIAL,
            open: false,
            data: {
                id: '',
                name: '',
                short_name: '',
                full_name: '',
                places: 0,
                free: false,
                reservations: [],
            },
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: {
                id: '',
                name: '',
                short_name: '',
                full_name: '',
                places: 0,
                free: false,
                reservations: [],
            },
        },
    }),
    reducers: {
        cleanTables(state) {
            tablesAdapter.setAll(state, [])
        },
        loadTables(state) {
            state.status = EStatus.PENDING
        },
        tablesLoaded(state, action: PayloadAction<ITablesResponse>) {
            tablesAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        openEditModal(state, action: PayloadAction<ITable>) {
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideEditModal(state) {
            state.form.open = false
        },
        createTable(state, action: PayloadAction<ITable>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateTable(state, action: PayloadAction<ITable>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        tableSave(state, action: PayloadAction<ITable>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            tablesAdapter.setOne(state, action.payload)
        },
        deleteTable(state, action: PayloadAction<string>) {
            state.deleteModal.status = EStatus.PENDING
            action.payload
        },
        tableDeleted(state, action: PayloadAction<string>) {
            tablesAdapter.removeOne(state, action.payload)
            state.deleteModal.open = false
            state.deleteModal.status = EStatus.FINISHED
        },
        setForm(state, action: PayloadAction<ITable>) {
            state.form.status = EStatus.INITIAL
            state.form.data = action.payload
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
        },
        showDeleteModal(state, action: PayloadAction<ITable>) {
            state.deleteModal.open = true
            state.deleteModal.data = action.payload
        },
        closeDeleteModal(state) {
            state.deleteModal.open = false
        },
    },
})

export const { actions: tablesActions, reducer: tablesReducer } = slice
