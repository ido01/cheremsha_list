import { PayloadAction } from '@reduxjs/toolkit'
import { categoriesActions } from 'app/modules/Categories/slice'
import { call, put, select, takeLeading } from 'redux-saga/effects'
import { EType } from 'types'
import { IDocument, IDocumentResponse, IDocumentsResponse } from 'types/IDocument'
import { IDocumentStateRequest } from 'types/IDocumentState'
import { request } from 'utils/request'

import { documentsActions } from '.'

export function* loadDocuments(action: PayloadAction<EType>) {
    try {
        const response: IDocumentsResponse = yield call(request, `documents/${action.payload}`)

        yield put(documentsActions.documentsLoaded(response))
    } catch (error: any) {
        yield put(documentsActions.statusError())
    }
}

export function* setActiveId(action: PayloadAction<string>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents/${action.payload}/state`, {
            method: 'POST',
        })

        yield put(documentsActions.documentSave(response.data))

        if (response.data.parentId && response.data.parentId !== '0') {
            yield put(categoriesActions.reloadCategory(response.data.parentId))
        }
    } catch (error: any) {
        yield put(documentsActions.statusError())
    }
}

export function* setComplete(action: PayloadAction<IDocumentStateRequest>) {
    try {
        const response: IDocumentResponse = yield call(
            request,
            `documents/${action.payload.did}/state/${action.payload.id}/completed`,
            {
                method: 'POST',
            }
        )

        yield put(documentsActions.documentSave(response.data))

        if (response.data.parentId && response.data.parentId !== '0') {
            yield put(categoriesActions.reloadCategory(response.data.parentId))
        }
    } catch (error: any) {
        yield put(documentsActions.statusError())
    }
}

export function* createDocument(action: PayloadAction<IDocument>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(documentsActions.documentSave(response.data))

        if (response.data.parentId && response.data.parentId !== '0') {
            yield put(categoriesActions.reloadCategory(response.data.parentId))
        }
    } catch (error: any) {
        yield put(documentsActions.statusError())
    }
}

export function* updateDocument(action: PayloadAction<IDocument>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(documentsActions.documentSave(response.data))
    } catch (error: any) {
        yield put(documentsActions.statusError())
    }
}

export function* deleteDocument(action: PayloadAction<string>) {
    try {
        yield call(request, `documents/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(documentsActions.documentDeleted(action.payload))
    } catch (error: any) {
        yield put(documentsActions.statusError())
    }
}

export function* documentsWatcher() {
    yield takeLeading(documentsActions.loadDocuments.type, loadDocuments)
    yield takeLeading(documentsActions.setActiveId.type, setActiveId)
    yield takeLeading(documentsActions.setComplete.type, setComplete)
    yield takeLeading(documentsActions.createDocument.type, createDocument)
    yield takeLeading(documentsActions.updateDocument.type, updateDocument)
    yield takeLeading(documentsActions.deleteDocument.type, deleteDocument)
}
