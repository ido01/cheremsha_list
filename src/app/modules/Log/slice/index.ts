import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { ILog, ILogResponse } from 'types/ILog'

import { ILogState } from './types'

export const logAdapter = createEntityAdapter<ILog>()

const slice = createSlice({
    name: 'log',
    initialState: logAdapter.getInitialState<ILogState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
    }),
    reducers: {
        loadLog(state, action: PayloadAction<string>) {
            state.status = EStatus.PENDING
            action.payload
        },
        logLoaded(state, action: PayloadAction<ILogResponse>) {
            logAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
    },
})

export const { actions: logActions, reducer: logReducer } = slice
