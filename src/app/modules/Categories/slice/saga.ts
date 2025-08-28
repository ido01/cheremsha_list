import { PayloadAction } from '@reduxjs/toolkit'
import { documentsActions } from 'app/modules/Documents/slice'
import { IPasteDocument } from 'app/modules/Documents/slice/types'
import { quizActions } from 'app/modules/Quiz/slice'
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { ICategoriesResponse, ICategory, ICategoryResponse } from 'types/ICategory'
import { request } from 'utils/request'

import { categoriesActions } from '.'

export function* loadCategories(action: PayloadAction<string>) {
    try {
        const response: ICategoriesResponse = yield call(request, `categories/${action.payload}`)

        yield put(categoriesActions.categoriesLoaded(response))
        yield put(documentsActions.documentsLoaded(response.documents))
        yield put(quizActions.quizLoaded(response.quiz))
    } catch (error: any) {
        yield put(categoriesActions.statusError())
    }
}

export function* loadCategory(action: PayloadAction<string>) {
    try {
        const response: ICategoryResponse = yield call(request, `category/${action.payload}`)

        yield put(categoriesActions.categoryReloaded(response.data))

        if (response.data.parentId && response.data.parentId !== '0') {
            yield put(categoriesActions.reloadCategory(response.data.parentId))
        }
    } catch (error: any) {
        yield put(categoriesActions.statusError())
    }
}

export function* createCategory(action: PayloadAction<ICategory>) {
    try {
        const response: ICategoryResponse = yield call(request, `categories`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(categoriesActions.categorySave(response.data))
    } catch (error: any) {
        yield put(categoriesActions.statusError())
    }
}

export function* updateCategory(action: PayloadAction<ICategory>) {
    try {
        const response: ICategoryResponse = yield call(request, `categories/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(categoriesActions.categorySave(response.data))
    } catch (error: any) {
        yield put(categoriesActions.statusError())
    }
}

export function* deleteCategory(action: PayloadAction<string>) {
    try {
        yield call(request, `categories/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(categoriesActions.categoryDeleted(action.payload))
    } catch (error: any) {
        yield put(categoriesActions.statusError())
    }
}

export function* moveCategory(action: PayloadAction<IPasteDocument>) {
    try {
        const response: ICategoryResponse = yield call(request, `categories/${action.payload.id}/move`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(categoriesActions.categorySave(response.data))
    } catch (error: any) {
        yield put(categoriesActions.statusError())
    }
}

export function* categoriesWatcher() {
    yield takeLeading(categoriesActions.loadCategories.type, loadCategories)
    yield takeLatest(categoriesActions.reloadCategory.type, loadCategory)
    yield takeLeading(categoriesActions.createCategory.type, createCategory)
    yield takeLeading(categoriesActions.updateCategory.type, updateCategory)
    yield takeLeading(categoriesActions.deleteCategory.type, deleteCategory)
    yield takeLeading(categoriesActions.moveCategory.type, moveCategory)
}
