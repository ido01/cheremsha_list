import { authWatcher } from 'app/modules/Auth/slice/saga'
import { categoriesWatcher } from 'app/modules/Categories/slice/saga'
import { documentsWatcher } from 'app/modules/Documents/slice/saga'
import { eventsWatcher } from 'app/modules/Events/slice/events/saga'
import { birthdaysWatcher } from 'app/modules/Events/slice/users/saga'
import { workdaysWatcher } from 'app/modules/Events/slice/workday/saga'
import { favoritesWatcher } from 'app/modules/Favorites/slice/saga'
import { fileWatcher } from 'app/modules/File/slice/saga'
import { locationsWatcher } from 'app/modules/Locations/saga'
import { logWatcher } from 'app/modules/Log/slice/saga'
import { profileWatcher } from 'app/modules/Profile/slice/saga'
import { quizWatcher } from 'app/modules/Quiz/slice/saga'
import { resultsWatcher } from 'app/modules/Results/slice/saga'
import { usersWatcher } from 'app/modules/Users/slice/saga'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([
        authWatcher(),
        birthdaysWatcher(),
        categoriesWatcher(),
        documentsWatcher(),
        eventsWatcher(),
        favoritesWatcher(),
        fileWatcher(),
        locationsWatcher(),
        logWatcher(),
        profileWatcher(),
        resultsWatcher(),
        usersWatcher(),
        quizWatcher(),
        workdaysWatcher(),
    ])
}
