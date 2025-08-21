import { combineReducers, Reducer } from '@reduxjs/toolkit'
import { authReducer } from 'app/modules/Auth/slice'
import { categoriesReducer } from 'app/modules/Categories/slice'
import { documentsReducer } from 'app/modules/Documents/slice'
import { eventsReducer } from 'app/modules/Events/slice/events'
import { birthdaysReducer } from 'app/modules/Events/slice/users'
import { workdaysReducer } from 'app/modules/Events/slice/workday'
import { favoritesReducer } from 'app/modules/Favorites/slice'
import { fileReducer } from 'app/modules/File/slice'
import { listsReducer } from 'app/modules/List/slice'
import { locationsReducer } from 'app/modules/Locations/slice'
import { logReducer } from 'app/modules/Log/slice'
import { pollsReducer } from 'app/modules/Polls/slice'
import { positionsReducer } from 'app/modules/Positions/slice'
import { profileReducer } from 'app/modules/Profile/slice'
import { quizReducer } from 'app/modules/Quiz/slice'
import { resultsReducer } from 'app/modules/Results/slice'
import { settingsReducer } from 'app/modules/Settings/slice'
import { tablesReducer } from 'app/modules/Tables/slice'
import { usersReducer } from 'app/modules/Users/slice'
import { tinyUsersReducer } from 'app/modules/Users/slice/tiny'
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
        polls: pollsReducer,
        positions: positionsReducer,
        profile: profileReducer,
        quiz: quizReducer,
        results: resultsReducer,
        settings: settingsReducer,
        users: usersReducer,
        tinyUsers: tinyUsersReducer,
        lists: listsReducer,
        tables: tablesReducer,
        workdays: workdaysReducer,
    })
}
