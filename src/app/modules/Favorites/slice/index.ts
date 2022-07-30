import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IUser, IUsersCollectionResponse } from 'types/IUser'

import { IFavoritesState } from './types'

export const favoritesAdapter = createEntityAdapter<IUser>()

const slice = createSlice({
    name: 'favorites',
    initialState: favoritesAdapter.getInitialState<IFavoritesState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        modal: {
            isOpen: false,
            activeId: '',
        },
    }),
    reducers: {
        loadFavorites(state) {
            state.status = EStatus.PENDING
        },
        favoritesLoaded(state, action: PayloadAction<IUsersCollectionResponse>) {
            favoritesAdapter.setAll(state, action.payload.data)
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

export const { actions: favoritesActions, reducer: favoritesReducer } = slice
