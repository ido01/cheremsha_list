import { combineReducers, Reducer } from '@reduxjs/toolkit'
import { authReducer } from 'app/modules/Auth/slice'
import { categoriesReducer } from 'app/modules/Categories/slice'
import { documentsReducer } from 'app/modules/Documents/slice'
import { eventsReducer } from 'app/modules/Events/slice/events'
import { birthdaysReducer } from 'app/modules/Events/slice/users'
import { workdaysReducer } from 'app/modules/Events/slice/workday'
import { favoritesReducer } from 'app/modules/Favorites/slice'
import { fileReducer } from 'app/modules/File/slice'
import { locationsReducer } from 'app/modules/Locations'
import { logReducer } from 'app/modules/Log/slice'
import { profileReducer } from 'app/modules/Profile/slice'
import { quizReducer } from 'app/modules/Quiz/slice'
import { resultsReducer } from 'app/modules/Results/slice'
import { usersReducer } from 'app/modules/Users/slice'
import { InjectedReducersType } from 'utils/types/injector-typings'

export function createReducer(injectedReducers: InjectedReducersType = {}): Reducer {
    return combineReducers({
        ...injectedReducers,
        auth: authReducer,
        birthdays: birthdaysReducer,
        categories: categoriesReducer,
        documents: documentsReducer,
        events: eventsReducer,
        favorites: favoritesReducer,
        file: fileReducer,
        locations: locationsReducer,
        log: logReducer,
        profile: profileReducer,
        quiz: quizReducer,
        results: resultsReducer,
        users: usersReducer,
        workdays: workdaysReducer,
    })
}
