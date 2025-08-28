import { PayloadAction } from '@reduxjs/toolkit'
import { categoriesActions } from 'app/modules/Categories/slice'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IDocument, IDocumentResponse, IDocumentsResponse } from 'types/IDocument'
import { IDocumentStateRequest } from 'types/IDocumentState'
import { request } from 'utils/request'

import { documentsActions } from '.'
import { IPasteDocument } from './types'

export function* loadDocuments(action: PayloadAction<string>) {
    try {
        const response: IDocumentsResponse = yield call(request, `documents/${action.payload}`)

        yield put(documentsActions.documentsLoaded(response.data))
    } catch (error: any) {
        yield put(documentsActions.statusError())
    }
}

export function* deleteTaskUser(action: PayloadAction<string>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents/${action.payload}/userDeleteTask`, {
            method: 'DELETE',
        })

        yield put(documentsActions.documentSave(response.data))

        if (response.data.parentId && response.data.parentId !== '0') {
            yield put(categoriesActions.reloadCategory(response.data.parentId))
        }
    } catch (error: any) {
        yield put(documentsActions.statusError())
    }
}

export function* deleteTaskPoint(action: PayloadAction<string>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents/${action.payload}/pointDeleteTask`, {
            method: 'DELETE',
        })

        yield put(documentsActions.documentSave(response.data))

        if (response.data.parentId && response.data.parentId !== '0') {
            yield put(categoriesActions.reloadCategory(response.data.parentId))
        }
    } catch (error: any) {
        yield put(documentsActions.statusError())
    }
}

export function* getUserTask(action: PayloadAction<string>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents/${action.payload}/userTakeTask`, {
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

export function* completeUserTask(action: PayloadAction<string>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents/${action.payload}/userCompleteTask`, {
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

export function* rejectUserTask(action: PayloadAction<string>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents/${action.payload}/userRejectTask`, {
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

export function* getPoint(action: PayloadAction<string>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents/${action.payload}/pointTakeTask`, {
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

export function* completePoint(action: PayloadAction<string>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents/${action.payload}/pointCompleteTask`, {
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

export function* rejectPoint(action: PayloadAction<string>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents/${action.payload}/pointRejectTask`, {
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

export function* moveDocument(action: PayloadAction<IPasteDocument>) {
    try {
        const response: IDocumentResponse = yield call(request, `documents/${action.payload.id}/move`, {
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
    yield takeLeading(documentsActions.getUserTask.type, getUserTask)
    yield takeLeading(documentsActions.completeUserTask.type, completeUserTask)
    yield takeLeading(documentsActions.rejectUserTask.type, rejectUserTask)
    yield takeLeading(documentsActions.deleteTaskUser.type, deleteTaskUser)
    yield takeLeading(documentsActions.deleteTaskPoint.type, deleteTaskPoint)
    yield takeLeading(documentsActions.getPoint.type, getPoint)
    yield takeLeading(documentsActions.completePoint.type, completePoint)
    yield takeLeading(documentsActions.rejectPoint.type, rejectPoint)
    yield takeLeading(documentsActions.setActiveId.type, setActiveId)
    yield takeLeading(documentsActions.setComplete.type, setComplete)
    yield takeLeading(documentsActions.createDocument.type, createDocument)
    yield takeLeading(documentsActions.updateDocument.type, updateDocument)
    yield takeLeading(documentsActions.deleteDocument.type, deleteDocument)
    yield takeLeading(documentsActions.moveDocument.type, moveDocument)
}
