import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ERole, EStatus } from 'types'
import { TLimit, TTableOrder } from 'types/ITable'
import { IUser, IUsersCollectionResponse } from 'types/IUser'

import { IUserFilter, IUsersState } from './types'

export const usersAdapter = createEntityAdapter<IUser>()

const slice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState<IUsersState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        total_count: 0,
        old_total_count: 0,
        order: {
            row: 'createdAt',
            order: 'desc',
        },
        pagination: {
            limit: 10,
            page: 1,
            total_pages: 0,
        },
        filter: {
            position: '',
            place_id: '',
            status: 'all',
            query: '',
        },
        modal: {
            isOpen: false,
            activeId: '',
        },
        form: {
            status: EStatus.INITIAL,
            data: {
                id: '',
                active: false,
                ban: false,
                role: ERole.GUEST,
                gender: 'male',
                name: '',
                last_name: '',
                address: '',
                fid: '',
                university: '',
                birthday: '',
                hobby: '',
                about: '',
                place_id: '',
                first_date: '',
                position: 'seller',
                rate: 0,
                phone: '',
                email: '',
                blocked: false,
                favorite: false,
                createdAt: '',
            },
        },
    }),
    reducers: {
        cleanUsers(state) {
            usersAdapter.setAll(state, [])
            state.pagination.page = 1
            state.pagination.total_pages = 1
            state.total_count = 0
        },
        setFilter(state, action: PayloadAction<IUserFilter>) {
            state.filter = action.payload
        },
        loadUsers(state) {
            state.status = EStatus.PENDING
        },
        usersLoaded(state, action: PayloadAction<IUsersCollectionResponse>) {
            usersAdapter.setAll(state, action.payload.data)
            state.pagination.total_pages = action.payload.meta.totalPages
            state.total_count = action.payload.meta.total
            state.status = EStatus.FINISHED
        },
        loadUser(state, action: PayloadAction<string>) {
            state.status = EStatus.PENDING
            action.payload
        },
        userLoaded(state, action: PayloadAction<IUser>) {
            state.status = EStatus.FINISHED
            usersAdapter.setOne(state, action.payload)
            state.form.data = action.payload
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
        activeUser(state, action: PayloadAction<string>) {
            state.form.status = EStatus.PENDING
            action.payload
        },
        banUser(state, action: PayloadAction<string>) {
            state.form.status = EStatus.PENDING
            action.payload
        },
        updateUser(state, action: PayloadAction<IUser>) {
            state.form.status = EStatus.PENDING
            action.payload
        },
        userUpdated(state, action: PayloadAction<IUser>) {
            state.form.status = EStatus.FINISHED
            usersAdapter.setOne(state, action.payload)
        },
        setForm(state, action: PayloadAction<IUser>) {
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
        addFavorite(state, action: PayloadAction<string>) {
            //
        },
        deleteFavorite(state, action: PayloadAction<string>) {
            //
        },
    },
})

export const { actions: usersActions, reducer: usersReducer } = slice
