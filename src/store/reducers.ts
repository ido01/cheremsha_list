import { combineReducers, Reducer } from '@reduxjs/toolkit'
import { authReducer } from 'app/modules/Auth/slice'
import { categoriesReducer } from 'app/modules/Categories/slice'
import { documentsReducer } from 'app/modules/Documents/slice'
import { favoritesReducer } from 'app/modules/Favorites/slice'
import { fileReducer } from 'app/modules/File/slice'
import { profileReducer } from 'app/modules/Profile/slice'
import { quizReducer } from 'app/modules/Quiz/slice'
import { usersReducer } from 'app/modules/Users/slice'
import { InjectedReducersType } from 'utils/types/injector-typings'

export function createReducer(injectedReducers: InjectedReducersType = {}): Reducer {
    return combineReducers({
        ...injectedReducers,
        auth: authReducer,
        categories: categoriesReducer,
        documents: documentsReducer,
        favorites: favoritesReducer,
        file: fileReducer,
        profile: profileReducer,
        quiz: quizReducer,
        users: usersReducer,
    })
}
