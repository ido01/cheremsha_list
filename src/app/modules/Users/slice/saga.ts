import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { call, put, select, takeLeading } from 'redux-saga/effects'
import { TTableOrder, TTablePagination } from 'types/ITable'
import { IUser, IUserItemResponse, IUsersCollectionResponse } from 'types/IUser'
import { request } from 'utils/request'

import { usersActions } from '.'
import { selectFilter, selectOrder, selectPagination, selectUserById } from './selectors'
import { IUserFilter } from './types'

export function* loadUsers() {
    try {
        const pagination: TTablePagination = yield select(selectPagination)
        const order: TTableOrder = yield select(selectOrder)
        const filter: IUserFilter = yield select(selectFilter)

        const response: IUsersCollectionResponse = yield call(request, `users`, {
            params: {
                page: pagination.page,
                limit: pagination.limit,
                order: order.order,
                orderRow: order.row,
                status: filter.status,
                place_id: filter.place_id,
                position: filter.position,
                query: filter.query,
            },
        })

        yield put(usersActions.usersLoaded(response))
    } catch (error: any) {
        yield put(usersActions.statusError())
    }
}

export function* loadContacts() {
    try {
        const pagination: TTablePagination = yield select(selectPagination)
        const order: TTableOrder = yield select(selectOrder)
        const filter: IUserFilter = yield select(selectFilter)

        const response: IUsersCollectionResponse = yield call(request, `contacts`, {
            params: {
                page: pagination.page,
                limit: pagination.limit,
                order: order.order,
                orderRow: order.row,
                status: filter.status,
                place_id: filter.place_id,
                position: filter.position,
                query: filter.query,
            },
        })

        yield put(usersActions.usersLoaded(response))
    } catch (error: any) {
        yield put(usersActions.statusError())
    }
}

export function* loadUser(action: PayloadAction<string>) {
    try {
        const getUser: (id: string) => IUser | undefined = yield select(selectUserById)
        const user = getUser(action.payload)
        if (user) return
        const response: IUserItemResponse = yield call(request, `users/${action.payload}`)

        yield put(usersActions.userLoaded(response.data))
    } catch (error: any) {
        yield put(usersActions.statusError())
    }
}

export function* updateUser(action: PayloadAction<IUser>) {
    try {
        const response: IUserItemResponse = yield call(request, `users/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(usersActions.userUpdated(response.data))
        toast.success('Данные успешно сохранены', {
            type: 'success',
        })
    } catch (error: any) {
        yield put(usersActions.statusError())

        toast.error(error.data.message || error.data.error || 'Что-то пошло не так', {
            type: 'error',
        })
    }
}

export function* activeUser(action: PayloadAction<string>) {
    try {
        const response: IUserItemResponse = yield call(request, `users/${action.payload}/active`, {
            method: 'POST',
        })

        yield put(usersActions.userUpdated(response.data))
    } catch (error: any) {
        yield put(usersActions.statusError())
    }
}

export function* banUser(action: PayloadAction<string>) {
    try {
        const response: IUserItemResponse = yield call(request, `users/${action.payload}/ban`, {
            method: 'POST',
        })

        yield put(usersActions.userUpdated(response.data))
    } catch (error: any) {
        yield put(usersActions.statusError())
    }
}

export function* addFavorite(action: PayloadAction<string>) {
    try {
        const response: IUserItemResponse = yield call(request, `users/${action.payload}/favorite`, {
            method: 'POST',
        })

        yield put(usersActions.userUpdated(response.data))
    } catch (error: any) {
        yield put(usersActions.statusError())
    }
}

export function* deleteFavorite(action: PayloadAction<string>) {
    try {
        const response: IUserItemResponse = yield call(request, `users/${action.payload}/favorite`, {
            method: 'DELETE',
        })

        yield put(usersActions.userUpdated(response.data))
    } catch (error: any) {
        yield put(usersActions.statusError())
    }
}

export function* usersWatcher() {
    yield takeLeading(usersActions.loadUsers.type, loadUsers)
    yield takeLeading(usersActions.loadContacts.type, loadContacts)
    yield takeLeading(usersActions.loadUser.type, loadUser)
    yield takeLeading(usersActions.updateUser.type, updateUser)
    yield takeLeading(usersActions.activeUser.type, activeUser)
    yield takeLeading(usersActions.banUser.type, banUser)
    yield takeLeading(usersActions.addFavorite.type, addFavorite)
    yield takeLeading(usersActions.deleteFavorite.type, deleteFavorite)
}
