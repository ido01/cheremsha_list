import { configureStore, Store } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { createReducer } from './reducers'
import rootSaga from './rootSaga'

export function configureAppStore(): Store {
    const sagaMiddleware = createSagaMiddleware()

    const store = configureStore({
        reducer: createReducer(),
        middleware: [sagaMiddleware],
        devTools: process.env.NODE_ENV !== 'production' || process.env.PUBLIC_URL.length > 0,
    })

    sagaMiddleware.run(rootSaga)

    return store
}

export const store = configureAppStore()
