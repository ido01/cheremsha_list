import { combineReducers, Reducer } from '@reduxjs/toolkit'
import { authReducer } from 'app/modules/Auth/slice'
import { categoriesReducer } from 'app/modules/Categories/slice'
import { documentsReducer } from 'app/modules/Documents/slice'
import { fileReducer } from 'app/modules/File/slice'
import { profileReducer } from 'app/modules/Profile/slice'
import { usersReducer } from 'app/modules/Users/slice'
import { InjectedReducersType } from 'utils/types/injector-typings'

export function createReducer(injectedReducers: InjectedReducersType = {}): Reducer {
    return combineReducers({
        ...injectedReducers,
        auth: authReducer,
        categories: categoriesReducer,
        documents: documentsReducer,
        file: fileReducer,
        profile: profileReducer,
        users: usersReducer,
    })
}
