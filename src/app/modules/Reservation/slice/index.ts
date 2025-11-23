import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IReservation } from 'types/ITable'

import { IReservationState } from './types'

export const reservationsAdapter = createEntityAdapter<IReservation>()

const slice = createSlice({
    name: 'reservations',
    initialState: reservationsAdapter.getInitialState<IReservationState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
    }),
    reducers: {
        setReservations(state, action: PayloadAction<IReservation[]>) {
            reservationsAdapter.setAll(state, action.payload)
            state.status = EStatus.FINISHED
        },
        setReservation(state, action: PayloadAction<IReservation>) {
            reservationsAdapter.setOne(state, action.payload)
            state.status = EStatus.FINISHED
        },
        setManyReservations(state, action: PayloadAction<IReservation[]>) {
            reservationsAdapter.setMany(state, action.payload)
            state.status = EStatus.FINISHED
        },
    },
})

export const { actions: reservationsActions, reducer: reservationsReducer } = slice
