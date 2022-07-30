import { authWatcher } from 'app/modules/Auth/slice/saga'
import { categoriesWatcher } from 'app/modules/Categories/slice/saga'
import { documentsWatcher } from 'app/modules/Documents/slice/saga'
import { favoritesWatcher } from 'app/modules/Favorites/slice/saga'
import { fileWatcher } from 'app/modules/File/slice/saga'
import { profileWatcher } from 'app/modules/Profile/slice/saga'
import { usersWatcher } from 'app/modules/Users/slice/saga'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([
        authWatcher(),
        categoriesWatcher(),
        documentsWatcher(),
        favoritesWatcher(),
        fileWatcher(),
        profileWatcher(),
        usersWatcher(),
    ])
}
