import { combineReducers, Reducer } from '@reduxjs/toolkit'
import { authReducer } from 'app/modules/Auth/slice'
import { listsReducer } from 'app/modules/List/slice'
import { profileReducer } from 'app/modules/Profile/slice'
import { reservationsReducer } from 'app/modules/Reservation/slice'
import { settingsReducer } from 'app/modules/Settings/slice'
import { InjectedReducersType } from 'utils/types/injector-typings'

export function createReducer(injectedReducers: InjectedReducersType = {}): Reducer {
    return combineReducers({
        ...injectedReducers,
        auth: authReducer,
        profile: profileReducer,
        reservations: reservationsReducer,
        settings: settingsReducer,
        lists: listsReducer,
    })
}
