import { authWatcher } from 'app/modules/Auth/slice/saga'
import { categoriesWatcher } from 'app/modules/Categories/slice/saga'
import { documentsWatcher } from 'app/modules/Documents/slice/saga'
import { eventsWatcher } from 'app/modules/Events/slice/events/saga'
import { birthdaysWatcher } from 'app/modules/Events/slice/users/saga'
import { workdaysWatcher } from 'app/modules/Events/slice/workday/saga'
import { favoritesWatcher } from 'app/modules/Favorites/slice/saga'
import { fileWatcher } from 'app/modules/File/slice/saga'
import { listsWatcher } from 'app/modules/List/slice/saga'
import { locationsWatcher } from 'app/modules/Locations/slice/saga'
import { logWatcher } from 'app/modules/Log/slice/saga'
import { pollsWatcher } from 'app/modules/Polls/slice/saga'
import { positionsWatcher } from 'app/modules/Positions/slice/saga'
import { profileWatcher } from 'app/modules/Profile/slice/saga'
import { quizWatcher } from 'app/modules/Quiz/slice/saga'
import { resultsWatcher } from 'app/modules/Results/slice/saga'
import { settingsWatcher } from 'app/modules/Settings/slice/saga'
import { tablesWatcher } from 'app/modules/Tables/slice/saga'
import { usersWatcher } from 'app/modules/Users/slice/saga'
import { tinyUsersWatcher } from 'app/modules/Users/slice/tiny/saga'
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
        pollsWatcher(),
        positionsWatcher(),
        profileWatcher(),
        resultsWatcher(),
        settingsWatcher(),
        usersWatcher(),
        tinyUsersWatcher(),
        tablesWatcher(),
        quizWatcher(),
        workdaysWatcher(),
        listsWatcher(),
    ])
}
