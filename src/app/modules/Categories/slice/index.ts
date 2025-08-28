import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPasteDocument } from 'app/modules/Documents/slice/types'
import { EStatus } from 'types'
import { ICategoriesResponse, ICategory } from 'types/ICategory'
import { TTableOrder } from 'types/ITableDisplay'

import { ICategoriesState } from './types'

export const categoriesAdapter = createEntityAdapter<ICategory>()

const slice = createSlice({
    name: 'categories',
    initialState: categoriesAdapter.getInitialState<ICategoriesState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        order: {
            row: 'status',
            order: 'desc',
        },
        moveId: '',
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: {
                id: '',
                type: 'category',
                parentId: '0',
                name: '',
                createdAt: '',
                icon: '',
            },
        },
    }),
    reducers: {
        cleanCategories(state) {
            categoriesAdapter.setAll(state, [])
        },
        loadCategories(state, action: PayloadAction<string>) {
            state.status = EStatus.PENDING
            action.payload
        },
        categoriesLoaded(state, action: PayloadAction<ICategoriesResponse>) {
            categoriesAdapter.setMany(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        openModal(state, action: PayloadAction<ICategory>) {
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideModal(state) {
            state.form.open = false
            state.form.data.parentId = ''
        },
        reloadCategory(state, action: PayloadAction<string>) {
            state.status = EStatus.PENDING
            action.payload
        },
        categoryReloaded(state, action: PayloadAction<ICategory>) {
            state.status = EStatus.FINISHED
            categoriesAdapter.setOne(state, action.payload)
        },
        createCategory(state, action: PayloadAction<ICategory>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateCategory(state, action: PayloadAction<ICategory>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        deleteCategory(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        categorySave(state, action: PayloadAction<ICategory>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            categoriesAdapter.setOne(state, action.payload)
        },
        categoryDeleted(state, action: PayloadAction<string>) {
            categoriesAdapter.removeOne(state, action.payload)
        },
        setOrder(state, action: PayloadAction<TTableOrder>) {
            state.order = action.payload
        },
        statusError(state) {
            state.status = EStatus.ERROR
            state.form.status = EStatus.ERROR
        },
        cutCategory(state, action: PayloadAction<string>) {
            state.moveId = action.payload
            state.form.open = false
        },
        moveCategory(state, action: PayloadAction<IPasteDocument>) {
            state
            action
        },
    },
})

export const { actions: categoriesActions, reducer: categoriesReducer } = slice
