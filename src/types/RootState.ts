import { IAuthState } from 'app/modules/Auth/slice/types'
import { ICategoriesState } from 'app/modules/Categories/slice/types'
import { IDocumentsState } from 'app/modules/Documents/slice/types'
import { IEventsState } from 'app/modules/Events/slice/events/types'
import { IBirthdayState } from 'app/modules/Events/slice/users/types'
import { IWorkdayState } from 'app/modules/Events/slice/workday/types'
import { IFavoritesState } from 'app/modules/Favorites/slice/types'
import { IFileState } from 'app/modules/File/slice/types'
import { IListState } from 'app/modules/List/slice/types'
import { ILocationsState } from 'app/modules/Locations/types'
import { ILogState } from 'app/modules/Log/slice/types'
import { IPollsState } from 'app/modules/Polls/slice/types'
import { IPositionsState } from 'app/modules/Positions/slice/types'
import { IProfileState } from 'app/modules/Profile/slice/types'
import { IQuizState } from 'app/modules/Quiz/slice/types'
import { IResultsState } from 'app/modules/Results/slice/types'
import { ISettingsState } from 'app/modules/Settings/slice/types'
import { ITablesState } from 'app/modules/Tables/slice/types'
import { ITinyUsersState } from 'app/modules/Users/slice/tiny/types'
import { IUsersState } from 'app/modules/Users/slice/types'

export interface RootState {
    auth: IAuthState
    birthdays: IBirthdayState
    categories: ICategoriesState
    documents: IDocumentsState
    events: IEventsState
    favorites: IFavoritesState
    file: IFileState
    locations: ILocationsState
    log: ILogState
    polls: IPollsState
    positions: IPositionsState
    profile: IProfileState
    quiz: IQuizState
    results: IResultsState
    settings: ISettingsState
    users: IUsersState
    tinyUsers: ITinyUsersState
    lists: IListState
    tables: ITablesState
    workdays: IWorkdayState
}
