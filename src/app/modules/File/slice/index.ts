import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IFileRequest } from 'types/IFile'

import { IFileState } from './types'

const initialState: IFileState = {
    status: EStatus.INITIAL,
    open: false,
}

const slice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        openModal(state) {
            state.open = true
            state.status = EStatus.INITIAL
        },
        hideModal(state) {
            state.open = false
        },
        statusPending(state) {
            state.status = EStatus.PENDING
        },
        uploadImage(state, action: PayloadAction<File>) {
            state.status = EStatus.PENDING
        },
        createImage(state, action: PayloadAction<IFileRequest>) {
            state.status = EStatus.PENDING
        },
        statusFinished(state) {
            state.open = false
            state.status = EStatus.FINISHED
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
    },
})

export const { actions: fileActions, reducer: fileReducer } = slice
