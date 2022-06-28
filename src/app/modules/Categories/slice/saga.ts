import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { EType } from 'types'
import { ICategoriesResponse, ICategory, ICategoryResponse } from 'types/ICategory'
import { request } from 'utils/request'

import { categoriesActions } from '.'

export function* loadCategories(action: PayloadAction<EType>) {
    try {
        const response: ICategoriesResponse = yield call(request, `categories/${action.payload}`)

        yield put(categoriesActions.categoriesLoaded(response))
    } catch (error: any) {
        yield put(categoriesActions.statusError())
    }
}

export function* loadCategory(action: PayloadAction<string>) {
    try {
        const response: ICategoryResponse = yield call(request, `category/${action.payload}`)

        yield put(categoriesActions.categoryReloaded(response.data))

        if (response.data.parentId && response.data.parentId !== '0') {
            console.log('try')
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

export function* categoriesWatcher() {
    yield takeLeading(categoriesActions.loadCategories.type, loadCategories)
    yield takeLatest(categoriesActions.reloadCategory.type, loadCategory)
    yield takeLeading(categoriesActions.createCategory.type, createCategory)
    yield takeLeading(categoriesActions.updateCategory.type, updateCategory)
    yield takeLeading(categoriesActions.deleteCategory.type, deleteCategory)
}
