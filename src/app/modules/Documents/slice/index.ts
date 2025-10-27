import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EState, EStatus } from 'types'
import { IDocument } from 'types/IDocument'
import { IDocumentStateRequest } from 'types/IDocumentState'
import { IFile } from 'types/IFile'
import { TTableOrder } from 'types/ITableDisplay'

import { IDocumentsState, IPasteDocument } from './types'

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
        moveId: '',
        copyId: '',
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
                task_status: EStatus.INITIAL,
                uid: '',
                parentId: '',
                name: '',
                end_date: '',
                end_date_unix: 0,
                deadTime: '',
                info: [],
                points: [],
                users: [],
                state: {
                    id: '',
                    state: EState.INITIAL,
                    uid: '',
                    createdAt: '',
                    updatedAt: '',
                },
                createdAt: '',
            },
            copy: {
                id: '',
                type: 'document',
                task_status: EStatus.INITIAL,
                uid: '',
                parentId: '',
                name: '',
                end_date: '',
                end_date_unix: 0,
                deadTime: '',
                info: [],
                points: [],
                users: [],
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
        loadDocuments(state, action: PayloadAction<string>) {
            state.status = EStatus.PENDING
            action.payload
        },
        documentsLoaded(state, action: PayloadAction<IDocument[]>) {
            documentsAdapter.setMany(state, action.payload)
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
            state
            action.payload
        },
        documentDeleted(state, action: PayloadAction<string>) {
            documentsAdapter.removeOne(state, action.payload)
        },
        cutDocument(state, action: PayloadAction<string>) {
            state.moveId = action.payload
            state.copyId = ''
            state.form.open = false
            state.modal.isOpen = false
        },
        copyDocument(state, action: PayloadAction<IDocument>) {
            state.copyId = action.payload.id
            state.form.copy = action.payload
            state.moveId = ''
            state.form.open = false
            state.modal.isOpen = false
        },
        setOrder(state, action: PayloadAction<TTableOrder>) {
            state.order = action.payload
        },
        setActiveId(state, action: PayloadAction<string>) {
            state.modal.activeId = action.payload
        },
        setComplete(state, action: PayloadAction<IDocumentStateRequest>) {
            state
            action.payload
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
        getUserTask(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        completeUserTask(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        rejectUserTask(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        getPoint(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        completePoint(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        rejectPoint(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        deleteTaskUser(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        deleteTaskPoint(state, action: PayloadAction<string>) {
            state
            action.payload
        },
        moveDocument(state, action: PayloadAction<IPasteDocument>) {
            state
            action
        },
    },
})

export const { actions: documentsActions, reducer: documentsReducer } = slice
