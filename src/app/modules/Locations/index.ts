import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { ILocation, ILocationsResponse } from 'types/ILocation'

import { ILocationsState } from './types'

export const locationsAdapter = createEntityAdapter<ILocation>()

const slice = createSlice({
    name: 'locations',
    initialState: locationsAdapter.getInitialState<ILocationsState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
    }),
    reducers: {
        loadLocations(state) {
            state.status = EStatus.PENDING
        },
        locationsLoaded(state, action: PayloadAction<ILocationsResponse>) {
            locationsAdapter.setMany(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
    },
})

export const { actions: locationsActions, reducer: locationsReducer } = slice
