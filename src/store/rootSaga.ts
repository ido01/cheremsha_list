import { authWatcher } from 'app/modules/Auth/slice/saga'
import { listsWatcher } from 'app/modules/List/slice/saga'
import { profileWatcher } from 'app/modules/Profile/slice/saga'
import { settingsWatcher } from 'app/modules/Settings/slice/saga'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([authWatcher(), profileWatcher(), settingsWatcher(), listsWatcher()])
}
