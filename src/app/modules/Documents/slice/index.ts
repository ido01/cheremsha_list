import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EState, EStatus, EType } from 'types'
import { IDocument, IDocumentsResponse } from 'types/IDocument'
import { IDocumentInfo } from 'types/IDocumentInfo'
import { IDocumentStateRequest } from 'types/IDocumentState'
import { IFile } from 'types/IFile'
import { TTableOrder } from 'types/ITable'

import { IDocumentsState } from './types'

export const documentsAdapter = createEntityAdapter<IDocument>()

interface IImageResponse {
    index: number
    file: IFile
}

const slice = createSlice({
    name: 'documents',
    initialState: documentsAdapter.getInitialState<IDocumentsState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        order: {
            row: 'createdAt',
            order: 'desc',
        },
        modal: {
            isOpen: false,
            activeId: '',
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: {
                id: '',
                type: 'document',
                path: 'faq',
                parentId: '',
                name: '',
                info: [],
                state: {
                    id: '',
                    state: EState.INITIAL,
                    uid: '',
                    createdAt: '',
                    updatedAt: '',
                },
                createdAt: '',
            },
        },
    }),
    reducers: {
        loadDocuments(state, action: PayloadAction<EType>) {
            state.status = EStatus.PENDING
        },
        documentsLoaded(state, action: PayloadAction<IDocumentsResponse>) {
            documentsAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        openEditModal(state, action: PayloadAction<IDocument>) {
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
            state.form.data.parentId = ''
        },
        createDocument(state, action: PayloadAction<IDocument>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateDocument(state, action: PayloadAction<IDocument>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        documentSave(state, action: PayloadAction<IDocument>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            documentsAdapter.setOne(state, action.payload)
        },
        deleteDocument(state, action: PayloadAction<string>) {
            //
        },
        documentDeleted(state, action: PayloadAction<string>) {
            documentsAdapter.removeOne(state, action.payload)
        },
        setOrder(state, action: PayloadAction<TTableOrder>) {
            state.order = action.payload
        },
        setActiveId(state, action: PayloadAction<string>) {
            state.modal.activeId = action.payload
        },
        setComplete(state, action: PayloadAction<IDocumentStateRequest>) {
            //
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

export const { actions: documentsActions, reducer: documentsReducer } = slice
