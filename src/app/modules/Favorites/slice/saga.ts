import { call, put, takeLeading } from 'redux-saga/effects'
import { IUsersCollectionResponse } from 'types/IUser'
import { request } from 'utils/request'

import { favoritesActions } from '.'

export function* loadFavorites() {
    try {
        const response: IUsersCollectionResponse = yield call(request, `favorites`)

        yield put(favoritesActions.favoritesLoaded(response))
    } catch (error: any) {
        yield put(favoritesActions.statusError())
    }
}

export function* favoritesWatcher() {
    yield takeLeading(favoritesActions.loadFavorites.type, loadFavorites)
}
