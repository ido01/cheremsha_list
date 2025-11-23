import { IAuthState } from 'app/modules/Auth/slice/types'
import { IListState } from 'app/modules/List/slice/types'
import { IProfileState } from 'app/modules/Profile/slice/types'
import { IReservationState } from 'app/modules/Reservation/slice/types'
import { ISettingsState } from 'app/modules/Settings/slice/types'

export interface RootState {
    auth: IAuthState
    profile: IProfileState
    settings: ISettingsState
    lists: IListState
    reservations: IReservationState
}
